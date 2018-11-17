import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView, SafeAreaView,Image, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Loader from './Loader';
import HTMLView from 'react-native-htmlview';
import CustomToast from './CustomToast';
import Service from '../services/Service';
import MyView from './MyView';
import { strings } from '../services/stringsoflanguages';
import OfflineNotice from './OfflineNotice';
export default class JobDetails extends Component {
  constructor(props){
    super(props);
    constants = new Constants();
    service = new Service();
    this.state = { 
      userResponse: {},
        details : {},
        loading:false,
        hireText : "Find Freelancer",
        hired : false,
        chat : true
      }
  }

 componentDidMount() {
    this.setState ({ loading: true});
    setTimeout(() => {
      this.setState ({ loading: false});
      service.getUserData('user').then((keyValue) => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData});
     }, (error) => {
        console.log(error) //Display error
      });
      if(this.props.navigation.state.params)
    {
      if(this.props.navigation.state.params.details.details.request_status == "Accepted")
      {
        this.setState({ chat : false})
        this.setState({ hireText: strings.Hirefreelancer})
      }
      else if(this.props.navigation.state.params.details.details.request_status == "Hired")
      {
        this.setState({ hireText: "Go To Projects"})
      }
      this.setState({ details: this.props.navigation.state.params.details.details})
     }    
      }, 1000)
    
  }

  goToFreelancerPage = (status) => {
    var clientDetails = {
      apiToken : this.props.navigation.state.params.details.token,
      jobId : this.state.details.jobid,
      category : this.state.details.catid
    }
    if (status == "Find Freelancer")
    {
    this.props.navigation.navigate('FindFreelancer', { client_Details: clientDetails })
    }
    else if ( status == "Go To Projects")
    {
    this.props.navigation.navigate('OpenProjects', { client_Details:  this.state.details.jobid })
    }
    else
    {
      this.setState ({ loading: true});
      setTimeout(() => {
        this.setState ({ loading: false});
        service.requestResponse(this.state.userResponse.api_token, "Hired", this.props.navigation.state.params.details.details.jobid).then((res) => {
          console.log("checkres", res);
          console.log("projectID", this.props.navigation.state.params.details.details.jobid);
          if(res.status == "success")
          {
             this.refs.defaultToastBottom.ShowToastFunction(strings.HiredSuccessfully);
             var projectDetails = {
               freelancerId : res.freelancer_id,
               jobId : this.props.navigation.state.params.details.details.jobid
             }
             this.goTocreateProject(projectDetails);
          }
          else 
          {
            this.refs.defaultToastBottom.ShowToastFunction("An Error Occured"); 
          }
        })
        
      }, 1000)
    }
   }

   openChat = () => {
    this.props.navigation.navigate('Messages', { chatDetails: this.state.details})
   }

   goToJobs = () => {
    this.props.navigation.navigate('Jobs');
   }

   goTocreateProject(projectId)
   {
   setTimeout(() => {
   this.props.navigation.navigate('createProject', { projectDetails: projectId })
   }, 1000)
   }
   
  changeTextToArabic=(textString)=>{

    if (textString == "Go To Projects") {
      return strings.GoToProjects;
    }else if (textString == "Find Freelancer") { 
      return strings.FindFreelancer;
    }else{
      return strings.HireFreelancer;
    }
  }
  render() {
    console.log(this.props.navigation.state.params.details)
    return (
  <SafeAreaView style = { styles.MainContainerDetails }>
    <OfflineNotice/> 
        <View style={styles.commontoolbar}>
        <TouchableOpacity onPress={() => this.goToJobs()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{strings.Jobdetail}</Text>
          <Text style={styles.commontoolbarButton}></Text>
         </View>
      <ScrollView style={styles.detailsContainer}>
       <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Title}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.title}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.City}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.country}
                  </Text>
                  </View>
         </View>
         {/* <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Job Type
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.job_type}
                  </Text>
                  </View>
         </View> */}
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Budget}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.budget} SAR
</Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}>{strings.Startenddate}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.start_date} to  </Text><Text style={styles.textWrap2Details}> {this.state.details.end_date} </Text>
                 
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
                  <Text style={styles.textWrap2Details}>{this.state.details.skills}           </Text>
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
                  <Text style={styles.textWrap2Details}> {this.state.details.catid}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Status}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.request_status}
                  </Text>
                  </View>
         </View>
         <TouchableOpacity style={styles.toastMiddle}>
                  <CustomToast ref = "defaultToastBottom"/>
                  </TouchableOpacity>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Description}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                 
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.description}
                  </Text>
                  </View>
         </View>
         <Loader
              loading={this.state.loading} /> 
             
     </ScrollView>
     
     <MyView style = { styles.MainContainer } hide={this.state.hired}>
      <TouchableOpacity style={styles.bottomViewHire} onPress={() => this.goToFreelancerPage(this.state.hireText)}>
         <Text style={styles.textStyle}>{this.changeTextToArabic(this.state.hireText)}</Text>
      </TouchableOpacity>
      </MyView>
      <MyView style = { styles.MainContainer } hide={this.state.chat}>
      <TouchableOpacity style={styles.bottomViewChat} onPress={() => this.openChat()}>
         <Text style={styles.textStyleChat}>{strings.ChatwithFreelancer}</Text>
      </TouchableOpacity>
      </MyView>
      
   </SafeAreaView>
	   
    );
  }
}

