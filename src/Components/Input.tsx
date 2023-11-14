import * as React from "react"
import { useState } from "react"
import {  TextInput } from "react-native"

interface InputProps  {
    value?:string;
    onChange?:(text:string)=> void;
    cursor?: string;
    style?: any;
}

export default function Input({value, onChange,cursor,style }:InputProps,) {
    const [isInputFocused, setIsInputFocused] = useState(false);
   
  return (
    <TextInput
      defaultValue={value}
      placeholderTextColor="#a0a0a0"
      onChangeText={(text) => {
        if (onChange) {
          onChange(text);
        }
      }}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
      cursorColor={cursor}
      style={style}
  />
  )
}