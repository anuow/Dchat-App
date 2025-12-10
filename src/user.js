// src/user.js
import { writable } from 'svelte/store';
import { gun } from './gun';

export const user = gun.user();
export const alias = writable('');

// try to restore session from sessionStorage and populate alias
export function recallSession() {
  try { user.recall({ sessionStorage: true }); } catch (e) {}
  user.get('profile').get('alias').once(a => alias.set(a || ''));
}

// sign up (create account then auth)
export function signup(name, pass) {
  return new Promise((resolve, reject) => {
    user.create(name, pass, ack => {
      if (ack && 'err' in ack) return reject(ack.err);
      user.auth(name, pass, a => {
        if (a && 'err' in a) return reject(a.err);
        // publish a small public profile for discovery
        user.get('profile').put({ alias: name });
        alias.set(name);
        resolve(a);
      });
    });
  });
}

// sign in (auth)
export function signin(name, pass) {
  return new Promise((resolve, reject) => {
    user.auth(name, pass, ack => {
      if (ack && 'err' in ack) return reject(ack.err);
      user.get('profile').put({ alias: name });
      alias.set(name);
      resolve(ack);
    });
  });
}

// logout
export function logout() {
  user.leave();
  alias.set('');
}
