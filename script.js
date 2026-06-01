// ===== $BITTEN — Backrooms Kitten =====
document.documentElement.classList.add("js");
const CA = "42hwVBvYP8FnDKBNDhoinyTB3hSLK6UzwCTDZr5ppump";

/* ---- boot screen ---- */
(function boot() {
  const boot = document.getElementById("boot");
  const btn = document.getElementById("enter-btn");
  const dismiss = () => {
    boot.classList.add("gone");
    document.body.style.overflow = "";
    setTimeout(() => boot.remove(), 900);
  };
  document.body.style.overflow = "hidden";
  btn.addEventListener("click", dismiss);
  // auto-dismiss as a fallback after 6s
  setTimeout(() => { if (document.body.contains(boot)) dismiss(); }, 6000);
})();

/* ---- copy to clipboard ---- */
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}
async function copyCA() {
  try {
    await navigator.clipboard.writeText(CA);
    showToast("Contract address copied 🩸");
  } catch {
    const t = document.createElement("textarea");
    t.value = CA; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); showToast("Contract address copied 🩸"); }
    catch { showToast("Copy failed — select manually"); }
    t.remove();
  }
}
["ca-pill", "ca-copy", "footer-ca"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", (e) => { e.stopPropagation(); copyCA(); });
});

/* ---- scroll reveal ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---- video timecode OSD ---- */
const vid = document.getElementById("evidence-video");
const osd = document.getElementById("osd-time");
if (vid && osd) {
  const fmt = (s) => {
    s = Math.floor(s);
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `00:${m}:${ss}`;
  };
  vid.addEventListener("timeupdate", () => { osd.textContent = fmt(vid.currentTime); });
}

/* ---- subtle parallax on hero kitten ---- */
const kittenWrap = document.querySelector(".kitten-wrap");
if (kittenWrap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
    kittenWrap.style.transform = `translate(${x}px, ${y}px)`;
  });
}
