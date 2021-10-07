interface GithubProfile {
  available: boolean
  name?: string
  avatar_url?: string
  followers?: number
  following?: number
}
export interface Quote {
  id: string,
  gradient_id: number,
  username: string
  github?: GithubProfile
  text: string
  author: string
}
export interface Search {
  keyword: string,
  filter: string
}
export enum Theme {
  System = "system",
  Light = "light",
  Dark = "dark",
}