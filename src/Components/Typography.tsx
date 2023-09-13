import React from 'react';
import { Text as RNText } from 'react-native';

export const Typography:React.FC<{
    color?:string,
    fontSize?:number,
    fontWeight?: "normal" | "bold",
    marginBottom?:number,
    children:React.ReactElement | string | React.ReactElement[]
}> = (props)=>{
    
    return (
        <RNText 
            style={{
                fontFamily: 'Montserrat',
                color: props.color ?? 'black',
                fontSize: props.fontSize ?? 12,
                fontWeight: props.fontWeight ?? 'normal',
                marginBottom: props.marginBottom ?? null
                // fontFamily: 'Dancing Script',
            }}
            >
            {props.children}
        </RNText>
    )
}
