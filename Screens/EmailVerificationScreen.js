import {  ScrollView, TextInput, View, Text, KeyboardAvoidingView, StatusBar, TouchableOpacity, ActivityIndicator, Modal, StyleSheet } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import {  useVerifyPhoneNumberMutation } from '../Src/Api/Auth'
import LinearGradient from 'react-native-linear-gradient'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useSelector } from 'react-redux'

const EmailVerification = ({navigation,route}) => {
  const [verifyPhoneNumber, { data, isLoading, error }] = useVerifyPhoneNumberMutation();
  const signupState=useSelector((state)=>state.signup.signup);
  const pno=signupState.propPhoneNumber
 

 
  const verifyCode=async (code)=>{

   await verifyPhoneNumber({"phone_number":pno,"code":code}).then(data=>{
    if (data?.error) {
      if(data.error.data){
        const { error } = data.error.data
        // console.log(errors.non_field_errors)
        if (error === "Phone Number verification token does not exist.") {
          setIsErrorServer(true)
          setErrorServer("This email is not registered. Register first")
          // setServerResponse(state=>{return{...state,error:"This email is not registered. Register first",isError:true}})
        }
        if (errors.non_field_errors[0] === "Verify your email") {
          console.log("verify email plz..")
          setIsErrorServer(true)
          setErrorServer("This email is unverified. Verify email before Loging In.")
       }
      }
     
    } else{
      const { data: { token: { access, refresh } } } = data;
      
      // Console log the destructured values
      console.log('Access Token:', access);
      console.log('Refresh Token:', refresh);

      // Validate the tokens in a conditional statement
      if (access && refresh) {
        setAccessToken(access)
        setRefreshToken(refresh)
        console.warn("Login Successfull")
        // navigation.navigate('HomeGraph')
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeGraph' }],
          })
        );
        // console.log('Both access and refresh tokens are available.');
      } else {
        console.log('One or both tokens are missing.');
      }

    }
  }
  ).catch((error)=>{console.log(error)});

}
      
    

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;
  const buttonDisabled=!(value.length===CELL_COUNT)
  
 
  return (
<ScrollView style={{ flex: 1,marginTop:20 }}>
    <KeyboardAvoidingView>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={'#03bafc'}
      />

        <Modal  transparent={true}
        visible={isLoading}
        >
          <View backgroundColor={'rgba(50,50,50,.3)'} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator style={{}} size={'medium'} color={'black'} animating={true}/>
          </View>
        </Modal>

      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderBottomLeftRadius: responsiveHeight(3),
          borderBottomRightRadius: responsiveHeight(3),
          height: responsiveHeight(30),
          width: responsiveWidth(100),
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text style={{ color: 'white', fontSize: responsiveHeight(4), fontWeight: 'bold' }}>
          AddaZakat
        </Text>
      </LinearGradient>
      <View
        style={{
          elevation: 4,
          backgroundColor: 'white',
          borderRadius: responsiveWidth(5),
          margin: responsiveWidth(3),
          marginTop: responsiveHeight(-2),
          paddingVertical: responsiveHeight(2),
          // alignItems:'center',
          paddingHorizontal: responsiveWidth(5),
        }}>
        <Text
          style={{
            fontSize: responsiveHeight(2.5),
            fontWeight: 'bold',
            color: '#03bafc',
            textAlign: 'center'
          }}>
          EMAIL VERIFICATION
        </Text>
        <View style={{ marginVertical: responsiveHeight(2) }}>
          
          {/* <View style={{ marginTop: responsiveHeight(1) }}>
            <TextInput  onBlur={() => validateEmail(state.email)} value={state.email} onChangeText={(text) => setState({...state,email:text})} placeholder='Email' style={{ fontSize: responsiveHeight(2.5), height: responsiveHeight(5), padding: responsiveHeight(.5), borderBottomColor: state.isErrorEmail ? 'red' : '#03bafc', borderBottomWidth: 2 }} />
            <View style={{ marginVertical: responsiveHeight(1), alignItems: 'flex-start' }}>
              {state.isErrorEmail ? (<Text style={{ color: 'red' }}>{state.errorEmail}</Text>) : (<Text></Text>)}
            </View>
          </View> */}
      
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
      <View style={{ marginTop: responsiveHeight(2), alignItems: 'flex-start' }}>
              <Text style={{ color: 'red' }}>Enter OTP code sent to your email.</Text>
      </View>

          <View style={{ marginTop: responsiveHeight(4) }}>
            <TouchableOpacity disabled={buttonDisabled} onPress={()=>{verifyCode(value)}}>
              <LinearGradient
                onPress={()=>{verifyCode(value)}}
                colors={['#42a1f5', '#03bafc', '#42c5f5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 100,
                  width: responsiveWidth(60),
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(1),
                  opacity:buttonDisabled?.5:1.0
                }}>
                <Text style={{ color: 'white', fontSize: 19 }}>Verify</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: responsiveHeight(3) }}>
            <Text onPress={()=>navigation.goBack()} style={{ color: '#03bafc', fontSize: responsiveHeight(2.5),textDecorationLine:"underline", textAlign: 'center' }}>
              go back
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  </ScrollView>






  )
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });
  
export default EmailVerification