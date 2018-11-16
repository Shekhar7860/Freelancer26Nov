import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import OfflineNotice from './OfflineNotice';
import styles from "../styles/styles";
import Constants from "../constants/Constants";

import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment';
import { strings } from '../services/stringsoflanguages';

export default class Create_milestone extends Component {
  constructor(props) {
    super(props);
    constants = new Constants();

    this.state = { 
      userResponse: {},
      projectId: " ",
      isDateTimePickerVisible: false,
      amount:"",
      startDateText : 'Due Date',
      discripation: '',
      loading: false
     }

  }
  componentDidMount() {
    if (this.props.navigation.state.params) {
      console.log(this.props.navigation.state.params.jobId);
      this.setState({ projectId: this.props.navigation.state.params.jobId });
    }
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

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log("date1", date);
    var newDate = Moment(date).format('YYYY-MM-DD');
    this.setState({ startDateText:newDate})
    this._hideDateTimePicker();
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




  submit = () => 
  {
      if(this.state.amount.trim() === "")
      {
        this.refs.defaultToastBottom.ShowToastFunction(strings.PleaseEnterAmount);
      }
      else if (this.state.startDateText.trim() === ""||this.state.startDateText=="Due Date") {
        this.refs.defaultToastBottom.ShowToastFunction(strings.PleaseentervalidDueDate);
      } 
      else if (this.state.discripation.trim() === "") {
        this.refs.defaultToastBottom.ShowToastFunction(strings.PleaseenterDescription);
      } 
      else
    {
          this.setState ({ loading: true});
          setTimeout(() => 
          {
            this.setState({loading: false})
            console.log("project ID", this.state.projectId)
          service.create_milestone(this.state.userResponse.api_token, this.state.projectId,this.state.amount, this.state.startDateText,this.state.discripation).then((res) => {
         if (res != undefined) 
         {
           console.log(res);
              if (res.status_code == 200)
              {
              if (res.status == "success" )
              {
                this.refs.defaultToastBottom.ShowToastFunction(strings.MilestoneCreatedSuccessfully); 
                this.goToMilestone(res); 
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

goToMilestone(value)
{
  setTimeout(() => {
  this.props.navigation.navigate('MilestoneList')
  }, 1000)
}

goToList = () => {
  this.props.navigation.navigate('MilestoneList') 
}


changeTextStartDate=(textString)=>{

  if (textString == "Due Date") {
    return strings.DueDate;
  }else{

    return textString;
  }
}


  render() {
    return (
      <SafeAreaView style = { styles.MainContainerProject }>
        <OfflineNotice/> 
         <View style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.goToList()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>{strings.CreateMilestones}</Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity>
         <Image style={styles.searchIcon} />
        </TouchableOpacity>
        </View>

        <ScrollView>
       
          <TextInput
            style={styles.Createmilestoneinput}
            underlineColorAndroid="transparent"
            
            placeholder={strings.Amount}
            onChangeText={(text)=>this.setState({ amount:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            keyboardType="numeric"
            value={this.state.amount}
          />

          
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
                  <TouchableOpacity onPress={this._showDateTimePicker} style={styles.postprojectinput}>
                  <Text style={styles.dateTextColor}>{this.changeTextStartDate(this.state.startDateText)}</Text>
                </TouchableOpacity>
            </View>
            
          </View>

          
          
         
          <TextInput
            style={styles.createmilestoneinputdiscrpation}
            underlineColorAndroid="transparent"
            placeholder={strings.Description}
            text
            onChangeText={(text)=>this.setState({ discripation:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            multiline={true}
            numberOfLines={4}
           value={this.state.discripation}
          />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
       
      <TouchableOpacity style={ styles.bottomViewRequest} onPress={() => this.CheckInternetConnection()}>
         <Text style={styles.textStyle}>{strings.Submit}</Text>
         <CustomToast ref = "defaultToastBottom"/>  
      </TouchableOpacity>
      </ScrollView>
       <Loader
          loading={this.state.loading} /> 
       
   </SafeAreaView>
    );
  }
}
