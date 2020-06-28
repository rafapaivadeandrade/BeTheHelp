import React, {useEffect,useState} from 'react';
import {View,Text, FlatList, Image, TouchableOpacity}  from 'react-native';
import logo from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api'
import {Feather}from '@expo/vector-icons';
export default function Incidents(){

    const [incidents,setIncidents] = useState([]);
    const[total,setTotal] = useState(0);
    const navigation = useNavigation();
    const[loading,setLoading] = useState(false);
    const[page,setPage] = useState(1);


     function navigateToDetail(incident){
         navigation.navigate('Detail',{incident})
     }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0  && incidents.length === total){
            return;
        }

        setLoading(true);

         const response = await api.get('/incidents', {
             headers: {page}
         });
         setIncidents(response.data);
         setTotal(response.headers['x-total-count']);
         setPage(page +1);
         setLoading(false);
     }

     useEffect(() => {
        loadIncidents();
     }, [])

    return (   
        <View style= {styles.container}>
            <View style={styles.header}>
                <Image style ={styles.image}source={logo}/>
                <Text style={styles.headerText}>
    Total of <Text styles={styles.headerTextBold}>{total} case(s)</Text>
                </Text>
            </View>
            <Text  style ={styles.title}>Welcome!</Text>
            <Text  style= {styles.description}>Choose a case below and save day</Text>

            <FlatList 
            data={incidents}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator = {false}
            onEndReached= { loadIncidents}
            onEndReachedThreshold = {0.2}
            renderItem={({item:incident}) => (
                <View style={styles.incidentList}>
                <View style ={styles.incident}>
                    <Text style ={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
                    
                    <Text style ={styles.incidentProperty}>Case:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style ={styles.incidentProperty}>VALUE:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('en-CA',{style: 'currency', currency: 'CAD'}).format(incident.value)}</Text>
                    
                    <TouchableOpacity
                    style ={styles.detailsButton}
                    onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>See Details</Text>
                        <Feather  name="arrow-right" size= {16} color = "#E02041"/>
                    </TouchableOpacity>
                </View>
                
            </View>
            )}
            />

          
        </View>

    )
}