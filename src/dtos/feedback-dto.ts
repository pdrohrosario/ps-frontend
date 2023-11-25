export class FeedbackCreationDTO { 
  question: string; 
  child: string; 
  parentId: number; 
  teacherId: number; 
}

export class FeedbackDTO{
  id: number;
  question: string;
  response: string;
  active: boolean;
  child: string;
  parentId: number;
  teacherId: number;
}

