import { View, Text,StyleSheet,Image , TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native'; 

export default function HomeScreen() {
  const navigation = useNavigation(); 

  const handleStart = () => {
    navigation.navigate("scan"); 
  };
  return (
    <View style={styles.container}>
      <Text style={{padding:20,fontSize:28,fontFamily:"outfit-Bold",textAlign:"center",marginTop:10}}>Welcome to Smart Scanner</Text>
      <View style={styles.subContainer}>
<Image 
style={{borderRadius:4}}
source={require("../../assets/Images/back.png")}/>
      </View>
      <View >
      <TouchableOpacity
      style={styles.btnContainer}
      onPress={()=>handleStart()}
      >
          <Text style={{ textAlign: 'center', fontSize: 20, color:Colors.WHITE, fontFamily:'outfit-Medium' }}>Start Scanning</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    margin:0,
    backgroundColor:Colors.WHITE,
  
  },
  subContainer:{
marginTop:30,
  },

  btnContainer:{
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      marginTop: 40,
      borderRadius: 20,
      margin:30
  }
})
