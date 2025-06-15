import { useSyncExternalStore } from "react";

interface AuthState {
  token: string | null;
}

let state: AuthState = {
  token: localStorage.getItem("auth-token"),
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function setToken(token: string | null) {
  if (token) {
    localStorage.setItem("auth-token", token);
    console.log("token set", localStorage.getItem("auth-token"));
  } else {
    localStorage.removeItem("auth-token");
    console.log("token removed", localStorage.getItem("auth-token"));
  }
  state = { token };
  listeners.forEach((listener) => listener());
}

export function useAuthStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);
  return {
    token: snapshot.token,
    setToken,
  };
}
