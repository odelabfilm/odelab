import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";

const Home = () => {
  return (
    <div className="bg-ode-navy min-h-dvh text-ode-white selection:bg-white selection:text-ode-navy">
      {/* 1. Hero Section */}
      <section className="min-h-dvh flex flex-col justify-center items-center relative px-4 md:px-8 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-10"
        >
          {/* 모바일/태블릿/데스크탑 폰트 크기 구분 */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold tracking-tighter mb-4 md:mb-6">
            Ode lab
          </h1>
          <p className="font-mono text-[10px] md:text-xs lg:text-sm tracking-[0.15em] md:tracking-[0.2em] opacity-70 uppercase">
            Long Gaze, Deep Ode.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 md:bottom-12 animate-bounce"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16 items-start"
        >
          {/* Left: Heading */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif leading-snug">
              We capture the <br />
              <span className="italic text-white/60">depth</span> of a <br />
              long gaze.
            </h2>
          </div>

          {/* Right: Text & Link */}
          <div className="lg:w-2/3 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6 text-base md:text-lg font-light text-white/80 leading-relaxed">
              {/* [수정됨] 요청하신 내용을 반영한 영문 텍스트 */}
              <p>
                Ode Lab is a creative film collective based in Seoul. We believe
                in the power of a long gaze. We observe deeply to uncover the
                stories hidden within.
              </p>
              <p>
                From cinema and drama to commercials and fashion films, we
                visualize the deepest emotions with our own distinct language.
              </p>
            </div>

            {/* View Work Link */}
            <div className="pt-2 md:pt-4">
              <Link
                to="/work"
                className="group inline-flex items-center gap-3 text-sm font-mono tracking-widest hover:opacity-70 transition-opacity"
              >
                VIEW SELECTED WORKS
                <HiArrowLongRight className="text-xl group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Footer */}
      <footer className="py-16 md:py-20 lg:py-24 text-center">
        <p className="font-serif text-xl md:text-2xl italic opacity-30">
          Ode lab.
        </p>
      </footer>
    </div>
  );
};

export default Home;
