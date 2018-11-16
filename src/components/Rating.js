import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import MyView from './MyView';
import { strings } from '../services/stringsoflanguages';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Stars from 'react-native-stars-rating';

export default class Rating extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        search : true,
        starCount : 2
      };
   
 }
 componentDidMount() {

 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

   searchPage = () =>{
    this.setState({ search: false});
        }

        signUp = () => {
          firebase.auth().signInWithPhoneNumber('+919646407363')
          .then((confirmResult) => {
            // This means that the SMS has been sent to the user
            // You need to:
            //   1) Save the `confirmResult` object to use later
            console.log(confirmResult)
            //   2) Hide the phone number form
            //   3) Show the verification code form
          })
          .catch((error) => {
            console.log(error)
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
         }

         onStarRatingPress(rating) {
           console.log(rating);
          this.setState({
            starCount: rating
          });
        } 


  render() {
   
    return (
        
     <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
     {/* <CreditCardInput onChange={this._onChange} />  */}
    <View style={styles.topView}>
       <MyView  hide={this.state.search} style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput  style={styles.searchContainer} placeholder="Search job"  placeholderTextColor="white" style={styles.topInput}/>
          </View>
      </MyView>
      <View style={styles.toolbar}>
        <Text style={styles.backButton} onPress={() => this.goToHome()}>
        <Image source={constants.backicon} style={styles.iconRating}/>
        </Text>
          <Text style={styles.toolbarTitle}>RATE&REVIEW</Text>
          <TouchableOpacity onPress={() => this.goToUpdateProfile()}>
          <Image  style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
     </View>
     <View style={styles.homeContent}>
         
         <TextInput
            style={styles.review}
            underlineColorAndroid="transparent"
            placeholder={strings.Writeareview}
            onChangeText={(text)=>this.setState({ about:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.about}
            multiline={true}
            numberOfLines={4}
          />
         
         
     </View>
     <View style={{marginTop:20 }}>
     <Stars
    default={2.5}
    count={5}
    half={true}
    starSize={50} 
    fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
    emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
    halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
  />
      
       
      </View>
      <View  style={styles.sideAlign}>
              <View style={styles.emptySpaceRating}>
              </View>
              <View style={styles.buttonWidthRating}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => this.requestAcceptReject('a')}>
		          <Text style={styles.buttonText}>{strings.Cancel}</Text>
		           </TouchableOpacity>
               {/* <Button  style={styles.buttonColor} title="Accept" onPress={() => this.requestAcceptReject('a')}></Button> */}
              </View>
              <View style={styles.emptySpaceRating}>
              </View>
              <View style={styles.buttonWidthRating}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => this.requestAcceptReject('r')}>
		          <Text style={styles.buttonText}>{strings.Submit}</Text>
		           </TouchableOpacity>
                {/* <Button  style={styles.buttonColor} title="Reject" onPress={() => this.requestAcceptReject('r')}></Button> */}
              </View>
                <View style={styles.emptySpaceRating}>
              </View>
      </View> 
     
     
              
 </SafeAreaView>
      
     
    );
  }
}
