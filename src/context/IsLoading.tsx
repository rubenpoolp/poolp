import { ReactNode, createContext, useContext, useState } from "react";

const IsLoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

const IsLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  );
};

export const useIsLoading = () => {
  return useContext(IsLoadingContext);
};

export default IsLoadingProvider;
