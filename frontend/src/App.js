import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function App() {

  const [result, setResult] = useState(null);
  const [barcode, setBarcode] = useState(null);

  const [lastScanned, setLastScanned] = useState("");

  const handleScan = async (scannedBarcode) => {
    if (scannedBarcode === lastScanned) return; // skip duplicates
    setLastScanned(scannedBarcode);
    setBarcode(scannedBarcode);
    
    try {
      const response = await fetch("http://localhost:5001/dispose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: scannedBarcode, city: "Toronto" }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error calling backend:", err);
    }
  };
  

  return (
    <div style={{ padding: 20 }}>
      <h1>Waste Scanner</h1>

      <BarcodeScannerComponent
        onUpdate={(err, result) => {
          if (result) handleScan(result.text);
        }}
      />
    
    <div style={{ marginTop: 20 }}>
  <input
    type="text"
    placeholder="Enter barcode manually"
    value={barcode}
    onChange={(e) => setBarcode(e.target.value)}
  />
  <button onClick={() => handleScan(barcode)}>Submit</button>
</div>  

      <p>Scanned barcode: {barcode}</p>

        {result && (
      <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>Disposal Instructions</h2>
        <p><strong>Product Type:</strong> {result.product_type}</p>
        <p><strong>Material:</strong> {result.material}</p>
        <p><strong>Category:</strong> {result.category}</p>
        <p><strong>Explanation:</strong> {result.explanation}</p>
      </div>
    )}
    </div>
  );
}
