import React, { useCallback, useReducer } from 'react';
import { Alert, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthScreenWrapper from '../../components/authScreenWrapper';
import Colors from '../../constants/colors';
import { signup } from '../../store/actions/auth.actions';
import Input from '../../components/input';
import { formReducer, FORM_INPUT_UPDATE } from './formReducer';
import { ImageBackground } from 'react-native';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '', 
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const handleSignUp = () => {
    if (formState.formIsValid) {
      dispatch(signup(formState.inputValues.email, formState.inputValues.password));
    } else {
      Alert.alert(
        'Formulario inválido',
        'Ingresa email y usuario válido',
        [{ text: 'Ok' }]
      );
    }
  }

  const onInputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    formDispatch({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  }, [formDispatch]);

  return (
    <ImageBackground
      style={styles.screen}
      source={require('../../assets/images/background1.png')}
      resizeMode = 'cover'
      >
      <AuthScreenWrapper
      title="REGISTRO"
      message="¿Ya tienes cuenta?"
      buttonText="Ingresar"
      buttonPath="Login"
    >
      <Input
        id="email"
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        errorText="Por favor ingresa un email válido"
        required
        email
        onInputChange={onInputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        secureTextEntry
        autoCapitalize="none"
        errorText="La contraseña debe ser mínimo 6 caracteres"
        required
        minLength={6}
        onInputChange={onInputChangeHandler}
      />
      <Button
        title="REGISTRARME"
        onPress={handleSignUp}
        buttonStyle={styles.button}
        color={Colors.primary}
      />
    </AuthScreenWrapper>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen:{
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  button: {
    backgroundColor: Colors.primary,
    marginVertical: 20,
  },
});

export default RegisterScreen;