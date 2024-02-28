import { TDtoAddPost } from '@entities/post';
import { TFormOptions } from '@shared/lib/hooks/useForm';

export const createPostInputs: TFormOptions<TDtoAddPost> = {
  title: {
    placeholder: 'Title',
    type: 'file',
    rules: {
      required: 'Поле не должно быть пустым'
    }
  },
  body: {
    placeholder: 'Description',
    rules: {
      required: 'Поле не должно быть пустым'
    }
  },
  password: {
    placeholder: 'Password',
    type: 'password'
  },
  confirm: {
    type: 'checkbox',
    defaultValue: false,
    placeholder: 'Confirm',
    rules: {
      required: 'Обязательное поле'
    }
  }
};
