import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import { Link } from 'expo-router';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import TabNavigation from './Navigation/TabNavigation';

export default function Index() {
  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SafeAreaView className="flex-1 bg-white">
          <StatusBar style="auto" />
          <SignedIn>
            <TabNavigation/>
          </SignedIn>
          <SignedOut>
          <LoginScreen/>
          </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}
