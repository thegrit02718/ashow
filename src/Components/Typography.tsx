import React from 'react';
import { Text as RNText } from 'react-native';

export const Typography:React.FC<{
    color?:string,
    fontSize?:number,
    fontWeight?: "normal" | "bold" | "600",
    marginBottom?:number,
    children:React.ReactElement | any | React.ReactElement[]
}> = (props)=>{
    
    return (
        <RNText 
            style={{
                fontFamily: 'Montserrat',
                color: props.color ?? 'black',
                fontSize: props.fontSize ?? 16,
                fontWeight: props.fontWeight ?? 'bold',
                marginBottom: props.marginBottom ?? null
            }}
            >
            {props.children}
        </RNText>
    )
}
