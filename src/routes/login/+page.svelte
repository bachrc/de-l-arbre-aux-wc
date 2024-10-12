<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/login.svelte';
	import { pb } from '$lib/database';
	import { loginSchema } from '$lib/schemas';
	import { error } from '@sveltejs/kit';
	import { setError, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import { setErrorMap } from 'zod';

	const { form, errors, enhance } = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		async onUpdate({ form }) {
			if (form.valid) {
				try {
					await login(form.data.email, form.data.password);

					goto('/');
				} catch (e: any) {
					setError(form, 'password', 'Identifiants invalides');
				}
			}
		}
	});
</script>

<form class="w-full max-w-sm p-4" method="POST" use:enhance>
	<div class="border p-4 rounded-xl">
		<div class="md:flex md:items-center mb-6">
			<div class="md:w-1/3">
				<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="mail">
					Adresse mail
				</label>
			</div>
			<div class="md:w-2/3">
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="mail"
					type="email"
					name="mail"
					bind:value={$form.email}
				/>
			</div>
		</div>
		{#if $errors.email}<span class="bg-red w-full p-4 rounded-lg">{$errors.email}</span>{/if}
		<div class="md:flex md:items-center mb-6">
			<div class="md:w-1/3">
				<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="password">
					Mot de passe
				</label>
			</div>
			<div class="md:w-2/3">
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="password"
					type="password"
					name="password"
					bind:value={$form.password}
				/>
			</div>
		</div>
		{#if $errors.password}<span class="bg-red w-full p-4 rounded-lg">{$errors.password}</span>{/if}
		<div class="w-full">
			<button
				class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
				type="submit"
			>
				Se connecter
			</button>
		</div>
	</div>
</form>
