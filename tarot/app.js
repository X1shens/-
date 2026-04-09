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

  // ==================== Reading Summary Templates ====================
  // 10 question categories, each with keyword matchers and tone-based answer templates
  var QUESTION_CATEGORIES = [
    { id: 'love',     keywords: ['爱','恋','感情','对象','暗恋','分手','复合','婚','伴侣','喜欢','love','relationship','crush','partner','dating','marriage','boyfriend','girlfriend'],
      label: { cn: '感情', en: 'Love' } },
    { id: 'career',   keywords: ['工作','事业','升职','加薪','跳槽','面试','职业','同事','老板','career','job','work','promotion','interview','boss','colleague'],
      label: { cn: '事业', en: 'Career' } },
    { id: 'finance',  keywords: ['钱','财','投资','理财','收入','赚','亏','股','基金','money','finance','invest','income','wealth','salary'],
      label: { cn: '财运', en: 'Finance' } },
    { id: 'study',    keywords: ['学习','考试','考研','留学','成绩','学业','大学','study','exam','school','grade','university','test'],
      label: { cn: '学业', en: 'Study' } },
    { id: 'health',   keywords: ['健康','身体','病','医','睡眠','减肥','运动','health','body','sick','diet','exercise','sleep'],
      label: { cn: '健康', en: 'Health' } },
    { id: 'family',   keywords: ['家','父母','孩子','亲人','家庭','family','parents','children','home'],
      label: { cn: '家庭', en: 'Family' } },
    { id: 'social',   keywords: ['朋友','社交','人际','关系','friendship','friend','social','people'],
      label: { cn: '人际', en: 'Social' } },
    { id: 'decision', keywords: ['选择','决定','纠结','要不要','该不该','should','choose','decide','decision','option'],
      label: { cn: '抉择', en: 'Decision' } },
    { id: 'future',   keywords: ['未来','前途','方向','发展','何去何从','趋势','future','direction','path','where'],
      label: { cn: '前途', en: 'Future' } },
    { id: 'general',  keywords: [],
      label: { cn: '综合', en: 'General' } }
  ];

  // tone: positive / mixed / challenging -- derived from card orientations
  var SUMMARY_TEMPLATES = {
    love: {
      positive: {
        cn: '牌面呈现出温暖而积极的情感能量。{past}揭示了你在情感中积累的宝贵经验，{present}显示当下的你正处在一个充满吸引力与真诚的阶段，{future}则暗示这段情感将朝着更深层的连结与信任发展。保持真诚与开放，幸福正在靠近。',
        en: 'The cards radiate warm emotional energy. {past} reveals valuable experience in love, {present} shows you are in a phase of genuine attraction, and {future} suggests the relationship will deepen toward trust and connection. Stay open-hearted.'
      },
      mixed: {
        cn: '牌面反映出情感生活中的复杂局面。{past}揭示了过去遗留的未解课题，{present}提醒你当下需要在付出与自我保护之间找到平衡，{future}暗示只要你正视内心的真实需求，前方仍有转机。沟通与诚实是关键。',
        en: 'The cards reflect emotional complexity. {past} reveals unresolved lessons from the past, {present} urges balance between giving and self-care, and {future} shows transformation is possible if you honor your true needs. Honesty is key.'
      },
      challenging: {
        cn: '牌面揭示了情感上的严峻考验。{past}指出旧有模式的影响仍在延续，{present}显示当下面临着信任或沟通上的困难，{future}则提醒你只有勇敢面对内心的恐惧与执念，才能真正走向疗愈与新生。',
        en: 'The cards reveal a challenging emotional period. {past} shows old patterns persisting, {present} indicates trust or communication difficulties, and {future} reminds you that only by facing fears can healing and renewal truly begin.'
      }
    },
    career: {
      positive: {
        cn: '事业运势积极向好。{past}展现了你已积累的能力与资本，{present}显示当下是展示实力、争取机会的黄金时刻，{future}预示努力将获得认可与回报。把握节奏，自信前行。',
        en: 'Career energy is strongly positive. {past} shows capabilities built over time, {present} indicates a prime moment to demonstrate your value, and {future} promises recognition and reward. Move forward with confidence.'
      },
      mixed: {
        cn: '事业牌面呈现出机遇与挑战并存的格局。{past}反映了过往努力中遗留的不确定因素，{present}提示你需要在稳健与突破之间做出权衡，{future}暗示结果取决于你如何应对当下的挑战。保持专注。',
        en: 'Career cards show opportunity and challenge coexisting. {past} reflects lingering uncertainties, {present} asks you to balance caution with boldness, and {future} suggests the outcome depends on how you handle current challenges.'
      },
      challenging: {
        cn: '事业方面正经历考验期。{past}揭示了此前某些决策的连锁反应，{present}显示你可能面临阻碍或方向的迷失，{future}提醒你退一步重新审视全局，有时候调整策略比硬撑更需要勇气。',
        en: 'Career faces a testing period. {past} reveals consequences of earlier decisions, {present} shows obstacles or loss of direction, and {future} advises stepping back to reassess. Sometimes changing strategy takes more courage than pushing through.'
      }
    },
    finance: {
      positive: {
        cn: '财运整体看好。{past}显示你在理财方面已建立了良好的基础，{present}指出当前有值得把握的机遇，{future}暗示财务状况将趋于稳定与增长。理性决策，收获可期。',
        en: 'Financial outlook is favorable. {past} shows solid foundations, {present} points to opportunities worth seizing, and {future} signals stability and growth ahead. Make rational decisions and gains will follow.'
      },
      mixed: {
        cn: '财务状况处于调整期。{past}反映了过往消费或投资中的经验教训，{present}提醒你谨慎对待当下的财务决策，{future}暗示只要平衡收支、控制风险，财运将逐步回稳。',
        en: 'Finances are in an adjustment phase. {past} holds spending or investment lessons, {present} urges caution with current decisions, and {future} suggests stability returns if you manage risk and balance wisely.'
      },
      challenging: {
        cn: '财务方面面临压力。{past}揭示了某些财务决策的后果正在显现，{present}提示当下需要更加谨慎的资金管理，{future}建议避免冒险，以稳为主，度过当前的紧缩期。',
        en: 'Financial pressure is present. {past} reveals consequences of past decisions materializing, {present} demands careful money management, and {future} advises against risk-taking until the tight period passes.'
      }
    },
    study: {
      positive: {
        cn: '学业运势强劲。{past}显示你已有扎实的积累，{present}暗示当下的努力正走在正确的轨道上，{future}预示付出将转化为令人满意的成果。保持专注和节奏，目标触手可及。',
        en: 'Academic energy is strong. {past} shows solid groundwork, {present} confirms you are on the right track, and {future} promises your effort will crystallize into satisfying results. Stay focused.'
      },
      mixed: {
        cn: '学业牌面提示你在努力的同时需要调整方法。{past}反映了某些学习方式可能需要改变，{present}建议你在效率与心态之间寻找平衡，{future}暗示方法对了，结果自然不会差。',
        en: 'Study cards suggest adjusting your approach alongside effort. {past} reflects methods that may need updating, {present} asks for balance between efficiency and mindset, and {future} confirms the right method will bring good results.'
      },
      challenging: {
        cn: '学业正面临瓶颈。{past}揭示了可能被忽视的基础问题，{present}显示压力与焦虑正在影响你的状态，{future}提醒你回归基础、调整心态，比盲目刷题更重要。允许自己休息，也是一种智慧。',
        en: 'Studies face a plateau. {past} reveals overlooked fundamentals, {present} shows stress affecting your state, and {future} reminds you that returning to basics and adjusting mindset matters more than grinding blindly.'
      }
    },
    health: {
      positive: {
        cn: '健康状况令人乐观。{past}显示你在身体管理上做出了正确的选择，{present}暗示当下身心能量充沛，{future}预示健康将持续向好。继续保持良好的作息与运动习惯。',
        en: 'Health outlook is optimistic. {past} shows positive lifestyle choices, {present} indicates strong mind-body energy, and {future} predicts continued wellbeing. Maintain your good habits.'
      },
      mixed: {
        cn: '健康方面需要关注平衡。{past}反映了某些习惯可能正在影响你的身体，{present}提醒你留意身体发出的信号，{future}暗示及时调整将带来明显的改善。倾听身体的声音。',
        en: 'Health needs attention to balance. {past} reflects habits affecting your body, {present} urges you to listen to physical signals, and {future} shows timely adjustments will bring clear improvement.'
      },
      challenging: {
        cn: '身体向你发出了警示信号。{past}揭示了长期忽视的问题正在累积，{present}强调当下必须认真对待身体的不适，{future}建议将健康置于优先位置。休息不是偷懒，是对自己负责。',
        en: 'Your body is sending warning signals. {past} reveals accumulated neglect, {present} stresses the need to take discomfort seriously, and {future} advises making health your top priority. Rest is responsibility, not laziness.'
      }
    },
    family: {
      positive: {
        cn: '家庭运势和谐温暖。{past}展现了家人之间深厚的情感基础，{present}显示当下的相处氛围融洽积极，{future}暗示家庭关系将进一步加深。珍惜眼前人，温暖是双向的。',
        en: 'Family energy is harmonious. {past} shows deep emotional bonds, {present} reveals a warm atmosphere, and {future} signals relationships will deepen further. Cherish those around you.'
      },
      mixed: {
        cn: '家庭关系中存在需要调和的张力。{past}反映了某些未被表达的情绪，{present}提醒你以耐心与理解对待家人的立场，{future}暗示坦诚的对话将化解潜在的冲突。',
        en: 'Family relationships hold tension needing resolution. {past} reveals unexpressed emotions, {present} calls for patience and understanding, and {future} shows honest dialogue will dissolve potential conflict.'
      },
      challenging: {
        cn: '家庭关系正面临考验。{past}揭示了长期积累的误解或矛盾，{present}显示沟通上的困难正在加剧隔阂，{future}提醒你主动迈出和解的第一步，血缘的纽带值得你去修复。',
        en: 'Family bonds face a trial. {past} reveals accumulated misunderstandings, {present} shows communication difficulties widening the gap, and {future} urges you to take the first step toward reconciliation.'
      }
    },
    social: {
      positive: {
        cn: '人际关系运势亮眼。{past}展现了你在社交中建立的良好口碑，{present}暗示当下是拓展人脉、深化友谊的好时机，{future}预示真诚的付出将带来意想不到的贵人相助。',
        en: 'Social energy shines. {past} shows the good reputation you have built, {present} marks an ideal time to expand connections, and {future} promises genuine effort will bring unexpected support from allies.'
      },
      mixed: {
        cn: '人际方面需要更细腻的处理。{past}反映了某些关系中存在微妙的失衡，{present}提醒你在社交中保持真实而非迎合，{future}暗示那些真正在乎你的人值得你投入更多时间。',
        en: 'Social dynamics need nuanced handling. {past} reflects subtle imbalances, {present} reminds you to be authentic rather than people-pleasing, and {future} suggests investing time in those who truly care.'
      },
      challenging: {
        cn: '人际关系遇到阻碍。{past}揭示了信任危机或过去的误会仍在发酵，{present}显示当下的某些关系让你感到消耗而非滋养，{future}建议你有选择地维系关系，学会设立边界。',
        en: 'Social relationships face obstacles. {past} reveals lingering trust issues, {present} shows draining rather than nourishing connections, and {future} advises selective engagement and firm boundaries.'
      }
    },
    decision: {
      positive: {
        cn: '牌面支持你做出积极的选择。{past}显示你已拥有足够的经验来做判断，{present}暗示直觉与理性在这一刻达成了共识，{future}预示果断行动将带来好的结果。信任自己，勇敢地做出选择。',
        en: 'The cards support a bold choice. {past} shows you have enough experience to judge, {present} indicates intuition and reason align, and {future} promises decisive action will yield good results. Trust yourself.'
      },
      mixed: {
        cn: '这个选择并非黑白分明。{past}反映了过去类似抉择的经验与教训，{present}提示你需要更多信息或时间来厘清内心的真实意愿，{future}暗示无论怎么选，关键在于你是否忠于自己的核心价值。',
        en: 'This choice is not black and white. {past} holds lessons from similar past decisions, {present} suggests you need more information or time, and {future} shows the key is staying true to your core values regardless of which path you choose.'
      },
      challenging: {
        cn: '这个抉择暗含风险。{past}揭示了你在面对选择时的习惯性模式，{present}警示你不要在压力下仓促决定，{future}建议你退后一步，给自己足够的空间去感受内心的真实声音，而非被外界推着走。',
        en: 'This decision carries risk. {past} reveals habitual patterns in decision-making, {present} warns against rushed choices under pressure, and {future} advises stepping back to hear your inner voice rather than being pushed by external forces.'
      }
    },
    future: {
      positive: {
        cn: '前途一片光明。{past}展现了你过去的努力正在为未来铺路，{present}暗示当下的你已站在一个重要的起跳点上，{future}预示新的篇章充满了可能性与希望。大胆憧憬，你值得最好的。',
        en: 'The future looks bright. {past} shows past efforts paving the way, {present} places you at an important launching point, and {future} promises a new chapter full of possibility and hope. Dream boldly.'
      },
      mixed: {
        cn: '未来充满变数但并非无迹可寻。{past}反映了你走过的路如何塑造了今天的自己，{present}提醒你当下的每一个小选择都在影响未来的走向，{future}暗示保持灵活与开放的心态将帮助你顺应变化。',
        en: 'The future holds uncertainty but is not unreadable. {past} shows how your journey shaped who you are, {present} reminds that every small choice now shapes tomorrow, and {future} suggests flexibility and openness help you navigate change.'
      },
      challenging: {
        cn: '前路有迷雾但并非绝境。{past}揭示了某些需要被清理的旧有包袱，{present}显示当下的焦虑或迷茫是转变前的必经阶段，{future}提醒你黎明前最为黑暗。接受不确定性，它是成长的一部分。',
        en: 'The road ahead is foggy but not hopeless. {past} reveals old baggage to clear, {present} shows anxiety is a necessary phase before transformation, and {future} reminds you dawn is darkest just before it breaks. Embrace uncertainty as part of growth.'
      }
    },
    general: {
      positive: {
        cn: '整体牌面传递出积极的信号。{past}展现了你已积累的内在力量，{present}暗示当下是一个充满潜力与机遇的时刻，{future}预示只要保持当前的正向态势，美好的结果正在路上。',
        en: 'Overall, the cards send a positive signal. {past} shows inner strength you have built, {present} reveals a moment rich with potential, and {future} predicts good outcomes if you maintain your current positive trajectory.'
      },
      mixed: {
        cn: '牌面呈现出光与影交织的画面。{past}揭示了某些尚未解决的课题仍在影响你，{present}提醒你在顺境与逆境之间保持内心的平静与觉察，{future}暗示每一次挑战都是成长的契机。以平常心面对一切。',
        en: 'The cards weave light and shadow together. {past} reveals unresolved themes still at play, {present} urges calm awareness amid shifting fortune, and {future} shows every challenge holds a seed of growth. Face it all with equanimity.'
      },
      challenging: {
        cn: '整体牌面显示你正经历一段充满挑战的时期。{past}揭示了困难的根源所在，{present}显示你需要面对一些不太舒适的真相，{future}提醒你最大的成长往往来自最艰难的时刻。相信自己的韧性。',
        en: 'The cards show a challenging period. {past} reveals the root of current difficulty, {present} demands confronting uncomfortable truths, and {future} reminds you the greatest growth comes from the hardest moments. Trust your resilience.'
      }
    }
  };

  function classifyQuestion(question) {
    var q = question.toLowerCase();
    for (var i = 0; i < QUESTION_CATEGORIES.length - 1; i++) {
      var cat = QUESTION_CATEGORIES[i];
      for (var j = 0; j < cat.keywords.length; j++) {
        if (q.indexOf(cat.keywords[j]) !== -1) return cat;
      }
    }
    return QUESTION_CATEGORIES[QUESTION_CATEGORIES.length - 1]; // general
  }

  function getReadingTone(orientations) {
    var reversed = 0;
    orientations.forEach(function (o) { if (o === 'reversed') reversed++; });
    if (reversed === 0) return 'positive';
    if (reversed >= 2) return 'challenging';
    return 'mixed';
  }

  function buildSummary(question, cards, orientations) {
    var cat = classifyQuestion(question);
    var tone = getReadingTone(orientations);
    var template = SUMMARY_TEMPLATES[cat.id][tone];

    var pastCard = cards[0].name.cn + (orientations[0] === 'reversed' ? '(逆位)' : '(正位)');
    var presentCard = cards[1].name.cn + (orientations[1] === 'reversed' ? '(逆位)' : '(正位)');
    var futureCard = cards[2].name.cn + (orientations[2] === 'reversed' ? '(逆位)' : '(正位)');

    var pastCardEn = cards[0].name.en + (orientations[0] === 'reversed' ? ' reversed' : ' upright');
    var presentCardEn = cards[1].name.en + (orientations[1] === 'reversed' ? ' reversed' : ' upright');
    var futureCardEn = cards[2].name.en + (orientations[2] === 'reversed' ? ' reversed' : ' upright');

    var cn = template.cn.replace('{past}', pastCard).replace('{present}', presentCard).replace('{future}', futureCard);
    var en = template.en.replace('{past}', pastCardEn).replace('{present}', presentCardEn).replace('{future}', futureCardEn);

    return { cn: cn, en: en, category: cat, tone: tone };
  }

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
      var el = createEl('div', 'pool-card pool-card-hidden');
      el.setAttribute('data-index', idx);
      el.innerHTML = renderCardBack();
      el.addEventListener('click', function () { selectCard(idx); });
      grid.appendChild(el);
      // Staggered spin-in: each card rotates in one by one
      setTimeout(function () {
        el.classList.remove('pool-card-hidden');
        el.classList.add('pool-card-spin-in');
      }, 60 + idx * 80);
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

    // Summary section - comprehensive answer to the question
    var summary = buildSummary(state.currentQuestion, cards, state.revealedOrientations);
    var summaryEl = createEl('div', 'reading-summary');
    summaryEl.style.animationDelay = (1.5 + cards.length * 0.5 + 0.3) + 's';
    summaryEl.classList.add('fade-in-up');
    var toneLabels = { positive: { cn: '吉', en: 'Favorable' }, mixed: { cn: '中', en: 'Mixed' }, challenging: { cn: '凶', en: 'Challenging' } };
    var tl = toneLabels[summary.tone];
    summaryEl.innerHTML =
      '<div class="summary-header">' +
        '<span class="summary-label">综合解读 / Reading Summary</span>' +
        '<span class="summary-tone tone-' + summary.tone + '">' + tl.cn + ' / ' + tl.en + '</span>' +
        '<span class="summary-category">' + summary.category.cn + ' / ' + summary.category.en + '</span>' +
      '</div>' +
      '<div class="summary-text">' + summary.cn + '</div>' +
      '<div class="summary-text-en">' + summary.en + '</div>';
    container.appendChild(summaryEl);

    // Action buttons with delayed fade-in
    var actions = $('#action-buttons');
    actions.classList.remove('visible');
    setTimeout(function () {
      actions.classList.add('visible');
    }, 4200);
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

    // Question screen - back to welcome
    $('#btn-question-back').addEventListener('click', function () {
      show('#welcome-screen');
      $('#btn-start').onclick = function () { showQuestion(); };
    });
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
