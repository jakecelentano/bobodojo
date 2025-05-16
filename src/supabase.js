import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key from your Supabase dashboard
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);