# OpenClaw Monitor Lite

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Module](https://img.shields.io/badge/module-runtime%20%2F%20observability-blue)
![License](https://img.shields.io/badge/license-MIT-black)

A lightweight monitoring dashboard for OpenClaw builders and small teams.

## English

### What it does
- Shows core health metrics: success rate, failure rate, average latency, cost
- Reads real OpenClaw cron/session snapshots from local CLI sync
- Aggregates real cron errors
- Supports manual sync, auto sync, export, sync logs, and runtime status

### Best current packaging
This repo is currently strongest as an **Agent Ops Lite / lightweight operations console** for OpenClaw, focused on:
- cost visibility
- alerting
- node health
- error log visibility

### Why this project exists
Most OpenClaw users can make agents run, but they still lack a simple visibility layer:
- Which cron jobs are failing?
- How many sessions are active?
- What changed after the latest sync?
- What is the current operating health of the workspace?

This project is a minimal answer to that gap.

### Position in the product matrix
This repository is the **runtime / observability module** in the broader OpenClaw Control Console direction.

Related modules:
- `openclaw-security-audit-lite` → security / audit module
- `openclaw-template-market` → workflow / enablement module

### Features
- Dashboard overview
- Real cron snapshot
- Real session snapshot
- Error aggregation
- Sync status + sync log
- Export log
- Runtime state
- Auto sync loop on server start

### Quick start
```bash
npm run sync
npm start
```

Default URL:
```bash
http://localhost:4311
```

### Data sources
The sync script currently reads from the local OpenClaw CLI:
```bash
openclaw cron list --json
openclaw sessions --all-agents --active 1440 --json
```

### Screenshots / Demo
> Add screenshots here later:
- dashboard overview
- cost / alert / node health overview
- sync status and error aggregation view

### Positioning docs
- [Agent Ops Lite positioning](docs/AGENT_OPS_LITE_POSITIONING.md)
- [Fit guide](docs/FIT_GUIDE.md)
- [Why OpenClaw-native](docs/WHY_OPENCLAW_NATIVE.md)

### Related repositories
- [openclaw-security-audit-lite](https://github.com/jiangjinggit/openclaw-security-audit-lite)
- [openclaw-template-market](https://github.com/jiangjinggit/openclaw-template-market)

### Roadmap
- Better cron error detail pages
- Multi-environment support
- Alert rules and notifications
- Better UI polish and search/filtering

---

## 中文版

### 这个项目是干什么的
这是一个给 OpenClaw 使用者和小团队准备的**轻量监控面板**，解决的是：
- cron 任务是否正常
- session 当前状态如何
- 最近同步发生了什么
- 当前工作区整体运行是否健康

### 它在整个产品矩阵里的位置
这个仓库在更大的 **OpenClaw Control Console** 路线里，承担的是：
> **运行监控 / 可观测模块**

另外两个关联模块：
- `openclaw-security-audit-lite`：安全审计模块
- `openclaw-template-market`：模板与场景落地模块

### 当前能力
- 总览 Dashboard
- 真实 cron 快照
- 真实 session 快照
- 异常聚合
- 同步状态与同步日志
- 导出日志
- 运行时状态
- 服务端自动同步骨架

### 为什么值得做
OpenClaw 用户往往能把 agent 跑起来，但缺少一层“看得见、查得到、可追踪”的控制视图。这个项目就是在补这一层。

### 快速启动
```bash
npm run sync
npm start
```
默认地址：
```bash
http://localhost:4311
```

### 截图 / 演示区（占位）
后续建议补三张图：
- 总览页
- 真实 cron 快照页
- 同步状态与异常聚合页

### 关联仓库
- [openclaw-security-audit-lite](https://github.com/jiangjinggit/openclaw-security-audit-lite)
- [openclaw-template-market](https://github.com/jiangjinggit/openclaw-template-market)

### 后续路线
- 更好的异常详情页
- 多环境支持
- 告警规则
- 更强筛选与 UI 打磨

## License
MIT
