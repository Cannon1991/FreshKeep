(() => {
  'use strict';
  const STORAGE_KEY = 'freshkeep-last-selection-v1';
  const CROPS = {
    Tomatoes: { normal: 2, cooler: 5 },
    Atarodo: { normal: 3, cooler: 7 },
    Ugwu: { normal: 1, cooler: 4 },
    Efo: { normal: 1, cooler: 3 }
  };
  const COOLER_COST = 35000;
  const state = { produce: 'Tomatoes', checkerProduce: 'Tomatoes', baskets: 8, price: 5000, location: 'Epe', language: 'PIDGIN', daysAgo: 0, reminder: null };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const fmt = (value) => Math.round(Number(value) || 0).toLocaleString('en-NG');
  const money = (value) => `₦${fmt(value)}`;

  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || typeof saved !== 'object') return;
      if (Object.hasOwn(CROPS, saved.produce)) state.produce = saved.produce;
      if (Object.hasOwn(CROPS, saved.checkerProduce)) state.checkerProduce = saved.checkerProduce;
      if (Number.isFinite(saved.baskets)) state.baskets = clamp(Math.round(saved.baskets), 1, 50);
      if (Number.isFinite(saved.price)) state.price = Math.max(0, Math.round(saved.price));
      if (['Epe', 'Ikorodu', 'Badagry', 'Ojo'].includes(saved.location)) state.location = saved.location;
      if (['EN', 'PIDGIN', 'YORUBA'].includes(saved.language)) state.language = saved.language;
      if (Number.isFinite(saved.daysAgo)) state.daysAgo = clamp(Math.round(saved.daysAgo), 0, 7);
      if (saved.reminder && Number.isFinite(saved.reminder.dueAt)) state.reminder = saved.reminder;
    } catch (_) { /* Local storage may be blocked; app remains usable. */ }
  }
  function saveSelection() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* Private mode may prevent storage. */ }
  }
  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function crop(produce = state.produce) { return CROPS[produce] || CROPS.Tomatoes; }
  function calculate() {
    const loss = state.baskets * state.price * 0.45;
    const saved = loss * 0.9;
    const season = saved * 8;
    return { loss, saved, season };
  }
  function setKeywordWords() {
    const words = state.language === 'YORUBA'
      ? { save: 'Da Owo Duro', spoil: 'Don Spoil' }
      : state.language === 'PIDGIN'
        ? { save: 'Keep Money', spoil: 'Don Spoil' }
        : { save: 'Save', spoil: 'Spoils' };
    $$('[data-keyword]').forEach((node) => { node.textContent = words[node.dataset.keyword]; });
    $$('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === state.language)));
  }
  function updateBasketIcons() {
    const holder = $('#basket-icons');
    const count = Math.min(state.baskets, 8);
    holder.innerHTML = Array.from({ length: count }, () => '<svg class="basket-icon" viewBox="0 0 24 24"><path d="M3.5 9h17l-1.6 11h-13L3.5 9Z"/><path d="m7 9 5-6 5 6M7.4 12v5m4.6-5v5m4.6-5v5"/></svg>').join('');
    if (state.baskets > 8) holder.insertAdjacentHTML('beforeend', `<span>+${state.baskets - 8}</span>`);
    $('#basket-visual-label').textContent = `${state.baskets} baskets`;
  }
  function updateWhatsApp() {
    const message = `Hi I dey for ${state.location}. I get ${state.baskets} baskets of ${state.produce}. How I fit build the N35k cooler?`;
    $('#whatsapp-link').href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  function updateCropFreshness() {
    const info = crop();
    $('#normal-days').textContent = info.normal;
    $('#cooler-days').textContent = info.cooler;
    $('#normal-day-label').textContent = info.normal;
    $('#cooler-day-label').textContent = info.cooler;
    $('#normal-fill').style.setProperty('--days', info.normal);
    $('#normal-mark').style.setProperty('--day', info.normal);
    $('#normal-mark').textContent = info.normal;
    $('#cooler-fill').style.setProperty('--days', info.cooler);
    $('#cooler-mark').style.setProperty('--day', info.cooler);
    $('#cooler-mark').textContent = info.cooler;
    $('#normal-track').setAttribute('aria-label', `Without cooler, ${state.produce} stays fresh for ${info.normal} days`);
    $('#cooler-track').setAttribute('aria-label', `With clay cooler, ${state.produce} stays fresh for ${info.cooler} days`);
    $$('.produce-card').forEach((button) => {
      const selected = button.dataset.produce === state.produce;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  function weekday(date) { return new Intl.DateTimeFormat('en-NG', { weekday: 'long' }).format(date); }
  function updateDaysChecker() {
    const details = crop(state.checkerProduce);
    const remaining = details.cooler - state.daysAgo;
    const sellDate = new Date();
    sellDate.setHours(12, 0, 0, 0);
    sellDate.setDate(sellDate.getDate() + Math.max(remaining, 0));
    $('#days-ago').value = state.daysAgo;
    $('#days-ago-value').textContent = state.daysAgo;
    $('#days-remaining').textContent = Math.max(remaining, 0);
    $('#sell-by-day').textContent = weekday(sellDate);
    $('#days-left-output').hidden = remaining <= 0;
    $('#days-warning').hidden = remaining > 0;
    $$('.checker-produce-button').forEach((button) => {
      const selected = button.dataset.checkerProduce === state.checkerProduce;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  function updateCostAndResults() {
    const result = calculate();
    $('#loss-amount').textContent = money(result.loss);
    $('#saved-amount').textContent = money(result.saved);
    $('#season-amount').textContent = money(result.season);
    $('#weekly-savings').textContent = money(result.saved);
    const harvestsToPayBack = result.saved > 0 ? Math.ceil(COOLER_COST / result.saved) : null;
    $('#payback-copy').textContent = harvestsToPayBack === 1
      ? 'One similar harvest can cover the cooler cost.'
      : harvestsToPayBack
        ? `About ${harvestsToPayBack} similar harvests to cover the cooler cost.`
        : 'Enter a basket price to estimate cooler payback.';
    $('#cost-cover-status').textContent = result.saved >= COOLER_COST
      ? 'E don cover cost with this harvest.'
      : harvestsToPayBack
        ? `Not covered yet — about ${harvestsToPayBack} similar harvests can cover the ₦35,000 build.`
        : 'Add a price to estimate when savings cover the build.';
    updateWhatsApp();
  }
  function render() {
    state.baskets = clamp(Math.round(state.baskets), 1, 50);
    state.price = Math.max(0, Math.round(Number(state.price) || 0));
    $('#basket-count').textContent = state.baskets;
    $('#basket-slider').value = state.baskets;
    $('#price-input').value = state.price;
    $$('.location-pill').forEach((button) => {
      const selected = button.dataset.location === state.location;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $$('.quick-prices button').forEach((button) => {
      const selected = Number(button.dataset.price) === state.price;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    updateBasketIcons();
    updateCropFreshness();
    updateDaysChecker();
    updateCostAndResults();
    saveSelection();
  }
  function setQuantity(value) { state.baskets = clamp(Math.round(value), 1, 50); render(); }
  function setPrice(value) { state.price = Math.max(0, Math.round(Number(value) || 0)); render(); }

  const numberWords = { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50 };
  function parseNumber(text) {
    const numeric = String(text).match(/\d{1,2}/);
    if (numeric) return Number(numeric[0]);
    const tokens = String(text).toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/[\s-]+/);
    return tokens.reduce((sum, word) => sum + (numberWords[word] || 0), 0) || null;
  }
  function setupVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const button = $('#mic-button');
    if (!SpeechRecognition) return;
    button.hidden = false;
    button.addEventListener('click', () => {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-NG';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      button.classList.add('listening');
      $('#mic-status').textContent = 'Say how many baskets…';
      recognition.onresult = (event) => {
        const value = parseNumber(event.results[0][0].transcript);
        if (value) { setQuantity(value); $('#mic-status').textContent = `${state.baskets} baskets`; }
        else $('#mic-status').textContent = 'Please say a number from 1 to 50.';
      };
      recognition.onerror = () => { $('#mic-status').textContent = 'Could not hear a number. Try again.'; };
      recognition.onend = () => button.classList.remove('listening');
      try { recognition.start(); } catch (_) { button.classList.remove('listening'); }
    });
  }
  function drawSavingsPng() {
    const { loss, saved, season } = calculate();
    const info = crop();
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1280;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff9e4'; ctx.fillRect(0, 0, 1080, 1280);
    ctx.fillStyle = '#f5cb43'; ctx.fillRect(0, 0, 1080, 230);
    ctx.fillStyle = '#194c2d'; ctx.beginPath(); ctx.arc(100, 90, 36, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px system-ui, sans-serif'; ctx.fillText('FreshKeep Lagos', 160, 101);
    ctx.fillStyle = '#194c2d'; ctx.font = 'bold 48px system-ui, sans-serif'; ctx.fillText('My harvest savings', 72, 180);
    ctx.fillStyle = '#1c2c20'; ctx.font = 'bold 34px system-ui, sans-serif'; ctx.fillText(`${state.baskets} baskets of ${state.produce}`, 72, 314);
    ctx.font = '28px system-ui, sans-serif'; ctx.fillText(`${state.location}  ·  ${money(state.price)} per basket`, 72, 362);
    roundRect(ctx, 72, 425, 936, 185, 26, '#fff0eb', '#e8b4a8');
    ctx.fillStyle = '#9f3229'; ctx.font = 'bold 30px system-ui, sans-serif'; ctx.fillText(`WITHOUT COOLER  ·  ${info.normal} DAYS`, 112, 487);
    ctx.font = 'bold 64px system-ui, sans-serif'; ctx.fillText(money(loss), 112, 565);
    roundRect(ctx, 72, 642, 936, 185, 26, '#edf5dc', '#c4d89c');
    ctx.fillStyle = '#2d7837'; ctx.font = 'bold 30px system-ui, sans-serif'; ctx.fillText(`WITH CLAY COOLER  ·  ${info.cooler} DAYS`, 112, 704);
    ctx.font = 'bold 57px system-ui, sans-serif'; ctx.fillText(`${money(saved)} kept / harvest`, 112, 781);
    roundRect(ctx, 72, 865, 936, 235, 26, '#f5cb43', '#f5cb43');
    ctx.fillStyle = '#2f3514'; ctx.font = 'bold 32px system-ui, sans-serif'; ctx.fillText('SAVINGS FOR 8 HARVESTS', 112, 930);
    ctx.font = 'bold 76px system-ui, sans-serif'; ctx.fillText(money(season), 112, 1026);
    ctx.fillStyle = '#194c2d'; ctx.font = 'bold 34px system-ui, sans-serif'; ctx.fillText(`I go save ${money(saved)} with FreshKeep`, 72, 1179);
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }
  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.lineWidth = 3; ctx.strokeStyle = stroke; ctx.stroke(); }
  }
  async function shareSavings() {
    const button = $('#share-button');
    const status = $('#share-status');
    button.disabled = true; status.textContent = 'Making your savings picture…';
    try {
      const blob = await drawSavingsPng();
      if (!blob) throw new Error('PNG could not be created');
      const file = new File([blob], 'freshkeep-savings.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], title: 'FreshKeep Lagos — My Harvest Savings', text: `I go save ${money(calculate().saved)} with FreshKeep.` });
      } else {
        const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
        anchor.href = url; anchor.download = 'freshkeep-savings.png'; document.body.appendChild(anchor); anchor.click(); anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      }
      status.textContent = 'Your savings picture is ready.';
    } catch (error) {
      if (error?.name === 'AbortError') status.textContent = '';
      else status.textContent = 'Picture could not be shared. Please try again.';
    } finally { button.disabled = false; }
  }
  function tomorrowAtEight() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8, 0, 0, 0).getTime();
  }
  let reminderTimer = null;
  function updateReminderStatus() {
    if (!state.reminder) return;
    if (reminderTimer !== null) clearTimeout(reminderTimer);
    const remaining = state.reminder.dueAt - Date.now();
    if (remaining <= 0) {
      $('#reminder-status').textContent = `Reminder: check your ${state.reminder.produce} harvest today. This reminder stays on this device.`;
      state.reminder = null;
      saveSelection();
      reminderTimer = null;
      return;
    }
    reminderTimer = setTimeout(updateReminderStatus, Math.min(remaining, 2147480000));
  }
  function bindEvents() {
    $$('.produce-card').forEach((button) => button.addEventListener('click', () => { state.produce = button.dataset.produce; render(); }));
    $$('.checker-produce-button').forEach((button) => button.addEventListener('click', () => { state.checkerProduce = button.dataset.checkerProduce; render(); }));
    $$('.location-pill').forEach((button) => button.addEventListener('click', () => { state.location = button.dataset.location; render(); }));
    $$('[data-language]').forEach((button) => button.addEventListener('click', () => { state.language = button.dataset.language; setKeywordWords(); saveSelection(); }));
    $('#basket-slider').addEventListener('input', (event) => setQuantity(Number(event.target.value)));
    $('#minus-button').addEventListener('click', () => setQuantity(state.baskets - 1));
    $('#plus-button').addEventListener('click', () => setQuantity(state.baskets + 1));
    $('#price-input').addEventListener('input', (event) => {
      const input = event.target; const cursor = input.selectionStart;
      const digits = input.value.replace(/\D/g, '');
      const nextCursor = cursor === null ? null : Math.max(0, cursor - (input.value.length - digits.length));
      if (digits !== input.value) input.value = digits;
      setPrice(digits ? Number(digits) : 0);
      if (document.activeElement === input && nextCursor !== null) input.setSelectionRange(nextCursor, nextCursor);
    });
    $('#price-input').addEventListener('change', () => { $('#price-input').value = state.price; });
    $$('.quick-prices button').forEach((button) => button.addEventListener('click', () => setPrice(Number(button.dataset.price))));
    $('#days-ago').addEventListener('input', (event) => { state.daysAgo = Number(event.target.value); render(); });
    $('#remind-button').addEventListener('click', () => {
      state.reminder = { dueAt: tomorrowAtEight(), produce: state.checkerProduce };
      $('#reminder-status').textContent = `Saved for tomorrow on this device. Open FreshKeep to see your ${state.checkerProduce} reminder; no system notification is sent.`;
      saveSelection();
      updateReminderStatus();
    });
    $('#share-button').addEventListener('click', shareSavings);
  }
  function start() {
    loadSaved(); setKeywordWords(); bindEvents(); setupVoice(); render(); updateReminderStatus();
    document.addEventListener('visibilitychange', updateReminderStatus);
    window.addEventListener('pageshow', updateReminderStatus);
    if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}), { once: true });
  }
  start();
})();
