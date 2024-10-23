<script lang="ts">
  let {
    enCoursDEdition = $bindable(false),
    onreset,
    onconfirm
  }: {
    enCoursDEdition: boolean;
    onreset: () => void;
    onconfirm: () => void;
  } = $props();

  function edition() {
    enCoursDEdition = true;
  }
</script>

<div class="flex flex-row text-sm items-center gap-2">
  {#if enCoursDEdition}
    <button onclick={onconfirm}>✅</button>
    <button onclick={onreset}>❌</button>
  {:else}
    <button onclick={edition}>📝</button>
  {/if}
</div>
