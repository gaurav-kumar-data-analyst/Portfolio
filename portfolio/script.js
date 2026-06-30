// Nav and scroll interactions
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const scrollTopBtn = document.getElementById("scroll-top");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Using a slightly lower threshold and rootMargin to fix active highlight on scroll sync (Point 3/4)
const observerOptions = {
  threshold: 0.20,
  rootMargin: "-15% 0px -45% 0px"
};

const observer = new IntersectionObserver((entries) => {
  // If the project detail viewer is active, check if Projects container is still on screen (Point 3)
  const detailViewer = document.getElementById("project-detail-viewer");
  const projSection = document.getElementById("projects");
  if (detailViewer && detailViewer.classList.contains("active") && projSection) {
    const projRect = projSection.getBoundingClientRect();
    // Bypasses observer only if the viewport is actually over the projects section container
    if (projRect.top < 150 && projRect.bottom > 250) {
      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#projects") {
          link.classList.add("active");
        }
      });
      return;
    }
  }

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================
   NEW INTERACTIVE FEATURES
   ========================================== */

// 1. Skills / Technologies Code Editor Playground & Details Info (Point 2)
const codeSnippets = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World! I'm Harsh Kumar.\\n");\n    printf("State: Bihar, Country: India\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World! MCA Aspirant from Bihar." << std::endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World! Welcome to Java Playground.");\n        System.out.println("Pursuing MCA & AI Engineering.");\n    }\n}`,
  python: `def greet_user():\n    name = "Harsh Kumar"\n    goal = "AI Engineer"\n    print(f"Hello! I am {name}, aspiring {goal}.")\n\ngreet_user()`,
  android: `<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical">\n\n    <TextView\n        android:id="@+id/dev_name"\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        android:text="Harsh Kumar - Bihar" />\n</LinearLayout>`,
  html: `<div class="welcome-box">\n    <h1>Welcome to Harsh's Playground!</h1>\n    <p>This is a live combined HTML/CSS/JS preview frame.</p>\n    <button id="alert-btn">Click Me!</button>\n</div>`,
  css: `body {\n    background: #020617;\n    color: #00d9ff;\n    font-family: sans-serif;\n    text-align: center;\n    padding: 20px;\n}\n\n.welcome-box {\n    border: 2px solid #b14cff;\n    border-radius: 12px;\n    padding: 20px;\n    background: rgba(18, 13, 37, 0.4);\n}\n\nbutton {\n    background: #b14cff;\n    color: white;\n    border: none;\n    padding: 8px 16px;\n    border-radius: 6px;\n    cursor: pointer;\n}`,
  javascript: `// Write interactive JS\nconst btn = document.getElementById("alert-btn");\nif (btn) {\n    btn.addEventListener("click", () => {\n        alert("Web Playground Connected successfully!");\n    });\n}`,
  sql: `-- Fetching qualifications query\nSELECT degree, institute, passing_year, percentage\nFROM academic_journey\nWHERE student_name = 'Harsh Kumar'\nORDER BY passing_year DESC;`
};

// Web code workspace state linking HTML, CSS, and JS (Point 2)
let webCode = {
  html: codeSnippets.html,
  css: codeSnippets.css,
  javascript: codeSnippets.javascript
};

const languageDetails = {
  c: `<h3>C Language Overview</h3>
      <p><strong>What it is:</strong> A powerful, general-purpose procedural programming language that provides low-level memory access and compiles directly to machine code.</p>
      <p><strong>Created In:</strong> 1972</p>
      <p><strong>Created By:</strong> Dennis Ritchie at Bell Labs</p>
      <p><strong>Key Topics of Interest:</strong>
        <ul>
          <li>Pointer Arithmetic & Dynamic Memory Management (malloc/free)</li>
          <li>System Architecture, Compiler design, and OS Kernel Development</li>
          <li>Data Structures implementation (Stack, Queue, Trees)</li>
        </ul>
      </p>`,
  cpp: `<h3>C++ Language Overview</h3>
        <p><strong>What it is:</strong> An extension of C that incorporates Object-Oriented Programming (OOP) features, combining low-level capabilities with high-level abstractions.</p>
        <p><strong>Created In:</strong> 1985</p>
        <p><strong>Created By:</strong> Bjarne Stroustrup</p>
        <p><strong>Key Topics of Interest:</strong>
          <ul>
            <li>Classes, Inheritance, Encapsulation, and Polymorphism</li>
            <li>Standard Template Library (STL) and Generic Programming</li>
            <li>RAII (Resource Acquisition Is Initialization) for safe memory management</li>
          </ul>
        </p>`,
  java: `<h3>Java Language Overview</h3>
         <p><strong>What it is:</strong> A highly popular class-based, object-oriented language designed to have as few implementation dependencies as possible, enabling "Write Once, Run Anywhere" (WORA).</p>
         <p><strong>Created In:</strong> 1995</p>
         <p><strong>Created By:</strong> James Gosling at Sun Microsystems</p>
         <p><strong>Key Topics of Interest:</strong>
           <ul>
             <li>Java Virtual Machine (JVM) Architecture & Bytecode</li>
             <li>Automatic Garbage Collection & Memory Management</li>
             <li>Multithreading, Concurrency, and Enterprise Spring framework</li>
           </ul>
         </p>`,
  python: `<h3>Python Language Overview</h3>
           <p><strong>What it is:</strong> A high-level, interpreted language known for its clear syntax and readability, making it the leading language for AI, data science, and scripting.</p>
           <p><strong>Created In:</strong> 1991</p>
           <p><strong>Created By:</strong> Guido van Rossum</p>
           <p><strong>Key Topics of Interest:</strong>
             <ul>
               <li>Machine Learning, Deep Learning, and AI Libraries (PyTorch, TensorFlow, Scikit-Learn)</li>
               <li>Data Wrangling and Processing (Pandas, NumPy)</li>
               <li>Decorators, Generators, and Asynchronous Scripting</li>
             </ul>
           </p>`,
  android: `<h3>Android Studio Overview</h3>
            <p><strong>What it is:</strong> The official Integrated Development Environment (IDE) built specifically for Android app engineering, integrated with Gradle build automation.</p>
            <p><strong>Created In:</strong> 2013</p>
            <p><strong>Created By:</strong> Google (based on IntelliJ IDEA)</p>
            <p><strong>Key Topics of Interest:</strong>
              <ul>
                <li>Modern Layouts using Jetpack Compose & XML</li>
                <li>Android App Lifecycle & Background Services</li>
                <li>Device Emulator, Profiler tools, and APK optimization</li>
              </ul>
            </p>`,
  html: `<h3>HTML5 Overview</h3>
         <p><strong>What it is:</strong> HyperText Markup Language, the standard formatting layout language used for structuring web applications and documents in web browsers.</p>
         <p><strong>Created In:</strong> 1993</p>
         <p><strong>Created By:</strong> Tim Berners-Lee</p>
         <p><strong>Key Topics of Interest:</strong>
           <ul>
             <li>Semantic HTML Tags for clean structures</li>
             <li>Document Object Model (DOM) Hierarchy</li>
             <li>Web accessibility standards (ARIA tags) & SEO optimization</li>
           </ul>
         </p>`,
  css: `<h3>CSS3 Overview</h3>
        <p><strong>What it is:</strong> Cascading Style Sheets, a style sheets language used to describe the visual layout, formatting, and responsive presentation of HTML files.</p>
        <p><strong>Created In:</strong> 1996</p>
        <p><strong>Created By:</strong> Håkon Wium Lie & Bert Bos</p>
        <p><strong>Key Topics of Interest:</strong>
          <ul>
            <li>Modern Layout Models: Flexbox and CSS Grid</li>
            <li>Custom properties (CSS Variables) & Responsive design (Media queries)</li>
            <li>Transitions, Keyframes, and Micro-animations</li>
          </ul>
        </p>`,
  javascript: `<h3>JavaScript Overview</h3>
               <p><strong>What it is:</strong> A lightweight, interpreted compiler language supporting first-class functions, serving as the scripting standard for web page behavior.</p>
               <p><strong>Created In:</strong> 1995</p>
               <p><strong>Created By:</strong> Brendan Eich at Netscape</p>
               <p><strong>Key Topics of Interest:</strong>
                 <ul>
                   <li>Asynchronous JS: Event Loop, Promises, and Async/Await</li>
                   <li>Closures, Prototypes, and Scopes</li>
                   <li>Modern ES6+ standards & Web APIs</li>
                 </ul>
               </p>`,
  sql: `<h3>SQL Database Overview</h3>
        <p><strong>What it is:</strong> Structured Query Language, the global standard database programming query syntax for managing and querying Relational Database Management Systems (RDBMS).</p>
        <p><strong>Created In:</strong> 1974</p>
        <p><strong>Created By:</strong> Donald D. Chamberlin & Raymond F. Boyce at IBM</p>
        <p><strong>Key Topics of Interest:</strong>
          <ul>
            <li>Relational schema mapping & Indexing optimization</li>
            <li>Complex database Joins & Aggregations</li>
            <li>Database Transactions, ACID properties, and Subqueries</li>
          </ul>
        </p>`
};

const techBoxes = document.querySelectorAll(".tech-box");
const editorOverlay = document.getElementById("skills-editor-overlay");
const editorLangIcon = document.getElementById("editor-lang-icon");
const editorLangName = document.getElementById("editor-lang-name");
const codeTextarea = document.getElementById("code-textarea");
const lineNumbersContainer = document.getElementById("editor-line-numbers");
const btnCopyCode = document.getElementById("btn-copy-code");
const btnRunCode = document.getElementById("btn-run-code");
const consoleClearBtn = document.getElementById("console-clear-btn");
const consoleBody = document.getElementById("console-body");

const tabCodeBtn = document.getElementById("tab-code-btn");
const tabInfoBtn = document.getElementById("tab-info-btn");
const tabContentCode = document.getElementById("tab-content-code");
const tabContentInfo = document.getElementById("tab-content-info");
const tabContentConsole = document.getElementById("tab-content-console");

let currentLang = "c";
let currentLangName = "C";

function updateLineNumbers() {
  if (!codeTextarea || !lineNumbersContainer) return;
  const lines = codeTextarea.value.split("\n");
  let lineNumbersHtml = "";
  for (let i = 1; i <= Math.max(lines.length, 1); i++) {
    lineNumbersHtml += `<span>${i}</span>`;
  }
  lineNumbersContainer.innerHTML = lineNumbersHtml;
}

if (codeTextarea) {
  codeTextarea.addEventListener("input", () => {
    updateLineNumbers();
    // Sync live workspace values for HTML, CSS, JavaScript
    if (webCode[currentLang] !== undefined) {
      webCode[currentLang] = codeTextarea.value;
    }
  });
}

// Hover box setup (Point 1 - Side-by-side transition activation)
techBoxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    const lang = box.getAttribute("data-lang");
    const langName = box.querySelector("span").textContent;
    const imgSource = box.querySelector("img").src;

    currentLang = lang;
    currentLangName = langName;

    if (editorLangIcon) editorLangIcon.src = imgSource;
    if (editorLangName) editorLangName.textContent = `${langName} Playground`;

    // Load either webCode (synced) or default snippet
    if (codeTextarea) {
      if (webCode[lang] !== undefined) {
        codeTextarea.value = webCode[lang];
      } else {
        codeTextarea.value = codeSnippets[lang] || "// Edit your code here";
      }
      updateLineNumbers();
    }

    // Default back to Code Tab
    switchTab("code");

    if (editorOverlay) {
      editorOverlay.classList.add("active");
    }

    // Set wrapper class to align layout side-by-side (Point 1)
    const wrapper = document.querySelector(".tech-container-wrapper");
    if (wrapper) {
      wrapper.classList.add("editor-active");
    }
  });
});

const wrapperElement = document.querySelector(".tech-container-wrapper");
if (wrapperElement) {
  wrapperElement.addEventListener("mouseleave", () => {
    if (editorOverlay) {
      editorOverlay.classList.remove("active");
    }
    wrapperElement.classList.remove("editor-active");
  });
}

// Tab toggle functionality with button adjustments (Point 2)
function switchTab(tabType) {
  const btnRunText = btnRunCode ? btnRunCode.querySelector(".run-text") : null;
  const btnRunIcon = btnRunCode ? btnRunCode.querySelector(".run-icon") : null;

  if (tabType === "code") {
    tabCodeBtn.classList.add("active");
    tabInfoBtn.classList.remove("active");
    
    // Show code, hide details/console
    tabContentCode.style.display = "flex";
    tabContentInfo.style.display = "none";
    tabContentConsole.style.display = "none";
    
    // Restore buttons and reset Run button text
    if (btnCopyCode) btnCopyCode.style.display = "flex";
    if (btnRunCode) {
      btnRunCode.style.display = "flex";
      if (btnRunText) btnRunText.textContent = "Run";
      if (btnRunIcon) btnRunIcon.textContent = "▶";
    }
  } else {
    tabInfoBtn.classList.add("active");
    tabCodeBtn.classList.remove("active");
    
    // Show details info, hide code/console
    tabContentInfo.style.display = "block";
    tabContentCode.style.display = "none";
    tabContentConsole.style.display = "none";
    tabContentInfo.innerHTML = languageDetails[currentLang] || "<p>Details not available.</p>";
    
    // Hide controls when details are open (Point 2)
    if (btnCopyCode) btnCopyCode.style.display = "none";
    if (btnRunCode) btnRunCode.style.display = "none";
  }
}

if (tabCodeBtn) tabCodeBtn.addEventListener("click", () => switchTab("code"));
if (tabInfoBtn) tabInfoBtn.addEventListener("click", () => switchTab("info"));

// Copy code action
if (btnCopyCode && codeTextarea) {
  btnCopyCode.addEventListener("click", () => {
    navigator.clipboard.writeText(codeTextarea.value).then(() => {
      const copyTextSpan = btnCopyCode.querySelector(".copy-text");
      const originalText = copyTextSpan.textContent;
      copyTextSpan.textContent = "Copied!";
      btnCopyCode.style.background = "#00d9ff";
      btnCopyCode.style.borderColor = "#00d9ff";

      setTimeout(() => {
        copyTextSpan.textContent = originalText;
        btnCopyCode.style.background = "";
        btnCopyCode.style.borderColor = "";
      }, 2000);
    });
  });
}

// Interactive Code Runner Engine with swap toggling and dynamic print evaluations (Point 2)
if (btnRunCode) {
  btnRunCode.addEventListener("click", () => {
    if (!consoleBody || !codeTextarea) return;

    const btnRunText = btnRunCode.querySelector(".run-text");
    const btnRunIcon = btnRunCode.querySelector(".run-icon");
    const isCurrentlyShowingConsole = btnRunText && btnRunText.textContent === "Code";

    if (isCurrentlyShowingConsole) {
      // Toggle back to Code Editor view
      tabContentCode.style.display = "flex";
      tabContentConsole.style.display = "none";
      if (btnCopyCode) btnCopyCode.style.display = "flex";
      if (btnRunText) btnRunText.textContent = "Run";
      if (btnRunIcon) btnRunIcon.textContent = "▶";
      return;
    }

    // Toggle to Console Output view (Point 2)
    tabContentCode.style.display = "none";
    tabContentConsole.style.display = "flex";
    if (btnCopyCode) btnCopyCode.style.display = "none";
    if (btnRunText) btnRunText.textContent = "Code";
    if (btnRunIcon) btnRunIcon.textContent = "📝";

    consoleBody.innerHTML = `[Compiling and executing ${currentLangName} code...]`;

    setTimeout(() => {
      // 1. HTML, CSS, JS Connected Runner
      if (currentLang === "html" || currentLang === "css" || currentLang === "javascript") {
        consoleBody.innerHTML = `<iframe id="preview-frame" style="width: 100%; height: 100%; border: none; background: white; border-radius: 6px;"></iframe>`;
        const frame = document.getElementById("preview-frame");
        const doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { color: black; font-family: sans-serif; padding: 15px; margin: 0; background: white; }
                \n${webCode.css}
              </style>
            </head>
            <body>
              \n${webCode.html}
              <script>
                window.onerror = function(msg) {
                  document.body.innerHTML += '<p style="color:red; font-family:monospace; font-size:12px; margin-top:15px; padding-top:15px; border-top:1px solid #ccc;">Error: ' + msg + '</p>';
                };
                try {
                  \n${webCode.javascript}
                } catch(e) {
                  document.body.innerHTML += '<p style="color:red; font-family:monospace; font-size:12px; margin-top:15px; padding-top:15px; border-top:1px solid #ccc;">Error: ' + e.message + '</p>';
                }
              </script>
            </body>
          </html>
        `);
        doc.close();
        return;
      }

      // 2. SQL Query Database Engine
      if (currentLang === "sql") {
        const code = codeTextarea.value;
        if (code.toLowerCase().includes("select") && code.toLowerCase().includes("academic_journey")) {
          consoleBody.innerHTML = `
            <table style="width:100%; border-collapse:collapse; color:#fff; font-size:0.8rem; text-align:left; font-family:sans-serif;">
              <thead>
                <tr style="border-bottom:1px solid #4af626; color:#4af626;">
                  <th style="padding:6px 4px;">Degree/Class</th>
                  <th style="padding:6px 4px;">Institute</th>
                  <th style="padding:6px 4px;">Board/Uni</th>
                  <th style="padding:6px 4px;">Percentage</th>
                  <th style="padding:6px 4px;">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:6px 4px;">MCA</td>
                  <td style="padding:6px 4px;">NIET, Greater Noida</td>
                  <td style="padding:6px 4px;">AKTU</td>
                  <td style="padding:6px 4px; color:#4af626;">Pursuing</td>
                  <td style="padding:6px 4px;">2024-Present</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:6px 4px;">BCA</td>
                  <td style="padding:6px 4px;">Maulana Mazharul Haque</td>
                  <td style="padding:6px 4px;">MMHAPU</td>
                  <td style="padding:6px 4px; color:#4af626;">74.13%</td>
                  <td style="padding:6px 4px;">2021-2024</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:6px 4px;">Class 12th</td>
                  <td style="padding:6px 4px;">RAJKIYAKRIT BSS INTER SCHOOL</td>
                  <td style="padding:6px 4px;">BSEB, Patna</td>
                  <td style="padding:6px 4px; color:#4af626;">60.4%</td>
                  <td style="padding:6px 4px;">2019-2021</td>
                </tr>
                <tr>
                  <td style="padding:6px 4px;">Class 10th</td>
                  <td style="padding:6px 4px;">S.P.S. High School Binodpur</td>
                  <td style="padding:6px 4px;">BSEB, Patna</td>
                  <td style="padding:6px 4px; color:#4af626;">71.4%</td>
                  <td style="padding:6px 4px;">2018-2019</td>
                </tr>
              </tbody>
            </table>
          `;
        } else {
          consoleBody.innerHTML = `Error: RDBMS tables not found or invalid query structure.\nHint: Try querying 'SELECT * FROM academic_journey;' to fetch records.`;
        }
        return;
      }

      // 3. C, C++, Java, Python Print Statements & Variable Evaluator (Point 2)
      const code = codeTextarea.value;
      let lines = code.split("\n");
      let outputs = [];
      let vars = {};

      // Detect simple variable declarations
      lines.forEach((line) => {
        let varMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(['"])(.*?)\2/);
        if (varMatch) {
          vars[varMatch[1]] = varMatch[3];
        }
      });
      
      lines.forEach((line) => {
        // Python print statement f-string evaluator
        let pyMatch = line.match(/print\s*\(\s*f?(['"])(.*?)\1\s*\)/);
        if (pyMatch) {
          let text = pyMatch[2];
          text = text.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, (match, p1) => {
            return vars[p1] !== undefined ? vars[p1] : match;
          });
          outputs.push(text);
          return;
        }
        // Java println variable evaluator
        let jMatch = line.match(/System\.out\.println\s*\(\s*(?:(['"])(.*?)\1|([a-zA-Z_][a-zA-Z0-9_]*))\s*\)/);
        if (jMatch) {
          if (jMatch[2] !== undefined) {
            outputs.push(jMatch[2]);
          } else if (jMatch[3] !== undefined) {
            outputs.push(vars[jMatch[3]] !== undefined ? vars[jMatch[3]] : jMatch[3]);
          }
          return;
        }
        // C printf statements
        let cMatch = line.match(/printf\s*\(\s*(['"])(.*?)\1\s*\)/);
        if (cMatch) {
          let text = cMatch[2].replace(/\\n/g, "");
          outputs.push(text);
          return;
        }
        // C++ cout variable evaluator
        let cppMatch = line.match(/(?:std::)?cout\s*<<\s*(?:(['"])(.*?)\1|([a-zA-Z_][a-zA-Z0-9_]*))/);
        if (cppMatch) {
          if (cppMatch[2] !== undefined) {
            outputs.push(cppMatch[2]);
          } else if (cppMatch[3] !== undefined) {
            outputs.push(vars[cppMatch[3]] !== undefined ? vars[cppMatch[3]] : cppMatch[3]);
          }
          return;
        }
      });

      if (outputs.length === 0) {
        outputs.push(`[Success] Program compiled and executed without console print statements.`);
        outputs.push("Exit code: 0");
      } else {
        outputs.unshift(`[Running ${currentLangName} compiled output...]`);
      }
      consoleBody.innerHTML = outputs.join("\n");
    }, 400);
  });
}

if (consoleClearBtn) {
  consoleClearBtn.addEventListener("click", () => {
    if (consoleBody) consoleBody.innerHTML = 'Console cleared. Click "Code" to edit, then "Run" again.';
  });
}


// 2. Projects Showcase and Sync Feedback (Point 3)
const projectPictures = {
  "student-mgmt": [
    "image_Hotel Management_System/1.jpg",
    "image_Hotel Management_System/2.jpg",
    "image_Hotel Management_System/3.jpg",
    "image_Hotel Management_System/4.jpg",
    "image_Hotel Management_System/5.jpg",
    "image_Hotel Management_System/6.jpg"
  ],
  "portfolio-web": [
    "image_portfoliyo/1.jpg",
    "image_portfoliyo/2.jpg",
    "image_portfoliyo/3.jpg",
    "image_portfoliyo/4.jpg",
    "image_portfoliyo/5.jpg",
    "image_portfoliyo/6.jpg"
  ],
  "ai-chat": []
};

const projectGithubLinks = {
  "student-mgmt": "https://github.com/HarshMyLife/Hotel-Management-System",
  "portfolio-web": "https://github.com/HarshMyLife/Portfolio",
  "ai-chat": "https://github.com/HarshMyLife/AI-Chat-Assistant"
};

const projectCards = document.querySelectorAll(".project-card");
const detailViewer = document.getElementById("project-detail-viewer");
const viewerTitle = document.getElementById("viewer-project-title");
const viewerGallery = document.getElementById("viewer-gallery");
const projectFeedback = document.getElementById("project-feedback");
const btnSubmitFeedback = document.getElementById("btn-submit-project-feedback");
const contactMessage = document.getElementById("message");

let activeProjectKey = "";

projectCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents click-outside from closing immediately on click
    const projectKey = card.getAttribute("data-project");
    const overlay = card.querySelector(".project-overlay");
    const projectTitle = card.querySelector("h3").textContent;

    // Check if the project has pictures
    const hasPics = projectPictures[projectKey] && projectPictures[projectKey].length > 0;
    if (!hasPics) {
      const originalText = overlay.textContent;
      overlay.textContent = "Pic Not Found";
      overlay.classList.add("pic-not-found");

      setTimeout(() => {
        overlay.textContent = originalText;
        overlay.classList.remove("pic-not-found");
      }, 3000);
    }

    // Load pictures or show placeholder in viewer
    activeProjectKey = projectKey;
    if (viewerTitle) viewerTitle.textContent = `${projectTitle} Gallery`;
    
    if (viewerGallery) {
      viewerGallery.innerHTML = "";
      if (hasPics) {
        projectPictures[projectKey].forEach((url, index) => {
          const imgContainer = document.createElement("div");
          imgContainer.className = "viewer-img-container";
          
          const img = document.createElement("img");
          img.src = url;
          img.alt = `${projectTitle} screenshot ${index + 1}`;
          img.className = "viewer-img";
          
          imgContainer.appendChild(img);
          viewerGallery.appendChild(imgContainer);
        });
      } else {
        // Show elegant placeholder inside the gallery view if no pictures exist
        const noPicMsg = document.createElement("div");
        noPicMsg.className = "viewer-no-pic";
        noPicMsg.style.width = "100%";
        noPicMsg.style.textAlign = "center";
        noPicMsg.style.padding = "40px 20px";
        noPicMsg.style.color = "var(--muted-2)";
        noPicMsg.style.fontSize = "1.1rem";
        noPicMsg.style.border = "1px dashed var(--border)";
        noPicMsg.style.borderRadius = "12px";
        noPicMsg.style.background = "rgba(255, 255, 255, 0.02)";
        noPicMsg.innerHTML = `<span style="font-size: 2.2rem; display: block; margin-bottom: 10px;">📸</span> Pic Not Found (Screenshots not available yet)`;
        viewerGallery.appendChild(noPicMsg);
      }
    }

    if (projectFeedback) {
      projectFeedback.value = "";
      projectFeedback.placeholder = `Write your feedback for ${projectTitle}...`;
    }

    // Update GitHub link in the viewer dynamically (Point 4)
    const githubBtn = document.getElementById("viewer-github-btn");
    if (githubBtn) {
      if (projectGithubLinks[projectKey]) {
        githubBtn.href = projectGithubLinks[projectKey];
        githubBtn.style.display = "inline-flex";
      } else {
        githubBtn.href = "https://github.com/HarshMyLife";
      }
    }

    if (detailViewer) {
      detailViewer.classList.add("active");
      // Scroll to viewer
      detailViewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      
      // Force Projects navbar link to remain active when open (Point 3)
      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#projects") {
          link.classList.add("active");
        }
      });
    }
  });
});

// Close projects detail viewer on clicking blank spots/outside (Point 3)
document.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".project-card");
  const clickedViewer = e.target.closest("#project-detail-viewer");
  if (!clickedCard && !clickedViewer) {
    if (detailViewer && detailViewer.classList.contains("active")) {
      detailViewer.classList.remove("active");
      
      // Scroll back smoothly to projects top header to avoid shifting/jumping to contact (Point 3)
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Re-trigger scroll event to restore correct highlighted nav items
      setTimeout(() => {
        window.dispatchEvent(new Event("scroll"));
      }, 300);
    }
  }
});

// Function to handle moving from feedback to contact form (Only scrolls when button is explicitly clicked)
function handleFeedbackSubmission() {
  if (!projectFeedback || !contactMessage) return;
  const feedbackVal = projectFeedback.value.trim();
  
  if (feedbackVal) {
    const projectTitleText = viewerTitle ? viewerTitle.textContent.replace(" Gallery", "") : "Project";
    contactMessage.value = `Feedback for ${projectTitleText}:\n${feedbackVal}`;
    
    const contactSubject = document.getElementById("subject");
    if (contactSubject) {
      contactSubject.value = `Feedback on ${projectTitleText}`;
    }
  }
  
  // Close the detail viewer
  if (detailViewer) {
    detailViewer.classList.remove("active");
  }
  
  // Navigate to contact section
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
    // Focus the name field to guide the user
    const contactName = document.getElementById("name");
    if (contactName) {
      setTimeout(() => contactName.focus(), 600);
    }
  }
}

// Note: Accidental blur scrolling event handler removed (Point 3)

if (btnSubmitFeedback) {
  btnSubmitFeedback.addEventListener("click", handleFeedbackSubmission);
}

// 3. Contact form submission - Open Gmail
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if (!name || !email || !subject || !message) {
      alert("Please fill all fields before sending.");
      return;
    }
    
    const recipient = "harshxmart@gmail.com";
    const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // Build Gmail Compose Web URL
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    
    // Open in new tab
    window.open(gmailComposeUrl, "_blank");
  });
}