class Component extends DCLogic {
  state = {
    view: 'home',
    slug: null,
    slide: 0,
    menuOpen: false,
    form: { name: '', phone: '', email: '', message: '' },
    errName: false, errContact: false, errMessage: false,
    sending: false, sendError: '',
    formSent: false,
  };

  componentDidMount() {
    this._t = setInterval(() => {
      this.setState(s => ({ slide: (s.slide + 1) % this.slides().length }));
    }, 5000);
  }

  componentWillUnmount() {
    if (this._t) clearInterval(this._t);
  }

  slides() {
    return [
      { img: '/assets/images/endoscopes/DSC03656.jpg', t: 'РуСкейп А-2600', s: 'Первая гибридная видеоэндоскопическая система российского производства' },
      { img: '/assets/images/endoscopes/DSC03695.jpg', t: 'Полный эндоскопический комплекс', s: 'Видеопроцессор, источник света и гибкие эндоскопы серии А20 на одной стойке' },
      { img: '/assets/images/endoscopes/DSC03872.jpg', t: 'Видеопроцессор A-2600', s: 'Качество визуализации 1920×1080 и встроенный мультисветодиодный источник света' },
      { img: '/assets/images/endoscopes/DSC03960.jpg', t: 'Эндоскопические камеры 2K', s: 'CMOS-датчик, 60 кадров/с, оптический зум и маятниковая стабилизация' },
      { img: '/assets/images/endoscopes/DSC03790.jpg', t: 'Мобильные стойки', s: 'Компактные решения для эндоскопии в любом отделении' },
    ];
  }

  products() {
    return [
      {
        slug: 'videosystem-a-2600',
        name: 'Видеосистема А-2600',
        tagline: 'Гибридная видеоэндоскопическая система',
        img: '/assets/images/endoscopes/DSC03656.jpg',
        desc: 'Видеопроцессор со встроенным источником света, эндоскопические камеры 2K и линейка гибких эндоскопов серии А20 — единый зарегистрированный комплекс российского производства.',
        features: ['Качество визуализации 1920×1080', 'Мультисветодиодный источник света', '4 режима визуализации', 'Фото- и видеофиксация исследований'],
      },
      {
        slug: 'trolley-t-2000',
        name: 'Тележка Т-2000',
        tagline: 'Мобильная эндоскопическая стойка',
        img: '/assets/images/endoscopes/DSC03799.jpg',
        desc: 'Передвижная стойка с кронштейнами для мониторов, регулируемыми полками для оборудования и держателями эндоскопов. Доступна в светлом и графитовом исполнении.',
        features: ['Кронштейны для 1–2 мониторов', 'Регулируемые полки', 'Держатель баллона CO₂', 'Блокируемые колёса'],
      },
      {
        slug: 'co2-insufflator',
        name: 'Инсуффлятор CO₂',
        tagline: 'Подача углекислого газа',
        img: null,
        desc: 'Аппарат для контролируемой инсуффляции CO₂ во время эндоскопических исследований. Точная регулировка давления и потока газа.',
        features: ['Регулировка давления и потока', 'Цифровая индикация', 'Совместимость с системой А-2600'],
      },
      {
        slug: 'irrigator',
        name: 'Ирригатор',
        tagline: 'Помпа подачи жидкости',
        img: null,
        desc: 'Перистальтическая помпа для подачи и аспирации жидкости при эндоскопических процедурах.',
        features: ['Регулируемая скорость подачи', 'Простое управление', 'Совместимость с эндоскопами серии А20'],
      },
      {
        slug: 'sink-1',
        name: 'Мойка 1',
        tagline: 'Предварительная обработка',
        img: null,
        desc: 'Мойка для предварительной очистки и дезинфекции гибких эндоскопов.',
        features: ['Нержавеющая сталь', 'Эргономичная глубина', 'Для ручной обработки эндоскопов'],
      },
      {
        slug: 'sink-2',
        name: 'Мойка 2',
        tagline: 'Финишная обработка',
        img: null,
        desc: 'Мойка для финишной обработки, ополаскивания и подготовки эндоскопов к хранению.',
        features: ['Нержавеющая сталь', 'Подключение к системе водоподготовки', 'Гигиеничная конструкция'],
      },
      {
        slug: 'water-treatment-system',
        name: 'Система водоподготовки',
        tagline: 'Трёхступенчатая фильтрация',
        img: '/assets/images/endoscopes/DSC03853.jpg',
        desc: 'Настенная система фильтрации и водоподготовки для финишной обработки эндоскопов: три ступени фильтрации, циркуляционный насос и контроль давления.',
        features: ['Три ступени фильтрации', 'Циркуляционный насос', 'Манометры контроля давления', 'Настенное исполнение'],
      },
    ];
  }

  distributors() {
    return [
      { name: 'Лидер Медицина',            legal: 'ООО «Лидер Медицина»',            inn: '6671245345', email: 'info@lidermedicina.ru', site: '',             siteHref: '' },
      { name: 'Развитие',                  legal: 'ООО «Развитие»',                  inn: '6686012897', email: 'info@rzvit.ru',         site: 'rzvit.ru',     siteHref: 'https://rzvit.ru' },
      { name: 'Новая медицинская компания', legal: 'ООО «Новая медицинская компания»', inn: '5039009519', email: 'info@newmedcom.ru',    site: 'newmedcom.ru', siteHref: 'https://newmedcom.ru' },
    ].map(d => ({ ...d, hasSite: !!d.site }));
  }

  go(view) { this.setState({ view, slug: null, menuOpen: false }); this._top(); }
  openProduct(slug) { this.setState({ view: 'product', slug }); this._top(); }
  _top() { try { window.scrollTo(0, 0); } catch (e) {} }

  setField(k, v) { this.setState(s => ({ form: { ...s.form, [k]: v } })); }

  submit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (this.state.sending) return;

    const f = this.state.form;
    const errName    = !f.name.trim();
    const errContact = !f.phone.trim() && !f.email.trim();
    const errMessage = !f.message.trim();
    if (errName || errContact || errMessage) {
      this.setState({ errName, errContact, errMessage, sendError: '', formSent: false });
      return;
    }

    this.setState({ errName: false, errContact: false, errMessage: false, sending: true, sendError: '' });

    const cfg = (typeof window !== 'undefined' && window.RUSENDO_CONFIG) || {};
    const url = cfg.contactApiUrl || '/api/contact';
    const headers = { 'Content-Type': 'application/json' };
    if (cfg.apiKey) headers['X-API-Key'] = cfg.apiKey;

    const payload = {
      name: f.name.trim(),
      phone: f.phone.trim(),
      email: f.email.trim(),
      message: f.message.trim(),
    };

    fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) })
      .then(async (res) => {
        let data = {};
        try { data = await res.json(); } catch (_) {}
        if (!res.ok || !data.ok) {
          const msg = (data.errors && data.errors.join(' ')) || data.error ||
            'Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами по телефону.';
          throw new Error(msg);
        }
        this.setState({ sending: false, sendError: '', formSent: true });
      })
      .catch((err) => {
        this.setState({
          sending: false,
          sendError: (err && err.message) ||
            'Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.',
        });
      });
  }

  renderVals() {
    const view = this.state.view;
    const sl  = this.slides();
    const idx = this.state.slide % sl.length;
    const cur = sl[idx] || sl[0];
    const prods    = this.products();
    const selected = prods.find(p => p.slug === this.state.slug) || null;
    const isA2600  = view === 'product' && selected && selected.slug === 'videosystem-a-2600';
    const phone    = this.props.companyPhone || '8 343 319-09-00';

    const slideDots = sl.map((s, i) => ({
      i,
      set: () => this.setState({ slide: i }),
      w:   i === idx ? '26px' : '8px',
      bg:  i === idx ? '#2EB6BE' : '#CDD6D5',
    }));

    return {
      // навигация
      goHome:     () => this.go('home'),
      goAbout:    () => this.go('about'),
      goCatalog:  () => this.go('catalog'),
      goDist:     () => this.go('distributors'),
      goContacts: () => this.go('contacts'),
      phone,
      phoneHref: phone.replace(/[^\d+]/g, ''),

      // мобильное меню
      menuDisplay: this.state.menuOpen ? 'flex' : 'none',
      toggleMenu:  () => this.setState(s => ({ menuOpen: !s.menuOpen })),

      // активный раздел
      isHome:         view === 'home',
      isCatalog:      view === 'catalog',
      isAbout:        view === 'about',
      isDistributors: view === 'distributors',
      isContacts:     view === 'contacts',
      isProduct:      view === 'product',
      isA2600,
      isGenericProduct: view === 'product' && selected && selected.slug !== 'videosystem-a-2600',
      showProcurement:  this.props.showProcurement !== false,

      // герой
      heroTitle:   this.props.heroTitle   || 'РуСкейп А-2600',
      heroTagline: this.props.heroTagline || 'Первая гибридная видеоэндоскопическая система российского производства.',
      curTitle: cur.t,
      curSub:   cur.s,
      op0: idx === 0 ? 1 : 0,
      op1: idx === 1 ? 1 : 0,
      op2: idx === 2 ? 1 : 0,
      op3: idx === 3 ? 1 : 0,
      op4: idx === 4 ? 1 : 0,
      slideDots,
      next: () => this.setState(s => ({ slide: (s.slide + 1) % sl.length })),
      prev: () => this.setState(s => ({ slide: (s.slide - 1 + sl.length) % sl.length })),

      // открытие карточек каталога
      openVideosystem: () => this.openProduct('videosystem-a-2600'),
      openTrolley:     () => this.openProduct('trolley-t-2000'),
      openCo2:         () => this.openProduct('co2-insufflator'),
      openIrrigator:   () => this.openProduct('irrigator'),
      openSink1:       () => this.openProduct('sink-1'),
      openSink2:       () => this.openProduct('sink-2'),
      openWater:       () => this.openProduct('water-treatment-system'),

      // выбранный товар (generic)
      selName:     selected ? selected.name     : '',
      selTagline:  selected ? selected.tagline  : '',
      selDesc:     selected ? selected.desc     : '',
      selImg:      selected ? selected.img      : '',
      selHasImg:   !!(selected && selected.img),
      selNoImg:    !!(selected && !selected.img),
      selFeatures: selected ? selected.features : [],

      // дистрибьюторы
      distributors: this.distributors(),

      // форма
      fName:    this.state.form.name,
      fPhone:   this.state.form.phone,
      fEmail:   this.state.form.email,
      fMessage: this.state.form.message,
      setName:    (e) => this.setField('name',    e.target.value),
      setPhone: (e) => {
        let raw = e.target.value.replace(/\D/g, '');
        if (raw.startsWith('7') || raw.startsWith('8')) raw = raw.slice(1);
        raw = raw.slice(0, 10);
        if (raw.length === 0) { this.setField('phone', ''); return; }
        let m = '+7';
        if (raw.length <= 3)       m += ' (' + raw;
        else if (raw.length <= 6)  m += ' (' + raw.slice(0,3) + ') ' + raw.slice(3);
        else if (raw.length <= 8)  m += ' (' + raw.slice(0,3) + ') ' + raw.slice(3,6) + '-' + raw.slice(6);
        else                       m += ' (' + raw.slice(0,3) + ') ' + raw.slice(3,6) + '-' + raw.slice(6,8) + '-' + raw.slice(8);
        this.setField('phone', m);
      },
      setEmail:   (e) => this.setField('email',   e.target.value),
      setMessage: (e) => this.setField('message', e.target.value),
      submit:    (e)  => this.submit(e),
      resetForm: ()   => this.setState({ form: { name: '', phone: '', email: '', message: '' }, formSent: false, sendError: '' }),
      formSent:    this.state.formSent,
      formNotSent: !this.state.formSent,
      sending:     this.state.sending,
      sendError:   this.state.sendError,
      submitLabel: this.state.sending ? 'Отправка…' : 'Отправить заявку',
      submitOpacity: this.state.sending ? '0.65' : '1',
      errName:    this.state.errName,
      errContact: this.state.errContact,
      errMessage: this.state.errMessage,
      nameBorder:    this.state.errName    ? '#E3A8A4' : '#D8DEDE',
      contactBorder: this.state.errContact ? '#E3A8A4' : '#D8DEDE',
      messageBorder: this.state.errMessage ? '#E3A8A4' : '#D8DEDE',
    };
  }
}
