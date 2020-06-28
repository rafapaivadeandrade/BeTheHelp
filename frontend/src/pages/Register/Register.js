import React,{useState} from 'react';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import "./Register.css";
import { FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

export default function Register(){
    const[name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setCity] = useState('');
    const [province,setProvince] = useState('');

    const history = useHistory();


    async function handleRegister(e){
            e.preventDefault();

            const data = {
                name,
                email,
                whatsapp,
                city,
                province,
            }

            try{
                const response = await api.post('ongs',data);
                alert(`Your ID access ${response.data.id}`);

                history.push('/');
            }
            catch(err){
                alert('Register error, try again');
            }
    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>Register</h1>
                    <p>Register in the platform and help people find cases on their ONG's</p>

                   <Link to='/' className= "back-link">
                   <FiArrowLeft size={16} color="#E02041"/>
                        Back to Login
                        </Link>
                </section>
                <form onSubmit= {handleRegister}>
                    <input placeholder= "ONG's name"
                    value={name}
                    onChange= {e => setName(e.target.value)}
                    />
                    <input type="email" placeholder= "E-mail"
                    value = {email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder= "Whatsapp"
                    value= {whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="City"
                        value = {city}
                        onChange = {e => setCity(e.target.value)}
                        />
                        <input placeholder="PR" style={{width: 80}}
                        value = {province}
                        onChange = {e => setProvince(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}