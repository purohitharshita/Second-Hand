import React from "react";
import { FaMobileAlt, FaBook, FaBed, FaFan, FaBicycle } from "react-icons/fa";
import { Link } from "react-scroll";

const Categories = () => {
  const items = [
    { icon: <FaBed size={32} />, title: "Mattress" },
    { icon: <FaFan size={32} />, title: "Air Cooler" },
    { icon: <FaBicycle size={32} />, title: "Cycles" },
    { icon: <FaMobileAlt size={32} />, title: "Electronics" },
    { icon: <FaBook size={32} />, title: "Books" },
  ];

  return (
    <div className="bg-gray-900 p-4 flex justify-center">
      <div className="flex flex-wrap justify-center md:w-1/2">
        {items.map((item, index) => (
          <Link
            to={item.title}
            smooth={true}
            duration={500}
            key={index}
            className="flex flex-col items-center text-white space-y-2 cursor-pointer transition transform hover:scale-110 hover:text-yellow-500 p-4 md:w-1/5"
          >
            {item.icon}
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
