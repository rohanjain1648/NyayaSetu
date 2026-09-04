import { LimitationRule } from '../types/legal';

export const LIMITATION_RULES: LimitationRule[] = [
  {
    id: 's138-ni-act',
    title: 'Section 138 NI Act (Dishonour of Cheque Timeline)',
    category: 'cheque_bounce',
    article: 'Section 138 & 142 of Negotiable Instruments Act, 1881',
    statute: 'Negotiable Instruments Act, 1881',
    periodDays: 30,
    triggerEvent: 'Receipt of Cheque Return Memo showing insufficient funds/exceeds arrangement',
    condonationApplicable: true,
    condonationNote: 'Section 142(1)(b) proviso allows Magistrate to take cognizance after 30 days upon showing sufficient cause.',
    statutoryAdvice: 'Strict multi-stage statutory timetable:\n1. Statutory Demand Notice must be issued within 30 days of receiving bank memo.\n2. Drawer is granted 15 days cure period from date of notice receipt to pay.\n3. If unpaid after 15 days, cause of action arises; complaint must be filed in Court within 30 days thereafter.'
  },
  {
    id: 'contract-breach-suit',
    title: 'Suit for Breach of Contract (Damages / Recovery of Money)',
    category: 'contract',
    article: 'Article 55',
    statute: 'The Limitation Act, 1963',
    periodYears: 3,
    triggerEvent: 'Date when contract is broken, or (where successive breaches) when each breach occurs',
    condonationApplicable: false,
    condonationNote: 'Section 5 of the Limitation Act does NOT apply to original suits. If limitation is missed, suit is dismissed under Section 3.',
    statutoryAdvice: 'Check for acknowledgment of debt in writing (Section 18 Limitation Act) or partial payment (Section 19), which creates a fresh period of 3 years from the date of acknowledgment.'
  },
  {
    id: 'accounts-recovery-suit',
    title: 'Suit for Balance due on Open, Current and Mutual Account',
    category: 'contract',
    article: 'Article 1',
    statute: 'The Limitation Act, 1963',
    periodYears: 3,
    triggerEvent: 'Close of the financial year in which the last admitted item is entered in the account',
    condonationApplicable: false,
    condonationNote: 'Section 5 does not apply to original suits.',
    statutoryAdvice: 'Crucial for commercial debt recovery: Ensure mutual reciprocal obligations exist between parties rather than one-way billing.'
  },
  {
    id: 'immovable-property-possession',
    title: 'Suit for Possession of Immovable Property based on Title',
    category: 'property',
    article: 'Article 65',
    statute: 'The Limitation Act, 1963',
    periodYears: 12,
    triggerEvent: 'When the possession of the defendant becomes adverse to the plaintiff',
    condonationApplicable: false,
    condonationNote: 'Adverse possession title ripens under Section 27 (Extinguishment of right to property) if suit not filed within 12 years.',
    statutoryAdvice: 'Burden is on defendant to prove hostile, continuous, and open possession for 12 uninterrupted years.'
  },
  {
    id: 'consumer-protection-complaint',
    title: 'Consumer Complaint before District / State / National Commission',
    category: 'consumer',
    article: 'Section 69',
    statute: 'Consumer Protection Act, 2019',
    periodYears: 2,
    triggerEvent: 'Date on which the cause of action has arisen (deficiency in goods/services)',
    condonationApplicable: true,
    condonationNote: 'Section 69(2) allows Consumer Commission to condone delay if complainant satisfies sufficient cause with written reasons.',
    statutoryAdvice: 'Must be filed via e-Daakhil or physical registry. File an application for condonation of delay along with supporting affidavit if approaching after 2 years.'
  },
  {
    id: 'commercial-mediation-cooling',
    title: 'Commercial Suit Pre-Institution Mediation (S.12A Mandate)',
    category: 'commercial_mediation',
    article: 'Section 12A',
    statute: 'Commercial Courts Act, 2015',
    periodMonths: 3,
    triggerEvent: 'Application filed before Legal Services Authority (extendable by 2 months with consent)',
    condonationApplicable: false,
    condonationNote: 'Mandatory non-waivable requirement unless urgent interim relief is contemplated (Patil Automation case).',
    statutoryAdvice: 'The time spent in pre-institution mediation (up to 3 months + 2 months extension) is completely excluded from the limitation calculation under S.12A(3).'
  },
  {
    id: 'high-court-appeal-civil',
    title: 'Appeal to High Court from Decree/Order of Subordinate Court',
    category: 'appeal',
    article: 'Article 116(a)',
    statute: 'The Limitation Act, 1963',
    periodDays: 90,
    triggerEvent: 'Date of decree or order appealed from',
    condonationApplicable: true,
    condonationNote: 'Section 5 of Limitation Act applies. Certified copy preparation time is excluded under Section 12(2).',
    statutoryAdvice: 'Always obtain certified copy application receipt; days between applying for certified copy and copy readiness are strictly excluded.'
  },
  {
    id: 'district-court-appeal',
    title: 'Appeal to District Court from Trial Court Decree',
    category: 'appeal',
    article: 'Article 116(b)',
    statute: 'The Limitation Act, 1963',
    periodDays: 30,
    triggerEvent: 'Date of decree or order appealed from',
    condonationApplicable: true,
    condonationNote: 'Section 5 application for condonation of delay can be filed.',
    statutoryAdvice: 'Short 30-day window. Apply for certified copy immediately within 7 days of judgment pronouncement.'
  }
];
