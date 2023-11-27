export class UserCreationDTO {
  email: string
  name: string
  profile: string
  children?: string
  feedback_frequence?: number
  password: string
}

export class UserDTO {
  id: number
  email: string
  name: string
  profile: string
  children?: string
  feedback_frequence?: number
  password: string
}
