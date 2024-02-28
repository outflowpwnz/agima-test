import { Notify } from 'quasar';

/**
 * Оборачивает функцию обработкой ошибок для перехвата любых исключений, возникающих в процессе ее выполнения.
 *
 * @template T - Ожидаемый тип возвращаемого значения оригинальной функции.
 * @template D - Типы параметров, принимаемых оригинальной функцией.
 *
 * @param {(...args: D[]) => T} callback - Оригинальная функция, которую необходимо обернуть.
 * @returns {(...args: D[]) => T | null} - Функция, вызывающая оригинальную функцию и перехватывающая любые исключения,
 * отображая уведомление об ошибке в случае возникновения исключения.
 *
 * @example
 * // Оригинальная функция
 * function divide(a: number, b: number): number {
 *   if (b === 0) {
 *     throw new Error('Нельзя делить на ноль');
 *   }
 *   return a / b;
 * }
 *
 * // Обернутая функция с обработкой ошибок
 * const safeDivide = catchFunctionError(divide);
 * const result = safeDivide(10, 0); // Отображает уведомление об ошибке и возвращает null.
 */
export function catchFunctionError<T, D extends any[]>(callback: (...args: D) => T): (...args: D) => T | null {
  return (...args: D): T | null => {
    try {
      return callback(...args);
    } catch (error) {
      Notify.create({
        message: error instanceof Error ? `Ошибка. ${error.stack || ''}` : 'Неизвестная клиентская ошибка.',
        color: 'negative'
      });

      return null;
    }
  };
}
