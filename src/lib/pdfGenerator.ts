import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import type { Schedule } from '../types';

export function generatePDF(schedule: Schedule): void {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Class Schedule', 20, 20);
  
  // Add schedule details
  doc.setFontSize(12);
  doc.text(`Subject: ${schedule.subject}`, 20, 40);
  doc.text(`Date: ${format(new Date(schedule.date), 'MMMM dd, yyyy')}`, 20, 50);
  doc.text(`Time: ${schedule.startTime} - ${schedule.endTime}`, 20, 60);
  doc.text(`Type: ${schedule.type}`, 20, 70);
  
  if (schedule.room) {
    doc.text(`Room: ${schedule.room}`, 20, 80);
  }
  
  if (schedule.notes) {
    doc.text('Notes:', 20, 90);
    doc.setFontSize(10);
    const splitNotes = doc.splitTextToSize(schedule.notes, 170);
    doc.text(splitNotes, 20, 100);
  }
  
  // Save the PDF
  doc.save(`schedule-${schedule.subject}-${schedule.date}.pdf`);
}