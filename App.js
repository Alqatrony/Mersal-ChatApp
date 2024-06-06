import { useEffect } from "react";
import { Alert, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from "@react-native-community/netinfo";
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import components
import Start from './components/Start';
import Chat from './components/Chat';

// Ignore specific warnings
LogBox.ignoreLogs(['Setting a timer', 'Animated: `useNativeDriver`']);

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyCbz1dWk6fIMq3m9-cDXbYh16LDYBRzalo",
    authDomain: "mersal-chatapp.firebaseapp.com",
    projectId: "mersal-chatapp",
    storageBucket: "mersal-chatapp.appspot.com",
    messagingSenderId: "934927126259",
    appId: "1:934927126259:web:6faa98313f41e84472b186"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("No Internet Connection", "Please connect to the internet to continue.");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => (
            <Chat 
              db={db} 
              storage={storage} 
              isConnected={connectionStatus.isConnected} 
              {...props} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;