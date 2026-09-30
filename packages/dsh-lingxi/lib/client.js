/**
 * dsh-lingxi - client half (web).
 *
 * Registers the "灵犀" settings page (settings.section). Talks to the host
 * `lingxi` Remote namespace through the connection RPC carrier.
 *
 * Settings content plan (2026-09-30, from the shared settings model in
 * pet-contract/settings.js): only what the plugin owns, each field with the
 * control its nature calls for - the port is a troubleshooting knob (input),
 * the agent id is a stable technical identity whose edit would orphan the
 * old registration in the pet app (read-only display), the display name is
 * real user config (an input), and the badge is NOT exposed: the plugin
 * always registers its own logo (dsh-logo.js) and the pet app shows a badge
 * only for agents without one, so editing it could have no visible effect.
 * Announce and the five tools are toggles (row
 * checkbox + pills), and the per-state notify loudness table - a real
 * setting the file has always carried - finally gets a segmented selector
 * per task state. Live monitoring (task watch, ambient activity) and the
 * pet registry itself are the app's business, not this page.
 *
 * Layout is left-right: label on the left, control on the right, hairline
 * separators between rows (the 通用设置 grammar: 720px column, 18px title,
 * uppercase group heads). Colors come exclusively from the host's
 * `--dsw-alias-*` tokens, which flip under body[data-ds-dark-theme] - dark
 * and light both work with zero literals. Two token traps (per
 * dsh-recovery): text on a brand fill must be `label-primary-foreground`,
 * never literal white; and no native selects - their chrome ignores the app
 * theme, so the notify levels are token-styled segmented buttons.
 *
 * The settings item is the plugin's own contract, persisted to the shared
 * ~/.lingxi/pets-settings.json through the host. Opening the page never
 * writes; 保存 is the only write, and the result reports exactly which
 * fields the validator ignored. Localization mirrors the doctor page: host
 * `locale` service with a fallback lookup.
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

    /** The task states the notify table can grade, in display order. */
    const NOTIFY_STATES = ['needs_approval', 'needs_input', 'blocked', 'failed', 'running', 'queued', 'completed', 'cancelled'];
    /** The four loudness levels the pet app contract understands. */
    const NOTIFY_LEVELS = ['silent', 'status', 'report', 'alert'];

    const zh = {
      localeCode: 'zh',
      tab: '灵犀',
      intro: '让桌宠猫知道 DSH 在忙什么：桥接连接、插件身份、行为与通知、定时提醒。',
      loading: '正在读取设置…',
      connectionNotReady: '连接服务尚未就绪',
      callFailed: '调用失败',
      unexpectedResponse: '意外的 RPC 响应',
      loadError: '读取失败',
      reload: '重试',
      loadIgnored: '载入时被忽略的字段：',
      loadFileError: '设置文件问题：',
      groupConn: '连接',
      groupIdentity: '身份',
      groupBehavior: '行为',
      groupNotify: '通知',
      groupReminders: '定时提醒',
      bridgeUp: '桥接在线',
      bridgeDown: '桥接不在线——猫的应用没在跑',
      bridgeError: '原因',
      connTest: '联通性测试',
      connTesting: '测试中…',
      connFailed: '联通性测试失败：',
      identityRegistered: '已在猫的注册表里',
      identityMissing: '尚未注册（保存后自动注册）',
      contractOk: '契约 v{version} · 词表一致',
      contractDrift: '契约词表漂移：{lists}',
      settingPort: '端口（1024-65535）',
      settingAgentId: '身份 ID',
      agentIdHint: '只读 · 猫应用中的注册标识',
      settingAgentName: '显示名称',
      settingAutoAnnounce: '挂载时自动播报「桥接就绪」',
      settingTools: '模型可用的工具',
      toolTask: '任务',
      toolSay: '说话',
      toolReact: '表情',
      toolState: '状态',
      toolRemember: '记忆',
      notifyHint: '每个任务状态用多大声量提醒你；静默即不打扰。',
      stateNeedsApproval: '等待授权',
      stateNeedsInput: '等待回答',
      stateBlocked: '被挡',
      stateFailed: '失败',
      stateRunning: '运行中',
      stateQueued: '排队中',
      stateCompleted: '完成',
      stateCancelled: '已取消',
      levelSilent: '静默',
      levelStatus: '状态',
      levelReport: '汇报',
      levelAlert: '打断',
      save: '保存',
      saving: '保存中…',
      saved: '已保存到 ~/.lingxi/pets-settings.json',
      savedIgnored: '已保存；以下字段不合法被忽略：',
      dirtyHint: '有未保存的修改',
      revert: '还原',
      noReminders: '还没有声明提醒',
      remEvery: '每',
      remEveryUnit: '分钟',
      remOnce: '一次性',
      remAdd: '添加提醒',
      remTitleField: '标题',
      remDetailField: '详情（可选）',
      remMinutesField: '每几分钟（≥5，留空=一次性）',
      remDelete: '删除',
      syncReminders: '同步到宠物',
      syncing: '同步中…',
      syncStats: '新发 {posted} · 撤销 {removed} · 保留 {kept}',
      syncBlocked: '灵犀拒绝了写入：{reason}',
      remHint: '由宠物应用计时并弹出；声明保存在设置里，改动保存后自动同步。',
    };

    const en = {
      localeCode: 'en',
      tab: 'Lingxi',
      intro: 'Keep the desktop cat in the loop: bridge connection, plugin identity, behavior and notifications, standing reminders.',
      loading: 'Reading settings…',
      connectionNotReady: 'Connection service is not ready',
      callFailed: 'Call failed',
      unexpectedResponse: 'Unexpected RPC response',
      loadError: 'Load failed',
      reload: 'Retry',
      loadIgnored: 'Fields ignored on load:',
      loadFileError: 'Settings file problem: ',
      groupConn: 'Connection',
      groupIdentity: 'Identity',
      groupBehavior: 'Behavior',
      groupNotify: 'Notifications',
      groupReminders: 'Standing reminders',
      bridgeUp: 'Bridge online',
      bridgeDown: 'Bridge offline - the pet app is not running',
      bridgeError: 'Reason',
      connTest: 'Connectivity test',
      connTesting: 'Testing…',
      connFailed: 'Connectivity test failed: ',
      identityRegistered: 'Registered in the pet app',
      identityMissing: 'Not registered yet (saving registers it)',
      contractOk: 'contract v{version} · vocabulary in sync',
      contractDrift: 'contract vocabulary drift: {lists}',
      settingPort: 'Port (1024-65535)',
      settingAgentId: 'Agent ID',
      agentIdHint: 'read-only · the identity registered in the pet app',
      settingAgentName: 'Display name',
      settingAutoAnnounce: 'Announce "bridge ready" on mount',
      settingTools: 'Tools visible to the model',
      toolTask: 'task',
      toolSay: 'say',
      toolReact: 'react',
      toolState: 'state',
      toolRemember: 'remember',
      notifyHint: 'How loudly each task state announces itself; silent stays quiet.',
      stateNeedsApproval: 'needs approval',
      stateNeedsInput: 'needs your answer',
      stateBlocked: 'blocked',
      stateFailed: 'failed',
      stateRunning: 'running',
      stateQueued: 'queued',
      stateCompleted: 'completed',
      stateCancelled: 'cancelled',
      levelSilent: 'silent',
      levelStatus: 'status',
      levelReport: 'report',
      levelAlert: 'alert',
      save: 'Save',
      saving: 'Saving…',
      saved: 'Saved to ~/.lingxi/pets-settings.json',
      savedIgnored: 'Saved; invalid fields ignored:',
      dirtyHint: 'Unsaved changes',
      revert: 'Revert',
      noReminders: 'No reminders declared yet',
      remEvery: 'every',
      remEveryUnit: 'min',
      remOnce: 'one-shot',
      remAdd: 'Add a reminder',
      remTitleField: 'Title',
      remDetailField: 'Detail (optional)',
      remMinutesField: 'Every N minutes (>=5, empty = one-shot)',
      remDelete: 'Delete',
      syncReminders: 'Sync to the pet',
      syncing: 'Syncing…',
      syncStats: 'posted {posted} · removed {removed} · kept {kept}',
      syncBlocked: 'The pet refused the write: {reason}',
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

    /**
     * Left-right settings grammar on the shared `--dsw-alias-*` tokens: rows
     * are label-left / control-right with hairline separators, groups carry
     * uppercase heads, the column is 720px. Every color is a theme token, so
     * dark and light both fall out of body[data-ds-dark-theme]; the filled
     * surfaces (selected pills, segmented active, primary button) pair
     * brand-primary with label-primary-foreground, which flips with it, and
     * hover is scoped to unselected controls so it can never dim a selected
     * label (`.lx-pill:hover:enabled` outranked `[aria-pressed=true]`).
     */
    const CSS = [
      '.lx-page{max-width:720px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:12px;display:flex;padding:4px 2px 24px;margin:0 auto}',
      '.lx-title{margin:0;font-size:18px;font-weight:600}',
      '.lx-intro{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px}',
      '.lx-group{flex-direction:column;gap:10px;display:flex}',
      '.lx-group+.lx-group{margin-top:20px}',
      '.lx-group-head{letter-spacing:.06em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;font-weight:600}',
      '.lx-status{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
      '.lx-status-url{color:var(--dsw-alias-label-tertiary);font-size:12px;overflow-wrap:anywhere}',
      '.lx-status .lx-btn{margin-left:auto}',
      '.lx-dot{width:9px;height:9px;border-radius:99px;flex:none}',
      '.lx-dot-up{background:var(--dsw-alias-state-success-primary)}',
      '.lx-dot-down{background:var(--dsw-alias-state-error-primary)}',
      '.lx-table{flex-direction:column;display:flex}',
      '.lx-row{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:38px;padding:7px 0}',
      '.lx-row+.lx-row{border-top:.5px solid var(--dsw-alias-border-l2)}',
      '.lx-row-label{font-size:13px;flex-direction:column;gap:2px;display:flex;text-align:left}',
      '.lx-row-hint{font-size:11px;color:var(--dsw-alias-label-tertiary)}',
      '.lx-mono{font-family:var(--dsw-font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12.5px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;text-align:right}',
      '.lx-input{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l4);font:inherit;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:10px;padding:8px 12px;font-size:13px}',
      '.lx-input:focus{border-color:var(--dsw-alias-brand-primary);outline:none}',
      '.lx-input::placeholder{color:var(--dsw-alias-label-dimmed)}',
      '.lx-w-name{width:220px}',
      '.lx-w-s{width:120px}',
      '.lx-check{display:flex;align-items:center;font-size:13px;cursor:pointer}',
      '.lx-check input{accent-color:var(--dsw-alias-brand-primary);width:15px;height:15px;margin:0}',
      '.lx-pills{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}',
      '.lx-pill{appearance:none;font:inherit;font-size:12px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:.5px solid var(--dsw-alias-border-l4);border-radius:99px;padding:5px 12px}',
      '.lx-pill[aria-pressed=true]{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-label-primary-foreground)}',
      '.lx-pill:hover:enabled:not([aria-pressed=true]){background:var(--dsw-alias-interactive-bg-hover)}',
      '.lx-pill:disabled{opacity:.5;cursor:default}',
      '.lx-pill:focus-visible,.lx-seg button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-1px}',
      '.lx-seg{display:inline-flex;border:.5px solid var(--dsw-alias-border-l4);border-radius:9px;overflow:hidden}',
      '.lx-seg button{appearance:none;font:inherit;font-size:12px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;padding:5px 10px}',
      '.lx-seg button+button{border-left:.5px solid var(--dsw-alias-border-l4)}',
      '.lx-seg button[aria-pressed=true]{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground)}',
      '.lx-seg button:hover:enabled:not([aria-pressed=true]){background:var(--dsw-alias-interactive-bg-hover)}',
      '.lx-rem-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
      '.lx-rem-row .lx-input{flex:1 1 150px;width:auto}',
      '.lx-rem-row .lx-icon-btn{margin-left:auto}',
      '.lx-icon-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex:none;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:7px;padding:0}',
      '.lx-icon-btn:hover:enabled{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}',
      '.lx-icon-btn:disabled{opacity:.4;cursor:default}',
      '.lx-icon-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-1px}',
      '.lx-add-btn{color:var(--dsw-alias-brand-primary)}',
      '.lx-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
      '.lx-btn{appearance:none;font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:7px;padding:5px 8px;font-size:12.5px}',
      '.lx-btn:hover:enabled{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}',
      '.lx-btn:disabled{opacity:.5;cursor:default}',
      '.lx-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-1px}',
      '.lx-btn-primary{box-sizing:border-box;background:var(--dsw-alias-brand-primary);border:none;border-radius:10px;color:var(--dsw-alias-label-primary-foreground);cursor:pointer;font:inherit;font-size:13px;padding:8px 16px}',
      '.lx-btn-primary:hover:enabled{filter:brightness(1.06)}',
      '.lx-btn-primary:disabled{opacity:.5;cursor:default}',
      '.lx-line{display:flex;align-items:center;gap:8px;font-size:12.5px}',
      '.lx-msg{font-size:12.5px;color:var(--dsw-alias-label-secondary)}',
      '.lx-msg-ok{color:var(--dsw-alias-state-success-primary)}',
      '.lx-msg-error{color:var(--dsw-alias-state-error-primary)}',
      '.lx-error{color:var(--dsw-alias-state-error-primary);margin:0;font-size:12px}',
      '.lx-note{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}',
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

    /** Inline stroke icons; currentColor keeps them theme-adaptive, and
     * aria-hidden keeps them decorative - the button carries the label. */
    function plusIcon() {
      return h('svg', { width: 14, height: 14, viewBox: '0 0 14 14', fill: 'none', 'aria-hidden': 'true' },
        h('path', { d: 'M7 2.5v9M2.5 7h9', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
    }
    function closeIcon() {
      return h('svg', { width: 14, height: 14, viewBox: '0 0 14 14', fill: 'none', 'aria-hidden': 'true' },
        h('path', { d: 'M3.5 3.5l7 7M10.5 3.5l-7 7', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
    }

    /** One settings row: label (with optional hint) left, control right. */
    function row(label, hint, control, key) {
      return h('div', { key: key, className: 'lx-row' },
        h('span', { className: 'lx-row-label' },
          label,
          hint ? h('span', { className: 'lx-row-hint' }, hint) : null),
        control);
    }

    /** The connectivity answer rendered as plain lines. */
    function connResult(t, data) {
      if (data === null || data === undefined) return null;
      if (data.error !== undefined) {
        return h('div', { className: 'lx-group' },
          h('div', { className: 'lx-line' },
            h('span', { className: 'lx-msg-error' }, t('connFailed') + data.error)));
      }
      const up = data.bridge !== undefined && data.bridge !== null && data.bridge.running === true;
      const rows = [
        h('div', { className: 'lx-line' },
          h('span', { className: 'lx-dot ' + (up ? 'lx-dot-up' : 'lx-dot-down') }),
          h('span', { className: up ? 'lx-msg-ok' : 'lx-msg-error' },
            up ? t('bridgeUp') : t('bridgeDown') + (data.bridge && data.bridge.error ? ' — ' + t('bridgeError') + '：' + data.bridge.error : ''))),
      ];
      const registered = data.meRegistered === true;
      rows.push(h('div', { className: 'lx-line' },
        h('span', { className: registered ? 'lx-msg-ok' : 'lx-msg' },
          registered ? t('identityRegistered') : t('identityMissing'))));
      if (data.contract !== undefined && data.contract !== null) {
        const drifted = Array.isArray(data.contract.drift) && data.contract.drift.length > 0;
        rows.push(h('div', { className: 'lx-line' },
          h('span', { className: drifted ? 'lx-msg-error' : 'lx-msg-ok' },
            drifted
              ? t('contractDrift').replace('{lists}', data.contract.drift.join(', '))
              : t('contractOk').replace('{version}', String(data.contract.schemaVersion === null || data.contract.schemaVersion === undefined ? '?' : data.contract.schemaVersion)))));
      }
      return h('div', { className: 'lx-group' }, rows);
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
      const [conn, setConn] = React.useState(null);
      const [syncing, setSyncing] = React.useState(false);
      const [syncMsg, setSyncMsg] = React.useState(null);
      const [newReminder, setNewReminder] = React.useState({ title: '', detail: '', everyMinutes: '' });

      const load = React.useCallback(async () => {
        setLoading(true);
        setLoadError('');
        try {
          const data = await lingxiCall(t, 'status');
          setStatus(data);
          setDraft(data.settings);
        } catch (error) {
          setLoadError(error instanceof Error ? error.message : String(error));
        } finally {
          setLoading(false);
        }
      }, [t]);

      React.useEffect(() => { void load(); }, [load]);

      /** Connectivity test: re-ask the host `status`, which pings the pet
       * app's /health + /agents + /integration and answers plain facts. */
      const connTest = React.useCallback(async () => {
        setTesting(true);
        setConn(null);
        try {
          const data = await lingxiCall(t, 'status');
          setStatus((prev) => (prev === null ? data : { ...prev, bridge: data.bridge, meRegistered: data.meRegistered, contract: data.contract }));
          setConn(data);
        } catch (error) {
          setConn({ error: error instanceof Error ? error.message : String(error) });
        } finally {
          setTesting(false);
        }
      }, [t]);

      const dirty = status !== null && draft !== null && JSON.stringify(draft) !== JSON.stringify(status.settings);
      const patch = (change) => setDraft((prev) => ({ ...prev, ...change }));
      const patchTool = (tool, enabledValue) =>
        setDraft((prev) => ({ ...prev, tools: { ...prev.tools, [tool]: enabledValue } }));
      /** Absent from the table means silent - the validator stores silent
       * states by omitting them, so the selector reads absence as 'silent'. */
      const notifyLevel = (state) => (draft !== null && draft.notify && draft.notify[state] !== undefined ? draft.notify[state] : 'silent');
      const patchNotify = (state, level) =>
        setDraft((prev) => ({ ...prev, notify: { ...(prev.notify ?? {}), [state]: level } }));

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

      if (loading) return h('div', { className: 'lx-loading' }, t('loading'));
      if (loadError !== '') {
        return h('div', { className: 'lx-page' },
          h('p', { className: 'lx-error' }, t('loadError') + '：' + loadError),
          h('div', { className: 'lx-actions' },
            h('button', { className: 'lx-btn', onClick: () => { void load(); } }, t('reload'))));
      }

      const up = status.bridge !== undefined && status.bridge !== null && status.bridge.running === true;
      const msgClass = (msg) => msg.kind === 'ok' ? 'lx-msg lx-msg-ok' : msg.kind === 'error' ? 'lx-msg lx-msg-error' : 'lx-msg';
      const loadInfo = status.loadInfo;
      const bridgeUrl = status.bridge.baseUrl === undefined || status.bridge.baseUrl === null ? '' : String(status.bridge.baseUrl);

      return h('div', { className: 'lx-page' },
        h('h2', { className: 'lx-title' }, t('tab')),
        h('p', { className: 'lx-intro' }, t('intro')),

        // ---- 连接：bridge status + connectivity test + the port it runs on ----
        h('section', { className: 'lx-group' },
          h('h3', { className: 'lx-group-head' }, t('groupConn')),
          h('div', { className: 'lx-status' },
            h('span', { className: 'lx-dot ' + (up ? 'lx-dot-up' : 'lx-dot-down') }),
            h('span', {}, up ? t('bridgeUp') : t('bridgeDown')),
            h('span', { className: 'lx-status-url' },
              up ? bridgeUrl : (status.bridge.error ? t('bridgeError') + '：' + status.bridge.error : bridgeUrl)),
            h('button', { className: 'lx-btn', onClick: () => { void connTest(); }, disabled: testing },
              testing ? t('connTesting') : t('connTest'))),
          connResult(t, conn),
          h('div', { className: 'lx-table' },
            row(t('settingPort'), null, h('input', {
              className: 'lx-input lx-w-s', type: 'number', min: 1024, max: 65535,
              value: draft.port, onChange: (e) => patch({ port: Number(e.target.value) }),
            })))),

        // ---- 身份：the plugin's own identity in the pet app ----
        h('section', { className: 'lx-group' },
          h('h3', { className: 'lx-group-head' }, t('groupIdentity')),
          h('div', { className: 'lx-table' },
            row(t('settingAgentId'), t('agentIdHint'), h('span', { className: 'lx-mono' }, draft.agentId)),
            row(t('settingAgentName'), null, h('input', { className: 'lx-input lx-w-name', maxLength: 24, value: draft.agentName, onChange: (e) => patch({ agentName: e.target.value }) })))),

        // ---- 行为：announce + which tools the model sees ----
        h('section', { className: 'lx-group' },
          h('h3', { className: 'lx-group-head' }, t('groupBehavior')),
          h('div', { className: 'lx-table' },
            row(t('settingAutoAnnounce'), null,
              h('label', { className: 'lx-check' },
                h('input', { type: 'checkbox', checked: draft.autoAnnounce === true, onChange: (e) => patch({ autoAnnounce: e.target.checked }) }))),
            row(t('settingTools'), null,
              h('div', { className: 'lx-pills' },
                ['task', 'say', 'react', 'state', 'remember'].map((tool) =>
                  h('button', {
                    key: tool, type: 'button', className: 'lx-pill', 'aria-pressed': draft.tools[tool] === true,
                    onClick: () => patchTool(tool, !(draft.tools[tool] === true)),
                  }, t('tool' + tool.charAt(0).toUpperCase() + tool.slice(1)))))))),

        // ---- 通知：per-state loudness, the notify table the file has always carried ----
        h('section', { className: 'lx-group' },
          h('h3', { className: 'lx-group-head' }, t('groupNotify')),
          h('p', { className: 'lx-note' }, t('notifyHint')),
          h('div', { className: 'lx-table' },
            NOTIFY_STATES.map((state) =>
              row(t('state' + state.charAt(0).toUpperCase() + state.slice(1).replace(/_([a-z])/g, (m, c) => c.toUpperCase())), null,
                h('div', { className: 'lx-seg', role: 'group', 'aria-label': state },
                  NOTIFY_LEVELS.map((level) =>
                    h('button', {
                      key: level, type: 'button', 'aria-pressed': notifyLevel(state) === level,
                      onClick: () => patchNotify(state, level),
                    }, t('level' + level.charAt(0).toUpperCase() + level.slice(1))))), state)))),

        // ---- 定时提醒：declarations + the sync into the pet app ----
        h('section', { className: 'lx-group' },
          h('h3', { className: 'lx-group-head' }, t('groupReminders')),
          (draft.reminders ?? []).length === 0
            ? h('p', { className: 'lx-note' }, t('noReminders'))
            : (draft.reminders ?? []).map((entry, index) => h('div', { key: entry.id, className: 'lx-rem-row' },
                h('input', { type: 'checkbox', checked: entry.enabled !== false, 'aria-label': t('syncReminders'), onChange: (e) => {
                  const next = [...draft.reminders];
                  next[index] = { ...entry, enabled: e.target.checked };
                  patch({ reminders: next });
                } }),
                h('span', {}, entry.title + (entry.detail ? ' — ' + entry.detail : '')),
                h('span', { className: 'lx-msg' },
                  entry.everyMinutes ? t('remEvery') + ' ' + entry.everyMinutes + ' ' + t('remEveryUnit') : t('remOnce')),
                h('button', { className: 'lx-icon-btn', title: t('remDelete'), 'aria-label': t('remDelete'), onClick: () => patch({ reminders: draft.reminders.filter((_, i) => i !== index) }) },
                  closeIcon()))),
          h('div', { className: 'lx-rem-row' },
            h('input', { className: 'lx-input', placeholder: t('remTitleField'), value: newReminder.title, onChange: (e) => setNewReminder((p) => ({ ...p, title: e.target.value })) }),
            h('input', { className: 'lx-input', placeholder: t('remDetailField'), value: newReminder.detail, onChange: (e) => setNewReminder((p) => ({ ...p, detail: e.target.value })) }),
            h('input', { className: 'lx-input lx-w-s', type: 'number', min: 5, placeholder: t('remMinutesField'), value: newReminder.everyMinutes, onChange: (e) => setNewReminder((p) => ({ ...p, everyMinutes: e.target.value })) }),
            h('button', {
              className: 'lx-icon-btn lx-add-btn',
              title: t('remAdd'), 'aria-label': t('remAdd'),
              disabled: !newReminder.title.trim(),
              onClick: () => {
                const id = 'rem-' + Date.now().toString(36);
                const every = Number(newReminder.everyMinutes);
                const entry = { id, title: newReminder.title.trim(), detail: newReminder.detail.trim(), enabled: true };
                if (Number.isFinite(every) && every > 0) entry.everyMinutes = every;
                patch({ reminders: [...(draft.reminders ?? []), entry] });
                setNewReminder({ title: '', detail: '', everyMinutes: '' });
              },
            }, plusIcon())),
          h('div', { className: 'lx-actions' },
            h('button', { className: 'lx-btn', onClick: async () => {
              setSyncing(true);
              setSyncMsg(null);
              try {
                const result = await lingxiCall(t, 'syncReminders');
                setSyncMsg(result && result.blocked
                  ? { kind: 'warn', text: t('syncBlocked').replace('{reason}', String(result.blocked)) }
                  : { kind: 'ok', text: t('syncStats').replace('{posted}', String(result.posted)).replace('{removed}', String(result.removed)).replace('{kept}', String(result.kept)) });
              } catch (error) {
                setSyncMsg({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
              } finally {
                setSyncing(false);
              }
            }, disabled: syncing }, syncing ? t('syncing') : t('syncReminders')),
            syncMsg ? h('span', { className: msgClass(syncMsg) }, syncMsg.text) : null),
          h('p', { className: 'lx-note' }, t('remHint'))),

        // ---- actions ----
        h('div', { className: 'lx-actions' },
          h('button', { className: 'lx-btn-primary', onClick: () => { void save(); }, disabled: saving || !dirty }, saving ? t('saving') : t('save')),
          h('button', { className: 'lx-btn', onClick: () => setDraft(status.settings), disabled: !dirty }, t('revert')),
          dirty ? h('span', { className: 'lx-msg' }, t('dirtyHint')) : null,
          saveMsg ? h('span', { className: msgClass(saveMsg) }, saveMsg.text) : null),

        // ---- load notes: what the validator did to the file on mount ----
        loadInfo && (loadInfo.error || (loadInfo.ignored && loadInfo.ignored.length > 0))
          ? h('div', { className: 'lx-group' },
              loadInfo.error ? h('p', { className: 'lx-error' }, t('loadFileError') + loadInfo.error) : null,
              loadInfo.ignored && loadInfo.ignored.length > 0 ? h('p', { className: 'lx-note' }, t('loadIgnored') + loadInfo.ignored.join(', ')) : null)
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
