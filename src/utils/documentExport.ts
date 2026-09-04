export function formatINR(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  if (isNaN(num)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
}

export function exportCourtDraftToPrint(title: string, content: string, paperColor: 'green' | 'ivory' | 'white' = 'green') {
  const printWindow = window.open('', '_blank', 'width=850,height=1000');
  if (!printWindow) {
    alert('Please allow popups to generate print view.');
    return;
  }

  const bgColors = {
    green: '#EEF5EC', // Traditional Indian Legal Green Ledger Paper
    ivory: '#FAF7EE',
    white: '#FFFFFF'
  };

  const bgColor = bgColors[paperColor];

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title} - NyayaSetu Legal Docket</title>
  <style>
    @page {
      size: A4;
      margin: 35mm 20mm 25mm 38mm; /* Standard Indian court left margin for stitching */
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 14pt;
      line-height: 1.8;
      color: #111;
      background-color: ${bgColor};
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .court-header {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 25px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    .stamp-seal {
      float: right;
      width: 140px;
      height: 70px;
      border: 2px dashed #b91c1c;
      color: #b91c1c;
      text-align: center;
      padding: 5px;
      font-size: 9pt;
      font-family: sans-serif;
      margin-bottom: 20px;
      transform: rotate(-3deg);
      border-radius: 4px;
    }
    .content-body {
      white-space: pre-wrap;
      text-align: justify;
      text-justify: inter-word;
    }
    .footer-seal {
      margin-top: 40px;
      border-top: 1px solid #777;
      padding-top: 15px;
      font-size: 10pt;
      color: #555;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body {
        background-color: ${bgColor} !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        box-shadow: none;
        padding: 0;
      }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="padding: 10px 20px; background: #1e3a8a; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🖨️ Print / Save as PDF</button>
  </div>
  <div class="stamp-seal">
    COURT DOCKET<br>
    <strong>VERIFIED ADVOCATE</strong><br>
    NYAYASETU AI
  </div>
  <div style="clear: both;"></div>
  <div class="court-header">
    ${title}
  </div>
  <div class="content-body">${escapeHtml(content)}</div>
  <div class="footer-seal">
    <span>Generated via NyayaSetu AI • India Legal Tech</span>
    <span>Original Court Copy</span>
  </div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
