import React, { useState, useRef } from 'react';
import EmailTagInput from './EmailTagInput'; // Importe o componente de tags de e-mail


function EmailForm() {
    
    const [showCards, setShowCards] = useState(false); // Controla a visibilidade dos cards
    
    const toggleCardsVisibility = () => {
    setShowCards(prevShowCards => !prevShowCards);
  };

  const [nomes, setNome] = useState([]);
  const [inputNome, setInputNome] = useState('')
  const [numeroCaso, setNumeroCaso] = useState([]);
  // Não precisamos de um estado para os e-mails aqui, pois EmailTagInput gerencia isso
  // mas usaremos uma ref para acessá-los

  const emailTagInputRef = useRef(null); // Ref para o componente EmailTagInput

  const handleNomeChange = (e) => {
    setInputNome(e.target.value);

  };

  const handleNumeroCasoChange = (e) => {
    e.preventDefault()
    setNumeroCaso(e.target.value);
  };
  const addNome = (nome) => {
   const trimNome =  nome.trim()
    if (trimNome && !nomes.includes(trimNome)){
        setNome([...nomes, trimNome])
        

    } 
        

 }

  const handleInputBlur = () => {
    if (inputNome) {
      addNome(inputNome);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página ao enviar o formulário

    addNome(inputNome)

    // Coleta os e-mails do componente filho usando a ref
    const emailsColetados = emailTagInputRef.current ? emailTagInputRef.current.getEmails() : [];

    // ** Validação Básica (adicione validação mais robusta se necessário) **
    if (nomes.length === 0) {
      alert('Por favor, preencha o campo Nome.');
      return;
    }
    if (!numeroCaso) {
      alert('Por favor, preencha o campo Número do caso.');
      return;
    }
    if (emailsColetados.length === 0) {
      alert('Por favor, adicione pelo menos um e-mail.');
      return;
    }

    const dadosParaEnvio = {
      nome: nomes,
      numeroCaso: numeroCaso,
      destinatarios: emailsColetados, // O array de e-mails
    
    };

    console.log('Dados prontos para envio:', dadosParaEnvio);

    // ** DISPARO DA API DE E-MAIL **
    // Substitua 'SUA_URL_DA_API_DE_ENVIO_DE_EMAIL' pela URL real da sua API
    // Certifique-se de que sua API está configurada para receber requisições POST com JSON
    try {
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Se sua API exigir autenticação (ex: token de API), adicione aqui:
          // 'Authorization': 'Bearer SEU_TOKEN_AQUI' 
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (response.ok) {
        alert('E-mail enviado com sucesso!');
        // Limpar o formulário após o envio bem-sucedido
        setNome('');
        setNumeroCaso('');
        if (emailTagInputRef.current) {
          emailTagInputRef.current.clearEmails(); // Limpa os emails no componente filho
        }
      } else {
        const errorData = await response.json(); // Tenta ler a resposta de erro
        alert(`Erro ao enviar e-mail: ${errorData.message || response.statusText}`);
        console.error('Erro na resposta da API:', errorData);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API de e-mail:', error);
      alert('Ocorreu um erro ao enviar o e-mail. Verifique a conexão ou tente novamente mais tarde.');
    }
    
  };
  

  return (
    <div style={formStyles.container} >
      <h1 >E-mail CSAT</h1>
      <form onSubmit={handleSubmit}>
        <div style={formStyles.inputGroup}>
          <input
            type="text"
            placeholder="Nome"
            value={inputNome}
            onChange={handleNomeChange}
            onBlur={handleInputBlur}
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
        
        {/* Componente de tags de e-mail */}
        <EmailTagInput ref={emailTagInputRef} />

        <button type="submit" style={formStyles.sendButton}>
          Enviar
        </button>
        <div
        onClick={toggleCardsVisibility}
        className="btnRegistro"
      >
        {showCards ? 'Ocultar Registros' : 'Exibir Registros'}
      </div>
      {showCards && (
        
        <div className="cards-container">
          {nomes.length > 0 ? (
            nomes.map(user => (
              <div key={user.id} className='card'>
                <p><span>ID: </span>{user.id}</p>
                <p><span>Nome:</span> {user.name}</p>
                <p><span>Número do Caso:</span> {user.caso}</p>
                <p><span>E-mail:</span> {user.email}</p>
                <p><span>Data:</span> {user.data}</p>
              </div>
            ))
          ) : (
            <p className='semRegistro'>Nenhum registro encontrado!</p>
          )}
      </div>
      
        
      )}
      </form>

    

        
    </div>
  );
}

// Estilos para o formulário principal, baseados na sua imagem
const formStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#2E2D4E', // Cor de fundo do card na imagem
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px', // Espaço entre os elementos
  },
  title: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'normal',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '10px', // Espaço entre os inputs
  },
  input: {
    width: 'calc(100% - 20px)', // Largura total menos padding
    padding: '12px 10px',
    border: '1px solid #7a7096', // Borda mais escura para combinar
    borderRadius: '4px',
    backgroundColor: '#3a3450', // Fundo dos inputs
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  sendButton: {
    width: '100%',
    padding: '15px 20px',
    backgroundColor: '#a397ed', // Cor do botão "Enviar"
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px', // Espaço acima do botão
    transition: 'background-color 0.3s ease',
  },
  showRecordsButton: {
    background: 'none',
    border: 'none',
    color: '#a397ed', // Cor do texto "Exibir Registros"
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    textDecoration: 'none', // Remove sublinhado se houver
  },
};

export default EmailForm;