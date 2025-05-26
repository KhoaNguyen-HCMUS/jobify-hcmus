# Jobify - Job Board Application

A full-stack job board application built with Next.js and Express.js in a monorepo architecture.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with JavaScript
- **Backend**: Express.js with Node.js
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS
- **Development**: Hot reload enabled for both frontend and backend

## 📁 Project Structure

```
src/
├── apps/
│   ├── web/           # Next.js frontend application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── next.config.js
│   └── server/        # Express.js backend application
│       ├── main.js
│       ├── package.json
│       └── .env
├── packages/          # Shared packages (if any)
├── package.json       # Root package.json with workspace configuration
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd Jobify-hcmus/src

# Install all dependencies
pnpm install
```

## 🏃 Running the Application

### Development Mode

**Run both frontend and backend simultaneously:**
```bash
pnpm run dev
```

**Run individually:**
```bash
# Backend only (Express server)
pnpm run server:dev

# Frontend only (Next.js app)
pnpm run web:dev
```

### Production Mode
```bash
# Build and start
pnpm run build
pnpm run start
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/api/health


## 📦 Workspace Scripts

The root `package.json` includes workspace scripts to manage the monorepo:

- `pnpm run dev` - Run both apps in parallel
- `pnpm run web:dev` - Run only frontend
- `pnpm run server:dev` - Run only backend

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Nguyen Le Ho Anh Khoa - HCMUS Student
- Bui Minh Duy - HCMUS Student
- Hinh Diem Xuan - HCMUS Student
- Nguyen Thi Nhu Quynh - HCMUS Student

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [pnpm Documentation](https://pnpm.io/)