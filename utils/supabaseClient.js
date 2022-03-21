import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY
export const supabase = createClient(supabaseUrl, SERVICE_KEY)