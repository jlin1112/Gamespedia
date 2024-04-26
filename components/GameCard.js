import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
  } from "react-native";

export default function GameCard ({gameData}) {

   return (
    <ScrollView
    style={styles.gameCard}
    contentContainerStyle={{ flexDirection: "row", alignItems: "center",gap:6 }}
    horizontal={true}

    showsHorizontalScrollIndicator={false}
  >
    <Image
      style={styles.gameCover}
      source={{
        uri: 'https:' + gameData.cover.url,
      }}
    ></Image>
    <View style={styles.gameInfo}>
      <Text style={styles.gameText}>{gameData.name}</Text>
      <Text style={styles.gameSubText}>
        {gameData.involved_companies? gameData.involved_companies[0].company.name : 'no company'}
      </Text>
      <Text style={styles.gameSubText}>
        {  new Date(gameData.first_release_date * 1000).toLocaleDateString("default")}
      </Text>
    </View>
  </ScrollView> 
   )
 
       
       
}

const styles = StyleSheet.create({
    text: {
      color: "#ffffff",
      fontSize: 20,
      fontWeight: "700",
    },
    container: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 16,
      marginBottom: 16,
    },
    gameCard: {
      height: 100,
      borderRadius: 5,
      flexDirection: "row",
      marginBottom: 16,
      backgroundColor: "rgba(53, 63, 84, .2)",
      backdropFilter: "blur(10px)",
      overflow: "scroll",
 
     
    },
    gameCover: {
      resizeMode: "cover",
      width: 95,
      height: 95,
      borderRadius: 5,
    },
    gameInfo:{
      gap:6,
      
    },
    gameText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
      paddingRight:16,
    
    },
    gameSubText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "500",
    },
  });
  