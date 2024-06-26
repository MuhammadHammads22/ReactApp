import AsyncStorage from "@react-native-async-storage/async-storage"

const setRefreshToken=async (refreshToken)=>{
    await AsyncStorage.setItem("refreshToken",refreshToken).then(console.log('refreshtoken saved'))
}
const getRefreshToken=async ()=>{
    const result= await AsyncStorage.getItem("refreshToken")
    return result
}

const setAccessToken=async (accessToken)=>{
    await AsyncStorage.setItem("accessToken",accessToken).then(console.log('accesstoken saved'))
}
const getAccessToken=async ()=>{
    const result= await AsyncStorage.getItem("accessToken")
    return result
}
export {getAccessToken,setAccessToken,getRefreshToken,setRefreshToken}