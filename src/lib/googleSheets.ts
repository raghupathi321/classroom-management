import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { Schedule, Notification } from '../types';

const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const CLIENT_EMAIL = import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = import.meta.env.VITE_GOOGLE_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

async function initializeSheet() {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
    return true;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    return false;
  }
}

export async function fetchSchedules(): Promise<Schedule[]> {
  await initializeSheet();
  const sheet = doc.sheetsByTitle['Schedules'];
  const rows = await sheet.getRows();
  
  return rows.map(row => ({
    id: row.get('id'),
    subject: row.get('subject'),
    date: row.get('date'),
    startTime: row.get('startTime'),
    endTime: row.get('endTime'),
    type: row.get('type'),
    room: row.get('room'),
    notes: row.get('notes'),
  }));
}

export async function fetchNotifications(): Promise<Notification[]> {
  await initializeSheet();
  const sheet = doc.sheetsByTitle['Notifications'];
  const rows = await sheet.getRows();
  
  return rows.map(row => ({
    id: row.get('id'),
    title: row.get('title'),
    message: row.get('message'),
    date: row.get('date'),
    type: row.get('type'),
  }));
}

export async function updateSchedule(schedule: Schedule): Promise<void> {
  await initializeSheet();
  const sheet = doc.sheetsByTitle['Schedules'];
  const rows = await sheet.getRows();
  const row = rows.find(r => r.get('id') === schedule.id);
  
  if (row) {
    Object.entries(schedule).forEach(([key, value]) => {
      row.set(key, value);
    });
    await row.save();
  }
}

export async function addSchedule(schedule: Omit<Schedule, 'id'>): Promise<void> {
  await initializeSheet();
  const sheet = doc.sheetsByTitle['Schedules'];
  await sheet.addRow({
    id: crypto.randomUUID(),
    ...schedule,
  });
}