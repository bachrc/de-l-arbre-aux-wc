import { tdsMoyen, yieldMoyen, type Extraction } from './extractions.ts';

export const LIMITE_YIELD_SOUS_EXTRACTION = 18;
export const LIMITE_YIELD_SUR_EXTRACTION = 22;
export const LIMITE_TDS_FAIBLESSE = 1.15;
export const LIMITE_TDS_FORCE = 1.45;

export type VerdictIntensiteExtraction = 'sous-extrait' | 'bien extrait' | 'sur-extrait';
export type VerdictForce = 'trop faible' | 'optimale' | 'trop forte';
export type Verdict = {
  force: VerdictForce;
  intensiteExtraction: VerdictIntensiteExtraction;
};

function verdictIntensiteExtraction(extraction: Extraction): VerdictIntensiteExtraction {
  const yieldExtraction = yieldMoyen(extraction);

  if (yieldExtraction < 18) {
    return 'sous-extrait';
  }

  if (22 < yieldExtraction) {
    return 'sur-extrait';
  }

  return 'bien extrait';
}

function verdictForce(extraction: Extraction): VerdictForce {
  const tdsExtraction = tdsMoyen(extraction);

  if (tdsExtraction < 1.15) {
    return 'trop faible';
  }

  if (1.45 < tdsExtraction) {
    return 'trop forte';
  }

  return 'optimale';
}

export function renduDeVerdict(extraction: Extraction): Verdict {
  return {
    force: verdictForce(extraction),
    intensiteExtraction: verdictIntensiteExtraction(extraction)
  };
}

export function serialisationDeVerdict(verdict: Verdict): string {
  return `Ton café est ${verdict.intensiteExtraction}, et sa force ${verdict.force}.`;
}
