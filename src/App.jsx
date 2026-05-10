import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CASES, OPTION_BANK, TEXT, TRIAGE_EVENTS } from './game/content.js';
import { MODES, SEVERITIES, getRank, gradeRound, seededDailyIndex } from './game/scoring.js';

const LEADERBOARD_KEY = 'bb-sim-leaderboard-v1';
const GAME_URL = 'https://herrmayor.github.io/bugbountysimulator/';
const EMPTY_ANSWERS = { severity: '', scope: '', proof: '', fix: '', impact: '' };

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeDeck() {
  const daily = CASES[seededDailyIndex(new Date(), CASES.length)];
  const rest = shuffle(CASES.filter((item) => item.id !== daily.id));
  return [daily, ...rest];
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLeaderboard(entry) {
  const current = loadLeaderboard();
  const next = [entry, ...current]
    .sort((a, b) => b.money - a.money || b.rep - a.rep || a.mental - b.mental)
    .slice(0, 10);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(next));
  return next;
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [modeId, setModeId] = useState('hunter');
  const [deck, setDeck] = useState(() => makeDeck());
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [review, setReview] = useState(null);
  const [money, setMoney] = useState(0);
  const [rep, setRep] = useState(0);
  const [mental, setMental] = useState(12);
  const [combo, setCombo] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [runStarted, setRunStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => loadLeaderboard());
  const [savedThisRun, setSavedThisRun] = useState(false);

  const t = TEXT[lang];
  const mode = MODES[modeId];
  const bug = deck[index % deck.length];
  const roundsLeft = Math.max(0, mode.rounds - index);
  const isDaily = index === 0;

  const proofOptions = useMemo(() => shuffle(bug.options.proof), [bug]);
  const fixOptions = useMemo(() => shuffle(bug.options.fix), [bug]);
  const impactOptions = useMemo(() => shuffle(bug.options.impact), [bug]);

  const rank = getRank({ money, rep, mental, cards: unlocked.length, lang });
  const shareText = useMemo(() => {
    if (lang === 'ru') {
      return `Я набрал $${money.toLocaleString()} в Bug Bounty Simulator. Ранг: ${rank}. Карточек: ${unlocked.length}. Сможешь побить мой результат?\n\nPlay: ${GAME_URL}\n\n#bugbounty #infosec #web3security`;
    }
    return `I made $${money.toLocaleString()} in Bug Bounty Simulator. Rank: ${rank}. Cards: ${unlocked.length}. Can you beat my run?\n\nPlay: ${GAME_URL}\n\n#bugbounty #infosec #web3security`;
  }, [money, rep, mental, unlocked.length, lang, rank]);

  useEffect(() => {
    if (!gameOver || savedThisRun) return;
    const entry = {
      id: crypto?.randomUUID?.() || String(Date.now()),
      money,
      rep,
      mental,
      cards: unlocked.length,
      mode: mode.label.en,
      rank,
      date: new Date().toISOString().slice(0, 10)
    };
    setLeaderboard(saveLeaderboard(entry));
    setSavedThisRun(true);
  }, [gameOver, savedThisRun, money, rep, mental, unlocked.length, mode.label.en, rank]);

  function reset(nextMode = modeId) {
    setModeId(nextMode);
    setDeck(makeDeck());
    setIndex(0);
    setAnswers(EMPTY_ANSWERS);
    setReview(null);
    setMoney(0);
    setRep(0);
    setMental(12);
    setCombo(0);
    setUnlocked([]);
    setHistory([]);
    setCopied(false);
    setGameOver(false);
    setRunStarted(false);
    setSavedThisRun(false);
  }

  function setAnswer(key, value) {
    if (review) return;
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function canSubmit() {
    return answers.severity && answers.scope && answers.proof && answers.fix && answers.impact && !review;
  }

  function submit() {
    if (!canSubmit()) return;

    const result = gradeRound({ bug, answers, mode, combo });
    const randomEvent = Math.random() < 0.25 ? TRIAGE_EVENTS[lang][Math.floor(Math.random() * TRIAGE_EVENTS[lang].length)] : null;
    const finalMoney = Math.max(0, result.money);
    const finalRep = result.rep;
    const finalMental = result.mental + (randomEvent ? (result.status === 'TRIAGED' || result.status === 'BOSS_DEFEATED' ? -2 : 4) : 0);

    setMoney((value) => Math.max(0, value + finalMoney));
    setRep((value) => Math.max(0, value + finalRep));
    setMental((value) => Math.max(0, Math.min(130, value + finalMental)));
    setCombo((value) => (result.comboReset ? 0 : value + 1));

    const shouldUnlock = ['TRIAGED', 'BOSS_DEFEATED'].includes(result.status) && !unlocked.includes(bug.card);
    if (shouldUnlock) setUnlocked((cards) => [bug.card, ...cards]);

    const reviewItem = {
      id: `${bug.id}-${Date.now()}`,
      bug,
      answers,
      result,
      money: finalMoney,
      rep: finalRep,
      mental: finalMental,
      event: randomEvent,
      unlocked: shouldUnlock ? bug.card : null
    };

    setReview(reviewItem);
    setHistory((items) => [reviewItem, ...items].slice(0, 8));
  }

  function nextCase() {
    const nextIndex = index + 1;
    setReview(null);
    setAnswers(EMPTY_ANSWERS);
    if (nextIndex >= mode.rounds || mental >= 100) {
      setGameOver(true);
      return;
    }
    setIndex(nextIndex);
  }

  function copyShare() {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function clearLeaderboard() {
    localStorage.removeItem(LEADERBOARD_KEY);
    setLeaderboard([]);
  }

  if (!runStarted) {
    return (
      <Shell>
        <Hero t={t} lang={lang} setLang={setLang} />
        <div className="mode-grid">
          {Object.values(MODES).map((item) => (
            <button key={item.id} className={`mode-card ${modeId === item.id ? 'active' : ''}`} onClick={() => setModeId(item.id)}>
              <span>{item.label[lang]}</span>
              <small>{item.rounds} {t.rounds} · x{item.duplicateMultiplier} duplicate</small>
            </button>
          ))}
        </div>
        <div className="landing-grid">
          <InfoCard title={t.daily} body={`${deck[0].title[lang]} · ${deck[0].tag}`} hot />
          <InfoCard title={t.mechanics} body={t.rules.join(' ')} />
        </div>
        <Leaderboard t={t} rows={leaderboard} onClear={clearLeaderboard} />
        <button className="primary big" onClick={() => setRunStarted(true)}>{t.start}</button>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="topbar">
        <div>
          <div className="eyebrow">{t.game}</div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>{lang === 'ru' ? 'EN' : 'RU'}</button>
          <button className="ghost" onClick={() => reset(modeId)}>{t.reset}</button>
        </div>
      </div>

      <div className="stats">
        <Stat label={t.bounty} value={`$${money.toLocaleString()}`} />
        <Stat label={t.rep} value={rep} />
        <Stat label={t.mental} value={`${mental}%`} danger={mental >= 80} />
        <Stat label={t.combo} value={`x${combo}`} />
        <Stat label={t.cards} value={unlocked.length} />
        <Stat label={t.rounds} value={`${Math.max(0, roundsLeft)}/${mode.rounds}`} />
      </div>

      {!gameOver ? (
        <main className="game-grid">
          <AnimatePresence mode="wait">
            <motion.section key={bug.id + index} className="case-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="case-head">
                <div>
                  <div className="case-meta">
                    {isDaily ? `🔥 ${t.daily}` : t.case} #{String(index + 1).padStart(2, '0')} · {bug.tag} {bug.boss ? `· 👹 ${t.boss}` : ''}
                  </div>
                  <h2>{bug.title[lang]}</h2>
                </div>
                <div className="risk">{bug.risk}</div>
              </div>

              <div className="terminal">
                <span>$ ./submit-report --mode {mode.id}</span>
                <p><b>{t.finding}:</b> {bug.finding[lang]}</p>
              </div>

              <div className="chips">
                {bug.evidence[lang].map((item) => <span key={item}>{item}</span>)}
              </div>

              <ChoiceGroup title={t.chooseSeverity} options={SEVERITIES} value={answers.severity} onPick={(v) => setAnswer('severity', v)} />
              <ChoiceGroup title={t.chooseScope} options={['IN_SCOPE', 'OUT_OF_SCOPE', 'NEEDS_CLARIFICATION']} label={(v) => t.scope[v]} value={answers.scope} onPick={(v) => setAnswer('scope', v)} />
              <ChoiceGroup title={t.chooseProof} options={proofOptions} label={(v) => OPTION_BANK.proofs[v][lang]} value={answers.proof} onPick={(v) => setAnswer('proof', v)} long />
              <ChoiceGroup title={t.chooseFix} options={fixOptions} label={(v) => OPTION_BANK.fixes[v][lang]} value={answers.fix} onPick={(v) => setAnswer('fix', v)} long />
              <ChoiceGroup title={t.chooseImpact} options={impactOptions} label={(v) => OPTION_BANK.impacts[v][lang]} value={answers.impact} onPick={(v) => setAnswer('impact', v)} long />

              {!review ? (
                <button className="primary big" disabled={!canSubmit()} onClick={submit}>{t.submit}</button>
              ) : (
                <Review t={t} lang={lang} review={review} onNext={nextCase} />
              )}
            </motion.section>
          </AnimatePresence>

          <aside className="side">
            <Panel title={t.collection}>
              {unlocked.length === 0 ? <p className="muted">No cards yet.</p> : <div className="cards-list">{unlocked.map((card) => <span key={card}>🏆 {card}</span>)}</div>}
            </Panel>
            <Leaderboard t={t} rows={leaderboard} onClear={clearLeaderboard} compact />
            <Panel title={t.review}>
              {history.length === 0 ? <p className="muted">No reports yet.</p> : history.map((item) => <HistoryItem key={item.id} item={item} t={t} lang={lang} />)}
            </Panel>
            <Panel title={t.mechanics}>
              <ul>{t.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
            </Panel>
          </aside>
        </main>
      ) : (
        <EndScreen t={t} lang={lang} money={money} rep={rep} mental={mental} unlocked={unlocked} shareText={shareText} copied={copied} copyShare={copyShare} reset={() => reset(modeId)} leaderboard={leaderboard} clearLeaderboard={clearLeaderboard} />
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return <div className="app"><div className="bg-glow" /><div className="container">{children}</div></div>;
}

function Hero({ t, lang, setLang }) {
  return (
    <div className="hero">
      <div className="eyebrow">{t.game}</div>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <button className="ghost lang" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>{lang === 'ru' ? 'English' : 'Русский'}</button>
    </div>
  );
}

function InfoCard({ title, body, hot }) {
  return <div className={`info ${hot ? 'hot' : ''}`}><h3>{title}</h3><p>{body}</p></div>;
}

function Stat({ label, value, danger }) {
  return <div className={`stat ${danger ? 'danger' : ''}`}><span>{label}</span><b>{value}</b></div>;
}

function Panel({ title, children }) {
  return <section className="panel"><h3>{title}</h3>{children}</section>;
}

function Leaderboard({ t, rows, onClear, compact = false }) {
  return (
    <Panel title={t.leaderboard || 'Leaderboard'}>
      {rows.length === 0 ? <p className="muted">No scores yet. Finish a run to save your first score.</p> : (
        <div className="leaderboard">
          {rows.slice(0, compact ? 5 : 10).map((row, index) => (
            <div className="leader-row" key={row.id}>
              <b>#{index + 1}</b>
              <span>${row.money.toLocaleString()}</span>
              <small>{row.rank} · {row.mode} · {row.cards} cards · {row.date}</small>
            </div>
          ))}
        </div>
      )}
      {rows.length > 0 && <button className="ghost mini" onClick={onClear}>Clear leaderboard</button>}
    </Panel>
  );
}

function ChoiceGroup({ title, options, value, onPick, label = (v) => v, long = false }) {
  return (
    <div className="choice-group">
      <h3>{title}</h3>
      <div className={long ? 'choices long' : 'choices'}>
        {options.map((option) => <button key={option} className={value === option ? 'selected' : ''} onClick={() => onPick(option)}>{label(option)}</button>)}
      </div>
    </div>
  );
}

function Review({ t, lang, review, onNext }) {
  const { bug, answers, result } = review;
  const checks = [
    ['Severity', answers.severity, bug.correct.severity, result.correctness.severityCorrect],
    ['Scope', answers.scope, bug.correct.scope, result.correctness.scopeCorrect],
    ['Proof', OPTION_BANK.proofs[answers.proof][lang], OPTION_BANK.proofs[bug.correct.proof][lang], result.correctness.proofCorrect],
    ['Fix', OPTION_BANK.fixes[answers.fix][lang], OPTION_BANK.fixes[bug.correct.fix][lang], result.correctness.fixCorrect],
    ['Impact', OPTION_BANK.impacts[answers.impact][lang], OPTION_BANK.impacts[bug.correct.impact][lang], result.correctness.impactCorrect]
  ];

  return (
    <motion.div className="review" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="review-title"><b>{t.statuses[result.status]}</b><span>+${review.money.toLocaleString()} · {result.points}/100</span></div>
      {review.event && <p className="event">⚠ {review.event}</p>}
      {review.unlocked && <p className="unlock">🏆 Unlocked: {review.unlocked}</p>}
      <div className="check-grid">
        {checks.map(([name, your, best, ok]) => <div key={name} className="check"><b>{name} {ok ? '✅' : '❌'}</b><small>{t.your}: {your}</small><small>{t.best}: {best}</small></div>)}
      </div>
      <p><b>{t.explanation}:</b> {bug.why[lang]}</p>
      <button className="primary" onClick={onNext}>{t.next}</button>
    </motion.div>
  );
}

function HistoryItem({ item, t, lang }) {
  return <div className="history"><b>{t.statuses[item.result.status]}</b><span>{item.bug.title[lang]}</span><small>+${item.money} · {item.result.points}/100</small></div>;
}

function EndScreen({ t, lang, money, rep, mental, unlocked, shareText, copied, copyShare, reset, leaderboard, clearLeaderboard }) {
  const rank = getRank({ money, rep, mental, cards: unlocked.length, lang });
  return (
    <motion.section className="end" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="trophy">🏆</div>
      <h2>{rank}</h2>
      <p>{t.bounty}: <b>${money.toLocaleString()}</b> · {t.rep}: <b>{rep}</b> · {t.mental}: <b>{mental}%</b> · {t.cards}: <b>{unlocked.length}</b></p>
      <pre>{shareText}</pre>
      <div className="end-actions"><button className="primary" onClick={copyShare}>{copied ? t.copied : t.copy}</button><button className="ghost" onClick={reset}>{t.playAgain}</button></div>
      <Leaderboard t={t} rows={leaderboard} onClear={clearLeaderboard} />
      <div className="cards-list bigcards">{unlocked.map((card) => <span key={card}>🏆 {card}</span>)}</div>
    </motion.section>
  );
}
