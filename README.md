# Convenient Store Admin - Backend

Express.js backend API for the convenient store admin application.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/items` - Get all items
- `GET /api/offers` - Get all offers

## Environment Variables

Copy `.env.example` to `.env` and update values:

```
PORT=5000
NODE_ENV=development
```
