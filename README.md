<p align="center">
  <a href="https://mediumapi.vercel.app/" target="_blank">
    <img src="public/banner.svg" alt="Medium API input" width="560" />
  </a>
</p>

<p align="center">
  <img src="public/api.svg" alt="mediumapi icon" width="48" height="48" style="vertical-align: middle; margin-right: 10px;" />
  <strong style="font-size: 36px; vertical-align: middle;">mediumapi</strong>
</p>

<p align="center">
  <a href="https://github.com/bhagirath00/mediumApi"><picture><source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/github/license/bhagirath00/Mediumapi.svg?variant=outline&amp;font=geist" /><img alt="license" src="https://shieldcn.dev/github/license/bhagirath00/Mediumapi.svg?variant=outline&amp;mode=light&amp;font=geist" /></picture></a>
  <a href="https://github.com/bhagirath00/mediumApi"><picture><source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/github/stars/bhagirath00/Mediumapi.svg?variant=outline&amp;mode=dark&amp;font=geist" /><img alt="stars" src="https://shieldcn.dev/github/stars/bhagirath00/Mediumapi.svg?variant=outline&amp;mode=light&amp;font=geist" /></picture></a>
  <a href="https://github.com/bhagirath00/mediumApi"><picture><source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/github/views/bhagirath00/Mediumapi.svg?variant=outline&amp;mode=dark&amp;font=geist" /><img alt="views" src="https://shieldcn.dev/github/views/bhagirath00/Mediumapi.svg?variant=outline&amp;mode=light&amp;font=geist" /></picture></a>
</p>

<p align="center">Minimalist content aggregation and synchronization dashboard.</p>

### API Endpoints
* **Sync**: `POST /api/sync` — Synchronize latest articles from a Medium username.
* **Posts**: `GET /api/posts` — Retrieve stored aggregation data.
* **Post Detail**: `GET /api/posts/[slug]` — Retrieve post details by slug.
* **Stats**: `GET /api/stats` — Retrieve sync stats and post count.

### Setup
1. Configure environment keys in `.env`.
2. Run `npm install` to setup dependencies.
3. Execute `npx prisma db push` for database initialization.
4. Launch the platform with `npm run dev`.
