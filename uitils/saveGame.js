import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveGame(data) {
  try {
    const existingGameDataJSON = await AsyncStorage.getItem("library");
    const existingGameData = existingGameDataString
      ? JSON.parse(existingGameDataJSON)
      : [];

    // Append new game data object to the existing array
    const newGameData = {
      name: data.name,
      id: data.id,
      imageUrl: data.url,
    };

    const alreadyExist = existingGameData.some(
      (game) => game.id === newGameData.id
    );

    if (!alreadyExist) {
      existingGameData.push(newGameData);

      const updatedGameDataJSON = JSON.stringify(existingGameData);

      await AsyncStorage.setItem("library", updatedGameDataJSON);
    } else {
      console.log("Game data already exists. Skipping duplicate entry.");
    }
  } catch (error) {
    console.error(error);
  }
}
