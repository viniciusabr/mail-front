import React, { useState, forwardRef, useImperativeHandle } from 'react';

// Função auxiliar para validar e-mail simples (pode ser mais robusta)
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Usamos forwardRef para permitir que o componente pai acesse os emails internos
const EmailTagInput = forwardRef((props, ref) => {
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);

  // Expõe a lista de emails para o componente pai através da ref
  useImperativeHandle(ref, () => ({
    getEmails: () => emails,
    // Opcional: método para limpar os emails de fora
    clearEmails: () => setEmails([]) 
  }));

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputError(false);
  };

  const addEmail = (email) => {
    const trimmedEmail = email.trim();
    
    if (trimmedEmail && !emails.includes(trimmedEmail)) {
      if (isValidEmail(trimmedEmail)) {
        setEmails([...emails, trimmedEmail]);
        setInputValue('');
        setInputError(false);
      } else {
        setInputError(true);
      }
    } else {
        setInputValue('');
        setInputError(false);
    }
  };

  const handleKeyDown = (e) => {
    const separators = ['Enter', ',', ';'];

    if (separators.includes(e.key)) {
      e.preventDefault();
      addEmail(inputValue);
    }
    // Lógica para remover o último e-mail com Backspace se o input estiver vazio
    if (e.key === 'Backspace' && inputValue === '' && emails.length > 0) {
      removeEmail(emails[emails.length - 1]);
    }
  };

  const handleInputBlur = () => {
    if (inputValue) {
      addEmail(inputValue);
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  return (
    <div style={styles.emailTagInputContainer}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder="E-mail"
          style={{
            ...styles.input,
            borderColor: inputError ? 'red' : '#ccc',
          }}
        />
      </div>

      {inputError && (
        <p style={styles.errorMessage}>Por favor, insira um e-mail válido.</p>
      )}

      {emails.length > 0 && (
        <div style={styles.emailTagsContainer}>
          {emails.map((email, index) => (
            <div key={index} style={styles.emailTag}>
              <span>{email}</span>
              <button onClick={() => removeEmail(email)} style={styles.removeButton}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      
      <p style={styles.hint}>
        Separar por ponto e vírgula (;) ou vírgula (,)
      </p>
    </div>
  );
});

// Estilos básicos (mantidos do exemplo anterior, com pequenos ajustes para o novo layout)
const styles = {
  emailTagInputContainer: {
    marginBottom: '20px', // Espaçamento para o próximo campo ou botão
  },
  inputContainer: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px',
    display: 'flex',
    backgroundColor: '#fff', // Cor de fundo para o input
  },
  input: {
    flexGrow: '1',
    border: 'none',
    outline: 'none',
    padding: '8px',
    fontSize: '16px', // Aumentei um pouco a fonte
    color: '#333',
    backgroundColor: 'transparent', // Para não sobrepor o background do inputContainer
  },
  emailTagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px',
    padding: '2px',
    
  },
  emailTag: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: '16px',
    padding: '2px 5px',
    fontSize: '12px',
    color: '#333',
    whiteSpace: 'nowrap',
  },
  removeButton: {
    marginLeft: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1',
    padding: '0 4px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: '10px',
  },
  hint: {
    fontSize: '12px',
    color: '#777',
    marginTop: '5px', // Ajustado para ficar mais próximo
    textAlign: 'center',
  },
};

export default EmailTagInput;