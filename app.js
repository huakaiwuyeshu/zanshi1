(() => {
  const GAMES = {
    delta: { id: 'delta', name: '三角洲行动', end: 'pc', endLabel: '端游', icon: 'Δ', login: 'PC 客户端 / 上号器确认', pool: '满配金枪池', shelves: 36 },
    valorant: { id: 'valorant', name: '无畏契约', end: 'pc', endLabel: '端游', icon: 'V', login: 'PC 客户端 / 上号器确认', pool: '全英雄至臻池', shelves: 24 },
    cf: { id: 'cf', name: '穿越火线', end: 'pc', endLabel: '端游', icon: 'CF', login: 'PC 客户端 / 上号器确认', pool: '英雄级全套池', stock: 'wait', shelves: 18 },
    cs2: { id: 'cs2', name: 'CS2', end: 'pc', endLabel: '端游', icon: 'CS', login: 'PC 客户端 / 上号器确认', pool: '热门刀皮池', shelves: 11 },
    lol: { id: 'lol', name: '英雄联盟', end: 'pc', endLabel: '端游', icon: 'LOL', login: 'PC 客户端 / 上号器确认', pool: '全英雄皮池', shelves: 42 },
    narak: { id: 'narak', name: '永劫无间', end: 'pc', endLabel: '端游', icon: '劫', login: 'PC 客户端 / 上号器确认', pool: '热门英雄池', shelves: 8 },
    wz: { id: 'wz', name: '王者荣耀', end: 'mobile', endLabel: '手游', icon: '王', login: '移动端扫码 / 授权确认', pool: '贵族10/典藏池', shelves: 56 },
    hp: { id: 'hp', name: '和平精英', end: 'mobile', endLabel: '手游', icon: '和', login: '移动端设备确认', pool: '载具枪皮池', shelves: 29 },
    cfm: { id: 'cfm', name: 'CF手游', end: 'mobile', endLabel: '手游', icon: 'CF', login: '移动端扫码 / 授权确认', pool: '英雄级池', shelves: 16 },
    lolm: { id: 'lolm', name: '英雄联盟手游', end: 'mobile', endLabel: '手游', icon: 'LOL', login: '移动端授权', pool: '号池补充中', stock: 'off', shelves: 0 }
  };
  const TIER = { single: 1, category: 2, allsite: 3, premium: 4 };
  const TIER_ORDER = ['single', 'category', 'allsite', 'premium'];

  const PASS = {
    single: {
      title: '单晚尝鲜卡', lead: '今晚先玩几局。第一局选定端后锁定单端，整晚可换号 1 次。',
      tag: '单端锁定 · 射击品类', duration: '2.5 小时', validity: '当晚有效（至次日 06:00）',
      device: '单端（第一局锁定端游或手游）', scope: '射击品类目录', scopeDesc: '射击品类动态目录 · 首局锁定端',
      pool: '精选体验号池', switching: '可换 1 次（满 20 分钟）', plan: '2.5 小时 · 单端 · 射击品类',
      note: '单晚卡不承诺跨端。第一局选定端游或手游后，另一端本晚会显示为已锁定。',
      price: 9.9, minutes: 150, switchLimit: 1, lockEnd: true, tier: 1,
      gameIds: ['delta', 'valorant', 'cf', 'cs2', 'hp', 'cfm']
    },
    category: {
      title: '品类双端周末卡', lead: '同一个射击品类，电脑和手机接力开黑，剩余时长继续用。',
      tag: '端游 + 手游 · 射击品类', duration: '7 小时', validity: '周末有效（周五 18:00 至周日 24:00）',
      device: '端游 + 手游（双端共享时长）', scope: '射击品类双端目录', scopeDesc: '同品类跨端互通 · 算法分配号源',
      pool: '高胜率竞技号池', switching: '冷却 20 分钟，不限次数', plan: '7 小时 · 端游 + 手游 · 射击',
      note: '换游戏或换端都要先结束当前会话。端游走上号器，手游走扫码，不共用同一套凭证。',
      price: 29.9, minutes: 420, switchLimit: 99, lockEnd: false, tier: 2,
      gameIds: ['delta', 'valorant', 'cf', 'cs2', 'hp', 'cfm']
    },
    allsite: {
      title: '全站双端周卡', lead: '一周内按当期全站目录决定今天玩什么，时长在母订单上流转。',
      tag: '端游 + 手游 · 全站通选', duration: '18 小时', validity: '激活后 7 天内有效',
      device: '全端互通（端游 + 手游）', scope: '全站准入目录', scopeDesc: '运营可配的全站目录 · 按库存履约',
      pool: '全站优质号池', switching: '冷却 20 分钟，随心切换', plan: '18 小时 · 7 天 · 全站目录',
      note: '不承诺固定游戏清单。目录里暂不可用的游戏会保留剩余时长，不会自动改派别的游戏冒充等价。',
      price: 69.9, minutes: 1080, switchLimit: 99, lockEnd: false, tier: 3,
      gameIds: ['delta', 'valorant', 'cf', 'cs2', 'lol', 'narak', 'wz', 'hp', 'cfm', 'lolm']
    },
    premium: {
      title: '尊享神装通行证', lead: '优先进入高品质账号池，游戏范围仍以当期尊享目录和库存为准。',
      tag: '顶级神装 · 优先派单', duration: '30 小时', validity: '激活后 7 天内有效',
      device: '全端尊享（端游 + 手游）', scope: '尊享准入目录', scopeDesc: '高品质号池优先匹配',
      pool: 'SVIP 神装池', switching: '冷却 20 分钟，优先派单', plan: '30 小时 · 7 天 · 尊享号池',
      note: '尊享差异在号池等级和服务优先级，不把具体皮肤名称写成永久承诺。',
      price: 129, minutes: 1800, switchLimit: 99, lockEnd: false, tier: 4,
      gameIds: ['delta', 'valorant', 'lol', 'wz', 'cf', 'hp']
    }
  };

  const COOLDOWN_MS = 15000;
  const pages = ['home', 'activity', 'directory', 'session', 'mypass', 'rules'];
  const siteFrame = document.getElementById('siteFrame');
  const bFrame = document.getElementById('bFrame');
  const introFrame = document.getElementById('introFrame');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  const state = {
    role: 'c',
    selectedPass: 'single',
    endFilter: 'all',
    order: null,
    session: null,
    pending: null,
    history: [],
    settlements: []
  };

  let accounts = [
    { id: 'delta-17', gameId: 'delta', label: 'Δ-17', merchant: '清风电竞铺', server: '微信区', inPool: true, status: 'idle' },
    { id: 'delta-08', gameId: 'delta', label: 'Δ-08', merchant: '清风电竞铺', server: 'QQ区', inPool: true, status: 'idle' },
    { id: 'val-22', gameId: 'valorant', label: 'V-22', merchant: '夜航号栈', server: '官服', inPool: true, status: 'idle' },
    { id: 'cf-05', gameId: 'cf', label: 'CF-05', merchant: '夜航号栈', server: '电信区', inPool: true, status: 'idle' },
    { id: 'cs-11', gameId: 'cs2', label: 'CS-11', merchant: '北岸工作室', server: 'Steam', inPool: true, status: 'idle' },
    { id: 'lol-03', gameId: 'lol', label: 'LOL-03', merchant: '北岸工作室', server: '艾欧尼亚', inPool: true, status: 'idle' },
    { id: 'nj-01', gameId: 'narak', label: 'NJ-01', merchant: '北岸工作室', server: '微信区', inPool: true, status: 'idle' },
    { id: 'wz-19', gameId: 'wz', label: 'WZ-19', merchant: '星河租号', server: '安卓QQ', inPool: true, status: 'idle' },
    { id: 'hp-07', gameId: 'hp', label: 'HP-07', merchant: '星河租号', server: '安卓微信', inPool: true, status: 'idle' },
    { id: 'cfm-02', gameId: 'cfm', label: 'CFM-02', merchant: '星河租号', server: '安卓微信', inPool: true, status: 'idle' },
    { id: 'wz-04', gameId: 'wz', label: 'WZ-04', merchant: '散户小陈', server: '安卓QQ', inPool: false, status: 'idle' }
  ];

  let toastTimer;
  let clockTimer;

  const $ = (id) => document.getElementById(id);
  const pass = () => PASS[state.selectedPass];
  const fmtHMS = (sec) => {
    const s = Math.max(0, sec | 0);
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const r = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${r}`;
  };
  const nowClock = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  function showToast(message) {
    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function openModal(el) { el.classList.add('open'); }
  function closeModals() {
    ['payModal', 'planModal', 'upgradeModal', 'authModal', 'switchChoiceModal', 'cooldownModal', 'failModal'].forEach((id) => $(id).classList.remove('open'));
  }

  function shelvesOf(gameId, passType) {
    const n = GAMES[gameId].shelves || 0;
    if (passType === 'premium') return n === 0 ? 0 : Math.max(3, Math.round(n * 0.32));
    return n;
  }

  function coverStats(passType) {
    const ids = PASS[passType].gameIds;
    let shelves = 0;
    let ready = 0;
    ids.forEach((id) => {
      const n = shelvesOf(id, passType);
      shelves += n;
      if (n > 0 && GAMES[id].stock !== 'off') ready += 1;
    });
    return { games: ids.length, shelves, ready };
  }

  function setRole(role) {
    state.role = role;
    document.querySelectorAll('[data-role]').forEach((btn) => btn.classList.toggle('active', btn.dataset.role === role));
    siteFrame.hidden = role !== 'c';
    bFrame.hidden = role !== 'b';
    introFrame.hidden = role !== 'intro';
    if (role === 'b') {
      setBench('dash');
      renderBench();
    } else if (role === 'c') {
      renderC();
    }
  }

  function setPage(name) {
    const page = pages.includes(name) ? name : 'home';
    document.querySelectorAll('#siteFrame .page').forEach((el) => el.classList.toggle('active', el.id === `page-${page}`));
    document.querySelectorAll('#siteFrame [data-go]').forEach((el) => el.classList.toggle('active', el.dataset.go === page));
    if (page === 'directory') renderDirectory();
    if (page === 'session') renderSession();
    if (page === 'mypass') renderMyPass();
    if (window.innerWidth < 860) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setBench(name) {
    document.querySelectorAll('.bench-page').forEach((el) => el.classList.toggle('active', el.id === `bench-${name}`));
    document.querySelectorAll('[data-bench]').forEach((el) => el.classList.toggle('active', el.dataset.bench === name));
  }

  function selectPass(type) {
    state.selectedPass = type;
    const config = PASS[type];
    document.querySelectorAll('[data-pass-card]').forEach((card) => card.classList.toggle('selected', card.dataset.passCard === type));
    document.querySelectorAll('[data-pass-filter]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.passFilter === type || (btn.dataset.passFilter === 'all' && type === 'single'));
    });
    $('selectedPassTitle').textContent = config.title;
    $('selectedPassLead').textContent = config.lead;
    $('selectedPassTag').textContent = config.tag;
    $('selectedDuration').textContent = config.duration;
    $('selectedValidity').textContent = config.validity;
    $('selectedDevice').textContent = config.device;
    $('selectedSwitch').textContent = config.switching;
    $('selectedScope').textContent = config.scope;
    $('selectedScopeDesc').textContent = config.scopeDesc;
    $('selectedPool').textContent = config.pool;
    const stats = coverStats(type);
    $('planGameCount').textContent = String(stats.games);
    $('planShelfCount').textContent = String(stats.shelves);
    $('planReadyCount').textContent = String(stats.ready);
    $('planGameList').innerHTML = config.gameIds.map((id) => {
      const g = GAMES[id];
      const n = shelvesOf(id, type);
      const st = n === 0 || g.stock === 'off' ? 'off' : g.stock === 'wait' ? 'wait' : 'ready';
      const label = st === 'off' ? '暂无货架' : st === 'wait' ? '货架紧张' : '货架充足';
      return `<div class="plan-game-row">
        <i class="directory-icon">${g.icon}</i>
        <div><strong>${g.name}</strong><small>${g.endLabel} · ${g.pool}</small></div>
        <div class="shelf-num"><b>${n}</b><span>个货架</span></div>
        <span class="status ${st}">${label}</span>
      </div>`;
    }).join('');
    $('selectedPassNote').innerHTML = `💡 <b>规则：</b>${config.note}`;
    const owned = state.order && state.order.passType === type;
    const canUpgrade = state.order && TIER[type] > TIER[state.order.passType];
    $('selectedPassActivate').textContent = owned ? '已开通此套餐' : canUpgrade ? `升级到${config.title}` : `开通${config.title}`;
    $('payPassName').textContent = config.title;
    $('payPlan').textContent = config.plan;
    $('payPrice').textContent = `¥${config.price}`;
    renderDirectory();
  }

  function openPlan(type) {
    selectPass(type);
    openModal($('planModal'));
  }

  function poolAccounts(gameId) {
    return accounts.filter((a) => a.gameId === gameId && a.inPool);
  }

  function cardStatus(game) {
    if (game.stock === 'off') return { key: 'off', label: '暂不可用', reason: '号池补充中', action: '暂不可派单' };
    const pool = poolAccounts(game.id);
    if (!pool.length) return { key: 'off', label: '暂不可用', reason: '号商未将该游戏加入通行证池', action: '暂不可派单' };
    if (state.order?.lockedEnd && game.end !== state.order.lockedEnd) {
      return { key: 'locked', label: '本卡已锁端', reason: `单晚卡已锁定${state.order.lockedEnd === 'pc' ? '端游' : '手游'}`, action: '不可跨端' };
    }
    const idle = pool.filter((a) => a.status === 'idle');
    if (!idle.length) return { key: 'wait', label: '排队派单', reason: '在池账号均在履约', action: '排队派号' };
    if (game.stock === 'wait') return { key: 'wait', label: '库存紧张', reason: '预计排队 2 分钟（演示加速）', action: '排队派号' };
    return { key: 'ready', label: '可立即开始', reason: '算法秒级匹配', action: '智能派号' };
  }

  function renderDirectory() {
    const config = pass();
    const list = config.gameIds.map((id) => GAMES[id]).filter((g) => state.endFilter === 'all' || g.end === state.endFilter);
    $('directoryHint').textContent = state.order
      ? `当前卡：${state.order.title} · 目录已按该卡过滤`
      : '尚未开通。可预览目录，派号前需要先支付开通。';
    $('directoryGrid').innerHTML = list.map((g) => {
      const st = cardStatus(g);
      const disabled = st.key === 'off' || st.key === 'locked' || (state.session && state.session.gameId !== g.id);
      const btnLabel = state.session && state.session.gameId === g.id ? '当前会话' : st.action;
      return `<article class="directory-card" data-end="${g.end}" data-game="${g.id}">
        <div class="directory-top"><i class="directory-icon">${g.icon}</i><span class="status ${st.key}">${st.label}</span></div>
        <h3>${g.name}</h3>
        <p>${g.endLabel} · ${g.login}</p>
        <div class="directory-tags"><span>算法派单</span><span>${g.pool}</span><span>${st.reason}</span></div>
        <div class="directory-bottom"><small>${shelvesOf(g.id, state.order?.passType || state.selectedPass)} 个货架</small>
          <button data-open-game="${g.id}" ${disabled && !(state.session && state.session.gameId === g.id) ? 'disabled' : ''}>${btnLabel}</button>
        </div>
      </article>`;
    }).join('');
  }

  function renderSession() {
    const active = !!state.session;
    $('sessionEmpty').hidden = active;
    $('sessionContent').hidden = !active;
    if (!active) return;
    const g = GAMES[state.session.gameId];
    const acc = accounts.find((a) => a.id === state.session.accountId);
    $('sessionGame').textContent = g.name;
    $('sessionInfo').textContent = `${g.endLabel} · ${acc.label} · ${acc.merchant}`;
    $('accountIcon').textContent = g.icon;
    $('accountTitle').textContent = `${g.name} / ${acc.label}`;
    $('accountMerchant').textContent = `${acc.merchant} · ${acc.server} · 智能巡检正常`;
    $('endStat').textContent = g.endLabel;
    $('usedStat').textContent = `${Math.ceil(state.session.usedSec / 60)} 分钟`;
    $('currentStepTitle').textContent = `${g.name}在线`;
    $('currentStepDesc').textContent = `子会话占用中，结束后按分钟结算给 ${acc.merchant}。`;
    updateClockFace();
  }

  function cooldownReady() {
    return state.session && (Date.now() - state.session.startedAt) >= COOLDOWN_MS;
  }

  function updateClockFace() {
    if (!state.order) return;
    $('timer').textContent = fmtHMS(state.order.remainingSec);
    $('remainStat').textContent = `${Math.max(0, Math.ceil(state.order.remainingSec / 60))} 分钟`;
    const strip = $('orderStrip');
    strip.classList.add('show');
    const stats = coverStats(state.order.passType);
    const sess = state.session ? `当前 ${GAMES[state.session.gameId].name}` : '未履约';
    $('stripId').textContent = state.order.id;
    $('stripTitle').textContent = state.order.title;
    $('stripMeta').textContent = `${sess} · ${stats.games} 款游戏 · ${stats.shelves} 个货架`;
    $('stripRemain').textContent = fmtHMS(state.order.remainingSec);
    const maxed = state.order.passType === 'premium';
    $('upgradePassBtn').textContent = maxed ? '已是最高档' : '升级套餐';
    $('upgradePassBtn').disabled = maxed;
    if (state.session) {
      const ratio = Math.min(1, (Date.now() - state.session.startedAt) / COOLDOWN_MS);
      $('cooldownBar').style.width = `${Math.round(ratio * 100)}%`;
      $('cooldownStat').textContent = cooldownReady() ? '已就绪' : `保护中 ${Math.max(1, Math.ceil((1 - ratio) * 20))} 分`;
      $('cooldownStat').style.color = cooldownReady() ? 'var(--green)' : 'var(--orange)';
      $('cooldownLabel').textContent = cooldownReady()
        ? '对局保护已满，可以换号或换游戏。'
        : '演示加速：约 15 秒对应 20 分钟对局保护。';
    }
    if ($('myPassRemain')) renderMyPassNumbers();
  }

  function renderMyPassNumbers() {
    if (!state.order) return;
    $('myPassRemain').textContent = fmtHMS(state.order.remainingSec);
  }

  function renderMyPass() {
    const empty = $('myPassEmpty');
    const content = $('myPassContent');
    if (!state.order) {
      empty.hidden = false;
      content.hidden = true;
      return;
    }
    empty.hidden = true;
    content.hidden = false;
    $('orderId').textContent = state.order.id;
    $('myPassTitle').textContent = state.order.title;
    $('myPassMeta').textContent = `${state.order.plan} · 已用切换 ${state.order.switchesUsed}/${state.order.switchLimit === 99 ? '不限' : state.order.switchLimit}`;
    $('myPassRemain').textContent = fmtHMS(state.order.remainingSec);
    $('myPassExpire').textContent = state.order.validity;
    $('myPassLock').textContent = state.order.lockedEnd ? (state.order.lockedEnd === 'pc' ? '已锁定端游' : '已锁定手游') : '未锁端';
    $('myPassSession').textContent = state.session ? `${GAMES[state.session.gameId].name} · ${state.session.accountLabel}` : '当前无子会话';
    $('historyRows').innerHTML = state.history.length
      ? state.history.map((h) => `<div class="history-row"><span>${h.time}</span><span>${h.game}</span><span>${h.account}</span><span>${h.minutes} 分钟</span><span>${h.result}</span></div>`).join('')
      : '<div class="empty-hint">还没有结束的子会话。</div>';
    const homeEmpty = $('homeOrderEmpty');
    if (homeEmpty) homeEmpty.innerHTML = `<div><b>${state.order.id}</b><span>${state.order.title} · 剩余 ${fmtHMS(state.order.remainingSec)}</span></div>`;
  }

  function renderC() {
    updateClockFace();
    renderDirectory();
    renderSession();
    renderMyPass();
    if (!state.order) $('orderStrip').classList.remove('show');
  }

  function renderBench() {
    const inPool = accounts.filter((a) => a.inPool);
    const busy = inPool.filter((a) => a.status === 'busy');
    const minutes = state.settlements.reduce((sum, s) => sum + s.minutes, 0) + (state.session ? Math.ceil(state.session.usedSec / 60) : 0);
    $('kpiPool').textContent = String(inPool.length);
    $('kpiBusy').textContent = String(busy.length);
    $('kpiMinutes').textContent = String(minutes);
    $('kpiCancel').textContent = '0%';
    $('liveOccupancy').innerHTML = busy.length
      ? busy.map((a) => `<div class="history-row"><span>${a.label}</span><span>${GAMES[a.gameId].name}</span><span>${a.merchant}</span><span class="pill busy">履约中</span><span>${state.order ? state.order.id : ''}</span></div>`).join('')
      : '<div class="empty-hint">当前没有通行证子会话占用。</div>';
    $('poolTable').innerHTML = accounts.map((a) => {
      const busyLock = a.status === 'busy';
      return `<tr>
        <td>${a.label}</td>
        <td>${GAMES[a.gameId].name}</td>
        <td>${GAMES[a.gameId].endLabel} / ${a.server}</td>
        <td>${a.merchant}</td>
        <td><span class="pill ${a.status === 'busy' ? 'busy' : a.inPool ? 'ok' : 'off'}">${a.status === 'busy' ? '履约中' : a.inPool ? '在池空闲' : '仅时租货架'}</span></td>
        <td><button class="toggle ${a.inPool ? 'on' : ''}" data-pool-toggle="${a.id}" ${busyLock ? 'disabled' : ''} title="${busyLock ? '履约中不可移出' : '加入或移出供给池'}"><i></i></button></td>
      </tr>`;
    }).join('');
    $('settleTable').innerHTML = state.settlements.length
      ? state.settlements.map((s) => `<tr><td>${s.time}</td><td>${s.account}</td><td>${s.game}</td><td>${s.minutes} 分钟</td><td>¥${s.amount}</td><td>${s.type}</td><td><span class="pill ok">${s.cancelFlag}</span></td></tr>`).join('')
      : '<tr><td colspan="7" class="empty-hint">还没有结算记录。C 端结束或换号后会出现，且不计入撤单率。</td></tr>';
  }

  function ensureClock() {
    if (clockTimer) return;
    clockTimer = setInterval(() => {
      if (state.order && state.session && state.order.remainingSec > 0) {
        state.order.remainingSec -= 1;
        state.session.usedSec += 1;
      }
      if (state.role === 'c') updateClockFace();
      if (state.role === 'b' && state.session) renderBench();
    }, 1000);
  }

  function applyPassToOrder(type, remainingSec) {
    const config = PASS[type];
    const prevLocked = state.order?.lockedEnd || null;
    const keepId = state.order?.id || `GP-${Date.now().toString().slice(-8)}`;
    const keepUsed = state.order?.switchesUsed || 0;
    state.order = {
      id: keepId,
      passType: type,
      title: config.title,
      plan: config.plan,
      validity: config.validity,
      remainingSec,
      switchLimit: config.switchLimit,
      switchesUsed: keepUsed,
      lockEnd: config.lockEnd,
      lockedEnd: config.lockEnd ? prevLocked : null
    };
    state.selectedPass = type;
  }

  function openPay() {
    const target = state.selectedPass;
    selectPass(target);
    if (!state.order) {
      closeModals();
      $('payConfirm').hidden = false;
      $('paySuccess').hidden = true;
      openModal($('payModal'));
      return;
    }
    if (state.order.passType === target) {
      closeModals();
      showToast('该套餐已在母订单中生效');
      setPage('mypass');
      return;
    }
    if (TIER[target] < TIER[state.order.passType]) {
      showFail('不能降级套餐', '母订单只能升级到更高档。当前套餐可继续使用，剩余时长不会清零。');
      return;
    }
    openUpgrade();
  }

  function confirmPay() {
    const config = pass();
    applyPassToOrder(state.selectedPass, config.minutes * 60);
    $('payConfirm').hidden = true;
    $('paySuccess').hidden = false;
    $('payOrderId').textContent = state.order.id;
    renderC();
    ensureClock();
    showToast('支付成功，母订单已生效');
  }

  function openUpgrade() {
    if (!state.order) {
      setPage('activity');
      showToast('请先开通一张通行证');
      return;
    }
    if (state.order.passType === 'premium') {
      showToast('当前已是最高档尊享套餐');
      return;
    }
    const current = PASS[state.order.passType];
    const currentStats = coverStats(state.order.passType);
    $('upgradeLead').textContent = `当前「${current.title}」覆盖 ${currentStats.games} 款游戏 / ${currentStats.shelves} 个货架。补差价后扩大目录，剩余时长 ${fmtHMS(state.order.remainingSec)} 保留。`;
    $('upgradeList').innerHTML = TIER_ORDER.filter((key) => TIER[key] > TIER[state.order.passType]).map((key) => {
      const cfg = PASS[key];
      const stats = coverStats(key);
      const diff = (cfg.price - current.price).toFixed(1);
      return `<button class="upgrade-item" data-upgrade="${key}">
        <div><strong>${cfg.title}</strong><span>${cfg.plan} · ${stats.games} 款游戏 · ${stats.shelves} 个货架</span></div>
        <b>补差价 ¥${diff}</b>
      </button>`;
    }).join('');
    closeModals();
    openModal($('upgradeModal'));
  }

  function confirmUpgrade(type) {
    const current = PASS[state.order.passType];
    const next = PASS[type];
    const diff = (next.price - current.price).toFixed(1);
    applyPassToOrder(type, state.order.remainingSec);
    state.history.unshift({
      time: nowClock(),
      game: '套餐升级',
      account: '—',
      minutes: 0,
      result: `升级为${next.title}，补差价 ¥${diff}`
    });
    closeModals();
    selectPass(type);
    renderC();
    showToast(`已升级为${next.title}，补差价 ¥${diff}，剩余时长保留`);
    setPage('mypass');
  }

  function pickAccount(gameId, excludeId) {
    return accounts.find((a) => a.gameId === gameId && a.inPool && a.status === 'idle' && a.id !== excludeId);
  }

  function startSession(gameId, account) {
    const g = GAMES[gameId];
    account.status = 'busy';
    state.session = {
      gameId,
      accountId: account.id,
      accountLabel: account.label,
      merchant: account.merchant,
      startedAt: Date.now(),
      usedSec: 0
    };
    if (state.order.lockEnd && !state.order.lockedEnd) state.order.lockedEnd = g.end;
    renderC();
    renderBench();
    setPage('session');
    showToast(`已派发 ${g.name} / ${account.label}，开始扣时`);
  }

  function settleCurrent(type) {
    if (!state.session) return null;
    const acc = accounts.find((a) => a.id === state.session.accountId);
    const g = GAMES[state.session.gameId];
    const minutes = Math.max(1, Math.ceil(state.session.usedSec / 60));
    const amount = (minutes * 0.18).toFixed(2);
    const rec = {
      time: nowClock(),
      game: g.name,
      account: acc.label,
      merchant: acc.merchant,
      minutes,
      result: type,
      type,
      amount,
      cancelFlag: '不计入撤单'
    };
    state.history.unshift(rec);
    state.settlements.unshift(rec);
    acc.status = 'idle';
    const ended = state.session;
    state.session = null;
    return ended;
  }

  function runProcess(steps) {
    return new Promise((resolve) => {
      const wrap = $('processWrap');
      $('processTitle').textContent = steps[0].title;
      $('processDesc').textContent = steps[0].desc;
      $('processSteps').innerHTML = steps.map((s, i) => `<li data-step="${i}"><i>${i + 1}</i>${s.title}</li>`).join('');
      wrap.classList.add('open');
      let i = 0;
      const tick = () => {
        [...$('processSteps').children].forEach((li, idx) => {
          li.classList.toggle('done', idx < i);
          li.classList.toggle('on', idx === i);
        });
        $('processTitle').textContent = steps[i].title;
        $('processDesc').textContent = steps[i].desc;
        const wait = steps[i].wait || 700;
        setTimeout(() => {
          i += 1;
          if (i >= steps.length) {
            wrap.classList.remove('open');
            resolve();
          } else tick();
        }, wait);
      };
      tick();
    });
  }

  function showFail(title, text) {
    $('failTitle').textContent = title;
    $('failText').textContent = text;
    openModal($('failModal'));
  }

  async function requestGame(gameId) {
    const g = GAMES[gameId];
    const st = cardStatus(g);
    if (!state.order) {
      openPay();
      showToast('请先支付开通通行证');
      return;
    }
    if (state.session && state.session.gameId !== gameId) {
      showFail('当前已有进行中的会话', '同一时间只能上一款游戏。请先在当前会话里结束或切换。');
      return;
    }
    if (state.session && state.session.gameId === gameId) {
      setPage('session');
      return;
    }
    if (st.key === 'off' || st.key === 'locked') {
      showFail(st.label, `${st.reason}。剩余时长仍留在母订单，不会扣减。`);
      return;
    }
    if (st.key === 'wait') {
      await runProcess([
        { title: '号池紧张，排队派单', desc: `${g.name} 当前库存紧张，演示加速排队。`, wait: 900 },
        { title: '已锁定在库账号', desc: '排队完成，准备进入授权确认。', wait: 500 }
      ]);
    }
    const account = pickAccount(gameId);
    if (!account) {
      showFail('暂无空闲号源', '该游戏在池账号不足。剩余时长保留，可改选其他游戏或稍后重试。');
      return;
    }
    state.pending = { gameId, accountId: account.id };
    $('authGame').textContent = g.name;
    $('authEnd').textContent = g.endLabel;
    $('authMethod').textContent = g.login;
    $('authAccount').textContent = `${account.label} · ${account.merchant}`;
    $('authPcPane').classList.toggle('on', g.end === 'pc');
    $('authMobilePane').classList.toggle('on', g.end === 'mobile');
    $('authPcPane').hidden = g.end !== 'pc';
    $('authMobilePane').hidden = g.end !== 'mobile';
    openModal($('authModal'));
  }

  function confirmAuth() {
    const pending = state.pending;
    if (!pending) return;
    const account = accounts.find((a) => a.id === pending.accountId);
    closeModals();
    startSession(pending.gameId, account);
    state.pending = null;
  }

  function failAuth() {
    closeModals();
    state.pending = null;
    showFail('授权未完成', '本轮不做自动回退到原号。剩余时长保留在母订单，请重新选游戏或走现有售后。');
  }

  function openSwitch() {
    if (!state.session) {
      setPage('directory');
      showToast('当前没有进行中的游戏');
      return;
    }
    if (!cooldownReady()) {
      openModal($('cooldownModal'));
      return;
    }
    if (state.order.switchesUsed >= state.order.switchLimit) {
      showFail('切换次数已用完', '单晚卡仅可切换 1 次。可继续当前游戏直到时长结束，或仅结束本局保留剩余时长。');
      return;
    }
    openModal($('switchChoiceModal'));
  }

  async function swapSame() {
    closeModals();
    const gameId = state.session.gameId;
    const currentId = state.session.accountId;
    const next = pickAccount(gameId, currentId);
    if (!next) {
      showFail('同游戏暂无备选号', '可换其他游戏，或继续当前号。时长不会因为这次失败被扣光。');
      return;
    }
    const g = GAMES[gameId];
    const mins = Math.max(1, Math.ceil(state.session.usedSec / 60));
    await runProcess([
      { title: '退出存证', desc: `正在关闭 ${g.name} 进程并记录设备状态。`, wait: 700 },
      { title: '释放号源并结算', desc: `已按 ${mins} 分钟结算给当前号商，不计入撤单率。`, wait: 700 },
      { title: '匹配同游戏新号', desc: `算法正在 ${g.name} 号池中选择下一只在库号。`, wait: 700 }
    ]);
    settleCurrent('换号释放');
    state.order.switchesUsed += 1;
    startSession(gameId, next);
  }

  async function swapOther() {
    closeModals();
    const g = GAMES[state.session.gameId];
    const mins = Math.max(1, Math.ceil(state.session.usedSec / 60));
    await runProcess([
      { title: '退出存证', desc: `正在结束 ${g.name} 并对账号做退出存证。`, wait: 700 },
      { title: '释放号源并结算', desc: `已按 ${mins} 分钟结算，不计入撤单率。`, wait: 700 }
    ]);
    settleCurrent('换游戏释放');
    state.order.switchesUsed += 1;
    renderC();
    renderBench();
    setPage('directory');
    showToast('原会话已结束。请选择下一款游戏，若换端需重新授权。');
  }

  async function endOnly() {
    closeModals();
    const g = GAMES[state.session.gameId];
    await runProcess([
      { title: '结束本局', desc: `正在退出 ${g.name}。`, wait: 600 },
      { title: '释放号源并结算', desc: '按占用分钟结算给号商，剩余时长留在母订单。', wait: 600 }
    ]);
    settleCurrent('正常结束');
    renderC();
    renderBench();
    setPage('mypass');
    showToast('子会话已结束，剩余时长可稍后再用');
  }

  function skipCooldown() {
    if (!state.session) return;
    state.session.startedAt = Date.now() - COOLDOWN_MS;
    closeModals();
    updateClockFace();
    openSwitch();
  }

  function togglePool(id) {
    const acc = accounts.find((a) => a.id === id);
    if (!acc || acc.status === 'busy') return;
    acc.inPool = !acc.inPool;
    renderBench();
    renderDirectory();
    showToast(acc.inPool ? `${acc.label} 已加入通行证供给池` : `${acc.label} 已回到普通时租货架`);
  }

  document.querySelectorAll('[data-go]').forEach((el) => el.addEventListener('click', (event) => {
    event.stopPropagation();
    const pick = el.dataset.pick;
    if (pick) selectPass(pick);
    setPage(el.dataset.go);
  }));
  const hero = document.querySelector('.hero-banner');
  if (hero) hero.addEventListener('click', (event) => {
    if (event.target.closest('[data-go]')) return;
    setPage('activity');
  });
  document.querySelectorAll('[data-action="toast"]').forEach((el) => el.addEventListener('click', () => showToast(el.dataset.message || '已更新')));
  document.querySelectorAll('[data-device]').forEach((el) => el.addEventListener('click', () => {
    document.querySelectorAll('[data-device]').forEach((btn) => btn.classList.toggle('active', btn === el));
    const mobile = el.dataset.device === 'mobile';
    siteFrame.classList.toggle('mobile', mobile);
    bFrame.classList.toggle('mobile', mobile);
    introFrame.classList.toggle('mobile', mobile);
    showToast(mobile ? '已切换到移动页面预览' : '已切换到 PC 页面预览');
  }));
  document.querySelectorAll('[data-role]').forEach((el) => el.addEventListener('click', () => setRole(el.dataset.role)));
  document.querySelectorAll('[data-bench]').forEach((el) => el.addEventListener('click', () => setBench(el.dataset.bench)));
  document.querySelectorAll('[data-action="open-pay"]').forEach((el) => el.addEventListener('click', openPay));
  document.querySelectorAll('[data-action="open-switch"]').forEach((el) => el.addEventListener('click', openSwitch));
  document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModals));
  document.querySelectorAll('.modal-wrap').forEach((el) => el.addEventListener('click', (event) => { if (event.target === el) closeModals(); }));

  document.querySelectorAll('[data-pass-card]').forEach((card) => card.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;
    openPlan(card.dataset.passCard);
  }));
  document.querySelectorAll('[data-pass-select], [data-pass-activate]').forEach((el) => el.addEventListener('click', (event) => {
    event.stopPropagation();
    const type = el.dataset.passSelect || el.dataset.passActivate;
    if (el.dataset.passActivate) {
      selectPass(type);
      openPay();
    } else {
      openPlan(type);
    }
  }));
  $('upgradePassBtn').addEventListener('click', openUpgrade);
  $('upgradeFromMyPass').addEventListener('click', openUpgrade);
  $('upgradeList').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-upgrade]');
    if (!btn) return;
    confirmUpgrade(btn.dataset.upgrade);
  });
  document.querySelectorAll('[data-pass-filter]').forEach((el) => {
    el.addEventListener('click', () => {
      const filter = el.dataset.passFilter;
      document.querySelectorAll('[data-pass-filter]').forEach((btn) => btn.classList.toggle('active', btn === el));
      document.querySelectorAll('[data-pass-card]').forEach((card) => {
        card.style.display = filter === 'all' || card.dataset.passCard === filter ? '' : 'none';
      });
      if (filter !== 'all') selectPass(filter);
    });
  });
  document.querySelectorAll('[data-end-filter]').forEach((el) => el.addEventListener('click', () => {
    document.querySelectorAll('[data-end-filter]').forEach((btn) => btn.classList.toggle('active', btn === el));
    state.endFilter = el.dataset.endFilter;
    renderDirectory();
  }));

  $('directoryGrid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-open-game]');
    if (!btn || btn.disabled) return;
    requestGame(btn.dataset.openGame);
  });
  $('confirmPay').addEventListener('click', confirmPay);
  $('goDirectoryFromPay').addEventListener('click', () => { closeModals(); setPage('directory'); });
  $('goMyPassFromPay').addEventListener('click', () => { closeModals(); setPage('mypass'); });
  $('confirmAuth').addEventListener('click', confirmAuth);
  $('failAuth').addEventListener('click', failAuth);
  $('swapSame').addEventListener('click', swapSame);
  $('swapOther').addEventListener('click', swapOther);
  $('endOnly').addEventListener('click', endOnly);
  document.querySelectorAll('[data-action="skip-cooldown"]').forEach((el) => el.addEventListener('click', skipCooldown));
  $('failOk').addEventListener('click', closeModals);
  $('poolTable').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-pool-toggle]');
    if (!btn) return;
    togglePool(btn.dataset.poolToggle);
  });

  selectPass('single');
  renderDirectory();
  renderBench();
  window.GenrePass = { state, accounts, skipCooldown, setRole, setPage, cooldownReady };
})();
