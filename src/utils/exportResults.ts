/**
 * Unified table-only PDF export utility using jsPDF + autoTable.
 * Produces a single table (#, Question, Response, Result (Correct/Incorrect)) in landscape with narrow margins.
 */
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

export interface ExportQuestion {
  id: string;
  title: string;
}

export interface ExportAnswer {
  questionId: string;
  answer: string;
  correct: boolean;
}

export interface ExportPayload {
  questions: ExportQuestion[];
  answers: ExportAnswer[];
  filename?: string;
  page?: 'letter' | 'a4';
  participantName?: string;
  level?: string;
  totalTimeSec?: number;
}

export function exportResultsToPDF({
  questions,
  answers,
  filename = 'spanish-quiz-results.pdf',
  page = 'letter',
  participantName = 'User',
  level = 'A0',
  totalTimeSec = 0
}: ExportPayload) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: page });

  const ansById = new Map<string, ExportAnswer>();
  (answers || []).forEach(a => ansById.set(a.questionId, a));

  const body: RowInput[] = (questions || []).map((q, idx) => {
    const a = ansById.get(q.id);
    const resp = a && a.answer != null ? String(a.answer) : '';
    const ok = !!(a && a.correct);
    return [String(idx + 1), q.title || '', resp, ok ? 'Correct' : 'Incorrect'];
  });

  const totalQuestions = (questions || []).length;
  const totalScore = (answers || []).filter(a => a.correct).length;

  const fmtSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Header: title + meta line + divider
  const left = 0.25;
  const top = 0.35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`Results — ${participantName}`, left, top);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const subline = `Level: ${level}   Score: ${totalScore} / ${totalQuestions}   Total time: ${fmtSeconds(totalTimeSec)}`;
  doc.text(subline, left, top + 0.22);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.005);
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.line(left, top + 0.28, pageWidth - left, top + 0.28);
  const startY = top + 0.4;

  // Column widths tuned for landscape pages; widen Result, slightly reduce Question
  const colWidths = page === 'a4'
    ? { c0: 0.55, c1: 6.10, c2: 3.74, c3: 0.80 } // ~11.19in content width after 0.25in margins
    : { c0: 0.5,  c1: 5.7,  c2: 3.5,  c3: 0.8  }; // 10.5in content width after 0.25in margins

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  autoTable(doc, {
    head: [['#', 'Question', 'Response', 'Result']],
    body,
    startY,
    margin: { top: 0.25, right: 0.25, bottom: 0.25, left: 0.25 },
    rowPageBreak: 'avoid',
    theme: 'grid',
    // Extra-light borders across the table
    tableLineWidth: 0.005,
    tableLineColor: [200, 200, 200],
    styles: {
      font: 'helvetica',
      fontSize: 11,
      cellPadding: 0.08,
      overflow: 'linebreak',
      halign: 'left',
      valign: 'top',
      textColor: 20,
      lineWidth: 0.005,
      lineColor: [200, 200, 200]
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: 20,
      halign: 'left',
      lineWidth: 0.005,
      lineColor: [200, 200, 200]
    },
    bodyStyles: {
      lineWidth: 0.005,
      lineColor: [200, 200, 200]
    },
    columnStyles: {
      0: { cellWidth: colWidths.c0, halign: 'left' },
      1: { cellWidth: colWidths.c1, halign: 'left' },
      2: { cellWidth: colWidths.c2, halign: 'left' },
      3: { cellWidth: colWidths.c3, halign: 'center' }
    },
    didParseCell(data) {
      if (data.section === 'body' && data.column.index === 3) {
        data.cell.styles.halign = 'center';
      }
    }
  });

  doc.save(filename);
}

export default exportResultsToPDF;