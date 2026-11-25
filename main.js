(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const PHONE = '37368005738';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} }
  };

  /* ---------------- i18n ---------------- */
  const RU = {
    'nav.services': 'Услуги', 'nav.prices': 'Цены', 'nav.works': 'Работы', 'nav.about': 'О нас', 'nav.contact': 'Контакты',
    'status.open': 'Открыто',
    'hero.l1': 'Поднимем.', 'hero.l2': 'Перевезём.', 'hero.l3': 'Снесём.',
    'hero.lead': 'Грузчики, грузовое такси, вывоз мусора и демонтаж. Приезжаем с нужными людьми, машиной и инструментом — от шкафа на 9-й этаж до квартиры под ноль.',
    'hero.badge': 'Бригада выезжает в любое время',
    'cta.call': 'Позвонить', 'cta.calc': 'Рассчитать стоимость',
    'facts.exp': 'Опыт', 'facts.years': 'лет', 'facts.clients': 'Клиентов', 'facts.hours': 'График', 'facts.from': 'Грузовое такси от', 'facts.leih': 'лей/час',
    'tick': 'Грузчики ✕ Грузовое такси ✕ Вывоз мусора ✕ Демонтаж ✕ Самосвал ✕ Лифт-Мобиль ✕ Сборка мебели ✕ ',
    'svc.title': 'Четыре профессии.<br>Одна бригада.',
    'svc.lead': 'Не нужно звонить в три фирмы. Поднимем, загрузим, отвезём и уберём за собой.',
    'svc.1.t': 'Грузчики', 'svc.1.k': 'Любые тяжести',
    'svc.1.d': 'Бригада грузчиков для работ любой сложности: поднимаем, спускаем и переносим безопасно, с профессиональными ремнями.',
    'svc.1.b1': 'Вынос мусора с любого этажа', 'svc.1.b2': 'Подъём материалов и тяжёлых предметов', 'svc.1.b3': 'Сборка и разборка мебели',
    'svc.2.k': 'Грузоперевозки',
    'svc.2.d': 'Быстрая перевозка грузов по Кишинёву и всей Молдове. Длиннобазные машины и опытные водители.',
    'svc.2.b1': 'Опытные водители', 'svc.2.b2': 'Большая грузоподъёмность', 'svc.2.b3': 'От 300 лей/час по городу',
    'svc.3.t': 'Вывоз мусора', 'svc.3.k': 'Контейнеры · Самосвал',
    'svc.3.d': 'Вывозим строительный мусор, старую мебель и остатки после ремонта. Чисто, быстро и без лишних хлопот.',
    'svc.3.b1': 'Самосвал большой вместимости', 'svc.3.b2': 'Загрузка с любого этажа', 'svc.3.b3': 'Цена зависит от объёма',
    'svc.4.t': 'Демонтаж', 'svc.4.k': 'Спецработы',
    'svc.4.d': 'Профессиональный демонтаж зданий и конструкций, безопасно и аккуратно.',
    'svc.4.b1': 'Здания и конструкции', 'svc.4.b2': 'Специальное оборудование', 'svc.4.b3': 'Квалифицированный персонал',
    'how.idx': 'Как мы работаем', 'how.title': 'Пять правил, которые мы не нарушаем.',
    'how.1.t': 'Выносим мусор с любого этажа', 'how.1.d': 'Быстро и эффективно, независимо от объёма. Лифт или лестница — найдём решение.',
    'how.2.t': 'Поднимаем тяжести правильно', 'how.2.d': 'Профессиональные ремни и специальное оборудование. Бережём ваши вещи и стены подъезда.',
    'how.3.t': 'Собираем и разбираем мебель', 'how.3.d': 'Наши грузчики умеют работать с любой мебелью — шкафы, кухни, кровати.',
    'how.4.t': 'Доставляем всё по адресу', 'how.4.d': 'Надёжная перевозка с вниманием к каждой детали — от погрузки до последней коробки.',
    'how.5.t': 'Отвечаем за работу', 'how.5.d': 'Полная ответственность и гарантии на наши услуги. Ваши вещи в надёжных руках.',
    'price.title': 'Понятные цены.<br>Без сюрпризов в конце.',
    'price.lead': 'Вы платите за отработанные часы. Для самосвала и Лифт-Мобиля цена зависит от объёма и этажа — позвоните, и мы сразу скажем.',
    'price.1.t': 'Длиннобазные машины', 'price.1.n': 'По городу',
    'price.2.t': 'Машины с ковшом', 'price.2.n': 'Минимальная оплата 2 часа',
    'price.3.t': 'Самосвал', 'price.3.n': 'Зависит от объёма',
    'price.4.n': 'По этажу · минимум 2 часа', 'price.var': 'По запросу',
    'calc.title': 'Быстрый расчёт', 'calc.vehicle': 'Что вам нужно?', 'calc.hours': 'Примерно часов',
    'calc.min': 'Минимум 2 часа для этой услуги', 'calc.total': 'Оценка',
    'calc.fine': 'Ориентировочно. Окончательная цена подтверждается по телефону до выезда.',
    'calc.call': 'Уточнить по телефону', 'calc.send': 'Отправить заявку',
    'works.title': 'С наших объектов.',
    'works.c1': 'Демонтажные работы', 'works.c2': 'Снос конструкции', 'works.c3': 'Снятие плитки', 'works.c4': 'Вывоз мусора',
    'works.c5': 'Демонтаж пола', 'works.c6': 'Демонтаж внутри помещения', 'works.c7': 'Работа в полной защите',
    'about.big': 'Мы — команда с более чем десятилетним опытом в перевозках, переездах и демонтаже. Работали для тысяч клиентов по всей Молдове.',
    'about.small': 'Работаем 24/7: рано утром, поздно ночью, в выходные. Скажите, что нужно сделать, — приедем с нужными людьми и машиной.',
    'about.s1': 'лет опыта', 'about.s2': 'довольных клиентов', 'about.s3': 'на связи', 'about.s4': 'работаем по всей Молдове',
    'faq.idx': 'Вопросы', 'faq.title': 'Что спрашивают клиенты.',
    'faq.1.q': 'Работаете ночью и в выходные?', 'faq.1.a': 'Да. Работаем 24/7, включая выходные и праздники. Звоните на +373 68 005 738 в любое время.',
    'faq.2.q': 'Какой минимальный заказ?', 'faq.2.a': 'Для машин с ковшом и Лифт-Мобиля минимальная оплата — 2 часа. Грузовое такси по городу — 300 лей/час.',
    'faq.3.q': 'Выезжаете за пределы Кишинёва?', 'faq.3.a': 'Да, перевозим грузы по всей Молдове. Позвоните, и мы назовём цену для вашего рейса.',
    'faq.5.q': 'Как узнать точную цену?', 'faq.5.a': 'Позвоните на +373 68 005 738, опишите задачу — и мы назовём цену.',
    'contact.title': 'Скажите, что нужно перевезти, вынести или снести.',
    'contact.line': 'Прямая линия · 24/7', 'contact.where': 'Где', 'contact.whereV': 'Кишинёв, Молдова', 'contact.when': 'График', 'contact.whenV': 'Без выходных, 24/7',
    'form.title': 'Быстрая заявка', 'form.name': 'Имя', 'form.phone': 'Телефон', 'form.service': 'Услуга',
    'form.msg': 'Детали (адрес, этаж, объём)', 'form.err': 'Укажите имя и телефон.',
    'form.wa': 'Отправить в WhatsApp', 'form.viber': 'Отправить в Viber',
    'form.fine': 'Сообщение откроется уже заполненным в приложении. Мы не храним данные.',
    'ftr.top': 'Наверх ↑'
  };
  const MSG = {
    ro: { hi: 'Bună ziua! Aș dori o cerere:', name: 'Nume', phone: 'Telefon', svc: 'Serviciu', det: 'Detalii', est: 'Estimare calculator', h: 'ore', copied: 'Mesajul a fost copiat — lipiți-l în chatul Viber.', open: 'Deschis acum' },
    ru: { hi: 'Здравствуйте! Хочу оставить заявку:', name: 'Имя', phone: 'Телефон', svc: 'Услуга', det: 'Детали', est: 'Оценка калькулятора', h: 'ч', copied: 'Сообщение скопировано — вставьте его в чат Viber.', open: 'Открыто' }
  };
  const nodes = $$('[data-i18n]');
  nodes.forEach(n => (n.dataset.ro = n.innerHTML));
  let lang = store.get('htd-lang') === 'ru' ? 'ru' : 'ro';

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    nodes.forEach(n => {
      const v = l === 'ru' ? RU[n.dataset.i18n] : n.dataset.ro;
      if (v != null) n.innerHTML = v;
    });
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    store.set('htd-lang', l);
    calc && calc.update();
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------------- Ready ---------------- */
  const ready = () => requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
  (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 900))]) : Promise.resolve()).then(ready);

  /* ---------------- Header ---------------- */
  const hdr = $('#hdr');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('is-solid', y > 40);
    const menuOpen = burger.getAttribute('aria-expanded') === 'true';
    hdr.classList.toggle('is-hidden', !menuOpen && y > innerHeight * 0.8 && y > lastY + 4);
    if (y < lastY - 4) hdr.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });

  const burger = $('.burger');
  const mnav = $('#mnav');
  const toggleMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    mnav.hidden = !open;
    hdr.classList.toggle('is-solid', open || scrollY > 40);
  };
  burger.addEventListener('click', () => toggleMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', mnav).forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  onScroll();

  /* active nav link */
  const navLinks = $$('.nav a');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('is-cur', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['servicii', 'tarife', 'lucrari', 'despre', 'contact'].forEach(id => { const el = document.getElementById(id); el && io.observe(el); });

  /* ---------------- Clock (Chișinău) ---------------- */
  const clockEls = $$('[data-clock]');
  const tick = () => {
    const t = new Intl.DateTimeFormat('ro-MD', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Chisinau' }).format(new Date());
    clockEls.forEach(c => (c.textContent = t));
  };
  tick(); setInterval(tick, 15000);

  /* ---------------- Count up ---------------- */
  const countIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target, to = +el.dataset.count;
    if (reduce) return;
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * k);
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------------- Reveal ---------------- */
  const revealTargets = $$('.sec__head, .price__list li, .calc, .about__big, .about__stats > div, .faq__list details, .contact__l > *, .qform');
  revealTargets.forEach((el, i) => { el.setAttribute('data-reveal', ''); });
  const revIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      const sibs = [...e.target.parentElement.children].filter(c => c.hasAttribute('data-reveal'));
      e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target), 5) * 70 + 'ms';
      e.target.classList.add('is-in');
      revIO.unobserve(e.target);
    }
  }), { rootMargin: '0px 0px -8% 0px' });
  revealTargets.forEach(el => revIO.observe(el));

  /* ---------------- Services panels ---------------- */
  const svcItems = $$('.svc__item');
  const wide = matchMedia('(min-width: 981px)');
  const activate = it => svcItems.forEach(s => s.classList.toggle('is-active', s === it));
  svcItems.forEach(it => {
    it.addEventListener('mouseenter', () => wide.matches && activate(it));
    it.addEventListener('focus', () => activate(it));
    it.addEventListener('click', () => activate(it));
  });

  /* ---------------- How (sticky counter) ---------------- */
  const rows = $$('[data-how]');
  const cur = $('[data-how-current]');
  let howIdx = -1;
  const howSync = () => {
    const line = innerHeight * 0.62;
    let idx = 0;
    rows.forEach((r, i) => { if (r.getBoundingClientRect().top < line) idx = i; });
    if (idx === howIdx) return;
    howIdx = idx;
    rows.forEach((r, i) => r.classList.toggle('is-on', i <= idx));
    if (cur) {
      cur.textContent = String(idx + 1).padStart(2, '0');
      cur.classList.remove('flip'); void cur.offsetWidth; cur.classList.add('flip');
    }
  };
  if (rows.length) { addEventListener('scroll', howSync, { passive: true }); howSync(); }

  /* ---------------- Calculator ---------------- */
  const calcEl = $('[data-calc]');
  const calc = calcEl && (() => {
    const hoursOut = $('[data-hours]', calcEl), range = $('[data-range]', calcEl);
    const sumEl = $('[data-sum]', calcEl), unitEl = $('[data-sum-unit]', calcEl), sumWrap = $('.calc__sum', calcEl);
    const note = $('[data-min-note]', calcEl);
    let hours = 2, shown = 600, raf;
    const veh = () => $('input[name=veh]:checked', calcEl);
    const animateTo = to => {
      cancelAnimationFrame(raf);
      const from = shown, t0 = performance.now();
      const step = now => {
        const p = Math.min(1, (now - t0) / 450), k = 1 - Math.pow(1 - p, 3);
        shown = Math.round(from + (to - from) * k);
        sumEl.textContent = shown.toLocaleString('ro-MD');
        if (p < 1) raf = requestAnimationFrame(step);
      };
      reduce ? (shown = to, sumEl.textContent = to.toLocaleString('ro-MD')) : (raf = requestAnimationFrame(step));
    };
    const update = () => {
      const v = veh(), rate = +v.value, min = +v.dataset.min;
      if (hours < min) hours = min;
      note.hidden = !(min > 1 && hours === min);
      hoursOut.textContent = hours;
      range.value = hours;
      if (rate) {
        sumWrap.classList.remove('is-var');
        unitEl.textContent = lang === 'ru' ? 'лей' : 'lei';
        animateTo(rate * hours);
      } else {
        cancelAnimationFrame(raf);
        sumWrap.classList.add('is-var');
        sumEl.textContent = lang === 'ru' ? RU['price.var'] : 'La cerere';
        unitEl.textContent = '';
        shown = 0;
      }
    };
    $$('[data-step]', calcEl).forEach(b => b.addEventListener('click', () => { hours = Math.max(1, Math.min(12, hours + +b.dataset.step)); update(); }));
    range.addEventListener('input', () => { hours = +range.value; update(); });
    $$('input[name=veh]', calcEl).forEach(r => r.addEventListener('change', update));

    /* "Trimite cererea" → prefill contact form */
    $('[data-calc-send]', calcEl).addEventListener('click', () => {
      const v = veh(), m = MSG[lang];
      const msg = $('textarea[name=msg]');
      const line = `${v.dataset.name} · ${hours} ${m.h}` + (+v.value ? ` · ~${+v.value * hours} lei` : '');
      if (msg && !msg.value.includes(line)) msg.value = (msg.value ? msg.value + '\n' : '') + line;
      setTimeout(() => $('input[name=name]').focus({ preventScroll: true }), 700);
    });
    return { update };
  })();

  /* ---------------- Works gallery ---------------- */
  const track = $('[data-works]');
  if (track) {
    const items = $$('.works__item', track);
    items.forEach((f, i) => $('figcaption', f).setAttribute('data-n', String(i + 1).padStart(2, '0')));
    $('[data-works-total]').textContent = String(items.length).padStart(2, '0');
    const curEl = $('[data-works-cur]'), bar = $('[data-works-bar]');
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      bar.style.width = Math.max(12, (track.clientWidth / track.scrollWidth) * 100) + '%';
      bar.style.transform = `translateX(${p * (100 / parseFloat(bar.style.width) * 100 - 100)}%)`;
      const left = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
      let idx = 0;
      items.forEach((it, i) => { if (it.getBoundingClientRect().left - left < it.offsetWidth / 2) idx = i; });
      if (p > 0.98) idx = items.length - 1;
      curEl.textContent = String(idx + 1).padStart(2, '0');
    };
    track.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
    const by = dir => {
      const w = items[0].offsetWidth + 16;
      track.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
    };
    $('[data-works-prev]').addEventListener('click', () => by(-1));
    $('[data-works-next]').addEventListener('click', () => by(1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') by(1); if (e.key === 'ArrowLeft') by(-1); });

    /* drag to scroll (mouse only) */
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 5 && !moved) { moved = true; track.classList.add('is-drag'); }
      if (moved) track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove('is-drag');
        const w = items[0].offsetWidth + 16;
        track.scrollTo({ left: Math.round(track.scrollLeft / w) * w, behavior: 'smooth' });
        setTimeout(() => (moved = false), 50);
      }
    });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    /* lightbox */
    const lb = $('[data-lb-root]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]');
    let li = 0, lastFocus;
    const show = i => {
      li = (i + items.length) % items.length;
      const img = $('img', items[li]);
      lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
      lbCap.textContent = `${String(li + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')} — ${$('figcaption', items[li]).textContent}`;
    };
    const open = i => {
      lastFocus = document.activeElement;
      show(i); lb.hidden = false;
      requestAnimationFrame(() => lb.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]').focus();
    };
    const close = () => {
      lb.classList.remove('is-open');
      setTimeout(() => (lb.hidden = true), 250);
      document.body.style.overflow = '';
      lastFocus && lastFocus.focus();
    };
    $$('[data-lb]').forEach(b => b.addEventListener('click', () => open(+b.dataset.lb)));
    $('[data-lb-close]').addEventListener('click', close);
    $('[data-lb-prev]').addEventListener('click', () => show(li - 1));
    $('[data-lb-next]').addEventListener('click', () => show(li + 1));
    lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb__fig')) close(); });
    addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(li + 1);
      if (e.key === 'ArrowLeft') show(li - 1);
    });
    let tx = 0;
    lb.addEventListener('touchstart', e => (tx = e.touches[0].clientX), { passive: true });
    lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) show(li + (d < 0 ? 1 : -1)); });
  }

  /* ---------------- FAQ smooth open ---------------- */
  $$('.faq__list details').forEach(d => {
    const sum = $('summary', d), body = $('div', d);
    sum.addEventListener('click', e => {
      if (reduce) return;
      e.preventDefault();
      if (d.open) {
        const a = body.animate([{ height: body.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.2,.7,0,1)' });
        d.classList.add('closing');
        a.onfinish = () => { d.open = false; d.classList.remove('closing'); };
      } else {
        $$('.faq__list details[open]').forEach(o => o !== d && $('summary', o).click());
        d.open = true;
        const h = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.7,0,1)' });
      }
    });
  });

  /* ---------------- Quote form ---------------- */
  const form = $('[data-qform]');
  if (form) {
    const err = $('[data-qform-err]', form);
    let via = 'wa';
    $$('[data-via]', form).forEach(b => b.addEventListener('click', () => (via = b.dataset.via)));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form), m = MSG[lang];
      const name = (fd.get('name') || '').trim(), phone = (fd.get('phone') || '').trim();
      $('input[name=name]', form).classList.toggle('is-bad', !name);
      $('input[name=phone]', form).classList.toggle('is-bad', phone.replace(/\D/g, '').length < 6);
      if (!name || phone.replace(/\D/g, '').length < 6) { err.hidden = false; return; }
      err.hidden = true;
      const svcs = fd.getAll('svc');
      const text = [
        m.hi,
        `${m.name}: ${name}`,
        `${m.phone}: ${phone}`,
        svcs.length ? `${m.svc}: ${svcs.join(', ')}` : '',
        fd.get('msg') ? `${m.det}: ${fd.get('msg').trim()}` : ''
      ].filter(Boolean).join('\n');
      if (via === 'viber') {
        try { await navigator.clipboard.writeText(text); alert(m.copied); } catch {}
        location.href = `viber://chat?number=%2B${PHONE}`;
      } else {
        window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      }
    });
  }

  /* ---------------- Misc ---------------- */
  $$('[data-year]').forEach(y => (y.textContent = new Date().getFullYear()));
  if (lang !== 'ro') setLang(lang);
})();
