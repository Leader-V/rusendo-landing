// Конфигурация фронтенда, подставляемая в сборку из .env (см. .env.example).
// Доступна в шаблонах как {{ config.* }}.
module.exports = function () {
  return {
    // URL эндпоинта email-backend (POST /api/contact)
    contactApiUrl: process.env.CONTACT_API_URL || "http://localhost:3000/api/contact",
    // X-API-Key — заполняется, только если на бэкенде задан API_KEY
    contactApiKey: process.env.CONTACT_API_KEY || "",
  };
};
