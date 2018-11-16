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
  ScrollView,
  Alert
} from "react-native";
import Constants from "../constants/Constants";
import Service from "../services/Service";
import styles from "../styles/styles";
import MyView from './MyView';
import Loader from './Loader';
import SideMenu from './SideMenu';
import firebase  from './Config';
import OfflineNotice from './OfflineNotice';
import { strings } from "../services/stringsoflanguages";
export default class Jobs extends Component {
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
      noProject : " ",
      modalVisible: false
    };
    this.arrayholder = []
   
    service.getUserData('count').then((keyValue) => {
      console.log("local", keyValue);
      if(keyValue === "none")
      {
        this.setState ({ loading: false});
      //  this.setModalVisible(true);
      }
      else
      {
       this.setState ({ loading: true});
      }
   }, (error) => {
      console.log(error) //Display error
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  findFreelancer = () => {

  }


  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      jobs: newData
    });
  };


 checkLanguage=()=>{


  service.getUserData("language").then(
    keyValue => {
     if(keyValue == "true")
     {
      strings.setLanguage("en");
    }else{
      strings.setLanguage("ar");
    }
        
    },
    error => {
      console.log(error); //Display error
    }
  );

 }
  componentDidMount() {
   // console.log("Yaha pe aaja bhai");
    this.checkLanguage();

    firebase.notifications().onNotification((notification) => {
      this.notification(notification)
  });
  setTimeout(() => {
    this.setState ({ loading: false});
    service.getUserData("user").then(
      keyValue => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData });
        this.getFreelancersResponse();
      },
      error => {
        console.log(error); //Display error
      }
    );
   // service.saveUserData('count', '1');
    }, 3000)
  }

  
  openDrawer = () => {
    // sidemenu.userData();
    this.props.navigation.openDrawer();
  };

  notification = (val) => {
  //   Alert.alert(
  //     'Request Accepted Successfully'
  // )
  }

  getFreelancersResponse = () => {
    service.jobs(this.state.userResponse.api_token).then(res => {
     //  console.log("reslocal", res.Job.length);
      if(res.Job.length ==  0)
      {
      //   alert("test")
        this.setState ({ noProject : "No Job Found"});
      }
      else
      {
      this.arrayholder = res.Job;
      this.setState({ jobs: res.Job});
      }
    });
  };

  searchPage = () =>{
  this.setState({ search: false});
    }
  
    hideSearch = () =>{
      this.setState({ search: true});
    }


  goToPostproject = () => {
    var projectData = {
      "startdate":"Start Date",
      "enddate":"End Date",
      "selectedCity" :"Select City",

    }

    var userInputData =  {
      selectedCategory : "Select Category",
      inputData : projectData
    }
     this.props.navigation.navigate('PostProject',  { category: userInputData }) 
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
        <Image source={constants.menuicon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}> {strings.Jobs} </Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => this.goToPostproject()}>
         <Image source={constants.addIcon} style={styles.searchIcon} />
        </TouchableOpacity>
        </MyView>
       </View>
       <View style={styles.searchPadding}>
       <MyView  style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput placeholder={strings.Searchstring}  placeholderTextColor="#a2a2a2" style={styles.searchfieldInput}  onChangeText={text => this.searchFilterFunction(text)}/>
          </View>
      </MyView>
      </View>
       <ScrollView>
       <Text style = {styles.defaultTextSize}>{this.state.noProject}</Text>
        <View style={styles.listCenter}>
        <FlatList
              data={this.state.jobs}
              keyExtractor={(item, index) => index}
              style={styles.listCardWidth}
              extraData={this.state.jobs}
              renderItem={({ item, index }) => (
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard} onPress={() => this.openDetails(item)}>
                     <View style={styles.rowAlignSideMenuRequest}>
                          <View style={styles.firstText}> 
                          <Text style={styles.textWrap}> {item.title} 
                          </Text>
                          </View>
                          <View style={styles.emptyText}> 
                          </View>
                          <View style={styles.secondText}> 
                          <Text style={styles.textWrap2}> {item.start_date}
                          </Text>
                          </View>
                      </View>
                      <View style={styles.rowAlignSideMenuRequest}>
                          <View style={styles.firstText2}> 
                              <View style={styles.textInRow}> 
                                <View >
                                    <Text style={styles.priceText}>{strings.FixedPrice}</Text>
                                  </View>
                                  <View style={styles.contPadding}>
                                    <Text >-</Text>
                                  </View>
                                  <View >
                                    <Text style={styles.date}> {item.budget} SAR </Text>
                                  </View>
                                </View>
                              </View>
                          <View style={styles.emptyText2}> 
                          </View>
                          <View style={styles.secondText2}> 
                          <TouchableOpacity onPress={() => this.goToPostproject()}>
                          <Image source={constants.nextIcon} style={styles.searchIcon} />
                           </TouchableOpacity>
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
                    <Modal
            transparent={true}
            animationType={'none'}
            visible={this.state.modalVisible}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.homemodalBackground}>
              <View style={styles.homeModalStyle}>
                    <View style={styles.modalToolbar}>
                        <TouchableOpacity style={styles.commontoolbarButton} >
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Modal</Text>
                        <TouchableOpacity  style={styles.commontoolbarButton} onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                          }}>
                          <Image source={constants.closeIcon} style={styles.commonBackIcon}/>
                        </TouchableOpacity>
                    </View>
                    <Text>About Us</Text>
                    <Text>Know About the Application</Text>
              </View>
            </View>
          </Modal>      
      </SafeAreaView>
    );
  }
}
