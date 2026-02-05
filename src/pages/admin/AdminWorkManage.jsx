import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";
import ProjectView from "../../components/ProjectView";
import {
  IoClose,
  IoTrash,
  IoSave,
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoReorderThree,
} from "react-icons/io5";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 드래그 가능한 프로젝트 아이템
const SortableProjectItem = ({ work, isSelected, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: work._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center border-b border-white/5 cursor-pointer hover:bg-white/5 transition ${
        isSelected ? "bg-white/10 border-l-2 border-yellow-400" : ""
      }`}
    >
      {/* 드래그 핸들 */}
      <button
        {...attributes}
        {...listeners}
        className="p-3 text-white/30 hover:text-white/60 cursor-grab active:cursor-grabbing"
      >
        <IoReorderThree size={18} />
      </button>

      {/* 프로젝트 정보 */}
      <div
        onClick={() => onSelect(work)}
        className="flex-1 p-3 pl-0"
      >
        <p className="font-bold text-sm truncate text-white">{work.title}</p>
        <p className="text-xs text-white/40 mt-1">{work.category}</p>
      </div>
    </div>
  );
};

const AdminWorkManage = () => {
  const works = useQuery(api.functions.getWorks) || [];
  const updateWork = useMutation(api.functions.updateWork);
  const removeWork = useMutation(api.functions.removeWork);
  const updateWorkOrder = useMutation(api.functions.updateWorkOrder);

  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(null);
  const [imgInput, setImgInput] = useState("");

  // [View Mode] 미리보기 모드 (desktop | mobile)
  const [viewMode, setViewMode] = useState("desktop");

  // 드래그 앤 드롭 센서
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = works.findIndex((w) => w._id === active.id);
    const newIndex = works.findIndex((w) => w._id === over.id);
    const newOrder = arrayMove(works, oldIndex, newIndex);

    // 새로운 순서로 업데이트
    const updates = newOrder.map((work, index) => ({
      id: work._id,
      order: index,
    }));

    await updateWorkOrder({ updates });
  };

  const handleSelect = (work) => {
    setSelectedId(work._id);
    setForm({
      title: work.title || "",
      category: work.category || "",
      year: work.year || "",
      videoUrl: work.videoUrl || "",
      credits: work.credits || "",
      description: work.description || "",
      images: work.images || [],
    });
    // [수정] 불러올 때 줄바꿈(\n)으로 연결하여 텍스트박스에서 보기 편하게 설정
    setImgInput((work.images || []).join("\n"));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    // [수정] 업데이트 시 줄바꿈과 콤마 모두 허용
    const imageArray = imgInput
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => url !== "");
    await updateWork({ ...form, id: selectedId, images: imageArray });
    alert("Project Updated!");
  };

  const handleDelete = async () => {
    if (confirm("Permanently delete this project?")) {
      await removeWork({ id: selectedId });
      setSelectedId(null);
      setForm(null);
    }
  };

  return (
    <div className="pt-24 h-screen bg-ode-navy flex flex-col min-w-[1000px] overflow-x-auto">
      {/* Top Header */}
      <div className="bg-[#050810] border-b border-white/10 p-4 flex justify-between items-center shrink-0">
        <h1 className="text-lg font-bold text-yellow-400">Portfolio Manager</h1>
        <Link
          to="/admin"
          className="text-2xl text-white/50 hover:text-white transition-colors"
        >
          <IoClose />
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* [COL 1] List Area (Left) - Fixed Width with Drag & Drop */}
        <div className="w-64 border-r border-white/10 bg-[#0b0f19] flex flex-col shrink-0">
          <div className="p-3 bg-white/5 border-b border-white/10">
            <span className="text-xs font-mono text-white/50 uppercase">
              Drag to Reorder
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={works.map((w) => w._id)}
                strategy={verticalListSortingStrategy}
              >
                {works.map((work) => (
                  <SortableProjectItem
                    key={work._id}
                    work={work}
                    isSelected={selectedId === work._id}
                    onSelect={handleSelect}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* [COL 2] Edit Form (Middle) - Fixed Width */}
        <div className="w-96 border-r border-white/10 bg-[#111] flex flex-col shrink-0">
          {form ? (
            <>
              <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center shrink-0">
                <span className="text-xs font-mono text-white/50 uppercase">
                  Editor
                </span>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-400 text-lg p-1"
                >
                  <IoTrash />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20">
                <form
                  id="editForm"
                  onSubmit={handleUpdate}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs text-white/50 block mb-1">
                      Title
                    </label>
                    <input
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-yellow-500 outline-none"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-white/50 block mb-1">
                        Category
                      </label>
                      <input
                        className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-yellow-500 outline-none"
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
                        className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-yellow-500 outline-none"
                        value={form.year}
                        onChange={(e) =>
                          setForm({ ...form, year: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">
                      Video URL
                    </label>
                    <input
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm text-white focus:border-yellow-500 outline-none"
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
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm h-24 text-white focus:border-yellow-500 outline-none resize-none"
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
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm h-24 font-mono text-white focus:border-yellow-500 outline-none resize-none"
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
                      className="w-full bg-white/5 border border-white/10 p-2 rounded text-sm h-20 font-mono text-xs text-white focus:border-yellow-500 outline-none resize-none"
                      value={imgInput}
                      onChange={(e) => {
                        setImgInput(e.target.value);
                        // [수정] 미리보기 업데이트 시에도 동일 정규식 적용
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
                  form="editForm"
                  className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-bold text-white transition shadow-lg flex items-center justify-center gap-2"
                >
                  <IoSave /> SAVE CHANGES
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-white/30 p-6 text-center">
              <p className="mb-2 text-xl">Select a project</p>
            </div>
          )}
        </div>

        {/* [COL 3] Live Preview - Full Screen */}
        <div className="flex-1 bg-[#1a1a1a] relative overflow-hidden flex flex-col">
          {/* View Toggle Buttons */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-2 rounded-full transition ${viewMode === "desktop" ? "bg-yellow-500 text-black" : "text-white/50 hover:text-white"}`}
              title="Desktop View"
            >
              <IoDesktopOutline />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-2 rounded-full transition ${viewMode === "mobile" ? "bg-yellow-500 text-black" : "text-white/50 hover:text-white"}`}
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
                    Select a project to preview
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

export default AdminWorkManage;
