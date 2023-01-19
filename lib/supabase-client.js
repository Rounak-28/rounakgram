import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

const supabaseUrl = "https://gmmwporpmnptcveaewtu.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// export default supabase

