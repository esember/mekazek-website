/**
 * One-time database setup script.
 * Creates vocabulary and study_progress tables in Supabase if they don't exist.
 *
 * Usage:
 *   npm run db:setup
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL   — your project URL (already there)
 *   SUPABASE_ACCESS_TOKEN      — Personal Access Token from
 *                                https://supabase.com/dashboard/account/tokens
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// ── Load .env.local ──────────────────────────────────────────────────────────
function loadEnv() {
  const path = resolve(process.cwd(), '.env.local')
  try {
    return Object.fromEntries(
      readFileSync(path, 'utf8')
        .split('\n')
        .filter(l => l.trim() && !l.startsWith('#') && l.includes('='))
        .map(l => {
          const i = l.indexOf('=')
          return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
        })
    )
  } catch {
    console.error('Could not read .env.local')
    process.exit(1)
  }
}

const env = loadEnv()
const supabaseUrl   = env.NEXT_PUBLIC_SUPABASE_URL
const accessToken   = env.SUPABASE_ACCESS_TOKEN

if (!supabaseUrl) {
  console.error('❌  NEXT_PUBLIC_SUPABASE_URL is missing from .env.local')
  process.exit(1)
}
if (!accessToken || accessToken === 'your_access_token_here') {
  console.error('❌  SUPABASE_ACCESS_TOKEN is missing from .env.local')
  console.error('   Generate one at: https://supabase.com/dashboard/account/tokens')
  process.exit(1)
}

// Extract project ref: https://kiefphiwzinmdtjgxcdn.supabase.co → kiefphiwzinmdtjgxcdn
const projectRef = supabaseUrl.replace('https://', '').split('.')[0]
const apiUrl = `https://api.supabase.com/v1/projects/${projectRef}/database/query`

// ── SQL ──────────────────────────────────────────────────────────────────────
const SQL = `
-- vocabulary table (English app)
CREATE TABLE IF NOT EXISTS vocabulary (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  word       text        NOT NULL,
  meaning    text        NOT NULL,
  example    text        NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- study_progress table (Power Platform app)
CREATE TABLE IF NOT EXISTS study_progress (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  topic      text        NOT NULL,
  status     text        NOT NULL DEFAULT 'not_started',
  notes      text        NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE vocabulary     ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;

-- Permissive policies (single-user app, no auth)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'vocabulary' AND policyname = 'allow_all'
  ) THEN
    CREATE POLICY "allow_all" ON vocabulary FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'study_progress' AND policyname = 'allow_all'
  ) THEN
    CREATE POLICY "allow_all" ON study_progress FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
`

// ── Run ──────────────────────────────────────────────────────────────────────
console.log(`🔗  Project: ${projectRef}`)
console.log('⏳  Creating tables...\n')

const res = await fetch(apiUrl, {
  method:  'POST',
  headers: {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ query: SQL }),
})

const body = await res.json().catch(() => ({}))

if (!res.ok) {
  console.error('❌  Supabase API error:', res.status, res.statusText)
  console.error(JSON.stringify(body, null, 2))
  process.exit(1)
}

console.log('✅  vocabulary      — ready')
console.log('✅  study_progress  — ready')
console.log('\nDatabase is set up. You can now run: npm run dev')
