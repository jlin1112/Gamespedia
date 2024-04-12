import { StyleSheet, View } from "react-native";

// const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function ScrollIndicator({ index, length }) {
  const arr = [];
  
  for(let i=0;i<length;i++){
        arr.push(i)
  }
 

  return (
    <View style={styles.container}>
      {arr.map((a, i) => {
        return (
          <View
            style={
              index === i
                ? [styles.indicator, { backgroundColor: "#ffffff" }]
                : styles.indicator
            }
            key={i}
          ></View>
        );
      })}

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  indicator: {
    width: 10,
    height: 5,
    backgroundColor: "rgba(53, 63, 84, .3)",
    borderRadius: 50,
  },
});
