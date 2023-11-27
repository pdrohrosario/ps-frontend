export class FeedbackCreationDTO {
  question: string
  child: string
  parent_id: number
  teacher_id: number
}

export class FeedbackDTO {
  id: number
  question: string
  response: string
  active: boolean
  child: string
  parent_id: number
  teacher_id: number
}
