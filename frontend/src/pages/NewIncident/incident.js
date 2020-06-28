import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import "./incident.css";
import { FiArrowLeft} from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';

export default function Incident(){
    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('');
    const[value,setValue] = useState('');
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    
    async function createNewIncident(e){
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        }
        try{
            await api.post('incidents',data,{
                headers: {
                    aut: ongId
                }
            })
    
            history.push('/profile');
        }
        catch(err){
            alert('Error trying to register new case, try again.');
        }
        
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>Register new case</h1>
                    <p>Describe a similar case to find a hero to solve it</p>

                   <Link to='/profile' className= "back-link">
                   <FiArrowLeft size={16} color="#E02041"/>
                        Back to Home
                        </Link>
                </section>
                <form onSubmit={createNewIncident}>
                    <input placeholder= "Cases'title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Description"
                    value= {description}
                    onChange= {e => setDescription(e.target.value)}
                    />
                    <input placeholder= "Value in CAD"
                    value = {value}
                    onChange = {e => setValue(e.target.value) }
                    />

                    <button className="button" type="submit" >Register</button>
                </form>
            </div>
        </div>
    )
}