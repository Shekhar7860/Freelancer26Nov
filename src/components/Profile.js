import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import MyView from './MyView';
import { strings } from '../services/stringsoflanguages';
export default class Profile extends Component {
  
  constructor(props){
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
      userResponse: {},
      userType : "",
      pickedImage: null,
      docImage: null,
      resumeImage: null,
      isFreelancer : false,
      name : ' ',
      email : ' ',
      about : ' ',
      CV : ' ', 
      proof : ' ',
      category : ''
     }
  }

  componentDidMount ()   {
    service.getUserData('user').then((keyValue) => {
      console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("json", parsedData);
      if(parsedData.username !== null) 
      {
        this.setState({ name: parsedData.username});
      }
      this.setState({ category : parsedData.categoryId});
      if(parsedData.email !== null) 
      {
        this.setState({ email: parsedData.email});
      }
      if(parsedData.short_bio !== "null") 
      {
        this.setState({ about: parsedData.short_bio});
      }
      if(parsedData.CV  !== null) 
      {
        this.setState({ CV : parsedData.CV});
      }
      if(parsedData.identityId !== null) 
      {
        this.setState({ proof : parsedData.identityId});
      }
      if(parsedData.usertype == 1)
      {
      this.setState({ userType: "Client"});
      this.setState({ isFreelancer: true});
      }
      else
      {
      this.setState({ userType: "Freelancer"}); 
      }
      this.setState({ userResponse: parsedData});
   }, (error) => {
      console.log(error) //Display error
    });
   }


goToHome = () => {
    if(this.state.userResponse.usertype == 1 )
    {
    this.props.navigation.navigate('Jobs')
    }
    else
    {
      this.props.navigation.navigate('Home') 
    }
 }

 goToUpdateProfile = () =>
 {
  this.props.navigation.navigate('UpdateProfile')
 }


  render() {
    const defaultImg =
    'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg'
  
   
    // const fbImage = <Image source={{uri: this.state.userFbData.picture_large.data.url}} style={styles.profilePic} />;
    return (
  <SafeAreaView style={styles.profileContainerView}>
  <OfflineNotice/> 
        <View style={styles.toolbar}>
        <Text style={styles.backButton} onPress={() => this.goToHome()}>
        <Image source={constants.backicon} style={styles.icon}/>
        </Text>
          <Text style={styles.toolbarTitle}>{strings.Profile}</Text>
          <TouchableOpacity onPress={() => this.goToUpdateProfile()}>
          <Image source={constants.editIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View style = {styles.profileTopView}>
            <View style={styles.imageWidthContainer}>
            <Image source={{uri: this.state.userResponse.image_path || defaultImg  }} style={styles.pic} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameProfile}>
                {this.state.name}
                </Text>
                <Text style={styles.nameProfile} >
                        {this.state.email}
                </Text>
                <Text style={styles.dateTextColorProfile} >
                        {this.state.about}
                </Text>
            </View>
            <View style={styles.emptyprofileContainer}>
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.rowAlignSideMenu}>
                <Image source={constants.starIcon} style={styles.starIcon} />
                <Image source={constants.starIcon} style={styles.starIcon} />
                <Image source={constants.starIcon} style={styles.starIcon} />
                <Image source={constants.starIcon} style={styles.starIcon} />
                <Image source={constants.starUnfilledIcon} style={styles.starIcon} />
              </View>
              <Text style={styles.startextColor}>4.5 (rating)</Text>
            </View>
        </View>
        {/* <View style={{padding:10}}>
        <Text style={styles.summary}>
            Summary
        </Text>
        <View  >
            <Text style={styles.dateTextColorProfile}>
          Have more than 15 years of experience in website development
            </Text>
        </View>
            </View> */}
            {/* <View style={{padding:10}}>
            <Text >
                Email
            </Text>
            <View style={styles.categoryTextProfile}>
                    <Text style={styles.dateTextColorProfile} >
                    {this.state.email}
                    </Text>
                </View>
              </View> */}
            {/* <View style={{padding:10}}>
              <Text >
                  About Me
              </Text>
              <View  style={styles.categoryTextProfile}>
                    <Text style={styles.dateTextColorProfile} >
                    {this.state.about}
                    </Text>
                </View>
            </View>
            <View style={{padding:10}} >
              <Text >
              User Type
              </Text>
              <View  style={styles.categoryTextProfile}>
                    <Text style={styles.dateTextColorProfile} >
                    {this.state.userType}
                    </Text>
                </View>
            </View> */}
            <MyView style={{padding:10}} hide={this.state.isFreelancer}>
                <Text style={styles.themetextColor}>
                    {strings.Category}
                </Text>
                <View  style={styles.categoryTextProfile}>
                    <Text style={styles.dateTextColorProfile} >
                  {this.state.category}
                    </Text>
                </View>
            </MyView>
            <MyView style={{padding:10}} hide={this.state.isFreelancer}>
                <Text style={styles.themetextColor}>
                    {strings.Cv}
                </Text>
                <View  style={styles.categoryTextProfile}>
                    <Text style={styles.CVtext} >
                    {this.state.CV}
                    </Text>
                </View>
            </MyView>
            <MyView style={{padding:10}} hide={this.state.isFreelancer}>
                <Text style={styles.themetextColor}>
                    {strings.IdProf}
                </Text>
                <View  style={styles.categoryTextProfile}>
                    <Text style={styles.CVtext} >
                    {this.state.proof}
                    </Text>
                </View>
            </MyView>
            
</ScrollView>
</SafeAreaView>
	   
    );
  }
}

