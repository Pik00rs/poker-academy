const KEY = "pa.progress.v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    return { ...defaults(), ...parsed };
  } catch {
    return defaults();
  }
}

function defaults() {
  return {
    attempts: [], // { lessonId, score, total, date, details: [{q, correct, picked, correctAnswer}] }
    bestByLesson: {}, // lessonId -> bestPercent
  };
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function recordAttempt(lessonId, score, total, details = []) {
  const state = load();
  const attempt = {
    lessonId,
    score,
    total,
    date: new Date().toISOString(),
    details,
  };
  state.attempts.unshift(attempt);
  // Keep last 100 max
  state.attempts = state.attempts.slice(0, 100);

  const pct = Math.round((score / total) * 100);
  const prev = state.bestByLesson[lessonId] ?? 0;
  if (pct > prev) state.bestByLesson[lessonId] = pct;
  save(state);
  return attempt;
}

export function getProgress() {
  return load();
}

export function getBestScore(lessonId) {
  return load().bestByLesson[lessonId] ?? null;
}

export function isLessonCompleted(lessonId) {
  return load().bestByLesson[lessonId] !== undefined;
}

export function resetAll() {
  localStorage.removeItem(KEY);
}

export function getStats() {
  const state = load();
  const attempts = state.attempts;
  if (attempts.length === 0) {
    return { avg: 0, count: 0, lessonsTouched: 0, best: 0 };
  }
  const total = attempts.reduce(
    (acc, a) => acc + (a.score / a.total) * 100,
    0
  );
  const avg = Math.round(total / attempts.length);
  const lessonsTouched = Object.keys(state.bestByLesson).length;
  const best = Math.max(...Object.values(state.bestByLesson), 0);
  return { avg, count: attempts.length, lessonsTouched, best };
}
