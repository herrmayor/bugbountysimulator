export const SEVERITIES = ['Informative', 'Low', 'Medium', 'High', 'Critical'];

export const MODES = {
  junior: { id: 'junior', rounds: 8, duplicateMultiplier: 0.7, payoutMultiplier: 1, mentalMultiplier: 0.8, label: { en: 'Junior', ru: 'Новичок' } },
  hunter: { id: 'hunter', rounds: 10, duplicateMultiplier: 1, payoutMultiplier: 1, mentalMultiplier: 1, label: { en: 'Hunter', ru: 'Хантер' } },
  hell: { id: 'hell', rounds: 12, duplicateMultiplier: 1.45, payoutMultiplier: 1.25, mentalMultiplier: 1.35, label: { en: 'Triage Hell', ru: 'Триажный ад' } }
};

export function severityDistance(a, b) {
  return Math.abs(SEVERITIES.indexOf(a) - SEVERITIES.indexOf(b));
}

export function getRank({ money, rep, mental, cards, lang = 'en' }) {
  const ru = lang === 'ru';
  if (money >= 80000 && mental < 80) return ru ? 'Легенда баг-баунти' : 'Bug Bounty Legend';
  if (cards >= 12) return ru ? 'Коллекционер уязвимостей' : 'Vulnerability Collector';
  if (money >= 50000) return ru ? 'Убийца критов' : 'Critical Slayer';
  if (money >= 25000) return ru ? 'High Severity Enjoyer' : 'High Severity Enjoyer';
  if (rep >= 55) return ru ? 'Trusted Researcher' : 'Trusted Researcher';
  if (mental >= 100) return ru ? 'Выгоревший багхантер' : 'Burned Out Hunter';
  return ru ? 'Выживший после дубликатов' : 'Duplicate Survivor';
}

export function gradeRound({ bug, answers, mode = MODES.hunter, combo = 0, randomValue = Math.random() }) {
  const severityDist = severityDistance(answers.severity, bug.correct.severity);
  const severityCorrect = severityDist === 0;
  const scopeCorrect = answers.scope === bug.correct.scope;
  const proofCorrect = answers.proof === bug.correct.proof;
  const fixCorrect = answers.fix === bug.correct.fix;
  const impactCorrect = answers.impact === bug.correct.impact;
  const inScope = bug.correct.scope === 'IN_SCOPE';
  const duplicateChance = Math.min(85, bug.duplicateChance * mode.duplicateMultiplier);
  const duplicate = inScope && randomValue * 100 < duplicateChance;

  let points = 0;
  if (severityCorrect) points += 30;
  else if (severityDist === 1) points += 14;
  if (scopeCorrect) points += 20;
  if (proofCorrect) points += 18;
  if (fixCorrect) points += 18;
  if (impactCorrect) points += 14;

  let status = 'REJECTED';
  if (!inScope) status = scopeCorrect ? 'OUT_OF_SCOPE' : 'REJECTED';
  else if (duplicate) status = 'DUPLICATE';
  else if (points >= 86) status = bug.boss ? 'BOSS_DEFEATED' : 'TRIAGED';
  else if (points >= 58) status = 'PARTIAL';

  let money = 0;
  if (status === 'TRIAGED' || status === 'BOSS_DEFEATED') money = bug.payout + Math.min(combo * 250, 1800) + 500;
  if (status === 'PARTIAL') money = Math.round(bug.payout * 0.35);
  if (status === 'DUPLICATE') money = Math.round(bug.payout * 0.04);
  if (status === 'OUT_OF_SCOPE') money = 0;
  money = Math.round(money * mode.payoutMultiplier);

  let rep = Math.round(points / 12);
  if (status === 'REJECTED') rep = -4;
  if (status === 'DUPLICATE') rep = 1 + (proofCorrect ? 1 : 0);
  if (status === 'OUT_OF_SCOPE') rep = scopeCorrect ? 4 : -2;

  let mental = 18;
  if (status === 'TRIAGED') mental = -10;
  if (status === 'BOSS_DEFEATED') mental = -16;
  if (status === 'PARTIAL') mental = 6;
  if (status === 'DUPLICATE') mental = 16;
  if (status === 'OUT_OF_SCOPE') mental = scopeCorrect ? -2 : 20;
  if (!proofCorrect && bug.dangerousProof) mental += 12;
  mental = Math.round(mental * mode.mentalMultiplier);

  return {
    status,
    money,
    rep,
    mental,
    points,
    comboReset: !(status === 'TRIAGED' || status === 'BOSS_DEFEATED'),
    correctness: { severityCorrect, scopeCorrect, proofCorrect, fixCorrect, impactCorrect },
    duplicate
  };
}

export function seededDailyIndex(date = new Date(), total = 1) {
  const key = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash % total;
}
