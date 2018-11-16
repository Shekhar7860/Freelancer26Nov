import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import styles from "../styles/styles";
import Constants from "../constants/Constants";
import OfflineNotice from './OfflineNotice';
import { strings } from "../services/stringsoflanguages";

export default class SelectAccount extends Component {
  constructor(props) {
    super(props);
    constants = new Constants();
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      console.log(this.props.navigation.state.params.mobile);
    }
  }

  // going to next screen
  goToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  goToSignUp = userType => {
    console.log(this.props.navigation.state.params);
    if (this.props.navigation.state.params)
      console.log(this.props.navigation.state.params.mobile);
    {
      var userData = {
        type: userType,
        mobile: this.props.navigation.state.params.mobile.mobile
      };
      console.log(userData);
      this.props.navigation.navigate("Otp", { type: userData });
    }
  };

  goToWelcome = () => {
    this.props.navigation.navigate("Welcome");
  };

  render() {
    return (
      <SafeAreaView>
        <OfflineNotice/> 
        <View style={styles.commontoolbar}>
          <TouchableOpacity onPress={() => this.goToWelcome()}>
            <Image source={constants.backicon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{strings.SelectAccount}</Text>
          <Text style={styles.commontoolbarButton} />
        </View>
        <View style={styles.accountHeadline}>
          <Text style={styles.accountHeadlineText}>
            {strings.Selectaccounttype}
          </Text>
          <TouchableOpacity
            style={styles.hireButtonBackground}
            onPress={() => this.goToSignUp(1)}
          >
            <Text style={styles.accountButtonText}>
             {strings.Iwanttohirefreelancer}
            </Text>
         
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lookingButtonBackground}
            onPress={() => this.goToSignUp(2)}
          >
            <Text style={styles.accountButtonText}>
            {strings.Iwanttoworkwith}
            </Text>
          </TouchableOpacity>
          <Text style={styles.selectAccountText}>
          {strings.Alreadyhaveanaccount}{" "}
            <Text onPress={() => this.goToLogin()}>{strings.Login}</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
