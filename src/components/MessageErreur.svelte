<script lang="ts">
  type Props = {
    erreur: string;
  };

  let props: Props = $props();
</script>

<div class="p-4 my-2 w-full bg-red-300">
  <span class="text-red-950">${props.erreur}</span>
</div>
