import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContractData {
  clientName: string;
  clientEmail: string;
  projectName: string;
  projectType: string;
  projectDescription?: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  currency: string;
  paymentTerms: string;
  revisionRounds: number;
  ipRights: string;
  deliverables: string[];
  specialClauses: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    const contractData: ContractData = await req.json();

    // Validate required fields
    if (!contractData.clientName || !contractData.projectName || !contractData.projectType) {
      throw new Error('Missing required contract fields');
    }

    // Generate contract terms using AI
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    let contractTerms = '';

    if (apiKey) {
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-3-flash-preview',
          messages: [
            {
              role: 'system',
              content: `You are a legal contract writer specializing in VFX and creative services contracts. Generate professional, legally-sound contract terms based on the provided details. Include standard clauses for:
- Scope of work
- Payment terms
- Intellectual property rights
- Revision policy
- Confidentiality
- Termination conditions
- Force majeure
- Dispute resolution

Format the contract professionally with numbered sections.`
            },
            {
              role: 'user',
              content: `Generate a VFX/Creative Services contract with these details:
- Client: ${contractData.clientName}
- Project: ${contractData.projectName}
- Type: ${contractData.projectType}
- Description: ${contractData.projectDescription || 'VFX and creative services'}
- Start Date: ${contractData.startDate}
- End Date: ${contractData.endDate}
- Total Amount: ${contractData.currency} ${contractData.totalAmount}
- Payment Terms: ${contractData.paymentTerms}
- Revision Rounds: ${contractData.revisionRounds}
- IP Rights: ${contractData.ipRights}
- Deliverables: ${contractData.deliverables?.join(', ') || 'As specified in scope of work'}
- Special Clauses: ${contractData.specialClauses?.join('; ') || 'None specified'}`
            }
          ],
          max_tokens: 2048,
          temperature: 0.3,
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        contractTerms = aiData.choices?.[0]?.message?.content || '';
      }
    }

    // If AI generation failed, use a template
    if (!contractTerms) {
      contractTerms = generateFallbackContract(contractData);
    }

    // Save contract to database
    const { data: contract, error } = await supabase
      .from('contracts')
      .insert({
        user_id: userId,
        client_name: contractData.clientName,
        client_email: contractData.clientEmail || '',
        project_name: contractData.projectName,
        project_type: contractData.projectType,
        project_description: contractData.projectDescription,
        start_date: contractData.startDate,
        end_date: contractData.endDate,
        total_amount: contractData.totalAmount || 0,
        currency: contractData.currency || 'USD',
        payment_terms: contractData.paymentTerms,
        revision_rounds: contractData.revisionRounds || 2,
        ip_rights: contractData.ipRights,
        deliverables: contractData.deliverables || [],
        special_clauses: contractData.specialClauses || [],
        contract_terms: contractTerms,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to save contract');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        contract: contract,
        contractTerms: contractTerms
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating contract:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function generateFallbackContract(data: ContractData): string {
  return `
VFX/CREATIVE SERVICES AGREEMENT

This Agreement is entered into as of ${data.startDate}

BETWEEN:
Fuke's Media LLP ("Service Provider")
AND:
${data.clientName} ("Client")

1. PROJECT SCOPE
Project Name: ${data.projectName}
Project Type: ${data.projectType}
Description: ${data.projectDescription || 'As specified in the attached scope document'}

2. TERM
Start Date: ${data.startDate}
End Date: ${data.endDate}

3. COMPENSATION
Total Amount: ${data.currency || 'USD'} ${data.totalAmount || 'TBD'}
Payment Terms: ${data.paymentTerms || 'As agreed'}

4. REVISIONS
Number of included revision rounds: ${data.revisionRounds || 2}
Additional revisions will be billed at the prevailing hourly rate.

5. INTELLECTUAL PROPERTY
${data.ipRights === 'client' ? 'Full transfer of all rights to Client upon final payment.' : 
  data.ipRights === 'license' ? 'License granted to Client for specified use.' :
  'Shared rights as specified.'}

6. CONFIDENTIALITY
Both parties agree to maintain confidentiality of all project materials and proprietary information.

7. TERMINATION
Either party may terminate with 30 days written notice. Client responsible for work completed.

8. DELIVERABLES
${data.deliverables?.join('\n') || 'As specified in scope of work'}

${data.specialClauses?.length ? `9. SPECIAL CLAUSES\n${data.specialClauses.join('\n')}` : ''}

This contract is generated by Fuke's Media Contract Builder and requires signatures from both parties to be legally binding.
`;
}