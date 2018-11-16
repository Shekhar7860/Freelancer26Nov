import React, {Component} from 'react';
import {Platform, Text, View, TextInput, Image, SafeAreaView, ImageBackground,  TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import { withNavigation } from "react-navigation";
import Loader from './Loader';
 class  MobileSignIn2 extends Component {
  constructor(props){
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
      mobile:'',    
      emailError:'',
      emailFormatError:'',
      mobileLength:'',
      loading:false,
      type:''
    }
    
  }

  componentDidMount() {
     this.setState ({ type: this.props.navigation.state.params.type});      
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
      else
      {
          this.setState ({ loading: true});
          setTimeout(() => 
          {this.setState({loading: false})
          service.loginOtp(this.state.mobile, this.state.type).then((res) => {
            console.log(res);
            if(res)
            {
                if (res.status_code == 200)
                {
                this.refs.defaultToastBottom.ShowToastFunction("Otp Send Successfully");
                var personData = {
                  type:"",
                  mobile:this.state.mobile
                }
                this.openLogin(personData);
                }
                else
                {
                  this.props.navigation.navigate('Select',  { mobile: this.state.mobile }) 
                }
            }
            else
            {
              this.refs.defaultToastBottom.ShowToastFunction("Network Error"); 
            }
          })

            }, 3000)
        }
    }

    openLogin(mobile)
    {
      setTimeout(() => {
      this.props.navigation.navigate('Otp',  { mobile: mobile })
      }, 1000)
    }

    GetValueFunction = (ValueHolder) =>{
      var Value = ValueHolder.length.toString() ;
      this.setState({ mobile:ValueHolder})
      this.setState({ mobileLength:Value})
     }

  goBack = () => {
    this.props.navigation.pop()
   }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
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
              <View style={styles.centerAlignSignUp}>
                <View style={styles.cardContainerSignIn}>
                    <Text style={styles.signUpText}>Sign In</Text>
                    <Text style={styles.forgotTextHeadline}></Text>   
                    <View style={styles.forgotInputsSpace}>
                        <View style={styles.topSpace}>
                        <View style={styles.rowAlign}>
                        <Image source={constants.phoneIcon} style={styles.inputIcon}/>
                        <TextInput  style={styles.textInputWidth} placeholder="Mobile Number" value={this.state.mobile} onChangeText={(text)=>
                    this.GetValueFunction(text)}  keyboardType='numeric' maxLength={10} returnKeyType='done'></TextInput>
                        </View>
                        </View>
                    </View>
                    <View style={styles.loginContainerSignIn} >
                                <TouchableOpacity style={styles.mobilebuttonBackground} onPress={() => this.submit()}>
                                <Text style={styles.accountButtonText}>Sign In</Text>
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
export default withNavigation(MobileSignIn2);


