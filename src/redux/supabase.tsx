
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://midlsoyjkxifqakotayb.supabase.co'
const supabaseKey = import.meta.env.VITE_REACT_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };