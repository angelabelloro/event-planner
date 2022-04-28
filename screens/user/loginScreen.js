import React, { useCallback, useReducer } from 'react';
import { Alert, StyleSheet, Button, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthScreenWrapper from '../../components/authScreenWrapper';
import Colors  from '../../constants/colors';
import { login } from '../../store/actions/auth.actions';
import Input from '../../components/input';
import { formReducer, FORM_INPUT_UPDATE } from './formReducer';


const AuthScreen = ({ navigation }) => {
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

  const handleLogIn = () => {
    if (formState.formIsValid) {
      dispatch(login(formState.inputValues.email, formState.inputValues.password));

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
      source={require('../../assets/images/bg_event.png')}
      resizeMode = 'cover'
      >
      
    <AuthScreenWrapper
      title="INGRESAR"
      message="¿Aún no tienes cuenta?"
      buttonText="Ir al registro"
      buttonPath="Register"
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
        errorText="Ingrese contraseña"
        required
        onInputChange={onInputChangeHandler}
      />
      <Button
        title="INGRESAR"
        onPress={handleLogIn}
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

export default AuthScreen;