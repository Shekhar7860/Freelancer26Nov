import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, ScrollView, FlatList, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import Loader from './Loader';
import { strings } from '../services/stringsoflanguages';
import OfflineNotice from './OfflineNotice';
export default class CATEGORY extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        categories: [],
        loading : false,
        page : ''
      };
   
 }

 componentDidMount() {
  if(this.props.navigation.state.params)
  {
    console.log(this.props.navigation.state.params);
    this.setState ({ page: this.props.navigation.state.params.page});
  }
  this.setState ({ loading: true});
  setTimeout(() => {
    this.setState ({ loading: false});
    this.getCategoryResponse();
    
    }, 3000)
}

 
 // selection of categories
getCategoryResponse = () => {
  service.category().then(res => {
    console.log("cat_response", res);
    if(res.categories == [])
    {
      this.setState ({ dummyText: "No Category Found"});
    }
    this.setState({ categories: res.categories});
  });
};
 
goToSubCategory = (val) => {
var subCategoryData = {
  "data": val,
  "page" : this.state.page
}
  this.props.navigation.navigate('Sub',  { subCategory: subCategoryData })  
}

goBack = () => {
if(this.props.navigation.state.params.page.pageName == "post")
{
  this.props.navigation.navigate('PostProject')  
}
else 
{
  this.props.navigation.navigate('UpdateProfile')  
}
}
  render() {
    return (
      <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
       <OfflineNotice/>
      <View style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.goBack()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>  {strings.Category} </Text>
         <TouchableOpacity>
        </TouchableOpacity>
         <TouchableOpacity>
         <Image style={styles.searchIcon} />
        </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={styles.listCenter}>
        <FlatList
              data={this.state.categories}
              keyExtractor={(item, index) => index}
              style={styles.categoryCard }
              extraData={this.state.categories}
              renderItem={({ item, index }) => (
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard} onPress={() => this.goToSubCategory(item)}>
                        <View style={styles.textInRow}> 
                        <Text style={styles.textWrap}> {item.name} 
                        </Text>
                        </View>
                        </TouchableOpacity>
                </View>
              )}
            />
       </View>
       </ScrollView>
       <Loader
              loading={this.state.loading} />
 </SafeAreaView>
      
     
    );
  }
}
