import React, { useRef } from "react";
import { Animated, Text, View, Easing } from "react-native";

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
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // Desaparece o rótulo
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <View style={{ alignItems: "center" }}>

        <Animated.View
          style={{
            transform: [{ translateY }],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconComponent size={24} color={focused ? "#ff80c3" : "#b8bbbf"} />
        </Animated.View>
      
      <Animated.View style={{ opacity }}>
        <Text
          style={{
            color: focused ? "#ff80c3" : "#ffff",
            fontSize: 12,
            marginTop: -15,
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </View>
  );
};

export default AnimatedIcon;
