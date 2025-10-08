// import { useState } from "react";
// import { initLLM, runPrompt } from "../../services/llmClient";

// function TestIA() {
//   const [prompt, setPrompt] = useState("");
//   const [resposta, setResposta] = useState("");

//   async function handleGerar() {
//     await initLLM();

//     const result = await runPrompt({
//       systemPrompt: "Você gera e-mails de CSAT. Responda APENAS JSON.",
//       userPrompt: prompt, // usa o texto digitado
//     });

//     console.log("📩 Resposta bruta da IA:", result);

//     // tenta formatar bonito se for JSON
//     try {
//       const parsed = JSON.parse(result);
//       setResposta(JSON.stringify(parsed, null, 2));
//     } catch {
//       setResposta(result);
//     }
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Teste IA (WebGPU)</h1>

//       <textarea
//         rows={4}
//         style={{ width: "100%", marginBottom: "10px" }}
//         placeholder="Digite seu prompt aqui..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       <button
//         onClick={handleGerar}
//         style={{ padding: "10px 20px", marginTop: "10px" }}
//       >
//         Rodar IA
//       </button>

//       {resposta && (
//         <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
//           {resposta}
//         </pre>
//       )}
//     </div>
//   );
// }

// export default TestIA;
