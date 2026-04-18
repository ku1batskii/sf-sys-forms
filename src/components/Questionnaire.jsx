import { useState, useEffect, useRef } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase";

const T = {
  ink: "#0a0f1c", ink2: "#1a2235", graphite: "#4a5568", mute: "#6b7280",
  hair: "#e5e7eb", paper: "#ffffff", snow: "#fafbfc", cream: "#f5f6f8",
  accent: "#2563eb", accentDark: "#1d4ed8", accentSoft: "#eff6ff",
  signal: "#10b981", danger: "#dc2626",
};
const mono = "'JetBrains Mono', monospace";
const display = "Manrope, sans-serif";
const body = "'Inter Tight', sans-serif";

const TAG_STYLES = [
  { bg: "#fef3c7", color: "#92400e" },
  { bg: "#eff6ff", color: "#1d4ed8" },
  { bg: "#d1fae5", color: "#065f46" },
  { bg: "#ede9fe", color: "#5b21b6" },
  { bg: "#fce7f3", color: "#9d174d" },
  { bg: "#fef3c7", color: "#92400e" },
];

const toFK = (key) => key.replace(/\./g, "__");
const fromFK = (key) => key.replace(/__/g, ".");

function isAnswered(q, answers) {
  if (q.type === "multifield") return q.fields.some(f => answers[f.key]?.trim());
  if (q.type === "percent100") return q.fields.some(f => answers[f.key]?.trim());
  if (q.type === "rank") return q.options.some((_, i) => answers[`${q.id}_rank_${i}`]?.trim());
  return !!answers[q.id]?.trim();
}

function getAnswerText(q, answers) {
  if (q.type === "multifield") {
    return q.fields.map(f => `${f.label} ${answers[f.key]?.trim() || "—"}`).join("\n");
  }
  if (q.type === "percent100") {
    const total = q.fields.reduce((s, f) => s + (parseInt(answers[f.key]) || 0), 0);
    return q.fields.map(f => `${f.label} ${answers[f.key] || "0"}%`).join("\n") + `\nИТОГО: ${total}%`;
  }
  if (q.type === "rank") {
    return q.options.map((o, i) => `[${answers[`${q.id}_rank_${i}`] || "—"}] ${o}`).join("\n");
  }
  if (q.type === "multi") {
    const selected = answers[q.id] ? answers[q.id].split("|") : [];
    return selected.length ? selected.join(", ") : "—";
  }
  return answers[q.id]?.trim() || "—";
}

function exportToPDF(title, blocks, answers, sessionId) {
  const date = new Date().toLocaleDateString("ru-RU");

  let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Опросник</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&family=Inter+Tight:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter Tight', sans-serif;
    color: #0a0f1c;
    background: #fff;
    padding: 40px;
    font-size: 13px;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 2px solid #0a0f1c;
    margin-bottom: 32px;
  }
  .header-left h1 {
    font-family: 'Manrope', sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 4px;
  }
  .header-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #6b7280;
  }
  .block {
    margin-bottom: 32px;
    page-break-inside: avoid;
  }
  .block-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: #0a0f1c;
    border-radius: 8px 8px 0 0;
    margin-bottom: 0;
  }
  .block-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #6b7280;
  }
  .block-title {
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
  }
  .block-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 100px;
    margin-left: auto;
  }
  .block-body {
    border: 1px solid #e5e7eb;
    border-top: none;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
  .question {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 12px;
  }
  .question:last-child { border-bottom: none; }
  .question.critical { background: #eff6ff; }
  .question.answered { background: #f0fdf4; }
  .q-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #6b7280;
    padding-top: 2px;
  }
  .q-id.critical-id { color: #2563eb; font-weight: 500; }
  .q-text {
    font-size: 12.5px;
    font-weight: 500;
    color: #1a2235;
    margin-bottom: 6px;
    line-height: 1.4;
  }
  .q-answer {
    font-size: 13px;
    color: #0a0f1c;
    white-space: pre-line;
    background: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    min-height: 32px;
  }
  .q-answer.empty {
    color: #9ca3af;
    font-style: italic;
  }
  .q-critical-badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #2563eb;
    border: 1px solid #2563eb;
    padding: 1px 5px;
    border-radius: 3px;
    margin-left: 6px;
    vertical-align: middle;
  }
  .summary {
    display: flex;
    gap: 24px;
    padding: 16px 20px;
    background: #f5f6f8;
    border-radius: 8px;
    margin-bottom: 32px;
  }
  .summary-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .summary-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .summary-value {
    font-family: 'Manrope', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0a0f1c;
  }
  .footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
  }
  @media print {
    body { padding: 24px; }
    .block { page-break-inside: avoid; }
    .no-print { display: none; }
  }
  .print-btn {
    display: block;
    margin: 0 auto 32px;
    padding: 12px 32px;
    background: #0a0f1c;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'Inter Tight', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: -0.01em;
  }
  .print-btn:hover { background: #2563eb; }
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">↓ Сохранить как PDF</button>

<div class="header">
  <div class="header-left">
    <h1>${title}</h1>
    <div class="header-meta">Опросник · Сессия: ${sessionId} · ${date}</div>
  </div>
  <div class="header-meta" style="text-align:right">KULBATSKII OS · SOP v1.2</div>
</div>
`;

  // Summary
  const totalQ = blocks.reduce((s, b) => s + b.questions.length, 0);
  const answeredCount = blocks.reduce((s, b) => s + b.questions.filter(q => isAnswered(q, answers)).length, 0);
  const pct = Math.round((answeredCount / totalQ) * 100);

  html += `
<div class="summary">
  <div class="summary-item">
    <span class="summary-label">Заполнено</span>
    <span class="summary-value">${answeredCount}/${totalQ}</span>
  </div>
  <div class="summary-item">
    <span class="summary-label">Прогресс</span>
    <span class="summary-value">${pct}%</span>
  </div>
  <div class="summary-item">
    <span class="summary-label">Блоков</span>
    <span class="summary-value">${blocks.length}</span>
  </div>
  <div class="summary-item">
    <span class="summary-label">Дата</span>
    <span class="summary-value" style="font-size:14px;padding-top:4px">${date}</span>
  </div>
</div>
`;

  blocks.forEach((b, bi) => {
    const ts = TAG_STYLES[bi % TAG_STYLES.length];
    html += `
<div class="block">
  <div class="block-header">
    <span class="block-num">${b.num}</span>
    <span class="block-title">${b.title}</span>
    <span class="block-tag" style="background:${ts.bg};color:${ts.color}">${b.tag}</span>
  </div>
  <div class="block-body">`;

    b.questions.forEach(q => {
      const answered = isAnswered(q, answers);
      const answerText = getAnswerText(q, answers);
      const isEmpty = answerText === "—";
      html += `
    <div class="question ${q.critical ? "critical" : ""} ${answered ? "answered" : ""}">
      <div class="q-id ${q.critical ? "critical-id" : ""}">${q.id}${q.critical ? "<br><span style='font-size:9px;color:#2563eb'>КРИТ</span>" : ""}</div>
      <div>
        <div class="q-text">${q.text}</div>
        <div class="q-answer ${isEmpty ? "empty" : ""}">${isEmpty ? "Не заполнено" : answerText}</div>
      </div>
    </div>`;
    });

    html += `</div></div>`;
  });

  html += `
<div class="footer">
  <span>KULBATSKII OS · SOP v1.2 · ${title}</span>
  <span>Сессия: ${sessionId} · ${date}</span>
</div>
</body>
</html>`;

  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
}

function SingleChoice({ q, answers, onChange }) {
  const selected = answers[q.id] || "";
  const all = q.optionAlt ? [...q.options, q.optionAlt] : q.options;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {all.map((opt, i) => {
        const active = selected === opt;
        const isAlt = opt === q.optionAlt;
        return (
          <div key={i}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "9px 12px", borderRadius: 8, border: `1px solid ${active ? T.accent : T.hair}`, background: active ? T.accentSoft : T.paper, transition: "all 0.15s" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${active ? T.accent : T.hair}`, background: active ? T.accent : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.paper }} />}
              </div>
              <input type="radio" name={q.id} value={opt} checked={active} onChange={() => onChange(q.id, opt)} style={{ display: "none" }} />
              <span style={{ fontSize: 14, color: active ? T.ink : T.ink2, fontWeight: active ? 500 : 400 }}>{opt}</span>
            </label>
            {active && isAlt && q.extras?.map(ex => (
              <input key={ex.key} value={answers[ex.key] || ""} onChange={e => onChange(ex.key, e.target.value)} placeholder={ex.label} style={{ marginTop: 6, marginLeft: 36, width: "calc(100% - 36px)", padding: "8px 12px", fontSize: 13.5, color: T.ink, background: T.paper, border: `1px solid ${T.hair}`, borderRadius: 8, fontFamily: body }} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function MultiChoice({ q, answers, onChange }) {
  const selected = answers[q.id] ? answers[q.id].split("|") : [];
  const toggle = opt => {
    const next = selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt];
    onChange(q.id, next.join("|"));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {q.options.map((opt, i) => {
        const active = selected.includes(opt);
        return (
          <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "9px 12px", borderRadius: 8, border: `1px solid ${active ? T.accent : T.hair}`, background: active ? T.accentSoft : T.paper, transition: "all 0.15s" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${active ? T.accent : T.hair}`, background: active ? T.accent : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {active && <span style={{ color: T.paper, fontSize: 10 }}>✓</span>}
            </div>
            <input type="checkbox" checked={active} onChange={() => toggle(opt)} style={{ display: "none" }} />
            <span style={{ fontSize: 14, color: active ? T.ink : T.ink2 }}>{opt}</span>
          </label>
        );
      })}
      {q.extra && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: T.mute, whiteSpace: "nowrap" }}>{q.extra.label}</span>
          <input value={answers[q.extra.key] || ""} onChange={e => onChange(q.extra.key, e.target.value)} placeholder="___" style={{ flex: 1, padding: "7px 10px", fontSize: 13.5, color: T.ink, background: T.paper, border: `1px solid ${T.hair}`, borderRadius: 8, fontFamily: body }} />
        </div>
      )}
    </div>
  );
}

function RankChoice({ q, answers, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {q.options.map((opt, i) => {
        const key = `${q.id}_rank_${i}`;
        const val = answers[key] || "";
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: `1px solid ${val ? T.accent : T.hair}`, background: val ? T.accentSoft : T.paper }}>
            <input type="number" min="1" max={q.options.length} value={val} onChange={e => onChange(key, e.target.value)} placeholder="—" style={{ width: 44, padding: "4px 8px", fontSize: 14, fontWeight: 600, fontFamily: mono, color: T.accent, background: T.paper, border: `1px solid ${T.hair}`, borderRadius: 6, textAlign: "center" }} />
            <span style={{ fontSize: 14, color: T.ink2 }}>{opt}</span>
          </div>
        );
      })}
      <div style={{ fontFamily: mono, fontSize: 11, color: T.mute }}>1 = самый важный</div>
    </div>
  );
}

function MultiField({ q, answers, onChange, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {q.fields.map(f => (
        <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: T.mute, flexShrink: 0, minWidth: isMobile ? "100%" : 160 }}>{f.label}</span>
          <input value={answers[f.key] || ""} onChange={e => onChange(f.key, e.target.value)} placeholder={f.placeholder} style={{ flex: 1, minWidth: 0, padding: "9px 13px", fontSize: 14, color: T.ink, background: T.paper, border: `1px solid ${answers[f.key]?.trim() ? T.accent : T.hair}`, borderRadius: 8, fontFamily: body, transition: "border-color 0.2s" }} />
        </div>
      ))}
    </div>
  );
}

function Percent100({ q, answers, onChange }) {
  const total = q.fields.reduce((s, f) => s + (parseInt(answers[f.key]) || 0), 0);
  const over = total > 100;
  const exact = total === 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {q.fields.map(f => (
        <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.mute, flex: 1, lineHeight: 1.3 }}>{f.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <input
              type="number" min="0" max="100"
              value={answers[f.key] || ""}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder="0"
              style={{ width: 60, padding: "7px 10px", fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: T.accent, background: T.paper, border: `1px solid ${answers[f.key]?.trim() ? T.accent : T.hair}`, borderRadius: 8, textAlign: "center" }}
            />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: T.mute }}>%</span>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 4, padding: "8px 12px", borderRadius: 8, background: exact ? "#f0fdf4" : over ? "#fef2f2" : T.cream, border: `1px solid ${exact ? T.signal : over ? T.danger : T.hair}` }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.mute }}>ИТОГО:</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 700, color: exact ? T.signal : over ? T.danger : T.ink }}>{total}%</span>
        {over && <span style={{ fontSize: 12, color: T.danger }}>↑ превышено</span>}
        {exact && <span style={{ fontSize: 12, color: T.signal }}>✓</span>}
        {!exact && !over && <span style={{ fontSize: 12, color: T.mute }}>нужно 100%</span>}
      </div>
    </div>
  );
}

function QInput({ q, answers, onChange, isMobile }) {
  if (q.type === "single")     return <SingleChoice q={q} answers={answers} onChange={onChange} isMobile={isMobile} />;
  if (q.type === "multi")      return <MultiChoice  q={q} answers={answers} onChange={onChange} isMobile={isMobile} />;
  if (q.type === "rank")       return <RankChoice   q={q} answers={answers} onChange={onChange} isMobile={isMobile} />;
  if (q.type === "multifield") return <MultiField   q={q} answers={answers} onChange={onChange} isMobile={isMobile} />;
  if (q.type === "percent100") return <Percent100   q={q} answers={answers} onChange={onChange} isMobile={isMobile} />;
  return null;
}

export default function Questionnaire({ title, blocks, criticalIds = [], dbPath }) {
  const sessionId = new URLSearchParams(window.location.search).get("role") || "user";
  const defaultBlock = blocks.findIndex(b => b.respondent?.toLowerCase().includes(sessionId.toLowerCase()));

  const [answers, setAnswers]           = useState({});
  const [activeBlock, setActiveBlock]   = useState(defaultBlock >= 0 ? defaultBlock : 0);
  const [isMobile, setIsMobile]         = useState(window.innerWidth < 768);
  const [synced, setSynced]             = useState(false);
  const [exported, setExported]         = useState(false);
  const dbRef = useRef(ref(db, `answers/${dbPath}/${sessionId}`));

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    onValue(dbRef.current, snap => {
      if (snap.exists()) {
        const raw = snap.val();
        const converted = {};
        Object.entries(raw).forEach(([k, v]) => { converted[fromFK(k)] = v; });
        setAnswers(converted);
      }
      setSynced(true);
    });
  }, []);

  const handleAnswer = (key, val) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    const firebaseData = {};
    Object.entries(updated).forEach(([k, v]) => { firebaseData[toFK(k)] = v; });
    set(dbRef.current, firebaseData);
  };

  const handleExport = () => {
    exportToPDF(title, blocks, answers, sessionId);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const totalQ        = blocks.reduce((s, b) => s + b.questions.length, 0);
  const answered      = blocks.reduce((s, b) => s + b.questions.filter(q => isAnswered(q, answers)).length, 0);
  const critDone      = criticalIds.filter(id => {
    const q = blocks.flatMap(b => b.questions).find(q => q.id === id);
    return q ? isAnswered(q, answers) : false;
  }).length;
  const progress      = Math.round((answered / totalQ) * 100);
  const block         = blocks[activeBlock];
  const blockAnswered = block.questions.filter(q => isAnswered(q, answers)).length;

  if (!synced) return (
    <div style={{ minHeight: "100vh", background: T.snow, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: body }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 13, color: T.mute, marginBottom: 8 }}>Загрузка...</div>
        <div style={{ width: 120, height: 3, background: T.hair, borderRadius: 2, overflow: "hidden", margin: "0 auto" }}>
          <div style={{ height: "100%", background: T.accent, borderRadius: 2, animation: "ld 1.2s ease-in-out infinite" }} />
        </div>
        <style>{`@keyframes ld{0%{width:0%}50%{width:80%}100%{width:100%}}`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.snow, fontFamily: body, color: T.ink, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Inter+Tight:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input,textarea{font-family:'Inter Tight',sans-serif;}
        input:focus,textarea:focus{outline:none;border-color:${T.accent}!important;box-shadow:0 0 0 3px rgba(37,99,235,0.12)!important;}
        button{cursor:pointer;font-family:inherit;}
        .sb-item{transition:background 0.15s;}
        .sb-item:hover{background:${T.cream}!important;}
        .tab-pill{transition:background 0.15s,border-color 0.15s;flex-shrink:0;}
        .tab-pill:hover{background:${T.cream}!important;}
        .btn-n{transition:background 0.15s,color 0.15s;}
        .btn-n:hover:not(:disabled){background:${T.ink}!important;color:#fff!important;}
        .btn-n:disabled{opacity:0.35;cursor:not-allowed;}
        .btn-e{transition:background 0.15s,transform 0.15s;}
        .btn-e:hover{background:${T.accent}!important;transform:translateY(-1px);}
        .btn-pdf{transition:background 0.15s,transform 0.15s,box-shadow 0.15s;}
        .btn-pdf:hover{background:${T.accentDark}!important;transform:translateY(-1px);box-shadow:0 8px 20px -6px rgba(37,99,235,0.4);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.35s cubic-bezier(0.2,0.8,0.2,1) both;}
        @keyframes pd{0%,100%{box-shadow:0 0 0 3px rgba(16,185,129,0.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,0.1)}}
        .pd{animation:pd 2s infinite;}
        .tabs{display:flex;gap:8px;overflow-x:auto;padding:10px 16px;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
        .tabs::-webkit-scrollbar{display:none;}
      `}</style>

      {/* Header */}
      <header style={{ position:"sticky",top:0,zIndex:50,background:"rgba(250,251,252,0.92)",backdropFilter:"saturate(180%) blur(12px)",WebkitBackdropFilter:"saturate(180%) blur(12px)",borderBottom:`1px solid ${T.hair}` }}>
        <div style={{ maxWidth:1100,margin:"0 auto",padding:`0 ${isMobile?"16px":"32px"}`,display:"flex",alignItems:"center",justifyContent:"space-between",height:isMobile?56:64,gap:12 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,minWidth:0 }}>
            <div style={{ width:26,height:26,borderRadius:7,background:T.ink,position:"relative",overflow:"hidden",flexShrink:0 }}>
              <div style={{ position:"absolute",inset:0,background:`linear-gradient(135deg,${T.accent} 0%,transparent 60%)` }} />
              <div style={{ position:"absolute",top:"50%",left:"50%",width:9,height:9,border:"1.5px solid #fff",borderRadius:"50%",transform:"translate(-50%,-50%)" }} />
            </div>
            <div>
              <div style={{ fontFamily:display,fontWeight:700,fontSize:isMobile?13:15,letterSpacing:"-0.02em",whiteSpace:"nowrap" }}>{title}</div>
              {!isMobile && <div style={{ fontFamily:mono,fontSize:11,color:T.mute }}>сессия: {sessionId}</div>}
            </div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:isMobile?8:16,flexShrink:0 }}>
            {criticalIds.length > 0 && (
              <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                <span style={{ fontFamily:mono,fontSize:isMobile?9:11,color:T.mute }}>КРИТ</span>
                <span style={{ fontFamily:mono,fontSize:isMobile?12:13,fontWeight:500,color:critDone===criticalIds.length?T.signal:T.danger }}>{critDone}/{criticalIds.length}</span>
              </div>
            )}
            <div style={{ display:"flex",alignItems:"center",gap:7 }}>
              <div style={{ width:isMobile?56:100,height:4,background:T.hair,borderRadius:2,overflow:"hidden" }}>
                <div style={{ height:"100%",borderRadius:2,width:`${progress}%`,background:progress===100?T.signal:T.accent,transition:"width 0.3s" }} />
              </div>
              <span style={{ fontFamily:mono,fontSize:11,color:T.graphite,minWidth:28 }}>{progress}%</span>
            </div>
            <button className="btn-pdf" onClick={handleExport} style={{ display:"flex",alignItems:"center",gap:6,padding:isMobile?"8px 12px":"9px 16px",fontSize:isMobile?12:13.5,fontWeight:600,background:T.accent,color:"#fff",border:"none",borderRadius:8,whiteSpace:"nowrap" }}>
              {exported ? "✓ Открыт" : isMobile ? "↓ PDF" : "↓ Экспорт PDF"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile tabs */}
      {isMobile && (
        <div style={{ background:T.paper,borderBottom:`1px solid ${T.hair}` }}>
          <div className="tabs">
            {blocks.map((b,i) => {
              const bAns = b.questions.filter(q=>isAnswered(q,answers)).length;
              const isActive = i===activeBlock;
              const ts = TAG_STYLES[i%TAG_STYLES.length];
              return (
                <button key={b.id} className="tab-pill" onClick={()=>setActiveBlock(i)}
                  style={{ display:"flex",flexDirection:"column",gap:4,padding:"9px 13px",background:isActive?T.accentSoft:T.paper,border:`1px solid ${isActive?T.accent:T.hair}`,borderRadius:10,textAlign:"left" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,justifyContent:"space-between" }}>
                    <span style={{ fontFamily:mono,fontSize:10,color:isActive?T.accent:T.mute }}>{b.num}</span>
                    <span style={{ fontFamily:mono,fontSize:9,fontWeight:500,padding:"1px 5px",borderRadius:100,background:ts.bg,color:ts.color }}>{b.tag}</span>
                  </div>
                  <div style={{ fontFamily:display,fontSize:12,fontWeight:600,color:isActive?T.ink:T.ink2 }}>{b.title}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                    <div style={{ width:48,height:2,background:T.hair,borderRadius:1,overflow:"hidden" }}>
                      <div style={{ height:"100%",background:bAns===b.questions.length?T.signal:T.accent,width:`${(bAns/b.questions.length)*100}%`,transition:"width 0.3s" }} />
                    </div>
                    <span style={{ fontFamily:mono,fontSize:9,color:T.mute }}>{bAns}/{b.questions.length}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth:1100,margin:"0 auto",padding:isMobile?"20px 16px":"36px 32px",display:"flex",gap:28,alignItems:"flex-start" }}>

        {/* Sidebar */}
        {!isMobile && (
          <nav style={{ width:234,flexShrink:0,position:"sticky",top:80 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"5px 12px 5px 10px",fontFamily:mono,fontSize:11.5,color:T.graphite,background:T.paper,border:`1px solid ${T.hair}`,borderRadius:100,marginBottom:16 }}>
              <span className="pd" style={{ width:6,height:6,borderRadius:"50%",background:T.signal,flexShrink:0 }} />
              {answered}/{totalQ} ответов
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:1 }}>
              {blocks.map((b,i) => {
                const bAns = b.questions.filter(q=>isAnswered(q,answers)).length;
                const isActive = i===activeBlock;
                const ts = TAG_STYLES[i%TAG_STYLES.length];
                return (
                  <button key={b.id} className="sb-item" onClick={()=>setActiveBlock(i)}
                    style={{ display:"flex",flexDirection:"column",gap:5,padding:"11px 13px",background:isActive?T.paper:"transparent",border:"none",borderLeft:`3px solid ${isActive?T.accent:"transparent"}`,borderRadius:"0 8px 8px 0",textAlign:"left" }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <span style={{ fontFamily:mono,fontSize:11,color:isActive?T.accent:T.mute }}>{b.num}</span>
                      <span style={{ fontFamily:mono,fontSize:9.5,fontWeight:500,padding:"1px 6px",borderRadius:100,background:ts.bg,color:ts.color }}>{b.tag}</span>
                    </div>
                    <div style={{ fontFamily:display,fontSize:13,fontWeight:600,color:isActive?T.ink:T.ink2,letterSpacing:"-0.01em",lineHeight:1.3 }}>{b.title}</div>
                    <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                      <div style={{ flex:1,height:3,background:T.hair,borderRadius:2,overflow:"hidden" }}>
                        <div style={{ height:"100%",borderRadius:2,background:bAns===b.questions.length?T.signal:T.accent,width:`${(bAns/b.questions.length)*100}%`,transition:"width 0.3s" }} />
                      </div>
                      <span style={{ fontFamily:mono,fontSize:10,color:T.mute }}>{bAns}/{b.questions.length}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {criticalIds.length > 0 && (
              <div style={{ marginTop:20,padding:"14px 16px",background:T.paper,border:`1px solid ${T.hair}`,borderRadius:10 }}>
                <div style={{ fontFamily:mono,fontSize:10,color:T.mute,letterSpacing:"0.05em",marginBottom:10,textTransform:"uppercase" }}>Критичные</div>
                {criticalIds.map(id => {
                  const q = blocks.flatMap(b=>b.questions).find(q=>q.id===id);
                  const done = q?isAnswered(q,answers):false;
                  return (
                    <div key={id} style={{ display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:`1px solid ${T.hair}` }}>
                      <span style={{ width:7,height:7,borderRadius:"50%",flexShrink:0,background:done?T.signal:"transparent",border:`1.5px solid ${done?T.signal:T.hair}` }} />
                      <span style={{ fontFamily:mono,fontSize:12,color:T.graphite }}>{id}</span>
                      {done && <span style={{ fontSize:11,color:T.signal,marginLeft:"auto" }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* PDF export в сайдбаре */}
            <button className="btn-pdf" onClick={handleExport} style={{ marginTop:20,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"11px 16px",fontSize:13.5,fontWeight:600,background:T.accent,color:"#fff",border:"none",borderRadius:8 }}>
              ↓ Экспорт PDF
            </button>
          </nav>
        )}

        {/* Main */}
        <main style={{ flex:1,minWidth:0 }} key={activeBlock} className="fade-up">
          <div style={{ padding:isMobile?"16px 18px 14px":"22px 28px 18px",background:T.paper,border:`1px solid ${T.hair}`,borderRadius:"12px 12px 0 0",borderBottom:"none" }}>
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12 }}>
              <div style={{ minWidth:0 }}>
                <div style={{ fontFamily:mono,fontSize:11,color:T.accent,letterSpacing:"0.05em",marginBottom:5 }}>{block.num}</div>
                <h2 style={{ fontFamily:display,fontSize:isMobile?20:24,fontWeight:700,letterSpacing:"-0.025em",lineHeight:1.1,marginBottom:8 }}>{block.title}</h2>
                {block.respondent && (
                  <div style={{ display:"flex",alignItems:"center",gap:7,flexWrap:"wrap" }}>
                    <span style={{ fontSize:13,color:T.graphite }}>Отвечает:</span>
                    <span style={{ fontFamily:mono,fontSize:11.5,fontWeight:500,padding:"3px 10px",borderRadius:100,background:TAG_STYLES[activeBlock%TAG_STYLES.length].bg,color:TAG_STYLES[activeBlock%TAG_STYLES.length].color }}>{block.respondent}</span>
                  </div>
                )}
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <div style={{ fontFamily:display,fontSize:isMobile?22:28,fontWeight:700,letterSpacing:"-0.03em",lineHeight:1 }}>
                  {blockAnswered}<span style={{ color:T.hair }}>/{block.questions.length}</span>
                </div>
                <div style={{ fontFamily:mono,fontSize:10,color:T.mute,marginTop:3 }}>ответов</div>
              </div>
            </div>
          </div>

          <div style={{ background:T.paper,border:`1px solid ${T.hair}`,borderRadius:"0 0 12px 12px",overflow:"hidden" }}>
            {block.questions.map((q,qi) => {
              const filled = isAnswered(q, answers);
              return (
                <div key={q.id} style={{ padding:isMobile?"14px 16px":"18px 28px",borderBottom:qi<block.questions.length-1?`1px solid ${T.hair}`:"none",background:q.critical?T.accentSoft:"transparent" }}>
                  {isMobile ? (
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                        <span style={{ fontFamily:mono,fontSize:11,color:q.critical?T.accent:T.mute,fontWeight:q.critical?500:400 }}>{q.id}</span>
                        {q.critical && <span style={{ fontFamily:mono,fontSize:8.5,color:T.accent,background:T.paper,border:`1px solid ${T.accent}`,padding:"1px 5px",borderRadius:3 }}>КРИТ</span>}
                        <div style={{ marginLeft:"auto",width:16,height:16,borderRadius:"50%",background:filled?T.signal:T.hair,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s" }}>
                          {filled && <span style={{ color:"#fff",fontSize:9 }}>✓</span>}
                        </div>
                      </div>
                      <div style={{ fontSize:14,fontWeight:500,color:T.ink2,lineHeight:1.5,marginBottom:q.hint?4:10 }}>{q.text}</div>
                      {q.hint && <div style={{ fontFamily:mono,fontSize:11,color:T.accent,marginBottom:10 }}>→ {q.hint}</div>}
                      <QInput q={q} answers={answers} onChange={handleAnswer} isMobile={true} />
                    </div>
                  ) : (
                    <div style={{ display:"flex",gap:14 }}>
                      <div style={{ flexShrink:0,width:44,paddingTop:2,display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
                        <span style={{ fontFamily:mono,fontSize:11.5,color:q.critical?T.accent:T.mute,fontWeight:q.critical?500:400 }}>{q.id}</span>
                        {q.critical && <span style={{ fontFamily:mono,fontSize:8.5,color:T.accent,background:T.paper,border:`1px solid ${T.accent}`,padding:"1px 5px",borderRadius:3 }}>КРИТ</span>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14,fontWeight:500,color:T.ink2,lineHeight:1.5,marginBottom:q.hint?4:10 }}>{q.text}</div>
                        {q.hint && <div style={{ fontFamily:mono,fontSize:11.5,color:T.accent,marginBottom:10 }}>→ {q.hint}</div>}
                        <QInput q={q} answers={answers} onChange={handleAnswer} isMobile={false} />
                      </div>
                      <div style={{ flexShrink:0,paddingTop:2 }}>
                        <div style={{ width:18,height:18,borderRadius:"50%",background:filled?T.signal:T.hair,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s" }}>
                          {filled && <span style={{ color:"#fff",fontSize:10,lineHeight:1 }}>✓</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {isMobile && criticalIds.length > 0 && (
            <div style={{ marginTop:14,padding:"12px 14px",background:T.paper,border:`1px solid ${T.hair}`,borderRadius:10 }}>
              <div style={{ fontFamily:mono,fontSize:10,color:T.mute,marginBottom:8,textTransform:"uppercase" }}>Критичные</div>
              <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>
                {criticalIds.map(id => {
                  const q = blocks.flatMap(b=>b.questions).find(q=>q.id===id);
                  const done = q?isAnswered(q,answers):false;
                  return (
                    <div key={id} style={{ display:"flex",alignItems:"center",gap:5,padding:"4px 9px",background:T.snow,border:`1px solid ${done?T.signal:T.hair}`,borderRadius:100 }}>
                      <span style={{ width:6,height:6,borderRadius:"50%",background:done?T.signal:T.hair }} />
                      <span style={{ fontFamily:mono,fontSize:11,color:T.graphite }}>{id}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16,gap:10 }}>
            <button className="btn-n" disabled={activeBlock===0} onClick={()=>{setActiveBlock(i=>i-1);window.scrollTo({top:0,behavior:"smooth"});}}
              style={{ flex:isMobile?1:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"11px 18px",fontSize:14,fontWeight:500,background:T.paper,color:T.ink,border:`1px solid ${T.hair}`,borderRadius:8 }}>
              ← Назад
            </button>
            <span style={{ fontFamily:mono,fontSize:12,color:T.mute,flexShrink:0 }}>{activeBlock+1}/{blocks.length}</span>
            {activeBlock < blocks.length-1 ? (
              <button className="btn-n" onClick={()=>{setActiveBlock(i=>i+1);window.scrollTo({top:0,behavior:"smooth"});}}
                style={{ flex:isMobile?1:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"11px 18px",fontSize:14,fontWeight:500,background:T.ink,color:"#fff",border:"none",borderRadius:8 }}>
                Дальше →
              </button>
            ) : (
              <button className="btn-pdf" onClick={handleExport}
                style={{ flex:isMobile?1:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"11px 18px",fontSize:14,fontWeight:600,background:T.accent,color:"#fff",border:"none",borderRadius:8 }}>
                {exported?"✓ Открыт":"↓ Экспорт PDF"}
              </button>
            )}
          </div>

          <div style={{ textAlign:"center",marginTop:18,paddingBottom:isMobile?24:0 }}>
            <span style={{ fontFamily:mono,fontSize:11,color:T.mute }}>KULBATSKII OS · SOP v1.2</span>
          </div>
        </main>
      </div>
    </div>
  );
}