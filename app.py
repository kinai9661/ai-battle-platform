import streamlit as st
import requests
import json
import time
from datetime import datetime
import os

# 頁面配置
st.set_page_config(
    page_title="AI 模型對戰平台",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# 初始化 session state
if 'votes' not in st.session_state:
    st.session_state.votes = {}
if 'history' not in st.session_state:
    st.session_state.history = []
if 'current_responses' not in st.session_state:
    st.session_state.current_responses = None

# 可用的 AI 模型配置
TEXT_MODELS = {
    "GPT-4": {"provider": "openai", "model": "gpt-4"},
    "GPT-3.5 Turbo": {"provider": "openai", "model": "gpt-3.5-turbo"},
    "Claude 3 Opus": {"provider": "anthropic", "model": "claude-3-opus"},
    "Claude 3 Sonnet": {"provider": "anthropic", "model": "claude-3-sonnet"},
    "Gemini Pro": {"provider": "google", "model": "gemini-pro"},
    "Llama 3 70B": {"provider": "meta", "model": "llama-3-70b"},
}

IMAGE_MODELS = {
    "DALL-E 3": {"provider": "openai", "model": "dall-e-3"},
    "Stable Diffusion XL": {"provider": "stability", "model": "sdxl"},
    "Midjourney": {"provider": "midjourney", "model": "v6"},
    "Flux Pro": {"provider": "flux", "model": "flux-pro"},
    "Pollinations": {"provider": "pollinations", "model": "flux"},
}

VIDEO_MODELS = {
    "Runway Gen-3": {"provider": "runway", "model": "gen3"},
    "Pika Labs": {"provider": "pika", "model": "v1"},
    "Stable Video": {"provider": "stability", "model": "stable-video"},
    "Luma AI": {"provider": "luma", "model": "dream-machine"},
}

# 側邊欄
with st.sidebar:
    st.title("⚙️ 設定")
    
    # 功能選擇
    mode = st.selectbox(
        "選擇功能",
        ["💬 文字生成對戰", "🎨 圖片生成對戰", "🎬 影片生成對戰", "📊 排行榜"]
    )
    
    st.divider()
    
    if mode == "💬 文字生成對戰":
        st.subheader("文字模型選擇")
        model_a = st.selectbox("模型 A", list(TEXT_MODELS.keys()), key="text_a")
        model_b = st.selectbox("模型 B", list(TEXT_MODELS.keys()), index=1, key="text_b")
        
        st.divider()
        temperature = st.slider("溫度 (創造性)", 0.0, 2.0, 0.7, 0.1)
        max_tokens = st.slider("最大字數", 100, 4000, 1000, 100)
        
    elif mode == "🎨 圖片生成對戰":
        st.subheader("圖片模型選擇")
        model_a = st.selectbox("模型 A", list(IMAGE_MODELS.keys()), key="img_a")
        model_b = st.selectbox("模型 B", list(IMAGE_MODELS.keys()), index=1, key="img_b")
        
        st.divider()
        image_size = st.selectbox("圖片尺寸", ["1024x1024", "1024x1792", "1792x1024"])
        image_quality = st.select_slider("圖片品質", ["標準", "高品質", "超高品質"], value="高品質")
        
    elif mode == "🎬 影片生成對戰":
        st.subheader("影片模型選擇")
        model_a = st.selectbox("模型 A", list(VIDEO_MODELS.keys()), key="vid_a")
        model_b = st.selectbox("模型 B", list(VIDEO_MODELS.keys()), index=1, key="vid_b")
        
        st.divider()
        video_duration = st.slider("影片長度 (秒)", 2, 10, 4, 1)
        video_fps = st.selectbox("影格率 (FPS)", [24, 30, 60], index=1)
    
    st.divider()
    
    # API 設定
    with st.expander("🔑 API 金鑰設定"):
        st.text_input("OpenAI API Key", type="password", key="openai_key")
        st.text_input("Anthropic API Key", type="password", key="anthropic_key")
        st.text_input("Google API Key", type="password", key="google_key")
        st.caption("⚠️ API 金鑰僅用於本次會話，不會被儲存")

# 主要內容區域
st.title("🤖 AI 模型對戰平台")
st.caption("比較不同 AI 模型的表現，投票選出最佳回答")

if mode == "💬 文字生成對戰":
    st.header("💬 文字生成對戰")
    
    # 輸入區
    user_prompt = st.text_area(
        "輸入你的問題或提示詞",
        placeholder="例如：請解釋量子力學的基本原理...",
        height=100
    )
    
    col1, col2, col3 = st.columns([1, 1, 3])
    with col1:
        generate_btn = st.button("🚀 生成回答", type="primary", use_container_width=True)
    with col2:
        clear_btn = st.button("🗑️ 清除", use_container_width=True)
    
    if clear_btn:
        st.session_state.current_responses = None
        st.rerun()
    
    if generate_btn and user_prompt:
        with st.spinner("AI 模型正在思考中..."):
            # 模擬 API 調用
            time.sleep(2)
            
            response_a = f"【{model_a} 的回答】\n\n這是 {model_a} 針對您的問題所提供的回答。在實際應用中，這裡會呼叫真實的 API 來獲取模型回應。\n\n您可以根據回答的準確性、創造性、實用性等方面來評估這個回答的品質。"
            
            response_b = f"【{model_b} 的回答】\n\n這是 {model_b} 針對您的問題所提供的回答。每個模型都有其獨特的回答風格和能力特點。\n\n請仔細比較兩個模型的回答，選擇您認為更好的那一個。"
            
            st.session_state.current_responses = {
                "prompt": user_prompt,
                "model_a": model_a,
                "model_b": model_b,
                "response_a": response_a,
                "response_b": response_b,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
    
    # 顯示回答
    if st.session_state.current_responses:
        st.divider()
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("🅰️ 模型 A")
            st.info(st.session_state.current_responses["response_a"])
            if st.button("👍 投票給 A", key="vote_a", use_container_width=True):
                model_name = st.session_state.current_responses["model_a"]
                st.session_state.votes[model_name] = st.session_state.votes.get(model_name, 0) + 1
                st.session_state.history.append(st.session_state.current_responses)
                st.success(f"已投票給 {model_name}！")
                time.sleep(1)
                st.session_state.current_responses = None
                st.rerun()
        
        with col2:
            st.subheader("🅱️ 模型 B")
            st.info(st.session_state.current_responses["response_b"])
            if st.button("👍 投票給 B", key="vote_b", use_container_width=True):
                model_name = st.session_state.current_responses["model_b"]
                st.session_state.votes[model_name] = st.session_state.votes.get(model_name, 0) + 1
                st.session_state.history.append(st.session_state.current_responses)
                st.success(f"已投票給 {model_name}！")
                time.sleep(1)
                st.session_state.current_responses = None
                st.rerun()
        
        col_tie = st.columns([2, 1, 2])[1]
        with col_tie:
            if st.button("🤝 平手", use_container_width=True):
                st.info("已記錄為平手")
                st.session_state.history.append(st.session_state.current_responses)
                time.sleep(1)
                st.session_state.current_responses = None
                st.rerun()

elif mode == "🎨 圖片生成對戰":
    st.header("🎨 圖片生成對戰")
    
    image_prompt = st.text_area(
        "輸入圖片描述提示詞",
        placeholder="例如：一隻可愛的貓咪坐在月球上，星空背景，賽博龐克風格...",
        height=100
    )
    
    col1, col2, col3 = st.columns([1, 1, 3])
    with col1:
        generate_img_btn = st.button("🎨 生成圖片", type="primary", use_container_width=True)
    with col2:
        clear_img_btn = st.button("🗑️ 清除", key="clear_img", use_container_width=True)
    
    if clear_img_btn:
        st.session_state.current_responses = None
        st.rerun()
    
    if generate_img_btn and image_prompt:
        with st.spinner("AI 正在繪製圖片..."):
            time.sleep(3)
            
            # 使用 Pollinations.ai 生成示例圖片
            img_url_a = f"https://image.pollinations.ai/prompt/{requests.utils.quote(image_prompt)}?model=flux&seed=42&width=1024&height=1024"
            img_url_b = f"https://image.pollinations.ai/prompt/{requests.utils.quote(image_prompt)}?model=flux&seed=123&width=1024&height=1024"
            
            st.session_state.current_responses = {
                "prompt": image_prompt,
                "model_a": model_a,
                "model_b": model_b,
                "image_a": img_url_a,
                "image_b": img_url_b,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
    
    if st.session_state.current_responses and "image_a" in st.session_state.current_responses:
        st.divider()
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader(f"🅰️ {st.session_state.current_responses['model_a']}")
            st.image(st.session_state.current_responses["image_a"], use_container_width=True)
            if st.button("👍 投票給 A", key="vote_img_a", use_container_width=True):
                model_name = st.session_state.current_responses["model_a"]
                st.session_state.votes[model_name] = st.session_state.votes.get(model_name, 0) + 1
                st.success(f"已投票給 {model_name}！")
                time.sleep(1)
                st.session_state.current_responses = None
                st.rerun()
        
        with col2:
            st.subheader(f"🅱️ {st.session_state.current_responses['model_b']}")
            st.image(st.session_state.current_responses["image_b"], use_container_width=True)
            if st.button("👍 投票給 B", key="vote_img_b", use_container_width=True):
                model_name = st.session_state.current_responses["model_b"]
                st.session_state.votes[model_name] = st.session_state.votes.get(model_name, 0) + 1
                st.success(f"已投票給 {model_name}！")
                time.sleep(1)
                st.session_state.current_responses = None
                st.rerun()

elif mode == "🎬 影片生成對戰":
    st.header("🎬 影片生成對戰")
    
    video_prompt = st.text_area(
        "輸入影片描述提示詞",
        placeholder="例如：一隻金色的獵犬在海灘上奔跑，夕陽西下，慢動作...",
        height=100
    )
    
    col1, col2, col3 = st.columns([1, 1, 3])
    with col1:
        generate_vid_btn = st.button("🎬 生成影片", type="primary", use_container_width=True)
    with col2:
        clear_vid_btn = st.button("🗑️ 清除", key="clear_vid", use_container_width=True)
    
    if generate_vid_btn and video_prompt:
        with st.spinner("AI 正在生成影片... 這可能需要較長時間"):
            st.info("⏳ 影片生成功能需要較長處理時間（通常 30 秒到數分鐘）")
            st.warning("💡 提示：實際應用中，這裡會調用影片生成 API 並提供下載連結")
            
    st.info("🎬 影片生成功能正在開發中，敬請期待！")

elif mode == "📊 排行榜":
    st.header("📊 模型排行榜")
    
    if st.session_state.votes:
        # 排序投票結果
        sorted_votes = sorted(st.session_state.votes.items(), key=lambda x: x[1], reverse=True)
        
        st.subheader("🏆 投票統計")
        
        for idx, (model, votes) in enumerate(sorted_votes, 1):
            col1, col2, col3 = st.columns([1, 3, 1])
            with col1:
                if idx == 1:
                    st.markdown("### 🥇")
                elif idx == 2:
                    st.markdown("### 🥈")
                elif idx == 3:
                    st.markdown("### 🥉")
                else:
                    st.markdown(f"### {idx}")
            with col2:
                st.markdown(f"### {model}")
            with col3:
                st.markdown(f"### {votes} 票")
            
            # 顯示投票進度條
            max_votes = sorted_votes[0][1] if sorted_votes else 1
            st.progress(votes / max_votes if max_votes > 0 else 0)
            st.divider()
        
        # 歷史記錄
        if st.session_state.history:
            with st.expander(f"📜 查看對戰歷史 ({len(st.session_state.history)} 場)"):
                for idx, record in enumerate(reversed(st.session_state.history), 1):
                    st.caption(f"**對戰 #{len(st.session_state.history) - idx + 1}** - {record['timestamp']}")
                    st.text(f"問題: {record['prompt'][:50]}...")
                    st.text(f"模型: {record['model_a']} vs {record['model_b']}")
                    st.divider()
        
        # 重置按鈕
        if st.button("🔄 重置所有數據", type="secondary"):
            st.session_state.votes = {}
            st.session_state.history = []
            st.session_state.current_responses = None
            st.success("已重置所有數據！")
            time.sleep(1)
            st.rerun()
    else:
        st.info("📝 還沒有投票記錄，開始進行 AI 對戰吧！")
        st.markdown("""        
        ### 如何使用：
        1. 在側邊欄選擇功能模式（文字、圖片或影片生成）
        2. 選擇要對戰的兩個 AI 模型
        3. 輸入您的提示詞
        4. 比較兩個模型的輸出結果
        5. 投票給您認為更好的模型
        6. 在排行榜查看統計結果
        """)

# 頁腳
st.divider()
st.caption("🤖 AI 模型對戰平台 | 基於 lmarena.ai 概念 | Made with Streamlit")