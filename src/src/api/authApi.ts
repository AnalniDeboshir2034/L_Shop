import { httpClient } from './httpClient';
import { LoginRequestDto, RegisterRequestDto, UserDto } from '@types/domain';

export const authApi = {
  async register(payload: RegisterRequestDto): Promise<UserDto> {
    const response = await httpClient.post<UserDto>('/auth/register', payload);
    return response.data;
  },

  async login(payload: LoginRequestDto): Promise<UserDto> {
    const response = await httpClient.post<UserDto>('/auth/login', payload);
    return response.data;
  },

  async me(): Promise<UserDto> {
    const response = await httpClient.get<UserDto>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  }
};

