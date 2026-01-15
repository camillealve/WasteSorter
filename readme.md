# Local Waste & Recycling Scanner

**Description:**  
A full-stack web application that scans barcodes of household products and uses AI to provide region-specific disposal instructions. Built with React, Node.js, and OpenAI.

---

## Project Structure

```
WasteSorter/
├─ frontend/       # React app with barcode scanner
├─ backend/        # Node.js Express backend
└─ ai-service/     # FastAPI AI service
```

---

## Prerequisites

- Node.js >= 18  
- npm >= 9  
- Python >= 3.10  
- pip  
- OpenAI API key  

---

## 1️⃣ Setup AI Service

1. Navigate to AI service folder:

```bash
cd WasteSorter/ai-service
```

2. Install Python dependencies:

```bash
pip install fastapi uvicorn openai pydantic python-dotenv
```

3. Create a `.env` file in `ai-service`:

```
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

> Replace with your **real OpenAI API key**  

4. Start the AI service:

```bash
uvicorn main:app --reload --port 8000
```

- The service runs at `http://127.0.0.1:8000`

---

## 2️⃣ Setup Backend

1. Navigate to backend folder:

```bash
cd WasteSorter/backend
```

2. Install Node dependencies:

```bash
npm install express cors axios
```

3. Start backend server:

```bash
node index.js
```

- The backend runs at `http://localhost:5001`  
- Logs all incoming requests

---

## 3️⃣ Setup Frontend

1. Navigate to frontend folder:

```bash
cd WasteSorter/frontend
```

2. Install React dependencies:

```bash
npm install
npm install react-qr-barcode-scanner
```

3. Start frontend:

```bash
npm start
```

- The app runs at `http://localhost:3000`  
- Scan barcodes or enter them manually  

---

## 4️⃣ Test the AI Service Directly

```bash
curl -X POST http://127.0.0.1:8000/analyze \
-H "Content-Type: application/json" \
-d '{"barcode":"0123456789012","city":"Toronto"}'
```

- Should return JSON like:

```json
{
  "product_type": "Plastic water bottle",
  "material": "PET plastic",
  "category": "Recycling",
  "explanation": "Plastic water bottle made of PET plastic should go in Recycling. Rinse and place in blue bin."
}
```

---

## 5️⃣ Test Backend

```bash
curl -X POST http://localhost:5001/dispose \
-H "Content-Type: application/json" \
-d '{"barcode":"0123456789012","city":"Toronto"}'
```

- Should return the same JSON from AI  
- Backend logs should show:

```
Request reached backend!
Body: { barcode: "0123456789012", city: "Toronto" }
Calling AI service...
AI response: {...}
```

---

## 6️⃣ Test Frontend

1. Open browser at `http://localhost:3000`  
2. Use the **camera scanner** to scan a barcode  
3. Check that **disposal instructions appear**  
4. Alternatively, **enter a barcode manually** and click Submit

---

## 7️⃣ Optional Commands

- Kill any Node processes if backend port is busy:

```bash
lsof -i :5001      # List processes
kill -9 <PID>      # Kill process
```

- Restart AI service:

```bash
uvicorn main:app --reload --port 8000
```

- Restart backend:

```bash
node index.js
```

---

## Notes

- Make sure the **AI service (port 8000) runs before the backend**  
- Make sure the **backend (port 5001) runs before the frontend**  
