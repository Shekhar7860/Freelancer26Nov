import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import MyView from './MyView';
import { strings } from '../services/stringsoflanguages';
import OfflineNotice from './OfflineNotice';
export default class Payment extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        search : true
      };
   
 }
 componentDidMount() {

 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

   searchPage = () =>{
    this.setState({ search: false});
        }

  render() {
   
    return (
        
     <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
    <OfflineNotice/> 
    <View style={styles.topView}>
       <MyView  hide={this.state.search} style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput  style={styles.searchContainer} placeholder="Search job"  placeholderTextColor="white" style={styles.topInput}/>
          </View>
      </MyView>
    <MyView style={styles.tabsToolbar} hide={!this.state.search}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.menuicon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>{strings.Payment}</Text>
         <TouchableOpacity onPress={() => this.searchPage()}>
        <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
     </MyView>
     </View>
     <View style={styles.homeContent}>
         <View style={styles.messageBox}>
        
         </View>
     </View>
 </SafeAreaView>
      
     
    );
  }
}
