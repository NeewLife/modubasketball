import { CustomAxios } from './common';

class DeleteService {
  getState(state: number) {
    return CustomAxios.get(`/api/delete/${state}`);
  }

  update(id: number) {
    return CustomAxios.put(`/api/delete/?id=${id}`);
  }

  updateState(state: number, id: number) {
    return CustomAxios.put(`/api/delete/state?state=${state}&id=${id}`);
  }
}

export const useDeleteService = new DeleteService();
