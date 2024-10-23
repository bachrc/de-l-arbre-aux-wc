<script lang="ts">
  import { pb } from '$lib/database';
  import { currentUser } from '$lib/login.svelte';
  import ChampEditable from '../../components/ChampEditable.svelte';

  async function majNom(nouveau_nom: string) {
    await pb.collection('users').update(currentUser.value.id, {
      name: nouveau_nom
    });
  }
</script>

<div class="p-2">
  <h1 class="text-2xl">Profil</h1>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <span class="text-xs font-bold">Nom</span>
      <ChampEditable type="text" valeur={currentUser.value?.name} onupdate={majNom} />
    </div>
    <div class="flex flex-col">
      <span class="text-xs font-bold">Pseudonyme</span>
      <span>{currentUser.value?.username}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs font-bold">Adresse mail</span>
      <span>{currentUser.value?.email}</span>
    </div>
    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />
    <a href="/logout">
      <span class="text-red-700 font-semibold">Se déconnecter</span>
    </a>
  </div>
</div>
