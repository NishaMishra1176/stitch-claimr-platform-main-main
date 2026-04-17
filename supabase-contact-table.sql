-- =====================================================
-- Supabase Table Setup for Contact Form Submissions
-- =====================================================
-- IMPORTANT: Run this SQL in your Supabase SQL Editor
-- URL: https://blxlvcllpkspwnmojxnb.supabase.co
-- =====================================================

-- Step 1: Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    is_read BOOLEAN DEFAULT FALSE
);

-- Step 2: Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policy to allow anyone to insert (public form submission)
DROP POLICY IF EXISTS "Allow public to submit contact forms" ON contact_submissions;
CREATE POLICY "Allow public to submit contact forms"
    ON contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- Step 4: Create policy to allow authenticated users to view (optional)
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON contact_submissions;
CREATE POLICY "Allow authenticated users to view submissions"
    ON contact_submissions
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Step 5: Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
    ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
    ON contact_submissions(email);

-- Done! The table is ready to use.
-- Test it by submitting the contact form on your website.
