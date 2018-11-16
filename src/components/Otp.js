import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import OfflineNotice from './OfflineNotice';
import styles from "../styles/styles";
import Constants from "../constants/Constants";
import Service from "../services/Service";
import { withNavigation } from "react-navigation";
import Loader from "./Loader";
import { colors, fonts, padding, dimensions, align } from "../styles/base.js";
import CustomToast from "./CustomToast";
import { strings } from '../services/stringsoflanguages';
class Otp extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = {
      mobile: "9646407363",
      emailError: "",
      emailFormatError: "",
      mobileLength: "",
      loading: false,
      first: "",
      second: "",
      third: "",
      fourth: "",
      type: ""
    };
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.type) {
        console.log(this.props.navigation.state.params.type.mobile);
        this.setState({
          mobile: this.props.navigation.state.params.type.mobile
        });
        this.setState({ type: this.props.navigation.state.params.type.type });
      } else if (this.props.navigation.state.params.mobile) {
        this.setState({
          mobile: this.props.navigation.state.params.mobile.mobile
        });
        this.setState({ type: this.props.navigation.state.params.mobile.type });
      }
    }
  }

  

  gotoSignIn = () => {
    this.props.navigation.navigate("Login");
  };

  openLogin = () => {
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 1000);
  };

  GetFourthValue = value => {

    service.handleConnectivityChange().then((res) => {
      if(res.type == "none")
      {
        Alert.alert('Alert!', 'Check your internet connection');
      }
      else
      {
        var String_3 = this.state.first.concat(this.state.second);
        var String_4 = this.state.third.concat(value);
        var String_34 = String_3.concat(String_4);
        service
          .verifyOtp(this.state.mobile, String_34, this.state.type)
          .then(res => {
            console.log(res);
            if (res.status_code == 200) {
              if (res.status == "success") {
                service.saveUserData("user", res.user);
                this.refs.defaultToastBottom.ShowToastFunction(
                  "Login Successfully"
                );
                this.goToHome(res);
              } else {
                this.refs.defaultToastBottom.ShowToastFunction(
                  "Incorrect OTP! Please Try Again"
                );
              }
              // this.openLogin(this.state.mobile);
            } else {
              this.refs.defaultToastBottom.ShowToastFunction(
                "Incorrect OTP! Please Try Again"
              );
            }
          });
      }
    });
 
  };

  GetValueFunction = ValueHolder => {
    var Value = ValueHolder.length.toString();
    this.setState({ mobile: ValueHolder });
    this.setState({ mobileLength: Value });
  };

  goToHome = res => {
    if (res.user.isLogin == 0) {
      this.props.navigation.navigate("About");
    } else {
      if (res.user.usertype == 1) {
        this.props.navigation.navigate("Jobs");
      } else {
        this.props.navigation.navigate("Home");
      }
    }
  };

  resendOtp() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      service.resendOtp(this.state.mobile).then(res => {
        console.log(res);
        if (res) {
          this.firstTextInput.clear();
          this.secondTextInput.clear();
          this.thirdTextInput.clear();
          this.fourthTextInput.clear();
          this.refs.defaultToastBottom.ShowToastFunction(res.message);
        } else {
          this.refs.defaultToastBottom.ShowToastFunction("Network Error");
        }
      });
    }, 3000);
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", backgroundColor: colors.white }}
      >
      <OfflineNotice/> 
        <View
          style={{
            backgroundColor: colors.themeColor,
            width: dimensions.fullWidth,
            height: dimensions.fullHeight / 2,
            flexDirection: "column",
            alignItems: "flex-start"
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={this.backAction}>
            <View
              style={{
                top: 10,
                left: 0,
                width: 60,
                height: 60,
                alignItems: "center",
                backgroundColor: colors.themeColor,
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  left: -10,
                  width: 12,
                  height: 15,
                  alignItems: "center"
                }}
                source={constants.backIcon}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              top: 30,
              backgroundColor: colors.themeColor,
              width: dimensions.fullWidth,
              height: dimensions.fullHeight / 2 - 80,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "400",
                top: 15,
                color: colors.theme_orange
              }}
            >
              {strings.Verificationcode}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "200",
                top: 30,
                color: colors.white
              }}
            >
              {strings.Enterotp}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "200",
                top: 40,
                color: colors.white
              }}
            >
              {" "}
              + 91 - {this.state.mobile}
            </Text>
            <View behavior="padding">
              <View
                style={{
                  top: 50,
                  backgroundColor: "",
                  width: 240,
                  height: 70,
                  flexDirection: "row",
                  marginTop: 20
                }}
              >
                <TextInput
                  placeholder=""
                  textAlign={"center"}
                  onChangeText={first => {
                    this.setState({ first }), this.secondTextInput.focus();
                  }}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  returnKeyType="done"
                  maxLength={1}
                  keyboardType="numeric"
                  autoFocus={true}
                  ref={input => {
                    this.firstTextInput = input;
                  }}
                  style={styles.input}
                />
                <TextInput
                  placeholder=""
                  textAlign={"center"}
                  onChangeText={second => {
                    this.setState({ second }), this.thirdTextInput.focus();
                  }}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  returnKeyType="done"
                  keyboardType="numeric"
                  maxLength={1}
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  style={styles.input}
                />
                <TextInput
                  placeholder=""
                  textAlign={"center"}
                  onChangeText={third => {
                    this.setState({ third }), this.fourthTextInput.focus();
                  }}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  maxLength={1}
                  returnKeyType="done"
                  keyboardType="numeric"
                  ref={input => {
                    this.thirdTextInput = input;
                  }}
                  style={styles.input}
                />
                <TextInput
                  placeholder=""
                  textAlign={"center"}
                  onChangeText={text => this.GetFourthValue(text)}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  returnKeyType="done"
                  keyboardType="numeric"
                  maxLength={1}
                  ref={input => {
                    this.fourthTextInput = input;
                  }}
                  style={styles.input}
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.otpButton}
          onPress={() => this.resendOtp()}
        >
          <Text style={styles.accountButtonText}>{strings.Resentotp}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changenumber_otp}
          onPress={() => this.gotoSignIn()}
        >
          <Text style={styles.accountButtonText}>{strings.Changeno} </Text>
        </TouchableOpacity>
        <CustomToast style={{ marginTop: 50 }} ref="defaultToastBottom" />
        <Loader loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}
export default withNavigation(Otp);
