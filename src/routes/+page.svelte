<script lang="ts">
  import { currentUser } from '$lib/login.svelte';
  import GrosBouton from '../components/GrosBouton.svelte';
  import ListeExtractions from '../components/ListeExtractions.svelte';
</script>

<div class="p-2 flex flex-col">
  {#if currentUser.value != null}
    <a href="/new">
      <GrosBouton>➕ Nouvelle extraction</GrosBouton>
    </a>
    <ListeExtractions />
  {:else}
    <span>Salut ! Ici on fait du café !</span>
    <span>Mais d'abord faut se connecter.</span>
  {/if}
</div>
