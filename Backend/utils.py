import os
import re
import spacy
from bs4 import BeautifulSoup

# Initialize spaCy model
nlp = spacy.load('en_core_web_sm', disable=['parser'])
nlp.add_pipe('sentencizer')
MAX_TEXT_LENGTH = nlp.max_length  # Adjust as needed

def chunk_text_with_nlp_overlap(text, max_length=300, min_overlap=None):
    """Chunk text into segments with a maximum length, ensuring logical coherence with NLP-based overlap."""
    if min_overlap is None:
        min_overlap = int(0.1 * max_length)

    chunks = []
    current_chunk = []
    current_length = 0
    overlap_sentences = []

    for sentence in nlp(text).sents:
        sentence_text = sentence.text.strip()
        sentence_length = len(sentence_text)

        if current_length + sentence_length > max_length and current_chunk:
            chunk = " ".join(current_chunk)
            chunks.append(chunk)
            current_chunk = overlap_sentences.copy()
            current_length = sum(len(s) + 1 for s in overlap_sentences)
            overlap_sentences = []

        current_chunk.append(sentence_text)
        current_length += sentence_length + 1

        if current_length >= max_length - min_overlap:
            overlap_sentences.append(sentence_text)

    if current_chunk:
        chunk = " ".join(current_chunk)
        chunks.append(chunk)

    return chunks

def clean_text(content):
    if not content:
        return ""
    if content.strip().startswith('%PDF-'):
        text = content
    else:
        soup = BeautifulSoup(content, 'html.parser')
        for element in soup(['script', 'style', 'head', 'title', 'meta', '[document]', 'noscript']):
            element.decompose()
        text = soup.get_text(separator=' ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_new_keywords(texts, name):
    keywords = []
    for text in texts:
        doc = nlp(text)
        for ent in doc.ents:
            if ent.label_ in ['ORG', 'GPE', 'PERSON'] and ent.text.lower() != name.lower():
                keywords.append(ent.text)
    keywords = list(set(keywords))
    return keywords[:5]

def save_summary(name, summaries_with_urls, output_dir='output'):
    os.makedirs(output_dir, exist_ok=True)
    safe_name = re.sub(r'[\\/*?:"<>|]', "", name)
    filename = os.path.join(output_dir, f"{safe_name}_summary.txt")
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            for summary, url in summaries_with_urls:
                f.write(f"URL: {url}\n")
                f.write(f"Summary:\n{summary}\n\n")
        print(f"Summary saved to '{filename}'.")
    except Exception as e:
        print(f"An error occurred while saving the summary: {e}")
