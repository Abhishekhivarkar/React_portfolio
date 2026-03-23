import { createContext, useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  return (
    <ContactContext.Provider value={{ loading, setLoading, data, setData }}>
      {children}
    </ContactContext.Provider>
  );
};