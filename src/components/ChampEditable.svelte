<script lang="ts" generics="T extends string | number">
  import Loader from './Loader.svelte';

  let props: {
    titre?: string;
    valeur: T;
    type: 'text' | 'textarea';
    onupdate: (newValue: T) => Promise<void>;
  } = $props();

  let valeur = $state(props.valeur);
  let enCoursDEdition = $state(false);
  let enCoursDeSoumission = $state(false);

  async function confirmation(event: SubmitEvent) {
    event.preventDefault();
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

<form class="flex flex-col" onsubmit={confirmation}>
  {#if props.titre}
    <label class="text-sm font-bold">{props.titre}</label>
  {/if}
  <div class="flex flex-row gap-2">
    {#if enCoursDEdition}
      <input type={props.type} bind:value={valeur} class="w-auto" disabled={enCoursDeSoumission} />
      {#if enCoursDeSoumission}
        <Loader />
      {:else}
        <button type="submit">✅</button>
        <button onclick={reset}>❌</button>
      {/if}
    {:else}
      <div class="flex flex-row gap-2">
        <span>{valeur}</span>
        <button onclick={edition}>📝</button>
      </div>
    {/if}
  </div>
</form>
