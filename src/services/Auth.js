/* eslint-disable prettier/prettier */
import { abbrevs } from "npm";


export const LoginApi=async(data)=>{

    console.log("data",data)
    try{

        const result=await fetch('http://172.20.32.1:4000/login',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
 },
            body:JSON.stringify(data)


        })
        var jsonResponse = await result.json();

        console.log(jsonResponse)
        return jsonResponse

    }
    catch(err){
        console.log(err)
        return err;
    }
}

export const SignApi=async(data)=>{

    console.log("data from compo",data)
    try{
        // console.log(`http://community.sadathussain.com/api/register?firstname=${data.firstname}&lastname=${data.lastname}&email=${data.email}&password=${data.password}&confirm_password=${data.confirm_password}&username=${data.username}&user_role=imam`)

        // const result=await fetch(`http://community.sadathussain.com/api/register?firstname=${data.firstname}&lastname=${data.lastname}&email=${data.email}&password=${data.password}&confirm_password=${data.confirm_password}&username=${data.username}&user_role=user&fcm_token=${data.token}`,{
        const result = await fetch(`http://app.altawheedjc.org/api/register?firstname=${data.firstname}&lastname=${data.lastname}&email=${data.email}&password=${data.password}&confirm_password=${data.confirm_password}&username=${data.username}&user_role=user&fcm_token=${data.token}`,{

            method:'POST',
            headers:{
                'Accept': 'application/json',
    'Content-Type':'application/json' 

 },
            body:JSON.stringify(data)


        })
        var jsonResponse = await result.json();

        console.log("jsonResponse",jsonResponse) 
        return jsonResponse

    }
    catch(err){
        console.log(err)
        return err;
    }
}