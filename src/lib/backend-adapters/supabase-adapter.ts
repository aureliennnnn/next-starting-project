import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export class SupabaseAdapter {
  async auth(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  async register(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) throw error
    return data
  }

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getItems() {
    const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async createItem(item: any) {
    const { data, error } = await supabase.from("items").insert([item]).select()

    if (error) throw error
    return data[0]
  }

  async updateItem(id: string, updates: any) {
    const { data, error } = await supabase.from("items").update(updates).eq("id", id).select()

    if (error) throw error
    return data[0]
  }

  async deleteItem(id: string) {
    const { error } = await supabase.from("items").delete().eq("id", id)

    if (error) throw error
  }

  async uploadFile(file: File, bucket = "uploads") {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return { ...data, publicUrl }
  }
}

export const supabaseAdapter = new SupabaseAdapter()
