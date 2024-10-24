<script lang="ts">
  import { page } from '$app/stores';
  import { getExtraction } from '$lib/extractions';
  import { onMount } from 'svelte';
  import Loader from '../../../components/Loader.svelte';
  import type { Extraction } from '$lib/extractions';
  import { pb } from '$lib/database';
  import { toPrettyDateTime } from '$lib/time';
  import ChampEditable from '../../../components/ChampEditable.svelte';
  import GrosBouton from '../../../components/GrosBouton.svelte';
  import { goto } from '$app/navigation';
  import ReleveTds from '../../../components/ReleveTds.svelte';

  const id = $page.params.id;
  let new_tds: number | undefined = $state();

  let extraction: Extraction | null = $state(null);

  onMount(async () => {
    extraction = await getExtraction(id);

    // Subscribe to changes only in the specified record
    pb.collection('extractions').subscribe(id, function (e) {
      console.log(e);
      extraction = e.record as Extraction;
    });
  });

  async function majNom(nouveauNom: string) {
    await pb.collection('extractions').update(id, {
      nom: nouveauNom
    });
  }

  async function majNotes(notes: string) {
    await pb.collection('extractions').update(id, {
      notes: notes
    });
  }

  async function majPoidsCafe(nouveau_poids: number) {
    if (nouveau_poids > 0) {
      await pb.collection('extractions').update(id, {
        poids_cafe: nouveau_poids
      });
    }
  }

  async function suppression() {
    await pb.collection('extractions').delete(id);
    goto('/');
  }

  async function addTds() {
    if (!new_tds) {
      return;
    }

    let nouveaux_releves_tds = (extraction?.releves_tds ?? []).concat(new_tds);
    console.log(nouveaux_releves_tds);
    await pb.collection('extractions').update(id, {
      releves_tds: nouveaux_releves_tds
    });
    new_tds = undefined;
  }

  async function removeTds(index: number) {
    let releves = extraction?.releves_tds;
    releves?.splice(index, 1);

    await pb.collection('extractions').update(id, {
      releves_tds: releves
    });
  }
</script>

{#if extraction}
  <div class="w-full flex flex-col p-2">
    <div class="flex flex-col">
      <span class="text-xl">
        <ChampEditable valeur={extraction.nom} onupdate={majNom} />
      </span>
      <span class="text-xs text-gray-800">Création : {toPrettyDateTime(extraction.created)}</span>
      <span class="text-xs text-gray-800">
        Modification : {toPrettyDateTime(extraction.updated)}
      </span>
    </div>
    <div class="mt-4">
      <ChampEditable
        customClass="w-full text-sm"
        valeur={extraction.notes}
        titre="Notes"
        onupdate={majNotes}
      />
    </div>
    <hr class="my-4" />
    <div class="mb-4">
      <ChampEditable
        titre="Poids du café"
        valeur={extraction.poids_cafe}
        onupdate={majPoidsCafe}
        customClass="w-full"
      />
    </div>
    <div class="flex flex-col">
      <span class="text-sm font-bold">Relevés TDS</span>
      <div class=" grid grid-cols-4 gap-1 text-center">
        {#each extraction.releves_tds as releve, index (index)}
          <ReleveTds {index} value={releve} ondelete={removeTds} />
        {/each}
      </div>
      <div class="flex flex-row mt-2">
        <input
          type="number"
          class="w-3/4 py-2 px-4 border rounded-2xl rounded-r-none border-r-0"
          bind:value={new_tds}
        />
        <button class="w-1/4 text-center border rounded-2xl rounded-l-none" onclick={addTds}
          >✚</button
        >
      </div>
    </div>
    <hr class="my-4" />
    <div>
      <GrosBouton
        customClass="bg-red-600 text-white"
        confirmation="Êtes-vous sûr•e ?"
        onclick={suppression}>Supprimer l'extraction</GrosBouton
      >
    </div>
  </div>
{:else}
  <Loader />
{/if}
