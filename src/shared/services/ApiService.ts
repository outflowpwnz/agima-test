import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '../config';
import { Notify } from 'quasar';


type TFormValues = string | number | Blob | boolean | undefined

type TJsonValues = string | number | undefined

/**
 * Тип данных, представляющий объект с возможностью содержать вложенные структуры.
 */
type TDataType =
  | { [key: string]: TFormValues | (TFormValues)[] | TDataType }
  | { [key: string]: TFormValues | (TFormValues)[] | TDataType }[];

/**
 * Тип данных для представления объекта с ключами строкового или числового типа
 * и значениями строкового, числового типа или массива чисел и строк.
 */
type TDataJson = { [k: string]: TJsonValues | (TJsonValues)[] };

/**
 * Класс, представляющий сервис для работы с API.
 */
export default class ApiService {
  /**
   * Возвращает экземпляр Axios для работы с API.
   * Примечание: Метод является статическим.
   *
   * @returns {AxiosInstance} - Экземпляр Axios для работы с API.
   */
  private static ApiClient = (): AxiosInstance => {
    const $api = Axios.create({
      baseURL: API_URL,
      withCredentials: true
    });
    $api.interceptors.response.use(
      (config) => config,
      (error) => {
        this.catchError(error);
        throw error;
      }
    );
    return $api;
  };

  public static async get<T>(
    url: string,
    params?: TDataJson,
    config?: Omit<AxiosRequestConfig, 'params'>
  ): Promise<AxiosResponse<T>> {
    return await this.ApiClient().get(`${url}`, {
      ...config,
      params
    });
  }

  public static async post<T>(
    url: string,
    data?: TDataType,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.ApiClient().post(`${url}`, this.toFormData(data), config);
  }

  public static async put<T>(
    url: string,
    data?: TDataJson
  ): Promise<AxiosResponse<T>> {
    return await this.ApiClient().put(`${url}`, this.toFormData(data));
  }

  public static async patch<T>(
    url: string,
    data?: TDataJson
  ): Promise<AxiosResponse<T>> {
    return await this.ApiClient().patch(`${url}`, data);
  }

  public static async delete<T>(
    url: string,
    params?: TDataJson
  ): Promise<AxiosResponse<T>> {
    return await this.ApiClient().delete(`${url}`, {
      params
    });
  }

  /**
   * Обработчик ошибок Axios, выводящий уведомление об ошибке.
   *
   * @param {AxiosError} error - Объект ошибки Axios.
   */
  private static catchError = (error: unknown) => {
    const message =
      (error instanceof AxiosError) ?
        `
          ${error.config?.url && `При запросе ${error.config.url} произошла ошибка. `}
          ${error.code && `Код ${error.code}. `}
          ${error.response?.status && `Статус: ${error.response?.status}. `}
        ` :
        'Неизвестная ошибка при запросе';

    Notify.create({
      message,
      color: 'negative'
    });
  };

  /**
   * Преобразует данные в объект FormData.
   *
   * @param {TDataType} data - Данные для преобразования.
   * @returns {FormData | undefined} - Объект FormData или undefined, если данные отсутствуют.
   */
  private static toFormData = (data?: TDataType): FormData | undefined => {
    if (!data) return undefined;
    const formData = new FormData();
    const appendItem = <T>(key: string, item: T) => item && formData.append(key, item instanceof Blob ? item : item instanceof Boolean ? String(+item) : String(item));

    Object.entries(data).forEach(([key, value]) => {
      Array.isArray(value)
        ? value.forEach(itemValue => appendItem(`${key}[]`, itemValue))
        : appendItem(key, value);
    });

    return formData;
  };
}
