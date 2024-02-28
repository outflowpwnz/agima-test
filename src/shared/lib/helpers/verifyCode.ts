import { Notify } from 'quasar';

export function verifyFunction<T, D>(callback: (...args: D[]) => T) {
  return (...args: D[] ): T | null => {
    try {
      return callback(...args)
    } catch (error) {
      const err = error as Error
      Notify.create({
        message: `Ошибка. ${err.stack || ''}`,
        color: 'negative'
      })
      return null
    }
  }
}
