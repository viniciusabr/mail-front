import { toast } from 'react-toastify';
import { sendEmails } from '../../services/emailService';
import { useState } from 'react';


const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function useEmailForm() {
  const [nome, setNome] = useState('');
  const [numeroCaso, setNumeroCaso] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [pendingEmailEntries, setPendingEmailEntries] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [nomeError, setNomeError] = useState(false);
  const [casoError, setCasoError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const handleAddEntryToList = () => {

    let hasError = false;

    if (!nome.trim()) {
      setNomeError(true);
      hasError = true
    } else {
      setNomeError(false);
    }

    if (!numeroCaso.trim()) {
      setCasoError(true);
      hasError = true
    } else {
      setCasoError(false);
    }

    if (!emailInput.trim()) {
      setEmailInputError(true);
      hasError = true
    } else {
      setEmailInputError(false);
    }

    if (!isValidEmail(emailInput) && emailInput.length !== 0) {
      setEmailInputError(true);
      setValidEmail(true);
      toast.error('Digite um e-mail válido');
      return
    }


    if (!/^\d+$/.test(numeroCaso) && numeroCaso.length !== 0) {
      setCasoError(true);
      toast.error("O número do caso deve conter apenas números.");
      return;
    }

    if (numeroCaso.length !== 8 && numeroCaso.length !== 0) {
      setCasoError(true);
      toast.error("O número do caso deve ter exatamente 8 dígitos.");
      return;
    }

    if (hasError) return


    const isDuplicate = pendingEmailEntries.some(entry =>
      entry.destinatario === emailInput.trim() &&
      entry.nome === nome.trim() &&
      entry.numeroCaso === numeroCaso.trim()
    );

    if (isDuplicate) {
      toast.error('Esta entrada (Nome, Número do Caso, E-mail) já foi adicionada à lista.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      nome: nome.trim(),
      numeroCaso: numeroCaso.trim(),
      destinatario: emailInput.trim(),
    };

    setPendingEmailEntries(prev => [...prev, newEntry]);
    setNome('');
    setNumeroCaso('');
    setEmailInput('');
    setEmailInputError(false);
    toast.success('Informações adicionadas à lista de envios!');
  };

  const handleRemoveEntry = (idToRemove) => {
    setPendingEmailEntries(prev => prev.filter(entry => entry.id !== idToRemove));
  };

  const handleSendAllEmails = async () => {
    if (pendingEmailEntries.length === 0) {
      toast.warn('Não há e-mails na lista para enviar.');
      return;
    }

    setIsSending(true);

    const dataToSend = pendingEmailEntries.map(entry => ({
      name: entry.nome,
      email: entry.destinatario,
      caso: entry.numeroCaso,
      data: new Date()
    }));

    const payload = { data: dataToSend };


    try {
      await sendEmails(payload);
      toast.success(`Todos os ${pendingEmailEntries.length} e-mails foram enviados com sucesso!`);

      setPendingEmailEntries([]);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      toast.error(`Erro ao enviar e-mails: ${error.message}`);

    } finally {
      setIsSending(false);
    }
  };

  return {
    nome, setNome,
    numeroCaso, setNumeroCaso,
    emailInput, setEmailInput,
    validEmail, setValidEmail,
    pendingEmailEntries,
    nomeError, emailInputError, casoError,
    setNomeError, setEmailInputError, setCasoError,
    isSending,
    handleAddEntryToList,
    handleRemoveEntry,
    handleSendAllEmails,
  };
}