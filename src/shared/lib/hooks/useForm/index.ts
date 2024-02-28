import { reactive, ref, watch, onUnmounted } from 'vue';
import { emailRegExp, urlRegExp } from '@shared/common/regExp';

/**
 * Тип значения поля формы
 */
type TValue = string | number | Blob | boolean | undefined


/**
 * Тип для входных параметров полей формы.
 */
type TFormOptions<T extends { [key: string]: TValue }> = keyof T extends never
  ? never
  : {
    [K in keyof T]: K extends keyof T ? TUseFormOptions<T[K]> : never;
  };

/**
 * Определяет варианты ввода для полей формы.
 */
type TFormInputOptions<T extends Record<string, TValue>> = {
  [K in keyof T]: TFormField<T[K]>;
}[keyof T];


/**
 * Тип для определения правил валидации полей формы.
 */
type TRules<T extends TValue> =
  T extends Blob | boolean
    ? {
      required: boolean | string;
      minLength?: never;
      url?: never;
      email?: never;
      regex?: never;
    }
    : {
    required: boolean | string;
    minLength: {
      value: number | ((value: string) => number);
      message?: string;
    };
  } & (
    | { url: boolean | string; email?: never; regex?: never }
    | { email: boolean | string; url?: never; regex?: never }
    | { regex: { value: RegExp; message?: string }; url?: never; email?: never }
    );

/**
 * Тип для определения режима ввода для поля формы.
 */
type TInputMode =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'hidden'
  | 'password'



/**
 * Тип для представления отдельного поля формы.
 */
type TFormField<N extends TValue> = {
  name: string;
  placeholder?: string;
  type: TInputMode & 'select' & 'file' & 'radio';
  inputmode?: TInputMode;
  isError: boolean;
  value: N;
  errorMessage: string;
  options?: TFieldOptions<Exclude<N, Blob>>[]
};

type TFieldOptions<T extends Exclude<TValue, Blob>> = {
  label: string,
  value: T
}

/**
 * Опции для использования в функции useForm.
 */
type TUseFormOptions<T extends TValue> = {
  defaultValue?: T;
  placeholder?: string;
  inputmode?: TInputMode;
  rules?: Partial<TRules<T>>;
} & (T extends Blob ? {
  type: 'file'
} : T extends boolean ? {
  type: 'checkbox'
} : {
  type: 'select' | 'radio'
  options: TFieldOptions<Exclude<T, Blob>>[]
} | {
  type?: TInputMode,
  options?:never
}
);

function useForm<T extends Record<string, TValue>>(data: TFormOptions<T>) {
  const isChangeShow = ref(false);

  const fields = reactive(
    Object.entries(data).reduce<Record<keyof T, TFormInputOptions<T>>>((acc, [key, field]) => {
      acc[key as keyof T] = {
        name: key as keyof T,
        placeholder: field.placeholder || '',
        isError: false,
        value: field.defaultValue as T[keyof T],
        errorMessage: '',
        type: field.type || 'text'
      } as TFormInputOptions<T>;

      if (field.options) acc[key as keyof T].options = field.options
      return acc;
    }, {} as Record<keyof T, TFormInputOptions<T>>)
  );

  /**
   * Функция сбрасывает форму к начальному состоянию.
   */
  const onReset = () => {
    for (const fieldsKey in fields) {
      const field = fields[fieldsKey] as TFormInputOptions<T>;
      field.value = data[fieldsKey].defaultValue as T[keyof T];
      field.isError = false;
      field.errorMessage = '';
    }
    isChangeShow.value = false;
  };


  const checkValid = (field: TFormInputOptions<T>, data: TFormOptions<T>): boolean => {
    const rules = data[field.name as keyof T].rules;
    if (!rules) return true;
    if (rules.required) {
      const isValidRequired = field.value && (field.value instanceof Boolean ? field.value : (field.value instanceof Blob || !!String(field.value).length));
      if (!isValidRequired) {
        field.isError = true;
        if (typeof rules.required === 'string') field.errorMessage = rules.required;
        return false;
      }
    }

    if (field.value instanceof Blob || field.value instanceof Boolean) {
      field.isError = false;
      return true;
    }



    const currentValue = field.value ? String(field.value) : '';
    if (!currentValue.length) {
      field.isError = false;
      return true;
    }

    if ('email' in rules && !emailRegExp.test(currentValue)) {
      field.isError = true;
      if (typeof rules.email === 'string') field.errorMessage = rules.email;
      return false;
    }

    if ('url' in rules && !urlRegExp.test(currentValue)) {
      field.isError = true;
      if (typeof rules.url === 'string') field.errorMessage = rules.url;
      return false;
    }

    if ('regex' in rules && rules.regex && !rules.regex.value.test(currentValue)) {
      field.isError = true;
      if (rules.regex.message) field.errorMessage = rules.regex.message;
      return false;
    }

    if (rules.minLength) {
      const value = typeof rules.minLength.value === 'number' ? rules.minLength.value : rules.minLength.value(currentValue);
      if (currentValue.length < value) {
        field.isError = true;
        if (rules.minLength.message) field.errorMessage = rules.minLength.message;
        return false;
      }
    }

    field.isError = false;
    return true;
  };

  /**
   * Функция для сабмита формы с проверкой валидации.
   * @param onSubmit - Callback-функция, принимающая данные формы после валидации.
   * @returns Функция-обработчик события сабмита формы.
   */
  const handleSubmit = (onSubmit: (data: { [key in keyof T]: T[key] }) => void): (() => void) => {
    return function() {
      isChangeShow.value = false;
      let isError = false;
      const result = {} as { [key in keyof T]: T[key] };

      for (const fieldsKey in fields) {
        const field = fields[fieldsKey] as TFormInputOptions<T>;
        const isValid = checkValid(field, data);
        if (!isValid) isError = true;
        result[fieldsKey as keyof T] = field.value as T[keyof T];
      }

      isChangeShow.value = true;
      if (isError) return;
      isChangeShow.value = false;
      onSubmit(result);
    };
  };

  /**
   * Функция изменяет состояние ошибок, перебирая все поля формы.
   * Если в переданном аргументе нет ключа, соответствующего полю формы,
   * то isError будет false.
   * @param errors - Объект с ошибками для полей формы.
   */
  const setErrors = (errors: Partial<{ [key in keyof T]: string | null }>) => {
    for (const fieldKey in fields) {
      const field = fields[fieldKey] as TFormInputOptions<T>;
      if (!field) return;
      const isError = fieldKey in errors;
      if (isError) {
        field.isError = true;
        field.errorMessage = errors[fieldKey] || '';
      } else if (field.isError) {
        field.isError = false;
        field.errorMessage = '';
      }
    }
  };

  watch(fields, () => {
    if (!isChangeShow.value) return;
    for (const valueKey in fields) {
      checkValid(fields[valueKey] as TFormInputOptions<T>, data);
    }
  });

  /**
   * Сбравсываем форму, что бы очистить память системы если у нас есть большие файлы.
   */
  onUnmounted(onReset)


  return {
    fields,
    onReset,
    setErrors,
    handleSubmit
  };
}

export {
  useForm,
  TValue,
  TFormField,
  TFormOptions
};
