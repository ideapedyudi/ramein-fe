import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useAuth } from "../context/authContext";
import brandLogo from "../assets/logobrand2.webp";

const inputClass =
  "mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base";
const typingPhrases = ["harimu", "ngebosenin", "#rameinaja"];

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
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTypedText(typingPhrases[0]);
      return undefined;
    }

    const currentPhrase = typingPhrases[typingIndex];
    let timeoutId;

    if (!isDeleting && typedText === currentPhrase) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typedText === "") {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setTypingIndex(
          (currentIndex) => (currentIndex + 1) % typingPhrases.length,
        );
      }, 200);
    } else {
      timeoutId = window.setTimeout(
        () => {
          setTypedText((currentText) => {
            const targetText = typingPhrases[typingIndex];
            return isDeleting
              ? targetText.slice(0, currentText.length - 1)
              : targetText.slice(0, currentText.length + 1);
          });
        },
        isDeleting ? 55 : 90,
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, typedText, typingIndex]);

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
      setError("Nama, email, nomor telepon, dan kata sandi wajib diisi.");
      return;
    }
    if (form.password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama.");
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
        navigate(user?.role === "admin" ? "/dashboard" : "/", {
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
        navigate(user?.role === "admin" ? "/dashboard" : "/", {
          replace: true,
        });
      } catch (err) {
        setError(err || "Daftar dengan Google gagal.");
      }
    },
    [googleAuth, navigate],
  );

  return (
    <main className="min-h-screen bg-[#eef3f1] text-[#232323]">
      <div className="grid min-h-screen w-full overflow-hidden bg-white md:grid-cols-[40%_60%]">
        <aside className="relative hidden min-h-[280px] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#0f766e_0%,#0f9f88_45%,#1b7f67_100%)] px-6 py-10 text-white md:flex md:min-h-full md:px-10">
          <div className="absolute inset-0 opacity-35">
            <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
          </div>

          <div className="relative flex flex-col items-center text-center">
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src={brandLogo}
                alt="Ramein"
                className="w-24 drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:w-28"
              />
              <div className="text-left leading-none">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                  <span className="bg-gradient-to-r from-white via-white to-amber-300 bg-clip-text text-transparent">
                    {typedText}
                  </span>
                  <span className="inline-block animate-pulse text-amber-200">
                    |
                  </span>
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/85 md:text-base">
              Buat akun untuk mulai eksplor event, tiket, dan pengalaman seru di
              Ramein.
            </p>
          </div>
        </aside>

        <section className="flex items-center justify-center bg-[#f7faf8] px-4 py-8 md:px-8 md:py-10">
          <div className="w-full max-w-xl rounded-[24px] border border-white/70 bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,118,110,0.08)] backdrop-blur md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2ea387]">
                Buat Akun Baru
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#1f2937] md:text-3xl">
                Mulai petualangan event kamu
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280] md:text-base">
                Daftar sekarang dan simpan semua event favoritmu.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <GoogleAuthButton
                disabled={isLoading}
                enableOneTap
                context="signup"
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
                Kata Sandi
                <input
                  type="password"
                  value={form.password}
                  onChange={update("password")}
                  placeholder="Minimal 8 karakter"
                  className={inputClass}
                />
              </label>
              <label className="block text-lg font-semibold text-[#2b2b2b] md:text-[16px]">
                Konfirmasi Kata Sandi
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={update("confirmPassword")}
                  placeholder="Ketik ulang kata sandi"
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

            <div className="mt-4 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#6e6e6e] transition-colors hover:bg-[#2ea387]/8 hover:text-[#2ea387] md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default RegisterPage;
