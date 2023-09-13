import React from "react";
import {Text} from "react-native";

const AppText = (props : any) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'Montserrat',
        // fontFamily: 'Dancing Script',
        color: 'black',
      }}>
      {props.children}
    </Text>
  )
}

export default AppText;