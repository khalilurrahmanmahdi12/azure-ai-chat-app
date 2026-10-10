# Azure AI Studio — Web App (Gen AI & RAG)

![Microsoft Azure](https://img.shields.io/badge/Microsoft_Azure-AI_Foundry-0078D4?logo=microsoftazure&logoColor=white)
![Azure OpenAI](https://img.shields.io/badge/Azure_OpenAI-gpt--4o-0078D4?logo=openai&logoColor=white)
![Azure AI Search](https://img.shields.io/badge/Azure_AI_Search-Vector_RAG-7C3AED?logo=microsoft&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern_Minimal-1572B6?logo=css3&logoColor=white)
![Dicoding Certified](https://img.shields.io/badge/Certified-Dicoding_Academy-2D3E50?logo=credly&logoColor=white)

**Azure AI Studio — Web App** adalah aplikasi web berbasis Artificial Intelligence (AI) yang dirancang dan dibangun oleh **KHALILURRAHMAN MAHDI** sesuai dengan standar kompetensi sertifikasi Dicoding Academy: *"Membangun Aplikasi Gen AI dengan Microsoft Azure"*.

Aplikasi ini mengintegrasikan model bahasa mutakhir **Azure OpenAI Service (gpt-4o)**, pipeline orkestrasi **Prompt Flow**, serta implementasi **RAG (Retrieval-Augmented Generation)** bertenaga **Azure AI Search** dalam tampilan web antislop yang modern, bersih, minimalis, dan sepenuhnya responsif di perangkat desktop maupun ponsel.

---

## 🚀 Live Demo & Kode Sumber

- 🌐 **Sertifikat Kompetensi Dicoding**: [Lihat Verifikasi Sertifikat](https://www.dicoding.com/certificates/EYX4QW2JJPDL)
- 💻 **Local Host**: `http://localhost:8080`
- 📁 **Repository**: `https://github.com/khalilurrahmanmahdi12/azure-ai-chat-app`

---

## ✨ Fitur Utama

### 💬 1. Chat AI Interaktif (Azure OpenAI)
Menampilkan percakapan cerdas dengan large language model:
- Bertenaga model **gpt-4o** via REST API Azure OpenAI Service
- Kemampuan pemahaman konteks percakapan multi-turn (*conversation history*)
- Tombol saran cepat (*quick prompt suggestions*) untuk pertanyaan populer seputar Azure AI
- Dukungan rendering teks Markdown kaya (kode program bersintaks, tabel perbandingan, list, dan penekanan teks)
- Indikator mengetik (*typing animation*) yang halus saat menunggu respons

### 🔍 2. RAG — Chat dengan Dokumen (Azure AI Search)
Fitur Retrieval-Augmented Generation untuk tanya jawab berbasis data internal:
- **Unggah Dokumen Multi-Format**: Mendukung file `.txt`, `.pdf`, `.docx`, dan `.md`
- **Simulasi & Live Chunking**: Dokumen dipecah menjadi unit-unit teks (*chunks*) dan diindeks
- **Hybrid & Vector Search**: Pengambilan Top-K dokumen paling relevan menggunakan Azure AI Search
- **Sitasi Sumber Otomatis**: Setiap jawaban dilengkapi sitasi nama file dokumen acuan

### ⚙️ 3. Panel Konfigurasi 2 × 2 Simetris
Pusat kontrol parameter dan koneksi layanan Microsoft Azure:
- **Azure OpenAI Service**: Pengaturan endpoint kustom, API key, nama deployment model, dan API version
- **Azure AI Search**: Pengaturan search endpoint, admin API key, nama vector index, dan slider Top-K (1–20)
- **Parameter Model AI**: Slider *Temperature* (0.0 presisi s/d 1.0 kreatif), *Max Tokens* (256–4096), dan *System Prompt*
- **Mode & Status Gateway**:
  - 🎭 **Mock Demo Mode**: Menjalankan simulasi penuh tanpa biaya dan tanpa memerlukan API key asli
  - ☁️ **Azure Live Mode**: Terhubung langsung ke resource aktif Microsoft Azure Cloud

### 🏗️ 4. Visualisasi Arsitektur Pipeline AI
Diagram interaktif bernomor alur (Langkah 1 s/d 4) yang memperjelas:
```text
[1. User Browser]
       ↓ (Prompt / Dokumen)
[2. Prompt Flow Gateway & Guardrails]
       ↓
  ┌──────────────────────────────────────────────┐
  │ 3. Dual Branch:                              │
  │    • Jalur RAG  ➔ Azure AI Search (Vector)   │
  │    • Jalur LLM  ➔ Azure OpenAI (gpt-4o)      │
  └──────────────────────────────────────────────┘
       ↓
[4. Jawaban Terstruktur & Sitasi Dokumen]
```

---

## 📱 Desain Responsif & Antislop UI

Aplikasi ini didesain dengan konsep desain modern standar industri (terinspirasi dari Linear.app dan Vercel Dashboard):
- **Tampilan Bersih (Clean White Theme)**: Menggunakan dominasi putih dan abu-abu netral dengan aksen biru korporat Azure (`#2563EB`)
- **Tipografi Presisi**: Menggunakan font modern *Inter* dengan tracking ketat yang mudah dibaca
- **Mobile-First Layout**:
  - Sidebar otomatis mengerut menjadi icon bar ramping (56px) di layar smartphone
  - Kartu konfigurasi 2x2 otomatis beralih menjadi 1 kolom vertikal yang rapi tanpa merusak tata letak desktop
  - Diagram arsitektur dan legend alur kerja tersusun vertikal secara proporsional tanpa teks tumpang-tindih (*zero text overlap*)

---

## 🛠️ Teknologi yang Digunakan

- **Microsoft Azure AI Foundry**
- **Azure OpenAI Service (gpt-4o)**
- **Azure AI Search (Semantic & Vector Index)**
- **Prompt Flow Architecture**
- **Pure HTML5, CSS3, & Vanilla JavaScript (ES6+)**
- **Python HTTP Server (Development)**

---

## 🚀 Menjalankan Project

### 1. Clone atau Buka Folder Project
```bash
git clone https://github.com/khalilurrahmanmahdi12/azure-ai-chat-app.git
cd azure-ai-chat-app
```

### 2. Jalankan Local Server
Aplikasi dapat dijalankan menggunakan server lokal Python bawaan:
```bash
python -m http.server 8080
```

### 3. Buka di Browser
Kunjungi alamat berikut di browser desktop atau mobile:
```text
http://localhost:8080
```
*(Atau langsung klik dua kali file `index.html` untuk membuka secara instan)*

---

## 📂 Struktur Utama Project

```text
azure-ai-chat-app/
├── index.html        # Markup utama: Sidebar, View Chat, View RAG, dan Panel Konfigurasi
├── style.css         # Styling antislop, variabel warna, grid 2x2, serta media query mobile
├── app.js            # State management, mock engine cerdas, REST API Azure, dan Markdown parser
└── README.md         # Dokumentasi teknis dan panduan penggunaan project
```

---

## 📌 Status Project

- ✅ Integrasi Konsep Azure AI Foundry & Prompt Flow
- ✅ Chat Interaktif dengan Model gpt-4o
- ✅ Implementasi RAG dengan Knowledge Base Dokumen
- ✅ Mock Demo Engine Cerdas (Tanpa Memerlukan API Key Asli)
- ✅ Panel Konfigurasi Parameter Model & Azure Credentials
- ✅ Desain Antislop Modern, Bersih, dan Elegan
- ✅ 100% Responsif di Layar Desktop, Tablet, & Smartphone
- ✅ Verifikasi dan Kepatuhan Kurikulum Sertifikasi Dicoding

---

## 👨‍💻 Developer & Creator

**KHALILURRAHMAN MAHDI**  
*Software Engineer - Full Stack Developer*  
Dicoding Certified: *Membangun Aplikasi Gen AI dengan Microsoft Azure*

- 🌐 **Sertifikat Dicoding**: [dicoding.com/certificates/EYX4QW2JJPDL](https://www.dicoding.com/certificates/EYX4QW2JJPDL)
- 🔗 **GitHub**: [github.com/khalilurrahmanmahdi12](https://github.com/khalilurrahmanmahdi12)
- 💼 **Portofolio**: [portofolio-khalil-dev-v2.vercel.app](https://portofolio-khalil-dev-v2.vercel.app/)

---

## ⭐ Dukungan

Jika project ini bermanfaat dan menarik bagi Anda, jangan lupa berikan ⭐ pada repositori ini!
