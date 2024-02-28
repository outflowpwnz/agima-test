import ApiService from '@shared/services/ApiService';
import { TDtoAddPost } from '@entities/post';
import { postsDataConverter } from '@entities/post/lib/converter';

export class PostService {
  private static path = 'posts';
  static add = (data: TDtoAddPost) => {
    return ApiService.post(this.path, data);
  };

  static change = (id: number) => {
    return ApiService.put(`${this.path}/${id}`);
  };
  static getList = async (params?: { page?: number, limit?: number }) => {

    const { data } = await ApiService.get(`${this.path}`, {
      _page: params?.page,
      _limit: params?.limit
    });
    return postsDataConverter(data);
  };
}
