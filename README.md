<!DOCTYPE html>
<html lang="en">
<head>


<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PerfectlyPracticalEnglish.netlify.app</title>

<style>

/* =====================
   1. FIRST PAINT / MODE GATING
===================== */

#layout,
#dynamicTOC {
  display: none;
}

/* HARD enabled */
html.show-hard #layout {
  display: block;
}

/* DYNAMIC enabled */
html.show-dynamic #dynamicTOC {
  display: block;
}

/* =====================
   2. GLOBAL BASE TYPOGRAPHY
===================== */

body {
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #222;
  margin: 0;
  padding: 0;
  background-color: #f5f6fa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Hide page until auto-open logic finishes */
html.pre-auto-open body > *:not(#loader) {
  visibility: hidden;
}

h2 {
  margin: 20px 0 10px 0;
}

h3 {
  margin: 0 0 6px 0;
  color: #1976d2;
  font-size: 12px;
}

.word {
  cursor: pointer;
  color: inherit;
}

.word:hover {
  background-color: rgba(26,115,232,0.2);
}

.sentence {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.highlight {
  background-color: #ffff00;
  color: #000000;
}

.visually-hidden {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}


/* =====================
   4. DYNAMIC TOC
===================== */

#tocButtons {
  width: 100%;
  box-sizing: border-box;
}

.tocColumn button {
  background: none;
  border: none;
  outline: none;
  padding: 0;

  display: block;
  width: 100%;
  background-color: #2b5d84;
  color: #ffffff;

  padding: 10px 10px 10px 15px;
  border-radius: 6px;

  font-size: 14px;
  font-family: inherit;
  line-height: 1.2;
  text-align: left;
  cursor: pointer;

  box-sizing: border-box;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tocColumn button:hover,
.readAloudBtn:hover {
  background-color: #1f4563;
}

#tocContainer h3 {
  color: #2b5d84;
  margin-left: 20px;
}

.parsedHeader {
  color: #2b5d84;
  font-weight: bold;
  margin-left: -3px;

}

.parsedSubheader {
  color: #2b5d84;
  font-weight: bold;
  margin-top: 14px;
  margin-bottom: 8px;
}

/* =====================
   6. MODAL ISOLATION
===================== */

body.modal-open {
  overflow: hidden;
}

body.modal-open #tocRoot,
body.modal-open #tocColLeft,
body.modal-open #tocColRight {
  display: none;
}

#modalRoot {
  position: fixed;
  inset: 0;
  background: #ffffff;
  display: none;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 20px;

  overflow-y: auto;
  overflow-x: hidden;

  overscroll-behavior: contain;

  z-index: 20000;
}

#modalRoot.active {
  display: flex;
  flex-direction: column;  /* stack bars vertically */
  gap: 0;                  /* remove the transparent strip */
  background: #ffffff;     /* force pure white */
}
/* =====================
   7. QUIZ MODAL LAYOUT
===================== */

#quizModal {
  position: relative;
  width: 100%;
  max-width: 360px;

  height: calc(100dvh - var(--kb-offset, 0px));

  margin: 0 auto;

  padding: 0 10px 120px 10px;

  background: #ffffff;
  box-sizing: border-box;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  border-radius: 8px;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

#quizModal h2 {
  font-size: 12px;
}

#quizModalContent {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

#quizSections {
  width: 100%;
  margin-left: 0;
  padding-top: 10px;  /* Kill switch header spacing */
  box-sizing: border-box;
}

#quizSections > * {
  padding: 3px 0;
  margin-bottom: 16px;
  font-size: 12px;
  box-sizing: border-box;
}

#quizSections .section > h2 {
  margin: 0 0 8px 0;
  scroll-margin-top: 100px;
}

#quizSections .quiz-subsection {
  margin: 10px 0;
}

#quizSections .quiz-subsection:first-of-type {
  margin-top: 0;
}

#quizSections .quiz-subsection h3 {
  margin: 0 0 8px 0;
}

#quizSections h3 {
  scroll-margin-top: 10px;
}

.question-text {
  margin-top: -5px;
}

.question-text h3 {
  margin: 16px 0 8px;
}

.question-text:focus {
  outline: none;
  box-shadow: none;
}

.exercise-container {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.exercise p {
  margin-bottom: 4px;
}


/* =====================
   8. CONTROL BARS (Stacked Sticky Inside Scroll Container)
===================== */

/* Hidden by default */
#chapterVerseControls,
#readaloudControls {
  display: none;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #ffffff;
  box-sizing: border-box;

  line-height: 0; /* kill inherited inline height */
}

/* Show when modal active */
#modalRoot.active #chapterVerseControls,
#modalRoot.active #readaloudControls {
  display: block; /* block is safer than flex at container level */
}

/* --------------------------------------------------
   BOTH BARS STICK (same scroll context)
-------------------------------------------------- */

#chapterVerseControls {
  position: relative;
  top: auto;
  z-index: 40;
}

#readaloudControls {
  position: relative;
  top: auto;
  z-index: 39;
  border-top: 1px solid #eee;
}

/* REMOVE stacking math completely */
#chapterVerseControls + #readaloudControls {
  top: auto;
}
/* Keep layout behavior inside controlRow */
#chapterVerseControls .controlRow,
#readaloudControls .controlRow {
  display: flex;
  align-items: stretch;
  gap: 6px;
}

#readaloudControls {
  border-top: 1px solid #ffffff;
  padding-top: 6px;
}

/* --------------------------------------------------
   Buttons & Select Layout
-------------------------------------------------- */

#chapterVerseControls select,
#chapterVerseControls button,
#readaloudControls select,
#readaloudControls button {
  flex: 0 0 calc((100% - 18px) / 4);
  max-width: calc((100% - 18px) / 4);
  min-width: 0;

  height: 36px;
  line-height: 36px;

  box-sizing: border-box;
  font-size: 13px;
  border-radius: 6px;

  margin: 0;
  padding: 0 10px;
  vertical-align: middle;
}

/* Select normalization */
#chapterVerseControls select,
#readaloudControls select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
}

/* Button alignment */
#chapterVerseControls button,
#readaloudControls button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Hide select scrollbar */
#chapterVerseControls select::-webkit-scrollbar,
#readaloudControls select::-webkit-scrollbar {
  width: 0;
}

/* Readaloud wrapper safety */
.readaloud-block,
.readaloud-block .readaloud-buttons {
  margin: 0;
  padding: 0;
  background: #ffffff;
  box-sizing: border-box;
}/* =====================
   9. BUTTON SYSTEM
===================== */

#modalRoot button {
  height: 36px;
  font-size: 12px;
  background: #2b5d84;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

#modalRoot button:hover:not(:disabled) {
  background: #1f4563;
}

#modalRoot button:active:not(:disabled) {
  transform: scale(0.97);
}

#modalRoot button:disabled {
  background: #8aa3b8;
  cursor: not-allowed;
}


/* =====================
   10. SCOREBOARD
===================== */

#scoreboard {
  display: block;
  position: sticky;
  bottom: 0;

  left: 2px;              /* ← actual visual shift (try 1px if too much) */

  background: #fff;
  padding: 10px;
  border: 2px solid #add8e6;

  width: calc(100% - 2px); /* compensate so it doesn’t overflow right */
  box-sizing: border-box;

  z-index: 10;
}

.scoreboard-main pre,
#scoreOutput {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  max-width: 100%;
  display: block;
}

.scoreboard-buttons {
  display: flex;
  gap: 6px;
  width: 100%;
}

.scoreboard-buttons > * {
  flex: 1 1 0;        /* equal width */
  min-width: 0;
  height: 36px;
}



/* =====================
   11. SHARED TOC STRUCTURE CONTRACT
===================== */

#layout,
#tocContainer {
  width: 100%;
  max-width: 360px;
  margin: 20px auto;
  padding: 5px 10px;
  box-sizing: border-box;
}

.container,
#tocButtons {
  display: flex;
  gap: 10px;
  width: 100%;
}

.column,
.tocColumn {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}


/* =====================
   12. GLOBAL SCROLLBAR SUPPRESSION
===================== */

html,
body {
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* 🔥 ADD THIS */
  overflow-anchor: none;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}

#quizModal::-webkit-scrollbar,
#mvWindow::-webkit-scrollbar {
  display: none;
}

#quizModal,
#mvWindow {
  scrollbar-width: none;
}


/* Make all 4-item control rows identical */
/* ========================
   FLEXIBLE CONTROL ROW SYSTEM
========================= */

.controlRow {
  display: flex;
  gap: 6px;
  width: 100%;
}

/* shared styling */
.controlRow > * {
  min-width: 0;
  height: 36px;
  box-sizing: border-box;
  font-size: 13px;
  border-radius: 6px;
  padding: 0 10px;
}

/* Chapter + Verse selects wider */
.controlRow select:nth-child(1),
.controlRow select:nth-child(2) {
  flex: 1.3 1 0;
}

/* Buttons slightly smaller */
.controlRow button {
  flex: 0.8 1 0;
}
/* ========================
   NAME / ID / SUBMIT / CLOSE ROW
========================= */

/* each row */
.top-controls {
  display: flex;
  gap: 6px;              /* horizontal spacing only */
  margin: 0;             /* remove transparent margin */
  width: 100%;
}

.top-controls > * {
  flex: 1 1 0;        /* equal width for all 4 */
  min-width: 0;
  height: 36px;
  padding: 0 10px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 13px;
}

.top-controls input {
  border: 1px solid #ccc;
}

.top-controls button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.copyrightSection {
  font-size: 9px;
  opacity: 0.7;

  padding: 0 6px;
  box-sizing: border-box;

  margin-top: 15px;
  padding-left: 1px;

  text-align: left;

  display: block;
}

/* enforce vertical stacking */
.copyrightSection > div {
  display: block;
}

.visitor-count {
  font-size: 12px;
  opacity: 0.75;
  margin-top: 4px;
}

.quiz-scoreboard {
  width: 100%;
  box-sizing: border-box;

  margin-bottom: 12px;
  padding: 6px;

  border: 1px solid #9aaed1;
  border-radius: 6px;
  background: #f9f9f9;

  font-family: monospace;
  font-size: 12px;
}


/* vertical stacking container */

/* Make only Chapter & Verse text smaller */
#chapterVerseControls select {
  font-size: 10px;   /* adjust to 9px, 11px, etc. */
}

.reading-active {
  background-color: yellow !important;
  scroll-margin-top: 120px;
}

#loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f5f6fa; /* match page background */
  z-index: 9999;
}

/* Inner box matches your layout width */
#loaderContent {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;

  text-align: center;
  padding: 20px;

  font-size: 16px;
  font-weight: bold;
  color: #2b5d84; /* 🔵 your button blue */
}

#helloBar {
  height: 40px;              /* acts as buffer */
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  color: #2b5d84;

  background: #ffffff;
  transition: opacity 0.15s ease, height 0.15s ease;
}



/* =========================
   🔥 MOBILE KEYBOARD FIX LAYER
   (SAFE OVERRIDE ZONE)
========================= */

html, body {
  height: 100%;
}

/* Prevent layout jump caused by keyboard resize */
#modalRoot {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: 100dvh; /* modern mobile viewport fix */
  min-height: 100vh;
}

/* Better behavior when keyboard opens */
@supports (height: 100dvh) {
  #modalRoot {
    height: 100dvh;
  }
}

/* fallback smooth behavior for older mobile browsers */
@media (max-width: 768px) {
  #modalRoot {
    transition: transform 0.12s ease-out;
  }
}

/* optional: stabilize bottom UI elements (your proxy button) */
button {
  -webkit-tap-highlight-color: transparent;
}


.modal-close-btn {
  width: 36px;
  height: 36px;

  padding: 0;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;

  background: #2b5d84;
  color: #fff;

  border: none;
  border-radius: 6px;

  cursor: pointer;

  transition: background 0.15s, transform 0.1s;

  position: absolute;
  top: 10px;
  right: 10px;
}

.modal-close-btn:hover {
  background: #1f4563;
}

.modal-close-btn:active {
  transform: scale(0.97);
}


h1[data-auto-title] {
  visibility: hidden;
}

html.ui-ready h1[data-auto-title] {
  visibility: visible;
}

#layout,
#tocContainer {
  padding-bottom: 30px;
}


.visits-bottom-space {
  height: 140px; /* adjust this freely */
  width: 100%;
}


</style>
</head>
<body>

<div id="loader">
  <div id="loaderContent">Loading...</div>
</div>
<div id="rawTextSource" class="visually-hidden">

~ To: Parents, Students, and Teachers
19 May 2026

Hello,

My name is David Cherry, and I am the IEP teacher for M11.1, M13.2, M14.1, M15.3, and M16.2.

This year, IEP LS3 will be using the Focus coursebook by Pearson Longman. According to the syllabus, we will begin using it on Monday, 25 May 2026.

In addition, I have a range of tools and learning content at Perfectly-Practical-English.github.io to support and supplement the LS3 curriculum as designed by Coordinator Andrew Whitlock. It is useful in much the same way as other classroom platforms such as Moodle, Kahoot, Wordwall, or ClassDojo, with the advantage that it allows me to tailor content without requiring paid subscriptions.

As a teacher, I use the website for quick access to presentation tools, calendars, schedules, timers, spinners, scoreboards, lesson agendas, video playlists, and grammar tips—all in one place without the need to switch between multiple apps. Students can also access a variety of tasks, activities, exercises, flash cards, and games for both individual and team practice.

The content is designed to reinforce key vocabulary and grammar, support reading, writing, listening, and speaking skills, and, in most cases, provide scores or other evidence of completion.

The activities are intended to be as engaging and game-like as possible, encouraging students to use their mobile phones as learning tools rather than distractions.

Students can connect to the site using QR codes or by saving a link to their home screen. During class, I demonstrate how to navigate the site using the smartboard. Students who do not have access to a mobile phone are provided with classroom devices.

I anticipate using only a small portion of the website during lessons, as the Focus coursebook already contains substantial material. Since not all website content will be used in class, there is a dedicated section highlighting the activities we are currently working on. The remainder of the site is available for students to explore independently if they finish classwork early or wish to study in their own time.

If you have any questions, please let me know.

David Lee Cherry
Grade 7 Teacher
Intensive English Program
Bangkok Christian College

Sincerely,

David Lee Cherry~

BLANK
?BLANK

</div>


<!-- ================= HARD-CODED TOC ================= -->
<!-- <div id="layout">

<h1 data-auto-title></h1>

  <div class="container">
    <div class="column">
      <h2>Old Testament</h2>
      <ul class="index">


      </ul>
    </div>

    <div class="column">
      <h2>New Testament</h2>
      <ul class="index">


      </ul>
    </div>
  </div>

</div> -->
<!-- END #layout -->


<!-- ================= DYNAMIC TOC ================= -->
<div id="dynamicTOC">
  <div id="tocContainer">

<h1 data-auto-title></h1>

    <div id="tocButtons">
      <div class="tocColumn" id="tocColLeft"></div>
      <div class="tocColumn" id="tocColRight"></div>
    </div>

  </div>
</div>

<!-- ================= QUIZ MODAL ================= -->
<div id="modalRoot">
  <div id="quizModal">

<!--<div id="helloBar">Hello!</div> -->

    <!-- CONTROL BARS LIVE HERE -->
    <div id="chapterVerseControls">
      <div class="controlRow">

<button id="instructionsBtn">Instructions</button>
<!-- <select id="chapterSelect"></select> -->

<button id="strategiesBtn">Strategies</button>
<!-- <select id="verseSelect"></select> -->

<button id="signalwordsBtn">Signals</button>
<!-- <button id="goBtn">Go</button> -->

<button onclick="goToNextQuiz()">Go to Quiz</button>

      </div>
    </div>

    <div id="readaloudControls">
      <div class="controlRow">
        <button id="highlightSelected">Highlight</button>
        <button id="copySelected">Copy</button>
        <button id="startBtn">Audio</button>
        <button id="closeModalBtn">Close</button>
      </div>
    </div>

    <!-- ACTUAL CONTENT -->
    <div id="quizModalContent">
      <div id="quizSections"></div>
    </div>

  </div>
</div>

<script>

(function(){


  // [1] GET INPUT SOURCE
  const src = document.getElementById("rawTextSource");
  if (!src) return;

  const raw = src.textContent.trim();
  const lines = raw.split("\n");

  // [2] REGEX RULES
  const urlRegex = /^https?:\/\/\S+$/i;
  const urlAnywhere = /(https?:\/\/\S+)/gi;

  // [3] BUILD OUTPUT ARRAYS
  const htmlResult = [];
  const speechChunks = [];

  // [4] PARSE LOOP (UNCHANGED LOGIC)
  for (let i = 0; i < lines.length; i++) {

    let line = lines[i].trim();
    let next = (lines[i + 1] || "").trim();

    // TITLE + URL HANDLING
    if (line && !urlRegex.test(line) && urlRegex.test(next)) {

      htmlResult.push(
        `<a href="${next}" target="_blank" rel="noopener">${line}</a>`
      );

      speechChunks.push(line);

      i++;
      continue;
    }

    // INLINE URL HANDLING
    const htmlLine = line.replace(urlAnywhere, url =>
      `<a href="${url}" target="_blank" rel="noopener">${url}</a>`
    );

    htmlResult.push(htmlLine);

    const cleanText = line.replace(urlAnywhere, "").trim();
    if (cleanText) {
      speechChunks.push(cleanText);
    }
  }

  // [5] OUTPUT (UNCHANGED — SAFE FOR UI SYSTEM)
  window.rawText = htmlResult.join("\n");

// SIGNAL: parser is done
window.parserReady = true;

  // [6] READ-ALOUD HANDOFF (FIXED TO NOT BREAK UI)

  // IMPORTANT:
  // - no immediate execution
  // - no blocking
  // - no fallback globals
  // - queued after UI thread

  setTimeout(() => {
    if (typeof window.onParsedTextReady === "function") {
      window.onParsedTextReady(speechChunks);
    }
  }, 0);

})();

</script>

<script>
(function primeFemaleVoiceOnce() {
  const synth = window.speechSynthesis;
  if (!synth) return;

  let primed = false;

  function tryPrime() {
    if (primed) return;

    const voices = synth.getVoices();
    if (!voices.length) return;

    const femaleVoice =
      voices.find(v => /Aria|Zira|Samantha|Victoria|Moira/i.test(v.name)) ||
      voices.find(v => v.lang && v.lang.startsWith("en")) ||
      voices[0];

    if (!femaleVoice) return;

    const u = new SpeechSynthesisUtterance(" ");
    u.voice = femaleVoice;
    u.volume = 0;
    u.rate = 1;
    u.pitch = 1;

    synth.speak(u);
    primed = true;
  }

  tryPrime();

  synth.onvoiceschanged = tryPrime;

  // Better Android + mobile coverage (replaces click + touchstart)
  document.addEventListener("pointerdown", tryPrime, { once: true });
})();
</script>

<script>
(function () {

  function cleanSpeechText(text) {
    text = text.replace(/\b\d+:\d+\s*/g, '');
    text = text.replace(/<br\s*\/?>/gi, ' ');
    text = text.replace(/\n+/g, ' ');
    text = text.replace(/\s+\./g, '.');
    text = text.replace(/\.(\S)/g, '. $1');
    text = text.replace(/\s+/g, ' ').trim();
    return text;
  }

  const OriginalUtterance = window.SpeechSynthesisUtterance;

  function PatchedUtterance(text) {
    return new OriginalUtterance(cleanSpeechText(text));
  }

  // 🔧 preserve prototype for Android/WebView compatibility
  PatchedUtterance.prototype = OriginalUtterance.prototype;

  window.SpeechSynthesisUtterance = PatchedUtterance;

})();
</script>

<script>
(function() {
  // ====== 2. Parse Sections ======
const raw = window.rawText;

if (!raw) return; // IMPORTANT: stop if parser not ready

const segments = raw.split("~").map(s => s.trim()).filter(Boolean);
  const sections = [];

  for (let i = 0; i < segments.length; i += 2) {
    const storyBlock = segments[i] || "";
    const questionBlock = segments[i + 1] || '';

    const lines = storyBlock.split("\n").map(l => l.trim()).filter(Boolean);

    let titleLine = lines[0] || "Untitled Section";

    sections.push({
      title: titleLine,
      content: lines.join("\n"),
      questions: questionBlock
    });
  }

window.sections = sections;


  // ====== 3. Build TOC ======
  const leftCol = document.getElementById('tocColLeft');
  const rightCol = document.getElementById('tocColRight');
  if (!leftCol || !rightCol) return;

  leftCol.innerHTML = '';
  rightCol.innerHTML = '';
  const midpoint = Math.ceil(sections.length / 2);

  sections.forEach((sec, idx) => {
    const btn = document.createElement('button');
    btn.textContent = sec.title;
    btn.addEventListener('click', () => openQuizModal(idx));
    if (idx < midpoint) leftCol.appendChild(btn);
    else rightCol.appendChild(btn);
  });

// ====== 4. Modal Rendering ======
window.openQuizModal = function(idx) {

  const container = document.getElementById('quizSections');
  container.innerHTML = '';

  generateQuizSection(sections[idx], idx);

  document.getElementById('modalRoot').classList.add('active');
  document.body.classList.add('modal-open');

  moveControlsIntoModal();

  // 📌 Chapter/Verse system (navigation layer)
  buildChapterVerseLogic();
};

document.addEventListener("click", function(e) {

  const closeBtn = e.target.closest("[data-close-quiz]");
  if (!closeBtn) return;

  // 🔒 Stronger prevent auto-reopen
  window.__quizJustClosed = Date.now();

  const modalRoot = document.getElementById("modalRoot");
  const container = document.getElementById("quizSections");

  // 🔥 1. CLOSE FIRST
  modalRoot?.classList.remove("active");
  document.body.classList.remove("modal-open");

  // 🔥 2. Clear content
  if (container) container.innerHTML = "";

  // 🔥 3. Kill smooth scroll
  document.documentElement.style.scrollBehavior = "auto";

  // 🔥 4. Immediate reset
  window.scrollTo(0, 0);

  const modal = document.getElementById("quizModal");
  if (modal) modal.scrollTop = 0;

  const modalContent = document.getElementById("quizModalContent");
  if (modalContent) modalContent.scrollTop = 0;

  // 🔥 5. Prevent browser restoring old position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  if (window.resetQuizScrollState) {
    window.resetQuizScrollState();
  }

  // 🔥 FINAL OVERRIDE (critical)
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });

});

function generateQuizSection(section, idx) {
  const container = document.getElementById('quizSections');

// ===== Paragraph numbering control =====
// true  = number story paragraphs
// false = never number story paragraphs
const NUMBER_PARAGRAPHS = false;

// Helper: render story paragraphs with optional numbering
function renderNumberedLines(lines, sectionTitle) {
  return lines
    .filter((line, idx) => {
      // ❌ Remove duplicate header (first line only)
      if (
        idx === 0 &&
        sectionTitle &&
        line.trim().toLowerCase() === sectionTitle.trim().toLowerCase()
      ) {
        return false;
      }
      return true;
    })
    .map((line, lineIdx) => {
      // Never number if disabled
      if (!NUMBER_PARAGRAPHS) {
        return `<p>${line}</p>`;
      }

      // Defensive: do not double-number
      if (/^\d+\.\s/.test(line)) {
        return `<p>${line}</p>`;
      }

      return `<p>${lineIdx + 1}. ${line}</p>`;
    })
    .join("");
}


let sectionHTML = `
  <div class="section" data-section-idx="${idx}">
    <h2 class="parsedHeader">${section.title}</h2>
    <div class="question-text" contenteditable="true">
      ${renderNumberedLines(
        section.content.split("\n").map(l => l.trim()).filter(Boolean),
        section.title
      )}
    </div>
`;

    const SUBSECTION_MARKERS = [
      "Quiz",
      "Concept Quiz",
      "Context Quiz",
      "Comprehension Quiz",
      "Grammar Quiz",
      "Vocabulary Quiz"

    ];

    const lines = section.questions.split("\n").map(l => l.trim()).filter(Boolean);
    const subsections = [];
    let currentSub = null;

let hasBlankLine = false;
let hasNullBlankLine = false;

lines.forEach(line => {
  // Detect special lines
  if (/^\s*blank\s*$/i.test(line)) hasBlankLine = true;
  if (/^\s*\?blank\s*$/i.test(line)) hasNullBlankLine = true;

  // If both are present, skip all subsections
  if (hasBlankLine && hasNullBlankLine) {
    currentSub = null; // do not create any subsection
    return;
  }

  if (SUBSECTION_MARKERS.some(marker =>
  line.toLowerCase().startsWith(marker.toLowerCase())
)) {

    currentSub = { title: line, questions: [] };
    subsections.push(currentSub);
  } else if (currentSub) {
    currentSub.questions.push(line);
  }
});

    subsections.forEach(sub => {
      const slug = sub.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      sub.slug = slug;

      sectionHTML += `<h3 class="parsedSubheader">${sub.title}</h3>`;
      sectionHTML += `<div class="quiz-subsection" data-subsection="${sub.title}" data-sub-slug="${slug}">`;

sectionHTML += `
  <div class="top-controls">
    <input type="text" class="quiz-name" placeholder="Name">
    <input type="text" class="quiz-id" placeholder="ID">
    <button type="button" class="quiz-submit">Submit</button>
    <button type="button" class="quiz-close">Close</button>
  </div>

        <div class="quiz-scoreboard"
             style="display:none; width:100%; margin-bottom:12px;
                    padding:6px; border:1px solid #9aaed1; border-radius:6px;
                    background:#f9f9f9; font-family:monospace; font-size:12px;">
          <pre class="scoreboard-data" style="margin:0; white-space:pre-wrap;"></pre>
          <div class="scoreboard-buttons" style="margin-top:6px; display:flex; gap:6px;">
            <button type="button" class="score-copy">Copy</button>
            <button type="button" class="score-txt">TXT</button>
            <button type="button" class="score-png">PNG</button>
          </div>
        </div>
      `;

      // ===== Question Parsing (supports ? at start + optional second line starting with -) =====
      sub.questions = sub.questions.map(l => l.trim()).filter(Boolean);
      let qIndex = 0;

      for (let i = 0; i < sub.questions.length; i++) {
        let line = sub.questions[i];

        if (!line.startsWith('?')) continue;

        // main question text
        let question = line.replace(/^\?\s*/, '');

        // optional second line
        if (i + 1 < sub.questions.length && sub.questions[i + 1].startsWith('-')) {
          question += ' ' + sub.questions[i + 1].replace(/^-+\s*/, '');
          i++;
        }

        // collect options until next question
        const options = [];
        let j = i + 1;
        while (j < sub.questions.length && !sub.questions[j].startsWith('?')) {
          options.push(sub.questions[j]);
          j++;
        }

        const correctPipe = options
          .filter(o => /\|.*?\|/.test(o))
          .map(o => o.replace(/\|/g, '').trim())
          .join('|');

        sectionHTML += `<div class="exercise" data-correct="${correctPipe}">`;
        sectionHTML += `<p><strong>${qIndex + 1}. ${question}</strong></p>`;

        options.forEach((opt, oi) => {
          const clean = opt.replace(/\|/g, '').trim();
          sectionHTML += `
            <label>
              <input type="radio" name="q${idx}_${sub.title}_${qIndex}" value="${clean}" data-correct="${correctPipe}">
              ${String.fromCharCode(65 + oi)}) ${clean}
            </label><br>
          `;
        });

        sectionHTML += `</div>`;
        qIndex++;
        i = j - 1;
      }

      sectionHTML += `</div>`;
    });

    sectionHTML += `</div>`;
    container.insertAdjacentHTML('beforeend', sectionHTML);
  }

  // ====== 5. Event Delegation ======
  document.getElementById('quizSections').addEventListener('click', e => {
    const sub = e.target.closest('.quiz-subsection');
    if (!sub) return;

    if (e.target.classList.contains('quiz-submit')) {
      const sub = e.target.closest('.quiz-subsection');
      if (!sub) return;

      const name = sub.querySelector('.quiz-name')?.value || 'Anonymous';
      const id   = sub.querySelector('.quiz-id')?.value || 'N/A';

      const section = sub.closest('.section')?.querySelector('h2')?.textContent.trim() || 'Unknown Section';
      const subsection = sub.dataset.subsection || 'Unknown Subsection';

      const exercises = sub.querySelectorAll('.exercise');
      let correctAnswers = 0;
      exercises.forEach(ex => {
correctAnswers += Number(ex.dataset.score || 0);


      });
      const totalExercises = exercises.length;
      const percentage = totalExercises > 0 ? Math.round((correctAnswers / totalExercises) * 100) : 0;

      const now = new Date();
      const pad = n => n.toString().padStart(2,'0');
      const dateString = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const filename = window.location.pathname.split('/').pop();
      const resultText = `${filename}|${section}::${subsection}|${name}|${id}|${dateString}|${correctAnswers}/${totalExercises}|${percentage}%`;

      const board = sub.querySelector('.quiz-scoreboard');
      const dataEl = board.querySelector('.scoreboard-data');
      if (dataEl) dataEl.textContent = resultText;
      board.style.display = 'block';
    }


  });
})();
</script>








<!-- ====== Consolidated Highlight + Read-Aloud + Emoji Speech + Active Highlight ====== -->
<script>
(function() {

  /* =========================================================
     GLOBALS
  ========================================================= */
  const highlightBtn = document.getElementById('highlightSelected');
  const copyBtn = document.getElementById('copySelected');
  const startBtn = document.getElementById('startBtn');
  const pauseResumeBtn = document.getElementById('pauseResumeBtn');
  const restartBtn = document.getElementById('restartBtn');

  const synth = window.speechSynthesis;

  let teacherVoice = null;
  let studentVoice = null;

  let narratorActive = false;
  let lastContainer = null;
  let lastOffset = 0;
  let lastCharIndex = 0;
  let utterance = null;

  let activeParagraph = null;
  let monitorInterval = null;


  /* =========================================================
     LOAD VOICES (Merged Logic — Nothing Removed)
  ========================================================= */
  function loadVoices() {
    const voices = synth.getVoices();
    if (!voices.length) return;

    // First script preference logic
    teacherVoice =
      voices.find(v => v.name.includes("Zira")) ||
      voices.find(v => v.name === "Microsoft Zira" && v.lang === "en-US") ||
      voices.find(v => v.name.includes("Samantha")) ||
      voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
      voices[0];

    studentVoice =
      voices.find(v => v.name.includes("Aria")) ||
      voices.find(v => v.name === "Microsoft Aria" && v.lang.startsWith("en-GB")) ||
      voices.find(v => v.name.includes("Victoria")) ||
      voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
      voices[0];
  }

  synth.onvoiceschanged = loadVoices;
  loadVoices();


  /* =========================================================
     HIGHLIGHT LOGIC (UNCHANGED)
  ========================================================= */
  highlightBtn?.addEventListener('click', () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    const highlightClass = 'highlight';
    const container = range.commonAncestorContainer.nodeType === 3
      ? range.commonAncestorContainer.parentNode
      : range.commonAncestorContainer;

    const allNodes = Array.from(container.querySelectorAll('p, li, div, span'));
    const intersectingNodes = allNodes.filter(node => range.intersectsNode(node));

    if (!intersectingNodes.length && range.startContainer.nodeType === 3) {
      const parentSpan = range.startContainer.parentNode;
      if (parentSpan.classList?.contains(highlightClass)) {
        parentSpan.replaceWith(...parentSpan.childNodes);
      } else {
        const span = document.createElement('span');
        span.className = highlightClass;
        range.surroundContents(span);
      }
      sel.removeAllRanges();
      return;
    }

    const alreadyHighlighted = intersectingNodes.some(n => n.classList?.contains(highlightClass));
    if (alreadyHighlighted) {
      intersectingNodes.forEach(n => {
        if (n.classList.contains(highlightClass)) {
          n.replaceWith(...n.childNodes);
        }
      });
      sel.removeAllRanges();
      return;
    }

    intersectingNodes.forEach(node => {
      const span = document.createElement('span');
      span.className = highlightClass;
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);
    });

    sel.removeAllRanges();
  });


  /* =========================================================
     COPY SELECTED TEXT
  ========================================================= */
  copyBtn?.addEventListener('click', () => {
    const sel = window.getSelection();
    const text = sel.toString().trim();

    if (!text) {
      alert("Select text first.");
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => alert("Copied!"))
      .catch(err => console.error(err));
  });


  /* =========================================================
     READABLE CONTAINER LOGIC
  ========================================================= */
  function getReadableContainer() {
    const sel = window.getSelection();
    let node = sel?.anchorNode;

    while (node) {
      if (node.classList?.contains?.('question-text')) return node;
      if (node.id === 'mvTextContainer') return node;
      node = node.parentNode;
    }
    return null;
  }

  function getCursorOffset(container) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return 0;

    const range = sel.getRangeAt(0);
    const pre = document.createRange();
    pre.setStart(container, 0);
    pre.setEnd(range.startContainer, range.startOffset);
    return pre.toString().length;
  }

/* =========================================================
   MOBILE CHUNKING (ADD HERE)
========================================================= */

function buildChunks(text) {

  const MAX = /Mobi|Android/i.test(navigator.userAgent) ? 120 : 180;

  const sentences = text
    .replace(/([.?!]+)\s+/g, "$1|")
    .split("|")
    .map(s => s.trim())
    .filter(Boolean);

  const chunks = [];
  let buffer = "";

  for (let s of sentences) {

    // 🔥 handle very long sentences safely
    if (s.length > MAX) {
      for (let i = 0; i < s.length; i += MAX) {
        chunks.push(s.slice(i, i + MAX));
      }
      continue;
    }

    if ((buffer + s).length > MAX) {
      if (buffer.trim()) chunks.push(buffer.trim());
      buffer = s + " ";
    } else {
      buffer += s + " ";
    }
  }

  if (buffer.trim()) chunks.push(buffer.trim());

  return chunks;
}






  /* =========================================================
     SPEAK FROM CURSOR
  ========================================================= */
function speakFrom(container, offset) {

  const fullText = container.textContent || "";
  const text = fullText.slice(offset);
  if (!text.trim()) return;

  const chunks = [];
  const MAX = /Mobi|Android/i.test(navigator.userAgent) ? 120 : 180;

  // --- sentence-based chunking ---
  const sentences = text
    .replace(/([.?!])\s+/g, "$1|")
    .split("|")
    .map(s => s.trim())
    .filter(Boolean);

  let buffer = "";
  for (let s of sentences) {
    if ((buffer + s).length > MAX) {
      if (buffer) chunks.push(buffer);
      buffer = s + " ";
    } else {
      buffer += s + " ";
    }
  }
  if (buffer) chunks.push(buffer);

  let chunkIndex = 0;
  let globalOffset = offset;   // 🔥 CRITICAL

  narratorActive = true;
  lastContainer = container;
  lastOffset = offset;

  function speakChunk() {

    if (chunkIndex >= chunks.length) {
      narratorActive = false;
      lastOffset = 0;
      lastCharIndex = 0;
      return;
    }

    const chunkText = chunks[chunkIndex];

    utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.voice = teacherVoice;

    utterance.onboundary = (e) => {
      if (e.name === "word") {
        // 🔥 maintain continuous index for your highlighter system
        lastCharIndex = globalOffset + e.charIndex;
      }
    };

    utterance.onend = () => {
      // 🔥 advance global offset correctly
      globalOffset += chunkText.length;
      chunkIndex++;
      speakChunk();
    };

    synth.speak(utterance);
  }

  speakChunk();
}

  /* =========================================================
     START BUTTON
  ========================================================= */
  startBtn?.addEventListener('click', () => {

    const container = getReadableContainer();
    if (!container) {
      alert("Place cursor inside readable text");
      return;
    }

    const offset = getCursorOffset(container);

if (synth.speaking || synth.paused) {
  synth.cancel();
  clearHighlight();   // ← ADD THIS LINE
  narratorActive = false;
  return;
}

    lastCharIndex = offset;
    speakFrom(container, offset);
  });


  /* =========================================================
     EMOJI SPEECH OVERLAYS
  ========================================================= */
  function addSpeechEmojis() {
    const paragraphs = document.querySelectorAll('.question-text p, .sentence, #quizSections p');

    paragraphs.forEach(p => {
      if (p.dataset.speechOverlay) return;
      p.dataset.speechOverlay = '1';

      const text = p.textContent.trim();
      let speaker = null;

      if (/^teacher:/i.test(text)) speaker = 'teacher';
      else if (/^student:/i.test(text)) speaker = 'student';
      else return;

      const emoji = speaker === 'teacher' ? '👩‍🦰' : '👧';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.all = 'unset';
      btn.style.cursor = 'pointer';
      btn.style.fontSize = '14px';
      btn.style.display = 'inline';
      btn.style.margin = '0';
      btn.style.padding = '0';
      btn.style.lineHeight = '1';
      btn.style.verticalAlign = 'baseline';
      btn.title = speaker === 'teacher' ? 'Teacher Speech' : 'Student Speech';
      btn.textContent = emoji + ' ';

btn.addEventListener('click', () => {

  // Stop current speech
if (synth.speaking) {
  synth.cancel();
  clearHighlight();   // ← ADD THIS LINE
}

  // Remove any existing highlight
  document.querySelectorAll(".reading-active")
    .forEach(el => el.classList.remove("reading-active"));

  // Highlight this paragraph (pale yellow)
  p.classList.add("reading-active");

  const lineText = text.replace(/^(teacher:|student:)\s*/i, '');
  const utter = new SpeechSynthesisUtterance(lineText);

  if (speaker === 'teacher') {
    utter.voice = teacherVoice;
    utter.rate = 0.88;
    utter.pitch = 1.15;
    utter.volume = 0.95;
  } else {
    utter.voice = studentVoice;
    utter.rate = 0.98;
    utter.pitch = 1.50;
    utter.volume = 0.80;
  }

  utter.onend = () => {
    p.classList.remove("reading-active");
  };

  synth.speak(utter);
});      p.insertBefore(btn, p.firstChild);
    });
  }

  addSpeechEmojis();
  setInterval(addSpeechEmojis, 1000);


  /* =========================================================
     ACTIVE READING HIGHLIGHT
  ========================================================= */

  if (!document.getElementById("speechHighlightStyle")) {
    const style = document.createElement("style");
    style.id = "speechHighlightStyle";
    style.textContent = `
.reading-active {
  background-color: #fff9c4 !important;
  transition: background-color 0.4s ease;
}
    `;
    document.head.appendChild(style);
  }

  function clearHighlight() {
    if (activeParagraph) {
      activeParagraph.classList.remove("reading-active");
      activeParagraph = null;
    }
  }

  function startMonitoring() {
    if (monitorInterval) return;

    monitorInterval = setInterval(function(){
      if (!synth.speaking) {
        clearHighlight();
        clearInterval(monitorInterval);
        monitorInterval = null;
      }
    }, 100);
  }

  document.addEventListener("click", function(e){

    const btn = e.target.closest("button");
    if (!btn) return;

    const p = btn.closest("p");
    if (!p) return;

    if (synth.speaking) {
      clearHighlight();
      return;
    }

    setTimeout(function(){
      if (synth.speaking) {
        clearHighlight();
        activeParagraph = p;
        p.classList.add("reading-active");
        startMonitoring();
      }
    }, 50);

  });

})();
</script>

<!-- End-->

<script>
(function(){

  const synth = window.speechSynthesis;

  let paragraphs = [];
  let paragraphRanges = [];
  let currentIndex = -1;

  let baseOffset = 0;          // where speech started in full text
  let lastSpokenGlobal = 0;    // last spoken absolute character index
  let lastStartContainer = null;
  let lastStartOffset = 0;

  /* ===============================
     Pale Yellow Highlight CSS
  =============================== */
  if (!document.getElementById("autoParagraphHighlightStyle")) {
    const style = document.createElement("style");
    style.id = "autoParagraphHighlightStyle";
    style.textContent = `
      .auto-paragraph-active {
        background-color: #fff9c4;
        transition: background-color 0.4s ease;
      }
      .auto-paragraph-fade {
        background-color: transparent;
        transition: background-color 0.8s ease;
      }
    `;
    document.head.appendChild(style);
  }

  function clearAll() {
    paragraphs.forEach(p => {
      p.classList.remove("auto-paragraph-active");
      p.classList.remove("auto-paragraph-fade");
    });
  }

  function fadeParagraph(index) {
    if (index < 0 || index >= paragraphs.length) return;
    const p = paragraphs[index];
    p.classList.remove("auto-paragraph-active");
    p.classList.add("auto-paragraph-fade");
    setTimeout(() => {
      p.classList.remove("auto-paragraph-fade");
    }, 800);
  }

  function highlightParagraph(index) {
    if (index < 0 || index >= paragraphs.length) return;
    paragraphs[index].classList.add("auto-paragraph-active");
  }

  function collectParagraphsFrom(root) {
    paragraphs = Array.from(root.querySelectorAll("p"))
      .filter(p => p.textContent.trim().length > 0);

    paragraphRanges = [];
    let runningLength = 0;

    paragraphs.forEach(p => {
      const len = p.textContent.length;
      paragraphRanges.push({
        start: runningLength,
        end: runningLength + len
      });
      runningLength += len;
    });
  }

function findParagraphIndex(globalCharIndex) {

  const BUFFER = 8; // helps catch short dialogue lines

  for (let i = 0; i < paragraphRanges.length; i++) {
    const r = paragraphRanges[i];

    if (
      globalCharIndex >= (r.start - BUFFER) &&
      globalCharIndex < (r.end + BUFFER)
    ) {
      return i;
    }
  }

  return -1;
}

  function getCursorInfo() {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;

    const range = sel.getRangeAt(0);

    let container = range.startContainer;
    while (container && container.nodeType !== 1) {
      container = container.parentNode;
    }
    if (!container) return null;

    const root = container.closest("#mvTextContainer, .question-text") || document.body;

    const preRange = document.createRange();
    preRange.setStart(root, 0);
    preRange.setEnd(range.startContainer, range.startOffset);

    const offset = preRange.toString().length;

    return { root, offset, container };
  }

/* ========================================== 
   Hook safely into speech (NO AUTO-HIGHLIGHT)
========================================== */
const originalSpeak = synth.speak.bind(synth);

synth.speak = function(utterance) {

  const cursorInfo = getCursorInfo();
  if (!cursorInfo) return originalSpeak(utterance);

  const { offset, container } = cursorInfo;

  // Detect if cursor moved
  const cursorMoved =
    container !== lastStartContainer ||
    offset !== lastStartOffset;

  if (cursorMoved) {
    baseOffset = offset;
    lastSpokenGlobal = offset;
  }

  lastStartContainer = container;
  lastStartOffset = offset;

  // Optional: still track position silently (no UI effects)
  utterance.addEventListener("boundary", function(e){
    if (e.name !== "word") return;
    lastSpokenGlobal = baseOffset + e.charIndex;
  });

  utterance.addEventListener("end", function(){
    if (!synth.speaking) {
      lastSpokenGlobal = 0;
      baseOffset = 0;
    }
  });

  return originalSpeak(utterance);
};</script>

<!-- ====== 5. Emoji + Audio Feedback ====== -->
<script>
(function() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playCorrect() { 
    audioCtx.resume().then(() => { 
      const o = audioCtx.createOscillator(); 
      const g = audioCtx.createGain(); 
      o.type = "sine"; 
      o.frequency.setValueAtTime(800, audioCtx.currentTime); 
      g.gain.setValueAtTime(0.4, audioCtx.currentTime); 
      o.connect(g); g.connect(audioCtx.destination); 
      o.start(); o.stop(audioCtx.currentTime + 0.25); 
    }); 
  }

  function playWrong() { 
    audioCtx.resume().then(() => { 
      const o = audioCtx.createOscillator(); 
      const g = audioCtx.createGain(); 
      o.type = "triangle"; 
      o.frequency.setValueAtTime(450, audioCtx.currentTime); 
      o.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.25); 
      g.gain.setValueAtTime(0.4, audioCtx.currentTime); 
      o.connect(g); g.connect(audioCtx.destination); 
      o.start(); o.stop(audioCtx.currentTime + 0.25); 
    }); 
  }

  function normalize(str){ 
    return str.trim().toLowerCase().replace(/\s+/g," "); 
  }

  // ======================
  // HANDLE ANSWER SELECTION
  // ======================
  document.body.addEventListener('change', e => {
    const exercise = e.target.closest('.exercise');
    if (!exercise) return;

    // Emojis & sound (fire every change)
    const textInputs = Array.from(exercise.querySelectorAll("input[type='text'], textarea"));
    const selectedInputs = Array.from(exercise.querySelectorAll("input:checked"));

    const userAnswers = textInputs.length 
      ? textInputs.map(i => normalize(i.value)) 
      : selectedInputs.map(i => normalize(i.value));

    const correctAnswers = Array.from(exercise.querySelectorAll('[data-correct]'))
      .map(i => normalize(i.dataset.correct));

    const isCorrect = userAnswers.every(ans => correctAnswers.includes(ans));

    // Remove previous emojis
    exercise.querySelectorAll('.mc-emoji').forEach(span => span.remove());

    // Add emojis
    selectedInputs.forEach(inp => {
      const lbl = inp.closest("label");
      if (lbl) {
        const span = document.createElement('span');
        span.className = "mc-emoji";
        span.style.marginLeft = "8px";
        span.textContent = isCorrect ? "😊" : "😢";
        lbl.appendChild(span);
      }
    });

    textInputs.forEach(inp => {
      const span = document.createElement('span');
      span.className = "mc-emoji";
      span.style.marginLeft = "8px";
      span.textContent = isCorrect ? "😊" : "😢";
      inp.parentNode.insertBefore(span, inp.nextSibling);
    });

    if (isCorrect) playCorrect(); else playWrong();

// ======================
// FIRST CLICK SCORING
// ======================
if (exercise.dataset.firstResponseLocked) return;
exercise.dataset.firstResponseLocked = 'true';

const totalExercises = 1; // each exercise counts as 1
const correctCount = isCorrect ? 1 : 0;
const percentage = correctCount * 100;

// store score in the element so Submit can display later
exercise.dataset.score = correctCount;
exercise.dataset.percentage = percentage;
});







  // ======================
  // SUBMIT BUTTON (DISPLAY SCOREBOARD ONLY)
  // ======================
  document.body.addEventListener('click', e => {
    if (!e.target.classList.contains('quiz-submit')) return;
    const sub = e.target.closest('.quiz-subsection');
    if (!sub) return;

    const exercises = sub.querySelectorAll('.exercise');

    // Aggregate first-click scores
    let correctCount = 0;
    exercises.forEach(ex => {
      const sc = Number(ex.dataset.score || 0);
      correctCount += sc;
    });

    const totalExercises = exercises.length;
    const percentage = totalExercises > 0 ? Math.round((correctCount / totalExercises) * 100) : 0;

    // Display in scoreboard
    const board = sub.querySelector('.quiz-scoreboard');
    if (board) {
      const dataEl = board.querySelector('.scoreboard-data');
      const name = sub.querySelector('.quiz-name')?.value || 'Anonymous';
      const id   = sub.querySelector('.quiz-id')?.value || 'N/A';
      const section = sub.closest('.section')?.querySelector('h2')?.textContent || 'Unknown Section';
      const subsection = sub.dataset.subsection || 'Unknown Subsection';
      const now = new Date();
      const pad = n => n.toString().padStart(2,'0');
      const dateString = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const filename = window.location.pathname.split('/').pop();

const resultText = `${filename}|${section.replace(/:+$/, '').trim()}: ${subsection.replace(/^:+/, '').trim()}|${name}|${id}|${dateString}|${correctCount}/${totalExercises}|${percentage}%`;
      if (dataEl) dataEl.textContent = resultText;

if (window.saveResult) {
  const finalResultText = board.querySelector('.scoreboard-data')?.textContent;
if (finalResultText && window.saveResult) {
  window.saveResult(finalResultText);
}
}

      board.style.display = 'block';
    }
  });

})();
</script>


<!--<script>
(function () {

  if (document.getElementById("global-green-border")) return;

  const border = document.createElement("div");
  border.id = "global-green-border";

  Object.assign(border.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "2147483647",
    boxShadow: "inset 0 0 0 10px #39FF14"
  });

  document.documentElement.appendChild(border);

})();
</script>-->

<script>
(function () {

  if (document.getElementById("global-green-border")) return;

  const border = document.createElement("div");
  border.id = "global-green-border";

  Object.assign(border.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "2147483647",
    boxShadow: "inset 0 0 0 10px #39FF14",
    willChange: "transform",
    transition: "transform 0.12s ease-out"
  });

  document.documentElement.appendChild(border);

  function adjustForKeyboard() {
    const vv = window.visualViewport;
    if (!vv) return;

    const keyboardOffset =
      window.innerHeight - vv.height - vv.offsetTop;

    border.style.transform =
      `translateY(-${Math.max(0, keyboardOffset)}px)`;
  }

  const vv = window.visualViewport;

  if (vv) {
    vv.addEventListener("resize", adjustForKeyboard);
    vv.addEventListener("scroll", adjustForKeyboard);
  }

  adjustForKeyboard();

})();
</script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

<script>
(function() {
  const quizSections = document.getElementById('quizSections');

  // Event delegation for scoreboard buttons
  quizSections.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const board = e.target.closest('.quiz-scoreboard');
    if (!board) return;

    const dataEl = board.querySelector('.scoreboard-data');
    if (!dataEl) return;

    const text = dataEl.textContent;

    // ===== COPY =====
    if (btn.classList.contains('score-copy')) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => console.error(err));
    }

    // ===== TXT =====
    if (btn.classList.contains('score-txt')) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quiz-score.txt';
      a.click();
      URL.revokeObjectURL(url);
    }

    // ===== PNG WITH 10px MARGIN =====
    if (btn.classList.contains('score-png')) {
      if (typeof html2canvas === 'undefined') {
        alert('html2canvas library is required for PNG export.');
        return;
      }

      // create temporary wrapper with 10px padding
      const wrapper = document.createElement('div');
      wrapper.style.padding = '10px';
      wrapper.style.background = '#f9f9f9';
      wrapper.style.display = 'inline-block';
      wrapper.style.fontFamily = 'monospace';
      wrapper.style.fontSize = '12px';
      wrapper.style.whiteSpace = 'pre-wrap';
      wrapper.style.lineHeight = '1.4';
      wrapper.appendChild(dataEl.cloneNode(true));

      document.body.appendChild(wrapper);

      html2canvas(wrapper).then(canvas => {
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'quiz-score.png';
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(wrapper); // clean up
        });
      });
    }


  }); // <- this closes the quizSections click listener

})(); // <- this closes the IIFE
</script>



<script>
(function() {
  // Enable/disable submit and radios based on inputs
  function updateControls(subsection) {
    const nameInput = subsection.querySelector('.quiz-name');
    const idInput = subsection.querySelector('.quiz-id');
    const submitBtn = subsection.querySelector('.quiz-submit');
    const radios = subsection.querySelectorAll('input[type="radio"]');

    const enabled = nameInput.value.trim() && idInput.value.trim();

    // Enable/disable submit
    submitBtn.disabled = !enabled;

    // Enable/disable radios
    radios.forEach(r => r.disabled = !enabled);
  }

  // Monitor input fields in all subsections
  document.body.addEventListener('input', e => {
    if (e.target.matches('.quiz-name, .quiz-id')) {
      const subsection = e.target.closest('.quiz-subsection');
      if (!subsection) return;
      updateControls(subsection);
    }
  });

  // Initialize all subsections on page load
  document.querySelectorAll('.quiz-subsection').forEach(sub => updateControls(sub));
})();
</script>


<script>
(function() {
  const normalize = str => str.trim().toLowerCase().replace(/\s+/g, " ");

  document.body.addEventListener('change', e => {
    const exercise = e.target.closest('.exercise');
    if (!exercise) return;

    // ----- Gather user answers -----
    const textInputs = Array.from(exercise.querySelectorAll("input[type='text'], textarea"));
    const selectedInputs = Array.from(exercise.querySelectorAll("input:checked"));

    const userAnswers = textInputs.length 
      ? textInputs.map(i => normalize(i.value))
      : selectedInputs.map(i => normalize(i.value));

    const correctAnswers = Array.from(exercise.querySelectorAll('[data-correct]'))
      .map(i => normalize(i.dataset.correct));

    const isCorrect = userAnswers.every(ans => correctAnswers.includes(ans));

    // ----- Add emojis -----
    const addEmoji = (element) => {
      if (!element.nextSibling || !element.nextSibling.classList?.contains('mc-emoji')) {
        const span = document.createElement('span');
        span.className = 'mc-emoji';
        span.style.marginLeft = '8px';
        span.textContent = isCorrect ? '😊' : '😟';
        element.parentNode.insertBefore(span, element.nextSibling);
      }
    };

    textInputs.forEach(addEmoji);

    selectedInputs.forEach(inp => {
      const label = inp.closest('label');
      if (label && !label.querySelector('.mc-emoji')) {
        const span = document.createElement('span');
        span.className = 'mc-emoji';
        span.style.marginLeft = '8px';
        span.textContent = isCorrect ? '😊' : '😟';
        label.appendChild(span);
      }
    });

  }); // close event listener
})(); // close IIFE
</script>

<script>
/* ==========================================================
   GLOBAL PAGE TITLE ENGINE
========================================================== */

(function () {

  function buildFormattedTitle() {

    let filename = window.location.pathname.split("/").pop() || "";
    filename = filename.replace(/\.[^/.]+$/, "");
    filename = decodeURIComponent(filename);

    const allowedPrefixes = [
      "g_game_","v_game_","rr_","cdf_","cdr_",
      "ws_","r_","a_","g_","v_"
    ];

    for (let prefix of allowedPrefixes) {
      if (filename.startsWith(prefix)) {
        filename = filename.substring(prefix.length);
        break;
      }
    }

    let rawTitle = filename.replace(/_/g," ").trim();
    if (!rawTitle) rawTitle = "Untitled";

    const minorWords = [
      "a","an","the","and","but","or","nor",
      "for","so","yet","at","by","in","of","on","to","up","as","off","out"
    ];

    // ✅ Acronyms to preserve in uppercase
    const acronyms = ["ot", "nt"];

    return rawTitle.split(/\s+/).map((word, i) => {

      const lower = word.toLowerCase();

      // preserve acronyms like OT / NT
      if (acronyms.includes(lower)) {
        return lower.toUpperCase();
      }

      // first word always capitalized
      if (i === 0) {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }

      // minor words stay lowercase
      if (minorWords.includes(lower)) {
        return lower;
      }

      // default title case
      return lower.charAt(0).toUpperCase() + lower.slice(1);

    }).join(" ");
  }

  window.pageTitle = buildFormattedTitle();

  window.applyPageTitle = function(root=document){
    root.querySelectorAll("h1[data-auto-title]").forEach(h=>{
      h.textContent = window.pageTitle;
      h.style.textTransform = "none";
      h.style.visibility = "visible";
    });
  };

})();

/* ==========================================================
   PAGE INIT
========================================================== */

document.addEventListener("DOMContentLoaded",function(){

  window.applyPageTitle();

});


/* ==========================================================
   AUTO OPEN SINGLE SECTION
========================================================== */

(function(){

  function tryAutoOpenSingleSection(){

    if(!window.sections || !Array.isArray(window.sections)) return;
    if(typeof window.openQuizModal !== "function") return;

    const root=document.documentElement;

    const hardOn=root.classList.contains("show-hard");
    const dynamicOn=root.classList.contains("show-dynamic");

const recentlyClosed =
  window.__quizJustClosed &&
  (Date.now() - window.__quizJustClosed < 1500);

if (window.sections.length === 1 && !hardOn && !dynamicOn && !recentlyClosed) {
  window.openQuizModal(0);
}
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",tryAutoOpenSingleSection);
  }else{
    tryAutoOpenSingleSection();
  }

})();





/* ==========================================================
   MODAL CONTROL MOVEMENT + CHAPTER/VERSE SYSTEM (ROBUST)
========================================================== */

function moveControlsIntoModal(){

  const modalContent=document.getElementById("quizModalContent");
  if(!modalContent) return;

  const chapterControls=document.getElementById("chapterVerseControls");
  const readAloud=document.getElementById("readaloudControls");

  if(chapterControls && !modalContent.contains(chapterControls)){
    modalContent.insertBefore(chapterControls,modalContent.firstChild);
  }

  if(readAloud){
    readAloud.style.display="block";

    if(!modalContent.contains(readAloud)){
      modalContent.insertBefore(
        readAloud,
        chapterControls?.nextSibling || modalContent.firstChild
      );
    }
  }
}


function buildChapterVerseLogic(){

  const modal=document.getElementById("quizModal");
  if(!modal) return;

  const readAloud=modal.querySelector("#readaloudControls");
  const chapterControls=modal.querySelector("#chapterVerseControls");
  const textContainer=modal.querySelector("#quizSections");

  const chapterSelect=modal.querySelector("#chapterSelect");
  const verseSelect=modal.querySelector("#verseSelect");
  const goBtn=modal.querySelector("#goBtn");

  if(!textContainer || !chapterSelect || !verseSelect || !goBtn){
    console.warn("Chapter/Verse system missing required elements");
    return;
  }

  if(chapterControls){
    chapterControls.style.display="block";
  }

  const paragraphs=[...textContainer.querySelectorAll("p")];
  if(!paragraphs.length){
    console.warn("No paragraphs found for chapter/verse mapping");
    return;
  }

  const structure={};
  let currentChapter=null;

  // ===== helper: normalize text =====
  const clean = (t)=>t.trim().replace(/\s+/g,' ');

  paragraphs.forEach(p=>{

    const text=clean(p.textContent);

    // ===== FLEXIBLE CHAPTER MATCHING =====
    const chapMatch=
      text.match(/^chapter\s*:?\s*(\d+)/i) ||
      text.match(/^#?\s*chapter\s*(\d+)/i) ||
      text.match(/^(\d+)\.\s*chapter/i);

    // ===== FLEXIBLE VERSE MATCHING =====
    const verseMatch=
      text.match(/^verse\s*:?\s*(\d+)/i) ||
      text.match(/^v\s*(\d+)/i);

    const fullRefMatch=text.match(/^(\d+):(\d+)\s/);

    // ===== chapter detection =====
    if(chapMatch){
      currentChapter=chapMatch[1];
      if(!structure[currentChapter]) structure[currentChapter]={};
      return;
    }

    // ===== verse detection (context-based) =====
    if(currentChapter && verseMatch){
      structure[currentChapter][verseMatch[1]]=p;
      return;
    }

    // ===== inline chapter:verse detection =====
    if(fullRefMatch){
      const c=fullRefMatch[1];
      const v=fullRefMatch[2];

      if(!structure[c]) structure[c]={};
      structure[c][v]=p;

      currentChapter=c;
    }

  });

  // ===== DEBUG SAFETY =====
  if(Object.keys(structure).length===0){
    console.warn("ChapterVerse structure is EMPTY. Check formatting.");
  }

  // ===== populate chapters =====
  chapterSelect.innerHTML="";

  Object.keys(structure).forEach(ch=>{
    const opt=document.createElement("option");
    opt.value=ch;
    opt.textContent="Chapter "+ch;
    chapterSelect.appendChild(opt);
  });

  function updateVerses(){

    verseSelect.innerHTML="";
    const ch=chapterSelect.value;
    if(!structure[ch]) return;

    Object.keys(structure[ch]).forEach(v=>{
      const opt=document.createElement("option");
      opt.value=v;
      opt.textContent="Verse "+v;
      verseSelect.appendChild(opt);
    });

  }

  chapterSelect.onchange=updateVerses;
  updateVerses();

  function clearHighlights(){
    paragraphs.forEach(p=>p.classList.remove("selected-verse"));
  }

  function getControlsOffset(extraPadding=0){

    const readHeight=readAloud ? readAloud.offsetHeight : 0;

    const chapterHeight=
      chapterControls &&
      chapterControls.style.display!=="none"
      ? chapterControls.offsetHeight
      : 0;

    return readHeight + chapterHeight + extraPadding;
  }

  goBtn.onclick=function(){

    const chapter=chapterSelect.value;
    const verse=verseSelect.value;

    if(!structure[chapter] || !structure[chapter][verse]){
      console.warn("Verse not found:", chapter, verse);
      return;
    }

    const target=structure[chapter][verse];

    clearHighlights();
    target.classList.add("selected-verse");

    const offset=getControlsOffset(10);

    modal.scrollTo({
      top:target.offsetTop-offset,
      behavior:"smooth"
    });
  };

  window.chapterVerseStructure = structure; // debug access
}

/* ==========================================================
   MODAL ARROW SCROLL
========================================================== */

(function(){

  const modalRoot=document.getElementById("modalRoot");
  const modal=document.getElementById("quizModal");
  if(!modalRoot || !modal) return;

  const SCROLL_AMOUNT=50;
  let enabled=false;

  function isTypingTarget(target){

    return target.closest("input, textarea")
      || target.isContentEditable
      || target.closest("[contenteditable='true']");

  }

  function handleKeydown(e){

    if(!enabled) return;
    if(e.key!=="ArrowDown" && e.key!=="ArrowUp") return;
    if(isTypingTarget(e.target)) return;

    e.preventDefault();

    modal.scrollBy({
      top:e.key==="ArrowDown" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior:"smooth"
    });

  }

  function enable(){
    if(enabled) return;
    enabled=true;
    document.addEventListener("keydown",handleKeydown);
  }

  function disable(){
    enabled=false;
    document.removeEventListener("keydown",handleKeydown);
  }

  const observer=new MutationObserver(()=>{
    const active=modalRoot.classList.contains("active");
    if(active) enable();
    else disable();
  });

  observer.observe(modalRoot,{attributes:true,attributeFilter:["class"]});

})();


/* ==========================================================
   STRICT SUBMIT LOCK
========================================================== */

(function(){

  function updateSubsectionState(sub){

    const name=sub.querySelector('.quiz-name');
    const id=sub.querySelector('.quiz-id');
    const submit=sub.querySelector('.quiz-submit');
    const radios=sub.querySelectorAll('input[type="radio"]');

    if(!name || !id || !submit) return;

    const enabled=name.value.trim() && id.value.trim();

    submit.disabled=!enabled;
    radios.forEach(r=>r.disabled=!enabled);

  }

  function initSub(sub){

    if(sub.dataset.lockInitialized) return;
    sub.dataset.lockInitialized="1";

    const name=sub.querySelector('.quiz-name');
    const id=sub.querySelector('.quiz-id');
    if(!name || !id) return;

    updateSubsectionState(sub);

    name.addEventListener("input",()=>updateSubsectionState(sub));
    id.addEventListener("input",()=>updateSubsectionState(sub));

  }

  function scan(){
    document.querySelectorAll('.quiz-subsection').forEach(initSub);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",scan);
  }else{
    scan();
  }

  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});

})();


/* ==========================================================
   GLOBAL LINK FADE
========================================================== */

document.addEventListener("click",function(e){

  const link=e.target.closest("a");
  if(!link) return;

  e.preventDefault();

  document.body.style.transition="opacity 80ms ease";
  document.body.style.opacity="0";

  setTimeout(()=>{
    window.location.href=link.href;
  },80);

});
</script>

<script>
document.addEventListener("DOMContentLoaded", () => {

  const targets = [
    { parent:"#layout", content:"#layout", gap:-30 },
    { parent:"#tocContainer", content:"#tocContainer", gap:-20 },
    { parent:"#quizModal", content:"#quizModalContent", gap:-30 }
  ];

  const copyrightHTML = `
    <section class="copyrightSection">
      <div class="footer-note copyright">
        © <span class="auto-year"></span> Perfectly Practical English™. All rights reserved.
      </div>
<div id="visitor-count">Visits: loading...</div>

    </section>
  `;

  function insertCopyright(parent){
    if (!parent.querySelector(":scope > .copyrightSection")) {
      parent.insertAdjacentHTML("beforeend", copyrightHTML);
    }
  }

  function adjust(parent, content, desiredGap){

    const copyright = parent.querySelector(".copyrightSection");
    const last = content.lastElementChild;

    if (!copyright || !last) return;

    const lastBottom = last.getBoundingClientRect().bottom;
    const copyTop = copyright.getBoundingClientRect().top;

    const currentGap = copyTop - lastBottom;
    const adjust = currentGap - desiredGap;

    copyright.style.marginTop = (-adjust - 5) + "px";
  }

  function update(){

    targets.forEach(t => {

      const parent = document.querySelector(t.parent);
      const content = document.querySelector(t.content);

      if (!parent || !content) return;

      insertCopyright(parent);
      adjust(parent, content, t.gap);

    });

  }

  // set year
  document.querySelectorAll(".auto-year").forEach(el=>{
    el.textContent = new Date().getFullYear();
  });

  update();

  window.addEventListener("resize", update);

});
</script>

<script>
(function(){

  const startBtn = document.getElementById('startBtn');
  let activeEl = null;

  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const DRAG_THRESHOLD = 8;

  const X_THRESHOLD = 60;
  const Y_THRESHOLD = 30;

  const synth = window.speechSynthesis;

  /* =========================
     STYLE (soft + fade out)
  ========================= */
  if (!document.getElementById("chunkHighlightStyle")) {
    const style = document.createElement("style");
    style.id = "chunkHighlightStyle";
    style.textContent = `
      .chunk-active {
        background: #fff9c4;
        transition: background 0.6s ease;
      }
    `;
    document.head.appendChild(style);
  }

  function fadeHighlight() {
    if (!activeEl) return;

    activeEl.style.background = "transparent";

    setTimeout(() => {
      if (activeEl) {
        activeEl.classList.remove("chunk-active");
        activeEl.style.background = "";
        activeEl = null;
      }
    }, 600);
  }

  function setHighlight(el) {
    if (activeEl) {
      activeEl.classList.remove("chunk-active");
    }
    activeEl = el;
    el.classList.add("chunk-active");
  }

  function placeCursorAtStart(el) {
    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  /* =========================
     POINTER TRACKING
  ========================= */
  document.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = false;
  });

  document.addEventListener("pointermove", (e) => {
    if (Math.abs(e.clientX - startX) > DRAG_THRESHOLD ||
        Math.abs(e.clientY - startY) > DRAG_THRESHOLD) {
      isDragging = true;
    }
  });

  /* =========================
     TAP → TOGGLE PLAY/STOP
  ========================= */
  document.addEventListener("pointerup", function(e){

    if (isDragging) return;

    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;

    const p = e.target.closest(".question-text p, #quizSections p");
    if (!p) return;

    if (e.target.closest("button, input, label")) return;

    const rect = p.getBoundingClientRect();

    const isRightZone = e.clientX > rect.right - X_THRESHOLD;
    const isBottomZone = e.clientY > rect.bottom - Y_THRESHOLD;

    if (!(isRightZone && isBottomZone)) return;

    // =========================
    // 🔥 TOGGLE LOGIC
    // =========================

    if (synth.speaking) {
      // STOP
      synth.cancel();
      fadeHighlight();
      return;
    }

    // START (fresh)
    setHighlight(p);
    placeCursorAtStart(p);

    setTimeout(() => {
      if (startBtn) startBtn.click();
    }, 40);

  });

  /* =========================
     AUTO FADE WHEN SPEECH ENDS
  ========================= */
  const originalSpeak = synth.speak.bind(synth);

  synth.speak = function(utterance) {

    utterance.addEventListener("end", () => {
      fadeHighlight();
    });

    return originalSpeak(utterance);
  };

})();
</script>

<script>
(function() {
  // Prevent pinch-to-zoom
  function preventPinch(e) {
    if (e.touches.length > 1) e.preventDefault();
  }

  // Prevent double-tap zoom
  let lastTouchTime = 0;
  function preventDoubleTap(e) {
    const now = Date.now();
    if (now - lastTouchTime < 300) {
      e.preventDefault();
    }
    lastTouchTime = now;
  }

  // Block gesture events on iOS
  function preventGesture(e) {
    e.preventDefault();
  }

  document.addEventListener('touchstart', preventPinch, { passive: false });
  document.addEventListener('touchend', preventDoubleTap, { passive: false });
  document.addEventListener('gesturestart', preventGesture, { passive: false });
})();
</script>

<script>
(function () {

  const synth = window.speechSynthesis;
  const startBtn = document.getElementById("startBtn");
  if (!startBtn) return;

  // -------------------------
  // CREATE BOTTOM BUTTON
  // -------------------------
  const proxyBtn = document.createElement("button");
  document.body.appendChild(proxyBtn);

  // -------------------------
  // DETECT VISIBILITY
  // -------------------------
  function isVisible(el) {
    if (!el) return false;

    const rect = el.getBoundingClientRect();

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  // -------------------------
  // SYNC LABEL
  // -------------------------
  function syncLabel() {
    const topLabel = startBtn.textContent?.trim() || "Start";
    proxyBtn.textContent = topLabel;
  }

  // -------------------------
  // 🔥 KEYBOARD-AWARE POSITIONING
  // -------------------------
  function adjustForKeyboard() {
    const vv = window.visualViewport;
    if (!vv) return;

    const keyboardOffset =
      window.innerHeight - vv.height - vv.offsetTop;

    proxyBtn.style.transform =
      `translateY(-${Math.max(0, keyboardOffset)}px)`;
  }

  // -------------------------
  // 🔥 SYNC STYLES
  // -------------------------
  function syncStyles() {
    const cs = window.getComputedStyle(startBtn);

    Object.assign(proxyBtn.style, {
      position: "fixed",
      bottom: "20px",
      left: "20px",
      zIndex: 999999,
      padding: "10px 14px",
      borderRadius: "6px",
      border: cs.border,
      background: cs.backgroundColor,
      color: cs.color,
      fontSize: cs.fontSize,
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
      userSelect: "none",

      // 🔥 important for smooth movement
      willChange: "transform",
      transition: "transform 0.12s ease-out"
    });
  }

  // -------------------------
  // MAIN CLICK
  // -------------------------
  proxyBtn.addEventListener("click", () => {
    startBtn.click();
  });

  // -------------------------
  // KEEP IN SYNC
  // -------------------------
  const observer = new MutationObserver(() => {
    syncLabel();
    syncStyles();
  });

  observer.observe(startBtn, {
    subtree: true,
    childList: true,
    characterData: true
  });

  setInterval(() => {
    syncLabel();
    syncStyles();
  }, 300);

  // -------------------------
  // 🔥 KEYBOARD EVENTS
  // -------------------------
  const vv = window.visualViewport;

  if (vv) {
    vv.addEventListener("resize", adjustForKeyboard);
    vv.addEventListener("scroll", adjustForKeyboard);
  }

  // -------------------------
  // INIT
  // -------------------------
  syncLabel();
  syncStyles();
  adjustForKeyboard();

})();
</script>


<script>
(function(){

const RAW_TEXT = `
Open Section Content 
1. Click blue buttons to open sections.

---

Reader Tools

1. Highlight - Select text and click to highlight.
2. Click again to remove highlight.
3. Copy - Select text and click to copy.
4. Click Close to exit.

---

Quiz

1. Enter Name and ID.
2. Select best answer.
3. Click Submit to see score.
4. Click Close to exit.
`;

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("instructionsBtn");
  if (!btn) return;

  // create isolated modal ONCE
  let modal = document.getElementById("info-instructions-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "info-instructions-modal";

    Object.assign(modal.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0,0,0,0.6)",
      display: "none",
      zIndex: "999999",
      padding: "40px",
      boxSizing: "border-box"
    });

modal.innerHTML = `
  <div style="
    max-width:700px;
    margin:0 auto;
    background:#fff;
    padding:20px;
    border-radius:10px;
    position:relative;
    max-height:80vh;
    overflow:auto;
    font-family:inherit;
    box-sizing:border-box;
  ">

<button id="close-instructions-modal" class="modal-close-btn">✕</button>

    <pre style="
      white-space:pre-wrap;
      margin:0;
      padding-top:10px;
      overflow-wrap:break-word;
      word-break:break-word;
    ">${RAW_TEXT}</pre>

  </div>
`;

    document.body.appendChild(modal);

    modal.querySelector("#close-instructions-modal").onclick = () => {
      modal.style.display = "none";
    };
  }

  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });

});

})();
</script>

<script>
(function(){

const RAW_TEXT = `
Comprehensive reading strategy checklist

1. Cut texts into small pieces.
2. Collect context clues.
3. Reread when lost.
4. Scan titles and images.
5. Identify known/unknown words.
6. Use background knowledge.
7. Break down word parts.
8. Look up vocabulary.
9. Identify signal words.
`;

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("strategiesBtn");
  if (!btn) return;

  let modal = document.getElementById("info-strategies-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "info-strategies-modal";

    Object.assign(modal.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0,0,0,0.6)",
      display: "none",
      zIndex: "999999",
      padding: "40px",
      boxSizing: "border-box"
    });

    modal.innerHTML = `
      <div style="
        max-width:700px;
        margin:0 auto;
        background:#fff;
        padding:20px;
        border-radius:10px;
        position:relative;
        max-height:80vh;
        overflow:auto;
        font-family:inherit;
      ">

<button id="close-strategies-modal" class="modal-close-btn">✕</button>

        <pre style="white-space:pre-wrap;margin:0;">${RAW_TEXT}</pre>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#close-strategies-modal").onclick = () => {
      modal.style.display = "none";
    };
  }

  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });

});

})();
</script>

<script>
(function(){

const RAW_TEXT = `
Common Signal Word Categories and Examples

• Time ⏰: words that tell when something happens

on, at, in, before, after, since, until, during, for, now, yesterday, today, tomorrow, later, then, when, while, once

• Addition ➕: words that add ideas together

and, also, too, with, plus, as well as, not only...but also, both...and

• Cause / Effect 🔗: words that show a reason or result

because, so, since, because of, due to, as a result, therefore, that’s why

• Comparison / Similarity / Difference ⚖️: words that compare things

like, as, as...as, than, similar to, different from, more than, less than, the most, just as...so, whereas, in contrast to

• Contrast / Opposition 🎭: words that show differences

but, although, though, even though, however, yet, still, despite, instead, whereas, while, on the other hand

• Frequency 〰️: words that tell how often something happens

always, usually, often, sometimes, occasionally, rarely, never, every day, once a week, hardly ever, from time to time

• Possibility / Certainty 🎲: words that show how possible or sure something is

maybe, probably, possibly, must, might, may, could, can, definitely, certainly

• Advice / Obligation / Permission ☝️: words that tell rules or give guidance

must, must not, have to, don’t have to, should, ought to, had better, can, cannot, may, could

• Manner 🎭: words that tell how something is done

quickly, slowly, carefully, easily, well, badly, with, by, in a...way, as

• Place / Location 📍: words that tell where something is

in, on, at, under, above, between, near, next to, here, there, everywhere, anywhere

• Condition 🌧️: words that show something depends on something else

if, unless, in case, on condition that

• Emphasis / Focus 🎯: words that make something stronger or more important

only, just, even, especially, mainly, particularly

• Questions (Interrogatives) ❓: words used to ask questions

how, when, where, why

• Relative Words 👨‍👩‍👧‍👦: words that connect ideas about time, place, reason, or manner

when, where, why, how

• Direction / Movement 🧭: words that show movement or direction

to, from, toward, away from, up, down, forward, back

• Affirmative and Negative ✔️❌: words that show yes or no

yes, no
`;

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("signalwordsBtn");
  if (!btn) return;

  let modal = document.getElementById("info-signalwords-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "info-signalwords-modal";

    Object.assign(modal.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0,0,0,0.6)",
      display: "none",
      zIndex: "999999",
      padding: "40px",
      boxSizing: "border-box"
    });

    modal.innerHTML = `
      <div style="
        max-width:700px;
        margin:0 auto;
        background:#fff;
        padding:20px;
        border-radius:10px;
        position:relative;
        max-height:80vh;
        overflow:auto;
        font-family:inherit;
      ">

<button id="close-signalwords-modal" class="modal-close-btn">✕</button>

        <pre style="white-space:pre-wrap;margin:0;">${RAW_TEXT}</pre>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#close-signalwords-modal").onclick = () => {
      modal.style.display = "none";
    };
  }

  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });

});

})();
</script>



<script>
(function() {
  // Prevent pinch-to-zoom
  function preventPinch(e) {
    if (e.touches.length > 1) e.preventDefault();
  }

  // Prevent double-tap zoom
  let lastTouchTime = 0;
  function preventDoubleTap(e) {
    const now = Date.now();
    if (now - lastTouchTime < 300) {
      e.preventDefault();
    }
    lastTouchTime = now;
  }

  // Block gesture events on iOS
  function preventGesture(e) {
    e.preventDefault();
  }

  document.addEventListener('touchstart', preventPinch, { passive: false });
  document.addEventListener('touchend', preventDoubleTap, { passive: false });
  document.addEventListener('gesturestart', preventGesture, { passive: false });
})();
</script>

<script>

function goToNextQuiz(){

  const modal = document.getElementById("quizModal");
  const container = modal?.querySelector("#quizSections");

  // ✔️ TARGET THE ACTUAL BUTTON (NOT THE FUNCTION)
  const goBtn = document.querySelector('button[onclick="goToNextQuiz()"]');

  if(!container) return;

  const originalLabel = goBtn?.textContent || "Go to Quiz";

  function showNoQuizEmoji(){

    if(!goBtn) return;

    goBtn.textContent = "🚫";

    setTimeout(() => {
      goBtn.textContent = originalLabel;
    }, 900);

  }

  const firstQuiz = container.querySelector(".quiz-subsection");

  // ===== NO QUIZ FOUND =====
  if(!firstQuiz){
    showNoQuizEmoji();
    return;
  }

  const readAloud = modal?.querySelector("#readaloudControls");
  const chapterControls = modal?.querySelector("#chapterVerseControls");

  const offset =
    (readAloud?.offsetHeight || 0) +
    (chapterControls?.offsetHeight || 0) +
    20;

  modal.scrollTo({
    top: firstQuiz.offsetTop - offset,
    behavior: "smooth"
  });

}

</script>

<script>
// ===== UNIVERSAL CLOSE HANDLER (safe + no blank bug) =====
document.addEventListener("click", (e) => {

  const closeBtn = e.target.closest(
    ".quiz-close, .modal-close, #closeModalBtn"
  );

  if (!closeBtn) return;

  e.preventDefault();

  // Smooth fade instead of hard visibility kill
  document.body.style.opacity = "0";

  // Close modal immediately
  const modalRoot = document.getElementById("modalRoot");
  if (modalRoot) modalRoot.classList.remove("active");

  document.body.classList.remove("modal-open");

  // Force full reload
  setTimeout(() => {
    location.replace(window.location.pathname);
  }, 80);

});
</script>


<script>
(function () {

  function showPage() {
    const root = document.documentElement;
    const loader = document.getElementById("loader");

    // Remove old gating (safe even if unused)
    root.classList.remove("pre-auto-open", "show-hard", "show-dynamic");

    // ✅ Reveal UI (controls title via CSS)
    root.classList.add("ui-ready");

    // Force key containers visible
    const layout = document.getElementById("layout");
    const toc = document.getElementById("dynamicTOC");

    if (layout) layout.style.display = "block";
    if (toc) toc.style.display = "block";

    // Fallback: reveal hidden content if needed
    if (!layout && !toc) {
      document.body.style.visibility = "visible";
      document.querySelectorAll(".visually-hidden").forEach(el => {
        el.style.position = "static";
        el.style.left = "0";
      });
    }

    // Kill loader LAST
    if (loader) loader.remove();
  }

  // Run immediately (prevents stuck loader)
  showPage();

  // Backup safety
  document.addEventListener("DOMContentLoaded", showPage);
  window.addEventListener("load", showPage);
  setTimeout(showPage, 1500);

})();
</script>

<script>
document.addEventListener("DOMContentLoaded", () => {

  const targets = [
    { parent:"#layout", content:"#layout", gap:-30 },
    { parent:"#tocContainer", content:"#tocContainer", gap:-20 },
    { parent:"#quizModal", content:"#quizModalContent", gap:-30 }
  ];

  const copyrightHTML = `
    <section class="copyrightSection">

      <!-- 10px invisible space ABOVE copyright -->
      <div class="spacer spacer-top"></div>

      <div class="footer-note copyright">
        © <span class="auto-year"></span> Perfectly Practical English™. All rights reserved.
      </div>

      <div id="visitor-count" class="visitor-count">
        Visits: loading...
      </div>

      <!-- 30px invisible space BELOW visits -->
      <div class="spacer spacer-bottom"></div>


    </section>
  `;

  function insertCopyright(parent){
    if (!parent.querySelector(":scope > .copyrightSection")) {
      parent.insertAdjacentHTML("beforeend", copyrightHTML);
    }
  }

  function adjust(parent, content, desiredGap){

    const copyright = parent.querySelector(".copyrightSection");
    const last = content.lastElementChild;

    if (!copyright || !last) return;

    const lastBottom = last.getBoundingClientRect().bottom;
    const copyTop = copyright.getBoundingClientRect().top;

    const currentGap = copyTop - lastBottom;
    const adjust = currentGap - desiredGap;

    const extraOffset = 5; // try 5–10px

copyright.style.marginTop = (-adjust + extraOffset) + "px";
  }

  async function updateVisitorCount() {

    const namespace = "PerfectlyPracticalEnglish";
    const key = "homepage";

    const isOwner =
      localStorage.getItem("isOwner") === "true";

    const isLocal =
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";

    const alreadyCounted =
      sessionStorage.getItem("counted");

    let data;

    try {

      if (!isOwner && !isLocal && !alreadyCounted) {

        data = await fetch(
          `https://api.countapi.xyz/hit/${namespace}/${key}`
        ).then(r => r.json());

        sessionStorage.setItem("counted", "true");

      } else {

        data = await fetch(
          `https://api.countapi.xyz/get/${namespace}/${key}`
        ).then(r => r.json());

      }

      document.querySelectorAll("#visitor-count").forEach(el => {
        el.textContent = `Total: ${data.value} visits`;
      });

    } catch (err) {

      console.error("Visitor counter failed:", err);

      document.querySelectorAll("#visitor-count").forEach(el => {
        el.textContent = "Visits unavailable";
      });

    }

  }

  function update(){

    targets.forEach(t => {

      const parent = document.querySelector(t.parent);
      const content = document.querySelector(t.content);

      if (!parent || !content) return;

      insertCopyright(parent);
      adjust(parent, content, t.gap);

    });

  }

  // Set current year
  document.querySelectorAll(".auto-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  update();
  updateVisitorCount();

  window.addEventListener("resize", update);

});
</script>

<script>
function fixModalScrollRoom() {
  const vv = window.visualViewport;
  if (!vv) return;

  const keyboardHeight =
    window.innerHeight - vv.height - vv.offsetTop;

  const modal = document.getElementById("quizModal");
  if (!modal) return;

  modal.style.height =
    `calc(100dvh - ${keyboardHeight}px)`;
}

window.visualViewport?.addEventListener("resize", fixModalScrollRoom);
window.visualViewport?.addEventListener("scroll", fixModalScrollRoom);
window.addEventListener("resize", fixModalScrollRoom);

fixModalScrollRoom();

</script>

<!-- SUPABASE LIBRARY -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>

const supabaseClient = window.supabase?.createClient(
  'https://etwwriloppklhhkmswpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3dyaWxvcHBrbGhoa21zd3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NDM3NTcsImV4cCI6MjA5NDExOTc1N30.rmquTqYW6WqS7jZUbHM_gWecka3jkiWzYb14eJ10hpQ'
);

if (!supabaseClient) {
  console.error("❌ Supabase failed to initialize");
}

let lastUploadedScore = null;

window.saveResult = async function saveResult(text) {

  if (!supabaseClient) {
    console.error("❌ No Supabase client");
    return;
  }

  // ======================
  // NORMALIZE INPUT
  // ======================
  let cleaned;

  try {
    cleaned = (typeof text === "string")
      ? text
      : JSON.stringify(text);

    cleaned = cleaned.replace(/\s+/g, " ").trim();

  } catch (err) {
    console.error("❌ Normalize error:", err);
    return;
  }

  if (!cleaned) {
    console.error("❌ Empty value blocked");
    return;
  }

  if (cleaned === lastUploadedScore) {
    console.log("⚠️ Duplicate blocked");
    return;
  }

  lastUploadedScore = cleaned;

  console.log("📤 INSERTING INTO scoreboard_raw:", cleaned);

  const { data, error } = await supabaseClient
    .from("scoreboard_raw")
    .insert([
      { result_text: cleaned }
    ])
    .select();

  if (error) {
    console.error("❌ INSERT FAILED FULL ERROR:", error);
    return;
  }

  console.log("✅ INSERT SUCCESS:", data);
};

</script>

</body>
</html>








