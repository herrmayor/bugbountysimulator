import { describe, expect, it } from 'vitest';
import { MODES, getRank, gradeRound, seededDailyIndex, severityDistance } from './scoring.js';

const bug = {
  payout: 1000,
  duplicateChance: 10,
  correct: {
    severity: 'High',
    scope: 'IN_SCOPE',
    proof: 'STAFF_SAFE',
    fix: 'TRUST_PROXY',
    impact: 'ACCOUNT_TAKEOVER'
  }
};

describe('scoring engine', () => {
  it('calculates severity distance', () => {
    expect(severityDistance('Low', 'Critical')).toBe(3);
    expect(severityDistance('High', 'High')).toBe(0);
  });

  it('triages a perfect non-duplicate report', () => {
    const result = gradeRound({
      bug,
      mode: MODES.hunter,
      combo: 0,
      randomValue: 0.99,
      answers: {
        severity: 'High',
        scope: 'IN_SCOPE',
        proof: 'STAFF_SAFE',
        fix: 'TRUST_PROXY',
        impact: 'ACCOUNT_TAKEOVER'
      }
    });

    expect(result.status).toBe('TRIAGED');
    expect(result.points).toBe(100);
    expect(result.money).toBeGreaterThan(1000);
    expect(result.comboReset).toBe(false);
  });

  it('marks a valid report as duplicate when duplicate roll hits', () => {
    const result = gradeRound({
      bug,
      mode: MODES.hunter,
      combo: 0,
      randomValue: 0.01,
      answers: {
        severity: 'High',
        scope: 'IN_SCOPE',
        proof: 'STAFF_SAFE',
        fix: 'TRUST_PROXY',
        impact: 'ACCOUNT_TAKEOVER'
      }
    });

    expect(result.status).toBe('DUPLICATE');
    expect(result.money).toBe(40);
  });

  it('rewards partial reports when severity is close and enough supporting choices are correct', () => {
    const result = gradeRound({
      bug,
      mode: MODES.hunter,
      combo: 0,
      randomValue: 0.99,
      answers: {
        severity: 'Medium',
        scope: 'IN_SCOPE',
        proof: 'DRAIN_FUNDS',
        fix: 'TRUST_PROXY',
        impact: 'ACCOUNT_TAKEOVER'
      }
    });

    expect(result.status).toBe('PARTIAL');
    expect(result.correctness.fixCorrect).toBe(true);
    expect(result.correctness.impactCorrect).toBe(true);
    expect(result.points).toBeGreaterThanOrEqual(58);
    expect(result.points).toBeLessThan(86);
  });

  it('rejects reports that only guess the fix but miss severity, proof, and impact', () => {
    const result = gradeRound({
      bug,
      mode: MODES.hunter,
      combo: 0,
      randomValue: 0.99,
      answers: {
        severity: 'Informative',
        scope: 'IN_SCOPE',
        proof: 'DRAIN_FUNDS',
        fix: 'TRUST_PROXY',
        impact: 'RECON_ONLY'
      }
    });

    expect(result.status).toBe('REJECTED');
    expect(result.correctness.fixCorrect).toBe(true);
  });

  it('detects out-of-scope trap handling', () => {
    const outOfScopeBug = {
      ...bug,
      payout: 0,
      duplicateChance: 0,
      correct: { ...bug.correct, severity: 'Informative', scope: 'OUT_OF_SCOPE', proof: 'ASK_SCOPE', fix: 'NO_FIX', impact: 'SCOPE_ARGUMENT' }
    };

    const result = gradeRound({
      bug: outOfScopeBug,
      mode: MODES.hunter,
      combo: 0,
      randomValue: 0.99,
      answers: {
        severity: 'Informative',
        scope: 'OUT_OF_SCOPE',
        proof: 'ASK_SCOPE',
        fix: 'NO_FIX',
        impact: 'SCOPE_ARGUMENT'
      }
    });

    expect(result.status).toBe('OUT_OF_SCOPE');
    expect(result.correctness.scopeCorrect).toBe(true);
  });

  it('returns localized rank', () => {
    expect(getRank({ money: 90000, rep: 10, mental: 20, cards: 1, lang: 'ru' })).toBe('Легенда баг-баунти');
  });

  it('returns a stable daily index within range', () => {
    const index = seededDailyIndex(new Date('2026-05-10T00:00:00Z'), 10);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(10);
    expect(index).toBe(seededDailyIndex(new Date('2026-05-10T12:00:00Z'), 10));
  });
});
