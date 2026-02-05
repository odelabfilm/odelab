import React from "react";

const Footer = () => {
  return (
    <footer className="bg-ode-navy border-t border-white/5 py-12 mt-auto">
      {/* flex-col: 세로로 배치
         items-center: 가로 가운데 정렬
         text-center: 텍스트 가운데 정렬
         gap-1: 줄 간격 살짝 띄우기
      */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-1 text-[10px] font-mono uppercase tracking-widest">
        {/* 1단락: 상호명 (White 50%) */}
        <div className="text-white/50 font-bold">Ode Lab.</div>

        {/* 2단락: 사업자 번호 (White 50%) */}
        <div className="text-white/50 mb-2">Business License: 856-04-03484</div>

        {/* 3단락: 카피라이트 (White 80% - 더 밝게) */}
        <div className="text-white/80">
          © 2026 Ode Lab. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
