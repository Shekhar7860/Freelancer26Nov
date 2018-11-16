import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView,FlatList,Alert, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';

export default class FAVOURITE extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
      userResponse: {},
      feeds : {user:{ Job: [] }},
      heartIcon : constants.heartIcon,
    };
   
 }
 componentDidMount ()   {
  service.getUserData('user').then((keyValue) => {
    console.log("local", keyValue);
    var parsedData = JSON.parse(keyValue);
    console.log("json", parsedData);
    this.setState({ userResponse: parsedData});
     this.CheckInternetConnection();
 }, (error) => {
    console.log(error) //Display error
  });
 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}
  
  
   CheckInternetConnection=()=>{
    service.handleConnectivityChange().then((res) => {
    if(res.type == "none")
    {
      Alert.alert('Alert!', 'Check your internet connection');
    }
    else
    {
      this.getFeedRes();
    }
    })

 
 }
  
   getFeedRes = () => {
    service.getFeedList(this.state.userResponse.api_token).then((res) => {
      console.log("checkres", res);
      newres = JSON.stringify(res);
      json = JSON.parse(newres);
      this.setState({ feeds: json});
    })
   }

  searchPage = () =>{
    alert("searching Page")   
        }

  render() {
   
    return (
        
      <SafeAreaView style={styles.Listcontainer}
      >
       <View style={styles.tabsToolbar} >
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.menuicon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>Freelancer</Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
         <Image source={constants.notificationIcon} style={styles.searchIcon} />
        </TouchableOpacity>
         <TouchableOpacity >
         <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
       </View>
       <FlatList
         data={this.state.feeds.user.Job}
         renderItem={({ item }) => (
            <View  style={styles.spaceFromTop}>
               <View style={styles.listCard}>
               <View style={styles.textInRow}> 
               <Text style={styles.textWrap}> {item.title} 
               </Text>
               </View>
               <View style={styles.textInRow}> 
                 <View >
                     <Text style={styles.priceText}>Fixed Price</Text>
                   </View>
                   <View style={styles.contPadding}>
                      <Text >-</Text>
                   </View>
                   <View >
                      <Text style={styles.date}>{item.start_date} </Text>
                   </View>
               </View>
               <View style={styles.paddingAbove}>
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
                         <TouchableOpacity onPress={() => this.addToFavourites()}>
                         <Image source={this.state.heartIcon} style={styles.icon}/>
                         </TouchableOpacity>
                       </View>
                   </View>
               </View>
               </View>
               
           </View>
         )}
       />
  </SafeAreaView>
       
      
     
    );
  }
}
