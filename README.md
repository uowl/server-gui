# Server GUI: Plugin-Based Web Dashboard

A modern, extensible web interface designed with a **plugin-first architecture**. This GUI acts as a container where you can easily add new "apps" or plugins.

![Preview](https://via.placeholder.com/800x400.png?text=Server+GUI+with+Glassmorphism+and+Calculator)

## ✨ Core Features

- **Plugin Architecture**: Easily register and load new React-based apps.
- **Glassmorphism UI**: Premium visual experience with translucent backgrounds, blurs, and subtle borders.
- **Vertical Sidebar Transitions**: Fluid navigation between apps using a vertical icon-based sidebar.
- **Modern Tech Stack**: Built with **React**, **Vite**, and **Lucide Icons**.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the `server-gui` directory:
   ```bash
   cd server-gui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided (default is `http://localhost:5173`).

---

## 🏗️ Architecture Overview

The project is structured to separate the "Shell" from individual "Plugins".

### 1. The Core Shell (`src/App.jsx`)
The shell provides the layout, the vertical sidebar, and the logic to switch between active plugins. It reads from the `registry.js` to determine which plugins are available.

### 2. Plugin Registry (`src/plugins/registry.js`)
This is the central configuration file. To add a new plugin, you simply import its component and icon, and add it to the `plugins` array.

```javascript
import { MyIcon } from 'lucide-react';
import MyNewApp from './my-new-app/MyNewApp';

export const plugins = [
  {
    id: 'my-new-app',
    name: 'My New App',
    icon: MyIcon,
    component: MyNewApp
  },
  // ... other plugins
];
```

### 3. Plugin Structure
Each plugin resides in its own folder under `src/plugins/`.
- `Calculator`: A functional, secure, and beautiful calculator app.

---

## 🛠️ How to Add a New Plugin

Follow these steps to add a new "app" to the system:

1. **Create a Folder**: Make a new directory in `src/plugins/`, for example: `src/plugins/my-app/`.
2. **Create your Component**: Create your React component (e.g., `MyApp.jsx`).
3. **Export your App**: Create an `index.js` (optional but recommended) to export your component.
4. **Register**: Add your plugin to `src/plugins/registry.js`.
    - Choose an icon from `lucide-react`.
    - Provide a unique `id`, a display `name`, the `icon`, and the `component`.
5. **Auto-Update**: The sidebar will automatically show your new app icon, and clicking it will render your component in the main view.

---

## 🎨 Design System

The project uses variables defined in `src/index.css` for a consistent, premium look:
- `--primary`: Main accent color (Indigo).
- `--glass`: Translucent background for cards.
- `--glass-border`: Subtle white border for depth.
- `backdrop-filter: blur(16px)`: Creates the glass effect.

## 📄 License

MIT
