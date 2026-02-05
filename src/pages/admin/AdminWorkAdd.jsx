import React, { useState } from "react";
import { useMutation } from "convex/react";
// 경로 주의: 폴더가 깊으므로 ../가 3번 필요할 수 있습니다.
// 현재 파일 위치가 src/pages/admin/ 이라면 ../../../convex 가 맞습니다.
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";
import ProjectView from "../../components/ProjectView";
import {
  IoClose,
  IoDesktopOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

const AdminWorkAdd = () => {
  const addWork = useMutation(api.functions.addWork);

  // 폼 초기값 안전하게 설정
  const [form, setForm] = useState({
    title: "",
    category: "",
    year: "2026",
    videoUrl: "",
    credits: "",
    description: "",
    images: [],
  });
  const [imgInput, setImgInput] = useState("");
  const [viewMode, setViewMode] = useState("desktop");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // [수정] 엔터(\n)와 콤마(,) 모두 구분자로 인식
    const imageArray = imgInput
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => url !== "");
    await addWork({ ...form, images: imageArray });
    setForm({
      title: "",
      category: "",
      year: "2026",
      videoUrl: "",
      credits: "",
      description: "",
      images: [],
    });
    setImgInput("");
    alert("Project Created Successfully!");
  };

  return (
    <div className="pt-24 h-screen bg-ode-navy flex flex-col min-w-[1000px] overflow-x-auto text-white">
      <div className="flex flex-1 overflow-hidden border-t border-white/10">
        {/* [LEFT] Form Area */}
        <div className="w-1/3 min-w-[400px] border-r border-white/10 flex flex-col h-full bg-[#0b0f19] shrink-0">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#050810] shrink-0">
            <h1 className="text-lg font-bold text-green-400">
              Add New Portfolio
            </h1>
            <Link
              to="/admin"
              className="text-2xl text-white/50 hover:text-white transition-colors"
            >
              <IoClose />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
            <form id="addForm" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1">
                  Title
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-green-500 outline-none"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-white/50 block mb-1">
                    Category
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-green-500 outline-none"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">
                    Year
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-green-500 outline-none"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">
                  Video URL
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-green-500 outline-none"
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm({ ...form, videoUrl: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">
                  Description
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm h-24 text-white focus:border-green-500 outline-none resize-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">
                  Credits
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm h-24 font-mono text-white focus:border-green-500 outline-none resize-none"
                  value={form.credits}
                  onChange={(e) =>
                    setForm({ ...form, credits: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">
                  Image URLs (Enter or Comma separated)
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm h-20 font-mono text-xs text-white focus:border-green-500 outline-none resize-none"
                  value={imgInput}
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                  onChange={(e) => {
                    setImgInput(e.target.value);
                    // [수정] 미리보기 업데이트 로직에도 동일한 정규식 적용
                    const arr = e.target.value
                      .split(/[\n,]+/)
                      .map((u) => u.trim())
                      .filter((u) => u !== "");
                    setForm({ ...form, images: arr });
                  }}
                />
              </div>
            </form>
          </div>
          <div className="p-4 border-t border-white/10 bg-[#050810] shrink-0">
            <button
              type="submit"
              form="addForm"
              className="w-full bg-green-600 py-3 rounded font-bold text-white hover:bg-green-500 transition shadow-lg"
            >
              CREATE PROJECT
            </button>
          </div>
        </div>

        {/* [RIGHT] Live Preview Area - Full Screen */}
        <div className="flex-1 bg-[#1a1a1a] relative overflow-hidden flex flex-col">
          {/* View Toggle Buttons */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-2 rounded-full transition ${viewMode === "desktop" ? "bg-green-500 text-black" : "text-white/50 hover:text-white"}`}
              title="Desktop View"
            >
              <IoDesktopOutline />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-2 rounded-full transition ${viewMode === "mobile" ? "bg-green-500 text-black" : "text-white/50 hover:text-white"}`}
              title="Mobile View"
            >
              <IoPhonePortraitOutline />
            </button>
          </div>

          {/* Preview Container */}
          <div
            className={`flex-1 w-full h-full overflow-hidden flex justify-center transition-all duration-500 ${
              viewMode === "mobile" ? "items-center py-8" : "items-stretch"
            }`}
          >
            <div
              className={`transition-all duration-500 overflow-hidden bg-ode-navy ${
                viewMode === "desktop"
                  ? "w-full h-full"
                  : "w-[393px] h-[852px] rounded-[3.5rem] border-[12px] border-[#2a2a2a] shadow-2xl ring-1 ring-white/10"
              }`}
            >
              <div className="w-full h-full overflow-y-auto scrollbar-hide">
                {form ? (
                  <ProjectView data={form} />
                ) : (
                  <div className="h-full flex items-center justify-center text-white/20">
                    Preview Area
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkAdd;
