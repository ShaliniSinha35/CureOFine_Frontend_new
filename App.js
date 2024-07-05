
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from "react-native";
// import StackNavigator from "./navigation/stacknavigator";
import { ModalPortal } from "react-native-modals";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./navigation/AppNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Dimensions } from "react-native";

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '././redux/store';

export default function App() {
  return (
  
    <NativeBaseProvider>
        <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigator></AppNavigator>
        <ModalPortal></ModalPortal>
        </PersistGate>
        </Provider>
      {/* <StackNavigator/> */}
     </NativeBaseProvider>
 
     
   

 


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height:Dimensions.get('screen').height
  }
});

