from fastapi import FastAPI
from pydantic import BaseModel
import json

app = FastAPI()

# Load rules once at startup
with open("rules.json") as f:
    rules = json.load(f)

class AnalyzeRequest(BaseModel):
    barcode: str
    city: str

# Simple eco tips for demo
eco_tips = {
    "PET plastic": "Rinse and place in blue bin; reuse bottles when possible.",
    "organic": "Compost to reduce landfill waste.",
    "aluminum": "Recycle in metal bin; cans can be reused.",
    "unknown material": "Dispose in garbage responsibly."
}

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    # Step 1: Barcode → product inference
    barcode_map = {
        "123456789": ("plastic bottle", "PET plastic"),
        "987654321": ("banana peel", "organic"),
        "555555555": ("aluminum can", "aluminum")
    }

    product_type, material = barcode_map.get(
        req.barcode, ("unknown item", "unknown material")
    )

    # Step 2: Material → disposal category
    city_rules = rules.get(req.city, rules.get("Toronto"))  # default Toronto
    category = city_rules.get(material, "Garbage")

    # Step 3: Generate explanation
    explanation = f"{product_type.capitalize()} made of {material} should go in {category}. {eco_tips.get(material,'Dispose responsibly.')}"

    return {
        "barcode": req.barcode,
        "product_type": product_type,
        "material": material,
        "category": category,
        "explanation": explanation
    }
