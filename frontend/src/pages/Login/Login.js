import React, { useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';
import "./Login.css";
import heroes from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn} from 'react-icons/fi';

export default function Login(){
    const [id,setId] = useState('');
    const history = useHistory();

   async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('/session',{id});
            
            localStorage.setItem('ongId',response.data.id);
            localStorage.setItem('ongName',response.data.name);

            history.push('/profile');
        }
        catch(err){
            alert('Fail to login, try again');
        }
    }

    return(
        <div className  = "login-container">
            <section className= "form">
                <img src={logoImg} alt="bethehero"/>

                <form onSubmit= {handleLogin}>
                    <h1>Login</h1>

                    <input placeholder="Your ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button type= "submit" className= "button">Join</button>

                   <Link to='/register' className= "back-link">
                   <FiLogIn size={16} color="#E02041"/>
                        Create a new Account</Link>
                        
                    
                </form>
            </section>

            <img src={heroes} alt="heroes"/>
        </div>
    );
}