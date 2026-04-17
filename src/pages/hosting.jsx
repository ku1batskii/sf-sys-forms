import Questionnaire from "../components/Questionnaire"

const BLOCKS = [
{
id: 1, num: “01”, title: “Бизнес”,
respondent: “Шеф / Заказчик”, tag: “ЛПР”,
questions: [
{
id: “1.1”, text: “Формат продукта”, hint: “Это определяет глубину разработки”,
type: “single”,
options: [“Новый бренд (отдельный бизнес)”, “Подпродукт текущего бизнеса”, “Тестовая гипотеза (MVP)”],
},
{
id: “1.2”, text: “Целевая аудитория — расставьте приоритет (1 = главный)”, hint: “Без приоритета — продукт распадается”,
type: “rank”,
options: [“Разработчики”, “SMB (малый бизнес)”, “Энтерпрайз”, “Реселлеры”],
},
{
id: “1.3”, text: “Старт”,
type: “single”,
options: [“Уже есть клиенты”],
optionAlt: “Нет клиентов (нужно привлекать с нуля)”,
extras: [{ label: “Сколько клиентов:”, key: “1.3_count” }],
},
{
id: “1.4”, text: “План загрузки — сколько платящих клиентов”, hint: “Если не может ответить → бизнес не готов”,
type: “multifield”,
fields: [
{ label: “1 месяц:”, key: “1.4_m1”, placeholder: “***” },
{ label: “3 месяц:”, key: “1.4_m3”, placeholder: “***” },
],
},
{
id: “1.5”, text: “Модель дохода”,
type: “single”,
options: [“Подписка (ежемесячно)”, “Разовая оплата”, “Комбинированная”],
},
{
id: “1.6”, text: “География”, hint: “Влияет на оплату, язык, юрку”,
type: “single”,
options: [“Только РФ”, “СНГ”, “Глобально”],
},
{
id: “1.7”, text: “Конкурент — укажите 1–2”, hint: “Без этого нельзя делать UX и цену”,
type: “multifield”,
fields: [
{ label: “Основной:”, key: “1.7_main”, placeholder: “***” },
{ label: “Вторичный:”, key: “1.7_sec”, placeholder: “***” },
],
},
],
},
{
id: 2, num: “02”, title: “Техника”,
respondent: “Vlad”, tag: “CTO”,
questions: [
{
id: “2.1”, text: “Железо — реальный capacity”, hint: “Считаем предел бизнеса”,
type: “multifield”,
fields: [
{ label: “Кол-во серверов:”, key: “2.1_srv”, placeholder: “***” },
{ label: “Средняя VM на сервер:”, key: “2.1_vm”, placeholder: “***” },
],
},
{
id: “2.2”, text: “Архитектура”,
type: “single”,
options: [“Один нод”, “Кластер”],
},
{
id: “2.3”, text: “WHMCS”, hint: “Если этого нет — автодеплой невозможен”, critical: true,
type: “multifield”,
fields: [
{ label: “Версия:”, key: “2.3_ver”, placeholder: “***” },
{ label: “Лицензия:”, key: “2.3_lic”, placeholder: “owned / leased” },
{ label: “Модуль Proxmox:”, key: “2.3_mod”, placeholder: “название/версия” },
],
},
{
id: “2.4”, text: “ОС шаблоны в Proxmox”, critical: true,
type: “multi”,
options: [“Ubuntu”, “Debian”, “Windows”],
extra: { label: “Другое:”, key: “2.4_other” },
},
{
id: “2.5”, text: “Сеть”,
type: “multi”,
options: [“IPv4”, “IPv6”],
},
{
id: “2.6”, text: “DDoS-защита”,
type: “single”,
options: [“Нет”, “Базовая”, “Провайдерская”, “Отдельное решение”],
},
{
id: “2.7”, text: “API наружу”, hint: “Вопрос на будущее масштабирование”,
type: “single”,
options: [“Не нужен”],
optionAlt: “Нужен”,
extras: [{ label: “Для кого:”, key: “2.7_who” }],
},
],
},
{
id: 3, num: “03”, title: “Операционка”,
respondent: “Dima”, tag: “OPS”,
questions: [
{
id: “3.1”, text: “Поддержка”,
type: “multifield”,
fields: [
{ label: “Кто отвечает:”, key: “3.1_who”, placeholder: “***” },
{ label: “SLA (время ответа, мин):”, key: “3.1_sla”, placeholder: “***” },
],
},
{
id: “3.2”, text: “Каналы поддержки”,
type: “multi”,
options: [“WHMCS”, “Telegram”, “Email”],
},
{
id: “3.3”, text: “Управление VPS клиентом”,
type: “single”,
options: [“Только через WHMCS”, “Отдельная панель”, “Минимальный функционал (reboot, пароль)”],
},
{
id: “3.4”, text: “Онбординг после деплоя”,
type: “single”,
options: [“Автоматический”, “Ручной”, “Не нужен”],
},
{
id: “3.5”, text: “Неоплата”,
type: “single”,
options: [“Автоматическое отключение”, “Ручной контроль”],
},
],
},
{
id: 4, num: “04”, title: “Сайт”,
respondent: “Eduard + Шеф”, tag: “СОВМЕСТНО”,
questions: [
{
id: “4.1”, text: “Архитектура UI”, hint: “Это 10x разница в стоимости”, critical: true,
type: “single”,
options: [“WHMCS шаблон”, “Кастомный UI поверх API”],
},
{
id: “4.2”, text: “Модель продажи”,
type: “single”,
options: [“Фикс тарифы”, “Конфигуратор (CPU / RAM / SSD)”],
},
{
id: “4.3”, text: “Приоритет UX”,
type: “single”,
options: [“Desktop-first”, “Mobile-first”],
},
{
id: “4.4”, text: “Язык интерфейса”,
type: “single”,
options: [“RU”, “RU + EN”],
},
{
id: “4.5”, text: “SEO”,
type: “single”,
options: [“Не нужен”, “Нужен (блог, статьи)”],
},
],
},
{
id: 5, num: “05”, title: “Деньги и риск”,
respondent: “Шеф + Eduard”, tag: “КОММЕРЦИЯ”,
questions: [
{
id: “5.1”, text: “Дедлайн”, hint: “Если причины нет → дедлайн фейковый”, critical: true,
type: “multifield”,
fields: [
{ label: “Дата:”, key: “5.1_date”, placeholder: “дд.мм.гггг” },
{ label: “Причина:”, key: “5.1_why”, placeholder: “***” },
],
},
{
id: “5.2”, text: “Формат запуска”,
type: “single”,
options: [“MVP (3 услуги)”, “Полный запуск”],
},
{
id: “5.3”, text: “Бюджет”, critical: true,
type: “single”,
options: [“Гибкий”],
optionAlt: “Фикс”,
extras: [{ label: “Сумма:”, key: “5.3_sum” }],
},
{
id: “5.4”, text: “ЛПР — кто принимает результат”,
type: “multifield”,
fields: [
{ label: “Имя:”, key: “5.4_name”, placeholder: “***” },
{ label: “Роль:”, key: “5.4_role”, placeholder: “***” },
],
},
{
id: “5.5”, text: “История — были попытки запустить?”,
type: “single”,
options: [“Нет”],
optionAlt: “Да”,
extras: [{ label: “Почему провал:”, key: “5.5_why” }],
},
],
},
]

const CRITICAL_IDS = [“2.3”, “2.4”, “4.1”, “5.1”, “5.3”]

export default function Hosting() {
return (
<Questionnaire
title="Хостинг-платформа с автодеплоем"
blocks={BLOCKS}
criticalIds={CRITICAL_IDS}
dbPath="hosting"
/>
)
}