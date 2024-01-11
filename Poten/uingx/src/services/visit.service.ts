import { CustomAxios } from '@services/index';

class VisitService {
  getAll() {
    return CustomAxios.get('/api/count');
  }

  count() {
    return CustomAxios.put('/api/counting');
  }
}

export const useVisitService = new VisitService();
