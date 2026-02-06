import React from "react";
import { motion } from "framer-motion";

// 유튜브 주소 변환 함수
const getEmbedUrl = (url) => {
  if (!url) return null;
  if (url.includes("embed/")) return url;
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("v=")) {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.length === 11) return `https://www.youtube.com/embed/${url}`;
  return url;
};

const ProjectView = ({ data }) => {
  if (!data) return <div className="text-white p-10">No Data</div>;

  const embedUrl = getEmbedUrl(data.videoUrl);
  const thumbnailImage =
    data.images && data.images.length > 0 ? data.images[0] : null;

  return (
    <div className="bg-ode-navy text-ode-white min-h-dvh font-sans pb-12 md:pb-16 lg:pb-20">
      {/* 모바일/태블릿/데스크탑 반응형 레이아웃 */}
      <div className="pt-24 md:pt-28 lg:pt-32 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* 1. Main Media Area */}
        <div className="w-full aspect-video bg-black relative group rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl border border-white/5">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Video"
              className="w-full h-full pointer-events-none md:pointer-events-auto"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : thumbnailImage ? (
            <div className="w-full h-full relative">
              <img
                src={thumbnailImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#050810] text-white/30">
              <span className="font-serif text-2xl md:text-3xl italic">
                Ode Lab.
              </span>
            </div>
          )}
        </div>

        {/* 2. Title & Info Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-10 lg:mt-12"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 md:pb-6 mb-6 md:mb-8 gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-korean-title mb-1 md:mb-2 tracking-tight">
                {data.title || "Project Title"}
              </h1>
              <span className="text-xs md:text-sm font-mono text-green-400 tracking-widest uppercase">
                {data.category || "Category"}
              </span>
            </div>
            <span className="text-xs md:text-sm font-mono opacity-50 border border-white/20 px-2 md:px-3 py-1 rounded-full w-fit">
              {data.year || "2026"}
            </span>
          </div>

          {/* Description & Credits */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-[10px] md:text-xs font-mono opacity-40 mb-3 md:mb-4 uppercase tracking-[0.15em] md:tracking-[0.2em]">
                Description
              </h3>
              <p className="text-sm md:text-base lg:text-lg font-korean-desc whitespace-pre-line text-white/80">
                {data.description || "No description available."}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] md:text-xs font-mono opacity-40 mb-3 md:mb-4 uppercase tracking-[0.15em] md:tracking-[0.2em]">
                Credits
              </h3>
              <p className="text-[10px] md:text-xs font-mono leading-loose whitespace-pre-line text-white/60">
                {data.credits || "No credits info."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3. Still Cuts (Layout Updated) */}
        {data.images && data.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 lg:mt-24 border-t border-white/10 pt-8 md:pt-10 lg:pt-12"
          >
            <h3 className="text-[10px] md:text-xs font-mono opacity-40 uppercase text-center mb-6 md:mb-8 lg:mb-10 tracking-[0.15em] md:tracking-[0.2em]">
              Still Cuts
            </h3>

            {/* 스틸컷: 원본 비율 유지 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 items-start">
              {data.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-md md:rounded-lg bg-black shadow-lg"
                >
                  <img
                    src={img}
                    alt={`Still ${idx}`}
                    className="w-full h-auto block opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out"
                  />
                  {/* 살짝 어두운 오버레이가 호버시 밝아지는 효과 추가 */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectView;
