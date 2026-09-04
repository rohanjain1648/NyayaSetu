import { CourtFeeStateTier } from '../types/legal';

export const STATE_COURT_FEE_TIERS: CourtFeeStateTier[] = [
  {
    id: 'delhi-hc-original',
    state: 'Delhi (NCT)',
    courtName: 'Delhi High Court (Original Side) vs District Courts',
    pecuniaryLimit: 'District Courts: Up to ₹2,00,00,000 (2 Crores) | High Court: Above ₹2 Crores',
    feeFormula: 'Delhi Court Fees Act: Ad-valorem graduated slab (~1.25% to 2.5% up to ₹50,000, thereafter progressive flat/percent rate, standard civil recovery)',
    calculatorFn: (valuation: number) => {
      let fee = 0;
      let jurisdiction = '';
      if (valuation <= 300000) {
        jurisdiction = 'Civil Judge (Junior Division) / Commercial Court';
      } else if (valuation <= 20000000) {
        jurisdiction = 'District Judge / Additional District Judge (Commercial Court)';
      } else {
        jurisdiction = 'Hon’ble High Court of Delhi (Ordinary Original Civil Jurisdiction)';
      }

      // Standard Delhi ad valorem calculation
      if (valuation <= 100000) {
        fee = Math.max(500, Math.round(valuation * 0.025));
      } else if (valuation <= 1000000) {
        fee = Math.round(2500 + (valuation - 100000) * 0.018);
      } else if (valuation <= 10000000) {
        fee = Math.round(18700 + (valuation - 1000000) * 0.012);
      } else {
        fee = Math.round(126700 + (valuation - 10000000) * 0.008);
      }

      return {
        courtFee: fee,
        formulaUsed: 'Delhi Court Fees (Amendment) Act graduated ad-valorem schedule',
        jurisdiction
      };
    }
  },
  {
    id: 'maharashtra-bombay',
    state: 'Maharashtra',
    courtName: 'Bombay High Court (Original Side) vs Bombay City Civil Court',
    pecuniaryLimit: 'City Civil Court: Up to ₹1,00,00,000 (1 Crore) | High Court: Above ₹1 Crore',
    feeFormula: 'Maharashtra Court Fees Act: Ad-valorem with a statutory maximum cap of ₹3,00,000',
    calculatorFn: (valuation: number) => {
      let jurisdiction = '';
      if (valuation <= 10000000) {
        jurisdiction = 'Bombay City Civil Court (Greater Mumbai) / District Court';
      } else {
        jurisdiction = 'Hon’ble High Court of Judicature at Bombay (Original Side)';
      }

      // Maharashtra Court Fees Act Schedule 1 Article 1
      let fee = 0;
      if (valuation <= 50000) {
        fee = Math.round(valuation * 0.03);
      } else if (valuation <= 200000) {
        fee = Math.round(1500 + (valuation - 50000) * 0.025);
      } else if (valuation <= 1000000) {
        fee = Math.round(5250 + (valuation - 200000) * 0.02);
      } else {
        fee = Math.round(21250 + (valuation - 1000000) * 0.015);
      }

      // Max ceiling under Maharashtra Court Fees Act is Rs. 3,00,000
      const cappedFee = Math.min(fee, 300000);

      return {
        courtFee: cappedFee,
        formulaUsed: fee > 300000 
          ? 'Maharashtra Court Fees Act (Calculated fee exceeded cap; capped at Statutory Max ₹3,00,000)' 
          : 'Maharashtra Court Fees Act Schedule I Article 1',
        jurisdiction
      };
    }
  },
  {
    id: 'karnataka-blr',
    state: 'Karnataka',
    courtName: 'City Civil Court Bengaluru / Senior Civil Judge',
    pecuniaryLimit: 'Civil Judge (Jr Div): Up to ₹5,00,000 | Senior Civil Judge / City Civil: Unlimited',
    feeFormula: 'Karnataka Court Fees and Suits Valuation Act, 1958: ~2.5% to 5% graded on suit valuation',
    calculatorFn: (valuation: number) => {
      let jurisdiction = '';
      if (valuation <= 500000) {
        jurisdiction = 'Court of Civil Judge (Junior Division)';
      } else if (valuation <= 2000000) {
        jurisdiction = 'Court of Senior Civil Judge';
      } else {
        jurisdiction = 'City Civil Court Bengaluru / Commercial Division, District Court';
      }

      let fee = 0;
      if (valuation <= 100000) {
        fee = Math.max(500, Math.round(valuation * 0.04));
      } else if (valuation <= 1000000) {
        fee = Math.round(4000 + (valuation - 100000) * 0.025);
      } else {
        fee = Math.round(26500 + (valuation - 1000000) * 0.015);
      }

      return {
        courtFee: fee,
        formulaUsed: 'Karnataka Court Fees and Suits Valuation Act, 1958 Section 21 / Schedule I',
        jurisdiction
      };
    }
  },
  {
    id: 'west-bengal-calcutta',
    state: 'West Bengal',
    courtName: 'Calcutta High Court (Original Side) vs City Civil Court',
    pecuniaryLimit: 'City Civil Court: Up to ₹10,00,000 | High Court Original Side: Above ₹10,00,000',
    feeFormula: 'West Bengal Court Fees Act, 1970 ad-valorem scale with statutory exemptions',
    calculatorFn: (valuation: number) => {
      let jurisdiction = '';
      if (valuation <= 1000000) {
        jurisdiction = 'City Civil Court Calcutta / Subordinate Judge';
      } else {
        jurisdiction = 'Hon’ble High Court at Calcutta (Ordinary Original Civil Jurisdiction)';
      }

      let fee = 0;
      if (valuation <= 100000) {
        fee = Math.max(400, Math.round(valuation * 0.03));
      } else if (valuation <= 500000) {
        fee = Math.round(3000 + (valuation - 100000) * 0.02);
      } else {
        fee = Math.round(11000 + (valuation - 500000) * 0.012);
      }

      return {
        courtFee: fee,
        formulaUsed: 'West Bengal Court Fees Act, 1970 Schedule I',
        jurisdiction
      };
    }
  }
];
