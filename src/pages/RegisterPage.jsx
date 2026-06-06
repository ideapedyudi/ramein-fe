import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useAuth } from "../context/authContext";

const inputClass =
  "mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base";

function RegisterPage() {
  const { isLoading, register, googleAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");

  function update(field) {
    return (e) => {
      const value = field === "agree" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Nama, email, nomor telepon, dan password wajib diisi.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    if (!form.agree) {
      setError(
        "Kamu harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.",
      );
      return;
    }

    try {
      const { user, accessToken } = await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      if (accessToken) {
        navigate(user?.role === "admin" ? "/dashboard" : "/home", {
          replace: true,
        });
        return;
      }

      navigate("/login", { replace: true });
    } catch (err) {
      setError(err || "Registrasi gagal. Coba lagi.");
    }
  }

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setError("");
      try {
        const { user } = await googleAuth({ credential });
        navigate(user?.role === "admin" ? "/dashboard" : "/home", {
          replace: true,
        });
      } catch (err) {
        setError(err || "Registrasi Google gagal.");
      }
    },
    [googleAuth, navigate],
  );

  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Mulai petualangan event kamu bersama Ramein"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <GoogleAuthButton
          disabled={isLoading}
          onCredential={handleGoogleCredential}
        />

        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#9d9d9d]">
          <span className="h-px flex-1 bg-[#eeeeee]" />
          atau
          <span className="h-px flex-1 bg-[#eeeeee]" />
        </div>

        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Nama Lengkap
          <input
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="Masukkan nama lengkap"
            className={inputClass}
          />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Email
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="nama@email.com"
            className={inputClass}
          />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Nomor Telepon
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="0812 3456 7890"
            className={inputClass}
          />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Password
          <input
            type="password"
            value={form.password}
            onChange={update("password")}
            placeholder="Minimal 8 karakter"
            className={inputClass}
          />
        </label>
        <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
          Konfirmasi Password
          <input
            type="password"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            placeholder="Ketik ulang password"
            className={inputClass}
          />
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="flex items-start gap-3 pt-1 text-xs leading-tight text-[#666666] md:text-sm">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={update("agree")}
            className="mt-2 h-5 w-5 rounded border-[#d5d5d5] text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Saya setuju dengan{" "}
            <a
              href="#"
              className="font-semibold text-[#2ea387] hover:underline"
            >
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a
              href="#"
              className="font-semibold text-[#2ea387] hover:underline"
            >
              Kebijakan Privasi
            </a>
          </span>
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full rounded-xl bg-[#2ea387] text-sm font-semibold text-white transition hover:bg-[#288f77] disabled:cursor-not-allowed disabled:opacity-70 md:h-11 md:text-base"
        >
          {isLoading ? "Memproses..." : "Daftar"}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-[#6f6f6f] md:text-sm">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#2ea387] hover:underline"
        >
          Masuk
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
