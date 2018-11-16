import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Alert, ScrollView, Image, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Loader from './Loader';
import HTMLView from 'react-native-htmlview';
import CustomToast from './CustomToast';
import Service from '../services/Service';
import MyView from './MyView';
import { strings } from '../services/stringsoflanguages';
import OfflineNotice from './OfflineNotice';
export default class FreelancerDetails extends Component {
  constructor(props){
    super(props);
    constants = new Constants();
    service = new Service();
    this.state = { 
        freelancerDetails : "",
        loading:false,
        search : true,
        isJobId : true
      }
  }

 componentDidMount() {
    this.setState ({ loading: true});
    setTimeout(() => {
      this.setState ({ loading: false});
      if(this.props.navigation.state.params)
  {
    console.log(this.props.navigation.state.params.freelancerdetails);
   if (this.props.navigation.state.params.freelancerdetails.clt_Details !== undefined)
   {
    this.setState({ isJobId : false })
   }
   this.setState({ freelancerDetails: this.props.navigation.state.params.freelancerdetails.freelancerDetails})
  }    
      }, 1000)
   
  }



  CheckInternetConnection=()=>{
    service.handleConnectivityChange().then((res) => {
    if(res.type == "none")
    {
      Alert.alert('Alert!', 'Check your internet connection');
    }
    else
    {
      this.submitProposal();
    }
    })

 
 }


  submitProposal = () => {
    this.setState ({ loading: true});
  setTimeout(() => {
    service.sendProposal(this.props.navigation.state.params.freelancerdetails.clt_Details.client_Details.apiToken, this.state.freelancerDetails.id,  this.props.navigation.state.params.freelancerdetails.clt_Details.client_Details.jobId).then((res) => {
      console.log("checkres", res);
      if(res.status == "success")
      {
        this.refs.defaultToastBottom.ShowToastFunction(strings.RequestSendSuccessfully);
        this.goToHome();
      }
      else 
      {
        this.refs.defaultToastBottom.ShowToastFunction(strings.AlreadySentRequest); 
      }
    })
    this.setState ({ loading: false});
    }, 2000)
  }

  goToHome()
{
setTimeout(() => {
this.props.navigation.navigate('Jobs')
}, 1000)
}

  
  goBack = () =>{
    this.props.navigation.navigate('FindFreelancer') 
   }
  
  render() {
    return (
  <SafeAreaView style = { styles.MainContainer }>
    <OfflineNotice/> 
	     <View style={styles.commontoolbar}>
        <TouchableOpacity onPress={() => this.goBack()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{strings.Freelancerdetail}</Text>
          <Text style={styles.commontoolbarButton}></Text>
         </View>
         <ScrollView style={styles.detailsContainer}>
       <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Email}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freelancerDetails.email}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Name}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freelancerDetails.username}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Shortbio}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freelancerDetails.short_bio}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Category}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freelancerDetails.categoryId}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Skills}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freelancerDetails.skills}
                  </Text>
                  </View>
         </View>
         <Loader
              loading={this.state.loading} /> 
     </ScrollView>
  
   <Loader
              loading={this.state.loading} /> 
     <MyView hide={this.state.isJobId}  style={ styles.bottomView}>
    <TouchableOpacity onPress={() => this.CheckInternetConnection()}>
      <Text style={styles.textStyle}>{strings.SubmitProposal}</Text>
      </TouchableOpacity>
      </MyView>
      <CustomToast ref = "defaultToastBottom"/> 
   </SafeAreaView>
	   
    );
  }
}

