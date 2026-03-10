const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const port = process.env.PORT || 4311;
const publicDir = path.join(__dirname, 'public');
const dataPath = path.join(__dirname, 'data', 'metrics.json');
const projectsPath = path.join(__dirname, 'data', 'projects.json');
const seriesPath = path.join(__dirname, 'data', 'series.json');
const jobsPath = path.join(__dirname, 'data', 'jobs.json');
const adaptersPath = path.join(__dirname, 'data', 'adapters.json');
const costSeriesPath = path.join(__dirname, 'data', 'cost-series.json');
const cronRealPath = path.join(__dirname, 'data', 'cron-real.json');
const sessionsRealPath = path.join(__dirname, 'data', 'sessions-real.json');
const syncStatusPath = path.join(__dirname, 'data', 'sync-status.json');
const errorsRealPath = path.join(__dirname, 'data', 'errors-real.json');
const syncLogPath = path.join(__dirname, 'data', 'sync-log.json');
const configPath = path.join(__dirname, 'data', 'config.json');
const runtimePath = path.join(__dirname, 'data', 'runtime.json');
const exportLogPath = path.join(__dirname, 'data', 'export-log.json');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    send(res, 200, data, types[path.extname(filePath)] || 'application/octet-stream');
  });
}

function updateRuntime(patch) {
  let runtime = { autoSyncEnabled: true, lastAutoSyncAt: null, nextAutoSyncAt: null, lastExportAt: null };
  try { runtime = JSON.parse(fs.readFileSync(runtimePath, 'utf8')); } catch {}
  runtime = { ...runtime, ...patch };
  fs.writeFileSync(runtimePath, JSON.stringify(runtime, null, 2));
  return runtime;
}

function triggerSync(reason = 'manual', cb) {
  execFile('node', [path.join(__dirname, 'scripts', 'sync-real-data.js')], (err, stdout, stderr) => {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const nextAutoSyncAt = new Date(Date.now() + (config.syncIntervalMs || 3600000)).toISOString();
    updateRuntime({ lastAutoSyncAt: new Date().toISOString(), nextAutoSyncAt, autoSyncEnabled: true });
    cb(err, stdout, stderr);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/metrics') {
    return serveFile(res, dataPath);
  }

  if (url.pathname === '/api/projects') {
    return serveFile(res, projectsPath);
  }

  if (url.pathname === '/api/series') {
    return serveFile(res, seriesPath);
  }

  if (url.pathname === '/api/jobs') {
    return serveFile(res, jobsPath);
  }

  if (url.pathname === '/api/adapters') {
    return serveFile(res, adaptersPath);
  }

  if (url.pathname === '/api/cost-series') {
    return serveFile(res, costSeriesPath);
  }

  if (url.pathname === '/api/cron-real') {
    return serveFile(res, cronRealPath);
  }

  if (url.pathname === '/api/sessions-real') {
    return serveFile(res, sessionsRealPath);
  }

  if (url.pathname === '/api/sync-status') {
    return serveFile(res, syncStatusPath);
  }

  if (url.pathname === '/api/errors-real') {
    return serveFile(res, errorsRealPath);
  }

  if (url.pathname === '/api/sync-log') {
    return serveFile(res, syncLogPath);
  }

  if (url.pathname === '/api/config') {
    return serveFile(res, configPath);
  }

  if (url.pathname === '/api/runtime') {
    return serveFile(res, runtimePath);
  }

  if (url.pathname === '/api/export-log') {
    return serveFile(res, exportLogPath);
  }

  if (url.pathname === '/api/export' && req.method === 'POST') {
    execFile('node', [path.join(__dirname, 'scripts', 'export-data.js')], (err, stdout, stderr) => {
      if (err) return send(res, 500, JSON.stringify({ ok: false, error: stderr || err.message }), 'application/json; charset=utf-8');
      return send(res, 200, JSON.stringify({ ok: true, output: stdout.trim() }), 'application/json; charset=utf-8');
    });
    return;
  }

  if (url.pathname === '/api/sync-now' && req.method === 'POST') {
    triggerSync('manual', (err, stdout, stderr) => {
      if (err) return send(res, 500, JSON.stringify({ ok: false, error: stderr || err.message }), 'application/json; charset=utf-8');
      return send(res, 200, JSON.stringify({ ok: true, output: stdout.trim() }), 'application/json; charset=utf-8');
    });
    return;
  }

  if (url.pathname === '/api/live/openclaw' && req.method === 'GET') {
    Promise.all([
      fetch('http://127.0.0.1:3000/health').then(r => r.text()).catch(() => 'unavailable')
    ]).then(([health]) => {
      send(res, 200, JSON.stringify({ ok: true, source: 'probe', health }), 'application/json; charset=utf-8');
    });
    return;
  }

  let filePath = path.join(publicDir, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!filePath.startsWith(publicDir)) return send(res, 403, 'Forbidden');
  serveFile(res, filePath);
}).listen(port, () => {
  let config = { syncIntervalMs: 3600000 };
  try { config = JSON.parse(fs.readFileSync(configPath, 'utf8')); } catch {}
  const nextAutoSyncAt = new Date(Date.now() + (config.syncIntervalMs || 3600000)).toISOString();
  updateRuntime({ autoSyncEnabled: true, nextAutoSyncAt });
  setInterval(() => {
    triggerSync('auto', () => {});
  }, config.syncIntervalMs || 3600000);
  console.log(`OpenClaw Monitor Lite running at http://localhost:${port}`);
});
