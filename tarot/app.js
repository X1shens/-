/* Tarot Divination App - Core Logic */
(function () {
  'use strict';

  // ==================== Constants ====================
  const DAILY_FREE = 1;
  const DAILY_MAX = 8;
  const CARDS_PER_DRAW = 3;
  const POOL_DISPLAY = 22;
  const POSITIONS = [
    { key: 'past', cn: '过去', en: 'Past' },
    { key: 'present', cn: '现在', en: 'Present' },
    { key: 'future', cn: '未来', en: 'Future' }
  ];
  const RARITY_BONUS = { SSR: 1, SR: 0.6667, R: 0.3334, N: 0.1667 };
  const RARITY_LABELS = {
    SSR: { cn: '传说', en: 'Legendary' },
    SR: { cn: '稀有', en: 'Epic' },
    R: { cn: '精良', en: 'Rare' },
    N: { cn: '普通', en: 'Common' }
  };
  const STORAGE_KEY = 'tarot_app_state';

  // ==================== State ====================
  let state = {
    date: '',
    freeCount: DAILY_FREE,
    usedCount: 0,
    bonusPool: 0,
    collection: {},
    currentQuestion: '',
    selectedCards: [],
    drawnCards: [],
    revealedOrientations: []
  };

  // ==================== Storage ====================
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const today = getToday();
        if (saved.date === today) {
          state = { ...state, ...saved };
        } else {
          state.date = today;
          state.freeCount = DAILY_FREE;
          state.usedCount = 0;
          state.bonusPool = saved.bonusPool || 0;
          state.collection = saved.collection || {};
        }
      } else {
        state.date = getToday();
      }
    } catch (e) {
      state.date = getToday();
    }
  }

  function saveState() {
    state.date = getToday();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: state.date,
      freeCount: state.freeCount,
      usedCount: state.usedCount,
      bonusPool: state.bonusPool,
      collection: state.collection
    }));
  }

  function getToday() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  // ==================== Draw Logic ====================
  function getAvailableDraws() {
    if (state.usedCount >= DAILY_MAX) return 0;
    let count = state.freeCount + Math.floor(state.bonusPool);
    return Math.min(count, DAILY_MAX - state.usedCount);
  }

  function consumeDraw() {
    if (state.freeCount > 0) {
      state.freeCount--;
    } else if (state.bonusPool >= 1) {
      state.bonusPool -= 1;
    }
    state.usedCount++;
    saveState();
  }

  function addDuplicateBonus(card) {
    const rarity = card.rarity || 'N';
    const bonus = RARITY_BONUS[rarity] || RARITY_BONUS.N;
    state.bonusPool += bonus;
    saveState();
  }

  function processCollection(cards) {
    cards.forEach(function (card) {
      if (!state.collection[card.id]) {
        state.collection[card.id] = 1;
      } else {
        state.collection[card.id]++;
        addDuplicateBonus(card);
      }
    });
    saveState();
  }

  // ==================== Card Pool ====================
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function dealPool() {
    const shuffled = shuffleArray(TAROT_CARDS);
    return shuffled.slice(0, POOL_DISPLAY);
  }

  function getRandomOrientation() {
    return Math.random() < 0.5 ? 'upright' : 'reversed';
  }

  // ==================== Rendering Helpers ====================
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function show(screen) {
    $$('.screen').forEach(function (s) { s.classList.remove('active'); });
    var el = typeof screen === 'string' ? $(screen) : screen;
    if (el) {
      el.classList.add('active');
      el.scrollTop = 0;
    }
  }

  function createEl(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  }

  // ==================== Card Rendering ====================
  function renderCardBack() {
    if (TAROT_CONFIG.cardBack.image) {
      return '<div class="card-back-face"><img src="' + TAROT_CONFIG.cardBack.image + '" alt="card back" class="card-back-img"/></div>';
    }
    return '<div class="card-back-face"><div class="card-back-pattern"><div class="card-back-inner"></div></div></div>';
  }

  function renderCardFront(card, orientation) {
    var isReversed = orientation === 'reversed';
    var suit = TAROT_CONFIG.suits[card.suit];
    var palette = card.visual.palette;
    var rarity = card.rarity || 'N';
    var rarityClass = 'rarity-' + rarity.toLowerCase();

    var symbolHtml = '';
    if (card.visual.image) {
      symbolHtml = '<img src="' + card.visual.image + '" alt="' + card.name.en + '" class="card-custom-img"/>';
    } else {
      symbolHtml = renderSVGSymbol(card);
    }

    var numberDisplay = card.suit === 'major'
      ? toRoman(card.number)
      : (card.number <= 10 ? card.number : '');

    var html = '<div class="card-front-face ' + rarityClass + '" style="' +
      'background:' + palette.bg + ';' +
      'border-color:' + palette.primary + ';' +
      'color:' + palette.primary + ';">' +
      '<div class="card-number">' + numberDisplay + '</div>' +
      '<div class="card-rarity-badge rarity-bg-' + rarity.toLowerCase() + '">' + rarity + '</div>' +
      '<div class="card-symbol' + (isReversed ? ' reversed-art' : '') + '">' + symbolHtml + '</div>' +
      '<div class="card-title">' +
        '<span class="card-name-cn">' + card.name.cn + '</span>' +
        '<span class="card-name-en">' + card.name.en + '</span>' +
      '</div>' +
      (isReversed ? '<div class="reversed-badge">Reversed / 逆位</div>' : '') +
      '</div>';
    return html;
  }

  function renderSVGSymbol(card) {
    var symbolKey = card.visual.symbolKey;
    var svgContent = '';
    var palette = card.visual.palette;
    var color = palette.primary;

    if (card.suit === 'major') {
      svgContent = TAROT_SYMBOLS[symbolKey] || TAROT_SYMBOLS.fool;
    } else if (card.number >= 11) {
      var courtKey = ['', '', '', '', '', '', '', '', '', '', '', 'page', 'knight', 'queen', 'king'][card.number];
      svgContent = (TAROT_SYMBOLS[courtKey] || '') + '<g transform="translate(70,70) scale(0.3)">' + (TAROT_SYMBOLS[card.suit] || '') + '</g>';
    } else {
      svgContent = renderSuitArrangement(card.suit, card.number);
    }

    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="card-svg" style="color:' + color + '">' + svgContent + '</svg>';
  }

  function renderSuitArrangement(suit, num) {
    var symbol = TAROT_SYMBOLS[suit] || '';
    if (num === 1) {
      return '<g transform="translate(25,25) scale(0.5)">' + symbol + '</g>';
    }
    var positions = getSuitPositions(num);
    var html = '';
    var scale = num <= 4 ? 0.3 : (num <= 7 ? 0.24 : 0.2);
    positions.forEach(function (p) {
      html += '<g transform="translate(' + p[0] + ',' + p[1] + ') scale(' + scale + ')">' + symbol + '</g>';
    });
    return html;
  }

  function getSuitPositions(n) {
    var layouts = {
      1: [[25, 25]],
      2: [[25, 10], [25, 50]],
      3: [[25, 5], [25, 35], [25, 65]],
      4: [[10, 10], [40, 10], [10, 50], [40, 50]],
      5: [[10, 10], [40, 10], [25, 35], [10, 60], [40, 60]],
      6: [[10, 5], [40, 5], [10, 35], [40, 35], [10, 65], [40, 65]],
      7: [[10, 5], [40, 5], [25, 25], [10, 40], [40, 40], [10, 65], [40, 65]],
      8: [[10, 2], [40, 2], [10, 24], [40, 24], [10, 46], [40, 46], [10, 68], [40, 68]],
      9: [[10, 2], [40, 2], [10, 22], [40, 22], [25, 42], [10, 55], [40, 55], [10, 72], [40, 72]],
      10: [[10, 0], [40, 0], [25, 14], [10, 28], [40, 28], [10, 48], [40, 48], [25, 62], [10, 76], [40, 76]]
    };
    return layouts[n] || layouts[1];
  }

  function toRoman(num) {
    var map = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
      'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    return map[num] || String(num);
  }

  // ==================== Screen: Welcome ====================
  function initWelcome() {
    var isFirstVisitToday = state.usedCount === 0;
    if (isFirstVisitToday) {
      show('#welcome-screen');
      $('#btn-start').onclick = function () { showQuestion(); };
    } else if (getAvailableDraws() > 0) {
      show('#question-screen');
      updateCountDisplay();
    } else {
      show('#welcome-screen');
      $('#welcome-subtitle').textContent = '今日占卜次数已用完 / No more readings today';
      $('#btn-start').textContent = '查看图鉴 / View Collection';
      $('#btn-start').onclick = function () { showCollection(); };
    }
  }

  // ==================== Screen: Question ====================
  function showQuestion() {
    show('#question-screen');
    updateCountDisplay();
    $('#question-input').value = '';
    $('#question-input').focus();
  }

  function updateCountDisplay() {
    var avail = getAvailableDraws();
    var el = $('#count-display');
    if (el) {
      el.textContent = '今日剩余 ' + avail + ' 次 / ' + avail + ' readings left today';
    }
  }

  // ==================== Screen: Card Pool ====================
  function showPool() {
    var question = $('#question-input').value.trim();
    if (!question) {
      $('#question-input').classList.add('shake');
      setTimeout(function () { $('#question-input').classList.remove('shake'); }, 500);
      return;
    }
    if (getAvailableDraws() <= 0) {
      alert('今日占卜次数已用完');
      return;
    }
    state.currentQuestion = question;
    state.selectedCards = [];
    state.drawnCards = dealPool();

    show('#pool-screen');
    renderPool();
  }

  function renderPool() {
    var grid = $('#card-pool');
    grid.innerHTML = '';
    updateSelectionCount();

    state.drawnCards.forEach(function (card, idx) {
      var el = createEl('div', 'pool-card');
      el.setAttribute('data-index', idx);
      el.innerHTML = renderCardBack();
      el.addEventListener('click', function () { selectCard(idx); });
      // Staggered entrance
      el.style.animationDelay = (idx * 0.03) + 's';
      el.classList.add('card-enter');
      grid.appendChild(el);
    });
  }

  function selectCard(idx) {
    if (state.selectedCards.indexOf(idx) !== -1) {
      // Deselect
      state.selectedCards = state.selectedCards.filter(function (i) { return i !== idx; });
      var el = $('.pool-card[data-index="' + idx + '"]');
      if (el) el.classList.remove('selected');
      updateSelectionCount();
      return;
    }
    if (state.selectedCards.length >= CARDS_PER_DRAW) return;

    state.selectedCards.push(idx);
    var el = $('.pool-card[data-index="' + idx + '"]');
    if (el) {
      el.classList.add('selected');
      // Ripple effect
      var ripple = createEl('div', 'select-ripple');
      el.appendChild(ripple);
      setTimeout(function () { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 600);
    }
    updateSelectionCount();

    if (state.selectedCards.length === CARDS_PER_DRAW) {
      setTimeout(function () { showReveal(); }, 400);
    }
  }

  function updateSelectionCount() {
    var el = $('#selected-count');
    if (el) {
      el.textContent = '已选 ' + state.selectedCards.length + ' / ' + CARDS_PER_DRAW +
        '  |  Selected ' + state.selectedCards.length + ' / ' + CARDS_PER_DRAW;
    }
    // Disable unselected cards if 3 selected
    $$('.pool-card').forEach(function (card) {
      var i = parseInt(card.getAttribute('data-index'));
      if (state.selectedCards.length >= CARDS_PER_DRAW && state.selectedCards.indexOf(i) === -1) {
        card.classList.add('disabled');
      } else {
        card.classList.remove('disabled');
      }
    });
  }

  // ==================== Screen: Reveal ====================
  function showReveal() {
    consumeDraw();

    var chosen = state.selectedCards.map(function (idx) { return state.drawnCards[idx]; });
    state.revealedOrientations = chosen.map(function () { return getRandomOrientation(); });

    processCollection(chosen);

    show('#reveal-screen');
    renderRevealCards(chosen);
    renderReading(chosen);
  }

  function renderRevealCards(cards) {
    var row = $('#reveal-cards');
    row.innerHTML = '';

    cards.forEach(function (card, i) {
      var orientation = state.revealedOrientations[i];
      var flipEl = createEl('div', 'card-flip');
      flipEl.style.animationDelay = (i * 0.4) + 's';

      var inner = createEl('div', 'card-inner');
      var backFace = createEl('div', 'flip-back');
      backFace.innerHTML = renderCardBack();
      var frontFace = createEl('div', 'flip-front');
      frontFace.innerHTML = renderCardFront(card, orientation);

      inner.appendChild(backFace);
      inner.appendChild(frontFace);
      flipEl.appendChild(inner);

      // Click to show detail
      flipEl.addEventListener('click', function () {
        showCardDetail(card, orientation);
      });

      // Position label
      var posLabel = createEl('div', 'position-label',
        '<span class="pos-cn">' + POSITIONS[i].cn + '</span>' +
        '<span class="pos-en">' + POSITIONS[i].en + '</span>');
      flipEl.appendChild(posLabel);

      row.appendChild(flipEl);

      // Trigger flip animation with stagger
      setTimeout(function () {
        flipEl.classList.add('flipped');
      }, 300 + i * 500);
    });
  }

  function renderReading(cards) {
    var container = $('#reading-result');
    container.innerHTML = '';

    var questionEl = createEl('div', 'reading-question',
      '<span class="reading-q-label">Question / 问题</span>' +
      '<p>' + escapeHtml(state.currentQuestion) + '</p>');
    container.appendChild(questionEl);

    cards.forEach(function (card, i) {
      var orientation = state.revealedOrientations[i];
      var meaning = card.meanings[orientation];
      var section = createEl('div', 'reading-section');
      section.style.animationDelay = (1.5 + i * 0.5) + 's';
      section.classList.add('fade-in-up');

      section.innerHTML =
        '<div class="reading-position">' +
          '<span class="reading-pos-cn">' + POSITIONS[i].cn + '</span>' +
          '<span class="reading-pos-en">' + POSITIONS[i].en + '</span>' +
        '</div>' +
        '<div class="reading-card-name">' +
          card.name.cn + ' / ' + card.name.en +
          (orientation === 'reversed' ? ' (逆位 / Reversed)' : ' (正位 / Upright)') +
        '</div>' +
        '<div class="reading-keywords">' + meaning.keywords.cn + '</div>' +
        '<div class="reading-desc">' + meaning.desc.cn + '</div>' +
        '<div class="reading-desc-en">' + meaning.desc.en + '</div>';

      container.appendChild(section);
    });

    // Action buttons with delayed fade-in
    var actions = $('#action-buttons');
    actions.classList.remove('visible');
    setTimeout(function () {
      actions.classList.add('visible');
    }, 3500);
  }

  // ==================== Card Detail Modal ====================
  function showCardDetail(card, orientation) {
    var modal = $('#card-modal');
    var meaning = card.meanings[orientation];
    var rarity = card.rarity || 'N';
    var ownedCount = state.collection[card.id] || 0;

    $('#modal-card-art').innerHTML = '<div class="modal-card rarity-' + rarity.toLowerCase() + '">' +
      renderCardFront(card, orientation) + '</div>';

    $('#modal-card-info').innerHTML =
      '<div class="modal-rarity rarity-bg-' + rarity.toLowerCase() + '">' + rarity + ' - ' + RARITY_LABELS[rarity].cn + ' / ' + RARITY_LABELS[rarity].en + '</div>' +
      '<h2 class="modal-name">' + card.name.cn + ' / ' + card.name.en + '</h2>' +
      '<div class="modal-orientation">' + (orientation === 'reversed' ? '逆位 / Reversed' : '正位 / Upright') + '</div>' +
      '<div class="modal-suit">' + TAROT_CONFIG.suits[card.suit].cn + ' / ' + TAROT_CONFIG.suits[card.suit].en + '</div>' +
      '<div class="modal-keywords">' + meaning.keywords.cn + '<br/>' + meaning.keywords.en + '</div>' +
      '<div class="modal-desc">' + meaning.desc.cn + '</div>' +
      '<div class="modal-desc-en">' + meaning.desc.en + '</div>' +
      '<div class="modal-owned">已收集 / Owned: ' + ownedCount + '</div>';

    modal.classList.add('active');
  }

  function closeModal() {
    $('#card-modal').classList.remove('active');
  }

  // ==================== Screenshot ====================
  function takeScreenshot() {
    var target = $('#modal-screenshot-target');
    if (!target) return;

    if (typeof html2canvas === 'undefined') {
      var tip = $('#screenshot-tip');
      if (tip) tip.textContent = '截图功能加载中,请稍后重试 / Screenshot loading, please retry';
      return;
    }

    var btn = $('#btn-screenshot');
    btn.textContent = '生成中... / Generating...';
    btn.disabled = true;

    html2canvas(target, {
      backgroundColor: '#0a0015',
      scale: 2,
      useCORS: true
    }).then(function (canvas) {
      var link = document.createElement('a');
      link.download = 'tarot-reading-' + Date.now() + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      btn.textContent = '截图 / Screenshot';
      btn.disabled = false;
    }).catch(function () {
      btn.textContent = '截图 / Screenshot';
      btn.disabled = false;
    });
  }

  // ==================== Collection ====================
  function showCollection() {
    show('#collection-screen');
    renderCollection();
  }

  function renderCollection() {
    var grid = $('#collection-grid');
    grid.innerHTML = '';

    var stats = { total: TAROT_CARDS.length, owned: 0 };
    var rarityStats = { SSR: { total: 0, owned: 0 }, SR: { total: 0, owned: 0 }, R: { total: 0, owned: 0 }, N: { total: 0, owned: 0 } };

    TAROT_CARDS.forEach(function (card) {
      var owned = state.collection[card.id] || 0;
      var rarity = card.rarity || 'N';
      rarityStats[rarity].total++;
      if (owned > 0) {
        stats.owned++;
        rarityStats[rarity].owned++;
      }

      var el = createEl('div', 'collection-card ' + (owned > 0 ? 'owned rarity-' + rarity.toLowerCase() : 'unowned'));
      el.innerHTML =
        '<div class="collection-card-inner">' +
          (owned > 0 ? renderMiniCardFront(card) : '<div class="card-unknown">?</div>') +
        '</div>' +
        (owned > 0 ? '<div class="collection-count">' + owned + '</div>' : '');

      if (owned > 0) {
        el.addEventListener('click', function () { showCardDetail(card, 'upright'); });
      }
      grid.appendChild(el);
    });

    $('#collection-stats').innerHTML =
      '<div class="stats-total">' + stats.owned + ' / ' + stats.total + '</div>' +
      '<div class="stats-detail">' +
        'SSR: ' + rarityStats.SSR.owned + '/' + rarityStats.SSR.total + '  ' +
        'SR: ' + rarityStats.SR.owned + '/' + rarityStats.SR.total + '  ' +
        'R: ' + rarityStats.R.owned + '/' + rarityStats.R.total + '  ' +
        'N: ' + rarityStats.N.owned + '/' + rarityStats.N.total +
      '</div>';
  }

  function renderMiniCardFront(card) {
    var palette = card.visual.palette;
    return '<div class="mini-card" style="background:' + palette.bg + ';border-color:' + palette.primary + ';color:' + palette.primary + ';">' +
      '<span class="mini-name">' + card.name.cn + '</span>' +
      '<span class="mini-rarity rarity-bg-' + (card.rarity || 'n').toLowerCase() + '">' + (card.rarity || 'N') + '</span>' +
      '</div>';
  }

  // ==================== Navigation ====================
  function continueDivination() {
    if (getAvailableDraws() > 0) {
      showQuestion();
    } else {
      show('#welcome-screen');
      $('#welcome-subtitle').textContent = '今日占卜次数已用完 / No more readings today';
      $('#btn-start').textContent = '查看图鉴 / View Collection';
      $('#btn-start').onclick = function () { showCollection(); };
    }
  }

  function exitApp() {
    show('#welcome-screen');
    $('#welcome-title').textContent = 'Tarot';
    $('#welcome-subtitle').textContent = '感谢今日的占卜 / Thank you for today\'s reading';
    $('#btn-start').textContent = getAvailableDraws() > 0 ? '继续占卜 / Continue' : '查看图鉴 / Collection';
    $('#btn-start').onclick = function () {
      if (getAvailableDraws() > 0) showQuestion();
      else showCollection();
    };
  }

  // ==================== Utility ====================
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // ==================== Init ====================
  function init() {
    loadState();
    // Welcome screen — btn-start behavior set dynamically by initWelcome()

    // Question screen
    $('#btn-submit-question').addEventListener('click', function () { showPool(); });
    $('#question-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); showPool(); }
    });

    // Collection button
    $$('.btn-collection').forEach(function (btn) {
      btn.addEventListener('click', function () { showCollection(); });
    });

    // Modal close
    $('#btn-close-modal').addEventListener('click', closeModal);
    $('#card-modal').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    // Screenshot
    $('#btn-screenshot').addEventListener('click', takeScreenshot);

    // Action buttons
    $('#btn-continue').addEventListener('click', continueDivination);
    $('#btn-exit').addEventListener('click', exitApp);

    // Back from collection
    $('#btn-collection-back').addEventListener('click', function () {
      if (getAvailableDraws() > 0) showQuestion();
      else {
        show('#welcome-screen');
      }
    });

    // Init welcome
    initWelcome();
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
