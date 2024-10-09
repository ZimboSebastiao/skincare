import React from 'react';
import { View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FAB} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { Icon, Button } from 'react-native-elements'

// Exemplo de screens
function Screen1() { return <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} />; }
function Screen2() { return <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} />; }

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff'

  }}>
      <View style={{ position: 'absolute', padding: 5, alignSelf: 'center', backgroundColor: '#fff', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 2 }}>
          <Button
              icon={{
                  name: 'plus',
                  type: 'feather',
                  color: '#fff',
                  style: { marginRight: 0 }
              }}
              onPress={() => this.doSomething()}
              buttonStyle={{ backgroundColor: '#000', width: 60, height: 60, borderRadius: 30 }}
              containerViewStyle={{ alignSelf: 'center' }}
          />
      </View>
      <View style={{ position: 'absolute', backgroundColor: '#3F51B5', bottom: 0, zIndex: 1, width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
          <Icon
              name='list'
              type='feather'
              color='#fff'
              onPress={() => this.doSomething()} // Ex : openDrawer() in react-navigation

          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon
                  name='heart'
                  type='feather'
                  color='#fff'
                  containerStyle={{ marginHorizontal: 10 }}
              />
              <Icon
                  name='search'
                  type='feather'
                  color='#fff'
              />
          </View>
      </View>
  </View>
);
}



const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#6200ee', // Cor de fundo da Tab Bar
    height: 70, // Altura da Tab Bar
    borderTopWidth: 0, // Remover borda superior
    elevation: 5, // Sombra
  },
  fab: {
    position: 'absolute',
    bottom: 30, // Posiciona o FAB acima da Tab Bar
    left: '50%', // Centraliza horizontalmente
    marginLeft: -28, // Metade da largura do FAB para centralizá-lo
    backgroundColor: '#ff4081', // Cor do FAB
  },

});
