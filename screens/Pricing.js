import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator,Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const stores = [
  { id: "1", name: "Steam" },
  { id: "25", name: "Epic" },
  { id: "7", name: "GOG" },
  { id: "3", name: "Green Man Gaming" },
  { id: "8", name: "Origin" },
  { id: "13", name: "Uplay" },
];

export default function Pricing() {
  const route = useRoute();
  const { gameID } = route.params;

  const [priceList, setPriceList] = useState([]);
  const [lowestPrice, setLowestPrice] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getEdition = async () => {
      try {
        const pricingData = await axios.post(
          process.env.EXPO_PUBLIC_API_URL,
          {
            gameID,
          }
        );

        pricingData.data.cheapestPriceEver &&
          setLowestPrice(pricingData.data.cheapestPriceEver);

        setPriceList(pricingData.data.displayList);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    getEdition();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#232526",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#232526",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "700" }}>
          An error occurred while fetching data. Please try again later.
        </Text>
      </View>
    );
  }

  if (priceList) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {lowestPrice && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                marginBottom: 12,
              }}
            >
              <Text style={styles.title}>Historical Lowest</Text>
              <Text style={styles.title}>${lowestPrice}</Text>
            </View>
          )}
        </View>

        {priceList.length > 0 ? (
          priceList.map((price, index) => {
            if (stores.some((store) => store.id === price.storeID)) {
              const { name } = stores.find(
                (store) => store.id === price.storeID
              );
              const isDiscounted = Math.ceil(price.savings) > 0;

              return (
                <View style={styles.priceTag} key={index}>
                  <View style={styles.storeName}>
                    <Text style={styles.subTitle}>{name}</Text>
                  </View>
                  <View style={styles.pricing}>
                    {isDiscounted ? (
                      <>
                        <View style={styles.discount}>
                          <Text style={styles.discountText}>
                            -{Math.ceil(price.savings)}%
                          </Text>
                        </View>
                        <View style={styles.price}>
                          <Text style={styles.retailPrice}>
                            ${price.retailPrice}
                          </Text>
                          <Text style={styles.discountedPrice}>
                            ${Math.ceil(price.price * 100) / 100}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <Text
                        style={[
                          styles.text,
                          { paddingVertical: 4, paddingHorizontal: 8 },
                        ]}
                      >
                        ${Math.ceil(price.price * 100) / 100}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }
          })
        ) : (
          <View>
            <Text style={[styles.title, { marginBottom: 6 }]}>
              Detail Pricing Info Not Available.
            </Text>
            <Text style={styles.text}>
              Currently the App only offers detail pricing info for games that
              are available on Steams, Epic, GOG, Green Man Gaming, Origin, and
              Uplay.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232526",
    paddingHorizontal: 8,
    paddingBottom: 40,
    gap: 16,
  },
  title: {
    color: "#ffffff",
    fontSize:  Dimensions.get('window').height < 800? 16 :  20,
    fontWeight: "700",
  },
  priceTag: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  storeName: {
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    color: "#ffffff",
    fontSize: Dimensions.get('window').height < 800? 12 : 20,
    fontWeight: "700",
  },
  text: {
    color: "#ffffff",
    fontSize: Dimensions.get('window').height < 800? 10 : 16,
    fontWeight: "500",
  },
  pricing: {
    flexDirection: "row",
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  discount: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  discountText: {
    color: "#232526",
    fontSize:Dimensions.get('window').height < 800? 12 : 20,
    fontWeight: "500",
  },
  price: {
    alignItems: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  retailPrice: {
    color: "#ffffff",
    fontSize:Dimensions.get('window').height < 800? 10 : 16,
    fontWeight: "500",
    textDecorationLine: "line-through",
  },
  discountedPrice: {
    color: "#ffffff",
    fontSize: Dimensions.get('window').height < 800? 12 : 20,
    fontWeight: "500",
  },
});
