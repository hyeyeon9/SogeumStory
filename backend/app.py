from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
from flask_cors import CORS
import base64
import io
from PIL import Image
import random
import os
from dotenv import load_dotenv

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)  # 정확한 origin만 허용


# GeminAI 설정
load_dotenv()  # .env에서 API 키 불러오기

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)


@app.after_request
def after_request(response):
    # CORS header 직접 수동으로 설정해줌
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def serve():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

@app.route('/generate-text', methods=['POST','OPTIONS'])
def generate_text_story():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight success"}), 200

    data = request.json
    print(f"Received data: {data}") 
    keyword = data.get('keyword')
    mainCharacter = data.get('mainCharacter')
    genre = data.get('genre')

    if not keyword or not mainCharacter or not genre:
        return jsonify({"error": "Keyword, Main Character, and Genre are required"}), 400

    # 이야기 생성
    model = genai.GenerativeModel("gemini-pro")
    prompt = f"제목을 '**제목:**'으로 시작하고, 이야기 본문은 '**이야기:**'로 시작하는 형식으로 {genre} 장르의 이야기를 작성해 주세요. 주인공은 {mainCharacter}, 키워드는 {keyword}입니다."
    response = model.generate_content([prompt])

    if response:
        story_parts = response.text.split('**이야기:**', 1)
        title = story_parts[0].replace('**제목:**', '').strip()
        story = story_parts[1].strip() if len(story_parts) > 1 else "No story content."
    else:
        title = "No title generated."
        story = "No story generated."
    
    return jsonify({"title": title, "story": story})

@app.route('/update-story', methods=['POST', 'OPTIONS'])
def update_story():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight success"}), 200

    data = request.json
    original_story = data.get('originalStory', '')
    new_idea = data.get('newIdea','')

    model = genai.GenerativeModel("gemini-pro")
    prompt = f"{original_story} 이후의 내용에 {new_idea}가 포함된 새로운 이야기를 보내줘. 이야기 본문은 '**이야기:**'로 시작하는 형식 해주세요. 그리고 마지막에 추가된 소설의 키워드 몇가지를 보내주세요. '키워드 : #키워드 , #키워드' 형식으로 보내주세요."
    response = model.generate_content([prompt])

    if response:
            story_parts = response.text.split('**이야기:**', 1)
            updated_story = story_parts[1].strip() if len(story_parts) > 1 else "No story content."

               # 키워드 부분 추출
            if '**키워드:**' in updated_story:
                updated_story, keyword_part = updated_story.split('**키워드:**', 1)
                updated_story = updated_story.strip()
                print(f"Extracted keyword part: {keyword_part}")  # 디버그 출력

                # 키워드 분리
                all_keywords = [k.strip() for k in keyword_part.split('#') if k.strip()]
                print(f"All keywords: {all_keywords}")  # 디버그 출력

                # 랜덤으로 3개의 키워드를 선택
                selected_keywords = random.sample(all_keywords, 3) if len(all_keywords) >= 3 else all_keywords
                print(f"Selected keywords: {selected_keywords}")  # 디버그 출력

    else:
            updated_story = "No story generated."
            # selected_keywords = []
    
    return jsonify({"updatedStory": updated_story, 'keywords': selected_keywords})



@app.route('/generate-image', methods=['POST','OPTIONS'])
def generate_image_story():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight success"}), 200
    data = request.form

    # 이미지 처리
    image_data = data.get('image')
    if not image_data:
        return jsonify({"error": "Image file is required"}), 400
    
    # Base64 문자열에서 실제 이미지 데이터만 분리
    image_data = image_data.split(",")[1]
    
    # Base64 문자열을 바이너리로 변환
    image_bytes = base64.b64decode(image_data)
    
    # 이미지를 PIL 이미지로 변환
    image = Image.open(io.BytesIO(image_bytes))

    # 이야기 생성 로직
    mainCharacter = data.get('mainCharacter', '')
    genre = data.get('genre', '')

    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"제목을 '**제목:**'으로 시작하고, 이야기 본문은 '**이야기:**'로 시작하는 형식으로 {genre} 장르의 사진과 관련된 이야기를 작성해 주세요. 주인공은 {mainCharacter}입니다."
    response = model.generate_content([prompt, image])

    story = response.text if response else "No story generated."
    return jsonify({"story": story})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  