// Tarot Card Data - All visual assets configurable via card.visual.image URL
const TAROT_CONFIG = {
  cardBack: { image: 'image/tarotI/cards/card_back.png', pattern: 'mystical' },
  suits: {
    major:     { cn: '大阿尔卡纳', en: 'Major Arcana', color: '#a855f7' },
    cups:      { cn: '圣杯', en: 'Cups',      color: '#60a5fa', element: { cn: '水', en: 'Water' } },
    wands:     { cn: '权杖', en: 'Wands',     color: '#f97316', element: { cn: '火', en: 'Fire'  } },
    swords:    { cn: '宝剑', en: 'Swords',    color: '#eab308', element: { cn: '风', en: 'Air'   } },
    pentacles: { cn: '星币', en: 'Pentacles', color: '#4ade80', element: { cn: '地', en: 'Earth' } }
  }
};

// SVG inner content (viewBox 0 0 100 100), use currentColor for stroke/fill
const TAROT_SYMBOLS = {
  // ---- Suit symbols ----
  cups:
    '<path d="M30,28 L24,60 Q24,72 50,76 Q76,72 76,60 L70,28 Z M24,30 L76,30 M42,30 L40,16 Q50,10 60,16 L58,30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
  wands:
    '<line x1="50" y1="10" x2="50" y2="86" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="10" r="5" fill="currentColor"/><line x1="36" y1="26" x2="64" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="38" y1="34" x2="62" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  swords:
    '<line x1="50" y1="8" x2="50" y2="84" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="28" y1="26" x2="72" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M42,14 Q50,8 58,14 L58,26 Q50,20 42,26 Z" fill="currentColor"/>',
  pentacles:
    '<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,20 L58,44 L82,44 L63,58 L70,82 L50,68 L30,82 L37,58 L18,44 L42,44 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>',

  // ---- Court card figures ----
  page:
    '<circle cx="50" cy="22" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M32,14 L68,14 L64,28 L50,32 L36,28 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="30" x2="50" y2="60" stroke="currentColor" stroke-width="2"/><line x1="36" y1="44" x2="64" y2="44" stroke="currentColor" stroke-width="2"/><path d="M50,60 L40,80 M50,60 L60,80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  knight:
    '<ellipse cx="52" cy="68" rx="26" ry="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M32,74 L28,90 M44,78 L42,90 M62,78 L64,90 M74,72 L80,88" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M74,62 Q86,52 84,42 Q80,36 74,40 L74,62" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="48" cy="48" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M48,56 L50,66" stroke="currentColor" stroke-width="2"/><path d="M40,18 Q48,12 56,18 L53,28 L43,28 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  queen:
    '<path d="M28,12 L34,24 L42,16 L50,24 L58,16 L66,24 L72,12 L70,30 L30,30 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="40" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M38,49 L34,78 L66,78 L62,49 Z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="26" y="78" width="48" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M26,78 L20,60 M74,78 L80,60" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="16" r="3" fill="currentColor"/>',
  king:
    '<path d="M24,10 L30,22 L40,14 L50,22 L60,14 L70,22 L76,10 L74,28 L26,28 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="10" r="4" fill="currentColor"/><circle cx="50" cy="37" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M36,46 L32,76 L68,76 L64,46 Z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="24" y="76" width="52" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M24,76 L18,56 M76,76 L82,56" stroke="currentColor" stroke-width="1.5"/>',

  // ---- Major Arcana (0-XXI) ----
  fool:
    '<circle cx="72" cy="20" r="9" fill="none" stroke="currentColor" stroke-width="2"/><line x1="60" y1="28" x2="28" y2="72" stroke="currentColor" stroke-width="2"/><circle cx="58" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="60" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M32,67 L32,80 M22,71 L32,75 M32,75 L42,71 M32,80 L26,90 M32,80 L38,90" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8,92 L52,92 L62,76" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  magician:
    '<path d="M25,50 C25,38 38,38 50,50 C62,62 75,62 75,50 C75,38 62,38 50,50 C38,62 25,62 25,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="22" x2="50" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="50" cy="19" r="4" fill="currentColor"/><circle cx="50" cy="64" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="22" y="74" width="56" height="4" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30,72 L30,68 M42,72 L42,68 M58,72 L58,68 M70,72 L70,68" stroke="currentColor" stroke-width="1"/>',
  high_priestess:
    '<rect x="16" y="24" width="10" height="52" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="74" y="24" width="10" height="52" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M36,16 Q50,6 64,16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M36,12 Q32,22 36,28" fill="currentColor"/><path d="M64,12 Q68,22 64,28" fill="currentColor"/><circle cx="50" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M40,48 L38,72 L62,72 L60,48 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="43" y="52" width="14" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M26,24 Q50,32 74,24" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3"/>',
  empress:
    '<circle cx="50" cy="18" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="28" x2="50" y2="38" stroke="currentColor" stroke-width="2"/><line x1="42" y1="33" x2="58" y2="33" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="46" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M38,54 L34,80 L66,80 L62,54 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18,50 C18,40 12,34 20,28 M82,50 C82,40 88,34 80,28" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M36,10 L38,16 L36,22 L34,16 Z M64,10 L66,16 L64,22 L62,16 Z" fill="currentColor"/>',
  emperor:
    '<path d="M28,14 L34,26 L42,18 L50,26 L58,18 L66,26 L72,14 L70,30 L30,30 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M38,48 L34,74 L66,74 L62,48 Z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="26" y="74" width="48" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M26,74 L20,54 M74,74 L80,54" stroke="currentColor" stroke-width="1.5"/><path d="M22,56 C18,50 16,44 20,42 C24,38 26,44 24,50" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M78,56 C82,50 84,44 80,42 C76,38 74,44 76,50" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  hierophant:
    '<line x1="50" y1="12" x2="50" y2="82" stroke="currentColor" stroke-width="2.5"/><line x1="34" y1="26" x2="66" y2="26" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="36" x2="64" y2="36" stroke="currentColor" stroke-width="2.5"/><line x1="38" y1="46" x2="62" y2="46" stroke="currentColor" stroke-width="2.5"/><rect x="14" y="28" width="8" height="50" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="78" y="28" width="8" height="50" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M32,12 Q50,6 68,12 L64,24 L36,24 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="80" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="70" cy="80" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  lovers:
    '<circle cx="50" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M36,12 C30,6 26,14 34,18 M64,12 C70,6 74,14 66,18" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="52" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M22,59 L20,80 L42,80 L38,59 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="70" cy="52" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M62,59 L58,80 L82,80 L78,59 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M50,22 L30,58 M50,22 L70,58" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4,3"/>',
  chariot:
    '<rect x="22" y="40" width="56" height="34" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M22,40 L22,28 L78,28 L78,40" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30,28 L34,22 M50,28 L50,20 M70,28 L66,22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="50" cy="52" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="28" cy="82" rx="12" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="22" cy="78" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="72" cy="82" rx="12" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="78" cy="78" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  strength:
    '<path d="M22,44 C22,32 36,32 50,44 C64,56 78,56 78,44 C78,32 64,32 50,44 C36,56 22,56 22,44" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="50" cy="72" rx="18" ry="14" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="70" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M32,70 L38,66 M32,76 L38,76 M68,70 L62,66 M68,76 L62,76" stroke="currentColor" stroke-width="1.5"/><path d="M42,58 Q50,50 58,58" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="30" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  hermit:
    '<path d="M10,90 L50,16 L90,90 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M28,90 L50,44 L72,90" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="50" cy="22" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="30" y="34" width="8" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="34" y1="31" x2="34" y2="34" stroke="currentColor" stroke-width="1.5"/><line x1="56" y1="36" x2="64" y2="76" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  wheel:
    '<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="10" x2="50" y2="42" stroke="currentColor" stroke-width="2"/><line x1="78" y1="22" x2="62" y2="38" stroke="currentColor" stroke-width="2"/><line x1="90" y1="50" x2="58" y2="50" stroke="currentColor" stroke-width="2"/><line x1="78" y1="78" x2="62" y2="62" stroke="currentColor" stroke-width="2"/><line x1="50" y1="90" x2="50" y2="58" stroke="currentColor" stroke-width="2"/><line x1="22" y1="78" x2="38" y2="62" stroke="currentColor" stroke-width="2"/><line x1="10" y1="50" x2="42" y2="50" stroke="currentColor" stroke-width="2"/><line x1="22" y1="22" x2="38" y2="38" stroke="currentColor" stroke-width="2"/><path d="M6,6 L14,6 L10,13 Z M84,6 L92,6 L88,13 Z M6,87 L14,87 L10,94 Z M84,87 L92,87 L88,94 Z" fill="currentColor"/>',
  justice:
    '<circle cx="50" cy="30" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M42,38 L38,70 L62,70 L58,38 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="68" y1="18" x2="68" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="62" y1="26" x2="74" y2="26" stroke="currentColor" stroke-width="2"/><path d="M63,22 Q68,18 73,22 L73,26 Q68,23 63,26 Z" fill="currentColor"/><line x1="30" y1="26" x2="30" y2="46" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="32" x2="42" y2="32" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="32" x2="18" y2="42" stroke="currentColor" stroke-width="1.5"/><line x1="42" y1="32" x2="42" y2="42" stroke="currentColor" stroke-width="1.5"/><path d="M12,42 Q18,46 24,42 M36,42 Q42,46 48,42" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M36,18 L40,24 L50,20 L60,24 L64,18 L62,28 L38,28 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  hanged_man:
    '<line x1="50" y1="8" x2="50" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="22" y1="22" x2="78" y2="22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="22" y1="10" x2="22" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="78" y1="10" x2="78" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="80" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="80" r="13" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2,4"/><line x1="50" y1="71" x2="50" y2="50" stroke="currentColor" stroke-width="2"/><path d="M38,58 L62,58" stroke="currentColor" stroke-width="2"/><path d="M50,50 L64,44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  death:
    '<ellipse cx="52" cy="66" rx="24" ry="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M34,73 L30,88 M44,76 L42,90 M62,76 L64,90 M72,70 L76,86" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M72,58 Q86,50 84,42 Q80,36 72,36 Q68,36 70,44 L76,58" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="48" cy="38" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M42,44 L38,52 M54,44 L58,52 M44,52 L56,52 M42,56 L58,56" stroke="currentColor" stroke-width="1.5"/><path d="M34,28 L34,56 M34,28 L48,32 L34,36 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="42" cy="30" r="3" fill="currentColor"/>',
  temperance:
    '<path d="M24,46 C14,36 10,24 22,20 C30,16 32,28 28,40 M76,46 C86,36 90,24 78,20 C70,16 68,28 72,40" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="28" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M40,36 L36,74 L64,74 L60,36 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M44,56 L50,46 L56,56 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M26,52 L34,58 L34,70 Q28,72 26,66 Z M74,52 L66,58 L66,70 Q72,72 74,66 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M34,62 C42,52 58,52 66,62" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,2"/>',
  devil:
    '<path d="M50,16 L58,42 L80,42 L62,56 L68,80 L50,66 L32,80 L38,56 L20,42 L42,42 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40,18 C34,10 26,10 28,18 C30,24 38,22 40,18 M60,18 C66,10 74,10 72,18 C70,24 62,22 60,18" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="82" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="70" cy="82" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30,87 Q50,92 70,87" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="44" y="90" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  tower:
    '<rect x="34" y="32" width="32" height="50" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="26" y="22" width="48" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M34,22 L34,16 M42,22 L42,16 M50,22 L50,16 M58,22 L58,16 M66,22 L66,16" stroke="currentColor" stroke-width="2"/><path d="M42,12 L50,8 L58,12 L55,18 L45,18 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M78,14 L62,38 L70,38 L55,62" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><circle cx="24" cy="58" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M24,63 L20,74" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="76" cy="62" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M76,67 L80,78" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  star:
    '<path d="M50,10 L53,40 L74,24 L58,46 L88,44 L62,54 L78,76 L50,60 L22,76 L38,54 L12,44 L42,46 L26,24 L47,40 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18,16 L19,20 L22,20 L20,22 L21,26 L18,24 L15,26 L16,22 L14,20 L17,20 Z M80,16 L81,20 L84,20 L82,22 L83,26 L80,24 L77,26 L78,22 L76,20 L79,20 Z" fill="currentColor"/><path d="M18,88 Q30,82 42,88 M52,88 Q66,82 82,88" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  moon:
    '<circle cx="50" cy="22" r="16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M44,14 Q36,22 44,30" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,6 L50,2 M64,10 L67,7 M68,22 L72,22 M50,38 L50,42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="12" y="58" width="10" height="34" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="78" y="58" width="10" height="34" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12,58 L12,50 L16,46 L20,50 L22,58 M78,58 L78,50 L82,46 L86,50 L88,58" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M22,88 Q50,80 78,88" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M28,70 C24,64 22,58 26,56 C30,54 32,62 30,67 M72,70 C76,64 78,58 74,56 C70,54 68,62 70,67" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  sun:
    '<circle cx="50" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="32" r="9" fill="none" stroke="currentColor" stroke-width="1"/><line x1="50" y1="12" x2="50" y2="6" stroke="currentColor" stroke-width="2"/><line x1="62" y1="15" x2="65" y2="10" stroke="currentColor" stroke-width="2"/><line x1="70" y1="24" x2="76" y2="22" stroke="currentColor" stroke-width="2"/><line x1="70" y1="40" x2="76" y2="42" stroke="currentColor" stroke-width="2"/><line x1="62" y1="50" x2="65" y2="55" stroke="currentColor" stroke-width="2"/><line x1="38" y1="50" x2="35" y2="55" stroke="currentColor" stroke-width="2"/><line x1="30" y1="40" x2="24" y2="42" stroke="currentColor" stroke-width="2"/><line x1="30" y1="24" x2="24" y2="22" stroke="currentColor" stroke-width="2"/><line x1="38" y1="15" x2="35" y2="10" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="72" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="56" cy="80" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M38,83 L34,92 M48,86 L46,92 M64,86 L66,92 M72,80 L76,90" stroke="currentColor" stroke-width="1.5"/>',
  judgement:
    '<path d="M12,30 Q20,20 30,22 Q34,14 46,16 Q50,10 54,16 Q66,14 70,22 Q80,20 88,30" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M38,22 C32,16 28,22 36,26 M62,22 C68,16 72,22 64,26" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="30" x2="50" y2="46" stroke="currentColor" stroke-width="2"/><path d="M50,46 L58,52 Q50,56 42,52 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="28" cy="78" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="84" x2="28" y2="92" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="72" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="78" x2="50" y2="92" stroke="currentColor" stroke-width="1.5"/><circle cx="72" cy="78" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="72" y1="84" x2="72" y2="92" stroke="currentColor" stroke-width="1.5"/><path d="M22,82 L28,78 L34,82 M44,76 L50,72 L56,76 M66,82 L72,78 L78,82" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  world:
    '<ellipse cx="50" cy="50" rx="34" ry="44" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40,8 Q50,4 60,8 L58,14 Q50,10 42,14 Z M40,92 Q50,96 60,92 L58,86 Q50,90 42,86 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18,32 C14,28 16,22 20,24 M82,32 C86,28 84,22 80,24" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="40" x2="50" y2="58" stroke="currentColor" stroke-width="2"/><line x1="38" y1="47" x2="62" y2="47" stroke="currentColor" stroke-width="2"/><path d="M50,58 L42,70 M50,58 L60,68" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="38" y1="47" x2="28" y2="38" stroke="currentColor" stroke-width="1.5"/><line x1="62" y1="47" x2="72" y2="38" stroke="currentColor" stroke-width="1.5"/>'
};

// Palette helpers
const _P = {
  cups:      { bg: '#060f1f', primary: '#60a5fa', accent: '#7dd3fc' },
  wands:     { bg: '#1f0800', primary: '#f97316', accent: '#fbbf24' },
  swords:    { bg: '#141407', primary: '#eab308', accent: '#fef08a' },
  pentacles: { bg: '#051208', primary: '#4ade80', accent: '#86efac' }
};

const TAROT_CARDS = [
  // ====================== MAJOR ARCANA ======================
  { id:'major_00', name:{cn:'愚者',en:'The Fool'},         suit:'major', number:0,  rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_00.png', symbolKey:'fool',          palette:{bg:'#0a1628',primary:'#fbbf24',accent:'#38bdf8'} },
    meanings:{ upright:{ keywords:{cn:'新开始, 自由, 天真',en:'New beginnings, Freedom, Innocence'},
      desc:{cn:'愚者象征纯粹的潜能与旅程的起点，鼓励你放下恐惧，以开放的心踏入未知。',en:'The Fool embodies pure potential and new beginnings, urging you to leap into the unknown with an open heart.'}},
    reversed:{ keywords:{cn:'鲁莽, 冒进, 停滞',en:'Recklessness, Naivety, Stagnation'},
      desc:{cn:'逆位愚者警示你行动前缺乏准备，冲动或恐惧阻碍了真正的成长。',en:'Reversed, The Fool warns of acting without preparation; impulsiveness or fear of change holds you back.'}} }},

  { id:'major_01', name:{cn:'魔术师',en:'The Magician'},   suit:'major', number:1,  rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_01.png', symbolKey:'magician',      palette:{bg:'#1a0a2e',primary:'#ffd700',accent:'#dc2626'} },
    meanings:{ upright:{ keywords:{cn:'意志, 技艺, 创造力',en:'Willpower, Skill, Creation'},
      desc:{cn:'魔术师代表你已拥有实现目标所需的全部资源与能力，行动的时刻已到。',en:'The Magician signals you have all the tools and talent needed; now is the time to act with focused will.'}},
    reversed:{ keywords:{cn:'欺骗, 虚假, 能力未发挥',en:'Deception, Illusion, Untapped potential'},
      desc:{cn:'逆位魔术师暗示才能被浪费，或存在欺骗与操控的可能性。',en:'Reversed, talents are wasted or manipulation lurks; beware of deception from others or yourself.'}} }},

  { id:'major_02', name:{cn:'女祭司',en:'The High Priestess'}, suit:'major', number:2, rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_02.png', symbolKey:'high_priestess', palette:{bg:'#0f1729',primary:'#c4b5fd',accent:'#60a5fa'} },
    meanings:{ upright:{ keywords:{cn:'直觉, 神秘, 内在智慧',en:'Intuition, Mystery, Inner wisdom'},
      desc:{cn:'女祭司引领你向内探索，信任直觉，答案隐藏在你意识的深处。',en:'The High Priestess guides you inward; trust your intuition, for the answer lies within your deeper awareness.'}},
    reversed:{ keywords:{cn:'压抑直觉, 秘密, 迷失',en:'Blocked intuition, Hidden agendas, Confusion'},
      desc:{cn:'逆位女祭司暗示你忽视了内心声音，或有秘密被刻意隐瞒。',en:'Reversed, you are ignoring your inner voice or secrets are being concealed that distort your perception.'}} }},

  { id:'major_03', name:{cn:'女皇',en:'The Empress'},      suit:'major', number:3,  rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_03.png', symbolKey:'empress',       palette:{bg:'#0d1f14',primary:'#86efac',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'丰盛, 母性, 创造',en:'Abundance, Nurturing, Creation'},
      desc:{cn:'女皇象征自然的丰饶与滋养，提醒你拥抱感官之美，让创造力自由流淌。',en:'The Empress embodies nature\'s abundance; embrace sensuality, creativity, and the fertile growth all around you.'}},
    reversed:{ keywords:{cn:'依赖, 创造力受阻, 空虚',en:'Dependence, Creative block, Neglect'},
      desc:{cn:'逆位女皇暗示创造力受阻或对他人过度依赖，需重建内在的滋养感。',en:'Reversed, creative flow is blocked or you neglect yourself and others; restore nurturing to reclaim your vitality.'}} }},

  { id:'major_04', name:{cn:'皇帝',en:'The Emperor'},      suit:'major', number:4,  rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_04.png', symbolKey:'emperor',       palette:{bg:'#1f0a0a',primary:'#ef4444',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'权威, 结构, 稳定',en:'Authority, Structure, Stability'},
      desc:{cn:'皇帝代表秩序与掌控，在混乱中建立坚实基础，以理性领导和规则推动事情有序前进。',en:'The Emperor represents order and mastery; build solid foundations and lead with reason, structure, and discipline.'}},
    reversed:{ keywords:{cn:'专制, 僵化, 失控',en:'Tyranny, Rigidity, Loss of control'},
      desc:{cn:'逆位皇帝警示过度控制或软弱无力，权力的滥用正在破坏本应稳固的关系与秩序。',en:'Reversed, excessive control or weak leadership destabilizes; power is being abused or authority is collapsing.'}} }},

  { id:'major_05', name:{cn:'教皇',en:'The Hierophant'},   suit:'major', number:5,  rarity:'R',
    visual:{ image:'image/tarotI/cards/major_05.png', symbolKey:'hierophant',    palette:{bg:'#0a1229',primary:'#fbbf24',accent:'#c4b5fd'} },
    meanings:{ upright:{ keywords:{cn:'传统, 信仰, 导师',en:'Tradition, Faith, Mentorship'},
      desc:{cn:'教皇指引你遵循既定的传统与信仰体系，寻求智者的引导，在集体智慧中找到方向。',en:'The Hierophant calls you to honor tradition and seek guidance from a mentor or established belief system.'}},
    reversed:{ keywords:{cn:'叛逆, 打破教条, 个人信仰',en:'Rebellion, Dogma, Personal belief'},
      desc:{cn:'逆位教皇鼓励你质疑传统规则，挑战教条，以个人信念代替盲目服从。',en:'Reversed, you are breaking free of dogma and forging your own spiritual path outside conventional rules.'}} }},

  { id:'major_06', name:{cn:'恋人',en:'The Lovers'},       suit:'major', number:6,  rarity:'R',
    visual:{ image:'image/tarotI/cards/major_06.png', symbolKey:'lovers',        palette:{bg:'#1f0a17',primary:'#f472b6',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'爱, 和谐, 选择',en:'Love, Harmony, Choice'},
      desc:{cn:'恋人牌代表深刻的情感连结与价值观的对齐，也提醒你在重要抉择中遵从内心的真实渴望。',en:'The Lovers signifies deep connection and alignment of values; honor your heart\'s desire when making a pivotal choice.'}},
    reversed:{ keywords:{cn:'不和谐, 失衡, 错误选择',en:'Disharmony, Imbalance, Misalignment'},
      desc:{cn:'逆位恋人暗示关系中的失衡、价值观冲突，或在人生岔路口做出了违背内心的选择。',en:'Reversed, disharmony or value conflicts strain relationships; a choice made against your heart leads to regret.'}} }},

  { id:'major_07', name:{cn:'战车',en:'The Chariot'},      suit:'major', number:7,  rarity:'R',
    visual:{ image:'image/tarotI/cards/major_07.png', symbolKey:'chariot',       palette:{bg:'#0a1525',primary:'#60a5fa',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'胜利, 意志力, 前进',en:'Victory, Willpower, Forward motion'},
      desc:{cn:'战车牌代表通过坚定意志克服障碍，带着掌控感与专注力驱动自己走向胜利。',en:'The Chariot signals victory through sheer willpower; steer opposing forces with discipline and bold determination.'}},
    reversed:{ keywords:{cn:'失控, 攻击性, 方向迷失',en:'Loss of control, Aggression, Directionless'},
      desc:{cn:'逆位战车暗示你失去了对局势的掌控，内部冲突或外部阻力让你原地打转。',en:'Reversed, you have lost control of direction; inner conflict or external obstacles prevent meaningful progress.'}} }},

  { id:'major_08', name:{cn:'力量',en:'Strength'},         suit:'major', number:8,  rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_08.png', symbolKey:'strength',      palette:{bg:'#1f1207',primary:'#fb923c',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'内在力量, 勇气, 耐心',en:'Inner strength, Courage, Patience'},
      desc:{cn:'力量牌代表以温柔与耐心驯服本能冲动，内在的勇气远比蛮力更能创造真正的改变。',en:'Strength shows that gentle courage and compassion tame wild impulses more effectively than brute force ever could.'}},
    reversed:{ keywords:{cn:'软弱, 自我怀疑, 失控冲动',en:'Self-doubt, Weakness, Raw impulse'},
      desc:{cn:'逆位力量暗示内心的恐惧或自我怀疑正在压制你，冲动情绪可能将你拖离正轨。',en:'Reversed, self-doubt or raw impulse overwhelms you; reconnect with your inner reserve of quiet, steady courage.'}} }},

  { id:'major_09', name:{cn:'隐士',en:'The Hermit'},       suit:'major', number:9,  rarity:'R',
    visual:{ image:'image/tarotI/cards/major_09.png', symbolKey:'hermit',        palette:{bg:'#0d1520',primary:'#94a3b8',accent:'#c4b5fd'} },
    meanings:{ upright:{ keywords:{cn:'独处, 内省, 引导',en:'Solitude, Introspection, Guidance'},
      desc:{cn:'隐士牌鼓励你从喧嚣中退隐，在独处与沉思中寻找内在真理，并以智慧之光照亮他人。',en:'The Hermit calls for a period of solitude and soul-searching; your inner light guides both yourself and others.'}},
    reversed:{ keywords:{cn:'孤立, 固执, 拒绝帮助',en:'Isolation, Stubbornness, Refusing guidance'},
      desc:{cn:'逆位隐士暗示过度孤立或固守自封，拒绝向外寻求帮助阻碍了你的成长。',en:'Reversed, excessive isolation or refusing others\' help deepens stagnation; it is time to re-engage with the world.'}} }},

  { id:'major_10', name:{cn:'命运之轮',en:'The Wheel of Fortune'}, suit:'major', number:10, rarity:'SSR',
    visual:{ image:'image/tarotI/cards/major_10.png', symbolKey:'wheel',         palette:{bg:'#1a0a2e',primary:'#a855f7',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'命运转折, 好运, 循环',en:'Turning point, Good fortune, Cycles'},
      desc:{cn:'命运之轮代表生命的循环与命运的转折，一个重要的新篇章即将开启，顺应变化而非抗拒它。',en:'The Wheel signals a pivotal turning point; a new cycle of fortune begins — embrace change instead of resisting it.'}},
    reversed:{ keywords:{cn:'厄运, 抗拒变化, 重复错误',en:'Bad luck, Resistance, Repeating patterns'},
      desc:{cn:'逆位命运之轮暗示命运齿轮暂时不利，或你在重复同样的错误，需打破旧有模式。',en:'Reversed, fortune temporarily turns against you or old patterns repeat; break the cycle by changing your approach.'}} }},

  { id:'major_11', name:{cn:'正义',en:'Justice'},          suit:'major', number:11, rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_11.png', symbolKey:'justice',       palette:{bg:'#0f1520',primary:'#fbbf24',accent:'#6366f1'} },
    meanings:{ upright:{ keywords:{cn:'公平, 真相, 因果',en:'Fairness, Truth, Cause and effect'},
      desc:{cn:'正义牌提醒你行为必有后果，宇宙的天平终将回归平衡，此刻需诚实面对自己的选择。',en:'Justice reminds you that every action has a consequence; the cosmic scales will balance — face your choices honestly.'}},
    reversed:{ keywords:{cn:'不公平, 逃避责任, 偏见',en:'Injustice, Avoidance, Dishonesty'},
      desc:{cn:'逆位正义暗示不公的结果或你在逃避对自身行为的责任，诚实是唯一的出路。',en:'Reversed, an unjust outcome or avoidance of accountability clouds the situation; honesty is the only remedy.'}} }},

  { id:'major_12', name:{cn:'倒吊人',en:'The Hanged Man'},  suit:'major', number:12, rarity:'R',
    visual:{ image:'image/tarotI/cards/major_12.png', symbolKey:'hanged_man',    palette:{bg:'#0a1f1f',primary:'#2dd4bf',accent:'#c4b5fd'} },
    meanings:{ upright:{ keywords:{cn:'暂停, 放手, 新视角',en:'Pause, Surrender, New perspective'},
      desc:{cn:'倒吊人邀请你主动暂停，放开掌控欲，从全新角度观察处境，领悟往往在等待中降临。',en:'The Hanged Man invites you to pause and surrender; release control — enlightenment comes through this willing suspension.'}},
    reversed:{ keywords:{cn:'拖延, 抗拒牺牲, 无效停滞',en:'Stalling, Resistance, Useless delay'},
      desc:{cn:'逆位倒吊人暗示无谓的拖延或拒绝放手，不愿妥协使局势陷入徒劳的停滞。',en:'Reversed, you stall or refuse to let go; unnecessary delay prevents the breakthrough that surrender would bring.'}} }},

  { id:'major_13', name:{cn:'死神',en:'Death'},            suit:'major', number:13, rarity:'SSR',
    visual:{ image:'image/tarotI/cards/major_13.png', symbolKey:'death',         palette:{bg:'#080808',primary:'#e2e8f0',accent:'#dc2626'} },
    meanings:{ upright:{ keywords:{cn:'终结, 转化, 过渡',en:'Endings, Transformation, Transition'},
      desc:{cn:'死神牌极少意味着字面死亡，它象征一段旧时光的终结与新生命的诞生，转化是不可避免的。',en:'Death rarely means physical death; it signals the end of a chapter and the birth of something new — transformation is inevitable.'}},
    reversed:{ keywords:{cn:'抗拒改变, 无法放手, 腐朽',en:'Resistance to change, Stagnation, Decay'},
      desc:{cn:'逆位死神暗示你拒绝接受终结，死守不再有益的事物，阻止了新生命的到来。',en:'Reversed, clinging to what must end prevents renewal; accept the necessary loss so transformation can begin.'}} }},

  { id:'major_14', name:{cn:'节制',en:'Temperance'},       suit:'major', number:14, rarity:'R',
    visual:{ image:'image/tarotI/cards/major_14.png', symbolKey:'temperance',    palette:{bg:'#0a1829',primary:'#7dd3fc',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'平衡, 耐心, 调和',en:'Balance, Patience, Moderation'},
      desc:{cn:'节制牌代表优雅的调和与平衡，以耐心将对立的力量融合为一，创造持久的和谐。',en:'Temperance embodies graceful balance; blend opposing energies with patience to create lasting harmony and healing.'}},
    reversed:{ keywords:{cn:'失衡, 过度, 缺乏耐心',en:'Imbalance, Excess, Impatience'},
      desc:{cn:'逆位节制暗示生活中某个领域极度失衡，过度放纵或急于求成正在破坏平静。',en:'Reversed, excess or imbalance disrupts your peace; slow down and restore moderation before tension escalates.'}} }},

  { id:'major_15', name:{cn:'恶魔',en:'The Devil'},        suit:'major', number:15, rarity:'SSR',
    visual:{ image:'image/tarotI/cards/major_15.png', symbolKey:'devil',         palette:{bg:'#100208',primary:'#dc2626',accent:'#9f1239'} },
    meanings:{ upright:{ keywords:{cn:'束缚, 执念, 阴暗面',en:'Bondage, Obsession, Shadow self'},
      desc:{cn:'恶魔牌揭示你被物质欲望、恐惧或有害关系所束缚，但锁链其实比你想象中更容易解开。',en:'The Devil exposes bonds of addiction, fear, or unhealthy attachment; the chains that bind you are looser than they seem.'}},
    reversed:{ keywords:{cn:'解脱, 觉醒, 挣脱束缚',en:'Release, Awakening, Breaking free'},
      desc:{cn:'逆位恶魔代表你正在意识到束缚的存在并开始挣脱，觉醒带来了真正的解放。',en:'Reversed, you are awakening to your chains and beginning to break free — a powerful moment of liberation awaits.'}} }},

  { id:'major_16', name:{cn:'塔',en:'The Tower'},          suit:'major', number:16, rarity:'SSR',
    visual:{ image:'image/tarotI/cards/major_16.png', symbolKey:'tower',         palette:{bg:'#0a0a14',primary:'#f59e0b',accent:'#dc2626'} },
    meanings:{ upright:{ keywords:{cn:'突变, 混乱, 启示',en:'Sudden change, Chaos, Revelation'},
      desc:{cn:'塔牌代表建立在虚假基础上的结构被闪电击垮，震荡虽然痛苦，却为更坚实的未来清扫道路。',en:'The Tower signals sudden upheaval that shatters false structures; though painful, the destruction clears ground for truth.'}},
    reversed:{ keywords:{cn:'避免灾难, 内部震荡, 延迟崩溃',en:'Averting disaster, Internal upheaval, Delayed crisis'},
      desc:{cn:'逆位塔暗示你在内心经历着震荡，或勉强避开了一次大危机，但根本问题仍需直面。',en:'Reversed, inner upheaval or a narrowly averted crisis still demands that you confront underlying instabilities.'}} }},

  { id:'major_17', name:{cn:'星星',en:'The Star'},         suit:'major', number:17, rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_17.png', symbolKey:'star',          palette:{bg:'#060d1f',primary:'#7dd3fc',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'希望, 疗愈, 灵感',en:'Hope, Healing, Inspiration'},
      desc:{cn:'星星牌在风雨之后带来宁静与希望，提醒你宇宙的恩典始终存在，疗愈正在悄然发生。',en:'The Star brings hope and renewal after storms; trust that healing flows quietly and the universe supports your path.'}},
    reversed:{ keywords:{cn:'绝望, 失去信心, 悲观',en:'Despair, Loss of faith, Pessimism'},
      desc:{cn:'逆位星星暗示你陷入绝望或丧失了对未来的信心，需主动重建内心的希望之光。',en:'Reversed, despair or disconnection from hope dims your light; actively seek reasons to believe in renewal.'}} }},

  { id:'major_18', name:{cn:'月亮',en:'The Moon'},         suit:'major', number:18, rarity:'SSR',
    visual:{ image:'image/tarotI/cards/major_18.png', symbolKey:'moon',          palette:{bg:'#06091a',primary:'#c4b5fd',accent:'#60a5fa'} },
    meanings:{ upright:{ keywords:{cn:'幻象, 恐惧, 潜意识',en:'Illusion, Fear, Subconscious'},
      desc:{cn:'月亮牌揭示了潜意识中的恐惧与幻象，你所见的未必是真实，需在迷雾中辨别直觉与妄想。',en:'The Moon reveals subconscious fears and illusions; not all you see is real — distinguish intuition from projection.'}},
    reversed:{ keywords:{cn:'走出迷雾, 揭开真相, 恐惧消散',en:'Clarity emerging, Revealing truth, Fear dissolving'},
      desc:{cn:'逆位月亮暗示迷雾正在散去，隐藏的真相开始浮现，压抑的恐惧也逐渐被释放。',en:'Reversed, confusion lifts and hidden truths surface; suppressed fears dissolve as clarity gradually returns.'}} }},

  { id:'major_19', name:{cn:'太阳',en:'The Sun'},          suit:'major', number:19, rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_19.png', symbolKey:'sun',           palette:{bg:'#1a0f00',primary:'#fbbf24',accent:'#ef4444'} },
    meanings:{ upright:{ keywords:{cn:'喜悦, 成功, 活力',en:'Joy, Success, Vitality'},
      desc:{cn:'太阳牌是整副牌中最积极的象征之一，代表明朗、成功与充沛的生命能量，一切欣欣向荣。',en:'The Sun is one of tarot\'s most positive cards; it radiates joy, success, and vibrant life energy — all will flourish.'}},
    reversed:{ keywords:{cn:'乐观过度, 短暂障碍, 自我怀疑',en:'Excessive optimism, Temporary setbacks, Self-doubt'},
      desc:{cn:'逆位太阳暗示成功稍有延迟，或过度乐观遮蔽了现实，但阳光依然在云层背后等候。',en:'Reversed, success is temporarily clouded by doubt or setbacks; the sun still shines behind the clouds — stay the course.'}} }},

  { id:'major_20', name:{cn:'审判',en:'Judgement'},        suit:'major', number:20, rarity:'SR',
    visual:{ image:'image/tarotI/cards/major_20.png', symbolKey:'judgement',     palette:{bg:'#0a0a1a',primary:'#f0f9ff',accent:'#fbbf24'} },
    meanings:{ upright:{ keywords:{cn:'觉醒, 救赎, 内在召唤',en:'Awakening, Redemption, Inner calling'},
      desc:{cn:'审判牌代表一次深刻的觉醒时刻，生命在召唤你回应更高的使命，过去的错误可以得到救赎。',en:'Judgement marks a profound awakening; a higher calling summons you — past wrongs can be redeemed through honest reckoning.'}},
    reversed:{ keywords:{cn:'自我怀疑, 拒绝觉醒, 悔恨',en:'Self-doubt, Refusing the call, Regret'},
      desc:{cn:'逆位审判暗示你压制了内心的觉醒冲动，过去的悔恨或对未来的恐惧让你驻足不前。',en:'Reversed, self-doubt or guilt blocks the awakening; you refuse your soul\'s call and remain trapped in past regrets.'}} }},

  { id:'major_21', name:{cn:'世界',en:'The World'},        suit:'major', number:21, rarity:'SSR',
    visual:{ image:'image/tarotI/cards/major_21.png', symbolKey:'world',         palette:{bg:'#1a0a2e',primary:'#fbbf24',accent:'#a855f7'} },
    meanings:{ upright:{ keywords:{cn:'完成, 整合, 成就',en:'Completion, Integration, Achievement'},
      desc:{cn:'世界牌代表一段重要旅程的圆满终结，你已整合了所有经验，以完整的自我迎接新的开始。',en:'The World signals the glorious completion of a major cycle; you have integrated all lessons and stand whole and triumphant.'}},
    reversed:{ keywords:{cn:'未竟之事, 半途而废, 延迟完成',en:'Incomplete cycle, Shortcuts, Delayed closure'},
      desc:{cn:'逆位世界暗示某件事尚未真正完成，或你试图走捷径跳过必要的过程，完满仍需等待。',en:'Reversed, a cycle remains incomplete or you seek shortcuts; full achievement requires finishing what you began.'}} }},

  // ====================== CUPS (圣杯) ======================
  { id:'cups_01', name:{cn:'圣杯王牌',en:'Ace of Cups'},   suit:'cups', number:1,  rarity:'R',
    visual:{image:'image/tarotI/cards/cups_01.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'新感情, 情感开端, 爱的涌现',en:'New love, Emotional beginning, Overflowing heart'},
      desc:{cn:'圣杯王牌代表纯粹的情感潜能与爱的新开端，心之门洞开，愿意给予与接受。',en:'The Ace of Cups offers a new emotional beginning; open your heart fully to give and receive unconditional love.'}},
    reversed:{keywords:{cn:'情感压抑, 空虚, 拒绝爱',en:'Emotional blockage, Emptiness, Refusing love'},
      desc:{cn:'逆位暗示情感被压抑或内心空洞，拒绝接受或付出爱让关系与创意停滞。',en:'Reversed, emotions are blocked or a fear of vulnerability prevents you from accepting the love being offered.'}} }},

  { id:'cups_02', name:{cn:'圣杯二',en:'Two of Cups'},      suit:'cups', number:2,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_02.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'相互吸引, 伴侣, 联结',en:'Mutual attraction, Partnership, Union'},
      desc:{cn:'圣杯二象征两人之间的深度共鸣与相互吸引，无论是爱情还是友谊，联结在此诞生。',en:'Two of Cups speaks of deep mutual attraction and harmonious connection — a powerful bond is forming or deepening.'}},
    reversed:{keywords:{cn:'失衡, 分离, 关系破裂',en:'Imbalance, Separation, Broken connection'},
      desc:{cn:'逆位暗示关系中的失衡或沟通障碍，双方的需求与付出存在明显落差。',en:'Reversed, imbalance or miscommunication strains the relationship; needs are misaligned and tension is building.'}} }},

  { id:'cups_03', name:{cn:'圣杯三',en:'Three of Cups'},    suit:'cups', number:3,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_03.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'庆祝, 友谊, 共同喜悦',en:'Celebration, Friendship, Community joy'},
      desc:{cn:'圣杯三代表与挚友共庆的欢乐时光，情感的丰盛在共同的喜悦与支持中流淌。',en:'Three of Cups celebrates friendship, community, and shared joy; gather with loved ones and honor your victories together.'}},
    reversed:{keywords:{cn:'过度放纵, 八卦, 孤立',en:'Overindulgence, Gossip, Isolation'},
      desc:{cn:'逆位暗示庆祝变为放纵，或社交圈中出现了八卦与排斥，真诚的连结被表面喧嚣所取代。',en:'Reversed, celebration tips into excess or gossip fractures friendship; seek authentic connection over surface revelry.'}} }},

  { id:'cups_04', name:{cn:'圣杯四',en:'Four of Cups'},     suit:'cups', number:4,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_04.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'冷漠, 内省, 重新评估',en:'Apathy, Contemplation, Re-evaluation'},
      desc:{cn:'圣杯四代表你沉浸在内省之中，对眼前的机会视若无睹，可能错过宇宙正在提供的礼物。',en:'Four of Cups shows withdrawal and apathy; you are so focused inward that you may miss the opportunity being offered.'}},
    reversed:{keywords:{cn:'新灵感, 从冷漠中苏醒, 重新投入',en:'New inspiration, Emerging from apathy, Re-engagement'},
      desc:{cn:'逆位暗示你正从迷茫中走出，重新对生活与机会抱持开放的态度，活力开始回流。',en:'Reversed, you emerge from withdrawal with fresh eyes; new possibilities capture your attention and inspire re-engagement.'}} }},

  { id:'cups_05', name:{cn:'圣杯五',en:'Five of Cups'},     suit:'cups', number:5,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_05.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'失去, 悲伤, 聚焦于损失',en:'Loss, Grief, Focusing on what is lost'},
      desc:{cn:'圣杯五代表因失去而悲痛，但请记得——仍有两只圣杯立于身后，转身便能发现尚存的希望。',en:'Five of Cups speaks of grief over loss, but two cups still stand behind you; turn around and find what remains.'}},
    reversed:{keywords:{cn:'走出悲痛, 接纳失去, 前进',en:'Moving forward, Acceptance, Finding peace'},
      desc:{cn:'逆位暗示你开始走出悲伤，学着接受失去并将注意力转向仍然存在的美好。',en:'Reversed, you are processing grief and learning to accept loss; peace arrives as you redirect toward what still stands.'}} }},

  { id:'cups_06', name:{cn:'圣杯六',en:'Six of Cups'},      suit:'cups', number:6,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_06.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'怀旧, 童年, 纯真',en:'Nostalgia, Childhood, Innocence'},
      desc:{cn:'圣杯六唤起美好的过去与童真时光，旧日的情感、地方或关系可能再度出现在你的生命中。',en:'Six of Cups evokes nostalgia and innocence; the past resurfaces through reunions, old feelings, or childhood memories.'}},
    reversed:{keywords:{cn:'活在过去, 拒绝长大, 理想化',en:'Living in the past, Refusing to grow, Idealization'},
      desc:{cn:'逆位暗示你过度沉湎于过去，无法放下记忆中的理想化，阻碍了向前的脚步。',en:'Reversed, you idealize the past at the cost of the present; release nostalgia and allow yourself to grow forward.'}} }},

  { id:'cups_07', name:{cn:'圣杯七',en:'Seven of Cups'},    suit:'cups', number:7,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_07.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'幻想, 选择过多, 白日梦',en:'Illusion, Too many choices, Fantasy'},
      desc:{cn:'圣杯七代表面临纷繁的选择与诱惑，你在幻象与现实之间迷失，需以清醒的判断力做出抉择。',en:'Seven of Cups presents a dazzling array of options and fantasies; ground yourself to distinguish dreams from reality.'}},
    reversed:{keywords:{cn:'清晰, 做出决定, 专注',en:'Clarity, Making a choice, Focus'},
      desc:{cn:'逆位暗示你从迷雾与幻象中走出，开始以务实的眼光审视选项并做出真正的决定。',en:'Reversed, clarity cuts through illusion; you are ready to make a real commitment and stop drifting among fantasies.'}} }},

  { id:'cups_08', name:{cn:'圣杯八',en:'Eight of Cups'},    suit:'cups', number:8,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_08.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'放弃, 转身离开, 追寻意义',en:'Walking away, Abandonment, Seeking deeper meaning'},
      desc:{cn:'圣杯八代表主动离开那些曾经令你满足却已失去意义的事物，走向更深层的内在追寻。',en:'Eight of Cups signals a deliberate departure from what no longer fulfills; you seek deeper meaning beyond comfort.'}},
    reversed:{keywords:{cn:'恐惧离开, 放弃真正想要的, 漂泊',en:'Fear of moving on, Abandoning true desires, Drifting'},
      desc:{cn:'逆位暗示恐惧或习惯让你留在已不再滋养你的处境中，或你放弃了真正重要的事物。',en:'Reversed, fear keeps you in a draining situation or you abandon something truly valuable out of impatience.'}} }},

  { id:'cups_09', name:{cn:'圣杯九',en:'Nine of Cups'},     suit:'cups', number:9,  rarity:'N',
    visual:{image:'image/tarotI/cards/cups_09.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'满足, 愿望成真, 幸福',en:'Contentment, Wish fulfilled, Happiness'},
      desc:{cn:'圣杯九是愿望之牌，代表情感上的满足与感恩，你所渴望的正在成为现实或已然实现。',en:'Nine of Cups is the wish card; emotional satisfaction and gratitude abound as your deepest desires manifest.'}},
    reversed:{keywords:{cn:'贪婪, 不满足, 物质主义',en:'Greed, Dissatisfaction, Materialism'},
      desc:{cn:'逆位暗示即使外在条件优越，内心仍感空虚，过度的物质追求填补不了精神的匮乏。',en:'Reversed, despite outward comfort you feel hollow; excessive indulgence or ingratitude prevents true contentment.'}} }},

  { id:'cups_10', name:{cn:'圣杯十',en:'Ten of Cups'},      suit:'cups', number:10, rarity:'N',
    visual:{image:'image/tarotI/cards/cups_10.png',symbolKey:'cups',palette:_P.cups},
    meanings:{ upright:{keywords:{cn:'家庭和谐, 圆满, 幸福',en:'Family harmony, Fulfillment, Bliss'},
      desc:{cn:'圣杯十代表情感生活的圆满实现，家庭的和谐、爱的丰盛与幸福感共同构成了这张牌的核心。',en:'Ten of Cups represents emotional fulfillment at its peak — family harmony, lasting love, and deep collective happiness.'}},
    reversed:{keywords:{cn:'家庭矛盾, 幸福的幻觉, 疏离',en:'Family conflict, Broken harmony, Estrangement'},
      desc:{cn:'逆位暗示家庭中存在冲突或疏离，表面的幸福掩盖了真正需要被解决的裂痕。',en:'Reversed, conflict or estrangement fractures family harmony; surface happiness conceals deeper relational wounds.'}} }},

  { id:'cups_11', name:{cn:'圣杯侍从',en:'Page of Cups'},   suit:'cups', number:11, rarity:'R',
    visual:{image:'image/tarotI/cards/cups_11.png',symbolKey:'page',palette:{bg:'#080e1f',primary:'#93c5fd',accent:'#7dd3fc'}},
    meanings:{ upright:{keywords:{cn:'创意开端, 直觉, 情感信息',en:'Creative beginnings, Intuition, Emotional messages'},
      desc:{cn:'圣杯侍从带来充满创意与直觉的信息，鼓励你以开放的心接纳意外的灵感或情感的召唤。',en:'Page of Cups brings intuitive messages and creative sparks; stay open to unexpected inspiration and heartfelt communications.'}},
    reversed:{keywords:{cn:'情感不成熟, 幻想, 逃避现实',en:'Emotional immaturity, Fantasy, Escapism'},
      desc:{cn:'逆位暗示情感上的不成熟或沉溺于不切实际的幻想，需将直觉与理性更好地结合。',en:'Reversed, emotional immaturity or flights of fantasy cloud judgment; ground your intuition with a dose of reality.'}} }},

  { id:'cups_12', name:{cn:'圣杯骑士',en:'Knight of Cups'}, suit:'cups', number:12, rarity:'R',
    visual:{image:'image/tarotI/cards/cups_12.png',symbolKey:'knight',palette:{bg:'#080e1f',primary:'#93c5fd',accent:'#7dd3fc'}},
    meanings:{ upright:{keywords:{cn:'浪漫, 魅力, 追随内心',en:'Romance, Charm, Following the heart'},
      desc:{cn:'圣杯骑士以浪漫与魅力为驱动，带着美丽的邀约而来，鼓励你跟随心中的感召大胆前行。',en:'Knight of Cups arrives with romantic charm and creative invitations; follow your heart\'s deepest longing with courage.'}},
    reversed:{keywords:{cn:'情绪化, 嫉妒, 情感操控',en:'Moodiness, Jealousy, Emotional manipulation'},
      desc:{cn:'逆位暗示情绪不稳定或利用情感控制他人，理想化遮蔽了现实中需要付出的脚踏实地。',en:'Reversed, moodiness or emotional manipulation surface; idealism masks a reluctance to do the practical work love requires.'}} }},

  { id:'cups_13', name:{cn:'圣杯王后',en:'Queen of Cups'},  suit:'cups', number:13, rarity:'SR',
    visual:{image:'image/tarotI/cards/cups_13.png',symbolKey:'queen',palette:{bg:'#080e1f',primary:'#93c5fd',accent:'#7dd3fc'}},
    meanings:{ upright:{keywords:{cn:'慈悲, 情感安全, 共情',en:'Compassion, Emotional security, Empathy'},
      desc:{cn:'圣杯王后以深厚的慈悲与共情力滋养周围的人，她在情绪中保持平静，给予他人安全感与支持。',en:'Queen of Cups nurtures with profound empathy; she holds emotional space for others while maintaining inner calm and wisdom.'}},
    reversed:{keywords:{cn:'情感依赖, 不安全感, 情绪压制',en:'Emotional insecurity, Co-dependency, Suppressed feelings'},
      desc:{cn:'逆位暗示过度情绪化或对他人情感的过度依赖，自我的需求被长期压制或忽视。',en:'Reversed, emotional insecurity or co-dependency surfaces; your own needs are neglected beneath an over-focus on others.'}} }},

  { id:'cups_14', name:{cn:'圣杯国王',en:'King of Cups'},   suit:'cups', number:14, rarity:'SR',
    visual:{image:'image/tarotI/cards/cups_14.png',symbolKey:'king',palette:{bg:'#080e1f',primary:'#93c5fd',accent:'#7dd3fc'}},
    meanings:{ upright:{keywords:{cn:'情感成熟, 慷慨, 智慧',en:'Emotional mastery, Generosity, Wisdom'},
      desc:{cn:'圣杯国王代表情感上的成熟与平衡，他以温柔而坚定的方式领导，将慈悲与智慧融为一体。',en:'King of Cups masters his emotions with grace; he leads with compassionate authority, balancing feeling and reason.'}},
    reversed:{keywords:{cn:'情感操控, 不稳定, 压制',en:'Emotional manipulation, Volatility, Repression'},
      desc:{cn:'逆位暗示情感能量失控，以情感操控他人，或将深层情绪长期埋藏于刻意营造的平静之下。',en:'Reversed, emotional energy becomes manipulative or volatile; deep feelings are repressed beneath a controlled facade.'}} }},

  // ====================== WANDS (权杖) ======================
  { id:'wands_01', name:{cn:'权杖王牌',en:'Ace of Wands'},   suit:'wands', number:1,  rarity:'R',
    visual:{image:'image/tarotI/cards/wands_01.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'灵感, 新动力, 创意火花',en:'Inspiration, New initiative, Creative spark'},
      desc:{cn:'权杖王牌燃起灵感之火，代表一个充满潜力的新项目或激情正在等待你点燃并付诸行动。',en:'Ace of Wands ignites creative fire; a new project or passionate pursuit calls you to act with bold enthusiasm now.'}},
    reversed:{keywords:{cn:'灵感缺失, 拖延, 方向迷失',en:'Lack of direction, Delays, Creative blocks'},
      desc:{cn:'逆位暗示创意能量受阻，灵感未能转化为行动，拖延与方向的迷失消耗了内在的热情。',en:'Reversed, inspired energy stalls before it starts; delays or lack of direction prevent the creative spark from catching.'}} }},

  { id:'wands_02', name:{cn:'权杖二',en:'Two of Wands'},      suit:'wands', number:2,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_02.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'规划, 展望未来, 抉择',en:'Planning, Future vision, Bold decisions'},
      desc:{cn:'权杖二代表站在高处眺望未来的版图，你已取得初步成就，是时候制定下一阶段的宏大计划了。',en:'Two of Wands shows you surveying your domain; initial success is won and bold plans for a larger future take shape.'}},
    reversed:{keywords:{cn:'恐惧, 计划不当, 犹豫不决',en:'Fear of the unknown, Poor planning, Hesitation'},
      desc:{cn:'逆位暗示对未知的恐惧或计划的缺失让你驻足不前，视野的局限制约了更大的可能性。',en:'Reversed, fear of the unknown or lack of planning keeps you small; expand your vision before committing to a path.'}} }},

  { id:'wands_03', name:{cn:'权杖三',en:'Three of Wands'},    suit:'wands', number:3,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_03.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'扩展, 远见, 等待成果',en:'Expansion, Foresight, Awaiting results'},
      desc:{cn:'权杖三代表行动已经展开，努力的成果正在远方酝酿，此时需要耐心地等待与持续地推进。',en:'Three of Wands shows plans set in motion and results on the horizon; maintain foresight and patience as progress unfolds.'}},
    reversed:{keywords:{cn:'延迟, 障碍, 缺乏远见',en:'Delays, Obstacles, Lack of foresight'},
      desc:{cn:'逆位暗示期待中的进展受到阻碍，需重新审视计划的可行性并调整前进的策略。',en:'Reversed, expected progress stalls; revisit your plans for blind spots and adjust your strategy to overcome obstacles.'}} }},

  { id:'wands_04', name:{cn:'权杖四',en:'Four of Wands'},     suit:'wands', number:4,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_04.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'庆典, 家庭, 和谐',en:'Celebration, Home, Harmony'},
      desc:{cn:'权杖四代表里程碑的庆祝与家庭的温暖，团聚与欢庆将带来深深的满足感与归属感。',en:'Four of Wands celebrates a milestone achieved; harmony, homecoming, and joyful gatherings fill this moment with warmth.'}},
    reversed:{keywords:{cn:'不稳定, 家庭冲突, 缺乏和谐',en:'Instability, Home conflict, Lack of harmony'},
      desc:{cn:'逆位暗示家庭或团队中的不和谐，外在的庆祝掩盖了内部未解决的张力。',en:'Reversed, tension beneath a celebratory surface points to unresolved conflict at home or within a community.'}} }},

  { id:'wands_05', name:{cn:'权杖五',en:'Five of Wands'},     suit:'wands', number:5,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_05.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'竞争, 冲突, 不同意见',en:'Competition, Conflict, Disagreement'},
      desc:{cn:'权杖五代表激烈的竞争与意见分歧，虽然看似混乱，但这种碰撞也可能催生出更好的解决方案。',en:'Five of Wands depicts competitive tension and clashing views; embrace the productive friction that leads to better solutions.'}},
    reversed:{keywords:{cn:'避免冲突, 和解, 压制争论',en:'Avoiding conflict, Resolution, Suppressed tension'},
      desc:{cn:'逆位暗示表面上冲突平息，但可能是因为压制而非真正解决，或你在刻意回避必要的摩擦。',en:'Reversed, conflict is suppressed rather than resolved, or you avoid necessary friction at the cost of honest engagement.'}} }},

  { id:'wands_06', name:{cn:'权杖六',en:'Six of Wands'},      suit:'wands', number:6,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_06.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'胜利, 认可, 公众荣耀',en:'Victory, Public recognition, Success'},
      desc:{cn:'权杖六代表经过努力赢得的胜利与众人的认可，以自信的姿态接受这份来之不易的荣耀。',en:'Six of Wands celebrates hard-won victory and public recognition; accept well-earned praise with confident dignity.'}},
    reversed:{keywords:{cn:'自大, 失败, 荣耀幻灭',en:'Ego, Failure, Fall from grace'},
      desc:{cn:'逆位暗示自大或对认可的过度渴望引发了失败，曾经的荣耀可能以出人意料的方式幻灭。',en:'Reversed, ego or excessive need for validation invites downfall; a fall from grace teaches humility the hard way.'}} }},

  { id:'wands_07', name:{cn:'权杖七',en:'Seven of Wands'},    suit:'wands', number:7,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_07.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'坚守, 捍卫立场, 毅力',en:'Perseverance, Standing your ground, Tenacity'},
      desc:{cn:'权杖七代表在压力与挑战下坚守自己立场的勇气，你处于高地，以毅力捍卫所取得的成就。',en:'Seven of Wands demands you hold your ground against opposition; your elevated position is worth defending with tenacity.'}},
    reversed:{keywords:{cn:'疲惫, 放弃, 不必要的防御',en:'Exhaustion, Giving up, Unnecessary defensiveness'},
      desc:{cn:'逆位暗示长期的防御让你精疲力竭，或你在不必要的情况下固执防守，消耗了宝贵的能量。',en:'Reversed, exhaustion from constant defense drains you; question whether what you are protecting is truly worth the cost.'}} }},

  { id:'wands_08', name:{cn:'权杖八',en:'Eight of Wands'},    suit:'wands', number:8,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_08.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'迅速行动, 推进, 沟通',en:'Swift action, Movement, Communication'},
      desc:{cn:'权杖八代表事情迅速推进的能量，一切障碍扫清之后，行动与信息以惊人的速度流动。',en:'Eight of Wands signals swift movement and rapid communications; things accelerate quickly after a period of waiting.'}},
    reversed:{keywords:{cn:'延误, 挫败, 信息混乱',en:'Delays, Frustration, Scattered energy'},
      desc:{cn:'逆位暗示预期的快速推进受阻，或事情推进方向混乱，需重新整合能量再出发。',en:'Reversed, anticipated speed stalls into frustrating delays; scattered energy prevents meaningful forward momentum.'}} }},

  { id:'wands_09', name:{cn:'权杖九',en:'Nine of Wands'},     suit:'wands', number:9,  rarity:'N',
    visual:{image:'image/tarotI/cards/wands_09.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'韧性, 坚持, 接近终点',en:'Resilience, Persistence, Almost there'},
      desc:{cn:'权杖九代表虽然伤痕累累却依然坚守岗位的韧性，胜利就在最后的坚持之后。',en:'Nine of Wands speaks of battered but unbroken resilience; you are nearly at the finish — dig deep for one last stand.'}},
    reversed:{keywords:{cn:'固执, 偏执, 精疲力竭',en:'Stubbornness, Paranoia, Burnout'},
      desc:{cn:'逆位暗示过度的警惕与固执耗尽了最后的能量，需学会适时放松防线，接受帮助。',en:'Reversed, paranoia or stubbornness drains your last reserves; release excessive defensiveness and accept offered help.'}} }},

  { id:'wands_10', name:{cn:'权杖十',en:'Ten of Wands'},      suit:'wands', number:10, rarity:'N',
    visual:{image:'image/tarotI/cards/wands_10.png',symbolKey:'wands',palette:_P.wands},
    meanings:{ upright:{keywords:{cn:'重担, 责任, 超负荷',en:'Burden, Responsibility, Overextension'},
      desc:{cn:'权杖十代表背负过重的责任，你可能承担了太多，是时候学会授权与放下不必要的重量。',en:'Ten of Wands shows you overloaded with responsibility; learn to delegate and release burdens that are not truly yours.'}},
    reversed:{keywords:{cn:'放下重担, 无法授权, 崩溃',en:'Releasing burdens, Inability to delegate, Collapse'},
      desc:{cn:'逆位暗示长期超负荷运转走向崩溃，或你终于开始卸下重担，学会分担责任。',en:'Reversed, overextension leads to collapse or — more positively — you finally lay down burdens and rediscover freedom.'}} }},

  { id:'wands_11', name:{cn:'权杖侍从',en:'Page of Wands'},   suit:'wands', number:11, rarity:'R',
    visual:{image:'image/tarotI/cards/wands_11.png',symbolKey:'page',palette:{bg:'#1a0500',primary:'#fb923c',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'热情, 探索, 自由精神',en:'Enthusiasm, Exploration, Free spirit'},
      desc:{cn:'权杖侍从以无拘无束的热情探索世界，充满好奇心与冒险精神，鼓励你拥抱生命的无限可能。',en:'Page of Wands explores the world with boundless enthusiasm; embrace curiosity, adventure, and the freedom to discover.'}},
    reversed:{keywords:{cn:'冲动, 缺乏纪律, 意志不坚',en:'Impulsiveness, Lack of discipline, Scattered focus'},
      desc:{cn:'逆位暗示热情缺乏方向，冲动的行动无法转化为持续的努力，需为创意能量建立边界与结构。',en:'Reversed, enthusiasm lacks direction; impulsive starts fail to sustain — channel creative fire with structure and discipline.'}} }},

  { id:'wands_12', name:{cn:'权杖骑士',en:'Knight of Wands'}, suit:'wands', number:12, rarity:'R',
    visual:{image:'image/tarotI/cards/wands_12.png',symbolKey:'knight',palette:{bg:'#1a0500',primary:'#fb923c',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'能量, 激情, 冒险',en:'Energy, Passion, Bold adventure'},
      desc:{cn:'权杖骑士充满炽热的能量与冒险精神，以无畏的姿态迅速推进，但有时行动快于思考。',en:'Knight of Wands charges forward with passionate energy and fearless action; bold moves bring breakthroughs, if recklessness is checked.'}},
    reversed:{keywords:{cn:'鲁莽, 冲动, 能量分散',en:'Recklessness, Impulsiveness, Scattered energy'},
      desc:{cn:'逆位暗示过于冲动的行动引发了混乱，能量分散在太多方向，缺乏实质性的成果。',en:'Reversed, reckless action creates chaos or energy scatters across too many pursuits, producing little of lasting value.'}} }},

  { id:'wands_13', name:{cn:'权杖王后',en:'Queen of Wands'},  suit:'wands', number:13, rarity:'R',
    visual:{image:'image/tarotI/cards/wands_13.png',symbolKey:'queen',palette:{bg:'#1a0500',primary:'#fb923c',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'勇气, 自信, 独立',en:'Courage, Confidence, Independence'},
      desc:{cn:'权杖王后以自信与热情点燃身边的人，她的独立与坚定让她成为自然的领导者与鼓舞人心的力量。',en:'Queen of Wands radiates bold confidence and charisma; her independence and passion inspire everyone in her presence.'}},
    reversed:{keywords:{cn:'控制欲, 嫉妒, 精力耗尽',en:'Controlling, Jealousy, Burnout'},
      desc:{cn:'逆位暗示权杖王后的热情转为控制与嫉妒，或长期燃烧的激情终于走向精力耗竭。',en:'Reversed, bold energy curdles into jealousy or domination; passion burnout leads to exhaustion and a loss of creative spark.'}} }},

  { id:'wands_14', name:{cn:'权杖国王',en:'King of Wands'},   suit:'wands', number:14, rarity:'SR',
    visual:{image:'image/tarotI/cards/wands_14.png',symbolKey:'king',palette:{bg:'#1a0500',primary:'#fb923c',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'领导力, 远见, 荣耀',en:'Natural leader, Vision, Honour'},
      desc:{cn:'权杖国王是天生的领袖，以远见与热情引领众人，他将创意转化为宏伟的行动，以个人魅力感召团队。',en:'King of Wands is a visionary leader who transforms ideas into bold action and inspires others with natural charisma.'}},
    reversed:{keywords:{cn:'暴君, 自大, 冲动决策',en:'Tyranny, Arrogance, Impulsive decisions'},
      desc:{cn:'逆位暗示领导力走向独断与傲慢，冲动的决定将他人的需求置于自我意志之下。',en:'Reversed, the king\'s fire becomes domineering; arrogance and impulsive decisions alienate those he should be leading.'}} }},

  // ====================== SWORDS (宝剑) ======================
  { id:'swords_01', name:{cn:'宝剑王牌',en:'Ace of Swords'},   suit:'swords', number:1,  rarity:'R',
    visual:{image:'image/tarotI/cards/swords_01.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'突破, 清晰, 真相',en:'Breakthrough, Clarity, Truth'},
      desc:{cn:'宝剑王牌以锋利的刀刃切割迷雾，带来思维的突破与真相的浮现，是以智慧开创新局的时刻。',en:'Ace of Swords cuts through confusion with mental clarity; a breakthrough in thought or a revelation of truth arrives now.'}},
    reversed:{keywords:{cn:'混乱, 判断模糊, 谎言',en:'Confusion, Clouded judgment, Misinformation'},
      desc:{cn:'逆位暗示思维陷入混乱或被错误信息所蒙蔽，在关键决策前需更细致地核实事实。',en:'Reversed, mental clarity is clouded by confusion or misinformation; verify facts carefully before drawing conclusions.'}} }},

  { id:'swords_02', name:{cn:'宝剑二',en:'Two of Swords'},      suit:'swords', number:2,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_02.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'僵局, 难以抉择, 封锁信息',en:'Stalemate, Difficult decision, Blocked information'},
      desc:{cn:'宝剑二代表你处于两难的僵局之中，不愿面对现实让你蒙上双眼，回避无法真正解决问题。',en:'Two of Swords depicts a painful standoff; you blindfold yourself against an uncomfortable truth — a decision cannot be avoided.'}},
    reversed:{keywords:{cn:'信息浮现, 做出选择, 解除僵局',en:'Information revealed, Choosing sides, Stalemate broken'},
      desc:{cn:'逆位暗示僵局开始松动，隐藏的信息浮出水面，帮助你做出长期回避的艰难选择。',en:'Reversed, hidden information surfaces and breaks the deadlock; a difficult choice becomes possible as the truth emerges.'}} }},

  { id:'swords_03', name:{cn:'宝剑三',en:'Three of Swords'},    suit:'swords', number:3,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_03.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'心碎, 悲痛, 背叛',en:'Heartbreak, Grief, Betrayal'},
      desc:{cn:'宝剑三代表刺穿心脏的真相与痛苦，心碎与悲伤是无法回避的现实，但承认痛苦才是疗愈的开始。',en:'Three of Swords speaks of heartbreak piercing deep; acknowledge the grief — only by accepting pain can healing truly begin.'}},
    reversed:{keywords:{cn:'从悲痛中恢复, 原谅, 前行',en:'Recovery, Forgiveness, Moving forward'},
      desc:{cn:'逆位暗示你正从心碎中慢慢愈合，学着原谅并将沉重的悲痛转化为成长的养分。',en:'Reversed, healing begins as you process grief; forgiveness — of others or yourself — allows the heart to recover and grow.'}} }},

  { id:'swords_04', name:{cn:'宝剑四',en:'Four of Swords'},     suit:'swords', number:4,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_04.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'休养, 静思, 暂停',en:'Rest, Recovery, Contemplation'},
      desc:{cn:'宝剑四代表在激烈的挣扎之后选择暂停与休息，这段沉静的时光是为下一次出征积蓄能量。',en:'Four of Swords calls for deliberate rest after struggle; this quiet retreat restores the strength needed for what comes next.'}},
    reversed:{keywords:{cn:'焦躁, 无法休息, 精力耗尽',en:'Restlessness, Inability to rest, Burnout'},
      desc:{cn:'逆位暗示身体与精神都迫切需要休息，却无法停下来，长期运转的结果可能是彻底的崩溃。',en:'Reversed, you cannot permit yourself to rest despite desperate need; forcing yourself to keep going risks complete burnout.'}} }},

  { id:'swords_05', name:{cn:'宝剑五',en:'Five of Swords'},     suit:'swords', number:5,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_05.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'冲突, 不择手段, 失败',en:'Conflict, Win at all costs, Defeat'},
      desc:{cn:'宝剑五警示以任何代价赢得胜利的代价——真正的赢家是否真的赢了？有些胜利不值得付出的代价。',en:'Five of Swords warns: some victories cost more than they are worth; winning at all costs alienates and ultimately diminishes you.'}},
    reversed:{keywords:{cn:'和解, 重建, 从冲突中走出',en:'Reconciliation, Moving past conflict, Resolution'},
      desc:{cn:'逆位暗示冲突开始化解，双方愿意放下芥蒂、重建关系，或你终于走出了伤人的竞争模式。',en:'Reversed, the conflict winds down and reconciliation becomes possible; moving past resentment restores relationship and peace.'}} }},

  { id:'swords_06', name:{cn:'宝剑六',en:'Six of Swords'},      suit:'swords', number:6,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_06.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'过渡, 离开困境, 前行',en:'Transition, Moving on, Rite of passage'},
      desc:{cn:'宝剑六代表艰难中的前行——驶离风暴走向平静水域，虽有伤痕，却正迈向更安全的彼岸。',en:'Six of Swords moves through rough waters toward calmer shores; transition is difficult but each stroke brings you closer to peace.'}},
    reversed:{keywords:{cn:'抗拒改变, 未解决的问题, 反复',en:'Resistance to change, Unresolved issues, Setbacks'},
      desc:{cn:'逆位暗示你在努力离开困境时遭遇阻碍，或旧有的问题将你拉回，过渡尚未完成。',en:'Reversed, resistance or unresolved baggage slows the transition; old wounds pull you back before you can reach calmer waters.'}} }},

  { id:'swords_07', name:{cn:'宝剑七',en:'Seven of Swords'},    suit:'swords', number:7,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_07.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'欺骗, 策略, 独自行动',en:'Deception, Strategy, Acting alone'},
      desc:{cn:'宝剑七代表隐蔽的行动与策略性的欺骗，你是在独立谋划还是在被人蒙骗——需仔细辨别。',en:'Seven of Swords depicts stealth and cunning; examine whether you are the deceiver or the deceived in your current situation.'}},
    reversed:{keywords:{cn:'事迹败露, 坦白, 责任',en:'Exposure, Coming clean, Avoiding responsibility'},
      desc:{cn:'逆位暗示隐藏的行动或谎言即将曝光，主动承认错误将比被揭穿更能保全尊严。',en:'Reversed, deception is exposed or you choose to come clean; honesty now, however difficult, saves face and integrity.'}} }},

  { id:'swords_08', name:{cn:'宝剑八',en:'Eight of Swords'},    suit:'swords', number:8,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_08.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'自我限制, 困境, 受害心态',en:'Self-restriction, Imprisonment, Victim mentality'},
      desc:{cn:'宝剑八代表你被负面思维与自我设置的枷锁所困，但绑缚并不如你想象中牢固——解脱的钥匙在你自己手中。',en:'Eight of Swords shows self-imposed imprisonment; the bindings are looser than they seem — your thoughts are the real cage.'}},
    reversed:{keywords:{cn:'解放, 新视角, 突破限制',en:'Freedom, New perspective, Breaking free'},
      desc:{cn:'逆位暗示你开始从负面思维的牢笼中走出，新的视角让你看见了一直存在却未曾注意的出口。',en:'Reversed, a shift in perspective reveals the way out; mental limitations dissolve as you reclaim agency and take a first step.'}} }},

  { id:'swords_09', name:{cn:'宝剑九',en:'Nine of Swords'},     suit:'swords', number:9,  rarity:'N',
    visual:{image:'image/tarotI/cards/swords_09.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'焦虑, 恐惧, 夜间噩梦',en:'Anxiety, Fear, Nightmares'},
      desc:{cn:'宝剑九代表夜间滋长的焦虑与恐惧，大多数担忧在黑暗中被放大，黎明到来时往往不那么可怕。',en:'Nine of Swords embodies sleepless anxiety; most fears are amplified in darkness — daylight and support will reduce their power.'}},
    reversed:{keywords:{cn:'从焦虑中走出, 希望重现, 寻求帮助',en:'Recovery from anxiety, Hope returning, Seeking help'},
      desc:{cn:'逆位暗示你正从焦虑与噩梦中走出，勇于承认脆弱并寻求帮助，是疗愈的重要一步。',en:'Reversed, the worst-case scenarios in your mind begin to release; seeking help or sharing your fears starts the healing.'}} }},

  { id:'swords_10', name:{cn:'宝剑十',en:'Ten of Swords'},      suit:'swords', number:10, rarity:'N',
    visual:{image:'image/tarotI/cards/swords_10.png',symbolKey:'swords',palette:_P.swords},
    meanings:{ upright:{keywords:{cn:'痛苦的终结, 背叛, 失败',en:'Painful ending, Betrayal, Rock bottom'},
      desc:{cn:'宝剑十代表最痛苦的终结，但请记得——最黑暗的夜晚之后，黎明必然到来，结束也是新生的前提。',en:'Ten of Swords marks a painful finality; but dawn follows the darkest hour — this rock-bottom moment clears the way for renewal.'}},
    reversed:{keywords:{cn:'从谷底恢复, 抗拒终结, 延续痛苦',en:'Recovery from rock bottom, Resisting ending, Lingering pain'},
      desc:{cn:'逆位暗示你正从最低谷缓缓爬起，也可能你在拒绝接受一个早已注定的结局，从而延长了痛苦。',en:'Reversed, slow recovery begins from a painful nadir, or resistance to an inevitable ending prolongs unnecessary suffering.'}} }},

  { id:'swords_11', name:{cn:'宝剑侍从',en:'Page of Swords'},   suit:'swords', number:11, rarity:'R',
    visual:{image:'image/tarotI/cards/swords_11.png',symbolKey:'page',palette:{bg:'#100e00',primary:'#fde047',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'好奇, 求真, 直言不讳',en:'Curiosity, Truth-seeking, Direct communication'},
      desc:{cn:'宝剑侍从以敏锐的好奇心探索真相，他的思维迅捷，直言不讳，善于收集信息并发现隐藏的真相。',en:'Page of Swords gathers information with sharp curiosity and speaks truth directly; alertness and quick thinking serve you now.'}},
    reversed:{keywords:{cn:'谎言, 流言, 信息操控',en:'Deception, Gossip, Manipulation of information'},
      desc:{cn:'逆位暗示言语被用来伤害而非探求真相，流言或刻意的信息操控正在扭曲真实的情况。',en:'Reversed, words wound rather than illuminate; gossip or manipulation of information creates a distorted picture of reality.'}} }},

  { id:'swords_12', name:{cn:'宝剑骑士',en:'Knight of Swords'}, suit:'swords', number:12, rarity:'R',
    visual:{image:'image/tarotI/cards/swords_12.png',symbolKey:'knight',palette:{bg:'#100e00',primary:'#fde047',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'雄心, 直接行动, 果断',en:'Ambition, Direct action, Decisiveness'},
      desc:{cn:'宝剑骑士以惊人的速度与决心冲向目标，他的直接与雄心令人叹服，但有时过于草率而忽略了全局。',en:'Knight of Swords charges toward goals with unstoppable ambition and speed; decisive action cuts through obstacles but watch for rashness.'}},
    reversed:{keywords:{cn:'鲁莽, 傲慢, 破坏性行动',en:'Recklessness, Arrogance, Destructive impulse'},
      desc:{cn:'逆位暗示行动过于鲁莽或言语过于刻薄，伤害了应当合作的人，傲慢阻碍了真正的前进。',en:'Reversed, reckless words or actions damage important alliances; unchecked aggression and arrogance become self-defeating.'}} }},

  { id:'swords_13', name:{cn:'宝剑王后',en:'Queen of Swords'},  suit:'swords', number:13, rarity:'SR',
    visual:{image:'image/tarotI/cards/swords_13.png',symbolKey:'queen',palette:{bg:'#100e00',primary:'#fde047',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'独立, 清醒, 直率',en:'Independence, Clarity of mind, Directness'},
      desc:{cn:'宝剑王后以清晰的思维与独立的判断力直面现实，她以同情心聆听，却不让情绪左右她的决断。',en:'Queen of Swords perceives truth without illusion and communicates it directly; her compassion is real but never clouds her judgment.'}},
    reversed:{keywords:{cn:'冷酷, 刻薄, 脱离情感',en:'Cold, Bitter, Emotionally detached'},
      desc:{cn:'逆位暗示宝剑王后的清晰走向冷酷，过往的伤痛使她变得刻薄，情感的隔绝阻碍了真正的连结。',en:'Reversed, past wounds harden into coldness or bitterness; emotional detachment masquerades as strength but isolates.'}} }},

  { id:'swords_14', name:{cn:'宝剑国王',en:'King of Swords'},   suit:'swords', number:14, rarity:'SR',
    visual:{image:'image/tarotI/cards/swords_14.png',symbolKey:'king',palette:{bg:'#100e00',primary:'#fde047',accent:'#fbbf24'}},
    meanings:{ upright:{keywords:{cn:'理性权威, 清醒判断, 道德',en:'Intellectual authority, Clear judgment, Ethics'},
      desc:{cn:'宝剑国王以卓越的智慧与道德权威统御全局，他的判断公正而清醒，以理性与原则引领他人。',en:'King of Swords wields intellectual authority with integrity; his clear, ethical judgment cuts to the heart of any complex matter.'}},
    reversed:{keywords:{cn:'权力滥用, 专制, 冷漠',en:'Abuse of power, Tyranny, Cold detachment'},
      desc:{cn:'逆位暗示智识权威滑向专制，清醒的判断被用于操控而非服务，冷酷的权力压制了人性。',en:'Reversed, intellectual power becomes tyranny; cold detachment serves self-interest rather than justice, abusing authority.'}} }},

  // ====================== PENTACLES (星币) ======================
  { id:'pentacles_01', name:{cn:'星币王牌',en:'Ace of Pentacles'},   suit:'pentacles', number:1,  rarity:'R',
    visual:{image:'image/tarotI/cards/pentacles_01.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'新财富机遇, 物质潜能, 繁荣',en:'New financial opportunity, Material potential, Prosperity'},
      desc:{cn:'星币王牌带来新的财务机遇或物质上的新起点，种下这颗种子，以脚踏实地的行动让它生根发芽。',en:'Ace of Pentacles offers a new material opportunity; plant this seed carefully and nurture it with practical steady action.'}},
    reversed:{keywords:{cn:'错失机遇, 计划不善, 物质担忧',en:'Missed opportunity, Poor planning, Financial worry'},
      desc:{cn:'逆位暗示物质机遇因准备不足或过于贪婪而溜走，需重新审视财务规划与实际可行性。',en:'Reversed, a material opportunity slips away through poor planning or greed; reassess your financial strategy and priorities.'}} }},

  { id:'pentacles_02', name:{cn:'星币二',en:'Two of Pentacles'},      suit:'pentacles', number:2,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_02.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'平衡, 适应性, 时间管理',en:'Balance, Adaptability, Time management'},
      desc:{cn:'星币二代表在多重责任间保持灵活的平衡，生活需要杂耍式的协调，但你有能力游刃有余地应对。',en:'Two of Pentacles calls for flexible juggling of priorities; adapt gracefully to shifting demands and keep all balls in the air.'}},
    reversed:{keywords:{cn:'失衡, 财务混乱, 过度承诺',en:'Imbalance, Financial disorganization, Overcommitment'},
      desc:{cn:'逆位暗示生活中各事务失去平衡，财务混乱或过多承诺导致整体失控，需及时减负整顿。',en:'Reversed, imbalance tips into chaos; overcommitment or financial disorganization demands immediate triage and simplification.'}} }},

  { id:'pentacles_03', name:{cn:'星币三',en:'Three of Pentacles'},    suit:'pentacles', number:3,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_03.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'合作, 技艺, 共同成就',en:'Teamwork, Craftsmanship, Collaboration'},
      desc:{cn:'星币三代表技艺精湛的团队协作，每个成员都贡献独特价值，共同打造出超越个人能力的杰作。',en:'Three of Pentacles celebrates skilled collaboration; each person\'s unique contribution elevates the work beyond what any could achieve alone.'}},
    reversed:{keywords:{cn:'缺乏团队合作, 质量不佳, 冲突',en:'Lack of teamwork, Poor quality, Conflict'},
      desc:{cn:'逆位暗示团队协作破裂，各自为政的态度影响了工作质量，共同目标被个人摩擦所遮蔽。',en:'Reversed, poor teamwork or competing egos undermine quality; everyone pulls in different directions and the work suffers.'}} }},

  { id:'pentacles_04', name:{cn:'星币四',en:'Four of Pentacles'},     suit:'pentacles', number:4,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_04.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'稳定, 安全感, 控制',en:'Security, Stability, Control'},
      desc:{cn:'星币四代表对安全感与财务稳定的追求，但过于紧握可能阻碍了真正的丰盛与流动。',en:'Four of Pentacles values security and control; examine whether holding tight to resources blocks the flow of greater abundance.'}},
    reversed:{keywords:{cn:'吝啬, 物质执念, 恐惧失去',en:'Greed, Possessiveness, Fear of loss'},
      desc:{cn:'逆位暗示对财物或控制权的过度执着，吝啬与恐惧失去的心理正在影响你与他人的关系。',en:'Reversed, possessiveness or stinginess stems from deep fear of loss; generosity would invite the abundance you hoard against.'}} }},

  { id:'pentacles_05', name:{cn:'星币五',en:'Five of Pentacles'},     suit:'pentacles', number:5,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_05.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'财务困难, 孤立, 匮乏感',en:'Financial hardship, Isolation, Poverty mindset'},
      desc:{cn:'星币五代表物质上的困难与情感上的孤立，即便如此，援助近在眼前——只需抬眼，推开那扇门。',en:'Five of Pentacles speaks of hardship and feeling left out in the cold; help is closer than you think — look up and seek it.'}},
    reversed:{keywords:{cn:'从困难中恢复, 接受帮助, 改善',en:'Recovery from hardship, Accepting help, Improvement'},
      desc:{cn:'逆位暗示财务或情感处境开始好转，你愿意放下骄傲，接受他人的援助，走出匮乏的困境。',en:'Reversed, conditions begin to improve as you allow yourself to receive help; a poverty mindset gradually releases its hold.'}} }},

  { id:'pentacles_06', name:{cn:'星币六',en:'Six of Pentacles'},      suit:'pentacles', number:6,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_06.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'慷慨, 给予与接受, 公平',en:'Generosity, Giving and receiving, Fairness'},
      desc:{cn:'星币六代表财富的合理流动与慷慨的给予，当你处于能够给予的位置时，记得以公平与尊重分享资源。',en:'Six of Pentacles calls for generous sharing of resources; give freely when you have plenty and receive graciously when you need.'}},
    reversed:{keywords:{cn:'债务, 贪婪, 权力失衡',en:'Debt, Greed, Power imbalance'},
      desc:{cn:'逆位暗示给予与接受之间的失衡，或慷慨背后隐藏着控制与期待回报的动机。',en:'Reversed, generosity masks control, or strings are attached to gifts; examine power dynamics in your giving and receiving.'}} }},

  { id:'pentacles_07', name:{cn:'星币七',en:'Seven of Pentacles'},    suit:'pentacles', number:7,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_07.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'评估, 耐心, 等待成果',en:'Assessment, Patience, Waiting for results'},
      desc:{cn:'星币七代表在付出大量努力之后停下来评估成果，耐心是此刻的美德，播种之后需给予时间发芽。',en:'Seven of Pentacles shows you pausing to assess progress after sustained effort; patience is now the most productive action.'}},
    reversed:{keywords:{cn:'不耐烦, 懒惰, 投资失败',en:'Impatience, Laziness, Poor return on investment'},
      desc:{cn:'逆位暗示对结果的不耐烦或投入与产出之间的严重失衡，需重新评估努力的方向。',en:'Reversed, impatience or misdirected effort yields poor returns; reassess where you invest your energy for better outcomes.'}} }},

  { id:'pentacles_08', name:{cn:'星币八',en:'Eight of Pentacles'},    suit:'pentacles', number:8,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_08.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'勤奋, 精进, 工匠精神',en:'Diligence, Mastery, Craftsmanship'},
      desc:{cn:'星币八代表心无旁骛的专注与持续精进的工匠精神，通过重复与磨砺将技艺提炼为真正的精通。',en:'Eight of Pentacles celebrates dedicated practice and mastery; diligent, focused work day by day builds true expertise.'}},
    reversed:{keywords:{cn:'完美主义, 枯燥重复, 缺乏专注',en:'Perfectionism, Drudgery, Lack of focus'},
      desc:{cn:'逆位暗示工作变成毫无意义的重复，或完美主义的执念阻碍了真正的进步与完成。',en:'Reversed, work becomes meaningless drudgery or perfectionism blocks completion; reconnect with the purpose behind the effort.'}} }},

  { id:'pentacles_09', name:{cn:'星币九',en:'Nine of Pentacles'},     suit:'pentacles', number:9,  rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_09.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'富足, 自给自足, 独立',en:'Abundance, Self-sufficiency, Independence'},
      desc:{cn:'星币九代表通过自身努力实现的物质丰盛与独立，你有资格享受这份来之不易的奢华与自由。',en:'Nine of Pentacles celebrates earned independence and luxurious self-sufficiency; enjoy the abundance your hard work has cultivated.'}},
    reversed:{keywords:{cn:'过度劳累, 依赖, 错误的富足',en:'Overwork, Dependency, False prosperity'},
      desc:{cn:'逆位暗示表面上的富足掩盖了内在的不安全感，或过度工作让你失去了享受生活的能力。',en:'Reversed, apparent wealth hides insecurity or overwork prevents you from enjoying what you have worked so hard to attain.'}} }},

  { id:'pentacles_10', name:{cn:'星币十',en:'Ten of Pentacles'},      suit:'pentacles', number:10, rarity:'N',
    visual:{image:'image/tarotI/cards/pentacles_10.png',symbolKey:'pentacles',palette:_P.pentacles},
    meanings:{ upright:{keywords:{cn:'财富传承, 家族遗产, 长期安全',en:'Wealth, Legacy, Long-term security'},
      desc:{cn:'星币十代表世代传承的繁荣与安稳，不仅是物质财富，更是家族凝聚力与延续下去的价值观。',en:'Ten of Pentacles represents enduring wealth and family legacy; the security you build now creates a foundation for generations.'}},
    reversed:{keywords:{cn:'家庭纷争, 财富问题, 遗产争议',en:'Family conflict, Financial failure, Broken legacy'},
      desc:{cn:'逆位暗示家族之间的纷争或财务问题，动摇了本应稳固的安全基础，遗产可能引发争议。',en:'Reversed, family disputes or financial instability erode the legacy; conflict over inheritance or values fractures the foundation.'}} }},

  { id:'pentacles_11', name:{cn:'星币侍从',en:'Page of Pentacles'},   suit:'pentacles', number:11, rarity:'R',
    visual:{image:'image/tarotI/cards/pentacles_11.png',symbolKey:'page',palette:{bg:'#030f08',primary:'#34d399',accent:'#86efac'}},
    meanings:{ upright:{keywords:{cn:'学习, 勤奋, 新的实际机遇',en:'Diligent study, Practical opportunity, Groundedness'},
      desc:{cn:'星币侍从以专注与勤勉投入学习与实际技能的培养，机遇出现在脚踏实地、认真对待细节的过程中。',en:'Page of Pentacles pursues learning with earnest diligence; practical opportunity rewards those who show up consistently and attentively.'}},
    reversed:{keywords:{cn:'缺乏方向, 拖延, 不切实际',en:'Lack of direction, Procrastination, Impracticality'},
      desc:{cn:'逆位暗示机遇因拖延或缺乏实际规划而流失，空有理想却无法落地的状态需要改变。',en:'Reversed, procrastination or impractical dreaming squanders opportunity; bring ideals down to earth with concrete first steps.'}} }},

  { id:'pentacles_12', name:{cn:'星币骑士',en:'Knight of Pentacles'}, suit:'pentacles', number:12, rarity:'R',
    visual:{image:'image/tarotI/cards/pentacles_12.png',symbolKey:'knight',palette:{bg:'#030f08',primary:'#34d399',accent:'#86efac'}},
    meanings:{ upright:{keywords:{cn:'勤劳, 可靠, 方法论',en:'Hard work, Reliability, Methodical progress'},
      desc:{cn:'星币骑士以缓慢而稳定的节奏迈向目标，他的可靠与坚持是成功最可靠的保证，无须华丽只要踏实。',en:'Knight of Pentacles moves toward goals with slow, reliable, methodical effort; steady consistency achieves what brilliance cannot sustain.'}},
    reversed:{keywords:{cn:'懒惰, 停滞, 固执',en:'Laziness, Stagnation, Stubbornness'},
      desc:{cn:'逆位暗示稳健变成停滞，懒惰或对变化的固执抵抗阻碍了本可取得的扎实进步。',en:'Reversed, methodical reliability tips into stubborn stagnation; laziness or resistance to necessary change blocks real progress.'}} }},

  { id:'pentacles_13', name:{cn:'星币王后',en:'Queen of Pentacles'},  suit:'pentacles', number:13, rarity:'R',
    visual:{image:'image/tarotI/cards/pentacles_13.png',symbolKey:'queen',palette:{bg:'#030f08',primary:'#34d399',accent:'#86efac'}},
    meanings:{ upright:{keywords:{cn:'务实, 脚踏实地, 滋养',en:'Practical, Grounded, Nurturing'},
      desc:{cn:'星币王后以务实的关怀滋养自己与身边的人，她精于打理生活与财务，在物质与情感之间创造真正的富足。',en:'Queen of Pentacles nurtures with practical warmth; she tends both material resources and emotional needs with grounded, abundant care.'}},
    reversed:{keywords:{cn:'忽视自我, 过度物质主义, 不安全感',en:'Self-neglect, Materialism, Insecurity'},
      desc:{cn:'逆位暗示对物质的过度执着或对自我的忽视，失去了在实际与情感之间的内在平衡。',en:'Reversed, material obsession or self-neglect disrupts nurturing balance; security feels elusive despite outward provision.'}} }},

  { id:'pentacles_14', name:{cn:'星币国王',en:'King of Pentacles'},   suit:'pentacles', number:14, rarity:'SR',
    visual:{image:'image/tarotI/cards/pentacles_14.png',symbolKey:'king',palette:{bg:'#030f08',primary:'#34d399',accent:'#86efac'}},
    meanings:{ upright:{keywords:{cn:'财富, 领导力, 纪律',en:'Wealth, Leadership, Discipline'},
      desc:{cn:'星币国王是物质世界的主宰，以智慧与纪律构建长久的繁荣，他的慷慨源于真正的丰盛而非炫耀。',en:'King of Pentacles has mastered the material world through discipline and wisdom; his abundance is real, stable, and generously shared.'}},
    reversed:{keywords:{cn:'贪婪, 物质主义, 腐败',en:'Greed, Materialism, Corruption'},
      desc:{cn:'逆位暗示物质的成功腐蚀了内在的价值观，贪婪与对金钱的过度执着损害了真正的繁荣与人际关系。',en:'Reversed, success corrupts as greed and obsessive materialism erode the values that made abundance meaningful and lasting.'}} }}
];
