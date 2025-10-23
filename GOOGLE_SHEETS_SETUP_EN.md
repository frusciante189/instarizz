# Google Sheets Email Storage Setup

This guide explains the steps required to save email addresses to Google Sheets on the success page.

## 📋 Requirements

- Google account
- Google Cloud Console access

## 🚀 Setup Steps

### 1. Create a Project in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** > **"New Project"** in the top right
3. Enter a project name (e.g., "instarizz-emails")
4. Click the **"Create"** button

### 2. Enable Google Sheets API

1. From the left menu, click **"APIs & Services"** > **"Enable APIs and Services"**
2. Type **"Google Sheets API"** in the search box
3. Click on **"Google Sheets API"**
4. Click the **"Enable"** button

### 3. Create a Service Account

1. From the left menu, click **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"Service Account"** at the top
3. Enter a service account name (e.g., "sheets-writer")
4. Click **"Create and Continue"**
5. You can leave the role blank, click **"Continue"** > **"Done"**

### 4. Create a JSON Key

1. Click on the service account you just created
2. Go to the **"Keys"** tab at the top
3. Click **"Add Key"** > **"Create new key"**
4. Select **"JSON"** format and click the **"Create"** button
5. A JSON file will be downloaded to your computer

### 5. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Add headers to the first row:
   - **A1**: Email
   - **B1**: Date/Time
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
   ```

### 6. Share the Sheet with the Service Account

1. Click the **"Share"** button in the top right of your Google Sheet
2. Copy the **"client_email"** value from the downloaded JSON file
   - It will look like: `your-service-account@your-project.iam.gserviceaccount.com`
3. Paste this email into the Share dialog
4. Give it **"Editor"** permission
5. Click the **"Send"** button

### 7. Set Up Environment Variables

1. Create a `.env.local` file in the project root directory:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open the downloaded JSON file and copy the following values to your `.env.local` file:

   ```env
   GOOGLE_SHEETS_CLIENT_EMAIL=paste-client_email-here
   GOOGLE_SHEETS_PRIVATE_KEY="paste-private_key-here"
   GOOGLE_SHEETS_SHEET_ID=paste-sheet-id-here
   ```

   **IMPORTANT:**
   - Wrap the `GOOGLE_SHEETS_PRIVATE_KEY` value in double quotes
   - Keep the `\n` characters as they are
   - The private key should look like: `"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"`

## ✅ Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Complete the checkout process using the app
3. When you reach the success page, the email will be automatically saved to Google Sheets
4. Check your Google Sheet - you should see a new row

## 🔧 Troubleshooting

### "Server configuration error" error
- Make sure the `.env.local` file is in the correct location
- Verify that all environment variables are set
- Restart the development server

### "Permission denied" error
- Ensure the service account email has Editor permission on the Google Sheet
- Verify that the Sheet ID is correct

### Emails are not being saved
- Check for error messages in the browser console
- Make sure requests are being sent to the `/api/save-email` endpoint in the Network tab
- Check the server logs

## 📊 Google Sheet Format

Your sheet will have these columns:
- **Column A (Email)**: User email address
- **Column B (Date/Time)**: Timestamp in Turkey time

## 🔒 Security Notes

- The `.env.local` file should not be committed to Git (already in `.gitignore`)
- Keep your JSON key file in a secure location
- In production, add environment variables to your hosting platform (Vercel, Netlify, etc.)

## 📝 Additional Notes

- Emails are automatically saved on each success page visit
- The same email can be saved multiple times (once per transaction)
- The first sheet (Sheet1) is used
- Date format: Turkey time (Europe/Istanbul)
