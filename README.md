# OpenClaw Monitor Lite

A lightweight monitoring dashboard for OpenClaw builders and small teams.

## What it does
- Shows core health metrics: success rate, failure rate, average latency, cost
- Reads real OpenClaw cron/session snapshots from local CLI sync
- Aggregates real cron errors
- Supports manual sync, auto sync, export, sync logs, and runtime status

## Why this project exists
Most OpenClaw users can make agents run, but they still lack a simple visibility layer:
- Which cron jobs are failing?
- How many sessions are active?
- What changed after the latest sync?
- What is the current operating health of the workspace?

This project is a minimal answer to that gap.

## Features
- Dashboard overview
- Real cron snapshot
- Real session snapshot
- Error aggregation
- Sync status + sync log
- Export log
- Runtime state
- Auto sync loop on server start

## Quick start
```bash
npm run sync
npm start
```

Default URL:
```bash
http://localhost:4311
```

## Data sources
The sync script currently reads from the local OpenClaw CLI:
```bash
openclaw cron list --json
openclaw sessions --all-agents --active 1440 --json
```

Generated files:
- `data/cron-real.json`
- `data/sessions-real.json`
- `data/errors-real.json`
- `data/sync-status.json`
- `data/sync-log.json`
- `data/runtime.json`
- `data/export-log.json`

## Project structure
```text
openclaw-monitor-lite/
  data/
  exports/
  public/
  scripts/
  server.js
  package.json
```

## Roadmap
- Better cron error detail pages
- Multi-environment support
- Alert rules and notifications
- Better UI polish and search/filtering

## License
MIT
