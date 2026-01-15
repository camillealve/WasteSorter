import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";


function App() {
  const [result, setResult] = useState(null);

  const checkDisposal = async () => {
    const res = await fetch("http://localhost:5000/dispose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        barcode: "123456789",
        city: "Toronto"
      })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Waste Scanner</h1>
      <BarcodeScannerComponent
  onUpdate={(err, result) => {
    if (result) {
      console.log(result.text); // barcode number
    }
  }}
/>


      {result && (
        <div>
          <h2>{result.category}</h2>
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  );
}


export default App;
