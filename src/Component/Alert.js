import React, {useEffect} from 'react';

const Alert =({type,msg,removeAlert,list})=>{
    useEffect(()=>{
    const timeout=setTimeout(()=>{
        removeAlert();
    },3000)

    return()=>clearTimeout(list);
},[list])
return <p>{msg}</p>
}

export default Alert;
