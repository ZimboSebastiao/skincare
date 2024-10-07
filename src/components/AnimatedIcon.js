import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';

const AnimatedIcon = ({ focused, IconComponent, label }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -0, // Move o ícone para cima
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1, // Aparece o rótulo
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0, // Mantém o ícone na posição normal
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // Desaparece o rótulo
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{
        width: 70, // Defina a largura
        height: 70, // Defina a altura igual à largura
        borderWidth: focused ? 2 : 0,
        borderColor: focused ? "#ffff" : "transparent",
        borderRadius: 40, // Metade da largura/altura para um círculo
        backgroundColor: focused ? "#ffff" : "transparent",
        marginBottom: focused ? 35 : 0, // Eleva a borda apenas se focado
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        justifyContent: 'center', // Centraliza o conteúdo verticalmentea
        
        
      }}>
        <Animated.View style={{
          transform: [{ translateY }],
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <IconComponent size={30} color={focused ? "#ff80c3" : "#c2bebe"} />
        </Animated.View>
      </View>
      <Animated.View style={{ opacity }}>
        <Text style={{ color: focused ? "#ff80c3" : "#c2bebe", fontSize: 12, marginTop: -15 }}>
          {label}
        </Text>
      </Animated.View>
    </View>
  );
};

export default AnimatedIcon;
