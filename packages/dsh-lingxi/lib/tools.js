/**
 * dsh-lingxi — the five model tools, built over the shared pet bridge.
 *
 * The tool definitions are plain ToolDefinition objects (name, description,
 * parameters, output {schema, render}, execute, timeoutMs) — the same shape
 * `tools.register` takes in the host registry. Only ENABLED tools are built;
 * the caller rebuilds the array when the settings page flips a toggle.
 *
 * The mood field is the whole point and the descriptions teach it: `state`
 * and `kind` are process facts anyone can see, `mood` is the read on the
 * work that only the model doing it can give, and the pet's reaction tables
 * respond to the mood — never a mirror of it.
 */
import { TASK_KINDS, TASK_MOODS, TASK_STATES } from './pet-contract/index.js'

function renderJson(args, value) {
  return [{ type: 'text', text: JSON.stringify(value) }]
}

const OUTPUT_SCHEMA = { type: 'object', additionalProperties: true }

/**
 * Build the tool list.
 *
 * @param {object} options
 * @param {import('dsh-pets').PetBridge} options.bridge - bound to current settings.
 * @param {object} options.settings - validated pet settings (agentId, tools…).
 * @param {() => object} [options.getSettings] - re-read at call time so a
 *   settings change is honored without rebuilding the definitions.
 * @param {object} options.notifier - the attention notifier; lingxi_task
 *   reports route through it so the model's summary becomes the voice of the
 *   task and dedups against the task watch's session tracking.
 * @returns {object[]} ToolDefinition[]
 */
export function buildLingxiTools({ bridge, settings, getSettings, notifier }) {
  const enabled = () => (getSettings ? getSettings().tools : settings.tools)
  const identity = () => (getSettings ? getSettings() : settings)
  const agent = () => identity().agentId

  const tools = []

  if (enabled().task) {
    tools.push({
      name: 'lingxi_task',
      description:
        '把你正在为用户做的任务报给桌宠猫灵犀——开始（running）和结束（completed/failed）各报一次，' +
        '长任务过半时补一次 progress。猫会把这两个瞬间念给用户听：开始一条、完成一条，所以 summary ' +
        '必须是这句话的信息量所在——用真实的「做了什么」（如「修复 typert 副本分裂导致的 404」），' +
        '不要用会话标题或「完成任务」这类空话，否则用户听到完成也不知道完成了什么。' +
        '后台子代理（subagent）结束时插件会自动带它的最后一句话提示；但只有你知道它的结果对全局意味着' +
        '什么——如果这个结果值得用户知道，就用本工具补一条终态报告，把子代理的结论放进 summary 的上下文里' +
        '（如「素材清单已达标，ear_fur 方向性还差一点」）。state 是流程' +
        '（running/needs_approval/blocked/needs_input/completed/failed/cancelled）；mood 是只有你' +
        '判断得了的事情心情（写家书是 tender，和 flaky test 搏斗是 frustrated），猫回应的是心情' +
        '而不是镜像状态。没有心情可报时不报 mood 也是正确的。',
      parameters: {
        type: 'object',
        properties: {
          state: { type: 'string', enum: TASK_STATES, description: '任务流程状态' },
          kind: { type: 'string', enum: TASK_KINDS, description: '任务种类，默认 other' },
          mood: { type: 'string', enum: TASK_MOODS, description: '这件事的心情——最有价值的字段' },
          summary: {
            type: 'string',
            description: '这条任务的一句话真实概述——说清做了什么，开始/完成气泡直接引用它',
          },
          taskId: {
            type: 'string',
            description: '一般不用传：默认跟随当前会话，与任务观察器共享同一条任务。仅在并行做多个独立任务时用稳定 id 区分',
          },
          progress: { type: 'number', description: '0..1，长任务过半时猫会再提醒一次' },
        },
        required: ['state'],
      },
      output: { schema: OUTPUT_SCHEMA, render: renderJson },
      timeoutMs: 8000,
      async execute(args, exec) {
        // Route through the notifier, not raw at the bridge: the notifier is
        // the single mouthpiece, so the model's report dedups against the
        // task watch's session tracking (same taskId — the session id by
        // default) and its summary/kind/mood become the voice of every later
        // transition for this task.
        const taskId = typeof args.taskId === 'string' && args.taskId.trim()
          ? args.taskId.trim().slice(0, 128)
          : String(exec?.agent?.id ?? 'dsh-task').slice(0, 128)
        notifier.handle({
          taskId,
          state: args.state,
          kind: args.kind,
          mood: args.mood,
          summary: args.summary,
          source: 'tool',
        })
        return { ok: true, taskId, state: args.state }
      },
    })
  }

  if (enabled().say) {
    tools.push({
      name: 'lingxi_say',
      description:
        '让灵犀说一句话（建议 140 字以内）。适合轻量的陪伴反馈；长内容和任务进度不要走这里' +
        '（那是 lingxi_task 的职责），一个回合最多让猫动一两次。',
      parameters: {
        type: 'object',
        properties: { text: { type: 'string', description: '猫要说的话' } },
        required: ['text'],
      },
      output: { schema: OUTPUT_SCHEMA, render: renderJson },
      timeoutMs: 8000,
      async execute(args) {
        return bridge.control({ say: args.text, agent: agent(), priority: 'status' })
      },
    })
  }

  if (enabled().react) {
    tools.push({
      name: 'lingxi_react',
      description:
        '让灵犀做一个表情/动作（可选保持毫秒数）。名字必须真实存在——先 lingxi_state 看 ' +
        'capabilities，或者确认 /integration 里的库；用户可以自定义动作名，猜名字会被拒绝。' +
        '适合庆祝、打招呼这类直接反应。',
      parameters: {
        type: 'object',
        properties: {
          expression: { type: 'string', description: '表情名，必须来自现有表情库' },
          action: { type: 'string', description: '可选动作名，必须来自现有动作库' },
          holdMs: { type: 'integer', description: '表情保持毫秒数' },
        },
        required: ['expression'],
      },
      output: { schema: OUTPUT_SCHEMA, render: renderJson },
      timeoutMs: 8000,
      async execute(args) {
        return bridge.control({ agent: agent(), ...args })
      },
    })
  }

  if (enabled().state) {
    tools.push({
      name: 'lingxi_state',
      description:
        '读取灵犀的当前状态：petState、表情、活动统计、可见的玩具，以及完整的表情/动作库。' +
        '用于决定怎么反应，也用于确认桥接是否可用。',
      parameters: { type: 'object', properties: {} },
      output: { schema: OUTPUT_SCHEMA, render: renderJson },
      timeoutMs: 8000,
      async execute() {
        return bridge.perception()
      },
    })
  }

  if (enabled().remember) {
    tools.push({
      name: 'lingxi_remember',
      description:
        '让灵犀持久地记住一条关于用户的事实（owner/project/preference/moment）。跨会话有效，' +
        '用户会在 app 里看到并可以删除。只记值得跨会话的事，不要当草稿纸用。',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: '要记住的事实，一句话' },
          kind: { type: 'string', enum: ['owner', 'project', 'preference', 'moment'], description: '记忆类型' },
        },
        required: ['text'],
      },
      output: { schema: OUTPUT_SCHEMA, render: renderJson },
      timeoutMs: 8000,
      async execute(args) {
        return bridge.memory({ agent: agent(), ...args })
      },
    })
  }

  return tools
}
