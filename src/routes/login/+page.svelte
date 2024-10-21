<script lang="ts">
  import { login } from '$lib/login.svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  let mail = $state('');
  let password = $state('');

  let connexionError = $state('');

  async function validate(event: SubmitEvent) {
    try {
      event.preventDefault();
      await login(mail, password);

      goto('/');
    } catch (error: any) {
      connexionError = 'Identifiants invalides';
    }
  }
</script>

<form method="POST" class="w-full max-w-sm p-4" onsubmit={validate}>
  <div class="border p-4 rounded-xl">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="mail">
          Adresse mail
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class=" appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="mail"
          type="email"
          name="mail"
          bind:value={mail}
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="password">
          Mot de passe
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class=" border-gray-100 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="password"
          type="password"
          name="password"
          bind:value={password}
        />
      </div>
    </div>
    {#if connexionError}<span class="bg-red w-full p-4 rounded-lg">{connexionError}</span>{/if}
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
