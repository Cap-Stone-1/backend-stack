# Backend Progress — 7/21

Quick rundown of what got done on the backend/DB side today, for Marlin and for the team leader sync.

## Database
- Confirmed our schema against the dbdiagram sketch: `Polls` (title, description), `Options` (text, pollId), `Votes` (just optionId — keeping it minimal for core, no voterId yet).
- Using local Postgres for dev (already had it running on my machine). Neon is already set up on a teammate's end for when we deploy — we don't need it day to day.
- `pollId` and `optionId` are set to NOT NULL with CASCADE delete. Reasoning: an option with no poll or a vote with no option shouldn't be able to exist, and CASCADE means deleting a poll cleans up its options/votes automatically instead of us writing manual cleanup code later.

## Project setup
- Added `.env` + `dotenv` so the DB connection string isn't hardcoded — switching to Neon for deployment will just be a one-line change later, no code edits.
- Added `.gitignore` (`node_modules`, `.env`) — wasn't there before, so this was actually blocking us from committing safely.
- Moved the Express app out of `models/` into a root `index.js` (matches what `package.json` already expected as the entry point).
- Added `npm run dev` (nodemon) and `npm start` scripts.

## Models
- Built out `Poll`, `Option`, `Vote` in Sequelize with associations (`hasMany`/`belongsTo`) wired up in `models/index.js`.
- Synced to local Postgres and verified the actual tables/columns/foreign keys in psql — everything matches the schema.

## Routes
- `GET /polls` — done, tested, working.
- Still need: `POST /polls`, `GET /polls/:id`, `POST /polls/:id/vote`.

## Shipped
- Committed and pushed to `origin/main` on the backend repo.

## Next up
1. `POST /polls` — unblocks Luka's create-poll page and lets us actually put data in the DB to test with.
2. `GET /polls/:id` — lets us verify votes are landing correctly once that route exists.
3. `POST /polls/:id/vote` — last of the four core routes.
4. Push again once those are in, then loop in Luka on the route shapes.
5. Neon swap happens right before deploy, not before — no reason to touch it yet.
