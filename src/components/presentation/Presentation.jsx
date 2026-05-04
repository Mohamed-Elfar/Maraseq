import { useState, useEffect, useCallback, useRef } from "react";
import { slidesConfig } from "./slidesData";
import ParticleCanvas from "./ParticleCanvas";

const TOTAL = slidesConfig.length;

/* ── Gradient Mesh ── */
function GradientMesh({ blobs }) {
  return (
    <div className="gradient-mesh">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="blob"
          style={{
            width: b.width, height: b.height,
            top: b.top, bottom: b.bottom, left: b.left, right: b.right,
            background: b.background, opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Deco Shapes ── */
function DecoShapes({ shapes }) {
  if (!shapes) return null;
  return (
    <>
      {shapes.map((s, i) => (
        <div
          key={i}
          className="deco-shape"
          data-speed={s.speed}
          style={{
            width: s.width, height: s.height,
            top: s.top, bottom: s.bottom, left: s.left, right: s.right,
            background: s.background,
          }}
        />
      ))}
    </>
  );
}

/* ── Hero Mark ── */
function HeroMark({ size = "default" }) {
  const isLarge = size === "large";
  const markStyle = isLarge ? { width: 260, height: 260, margin: 0 } : undefined;
  return (
    <div className="hero-mark" style={markStyle}>
      <div className="hero-core" style={isLarge ? { width: 120, height: 120 } : undefined}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`path-line path${i}`} style={isLarge ? { width: 88 } : undefined} />
        ))}
      </div>
    </div>
  );
}

/* ── Slide Content Components ── */
function Slide1() {
  return (
    <div className="content pres-text-center">
      <div className="reveal"><HeroMark /></div>
      <p className="section-kicker reveal pres-mb-4">MARASEQ GROUP</p>
      <h1 className="pres-font-display pres-title-hero pres-font-bold pres-text-white pres-tracking-tight reveal">
        مَراسِق
      </h1>
      <p className="pres-title-sub pres-text-secondary reveal pres-mt-4">Brand Presentation</p>
      <p className="pres-title-tagline pres-text-muted pres-tracking-4 pres-uppercase reveal pres-mt-4">
        نبادر • نرافق • نتطور
      </p>
    </div>
  );
}

function Slide2() {
  return (
    <div className="content">
      <p className="section-kicker reveal pres-mb-5">جوهر البراند</p>
      <div className="pres-grid pres-grid-cols-2 pres-gap-10 pres-items-center">
        <div>
          <h2 className="pres-font-display pres-title-h2 pres-font-bold reveal pres-mb-6">من الخيارات إلى المسارات</h2>
          <p className="pres-text-2xl pres-text-secondary pres-leading-relaxed reveal quote-line pres-pr-6">
            مراسق براند يعمل في الاستثمار والتسويق العقاري بهدف تطوير الفرص وخلق قيمة مستدامة داخل السوق العقاري.
          </p>
          <p className="pres-text-xl pres-text-muted pres-leading-relaxed reveal pres-mt-6">
            الفكرة المحورية للهوية هي تحويل تعدد الخيارات العقارية إلى مسارات واضحة تساعد العميل على الفهم واتخاذ القرار بثقة.
          </p>
        </div>
        <div className="glass pres-p-10 reveal">
          <div className="ring pres-mx-auto pres-mb-8"><strong>وضوح</strong></div>
          <div className="pres-grid pres-grid-cols-1 pres-gap-4 pres-text-lg pres-text-secondary">
            <div className="point-card glass pres-p-4">المفهوم: تبسيط المشهد العقاري المعقد</div>
            <div className="point-card glass pres-p-4">الدور: مرافقة العميل في رحلة الاستثمار</div>
            <div className="point-card glass pres-p-4">النتيجة: قرار أوضح وقيمة أكثر استدامة</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="content">
      <p className="section-kicker reveal pres-mb-5">الأساس الاستراتيجي</p>
      <h2 className="pres-font-display pres-title-h2-sm pres-font-bold reveal pres-mb-8">الغاية والرؤية والرسالة</h2>
      <div className="pres-grid pres-grid-cols-3 pres-gap-6 pres-mt-6">
        {[
          { label: "Brand Purpose", title: "تبسيط الفرص", desc: "تبسيط فهم الفرص في السوق العقاري وتحويل الخيارات المتعددة إلى مسارات واضحة قابلة للاستكشاف والتطوير." },
          { label: "Vision", title: "ثقة وقيمة", desc: "أن تصبح مراسق علامة موثوقة في تطوير الفرص والاستثمارات العقارية وتساهم في خلق قيمة مستدامة داخل السوق." },
          { label: "Mission", title: "حلول مرنة", desc: "اكتشاف الفرص العقارية المختلفة وتقديم حلول مرنة تساعد على فهم السوق وتطوير الإمكانات الاستثمارية المتاحة." },
        ].map((v) => (
          <div key={v.label} className="glass pres-p-7 value-card reveal">
            <p className="pres-text-sm pres-uppercase pres-tracking-wide pres-text-muted pres-mb-4">{v.label}</p>
            <h3 className="pres-text-2xl pres-font-bold pres-text-accent-1 pres-mb-4">{v.title}</h3>
            <p className="pres-text-lg pres-leading-relaxed pres-text-secondary">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide4() {
  return (
    <div className="content pres-text-center">
      <p className="section-kicker reveal pres-mb-5">القيم</p>
      <h2 className="pres-font-display pres-title-h2-lg pres-font-bold reveal pres-mb-4">نبادر • نرافق • نتطور</h2>
      <p className="pres-text-xl pres-text-secondary reveal pres-mb-10">ثلاث ركائز تصنع الشخصية والسلوك والنبرة البصرية للهوية.</p>
      <div className="pres-grid pres-grid-cols-3 pres-gap-6 pres-text-right">
        {[
          { num: "01", title: "نبادر", desc: "العلامة تبحث عن الإمكانات الجديدة وتحوّلها إلى فرص قابلة للنمو داخل السوق العقاري." },
          { num: "02", title: "نرافق", desc: "المرافقة تمثل جوهر اسم مراسق؛ شراكة ودعم مستمر طوال رحلة الاستثمار." },
          { num: "03", title: "نتطور", desc: "التطور المستمر هو أساس النجاح في سوق متغير، لذلك تنمو الأفكار مع نمو الفرص." },
        ].map((v) => (
          <div key={v.num} className="glass pres-p-8 value-card reveal">
            <div className="pres-text-4xl pres-mb-4">{v.num}</div>
            <h3 className="pres-text-3xl pres-font-bold pres-text-accent-1 pres-mb-4">{v.title}</h3>
            <p className="pres-text-lg pres-leading-relaxed pres-text-secondary">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div className="content">
      <div className="pres-grid pres-grid-cols-2 pres-gap-12 pres-items-center">
        <div className="glass pres-p-10 reveal">
          <p className="section-kicker pres-mb-4">الشخصية</p>
          <h2 className="pres-font-display pres-title-h2-sm pres-font-bold pres-mb-6">احترافية واضحة ومرنة</h2>
          <p className="pres-text-xl pres-text-secondary pres-leading-relaxed pres-mb-6">شخصية مراسق تجمع بين الوضوح والمرونة والطموح، وتظهر كبراند يقدّم فهمًا عمليًا وفرصًا قابلة للتطوير.</p>
          <div className="pres-grid pres-grid-cols-2 pres-gap-4 pres-mt-6 pres-text-lg">
            {["احترافي", "واضح", "مرن", "طموح"].map((tag) => (
              <div key={tag} className="glass pres-p-4 point-card">{tag}</div>
            ))}
          </div>
        </div>
        <div className="glass pres-p-10 reveal">
          <p className="section-kicker pres-mb-4">Tone of Voice</p>
          <h3 className="pres-text-3xl pres-font-bold pres-text-accent-1 pres-mb-6">لغة بسيطة بمظهر واثق</h3>
          <div className="pres-grid pres-grid-cols-1 pres-gap-4 pres-text-lg pres-text-secondary">
            <div className="point-card glass pres-p-4">تواصل واضح ومهني</div>
            <div className="point-card glass pres-p-4">أفكار مباشرة ومفهومة</div>
            <div className="point-card glass pres-p-4">موازنة بين البساطة والاحترافية</div>
            <div className="point-card glass pres-p-4">نبرة تبني الثقة لا التعقيد</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide6() {
  return (
    <div className="content pres-text-center">
      <p className="section-kicker reveal pres-mb-5">قصة البراند</p>
      <h2 className="pres-font-display pres-title-h2-xl pres-font-bold reveal pres-mb-8">حين يصبح القرار أوضح</h2>
      <div className="glass pres-p-12 pres-max-w-900 pres-mx-auto reveal">
        <p className="pres-title-quote pres-leading-relaxed pres-text-secondary">في سوق مليء بالخيارات العقارية، لا تكمن المشكلة في نقص الفرص، بل في وضوح القرار. جاءت مراسق لتحوّل التعقيد إلى وضوح، والفرص إلى مسارات يمكن فهمها وتطويرها بثقة.</p>
      </div>
    </div>
  );
}

function Slide7() {
  return (
    <div className="content">
      <p className="section-kicker reveal pres-mb-5">Logo Concept</p>
      <div className="pres-grid pres-grid-cols-2 pres-gap-10 pres-items-center">
        <div className="glass pres-p-10 reveal pres-flex pres-place-items-center pres-slide-hero-box">
          <HeroMark size="large" />
        </div>
        <div>
          <h2 className="pres-font-display pres-title-h2 pres-font-bold reveal pres-mb-6">المسارات تلتقي في مركز واحد</h2>
          <p className="pres-text-xl pres-text-secondary pres-leading-relaxed reveal pres-mb-6">استُلهم الشعار من مسارات متعددة تلتقي في نقطة مركزية، في إشارة إلى تنوع الخيارات الاستثمارية التي يواجهها العميل.</p>
          <div className="pres-grid pres-grid-cols-1 pres-gap-4 pres-text-lg pres-text-secondary">
            {["الحركة الدائرية تعكس الاستمرارية والترابط", "الفراغ الداخلي يرمز لتحويل الخيارات إلى قرار واضح", "الرمز النصي والأيقوني يعملان معًا كنظام هوية متكامل"].map((p, i) => (
              <div key={i} className="glass pres-p-4 point-card reveal">{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide8() {
  return (
    <div className="content">
      <p className="section-kicker reveal pres-mb-5">النظام البصري</p>
      <h2 className="pres-font-display pres-title-h2-sm pres-font-bold reveal pres-mb-8">هوية بسيطة بطابع احترافي</h2>
      <div className="pres-grid pres-grid-cols-3 pres-gap-6">
        {[
          { title: "الألوان", desc: "نظام لوني يعكس الثقة والاستقرار والاحترافية، ويضمن حضورًا ثابتًا عبر مختلف التطبيقات البصرية." },
          { title: "الخطوط", desc: "خطوط عربية وإنجليزية واضحة تدعم بساطة الرسالة وتعزز اتساق التواصل البصري." },
          { title: "الاستخدام", desc: "الحفاظ على وضوح الشعار وتناسق الألوان والخطوط في كل المواد التسويقية لضمان ثبات الهوية." },
        ].map((s) => (
          <div key={s.title} className="glass pres-p-8 service-card reveal">
            <h3 className="pres-text-2xl pres-font-bold pres-text-accent-1 pres-mb-4">{s.title}</h3>
            <p className="pres-text-lg pres-leading-relaxed pres-text-secondary">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide9() {
  return (
    <div className="content">
      <p className="section-kicker reveal pres-mb-5">الخدمات</p>
      <h2 className="pres-font-display pres-title-h2-sm pres-font-bold reveal pres-mb-8">كيف تتحول الفكرة إلى قيمة</h2>
      <div className="pres-grid pres-grid-cols-3 pres-gap-6">
        {[
          { letter: "A", title: "الاستثمار العقاري", desc: "دراسة وتطوير فرص استثمارية في السوق العقاري وبناء شراكات مع المستثمرين." },
          { letter: "B", title: "التسويق العقاري", desc: "تسويق المشروعات العقارية والتواصل مع العملاء والمستثمرين بصورة واضحة واحترافية." },
          { letter: "C", title: "تطوير الفرص", desc: "استكشاف الفرص العقارية وبناء شراكات مع مطورين ومستثمرين لتحويل الإمكانات إلى مشاريع." },
        ].map((s) => (
          <div key={s.letter} className="glass pres-p-8 service-card reveal">
            <div className="pres-text-4xl pres-mb-4">{s.letter}</div>
            <h3 className="pres-text-2xl pres-font-bold pres-text-accent-1 pres-mb-4">{s.title}</h3>
            <p className="pres-text-lg pres-text-secondary pres-leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide10() {
  return (
    <div className="content pres-text-center">
      <p className="section-kicker reveal pres-mb-5">الختام</p>
      <h2 className="pres-font-display pres-title-hero-end pres-font-bold pres-text-white reveal pres-mb-6">حيث تبدأ الفرص</h2>
      <p className="pres-title-end-sub pres-text-secondary reveal pres-mb-4">مراسق ليست مجرد علامة عقارية، بل نظام بصري ومعنوي يحوّل التعقيد إلى مسار واضح.</p>
      <p className="pres-text-lg pres-text-muted reveal">Qotur, Tanta, Gharbia Governorate, Egypt • www.marseqgroup.com</p>
    </div>
  );
}

const SLIDE_COMPONENTS = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

/* ── Main Presentation ── */
export default function Presentation({ onClose }) {
  const [current, setCurrent] = useState(1);
  const [closing, setClosing] = useState(false);
  const deckRef = useRef(null);
  const spotlightRef = useRef(null);
  const rootRef = useRef(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => { if (onClose) onClose(); }, 300);
  }, [onClose]);

  const animateSlide = useCallback((slideIndex) => {
    const root = rootRef.current;
    if (!root) return;
    const slideEl = root.querySelector(`.slide[data-slide="${slideIndex}"]`);
    if (!slideEl) return;
    const reveals = slideEl.querySelectorAll(".reveal");
    reveals.forEach((el, i) => {
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.offsetHeight; // reflow
      const delay = i * 0.08;
      el.style.transition = `opacity .35s ease ${delay}s, transform .35s ease ${delay}s`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    });
  }, []);

  const goToSlide = useCallback((n) => {
    setCurrent(n);
    requestAnimationFrame(() => animateSlide(n));
  }, [animateSlide]);

  const changeSlide = useCallback((dir) => {
    let next = current + dir;
    if (next < 1) next = TOTAL;
    if (next > TOTAL) next = 1;
    goToSlide(next);
  }, [current, goToSlide]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") { handleClose(); return; }
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); changeSlide(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); changeSlide(-1); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [changeSlide, handleClose]);

  // Touch
  useEffect(() => {
    let startX = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; };
    const onEnd = (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
    };
    document.addEventListener("touchstart", onStart);
    document.addEventListener("touchend", onEnd);
    return () => { document.removeEventListener("touchstart", onStart); document.removeEventListener("touchend", onEnd); };
  }, [changeSlide]);

  // Spotlight
  useEffect(() => {
    const handler = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(216,180,122,0.06), transparent 40%)`;
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  // Parallax
  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const handler = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", handler);
    let animId;
    const tick = () => {
      const ox = (mx - cx) / cx, oy = (my - cy) / cy;
      const root = rootRef.current;
      if (root) {
        root.querySelectorAll(".deco-shape").forEach((shape) => {
          const speed = parseFloat(shape.dataset.speed || "0.03");
          shape.style.transform = `translate(${ox * speed * 100}px, ${oy * speed * 100}px)`;
        });
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { document.removeEventListener("mousemove", handler); cancelAnimationFrame(animId); };
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Animate first slide
  useEffect(() => { animateSlide(1); }, [animateSlide]);

  return (
    <div ref={rootRef} className={`presentation-root${closing ? " pres-closing" : ""}`}>
      <div ref={spotlightRef} className="mouse-spotlight" />

      <button className="pres-close-btn" onClick={handleClose} aria-label="Close presentation">✕</button>

      <div ref={deckRef} className="deck">
        {slidesConfig.map((config, idx) => {
          const SlideContent = SLIDE_COMPONENTS[idx];
          const slideNum = idx + 1;
          return (
            <div key={config.id} className={`slide slide-${slideNum}${current === slideNum ? " active" : ""}`} data-slide={slideNum}>
              <GradientMesh blobs={config.blobs} />
              <DecoShapes shapes={config.decoShapes} />
              {config.hasParticles && <ParticleCanvas interactive={true} count={55} />}
              {config.hasAmbientParticles && <ParticleCanvas interactive={false} count={18} />}
              <SlideContent />
            </div>
          );
        })}
      </div>

      <div className="nav-controls">
        <button className="nav-btn" aria-label="Previous slide" onClick={() => changeSlide(-1)}>‹</button>
        <div className="slide-dots">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div key={i} className={`dot${current === i + 1 ? " active" : ""}`} onClick={() => goToSlide(i + 1)} />
          ))}
        </div>
        <button className="nav-btn" aria-label="Next slide" onClick={() => changeSlide(1)}>›</button>
        <span className="slide-counter">{current} / {TOTAL}</span>
      </div>
    </div>
  );
}
