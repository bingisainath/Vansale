import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import {connect} from 'react-redux';

import {styles} from './Style';


const SignIn = (props: any) => {

  const [Emailerror, setEmailError] = useState('');
  const [Passerror, setPassError] = useState('');

  //Creating a useState hook for storing the data entered by the user
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {colors} = useTheme();

  //Function to validate the email according to the regEx expression
  const isEmailValid = (email: string) => {
    let Pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Pattern.test(String(email).toLowerCase())
      ? setEmailError('')
      : setEmailError('Invalid Email Address');
  };

  //Function to validate the password according to the regEx expression
  const isPasswordValid = (password: string) => {
    let Pattern = /^[1-9].{3,10}$/;
    Pattern.test(String(password).toLowerCase())
      ? setPassError('')
      : setPassError('Invalid Password Address');
  };

  //Function to handle any changes in the email section
  const textInputChange = (val: any) => {
    isEmailValid(val);
    isPasswordValid(val);

    if (Passerror == '' || Emailerror == '') {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val: any) => {
    isPasswordValid(val);
    if (Passerror == '') {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  //Function to handle the entry of password fiel as hidden or shown
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  //Function to handle validity in the email section
  const handleValidEmail = (val: any) => {
    isEmailValid(val);
    if (Emailerror == '') {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  useEffect(() => {

   
    if (props.loginSuccess == 'success') {
      console.log('Login Success');
    } else if (props.loginFail == 'fail') {
      Alert.alert('Entered Crenditials are incorrect');
    } 
  }, [props.loginSuccess, props.loginFail]);
  

  const loginHandle = async () => {
    try {
      if (data.username == '' || data.password == '') {
        Alert.alert('Enter the details');
      } else {
          await props.getUsers({email: data.username, password: data.password});
      }
    } catch (e: any) {
      Alert.alert('Enter Valid Details');
      Alert.alert(e);
    }
  };
// invoice hearder
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <Image
            style={styles.ImageLogo}
            source={require('../components/Images/loginImage2.png')}
          />
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: colors.background,
              },
            ]}>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                },
              ]}>
              Email
            </Text>
            <View style={styles.action}>
              <FontAwesome5 name="user" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Email"
                placeholderTextColor={'grey'}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{Emailerror}</Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor={'grey'}
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => handlePasswordChange(val)}
                onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{Passerror}</Text>
              </Animatable.View>
            )}
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => loginHandle()}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    loginSuccess: state.loginSuccess,
    loginFail: state.loginFail,
    isLogin: state.isLogin,

    extra: state.extra
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getUsers(action: any) {
    //console.log(action);
    await dispatch({
      type: 'GET_USERS_REQUEST',
      email: action.email,
      password: action.password,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
