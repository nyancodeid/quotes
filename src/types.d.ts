interface GithubProfile {
  available: boolean
  name: string
  avatar_url?: string
  followers?: number
}
export interface Quote {
  id: string
  username: string
  github?: GithubProfile
  gradient_id: number
  text: string
  author: string
  author_detail_url?: string
  created_at?: string
  created?: string
}
export interface Search {
  keyword: string
  filter: string
}
export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}
