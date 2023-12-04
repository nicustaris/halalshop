import Navbar from "../Navbar/Navbar";
import LatestOffers from "../layouts/LatestOffers/LatestOffers";
import CustomerFavorites from "../layouts/CustomerFavorites/CustomerFavorites";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <LatestOffers />
        <CustomerFavorites />
      </main>
    </div>
  );
}
