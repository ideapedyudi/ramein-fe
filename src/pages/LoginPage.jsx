import confetti from "canvas-confetti";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { SAMPLE_CREDENTIALS, useAuth } from "../context/authContext";
import brandLogo from "../assets/logobrand2.webp";

const inputClass =
  "mt-2 h-10 w-full rounded-xl border border-[#f0f0f0] bg-[#f5f5f5] px-4 text-sm text-[#333333] outline-none placeholder:text-[#9d9d9d] focus:border-emerald-300 md:h-11 md:text-base";

const loginConfettiColors = ["#0a7c6e", "#2fa084", "#46b994", "#ffc94d", "#ffd770"];
const loginConfettiDurationMs = 1400;
const typingPhrases = ["harimu", "ngebosenin", "#rameinaja"];

function fireLoginConfetti() {
  if (typeof window === "undefined") return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const defaults = {
    colors: loginConfettiColors,
    disableForReducedMotion: true,
    shapes: ["square", "circle", "star"],
    ticks: 240,
    zIndex: 90,
  };

  const fireSideCannon = (originX, angle, drift) => {
    confetti({
      ...defaults,
      angle,
      decay: 0.91,
      drift,
      origin: { x: originX, y: 0.82 },
      particleCount: 28,
      scalar: 0.85,
      spread: 54,
      startVelocity: 44,
    });
  };

  fireSideCannon(0, 58, 0.35);
  fireSideCannon(1, 122, -0.35);

  const animationEnd = Date.now() + loginConfettiDurationMs;
  const intervalId = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      window.clearInterval(intervalId);
      return;
    }

    const progress = timeLeft / loginConfettiDurationMs;
    const particleCount = Math.round(16 * progress);

    fireSideCannon(0, 60, 0.45);
    fireSideCannon(1, 120, -0.45);
    if (particleCount > 0) {
      confetti({
        ...defaults,
        angle: 62,
        decay: 0.93,
        drift: 0.25,
        origin: { x: 0, y: 0.64 },
        particleCount,
        scalar: 0.68,
        spread: 44,
        startVelocity: 22,
      });
      confetti({
        ...defaults,
        angle: 118,
        decay: 0.93,
        drift: -0.25,
        origin: { x: 1, y: 0.64 },
        particleCount,
        scalar: 0.68,
        spread: 44,
        startVelocity: 22,
      });
    }
  }, 420);

  window.setTimeout(() => window.clearInterval(intervalId), loginConfettiDurationMs + 100);
}

function LoginPage() {
  const { isLoading, login, googleAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedPath = location.state?.from ?? null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        setTypingIndex((currentIndex) => (currentIndex + 1) % typingPhrases.length);
      }, 200);
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedText((currentText) => {
          const targetText = typingPhrases[typingIndex];
          return isDeleting
            ? targetText.slice(0, currentText.length - 1)
            : targetText.slice(0, currentText.length + 1);
        });
      }, isDeleting ? 55 : 90);
    }

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, typedText, typingIndex]);

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
      setError("Email dan kata sandi wajib diisi.");
      return;
    }

    try {
      const { user } = await login({ email, password });
      fireLoginConfetti();
      navigateAfterAuth(user);
    } catch (err) {
      setError(err || "Masuk gagal. Periksa email dan kata sandi.");
    }
  }

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setError("");
      try {
        const { user } = await googleAuth({ credential });
        fireLoginConfetti();
        navigateAfterAuth(user);
      } catch (err) {
        setError(err || "Masuk dengan Google gagal.");
      }
    },
    [googleAuth, navigateAfterAuth],
  );

  function fillWith(creds) {
    setEmail(creds.email);
    setPassword(creds.password);
  }

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
                  <span className="inline-block animate-pulse text-amber-200">|</span>
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/85 md:text-base">
              Masuk untuk lanjut eksplor event, tiket, dan pengalaman seru di Ramein.
            </p>
          </div>
        </aside>

        <section className="flex items-center justify-center bg-[#f7faf8] px-4 py-8 md:px-8 md:py-10">
          <div className="w-full max-w-xl rounded-[24px] border border-white/70 bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,118,110,0.08)] backdrop-blur md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2ea387]">
                Selamat Datang Kembali
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#1f2937] md:text-3xl">
                Masuk ke akun Ramein
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280] md:text-base">
                Lanjutkan ke dashboard dan simpan semua event favoritmu.
              </p>
            </div>

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
                Kata Sandi
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
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
                  Akun Uji Coba
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span>
                    <span className="font-semibold">Pengguna</span> ·{" "}
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
                  Lupa kata sandi?
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

export default LoginPage;
