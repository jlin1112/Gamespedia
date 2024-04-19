import { SafeAreaView, Text, StyleSheet, Pressable } from "react-native"
import axios from "axios";

export default function About () {

  const handlePress = async() => {
    try{
      const response = await axios.get('http://192.168.1.79:3000/')
      console.log(response.data)
    } catch(error){
      console.log(error.message)
    }
   
  }


    return (
      //   <LinearGradient
      //   colors={["#232526", "#414345"]}
      //   locations={[0.7, 1]}
      //   style={styles.background}
      // >
        <SafeAreaView style={{backgroundColor:'#232526', flex:1}}>
        <Text>About</Text>
        <Pressable onPress={handlePress}><Text>API test</Text></Pressable>
        </SafeAreaView>
        
        // </LinearGradient>
    )
}


const styles = StyleSheet.create({
  
    background: {
      flex: 1,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
    },
  });
  