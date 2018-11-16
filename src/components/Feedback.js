import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Alert,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity
} from "react-native";
import Constants from "../constants/Constants";
import Service from "../services/Service";
import OfflineNotice from './OfflineNotice';
import CustomToast from "./CustomToast";
import Loader from "./Loader";
import { strings } from "../services/stringsoflanguages";
export default class Feedback extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = {
      userResponse: {},
      feedback: " ",
      loading: false
    };
  }
  componentDidMount() {
    service.getUserData("user").then(
      keyValue => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData });
      },
      error => {
        console.log(error); //Display error
      }
    );
  }
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  searchPage = () => {
    alert("searching Page");
  };


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

 
 }

  submit = () => {
    if (this.state.feedback.trim() === "") {
      this.refs.defaultToastBottom.ShowToastFunction(strings.PleaseEnterFeedback);
    } else {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });

        service
          .feebback(this.state.userResponse.api_token, this.state.feedback)
          .then(res => {
            console.log(this.state.userResponse.api_token);
            console.log(this.state.feedback);

            if (res != undefined) {
              if (res.status_code == 200) {
                if (res.status == "success") {
                  this.refs.defaultToastBottom.ShowToastFunction(
                   strings.SubmitSuccessfully
                  );
                  //this.navigation.(res);
                } else {
                  this.refs.defaultToastBottom.ShowToastFunction(
                    "Network Error"
                  );
                }
              }
            } else {
              this.refs.defaultToastBottom.ShowToastFunction("Network Error");
            }
          });
      }, 3000);
    }
  };

  render() {
    return (
      <SafeAreaView source={constants.loginbg} style={styles.container}>
        <OfflineNotice/> 
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.openDrawer()}>
            <Image source={constants.menuicon} style={styles.hamburgerIcon} />
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{strings.Feedback}</Text>
          <TouchableOpacity onPress={() => this.searchPage()}>
            <Image source={constants.searchicon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.feedbacknputdiscrpation}
          underlineColorAndroid="transparent"
          placeholder="Feedback"
          text
          onChangeText={text => this.setState({ feedback: text })}
          placeholderTextColor="#AEA9A8"
          autoCapitalize="none"
          returnKeyType="done"
          multiline={true}
          numberOfLines={4}
          value={this.state.feedback}
        />

        <TouchableOpacity
          style={styles.bottomViewRequest}
          onPress={() => this.CheckInternetConnection()}
        >
          <Text style={styles.textStyle}>{strings.Submit}</Text>
          <CustomToast ref="defaultToastBottom" />
        </TouchableOpacity>
        <Loader loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}
