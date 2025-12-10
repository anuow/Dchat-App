import { writable } from 'svelte/store'
import { gun } from './gun'

export const user = gun.user();
export const alias = writable('');

export function recallSession() {
    user.recall({sessionStorage: true });
    user.get('alias').once(a=> alias.set(a || ''));
}

export function signup(name, pass) {
    return new Promise((res, rej) => {
        user.create(name, pass, ack => {
            if ('err' in ack) return rej(ack.err);
            user.auth(name, pass, a => {
                if ('err' in a) return rej(a.err);
                user.get('profile').put({ alias: name });
                alias.set(name);
                res(a);
            })
        })
    })
}
    export function logout() {
  user.leave();
  alias.set('');
    }
