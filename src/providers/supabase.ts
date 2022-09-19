import { createClient } from '@supabase/supabase-js'

const supabaseUrl = String(process.env.SUPABASE_URL)
const supabaseAnonKey = String(process.env.SUPABASE_ANON_KEY)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)