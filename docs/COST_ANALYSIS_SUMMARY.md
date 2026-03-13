# OpenClaw Monitor Lite - 成本分析功能完善总结

## 完成时间
2026-03-13

## 完成内容

### 第二阶段：成本分析增强

#### 1. 成本分解功能
- ✅ 按 Agent 维度统计成本
- ✅ 按 Cron 维度统计成本
- ✅ 按 Session 维度统计成本
- ✅ 按模型维度统计成本
- ✅ 支持日/周/月三个时间维度

#### 2. 成本趋势分析
- ✅ 日趋势（最近 30 天）
- ✅ 周趋势（最近 12 周）
- ✅ 月趋势（最近 12 个月）
- ✅ 趋势可视化图表
- ✅ 历史数据对比

#### 3. 成本优化建议
- ✅ 高成本 Agent 识别
- ✅ 高成本 Cron 识别
- ✅ 成本异常增长检测
- ✅ 昂贵模型使用分析
- ✅ 成本健康状态评估
- ✅ 自动生成优化建议

### 技术实现

#### 成本分析脚本
- ✅ `scripts/analyze-cost.js` - 核心成本分析逻辑
  - 读取 Cron 和 Session 数据
  - 估算成本（可扩展为真实 token 计费）
  - 按多维度聚合统计
  - 生成优化建议
  - 更新趋势数据

#### 数据结构
```json
// cost-breakdown.json
{
  "timestamp": "2026-03-13T05:40:00.000Z",
  "daily": {
    "total": 150.5,
    "byAgent": { "agent1": 80.2, "agent2": 70.3 },
    "byCron": { "cron1": 50.1, "cron2": 100.4 },
    "bySession": { "session1": 30.0 },
    "byModel": { "gpt-4": 100.0, "gpt-3.5": 50.5 }
  },
  "weekly": { ... },
  "monthly": { ... },
  "recommendations": [
    {
      "type": "high_cost_agent",
      "severity": "warning",
      "title": "单个 Agent 成本占比过高",
      "description": "...",
      "suggestion": "..."
    }
  ]
}

// cost-trends.json
{
  "daily": [
    {
      "date": "2026-03-13",
      "total": 150.5,
      "byAgent": { ... },
      "byCron": { ... },
      "byModel": { ... }
    }
  ],
  "weekly": [ ... ],
  "monthly": [ ... ]
}
```

#### API 端点
- ✅ `GET /api/cost-breakdown` - 获取成本分解数据
- ✅ `GET /api/cost-trends` - 获取成本趋势数据
- ✅ `POST /api/analyze-cost` - 手动触发成本分析

#### 用户界面
- ✅ `public/cost.html` - 完整的成本分析页面
  - 成本概览卡片（日/周/月）
  - 成本分解（可切换时间维度）
  - 成本趋势图表
  - 优化建议列表
  - 实时刷新功能

#### 首页集成
- ✅ 在首页添加"成本分析"入口按钮
- ✅ 使用统一的设计风格

## 功能特性

### 1. 成本概览
- 今日成本总额
- 本周成本总额
- 本月成本总额
- 与昨日对比
- 周平均/月平均

### 2. 成本分解
支持三个时间维度：
- **今日**：当天的成本分解
- **本周**：最近 7 天的成本分解
- **本月**：当月的成本分解

支持四个分析维度：
- **按 Agent**：查看哪个 Agent 花费最多
- **按 Cron**：查看哪个定时任务花费最多
- **按模型**：查看哪个模型花费最多
- **按 Session**：查看哪个会话花费最多（仅日维度）

### 3. 成本趋势
- 折线图展示最近 14 天的成本趋势
- 支持查看历史数据
- 自动计算最大值和网格线
- 清晰的日期标签

### 4. 优化建议
自动识别以下问题并给出建议：

#### 高成本 Agent
- 检测：单个 Agent 占比 > 50%
- 建议：优化调用频率或使用更经济的模型

#### 高成本 Cron
- 检测：单个 Cron 占比 > 30%
- 建议：检查运行频率是否合理

#### 成本异常增长
- 检测：今日成本 > 周平均 × 1.5
- 建议：检查是否有异常任务或调用

#### 昂贵模型使用
- 检测：高成本模型（GPT-4/Claude Opus）占比 > 70%
- 建议：在非关键任务中使用更经济的模型

#### 成本健康
- 检测：今日成本 < ¥10
- 反馈：成本控制良好

## 使用方法

### 1. 启动服务
```bash
cd /root/.openclaw/workspace-djy-build/apps/openclaw-monitor-lite
npm start
```

### 2. 访问成本分析
```
http://localhost:4311/cost.html
```

### 3. 查看成本分解
- 点击"今日/本周/本月"标签切换时间维度
- 查看各维度的成本排名
- 查看成本占比条形图

### 4. 查看成本趋势
- 自动显示最近 14 天的趋势图
- 鼠标悬停查看具体数值

### 5. 查看优化建议
- 根据严重程度分类显示
- 绿色：成功/健康
- 黄色：警告
- 蓝色：信息

### 6. 手动刷新分析
点击"刷新分析"按钮，手动触发一次成本分析

### 7. 命令行运行
```bash
node scripts/analyze-cost.js
```

## 成本估算逻辑

当前使用简化的估算逻辑：
```javascript
基础成本 = ¥0.01 / 次调用
Token 成本 = ¥0.00001 / token
总成本 = 基础成本 + (输入 tokens + 输出 tokens) × Token 成本
```

### 扩展为真实计费
可以根据实际模型定价修改 `scripts/analyze-cost.js` 中的 `estimateCost` 函数：

```javascript
function estimateCost(item) {
  const modelPricing = {
    'gpt-4': { input: 0.03, output: 0.06 },      // $/1K tokens
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 },
    'claude-opus': { input: 0.015, output: 0.075 },
    'claude-sonnet': { input: 0.003, output: 0.015 }
  };
  
  const model = item.model || 'gpt-3.5-turbo';
  const pricing = modelPricing[model] || modelPricing['gpt-3.5-turbo'];
  
  const inputCost = (item.inputTokens || 0) / 1000 * pricing.input;
  const outputCost = (item.outputTokens || 0) / 1000 * pricing.output;
  
  return (inputCost + outputCost) * 7; // 转换为人民币（假设汇率 7）
}
```

## 数据持久化

### 成本分解数据
- 文件：`data/cost-breakdown.json`
- 更新频率：每次分析时更新
- 保留策略：只保留最新一次

### 成本趋势数据
- 文件：`data/cost-trends.json`
- 更新频率：每次分析时追加
- 保留策略：
  - 日趋势：最近 30 天
  - 周趋势：最近 12 周
  - 月趋势：最近 12 个月

## 与告警系统集成

成本分析与告警系统无缝集成：
- 成本超限告警会自动触发
- 告警规则可以引用成本分解数据
- 优化建议可以作为告警内容

## 下一步计划

根据完善计划，接下来可以实施：

### 第三阶段：多环境/多节点支持（1-2 周）
- 环境管理
- 多节点监控
- 统一视图
- 跨环境对比

### 第四阶段：搜索和过滤增强（1 周）
- 日志搜索
- 时间范围过滤
- 状态过滤

### 第五阶段：持续巡检和历史对比（1-2 周）
- 历史快照
- 趋势分析
- 异常检测

### 第六阶段：与 security-audit-lite 联动（1 周）
- 安全事件监控
- 安全评分展示
- 联动告警

## 已知限制

1. **成本估算**：当前使用简化的估算逻辑，需要根据实际模型定价调整
2. **数据来源**：依赖 Cron 和 Session 数据，需要确保数据完整性
3. **实时性**：成本数据不是实时的，需要手动刷新或等待自动同步
4. **历史数据**：首次使用时没有历史数据，需要积累一段时间

## 测试建议

### 1. 功能测试
- [ ] 测试成本分解（日/周/月）
- [ ] 测试成本趋势图表
- [ ] 测试优化建议生成
- [ ] 测试手动刷新功能
- [ ] 测试时间维度切换

### 2. 数据测试
- [ ] 测试空数据情况
- [ ] 测试大量数据情况
- [ ] 测试历史数据积累
- [ ] 测试数据保留策略

### 3. 性能测试
- [ ] 测试大量 Cron/Session 的分析性能
- [ ] 测试图表渲染性能
- [ ] 测试数据加载速度

## 文件清单

### 新增文件
```
scripts/analyze-cost.js                  # 成本分析脚本
public/cost.html                         # 成本分析页面
data/cost-breakdown.json                 # 成本分解数据（运行时生成）
data/cost-trends.json                    # 成本趋势数据（运行时生成）
docs/COST_ANALYSIS_SUMMARY.md            # 本文档
```

### 修改文件
```
server.js                                # 添加成本分析 API
public/index.html                        # 添加成本分析入口
README.md                                # 更新功能说明
```

## 提交建议

建议使用以下 commit message：
```
feat: add cost analysis and optimization

- Add cost breakdown by agent/cron/session/model
- Add daily/weekly/monthly cost tracking
- Add cost trend visualization with canvas chart
- Add cost optimization recommendations
- Add cost analysis UI with period switching
- Add comprehensive cost analysis documentation
```

## 总结

本次完善实现了 OpenClaw Monitor Lite 的成本分析功能，包括：
- ✅ 多维度成本分解
- ✅ 历史趋势追踪
- ✅ 可视化图表展示
- ✅ 智能优化建议
- ✅ 用户友好的界面

这是完善计划的第二阶段，与第一阶段的告警功能相结合，为用户提供了完整的成本监控和优化能力。

成本分析是监控系统的重要组成部分，能够帮助用户：
1. 了解成本构成
2. 识别高成本项
3. 发现成本异常
4. 优化资源使用
5. 控制预算支出

## 进度总结

已完成：
- ✅ 第一阶段：告警和通知（1-2 周）
- ✅ 第二阶段：成本分析增强（1 周）

待完成：
- ⏳ 第三阶段：多环境/多节点支持（1-2 周）
- ⏳ 第四阶段：搜索和过滤增强（1 周）
- ⏳ 第五阶段：持续巡检和历史对比（1-2 周）
- ⏳ 第六阶段：与 security-audit-lite 联动（1 周）

当前进度：2/6 阶段完成（33%）
