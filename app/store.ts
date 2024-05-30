import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface JWTState {
  JWT: string | null;
  setJWT: (jwt: string | null) => void;
  sitePromptStoredInState: string | null;
  setSitePromptStoredInState: (prompt: string | null) => void;
}

const JWTStore = create<JWTState>((set) => ({
  JWT: SecureStore.getItem('JWT') || null,
  setJWT: (jwt) => set((state) => ({ JWT: jwt })),
  sitePromptStoredInState: null,
  setSitePromptStoredInState: (prompt) => set((state) => ({ sitePromptStoredInState: prompt })),
}));

export default JWTStore;