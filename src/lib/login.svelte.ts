import type { AuthModel } from 'pocketbase';
import { pb } from './database';

function userStore() {
	let currentUser = $state(pb.authStore.model);

	return {
		get value() {
			return currentUser;
		},
		updateUser: (user: AuthModel) => {
			currentUser = user;
		},
		get mail() {
			return currentUser?.email;
		}
	};
}

export let currentUser = userStore();

pb.authStore.onChange((_, model) => {
	currentUser.updateUser(model);
});

export async function login(mail: string, pass: string) {
	return await pb.collection('users').authWithPassword(mail, pass);
}

export function isLoggedIn(): boolean {
	return currentUser == null;
}
