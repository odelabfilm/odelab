import React, { useState, useEffect } from "react";
import { IoLockClosed } from "react-icons/io5";

// 비밀번호 설정 (원하는 비밀번호로 변경하세요)
const ADMIN_PASSWORD = "0212";

const AdminAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 로드 시 인증 상태 확인
  useEffect(() => {
    const authToken = sessionStorage.getItem("adminAuth");
    if (authToken === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "authenticated");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("비밀번호가 틀렸습니다.");
      setPassword("");
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-ode-navy flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // 인증되지 않은 경우 비밀번호 입력 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ode-navy flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <IoLockClosed className="text-2xl text-white/60" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">
              Admin Access
            </h1>
            <p className="text-white/40 text-sm mt-2">
              관리자 비밀번호를 입력하세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-blue-500 transition text-center tracking-widest"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition"
            >
              Enter
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-8">
            Ode Lab Admin Panel
          </p>
        </div>
      </div>
    );
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return children;
};

export default AdminAuth;
