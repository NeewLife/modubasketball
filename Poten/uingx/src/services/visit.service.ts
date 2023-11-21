import { CustomAxios } from './common';

class VisitService {
  getAll() {
    return CustomAxios.get('/api/count');
  }
}

export const useVisitService = new VisitService();
