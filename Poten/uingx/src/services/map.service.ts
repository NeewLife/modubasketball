import { CustomAxios, CustomMultipartAxios } from '@services/common';

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
  lightTimeStart?: string;
  lightTimeEnd?: string;
  openTimeStart?: string;
  openTimeEnd?: string;

  imageList?: IImage[];
}

export interface IImage {
  name: string;
  originalName?: string;
  ext?: string;
  size?: number;
  userNickname?: string;
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

  imgDelete(name: string) {
    return CustomAxios.delete(`/img/${name}`);
  }

  imgUpload(id: number, files: File[]) {
    const formData = new FormData();
    formData.append('id', `${id}`);
    files.forEach((file) => formData.append('files', file));

    return CustomMultipartAxios.post('/img/', formData);
  }
}

export const useMapService = new MapService();
