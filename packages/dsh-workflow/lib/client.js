/**
 * Workflow Studio - client half (web).
 *
 * Registers the sidebar "工作流" entry (sidebar.footer.action) and the
 * full-screen panel (shell.overlay). Talks to the host `wfx` Remote
 * namespace through the client connection RPC carrier.
 *
 * v0.2: run timeline/swimlane visualization, stats overview, workflow
 * copy/export/import, sidebar session quick actions.
 */
window.__ModuleLoader__.load({
	id: "dsh-workflow",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		const react = require("react");
		const React = react;

		const CSS = [
			'.wfx-screen{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:14px;animation:wfx-in .18s ease-out}',
			'@keyframes wfx-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
			'.wfx-topbar{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}',
			'.wfx-title{font-size:15px;font-weight:600;margin-right:auto;display:flex;align-items:center;gap:8px;min-width:0}',
			'.wfx-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
			'.wfx-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;font-size:13px;white-space:nowrap}',
			'.wfx-btn:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary)}',
			'.wfx-btn-primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}',
			'.wfx-btn-primary:hover:not(:disabled){opacity:.9}',
			'.wfx-btn-ghost{border-color:transparent;background:transparent;color:var(--dsw-alias-label-secondary)}',
			'.wfx-btn:disabled{opacity:.45;cursor:default}',
			'.wfx-iconbtn{width:30px;padding:0;justify-content:center}',
			'.wfx-body{flex:1;display:flex;min-height:0}',
			'.wfx-side{width:264px;flex:none;border-right:1px solid var(--dsw-alias-border-l1);overflow-y:auto;padding:8px 8px 16px}',
			'.wfx-group-title{font-size:12px;color:var(--dsw-alias-label-secondary);padding:12px 8px 4px;font-weight:600;display:flex;align-items:center;gap:2px}',
			'.wfx-group-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.wfx-session-row{position:relative;border-radius:8px}',
			'.wfx-session-row:hover{background:var(--dsw-alias-bg-layer-1)}',
			'.wfx-session{display:flex;align-items:center;gap:8px;width:100%;text-align:left;padding:7px 8px;border-radius:8px;border:none;background:transparent;color:var(--dsw-alias-label-primary);cursor:pointer;font-size:13px}',
			'.wfx-session-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:4px}',
			'.wfx-session-actions{position:absolute;right:4px;top:50%;transform:translateY(-50%);display:none;gap:2px;background:var(--dsw-alias-bg-layer-1);border-radius:8px;padding:2px;border:1px solid var(--dsw-alias-border-l1)}',
			'.wfx-session-row:hover .wfx-session-actions{display:flex}',
			'.wfx-sa-btn{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}',
			'.wfx-sa-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}',
			'.wfx-main{flex:1;min-width:0;overflow-y:auto;padding:20px 24px 40px}',
			'.wfx-narrow{max-width:760px}',
			'.wfx-list-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:16px;gap:10px;flex-wrap:wrap}',
			'.wfx-page-title{font-size:18px;font-weight:600}',
			'.wfx-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(132px,1fr));gap:10px;margin-bottom:18px}',
			'.wfx-stat{padding:12px 14px;border-radius:12px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}',
			'.wfx-stat-num{font-size:22px;font-weight:700;line-height:1.1}',
			'.wfx-stat-label{font-size:11.5px;color:var(--dsw-alias-label-secondary);margin-top:2px}',
			'.wfx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}',
			'.wfx-card{display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:14px;border-radius:12px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);cursor:pointer;text-align:left;color:inherit;font-size:inherit}',
			'.wfx-card:hover{border-color:var(--dsw-alias-brand-primary)}',
			'.wfx-card-name{font-weight:600;font-size:14px;display:flex;gap:6px;align-items:center;max-width:100%;overflow:hidden}',
			'.wfx-card-desc{font-size:12.5px;color:var(--dsw-alias-label-secondary);line-height:1.5;min-height:18px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}',
			'.wfx-chip-row{display:flex;gap:6px;flex-wrap:wrap}',
			'.wfx-chip{font-size:11px;padding:2px 8px;border-radius:99px;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary)}',
			'.wfx-badge-src{font-size:11px;padding:1px 6px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-weight:400;flex:none}',
			'.wfx-status{width:8px;height:8px;border-radius:50%;flex:none;display:inline-block}',
			'.wfx-status-running{background:var(--dsw-alias-brand-primary);animation:wfx-pulse 1.2s ease-in-out infinite}',
			'.wfx-status-completed{background:var(--dsw-alias-state-success-primary)}',
			'.wfx-status-failed{background:var(--dsw-alias-state-error-primary)}',
			'.wfx-status-cancelled{background:var(--dsw-alias-label-secondary)}',
			'@keyframes wfx-pulse{0%,100%{opacity:1}50%{opacity:.25}}',
			'.wfx-section{margin-top:22px}',
			'.wfx-section-title{font-size:13px;font-weight:600;color:var(--dsw-alias-label-secondary);margin-bottom:8px;display:flex;align-items:center;gap:4px}',
			'.wfx-code{font-family:var(--ds-font-family-code,ui-monospace,Menlo,monospace);font-size:12.5px;line-height:1.6;background:var(--dsw-alias-bg-layer-2);border-radius:10px;padding:14px;white-space:pre-wrap;word-break:break-word;margin:0;max-height:420px;overflow:auto}',
			'.wfx-run{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;margin-bottom:8px;overflow:hidden}',
			'.wfx-run-head{display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer;background:var(--dsw-alias-bg-layer-1);min-width:0}',
			'.wfx-run-head:hover{background:var(--dsw-alias-bg-layer-2)}',
			'.wfx-run-name{font-weight:500;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.wfx-run-state{margin-left:auto;flex:none}',
			'.wfx-chevron{display:inline-flex;transition:transform .15s;color:var(--dsw-alias-label-secondary)}',
			'.wfx-chevron-open{transform:rotate(90deg)}',
			'.wfx-phase-pad{padding:10px 14px 12px}',
			'.wfx-run-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;margin-bottom:10px;align-items:center}',
			'.wfx-run-meta-item{display:inline-flex;align-items:center;gap:6px}',
			'.wfx-phase-title{font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-secondary);margin-bottom:6px}',
			'.wfx-member{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:4px 10px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);margin:2px 6px 2px 0;border:1px solid var(--dsw-alias-border-l2);max-width:100%;overflow:hidden}',
			'.wfx-timeline{display:flex;flex-direction:column;gap:6px;margin:6px 0 12px}',
			'.wfx-axis{display:flex;justify-content:space-between;font-size:11px;color:var(--dsw-alias-label-secondary);padding:0 2px;font-family:var(--ds-font-family-code,ui-monospace,Menlo,monospace)}',
			'.wfx-lane{display:flex;align-items:center;gap:10px}',
			'.wfx-lane-title{flex:none;width:112px;font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.wfx-lane-track{position:relative;flex:1;height:26px;background:var(--dsw-alias-bg-layer-2);border-radius:6px;overflow:hidden;border:1px solid var(--dsw-alias-border-l1)}',
			'.wfx-bar{position:absolute;top:3px;bottom:3px;border-radius:4px;opacity:.9;display:flex;align-items:center;padding:0 6px;min-width:14px;overflow:hidden}',
			'.wfx-bar-running{background-image:linear-gradient(90deg,transparent 0,rgba(255,255,255,.28) 50%,transparent 100%);background-size:200% 100%;animation:wfx-sweep 1.6s linear infinite}',
			'@keyframes wfx-sweep{from{background-position:200% 0}to{background-position:-200% 0}}',
			'.wfx-bar-label{font-size:10.5px;color:rgba(255,255,255,.95);text-shadow:0 1px 2px rgba(0,0,0,.35);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
			'.wfx-log-line{font-size:12px;font-family:var(--ds-font-family-code,ui-monospace,Menlo,monospace);color:var(--dsw-alias-label-secondary);padding:1px 0}',
			'.wfx-call-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--dsw-alias-border-l1)}',
			'.wfx-call-row:first-child{border-top:none}',
			'.wfx-field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}',
			'.wfx-field-label{font-size:12.5px;color:var(--dsw-alias-label-secondary);font-weight:500}',
			'.wfx-input,.wfx-textarea,.wfx-select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:inherit;border-radius:8px;padding:8px 10px;font-size:13px;font-family:inherit;width:100%;box-sizing:border-box}',
			'.wfx-textarea{min-height:90px;resize:vertical;font-family:var(--ds-font-family-code,ui-monospace,Menlo,monospace)}',
			'.wfx-input:focus,.wfx-textarea:focus,.wfx-select:focus{outline:none;border-color:var(--dsw-alias-brand-primary)}',
			'.wfx-dialog-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:5}',
			'.wfx-dialog{width:min(560px,92vw);max-height:82vh;overflow-y:auto;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.25)}',
			'.wfx-dialog-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}',
			'.wfx-radio-row{display:flex;gap:8px;margin-bottom:14px}',
			'.wfx-radio{flex:1;padding:10px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:transparent;cursor:pointer;color:var(--dsw-alias-label-primary);font-size:13px;text-align:center}',
			'.wfx-radio:hover{border-color:var(--dsw-alias-brand-primary)}',
			'.wfx-radio[data-on=true]{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);font-weight:600}',
			'.wfx-radio-title{font-size:13.5px;margin-bottom:2px}',
			'.wfx-empty{color:var(--dsw-alias-label-secondary);font-size:13px;padding:28px;text-align:center}',
			'.wfx-card-big{border:1px dashed var(--dsw-alias-border-l2);border-radius:14px}',
			'.wfx-error{color:var(--dsw-alias-state-error-primary);font-size:12.5px}',
			'.wfx-notice{color:var(--dsw-alias-state-success-primary);font-size:12.5px}',
			'.wfx-hint{font-size:12px;color:var(--dsw-alias-label-secondary)}',
			'.wfx-detail-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px}',
			'.wfx-detail-title{font-size:16px;font-weight:600;display:flex;align-items:center;gap:6px;min-width:0;margin-right:auto}',
			'.wfx-detail-actions{display:flex;gap:8px;flex-wrap:wrap}',
			'.wfx-ai-box{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:14px;background:var(--dsw-alias-bg-layer-1)}',
			'.wfx-foot{display:flex;align-items:center;gap:8px;width:100%;height:36px;padding:0 10px;margin:0 0 4px;border:none;border-radius:10px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:14px}',
			'.wfx-foot:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}',
			'.wfx-foot-rail{justify-content:center;width:36px;padding:0;margin:0 auto}',
			'.wfx-foot-label{white-space:nowrap;overflow:hidden}',
			'.wfx-tabs{display:flex;gap:4px;padding:2px;background:var(--dsw-alias-bg-layer-1);border-radius:10px;border:1px solid var(--dsw-alias-border-l1);margin:2px 0 4px;flex:none}',
			'.wfx-tab{flex:1;height:28px;border:none;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;gap:6px}',
			'.wfx-tab:hover{color:var(--dsw-alias-label-primary)}',
			'.wfx-tab-on{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:600}',
		].join("\n");
		const cssTag = "dsh-workflow/styles";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(cssTag) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-workflow";
			tag.dataset.pluginCss = cssTag;
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}

		const NL = String.fromCharCode(10);
		let connectionSvc = null;

		/**
		 * Invoke one host `wfx/<method>` Remote endpoint over the connection
		 * RPC carrier. Returns the business value; throws on transport or
		 * gateway failure (business `{ error }` shapes stay return values,
		 * matching the panel's existing error display paths).
		 */
		const wfxCall = async (method, request) => {
			if (connectionSvc === null) throw new Error("连接服务尚未就绪");
			const envelope = await connectionSvc.rpc.call("/api", "wfx/" + method, { args: { request: request === undefined ? null : request } });
			if (envelope !== null && typeof envelope === "object" && envelope.ok === false) {
				const message = envelope.error && envelope.error.message ? envelope.error.message : "调用失败";
				throw new Error(message);
			}
			if (envelope !== null && typeof envelope === "object" && envelope.ok === true) return envelope.value;
			throw new Error("意外的 RPC 响应");
		};

		const panelState = { open: false, listeners: new Set() };
		const emitOpen = () => { for (const fn of panelState.listeners) fn(); };
		const setPanelOpen = (v) => { if (panelState.open === v) return; panelState.open = v; emitOpen(); };
		const usePanelOpen = () => {
			const [open, setOpenState] = React.useState(panelState.open);
			React.useEffect(() => {
				const fn = () => setOpenState(panelState.open);
				panelState.listeners.add(fn);
				return () => { panelState.listeners.delete(fn); };
			}, []);
			return open;
		};

		const fmtTime = (t) => { try { return t ? new Date(t).toLocaleString() : ""; } catch (e) { return ""; } };
		const errText = (e) => (e && e.message) ? String(e.message) : String(e);
		const fmtDur = (ms) => {
			if (!(ms > 0)) return "";
			if (ms < 1000) return Math.round(ms) + "ms";
			if (ms < 60000) return (ms / 1000).toFixed(1) + "s";
			const m = Math.floor(ms / 60000);
			const s = Math.round((ms % 60000) / 1000);
			return m + "m" + s + "s";
		};
		const download = (filename, obj) => {
			try {
				const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				a.remove();
				URL.revokeObjectURL(url);
			} catch (e) {}
		};
		const exportDef = (d) => ({ name: d.name, description: d.description, whenToUse: d.whenToUse || "", phases: d.phases || [], script: d.script });
		const defPhasesText = (phases) => (phases || []).map((ph) => ph && ph.title ? (ph.detail ? ph.title + " | " + ph.detail : ph.title) : String(ph || "")).join(NL);
		const importDefs = (raw) => {
			let obj;
			try { obj = JSON.parse(raw); } catch (e) { return Promise.reject(new Error("不是有效的 JSON 文件")); }
			const arr = Array.isArray(obj) ? obj : [obj];
			if (arr.length === 0) return Promise.resolve(0);
			return Promise.all(arr.map((d) => wfxCall("createDef", {
				name: String((d && d.name) || "").trim(),
				description: String((d && d.description) || "").trim(),
				whenToUse: String((d && d.whenToUse) || "").trim(),
				phasesText: defPhasesText(d && d.phases),
				script: String((d && d.script) || ""),
			}))).then((rs) => rs.filter((r) => r && !r.error).length);
		};
		const computeStats = (data) => {
			const s = { workflows: 0, totalRuns: 0, running: 0, terminal: 0, completed: 0, sumMs: 0 };
			if (data) {
				s.workflows = (data.definitions || []).length;
				for (const g of (data.groups || [])) {
					for (const x of (g.sessions || [])) {
						for (const r of (x.runs || [])) {
							s.totalRuns++;
							if (r.status === "running") { s.running++; continue; }
							s.terminal++;
							if (r.status === "completed") { s.completed++; if (r.endedAt && r.startedAt) s.sumMs += (r.endedAt - r.startedAt); }
						}
					}
				}
			}
			s.rate = s.terminal ? Math.round((s.completed / s.terminal) * 100) : 0;
			s.avgMs = s.terminal ? Math.round(s.sumMs / s.terminal) : 0;
			return s;
		};
		/** Group workflows by the workspace their source session / runs belong to. */
		const groupDefsByWorkspace = (data) => {
			const defs = (data && data.definitions) || [];
			const wsGroups = [];
			const sessionToWs = new Map();
			for (const g of (data ? data.groups : [])) {
				if (g.kind !== "workspace") continue;
				wsGroups.push({ ws: g, defs: [] });
				for (const s of g.sessions) sessionToWs.set(s.id, g);
			}
			const used = new Set();
			for (const def of defs) {
				let ws = null;
				if (def.source && def.source.kind === "session") ws = sessionToWs.get(def.source.sessionId) || null;
				if (ws === null && def.runCount > 0) {
					for (const g of (data ? data.groups : [])) {
						let hit = false;
						for (const s of g.sessions) {
							if (s.runs && s.runs.some((r) => r.name === def.name)) { hit = true; break; }
						}
						if (hit) { ws = g; break; }
					}
				}
				if (ws !== null && ws.kind === "workspace") {
					wsGroups.find((gr) => gr.ws.workspaceId === ws.workspaceId).defs.push(def);
					used.add(def.id);
				}
			}
			return { wsGroups: wsGroups.filter((gr) => gr.defs.length > 0), rest: defs.filter((d) => !used.has(d.id)) };
		};

		const h = React.createElement;
		const Icon = (paths, size) => h("svg", { viewBox: "0 0 24 24", width: size || 16, height: size || 16, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, paths);
		const IcFlow = (s) => Icon([h("rect", { x: 3, y: 4, width: 6, height: 5, rx: 1.5 }), h("rect", { x: 15, y: 4, width: 6, height: 5, rx: 1.5 }), h("rect", { x: 9, y: 15, width: 6, height: 5, rx: 1.5 }), h("path", { d: "M6 9v2.5h6V15" }), h("path", { d: "M18 9v2.5h-6" })], s);
		const IcPlus = (s) => Icon([h("path", { d: "M12 5v14M5 12h14" })], s);
		const IcClose = (s) => Icon([h("path", { d: "M6 6l12 12M18 6L6 18" })], s);
		const IcRefresh = (s) => Icon([h("path", { d: "M20 11a8 8 0 1 0-2.3 6.3" }), h("path", { d: "M20 5v6h-6" })], s);
		const IcPlay = (s) => Icon([h("path", { d: "M8 5l11 7-11 7z" })], s);
		const IcBack = (s) => Icon([h("path", { d: "M15 6l-6 6 6 6" })], s);
		const IcEdit = (s) => Icon([h("path", { d: "M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" })], s);
		const IcTrash = (s) => Icon([h("path", { d: "M4 7h16M9 7V5h6v2m-8 0l1 13h8l1-13" })], s);
		const IcDoc = (s) => Icon([h("path", { d: "M7 3h7l4 4v14H7z" }), h("path", { d: "M14 3v4h4" })], s);
		const IcChevron = (s) => Icon([h("path", { d: "M9 6l6 6-6 6" })], s);
		const IcSpark = (s) => Icon([h("path", { d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" })], s);
		const IcCopy = (s) => Icon([h("rect", { x: 9, y: 9, width: 11, height: 11, rx: 2 }), h("path", { d: "M5 15V5a2 2 0 0 1 2-2h10" })], s);
		const IcExport = (s) => Icon([h("path", { d: "M12 3v12" }), h("path", { d: "M8 7l4-4 4 4" }), h("path", { d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" })], s);
		const IcImport = (s) => Icon([h("path", { d: "M12 15V3" }), h("path", { d: "M8 7l4 4 4-4" }), h("path", { d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" })], s);

		const STATUS_TEXT = { running: "运行中", completed: "已完成", failed: "失败", cancelled: "已取消" };
		const StatusDot = (status) => h("span", { className: "wfx-status wfx-status-" + (status || "running"), title: STATUS_TEXT[status] || status });

		const Btn = (props) => {
			const kids = [];
			if (props.icon) kids.push(props.icon);
			if (props.label) kids.push(h("span", { key: "label" }, props.label));
			return h("button", {
				type: "button",
				className: "wfx-btn" + (props.primary ? " wfx-btn-primary" : "") + (props.ghost ? " wfx-btn-ghost" : "") + (props.iconOnly ? " wfx-iconbtn" : ""),
				onClick: props.onClick,
				disabled: props.disabled === true,
				title: props.title || "",
			}, kids);
		};

		const Field = (props) => h("div", { className: "wfx-field" },
			h("label", { className: "wfx-field-label" }, props.label),
			props.children,
			props.hint ? h("div", { className: "wfx-hint" }, props.hint) : null);

		const input = (value, setValue, extra) => h("input", Object.assign({ className: "wfx-input", value: value, onChange: (e) => setValue(e.target.value) }, extra || {}));
		const area = (value, setValue, extra) => h("textarea", Object.assign({ className: "wfx-textarea", value: value, onChange: (e) => setValue(e.target.value) }, extra || {}));
		const select = (value, setValue, children, extra) => h("select", Object.assign({ className: "wfx-select", value: value, onChange: (e) => setValue(e.target.value) }, extra || {}), children);

		const memberColor = (m) => m.outcome === null ? "var(--dsw-alias-brand-primary)" : m.outcome === "completed" ? "var(--dsw-alias-state-success-primary)" : m.outcome === "failed" ? "var(--dsw-alias-state-error-primary)" : "var(--dsw-alias-label-secondary)";

		/** Horizontal timeline / swimlane visualization of one run's agents. */
		const TimelineBars = (d) => {
			const lanes = d.phases.map((ph) => ({ key: ph.title === null ? "(none)" : ph.title, title: ph.title === null ? "未分组" : ph.title, members: ph.members }));
			const all = [];
			for (const ph of d.phases) for (const m of ph.members) all.push(m);
			const now = Date.now();
			const timed = all.filter((m) => m.startedAt > 0);
			if (timed.length === 0) {
				return d.phases.map((ph) => h("div", { key: ph.title === null ? "(none)" : ph.title, style: { marginBottom: "10px" } },
					h("div", { className: "wfx-phase-title" }, (ph.title === null ? "未分组" : ph.title) + " · " + ph.members.length + " 个 agent"),
					h("div", null, ph.members.map((m) => h("span", { key: m.seq, className: "wfx-member", style: { borderColor: memberColor(m) } },
						[h("span", { key: "dot", className: "wfx-status", style: { background: memberColor(m) } }), h("span", { key: "n" }, "#" + m.seq + " " + m.label), m.outcome !== null ? h("span", { key: "o", className: "wfx-hint" }, STATUS_TEXT[m.outcome] || m.outcome) : null])))));
			}
			let minT = Infinity, maxT = -Infinity;
			for (const m of timed) {
				const start = m.startedAt;
				const end = m.endedAt || now;
				if (start < minT) minT = start;
				if (end > maxT) maxT = end;
			}
			const span = (maxT - minT) || 1;
			const laneNodes = lanes.map((lane) => {
				const bars = lane.members.map((m) => {
					const start = m.startedAt > 0 ? m.startedAt : minT;
					const end = m.endedAt || now;
					const left = ((start - minT) / span) * 100;
					const width = m.startedAt > 0 ? Math.max(((end - start) / span) * 100, 1.4) : 100;
					const running = m.outcome === null;
					return h("div", { key: m.seq, className: "wfx-bar" + (running ? " wfx-bar-running" : ""), style: { left: left + "%", width: width + "%", background: memberColor(m) }, title: "#" + m.seq + " " + m.label + (m.outcome !== null ? " · " + (STATUS_TEXT[m.outcome] || m.outcome) : " · 运行中") },
						h("span", { className: "wfx-bar-label" }, "#" + m.seq + " " + m.label));
				});
				return h("div", { key: lane.key, className: "wfx-lane" },
					h("div", { className: "wfx-lane-title", title: lane.title }, lane.title),
					h("div", { className: "wfx-lane-track" }, bars));
			});
			return h("div", { className: "wfx-timeline" },
				h("div", { className: "wfx-axis" }, h("span", null, fmtTime(minT).slice(5)), h("span", null, fmtTime(maxT).slice(5))),
				laneNodes);
		};

		const RunTimeline = (p) => {
			const [d, setD] = React.useState(null);
			const [err, setErr] = React.useState("");
			React.useEffect(() => {
				let alive = true;
				wfxCall("runDetail", { sessionId: p.sessionId, runId: p.runId }).then((r) => {
					if (!alive) return;
					if (r && r.error) setErr(r.error);
					else setD(r);
				}, (e) => { if (alive) setErr(errText(e)); });
				return () => { alive = false; };
			}, [p.sessionId, p.runId, p.refreshKey]);
			if (err) return h("div", { className: "wfx-error wfx-phase-pad" }, err);
			if (d === null) return h("div", { className: "wfx-hint wfx-phase-pad" }, "加载中…");

			const metaItems = [
				h("span", { key: "st", className: "wfx-run-meta-item" }, StatusDot(d.status)),
				h("span", { key: "stx", className: "wfx-run-meta-item" }, STATUS_TEXT[d.status] || d.status),
				h("span", { key: "ag", className: "wfx-run-meta-item" }, "agents 启动: " + d.agentsStarted),
			];
			if (d.endedAt && d.startedAt && d.endedAt > d.startedAt) metaItems.push(h("span", { key: "du", className: "wfx-run-meta-item" }, "耗时 " + fmtDur(d.endedAt - d.startedAt)));
			if (d.stopReason) metaItems.push(h("span", { key: "sr", className: "wfx-run-meta-item" }, "结束原因: " + d.stopReason));
			if (d.error) metaItems.push(h("span", { key: "er", className: "wfx-error" }, d.error));

			const logLines = [];
			if (d.logs.length > 0) logLines.push(h("div", { key: "lt", className: "wfx-phase-title", style: { marginTop: "8px" } }, "运行日志"));
			d.logs.forEach((l, i) => {
				logLines.push(h("div", { key: "l" + i, className: "wfx-log-line" },
					h("span", { className: "wfx-hint" }, fmtTime(l.time).slice(5)),
					" ",
					l.message));
			});

			return h("div", { className: "wfx-phase-pad" },
				h("div", { className: "wfx-run-meta" }, metaItems),
				h(TimelineBars, { ...d }),
				logLines);
		};

		const RunRow = (p) => {
			const [openRun, setOpenRun] = React.useState(p.run.status === "running");
			const dur = (p.run.endedAt && p.run.startedAt && p.run.endedAt > p.run.startedAt) ? fmtDur(p.run.endedAt - p.run.startedAt) : "";
			return h("div", { className: "wfx-run" },
				h("div", { className: "wfx-run-head", onClick: () => setOpenRun(!openRun) },
					h("span", { className: "wfx-chevron" + (openRun ? " wfx-chevron-open" : "") }, IcChevron(12)),
					StatusDot(p.run.status),
					h("span", { className: "wfx-run-name" }, p.run.name),
					h("span", { className: "wfx-hint" }, (p.session ? p.session.title + " · " : "") + fmtTime(p.run.startedAt)),
					h("span", { className: "wfx-hint" }, p.run.agents + " agents" + (dur ? " · " + dur : "")),
					h("span", { className: "wfx-hint wfx-run-state" }, STATUS_TEXT[p.run.status] || p.run.status)),
				openRun ? h(RunTimeline, { sessionId: p.session ? p.session.id : "", runId: p.run.runId, refreshKey: p.refreshKey }) : null);
		};

		const DefDetailView = (p) => {
			const def = p.def;
			const runs = [];
			const seen = new Set();
			for (const g of (p.data ? p.data.groups : [])) {
				for (const s of g.sessions) {
					for (const r of s.runs) {
						if (r.name !== def.name) continue;
						const key = s.id + ":" + r.runId;
						if (seen.has(key)) continue;
						seen.add(key);
						runs.push({ run: r, session: s });
					}
				}
			}
			runs.sort((a, b) => b.run.startedAt - a.run.startedAt);

			const phaseChips = (def.phases || []).map((ph, i) => h("span", { key: i, className: "wfx-chip", title: ph.detail || "" }, ph.title));
			const runRows = runs.map((rr) => h(RunRow, { key: rr.session.id + ":" + rr.run.runId, run: rr.run, session: rr.session, refreshKey: p.refreshKey }));

			const headActions = [
				Btn({ primary: true, icon: IcPlay(12), label: "新建会话运行", onClick: p.onRun, title: "以工作流模式新建会话并运行" }),
			];
			headActions.push(Btn({ icon: IcCopy(12), label: def.saved ? "复制" : "存为模板", onClick: p.onCopy, title: "基于此工作流创建一个新模板" }));
			headActions.push(Btn({ ghost: true, icon: IcExport(12), label: "导出", onClick: () => download(def.name + ".workflow.json", exportDef(def)) }));
			if (def.saved) {
				headActions.push(Btn({ icon: IcEdit(12), label: "编辑", onClick: p.onEdit }));
				headActions.push(Btn({ ghost: true, icon: IcTrash(12), label: "删除", onClick: p.onDelete }));
			} else {
				headActions.push(Btn({ icon: IcDoc(12), label: "保存", onClick: p.onSave, title: "保存到工作流库" }));
			}
			if (def.source && def.source.kind === "session" && p.onOpenSession) {
				headActions.push(Btn({ ghost: true, icon: IcDoc(12), label: "源会话", onClick: () => p.onOpenSession(def.source.sessionId) }));
			}

			return h("div", null,
				h("div", { className: "wfx-detail-head" },
					h("button", { type: "button", className: "wfx-btn wfx-btn-ghost", onClick: p.onBack }, [IcBack(14), h("span", { key: "t" }, "返回列表")]),
					h("div", { className: "wfx-detail-title" }, def.name, " ", def.saved ? h("span", { className: "wfx-badge-src" }, "已保存") : h("span", { className: "wfx-badge-src" }, "来自会话")),
					h("div", { className: "wfx-detail-actions" }, headActions)),
				def.description ? h("div", { className: "wfx-section" }, h("div", { className: "wfx-section-title" }, "描述"), h("div", null, def.description)) : null,
				def.whenToUse ? h("div", { className: "wfx-section" }, h("div", { className: "wfx-section-title" }, "适用场景"), h("div", { className: "wfx-hint" }, def.whenToUse)) : null,
				def.phases && def.phases.length > 0 ? h("div", { className: "wfx-section" },
					h("div", { className: "wfx-section-title" }, "阶段 (" + def.phases.length + ")"),
					h("div", { className: "wfx-chip-row" }, phaseChips)) : null,
				h("div", { className: "wfx-section" }, h("div", { className: "wfx-section-title" }, "脚本"), h("pre", { className: "wfx-code" }, def.script)),
				h("div", { className: "wfx-section" },
					h("div", { className: "wfx-section-title" }, "运行历史 (" + runs.length + ")" + (def.runCount > runs.length ? " · 共 " + def.runCount + " 次" : "")),
					runs.length === 0 ? h("div", { className: "wfx-empty" }, "尚未运行过,点击右上角「新建会话运行」试试") : runRows));
		};

		const CreateView = (p) => {
			const init = p.initial || { id: null, name: "", description: "", whenToUse: "", phasesText: "", script: "" };
			const [name, setName] = React.useState(init.name);
			const [description, setDescription] = React.useState(init.description);
			const [whenToUse, setWhenToUse] = React.useState(init.whenToUse);
			const [phasesText, setPhasesText] = React.useState(init.phasesText);
			const [script, setScript] = React.useState(init.script);
			const [goal, setGoal] = React.useState("");
			const [err, setErr] = React.useState("");
			const [busy, setBusy] = React.useState(false);
			const editing = init.id !== null;
			const submit = () => {
				setBusy(true);
				const method = editing ? "updateDef" : "createDef";
				const request = { name: name, description: description, whenToUse: whenToUse, phasesText: phasesText, script: script };
				if (editing) request.id = init.id;
				wfxCall(method, request).then((r) => {
					setBusy(false);
					if (r && r.error) setErr(r.error);
					else p.onSaved();
				}, (e) => { setBusy(false); setErr(errText(e)); });
			};
			return h("div", { className: "wfx-narrow" },
				h("div", { className: "wfx-detail-head" },
					h("button", { type: "button", className: "wfx-btn wfx-btn-ghost", onClick: p.onBack }, [IcBack(14), h("span", { key: "t" }, "返回")]),
					h("div", { className: "wfx-detail-title" }, editing ? "编辑工作流" : "新建工作流")),
				h("div", { className: "wfx-section" },
					Field({ label: "名称 (name,短横线小写英文)" }, input(name, setName, { placeholder: "code-review-scan" })),
					Field({ label: "描述 (description)" }, input(description, setDescription, { placeholder: "一句话说明这个工作流做什么" })),
					Field({ label: "适用场景 (whenToUse,可选)" }, input(whenToUse, setWhenToUse, { placeholder: "什么时候适合使用" })),
					Field({ label: "阶段 (每行一个:标题 | 说明,可选)" }, area(phasesText, setPhasesText, { rows: 3, placeholder: "收集材料 | 抓取相关内容;每行一个阶段" })),
					Field({ label: "脚本 (纯 JS 脚本体,以 return 结尾)" }, area(script, setScript, { rows: 12, placeholder: "const items = args.files" })),
					err ? h("div", { className: "wfx-error" }, err) : null,
					h("div", { className: "wfx-row" },
						Btn({ primary: true, label: editing ? "保存修改" : "创建", onClick: submit, disabled: busy }),
						Btn({ ghost: true, label: "取消", onClick: p.onBack }))),
				editing ? null : h("div", { className: "wfx-section wfx-ai-box" },
					h("div", { className: "wfx-section-title" }, [IcSpark(13), h("span", { key: "t" }, " 用会话模式创建(AI 协作设计)")]),
					h("div", { className: "wfx-hint", style: { marginBottom: "8px" } }, "描述目标,在新建会话中让 AI 设计并试运行工作流,完成后可从该会话一键抽象保存。"),
					h("div", { className: "wfx-row" },
						input(goal, setGoal, { placeholder: "例如:对仓库所有 src 文件做多角度代码审查" }),
						Btn({ label: "AI 设计", icon: IcSpark(12), onClick: () => p.onDesign(goal), disabled: !goal.trim() }))));
		};

		const AbstractView = (p) => {
			const [expanded, setExpanded] = React.useState(null);
			const [calls, setCalls] = React.useState({});
			const [err, setErr] = React.useState("");
			const [savedSeq, setSavedSeq] = React.useState(null);
			const sessions = [];
			for (const g of (p.data ? p.data.groups : [])) {
				for (const s of g.sessions) {
					if (s.callCount > 0 && (p.onlySessionId === undefined || s.id === p.onlySessionId)) sessions.push(s);
				}
			}
			const toggle = (sid) => {
				if (expanded === sid) { setExpanded(null); return; }
				setExpanded(sid);
				if (!calls[sid]) {
					wfxCall("sessionCalls", { sessionId: sid }).then((r) => {
						const next = Object.assign({}, calls);
						next[sid] = r && r.calls ? r.calls : [];
						setCalls(next);
					}, (e) => setErr(errText(e)));
				}
			};
			const save = (sid, seq) => {
				setErr("");
				wfxCall("saveFromCall", { sessionId: sid, seq: seq }).then((r) => {
					if (r && r.error) setErr(r.error);
					else { setSavedSeq(seq); p.onSaved(r.id); }
				}, (e) => setErr(errText(e)));
			};
			const renderCalls = (sid) => {
				if (calls[sid] === undefined) return h("div", { className: "wfx-hint" }, "加载中…");
				if (calls[sid].length === 0) return h("div", { className: "wfx-hint" }, "无可保存的调用");
				return calls[sid].map((c) => h("div", { key: c.seq, className: "wfx-call-row" },
					h("div", { style: { minWidth: 0, flex: 1 } },
						h("div", { className: "wfx-run-name" }, (c.meta && c.meta.name) || "workflow"),
						h("div", { className: "wfx-hint" }, (c.meta && c.meta.description) || "")),
					savedSeq === c.seq
						? h("span", { className: "wfx-chip" }, "已保存")
						: Btn({ label: "保存为工作流", icon: IcDoc(12), onClick: () => save(sid, c.seq) })));
			};
			const sessionRows = sessions.map((s) => h("div", { key: s.id, className: "wfx-run" },
				h("div", { className: "wfx-run-head", onClick: () => toggle(s.id) },
					h("span", { className: "wfx-chevron" + (expanded === s.id ? " wfx-chevron-open" : "") }, IcChevron(12)),
					h("span", { className: "wfx-run-name" }, s.title),
					h("span", { className: "wfx-hint" }, s.callCount + " 次工作流调用 · " + fmtTime(s.lastActive))),
				expanded === s.id ? h("div", { className: "wfx-phase-pad" }, renderCalls(s.id)) : null));
			return h("div", { className: "wfx-narrow" },
				h("div", { className: "wfx-detail-head" },
					h("button", { type: "button", className: "wfx-btn wfx-btn-ghost", onClick: p.onBack }, [IcBack(14), h("span", { key: "t" }, "返回")]),
					h("div", { className: "wfx-detail-title" }, "从会话抽象工作流")),
				h("div", { className: "wfx-hint", style: { margin: "12px 0" } }, "从历史会话中提取 workflow 工具调用,保存为可复用的工作流。"),
				err ? h("div", { className: "wfx-error" }, err) : null,
				sessions.length === 0
					? h("div", { className: "wfx-empty" }, "没有发现包含工作流调用的会话。先在会话中使用 workflow 工具,或稍后点击刷新。")
					: sessionRows);
		};

		const SessionPicker = (p) => {
			const st = p.state;
			const set = (patch) => p.setState(Object.assign({}, st, patch));
			const workspaces = [];
			for (const g of (p.data ? p.data.groups : [])) {
				if (g.kind === "workspace") workspaces.push(g);
			}
			const targetSession = st.targetSessionId ? (() => { for (const g of (p.data ? p.data.groups : [])) for (const s of g.sessions) if (s.id === st.targetSessionId) return s; return null; })() : null;
			const [err, setErr] = React.useState("");
			const [busy, setBusy] = React.useState(false);
			React.useEffect(() => {
				if (st.targetSessionId === undefined && st.workspaceId === null && workspaces.length > 0) set({ workspaceId: workspaces[0].workspaceId });
			}, [st.targetSessionId, st.workspaceId, workspaces.length]);
			const defs = p.data ? p.data.definitions : [];
			const confirm = () => {
				const sessionsSvc = ctx.get("sessions");
				const workspacesSvc = ctx.get("workspaces");
				if (sessionsSvc === undefined) { setErr("会话服务不可用"); return; }
				if (st.targetSessionId) {
					if (!st.definitionId) { setErr("请选择一个工作流"); return; }
					setBusy(true);
					setErr("");
					sessionsSvc.open(st.targetSessionId);
					wfxCall("launch", { sessionId: st.targetSessionId, mode: "run", definitionId: st.definitionId }).then((r) => {
						setBusy(false);
						if (r && r.ok === true) p.onDone();
						else setErr((r && r.error) || "启动失败");
					}, (e) => { setBusy(false); setErr(errText(e)); });
					return;
				}
				if (st.mode !== "plain" && workspaces.length === 0) { setErr("没有可用的工作区,请先在 DSH 中创建工作区"); return; }
				if (st.mode === "workflow" && !st.definitionId) { setErr("请选择一个工作流"); return; }
				if (st.mode === "design" && !(st.goal || "").trim()) { setErr("请填写目标描述"); return; }
				if (workspacesSvc === undefined) { setErr("工作区服务不可用"); return; }
				setBusy(true);
				setErr("");
				if (st.mode === "plain") {
					try {
						workspacesSvc.startSession(st.workspaceId || undefined);
						setBusy(false);
						p.onDone();
					} catch (e) { setBusy(false); setErr(errText(e)); }
					return;
				}
				workspacesSvc.connectWorkspace(st.workspaceId).then((sid) => {
					sessionsSvc.open(sid);
					const request = { sessionId: sid, mode: st.mode === "workflow" ? "run" : "design" };
					if (st.mode === "workflow") request.definitionId = st.definitionId;
					if (st.mode === "design") request.goal = st.goal;
					return wfxCall("launch", request);
				}).then((r) => {
					if (r && r.ok === true) { setBusy(false); p.onDone(); }
					else { setBusy(false); setErr((r && r.error) || "启动失败"); }
				}, (e) => { setBusy(false); setErr(errText(e)); });
			};
			const modeBtn = (mode, label, desc) => h("button", {
				type: "button", className: "wfx-radio", "data-on": st.mode === mode ? "true" : "false",
				onClick: () => set({ mode: mode }),
			}, h("div", { className: "wfx-radio-title" }, label), h("div", { className: "wfx-hint" }, desc));
			const wsOptions = workspaces.map((w) => h("option", { key: w.workspaceId, value: w.workspaceId }, w.title));
			const defOptions = [h("option", { key: "", value: "" }, "请选择…")].concat(defs.map((d) =>
				h("option", { key: d.id, value: d.id }, d.name + (d.runCount ? " (" + d.runCount + " 次运行)" : ""))));
			return h("div", { className: "wfx-dialog-backdrop", onClick: (e) => { if (e.target === e.currentTarget && !busy) p.onClose(); } },
				h("div", { className: "wfx-dialog" },
					h("div", { className: "wfx-dialog-head" },
						h("div", { className: "wfx-detail-title" }, st.targetSessionId ? "在会话中运行工作流" : "新建会话"),
						Btn({ ghost: true, iconOnly: true, icon: IcClose(14), title: "关闭", onClick: p.onClose })),
					st.targetSessionId
						? h("div", { className: "wfx-hint", style: { marginBottom: "12px" } }, "在会话「" + (targetSession ? targetSession.title : "该会话") + "」中运行,不会新建会话。")
						: h("div", { className: "wfx-radio-row" },
							modeBtn("plain", "普通会话", "空白会话,手动输入"),
							modeBtn("workflow", "工作流模式", "选择工作流自动运行"),
							modeBtn("design", "AI 协作设计", "让 AI 设计新工作流")),
					(!st.targetSessionId && st.mode !== "plain" && workspaces.length === 0)
						? h("div", { className: "wfx-error" }, "当前没有工作区,无法创建工作流会话") : null,
					(!st.targetSessionId && st.mode !== "plain" && workspaces.length > 0)
						? Field({ label: "工作区(项目)" }, select(st.workspaceId || "", (v) => set({ workspaceId: v }), wsOptions))
						: null,
					(st.mode === "workflow" || st.targetSessionId)
						? Field({ label: "选择工作流" }, select(st.definitionId || "", (v) => set({ definitionId: v }), defOptions))
						: null,
					st.mode === "design"
						? Field({ label: "目标描述" }, area(st.goal || "", (v) => set({ goal: v }), { rows: 4, placeholder: "描述你想要的工作流,例如:对指定目录的所有 TypeScript 文件做安全审查并汇总" }))
						: null,
					err ? h("div", { className: "wfx-error", style: { marginBottom: "10px" } }, err) : null,
					h("div", { className: "wfx-row", style: { justifyContent: "flex-end" } },
						Btn({ ghost: true, label: "取消", onClick: p.onClose, disabled: busy }),
						Btn({ primary: true, label: st.targetSessionId ? "运行" : st.mode === "plain" ? "创建会话" : st.mode === "workflow" ? "创建并运行" : "开始设计", icon: st.mode === "plain" && !st.targetSessionId ? null : IcPlay(12), onClick: confirm, disabled: busy }))));
		};

		const ListView = (p) => {
			const [q, setQ] = React.useState("");
			const [err, setErr] = React.useState("");
			const [notice, setNotice] = React.useState("");
			const fileRef = React.useRef(null);
			const defs = (p.data ? p.data.definitions : []).filter((d) =>
				!q || d.name.indexOf(q) >= 0 || (d.description || "").indexOf(q) >= 0);
			const stats = computeStats(p.data);
			const onFile = (e) => {
				const f = e.target && e.target.files && e.target.files[0];
				if (!f) return;
				const reader = new FileReader();
				reader.onload = () => {
					importDefs(reader.result).then((n) => { setNotice("成功导入 " + n + " 个工作流"); p.refresh(); }, (e2) => setErr(errText(e2)));
				};
				reader.onerror = () => setErr("读取文件失败");
				reader.readAsText(f);
				e.target.value = "";
			};
			const statCard = (label, num, accent) => h("div", { className: "wfx-stat" },
				h("div", { className: "wfx-stat-num", style: accent ? { color: "var(--dsw-alias-brand-primary)" } : undefined }, num),
				h("div", { className: "wfx-stat-label" }, label));
			const cards = defs.map((d) => h("button", { key: d.id, type: "button", className: "wfx-card", onClick: () => p.onOpenDef(d) },
				h("div", { className: "wfx-card-name" },
					StatusDot(d.runCount > 0 ? "completed" : "cancelled"),
					" ",
					d.name,
					" ",
					d.saved ? h("span", { className: "wfx-badge-src" }, "已保存") : h("span", { className: "wfx-badge-src" }, "会话")),
				h("div", { className: "wfx-card-desc" }, d.description || "(无描述)"),
				d.phases && d.phases.length > 0 ? h("div", { className: "wfx-chip-row" }, d.phases.slice(0, 4).map((ph, i) => h("span", { key: i, className: "wfx-chip" }, ph.title))) : null,
				h("div", { className: "wfx-hint" }, d.runCount > 0 ? d.runCount + " 次运行 · 最近 " + fmtTime(d.lastRunAt) : "尚未运行")));
			return h("div", null,
				h("div", { className: "wfx-list-head" },
					h("div", null,
						h("div", { className: "wfx-page-title" }, "工作流"),
						h("div", { className: "wfx-hint" }, defs.length + " 个工作流 · 点击卡片查看详情与运行历史")),
					h("div", { className: "wfx-row" },
						Btn({ icon: IcImport(12), label: "导入", title: "从 JSON 文件导入工作流", onClick: () => { if (fileRef.current) fileRef.current.click(); } }),
						Btn({ ghost: true, icon: IcExport(12), label: "导出全部", title: "导出全部工作流为 JSON", onClick: () => download("workflows.json", (p.data ? p.data.definitions : []).map(exportDef)) }),
						h("input", { ref: fileRef, type: "file", accept: ".json,application/json", style: { display: "none" }, onChange: onFile }))),
				err ? h("div", { className: "wfx-error", style: { marginBottom: "12px" } }, err) : null,
				notice ? h("div", { className: "wfx-notice", style: { marginBottom: "12px" } }, notice) : null,
				p.data ? h("div", { className: "wfx-stats" }, [
					statCard("工作流", stats.workflows),
					statCard("运行总数", stats.totalRuns),
					statCard("成功率", stats.rate + "%"),
					statCard("平均耗时", fmtDur(stats.avgMs) || "—"),
					statCard("运行中", stats.running, stats.running > 0),
				]) : null,
				defs.length === 0
					? h("div", { className: "wfx-empty wfx-card-big" },
						h("div", { style: { marginBottom: "8px", display: "flex", justifyContent: "center" } }, IcFlow(28)),
						h("div", { style: { marginBottom: "4px" } }, "还没有工作流"),
						h("div", { className: "wfx-hint", style: { marginBottom: "14px" } }, "手动创建、让 AI 协作设计,或从历史会话中抽象一个"),
						h("div", { className: "wfx-row", style: { justifyContent: "center" } },
							Btn({ primary: true, icon: IcPlus(12), label: "新建工作流", onClick: p.onCreate }),
							Btn({ icon: IcDoc(12), label: "从会话抽象", onClick: p.onAbstract })))
					: h("div", { className: "wfx-grid" }, cards));
		};

		const ProjectSide = (p) => {
			const [tab, setTab] = React.useState("session");
			const total = p.groups.reduce((n, g) => n + g.sessions.length, 0);
			const wf = groupDefsByWorkspace(p.data);
			const sessionNodes = p.groups.map((g) => h("div", { key: g.key },
				h("div", { className: "wfx-group-title" }, h("span", { className: "wfx-group-name" }, g.title), h("span", { className: "wfx-hint" }, " · " + g.sessions.length)),
				g.sessions.map((s) => h("div", { key: s.id, className: "wfx-session-row" },
					h("button", { type: "button", className: "wfx-session", onClick: () => p.onOpenSession(s.id), title: "打开会话 " + s.title },
						StatusDot(s.runs.length > 0 ? s.runs[0].status : "cancelled"),
						h("span", { className: "wfx-session-title" }, s.title),
						h("span", { className: "wfx-hint" }, s.runs.length > 0 ? s.runs.length + " run" : s.callCount + " call")),
					h("div", { className: "wfx-session-actions" },
						h("button", { type: "button", className: "wfx-sa-btn", title: "在此会话运行工作流", onClick: (e) => { e.stopPropagation(); p.onRunIn(s.id); } }, IcPlay(13)),
						h("button", { type: "button", className: "wfx-sa-btn", title: "查看调用历史", onClick: (e) => { e.stopPropagation(); p.onCallsIn(s.id); } }, IcDoc(13)))))));
			const wfRow = (d) => h("button", { key: d.id, type: "button", className: "wfx-session", onClick: () => p.onOpenDef(d), title: "打开工作流 " + d.name },
				StatusDot(d.runCount > 0 ? "completed" : "cancelled"),
				h("span", { className: "wfx-session-title" }, d.name),
				h("span", { className: "wfx-hint" }, d.runCount > 0 ? d.runCount + " run" : "0 run"));
			const wfNodes = wf.wsGroups.map((gr) => h("div", { key: gr.ws.key },
				h("div", { className: "wfx-group-title" }, h("span", { className: "wfx-group-name" }, gr.ws.title), h("span", { className: "wfx-hint" }, " · " + gr.defs.length)),
				gr.defs.map(wfRow)));
			const wfRest = wf.rest.length > 0 ? h("div", { key: "rest" },
				h("div", { className: "wfx-group-title" }, h("span", { className: "wfx-group-name" }, "工作流库"), h("span", { className: "wfx-hint" }, " · " + wf.rest.length)),
				wf.rest.map(wfRow)) : null;
			const tabBar = h("div", { className: "wfx-tabs" },
				h("button", { type: "button", className: "wfx-tab" + (tab === "session" ? " wfx-tab-on" : ""), onClick: () => setTab("session") }, "会话"),
				h("button", { type: "button", className: "wfx-tab" + (tab === "workflow" ? " wfx-tab-on" : ""), onClick: () => setTab("workflow") }, "工作流"));
			return h("div", { className: "wfx-side" },
				tabBar,
				tab === "session"
					? h("div", null,
						h("div", { className: "wfx-group-title" }, "项目 · 工作流会话 (" + total + ")"),
						total === 0 ? h("div", { className: "wfx-hint", style: { padding: "6px 8px" } }, "暂无工作流会话") : null,
						sessionNodes)
					: h("div", null,
						h("div", { className: "wfx-group-title" }, "工作流 (" + (p.data ? p.data.definitions.length : 0) + ")"),
						(wf.wsGroups.length === 0 && wf.rest.length === 0) ? h("div", { className: "wfx-hint", style: { padding: "6px 8px" } }, "暂无工作流") : null,
						wfNodes,
						wfRest));
		};

		let ctx = null;

		const WorkflowPanel = (p) => {
			const [data, setData] = React.useState(null);
			const [err, setErr] = React.useState("");
			const [scanSeq, setScanSeq] = React.useState(0);
			const [poll, setPoll] = React.useState(0);
			const [view, setView] = React.useState({ kind: "list" });
			const [picker, setPicker] = React.useState(null);
			const rescan = () => setScanSeq((n) => n + 1);
			const refreshLight = () => setPoll((n) => n + 1);
			React.useEffect(() => {
				let alive = true;
				wfxCall("overview", { refresh: true }).then((r) => { if (alive) { setData(r); setErr(""); } }, (e) => { if (alive) setErr(errText(e)); });
				return () => { alive = false; };
			}, [scanSeq]);
			React.useEffect(() => {
				if (poll === 0) return;
				let alive = true;
				wfxCall("overview", { refresh: false }).then((r) => { if (alive) { setData(r); setErr(""); } }, () => {});
				return () => { alive = false; };
			}, [poll]);
			React.useEffect(() => {
				const timer = setInterval(() => setPoll((n) => n + 1), 5000);
				return () => clearInterval(timer);
			}, []);
			const openSession = (sid) => {
				const sessionsSvc = ctx.get("sessions");
				if (sessionsSvc === undefined) return;
				try { sessionsSvc.open(sid); p.onClose(); } catch (e) { setErr(errText(e)); }
			};
			const openDef = (def) => setView({ kind: "detail", def: def });
			const groups = data ? data.groups : [];
			const defs = data ? data.definitions : [];
			const findDef = (id) => { for (const d of defs) if (d.id === id) return d; return null; };

			let mainView = null;
			if (view.kind === "list") {
				mainView = h(ListView, {
					data: data,
					refresh: refreshLight,
					onOpenDef: openDef,
					onCreate: () => setView({ kind: "create" }),
					onAbstract: () => setView({ kind: "abstract" }),
				});
			} else if (view.kind === "detail") {
				mainView = h(DefDetailView, {
					def: view.def, data: data, refreshKey: poll,
					onBack: () => setView({ kind: "list" }),
					onRun: () => setPicker({ mode: "workflow", workspaceId: null, definitionId: view.def.id, goal: "" }),
					onCopy: () => setView({ kind: "create", initial: {
						id: null, name: view.def.name + "-copy", description: view.def.description,
						whenToUse: view.def.whenToUse || "",
						phasesText: defPhasesText(view.def.phases),
						script: view.def.script } }),
					onEdit: () => setView({ kind: "create", initial: {
						id: view.def.id, name: view.def.name, description: view.def.description,
						whenToUse: view.def.whenToUse || "",
						phasesText: defPhasesText(view.def.phases),
						script: view.def.script } }),
					onSave: () => {
						wfxCall("saveFromCall", { sessionId: view.def.source.sessionId, seq: view.def.source.seq }).then((r) => {
							refreshLight();
							if (r && !r.error) setView({ kind: "list" });
						}, () => {});
					},
					onOpenSession: openSession,
					onDelete: () => {
						wfxCall("deleteDef", { id: view.def.id }).then(() => { refreshLight(); setView({ kind: "list" }); }, () => {});
					},
				});
			} else if (view.kind === "create") {
				mainView = h(CreateView, {
					initial: view.initial || null,
					onBack: () => setView({ kind: "list" }),
					onSaved: () => { refreshLight(); setView({ kind: "list" }); },
					onDesign: (goal) => setPicker({ mode: "design", workspaceId: null, definitionId: "", goal: goal }),
				});
			} else {
				mainView = h(AbstractView, {
					data: data,
					onlySessionId: view.sessionId,
					onBack: () => setView({ kind: "list" }),
					onSaved: (id) => { refreshLight(); setView({ kind: "detail", def: findDef(id) || { id: id, name: "已保存", description: "", phases: [], script: "" } }); },
				});
			}

			return h("div", { className: "wfx-screen" },
				h("div", { className: "wfx-topbar" },
					h("div", { className: "wfx-title" }, IcFlow(18), h("span", null, "工作流"), h("span", { className: "wfx-hint" }, "Workflow Studio")),
					err ? h("span", { className: "wfx-error" }, err) : null,
					h("div", { className: "wfx-row" },
						Btn({ primary: true, icon: IcPlus(12), label: "新建会话", onClick: () => setPicker({ mode: "plain", workspaceId: null, definitionId: "", goal: "" }) }),
						Btn({ icon: IcPlus(12), label: "新建工作流", onClick: () => setView({ kind: "create" }) }),
						Btn({ icon: IcDoc(12), label: "从会话抽象", onClick: () => { refreshLight(); setView({ kind: "abstract" }); } }),
						Btn({ ghost: true, iconOnly: true, icon: IcRefresh(14), title: "重新扫描会话", onClick: rescan }),
						Btn({ ghost: true, iconOnly: true, icon: IcClose(16), title: "关闭面板", onClick: p.onClose }))),
				h("div", { className: "wfx-body" },
					h(ProjectSide, { groups: groups, data: data, onOpenSession: openSession, onOpenDef: openDef, onRunIn: (sid) => setPicker({ mode: "workflow", workspaceId: null, definitionId: "", goal: "", targetSessionId: sid }), onCallsIn: (sid) => setView({ kind: "abstract", sessionId: sid }) }),
					h("div", { className: "wfx-main" }, mainView)),
				picker !== null ? h(SessionPicker, {
					state: picker, setState: setPicker, data: data,
					onClose: () => setPicker(null),
					onDone: () => { setPicker(null); refreshLight(); p.onClose(); },
				}) : null);
		};

		const FootButton = (p) => h("button", {
			type: "button",
			className: p.wide ? "wfx-foot" : "wfx-foot wfx-foot-rail",
			onClick: p.onOpen,
			title: "工作流",
			"aria-label": "工作流",
		}, [IcFlow(p.wide ? 15 : 18), p.wide ? h("span", { key: "l", className: "wfx-foot-label" }, "工作流") : null]);

		const OverlayEntry = () => {
			const open = usePanelOpen();
			if (!open) return null;
			return h(WorkflowPanel, { onClose: () => setPanelOpen(false) });
		};

		const inject = ["connection", "slots"];

		function apply(c) {
			ctx = c;
			connectionSvc = c.get("connection");
			const slots = c.get("slots");
			if (slots === undefined) return;
			c.effect(() => slots.inject("sidebar.footer.action", () => slots.register(
				{ name: "sidebar.footer.action", id: "workflow-studio", order: 10, label: "工作流" },
				(props) => h(FootButton, { wide: props.wide !== false, onOpen: () => setPanelOpen(true) }),
			)), "workflow-studio: sidebar entry");
			c.effect(() => slots.inject("shell.overlay", () => slots.register(
				{ name: "shell.overlay", id: "workflow-studio", order: 10, label: "工作流面板" },
				() => h(OverlayEntry, {}),
			)), "workflow-studio: overlay panel");
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
