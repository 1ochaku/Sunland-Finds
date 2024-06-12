import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image
        source={require('../../assets/myImages/backgroundImage.webp')}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
        <Text className="text-[30px] font-bold text-center">SunLand - Finds</Text>
        <Text className="text-[18px] text-slate-500 mt-4 text-center">Where one meets the aesthetic crafts.</Text>
        <TouchableOpacity onPress={onPress} className="p-4 bg-blue-400 rounded-full mt-12">
          <Text className="text-white text-center text-[15px]">Login / SignUp</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
