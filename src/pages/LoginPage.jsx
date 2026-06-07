import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { SAMPLE_CREDENTIALS, useAuth } from "../context/authContext";

const inputClass =
  "mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base";

function LoginPage() {
  const { isLoading, login, googleAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedPath = location.state?.from ?? null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigateAfterAuth = useCallback(
    (user) => {
      const adminOnly =
        requestedPath?.startsWith("/admin") || requestedPath === "/dashboard";
      const fallback = user.role === "admin" ? "/dashboard" : "/";
      const destination =
        requestedPath && !(adminOnly && user.role !== "admin")
          ? requestedPath
          : fallback;

      navigate(destination, { replace: true });
    },
    [navigate, requestedPath],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      const { user } = await login({ email, password });
      navigateAfterAuth(user);
    } catch (err) {
      setError(err || "Login gagal. Periksa email dan password.");
    }
  }

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setError("");
      try {
        const { user } = await googleAuth({ credential });
        navigateAfterAuth(user);
      } catch (err) {
        setError(err || "Login Google gagal.");
      }
    },
    [googleAuth, navigateAfterAuth],
  );

  function fillWith(creds) {
    setEmail(creds.email);
    setPassword(creds.password);
  }

  return (
    <AuthLayout
      title="Selamat Datang Kembali!"
      subtitle="Masuk ke akun Ramein kamu"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <GoogleAuthButton
          disabled={isLoading}
          enableOneTap
          context="signin"
          onCredential={handleGoogleCredential}
        />

        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#9d9d9d]">
          <span className="h-px flex-1 bg-[#eeeeee]" />
          atau
          <span className="h-px flex-1 bg-[#eeeeee]" />
        </div>

        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className={inputClass}
          />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className={inputClass}
          />
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="space-y-2 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 px-3 py-2.5 text-xs text-[#2b2b2b]">
          <p className="font-semibold uppercase tracking-wider text-emerald-700">
            User Test
          </p>
          <div className="flex items-center justify-between gap-2">
            <span>
              <span className="font-semibold">User</span> ·{" "}
              {SAMPLE_CREDENTIALS.user.email} /{" "}
              {SAMPLE_CREDENTIALS.user.password}
            </span>
            <button
              type="button"
              onClick={() => fillWith(SAMPLE_CREDENTIALS.user)}
              className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Isi
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm md:text-base">
          <label className="inline-flex items-center gap-2 font-semibold text-[#2b2b2b]">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[#d5d5d5] text-emerald-600 focus:ring-emerald-500"
            />
            Ingat saya
          </label>
          <a href="#" className="text-[#2ea387] hover:underline">
            Lupa password?
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full rounded-xl bg-[#2ea387] text-sm font-semibold text-white transition hover:bg-[#288f77] disabled:cursor-not-allowed disabled:opacity-70 md:h-11 md:text-base"
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-[#6f6f6f] md:text-sm">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#2ea387] hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
