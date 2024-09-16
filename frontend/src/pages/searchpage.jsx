import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/footer";
import SearchComponent from "../Components/SearchComponent";

const SearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow overflow-y-auto"> {/* Ensure proper scrolling on mobile */}
        <SearchComponent />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default SearchPage;
