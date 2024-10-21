<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/database';
  import { nouvelleExtraction } from '$lib/extractions';
  import GrosBouton from '../../components/GrosBouton.svelte';
  import MessageErreur from '../../components/MessageErreur.svelte';

  let creationEnCours = $state(false);
  let nom = $state('');

  let erreurCreation = $state('');

  async function creationExtraction() {
    creationEnCours = true;

    try {
      let extraction = await nouvelleExtraction(nom);
      goto(`/extractions/${extraction.id}`);
    } catch (e: any) {
      erreurCreation = 'Erreur lors de la création';
    } finally {
      creationEnCours = false;
    }
  }
</script>

<div class=" flex flex-col w-full p-2">
  <h1 class="text-xl pb-2">Nouveau café !</h1>
  <h2 class=" text-sm font-bold">Donnez-lui un nom</h2>
  <input
    type="text"
    class="w-full rounded-xl border-orange-300 border-solid h-8 p-2"
    placeholder="Pérou, batch d'hier..."
    bind:value={nom}
  />

  <div class="mt-4">
    <GrosBouton loading={creationEnCours} onclick={creationExtraction}>Faisons du café</GrosBouton>
  </div>

  {#if erreurCreation}
    <MessageErreur erreur={erreurCreation} />
  {/if}
</div>
