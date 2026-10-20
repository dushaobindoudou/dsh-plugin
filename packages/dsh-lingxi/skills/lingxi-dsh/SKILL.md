---
name: lingxi-dsh
description: 在 DeepSeek Harness 中使用灵犀桌面猫，报告任务、读取实时能力、克制地播放特效，并在应用缺失时引导安装。
---

# 灵犀 · DSH 插件

本包注册五个工具和 DSH 身份：lingxi_task、lingxi_say、lingxi_react、lingxi_state、lingxi_remember。
不要同时加载旧的动态 Cordis 灵犀插件，它注册相同工具。工具不存在时先检查插件是否加载。
通知与陪伴遵循[灵犀系统规则](https://github.com/dushaobindoudou/lingxi/blob/main/integrations/skills/lingxi/SKILL.md)。

每项真实任务沿用同一个 taskId，开始与终态各报告一次。summary 写任务名及具体结果；插件启动不算任务完成。
宿主已经观察任务、子任务、授权和结束事件，不为每次工具调用重复报任务，不重复播报同一结果。
记忆与提醒是持久写入；应用拒绝权限时展示实际原因，不通过更换身份绕过。

## 先确认应用

先用 lingxi_state 检查状态与 data.capabilities。连接失败不等于未安装：

1. 检查 /Applications/灵犀.app、~/Applications/灵犀.app；其他位置可按 bundle id com.dushaobin.lingxi-desktop 查找。
2. 已安装但未启动时，按用户的启动偏好打开现有应用；LINGXI_AUTOSTART=0 时只给手动启动指引。
3. 确认缺失后，引导打开 https://github.com/dushaobindoudou/lingxi/releases/latest，下载稳定版 universal DMG 和 SHA256SUMS.txt，校验后拖入应用程序并启动。未公证版本按发布说明放行。
4. 再调用 lingxi_state 验证桥接。应用已运行仍失败时核对端口和 token，只重试一次，不循环重装。

这个 npm 包不会下载或安装 DMG。目标应用为 v1.0.1 或更新稳定版；升级需用户提出，保留设置、记忆和提醒。
仅在真实完成安装并读到状态后，才能报告接入成功。

## 实时能力与自动特效

lingxi_state 的 data.capabilities 是当前应用的动作、表情、特效和 autoEffects；每次准备自动特效前重新读取。
用户在灵犀设置开启自动特效、enabled 为 true 且 remainingCooldownMs 为 0，才考虑播放；旧版缺字段、关闭或冷却中均跳过。

结合任务特点，复杂问题终于解决、重要交付完成可偶尔选 zoomies，用户表达亲近可选 kiss-rush。
同一任务最多一次，所有 Agent 共享至少 10 分钟冷却。普通修改、日常测试、失败、风险、等待授权不播放。
用户正在拖猫或玩玩具时不打断；拿不准就省略，拒绝后不重试、不提高优先级。

使用 lingxi_react({perform: 'zoomies', automatic: true})。只有用户明确点播时才传 automatic: false，不能伪装成手动绕过关闭或冷却。
angry-claw 仅用于明确玩笑；pee-at-you、poop-at-you 只回应用户明确想看或已发起的轻松玩笑，不用来庆祝发布或通知故障。
普通表情和动作也从 capabilities 选择，不猜名称。

托盘保留常用入口；自动特效开关在设置，手动点播在玩法。两种猫咪形态都保留。
撸猫入口仅在主界面「玩法」保留，托盘隐藏该入口。只有用户明确想玩时才引导开启，按住左键轻抚头部、身体或翻身露出的腹部；单击和悬停不算轻抚。
当前轻抚交互尚未完成实际验收；若用户反馈无反应，引导在玩法收起玩具退出，不反复开启，不声称已经成功或已修复。
输入区域避让高于玩具与特效；需要用户手动授予辅助功能权限，只检测输入区域的几何位置。
