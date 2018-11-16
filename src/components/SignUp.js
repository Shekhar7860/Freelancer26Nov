import React, {Component} from 'react';
import {Platform,SafeAreaView, Text, View, TextInput, Alert, Image, BackHandler, ImageBackground, TouchableOpacity, StatusBar, ScrollView, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import Loader from './Loader';
import CustomToast from './CustomToast';
export default class SignuUp extends Component {

  constructor(props){
    super(props);
    this.state = { 
      password:'',
      mobile:'',
      confirmPassword:'',
      confirmPasswordError:'',
      passwordError:'',
      emailFormatError:'',
      mobileError:'',
      emailFormatError:'',
      cardheight:300,
      mobileLength:'',
      loading: false
    }
    service = new Service();
    constants = new Constants();
	  if(this.props.navigation.state.params)
	  {
     console.log(this.props.navigation.state.params.type)
	  }
  }
  
 

  signUp = () => {
    if(this.state.mobile.trim() === "" && this.state.password.trim() === "" && this.state.confirmPassword.trim() === "")
    {
      this.refs.defaultToastBottom.ShowToastFunction('Please Enter All Details');
    }
    else{
        if (this.state.mobile.trim() === "") 
        {
          this.refs.defaultToastBottom.ShowToastFunction('Please Enter Mobile');
        } 
        else if (this.state.password.trim() === "") {
          this.refs.defaultToastBottom.ShowToastFunction('Please Enter Password');
        } 
        else if (this.state.confirmPassword.trim() === "")
        {
          this.refs.defaultToastBottom.ShowToastFunction('Please Enter Confirm Password');
        } 
        else if (this.state.mobileLength != 10) {
          this.refs.defaultToastBottom.ShowToastFunction('Please enter Valid Mobile Number');
        } 
        else if(this.state.password.trim() !==  this.state.confirmPassword.trim())
        {
          this.refs.defaultToastBottom.ShowToastFunction('Passwords do not match');
        }
        else
        {
          this.setState ({ loading: true});
          setTimeout(() => 
          {this.setState({loading: false})
          this.refs.defaultToastBottom.ShowToastFunction('Signup Successfully');
          this.openLogin();
           }, 3000)
        }
     } 
   }

   openLogin(){
     setTimeout(() => {
     this.props.navigation.navigate('Login')
     }, 1000)
   }
    
   
   GetValueFunction = (ValueHolder) =>{
    var Value = ValueHolder.length.toString() ;
    this.setState({ mobile:ValueHolder})
    this.setState({ mobileLength:Value})
   }
  
  goBack = () =>{
    this.props.navigation.pop()
   }
  render() {
    return (
    
      <SafeAreaView style={styles.mainContainer}>
          <View style={styles.upperContainer}>
            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={() => this.goBack() }>
              <Image source={constants.backicon} style={styles.icon}/>
              </TouchableOpacity>
              </View>
              <View style={styles.welcomeHeadlineSignUp}>
              <Text style={styles.headlineText}>Freelancer</Text>
              </View>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.centerAlignSignUp}>
                  <View style={styles.cardContainerSignUp}>
                      <Text style={styles.signUpText}>Sign Up</Text>
                      <View style={styles.signUpInputsSpace}>
                      <View style={styles.topSpace}>
                      <View style={styles.rowAlign}>
                      <Image source={constants.phoneIcon} style={styles.inputIcon}/>
                      <TextInput style={styles.textInputWidth} placeholder="Mobile Number"  onChangeText={(text)=>
                      this.GetValueFunction(text)}  keyboardType='numeric' maxLength={10}></TextInput>
                      </View>
                      </View>
                      <View style={styles.topSpace}>
                      <View style={styles.rowAlign}>
                      <Image source={constants.passwordIcon} style={styles.inputIcon}/>
                      <TextInput style={styles.textInputWidth} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({ password:text})}></TextInput>
                      </View>
                      </View>
                      <View style={styles.topSpace}>
                      <View style={styles.rowAlign}>
                      <Image source={constants.passwordIcon} style={styles.inputIcon}/>
                      <TextInput style={styles.textInputWidth} placeholder="Confirm Password" secureTextEntry={true}  value={this.state.confirmPassword} onChangeText={(text)=>this.setState({ confirmPassword:text})}></TextInput>
                      </View>
                      </View>
					           
                      </View>
                      <View style={styles.loginContainer} >
                        <TouchableOpacity style={styles.commonButtonBackground} onPress={() => this.signUp()}>
                        <Text style={styles.accountButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                  
                 
            </View>
            <CustomToast ref = "defaultToastBottom"/>
          </View>
         
          <Loader
              loading={this.state.loading} />
      </SafeAreaView>
      
    );
}


}