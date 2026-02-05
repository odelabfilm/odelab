import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { title: "WORK", path: "/work" },
    { title: "EQUIPMENT", path: "/equipment" },
    { title: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      {/* [Design Update: Seamless Connection] 
          - bg-gradient-to-b: 위에서 아래로 그라데이션
          - from-[#050A18]: 시작 색상을 페이지 배경색과 완벽히 일치시켜 경계를 없앰
          - via-[#050A18]/80: 중간까지 색을 유지해 가독성 확보
          - to-transparent: 끝부분은 투명하게 사라짐
          - pt-8 pb-24: 그라데이션을 길게 늘려서 부드럽게 연결
      */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#050A18] md:bg-gradient-to-b md:from-[#050A18] md:via-[#050A18]/60 md:to-transparent pt-6 md:pt-8 pb-4 md:pb-12 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-serif font-bold tracking-tighter z-50 relative text-white drop-shadow-md"
          >
            Ode lab
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="text-sm font-mono tracking-widest text-white/80 hover:text-white transition-colors drop-shadow-sm"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-2xl z-50 text-white relative drop-shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#050A18] z-40 flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="text-4xl font-serif font-light text-white hover:opacity-70"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
