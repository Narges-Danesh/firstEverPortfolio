const container = document.getElementById("container");
const navbar = document.getElementById("navbar");
const navItems = document.querySelectorAll("#nav-list .nav-item");
const navList = document.getElementById("nav-list");
// sections
const skillsSection = document.getElementById("skills");
const projectsSection = document.getElementById("projects");
const contactMeSection = document.getElementById("contact-me");
const heroSection = document.getElementById("hero-section");
// other elements
const skillTabs = document.querySelectorAll("#skills-tab-buttons button");
const skillTabContent = document.querySelectorAll(".skill-tab");
const frontendProgressBars = document.querySelectorAll(
  "#front-end-skills-tab .progress"
);
const frontendProgressValues = document.querySelectorAll(
  "#front-end-skills-tab .percentage"
);
const generalProgressBars = document.querySelectorAll(
  "#general-skills-tab .progress"
);
const generalProgressValues = document.querySelectorAll(
  "#general-skills-tab .percentage"
);
const up = document.getElementById("up");

up.addEventListener("click", () => scrollTo(0, 0));
// ====================== NAV ACTIVE =========================
function removeNavActive() {
  navItems.forEach((item) => item.classList.remove("active"));
}
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    removeNavActive();
    item.classList.add("active");
  });
});
// ====================== SKILL TABS =========================
skillTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    skillTabs.forEach((tab) => tab.classList.remove("active"));
    this.classList.add("active");
    skillTabContent.forEach((content) => (content.style.display = "none"));
    const relatedContent = document.getElementById(tab.id + "-tab");
    relatedContent.style.display = "flex";
    if (tab.id == "general-skills") {
      generalSkills();
    } else {
      frontEndSkills();
    }
  });
});
// ====================== SKILL PROGRESS BARS =========================
let speed = 15;

function progressFunction(progressBar, progressValue, percentage, color) {
  let progressStartValue = 0;
  let progressEndValue = percentage;

  progressValue.style.color = color;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.innerHTML = `<span>%</span>${progressStartValue}`;
    progress;
    progressBar.style.background = `conic-gradient(${color} ${
      progressStartValue * 3.6
    }deg, #333 0deg)`;
    if (progressStartValue === progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
function frontEndSkills() {
  // HTML
  progressFunction(
    frontendProgressBars[0],
    frontendProgressValues[0],
    95,
    "orangered"
  );
  // CSS
  progressFunction(
    frontendProgressBars[1],
    frontendProgressValues[1],
    80,
    "#214ce5"
  );
  // JS
  progressFunction(
    frontendProgressBars[2],
    frontendProgressValues[2],
    70,
    "yellow"
  );
}
function generalSkills() {
  // English
  progressFunction(
    generalProgressBars[0],
    generalProgressValues[0],
    70,
    "#0096FF"
  );
  // Persian fast type
  progressFunction(
    generalProgressBars[1],
    generalProgressValues[1],
    100,
    "rgb(226, 215, 55)"
  );
  // English fast type
  progressFunction(
    generalProgressBars[2],
    generalProgressValues[2],
    70,
    "hotpink"
  );
  // Excel
  progressFunction(
    generalProgressBars[3],
    generalProgressValues[3],
    70,
    "#FF7F7F"
  );
}
let scrolled = false;
const skillsRect = skills.getBoundingClientRect();

window.addEventListener("scroll", () => {
  // start counting frontend skills percentages on scroll - once
  if (
    window.scrollY > skillsRect.top + skillsSection.offsetHeight - 200 &&
    scrolled === false
  ) {
    scrolled = true;
    frontEndSkills();
  }
  // show or hide navbar background-color
  if (window.scrollY > skillsRect.top + skillsSection.offsetHeight + 100) {
    navbar.style.background = `var(--bg-color)`;
    navbar.style.boxShadow = `0 0 8px 5px rgba(0, 0, 0, 0.6)`;
  } else {
    navbar.style.background = `transparent`;
    navbar.style.boxShadow = `none`;
  }
  // show or hide the UP button in the left bottom corner
  if (window.scrollY > 10) {
    up.style.display = "flex";
  } else {
    up.style.display = "none";
  }
});
// ====================== NAV SCROLL =========================
const heroRect = heroSection.getBoundingClientRect();
skills.style.marginTop += `${heroRect.height - navbar.offsetHeight}px`;

const navbarHeight = document.querySelector("#navbar").offsetHeight;
const navlinks = document.querySelectorAll('#nav-list a[href^="#"]');

navlinks.forEach((link) => {
  if (link == navlinks[0]) return;
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offset = targetSection.offsetTop + heroRect.height;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  });
});

addEventListener("scroll", () => {
  // ===================== PROJECTS SCROLL ANIMATION =========================
  const projectItems = document.querySelectorAll("#projects .project");
  projectItems.forEach((project) => {
    const projectTop = project.getBoundingClientRect().top;
    if (window.scrollY > projectTop) {
      const description = project.querySelector(".project-desc");
      const image = project.children[1];

      description.style.transform = "translateX(0)";
      image.style.transform = "translateX(0)";
    }
  });

  // ===================== NAV LINK SCROLL ACTIVE =========================
  navActiveScroll(skillsSection);
  navActiveScroll(projectsSection);
  navActiveScroll(contactMeSection);
  if (window.scrollY < skillsSection.offsetHeight) {
    removeNavActive();
    // add Active class to the HOME link in nav
    navItems[0].classList.add("active");
  }
});

function navActiveScroll(section) {
  const elementsTop = section.getBoundingClientRect().top;
  if (window.scrollY > elementsTop + section.offsetHeight * 0.8) {
    removeNavActive();
    navItems.forEach((item) => {
      let linkURL = item.children[0].href;
      if (linkURL.includes(`${section.id}`)) {
        item.classList.add("active");
      }
    });
  }
}

// all the 'A' tags open in a new window
const aTags = document.querySelectorAll("a");
aTags.forEach((tag) => {
  if (tag.href.includes("#")) return;
  tag.target = "_blank";
});

// ===================== CONTACT ME FORM =========================
const contactForm = document.getElementById("contact-me-form");
const username = document.getElementById("contact-me-username");
const useremail = document.getElementById("contact-me-email");
const userinput = document.getElementById("contact-me-userinput");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});
function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = useremail.value.trim();
  const inputValue = userinput.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "لطفاً نام خود را وارد کنید");
  } else {
    setSuccessFor(username);
  }
  if (emailValue === "") {
    setErrorFor(useremail, "لطفاً ایمیل خود را وارد کنید");
  } else if (!validateEmail(emailValue)) {
    setErrorFor(useremail, "ایمیل باید با فرمت صحیح وارد شود");
  } else  {
    setSuccessFor(useremail);
  }
  if(inputValue === '') {
    setErrorFor(userinput, "لطفاً پیشنهاد خود را بنویسید");
  } else {
    setSuccessFor(userinput);
  }
}
function setErrorFor(input, message) {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector("small");
  small.innerText = message;
  input.className = "error";
  return;
}
function setSuccessFor(input) {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector("small");
  small.innerText = "";
  input.className = "success";
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
