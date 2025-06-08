import { useState } from "react";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed  top-4 left-4 z-20 p-2 rounded-lg hover:bg-gray-100 bg-white"
      >
        {isOpen ? (
          <RiMenuFoldLine size={24} className="text-gray-600" />
        ) : (
          <RiMenuUnfoldLine size={24} className="text-gray-600" />
        )}
      </button>

      <nav
        className={`fixed left-0 top-0 h-full bg-white text-black font-semibold shadow-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 pt-16">
          <div className="mb-8">
            <h1
              className={`text-xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
                !isOpen ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              Lovely Home
            </h1>
          </div>
          <ul className="space-y-4">
            <li>
              <a
                href="/"
                className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${
                  isOpen ? "p-3" : "p-3 justify-center w-full"
                }`}
              >
                <div className="flex items-center justify-center">
                  <FaHome
                    className={`ml-3 ${
                      !isOpen ? "w-6 h-6" : "w-6 h-6"
                    } transition-all duration-300`}
                  />
                </div>
                <span
                  className={`ml-3 transition-all whitespace-nowrap overflow-hidden duration-300 ${
                    !isOpen ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  Product
                </span>
              </a>
            </li>
            <li>
              <a
                href="/products"
                className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${
                  isOpen ? "p-3" : "p-3 justify-center w-full"
                }`}
              >
                <div className="flex items-center justify-center">
                  <FaClipboardList
                    className={`ml-3 ${
                      !isOpen ? "w-6 h-6" : "w-6 h-6"
                    } transition-all duration-300`}
                  />
                </div>
                <span
                  className={`ml-3 transition-all whitespace-nowrap overflow-hidden duration-300 ${
                    !isOpen ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  Management
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
