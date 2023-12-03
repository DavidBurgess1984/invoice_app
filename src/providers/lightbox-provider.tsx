import React, { useContext, useState,ReactNode } from "react";


interface LightboxContextType {
  isLightboxVisible: boolean;
  toggleLightboxVisible: (isVisible: boolean) => void;
  isInvoiceFormVisible: boolean;
  toggleInvoiceFormVisible: (isVisible: boolean) => void;
  content: string;
  setLightboxContent: (content: string) => void;
}

const LightboxContext = React.createContext<LightboxContextType | null>(null);

interface LightboxProviderProps {
  children: ReactNode;
}

const LightboxProvider: React.FC<LightboxProviderProps> = ({ children }) => {
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const [content, setLightboxContent] = useState("");
  const [isInvoiceFormVisible, toggleInvoiceFormVisible] = useState(false);

  const toggleLightboxVisible = (isVisible: boolean) => {
    setIsLightboxVisible(isVisible);
  };

  return (
    <LightboxContext.Provider
      value={{
        isLightboxVisible,
        toggleLightboxVisible,
        content,
        setLightboxContent,
        isInvoiceFormVisible,
        toggleInvoiceFormVisible
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

const useLightbox = (): LightboxContextType => {
  const context = useContext(LightboxContext);
  if (context === null) {
    throw new Error("useLightbox() called outside of a LightboxProvider?");
  }
  return context;
};

export { LightboxProvider, useLightbox };
