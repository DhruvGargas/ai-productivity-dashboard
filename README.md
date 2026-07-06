# AI Productivity Dashboard

A modern, full-featured productivity dashboard built with **Next.js** and **React**. Organize daily tasks, track your progress, visualize productivity metrics, and stay focused — all in a beautiful dark/light interface that persists your data locally.

##🌐 Live Demo

https://ai-productivity-dashboard-ecru.vercel.app/


---

## Features

### Task Management
- Add, edit, delete, and complete tasks with a single click
- Assign **categories** — Study, Gym, Work, Personal
- Set **due dates** with smart labels (Today, Tomorrow, Overdue)
- **Search** tasks by keyword
- **Filter** by All, Active, or Completed
- **Sort** by newest, oldest, or completed-first
- Bulk **clear completed** tasks

### Dashboard & Progress
- Real-time stats: total tasks, focus time, completed count, and completion %
- Animated progress bar for daily goals
- Collapsible sidebar with today's date and motivational quotes
- Smooth scroll navigation between sections

### Analytics
- Productivity score (0–100) with color-coded feedback
- Focus time tracker (30 min per completed task)
- Interactive **pie chart** for task completion breakdown (Recharts)
- Category distribution insights

### Calendar
- Monthly calendar view with dot indicators on due dates
- Click any day to see tasks scheduled for that date

### Settings & Data
- **Dark / Light mode** toggle (saved to `localStorage`)
- Export tasks as JSON
- Import tasks from a JSON file
- Reset dashboard to default tasks or clear all tasks

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Calendar | [react-calendar](https://github.com/wojtekmaj/react-calendar) |
| Fonts | [Geist](https://vercel.com/font) (via `next/font`) |
| Persistence | Browser `localStorage` |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/DhruvGargas/ai-productivity-dashboard.git
cd ai-productivity-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
ai-productivity-dashboard/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout & theme provider
│   │   ├── page.tsx         # Main dashboard page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Analytics.tsx    # Charts & productivity metrics
│   │   ├── CalendarView.tsx # Calendar with due-date tasks
│   │   ├── DashboardCard.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Settings.tsx     # Theme, import/export, reset
│   │   ├── Sidebar.tsx      # Navigation & progress sidebar
│   │   └── TaskList.tsx     # Task CRUD, search & filters
│   └── context/
│       └── ThemeContext.tsx # Dark/light theme state
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## How It Works

1. **Tasks** are stored in React state and synced to `localStorage` on every change.
2. **Focus time** is estimated at 30 minutes per completed task.
3. **Productivity score** is calculated from completion rate and completed task count.
4. **Theme preference** is saved in `localStorage` and applied on page load.


## Roadmap

- [ ] AI-powered task suggestions and prioritization
- [ ] Backend sync (database / cloud storage)
- [ ] User authentication
- [ ] Pomodoro timer integration
- [ ] Weekly & monthly analytics reports

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Dhruv Sharma**

- GitHub: [@DhruvGargas](https://github.com/DhruvGargas)
