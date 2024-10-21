import type { AuthModel, RecordModel } from 'pocketbase';
import { pb } from './database';

export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

function userStore() {
  let currentUser = $state(pb.authStore.model as User);

  return {
    get value(): User {
      return currentUser;
    },
    updateUser: (user: User) => {
      currentUser = user;
    },
    get mail() {
      return currentUser.email;
    },
    get username() {
      return currentUser.username;
    },
    get name() {
      return currentUser.name;
    }
  };
}

export let currentUser = userStore();

pb.authStore.onChange((_, model) => {
  currentUser.updateUser(model as User);
});

export async function login(mail: string, pass: string) {
  return await pb.collection('users').authWithPassword(mail, pass);
}

export function isLoggedIn(): boolean {
  return currentUser == null;
}
