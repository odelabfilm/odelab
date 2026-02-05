import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const CATEGORIES = [
  "Camera",
  "Lens",
  "Tripod",
  "Wireless",
  "Monitor",
  "Intercom",
  "Accessories",
  "ETC",
];

const Equipment = () => {
  const equipmentList = useQuery(api.functions.getEquipments);
  const isLoading = equipmentList === undefined;

  const groupedData = React.useMemo(() => {
    if (isLoading || !equipmentList) return [];
    return CATEGORIES
      .map((cat) => ({
        category: cat,
        items: equipmentList
          .filter((item) => item.category === cat)
          .map((item) => item.name),
      }))
      .filter((group) => group.items.length > 0);
  }, [equipmentList, isLoading]);

  return (
    <div className="bg-ode-navy min-h-dvh pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-20 text-ode-white selection:bg-white selection:text-ode-navy">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 border-b border-white/20 pb-6 md:pb-8"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-4 md:mb-6">
          Equipment
        </h1>
        <p className="text-ode-white/60 font-light text-base md:text-lg leading-relaxed max-w-xl">
          High-end cinema equipment list.
        </p>
      </motion.div>

      {/* List */}
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-10 lg:space-y-12">
        {isLoading ? (
          // 로딩 스켈레톤 - 더 눈에 띄게 개선
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 lg:gap-8 items-start"
              >
                <div className="h-4 w-24 bg-white/20 rounded md:ml-auto animate-pulse" />
                <div className="md:col-span-3 space-y-3">
                  <div className="h-6 md:h-7 w-4/5 bg-white/15 rounded animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="h-6 md:h-7 w-3/5 bg-white/15 rounded animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="h-6 md:h-7 w-2/3 bg-white/15 rounded animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ))}
          </div>
        ) : groupedData.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 md:space-y-10 lg:space-y-12"
          >
            {groupedData.map((section, idx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 lg:gap-8 items-start"
              >
                {/* Category Name */}
                <h2 className="text-[10px] md:text-xs font-mono text-ode-gray tracking-[0.15em] md:tracking-[0.2em] uppercase md:col-span-1 md:text-right pt-1 md:pt-2">
                  {section.category}
                </h2>

                {/* Items */}
                <ul className="md:col-span-3 space-y-1 md:space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-base md:text-lg lg:text-xl font-serif tracking-wide text-white/90 cursor-default hover:text-white transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center opacity-30 py-16 md:py-20 font-mono">
            No equipment added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipment;
