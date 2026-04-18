import Questionnaire from "../components/Questionnaire"
const BLOCKS = [
// ─── 01 ПРОФИЛЬ КЛИЕНТА ───────────────────────────────────────
{
id: 1, num: “01”, title: “Профиль клиента”,
respondent: “Шеф / Заказчик”, tag: “ЛПР”,
questions: [
{
id: “1.1”, critical: true,
text: “Один реальный клиент из целевого сегмента”,
hint: “Конкретного человека или компанию — не абстрактный сегмент. Если не можете заполнить — идите разговаривать с 5–10 живыми людьми из сегмента”,
type: “multifield”,
fields: [
{ label: “Имя / название компании:”, key: “1.1_name”, placeholder: “ООО Ромашка / Иван Петров” },
{ label: “Кто принимает решение:”, key: “1.1_role”, placeholder: “CTO / системный администратор / директор” },
{ label: “Сотрудников / оборот:”, key: “1.1_size”, placeholder: “15 человек / 5 млн в месяц” },
{ label: “Что покупает сейчас и у кого:”, key: “1.1_current”, placeholder: “VPS на Timeweb за 800₽/мес” },
{ label: “Сколько тратит в месяц (₽):”, key: “1.1_spend”, placeholder: “***” },
{ label: “Главная боль с текущим решением:”, key: “1.1_pain”, placeholder: “Одна — самая острая” },
{ label: “Откуда он придёт к вам:”, key: “1.1_source”, placeholder: “Реферал от sf-sys / поиск / Хабр…” },
],
},
{
id: “1.2”, critical: true,
text: “Негативное определение — кто НЕ ваш клиент”,
hint: “Принцип 1: негативное определение важнее позитивного”,
type: “multifield”,
fields: [
{ label: “Сегмент, который осознанно не берёте:”, key: “1.2_seg”, placeholder: “Физлица с pet-проектами / крупный корпоратив…” },
{ label: “Почему именно его не берёте:”, key: “1.2_why”, placeholder: “Причина, а не «не интересен»” },
{ label: “Что скажете такому клиенту при входящей заявке:”, key: “1.2_say”, placeholder: “***” },
],
},
{
id: “1.3”,
text: “Распределение фокуса между сегментами (сумма = 100%)”,
hint: “Не приоритеты. Именно проценты внимания, бюджета и продукта. Два фокуса = нет фокуса”,
type: “percent100”,
fields: [
{ label: “Малый бизнес (сайты, 1С, почта):”, key: “1.3_smb” },
{ label: “Разработчики / DevOps:”, key: “1.3_dev” },
{ label: “Реселлеры (веб-студии, агентства):”, key: “1.3_res” },
{ label: “Корпоратив (50+ сотрудников):”, key: “1.3_corp” },
{ label: “Другое:”, key: “1.3_other” },
],
},
{
id: “1.4”,
text: “Откуда придут первые клиенты”,
type: “multifield”,
fields: [
{ label: “Источник №1 (канал привлечения):”, key: “1.4_ch”, placeholder: “SEO / реферал sf-sys / холодный обзвон…” },
{ label: “Ожидаемая конверсия (%):”, key: “1.4_conv”, placeholder: “***” },
{ label: “Стоимость одного лида (₽):”, key: “1.4_cac”, placeholder: “***” },
{ label: “Есть протестированный опыт на этом канале:”, key: “1.4_exp”, placeholder: “Да / Нет” },
],
},
{
id: “1.5”,
text: “География — разделяйте по странам”,
hint: “«РФ + СНГ» — это не рынок, это набор рынков”,
type: “multifield”,
fields: [
{ label: “Россия (основные города):”, key: “1.5_ru”, placeholder: “Москва, СПб, региональные центры” },
{ label: “Казахстан (как принимаем платежи):”, key: “1.5_kz”, placeholder: “да / нет” },
{ label: “Беларусь (юр. аспекты):”, key: “1.5_by”, placeholder: “да / нет” },
{ label: “Другие страны СНГ:”, key: “1.5_sng”, placeholder: “***” },
{ label: “Дальнее зарубежье:”, key: “1.5_world”, placeholder: “***” },
],
},
],
},

// ─── 02 ПОЗИЦИОНИРОВАНИЕ И СМЫСЛЫ ────────────────────────────
{
id: 2, num: “02”, title: “Позиционирование”,
respondent: “Шеф”, tag: “СМЫСЛЫ”,
questions: [
{
id: “2.1”, critical: true,
text: “Принудительный выбор стратегии дифференциации”,
hint: “Выберите ОДНУ позицию. Остальное — не ваш продукт”,
type: “single”,
options: [
“Самый дешёвый на рынке (ценовая война)”,
“Самый быстрый по железу и сети (производительность)”,
“Самая человеческая и быстрая поддержка (сервис)”,
“Самая узкая специализация (только 1С / WordPress / ML)”,
“Самые глубокие интеграции (API, DevOps-дружелюбность)”,
“Самая высокая безопасность / compliance (ФЗ-152, ГОСТ, КИИ)”,
],
},
{
id: “2.2”, critical: true,
text: “Одно предложение без шаблонных слов”,
hint: “Нельзя использовать: «качественный», «надёжный», «современный», «передовой», «инновационный», «удобный»”,
type: “multifield”,
fields: [
{ label: “Наш хостинг — это единственный, где:”, key: “2.2_phrase”, placeholder: “конкретное отличие с измеримым фактом” },
],
},
{
id: “2.3”,
text: “Топ-3 причины выбрать вас вместо Timeweb / Selectel / Beget”,
hint: “Для каждой причины — измеримый факт, не оценка”,
type: “multifield”,
fields: [
{ label: “Причина 1 (с фактом):”, key: “2.3_r1”, placeholder: “Реакция поддержки за 5 мин vs 2 часа у Timeweb” },
{ label: “Причина 2 (с фактом):”, key: “2.3_r2”, placeholder: “***” },
{ label: “Причина 3 (с фактом):”, key: “2.3_r3”, placeholder: “***” },
],
},
{
id: “2.4”, critical: true,
text: “Бренд-донор — актив или обязательство”,
hint: “Компания по пожарной безопасности не должна продавать VPS под тем же именем — это когнитивный разрыв”,
type: “multifield”,
fields: [
{ label: “Имя бренда-донора:”, key: “2.4_name”, placeholder: “Безопасные Системы / sf-sys” },
{ label: “Чем донор ПОМОГАЕТ (какая репутация переносится):”, key: “2.4_helps”, placeholder: “***” },
{ label: “Чем донор МЕШАЕТ (какие ассоциации вредят):”, key: “2.4_hurts”, placeholder: “***” },
{ label: “Решение:”, key: “2.4_decision”, placeholder: “Сохранить связь / отделить / новый бренд” },
],
},
{
id: “2.5”,
text: “Что нельзя говорить про продукт”,
type: “multifield”,
fields: [
{ label: “Нельзя говорить клиенту:”, key: “2.5_client”, placeholder: “***” },
{ label: “Нельзя говорить внутри команды (самообман):”, key: “2.5_team”, placeholder: “***” },
{ label: “Причина этих ограничений:”, key: “2.5_why”, placeholder: “___” },
],
},
{
id: “2.6”,
text: “Тон коммуникации”,
type: “single”,
options: [
“Дружелюбный и простой (для бизнеса)”,
“Технический и точный (для DevOps)”,
“Премиальный и сдержанный (для корп)”,
“Дерзкий и контркультурный (против корпоратов)”,
],
},
],
},

// ─── 03 ЮНИТ-ЭКОНОМИКА ───────────────────────────────────────
{
id: 3, num: “03”, title: “Юнит-экономика”,
respondent: “Шеф”, tag: “ДЕНЬГИ”,
questions: [
{
id: “3.1”, critical: true,
text: “Базовые метрики”,
hint: “LTV / CAC должен быть ≥ 3. Если меньше — система выдаст предупреждение”,
type: “multifield”,
fields: [
{ label: “ARPU — средняя выручка на клиента/мес (₽):”, key: “3.1_arpu”, placeholder: “***” },
{ label: “Допустимый CAC — стоимость привлечения (₽):”, key: “3.1_cac”, placeholder: “***” },
{ label: “Целевой LTV (₽):”, key: “3.1_ltv”, placeholder: “***” },
{ label: “LTV / CAC (должно быть ≥ 3):”, key: “3.1_ratio”, placeholder: “***” },
{ label: “Допустимый месячный churn (%):”, key: “3.1_churn”, placeholder: “***” },
{ label: “Payback period (месяцев):”, key: “3.1_payback”, placeholder: “***” },
],
},
{
id: “3.2”,
text: “План загрузки с экономикой”,
type: “multifield”,
fields: [
{ label: “1 месяц — клиентов / MRR:”, key: “3.2_m1”, placeholder: “10 клиентов / 80 000₽” },
{ label: “3 месяца — клиентов / MRR:”, key: “3.2_m3”, placeholder: “***” },
{ label: “6 месяцев — клиентов / MRR:”, key: “3.2_m6”, placeholder: “***” },
{ label: “12 месяцев — клиентов / MRR:”, key: “3.2_m12”, placeholder: “***” },
{ label: “Точка безубыточности (клиентов):”, key: “3.2_break”, placeholder: “***” },
],
},
{
id: “3.3”,
text: “Структура дохода (сумма = 100%)”,
hint: “Распределите ожидаемую выручку”,
type: “percent100”,
fields: [
{ label: “Месячная подписка:”, key: “3.3_sub” },
{ label: “Годовая предоплата со скидкой:”, key: “3.3_year” },
{ label: “Setup fee / активация:”, key: “3.3_setup” },
{ label: “Допуслуги (миграция, бэкапы сверх тарифа):”, key: “3.3_extra” },
{ label: “Реселлерские / партнёрские:”, key: “3.3_resell” },
{ label: “Другое:”, key: “3.3_other” },
],
},
{
id: “3.4”,
text: “Точка смерти проекта”,
hint: “Без ответа на этот вопрос проект будет жить на деньгах основателя до истощения”,
type: “multifield”,
fields: [
{ label: “Какой месячный убыток выдерживаем (₽):”, key: “3.4_loss”, placeholder: “***” },
{ label: “Сколько месяцев выдерживаем:”, key: “3.4_months”, placeholder: “***” },
{ label: “Что происходит после этого срока:”, key: “3.4_after”, placeholder: “___” },
],
},
],
},

// ─── 04 КОНКУРЕНЦИЯ ───────────────────────────────────────────
{
id: 4, num: “04”, title: “Конкуренция”,
respondent: “Шеф”, tag: “РЫНОК”,
questions: [
{
id: “4.1”, critical: true,
text: “Карта конкурентов — минимум 3 прямых и 2 косвенных”,
type: “multifield”,
fields: [
{ label: “Прямой 1 — название / сила / слабость / цена VPS:”, key: “4.1_d1”, placeholder: “Timeweb / бренд, SEO / поддержка 2ч / от 299₽” },
{ label: “Прямой 2:”, key: “4.1_d2”, placeholder: “***” },
{ label: “Прямой 3:”, key: “4.1_d3”, placeholder: “***” },
{ label: “Косвенный 1 (альтернативное решение):”, key: “4.1_i1”, placeholder: “AWS / собственный сервер в офисе” },
{ label: “Косвенный 2:”, key: “4.1_i2”, placeholder: “***” },
{ label: “Где вы обгоняете каждого из прямых:”, key: “4.1_win”, placeholder: “***” },
],
},
{
id: “4.2”,
text: “Прошлый опыт клиента с конкурентами”,
type: “multifield”,
fields: [
{ label: “Почему клиенты уходят от Timeweb / Selectel / Beget:”, key: “4.2_why”, placeholder: “***” },
{ label: “Что они не нашли там, но ищут у вас:”, key: “4.2_need”, placeholder: “***” },
{ label: “Есть доказательства (интервью, метрики):”, key: “4.2_proof”, placeholder: “Да — ссылка / Нет” },
],
},
{
id: “4.3”,
text: “Ценовое позиционирование”,
hint: “Обоснуйте выбор”,
type: “single”,
options: [
“На 20%+ дешевле рынка”,
“В рынке (±10% от среднего)”,
“На 20%+ дороже рынка”,
],
extras: [{ label: “Обоснование:”, key: “4.3_why” }],
optionAlt: “На 20%+ дороже рынка”,
},
],
},

// ─── 05 ПРОДУКТ И ТЕХНИКА ─────────────────────────────────────
{
id: 5, num: “05”, title: “Продукт и техника”,
respondent: “Vlad”, tag: “CTO”,
questions: [
{
id: “5.1”,
text: “Железо и capacity”,
type: “multifield”,
fields: [
{ label: “Кол-во физических серверов:”, key: “5.1_srv”, placeholder: “***” },
{ label: “Средняя плотность VM на сервер:”, key: “5.1_vm”, placeholder: “***” },
{ label: “Итого VM на старте:”, key: “5.1_total”, placeholder: “***” },
{ label: “Резерв на рост (%):”, key: “5.1_reserve”, placeholder: “20% / 30%” },
],
},
{
id: “5.2”,
text: “Архитектура”,
type: “multi”,
options: [“Одиночный сервер”, “Кластер (несколько нодов)”, “Геораспределённая инфраструктура”],
extra: { label: “HA на старте / live-миграция VM:”, key: “5.2_ha” },
},
{
id: “5.3”, critical: true,
text: “WHMCS”,
hint: “Без этого автодеплой невозможен”,
type: “multifield”,
fields: [
{ label: “Версия:”, key: “5.3_ver”, placeholder: “***” },
{ label: “Тип лицензии:”, key: “5.3_lic”, placeholder: “owned / monthly” },
{ label: “Модуль Proxmox (название и версия):”, key: “5.3_mod”, placeholder: “***” },
{ label: “Кто настраивает и поддерживает:”, key: “5.3_who”, placeholder: “***” },
{ label: “План если WHMCS ломается:”, key: “5.3_plan”, placeholder: “***” },
],
},
{
id: “5.4”, critical: true,
text: “ОС-шаблоны в Proxmox — по версиям, не общими словами”,
type: “multifield”,
fields: [
{ label: “Windows Server (какие версии):”, key: “5.4_win”, placeholder: “2019, 2022” },
{ label: “Debian / Ubuntu (какие LTS):”, key: “5.4_deb”, placeholder: “Ubuntu 22.04, 24.04 / Debian 12” },
{ label: “CentOS / AlmaLinux / Rocky:”, key: “5.4_cent”, placeholder: “AlmaLinux 9” },
{ label: “Специализированные образы:”, key: “5.4_spec”, placeholder: “WordPress / 1C / Bitrix / нет” },
],
},
{
id: “5.5”,
text: “Датацентр”,
hint: “⚠ Tier III = 99.982% uptime. Заявлять Tier III и SLA 99.5% — противоречие”,
type: “multifield”,
fields: [
{ label: “Город / провайдер ДЦ:”, key: “5.5_dc”, placeholder: “Москва, Selectel / собственный” },
{ label: “Tier уровень (с пруфом):”, key: “5.5_tier”, placeholder: “Tier 2 / Tier 3 + ссылка на сертификат” },
{ label: “SLA ДЦ на uptime:”, key: “5.5_dc_sla”, placeholder: “99.982%” },
{ label: “Ваш SLA клиенту (должен быть ≤ SLA ДЦ):”, key: “5.5_sla”, placeholder: “99.9%” },
{ label: “Резервный ДЦ:”, key: “5.5_backup”, placeholder: “есть / нет” },
],
},
{
id: “5.6”,
text: “Сеть”,
type: “multifield”,
fields: [
{ label: “IPv4 в базовом тарифе (шт.):”, key: “5.6_ipv4”, placeholder: “1” },
{ label: “IPv6 (да/нет, размер подсети):”, key: “5.6_ipv6”, placeholder: “да / /64” },
{ label: “Аплинки ДЦ (Гбит/с):”, key: “5.6_uplink”, placeholder: “10 / 40” },
{ label: “Полоса на сервер (Гбит/с):”, key: “5.6_bw”, placeholder: “1” },
{ label: “Включённый трафик в тарифе (ТБ):”, key: “5.6_traffic”, placeholder: “безлимит / 1 ТБ” },
{ label: “Цена за превышение (₽/ТБ):”, key: “5.6_overage”, placeholder: “***” },
],
},
{
id: “5.7”,
text: “DDoS-защита”,
type: “multifield”,
fields: [
{ label: “Уровень защиты (L3/L4 / L7):”, key: “5.7_level”, placeholder: “L3/L4” },
{ label: “До скольких Гбит/с:”, key: “5.7_gbps”, placeholder: “10 / 100” },
{ label: “Режим (автоскраб / ручной / по запросу):”, key: “5.7_mode”, placeholder: “___” },
{ label: “Включено в базу или опция:”, key: “5.7_inc”, placeholder: “включено / +500₽/мес” },
{ label: “Провайдер защиты:”, key: “5.7_vendor”, placeholder: “своя / ДЦ / Qrator / DDoS-Guard” },
],
},
{
id: “5.8”,
text: “Бэкапы”,
type: “multifield”,
fields: [
{ label: “Включены в тариф:”, key: “5.8_inc”, placeholder: “да / нет / платная опция” },
{ label: “Периодичность:”, key: “5.8_freq”, placeholder: “ежедневно / еженедельно” },
{ label: “Глубина хранения:”, key: “5.8_depth”, placeholder: “7 дней / 30 дней” },
{ label: “RPO (допустимая потеря данных, часов):”, key: “5.8_rpo”, placeholder: “24ч / 1ч” },
{ label: “RTO (допустимое время восстановления, часов):”, key: “5.8_rto”, placeholder: “4ч” },
{ label: “Клиент может восстанавливать сам через панель:”, key: “5.8_self”, placeholder: “да / нет” },
{ label: “Георезервирование:”, key: “5.8_geo”, placeholder: “да / нет” },
],
},
{
id: “5.9”,
text: “API”,
hint: “Если DevOps в сегментах ≥ 20% (блок 01) — API на старте обязателен”,
type: “multifield”,
fields: [
{ label: “API на старте:”, key: “5.9_ready”, placeholder: “да / нет” },
{ label: “Если нет — когда появится:”, key: “5.9_when”, placeholder: “через 2 мес / не планируем” },
{ label: “Что можно делать через API:”, key: “5.9_scope”, placeholder: “создание VM / биллинг / мониторинг” },
{ label: “Документация:”, key: “5.9_docs”, placeholder: “Swagger / OpenAPI / своя / нет” },
],
},
],
},

// ─── 06 ОПЕРАЦИОНКА И ПОДДЕРЖКА ──────────────────────────────
{
id: 6, num: “06”, title: “Операционка”,
respondent: “Dima”, tag: “OPS”,
questions: [
{
id: “6.1”, critical: true,
text: “Режим поддержки”,
hint: “Корпоратив без 24/7 — не корпоратив. Сверьте с сегментами из блока 01”,
type: “single”,
options: [
“9–18 будни (для малого бизнеса)”,
“Расширенный: 8–22 ежедневно”,
“24/7”,
],
extras: [{ label: “Кто дежурит ночью / стоимость ночной смены (₽/мес):”, key: “6.1_night” }],
optionAlt: “24/7”,
},
{
id: “6.2”, critical: true,
text: “SLA и компенсации”,
hint: “Формула компенсации — не «по ситуации»”,
type: “multifield”,
fields: [
{ label: “Время первой реакции (мин):”, key: “6.2_react”, placeholder: “15 / 30” },
{ label: “P1 / P2 / P3 (часы до решения):”, key: “6.2_p123”, placeholder: “4ч / 8ч / 24ч” },
{ label: “SLA по доступности (%):”, key: “6.2_sla”, placeholder: “99.9%” },
{ label: “Формула компенсации за простой:”, key: “6.2_comp”, placeholder: “+7 дней за каждый час сверх SLA” },
{ label: “Потолок компенсации (% от мес. платежа):”, key: “6.2_cap”, placeholder: “30%” },
{ label: “Процедура заявления компенсации:”, key: “6.2_proc”, placeholder: “тикет в течение 72ч после инцидента” },
],
},
{
id: “6.3”,
text: “Каналы поддержки”,
type: “multi”,
options: [“Тикеты WHMCS”, “Email”, “Telegram”, “Телефон”, “Чат на сайте”],
},
{
id: “6.4”,
text: “Онбординг нового клиента”,
type: “multifield”,
fields: [
{ label: “Автоматическое письмо после оплаты (контент):”, key: “6.4_email”, placeholder: “инструкция по SSH + ссылки на доку” },
{ label: “Персональное сопровождение первые 7 дней:”, key: “6.4_hand”, placeholder: “да / нет” },
{ label: “Чек-лист первых настроек клиента:”, key: “6.4_check”, placeholder: “***” },
{ label: “Метрика успешного онбординга:”, key: “6.4_metric”, placeholder: “клиент задеплоил первый проект за 24ч” },
],
},
{
id: “6.5”,
text: “Миграция с других хостингов”,
hint: “Бесплатная миграция у Timeweb и Selectel — стандарт рынка. Платная = -30–50% конверсии”,
type: “multifield”,
fields: [
{ label: “Бесплатная / платная:”, key: “6.5_price”, placeholder: “бесплатная до X ГБ” },
{ label: “Лимит бесплатной (ГБ или кол-во сайтов):”, key: “6.5_limit”, placeholder: “50 ГБ / 3 сайта” },
{ label: “Сколько миграций в месяц без перегрузки:”, key: “6.5_cap”, placeholder: “***” },
{ label: “SLA на миграцию (часов от заявки до готово):”, key: “6.5_sla”, placeholder: “48ч” },
],
},
{
id: “6.6”,
text: “Неоплата и жизненный цикл услуги”,
type: “multifield”,
fields: [
{ label: “Grace period (дней):”, key: “6.6_grace”, placeholder: “7” },
{ label: “Что происходит в grace (уведомления, ограничения):”, key: “6.6_grace_act”, placeholder: “письма на 1/3/7 день, без ограничений” },
{ label: “Автосуспенд или ручной:”, key: “6.6_suspend”, placeholder: “авто через WHMCS” },
{ label: “Через сколько дней после суспенда — удаление данных:”, key: “6.6_delete”, placeholder: “30 дней” },
{ label: “Политика возврата средств:”, key: “6.6_refund”, placeholder: “14 дней с момента оплаты” },
{ label: “Как клиент выгружает данные после суспенда:”, key: “6.6_export”, placeholder: “___” },
],
},
],
},

// ─── 07 САЙТ И UX ────────────────────────────────────────────
{
id: 7, num: “07”, title: “Сайт и UX”,
respondent: “Eduard + Шеф”, tag: “СОВМЕСТНО”,
questions: [
{
id: “7.1”, critical: true,
text: “Архитектура UI”,
hint: “WHMCS-шаблон допустим только если позиционирование (2.1) — «самый дешёвый». Иначе он подрывает дифференциацию”,
type: “single”,
options: [
“WHMCS-шаблон (быстро, дёшево, ограниченно)”,
“Кастомный лендинг + WHMCS для биллинга”,
“Полностью кастомный фронт + WHMCS API”,
“Headless: свой фронт + свой биллинг”,
],
},
{
id: “7.2”, critical: true,
text: “Цели конверсии главной страницы (сумма = 100%)”,
hint: “Главная должна вести туда, где у вас максимум %. Если это «о компании» — вы делаете не то”,
type: “percent100”,
fields: [
{ label: “Купить тариф сразу:”, key: “7.2_buy” },
{ label: “Открыть конфигуратор / калькулятор:”, key: “7.2_conf” },
{ label: “Оставить заявку на консультацию:”, key: “7.2_lead” },
{ label: “Уйти читать кейсы / о компании:”, key: “7.2_read” },
{ label: “Просто изучить и уйти:”, key: “7.2_exit” },
],
},
{
id: “7.3”,
text: “Модель продажи тарифов”,
type: “single”,
options: [
“Фиксированные тарифы (S / M / L / XL)”,
“Конфигуратор (CPU / RAM / SSD отдельно)”,
“Оба варианта”,
],
},
{
id: “7.4”,
text: “Доверительные элементы — отметьте что реально есть и покажете на сайте”,
type: “multi”,
options: [
“Данные ДЦ с пруфами (Tier, сертификаты)”,
“SLA в цифрах на главной”,
“Публичная status page с uptime”,
“Кейсы реальных клиентов с логотипами”,
“Отзывы с верификацией”,
“Команда с именами и фото”,
“Реквизиты юр. лица и договор-оферта”,
“Сертификаты ФСТЭК / ФЗ-152 / ISO”,
],
},
{
id: “7.5”,
text: “Приоритет UX”,
hint: “B2B-покупка часто с рабочего ПК”,
type: “single”,
options: [“Mobile-first”, “Desktop-first (B2B-покупка часто с ПК)”, “Equal priority”],
},
{
id: “7.6”,
text: “Язык интерфейса”,
type: “single”,
options: [“Только русский”, “Русский + английский сразу”],
optionAlt: “Русский на старте, английский позже”,
extras: [{ label: “Через сколько месяцев:”, key: “7.6_when” }],
},
{
id: “7.7”,
text: “SEO и контент”,
hint: “Хостинг без SEO = 100% зависимость от платного трафика. Убивает юнит-экономику через 12 мес”,
type: “multifield”,
fields: [
{ label: “Блог на старте:”, key: “7.7_blog”, placeholder: “да / нет” },
{ label: “Кто пишет контент:”, key: “7.7_who”, placeholder: “***” },
{ label: “Бюджет на SEO в месяц (₽):”, key: “7.7_budget”, placeholder: “***” },
{ label: “План по органическому трафику через 12 мес:”, key: “7.7_plan”, placeholder: “X визитов / мес” },
],
},
{
id: “7.8”,
text: “Публичная status page”,
hint: “Отсутствие public status page в 2026 — красный флаг для любого технаря”,
type: “single”,
options: [“Есть на старте”, “Появится в течение 3 мес”, “Не планируется”],
},
],
},

// ─── 08 ПРАВОВОЙ КОНТУР ───────────────────────────────────────
{
id: 8, num: “08”, title: “Правовой контур”,
respondent: “Шеф”, tag: “ЮРИСТ”,
questions: [
{
id: “8.1”, critical: true,
text: “Юридическое оформление”,
type: “multifield”,
fields: [
{ label: “Юр. лицо / ИП:”, key: “8.1_entity”, placeholder: “ООО / ИП” },
{ label: “ОКВЭД (профильный для хостинга):”, key: “8.1_okved”, placeholder: “63.11 / 63.12” },
{ label: “Система налогообложения:”, key: “8.1_tax”, placeholder: “УСН 6% / ОСН” },
{ label: “Расчётный счёт (банк):”, key: “8.1_bank”, placeholder: “Тинькофф / Сбер” },
],
},
{
id: “8.2”, critical: true,
text: “Регистрация как хостинг-провайдера в реестре РКН”,
hint: “С декабря 2023 г. хостинг-провайдеры в РФ обязаны быть в реестре РКН. Работа без реестра — прямое нарушение”,
type: “single”,
options: [“Уже в реестре”, “Не в реестре — подаём в течение 30 дней”],
extras: [{ label: “Кто отвечает за взаимодействие с регулятором:”, key: “8.2_who” }],
optionAlt: “Не в реестре — подаём в течение 30 дней”,
},
{
id: “8.3”,
text: “ФЗ-152 и персональные данные”,
type: “multi”,
options: [
“Уведомление в РКН подано”,
“Политика обработки ПДн опубликована”,
“Согласие на обработку ПДн в форме регистрации”,
“Хранение ПДн на серверах в РФ (локализация)”,
],
},
{
id: “8.4”,
text: “Договорные документы”,
type: “multifield”,
fields: [
{ label: “Договор-оферта:”, key: “8.4_offer”, placeholder: “опубликован / в разработке” },
{ label: “Политика конфиденциальности:”, key: “8.4_priv”, placeholder: “есть / нет” },
{ label: “Политика допустимого использования (AUP):”, key: “8.4_aup”, placeholder: “есть / нет” },
{ label: “SLA как отдельный документ:”, key: “8.4_sla”, placeholder: “есть / нет” },
],
},
{
id: “8.5”,
text: “Юридические инструменты управления клиентами”,
type: “multifield”,
fields: [
{ label: “Процедура при запросе от правоохранителей:”, key: “8.5_law”, placeholder: “***” },
{ label: “Процедура при DMCA / жалобах на клиентский контент:”, key: “8.5_dmca”, placeholder: “***” },
{ label: “Чёрный список запрещённых применений:”, key: “8.5_ban”, placeholder: “майнинг / спам / фишинг / DDoS” },
],
},
],
},

// ─── 09 РИСКИ ─────────────────────────────────────────────────
{
id: 9, num: “09”, title: “Риски”,
respondent: “Шеф + Vlad”, tag: “РИСКИ”,
questions: [
{
id: “9.1”, critical: true,
text: “Топ-5 рисков которые убьют проект”,
hint: “Не «всё может пойти не так». Именно пять конкретных сценариев с вероятностью, ущербом и митигацией”,
type: “multifield”,
fields: [
{ label: “Риск 1 — описание / вероятность 1–5 / ущерб 1–5 / митигация:”, key: “9.1_r1”, placeholder: “Уход Влада / 3 / 5 / задокументировать все системы” },
{ label: “Риск 2:”, key: “9.1_r2”, placeholder: “***” },
{ label: “Риск 3:”, key: “9.1_r3”, placeholder: “***” },
{ label: “Риск 4:”, key: “9.1_r4”, placeholder: “***” },
{ label: “Риск 5:”, key: “9.1_r5”, placeholder: “***” },
],
},
{
id: “9.2”, critical: true,
text: “Критерий остановки проекта”,
hint: “Без критерия провала нет и критерия успеха. Без этого поля проект будет жить на деньгах основателя до истощения”,
type: “multifield”,
fields: [
{ label: “Что должно произойти чтобы закрыть проект:”, key: “9.2_crit”, placeholder: “Меньше X клиентов через 6 мес / убыток Y₽/мес подряд 3 мес” },
{ label: “Через сколько месяцев проверяем критерий:”, key: “9.2_when”, placeholder: “6 / 12” },
{ label: “Кто имеет право объявить остановку:”, key: “9.2_who”, placeholder: “***” },
],
},
{
id: “9.3”,
text: “Прошлые попытки (заполнять если были предыдущие попытки)”,
type: “multifield”,
fields: [
{ label: “Когда была предыдущая попытка:”, key: “9.3_when”, placeholder: “нет предыдущих / год” },
{ label: “До какого этапа дошли:”, key: “9.3_stage”, placeholder: “***” },
{ label: “3 главных причины провала:”, key: “9.3_why”, placeholder: “***” },
{ label: “Какие из причин устранены сейчас:”, key: “9.3_fixed”, placeholder: “***” },
{ label: “Какие всё ещё присутствуют:”, key: “9.3_remain”, placeholder: “***” },
],
},
{
id: “9.4”,
text: “Зависимости единой точки отказа”,
type: “multifield”,
fields: [
{ label: “Если уйдёт ключевой технический человек:”, key: “9.4_tech”, placeholder: “***” },
{ label: “Если ДЦ отзовёт услуги — план Б:”, key: “9.4_dc”, placeholder: “***” },
{ label: “Если WHMCS-лицензия будет отозвана — план Б:”, key: “9.4_whmcs”, placeholder: “***” },
{ label: “Если платёжный шлюз заблокируют — план Б:”, key: “9.4_pay”, placeholder: “___” },
],
},
],
},

// ─── 10 ДЕНЬГИ И СРОКИ ────────────────────────────────────────
{
id: 10, num: “10”, title: “Деньги и сроки”,
respondent: “Шеф + Eduard”, tag: “КОММЕРЦИЯ”,
questions: [
{
id: “10.1”, critical: true,
text: “Дедлайн”,
hint: “Если причины нет — дедлайн фейковый”,
type: “multifield”,
fields: [
{ label: “Дата запуска MVP:”, key: “10.1_date”, placeholder: “дд.мм.гггг” },
{ label: “Причина именно этой даты:”, key: “10.1_why”, placeholder: “конференция / договор с клиентом / конец квартала” },
{ label: “Допустимая задержка (недель):”, key: “10.1_slack”, placeholder: “2 / 4” },
{ label: “Что происходит при задержке больше допустимой:”, key: “10.1_over”, placeholder: “***” },
],
},
{
id: “10.2”, critical: true,
text: “Бюджет”,
type: “multifield”,
fields: [
{ label: “Бюджет на запуск до первой выручки (₽):”, key: “10.2_launch”, placeholder: “***” },
{ label: “Бюджет на первые 6 месяцев работы (₽):”, key: “10.2_run”, placeholder: “***” },
{ label: “Источник финансирования:”, key: “10.2_src”, placeholder: “свои / партнёрские / заёмные” },
{ label: “Условия возврата если заёмные:”, key: “10.2_terms”, placeholder: “***” },
],
},
{
id: “10.3”,
text: “Разделение бюджета запуска (сумма = 100%)”,
type: “percent100”,
fields: [
{ label: “Железо и инфраструктура:”, key: “10.3_infra” },
{ label: “ПО и лицензии (WHMCS, Proxmox, защита):”, key: “10.3_sw” },
{ label: “Сайт и UX:”, key: “10.3_site” },
{ label: “Маркетинг и первые лиды:”, key: “10.3_mkt” },
{ label: “Юр. оформление и регистрации:”, key: “10.3_legal” },
{ label: “ФОТ команды:”, key: “10.3_hr” },
{ label: “Резерв на непредвиденное:”, key: “10.3_reserve” },
],
},
{
id: “10.4”,
text: “Формат запуска”,
type: “single”,
options: [
“Soft launch (ограниченный круг знакомых, 5–10 клиентов)”,
“Closed beta (запись в wait-list, приглашения)”,
“Public launch (открытый сайт, реклама, PR)”,
],
extras: [{ label: “Критерий перехода между этапами:”, key: “10.4_criteria” }],
optionAlt: “Public launch (открытый сайт, реклама, PR)”,
},
{
id: “10.5”, critical: true,
text: “Процесс принятия решений”,
type: “multifield”,
fields: [
{ label: “ЛПР по стратегии (имя, роль):”, key: “10.5_str”, placeholder: “***” },
{ label: “ЛПР по бюджету (имя, роль):”, key: “10.5_bud”, placeholder: “***” },
{ label: “ЛПР по техническим решениям (имя, роль):”, key: “10.5_tech”, placeholder: “***” },
{ label: “Кто влияет без права вето:”, key: “10.5_inf”, placeholder: “***” },
{ label: “Кто может заблокировать запуск (право вето):”, key: “10.5_veto”, placeholder: “***” },
{ label: “Процедура разрешения конфликтов между ЛПР:”, key: “10.5_conf”, placeholder: “***” },
],
},
{
id: “10.6”,
text: “Поведение при выходе за рамки”,
type: “multifield”,
fields: [
{ label: “Если бюджет превышен на 20%:”, key: “10.6_bud”, placeholder: “стоп / обсуждаем / режем scope” },
{ label: “Если срок сдвигается на 1 месяц:”, key: “10.6_time”, placeholder: “***” },
{ label: “Если план по клиентам (3 мес) недовыполнен на 50%:”, key: “10.6_clients”, placeholder: “***” },
],
},
],
},
]

// КРИТ поля по SOP v2.0 — 20 штук
const CRITICAL_IDS = [
“1.1”, “1.2”,
“2.1”, “2.2”, “2.4”,
“3.1”,
“4.1”,
“5.3”, “5.4”,
“6.1”, “6.2”,
“7.1”, “7.2”,
“8.1”, “8.2”,
“9.1”, “9.2”,
“10.1”, “10.2”, “10.5”,
]

export default function Hosting() {
return (
<Questionnaire
title="Запуск хостинг-продукта"
blocks={BLOCKS}
criticalIds={CRITICAL_IDS}
dbPath="hosting"
/>
)
}