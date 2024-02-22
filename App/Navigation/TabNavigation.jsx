import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ScannerScreen from '../Screens/ScannerScreen';
import ScannerHistory from '../Screens/ScannerHistory';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
<Tab.Navigator
screenOptions={{
    headerShown: false,
    tabBarActiveTintColor:Colors.PRIMARY}}
>
      <Tab.Screen name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),

        }}
      />
      <Tab.Screen name="scan" component={ScannerScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>scan</Text>
            ),
            tabBarIcon: ({ color, size }) => (
                <FontAwesome name="qrcode" size={24} color={color} />
            ),
  
          }}
      />
      <Tab.Screen name="history" component={ScannerHistory}
           options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>history</Text>
            ),
            tabBarIcon: ({ color, size }) => (
                <FontAwesome name="history" size={24} color={color} />
            ),
  
          }}
      />
    </Tab.Navigator>
    </GestureHandlerRootView>
 
  );
}