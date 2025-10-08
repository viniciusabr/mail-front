import * as webllm from "@mlc-ai/web-llm";

let llm = null;

export async function initLLM() {
  if (llm) return { llm, montado: true };

  console.log("🚀 Carregando modelo LLM no navegador...");


  llm = await webllm.CreateMLCEngine(
    "Llama-3-8B-Instruct-q4f16_1-MLC",
    {
      chatOpts: {},
      cacheConfig: {
        model: true,
        wasm: true,
      },
      persistCache: true,
    }
  )


  console.log("✅ Modelo carregado!");
  return llm;
}

export async function runPrompt({ systemPrompt, userPrompt }) {
  if (!llm) await initLLM();

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const reply = await llm.chat.completions.create({
    messages,
    stream: false,
  });

  return reply.choices[0].message.content;
}
