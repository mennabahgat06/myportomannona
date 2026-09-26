# Menna Bahgat - Personal Portfolio Website

A modern, responsive personal portfolio website built with pure **HTML, CSS, and Vanilla JavaScript** (no heavy frameworks or external build tools required).

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Semantic HTML5 markup containing all 9 sections in exact order
├── style.css        # Clean, modular CSS with CSS variables, light/dark theme, and animations
├── script.js        # Vanilla JS for theme toggle, typewriter effect, scroll-spy, animated skills, & carousel
└── README.md        # Documentation and customization guide
```

---

## ✨ Features

1. **Dark & Light Mode Switcher**: Seamless theme toggle with local storage persistence and system preference detection.
2. **Typewriter Hero Text**: Smooth TypeScript-style animated typing effect cycling through *Mobile App Developer*.
3. **9 Structured Sections**:
   - **Home**: Headline, typewriter effect, bio tagline, CTA buttons, and photo placeholder.
   - **About**: Profile card placeholder, 7-line professional bio, and skill highlights.
   - **My Education**: Bachelor's Degree in Computer Science & IT, 6th of October University.
   - **My Experience**: Personal & Hands-On Projects, Self-Employed developer timeline.
   - **My Skills**: 5 categorized columns with scroll-animated progress bars showing exact percentages.
   - **Projects**: Modern 6-card grid with tags, mockups, and GitHub/demo buttons.
   - **Testimonials**: Interactive sliding carousel with touch swipe support, indicators, and auto-play.
   - **Services**: Service cards featuring Flutter development, UI/UX, API integration, and app deployment.
   - **Get In Touch**: Validated interactive contact form, direct email, phone, and WhatsApp links.
4. **Fluid Responsiveness**: Tailored layouts across mobile phones, tablets, laptops, and ultra-wide screens.
5. **Zero Framework Dependencies**: Superfast load times and lightweight execution.

---

## 🚀 How to Run & Preview

You can open the website in two simple ways:

### Option 1: Direct File Open
Double click `index.html` in your file explorer, or right-click and choose **Open With > Google Chrome / Brave / Edge / Firefox**.

### Option 2: Local HTTP Server (Recommended)
Run a local Python server in the portfolio directory:

```bash
cd portfolio
python3 -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 🎨 How to Customize

### 1. Replacing Image Placeholders
- **Hero Photo**:
  In `index.html`, find the `<div class="image-frame placeholder-frame" id="hero-img-container">` inside `#home`. You can replace the inner placeholder HTML with:
  ```html
  <img src="images/menna-photo.jpg" alt="Menna Bahgat" style="width:100%; height:100%; object-fit:cover;" />
  ```
- **About Section Photo**:
  In `index.html`, find `<div class="image-frame placeholder-frame" id="about-img-container">` inside `#about` and replace with your desired photo.
- **Project Cards**:
  Replace the `.project-placeholder-preview` div in `#projects` with your app screenshots or mockups.

### 2. Adding Your CV / Resume File
1. Put your PDF file inside the `portfolio/` folder (e.g. `Menna_Bahgat_CV.pdf`).
2. In `index.html`, update the "Download CV" button:
  ```html
  <a href="Menna_Bahgat_CV.pdf" download class="btn btn-outline" id="cv-download-btn">
    <span>Download CV</span>
    <i class="fa-solid fa-file-arrow-down"></i>
  </a>
  ```

### 3. Contact Form Backend (Optional)
To receive messages directly to your email without a backend server, you can integrate [Formspree](https://formspree.io):
1. Create a free account on Formspree.
2. Change the `<form id="contact-form" ...>` opening tag:
  ```html
  <form id="contact-form" action="https://formspree.io/f/{your_form_id}" method="POST" class="contact-form">
  ```
