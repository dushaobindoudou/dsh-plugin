# 画线工具 · TradingView 逐项对照

核对日期：2026-10-17（0.5.2）。对照对象是 TradingView 网页版的画线面板与画线对象设置。「已做」以源码和测试为依据：单元测试 `test/chart-drawings.test.mjs`，真实宿主冒烟 `npm run smoke:drawing`（`scripts/drawing-smoke/` 下的 basics、phase1–5、perf）；依据列引号内是冒烟里 check 的原文。没有自动化测试的项单独注明。

结论：通用交互与对象属性两节列出的项全部已做；每个工具分组的常用工具已做；第三节「未做」列是各分组里较少用的工具，不属于本轮「基础能力」范围。

## 一、通用交互

| 能力 | 状态 | 依据 |
|---|---|---|
| 点击放置锚点、实时预览、Esc 取消 | 已做 | phase1「trend drawn」；`candle-chart.tsx` completePreview；phase5「first Esc only cancels the tool」 |
| 选中后拖动锚点改形状、拖动整体平移 | 已做 | phase1「anchor drag reshapes one end only」及其前一条整体拖动检查 |
| 磁吸（弱 / 强），吸附 K 线 O/H/L/C | 已做 | phase1「strong magnet snaps」 |
| 按住 Ctrl/⌘ 临时反转磁吸，显示吸附点 | 已做 | phase5「holding Ctrl turns the magnet on」 |
| 按住 Shift 约束为水平 / 45° | 已做 | phase5「Shift snaps … 45°」 |
| 浮动工具条（颜色、线宽、线型、复制、锁定、删除、隐藏），固定一行 | 已做 | phase1「selecting shows the floating style toolbar」「color applied and persisted」「width and line style persisted」「a locked drawing does not move」；phase5「the toolbar hide button hides the drawing」「the floating toolbar stays one row on a narrow chart」 |
| 坐标与名称精确编辑（属性面板） | 已做 | basics「coordinate and label changes are saved」「coordinate editor rejects an invalid price」 |
| 撤销 / 重做（含批量、失败回滚） | 已做 | `test/drawing-history.test.mjs`；phase3「undo brings a deleted drawing back unchanged」；phase5「one undo restores the whole group」 |
| 复制 / 粘贴、克隆 | 已做 | phase3「Ctrl/Cmd+C then V pastes another copy」 |
| 多选（Shift/Ctrl 点击）、整组拖动、批量改色 / 隐藏 / 锁定 / 删除 | 已做 | phase5「Shift-click builds a two-drawing selection」「dragging a grouped line moves the whole group」「Delete removes the whole group」 |
| 对象树：列表定位、显示 / 隐藏、锁定、删除 | 已做 | phase3「list row selects the drawing」及列表隐藏检查；列表里的锁定按钮无单独测试（锁定行为见 phase1） |
| 连续绘制、锁定所有画线、删除所有画线 | 已做（无自动化测试） | `desk-column.tsx` 画线菜单 |
| 收藏工具与快捷工具栏 | 已做 | basics「starring a tool adds it to the quick toolbar」「favorite tools survive reload」 |
| 默认样式模板（按工具保存） | 已做 | phase3「a new circle takes the saved default style」 |
| 快捷键 Alt+T/H/J/V/C/F、Alt+Shift+R | 已做 | phase5「Alt+T starts the trend line tool」 |
| Esc 逐层退出（工具 → 选择 → 放大图） | 已做 | phase5「first Esc only cancels the tool」「second Esc leaves the expanded chart」 |
| 画线跨周期显示，按会话 / 币种保存，重启保留 | 已做 | phase2「drawings and MAs restored after restart」 |
| 同步到同币种所有会话 | 已做 | phase4「drawing synced」及新会话可见检查 |
| 画线价格提醒（穿越触发一次） | 已做 | phase4「price alert armed」与触发检查；HIP-3 行情同样参与提醒 |
| 快速连续点击不丢锚点 | 已做 | 原生 click 路径。0.1.0 对照：两次点击间隔 100/300/450ms 均漏画 20/20，550/700ms 0/20（图表库 500ms 双击窗口）；当前版本 100/300/450/900ms 各 20 次 0 漏画 |
| 触摸：点两下画线、点线选中、手指拖锚点、单指平移 | 已做（0.4.4） | touch「touch: two taps draw a trend line」「touch: dragging an anchor reshapes the line」「touch: a one-finger swipe pans the chart」（Chrome 手势管线模拟，非真机） |
| 触控板：双指缩放只缩放图表（不缩放页面）、双指横滑平移，画线随 K 线移动 | 已做 | trackpad「pinch-out zooms the chart (not the page)」「a two-finger horizontal swipe pans」 |
| 屏幕外画线不渲染 | 已做 | perf「a drawing far off-screen is not rendered」 |

## 二、对象属性

| 属性 | 状态 | 依据 |
|---|---|---|
| 颜色、线宽、线型 | 已做 | phase1「color applied and persisted」「width and line style persisted」 |
| 锁定、隐藏 | 已做 | phase1「a locked drawing does not move」；phase3 隐藏检查；phase5「the toolbar hide button hides the drawing」 |
| 按周期显示（仅本周期） | 已做（0.4.2） | phase5「on another interval it is hidden from the chart but listed」「a level limited to its interval draws no axis line elsewhere」 |
| 文字大小（文本、标注气泡） | 已做（0.4.2） | 单元测试「24px 文本框是 12px 的两倍」 |
| 背景填充浓淡（矩形、圆、三角、通道、斐波那契、区间等） | 已做（0.4.2） | phase5「fill and interval visibility are saved」；单元测试填充透明度 |
| 斐波那契自定义层级 | 已做 | phase5「custom fib levels」 |
| 成交量分布行数与价值区比例 | 已做 | phase5「rows to 96」 |
| 趋势线向左 / 右延长 | 已做（0.4.3） | phase5「extend right is saved and the line runs past its anchor」；单元测试延长后的提醒价格 |
| 文字粗体 / 斜体 | 已做（0.4.2） | 单元测试「bold reaches the text」 |
| 字体选择 | 不适用 | TradingView 文本设置只有颜色、字号、粗体、斜体、背景、边框，没有字体选择 |

## 三、工具分组

| TradingView 分组 | 已做（0.5.x 新增加粗） | 未做 |
|---|---|---|
| 线条 | 趋势线、射线、信息线、延长线、趋势角度、水平线、水平射线、垂直线、十字线 | — |
| 通道 | 平行通道、回归趋势、**平顶 / 平底通道**、**分离通道** | — |
| 叉子线 | 安德鲁叉子线、Schiff、改良 Schiff | 内部叉子线：TradingView 帮助页对它的描述（起点在前两点水平、垂直各一半处）与改良 Schiff 相同，未说明两者区别，未单独做 |
| 斐波那契 | 回撤、趋势扩展、通道、时间周期、**速度阻力扇**、**斐波那契圆**、**速度阻力弧**、**楔形**、**基于趋势的时间**、**斐波那契螺旋** | — |
| 江恩 | 江恩箱、江恩方格、江恩扇形 | 固定江恩方格：TradingView 只列出名称，没有说明文档，未做 |
| 形态 | XABCD、ABCD、头肩、艾略特推动浪 / 调整浪、**Cypher**、**三驱**、**三角形态**、**艾略特三角浪 / 双重组合 / 三重组合**、**周期线**、**正弦线** | — |
| 预测与测量 | 多头 / 空头头寸、日期区间、价格区间、日期与价格区间、固定范围成交量分布、**预测**、**锚定 VWAP**、**锚定成交量分布**、**K 线形态**、**投影**（按 TradingView 说明：起点、未来点、估计价格三点的扇形）、**幽灵 K 线**（官方未公开生成算法，本实现为近似：沿点击路径每个 K 线周期一根，高低差取实体与「起点前 20 根平均高低差 × 0.6–1.4」中的较大者） | — |
| 几何形状 | 画笔、箭头、矩形、圆形、三角形、**椭圆**、**旋转矩形**、**弧线**、**曲线**、**荧光笔**、**路径**（双击或 Enter 结束）、**折线** | — |
| 注释 | 文本、标注气泡、价格标签、图标 / 贴纸（含任意 emoji）、**便签**、**价格便签**、**路标**、**图钉** | 锚定文本（固定在屏幕位置，与按时间 / 价格存储的画线模型不同）、表格 |

共 74 种画线工具；0.5.x 新增 33 种的依据：单元测试（每种按完整锚点数校验并渲染，平顶边、分离边、旋转矩形宽度、弧线控制点、Cypher 比值、斐波那契圆半径、锚定 VWAP 数值等几何断言）与冒烟 tools2（每种用鼠标真实绘制并渲染）。画线菜单顶部有搜索框（冒烟「searching the drawing menu for "vwap" leaves only anchored VWAP」）。

## 仍需人工观察

- 触摸与触控板已用 Chrome 模拟验收（触摸走手势管线，触控板为 Chrome 上报的 wheel 事件）；iPad / 安卓真机与 Safari 未验收。
- 性能数字来自无头 Chrome（100 条画线、5000 根 K 线下 p95 约 16.7ms），实际机器上以使用体验为准。

## 对照资料（第三节未做项的查证）

- [Inside pitchfork（TradingView 帮助）](https://www.tradingview.com/support/solutions/43000518146-inside-pitchfork/)
- [Schiff pitchfork（TradingView 帮助）](https://www.tradingview.com/support/solutions/43000518140-schiff-pitchfork/)
- [Projection / Sector（TradingView 帮助）](https://www.tradingview.com/support/solutions/43000516995-projection/)
- [Ghost Feed（TradingView 帮助）](https://www.tradingview.com/support/solutions/43000748168-ghost-feed-a-drawing-tool-to-study-your-chart/)
- [Drawing tools available on TradingView](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/)（固定江恩方格只出现在列表中）
