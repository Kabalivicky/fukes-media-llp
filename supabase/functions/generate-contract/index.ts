import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_TEXT_LENGTH = 500;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_DELIVERABLES = 20;
const MAX_CLAUSES = 10;

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

function validateContractData(data: ContractData): string | null {
  if (!data.clientName || typeof data.clientName !== 'string' || data.clientName.length > MAX_TEXT_LENGTH) {
    return `Client name is required and must be under ${MAX_TEXT_LENGTH} characters`;
  }
  if (!data.projectName || typeof data.projectName !== 'string' || data.projectName.length > MAX_TEXT_LENGTH) {
    return `Project name is required and must be under ${MAX_TEXT_LENGTH} characters`;
  }
  if (!data.projectType || typeof data.projectType !== 'string' || data.projectType.length > MAX_TEXT_LENGTH) {
    return `Project type is required and must be under ${MAX_TEXT_LENGTH} characters`;
  }
  if (data.projectDescription && data.projectDescription.length > MAX_DESCRIPTION_LENGTH) {
    return `Project description must be under ${MAX_DESCRIPTION_LENGTH} characters`;
  }
  if (data.clientEmail && typeof data.clientEmail === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.clientEmail.length > 0 && !emailRegex.test(data.clientEmail)) {
      return 'Invalid email format';
    }
  }
  if (data.totalAmount !== undefined && (typeof data.totalAmount !== 'number' || data.totalAmount < 0 || data.totalAmount > 100000000)) {
    return 'Total amount must be a positive number';
  }
  if (data.revisionRounds !== undefined && (typeof data.revisionRounds !== 'number' || data.revisionRounds < 0 || data.revisionRounds > 100)) {
    return 'Revision rounds must be between 0 and 100';
  }
  if (data.deliverables && (!Array.isArray(data.deliverables) || data.deliverables.length > MAX_DELIVERABLES)) {
    return `Maximum ${MAX_DELIVERABLES} deliverables allowed`;
  }
  if (data.specialClauses && (!Array.isArray(data.specialClauses) || data.specialClauses.length > MAX_CLAUSES)) {
    return `Maximum ${MAX_CLAUSES} special clauses allowed`;
  }
  // Validate individual array items
  if (data.deliverables) {
    for (const d of data.deliverables) {
      if (typeof d !== 'string' || d.length > MAX_TEXT_LENGTH) {
        return `Each deliverable must be a string under ${MAX_TEXT_LENGTH} characters`;
      }
    }
  }
  if (data.specialClauses) {
    for (const c of data.specialClauses) {
      if (typeof c !== 'string' || c.length > MAX_TEXT_LENGTH) {
        return `Each clause must be a string under ${MAX_TEXT_LENGTH} characters`;
      }
    }
  }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await authSupabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const userId = claimsData.claims.sub;
    const contractData: ContractData = await req.json();

    // Validate input
    const validationError = validateContractData(contractData);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
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
              content: `You are a legal contract writer specializing in VFX and creative services contracts. Generate professional, legally-sound contract terms based on the provided details. Include standard clauses for scope of work, payment terms, intellectual property rights, revision policy, confidentiality, termination conditions, force majeure, and dispute resolution. Format the contract professionally with numbered sections.`
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

    if (!contractTerms) {
      contractTerms = generateFallbackContract(contractData);
    }

    const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: contract, error } = await adminSupabase
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
      return new Response(
        JSON.stringify({ error: 'Failed to save contract. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, contract, contractTerms }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating contract:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
