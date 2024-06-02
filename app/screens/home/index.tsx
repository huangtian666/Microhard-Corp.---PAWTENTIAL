import { Link } from 'expo-router';
import { View, Text, StyleSheet,Button, TouchableOpacity,Image} from 'react-native';
import naruto from '../../../assets/images/naruto.png';


export default function HomeScreen() {

  const handlePress = () => {
    console.log("pressed") //print messages to the console
  } // arrow function in js

  const pressImage = () => {
    console.log("meow")
  }

  return (
    <View style={styles.container}>
      <Text style ={styles.text}>Welcome to PAWTENTIAL!</Text> 
      <Button title = "Timer" onPress={handlePress} /> 
      <Link href="/details" style ={styles.link}>View details</Link>
      <TouchableOpacity onPress={pressImage}>
        <Image 
            source ={naruto}
            style={styles.image}/>
      </TouchableOpacity>
    </View>
  );//{} needs to be used when using javascript in this code style  
  // style ={styles.link} changes the style of the link
}

const styles = StyleSheet.create({
  container: {
    flex: 1,//make everything(words, images) occupy the entire page
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: "row"
  },// flexbox 
  text: {
    color: "green",
    fontSize: 20,
  },  
  link: {
    color: 'orange',
    fontSize: 18,
  },
  image: {
    width: 80,
    height: 250,
  },
  touchable: {
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    position: 'absolute',
    top: 50,
    left: 50,
  },
});
