import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, ImageBackground, FlatList, TouchableHighlight, Text, TextInput, View, Image, Button, TouchableOpacity,Dimensions} from 'react-native';
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
        message : " "
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   
 }
 componentDidMount() {
  this.setState ({ loading: true});
  setTimeout(() => {
    this.setState ({ loading: false});
    
    this.setState ({ dummyText: strings.NomessagesFound });
    }, 2000)

    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({items});
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
          addItem(this.state.name);
          AlertIOS.alert(
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
      : <Text style={styles.centerText}>No Messages</Text>
                }
                <View style={styles.main}>
                <Text style={styles.title}></Text>
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


