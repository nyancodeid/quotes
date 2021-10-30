interface IGithubProfile {
  available: boolean
  name: string
  avatar_url?: string
  followers?: number
}
export interface IQuote {
  id: string
  username: string
  github?: IGithubProfile
  gradient_id: number
  slug: string
  text: string
  author: string
  author_detail_url?: string
  created_at?: string
  created?: string
}
export interface ISearch {
  keyword: string
  filter: string
}
export interface IMeta {
  title: string
  description: string
  url: string
}
export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}
