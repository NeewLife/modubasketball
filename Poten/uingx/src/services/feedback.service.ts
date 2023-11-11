import { CustomAxios } from './common';

export interface IFeedback {
  id: number;
  fdComment?: string;
  fdRating?: number;
}

class FeedbackService {
  save(fdComment: string, fdRating: number) {
    return CustomAxios.post(`/api/feedback?fdComment=${fdComment}&fdRating=${fdRating}`);
  }
}

export const useFeedbackService = new FeedbackService();
