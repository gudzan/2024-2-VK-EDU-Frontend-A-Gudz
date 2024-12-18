export interface User {
  id: string
  username: string
  first_name: string
  last_name: string
  bio: string
  avatar: any
  is_online: boolean
  last_online_at: string
}

export interface Message {
  id: string
  text: string
  voice: any
  sender: User
  chat: string
  files: any[]
  updated_at: string
  created_at: string
  was_read_by: User[]
}

export interface Chat {
  id: string
  title: string
  members: User[]
  creator: User
  avatar: string
  created_at: string
  updated_at: string
  is_private: boolean
  last_message: Message
  unread_messages_count: number
}
