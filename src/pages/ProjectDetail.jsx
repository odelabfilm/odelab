import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProjectView from "../components/ProjectView";
import { IoArrowBack } from "react-icons/io5";

const ProjectDetail = () => {
  // 1. 주소창에서 ID 가져오기 (예: /work/jq7...)
  const { id } = useParams();

  // 2. DB에서 데이터 가져오기 (단일 조회)
  // (getWorkById라는 함수를 새로 만들거나, 기존 리스트에서 찾거나 해야 함.
  // 효율성을 위해 단일 조회 함수를 functions.js에 추가하는 게 정석입니다.)

  // 일단은 전체를 가져와서 찾는 방식으로 먼저 연결하겠습니다.
  // (나중에 최적화 가능)
  const works = useQuery(api.functions.getWorks) || [];
  const project = works.find((w) => w._id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-ode-navy flex flex-col items-center justify-center text-white">
        <p className="mb-4 text-xl font-mono">Loading Project...</p>
        <Link
          to="/work"
          className="text-sm underline opacity-50 hover:opacity-100"
        >
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 뒤로가기 버튼 (상단에 띄움) */}
      <Link
        to="/work"
        className="fixed top-24 left-6 z-50 text-white/50 hover:text-white transition bg-black/20 p-2 rounded-full backdrop-blur-sm"
      >
        <IoArrowBack size={24} />
      </Link>

      {/* 디자인 컴포넌트 재활용 */}
      <ProjectView data={project} />
    </div>
  );
};

export default ProjectDetail;
