import { CustomAxios } from '@services/index';

export interface ILogin {
  accessToken: string;
  nickname: string | null;
}

class LoginService {
  login(code: string | null) {
    return CustomAxios.get(`/kakao/callback/${code}`);
  }
}

export const useLoginService = new LoginService();
