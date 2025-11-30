import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // This Edge Function is primarily invoked by a database trigger,
    // so direct user authentication might not be strictly necessary here
    // unless you also want to allow direct invocation from authenticated clients.
    // For a trigger, the JWT verification is often bypassed or handled differently.

    const payload = await req.json();
    const order = payload.record; // Assuming the trigger sends the new order record

    console.log("Received new order for notification:", order.id);

    // --- IMPORTANT: Integrate with your chosen notification service here ---
    // This is where you would use your WhatsApp Business Platform API,
    // email service API (e.g., SendGrid), or Slack webhook.
    // You would access your API keys/secrets using Deno.env.get('YOUR_SECRET_NAME').

    // Example placeholder for sending a WhatsApp message via a hypothetical API:
    // const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY');
    // const adminPhoneNumber = Deno.env.get('ADMIN_WHATSAPP_NUMBER'); // Admin's number to notify

    // if (whatsappApiKey && adminPhoneNumber) {
    //   const message = `New Order Placed!
    //     Order ID: ${order.order_number || order.id}
    //     Customer: ${order.shipping_address.name}
    //     Total: ₦${order.total_amount.toLocaleString()}
    //     Status: ${order.status}
    //     View in Admin: [Link to Admin Order Page]`; // Replace with actual admin link

    //   // Example fetch call to a WhatsApp BSP API (e.g., Twilio, MessageBird)
    //   // This is highly dependent on your chosen BSP's API structure.
    //   // await fetch('https://api.whatsapp.com/v1/messages', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //     'Authorization': `Bearer ${whatsappApiKey}`,
    //   //   },
    //   //   body: JSON.stringify({
    //   //     to: adminPhoneNumber,
    //   //     type: 'text',
    //   //     text: { body: message },
    //   //   }),
    //   // });
    //   console.log(`Admin notification simulated for order ${order.id}`);
    // } else {
    //   console.warn("WhatsApp API key or admin phone number not configured. Skipping WhatsApp notification.");
    // }
    // ---------------------------------------------------------------------

    return new Response(JSON.stringify({ message: "Admin notification processed." }), {
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