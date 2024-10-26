<script lang="ts">
  import { page } from '$app/stores';
  import { getExtraction, tdsMoyen, yieldMoyen } from '$lib/extractions';
  import { onDestroy, onMount } from 'svelte';
  import Loader from '../../../components/Loader.svelte';
  import type { Extraction } from '$lib/extractions';
  import { pb } from '$lib/database';
  import { toPrettyDateTime } from '$lib/time';
  import ChampEditable from '../../../components/ChampEditable.svelte';
  import GrosBouton from '../../../components/GrosBouton.svelte';
  import { goto } from '$app/navigation';
  import ReleveTds from '../../../components/ReleveTds.svelte';
  import TdsChart from '../../../components/TdsChart.svelte';
  import Verdict from '../../../components/Verdict.svelte';

  const id = $page.params.id;
  let new_tds: number | undefined = $state();

  let extraction: Extraction | null = $state(null);

  onMount(async () => {
    extraction = await getExtraction(id);

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

  async function majPoidsBoisson(nouveau_poids: number) {
    if (nouveau_poids > 0) {
      await pb.collection('extractions').update(id, {
        poids_boisson: nouveau_poids
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
      <span class="text-2xl">
        <ChampEditable type="text" valeur={extraction.nom} onupdate={majNom} />
      </span>
      <span class="text-xs text-gray-800">Création : {toPrettyDateTime(extraction.created)}</span>
      <span class="text-xs text-gray-800">
        Modification : {toPrettyDateTime(extraction.updated)}
      </span>
    </div>
    <div class="mt-4">
      <ChampEditable
        type="text"
        customClass="w-full"
        valeur={extraction.notes}
        titre="Notes"
        onupdate={majNotes}
      />
    </div>
    <hr class="my-4" />
    <div class="flex flex-row">
      <div class="w-1/2">
        <ChampEditable
          titre="Poids du café"
          type="number"
          valeur={extraction.poids_cafe}
          onupdate={majPoidsCafe}
          customClass="w-full"
        />
      </div>
      <div class="w-1/2">
        <ChampEditable
          titre="Poids de la boisson"
          type="number"
          valeur={extraction.poids_boisson}
          onupdate={majPoidsBoisson}
          customClass="w-full"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <div>
        <span class="text-sm font-bold">Relevés TDS</span>
        <div class=" grid grid-cols-4 gap-1 text-center">
          {#each extraction.releves_tds as releve, index (index)}
            <ReleveTds {index} value={releve} ondelete={removeTds} />
          {/each}
        </div>
      </div>
      <div class="flex flex-row mt-2">
        <input
          type="number"
          placeholder="Ajouter un relevé de TDS"
          class="w-3/4 py-2 px-4 border rounded-2xl rounded-r-none border-r-0"
          bind:value={new_tds}
        />
        <button class="w-1/4 text-center border rounded-2xl rounded-l-none" onclick={addTds}>
          ✚
        </button>
      </div>
      <hr class="my-4" />
      {#if extraction.releves_tds.length > 0}
        <div class="flex flex-col gap-2">
          <span class="font-bold">Analyse de Yield</span>
          <span>
            Le Yield est à {yieldMoyen(extraction).toFixed(2)}%, pour un TDS moyen de {tdsMoyen(
              extraction
            ).toFixed(2)}%.
          </span>
          <Verdict {extraction} />
          <TdsChart {extraction} />
        </div>
      {/if}
    </div>
    <hr class="my-4" />

    <GrosBouton
      customClass="bg-red-600 text-white"
      confirmation="Êtes-vous sûr•e ?"
      onclick={suppression}>Supprimer l'extraction</GrosBouton
    >
  </div>
{:else}
  <div class="h-screen w-full">
    <Loader />
  </div>
{/if}
