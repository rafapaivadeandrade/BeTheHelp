import React, { useState ,useEffect} from "react";
import logo from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';
import { FiPower,FiTrash2} from 'react-icons/fi';
import './Profile.css';

export default function Profile(){
    const[incidents,setIncidets] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                aut: ongId,
            }
        }).then(response => {
            setIncidets(response.data);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        try{
            console.log(id,ongId);
            await api.delete(`incidents/${id}`,{
                headers:{
                    aut: ongId,
                }
            })

            setIncidets(incidents.filter(incident => incident.id !== id));
        }
        catch(err){
            alert('Error to delete case, try again.');
        }
    }

    async function handleLogout(){
        localStorage.clear();

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="bethehero"/>
                <span>
                    Welcome, {ongName}
                </span>
                <Link className="button" to="/incidents/new">Register new case</Link>
                <button type="button" onClick={()=>{handleLogout()}}>
                    <FiPower    size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Registered cases</h1>

            <ul>
                {incidents.map( incident =>
                    <li key={incident.id}>
                    <strong>Case:</strong>
                   <p>{incident.title}</p>

                    <strong>Description:</strong>
                    <p>{incident.description}</p>

                    <strong>Value:</strong>
                    <p>{Intl.NumberFormat('en-CA',{style: 'currency',currency:'CAD'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                )}
                        
        </ul>
        </div>
    )
}