import { pb } from './database.ts';
import { type RecordModel } from 'pocketbase';
import { creationExtractionSchema } from './schemas.ts';
import { currentUser } from './login.svelte.ts';

export interface Extraction extends RecordModel {
  nom: string;
  poids_cafe: number;
  poids_boisson: number;
  releves_tds: number[];
  notes: string;
}

export function calculYield(extraction: Extraction, tds: number): number {
  return (tds * extraction.poids_boisson) / extraction.poids_cafe;
}

export function tdsMoyen(extraction: Extraction): number {
  const sommeReleves = extraction.releves_tds.reduce((p, c) => p + c, 0);

  return sommeReleves / extraction.releves_tds.length;
}

export function yieldMoyen(extraction: Extraction): number {
  return calculYield(extraction, tdsMoyen(extraction));
}

export async function nouvelleExtraction(
  nom: string,
  poids_boisson: number,
  poids_cafe: number
): Promise<Extraction> {
  const creationExtraction = creationExtractionSchema.parse({
    nom,
    utilisateur: currentUser.value.id,
    releves_tds: [],
    poids_boisson,
    poids_cafe
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
