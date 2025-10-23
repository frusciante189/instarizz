import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Google Sheets configuration
    const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const GOOGLE_SHEETS_SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

    if (!GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_SHEET_ID) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Get current timestamp
    const timestamp = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    });

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SHEET_ID,
      range: "Sheet1!A:B", // Adjust range as needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, timestamp]],
      },
    });

    return NextResponse.json(
      { success: true, message: "Email saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}
