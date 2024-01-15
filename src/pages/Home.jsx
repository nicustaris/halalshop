import { Navbar } from "../Navbar/Navbar";
import { LatestOffers } from "../layouts/LatestOffers/LatestOffers";
import { CustomerFavorites } from "../layouts/CustomerFavorites/CustomerFavorites";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="body-container">
      <Navbar />
      <main>
        <LatestOffers />
        <CustomerFavorites />
      </main>
      <div></div>
    </div>
  );
}
export { Home };
