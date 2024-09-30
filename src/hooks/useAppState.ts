import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    const listener = AppState.addEventListener("change", handleAppStateChange);

    return () => listener.remove();
  }, []);

  return appState;
};

export default useAppState;
