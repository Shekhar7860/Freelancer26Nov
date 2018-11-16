
import { TabNavigator,StackNavigator} from 'react-navigation';
import {Platform} from 'react-native';
import {colors, dimensions} from '../styles/base.js';
import FEED from './Feed';
import CATEGORY from './Category';
import FAVOURITE from './Favourite';
import Home from './Home';
import Details from './Details';

const stackNav = StackNavigator({

  Feed: {
    screen: FEED,
    navigationOptions: ({navigation}) => ({
      title: "Invoices",
      header: null,
      gesturesEnabled: false,
    })
  },
  Detail: {
    screen: Details,
    navigationOptions: {
      
    }
  },

},{ headerMode: 'none' }
);

stackNav.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Detail' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}
export default  Tabs = TabNavigator(
  {
    FEED : stackNav,
    FAVOURITE: FAVOURITE,
  },
  {
    headerMode: 'none',        // I don't want a NavBar at top // So your Android tabs go bottom
    tabBarOptions: {
      activeTintColor: colors.white,  // Color of tab when pressed
      inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
      // Shows an icon for both iOS and Android
      showLabel: true, //No label for Android
      labelStyle: {
        fontSize: 13,
        bottom: 10
      },
      style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        width:'100%',
        bottom: (Platform.OS === 'ios') ? 550 : 516,
        height: 100,
        position:'absolute',
        backgroundColor: colors.themeColor,
        borderTopColor: colors.themeColor,
        borderBottomColor: colors.themeColor,
        borderTopWidth: 1, // Makes Android tab bar white instead of standard blue
        height: (Platform.OS === 'ios') ? 48 : 50 // I didn't use this in my app, so the numbers may be off. 
      },
      indicatorStyle: {
        backgroundColor: 'black',
    }
    },
});