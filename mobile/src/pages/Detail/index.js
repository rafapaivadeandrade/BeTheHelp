import React from 'react';
import {View, TouchableOpacity,Image,Text,Linking}  from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import logo from '../../assets/logo.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Mailcomposer from 'expo-mail-composer';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();
    const message = 'hello apad, i am using whatsapp';

    const incident = route.params.incident;


    function navigateBack(){
        navigation.goBack();
    }
    function sendMail(){
      Mailcomposer.composeAsync({
          subject: `${incident.title}`,
          recipients: [incident.email],
          body: `Hello ${incident.name}, I am contacting to help in the case "${incident.title}" with the value of ${Intl.NumberFormat('en-CA',{style: 'currency', currency: 'CAD'}).format(incident.value)}`
      })
    }
    function WhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatssapp}&text=${message}`);
    }

    return (
        <View style= {styles.container}>
        <View style={styles.header}>
            <Image style ={styles.image}source={logo}/>

            <TouchableOpacity onPress={navigateBack}>
                <Feather name = "arrow-left" size={28} color="#E82041"/>
            </TouchableOpacity>
        </View>

        <View style = {styles.incident}>
        <Text style ={styles.incidentProperty}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.name} of {incident.city}/{incident.province}</Text>
                    
                    <Text style ={styles.incidentProperty}>Case:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style ={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('en-CA',{style: 'currency', currency: 'CAD'}).format(incident.value)}</Text>
                    

        </View>
        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Save the day</Text>
          <Text style={styles.heroTitle}>Help this case.</Text>

          <Text>Contact:</Text>
          
          <View style ={styles.actions}>
              <TouchableOpacity style = {styles.action} onPress={WhatsApp}>
                  <Text style ={styles.actionText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.action} onPress={sendMail}>
                  <Text style ={styles.actionText}>E-mail</Text>
              </TouchableOpacity>
          </View>

                    
        </View>
        </View>
    )
}