<script>
  import { currentUser } from '$lib/login.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div>
  <nav class="flex flex-row w-full h-10 bg-amber-100 items-center gap-2 px-4">
    <a href="/"><span>☕️</span></a>
    <div class=" grow"></div>
    {#if currentUser.value != null}
      <a href="/profil"><span>Bonjour {currentUser.name} !</span></a>
    {:else}
      <a href="/login">
        <span>Se connecter</span>
      </a>
    {/if}
  </nav>
  {@render children()}
</div>
