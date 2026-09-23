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
 * @returns {object[]} ToolDefinition[]
 */
export function buildLingxiTools({ bridge, settings, getSettings }) {
  const enabled = () => (getSettings ? getSettings().tools : settings.tools)
  const identity = () => (getSettings ? getSettings() : settings)
  const agent = () => identity().agentId

  const tools = []

  if (enabled().task) {
    tools.push({
      name: 'lingxi_task',
      description:
        '把你正在为用户做的任务报给桌宠猫灵犀。state 是流程（开始 running、等授权 needs_approval、' +
        '被挡 blocked、完成 completed、失败 failed、用户取消 cancelled）；mood 是只有你判断得了的' +
        '事情心情（写家书是 tender，和 flaky test 搏斗是 frustrated），猫回应的是心情而不是镜像状态。' +
        '开始和结束各报一次即可，不要刷屏；没有心情可报时不报也是正确的。',
      parameters: {
        type: 'object',
        properties: {
          state: { type: 'string', enum: TASK_STATES, description: '任务流程状态' },
          kind: { type: 'string', enum: TASK_KINDS, description: '任务种类，默认 other' },
          mood: { type: 'string', enum: TASK_MOODS, description: '这件事的心情——最有价值的字段' },
          summary: { type: 'string', description: '一句话概述（不超过 140 字）' },
          taskId: { type: 'string', description: '稳定的任务标识，同一任务用同一个' },
          progress: { type: 'number', description: '0..1，用于长任务的过半提醒' },
        },
        required: ['state'],
      },
      output: { schema: OUTPUT_SCHEMA, render: renderJson },
      timeoutMs: 8000,
      async execute(args) {
        return bridge.taskEvent({ ...args }, agent())
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
