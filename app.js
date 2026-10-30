(() => {
  'use strict';
  const STORAGE_KEY = 'freshkeep-last-selection-v1';
  const state = { produce: 'Tomatoes', baskets: 8, price: 5000, location: 'Epe', language: 'PIDGIN' };
  const locale = {
    EN: {
      locationLead: 'Your area', eyebrow: 'HARVEST SAVINGS CALCULATOR', pageTitle: 'Make your harvest last longer.', pageIntro: 'See how much a simple clay cooler can help you keep.', offlineReady: 'Works offline',
      produceQuestion: 'What did you harvest today?', quantityQuestion: 'How many baskets?', basketsLabel: 'baskets', priceQuestion: 'Price per basket?', resultsTitle: 'Your harvest savings', withoutCooler: 'Without cooler', lossDays: 'Spoils in 2 days', lossCaption: 'You could lose about', estimatedLoss: 'estimated loss', withCooler: 'With ₦35k clay cooler', freshDays: 'Fresh for 5 days', youSave: 'You could save', perHarvest: 'per harvest', seasonLabel: 'For 8 harvests, you save', payback: 'Cooler pays for itself in 1 week.', timerTitle: 'Freshness over 7 days', noCoolerLegend: 'No cooler', clayCoolerLegend: 'Clay cooler', daysShort: 'days', simpleTag: 'SIMPLE. LOCAL. FRESH.', howTitle: 'How it works', trustOne: 'No light needed', trustTwo: 'Made with clay + sand + water', trustThree: 'Built in 1 day by a local mason', coolerLabel: 'THE CLAY COOLER', coolerCopy: 'A cool, simple home for your harvest.', ctaPrompt: 'Ready to keep more of your harvest?', whatsappCta: 'Get Building Guide on WhatsApp', shareCta: 'Share My Savings as Picture', footerText: 'FreshKeep Lagos · Fresh harvest, more naira.',
      wa: (s, loss, saved, season) => `Hello FreshKeep! Please send me the clay cooler building guide. I am in ${s.location}. I harvested ${s.baskets} baskets of ${s.produce} at ₦${fmt(s.price)} per basket. Estimated loss without cooler: ₦${fmt(loss)}; estimated savings with cooler: ₦${fmt(saved)} per harvest (₦${fmt(season)} for 8 harvests).`, shareReady: 'Your savings picture is ready.'
    },
    PIDGIN: {
      locationLead: 'Your area', eyebrow: 'HARVEST SAVINGS CALCULATOR', pageTitle: 'Make your harvest last longer.', pageIntro: 'See how much a simple clay cooler fit help you keep.', offlineReady: 'Works offline',
      produceQuestion: 'Wetin you harvest today?', quantityQuestion: 'How many baskets?', basketsLabel: 'baskets', priceQuestion: 'Price per basket?', resultsTitle: 'Your harvest savings', withoutCooler: 'Without Cooler', lossDays: 'Spoils in 2 days', lossCaption: 'You go lose about', estimatedLoss: 'estimated loss', withCooler: 'With ₦35k Clay Cooler', freshDays: 'Fresh for 5 days', youSave: 'You go save', perHarvest: 'per harvest', seasonLabel: 'For 8 harvests, na', payback: 'you go save. Cooler pays for itself in 1 week.', timerTitle: 'Freshness over 7 days', noCoolerLegend: 'No cooler', clayCoolerLegend: 'Clay cooler', daysShort: 'days', simpleTag: 'SIMPLE. LOCAL. FRESH.', howTitle: 'How e dey work', trustOne: 'No light needed', trustTwo: 'Made with clay + sand + water', trustThree: 'Built in 1 day by a local mason', coolerLabel: 'THE CLAY COOLER', coolerCopy: 'Cool, simple place for your harvest.', ctaPrompt: 'You ready make your harvest last?', whatsappCta: 'Get Building Guide on WhatsApp', shareCta: 'Share My Savings as Picture', footerText: 'FreshKeep Lagos · Fresh harvest, more naira.',
      wa: (s, loss, saved, season) => `Hello FreshKeep! Abeg send me clay cooler building guide. I dey ${s.location}. I harvest ${s.baskets} baskets of ${s.produce} at ₦${fmt(s.price)} per basket. Without cooler I fit lose ₦${fmt(loss)}; with cooler I fit save ₦${fmt(saved)} per harvest (₦${fmt(season)} for 8 harvests).`, shareReady: 'Your savings picture don ready.'
    },
    YORUBA: {
      locationLead: 'Agbegbe rẹ', eyebrow: 'ẸRỌ IṢIRO ERE IKORE', pageTitle: 'Jẹ́ kí ikore rẹ pẹ́ sí i.', pageIntro: 'Wo bí afẹ́fẹ́ amọ̀ ṣe lè ran ọ́ lọ́wọ́ láti pa èso mọ́.', offlineReady: 'Ó ń ṣiṣẹ́ láìsí ayélujára',
      produceQuestion: 'Kí lo kórè lónìí?', quantityQuestion: 'Agbọn mélòó?', basketsLabel: 'agbọn', priceQuestion: 'Iye owó fún agbọn kan?', resultsTitle: 'Èrè ikore rẹ', withoutCooler: 'Láìsí afẹ́fẹ́ ìtútù', lossDays: 'Ó bàjẹ́ ní ọjọ́ 2', lossCaption: 'O lè pàdánù tó', estimatedLoss: 'ìṣirò pàdánù', withCooler: 'Pẹ̀lú afẹ́fẹ́ amọ̀ ₦35k', freshDays: 'Yóò tutù fún ọjọ́ 5', youSave: 'O lè fi pamọ́', perHarvest: 'fún ìkórè kan', seasonLabel: 'Fún ìkórè 8, o fi', payback: 'pamọ́. Ẹ̀rọ náà san ara rẹ̀ padà ní ọ̀sẹ̀ 1.', timerTitle: 'Títutù fún ọjọ́ 7', noCoolerLegend: 'Láìsí afẹ́fẹ́', clayCoolerLegend: 'Afẹ́fẹ́ amọ̀', daysShort: 'ọjọ́', simpleTag: 'RỌRÙN. TIWA. TUTÙ.', howTitle: 'Bí ó ṣe ń ṣiṣẹ́', trustOne: 'Kò nílò iná mànàmáná', trustTwo: 'Amọ̀ + iyanrìn + omi ni a fi ṣe é', trustThree: 'Ọmọlé agbègbè kan lè kọ́ ọ́ ní ọjọ́ kan', coolerLabel: 'AFẸ́FẸ́ AMỌ̀', coolerCopy: 'Ilé tútù tó rọrùn fún ikore rẹ.', ctaPrompt: 'Ṣé o ti múra láti pa ikore mọ́?', whatsappCta: 'Gba Ìtọ́sọ́nà Ìkọ́lé lórí WhatsApp', shareCta: 'Pín Àwòrán Ìpamọ́ Owó Mi', footerText: 'FreshKeep Lagos · Ikore tutù, owó púpọ̀ sí i.',
      wa: (s, loss, saved, season) => `Ẹ káàárọ̀ FreshKeep! Jọ̀wọ́ fi ìtọ́sọ́nà ìkọ́lé afẹ́fẹ́ amọ̀ ránṣẹ́ sí mi. Mo wà ní ${s.location}. Mo kórè agbọn ${s.baskets} ti ${s.produce}, ₦${fmt(s.price)} fún agbọn kan. Ìṣirò pàdánù láìsí afẹ́fẹ́: ₦${fmt(loss)}; ìṣirò owó tí mo fi pamọ́: ₦${fmt(saved)} fún ìkórè kan (₦${fmt(season)} fún ìkórè 8).`, shareReady: 'Àwòrán ìṣirò owó rẹ ti ṣetán.'
    }
  };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const formatMoney = (amount) => `₦${fmt(amount)}`;
  function fmt(amount) { return Math.round(Number(amount) || 0).toLocaleString('en-NG'); }
  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || typeof saved !== 'object') return;
      if (['Tomatoes', 'Atarodo', 'Ugwu', 'Efo'].includes(saved.produce)) state.produce = saved.produce;
      if (Number.isFinite(saved.baskets)) state.baskets = Math.min(50, Math.max(1, Math.round(saved.baskets)));
      if (Number.isFinite(saved.price)) state.price = Math.max(0, Math.round(saved.price));
      if (['Epe', 'Ikorodu', 'Badagry', 'Ojo'].includes(saved.location)) state.location = saved.location;
      if (['EN', 'PIDGIN', 'YORUBA'].includes(saved.language)) state.language = saved.language;
    } catch (_) { /* Storage can be unavailable; the calculator still works. */ }
  }
  function saveSelection() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* Private browsing may block storage. */ }
  }
  function t(key) { return (locale[state.language] || locale.PIDGIN)[key] || locale.PIDGIN[key] || key; }
  function setLocale() {
    document.documentElement.lang = state.language === 'YORUBA' ? 'yo' : (state.language === 'PIDGIN' ? 'en-NG' : 'en');
    $$('[data-i18n]').forEach((node) => { const value = t(node.dataset.i18n); if (value) node.textContent = value; });
    $$('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === state.language)));
    $('#basket-visual-label').textContent = `${state.baskets} ${t('basketsLabel')}`;
    const redTrack = $('.red-timeline .timeline-track');
    const greenTrack = $('.green-timeline .timeline-track');
    redTrack.setAttribute('aria-label', `${t('withoutCooler')}: 2 ${t('daysShort')}`);
    greenTrack.setAttribute('aria-label', `${t('withCooler')}: 5–7 ${t('daysShort')}`);
  }
  function updateBasketIcons() {
    const holder = $('#basket-icons');
    const icons = Math.min(state.baskets, 8);
    holder.innerHTML = Array.from({ length: icons }, () => '<svg class="basket-icon" viewBox="0 0 24 24"><path d="M3.5 9h17l-1.6 11h-13L3.5 9Z"/><path d="m7 9 5-6 5 6M7.4 12v5m4.6-5v5m4.6-5v5"/></svg>').join('');
    if (state.baskets > 8) holder.insertAdjacentHTML('beforeend', `<span>+${state.baskets - 8}</span>`);
    $('#basket-visual-label').textContent = `${state.baskets} ${t('basketsLabel')}`;
  }
  function calculations() {
    const loss = state.baskets * state.price * 0.45;
    const saved = loss * 0.9;
    const season = saved * 8;
    return { loss, saved, season };
  }
  function updateWhatsApp({ loss, saved, season }) {
    const message = locale[state.language].wa(state, loss, saved, season);
    $('#whatsapp-link').href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  function render() {
    state.baskets = Math.min(50, Math.max(1, Math.round(state.baskets)));
    state.price = Math.max(0, Math.round(Number(state.price) || 0));
    $('#basket-count').textContent = state.baskets;
    $('#basket-slider').value = state.baskets;
    $('#price-input').value = state.price;
    $$('.produce-card').forEach((card) => {
      const selected = card.dataset.produce === state.produce;
      card.classList.toggle('is-selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });
    $$('.location-pill').forEach((pill) => {
      const selected = pill.dataset.location === state.location;
      pill.classList.toggle('is-active', selected);
      pill.setAttribute('aria-pressed', String(selected));
    });
    $$('.quick-prices button').forEach((button) => {
      const selected = Number(button.dataset.price) === state.price;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    updateBasketIcons();
    const result = calculations();
    $('#loss-amount').textContent = formatMoney(result.loss);
    $('#saved-amount').textContent = formatMoney(result.saved);
    $('#season-amount').textContent = formatMoney(result.season);
    updateWhatsApp(result);
    saveSelection();
  }
  function setQuantity(next) { state.baskets = Math.min(50, Math.max(1, Math.round(next))); render(); }
  function setPrice(next) { state.price = Math.max(0, Math.round(Number(next) || 0)); render(); }
  const basketWords = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50 };
  function parseSpokenNumber(text) {
    const numeric = String(text).match(/\d{1,2}/);
    if (numeric) return Number(numeric[0]);
    const words = String(text).toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/[\s-]+/).filter(Boolean);
    let total = 0;
    let current = 0;
    words.forEach((word) => { if (basketWords[word]) current += basketWords[word]; else if (word === 'and') return; });
    total += current;
    return total || null;
  }
  function setLanguage(code) { state.language = code; setLocale(); render(); }
  function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' '); let line = '';
    words.forEach((word) => { const test = line ? `${line} ${word}` : word; if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, y); line = word; y += lineHeight; } else line = test; });
    if (line) ctx.fillText(line, x, y);
    return y + lineHeight;
  }
  function makeSavingsPng() {
    const { loss, saved, season } = calculations();
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f8f5e9'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#194c2d'; ctx.fillRect(0, 0, canvas.width, 245);
    ctx.fillStyle = '#f5cb43'; ctx.fillRect(0, 235, canvas.width, 10);
    ctx.fillStyle = '#f5cb43'; ctx.beginPath(); ctx.arc(98, 88, 35, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#194c2d'; ctx.font = 'bold 34px system-ui, sans-serif'; ctx.fillText('FreshKeep Lagos', 155, 100);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 46px system-ui, sans-serif'; ctx.fillText('Your harvest savings', 72, 179);
    ctx.fillStyle = '#1c2c20'; ctx.font = 'bold 32px system-ui, sans-serif'; ctx.fillText(`${state.baskets} baskets of ${state.produce}`, 72, 330);
    ctx.fillStyle = '#586355'; ctx.font = '28px system-ui, sans-serif'; ctx.fillText(`${state.location}  ·  ${formatMoney(state.price)} per basket`, 72, 382);
    ctx.fillStyle = '#fff0eb'; ctx.strokeStyle = '#e8b4a8'; ctx.lineWidth = 3; roundRect(ctx, 72, 448, 936, 195, 28); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#9f3229'; ctx.font = 'bold 30px system-ui, sans-serif'; ctx.fillText('WITHOUT A COOLER  ·  2 DAYS', 112, 512);
    ctx.font = 'bold 66px system-ui, sans-serif'; ctx.fillText(formatMoney(loss), 112, 597);
    ctx.fillStyle = '#edf5dc'; ctx.strokeStyle = '#c4d89c'; roundRect(ctx, 72, 676, 936, 195, 28); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2d7837'; ctx.font = 'bold 30px system-ui, sans-serif'; ctx.fillText('WITH A CLAY COOLER  ·  5 DAYS', 112, 740);
    ctx.font = 'bold 66px system-ui, sans-serif'; ctx.fillText(`${formatMoney(saved)} saved / harvest`, 112, 825);
    ctx.fillStyle = '#f5cb43'; roundRect(ctx, 72, 923, 936, 235, 28); ctx.fill();
    ctx.fillStyle = '#2f3514'; ctx.font = 'bold 32px system-ui, sans-serif'; ctx.fillText('YOUR SAVINGS FOR 8 HARVESTS', 112, 991);
    ctx.font = 'bold 76px system-ui, sans-serif'; ctx.fillText(formatMoney(season), 112, 1088);
    ctx.fillStyle = '#586355'; ctx.font = '26px system-ui, sans-serif'; ctx.fillText('Keep more of what you grow with a local clay cooler.', 72, 1243);
    ctx.fillStyle = '#194c2d'; ctx.font = 'bold 24px system-ui, sans-serif'; ctx.fillText('FreshKeep Lagos', 72, 1296);
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
  async function shareSavings() {
    const status = $('#share-status');
    const button = $('#share-button');
    button.disabled = true; status.textContent = state.language === 'YORUBA' ? 'A ń ṣe àwòrán rẹ…' : 'Making your savings picture…';
    try {
      const blob = await makeSavingsPng();
      if (!blob) throw new Error('PNG could not be created');
      const file = new File([blob], 'freshkeep-savings.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], title: 'FreshKeep Lagos — My Harvest Savings', text: 'My harvest savings with a clay cooler.' });
      } else {
        const url = URL.createObjectURL(blob); const link = document.createElement('a');
        link.href = url; link.download = 'freshkeep-savings.png'; document.body.appendChild(link); link.click(); link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      }
      status.textContent = t('shareReady');
    } catch (error) {
      if (error && error.name === 'AbortError') status.textContent = '';
      else status.textContent = state.language === 'YORUBA' ? 'A kò lè pín àwòrán náà. Gbìyànjú lẹ́ẹ̀kan sí i.' : 'Picture could not be shared. Please try again.';
    } finally { button.disabled = false; }
  }
  function installVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const button = $('#mic-button');
    if (!SpeechRecognition) return;
    button.hidden = false;
    button.addEventListener('click', () => {
      const recognition = new SpeechRecognition(); recognition.lang = state.language === 'YORUBA' ? 'yo-NG' : 'en-NG'; recognition.interimResults = false; recognition.maxAlternatives = 1;
      const status = $('#mic-status'); button.classList.add('listening'); status.textContent = state.language === 'YORUBA' ? 'Sọ iye agbọn…' : 'Say how many baskets…';
      recognition.onresult = (event) => { const spoken = event.results[0][0].transcript; const number = parseSpokenNumber(spoken); if (number) { setQuantity(number); status.textContent = `${state.baskets} ${t('basketsLabel')}`; } else status.textContent = 'Please say a number from 1 to 50.'; };
      recognition.onerror = () => { status.textContent = 'Could not hear a number. Try again.'; };
      recognition.onend = () => button.classList.remove('listening');
      try { recognition.start(); } catch (_) { button.classList.remove('listening'); status.textContent = 'Microphone is not available right now.'; }
    });
  }
  function bindEvents() {
    $$('.produce-card').forEach((card) => card.addEventListener('click', () => { state.produce = card.dataset.produce; render(); }));
    $$('.location-pill').forEach((pill) => pill.addEventListener('click', () => { state.location = pill.dataset.location; render(); }));
    $$('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
    $('#basket-slider').addEventListener('input', (event) => setQuantity(Number(event.target.value)));
    $('#minus-button').addEventListener('click', () => setQuantity(state.baskets - 1));
    $('#plus-button').addEventListener('click', () => setQuantity(state.baskets + 1));
    $('#price-input').addEventListener('input', (event) => {
      const input = event.target;
      const cursor = input.selectionStart;
      const digits = input.value.replace(/\D/g, '');
      const nextCursor = cursor === null ? null : Math.max(0, cursor - (input.value.length - digits.length));
      if (digits !== input.value) input.value = digits;
      setPrice(digits ? Number(digits) : 0);
      if (document.activeElement === input && nextCursor !== null) input.setSelectionRange(nextCursor, nextCursor);
    });
    $('#price-input').addEventListener('change', () => { $('#price-input').value = state.price; });
    $$('.quick-prices button').forEach((button) => button.addEventListener('click', () => setPrice(Number(button.dataset.price))));
    $('#share-button').addEventListener('click', shareSavings);
  }
  function start() {
    loadSaved(); setLocale(); bindEvents(); installVoiceInput(); render();
    if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}), { once: true });
  }
  start();
})();
