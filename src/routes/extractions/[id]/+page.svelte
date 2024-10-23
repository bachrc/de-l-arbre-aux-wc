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

  const id = $page.params.id;

  let extraction: Extraction | null = $state(null);

  onMount(async () => {
    extraction = await getExtraction(id);

    // Subscribe to changes only in the specified record
    pb.collection('extractions').subscribe(id, function (e) {
      extraction = e.record as Extraction;
    });
  });

  async function majNom(nouveauNom: string): Promise<void> {
    await pb.collection('extractions').update(id, {
      nom: nouveauNom
    });
  }

  async function majNotes(notes: string): Promise<void> {
    await pb.collection('extractions').update(id, {
      notes: notes
    });
  }

  async function suppression() {
    await pb.collection('extractions').delete(id);
    goto('/');
  }
</script>

{#if extraction}
  <div class="w-full flex flex-col p-2">
    <div class="flex flex-col">
      <span class="text-xl">
        <ChampEditable valeur={extraction.nom} onupdate={majNom} type="text" />
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
        type="textarea"
        onupdate={majNotes}
      />
    </div>
    <hr class="my-4" />
    <div>
      <GrosBouton
        customClass="bg-red-600 text-white"
        confirmation="Êtes-vous sûr•e ?"
        onclick={suppression}>Supprimer l'extraction (définitif)</GrosBouton
      >
    </div>
  </div>
{:else}
  <Loader />
{/if}
