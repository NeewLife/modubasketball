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

  imageList?: IImage[];
}

export interface IImage {
  name: string;
  originalName?: string;
  ext?: string;
  size?: number;
  userId?: number;
  createDate?: string;
}

class MapService {
  getAll() {
    return CustomAxios.get('/api/');
  }

  getOne(id: number) {
    return CustomAxios.get(`/api/${id}`);
  }

  save(prop: IMap) {
    return CustomAxios.post('/api/spot/create', prop);
  }

  update(prop: IMap) {
    return CustomAxios.put('/api/spot/update', prop);
  }
}

export const useMapService = new MapService();
