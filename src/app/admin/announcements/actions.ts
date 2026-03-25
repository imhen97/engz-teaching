'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase.from('announcements').insert({
    title,
    content,
    created_by: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/announcements')
  revalidatePath('/announcements')
  redirect('/admin/announcements')
}

export async function updateAnnouncement(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase
    .from('announcements')
    .update({ title, content })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/announcements')
  revalidatePath('/announcements')
  redirect('/admin/announcements')
}

export async function deleteAnnouncement(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('announcements').delete().eq('id', id)

  revalidatePath('/admin/announcements')
  revalidatePath('/announcements')
}
