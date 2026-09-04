import { LandmarkPrecedent } from '../types/legal';

export const LANDMARK_PRECEDENTS: LandmarkPrecedent[] = [
  {
    citation: 'Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1',
    bench: '5-Judge Constitution Bench',
    topic: 'Mandatory FIR Registration',
    keyRatio: 'Registration of FIR is mandatory under Section 154 of the Code (now Section 173 BNSS) if the information discloses commission of a cognizable offence and no preliminary inquiry is permissible in such a situation.',
    relevanceToNewLaws: 'BNSS Section 173(3) now codifies this with a structured 14-day preliminary inquiry carve-out specifically for offences punishable between 3 and 7 years.'
  },
  {
    citation: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273',
    bench: '2-Judge Bench (Chandramauli Kr. Prasad & P.C. Ghose, JJ.)',
    topic: 'Checklist against Mechanical Arrests',
    keyRatio: 'Police officers shall not automatically arrest accused when offence is punishable with imprisonment up to 7 years without satisfying Section 41 CrPC requirements and serving Notice of Appearance under Section 41A.',
    relevanceToNewLaws: 'Section 35 of BNSS incorporates the Arnesh Kumar safeguards, mandating written reasons by the investigating officer before arresting for offences under 7 years.'
  },
  {
    citation: 'Satender Kumar Antil v. CBI (2022) 10 SCC 51',
    bench: '2-Judge Bench (S.K. Kaul & M.M. Sundresh, JJ.)',
    topic: 'Comprehensive Bail Guidelines & Categorisation of Offences',
    keyRatio: 'Laid down 4 categories (A, B, C, D) for bail. Non-arrest during investigation usually warrants grant of bail on appearance without remand to judicial custody. Emphasised that bail is the rule and jail is the exception.',
    relevanceToNewLaws: 'BNSS Section 479 directly reflects Antil’s philosophy by easing undertrial bail (1/3rd term for first-time offenders instead of 1/2).'
  },
  {
    citation: 'Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1',
    bench: '9-Judge Constitution Bench (Unanimous)',
    topic: 'Fundamental Right to Privacy under Article 21',
    keyRatio: 'The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution.',
    relevanceToNewLaws: 'Direct constitutional foundation for the Digital Personal Data Protection Act (DPDP), 2023.'
  },
  {
    citation: 'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1',
    bench: '3-Judge Bench (R.F. Nariman, S. Ravindra Bhat, V. Ramasubramanian, JJ.)',
    topic: 'Mandatory Certificate for Electronic Evidence',
    keyRatio: 'Production of Section 65B(4) Certificate is a condition precedent to the admissibility of electronic evidence in the form of secondary evidence.',
    relevanceToNewLaws: 'Now governed by Section 63 of Bharatiya Sakshya Adhiniyam, 2023 (BSA), which retains the mandatory certificate requirement with enhanced schedule formats.'
  },
  {
    citation: 'Perkins Eastman Architects DPC v. HSCC (India) Ltd. (2020) 20 SCC 760',
    bench: '2-Judge Bench (U.U. Lalit & Indu Malhotra, JJ.)',
    topic: 'Ineligibility to Unilaterally Appoint Sole Arbitrator',
    keyRatio: 'A person who is ineligible to be an arbitrator himself cannot nominate an arbitrator. An interested party cannot have sole authority to appoint the arbitrator.',
    relevanceToNewLaws: 'Core reference for striking down unilateral arbitration appointment clauses in Indian commercial contracts.'
  },
  {
    citation: 'Patil Automation Pvt. Ltd. v. Rakheja Engineers Pvt. Ltd. (2022) 10 SCC 1',
    bench: '2-Judge Bench (K.M. Joseph & Hrishikesh Roy, JJ.)',
    topic: 'Mandatory Pre-Institution Mediation under Commercial Courts Act',
    keyRatio: 'Section 12A of the Commercial Courts Act, 2015 is mandatory and any suit instituted without pre-institution mediation (unless urgent interim relief is sought) is liable to be rejected under Order VII Rule 11 CPC.',
    relevanceToNewLaws: 'Directly dictates limitation calculation: the mediation period is completely excluded from statutory limitation.'
  }
];
