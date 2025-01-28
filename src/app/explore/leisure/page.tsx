"use client";

import Header from "@/components/common/Header";
import LeisureSearchBar from "@/components/Leisure/LeisureSearchBar";
import CardList from "@/components/common/CardList";
import Footer from "@/components/common/Footer";
const TravelPage: React.FC = () => {
   return (
      <div className="min-h-screen">
         <Header />
         <LeisureSearchBar />
         <CardList />
         <Footer />
      </div>
   );
};

export default TravelPage;
