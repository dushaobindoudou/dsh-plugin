# DSH 核心能力全景 × dsh-lingxi 全感知集成设计

> 2026-09-23 · 依据运行时 Inspect Catalog（host 67 个 Service、58 个 Event；client 8 个 Service/Event、一棵 Slot 树）与 `@deepseek-ai/dsh@0.1.5-rc.2` 实装类型对证。
>
> 结论先行：dsh 把"正在发生什么"几乎全部暴露在了 **事件总线 + 服务注册表** 上。dsh-lingxi 目前只接入了其中约 9 个事件源 + 2 个注册表。差距集中在四类：**等待用户矩阵不全**（缺登录/凭据等待）、**进度感缺失**（goals/todo/token 压力/workflow 阶段）、**活动感缺失**（在改什么文件、在跑什么命令、正在说什么）、**环境感缺失**（模型、连接、能力拓扑）。本文给出逐项的感知矩阵、模块划分与 P0–P3 实施切片。

---

## 1. DSH 核心能力全景（感知视角）

从"宠物想知道什么"出发，把 67 个 Host Service 和 58 个 Host Event 分成七层。每一层末尾标注 lingxi 当前是否已接入。

### 1.1 会话与代理执行层 —— 谁在干活

| 能力 | 服务 / 事件 | 说明 |
| --- | --- | --- |
| 内存会话表 | `sessions` (`list/get/fork`) | 活会话清单 |
| 代理工厂与驱动 | `agentLoop`, `agents` (`list/roots`) | 活代理注册表 |
| 生命周期 | `agent/created`, `agent/disposed`, `agent/session-start`, `agent/status`(idle⇄running), `agent/error` | 代理生老病死 |
| 运行态广播 | `api-session/status`, `api-session/activity`, `api-session/added/removed/error` | GUI 视角的会话列表状态 |
| 模型实时输出 | `agent/assistant-stream` | 流式帧：`start / chunk{chunk} / end{outcome: committed|abandoned}`（turn/step/attemptId 定位） |
| 收件箱（插话） | `agent/inbox/inserted`, `agent/inbox/claimed`, `agent/inbox/discarded` | 用户 steering 消息进出 |
| 会话事件流水 | `session/event`（post-commit 追加流）, `session/created`, `session/disposed` | **万能兜底**：一切落盘事件都经过它 |
| 标题 | `sessionTitle` (`get/refresh`), `sessionQuery.readTitle` | 给taskId起人名 |
| 会话查询 | `sessionQuery` (`observeSession/readSession/searchEvents/filterSessions`) | 冷热统一的读取面 |
| 投影 | `sessionProjections` (`stateOf/snapshot/onChanged`)；key 例：`todo`（`{items:[{content,status}]}`）、goal、会话统计 | **log 派生态的现成读取面**，`onChanged` 即变更推送 |
| 压缩 | `compaction`, `toolResultPruner` | 上下文整理（会话流里产生 compaction 事件） |
| token 计量 | `tokenMeter.measure(session)` | 上下文水位 |
| 标题反馈 | `messageFeedback`, `sessionFeedback`, `feedback/committed` | 用户点赞/点踩 |

**lingxi 现状**：已接 `agent/status`、`agent/error`、`api-session/status`、`sessionTitle`；reconcile 轮询 `agents.list()`。未接：assistant-stream、inbox、session/event、projections、tokenMeter、compaction、反馈。

### 1.2 任务与进度层 —— 干到哪了

| 能力 | 服务 / 事件 | 说明 |
| --- | --- | --- |
| 目标 | `goals` (`get/create/edit/pause/resume/complete/block`)，事件 `goal/changed`、`goal/activation-changed` | `GoalView{objective, phase: active|paused|blocked|complete, roundsStarted, maxGoalRounds, blockedReason}` → **进度 = roundsStarted/maxGoalRounds** |
| 待办清单 | `sessionProjections` key `todo` | `TodoItem{content, status: pending|in_progress|completed}` → **最直观的完成度** |
| 子代理 | `subagents` (`list/listDescendants`)，事件 `subagent/start/end`，provider 变更事件 | 委派网络 |
| 工作流 | `workflowEngine`，事件 `workflow/start/phase/log/agent-start/agent-end/end` | **阶段与叙述行都是现成的进度信号** |
| 后台作业 | `jobs` (`list/get/read/kill/wait`)，**监听器 `onJobDone` / `onJobsChanged`** | 事件化后无需 60s 轮询 |
| 团队 | `agentTeams` (`listMembers/listTasks/waitForChange`) | Lead 会话日志背书的团队视图 |
| 计划模式 | `planMode.get(agent)` → `{active, pending}` | 是否在计划中 |
| Todo 工具 | （`todo_write` 写入 todo 投影） | 与 1.1 的投影同源 |

**lingxi 现状**：已接 `subagent/start|end`、`workflow/start|end`；jobs 只在 60s reconcile 里捞 running。未接：goals、todo 投影、workflow/phase+log、jobs 事件、agentTeams、planMode。

### 1.3 等待用户层 —— 什么时候停下等你

| 能力 | 服务 / 事件 | 说明 |
| --- | --- | --- |
| 授权请求 | `approval/request`（waterfall），`approval` 服务 | 工具要越权 |
| 结构化提问 | `user-questions/request`（waterfall），`userQuestions.ask` | 模型问你问题 |
| **凭据/登录** | `authorization` (`list/describe/begin/cancel`)，事件 `authorization/settled`；`credentials` + `credentials/record-updated`、`credentials/reference-updated` | **第三种"等你"**：API key、OAuth 登录流程。现在完全没接——模型卡在等登录时猫不知道 |

**lingxi 现状**：已接前两种；`authorization` 完全缺失，是"等待用户"矩阵的窟窿。

### 1.4 系统资源层 —— 用什么干

| 能力 | 服务 / 事件 | 说明 |
| --- | --- | --- |
| 文件 | `fs`，事件 `fs/observed`（正/负观察）、`fs/write-intent`、`fs/edit-intent`（waterfall，**单槽决定**） | 改了哪些文件 |
| Shell | `shell` (`resolve/run/start`) | bash 执行 |
| 子进程 | `subprocess` | 进程 spawn |
| 终端 | `terminals` (`list/spawn/read/kill`, `hasOwnerActivity`) | PTY 会话注册表 |
| 代码运行时 | `codeRuntime`, `e2b` | 沙箱代码执行 |
| 沙箱 | `sandbox`, `sandboxPolicy` (`resolve/overrideOf/defaultMode`) | 沙箱档位 |
| LSP | `lsp.query` | 语言服务 |
| 网络 | `web` (`search/fetch`) | 搜索与抓取 |
| 附件 | `attachments`, `fileUploads`, `spillStore` | 二进制与溢出存储 |
| 环境变量 | `shellEnv` (`list`) | `DSH_*` 变量注册表 |

### 1.5 能力注册层 —— 有哪些本事

| 能力 | 服务 / 事件 | 说明 |
| --- | --- | --- |
| 工具 | `tools` (`register/guard/restrict/schemas`)，事件 `tools/change`、`tools/pre-execute`、`tools/execute`、`tools/post-execute`、`tools/result`（emit，**冻结的最终结果**） | 工具拓扑 + 执行流水线 |
| 技能 | `skills` (`list/snapshot`)，事件 `skills/change` | 技能目录 |
| 人用命令 | `commands`，事件 `commands/change` | 命令面板 |
| 系统提示 | `systemPrompt`，事件 `system-prompt/change`、`system-prompt/assemble` | 提示词组装 |
| 模型 | `llm` (`listProviders`), 事件 `llm/adapters-updated`；`agentDefaultModel.currentSelection()`；`subagentModelSelection` | 当前用什么模型、拓扑变化 |
| 预设 | `agentPresets`，事件 `agent-preset/selected` | 哪个 preset 在跑 |
| 权限预设 | `permissionPresets` (`current/selectFor`) | 档位 |

### 1.6 Web GUI 层 —— 用户看到什么

| 能力 | 服务 / 事件 | 说明 |
| --- | --- | --- |
| HTTP 载体 | `webServer` (`register/tapIndex`)，事件 `webserver/index-inject` | 路由与 index 注入 |
| 插件表 | `clientModules` (`graph/onRebuilt/onGraphChanged`) | **client bundle 重编译完成是现成的开发节奏信号** |
| 工作区 | `workspaceRegistry` (`list`), `workspaceController.follow`(stream), `workspaceFiles.changes`(stream) | 工作区与文件监听流 |
| 会话控制器 | `sessionController` (`list/inspect/modelCatalog`) | GUI 背后的会话面 |
| 设置 | `settings`, 事件 `settings/updated`（含 source）、`settings/document-updated`；`settingsController` | 用户改了什么设置 |
| **Client 侧** | 服务 `layout/locale/sessions/slots/theme/timer/uiWorkspace/workspaces`；事件 `connection/reset`、`theme/change`、`locale/change`、`slots/changed` | **断连/重连、主题切换在 client 事件上** |

### 1.7 持久化与遥测层

`storage`/`storageDomain`（domain/changed 事件）、`sessionPersistence`、`sessionProjectionCache`、`sessionTelemetry`（+`session-telemetry/record` waterfall）、`typert`/`typertGateway`（插件自身的 RPC 通道）、`inspector`（`publish(topic, payload)` —— **感知数据外发的现成观察口**）、动态 Cordis 插件协议本身（`cordis_define/run/…`）。

### 1.8 UI 表面（Client Slots，体验落点）

`shell.overlay`（**全局浮动层，最适合环境型微件**）、`settings.section`（灵犀设置页已占）、`sidebar.panellist`、`conversation.composer.dock`、`conversation.input.overlay`、`main`（keyed 面板）、`rightbar.session` 等。灵犀已注册 `settings.section#lingxi`。

---

## 2. dsh-lingxi 现状盘点

| # | 已接入 | 机制 | 猫的表达 |
| --- | --- | --- | --- |
| 1 | `agent/status` / `api-session/status` | 事件 | task-event（running/completed） |
| 2 | `agent/error` | 事件 | task-event（failed）+ 提醒气泡 |
| 3 | `subagent/start\|end` | 事件 | task-event |
| 4 | `workflow/start\|end` | 事件 | task-event |
| 5 | `approval/request` | waterfall 旁听 | task-event（needs_approval）+ 气泡（alert 档） |
| 6 | `user-questions/request` | waterfall 旁听 | task-event（needs_input）+ 气泡 |
| 7 | `agents.list()` + `jobs.list()` | 60s reconcile | 纠偏真值 |
| 8 | `sessionTitle` | 服务 | taskId → 人名 |
| 9 | 五个模型工具 + settings.section | tools / slots | say/react/state/remember + 设置页 |
| 10 | 闪存提醒 | ReminderSync | 宠物 App 时钟 |

词表契约（dsh-pets，不变）：8 个 `TASK_STATES`、8 个 `TASK_KINDS`、9 个 `TASK_MOODS`、4 档响度（silent/status/report/alert）；`task-event` 支持 `progress: 0..1`（**尚未被用过**）。

---

## 3. 差距分析（按用户价值排序）

| 优先级 | 缺口 | 为什么值得 | 接入点 |
| --- | --- | --- | --- |
| P0 | **登录/凭据等待不可见** | 模型卡在等 OAuth/API key 时，猫沉默——用户以为它死了。这是与 approval/question 同级的"等你"状态 | `authorization.list()`（reconcile）+ `authorization/settled`（事件）→ `needs_input` |
| P0 | **目标与待办进度不可见** | goal round n/max、todo 完成比是最自然的 `progress` 字段来源，猫能说"跑到 3/8 了" | `goal/changed`、`goal/activation-changed`；`sessionProjections.stateOf(session,'todo')` + `onChanged` |
| P1 | **作业完成靠轮询** | 60s 延迟错过了"完成瞬间"的爽感 | `jobs.onJobDone` / `onJobsChanged` 替代轮询主路径 |
| P1 | **在改什么文件、跑什么命令不可见** | 活动感是"它真的在干活"的体感来源 | `tools/result`（提取 write/edit/bash 摘要）、`fs/observed`；`terminals.list()`（reconcile） |
| P1 | **上下文压力不可见** | 快满时提前一句"建议整理记忆"，避免突然 compaction | `tokenMeter.measure`（挂进 reconcile）；compaction 事件经 `session/event` 观测 |
| P1 | **模型正在说什么不可见** | assistant-stream 的 chunk 是逐字流——节流后取每 turn 首句做摘要 | `agent/assistant-stream`（throttle） |
| P2 | **workflow 只知起止** | `workflow/phase` + `workflow/log` 是现成的阶段进度 | 补两个监听 |
| P2 | **环境感**：模型/连接/主题/拓扑 | "切模型了""网页断线又连上了"是低成本高陪伴感的话料 | `agentDefaultModel`、`llm/adapters-updated`、`settings/updated`、`tools/skills/commands change`；client 半区 `connection/reset`、`theme/change` |
| P2 | **计划模式与沙箱档位** | planMode 激活时猫不该催进度 | `planMode.get`（reconcile 内） |
| P2 | **client bundle 重编译** | 开发场景：编译完成 = 猫报"插件好了，刷新即见" | `clientModules.onRebuilt` |
| P3 | **反馈与统计** | 点赞/点踩、token 消耗的日汇总；standing reminder 已有定时骨架，可做"每日一句话" | `feedback/committed`、`sessionTelemetry` |
| P3 | **团队感知** | 队友数量与任务板 | `agentTeams.listMembers/listTasks` |

**明确不接**（体验与隐私红线）：消息正文与附件内容全文（`attachments`、会话历史搬运）、`sessionTelemetry` 原始记录外发、`credentials` 值本体。感知只取**叶子事实**（哪条路径、哪个工具、第几轮、多少 token），不取内容。

---

## 4. 集成设计

### 4.1 设计原则

1. **安静默认（calm by default）**：新增感知全部默认 `silent`（只进事件流与设置页，不打断）；`needs_*` / `failed` / `blocked` 维持 alert。刷屏是宠物体验的第一死因。
2. **快路径 + 慢核对**（现有模式的推广）：每个新信号 = 事件监听（快）+ reconcile 里的一次注册表读取（真值）。事件丢了，一分钟内被纠偏。
3. **感知与表达分离**：新增 `SenseBus`（lib/awareness.js）只产出统一的 sense 事件 `{type, taskId?, facts}`；现有 `AttentionNotifier` 与后续表达器订阅它。dsh-pets 词表不动，所有映射在 lingxi 侧完成。
4. **progress 首次启用**：goal rounds 与 todo 完成比折算成 `progress` 传给 task-event，宠物 App 免改。
5. **mood 仍归模型**：感知模块提供事实上下文（如"刚连续失败 3 次"），不替模型填 mood。
6. **节流与去重**：assistant-stream 每 turn 取首句摘要；文件活动 10s 聚合窗口；同 (sense, key) 去重。沿用 `announced` Map 模式。

### 4.2 感知矩阵（目标态）

| 信号源 | 事件（快） | 服务（核对） | sense 类型 | 默认响度 | 表达 |
| --- | --- | --- | --- | --- | --- |
| 登录/凭据等待 | `authorization/settled` | `authorization.list()` | `wait-authorization` → `needs_input` | report | 气泡："需要你登录/填一个 key" |
| 目标进度 | `goal/changed`, `goal/activation-changed` | `goals.get`（reconcile） | `goal-progress` → `running`+progress | silent | 事件流 + 进度条 |
| 待办进度 | `sessionProjections.onChanged('todo')` | `stateOf(session,'todo')` | `todo-progress` → `running`+progress | silent | 事件流；全部完成→`completed` |
| 作业完成 | `jobs.onJobDone`/`onJobsChanged` | `jobs.list`（保留兜底） | `job-done` → `completed/failed` | status | 事件流 + 状态档气泡 |
| 文件活动 | `tools/result`（write/edit 类）, `fs/observed` | — | `activity-files` | silent | 活动聚合行 |
| 命令活动 | `tools/result`（bash 类） | `terminals.list`（reconcile） | `activity-commands` | silent | 活动聚合行 |
| 正在说话 | `agent/assistant-stream` | — | `speaking`（turn 首句摘要） | silent | 活动聚合行 |
| 上下文水位 | （reconcile 主动量） | `tokenMeter.measure` | `context-pressure` | silent（>80% → report 一次） | 一次性建议 |
| 记忆整理 | `session/event`（compaction 类） | — | `compacted` | status | 气泡："整理了记忆" |
| workflow 阶段 | `workflow/phase`, `workflow/log` | — | `phase` → progress | silent | 进度条 |
| 模型/拓扑/设置 | `llm/adapters-updated`, `settings/updated`, `tools/skills/commands change` | `agentDefaultModel.currentSelection()` | `environment` | silent | 事件流 |
| GUI 连接/主题 | （client）`connection/reset`, `theme/change` | — | `client-environment` | silent | 事件流 |
| 插件编译 | — | `clientModules.onRebuilt` | `dev-rebuilt` | status | 开发场景气泡 |
| 反馈/统计 | `feedback/committed` | `sessionTelemetry`（只计数） | `feedback`, `usage` | silent | 每日一句话（P3） |
| 团队 | — | `agentTeams.listMembers/listTasks` | `team` | silent | 事件流（P3） |

### 4.3 模块划分（lib/ 内新增）

```
lib/awareness.js          SenseBus：统一 sense 事件流（ctx.on 包装 + 订阅 API + 全局去重）
lib/sense/waiting.js      authorization 等待（P0）—— 复用 TaskWatch 的 needs_input 通路
lib/sense/progress.js     goals + todo 投影（P0）—— progress 折算、完成即 settled
lib/sense/jobs.js         jobs 事件化（P1）—— onJobDone 主路径，60s reconcile 降级为兜底
lib/sense/activity.js     tools/result + fs/observed + assistant-stream + terminals（P1）—— 10s 聚合
lib/sense/context.js      tokenMeter 水位 + compaction 观测（P1）
lib/sense/environment.js  模型/设置/拓扑/client 连接（P2，client 半区并入 client.js）
```

接线：`index.js` 挂载 SenseBus 并把各 sense 模块注册进去；`TaskWatch` 保留（它是 taskId 词典的持有者），sense 事件统一经它折算成 task-event；`remote.js` 的 `status` 返回体追加 `senses` 摘要；`client.js` 设置页在"任务现在"区下新增"感知"区（活动流、水位、环境），数据全部来自既有 `lingxi.status` Remote。

### 4.4 设置页改造（settings.section#lingxi）

新增分区：**感知开关**（每个 sense 一行开关，默认除 `context-pressure` 外全开且 silent）、**活动流**（最近 20 条聚合事实）、**上下文水位**（当前会话 token 用量条）。全部走既有 `lingxi.status` / `lingxi.getSettings` / `lingxi.setSettings` Remote，不新增协议面。

### 4.5 实施切片与验收

| 切片 | 内容 | 验收 |
| --- | --- | --- |
| P0 ✅ 已落地 | waiting（authorization）+ progress（goals）+ sweep 挂钩 + progress 全链路 + 设置页进度条/刷新 | 登录等待时猫报 needs_input（"需要凭据…"）；goal round 变化即时进事件流且带 progress（rounds/cap）；goal complete/clear 正确 settle；reconcile 一分钟内补齐无事件的 goal 与 in-flight 凭据等待；smoke 断言全绿 |
| P1 ✅ 已落地 | job-watch（onJobDone/onJobsChanged 事件化 + 晚挂载重订阅）+ activity.js（tools/result 滚动 feed：bash 首行/文件路径/web 查询，自身工具除外）+ context.js（contextPressure 投影：80% 一次性报告、回落 50% 再武装、页面实时水位）| job 完成即 settle（气泡带 label · detail）；新 job 出现无需等 tick；活动 feed 只存叶子字段且不上宠物网；跨阈值警告每次填充只响一次；smoke 48 项断言全绿 |
| P2 ✅ 已落地 | workflow 阶段（`workflow/phase` → 行标题 `name · phase`；修复 `info.runId` → `info.id` 潜在 bug；`stopReason: error → failed` 带错误消息）+ environment.js（模型路由 `agentDefaultModel` 变更即报 status 档、`settings/updated` 与 `agent-preset/selected` 进活动 feed、`clientModules.onRebuilt` 每版本一次 dev 提醒）+ settle 摘要修复（note 此前被 emit 丢弃，现为 `title · cause`）+ 状态页显示当前模型 | workflow 行随阶段推进；模型切换气泡 + status.model；设置/预设变化进活动流；重编译每版本只报一次；smoke 60 项断言全绿 |
| P2+ 缓办 | client 半区感知（`connection/reset`、`theme/change`）| 决策：宠物舞台在桌面 App 不在网页里，GUI 连接状态 GUI 自己可见；把 client 事件搬上宠物需要新增 client→host RPC 面，价值/成本不成比例。若未来做 GUI 内嵌宠物微件（`shell.overlay`）再启用 |
| P3 | 反馈/用量日结 + 团队 | 每日一句（借 standing reminder 骨架）；团队成员变化进事件流 |

### 4.6 风险与边界

- **性能**：assistant-stream 每秒可达数十 chunk——`timer.throttle` 收敛到每 turn 一次摘要；`tools/result` 只取 `exec.name`/文件路径叶子字段，禁止整对象深拷贝（Cordis 数据纪律）。
- **兼容**：dsh-pets 词表零改动；老宠物 App 收到 `progress` 字段即原生支持，无字段则忽略。
- **服务缺席降级**：`sessionProjections`/`tokenMeter` 等一律 `ctx.get()` 可选读取，缺席即跳过该 sense（沿用 tasks.js 的容错纪律）。
- **每分钟真值核对的预算**：新增的 reconcile 读取（authorization/planMode/terminals/goals）合计 <10 次本地方法调用，可忽略。

---

## 5. 一句话总结

dsh 的可感知面是一张已经铺好的电网：**执行态在事件上，真值在注册表里，log 派生态在投影中**。lingxi 现在只点亮了"任务在跑、等你点头"两盏灯；按本文 P0–P3 接完，猫将能感知**登录等待、目标与待办进度、作业完成瞬间、文件与命令活动、正在说的话、上下文水位、环境与连接变化**——全部默认安静、可开关、聚合去重，做到"它懂你，而不打扰你"。

---

## 6. 对接复查（2026-09-23，灵犀 App 更新后）

对照 `lingxi` 仓库当前构建（`e473dec` 起，lib.rs 桥接实装）复查了一遍接入面，三处需要优化、全部已落地：

| 发现 | 影响 | 处置 |
| --- | --- | --- |
| App 新增权限模型：持久写入（memory/reminders/settings 字段）按 `X-Lingxi-Agent` 头识别调用方，非 `trusted` 档 403 拒绝 | 本插件原先不发该头 → 全部写入按 "anonymous" 被拒，提醒与记忆静默失效 | PetBridge 全量携带 `X-Lingxi-Agent`（随身份改名重建）；被拒原因透传到设置页（syncBlocked），给出 App 自己的放行提示 |
| App 集成指南明说挂载时的假 running 任务是噪音（"不制造一个永远处于 running 的假任务"） | 本插件 `autoAnnounce` 默认开 → 首页常驻一条永不结束的任务 | 默认改为关；要打招呼仍可手动打开 |
| App 自带 `integrations/hosts/dsh/lingxi-dsh-plugin.js`（同名五工具、同 `dsh` 身份的 cordis_define 动态插件） | 与本包同载会注册重复的 `lingxi_*` 工具 | README 写明二选一：本包是超集，勿同载 |
| 新增 `GET /integration`（运行时契约自述） | 契约漂移以前只能靠"事件莫名消失"发现 | `status()` 现场拉取 /integration，设置页显示"契约 v1 · 词表一致 / 漂移：lists" |
| 优先级词表实为 `ambient\|status\|report\|alert` | 本插件从不外发 silent（映射为 status），无断 | 无需改动；已记录 |

验证：stub 桥升级为模拟新 App 行为（写入按头门禁、403 拒绝体、/integration 端点），宿主冒烟 66 项断言全绿。

---

## 7. 子 agent 完成提示 + 新输入意图提示（2026-09-23，用户直接提出）

两个"效果更好"的补强，对证运行时 Inspect 与 `dsh-subagent`/`dsh-llm` 类型后落地：

**① 子 agent 完成状态提示。** tasks.js 里早就有 `subagent/start|end` 处理器，但读的是
`info.sessionId` / `info.outcome` —— 实装类型是 `SubagentRunInfo{runId, provider, id, local}`
与 `SubagentRunEndInfo{…, stopReason: completed|aborted|error|max-tokens|refusal,
lastAssistantMessage?}`。字段名对不上 → **子 agent 此前完全隐形**（与 workflow `runId`
同类的静默失效，第三个实例）。修复后：

- start → 按 `info.id` 挂 running 行（标题回退子会话标题；label 在创建请求上、不在 run info 上）
- end → completed 行带**子 agent 的原话收尾**（`lastAssistantMessage` 首个 text 块，压平截
  120 字）："目录复查 · tests passed"；aborted → cancelled（不打扰）；error/max-tokens/refusal
  → failed 在 report 档点名原因

**② 新输入意图提示。** `agent/inbox/inserted{agent, message}`（UserMessage.content 首个
text 块，压平截 80 字——**用户自己的原话就是最便宜诚实的摘要**，watch 不跑模型）：

- 会话空闲时的新输入 → queued 行 + "收到新任务：…"气泡（默认策略 `queued: status`，可调 silent）
- 工作中的转向输入 → 抑制（running 行已经在讲这个故事）
- 提示同时被记住：该会话转 running 时行标题继承用户原话——"开始「帮我修好登录」"不用追问
- queued 行由下一次 reconcile 的消失结算自动清场，不留幻影

验证：冒烟 74 项断言全绿（新增 8 项：subagent start/end 三态、结果摘要进 summary、
max-tokens report 档、queued 行与气泡、running 继承、转向抑制）。

---

## 8. 额度告警 + 动态主题（2026-09-24，用户直接提出）

两个补强，源于用户的两个问题："token 不够用了能提示吗" 与 "session 名字不随会话演进，
提示时应重新总结最新一次的任务"。

**① 额度告警（lib/sense/budget.js）。** "token 不够用"有两种形态，dsh 核心其实都已
给了机器可读的分类（`dsh-llm` error.js）：`LlmFailure.code` 的 `QUOTA` 是"账户配额/
余额耗尽"的规范中立码，`CONTEXT_WINDOW_EXCEEDED` 是"请求超出模型上下文"的规范码。
关键实证：**装机的 freeroute 把 quota/配额/credit 文案命中映射成 `RATE_LIMIT`**——
只看 code 必漏报。所以分类器双读：code 优先，message 文本兜底（用核心
`isQuotaExceededError` 同族终态措辞 + 中文：余额不足/配额额度耗尽/欠费/免费档失效）。

- 接入点：`agent/request-error` waterfall **纯旁听**（next() 原样传递）——它把每次
  失败尝试送来时重试机制尚未决定任何事，是"额度死"的最早观测点
- 响度：quota → **alert**（工作被堵死，属 failed 类）；context 超限 → report（80%
  渐进水位的"突变兄弟"）；普通 RATE_LIMIT/5xx/aborted 永不出声
- 去重：(sessionId, class) 每 10 分钟一条——同一死请求的重试秒级到达，折成一句

**② 动态主题（tasks.js `describe`）。** dsh 的 sessionTitle 是出生时折叠生成、永不
跟进会话演进的；TaskWatch 的 `inputHints`（sessionId → 用户原话）才是最诚实的主题。
两处改动：

- `inputHint` 运行中的转向输入从"整体忽略"改为**始终记忆**：无新行、无气泡（原抑制
  不变），但 running 行标题静默跟随——settle 时的 "「新原话」· 失败原因" 报告的才是
  会话现在正在做的事
- 新增 `describe(sessionId)`：用户原话 → 行标题 → 静态标题 → null，供所有告警行取主题；
  context.js 的 80% 警告与 budget.js 的两条告警全部改走它

验证：冒烟 81 项断言全绿（新增 6 项：转向记忆无 queued 行、QUOTA 告警带最新原话与
线路名、静默窗去重 + RATE_LIMIT 不出声、中文文案分类、上下文超限 report 带主题、
水位警告带主题）。第二刀（余额主动轮询 + 用量日结）仍按 P3 待办。

---

## 9. 提问不提示 + 瀑布链被吞（2026-09-24，用户直接报告）

用户报告："dsh 提示我回答问题，但插件只提示完成了，没有提示有问题等我回答。"
实证路径：在会话持久化里找到了原始现场（`ins-fedev-internal` 的
session-f3ad8ba7）——模型两次调用 `ask_user_question`，**19ms/34ms 就返回**，
工具结果报 `Cannot read properties of undefined (reading 'answers')`。

### 根因一（致命）：waterfall 旁听吞掉 `next()` 的返回值

cordis 瀑布的语义：**监听者的返回值就是整条链的解析值**（`return next()` 才是
放行）。tasks.js 的守卫包装器是

```js
this.ctx.on(event, (...args) => { try { handler(...args) } catch {…} })
```

——对 `emit` 事件无害，但 `approval/request` / `user-questions/request` 走了它：
包装器把 handler 的返回值（`next()` 的 promise）**丢弃并返回 undefined**。
真实时序：web 客户端应答者在会话不在视野时立即 pass（`scopeOf(owner) ===
undefined` → `next()`）→ 链落到 lingxi 包装器 → 整条瀑布解析成 `undefined` →
`(await ask()).answers` 抛 TypeError。approval 侧 undefined 被归一为
`unavailable`（fail-closed），恰好掩盖了同类破坏。

### 根因二：提示语不带问题内容

track 时写死 `等待你的回答`，宠物即使响了也只是"有个问题想问你"——用户还得追问
"什么问题？"。而 `AskUserQuestionRequestEvent.questions[0]` 里 header/question
现成可取；approval 侧 `describeApproval` 读的 `subject/title/tool/name/kind`
在真实 `ApprovalRequestEvent`（`toolName` + `reason`）上**全不存在**，永远
落到兜底"一个操作"。

### 修复

- 两个 waterfall 旁听**裸注册**：观察包 try/catch，`return next()` 无条件在
  try 外——与 budget.js 的 `agent/request-error` 旁听同款（那个本来就对）
- `needs_input` 行标题 = 第一个问题原文（`header：question`，压平截 60 字），
  气泡变成"「文档入库：.gitignore 目前忽略了 docs…」有个问题想问你。"
- `needs_approval` 标题改读 `toolName`/`reason`，气泡点名要授权的工具
- 结算闭环：把簿记挂在**链自己的 resolution** 上（原样返回不碰）——已回答 →
  completed；取消/无人应答（`ASK_ABORTED`/`NO_PROVIDER`）→ cancelled。
  `needs_*` 行不再永久僵在任务表里

### 验证

冒烟 88 项断言全绿（新增 7 项：observer 原样返回链解析值【veto 回归】、问题
原文进气泡与 feed、approval 气泡带 toolName、应答后行结算 completed、
无人应答行结算 cancelled 且默认不出声）。smoke 的 `emit` 助手同步修正为返回
最后一个 handler 的结果——旧助手把链结果吞掉，恰好掩盖了 veto bug。

## 子代理完成提示只见状态不见内容（2026-09-24 晚）

### 现象

用户反馈：dsh 的子代理完成任务后，宠物只弹一个裸状态（"已完成"），看不出干了
什么——"跟没提示没啥区别"。

### 根因（两层叠加）

1. **运行的是旧代码**。profile 以 link 挂载本包，宿主进程启动时加载一次；
   `subagent/end` 携带 `lastAssistantMessage`（子代理最后一条助手消息，本身就是
   模型写的总结）并把它提取成完成摘要的逻辑是当天 14:56 才写进工作区的，而宿主
   10:45 就启动了。改 lib 不重启宿主 = 永远跑旧管线。**这是主要根因。**
2. 新代码自己的缺口（重启后仍会踩）：
   - `outcomeText` 取**第一个** text 块——子代理的收尾报告常以交接前言开头
     （"delivered to the parent…"），结论在最后一个块；
   - markdown 修饰（`##`/`-`/反引号）原样进气泡；
   - 120 字硬截断会切在词中间；
   - `stopReason: 'error'` 以机器词进中文气泡；
   - 子代理会话无标题时退化为 id 切片（"「a1b2c3…」已完成"）。

### 修复（lib/tasks.js）

- 提取改三步：**取最后一个非空 text 块**（结论在收尾）→ 剥 markdown 修饰 →
  CJK 感知截断（在 120 字内的最后一个句号/叹号/问号/分号处收刀）；纯字符串负载
  防御性接受；
- `error` → 「出错」、`aborted` → 「已中止」，机器词不出现在气泡里；
- 会话无标题时行标题落到「子任务」/「工作流」，**id 切片永远不当主语**；
- 新增 `test/summary.test.mjs`（6 项）钉住以上规则；`pnpm -r test` 可跑。

### 为什么不在插件里调大模型做总结（设计决定）

- **子代理的最后一句话本身就是一个模型写的总结**——插件该做的是忠实的确定性
  提取，不是再烧一次调用；
- 宿主没有暴露给插件的轻量补全 API（`llm` 服务是适配器注册表 + agent 内环
  路的水瀑布，插件事 originate 不了）；用一次性子代理去蒸馏一行 40 字的摘要，
  要么等好几秒、要么污染宠物自己的任务流（蒸馏子代理自己会触发
  `subagent/start` 行）——违反"不多不少"；
- 带上下文的转述由**父代理**完成：`lingxi_task` 的工具描述已写明"子代理的
  结论值得用户知道时，用本工具补一条终态报告"。父代理手里有全部上下文，它
  的转述比任何插件侧二次蒸馏都准。

### 通知的三条纪律（本包全部 sense 的共同契约）

1. **准**：一句话里必须有主语（用户的话 > 行标题 > 「子任务」兜底，id 永远
   不当主语）和事实（事件自带的原文 > 无）。宁缺勿编：提取不出来就退到
   「子任务」，不臆造。
2. **时机**：只在用户可行动的边界出声——开始一条、要授权/要回答立刻、完成
   一条；running 有 2.5s 去抖等模型自己的报告来富化；feed 行永远即时，说出口
   的话才去抖/去重。
3. **不多不少**：say 按 (task, state) 去重；completed 不再说（app 的报告叙事
   已带摘要，说两遍是噪音）；预算/上下文告警每 (session, class) 一个安静窗口
   一条；蒸馏不引入新的任务行。

## 提示日志：让优化有据可依（2026-09-24 深夜）

"提示要准、时机要对、不多不少"不能靠记忆和感觉迭代——一次没显示出来的气泡、
一条被策略压下的 say、一次去重吞掉的真实更新，不留任何其他痕迹。新增
`lib/notify-log.js`：JSONL 落盘（`~/.lingxi/notify-log.jsonl`，1 MiB 滚动，
留 2 代），两层记录一个文件：

- **决策层**（AttentionNotifier）：每次转换记 `emit` / `dedup` /
  `suppressed-by-policy` / `debounced-start`，带摘要与**来源 provenance**
  （`model-report` / `watch-derived` / `generic`）——"准"轴的证据：一条摘要
  是模型自己说的、观察器推的、还是兜底词，一眼可辨。
- **出线层**（loggingBridge，Proxy 委托全桥）：每一条真正发出的 say / react /
  task-event 连同 app 的应答（含 400 stage-busy 拒因）——"时机"与"不多不少"
  的证据；工具与全部 sense 喊话因同走桥接而自动覆盖。

`taskId` 即 dsh 会话/agent id，与 harness 的会话记录天然可 join；设置变更也
记一条，作为分析序列的分界。记录永不抛错、失败静默——通知是产品，日志是影子。

后续分析入口：`jq -c 'select(.decision=="dropped")' ~/.lingxi/notify-log.jsonl`
看投递损失；按 provenance 统计 generic 占比看"准"的退化；按 ts 密度看"不多
不少"。配合会话记录可复盘每一次提示的完整上下文。
