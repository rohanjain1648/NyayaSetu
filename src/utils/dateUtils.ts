export function formatDateIndian(dateStr: string | Date): string {
  if (!dateStr) return '';
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(d.getTime())) return String(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export function getDaysDifference(targetDate: Date, fromDate: Date = new Date()): number {
  const diffTime = targetDate.getTime() - fromDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export interface S138TimelineResult {
  dishonourDate: Date;
  noticeDispatchDeadline: Date; // +30 days
  curePeriodEnd: Date;          // +15 days from presumed receipt (e.g. +3 days transit + 15 days)
  complaintFilingDeadline: Date;// +30 days from cure period end
  currentStatus: 'Notice Window' | 'Cure Window' | 'Filing Window' | 'Time Barred' | 'Future';
  daysLeftInCurrentStage: number;
}

export function computeS138Timeline(dishonourDateStr: string, noticeDispatchDateStr?: string): S138TimelineResult {
  const dDate = new Date(dishonourDateStr);
  const noticeDeadline = addDays(dDate, 30);
  
  // Notice dispatch date (defaults to 10 days after dishonour if not specified)
  const nDispatch = noticeDispatchDateStr ? new Date(noticeDispatchDateStr) : addDays(dDate, 10);
  // Presumed receipt 3 days after dispatch
  const presumedReceipt = addDays(nDispatch, 3);
  const cureEnd = addDays(presumedReceipt, 15);
  const complaintDeadline = addDays(cureEnd, 30);

  const today = new Date();
  let currentStatus: S138TimelineResult['currentStatus'] = 'Notice Window';
  let daysLeft = getDaysDifference(noticeDeadline, today);

  if (today < dDate) {
    currentStatus = 'Future';
    daysLeft = getDaysDifference(dDate, today);
  } else if (today <= noticeDeadline && (!noticeDispatchDateStr || today <= nDispatch)) {
    currentStatus = 'Notice Window';
    daysLeft = getDaysDifference(noticeDeadline, today);
  } else if (today <= cureEnd) {
    currentStatus = 'Cure Window';
    daysLeft = getDaysDifference(cureEnd, today);
  } else if (today <= complaintDeadline) {
    currentStatus = 'Filing Window';
    daysLeft = getDaysDifference(complaintDeadline, today);
  } else {
    currentStatus = 'Time Barred';
    daysLeft = getDaysDifference(complaintDeadline, today); // negative value indicates days overdue
  }

  return {
    dishonourDate: dDate,
    noticeDispatchDeadline: noticeDeadline,
    curePeriodEnd: cureEnd,
    complaintFilingDeadline: complaintDeadline,
    currentStatus,
    daysLeftInCurrentStage: daysLeft
  };
}
