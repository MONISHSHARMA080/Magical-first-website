import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Redirect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React = require('react');
import { Alert, Button, Pressable } from 'react-native';
import PillShapeButton from './PillShapeButton';

WebBrowser.maybeCompleteAuthSession();

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_Spotify_CLIENT_ID;

export default function AuthScreen() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      redirectUri: 'magicalfirstwebsite://redirect',
    },
    { authorizationEndpoint: 'https://accounts.spotify.com/authorize' }
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log("success ==>>", code);
      
       
      // Exchange the code with Spotify for an access token
      // You can use fetch or any other networking library to send a POST request to Spotify's token endpoint
    }
    else if (response?.type === 'error') {
      
      Alert.alert("Login error", `Sorry , an error occured when logging in with spotify , error message from spotify :  ${response.error.description} ` )
    }
   
  }, [response]);

  return (
    <Pressable onPress={() => {
      promptAsync();
    }} >

      <PillShapeButton   textToBeDisplayed={"Spotify"} imageLocationOfLogo={require('../../assets/images/Spotify_Icon.png')} />
    </Pressable>
    
    );
}
