import React, { useState } from 'react';

// Função auxiliar para validar e-mail simples
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

function EmailForm() {
  const [nome, setNome] = useState('');
  const [numeroCaso, setNumeroCaso] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [pendingEmailEntries, setPendingEmailEntries] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleNumeroCasoChange = (e) => {
    setNumeroCaso(e.target.value);
  };

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
    setEmailInputError(false);
  };

  // Função para adicionar o conjunto atual de dados à lista de pendentes
  const handleAddEntryToList = () => {
    // 1. Validação dos campos antes de adicionar à lista
    if (!nome.trim()) {
      alert('Por favor, preencha o campo Nome.');
      return;
    }
    if (!numeroCaso.trim()) {
      alert('Por favor, preencha o campo Número do caso.');
      return;
    }
    if (!emailInput.trim()) {
      setEmailInputError(true);
      alert('Por favor, preencha o campo E-mail.');
      return;
    }
    if (!isValidEmail(emailInput.trim())) {
      setEmailInputError(true);
      alert('Por favor, insira um formato de e-mail válido.');
      return;
    }

    // Verifica se o e-mail já existe na lista de pendentes para evitar duplicatas
    const isDuplicate = pendingEmailEntries.some(entry => 
      entry.destinatario === emailInput.trim() && 
      entry.nome === nome.trim() && 
      entry.numeroCaso === numeroCaso.trim()
    );

    if (isDuplicate) {
      alert('Esta entrada (Nome, Número do Caso, E-mail) já foi adicionada à lista.');
      return;
    }

    // Se todas as validações passarem, cria a nova entrada
    const newEntry = {
      id: Date.now(), // Um ID único simples para a chave da lista no front-end
      nome: nome.trim(),
      numeroCaso: numeroCaso.trim(),
      destinatario: emailInput.trim(),
    };

    setPendingEmailEntries(prevEntries => [...prevEntries, newEntry]);

    // Limpa o formulário após adicionar à lista
    setNome('');
    setNumeroCaso('');
    setEmailInput('');
    setEmailInputError(false);
    alert('Informações adicionadas à lista de envios!');
  };

  // Função para remover um item da lista de pendentes
  const handleRemoveEntry = (idToRemove) => {
    setPendingEmailEntries(prevEntries => prevEntries.filter(entry => entry.id !== idToRemove));
  };

  // FUNÇÃO AJUSTADA: Envia todos os e-mails na lista de pendentes em uma única requisição
  const handleSendAllEmails = async () => {
    if (pendingEmailEntries.length === 0) {
      alert('Não há e-mails na lista para enviar.');
      return;
    }

    setIsSending(true); // Ativa o estado de carregamento

    // Mapeia os dados para o formato desejado pelo backend
    const dataToSend = pendingEmailEntries.map(entry => ({
      name: entry.nome,
      email: entry.destinatario,
      caso: entry.numeroCaso,
      // Você pode adicionar mais campos aqui se sua API precisar,
      // como assunto ou corpo da mensagem, que seriam os mesmos para todos
      // ou personalizados se a API os processar.
    }));

    // Cria o payload final com a chave "data"
    const payload = {
      data: dataToSend
    };

    console.log('Payload pronto para envio em lote:', payload);

    try {
      // Substitua 'SUA_URL_DA_API_DE_ENVIO_DE_EMAIL_EM_LOTE' pela URL real da sua API
      // Sua API agora deve esperar um array de objetos sob a chave 'data'
      const response = await fetch('SUA_URL_DA_API_DE_ENVIO_DE_EMAIL_EM_LOTE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Se sua API exigir autenticação (ex: token de API), adicione aqui:
          // 'Authorization': 'Bearer SEU_TOKEN_AQUI' 
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Todos os ${pendingEmailEntries.length} e-mails foram enviados e registrados com sucesso!`);
        // Opcional: Se sua API de envio já registra no DB, não precisa de outra chamada
        // Se precisar de uma API de registro separada, chame-a aqui, passando o 'payload'
        // await fetch('SUA_URL_DA_API_DE_REGISTRO_NO_DB', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(payload),
        // });
      } else {
        const errorData = await response.json();
        alert(`Erro ao enviar e-mails: ${errorData.message || response.statusText}`);
        console.error('Erro na resposta da API:', errorData);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API de e-mail:', error);
      alert('Ocorreu um erro ao enviar os e-mails. Verifique a conexão ou tente novamente mais tarde.');
    } finally {
      setIsSending(false); // Desativa o estado de carregamento
      setPendingEmailEntries([]); // Limpa a lista de pendentes após a tentativa de envio
    }
  };

  return (
    <div style={formStyles.container}>
      <h1 style={formStyles.title}>E-mail CSAT</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={formStyles.inputGroup}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={handleNomeChange}
            style={formStyles.input}
          />
        </div>
        <div style={formStyles.inputGroup}>
          <input
            type="text"
            placeholder="Número do caso"
            value={numeroCaso}
            onChange={handleNumeroCasoChange}
            style={formStyles.input}
          />
        </div>
        
        <div style={formStyles.inputGroup}>
          <input
            type="email"
            placeholder="E-mail"
            value={emailInput}
            onChange={handleEmailInputChange}
            style={{
              ...formStyles.input,
              borderColor: emailInputError ? 'red' : formStyles.input.borderColor,
            }}
          />
          {emailInputError && (
            <p style={formStyles.errorMessage}>Formato de e-mail inválido.</p>
          )}
        </div>

        <button type="button" onClick={handleAddEntryToList} style={formStyles.addButton}>
          Adicionar à Lista
        </button>
      </form>

      {pendingEmailEntries.length > 0 && (
        <div style={formStyles.pendingListContainer}>
          <h3 style={formStyles.pendingListTitle}>E-mails a Enviar ({pendingEmailEntries.length})</h3>
          <ul style={formStyles.pendingList}>
            {pendingEmailEntries.map(entry => (
              <li key={entry.id} style={formStyles.pendingListItem}>
                <span>{entry.nome} (Caso: {entry.numeroCaso}) para: {entry.destinatario}</span>
                <button onClick={() => handleRemoveEntry(entry.id)} style={formStyles.removePendingButton}>
                  X
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSendAllEmails}
            style={formStyles.sendAllButton}
            disabled={isSending}
          >
            {isSending ? 'Enviando...' : 'Enviar Todos os E-mails'}
          </button>
        </div>
      )}

      <button style={formStyles.showRecordsButton}>
        Exibir Registros
      </button>
    </div>
  );
}

// Estilos (mantidos os mesmos do exemplo anterior)
const formStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#2E2D4E',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  title: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'normal',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '10px',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '12px 10px',
    border: '1px solid #7a7096',
    borderRadius: '4px',
    backgroundColor: '#3a3450',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  addButton: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  pendingListContainer: {
    width: '100%',
    backgroundColor: '#3a3450',
    borderRadius: '8px',
    padding: '15px',
    marginTop: '20px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
  },
  pendingListTitle: {
    color: '#fff',
    fontSize: '18px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  pendingList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    maxHeight: '200px',
    overflowY: 'auto',
    borderBottom: '1px solid #5a5076',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  pendingListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5a5076',
    borderRadius: '4px',
    padding: '8px 12px',
    marginBottom: '8px',
    color: '#fff',
    fontSize: '14px',
  },
  removePendingButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  sendAllButton: {
    width: '100%',
    padding: '15px 20px',
    backgroundColor: '#a397ed',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  showRecordsButton: {
    background: 'none',
    border: 'none',
    color: '#a397ed',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    textDecoration: 'none',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: '0',
    textAlign: 'left',
    width: '100%',
  },
};

export default EmailForm;