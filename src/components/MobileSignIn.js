import React, {Component} from 'react';
import {Platform, Text, View, Alert, TextInput, ScrollView, Image, SafeAreaView, ImageBackground,  TouchableOpacity, StatusBar} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import { withNavigation } from "react-navigation";
import Loader from './Loader';
import firebase  from './Config';
import DeviceInfo from 'react-native-device-info-2';
import { strings } from '../services/stringsoflanguages';
import OfflineNotice from './OfflineNotice';
 
const timeout = 1000 // default is 5000 milis

 class  MobileSignIn extends Component {
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
      type:'',
      deviceToken : '',
      deviceID : ''
    }
    
  }

  componentDidMount() {
    const deviceId = DeviceInfo.getUniqueID();
    this.setState ({  deviceID: deviceId});
    firebase.messaging().getToken().then((token) => {
      this._onChangeToken(token)
   });
  
   firebase.messaging().onTokenRefresh((token) => {
       this._onChangeToken(token)
   });
   firebase.notifications().onNotification((notification) => {
    this.notification(notification)
});

    if(this.props.navigation.state.params)
    {
     console.log(this.props.navigation.state.params)
    }      
    }

    _onChangeToken = (token) => {
      this.setState ({  deviceToken: token});
    }
  
 
    CheckInternetConnection=()=>{
      service.handleConnectivityChange().then((res) => {
      if(res.type == "none")
      {
        Alert.alert('Alert!', 'Check your internet connection');
      }
      else
      {
        this.submit();
      }
      })
    //   fetch('http://zaraf.org/freelancerWeb/api/categories')
    //      .then((response) => {
           
    //       this.submit();
           
    //      })
    //  .catch((error) => {
    //        if(error == 'TypeError: Network request failed'){
    //        return  Alert.alert('Alert!', 'Check your internet connection'); 
    //        }
    //       });
   
   }


  submit = () => 
  {


      if(this.state.mobile.trim() === "")
      {
        this.refs.defaultToastBottom.ShowToastFunction(strings.EnterMobileNumber);
      }
      else if (this.state.mobileLength != 10) {
        this.refs.defaultToastBottom.ShowToastFunction(strings.EnterValidMobileNumber);
      } 
      else
      {
          this.setState ({ loading: true});
          setTimeout(() => 
          {
            this.setState({loading: false})
          service.loginOtp(this.state.mobile, Platform.OS, this.state.deviceToken, this.state.deviceID).then((res) => {
         if (res != undefined) 
         {
           console.log(res);
              if (res.status_code == 200)
              {
              if (res.message == "OTP has been sent successfully" )
              {
                  if (res.usertype == "0" )
               {
                    this.refs.defaultToastBottom.ShowToastFunction(strings.OTPSentSuccessfully);
                    var personData = {
                    mobile:this.state.mobile
                  }
                  this.selectAccount(personData);
              }
              else
              {
                var personData = {
                  mobile:this.state.mobile,
                  type : res.usertype
                }
                console.log(personData)
                this.refs.defaultToastBottom.ShowToastFunction(strings.OTPSentSuccessfully);
                this.openOtp(personData);
              }
              }
              else 
              {
                this.refs.defaultToastBottom.ShowToastFunction(strings.NetworkError); 
              }
            
            }
          
        }
      else
      {
        this.refs.defaultToastBottom.ShowToastFunction(strings.NetworkError); 
      }
    })

      }, 3000)
    }
  
}

openOtp(mobile)
{
setTimeout(() => {
this.props.navigation.navigate('Otp',  { mobile: mobile })
}, 1000)
}

selectAccount(mobile)
{
  setTimeout(() => {
    this.props.navigation.navigate('Select',  { mobile: mobile })
    }, 1000)
}


notification = (val) => {
  console.log(val._title)
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
      <View style={{ height:'100%',flexDirection:"column"}}><OfflineNotice/> 
      <SafeAreaView style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.imgContainer}>
          <TouchableOpacity onPress={() => this.goBack()}>
            <Image source={constants.backicon_orange} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeHeadlineSignUp}>
        <TouchableOpacity onPress={() => this.goBack()}><Image
            source={require("../images/top_back.png")}
            style={{marginLeft:8,top:-20,height:20,width:28}}
          /></TouchableOpacity>
          <Image
            source={require("../images/logosmal.png")}
            style={{alignSelf:"center" }}
          />
        </View>
      </View>

      <View style={styles.lowerContainer}>
        <View style={styles.centerAlignSignUp}>
          <View style={styles.cardContainerSignIn}>
            <Text style={styles.mobilesignsignUpText}>{strings.Signin}</Text>
            <View style={styles.rowAlign}>
              <Image source={constants.phoneIcon} style={styles.inputIcon} />
              <TextInput
                style={styles.mobilesigntextInputWidth}
                placeholderTextColor='#5F6C78'
              //  placeholder={strings.Signin}
                placeholder={strings.Mobilenumber}
                value={this.state.mobile}
                onChangeText={text => this.GetValueFunction(text)}
                keyboardType="numeric"
                maxLength={10}
                returnKeyType="done"
              />
            </View>
            <View style={styles.mobilesignloginContainerSignIn}>
              <TouchableOpacity
                style={styles.mobilesigninButton}
                onPress={() => this.CheckInternetConnection()}
              >
                <Text style={styles.accountButtonText}>{strings.Signin}</Text>
              </TouchableOpacity>
              <CustomToast ref="defaultToastBottom" />
            </View>
          </View>
        </View>
      </View>
     
      <Loader loading={this.state.loading} />
    </SafeAreaView></View>
  );
}
}
export default withNavigation(MobileSignIn);


