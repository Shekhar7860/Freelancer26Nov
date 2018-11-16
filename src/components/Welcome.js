import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar, ScrollView, Image, ImageBackground, ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import Service from '../services/Service';
import { colors, fonts, padding, dimensions, align } from "../styles/base.js";
import { strings } from '../services/stringsoflanguages';
import OfflineNotice from './OfflineNotice';
import CustomToast from './CustomToast';
export default class Welcome extends Component {
  
  constructor(props){
    super(props);
   // console.log('propvalue', props);
    service = new Service();
    this.state = {
       userResponse: {},
       id: '',
       englishImage: constants.fillrdrIcon,
       arabicImage: constants.unfilledrIcon
    }
     
}

componentDidMount ()   {
  service.getUserData('user').then((keyValue) => {
    console.log("local", keyValue);
    var parsedData = JSON.parse(keyValue);
    console.log("sidemenujson", parsedData);
    if(parsedData)
    {
      if(parsedData.usertype !== null)
      {
        if(parsedData.usertype == 1 )
      {
      this.props.navigation.navigate('Jobs')
      }
      else
      {
        this.props.navigation.navigate('Home') 
      }
      }
   }
    this.setState({ userResponse: parsedData});
 }, (error) => {
    console.log(error) //Display error
  });
 }



 englishTap = () => {

  if (this.state.check) {
    this.setState({ englishImage: constants.fillrdrIcon });
    this.setState({ arabicImage: constants.unfilledrIcon });
    this.setState({ check: false });
    strings.setLanguage("en");
  
    service.saveUserData("language", true);
  }
 
};
ArabicTap = () => {
  if (!this.state.check) {

  this.setState({ englishImage: constants.unfilledrIcon });
  this.setState({ arabicImage: constants.fillrdrIcon });
  this.setState({ check: true });
  strings.setLanguage("ar");

  service.saveUserData("language", false);

  }
};


overLang() {
  if (this.state.check) {
    //this.setState({ check: false });
    strings.setLanguage("en");
    //alert("t_f");
  } else {
    //this.setState({ check: true });
    strings.setLanguage("ar");
    //alert("f_t");
  }
}



  // going to next screen
  goToLogin = () =>{
   this.props.navigation.navigate('Login')
  }
  
  goToSelect = () =>{
       this.props.navigation.navigate('Login')
      }

  
  render() {
    return (
      
       <ScrollView style={styles.welcomeContainer}>
         <OfflineNotice/> 
       
	     {/* <View style={styles.welcomeHeadline}>
	       <Text style={styles.headlineText}>Freelancer</Text>
		   <TouchableOpacity style={styles.buttonBackground} onPress={() => this.goToSelect()}>
		     <Text style={styles.buttonText}>Create An Account</Text>
		   </TouchableOpacity>
       <View style={styles.rowAlignSideMenu}>
		    <Text style={styles.accountText}>Already have an account? </Text>
        <TouchableOpacity>
        <Text onPress={() => this.goToLogin()} style={styles.welcomeLoginText}>Login</Text>
        </TouchableOpacity>
        </View>
	     </View> */
     
       <View style={styles.welcomeContainer}>
	     <View style={styles.welcomeHeadline}>
	      
         <Image
            source={require("../images/logosmal.png")}
            style={{ padding: 2 }}
          />


		   <TouchableOpacity style={styles.buttonBackground} onPress={() => this.goToSelect()}>
		     <Text style={styles.buttonText}>{strings.CreateAnAccount}</Text>
		   </TouchableOpacity>

       <View style={styles.rowAlignSideMenu}>
		    <Text style={styles.accountText}>{strings.Alreadyhaveanaccount} </Text>
        <TouchableOpacity>
        <Text onPress={() => this.goToLogin()} style={styles.welcomeLoginText}>{strings.Login}</Text>
        </TouchableOpacity>
        </View>

 <View
          style={{
            backgroundColor: "#f0f0f0",
            alignItems: "flex-start",
            width: dimensions.fullWidth - 20,
            marginLeft: 10,
            marginTop: 30,
            height: 50,
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Image
            source={constants.langIcon}
            style={{ marginLeft: 12, width: 25, height: 25 }}
          />
          <Text style={{ marginLeft: 12 }}>{strings.Language}</Text>
          <View
            style={{
              left: dimensions.fullWidth / 2 - 150,
              backgroundColor: "clear",
              width: dimensions.fullWidth / 2,
              height: 50,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity onPress={() => this.englishTap()}>
              <View
                style={{
                  marginLeft: 0,
                  height: 50,
                  backgroundColor: "clear",
                  width: dimensions.fullWidth / 4,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  source={this.state.englishImage}
                  style={{ marginLeft: 0, width: 25, height: 25 }}
                />
                <Text style={{ marginLeft: 8 }}>English</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.ArabicTap()}>
              <View
                style={{
                  marginLeft: 0,
                  height: 50,
                  backgroundColor: "clear",
                  width: dimensions.fullWidth / 4,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  source={this.state.arabicImage}
                  style={{ marginLeft: 0, width: 25, height: 25 }}
                />
                <Text style={{ marginLeft: 8 }}>Arabic</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

	     </View>
	   </View>
       
       
       }
	   </ScrollView>
  
	   
    );
  }
}

