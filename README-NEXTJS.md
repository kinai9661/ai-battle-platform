# 🤖 AI 模型對戰平台 - Next.js + Pollinations.ai 版本

基於 lmarena.ai 概念打造的中文 AI 模型比較與投票平台,使用 Next.js 14 和 Pollinations.ai API。

## ✨ 功能特色

### 🎨 圖片生成對戰
- ✅ 使用 **Pollinations.ai** 免費 API
- ✅ 支援多種圖片生成模型:
  - Flux (標準)
  - Flux Realism (寫實風格)
  - Flux Anime (動漫風格)
  - Flux 3D (3D 風格)
  - Turbo (快速生成)
- ✅ 盲測模式 - 投票前不顯示模型名稱
- ✅ 並排視覺化比較
- ✅ 即時投票與排行榜統計

### 💬 文字生成對戰
- 📝 文字模型對戰框架 (可擴展)
- 🔧 支援自定義文字生成 API 整合

### 📊 排行榜系統
- 🏆 即時統計模型得票數
- 📈 視覺化投票進度
- 🎯 顯示領先模型和統計資訊

## 🚀 快速開始

### 本地運行

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 生產構建
npm run build
npm start
```

應用將在 `http://localhost:3000` 啟動。

### 部署到 Vercel

#### 方法一: 一鍵部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kinai9661/lmarena-clone-app)

#### 方法二: Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 部署
vercel

# 部署到生產環境
vercel --prod
```

#### 方法三: GitHub 整合

1. 在 [Vercel](https://vercel.com) 註冊/登入
2. 點擊 "Add New Project"
3. 導入此 GitHub 倉庫
4. Vercel 會自動檢測 Next.js 並配置
5. 點擊 "Deploy"

## 🎨 Pollinations.ai 使用說明

### 圖片生成 API

```
https://image.pollinations.ai/prompt/{提示詞}?model={模型}&seed={種子}&width={寬度}&height={高度}&nologo=true
```

**支援的模型:**
- `flux` - 標準 Flux 模型
- `flux-realism` - 寫實風格
- `flux-anime` - 動漫風格
- `flux-3d` - 3D 風格
- `turbo` - 快速生成

**參數說明:**
- `model`: 模型名稱
- `seed`: 隨機種子 (控制生成結果)
- `width`: 圖片寬度 (建議 1024)
- `height`: 圖片高度 (建議 1024)
- `nologo`: 移除浮水印

### 優點

✅ **完全免費** - 無需 API key
✅ **無限制** - 不限請求次數
✅ **快速** - 生成速度快
✅ **多模型** - 支援多種風格
✅ **簡單** - URL 參數即可調用

## 🛠️ 技術架構

- **前端框架**: Next.js 14 (App Router)
- **UI 樣式**: Tailwind CSS
- **圖片 API**: Pollinations.ai
- **部署平台**: Vercel
- **語言**: TypeScript

## 📁 項目結構

```
├── app/
│   ├── components/
│   │   ├── ImageArena.tsx    # 圖片對戰組件
│   │   ├── TextArena.tsx     # 文字對戰組件
│   │   └── Leaderboard.tsx   # 排行榜組件
│   ├── layout.tsx            # 根布局
│   ├── page.tsx              # 主頁面
│   └── globals.css           # 全局樣式
├── public/                   # 靜態資源
├── next.config.js            # Next.js 配置
├── tailwind.config.js        # Tailwind 配置
├── package.json              # 依賴配置
└── vercel.json              # Vercel 部署配置
```

## 🔧 自定義配置

### 添加更多圖片模型

編輯 `app/components/ImageArena.tsx`:

```typescript
const IMAGE_MODELS = [
  { id: 'your-model', name: '你的模型名稱', model: 'model-id' },
  // ... 更多模型
]
```

### 整合其他 API

如果要使用其他圖片生成 API (如 DALL-E, Stable Diffusion),修改 `generateImages` 函數中的 API 調用邏輯。

## 🎯 開發計劃

- [x] 圖片生成對戰 (Pollinations.ai)
- [x] 排行榜系統
- [x] Vercel 部署配置
- [ ] 整合真實文字生成 API (Groq, Hugging Face)
- [ ] 用戶認證系統
- [ ] 持久化投票數據 (數據庫)
- [ ] Elo 評分系統
- [ ] 匯出對戰結果
- [ ] 影片生成對戰
- [ ] 多語言支持

## 🌐 環境變量 (可選)

如果要整合需要 API key 的服務,創建 `.env.local`:

```bash
# OpenAI (文字生成)
OPENAI_API_KEY=your_key_here

# Anthropic (Claude)
ANTHROPIC_API_KEY=your_key_here

# Groq (免費文字生成)
GROQ_API_KEY=your_key_here
```

## 📝 使用說明

1. **選擇功能**: 點擊頂部標籤選擇圖片生成、文字生成或排行榜
2. **選擇模型**: 從下拉選單選擇兩個要對戰的模型
3. **輸入提示詞**: 描述您想要生成的內容
4. **生成內容**: 點擊生成按鈕
5. **比較結果**: 並排查看兩個模型的輸出
6. **投票**: 選擇您認為更好的模型 (投票前不顯示模型名稱)
7. **查看排行榜**: 切換到排行榜標籤查看統計結果

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request!

## 📄 授權

MIT License

## 🙏 致謝

- 靈感來自 [lmarena.ai](https://lmarena.ai)
- 圖片生成由 [Pollinations.ai](https://pollinations.ai) 提供
- 部署平台 [Vercel](https://vercel.com)

---

**享受 AI 對戰的樂趣! 🎉**
