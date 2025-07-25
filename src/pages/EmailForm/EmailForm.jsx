import React from 'react';
import formStyles from './formStyles';
import FormInput from '../../components/FormInput/FormInput';
import PendingEmailList from '../../components/PendingEmailList/PendingEmailList';
import useEmailForm from './useEmailForm';

function EmailForm() {
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
    isSending
  } = useEmailForm();

  return (
    <div style={formStyles.container}>
      <h1 style={formStyles.title}>E-mail CSAT</h1>

      <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
        <div style={formStyles.inputGroup}>
          <FormInput
            type="text"
            placeholder="Nome do cliente"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            error={nomeError && "Por favor, preencha o campo Nome do cliente."}
          />
        </div>

        <div style={formStyles.inputGroup}>
          <FormInput
            type="text"
            placeholder="Número do caso"
            value={numeroCaso}
            onChange={(e) => setNumeroCaso(e.target.value)}
            error={casoError && "Por favor, preencha o campo Numero do Caso."}
          />
        </div>

        <div style={formStyles.inputGroup}>
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
        </div>

        <button
          type="button"
          onClick={handleAddEntryToList}
          style={formStyles.addButton}
        >
          Adicionar à Lista
        </button>
      </form>

      {pendingEmailEntries.length > 0 && (
        <PendingEmailList
          entries={pendingEmailEntries}
          onRemove={handleRemoveEntry}
          onSendAll={handleSendAllEmails}
          isSending={isSending}
          styles={formStyles}
        />
      )}

      <button style={formStyles.showRecordsButton}>
        Exibir Registros
      </button>
    </div>
  );
}

export default EmailForm;
