import React, {createContext, useState, useEffect} from "react";
import {data as dataEN} from "../languages/en";
import {data as dataFR} from "../languages/fr";
import {useLocalStorage} from "../hooks/useLocalStorage";
const LanguageContext = createContext();

const LanguageProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage(
    "selectedLanguage",
    "EN"
  ); // Get selected language from localStorage

  const [data, setData] = useState({}); // Initialize empty data object

  useEffect(() => {
    const languageData = {
      FR: dataFR,
      EN: dataEN,
    };
    setData(languageData[selectedLanguage]);
  }, [selectedLanguage]);

  const handleLanguageChange = newLanguage => {
    setSelectedLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage); // Update localStorage
  };
  const value = {
    selectedLanguage,
    data,
    handleLanguageChange
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export {LanguageProvider, LanguageContext};
