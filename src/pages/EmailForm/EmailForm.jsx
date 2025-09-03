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

            <h2 className="text-2xl font-semibold text-center text-[#512DA8]">Enviar e-mail </h2> 
            

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

            <GradientButton
              type="button"
              variant="none"
              className="bg-[linear-gradient(to_right,_#6f42c1,_#9b5de5_50%,_#6f42c1)] text-white opacity-100 cursor-not-allowed"
            >
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

              <GradientButton type="button" onClick={onAddToList} >
                Adicionar à Lista
              </GradientButton>
            </div>

            {/* LISTA + BOTÃO */}
            <div className="flex flex-col justify-between w-1/2 gap-4 h-full -mt-11">
              <div>
                <h3 className="text-white font-semibold text-lg flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-300">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.432 7.432a2.25 2.25 0 01-3.182 0L2.909 8.584A2.25 2.25 0 012.25 6.993V6.75" />
                  </svg>
                  <span>E-mails na Fila</span>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-xs font-bold">

                    {pendingEmailEntries.length}
                  </span>
                </h3>

                <div className="overflow-y-auto max-h-[500px] mt-4 pr-1">
                  <PendingEmailList
                    entries={pendingEmailEntries}
                    onRemove={handleRemoveEntry}
                  />
                </div>
              </div>

              <GradientButton
                type="button"
                onClick={handleSendAllEmails}
                disabled={isSending}
                variant="success"
              >
                {isSending ? "Enviando..." : "Enviar Todos os E-mails"}
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
