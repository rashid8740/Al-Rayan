import Header from "../components/Header";
import HeroBanners from "../components/HeroBanners";
import FeaturedCategories from "../components/FeaturedCategories";
import FeaturedProducts from "../components/FeaturedProducts";
import SpecialSale from "../components/SpecialSale";
import CategoriesHot from "../components/CategoriesHot";
import TopDeals from "../components/TopDeals";
import TopOffers from "../components/TopOffers";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="">
          <HeroBanners />
        </div>
        <div className="container mx-auto px-4 ">
          <FeaturedCategories />
          <FeaturedProducts />
          <div id="special-sale">
            <SpecialSale />
          </div>
          <div id="hot-categories">
            <CategoriesHot />
          </div>
          <div id="top-deals">
            <TopDeals />
          </div>
          <div id="top-offers">
            <TopOffers />
          </div>
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
