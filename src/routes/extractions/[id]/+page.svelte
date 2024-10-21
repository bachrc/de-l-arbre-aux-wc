<script lang="ts">
  import { page } from '$app/stores';
  import { getExtraction } from '$lib/extractions';
  import { onMount } from 'svelte';
  import Loader from '../../../components/Loader.svelte';
  import type { Extraction } from '$lib/extractions';
  import { pb } from '$lib/database';
  import { toPrettyDateTime } from '$lib/time';
  import ChampEditable from '../../../components/ChampEditable.svelte';

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
</script>

{#if extraction}
  <div class="w-full flex flex-col p-2">
    <div class="flex flex-col">
      <span class="text-xl">
        <ChampEditable valeur={extraction.nom} onupdate={majNom} titre="Nom" />
      </span>
      <span class="text-xs text-gray-800">Création : {toPrettyDateTime(extraction.created)}</span>
      <span class="text-xs text-gray-800">
        Modification : {toPrettyDateTime(extraction.updated)}
      </span>
    </div>
  </div>
{:else}
  <Loader />
{/if}
