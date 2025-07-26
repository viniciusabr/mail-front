

// import React from 'react';
// import { motion } from 'framer-motion';
// import FormInput from '../../components/FormInput/FormInput';
// import PendingEmailList from '../../components/PendingEmailList/PendingEmailList';
// import useEmailForm from './useEmailForm';
// import GradientButton from '../../components/GradientButton/GradientButton';

// const MotionForm = motion.form;

// export default function EmailForm() {
//   const {
//     nome, setNome,
//     numeroCaso, setNumeroCaso,
//     emailInput, setEmailInput,
//     validEmail,
//     pendingEmailEntries,
//     nomeError, emailInputError, casoError,
//     handleAddEntryToList,
//     handleRemoveEntry,
//     handleSendAllEmails,
//     isSending
//   } = useEmailForm();

//   return (
//     <div className="flex flex-col items-center w-full max-w-md mx-auto px-4 py-10">
//       <MotionForm
//         onSubmit={(e) => e.preventDefault()}
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full bg-white rounded-xl shadow-lg border border-orange-500 p-8 space-y-6 text-black"
//       >
//         <h2 className="text-2xl font-semibold text-center text-[#512DA8]">Enviar e-mail</h2>

//         <FormInput
//           type="text"
//           placeholder="Nome do cliente"
//           value={nome}
//           onChange={(e) => setNome(e.target.value)}
//           error={nomeError && "Por favor, preencha o campo Nome do cliente."}
//         />

//         <FormInput
//           type="text"
//           placeholder="Número do caso"
//           value={numeroCaso}
//           onChange={(e) => setNumeroCaso(e.target.value)}
//           error={casoError && "Por favor, preencha o campo Número do Caso."}
//         />

//         <FormInput
//           type="email"
//           placeholder="E-mail"
//           value={emailInput}
//           onChange={(e) => setEmailInput(e.target.value)}
//           error={
//             emailInputError
//               ? validEmail
//                 ? "Digite um e-mail válido"
//                 : "Preencha o campo E-mail."
//               : ""
//           }
//         />

//         <GradientButton type="button" onClick={handleAddEntryToList}>
//           Adicionar à Lista
//         </GradientButton>

//         <GradientButton type="button">
//           Exibir Registros
//         </GradientButton>
//       </MotionForm>

//       {pendingEmailEntries.length > 0 && (
//         <div className="w-full flex flex-col gap-4 mt-6 max-h-[230px]">

//           <h3 className="text-white font-semibold text-lg text-center">
//             E-mails a Enviar ({pendingEmailEntries.length})
//           </h3>

//           <PendingEmailList
//             entries={pendingEmailEntries}
//             onRemove={handleRemoveEntry}
//           />

//           <GradientButton type="button" onClick={handleSendAllEmails} disabled={isSending}>
//             {isSending ? "Enviando..." : "Enviar Todos os E-mails"}
//           </GradientButton>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormInput from '../../components/FormInput/FormInput';
import PendingEmailList from '../../components/PendingEmailList/PendingEmailList';
import useEmailForm from './useEmailForm';
import GradientButton from '../../components/GradientButton/GradientButton';

const MotionForm = motion.form;

export default function EmailForm() {
  const [layoutShifted, setLayoutShifted] = useState(false);
  const {
    nome, setNome,
    numeroCaso, setNumeroCaso,
    emailInput, setEmailInput,
    validEmail,
    pendingEmailEntries,
    nomeError, emailInputError, casoError,
    handleAddEntryToList,
    handleRemoveEntry,
    handleSendAllEmails,
    isSending,
  } = useEmailForm();

  const onAddToList = () => {
    const wasSuccessful = handleAddEntryToList()

    if (wasSuccessful) {
      setLayoutShifted(true)
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-10">
      <AnimatePresence>
        {!layoutShifted ? (
          <MotionForm
            key="form-default"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-white rounded-xl shadow-lg border border-orange-500 p-8 space-y-6 text-black"
          >
            <h2 className="text-2xl font-semibold text-center text-[#512DA8]">Enviar e-mail</h2>

            <FormInput
              type="text"
              placeholder="Nome do cliente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={nomeError && "Por favor, preencha o campo Nome do cliente."}
            />

            <FormInput
              type="text"
              placeholder="Número do caso"
              value={numeroCaso}
              onChange={(e) => setNumeroCaso(e.target.value)}
              error={casoError && "Por favor, preencha o campo Número do Caso."}
            />

            <FormInput
              type="email"
              placeholder="E-mail"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              error={
                emailInputError
                  ? validEmail
                    ? "Digite um e-mail válido"
                    : "Preencha o campo E-mail."
                  : ""
              }
            />

            <GradientButton type="button" onClick={onAddToList}>
              Adicionar à Lista
            </GradientButton>

            <GradientButton type="button">
              Exibir Registros
            </GradientButton>
          </MotionForm>
        ) : (
          <motion.div
            key="form-split"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full gap-6 items-start"
          >
            {/* FORMULÁRIO */}
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-orange-500 p-8 space-y-6 text-black">
              <h2 className="text-2xl font-semibold text-center text-[#512DA8]">Enviar e-mail</h2>

              <FormInput
                type="text"
                placeholder="Nome do cliente"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                error={nomeError && "Por favor, preencha o campo Nome do cliente."}
              />

              <FormInput
                type="text"
                placeholder="Número do caso"
                value={numeroCaso}
                onChange={(e) => setNumeroCaso(e.target.value)}
                error={casoError && "Por favor, preencha o campo Número do Caso."}
              />

              <FormInput
                type="email"
                placeholder="E-mail"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                error={
                  emailInputError
                    ? validEmail
                      ? "Digite um e-mail válido"
                      : "Preencha o campo E-mail."
                    : ""
                }
              />

              <GradientButton type="button" onClick={onAddToList}>
                Adicionar à Lista
              </GradientButton>
            </div>

            {/* LISTA + BOTÃO */}
            <div className="flex flex-col justify-between w-1/2 gap-4 h-full -mt-11">
              <div>
                <h3 className="text-white font-semibold text-lg text-center">
                  E-mails a Enviar ({pendingEmailEntries.length})
                </h3>

                <div className="overflow-y-auto max-h-[500px] mt-4 pr-1">
                  <PendingEmailList
                    entries={pendingEmailEntries}
                    onRemove={handleRemoveEntry}
                  />
                </div>
              </div>

              <GradientButton type="button" onClick={handleSendAllEmails} disabled={isSending}>
                {isSending ? "Enviando..." : "Enviar Todos os E-mails"}
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
