import { createContext, useContext } from "react";
import { GetStaticProps } from "next";

const AppContext = createContext([]);

const AppWrapper = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppWrapper;

export const useAppContext = () => {
  return useContext(AppContext);
};
