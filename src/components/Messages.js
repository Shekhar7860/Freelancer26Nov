import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, ImageBackground, Alert, FlatList, TouchableHighlight, Text, TextInput, View, Image, Button, TouchableOpacity,Dimensions} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import MyView from './MyView';
import Loader from './Loader';
import { addItem } from '../services/ItemService';
import CustomToast from './CustomToast';
import { strings } from '../services/stringsoflanguages';
import { db } from './db';
import OfflineNotice from './OfflineNotice';
import styles from "../styles/styles";
const {width,height} = Dimensions.get('window')
let itemsRef = db.ref('/items');
export default class Messages extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        search : true,
        loading:false,
        dummyText : "",
        name: '',
        error: false,
        items: [],
        message : " ",
        userResponse: {},
        senderId : "",
        receiverId: "",
        noMessage : " "
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   
 }
 componentDidMount() {
    if(this.props.navigation.state.params)
    {
     console.log(this.props.navigation.state.params)
     this.setState({ receiverId: this.props.navigation.state.params.chatDetails.id});
     }    
     service.getUserData('user').then((keyValue) => {
  //    console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("json", parsedData);
      this.setState({ userResponse: parsedData});
      this.setState({ senderId: parsedData.id});
   }, (error) => {
      console.log(error) //Display error
    });
    this.setState ({ loading: true});
    setTimeout(() => {
    this.setState ({ loading: false});
    this.getFirebaseChat();
    this.setState ({  noMessage: strings.NomessagesFound });
    }, 2000)
 
 
 }

 getFirebaseChat = () => {
  // console.log("senderId", this.state.senderId)
  // console.log("receiverId", this.state.receiverId)
  // console.log("userResponse", this.state.userResponse)
     itemsRef.child(this.state.senderId).child(this.state.receiverId).on('value', (snapshot) => {
      if(snapshot.val() !== null)
      {
      let data = snapshot.val();
      let items = Object.values(data);
      console.log(items);
      this.setState({items});
      }
   });
 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

   searchPage = () =>{
    this.setState({ search: false});
        }

        handleChange(e) {
          this.setState({
            name: e.nativeEvent.text
          });
        }
        handleSubmit() {
          itemsRef.child(this.state.senderId).child(this.state.receiverId).push({
            name: this.state.name,
            id :5
        });
        //  addItem(this.state.name, this.state.senderId, this.state.receiverId);
          Alert.alert(
            'Message Send successfully'
           );
           this.setState({
             name: " "
           });
        //   this.props.navigation.navigate('ListItemScreen')
        }
  

  render() {
   
    return (
        
      <SafeAreaView source={constants.loginbg} style={styles.MainContainer}>
       
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.openDrawer()}>
            <Image source={constants.menuicon} style={styles.hamburgerIcon} />
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{strings.Messages}</Text>
          <TouchableOpacity>
            <Image source={constants.fgggf} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
   
     
        <View style={styles.noTextContainer}>
        </View>
        {
                    this.state.items.length > 0
                    ?  <FlatList
          data={this.state.items}
          style = {{width:width,height:height - 100}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={[ item.id == 5 ? styles.sender : styles.receiver]}>
            <ImageBackground
  source={item.id == 5 ? require('../images/new9.png') :  require('../images/9patch2.png') }
  style={{flex:1}}
>
<Text style={[ item.id == 5 ? styles.senderText : styles.receiverText]}>{item.name}</Text>
</ImageBackground>



          </View>
          }
          keyExtractor={item => item.email}
        />
      : <Text style={styles.centerText}>{this.state.noMessage}</Text>
                }
               
                <Text style={styles.title}></Text>
                <View style={{position:"absolute", bottom:20, width:'100%'}}>
                <View style={{flexDirection:'row',  borderWidth: 1, width:'90%', marginLeft:10,  borderRadius:10}}>

                <TextInput
                    style={styles.chatInput}
                    onChange={this.handleChange}
                    value={this.state.name}
                    placeholder="Type a message...."
                    />


                <TouchableHighlight
                        style = {styles.button}
                        underlayColor= "white"
                        onPress = {this.handleSubmit}
                    >
                    <Image
                    style={{width:40, height:50}}
                    source={require('../images/chat.png')}
                    resizeMode="contain"
                    />
                    </TouchableHighlight>
                    </View>
                    </View>
               
    
     <Loader
              loading={this.state.loading} />
 </SafeAreaView>
      
     
    );
  }
}


