import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";
import { IoClose, IoChevronDown, IoReorderThree } from "react-icons/io5";
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

// 드래그 가능한 아이템 컴포넌트
const SortableItem = ({ item, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white/5 p-3 rounded border border-white/5 hover:border-white/20 transition"
    >
      {/* 드래그 핸들 */}
      <button
        {...attributes}
        {...listeners}
        className="text-white/30 hover:text-white/60 cursor-grab active:cursor-grabbing p-1"
      >
        <IoReorderThree size={20} />
      </button>

      <span className="flex-1 font-serif text-base">{item.name}</span>

      <button
        onClick={() => confirm("Delete this item?") && onDelete(item._id)}
        className="text-white/20 hover:text-red-500 transition text-xl p-1"
      >
        <IoClose />
      </button>
    </li>
  );
};

const AdminEquipment = () => {
  const equipmentsQuery = useQuery(api.functions.getEquipments);
  const addEquipment = useMutation(api.functions.addEquipment);
  const removeEquipment = useMutation(api.functions.removeEquipment);
  const updateOrder = useMutation(api.functions.updateEquipmentOrder);

  const [form, setForm] = useState({ category: "Camera", name: "" });

  // 카테고리별 그룹화
  const groupedEquipments = useMemo(() => {
    const equipments = equipmentsQuery || [];
    return CATEGORIES
      .map((cat) => ({
        category: cat,
        items: equipments.filter((e) => e.category === cat),
      }))
      .filter((group) => group.items.length > 0);
  }, [equipmentsQuery]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEquipment(form);
    setForm({ ...form, name: "" });
  };

  const handleDragEnd = async (event, categoryItems) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categoryItems.findIndex((i) => i._id === active.id);
    const newIndex = categoryItems.findIndex((i) => i._id === over.id);
    const newOrder = arrayMove(categoryItems, oldIndex, newIndex);

    // 새로운 순서로 업데이트
    const updates = newOrder.map((item, index) => ({
      id: item._id,
      order: index,
    }));

    await updateOrder({ updates });
  };

  return (
    <div className="pt-24 min-h-screen bg-ode-navy flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-4">
          <h1 className="text-3xl font-serif font-bold text-blue-400">
            Equipment Manager
          </h1>
          <Link
            to="/admin"
            className="text-3xl text-white/50 hover:text-white transition-colors"
          >
            <IoClose />
          </Link>
        </div>

        {/* 입력 폼 */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mb-12 bg-white/5 p-6 rounded border border-white/10"
        >
          <div className="relative md:w-1/3">
            <select
              className="w-full appearance-none bg-white/5 border border-white/10 px-4 py-3 pr-10 rounded text-white text-sm font-mono outline-none focus:border-blue-500 cursor-pointer"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
          </div>
          <input
            placeholder="Equipment Name (e.g. ARRI ALEXA)"
            className="bg-white/5 border border-white/10 px-4 py-3 rounded text-white flex-1 outline-none focus:border-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 px-8 py-3 font-bold hover:bg-blue-500 transition rounded text-white shadow-lg"
          >
            ADD
          </button>
        </form>

        {/* 카테고리별 리스트 (드래그 앤 드롭) */}
        <div className="space-y-8 pb-20">
          {groupedEquipments.length > 0 ? (
            groupedEquipments.map((group) => (
              <div key={group.category}>
                <h2 className="text-xs font-mono text-blue-300 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
                  {group.category}
                </h2>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(e) => handleDragEnd(e, group.items)}
                >
                  <SortableContext
                    items={group.items.map((i) => i._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <SortableItem
                          key={item._id}
                          item={item}
                          onDelete={(id) => removeEquipment({ id })}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              </div>
            ))
          ) : (
            <div className="text-center opacity-30 py-16 font-mono">
              No equipment added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEquipment;
