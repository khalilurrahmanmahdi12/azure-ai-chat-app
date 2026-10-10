/**
 * Azure AI Studio · App Logic
 * Dicoding × Microsoft Azure — Gen AI
 */

/* ──────────────────────────────────────
   STATE
────────────────────────────────────── */
const S = {
  mode: 'mock',
  busy: false,
  chatHistory: [],
  ragHistory:  [],
  docs: [
    { id: 1, name: 'azure_ai_overview.txt', ext: 'txt', size: '3.2 KB', chunks: 42 },
    { id: 2, name: 'prompt_flow_guide.md',  ext: 'md',  size: '8.1 KB', chunks: 96 },
  ],
  cfg: {
    endpoint: '', key: '', deployment: 'gpt-4o', version: '2024-02-01',
    searchEndpoint: '', searchKey: '', searchIndex: 'rag-index',
    topK: 5, temperature: 0.7, maxTokens: 1024,
    systemPrompt: 'Kamu adalah asisten AI yang dirancang dan dibangun oleh KHALILURRAHMAN MAHDI menggunakan Microsoft Azure AI. Jawab dalam bahasa Indonesia yang baik, jelas, dan profesional.',
  },
};

/* ──────────────────────────────────────
   INIT
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  updateDocUI();
});

/* ──────────────────────────────────────
   TABS
────────────────────────────────────── */
function switchTab(tab) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
}

/* ──────────────────────────────────────
   MOCK ENGINE
────────────────────────────────────── */
const BANK = {
  greet: [
    'Halo! Senang bertemu Anda. Saya adalah asisten AI yang dirancang dan dibangun oleh **KHALILURRAHMAN MAHDI** berbasis teknologi Microsoft Azure AI Foundry & Azure OpenAI gpt-4o. Ada yang bisa saya bantu hari ini?',
    'Halo! Saya asisten AI rancangan **KHALILURRAHMAN MAHDI** menggunakan ekosistem Azure Gen AI. Siap membantu Anda!',
  ],
  azure: [
    `**Azure AI Foundry** adalah platform terpadu Microsoft untuk membangun aplikasi AI generatif. Fitur utamanya:\n\n- **Azure OpenAI Service** — akses model GPT-4o, DALL-E, Whisper, dan lainnya\n- **Azure AI Search** — vector & semantic search untuk RAG\n- **Prompt Flow** — orkestrator pipeline AI berbasis visual\n- **Content Safety** — filter konten otomatis\n- **Model Evaluation** — ukur kualitas respons AI`,
    `**Azure OpenAI Service** menyediakan akses ke model OpenAI terbaik melalui infrastruktur Microsoft Azure yang aman dan enterprise-grade. Model yang tersedia:\n\n- **GPT-4o** — model terbaru, multimodal\n- **GPT-4 Turbo** — performa tinggi, context window besar\n- **Text Embedding** — untuk vector search & RAG\n- **DALL-E 3** — generasi gambar\n- **Whisper** — speech-to-text`,
  ],
  rag: [
    `**RAG (Retrieval-Augmented Generation)** menggabungkan dua komponen utama:\n\n1. **Retrieve** — mencari informasi relevan dari database (Azure AI Search)\n2. **Generate** — menghasilkan jawaban berdasarkan konteks yang ditemukan\n\n**Keunggulan RAG:**\n- Mengurangi *hallucination* karena berbasis data nyata\n- Knowledge bisa diperbarui tanpa *fine-tuning* ulang\n- Sumber jawaban bisa dilacak (*traceable*)\n- Lebih hemat biaya dibanding fine-tuning`,
  ],
  code: [
    `Berikut contoh memanggil **Azure OpenAI** dengan Python:\n\n\`\`\`python\nfrom openai import AzureOpenAI\n\nclient = AzureOpenAI(\n    azure_endpoint="https://YOUR-RESOURCE.openai.azure.com/",\n    api_key="YOUR_API_KEY",\n    api_version="2024-02-01"\n)\n\nresponse = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[\n        {"role": "system", "content": "Kamu adalah asisten yang membantu."},\n        {"role": "user", "content": "Halo!"}\n    ],\n    temperature=0.7,\n    max_tokens=512\n)\n\nprint(response.choices[0].message.content)\n\`\`\`\n\nInstall: \`pip install openai\``,
  ],
  creator: [
    `Saya adalah asisten AI berbasis **Microsoft Azure AI Foundry** yang dirancang dan dibangun oleh **KHALILURRAHMAN MAHDI**, mengimplementasikan arsitektur Gen AI (Azure OpenAI Service gpt-4o, Prompt Flow, dan RAG Azure AI Search) sesuai kurikulum kompetensi Dicoding.`,
    `Aplikasi dan asisten AI ini dirancang serta dibangun oleh **KHALILURRAHMAN MAHDI** menggunakan teknologi Microsoft Azure Gen AI.`
  ],
  promptflow: [
    `Berikut adalah perbandingan mendalam antara **Azure Prompt Flow** dan **LangChain** berdasarkan arsitektur Gen AI di Microsoft Azure:

### 1. Definisi & Pendekatan Utama
- **Azure Prompt Flow**: Alat visual dan SDK orkestrasi bawaan di **Azure AI Foundry**. Didesain dengan pendekatan *DAG (Directed Acyclic Graph)* visual untuk menghubungkan LLM, kode Python, dan tool vector search. Sangat berorientasi pada **observabilitas, debugging visual, dan deployment enterprise**.
- **LangChain**: Framework open-source serbaguna berbasis *code-first* (Python/JavaScript) dengan abstraksi komponen yang sangat luas (chains, agents, memory, tools).

---

### 2. Tabel Perbandingan Fitur

| Kategori | Azure Prompt Flow | LangChain |
| :--- | :--- | :--- |
| **Antarmuka** | Visual canvas (UI) + code (Python/YAML) | Pure code (Python / TypeScript) |
| **Ekosistem Cloud** | Terintegrasi native dengan Azure (Search, OpenAI, Monitor) | Cloud-agnostic (bisa di AWS, GCP, lokal, Azure) |
| **Observabilitas** | Tracing bawaan, visual timeline per node | Butuh LangSmith atau integrasi eksternal |
| **Evaluasi Model** | Built-in metrics (Groundness, Relevance, Coherence) | Modul evaluasi manual atau via LangSmith |
| **Deployment** | 1-click deploy ke Azure Managed Online Endpoint | Butuh konfigurasi container/FastAPI sendiri |
| **Fokus Penggunaan** | Production-ready enterprise AI & tim kolaboratif | Prototyping cepat & eksplorasi agentic chains |

---

### 3. Kapan Harus Menggunakan yang Mana?
- Gunakan **Azure Prompt Flow** jika: Anda membangun solusi enterprise di ekosistem Microsoft Azure, butuh evaluasi terukur (*A/B testing prompt*), membutuhkan governance kepatuhan data, dan kolaborasi antar AI engineer.
- Gunakan **LangChain** jika: Anda membutuhkan fleksibilitas eksperimen multi-model di luar cloud tunggal atau butuh beragam integrasi pihak ketiga yang sudah siap pakai.

> *Catatan: Di Azure, Anda bahkan bisa mengintegrasikan kode LangChain di dalam node Python milik Prompt Flow!*`,
  ],
  default: [
    `Pertanyaan yang sangat bagus! Sebagai asisten AI yang dirancang dan dibangun oleh **KHALILURRAHMAN MAHDI** berbasis **Azure OpenAI Service**, saya siap membantu menjelaskan konsep ini lebih lanjut.

Apakah Anda ingin membahas arsitektur teknisnya, implementasi kode, atau best practice produksi di Azure?`,
    `Terima kasih atas pertanyaannya! Saya adalah asisten AI yang dikembangkan oleh **KHALILURRAHMAN MAHDI** dengan teknologi Microsoft Azure AI Foundry. Topik ini sangat menarik dan relevan.

Silakan beri tahu saya aspek spesifik apa yang ingin kita eksplorasi bersama!`,
  ],
};

function getMock(msg) {
  const q = msg.toLowerCase();
  // Prioritas utama: Prompt Flow & LangChain
  if (q.includes('prompt flow') || q.includes('promptflow') || q.includes('langchain')) {
    return pick(BANK.promptflow);
  }
  // Pertanyaan pembuat / creator
  if (/siapa yang (buat|bikin|merancang|membangun)|pembuat|creator|developer|khalil/i.test(q)) {
    return pick(BANK.creator);
  }
  // Pertanyaan RAG
  if (/rag|retrieval|dokumen|search|vector/.test(q)) {
    return pick(BANK.rag);
  }
  // Kode / pemrograman
  if (/kode|code|python|javascript|api call|contoh/.test(q)) {
    return pick(BANK.code);
  }
  // Sapaan murni
  if (/^(halo|hai|hello|selamat\s*(pagi|siang|sore|malam)|hei)[!.\s]*$/i.test(q.trim())) {
    return pick(BANK.greet);
  }
  if (/halo|hai|hello|selamat/.test(q) && q.length < 20) {
    return pick(BANK.greet);
  }
  // Topik Azure umum
  if (/azure|openai|foundry|microsoft|cloud/.test(q)) {
    return pick(BANK.azure);
  }
  return pick(BANK.default);
}

function getMockRag(query) {
  const docs = S.docs.map(d => d.name);
  const body = getMock(query);
  return body + `\n\n*Diambil dari: **${docs.join(', ')}** via Azure AI Search vector index · similarity ≥ 0.87*`;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ──────────────────────────────────────
   AZURE API
────────────────────────────────────── */
async function callAOAI(messages) {
  const { endpoint, key, deployment, version, temperature, maxTokens } = S.cfg;
  const url = `${endpoint.replace(/\/$/, '')}/openai/deployments/${deployment}/chat/completions?api-version=${version}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': key },
    body: JSON.stringify({ messages, temperature, max_tokens: maxTokens }),
  });
  if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(e?.error?.message || `HTTP ${r.status}`); }
  return (await r.json()).choices[0].message.content;
}

async function callSearch(query) {
  const { searchEndpoint, searchKey, searchIndex, topK } = S.cfg;
  const url = `${searchEndpoint.replace(/\/$/, '')}/indexes/${searchIndex}/docs/search?api-version=2023-11-01`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': searchKey },
    body: JSON.stringify({ search: query, queryType: 'semantic', semanticConfiguration: 'default', top: topK, select: 'content,sourcefile' }),
  });
  if (!r.ok) throw new Error(`Search ${r.status}`);
  return (await r.json()).value || [];
}

/* ──────────────────────────────────────
   RENDER
────────────────────────────────────── */
function md(text) {
  // Simple table parsing
  let processed = text.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
    const lines = match.trim().split(/\r?\n/).filter(l => l.trim().startsWith('|'));
    if (lines.length < 2) return match;
    const header = lines[0].split('|').slice(1, -1).map(c => `<th>${c.trim()}</th>`).join('');
    // skip separator lines like |---|---|
    const rows = lines.slice(1).filter(l => !/^[\|\s\-:]+$/.test(l)).map(l => {
      const cells = l.split('|').slice(1, -1).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<div class="table-wrapper"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
  });

  return processed
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => `<pre><code class="lang-${l}">${esc(c.trim())}</code></pre>`)
    .replace(/`([^`]+)`/g, (_, c) => `<code>${esc(c)}</code>`)
    .replace(/^### (.*$)/gim, '<h4 style="margin:10px 0 4px;font-size:13.5px;color:var(--gray-900);">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin:12px 0 6px;font-size:14.5px;color:var(--gray-900);">$1</h3>')
    .replace(/^---$/gim, '<hr style="border:none;border-top:1px solid var(--gray-200);margin:12px 0;">')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function now() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function addUser(containerId, text) {
  const c = document.getElementById(containerId);
  const d = document.createElement('div');
  d.className = 'msg-row user';
  d.innerHTML = `
    <div class="avatar you">Kamu</div>
    <div class="bubble">
      <p>${esc(text).replace(/\n/g,'<br>')}</p>
    </div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function addAI(containerId, text, sources = [], avatarClass = 'ai', avatarLabel = 'AI') {
  const c = document.getElementById(containerId);
  const sourcesHtml = sources.length ? `
    <div class="sources">
      <span class="sources-label">Sumber</span>
      ${sources.map(s => `<span class="source-tag">📄 ${s}</span>`).join('')}
    </div>` : '';
  const d = document.createElement('div');
  d.className = 'msg-row';
  d.innerHTML = `
    <div class="avatar ${avatarClass}">${avatarLabel}</div>
    <div class="bubble">
      <p>${md(text)}</p>
      ${sourcesHtml}
      <div class="bubble-time">${now()} · ${S.mode === 'mock' ? 'Mock Mode' : 'Azure Live'}</div>
    </div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function addTyping(containerId) {
  const c = document.getElementById(containerId);
  const d = document.createElement('div');
  d.className = 'msg-row';
  d.id = 'typing-' + containerId;
  d.innerHTML = `
    <div class="avatar ai">AI</div>
    <div class="bubble">
      <div class="typing"><span></span><span></span><span></span></div>
    </div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function removeTyping(containerId) {
  document.getElementById('typing-' + containerId)?.remove();
}

/* ──────────────────────────────────────
   CHAT
────────────────────────────────────── */
async function sendChat() {
  const inp = document.getElementById('chatInput');
  const text = inp.value.trim();
  if (!text || S.busy) return;

  // Hide welcome if visible
  document.querySelector('#chatMessages .welcome')?.remove();

  inp.value = '';
  autoResize(inp);
  S.busy = true;
  document.getElementById('chatSend').disabled = true;

  S.chatHistory.push({ role: 'user', content: text });
  addUser('chatMessages', text);
  addTyping('chatMessages');

  try {
    let reply;
    if (S.mode === 'mock') {
      await sleep(700 + Math.random() * 900);
      reply = getMock(text);
    } else {
      reply = await callAOAI([
        { role: 'system', content: S.cfg.systemPrompt },
        ...S.chatHistory,
      ]);
    }
    S.chatHistory.push({ role: 'assistant', content: reply });
    removeTyping('chatMessages');
    addAI('chatMessages', reply);
  } catch (e) {
    removeTyping('chatMessages');
    addAI('chatMessages', `**Error:** ${e.message}\n\nPeriksa konfigurasi Azure Anda atau aktifkan Mock Mode.`);
    toast(e.message, 'error');
  } finally {
    S.busy = false;
    document.getElementById('chatSend').disabled = false;
    inp.focus();
  }
}

/* ──────────────────────────────────────
   RAG
────────────────────────────────────── */
async function sendRag() {
  const inp = document.getElementById('ragInput');
  const text = inp.value.trim();
  if (!text || S.busy) return;

  if (!S.docs.length) { toast('Unggah dokumen terlebih dahulu', 'error'); return; }

  document.querySelector('#ragMessages .welcome')?.remove();

  inp.value = '';
  autoResize(inp);
  S.busy = true;

  addUser('ragMessages', text);
  addTyping('ragMessages');

  try {
    let reply, sources = [];
    if (S.mode === 'mock') {
      await sleep(900 + Math.random() * 1100);
      reply = getMockRag(text);
      sources = S.docs.map(d => d.name);
    } else {
      const hits = await callSearch(text);
      sources = [...new Set(hits.map(h => h.sourcefile || 'document'))];
      const ctx = hits.map((h,i) => `[${i+1}] ${h.content}`).join('\n\n');
      reply = await callAOAI([
        { role: 'system', content: S.cfg.systemPrompt + '\nGunakan konteks berikut:\n' + ctx },
        { role: 'user', content: text },
      ]);
    }
    S.ragHistory.push({ role: 'user', content: text }, { role: 'assistant', content: reply });
    removeTyping('ragMessages');
    addAI('ragMessages', reply, sources, 'rag', 'RAG');
  } catch (e) {
    removeTyping('ragMessages');
    addAI('ragMessages', `**Error RAG:** ${e.message}`);
    toast(e.message, 'error');
  } finally {
    S.busy = false;
    inp.focus();
  }
}

/* ──────────────────────────────────────
   CLEAR
────────────────────────────────────── */
function clearChat() {
  S.chatHistory = [];
  const c = document.getElementById('chatMessages');
  c.innerHTML = '';
  // Re-add welcome
  const w = document.createElement('div');
  w.className = 'welcome';
  w.innerHTML = `
    <div class="welcome-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#2563eb"/></svg>
    </div>
    <h2>Azure AI Assistant</h2>
    <p>Dirancang & dibangun oleh <strong>KHALILURRAHMAN MAHDI</strong> · Azure OpenAI gpt-4o</p>
    <div class="suggestion-grid">
      <button class="suggestion" onclick="fillInput('Apa itu Azure AI Foundry dan apa saja fitur utamanya?')">Apa itu Azure AI Foundry?</button>
      <button class="suggestion" onclick="fillInput('Jelaskan cara kerja RAG pada Azure')">Cara kerja RAG di Azure</button>
      <button class="suggestion" onclick="fillInput('Buatkan contoh kode Python untuk Azure OpenAI API')">Contoh kode Azure OpenAI</button>
      <button class="suggestion" onclick="fillInput('Apa perbedaan Prompt Flow dan langchain?')">Prompt Flow vs LangChain</button>
    </div>`;
  c.appendChild(w);
}

function clearRag() {
  S.ragHistory = [];
  const c = document.getElementById('ragMessages');
  c.innerHTML = '';
  const w = document.createElement('div');
  w.className = 'welcome';
  w.style.paddingTop = '40px';
  w.innerHTML = `
    <div class="welcome-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </div>
    <h2>Chat dengan Dokumen</h2>
    <p>Tanya apa saja tentang dokumen yang sudah diunggah</p>`;
  c.appendChild(w);
}

function fillInput(text) {
  const inp = document.getElementById('chatInput');
  inp.value = text;
  autoResize(inp);
  inp.focus();
}

/* ──────────────────────────────────────
   MODE
────────────────────────────────────── */
function toggleMockMode() { setMode(S.mode === 'mock' ? 'real' : 'mock'); }

function setMode(mode) {
  S.mode = mode;
  const isMock = mode === 'mock';

  // Sidebar pill
  const pill = document.querySelector('.mode-pill');
  if (pill) {
    pill.classList.toggle('live', !isMock);
    document.getElementById('modeText').textContent = isMock ? 'Mock' : 'Live';
  }

  // Caption
  const cap = document.getElementById('modeCaption');
  if (cap) cap.textContent = `Mode: ${isMock ? 'Mock' : 'Azure Live'}`;

  // Radio buttons
  const rMock = document.getElementById('optMock');
  const rReal = document.getElementById('optReal');
  if (rMock) rMock.querySelector('input').checked = isMock;
  if (rReal) rReal.querySelector('input').checked = !isMock;

  // Status
  const stMode = document.getElementById('stMode');
  if (stMode) {
    const desc = stMode.querySelector('.status-desc') || stMode.querySelector('span:last-child');
    if (desc) desc.textContent = isMock ? 'Mock Demo' : 'Azure Live';
    stMode.querySelector('.dot').className = `dot ${isMock ? 'yellow' : 'green'}`;
  }

  localStorage.setItem('azure_mode', mode);
  toast(isMock ? 'Mock Mode aktif' : 'Azure Live Mode aktif', 'info');
}

/* ──────────────────────────────────────
   DOCUMENTS
────────────────────────────────────── */
function onFileSelect(e) { [...e.target.files].forEach(addDoc); }
function onDragOver(e) { e.preventDefault(); document.getElementById('uploadArea').classList.add('over'); }
function onDragLeave(e) { document.getElementById('uploadArea').classList.remove('over'); }
function onDrop(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.remove('over');
  [...e.dataTransfer.files].forEach(addDoc);
}

function addDoc(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (!['txt','pdf','docx','md'].includes(ext)) {
    toast(`.${ext} tidak didukung`, 'error'); return;
  }
  const id = Date.now();
  const chunks = Math.floor(Math.random() * 80) + 20;
  S.docs.push({ id, name: file.name, ext, size: (file.size/1024).toFixed(1) + ' KB', chunks });
  updateDocUI();
  toast(`${file.name} diindeks (${chunks} chunks)`, 'success');
}

function removeDoc(id) {
  S.docs = S.docs.filter(d => d.id !== id);
  updateDocUI();
  toast('Dokumen dihapus', 'info');
}

function updateDocUI() {
  const list = document.getElementById('docList');
  if (!list) return;

  list.innerHTML = S.docs.length ? '' : '<p style="font-size:12px;color:var(--gray-400);text-align:center;padding:8px">Belum ada dokumen</p>';

  S.docs.forEach(doc => {
    const row = document.createElement('div');
    row.className = 'doc-row';
    row.dataset.id = doc.id;
    row.innerHTML = `
      <div class="doc-thumb ${doc.ext}">${doc.ext.toUpperCase()}</div>
      <div class="doc-meta">
        <span class="doc-name">${doc.name}</span>
        <span class="doc-sub">${doc.size} · ${doc.chunks} chunks</span>
      </div>
      <button class="doc-del" onclick="removeDoc(${doc.id})">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    list.appendChild(row);
  });

  const total = S.docs.reduce((s, d) => s + d.chunks, 0);
  document.getElementById('docCountBadge').textContent = S.docs.length;
  document.getElementById('statDocs').textContent   = S.docs.length;
  document.getElementById('statChunks').textContent = total;
}

/* ──────────────────────────────────────
   SETTINGS
────────────────────────────────────── */
function syncSlider(type, val) {
  if (type === 'temp')   { document.getElementById('tempVal').textContent   = parseFloat(val).toFixed(2); S.cfg.temperature = +val; }
  if (type === 'tokens') { document.getElementById('tokensVal').textContent = val; S.cfg.maxTokens = +val; }
  if (type === 'topK')   {
    document.getElementById('topKVal').textContent    = val;
    document.getElementById('statTopK').textContent   = val;
    document.getElementById('topKCaption').textContent = val;
    S.cfg.topK = +val;
  }
}

function saveConfig() {
  S.cfg.endpoint       = document.getElementById('aoaiEndpoint').value.trim();
  S.cfg.key            = document.getElementById('aoaiKey').value.trim();
  S.cfg.deployment     = document.getElementById('aoaiDeployment').value.trim() || 'gpt-4o';
  S.cfg.version        = document.getElementById('aoaiVersion').value;
  S.cfg.searchEndpoint = document.getElementById('searchEndpoint').value.trim();
  S.cfg.searchKey      = document.getElementById('searchKey').value.trim();
  S.cfg.searchIndex    = document.getElementById('searchIndex').value.trim() || 'rag-index';
  S.cfg.systemPrompt   = document.getElementById('systemPrompt').value;

  localStorage.setItem('azure_cfg', JSON.stringify(S.cfg));
  updateStatus();
  toast('Konfigurasi disimpan', 'success');
}

function loadConfig() {
  try {
    const cfg = JSON.parse(localStorage.getItem('azure_cfg') || '{}');
    Object.assign(S.cfg, cfg);
    const f = id => document.getElementById(id);
    if (f('aoaiEndpoint')) {
      f('aoaiEndpoint').value   = cfg.endpoint || '';
      f('aoaiDeployment').value = cfg.deployment || 'gpt-4o';
      f('aoaiVersion').value    = cfg.version || '2024-02-01';
      f('searchEndpoint').value = cfg.searchEndpoint || '';
      f('searchIndex').value    = cfg.searchIndex || 'rag-index';
      f('systemPrompt').value   = cfg.systemPrompt || S.cfg.systemPrompt;
      if (cfg.temperature !== undefined) {
        f('tempSlider').value = cfg.temperature;
        f('tempVal').textContent = cfg.temperature;
      }
      if (cfg.maxTokens !== undefined) {
        f('tokensSlider').value = cfg.maxTokens;
        f('tokensVal').textContent = cfg.maxTokens;
      }
      if (cfg.topK !== undefined) {
        f('topKSlider').value = cfg.topK;
        f('topKVal').textContent = cfg.topK;
      }
    }
    const savedMode = localStorage.getItem('azure_mode');
    if (savedMode) setMode(savedMode);
    updateStatus();
  } catch(e) {}
}

function updateStatus() {
  const hasAOAI   = S.cfg.endpoint && S.cfg.key;
  const hasSearch = S.cfg.searchEndpoint && S.cfg.searchKey;

  const st = (id, ok, label) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.querySelector('.dot').className = `dot ${ok ? 'green' : 'yellow'}`;
    const desc = el.querySelector('.status-desc') || el.querySelector('span:last-child');
    if (desc) desc.textContent = ok ? `${label} ✓` : 'Belum dikonfigurasi';
  };

  st('stAOAI', hasAOAI, 'Dikonfigurasi');
  st('stSearch', hasSearch, 'Dikonfigurasi');
}

async function testConn() {
  if (S.mode === 'mock') { toast('Mock Mode — simulasi koneksi ✓', 'info'); return; }
  if (!S.cfg.endpoint || !S.cfg.key) { toast('Isi endpoint & API key terlebih dahulu', 'error'); return; }
  toast('Menguji koneksi…', 'info');
  try {
    await callAOAI([{ role: 'user', content: 'ping' }]);
    toast('Koneksi Azure OpenAI berhasil ✓', 'success');
    document.getElementById('stAOAI').querySelector('.dot').className = 'dot green';
    document.getElementById('stAOAI').querySelector('span').textContent = 'Terhubung ✓';
  } catch(e) {
    toast('Gagal: ' + e.message, 'error');
    document.getElementById('stAOAI').querySelector('.dot').className = 'dot red';
  }
}

/* ──────────────────────────────────────
   UI UTILS
────────────────────────────────────── */
function handleKey(e, type) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    type === 'chat' ? sendChat() : sendRag();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

let _toastT;
function toast(msg, type = 'info') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show ${type}`;
  clearTimeout(_toastT);
  _toastT = setTimeout(() => el.classList.remove('show'), 3000);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
