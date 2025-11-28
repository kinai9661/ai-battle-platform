# 🤖 AI 模型對戰平台

基於 lmarena.ai 概念打造的中文 AI 模型比較與投票平台。

## ✨ 功能特色

### 📝 文字生成對戰
- 支援多種主流文字生成模型（GPT-4, Claude, Gemini, Llama 等）
- 並排比較兩個模型的回答
- 即時投票與排行榜統計
- 可調整溫度、最大字數等參數

### 🎨 圖片生成對戰
- 支援多種圖片生成模型（DALL-E 3, Stable Diffusion XL, Flux Pro, Pollinations 等）
- 並排展示兩個模型生成的圖片
- 視覺化比較與投票
- 支援多種圖片尺寸與品質設定

### 🎬 影片生成對戰
- 支援主流影片生成模型（Runway, Pika Labs, Stable Video, Luma AI）
- 可設定影片長度與影格率
- 開發中功能

### 📊 排行榜系統
- 即時統計模型得票數
- 顯示對戰歷史記錄
- 視覺化投票進度

## 🚀 快速開始

### 安裝依賴
```bash
pip install -r requirements.txt
```

### 運行應用
```bash
streamlit run app.py
```

應用將在 `http://localhost:8501` 啟動。

## 🔧 配置說明

### API 金鑰設定
在側邊欄的「API 金鑰設定」區域輸入您的 API 金鑰：
- OpenAI API Key（用於 GPT 模型和 DALL-E）
- Anthropic API Key（用於 Claude 模型）
- Google API Key（用於 Gemini 模型）

⚠️ **注意**: API 金鑰僅在當前會話中使用，不會被儲存。

### 模型配置
應用內建多種模型配置，您可以在 `app.py` 中修改：

```python
TEXT_MODELS = {...}  # 文字生成模型
IMAGE_MODELS = {...}  # 圖片生成模型
VIDEO_MODELS = {...}  # 影片生成模型
```

## 📦 部署

### Streamlit Cloud
1. Fork 此倉庫
2. 連接到 [Streamlit Cloud](https://streamlit.io/cloud)
3. 部署 `app.py`

### Docker
```bash
docker build -t lmarena-app .
docker run -p 8501:8501 lmarena-app
```

### 其他平台
- Hugging Face Spaces
- Railway
- Vercel（需要適配器）
- Koyeb

## 🛠️ 技術架構

- **前端框架**: Streamlit
- **程式語言**: Python 3.8+
- **API 整合**: Requests
- **狀態管理**: Streamlit Session State

## 📝 使用說明

1. **選擇功能模式**: 在側邊欄選擇文字、圖片或影片生成
2. **選擇對戰模型**: 從下拉選單中選擇兩個 AI 模型
3. **輸入提示詞**: 描述您想要的內容
4. **生成內容**: 點擊生成按鈕
5. **比較結果**: 並排查看兩個模型的輸出
6. **投票**: 選擇您認為更好的模型
7. **查看排行榜**: 在排行榜頁面查看統計結果

## 🎯 開發計劃

- [ ] 整合真實 API（OpenAI, Anthropic, Google 等）
- [ ] 實作影片生成功能
- [ ] 添加用戶認證系統
- [ ] 持久化投票數據（數據庫）
- [ ] Elo 評分系統
- [ ] 更多模型支援
- [ ] 匯出對戰結果
- [ ] 多語言支援

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

靈感來自 [lmarena.ai](https://lmarena.ai) - 開放的 AI 模型評估平台。

---

**注意**: 此應用目前使用模擬數據進行演示。要使用真實 API，請在側邊欄配置您的 API 金鑰，並在程式碼中實作相應的 API 調用邏輯。