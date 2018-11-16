import React, {Component} from 'react';
import {ScrollView, SafeAreaView, Text, View, TouchableHighlight, ImageBackground, Switch, Image, TouchableOpacity ,Alert} from 'react-native';
import Service from '../services/Service';
import Constants from '../constants/Constants';
import MyView from './MyView';
import { strings } from "../services/stringsoflanguages";
import OfflineNotice from './OfflineNotice';
class SideMenu extends Component {
  state = {
    userFbData: { picture_large:{ data:{}}},
    userGoogleData:{},
    name: " ",
    logOut: true,
    items : false,
    icon : constants.downIcon,
    personData: {},
    userType : "(Freelancer)",
    names: [
     {
        id: 0,
        name: 'About',
        icon:constants.aboutIcon
     },
     {
       id: 1,
       name: 'Messages',
       icon:constants.messagesIcon
    },
     {
        id: 2,
        name: 'My Payment',
        icon:constants.paymentIcon
     },
     {
        id: 3,
        name: 'My Project',
        icon:constants.projectsIcon,
     }
     
  ]
  }; 
  constructor(props){
    super(props);
   // console.log('propvalue', props);
    service = new Service();
    constants = new Constants();
   this.componentWillReceiveProps();
     
}

overLang() {
  service.getUserData("language").then(
    keyValue => {
     if(keyValue == true)
     {
      strings.setLanguage("en");
     }
     else
     {
      strings.setLanguage("ar");
     }
        
    },
    error => {
      console.log(error); //Display error
    }
  );
 }




takePicture = () => {
  const options = {};
  this.camera.capture({ metadata: options })
  .then((data) => console.log(data))
  .catch(err => console.error(err));
}
logOut = () =>{

  service.getUserData("language").then(
    keyValue => {
     if(keyValue == "true")
     {


  Alert.alert(
    'Log Out',
    'Are you sure you want to logout?', [{
        text: 'Cancel',
        style: 'cancel'
    },
    {
        text: 'OK',
        onPress: () => 
        this.exit()
    }, ], {
        cancelable: false
    }
  
 )
  }else{

    Alert.alert(
      'الخروج',
      'هل أنت متأكد أنك تريد تسجيل الخروج؟', [{
          text: 'إلغاء',
          style: 'cancel'
      },
      {
          text: 'حسنا',
          onPress: () => 
          this.exit()
      }, ], {
          cancelable: false
      }
    
   )


  } 
},
    error => {
      console.log(error); //Display error
    }
  );
}



componentWillReceiveProps(props) {
  console.log('data');
  service.getUserData('user').then((keyValue) => {
    var parsedData = JSON.parse(keyValue);
    console.log("sidemenujson", parsedData);
    if(parsedData.usertype == 1)
    {
      this.setState ({
         names: [
          {
             id: 0,
             name: 'About',
             icon:constants.aboutIcon
          },
          {
             id: 1,
             name: 'My Balance',
             icon:constants.balanceIcon
          },
          {
             id: 2,
             name: 'Find Works',
             icon:constants.workIcon
          },
          {
             id: 3,
             name: 'My Jobs',
             icon:constants.projectsIcon,
          },
          {
            id: 4,
            name: 'Messages',
            icon:constants.messagesIcon,
         }
       ]  
      });
      this.setState({ userType: " "});
    }
    this.setState({ personData: parsedData});
   
    if(parsedData.username != null || parsedData.username != "null")
    {
    this.setState({ name: parsedData.username});
    }
  }, (error) => {
    console.log(error) //Display error
  });
}

componentDidMount ()   {

////////sk

// service.getUserData("language").then(
//   keyValue => {
//    if(keyValue == true)
//    {
//     strings.setLanguage("en");
//    }
//    else
//    {
//     strings.setLanguage("ar");
//    }
      
//   },
//   error => {
//     console.log(error); //Display error
//   }
// );

///////////ek

  service.getUserData('user').then((keyValue) => {
    var parsedData = JSON.parse(keyValue);
    console.log("sidemenujson", parsedData);
    if(parsedData.usertype == "1")
    { 
      this.setState ({
         names: [
          {
             id: 0,
             name: 'Messages',
             icon:constants.messagesIcon
          },
          {
             id: 1,
             name: 'My Balance',
             icon:constants.balanceIcon
          },
          {
             id: 2,
             name: 'Find Works',
             icon:constants.searchFreelancerIcon
          },
          {
             id: 3,
             name: 'My Jobs',
             icon:constants.projectsIcon,
          },
          {
            id: 4,
            name: 'Account',
            icon:constants. accountIcon,
         }
       ]  
      });
    }
    this.setState({ personData: parsedData});
    if(parsedData.username != null || parsedData.username != "null")
    {
    this.setState({ name: parsedData.username});
    }
 }, (error) => {
    console.log(error) //Display error
  });
 }
 
 userData = () => {
 service.getUserData('user').then((keyValue) => {
  var parsedData = JSON.parse(keyValue);
  console.log("sidemenujson", parsedData);
  if(parsedData.usertype == 1)
  {
    this.setState ({
       names: [
        {
           id: 0,
           name: 'Messages',
           icon:constants.messagesIcon
        },
        {
           id: 1,
           name: 'My Balance',
           icon:constants.balanceIcon
        },
        {
           id: 2,
           name: 'Find Works',
           icon:constants.workIcon
        },
        {
           id: 3,
           name: 'My Jobs',
           icon:constants.projectsIcon,
        },
        {
          id: 4,
          name: 'Messages',
          icon:constants.messageIcon,
       }
     ]  
    });
  }
  this.setState({ personData: parsedData});
  if(parsedData.username != null || parsedData.username != "null")
    {
    this.setState({ name: parsedData.username});
    }
}, (error) => {
  console.log(error) //Display error
});
}

exit = () => {
  //service.clearLocalStorage();
  service.saveUserData('user', "");
  this.props.navigation.navigate('Welcome')
}
 
goToProfile = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate('Profile')
}


alertItemName = (item) => {
  switch(item.name) {
    case 'My Payment':
     this.props.navigation.navigate("Payment");
     break;
     case 'My Project':
     this.props.navigation.navigate("Home");
     break;
     case 'My Jobs':
     this.props.navigation.navigate("Jobs");
     break;
     case 'Find Works':
     this.props.navigation.navigate("FindFreelancer");
     break;
     case 'My Balance':
     this.props.navigation.navigate("Balance");
     break;
    default:
    this.props.navigation.navigate(item.name);
  }
  this.props.navigation.closeDrawer();
}

goToSettingsPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("Settings");
}

goToAccountPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("Account");
}

goToAboutPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("About");
}

goToFeedbackPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("Feedback");
}


 toggleItems = () =>
 {
  if(this.state.logOut)
  {
  this.setState ({ logOut: false});
  this.setState ({ items: true});
  this.setState ({ icon: constants.upIcon});
  }
  else
  {
    this.setState ({ icon: constants.downIcon});
    this.setState ({ logOut: true});
    this.setState ({ items: false}); 
  }
 }
 
 getItemName=(itemName)=>{
  var s = 'dhd'

  switch(itemName) {
    case 'About':
    s = strings.About
    return s;
     case 'My Balance':
     s = strings.MyBalance
     return s;
     case 'Find Works':
     s = strings.FindWorks
     return s;
     case 'My Jobs':
     s = strings.MyJobs
     return s;
     case 'Messages':
     s = strings.Messages
     return s;
     case 'My Payment':
     s = strings.MyPayment
     return s;
     case 'My Project':
     s = strings.MyProject
     return s;
    default:
    s = 'ttt'

  }
  

  return s
 }

  render () {
    // this.componentDidMount();
   const  NewImage =   <Image source={constants.defaultImage} style={styles.profilePic}/>
   const personImage = <Image source={{uri: this.state.personData.image_path }} style={styles.profilePic} />;
   const fbName =      <Text style={styles.userName}>{this.state.userFbData.name}</Text>
   const GoogleName = <Text style={styles.userName}>{this.state.userGoogleData.name}</Text>
   const DefaultName = <Text style={styles.defaultUserName}>{this.state.name}</Text>
   const ProfileName = <Text style={styles.defaultUserName}>Client</Text>
   const ProfileName2 = <Text style={styles.defaultUserName}>{strings.Freelancerstring}</Text>
   
      var profile;
      if (this.state.personData.usertype == "1") 
        {
          profile = ProfileName
        } 
        else 
        {
          profile = ProfileName2
        }
          if (this.state.personData.image_path !== "") {
            userImage = personImage
          } 
          
          else
          {
            userImage = NewImage
          }

          const defaultImg =
          'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg'
        
      
    return (
      <SafeAreaView
      source={constants.loginbg}
      style={styles.sideMenucontainer}>
       <OfflineNotice/> 
          <View style={styles.upperContainerSideMenu}>
            <View style={styles.sideMenuAlign}>
            <TouchableOpacity style={styles.arrowView} onPress = {() => this.goToProfile()}>
            <Image source={{uri: this.state.personData.image_path || defaultImg  }} style={styles.profilePic} />
            </TouchableOpacity>
            <Text style={styles.textFontSideMenuNew}>{DefaultName}</Text>
            <Text style={styles.ProfileName}>{this.state.userType}</Text>
            {/* <View style={styles.rowAlignSideMenu}>
                  <View style={styles.name}>
                  </View>
                  <View style={styles.blank}>
                    <Text style={styles.textFontSideMenu}>{DefaultName}</Text>
                  </View>
                  <TouchableOpacity style={styles.arrowView} onPress = {() => this.toggleItems()}>
                  <Image source={this.state.icon} style={styles.shareIcon}/>
                  </TouchableOpacity>
             </View>
             <View style={styles.space2}>
             <View style={styles.rowAlignSideMenu}>
                  <View style={styles.name}>
                  </View>
                  <View style={styles.blank}>
                    <Text style={styles.textFontSideMenu}>{profile}</Text>
                  </View>
                  <TouchableOpacity style={styles.arrowView}>
                  </TouchableOpacity>
             </View>
             </View> */}
             </View>
          </View>
          <View style={styles.lowerContainerSideMenu}>
          <MyView style={styles.topMargin} hide={this.state.items}> 
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     onPress = {() => this.alertItemName(item)}>
                     
                     <View style={styles.list}>
                       <TouchableOpacity style={styles.listIconsWidth}>
                          <Image source={item.icon} style={styles.listIcon}/>
                        </TouchableOpacity>
                        <View style={styles.listItemsBlank}></View>
                        <View style={styles.listTextWidth}>
                           <Text style={styles.listTextFontSize}>{this.getItemName(item.name)}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               ))
            }
        <View
        style={styles.line}
        />
          {/* <TouchableOpacity  style={styles.rowAlignSideMenu2} onPress = {() => this.goToAccountPage()}>
            <View style={styles.listIconsWidth} >
               <Image source={constants.accountIcon} style={styles.listIcon}/>
            </View>
            <View style={styles.listItemsBlank}></View>
              <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>Account</Text>
              </View>
          </TouchableOpacity> */}
          <TouchableOpacity  style={styles.sideAlign} onPress = {() => this.goToSettingsPage()}>
            <View style={styles.listIconsWidth} >
               <Image source={constants.settingsIcon} style={styles.listIcon}/>
            </View>
            <View style={styles.listItemsBlank}></View>
              <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>{strings.Settings}</Text>
              </View>
          </TouchableOpacity>
           <TouchableOpacity  style={styles.rowAlignSideMenu2} onPress = {() => this.goToFeedbackPage()}>
            <View style={styles.listIconsWidth} >
               <Image source={constants.feedbackIcon} style={styles.listIcon}/>
            </View>
            <View style={styles.listItemsBlank}></View>
              <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>{strings.Feedback}</Text>
              </View>
          </TouchableOpacity> 
         </MyView>
          
         { <TouchableOpacity onPress={() => this.logOut()}>
         <MyView  style={styles.rowAlignSideMenu2} >
         <TouchableOpacity style={styles.listIconsWidth} >
               <Image source={constants.logoutIcon} style={styles.listIcon}/>
          </TouchableOpacity>
           <View style={styles.listItemsBlank}></View>
          <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>{strings.Logout}</Text>
          </View>
          </MyView>
          </TouchableOpacity> }
          </View>
        <View style={styles.sideMenu}>
        </View>
   </SafeAreaView>
     
     
    );
  }
}



export default SideMenu;