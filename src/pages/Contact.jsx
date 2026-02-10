import React from "react";
import { motion } from "framer-motion";
import { RiKakaoTalkFill, RiInstagramLine } from "react-icons/ri";

const Contact = () => {
  return (
    <div className="bg-ode-navy min-h-dvh flex flex-col justify-between px-4 md:px-8 lg:px-6 pt-28 md:pt-32 pb-6 md:pb-8 text-ode-white selection:bg-white selection:text-ode-navy">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 md:space-y-10 max-w-2xl w-full"
        >
          {/* 1. Main Heading */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-3 md:mb-4">
              Ode lab
            </h1>
            <p className="text-ode-white/60 font-mono text-[10px] md:text-xs lg:text-base tracking-wider">
              BASED IN SEOUL, KOREA
            </p>
          </div>

          {/* 2. Contact Info */}
          <div className="space-y-2 md:space-y-3 font-serif text-lg md:text-xl lg:text-2xl font-light tracking-wide">
            <a
              href="mailto:odelab.film@gmail.com"
              className="block hover:opacity-50 transition-opacity"
            >
              odelab.film@gmail.com
            </a>

            <a
              href="tel:+821044423327"
              className="block hover:opacity-50 transition-opacity"
            >
              010-4442-3327
            </a>
          </div>

          {/* 3. Social Icons */}
          <div className="flex justify-center gap-6 md:gap-8 pt-2">
            <a
              href="https://www.instagram.com/odelab.film?igsh=MWl0NHF5Z3Vid215bg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl hover:scale-110 transition-transform hover:text-white/70"
              aria-label="Instagram"
            >
              <RiInstagramLine />
            </a>

            <a
              href="http://pf.kakao.com/_xgbTmn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl hover:scale-110 transition-transform hover:text-[#FEE500]"
              aria-label="KakaoTalk"
            >
              <RiKakaoTalkFill />
            </a>
          </div>
        </motion.div>
      </div>

      {/* 4. Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-[10px] md:text-xs font-mono opacity-30 pt-6 md:pt-8"
      >
        &copy; {new Date().getFullYear()} Ode Lab. All Rights Reserved.
      </motion.div>
    </div>
  );
};

export default Contact;
