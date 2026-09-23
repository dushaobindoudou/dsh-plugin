/**
 * dsh-lingxi - client half (web).
 *
 * Registers the "灵犀" settings page (settings.section). Talks to the host
 * `lingxi` Remote namespace through the connection RPC carrier.
 *
 * The page is built on the bridge's OWN provided interfaces: /health and
 * /agents answer the status hero and the identity chips, so what you see is
 * what the pet app currently says about itself - not a cached copy.
 *
 * The settings item is the plugin's own contract (agent identity, port,
 * auto-announce, which tools the model sees), persisted to the shared
 * ~/.lingxi/pets-settings.json through the host. Opening the page never
 * writes; 保存 is the only write, and the result reports exactly which
 * fields the validator ignored.
 *
 * Colors come from the host's `--dsw-alias-*` design tokens (see
 * dsh-recovery for the two token traps). Localization mirrors the doctor
 * page: host `locale` service with a fallback lookup.
 */
window.__ModuleLoader__.load({
  id: 'dsh-lingxi',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    const react = require('react');
    const React = react;
    const h = React.createElement;

    /** Dictionary namespace owned by this plugin. */
    const NS = 'settings.lingxi';

    const zh = {
      localeCode: 'zh',
      tab: '灵犀',
      subtitle: 'Lingxi · 桌宠猫',
      loading: '正在读取桥接状态…',
      connectionNotReady: '连接服务尚未就绪',
      callFailed: '调用失败',
      unexpectedResponse: '意外的 RPC 响应',
      bridgeUp: '桥接在线',
      bridgeDown: '桥接不在线——猫的应用没在跑',
      bridgePort: '桥接端口',
      bridgeDetail: '契约',
      bridgeError: '原因',
      identityTitle: '身份',
      identityRegistered: '已在猫的注册表里',
      identityMissing: '尚未注册（保存后自动注册）',
      agentsTitle: '已注册的 agent',
      me: '本插件',
      settingsTitle: '设置',
      settingAutoAnnounce: '挂载时自动播报「桥接就绪」',
      settingAgentId: '身份 ID（字母数字.-，≤64）',
      settingAgentName: '显示名称（≤24）',
      settingAgentBadge: '徽标（≤2 字符）',
      settingPort: '端口（1024-65535）',
      settingTools: '模型可用的工具',
      toolTask: 'lingxi_task · 报任务与心情',
      toolSay: 'lingxi_say · 让猫说话',
      toolReact: 'lingxi_react · 表情动作',
      toolState: 'lingxi_state · 读猫状态',
      toolRemember: 'lingxi_remember · 记住事实',
      save: '保存',
      saving: '保存中…',
      saved: '已保存到 ~/.lingxi/pets-settings.json',
      savedIgnored: '已保存；以下字段不合法被忽略：',
      dirtyHint: '有未保存的修改',
      revert: '还原',
      test: '测试：让猫说一句话',
      testing: '测试中…',
      testOk: '猫已收到',
      testFailed: '测试失败：',
      loadError: '读取失败',
      loadIgnored: '载入时被忽略的字段：',
      loadFileError: '设置文件问题：',
      reload: '刷新',
      tasksTitle: 'dsh 正在运行的任务',
      noTasks: '现在没有在跑的任务',
      watchOff: '任务监听未启动',
      stateRunning: '运行中',
      stateNeedsApproval: '等待授权',
      stateNeedsInput: '等待回答',
      stateBlocked: '被挡',
      stateFailed: '失败',
      stateCompleted: '完成',
      stateCancelled: '已取消',
      remindersTitle: '定时提醒（猫替你记）',
      noReminders: '还没有声明提醒',
      remEvery: '每',
      remEveryUnit: '分钟',
      remOnce: '一次性',
      remEnabled: '启用',
      remPaused: '已停用',
      remAdd: '添加提醒',
      remTitleField: '标题',
      remDetailField: '详情（可选）',
      remMinutesField: '每几分钟（≥5，留空=一次性）',
      remDelete: '删除',
      syncReminders: '同步到宠物',
      syncing: '同步中…',
      syncStats: '新发 {posted} · 撤销 {removed} · 保留 {kept}',
      remHint: '由宠物应用计时并弹出；声明保存在设置里，改动保存后自动同步。',
    };

    const en = {
      localeCode: 'en',
      tab: 'Lingxi',
      subtitle: 'Lingxi · desktop cat',
      loading: 'Reading bridge status…',
      connectionNotReady: 'Connection service is not ready',
      callFailed: 'Call failed',
      unexpectedResponse: 'Unexpected RPC response',
      bridgeUp: 'Bridge online',
      bridgeDown: 'Bridge offline - the pet app is not running',
      bridgePort: 'Bridge port',
      bridgeDetail: 'Contract',
      bridgeError: 'Reason',
      identityTitle: 'Identity',
      identityRegistered: 'Registered in the pet app',
      identityMissing: 'Not registered yet (saving registers it)',
      agentsTitle: 'Registered agents',
      me: 'this plugin',
      settingsTitle: 'Settings',
      settingAutoAnnounce: 'Announce "bridge ready" on mount',
      settingAgentId: 'Agent ID ([A-Za-z0-9._-], max 64)',
      settingAgentName: 'Display name (max 24)',
      settingAgentBadge: 'Badge (max 2 chars)',
      settingPort: 'Port (1024-65535)',
      settingTools: 'Tools visible to the model',
      toolTask: 'lingxi_task · report tasks & mood',
      toolSay: 'lingxi_say · cat speaks',
      toolReact: 'lingxi_react · expression & action',
      toolState: 'lingxi_state · read the cat',
      toolRemember: 'lingxi_remember · remember a fact',
      save: 'Save',
      saving: 'Saving…',
      saved: 'Saved to ~/.lingxi/pets-settings.json',
      savedIgnored: 'Saved; invalid fields ignored:',
      dirtyHint: 'Unsaved changes',
      revert: 'Revert',
      test: 'Test: make the cat speak',
      testing: 'Testing…',
      testOk: 'The cat heard you',
      testFailed: 'Test failed: ',
      loadError: 'Load failed',
      loadIgnored: 'Fields ignored on load:',
      loadFileError: 'Settings file problem: ',
      reload: 'Reload',
      tasksTitle: 'dsh tasks running now',
      noTasks: 'Nothing is running right now',
      watchOff: 'Task watch is not started',
      stateRunning: 'running',
      stateNeedsApproval: 'needs approval',
      stateNeedsInput: 'needs your answer',
      stateBlocked: 'blocked',
      stateFailed: 'failed',
      stateCompleted: 'completed',
      stateCancelled: 'cancelled',
      remindersTitle: 'Standing reminders (the cat remembers)',
      noReminders: 'No reminders declared yet',
      remEvery: 'every',
      remEveryUnit: 'min',
      remOnce: 'one-shot',
      remEnabled: 'enabled',
      remPaused: 'paused',
      remAdd: 'Add a reminder',
      remTitleField: 'Title',
      remDetailField: 'Detail (optional)',
      remMinutesField: 'Every N minutes (>=5, empty = one-shot)',
      remDelete: 'Delete',
      syncReminders: 'Sync to the pet',
      syncing: 'Syncing…',
      syncStats: 'posted {posted} · removed {removed} · kept {kept}',
      remHint: 'The pet app owns the clock and pops them; declarations live in settings and sync on save.',
    };

    const DICTS = { zh, en };
    const LOCALE_ORDER = ['zh', 'en'];

    /** Fallback lookup when the host locale service predates injection. */
    function fallbackT() {
      return (key) => {
        for (const code of LOCALE_ORDER) {
          if (key in DICTS[code]) return DICTS[code][key];
        }
        return key;
      };
    }

    let connectionSvc = null;

    /**
     * Invoke one host `lingxi/<method>` Remote endpoint. Returns the business
     * value; throws on transport/gateway failure (business `{ error }` shapes
     * stay return values).
     */
    const lingxiCall = async (t, method, request) => {
      if (connectionSvc === null) throw new Error(t('connectionNotReady'));
      const envelope = await connectionSvc.rpc.call('/api', 'lingxi/' + method, {
        args: { request: request === undefined ? null : request },
      });
      if (envelope !== null && typeof envelope === 'object' && envelope.ok === false) {
        const message = envelope.error && envelope.error.message ? envelope.error.message : t('callFailed');
        throw new Error(message);
      }
      if (envelope !== null && typeof envelope === 'object' && envelope.ok === true) return envelope.value;
      throw new Error(t('unexpectedResponse'));
    };

    const CSS = [
      '.lx-page{max-width:760px;margin:0 auto;padding:4px 2px 24px;font-size:13.5px;color:var(--dsw-alias-label-primary)}',
      '.lx-sub{color:var(--dsw-alias-label-secondary);font-size:12.5px;margin:2px 0 14px}',
      '.lx-hero{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}',
      '.lx-dot{width:9px;height:9px;border-radius:99px;flex:none}',
      '.lx-dot-up{background:var(--dsw-alias-state-success-primary)}',
      '.lx-dot-down{background:var(--dsw-alias-state-error-primary)}',
      '.lx-hero-title{font-weight:600}',
      '.lx-hero-detail{color:var(--dsw-alias-label-secondary);font-size:12px;margin-left:auto;text-align:right;overflow-wrap:anywhere;max-width:46%}',
      '.lx-card{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;margin-top:12px;background:var(--dsw-alias-bg-base)}',
      '.lx-card-title{font-weight:600;margin-bottom:8px}',
      '.lx-row{display:flex;align-items:center;gap:8px;padding:4px 0;flex-wrap:wrap}',
      '.lx-row-label{width:230px;flex:none;color:var(--dsw-alias-label-secondary)}',
      '.lx-input{height:28px;padding:0 8px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:12.5px;width:180px}',
      '.lx-chip{font-size:11px;padding:1px 8px;border-radius:99px;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary)}',
      '.lx-chip-ok{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}',
      '.lx-chip-me{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}',
      '.lx-badge{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 5px;border-radius:7px;color:#fff;font-size:10.5px;font-weight:600}',
      '.lx-agent{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:99px;font-size:12px}',
      '.lx-check{display:flex;align-items:center;gap:7px;padding:3px 0;cursor:pointer}',
      '.lx-actions{display:flex;gap:8px;align-items:center;margin-top:14px;flex-wrap:wrap}',
      '.lx-btn{height:30px;padding:0 14px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;font-size:13px}',
      '.lx-btn:hover:enabled{border-color:var(--dsw-alias-brand-primary)}',
      '.lx-btn:disabled{opacity:.45;cursor:default}',
      '.lx-btn-primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-label-primary-foreground)}',
      '.lx-msg{font-size:12.5px;color:var(--dsw-alias-label-secondary)}',
      '.lx-msg-ok{color:var(--dsw-alias-state-success-primary)}',
      '.lx-msg-error{color:var(--dsw-alias-state-error-primary)}',
      '.lx-error{color:var(--dsw-alias-state-error-primary);font-size:12.5px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 12px;margin-top:12px}',
      '.lx-note{color:var(--dsw-alias-label-secondary);font-size:12px;margin-top:8px;line-height:1.5}',
      '.lx-loading{color:var(--dsw-alias-label-secondary);padding:16px 2px}',
    ].join('\n');
    const cssTag = 'dsh-lingxi/styles';
    if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=' + JSON.stringify(cssTag) + ']') === null) {
      const tag = document.createElement('style');
      tag.dataset.plugin = 'dsh-lingxi';
      tag.dataset.pluginCss = cssTag;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }

    /** The settings page. All state is local; only 保存 writes. */
    function LingxiPage(props) {
      const t = React.useMemo(() => (typeof props.t === 'function' ? props.t : fallbackT()), [props.t]);
      const [loading, setLoading] = React.useState(true);
      const [status, setStatus] = React.useState(null);
      const [loadError, setLoadError] = React.useState('');
      const [draft, setDraft] = React.useState(null);
      const [saving, setSaving] = React.useState(false);
      const [saveMsg, setSaveMsg] = React.useState(null);
      const [testing, setTesting] = React.useState(false);
      const [testMsg, setTestMsg] = React.useState(null);
      const [tasks, setTasks] = React.useState(null);
      const [reminderView, setReminderView] = React.useState(null);
      const [syncing, setSyncing] = React.useState(false);
      const [newReminder, setNewReminder] = React.useState({ title: '', detail: '', everyMinutes: '' });

      const load = React.useCallback(async () => {
        setLoading(true);
        setLoadError('');
        try {
          const [data, taskView, reminderData] = await Promise.all([
            lingxiCall(t, 'status'),
            lingxiCall(t, 'tasks').catch(() => null),
            lingxiCall(t, 'reminders').catch(() => null),
          ]);
          setStatus(data);
          setDraft(data.settings);
          setTasks(taskView);
          setReminderView(reminderData);
        } catch (error) {
          setLoadError(error instanceof Error ? error.message : String(error));
        } finally {
          setLoading(false);
        }
      }, [t]);

      React.useEffect(() => { void load(); }, [load]);

      const dirty = status !== null && draft !== null && JSON.stringify(draft) !== JSON.stringify(status.settings);
      const patch = (change) => setDraft((prev) => ({ ...prev, ...change }));
      const patchTool = (tool, enabledValue) =>
        setDraft((prev) => ({ ...prev, tools: { ...prev.tools, [tool]: enabledValue } }));

      const save = async () => {
        setSaving(true);
        setSaveMsg(null);
        try {
          const result = await lingxiCall(t, 'setSettings', draft);
          setStatus((prev) => ({ ...prev, settings: result.settings }));
          setDraft(result.settings);
          setSaveMsg(result.ignored && result.ignored.length > 0
            ? { kind: 'warn', text: t('savedIgnored') + ' ' + result.ignored.join(', ') }
            : { kind: 'ok', text: t('saved') });
        } catch (error) {
          setSaveMsg({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
        } finally {
          setSaving(false);
        }
      };

      const test = async () => {
        setTesting(true);
        setTestMsg(null);
        try {
          const result = await lingxiCall(t, 'testSay', { text: '设置页测试：我在呢～' });
          setTestMsg(result && result.ok
            ? { kind: 'ok', text: t('testOk') }
            : { kind: 'error', text: t('testFailed') + (result && result.error ? result.error : t('callFailed')) });
        } catch (error) {
          setTestMsg({ kind: 'error', text: t('testFailed') + (error instanceof Error ? error.message : String(error)) });
        } finally {
          setTesting(false);
        }
      };

      if (loading) return h('div', { className: 'lx-loading' }, t('loading'));
      if (loadError !== '') {
        return h('div', { className: 'lx-page' },
          h('div', { className: 'lx-error' }, t('loadError') + '：' + loadError),
          h('div', { className: 'lx-actions' },
            h('button', { className: 'lx-btn', onClick: () => { void load(); } }, t('reload'))));
      }

      const up = status.bridge.running === true;
      const msgClass = (msg) => msg.kind === 'ok' ? 'lx-msg lx-msg-ok' : msg.kind === 'error' ? 'lx-msg lx-msg-error' : 'lx-msg';
      const badgeStyle = (color) => ({ backgroundColor: /^#[0-9a-fA-F]{6}$/.test(String(color)) ? color : 'var(--dsw-alias-brand-primary)' });
      const loadInfo = status.loadInfo;

      return h('div', { className: 'lx-page' },
        // ---- status hero: the bridge's own /health answer ----
        h('div', { className: 'lx-hero' },
          h('span', { className: 'lx-dot ' + (up ? 'lx-dot-up' : 'lx-dot-down') }),
          h('span', { className: 'lx-hero-title' }, up ? t('bridgeUp') : t('bridgeDown')),
          h('span', { className: 'lx-hero-detail' },
            up
              ? (status.bridge.detail ? t('bridgeDetail') + '：' + status.bridge.detail : status.bridge.baseUrl)
              : (status.bridge.error ? t('bridgeError') + '：' + status.bridge.error : status.bridge.baseUrl))),
        h('div', { className: 'lx-sub' }, t('subtitle') + ' · ' + status.bridge.baseUrl),

        // ---- identity: /agents as the pet app reports it ----
        h('div', { className: 'lx-card' },
          h('div', { className: 'lx-card-title' }, t('identityTitle')),
          h('div', { className: 'lx-row' },
            h('span', { className: 'lx-chip' + (status.meRegistered ? ' lx-chip-ok' : '') },
              status.settings.agentId + ' · ' + (status.meRegistered ? t('identityRegistered') : t('identityMissing')))),
          status.agents.length > 0
            ? h('div', { className: 'lx-row' },
                h('span', { className: 'lx-row-label' }, t('agentsTitle')),
                status.agents.map((agent, index) => h('span', { key: agent.id + '-' + index, className: 'lx-agent' },
                  h('span', { className: 'lx-badge', style: badgeStyle(agent.color) }, agent.badge || agent.id.slice(0, 2)),
                  agent.name,
                  agent.id === status.settings.agentId ? h('span', { className: 'lx-chip lx-chip-me' }, t('me')) : null)))
            : null),

        // ---- the settings item itself ----
        h('div', { className: 'lx-card' },
          h('div', { className: 'lx-card-title' }, t('settingsTitle')),
          h('label', { className: 'lx-check' },
            h('input', { type: 'checkbox', checked: draft.autoAnnounce === true, onChange: (e) => patch({ autoAnnounce: e.target.checked }) }),
            t('settingAutoAnnounce')),
          h('div', { className: 'lx-row' },
            h('span', { className: 'lx-row-label' }, t('settingAgentId')),
            h('input', { className: 'lx-input', value: draft.agentId, onChange: (e) => patch({ agentId: e.target.value }) })),
          h('div', { className: 'lx-row' },
            h('span', { className: 'lx-row-label' }, t('settingAgentName')),
            h('input', { className: 'lx-input', value: draft.agentName, onChange: (e) => patch({ agentName: e.target.value }) })),
          h('div', { className: 'lx-row' },
            h('span', { className: 'lx-row-label' }, t('settingAgentBadge')),
            h('input', { className: 'lx-input', value: draft.agentBadge, maxLength: 2, onChange: (e) => patch({ agentBadge: e.target.value }) })),
          h('div', { className: 'lx-row' },
            h('span', { className: 'lx-row-label' }, t('settingPort')),
            h('input', { className: 'lx-input', type: 'number', min: 1024, max: 65535, value: draft.port, onChange: (e) => patch({ port: Number(e.target.value) }) })),
          h('div', { className: 'lx-row' }, h('span', { className: 'lx-row-label' }, t('settingTools'))),
          ['task', 'say', 'react', 'state', 'remember'].map((tool) =>
            h('label', { key: tool, className: 'lx-check', style: { paddingLeft: '230px' } },
              h('input', { type: 'checkbox', checked: draft.tools[tool] === true, onChange: (e) => patchTool(tool, e.target.checked) }),
              t('tool' + tool.charAt(0).toUpperCase() + tool.slice(1))))),

        // ---- requirement 1, visible: what dsh is running right now ----
        h('div', { className: 'lx-card' },
          h('div', { className: 'lx-card-title' }, t('tasksTitle')),
          tasks === null
            ? h('div', { className: 'lx-note' }, t('watchOff'))
            : tasks.tasks.length === 0
              ? h('div', { className: 'lx-note' }, t('noTasks'))
              : tasks.tasks.map((task) => h('div', { key: task.taskId, className: 'lx-row' },
                  h('span', { className: 'lx-chip' + (task.state === 'needs_approval' || task.state === 'needs_input' ? ' lx-chip-ok' : '') },
                    t('state' + task.state.charAt(0).toUpperCase() + task.state.slice(1))),
                  h('span', {}, task.title),
                  h('span', { className: 'lx-msg' }, task.source)))),
        h('div', { className: 'lx-sub' }),

        // ---- requirement 3, visible: declared reminders + the pet's list ----
        h('div', { className: 'lx-card' },
          h('div', { className: 'lx-card-title' }, t('remindersTitle')),
          (draft.reminders ?? []).length === 0
            ? h('div', { className: 'lx-note' }, t('noReminders'))
            : (draft.reminders ?? []).map((entry, index) => h('div', { key: entry.id, className: 'lx-row' },
                h('input', { type: 'checkbox', checked: entry.enabled !== false, onChange: (e) => {
                  const next = [...draft.reminders];
                  next[index] = { ...entry, enabled: e.target.checked };
                  patch({ reminders: next });
                } }),
                h('span', {}, entry.title + (entry.detail ? ' — ' + entry.detail : '')),
                h('span', { className: 'lx-chip' },
                  entry.everyMinutes ? t('remEvery') + ' ' + entry.everyMinutes + ' ' + t('remEveryUnit') : t('remOnce')),
                h('button', { className: 'lx-btn', onClick: () => patch({ reminders: draft.reminders.filter((_, i) => i !== index) }) },
                  t('remDelete')))),
          h('div', { className: 'lx-row', style: { marginTop: '8px' } },
            h('input', { className: 'lx-input', placeholder: t('remTitleField'), value: newReminder.title, onChange: (e) => setNewReminder((p) => ({ ...p, title: e.target.value })) }),
            h('input', { className: 'lx-input', placeholder: t('remDetailField'), value: newReminder.detail, onChange: (e) => setNewReminder((p) => ({ ...p, detail: e.target.value })) }),
            h('input', { className: 'lx-input', type: 'number', min: 5, placeholder: t('remMinutesField'), value: newReminder.everyMinutes, onChange: (e) => setNewReminder((p) => ({ ...p, everyMinutes: e.target.value })) }),
            h('button', {
              className: 'lx-btn',
              disabled: !newReminder.title.trim(),
              onClick: () => {
                const id = 'rem-' + Date.now().toString(36);
                const every = Number(newReminder.everyMinutes);
                const entry = { id, title: newReminder.title.trim(), detail: newReminder.detail.trim(), enabled: true };
                if (Number.isFinite(every) && every > 0) entry.everyMinutes = every;
                patch({ reminders: [...(draft.reminders ?? []), entry] });
                setNewReminder({ title: '', detail: '', everyMinutes: '' });
              },
            }, t('remAdd'))),
          h('div', { className: 'lx-actions' },
            h('button', { className: 'lx-btn', onClick: async () => {
              setSyncing(true);
              try {
                const result = await lingxiCall(t, 'syncReminders');
                const fresh = await lingxiCall(t, 'reminders');
                setReminderView(fresh);
                setSaveMsg({ kind: 'ok', text: t('syncStats').replace('{posted}', String(result.posted)).replace('{removed}', String(result.removed)).replace('{kept}', String(result.kept)) });
              } catch (error) {
                setSaveMsg({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
              } finally {
                setSyncing(false);
              }
            }, disabled: syncing }, syncing ? t('syncing') : t('syncReminders')),
            reminderView !== null && reminderView.lastSync && reminderView.lastSync.at
              ? h('span', { className: 'lx-msg' },
                  t('syncStats').replace('{posted}', String(reminderView.lastSync.posted ?? 0)).replace('{removed}', String(reminderView.lastSync.removed ?? 0)).replace('{kept}', String(reminderView.lastSync.kept ?? 0)))
              : null),
          h('div', { className: 'lx-note' }, t('remHint'))),

        // ---- actions ----
        h('div', { className: 'lx-actions' },
          h('button', { className: 'lx-btn', onClick: () => { void test(); }, disabled: testing }, testing ? t('testing') : t('test')),
          h('button', { className: 'lx-btn lx-btn-primary', onClick: () => { void save(); }, disabled: saving || !dirty }, saving ? t('saving') : t('save')),
          h('button', { className: 'lx-btn', onClick: () => setDraft(status.settings), disabled: !dirty }, t('revert')),
          dirty ? h('span', { className: 'lx-msg' }, t('dirtyHint')) : null,
          saveMsg ? h('span', { className: msgClass(saveMsg) }, saveMsg.text) : null,
          testMsg ? h('span', { className: msgClass(testMsg) }, testMsg.text) : null),

        // ---- load notes: what the validator did to the file on mount ----
        loadInfo && (loadInfo.error || (loadInfo.ignored && loadInfo.ignored.length > 0))
          ? h('div', { className: 'lx-note' },
              loadInfo.error ? h('div', {}, t('loadFileError') + loadInfo.error) : null,
              loadInfo.ignored && loadInfo.ignored.length > 0 ? h('div', {}, t('loadIgnored') + loadInfo.ignored.join(', ')) : null)
          : null);
    }

    const inject = ['connection', 'slots', 'locale'];

    function apply(c) {
      connectionSvc = c.get('connection');
      const slots = c.get('slots');
      if (slots === undefined) return;
      const locale = c.get('locale');
      if (locale !== undefined && typeof locale.register === 'function') {
        c.effect(() => locale.register(NS, DICTS), 'lingxi: dictionaries');
      }
      const bound = (locale !== undefined && typeof locale.bind === 'function') ? locale.bind(NS) : null;
      const label = bound === null ? fallbackT() : bound;
      c.effect(() => slots.inject('settings.section', () => slots.register(
        { name: 'settings.section', id: 'lingxi', order: 31, label: () => label('tab'), locale: NS },
        (props) => h(LingxiPage, { close: props.close, t: props.t === undefined ? bound : props.t }),
      )), 'lingxi: settings section');
    }

    exports.apply = apply;
    exports.inject = inject;
    exports.NS = NS;
    // Exported for the bundle test: dictionary parity is the only way to catch
    // a key that was translated in one language and forgotten in the other.
    exports.locales = DICTS;
    return module.exports;
  },
});
