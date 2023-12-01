import { CustomAxios } from './common';

export interface IFeedback {
  id: number;
  fdComment?: string;
  fdRating?: number;
  fdCreateDate: string;
}

class FeedbackService {
  save(fdComment: string, fdRating: number) {
    return CustomAxios.post(`/api/feedback?fdComment=${fdComment}&fdRating=${fdRating}`);
  }

  getAll(currPage: number) {
    return CustomAxios.get(`/api/admin/feedback/${currPage}`);
  }
}

export const useFeedbackService = new FeedbackService();
