# Rusendo — лендинг

Статический лендинг на [Eleventy (11ty)](https://www.11ty.dev/) v3. Сборка `npm run build` генерирует готовый сайт в папку `_site/` (чистый HTML/CSS/JS, без бэкенда). Node нужен только для сборки — на проде nginx раздаёт статику.

## Форма обратной связи (email-backend)

Форма на странице «Контакты» отправляет заявки в отдельный сервис
[`email-backend`](../email-backendAPI) (`POST /api/contact`), который шлёт письмо
оператору. Адрес сервиса и ключ доступа конфигурируются через `.env`:

```bash
cp .env.example .env
```

```ini
# URL эндпоинта email-backend сервиса (POST /api/contact)
CONTACT_API_URL=https://api.rus-endo.ru/api/contact
# X-API-Key — заполняется, ТОЛЬКО если на бэкенде задан API_KEY
CONTACT_API_KEY=
```

> ⚠️ **Это статический сайт — значения подставляются на этапе сборки** и
> «запекаются» в `index.html`. После изменения `.env` сайт нужно **пересобрать**
> (`npm run build`), иначе в HTML останутся старые значения.

Как это работает: `.env` → `process.env` (через `dotenv` в `.eleventy.js`) →
глобальные данные Eleventy (`src/_data/config.js`) → инлайн-скрипт
`window.RUSENDO_CONFIG` в `src/_includes/layouts/base.njk`. Если `.env` нет,
используются значения по умолчанию (`http://localhost:3000/api/contact`).

**Про безопасность:**
- `CONTACT_API_KEY` после сборки виден в исходном коде страницы (это неизбежно
  для статики), поэтому это лишь лёгкая защита от случайных запросов, **не
  секрет**. Основная защита от спама — на стороне бэкенда: `CORS_ORIGIN`
  (привязка к домену лендинга) и rate-limit.
- На бэкенде в `CORS_ORIGIN` обязательно укажите домен лендинга
  (`https://rus-endo.ru,https://www.rus-endo.ru`), иначе браузер заблокирует
  запрос. Для локальной разработки — `http://localhost:8080`.
- `.env` уже в `.gitignore` и в репозиторий не попадает.

## Развёртывание через nginx (сборка на сервере)

### 1. Собрать сайт на сервере

```bash
git clone https://github.com/Leader-V/rusendo-landing.git /opt/rusendo-landing
```
! Перед деплоем убрать строку !

```
<meta name="robots" content="noindex, nofollow">
```

из `src/_includes/layouts/base.njk`, иначе сайт не будет индексироваться поисковиками.

Настроить адрес email-backend для формы обратной связи (см. раздел
[«Форма обратной связи»](#форма-обратной-связи-email-backend)):

```bash
cp .env.example .env && nano .env   # указать CONTACT_API_URL (и CONTACT_API_KEY при наличии)
```

Сборка:

```bash
cd /opt/rusendo-landing && npm ci && npm run build
```

результат в `/opt/rusendo-landing/_site`

### 2. Конфиг nginx

`/etc/nginx/sites-available/rusendo`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name rusendo.ru www.rusendo.ru;   # ваш домен

    root /opt/rusendo-landing/_site;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Кэширование статики
    location ~* \.(?:css|js|jpg|jpeg|png|gif|ico|svg|woff2?)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Активировать:

```bash
sudo ln -s /etc/nginx/sites-available/rusendo /etc/nginx/sites-enabled/
sudo nginx -t        # проверка конфига
sudo systemctl reload nginx
```

### 3. HTTPS (рекомендуется)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d rusendo.ru -d www.rusendo.ru
```

Certbot сам пропишет 443-й server-блок и редирект http → https.

### Обновление сайта

```bash
cd /opt/rusendo-landing && git pull && npm ci && npm run build
```

`_site/` пересобирается на месте — перезагрузка nginx не требуется.

## Локальная разработка

```bash
npm ci
npm start        # дев-сервер с авто-перезагрузкой
```

## Сборка

```bash
npm run build    # результат в _site/
```
