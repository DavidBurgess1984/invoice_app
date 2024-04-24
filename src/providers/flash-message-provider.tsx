import React, { useContext, useState,ReactNode } from "react";


interface FlashMessageContextType {
  flashMessage: string|null;
  setFlashMessage: (message: string|null) => void;
  clearFlashMessage: () => void;
}

const FlashMessageContext = React.createContext<FlashMessageContextType | null>(null);

interface FlashMessageProviderProps {
  children: ReactNode;
}

const FlashMessageProvider: React.FC<FlashMessageProviderProps> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<string | null>(null);


  const clearFlashMessage = () => {
    setFlashMessage(null);
  };

  return (
    <FlashMessageContext.Provider
      value={{
        flashMessage,
        setFlashMessage,
        clearFlashMessage,
      }}
    >
      {children}
    </FlashMessageContext.Provider>
  );
};

const useFlashMessage = (): FlashMessageContextType => {
  const context = useContext(FlashMessageContext);
  if (context === null) {
    throw new Error("useFlashMessage() called outside of a FlashMessageProvider?");
  }
  return context;
};

export { FlashMessageProvider, useFlashMessage };
