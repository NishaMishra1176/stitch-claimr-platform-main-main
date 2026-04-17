# Contact Form Supabase Integration Guide

## Overview
The Contact Us form now saves all submissions to your Supabase database in the `contact_submissions` table.

## Setup Instructions

### Step 1: Create the Database Table

1. Go to your Supabase Dashboard: https://blxlvcllpkspwnmojxnb.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase-contact-table.sql`
5. Click **Run** to execute the SQL

This will create:
- `contact_submissions` table with fields: id, full_name, email, subject, message, created_at, is_read
- Row Level Security (RLS) policies for public submission
- Indexes for faster queries

### Step 2: Verify the Table

1. Go to **Table Editor** in Supabase
2. You should see the `contact_submissions` table
3. Click on it to view the schema

### Step 3: Test the Form

1. Open `contact.html` in your browser
2. Fill out the contact form
3. Click "Send Message"
4. You should see the confirmation popup
5. Check the Supabase Table Editor - the submission should appear

## Database Schema

```sql
contact_submissions (
    id              UUID PRIMARY KEY
    full_name       TEXT NOT NULL
    email           TEXT NOT NULL
    subject         TEXT NOT NULL
    message         TEXT NOT NULL
    created_at      TIMESTAMP WITH TIME ZONE
    is_read         BOOLEAN DEFAULT FALSE
)
```

## Viewing Submissions

### Option 1: Supabase Table Editor
1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Select `contact_submissions` table
4. View all submissions

### Option 2: SQL Query
```sql
SELECT * FROM contact_submissions 
ORDER BY created_at DESC;
```

### Option 3: Filter Unread Submissions
```sql
SELECT * FROM contact_submissions 
WHERE is_read = FALSE 
ORDER BY created_at DESC;
```

## Security

The table has Row Level Security (RLS) enabled with the following policies:

1. **Public Insert**: Anyone can submit a contact form (no authentication required)
2. **Authenticated Select**: Only authenticated users can view submissions (for admin dashboard)

## API Usage

The contact form uses the Supabase JavaScript client to insert data:

```javascript
const { data, error } = await supabase
    .from('contact_submissions')
    .insert([
        {
            full_name: fullName,
            email: email,
            subject: subject,
            message: message,
            created_at: new Date().toISOString()
        }
    ]);
```

## Error Handling

If there's an error submitting the form:
- An error message will be shown to the user
- The error is logged to the browser console
- The form is NOT reset (user can try again)

## Customization

### Add Email Notifications
To receive email notifications for new submissions, you can:
1. Use Supabase Edge Functions with Resend or SendGrid
2. Use Supabase Database Webhooks
3. Set up a PostgreSQL trigger with pg_notify

### Add Admin Dashboard
Create an admin page to view and manage submissions:
1. Create an authenticated page
2. Query the `contact_submissions` table
3. Display submissions in a table with filters
4. Add ability to mark as read/reply

## Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify Supabase URL and key are correct
3. Ensure the table exists in Supabase
4. Check RLS policies allow inserts

### Data Not Appearing
1. Check Supabase Table Editor
2. Verify the insert query in browser console
3. Check for any error messages in console

## Files Modified

- `contact.html` - Added Supabase integration and form handler
- `supabase-contact-table.sql` - SQL script to create the table
- `CONTACT_FORM_SETUP.md` - This documentation file

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review browser console for errors
- Verify database connection in Supabase dashboard
