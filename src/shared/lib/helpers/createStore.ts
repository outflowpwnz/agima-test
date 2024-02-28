import {
  _ActionsTree,
  _GettersTree,
  defineStore,
  DefineStoreOptions,
  StateTree,
  Store,
  storeToRefs
} from 'pinia';

/**
 * Создает и возвращает хранилище (store) с реактивным состоянием.
 *
 * @returns  Функция, возвращающая хранилище с реактивным состоянием, представленным в виде объекта.
 * Возвращенный объект включает в себя состояние (state) и геттеры (getters) в виде реактивных ссылок (refs).
 *
 * @example
 * // Создание хранилища для управления состоянием приложения
 * const useAppState = createStore('appState', {
 *   state: () => ({
 *     count: 0,
 *     user: null,
 *   }),
 *   getters: {
 *     doubledCount: state => state.count * 2,
 *   },
 *   actions: {
 *     increment() {
 *       this.count++;
 *     },
 *     setUser(user) {
 *       this.user = user;
 *     },
 *   },
 * });
 *
 * // Использование хранилища в компоненте
 * const appState = useAppState();
 * console.log(appState.doubledCount); // Чтение геттера
 * appState.increment(); // Вызов действия
 *
 *
 * @see [Pinia Documentation](https://pinia.esm.dev/core-concepts/state.html)
 */
export function createStore<Id extends string, S extends StateTree = object, G extends _GettersTree<S> = NonNullable<unknown>, A extends _ActionsTree = NonNullable<unknown>>(id: Id, option: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>) {
  const store = defineStore(id, option);
  return () => ({
    ...store(),
    ...storeToRefs<Store<Id, S, _GettersTree<S>, _ActionsTree>>(store() as Store<Id, S, _GettersTree<S>, _ActionsTree>)
  });
}
