import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const Admin = () => {
  // --- 1. 데이터 가져오기 (Read) ---
  const works = useQuery(api.functions.getWorks) || [];
  const equipments = useQuery(api.functions.getEquipments) || [];

  // --- 2. 데이터 조작하기 (Mutate) ---
  const addWork = useMutation(api.functions.addWork);
  const removeWork = useMutation(api.functions.removeWork);
  const addEquipment = useMutation(api.functions.addEquipment);
  const removeEquipment = useMutation(api.functions.removeEquipment);

  // --- 3. 입력창 상태관리 (State) ---
  const [workForm, setWorkForm] = useState({
    title: "",
    category: "",
    year: "2026",
  });
  const [equipForm, setEquipForm] = useState({ category: "Camera", name: "" });

  // 포트폴리오 추가 함수
  const handleAddWork = async (e) => {
    e.preventDefault();
    await addWork(workForm);
    setWorkForm({ title: "", category: "", year: "2026" }); // 초기화
    alert("Project Added!");
  };

  // 장비 추가 함수
  const handleAddEquip = async (e) => {
    e.preventDefault();
    await addEquipment(equipForm);
    setEquipForm({ ...equipForm, name: "" }); // 이름만 초기화
    alert("Equipment Added!");
  };

  return (
    <div className="bg-ode-navy min-h-screen pt-32 pb-20 px-6 text-ode-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-12 border-b border-white/20 pb-4">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* --- SECTION 1: WORK MANAGER --- */}
          <div>
            <h2 className="text-2xl font-mono mb-6 text-green-400">
              1. Portfolio Manager
            </h2>

            {/* 입력 폼 */}
            <form
              onSubmit={handleAddWork}
              className="bg-white/5 p-6 rounded-lg space-y-4 mb-8"
            >
              <input
                placeholder="Project Title (e.g. HOT6 CF)"
                className="w-full bg-black/30 border border-white/10 p-3 rounded text-white"
                value={workForm.title}
                onChange={(e) =>
                  setWorkForm({ ...workForm, title: e.target.value })
                }
                required
              />
              <input
                placeholder="Category (e.g. Commercial)"
                className="w-full bg-black/30 border border-white/10 p-3 rounded text-white"
                value={workForm.category}
                onChange={(e) =>
                  setWorkForm({ ...workForm, category: e.target.value })
                }
                required
              />
              <input
                placeholder="Year (e.g. 2026)"
                className="w-full bg-black/30 border border-white/10 p-3 rounded text-white"
                value={workForm.year}
                onChange={(e) =>
                  setWorkForm({ ...workForm, year: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-ode-navy font-bold py-3 hover:bg-gray-200 transition"
              >
                ADD PROJECT
              </button>
            </form>

            {/* 목록 리스트 */}
            <ul className="space-y-2">
              {works.map((work) => (
                <li
                  key={work._id}
                  className="flex justify-between items-center bg-white/5 p-3 rounded"
                >
                  <div>
                    <span className="font-bold block">{work.title}</span>
                    <span className="text-xs text-white/50">
                      {work.category} / {work.year}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Delete this project?"))
                        removeWork({ id: work._id });
                    }}
                    className="text-red-500 text-xs hover:text-red-300 underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- SECTION 2: EQUIPMENT MANAGER --- */}
          <div>
            <h2 className="text-2xl font-mono mb-6 text-blue-400">
              2. Equipment Manager
            </h2>

            {/* 입력 폼 */}
            <form
              onSubmit={handleAddEquip}
              className="bg-white/5 p-6 rounded-lg space-y-4 mb-8"
            >
              <select
                className="w-full bg-black/30 border border-white/10 p-3 rounded text-white"
                value={equipForm.category}
                onChange={(e) =>
                  setEquipForm({ ...equipForm, category: e.target.value })
                }
              >
                <option value="Camera">Camera</option>
                <option value="Lens">Lens</option>
                <option value="Tripod">Tripod</option>
                <option value="Wireless">Wireless</option>
                <option value="Monitor">Monitor</option>
                <option value="Accessories">Accessories</option>
              </select>
              <input
                placeholder="Equipment Name (e.g. ARRI ALEXA)"
                className="w-full bg-black/30 border border-white/10 p-3 rounded text-white"
                value={equipForm.name}
                onChange={(e) =>
                  setEquipForm({ ...equipForm, name: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 hover:bg-blue-500 transition"
              >
                ADD EQUIPMENT
              </button>
            </form>

            {/* 목록 리스트 */}
            <ul className="space-y-2">
              {equipments.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center bg-white/5 p-3 rounded"
                >
                  <div>
                    <span className="text-xs text-blue-300 block">
                      [{item.category}]
                    </span>
                    <span className="font-serif">{item.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Delete this item?"))
                        removeEquipment({ id: item._id });
                    }}
                    className="text-red-500 text-xs hover:text-red-300 underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
