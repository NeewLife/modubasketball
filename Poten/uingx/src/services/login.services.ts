import { CustomAxios } from '@services/index';

export interface ILogin {
  accessToken: string;
  nickname: string | null;
  email: string;
}

export interface IUser {
  nickname: string;
  email: string;
  createDate?: string;
  modiftyDate?: string;
}

class LoginService {
  login(code: string | null) {
    return CustomAxios.get(`/kakao/callback/${code}`);
  }

  check(nickname: string) {
    return CustomAxios.get(`/kakao/register/${nickname}`);
  }

  register(user: IUser) {
    return CustomAxios.post('/kakao/register', user);
  }
}

export const useLoginService = new LoginService();
