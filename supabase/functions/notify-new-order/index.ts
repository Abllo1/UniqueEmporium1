import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    console.log('=== NOTIFY-NEW-ORDER EDGE FUNCTION TRIGGERED ===');
    console.log('Request method:', req.method);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));
    
    const payload = await req.json();
    console.log('Received payload:', JSON.stringify(payload, null, 2));
    
    const order = payload.record;
    if (!order) {
      throw new Error('No order record in payload');
    }
    
    console.log(`Processing NEW ORDER: ${order.id} (${order.order_number})`);

    // Retrieve ALL WhatsApp secrets
    const secrets = {
      WHATSAPP_TOKEN: Deno.env.get('WHATSAPP_TOKEN'),
      WHATSAPP_PHONE_NUMBER_ID: Deno.env.get('WHATSAPP_PHONE_NUMBER_ID'),
      WHATSAPP_BUSINESS_ID: Deno.env.get('WHATSAPP_BUSINESS_ID'),
      ADMIN_WHATSAPP_NUMBER_1: Deno.env.get('ADMIN_WHATSAPP_NUMBER_1'),
      ADMIN_WHATSAPP_NUMBER_2: Deno.env.get('ADMIN_WHATSAPP_NUMBER_2'),
    };
    
    console.log('Available secrets:', Object.keys(secrets).filter(k => secrets[k as keyof typeof secrets]));
    
    const missingSecrets = Object.entries(secrets).filter(([k, v]) => !v).map(([k]) => k);
    if (missingSecrets.length > 0) {
      console.error('MISSING SECRETS:', missingSecrets);
      return new Response(
        JSON.stringify({ error: `Missing secrets: ${missingSecrets.join(', ')}` }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const adminNumbers = [
      secrets.ADMIN_WHATSAPP_NUMBER_1,
      secrets.ADMIN_WHATSAPP_NUMBER_2
    ].filter(Boolean) as string[];

    if (adminNumbers.length === 0) {
      console.warn('No admin WhatsApp numbers configured');
      return new Response(
        JSON.stringify({ message: 'No admin numbers configured' }), 
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build order items summary
    const orderItemsList = (order.items || []).map((item: any) => 
      `• ${item.product_name} (${item.quantity} ${item.unit_type || 'pcs'}) @ ₦${item.unit_price?.toLocaleString('en-NG') || 'N/A'}`
    ).join('\n');

    const message = `🚨 *NEW ORDER PLACED!* 🚨

*Order ID:* ${order.order_number || order.id}
*Customer:* ${order.shipping_address?.name || 'N/A'}
*Phone:* ${order.shipping_address?.phone || 'N/A'}
*Total:* ₦${order.total_amount?.toLocaleString('en-NG') || 'N/A'}
*Delivery:* ${order.delivery_method || 'N/A'}
*Status:* ${order.status || 'pending'}

*Items:*
${orderItemsList || 'No items listed'}

*Shipping Address:*
${order.shipping_address?.address || 'N/A'}, ${order.shipping_address?.city || ''}, ${order.shipping_address?.state || ''}

👉 Review in Admin Dashboard`;

    console.log('WhatsApp message prepared:', message.substring(0, 100) + '...');

    const whatsappApiUrl = `https://graph.facebook.com/v19.0/${secrets.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const notificationPromises = adminNumbers.map(async (adminNumber, index) => {
      const whatsappPayload = {
        messaging_product: "whatsapp",
        to: adminNumber,
        type: "text",
        text: { body: message },
      };

      console.log(`📱 Sending to Admin ${index + 1}: ${adminNumber.substring(0, 8)}...`);

      const response = await fetch(whatsappApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secrets.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(whatsappPayload),
      });

      const responseData = await response.json();
      console.log(`Admin ${index + 1} response:`, response.status, responseData);

      return {
        admin: adminNumber,
        success: response.ok,
        status: response.status,
        data: responseData
      };
    });

    const results = await Promise.all(notificationPromises);
    const successes = results.filter(r => r.success).length;
    
    console.log(`✅ ${successes}/${adminNumbers.length} notifications sent successfully`);

    return new Response(
      JSON.stringify({ 
        message: `Processed ${successes}/${adminNumbers.length} notifications`,
        results 
      }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Edge Function ERROR:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});