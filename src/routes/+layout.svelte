<script>
  import { currentUser } from '$lib/login.svelte';
  import githubLogo from '../images/github-mark.svg';
  import '../app.css';

  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-amber-50">
  <nav class="flex flex-row w-full h-10 bg-amber-100 items-center gap-2 px-4">
    <a href="/"><span>☕️</span></a>
    <div class="grow"></div>
    {#if currentUser.value != null}
      <a href="/profil"><span>Bonjour {currentUser.name} !</span></a>
    {:else}
      <a href="/login">
        <span>Se connecter</span>
      </a>
    {/if}
  </nav>
  <main class="grow md:max-w-screen-md md:container md:mx-auto">
    {@render children()}
  </main>
  <footer class="w-full text-xs h-10 gap-2 bg-amber-100 flex flex-row items-center justify-center">
    <a href="https://github.com/bachrc/de-l-arbre-aux-wc">
      <img src={githubLogo} alt="Logo Github" class="w-auto h-6" />
    </a>
    <span>•</span>
    <span>De L'Arbre Aux WC</span>
    <span>•</span>
    <a href="https://bachrc.net">
      <span>bachrc</span>
    </a>
  </footer>
</div>
