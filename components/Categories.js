import Image from "next/image";
import Link from "next/link";

const Categories = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category, index) => (
        <Link
          href={category.link}
          key={index}
          className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 md:h-64">
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-4 transform group-hover:scale-110 transition-transform duration-300">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
