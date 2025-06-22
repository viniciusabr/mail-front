import  { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'



function Home() {
  const inputName = useRef()
  const inputCaso = useRef()
  const inputEmail = useRef()
  const dataCadastro = new Date()
  
  const [users , setUsers ] = useState([])

  const [showCards, setShowCards] = useState(false); // Controla a visibilidade dos cards

  //função utilizada para listar os dados
  async function getUsers(){
      let usersFromApi = await api.get('/customers')

      setUsers(usersFromApi.data)
    

  }

  //função utilizada para criar usuário
  async function createUsers(){
    
        if( inputName.current.value === "" ||  inputCaso.current.value === "" || inputEmail.current.value === ""){
         alert('Não é possível enviar o e-mail! Preencha todos os campos!')
        }else{
          await api.post('/customers', {
            name: inputName.current.value,
            caso: inputCaso.current.value,
            email: inputEmail.current.value,
            data: dataCadastro       
          })

        }

  }

 
  //hook utilizado para atualizar as variávies.
  useEffect (() => {
    getUsers()    
  }, [] )

  const toggleCardsVisibility = () => {
    setShowCards(prevShowCards => !prevShowCards);
  };

  
  return (
     <div >
      <div className='conteiner'>
        <form method='POS'>
        <h1>E-mail CSAT</h1>
        <input name='nome'type="text" placeholder='Nome' ref={inputName} required/>
        <input name='Ncaso' type="text" placeholder='Número do caso' ref={inputCaso} required/>
        <input name='email' type="email" placeholder='E-mail' ref={inputEmail} required/>
        
        <button onClick={createUsers}>Enviar </button>
        <div
        onClick={toggleCardsVisibility}
        className="btnRegistro"
      >
        {showCards ? 'Ocultar Registros' : 'Exibir Registros'}
      </div>
      </form>
    </div>
    
      
      {showCards && (
        
        <div className="cards-container">
          {users.length > 0 ? (
            users.map(user => (
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
     </div> 
  )

}


export default Home
