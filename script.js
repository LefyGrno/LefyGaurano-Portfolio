/* ==============================================================
   GMAIL BUTTON — copies the address to the clipboard, and the
   <a href> itself opens Gmail's web compose window in a new tab.
   ============================================================== */
function copyEmailToClipboard(event, email, targetId) {
    navigator.clipboard.writeText(email).then(() => {
        const btnId = targetId || 'gmail-btn';
        const btn = document.getElementById(btnId);
        if (!btn) return;

        const textSpan = btn.querySelector('span');
        if (textSpan) {
            const originalText = textSpan.textContent;
            textSpan.textContent = 'Copied Address!';
            setTimeout(() => { textSpan.textContent = originalText; }, 2000);
        } else {
            const originalTitle = btn.getAttribute('title') || '';
            btn.setAttribute('title', 'Copied!');
            setTimeout(() => { btn.setAttribute('title', originalTitle); }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================================================
       1. TYPEWRITER
       ============================================================== */
    const typewriterElement = document.getElementById("typewriter");
    const roles = ["Frontend Developer", "UI/UX Specialist", "Creative Engineer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }
        setTimeout(type, speed);
    }
    type();

    /* ==============================================================
       2. SCROLL PROGRESS + ACTIVE NAV
       ============================================================== */
    const progressBar = document.getElementById("progressBar");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) current = section.getAttribute("id");
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
        });
    });

    /* ==============================================================
       3. THEME TOGGLE
       ============================================================== */
    const themeToggleBtn = document.getElementById("themeToggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }

    /* ==============================================================
       4. MOBILE HAMBURGER
       ============================================================== */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        hamburger.querySelector("i").className = isOpen ? "fas fa-times" : "fas fa-bars";
    });
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            hamburger.querySelector("i").className = "fas fa-bars";
        });
    });

    /* ==============================================================
       5. CERTIFICATE BOOK — REAL PAGE TURN
       ============================================================== */
    const certificates = [
        { badge: "DICT · ILCDB",     title: "Fundamentals of Robotics",                                       issuer: "DICT Region III · ICT Literacy and Competency Development Bureau", year: "Aug. 2024", image: "cert1.jpg" },
        { badge: "STI · Mindscapes", title: "The Power of Positivity: Build Self-love and Smash Self-doubt",  issuer: "STI College Lipa · Student Development & Welfare",                  year: "Oct. 2024", image: "cert2.jpg" },
        { badge: "DICT · ILCDB",     title: "Cyber Hygiene and Digital Citizenship",                          issuer: "DICT Region III · ICT Literacy and Competency Development Bureau", year: "Jan. 2025", image: "cert3.jpg" },
        { badge: "SkillSphere",      title: "Start Your Virtual Assistant Success Story",                     issuer: "SkillSphere Educational Consultancy",                                year: "Feb. 2025", image: "cert4.jpg" }
    ];

    let certIndex = 0;
    let isFlipping = false;
    const FLIP_MS = 600;

    const certDescriptionLeft = document.getElementById("certDescriptionLeft");
    const rightBasePage       = document.getElementById("rightBasePage");
    const turningLeaf         = document.getElementById("turningLeaf");
    const leafFront           = document.getElementById("leafFront");
    const leafBack            = document.getElementById("leafBack");
    const flipPrevBtn         = document.getElementById("flipPrevBtn");
    const flipNextBtn         = document.getElementById("flipNextBtn");
    const spreadIndicator     = document.getElementById("spreadIndicator");

    function descriptionHTML(cert) {
        return `
            <div class="cert-header-block">
                <div class="cert-label">LG.Certifications</div>
                <p class="cert-subtitle">Verified Digital Credentials &amp; Diplomas</p>
            </div>
            <div class="cert-divider"></div>
            <div class="cert-description">
                <span class="cert-badge">${cert.badge}</span>
                <h3 class="cert-title">${cert.title}</h3>
                <p class="cert-issuer">${cert.issuer}</p>
                <span class="cert-year">${cert.year}</span>
            </div>
        `;
    }

    function renderLeft(cert) {
        certDescriptionLeft.innerHTML = `
            <span class="cert-badge">${cert.badge}</span>
            <h3 class="cert-title">${cert.title}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            <span class="cert-year">${cert.year}</span>
        `;
    }

    function renderImageInto(container, cert) {
        container.innerHTML = `<img src="${cert.image}" alt="${cert.title}" class="cert-image">`;
    }

    function updateBookControls() {
        spreadIndicator.innerHTML =
            `<i class="fas fa-book-open"></i> Certificate ${certIndex + 1} of ${certificates.length}`;
        flipPrevBtn.disabled = certIndex === 0;
        flipNextBtn.disabled = certIndex === certificates.length - 1;
    }

    function snapLeaf(angle) {
        turningLeaf.style.transition = "none";
        turningLeaf.classList.remove("turning-next", "turning-prev");
        if (angle === -180) turningLeaf.classList.add("turning-prev");
        void turningLeaf.offsetWidth;
        turningLeaf.style.transition = "";
    }

    function turnNextPage() {
        if (isFlipping) return;
        if (certIndex >= certificates.length - 1) return;
        isFlipping = true;

        const currentCert = certificates[certIndex];
        const nextCert    = certificates[certIndex + 1];

        renderImageInto(leafFront, currentCert);
        leafBack.innerHTML = descriptionHTML(nextCert);

        turningLeaf.style.visibility = "visible";
        snapLeaf(0);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                turningLeaf.classList.add("turning-next");
            });
        });

        setTimeout(() => { renderLeft(nextCert); }, FLIP_MS * 0.4);

        certIndex++;
        updateBookControls();

        setTimeout(() => {
            renderImageInto(rightBasePage, certificates[certIndex]);
            requestAnimationFrame(() => {
                turningLeaf.style.visibility = "hidden";
                snapLeaf(0);
                leafFront.innerHTML = "";
                leafBack.innerHTML  = "";
                isFlipping = false;
            });
        }, FLIP_MS + 10);
    }

    function turnPrevPage() {
        if (isFlipping) return;
        if (certIndex <= 0) return;
        isFlipping = true;

        const currentCert = certificates[certIndex];
        const prevCert    = certificates[certIndex - 1];

        renderImageInto(leafFront, prevCert);
        leafBack.innerHTML = descriptionHTML(currentCert);

        turningLeaf.style.visibility = "visible";
        snapLeaf(-180);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                turningLeaf.classList.remove("turning-prev");
            });
        });

        setTimeout(() => { renderLeft(prevCert); }, FLIP_MS * 0.4);

        certIndex--;
        updateBookControls();

        setTimeout(() => {
            renderImageInto(rightBasePage, certificates[certIndex]);
            requestAnimationFrame(() => {
                turningLeaf.style.visibility = "hidden";
                snapLeaf(0);
                leafFront.innerHTML = "";
                leafBack.innerHTML  = "";
                isFlipping = false;
            });
        }, FLIP_MS + 10);
    }

    flipNextBtn.addEventListener("click", turnNextPage);
    flipPrevBtn.addEventListener("click", turnPrevPage);

    renderLeft(certificates[0]);
    renderImageInto(rightBasePage, certificates[0]);
    updateBookControls();
    turningLeaf.style.visibility = "hidden";
    leafFront.innerHTML = "";
    leafBack.innerHTML  = "";

    /* ==============================================================
       6. SKILLS COUNTER
       ============================================================== */
    const skillCards = document.querySelectorAll(".skill-card");
    let skillsAnimated = false;

    function animateSkills() {
        skillCards.forEach(card => {
            const target = parseInt(card.getAttribute("data-percent"), 10);
            const fill = card.querySelector(".progress-fill");
            const valueDisplay = card.querySelector(".skill-value");
            fill.style.width = target + "%";
            let currentVal = 0;
            const duration = 1200;
            const stepTime = Math.max(20, Math.abs(Math.floor(duration / target)));
            const timer = setInterval(() => {
                currentVal += 1;
                valueDisplay.textContent = currentVal + "%";
                if (currentVal >= target) {
                    clearInterval(timer);
                    valueDisplay.textContent = target + "%";
                }
            }, stepTime);
        });
    }

    /* ==============================================================
       7. CHATBOT — "Ask About Me"
       ============================================================== */
    const predefinedQA = [
        {
            patterns: ["name", "who are you", "who is", "your name", "who"],
            answer: "I'm Lefy Gaurano — an aspiring Frontend Developer and Game Developer. Nice to meet you! 👋"
        },
        {
            patterns: ["skill", "skills", "technolog", "stack", "know"],
            answer: "I work with HTML5, CSS3, JavaScript (ES6+), PHP, SQL, Python, Java, and C#. I'm also learning game development with Unity."
        },
        {
            patterns: ["contact", "email", "reach", "message", "hire"],
            answer: "You can reach me at lefy.grno@gmail.com, or use the contact form below. I'm also on GitHub and LinkedIn — links are in the footer."
        },
        {
            patterns: ["project", "work", "portfolio", "built", "made"],
            answer: "Some of my featured work includes ReClaim (a community lost-and-found platform built with PHP & MySQL) and a School Payroll Management System currently in development. Check the Featured Projects section for details!"
        },
        {
            patterns: ["education", "school", "study", "college", "university"],
            answer: "I'm a 2nd-year BS Computer Science student at Lipa City Colleges, under the College of Computing and Technology Engineering (CCTE) department."
        },
        {
            patterns: ["certificate", "certification", "credential"],
            answer: "I've earned several certifications — including the DICT ILCDB Fundamentals of Robotics, Cyber Hygiene and Digital Citizenship, and the STI Mindscapes Power of Positivity workshop. Check out my 3D flip book above!"
        },
        {
            patterns: ["game", "gamedev", "unity"],
            answer: "Game development is my passion project. I'm learning Unity and C# to build small games and explore logic-driven systems."
        },
        {
            patterns: ["hobby", "hobbies", "free time", "fun"],
            answer: "Outside of coding, I enjoy hiking scenic trails, landscape photography, and exploring local coffee shops. ☕"
        },
        {
            patterns: ["goal", "future", "aspiration", "dream"],
            answer: "My goal is to become a professional game developer while continuing to build accessible, well-crafted web experiences on the side."
        },
        {
            patterns: ["hello", "hi", "hey", "greetings"],
            answer: "Hey there! 👋 Ask me about my skills, projects, education, certifications, or how to contact me."
        },
        {
            patterns: ["thank", "thanks"],
            answer: "You're welcome! Feel free to ask anything else, or reach out via the contact form."
        },
        {
            patterns: ["help", "what can you", "options", "questions"],
            answer: "You can ask me about: my name, skills, projects, education, certifications, hobbies, goals, or how to contact me."
        }
    ];

    const fallbackAnswer = "Hmm, I'm not sure about that one. Try asking about my name, skills, projects, education, certifications, hobbies, goals, or how to contact me!";

    const chatWindow      = document.getElementById("chatWindow");
    const chatForm        = document.getElementById("chatForm");
    const chatInput       = document.getElementById("chatInput");
    const chatSuggestions = document.getElementById("chatSuggestions");

    const suggestions = [
        "What is your name?",
        "What are your skills?",
        "Tell me about your projects",
        "How can I contact you?"
    ];

    function buildChips() {
        suggestions.forEach(text => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chat-chip";
            chip.textContent = text;
            chip.addEventListener("click", () => {
                handleUserMessage(text);
            });
            chatSuggestions.appendChild(chip);
        });
    }

    function appendMessage(text, sender) {
        const msg = document.createElement("div");
        msg.className = `chat-message ${sender}`;
        const bubble = document.createElement("div");
        bubble.className = "chat-bubble";
        bubble.textContent = text;
        msg.appendChild(bubble);
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function findAnswer(userText) {
        const normalized = userText.toLowerCase().trim();
        for (const qa of predefinedQA) {
            for (const pattern of qa.patterns) {
                if (normalized.includes(pattern)) return qa.answer;
            }
        }
        return fallbackAnswer;
    }

    function handleUserMessage(text) {
        const message = text.trim();
        if (!message) return;

        appendMessage(message, "user");
        chatInput.value = "";

        setTimeout(() => {
            appendMessage(findAnswer(message), "bot");
        }, 320);
    }

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleUserMessage(chatInput.value);
    });

    appendMessage("Hi! I'm Lefy's portfolio assistant. Ask me anything about her — try one of the quick questions below. 👇", "bot");
    buildChips();

    /* ==============================================================
       8. REVEAL ON SCROLL
       ============================================================== */
    const revealElements = document.querySelectorAll(".reveal-element");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                if (entry.target.querySelector(".skill-card") && !skillsAnimated) {
                    animateSkills();
                    skillsAnimated = true;
                }
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(el => revealObserver.observe(el));

    /* ==============================================================
       9. BACK TO TOP
       ============================================================== */
    const backToTopBtn = document.getElementById("backToTopBtn");
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ==============================================================
       10. CONTACT FORM — handled natively by Formspree.
       ============================================================== */

});