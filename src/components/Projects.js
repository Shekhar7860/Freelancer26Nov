import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import OfflineNotice from './OfflineNotice';
export default class Projects extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
      };
   
 }
 componentDidMount() {

 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

  searchPage = () =>{
    alert("searching Page")   
        }

  render() {
   
    return (
        
     <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
    <OfflineNotice/> 
    <View style={styles.toolbar} >
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.menuicon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>Projects</Text>
         <TouchableOpacity onPress={() => this.searchPage()}>
        <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
     </View>
     <View style={styles.homeContent}>
         <View style={styles.messageBox}>
        
         </View>
     </View>
 </SafeAreaView>
      
     
    );
  }
}
