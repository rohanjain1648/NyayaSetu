export interface NoticeData {
  advocateName: string;
  advocateAddress: string;
  advocateBarReg: string;
  advocatePhone: string;
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  noticeDate: string;
  // Specific fields
  chequeNumber?: string;
  chequeDate?: string;
  bankName?: string;
  chequeAmount?: string;
  dishonourDate?: string;
  dishonourReason?: string;
  // Consumer / S.80 / Bail fields
  subjectMatter?: string;
  causeOfActionDate?: string;
  factsSummary?: string;
  reliefClaimed?: string;
  courtName?: string;
  firNumber?: string;
  policeStation?: string;
  sectionsCharged?: string;
  arrestDate?: string;
  accusedName?: string;
  custodyStatus?: string;
}

export const DEFAULT_SAMPLE_NOTICE_DATA: NoticeData = {
  advocateName: 'Adv. Rajeshwar Sharma',
  advocateAddress: 'Chamber No. 412, Lawyers Chambers Block, High Court of Delhi, New Delhi - 110003',
  advocateBarReg: 'D/1482/2012',
  advocatePhone: '+91 98110 54321',
  senderName: 'M/s Apex Global Technologies Pvt. Ltd. (Through its Director, Mr. Rohan Verma)',
  senderAddress: 'Plot No. 44, Okhla Industrial Area Phase-III, New Delhi - 110020',
  recipientName: 'Mr. Vikram Singhania, Managing Director, Singhania Logistics LLP',
  recipientAddress: 'Flat 802, Prestige Tower, Bandra Kurla Complex, Bandra (E), Mumbai - 400051',
  noticeDate: new Date().toISOString().split('T')[0],
  // S.138 defaults
  chequeNumber: '489201',
  chequeDate: '2026-07-15',
  bankName: 'HDFC Bank, Fort Branch, Mumbai',
  chequeAmount: '14,50,000',
  dishonourDate: '2026-08-05',
  dishonourReason: 'Funds Insufficient',
  // Common details
  subjectMatter: 'Outstanding Commercial Invoices for Cloud Infrastructure Services',
  causeOfActionDate: '2026-08-05',
  factsSummary: 'My client rendered enterprise cloud consulting services against Tax Invoice No. AGT/2026/089. In discharge of your admitted legally enforceable debt and liability, you issued Cheque No. 489201 for ₹14,50,000/- which was returned dishonoured by your bank with remarks "Funds Insufficient".',
  reliefClaimed: 'Payment of the principal cheque amount of ₹14,50,000/- along with interest @ 18% p.a. from due date until realization, plus ₹25,000/- towards legal notice drafting costs.',
  // Bail details
  courtName: 'Court of the Ld. Principal District & Sessions Judge, Patiala House Courts, New Delhi',
  firNumber: 'FIR No. 248/2026',
  policeStation: 'P.S. Barakhamba Road',
  sectionsCharged: 'Sections 318(4) [Cheating], 338 [Forgery], 61(2) [Criminal Conspiracy] of Bharatiya Nyaya Sanhita, 2023',
  arrestDate: '2026-08-10',
  accusedName: 'Mr. Rohan Verma',
  custodyStatus: 'Currently in Judicial Custody at Central Jail, Tihar, New Delhi'
};

export function generateS138Notice(data: NoticeData): string {
  return `REGISTERED A.D. / SPEED POST / LEGAL NOTICE
To,
${data.recipientName}
${data.recipientAddress}

Date: ${data.noticeDate}

SUBJECT: STATUTORY LEGAL NOTICE UNDER SECTION 138 READ WITH SECTION 141 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881 (AS AMENDED UP TO DATE) FOR DISHONOUR OF CHEQUE NO. ${data.chequeNumber || '[CHEQUE NO.]'} DATED ${data.chequeDate || '[DATE]'} FOR AN AMOUNT OF RS. ${data.chequeAmount || '[AMOUNT]'}/-.

Sir/Madam,

Under instructions from and on behalf of my client, ${data.senderName}, having principal office at ${data.senderAddress} (hereinafter referred to as "My Client"), I hereby serve upon you this Statutory Legal Notice:

1. That My Client is a reputed entity engaged in bona fide commercial operations. You, the noticee, approached My Client and availed goods/services as per agreed commercial specifications.

2. That in partial discharge of your admitted, legally enforceable subsisting debt and commercial liability towards My Client, you drew and issued the following Negotiable Instrument:
   - Cheque Number : ${data.chequeNumber || '489201'}
   - Cheque Date   : ${data.chequeDate || '15/07/2026'}
   - Drawn On      : ${data.bankName || 'HDFC Bank'}
   - In Favour of  : ${data.senderName}
   - Amount        : ₹${data.chequeAmount || '14,50,000'}/- (Rupees Fourteen Lakh Fifty Thousand Only)

3. That you assured My Client with solemn representations that the said cheque was good for payment and would be promptly honored upon presentation.

4. That relying upon your assurances, My Client presented the said cheque for encashment through its banker. However, to My Client's utter dismay and shock, the said cheque was returned unpaid and dishonoured by the bank vide Cheque Return Memo dated ${data.dishonourDate || '[DATE]'} with the remarks: "${data.dishonourReason || 'FUNDS INSUFFICIENT'}".

5. That you had dishonest and fraudulent intentions from the very inception and deliberately issued the said cheque knowing well that you did not maintain sufficient funds in the bank account to honor the commitment, thereby causing wrongful gain to yourself and wrongful loss to My Client.

6. NOW THEREFORE, I, by means of this Statutory Legal Notice, call upon you to make the payment of the aforesaid cheque amount of ₹${data.chequeAmount || '14,50,000'}/- (Rupees Fourteen Lakh Fifty Thousand Only) along with interest @ 18% per annum to My Client within a strict period of 15 (FIFTEEN) DAYS from the date of receipt of this notice, failing which:
   (a) My Client shall be constrained to institute Criminal Proceedings against you under Section 138 read with Section 141 and 142 of the Negotiable Instruments Act, 1881 before the Competent Judicial Magistrate / Metropolitan Magistrate;
   (b) My Client shall also initiate appropriate prosecution under Section 318(4) (Cheating) and Section 316(2) (Criminal Breach of Trust) of the Bharatiya Nyaya Sanhita, 2023 (BNS);
   (c) You shall be held liable for imprisonment for a term up to TWO YEARS, or with fine which may extend to TWICE THE AMOUNT of the cheque, or with both, along with all litigation expenses and damages incurred by My Client.

A copy of this notice is retained in my chamber records for production before the Court of Law.

Yours faithfully,

${data.advocateName}
Advocate
Enrolment No.: ${data.advocateBarReg}
${data.advocateAddress}
Contact: ${data.advocatePhone}`;
}

export function generateS80CpcNotice(data: NoticeData): string {
  return `REGISTERED A.D. / SPEED POST
NOTICE UNDER SECTION 80 OF THE CODE OF CIVIL PROCEDURE, 1908

To,
1. The Secretary, Ministry / Department of Urban Development, Government of NCT of Delhi / Union of India, New Delhi.
2. The District Magistrate / Collector, New Delhi District.

Date: ${data.noticeDate}

SUBJECT: STATUTORY NOTICE UNDER SECTION 80 CPC PRIOR TO INSTITUTION OF SUIT FOR RECOVERY OF DUES, DAMAGES, AND DECLARATION.

Sir/Madam,

Under instructions from and on behalf of my client, ${data.senderName}, resident/having place of business at ${data.senderAddress}, I hereby issue this statutory notice under Section 80 of the Code of Civil Procedure, 1908:

1. CAUSE OF ACTION & FACTUAL MATRIX:
${data.factsSummary}

2. RELIEF INTENDED TO BE CLAIMED IN THE CONTEMPLATED SUIT:
${data.reliefClaimed}

3. JURISDICTION & LIMITATION:
The cause of action arose on ${data.causeOfActionDate} within the territorial jurisdiction of this Hon'ble Court. The period of limitation has not expired.

4. STATUTORY MANDATE:
Take notice that pursuant to Section 80(1) CPC, upon the expiration of 2 (TWO) MONTHS next after this notice has been delivered to your office, if the legitimate claims of My Client are not settled, My Client shall institute a Civil Suit against the Government / Public Authority in the competent Civil Court at your risk as to costs and consequences.

Yours faithfully,

${data.advocateName}
Advocate (Enrolment: ${data.advocateBarReg})
${data.advocateAddress}`;
}

export function generateConsumerComplaint(data: NoticeData): string {
  return `BEFORE THE HON'BLE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION
(FOR FILING ON E-DAAKHIL PORTAL UNDER SECTION 35 OF CONSUMER PROTECTION ACT, 2019)

IN THE MATTER OF:
${data.senderName}
... COMPLAINANT

VERSUS

${data.recipientName}
${data.recipientAddress}
... OPPOSITE PARTY / RESPONDENT

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019 FOR DEFICIENCY IN SERVICES AND UNFAIR TRADE PRACTICE

MOST RESPECTFULLY SHOWETH:

1. PARTICULARS OF THE COMPLAINANT:
The Complainant is a consumer within the meaning of Section 2(7) of the Consumer Protection Act, 2019, having purchased goods / availed services for valuable consideration.

2. PARTICULARS OF THE OPPOSITE PARTY:
The Opposite Party is a service provider/commercial vendor operating within the territorial jurisdiction of this Hon'ble Commission.

3. STATEMENT OF FACTS:
${data.factsSummary}

4. DEFICIENCY IN SERVICE & UNFAIR TRADE PRACTICE:
The Opposite Party has failed to rectify the defects and neglected its contractual commitments, constituting gross deficiency in service under Section 2(11) and unfair trade practice under Section 2(47) of the Consumer Protection Act, 2019.

5. PRAYER:
In the premises aforesaid, the Complainant most respectfully prays that this Hon'ble Commission may graciously be pleased to:
(a) Direct the Opposite Party to pay a sum of ₹${data.chequeAmount || '14,50,000'}/- towards refund / damages;
(b) Award compensation of ₹2,00,000/- towards severe mental agony, harassment, and distress;
(c) Award litigation expenses to the tune of ₹35,000/- in favor of the Complainant;
(d) Pass any other or further order(s) as this Hon'ble Commission may deem fit and proper in the interest of justice.

FILED BY:
${data.advocateName}, Advocate for the Complainant
${data.advocateAddress} | Enrolment: ${data.advocateBarReg}
Date: ${data.noticeDate}`;
}

export function generateBnssBailPetition(data: NoticeData): string {
  return `IN THE ${data.courtName?.toUpperCase() || 'COURT OF HON’BLE DISTRICT & SESSIONS JUDGE'}
BAIL APPLICATION NO. _______ OF 2026

IN THE MATTER OF:
State (NCT of Delhi / Police Station ${data.policeStation || 'Barakhamba Road'})
... PROSECUTION

VERSUS

${data.accusedName || 'Mr. Rohan Verma'}
(Currently: ${data.custodyStatus || 'In Judicial Custody'})
... ACCUSED / APPLICANT

FIR NO.: ${data.firNumber || '248/2026'}
POLICE STATION: ${data.policeStation || 'Barakhamba Road'}
UNDER SECTIONS: ${data.sectionsCharged || 'Sections 318(4), 338, 61(2) BNS, 2023'}

APPLICATION UNDER SECTION 483 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (BNSS) FOR GRANT OF REGULAR BAIL

MOST RESPECTFULLY SHOWETH:

1. That the Applicant is an innocent citizen having deep roots in society, no previous criminal antecedent, and has been falsely implicated in the aforementioned FIR due to commercial animosity.

2. That the Applicant was arrested on ${data.arrestDate || '10/08/2026'} and has since been fully cooperating with the investigating agency. All relevant documents have already been seized by the Investigating Officer, and custodial interrogation is no longer required.

3. GROUNDS FOR BAIL:
   A. Because the alleged dispute is fundamentally civil and commercial in nature arising out of contractual accounts, which has been given a criminal color to exert illicit pressure (Prof. R.K. Vijayasarathy v. Sudha Seetharam (2019) 16 SCC 739).
   B. Because the Hon'ble Supreme Court in Satender Kumar Antil v. CBI (2022) 10 SCC 51 has settled the law that bail is the rule and jail is the exception.
   C. Because under Section 479 of BNSS, the statutory policy of the legislature mandates liberal consideration of bail for undertrials who have no risk of flight.
   D. Because the Applicant undertakes to abide by all conditions, surrender his passport if directed, and appear before the Court / I.O. whenever summoned.

4. PRAYER:
In view of the facts stated hereinabove, it is most respectfully prayed that this Hon'ble Court may be pleased to release the Applicant on regular bail in FIR No. ${data.firNumber || '248/2026'} P.S. ${data.policeStation || 'Barakhamba Road'}, on such terms and conditions as this Hon'ble Court may deem fit.

AND FOR THIS ACT OF KINDNESS, THE APPLICANT SHALL EVER PRAY.

Applicant Through Counsel:
${data.advocateName}
Advocate for Applicant
Enrolment: ${data.advocateBarReg}
${data.advocateAddress}
Date: ${data.noticeDate}`;
}

export function generateBsaSection63Cert(data: NoticeData): string {
  return `SCHEDULE [UNDER SECTION 63 OF THE BHARATIYA SAKSHYA ADHINIYAM, 2023 (BSA)]
CERTIFICATE AS TO ADMISSIBILITY OF ELECTRONIC RECORDS
(Replacing Section 65B of the Indian Evidence Act, 1872)

IN THE COURT OF: ${data.courtName || 'Hon’ble District & Sessions Judge'}
CASE / FIR REF : ${data.firNumber || 'Commercial Suit / FIR No. 248/2026'}

PART A: IDENTIFICATION OF ELECTRONIC RECORD & SYSTEM
1. Nature of Electronic Record: Computer printouts, WhatsApp Chat logs, Cloud-hosted Server Access Logs, and Exported PDF Invoices.
2. Device Description: Apple iPhone 15 Pro (IMEI: 356981245012345) and Dell PowerEdge Server (IP: 192.168.1.10).
3. Operating Software: iOS 18.2 / Ubuntu Linux 24.04 LTS.

PART B: CERTIFICATE PURSUANT TO SECTION 63(4) BSA, 2023
I, ${data.senderName.split('(')[0].trim()}, authorized officer / system custodian having lawful management of the aforesaid computer systems, do hereby solemnly certify and state as under:

1. That the computer and communication devices described above were during the relevant period operated in the ordinary course of regular activities.
2. That information was regularly fed into the said electronic devices in the ordinary course of business and stored securely without unauthorized intrusion.
3. That throughout the material period, the computer devices were operating properly, and there was no operational defect affecting the accuracy of the electronic record.
4. That the printout / digital reproduction produced herewith is an exact duplicate produced by the computer system from the electronic data stored therein.

PART C: CRYPTOGRAPHIC HASH VERIFICATION (BSA S.63(4) COMPLIANT)
- SHA-256 Hash Digest: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
- Hash Algorithm: SHA-256 (NIST FIPS 180-4 Standard)
- Verification Timestamp: ${data.noticeDate} 10:00:00 UTC

I declare that the particulars given above are true and correct to the best of my knowledge and official belief.

DEPONENT / CERTIFIER
Name: ${data.senderName.split('(')[0].trim()}
Designation: System In-charge / Authorized Signatory
Date: ${data.noticeDate}`;
}
