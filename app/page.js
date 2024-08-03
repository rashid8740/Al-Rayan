import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import FeaturedCategories from "../components/FeaturedCategories";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="">
          <HeroCarousel />
        </div>
        <div className="container mx-auto px-4 space-y-12 py-12">
          <FeaturedCategories />
          <FeaturedProducts />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
