// components/MainPage.tsx
import React from "react";

type User = { name: string; code: string; expiryDate: string };

type Props = {
  user: User;
  onLogout: () => void;
};

export default function MainPage({ user, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-semibold">Xin chào, {user.name} 👋</h1>
        <div className="space-y-1 text-slate-200">
          <div>
            <span className="text-slate-400">Mã code: </span>
            <b>{user.code}</b>
          </div>
          <div>
            <span className="text-slate-400">Hạn dùng: </span>
            <b>{user.expiryDate}</b>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600 transition"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
