<script lang="ts">
  import BoutonsEdition from './BoutonsEdition.svelte';
  import Loader from './Loader.svelte';

  let props: {
    titre?: string;
    customClass?: string;
    valeur: string;
    type: 'text' | 'textarea';
    onupdate: (newValue: string) => Promise<void>;
  } = $props();
  const valeurInitiale = props.valeur;

  let valeur = $state(valeurInitiale);
  let enCoursDEdition = $state(false);
  let enCoursDeSoumission = $state(false);

  async function onconfirm() {
    enCoursDeSoumission = true;
    try {
      await props.onupdate(valeur);
      enCoursDEdition = false;
    } catch (e: any) {
    } finally {
      enCoursDeSoumission = false;
    }
  }

  function onreset() {
    valeur = valeurInitiale;
    enCoursDEdition = false;
  }
</script>

<div class="flex flex-col">
  {#if props.titre}
    <div class="flex flex-row items-center gap-2">
      <span class="text-sm font-bold">{props.titre}</span>
      <BoutonsEdition bind:enCoursDEdition {onconfirm} {onreset} />
    </div>
  {/if}
  <div class="flex flex-row gap-2">
    {#if enCoursDEdition}
      <span
        class="whitespace-pre-line bg-white border-solid border-red-700 {props.customClass}"
        bind:textContent={valeur}
        contenteditable
      ></span>
    {:else}
      <span class="whitespace-pre-line {props.customClass}">
        {valeur}
      </span>
    {/if}
    {#if !props.titre}
      <BoutonsEdition bind:enCoursDEdition {onconfirm} {onreset} />
    {/if}
  </div>
</div>
