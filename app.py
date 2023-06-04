from flask import Flask, request
from flask import jsonify
from PyPDF2 import PdfReader
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"

def extract_text_from_pdf(file_path):
    with open(file_path, "rb") as file:
        pdf = PdfReader(file)
        text = ""
        for page in range(len(pdf.pages)):
            text += pdf.pages[page].extract_text()
        return text

extracted_texts = {}

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    if file.filename == "":
        return "No selected file", 400
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)
    extracted_texts[filename] = extract_text_from_pdf(file_path)
    return "File uploaded and text extracted successfully", 200

@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    if filename not in extracted_texts:
        return "No such file", 404
    return extracted_texts[filename], 200

@app.route('/text/<filename>', methods=['GET'])
def get_text(filename):
    if filename not in extracted_texts:
        return jsonify({"error": "File not found"}), 404
    return jsonify({"text": extracted_texts[filename]})


if __name__ == "__main__":
    app.run(port=5000)
