// global styles 
import {colors, fonts, padding, dimensions, align} from './base.js'
import {StyleSheet, Platform} from 'react-native';
export default styles = StyleSheet.create({

  container: {
    flex: 1,
    height:'100%'
  },
  header: {
    fontSize: fonts.lg,
    fontFamily: fonts.primary
  },
  section: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl
  },
  signUpFont: {
    color:colors.red,
    fontSize:padding.ms
  },
  loginText: {
    color:colors.red,
    padding:padding.sm,
    width:42
    },
    alignrow:{
      flexDirection:'row',
      flex:1,  
    },
    col:{
      flexDirection:'row',
       flexWrap:'wrap'
    },
    cardContainer:{
     width:'80%',
     backgroundColor:"#f8f8f8",
     padding:padding.sm,
     height:225,
     borderColor: colors.transparent,
     borderWidth: 1,
     marginTop:-padding.sm,
     borderRadius:10
    }, 
    messageBox:{
      width:'90%',
      paddingTop:5,
      alignItems:align.center,
      height:240
  },
  messageBoxTitleText:{
      fontWeight:'bold',
      color:colors.white,
      textAlign:align.center,
      fontSize:20,
      marginBottom:padding.sm
  },
  toolbar:{
    paddingTop:10,
    paddingBottom:padding.sm,
    flexDirection:'row',
    backgroundColor:colors.themeColor,
    height:50
     //Step 1
},
tabsToolbar:{
  paddingTop:10,
  paddingBottom:padding.sm,
  flexDirection:'row',
  backgroundColor:colors.themeColor

   //Step 1
},
topView:{
  paddingTop:10,
  paddingBottom:padding.sm,
  backgroundColor:colors.themeColor,
  height:50
   //Step 1
},
toolbarButton:{
    width: 30,            //Step 2
    color:colors.white,
    textAlign:align.center,
    marginTop: (Platform.OS === 'ios') ? 15 : 5,
    marginLeft: (Platform.OS === 'ios') ? 10 : 0
},
backButton:{
  width: 30,            //Step 2
  color:colors.white,
  textAlign:align.center,
  marginTop: (Platform.OS === 'ios') ? 10 : 5,
  marginLeft: (Platform.OS === 'ios') ? 10 : 0
},
toolbarTitle:{
    color:colors.white,
    textAlign:'center',
    flex:1,
    marginTop: (Platform.OS === 'ios') ? 0 : 0,
    fontSize:20               //Step 3
 },
 updateText:{
  color:colors.white,
  textAlign:align.center,
  fontWeight:'bold',
  flex:1,
  marginTop: (Platform.OS === 'ios') ? 5 : 0,
  fontSize:18,
  marginRight:10           //Step 3
},
  messageBoxBodyText:{
      color:colors.white,
      fontSize:16
  },
  textContainer:{
    paddingTop:15,
    width:'95%',
    alignItems:'flex-end',
  },
  imgContainer:{
    padding:padding.sm,
    padding:20
  },
  topText:{
    color:colors.white,
    textAlign:'left',
    fontSize:20,
    fontWeight:'bold'
  },
  splashLoading:{
    flex:1,
  justifyContent:align.center
  },
  imageContainer:{
    paddingTop:5,
    alignItems:align.center,
  },
  imageWidth:{
  },
  centerAlign :{
   alignItems:align.center,
   marginTop:10,
   position:'absolute',
   width:'100%',
   bottom: (Platform.OS === 'ios') ? 185 : 160
  },
  centerAlignSignUp :{
    alignItems:align.center,
    marginTop:0,
    position:'absolute',
    width:'100%',
    top: -40
   },
  loginText:{
    color:colors.red,
  },
  textBorder:{
    borderBottomColor: colors.red,
    borderBottomWidth: 1
  },
  borderWidth : {
    paddingTop:2,
    width:42
  },
  borderWidthSignUp : {
    paddingTop:2,
    width:50
  },
  borderWidthForgot : {
    paddingTop:2,
    width:127
  },
  textInputContainer:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  textInputContainer2:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop:padding.sm
  },
  iconWidth:{
    width:30,
    height:30
  },
  float:{
    flex: 1, 
    backgroundColor: '#f5fcff'
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: align.center,
    alignItems: align.center,
    backgroundColor: colors.white,
},
searchIcon: {
    padding: padding.sm,
},
input: {
    flex: 1,
    paddingTop: padding.sm,
    paddingRight: padding.sm,
    paddingBottom: padding.sm,
    paddingLeft: 0,
    backgroundColor: colors.white,
    color: '#424242',
},
icon:{
  width:20,
  height:20
},
iconHeart:{
  width:20,
  height:20,
  marginTop :-40
},
socialIcon:{
  width:40,
  height:40,
  marginTop:12
},
border:{
  borderBottomColor: colors.black,
  borderBottomWidth: 1,
  flex:1
},
rowAlign:{
  flexDirection:'row',
  borderBottomColor: colors.black,
  borderBottomWidth: 1,
  width:dimensions.fullWidth - 140 ,
  paddingTop: (Platform.OS === 'ios') ? 10 : 0
},
loginContainer:{
  alignItems:align.center
},
loginContainerSignIn:{
  alignItems:align.center,
  marginTop: 12
},
buttonWidth:{
  width:300,
  alignItems:align.center
},
loginbutton:{
backgroundColor:colors.red,
color:colors.white,
width:70,
textAlign:align.center,
height:30,
borderRadius:padding.sm,
position:'relative',
bottom:14,
paddingTop:4,
 },
 center:{
   paddingTop:20,
   alignItems:align.center
 },
 connect:{
  paddingTop:20,
  alignItems:align.center,
  width:'40%'
},
 borderWidth2 : {
  paddingTop:2,
  width:128
},
textBorder2:{
  borderBottomColor: colors.black,
  borderBottomWidth: 1
},
rowAlign2:{
  flexDirection:'row',
  alignItems:align.center
},
rowAlign3:{
  flexDirection:'row',
  alignItems:align.center,
  paddingTop:5
},
textCenter:{
  textAlign:align.center
},
borderWidth3 : {
  paddingTop:18,
  width:'20%'
},
bottomText:{
  alignItems:align.center,
  paddingTop:padding.sm
},
cardContainerSignUp:{
  width:'80%',
  padding:padding.sm,
  borderColor: colors.black,
  borderWidth: 1,
  backgroundColor:colors.white,
  borderRadius:20,
  height:290
 },
 cardContainerSignIn:{
  width:'80%',
  padding:padding.sm,
  borderColor: colors.black,
  borderWidth: 1,
  backgroundColor:colors.white,
  borderRadius:20,
  height:270
 },
 cardContainerForgot:{
  width:'80%',
  padding:padding.sm,
  height:220,
  borderColor: colors.black,
  borderWidth: 1,
  marginTop:-40,
  backgroundColor:colors.white,
 },
 topSpace:{
   alignItems:align.center
 },
 signUpButton:{
  backgroundColor:colors.themeColor,
  color:colors.white,
  width:dimensions.fullWidth - 140,
  textAlign:align.center,
  height:40,
  borderRadius:padding.md,
  position:'relative',
  bottom:13,
  paddingTop:10,
   },
   forgotTextHeadline:{
     paddingTop:padding.lg,
     width:'100%'
   },
   hamburgerIcon:{
     width:30,
     height:30,
    marginLeft:25},
    searchIcon:{
      width:30,
      height:30,
     marginRight:25},
     homeContent:{
       alignItems:align.center
     },
     cardImage:{
       width:'90%',
       height:220,
       borderRadius:25,
     },
     sideMenu:{
     alignItems:align.center,
     },
    profilePic:{
      marginTop:10,
      width:140,
     height:140,
     borderRadius : 70
    },
    freelancerprofilePic:{
      width:50,
     height:50,
     borderRadius:25
    },
    userName:{
      paddingTop:padding.sm,
      color:colors.white
    },
    defaultUserName:{
      paddingTop:padding.sm,
      paddingLeft:padding.md,
      color:colors.white
    },
    error:{
      color:colors.red,
      paddingTop:5
    },
    MainContainer :{
      height:'95%',
      alignItems: 'center',
      },
       
      animatedToastView:
      {
         marginHorizontal: 30,
         paddingHorizontal: 25,
         paddingVertical: 10,
         borderRadius: 25,
         zIndex: 9999,
         position: 'absolute',
         justifyContent: 'center'
      },
      ToastBoxInsideText:
      {
         fontSize: 15,
         alignSelf: 'stretch',
         textAlign: 'center'
      },
      toast:{
        alignItems:align.center
      },
      homemodalBackground: {
        flex:1,
        marginTop :-80,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
      modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      homeModalStyle: {
        backgroundColor: '#FFFFFF',
        height: 300,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center'
      },
      footer:{
        position:'absolute',
        top:560
      },
      staticIcon:{
        width:25,
        height:20
      },
      forgotText:{
       paddingTop:padding.md
      },
      textWidth:{
        width:'100%'
      },
      iconsAlign:{
      flexDirection:'row'
      
      },
      shareIcon:{
        width:25,
        height:25
      },
      newsearchIcon:{
        width:20,
        height:20
      },
      listIcon:{
        width:25,
        height:25,
        marginLeft:25
      },
      viewWidth:{
        width:'42%'
      },
      viewWidthEmpty:{
        width:'16%'
      },
      rightAlign:{
        textAlign:'right'
      },
      white:{
        color:colors.white
      },
      topPadding:{
        paddingTop:padding.md
      },
      topMargin:{
        paddingTop:30,
      },
      list:{
       
        flexDirection:'row',
        marginTop:20,
        flexWrap:'nowrap'
      },
      listIconsWidth:{
      width:'25%'
    },
    listItemsBlank:{
      width:10
    },
    listTextWidth:{
      width:230
    },
    listIconsWidth2:{
      width:60
    },
    listTextWidth2:{
      width:'60%'
    },
    listToggleIconWidth2:{
      width:'10%'
    },
    toggleIcon:{
      width:100,
      height:50
    },
    listTextFontSize:{
      fontSize:20,
      textAlign: "left",
      display:'flex',
      color : colors.white
    },
    switch:{
      width:70
    },
    cameraIcon:{
      position:'absolute', 
      bottom:20,
      width:35,
      top:62,
      left:164,
      height:35,
      overflow:'hidden'
    },
    headLine:{
      alignItems:align.center

    },
    welcomeContainer:{
		  flex:1,
		  backgroundColor:colors.themeColor
	  },
	  welcomeHeadline:{
		  flex:1,
		  alignItems:align.center,
		  paddingTop:200
    },
    welcomeHeadlineSignUp:{
      marginTop:-10,
      flexDirection:"column"
	  },
	   accountHeadline:{
		  flex:1,
		  alignItems:align.center,
		  paddingTop:100
	  },
	  headlineText:{
		  fontSize:50,
      color:colors.white,
      fontFamily: "blackjack"
	  },
	  accountHeadlineText:{
		  fontSize: (Platform.OS === 'ios') ? 50 : 25,
      color:colors.themeColor,
      fontFamily: fonts.themeFontBold
	  },
	  buttonBackground:{
		  marginTop:200,
		  backgroundColor:colors.white,
		  width:"50%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
	  },
	  hireButtonBackground:{
		  marginTop:110,
		  backgroundColor:colors.themeColor,
		  width:"65%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    otpButton:{
		  marginTop:50,
		  backgroundColor:colors.themeColor,
		  width:"65%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
	  lookingButtonBackground:{
		  marginTop:35,
		  backgroundColor:colors.themeColor,
		  width:"65%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
	  },
	  buttonText:{
		  textAlign:align.center,
		  fontSize:15,
      color:colors.themeColor,
      fontFamily: fonts.themeFont
	  },
	   accountButtonText:{
		  textAlign:align.center,
		  fontSize:15,
      color:colors.white,
      fontFamily: fonts.themeFont,
	  },
	   accountText:{
		  textAlign:align.center,
		  fontSize:15,
		  color:colors.white,
      paddingTop:padding.sm,
      fontFamily: fonts.themeFont
	  },
	  selectAccountText:{
		  textAlign:align.center,
		  fontSize:15,
		  color:colors.themeColor,
      paddingTop:padding.md,
      fontFamily: fonts.themeFont
	  },
	  upperContainer:{
		  height:'30%',
		  backgroundColor:colors.themeColor
    },
    upperContainerSideMenu:{
		  height:'30%'
    },
    lowerContainerSideMenu:{
      height:'70%',
      alignItems:align.center
		  
    }, 
    sideMenuAlign:{
      alignItems:align.center
    },  
	  lowerContainer:{
      height:'70%',
      alignItems:align.center
		  
    },
    signUpText:{
      textAlign:align.center,
      fontSize:padding.md,
      color:colors.themeColor,
      fontFamily: fonts.themeFontBold
    },
    inputIcon:{
      width:20,
      height:20,
      marginTop:10,
      bottom: (Platform.OS === 'ios') ? 5 : 0
    },
    centerItems:{
      alignItems:align.center
    },
    loginInputsSpace:{
    marginTop:50
    },
    signUpInputsSpace:{
      marginTop:40
      },
    forgotInputsSpace:{
      marginTop:35
      },
      signInInputsSpace:{
        marginTop:85
      },
    forgotText:{
      color:colors.themecolor,
      fontFamily:fonts.themeFontBold,
      marginTop:30,
      fontSize:15,
      textDecorationLine: 'underline',
      textAlign:align.center
    },
    textInputWidth:{
      width:'100%',
      marginLeft: (Platform.OS === 'ios') ? 5 : 0
    },
    commonButtonBackground:{
      marginTop: (Platform.OS === 'ios') ? 65 : 40,
		  backgroundColor:colors.themeColor,
      width:dimensions.fullWidth - 140 ,
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    buttonBackgroundLogin:{
      marginTop: (Platform.OS === 'ios') ? 75 : 57,
		  backgroundColor:colors.themeColor,
      width:dimensions.fullWidth - 140 ,
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    mobilebuttonBackground:{
      marginTop: (Platform.OS === 'ios') ? 75 : 72,
		  backgroundColor:colors.themeColor,
      width:dimensions.fullWidth - 140 ,
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    rowAlignSideMenu:{
      flexDirection:'row'
    },
    name:{
      width:'35%'
     
    },
    blank:{
      width:'45%',
      textAlign :'center'
    },
    arrowView:{
      
    },
    welcomeLoginText :{
      color:colors.white,
      paddingTop:10
    },
    input :{
      height: 50,
      backgroundColor: '#EBEBF1',
      color: 'black',
      width: 50,
      marginLeft: 5,
      marginRight: 5,
      marginTop:10
      
      },
      toastCenter:{
        flex:1,
        alignItems:align.center
      
      },
      profileContainer:{
        alignItems:align.center
      },
      containerBorder:{
        borderBottomWidth: 0.5,
        marginTop:20,
        borderBottomColor:colors.themeColor
      },
      textItemsContainer:{
        flexDirection :'row',
        width:'90%',
        bottom:5
      },
      nameContainer :{
        width:'30%'
      },
      boxContainer :{
        width:'60%'
      },
      rowAlignSideMenu2:{
        flexDirection:'row',
        paddingTop:padding.md
      },
      sideAlign:{
        flexDirection:'row',
        paddingTop :10
      },
      line :{
         borderBottomColor: colors.themeColor,
          borderBottomWidth: 1,
          marginTop:10
      },
      tabsPosition :{
       backgroundColor:'red'
      },
      listCard:{
        width:'90%',
        backgroundColor:'#F0F0F0'
      },
      listCardFreelancer:{
        width:'100%',
        backgroundColor:colors.white
      },
      spaceFromTop:{
        alignItems:'center',
         marginBottom:10
      },
      textColor:{
        color:'green',
        paddingTop:10,
        fontSize:20,
         flexWrap: 'wrap'
      },
      textInRow:{
        flexDirection:'row',
        flex : 1
      },
      textWrap:{
        margin:10,
        fontSize:18,
       color:'#FF8000',
       textTransform: 'uppercase'
      },
      textWrap2:{
        marginTop :10,
        fontSize:15,
       color:'#C4C4C4',
       
       textTransform: 'uppercase'
      },
      priceText:{
        marginLeft:10,
        marginTop:5,
        fontSize:16,
       color:'#B3B7BB'
      },
     date:{
        marginLeft:10,
        marginTop:5,
        fontSize:16,
       color:'#B3B7BB',
       fontWeight: 'bold'
      },
      email:{
        marginLeft:10,
        marginTop:5,
        fontSize:14,
       color:'#FF8D47',
       fontWeight: 'bold'
      },
      Listcontainer: {
        flex: 1
      },
      contPadding :{
        padding:5
      },
      skillWidth:{
        width:"50%"
      },
      budgetWidth:{
        width:"30%"
      },
      leftSpace:{
        width:"20%",
      },
      skillWidth2:{
        width:"45%"
      },
      budgetWidth2:{
        width:"10%"
      },
      leftSpace2:{
        width:"45%"
      },
      priceText:{
        marginLeft:10,
        marginTop:5,
        fontSize:16,
       color:'#95a5a6',
       fontWeight: 'bold'
      },
      paddingAbove:{
        marginTop:10
      },
      textInRow2:{
        flexDirection:'row',
        marginLeft:10
      },
      skillText:{
        fontSize:16,
        color:colors.themecolor,
      },
      centerText :{
        textAlign :'center',
        fontSize:20
      },
      contentMargin:{
        margin: 10
      },
      detailsContainer :{
        margin:10,
        backgroundColor:'#F0F0F0',
        width:'95%',
        height:300
      },
      jobTitle :{
        fontSize:20, 
        color:'black'
      },
      jobDescription :{
        fontSize:25, 
        color:'black'
      },
      textInRowJob:{
        flexDirection:'row',
        marginTop :10
      },
      space:{
        paddingTop:15
      },
      space2:{
       marginTop:10
      },
      Tab1 :{
        width:'40%'
      },
      Tab2 :{
        width:'30%'
      },
      Tab3 :{
        width:'40%'
      },
      empty:{
        width:'5%'
      },
      tabs:{
        flexDirection:'row',
         color :'white',
        backgroundColor :colors.themeColor,
        height:45
      },
      textWhite:{
        color :'white',
        textAlign :'center',
        paddingTop:15,
        width:dimensions.fullWidth/2,
      },
      textFeed:{
        color :'white',
        textAlign :'center',
        paddingTop:15,
        left: -10,
        width:dimensions.fullWidth/2


      },
      topInput:{
        width:'80%',
        color :'white',
        fontSize :15
      },
      searchContainer:{
        marginLeft:20,
        backgroundColor:'#F0F0F0',
        color :'#F0F0F0',
        height :40,
        width:'90%',
        
      },
      topSearchbar:{
        flexDirection:'row',
        paddingTop :8,
        marginLeft : 10 
      },
      listCardWidth : {
        width: '100%',
        marginTop: -30
      },
     categoryCard : {
        width: '100%'
      },
      freelancerlistCardWidth : {
        width: '90%'
        
      },
      listCenter:{
        alignItems:align.center,
        marginTop :20
      },
      commontoolbar:{
        backgroundColor:colors.themeColor,
        paddingTop:10,
        flexDirection:'row',
        height:50    //Step 1
    },
    modalToolbar:{
      paddingTop:10,
      flexDirection:'row',
      height:50    //Step 1
  },
    commontoolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center',
        paddingTop:5,
        paddingLeft :10
        
    },
    commontoolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1 ,
       //Step 3
    },
    modalTitle:{
      textAlign:'center',
      fontWeight:'bold',
      flex:1 ,
     //Step 3
  },
    commonBackIcon:{
      width:25,
      height :20
    },
    textFontSideMenu :{
      fontSize:20
    },
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#F5F5F5'
      },
      
      FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 70,
      height: 70
      },
      TouchableOpacityStyle:{
      position: 'absolute',
      width: 70,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      },
      
      postprojectinput: {
      marginBottom:10,
      marginLeft: 10,
      height: 40,
      borderColor: '#AEA9A8',
      borderWidth: 1,
      padding:5,
      width:'95%'
      },
       dropDown: {
        marginTop:-40,
        marginLeft: 10,
        height: 40,
        padding:5,
        width:'95%'
        },
        dropDown2: {
          marginLeft: 10,
          height: 40,
          padding:5,
          width:'95%',
          borderColor: '#AEA9A8',
          borderWidth: 1
          },
      
      bottomView:{
        margin: 10,
      width: '95%', 
      height: 50, 
      backgroundColor: '#FF8D47', 
      justifyContent: 'center', 
      alignItems: 'center',
      position:'absolute',
      bottom :0
      },
      textStyle:{
      color: '#fff',
      fontSize:22,
      alignItems:'center'
      },
        MainContainer:
       {
        flex: 1,
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
       },
    bottomView:{
      width: '95%', 
      height: 50, 
      backgroundColor:'#FF8D47', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 160
    },
    bottomViewAbout:{
      width: '95%', 
      height: 50, 
      backgroundColor:'#FF8D47', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 40
    },
    textStyle:{
      color: '#fff',
      fontSize:22
    },
    closeButtton:{
      color:'white',
      fontSize:20,
      marginTop :-3
    },
  noTextContainer :{
    marginTop:30,
    alignItems:align.center
  },
  defaultTextSize:{
    fontSize:20,
    alignSelf:"center",
    paddingTop: 10

  },
  bottomViewrequest:{
  height: 50, 
  backgroundColor: '#FF9800', 
  position:'absolute',
  bottom :0
  },
  MainContainerRequest:
  {
   flex: 1,
   alignItems:'center'
  },
  rowAlignSideMenuRequest :{
    flexDirection:'row'
  },
  emptySpaceRequest :{
    width:'10%'
  },
  buttonWidthRequest :{
    width:'35%'
    
  },
  buttonColor:{
    backgroundColor: colors.theme_orange
  },
  requestButton :{
    width:0,
    color :'white'
  },
  footer:{
    position:'absolute',
    bottom:10
  },
  dateTextColor :{
    color : '#AEA9A8',
    padding :4
  },
  categoryText:{
    color : '#AEA9A8',
    textAlign: 'left',
    borderColor: '#AEA9A8',
    borderWidth: 1,
    width:'95%',
    height:40
  },
  MainContainerProfile:
  {
   flex: 1,
   paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },
  doneCenter:
  {
   flex: 1,
   paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
   alignItems:'center'
  },
  postprojectinputprofile: {
    height: 40,
    borderColor: '#AEA9A8',
    borderWidth: 1,
    padding:5,
    width:'95%',
    marginTop :5 
    },
    categoryTextProfile:{
      color : '#AEA9A8',
      textAlign: 'left',
      borderColor: '#AEA9A8',
      borderWidth: 1,
      width:'95%',
      height:40,
      marginTop :8
    },
    dateTextColorProfile :{
      padding :8
    },
    toastCenter :{
      alignItems : 'center'
    },
    docWidth:{
      paddingTop: ( Platform.OS === 'ios' ) ? 0 : 10,
      width:'50%'
    },
    CV :{
      padding :10,
    },
    proof : {
      padding :10,
    },
    uploadButton :{
     
    },
     profileContainerView :{
      flex:1
      },
      CVtext :{
        width:'100%',
        flexDirection:'row',
        flex: 1
      },

      // sideMenu
      sideMenucontainer: {
        flex: 1,
        height:'100%',
        backgroundColor : colors.themeColor
      },
      textFontSideMenuNew :{
        fontSize:25,
        paddingTop :20,
        textTransform: 'capitalize'
      },

      //client projects screen
      searchPadding :{
        paddingTop :20
      },
      firstText:{
        width :"70%"
      },
      secondText:{
        width :"30%"
      },
      emptyText :{
        width :"0%"
      },
      firstText2:{
        width :"30%"
      },
      secondText2:{
        width :"10%"
      },
      emptyText2 :{
        width :"60%"
      },
      backIcon:{
        width:25,
        height:25,
        marginTop:2,
       marginLeft:25},

       MainContainerProject :{
        height:'100%',
        flex:1
        },
       projectInput:{
         margin:10,
         color : '#FF8000'
       },
       projectInputJob:{
        margin:10,
        paddingTop :40,
        color : '#FF8000'
      },
       bottomViewRequest:{
        margin: 10,
      width: '95%', 
      height: 50, 
      backgroundColor: '#FF8000', 
      justifyContent: 'center', 
      alignItems: 'center',
      },
      picker:{
        width:'95%',
        height:40
      },
      textArea: {
        marginBottom:10,
        marginLeft: 10,
        height: 100,
        borderColor: '#AEA9A8',
        borderWidth: 1,
        padding:5,
        width:'95%'
        },
        // jobDetails
        MainContainerDetails: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor : '#ffffff'
          },
          textWrapDetails:{
            margin:10,
            fontSize:18,
           color:'#FF8000',
           textTransform: 'capitalize'
          },
          colon:{
            marginTop :10
          },
          textWrap2Details:{
            margin :10,
            fontSize:15,
           color:'#a8a8a8',
           textTransform: 'capitalize'
          },
          textWrap2Details2:{
            margin :10,
            fontSize:15,
           color:'#a8a8a8',
          },
          //Freelancer Page
          textInRowlist:{
            flexDirection:'row',
            margin :10
          },
          imageFreelancerContainer:{
            width:'20%'
          },
          textFreelancerContainer:{
            width:'50%'
          },
          emptyFreelancerContainer:{
            width:'20%'
          },
          iconFreelancerContainer:{
            width:'10%'
          },
          freelancerProfileText:{
            color :'#8C959D'
          },
          nextIcon:{
            width:20,
            height:20,
           marginRight:25,
          marginTop:20},
          /////////welcome 
  welcomeContainer: {
    flex: 1
  },
  welcomeHeadline: {
    flex: 1,
    alignItems: align.center,
    paddingTop: 200
  },

  headlineText: {
    fontSize: 50,
    color: colors.theme_orange,
    fontFamily: "blackjack"
  },
  buttonBackground: {
    marginTop: 200,
    backgroundColor: colors.theme_orange,
    width: "50%",
    height: 40,
    alignItems: align.center,
    justifyContent: align.center
  },
  buttonBackgroundrequest: {
    marginTop: 200,
    backgroundColor: colors.theme_orange,
    height: 40,
    alignItems: align.center,
    justifyContent: align.center
  },
  buttonText: {
    textAlign: align.center,
    fontSize: 15,
    color: colors.white,
    fontFamily: fonts.themeFont
  },


  accountText: {
    textAlign: align.center,
    fontSize: 15,
    color: colors.theme_statusbar,
    paddingTop: padding.sm,
    fontFamily: fonts.themeFont
  },

  welcomeLoginText: {
    color: colors.theme_orange,
    fontWeight: "bold",
    paddingTop: 10
  },

///////////////////welcome end

//mobilesignin start
upperContainer: {
  height: "50%",
  backgroundColor: colors.theme_light_dark
  },
  
  lowerContainerSideMenu: {
  height: "50%",
  alignItems: align.center
  },
  
  cardContainerSignIn: {
  width: "85%",
  padding: padding.md,
  shadowColor: colors.theme_light_dark,
  shadowOpacity: 1.0,
  backgroundColor: colors.theme_light_white,
  height: 220
  },
  centerAlignSignUp: {
  alignItems: align.center,
  marginTop: 0,
  position: "absolute",
  width: "100%",
  top: -80
  },
  mobilesignsignUpText: {
  textAlign: align.center,
  fontSize: 20,
  fontWeight: "300",
  color: colors.theme_orange,
  fontFamily: fonts.themeFontBold,
  textDecorationLine: "underline"
  },
  
  mobilesigninButton: {
  marginTop: Platform.OS === "ios" ? 20 : 20,
  backgroundColor: colors.theme_orange,
  width: dimensions.fullWidth - 140,
  height: 40,
  alignItems: align.center,
  justifyContent: align.center
  },
  
  rowAlign: {
  flexDirection: "row",
  borderColor: colors.theme_statusbar,
  borderWidth: 0.5,
  marginLeft: 20,
  height: 40,
  width: dimensions.fullWidth - 140,
  marginTop: Platform.OS === "ios" ? 30 : 30
  },
  
  mobilesignloginContainerSignIn: {
  alignItems: align.center
  },
  inputIcon: {
  width: 15,
  height: 20,
  marginTop: 15,
  marginLeft: 5,
  bottom: Platform.OS === "ios" ? 5 : 5
  },
  mobilesigntextInputWidth: {
  width: "90%",
  height: 40,
  padding: 5
  },

//mobilesignin end
////////selectaccount styles

hireButtonBackground: {
  marginTop: 110,
  backgroundColor: colors.theme_orange,
  width: "65%",
  height: 40,
  alignItems: align.center,
  justifyContent: align.center
  },
  
  lookingButtonBackground: {
  marginTop: 35,
  backgroundColor: colors.theme_orange,
  width: "65%",
  height: 40,
  alignItems: align.center,
  justifyContent: align.center
  },
  
  ////////selectaccount end
  
  ////////////otp
  otpButton: {
  marginTop: 50,
  backgroundColor: colors.theme_orange,
  width: "65%",
  height: 40,
  alignItems: align.center,
  justifyContent: align.center
  },
  
  changenumber_otp: {
  marginTop: 35,
  backgroundColor: colors.theme_orange,
  width: "65%",
  height: 40,
  alignItems: align.center,
  justifyContent: align.center
  },
  
  ////end otp,
  ProfileName:{
    color :"#ffffff"
  },
 toast:
  {
   alignItems: 'center'
  },
  //profile
  profileTopView:{
    flexDirection :'row'
  },
  imageWidthContainer:{
    width:'30%'
  },
  textContainer:{
    width:'40%'
  },
  ratingContainer:{
    paddingTop:10,
    width:'30%'
  },
  emptyprofileContainer:{
    width:'0%'
  },
 pic:{
    width:90,
   height:90,
   borderRadius:45,
   margin: 10
  },
  nameProfile :{
    padding :8,
    color:colors.theme_orange
  },
  starIcon: {
    paddingTop:5,
    margin:2,
    width:15,
    height:15
},
startextColor:{
  color:colors.themeColor,
  marginLeft:2
},
summary:{
  color:colors.theme_orange,
  fontSize:20
},
//Update Profile
camera:{
  position:'absolute',
  left:230,
  top:100
},
cameraIcon:{
  width:35,
  height:35,
 marginRight:25},
 about: {
  height: 80,
  borderColor: '#AEA9A8',
  borderWidth: 1,
  padding:5,
  width:'95%',
  marginTop :5 
  },
  bottomViewProfile:{
    width: '95%', 
    height: 50, 
    backgroundColor:'#FF8D47', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 10
  },
  attachBackground:{
    backgroundColor:colors.theme_orange,
    width:40,
    height:45,
  marginTop:3
  },
  inputWidth:{
    paddingTop: ( Platform.OS === 'ios' ) ? 0 : 10,
    width:'85%'
  },
  attachinputWidth:{
    paddingTop: ( Platform.OS === 'ios' ) ? 0 : 10,
    width:'15%'
  },
 docBorder:{
    color : '#AEA9A8',
    textAlign: 'left',
    borderColor: '#AEA9A8',
    borderWidth: 1,
    height:40,
    marginTop :8
  },
  attachiconWidth:{
    width:30,
    height:30,
    margin:7,
    paddingTop:5
  },
  themetextColor:{
    color:colors.theme_orange
  },
  ////create milestone

createmilestoneinput: {
  height: 40,
  borderColor: "#AEA9A8",
  borderWidth: 1,
  padding: 5,
  width: "95%",
  marginTop: 5
  },
  
  
  
  createmilestoneinputdiscrpation: {
  marginBottom: 10,
  marginLeft: 10,
  height: 100,
  textAlign: 'left',
  borderColor: "#AEA9A8",
  borderWidth: 1,
  padding: 5,
  color:colors.black,
  width: "95%"
  },
  Createmilestoneinput: {
  marginBottom: 10,
  marginLeft: 10,
  marginTop: 15,
  height: 40,
  borderColor: "#AEA9A8",
  borderWidth: 1,
  padding: 5,
  width: "95%"
  },
  toastMiddle :{
    alignItems:'center',
     justifyContent: 'center',
      flex :1
  },
  toastMiddle2 :{
    alignItems:'center',
     justifyContent: 'center',
  },
  
  ///end createmilestone
 otpInput:{
    width:'80%',
    fontSize :15
  },
  searchfieldInput:{
    width:'80%',
    fontSize :20,
   marginTop: ( Platform.OS === 'ios' ) ? 0 : -15
  },
  defaultTextFreelancer:{
    alignItems:align.center,
    paddingTop :15
  },
  bottomViewDetails:{
    width: '95%', 
    height: 50, 
    backgroundColor:'#FF8D47', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 20
  },

  feedbacknputdiscrpation: {
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    height: 100,
    textAlign: 'left',
    borderColor: "#AEA9A8",
    borderWidth: 1,
    padding: 5,
    color:colors.black,
    width: "95%"
    },
    //rating
    cancelButton: {
      marginTop: 20,
      backgroundColor: colors.theme_orange,
      height: 40,
      alignItems: align.center,
      justifyContent: align.center
      },
      buttonWidthRating :{
      width:'42%'
      
      },
      emptySpaceRating :{
      width:'5%'
      },
      
      iconRating:{
      width:20,
      height:20,
      marginTop:-10
      },
      review: {
        height: 80,
        borderColor: '#AEA9A8',
        borderWidth: 1,
        padding:5,
        width:'95%',
        marginTop :20
        },
        myStarStyle: {
          color: colors.theme_orange,
          backgroundColor: 'transparent',
          textShadowColor: 'black',
          textShadowOffset: {width: 1, height: 1},
          textShadowRadius: 2,
          fontSize:30
        },
        myEmptyStarStyle: {
          color: 'lightgrey',
        },
        //Messages
        sender:{
          alignItems: 'flex-end',
     
          width:'100%'
        },
        receiver :{
            alignItems: 'flex-start',
     
             width:'100%'
        },
        senderText:{
          padding :20,
         marginBottom:10,
     
           width:100,
           color:'white'
         //   backgroundColor:"brown"
        },
        receiverText:{
          padding :20,
         marginBottom:10,
     
           width:100,
             color:'white'
           // backgroundColor:"orange"
        },
        chatInput: {
          height: 50,
          padding: 4,
          marginRight: 5,
          fontSize: 15,
          width:'85%'
        },
        bottomViewHire:{
          width: '95%', 
          height: 50, 
          backgroundColor:'#FF8D47', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'absolute'
        },
        bottomViewChat:{
          width: '95%', 
          height: 50, 
          backgroundColor:'#F0F0F0',
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'absolute',
          marginTop :-40
        },
        textStyleChat:{
          color: colors.theme_orange,
          fontSize:22,
          alignItems:'center'
          },
          //payment
          textWrapPayment:{
            margin:10,
            fontSize:18,
           color:'red',
           textTransform: 'capitalize'
          },
          textWrap2Payment:{
            margin :10,
            fontSize:15,
            color:'red',
           textTransform: 'capitalize'
          },
          detailsPaymentContainer :{
            margin:10,
            backgroundColor:colors.theme_light_white,
            width:'95%',
            height:300
          }
  
      
          


    
  
  
  

  
})