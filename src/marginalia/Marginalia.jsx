import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import "./tokens.css";
import "./Marginalia.css";
import "./ActivationGate.css";
import { useLenis } from "./hooks/useLenis";

const assetPath = (path) => `${import.meta.env.BASE_URL}assets/exhibition/${path}`;

const CHAPTERS = [
  { id: "opening", number: "00", label: "Opening" },
  { id: "chapter-01", number: "01", label: "废墟不是终点" },
  { id: "chapter-02", number: "02", label: "材料在继续发生" },
  { id: "chapter-03", number: "03", label: "谁决定何时停止" },
  { id: "epilogue", number: "04", label: "Epilogue" },
  { id: "experiment", number: "05", label: "AI Experiment" },
];

const MATERIALS = [
  ["ASH", "灰烬", "燃烧后的残留，也是物质进入另一状态的证据。"],
  ["STRAW", "稻草", "会脆化、断裂，并从画面表面持续脱落。"],
  ["LEAD", "铅", "沉重、可塑，也会氧化并留下新的表面。"],
  ["EARTH", "土", "覆盖残骸，也把历史重新拉回地面。"],
  ["THORN", "荆棘", "真实植物结构进入作品，也进入现实的衰变。"],
  ["BURNT BOOK", "烧毁的书", "毁坏的物质本身成为作品，而非毁坏的图像。"],
  ["SUNFLOWER", "向日葵", "停止生长，却仍以真实材料继续变化。"],
];

const CASES = [
  { number: "CR–01", title: "Maikäfer flieg!", status: "ACTIVE MONITORING", note: "表面清洁与不稳定颜料层加固仍然会发生。承认作品具有变化的时间性，并不等于完全拒绝干预。", decision: "STABILISE" },
  { number: "CR–02", title: "ORIGINAL?", status: "STATE UNRESOLVED", note: "作品经历艺术家、工作室助手或修复人员的调整后，‘恢复原状’不再是一句简单的技术要求。原状是哪一个状态？", decision: "RESEARCH" },
  { number: "CR–03", title: "Organic Matter", status: "BIOLOGICAL RISK", note: "虫害不会因为材料属于艺术品而停止。有机物也不会因为进入美术馆而失去衰变的能力。", decision: "INTERVENE" },
];

const WORKS_ATLAS = [
  { title: "Nigredo — Morgenthau", year: "YEAR NOT VERIFIED", image: assetPath("works/nigredo-morgenthau.jpg"), format: "LANDSCAPE / BLACK FIELD" },
  { title: "Die Krähen (The Crows)", year: "2019", image: assetPath("works/die-krahen.jpg"), format: "PANORAMA / STRAW FIELD" },
  { title: "Tyche", year: "2024", image: assetPath("works/tyche.jpg"), format: "FIGURE / MATERIAL FIELD" },
  { title: "Klytia und Leukothoe", year: "2025", image: assetPath("works/klytia-und-leukothoe.jpg"), format: "GREEN / GOLD SURFACE" },
  { title: "Winter Landscape", year: "YEAR NOT VERIFIED", image: assetPath("works/winter-landscape.jpg"), format: "EARLY WORK / PAPER" },
];

const LAB_NOTES = [
  { status: "FAILURE 01", title: "衰败只停留在表面", image: assetPath("lab/failed-scene.jpg"), note: "场景和物体仍然完整，变化主要表现为画风与旧化；材料没有真正改变结构。", verdict: "WEATHERED SCENE" },
  { status: "FAILURE 02", title: "物体身份被碎片取代", image: assetPath("lab/failed-material.jpg"), note: "局部材料感很强，但来源结构几乎消失，结果更像独立的纹理拼贴。", verdict: "IDENTITY LOST" },
  { status: "ACCEPTED 03", title: "地面先于物体成立", image: assetPath("lab/success.jpg"), note: "连续的材料地面成为主体；枝条、灰烬感与残留结构被嵌入，而不是摆放在画面上。", verdict: "GROUND FIRST" },
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 36 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function ChapterHeading({ number, en, children, dark = false }) {
  return (
    <Reveal className={`chapter-heading ${dark ? "chapter-heading--dark" : ""}`}>
      <div className="chapter-heading__meta"><span>Chapter {number}</span><span>{en}</span></div>
      <h2>{children}</h2>
    </Reveal>
  );
}

function WorkLabel({ number, title, zh, year }) {
  return <div className="work-label"><span>Work {number}</span><div><strong>{title}</strong><span>{zh} · {year}</span></div></div>;
}

function SideIndex({ active }) {
  return (
    <nav className="side-index" aria-label="展览章节">
      <span className="side-index__title">INDEX</span>
      {CHAPTERS.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} className={active === chapter.id ? "is-active" : ""}><span>{chapter.number}</span><em>{chapter.label}</em></a>)}
    </nav>
  );
}

export default function Marginalia() {
  useLenis();
  const [active, setActive] = useState("opening");
  const [comparison, setComparison] = useState(0);
  const [studyState, setStudyState] = useState("READY");
  const [activeStep, setActiveStep] = useState(0);
  const [visitorImage, setVisitorImage] = useState(null);
  const [visitorFileName, setVisitorFileName] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const heroScale = useTransform(scrollYProgress, [0, 0.13], [1.08, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.38]);

  useEffect(() => {
    document.title = "给艺术品衰败的机会｜Anselm Kiefer";
    const description = "Anselm Kiefer: Matter, Ruin and Transformation — 关于材料变化、艺术保存与修复判断的线上展览。";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
  }, []);

  const loadStudy = () => {
    setStudyState("STUDY LOADED");
    setActiveStep(2);
    setComparison(56);
  };

  const previewVisitorImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setVisitorImage(reader.result);
      setVisitorFileName(file.name);
    });
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-28% 0px -56%", threshold: [0.02, 0.2, 0.55] });
    CHAPTERS.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="exhibition">
      <a className="skip-link" href="#opening">跳到展览正文</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <SideIndex active={active} />
      <header className="masthead"><a href="#opening" className="masthead__mark" aria-label="回到展览开头">M / R / T</a><span>ONLINE EXHIBITION · V1</span><span>SCROLL TO ENTER</span></header>

      <section className="hero" aria-label="展览封面">
        <motion.div className="hero__image" style={{ scale: heroScale, opacity: heroOpacity, backgroundImage: `linear-gradient(180deg,rgba(9,9,7,.18),rgba(10,9,7,.35) 48%,rgba(10,9,7,.88)),url('${assetPath("ash-flower.jpg")}')` }} />
        <div className="hero__grain" />
        <div className="hero__content">
          <Reveal className="hero__eyebrow"><span>Anselm Kiefer</span><span>Matter, Ruin and Transformation</span></Reveal>
          <Reveal className="hero__title" delay={0.08}><h1>给艺术品<br /><em>衰败</em>的机会</h1></Reveal>
          <Reveal className="hero__prompt" delay={0.18}><p>如果变化本身属于作品，保存是否仍然意味着阻止变化？</p><span>↓</span></Reveal>
        </div>
      </section>

      <section id="opening" className="opening paper-section tracked-section">
        <div className="section-number">00</div>
        <Reveal className="opening__title"><span className="kicker">Opening｜展览前言</span><h2>时间没有停在作品之外。</h2></Reveal>
        <Reveal className="opening__copy">
          <p className="lead">文物修复通常试图延缓材料的开裂、剥落、氧化与褪色。</p>
          <p>面对一件正在发生变化的作品，保存似乎意味着使它稳定，使它尽可能接近某个可以被确认的状态。</p>
          <p>安塞姆·基弗的作品却不断使这种直觉变得复杂。</p>
          <p>灰烬、泥土、稻草、铅、枯萎植物、烧毁的书、荆棘与布料被直接带入作品。这些材料并不稳定。它们会老化、脱落、氧化、脆裂，也会在作品完成之后继续改变。</p>
        </Reveal>
        <Reveal className="opening__statement"><p>燃烧、腐蚀、沉积、破碎与转化，</p><strong>本身构成了作品的物质语言。</strong></Reveal>
      </section>

      <section id="chapter-01" className="chapter chapter-one tracked-section">
        <ChapterHeading number="01" en="Ruin Is Not the End">废墟不是终点</ChapterHeading>
        <div className="chapter-one__grid">
          <Reveal className="year-display"><span>GERMANY</span><strong>1945</strong></Reveal>
          <Reveal className="chapter-copy"><p>安塞姆·基弗出生于 1945 年的德国。</p><p>战争即将结束，但战争留下的空间仍然存在。被毁坏的建筑、重新建立的城市，以及一个社会如何处理刚刚发生过的历史，共同构成了战后一代成长的现实。</p><p>废墟因此并不只是一个关于过去的图像。它首先是一种仍然存在于现实中的状态。</p></Reveal>
        </div>
        <div className="residue">
          <Reveal className="residue__words" aria-hidden="true">{['名字', '建筑', '文字', '土地', '灰'].map((word) => <span key={word}>{word}</span>)}</Reveal>
          <Reveal className="residue__copy"><span className="kicker">历史的残留</span><p>1969 年的《Occupations》系列中，年轻的基弗在欧洲不同地点做出纳粹敬礼，将战后德国试图压抑、回避的历史重新放回公共视野。</p><p>此后，第三帝国、德国神话、诗歌、犹太神秘主义、宗教与炼金术不断进入他的作品。它们很少被处理成完整、清晰的叙事，更多时候以残片的方式留下。</p></Reveal>
        </div>
        <Reveal className="quote-break"><span>历史不是过去。</span><strong>它会留下残骸。</strong></Reveal>
      </section>

      <section id="chapter-02" className="chapter chapter-two tracked-section">
        <ChapterHeading number="02" en="Matter Keeps Happening">材料在继续发生</ChapterHeading>
        <Reveal className="material-intro"><p>基弗选择的材料，很少真正保持静止。</p><h3>它们拥有自己的时间。</h3></Reveal>
        <div className="material-index" aria-label="材料索引">
          {MATERIALS.map(([en, zh, desc], index) => <Reveal className="material-row" key={en} delay={index * 0.025}><span>{String(index + 1).padStart(2, "0")}</span><strong>{en}</strong><em>{zh}</em><p>{desc}</p></Reveal>)}
        </div>
        <div className="works-atlas">
          <Reveal className="works-atlas__heading"><span className="kicker">Material Atlas / Collected Works</span><h3>材料不是一种风格。<br />它在不同作品中承担不同的时间。</h3></Reveal>
          <div className="works-atlas__track">
            {WORKS_ATLAS.map((work, index) => (
              <Reveal className={`atlas-work atlas-work--${index + 1}`} key={work.title} delay={index * 0.04}>
                <div className="atlas-work__image"><img src={work.image} alt={`安塞姆·基弗作品 ${work.title}`} /></div>
                <div className="atlas-work__meta"><span>{String(index + 1).padStart(2, "0")}</span><strong>{work.title}</strong><em>{work.year}</em><small>{work.format}</small></div>
              </Reveal>
            ))}
          </div>
          <p className="works-atlas__note">作品标题与年份依据本地文件名录入；标为 YEAR NOT VERIFIED 的项目将在公开发布前补齐馆藏与图源信息。</p>
        </div>
        <div className="transformation">
          <Reveal className="transformation__label"><span>PROCESS / NOT RESULT</span></Reveal>
          <Reveal className="transformation__word"><span>TRANS</span><em>FORMATION</em></Reveal>
          <Reveal className="transformation__copy"><p>木材成为灰。植物干枯。金属氧化。土地重新覆盖残骸。</p><p>燃烧并不只是毁灭。物质没有因此消失，而是进入另一种状态。</p></Reveal>
        </div>

        <article className="artwork ash-flower">
          <div className="artwork__sticky">
            <motion.img src={assetPath("ash-flower.jpg")} alt="安塞姆·基弗作品《灰烬之花》" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
            <div className="artwork__shade" /><WorkLabel number="01" title="ASCHENBLUME" zh="灰烬之花" year="1983–1997" />
          </div>
          <div className="artwork__notes">
            <Reveal className="artwork-note"><span>01 / ARCHITECTURE</span><h3>永久性的幻觉</h3><p>作品中的建筑空间来自 Albert Speer 为柏林帝国总理府设计的 Mosaic Room。它曾试图通过尺度、秩序与纪念性传达永久权力。</p></Reveal>
            <Reveal className="artwork-note"><span>02 / ASH</span><h3>不是终点</h3><p>灰烬、黏土与土覆盖画面。灰既携带已经发生过的毁灭，也保留着继续进入下一次物质循环的可能。</p></Reveal>
            <Reveal className="artwork-note"><span>03 / SUNFLOWER</span><h3>已经改变，尚未结束</h3><p>巨大的干燥向日葵贯穿空间。它已经停止生长，却仍以真实植物材料继续随时间变化。</p></Reveal>
          </div>
        </article>

        <Reveal className="work-conclusion"><p>灰烬是燃烧后的残留。枯萎的植物是生命留下的物质。废墟也不是历史彻底消失之后的空白。</p><h3>在基弗这里，毁灭从来不是一个完成时。</h3></Reveal>
        <article className="artwork merkaba">
          <Reveal className="merkaba__copy"><WorkLabel number="02" title="MERKABA" zh="梅尔卡巴" year="2010" /><h3>毁坏之后留下的物质本身，成为了作品。</h3><p>照片、丙烯、虫胶、灰烬、棉布裙、烧毁的书、覆有石膏的荆棘，以及玻璃与钢。材料带着已经发生过的时间进入作品，然后继续老化。</p><blockquote>物质发生变化，并不意味着意义随之终止。</blockquote></Reveal>
          <Reveal className="merkaba__image"><img src={assetPath("merkaba.jpg")} alt="安塞姆·基弗作品《Merkaba》" /><span>PHOTOGRAPH · ASH · BURNT BOOK · THORN · GLASS · STEEL</span></Reveal>
        </article>
        <Reveal className="chapter-question"><span>Chapter 02 / Exit Question</span><h3>当作品继续变化，<br />什么才算损坏？</h3></Reveal>
      </section>

      <section id="chapter-03" className="chapter chapter-three tracked-section">
        <ChapterHeading number="03" en="Who Decides When Change Must Stop?" dark>谁决定什么时候<br />该停下来？</ChapterHeading>
        <div className="lab-transition">
          <Reveal className="lab-transition__copy"><p>从这里开始，问题不再只属于艺术家。</p><p>作品进入博物馆。进入运输箱。进入恒温恒湿的库房。进入修复工作室。</p></Reveal>
          <Reveal className="lab-transition__rule"><span>ARTIST</span><strong>可以接受变化</strong><span>INSTITUTION</span><strong>必须让作品继续存在</strong></Reveal>
        </div>
        <div className="condition-report">
          <div className="condition-report__header"><span>OBJECT CONDITION REPORT</span><span>REF. AK–MRT–03</span><span>STATUS / REVIEW</span></div>
          <div className="condition-report__grid"><div><span>OBSERVED</span><strong>稻草脱落</strong></div><div><span>OBSERVED</span><strong>颜料粉化</strong></div><div><span>OBSERVED</span><strong>铅构件变形</strong></div><div><span>OBSERVED</span><strong>有机材料虫害</strong></div></div>
          <Reveal className="condition-report__question"><span>INTERPRETIVE THRESHOLD</span><h3>这一变化仍然属于作品，<br />还是已经开始破坏作品？</h3></Reveal>
        </div>
        <div className="cases">{CASES.map((item) => <Reveal className="case-card" key={item.number}><div className="case-card__top"><span>{item.number}</span><span>{item.status}</span></div><h3>{item.title}</h3><p>{item.note}</p><div className="case-card__decision"><span>DECISION</span><strong>{item.decision}</strong></div></Reveal>)}</div>
        <div className="positions"><Reveal><span>01 / ARTIST</span><h3>变化构成作品的一部分。</h3></Reveal><Reveal><span>02 / MUSEUM</span><h3>作品必须继续存在。</h3></Reveal><Reveal><span>03 / CONSERVATOR</span><h3>必须判断两者之间的边界。</h3></Reveal></div>
      </section>

      <section className="final-work" aria-label="最终作品">
        <img src={assetPath("die-lebenden-und-die-toten.jpg")} alt="安塞姆·基弗作品《生者与死者》" /><div className="final-work__overlay" />
        <Reveal className="final-work__label"><WorkLabel number="03" title="DIE LEBENDEN UND DIE TOTEN" zh="生者与死者" year="2019" /><blockquote>变化与消失之间，并不存在一条天然清晰的边界。</blockquote></Reveal>
      </section>

      <section id="epilogue" className="epilogue tracked-section">
        <Reveal className="epilogue__index"><span>EPILOGUE</span><span>04 / 06</span></Reveal>
        <Reveal className="epilogue__title"><h2>Preservation is not<br />the same as <em>freezing.</em></h2><p>保存并不等于冻结。</p></Reveal>
        <Reveal className="epilogue__copy"><p>保存的任务，也许并不是让作品停止时间。</p><p>真正需要被判断的，是哪些变化仍然属于作品，哪些变化已经开始威胁作品继续作为“它自己”存在。</p><strong>时间仍然发生在作品内部。</strong></Reveal>
      </section>

      <section id="experiment" className="experiment tracked-section">
        <div className="experiment__header">
          <Reveal><span className="kicker">Interactive Epilogue / Curated Skill Demo</span><h2>AI Material<br />Transformation<br /><em>Experiment</em></h2></Reveal>
          <Reveal className="experiment__intro"><p>如果人工智能试图模拟材料的时间，它首先必须回答一个更基础的问题：</p><strong>它看到的，究竟是什么材料？</strong></Reveal>
        </div>
        <div className="experiment__steps">
          {[["01", "Identify the Material", "识别材料"], ["02", "Model the Transformation", "模拟变化"], ["03", "Preserve the Identity", "保留物体身份"]].map(([num, en, zh], index) => (
            <button className={`experiment-step ${activeStep === index ? "is-active" : ""}`} key={num} type="button" onClick={() => setActiveStep(index)}><span>{num}</span><strong>{en}</strong><em>{zh}</em></button>
          ))}
        </div>

        <Reveal className="skill-demo">
          <div className="skill-demo__topline"><span>MATERIAL-DECAY-AESTHETICS</span><strong>{studyState}</strong><span>PRECOMPUTED STUDY · NO API CALL</span></div>
          <div className="skill-demo__workspace">
            <div className="comparison-view" style={{ "--comparison": `${comparison}%` }}>
              <img src={assetPath("lab/source-peacock.jpg")} alt="材料衰变实验输入：树上的孔雀" />
              <div className="comparison-view__result"><img src={assetPath("lab/result-peacock.jpg")} alt="材料衰变重构结果：保留孔雀与树的结构痕迹" /></div>
              <span className="comparison-view__label comparison-view__label--source">SOURCE</span>
              <span className="comparison-view__label comparison-view__label--result">RECOMPOSED</span>
              <div className="comparison-view__line" aria-hidden="true" />
            </div>
            <div className="skill-console">
              <div className="skill-console__section">
                <span>01 / PROBABLE MATERIALS</span>
                <div className="material-tags"><em>FEATHER / KERATIN</em><em>WOOD / BARK</em><em>PLANT TISSUE</em></div>
                <p>材料识别保持为假设，不把视觉线索写成已验证事实。</p>
              </div>
              <div className="skill-console__section">
                <span>02 / OPERATION CHAIN</span>
                <ol><li>连续材料地面</li><li>结构选择与重组</li><li>干燥、剥落与局部嵌入</li><li>保留可辨认的垂直轮廓</li></ol>
              </div>
              <div className="skill-console__section">
                <span>03 / ACCEPTANCE TEST</span>
                <p>材料识别、视觉重组、主动衰变是否同时存在？完整与耗损之间是否仍有张力？</p>
              </div>
              <button className="skill-console__run" type="button" onClick={loadStudy}>{studyState === "READY" ? "LOAD CURATED STUDY" : "STUDY LOADED"}</button>
            </div>
          </div>
          <div className="comparison-control">
            <span>INPUT</span>
            <label><span className="sr-only">比较原图与重构结果</span><input type="range" min="0" max="100" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} /></label>
            <span>TRANSFORMED</span>
          </div>
          <div className="skill-demo__footnote"><span>Skill agent is configured locally</span><p>这个网页版本使用已生成的测试结果，避免把浏览器中的演示误写成实时模型调用。接入服务器端接口后可复用同一交互。</p></div>
        </Reveal>

        <div className="lab-notes">
          <Reveal className="lab-notes__title"><span className="kicker">AI Lab Notes / Iteration Evidence</span><h3>失败不是边角料。<br />它是判断如何形成的证据。</h3></Reveal>
          <div className="lab-notes__grid">
            {LAB_NOTES.map((note, index) => <Reveal className="lab-note" key={note.status} delay={index * 0.06}><div className="lab-note__image"><img src={note.image} alt={`${note.status}：${note.title}`} /></div><span>{note.status}</span><h4>{note.title}</h4><p>{note.note}</p><strong>{note.verdict}</strong></Reveal>)}
          </div>
        </div>

        <Reveal className="activation-gate">
          <div className="activation-gate__header">
            <div><span>05 / FINAL ENTRY</span><strong>VISITOR MATERIAL INTAKE</strong></div>
            <span className="activation-gate__status">API OFFLINE</span>
          </div>
          <div className="activation-gate__body">
            <label className={`visitor-upload ${visitorImage ? "has-image" : ""}`}>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={previewVisitorImage} />
              {visitorImage ? (
                <>
                  <img src={visitorImage} alt="你选择的实验图片预览" />
                  <span className="visitor-upload__replace">选择另一张图片</span>
                </>
              ) : (
                <span className="visitor-upload__empty"><em>+</em><strong>UPLOAD AN IMAGE</strong><small>JPG / PNG / WEBP · LOCAL PREVIEW ONLY</small></span>
              )}
            </label>
            <div className="activation-docket">
              <span className="kicker">Live Transformation / Reserved</span>
              <h3>把你的图像交给<br />材料与时间。</h3>
              <p>正式激活后，实验将识别图像中的材料，推演它们可能经历的风化、燃烧、沉积与剥落，并在保留原始身份的前提下生成一次物质转化。</p>
              <dl>
                <div><dt>01</dt><dd>Material reading</dd></div>
                <div><dt>02</dt><dd>Transformation model</dd></div>
                <div><dt>03</dt><dd>Identity check</dd></div>
              </dl>
              {visitorFileName && <p className="activation-docket__file">LOCAL SPECIMEN / {visitorFileName}</p>}
              <button type="button" disabled><span>GENERATE TRANSFORMATION</span><em>ACTIVATION PENDING</em></button>
              <small>当前图片只在你的浏览器中预览，不会被上传或保存。实时生成将在展览演示期间开放。</small>
            </div>
          </div>
          <div className="activation-gate__seal" aria-hidden="true"><span>LIVE</span><strong>NOT YET<br />ACTIVATED</strong><em>05—MRT</em></div>
        </Reveal>
      </section>

      <footer className="footer"><span>给艺术品衰败的机会</span><span>Anselm Kiefer: Matter, Ruin and Transformation</span><span>V1 · 2026</span><a href="https://github.com/uxderrick/marginalia" target="_blank" rel="noreferrer">Built from Marginalia · MIT</a></footer>
    </main>
  );
}
