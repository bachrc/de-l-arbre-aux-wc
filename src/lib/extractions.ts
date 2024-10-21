import { pb } from './database.ts';
import { type RecordModel } from 'pocketbase';
import { creationExtractionSchema } from './schemas.ts';
import { currentUser } from './login.svelte.ts';

export interface Extraction extends RecordModel {
  nom: string;
  poids_cafe: number;
  releves_tds: number[];
  notes: string;
}

export async function nouvelleExtraction(nom: string): Promise<Extraction> {
  const creationExtraction = creationExtractionSchema.parse({
    nom,
    utilisateur: currentUser.value.id
  });

  const nouvelleExtraction: Extraction = await pb
    .collection('extractions')
    .create(creationExtraction);

  return nouvelleExtraction;
}

export async function getExtractions(page: number, perPage: number) {
  return await pb.collection('extractions').getList(page, perPage, {
    sort: '-updated'
  });
}

export async function getExtraction(id: string): Promise<Extraction> {
  return await pb.collection('extractions').getOne(id);
}
