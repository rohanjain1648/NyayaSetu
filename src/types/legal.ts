export type LawCategory = 'penal' | 'procedure' | 'evidence';

export interface SanhitaMapping {
  id: string;
  category: LawCategory;
  oldLaw: 'IPC' | 'CrPC' | 'IEA';
  oldSection: string;
  oldTitle: string;
  newLaw: 'BNS' | 'BNSS' | 'BSA';
  newSection: string;
  newTitle: string;
  offenseType: string;
  bailable: string;
  compoundable: string;
  punishmentOld: string;
  punishmentNew: string;
  keyChanges: string[];
  practicalNote: string;
  landmarkPrecedent?: string;
}

export type LimitationCategory = 
  | 'contract' 
  | 'tort' 
  | 'property' 
  | 'appeal' 
  | 'cheque_bounce' 
  | 'consumer' 
  | 'commercial_mediation';

export interface LimitationRule {
  id: string;
  title: string;
  category: LimitationCategory;
  article: string;
  statute: string;
  periodYears?: number;
  periodDays?: number;
  periodMonths?: number;
  triggerEvent: string;
  condonationApplicable: boolean; // Section 5 Limitation Act
  condonationNote: string;
  statutoryAdvice: string;
}

export interface CourtFeeStateTier {
  id: string;
  state: string;
  courtName: string;
  pecuniaryLimit: string;
  feeFormula: string;
  calculatorFn: (valuation: number) => { courtFee: number; formulaUsed: string; jurisdiction: string };
}

export interface LegalNoticeField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'date' | 'number';
  required: boolean;
  helpText?: string;
  defaultValue?: string;
}

export interface LegalNoticeTemplate {
  id: string;
  title: string;
  actReference: string;
  description: string;
  category: 'cheque_bounce' | 'consumer' | 'gov_notice' | 'bail';
  fields: LegalNoticeField[];
}

export interface ComplianceFinding {
  id: string;
  category: 'DPDP 2023' | 'Contract Act S.27' | 'Stamp Duty' | 'Arbitration Clause';
  severity: 'critical' | 'warning' | 'compliant';
  clauseSnippet: string;
  statutoryReference: string;
  riskDescription: string;
  remedyRecommendation: string;
  casePrecedent?: string;
}

export interface ComplianceAuditReport {
  score: number; // 0 to 100
  status: 'Safe' | 'Attention Required' | 'High Risk' | 'Non-Compliant';
  summary: string;
  findings: ComplianceFinding[];
  timestamp: string;
}

export interface LandmarkPrecedent {
  citation: string;
  bench: string;
  topic: string;
  keyRatio: string;
  relevanceToNewLaws: string;
}

export interface CauseListItem {
  id: string;
  caseNumber: string;
  courtName: string;
  judgeName: string;
  itemNumber: number;
  parties: string; // e.g. ABC Pvt Ltd vs State
  stage: 'Framing of Charges' | 'Arguments' | 'Cross Examination' | 'Orders' | 'Bail Hearing' | 'Admission';
  hearingDate: string;
  notes: string;
  status: 'Upcoming' | 'Passed Over' | 'Adjourned' | 'Disposed';
  nextDate?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: string[];
  suggestedAction?: string;
}

export interface AISettings {
  provider: 'offline' | 'groq' | 'openai';
  apiKey: string;
  model: string;
}
