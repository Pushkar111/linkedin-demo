# Client README

## Frontend - LinkedIn Clone

React application with Chakra UI and TailwindCSS.

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables

4. Start development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

### Features
- User authentication
- Create/edit/delete posts
- Like and comment on posts
- User profiles
- Image upload
- Dark mode
- Responsive design

### Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `VITE_API_URL` - Your backend API URL
4. Deploy

### Tech Stack
- React 18
- Chakra UI
- TailwindCSS
- Axios
- React Router DOM
- Vite
