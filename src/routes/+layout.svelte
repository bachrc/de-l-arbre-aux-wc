<script>
  import { currentUser, isLoggedIn } from '$lib/login.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div>
  <nav class="flex flex-row w-full h-10 bg-amber-100 items-center justify-end gap-2 px-4">
    {#if currentUser.value != null}
      <span>Bonjour {currentUser.username} !</span>
    {:else}
      <a href="/login">
        <span>Se connecter</span>
      </a>
    {/if}
  </nav>
  {@render children()}
</div>
