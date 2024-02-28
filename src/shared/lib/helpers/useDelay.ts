/**
 * Функция возвращает обертку для асинхронной функции, которая задерживает выполнение
 * на указанное время, если время выполнения асинхронной операции меньше заданной задержки.
 *
 * @param callback Функция, которая будет обернута в задержку.
 * @param delay Время задержки в миллисекундах (по умолчанию 300 мс).
 * @returns Функцию, которая принимает аргументы и возвращает Promise с результатом выполнения `callback`.
 */
export function useDelay<T, D extends any[]>(
  callback: (...args: D) => Promise<T> | T,
  delay = 300
): (...args: D) => Promise<T> {
  /**
   * Функция для создания задержки.
   * @param timeToPause Время задержки в миллисекундах.
   * @returns Promise, который разрешается после указанной задержки.
   */
  const pause = (timeToPause: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, timeToPause));

  /**
   * Функция-обертка для асинхронной операции с задержкой.
   * @param args Аргументы, передаваемые в `callback`.
   * @returns Promise с результатом выполнения `callback`.
   */
  return async (...args: D): Promise<T> => {
    const startTime = Date.now();
    const result = await callback(...args);
    const timeDelta = Date.now() - startTime;
    const isMoreThanMinLoaderTime = timeDelta > delay;

    if (!isMoreThanMinLoaderTime) {
      const timeToPause = delay - timeDelta;
      await pause(timeToPause);
    }

    return result;
  };
}
