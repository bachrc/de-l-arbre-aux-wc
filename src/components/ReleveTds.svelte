<script lang="ts">
  let props: {
    index: number;
    value: number;
    ondelete: (index: number) => void;
  } = $props();
</script>

<div class="flex flex-row rounded-xl gap-2 py-1 px-3 border bg-white/50">
  <span class="w-1/2">{props.value}</span>
  <button class="w-1/2" onclick={() => props.ondelete(props.index)}>❌</button>
</div>
