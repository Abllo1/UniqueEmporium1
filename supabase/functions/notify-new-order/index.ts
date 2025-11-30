import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// The Supabase client is not directly used for database operations in this specific function,
// but it's often included in Edge Functions for potential future use or consistency.
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const order = payload.record; // The new order record from the database trigger

    console.log("Received new order for WhatsApp notification:", order.id);

    // Retrieve secrets from environment variables
    const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_TOKEN');
    const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const ADMIN_WHATSAPP_NUMBER_1 = Deno.env.get('ADMIN_WHATSAPP_NUMBER_1');
    const ADMIN_WHATSAPP_NUMBER_2 = Deno.env.get('ADMIN_WHATSAPP_NUMBER_2');

    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error("Missing WhatsApp API credentials. WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID not set.");
      return new Response(JSON.stringify({ error: "WhatsApp API credentials missing." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const adminNumbers = [ADMIN_WHATSAPP_NUMBER_1, ADMIN_WHATSAPP_NUMBER_2].filter(Boolean); // Filter out any undefined/null numbers

    if (adminNumbers.length === 0) {
      console.warn("No admin WhatsApp numbers configured. Skipping WhatsApp notification.");
      return new Response(JSON.stringify({ message: "No admin numbers configured, notification skipped." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const orderItemsList = order.items.map((item: any) => 
      `- ${item.product_name} (${item.quantity} ${item.unit_type}) @ ₦${item.unit_price.toLocaleString('en-NG')}`
    ).join('\n');

    const messageBody = `🚨 NEW ORDER PLACED! 🚨
Order ID: ${order.order_number || order.id}
Customer: ${order.shipping_address.name}
Phone: ${order.shipping_address.phone || order.profiles?.phone || 'N/A'}
Total Amount: ₦${order.total_amount.toLocaleString('en-NG')}
Delivery Method: ${order.delivery_method}
Status: ${order.status}

Items:
${orderItemsList}

Shipping Address:
${order.shipping_address.address}, ${order.shipping_address.city}, ${order.shipping_address.state}

Please review and process this order in the admin dashboard.`;

    const whatsappApiUrl = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const notificationPromises = adminNumbers.map(async (adminNumber) => {
      const whatsappPayload = {
        messaging_product: "whatsapp",
        to: adminNumber,
        type: "text",
        text: {
          body: messageBody,
        },
      };

      console.log(`Attempting to send WhatsApp message to ${adminNumber} for order ${order.id}`);
      const response = await fetch(whatsappApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(whatsappPayload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error(`Failed to send WhatsApp message to ${adminNumber}:`, response.status, responseData);
        return { success: false, number: adminNumber, error: responseData };
      } else {
        console.log(`WhatsApp message sent successfully to ${adminNumber} for order ${order.id}:`, responseData);
        return { success: true, number: adminNumber, data: responseData };
      }
    });

    const results = await Promise.all(notificationPromises);
    console.log("WhatsApp notification results:", results);

    return new Response(JSON.stringify({ message: "Admin notification processed.", results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in notify-new-order Edge Function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});