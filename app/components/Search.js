import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native"; //on importe les composants --> obligatoire
import game from "../helpers/gamesData";
import GamesItem from "./GamesItem";
import gameToId from "../helpers/gameToId";
const Search = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    // Effectuez une demande à l'API pour récupérer les tutoriels
    fetch("http://localhost:8090/api/tutorials")
      .then((response) => response.json())
      .then((data) => {
        setTutorials(data); // Mettez à jour l'état avec les données des tutoriels
        setLoading(false); // Marquez le chargement comme terminé
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tutoriels :", error);
        setLoading(false); // Marquez le chargement comme terminé en cas d'erreur
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Titre}>Tutoriels</Text>
      <TextInput
        onSubmitEditing={() => this.GamesItem}
        placeholder="Nom du jeu"
        style={styles.textinput}
      />
      <Pressable
        style={styles.btn_recherche}
        title="Rechercher"
        onPress={() => {}}
      >
        <Text style={styles.appButtonText}>Rechercher</Text>
      </Pressable>

      <FlatList
        data={tutorials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Naviguez vers la page de détail du tutoriel avec l'identifiant du tutoriel en tant que paramètre
              navigation.navigate("TutorialDetailPage", { tutorialId: item.id });
            }}
          >
            <View style={styles.tutorialItem}>
              <Text style={styles.gameTitle}>
                {gameToId[item.jeuxId - 1]} : {item.title}
              </Text>
              <View
                style={{
                  borderBottomColor: "#E8E8E8",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginTop: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //penser au StyleSheet.create() pour optimiser la vitesse de rendu
  main_container: {
    marginTop: 50,
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },

  Titre: {
    fontSize: 25,
    textAlign: "center",
    margin: 15,
  },

  btn_recherche: {
    elevation: 8,
    backgroundColor: "#0EB9C7",
    borderRadius: 50,
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tutorialItem: {
    marginBottom: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tutorialItem: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 5,
  },
  tutorialTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tutorialDescription: {
    fontSize: 14,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameTitle: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
});

export default Search; //On exporte le composant pour l'utiliser ailleur
