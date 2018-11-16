import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  TextInput, 
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import Constants from "../constants/Constants";
import Service from "../services/Service";
import styles from "../styles/styles";
import MyView from './MyView';
import Loader from './Loader';
import SideMenu from './SideMenu';
import OfflineNotice from './OfflineNotice';
import { strings } from '../services/stringsoflanguages';
export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    sidemenu = new SideMenu();
    constants = new Constants();
    this.state = {
      userResponse: {},
      jobs: {amount : " ", description : " ", freelancer_name : " "}, 
      jobs: {description : " "}, 
      failed: false,
      search : true,
      loading:false,
      dummyText : "",
      projectId : "", 
      jobId: " ",
      loading : "false",
      userResponse: {},
      freeLancerName : "", 
      amount : " ", 
      description : " "
      
    };
   
    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  findFreelancer = () => {

  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
        console.log(this.props.navigation.state.params.client_Details);
        this.setState({ jobId: this.props.navigation.state.params.client_Details });
      }
    this.setState ({ loading: true});
    service.getUserData("user").then(
      keyValue => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData });
        if(this.state.jobId)
        {

          // CheckInternetConnection=()=>{
          //   service.handleConnectivityChange().then((res) => {
          //   if(res.type == "none")
          //   {
          //     Alert.alert('Alert!', 'Check your internet connection');
          //   }
          //   else
          //   {
              this.getMilestoneList();
            // }
            // })
        
         
       //  }

        
        }
      },
      error => {
        console.log(error); //Display error
      }
    );
    service.saveUserData('count', 1);
  
    
  }

  openDrawer = () => {
     // this.props.navigation.goBack();
    // sidemenu.userData();
   this.props.navigation.openDrawer();
  };

  getMilestoneList = () => {
    service.getprojectList(this.state.userResponse.api_token, this.state.jobId).then(res => {
      console.log("reslocal", res);
      
      setTimeout(() => {
     if (res){
        this.setState ({ loading: false});
         if(res.length ===  0)
        {
        this.setState ({ dummyText: "No Project Found"});
        }
        else
        {
        this.setState({ jobs: res.project});
        if (this.state.jobs)
        {
        if(this.state.jobs.freelancer_name !== undefined)
        {
          this.state.freeLancerName = this.state.jobs.freelancer_name
        }
        if(this.state.jobs.amount !== undefined)
        {
          this.state.amount = this.state.jobs.amount
        }
        if(this.state.jobs.description !== undefined)
        {
          this.state.description = this.state.jobs.description 
        }
        this.setState({ projectId: res.project.id});
        }
      }
    }
    });
  }, 3000)
  };

  searchPage = () =>{
  this.setState({ search: false});
    }
  
    hideSearch = () =>{
      this.setState({ search: true});
    }


  goToPostproject = () => {
    this.props.navigation.navigate("Create", { jobId: this.state.projectId });
  };

  goToMilestone()
  {
    var projectDetails = {
        project_id : this.state.projectId
      }
    this.props.navigation.navigate('MilestoneList', { details: projectDetails})
  }

  render() {
   
    return (
      <SafeAreaView source={constants.loginbg} style={styles.container}>
      <OfflineNotice/> 
        <View style={styles.topView}>
        <MyView style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>{strings.Projectlist}</Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => this.goToMilestone()}>
         <Image source={constants.addIcon} style={styles.searchIcon} />
        </TouchableOpacity>
        </MyView>
       </View>
       {/* <View style={styles.searchPadding}>
       <MyView  style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput placeholder="Search"  placeholderTextColor="#a2a2a2" style={styles.topInput}/>
          </View>
      </MyView>
      </View> */}
       <ScrollView>
        <View style={styles.listCenter}>
        <Text style = {styles.defaultTextSize}>{this.state.dummyText}</Text>
        
                <View  style={styles.listCard}>
                 <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Amount}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.amount }
                  </Text>
                  </View>
                  </View>
            
            
                  <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Description}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.description}
                  </Text>
                  </View>
                  </View>
                  <View style={{flexDirection:"row",marginTop:-15}}>
                  <View> 
                  <Text style={styles.textWrapDetails}> {strings.Freelancername}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freeLancerName}
                  </Text>
                  </View>
                  </View>
                </View>
             
        </View>
       </ScrollView>
     
          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.goToPostproject()}
            style={styles.TouchableOpacityStyle}
          >
            <Image
              source={{
                uri:
                  "https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png"
              }}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity> */}
        
        <Loader
              loading={this.state.loading} />
                    
      </SafeAreaView>
    );
  }
}
//<TouchableOpacity style={styles.listCard} onPress={() => this.openDetails(item)}>
