const disciplines = [
  {
    name: "Теория государства и права",
    type: "Экзамен",
    workload: 108,
    semester: 1,
    grade: "Хорошо",
    gradeType: "good",
    ects: "D",
  },
  {
    name: "Русский язык и культура речи",
    type: "Экзамен",
    workload: 108,
    semester: 1,
    grade: "Хорошо",
    gradeType: "good",
    ects: "C",
  },
  {
    name: "Экономическая теория",
    type: "Экзамен",
    workload: 108,
    semester: 1,
    grade: "Хорошо",
    gradeType: "good",
    ects: "C",
  },
  {
    name: "Введение в профессиональную деятельность",
    type: "Экзамен",
    workload: 72,
    semester: 1,
    grade: "Отлично",
    gradeType: "excellent",
    ects: "A",
  },
  {
    name: "Экономическая теория",
    type: "Зачет",
    workload: 72,
    semester: 1,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Иностранный язык (английский)",
    type: "Зачет",
    workload: 108,
    semester: 1,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Психолого-педагогическая адаптация к образовательной среде",
    type: "Зачет",
    workload: 144,
    semester: 1,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Основы российской государственности",
    type: "Зачет",
    workload: 72,
    semester: 1,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Теория и практика управления",
    type: "Экзамен",
    workload: 0,
    semester: 1,
    grade: "Отлично",
    gradeType: "excellent",
    ects: "A",
  },
  {
    name: "Философия",
    type: "Зачет",
    workload: 72,
    semester: 2,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Деловые коммуникации",
    type: "Зачет",
    workload: 72,
    semester: 2,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Система государственного и муниципального управления",
    type: "Зачет",
    workload: 72,
    semester: 2,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Логические основы управленческого мышления",
    type: "Зачет",
    workload: 72,
    semester: 2,
    grade: "Зачтено",
    gradeType: "passed",
    ects: "Passed",
  },
  {
    name: "Высшая математика",
    type: "Экзамен",
    workload: 108,
    semester: 2,
    grade: "Отлично",
    gradeType: "excellent",
    ects: "A",
  },
];

const cardsNode = document.querySelector("#disciplineCards");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const drawer = document.querySelector(".drawer");
const openMenu = document.querySelector(".menu-open");
const closeMenu = document.querySelector(".close-drawer");
const navProgress = document.querySelector('a[href="#progress"]');
const semesterButtons = document.querySelectorAll(".semester-switch button");
let currentSemester = "all";

function renderCards() {
  const visible = disciplines.filter((item) => {
    return currentSemester === "all" || String(item.semester) === currentSemester;
  });

  cardsNode.innerHTML = visible
    .map((item) => {
      const semesterLabel = `${item.semester}-й семестр`;
      return `
        <article class="grade-card">
          <div class="field-label">Наименование дисциплины</div>
          <h3 class="discipline-title">${item.name}</h3>

          <div class="meta-grid">
            <div>
              <div class="field-label">Форма аттестации</div>
              <div class="value">${item.type}</div>
            </div>
            <div>
              <div class="field-label">Трудоемкость</div>
              <div class="value">${item.workload}</div>
            </div>
          </div>

          <div class="grades-grid">
            <div>
              <div class="field-label">Оценка</div>
              <span class="badge ${item.gradeType}">${item.grade}</span>
            </div>
            <div>
              <div class="field-label">Оценка БРС</div>
              <div class="score">-</div>
            </div>
            <div>
              <div class="field-label">Оценка ECTS</div>
              <div class="ects">${item.ects}</div>
            </div>
          </div>

          <div class="semester-block">
            Семестр
            <span class="value">${semesterLabel}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function activateTab(name) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === name;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === name);
  });

}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

semesterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentSemester = button.dataset.semester;
    semesterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderCards();
  });
});

openMenu.addEventListener("click", () => {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
});

closeMenu.addEventListener("click", () => {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
});

navProgress.addEventListener("click", (event) => {
  event.preventDefault();
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  activateTab("disciplines");
});

renderCards();

if (window.location.hash === "#progress") {
  activateTab("disciplines");
}
