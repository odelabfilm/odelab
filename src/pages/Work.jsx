import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Work = () => {
  const projects = useQuery(api.functions.getWorks) || [];

  return (
    <div className="bg-ode-navy min-h-dvh pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-12 text-ode-white selection:bg-white selection:text-ode-navy">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 md:mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 md:pb-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold">
          Work
        </h1>
        <p className="font-mono text-xs md:text-sm text-white/50 mt-3 md:mt-0">
          SELECTED PROJECTS <br />
        </p>
      </motion.div>

      {/* Grid - 모바일 2열, 태블릿/데스크탑 3열 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => {
            const thumbnail =
              project.images && project.images.length > 0
                ? project.images[0]
                : project.imageUrl;

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/work/${project._id}`} className="group block">
                  {/* Thumbnail Container */}
                  <div
                    className={`relative aspect-video overflow-hidden rounded-sm ${thumbnail ? "" : "bg-neutral-800"}`}
                  >
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* 호버 시 제목 오버레이 */}
                    <div className="absolute inset-0 bg-ode-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center backdrop-blur-sm p-2 md:p-4 text-center">
                      <span className="font-korean-title text-sm md:text-lg lg:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 leading-tight mb-1">
                        {project.title}
                      </span>

                      {/* 카테고리 */}
                      <span className="font-mono text-[10px] md:text-xs text-green-400 uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-2 md:mt-3 flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex-1 min-w-0 pr-1 md:pr-2">
                      <h3 className="text-xs md:text-sm lg:text-base font-korean-title tracking-wide truncate">
                        {project.title}
                      </h3>
                      <p className="text-[8px] md:text-[10px] font-mono mt-0.5 text-white/60 uppercase tracking-wider">
                        {project.category}
                      </p>
                    </div>
                    <span className="text-[8px] md:text-[10px] font-mono border border-white/20 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full shrink-0">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 text-center opacity-30 py-16 md:py-20 font-mono">
            No projects added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
