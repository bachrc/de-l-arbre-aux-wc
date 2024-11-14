<script lang="ts">
  import { goto } from '$app/navigation';
  import { currentUser } from '$lib/login.svelte';
  import GrosBouton from '../components/GrosBouton.svelte';
  import ListeExtractions from '../components/ListeExtractions.svelte';
  import Recherche from '../components/Recherche.svelte';
</script>

<div class="p-2 flex flex-col gap-2">
  {#if currentUser.value != null}
    <GrosBouton customClass="bg-green-300 disabled:bg-green-100" onclick={() => goto('/new')}>
      ➕ Nouvelle extraction
    </GrosBouton>
    <Recherche />
    <ListeExtractions />
  {:else}
    <span>Salut ! Ici on fait du café !</span>
    <span>Mais d'abord faut se connecter.</span>
  {/if}
</div>
