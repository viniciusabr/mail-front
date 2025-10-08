import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import RichTextEditor from "../../components/Templates/RichTextEditor";
import { runPrompt } from "../../services/llmClient";
import PageLayoutTemplate from "../../components/PageLayoutTemplate";

function TemplateGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [loadingModel, setLoadingModel] = useState(false);

  async function handleGerar() {
    setLoadingModel(true);

    try {
      const result = await runPrompt({
        systemPrompt: `Você é um assistente especializado em criar e-mails de avisos e lembretes em português.

Regras obrigatórias:
1. Responda SOMENTE com o corpo do e-mail em HTML simples, usando apenas <p>, <br>, <strong>, <ul>, <li>.
2. Nunca inclua assunto, título ou explicações fora do corpo do e-mail.
3. O tom deve ser claro, profissional e amigável.
4. No final de TODO e-mail, sempre inclua a assinatura:
   <br><br>
   Atenciosamente,<br>
   Equipe Linx
`,

        userPrompt: prompt,
      });

      console.log("📩 Resposta bruta da IA:", result);

      try {
        const parsed = JSON.parse(result);
        setSubject(parsed.subject || "");
        setBody(parsed.body || "");
      } catch {
        setBody(result);
      }
    } finally {
      setLoadingModel(false);
    }
  }


  function handleSend() {
    console.log("📬 Enviando...");
    console.log("Para:", to);
    console.log("Assunto:", subject);
    console.log("Corpo:", body);
    // aqui depois você chama o backend para envio real
  }

  return (
    <PageLayoutTemplate>
      <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4">
        {/* Prompt */}
        <textarea
          rows={3}
          className="w-full p-3 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 
                     transition shadow-sm"
          placeholder="Exemplo: Crie um e-mail avisando sobre manutenção programada..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Botão Gerar */}
        <motion.button
          whileHover={!loadingModel ? { scale: 1.05 } : {}}
          whileTap={!loadingModel ? { scale: 0.95 } : {}}
          onClick={handleGerar}
          disabled={loadingModel}
          className={`flex items-center justify-center gap-2 px-6 py-3 
                      rounded-lg shadow text-white font-medium transition
                      ${loadingModel
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
            }`}
        >
          <Sparkles size={20} />
          <AnimatePresence mode="wait">
            <motion.span
              key={loadingModel ? "loading" : "ready"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {loadingModel ? "Carregando IA..." : "Gerar com IA"}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Assunto */}
        <input
          type="text"
          placeholder="Assunto do e-mail"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 
                     transition shadow-sm"
        />

        {/* Destinatário */}
        <input
          type="email"
          placeholder="Destinatário"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-purple-400 
                     transition shadow-sm"
        />

        {/* Corpo (editor) */}
        <RichTextEditor content={body} onChange={setBody} />

        {/* Enviar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="flex items-center justify-center gap-2 px-6 py-3 
                     bg-green-600 text-white rounded-lg shadow 
                     hover:bg-green-700 transition font-medium"
        >
          <Send size={20} />
          <AnimatePresence mode="wait">
            <motion.span
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              Enviar E-mail
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </PageLayoutTemplate>
  );
}

export default TemplateGeneratorPage;









// Você é um assistente especialista em gerar e-mails responsivos em MJML.

// Sua tarefa é converter instruções de usuário em código MJML válido e compilável.
// Siga SEMPRE essas regras:

// 1. SEMPRE inicie com <mjml> e termine com </mjml>.
// 2. O conteúdo do e-mail deve estar dentro de:
//    <mjml>
//      <mj-body>
//        <mj-section>
//          <mj-column>
//            ...
//          </mj-column>
//        </mj-section>
//      </mj-body>
//    </mjml>
// 3. Use apenas tags suportadas pelo MJML: <mj-body>, <mj-section>, <mj-column>, <mj-text>, <mj-image>, <mj-button>, <mj-divider>.
//    NUNCA invente tags (ex.: <zone> não existe).
// 4. Cada bloco de conteúdo deve ficar dentro de um <mj-section> com <mj-column>.
// 5. Para o rodapé, SEMPRE inclua:
//    <mj-section background-color="#f7f7f7" padding="20px">
//      <mj-column>
//        <mj-text font-size="16px" font-family="Helvetica" color="#333333">
//          Atenciosamente, Equipe Linx
//        </mj-text>
//      </mj-column>
//    </mj-section>
// 6. Responda SOMENTE com o código MJML (sem explicações).