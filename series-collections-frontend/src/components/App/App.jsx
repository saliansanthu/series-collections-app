import React, { useState } from "react";
import { useSelector } from "react-redux";
import Auth from "../Auth/Auth";
import NavBar from "../NavBar/NavBar";
import Series from "../Series/Series";
import Footer from "../Footer/Footer";

const App = () => {
  const user = useSelector((state) => state.auth);
  const [isSearchResult, setIsSearchResult] = useState(false);
  return (
    <>
      <NavBar />
      {!user && <Auth />}
      <Series
        isSearchResult={isSearchResult}
        setIsSearchResult={setIsSearchResult}
      />
      <Footer setIsSearchResult={setIsSearchResult} />
    </>
  );
};

export default App;
