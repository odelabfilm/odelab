import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. 포트폴리오 (Works) 테이블
  works: defineTable({
    title: v.string(), // 제목 (예: SWEDEN LAUNDRY)
    category: v.string(), // 장르 (예: Music Video)
    year: v.string(), // 제작 연도 (예: 2026)

    // 상세 페이지용 데이터
    videoUrl: v.string(), // 메인 영상 주소 (Youtube/Vimeo)
    credits: v.optional(v.string()), // 크레딧 (줄바꿈이 포함된 긴 텍스트)
    description: v.optional(v.string()), // 작품 설명

    // 이미지 관련
    images: v.optional(v.array(v.string())), // 스틸컷 이미지들의 주소 리스트 (배열)
    imageUrl: v.optional(v.string()), // (옵션) 썸네일 전용 이미지가 필요할 경우를 대비해 남겨둠

    // 정렬
    order: v.optional(v.number()), // 정렬 순서 (드래그 앤 드롭용)
  }),

  // 2. 장비 (Equipments) 테이블
  equipments: defineTable({
    category: v.string(), // 카테고리 (Camera, Lens, Tripod...)
    name: v.string(), // 장비명 (예: ARRI ALEXA MINI)
    order: v.optional(v.number()), // 정렬 순서 (드래그 앤 드롭용)
  }).index("by_category", ["category"]),
});
