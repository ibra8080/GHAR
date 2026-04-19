import jsPDF from 'jspdf';

type Donor = {
  id: string;
  name: string;
  email: string;
  amount: number;
  donation_type: string;
  project: string;
  payment_method: string;
  status: string;
  created_at: string;
};

const ORG = {
  name: 'German Humanitarian Relief Organization e.V.',
  address: 'Kulenkampffallee 193, 28213 Bremen',
  email: 'info@ghar-ngo.com',
  phone: '+4915733269715',
  website: 'www.ghar-ngo.com',
  steuernummer: '60/147/03398',
  vereinsregister: 'VR 8792 HB — Amtsgericht Bremen',
  finanzamt: 'Finanzamt Bremen',
  freistellung: '10.03.2026',
  bankName: 'Wise',
  iban: 'BE88 9053 4986 3041',
  bic: 'TRWIBEB1XXX',
  signatory: 'Eman Saad',
  signatoryRole: '1. Vorsitzende',
};

const TEXTS = {
  de: {
    title: 'Zuwendungsbestätigung',
    subtitle: 'Bestätigung über Geldzuwendungen / Mitgliedsbeiträge',
    invoiceNo: 'Belegnummer',
    date: 'Datum',
    donor: 'Zuwendender',
    name: 'Name',
    email: 'E-Mail',
    amount: 'Betrag der Zuwendung',
    amountWords: 'in Buchstaben',
    donationType: 'Art der Zuwendung',
    once: 'Einmalige Zahlung',
    monthly: 'Monatliche Zahlung',
    paymentMethod: 'Zahlungsweg',
    bank: 'Überweisung',
    paypal: 'PayPal',
    project: 'Verwendungszweck',
    legalText: 'Wir sind wegen Förderung der Hilfe für Verfolgte, Flüchtlinge sowie Entwicklungszusammenarbeit nach dem Freistellungsbescheid des Finanzamts Bremen vom {date}, Steuernummer {steuernummer}, von der Körperschaftsteuer befreit.',
    legalText2: 'Es wird bestätigt, dass die Zuwendung nur zur Förderung der gemeinnützigen Zwecke verwendet wird. Keine Gegenleistung wurde erbracht.',
    signatureLabel: 'Ort, Datum und Unterschrift des Zuwendungsempfängers',
    footer: 'Diese Bestätigung wird nicht als Nachweis für die steuerliche Berücksichtigung der Zuwendung anerkannt, wenn sie durch eine Geldzuwendung, für die das vereinfachte Verfahren gilt, erbracht wurde.',
  },
  en: {
    title: 'Donation Receipt',
    subtitle: 'Confirmation of Monetary Donation',
    invoiceNo: 'Receipt No.',
    date: 'Date',
    donor: 'Donor',
    name: 'Name',
    email: 'Email',
    amount: 'Donation Amount',
    amountWords: 'In words',
    donationType: 'Donation Type',
    once: 'One-time',
    monthly: 'Monthly',
    paymentMethod: 'Payment Method',
    bank: 'Bank Transfer',
    paypal: 'PayPal',
    project: 'Purpose',
    legalText: 'We are exempt from corporate tax by the decision of Finanzamt Bremen dated {date}, tax number {steuernummer}, for promoting humanitarian aid and development cooperation.',
    legalText2: 'It is confirmed that the donation will be used exclusively for the stated charitable purposes. No goods or services were provided in return.',
    signatureLabel: 'Place, Date and Signature of Recipient',
    footer: 'This receipt is issued in accordance with § 50 EStDV. German Humanitarian Relief Organization e.V. is recognized as a charitable organization under German law.',
  },
};

function amountInWords(amount: number, lang: string): string {
  if (lang === 'de') return `Euro ${amount},00 (${amount} Euro)`;
  return `Euro ${amount}.00 (${amount} Euros only)`;
}

function generateReceiptNumber(donorId: string, date: string): string {
  const year = new Date(date).getFullYear();
  const shortId = donorId.slice(0, 8).toUpperCase();
  return `GHAR-${year}-${shortId}`;
}

export function generateInvoice(donor: Donor, lang: 'de' | 'en') {
  const t = TEXTS[lang];
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const receiptNo = generateReceiptNumber(donor.id, donor.created_at);
  const donationDate = new Date(donor.created_at).toLocaleDateString('de-DE');
  const issueDate = new Date().toLocaleDateString('de-DE');

  const primaryColor: [number, number, number] = [26, 111, 160];
  const darkColor: [number, number, number] = [42, 42, 42];
  const grayColor: [number, number, number] = [100, 100, 100];

  // ─── HEADER ───────────────────────────────────────────
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('GHAR', 15, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('German Humanitarian Relief Organization e.V.', 15, 25);
  doc.text(`${ORG.address} | ${ORG.email} | ${ORG.website}`, 15, 31);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(`${t.invoiceNo}: ${receiptNo}`, 195, 12, { align: 'right' });
  doc.text(`${t.date}: ${issueDate}`, 195, 18, { align: 'right' });

  // ─── TITLE ────────────────────────────────────────────
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(t.title, 105, 50, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.text(t.subtitle, 105, 57, { align: 'center' });

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(15, 61, 195, 61);

  // ─── DONOR INFO ───────────────────────────────────────
  let y = 70;

  doc.setFillColor(245, 248, 252);
  doc.roundedRect(15, y - 5, 180, 32, 2, 2, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(t.donor, 20, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.text(`${t.name}: ${donor.name}`, 20, y + 9);
  doc.text(`${t.email}: ${donor.email}`, 20, y + 15);
  doc.text(`${t.date}: ${donationDate}`, 20, y + 21);

  // ─── AMOUNT ───────────────────────────────────────────
  y += 42;

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.4);
  doc.rect(15, y, 85, 28);

  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(t.amount, 20, y + 7);

  doc.setTextColor(...darkColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`€ ${donor.amount.toLocaleString('de-DE')},00`, 57, y + 20, { align: 'center' });

  doc.setDrawColor(...primaryColor);
  doc.rect(105, y, 90, 28);

  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${t.amountWords}:`, 110, y + 7);

  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const words = amountInWords(donor.amount, lang);
  const splitWords = doc.splitTextToSize(words, 80);
  doc.text(splitWords, 110, y + 14);

  // ─── DETAILS TABLE ────────────────────────────────────
  y += 38;

  const details = [
    [t.donationType, donor.donation_type === 'monthly' ? t.monthly : t.once],
    [t.paymentMethod, donor.payment_method === 'paypal' ? t.paypal : t.bank],
    [t.project, donor.project],
    ['Vereinsregister', ORG.vereinsregister],
    ['Steuernummer', ORG.steuernummer],
    ['Finanzamt', ORG.finanzamt],
    ['Freistellungsbescheid', ORG.freistellung],
  ];

  details.forEach((row, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, 180, 8, 'F');
    }
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...grayColor);
    doc.text(row[0], 20, y + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    doc.text(row[1], 100, y + 5.5);
    y += 8;
  });

  // ─── LEGAL TEXT ───────────────────────────────────────
  y += 8;

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(15, y, 195, y);
  y += 8;

  const legalText = t.legalText
    .replace('{date}', ORG.freistellung)
    .replace('{steuernummer}', ORG.steuernummer);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  const splitLegal = doc.splitTextToSize(legalText, 175);
  doc.text(splitLegal, 15, y);
  y += splitLegal.length * 4.5 + 4;

  const splitLegal2 = doc.splitTextToSize(t.legalText2, 175);
  doc.text(splitLegal2, 15, y);
  y += splitLegal2.length * 4.5 + 12;

  // ─── SIGNATURE ────────────────────────────────────────
  doc.setDrawColor(...grayColor);
  doc.setLineWidth(0.3);
  doc.line(15, y, 95, y);

  doc.setFontSize(7.5);
  doc.setTextColor(...grayColor);
  doc.text(t.signatureLabel, 15, y + 5);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkColor);
  doc.text(`Bremen, ${issueDate}`, 15, y + 12);
  doc.text(ORG.signatory, 15, y + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.text(ORG.signatoryRole, 15, y + 25);

  // ─── BANK DETAILS ─────────────────────────────────────
  doc.setFillColor(245, 248, 252);
  doc.roundedRect(110, y - 3, 85, 35, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Bankverbindung / Bank Details', 152, y + 4, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text(`Bank: ${ORG.bankName}`, 115, y + 11);
  doc.text(`IBAN: ${ORG.iban}`, 115, y + 17);
  doc.text(`BIC: ${ORG.bic}`, 115, y + 23);

  // ─── FOOTER ───────────────────────────────────────────
  doc.setFillColor(...primaryColor);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  const splitFooter = doc.splitTextToSize(t.footer, 175);
  doc.text(splitFooter, 105, 288, { align: 'center' });

  return { doc, receiptNo };
}