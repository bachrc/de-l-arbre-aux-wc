<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/database';
  import { nouvelleExtraction } from '$lib/extractions';
  import GrosBouton from '../../components/GrosBouton.svelte';
  import MessageErreur from '../../components/MessageErreur.svelte';

  let creationEnCours = $state(false);
  let nom = $state('');
  let poids_boisson = $state(0);
  let poids_cafe = $state(0);

  let erreurCreation = $state('');

  async function creationExtraction() {
    creationEnCours = true;

    try {
      let extraction = await nouvelleExtraction(nom, poids_boisson, poids_cafe);

      goto(`/extractions/${extraction.id}`);
    } catch (e: any) {
      erreurCreation = 'Champs invalides';
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

  <h2 class="text-sm font-bold mt-2">Le poids du café</h2>
  <input
    type="number"
    class="w-full rounded-xl border-orange-300 border-solid h-8 p-2"
    bind:value={poids_cafe}
  />

  <h2 class=" text-sm font-bold mt-2">Le poids de la boisson</h2>
  <input
    type="number"
    class="w-full rounded-xl border-orange-300 border-solid h-8 p-2"
    bind:value={poids_boisson}
  />

  <div class="mt-4">
    <GrosBouton
      customClass="bg-green-300 disabled:bg-green-100"
      loading={creationEnCours}
      onclick={creationExtraction}
    >
      Faisons du café
    </GrosBouton>
  </div>

  {#if erreurCreation}
    <MessageErreur erreur={erreurCreation} />
  {/if}
</div>
