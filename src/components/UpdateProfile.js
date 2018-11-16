import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, Alert, View, ScrollView, KeyboardAvoidingView, SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import ImagePicker from "react-native-image-picker";
import MyView from './MyView';
import OfflineNotice from './OfflineNotice';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { strings } from '../services/stringsoflanguages';
export default class UpdateProfile extends Component {
  
  constructor(props){
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
       userResponse: {},
        email:'',
        name:'',
        about: '',
        loading: false,
        userType : "",
        category :'Category',
        pickedImage: null,
        docImage: null,
        resumeImage: null,
        imagePath : '',
        imageExists : false,
        isFreelancer : false,
        document : 'CV',
        proof : 'ID proof',
        file : "",
        fileID : "",
        ifCV : false,
        skills: '',
        image_path:'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg'
      }
  }
 
  UpdateProfileImage = () =>
  {
 ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        console.log(res);
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.setState({ imagePath: res});
        this.setState({
          imageExists: true
        });
 
      }
    });
  }
 
  componentDidMount ()   {
    if(this.props.navigation.state.params)
    {
      console.log(this.props.navigation.state.params.category)
      this.setState ({ category: this.props.navigation.state.params.category.selectedCategory});
      this.setState ({ name: this.props.navigation.state.params.category.inputData.name});
      this.setState ({ email: this.props.navigation.state.params.category.inputData.email});
      this.setState ({ about: this.props.navigation.state.params.category.inputData.about});
    }
    else
    {
    
    service.getUserData('user').then((keyValue) => {
      console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("json", parsedData);
      this.setState({ userResponse: parsedData});
      if(this.state.userResponse.username !== null)
      {
      this.setState ({ name: this.state.userResponse.username});
      }
      if(this.state.userResponse.image_path !== null)
      {
      this.setState ({ image_path : this.state.userResponse.image_path});
      }
      if(this.state.userResponse.email !== null)
      {
      this.setState ({ email: this.state.userResponse.email});
      }
      if(this.state.userResponse.short_bio !== "null")
      {
      this.setState ({ about: this.state.userResponse.short_bio});
      }
      if(this.state.userResponse.CV  !== null) 
      {
        this.setState({ document : this.state.userResponse.CV});
      }
      if(this.state.userResponse.identityId !== null) 
      {
        this.setState({ proof : this.state.userResponse.identityId});
      }
      if(this.state.userResponse.CV !== "") 
      {
        this.setState({ ifCV : true});
      }
      this.setState ({ document: this.state.userResponse.CV});
      this.setState ({ proof: this.state.userResponse.identityId});
      if(this.state.userResponse.categoryId !== "null") 
      {
        this.setState ({ category: this.state.userResponse.categoryId});
      }
      if(this.state.userResponse.skills !== "null") 
      {
        this.setState ({ skills: this.state.userResponse.skills});
      }


    if (this.state.userResponse.usertype == "1")
   {
    this.setState({ isFreelancer: true});
    this.setState({ userType: "Client"});
   }
   else
   {
   this.setState({ userType: "Freelancer"}); 
   }
   }, (error) => {
      console.log(error) //Display error
    });
   }

   service.getUserData('user').then((keyValue) => {
    console.log("local", keyValue);
    var parsedData = JSON.parse(keyValue);
    console.log("json", parsedData);
    this.setState({ userResponse: parsedData});
 }, (error) => {
    console.log(error) //Display error
  });
   if(this.state.userResponse.usertype == "1")
   {
   this.setState({ userType: "Client"});
   }
   else
   {
   this.setState({ userType: "Freelancer"}); 
   }
   }

  // going to next screen
  goToLogin = () =>{
   this.props.navigation.navigate('Login')
  }
  goToSignUp = (userType) =>{
  this.props.navigation.navigate('SignUp', { type: userType })
      }



      CheckInternetConnection=()=>{
        service.handleConnectivityChange().then((res) => {
        if(res.type == "none")
        {
          Alert.alert('Alert!', 'Check your internet connection');
        }
        else
        {
          this.updateProfile();
        }
        })
    
     
     }
 
 updateProfile = () => {
 // if(this.state.pickedImage || this.state.userResponse.image_path )
  // {
     if(this.state.userResponse.usertype == "1")
     {
          if(this.state.name && this.state.email && this.state.about)
          {
            console.log("client")
            if ( service.validateEmail(this.state.email)) 
            {
                  this.setState ({ loading: true});
                  setTimeout(() => 
                  {
                  console.log(this.state.userResponse.api_token);
                if(this.state.pickedImage !== null)
                {
                    service.profile_update(this.state.userResponse.api_token,this.state.name, this.state.email,this.state.about, this.state.pickedImage, this.state.category, this.state.file, this.state.fileID, "client", " ").then((res) => {
                      console.log(res)
                      if(res)
                      {
                      this.setState({loading: false})
                        if(res.status == "success")
                        {
                          setTimeout(() => {
                            Alert.alert(
                              strings.ProfileUpdatedSuccessfully
                            )
                          service.saveUserData('user', res.user);
                          this.goToHome(res);
                            }, 1000)
                        
                        }
                      }
                      else
                      {
                        this.refs.defaultToastBottom.ShowToastFunction('Network error');
                      }
                  })
                }
                else
                {
                  service.profile_update(this.state.userResponse.api_token,this.state.name, this.state.email,this.state.about, this.state.image_path, this.state.category, this.state.file, this.state.fileID, "client", " ").then((res) => {
                    //console.log("data", this.state.email, this.state.username, this.state.about)
                    //console.log(res)
                    if(res)
                      {
                      this.setState({loading: false})
                        if(res.status == "success")
                        {
                          setTimeout(() => {
                        //  this.refs.defaultToastBottom.ShowToastFunction('Profile Updated Successfully');
                            Alert.alert(
                              strings.ProfileUpdatedSuccessfully
                          )
                          service.saveUserData('user', res.user);
                          this.goToHome(res);
                            }, 1000)
                        
                        }
                      }
                      else
                      {
                        this.setState({loading: false})
                        this.refs.defaultToastBottom.ShowToastFunction('Network error');
                      }
                })
              }
                  }, 3000)
          }
          else
          {
            Alert.alert(
             strings.Pleaseentervalidemail
          )
          }

          }
          else
          {
            Alert.alert(
              strings.Pleasefillalldetails
          )
          }
    }
    else 
    {
      console.log("this one")
     
     if( this.state.file.type !== "video/mp4" && this.state.fileID.type !== "video/mp4" && this.state.file.type !== "application/vnd.android.package-archive" && this.state.fileID.type !== "application/vnd.android.package-archive" && this.state.fileID.type !== "application/zip" && this.state.file.type !== "application/zip"
      && this.state.file.type !== "application/x-msdos-program" && this.state.fileID.type !== "application/x-msdos-program" &&  this.state.fileID.type !== "audio/mpeg" && this.state.file.type !== "audio/mpeg")
     {
        if(this.state.name && this.state.email && this.state.about && this.state.category !== "Category" && this.state.document !== "CV" && this.state.proof !== "IDproof" && this.state.proof !== undefined && this.state.document !== undefined && this.state.skills)
          {
            if ( service.validateEmail(this.state.email)) 
            {
                  this.setState ({ loading: true});
                  setTimeout(() => 
                  {
                  console.log(this.state.userResponse.api_token);
                  console.log("file", this.state.file);
                  if(this.state.file == "")
                  {
                    this.setState({ file : this.state.userResponse.CV});
                  }
                  if(this.state.fileID == "")
                  {
                    this.setState({ fileID : this.state.userResponse.identityId});
                  }
                console.log("file", this.state.file)
                console.log("fileId", this.state.fileID)
                if(this.state.pickedImage !== null)
                {
                    service.profile_update(this.state.userResponse.api_token,this.state.name, this.state.email,this.state.about, this.state.pickedImage, this.state.category, this.state.file, this.state.fileID, "freelancer", this.state.skills).then((res) => {
                      console.log(res)
                      if(res != undefined)
                      {
                      this.setState({loading: false})
                        if(res.status == "success")
                        {
                          setTimeout(() => {
                            Alert.alert(
                              strings.ProfileUpdatedSuccessfully
                            )
                          service.saveUserData('user', res.user);
                          this.goToHome(res);
                            }, 1000)
                        
                        }
                      else
                      {
                        this.refs.defaultToastBottom.ShowToastFunction(res.error);
                      }
                      }
                      else
                      {
                        this.refs.defaultToastBottom.ShowToastFunction('Network error');
                      }
                  })
                }
                else
                {
                  service.profile_update(this.state.userResponse.api_token,this.state.name, this.state.email,this.state.about, this.state.image_path, this.state.category, this.state.file, this.state.fileID,  "freelancer", this.state.skills).then((res) => {
                    if(res)
                      {
                      this.setState({loading: false})
                        if(res.status == "success")
                        {
                          setTimeout(() => {
                        //  this.refs.defaultToastBottom.ShowToastFunction('Profile Updated Successfully');
                            Alert.alert(
                              strings.ProfileUpdatedSuccessfully
                          )
                          service.saveUserData('user', res.user);
                          this.goToHome(res);
                            }, 1000)
                        
                        }
                        else
                      {
                        this.refs.defaultToastBottom.ShowToastFunction(res.error);
                      }
                      }
                      else
                      {
                        this.setState({loading: false})
                        this.refs.defaultToastBottom.ShowToastFunction('Network error');
                      }
                })
              }
                  }, 3000)
          }
          else
          {
            Alert.alert(
              strings.Pleaseentervalidemail
           )
          }

          }
          else
          {
            Alert.alert(
              strings.Pleasefillalldetails
          )
          }
     }
       else
      {
      Alert.alert(
        strings.Pleaseselectvalidfileformat
       )
     }
         
        }
      // }
      // else
      // {
      //   Alert.alert(
      //     'Please select image'
      //  )
      // }
 }

 goToHome = (user) => {
   console.log(user);
  setTimeout(() => {
    if(user.user.usertype == 1 )
    {
    this.props.navigation.navigate('Jobs')
    }
    else
    {
      this.props.navigation.navigate('Home') 
    }
    }, 1000)
 }

 openCategory = () => {
  var projectData = {
    "name" :  this.state.name,
    "email" : this.state.email,
    "about" : this.state.about,
    "pageName" : 'settings', 
    "image" : this.state.pickedImage
  }
  this.props.navigation.navigate("Cat",  { page: projectData });
}

 
 goBack = () => {
  if(this.state.userResponse.usertype == 1 )
  {
  this.props.navigation.navigate('Jobs')
  }
  else
  {
    this.props.navigation.navigate('Home') 
  }
}

 selectdoc = () => {
  DocumentPicker.show({
    filetype: [DocumentPickerUtil.allFiles()],
  },(error,res) => {
    
    // Android
    console.log(
      "response",
       res.uri,
       res.type, // mime type
       res.fileName,
       res.fileSize
    );
    this.setState ({ document: res.fileName});
    this.setState ({ file: res});
  });
 }

 selectIDproof = () => {
  DocumentPicker.show({
    filetype: [DocumentPickerUtil.allFiles()],
  },(error,res) => {
    
    // Android
    console.log(
      "response",
       res.uri,
       res.type, // mime type
       res.fileName,
       res.fileSize
    );
    this.setState ({ proof: res.fileName});
    this.setState ({ fileID: res});
  });
 }

  render() {
      defaultImg = 'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg';
      const  ImagePicked =   <TouchableOpacity ><Image source={this.state.pickedImage} style={styles.profilePic}/></TouchableOpacity>
      const  NewImage =   <TouchableOpacity ><Image source={{uri: this.state.userResponse.image_path || defaultImg  }} style={styles.profilePic}/></TouchableOpacity>
    return (
  <SafeAreaView style={styles.MainContainerProfile}>
   <OfflineNotice/> 
	    <View style={styles.toolbar}>
			<TouchableOpacity  onPress={() => this.goBack()}>
			<Image source={constants.backicon} style={styles.hamburgerIcon}/>
			</TouchableOpacity>
         <Text style={styles.toolbarTitle}> {strings.Profile}</Text>
         <TouchableOpacity onPress={() => this.CheckInternetConnection()}>
         <Text style={styles.updateText}>{strings.Done}</Text>
        </TouchableOpacity>
      </View>
     
     <ScrollView>
     <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"  
    >
      <MyView style={styles.profileContainer} hide={this.state.imageExists}>
      { NewImage}
      </MyView>
      <MyView style={styles.profileContainer} hide={!this.state.imageExists}>
      { ImagePicked}
      </MyView>
      <TouchableOpacity style={styles.camera} onPress={() => this.UpdateProfileImage()}>
         <Image source={constants.cameraIcon} style={styles.cameraIcon} />
        </TouchableOpacity>
      <View style={{padding:10}}>
      <Text style={styles.themetextColor}>
           {strings.Username}
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder={strings.Name}
            onChangeText={(text)=>this.setState({ name:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.name}
          />
          </View>
          <View style={{padding:10}}>
      <Text style={styles.themetextColor}>
           {strings.Emailaddress}
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder={strings.Email}
            onChangeText={(text)=>this.setState({ email:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.email}
          />
          </View>
          <View style={{padding:10}}>
      <Text style={styles.themetextColor}>
         {strings.AboutMe}
      </Text>
      <TextInput
            style={styles.about}
            underlineColorAndroid="transparent"
            placeholder={strings.AboutMe}
            onChangeText={(text)=>this.setState({ about:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.about}
            multiline={true}
            numberOfLines={4}
          />
          </View>
          <View style={{padding:10}}>
      <Text style={styles.themetextColor}>
           {strings.Usertype}
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder="User Type"
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.userType} editable={false}
          />
          </View>
          
          <MyView style={{padding:10}} hide={this.state.isFreelancer}>
              <Text style={styles.themetextColor}>
                  {strings.Category}
              </Text>
              <View  style={styles.categoryTextProfile}>
                  <Text style={styles.dateTextColorProfile} onPress={() => this.openCategory()}>
                  {this.state.category}
                  </Text>
              </View>
          </MyView>
          <MyView style={{padding:10}} hide={this.state.isFreelancer}>
          <Text style={styles.themetextColor}>
              {strings.Skills}
          </Text>
          <TextInput
                style={styles.postprojectinputprofile}
                underlineColorAndroid="transparent"
                placeholder={strings.Addskills}
                onChangeText={(text)=>this.setState({ skills:text})}
                placeholderTextColor="#AEA9A8"
                autoCapitalize="none"
                returnKeyType='done'
                value={this.state.skills}
              />
          </MyView>
          
          {/* <MyView style={{padding:10}} hide={this.state.ifCV}> */}
              <MyView style={styles.CV} hide={this.state.isFreelancer}>
                  <Text style={styles.themetextColor}>
                      {strings.Cv}
                  </Text>
                  <View  style={{flexDirection:'row', width:'95%'}}>
                    <View style={styles.inputWidth}>
                    <View  style={styles.docBorder}>
                      <Text style={styles.CVtext}>
                      {this.state.document}
                      </Text>
                    </View>
                    </View>
                    <View style={styles.attachinputWidth}>
                    <TouchableOpacity  style={styles.attachBackground} onPress={() => this.selectdoc()}>
                    <Image style={styles.attachiconWidth} source={constants.attachIcon} />
                    </TouchableOpacity>
                    </View>
                  </View>
                </MyView> 
               <MyView style={styles.proof} hide={this.state.isFreelancer}>
                  <Text style={styles.themetextColor}>
                     {strings.IdProf}
                  </Text>
                  <View  style={{flexDirection:'row',  width:'95%'}}>
                    <View style={styles.inputWidth}>
                      <View  style={styles.docBorder}>
                        <Text style={styles.CVtext}>
                        {this.state.proof}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.attachinputWidth}>
                      <TouchableOpacity  style={styles.attachBackground} onPress={() => this.selectIDproof()}>
                      <Image style={styles.attachiconWidth} source={constants.attachIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
            </MyView>
            {/* </MyView>  */}
      </KeyboardAvoidingView>
      </ScrollView>
      {/* <View style={styles.doneCenter}>
      <TouchableOpacity style={styles.bottomViewDetails}  onPress={() => this.updateProfile()}>
         <Text style={styles.textStyle}>DONE</Text>
      </TouchableOpacity>
      </View> */}
      <View style={styles.toastCenter}>
	    <CustomToast ref = "defaultToastBottom"/>
      </View>
      <Loader
          loading={this.state.loading} />
       </SafeAreaView>
	   
    );
  }
}

