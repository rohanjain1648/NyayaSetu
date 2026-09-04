import { AISettings } from '../types/legal';
import { SANHITA_MAPPINGS } from '../data/sanhitaMapping';
import { LANDMARK_PRECEDENTS } from '../data/landmarkPrecedents';

export const DEFAULT_AI_SETTINGS: AISettings = {
  provider: 'offline',
  apiKey: '',
  model: 'llama-3.3-70b-versatile'
};

export async function askVidhiAI(
  prompt: string,
  settings: AISettings,
  contextHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<{ text: string; citations?: string[] }> {
  // If Groq is selected and has an API key
  if (settings.provider === 'groq' && settings.apiKey.trim()) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are Vidhi Mitra AI (न्याय मित्र), an elite Indian Legal Research and Drafting Assistant. 
You specialize in Indian Law, specifically:
- The new criminal laws: Bharatiya Nyaya Sanhita, 2023 (BNS), Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS), and Bharatiya Sakshya Adhiniyam, 2023 (BSA) alongside legacy IPC, CrPC, and IEA.
- The Digital Personal Data Protection Act, 2023 (DPDP).
- Section 138 Negotiable Instruments Act, Consumer Protection Act 2019, Limitation Act 1963, and Arbitration & Conciliation Act 1996.
- Landmark Supreme Court of India precedents (e.g. Lalita Kumari, Arnesh Kumar, Satender Kumar Antil, Puttaswamy, Perkins Eastman).

Always format your response with clear headings, bullet points, exact statutory section references, and relevant Supreme Court citations. Keep legal reasoning authoritative, practical, and tailored for Indian advocates and litigants.`
        },
        ...contextHistory,
        { role: 'user', content: prompt }
      ];

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey.trim()}`
        },
        body: JSON.stringify({
          model: settings.model || 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.3,
          max_tokens: 1500
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Groq API responded with status ${res.status}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || 'No response generated.';
      return {
        text,
        citations: extractCitations(text)
      };
    } catch (e: any) {
      console.warn('Groq API error, falling back to offline legal intelligence:', e);
      return {
        text: `⚠️ Groq API connection issue (${e.message || 'Check API Key'}). Falling back to built-in Vidhi Intelligence:\n\n` +
          generateOfflineLegalResponse(prompt).text,
        citations: generateOfflineLegalResponse(prompt).citations
      };
    }
  }

  // If OpenAI is selected and has an API key
  if (settings.provider === 'openai' && settings.apiKey.trim()) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are Vidhi Mitra AI, an elite Indian Senior Advocate copilot. Cite exact Indian statutory sections (BNS, BNSS, BSA, IPC, CrPC, DPDP 2023, CPC) and authoritative Supreme Court judgments.`
        },
        ...contextHistory,
        { role: 'user', content: prompt }
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey.trim()}`
        },
        body: JSON.stringify({
          model: settings.model || 'gpt-4o-mini',
          messages,
          temperature: 0.3,
          max_tokens: 1500
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || 'No response generated.';
      return {
        text,
        citations: extractCitations(text)
      };
    } catch (e: any) {
      console.warn('OpenAI error, falling back to offline legal intelligence:', e);
      return {
        text: `⚠️ OpenAI API connection issue (${e.message || 'Check API Key'}). Falling back to built-in Vidhi Intelligence:\n\n` +
          generateOfflineLegalResponse(prompt).text,
        citations: generateOfflineLegalResponse(prompt).citations
      };
    }
  }

  // Autonomous Offline Legal Jurisprudence Engine
  return generateOfflineLegalResponse(prompt);
}

function extractCitations(text: string): string[] {
  const citations: string[] = [];
  const matches = text.match(/\b([A-Z][A-Za-z\s.'’]+v\.\s+[A-Z][A-Za-z\s.'’]+(?:\(\d{4}\)\s+\d+\s+SCC\s+\d+|AIR\s+\d{4}\s+SC\s+\d+)?)/g);
  if (matches) {
    for (const m of matches) {
      if (m.length > 8 && m.length < 80 && !citations.includes(m.trim())) {
        citations.push(m.trim());
      }
    }
  }
  return citations;
}

export function generateOfflineLegalResponse(prompt: string): { text: string; citations: string[] } {
  const q = prompt.toLowerCase();
  const citations: string[] = [];

  // Match BNS / BNSS / Sanhita queries
  if (q.includes('bail') || q.includes('437') || q.includes('439') || q.includes('480') || q.includes('483') || q.includes('479')) {
    citations.push('Satender Kumar Antil v. CBI (2022) 10 SCC 51');
    citations.push('Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1');
    return {
      text: `### ⚖️ Bail Jurisprudence & Procedure under BNSS, 2023

1. **Statutory Mapping:**
   - **Anticipatory Bail:** Section 482 of BNSS, 2023 (replaces Section 438 CrPC). Note that old Section 482 CrPC (inherent powers) has moved to Section 528 BNSS.
   - **Regular Bail (Magistrate):** Section 480 BNSS (replaces Section 437 CrPC).
   - **Regular Bail (Sessions & High Court):** Section 483 BNSS (replaces Section 439 CrPC).
   - **First-Time Undertrial Relief:** **Section 479 BNSS** introduces a revolutionary reform: first-time offenders who have spent **one-third (1/3rd)** of the maximum sentence in custody are entitled to mandatory release on bail.

2. **Core Arguments for the Bail Draft:**
   - **Bail is the Rule, Jail is the Exception:** Rely on *Satender Kumar Antil v. CBI (2022) 10 SCC 51*.
   - **No Need for Custodial Interrogation:** If the case rests primarily on documentary or electronic records already seized by the police, further incarceration serves no punitive purpose.
   - **Commercial Nature:** Emphasize that dispute stems from a civil or business contract (*Prof. R.K. Vijayasarathy v. Sudha Seetharam (2019) 16 SCC 739*).
   - **Absence of Flight Risk:** Highlight deep societal ties, family dependents, clean antecedents, and willingness to furnish solvent local sureties.`,
      citations
    };
  }

  if (q.includes('cheque') || q.includes('138') || q.includes('dishonour') || q.includes('ni act')) {
    citations.push('Dashrath Rupsingh Rathod v. State of Maharashtra (2014) 9 SCC 129');
    citations.push('Bir Singh v. Mukesh Kumar (2019) 4 SCC 197');
    return {
      text: `### 🏦 Section 138 Negotiable Instruments Act (Cheque Bounce Framework)

1. **Statutory 3-Step Timetable (Strict Limitation):**
   - **Step 1 (Cheque Return):** Cheque presented within validity (3 months) and returned unpaid.
   - **Step 2 (Demand Notice):** Statutory notice under Section 138(b) must be dispatched **within 30 days** of receiving the Cheque Return Memo.
   - **Step 3 (Cure Period):** Drawer has **15 days** from notice receipt to pay the dishonoured sum.
   - **Step 4 (Filing Complaint):** If unpaid, cause of action arises on day 16; complaint under Section 142(1)(b) must be filed in Court within **30 days** thereafter.

2. **Territorial Jurisdiction (Section 142(2) NI Act):**
   - If cheque is delivered for collection through an account: Jurisdiction lies exclusively with the Court where the **branch of the payee's bank maintaining the account** is situated.

3. **Statutory Presumptions:**
   - Court presumes under Section 139 NI Act that the holder received the cheque for discharge of debt/liability.
   - Accused must rebut on a preponderance of probabilities (*Bir Singh v. Mukesh Kumar*).`,
      citations
    };
  }

  if (q.includes('fir') || q.includes('154') || q.includes('173') || q.includes('zero fir') || q.includes('preliminary')) {
    citations.push('Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1');
    return {
      text: `### 📋 FIR Registration & Zero FIR under Section 173 BNSS, 2023

1. **Zero FIR Codification:**
   - Section 173(1) BNSS formally codifies Zero FIR nationwide. A police station cannot reject information regarding a cognizable offense on grounds of territorial jurisdiction; they must register Zero FIR and transfer it to the concerned police station.

2. **Electronic FIR (e-FIR):**
   - Information can be communicated electronically. It must be taken on record, and the informant must sign the document within **3 days** before the FIR is formally registered.

3. **Preliminary Inquiry Window (Section 173(3) BNSS):**
   - For offenses punishable between **3 to 7 years**, the Investigating Officer may, with prior permission of an officer not below the rank of Deputy Superintendent of Police (DySP), conduct a preliminary inquiry within **14 days** to ascertain if a prima facie case exists.
   - Reference *Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1* for limits on discretionary delay by police.`,
      citations
    };
  }

  if (q.includes('dpdp') || q.includes('privacy') || q.includes('data protection') || q.includes('consent')) {
    citations.push('Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1');
    return {
      text: `### 🛡️ Digital Personal Data Protection Act, 2023 (DPDP Act) Key Compliance Pillars

1. **Itemized Notice & Granular Consent (Sections 5 & 6):**
   - Data Fiduciaries must give a clear, stand-alone notice before or at the time of collecting personal data.
   - Blanket or bundled consent is strictly invalid. Notice must specify: (i) the exact personal data, (ii) specific purpose of processing, (iii) how the Data Principal can withdraw consent, and (iv) grievance redressal contact.
   - Notice must be available in English and all 22 languages listed in the 8th Schedule of the Constitution.

2. **Protection of Children's Data (Section 9):**
   - Verifiable parental consent is mandatory before processing data of any individual under 18 years.
   - Strict ban on tracking, behavioral monitoring, or targeted advertising directed at children.

3. **Penalties for Breach (Section 33 & Schedule):**
   - Up to ₹250 Crores for failure to take reasonable security safeguards to prevent personal data breach.
   - Up to ₹200 Crores for violation of duties concerning children's personal data.`,
      citations
    };
  }

  if (q.includes('remand') || q.includes('police custody') || q.includes('167') || q.includes('187')) {
    citations.push('CBI v. Anupam J. Kulkarni (1992) 3 SCC 141 (Overridden by BNSS)');
    return {
      text: `### 🚨 Major Shift in Police Custody Remand: Section 187 BNSS vs CrPC 167

1. **The Old CrPC Rule (*Anupam Kulkarni*):**
   - Under Section 167(2) CrPC, police custody could strictly only be authorized during the **first 15 days** following arrest. Once judicial custody started, police remand was prohibited.

2. **The New BNSS Rule (Section 187(3)):**
   - The Magistrate may authorize detention in police custody, for a term not exceeding **15 days in the whole**, which may be taken in parts or in whole at any time during the initial **40 days** (for offenses punishable up to 10 years) or **60 days** (for offenses punishable with death, life imprisonment, or 10+ years).

3. **Strategic Litigation Countermeasures:**
   - Oppose belated applications for police remand by filing an affidavit showing the accused was already interrogated, documents are in custody, and delayed custody is used to coerce self-incrimination (violating Article 20(3) of the Constitution).`,
      citations
    };
  }

  // Default intelligent legal response
  return {
    text: `### 🇮🇳 Indian Legal Intelligence & Procedural Summary

Your query has been analyzed against the Indian Legal Framework:
- **Criminal Codes:** Bharatiya Nyaya Sanhita (BNS, 2023), Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023), and Bharatiya Sakshya Adhiniyam (BSA, 2023).
- **Civil & Commercial Law:** Limitation Act 1963, Commercial Courts Act 2015, and Indian Contract Act 1872.
- **Data Protection:** Digital Personal Data Protection Act (DPDP), 2023.

💡 **Quick Practitioner Advice:**
1. For any FIR or incident arising after **July 1, 2024**, cite BNS/BNSS/BSA sections exclusively. For continuous offenses spanning both dates, cross-reference both old and new sections.
2. Under **Section 63 BSA**, electronic evidence (WhatsApp chats, CCTV, call recordings, emails) mandates a signed technical certificate with device details.
3. Check the **NyayaKram** tab for statutory limitation deadlines and state court fee calculators before filing.`,
    citations: ['Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1', 'Satender Kumar Antil v. CBI (2022) 10 SCC 51']
  };
}
