import React, {Component} from 'react';
import {Platform, SafeAreaView, Text, AlertIOS, ToastAndroid, TextInput, Image, TouchableNativeFeedback, ImageBackground, TouchableOpacity, StatusBar, ScrollView, View} from 'react-native';
import styles from '../styles/styles';
import Service from '../services/Service';
import Constants from '../constants/Constants';
import CustomToast from './CustomToast';
import Loader from './Loader';
import OfflineNotice from './OfflineNotice';
import strings from '../services/stringsoflanguages';


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      mobile:'',
      password:'',
      emailError:'',
      passwordError:'',
      emailFormatError:'',
      mobileLength:'',
      loading: false
    }
    service = new Service();
    constants = new Constants();
   
  }


    componentDidMount = () => {
      
    }
  
      goBack = () =>{
       this.props.navigation.pop()
      }
      
      goToForgot = () =>{
       this.props.navigation.navigate('Forgot')
      }
 
      goToHome = () =>{
        service.saveUserData('user', "");
        this.props.navigation.navigate('Home')
      }
      GetValueFunction = (ValueHolder) =>{
        var Value = ValueHolder.length.toString() ;
        this.setState({ mobile:ValueHolder})
        this.setState({ mobileLength:Value})
       }
      login = () =>
      {
       
                if(this.state.mobile.trim() === "" && this.state.password.trim() === "")
                {
                
                  this.refs.defaultToastBottom.ShowToastFunction('Please Enter Mobile And Password');
                }
                else
                {
                    if (this.state.mobile.trim() === "") 
                    {
                      this.refs.defaultToastBottom.ShowToastFunction('Please Enter Mobile');
                    } 
                    else if (this.state.password.trim() === "") {
                      this.refs.defaultToastBottom.ShowToastFunction('Please Enter Password');
                    } 
                    else if (this.state.mobileLength != 10) {
                      this.refs.defaultToastBottom.ShowToastFunction('Please enter Valid Mobile Number');
                    } 
                    else{
                      this.setState ({ loading: true});
                      setTimeout(() => 
                      {
                      this.setState({loading: false})
                      service.login(this.state.mobile, this.state.password).then((res) => {
                        console.log(res);
                        if(res.status_code)
                        {
                            if(res.status == "success")
                            {
                              this.refs.defaultToastBottom.ShowToastFunction('Login Successfully');
                              // service.saveUserData('user', res.user-details);
                              this.goToHome();
                            }
                            else
                            {
                              this.refs.defaultToastBottom.ShowToastFunction('Wrong Mobile Or Password');
                            }
                        }
                        else 
                        {
                          this.refs.defaultToastBottom.ShowToastFunction('Network Error');
                        }

                        })
                     
                      }, 3000)
                    }
                    
                }
        }

        
        goToHome = () => 
        {
          setTimeout(() => 
          {
          this.props.navigation.navigate('Home')
          }, 1000);
        }
      
      state = {
      value: '',
   };


  handleTextChange = (newText) => this.setState({ value: newText });


  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
       <OfflineNotice/> 
      <View style={styles.upperContainer}>
        <View style={styles.imgContainer}>
         <TouchableOpacity onPress={() => this.goBack()}>
         <Image source={constants.backicon} style={styles.icon}/>
         </TouchableOpacity>
         </View>
         <View style={styles.welcomeHeadlineSignUp}>
         <Text style={styles.headlineText}>Freelancer</Text>
         </View>
      </View>
      <View style={styles.lowerContainer}>
      <View style={styles.centerAlign}>
         <View style={styles.cardContainerSignIn}>
                <Text style={styles.signUpText}>Sign In</Text>   
                <View style={styles.loginInputsSpace}>
                    <View style={styles.topSpace}>
                    <View style={styles.rowAlign}>
                    <Image source={constants.phoneIcon} style={styles.inputIcon}/>
                    <TextInput style={styles.textInputWidth} placeholder={strings.Mobilenumber} value={this.state.mobile} onChangeText={(text)=>
                    this.GetValueFunction(text)}  keyboardType='numeric' maxLength={10}></TextInput>
                    </View>
                    </View>
                    <View style={styles.topSpace}>
                    <View style={styles.rowAlign}>
                    <Image source={constants.passwordIcon} style={styles.inputIcon}/>
                    <TextInput style={styles.textInputWidth} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({ password:text})}></TextInput>
                    </View>
                    </View>
                </View>
              
				
				  <View style={styles.loginContainer} >
                        <TouchableOpacity style={styles.buttonBackgroundLogin} onPress={() => this.login()}>
                        <Text style={styles.accountButtonText}>Log In</Text>
                        </TouchableOpacity>
                 </View>
				
				 
             </View>
			  <TouchableOpacity onPress={() => this.goToForgot()}>
                 <Text  style={styles.forgotText} >Forgot Password</Text>
				</TouchableOpacity>
            
            <CustomToast ref = "defaultToastBottom"/> 
       </View>
      </View>
      
        <Loader
          loading={this.state.loading} />
     </SafeAreaView>
    
        
    
     
    );
  }
}

