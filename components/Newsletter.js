"use client";

const Newsletter = () => {
  return (
    <section className="bg-gray-50 py-8 md:py-12 mb-2 mt-4 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6 md:mb-8">
          Stay updated with our latest offers and products
        </p>
        <form className="max-w-md mx-auto flex flex-col md:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 mb-2 md:mb-0 md:mr-2 rounded-full md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-5 py-2 rounded-full md:rounded-l-none hover:bg-gray-800 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
