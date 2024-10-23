<script lang="ts" generics="T extends string | number">
  let {
    titre,
    customClass,
    valeur = $bindable(),
    onupdate
  }: {
    titre?: string;
    customClass?: string;
    valeur: T;
    onupdate: (newValue: T) => Promise<void>;
  } = $props();
  let valeurAvantEdition = valeur;
  let enCoursDEdition = $state(false);
  let enCoursDeSoumission = $state(false);

  async function onconfirm() {
    enCoursDeSoumission = true;
    try {
      await onupdate(valeur);
      enCoursDEdition = false;
    } catch (e: any) {
    } finally {
      enCoursDeSoumission = false;
    }
  }

  function activationEdition() {
    enCoursDEdition = true;
    valeurAvantEdition = valeur;
  }

  function onreset() {
    valeur = valeurAvantEdition;
    enCoursDEdition = false;
  }
</script>

<div class="flex flex-col">
  {#if titre}
    <div class="flex flex-row items-center gap-2">
      <span class="text-sm font-bold">{titre}</span>
      {@render boutonsEdition()}
    </div>
  {/if}
  <div class="flex flex-row gap-2">
    {#if enCoursDEdition}
      {@render edition()}
    {:else}
      <span class="whitespace-pre-line {customClass}">
        {valeur}
      </span>
    {/if}
    {#if !titre}
      {@render boutonsEdition()}
    {/if}
  </div>
</div>

{#snippet edition()}
  {#if typeof valeur == 'number'}
    <input type="number" class="bg-white {customClass}" bind:value={valeur} />
  {:else}
    <span
      class="whitespace-pre-line bg-white {customClass}"
      bind:textContent={valeur as string}
      contenteditable
    ></span>
  {/if}
{/snippet}

{#snippet boutonsEdition()}
  <div class="flex flex-row text-sm items-center gap-2">
    {#if enCoursDEdition}
      <button onclick={onconfirm}>✅</button>
      <button onclick={onreset}>❌</button>
    {:else}
      <button onclick={activationEdition}>📝</button>
    {/if}
  </div>
{/snippet}
