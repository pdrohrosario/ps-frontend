import type { FeedbackCreationDTO, FeedbackDTO } from "@/dtos/feedback-dto";

export class FeedbackService {
    private backendUrl = 'http://localhost:3000';

    async findFeebacksByUserId(userId : number): Promise<FeedbackDTO[]> {
        try {
          const response = await fetch(`${this.backendUrl}/feedback/user/${userId}`);
          const data = await response.json();
          return data;
        } catch (error) {
          throw error;
        }
      }

      async findFeebacksById(feedbackId : number): Promise<FeedbackDTO> {
        try {
          const response = await fetch(`${this.backendUrl}/feedback/${feedbackId}`);
          const data = await response.json();
          return data;
        } catch (error) {
          throw error;
        }
      }

      async createFeedback(feedbackData: FeedbackCreationDTO): Promise<FeedbackCreationDTO> {
        const url = `${this.backendUrl}/feedback`
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(feedbackData),
        });
        const data = await response.json();
        return data;
      }

      async updateFeedback(userData: FeedbackDTO) : Promise<FeedbackDTO> {
        const url = `${this.backendUrl}/feedback`
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
      }
}
