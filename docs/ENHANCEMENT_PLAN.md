# OpenClaw Monitor Lite 完善计划

## 第一阶段：告警和通知（1-2 周）

### 核心功能
1. **告警规则引擎**
   - 成本超限告警（日/周/月）
   - 错误率告警（失败率 > X%）
   - Cron 连续失败告警
   - Session 异常告警
   - 节点离线告警

2. **通知渠道**
   - Telegram Bot 通知
   - 飞书 Webhook 通知
   - 邮件通知（可选）
   - 页面内通知中心

3. **告警配置界面**
   - 规则管理页面
   - 阈值设置
   - 通知渠道配置
   - 告警历史记录

### 技术实现
```javascript
// data/alert-rules.json
{
  "rules": [
    {
      "id": "cost-daily-limit",
      "name": "日成本超限",
      "type": "cost",
      "condition": "daily > 100",
      "enabled": true,
      "channels": ["telegram", "feishu"]
    },
    {
      "id": "error-rate-high",
      "name": "错误率过高",
      "type": "error_rate",
      "condition": "rate > 0.2",
      "enabled": true,
      "channels": ["telegram"]
    }
  ]
}

// scripts/check-alerts.js
// 定期检查告警规则，触发通知
```

### 交付物
- `/api/alert-rules` - 规则管理 API
- `/api/alert-history` - 告警历史 API
- `/api/alert-test` - 测试通知 API
- `public/alerts.html` - 告警配置页面
- `scripts/check-alerts.js` - 告警检查脚本

---

## 第二阶段：成本分析增强（1 周）

### 核心功能
1. **成本分解**
   - 按 agent 维度统计
   - 按 session 维度统计
   - 按 cron 维度统计
   - 按时间段统计（日/周/月）

2. **成本趋势**
   - 成本趋势图
   - 同比/环比分析
   - 成本预测

3. **成本优化建议**
   - 识别高成本 agent/cron
   - 给出优化建议
   - 成本节省潜力分析

### 技术实现
```javascript
// data/cost-breakdown.json
{
  "daily": {
    "total": 150.5,
    "byAgent": {
      "agent1": 80.2,
      "agent2": 70.3
    },
    "byCron": {
      "cron1": 50.1,
      "cron2": 100.4
    }
  }
}

// scripts/analyze-cost.js
// 分析成本数据，生成报告
```

### 交付物
- `/api/cost-breakdown` - 成本分解 API
- `/api/cost-trends` - 成本趋势 API
- `public/cost.html` - 成本分析页面
- `scripts/analyze-cost.js` - 成本分析脚本

---

## 第三阶段：多环境/多节点支持（1-2 周）

### 核心功能
1. **环境管理**
   - 添加/删除环境
   - 环境切换
   - 环境配置

2. **多节点监控**
   - 节点列表
   - 节点健康状态
   - 节点性能指标
   - 跨节点对比

3. **统一视图**
   - 所有环境总览
   - 跨环境对比
   - 环境间数据同步

### 技术实现
```javascript
// data/environments.json
{
  "environments": [
    {
      "id": "prod",
      "name": "生产环境",
      "endpoint": "http://prod-server:3000",
      "enabled": true
    },
    {
      "id": "dev",
      "name": "开发环境",
      "endpoint": "http://dev-server:3000",
      "enabled": true
    }
  ]
}

// scripts/sync-multi-env.js
// 同步多个环境的数据
```

### 交付物
- `/api/environments` - 环境管理 API
- `/api/nodes` - 节点管理 API
- `public/environments.html` - 环境管理页面
- `scripts/sync-multi-env.js` - 多环境同步脚本

---

## 第四阶段：搜索和过滤增强（1 周）

### 核心功能
1. **日志搜索**
   - 全文搜索
   - 正则表达式搜索
   - 高级过滤

2. **时间范围过滤**
   - 快速时间选择（今天/昨天/本周/本月）
   - 自定义时间范围
   - 时间对比

3. **状态过滤**
   - 按状态过滤（成功/失败/运行中）
   - 按类型过滤（cron/session/agent）
   - 按标签过滤

### 技术实现
```javascript
// 前端搜索组件
class SearchFilter {
  constructor() {
    this.filters = {
      text: '',
      timeRange: 'today',
      status: 'all',
      type: 'all'
    };
  }
  
  apply(data) {
    return data.filter(item => {
      // 应用所有过滤条件
    });
  }
}
```

### 交付物
- `public/components/search-filter.js` - 搜索过滤组件
- 更新所有页面，集成搜索过滤功能

---

## 第五阶段：持续巡检和历史对比（1-2 周）

### 核心功能
1. **历史快照**
   - 保存每次同步的完整快照
   - 快照管理（保留策略）
   - 快照对比

2. **趋势分析**
   - 成功率趋势
   - 成本趋势
   - 错误趋势
   - 性能趋势

3. **异常检测**
   - 基于历史数据的异常检测
   - 异常告警
   - 异常分析报告

### 技术实现
```javascript
// data/snapshots/
// 2026-03-13-12-00.json
// 2026-03-13-13-00.json
// ...

// scripts/analyze-trends.js
// 分析历史快照，生成趋势报告
```

### 交付物
- `/api/snapshots` - 快照管理 API
- `/api/trends` - 趋势分析 API
- `public/trends.html` - 趋势分析页面
- `scripts/analyze-trends.js` - 趋势分析脚本

---

## 第六阶段：与 security-audit-lite 联动（1 周）

### 核心功能
1. **安全事件监控**
   - 高风险操作记录
   - 权限变更记录
   - 异常行为检测

2. **安全评分展示**
   - 显示当前安全评分
   - 安全趋势
   - 安全建议

3. **联动告警**
   - 安全事件触发告警
   - 安全评分下降告警

### 技术实现
```javascript
// 读取 security-audit-lite 的数据
const securityData = require('../openclaw-security-audit-lite/data/latest-scan.json');

// 在 monitor 中展示安全指标
```

### 交付物
- `/api/security-events` - 安全事件 API
- `public/security.html` - 安全监控页面
- 在 Dashboard 中集成安全评分卡片

---

## 实施建议

### 立即可做（今天）
1. **创建告警规则数据结构**
   - 创建 `data/alert-rules.json`
   - 创建 `data/alert-history.json`
   - 创建 `data/notification-config.json`

2. **添加告警配置页面骨架**
   - 创建 `public/alerts.html`
   - 添加基础 UI 框架

3. **实现第一个告警规则**
   - 成本超限告警
   - Telegram 通知

### 本周可完成
- 完成第一阶段：告警和通知
- 开始第二阶段：成本分析增强

### 本月可完成
- 完成前三个阶段
- 开始第四阶段

### 长期目标
- 完成所有六个阶段
- 形成完整的 Agent Ops 平台

---

## 优先级排序理由

1. **告警和通知**：最刚需，用户最担心的是"出问题不知道"
2. **成本分析**：第二刚需，用户担心"花钱失控"
3. **多环境支持**：扩展性需求，支持更大规模使用
4. **搜索过滤**：易用性需求，提升日常使用体验
5. **历史对比**：高级需求，支持深度分析
6. **安全联动**：增值需求，与 security-audit-lite 形成产品矩阵

---

## 技术债务清理

在完善功能的同时，建议处理以下技术债务：

1. **代码重构**
   - 提取公共组件
   - 统一 API 响应格式
   - 添加错误处理

2. **测试覆盖**
   - 添加单元测试
   - 添加集成测试
   - 添加 E2E 测试

3. **文档完善**
   - API 文档
   - 部署文档
   - 用户手册

4. **性能优化**
   - 数据缓存
   - 懒加载
   - 分页加载

---

## 商业化准备

在技术完善的同时，建议准备：

1. **定价策略**
   - 个人版：免费或低价（¥39-99/月）
   - Pro 版：¥99-299/月
   - 团队版：¥599-1999/月

2. **营销材料**
   - 产品截图
   - 演示视频
   - 使用案例
   - 对比表格

3. **获客渠道**
   - 技术博客文章
   - 社区分享
   - 开源推广
   - 内容营销

4. **支持体系**
   - 文档站点
   - FAQ
   - 社区论坛
   - 技术支持

---

## 总结

建议按照以下顺序推进：

**第 1 周**：告警和通知（核心功能）
**第 2 周**：成本分析增强
**第 3-4 周**：多环境支持
**第 5 周**：搜索和过滤
**第 6-7 周**：历史对比和趋势分析
**第 8 周**：安全联动和商业化准备

这样可以在 2 个月内完成核心功能，形成可商业化的产品。
