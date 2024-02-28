import { IPostItem } from './types';
import { catchFunctionError } from '@shared/lib/helpers/catchFunctionError';

function postConverter(post: any): IPostItem {
  return {
    id: post?.id ?? 0,
    title: post?.title ?? '',
    description: post?.body ?? '',
  };
}

export const postsDataConverter = catchFunctionError((data: any): IPostItem[] => {
  if (!Array.isArray(data)) return [];
  return data.map((post) => postConverter(post));
})
