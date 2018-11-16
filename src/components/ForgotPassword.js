import React, {Component} from 'react';
import {Platform, Text, View, TextInput, Image, SafeAreaView, ScrollView,ImageBackground,  TouchableOpacity, StatusBar} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import { withNavigation } from "react-navigation";
import Loader from './Loader';
 class  ForgotPassword extends Component {
  constructor(props){
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
      mobile:'',    
      emailError:'',
      emailFormatError:'',
      mobileLength:'',
      loading:false
    }
  }

 
  submit = () => 
  {
    if(this.state.mobile.trim() === "")
    {
      this.refs.defaultToastBottom.ShowToastFunction('Please Enter Mobile');
    }
    else if (this.state.mobileLength != 10) {
      this.refs.defaultToastBottom.ShowToastFunction('Please enter Valid Mobile Number');
    } 
    
   
   else {
         this.setState ({ loading: true});
          setTimeout(() => 
          {this.setState({loading: false})
          this.refs.defaultToastBottom.ShowToastFunction('Email Sent Successfully');
          this.openLogin();
           }, 3000)
          }
   
    }

    openLogin()
    {
      setTimeout(() => {
      this.props.navigation.navigate('Login')
      }, 1000)
    }

    GetValueFunction = (ValueHolder) =>{
      var Value = ValueHolder.length.toString() ;
      this.setState({ mobile:ValueHolder})
      this.setState({ mobileLength:Value})
     }
  goToLogin = () => {
    this.props.navigation.navigate('Login')
   }

 
   
  render() {
    return (
     
      <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
      <View style={styles.upperContainer}>
        <View style={styles.imgContainer}>
         <TouchableOpacity onPress={() => this.goToLogin()}>
         <Image source={constants.backicon} style={styles.icon}/>
         </TouchableOpacity>
         </View>
         <View style={styles.welcomeHeadlineSignUp}>
         <Text style={styles.headlineText}>Freelancer</Text>
         </View>
      </View>
      <View style={styles.lowerContainer}>
      <View style={styles.centerAlignSignUp}>
         <View style={styles.cardContainerSignIn}>
            <Text style={styles.signUpText}>Reset Password</Text>
            <Text style={styles.forgotTextHeadline}>We just need your registed email address/mobile number to send you password reset</Text>   
             <View style={styles.forgotInputsSpace}>
                <View style={styles.topSpace}>
                <View style={styles.rowAlign}>
                <Image source={constants.phoneIcon} style={styles.inputIcon}/>
                <TextInput  style={styles.textInputWidth} placeholder="Mobile Number" value={this.state.mobile} onChangeText={(text)=>
             this.GetValueFunction(text)}  keyboardType='numeric' maxLength={10}></TextInput>
                </View>
                </View>
            </View>
            <View style={styles.loginContainer} >
                        <TouchableOpacity style={styles.buttonBackgroundLogin} onPress={() => this.submit()}>
                        <Text style={styles.accountButtonText}>Reset Password</Text>
                        </TouchableOpacity>
                </View>
            </View>
       </View>
       <CustomToast ref = "defaultToastBottom"/>
      </View>
        <Loader
          loading={this.state.loading} />
          </ScrollView>
     </SafeAreaView>
     
    );
}
}
export default withNavigation(ForgotPassword);


