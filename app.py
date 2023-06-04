from flask import Flask, request
from PyPDF2 import PdfFileReader
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"

def extract_text_from_pdf(file_path):
    with open(file_path, "rb") as file:
        pdf = PdfFileReader(file)
        text = ""
        for page in range(pdf.getNumPages()):
            text += pdf.getPage(page).extractText()
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


if __name__ == "__main__":
    app.run(port=5000)