export const TEXT = {
  en: {
    game: 'DUPLICATE HUNTER v1.0', title: 'Bug Bounty Roguelike', subtitle: 'Pick severity, scope, safe proof, fix, and impact. Beat triage bosses and share your score.',
    start: 'Start run', reset: 'Reset', next: 'Next case', submit: 'Submit report', copied: 'Copied', copy: 'Copy X post', playAgain: 'Play again',
    bounty: 'Bounty', rep: 'Reputation', mental: 'Mental damage', combo: 'Combo', cards: 'Cards', rounds: 'Rounds', difficulty: 'Difficulty',
    case: 'Case', finding: 'Finding', evidence: 'Evidence', chooseSeverity: '1. Severity', chooseScope: '2. Scope decision', chooseProof: '3. Safe proof', chooseFix: '4. Best fix', chooseImpact: '5. Strongest impact',
    review: 'Triage review', collection: 'Unlocked cards', mechanics: 'Viral mechanics', daily: 'Daily challenge', boss: 'Boss round',
    correct: 'Correct', your: 'Your', best: 'Best', explanation: 'Why', shareSuffix: 'Can you beat my run?',
    statuses: { TRIAGED: 'TRIAGED', BOSS_DEFEATED: 'BOSS DEFEATED', PARTIAL: 'PARTIAL', REJECTED: 'REJECTED', DUPLICATE: 'DUPLICATE', OUT_OF_SCOPE: 'OUT OF SCOPE' },
    scope: { IN_SCOPE: 'In scope', OUT_OF_SCOPE: 'Out of scope', NEEDS_CLARIFICATION: 'Ask program for clarification' },
    rules: ['Full correct report gives bounty + card unlock.', 'Wrong safe proof hurts: bug bounty is not theft.', 'Scope traps can save or destroy your run.', 'Boss rounds test impact writing, not just technical guessing.']
  },
  ru: {
    game: 'DUPLICATE HUNTER v1.0', title: 'Баг-баунти рогалик', subtitle: 'Выбирай severity, scope, безопасный proof, fix и impact. Побеждай триаж-боссов и делись результатом.',
    start: 'Начать забег', reset: 'Сброс', next: 'Следующий кейс', submit: 'Отправить репорт', copied: 'Скопировано', copy: 'Скопировать пост для X', playAgain: 'Играть снова',
    bounty: 'Баунти', rep: 'Репутация', mental: 'Ментальный урон', combo: 'Комбо', cards: 'Карточки', rounds: 'Раунды', difficulty: 'Сложность',
    case: 'Кейс', finding: 'Ошибка', evidence: 'Доказательства', chooseSeverity: '1. Степень бага', chooseScope: '2. Решение по scope', chooseProof: '3. Безопасный proof', chooseFix: '4. Лучший fix', chooseImpact: '5. Самый сильный impact',
    review: 'Разбор триажа', collection: 'Открытые карточки', mechanics: 'Вирусные механики', daily: 'Баг дня', boss: 'Раунд босса',
    correct: 'Правильно', your: 'Твой ответ', best: 'Лучшее', explanation: 'Почему', shareSuffix: 'Сможешь побить мой результат?',
    statuses: { TRIAGED: 'ПРИНЯТО', BOSS_DEFEATED: 'БОСС ПОБЕЖДЕН', PARTIAL: 'ЧАСТИЧНО', REJECTED: 'ОТКЛОНЕНО', DUPLICATE: 'ДУБЛИКАТ', OUT_OF_SCOPE: 'ВНЕ SCOPE' },
    scope: { IN_SCOPE: 'В scope', OUT_OF_SCOPE: 'Вне scope', NEEDS_CLARIFICATION: 'Уточнить у программы' },
    rules: ['Полностью правильный репорт дает bounty + карточку.', 'Опасный proof вредит: баг-баунти — не кража.', 'Scope traps могут спасти или уничтожить забег.', 'Boss rounds проверяют impact, а не только технику.']
  }
};

export const OPTION_BANK = {
  proofs: {
    SAFE_RPC: { en: 'Run one low-cost debug call against your own transaction and document response size/time.', ru: 'Сделать один low-cost debug call на своей транзакции и показать размер/время ответа.' },
    DRAIN_FUNDS: { en: 'Move funds to prove control.', ru: 'Перевести средства, чтобы доказать контроль.' },
    SIGN_MESSAGE: { en: 'Sign a harmless message or prove key validity without moving funds.', ru: 'Подписать harmless message или доказать валидность ключа без движения средств.' },
    STS_ONLY: { en: 'Call identity/permission-read APIs only, avoid destructive cloud actions.', ru: 'Вызвать только identity/permission-read API, избегать destructive cloud actions.' },
    UNIT_POC: { en: 'Create a local fork/unit test showing exploitability without touching production users.', ru: 'Сделать local fork/unit test, показывающий exploitability без затрагивания production users.' },
    STAFF_SAFE: { en: 'Use a harmless payload and video proof in a test account/workflow.', ru: 'Использовать harmless payload и видео-PoC в test account/workflow.' },
    ASK_SCOPE: { en: 'Pause and ask the program whether this asset/class is eligible.', ru: 'Остановиться и уточнить у программы, входит ли asset/class в scope.' }
  },
  fixes: {
    RPC_HARDEN: { en: 'Disable public debug/trace, add method allowlist, authentication, quotas, and provider-level filtering.', ru: 'Отключить public debug/trace, добавить allowlist методов, auth, quotas и provider-level filtering.' },
    ROTATE_KEYS: { en: 'Revoke keys, rotate secrets, audit permissions/logs, and move secrets to a managed vault.', ru: 'Отозвать ключи, заменить секреты, проверить права/логи и перенести secrets в vault.' },
    DOMAIN_BIND: { en: 'Bind signatures to chainId, verifying contract, nonce, purpose, and expiry.', ru: 'Привязать подписи к chainId, verifying contract, nonce, purpose и expiry.' },
    ORACLE_SAFE: { en: 'Use robust oracle/TWAP, liquidity checks, borrow caps, and circuit breakers.', ru: 'Использовать robust oracle/TWAP, liquidity checks, borrow caps и circuit breakers.' },
    ENCODE_OUTPUT: { en: 'Encode output, sanitize rich text, add CSP, and regression tests.', ru: 'Кодировать output, санитайзить rich text, добавить CSP и regression tests.' },
    CSV_ESCAPE: { en: 'Escape CSV formula prefixes and generate safe spreadsheet exports.', ru: 'Экранировать CSV formula prefixes и делать безопасные spreadsheet exports.' },
    VALIDATE_INPUT: { en: 'Reject malformed transactions before persistence and add consensus/execution regression tests.', ru: 'Отклонять malformed transactions до persistence и добавить consensus/execution regression tests.' },
    TRUST_PROXY: { en: 'Trust only proxy-verified client IP and rate-limit by account, device, and risk signals.', ru: 'Доверять только proxy-verified client IP и rate-limit по account, device и risk signals.' },
    ACCEPT_RISK: { en: 'Remove unnecessary metadata or document accepted non-sensitive exposure.', ru: 'Убрать лишние metadata или documented accepted non-sensitive exposure.' },
    NO_FIX: { en: 'No security fix needed; explain why this is expected behavior.', ru: 'Security fix не нужен; объяснить, почему это expected behavior.' }
  },
  impacts: {
    RESOURCE_DOS: { en: 'Unauthenticated attackers can repeatedly trigger expensive RPC work and expose execution traces not meant for public clients.', ru: 'Unauthenticated attackers могут многократно запускать дорогую RPC-работу и раскрывать execution traces, не предназначенные для public clients.' },
    CLOUD_ACCESS: { en: 'A live cloud key can expose or modify resources depending on permissions; immediate rotation is required.', ru: 'Живой cloud key может раскрывать или менять ресурсы в зависимости от прав; нужна немедленная rotation.' },
    DIRECT_FUNDS: { en: 'The bug can directly move, mint, borrow, or drain assets; loss is bounded only by available liquidity/funds.', ru: 'Баг может напрямую move/mint/borrow/drain assets; ущерб ограничен только liquidity/funds.' },
    RECON_ONLY: { en: 'The issue only improves reconnaissance and does not prove direct compromise.', ru: 'Проблема только помогает recon и не доказывает прямой compromise.' },
    ACCOUNT_TAKEOVER: { en: 'The weakness enables account takeover or privileged workflow execution under realistic conditions.', ru: 'Уязвимость позволяет account takeover или privileged workflow execution в реалистичных условиях.' },
    SCOPE_ARGUMENT: { en: 'Even if technically real, the submitted asset/class is outside the published bounty scope.', ru: 'Даже если баг технически реален, asset/class вне опубликованного scope.' }
  }
};

export const CASES = [
  { id: 'rpc-debug', tag: 'Web3 RPC', card: 'RPC Debug Exposure', payout: 3500, risk: 76, duplicateChance: 14,
    title: { en: 'Public debug/trace RPC exposed', ru: 'Публично открыт debug/trace RPC' },
    finding: { en: 'debug_traceBlockByNumber and trace_block work without auth on a public RPC.', ru: 'debug_traceBlockByNumber и trace_block работают без auth на public RPC.' },
    evidence: { en: ['No API key required', 'Large trace responses', 'Provider filtering inconsistent', 'Potential resource amplification'], ru: ['API key не нужен', 'Большие trace responses', 'Provider filtering inconsistent', 'Potential resource amplification'] },
    correct: { severity: 'High', scope: 'IN_SCOPE', proof: 'SAFE_RPC', fix: 'RPC_HARDEN', impact: 'RESOURCE_DOS' },
    options: { proof: ['SAFE_RPC','DRAIN_FUNDS','ASK_SCOPE'], fix: ['RPC_HARDEN','ACCEPT_RISK','CSV_ESCAPE'], impact: ['RESOURCE_DOS','RECON_ONLY','DIRECT_FUNDS'] },
    why: { en: 'Debug RPC can expose internals and burn provider resources. The winning report proves cost safely and suggests method-level hardening.', ru: 'Debug RPC раскрывает internals и жжет ресурсы provider. Сильный репорт безопасно доказывает cost и предлагает method-level hardening.' }
  },
  { id: 'aws-key', tag: 'Cloud', card: 'Live Cloud Secret', payout: 6500, risk: 84, duplicateChance: 18,
    title: { en: 'Live AWS key in repository history', ru: 'Живой AWS key в истории репозитория' },
    finding: { en: 'An old commit contains AWS keys that still pass identity checks.', ru: 'Старый commit содержит AWS keys, которые всё еще проходят identity checks.' },
    evidence: { en: ['Key is live', 'Limited list permissions', 'Production unclear', 'No destructive action needed'], ru: ['Ключ живой', 'Limited list permissions', 'Production unclear', 'Destructive action не нужен'] },
    correct: { severity: 'High', scope: 'IN_SCOPE', proof: 'STS_ONLY', fix: 'ROTATE_KEYS', impact: 'CLOUD_ACCESS' },
    options: { proof: ['STS_ONLY','DRAIN_FUNDS','UNIT_POC'], fix: ['ROTATE_KEYS','ENCODE_OUTPUT','NO_FIX'], impact: ['CLOUD_ACCESS','RECON_ONLY','RESOURCE_DOS'] },
    why: { en: 'Live cloud credentials are high risk even before full compromise. Safe proof avoids modifying data.', ru: 'Живые cloud credentials — высокий риск даже до полного compromise. Safe proof не меняет данные.' }
  },
  { id: 'bridge-replay', tag: 'Bridge', card: 'Bridge Replay', payout: 24000, risk: 98, duplicateChance: 26, boss: true,
    title: { en: 'Bridge signature replay across chains', ru: 'Replay подписи bridge между chains' },
    finding: { en: 'Deposit signatures omit chainId and verifying contract, allowing replay on a sibling deployment.', ru: 'Deposit signatures не включают chainId и verifying contract, поэтому возможен replay на sibling deployment.' },
    evidence: { en: ['Same signer set', 'Same nonce format', 'No domain separator', 'Funds at risk'], ru: ['Same signer set', 'Same nonce format', 'Нет domain separator', 'Funds at risk'] },
    correct: { severity: 'Critical', scope: 'IN_SCOPE', proof: 'UNIT_POC', fix: 'DOMAIN_BIND', impact: 'DIRECT_FUNDS' },
    options: { proof: ['UNIT_POC','DRAIN_FUNDS','ASK_SCOPE'], fix: ['DOMAIN_BIND','TRUST_PROXY','ACCEPT_RISK'], impact: ['DIRECT_FUNDS','RECON_ONLY','RESOURCE_DOS'] },
    why: { en: 'Replay across deployments can directly mint or release assets. Domain separation is mandatory.', ru: 'Replay между deployments может напрямую mint/release assets. Domain separation обязателен.' }
  },
  { id: 'oracle-spot', tag: 'DeFi', card: 'Oracle Manipulation', payout: 30000, risk: 100, duplicateChance: 20, boss: true,
    title: { en: 'Thin-pool spot oracle drains lending market', ru: 'Spot oracle из тонкого пула дренит lending market' },
    finding: { en: 'Collateral value uses a manipulable DEX spot price and a flash-loan PoC profits after fees.', ru: 'Collateral value использует manipulable DEX spot price, flash-loan PoC дает profit after fees.' },
    evidence: { en: ['No TWAP', 'Borrow path exists', 'Profit after fees', 'Collateral inflation'], ru: ['Нет TWAP', 'Borrow path exists', 'Profit after fees', 'Collateral inflation'] },
    correct: { severity: 'Critical', scope: 'IN_SCOPE', proof: 'UNIT_POC', fix: 'ORACLE_SAFE', impact: 'DIRECT_FUNDS' },
    options: { proof: ['UNIT_POC','DRAIN_FUNDS','SAFE_RPC'], fix: ['ORACLE_SAFE','ENCODE_OUTPUT','TRUST_PROXY'], impact: ['DIRECT_FUNDS','ACCOUNT_TAKEOVER','RECON_ONLY'] },
    why: { en: 'Profitable price manipulation against lending liquidity is critical. Show profit in a fork, not on mainnet.', ru: 'Profitable price manipulation против lending liquidity — Critical. Показывай profit на fork, не на mainnet.' }
  },
  { id: 'frontend-key', tag: 'Crypto Frontend', card: 'Frontend Private Key', payout: 35000, risk: 100, duplicateChance: 24,
    title: { en: 'Private key shipped in frontend bundle', ru: 'Private key попал во frontend bundle' },
    finding: { en: 'Production JS bundle contains a wallet private key used by a rewards distributor.', ru: 'Production JS bundle содержит wallet private key от rewards distributor.' },
    evidence: { en: ['Key signs transactions', 'Funds are present', 'No rotation seen', 'Proof must be safe'], ru: ['Ключ подписывает transactions', 'Есть funds', 'Rotation не видно', 'Proof должен быть safe'] },
    correct: { severity: 'Critical', scope: 'IN_SCOPE', proof: 'SIGN_MESSAGE', fix: 'ROTATE_KEYS', impact: 'DIRECT_FUNDS' },
    options: { proof: ['SIGN_MESSAGE','DRAIN_FUNDS','ASK_SCOPE'], fix: ['ROTATE_KEYS','ACCEPT_RISK','CSV_ESCAPE'], impact: ['DIRECT_FUNDS','RECON_ONLY','RESOURCE_DOS'] }, dangerousProof: true,
    why: { en: 'A live private key with funds/signing power is critical. Never drain; prove safely and request rotation.', ru: 'Живой private key с funds/signing power — Critical. Нельзя дренить; доказывай безопасно и проси rotation.' }
  },
  { id: 'xss-admin', tag: 'Web App', card: 'Stored XSS', payout: 5000, risk: 78, duplicateChance: 16,
    title: { en: 'Stored XSS in internal admin notes', ru: 'Stored XSS во внутренних admin notes' },
    finding: { en: 'User-controlled support note renders HTML in the staff admin panel.', ru: 'User-controlled support note рендерит HTML в staff admin panel.' },
    evidence: { en: ['Stored payload', 'Staff interaction', 'Admin workflow actions', 'HttpOnly cookies'], ru: ['Stored payload', 'Staff interaction', 'Admin workflow actions', 'HttpOnly cookies'] },
    correct: { severity: 'High', scope: 'IN_SCOPE', proof: 'STAFF_SAFE', fix: 'ENCODE_OUTPUT', impact: 'ACCOUNT_TAKEOVER' },
    options: { proof: ['STAFF_SAFE','DRAIN_FUNDS','SAFE_RPC'], fix: ['ENCODE_OUTPUT','ROTATE_KEYS','NO_FIX'], impact: ['ACCOUNT_TAKEOVER','RECON_ONLY','DIRECT_FUNDS'] },
    why: { en: 'Stored XSS in a staff workflow can execute privileged actions even without stealing HttpOnly cookies.', ru: 'Stored XSS в staff workflow может выполнять privileged actions даже без кражи HttpOnly cookies.' }
  },
  { id: 'scope-testnet', tag: 'Scope Trap', card: 'Scope Master', payout: 0, risk: 60, duplicateChance: 0,
    title: { en: 'Real bug on excluded testnet asset', ru: 'Реальный баг на excluded testnet asset' },
    finding: { en: 'A testnet faucet admin endpoint is vulnerable, but the program scope says mainnet contracts only.', ru: 'Testnet faucet admin endpoint уязвим, но scope программы: только mainnet contracts.' },
    evidence: { en: ['Technically exploitable', 'Asset excluded', 'No user funds', 'Scope says mainnet only'], ru: ['Технически exploitable', 'Asset excluded', 'Нет user funds', 'Scope: mainnet only'] },
    correct: { severity: 'Informative', scope: 'OUT_OF_SCOPE', proof: 'ASK_SCOPE', fix: 'NO_FIX', impact: 'SCOPE_ARGUMENT' },
    options: { proof: ['ASK_SCOPE','DRAIN_FUNDS','UNIT_POC'], fix: ['NO_FIX','ROTATE_KEYS','DOMAIN_BIND'], impact: ['SCOPE_ARGUMENT','DIRECT_FUNDS','ACCOUNT_TAKEOVER'] },
    why: { en: 'This is a real weakness but a bad bounty submission. Great hunters read scope before exploiting.', ru: 'Это реальная слабость, но плохой bounty submission. Сильные хантеры читают scope до эксплуатации.' }
  },
  { id: 'tron-empty-bytecode', tag: 'Blockchain Node', card: 'Malformed Tx Crash', payout: 2200, risk: 58, duplicateChance: 12,
    title: { en: 'Empty bytecode accepted before execution', ru: 'Empty bytecode принимается до execution' },
    finding: { en: 'Malformed contract creation with empty bytecode is accepted and later triggers a node-side exception.', ru: 'Malformed contract creation с empty bytecode принимается и позже вызывает node-side exception.' },
    evidence: { en: ['Malformed input', 'Persistence shown', 'Witness path needed', 'Exception on execution'], ru: ['Malformed input', 'Persistence shown', 'Нужен witness path', 'Exception on execution'] },
    correct: { severity: 'Medium', scope: 'IN_SCOPE', proof: 'UNIT_POC', fix: 'VALIDATE_INPUT', impact: 'RESOURCE_DOS' },
    options: { proof: ['UNIT_POC','DRAIN_FUNDS','STS_ONLY'], fix: ['VALIDATE_INPUT','ORACLE_SAFE','CSV_ESCAPE'], impact: ['RESOURCE_DOS','DIRECT_FUNDS','RECON_ONLY'] },
    why: { en: 'Malformed txs should be rejected before persistence. Severity rises if you prove network-wide crash or consensus impact.', ru: 'Malformed txs должны отклоняться до persistence. Severity растет, если доказан network-wide crash или consensus impact.' }
  },
  { id: 'rate-limit-xff', tag: 'API', card: 'Rate Limit Bypass', payout: 6000, risk: 84, duplicateChance: 15,
    title: { en: 'Login rate limit trusts X-Forwarded-For', ru: 'Login rate limit доверяет X-Forwarded-For' },
    finding: { en: 'Spoofing X-Forwarded-For bypasses login throttling and enables unlimited guesses.', ru: 'Spoofing X-Forwarded-For bypasses login throttling и дает unlimited guesses.' },
    evidence: { en: ['Header spoofable', 'MFA optional', 'No lockout', 'ATO path'], ru: ['Header spoofable', 'MFA optional', 'No lockout', 'ATO path'] },
    correct: { severity: 'High', scope: 'IN_SCOPE', proof: 'STAFF_SAFE', fix: 'TRUST_PROXY', impact: 'ACCOUNT_TAKEOVER' },
    options: { proof: ['STAFF_SAFE','DRAIN_FUNDS','SAFE_RPC'], fix: ['TRUST_PROXY','DOMAIN_BIND','ACCEPT_RISK'], impact: ['ACCOUNT_TAKEOVER','RECON_ONLY','RESOURCE_DOS'] },
    why: { en: 'Auth throttling bypass can lead to ATO. Test only your own account and controlled attempts.', ru: 'Auth throttling bypass может привести к ATO. Тестировать только свой аккаунт и controlled attempts.' }
  },
  { id: 'health-metadata', tag: 'Infra', card: 'Recon Discipline', payout: 0, risk: 10, duplicateChance: 2,
    title: { en: 'Health endpoint reveals version and region', ru: 'Health endpoint раскрывает version и region' },
    finding: { en: '/health returns service version, uptime, region, and node ID.', ru: '/health возвращает service version, uptime, region и node ID.' },
    evidence: { en: ['No secrets', 'No exploit chain', 'Likely intentional', 'Recon only'], ru: ['Нет secrets', 'Нет exploit chain', 'Вероятно intentional', 'Только recon'] },
    correct: { severity: 'Informative', scope: 'IN_SCOPE', proof: 'ASK_SCOPE', fix: 'ACCEPT_RISK', impact: 'RECON_ONLY' },
    options: { proof: ['ASK_SCOPE','DRAIN_FUNDS','UNIT_POC'], fix: ['ACCEPT_RISK','ROTATE_KEYS','ORACLE_SAFE'], impact: ['RECON_ONLY','DIRECT_FUNDS','ACCOUNT_TAKEOVER'] },
    why: { en: 'Metadata alone is usually informative unless it enables a concrete exploit chain.', ru: 'Metadata alone обычно Informative, если не дает concrete exploit chain.' }
  }
];

export const TRIAGE_EVENTS = {
  en: ['Triage asks for clearer impact.', 'Maintainer says: working as intended.', 'Your PoC video saved the report.', 'Program changed scope yesterday.', 'Security team reproduced in 4 minutes.'],
  ru: ['Триаж просит понятнее доказать impact.', 'Maintainer говорит: working as intended.', 'PoC-видео спасло репорт.', 'Программа вчера поменяла scope.', 'Security team воспроизвела за 4 минуты.']
};
