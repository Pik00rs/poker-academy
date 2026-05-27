import { renderHome } from "./views/home.js";
import { renderLessonsList } from "./views/lessons-list.js";
import { renderLesson } from "./views/lesson.js";
import { renderExercise } from "./views/exercise.js";
import { renderProgress } from "./views/progress.js";

let appRoot;

export function initRouter(root) {
  appRoot = root;
  window.addEventListener("hashchange", route);
}

export function route() {
  if (!appRoot) return;
  const hash = window.location.hash || "#/home";
  const parts = hash.replace(/^#\//, "").split("/");
  const [view, param] = parts;

  // Update active nav link
  document.querySelectorAll(".topnav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === view ||
      (view === "lesson" && a.dataset.route === "lessons") ||
      (view === "exercise" && a.dataset.route === "lessons"));
  });

  switch (view) {
    case "home":
    case "":
      renderHome(appRoot);
      break;
    case "lessons":
      renderLessonsList(appRoot);
      break;
    case "lesson":
      renderLesson(appRoot, param);
      break;
    case "exercise":
      renderExercise(appRoot, param);
      break;
    case "progress":
      renderProgress(appRoot);
      break;
    default:
      renderHome(appRoot);
  }

  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: "instant" });
}
