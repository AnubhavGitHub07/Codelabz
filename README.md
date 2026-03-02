<h1 align="center">CodeLabz</h1>

<p align="center">
  <b>A platform for interactive online tutorials — built for organizations and learners alike.</b>
</p>

<p align="center">
  <a href="https://app.slack.com/client/T06C3R6HVNG/C06C1CL3S2W"><img src="https://img.shields.io/badge/Slack-Join%20Us-blue?logo=slack" alt="Slack"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
  <a href="https://github.com/c2siorg/Codelabz"><img src="https://img.shields.io/github/stars/c2siorg/Codelabz?style=social" alt="GitHub Stars"></a>
</p>

---

## 📑 Table of Contents

- [📖 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [💬 Community & Support](#-community--support)

---

## 📖 Overview

**CodeLabz** is an open-source platform where **organizations can create and publish coding tutorials** and **users can engage with them interactively**. It provides a seamless environment for hands-on learning through step-by-step guided tutorials, a collaborative rich-text editor, and real-time organization management.

The project is developed and maintained under [c2siorg](https://github.com/c2siorg) and welcomes contributors from around the world.

---

## ✨ Key Features

- **Interactive Guided Tutorials** — Engaging step-by-step coding lessons for users.
- **Organization Management** — Tools for organizations to create, manage, and publish content.
- **Collaborative Editor** — A powerful rich-text editor for seamless tutorial creation.
- **Real-time Synchronization** — Powered by Firebase and Yjs for collaborative workflows.
- **Progress Tracking** — Users can track their engagement and learning journey.
- **Modern & Responsive UI** — A sleek, user-friendly interface built with React and Material UI.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React, Vite, Redux, Material UI (MUI), Ant Design Icons |
| **Backend** | Firebase (Firestore, Real-time DB, Cloud Functions) |
| **Collaboration** | Yjs, Quill (Rich Text Editor) |
| **Testing** | Cypress (E2E), Storybook (Component Dev) |
| **Tooling** | ESLint, Prettier, Husky |

---

## 📁 Project Structure

```text
.
├── .github/              # CI/CD workflows and issue/PR templates
├── .husky/               # Pre-commit git hooks
├── .storybook/           # Storybook configuration
├── cypress/              # End-to-end testing suite
├── designs/              # UI/UX design specifications
├── functions/            # Firebase Cloud Functions (Backend)
├── public/               # Static assets (favicons, core HTML)
├── src/                  # Main Application Source
│   ├── assets/           # Images, SVGs, and web resources
│   ├── auth/             # Auth providers and login/signup logic
│   ├── components/       # Feature-specific UI components
│   ├── config/           # App-level configurations
│   ├── css/              # Global and component styles (LESS/CSS)
│   ├── globalComponents/ # Foundational UI elements (Buttons, Inputs)
│   ├── helpers/          # Utility functions and validation logic
│   ├── store/            # Redux global state management
│   ├── stories/          # Storybook component stories
│   ├── App.jsx           # Root application component
│   ├── main.jsx          # Entry point for React rendering
│   └── routes.jsx        # Route definitions and navigation
├── testdata/             # Sample data for local emulators
├── .env.sample           # Environment variables template
├── firebase.json         # Firebase services configuration
├── Makefile              # Development command shortcuts
├── package.json          # Project metadata and dependencies
└── vite.config.js        # Vite build configuration
```

---

## 🚀 Quick Start

Get the project up and running on your local machine in just a few steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/c2siorg/Codelabz.git
   cd Codelabz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file based on `.env.sample` and add your Firebase configuration.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

> [!TIP]
> For a detailed, step-by-step guide on setting up Firebase, local emulators, and troubleshooting, please refer to our **[INSTALLATION.md](./INSTALLATION.md)**.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Please read our **[CONTRIBUTING.md](./CONTRIBUTING.md)** for details on our code of conduct and the process for submitting pull requests.
2. Adhere to our **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** to ensure a welcoming environment for all.

---

## 📜 License

Distributed under the **Apache 2.0 License**. See **[LICENSE](./LICENSE)** for more information.

---

## 💬 Community & Support

- **Slack**: [Join our Slack workspace](https://app.slack.com/client/T06C3R6HVNG/C06C1CL3S2W) to chat with maintainers and other contributors.
- **Issues**: Report bugs or request features via the [GitHub Issues](https://github.com/c2siorg/Codelabz/issues) page.

---

<p align="center">Built with ❤️ by <b>c2siorg</b></p>
