🤖 AI 模型對戰平台
基於 lmarena.ai 概念的多功能中文 AI 對戰平台。
文本、圖片、影片、音樂一站式比較，支援 Pollinations.ai、開源 Suno API 等最新模型，且支援多帳戶管理與免費配額查詢。

✨ 主要功能
🏆 AI對戰模式
多文字生成模型（GPT-4、Claude、Gemini、Llama、Mistral…）

多圖片生成模型（Flux、Flux Pro、Google Gemini Flash…）

多影片生成入口（Runway、Pika Labs、Luma、Stable Video…）

多帳戶音樂生成（Suno API，支援自定歌詞、歌手、混音Remix）

排行榜投票計分機制

🎨 圖片對戰
集成 Pollinations.ai 免費 API

一鍵盲測多張圖生成、支持多模型切換

支持 1~6 張圖片並排比較，高清大圖瀏覽

🎬 影片入口
支援常見多模影片AI模型（Runway、Pika Labs、Stable Video、Luma…）

提供自動化生成接口拓展（需API Key或官方帳號）

🎵 音樂生成（Suno API）
可輸入自訂歌詞、選歌手風格、Remix編曲

支援多帳戶管理，前端localStorage保存，後端動態切換cookie

顯示每日免費額度餘額（50首/帳號）

一鍵播放、下載mp3

👥 帳號管理與免費額度
支援前端多帳戶管理、切換、刪除

免費配額查詢與提醒，團隊協作可集成後端安全分攤

🚀 快速開始
安裝依賴
bash
npm install
本地運行
bash
npm run dev
前往 http://localhost:3000 查看平台。

部署到 Vercel
一鍵部署：Vercel Deploy Button

GitHub連接 Vercel 項目即可自動部署

Suno API 配置
按照 Suno-API 開源教學 取得帳號cookie

在前端「Suno帳戶管理」加入帳號名稱及cookie，立即享受免費生成

📝 功能說明
支援多模型對戰/投票/排行榜

盲測UI，公平比較各模型結果

多張圖片生成與比較，支援多種圖片AI模型

團隊、個人音樂帳戶自由切換與配額管理

影片/音樂自定生成，一鍵下載/分享

完整繁體中文介面

🛠️ 技術架構
Next.js + Tailwind CSS 前端框架

Pollinations.ai、suno-api 等免費AI模型API

LocalStorage帳戶管理、驗證與分帳

Vercel一鍵部署架構

🤝 貢獻
歡迎協作、提交Issues、PR。
如需擴展更多AI模型或特別企業需求，請隨時聯繫。

🙏 聲明
本專案只調用公開API，請尊重各平台開發者之版權使用和商用條款。
Suno API及第三方帳戶cookie建議個人使用或團隊分帳，請勿公開分享，保障配額安全

---

**注意**: 此應用目前使用模擬數據進行演示。要使用真實 API，請在側邊欄配置您的 API 金鑰，並在程式碼中實作相應的 API 調用邏輯。
