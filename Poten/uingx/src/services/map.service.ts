import { CustomAxios } from './common';

export interface IMap {
  id: number;
  lat?: number; // 위도
  lon?: number; // 경도
  courtType?: string; // 코트 종류
  feeYn?: string; // 사용료
  courtSize?: string; // 코트 사이즈
  goalPost?: string; // 골대 수
  parkYn?: string; // 주차 여부
  address?: string; // 주소
  comment?: string; // 기타 정보
  courtName?: string; // 코드장 이름
  createData?: string; // 생성 날짜
  modifytDate?: string; // 수정 날짜
}

class MapService {
  getAll() {
    return CustomAxios.get('/');
  }

  getOne(id: number) {
    return CustomAxios.get(`/${id}`);
  }

  save(prop: IMap) {
    return CustomAxios.post('/spot/create', prop);
  }

  update(prop: IMap) {
    return CustomAxios.put('/spot/update', prop);
  }

  delete(id: number) {
    return CustomAxios.delete(`/spot/delete/${id}`);
  }
}

export const useMapService = new MapService();
