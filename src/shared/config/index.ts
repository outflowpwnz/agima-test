/** Режим разработки */
export const isDev = process.env.NODE_ENV === 'development';
// /** Режим продакшена */
export const isProd = process.env.NODE_ENV === 'production';

export const API_URL = process.env.API_URL || '';

export const DEFAULT_TITLE = process.env.DEFAULT_TITLE ?? '';
