# ai-service/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os
import json

# Make sure your OpenAI API key is set in environment
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("OpenAI API key not found! Set OPENAI_API_KEY environment variable.")

app = FastAPI()

class ProductRequest(BaseModel):
    barcode: str
    city: str

@app.post("/analyze")
def analyze(request: ProductRequest):
    barcode = request.barcode
    city = request.city

    prompt = (
        f"You are an AI that identifies products from barcodes.\n"
        f"Barcode: {barcode}\n"
        f"City: {city}\n"
        "Identify the product type, material, appropriate disposal category "
        "(e.g., Recycling, Compost, Garbage), and give a short disposal explanation. "
        "Return ONLY valid JSON with keys: product_type, material, category, explanation."
    )

    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )

        text = response.choices[0].message.content

        # Ensure valid JSON
        try:
            data = json.loads(text)
            return data
        except json.JSONDecodeError:
            return {
                "product_type": "Unknown item",
                "material": "Unknown",
                "category": "Unknown",
                "explanation": f"AI could not parse product info for barcode {barcode}."
            }

    except Exception as e:
        return {
            "product_type": "Unknown item",
            "material": "Unknown",
            "category": "Unknown",
            "explanation": f"Error querying AI: {str(e)}"
        }
