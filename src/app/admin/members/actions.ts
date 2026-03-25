'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateMemberRole(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const role = formData.get('role') as 'student' | 'admin'

  await supabase.from('profiles').update({ role }).eq('id', id)
  revalidatePath('/admin/members')
}
