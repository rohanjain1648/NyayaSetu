import { SanhitaMapping } from '../types/legal';

export const SANHITA_MAPPINGS: SanhitaMapping[] = [
  // PENAL LAW: IPC <-> BNS
  {
    id: 'bns-cheating',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 420',
    oldTitle: 'Cheating and dishonestly inducing delivery of property',
    newLaw: 'BNS',
    newSection: 'Section 318(4)',
    newTitle: 'Cheating and dishonestly inducing delivery of property',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'With Court Permission',
    punishmentOld: 'Imprisonment up to 7 years and fine',
    punishmentNew: 'Imprisonment up to 7 years and fine',
    keyChanges: [
      'Subsumed under consolidated Section 318 of BNS (clauses 1-4).',
      'Simple cheating is 318(1); aggravated cheating with inducement to deliver property is 318(4).',
      'Community service can be ordered in petty cheating matters under Section 4 BNS.'
    ],
    practicalNote: 'In bail applications, mention both S.420 IPC and S.318(4) BNS if the offense was committed or continued across the July 1, 2024 threshold.',
    landmarkPrecedent: 'Prof. R.K. Vijayasarathy v. Sudha Seetharam (2019) 16 SCC 739'
  },
  {
    id: 'bns-murder',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 302',
    oldTitle: 'Punishment for Murder',
    newLaw: 'BNS',
    newSection: 'Section 103(1)',
    newTitle: 'Punishment for Murder',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'Death or imprisonment for life, and fine',
    punishmentNew: 'Death or imprisonment for life, and fine',
    keyChanges: [
      'Relocated from Chapter XVI of IPC to Chapter VI of BNS (Offences Affecting Human Body).',
      'Section 103(2) introduces a specific offense for Lynching/Mob Murder committed on grounds of race, caste, sex, place of birth, language, or personal belief with mandatory death or life imprisonment.'
    ],
    practicalNote: 'Ensure that charges involving groups of 5+ persons targeting an individual on identity grounds are examined under S.103(2) BNS rather than general common intention.',
    landmarkPrecedent: 'Bachan Singh v. State of Punjab (1980) 2 SCC 684 (Rarest of Rare doctrine)'
  },
  {
    id: 'bns-culpable-homicide',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 304',
    oldTitle: 'Punishment for Culpable Homicide not amounting to murder',
    newLaw: 'BNS',
    newSection: 'Section 105',
    newTitle: 'Punishment for Culpable Homicide not amounting to murder',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'Part I: Life imprisonment or 10 yrs; Part II: 10 yrs or fine or both',
    punishmentNew: 'Part I: Life imprisonment or 10 yrs; Part II: Imprisonment up to 5 yrs or fine (Note adjustment in Part II term)',
    keyChanges: [
      'Refined penalty structures.',
      'Hit-and-run negligence separated into Section 106(2) with up to 10 years imprisonment if offender escapes without reporting to police/magistrate.'
    ],
    practicalNote: 'Carefully distinguish hit-and-run under S.106(2) BNS versus classic rash driving causing death.',
    landmarkPrecedent: 'State of A.P. v. Rayavarapu Punnayya (1976) 4 SCC 382'
  },
  {
    id: 'bns-theft',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 379',
    oldTitle: 'Punishment for Theft',
    newLaw: 'BNS',
    newSection: 'Section 303(2)',
    newTitle: 'Punishment for Theft',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable (in certain states) / Case-dependent',
    compoundable: 'Compoundable with owner consent if value < Rs. 2,000',
    punishmentOld: 'Imprisonment up to 3 years, or fine, or both',
    punishmentNew: 'Imprisonment up to 3 years, or fine, or both; First-time offender with stolen property value < Rs. 5,000 punishable with community service upon restitution.',
    keyChanges: [
      'Historic introduction of Community Service as an alternative punishment for petty theft under Rs. 5,000 (Section 303(2) proviso).'
    ],
    practicalNote: 'If defending a client for first-time petty theft where stolen goods value is under ₹5,000 and returned, directly invoke S.303(2) proviso for community service rather than jail.',
    landmarkPrecedent: 'K.N. Mehra v. State of Rajasthan AIR 1957 SC 369'
  },
  {
    id: 'bns-cbt',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 406',
    oldTitle: 'Punishment for Criminal Breach of Trust',
    newLaw: 'BNS',
    newSection: 'Section 316(2)',
    newTitle: 'Punishment for Criminal Breach of Trust',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'With Court Permission',
    punishmentOld: 'Imprisonment up to 3 years, or fine, or both',
    punishmentNew: 'Imprisonment up to 5 years, or fine, or both (Increased from 3 to 5 years!)',
    keyChanges: [
      'Maximum prison sentence increased from 3 years under IPC 406 to 5 years under BNS 316(2).',
      'Breach by carrier/wharfinger under 316(3); breach by clerk/servant under 316(4); public servant/banker under 316(5) carries up to life or 10 years.'
    ],
    practicalNote: 'Notice the enhancement of punishment from 3 to 5 years. This affects statutory bail limitation calculations under BNSS S.187.',
    landmarkPrecedent: 'Jaswantrai Manilal Akhaney v. State of Bombay AIR 1956 SC 575'
  },
  {
    id: 'bns-forgery',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 468',
    oldTitle: 'Forgery for purpose of cheating',
    newLaw: 'BNS',
    newSection: 'Section 338',
    newTitle: 'Forgery for purpose of cheating',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'Imprisonment up to 7 years and fine',
    punishmentNew: 'Imprisonment up to 7 years and fine',
    keyChanges: [
      'General forgery is Section 336 BNS (old IPC 465).',
      'Forgery of valuable security/will is Section 337 BNS (old IPC 467).',
      'Forgery for cheating is Section 338 BNS (old IPC 468).'
    ],
    practicalNote: 'Digital forgery clauses now directly interface with electronic signatures verified under BSA Section 63.',
    landmarkPrecedent: 'Sheila Sebastian v. R. Jawaharaj (2018) 7 SCC 581'
  },
  {
    id: 'bns-sedition-treason',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 124A',
    oldTitle: 'Sedition',
    newLaw: 'BNS',
    newSection: 'Section 152',
    newTitle: 'Act endangering sovereignty, unity and integrity of India',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'Life imprisonment or imprisonment up to 3 years and fine',
    punishmentNew: 'Imprisonment for life or up to 7 years and fine',
    keyChanges: [
      'Word "Sedition" completely omitted.',
      'Now criminalizes acts inciting armed rebellion, subversive activities, or encouraging feelings of separatist activities that endanger unity and integrity.',
      'Minimum penalty increased from 3 years to 7 years.'
    ],
    practicalNote: 'The Supreme Court stay in S.G. Vombatkere (2022) applied to S.124A IPC; Section 152 BNS sets a new statutory threshold requiring overt subversion.',
    landmarkPrecedent: 'Kedar Nath Singh v. State of Bihar AIR 1962 SC 955'
  },
  {
    id: 'bns-rash-driving',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 279',
    oldTitle: 'Rash driving or riding on a public way',
    newLaw: 'BNS',
    newSection: 'Section 281',
    newTitle: 'Rash driving or riding on a public way',
    offenseType: 'Cognizable',
    bailable: 'Bailable',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'Imprisonment up to 6 months, or fine up to ₹1,000, or both',
    punishmentNew: 'Imprisonment up to 6 months, or fine up to ₹1,000, or both; or Community Service',
    keyChanges: [
      'Added Community Service as a sentencing option.',
      'Linked with stricter standards for commercial public transport operators.'
    ],
    practicalNote: 'Police challans now cite S.281 BNS instead of 279 IPC.',
    landmarkPrecedent: 'State of Karnataka v. Muralidhar (2009) 4 SCC 463'
  },
  {
    id: 'bns-defamation',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'Section 499 / 500',
    oldTitle: 'Defamation and punishment for Defamation',
    newLaw: 'BNS',
    newSection: 'Section 356',
    newTitle: 'Defamation and punishment for Defamation',
    offenseType: 'Non-Cognizable',
    bailable: 'Bailable',
    compoundable: 'Compoundable',
    punishmentOld: 'Simple imprisonment up to 2 years, or fine, or both',
    punishmentNew: 'Simple imprisonment up to 2 years, or fine, or both; or Community Service',
    keyChanges: [
      'Both definition and punishment merged under single Section 356.',
      'Community service explicitly introduced as an alternative punishment for civil/reputation offenses.'
    ],
    practicalNote: 'Private criminal complaints for defamation should now be filed under Section 356 BNS read with Section 223 BNSS (cognizance on complaint).',
    landmarkPrecedent: 'Subramanian Swamy v. Union of India (2016) 7 SCC 221'
  },
  {
    id: 'bns-organized-crime',
    category: 'penal',
    oldLaw: 'IPC',
    oldSection: 'No direct IPC equivalent (previously state laws like MCOCA / KCOCA)',
    oldTitle: 'Organized Crime / Syndicate Crime (No Central IPC Section)',
    newLaw: 'BNS',
    newSection: 'Section 111 & 112',
    newTitle: 'Organized Crime (111) & Petty Organized Crime (112)',
    offenseType: 'Cognizable',
    bailable: 'Non-Bailable',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'N/A in general penal code (covered only under special state enactments)',
    punishmentNew: 'If death occurs: Death or life imprisonment + min ₹10 Lakhs fine; other cases: 5 yrs to life + min ₹5 Lakhs fine. Petty organized crime: 1 to 7 yrs + fine.',
    keyChanges: [
      'First time in Indian legal history that organized syndicate crime and gang-related theft/snatching are codified in the central penal law.',
      'Section 112 introduces "Petty Organized Crime" (theft, snatching, cheating, unauthorized selling of tickets, illegal betting).'
    ],
    practicalNote: 'Huge bail hurdle: Police frequently charge S.112 BNS in mobile snatching cases, elevating simple theft to organized crime.',
    landmarkPrecedent: 'State of Maharashtra v. Lalit Somdatta Nagpal (2007) 4 SCC 171'
  },

  // PROCEDURAL LAW: CrPC <-> BNSS
  {
    id: 'bnss-fir',
    category: 'procedure',
    oldLaw: 'CrPC',
    oldSection: 'Section 154',
    oldTitle: 'Information in cognizable cases (First Information Report - FIR)',
    newLaw: 'BNSS',
    newSection: 'Section 173',
    newTitle: 'Information in cognizable cases (Electronic FIR & Zero FIR codified)',
    offenseType: 'Cognizable',
    bailable: 'Case-dependent',
    compoundable: 'Case-dependent',
    punishmentOld: 'Procedural section',
    punishmentNew: 'Procedural section with statutory timeline (signature within 3 days)',
    keyChanges: [
      'Explicit statutory codification of Zero FIR (irrespective of jurisdiction).',
      'Electronic FIR (e-FIR) recognized nationwide; informant must sign within 3 days of electronic submission.',
      'Preliminary inquiry allowed for offenses punishable between 3 to 7 years with prior DySP permission within 14 days.'
    ],
    practicalNote: 'Advocates can cite Section 173(3) BNSS if police refuse to register FIR or abuse the 14-day preliminary inquiry window.',
    landmarkPrecedent: 'Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1 (Mandatory FIR registration)'
  },
  {
    id: 'bnss-police-remand',
    category: 'procedure',
    oldLaw: 'CrPC',
    oldSection: 'Section 167(2)',
    oldTitle: 'Procedure when investigation cannot be completed in 24 hours (Police Custody & Default Bail)',
    newLaw: 'BNSS',
    newSection: 'Section 187',
    newTitle: 'Procedure when investigation cannot be completed in 24 hours (Flexible Remand & Default Bail)',
    offenseType: 'Mixed / Case-dependent',
    bailable: 'Case-dependent',
    compoundable: 'Non-Compoundable',
    punishmentOld: 'Max 15 days police custody strictly in the FIRST 15 days of arrest',
    punishmentNew: 'Max 15 days police custody can now be granted in parts throughout the initial 40 or 60 days of the 60/90-day detention period!',
    keyChanges: [
      'Crucial strategic change: Under CrPC 167, police custody had to be exhausted in the first 15 days. Under S.187(3) BNSS, police remand can be sought at any stage within 40/60 days.',
      'Default bail threshold remains 60 days (for offenses up to 10 yrs) and 90 days (for life imprisonment / death / offenses above 10 yrs).'
    ],
    practicalNote: 'Advocates must vigorously resist police custody applications filed late in the 40/60 day period by demonstrating that previous judicial custody was sufficient.',
    landmarkPrecedent: 'CBI v. Anupam J. Kulkarni (1992) 3 SCC 141 (Now modified by BNSS S.187)'
  },
  {
    id: 'bnss-anticipatory-bail',
    category: 'procedure',
    oldLaw: 'CrPC',
    oldSection: 'Section 438',
    oldTitle: 'Direction for grant of bail to person apprehending arrest (Anticipatory Bail)',
    newLaw: 'BNSS',
    newSection: 'Section 482',
    newTitle: 'Direction for grant of bail to person apprehending arrest (Anticipatory Bail)',
    offenseType: 'Mixed / Case-dependent',
    bailable: 'Case-dependent',
    compoundable: 'Case-dependent',
    punishmentOld: 'Procedural relief',
    punishmentNew: 'Procedural relief with streamlined notice requirements',
    keyChanges: [
      'Substantive principles retained from landmark Constitution Bench in Sushila Aggarwal.',
      'Standardized notice to Public Prosecutor (not less than 7 days) in serious allegations.',
      'Sessions Court and High Court retain concurrent jurisdiction.'
    ],
    practicalNote: 'Heading of all Anticipatory Bail petitions must now state: "Application under Section 482 of the Bharatiya Nagarik Suraksha Sanhita, 2023" (do NOT confuse with old S.482 CrPC inherent powers!).',
    landmarkPrecedent: 'Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1'
  },
  {
    id: 'bnss-regular-bail',
    category: 'procedure',
    oldLaw: 'CrPC',
    oldSection: 'Section 437 / 439',
    oldTitle: 'When bail may be taken in case of non-bailable offense / Special powers of High Court/Sessions',
    newLaw: 'BNSS',
    newSection: 'Section 480 / 483',
    newTitle: 'Bail in non-bailable offences (480) & Special powers of High Court or Court of Session (483)',
    offenseType: 'Mixed / Case-dependent',
    bailable: 'Case-dependent',
    compoundable: 'Case-dependent',
    punishmentOld: 'Magistrate bail under 437, Sessions/HC under 439',
    punishmentNew: 'Magistrate bail under 480, Sessions/HC under 483',
    keyChanges: [
      'Section 479 BNSS provides landmark relief for undertrial prisoners: First-time offenders who have served 1/3rd of maximum imprisonment are entitled to mandatory bail (previously 1/2 under 436A CrPC).',
      'Electronic monitoring / audio-video hearing of bail applications now expressly enabled.'
    ],
    practicalNote: 'Always plead Section 479 BNSS if your client is a first-time undertrial who has completed one-third of the maximum sentence term.',
    landmarkPrecedent: 'Satender Kumar Antil v. CBI (2022) 10 SCC 51'
  },
  {
    id: 'bnss-quashing-inherent-powers',
    category: 'procedure',
    oldLaw: 'CrPC',
    oldSection: 'Section 482',
    oldTitle: 'Saving of inherent powers of High Court (Quashing of FIR / Proceedings)',
    newLaw: 'BNSS',
    newSection: 'Section 528',
    newTitle: 'Saving of inherent powers of High Court (Quashing of FIR / Proceedings)',
    offenseType: 'Mixed / Case-dependent',
    bailable: 'Case-dependent',
    compoundable: 'Case-dependent',
    punishmentOld: 'Inherent power of High Court',
    punishmentNew: 'Inherent power of High Court',
    keyChanges: [
      'The most famous section in Indian criminal litigation (Section 482 CrPC) has moved to Section 528 BNSS!',
      'All quashing petitions for abuse of process or compromise in High Courts must now be titled under Section 528 BNSS.'
    ],
    practicalNote: 'Critical draft warning: If you draft a quashing petition citing S.482, the registry will raise an objection because S.482 BNSS is now Anticipatory Bail!',
    landmarkPrecedent: 'State of Haryana v. Bhajan Lal 1992 Supp (1) SCC 335'
  },

  // EVIDENCE LAW: IEA <-> BSA
  {
    id: 'bsa-electronic-evidence',
    category: 'evidence',
    oldLaw: 'IEA',
    oldSection: 'Section 65B',
    oldTitle: 'Admissibility of electronic records (Mandatory 65B Certificate)',
    newLaw: 'BSA',
    newSection: 'Section 63',
    newTitle: 'Admissibility of electronic records (Electronic Record Certificate)',
    offenseType: 'Mixed / Case-dependent',
    bailable: 'Case-dependent',
    compoundable: 'Case-dependent',
    punishmentOld: 'Evidentiary rule of admissibility',
    punishmentNew: 'Evidentiary rule with codified statutory certificate schedule',
    keyChanges: [
      'Replaces old Section 65B of Indian Evidence Act, 1872.',
      'Mandatory certificate format explicitly structured in the Schedule to BSA.',
      'Broadens scope to include cloud storage, server logs, smartphone encrypted messaging, and semiconductor device outputs.',
      'Expert testimony can corroborate certificate under S.63(4).'
    ],
    practicalNote: 'Any WhatsApp chat, email, or CCTV footage tendered in court after July 1, 2024 must strictly carry a Section 63 BSA Certificate signed by the person in lawful control.',
    landmarkPrecedent: 'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1'
  },
  {
    id: 'bsa-primary-secondary-evidence',
    category: 'evidence',
    oldLaw: 'IEA',
    oldSection: 'Section 61 / 62 / 63',
    oldTitle: 'Primary and Secondary Evidence',
    newLaw: 'BSA',
    newSection: 'Section 57 & 58',
    newTitle: 'Primary and Secondary Evidence (Electronic records classified as primary in multiple copies)',
    offenseType: 'Mixed / Case-dependent',
    bailable: 'Case-dependent',
    compoundable: 'Case-dependent',
    punishmentOld: 'Standard document hierarchy',
    punishmentNew: 'Digital files stored in multiple simultaneous electronic locations qualify as primary evidence',
    keyChanges: [
      'Electronic records stored in simultaneous locations (e.g. distributed ledger, cloud synchronization) qualify as primary evidence under Explanation 4 to S.57 BSA.'
    ],
    practicalNote: 'Citing Explanation 4 of S.57 BSA helps bypass cumbersome secondary evidence hurdles for enterprise software logs.',
    landmarkPrecedent: 'Anvar P.V. v. P.K. Basheer (2014) 10 SCC 473'
  }
];
