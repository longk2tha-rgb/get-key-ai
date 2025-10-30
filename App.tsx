import React, { useState, useCallback, FormEvent } from "react";

/** ====== Kiểu dữ liệu ====== */
// Nếu bạn đã có `types.ts`, có thể dùng import thay cho interface dưới đây:
// import type { User } from "./types";
interface User {
  name: string;
  code: string;
  expiryDate: string; // dạng "dd/mm/yyyy"
}

/** ====== Dữ liệu tạm (thay bằng dữ liệu thật của bạn) ======
 * Sau này bạn có thể thay bằng:  import { USERS } from "./data/users";
 * và xóa khối USERS tạm này đi.
 */
const USERS: User[] = [
  { name: "Nguyen Van A", code: "A123", expiryDate: "31/12/2025" },
  { name: "Tran Thi B", code: "B456", expiryDate: "31/12/2025" },
];

/** ====== Helpers ngày tháng ====== */
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

const isExpired = (expiryDateStr: string): boolean => {
  const expiryDate = parseDate(expiryDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expiryDate < today;
};

/** ====== LoginPage (tự chứa) ====== */
type LoginProps = { onLogin: (name: string, code: string) => string | null };
const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = onLogin(name, code);
    setError(msg);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 bg-slate-800 p-6 rounded-xl"
      >
        <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
        <div className="space-y-2">
          <label className="block text-sm">Họ và tên</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
            placeholder="VD: Nguyen Van A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Mã code</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
            placeholder="VD: A123"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="one-time-code"
          />
        </div>
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 rounded bg-indigo-500 hover:bg-indigo-600 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

/** ====== MainPage (tự chứa) ====== */
type MainProps = { user: User; onLogout: () => void };
const MainPage: React.FC<MainProps> = ({ user, onLogout }) => {
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
};

/** ====== App ====== */
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = useCallback((name: string, code: string): string | null => {
    const user = USERS.find(
      (u) =>
        u.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        u.code.trim().toLowerCase() === code.trim().toLowerCase()
    );

    if (!user) return "Họ và tên hoặc Mã code không chính xác.";
    if (isExpired(user.expiryDate)) return "Mã code của bạn đã hết hạn.";

    setCurrentUser(user);
    return null;
  }, []);

  const handleLogout = useCallback(() => setCurrentUser(null), []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {currentUser ? (
        <MainPage user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
