// ===== SITE DATA =====
const siteData = {
  name: "Leandro Falero",
  tagline: "Applied AI, analytics, and tools that people actually use.",
  typedLines: [
    "Hi!",
    "Thanks for stopping by.",
    "This is the longer version of my resume",
    "For the short version, check out my LinkedIn profile.",
    "Link below"
  ],
  projects: [
    {
      cols: 3,
      title: "Vehicle detection & counting with a CNN",
      description: [
        "This was a quick weekend project to play around with computer vision models. I set up my phone on a pedestrian bridge overlooking the M1 motorway to film northbound traffic heading from the Gold Coast toward Brisbane, then built a pipeline to automatically detect and count vehicles.",
        "Using Python and a convolutional neural network (CNN), the system draws bounding boxes around each detected vehicle, tracks the centre point of each box, and logs a crossing event each time a vehicle's centre passes an arbitrary line (with logic to avoid double counting).",
        "The entire project ran on standard hardware: my phone to film, a normal laptop to process. Total build time was a few hours of my Saturday.",
        "What I find interesting about this approach is that a task-specific CNN like this runs comfortably on consumer hardware, locally, with no API calls and no cloud costs. It's a good example of where reaching for an LLM would actually be the wrong tool. LLMs carry significant energy and infrastructure costs, and for a well-defined visual task like vehicle detection, a purpose-built model is faster, cheaper, and more deterministic.",
        "Given the same input, it will produce the same output, which makes it far easier to test, debug, and trust in production."
      ],
      tech: ["Python", "Computer Vision", "CNN", "OpenCV"],
      links: [
        { label: "watch on youtube", url: "https://www.youtube.com/shorts/i9XmZICK0Vs" }
      ],
      youtube: "i9XmZICK0Vs"
    },
    {
      cols: 3,
      title: "Data explorer app",
      description: "Free app I made for data scientists and data analysts to perform Exploratory Data Analysis (EDA). You can upload a CSV or Excel file, and it will generate an HTML report that includes the distribution of each variable, missing values, correlations between features, potential anomalies, and statistical summaries. (Note: If you visit the app and it's sleeping, click to wake it up)",
      tech: ["Python", "Streamlit", "Pandas", "Plotly"],
      links: [
        { label: "live app", url: "https://data-explorer-app.streamlit.app/" },
        { label: "source", url: "https://github.com/anthropoleo" }
      ]
    },
  ]
};

// ===== TYPEWRITER =====
(function () {
  const el = document.getElementById("typed-output");
  const lines = siteData.typedLines;
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typeSpeed = 35;
  const deleteSpeed = 15;
  const pauseAfterType = 1800;
  const pauseAfterDelete = 400;

  function tick() {
    const currentLine = lines[lineIndex];

    if (!deleting) {
      el.textContent = currentLine.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex >= currentLine.length) {
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = currentLine.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex <= 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();

// ===== RENDER PROJECTS =====
(function () {
  const grid = document.getElementById("project-grid");

  siteData.projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    if (project.cols) card.style.gridColumn = `span ${project.cols}`;

    // Build the text content block
    let content = `<h3>${project.title}</h3>`;
    if (Array.isArray(project.description)) {
      project.description.forEach((para) => { content += `<p>${para}</p>`; });
    } else {
      content += `<p>${project.description}</p>`;
    }
    if (project.tech && project.tech.length) {
      content += '<div class="tags">';
      project.tech.forEach((t) => { content += `<span class="tag">${t}</span>`; });
      content += "</div>";
    }
    if (project.links && project.links.length) {
      content += '<div class="project-links">';
      project.links.forEach((link) => {
        content += `<a href="${link.url}" target="_blank" rel="noopener">[${link.label}]</a>`;
      });
      content += "</div>";
    }

    let html;

    if (project.youtube) {
      const iframe = `<div class="project-youtube"><iframe src="https://www.youtube.com/embed/${project.youtube}" title="${project.title}" allowfullscreen></iframe></div>`;
      html = `<div class="card-media-layout">${iframe}<div class="card-content">${content}</div></div>`;
    } else {
      html = content;
    }

    card.innerHTML = html;
    grid.appendChild(card);
  });
})();

// ===== SLIDESHOW BACKGROUND =====
(function () {
  var images = {
    'assets/bg01.jpg': 'center',
    'assets/bg02.jpg': 'center',
    'assets/bg03.jpg': 'center'
  };
  var delay = 6000;
  var pos = 0, lastPos = 0;
  var wrapper = document.getElementById('bg');
  var bgs = [];

  for (var src in images) {
    var div = document.createElement('div');
    div.style.backgroundImage = 'url("' + src + '")';
    div.style.backgroundPosition = images[src];
    wrapper.appendChild(div);
    bgs.push(div);
  }

  // Show first image
  bgs[pos].classList.add('visible');
  bgs[pos].classList.add('top');

  // Fade in the wrapper once loaded
  window.addEventListener('load', function () {
    wrapper.classList.add('ready');
  });

  // Bail if only one image
  if (bgs.length <= 1) return;

  setInterval(function () {
    lastPos = pos;
    pos = (pos + 1) % bgs.length;

    bgs[lastPos].classList.remove('top');
    bgs[pos].classList.add('visible');
    bgs[pos].classList.add('top');

    setTimeout(function () {
      bgs[lastPos].classList.remove('visible');
    }, delay / 2);
  }, delay);
})();

// ===== FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== THEME TOGGLE =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    btn.textContent = theme === 'light' ? '[dark]' : '[light]';
    localStorage.setItem('theme', theme);
  }

  const saved = localStorage.getItem('theme');
  const init = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(init);

  btn.addEventListener('click', function () {
    applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  });
})();
