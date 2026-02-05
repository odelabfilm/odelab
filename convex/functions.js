import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- [Work] ---
export const getWorks = query({
  handler: async (ctx) => {
    const works = await ctx.db.query("works").collect();
    // order 필드 기준 정렬 (없으면 맨 뒤로, 최신순)
    return works.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  },
});

export const addWork = mutation({
  // 바뀐 스키마에 맞춰서 입력값 정의도 수정
  args: {
    title: v.string(),
    category: v.string(),
    year: v.string(),
    videoUrl: v.string(),
    credits: v.optional(v.string()),
    description: v.optional(v.string()),
    images: v.optional(v.array(v.string())), // 배열 형태 추가
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("works", args);
  },
});

export const removeWork = mutation({
  args: { id: v.id("works") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// --- [Equipment] ---
export const getEquipments = query({
  handler: async (ctx) => {
    const equipments = await ctx.db.query("equipments").collect();
    // order 필드 기준 정렬 (없으면 맨 뒤로)
    return equipments.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  },
});

export const addEquipment = mutation({
  args: { category: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    // 같은 카테고리의 마지막 순서 찾기
    const existing = await ctx.db.query("equipments").collect();
    const sameCategory = existing.filter((e) => e.category === args.category);
    const maxOrder = sameCategory.reduce(
      (max, e) => Math.max(max, e.order ?? 0),
      0
    );
    await ctx.db.insert("equipments", { ...args, order: maxOrder + 1 });
  },
});

export const removeEquipment = mutation({
  args: { id: v.id("equipments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// 장비 순서 일괄 업데이트 (드래그 앤 드롭용)
export const updateEquipmentOrder = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("equipments"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const update of args.updates) {
      await ctx.db.patch(update.id, { order: update.order });
    }
  },
});

// 작품 수정하기 (Update)
export const updateWork = mutation({
  args: {
    id: v.id("works"), // 수정할 작품의 ID 필수
    title: v.string(),
    category: v.string(),
    year: v.string(),
    videoUrl: v.string(),
    credits: v.optional(v.string()),
    description: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    // patch: 일부 필드만 수정 (여기선 전체를 덮어씀)
    await ctx.db.patch(id, fields);
  },
});

// 작품 순서 일괄 업데이트 (드래그 앤 드롭용)
export const updateWorkOrder = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("works"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const update of args.updates) {
      await ctx.db.patch(update.id, { order: update.order });
    }
  },
});
