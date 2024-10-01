import React from "react";
import { Avatar } from "react-native-paper";

const CustomAvatar = ({ imageUri, size = 120 }) => {
  return imageUri ? (
    <Avatar.Image size={size} source={{ uri: imageUri }} />
  ) : (
    <Avatar.Icon size={size} icon="account" />
  );
};

export default CustomAvatar;
