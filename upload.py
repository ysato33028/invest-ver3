from flask import Flask, request, render_template, redirect, url_for
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    if file:
        df = pd.read_excel(file, sheet_name='指定シート名')
        data = extract_keywords(df)
        return render_template('index.html', data=data)

def extract_keywords(df):
    keywords = ['売上高', '原価']
    extracted_data = {keyword: df[df['column_name'].str.contains(keyword)][keyword].values for keyword in keywords}
    return extracted_data

if __name__ == '__main__':
    app.run(debug=True)
