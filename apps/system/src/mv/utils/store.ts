import { Store, getStore } from '@js-sh/store'
import { IMoveOptions } from '../type.d'

export const getMoveStore = () => getStore() as Store & { moveOptions: IMoveOptions }
