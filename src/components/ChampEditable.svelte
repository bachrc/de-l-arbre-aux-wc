<script lang="ts" generics="T extends string | number">
  import Loader from './Loader.svelte';

  let props: {
    titre: string;
    valeur: T;
    onupdate: (newValue: T) => Promise<void>;
  } = $props();

  let valeur = $state(props.valeur);
  let enCoursDEdition = $state(false);
  let enCoursDeSoumission = $state(false);

  async function confirmation() {
    enCoursDeSoumission = true;
    try {
      await props.onupdate(valeur);
      enCoursDEdition = false;
    } catch (e: any) {
    } finally {
      enCoursDeSoumission = false;
    }
  }

  function reset() {
    valeur = props.valeur;
    enCoursDEdition = false;
  }

  function edition() {
    enCoursDEdition = true;
  }
</script>

{#if enCoursDEdition}
  <div class="flex flex-row gap-2">
    <input type="string" bind:value={valeur} class="w-auto" disabled={enCoursDeSoumission} />
    {#if enCoursDeSoumission}
      <Loader />
    {:else}
      <button onclick={confirmation}>✅</button>
      <button onclick={reset}>❌</button>
    {/if}
  </div>
{:else}
  <div class="flex flex-row gap-2">
    <span>{valeur}</span>
    <button onclick={edition}>📝</button>
  </div>
{/if}
