import { ComplianceFinding, ComplianceAuditReport } from '../types/legal';

export interface AuditPattern {
  id: string;
  category: ComplianceFinding['category'];
  regexList: RegExp[];
  severity: ComplianceFinding['severity'];
  statutoryReference: string;
  riskDescription: string;
  remedyRecommendation: string;
  casePrecedent?: string;
}

export const AUDIT_PATTERNS: AuditPattern[] = [
  {
    id: 's27-non-compete-post-termination',
    category: 'Contract Act S.27',
    regexList: [
      /not\s+compete|non-compete|restrain.*engag(ing|e)|shall\s+not\s+(work|provide\s+services|be\s+employed|join\s+any\s+competitor)/i,
      /period\s+of\s+\d+\s+(years|months)\s+(following|after)\s+(termination|cessation|separation)/i,
      /restriction\s+on\s+employment|covenant\s+not\s+to\s+compete/i
    ],
    severity: 'critical',
    statutoryReference: 'Section 27 of the Indian Contract Act, 1872',
    riskDescription: 'Post-termination non-compete covenants are strictly VOID ab initio under Indian law. Section 27 invalidates every agreement by which anyone is restrained from exercising a lawful profession, trade or business, except for sale of goodwill.',
    remedyRecommendation: 'Replace broad post-employment non-compete with enforceable post-employment Non-Solicitation of Clients/Employees and stringent Confidentiality / IP protection covenants.',
    casePrecedent: 'Percept D’Mark (India) Pvt. Ltd. v. Zaheer Khan (2006) 4 SCC 227 & Niranjan Shankar Golikari AIR 1967 SC 1098'
  },
  {
    id: 'unilateral-arbitrator-appointment',
    category: 'Arbitration Clause',
    regexList: [
      /sole\s+arbitrator\s+(appointed|nominated)\s+solely\s+by/i,
      /unilateral.*right\s+to\s+appoint\s+(an|the)\s+arbitrator/i,
      /managing\s+director\s+shall\s+be\s+the\s+sole\s+arbitrator/i,
      /company\s+shall\s+nominate\s+and\s+appoint/i
    ],
    severity: 'critical',
    statutoryReference: 'Section 12(5) read with Seventh Schedule of Arbitration and Conciliation Act, 1996',
    riskDescription: 'A party interested in the dispute or having authority to appoint an arbitrator cannot unilaterally appoint a sole arbitrator. Such clauses are void and unenforceable under the Perkins Eastman doctrine.',
    remedyRecommendation: 'Amend clause to specify mutual consent for Sole Arbitrator, or institutional arbitration (e.g. MCIA / DIAC rules), or appointment through High Court under Section 11(6).',
    casePrecedent: 'Perkins Eastman Architects DPC v. HSCC (India) Ltd. (2020) 20 SCC 760 & TRF Ltd. v. Energo (2017) 8 SCC 377'
  },
  {
    id: 'seat-vs-venue-ambiguity',
    category: 'Arbitration Clause',
    regexList: [
      /venue\s+of\s+arbitration\s+shall\s+be.*jurisdiction\s+of\s+courts\s+at/i,
      /place\s+and\s+venue\s+without\s+specifying\s+seat/i,
      /arbitration\s+in.*subject\s+to\s+exclusive\s+jurisdiction\s+of\s+another/i
    ],
    severity: 'warning',
    statutoryReference: 'Section 20 of Arbitration and Conciliation Act, 1996',
    riskDescription: 'Conflict between designated "Venue" and "Exclusive Court Jurisdiction" creates jurisdictional disputes regarding supervisory court powers for interim relief (S.9) or challenge (S.34).',
    remedyRecommendation: 'Explicitly designate the "Seat" of arbitration (e.g. "The seat and venue of arbitration shall be New Delhi, and the courts at New Delhi shall have exclusive jurisdiction").',
    casePrecedent: 'Bharat Aluminium Co. (BALCO) v. Kaiser Aluminium Technical Services (2012) 9 SCC 552 & BGS SGS SOMA JV (2020) 4 SCC 234'
  },
  {
    id: 'dpdp-consent-notice-missing',
    category: 'DPDP 2023',
    regexList: [
      /collect.*personal\s+data\s+without\s+notice/i,
      /consent\s+implied\s+by\s+usage/i,
      /blanket\s+consent\s+for\s+all\s+future\s+purposes/i,
      /opt-out\s+only\s+consent/i
    ],
    severity: 'critical',
    statutoryReference: 'Section 5 & 6 of Digital Personal Data Protection Act, 2023',
    riskDescription: 'DPDP Act 2023 requires consent to be free, specific, informed, unconditional, and unambiguous with a clear affirmative action accompanied by an itemized notice in plain language (and available in 22 8th Schedule languages). Blanket or implied consent attracts penalties up to ₹250 Crores.',
    remedyRecommendation: 'Provide a granular, clear itemized Notice under Section 5(1) specifying the exact personal data collected, specific purpose, manner of exercising grievance redressal, and withdrawal of consent.',
    casePrecedent: 'DPDP Act 2023 statutory mandate read with Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1'
  },
  {
    id: 'dpdp-child-data-processing',
    category: 'DPDP 2023',
    regexList: [
      /track(ing)?.*minors?|behavioral\s+monitoring\s+of\s+children/i,
      /target(ed)?\s+advertis(ing|ement)\s+to\s+minors?/i,
      /data\s+of\s+individuals\s+under\s+18\s+years/i
    ],
    severity: 'critical',
    statutoryReference: 'Section 9 of Digital Personal Data Protection Act, 2023',
    riskDescription: 'Section 9 strictly prohibits processing personal data likely to cause detrimental effect on well-being of a child, and expressly forbids tracking, behavioral monitoring, or targeted advertising directed at children (<18 years). Penalty up to ₹200 Crores.',
    remedyRecommendation: 'Implement verifiable parental consent mechanisms and disable any behavioral tracking or targeted ads for users under 18.',
    casePrecedent: 'Section 9 & Section 33 Schedule to DPDP Act 2023'
  },
  {
    id: 'stamp-duty-inadequacy',
    category: 'Stamp Duty',
    regexList: [
      /unstamped|stamp\s+duty\s+deferred|executed\s+on\s+plain\s+paper/i,
      /agreement\s+executed\s+without\s+stamp/i,
      /stamp\s+duty\s+to\s+be\s+paid\s+only\s+upon\s+dispute/i
    ],
    severity: 'warning',
    statutoryReference: 'Section 33 & 35 of the Indian Stamp Act, 1899 & State Stamp Acts',
    riskDescription: 'An unstamped or insufficiently stamped agreement cannot be admitted in evidence for any purpose, nor acted upon until properly impounded and deficiency plus penalty (up to 10x) is paid.',
    remedyRecommendation: 'Ensure franking / e-stamping is executed prior to or at the time of execution in accordance with relevant State Stamp Act rates (e.g. Maharashtra Stamp Act Art. 5(h) / Delhi Stamp Rules).',
    casePrecedent: 'In Re: Interplay between Arbitration Agreements and Stamp Act (7-Judge Bench, 2023 SC)'
  }
];

export function auditContractText(text: string): ComplianceAuditReport {
  if (!text || text.trim().length === 0) {
    return {
      score: 100,
      status: 'Safe',
      summary: 'No contract text provided for audit.',
      findings: [],
      timestamp: new Date().toISOString()
    };
  }

  const findings: ComplianceFinding[] = [];
  let penaltyPoints = 0;

  for (const pattern of AUDIT_PATTERNS) {
    let matched = false;
    let matchedSnippet = '';

    for (const regex of pattern.regexList) {
      const match = text.match(regex);
      if (match) {
        matched = true;
        const index = match.index || 0;
        const start = Math.max(0, index - 40);
        const end = Math.min(text.length, index + match[0].length + 60);
        matchedSnippet = text.substring(start, end).replace(/\s+/g, ' ').trim();
        break;
      }
    }

    if (matched) {
      if (pattern.severity === 'critical') {
        penaltyPoints += 25;
      } else if (pattern.severity === 'warning') {
        penaltyPoints += 12;
      }

      findings.push({
        id: pattern.id,
        category: pattern.category,
        severity: pattern.severity,
        clauseSnippet: matchedSnippet || 'Pattern identified in document text',
        statutoryReference: pattern.statutoryReference,
        riskDescription: pattern.riskDescription,
        remedyRecommendation: pattern.remedyRecommendation,
        casePrecedent: pattern.casePrecedent
      });
    }
  }

  // If no violations found but text is substantial, add positive compliance markers
  if (findings.length === 0 && text.length > 100) {
    findings.push({
      id: 'clean-audit-pass',
      category: 'DPDP 2023',
      severity: 'compliant',
      clauseSnippet: 'Audited sample text analyzed against S.27 Contract Act, DPDP 2023, Stamp & Arbitration rules.',
      statutoryReference: 'Standard Indian Commercial Laws',
      riskDescription: 'No standard invalidity triggers detected in the analyzed text snippet.',
      remedyRecommendation: 'Regularly monitor updates from the Data Protection Board of India and jurisdictional Stamp offices.'
    });
  }

  const score = Math.max(10, 100 - penaltyPoints);
  let status: ComplianceAuditReport['status'] = 'Safe';
  if (score < 40) status = 'Non-Compliant';
  else if (score < 70) status = 'High Risk';
  else if (score < 90) status = 'Attention Required';

  return {
    score,
    status,
    summary: findings.length === 0 
      ? 'Contract text appears free from standard high-risk void covenants.' 
      : `Identified ${findings.filter(f => f.severity === 'critical').length} critical issues and ${findings.filter(f => f.severity === 'warning').length} warnings requiring contractual redrafting.`,
    findings,
    timestamp: new Date().toISOString()
  };
}
