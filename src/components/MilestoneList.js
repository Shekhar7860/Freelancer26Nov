import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  FlatList,
  SafeAreaView,
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
import OfflineNotice from './OfflineNotice';
import Constants from "../constants/Constants";
import Service from "../services/Service";
import styles from "../styles/styles";
import MyView from './MyView';
import Loader from './Loader';
import SideMenu from './SideMenu';
import { strings } from '../services/stringsoflanguages';
export default class MilestoneList extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    sidemenu = new SideMenu();
    constants = new Constants();
    this.state = {
      userResponse: {},
      jobs: [],
      failed: false,
      search : true,
      loading:false,
      dummyText : "",
      modalVisible: false.getMilestoneList,
      projectId: " "
    };
   
    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  findFreelancer = () => {

  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
        console.log(this.props.navigation.state.params.details);
        this.setState({ projectId: this.props.navigation.state.params.details.project_id });
      }
    this.setState ({ loading: true});
    service.getUserData("user").then(
      keyValue => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData });
        this.getMilestoneList();
      },
      error => {
        console.log(error); //Display error
      }
    );
    service.saveUserData('count', 1);
  }

  openDrawer = () => {
    // sidemenu.userData();
    this.props.navigation.navigate('OpenProjects') 
  };

  getMilestoneList = () => {
    service.getMilestoneList(this.state.userResponse.api_token, this.props.navigation.state.params.details.project_id).then(res => {
      console.log("reslocal", res);
     // this.setState ({ loading: false});
      if(res.status_code != 400)
      {
              setTimeout(() => {
              if (res){
                this.setState ({ loading: false});
                if(res.milestone.length ===  0)
                {
                    this.setState ({ dummyText: "No Milestone Found"});
                }
                else
                {
                this.setState({ jobs: res.milestone});
                }
            }
            });
      }
      else
      {
        this.refs.defaultToastBottom.ShowToastFunction('An Error Occurred');
      }
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

  openDetails = (val) => {
   var jobData = {
     token : this.state.userResponse.api_token,
     details : val
   }
   this.props.navigation.navigate('JobDetails',  { details: jobData }) 
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
         <Text style={styles.toolbarTitle}>{strings.Milestonelist}</Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => this.goToPostproject()}>
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
        <FlatList
              data={this.state.jobs}
              keyExtractor={(item, index) => index}
              style={styles.listCardWidth}
              extraData={this.state.jobs}
              renderItem={({ item, index }) => (
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard}>
                 <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}>{strings.Amount}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {item.amount}
                  </Text>
                  </View>
                  </View>
                  <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}>{strings.DueDate}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {item.end_date}
                  </Text>
                  </View>
                  </View>
                  <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}>{strings.DueDate}
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {item.description}
                  </Text>
                  </View>
                  </View>
                     
                         
                        {/* <View style={styles.paddingAbove}>
                            <View style={styles.textInRow2}> 
                              <View style={styles.skillWidth}>
                                  <Text style={styles.skillText}>Skill Level</Text>
                                </View>
                                <View style={styles.budgetWidth}>
                                  <Text style={styles.skillText}>{item.budget}</Text>
                                </View>
                                <View style={styles.leftSpace}>
                                  <Text style={styles.date}></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.paddingAbove}>
                            <View style={styles.textInRow2}> 
                              <View style={styles.skillWidth}>
                                  <Text style={styles.skillText}>Expert</Text>
                                </View>
                                <View style={styles.budgetWidth}>
                                  <Text style={styles.skillText}>1000</Text>
                                </View>
                                <View style={styles.leftSpace}>
                                </View>
                            </View>
                        </View> */}
                        </TouchableOpacity>
                </View>
              )}
            />
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
