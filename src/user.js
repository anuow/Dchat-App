import { writable } from 'svelte/store'
import { gun } from './gun'

export const user = gun.user();
export const alias = writable('');

export function recallSession() {
    user.recall({sessionStorage: true });
    user.get('alias').once(a=> alias.set(a || ''));
}