import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.json()
    
    // Get the Pipedream webhook URL from Supabase secrets
    const pipedreamWebhook = Deno.env.get('PIPEDREAM_WEBHOOK_URL')
    
    if (!pipedreamWebhook) {
      throw new Error('Pipedream webhook URL not configured')
    }

    // Send data to Pipedream
    const response = await fetch(pipedreamWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toLocaleString('es-ES', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
        event: "Christmas Wedding RSVP",
        couple: "Rocío & Jorge",
        date: "23 de Diciembre, 2024"
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send to Pipedream')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'RSVP submitted successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})