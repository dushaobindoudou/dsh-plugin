window.__ModuleLoader__.load({
  id: 'dsh-hyperliquid',
  factory(__shellRequire) {
    const module = { exports: {} }
    const exports = module.exports
    const require = (id) => __shellRequire(id)
    /* ── esbuild bundle (react external) ───────────────────────── */
/* eslint-disable */
/**
 * dsh-hyperliquid — client half (web). BUILD ARTIFACT — do not edit.
 * Source of truth: src/client/ (React TSX). Rebuild: npm run build.
 * Bundles TradingView Lightweight Charts (Apache-2.0, lightweight-charts pkg,
 * development condition — unminified, greppable).
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  default: () => index_default,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var React20 = __toESM(require("react"), 1);

// src/client/styles.css
var styles_default = `/**
 * dsh-hyperliquid \u2014 desk styles.
 *
 * Layout note: the shell's center column (\`main\` content area) is a plain
 * flex column WITHOUT position:relative \u2014 an absolutely-positioned root
 * would escape it and cover the sidebar. Stay in normal flow (flex:1).
 * Colors go through --dsw-alias-* theme tokens so the desk follows the
 * shell's light/dark theme; no hashed shell class names are borrowed.
 *
 * Hyperliquid convention: up/buy = green, down/sell = red.
 */

.dhl-root {
  position: relative;
  flex: 1; min-width: 0; min-height: 0;
  display: flex; flex-direction: column;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family, inherit);
  font-size: 13px;
}
.dhl-topbar {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1);
  flex: none;
}
.dhl-brand { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; }
.dhl-market-search { width: 85px; min-width: 0; padding: 4px 6px; font: inherit; font-size: 11px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); border-radius: 5px; }
.dhl-mark { width: 18px; height: 18px; flex: none; }
.dhl-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 1px 8px; border-radius: 999px; font-size: 11px;
  border: 1px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-bg-layer-2);
}
.dhl-badge.paper { color: var(--dsw-alias-state-warn-primary); border-color: var(--dsw-alias-state-warn-primary); }
.dhl-badge.live { color: var(--dsw-alias-state-error-primary); border-color: var(--dsw-alias-state-error-primary); }
.dhl-badge.ok { color: var(--dsw-alias-state-success-primary); }
.dhl-badge.err { color: var(--dsw-alias-state-error-primary); }
.dhl-badge:is(.ok, .err, .paper, .live)::before {
  content: ''; flex: none; width: 6px; height: 6px; border-radius: 50%; background: currentColor;
}
.dhl-wallet-trigger { font: inherit; font-size: 11px; cursor: pointer; white-space: nowrap; }
.dhl-wallet-trigger:hover, .dhl-wallet-trigger:focus-visible { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary); }
.dhl-wallet-modal { width: min(540px, calc(100vw - 32px)); }
.dhl-wallet-address { overflow-wrap: anywhere; font-size: 11px; color: var(--dsw-alias-label-secondary); margin-bottom: 14px; }
.dhl-wallet-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
.dhl-wallet-stats > div { display: grid; gap: 5px; padding: 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 7px; }
.dhl-wallet-stats span, .dhl-wallet-pnl span { color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dhl-wallet-stats strong, .dhl-wallet-pnl strong { font-size: 16px; font-variant-numeric: tabular-nums; }
.dhl-wallet-periods { display: flex; gap: 5px; margin: 16px 0 8px; }
.dhl-wallet-periods button, .dhl-history-controls button { border: 1px solid var(--dsw-alias-border-l1); border-radius: 5px; padding: 4px 8px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; font: inherit; font-size: 11px; }
.dhl-wallet-periods button.on, .dhl-history-controls button.on { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-primary); }
.dhl-wallet-pnl { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.dhl-wallet-graph { width: 100%; height: 120px; margin: 8px 0; color: var(--dsw-alias-brand-primary); border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-top-control { max-width: 105px; padding: 3px 7px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; cursor: pointer; }
.dhl-top-control:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.dhl-network-modal { width: min(440px, calc(100vw - 48px)); }
.dhl-network-modal p { margin: 0; line-height: 1.55; color: var(--dsw-alias-label-secondary); }
.dhl-spacer { flex: 1; }
.dhl-panel-iconbtn { flex: none; display: inline-grid; place-items: center; width: 26px; height: 26px; padding: 0; border: 1px solid transparent; border-radius: 5px; color: var(--dsw-alias-label-secondary); background: transparent; cursor: pointer; }
.dhl-panel-iconbtn:hover, .dhl-panel-iconbtn:focus-visible { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l1); background: var(--dsw-alias-interactive-bg-hover); }
.dhl-panel-rail { flex: 0 0 30px; align-self: stretch; display: flex; align-items: flex-start; justify-content: center; padding: 13px 2px; border: 0; border-right: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); cursor: pointer; }
.dhl-panel-rail:hover { color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dhl-body { flex: 1; display: flex; min-height: 0; }
.dhl-col-sessions {
  width: 232px; min-width: 160px; flex: 0 1 auto;
  border-right: 1px solid var(--dsw-alias-border-l1);
  display: flex; flex-direction: column;
  background: var(--dsw-specific-sidebar-fill);
  min-height: 0;
}
.dhl-col-desk { flex: 1 1 0; min-width: 280px; display: flex; flex-direction: column; overflow-y: auto; }
.dhl-col-chat {
  width: 480px; min-width: 320px; flex: 0 1 auto;
  border-left: 1px solid var(--dsw-alias-border-l1);
  display: flex; flex-direction: column;
  background: var(--dsw-alias-bg-layer-1);
  min-height: 0;
}
.dhl-chatmount { flex: 1; min-height: 0; min-width: 0; position: relative; display: flex; flex-direction: column; overflow: hidden; }
.dhl-chatmount > * { flex: 1; min-height: 0; min-width: 0; }
.dhl-chatmount [data-conversation-content] { flex: 1; min-height: 0; height: 100%; }
.dhl-chatmount [data-conversation-scroll] { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dhl-chatmount [data-composer-seat] { margin-top: auto; }
.dhl-chat-header { flex: none; display: flex; align-items: center; gap: 8px; min-height: 49px; padding: 7px 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-chat-heading { flex: 1; min-width: 0; display: grid; gap: 2px; }
.dhl-chat-heading strong { font-size: 12px; font-weight: 650; }
.dhl-chat-heading span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
.dhl-chat-ticket-toggle { flex: none; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; background: transparent; color: var(--dsw-alias-label-secondary); padding: 5px 9px; font: inherit; font-size: 11px; cursor: pointer; }
.dhl-chat-ticket-toggle:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dhl-chat-prompts { flex: none; display: flex; gap: 6px; padding: 8px 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-chat-prompts button { border: 1px solid var(--dsw-alias-border-l1); border-radius: 999px; background: transparent; color: var(--dsw-alias-label-secondary); padding: 4px 9px; font: inherit; font-size: 10.5px; cursor: pointer; }
.dhl-chat-prompts button:hover { color: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }
.dhl-chat-unavailable { margin: 18px; padding: 13px 14px; border: 1px solid var(--dsw-alias-state-warn-primary); border-radius: 8px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.6; }
.dhl-col-head {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 12px; font-size: 12px;
  color: var(--dsw-alias-label-secondary);
  flex: none; letter-spacing: .02em;
}
.dhl-newbtn {
  margin: 0 10px 8px; padding: 6px 10px; border-radius: 8px;
  border: 1px dashed var(--dsw-alias-border-l2);
  background: transparent; color: var(--dsw-alias-label-secondary);
  cursor: pointer; font-size: 12px; text-align: center;
}
.dhl-newbtn:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-brand-primary); }
.dhl-srow {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 12px; cursor: pointer;
  border-left: 2px solid transparent; min-width: 0; position: relative;
}
.dhl-srow:hover { background: var(--dsw-alias-bg-layer-2); }
.dhl-srow.active { background: var(--dsw-alias-bg-layer-2); border-left-color: var(--dsw-alias-brand-primary); }
.dhl-srow .coin {
  font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary);
  flex: none; min-width: 34px; text-align: center;
}
.dhl-srow.active .coin { background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-bg-base); }
.dhl-srow .title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.dhl-srow .t { color: var(--dsw-alias-label-secondary); font-size: 10px; flex: none; }
/* Row actions overlay the timestamp, so hovering never changes row height or reflows the title. */
.dhl-srow-actions { position: absolute; top: 50%; right: 8px; display: flex; gap: 2px; padding-left: 6px; transform: translateY(-50%); background: var(--dsw-alias-bg-layer-2); visibility: hidden; }
.dhl-srow:hover .dhl-srow-actions, .dhl-srow:focus-within .dhl-srow-actions { visibility: visible; }
.dhl-srow:hover .t, .dhl-srow:focus-within .t { visibility: hidden; }
.dhl-srow-action { flex: none; display: inline-grid; place-items: center; width: 21px; height: 21px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; font: inherit; }
.dhl-srow-action:hover, .dhl-srow-action:focus-visible { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dhl-rename-modal { width: min(440px, calc(100vw - 48px)); }
.dhl-rename-input { display: block; width: 100%; box-sizing: border-box; padding: 9px 11px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; outline: none; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; }
.dhl-rename-input:focus { border-color: var(--dsw-alias-brand-primary); }
.dhl-modal-secondary, .dhl-modal-primary { padding: 7px 15px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l2); background: transparent; color: var(--dsw-alias-label-primary); cursor: pointer; font: inherit; }
.dhl-modal-primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-bg-base); }
.dhl-modal-primary:disabled { opacity: .5; cursor: default; }
.dhl-coinline { display: flex; align-items: center; gap: 10px; padding: 10px 14px 4px; flex-wrap: wrap; }
.dhl-select {
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px;
  padding: 4px 8px; font-size: 13px; outline: none;
}
.dhl-pxbig { font-size: 22px; font-weight: 700; font-variant-numeric: tabular-nums; }
.dhl-up { color: var(--dsw-alias-state-success-primary); }
.dhl-down { color: var(--dsw-alias-state-error-primary); }
.dhl-meta { color: var(--dsw-alias-label-secondary); font-size: 11px; font-variant-numeric: tabular-nums; }
.dhl-chart { padding: 4px 14px 10px; }
.dhl-chartbox { width: 100%; height: 260px; position: relative; }
.dhl-book { display: flex; gap: 14px; padding: 0 14px 10px; }
.dhl-card {
  flex: 1; min-width: 0;
  background: var(--dsw-alias-bg-layer-1);
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px; padding: 8px 10px;
}
.dhl-card h4 {
  margin: 0 0 6px; font-size: 11px; font-weight: 600;
  color: var(--dsw-alias-label-secondary);
  letter-spacing: .04em; text-transform: uppercase;
}
.dhl-lvl {
  display: flex; justify-content: space-between;
  font-size: 11.5px; font-variant-numeric: tabular-nums;
  position: relative; padding: 1px 4px; border-radius: 3px; overflow: hidden;
}
.dhl-lvl .bar { position: absolute; right: 0; top: 0; bottom: 0; opacity: .13; background: var(--dsw-alias-label-primary); pointer-events: none; }
.dhl-lvl span { position: relative; }
.dhl-lvl .px { cursor: pointer; border-radius: 3px; padding: 0 3px; }
.dhl-lvl .px:hover { background: var(--dsw-alias-interactive-bg-hover); outline: 1px solid var(--dsw-alias-border-l2); }
.dhl-bookhead {
  color: var(--dsw-alias-label-secondary); font-size: 9.5px;
  text-transform: uppercase; letter-spacing: .05em;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  padding-bottom: 2px; margin-bottom: 2px;
}
.dhl-tab {
  background: transparent; border: none; border-bottom: 2px solid transparent;
  color: var(--dsw-alias-label-secondary); font-size: 12px; font-weight: 500;
  padding: 5px 10px; cursor: pointer;
}
.dhl-tab:hover { color: var(--dsw-alias-label-primary); }
.dhl-tab.on { color: var(--dsw-alias-label-primary); border-bottom-color: var(--dsw-alias-brand-primary); }
.dhl-banner {
  margin: 2px 14px 10px; padding: 7px 12px; border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary);
  font-size: 12px; display: flex; gap: 8px; align-items: center;
}
.dhl-banner b { color: var(--dsw-alias-label-primary); }
.dhl-posrow {
  display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr;
  font-size: 11.5px; font-variant-numeric: tabular-nums;
  padding: 3px 0; border-bottom: 1px solid var(--dsw-alias-border-l1);
}
.dhl-positions-table { overflow-x: auto; }
.dhl-posrow-position { min-width: 660px; grid-template-columns: 1.1fr .9fr 1fr 1fr 1fr .85fr 1fr; gap: 7px; }
.dhl-position-extra { display: flex; flex-wrap: wrap; gap: 5px 16px; min-width: 660px; padding: 4px 0 7px; border-bottom: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); font-size: 10.5px; font-variant-numeric: tabular-nums; }
.dhl-account-warning { margin-bottom: 7px; padding: 6px 8px; border-radius: 5px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-state-warn-primary); font-size: 11px; }
.dhl-poshead { color: var(--dsw-alias-label-secondary); font-size: 10px; text-transform: uppercase; letter-spacing: .04em; }
.dhl-order-action { display: flex; align-items: center; gap: 6px; min-width: 0; }
.dhl-order-action .dhl-ghost { padding: 1px 6px; border-radius: 5px; }
.dhl-ghost {
  background: transparent; color: var(--dsw-alias-label-secondary);
  border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px;
  padding: 5px 10px; font-size: 11.5px; cursor: pointer;
}
.dhl-ghost:hover { color: var(--dsw-alias-label-primary); }
.dhl-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: var(--dsw-alias-label-secondary); text-align: center;
  padding: 20px; font-size: 12.5px; line-height: 1.7;
}
/* Toast stack floating just under the topbar; never takes layout space. */
.dhl-toasts {
  position: absolute; z-index: 25; top: 48px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  width: max-content; max-width: min(560px, calc(100% - 32px));
  pointer-events: none;
}
.dhl-notice, .dhl-data-warning {
  pointer-events: auto; box-sizing: border-box; max-width: 100%;
  padding: 7px 12px; border-radius: 7px; font-size: 12px; line-height: 1.5;
  color: var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-1);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, var(--dsw-alias-border-l2));
  box-shadow: 0 8px 24px color-mix(in srgb, var(--dsw-alias-bg-base) 55%, transparent);
  animation: dhl-toast-in .16s ease-out;
}
.dhl-notice { display: flex; gap: 8px; align-items: center; cursor: pointer; }
@keyframes dhl-toast-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .dhl-notice, .dhl-data-warning { animation: none; } }
.dhl-entrymark { display: inline-flex; color: inherit; }

/* \u2500\u2500 draggable dividers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dhl-divider {
  flex: none; width: 5px; cursor: col-resize;
  position: relative; touch-action: none; z-index: 2;
  background: transparent;
}
.dhl-divider:hover, .dhl-divider.dragging { background: var(--dsw-alias-border-l2); }
/* While dragging: kill text selection and pin the resize cursor app-wide. */
body:has(.dhl-divider.dragging) { user-select: none; cursor: col-resize; }
body:has(.dhl-divider.dragging) * { cursor: col-resize !important; }

/* Market workspace: exchange density within DSH's session-first shell. */
.dhl-col-desk { container-type: inline-size; overflow-y: auto; }
.dhl-market-strip {
  display: flex; align-items: center; gap: 16px; min-width: 0;
  padding: 13px 16px; border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1);
}
.dhl-market-name { display: flex; align-items: center; gap: 8px; flex: none; }
.dhl-market-name .dhl-select { font-size: 16px; font-weight: 650; border: 0; background: transparent; padding: 3px 6px; max-width: 205px; }
.dhl-market-tag { font-size: 10px; font-weight: 600; color: var(--dsw-alias-brand-primary); white-space: nowrap; }
.dhl-market-stats { flex: 1; min-width: 0; display: grid; grid-template-columns: repeat(6, minmax(72px, 1fr)); gap: 10px; }
.dhl-market-stat { min-width: 0; font-variant-numeric: tabular-nums; }
.dhl-market-stat > span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-secondary); font-size: 10px; }
.dhl-market-stat > strong { display: block; margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; font-weight: 600; }
.dhl-market-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 290px; align-items: start; min-width: 0; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-chart-panel { min-width: 0; }
.dhl-chart-tabs, .dhl-tape-tabs { display: flex; gap: 2px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-chart-tabs button, .dhl-tape-tabs button {
  appearance: none; border: 0; border-bottom: 2px solid transparent; border-radius: 0;
  padding: 11px 15px 10px; background: transparent; color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 12px; font-weight: 550; cursor: pointer;
}
.dhl-chart-tabs button:hover, .dhl-tape-tabs button:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dhl-chart-tabs button.on, .dhl-tape-tabs button.on { color: var(--dsw-alias-brand-primary); border-bottom-color: var(--dsw-alias-brand-primary); }
.dhl-chart-tools { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 11px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-intervals, .dhl-chart-indicators { display: flex; align-items: center; gap: 3px; }
.dhl-chart-tools button { border: 0; border-radius: 5px; background: transparent; color: var(--dsw-alias-label-secondary); padding: 4px 6px; font: inherit; font-size: 11px; cursor: pointer; white-space: nowrap; }
.dhl-chart-tools button:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dhl-chart-tools button.on { color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent); }
.dhl-chart-actions { display: flex; align-items: center; gap: 3px; }
.dhl-chart-actions button:disabled { opacity: .4; cursor: default; }
.dhl-layer-menu { position: relative; font-size: 11px; color: var(--dsw-alias-label-secondary); }
.dhl-layer-menu summary { cursor: pointer; padding: 4px 6px; white-space: nowrap; }
.dhl-layer-popover { position: absolute; z-index: 12; top: 100%; right: 0; display: grid; gap: 9px; min-width: 110px; padding: 11px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 7px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 8px 22px rgba(0,0,0,.18); }
.dhl-layer-popover label { display: flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap; }
.dhl-chart-trade-detail { position: absolute; right: 12px; top: 40px; z-index: 3; width: min(260px, 45%); max-height: 180px; overflow: auto; padding: 8px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 7px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 6px 18px rgba(0,0,0,.14); pointer-events: none; font-size: 10px; }
.dhl-chart-trade-detail > div { display: grid; gap: 3px; padding: 3px 0; }
.dhl-chart-trade-detail > div + div { border-top: 1px solid var(--dsw-alias-border-l1); }
.dhl-chart-trade-detail span { color: var(--dsw-alias-label-secondary); overflow-wrap: anywhere; }
.dhl-chart-action-separator { width: 1px; height: 20px; margin: 0 4px; background: var(--dsw-alias-border-l1); }
.dhl-chart-tools .dhl-chart-iconbtn { display: grid; place-items: center; width: 28px; height: 28px; padding: 4px; }
.dhl-chart-iconbtn svg { width: 17px; height: 17px; }
.dhl-chart-panel-expanded { position: fixed; z-index: 29; inset: 18px; display: flex; flex-direction: column; min-width: 0; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 20px 80px color-mix(in srgb, var(--dsw-alias-bg-base) 65%, transparent); }
.dhl-chart-panel-expanded > [role="tabpanel"] { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.dhl-chart-panel-expanded .dhl-chart { flex: 1; min-height: 0; }
.dhl-chart { padding: 8px 8px 10px; }
.dhl-chartbox { height: 350px; }
.dhl-inline-error { padding: 8px 12px; color: var(--dsw-alias-state-error-primary); font-size: 11px; }
.dhl-tape { min-width: 0; border-left: 1px solid var(--dsw-alias-border-l1); }
.dhl-tape-tabs button { flex: 1; }
.dhl-tape-content { max-height: 426px; overflow-y: auto; }
.dhl-tape .dhl-card { border: 0; border-radius: 0; padding: 7px 8px; background: transparent; }
.dhl-tape .dhl-card h4 { display: none; }
.dhl-tape .dhl-lvl { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .8fr) minmax(0, .9fr); align-items: center; gap: 2px; padding: 3px 5px; border-radius: 0; line-height: 1.45; }
.dhl-tape .dhl-lvl > span:nth-child(n+3) { text-align: right; }
.dhl-tape .dhl-lvl .bar { width: 0; right: 0; opacity: .11; }
.dhl-tape .dhl-lvl .bar.bid { background: var(--dsw-alias-state-success-primary); }
.dhl-tape .dhl-lvl .bar.ask { background: var(--dsw-alias-state-error-primary); }
.dhl-tape .dhl-lvl .px { justify-self: start; border: 0; background: transparent; font: inherit; font-variant-numeric: tabular-nums; padding: 0 2px; text-align: left; cursor: pointer; }
.dhl-tape .dhl-bookhead { padding-bottom: 6px; margin-bottom: 4px; }
.dhl-spread-row { display: flex; justify-content: space-between; gap: 6px; padding: 6px 7px; margin: 3px -8px; font-size: 10px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); font-variant-numeric: tabular-nums; }
.dhl-spread-row strong { color: var(--dsw-alias-label-primary); }
.dhl-funding-panel { min-height: 405px; }
.dhl-funding-summary { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px; padding: 14px 16px; border-bottom: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dhl-funding-summary strong { color: var(--dsw-alias-brand-primary); font-size: 20px; font-variant-numeric: tabular-nums; }
.dhl-funding-list { max-height: 350px; overflow: auto; }
.dhl-funding-row { display: flex; justify-content: space-between; gap: 10px; padding: 6px 16px; border-bottom: 1px solid var(--dsw-alias-border-l1); font-size: 11.5px; font-variant-numeric: tabular-nums; }
.dhl-desk-foot { padding-top: 12px; }
.dhl-banner { border-radius: 4px; }
.dhl-banner-signal { width: 6px; height: 6px; border-radius: 50%; flex: none; background: var(--dsw-alias-brand-primary); }

/* The ticket is an intent editor, with explicit validation and review. */
.dhl-ticket { flex: 1; min-height: 0; overflow-y: auto; padding: 14px 16px 20px; font-size: 12px; }
.dhl-ticket-mode { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.dhl-ticket-mode label { display: grid; gap: 5px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
.dhl-ticket-mode select, .dhl-ticket-field > div, .dhl-ticket-targets input {
  width: 100%; min-width: 0; border: 1px solid var(--dsw-alias-border-l1); border-radius: 7px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font: inherit;
}
.dhl-ticket-mode select { padding: 8px 10px; }
.dhl-ticket-tabs { display: flex; gap: 4px; margin: 17px 0 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-ticket-tabs button { border: 0; border-bottom: 2px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary); padding: 8px 12px; font: inherit; cursor: pointer; }
.dhl-ticket-tabs button.on { color: var(--dsw-alias-brand-primary); border-bottom-color: var(--dsw-alias-brand-primary); }
.dhl-ticket-sides { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 17px; }
.dhl-ticket-sides button { border: 0; border-radius: 6px; padding: 10px 6px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font: inherit; font-weight: 600; cursor: pointer; }
.dhl-ticket-sides button.buy.on { background: var(--dsw-alias-state-success-primary); color: var(--dsw-alias-bg-base); }
.dhl-ticket-sides button.sell.on { background: var(--dsw-alias-state-error-primary); color: var(--dsw-alias-bg-base); }
.dhl-ticket-balance { display: flex; justify-content: space-between; gap: 10px; margin: 8px 0; color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dhl-ticket-balance strong { color: var(--dsw-alias-label-primary); font-weight: 550; font-variant-numeric: tabular-nums; }
.dhl-ticket-field { display: grid; gap: 6px; margin-top: 14px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dhl-ticket-field > div { display: flex; align-items: center; gap: 7px; padding: 0 10px; }
.dhl-ticket-field input { width: 100%; min-width: 0; border: 0; outline: 0; padding: 10px 0; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; font-variant-numeric: tabular-nums; }
.dhl-ticket-field small { color: var(--dsw-alias-label-secondary); white-space: nowrap; }
.dhl-ticket-reason { display: grid; gap: 6px; margin-top: 14px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dhl-ticket-reason textarea { width: 100%; box-sizing: border-box; resize: vertical; min-height: 64px; padding: 9px 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; }
.dhl-ticket-reason textarea:focus { outline: 1px solid var(--dsw-alias-brand-primary); }
.dhl-history-controls { display: flex; gap: 5px; align-items: center; padding: 3px 0 8px; }
.dhl-history-controls .dhl-history-refresh { margin-left: auto; }
.dhl-history-detail { display: flex; flex-wrap: wrap; gap: 3px 12px; padding: 0 8px 7px; color: var(--dsw-alias-label-secondary); font-size: 10px; }
.dhl-history-detail span:last-child { overflow-wrap: anywhere; }
.dhl-history-more { display: block; margin: 9px auto; padding: 6px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 5px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; cursor: pointer; }
.dhl-ticket-range { display: flex; align-items: center; gap: 12px; margin: 15px 0; }
.dhl-ticket-range input { flex: 1; min-width: 0; accent-color: var(--dsw-alias-brand-primary); }
.dhl-ticket-range output { min-width: 40px; padding: 5px; text-align: center; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; font-variant-numeric: tabular-nums; }
.dhl-ticket-check { display: flex; align-items: center; gap: 8px; margin: 10px 0; cursor: pointer; }
.dhl-ticket-check input { accent-color: var(--dsw-alias-brand-primary); }
.dhl-ticket-targets { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
.dhl-ticket-targets label { display: grid; gap: 5px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
.dhl-ticket-targets input { padding: 8px 9px; }
.dhl-ticket-enable, .dhl-ticket-submit { width: 100%; border: 0; border-radius: 6px; padding: 11px; margin: 14px 0 4px; background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-bg-base); font: inherit; font-size: 12px; font-weight: 650; cursor: pointer; }
.dhl-ticket-submit:disabled { cursor: not-allowed; opacity: .48; }
.dhl-ticket-validation { color: var(--dsw-alias-state-warn-primary); font-size: 10.5px; margin: 3px 0 8px; }
.dhl-ticket-summary { display: grid; gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--dsw-alias-border-l1); }
.dhl-ticket-summary div { display: flex; justify-content: space-between; gap: 8px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
.dhl-ticket-summary strong { color: var(--dsw-alias-label-primary); font-weight: 550; font-variant-numeric: tabular-nums; }
.dhl-ticket-note { margin: 14px 0 0; color: var(--dsw-alias-label-secondary); font-size: 10.5px; line-height: 1.6; }
.dhl-root button:focus-visible, .dhl-root select:focus-visible, .dhl-root input:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }

@container (max-width: 740px) {
  .dhl-market-strip { display: block; }
  .dhl-market-stats { margin-top: 9px; }
  .dhl-market-workspace { grid-template-columns: 1fr; }
  .dhl-tape { border-left: 0; border-top: 1px solid var(--dsw-alias-border-l1); }
  .dhl-tape-content { max-height: 260px; }
}

/* Market desk: Hyperliquid's dense exchange interactions, on DSH theme tokens. */
.dhl-market-strip { flex: none; position: relative; min-height: 76px; gap: 18px; padding: 12px 16px; }
.dhl-market-name { gap: 7px; }
.dhl-market-trigger { display: inline-flex; align-items: center; gap: 10px; max-width: 250px; min-width: 0; border: 0; padding: 5px 2px; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; cursor: pointer; }
.dhl-market-trigger:hover { color: var(--dsw-alias-brand-primary); }
.dhl-market-trigger strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 19px; font-weight: 600; letter-spacing: -.035em; }
.dhl-market-icon { position: relative; display: inline-flex; flex: none; align-items: center; justify-content: center; width: 20px; height: 20px; overflow: hidden; border-radius: 50%; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); }
.dhl-market-icon-small { width: 18px; height: 18px; }
.dhl-market-icon-fallback { font-size: 9px; font-weight: 700; letter-spacing: -.04em; line-height: 1; }
.dhl-market-icon img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; opacity: 0; }
.dhl-market-icon img.loaded { opacity: 1; }
.dhl-market-chevron { color: var(--dsw-alias-label-secondary); font-size: 19px; transform: translateY(-3px); }
.dhl-market-kind, .dhl-market-tag, .dhl-market-readonly { border-radius: 4px; padding: 3px 5px; white-space: nowrap; color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); font-size: 10px; font-weight: 650; }
.dhl-market-readonly { color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-2); }
.dhl-market-stat > span { font-size: 11px; }
.dhl-market-stat > strong { font-size: 13px; font-weight: 550; }
.dhl-market-stats { gap: 14px; }
.dhl-chart-tabs button, .dhl-tape-tabs button { padding-top: 13px; padding-bottom: 12px; font-size: 13px; }
.dhl-chart-tools { min-height: 42px; }
.dhl-chartbox { height: 410px; }
.dhl-chart-ohlc { position: absolute; z-index: 1; top: 6px; left: 10px; display: flex; flex-wrap: wrap; gap: 4px 10px; pointer-events: none; color: var(--dsw-alias-label-secondary); font-size: 10px; font-variant-numeric: tabular-nums; }
.dhl-chart-ohlc b { font-weight: 550; }
.dhl-chart-annotations { position: absolute; z-index: 1; right: 56px; top: 25px; display: flex; flex-direction: column; align-items: flex-end; gap: 3px; max-width: 45%; pointer-events: none; font-size: 10px; }
.dhl-chart-annotations span { padding: 2px 5px; border-radius: 3px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.dhl-chart-annotations .role-support { color: var(--dsw-alias-state-success-primary); }
.dhl-chart-annotations .role-resistance { color: var(--dsw-alias-state-error-primary); }
.dhl-chart-draw-hint { padding: 6px 12px; color: var(--dsw-alias-brand-primary); font-size: 11px; border-top: 1px solid var(--dsw-alias-border-l1); }
.dhl-chart-click-hint { padding: 5px 8px 0; color: var(--dsw-alias-label-secondary); font-size: 10.5px; line-height: 1.4; }
.dhl-chart-mark-list { display: flex; flex-wrap: wrap; gap: 5px; padding: 5px 10px; border-top: 1px solid var(--dsw-alias-border-l1); }
.dhl-chart-mark-list span { display: inline-flex; align-items: center; gap: 4px; padding: 2px 5px; font-size: 11px; color: var(--dsw-alias-label-secondary); border: 1px solid var(--dsw-alias-border-l1); border-radius: 4px; }
.dhl-chart-mark-list button { border: 0; background: transparent; color: inherit; cursor: pointer; font-size: 15px; line-height: 1; }
.dhl-chart-mark-list button:hover { color: var(--dsw-alias-state-error-primary); }
.dhl-indicator-menu { position: relative; flex: 0 0 auto; }
.dhl-indicator-menu summary { display: flex; align-items: center; gap: 5px; padding: 5px 7px; border-radius: 5px; color: var(--dsw-alias-label-secondary); font-size: 11px; cursor: pointer; list-style: none; white-space: nowrap; }
.dhl-indicator-menu summary::-webkit-details-marker { display: none; }
.dhl-indicator-menu summary:hover, .dhl-indicator-menu[open] summary { color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dhl-indicator-count { display: grid; place-items: center; min-width: 16px; height: 16px; padding: 0 3px; border-radius: 4px; background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); color: var(--dsw-alias-brand-primary); font-size: 10px; }
.dhl-indicator-popover { position: absolute; z-index: 10; top: calc(100% + 7px); right: 0; width: 236px; padding: 7px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 7px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 12px 32px color-mix(in srgb, var(--dsw-alias-bg-base) 50%, transparent); }
.dhl-indicator-popover > strong { display: block; padding: 5px 8px 8px; color: var(--dsw-alias-label-secondary); font-size: 11px; font-weight: 600; }
.dhl-chart-tools .dhl-indicator-popover button { display: flex; align-items: center; gap: 9px; width: 100%; padding: 7px 8px; text-align: left; }
.dhl-indicator-popover button > span:last-child { display: flex; flex-direction: column; gap: 2px; }
.dhl-indicator-popover button b { color: var(--dsw-alias-label-primary); font-size: 11px; font-weight: 600; }
.dhl-indicator-popover button small { color: var(--dsw-alias-label-secondary); font-size: 10px; }
.dhl-indicator-check { display: grid; place-items: center; flex: 0 0 15px; width: 15px; height: 15px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 3px; color: var(--dsw-alias-brand-primary); }
.dhl-indicator-popover button.on .dhl-indicator-check { border-color: var(--dsw-alias-brand-primary); }
.dhl-chart-study-legend { position: absolute; z-index: 1; left: 10px; bottom: 29px; display: flex; flex-wrap: wrap; gap: 4px 12px; padding: 3px 5px; border-radius: 3px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); font-size: 10px; pointer-events: none; }
.dhl-chart-study-legend b { color: var(--dsw-alias-label-primary); font-weight: 600; }
.dhl-interval-more { width: 49px; border: 0; border-radius: 4px; padding: 4px 2px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; cursor: pointer; }
.dhl-market-workspace { grid-template-columns: minmax(0, 1fr) 330px; }
.dhl-tape-content { max-height: 492px; }
.dhl-tape .dhl-lvl { font-size: 12px; padding-top: 4px; padding-bottom: 4px; }
.dhl-tape .dhl-bookhead { font-size: 10px; padding-top: 3px; padding-bottom: 7px; }
.dhl-book-options { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 3px 5px 8px; color: var(--dsw-alias-label-secondary); font-size: 10px; }
.dhl-book-options label { display: flex; align-items: center; gap: 7px; }
.dhl-book-options select { max-width: 85px; padding: 3px 5px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 4px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font: inherit; cursor: pointer; }
.dhl-book-options > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dhl-book-wait { min-height: 120px; display: grid; place-items: center; padding: 12px; color: var(--dsw-alias-label-secondary); font-size: 11px; text-align: center; }

.dhl-picker-modal { width: min(1050px, calc(100vw - 48px)); max-height: min(760px, calc(100vh - 64px)); padding: 0; gap: 0; border-radius: 0 !important; overflow: hidden; }
.dhl-picker-modal .dhl-picker { width: 100%; max-height: min(760px, calc(100vh - 64px)); border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.dhl-picker { width: min(1050px, 100%); max-height: min(720px, 82vh); display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2); border-radius: 9px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); box-shadow: 0 24px 70px color-mix(in srgb, var(--dsw-alias-bg-base) 72%, transparent); font-size: 12px; }
.dhl-picker-top { display: flex; align-items: center; gap: 12px; padding: 16px 18px 11px; }
.dhl-picker-search { flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px; height: 37px; padding: 0 11px; border: .5px solid var(--dsw-alias-border-l4); border-radius: var(--dsw-radius-md, 8px); color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); }
.dhl-picker-search:focus-within { border-color: var(--dsw-alias-state-business-primary); }
.dhl-picker-search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; }
.dhl-picker-search kbd { padding: 2px 5px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 3px; font: inherit; font-size: 10px; }
.dhl-picker-mode { display: flex; gap: 2px; padding: 3px; border-radius: 5px; background: var(--dsw-alias-bg-layer-2); }
.dhl-picker-mode button, .dhl-picker-close { border: 0; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; cursor: pointer; }
.dhl-picker-mode button { padding: 6px 10px; }
.dhl-picker-mode button.on { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); }
.dhl-picker-close { width: 29px; height: 29px; font-size: 22px; line-height: 1; }
.dhl-picker-close:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dhl-picker-readonly-note { margin: 0; padding: 0 18px 9px; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.45; }
.dhl-picker-tabs { flex: none; display: flex; gap: 0; overflow-x: auto; padding: 0 14px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-picker-tabs button { flex: none; padding: 10px 12px; border: 0; border-bottom: 2px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; cursor: pointer; }
.dhl-picker-tabs button:hover { color: var(--dsw-alias-label-primary); }
.dhl-picker-tabs button.on { border-bottom-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-primary); }
.dhl-picker-tablehead, .dhl-picker-row { display: grid; grid-template-columns: 32px minmax(155px, 1.4fr) repeat(5, minmax(86px, 1fr)); align-items: center; column-gap: 8px; padding: 0 16px; font-variant-numeric: tabular-nums; }
.dhl-picker-tablehead { flex: none; min-height: 35px; color: var(--dsw-alias-label-secondary); border-bottom: 1px solid var(--dsw-alias-border-l1); }
.dhl-picker-tablehead button { border: 0; padding: 0; background: transparent; color: inherit; font: inherit; text-align: right; cursor: pointer; }
.dhl-picker-tablehead button:nth-child(2) { text-align: left; }
.dhl-picker-tablehead button:hover { color: var(--dsw-alias-label-primary); }
.dhl-picker-list { min-height: 150px; overflow-y: auto; overscroll-behavior: contain; }
.dhl-picker-row { min-height: 39px; border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, transparent); }
.dhl-picker-row:hover, .dhl-picker-row.cursor { background: var(--dsw-alias-interactive-bg-hover); }
.dhl-picker-row.active { box-shadow: inset 2px 0 var(--dsw-alias-brand-primary); }
.dhl-picker-row > span { text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dhl-picker-star, .dhl-picker-market { border: 0; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; cursor: pointer; }
.dhl-picker-star { padding: 0; color: var(--dsw-alias-label-secondary); font-size: 19px; }
.dhl-picker-star.on { color: var(--dsw-alias-brand-primary); }
.dhl-picker-market { display: flex; align-items: center; gap: 7px; min-width: 0; padding: 7px 0; text-align: left; }
.dhl-picker-market strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; font-weight: 650; }
.dhl-picker-market small { flex: none; color: var(--dsw-alias-label-secondary); font-size: 9px; }
.dhl-picker-empty { padding: 28px 16px; color: var(--dsw-alias-label-secondary); text-align: center; }
.dhl-picker-foot { flex: none; display: flex; justify-content: space-between; gap: 12px; padding: 9px 17px; border-top: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); font-size: 10px; }
@container (max-width: 740px) {
  .dhl-market-strip { display: grid; grid-template-columns: minmax(0, 1fr) 26px; gap: 10px 6px; align-items: start; }
  .dhl-market-name { grid-column: 1; }
  .dhl-market-stats { grid-column: 1 / -1; grid-row: 2; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 0; gap: 9px 12px; }
  .dhl-market-strip > .dhl-panel-iconbtn { grid-column: 2; grid-row: 1; }
  .dhl-market-workspace { grid-template-columns: 1fr; }
  .dhl-tape-content { max-height: 300px; }
  .dhl-chartbox { height: 330px; }
  .dhl-chart-tools { flex-wrap: wrap; gap: 4px; }
  .dhl-intervals, .dhl-chart-actions { width: 100%; min-width: 0; flex-wrap: wrap; justify-content: flex-start; }
  .dhl-indicator-popover, .dhl-layer-popover { left: 0; right: auto; }
  .dhl-chart-panel-expanded .dhl-chart-tools { flex-wrap: nowrap; }
  .dhl-chart-panel-expanded .dhl-intervals, .dhl-chart-panel-expanded .dhl-chart-actions { width: auto; flex-wrap: nowrap; }
}
@media (max-width: 780px) {
  .dhl-picker-modal { width: calc(100vw - 16px); }
  .dhl-picker-tablehead, .dhl-picker-row { grid-template-columns: 25px minmax(135px, 1.5fr) repeat(3, minmax(72px, 1fr)); gap: 5px; padding: 0 9px; }
  .dhl-picker-tablehead > :nth-last-child(-n+2), .dhl-picker-row > :nth-last-child(-n+2) { display: none; }
  .dhl-picker-foot span:first-child { display: none; }
}

/* Book / trades pinned below the chart regardless of desk width. */
.dhl-market-workspace.dhl-tape-below { grid-template-columns: minmax(0, 1fr); }
.dhl-tape-below .dhl-tape { border-left: 0; border-top: 1px solid var(--dsw-alias-border-l1); }
.dhl-tape-below .dhl-tape-content { max-height: 320px; }

/* Topbar "more" menu: network, paper/live account and desk layout. */
.dhl-more { position: relative; }
.dhl-more-trigger { min-width: 28px; line-height: 1; font-size: 14px; }
.dhl-more-popover { position: absolute; z-index: 30; top: calc(100% + 6px); right: 0; display: grid; gap: 12px; width: 220px; padding: 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 12px 32px color-mix(in srgb, var(--dsw-alias-bg-base) 50%, transparent); }
.dhl-more-group { display: grid; gap: 6px; }
.dhl-more-group > span { color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dhl-segment { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 2px; padding: 2px; border-radius: 6px; background: var(--dsw-alias-bg-layer-2); }
.dhl-segment button { padding: 5px 6px; border: 0; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11.5px; cursor: pointer; white-space: nowrap; }
.dhl-segment button:hover:not(:disabled) { color: var(--dsw-alias-label-primary); }
.dhl-segment button.on { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-weight: 600; }
.dhl-segment button:disabled { cursor: not-allowed; opacity: .5; }

/* Left-edge history paging status. */
.dhl-chart-older { position: absolute; z-index: 2; left: 10px; top: 26px; padding: 3px 7px; border-radius: 4px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); font-size: 10.5px; pointer-events: none; }

/* Trading limits vs wallet signing: two separate rule sets. */
.dhl-more-link { padding: 6px 2px 0; border: 0; border-top: 1px solid var(--dsw-alias-border-l1); background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11.5px; text-align: left; cursor: pointer; }
.dhl-more-link:hover { color: var(--dsw-alias-brand-primary); }
.dhl-limits-modal { width: min(520px, calc(100vw - 48px)); }
.dhl-limits-section + .dhl-limits-section { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--dsw-alias-border-l1); }
.dhl-limits-section h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; font-size: 13px; font-weight: 600; }
.dhl-limits-section .dhl-ticket-note { margin-top: 10px; }
`;

// src/client/locale.ts
var NS = "dsh-hyperliquid";
var DICT = {
  zh: {
    "app.title": "Hyperliquid \u4EA4\u6613\u53F0",
    "app.suffix": "\u4EA4\u6613\u53F0",
    "sessions.title": "\u4EA4\u6613\u4F1A\u8BDD",
    "sessions.new": "\u65B0\u5EFA\u4EA4\u6613\u4F1A\u8BDD",
    "sessions.empty": "\u8FD8\u6CA1\u6709\u4EA4\u6613\u4F1A\u8BDD\u3002\n\u70B9\u51FB\u4E0A\u65B9\u65B0\u5EFA\uFF0C\u5F00\u4E00\u4E2A\u4E13\u5C5E\u4EA4\u6613\u5BF9\u8BDD\u3002",
    "session.createFailed": "\u521B\u5EFA\u4EA4\u6613\u4F1A\u8BDD\u5931\u8D25",
    "book.title": "\u76D8\u53E3",
    "book.waiting": "\u7B49\u5F85\u4E0A\u6E38\u884C\u60C5\u2026",
    "book.clickHint": "\u586B\u5165\u4EA4\u6613\u7968\u636E",
    "book.price": "\u4EF7\u683C",
    "book.size": "\u6570\u91CF",
    "book.total": "\u7D2F\u8BA1",
    "book.spread": "\u4EF7\u5DEE",
    "trades.title": "\u6700\u8FD1\u6210\u4EA4",
    "tab.positions": "\u6301\u4ED3",
    "tab.orders": "\u59D4\u6258\u4E0E\u6210\u4EA4",
    "tab.account": "\u8D26\u6237",
    "orders.coin": "\u5408\u7EA6",
    "orders.side": "\u65B9\u5411",
    "orders.px": "\u4EF7\u683C",
    "orders.sz": "\u6570\u91CF",
    "orders.status": "\u72B6\u6001",
    "orders.none": "\uFF08\u6682\u65E0\u59D4\u6258\u4E0E\u6210\u4EA4\uFF09",
    "orders.open": "\u6302\u5355\u4E2D",
    "side.buy": "\u4E70",
    "side.sell": "\u5356",
    "desk.oracle": "\u9884\u8A00\u673A",
    "desk.annualized": "\u5E74\u5316\uFF1A",
    "positions.title": "\u6301\u4ED3\u4E0E\u6210\u4EA4",
    "positions.coin": "\u5408\u7EA6",
    "positions.size": "\u6570\u91CF",
    "positions.entry": "\u5F00\u4ED3\u4EF7",
    "positions.mark": "\u6807\u8BB0",
    "positions.upnl": "\u672A\u5B9E\u73B0",
    "positions.none": "\uFF08\u65E0\u6301\u4ED3\uFF09",
    "account.cash": "\u73B0\u91D1",
    "account.equity": "\u6743\u76CA",
    "account.value": "\u8D26\u6237\u4EF7\u503C",
    "account.available": "\u53EF\u7528",
    "account.none": "\u672A\u8FDE\u63A5\u94B1\u5305",
    "banner.title": "\u4F1A\u8BDD\u9A71\u52A8\u4EA4\u6613",
    "banner.body": "\u5728\u53F3\u4FA7\u4F1A\u8BDD\u4E2D\u8BA8\u8BBA\u884C\u60C5\u3001\u98CE\u9669\u4E0E\u4EA4\u6613\u51B3\u7B56\uFF1B\u76D8\u53E3\u4EF7\u683C\u53EF\u7528\u4E8E\u8F85\u52A9\u586B\u5199\u7968\u636E\u3002",
    "desk.vol": "24h\u6210\u4EA4",
    "desk.funding": "\u8D44\u91D1\u8D39",
    "chart.loading": "K \u7EBF\u52A0\u8F7D\u4E2D\u2026",
    "desk.noSession": "\u5148\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u4EA4\u6613\u4F1A\u8BDD",
    "desk.queued": "\u5DF2\u628A\u8BF7\u6C42\u9001\u5165\u4EA4\u6613\u4F1A\u8BDD\uFF0Cagent \u5C06\u6838\u5BF9\u540E\u5904\u7406",
    "chat.title": "\u4EA4\u6613\u4F1A\u8BDD",
    "chat.noSession": "\u9009\u62E9\u5DE6\u4FA7\u4EA4\u6613\u4F1A\u8BDD\uFF0C\n\u5728\u8FD9\u91CC\u76F4\u63A5\u4E0E\u4EA4\u6613 agent \u5BF9\u8BDD\u3002",
    "chat.linking": "\u6B63\u5728\u63A5\u5165\u4F1A\u8BDD\u2026",
    "chat.ticket": "\u4EA4\u6613\u7968\u636E",
    "chat.back": "\u8FD4\u56DE\u4F1A\u8BDD",
    "chat.prompts": "\u5FEB\u6377\u63D0\u95EE",
    "chat.analyze": "\u5206\u6790\u884C\u60C5",
    "chat.risk": "\u68C0\u67E5\u98CE\u9669",
    "chat.bindError": "\u4F1A\u8BDD\u7ED1\u5B9A\u5931\u8D25\uFF1A",
    "chat.noFactory": "\u539F\u751F\u4F1A\u8BDD\u7EC4\u4EF6\u4E0D\u53EF\u7528\uFF08renderer kit \u7F3A\u5931\uFF09\u3002",
    "chat.upgrade": "\u5F53\u524D DSH \u7248\u672C\u4E0D\u652F\u6301\u5D4C\u5165\u539F\u751F\u4F1A\u8BDD\uFF1B\u8BF7\u4F7F\u7528 DSH 0.2 \u6216\u66F4\u65B0\u7248\u672C\u3002",
    "mode.paper": "\u6A21\u62DF\u76D8",
    "mode.live": "\u5B9E\u76D8",
    "status.unavailable": "\u8FDC\u7AEF\u4E0D\u53EF\u7528",
    "status.online": "\u5728\u7EBF",
    "status.offline": "\u79BB\u7EBF",
    "session.defaultTitle": "Hyperliquid \u4EA4\u6613\u4F1A\u8BDD",
    "session.rename": "\u91CD\u547D\u540D",
    "session.name": "\u4F1A\u8BDD\u540D\u79F0",
    "session.archive": "\u5F52\u6863",
    "session.renameFailed": "\u91CD\u547D\u540D\u5931\u8D25",
    "session.archiveFailed": "\u5F52\u6863\u4F1A\u8BDD\u5931\u8D25",
    "modal.close": "\u5173\u95ED",
    "modal.cancel": "\u53D6\u6D88",
    "modal.save": "\u4FDD\u5B58",
    "network.label": "\u7F51\u7EDC",
    "network.testnet": "\u6D4B\u8BD5\u7F51",
    "network.mainnet": "\u4E3B\u7F51",
    "network.switchFailed": "\u5207\u6362\u7F51\u7EDC\u5931\u8D25",
    "network.confirmTitle": "\u5207\u6362\u5230\u4E3B\u7F51",
    "network.confirmBody": "\u4E3B\u7F51\u4F1A\u663E\u793A\u771F\u5B9E\u884C\u60C5\u548C\u8D26\u6237\uFF1B\u5B9E\u76D8\u6A21\u5F0F\u4E0B\uFF0C\u540E\u7EED\u4EA4\u6613\u5C06\u4F7F\u7528\u771F\u5B9E\u8D44\u91D1\u3002",
    "network.confirm": "\u5207\u6362\u4E3B\u7F51",
    "language.label": "\u8BED\u8A00",
    "theme.label": "\u4E3B\u9898",
    "theme.system": "\u8DDF\u968F\u7CFB\u7EDF",
    "theme.light": "\u6D45\u8272",
    "theme.dark": "\u6DF1\u8272",
    "market.choose": "\u9009\u62E9\u5E02\u573A",
    "market.search": "\u641C\u7D22\u5E02\u573A",
    "market.tradable": "\u53EF\u4EA4\u6613",
    "market.all": "\u5168\u90E8",
    "market.name": "\u5E02\u573A",
    "market.price": "\u6700\u65B0\u4EF7",
    "market.change": "24h \u6DA8\u8DCC",
    "market.funding": "\u8D44\u91D1\u8D39",
    "market.volume": "24h \u6210\u4EA4\u989D",
    "market.openInterest": "\u672A\u5E73\u4ED3\u91CF",
    "market.outcomeTestnet": "Outcome \u76EE\u5F55\u76EE\u524D\u4EC5\u5728 testnet \u63D0\u4F9B\u3002",
    "market.empty": "\u6CA1\u6709\u5339\u914D\u7684\u5E02\u573A",
    "market.loading": "\u6B63\u5728\u8BFB\u53D6\u5E02\u573A\u76EE\u5F55\u2026",
    "market.shortcuts": "\u2191\u2193 \u9009\u62E9\u3000Enter \u6253\u5F00\u3000\u2318/Ctrl+S \u81EA\u9009\u3000Esc \u5173\u95ED",
    "market.count": "\u4E2A\u5E02\u573A",
    "market.category.all": "\u5168\u90E8",
    "market.category.perp": "\u6C38\u7EED",
    "market.category.spot": "\u73B0\u8D27",
    "market.category.hip3": "HIP-3",
    "market.category.outcome": "Outcome",
    "market.category.crypto": "Crypto",
    "market.category.tradfi": "TradFi",
    "market.category.preipo": "Pre-IPO",
    "market.category.trending": "\u70ED\u95E8",
    "market.category.favorites": "\u81EA\u9009",
    "time.now": "\u521A\u521A",
    "error.noConnection": "\u65E0\u8FDE\u63A5",
    "error.callFailed": "\u8FDC\u7AEF\u8C03\u7528\u5931\u8D25",
    "error.badResponse": "\u8FDC\u7AEF\u54CD\u5E94\u683C\u5F0F\u9519\u8BEF"
  },
  en: {
    "app.title": "Hyperliquid Desk",
    "app.suffix": "Desk",
    "sessions.title": "Trading sessions",
    "sessions.new": "New trading session",
    "sessions.empty": "No trading sessions yet.\nCreate one to start a trading chat.",
    "session.createFailed": "Failed to create session",
    "book.title": "Order book",
    "book.waiting": "Waiting for upstream data\u2026",
    "book.clickHint": "Fill the trade ticket",
    "book.price": "Price",
    "book.size": "Size",
    "book.total": "Total",
    "book.spread": "Spread",
    "trades.title": "Recent trades",
    "tab.positions": "Positions",
    "tab.orders": "Orders & fills",
    "tab.account": "Account",
    "orders.coin": "Coin",
    "orders.side": "Side",
    "orders.px": "Price",
    "orders.sz": "Size",
    "orders.status": "Status",
    "orders.none": "(no orders or fills yet)",
    "orders.open": "resting",
    "side.buy": "Buy",
    "side.sell": "Sell",
    "desk.oracle": "Oracle",
    "desk.annualized": "Annualized: ",
    "positions.title": "Positions & fills",
    "positions.coin": "Coin",
    "positions.size": "Size",
    "positions.entry": "Entry",
    "positions.mark": "Mark",
    "positions.upnl": "uPnL",
    "positions.none": "(no positions)",
    "account.cash": "Cash",
    "account.equity": "Equity",
    "account.value": "Account value",
    "account.available": "Available",
    "account.none": "No wallet",
    "banner.title": "Session-led trading",
    "banner.body": "Discuss the market, risk and trade decisions in the conversation. Book prices can help fill the ticket.",
    "desk.vol": "24h vol",
    "desk.funding": "Funding",
    "chart.loading": "Loading candles\u2026",
    "desk.noSession": "Pick a trading session on the left",
    "desk.queued": "Request sent to the trading chat for agent review",
    "chat.title": "Trading chat",
    "chat.noSession": "Pick a trading session on the left,\nthen discuss trades with the agent here.",
    "chat.linking": "Linking session\u2026",
    "chat.ticket": "Trade ticket",
    "chat.back": "Back to chat",
    "chat.prompts": "Quick prompts",
    "chat.analyze": "Analyze market",
    "chat.risk": "Check risk",
    "chat.bindError": "Session binding failed: ",
    "chat.noFactory": "Native conversation unavailable (renderer kit missing).",
    "chat.upgrade": "This DSH version cannot embed native chat. Use DSH 0.2 or newer.",
    "mode.paper": "PAPER",
    "mode.live": "LIVE",
    "status.unavailable": "Host offline",
    "status.online": "Online",
    "status.offline": "Offline",
    "session.defaultTitle": "Hyperliquid trading session",
    "session.rename": "Rename",
    "session.name": "Session name",
    "session.archive": "Archive",
    "session.renameFailed": "Rename failed",
    "session.archiveFailed": "Could not archive session",
    "modal.close": "Close",
    "modal.cancel": "Cancel",
    "modal.save": "Save",
    "network.label": "Network",
    "network.testnet": "Testnet",
    "network.mainnet": "Mainnet",
    "network.switchFailed": "Could not switch network",
    "network.confirmTitle": "Switch to mainnet",
    "network.confirmBody": "Mainnet displays real market and account data. In live mode, subsequent trades use real funds.",
    "network.confirm": "Switch to mainnet",
    "language.label": "Language",
    "theme.label": "Theme",
    "theme.system": "System",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "market.choose": "Choose market",
    "market.search": "Search markets",
    "market.tradable": "Tradable",
    "market.all": "All",
    "market.name": "Market",
    "market.price": "Last price",
    "market.change": "24h change",
    "market.funding": "Funding",
    "market.volume": "24h volume",
    "market.openInterest": "Open interest",
    "market.outcomeTestnet": "Outcome markets are currently available on testnet only.",
    "market.empty": "No matching markets",
    "market.loading": "Loading market catalog\u2026",
    "market.shortcuts": "\u2191\u2193 Select   Enter Open   \u2318/Ctrl+S Favorite   Esc Close",
    "market.count": "markets",
    "market.category.all": "All",
    "market.category.perp": "Perps",
    "market.category.spot": "Spot",
    "market.category.hip3": "HIP-3",
    "market.category.outcome": "Outcome",
    "market.category.crypto": "Crypto",
    "market.category.tradfi": "TradFi",
    "market.category.preipo": "Pre-IPO",
    "market.category.trending": "Trending",
    "market.category.favorites": "Favorites",
    "time.now": "now",
    "error.noConnection": "No connection",
    "error.callFailed": "RPC failed",
    "error.badResponse": "Bad response"
  }
};

// src/client/store.ts
var import_react = require("react");
function createStore(initial) {
  let state = initial;
  const subs = /* @__PURE__ */ new Set();
  return {
    get: () => state,
    patch(p) {
      const partial = typeof p === "function" ? p(state) : p;
      const next = { ...state, ...partial };
      if (next !== state) {
        state = next;
        subs.forEach((f) => {
          try {
            f();
          } catch {
          }
        });
      }
    },
    subscribe(fn) {
      subs.add(fn);
      return () => {
        subs.delete(fn);
      };
    }
  };
}
var TAPE_PLACEMENT_KEY = "dsh-hyperliquid.tapePlacement";
function loadTapePlacement() {
  try {
    return localStorage.getItem(TAPE_PLACEMENT_KEY) === "below" ? "below" : "auto";
  } catch {
    return "auto";
  }
}
function setTapePlacement(placement) {
  try {
    localStorage.setItem(TAPE_PLACEMENT_KEY, placement);
  } catch {
  }
  store.patch({ tapePlacement: placement });
}
var store = createStore({
  tapePlacement: loadTapePlacement(),
  resumedAt: 0,
  candlesOlder: "idle",
  status: null,
  statusError: null,
  statusAt: 0,
  markets: [],
  marketsAt: 0,
  marketCatalog: [],
  marketCatalogAt: 0,
  selectedMarket: null,
  selectedMarketAt: 0,
  selectedMarketError: null,
  activeCoin: "BTC",
  interval: "15m",
  bookGrouping: "full",
  snapshot: null,
  snapshotAt: 0,
  snapshotError: null,
  candles: [],
  candlesState: "idle",
  chartMarks: [],
  chartMarksKey: "",
  fundingRows: [],
  fundingCoin: null,
  fundingState: "idle",
  account: null,
  accountError: null,
  accountAt: 0,
  tradeHistory: null,
  tradeHistoryAt: 0,
  tradeHistoryError: null,
  sessions: [],
  sessionsLoaded: false,
  sessionTitles: {},
  archivedSessionIds: [],
  nativeSessionIds: [],
  nativeSessionsReady: false,
  localeRevision: 0,
  activeSessionId: null,
  workspace: null,
  workspaceSessionId: null,
  notice: null,
  eventsSeq: 0,
  ticketDraft: null,
  chartReferences: []
});
function useStore() {
  return (0, import_react.useSyncExternalStore)(store.subscribe, store.get, store.get);
}
if (typeof window !== "undefined") {
  try {
    window.__dhlStore = store;
  } catch {
  }
}
var activeRef = null;
function getActiveRef() {
  return activeRef;
}
function setActiveRef(ref) {
  activeRef = ref;
}
function notify(text) {
  if (!text) {
    store.patch({ notice: null });
    return;
  }
  const notice = { text, at: Date.now() };
  store.patch({ notice });
  setTimeout(() => {
    const n2 = store.get().notice;
    if (n2 && Date.now() - n2.at >= 6e3) store.patch({ notice: null });
  }, 6500);
}

// src/client/remote.ts
var conn = null;
var ctxRef = null;
var localeT = (_k, fallback) => fallback;
function setConnection(c) {
  conn = c;
}
function setContext(ctx) {
  ctxRef = ctx;
}
function getContext() {
  return ctxRef;
}
function setLocaleBinder(binder) {
  localeT = binder;
}
function t(key, fallback) {
  return localeT(key, fallback);
}
function tr(zh, en) {
  return ctxRef?.get?.("locale")?.getLocale?.()?.active === "en" ? en : zh;
}
async function hyperCall(method, request = null) {
  if (!conn) throw new Error(t("error.noConnection", "\u65E0\u8FDE\u63A5"));
  if (typeof conn.rpc?.call !== "function") throw new Error(t("error.callFailed", "\u8FDC\u7AEF\u8C03\u7528\u5931\u8D25") + `: hyper.${method}`);
  const envelope = await conn.rpc.call("/api", `hyper/${method}`, { args: { request: request ?? null } });
  if (envelope && typeof envelope === "object" && envelope.ok === false) {
    throw new Error(envelope.error?.message ?? t("error.callFailed", "\u8FDC\u7AEF\u8C03\u7528\u5931\u8D25"));
  }
  if (envelope && typeof envelope === "object" && envelope.ok === true) return envelope.value;
  throw new Error(t("error.badResponse", "\u8FDC\u7AEF\u54CD\u5E94\u683C\u5F0F\u9519\u8BEF"));
}

// src/client/app.tsx
var React18 = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives5 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/chart-indicators.ts
function points(rows, values) {
  return values.flatMap((value, index) => value == null || !Number.isFinite(value) ? [] : [{ time: Math.floor(rows[index].t / 1e3), value }]);
}
function sma(values, period) {
  let sum = 0;
  return values.map((value, index) => {
    sum += value;
    if (index >= period) sum -= values[index - period];
    return index >= period - 1 ? sum / period : null;
  });
}
function ema(values, period) {
  const result = Array(values.length).fill(null);
  const alpha = 2 / (period + 1);
  let seed = [];
  let prior = null;
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (value == null) continue;
    if (prior == null) {
      seed.push(value);
      if (seed.length < period) continue;
      prior = seed.reduce((total, current2) => total + current2, 0) / period;
    } else prior = value * alpha + prior * (1 - alpha);
    result[i] = prior;
  }
  return result;
}
function chartIndicators(candles) {
  const rows = candles.filter((row) => Number.isFinite(row.c) && row.c > 0 && Number.isFinite(row.t));
  const closes = rows.map((row) => row.c);
  const mean = sma(closes, 20);
  const ema12 = ema(closes, 12);
  const ema26 = ema(closes, 26);
  const macd = ema12.map((value, index) => value == null || ema26[index] == null ? null : value - ema26[index]);
  const signal = ema(macd, 9);
  const deviation = mean.map((value, index) => value == null ? null : Math.sqrt(
    closes.slice(index - 19, index + 1).reduce((total, close) => total + (close - value) ** 2, 0) / 20
  ));
  const rsi = Array(rows.length).fill(null);
  let gain = 0;
  let loss = 0;
  for (let i = 1; i < rows.length; i += 1) {
    const delta = closes[i] - closes[i - 1];
    const up = Math.max(delta, 0);
    const down = Math.max(-delta, 0);
    if (i <= 14) {
      gain += up;
      loss += down;
    } else {
      gain = gain * 13 / 14 + up;
      loss = loss * 13 / 14 + down;
    }
    if (i === 14) {
      gain /= 14;
      loss /= 14;
    }
    if (i >= 14) rsi[i] = loss === 0 ? gain === 0 ? 50 : 100 : 100 - 100 / (1 + gain / loss);
  }
  const point = (values) => points(rows, values);
  return {
    sma20: point(mean),
    sma60: point(sma(closes, 60)),
    ema20: point(ema(closes, 20)),
    ema50: point(ema(closes, 50)),
    upper: point(mean.map((value, index) => value == null ? null : value + 2 * deviation[index])),
    lower: point(mean.map((value, index) => value == null ? null : value - 2 * deviation[index])),
    rsi14: point(rsi),
    macd: point(macd),
    signal: point(signal),
    histogram: point(macd.map((value, index) => value == null || signal[index] == null ? null : value - signal[index]))
  };
}

// src/client/chart-reference.ts
var SERIES = [
  ["sma20", "SMA20", "sma20"],
  ["sma60", "MA60", "sma60"],
  ["ema20", "EMA20", "ema20"],
  ["ema50", "EMA50", "ema50"],
  ["bollinger20", "BOLL\u4E0A\u8F68", "upper"],
  ["bollinger20", "BOLL\u4E0B\u8F68", "lower"],
  ["rsi14", "RSI14", "rsi14"],
  ["macd", "MACD", "macd"],
  ["macd", "\u4FE1\u53F7\u7EBF", "signal"],
  ["macd", "MACD\u67F1", "histogram"]
];
function selectChartCandle(candles, time, active, hit) {
  const rows = candles;
  const index = rows.findIndex((candle2) => Math.floor(candle2.t / 1e3) === Math.floor(time / 1e3));
  if (index < 0) return null;
  const candle = rows[index];
  const studies = chartIndicators(rows);
  const epoch = Math.floor(candle.t / 1e3);
  const values = SERIES.flatMap(([id, label, key]) => {
    if (!active.has(id)) return [];
    const point = studies[key].find((item) => item.time === epoch);
    return point ? [{ label, value: point.value }] : [];
  });
  const previous = rows.slice(Math.max(0, index - 20), index).map((row) => row.v).filter((value) => Number.isFinite(value) && value >= 0);
  const priorVolumeMean20 = previous.length === 20 ? previous.reduce((sum, value) => sum + value, 0) / 20 : null;
  return { candle, hit, values, priorVolumeMean20 };
}
function formatChartReference(selection, coin, interval, english = false) {
  const { candle, hit, values, priorVolumeMean20 } = selection;
  const number = (value) => String(value);
  const computed = (value) => String(Number(value.toPrecision(10)));
  const time = new Date(candle.t).toISOString().replace("T", " ").replace(".000Z", " UTC");
  const hitLabel = {
    volume: english ? "Volume" : "\u6210\u4EA4\u91CF",
    sma20: "SMA20",
    sma60: "MA60",
    ema20: "EMA20",
    ema50: "EMA50",
    bollingerUpper: english ? "BOLL upper" : "BOLL\u4E0A\u8F68",
    bollingerLower: english ? "BOLL lower" : "BOLL\u4E0B\u8F68",
    rsi14: "RSI14",
    macd: "MACD",
    macdSignal: english ? "MACD signal" : "\u4FE1\u53F7\u7EBF",
    macdHistogram: english ? "MACD histogram" : "MACD\u67F1"
  };
  const lines = [
    english ? `[Chart point] ${coin} ${interval} candle opened ${time}` : `\u3010\u56FE\u8868\u70B9\u4F4D\u3011${coin} ${interval} K \u7EBF\u5F00\u76D8 ${time}`,
    english ? `OHLC: ${number(candle.o)} / ${number(candle.h)} / ${number(candle.l)} / ${number(candle.c)}` : `\u5F00/\u9AD8/\u4F4E/\u6536\uFF1A${number(candle.o)} / ${number(candle.h)} / ${number(candle.l)} / ${number(candle.c)}`,
    english ? `Volume: ${number(candle.v)}` : `\u6210\u4EA4\u91CF\uFF1A${number(candle.v)}`
  ];
  if (priorVolumeMean20 != null && priorVolumeMean20 > 0) {
    lines.push(english ? `Previous 20-candle mean volume: ${computed(priorVolumeMean20)}; current/mean: ${(candle.v / priorVolumeMean20).toFixed(2)}x` : `\u524D 20 \u6839\u5747\u91CF\uFF1A${computed(priorVolumeMean20)}\uFF1B\u5F53\u524D/\u5747\u91CF\uFF1A${(candle.v / priorVolumeMean20).toFixed(2)} \u500D`);
  }
  if (values.length) lines.push(`${english ? "Displayed studies" : "\u5DF2\u663E\u793A\u6307\u6807"}\uFF1A${values.map(({ label, value }) => `${label}=${computed(value)}`).join("\uFF0C")}`);
  if (hit && hit !== "volume") lines.push(`${english ? "Selected study" : "\u70B9\u51FB\u6307\u6807"}\uFF1A${hitLabel[hit] ?? hit}`);
  return lines.join("\n");
}

// src/client/data.ts
var POLL_FAST_MS = 900;
var POLL_SLOW_MS = 3e3;
var MARKETS_MS = 15e3;
var SESSIONS_MS = 1e4;
var DETAIL_MS = 5e3;
function isMarketStale(s, now = Date.now()) {
  const observed = s.snapshot?.observedAt;
  const kind = s.selectedMarket?.name === s.activeCoin ? s.selectedMarket.kind : s.marketCatalog.find((row) => row.name === s.activeCoin)?.kind ?? (s.activeCoin.startsWith("#") ? "outcome" : s.activeCoin.includes(":") ? "hip3" : s.activeCoin.startsWith("@") || s.activeCoin.includes("/") ? "spot" : "perp");
  return Boolean(s.statusError || s.snapshotError || s.snapshot?.network && s.status?.network && s.snapshot.network !== s.status.network || !s.statusAt || now - s.statusAt > 2e4 || !s.snapshotAt || now - s.snapshotAt > 5e3 || !observed?.book || now - observed.book > 1e4 || kind === "perp" && (!observed?.mids || now - observed.mids > 1e4) || kind !== "perp" && (!s.selectedMarketAt || now - s.selectedMarketAt > 25e3 || Boolean(s.selectedMarketError)));
}
var focusVersion = 0;
var focusQueue = Promise.resolve();
var focusClientId = Math.random().toString(36).slice(2) + Date.now().toString(36);
var pendingSnapshots = /* @__PURE__ */ new Set();
var pendingDetails = /* @__PURE__ */ new Set();
var accountPending = false;
var historyPending = null;
var historyPendingEpoch = -1;
var accountPendingEpoch = -1;
var eventsPending = false;
var catalogPending = null;
var catalogPendingEpoch = -1;
var networkEpoch = 0;
var workspaceWrites = /* @__PURE__ */ new Map();
var ANONYMOUS_WORKSPACE = {
  coin: "BTC",
  interval: "15m",
  bookGrouping: "full",
  chartTab: "chart",
  tapeTab: "book",
  bottomTab: "positions",
  indicators: ["volume"],
  priceScale: "normal",
  chartRanges: {},
  chartLayers: { orders: true, fills: true, drawings: true },
  layout: { sessionsWidth: 232, chatWidth: 480, sessionsCollapsed: false, deskCollapsed: false, chatCollapsed: false }
};
var workspaceLoadVersion = 0;
async function openSession(sessionId, fallbackCoin = "BTC") {
  const loadVersion = ++workspaceLoadVersion;
  focusVersion += 1;
  store.patch({
    activeSessionId: sessionId,
    workspaceSessionId: null,
    workspace: null,
    activeCoin: fallbackCoin,
    interval: "15m",
    bookGrouping: "full",
    chartMarks: [],
    chartMarksKey: "",
    candles: [],
    snapshot: null,
    snapshotAt: 0,
    selectedMarket: null,
    selectedMarketAt: 0,
    fundingRows: [],
    fundingCoin: null,
    ticketDraft: null
  });
  try {
    await workspaceWrites.get(sessionId)?.catch(() => {
    });
    if (store.get().activeSessionId !== sessionId || loadVersion !== workspaceLoadVersion) return;
    const workspace = await hyperCall("sessionWorkspace", { sessionId });
    if (store.get().activeSessionId !== sessionId || loadVersion !== workspaceLoadVersion) return;
    store.patch({ workspace, workspaceSessionId: sessionId, interval: workspace.interval, bookGrouping: workspace.bookGrouping });
    await setDeskCoin(workspace.coin ?? fallbackCoin);
    void loadCandles();
    void loadChartMarks();
  } catch (error) {
    if (store.get().activeSessionId === sessionId) notify(tr("\u4F1A\u8BDD\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25", "Could not load session workspace") + "\uFF1A" + String(error?.message ?? error));
  }
}
function saveSessionWorkspace(patch) {
  const state = store.get();
  const sessionId = state.activeSessionId;
  if (sessionId && (state.workspaceSessionId !== sessionId || !state.workspace)) return;
  const current2 = state.workspace ?? ANONYMOUS_WORKSPACE;
  const next = {
    ...current2,
    ...patch,
    layout: patch.layout ? { ...current2.layout, ...patch.layout } : current2.layout,
    chartLayers: patch.chartLayers ? { ...current2.chartLayers ?? { orders: true, fills: true, drawings: true }, ...patch.chartLayers } : current2.chartLayers,
    chartRanges: patch.chartRanges ? { ...current2.chartRanges, ...patch.chartRanges } : current2.chartRanges
  };
  store.patch({
    workspace: next,
    ...patch.interval ? { interval: patch.interval } : {},
    ...patch.bookGrouping ? { bookGrouping: patch.bookGrouping } : {}
  });
  if (!sessionId) return;
  const previous = workspaceWrites.get(sessionId) ?? Promise.resolve();
  const task = previous.catch(() => {
  }).then(() => hyperCall("updateSessionWorkspace", { sessionId, patch }));
  workspaceWrites.set(sessionId, task);
  void task.catch((error) => notify(tr("\u4F1A\u8BDD\u5DE5\u4F5C\u53F0\u4FDD\u5B58\u5931\u8D25", "Could not save session workspace") + "\uFF1A" + String(error?.message ?? error)));
}
function resetNetworkView(network) {
  networkEpoch += 1;
  const previous = store.get();
  store.patch({
    status: previous.status ? { ...previous.status, network } : null,
    statusAt: 0,
    statusError: null,
    markets: [],
    marketsAt: 0,
    marketCatalog: [],
    marketCatalogAt: 0,
    selectedMarket: null,
    selectedMarketAt: 0,
    selectedMarketError: null,
    snapshot: null,
    snapshotAt: 0,
    snapshotError: null,
    candles: [],
    candlesState: "idle",
    fundingRows: [],
    fundingCoin: null,
    account: null,
    accountAt: 0,
    accountError: null,
    tradeHistory: null,
    tradeHistoryAt: 0,
    tradeHistoryError: null
  });
  void Promise.allSettled([loadStatus(), loadMarkets(true), loadSnapshot(), loadCandles(), loadMarketDetail(previous.activeCoin), loadAccount()]);
}
async function switchNetwork(network) {
  const result = await hyperCall("switchNetwork", { network, acknowledgeMainnet: network === "mainnet" });
  if (result?.network !== network) throw new Error(tr("\u7F51\u7EDC\u5207\u6362\u7ED3\u679C\u4E0D\u4E00\u81F4", "Network switch response mismatch"));
  resetNetworkView(network);
}
function resetModeView(mode) {
  networkEpoch += 1;
  const previous = store.get();
  store.patch({
    status: previous.status ? { ...previous.status, tradingMode: mode } : null,
    account: null,
    accountAt: 0,
    accountError: null,
    tradeHistory: null,
    tradeHistoryAt: 0,
    tradeHistoryError: null
  });
  void Promise.allSettled([loadStatus(), loadAccount(), loadTradeHistory(true)]);
}
async function switchTradingMode(mode) {
  const result = await hyperCall("switchTradingMode", { mode, acknowledgeLive: mode === "live" });
  if (result?.mode !== mode) throw new Error(tr("\u4EA4\u6613\u6A21\u5F0F\u5207\u6362\u7ED3\u679C\u4E0D\u4E00\u81F4", "Trading mode switch response mismatch"));
  resetModeView(mode);
}
function applyLocalCoin(coin) {
  if (coin === store.get().activeCoin) return;
  store.patch({ activeCoin: coin, snapshot: null, snapshotAt: 0, snapshotError: null, selectedMarket: null, selectedMarketAt: 0, selectedMarketError: null, candles: [], chartMarks: [], chartMarksKey: "", fundingRows: [], fundingCoin: null });
  void loadCandles();
  void loadSnapshot();
  void loadMarketDetail(coin);
}
function liveCandle(value) {
  if (!value || typeof value !== "object") return null;
  const row = { t: Number(value.t), o: Number(value.o), h: Number(value.h), l: Number(value.l), c: Number(value.c), v: Number(value.v) };
  return Object.values(row).every(Number.isFinite) && row.t > 0 ? row : null;
}
var MAX_CANDLES = 5e3;
var OLDER_PAGE_BARS = 500;
var INTERVAL_MS = {
  "1m": 6e4,
  "3m": 18e4,
  "5m": 3e5,
  "15m": 9e5,
  "30m": 18e5,
  "1h": 36e5,
  "2h": 72e5,
  "4h": 144e5,
  "8h": 288e5,
  "12h": 432e5,
  "1d": 864e5,
  "3d": 2592e5,
  "1w": 6048e5,
  "1M": 2592e6
};
var candlesFor = "";
var olderPending = false;
function mergeCandle(rows, next) {
  const last = rows.at(-1);
  if (!last || next.t > last.t) return [...rows, next].slice(-MAX_CANDLES);
  if (next.t === last.t && JSON.stringify(next) !== JSON.stringify(last)) return [...rows.slice(0, -1), next];
  return rows;
}
async function loadStatus() {
  const epoch = networkEpoch;
  try {
    const status = await hyperCall("status");
    if (epoch === networkEpoch) store.patch({ status, statusError: null, statusAt: Date.now() });
  } catch (e) {
    if (epoch === networkEpoch) store.patch({ statusError: String(e?.message ?? e) });
  }
}
async function loadMarkets(force = false) {
  if (!force && Date.now() - store.get().marketsAt < MARKETS_MS) return;
  try {
    const epoch = networkEpoch;
    const m = await hyperCall("markets");
    if (epoch === networkEpoch) store.patch({ markets: m.universe ?? [], marketsAt: Date.now() });
  } catch {
  }
}
async function loadMarketCatalog(force = false) {
  if (!force && Date.now() - store.get().marketCatalogAt < 6e4) return;
  if (catalogPending && catalogPendingEpoch === networkEpoch) return catalogPending;
  const epoch = networkEpoch;
  catalogPendingEpoch = epoch;
  catalogPending = hyperCall("marketCatalog").then((res) => {
    if (epoch === networkEpoch) store.patch({ marketCatalog: res.markets ?? [], marketCatalogAt: Date.now() });
  }).finally(() => {
    if (catalogPendingEpoch === epoch) catalogPending = null;
  });
  return catalogPending;
}
async function loadMarketDetail(coin) {
  const epoch = networkEpoch;
  const pendingKey = `${epoch}:${coin}`;
  if (pendingDetails.has(pendingKey)) return;
  pendingDetails.add(pendingKey);
  try {
    const res = await hyperCall("marketDetail", { coin });
    if (epoch !== networkEpoch || store.get().activeCoin !== coin || !res?.market) return;
    store.patch((prev) => {
      const index = prev.marketCatalog.findIndex((row) => row.name === coin);
      const marketCatalog = [...prev.marketCatalog];
      if (index < 0) marketCatalog.push(res.market);
      else marketCatalog[index] = res.market;
      return { marketCatalog, selectedMarket: res.market, selectedMarketAt: Number(res.observedAt) || 0, selectedMarketError: null };
    });
  } catch (e) {
    if (epoch === networkEpoch && store.get().activeCoin === coin) store.patch({ selectedMarketError: String(e?.message ?? e) });
  } finally {
    pendingDetails.delete(pendingKey);
  }
}
async function loadSnapshot() {
  const { activeCoin: coin, interval, bookGrouping } = store.get();
  const epoch = networkEpoch;
  const key = `${epoch}:${coin}:${interval}:${bookGrouping}`;
  if (pendingSnapshots.has(key)) return;
  pendingSnapshots.add(key);
  try {
    const snapshot = await hyperCall("snapshot", { coin, interval, bookGrouping });
    if (epoch !== networkEpoch || store.get().activeCoin !== coin || store.get().interval !== interval || store.get().bookGrouping !== bookGrouping) return;
    const candle = liveCandle(snapshot?.candle);
    store.patch((prev) => ({
      snapshot,
      snapshotAt: Date.now(),
      snapshotError: null,
      ...candle && prev.candlesState === "ready" ? { candles: mergeCandle(prev.candles, candle) } : {}
    }));
  } catch (e) {
    if (epoch === networkEpoch && store.get().activeCoin === coin && store.get().interval === interval && store.get().bookGrouping === bookGrouping) store.patch({ snapshotError: String(e?.message ?? e) });
  } finally {
    pendingSnapshots.delete(key);
  }
}
async function loadOlderCandles() {
  const { activeCoin: coin, interval, candles, candlesState, candlesOlder } = store.get();
  const first = candles[0];
  if (olderPending || !first || candlesState !== "ready" || candlesOlder === "done" || candles.length >= MAX_CANDLES) return;
  const key = `${coin}:${interval}`;
  if (candlesFor !== key) return;
  olderPending = true;
  const epoch = networkEpoch;
  store.patch({ candlesOlder: "loading" });
  try {
    const endMs = first.t - 1;
    const res = await hyperCall("candles", { coin, interval, startMs: endMs - INTERVAL_MS[interval] * OLDER_PAGE_BARS, endMs });
    if (epoch !== networkEpoch || candlesFor !== key) return;
    const current2 = store.get().candles;
    const head = current2[0]?.t ?? Infinity;
    const older = (res.candles ?? []).filter((row) => row.t < head);
    const room = Math.max(0, MAX_CANDLES - current2.length);
    const next = older.slice(-room);
    store.patch({ candles: [...next, ...current2], candlesOlder: next.length === 0 || next.length === room ? "done" : "idle" });
  } catch {
    if (epoch === networkEpoch && candlesFor === key) store.patch({ candlesOlder: "error" });
  } finally {
    olderPending = false;
  }
}
async function loadCandles() {
  const { activeCoin: coin, interval } = store.get();
  const epoch = networkEpoch;
  store.patch({ candlesState: "loading" });
  try {
    const res = await hyperCall("candles", { coin, interval });
    if (epoch === networkEpoch && store.get().activeCoin === coin && store.get().interval === interval) {
      const fetched = res.candles ?? [];
      const key = `${coin}:${interval}`;
      const prev = store.get().candles;
      const same = candlesFor === key;
      const older = same && fetched.length ? prev.filter((row) => row.t < fetched[0].t) : [];
      const rows = [...older, ...fetched];
      const lastLive = same ? prev.at(-1) : void 0;
      candlesFor = key;
      store.patch({
        candles: lastLive && lastLive.t >= (rows.at(-1)?.t ?? 0) ? mergeCandle(rows.filter((row) => row.t < lastLive.t), lastLive) : rows,
        candlesState: "ready",
        ...same ? {} : { candlesOlder: "idle" }
      });
    }
  } catch {
    if (epoch === networkEpoch && store.get().activeCoin === coin && store.get().interval === interval) store.patch({ candlesState: "error" });
  }
}
async function loadChartMarks() {
  const { activeSessionId: sessionId, activeCoin: coin, interval } = store.get();
  const key = `${sessionId ?? ""}:${coin}:${interval}`;
  if (!sessionId) {
    store.patch({ chartMarks: [], chartMarksKey: key });
    return;
  }
  try {
    const res = await hyperCall("chartMarks", { sessionId, coin, interval });
    const current2 = store.get();
    if (`${current2.activeSessionId ?? ""}:${current2.activeCoin}:${current2.interval}` === key) {
      store.patch({ chartMarks: res.marks ?? [], chartMarksKey: key });
    }
  } catch {
  }
}
async function loadFunding() {
  const coin = store.get().activeCoin;
  const epoch = networkEpoch;
  store.patch({ fundingState: "loading" });
  try {
    const res = await hyperCall("fundingHistory", { coin });
    if (epoch === networkEpoch && store.get().activeCoin === coin) {
      store.patch({ fundingRows: res.rows ?? [], fundingCoin: coin, fundingState: "ready" });
    }
  } catch {
    if (epoch === networkEpoch && store.get().activeCoin === coin) store.patch({ fundingState: "error" });
  }
}
async function loadAccount() {
  if (accountPending && accountPendingEpoch === networkEpoch) return;
  accountPending = true;
  const coin = store.get().activeCoin;
  const epoch = networkEpoch;
  accountPendingEpoch = epoch;
  try {
    const account = await hyperCall("account", { coin });
    if (epoch === networkEpoch && store.get().activeCoin === coin) store.patch({ account, accountError: null, accountAt: Date.now() });
  } catch (e) {
    if (epoch === networkEpoch) store.patch({ accountError: String(e?.message ?? e) });
  } finally {
    if (accountPendingEpoch === epoch) accountPending = false;
  }
}
function loadTradeHistory(force = false) {
  if (historyPending && historyPendingEpoch === networkEpoch) return historyPending;
  if (!force && Date.now() - store.get().tradeHistoryAt < 3e4) return Promise.resolve();
  const epoch = networkEpoch;
  historyPendingEpoch = epoch;
  const task = hyperCall("tradeHistory").then((result) => {
    if (epoch === networkEpoch) store.patch({ tradeHistory: result, tradeHistoryAt: Date.now(), tradeHistoryError: null });
  }).catch((error) => {
    if (epoch === networkEpoch) store.patch({ tradeHistoryError: String(error?.message ?? error) });
  }).finally(() => {
    if (historyPending === task) historyPending = null;
  });
  historyPending = task;
  return task;
}
async function loadSessions() {
  try {
    const res = await hyperCall("sessions");
    store.patch({ sessions: res.sessions ?? [], sessionsLoaded: true });
  } catch {
  }
}
async function pollEvents() {
  if (eventsPending) return;
  eventsPending = true;
  try {
    const res = await hyperCall("eventsSince", { seq: store.get().eventsSeq });
    if (Array.isArray(res.events) && res.events.length > 0) {
      for (const ev of res.events) {
        if (ev.kind === "network.changed" && (ev.data?.to === "mainnet" || ev.data?.to === "testnet") && ev.data.to !== store.get().status?.network) resetNetworkView(ev.data.to);
        if (ev.kind === "mode.changed" && (ev.data?.to === "live" || ev.data?.to === "paper") && ev.data.to !== store.get().status?.tradingMode) resetModeView(ev.data.to);
        if (ev.kind === "paper.fill" || ev.kind?.startsWith("live.order.")) {
          void loadAccount();
          void loadTradeHistory(true);
        }
        if (ev.kind === "chart.mark" && ev.data?.sessionId === store.get().activeSessionId) void loadChartMarks();
        if (ev.data?.clientId === focusClientId) continue;
        if (ev.kind === "desk.state" && ev.data?.coin && (!ev.data.sessionId || ev.data.sessionId === store.get().activeSessionId) && ev.data.coin !== store.get().activeCoin) {
          focusVersion += 1;
          applyLocalCoin(ev.data.coin);
        }
        if (ev.kind === "session.coin" && ev.data?.sessionId === store.get().activeSessionId && ev.data?.coin && ev.data.coin !== store.get().activeCoin) {
          focusVersion += 1;
          applyLocalCoin(ev.data.coin);
        }
      }
    }
    if (Number.isFinite(res.seq)) store.patch({ eventsSeq: res.seq });
  } catch {
  } finally {
    eventsPending = false;
  }
}
function startPolling() {
  void loadStatus();
  void loadMarkets(true);
  void loadSessions();
  void loadCandles();
  void loadSnapshot();
  void loadMarketDetail(store.get().activeCoin);
  store.patch({ resumedAt: Date.now() });
  const visible = () => !document.hidden;
  let hiddenAt = document.hidden ? Date.now() : 0;
  const fast = setInterval(() => {
    if (visible()) {
      void loadSnapshot();
      void pollEvents();
    }
  }, POLL_FAST_MS);
  const slow = setInterval(() => {
    if (visible()) {
      void loadAccount();
      void loadMarkets();
    }
  }, POLL_SLOW_MS);
  const titles = setInterval(() => {
    if (visible()) {
      void loadSessions();
      void loadStatus();
    }
  }, SESSIONS_MS);
  const detail = setInterval(() => {
    if (visible()) void loadMarketDetail(store.get().activeCoin);
  }, DETAIL_MS);
  const onVisibility = () => {
    if (!visible()) {
      hiddenAt = Date.now();
      return;
    }
    const away = hiddenAt ? Date.now() - hiddenAt : 0;
    hiddenAt = 0;
    store.patch({ resumedAt: Date.now() });
    void loadStatus();
    void loadSnapshot();
    void loadMarketDetail(store.get().activeCoin);
    void loadAccount();
    void pollEvents();
    if (away > 1e4) {
      void loadCandles();
      void loadMarkets(true);
      void loadSessions();
      void loadTradeHistory(true);
      void loadChartMarks();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  return () => {
    clearInterval(fast);
    clearInterval(slow);
    clearInterval(titles);
    clearInterval(detail);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
function queueToAgent(text) {
  const ref = getActiveRef();
  if (!ref?.binding?.session?.prompt) {
    notify(t("desk.noSession", "\u5148\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u4EA4\u6613\u4F1A\u8BDD"));
    return false;
  }
  void ref.binding.session.prompt([{ type: "text", text }], "queue").catch((e) => notify(String(e?.message ?? e)));
  notify(t("desk.queued", "\u5DF2\u628A\u8BF7\u6C42\u9001\u5165\u4EA4\u6613\u4F1A\u8BDD\uFF0Cagent \u5C06\u6838\u5BF9\u540E\u5904\u7406"));
  return true;
}
function insertChartReference(selection, coin, interval) {
  const sessionId = store.get().activeSessionId;
  if (!sessionId) {
    notify(tr("\u8BF7\u5148\u9009\u62E9\u4EA4\u6613\u4F1A\u8BDD", "Choose a trading session first"));
    return;
  }
  const text = formatChartReference(selection, coin, interval, tr("zh", "en") === "en");
  store.patch((current2) => ({ chartReferences: [...current2.chartReferences, { id: Date.now() + Math.random(), sessionId, text }] }));
  if (store.get().workspace?.layout?.chatCollapsed) notify(tr("\u70B9\u4F4D\u5DF2\u6682\u5B58\uFF0C\u5C55\u5F00\u5BF9\u8BDD\u680F\u540E\u53EF\u7F16\u8F91", "Chart point saved; open the chat panel to edit it"));
}
function setDeskCoin(coin) {
  const version = ++focusVersion;
  const sessionId = store.get().activeSessionId;
  const task = focusQueue.catch(() => {
  }).then(async () => {
    if (version !== focusVersion) return;
    try {
      if (sessionId) await hyperCall("bindCoin", { sessionId, coin, source: "ui", clientId: focusClientId });
      else await hyperCall("deskState", { coin, sessionId: null, clientId: focusClientId });
      if (version === focusVersion) applyLocalCoin(coin);
    } catch (e) {
      notify(tr("\u4EA4\u6613\u53F0\u5E01\u79CD\u540C\u6B65\u5931\u8D25", "Could not sync desk market") + "\uFF1A" + String(e?.message ?? e));
      throw e;
    }
  });
  focusQueue = task.catch(() => {
  });
  return task;
}
function pushDeskInterval(interval) {
  if (store.get().activeSessionId) saveSessionWorkspace({ interval });
  else void hyperCall("deskState", { interval }).catch((e) => notify(tr("K \u7EBF\u5468\u671F\u540C\u6B65\u5931\u8D25", "Could not sync chart interval") + "\uFF1A" + String(e?.message ?? e)));
}

// src/client/layout.ts
var React = __toESM(require("react"), 1);
var LIMITS = {
  sessions: [160, 400],
  chat: [320, 700]
};
var DEFAULTS = {
  sessionsWidth: 232,
  chatWidth: 480,
  sessionsCollapsed: false,
  deskCollapsed: false,
  chatCollapsed: false
};
var KEY = "dsh-hyperliquid.layout.v1";
var keyFor = (sessionId) => sessionId ? `dsh-hyperliquid.layout.v2.${encodeURIComponent(sessionId)}` : KEY;
var current = { ...DEFAULTS };
function clampWidth(w, range) {
  const [min2, max] = range;
  if (!Number.isFinite(w)) return min2;
  return Math.round(Math.min(max, Math.max(min2, w)));
}
function loadLayout(sessionId = null) {
  try {
    const raw = localStorage.getItem(keyFor(sessionId));
    if (!raw) return { ...DEFAULTS };
    const p = JSON.parse(raw);
    return {
      sessionsWidth: clampWidth(Number(p.sessionsWidth) || DEFAULTS.sessionsWidth, LIMITS.sessions),
      chatWidth: clampWidth(Number(p.chatWidth) || DEFAULTS.chatWidth, LIMITS.chat),
      sessionsCollapsed: Boolean(p.sessionsCollapsed),
      deskCollapsed: Boolean(p.deskCollapsed),
      chatCollapsed: Boolean(p.chatCollapsed)
    };
  } catch {
    return { ...DEFAULTS };
  }
}
function saveLayout(s, sessionId = null) {
  try {
    localStorage.setItem(keyFor(sessionId), JSON.stringify(s));
  } catch {
  }
}
function useLayout(sessionId = null, remoteLayout = null, onCommit) {
  const [state, setState] = React.useState(() => {
    current = loadLayout(sessionId);
    return { ...current };
  });
  React.useEffect(() => {
    current = remoteLayout ? { ...remoteLayout } : loadLayout(sessionId);
    setState(current);
  }, [sessionId, remoteLayout]);
  const set = React.useCallback((p) => {
    const partial = typeof p === "function" ? p(current) : p;
    current = { ...current, ...partial };
    setState(current);
  }, []);
  const commit = React.useCallback(() => {
    saveLayout(current, sessionId);
    if (sessionId) onCommit?.(current);
  }, [sessionId, onCommit]);
  return [state, set, commit];
}

// src/client/components/brand-mark.tsx
var React2 = __toESM(require("react"), 1);
var HL_MARK_PATH = "M175.11589,99.27891c0,49.46366-30.3687,65.33789-46.47302,51.30413-13.11357-11.5031-17.02471-35.88989-36.81018-38.42055-25.07698-2.99085-27.37764,30.36839-43.94216,30.36839-19.3254,0-23.00642-27.83773-23.00642-42.33179,0-14.72405,4.14115-34.73961,20.47565-34.73961,19.09528,0,20.24566,28.75802,44.17226,27.14754,23.69661-1.61047,24.1567-31.51877,39.80103-44.17224,13.57335-11.27313,45.78283.69019,45.78283,50.84413Z";
function BrandMark({ size: size3 = 18 }) {
  return /* @__PURE__ */ React2.createElement("svg", { viewBox: "0 0 200 200", width: size3, height: size3, className: "dhl-mark", "aria-hidden": "true" }, /* @__PURE__ */ React2.createElement("path", { d: HL_MARK_PATH, fill: "#97FCE4" }));
}

// src/client/components/divider.tsx
var React3 = __toESM(require("react"), 1);
function Divider({ side, onResize, onCommit, onReset }) {
  const [dragging, setDragging] = React3.useState(false);
  const node = React3.useRef(null);
  const drag = React3.useRef(null);
  const finish = React3.useCallback(() => {
    const active = drag.current;
    if (!active) return;
    drag.current = null;
    const element = node.current;
    if (element?.hasPointerCapture(active.pointerId)) {
      try {
        element.releasePointerCapture(active.pointerId);
      } catch {
      }
    }
    setDragging(false);
    onCommit();
  }, [onCommit]);
  React3.useEffect(() => {
    if (!dragging) return void 0;
    const endPointer = (event) => {
      if (event.pointerId === drag.current?.pointerId) finish();
    };
    const endVisibility = () => {
      if (document.hidden) finish();
    };
    window.addEventListener("pointerup", endPointer);
    window.addEventListener("pointercancel", endPointer);
    window.addEventListener("blur", finish);
    document.addEventListener("visibilitychange", endVisibility);
    return () => {
      window.removeEventListener("pointerup", endPointer);
      window.removeEventListener("pointercancel", endPointer);
      window.removeEventListener("blur", finish);
      document.removeEventListener("visibilitychange", endVisibility);
    };
  }, [dragging, finish]);
  const onPointerDown = (event) => {
    if (event.button !== 0 || drag.current) return;
    event.preventDefault();
    drag.current = { pointerId: event.pointerId, startX: event.clientX, applied: 0 };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
    }
    setDragging(true);
  };
  const onPointerMove = (event) => {
    const active = drag.current;
    if (!active || event.pointerId !== active.pointerId) return;
    const total = side === "left" ? event.clientX - active.startX : active.startX - event.clientX;
    const delta = total - active.applied;
    if (delta !== 0) {
      active.applied = total;
      onResize(delta);
    }
  };
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      ref: node,
      className: "dhl-divider" + (dragging ? " dragging" : ""),
      onPointerDown,
      onPointerMove,
      onPointerUp: (event) => {
        if (event.pointerId === drag.current?.pointerId) finish();
      },
      onPointerCancel: (event) => {
        if (event.pointerId === drag.current?.pointerId) finish();
      },
      onLostPointerCapture: (event) => {
        if (event.pointerId === drag.current?.pointerId) finish();
      },
      onDoubleClick: onReset,
      role: "separator",
      "aria-label": side === "left" ? tr("\u8C03\u6574\u4F1A\u8BDD\u680F\u5BBD\u5EA6", "Resize sessions") : tr("\u8C03\u6574\u5BF9\u8BDD\u680F\u5BBD\u5EA6", "Resize chat"),
      "aria-orientation": "vertical"
    }
  );
}

// src/client/components/sessions-column.tsx
var React5 = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/format.ts
var INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"];
var MORE_INTERVALS = ["3m", "30m", "2h", "8h", "12h", "3d", "1w", "1M"];
function fmt(n2, d = 2) {
  const v = Number(n2);
  if (!Number.isFinite(v)) return "\u2014";
  return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}
function fmtPrice(n2) {
  const v = Number(n2);
  if (!Number.isFinite(v)) return "\u2014";
  if (v >= 1e3) return fmt(v, 1);
  if (v >= 1) return fmt(v, 3);
  return fmt(v, 5);
}
function relTime(ms) {
  const n2 = Number(ms);
  if (!Number.isFinite(n2) || n2 <= 0) return "";
  const dt = Date.now() - n2;
  if (dt < 6e4) return t("time.now", "\u521A\u521A");
  if (dt < 36e5) return `${Math.floor(dt / 6e4)}m`;
  if (dt < 864e5) return `${Math.floor(dt / 36e5)}h`;
  return `${Math.floor(dt / 864e5)}d`;
}

// src/client/components/panel-icons.tsx
var React4 = __toESM(require("react"), 1);
var paths = {
  sessions: /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), /* @__PURE__ */ React4.createElement("path", { d: "M9 4v16M12 9h6M12 13h6" })),
  desk: /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("path", { d: "M3 19h18M4 15l4-5 4 3 5-7 3 2" }), /* @__PURE__ */ React4.createElement("circle", { cx: "17", cy: "6", r: "1" })),
  chat: /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("path", { d: "M4 5h16v11H9l-5 4V5Z" }), /* @__PURE__ */ React4.createElement("path", { d: "M8 9h8M8 12h5" }))
};
function PanelIcon({ kind, size: size3 = 18 }) {
  return /* @__PURE__ */ React4.createElement("svg", { width: size3, height: size3, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, paths[kind]);
}
function FoldIcon({ direction }) {
  return /* @__PURE__ */ React4.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ React4.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), /* @__PURE__ */ React4.createElement("path", { d: direction === "left" ? "M9 4v16m7-11-3 3 3 3" : "M15 4v16m-7-11 3 3-3 3" }));
}
function SearchIcon() {
  return /* @__PURE__ */ React4.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ React4.createElement("circle", { cx: "10.5", cy: "10.5", r: "6.5" }), /* @__PURE__ */ React4.createElement("path", { d: "m15.5 15.5 5 5" }));
}

// src/client/components/sessions-column.tsx
function SessionsColumn({ width, fill = false, onCollapse }) {
  const s = useStore();
  const [editing, setEditing] = React5.useState(null);
  const [saving, setSaving] = React5.useState(false);
  const rows = React5.useMemo(() => {
    const titleOf = (id) => s.sessionTitles?.[id] ?? null;
    return s.sessions.filter((row) => !s.archivedSessionIds.includes(row.sessionId) && (!s.nativeSessionsReady || s.nativeSessionIds.includes(row.sessionId))).map((row) => ({ ...row, title: titleOf(row.sessionId) ?? row.title ?? t("session.defaultTitle", "Hyperliquid \u4EA4\u6613\u4F1A\u8BDD") }));
  }, [s.sessions, s.sessionTitles, s.archivedSessionIds, s.nativeSessionsReady, s.nativeSessionIds, s.localeRevision]);
  const open = React5.useCallback((id, coin) => {
    void openSession(id, coin ?? store.get().activeCoin);
  }, []);
  const createSession = React5.useCallback(async () => {
    try {
      const sessionsSvc = getContext()?.get("sessions");
      if (!sessionsSvc) throw new Error(tr("sessions \u670D\u52A1\u4E0D\u53EF\u7528", "DSH sessions service unavailable"));
      const id = await sessionsSvc.create({});
      const row = await hyperCall("registerSession", { sessionId: id });
      await loadSessions();
      open(id, row.coin ?? "BTC");
    } catch (e) {
      notify(t("session.createFailed", "\u521B\u5EFA\u4EA4\u6613\u4F1A\u8BDD\u5931\u8D25") + "\uFF1A" + String(e?.message ?? e));
    }
  }, [open]);
  const saveTitle = React5.useCallback(async () => {
    if (!editing || saving) return;
    const title = editing.title.trim();
    if (!title) return;
    setSaving(true);
    try {
      const sessionsSvc = getContext()?.get("sessions");
      if (!sessionsSvc?.using) throw new Error(tr("DSH \u4F1A\u8BDD\u91CD\u547D\u540D\u4E0D\u53EF\u7528", "DSH session rename unavailable"));
      await sessionsSvc.using(editing.id, { source: "dsh-hyperliquid.rename" }, async (ref) => {
        await ref.ready;
        if (!ref.binding?.session?.rename) throw new Error(tr("DSH \u4F1A\u8BDD\u91CD\u547D\u540D\u4E0D\u53EF\u7528", "DSH session rename unavailable"));
        const result = await ref.binding.session.rename(title);
        if (result?.ok === false) throw new Error(result.error?.message ?? tr("\u91CD\u547D\u540D\u5931\u8D25", "Rename failed"));
      });
      store.patch((prev) => ({ sessionTitles: { ...prev.sessionTitles, [editing.id]: title } }));
      setEditing(null);
    } catch (error) {
      notify(t("session.renameFailed", "\u91CD\u547D\u540D\u5931\u8D25") + "\uFF1A" + String(error?.message ?? error));
    } finally {
      setSaving(false);
    }
  }, [editing, saving]);
  const archive = React5.useCallback(async (id) => {
    const before = store.get();
    const active = before.activeSessionId === id;
    const next = active ? before.sessions.find((row) => row.sessionId !== id && !before.archivedSessionIds.includes(row.sessionId) && (!before.nativeSessionsReady || before.nativeSessionIds.includes(row.sessionId))) : null;
    try {
      const ui = getContext()?.get("uiWorkspace");
      if (!ui?.archiveSession) throw new Error(tr("DSH \u5F52\u6863\u670D\u52A1\u4E0D\u53EF\u7528", "DSH archive service unavailable"));
      store.patch({
        archivedSessionIds: [.../* @__PURE__ */ new Set([...before.archivedSessionIds, id])],
        ...active ? { activeSessionId: next?.sessionId ?? null } : {}
      });
      if (active) {
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        if (getActiveRef()?.sessionId === id) throw new Error(tr("\u4F1A\u8BDD\u4ECD\u5728\u91CA\u653E\u4E2D\uFF0C\u8BF7\u91CD\u8BD5", "Session is still releasing; retry"));
        if (next) void openSession(next.sessionId, next.coin ?? store.get().activeCoin);
      }
      await ui.archiveSession(id);
    } catch (error) {
      store.patch((prev) => ({
        archivedSessionIds: prev.archivedSessionIds.filter((entry) => entry !== id),
        ...active ? { activeSessionId: id } : {}
      }));
      if (active) void openSession(id, before.sessions.find((row) => row.sessionId === id)?.coin ?? before.activeCoin);
      notify(t("session.archiveFailed", "\u5F52\u6863\u4F1A\u8BDD\u5931\u8D25") + "\uFF1A" + String(error?.message ?? error));
    }
  }, []);
  return /* @__PURE__ */ React5.createElement("div", { id: "dhl-panel-sessions", className: "dhl-col-sessions", style: fill ? { flex: "1 1 0", width: "auto" } : width ? { width } : void 0 }, /* @__PURE__ */ React5.createElement("div", { className: "dhl-col-head" }, t("sessions.title", "\u4EA4\u6613\u4F1A\u8BDD"), /* @__PURE__ */ React5.createElement("div", { className: "dhl-spacer" }), `${rows.length}`, /* @__PURE__ */ React5.createElement("button", { className: "dhl-panel-iconbtn", type: "button", onClick: onCollapse, "aria-label": tr("\u6536\u8D77\u4F1A\u8BDD\u680F", "Collapse sessions"), title: tr("\u6536\u8D77\u4F1A\u8BDD\u680F", "Collapse sessions") }, /* @__PURE__ */ React5.createElement(FoldIcon, { direction: "left" }))), /* @__PURE__ */ React5.createElement("button", { className: "dhl-newbtn", onClick: createSession }, "\uFF0B ", t("sessions.new", "\u65B0\u5EFA\u4EA4\u6613\u4F1A\u8BDD")), /* @__PURE__ */ React5.createElement("div", { style: { flex: "1", overflowY: "auto", minHeight: 0 } }, rows.length === 0 ? /* @__PURE__ */ React5.createElement("div", { className: "dhl-empty" }, t("sessions.empty", "\u8FD8\u6CA1\u6709\u4EA4\u6613\u4F1A\u8BDD\u3002\n\u70B9\u51FB\u4E0A\u65B9\u65B0\u5EFA\uFF0C\u5F00\u4E00\u4E2A\u4E13\u5C5E\u4EA4\u6613\u5BF9\u8BDD\u3002")) : rows.map((row) => /* @__PURE__ */ React5.createElement(
    "div",
    {
      key: row.sessionId,
      "data-session-id": row.sessionId,
      className: "dhl-srow" + (s.activeSessionId === row.sessionId ? " active" : ""),
      onClick: () => open(row.sessionId, row.coin),
      title: row.title ?? row.sessionId
    },
    /* @__PURE__ */ React5.createElement("span", { className: "coin" }, row.coin ?? "\u2014"),
    /* @__PURE__ */ React5.createElement("span", { className: "title" }, row.title ?? row.sessionId),
    /* @__PURE__ */ React5.createElement("span", { className: "t" }, relTime(row.updatedAt ?? row.createdAt ?? 0)),
    /* @__PURE__ */ React5.createElement("span", { className: "dhl-srow-actions" }, /* @__PURE__ */ React5.createElement("button", { className: "dhl-srow-action", type: "button", title: t("session.rename", "\u91CD\u547D\u540D"), "aria-label": t("session.rename", "\u91CD\u547D\u540D"), onClick: (event) => {
      event.stopPropagation();
      setEditing({ id: row.sessionId, title: row.title ?? "" });
    } }, "\u270E"), /* @__PURE__ */ React5.createElement("button", { className: "dhl-srow-action", type: "button", title: t("session.archive", "\u5F52\u6863"), "aria-label": t("session.archive", "\u5F52\u6863"), onClick: (event) => {
      event.stopPropagation();
      void archive(row.sessionId);
    } }, "\u2311"))
  ))), /* @__PURE__ */ React5.createElement(import_dsh_client_ui_primitives.Modal, { open: Boolean(editing), onClose: () => setEditing(null), title: t("session.rename", "\u91CD\u547D\u540D\u4F1A\u8BDD"), closeLabel: t("modal.close", "\u5173\u95ED"), className: "dhl-rename-modal", footer: /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("button", { type: "button", className: "dhl-modal-secondary", onClick: () => setEditing(null) }, t("modal.cancel", "\u53D6\u6D88")), /* @__PURE__ */ React5.createElement("button", { type: "button", className: "dhl-modal-primary", disabled: !editing?.title.trim() || saving, onClick: () => {
    void saveTitle();
  } }, t("modal.save", "\u4FDD\u5B58"))) }, /* @__PURE__ */ React5.createElement("input", { "data-modal-autofocus": true, className: "dhl-rename-input", value: editing?.title ?? "", onChange: (event) => setEditing((prev) => prev ? { ...prev, title: event.target.value } : null), onKeyDown: (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void saveTitle();
    }
  }, maxLength: 120, "aria-label": t("session.name", "\u4F1A\u8BDD\u540D\u79F0") })));
}

// src/client/components/desk-column.tsx
var React13 = __toESM(require("react"), 1);

// src/client/components/candle-chart.tsx
var React6 = __toESM(require("react"), 1);

// node_modules/fancy-canvas/size.mjs
function size(_a) {
  var width = _a.width, height = _a.height;
  if (width < 0) {
    throw new Error("Negative width is not allowed for Size");
  }
  if (height < 0) {
    throw new Error("Negative height is not allowed for Size");
  }
  return {
    width,
    height
  };
}
function equalSizes(first, second) {
  return first.width === second.width && first.height === second.height;
}

// node_modules/fancy-canvas/device-pixel-ratio.mjs
var Observable = (
  /** @class */
  (function() {
    function Observable2(win) {
      var _this = this;
      this._resolutionListener = function() {
        return _this._onResolutionChanged();
      };
      this._resolutionMediaQueryList = null;
      this._observers = [];
      this._window = win;
      this._installResolutionListener();
    }
    Observable2.prototype.dispose = function() {
      this._uninstallResolutionListener();
      this._window = null;
    };
    Object.defineProperty(Observable2.prototype, "value", {
      get: function() {
        return this._window.devicePixelRatio;
      },
      enumerable: false,
      configurable: true
    });
    Observable2.prototype.subscribe = function(next) {
      var _this = this;
      var observer = { next };
      this._observers.push(observer);
      return {
        unsubscribe: function() {
          _this._observers = _this._observers.filter(function(o) {
            return o !== observer;
          });
        }
      };
    };
    Observable2.prototype._installResolutionListener = function() {
      if (this._resolutionMediaQueryList !== null) {
        throw new Error("Resolution listener is already installed");
      }
      var dppx = this._window.devicePixelRatio;
      this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(dppx, "dppx)"));
      this._resolutionMediaQueryList.addListener(this._resolutionListener);
    };
    Observable2.prototype._uninstallResolutionListener = function() {
      if (this._resolutionMediaQueryList !== null) {
        this._resolutionMediaQueryList.removeListener(this._resolutionListener);
        this._resolutionMediaQueryList = null;
      }
    };
    Observable2.prototype._reinstallResolutionListener = function() {
      this._uninstallResolutionListener();
      this._installResolutionListener();
    };
    Observable2.prototype._onResolutionChanged = function() {
      var _this = this;
      this._observers.forEach(function(observer) {
        return observer.next(_this._window.devicePixelRatio);
      });
      this._reinstallResolutionListener();
    };
    return Observable2;
  })()
);
function createObservable(win) {
  return new Observable(win);
}

// node_modules/fancy-canvas/canvas-element-bitmap-size.mjs
var DevicePixelContentBoxBinding = (
  /** @class */
  (function() {
    function DevicePixelContentBoxBinding2(canvasElement, transformBitmapSize, options) {
      var _a;
      this._canvasElement = null;
      this._bitmapSizeChangedListeners = [];
      this._suggestedBitmapSize = null;
      this._suggestedBitmapSizeChangedListeners = [];
      this._devicePixelRatioObservable = null;
      this._canvasElementResizeObserver = null;
      this._canvasElement = canvasElement;
      this._canvasElementClientSize = size({
        width: this._canvasElement.clientWidth,
        height: this._canvasElement.clientHeight
      });
      this._transformBitmapSize = transformBitmapSize !== null && transformBitmapSize !== void 0 ? transformBitmapSize : (function(size3) {
        return size3;
      });
      this._allowResizeObserver = (_a = options === null || options === void 0 ? void 0 : options.allowResizeObserver) !== null && _a !== void 0 ? _a : true;
      this._chooseAndInitObserver();
    }
    DevicePixelContentBoxBinding2.prototype.dispose = function() {
      var _a, _b;
      if (this._canvasElement === null) {
        throw new Error("Object is disposed");
      }
      (_a = this._canvasElementResizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
      this._canvasElementResizeObserver = null;
      (_b = this._devicePixelRatioObservable) === null || _b === void 0 ? void 0 : _b.dispose();
      this._devicePixelRatioObservable = null;
      this._suggestedBitmapSizeChangedListeners.length = 0;
      this._bitmapSizeChangedListeners.length = 0;
      this._canvasElement = null;
    };
    Object.defineProperty(DevicePixelContentBoxBinding2.prototype, "canvasElement", {
      get: function() {
        if (this._canvasElement === null) {
          throw new Error("Object is disposed");
        }
        return this._canvasElement;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DevicePixelContentBoxBinding2.prototype, "canvasElementClientSize", {
      get: function() {
        return this._canvasElementClientSize;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DevicePixelContentBoxBinding2.prototype, "bitmapSize", {
      get: function() {
        return size({
          width: this.canvasElement.width,
          height: this.canvasElement.height
        });
      },
      enumerable: false,
      configurable: true
    });
    DevicePixelContentBoxBinding2.prototype.resizeCanvasElement = function(clientSize) {
      this._canvasElementClientSize = size(clientSize);
      this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px");
      this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px");
      this._invalidateBitmapSize();
    };
    DevicePixelContentBoxBinding2.prototype.subscribeBitmapSizeChanged = function(listener) {
      this._bitmapSizeChangedListeners.push(listener);
    };
    DevicePixelContentBoxBinding2.prototype.unsubscribeBitmapSizeChanged = function(listener) {
      this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(l) {
        return l !== listener;
      });
    };
    Object.defineProperty(DevicePixelContentBoxBinding2.prototype, "suggestedBitmapSize", {
      get: function() {
        return this._suggestedBitmapSize;
      },
      enumerable: false,
      configurable: true
    });
    DevicePixelContentBoxBinding2.prototype.subscribeSuggestedBitmapSizeChanged = function(listener) {
      this._suggestedBitmapSizeChangedListeners.push(listener);
    };
    DevicePixelContentBoxBinding2.prototype.unsubscribeSuggestedBitmapSizeChanged = function(listener) {
      this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(l) {
        return l !== listener;
      });
    };
    DevicePixelContentBoxBinding2.prototype.applySuggestedBitmapSize = function() {
      if (this._suggestedBitmapSize === null) {
        return;
      }
      var oldSuggestedSize = this._suggestedBitmapSize;
      this._suggestedBitmapSize = null;
      this._resizeBitmap(oldSuggestedSize);
      this._emitSuggestedBitmapSizeChanged(oldSuggestedSize, this._suggestedBitmapSize);
    };
    DevicePixelContentBoxBinding2.prototype._resizeBitmap = function(newSize) {
      var oldSize = this.bitmapSize;
      if (equalSizes(oldSize, newSize)) {
        return;
      }
      this.canvasElement.width = newSize.width;
      this.canvasElement.height = newSize.height;
      this._emitBitmapSizeChanged(oldSize, newSize);
    };
    DevicePixelContentBoxBinding2.prototype._emitBitmapSizeChanged = function(oldSize, newSize) {
      var _this = this;
      this._bitmapSizeChangedListeners.forEach(function(listener) {
        return listener.call(_this, oldSize, newSize);
      });
    };
    DevicePixelContentBoxBinding2.prototype._suggestNewBitmapSize = function(newSize) {
      var oldSuggestedSize = this._suggestedBitmapSize;
      var finalNewSize = size(this._transformBitmapSize(newSize, this._canvasElementClientSize));
      var newSuggestedSize = equalSizes(this.bitmapSize, finalNewSize) ? null : finalNewSize;
      if (oldSuggestedSize === null && newSuggestedSize === null) {
        return;
      }
      if (oldSuggestedSize !== null && newSuggestedSize !== null && equalSizes(oldSuggestedSize, newSuggestedSize)) {
        return;
      }
      this._suggestedBitmapSize = newSuggestedSize;
      this._emitSuggestedBitmapSizeChanged(oldSuggestedSize, newSuggestedSize);
    };
    DevicePixelContentBoxBinding2.prototype._emitSuggestedBitmapSizeChanged = function(oldSize, newSize) {
      var _this = this;
      this._suggestedBitmapSizeChangedListeners.forEach(function(listener) {
        return listener.call(_this, oldSize, newSize);
      });
    };
    DevicePixelContentBoxBinding2.prototype._chooseAndInitObserver = function() {
      var _this = this;
      if (!this._allowResizeObserver) {
        this._initDevicePixelRatioObservable();
        return;
      }
      isDevicePixelContentBoxSupported().then(function(isSupported) {
        return isSupported ? _this._initResizeObserver() : _this._initDevicePixelRatioObservable();
      });
    };
    DevicePixelContentBoxBinding2.prototype._initDevicePixelRatioObservable = function() {
      var _this = this;
      if (this._canvasElement === null) {
        return;
      }
      var win = canvasElementWindow(this._canvasElement);
      if (win === null) {
        throw new Error("No window is associated with the canvas");
      }
      this._devicePixelRatioObservable = createObservable(win);
      this._devicePixelRatioObservable.subscribe(function() {
        return _this._invalidateBitmapSize();
      });
      this._invalidateBitmapSize();
    };
    DevicePixelContentBoxBinding2.prototype._invalidateBitmapSize = function() {
      var _a, _b;
      if (this._canvasElement === null) {
        return;
      }
      var win = canvasElementWindow(this._canvasElement);
      if (win === null) {
        return;
      }
      var ratio = (_b = (_a = this._devicePixelRatioObservable) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : win.devicePixelRatio;
      var canvasRects = this._canvasElement.getClientRects();
      var newSize = (
        // eslint-disable-next-line no-negated-condition
        canvasRects[0] !== void 0 ? predictedBitmapSize(canvasRects[0], ratio) : size({
          width: this._canvasElementClientSize.width * ratio,
          height: this._canvasElementClientSize.height * ratio
        })
      );
      this._suggestNewBitmapSize(newSize);
    };
    DevicePixelContentBoxBinding2.prototype._initResizeObserver = function() {
      var _this = this;
      if (this._canvasElement === null) {
        return;
      }
      this._canvasElementResizeObserver = new ResizeObserver(function(entries) {
        var entry = entries.find(function(entry2) {
          return entry2.target === _this._canvasElement;
        });
        if (!entry || !entry.devicePixelContentBoxSize || !entry.devicePixelContentBoxSize[0]) {
          return;
        }
        var entrySize = entry.devicePixelContentBoxSize[0];
        var newSize = size({
          width: entrySize.inlineSize,
          height: entrySize.blockSize
        });
        _this._suggestNewBitmapSize(newSize);
      });
      this._canvasElementResizeObserver.observe(this._canvasElement, { box: "device-pixel-content-box" });
    };
    return DevicePixelContentBoxBinding2;
  })()
);
function bindTo(canvasElement, target) {
  if (target.type === "device-pixel-content-box") {
    return new DevicePixelContentBoxBinding(canvasElement, target.transform, target.options);
  }
  throw new Error("Unsupported binding target");
}
function canvasElementWindow(canvasElement) {
  return canvasElement.ownerDocument.defaultView;
}
function isDevicePixelContentBoxSupported() {
  return new Promise(function(resolve) {
    var ro = new ResizeObserver(function(entries) {
      resolve(entries.every(function(entry) {
        return "devicePixelContentBoxSize" in entry;
      }));
      ro.disconnect();
    });
    ro.observe(document.body, { box: "device-pixel-content-box" });
  }).catch(function() {
    return false;
  });
}
function predictedBitmapSize(canvasRect, ratio) {
  return size({
    width: Math.round(canvasRect.left * ratio + canvasRect.width * ratio) - Math.round(canvasRect.left * ratio),
    height: Math.round(canvasRect.top * ratio + canvasRect.height * ratio) - Math.round(canvasRect.top * ratio)
  });
}

// node_modules/fancy-canvas/canvas-rendering-target.mjs
var CanvasRenderingTarget2D = (
  /** @class */
  (function() {
    function CanvasRenderingTarget2D2(context, mediaSize, bitmapSize) {
      if (mediaSize.width === 0 || mediaSize.height === 0) {
        throw new TypeError("Rendering target could only be created on a media with positive width and height");
      }
      this._mediaSize = mediaSize;
      if (bitmapSize.width === 0 || bitmapSize.height === 0) {
        throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
      }
      this._bitmapSize = bitmapSize;
      this._context = context;
    }
    CanvasRenderingTarget2D2.prototype.useMediaCoordinateSpace = function(f) {
      try {
        this._context.save();
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio);
        return f({
          context: this._context,
          mediaSize: this._mediaSize
        });
      } finally {
        this._context.restore();
      }
    };
    CanvasRenderingTarget2D2.prototype.useBitmapCoordinateSpace = function(f) {
      try {
        this._context.save();
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        return f({
          context: this._context,
          mediaSize: this._mediaSize,
          bitmapSize: this._bitmapSize,
          horizontalPixelRatio: this._horizontalPixelRatio,
          verticalPixelRatio: this._verticalPixelRatio
        });
      } finally {
        this._context.restore();
      }
    };
    Object.defineProperty(CanvasRenderingTarget2D2.prototype, "_horizontalPixelRatio", {
      get: function() {
        return this._bitmapSize.width / this._mediaSize.width;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CanvasRenderingTarget2D2.prototype, "_verticalPixelRatio", {
      get: function() {
        return this._bitmapSize.height / this._mediaSize.height;
      },
      enumerable: false,
      configurable: true
    });
    return CanvasRenderingTarget2D2;
  })()
);
function tryCreateCanvasRenderingTarget2D(binding, contextOptions) {
  var mediaSize = binding.canvasElementClientSize;
  if (mediaSize.width === 0 || mediaSize.height === 0) {
    return null;
  }
  var bitmapSize = binding.bitmapSize;
  if (bitmapSize.width === 0 || bitmapSize.height === 0) {
    return null;
  }
  var context = binding.canvasElement.getContext("2d", contextOptions);
  if (context === null) {
    return null;
  }
  return new CanvasRenderingTarget2D(context, mediaSize, bitmapSize);
}

// node_modules/lightweight-charts/dist/lightweight-charts.development.mjs
var customStyleDefaults$1 = {
  color: "#2196f3"
};
var seriesOptionsDefaults = {
  title: "",
  visible: true,
  hitTestTolerance: 3,
  lastValueVisible: true,
  priceLineVisible: true,
  priceLineSource: 0,
  priceLineWidth: 1,
  priceLineColor: "",
  priceLineStyle: 2,
  baseLineVisible: true,
  baseLineWidth: 1,
  baseLineColor: "#B2B5BE",
  baseLineStyle: 0,
  priceFormat: {
    type: "price",
    precision: 2,
    minMove: 0.01
  }
};
var LineType;
(function(LineType2) {
  LineType2[LineType2["Simple"] = 0] = "Simple";
  LineType2[LineType2["WithSteps"] = 1] = "WithSteps";
  LineType2[LineType2["Curved"] = 2] = "Curved";
})(LineType || (LineType = {}));
var LineStyle;
(function(LineStyle2) {
  LineStyle2[LineStyle2["Solid"] = 0] = "Solid";
  LineStyle2[LineStyle2["Dotted"] = 1] = "Dotted";
  LineStyle2[LineStyle2["Dashed"] = 2] = "Dashed";
  LineStyle2[LineStyle2["LargeDashed"] = 3] = "LargeDashed";
  LineStyle2[LineStyle2["SparseDotted"] = 4] = "SparseDotted";
})(LineStyle || (LineStyle = {}));
function getDashPattern(style, lineWidth) {
  switch (style) {
    case 0:
      return [];
    case 1:
      return [lineWidth, lineWidth];
    case 2:
      return [2 * lineWidth, 2 * lineWidth];
    case 3:
      return [6 * lineWidth, 6 * lineWidth];
    case 4:
      return [lineWidth, 4 * lineWidth];
    default:
      return [];
  }
}
function getDashPatternLength(dashPattern) {
  return dashPattern.reduce((sum, val) => sum + val, 0);
}
function setLineStyle(ctx, style) {
  const dashPattern = getDashPattern(style, ctx.lineWidth);
  ctx.setLineDash(dashPattern);
  return dashPattern;
}
function drawHorizontalLine(ctx, y, left, right) {
  ctx.beginPath();
  const correction = ctx.lineWidth % 2 ? 0.5 : 0;
  ctx.moveTo(left, y + correction);
  ctx.lineTo(right, y + correction);
  ctx.stroke();
}
function drawVerticalLine(ctx, x, top, bottom) {
  ctx.beginPath();
  const correction = ctx.lineWidth % 2 ? 0.5 : 0;
  ctx.moveTo(x + correction, top);
  ctx.lineTo(x + correction, bottom);
  ctx.stroke();
}
function strokeInPixel(ctx, drawFunction) {
  ctx.save();
  if (ctx.lineWidth % 2) {
    ctx.translate(0.5, 0.5);
  }
  drawFunction();
  ctx.restore();
}
function assert(condition, message) {
  if (!condition) {
    throw new Error("Assertion failed" + (message ? ": " + message : ""));
  }
}
function ensureDefined(value) {
  if (value === void 0) {
    throw new Error("Value is undefined");
  }
  return value;
}
function ensureNotNull(value) {
  if (value === null) {
    throw new Error("Value is null");
  }
  return value;
}
function ensure(value) {
  return ensureNotNull(ensureDefined(value));
}
function ensureNever(value) {
}
var Delegate = class {
  constructor() {
    this._private__listeners = [];
  }
  _internal_subscribe(callback, linkedObject, singleshot) {
    const listener = {
      _internal_callback: callback,
      _internal_linkedObject: linkedObject,
      _internal_singleshot: singleshot === true
    };
    this._private__listeners.push(listener);
  }
  _internal_unsubscribe(callback) {
    const index = this._private__listeners.findIndex((listener) => callback === listener._internal_callback);
    if (index > -1) {
      this._private__listeners.splice(index, 1);
    }
  }
  _internal_unsubscribeAll(linkedObject) {
    this._private__listeners = this._private__listeners.filter((listener) => listener._internal_linkedObject !== linkedObject);
  }
  _internal_fire(param1, param2, param3) {
    const listenersSnapshot = [...this._private__listeners];
    this._private__listeners = this._private__listeners.filter((listener) => !listener._internal_singleshot);
    listenersSnapshot.forEach((listener) => listener._internal_callback(param1, param2, param3));
  }
  _internal_hasListeners() {
    return this._private__listeners.length > 0;
  }
  _internal_destroy() {
    this._private__listeners = [];
  }
};
function merge(dst, ...sources) {
  for (const src of sources) {
    for (const i in src) {
      if (src[i] === void 0 || !Object.prototype.hasOwnProperty.call(src, i) || ["__proto__", "constructor", "prototype"].includes(i)) {
        continue;
      }
      if ("object" !== typeof src[i] || dst[i] === void 0 || Array.isArray(src[i])) {
        dst[i] = src[i];
      } else {
        merge(dst[i], src[i]);
      }
    }
  }
  return dst;
}
function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}
function isInteger(value) {
  return typeof value === "number" && value % 1 === 0;
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function clone(object) {
  const o = object;
  if (!o || "object" !== typeof o) {
    return o;
  }
  let c;
  if (Array.isArray(o)) {
    c = [];
  } else {
    c = {};
  }
  let p;
  let v;
  for (p in o) {
    if (o.hasOwnProperty(p)) {
      v = o[p];
      if (v && "object" === typeof v) {
        c[p] = clone(v);
      } else {
        c[p] = v;
      }
    }
  }
  return c;
}
function notNull(t2) {
  return t2 !== null;
}
function undefinedIfNull(t2) {
  return t2 === null ? void 0 : t2;
}
var defaultFontFamily = `-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif`;
function makeFont(size3, family, style) {
  if (style !== void 0) {
    style = `${style} `;
  } else {
    style = "";
  }
  if (family === void 0) {
    family = defaultFontFamily;
  }
  return `${style}${size3}px ${family}`;
}
var PriceAxisRendererOptionsProvider = class {
  constructor(chartModel) {
    this._private__rendererOptions = {
      _internal_borderSize: 1,
      _internal_tickLength: 5,
      _internal_fontSize: NaN,
      _internal_font: "",
      _internal_fontFamily: "",
      _internal_color: "",
      _internal_paneBackgroundColor: "",
      _internal_paddingBottom: 0,
      _internal_paddingInner: 0,
      _internal_paddingOuter: 0,
      _internal_paddingTop: 0,
      _internal_baselineOffset: 0
    };
    this._private__chartModel = chartModel;
  }
  _internal_options() {
    const rendererOptions = this._private__rendererOptions;
    const currentFontSize = this._private__fontSize();
    const currentFontFamily = this._private__fontFamily();
    if (rendererOptions._internal_fontSize !== currentFontSize || rendererOptions._internal_fontFamily !== currentFontFamily) {
      rendererOptions._internal_fontSize = currentFontSize;
      rendererOptions._internal_fontFamily = currentFontFamily;
      rendererOptions._internal_font = makeFont(currentFontSize, currentFontFamily);
      rendererOptions._internal_paddingTop = 2.5 / 12 * currentFontSize;
      rendererOptions._internal_paddingBottom = rendererOptions._internal_paddingTop;
      rendererOptions._internal_paddingInner = currentFontSize / 12 * rendererOptions._internal_tickLength;
      rendererOptions._internal_paddingOuter = currentFontSize / 12 * rendererOptions._internal_tickLength;
      rendererOptions._internal_baselineOffset = 0;
    }
    rendererOptions._internal_color = this._private__textColor();
    rendererOptions._internal_paneBackgroundColor = this._private__paneBackgroundColor();
    return this._private__rendererOptions;
  }
  _private__textColor() {
    return this._private__chartModel._internal_options()["layout"].textColor;
  }
  _private__paneBackgroundColor() {
    return this._private__chartModel._internal_backgroundTopColor();
  }
  _private__fontSize() {
    return this._private__chartModel._internal_options()["layout"].fontSize;
  }
  _private__fontFamily() {
    return this._private__chartModel._internal_options()["layout"].fontFamily;
  }
};
function normalizeRgbComponent(component) {
  if (component < 0) {
    return 0;
  }
  if (component > 255) {
    return 255;
  }
  return Math.round(component) || 0;
}
function normalizeAlphaComponent(component) {
  if (component <= 0 || component > 1) {
    return Math.min(Math.max(component, 0), 1);
  }
  return Math.round(component * 1e4) / 1e4;
}
function rgbaToGrayscale(rgbValue) {
  const redComponentGrayscaleWeight = 0.199;
  const greenComponentGrayscaleWeight = 0.687;
  const blueComponentGrayscaleWeight = 0.114;
  return redComponentGrayscaleWeight * rgbValue[0] + greenComponentGrayscaleWeight * rgbValue[1] + blueComponentGrayscaleWeight * rgbValue[2];
}
function getRgbStringViaBrowser(color) {
  const element = document.createElement("div");
  element.style.display = "none";
  document.body.appendChild(element);
  element.style.color = color;
  const computed = window.getComputedStyle(element).color;
  document.body.removeChild(element);
  return computed;
}
var ColorParser = class {
  constructor(customParsers, initialCache) {
    this._private__rgbaCache = /* @__PURE__ */ new Map();
    this._private__customParsers = customParsers;
    if (initialCache) {
      this._private__rgbaCache = initialCache;
    }
  }
  /**
   * We fallback to RGBA here since supporting alpha transformations
   * on wider color gamuts would currently be a lot of extra code
   * for very little benefit due to actual usage.
   */
  _internal_applyAlpha(color, alpha) {
    if (color === "transparent") {
      return color;
    }
    const originRgba = this._private__parseColor(color);
    const originAlpha = originRgba[3];
    return `rgba(${originRgba[0]}, ${originRgba[1]}, ${originRgba[2]}, ${alpha * originAlpha})`;
  }
  _internal_generateContrastColors(background) {
    const rgba = this._private__parseColor(background);
    return {
      _internal_background: `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`,
      // no alpha
      _internal_foreground: rgbaToGrayscale(rgba) > 160 ? "black" : "white"
    };
  }
  _internal_colorStringToGrayscale(background) {
    return rgbaToGrayscale(this._private__parseColor(background));
  }
  _internal_gradientColorAtPercent(topColor, bottomColor, percent) {
    const [topR, topG, topB, topA] = this._private__parseColor(topColor);
    const [bottomR, bottomG, bottomB, bottomA] = this._private__parseColor(bottomColor);
    const resultRgba = [
      normalizeRgbComponent(topR + percent * (bottomR - topR)),
      normalizeRgbComponent(topG + percent * (bottomG - topG)),
      normalizeRgbComponent(topB + percent * (bottomB - topB)),
      normalizeAlphaComponent(topA + percent * (bottomA - topA))
    ];
    return `rgba(${resultRgba[0]}, ${resultRgba[1]}, ${resultRgba[2]}, ${resultRgba[3]})`;
  }
  _private__parseColor(color) {
    const cached = this._private__rgbaCache.get(color);
    if (cached) {
      return cached;
    }
    const computed = getRgbStringViaBrowser(color);
    const match = computed.match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
    if (!match) {
      if (this._private__customParsers.length) {
        for (const parser of this._private__customParsers) {
          const result = parser(color);
          if (result) {
            this._private__rgbaCache.set(color, result);
            return result;
          }
        }
      }
      throw new Error(`Failed to parse color: ${color}`);
    }
    const rgba = [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10),
      match[4] ? parseFloat(match[4]) : 1
    ];
    this._private__rgbaCache.set(color, rgba);
    return rgba;
  }
};
var CompositeRenderer = class {
  constructor() {
    this._private__renderers = [];
  }
  _internal_setRenderers(renderers) {
    this._private__renderers = renderers;
  }
  _internal_draw(target, isHovered, hitTestData) {
    this._private__renderers.forEach((r) => {
      r._internal_draw(target, isHovered, hitTestData);
    });
  }
};
var BitmapCoordinatesPaneRenderer = class {
  _internal_draw(target, isHovered, hitTestData) {
    target.useBitmapCoordinateSpace((scope) => this._internal__drawImpl(scope, isHovered, hitTestData));
  }
};
var PaneRendererMarks = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._internal__data = null;
  }
  _internal_setData(data) {
    this._internal__data = data;
  }
  _internal__drawImpl({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._internal__data === null || this._internal__data._internal_visibleRange === null) {
      return;
    }
    const visibleRange = this._internal__data._internal_visibleRange;
    const data = this._internal__data;
    const tickWidth = Math.max(1, Math.floor(horizontalPixelRatio));
    const correction = tickWidth % 2 / 2;
    const draw = (radiusMedia) => {
      ctx.beginPath();
      for (let i = visibleRange.to - 1; i >= visibleRange.from; --i) {
        const point = data._internal_items[i];
        const centerX = Math.round(point._internal_x * horizontalPixelRatio) + correction;
        const centerY = point._internal_y * verticalPixelRatio;
        const radius2 = radiusMedia * verticalPixelRatio + correction;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius2, 0, Math.PI * 2);
      }
      ctx.fill();
    };
    if (data._internal_lineWidth > 0) {
      ctx.fillStyle = data._internal_backColor;
      draw(data._internal_radius + data._internal_lineWidth);
    }
    ctx.fillStyle = data._internal_lineColor;
    draw(data._internal_radius);
  }
};
function createEmptyMarkerData() {
  return {
    _internal_items: [{
      _internal_x: 0,
      _internal_y: 0,
      _internal_time: 0,
      _internal_price: 0
    }],
    _internal_lineColor: "",
    _internal_backColor: "",
    _internal_radius: 0,
    _internal_lineWidth: 0,
    _internal_visibleRange: null
  };
}
var rangeForSinglePoint = { from: 0, to: 1 };
var CrosshairMarksPaneView = class {
  constructor(chartModel, crosshair, pane) {
    this._private__compositeRenderer = new CompositeRenderer();
    this._private__markersRenderers = [];
    this._private__markersData = [];
    this._private__invalidated = true;
    this._private__chartModel = chartModel;
    this._private__crosshair = crosshair;
    this._private__pane = pane;
    this._private__compositeRenderer._internal_setRenderers(this._private__markersRenderers);
  }
  _internal_update(updateType) {
    this._private__createMarkerRenderersIfNeeded();
    this._private__invalidated = true;
  }
  _internal_renderer() {
    if (this._private__invalidated) {
      this._private__updateImpl();
      this._private__invalidated = false;
    }
    return this._private__compositeRenderer;
  }
  _private__createMarkerRenderersIfNeeded() {
    const serieses = this._private__pane._internal_orderedSources();
    if (serieses.length !== this._private__markersRenderers.length) {
      this._private__markersData = serieses.map(createEmptyMarkerData);
      this._private__markersRenderers = this._private__markersData.map((data) => {
        const res = new PaneRendererMarks();
        res._internal_setData(data);
        return res;
      });
      this._private__compositeRenderer._internal_setRenderers(this._private__markersRenderers);
    }
  }
  _private__updateImpl() {
    const forceHidden = this._private__crosshair._internal_options().mode === 2 || !this._private__crosshair._internal_visible();
    const serieses = this._private__pane._internal_orderedSeries();
    const timePointIndex = this._private__crosshair._internal_appliedIndex();
    const timeScale = this._private__chartModel._internal_timeScale();
    this._private__createMarkerRenderersIfNeeded();
    serieses.forEach((s, index) => {
      const data = this._private__markersData[index];
      const seriesData = s._internal_markerDataAtIndex(timePointIndex);
      const firstValue = s._internal_firstValue();
      if (forceHidden || seriesData === null || !s._internal_visible() || firstValue === null) {
        data._internal_visibleRange = null;
        return;
      }
      data._internal_lineColor = seriesData._internal_backgroundColor;
      data._internal_radius = seriesData._internal_radius;
      data._internal_lineWidth = seriesData._internal_borderWidth;
      data._internal_items[0]._internal_price = seriesData._internal_price;
      data._internal_items[0]._internal_y = s._internal_priceScale()._internal_priceToCoordinate(seriesData._internal_price, firstValue._internal_value);
      data._internal_backColor = seriesData._internal_borderColor ?? this._private__chartModel._internal_backgroundColorAtYPercentFromTop(data._internal_items[0]._internal_y / s._internal_priceScale()._internal_height());
      data._internal_items[0]._internal_time = timePointIndex;
      data._internal_items[0]._internal_x = timeScale._internal_indexToCoordinate(timePointIndex);
      data._internal_visibleRange = rangeForSinglePoint;
    });
  }
};
var CrosshairRenderer = class extends BitmapCoordinatesPaneRenderer {
  constructor(data) {
    super();
    this._private__data = data;
  }
  _internal__drawImpl({ context: ctx, bitmapSize, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._private__data === null) {
      return;
    }
    const vertLinesVisible = this._private__data._internal_vertLine._internal_visible;
    const horzLinesVisible = this._private__data._internal_horzLine._internal_visible;
    if (!vertLinesVisible && !horzLinesVisible) {
      return;
    }
    const x = Math.round(this._private__data._internal_x * horizontalPixelRatio);
    const y = Math.round(this._private__data._internal_y * verticalPixelRatio);
    ctx.lineCap = "butt";
    if (vertLinesVisible && x >= 0) {
      ctx.lineWidth = Math.floor(this._private__data._internal_vertLine._internal_lineWidth * horizontalPixelRatio);
      ctx.strokeStyle = this._private__data._internal_vertLine._internal_color;
      ctx.fillStyle = this._private__data._internal_vertLine._internal_color;
      setLineStyle(ctx, this._private__data._internal_vertLine._internal_lineStyle);
      drawVerticalLine(ctx, x, 0, bitmapSize.height);
    }
    if (horzLinesVisible && y >= 0) {
      ctx.lineWidth = Math.floor(this._private__data._internal_horzLine._internal_lineWidth * verticalPixelRatio);
      ctx.strokeStyle = this._private__data._internal_horzLine._internal_color;
      ctx.fillStyle = this._private__data._internal_horzLine._internal_color;
      setLineStyle(ctx, this._private__data._internal_horzLine._internal_lineStyle);
      drawHorizontalLine(ctx, y, 0, bitmapSize.width);
    }
  }
};
var CrosshairPaneView = class {
  constructor(source, pane) {
    this._private__invalidated = true;
    this._private__rendererData = {
      _internal_vertLine: {
        _internal_lineWidth: 1,
        _internal_lineStyle: 0,
        _internal_color: "",
        _internal_visible: false
      },
      _internal_horzLine: {
        _internal_lineWidth: 1,
        _internal_lineStyle: 0,
        _internal_color: "",
        _internal_visible: false
      },
      _internal_x: 0,
      _internal_y: 0
    };
    this._private__renderer = new CrosshairRenderer(this._private__rendererData);
    this._private__source = source;
    this._private__pane = pane;
  }
  _internal_update() {
    this._private__invalidated = true;
  }
  _internal_renderer(pane) {
    if (this._private__invalidated) {
      this._private__updateImpl();
      this._private__invalidated = false;
    }
    return this._private__renderer;
  }
  _private__updateImpl() {
    const visible = this._private__source._internal_visible();
    const crosshairOptions = this._private__pane._internal_model()._internal_options().crosshair;
    const data = this._private__rendererData;
    if (crosshairOptions.mode === 2) {
      data._internal_horzLine._internal_visible = false;
      data._internal_vertLine._internal_visible = false;
      return;
    }
    data._internal_horzLine._internal_visible = visible && this._private__source._internal_horzLineVisible(this._private__pane);
    data._internal_vertLine._internal_visible = visible && this._private__source._internal_vertLineVisible();
    data._internal_horzLine._internal_lineWidth = crosshairOptions.horzLine.width;
    data._internal_horzLine._internal_lineStyle = crosshairOptions.horzLine.style;
    data._internal_horzLine._internal_color = crosshairOptions.horzLine.color;
    data._internal_vertLine._internal_lineWidth = crosshairOptions.vertLine.width;
    data._internal_vertLine._internal_lineStyle = crosshairOptions.vertLine.style;
    data._internal_vertLine._internal_color = crosshairOptions.vertLine.color;
    data._internal_x = this._private__source._internal_appliedX();
    data._internal_y = this._private__source._internal_appliedY();
  }
};
function fillRectInnerBorder(ctx, x, y, width, height, borderWidth) {
  ctx.fillRect(x + borderWidth, y, width - borderWidth * 2, borderWidth);
  ctx.fillRect(x + borderWidth, y + height - borderWidth, width - borderWidth * 2, borderWidth);
  ctx.fillRect(x, y, borderWidth, height);
  ctx.fillRect(x + width - borderWidth, y, borderWidth, height);
}
function clearRect(ctx, x, y, w, h, clearColor) {
  ctx.save();
  ctx.globalCompositeOperation = "copy";
  ctx.fillStyle = clearColor;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}
function changeBorderRadius(borderRadius, offset) {
  return borderRadius.map((x) => x === 0 ? x : x + offset);
}
function drawRoundRect(ctx, x, y, w, h, radii) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, radii);
    return;
  }
  ctx.lineTo(x + w - radii[1], y);
  if (radii[1] !== 0) {
    ctx.arcTo(x + w, y, x + w, y + radii[1], radii[1]);
  }
  ctx.lineTo(x + w, y + h - radii[2]);
  if (radii[2] !== 0) {
    ctx.arcTo(x + w, y + h, x + w - radii[2], y + h, radii[2]);
  }
  ctx.lineTo(x + radii[3], y + h);
  if (radii[3] !== 0) {
    ctx.arcTo(x, y + h, x, y + h - radii[3], radii[3]);
  }
  ctx.lineTo(x, y + radii[0]);
  if (radii[0] !== 0) {
    ctx.arcTo(x, y, x + radii[0], y, radii[0]);
  }
}
function drawRoundRectWithBorder(ctx, left, top, width, height, backgroundColor, borderWidth = 0, outerBorderRadius = [0, 0, 0, 0], borderColor = "") {
  ctx.save();
  if (!borderWidth || !borderColor || borderColor === backgroundColor) {
    drawRoundRect(ctx, left, top, width, height, outerBorderRadius);
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.restore();
    return;
  }
  const halfBorderWidth = borderWidth / 2;
  const radii = changeBorderRadius(outerBorderRadius, -halfBorderWidth);
  drawRoundRect(ctx, left + halfBorderWidth, top + halfBorderWidth, width - borderWidth, height - borderWidth, radii);
  if (backgroundColor !== "transparent") {
    ctx.fillStyle = backgroundColor;
    ctx.fill();
  }
  if (borderColor !== "transparent") {
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}
function clearRectWithGradient(ctx, x, y, w, h, topColor, bottomColor) {
  ctx.save();
  ctx.globalCompositeOperation = "copy";
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}
var PriceAxisViewRenderer = class {
  constructor(data, commonData) {
    this._internal_setData(data, commonData);
  }
  _internal_setData(data, commonData) {
    this._private__data = data;
    this._private__commonData = commonData;
  }
  _internal_height(rendererOptions, useSecondLine) {
    if (!this._private__data._internal_visible) {
      return 0;
    }
    return rendererOptions._internal_fontSize + rendererOptions._internal_paddingTop + rendererOptions._internal_paddingBottom;
  }
  _internal_draw(target, rendererOptions, textWidthCache, align) {
    if (!this._private__data._internal_visible || this._private__data._internal_text.length === 0) {
      return;
    }
    const textColor = this._private__data._internal_color;
    const backgroundColor = this._private__commonData._internal_background;
    const geometry = target.useBitmapCoordinateSpace((scope) => {
      const ctx = scope.context;
      ctx.font = rendererOptions._internal_font;
      const geom = this._private__calculateGeometry(scope, rendererOptions, textWidthCache, align);
      const gb = geom._internal_bitmap;
      if (geom._internal_alignRight) {
        drawRoundRectWithBorder(ctx, gb._internal_xOutside, gb._internal_yTop, gb._internal_totalWidth, gb._internal_totalHeight, backgroundColor, gb._internal_horzBorder, [gb._internal_radius, 0, 0, gb._internal_radius], backgroundColor);
      } else {
        drawRoundRectWithBorder(ctx, gb._internal_xInside, gb._internal_yTop, gb._internal_totalWidth, gb._internal_totalHeight, backgroundColor, gb._internal_horzBorder, [0, gb._internal_radius, gb._internal_radius, 0], backgroundColor);
      }
      if (this._private__data._internal_tickVisible) {
        ctx.fillStyle = textColor;
        ctx.fillRect(gb._internal_xInside, gb._internal_yMid, gb._internal_xTick - gb._internal_xInside, gb._internal_tickHeight);
      }
      if (this._private__data._internal_borderVisible) {
        ctx.fillStyle = rendererOptions._internal_paneBackgroundColor;
        ctx.fillRect(geom._internal_alignRight ? gb._internal_right - gb._internal_horzBorder : 0, gb._internal_yTop, gb._internal_horzBorder, gb._internal_yBottom - gb._internal_yTop);
      }
      return geom;
    });
    target.useMediaCoordinateSpace(({ context: ctx }) => {
      const gm = geometry._internal_media;
      ctx.font = rendererOptions._internal_font;
      ctx.textAlign = geometry._internal_alignRight ? "right" : "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;
      ctx.fillText(this._private__data._internal_text, gm._internal_xText, (gm._internal_yTop + gm._internal_yBottom) / 2 + gm._internal_textMidCorrection);
    });
  }
  _private__calculateGeometry(scope, rendererOptions, textWidthCache, align) {
    const { context: ctx, bitmapSize, mediaSize, horizontalPixelRatio, verticalPixelRatio } = scope;
    const tickSize = this._private__data._internal_tickVisible || !this._private__data._internal_moveTextToInvisibleTick ? rendererOptions._internal_tickLength : 0;
    const horzBorder = this._private__data._internal_separatorVisible ? rendererOptions._internal_borderSize : 0;
    const paddingTop = rendererOptions._internal_paddingTop + this._private__commonData._internal_additionalPaddingTop;
    const paddingBottom = rendererOptions._internal_paddingBottom + this._private__commonData._internal_additionalPaddingBottom;
    const paddingInner = rendererOptions._internal_paddingInner;
    const paddingOuter = rendererOptions._internal_paddingOuter;
    const text = this._private__data._internal_text;
    const actualTextHeight = rendererOptions._internal_fontSize;
    const textMidCorrection = textWidthCache._internal_yMidCorrection(ctx, text);
    const textWidth = Math.ceil(textWidthCache._internal_measureText(ctx, text));
    const totalHeight = actualTextHeight + paddingTop + paddingBottom;
    const totalWidth = rendererOptions._internal_borderSize + paddingInner + paddingOuter + textWidth + tickSize;
    const tickHeightBitmap = Math.max(1, Math.floor(verticalPixelRatio));
    let totalHeightBitmap = Math.round(totalHeight * verticalPixelRatio);
    if (totalHeightBitmap % 2 !== tickHeightBitmap % 2) {
      totalHeightBitmap += 1;
    }
    const horzBorderBitmap = horzBorder > 0 ? Math.max(1, Math.floor(horzBorder * horizontalPixelRatio)) : 0;
    const totalWidthBitmap = Math.round(totalWidth * horizontalPixelRatio);
    const tickSizeBitmap = Math.round(tickSize * horizontalPixelRatio);
    const yMid = this._private__commonData._internal_fixedCoordinate ?? this._private__commonData._internal_renderCoordinate ?? this._private__commonData._internal_coordinate;
    const yMidBitmap = Math.round(yMid * verticalPixelRatio) - Math.floor(verticalPixelRatio * 0.5);
    const yTopBitmap = Math.floor(yMidBitmap + tickHeightBitmap / 2 - totalHeightBitmap / 2);
    const yBottomBitmap = yTopBitmap + totalHeightBitmap;
    const alignRight = align === "right";
    const xInside = alignRight ? mediaSize.width - horzBorder : horzBorder;
    const xInsideBitmap = alignRight ? bitmapSize.width - horzBorderBitmap : horzBorderBitmap;
    let xOutsideBitmap;
    let xTickBitmap;
    let xText;
    if (alignRight) {
      xOutsideBitmap = xInsideBitmap - totalWidthBitmap;
      xTickBitmap = xInsideBitmap - tickSizeBitmap;
      xText = xInside - tickSize - paddingInner - horzBorder;
    } else {
      xOutsideBitmap = xInsideBitmap + totalWidthBitmap;
      xTickBitmap = xInsideBitmap + tickSizeBitmap;
      xText = xInside + tickSize + paddingInner;
    }
    return {
      _internal_alignRight: alignRight,
      _internal_bitmap: {
        _internal_yTop: yTopBitmap,
        _internal_yMid: yMidBitmap,
        _internal_yBottom: yBottomBitmap,
        _internal_totalWidth: totalWidthBitmap,
        _internal_totalHeight: totalHeightBitmap,
        // TODO: it is better to have different horizontal and vertical radii
        _internal_radius: 2 * horizontalPixelRatio,
        _internal_horzBorder: horzBorderBitmap,
        _internal_xOutside: xOutsideBitmap,
        _internal_xInside: xInsideBitmap,
        _internal_xTick: xTickBitmap,
        _internal_tickHeight: tickHeightBitmap,
        _internal_right: bitmapSize.width
      },
      _internal_media: {
        _internal_yTop: yTopBitmap / verticalPixelRatio,
        _internal_yBottom: yBottomBitmap / verticalPixelRatio,
        _internal_xText: xText,
        _internal_textMidCorrection: textMidCorrection
      }
    };
  }
};
var PriceAxisView = class {
  constructor(ctor) {
    this._private__commonRendererData = {
      _internal_coordinate: 0,
      _internal_background: "#000",
      _internal_additionalPaddingBottom: 0,
      _internal_additionalPaddingTop: 0
    };
    this._private__axisRendererData = {
      _internal_text: "",
      _internal_visible: false,
      _internal_tickVisible: true,
      _internal_moveTextToInvisibleTick: false,
      _internal_borderColor: "",
      _internal_color: "#FFF",
      _internal_borderVisible: false,
      _internal_separatorVisible: false
    };
    this._private__paneRendererData = {
      _internal_text: "",
      _internal_visible: false,
      _internal_tickVisible: false,
      _internal_moveTextToInvisibleTick: true,
      _internal_borderColor: "",
      _internal_color: "#FFF",
      _internal_borderVisible: true,
      _internal_separatorVisible: true
    };
    this._private__invalidated = true;
    this._private__axisRenderer = new (ctor || PriceAxisViewRenderer)(this._private__axisRendererData, this._private__commonRendererData);
    this._private__paneRenderer = new (ctor || PriceAxisViewRenderer)(this._private__paneRendererData, this._private__commonRendererData);
  }
  _internal_text() {
    this._private__updateRendererDataIfNeeded();
    return this._private__axisRendererData._internal_text;
  }
  _internal_coordinate() {
    this._private__updateRendererDataIfNeeded();
    return this._private__commonRendererData._internal_coordinate;
  }
  _internal_update() {
    this._private__invalidated = true;
  }
  _internal_height(rendererOptions, useSecondLine = false) {
    return Math.max(this._private__axisRenderer._internal_height(rendererOptions, useSecondLine), this._private__paneRenderer._internal_height(rendererOptions, useSecondLine));
  }
  _internal_getFixedCoordinate() {
    return this._private__commonRendererData._internal_fixedCoordinate ?? null;
  }
  _internal_getRenderCoordinate() {
    return this._private__commonRendererData._internal_fixedCoordinate ?? this._private__commonRendererData._internal_renderCoordinate ?? this._internal_coordinate();
  }
  _internal_setRenderCoordinate(value) {
    this._private__commonRendererData._internal_renderCoordinate = value ?? void 0;
  }
  _internal_isVisible() {
    this._private__updateRendererDataIfNeeded();
    return this._private__axisRendererData._internal_visible || this._private__paneRendererData._internal_visible;
  }
  _internal_isAxisLabelVisible() {
    this._private__updateRendererDataIfNeeded();
    return this._private__axisRendererData._internal_visible;
  }
  _internal_renderer(priceScale) {
    this._private__updateRendererDataIfNeeded();
    this._private__axisRendererData._internal_tickVisible = this._private__axisRendererData._internal_tickVisible && priceScale._internal_options().ticksVisible;
    this._private__paneRendererData._internal_tickVisible = this._private__paneRendererData._internal_tickVisible && priceScale._internal_options().ticksVisible;
    this._private__axisRenderer._internal_setData(this._private__axisRendererData, this._private__commonRendererData);
    this._private__paneRenderer._internal_setData(this._private__paneRendererData, this._private__commonRendererData);
    return this._private__axisRenderer;
  }
  _internal_paneRenderer() {
    this._private__updateRendererDataIfNeeded();
    this._private__axisRenderer._internal_setData(this._private__axisRendererData, this._private__commonRendererData);
    this._private__paneRenderer._internal_setData(this._private__paneRendererData, this._private__commonRendererData);
    return this._private__paneRenderer;
  }
  _private__updateRendererDataIfNeeded() {
    if (this._private__invalidated) {
      this._private__axisRendererData._internal_tickVisible = true;
      this._private__paneRendererData._internal_tickVisible = false;
      this._internal__updateRendererData(this._private__axisRendererData, this._private__paneRendererData, this._private__commonRendererData);
    }
  }
};
var CrosshairPriceAxisView = class extends PriceAxisView {
  constructor(source, priceScale, valueProvider) {
    super();
    this._private__source = source;
    this._private__priceScale = priceScale;
    this._private__valueProvider = valueProvider;
  }
  _internal__updateRendererData(axisRendererData, paneRendererData, commonRendererData) {
    axisRendererData._internal_visible = false;
    if (this._private__source._internal_options().mode === 2) {
      return;
    }
    const options = this._private__source._internal_options().horzLine;
    if (!options.labelVisible) {
      return;
    }
    const firstValue = this._private__priceScale._internal_firstValue();
    if (!this._private__source._internal_visible() || this._private__priceScale._internal_isEmpty() || firstValue === null) {
      return;
    }
    const colors = this._private__priceScale._internal_colorParser()._internal_generateContrastColors(options.labelBackgroundColor);
    commonRendererData._internal_background = colors._internal_background;
    axisRendererData._internal_color = colors._internal_foreground;
    const additionalPadding = 2 / 12 * this._private__priceScale._internal_fontSize();
    commonRendererData._internal_additionalPaddingTop = additionalPadding;
    commonRendererData._internal_additionalPaddingBottom = additionalPadding;
    const value = this._private__valueProvider(this._private__priceScale);
    commonRendererData._internal_coordinate = value._internal_coordinate;
    axisRendererData._internal_text = this._private__priceScale._internal_formatPrice(value._internal_price, firstValue);
    axisRendererData._internal_visible = true;
  }
};
var optimizationReplacementRe = /[1-9]/g;
var radius$1 = 2;
var TimeAxisViewRenderer = class {
  constructor() {
    this._private__data = null;
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  _internal_draw(target, rendererOptions) {
    if (this._private__data === null || this._private__data._internal_visible === false || this._private__data._internal_text.length === 0) {
      return;
    }
    const textWidth = target.useMediaCoordinateSpace(({ context: ctx }) => {
      ctx.font = rendererOptions._internal_font;
      return Math.round(rendererOptions._internal_widthCache._internal_measureText(ctx, ensureNotNull(this._private__data)._internal_text, optimizationReplacementRe));
    });
    if (textWidth <= 0) {
      return;
    }
    const horzMargin = rendererOptions._internal_paddingHorizontal;
    const labelWidth = textWidth + 2 * horzMargin;
    const labelWidthHalf = labelWidth / 2;
    const timeScaleWidth = this._private__data._internal_width;
    let coordinate = this._private__data._internal_coordinate;
    let x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
    if (x1 < 0) {
      coordinate = coordinate + Math.abs(0 - x1);
      x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
    } else if (x1 + labelWidth > timeScaleWidth) {
      coordinate = coordinate - Math.abs(timeScaleWidth - (x1 + labelWidth));
      x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
    }
    const x2 = x1 + labelWidth;
    const y1 = 0;
    const y2 = Math.ceil(y1 + rendererOptions._internal_borderSize + rendererOptions._internal_tickLength + rendererOptions._internal_paddingTop + rendererOptions._internal_fontSize + rendererOptions._internal_paddingBottom);
    target.useBitmapCoordinateSpace(({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) => {
      const data = ensureNotNull(this._private__data);
      ctx.fillStyle = data._internal_background;
      const x1scaled = Math.round(x1 * horizontalPixelRatio);
      const y1scaled = Math.round(y1 * verticalPixelRatio);
      const x2scaled = Math.round(x2 * horizontalPixelRatio);
      const y2scaled = Math.round(y2 * verticalPixelRatio);
      const radiusScaled = Math.round(radius$1 * horizontalPixelRatio);
      ctx.beginPath();
      ctx.moveTo(x1scaled, y1scaled);
      ctx.lineTo(x1scaled, y2scaled - radiusScaled);
      ctx.arcTo(x1scaled, y2scaled, x1scaled + radiusScaled, y2scaled, radiusScaled);
      ctx.lineTo(x2scaled - radiusScaled, y2scaled);
      ctx.arcTo(x2scaled, y2scaled, x2scaled, y2scaled - radiusScaled, radiusScaled);
      ctx.lineTo(x2scaled, y1scaled);
      ctx.fill();
      if (data._internal_tickVisible) {
        const tickX = Math.round(data._internal_coordinate * horizontalPixelRatio);
        const tickTop = y1scaled;
        const tickBottom = Math.round((tickTop + rendererOptions._internal_tickLength) * verticalPixelRatio);
        ctx.fillStyle = data._internal_color;
        const tickWidth = Math.max(1, Math.floor(horizontalPixelRatio));
        const tickOffset = Math.floor(horizontalPixelRatio * 0.5);
        ctx.fillRect(tickX - tickOffset, tickTop, tickWidth, tickBottom - tickTop);
      }
    });
    target.useMediaCoordinateSpace(({ context: ctx }) => {
      const data = ensureNotNull(this._private__data);
      const yText = y1 + rendererOptions._internal_borderSize + rendererOptions._internal_tickLength + rendererOptions._internal_paddingTop + rendererOptions._internal_fontSize / 2;
      ctx.font = rendererOptions._internal_font;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = data._internal_color;
      const textYCorrection = rendererOptions._internal_widthCache._internal_yMidCorrection(ctx, "Apr0");
      ctx.translate(x1 + horzMargin, yText + textYCorrection);
      ctx.fillText(data._internal_text, 0, 0);
    });
  }
};
var CrosshairTimeAxisView = class {
  constructor(crosshair, model, valueProvider) {
    this._private__invalidated = true;
    this._private__renderer = new TimeAxisViewRenderer();
    this._private__rendererData = {
      _internal_visible: false,
      _internal_background: "#4c525e",
      _internal_color: "white",
      _internal_text: "",
      _internal_width: 0,
      _internal_coordinate: NaN,
      _internal_tickVisible: true
    };
    this._private__crosshair = crosshair;
    this._private__model = model;
    this._private__valueProvider = valueProvider;
  }
  _internal_update() {
    this._private__invalidated = true;
  }
  _internal_renderer() {
    if (this._private__invalidated) {
      this._private__updateImpl();
      this._private__invalidated = false;
    }
    this._private__renderer._internal_setData(this._private__rendererData);
    return this._private__renderer;
  }
  _private__updateImpl() {
    const data = this._private__rendererData;
    data._internal_visible = false;
    if (this._private__crosshair._internal_options().mode === 2) {
      return;
    }
    const options = this._private__crosshair._internal_options().vertLine;
    if (!options.labelVisible) {
      return;
    }
    const timeScale = this._private__model._internal_timeScale();
    if (timeScale._internal_isEmpty()) {
      return;
    }
    data._internal_width = timeScale._internal_width();
    const value = this._private__valueProvider();
    if (value === null) {
      return;
    }
    data._internal_coordinate = value._internal_coordinate;
    const currentTime = timeScale._internal_indexToTimeScalePoint(this._private__crosshair._internal_appliedIndex());
    data._internal_text = timeScale._internal_formatDateTime(ensureNotNull(currentTime));
    data._internal_visible = true;
    const colors = this._private__model._internal_colorParser()._internal_generateContrastColors(options.labelBackgroundColor);
    data._internal_background = colors._internal_background;
    data._internal_color = colors._internal_foreground;
    data._internal_tickVisible = timeScale._internal_options().ticksVisible;
  }
};
var DataSource = class {
  constructor() {
    this._internal__priceScale = null;
    this._private__zorder = 0;
  }
  _internal_zorder() {
    return this._private__zorder;
  }
  _internal_setZorder(zorder) {
    this._private__zorder = zorder;
  }
  _internal_priceScale() {
    return this._internal__priceScale;
  }
  _internal_setPriceScale(priceScale) {
    this._internal__priceScale = priceScale;
  }
  _internal_labelPaneViews(pane) {
    return [];
  }
  _internal_timeAxisViews() {
    return [];
  }
  _internal_visible() {
    return true;
  }
};
var CrosshairMode;
(function(CrosshairMode2) {
  CrosshairMode2[CrosshairMode2["Normal"] = 0] = "Normal";
  CrosshairMode2[CrosshairMode2["Magnet"] = 1] = "Magnet";
  CrosshairMode2[CrosshairMode2["Hidden"] = 2] = "Hidden";
  CrosshairMode2[CrosshairMode2["MagnetOHLC"] = 3] = "MagnetOHLC";
})(CrosshairMode || (CrosshairMode = {}));
var Crosshair = class extends DataSource {
  constructor(model, options) {
    super();
    this._private__pane = null;
    this._private__price = NaN;
    this._private__index = 0;
    this._private__visible = false;
    this._private__priceAxisViews = /* @__PURE__ */ new Map();
    this._private__subscribed = false;
    this._private__crosshairPaneViewCache = /* @__PURE__ */ new WeakMap();
    this._private__markersPaneViewCache = /* @__PURE__ */ new WeakMap();
    this._private__x = NaN;
    this._private__y = NaN;
    this._private__originX = NaN;
    this._private__originY = NaN;
    this._private__model = model;
    this._private__options = options;
    const valuePriceProvider = (rawPriceProvider, rawCoordinateProvider) => {
      return (priceScale) => {
        const coordinate = rawCoordinateProvider();
        const rawPrice = rawPriceProvider();
        if (priceScale === ensureNotNull(this._private__pane)._internal_defaultPriceScale()) {
          return { _internal_price: rawPrice, _internal_coordinate: coordinate };
        } else {
          const firstValue = ensureNotNull(priceScale._internal_firstValue());
          const price = priceScale._internal_coordinateToPrice(coordinate, firstValue);
          return { _internal_price: price, _internal_coordinate: coordinate };
        }
      };
    };
    const valueTimeProvider = (rawIndexProvider, rawCoordinateProvider) => {
      return () => {
        const time = this._private__model._internal_timeScale()._internal_indexToTime(rawIndexProvider());
        const coordinate = rawCoordinateProvider();
        if (!time || !Number.isFinite(coordinate)) {
          return null;
        }
        return {
          _internal_time: time,
          _internal_coordinate: coordinate
        };
      };
    };
    this._private__currentPosPriceProvider = valuePriceProvider(() => this._private__price, () => this._private__y);
    const currentPosTimeProvider = valueTimeProvider(() => this._private__index, () => this._internal_appliedX());
    this._private__timeAxisView = new CrosshairTimeAxisView(this, model, currentPosTimeProvider);
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_saveOriginCoord(x, y) {
    this._private__originX = x;
    this._private__originY = y;
  }
  _internal_clearOriginCoord() {
    this._private__originX = NaN;
    this._private__originY = NaN;
  }
  _internal_originCoordX() {
    return this._private__originX;
  }
  _internal_originCoordY() {
    return this._private__originY;
  }
  _internal_setPosition(index, price, pane) {
    if (!this._private__subscribed) {
      this._private__subscribed = true;
    }
    this._private__visible = true;
    this._private__tryToUpdateViews(index, price, pane);
  }
  _internal_appliedIndex() {
    return this._private__index;
  }
  _internal_appliedX() {
    return this._private__x;
  }
  _internal_appliedY() {
    return this._private__y;
  }
  _internal_visible() {
    return this._private__visible;
  }
  _internal_clearPosition() {
    this._private__visible = false;
    this._private__setIndexToLastSeriesBarIndex();
    this._private__price = NaN;
    this._private__x = NaN;
    this._private__y = NaN;
    this._private__pane = null;
    this._internal_clearOriginCoord();
    this._internal_updateAllViews();
  }
  _internal_snapToVisibleSeriesIfNeeded(index) {
    if (!this._private__options.doNotSnapToHiddenSeriesIndices) {
      return index;
    }
    const model = this._private__model;
    const timeScale = model._internal_timeScale();
    let closestLeftIndex = null;
    let closestRightIndex = null;
    for (const series of model._internal_visibleSerieses()) {
      const leftResult = series._internal_bars()._internal_search(
        index,
        -1
        /* MismatchDirection.NearestLeft */
      );
      if (leftResult) {
        if (leftResult._internal_index === index) {
          return index;
        }
        if (closestLeftIndex === null || leftResult._internal_index > closestLeftIndex) {
          closestLeftIndex = leftResult._internal_index;
        }
      }
      const rightResult = series._internal_bars()._internal_search(
        index,
        1
        /* MismatchDirection.NearestRight */
      );
      if (rightResult) {
        if (rightResult._internal_index === index) {
          return index;
        }
        if (closestRightIndex === null || rightResult._internal_index < closestRightIndex) {
          closestRightIndex = rightResult._internal_index;
        }
      }
    }
    const candidates = [closestLeftIndex, closestRightIndex].filter(notNull);
    if (candidates.length === 0) {
      return index;
    }
    const x = timeScale._internal_indexToCoordinate(index);
    const distances = candidates.map((i) => Math.abs(x - timeScale._internal_indexToCoordinate(i)));
    const minDistanceIndex = distances.indexOf(Math.min(...distances));
    return candidates[minDistanceIndex];
  }
  _internal_paneViews(pane) {
    let crosshairPaneView = this._private__crosshairPaneViewCache.get(pane);
    if (!crosshairPaneView) {
      crosshairPaneView = new CrosshairPaneView(this, pane);
      this._private__crosshairPaneViewCache.set(pane, crosshairPaneView);
    }
    let markersPaneView = this._private__markersPaneViewCache.get(pane);
    if (!markersPaneView) {
      markersPaneView = new CrosshairMarksPaneView(this._private__model, this, pane);
      this._private__markersPaneViewCache.set(pane, markersPaneView);
    }
    return [crosshairPaneView, markersPaneView];
  }
  _internal_horzLineVisible(pane) {
    return pane === this._private__pane && this._private__options.horzLine.visible;
  }
  _internal_vertLineVisible() {
    return this._private__options.vertLine.visible;
  }
  _internal_priceAxisViews(pane, priceScale) {
    if (!this._private__visible || this._private__pane !== pane) {
      this._private__priceAxisViews.clear();
    }
    const views = [];
    if (this._private__pane === pane) {
      views.push(this._private__createPriceAxisViewOnDemand(this._private__priceAxisViews, priceScale, this._private__currentPosPriceProvider));
    }
    return views;
  }
  _internal_timeAxisViews() {
    return this._private__visible ? [this._private__timeAxisView] : [];
  }
  _internal_pane() {
    return this._private__pane;
  }
  _internal_updateAllViews() {
    this._private__model._internal_panes().forEach((pane) => {
      this._private__crosshairPaneViewCache.get(pane)?._internal_update();
      this._private__markersPaneViewCache.get(pane)?._internal_update();
    });
    this._private__priceAxisViews.forEach((value) => value._internal_update());
    this._private__timeAxisView._internal_update();
  }
  _private__priceScaleByPane(pane) {
    if (pane && !pane._internal_defaultPriceScale()._internal_isEmpty()) {
      return pane._internal_defaultPriceScale();
    }
    return null;
  }
  _private__tryToUpdateViews(index, price, pane) {
    if (this._private__tryToUpdateData(index, price, pane)) {
      this._internal_updateAllViews();
    }
  }
  _private__tryToUpdateData(newIndex, newPrice, newPane) {
    const oldX = this._private__x;
    const oldY = this._private__y;
    const oldPrice = this._private__price;
    const oldIndex = this._private__index;
    const oldPane = this._private__pane;
    const priceScale = this._private__priceScaleByPane(newPane);
    this._private__index = newIndex;
    this._private__x = isNaN(newIndex) ? NaN : this._private__model._internal_timeScale()._internal_indexToCoordinate(newIndex);
    this._private__pane = newPane;
    const firstValue = priceScale !== null ? priceScale._internal_firstValue() : null;
    if (priceScale !== null && firstValue !== null) {
      this._private__price = newPrice;
      this._private__y = priceScale._internal_priceToCoordinate(newPrice, firstValue);
    } else {
      this._private__price = NaN;
      this._private__y = NaN;
    }
    return oldX !== this._private__x || oldY !== this._private__y || oldIndex !== this._private__index || oldPrice !== this._private__price || oldPane !== this._private__pane;
  }
  _private__setIndexToLastSeriesBarIndex() {
    const lastIndexes = this._private__model._internal_serieses().map((s) => s._internal_bars()._internal_lastIndex()).filter(notNull);
    const lastBarIndex = lastIndexes.length === 0 ? null : Math.max(...lastIndexes);
    this._private__index = lastBarIndex !== null ? lastBarIndex : NaN;
  }
  _private__createPriceAxisViewOnDemand(map, priceScale, valueProvider) {
    let view = map.get(priceScale);
    if (view === void 0) {
      view = new CrosshairPriceAxisView(this, priceScale, valueProvider);
      map.set(priceScale, view);
    }
    return view;
  }
};
function isDefaultPriceScale(priceScaleId) {
  return priceScaleId === "left" || priceScaleId === "right";
}
function mergePaneInvalidation(beforeValue, newValue) {
  if (beforeValue === void 0) {
    return newValue;
  }
  const level = Math.max(beforeValue._internal_level, newValue._internal_level);
  const autoScale = beforeValue._internal_autoScale || newValue._internal_autoScale;
  return { _internal_level: level, _internal_autoScale: autoScale };
}
var InvalidateMask = class _InvalidateMask {
  constructor(globalLevel) {
    this._private__invalidatedPanes = /* @__PURE__ */ new Map();
    this._private__timeScaleInvalidations = [];
    this._private__globalLevel = globalLevel;
  }
  _internal_invalidatePane(paneIndex, invalidation) {
    const prevValue = this._private__invalidatedPanes.get(paneIndex);
    const newValue = mergePaneInvalidation(prevValue, invalidation);
    this._private__invalidatedPanes.set(paneIndex, newValue);
  }
  _internal_fullInvalidation() {
    return this._private__globalLevel;
  }
  _internal_invalidateForPane(paneIndex) {
    const paneInvalidation = this._private__invalidatedPanes.get(paneIndex);
    if (paneInvalidation === void 0) {
      return {
        _internal_level: this._private__globalLevel
      };
    }
    return {
      _internal_level: Math.max(this._private__globalLevel, paneInvalidation._internal_level),
      _internal_autoScale: paneInvalidation._internal_autoScale
    };
  }
  _internal_setFitContent() {
    this._internal_stopTimeScaleAnimation();
    this._private__timeScaleInvalidations = [{
      _internal_type: 0
      /* TimeScaleInvalidationType.FitContent */
    }];
  }
  _internal_applyRange(range) {
    this._internal_stopTimeScaleAnimation();
    this._private__timeScaleInvalidations = [{ _internal_type: 1, _internal_value: range }];
  }
  _internal_setTimeScaleAnimation(animation) {
    this._private__removeTimeScaleAnimation();
    this._private__timeScaleInvalidations.push({ _internal_type: 5, _internal_value: animation });
  }
  _internal_stopTimeScaleAnimation() {
    this._private__removeTimeScaleAnimation();
    this._private__timeScaleInvalidations.push({
      _internal_type: 6
      /* TimeScaleInvalidationType.StopAnimation */
    });
  }
  _internal_resetTimeScale() {
    this._internal_stopTimeScaleAnimation();
    this._private__timeScaleInvalidations = [{
      _internal_type: 4
      /* TimeScaleInvalidationType.Reset */
    }];
  }
  _internal_setBarSpacing(barSpacing) {
    this._internal_stopTimeScaleAnimation();
    this._private__timeScaleInvalidations.push({ _internal_type: 2, _internal_value: barSpacing });
  }
  _internal_setRightOffset(offset) {
    this._internal_stopTimeScaleAnimation();
    this._private__timeScaleInvalidations.push({ _internal_type: 3, _internal_value: offset });
  }
  _internal_timeScaleInvalidations() {
    return this._private__timeScaleInvalidations;
  }
  _internal_merge(other) {
    for (const tsInvalidation of other._private__timeScaleInvalidations) {
      this._private__applyTimeScaleInvalidation(tsInvalidation);
    }
    this._private__globalLevel = Math.max(this._private__globalLevel, other._private__globalLevel);
    other._private__invalidatedPanes.forEach((invalidation, index) => {
      this._internal_invalidatePane(index, invalidation);
    });
  }
  static _internal_light() {
    return new _InvalidateMask(
      2
      /* InvalidationLevel.Light */
    );
  }
  static _internal_full() {
    return new _InvalidateMask(
      3
      /* InvalidationLevel.Full */
    );
  }
  _private__applyTimeScaleInvalidation(invalidation) {
    switch (invalidation._internal_type) {
      case 0:
        this._internal_setFitContent();
        break;
      case 1:
        this._internal_applyRange(invalidation._internal_value);
        break;
      case 2:
        this._internal_setBarSpacing(invalidation._internal_value);
        break;
      case 3:
        this._internal_setRightOffset(invalidation._internal_value);
        break;
      case 4:
        this._internal_resetTimeScale();
        break;
      case 5:
        this._internal_setTimeScaleAnimation(invalidation._internal_value);
        break;
      case 6:
        this._private__removeTimeScaleAnimation();
    }
  }
  _private__removeTimeScaleAnimation() {
    const index = this._private__timeScaleInvalidations.findIndex(
      (inv) => inv._internal_type === 5
      /* TimeScaleInvalidationType.Animation */
    );
    if (index !== -1) {
      this._private__timeScaleInvalidations.splice(index, 1);
    }
  }
};
var FormatterBase = class {
  formatTickmarks(prices) {
    return prices.map((price) => this.format(price));
  }
};
var formatterOptions = {
  _internal_decimalSign: "."
};
function numberToStringWithLeadingZero(value, length) {
  if (!isNumber(value)) {
    return "n/a";
  }
  if (!isInteger(length)) {
    throw new TypeError("invalid length");
  }
  if (length < 0 || length > 16) {
    throw new TypeError("invalid length");
  }
  if (length === 0) {
    return value.toString();
  }
  const dummyString = "0000000000000000";
  return (dummyString + value.toString()).slice(-length);
}
var PriceFormatter = class extends FormatterBase {
  constructor(priceScale, minMove) {
    super();
    if (!minMove) {
      minMove = 1;
    }
    if (!isNumber(priceScale) || !isInteger(priceScale)) {
      priceScale = 100;
    }
    if (priceScale < 0) {
      throw new TypeError("invalid base");
    }
    this._private__priceScale = priceScale;
    this._private__minMove = minMove;
    this._private__calculateDecimal();
  }
  format(price) {
    const sign = price < 0 ? "\u2212" : "";
    price = Math.abs(price);
    return sign + this._private__formatAsDecimal(price);
  }
  _private__calculateDecimal() {
    this._internal__fractionalLength = 0;
    if (this._private__priceScale > 0 && this._private__minMove > 0) {
      let base = this._private__priceScale;
      while (base > 1) {
        base /= 10;
        this._internal__fractionalLength++;
      }
    }
  }
  _private__formatAsDecimal(price) {
    const base = this._private__priceScale / this._private__minMove;
    let intPart = Math.floor(price);
    let fracString = "";
    const fracLength = this._internal__fractionalLength !== void 0 ? this._internal__fractionalLength : NaN;
    if (base > 1) {
      let fracPart = +(Math.round(price * base) - intPart * base).toFixed(this._internal__fractionalLength);
      if (fracPart >= base) {
        fracPart -= base;
        intPart += 1;
      }
      fracString = formatterOptions._internal_decimalSign + numberToStringWithLeadingZero(+fracPart.toFixed(this._internal__fractionalLength) * this._private__minMove, fracLength);
    } else {
      intPart = Math.round(intPart * base) / base;
      if (fracLength > 0) {
        fracString = formatterOptions._internal_decimalSign + numberToStringWithLeadingZero(0, fracLength);
      }
    }
    return intPart.toFixed(0) + fracString;
  }
};
var PercentageFormatter = class extends PriceFormatter {
  constructor(priceScale = 100) {
    super(priceScale);
  }
  format(price) {
    return `${super.format(price)}%`;
  }
};
var VolumeFormatter = class extends FormatterBase {
  constructor(precision) {
    super();
    this._private__precision = precision;
  }
  format(vol) {
    let sign = "";
    if (vol < 0) {
      sign = "-";
      vol = -vol;
    }
    if (vol < 995) {
      return sign + this._private__formatNumber(vol);
    } else if (vol < 999995) {
      return sign + this._private__formatNumber(vol / 1e3) + "K";
    } else if (vol < 999999995) {
      vol = 1e3 * Math.round(vol / 1e3);
      return sign + this._private__formatNumber(vol / 1e6) + "M";
    } else {
      vol = 1e6 * Math.round(vol / 1e6);
      return sign + this._private__formatNumber(vol / 1e9) + "B";
    }
  }
  _private__formatNumber(value) {
    let res;
    const priceScale = Math.pow(10, this._private__precision);
    value = Math.round(value * priceScale) / priceScale;
    if (value >= 1e-15 && value < 1) {
      res = value.toFixed(this._private__precision).replace(/\.?0+$/, "");
    } else {
      res = String(value);
    }
    return res.replace(/(\.[1-9]*)0+$/, (e, p1) => p1);
  }
};
var defaultReplacementRe = /[2-9]/g;
var TextWidthCache = class {
  constructor(size3 = 50) {
    this._private__actualSize = 0;
    this._private__usageTick = 1;
    this._private__oldestTick = 1;
    this._private__tick2Labels = {};
    this._private__cache = /* @__PURE__ */ new Map();
    this._private__maxSize = size3;
  }
  _internal_reset() {
    this._private__actualSize = 0;
    this._private__cache.clear();
    this._private__usageTick = 1;
    this._private__oldestTick = 1;
    this._private__tick2Labels = {};
  }
  _internal_measureText(ctx, text, optimizationReplacementRe2) {
    return this._private__getMetrics(ctx, text, optimizationReplacementRe2).width;
  }
  _internal_yMidCorrection(ctx, text, optimizationReplacementRe2) {
    const metrics = this._private__getMetrics(ctx, text, optimizationReplacementRe2);
    return ((metrics.actualBoundingBoxAscent || 0) - (metrics.actualBoundingBoxDescent || 0)) / 2;
  }
  _private__getMetrics(ctx, text, optimizationReplacementRe2) {
    const re = optimizationReplacementRe2 || defaultReplacementRe;
    const cacheString = String(text).replace(re, "0");
    if (this._private__cache.has(cacheString)) {
      return ensureDefined(this._private__cache.get(cacheString))._internal_metrics;
    }
    if (this._private__actualSize === this._private__maxSize) {
      const oldestValue = this._private__tick2Labels[this._private__oldestTick];
      delete this._private__tick2Labels[this._private__oldestTick];
      this._private__cache.delete(oldestValue);
      this._private__oldestTick++;
      this._private__actualSize--;
    }
    ctx.save();
    ctx.textBaseline = "middle";
    const metrics = ctx.measureText(cacheString);
    ctx.restore();
    if (metrics.width === 0 && !!text.length) {
      return metrics;
    }
    this._private__cache.set(cacheString, { _internal_metrics: metrics, _internal_tick: this._private__usageTick });
    this._private__tick2Labels[this._private__usageTick] = cacheString;
    this._private__actualSize++;
    this._private__usageTick++;
    return metrics;
  }
};
var PanePriceAxisViewRenderer = class {
  constructor(textWidthCache) {
    this._private__priceAxisViewRenderer = null;
    this._private__rendererOptions = null;
    this._private__align = "right";
    this._private__textWidthCache = textWidthCache;
  }
  _internal_setParams(priceAxisViewRenderer, rendererOptions, align) {
    this._private__priceAxisViewRenderer = priceAxisViewRenderer;
    this._private__rendererOptions = rendererOptions;
    this._private__align = align;
  }
  _internal_draw(target) {
    if (this._private__rendererOptions === null || this._private__priceAxisViewRenderer === null) {
      return;
    }
    this._private__priceAxisViewRenderer._internal_draw(target, this._private__rendererOptions, this._private__textWidthCache, this._private__align);
  }
};
var PanePriceAxisView = class {
  constructor(priceAxisView, dataSource, chartModel) {
    this._private__priceAxisView = priceAxisView;
    this._private__textWidthCache = new TextWidthCache(50);
    this._private__dataSource = dataSource;
    this._private__chartModel = chartModel;
    this._private__fontSize = -1;
    this._private__renderer = new PanePriceAxisViewRenderer(this._private__textWidthCache);
  }
  _internal_renderer() {
    const pane = this._private__chartModel._internal_paneForSource(this._private__dataSource);
    if (pane === null) {
      return null;
    }
    const priceScale = pane._internal_isOverlay(this._private__dataSource) ? pane._internal_defaultVisiblePriceScale() : this._private__dataSource._internal_priceScale();
    if (priceScale === null) {
      return null;
    }
    const position = pane._internal_priceScalePosition(priceScale);
    if (position === "overlay") {
      return null;
    }
    const options = this._private__chartModel._internal_priceAxisRendererOptions();
    if (options._internal_fontSize !== this._private__fontSize) {
      this._private__fontSize = options._internal_fontSize;
      this._private__textWidthCache._internal_reset();
    }
    this._private__renderer._internal_setParams(this._private__priceAxisView._internal_paneRenderer(), options, position);
    return this._private__renderer;
  }
};
var HorizontalLineRenderer = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._private__data = null;
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  _internal_hitTest(x, y) {
    if (!this._private__data?._internal_visible) {
      return null;
    }
    const { _internal_y: itemY, _internal_lineWidth: lineWidth, _internal_externalId: externalId } = this._private__data;
    if (y >= itemY - lineWidth - 7 && y <= itemY + lineWidth + 7) {
      return {
        _internal_hitTestData: this._private__data,
        _internal_distance: Math.abs(y - itemY),
        _internal_priority: 2,
        _internal_itemType: "price-line",
        _internal_externalId: externalId
      };
    }
    return null;
  }
  _internal__drawImpl({ context: ctx, bitmapSize, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._private__data === null) {
      return;
    }
    if (this._private__data._internal_visible === false) {
      return;
    }
    const y = Math.round(this._private__data._internal_y * verticalPixelRatio);
    if (y < 0 || y > bitmapSize.height) {
      return;
    }
    ctx.lineCap = "butt";
    ctx.strokeStyle = this._private__data._internal_color;
    ctx.lineWidth = Math.floor(this._private__data._internal_lineWidth * horizontalPixelRatio);
    setLineStyle(ctx, this._private__data._internal_lineStyle);
    drawHorizontalLine(ctx, y, 0, bitmapSize.width);
  }
};
var SeriesHorizontalLinePaneView = class {
  constructor(series) {
    this._internal__lineRendererData = {
      _internal_y: 0,
      _internal_color: "rgba(0, 0, 0, 0)",
      _internal_lineWidth: 1,
      _internal_lineStyle: 0,
      _internal_visible: false
    };
    this._internal__lineRenderer = new HorizontalLineRenderer();
    this._private__invalidated = true;
    this._internal__series = series;
    this._internal__model = series._internal_model();
    this._internal__lineRenderer._internal_setData(this._internal__lineRendererData);
  }
  _internal_update() {
    this._private__invalidated = true;
  }
  _internal_renderer() {
    if (!this._internal__series._internal_visible()) {
      return null;
    }
    if (this._private__invalidated) {
      this._internal__updateImpl();
      this._private__invalidated = false;
    }
    return this._internal__lineRenderer;
  }
};
var SeriesHorizontalBaseLinePaneView = class extends SeriesHorizontalLinePaneView {
  // eslint-disable-next-line no-useless-constructor
  constructor(series) {
    super(series);
  }
  _internal__updateImpl() {
    this._internal__lineRendererData._internal_visible = false;
    const priceScale = this._internal__series._internal_priceScale();
    const mode = priceScale._internal_mode()._internal_mode;
    if (mode !== 2 && mode !== 3) {
      return;
    }
    const seriesOptions = this._internal__series._internal_options();
    if (!seriesOptions.baseLineVisible || !this._internal__series._internal_visible()) {
      return;
    }
    const firstValue = this._internal__series._internal_firstValue();
    if (firstValue === null) {
      return;
    }
    this._internal__lineRendererData._internal_visible = true;
    this._internal__lineRendererData._internal_y = priceScale._internal_priceToCoordinate(firstValue._internal_value, firstValue._internal_value);
    this._internal__lineRendererData._internal_color = seriesOptions.baseLineColor;
    this._internal__lineRendererData._internal_lineWidth = seriesOptions.baseLineWidth;
    this._internal__lineRendererData._internal_lineStyle = seriesOptions.baseLineStyle;
  }
};
var SeriesLastPriceAnimationRenderer = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._private__data = null;
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  _internal_data() {
    return this._private__data;
  }
  _internal__drawImpl({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) {
    const data = this._private__data;
    if (data === null) {
      return;
    }
    const tickWidth = Math.max(1, Math.floor(horizontalPixelRatio));
    const correction = tickWidth % 2 / 2;
    const centerX = Math.round(data._internal_center.x * horizontalPixelRatio) + correction;
    const centerY = data._internal_center.y * verticalPixelRatio;
    ctx.fillStyle = data._internal_seriesLineColor;
    ctx.beginPath();
    const centerPointRadius = Math.max(2, data._internal_seriesLineWidth * 1.5) * horizontalPixelRatio;
    ctx.arc(centerX, centerY, centerPointRadius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.fillStyle = data._internal_fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, data._internal_radius * horizontalPixelRatio, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = tickWidth;
    ctx.strokeStyle = data._internal_strokeColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, data._internal_radius * horizontalPixelRatio + tickWidth / 2, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
};
var animationStagesData = [
  {
    _internal_start: 0,
    _internal_end: 0.25,
    _internal_startRadius: 4,
    _internal_endRadius: 10,
    _internal_startFillAlpha: 0.25,
    _internal_endFillAlpha: 0,
    _internal_startStrokeAlpha: 0.4,
    _internal_endStrokeAlpha: 0.8
  },
  {
    _internal_start: 0.25,
    _internal_end: 0.25 + 0.275,
    _internal_startRadius: 10,
    _internal_endRadius: 14,
    _internal_startFillAlpha: 0,
    _internal_endFillAlpha: 0,
    _internal_startStrokeAlpha: 0.8,
    _internal_endStrokeAlpha: 0
  },
  {
    _internal_start: 0.25 + 0.275,
    _internal_end: 0.25 + 0.275 + 0.475,
    _internal_startRadius: 14,
    _internal_endRadius: 14,
    _internal_startFillAlpha: 0,
    _internal_endFillAlpha: 0,
    _internal_startStrokeAlpha: 0,
    _internal_endStrokeAlpha: 0
  }
];
function radius(stage, startRadius, endRadius) {
  return startRadius + (endRadius - startRadius) * stage;
}
var SeriesLastPriceAnimationPaneView = class {
  constructor(series) {
    this._private__renderer = new SeriesLastPriceAnimationRenderer();
    this._private__invalidated = true;
    this._private__stageInvalidated = true;
    this._private__startTime = performance.now();
    this._private__endTime = this._private__startTime - 1;
    this._private__series = series;
  }
  _internal_onDataCleared() {
    this._private__endTime = this._private__startTime - 1;
    this._internal_update();
  }
  _internal_onNewRealtimeDataReceived() {
    this._internal_update();
    if (this._private__series._internal_options().lastPriceAnimation === 2) {
      const now = performance.now();
      const timeToAnimationEnd = this._private__endTime - now;
      if (timeToAnimationEnd > 0) {
        if (timeToAnimationEnd < 2600 / 4) {
          this._private__endTime += 2600;
        }
        return;
      }
      this._private__startTime = now;
      this._private__endTime = now + 2600;
    }
  }
  _internal_update() {
    this._private__invalidated = true;
  }
  _internal_invalidateStage() {
    this._private__stageInvalidated = true;
  }
  _internal_visible() {
    return this._private__series._internal_options().lastPriceAnimation !== 0;
  }
  _internal_animationActive() {
    switch (this._private__series._internal_options().lastPriceAnimation) {
      case 0:
        return false;
      case 1:
        return true;
      case 2:
        return performance.now() <= this._private__endTime;
    }
  }
  _internal_renderer() {
    if (this._private__invalidated) {
      this._private__updateImpl();
      this._private__invalidated = false;
      this._private__stageInvalidated = false;
    } else if (this._private__stageInvalidated) {
      this._private__updateRendererDataStage();
      this._private__stageInvalidated = false;
    }
    return this._private__renderer;
  }
  _private__updateImpl() {
    this._private__renderer._internal_setData(null);
    const timeScale = this._private__series._internal_model()._internal_timeScale();
    const visibleRange = timeScale._internal_visibleStrictRange();
    const firstValue = this._private__series._internal_firstValue();
    if (visibleRange === null || firstValue === null) {
      return;
    }
    const lastValue = this._private__series._internal_lastValueData(true);
    if (lastValue._internal_noData || !visibleRange._internal_contains(lastValue._internal_index)) {
      return;
    }
    const lastValuePoint = {
      x: timeScale._internal_indexToCoordinate(lastValue._internal_index),
      y: this._private__series._internal_priceScale()._internal_priceToCoordinate(lastValue._internal_price, firstValue._internal_value)
    };
    const seriesLineColor = lastValue._internal_color;
    const seriesLineWidth = this._private__series._internal_options().lineWidth;
    const data = this._private__animationData(this._private__duration(), seriesLineColor);
    this._private__renderer._internal_setData({
      _internal_seriesLineColor: seriesLineColor,
      _internal_seriesLineWidth: seriesLineWidth,
      _internal_fillColor: data._internal_fillColor,
      _internal_strokeColor: data._internal_strokeColor,
      _internal_radius: data._internal_radius,
      _internal_center: lastValuePoint
    });
  }
  _private__updateRendererDataStage() {
    const rendererData = this._private__renderer._internal_data();
    if (rendererData !== null) {
      const data = this._private__animationData(this._private__duration(), rendererData._internal_seriesLineColor);
      rendererData._internal_fillColor = data._internal_fillColor;
      rendererData._internal_strokeColor = data._internal_strokeColor;
      rendererData._internal_radius = data._internal_radius;
    }
  }
  _private__duration() {
    return this._internal_animationActive() ? performance.now() - this._private__startTime : 2600 - 1;
  }
  _private__color(seriesLineColor, stage, startAlpha, endAlpha) {
    const alpha = startAlpha + (endAlpha - startAlpha) * stage;
    return this._private__series._internal_model()._internal_colorParser()._internal_applyAlpha(seriesLineColor, alpha);
  }
  _private__animationData(durationSinceStart, lineColor) {
    const globalStage = durationSinceStart % 2600 / 2600;
    let currentStageData;
    for (const stageData of animationStagesData) {
      if (globalStage >= stageData._internal_start && globalStage <= stageData._internal_end) {
        currentStageData = stageData;
        break;
      }
    }
    assert(currentStageData !== void 0, "Last price animation internal logic error");
    const subStage = (globalStage - currentStageData._internal_start) / (currentStageData._internal_end - currentStageData._internal_start);
    return {
      _internal_fillColor: this._private__color(lineColor, subStage, currentStageData._internal_startFillAlpha, currentStageData._internal_endFillAlpha),
      _internal_strokeColor: this._private__color(lineColor, subStage, currentStageData._internal_startStrokeAlpha, currentStageData._internal_endStrokeAlpha),
      _internal_radius: radius(subStage, currentStageData._internal_startRadius, currentStageData._internal_endRadius)
    };
  }
};
var SeriesPriceLinePaneView = class extends SeriesHorizontalLinePaneView {
  // eslint-disable-next-line no-useless-constructor
  constructor(series) {
    super(series);
  }
  _internal__updateImpl() {
    const data = this._internal__lineRendererData;
    data._internal_visible = false;
    const seriesOptions = this._internal__series._internal_options();
    if (!seriesOptions.priceLineVisible || !this._internal__series._internal_visible()) {
      return;
    }
    const lastValueData = this._internal__series._internal_lastValueData(
      seriesOptions.priceLineSource === 0
      /* PriceLineSource.LastBar */
    );
    if (lastValueData._internal_noData) {
      return;
    }
    data._internal_visible = true;
    data._internal_y = lastValueData._internal_coordinate;
    data._internal_color = this._internal__series._internal_priceLineColor(lastValueData._internal_color);
    data._internal_lineWidth = seriesOptions.priceLineWidth;
    data._internal_lineStyle = seriesOptions.priceLineStyle;
  }
};
var SeriesPriceAxisView = class extends PriceAxisView {
  constructor(source) {
    super();
    this._private__source = source;
  }
  _internal__updateRendererData(axisRendererData, paneRendererData, commonRendererData) {
    axisRendererData._internal_visible = false;
    paneRendererData._internal_visible = false;
    const source = this._private__source;
    if (!source._internal_visible()) {
      return;
    }
    const seriesOptions = source._internal_options();
    const showSeriesLastValue = seriesOptions.lastValueVisible;
    const showSymbolLabel = source._internal_title() !== "";
    const showPriceAndPercentage = seriesOptions.seriesLastValueMode === 0;
    const lastValueData = source._internal_lastValueData(false);
    if (lastValueData._internal_noData) {
      return;
    }
    if (showSeriesLastValue) {
      axisRendererData._internal_text = this._internal__axisText(lastValueData, showSeriesLastValue, showPriceAndPercentage);
      axisRendererData._internal_visible = axisRendererData._internal_text.length !== 0;
    }
    if (showSymbolLabel || showPriceAndPercentage) {
      paneRendererData._internal_text = this._internal__paneText(lastValueData, showSeriesLastValue, showSymbolLabel, showPriceAndPercentage);
      paneRendererData._internal_visible = paneRendererData._internal_text.length > 0;
    }
    const lastValueColor = source._internal_priceLineColor(lastValueData._internal_color);
    const colors = this._private__source._internal_model()._internal_colorParser()._internal_generateContrastColors(lastValueColor);
    commonRendererData._internal_background = colors._internal_background;
    commonRendererData._internal_coordinate = lastValueData._internal_coordinate;
    paneRendererData._internal_borderColor = source._internal_model()._internal_backgroundColorAtYPercentFromTop(lastValueData._internal_coordinate / source._internal_priceScale()._internal_height());
    axisRendererData._internal_borderColor = lastValueColor;
    axisRendererData._internal_color = colors._internal_foreground;
    paneRendererData._internal_color = colors._internal_foreground;
  }
  _internal__paneText(lastValue, showSeriesLastValue, showSymbolLabel, showPriceAndPercentage) {
    let result = "";
    const title = this._private__source._internal_title();
    if (showSymbolLabel && title.length !== 0) {
      result += `${title} `;
    }
    if (showSeriesLastValue && showPriceAndPercentage) {
      result += this._private__source._internal_priceScale()._internal_isPercentage() ? lastValue._internal_formattedPriceAbsolute : lastValue._internal_formattedPricePercentage;
    }
    return result.trim();
  }
  _internal__axisText(lastValueData, showSeriesLastValue, showPriceAndPercentage) {
    if (!showSeriesLastValue) {
      return "";
    }
    if (!showPriceAndPercentage) {
      return lastValueData._internal_text;
    }
    return this._private__source._internal_priceScale()._internal_isPercentage() ? lastValueData._internal_formattedPricePercentage : lastValueData._internal_formattedPriceAbsolute;
  }
};
function computeFiniteResult(method, valueOne, valueTwo, fallback) {
  const firstFinite = Number.isFinite(valueOne);
  const secondFinite = Number.isFinite(valueTwo);
  if (firstFinite && secondFinite) {
    return method(valueOne, valueTwo);
  }
  return !firstFinite && !secondFinite ? fallback : firstFinite ? valueOne : valueTwo;
}
var PriceRangeImpl = class _PriceRangeImpl {
  constructor(minValue, maxValue) {
    this._private__minValue = minValue;
    this._private__maxValue = maxValue;
  }
  _internal_equals(pr) {
    if (pr === null) {
      return false;
    }
    return this._private__minValue === pr._private__minValue && this._private__maxValue === pr._private__maxValue;
  }
  _internal_clone() {
    return new _PriceRangeImpl(this._private__minValue, this._private__maxValue);
  }
  _internal_minValue() {
    return this._private__minValue;
  }
  _internal_maxValue() {
    return this._private__maxValue;
  }
  _internal_length() {
    return this._private__maxValue - this._private__minValue;
  }
  _internal_isEmpty() {
    return this._private__maxValue === this._private__minValue || Number.isNaN(this._private__maxValue) || Number.isNaN(this._private__minValue);
  }
  _internal_merge(anotherRange) {
    if (anotherRange === null) {
      return this;
    }
    return new _PriceRangeImpl(computeFiniteResult(Math.min, this._internal_minValue(), anotherRange._internal_minValue(), -Infinity), computeFiniteResult(Math.max, this._internal_maxValue(), anotherRange._internal_maxValue(), Infinity));
  }
  _internal_scaleAroundCenter(coeff) {
    if (!isNumber(coeff)) {
      return;
    }
    const delta = this._private__maxValue - this._private__minValue;
    if (delta === 0) {
      return;
    }
    const center = (this._private__maxValue + this._private__minValue) * 0.5;
    let maxDelta = this._private__maxValue - center;
    let minDelta = this._private__minValue - center;
    maxDelta *= coeff;
    minDelta *= coeff;
    this._private__maxValue = center + maxDelta;
    this._private__minValue = center + minDelta;
  }
  _internal_shift(delta) {
    if (!isNumber(delta)) {
      return;
    }
    this._private__maxValue += delta;
    this._private__minValue += delta;
  }
  _internal_toRaw() {
    return {
      minValue: this._private__minValue,
      maxValue: this._private__maxValue
    };
  }
  static _internal_fromRaw(raw) {
    return raw === null ? null : new _PriceRangeImpl(raw.minValue, raw.maxValue);
  }
};
var AutoscaleInfoImpl = class _AutoscaleInfoImpl {
  constructor(priceRange, margins) {
    this._private__priceRange = priceRange;
    this._private__margins = margins || null;
  }
  _internal_priceRange() {
    return this._private__priceRange;
  }
  _internal_margins() {
    return this._private__margins;
  }
  _internal_toRaw() {
    return {
      priceRange: this._private__priceRange === null ? null : this._private__priceRange._internal_toRaw(),
      margins: this._private__margins || void 0
    };
  }
  static _internal_fromRaw(raw) {
    return raw === null ? null : new _AutoscaleInfoImpl(PriceRangeImpl._internal_fromRaw(raw.priceRange), raw.margins);
  }
};
var CONFLATION_LEVELS = [2, 4, 8, 16, 32, 64, 128, 256, 512];
var MAX_CONFLATION_LEVEL = 512;
var DPR_CONFLATION_THRESHOLD = 1;
var CONFLATION_ERROR_MESSAGES = {
  _internal_missingPriceValueBuilder: "Custom series with conflation reducer must have a priceValueBuilder method"
};
var CustomPriceLinePaneView = class extends SeriesHorizontalLinePaneView {
  constructor(series, priceLine) {
    super(series);
    this._private__priceLine = priceLine;
  }
  _internal__updateImpl() {
    const data = this._internal__lineRendererData;
    data._internal_visible = false;
    const lineOptions = this._private__priceLine._internal_options();
    if (!this._internal__series._internal_visible() || !lineOptions.lineVisible) {
      return;
    }
    const y = this._private__priceLine._internal_yCoord();
    if (y === null) {
      return;
    }
    data._internal_visible = true;
    data._internal_y = y;
    data._internal_color = lineOptions.color;
    data._internal_lineWidth = lineOptions.lineWidth;
    data._internal_lineStyle = lineOptions.lineStyle;
    data._internal_externalId = this._private__priceLine._internal_options().id;
  }
};
var CustomPriceLinePriceAxisView = class extends PriceAxisView {
  constructor(series, priceLine) {
    super();
    this._private__series = series;
    this._private__priceLine = priceLine;
  }
  _internal__updateRendererData(axisRendererData, paneRendererData, commonData) {
    axisRendererData._internal_visible = false;
    paneRendererData._internal_visible = false;
    const options = this._private__priceLine._internal_options();
    const labelVisible = options.axisLabelVisible;
    const showPaneLabel = options.title !== "";
    const series = this._private__series;
    if (!labelVisible || !series._internal_visible()) {
      return;
    }
    const y = this._private__priceLine._internal_yCoord();
    if (y === null) {
      return;
    }
    if (showPaneLabel) {
      paneRendererData._internal_text = options.title;
      paneRendererData._internal_visible = true;
    }
    paneRendererData._internal_borderColor = series._internal_model()._internal_backgroundColorAtYPercentFromTop(y / series._internal_priceScale()._internal_height());
    axisRendererData._internal_text = this._private__formatPrice(options.price);
    axisRendererData._internal_visible = true;
    const colors = this._private__series._internal_model()._internal_colorParser()._internal_generateContrastColors(options.axisLabelColor || options.color);
    commonData._internal_background = colors._internal_background;
    const textColor = options.axisLabelTextColor || colors._internal_foreground;
    axisRendererData._internal_color = textColor;
    paneRendererData._internal_color = textColor;
    commonData._internal_coordinate = y;
  }
  _private__formatPrice(price) {
    const firstValue = this._private__series._internal_firstValue();
    if (firstValue === null) {
      return "";
    }
    return this._private__series._internal_priceScale()._internal_formatPrice(price, firstValue._internal_value);
  }
};
var CustomPriceLine = class {
  constructor(series, options) {
    this._private__series = series;
    this._private__options = options;
    this._private__priceLineView = new CustomPriceLinePaneView(series, this);
    this._private__priceAxisView = new CustomPriceLinePriceAxisView(series, this);
    this._private__panePriceAxisView = new PanePriceAxisView(this._private__priceAxisView, series, series._internal_model());
  }
  _internal_applyOptions(options) {
    merge(this._private__options, options);
    this._internal_update();
    this._private__series._internal_model()._internal_lightUpdate();
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_paneView() {
    return this._private__priceLineView;
  }
  _internal_labelPaneView() {
    return this._private__panePriceAxisView;
  }
  _internal_priceAxisView() {
    return this._private__priceAxisView;
  }
  _internal_update() {
    this._private__priceLineView._internal_update();
    this._private__priceAxisView._internal_update();
  }
  _internal_yCoord() {
    const series = this._private__series;
    const priceScale = series._internal_priceScale();
    const timeScale = series._internal_model()._internal_timeScale();
    if (timeScale._internal_isEmpty() || priceScale._internal_isEmpty()) {
      return null;
    }
    const firstValue = series._internal_firstValue();
    if (firstValue === null) {
      return null;
    }
    return priceScale._internal_priceToCoordinate(this._private__options.price, firstValue._internal_value);
  }
};
var DataConflater = class {
  constructor() {
    this._private__dataCache = /* @__PURE__ */ new WeakMap();
  }
  _internal_calculateConflationLevelWithSmoothing(barSpacing, devicePixelRatio, smoothingFactor) {
    const conflationThreshold = DPR_CONFLATION_THRESHOLD / devicePixelRatio * smoothingFactor;
    if (barSpacing >= conflationThreshold) {
      return 1;
    }
    const ratio = conflationThreshold / barSpacing;
    const conflationLevel = Math.pow(2, Math.floor(Math.log2(ratio)));
    return Math.min(conflationLevel, MAX_CONFLATION_LEVEL);
  }
  _internal_conflateByFactor(data, barsToMerge, customReducer, isCustomSeries = false, priceValueBuilder) {
    if (data.length === 0 || barsToMerge <= 1) {
      return data;
    }
    const conflationLevel = this._private__normalizeConflationLevel(barsToMerge);
    if (conflationLevel <= 1) {
      return data;
    }
    const entry = this._private__getValidatedCacheEntry(data);
    let cachedRows = entry._internal_levelResults.get(conflationLevel);
    if (cachedRows !== void 0) {
      return cachedRows;
    }
    cachedRows = this._private__buildRecursively(data, conflationLevel, customReducer, isCustomSeries, priceValueBuilder, entry._internal_levelResults);
    entry._internal_levelResults.set(conflationLevel, cachedRows);
    return cachedRows;
  }
  /**
   * Efficiently update the last conflated chunk when new data arrives.
   * This avoids rebuilding all chunks when just the last data point changes.
   */
  _internal_updateLastConflatedChunk(originalData, newLastRow, conflationLevel, customReducer, isCustomSeries = false, priceValueBuilder) {
    if (conflationLevel < 1 || originalData.length === 0) {
      return originalData;
    }
    const entry = this._private__getValidatedCacheEntry(originalData);
    const cachedRows = entry._internal_levelResults.get(conflationLevel);
    if (!cachedRows) {
      return this._internal_conflateByFactor(originalData, conflationLevel, customReducer, isCustomSeries, priceValueBuilder);
    }
    const updatedRows = this._private__updateLastChunkInCache(originalData, newLastRow, conflationLevel, cachedRows, isCustomSeries, customReducer, priceValueBuilder);
    entry._internal_levelResults.set(conflationLevel, updatedRows);
    return updatedRows;
  }
  _private__normalizeConflationLevel(barsToMerge) {
    if (barsToMerge <= 2) {
      return 2;
    }
    for (const level of CONFLATION_LEVELS) {
      if (barsToMerge <= level) {
        return level;
      }
    }
    return MAX_CONFLATION_LEVEL;
  }
  _private__getDataVersion(data) {
    if (data.length === 0) {
      return 0;
    }
    const first = data[0];
    const last = data[data.length - 1];
    return data.length * 31 + first._internal_index * 17 + last._internal_index * 13;
  }
  /**
   * Build conflation recursively, reusing previous level results.
   */
  _private__buildRecursively(data, targetLevel, customReducer, isCustomSeries = false, priceValueBuilder, levelResults = /* @__PURE__ */ new Map()) {
    if (targetLevel === 2) {
      return this._private__buildLevelFromOriginal(data, 2, customReducer, isCustomSeries, priceValueBuilder);
    }
    const prevLevel = targetLevel / 2;
    let prevData = levelResults.get(prevLevel);
    if (!prevData) {
      prevData = this._private__buildRecursively(data, prevLevel, customReducer, isCustomSeries, priceValueBuilder, levelResults);
      levelResults.set(prevLevel, prevData);
    }
    return this._private__buildLevelFromPrevious(prevData, customReducer, isCustomSeries, priceValueBuilder);
  }
  /**
   * Build a conflation level directly from original data (used for level 2).
   */
  _private__buildLevelFromOriginal(data, level, customReducer, isCustomSeries = false, priceValueBuilder) {
    const chunks = this._private__buildChunksFromData(data, level, customReducer, isCustomSeries, priceValueBuilder);
    return this._private__chunksToSeriesPlotRows(chunks, isCustomSeries);
  }
  /**
   * Build a conflation level from the previous level's result.
   */
  _private__buildLevelFromPrevious(prevData, customReducer, isCustomSeries = false, priceValueBuilder) {
    const chunks = this._private__buildChunksFromData(prevData, 2, customReducer, isCustomSeries, priceValueBuilder);
    return this._private__chunksToSeriesPlotRows(chunks, isCustomSeries);
  }
  _private__buildChunksFromData(data, mergeFactor, customReducer, isCustomSeries = false, priceValueBuilder) {
    const chunks = [];
    for (let i = 0; i < data.length; i += mergeFactor) {
      const remaining = data.length - i;
      if (remaining >= mergeFactor) {
        const merged = this._private__mergeTwoRows(data[i], data[i + 1], customReducer, isCustomSeries, priceValueBuilder);
        merged._internal_isRemainder = false;
        chunks.push(merged);
      } else {
        if (chunks.length === 0) {
          chunks.push(this._private__plotRowToChunk(data[i], true));
        } else {
          const prev = chunks[chunks.length - 1];
          chunks[chunks.length - 1] = this._private__mergeChunkAndRow(prev, data[i], customReducer, isCustomSeries, priceValueBuilder);
        }
      }
    }
    return chunks;
  }
  _private__sumCount(a, b) {
    return (a ?? 1) + (b ?? 1);
  }
  _private__mergeTwoRows(a, b, customReducer, isCustomSeries = false, priceValueBuilder) {
    if (!isCustomSeries || !customReducer || !priceValueBuilder) {
      const high = a._internal_value[
        1
        /* PlotRowValueIndex.High */
      ] > b._internal_value[
        1
        /* PlotRowValueIndex.High */
      ] ? a._internal_value[
        1
        /* PlotRowValueIndex.High */
      ] : b._internal_value[
        1
        /* PlotRowValueIndex.High */
      ];
      const low = a._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ] < b._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ] ? a._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ] : b._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ];
      return {
        _internal_startIndex: a._internal_index,
        _internal_endIndex: b._internal_index,
        _internal_startTime: a._internal_time,
        _internal_endTime: b._internal_time,
        _internal_open: a._internal_value[
          0
          /* PlotRowValueIndex.Open */
        ],
        _internal_high: high,
        _internal_low: low,
        _internal_close: b._internal_value[
          3
          /* PlotRowValueIndex.Close */
        ],
        _internal_originalDataCount: this._private__sumCount(a._internal_originalDataCount, b._internal_originalDataCount),
        _internal_conflatedData: void 0,
        _internal_isRemainder: false
      };
    }
    const c1 = this._private__convertToContext(a, priceValueBuilder);
    const c2 = this._private__convertToContext(b, priceValueBuilder);
    const aggregated = customReducer(c1, c2);
    const prices = priceValueBuilder(aggregated);
    const p = prices.length ? prices[prices.length - 1] : 0;
    return {
      _internal_startIndex: a._internal_index,
      _internal_endIndex: b._internal_index,
      _internal_startTime: a._internal_time,
      _internal_endTime: b._internal_time,
      _internal_open: a._internal_value[
        0
        /* PlotRowValueIndex.Open */
      ],
      _internal_high: Math.max(a._internal_value[
        1
        /* PlotRowValueIndex.High */
      ], p),
      _internal_low: Math.min(a._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ], p),
      _internal_close: p,
      _internal_originalDataCount: this._private__sumCount(a._internal_originalDataCount, b._internal_originalDataCount),
      _internal_conflatedData: aggregated,
      _internal_isRemainder: false
    };
  }
  _private__mergeChunkAndRow(chunk, row, customReducer, isCustomSeries = false, priceValueBuilder) {
    if (!isCustomSeries || !customReducer || !priceValueBuilder) {
      return {
        _internal_startIndex: chunk._internal_startIndex,
        _internal_endIndex: row._internal_index,
        _internal_startTime: chunk._internal_startTime,
        _internal_endTime: row._internal_time,
        _internal_open: chunk._internal_open,
        _internal_high: chunk._internal_high > row._internal_value[
          1
          /* PlotRowValueIndex.High */
        ] ? chunk._internal_high : row._internal_value[
          1
          /* PlotRowValueIndex.High */
        ],
        _internal_low: chunk._internal_low < row._internal_value[
          2
          /* PlotRowValueIndex.Low */
        ] ? chunk._internal_low : row._internal_value[
          2
          /* PlotRowValueIndex.Low */
        ],
        _internal_close: row._internal_value[
          3
          /* PlotRowValueIndex.Close */
        ],
        _internal_originalDataCount: chunk._internal_originalDataCount + (row._internal_originalDataCount ?? 1),
        _internal_conflatedData: chunk._internal_conflatedData,
        _internal_isRemainder: false
      };
    }
    const prevAgg = chunk._internal_conflatedData;
    const ctx = this._private__convertToContext(row, priceValueBuilder);
    const prevCtx = prevAgg ? {
      data: prevAgg,
      index: chunk._internal_startIndex,
      originalTime: chunk._internal_startTime,
      time: chunk._internal_startTime,
      priceValues: priceValueBuilder(prevAgg)
    } : null;
    const aggregated = prevCtx ? customReducer(prevCtx, ctx) : ctx.data;
    const prices = prevCtx ? priceValueBuilder(aggregated) : ctx.priceValues;
    const p = prices.length ? prices[prices.length - 1] : 0;
    return {
      _internal_startIndex: chunk._internal_startIndex,
      _internal_endIndex: row._internal_index,
      _internal_startTime: chunk._internal_startTime,
      _internal_endTime: row._internal_time,
      _internal_open: chunk._internal_open,
      _internal_high: Math.max(chunk._internal_high, p),
      _internal_low: Math.min(chunk._internal_low, p),
      _internal_close: p,
      _internal_originalDataCount: chunk._internal_originalDataCount + (row._internal_originalDataCount ?? 1),
      _internal_conflatedData: aggregated,
      _internal_isRemainder: false
    };
  }
  // fold [start, end) with override at overrideIndex
  // eslint-disable-next-line max-params
  _private__mergeRangeWithOverride(data, start, end, overrideIndex, overrideRow, customReducer, isCustomSeries = false, priceValueBuilder) {
    const first = start === overrideIndex ? overrideRow : data[start];
    if (end - start === 1) {
      return this._private__plotRowToChunk(first, true);
    }
    const second = start + 1 === overrideIndex ? overrideRow : data[start + 1];
    let chunk = this._private__mergeTwoRows(first, second, customReducer, isCustomSeries, priceValueBuilder);
    for (let i = start + 2; i < end; i++) {
      const row = i === overrideIndex ? overrideRow : data[i];
      chunk = this._private__mergeChunkAndRow(chunk, row, customReducer, isCustomSeries, priceValueBuilder);
    }
    return chunk;
  }
  _private__convertToContext(item, priceValueBuilder) {
    const itemData = item._internal_data ?? {};
    return {
      data: item._internal_data,
      index: item._internal_index,
      originalTime: item._internal_originalTime,
      time: item._internal_time,
      priceValues: priceValueBuilder(itemData)
    };
  }
  _private__chunkToSeriesPlotRow(chunk, isCustomSeries = false) {
    const isCustom = isCustomSeries === true;
    const hasCustomData = !!chunk._internal_conflatedData;
    const base = {
      _internal_index: chunk._internal_startIndex,
      _internal_time: chunk._internal_startTime,
      _internal_originalTime: chunk._internal_startTime,
      _internal_value: [
        isCustom ? chunk._internal_close : chunk._internal_open,
        chunk._internal_high,
        chunk._internal_low,
        chunk._internal_close
      ],
      _internal_originalDataCount: chunk._internal_originalDataCount
    };
    const data = isCustom ? hasCustomData ? chunk._internal_conflatedData : { _internal_time: chunk._internal_startTime } : void 0;
    return {
      ...base,
      _internal_data: data
    };
  }
  _private__chunksToSeriesPlotRows(chunks, isCustomSeries = false) {
    return chunks.map((chunk) => this._private__chunkToSeriesPlotRow(chunk, isCustomSeries));
  }
  /**
   * Update only the last chunk in cached conflated data efficiently.
   */
  // eslint-disable-next-line max-params
  _private__updateLastChunkInCache(originalData, newLastRow, conflationLevel, cachedRows, isCustomSeries = false, customReducer, priceValueBuilder) {
    if (cachedRows.length === 0) {
      return cachedRows;
    }
    const lastOriginalIndex = originalData.length - 1;
    const chunkStartIndex = Math.floor(lastOriginalIndex / conflationLevel) * conflationLevel;
    const chunkEndIndex = Math.min(chunkStartIndex + conflationLevel, originalData.length);
    if (chunkEndIndex - chunkStartIndex < conflationLevel && originalData.length > conflationLevel) {
      const newOriginalData = originalData.slice();
      newOriginalData[newOriginalData.length - 1] = newLastRow;
      return this._internal_conflateByFactor(newOriginalData, conflationLevel, customReducer, isCustomSeries, priceValueBuilder);
    }
    const lastChunkIndex = Math.floor((lastOriginalIndex - 1) / conflationLevel);
    const newChunkIndex = Math.floor(lastOriginalIndex / conflationLevel);
    if (lastChunkIndex === newChunkIndex || cachedRows.length === 1) {
      const actualEndIndex = Math.min(chunkStartIndex + conflationLevel, originalData.length);
      const count = actualEndIndex - chunkStartIndex;
      if (count <= 0) {
        return cachedRows;
      }
      const mergedChunk = count === 1 ? this._private__plotRowToChunk(
        chunkStartIndex === lastOriginalIndex ? newLastRow : originalData[chunkStartIndex],
        /* isRemainder*/
        true
      ) : this._private__mergeRangeWithOverride(originalData, chunkStartIndex, actualEndIndex, lastOriginalIndex, newLastRow, customReducer, isCustomSeries, priceValueBuilder);
      cachedRows[cachedRows.length - 1] = this._private__chunkToSeriesPlotRow(mergedChunk, isCustomSeries);
      return cachedRows;
    } else {
      const newOriginalData = originalData.slice();
      newOriginalData[newOriginalData.length - 1] = newLastRow;
      return this._internal_conflateByFactor(newOriginalData, conflationLevel, customReducer, isCustomSeries, priceValueBuilder);
    }
  }
  _private__plotRowToChunk(item, isRemainder = false) {
    const chunk = {
      _internal_startIndex: item._internal_index,
      _internal_endIndex: item._internal_index,
      _internal_startTime: item._internal_time,
      _internal_endTime: item._internal_time,
      _internal_open: item._internal_value[
        0
        /* PlotRowValueIndex.Open */
      ],
      _internal_high: item._internal_value[
        1
        /* PlotRowValueIndex.High */
      ],
      _internal_low: item._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ],
      _internal_close: item._internal_value[
        3
        /* PlotRowValueIndex.Close */
      ],
      _internal_originalDataCount: item._internal_originalDataCount ?? 1,
      _internal_conflatedData: item._internal_data,
      _internal_isRemainder: isRemainder
    };
    return chunk;
  }
  _private__getValidatedCacheEntry(data) {
    const entry = this._private__ensureCacheEntry(data);
    const dataVersion = this._private__getDataVersion(data);
    if (entry._internal_version !== dataVersion) {
      entry._internal_levelResults.clear();
      entry._internal_version = dataVersion;
    }
    return entry;
  }
  _private__ensureCacheEntry(data) {
    let entry = this._private__dataCache.get(data);
    if (entry === void 0) {
      entry = {
        _internal_version: this._private__getDataVersion(data),
        _internal_levelResults: /* @__PURE__ */ new Map()
      };
      this._private__dataCache.set(data, entry);
    }
    return entry;
  }
};
var PriceDataSource = class extends DataSource {
  constructor(model) {
    super();
    this._private__model = model;
  }
  _internal_model() {
    return this._private__model;
  }
};
var barStyleFnMap = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Bar: (findBar, barStyle, barIndex, precomputedBars) => {
    const upColor = barStyle.upColor;
    const downColor = barStyle.downColor;
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    const isUp = ensure(currentBar._internal_value[
      0
      /* PlotRowValueIndex.Open */
    ]) <= ensure(currentBar._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ]);
    return {
      _internal_barColor: currentBar._internal_color ?? (isUp ? upColor : downColor)
    };
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Candlestick: (findBar, candlestickStyle, barIndex, precomputedBars) => {
    const upColor = candlestickStyle.upColor;
    const downColor = candlestickStyle.downColor;
    const borderUpColor = candlestickStyle.borderUpColor;
    const borderDownColor = candlestickStyle.borderDownColor;
    const wickUpColor = candlestickStyle.wickUpColor;
    const wickDownColor = candlestickStyle.wickDownColor;
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    const isUp = ensure(currentBar._internal_value[
      0
      /* PlotRowValueIndex.Open */
    ]) <= ensure(currentBar._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ]);
    return {
      _internal_barColor: currentBar._internal_color ?? (isUp ? upColor : downColor),
      _internal_barBorderColor: currentBar._internal_borderColor ?? (isUp ? borderUpColor : borderDownColor),
      _internal_barWickColor: currentBar._internal_wickColor ?? (isUp ? wickUpColor : wickDownColor)
    };
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Custom: (findBar, customStyle, barIndex, precomputedBars) => {
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    return {
      _internal_barColor: currentBar._internal_color ?? customStyle.color
    };
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Area: (findBar, areaStyle, barIndex, precomputedBars) => {
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    return {
      _internal_barColor: currentBar._internal_lineColor ?? areaStyle.lineColor,
      _internal_lineColor: currentBar._internal_lineColor ?? areaStyle.lineColor,
      _internal_topColor: currentBar._internal_topColor ?? areaStyle.topColor,
      _internal_bottomColor: currentBar._internal_bottomColor ?? areaStyle.bottomColor
    };
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Baseline: (findBar, baselineStyle, barIndex, precomputedBars) => {
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    const isAboveBaseline = currentBar._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ] >= baselineStyle.baseValue.price;
    return {
      _internal_barColor: isAboveBaseline ? baselineStyle.topLineColor : baselineStyle.bottomLineColor,
      _internal_topLineColor: currentBar._internal_topLineColor ?? baselineStyle.topLineColor,
      _internal_bottomLineColor: currentBar._internal_bottomLineColor ?? baselineStyle.bottomLineColor,
      _internal_topFillColor1: currentBar._internal_topFillColor1 ?? baselineStyle.topFillColor1,
      _internal_topFillColor2: currentBar._internal_topFillColor2 ?? baselineStyle.topFillColor2,
      _internal_bottomFillColor1: currentBar._internal_bottomFillColor1 ?? baselineStyle.bottomFillColor1,
      _internal_bottomFillColor2: currentBar._internal_bottomFillColor2 ?? baselineStyle.bottomFillColor2
    };
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Line: (findBar, lineStyle, barIndex, precomputedBars) => {
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    return {
      _internal_barColor: currentBar._internal_color ?? lineStyle.color,
      _internal_lineColor: currentBar._internal_color ?? lineStyle.color
    };
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Histogram: (findBar, histogramStyle, barIndex, precomputedBars) => {
    const currentBar = ensureNotNull(findBar(barIndex, precomputedBars));
    return {
      _internal_barColor: currentBar._internal_color ?? histogramStyle.color
    };
  }
};
var SeriesBarColorer = class {
  constructor(series) {
    this._private__findBar = (barIndex, precomputedBars) => {
      if (precomputedBars !== void 0) {
        return precomputedBars._internal_value;
      }
      return this._private__series._internal_bars()._internal_valueAt(barIndex);
    };
    this._private__series = series;
    this._private__styleGetter = barStyleFnMap[series._internal_seriesType()];
  }
  _internal_barStyle(barIndex, precomputedBars) {
    return this._private__styleGetter(this._private__findBar, this._private__series._internal_options(), barIndex, precomputedBars);
  }
};
function boundCompare(lower, arr, value, compare, start = 0, to = arr.length) {
  let count = to - start;
  while (0 < count) {
    const count2 = count >> 1;
    const mid = start + count2;
    if (compare(arr[mid], value) === lower) {
      start = mid + 1;
      count -= count2 + 1;
    } else {
      count = count2;
    }
  }
  return start;
}
var lowerBound = boundCompare.bind(null, true);
var upperBound = boundCompare.bind(null, false);
var MismatchDirection;
(function(MismatchDirection2) {
  MismatchDirection2[MismatchDirection2["NearestLeft"] = -1] = "NearestLeft";
  MismatchDirection2[MismatchDirection2["None"] = 0] = "None";
  MismatchDirection2[MismatchDirection2["NearestRight"] = 1] = "NearestRight";
})(MismatchDirection || (MismatchDirection = {}));
var CHUNK_SIZE = 30;
var PlotList = class {
  constructor() {
    this._private__items = [];
    this._private__minMaxCache = /* @__PURE__ */ new Map();
    this._private__rowSearchCache = /* @__PURE__ */ new Map();
    this._private__indices = [];
  }
  // @returns Last row
  _internal_last() {
    return this._internal_size() > 0 ? this._private__items[this._private__items.length - 1] : null;
  }
  _internal_firstIndex() {
    return this._internal_size() > 0 ? this._private__indexAt(0) : null;
  }
  _internal_lastIndex() {
    return this._internal_size() > 0 ? this._private__indexAt(this._private__items.length - 1) : null;
  }
  _internal_size() {
    return this._private__items.length;
  }
  _internal_isEmpty() {
    return this._internal_size() === 0;
  }
  _internal_contains(index) {
    return this._private__search(
      index,
      0
      /* MismatchDirection.None */
    ) !== null;
  }
  _internal_valueAt(index) {
    return this._internal_search(index);
  }
  _internal_search(index, searchMode = 0) {
    const pos = this._private__search(index, searchMode);
    if (pos === null) {
      return null;
    }
    return {
      ...this._private__valueAt(pos),
      _internal_index: this._private__indexAt(pos)
    };
  }
  _internal_rows() {
    return this._private__items;
  }
  _internal_minMaxOnRangeCached(start, end, plots) {
    if (this._internal_isEmpty()) {
      return null;
    }
    let result = null;
    for (const plot of plots) {
      const plotMinMax = this._private__minMaxOnRangeCachedImpl(start, end, plot);
      result = mergeMinMax(result, plotMinMax);
    }
    return result;
  }
  _internal_setData(plotRows) {
    this._private__rowSearchCache.clear();
    this._private__minMaxCache.clear();
    this._private__items = plotRows;
    this._private__indices = plotRows.map((plotRow) => plotRow._internal_index);
  }
  // TimePointIndex values for fulfilled data points
  _internal_indices() {
    return this._private__indices;
  }
  _private__indexAt(offset) {
    return this._private__items[offset]._internal_index;
  }
  _private__valueAt(offset) {
    return this._private__items[offset];
  }
  _private__search(index, searchMode) {
    const exactPos = this._private__bsearch(index);
    if (exactPos === null && searchMode !== 0) {
      switch (searchMode) {
        case -1:
          return this._private__searchNearestLeft(index);
        case 1:
          return this._private__searchNearestRight(index);
        default:
          throw new TypeError("Unknown search mode");
      }
    }
    return exactPos;
  }
  _private__searchNearestLeft(index) {
    let nearestLeftPos = this._private__lowerbound(index);
    if (nearestLeftPos > 0) {
      nearestLeftPos = nearestLeftPos - 1;
    }
    return nearestLeftPos !== this._private__items.length && this._private__indexAt(nearestLeftPos) < index ? nearestLeftPos : null;
  }
  _private__searchNearestRight(index) {
    const nearestRightPos = this._private__upperbound(index);
    return nearestRightPos !== this._private__items.length && index < this._private__indexAt(nearestRightPos) ? nearestRightPos : null;
  }
  _private__bsearch(index) {
    const start = this._private__lowerbound(index);
    if (start !== this._private__items.length && !(index < this._private__items[start]._internal_index)) {
      return start;
    }
    return null;
  }
  _private__lowerbound(index) {
    return lowerBound(this._private__items, index, (a, b) => a._internal_index < b);
  }
  _private__upperbound(index) {
    return upperBound(this._private__items, index, (a, b) => a._internal_index > b);
  }
  _private__plotMinMax(startIndex, endIndexExclusive, plotIndex) {
    let result = null;
    for (let i = startIndex; i < endIndexExclusive; i++) {
      const values = this._private__items[i]._internal_value;
      const v = values[plotIndex];
      if (Number.isNaN(v)) {
        continue;
      }
      if (result === null) {
        result = { _internal_min: v, _internal_max: v };
      } else {
        if (v < result._internal_min) {
          result._internal_min = v;
        }
        if (v > result._internal_max) {
          result._internal_max = v;
        }
      }
    }
    return result;
  }
  _private__minMaxOnRangeCachedImpl(start, end, plotIndex) {
    if (this._internal_isEmpty()) {
      return null;
    }
    let result = null;
    const firstIndex = ensureNotNull(this._internal_firstIndex());
    const lastIndex = ensureNotNull(this._internal_lastIndex());
    const s = Math.max(start, firstIndex);
    const e = Math.min(end, lastIndex);
    const cachedLow = Math.ceil(s / CHUNK_SIZE) * CHUNK_SIZE;
    const cachedHigh = Math.max(cachedLow, Math.floor(e / CHUNK_SIZE) * CHUNK_SIZE);
    {
      const startIndex = this._private__lowerbound(s);
      const endIndex = this._private__upperbound(Math.min(e, cachedLow, end));
      const plotMinMax = this._private__plotMinMax(startIndex, endIndex, plotIndex);
      result = mergeMinMax(result, plotMinMax);
    }
    let minMaxCache = this._private__minMaxCache.get(plotIndex);
    if (minMaxCache === void 0) {
      minMaxCache = /* @__PURE__ */ new Map();
      this._private__minMaxCache.set(plotIndex, minMaxCache);
    }
    for (let c = Math.max(cachedLow + 1, s); c < cachedHigh; c += CHUNK_SIZE) {
      const chunkIndex = Math.floor(c / CHUNK_SIZE);
      let chunkMinMax = minMaxCache.get(chunkIndex);
      if (chunkMinMax === void 0) {
        const chunkStart = this._private__lowerbound(chunkIndex * CHUNK_SIZE);
        const chunkEnd = this._private__upperbound((chunkIndex + 1) * CHUNK_SIZE - 1);
        chunkMinMax = this._private__plotMinMax(chunkStart, chunkEnd, plotIndex);
        minMaxCache.set(chunkIndex, chunkMinMax);
      }
      result = mergeMinMax(result, chunkMinMax);
    }
    {
      const startIndex = this._private__lowerbound(cachedHigh);
      const endIndex = this._private__upperbound(e);
      const plotMinMax = this._private__plotMinMax(startIndex, endIndex, plotIndex);
      result = mergeMinMax(result, plotMinMax);
    }
    return result;
  }
};
function mergeMinMax(first, second) {
  if (first === null) {
    return second;
  } else {
    if (second === null) {
      return first;
    } else {
      const min2 = Math.min(first._internal_min, second._internal_min);
      const max = Math.max(first._internal_max, second._internal_max);
      return { _internal_min: min2, _internal_max: max };
    }
  }
}
function createSeriesPlotList() {
  return new PlotList();
}
var drawingUtils = {
  setLineStyle
};
var PrimitiveRendererWrapper = class {
  constructor(baseRenderer) {
    this._private__baseRenderer = baseRenderer;
  }
  _internal_draw(target, isHovered, hitTestData) {
    this._private__baseRenderer.draw(target, drawingUtils);
  }
  _internal_drawBackground(target, isHovered, hitTestData) {
    this._private__baseRenderer.drawBackground?.(target, drawingUtils);
  }
};
var PrimitivePaneViewWrapper = class {
  constructor(paneView) {
    this._private__cache = null;
    this._private__paneView = paneView;
  }
  _internal_renderer() {
    const baseRenderer = this._private__paneView.renderer();
    if (baseRenderer === null) {
      return null;
    }
    if (this._private__cache?._internal_base === baseRenderer) {
      return this._private__cache._internal_wrapper;
    }
    const wrapper = new PrimitiveRendererWrapper(baseRenderer);
    this._private__cache = {
      _internal_base: baseRenderer,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_zOrder() {
    return this._private__paneView.zOrder?.() ?? "normal";
  }
};
var PrimitiveWrapper = class {
  constructor(primitive) {
    this._private__paneViewsCache = null;
    this._internal__primitive = primitive;
  }
  _internal_primitive() {
    return this._internal__primitive;
  }
  _internal_updateAllViews() {
    this._internal__primitive.updateAllViews?.();
  }
  _internal_paneViews() {
    const base = this._internal__primitive.paneViews?.() ?? [];
    if (this._private__paneViewsCache?._internal_base === base) {
      return this._private__paneViewsCache._internal_wrapper;
    }
    const wrapper = base.map((pw) => new PrimitivePaneViewWrapper(pw));
    this._private__paneViewsCache = {
      _internal_base: base,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_hitTest(x, y) {
    return this._internal__primitive.hitTest?.(x, y) ?? null;
  }
};
var PanePrimitiveWrapper$1 = class PanePrimitiveWrapper extends PrimitiveWrapper {
  _internal_labelPaneViews() {
    return [];
  }
};
var SeriesPrimitiveRendererWrapper = class {
  constructor(baseRenderer) {
    this._private__baseRenderer = baseRenderer;
  }
  _internal_draw(target, isHovered, hitTestData) {
    this._private__baseRenderer.draw(target, drawingUtils);
  }
  _internal_drawBackground(target, isHovered, hitTestData) {
    this._private__baseRenderer.drawBackground?.(target, drawingUtils);
  }
};
var SeriesPrimitivePaneViewWrapper = class {
  constructor(paneView) {
    this._private__cache = null;
    this._private__paneView = paneView;
  }
  _internal_renderer() {
    const baseRenderer = this._private__paneView.renderer();
    if (baseRenderer === null) {
      return null;
    }
    if (this._private__cache?._internal_base === baseRenderer) {
      return this._private__cache._internal_wrapper;
    }
    const wrapper = new SeriesPrimitiveRendererWrapper(baseRenderer);
    this._private__cache = {
      _internal_base: baseRenderer,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_zOrder() {
    return this._private__paneView.zOrder?.() ?? "normal";
  }
};
function getAxisViewData(baseView) {
  return {
    _internal_text: baseView.text(),
    _internal_coordinate: baseView.coordinate(),
    _internal_fixedCoordinate: baseView.fixedCoordinate?.(),
    _internal_color: baseView.textColor(),
    _internal_background: baseView.backColor(),
    _internal_visible: baseView.visible?.() ?? true,
    _internal_tickVisible: baseView.tickVisible?.() ?? true
  };
}
var SeriesPrimitiveTimeAxisViewWrapper = class {
  constructor(baseView, timeScale) {
    this._private__renderer = new TimeAxisViewRenderer();
    this._private__baseView = baseView;
    this._private__timeScale = timeScale;
  }
  _internal_renderer() {
    this._private__renderer._internal_setData({
      _internal_width: this._private__timeScale._internal_width(),
      ...getAxisViewData(this._private__baseView)
    });
    return this._private__renderer;
  }
};
var SeriesPrimitivePriceAxisViewWrapper = class extends PriceAxisView {
  constructor(baseView, priceScale) {
    super();
    this._private__baseView = baseView;
    this._private__priceScale = priceScale;
  }
  _internal__updateRendererData(axisRendererData, paneRendererData, commonRendererData) {
    const data = getAxisViewData(this._private__baseView);
    commonRendererData._internal_background = data._internal_background;
    axisRendererData._internal_color = data._internal_color;
    const additionalPadding = 2 / 12 * this._private__priceScale._internal_fontSize();
    commonRendererData._internal_additionalPaddingTop = additionalPadding;
    commonRendererData._internal_additionalPaddingBottom = additionalPadding;
    commonRendererData._internal_coordinate = data._internal_coordinate;
    commonRendererData._internal_fixedCoordinate = data._internal_fixedCoordinate;
    axisRendererData._internal_text = data._internal_text;
    axisRendererData._internal_visible = data._internal_visible;
    axisRendererData._internal_tickVisible = data._internal_tickVisible;
  }
};
var SeriesPrimitiveWrapper = class extends PrimitiveWrapper {
  constructor(primitive, series) {
    super(primitive);
    this._private__timeAxisViewsCache = null;
    this._private__priceAxisViewsCache = null;
    this._private__priceAxisPaneViewsCache = null;
    this._private__timeAxisPaneViewsCache = null;
    this._private__series = series;
  }
  _internal_timeAxisViews() {
    const base = this._internal__primitive.timeAxisViews?.() ?? [];
    if (this._private__timeAxisViewsCache?._internal_base === base) {
      return this._private__timeAxisViewsCache._internal_wrapper;
    }
    const timeScale = this._private__series._internal_model()._internal_timeScale();
    const wrapper = base.map((aw) => new SeriesPrimitiveTimeAxisViewWrapper(aw, timeScale));
    this._private__timeAxisViewsCache = {
      _internal_base: base,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_priceAxisViews() {
    const base = this._internal__primitive.priceAxisViews?.() ?? [];
    if (this._private__priceAxisViewsCache?._internal_base === base) {
      return this._private__priceAxisViewsCache._internal_wrapper;
    }
    const priceScale = this._private__series._internal_priceScale();
    const wrapper = base.map((aw) => new SeriesPrimitivePriceAxisViewWrapper(aw, priceScale));
    this._private__priceAxisViewsCache = {
      _internal_base: base,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_priceAxisPaneViews() {
    const base = this._internal__primitive.priceAxisPaneViews?.() ?? [];
    if (this._private__priceAxisPaneViewsCache?._internal_base === base) {
      return this._private__priceAxisPaneViewsCache._internal_wrapper;
    }
    const wrapper = base.map((pw) => new SeriesPrimitivePaneViewWrapper(pw));
    this._private__priceAxisPaneViewsCache = {
      _internal_base: base,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_timeAxisPaneViews() {
    const base = this._internal__primitive.timeAxisPaneViews?.() ?? [];
    if (this._private__timeAxisPaneViewsCache?._internal_base === base) {
      return this._private__timeAxisPaneViewsCache._internal_wrapper;
    }
    const wrapper = base.map((pw) => new SeriesPrimitivePaneViewWrapper(pw));
    this._private__timeAxisPaneViewsCache = {
      _internal_base: base,
      _internal_wrapper: wrapper
    };
    return wrapper;
  }
  _internal_autoscaleInfo(startTimePoint, endTimePoint) {
    return this._internal__primitive.autoscaleInfo?.(startTimePoint, endTimePoint) ?? null;
  }
};
function extractPrimitivePaneViews(primitives, extractor, zOrder, destination) {
  primitives.forEach((wrapper) => {
    extractor(wrapper).forEach((paneView) => {
      if (paneView._internal_zOrder() !== zOrder) {
        return;
      }
      destination.push(paneView);
    });
  });
}
function primitivePaneViewsExtractor(wrapper) {
  return wrapper._internal_paneViews();
}
function primitivePricePaneViewsExtractor(wrapper) {
  return wrapper._internal_priceAxisPaneViews();
}
function primitiveTimePaneViewsExtractor(wrapper) {
  return wrapper._internal_timeAxisPaneViews();
}
var lineBasedSeries = ["Area", "Line", "Baseline"];
var Series = class extends PriceDataSource {
  constructor(model, seriesType, options, createPaneView2, customPaneView) {
    super(model);
    this._private__data = createSeriesPlotList();
    this._private__priceLineView = new SeriesPriceLinePaneView(this);
    this._private__customPriceLines = [];
    this._private__baseHorizontalLineView = new SeriesHorizontalBaseLinePaneView(this);
    this._private__lastPriceAnimationPaneView = null;
    this._private__barColorerCache = null;
    this._private__animationTimeoutId = null;
    this._private__primitives = [];
    this._private__dataConflater = new DataConflater();
    this._private__conflationByFactorCache = /* @__PURE__ */ new Map();
    this._private__customConflationReducer = null;
    this._private__options = options;
    this._private__seriesType = seriesType;
    const priceAxisView = new SeriesPriceAxisView(this);
    this._private__priceAxisViews = [priceAxisView];
    this._private__panePriceAxisView = new PanePriceAxisView(priceAxisView, this, model);
    if (lineBasedSeries.includes(this._private__seriesType)) {
      this._private__lastPriceAnimationPaneView = new SeriesLastPriceAnimationPaneView(this);
    }
    this._private__recreateFormatter();
    this._private__paneView = createPaneView2(this, this._internal_model(), customPaneView);
    if (this._private__seriesType === "Custom") {
      const paneView = this._private__paneView;
      if (paneView._internal_conflationReducer) {
        this._internal_setCustomConflationReducer(paneView._internal_conflationReducer);
      }
    }
  }
  _internal_destroy() {
    if (this._private__animationTimeoutId !== null) {
      clearTimeout(this._private__animationTimeoutId);
    }
  }
  _internal_priceLineColor(lastBarColor) {
    return this._private__options.priceLineColor || lastBarColor;
  }
  _internal_lastValueData(globalLast) {
    const noDataRes = { _internal_noData: true };
    const priceScale = this._internal_priceScale();
    if (this._internal_model()._internal_timeScale()._internal_isEmpty() || priceScale._internal_isEmpty() || this._private__data._internal_isEmpty()) {
      return noDataRes;
    }
    const visibleBars = this._internal_model()._internal_timeScale()._internal_visibleStrictRange();
    const firstValue = this._internal_firstValue();
    if (visibleBars === null || firstValue === null) {
      return noDataRes;
    }
    let bar;
    let lastIndex;
    if (globalLast) {
      const lastBar = this._private__data._internal_last();
      if (lastBar === null) {
        return noDataRes;
      }
      bar = lastBar;
      lastIndex = lastBar._internal_index;
    } else {
      const endBar = this._private__data._internal_search(
        visibleBars._internal_right(),
        -1
        /* MismatchDirection.NearestLeft */
      );
      if (endBar === null) {
        return noDataRes;
      }
      bar = this._private__data._internal_valueAt(endBar._internal_index);
      if (bar === null) {
        return noDataRes;
      }
      lastIndex = endBar._internal_index;
    }
    const price = bar._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ];
    const barColorer = this._internal_barColorer();
    const style = barColorer._internal_barStyle(lastIndex, { _internal_value: bar });
    const coordinate = priceScale._internal_priceToCoordinate(price, firstValue._internal_value);
    return {
      _internal_noData: false,
      _internal_price: price,
      _internal_text: priceScale._internal_formatPrice(price, firstValue._internal_value),
      _internal_formattedPriceAbsolute: priceScale._internal_formatPriceAbsolute(price),
      _internal_formattedPricePercentage: priceScale._internal_formatPricePercentage(price, firstValue._internal_value),
      _internal_color: style._internal_barColor,
      _internal_coordinate: coordinate,
      _internal_index: lastIndex
    };
  }
  _internal_barColorer() {
    if (this._private__barColorerCache !== null) {
      return this._private__barColorerCache;
    }
    this._private__barColorerCache = new SeriesBarColorer(this);
    return this._private__barColorerCache;
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_applyOptions(options) {
    const model = this._internal_model();
    const { priceScaleId, visible, priceFormat } = options;
    if (priceScaleId !== void 0 && priceScaleId !== this._private__options.priceScaleId) {
      model._internal_moveSeriesToScale(this, priceScaleId);
    }
    if (visible !== void 0 && visible !== this._private__options.visible) {
      model._internal_invalidateVisibleSeries();
    }
    const conflationOptionsChanged = options.conflationThresholdFactor !== void 0;
    merge(this._private__options, options);
    if (Object.prototype.hasOwnProperty.call(options, "autoscaleInfoProvider") && options.autoscaleInfoProvider === void 0) {
      this._private__options.autoscaleInfoProvider = void 0;
    }
    if (conflationOptionsChanged) {
      this._private__conflationByFactorCache.clear();
      this._internal_model()._internal_lightUpdate();
    }
    if (priceFormat !== void 0) {
      this._private__recreateFormatter();
      model._internal_fullUpdate();
    }
    model._internal_updateSource(this);
    model._internal_updateCrosshair();
    this._private__paneView._internal_update("options");
  }
  _internal_setData(data, updateInfo) {
    this._private__data._internal_setData(data);
    this._private__conflationByFactorCache.clear();
    const ts = this._internal_model()._internal_timeScale();
    const tsOptions = ts._internal_options();
    if (tsOptions.enableConflation && tsOptions.precomputeConflationOnInit) {
      this._private__precomputeConflationLevels(tsOptions.precomputeConflationPriority);
    }
    this._internal_invalidatePaneViewData();
    if (this._private__lastPriceAnimationPaneView !== null) {
      if (updateInfo && updateInfo._internal_lastBarUpdatedOrNewBarsAddedToTheRight) {
        this._private__lastPriceAnimationPaneView._internal_onNewRealtimeDataReceived();
      } else if (data.length === 0) {
        this._private__lastPriceAnimationPaneView._internal_onDataCleared();
      }
    }
    const sourcePane = this._internal_model()._internal_paneForSource(this);
    this._internal_model()._internal_recalculatePane(sourcePane);
    this._internal_model()._internal_updateSource(this);
    this._internal_model()._internal_updateCrosshair();
    this._internal_model()._internal_lightUpdate();
  }
  _internal_invalidatePaneViewData() {
    this._private__paneView._internal_update("data");
  }
  _internal_createPriceLine(options) {
    const result = new CustomPriceLine(this, options);
    this._private__customPriceLines.push(result);
    this._internal_model()._internal_updateSource(this);
    return result;
  }
  _internal_removePriceLine(line) {
    const index = this._private__customPriceLines.indexOf(line);
    if (index !== -1) {
      this._private__customPriceLines.splice(index, 1);
    }
    this._internal_model()._internal_updateSource(this);
  }
  _internal_priceLines() {
    return this._private__customPriceLines;
  }
  _internal_seriesType() {
    return this._private__seriesType;
  }
  _internal_firstValue() {
    const bar = this._internal_firstBar();
    if (bar === null) {
      return null;
    }
    return {
      _internal_value: bar._internal_value[
        3
        /* PlotRowValueIndex.Close */
      ],
      _internal_timePoint: bar._internal_time
    };
  }
  _internal_firstBar() {
    const visibleBars = this._internal_model()._internal_timeScale()._internal_visibleStrictRange();
    if (visibleBars === null) {
      return null;
    }
    const startTimePoint = visibleBars._internal_left();
    return this._private__data._internal_search(
      startTimePoint,
      1
      /* MismatchDirection.NearestRight */
    );
  }
  _internal_bars() {
    return this._private__data;
  }
  _internal_setCustomConflationReducer(reducer) {
    this._private__customConflationReducer = reducer;
    this._private__conflationByFactorCache.clear();
  }
  /**
   * Check if conflation is currently enabled for this series.
   */
  _internal_isConflationEnabled() {
    const timeScale = this._internal_model()._internal_timeScale();
    if (!timeScale._internal_options().enableConflation) {
      return false;
    }
    return this._private__calculateConflationFactor() > 1;
  }
  /**
   * Efficiently update conflation when only the last data point changes.
   * This avoids rebuilding all conflated chunks.
   */
  _internal_updateLastConflatedChunk(newLastRow) {
    if (!this._internal_isConflationEnabled()) {
      return;
    }
    const conflationFactor = this._private__calculateConflationFactor();
    if (!this._private__conflationByFactorCache.has(conflationFactor)) {
      return;
    }
    const isCustomSeries = this._private__seriesType === "Custom";
    const customReducer = isCustomSeries ? this._private__customConflationReducer || void 0 : void 0;
    const priceValueBuilder = isCustomSeries && this._private__paneView._internal_priceValueBuilder ? (item) => {
      const customPaneView = this._private__paneView;
      const plotRow = item;
      const result = customPaneView._internal_priceValueBuilder(plotRow);
      return Array.isArray(result) ? result : [typeof result === "number" ? result : 0];
    } : void 0;
    const updatedConflatedRows = this._private__dataConflater._internal_updateLastConflatedChunk(this._private__data._internal_rows(), newLastRow, conflationFactor, customReducer, isCustomSeries, priceValueBuilder);
    const conflatedList = createSeriesPlotList();
    conflatedList._internal_setData(updatedConflatedRows);
    this._private__conflationByFactorCache.set(conflationFactor, conflatedList);
  }
  _internal_conflatedBars() {
    const timeScale = this._internal_model()._internal_timeScale();
    const conflationEnabled = timeScale._internal_options().enableConflation;
    if (this._private__seriesType === "Custom" && this._private__customConflationReducer === null) {
      return this._private__data;
    }
    if (!conflationEnabled) {
      return this._private__data;
    }
    const factor = this._private__calculateConflationFactor();
    const cached = this._private__conflationByFactorCache.get(factor);
    if (cached) {
      return cached;
    }
    this._private__regenerateConflatedDataByFactor(factor);
    const built = this._private__conflationByFactorCache.get(factor);
    return built ?? this._private__data;
  }
  _internal_dataAt(time) {
    const prices = this._private__data._internal_valueAt(time);
    if (prices === null) {
      return null;
    }
    if (this._private__seriesType === "Bar" || this._private__seriesType === "Candlestick" || this._private__seriesType === "Custom") {
      return {
        _internal_open: prices._internal_value[
          0
          /* PlotRowValueIndex.Open */
        ],
        _internal_high: prices._internal_value[
          1
          /* PlotRowValueIndex.High */
        ],
        _internal_low: prices._internal_value[
          2
          /* PlotRowValueIndex.Low */
        ],
        _internal_close: prices._internal_value[
          3
          /* PlotRowValueIndex.Close */
        ]
      };
    } else {
      return prices._internal_value[
        3
        /* PlotRowValueIndex.Close */
      ];
    }
  }
  _internal_topPaneViews(pane) {
    const res = [];
    extractPrimitivePaneViews(this._private__primitives, primitivePaneViewsExtractor, "top", res);
    const animationPaneView = this._private__lastPriceAnimationPaneView;
    if (animationPaneView === null || !animationPaneView._internal_visible()) {
      return res;
    }
    if (this._private__animationTimeoutId === null && animationPaneView._internal_animationActive()) {
      this._private__animationTimeoutId = setTimeout(() => {
        this._private__animationTimeoutId = null;
        this._internal_model()._internal_cursorUpdate();
      }, 0);
    }
    animationPaneView._internal_invalidateStage();
    res.unshift(animationPaneView);
    return res;
  }
  _internal_paneViews() {
    const res = [];
    if (!this._private__isOverlay()) {
      res.push(this._private__baseHorizontalLineView);
    }
    res.push(this._private__paneView, this._private__priceLineView);
    const priceLineViews = this._private__customPriceLines.map((line) => line._internal_paneView());
    res.push(...priceLineViews);
    extractPrimitivePaneViews(this._private__primitives, primitivePaneViewsExtractor, "normal", res);
    return res;
  }
  _internal_paneViewsForHoveredSourceOnTop() {
    const main = this._private__paneView._internal_paneViewsForHoveredSourceOnTop?.() ?? null;
    if (main === null) {
      return null;
    }
    const isOverlay = this._private__isOverlay();
    const normalPaneViews = [];
    if (!isOverlay) {
      normalPaneViews.push(this._private__baseHorizontalLineView);
    }
    normalPaneViews.push(...main._internal_normalPaneViews);
    extractPrimitivePaneViews(this._private__primitives, primitivePaneViewsExtractor, "normal", normalPaneViews);
    const topPaneViews = [];
    topPaneViews.push(...main._internal_topPaneViews, this._private__priceLineView);
    const priceLineViews = this._private__customPriceLines.map((line) => line._internal_paneView());
    topPaneViews.push(...priceLineViews);
    return {
      _internal_normalPaneViews: normalPaneViews,
      _internal_topPaneViews: topPaneViews
    };
  }
  _internal_bottomPaneViews() {
    return this._private__extractPaneViews(primitivePaneViewsExtractor, "bottom");
  }
  _internal_pricePaneViews(zOrder) {
    return this._private__extractPaneViews(primitivePricePaneViewsExtractor, zOrder);
  }
  _internal_timePaneViews(zOrder) {
    return this._private__extractPaneViews(primitiveTimePaneViewsExtractor, zOrder);
  }
  _internal_primitiveHitTest(x, y) {
    return this._private__primitives.map((primitive) => primitive._internal_hitTest(x, y)).filter((result) => result !== null);
  }
  _internal_labelPaneViews() {
    return [
      this._private__panePriceAxisView,
      ...this._private__customPriceLines.map((line) => line._internal_labelPaneView())
    ];
  }
  _internal_priceAxisViews(pane, priceScale) {
    if (priceScale !== this._internal__priceScale && !this._private__isOverlay()) {
      return [];
    }
    const result = [...this._private__priceAxisViews];
    for (const customPriceLine of this._private__customPriceLines) {
      result.push(customPriceLine._internal_priceAxisView());
    }
    this._private__primitives.forEach((wrapper) => {
      result.push(...wrapper._internal_priceAxisViews());
    });
    return result;
  }
  _internal_timeAxisViews() {
    const res = [];
    this._private__primitives.forEach((wrapper) => {
      res.push(...wrapper._internal_timeAxisViews());
    });
    return res;
  }
  _internal_autoscaleInfo(startTimePoint, endTimePoint) {
    if (this._private__options.autoscaleInfoProvider !== void 0) {
      const autoscaleInfo = this._private__options.autoscaleInfoProvider(() => {
        const res = this._private__autoscaleInfoImpl(startTimePoint, endTimePoint);
        return res === null ? null : res._internal_toRaw();
      });
      return AutoscaleInfoImpl._internal_fromRaw(autoscaleInfo);
    }
    return this._private__autoscaleInfoImpl(startTimePoint, endTimePoint);
  }
  _internal_base() {
    const priceFormat = this._private__options.priceFormat;
    return priceFormat.base ?? 1 / priceFormat.minMove;
  }
  _internal_formatter() {
    return this._private__formatter;
  }
  _internal_updateAllViews() {
    this._private__paneView._internal_update();
    for (const priceAxisView of this._private__priceAxisViews) {
      priceAxisView._internal_update();
    }
    for (const customPriceLine of this._private__customPriceLines) {
      customPriceLine._internal_update();
    }
    this._private__priceLineView._internal_update();
    this._private__baseHorizontalLineView._internal_update();
    this._private__lastPriceAnimationPaneView?._internal_update();
    this._private__primitives.forEach((wrapper) => wrapper._internal_updateAllViews());
  }
  _internal_priceScale() {
    return ensureNotNull(super._internal_priceScale());
  }
  _internal_markerDataAtIndex(index) {
    const getValue = (this._private__seriesType === "Line" || this._private__seriesType === "Area" || this._private__seriesType === "Baseline") && this._private__options.crosshairMarkerVisible;
    if (!getValue) {
      return null;
    }
    const bar = this._private__data._internal_valueAt(index);
    if (bar === null) {
      return null;
    }
    const price = bar._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ];
    const radius2 = this._private__markerRadius();
    const borderColor = this._private__markerBorderColor();
    const borderWidth = this._private__markerBorderWidth();
    const backgroundColor = this._private__markerBackgroundColor(index);
    return { _internal_price: price, _internal_radius: radius2, _internal_borderColor: borderColor, _internal_borderWidth: borderWidth, _internal_backgroundColor: backgroundColor };
  }
  _internal_title() {
    return this._private__options.title;
  }
  _internal_visible() {
    return this._private__options.visible;
  }
  _internal_attachPrimitive(primitive) {
    this._private__primitives.push(new SeriesPrimitiveWrapper(primitive, this));
  }
  _internal_detachPrimitive(source) {
    this._private__primitives = this._private__primitives.filter((wrapper) => wrapper._internal_primitive() !== source);
  }
  _internal_customSeriesPlotValuesBuilder() {
    if (this._private__seriesType !== "Custom") {
      return void 0;
    }
    return (data) => {
      return this._private__paneView._internal_priceValueBuilder(data);
    };
  }
  _internal_customSeriesWhitespaceCheck() {
    if (this._private__seriesType !== "Custom") {
      return void 0;
    }
    return (data) => {
      return this._private__paneView._internal_isWhitespace(data);
    };
  }
  _internal_fulfilledIndices() {
    return this._private__data._internal_indices();
  }
  _private__isOverlay() {
    const priceScale = this._internal_priceScale();
    return !isDefaultPriceScale(priceScale._internal_id());
  }
  _private__autoscaleInfoImpl(startTimePoint, endTimePoint) {
    if (!isInteger(startTimePoint) || !isInteger(endTimePoint) || this._private__data._internal_isEmpty()) {
      return null;
    }
    const plots = this._private__seriesType === "Line" || this._private__seriesType === "Area" || this._private__seriesType === "Baseline" || this._private__seriesType === "Histogram" ? [
      3
      /* PlotRowValueIndex.Close */
    ] : [
      2,
      1
      /* PlotRowValueIndex.High */
    ];
    const barsMinMax = this._private__data._internal_minMaxOnRangeCached(startTimePoint, endTimePoint, plots);
    let range = barsMinMax !== null ? new PriceRangeImpl(barsMinMax._internal_min, barsMinMax._internal_max) : null;
    let margins = null;
    if (this._internal_seriesType() === "Histogram") {
      const base = this._private__options.base;
      const rangeWithBase = new PriceRangeImpl(base, base);
      range = range !== null ? range._internal_merge(rangeWithBase) : rangeWithBase;
    }
    this._private__primitives.forEach((primitive) => {
      const primitiveAutoscale = primitive._internal_autoscaleInfo(startTimePoint, endTimePoint);
      if (primitiveAutoscale?.priceRange) {
        const primitiveRange = new PriceRangeImpl(primitiveAutoscale.priceRange.minValue, primitiveAutoscale.priceRange.maxValue);
        range = range !== null ? range._internal_merge(primitiveRange) : primitiveRange;
      }
      if (primitiveAutoscale?.margins) {
        margins = primitiveAutoscale.margins;
      }
    });
    return new AutoscaleInfoImpl(range, margins);
  }
  _private__markerRadius() {
    switch (this._private__seriesType) {
      case "Line":
      case "Area":
      case "Baseline":
        return this._private__options.crosshairMarkerRadius;
    }
    return 0;
  }
  _private__markerBorderColor() {
    switch (this._private__seriesType) {
      case "Line":
      case "Area":
      case "Baseline": {
        const crosshairMarkerBorderColor = this._private__options.crosshairMarkerBorderColor;
        if (crosshairMarkerBorderColor.length !== 0) {
          return crosshairMarkerBorderColor;
        }
      }
    }
    return null;
  }
  _private__markerBorderWidth() {
    switch (this._private__seriesType) {
      case "Line":
      case "Area":
      case "Baseline":
        return this._private__options.crosshairMarkerBorderWidth;
    }
    return 0;
  }
  _private__markerBackgroundColor(index) {
    switch (this._private__seriesType) {
      case "Line":
      case "Area":
      case "Baseline": {
        const crosshairMarkerBackgroundColor = this._private__options.crosshairMarkerBackgroundColor;
        if (crosshairMarkerBackgroundColor.length !== 0) {
          return crosshairMarkerBackgroundColor;
        }
      }
    }
    return this._internal_barColorer()._internal_barStyle(index)._internal_barColor;
  }
  _private__recreateFormatter() {
    switch (this._private__options.priceFormat.type) {
      case "custom": {
        const formatter = this._private__options.priceFormat.formatter;
        this._private__formatter = {
          format: formatter,
          formatTickmarks: this._private__options.priceFormat.tickmarksFormatter ?? ((prices) => prices.map(formatter))
        };
        break;
      }
      case "volume": {
        this._private__formatter = new VolumeFormatter(this._private__options.priceFormat.precision);
        break;
      }
      case "percent": {
        this._private__formatter = new PercentageFormatter(this._private__options.priceFormat.precision);
        break;
      }
      default: {
        const priceScale = Math.pow(10, this._private__options.priceFormat.precision);
        this._private__formatter = new PriceFormatter(priceScale, this._private__options.priceFormat.minMove * priceScale);
      }
    }
    if (this._internal__priceScale !== null) {
      this._internal__priceScale._internal_updateFormatter();
    }
  }
  _private__extractPaneViews(extractor, zOrder) {
    const res = [];
    extractPrimitivePaneViews(this._private__primitives, extractor, zOrder, res);
    return res;
  }
  _private__calculateConflationFactor() {
    const { _internal_barSpacing: barSpacing, _internal_devicePixelRatio: devicePixelRatio, _internal_effectiveSmoothing: effectiveSmoothing } = this._private__getConflationParams();
    return this._private__dataConflater._internal_calculateConflationLevelWithSmoothing(barSpacing, devicePixelRatio, effectiveSmoothing);
  }
  _private__getConflationParams() {
    const timeScale = this._internal_model()._internal_timeScale();
    const barSpacing = timeScale._internal_barSpacing();
    const devicePixelRatio = window.devicePixelRatio || 1;
    const globalSmoothing = timeScale._internal_options().conflationThresholdFactor;
    const seriesSmoothing = this._private__options.conflationThresholdFactor;
    const effectiveSmoothing = seriesSmoothing ?? globalSmoothing ?? 1;
    return { _internal_barSpacing: barSpacing, _internal_devicePixelRatio: devicePixelRatio, _internal_effectiveSmoothing: effectiveSmoothing };
  }
  _private__buildConflatedListByFactor(factor) {
    const originalRows = this._private__data._internal_rows();
    let conflatedRows;
    if (this._private__seriesType === "Custom" && this._private__customConflationReducer !== null) {
      const priceValueBuilder = this._internal_customSeriesPlotValuesBuilder();
      if (!priceValueBuilder) {
        throw new Error(CONFLATION_ERROR_MESSAGES._internal_missingPriceValueBuilder);
      }
      conflatedRows = this._private__dataConflater._internal_conflateByFactor(originalRows, factor, this._private__customConflationReducer, true, (item) => priceValueBuilder(item));
    } else {
      conflatedRows = this._private__dataConflater._internal_conflateByFactor(originalRows, factor);
    }
    const list = createSeriesPlotList();
    list._internal_setData(conflatedRows);
    return list;
  }
  _private__regenerateConflatedDataByFactor(factor) {
    const list = this._private__buildConflatedListByFactor(factor);
    this._private__conflationByFactorCache.set(factor, list);
  }
  _private__precomputeConflationLevels(priority) {
    if (this._private__seriesType === "Custom" && (this._private__customConflationReducer === null || !this._internal_customSeriesPlotValuesBuilder())) {
      return;
    }
    this._private__conflationByFactorCache.clear();
    const conflateFactors = this._internal_model()._internal_timeScale()._internal_possibleConflationFactors();
    for (const lvl of conflateFactors) {
      const task = () => {
        this._private__precomputeConflationLevel(lvl);
      };
      const globalObj = typeof window === "object" && window || typeof self === "object" && self;
      if (globalObj?._internal_scheduler?._internal_postTask) {
        void globalObj._internal_scheduler._internal_postTask(() => {
          task();
        }, { _internal_priority: priority });
      } else {
        void Promise.resolve().then(() => task());
      }
    }
  }
  _private__precomputeConflationLevel(factor) {
    if (this._private__conflationByFactorCache.has(factor)) {
      return;
    }
    const originalRows = this._private__data._internal_rows();
    if (originalRows.length === 0) {
      return;
    }
    const list = this._private__buildConflatedListByFactor(factor);
    this._private__conflationByFactorCache.set(factor, list);
  }
};
var magnetPlotRowKeys = [
  3
];
var magnetOHLCPlotRowKeys = [
  0,
  1,
  2,
  3
];
var Magnet = class {
  constructor(options) {
    this._private__options = options;
  }
  _internal_align(price, index, pane) {
    let res = price;
    if (this._private__options.mode === 0) {
      return res;
    }
    const defaultPriceScale = pane._internal_defaultPriceScale();
    const firstValue = defaultPriceScale._internal_firstValue();
    if (firstValue === null) {
      return res;
    }
    const y = defaultPriceScale._internal_priceToCoordinate(price, firstValue);
    const serieses = pane._internal_dataSources().filter(((ds) => ds instanceof Series));
    const candidates = serieses.reduce((acc, series) => {
      if (pane._internal_isOverlay(series) || !series._internal_visible()) {
        return acc;
      }
      const ps = series._internal_priceScale();
      const bars = series._internal_bars();
      if (ps._internal_isEmpty() || !bars._internal_contains(index)) {
        return acc;
      }
      const bar = bars._internal_valueAt(index);
      if (bar === null) {
        return acc;
      }
      const firstPrice = ensure(series._internal_firstValue());
      const plotRowKeys = this._private__options.mode === 3 ? magnetOHLCPlotRowKeys : magnetPlotRowKeys;
      return acc.concat(plotRowKeys.map((key) => ps._internal_priceToCoordinate(bar._internal_value[key], firstPrice._internal_value)));
    }, []);
    if (candidates.length === 0) {
      return res;
    }
    candidates.sort((y1, y2) => Math.abs(y1 - y) - Math.abs(y2 - y));
    const nearest = candidates[0];
    res = defaultPriceScale._internal_coordinateToPrice(nearest, firstValue);
    return res;
  }
};
function clamp(value, minVal, maxVal) {
  return Math.min(Math.max(value, minVal), maxVal);
}
function isBaseDecimal(value) {
  if (value < 0) {
    return false;
  }
  if (value > 1e18) {
    return true;
  }
  for (let current2 = value; current2 > 1; current2 /= 10) {
    if (current2 % 10 !== 0) {
      return false;
    }
  }
  return true;
}
function greaterOrEqual(x1, x2, epsilon) {
  return x2 - x1 <= epsilon;
}
function equal(x1, x2, epsilon) {
  return Math.abs(x1 - x2) < epsilon;
}
function min(arr) {
  if (arr.length < 1) {
    throw Error("array is empty");
  }
  let minVal = arr[0];
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] < minVal) {
      minVal = arr[i];
    }
  }
  return minVal;
}
function ceiledEven(x) {
  const ceiled = Math.ceil(x);
  return ceiled % 2 !== 0 ? ceiled - 1 : ceiled;
}
function ceiledOdd(x) {
  const ceiled = Math.ceil(x);
  return ceiled % 2 === 0 ? ceiled - 1 : ceiled;
}
var GridRenderer = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._private__data = null;
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  _internal__drawImpl({ context: ctx, bitmapSize, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._private__data === null) {
      return;
    }
    const lineWidth = Math.max(1, Math.floor(horizontalPixelRatio));
    ctx.lineWidth = lineWidth;
    strokeInPixel(ctx, () => {
      const data = ensureNotNull(this._private__data);
      if (data._internal_vertLinesVisible) {
        ctx.strokeStyle = data._internal_vertLinesColor;
        setLineStyle(ctx, data._internal_vertLineStyle);
        ctx.beginPath();
        for (const timeMark of data._internal_timeMarks) {
          const x = Math.round(timeMark._internal_coord * horizontalPixelRatio);
          ctx.moveTo(x, -lineWidth);
          ctx.lineTo(x, bitmapSize.height + lineWidth);
        }
        ctx.stroke();
      }
      if (data._internal_horzLinesVisible) {
        ctx.strokeStyle = data._internal_horzLinesColor;
        setLineStyle(ctx, data._internal_horzLineStyle);
        ctx.beginPath();
        for (const priceMark of data._internal_priceMarks) {
          const y = Math.round(priceMark._internal_coord * verticalPixelRatio);
          ctx.moveTo(-lineWidth, y);
          ctx.lineTo(bitmapSize.width + lineWidth, y);
        }
        ctx.stroke();
      }
    });
  }
};
var GridPaneView = class {
  constructor(pane) {
    this._private__renderer = new GridRenderer();
    this._private__invalidated = true;
    this._private__pane = pane;
  }
  _internal_update() {
    this._private__invalidated = true;
  }
  _internal_renderer() {
    if (this._private__invalidated) {
      const gridOptions = this._private__pane._internal_model()._internal_options().grid;
      const data = {
        _internal_horzLinesVisible: gridOptions.horzLines.visible,
        _internal_vertLinesVisible: gridOptions.vertLines.visible,
        _internal_horzLinesColor: gridOptions.horzLines.color,
        _internal_vertLinesColor: gridOptions.vertLines.color,
        _internal_horzLineStyle: gridOptions.horzLines.style,
        _internal_vertLineStyle: gridOptions.vertLines.style,
        _internal_priceMarks: this._private__pane._internal_defaultPriceScale()._internal_marks(),
        // need this conversiom because TimeMark is a part of external interface
        // and fields inside TimeMark are not minified
        _internal_timeMarks: (this._private__pane._internal_model()._internal_timeScale()._internal_marks() || []).map((tm) => {
          return { _internal_coord: tm.coord };
        })
      };
      this._private__renderer._internal_setData(data);
      this._private__invalidated = false;
    }
    return this._private__renderer;
  }
};
var Grid = class {
  constructor(pane) {
    this._private__paneView = new GridPaneView(pane);
  }
  _internal_paneView() {
    return this._private__paneView;
  }
};
function hoveredSourceOnTopOrder(sources, hoveredSource, enabled) {
  if (!enabled) {
    return sources;
  }
  const hoveredIndex = sources.indexOf(hoveredSource);
  if (hoveredIndex === -1 || hoveredIndex === sources.length - 1) {
    return sources;
  }
  const reorderedSources = [];
  for (let i = 0; i < sources.length; i++) {
    if (i !== hoveredIndex) {
      reorderedSources.push(sources[i]);
    }
  }
  reorderedSources.push(sources[hoveredIndex]);
  return reorderedSources;
}
var defLogFormula = {
  _internal_logicalOffset: 4,
  _internal_coordOffset: 1e-4
};
function fromPercent(value, baseValue) {
  if (baseValue < 0) {
    value = -value;
  }
  return value / 100 * baseValue + baseValue;
}
function toPercent(value, baseValue) {
  const result = 100 * (value - baseValue) / baseValue;
  return baseValue < 0 ? -result : result;
}
function toPercentRange(priceRange, baseValue) {
  const minPercent = toPercent(priceRange._internal_minValue(), baseValue);
  const maxPercent = toPercent(priceRange._internal_maxValue(), baseValue);
  return new PriceRangeImpl(minPercent, maxPercent);
}
function fromIndexedTo100(value, baseValue) {
  value -= 100;
  if (baseValue < 0) {
    value = -value;
  }
  return value / 100 * baseValue + baseValue;
}
function toIndexedTo100(value, baseValue) {
  const result = 100 * (value - baseValue) / baseValue + 100;
  return baseValue < 0 ? -result : result;
}
function toIndexedTo100Range(priceRange, baseValue) {
  const minPercent = toIndexedTo100(priceRange._internal_minValue(), baseValue);
  const maxPercent = toIndexedTo100(priceRange._internal_maxValue(), baseValue);
  return new PriceRangeImpl(minPercent, maxPercent);
}
function toLog(price, logFormula) {
  const m = Math.abs(price);
  if (m < 1e-15) {
    return 0;
  }
  const res = Math.log10(m + logFormula._internal_coordOffset) + logFormula._internal_logicalOffset;
  return price < 0 ? -res : res;
}
function fromLog(logical, logFormula) {
  const m = Math.abs(logical);
  if (m < 1e-15) {
    return 0;
  }
  const res = Math.pow(10, m - logFormula._internal_logicalOffset) - logFormula._internal_coordOffset;
  return logical < 0 ? -res : res;
}
function convertPriceRangeToLog(priceRange, logFormula) {
  if (priceRange === null) {
    return null;
  }
  const min2 = toLog(priceRange._internal_minValue(), logFormula);
  const max = toLog(priceRange._internal_maxValue(), logFormula);
  return new PriceRangeImpl(min2, max);
}
function canConvertPriceRangeFromLog(priceRange, logFormula) {
  if (priceRange === null) {
    return false;
  }
  const min2 = fromLog(priceRange._internal_minValue(), logFormula);
  const max = fromLog(priceRange._internal_maxValue(), logFormula);
  return isFinite(min2) && isFinite(max);
}
function convertPriceRangeFromLog(priceRange, logFormula) {
  if (priceRange === null) {
    return null;
  }
  const min2 = fromLog(priceRange._internal_minValue(), logFormula);
  const max = fromLog(priceRange._internal_maxValue(), logFormula);
  return new PriceRangeImpl(min2, max);
}
function logFormulaForPriceRange(range) {
  if (range === null) {
    return defLogFormula;
  }
  const diff = Math.abs(range._internal_maxValue() - range._internal_minValue());
  if (diff >= 1 || diff < 1e-15) {
    return defLogFormula;
  }
  const digits = Math.ceil(Math.abs(Math.log10(diff)));
  const logicalOffset = defLogFormula._internal_logicalOffset + digits;
  const coordOffset = 1 / Math.pow(10, logicalOffset);
  return {
    _internal_logicalOffset: logicalOffset,
    _internal_coordOffset: coordOffset
  };
}
function logFormulasAreSame(f1, f2) {
  return f1._internal_logicalOffset === f2._internal_logicalOffset && f1._internal_coordOffset === f2._internal_coordOffset;
}
var PriceTickSpanCalculator = class {
  constructor(base, integralDividers) {
    this._private__base = base;
    this._private__integralDividers = integralDividers;
    if (isBaseDecimal(this._private__base)) {
      this._private__fractionalDividers = [2, 2.5, 2];
    } else {
      this._private__fractionalDividers = [];
      for (let baseRest = this._private__base; baseRest !== 1; ) {
        if (baseRest % 2 === 0) {
          this._private__fractionalDividers.push(2);
          baseRest /= 2;
        } else if (baseRest % 5 === 0) {
          this._private__fractionalDividers.push(2, 2.5);
          baseRest /= 5;
        } else {
          throw new Error("unexpected base");
        }
        if (this._private__fractionalDividers.length > 100) {
          throw new Error("something wrong with base");
        }
      }
    }
  }
  _internal_tickSpan(high, low, maxTickSpan) {
    const minMovement = this._private__base === 0 ? 0 : 1 / this._private__base;
    let resultTickSpan = Math.pow(10, Math.max(0, Math.ceil(Math.log10(high - low))));
    let index = 0;
    let c = this._private__integralDividers[0];
    while (true) {
      const resultTickSpanLargerMinMovement = greaterOrEqual(
        resultTickSpan,
        minMovement,
        1e-14
        /* Constants.TickSpanEpsilon */
      ) && resultTickSpan > minMovement + 1e-14;
      const resultTickSpanLargerMaxTickSpan = greaterOrEqual(
        resultTickSpan,
        maxTickSpan * c,
        1e-14
        /* Constants.TickSpanEpsilon */
      );
      const resultTickSpanLarger1 = greaterOrEqual(
        resultTickSpan,
        1,
        1e-14
        /* Constants.TickSpanEpsilon */
      );
      const haveToContinue = resultTickSpanLargerMinMovement && resultTickSpanLargerMaxTickSpan && resultTickSpanLarger1;
      if (!haveToContinue) {
        break;
      }
      resultTickSpan /= c;
      c = this._private__integralDividers[++index % this._private__integralDividers.length];
    }
    if (resultTickSpan <= minMovement + 1e-14) {
      resultTickSpan = minMovement;
    }
    resultTickSpan = Math.max(1, resultTickSpan);
    if (this._private__fractionalDividers.length > 0 && equal(
      resultTickSpan,
      1,
      1e-14
      /* Constants.TickSpanEpsilon */
    )) {
      index = 0;
      c = this._private__fractionalDividers[0];
      while (greaterOrEqual(
        resultTickSpan,
        maxTickSpan * c,
        1e-14
        /* Constants.TickSpanEpsilon */
      ) && resultTickSpan > minMovement + 1e-14) {
        resultTickSpan /= c;
        c = this._private__fractionalDividers[++index % this._private__fractionalDividers.length];
      }
    }
    return resultTickSpan;
  }
};
var PriceTickMarkBuilder = class {
  constructor(priceScale, base, coordinateToLogicalFunc, logicalToCoordinateFunc) {
    this._private__marks = [];
    this._private__priceScale = priceScale;
    this._private__base = base;
    this._private__coordinateToLogicalFunc = coordinateToLogicalFunc;
    this._private__logicalToCoordinateFunc = logicalToCoordinateFunc;
  }
  _internal_tickSpan(high, low) {
    if (high < low) {
      throw new Error("high < low");
    }
    const scaleHeight = this._private__priceScale._internal_height();
    const markHeight = this._private__tickMarkHeight();
    const maxTickSpan = (high - low) * markHeight / scaleHeight;
    const spanCalculator1 = new PriceTickSpanCalculator(this._private__base, [2, 2.5, 2]);
    const spanCalculator2 = new PriceTickSpanCalculator(this._private__base, [2, 2, 2.5]);
    const spanCalculator3 = new PriceTickSpanCalculator(this._private__base, [2.5, 2, 2]);
    const spans = [];
    spans.push(spanCalculator1._internal_tickSpan(high, low, maxTickSpan), spanCalculator2._internal_tickSpan(high, low, maxTickSpan), spanCalculator3._internal_tickSpan(high, low, maxTickSpan));
    return min(spans);
  }
  _internal_rebuildTickMarks() {
    const priceScale = this._private__priceScale;
    const firstValue = priceScale._internal_firstValue();
    if (firstValue === null) {
      this._private__marks = [];
      return;
    }
    const scaleHeight = priceScale._internal_height();
    const bottom = this._private__coordinateToLogicalFunc(scaleHeight - 1, firstValue);
    const top = this._private__coordinateToLogicalFunc(0, firstValue);
    const extraTopBottomMargin = this._private__priceScale._internal_options().entireTextOnly ? this._private__fontHeight() / 2 : 0;
    const minCoord = extraTopBottomMargin;
    const maxCoord = scaleHeight - 1 - extraTopBottomMargin;
    const high = Math.max(bottom, top);
    const low = Math.min(bottom, top);
    if (high === low) {
      this._private__marks = [];
      return;
    }
    const span = this._internal_tickSpan(high, low);
    this._private__updateMarks(firstValue, span, high, low, minCoord, maxCoord);
    if (priceScale._internal_hasVisibleEdgeMarks() && this._private__shouldApplyEdgeMarks(span, low, high)) {
      const padding = this._private__priceScale._internal_getEdgeMarksPadding();
      this._private__applyEdgeMarks(firstValue, span, minCoord, maxCoord, padding, padding * 2);
    }
    const logicals = this._private__marks.map((mark) => mark._internal_logical);
    const labels = this._private__priceScale._internal_formatLogicalTickmarks(logicals);
    for (let i = 0; i < this._private__marks.length; i++) {
      this._private__marks[i]._internal_label = labels[i];
    }
  }
  _internal_marks() {
    return this._private__marks;
  }
  _private__fontHeight() {
    return this._private__priceScale._internal_fontSize();
  }
  _private__tickMarkHeight() {
    return Math.ceil(this._private__fontHeight() * this._private__priceScale._internal_options().tickMarkDensity);
  }
  _private__updateMarks(firstValue, span, high, low, minCoord, maxCoord) {
    const marks = this._private__marks;
    const priceScale = this._private__priceScale;
    let mod = high % span;
    mod += mod < 0 ? span : 0;
    const sign = high >= low ? 1 : -1;
    let prevCoord = null;
    let targetIndex = 0;
    for (let logical = high - mod; logical > low; logical -= span) {
      const coord = this._private__logicalToCoordinateFunc(logical, firstValue, true);
      if (prevCoord !== null && Math.abs(coord - prevCoord) < this._private__tickMarkHeight()) {
        continue;
      }
      if (coord < minCoord || coord > maxCoord) {
        continue;
      }
      if (targetIndex < marks.length) {
        marks[targetIndex]._internal_coord = coord;
        marks[targetIndex]._internal_label = priceScale._internal_formatLogical(logical);
        marks[targetIndex]._internal_logical = logical;
      } else {
        marks.push({
          _internal_coord: coord,
          _internal_label: priceScale._internal_formatLogical(logical),
          _internal_logical: logical
        });
      }
      targetIndex++;
      prevCoord = coord;
      if (priceScale._internal_isLog()) {
        span = this._internal_tickSpan(logical * sign, low);
      }
    }
    marks.length = targetIndex;
  }
  _private__applyEdgeMarks(firstValue, span, minCoord, maxCoord, minPadding, maxPadding) {
    const marks = this._private__marks;
    const topMark = this._private__computeBoundaryPriceMark(firstValue, minCoord, minPadding, maxPadding);
    const bottomMark = this._private__computeBoundaryPriceMark(firstValue, maxCoord, -maxPadding, -minPadding);
    const spanPx = this._private__logicalToCoordinateFunc(0, firstValue, true) - this._private__logicalToCoordinateFunc(span, firstValue, true);
    if (marks.length > 0 && marks[0]._internal_coord - topMark._internal_coord < spanPx / 2) {
      marks.shift();
    }
    if (marks.length > 0 && bottomMark._internal_coord - marks[marks.length - 1]._internal_coord < spanPx / 2) {
      marks.pop();
    }
    marks.unshift(topMark);
    marks.push(bottomMark);
  }
  _private__computeBoundaryPriceMark(firstValue, coord, minPadding, maxPadding) {
    const avgPadding = (minPadding + maxPadding) / 2;
    const value1 = this._private__coordinateToLogicalFunc(coord + minPadding, firstValue);
    const value2 = this._private__coordinateToLogicalFunc(coord + maxPadding, firstValue);
    const minValue = Math.min(value1, value2);
    const maxValue = Math.max(value1, value2);
    const valueSpan = Math.max(0.1, this._internal_tickSpan(maxValue, minValue));
    const value = this._private__coordinateToLogicalFunc(coord + avgPadding, firstValue);
    const roundedValue = value - value % valueSpan;
    const roundedCoord = this._private__logicalToCoordinateFunc(roundedValue, firstValue, true);
    return { _internal_label: this._private__priceScale._internal_formatLogical(roundedValue), _internal_coord: roundedCoord, _internal_logical: roundedValue };
  }
  _private__shouldApplyEdgeMarks(span, low, high) {
    let range = ensure(this._private__priceScale._internal_priceRange());
    if (this._private__priceScale._internal_isLog()) {
      range = convertPriceRangeFromLog(range, this._private__priceScale._internal_getLogFormula());
    }
    return range._internal_minValue() - low < span && high - range._internal_maxValue() < span;
  }
};
function sortSources(sources) {
  return sources.slice().sort((s1, s2) => {
    return ensureNotNull(s1._internal_zorder()) - ensureNotNull(s2._internal_zorder());
  });
}
var PriceScaleMode;
(function(PriceScaleMode2) {
  PriceScaleMode2[PriceScaleMode2["Normal"] = 0] = "Normal";
  PriceScaleMode2[PriceScaleMode2["Logarithmic"] = 1] = "Logarithmic";
  PriceScaleMode2[PriceScaleMode2["Percentage"] = 2] = "Percentage";
  PriceScaleMode2[PriceScaleMode2["IndexedTo100"] = 3] = "IndexedTo100";
})(PriceScaleMode || (PriceScaleMode = {}));
var percentageFormatter = new PercentageFormatter();
var defaultPriceFormatter = new PriceFormatter(100, 1);
var PriceScale = class {
  constructor(id, options, layoutOptions, localizationOptions, colorParser) {
    this._private__height = 0;
    this._private__internalHeightCache = null;
    this._private__priceRange = null;
    this._private__priceRangeSnapshot = null;
    this._private__invalidatedForRange = { _internal_isValid: false, _internal_visibleBars: null };
    this._private__isCustomPriceRange = false;
    this._private__marginAbove = 0;
    this._private__marginBelow = 0;
    this._private__onMarksChanged = new Delegate();
    this._private__modeChanged = new Delegate();
    this._private__dataSources = [];
    this._private__formatterSource = null;
    this._private__cachedOrderedSources = null;
    this._private__marksCache = null;
    this._private__scaleStartPoint = null;
    this._private__scrollStartPoint = null;
    this._private__formatter = defaultPriceFormatter;
    this._private__logFormula = logFormulaForPriceRange(null);
    this._private__id = id;
    this._private__options = options;
    this._private__layoutOptions = layoutOptions;
    this._private__localizationOptions = localizationOptions;
    this._private__colorParser = colorParser;
    this._private__markBuilder = new PriceTickMarkBuilder(this, 100, this._private__coordinateToLogical.bind(this), this._private__logicalToCoordinate.bind(this));
  }
  _internal_id() {
    return this._private__id;
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_applyOptions(options) {
    merge(this._private__options, options);
    this._internal_updateFormatter();
    if (options.mode !== void 0) {
      this._internal_setMode({ _internal_mode: options.mode });
    }
    if (options.scaleMargins !== void 0) {
      const top = ensureDefined(options.scaleMargins.top);
      const bottom = ensureDefined(options.scaleMargins.bottom);
      if (top < 0 || top > 1) {
        throw new Error(`Invalid top margin - expect value between 0 and 1, given=${top}`);
      }
      if (bottom < 0 || bottom > 1) {
        throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${bottom}`);
      }
      if (top + bottom > 1) {
        throw new Error(`Invalid margins - sum of margins must be less than 1, given=${top + bottom}`);
      }
      this._private__invalidateInternalHeightCache();
      this._private__marksCache = null;
    }
  }
  _internal_isAutoScale() {
    return this._private__options.autoScale;
  }
  _internal_isCustomPriceRange() {
    return this._private__isCustomPriceRange;
  }
  _internal_isLog() {
    return this._private__options.mode === 1;
  }
  _internal_isPercentage() {
    return this._private__options.mode === 2;
  }
  _internal_isIndexedTo100() {
    return this._private__options.mode === 3;
  }
  _internal_getLogFormula() {
    return this._private__logFormula;
  }
  _internal_mode() {
    return {
      _internal_autoScale: this._private__options.autoScale,
      _internal_isInverted: this._private__options.invertScale,
      _internal_mode: this._private__options.mode
    };
  }
  // eslint-disable-next-line complexity
  _internal_setMode(newMode) {
    const oldMode = this._internal_mode();
    let priceRange = null;
    if (newMode._internal_autoScale !== void 0) {
      this._private__options.autoScale = newMode._internal_autoScale;
    }
    if (newMode._internal_mode !== void 0) {
      this._private__options.mode = newMode._internal_mode;
      if (newMode._internal_mode === 2 || newMode._internal_mode === 3) {
        this._private__options.autoScale = true;
      }
      this._private__invalidatedForRange._internal_isValid = false;
    }
    if (oldMode._internal_mode === 1 && newMode._internal_mode !== oldMode._internal_mode) {
      if (canConvertPriceRangeFromLog(this._private__priceRange, this._private__logFormula)) {
        priceRange = convertPriceRangeFromLog(this._private__priceRange, this._private__logFormula);
        if (priceRange !== null) {
          this._internal_setPriceRange(priceRange);
        }
      } else {
        this._private__options.autoScale = true;
      }
    }
    if (newMode._internal_mode === 1 && newMode._internal_mode !== oldMode._internal_mode) {
      priceRange = convertPriceRangeToLog(this._private__priceRange, this._private__logFormula);
      if (priceRange !== null) {
        this._internal_setPriceRange(priceRange);
      }
    }
    const modeChanged = oldMode._internal_mode !== this._private__options.mode;
    if (modeChanged && (oldMode._internal_mode === 2 || this._internal_isPercentage())) {
      this._internal_updateFormatter();
    }
    if (modeChanged && (oldMode._internal_mode === 3 || this._internal_isIndexedTo100())) {
      this._internal_updateFormatter();
    }
    if (newMode._internal_isInverted !== void 0 && oldMode._internal_isInverted !== newMode._internal_isInverted) {
      this._private__options.invertScale = newMode._internal_isInverted;
      this._private__onIsInvertedChanged();
    }
    this._private__modeChanged._internal_fire(oldMode, this._internal_mode());
  }
  _internal_modeChanged() {
    return this._private__modeChanged;
  }
  _internal_fontSize() {
    return this._private__layoutOptions.fontSize;
  }
  _internal_height() {
    return this._private__height;
  }
  _internal_setHeight(value) {
    if (this._private__height === value) {
      return;
    }
    this._private__height = value;
    this._private__invalidateInternalHeightCache();
    this._private__marksCache = null;
  }
  _internal_internalHeight() {
    if (this._private__internalHeightCache) {
      return this._private__internalHeightCache;
    }
    const res = this._internal_height() - this._private__topMarginPx() - this._private__bottomMarginPx();
    this._private__internalHeightCache = res;
    return res;
  }
  _internal_priceRange() {
    this._private__makeSureItIsValid();
    return this._private__priceRange;
  }
  _internal_setPriceRange(newPriceRange, isForceSetValue) {
    const oldPriceRange = this._private__priceRange;
    if (!isForceSetValue && !(oldPriceRange === null && newPriceRange !== null) && (oldPriceRange === null || oldPriceRange._internal_equals(newPriceRange))) {
      return;
    }
    this._private__marksCache = null;
    this._private__priceRange = newPriceRange;
  }
  _internal_setCustomPriceRange(newPriceRange) {
    this._internal_setPriceRange(newPriceRange);
    this._private__toggleCustomPriceRange(newPriceRange !== null);
  }
  _internal_isEmpty() {
    this._private__makeSureItIsValid();
    return this._private__height === 0 || !this._private__priceRange || this._private__priceRange._internal_isEmpty();
  }
  _internal_invertedCoordinate(coordinate) {
    return this._internal_isInverted() ? coordinate : this._internal_height() - 1 - coordinate;
  }
  _internal_priceToCoordinate(price, baseValue) {
    if (this._internal_isPercentage()) {
      price = toPercent(price, baseValue);
    } else if (this._internal_isIndexedTo100()) {
      price = toIndexedTo100(price, baseValue);
    }
    return this._private__logicalToCoordinate(price, baseValue);
  }
  _internal_pointsArrayToCoordinates(points2, baseValue, visibleRange) {
    this._private__makeSureItIsValid();
    const bh = this._private__bottomMarginPx();
    const range = ensureNotNull(this._internal_priceRange());
    const min2 = range._internal_minValue();
    const max = range._internal_maxValue();
    const ih = this._internal_internalHeight() - 1;
    const isInverted = this._internal_isInverted();
    const hmm = ih / (max - min2);
    const fromIndex = visibleRange === void 0 ? 0 : visibleRange.from;
    const toIndex = visibleRange === void 0 ? points2.length : visibleRange.to;
    const transformFn = this._private__getCoordinateTransformer();
    for (let i = fromIndex; i < toIndex; i++) {
      const point = points2[i];
      const price = point._internal_price;
      if (isNaN(price)) {
        continue;
      }
      let logical = price;
      if (transformFn !== null) {
        logical = transformFn(point._internal_price, baseValue);
      }
      const invCoordinate = bh + hmm * (logical - min2);
      const coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
      point._internal_y = coordinate;
    }
  }
  _internal_barPricesToCoordinates(pricesList, baseValue, visibleRange) {
    this._private__makeSureItIsValid();
    const bh = this._private__bottomMarginPx();
    const range = ensureNotNull(this._internal_priceRange());
    const min2 = range._internal_minValue();
    const max = range._internal_maxValue();
    const ih = this._internal_internalHeight() - 1;
    const isInverted = this._internal_isInverted();
    const hmm = ih / (max - min2);
    const fromIndex = visibleRange === void 0 ? 0 : visibleRange.from;
    const toIndex = visibleRange === void 0 ? pricesList.length : visibleRange.to;
    const transformFn = this._private__getCoordinateTransformer();
    for (let i = fromIndex; i < toIndex; i++) {
      const bar = pricesList[i];
      let openLogical = bar._internal_open;
      let highLogical = bar._internal_high;
      let lowLogical = bar._internal_low;
      let closeLogical = bar._internal_close;
      if (transformFn !== null) {
        openLogical = transformFn(bar._internal_open, baseValue);
        highLogical = transformFn(bar._internal_high, baseValue);
        lowLogical = transformFn(bar._internal_low, baseValue);
        closeLogical = transformFn(bar._internal_close, baseValue);
      }
      let invCoordinate = bh + hmm * (openLogical - min2);
      let coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
      bar._internal_openY = coordinate;
      invCoordinate = bh + hmm * (highLogical - min2);
      coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
      bar._internal_highY = coordinate;
      invCoordinate = bh + hmm * (lowLogical - min2);
      coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
      bar._internal_lowY = coordinate;
      invCoordinate = bh + hmm * (closeLogical - min2);
      coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
      bar._internal_closeY = coordinate;
    }
  }
  _internal_coordinateToPrice(coordinate, baseValue) {
    const logical = this._private__coordinateToLogical(coordinate, baseValue);
    return this._internal_logicalToPrice(logical, baseValue);
  }
  _internal_logicalToPrice(logical, baseValue) {
    let value = logical;
    if (this._internal_isPercentage()) {
      value = fromPercent(value, baseValue);
    } else if (this._internal_isIndexedTo100()) {
      value = fromIndexedTo100(value, baseValue);
    }
    return value;
  }
  _internal_dataSources() {
    return this._private__dataSources;
  }
  _internal_orderedSources() {
    if (!this._private__cachedOrderedSources) {
      this._private__cachedOrderedSources = sortSources(this._private__dataSources);
    }
    return this._private__cachedOrderedSources;
  }
  _internal_addDataSource(source) {
    if (this._private__dataSources.indexOf(source) !== -1) {
      return;
    }
    this._private__dataSources.push(source);
    this._internal_updateFormatter();
    this._internal_invalidateSourcesCache();
  }
  _internal_removeDataSource(source) {
    const index = this._private__dataSources.indexOf(source);
    if (index === -1) {
      throw new Error("source is not attached to scale");
    }
    this._private__dataSources.splice(index, 1);
    if (this._private__dataSources.length === 0) {
      this._internal_setMode({
        _internal_autoScale: true
      });
      this._internal_setPriceRange(null);
    }
    this._internal_updateFormatter();
    this._internal_invalidateSourcesCache();
  }
  _internal_firstValue() {
    let result = null;
    for (const source of this._private__dataSources) {
      const firstValue = source._internal_firstValue();
      if (firstValue === null) {
        continue;
      }
      if (result === null || firstValue._internal_timePoint < result._internal_timePoint) {
        result = firstValue;
      }
    }
    return result === null ? null : result._internal_value;
  }
  _internal_isInverted() {
    return this._private__options.invertScale;
  }
  _internal_marks() {
    const firstValueIsNull = this._internal_firstValue() === null;
    if (this._private__marksCache !== null && (firstValueIsNull || this._private__marksCache._internal_firstValueIsNull === firstValueIsNull)) {
      return this._private__marksCache._internal_marks;
    }
    this._private__markBuilder._internal_rebuildTickMarks();
    const marks = this._private__markBuilder._internal_marks();
    this._private__marksCache = { _internal_marks: marks, _internal_firstValueIsNull: firstValueIsNull };
    this._private__onMarksChanged._internal_fire();
    return marks;
  }
  _internal_onMarksChanged() {
    return this._private__onMarksChanged;
  }
  _internal_startScale(x) {
    if (this._internal_isPercentage() || this._internal_isIndexedTo100()) {
      return;
    }
    if (this._private__scaleStartPoint !== null || this._private__priceRangeSnapshot !== null) {
      return;
    }
    if (this._internal_isEmpty()) {
      return;
    }
    this._private__scaleStartPoint = this._private__height - x;
    this._private__priceRangeSnapshot = ensureNotNull(this._internal_priceRange())._internal_clone();
  }
  _internal_scaleTo(x) {
    if (this._internal_isPercentage() || this._internal_isIndexedTo100()) {
      return;
    }
    if (this._private__scaleStartPoint === null) {
      return;
    }
    this._internal_setMode({
      _internal_autoScale: false
    });
    x = this._private__height - x;
    if (x < 0) {
      x = 0;
    }
    let scaleCoeff = (this._private__scaleStartPoint + (this._private__height - 1) * 0.2) / (x + (this._private__height - 1) * 0.2);
    const newPriceRange = ensureNotNull(this._private__priceRangeSnapshot)._internal_clone();
    scaleCoeff = Math.max(scaleCoeff, 0.1);
    newPriceRange._internal_scaleAroundCenter(scaleCoeff);
    this._internal_setPriceRange(newPriceRange);
  }
  _internal_endScale() {
    if (this._internal_isPercentage() || this._internal_isIndexedTo100()) {
      return;
    }
    this._private__scaleStartPoint = null;
    this._private__priceRangeSnapshot = null;
  }
  _internal_startScroll(x) {
    if (this._internal_isAutoScale()) {
      return;
    }
    if (this._private__scrollStartPoint !== null || this._private__priceRangeSnapshot !== null) {
      return;
    }
    if (this._internal_isEmpty()) {
      return;
    }
    this._private__scrollStartPoint = x;
    this._private__priceRangeSnapshot = ensureNotNull(this._internal_priceRange())._internal_clone();
  }
  _internal_scrollTo(x) {
    if (this._internal_isAutoScale()) {
      return;
    }
    if (this._private__scrollStartPoint === null) {
      return;
    }
    const priceUnitsPerPixel = ensureNotNull(this._internal_priceRange())._internal_length() / (this._internal_internalHeight() - 1);
    let pixelDelta = x - this._private__scrollStartPoint;
    if (this._internal_isInverted()) {
      pixelDelta *= -1;
    }
    const priceDelta = pixelDelta * priceUnitsPerPixel;
    const newPriceRange = ensureNotNull(this._private__priceRangeSnapshot)._internal_clone();
    newPriceRange._internal_shift(priceDelta);
    this._internal_setPriceRange(newPriceRange, true);
    this._private__marksCache = null;
  }
  _internal_endScroll() {
    if (this._internal_isAutoScale()) {
      return;
    }
    if (this._private__scrollStartPoint === null) {
      return;
    }
    this._private__scrollStartPoint = null;
    this._private__priceRangeSnapshot = null;
  }
  _internal_formatter() {
    if (!this._private__formatter) {
      this._internal_updateFormatter();
    }
    return this._private__formatter;
  }
  _internal_formatPrice(price, firstValue) {
    switch (this._private__options.mode) {
      case 2:
        return this._private__formatPercentage(toPercent(price, firstValue));
      case 3:
        return this._internal_formatter().format(toIndexedTo100(price, firstValue));
      default:
        return this._private__formatPrice(price);
    }
  }
  _internal_formatLogical(logical) {
    switch (this._private__options.mode) {
      case 2:
        return this._private__formatPercentage(logical);
      case 3:
        return this._internal_formatter().format(logical);
      default:
        return this._private__formatPrice(logical);
    }
  }
  _internal_formatLogicalTickmarks(logicals) {
    switch (this._private__options.mode) {
      case 2:
        return this._private__formatPercentageTickmarks(logicals);
      case 3:
        return this._internal_formatter().formatTickmarks(logicals);
      default:
        return this._private__formatTickmarks(logicals);
    }
  }
  _internal_formatPriceAbsolute(price) {
    return this._private__formatPrice(price, ensureNotNull(this._private__formatterSource)._internal_formatter());
  }
  _internal_formatPricePercentage(price, baseValue) {
    price = toPercent(price, baseValue);
    return this._private__formatPercentage(price, percentageFormatter);
  }
  _internal_sourcesForAutoScale() {
    return this._private__dataSources;
  }
  _internal_recalculatePriceRange(visibleBars) {
    this._private__invalidatedForRange = {
      _internal_visibleBars: visibleBars,
      _internal_isValid: false
    };
  }
  _internal_updateAllViews() {
    this._private__dataSources.forEach((s) => s._internal_updateAllViews());
  }
  _internal_hasVisibleEdgeMarks() {
    return this._private__options.ensureEdgeTickMarksVisible && this._internal_isAutoScale();
  }
  _internal_getEdgeMarksPadding() {
    return this._internal_fontSize() / 2;
  }
  _internal_updateFormatter() {
    this._private__marksCache = null;
    let zOrder = Infinity;
    this._private__formatterSource = null;
    for (const source of this._private__dataSources) {
      if (source._internal_zorder() < zOrder) {
        zOrder = source._internal_zorder();
        this._private__formatterSource = source;
      }
    }
    let base = 100;
    if (this._private__formatterSource !== null) {
      base = Math.round(this._private__formatterSource._internal_base());
    }
    this._private__formatter = defaultPriceFormatter;
    if (this._internal_isPercentage()) {
      this._private__formatter = percentageFormatter;
      base = 100;
    } else if (this._internal_isIndexedTo100()) {
      this._private__formatter = new PriceFormatter(100, 1);
      base = 100;
    } else {
      if (this._private__formatterSource !== null) {
        this._private__formatter = this._private__formatterSource._internal_formatter();
      }
    }
    this._private__markBuilder = new PriceTickMarkBuilder(this, base, this._private__coordinateToLogical.bind(this), this._private__logicalToCoordinate.bind(this));
    this._private__markBuilder._internal_rebuildTickMarks();
  }
  _internal_invalidateSourcesCache() {
    this._private__cachedOrderedSources = null;
  }
  _internal_minMove() {
    return this._private__formatterSource === null || this._internal_isPercentage() || this._internal_isIndexedTo100() ? 1 : 1 / this._private__formatterSource._internal_base();
  }
  _internal_colorParser() {
    return this._private__colorParser;
  }
  _private__toggleCustomPriceRange(v) {
    this._private__isCustomPriceRange = v;
  }
  _private__topMarginPx() {
    return this._internal_isInverted() ? this._private__options.scaleMargins.bottom * this._internal_height() + this._private__marginBelow : this._private__options.scaleMargins.top * this._internal_height() + this._private__marginAbove;
  }
  _private__bottomMarginPx() {
    return this._internal_isInverted() ? this._private__options.scaleMargins.top * this._internal_height() + this._private__marginAbove : this._private__options.scaleMargins.bottom * this._internal_height() + this._private__marginBelow;
  }
  _private__makeSureItIsValid() {
    if (!this._private__invalidatedForRange._internal_isValid) {
      this._private__invalidatedForRange._internal_isValid = true;
      this._private__recalculatePriceRangeImpl();
    }
  }
  _private__invalidateInternalHeightCache() {
    this._private__internalHeightCache = null;
  }
  _private__logicalToCoordinate(logical, baseValue) {
    this._private__makeSureItIsValid();
    if (this._internal_isEmpty()) {
      return 0;
    }
    logical = this._internal_isLog() && logical ? toLog(logical, this._private__logFormula) : logical;
    const range = ensureNotNull(this._internal_priceRange());
    const invCoordinate = this._private__bottomMarginPx() + (this._internal_internalHeight() - 1) * (logical - range._internal_minValue()) / range._internal_length();
    const coordinate = this._internal_invertedCoordinate(invCoordinate);
    return coordinate;
  }
  _private__coordinateToLogical(coordinate, baseValue) {
    this._private__makeSureItIsValid();
    if (this._internal_isEmpty()) {
      return 0;
    }
    const invCoordinate = this._internal_invertedCoordinate(coordinate);
    const range = ensureNotNull(this._internal_priceRange());
    const logical = range._internal_minValue() + range._internal_length() * ((invCoordinate - this._private__bottomMarginPx()) / (this._internal_internalHeight() - 1));
    return this._internal_isLog() ? fromLog(logical, this._private__logFormula) : logical;
  }
  _private__onIsInvertedChanged() {
    this._private__marksCache = null;
    this._private__markBuilder._internal_rebuildTickMarks();
  }
  // eslint-disable-next-line complexity
  _private__recalculatePriceRangeImpl() {
    if (this._internal_isCustomPriceRange() && !this._internal_isAutoScale()) {
      return;
    }
    const visibleBars = this._private__invalidatedForRange._internal_visibleBars;
    if (visibleBars === null) {
      return;
    }
    let priceRange = null;
    const sources = this._internal_sourcesForAutoScale();
    let marginAbove = 0;
    let marginBelow = 0;
    for (const source of sources) {
      if (!source._internal_visible()) {
        continue;
      }
      const firstValue = source._internal_firstValue();
      if (firstValue === null) {
        continue;
      }
      const autoScaleInfo = source._internal_autoscaleInfo(visibleBars._internal_left(), visibleBars._internal_right());
      let sourceRange = autoScaleInfo && autoScaleInfo._internal_priceRange();
      if (sourceRange !== null) {
        switch (this._private__options.mode) {
          case 1:
            sourceRange = convertPriceRangeToLog(sourceRange, this._private__logFormula);
            break;
          case 2:
            sourceRange = toPercentRange(sourceRange, firstValue._internal_value);
            break;
          case 3:
            sourceRange = toIndexedTo100Range(sourceRange, firstValue._internal_value);
            break;
        }
        if (priceRange === null) {
          priceRange = sourceRange;
        } else {
          priceRange = priceRange._internal_merge(ensureNotNull(sourceRange));
        }
        if (autoScaleInfo !== null) {
          const margins = autoScaleInfo._internal_margins();
          if (margins !== null) {
            marginAbove = Math.max(marginAbove, margins.above);
            marginBelow = Math.max(marginBelow, margins.below);
          }
        }
      }
    }
    if (this._internal_hasVisibleEdgeMarks()) {
      marginAbove = Math.max(marginAbove, this._internal_getEdgeMarksPadding());
      marginBelow = Math.max(marginBelow, this._internal_getEdgeMarksPadding());
    }
    if (marginAbove !== this._private__marginAbove || marginBelow !== this._private__marginBelow) {
      this._private__marginAbove = marginAbove;
      this._private__marginBelow = marginBelow;
      this._private__marksCache = null;
      this._private__invalidateInternalHeightCache();
    }
    if (priceRange !== null) {
      if (priceRange._internal_minValue() === priceRange._internal_maxValue()) {
        const extendValue = 5 * this._internal_minMove();
        if (this._internal_isLog()) {
          priceRange = convertPriceRangeFromLog(priceRange, this._private__logFormula);
        }
        priceRange = new PriceRangeImpl(priceRange._internal_minValue() - extendValue, priceRange._internal_maxValue() + extendValue);
        if (this._internal_isLog()) {
          priceRange = convertPriceRangeToLog(priceRange, this._private__logFormula);
        }
      }
      if (this._internal_isLog()) {
        const rawRange = convertPriceRangeFromLog(priceRange, this._private__logFormula);
        const newLogFormula = logFormulaForPriceRange(rawRange);
        if (!logFormulasAreSame(newLogFormula, this._private__logFormula)) {
          const rawSnapshot = this._private__priceRangeSnapshot !== null ? convertPriceRangeFromLog(this._private__priceRangeSnapshot, this._private__logFormula) : null;
          this._private__logFormula = newLogFormula;
          priceRange = convertPriceRangeToLog(rawRange, newLogFormula);
          if (rawSnapshot !== null) {
            this._private__priceRangeSnapshot = convertPriceRangeToLog(rawSnapshot, newLogFormula);
          }
        }
      }
      this._internal_setPriceRange(priceRange);
    } else {
      if (this._private__priceRange === null) {
        this._internal_setPriceRange(new PriceRangeImpl(-0.5, 0.5));
        this._private__logFormula = logFormulaForPriceRange(null);
      }
    }
  }
  _private__getCoordinateTransformer() {
    if (this._internal_isPercentage()) {
      return toPercent;
    } else if (this._internal_isIndexedTo100()) {
      return toIndexedTo100;
    } else if (this._internal_isLog()) {
      return (price) => toLog(price, this._private__logFormula);
    }
    return null;
  }
  _private__formatValue(value, formatter, fallbackFormatter) {
    if (formatter === void 0) {
      if (fallbackFormatter === void 0) {
        fallbackFormatter = this._internal_formatter();
      }
      return fallbackFormatter.format(value);
    }
    return formatter(value);
  }
  _private__formatValues(values, formatter, fallbackFormatter) {
    if (formatter === void 0) {
      if (fallbackFormatter === void 0) {
        fallbackFormatter = this._internal_formatter();
      }
      return fallbackFormatter.formatTickmarks(values);
    }
    return formatter(values);
  }
  _private__formatPrice(price, fallbackFormatter) {
    return this._private__formatValue(price, this._private__localizationOptions.priceFormatter, fallbackFormatter);
  }
  _private__formatTickmarks(prices, fallbackFormatter) {
    const priceFormatter = this._private__localizationOptions.priceFormatter;
    return this._private__formatValues(prices, this._private__localizationOptions.tickmarksPriceFormatter ?? (priceFormatter ? (values) => values.map(priceFormatter) : void 0), fallbackFormatter);
  }
  _private__formatPercentage(percentage, fallbackFormatter) {
    return this._private__formatValue(percentage, this._private__localizationOptions.percentageFormatter, fallbackFormatter);
  }
  _private__formatPercentageTickmarks(percentages, fallbackFormatter) {
    const tickmarksPercentageFormatter = this._private__localizationOptions.percentageFormatter;
    return this._private__formatValues(percentages, this._private__localizationOptions.tickmarksPercentageFormatter ?? (tickmarksPercentageFormatter ? (values) => values.map(tickmarksPercentageFormatter) : void 0), fallbackFormatter);
  }
};
function isSeries(source) {
  return source instanceof Series;
}
var DEFAULT_STRETCH_FACTOR = 1;
var MIN_PANE_HEIGHT = 30;
var Pane = class {
  constructor(timeScale, model) {
    this._private__dataSources = [];
    this._private__overlaySourcesByScaleId = /* @__PURE__ */ new Map();
    this._private__height = 0;
    this._private__width = 0;
    this._private__stretchFactor = DEFAULT_STRETCH_FACTOR;
    this._private__cachedOrderedSources = null;
    this._private__cachedOrderedSourcesForRendering = null;
    this._private__preserveEmptyPane = false;
    this._private__destroyed = new Delegate();
    this._private__primitives = [];
    this._private__timeScale = timeScale;
    this._private__model = model;
    this._private__grid = new Grid(this);
    const options = model._internal_options();
    this._private__leftPriceScale = this._private__createPriceScale("left", options.leftPriceScale);
    this._private__rightPriceScale = this._private__createPriceScale("right", options.rightPriceScale);
    this._private__leftPriceScale._internal_modeChanged()._internal_subscribe(this._private__onPriceScaleModeChanged.bind(this, this._private__leftPriceScale), this);
    this._private__rightPriceScale._internal_modeChanged()._internal_subscribe(this._private__onPriceScaleModeChanged.bind(this, this._private__rightPriceScale), this);
    this._internal_applyScaleOptions(options);
  }
  _internal_applyScaleOptions(options) {
    if (options.leftPriceScale) {
      this._private__leftPriceScale._internal_applyOptions(options.leftPriceScale);
    }
    if (options.rightPriceScale) {
      this._private__rightPriceScale._internal_applyOptions(options.rightPriceScale);
    }
    if (options.localization) {
      this._private__leftPriceScale._internal_updateFormatter();
      this._private__rightPriceScale._internal_updateFormatter();
    }
    if (options.overlayPriceScales) {
      const sourceArrays = Array.from(this._private__overlaySourcesByScaleId.values());
      for (const arr of sourceArrays) {
        const priceScale = ensureNotNull(arr[0]._internal_priceScale());
        priceScale._internal_applyOptions(options.overlayPriceScales);
        if (options.localization) {
          priceScale._internal_updateFormatter();
        }
      }
    }
  }
  _internal_priceScaleById(id) {
    switch (id) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      case "left": {
        return this._private__leftPriceScale;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      case "right": {
        return this._private__rightPriceScale;
      }
    }
    if (this._private__overlaySourcesByScaleId.has(id)) {
      return ensureDefined(this._private__overlaySourcesByScaleId.get(id))[0]._internal_priceScale();
    }
    return null;
  }
  _internal_destroy() {
    this._internal_model()._internal_priceScalesOptionsChanged()._internal_unsubscribeAll(this);
    this._private__leftPriceScale._internal_modeChanged()._internal_unsubscribeAll(this);
    this._private__rightPriceScale._internal_modeChanged()._internal_unsubscribeAll(this);
    this._private__dataSources.forEach((source) => {
      if (source._internal_destroy) {
        source._internal_destroy();
      }
    });
    this._private__primitives = this._private__primitives.filter((primitive) => {
      const p = primitive._internal_primitive();
      if (p.detached) {
        p.detached();
      }
      return false;
    });
    this._private__destroyed._internal_fire();
  }
  _internal_stretchFactor() {
    return this._private__stretchFactor;
  }
  _internal_setStretchFactor(factor) {
    this._private__stretchFactor = factor;
  }
  _internal_model() {
    return this._private__model;
  }
  _internal_width() {
    return this._private__width;
  }
  _internal_height() {
    return this._private__height;
  }
  _internal_setWidth(width) {
    this._private__width = width;
    this._internal_updateAllSources();
  }
  _internal_setHeight(height) {
    this._private__height = height;
    this._private__leftPriceScale._internal_setHeight(height);
    this._private__rightPriceScale._internal_setHeight(height);
    this._private__dataSources.forEach((ds) => {
      if (this._internal_isOverlay(ds)) {
        const priceScale = ds._internal_priceScale();
        if (priceScale !== null) {
          priceScale._internal_setHeight(height);
        }
      }
    });
    this._internal_updateAllSources();
  }
  _internal_setPreserveEmptyPane(preserve) {
    this._private__preserveEmptyPane = preserve;
  }
  _internal_preserveEmptyPane() {
    return this._private__preserveEmptyPane;
  }
  _internal_series() {
    return this._private__dataSources.filter(isSeries);
  }
  _internal_dataSources() {
    return this._private__dataSources;
  }
  _internal_isOverlay(source) {
    const priceScale = source._internal_priceScale();
    if (priceScale === null) {
      return true;
    }
    return this._private__leftPriceScale !== priceScale && this._private__rightPriceScale !== priceScale;
  }
  _internal_addDataSource(source, targetScaleId, keepSourcesOrder) {
    this._private__insertDataSource(source, targetScaleId, keepSourcesOrder ? source._internal_zorder() : this._private__dataSources.length);
  }
  _internal_removeDataSource(source, keepSourceOrder) {
    const index = this._private__dataSources.indexOf(source);
    assert(index !== -1, "removeDataSource: invalid data source");
    this._private__dataSources.splice(index, 1);
    if (!keepSourceOrder) {
      this._private__dataSources.forEach((ds, i) => ds._internal_setZorder(i));
    }
    const priceScaleId = ensureNotNull(source._internal_priceScale())._internal_id();
    if (this._private__overlaySourcesByScaleId.has(priceScaleId)) {
      const overlaySources = ensureDefined(this._private__overlaySourcesByScaleId.get(priceScaleId));
      const overlayIndex = overlaySources.indexOf(source);
      if (overlayIndex !== -1) {
        overlaySources.splice(overlayIndex, 1);
        if (overlaySources.length === 0) {
          this._private__overlaySourcesByScaleId.delete(priceScaleId);
        }
      }
    }
    const priceScale = source._internal_priceScale();
    if (priceScale && priceScale._internal_dataSources().indexOf(source) >= 0) {
      priceScale._internal_removeDataSource(source);
      this._internal_recalculatePriceScale(priceScale);
    }
    this._private__invalidateSourceCaches();
  }
  _internal_priceScalePosition(priceScale) {
    if (priceScale === this._private__leftPriceScale) {
      return "left";
    }
    if (priceScale === this._private__rightPriceScale) {
      return "right";
    }
    return "overlay";
  }
  _internal_leftPriceScale() {
    return this._private__leftPriceScale;
  }
  _internal_rightPriceScale() {
    return this._private__rightPriceScale;
  }
  _internal_startScalePrice(priceScale, x) {
    priceScale._internal_startScale(x);
  }
  _internal_scalePriceTo(priceScale, x) {
    priceScale._internal_scaleTo(x);
    this._internal_updateAllSources();
  }
  _internal_endScalePrice(priceScale) {
    priceScale._internal_endScale();
  }
  _internal_startScrollPrice(priceScale, x) {
    priceScale._internal_startScroll(x);
  }
  _internal_scrollPriceTo(priceScale, x) {
    priceScale._internal_scrollTo(x);
    this._internal_updateAllSources();
  }
  _internal_endScrollPrice(priceScale) {
    priceScale._internal_endScroll();
  }
  _internal_updateAllSources() {
    this._private__dataSources.forEach((source) => {
      source._internal_updateAllViews();
    });
  }
  _internal_defaultPriceScale() {
    const [primaryPriceScale, secondaryPriceScale] = this._private__defaultPriceScalePair();
    let priceScale = null;
    if (primaryPriceScale._internal_options().visible && primaryPriceScale._internal_dataSources().length !== 0) {
      priceScale = primaryPriceScale;
    } else if (secondaryPriceScale._internal_options().visible && secondaryPriceScale._internal_dataSources().length !== 0) {
      priceScale = secondaryPriceScale;
    } else if (this._private__dataSources.length !== 0) {
      priceScale = this._private__dataSources[0]._internal_priceScale();
    }
    if (priceScale === null) {
      priceScale = this._internal_defaultVisiblePriceScale() ?? primaryPriceScale;
    }
    return priceScale;
  }
  _internal_defaultVisiblePriceScale() {
    const [primaryPriceScale, secondaryPriceScale] = this._private__defaultPriceScalePair();
    if (primaryPriceScale._internal_options().visible) {
      return primaryPriceScale;
    }
    if (secondaryPriceScale._internal_options().visible) {
      return secondaryPriceScale;
    }
    return null;
  }
  _internal_recalculatePriceScale(priceScale) {
    if (priceScale === null || !priceScale._internal_isAutoScale()) {
      return;
    }
    this._private__recalculatePriceScaleImpl(priceScale);
  }
  _internal_resetPriceScale(priceScale) {
    const visibleBars = this._private__timeScale._internal_visibleStrictRange();
    priceScale._internal_setMode({ _internal_autoScale: true });
    if (visibleBars !== null) {
      priceScale._internal_recalculatePriceRange(visibleBars);
    }
    this._internal_updateAllSources();
  }
  _internal_momentaryAutoScale() {
    this._private__recalculatePriceScaleImpl(this._private__leftPriceScale);
    this._private__recalculatePriceScaleImpl(this._private__rightPriceScale);
  }
  _internal_recalculate() {
    this._internal_recalculatePriceScale(this._private__leftPriceScale);
    this._internal_recalculatePriceScale(this._private__rightPriceScale);
    this._private__dataSources.forEach((ds) => {
      if (this._internal_isOverlay(ds)) {
        this._internal_recalculatePriceScale(ds._internal_priceScale());
      }
    });
    this._internal_updateAllSources();
    this._private__model._internal_lightUpdate();
  }
  _internal_orderedSources() {
    if (this._private__cachedOrderedSources === null) {
      this._private__cachedOrderedSources = sortSources(this._private__dataSources);
    }
    return this._private__cachedOrderedSources;
  }
  _internal_orderedSourcesForRendering() {
    const base = this._internal_orderedSources();
    const hovered = this._private__model._internal_hoveredSource()?._internal_source;
    const enabled = this._private__model._internal_options().hoveredSeriesOnTop;
    const cached = this._private__cachedOrderedSourcesForRendering;
    if (cached !== null && cached._internal_base === base && cached._internal_hovered === hovered && cached._internal_enabled === enabled) {
      return cached._internal_result;
    }
    const result = hoveredSourceOnTopOrder(base, hovered, enabled);
    this._private__cachedOrderedSourcesForRendering = {
      _internal_base: base,
      _internal_hovered: hovered,
      _internal_enabled: enabled,
      _internal_result: result
    };
    return result;
  }
  _internal_setSeriesOrder(series, order) {
    order = clamp(order, 0, this._private__dataSources.length - 1);
    const index = this._private__dataSources.indexOf(series);
    assert(index !== -1, "setSeriesOrder: invalid data source");
    this._private__dataSources.splice(index, 1);
    this._private__dataSources.splice(order, 0, series);
    this._private__dataSources.forEach((ps, i) => ps._internal_setZorder(i));
    this._private__invalidateSourceCaches();
    for (const ps of [this._private__leftPriceScale, this._private__rightPriceScale]) {
      ps._internal_invalidateSourcesCache();
      ps._internal_updateFormatter();
    }
    this._private__model._internal_lightUpdate();
  }
  _internal_orderedSeries() {
    return this._internal_orderedSources().filter(isSeries);
  }
  _internal_onDestroyed() {
    return this._private__destroyed;
  }
  _internal_grid() {
    return this._private__grid;
  }
  _internal_attachPrimitive(primitive) {
    this._private__primitives.push(new PanePrimitiveWrapper$1(primitive));
  }
  _internal_detachPrimitive(source) {
    this._private__primitives = this._private__primitives.filter((wrapper) => wrapper._internal_primitive() !== source);
    if (source.detached) {
      source.detached();
    }
    this._private__model._internal_lightUpdate();
  }
  _internal_primitives() {
    return this._private__primitives;
  }
  _internal_primitiveHitTest(x, y) {
    return this._private__primitives.map((primitive) => primitive._internal_hitTest(x, y)).filter((result) => result !== null);
  }
  _private__recalculatePriceScaleImpl(priceScale) {
    const sourceForAutoScale = priceScale._internal_sourcesForAutoScale();
    if (sourceForAutoScale && sourceForAutoScale.length > 0 && !this._private__timeScale._internal_isEmpty()) {
      const visibleBars = this._private__timeScale._internal_visibleStrictRange();
      if (visibleBars !== null) {
        priceScale._internal_recalculatePriceRange(visibleBars);
      }
    }
    priceScale._internal_updateAllViews();
  }
  _private__insertDataSource(source, priceScaleId, order) {
    let priceScale = this._internal_priceScaleById(priceScaleId);
    if (priceScale === null) {
      priceScale = this._private__createPriceScale(priceScaleId, this._private__model._internal_options().overlayPriceScales);
    }
    this._private__dataSources.splice(order, 0, source);
    if (!isDefaultPriceScale(priceScaleId)) {
      const overlaySources = this._private__overlaySourcesByScaleId.get(priceScaleId) || [];
      overlaySources.push(source);
      this._private__overlaySourcesByScaleId.set(priceScaleId, overlaySources);
    }
    source._internal_setZorder(order);
    priceScale._internal_addDataSource(source);
    source._internal_setPriceScale(priceScale);
    this._internal_recalculatePriceScale(priceScale);
    this._private__invalidateSourceCaches();
  }
  _private__invalidateSourceCaches() {
    this._private__cachedOrderedSources = null;
    this._private__cachedOrderedSourcesForRendering = null;
  }
  _private__defaultPriceScalePair() {
    return this._private__model._internal_options().defaultVisiblePriceScaleId === "left" ? [this._private__leftPriceScale, this._private__rightPriceScale] : [this._private__rightPriceScale, this._private__leftPriceScale];
  }
  _private__onPriceScaleModeChanged(priceScale, oldMode, newMode) {
    if (oldMode._internal_mode === newMode._internal_mode) {
      return;
    }
    this._private__recalculatePriceScaleImpl(priceScale);
  }
  _private__createPriceScale(id, options) {
    const actualOptions = { visible: true, autoScale: true, ...clone(options) };
    const priceScale = new PriceScale(id, actualOptions, this._private__model._internal_options()["layout"], this._private__model._internal_options().localization, this._private__model._internal_colorParser());
    priceScale._internal_setHeight(this._internal_height());
    return priceScale;
  }
};
function isBetterHit(candidate, currentBest) {
  if (currentBest === null) {
    return true;
  }
  if (candidate._internal_priority === 2 && currentBest._internal_priority !== 2) {
    return true;
  }
  if (currentBest._internal_priority === 2 && candidate._internal_priority !== 2) {
    return false;
  }
  if (candidate._internal_distance !== currentBest._internal_distance) {
    return candidate._internal_distance < currentBest._internal_distance;
  }
  return false;
}
function hoveredObjectFromCandidate(candidate) {
  return {
    _internal_externalId: candidate._internal_externalId,
    _internal_hitTestData: candidate._internal_hitTestData
  };
}
function comparePrimitiveZOrder(item, reference) {
  return !reference || item === "top" && reference !== "top" || item === "normal" && reference === "bottom";
}
function primitiveHitCandidate(hitResult) {
  return {
    _internal_distance: hitResult.distance ?? 0,
    _internal_priority: hitResult.hitTestPriority ?? (hitResult.itemType === "marker" ? 2 : 0),
    _internal_itemType: hitResult.itemType ?? "primitive",
    _internal_cursorStyle: hitResult.cursorStyle,
    _internal_externalId: hitResult.externalId
  };
}
function findBestPrimitiveHitTest(sources, x, y) {
  let bestPrimitiveHit;
  let bestPrimitiveCandidate;
  let bestHitSource;
  for (const source of sources) {
    const primitiveHitResults = source._internal_primitiveHitTest?.(x, y) ?? [];
    for (const hitResult of primitiveHitResults) {
      const candidate = primitiveHitCandidate(hitResult);
      if (comparePrimitiveZOrder(hitResult.zOrder, bestPrimitiveHit?.zOrder) || hitResult.zOrder === bestPrimitiveHit?.zOrder && bestPrimitiveCandidate !== void 0 && isBetterHit(candidate, bestPrimitiveCandidate) || hitResult.zOrder === bestPrimitiveHit?.zOrder && bestPrimitiveCandidate === void 0) {
        bestPrimitiveHit = hitResult;
        bestPrimitiveCandidate = candidate;
        bestHitSource = source;
      }
    }
  }
  if (!bestPrimitiveHit || !bestHitSource || !bestPrimitiveCandidate) {
    return null;
  }
  return {
    _internal_candidate: bestPrimitiveCandidate,
    _internal_hit: bestPrimitiveHit,
    _internal_source: bestHitSource
  };
}
function convertPrimitiveHitResult(primitiveHit) {
  return {
    _internal_source: primitiveHit._internal_source,
    _internal_object: hoveredObjectFromCandidate(primitiveHit._internal_candidate),
    _internal_cursorStyle: primitiveHit._internal_candidate._internal_cursorStyle,
    _internal_itemType: primitiveHit._internal_candidate._internal_itemType ?? "primitive"
  };
}
function hitTestPaneView(paneViews, x, y, pane) {
  let bestResult = null;
  for (const paneView of paneViews) {
    let candidate = paneView._internal_hitTest?.(x, y, pane) ?? null;
    if (candidate === null) {
      const renderer = paneView._internal_renderer(pane);
      candidate = renderer !== null && renderer._internal_hitTest ? renderer._internal_hitTest(x, y) : null;
    }
    if (candidate !== null) {
      const candidateResult = {
        _internal_view: paneView,
        _internal_candidate: candidate
      };
      if (bestResult === null || isBetterHit(candidateResult._internal_candidate, bestResult._internal_candidate)) {
        bestResult = candidateResult;
      }
    }
  }
  return bestResult;
}
function isDataSource(source) {
  return source._internal_paneViews !== void 0;
}
function hitTestPane(pane, x, y) {
  const sources = [pane, ...pane._internal_orderedSources()].reverse();
  const bestPrimitiveHit = findBestPrimitiveHitTest(sources, x, y);
  if (bestPrimitiveHit?._internal_hit.zOrder === "top") {
    return convertPrimitiveHitResult(bestPrimitiveHit);
  }
  let bestSourceHit = null;
  let bestSourceCandidate = null;
  for (const source of sources) {
    if (bestPrimitiveHit && bestPrimitiveHit._internal_source === source && bestPrimitiveHit._internal_hit.zOrder !== "bottom" && !bestPrimitiveHit._internal_hit.isBackground) {
      return bestSourceHit ?? convertPrimitiveHitResult(bestPrimitiveHit);
    }
    if (isDataSource(source)) {
      const sourceResult = hitTestPaneView(source._internal_paneViews(pane), x, y, pane);
      if (sourceResult !== null) {
        const candidateHit = {
          _internal_source: source,
          _internal_view: sourceResult._internal_view,
          _internal_object: hoveredObjectFromCandidate(sourceResult._internal_candidate),
          _internal_cursorStyle: sourceResult._internal_candidate._internal_cursorStyle,
          _internal_itemType: sourceResult._internal_candidate._internal_itemType ?? "primitive"
        };
        if (bestSourceHit === null || isBetterHit(sourceResult._internal_candidate, bestSourceCandidate)) {
          bestSourceHit = candidateHit;
          bestSourceCandidate = sourceResult._internal_candidate;
        }
      }
    }
    if (bestPrimitiveHit && bestPrimitiveHit._internal_source === source && bestPrimitiveHit._internal_hit.zOrder !== "bottom" && bestPrimitiveHit._internal_hit.isBackground) {
      return bestSourceHit ?? convertPrimitiveHitResult(bestPrimitiveHit);
    }
  }
  if (bestSourceHit !== null) {
    return bestSourceHit;
  }
  if (bestPrimitiveHit?._internal_hit) {
    return convertPrimitiveHitResult(bestPrimitiveHit);
  }
  return null;
}
var FormattedLabelsCache = class {
  constructor(format, horzScaleBehavior, size3 = 50) {
    this._private__actualSize = 0;
    this._private__usageTick = 1;
    this._private__oldestTick = 1;
    this._private__cache = /* @__PURE__ */ new Map();
    this._private__tick2Labels = /* @__PURE__ */ new Map();
    this._private__format = format;
    this._private__horzScaleBehavior = horzScaleBehavior;
    this._private__maxSize = size3;
  }
  _internal_format(tickMark) {
    const time = tickMark.time;
    const cacheKey = this._private__horzScaleBehavior.cacheKey(time);
    const tick = this._private__cache.get(cacheKey);
    if (tick !== void 0) {
      return tick._internal_string;
    }
    if (this._private__actualSize === this._private__maxSize) {
      const oldestValue = this._private__tick2Labels.get(this._private__oldestTick);
      this._private__tick2Labels.delete(this._private__oldestTick);
      this._private__cache.delete(ensureDefined(oldestValue));
      this._private__oldestTick++;
      this._private__actualSize--;
    }
    const str = this._private__format(tickMark);
    this._private__cache.set(cacheKey, { _internal_string: str, _internal_tick: this._private__usageTick });
    this._private__tick2Labels.set(this._private__usageTick, cacheKey);
    this._private__actualSize++;
    this._private__usageTick++;
    return str;
  }
};
var RangeImpl = class {
  constructor(left, right) {
    assert(left <= right, "right should be >= left");
    this._private__left = left;
    this._private__right = right;
  }
  _internal_left() {
    return this._private__left;
  }
  _internal_right() {
    return this._private__right;
  }
  _internal_count() {
    return this._private__right - this._private__left + 1;
  }
  _internal_contains(index) {
    return this._private__left <= index && index <= this._private__right;
  }
  _internal_equals(other) {
    return this._private__left === other._internal_left() && this._private__right === other._internal_right();
  }
};
function areRangesEqual(first, second) {
  if (first === null || second === null) {
    return first === second;
  }
  return first._internal_equals(second);
}
var TickMarks = class {
  constructor() {
    this._private__marksByWeight = /* @__PURE__ */ new Map();
    this._private__cache = null;
    this._private__uniformDistribution = false;
  }
  _internal_setUniformDistribution(val) {
    this._private__uniformDistribution = val;
    this._private__cache = null;
  }
  _internal_setTimeScalePoints(newPoints, firstChangedPointIndex) {
    this._private__removeMarksSinceIndex(firstChangedPointIndex);
    this._private__cache = null;
    for (let index = firstChangedPointIndex; index < newPoints.length; ++index) {
      const point = newPoints[index];
      let marksForWeight = this._private__marksByWeight.get(point.timeWeight);
      if (marksForWeight === void 0) {
        marksForWeight = [];
        this._private__marksByWeight.set(point.timeWeight, marksForWeight);
      }
      marksForWeight.push({
        index,
        time: point.time,
        weight: point.timeWeight,
        originalTime: point.originalTime
      });
    }
  }
  _internal_build(spacing, maxWidth, checkIndicesForData, indicesWithDataMap, indicesWithDataId) {
    const maxIndexesPerMark = Math.ceil(maxWidth / spacing);
    if (this._private__cache === null || this._private__cache._internal_maxIndexesPerMark !== maxIndexesPerMark || indicesWithDataId !== this._private__cache._internal_indicesWithDataId || checkIndicesForData !== this._private__cache._internal_checkIndicesForData) {
      this._private__cache = {
        _internal_indicesWithDataId: indicesWithDataId,
        _internal_checkIndicesForData: checkIndicesForData,
        _internal_marks: this._private__buildMarksImpl(maxIndexesPerMark, checkIndicesForData, indicesWithDataMap),
        _internal_maxIndexesPerMark: maxIndexesPerMark
      };
    }
    return this._private__cache._internal_marks;
  }
  _private__removeMarksSinceIndex(sinceIndex) {
    if (sinceIndex === 0) {
      this._private__marksByWeight.clear();
      return;
    }
    const weightsToClear = [];
    this._private__marksByWeight.forEach((marks, timeWeight) => {
      if (sinceIndex <= marks[0].index) {
        weightsToClear.push(timeWeight);
      } else {
        marks.splice(lowerBound(marks, sinceIndex, (tm) => tm.index < sinceIndex), Infinity);
      }
    });
    for (const weight of weightsToClear) {
      this._private__marksByWeight.delete(weight);
    }
  }
  _private__buildMarksImpl(maxIndexesPerMark, checkIndicesForData, indicesWithDataMap) {
    let marks = [];
    const canBeIncluded = (mark) => !checkIndicesForData || indicesWithDataMap.has(mark.index);
    for (const weight of Array.from(this._private__marksByWeight.keys()).sort((a, b) => b - a)) {
      if (!this._private__marksByWeight.get(weight)) {
        continue;
      }
      const prevMarks = marks;
      marks = [];
      const prevMarksLength = prevMarks.length;
      let prevMarksPointer = 0;
      const currentWeight = ensureDefined(this._private__marksByWeight.get(weight));
      const currentWeightLength = currentWeight.length;
      let rightIndex = Infinity;
      let leftIndex = -Infinity;
      for (let i = 0; i < currentWeightLength; i++) {
        const mark = currentWeight[i];
        const currentIndex = mark.index;
        while (prevMarksPointer < prevMarksLength) {
          const lastMark = prevMarks[prevMarksPointer];
          const lastIndex = lastMark.index;
          if (lastIndex < currentIndex && canBeIncluded(lastMark)) {
            prevMarksPointer++;
            marks.push(lastMark);
            leftIndex = lastIndex;
            rightIndex = Infinity;
          } else {
            rightIndex = lastIndex;
            break;
          }
        }
        if (rightIndex - currentIndex >= maxIndexesPerMark && currentIndex - leftIndex >= maxIndexesPerMark && canBeIncluded(mark)) {
          marks.push(mark);
          leftIndex = currentIndex;
        } else {
          if (this._private__uniformDistribution) {
            return prevMarks;
          }
        }
      }
      for (; prevMarksPointer < prevMarksLength; prevMarksPointer++) {
        if (canBeIncluded(prevMarks[prevMarksPointer])) {
          marks.push(prevMarks[prevMarksPointer]);
        }
      }
    }
    return marks;
  }
};
var TimeScaleVisibleRange = class _TimeScaleVisibleRange {
  constructor(logicalRange) {
    this._private__logicalRange = logicalRange;
  }
  _internal_strictRange() {
    if (this._private__logicalRange === null) {
      return null;
    }
    return new RangeImpl(Math.floor(this._private__logicalRange._internal_left()), Math.ceil(this._private__logicalRange._internal_right()));
  }
  _internal_logicalRange() {
    return this._private__logicalRange;
  }
  static _internal_invalid() {
    return new _TimeScaleVisibleRange(null);
  }
};
var defaultTickMarkMaxCharacterLength = 8;
function markWithGreaterWeight$2(a, b) {
  return a.weight > b.weight ? a : b;
}
var TimeScale = class {
  constructor(model, options, localizationOptions, horzScaleBehavior) {
    this._private__width = 0;
    this._private__baseIndexOrNull = null;
    this._private__points = [];
    this._private__scrollStartPoint = null;
    this._private__scaleStartPoint = null;
    this._private__tickMarks = new TickMarks();
    this._private__formattedByWeight = /* @__PURE__ */ new Map();
    this._private__visibleRange = TimeScaleVisibleRange._internal_invalid();
    this._private__visibleRangeInvalidated = true;
    this._private__visibleBarsChanged = new Delegate();
    this._private__logicalRangeChanged = new Delegate();
    this._private__optionsApplied = new Delegate();
    this._private__commonTransitionStartState = null;
    this._private__timeMarksCache = null;
    this._private__indicesWithData = /* @__PURE__ */ new Map();
    this._private__indicesWithDataUpdateId = -1;
    this._private__labels = [];
    this._private__conflationFactor = 1;
    this._private__options = options;
    this._private__localizationOptions = localizationOptions;
    this._private__rightOffset = options.rightOffset;
    this._private__barSpacing = options.barSpacing;
    this._private__model = model;
    this._private__checkRightOffsetPixels(options);
    this._private__horzScaleBehavior = horzScaleBehavior;
    this._private__updateDateTimeFormatter();
    this._private__tickMarks._internal_setUniformDistribution(options.uniformDistribution);
    this._private__updateConflationFactor();
    this._internal_recalculateIndicesWithData();
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_applyLocalizationOptions(localizationOptions) {
    merge(this._private__localizationOptions, localizationOptions);
    this._private__invalidateTickMarks();
    this._private__updateDateTimeFormatter();
  }
  _internal_applyOptions(options, localizationOptions) {
    merge(this._private__options, options);
    if (this._private__options.fixLeftEdge) {
      this._private__doFixLeftEdge();
    }
    if (this._private__options.fixRightEdge) {
      this._private__doFixRightEdge();
    }
    if (options.barSpacing !== void 0) {
      this._private__model._internal_setBarSpacing(options.barSpacing);
    }
    if (options.rightOffset !== void 0) {
      this._private__model._internal_setRightOffset(options.rightOffset);
    }
    this._private__checkRightOffsetPixels(options);
    if (options.minBarSpacing !== void 0 || options.maxBarSpacing !== void 0) {
      this._private__model._internal_setBarSpacing(options.barSpacing ?? this._private__barSpacing);
    }
    if (options.ignoreWhitespaceIndices !== void 0 && options.ignoreWhitespaceIndices !== this._private__options.ignoreWhitespaceIndices) {
      this._internal_recalculateIndicesWithData();
    }
    this._private__invalidateTickMarks();
    this._private__updateDateTimeFormatter();
    if (options.enableConflation !== void 0 || options.conflationThresholdFactor !== void 0) {
      this._private__updateConflationFactor();
    }
    this._private__optionsApplied._internal_fire();
  }
  _internal_indexToTime(index) {
    return this._private__points[index]?.time ?? null;
  }
  _internal_indexToTimeScalePoint(index) {
    return this._private__points[index] ?? null;
  }
  _internal_timeToIndex(time, findNearest) {
    if (this._private__points.length < 1) {
      return null;
    }
    if (this._private__horzScaleBehavior.key(time) > this._private__horzScaleBehavior.key(this._private__points[this._private__points.length - 1].time)) {
      return findNearest ? this._private__points.length - 1 : null;
    }
    const index = lowerBound(this._private__points, this._private__horzScaleBehavior.key(time), (a, b) => this._private__horzScaleBehavior.key(a.time) < b);
    if (this._private__horzScaleBehavior.key(time) < this._private__horzScaleBehavior.key(this._private__points[index].time)) {
      return findNearest ? index : null;
    }
    return index;
  }
  _internal_isEmpty() {
    return this._private__width === 0 || this._private__points.length === 0 || this._private__baseIndexOrNull === null;
  }
  _internal_hasPoints() {
    return this._private__points.length > 0;
  }
  // strict range: integer indices of the bars in the visible range rounded in more wide direction
  _internal_visibleStrictRange() {
    this._private__updateVisibleRange();
    return this._private__visibleRange._internal_strictRange();
  }
  _internal_visibleLogicalRange() {
    this._private__updateVisibleRange();
    return this._private__visibleRange._internal_logicalRange();
  }
  _internal_visibleTimeRange() {
    const visibleBars = this._internal_visibleStrictRange();
    if (visibleBars === null) {
      return null;
    }
    const range = {
      from: visibleBars._internal_left(),
      to: visibleBars._internal_right()
    };
    return this._internal_timeRangeForLogicalRange(range);
  }
  _internal_timeRangeForLogicalRange(range) {
    const from = Math.round(range.from);
    const to = Math.round(range.to);
    const firstIndex = ensureNotNull(this._private__firstIndex());
    const lastIndex = ensureNotNull(this._private__lastIndex());
    return {
      from: ensureNotNull(this._internal_indexToTimeScalePoint(Math.max(firstIndex, from))),
      to: ensureNotNull(this._internal_indexToTimeScalePoint(Math.min(lastIndex, to)))
    };
  }
  _internal_logicalRangeForTimeRange(range) {
    return {
      from: ensureNotNull(this._internal_timeToIndex(range.from, true)),
      to: ensureNotNull(this._internal_timeToIndex(range.to, true))
    };
  }
  _internal_width() {
    return this._private__width;
  }
  _internal_setWidth(newWidth) {
    if (!isFinite(newWidth) || newWidth <= 0) {
      return;
    }
    if (this._private__width === newWidth) {
      return;
    }
    const previousVisibleRange = this._internal_visibleLogicalRange();
    const oldWidth = this._private__width;
    this._private__width = newWidth;
    this._private__visibleRangeInvalidated = true;
    if (this._private__options.lockVisibleTimeRangeOnResize && oldWidth !== 0) {
      const newBarSpacing = this._private__barSpacing * newWidth / oldWidth;
      this._private__barSpacing = newBarSpacing;
    }
    if (this._private__options.fixLeftEdge) {
      if (previousVisibleRange !== null && previousVisibleRange._internal_left() <= 0) {
        const delta = oldWidth - newWidth;
        this._private__rightOffset -= Math.round(delta / this._private__barSpacing) + 1;
        this._private__visibleRangeInvalidated = true;
      }
    }
    this._private__correctBarSpacing();
    this._private__correctOffset();
  }
  _internal_indexToCoordinate(index) {
    if (this._internal_isEmpty() || !isInteger(index)) {
      return 0;
    }
    const baseIndex = this._internal_baseIndex();
    const deltaFromRight = baseIndex + this._private__rightOffset - index;
    const coordinate = this._private__width - (deltaFromRight + 0.5) * this._private__barSpacing - 1;
    return coordinate;
  }
  _internal_indexesToCoordinates(points2, visibleRange) {
    const baseIndex = this._internal_baseIndex();
    const indexFrom = visibleRange === void 0 ? 0 : visibleRange.from;
    const indexTo = visibleRange === void 0 ? points2.length : visibleRange.to;
    for (let i = indexFrom; i < indexTo; i++) {
      const index = points2[i]._internal_time;
      const deltaFromRight = baseIndex + this._private__rightOffset - index;
      const coordinate = this._private__width - (deltaFromRight + 0.5) * this._private__barSpacing - 1;
      points2[i]._internal_x = coordinate;
    }
  }
  _internal_coordinateToIndex(x, considerIgnoreWhitespace) {
    const index = Math.ceil(this._private__coordinateToFloatIndex(x));
    if (!considerIgnoreWhitespace || !this._private__options.ignoreWhitespaceIndices || this._private__shouldConsiderIndex(index)) {
      return index;
    }
    return this._private__findNearestIndexWithData(index);
  }
  _internal_setRightOffset(offset) {
    this._private__visibleRangeInvalidated = true;
    this._private__rightOffset = offset;
    this._private__correctOffset();
    this._private__model._internal_recalculateAllPanes();
    this._private__model._internal_lightUpdate();
  }
  _internal_barSpacing() {
    return this._private__barSpacing;
  }
  _internal_setBarSpacing(newBarSpacing) {
    const oldBarSpacing = this._private__barSpacing;
    this._private__setBarSpacing(newBarSpacing);
    if (this._private__options.rightOffsetPixels !== void 0 && oldBarSpacing !== 0) {
      const newRightOffset = this._private__rightOffset * oldBarSpacing / this._private__barSpacing;
      this._private__rightOffset = newRightOffset;
    }
    this._private__correctOffset();
    this._private__model._internal_recalculateAllPanes();
    this._private__model._internal_lightUpdate();
  }
  _internal_rightOffset() {
    return this._private__rightOffset;
  }
  // eslint-disable-next-line complexity
  _internal_marks() {
    if (this._internal_isEmpty()) {
      return null;
    }
    if (this._private__timeMarksCache !== null) {
      return this._private__timeMarksCache;
    }
    const spacing = this._private__barSpacing;
    const fontSize = this._private__model._internal_options()["layout"].fontSize;
    const pixelsPer8Characters = (fontSize + 4) * 5;
    const pixelsPerCharacter = pixelsPer8Characters / defaultTickMarkMaxCharacterLength;
    const maxLabelWidth = pixelsPerCharacter * (this._private__options.tickMarkMaxCharacterLength || defaultTickMarkMaxCharacterLength);
    const indexPerLabel = Math.round(maxLabelWidth / spacing);
    const visibleBars = ensureNotNull(this._internal_visibleStrictRange());
    const firstBar = Math.max(visibleBars._internal_left(), visibleBars._internal_left() - indexPerLabel);
    const lastBar = Math.max(visibleBars._internal_right(), visibleBars._internal_right() - indexPerLabel);
    const items = this._private__tickMarks._internal_build(spacing, maxLabelWidth, this._private__options.ignoreWhitespaceIndices, this._private__indicesWithData, this._private__indicesWithDataUpdateId);
    const earliestIndexOfSecondLabel = this._private__firstIndex() + indexPerLabel;
    const indexOfSecondLastLabel = this._private__lastIndex() - indexPerLabel;
    const isAllScalingAndScrollingDisabled = this._private__isAllScalingAndScrollingDisabled();
    const isLeftEdgeFixed = this._private__options.fixLeftEdge || isAllScalingAndScrollingDisabled;
    const isRightEdgeFixed = this._private__options.fixRightEdge || isAllScalingAndScrollingDisabled;
    let targetIndex = 0;
    for (const tm of items) {
      if (!(firstBar <= tm.index && tm.index <= lastBar)) {
        continue;
      }
      let label;
      if (targetIndex < this._private__labels.length) {
        label = this._private__labels[targetIndex];
        label.coord = this._internal_indexToCoordinate(tm.index);
        label.label = this._private__formatLabel(tm);
        label.weight = tm.weight;
      } else {
        label = {
          needAlignCoordinate: false,
          coord: this._internal_indexToCoordinate(tm.index),
          label: this._private__formatLabel(tm),
          weight: tm.weight
        };
        this._private__labels.push(label);
      }
      if (this._private__barSpacing > maxLabelWidth / 2 && !isAllScalingAndScrollingDisabled) {
        label.needAlignCoordinate = false;
      } else {
        label.needAlignCoordinate = isLeftEdgeFixed && tm.index <= earliestIndexOfSecondLabel || isRightEdgeFixed && tm.index >= indexOfSecondLastLabel;
      }
      targetIndex++;
    }
    this._private__labels.length = targetIndex;
    this._private__timeMarksCache = this._private__labels;
    return this._private__labels;
  }
  _internal_restoreDefault() {
    this._private__visibleRangeInvalidated = true;
    this._internal_setBarSpacing(this._private__options.barSpacing);
    let newOffset;
    if (this._private__options.rightOffsetPixels !== void 0) {
      newOffset = this._private__options.rightOffsetPixels / this._internal_barSpacing();
    } else {
      newOffset = this._private__options.rightOffset;
    }
    this._internal_setRightOffset(newOffset);
  }
  _internal_setBaseIndex(baseIndex) {
    this._private__visibleRangeInvalidated = true;
    this._private__baseIndexOrNull = baseIndex;
    this._private__correctOffset();
    this._private__doFixLeftEdge();
  }
  /**
   * Zoom in/out the scale around a `zoomPoint` on `scale` value.
   *
   * @param zoomPoint - X coordinate of the point to apply the zoom.
   * If `rightBarStaysOnScroll` option is disabled, then will be used to restore right offset.
   * @param scale - Zoom value (in 1/10 parts of current bar spacing).
   * Negative value means zoom out, positive - zoom in.
   */
  _internal_zoom(zoomPoint, scale) {
    const floatIndexAtZoomPoint = this._private__coordinateToFloatIndex(zoomPoint);
    const barSpacing = this._internal_barSpacing();
    const newBarSpacing = barSpacing + scale * (barSpacing / 10);
    this._internal_setBarSpacing(newBarSpacing);
    if (!this._private__options.rightBarStaysOnScroll) {
      this._internal_setRightOffset(this._internal_rightOffset() + (floatIndexAtZoomPoint - this._private__coordinateToFloatIndex(zoomPoint)));
    }
  }
  _internal_startScale(x) {
    if (this._private__scrollStartPoint) {
      this._internal_endScroll();
    }
    if (this._private__scaleStartPoint !== null || this._private__commonTransitionStartState !== null) {
      return;
    }
    if (this._internal_isEmpty()) {
      return;
    }
    this._private__scaleStartPoint = x;
    this._private__saveCommonTransitionsStartState();
  }
  _internal_scaleTo(x) {
    if (this._private__commonTransitionStartState === null) {
      return;
    }
    const startLengthFromRight = clamp(this._private__width - x, 0, this._private__width);
    const currentLengthFromRight = clamp(this._private__width - ensureNotNull(this._private__scaleStartPoint), 0, this._private__width);
    if (startLengthFromRight === 0 || currentLengthFromRight === 0) {
      return;
    }
    this._internal_setBarSpacing(this._private__commonTransitionStartState._internal_barSpacing * startLengthFromRight / currentLengthFromRight);
  }
  _internal_endScale() {
    if (this._private__scaleStartPoint === null) {
      return;
    }
    this._private__scaleStartPoint = null;
    this._private__clearCommonTransitionsStartState();
  }
  _internal_startScroll(x) {
    if (this._private__scrollStartPoint !== null || this._private__commonTransitionStartState !== null) {
      return;
    }
    if (this._internal_isEmpty()) {
      return;
    }
    this._private__scrollStartPoint = x;
    this._private__saveCommonTransitionsStartState();
  }
  _internal_scrollTo(x) {
    if (this._private__scrollStartPoint === null) {
      return;
    }
    const shiftInLogical = (this._private__scrollStartPoint - x) / this._internal_barSpacing();
    this._private__rightOffset = ensureNotNull(this._private__commonTransitionStartState)._internal_rightOffset + shiftInLogical;
    this._private__visibleRangeInvalidated = true;
    this._private__correctOffset();
  }
  _internal_endScroll() {
    if (this._private__scrollStartPoint === null) {
      return;
    }
    this._private__scrollStartPoint = null;
    this._private__clearCommonTransitionsStartState();
  }
  _internal_scrollToRealTime() {
    this._internal_scrollToOffsetAnimated(this._private__options.rightOffset);
  }
  _internal_scrollToOffsetAnimated(offset, animationDuration = 400) {
    if (!isFinite(offset)) {
      throw new RangeError("offset is required and must be finite number");
    }
    if (!isFinite(animationDuration) || animationDuration <= 0) {
      throw new RangeError("animationDuration (optional) must be finite positive number");
    }
    const source = this._private__rightOffset;
    const animationStart = performance.now();
    this._private__model._internal_setTimeScaleAnimation({
      _internal_finished: (time) => (time - animationStart) / animationDuration >= 1,
      _internal_getPosition: (time) => {
        const animationProgress = (time - animationStart) / animationDuration;
        const finishAnimation = animationProgress >= 1;
        return finishAnimation ? offset : source + (offset - source) * animationProgress;
      }
    });
  }
  _internal_update(newPoints, firstChangedPointIndex) {
    this._private__visibleRangeInvalidated = true;
    this._private__points = newPoints;
    this._private__tickMarks._internal_setTimeScalePoints(newPoints, firstChangedPointIndex);
    this._private__correctOffset();
  }
  _internal_visibleBarsChanged() {
    return this._private__visibleBarsChanged;
  }
  _internal_logicalRangeChanged() {
    return this._private__logicalRangeChanged;
  }
  _internal_optionsApplied() {
    return this._private__optionsApplied;
  }
  _internal_baseIndex() {
    return this._private__baseIndexOrNull || 0;
  }
  _internal_setVisibleRange(range, applyDefaultOffset) {
    const length = range._internal_count();
    const pixelOffset = applyDefaultOffset && this._private__options.rightOffsetPixels || 0;
    this._private__setBarSpacing((this._private__width - pixelOffset) / length);
    this._private__rightOffset = range._internal_right() - this._internal_baseIndex();
    if (applyDefaultOffset) {
      this._private__rightOffset = pixelOffset ? pixelOffset / this._internal_barSpacing() : this._private__options.rightOffset;
    }
    this._private__correctOffset();
    this._private__visibleRangeInvalidated = true;
    this._private__model._internal_recalculateAllPanes();
    this._private__model._internal_lightUpdate();
  }
  _internal_fitContent() {
    const first = this._private__firstIndex();
    const last = this._private__lastIndex();
    if (first === null || last === null) {
      return;
    }
    const rightOffsetBars = !this._private__options.rightOffsetPixels && this._private__options.rightOffset || 0;
    this._internal_setVisibleRange(new RangeImpl(first, last + rightOffsetBars), true);
  }
  _internal_setLogicalRange(range) {
    const barRange = new RangeImpl(range.from, range.to);
    this._internal_setVisibleRange(barRange);
  }
  _internal_formatDateTime(timeScalePoint) {
    if (this._private__localizationOptions.timeFormatter !== void 0) {
      return this._private__localizationOptions.timeFormatter(timeScalePoint.originalTime);
    }
    return this._private__horzScaleBehavior.formatHorzItem(timeScalePoint.time);
  }
  _internal_recalculateIndicesWithData() {
    if (!this._private__options.ignoreWhitespaceIndices) {
      return;
    }
    this._private__indicesWithData.clear();
    const series = this._private__model._internal_serieses();
    for (const s of series) {
      for (const index of s._internal_fulfilledIndices()) {
        this._private__indicesWithData.set(index, true);
      }
    }
    this._private__indicesWithDataUpdateId++;
  }
  /**
   * Returns the current data conflation factor.
   * Factor \> 1 means data points should be conflated for performance.
   */
  _internal_conflationFactor() {
    return this._private__conflationFactor;
  }
  /**
   * Provides an array of possible conflations factors based on the current
   * minBarSpacing setting for the chart.
   * @returns Arrays of conflation factors (number of bars to merge)
   */
  _internal_possibleConflationFactors() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const conflationThreshold = 1 / devicePixelRatio;
    const minBarSpacing = this._private__options.minBarSpacing;
    if (minBarSpacing >= conflationThreshold) {
      return [1];
    }
    const factors = [1];
    let currentLevel = 2;
    const maxLevel = 512;
    while (currentLevel <= maxLevel) {
      const levelThreshold = conflationThreshold / currentLevel;
      if (minBarSpacing < levelThreshold) {
        factors.push(currentLevel);
      }
      currentLevel *= 2;
    }
    return factors;
  }
  _private__isAllScalingAndScrollingDisabled() {
    const handleScroll = this._private__model._internal_options()["handleScroll"];
    const handleScale = this._private__model._internal_options()["handleScale"];
    return !handleScroll.horzTouchDrag && !handleScroll.mouseWheel && !handleScroll.pressedMouseMove && !handleScroll.vertTouchDrag && !handleScale.axisDoubleClickReset.time && !handleScale.axisPressedMouseMove.time && !handleScale.mouseWheel && !handleScale.pinch;
  }
  _private__firstIndex() {
    return this._private__points.length === 0 ? null : 0;
  }
  _private__lastIndex() {
    return this._private__points.length === 0 ? null : this._private__points.length - 1;
  }
  _private__rightOffsetForCoordinate(x) {
    return (this._private__width - 1 - x) / this._private__barSpacing;
  }
  _private__coordinateToFloatIndex(x) {
    const deltaFromRight = this._private__rightOffsetForCoordinate(x);
    const baseIndex = this._internal_baseIndex();
    const index = baseIndex + this._private__rightOffset - deltaFromRight;
    return Math.round(index * 1e6) / 1e6;
  }
  _private__setBarSpacing(newBarSpacing) {
    const oldBarSpacing = this._private__barSpacing;
    this._private__barSpacing = newBarSpacing;
    this._private__correctBarSpacing();
    if (oldBarSpacing !== this._private__barSpacing) {
      this._private__visibleRangeInvalidated = true;
      this._private__resetTimeMarksCache();
      this._private__updateConflationFactor();
    }
  }
  _private__updateVisibleRange() {
    if (!this._private__visibleRangeInvalidated) {
      return;
    }
    this._private__visibleRangeInvalidated = false;
    if (this._internal_isEmpty()) {
      this._private__setVisibleRange(TimeScaleVisibleRange._internal_invalid());
      return;
    }
    const baseIndex = this._internal_baseIndex();
    const newBarsLength = this._private__width / this._private__barSpacing;
    const rightBorder = this._private__rightOffset + baseIndex;
    const leftBorder = rightBorder - newBarsLength + 1;
    const logicalRange = new RangeImpl(leftBorder, rightBorder);
    this._private__setVisibleRange(new TimeScaleVisibleRange(logicalRange));
  }
  _private__correctBarSpacing() {
    const barSpacing = clamp(this._private__barSpacing, this._private__minBarSpacing(), this._private__maxBarSpacing());
    if (this._private__barSpacing !== barSpacing) {
      this._private__barSpacing = barSpacing;
      this._private__visibleRangeInvalidated = true;
    }
  }
  _private__maxBarSpacing() {
    if (this._private__options.maxBarSpacing > 0) {
      return this._private__options.maxBarSpacing;
    } else {
      return this._private__width * 0.5;
    }
  }
  _private__minBarSpacing() {
    if (this._private__options.fixLeftEdge && this._private__options.fixRightEdge && this._private__points.length !== 0) {
      return this._private__width / this._private__points.length;
    }
    return this._private__options.minBarSpacing;
  }
  /**
   * Updates the conflation factor based on current bar spacing using DPR-aware power-of-2 calculation with optional smoothing factor.
   * The smoothing factor allows intentional over-conflation for smoother appearance in small charts and sparklines.
   */
  _private__updateConflationFactor() {
    if (!this._private__options.enableConflation) {
      this._private__conflationFactor = 1;
      return;
    }
    const devicePixelRatio = window.devicePixelRatio || 1;
    const smoothingFactor = this._private__options.conflationThresholdFactor ?? 1;
    const adjustedThreshold = 1 / devicePixelRatio * smoothingFactor;
    if (this._private__barSpacing >= adjustedThreshold) {
      this._private__conflationFactor = 1;
      return;
    }
    const ratio = adjustedThreshold / this._private__barSpacing;
    const conflationLevel = Math.pow(2, Math.floor(Math.log2(ratio)));
    this._private__conflationFactor = Math.min(conflationLevel, 512);
  }
  _private__correctOffset() {
    const minRightOffset = this._private__minRightOffset();
    if (minRightOffset !== null && this._private__rightOffset < minRightOffset) {
      this._private__rightOffset = minRightOffset;
      this._private__visibleRangeInvalidated = true;
    }
    const maxRightOffset = this._private__maxRightOffset();
    if (this._private__rightOffset > maxRightOffset) {
      this._private__rightOffset = maxRightOffset;
      this._private__visibleRangeInvalidated = true;
    }
  }
  _private__minRightOffset() {
    const firstIndex = this._private__firstIndex();
    const baseIndex = this._private__baseIndexOrNull;
    if (firstIndex === null || baseIndex === null) {
      return null;
    }
    const barsEstimation = this._private__options.fixLeftEdge ? this._private__width / this._private__barSpacing : Math.min(2, this._private__points.length);
    return firstIndex - baseIndex - 1 + barsEstimation;
  }
  _private__maxRightOffset() {
    return this._private__options.fixRightEdge ? 0 : this._private__width / this._private__barSpacing - Math.min(2, this._private__points.length);
  }
  _private__saveCommonTransitionsStartState() {
    this._private__commonTransitionStartState = {
      _internal_barSpacing: this._internal_barSpacing(),
      _internal_rightOffset: this._internal_rightOffset()
    };
  }
  _private__clearCommonTransitionsStartState() {
    this._private__commonTransitionStartState = null;
  }
  _private__formatLabel(tickMark) {
    let formatter = this._private__formattedByWeight.get(tickMark.weight);
    if (formatter === void 0) {
      formatter = new FormattedLabelsCache((mark) => {
        return this._private__formatLabelImpl(mark);
      }, this._private__horzScaleBehavior);
      this._private__formattedByWeight.set(tickMark.weight, formatter);
    }
    return formatter._internal_format(tickMark);
  }
  _private__formatLabelImpl(tickMark) {
    return this._private__horzScaleBehavior.formatTickmark(tickMark, this._private__localizationOptions);
  }
  _private__setVisibleRange(newVisibleRange) {
    const oldVisibleRange = this._private__visibleRange;
    this._private__visibleRange = newVisibleRange;
    if (!areRangesEqual(oldVisibleRange._internal_strictRange(), this._private__visibleRange._internal_strictRange())) {
      this._private__visibleBarsChanged._internal_fire();
    }
    if (!areRangesEqual(oldVisibleRange._internal_logicalRange(), this._private__visibleRange._internal_logicalRange())) {
      this._private__logicalRangeChanged._internal_fire();
    }
    this._private__resetTimeMarksCache();
  }
  _private__resetTimeMarksCache() {
    this._private__timeMarksCache = null;
  }
  _private__invalidateTickMarks() {
    this._private__resetTimeMarksCache();
    this._private__formattedByWeight.clear();
  }
  _private__updateDateTimeFormatter() {
    this._private__horzScaleBehavior.updateFormatter(this._private__localizationOptions);
  }
  _private__doFixLeftEdge() {
    if (!this._private__options.fixLeftEdge) {
      return;
    }
    const firstIndex = this._private__firstIndex();
    if (firstIndex === null) {
      return;
    }
    const visibleRange = this._internal_visibleStrictRange();
    if (visibleRange === null) {
      return;
    }
    const delta = visibleRange._internal_left() - firstIndex;
    if (delta < 0) {
      const leftEdgeOffset = this._private__rightOffset - delta - 1;
      this._internal_setRightOffset(leftEdgeOffset);
    }
    this._private__correctBarSpacing();
  }
  _private__doFixRightEdge() {
    this._private__correctOffset();
    this._private__correctBarSpacing();
  }
  _private__shouldConsiderIndex(index) {
    if (!this._private__options.ignoreWhitespaceIndices) {
      return true;
    }
    return this._private__indicesWithData.get(index) || false;
  }
  _private__findNearestIndexWithData(x) {
    const gen = testNearestIntegers(x);
    const maxIndex = this._private__lastIndex();
    while (maxIndex) {
      const index = gen.next().value;
      if (this._private__indicesWithData.get(index)) {
        return index;
      }
      if (index < 0 || index > maxIndex) {
        break;
      }
    }
    return x;
  }
  _private__checkRightOffsetPixels(options) {
    if (options.rightOffsetPixels !== void 0) {
      const newOffset = options.rightOffsetPixels / (options.barSpacing || this._private__barSpacing);
      this._private__model._internal_setRightOffset(newOffset);
    }
  }
};
function* testNearestIntegers(num) {
  const rounded = Math.round(num);
  const isRoundedDown = rounded < num;
  let offset = 1;
  while (true) {
    if (isRoundedDown) {
      yield rounded + offset;
      yield rounded - offset;
    } else {
      yield rounded - offset;
      yield rounded + offset;
    }
    offset++;
  }
}
var TrackingModeExitMode;
(function(TrackingModeExitMode2) {
  TrackingModeExitMode2[TrackingModeExitMode2["OnTouchEnd"] = 0] = "OnTouchEnd";
  TrackingModeExitMode2[TrackingModeExitMode2["OnNextTap"] = 1] = "OnNextTap";
})(TrackingModeExitMode || (TrackingModeExitMode = {}));
function isPanePrimitive(source) {
  return source instanceof Pane;
}
var ChartModel = class {
  constructor(invalidateHandler, options, horzScaleBehavior) {
    this._private__panes = [];
    this._private__serieses = [];
    this._private__visibleSerieses = null;
    this._private__width = 0;
    this._private__hoveredSource = null;
    this._private__priceScalesOptionsChanged = new Delegate();
    this._private__crosshairMoved = new Delegate();
    this._private__gradientColorsCache = null;
    this._private__invalidateHandler = invalidateHandler;
    this._private__options = options;
    this._private__horzScaleBehavior = horzScaleBehavior;
    this._private__colorParser = new ColorParser(this._private__options.layout.colorParsers);
    this._private__rendererOptionsProvider = new PriceAxisRendererOptionsProvider(this);
    this._private__timeScale = new TimeScale(this, options.timeScale, this._private__options.localization, horzScaleBehavior);
    this._private__crosshair = new Crosshair(this, options.crosshair);
    this._private__magnet = new Magnet(options.crosshair);
    if (options.addDefaultPane) {
      this._private__getOrCreatePane(0);
      this._private__panes[0]._internal_setStretchFactor(DEFAULT_STRETCH_FACTOR * 2);
    }
    this._private__backgroundTopColor = this._private__getBackgroundColor(
      0
      /* BackgroundColorSide.Top */
    );
    this._private__backgroundBottomColor = this._private__getBackgroundColor(
      1
      /* BackgroundColorSide.Bottom */
    );
  }
  _internal_fullUpdate() {
    this._private__invalidate(InvalidateMask._internal_full());
  }
  _internal_lightUpdate() {
    this._private__invalidate(InvalidateMask._internal_light());
  }
  _internal_cursorUpdate() {
    this._private__invalidate(new InvalidateMask(
      1
      /* InvalidationLevel.Cursor */
    ));
  }
  _internal_updateSource(source) {
    const inv = this._private__invalidationMaskForSource(source);
    this._private__invalidate(inv);
  }
  _internal_hoveredSource() {
    return this._private__hoveredSource;
  }
  _internal_setHoveredSource(source) {
    if (this._private__hoveredSource?._internal_source === source?._internal_source && this._private__hoveredSource?._internal_object?._internal_externalId === source?._internal_object?._internal_externalId && this._private__hoveredSource?._internal_object?._internal_hitTestData === source?._internal_object?._internal_hitTestData && this._private__hoveredSource?._internal_cursorStyle === source?._internal_cursorStyle && this._private__hoveredSource?._internal_itemType === source?._internal_itemType) {
      return;
    }
    const prevSource = this._private__hoveredSource;
    this._private__hoveredSource = source;
    if (prevSource !== null) {
      this._internal_updateSource(prevSource._internal_source);
    }
    if (source !== null && source._internal_source !== prevSource?._internal_source) {
      this._internal_updateSource(source._internal_source);
    }
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_applyOptions(options) {
    merge(this._private__options, options);
    this._private__panes.forEach((p) => p._internal_applyScaleOptions(options));
    if (options.timeScale !== void 0) {
      this._private__timeScale._internal_applyOptions(options.timeScale);
    }
    if (options.localization !== void 0) {
      this._private__timeScale._internal_applyLocalizationOptions(options.localization);
    }
    if (options.leftPriceScale || options.rightPriceScale) {
      this._private__priceScalesOptionsChanged._internal_fire();
    }
    this._private__backgroundTopColor = this._private__getBackgroundColor(
      0
      /* BackgroundColorSide.Top */
    );
    this._private__backgroundBottomColor = this._private__getBackgroundColor(
      1
      /* BackgroundColorSide.Bottom */
    );
    this._internal_fullUpdate();
  }
  _internal_applyPriceScaleOptions(priceScaleId, options, paneIndex = 0) {
    const pane = this._private__panes[paneIndex];
    if (pane === void 0) {
      {
        throw new Error(`Trying to apply price scale options with incorrect pane index: ${paneIndex}`);
      }
    }
    if (priceScaleId === "left") {
      merge(this._private__options, {
        leftPriceScale: options
      });
      pane._internal_applyScaleOptions({
        leftPriceScale: options
      });
      this._private__priceScalesOptionsChanged._internal_fire();
      this._internal_fullUpdate();
      return;
    } else if (priceScaleId === "right") {
      merge(this._private__options, {
        rightPriceScale: options
      });
      pane._internal_applyScaleOptions({
        rightPriceScale: options
      });
      this._private__priceScalesOptionsChanged._internal_fire();
      this._internal_fullUpdate();
      return;
    }
    const res = this._internal_findPriceScale(priceScaleId, paneIndex);
    if (res === null) {
      {
        throw new Error(`Trying to apply price scale options with incorrect ID: ${priceScaleId}`);
      }
    }
    res._internal_priceScale._internal_applyOptions(options);
    this._private__priceScalesOptionsChanged._internal_fire();
  }
  _internal_findPriceScale(priceScaleId, paneIndex) {
    const pane = this._private__panes[paneIndex];
    if (pane === void 0) {
      return null;
    }
    const priceScale = pane._internal_priceScaleById(priceScaleId);
    if (priceScale !== null) {
      return {
        _internal_pane: pane,
        _internal_priceScale: priceScale
      };
    }
    return null;
  }
  _internal_timeScale() {
    return this._private__timeScale;
  }
  _internal_panes() {
    return this._private__panes;
  }
  _internal_crosshairSource() {
    return this._private__crosshair;
  }
  _internal_crosshairMoved() {
    return this._private__crosshairMoved;
  }
  _internal_setPaneHeight(pane, height) {
    pane._internal_setHeight(height);
    this._internal_recalculateAllPanes();
  }
  _internal_setWidth(width) {
    this._private__width = width;
    this._private__timeScale._internal_setWidth(this._private__width);
    this._private__panes.forEach((pane) => pane._internal_setWidth(width));
    this._internal_recalculateAllPanes();
  }
  _internal_removePane(index) {
    if (this._private__panes.length === 1) {
      return;
    }
    assert(index >= 0 && index < this._private__panes.length, "Invalid pane index");
    this._private__panes.splice(index, 1);
    this._internal_fullUpdate();
  }
  _internal_changePanesHeight(paneIndex, height) {
    if (this._private__panes.length < 2) {
      return;
    }
    assert(paneIndex >= 0 && paneIndex < this._private__panes.length, "Invalid pane index");
    const targetPane = this._private__panes[paneIndex];
    const totalStretch = this._private__panes.reduce((prevValue, pane) => prevValue + pane._internal_stretchFactor(), 0);
    const totalHeight = this._private__panes.reduce((prevValue, pane) => prevValue + pane._internal_height(), 0);
    const maxPaneHeight = totalHeight - MIN_PANE_HEIGHT * (this._private__panes.length - 1);
    height = Math.min(maxPaneHeight, Math.max(MIN_PANE_HEIGHT, height));
    const pixelStretchFactor = totalStretch / totalHeight;
    const oldHeight = targetPane._internal_height();
    targetPane._internal_setStretchFactor(height * pixelStretchFactor);
    let otherPanesChange = height - oldHeight;
    let panesCount = this._private__panes.length - 1;
    for (const pane of this._private__panes) {
      if (pane !== targetPane) {
        const newPaneHeight = Math.min(maxPaneHeight, Math.max(30, pane._internal_height() - otherPanesChange / panesCount));
        otherPanesChange -= pane._internal_height() - newPaneHeight;
        panesCount -= 1;
        const newStretchFactor = newPaneHeight * pixelStretchFactor;
        pane._internal_setStretchFactor(newStretchFactor);
      }
    }
    this._internal_fullUpdate();
  }
  _internal_swapPanes(first, second) {
    assert(first >= 0 && first < this._private__panes.length && second >= 0 && second < this._private__panes.length, "Invalid pane index");
    const firstPane = this._private__panes[first];
    const secondPane = this._private__panes[second];
    this._private__panes[first] = secondPane;
    this._private__panes[second] = firstPane;
    this._internal_fullUpdate();
  }
  _internal_movePane(from, to) {
    assert(from >= 0 && from < this._private__panes.length && to >= 0 && to < this._private__panes.length, "Invalid pane index");
    if (from === to) {
      return;
    }
    const [paneToMove] = this._private__panes.splice(from, 1);
    this._private__panes.splice(to, 0, paneToMove);
    this._internal_fullUpdate();
  }
  _internal_startScalePrice(pane, priceScale, x) {
    pane._internal_startScalePrice(priceScale, x);
  }
  _internal_scalePriceTo(pane, priceScale, x) {
    pane._internal_scalePriceTo(priceScale, x);
    this._internal_updateCrosshair();
    this._private__invalidate(this._private__paneInvalidationMask(
      pane,
      2
      /* InvalidationLevel.Light */
    ));
  }
  _internal_endScalePrice(pane, priceScale) {
    pane._internal_endScalePrice(priceScale);
    this._private__invalidate(this._private__paneInvalidationMask(
      pane,
      2
      /* InvalidationLevel.Light */
    ));
  }
  _internal_startScrollPrice(pane, priceScale, x) {
    if (priceScale._internal_isAutoScale()) {
      return;
    }
    pane._internal_startScrollPrice(priceScale, x);
  }
  _internal_scrollPriceTo(pane, priceScale, x) {
    if (priceScale._internal_isAutoScale()) {
      return;
    }
    pane._internal_scrollPriceTo(priceScale, x);
    this._internal_updateCrosshair();
    this._private__invalidate(this._private__paneInvalidationMask(
      pane,
      2
      /* InvalidationLevel.Light */
    ));
  }
  _internal_endScrollPrice(pane, priceScale) {
    if (priceScale._internal_isAutoScale()) {
      return;
    }
    pane._internal_endScrollPrice(priceScale);
    this._private__invalidate(this._private__paneInvalidationMask(
      pane,
      2
      /* InvalidationLevel.Light */
    ));
  }
  _internal_resetPriceScale(pane, priceScale) {
    pane._internal_resetPriceScale(priceScale);
    this._private__invalidate(this._private__paneInvalidationMask(
      pane,
      2
      /* InvalidationLevel.Light */
    ));
  }
  _internal_startScaleTime(position) {
    this._private__timeScale._internal_startScale(position);
  }
  /**
   * Zoom in/out the chart (depends on scale value).
   *
   * @param pointX - X coordinate of the point to apply the zoom (the point which should stay on its place)
   * @param scale - Zoom value. Negative value means zoom out, positive - zoom in.
   */
  _internal_zoomTime(pointX, scale) {
    const timeScale = this._internal_timeScale();
    if (timeScale._internal_isEmpty() || scale === 0) {
      return;
    }
    const timeScaleWidth = timeScale._internal_width();
    pointX = Math.max(1, Math.min(pointX, timeScaleWidth));
    timeScale._internal_zoom(pointX, scale);
    this._internal_recalculateAllPanes();
  }
  _internal_scrollChart(x) {
    this._internal_startScrollTime(0);
    this._internal_scrollTimeTo(x);
    this._internal_endScrollTime();
  }
  _internal_scaleTimeTo(x) {
    this._private__timeScale._internal_scaleTo(x);
    this._internal_recalculateAllPanes();
  }
  _internal_endScaleTime() {
    this._private__timeScale._internal_endScale();
    this._internal_lightUpdate();
  }
  _internal_startScrollTime(x) {
    this._private__timeScale._internal_startScroll(x);
  }
  _internal_scrollTimeTo(x) {
    this._private__timeScale._internal_scrollTo(x);
    this._internal_recalculateAllPanes();
  }
  _internal_endScrollTime() {
    this._private__timeScale._internal_endScroll();
    this._internal_lightUpdate();
  }
  _internal_serieses() {
    return this._private__serieses;
  }
  _internal_visibleSerieses() {
    if (this._private__visibleSerieses === null) {
      this._private__visibleSerieses = this._private__serieses.filter((s) => s._internal_visible());
    }
    return this._private__visibleSerieses;
  }
  _internal_invalidateVisibleSeries() {
    this._private__visibleSerieses = null;
  }
  _internal_setAndSaveCurrentPosition(x, y, event, pane, skipEvent) {
    this._private__crosshair._internal_saveOriginCoord(x, y);
    let price = NaN;
    let index = this._private__timeScale._internal_coordinateToIndex(x, true);
    const visibleBars = this._private__timeScale._internal_visibleStrictRange();
    if (visibleBars !== null) {
      index = Math.min(Math.max(visibleBars._internal_left(), index), visibleBars._internal_right());
    }
    index = this._private__crosshair._internal_snapToVisibleSeriesIfNeeded(index);
    const priceScale = pane._internal_defaultPriceScale();
    const firstValue = priceScale._internal_firstValue();
    if (firstValue !== null) {
      price = priceScale._internal_coordinateToPrice(y, firstValue);
    }
    price = this._private__magnet._internal_align(price, index, pane);
    this._private__crosshair._internal_setPosition(index, price, pane);
    this._internal_cursorUpdate();
    if (!skipEvent) {
      const hitTest = hitTestPane(pane, x, y);
      this._internal_setHoveredSource(hitTest && {
        _internal_source: hitTest._internal_source,
        _internal_object: hitTest._internal_object,
        _internal_cursorStyle: hitTest._internal_cursorStyle || null,
        _internal_itemType: hitTest._internal_itemType
      });
      this._private__crosshairMoved._internal_fire(this._private__crosshair._internal_appliedIndex(), { x, y }, event);
    }
  }
  // A position provided external (not from an internal event listener)
  _internal_setAndSaveSyntheticPosition(price, horizontalPosition, pane) {
    const priceScale = pane._internal_defaultPriceScale();
    const firstValue = priceScale._internal_firstValue();
    const y = priceScale._internal_priceToCoordinate(price, ensureNotNull(firstValue));
    const index = this._private__timeScale._internal_timeToIndex(horizontalPosition, true);
    const x = this._private__timeScale._internal_indexToCoordinate(ensureNotNull(index));
    this._internal_setAndSaveCurrentPosition(x, y, null, pane, true);
  }
  _internal_clearCurrentPosition(skipEvent) {
    const crosshair = this._internal_crosshairSource();
    crosshair._internal_clearPosition();
    this._internal_cursorUpdate();
    if (!skipEvent) {
      this._private__crosshairMoved._internal_fire(null, null, null);
    }
  }
  _internal_updateCrosshair() {
    const pane = this._private__crosshair._internal_pane();
    if (pane !== null) {
      const x = this._private__crosshair._internal_originCoordX();
      const y = this._private__crosshair._internal_originCoordY();
      this._internal_setAndSaveCurrentPosition(x, y, null, pane);
    }
    this._private__crosshair._internal_updateAllViews();
  }
  _internal_updateTimeScale(newBaseIndex, newPoints, firstChangedPointIndex) {
    const oldFirstTime = this._private__timeScale._internal_indexToTime(0);
    if (newPoints !== void 0 && firstChangedPointIndex !== void 0) {
      this._private__timeScale._internal_update(newPoints, firstChangedPointIndex);
    }
    const newFirstTime = this._private__timeScale._internal_indexToTime(0);
    const currentBaseIndex = this._private__timeScale._internal_baseIndex();
    const visibleBars = this._private__timeScale._internal_visibleStrictRange();
    if (visibleBars !== null && oldFirstTime !== null && newFirstTime !== null) {
      const isLastSeriesBarVisible = visibleBars._internal_contains(currentBaseIndex);
      const isLeftBarShiftToLeft = this._private__horzScaleBehavior.key(oldFirstTime) > this._private__horzScaleBehavior.key(newFirstTime);
      const isSeriesPointsAdded = newBaseIndex !== null && newBaseIndex > currentBaseIndex;
      const isSeriesPointsAddedToRight = isSeriesPointsAdded && !isLeftBarShiftToLeft;
      const allowShiftWhenReplacingWhitespace = this._private__timeScale._internal_options().allowShiftVisibleRangeOnWhitespaceReplacement;
      const replacedExistingWhitespace = firstChangedPointIndex === void 0;
      const needShiftVisibleRangeOnNewBar = isLastSeriesBarVisible && (!replacedExistingWhitespace || allowShiftWhenReplacingWhitespace) && this._private__timeScale._internal_options().shiftVisibleRangeOnNewBar;
      if (isSeriesPointsAddedToRight && !needShiftVisibleRangeOnNewBar) {
        const compensationShift = newBaseIndex - currentBaseIndex;
        this._private__timeScale._internal_setRightOffset(this._private__timeScale._internal_rightOffset() - compensationShift);
      }
    }
    this._private__timeScale._internal_setBaseIndex(newBaseIndex);
  }
  _internal_recalculatePane(pane) {
    if (pane !== null) {
      pane._internal_recalculate();
    }
  }
  _internal_paneForSource(source) {
    if (isPanePrimitive(source)) {
      return source;
    }
    const pane = this._private__panes.find((p) => p._internal_orderedSources().includes(source));
    return pane === void 0 ? null : pane;
  }
  _internal_recalculateAllPanes() {
    this._private__panes.forEach((p) => p._internal_recalculate());
    this._internal_updateCrosshair();
  }
  _internal_destroy() {
    this._private__panes.forEach((p) => p._internal_destroy());
    this._private__panes.length = 0;
    this._private__options.localization.priceFormatter = void 0;
    this._private__options.localization.percentageFormatter = void 0;
    this._private__options.localization.timeFormatter = void 0;
  }
  _internal_rendererOptionsProvider() {
    return this._private__rendererOptionsProvider;
  }
  _internal_priceAxisRendererOptions() {
    return this._private__rendererOptionsProvider._internal_options();
  }
  _internal_priceScalesOptionsChanged() {
    return this._private__priceScalesOptionsChanged;
  }
  _internal_addSeriesToPane(series, paneIndex) {
    const pane = this._private__getOrCreatePane(paneIndex);
    this._private__addSeriesToPane(series, pane);
    this._private__serieses.push(series);
    this._internal_invalidateVisibleSeries();
    if (this._private__serieses.length === 1) {
      this._internal_fullUpdate();
    } else {
      this._internal_lightUpdate();
    }
  }
  _internal_removeSeries(series) {
    const pane = this._internal_paneForSource(series);
    const seriesIndex = this._private__serieses.indexOf(series);
    assert(seriesIndex !== -1, "Series not found");
    const paneImpl = ensureNotNull(pane);
    this._private__serieses.splice(seriesIndex, 1);
    paneImpl._internal_removeDataSource(series);
    if (series._internal_destroy) {
      series._internal_destroy();
    }
    this._internal_invalidateVisibleSeries();
    this._private__timeScale._internal_recalculateIndicesWithData();
    this._private__cleanupIfPaneIsEmpty(paneImpl);
  }
  _internal_moveSeriesToScale(series, targetScaleId) {
    const pane = ensureNotNull(this._internal_paneForSource(series));
    pane._internal_removeDataSource(series, true);
    pane._internal_addDataSource(series, targetScaleId, true);
  }
  _internal_fitContent() {
    const mask = InvalidateMask._internal_light();
    mask._internal_setFitContent();
    this._private__invalidate(mask);
  }
  _internal_setTargetLogicalRange(range) {
    const mask = InvalidateMask._internal_light();
    mask._internal_applyRange(range);
    this._private__invalidate(mask);
  }
  _internal_resetTimeScale() {
    const mask = InvalidateMask._internal_light();
    mask._internal_resetTimeScale();
    this._private__invalidate(mask);
  }
  _internal_setBarSpacing(spacing) {
    const mask = InvalidateMask._internal_light();
    mask._internal_setBarSpacing(spacing);
    this._private__invalidate(mask);
  }
  _internal_setRightOffset(offset) {
    const mask = InvalidateMask._internal_light();
    mask._internal_setRightOffset(offset);
    this._private__invalidate(mask);
  }
  _internal_setTimeScaleAnimation(animation) {
    const mask = InvalidateMask._internal_light();
    mask._internal_setTimeScaleAnimation(animation);
    this._private__invalidate(mask);
  }
  _internal_stopTimeScaleAnimation() {
    const mask = InvalidateMask._internal_light();
    mask._internal_stopTimeScaleAnimation();
    this._private__invalidate(mask);
  }
  _internal_defaultVisiblePriceScaleId() {
    const preferredPriceScaleId = this._private__options.defaultVisiblePriceScaleId;
    const leftVisible = this._private__options.leftPriceScale.visible;
    const rightVisible = this._private__options.rightPriceScale.visible;
    if (leftVisible !== rightVisible) {
      return leftVisible ? "left" : "right";
    }
    return preferredPriceScaleId;
  }
  _internal_moveSeriesToPane(series, newPaneIndex) {
    assert(newPaneIndex >= 0, "Index should be greater or equal to 0");
    const fromPaneIndex = this._private__seriesPaneIndex(series);
    if (newPaneIndex === fromPaneIndex) {
      return;
    }
    const previousPane = ensureNotNull(this._internal_paneForSource(series));
    previousPane._internal_removeDataSource(series);
    const newPane = this._private__getOrCreatePane(newPaneIndex);
    this._private__addSeriesToPane(series, newPane);
    let paneWasRemoved = false;
    if (previousPane._internal_dataSources().length === 0) {
      paneWasRemoved = this._private__cleanupIfPaneIsEmpty(previousPane);
    }
    if (!paneWasRemoved) {
      this._internal_fullUpdate();
    }
  }
  _internal_backgroundBottomColor() {
    return this._private__backgroundBottomColor;
  }
  _internal_backgroundTopColor() {
    return this._private__backgroundTopColor;
  }
  _internal_backgroundColorAtYPercentFromTop(percent) {
    const bottomColor = this._private__backgroundBottomColor;
    const topColor = this._private__backgroundTopColor;
    if (bottomColor === topColor) {
      return bottomColor;
    }
    percent = Math.max(0, Math.min(100, Math.round(percent * 100)));
    if (this._private__gradientColorsCache === null || this._private__gradientColorsCache._internal_topColor !== topColor || this._private__gradientColorsCache._internal_bottomColor !== bottomColor) {
      this._private__gradientColorsCache = {
        _internal_topColor: topColor,
        _internal_bottomColor: bottomColor,
        _internal_colors: /* @__PURE__ */ new Map()
      };
    } else {
      const cachedValue = this._private__gradientColorsCache._internal_colors.get(percent);
      if (cachedValue !== void 0) {
        return cachedValue;
      }
    }
    const result = this._private__colorParser._internal_gradientColorAtPercent(topColor, bottomColor, percent / 100);
    this._private__gradientColorsCache._internal_colors.set(percent, result);
    return result;
  }
  _internal_getPaneIndex(pane) {
    return this._private__panes.indexOf(pane);
  }
  _internal_colorParser() {
    return this._private__colorParser;
  }
  _internal_addPane() {
    return this._private__addPane();
  }
  _private__addPane(index) {
    const pane = new Pane(this._private__timeScale, this);
    this._private__panes.push(pane);
    const idx = index ?? this._private__panes.length - 1;
    const mask = InvalidateMask._internal_full();
    mask._internal_invalidatePane(idx, {
      _internal_level: 0,
      _internal_autoScale: true
    });
    this._private__invalidate(mask);
    return pane;
  }
  _private__getOrCreatePane(index) {
    assert(index >= 0, "Index should be greater or equal to 0");
    index = Math.min(this._private__panes.length, index);
    if (index < this._private__panes.length) {
      return this._private__panes[index];
    }
    return this._private__addPane(index);
  }
  _private__seriesPaneIndex(series) {
    return this._private__panes.findIndex((pane) => pane._internal_series().includes(series));
  }
  _private__paneInvalidationMask(pane, level) {
    const inv = new InvalidateMask(level);
    if (pane !== null) {
      const index = this._private__panes.indexOf(pane);
      inv._internal_invalidatePane(index, {
        _internal_level: level
      });
    }
    return inv;
  }
  _private__invalidationMaskForSource(source, invalidateType) {
    if (invalidateType === void 0) {
      invalidateType = 2;
    }
    return this._private__paneInvalidationMask(this._internal_paneForSource(source), invalidateType);
  }
  _private__invalidate(mask) {
    if (this._private__invalidateHandler) {
      this._private__invalidateHandler(mask);
    }
    this._private__panes.forEach((pane) => pane._internal_grid()._internal_paneView()._internal_update());
  }
  _private__addSeriesToPane(series, pane) {
    const priceScaleId = series._internal_options().priceScaleId;
    const targetScaleId = priceScaleId !== void 0 ? priceScaleId : this._internal_defaultVisiblePriceScaleId();
    pane._internal_addDataSource(series, targetScaleId);
    if (!isDefaultPriceScale(targetScaleId)) {
      series._internal_applyOptions(series._internal_options());
    }
  }
  _private__getBackgroundColor(side) {
    const layoutOptions = this._private__options["layout"];
    if (layoutOptions.background.type === "gradient") {
      return side === 0 ? layoutOptions.background.topColor : layoutOptions.background.bottomColor;
    }
    return layoutOptions.background.color;
  }
  _private__cleanupIfPaneIsEmpty(pane) {
    if (!pane._internal_preserveEmptyPane() && (pane._internal_dataSources().length === 0 && this._private__panes.length > 1)) {
      this._private__panes.splice(this._internal_getPaneIndex(pane), 1);
      this._internal_fullUpdate();
      return true;
    }
    return false;
  }
};
function fillUpDownCandlesticksColors(options) {
  if (options.borderColor !== void 0) {
    options.borderUpColor = options.borderColor;
    options.borderDownColor = options.borderColor;
  }
  if (options.wickColor !== void 0) {
    options.wickUpColor = options.wickColor;
    options.wickDownColor = options.wickColor;
  }
}
var LastPriceAnimationMode;
(function(LastPriceAnimationMode2) {
  LastPriceAnimationMode2[LastPriceAnimationMode2["Disabled"] = 0] = "Disabled";
  LastPriceAnimationMode2[LastPriceAnimationMode2["Continuous"] = 1] = "Continuous";
  LastPriceAnimationMode2[LastPriceAnimationMode2["OnDataUpdate"] = 2] = "OnDataUpdate";
})(LastPriceAnimationMode || (LastPriceAnimationMode = {}));
function precisionByMinMove(minMove) {
  if (minMove >= 1) {
    return 0;
  }
  let i = 0;
  for (; i < 8; i++) {
    const intPart = Math.round(minMove);
    const fractPart = Math.abs(intPart - minMove);
    if (fractPart < 1e-8) {
      return i;
    }
    minMove = minMove * 10;
  }
  return i;
}
var PriceLineSource;
(function(PriceLineSource2) {
  PriceLineSource2[PriceLineSource2["LastBar"] = 0] = "LastBar";
  PriceLineSource2[PriceLineSource2["LastVisible"] = 1] = "LastVisible";
})(PriceLineSource || (PriceLineSource = {}));
var ColorType;
(function(ColorType2) {
  ColorType2["Solid"] = "solid";
  ColorType2["VerticalGradient"] = "gradient";
})(ColorType || (ColorType = {}));
function isBusinessDay(time) {
  return !isNumber(time) && !isString(time);
}
function isUTCTimestamp(time) {
  return isNumber(time);
}
var TickMarkType;
(function(TickMarkType2) {
  TickMarkType2[TickMarkType2["Year"] = 0] = "Year";
  TickMarkType2[TickMarkType2["Month"] = 1] = "Month";
  TickMarkType2[TickMarkType2["DayOfMonth"] = 2] = "DayOfMonth";
  TickMarkType2[TickMarkType2["Time"] = 3] = "Time";
  TickMarkType2[TickMarkType2["TimeWithSeconds"] = 4] = "TimeWithSeconds";
})(TickMarkType || (TickMarkType = {}));
var getMonth = (date) => date.getUTCMonth() + 1;
var getDay = (date) => date.getUTCDate();
var getYear = (date) => date.getUTCFullYear();
var dd = (date) => numberToStringWithLeadingZero(getDay(date), 2);
var MMMM = (date, locale) => new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).toLocaleString(locale, { month: "long" });
var MMM = (date, locale) => new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).toLocaleString(locale, { month: "short" });
var MM = (date) => numberToStringWithLeadingZero(getMonth(date), 2);
var yy = (date) => numberToStringWithLeadingZero(getYear(date) % 100, 2);
var yyyy = (date) => numberToStringWithLeadingZero(getYear(date), 4);
function formatDate(date, format, locale) {
  return format.replace(/yyyy/g, yyyy(date)).replace(/yy/g, yy(date)).replace(/MMMM/g, MMMM(date, locale)).replace(/MMM/g, MMM(date, locale)).replace(/MM/g, MM(date)).replace(/dd/g, dd(date));
}
var DateFormatter = class {
  constructor(dateFormat = "yyyy-MM-dd", locale = "default") {
    this._private__dateFormat = dateFormat;
    this._private__locale = locale;
  }
  _internal_format(date) {
    return formatDate(date, this._private__dateFormat, this._private__locale);
  }
};
var TimeFormatter = class {
  constructor(format) {
    this._private__formatStr = format || "%h:%m:%s";
  }
  _internal_format(date) {
    return this._private__formatStr.replace("%h", numberToStringWithLeadingZero(date.getUTCHours(), 2)).replace("%m", numberToStringWithLeadingZero(date.getUTCMinutes(), 2)).replace("%s", numberToStringWithLeadingZero(date.getUTCSeconds(), 2));
  }
};
var defaultParams = {
  _internal_dateFormat: "yyyy-MM-dd",
  _internal_timeFormat: "%h:%m:%s",
  _internal_dateTimeSeparator: " ",
  _internal_locale: "default"
};
var DateTimeFormatter = class {
  constructor(params = {}) {
    const formatterParams = { ...defaultParams, ...params };
    this._private__dateFormatter = new DateFormatter(formatterParams._internal_dateFormat, formatterParams._internal_locale);
    this._private__timeFormatter = new TimeFormatter(formatterParams._internal_timeFormat);
    this._private__separator = formatterParams._internal_dateTimeSeparator;
  }
  _internal_format(dateTime) {
    return `${this._private__dateFormatter._internal_format(dateTime)}${this._private__separator}${this._private__timeFormatter._internal_format(dateTime)}`;
  }
};
function defaultTickMarkFormatter(timePoint, tickMarkType, locale) {
  const formatOptions = {};
  switch (tickMarkType) {
    case 0:
      formatOptions.year = "numeric";
      break;
    case 1:
      formatOptions.month = "short";
      break;
    case 2:
      formatOptions.day = "numeric";
      break;
    case 3:
      formatOptions.hour12 = false;
      formatOptions.hour = "2-digit";
      formatOptions.minute = "2-digit";
      break;
    case 4:
      formatOptions.hour12 = false;
      formatOptions.hour = "2-digit";
      formatOptions.minute = "2-digit";
      formatOptions.second = "2-digit";
      break;
  }
  const date = timePoint._internal_businessDay === void 0 ? new Date(timePoint._internal_timestamp * 1e3) : new Date(Date.UTC(timePoint._internal_businessDay.year, timePoint._internal_businessDay.month - 1, timePoint._internal_businessDay.day));
  const localDateFromUtc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  return localDateFromUtc.toLocaleString(locale, formatOptions);
}
function hours(count) {
  return count * 60 * 60 * 1e3;
}
function minutes(count) {
  return count * 60 * 1e3;
}
function seconds(count) {
  return count * 1e3;
}
var intradayWeightDivisors = [
  {
    _internal_divisor: seconds(1),
    _internal_weight: 10
    /* TickMarkWeight.Second */
  },
  {
    _internal_divisor: minutes(1),
    _internal_weight: 20
    /* TickMarkWeight.Minute1 */
  },
  {
    _internal_divisor: minutes(5),
    _internal_weight: 21
    /* TickMarkWeight.Minute5 */
  },
  {
    _internal_divisor: minutes(30),
    _internal_weight: 22
    /* TickMarkWeight.Minute30 */
  },
  {
    _internal_divisor: hours(1),
    _internal_weight: 30
    /* TickMarkWeight.Hour1 */
  },
  {
    _internal_divisor: hours(3),
    _internal_weight: 31
    /* TickMarkWeight.Hour3 */
  },
  {
    _internal_divisor: hours(6),
    _internal_weight: 32
    /* TickMarkWeight.Hour6 */
  },
  {
    _internal_divisor: hours(12),
    _internal_weight: 33
    /* TickMarkWeight.Hour12 */
  }
];
function weightByTime(currentDate, prevDate) {
  if (currentDate.getUTCFullYear() !== prevDate.getUTCFullYear()) {
    return 70;
  } else if (currentDate.getUTCMonth() !== prevDate.getUTCMonth()) {
    return 60;
  } else if (currentDate.getUTCDate() !== prevDate.getUTCDate()) {
    return 50;
  }
  for (let i = intradayWeightDivisors.length - 1; i >= 0; --i) {
    if (Math.floor(prevDate.getTime() / intradayWeightDivisors[i]._internal_divisor) !== Math.floor(currentDate.getTime() / intradayWeightDivisors[i]._internal_divisor)) {
      return intradayWeightDivisors[i]._internal_weight;
    }
  }
  return 0;
}
function cast(t2) {
  return t2;
}
function fillWeightsForPoints(sortedTimePoints, startIndex = 0) {
  if (sortedTimePoints.length === 0) {
    return;
  }
  let prevTime = startIndex === 0 ? null : cast(sortedTimePoints[startIndex - 1].time)._internal_timestamp;
  let prevDate = prevTime !== null ? new Date(prevTime * 1e3) : null;
  let totalTimeDiff = 0;
  for (let index = startIndex; index < sortedTimePoints.length; ++index) {
    const currentPoint = sortedTimePoints[index];
    const currentDate = new Date(cast(currentPoint.time)._internal_timestamp * 1e3);
    if (prevDate !== null) {
      currentPoint.timeWeight = weightByTime(currentDate, prevDate);
    }
    totalTimeDiff += cast(currentPoint.time)._internal_timestamp - (prevTime || cast(currentPoint.time)._internal_timestamp);
    prevTime = cast(currentPoint.time)._internal_timestamp;
    prevDate = currentDate;
  }
  if (startIndex === 0 && sortedTimePoints.length > 1) {
    const averageTimeDiff = Math.ceil(totalTimeDiff / (sortedTimePoints.length - 1));
    const approxPrevDate = new Date((cast(sortedTimePoints[0].time)._internal_timestamp - averageTimeDiff) * 1e3);
    sortedTimePoints[0].timeWeight = weightByTime(new Date(cast(sortedTimePoints[0].time)._internal_timestamp * 1e3), approxPrevDate);
  }
}
function businessDayConverter(time) {
  let businessDay = time;
  if (isString(time)) {
    businessDay = stringToBusinessDay(time);
  }
  if (!isBusinessDay(businessDay)) {
    throw new Error("time must be of type BusinessDay");
  }
  const date = new Date(Date.UTC(businessDay.year, businessDay.month - 1, businessDay.day, 0, 0, 0, 0));
  return {
    _internal_timestamp: Math.round(date.getTime() / 1e3),
    _internal_businessDay: businessDay
  };
}
function timestampConverter(time) {
  if (!isUTCTimestamp(time)) {
    throw new Error("time must be of type isUTCTimestamp");
  }
  return {
    _internal_timestamp: time
  };
}
function selectTimeConverter(data) {
  if (data.length === 0) {
    return null;
  }
  if (isBusinessDay(data[0].time) || isString(data[0].time)) {
    return businessDayConverter;
  }
  return timestampConverter;
}
var validDateRegex = /^\d\d\d\d-\d\d-\d\d$/;
function convertTime(time) {
  if (isUTCTimestamp(time)) {
    return timestampConverter(time);
  }
  if (!isBusinessDay(time)) {
    return businessDayConverter(stringToBusinessDay(time));
  }
  return businessDayConverter(time);
}
function stringToBusinessDay(value) {
  {
    if (!validDateRegex.test(value)) {
      throw new Error(`Invalid date string=${value}, expected format=yyyy-mm-dd`);
    }
  }
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string=${value}, expected format=yyyy-mm-dd`);
  }
  return {
    day: d.getUTCDate(),
    month: d.getUTCMonth() + 1,
    year: d.getUTCFullYear()
  };
}
function convertStringToBusinessDay(value) {
  if (isString(value.time)) {
    value.time = stringToBusinessDay(value.time);
  }
}
function convertStringsToBusinessDays(data) {
  return data.forEach(convertStringToBusinessDay);
}
function weightToTickMarkType(weight, timeVisible, secondsVisible) {
  switch (weight) {
    case 0:
    case 10:
      return timeVisible ? secondsVisible ? 4 : 3 : 2;
    case 20:
    case 21:
    case 22:
    case 30:
    case 31:
    case 32:
    case 33:
      return timeVisible ? 3 : 2;
    case 50:
      return 2;
    case 60:
      return 1;
    case 70:
      return 0;
  }
}
var HorzScaleBehaviorTime = class {
  options() {
    return this._private__options;
  }
  setOptions(options) {
    this._private__options = options;
    this.updateFormatter(options.localization);
  }
  preprocessData(data) {
    if (Array.isArray(data)) {
      convertStringsToBusinessDays(data);
    } else {
      convertStringToBusinessDay(data);
    }
  }
  createConverterToInternalObj(data) {
    return ensureNotNull(selectTimeConverter(data));
  }
  key(item) {
    if (typeof item === "object" && "_internal_timestamp" in item) {
      return item._internal_timestamp;
    } else {
      return this.key(this.convertHorzItemToInternal(item));
    }
  }
  cacheKey(item) {
    const time = item;
    return time._internal_businessDay === void 0 ? new Date(time._internal_timestamp * 1e3).getTime() : new Date(Date.UTC(time._internal_businessDay.year, time._internal_businessDay.month - 1, time._internal_businessDay.day)).getTime();
  }
  convertHorzItemToInternal(item) {
    return convertTime(item);
  }
  updateFormatter(options) {
    if (!this._private__options) {
      return;
    }
    const dateFormat = options.dateFormat;
    if (this._private__options.timeScale.timeVisible) {
      this._private__dateTimeFormatter = new DateTimeFormatter({
        _internal_dateFormat: dateFormat,
        _internal_timeFormat: this._private__options.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
        _internal_dateTimeSeparator: "   ",
        _internal_locale: options.locale
      });
    } else {
      this._private__dateTimeFormatter = new DateFormatter(dateFormat, options.locale);
    }
  }
  formatHorzItem(item) {
    const tp = item;
    return this._private__dateTimeFormatter._internal_format(new Date(tp._internal_timestamp * 1e3));
  }
  formatTickmark(tickMark, localizationOptions) {
    const tickMarkType = weightToTickMarkType(tickMark.weight, this._private__options.timeScale.timeVisible, this._private__options.timeScale.secondsVisible);
    const options = this._private__options.timeScale;
    if (options.tickMarkFormatter !== void 0) {
      const tickMarkString = options.tickMarkFormatter(tickMark.originalTime, tickMarkType, localizationOptions.locale);
      if (tickMarkString !== null) {
        return tickMarkString;
      }
    }
    return defaultTickMarkFormatter(tickMark.time, tickMarkType, localizationOptions.locale);
  }
  maxTickMarkWeight(tickMarks) {
    let maxWeight = tickMarks.reduce(markWithGreaterWeight$2, tickMarks[0]).weight;
    if (maxWeight > 30 && maxWeight < 50) {
      maxWeight = 30;
    }
    return maxWeight;
  }
  fillWeightsForPoints(sortedTimePoints, startIndex) {
    fillWeightsForPoints(sortedTimePoints, startIndex);
  }
  static _internal_applyDefaults(options) {
    return merge({ localization: { dateFormat: "dd MMM 'yy" } }, options ?? {});
  }
};
var isRunningOnClientSide = typeof window !== "undefined";
function isFF() {
  if (!isRunningOnClientSide) {
    return false;
  }
  return window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}
function isIOS() {
  if (!isRunningOnClientSide) {
    return false;
  }
  return /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function isChrome() {
  if (!isRunningOnClientSide) {
    return false;
  }
  return window.chrome !== void 0;
}
function isWindows() {
  if (!isRunningOnClientSide) {
    return false;
  }
  if (navigator?.userAgentData?.platform) {
    return navigator.userAgentData.platform === "Windows";
  }
  return navigator.userAgent.toLowerCase().indexOf("win") >= 0;
}
function isChromiumBased() {
  if (!isRunningOnClientSide) {
    return false;
  }
  if (!navigator.userAgentData) {
    return false;
  }
  return navigator.userAgentData.brands.some((brand) => {
    return brand.brand.includes("Chromium");
  });
}
function warn(msg) {
  {
    console.warn(msg);
  }
}
function hoveredTargetSourceKind(source, itemType) {
  if (source instanceof Pane) {
    return "pane-primitive";
  }
  if (itemType === "marker" || itemType === "primitive") {
    return "series-primitive";
  }
  return "series";
}
function hoveredTargetObjectKind(itemType, objectId) {
  switch (itemType) {
    case "custom":
      return objectId !== void 0 ? "custom-object" : "series";
    case "price-line":
      return "custom-price-line";
    case "marker":
      return "series-marker";
    case "primitive":
      return "primitive";
    case "series-point":
    case "series-line":
    case "series-range":
    default:
      return "series";
  }
}
function buildHoveredEventInfo(hoveredSource, paneIndex) {
  const hoveredSeries = hoveredSource !== null && hoveredSource._internal_source instanceof Series ? hoveredSource._internal_source : void 0;
  const hoveredObject = hoveredSource?._internal_object?._internal_externalId;
  const normalizedPaneIndex = paneIndex !== void 0 && paneIndex !== -1 ? paneIndex : void 0;
  if (hoveredSource === null || hoveredSource._internal_itemType === void 0) {
    return {
      _internal_hoveredSeries: hoveredSeries,
      _internal_hoveredObject: hoveredObject
    };
  }
  const hoveredInfo = {
    _internal_type: hoveredSource._internal_itemType,
    _internal_sourceKind: hoveredTargetSourceKind(hoveredSource._internal_source, hoveredSource._internal_itemType),
    _internal_objectKind: hoveredTargetObjectKind(hoveredSource._internal_itemType, hoveredObject),
    _internal_series: hoveredSeries,
    _internal_objectId: hoveredObject,
    _internal_paneIndex: normalizedPaneIndex
  };
  return {
    _internal_hoveredSeries: hoveredSeries,
    _internal_hoveredObject: hoveredObject,
    _internal_hoveredInfo: hoveredInfo
  };
}
function suggestChartSize(originalSize) {
  const integerWidth = Math.floor(originalSize.width);
  const integerHeight = Math.floor(originalSize.height);
  const width = integerWidth - integerWidth % 2;
  const height = integerHeight - integerHeight % 2;
  return size({ width, height });
}
function suggestTimeScaleHeight(originalHeight) {
  return originalHeight + originalHeight % 2;
}
function suggestPriceScaleWidth(originalWidth) {
  return originalWidth + originalWidth % 2;
}
function preventScrollByWheelClick(el) {
  if (!isChrome()) {
    return;
  }
  el.addEventListener("mousedown", (e) => {
    if (e.button === 1) {
      e.preventDefault();
      return false;
    }
    return void 0;
  });
}
var MouseEventHandler = class {
  constructor(target, handler, options) {
    this._private__clickCount = 0;
    this._private__clickTimeoutId = null;
    this._private__clickPosition = { _internal_x: Number.NEGATIVE_INFINITY, _internal_y: Number.POSITIVE_INFINITY };
    this._private__tapCount = 0;
    this._private__tapTimeoutId = null;
    this._private__tapPosition = { _internal_x: Number.NEGATIVE_INFINITY, _internal_y: Number.POSITIVE_INFINITY };
    this._private__longTapTimeoutId = null;
    this._private__longTapActive = false;
    this._private__mouseMoveStartPosition = null;
    this._private__touchMoveStartPosition = null;
    this._private__touchMoveExceededManhattanDistance = false;
    this._private__cancelClick = false;
    this._private__cancelTap = false;
    this._private__unsubscribeOutsideMouseEvents = null;
    this._private__unsubscribeOutsideTouchEvents = null;
    this._private__unsubscribeMobileSafariEvents = null;
    this._private__unsubscribeMousemove = null;
    this._private__unsubscribeRootMouseEvents = null;
    this._private__unsubscribeRootTouchEvents = null;
    this._private__startPinchMiddlePoint = null;
    this._private__startPinchDistance = 0;
    this._private__pinchPrevented = false;
    this._private__preventTouchDragProcess = false;
    this._private__mousePressed = false;
    this._private__lastTouchEventTimeStamp = 0;
    this._private__activeTouchId = null;
    this._private__acceptMouseLeave = !isIOS();
    this._private__onFirefoxOutsideMouseUp = (mouseUpEvent) => {
      this._private__mouseUpHandler(mouseUpEvent);
    };
    this._private__onMobileSafariDoubleClick = (dblClickEvent) => {
      if (this._private__firesTouchEvents(dblClickEvent)) {
        const compatEvent = this._private__makeCompatEvent(dblClickEvent);
        ++this._private__tapCount;
        if (this._private__tapTimeoutId && this._private__tapCount > 1) {
          const { _internal_manhattanDistance: manhattanDistance } = this._private__touchMouseMoveWithDownInfo(getPosition(dblClickEvent), this._private__tapPosition);
          if (manhattanDistance < 30 && !this._private__cancelTap) {
            this._private__processTouchEvent(compatEvent, this._private__handler._internal_doubleTapEvent);
          }
          this._private__resetTapTimeout();
        }
      } else {
        const compatEvent = this._private__makeCompatEvent(dblClickEvent);
        ++this._private__clickCount;
        if (this._private__clickTimeoutId && this._private__clickCount > 1) {
          const { _internal_manhattanDistance: manhattanDistance } = this._private__touchMouseMoveWithDownInfo(getPosition(dblClickEvent), this._private__clickPosition);
          if (manhattanDistance < 5 && !this._private__cancelClick) {
            this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseDoubleClickEvent);
          }
          this._private__resetClickTimeout();
        }
      }
    };
    this._private__target = target;
    this._private__handler = handler;
    this._private__options = options;
    this._private__init();
  }
  _internal_destroy() {
    if (this._private__unsubscribeOutsideMouseEvents !== null) {
      this._private__unsubscribeOutsideMouseEvents();
      this._private__unsubscribeOutsideMouseEvents = null;
    }
    if (this._private__unsubscribeOutsideTouchEvents !== null) {
      this._private__unsubscribeOutsideTouchEvents();
      this._private__unsubscribeOutsideTouchEvents = null;
    }
    if (this._private__unsubscribeMousemove !== null) {
      this._private__unsubscribeMousemove();
      this._private__unsubscribeMousemove = null;
    }
    if (this._private__unsubscribeRootMouseEvents !== null) {
      this._private__unsubscribeRootMouseEvents();
      this._private__unsubscribeRootMouseEvents = null;
    }
    if (this._private__unsubscribeRootTouchEvents !== null) {
      this._private__unsubscribeRootTouchEvents();
      this._private__unsubscribeRootTouchEvents = null;
    }
    if (this._private__unsubscribeMobileSafariEvents !== null) {
      this._private__unsubscribeMobileSafariEvents();
      this._private__unsubscribeMobileSafariEvents = null;
    }
    this._private__clearLongTapTimeout();
    this._private__resetClickTimeout();
  }
  _private__mouseEnterHandler(enterEvent) {
    if (this._private__unsubscribeMousemove) {
      this._private__unsubscribeMousemove();
    }
    const boundMouseMoveHandler = this._private__mouseMoveHandler.bind(this);
    this._private__unsubscribeMousemove = () => {
      this._private__target.removeEventListener("mousemove", boundMouseMoveHandler);
    };
    this._private__target.addEventListener("mousemove", boundMouseMoveHandler);
    if (this._private__firesTouchEvents(enterEvent)) {
      return;
    }
    const compatEvent = this._private__makeCompatEvent(enterEvent);
    this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseEnterEvent);
    this._private__acceptMouseLeave = true;
  }
  _private__resetClickTimeout() {
    if (this._private__clickTimeoutId !== null) {
      clearTimeout(this._private__clickTimeoutId);
    }
    this._private__clickCount = 0;
    this._private__clickTimeoutId = null;
    this._private__clickPosition = { _internal_x: Number.NEGATIVE_INFINITY, _internal_y: Number.POSITIVE_INFINITY };
  }
  _private__resetTapTimeout() {
    if (this._private__tapTimeoutId !== null) {
      clearTimeout(this._private__tapTimeoutId);
    }
    this._private__tapCount = 0;
    this._private__tapTimeoutId = null;
    this._private__tapPosition = { _internal_x: Number.NEGATIVE_INFINITY, _internal_y: Number.POSITIVE_INFINITY };
  }
  _private__mouseMoveHandler(moveEvent) {
    if (this._private__mousePressed || this._private__touchMoveStartPosition !== null) {
      return;
    }
    if (this._private__firesTouchEvents(moveEvent)) {
      return;
    }
    const compatEvent = this._private__makeCompatEvent(moveEvent);
    this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseMoveEvent);
    this._private__acceptMouseLeave = true;
  }
  _private__touchMoveHandler(moveEvent) {
    const touch = touchWithId(moveEvent.changedTouches, ensureNotNull(this._private__activeTouchId));
    if (touch === null) {
      return;
    }
    this._private__lastTouchEventTimeStamp = eventTimeStamp(moveEvent);
    if (this._private__startPinchMiddlePoint !== null) {
      return;
    }
    if (this._private__preventTouchDragProcess) {
      return;
    }
    this._private__pinchPrevented = true;
    const moveInfo = this._private__touchMouseMoveWithDownInfo(getPosition(touch), ensureNotNull(this._private__touchMoveStartPosition));
    const { _internal_xOffset: xOffset, _internal_yOffset: yOffset, _internal_manhattanDistance: manhattanDistance } = moveInfo;
    if (!this._private__touchMoveExceededManhattanDistance && manhattanDistance < 5) {
      return;
    }
    if (!this._private__touchMoveExceededManhattanDistance) {
      const correctedXOffset = xOffset * 0.5;
      const isVertDrag = yOffset >= correctedXOffset && !this._private__options._internal_treatVertTouchDragAsPageScroll();
      const isHorzDrag = correctedXOffset > yOffset && !this._private__options._internal_treatHorzTouchDragAsPageScroll();
      if (!isVertDrag && !isHorzDrag) {
        this._private__preventTouchDragProcess = true;
      }
      this._private__touchMoveExceededManhattanDistance = true;
      this._private__cancelTap = true;
      this._private__clearLongTapTimeout();
      this._private__resetTapTimeout();
    }
    if (!this._private__preventTouchDragProcess) {
      const compatEvent = this._private__makeCompatEvent(moveEvent, touch);
      this._private__processTouchEvent(compatEvent, this._private__handler._internal_touchMoveEvent);
      preventDefault(moveEvent);
    }
  }
  _private__mouseMoveWithDownHandler(moveEvent) {
    if (moveEvent.button !== 0) {
      return;
    }
    const moveInfo = this._private__touchMouseMoveWithDownInfo(getPosition(moveEvent), ensureNotNull(this._private__mouseMoveStartPosition));
    const { _internal_manhattanDistance: manhattanDistance } = moveInfo;
    if (manhattanDistance >= 5) {
      this._private__cancelClick = true;
      this._private__resetClickTimeout();
    }
    if (this._private__cancelClick) {
      const compatEvent = this._private__makeCompatEvent(moveEvent);
      this._private__processMouseEvent(compatEvent, this._private__handler._internal_pressedMouseMoveEvent);
    }
  }
  _private__touchMouseMoveWithDownInfo(currentPosition, startPosition) {
    const xOffset = Math.abs(startPosition._internal_x - currentPosition._internal_x);
    const yOffset = Math.abs(startPosition._internal_y - currentPosition._internal_y);
    const manhattanDistance = xOffset + yOffset;
    return {
      _internal_xOffset: xOffset,
      _internal_yOffset: yOffset,
      _internal_manhattanDistance: manhattanDistance
    };
  }
  // eslint-disable-next-line complexity
  _private__touchEndHandler(touchEndEvent) {
    let touch = touchWithId(touchEndEvent.changedTouches, ensureNotNull(this._private__activeTouchId));
    if (touch === null && touchEndEvent.touches.length === 0) {
      touch = touchEndEvent.changedTouches[0];
    }
    if (touch === null) {
      return;
    }
    this._private__activeTouchId = null;
    this._private__lastTouchEventTimeStamp = eventTimeStamp(touchEndEvent);
    this._private__clearLongTapTimeout();
    this._private__touchMoveStartPosition = null;
    if (this._private__unsubscribeRootTouchEvents) {
      this._private__unsubscribeRootTouchEvents();
      this._private__unsubscribeRootTouchEvents = null;
    }
    const compatEvent = this._private__makeCompatEvent(touchEndEvent, touch);
    this._private__processTouchEvent(compatEvent, this._private__handler._internal_touchEndEvent);
    ++this._private__tapCount;
    if (this._private__tapTimeoutId && this._private__tapCount > 1) {
      const { _internal_manhattanDistance: manhattanDistance } = this._private__touchMouseMoveWithDownInfo(getPosition(touch), this._private__tapPosition);
      if (manhattanDistance < 30 && !this._private__cancelTap) {
        this._private__processTouchEvent(compatEvent, this._private__handler._internal_doubleTapEvent);
      }
      this._private__resetTapTimeout();
    } else {
      if (!this._private__cancelTap) {
        this._private__processTouchEvent(compatEvent, this._private__handler._internal_tapEvent);
        if (this._private__handler._internal_tapEvent) {
          preventDefault(touchEndEvent);
        }
      }
    }
    if (this._private__tapCount === 0) {
      preventDefault(touchEndEvent);
    }
    if (touchEndEvent.touches.length === 0) {
      if (this._private__longTapActive) {
        this._private__longTapActive = false;
        preventDefault(touchEndEvent);
      }
    }
  }
  _private__mouseUpHandler(mouseUpEvent) {
    if (mouseUpEvent.button !== 0) {
      return;
    }
    const compatEvent = this._private__makeCompatEvent(mouseUpEvent);
    this._private__mouseMoveStartPosition = null;
    this._private__mousePressed = false;
    if (this._private__unsubscribeRootMouseEvents) {
      this._private__unsubscribeRootMouseEvents();
      this._private__unsubscribeRootMouseEvents = null;
    }
    if (isFF()) {
      const rootElement = this._private__target.ownerDocument.documentElement;
      rootElement.removeEventListener("mouseleave", this._private__onFirefoxOutsideMouseUp);
    }
    if (this._private__firesTouchEvents(mouseUpEvent)) {
      return;
    }
    this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseUpEvent);
    ++this._private__clickCount;
    if (this._private__clickTimeoutId && this._private__clickCount > 1) {
      const { _internal_manhattanDistance: manhattanDistance } = this._private__touchMouseMoveWithDownInfo(getPosition(mouseUpEvent), this._private__clickPosition);
      if (manhattanDistance < 5 && !this._private__cancelClick) {
        this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseDoubleClickEvent);
      }
      this._private__resetClickTimeout();
    } else {
      if (!this._private__cancelClick) {
        this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseClickEvent);
      }
    }
  }
  _private__clearLongTapTimeout() {
    if (this._private__longTapTimeoutId === null) {
      return;
    }
    clearTimeout(this._private__longTapTimeoutId);
    this._private__longTapTimeoutId = null;
  }
  _private__touchStartHandler(downEvent) {
    if (this._private__activeTouchId !== null) {
      return;
    }
    const touch = downEvent.changedTouches[0];
    this._private__activeTouchId = touch.identifier;
    this._private__lastTouchEventTimeStamp = eventTimeStamp(downEvent);
    const rootElement = this._private__target.ownerDocument.documentElement;
    this._private__cancelTap = false;
    this._private__touchMoveExceededManhattanDistance = false;
    this._private__preventTouchDragProcess = false;
    this._private__touchMoveStartPosition = getPosition(touch);
    if (this._private__unsubscribeRootTouchEvents) {
      this._private__unsubscribeRootTouchEvents();
      this._private__unsubscribeRootTouchEvents = null;
    }
    {
      const boundTouchMoveWithDownHandler = this._private__touchMoveHandler.bind(this);
      const boundTouchEndHandler = this._private__touchEndHandler.bind(this);
      this._private__unsubscribeRootTouchEvents = () => {
        rootElement.removeEventListener("touchmove", boundTouchMoveWithDownHandler);
        rootElement.removeEventListener("touchend", boundTouchEndHandler);
      };
      rootElement.addEventListener("touchmove", boundTouchMoveWithDownHandler, { passive: false });
      rootElement.addEventListener("touchend", boundTouchEndHandler, { passive: false });
      this._private__clearLongTapTimeout();
      this._private__longTapTimeoutId = setTimeout(
        this._private__longTapHandler.bind(this, downEvent),
        240
        /* Delay.LongTap */
      );
    }
    const compatEvent = this._private__makeCompatEvent(downEvent, touch);
    this._private__processTouchEvent(compatEvent, this._private__handler._internal_touchStartEvent);
    if (!this._private__tapTimeoutId) {
      this._private__tapCount = 0;
      this._private__tapTimeoutId = setTimeout(
        this._private__resetTapTimeout.bind(this),
        500
        /* Delay.ResetClick */
      );
      this._private__tapPosition = getPosition(touch);
    }
  }
  _private__mouseDownHandler(downEvent) {
    if (downEvent.button !== 0) {
      return;
    }
    const rootElement = this._private__target.ownerDocument.documentElement;
    if (isFF()) {
      rootElement.addEventListener("mouseleave", this._private__onFirefoxOutsideMouseUp);
    }
    this._private__cancelClick = false;
    this._private__mouseMoveStartPosition = getPosition(downEvent);
    if (this._private__unsubscribeRootMouseEvents) {
      this._private__unsubscribeRootMouseEvents();
      this._private__unsubscribeRootMouseEvents = null;
    }
    {
      const boundMouseMoveWithDownHandler = this._private__mouseMoveWithDownHandler.bind(this);
      const boundMouseUpHandler = this._private__mouseUpHandler.bind(this);
      this._private__unsubscribeRootMouseEvents = () => {
        rootElement.removeEventListener("mousemove", boundMouseMoveWithDownHandler);
        rootElement.removeEventListener("mouseup", boundMouseUpHandler);
      };
      rootElement.addEventListener("mousemove", boundMouseMoveWithDownHandler);
      rootElement.addEventListener("mouseup", boundMouseUpHandler);
    }
    this._private__mousePressed = true;
    if (this._private__firesTouchEvents(downEvent)) {
      return;
    }
    const compatEvent = this._private__makeCompatEvent(downEvent);
    this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseDownEvent);
    if (!this._private__clickTimeoutId) {
      this._private__clickCount = 0;
      this._private__clickTimeoutId = setTimeout(
        this._private__resetClickTimeout.bind(this),
        500
        /* Delay.ResetClick */
      );
      this._private__clickPosition = getPosition(downEvent);
    }
  }
  _private__init() {
    this._private__target.addEventListener("mouseenter", this._private__mouseEnterHandler.bind(this));
    this._private__target.addEventListener("touchcancel", this._private__clearLongTapTimeout.bind(this));
    {
      const doc = this._private__target.ownerDocument;
      const outsideHandler = (event) => {
        if (!this._private__handler._internal_mouseDownOutsideEvent) {
          return;
        }
        if (event.composed && this._private__target.contains(event.composedPath()[0])) {
          return;
        }
        if (event.target && this._private__target.contains(event.target)) {
          return;
        }
        this._private__handler._internal_mouseDownOutsideEvent();
      };
      this._private__unsubscribeOutsideTouchEvents = () => {
        doc.removeEventListener("touchstart", outsideHandler);
      };
      this._private__unsubscribeOutsideMouseEvents = () => {
        doc.removeEventListener("mousedown", outsideHandler);
      };
      doc.addEventListener("mousedown", outsideHandler);
      doc.addEventListener("touchstart", outsideHandler, { passive: true });
    }
    if (isIOS()) {
      this._private__unsubscribeMobileSafariEvents = () => {
        this._private__target.removeEventListener("dblclick", this._private__onMobileSafariDoubleClick);
      };
      this._private__target.addEventListener("dblclick", this._private__onMobileSafariDoubleClick);
    }
    this._private__target.addEventListener("mouseleave", this._private__mouseLeaveHandler.bind(this));
    this._private__target.addEventListener("touchstart", this._private__touchStartHandler.bind(this), { passive: true });
    preventScrollByWheelClick(this._private__target);
    this._private__target.addEventListener("mousedown", this._private__mouseDownHandler.bind(this));
    this._private__initPinch();
    this._private__target.addEventListener("touchmove", () => {
    }, { passive: false });
  }
  _private__initPinch() {
    if (this._private__handler._internal_pinchStartEvent === void 0 && this._private__handler._internal_pinchEvent === void 0 && this._private__handler._internal_pinchEndEvent === void 0) {
      return;
    }
    this._private__target.addEventListener("touchstart", (event) => this._private__checkPinchState(event.touches), { passive: true });
    this._private__target.addEventListener("touchmove", (event) => {
      if (event.touches.length !== 2 || this._private__startPinchMiddlePoint === null) {
        return;
      }
      if (this._private__handler._internal_pinchEvent !== void 0) {
        const currentDistance = getDistance(event.touches[0], event.touches[1]);
        const scale = currentDistance / this._private__startPinchDistance;
        this._private__handler._internal_pinchEvent(this._private__startPinchMiddlePoint, scale);
        preventDefault(event);
      }
    }, { passive: false });
    this._private__target.addEventListener("touchend", (event) => {
      this._private__checkPinchState(event.touches);
    });
  }
  _private__checkPinchState(touches) {
    if (touches.length === 1) {
      this._private__pinchPrevented = false;
    }
    if (touches.length !== 2 || this._private__pinchPrevented || this._private__longTapActive) {
      this._private__stopPinch();
    } else {
      this._private__startPinch(touches);
    }
  }
  _private__startPinch(touches) {
    const box = getBoundingClientRect(this._private__target);
    this._private__startPinchMiddlePoint = {
      _internal_x: (touches[0].clientX - box.left + (touches[1].clientX - box.left)) / 2,
      _internal_y: (touches[0].clientY - box.top + (touches[1].clientY - box.top)) / 2
    };
    this._private__startPinchDistance = getDistance(touches[0], touches[1]);
    if (this._private__handler._internal_pinchStartEvent !== void 0) {
      this._private__handler._internal_pinchStartEvent();
    }
    this._private__clearLongTapTimeout();
  }
  _private__stopPinch() {
    if (this._private__startPinchMiddlePoint === null) {
      return;
    }
    this._private__startPinchMiddlePoint = null;
    if (this._private__handler._internal_pinchEndEvent !== void 0) {
      this._private__handler._internal_pinchEndEvent();
    }
  }
  _private__mouseLeaveHandler(event) {
    if (this._private__unsubscribeMousemove) {
      this._private__unsubscribeMousemove();
    }
    if (this._private__firesTouchEvents(event)) {
      return;
    }
    if (!this._private__acceptMouseLeave) {
      return;
    }
    const compatEvent = this._private__makeCompatEvent(event);
    this._private__processMouseEvent(compatEvent, this._private__handler._internal_mouseLeaveEvent);
    this._private__acceptMouseLeave = !isIOS();
  }
  _private__longTapHandler(event) {
    const touch = touchWithId(event.touches, ensureNotNull(this._private__activeTouchId));
    if (touch === null) {
      return;
    }
    const compatEvent = this._private__makeCompatEvent(event, touch);
    this._private__processTouchEvent(compatEvent, this._private__handler._internal_longTapEvent);
    this._private__cancelTap = true;
    this._private__longTapActive = true;
  }
  _private__firesTouchEvents(e) {
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents !== void 0) {
      return e.sourceCapabilities.firesTouchEvents;
    }
    return eventTimeStamp(e) < this._private__lastTouchEventTimeStamp + 500;
  }
  _private__processTouchEvent(event, callback) {
    if (callback) {
      callback.call(this._private__handler, event);
    }
  }
  _private__processMouseEvent(event, callback) {
    if (!callback) {
      return;
    }
    callback.call(this._private__handler, event);
  }
  _private__makeCompatEvent(event, touch) {
    const eventLike = touch || event;
    const box = this._private__target.getBoundingClientRect() || { left: 0, top: 0 };
    return {
      clientX: eventLike.clientX,
      clientY: eventLike.clientY,
      pageX: eventLike.pageX,
      pageY: eventLike.pageY,
      screenX: eventLike.screenX,
      screenY: eventLike.screenY,
      localX: eventLike.clientX - box.left,
      localY: eventLike.clientY - box.top,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      metaKey: event.metaKey,
      _internal_isTouch: !event.type.startsWith("mouse") && event.type !== "contextmenu" && event.type !== "click",
      _internal_srcType: event.type,
      _internal_target: eventLike.target,
      _internal_view: event.view,
      _internal_preventDefault: () => {
        if (event.type !== "touchstart") {
          preventDefault(event);
        }
      }
    };
  }
};
function getBoundingClientRect(element) {
  return element.getBoundingClientRect() || { left: 0, top: 0 };
}
function getDistance(p1, p2) {
  const xDiff = p1.clientX - p2.clientX;
  const yDiff = p1.clientY - p2.clientY;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function preventDefault(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
}
function getPosition(eventLike) {
  return {
    _internal_x: eventLike.pageX,
    _internal_y: eventLike.pageY
  };
}
function eventTimeStamp(e) {
  return e.timeStamp || performance.now();
}
function touchWithId(touches, id) {
  for (let i = 0; i < touches.length; ++i) {
    if (touches[i].identifier === id) {
      return touches[i];
    }
  }
  return null;
}
var PaneSeparator = class {
  constructor(chartWidget, topPaneIndex, bottomPaneIndex) {
    this._private__handle = null;
    this._private__mouseEventHandler = null;
    this._private__resizeEnabled = true;
    this._private__resizeInfo = null;
    this._private__chartWidget = chartWidget;
    this._private__topPane = chartWidget._internal_paneWidgets()[topPaneIndex];
    this._private__bottomPane = chartWidget._internal_paneWidgets()[bottomPaneIndex];
    this._private__rowElement = document.createElement("tr");
    this._private__rowElement.style.height = "1px";
    this._private__cell = document.createElement("td");
    this._private__cell.style.position = "relative";
    this._private__cell.style.padding = "0";
    this._private__cell.style.margin = "0";
    this._private__cell.setAttribute("colspan", "3");
    this._private__updateBorderColor();
    this._private__rowElement.appendChild(this._private__cell);
    this._private__resizeEnabled = this._private__chartWidget._internal_options()["layout"].panes.enableResize;
    if (!this._private__resizeEnabled) {
      this._private__handle = null;
      this._private__mouseEventHandler = null;
    } else {
      this._private__addResizableHandle();
    }
  }
  _internal_destroy() {
    if (this._private__mouseEventHandler !== null) {
      this._private__mouseEventHandler._internal_destroy();
    }
  }
  _internal_getElement() {
    return this._private__rowElement;
  }
  _internal_getSize() {
    return size({
      width: this._private__topPane._internal_getSize().width,
      height: 1
    });
  }
  _internal_getBitmapSize() {
    return size({
      width: this._private__topPane._internal_getBitmapSize().width,
      height: 1 * window.devicePixelRatio
    });
  }
  _internal_drawBitmap(ctx, x, y) {
    const bitmapSize = this._internal_getBitmapSize();
    ctx.fillStyle = this._private__chartWidget._internal_options()["layout"].panes.separatorColor;
    ctx.fillRect(x, y, bitmapSize.width, bitmapSize.height);
  }
  _internal_update() {
    this._private__updateBorderColor();
    if (this._private__chartWidget._internal_options()["layout"].panes.enableResize !== this._private__resizeEnabled) {
      this._private__resizeEnabled = this._private__chartWidget._internal_options()["layout"].panes.enableResize;
      if (this._private__resizeEnabled) {
        this._private__addResizableHandle();
      } else {
        if (this._private__handle !== null) {
          this._private__cell.removeChild(this._private__handle._internal_backgroundElement);
          this._private__cell.removeChild(this._private__handle._internal_element);
          this._private__handle = null;
        }
        if (this._private__mouseEventHandler !== null) {
          this._private__mouseEventHandler._internal_destroy();
          this._private__mouseEventHandler = null;
        }
      }
    }
  }
  _private__addResizableHandle() {
    const backgroundElement = document.createElement("div");
    const bgStyle = backgroundElement.style;
    bgStyle.position = "fixed";
    bgStyle.display = "none";
    bgStyle.zIndex = "49";
    bgStyle.top = "0";
    bgStyle.left = "0";
    bgStyle.width = "100%";
    bgStyle.height = "100%";
    bgStyle.cursor = "row-resize";
    this._private__cell.appendChild(backgroundElement);
    const element = document.createElement("div");
    const style = element.style;
    style.position = "absolute";
    style.zIndex = "50";
    style.top = "-4px";
    style.height = "9px";
    style.width = "100%";
    style.backgroundColor = "";
    style.cursor = "row-resize";
    this._private__cell.appendChild(element);
    const handlers = {
      _internal_mouseEnterEvent: this._private__mouseOverEvent.bind(this),
      _internal_mouseLeaveEvent: this._private__mouseLeaveEvent.bind(this),
      _internal_mouseDownEvent: this._private__mouseDownEvent.bind(this),
      _internal_touchStartEvent: this._private__mouseDownEvent.bind(this),
      _internal_pressedMouseMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
      _internal_touchMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
      _internal_mouseUpEvent: this._private__mouseUpEvent.bind(this),
      _internal_touchEndEvent: this._private__mouseUpEvent.bind(this)
    };
    this._private__mouseEventHandler = new MouseEventHandler(element, handlers, {
      _internal_treatVertTouchDragAsPageScroll: () => false,
      _internal_treatHorzTouchDragAsPageScroll: () => true
    });
    this._private__handle = { _internal_element: element, _internal_backgroundElement: backgroundElement };
  }
  _private__updateBorderColor() {
    this._private__cell.style.background = this._private__chartWidget._internal_options()["layout"].panes.separatorColor;
  }
  _private__mouseOverEvent(event) {
    if (this._private__handle !== null) {
      this._private__handle._internal_element.style.backgroundColor = this._private__chartWidget._internal_options()["layout"].panes.separatorHoverColor;
    }
  }
  _private__mouseLeaveEvent(event) {
    if (this._private__handle !== null && this._private__resizeInfo === null) {
      this._private__handle._internal_element.style.backgroundColor = "";
    }
  }
  _private__mouseDownEvent(event) {
    if (this._private__handle === null) {
      return;
    }
    const totalStretch = this._private__topPane._internal_state()._internal_stretchFactor() + this._private__bottomPane._internal_state()._internal_stretchFactor();
    const totalHeight = this._private__topPane._internal_getSize().height + this._private__bottomPane._internal_getSize().height;
    const pixelStretchFactor = totalStretch / totalHeight;
    const minPaneStretch = 30 * pixelStretchFactor;
    if (totalStretch <= minPaneStretch * 2) {
      return;
    }
    this._private__resizeInfo = {
      _internal_startY: event.pageY,
      _internal_prevStretchTopPane: this._private__topPane._internal_state()._internal_stretchFactor(),
      _internal_maxPaneStretch: totalStretch - minPaneStretch,
      _internal_totalStretch: totalStretch,
      _internal_pixelStretchFactor: pixelStretchFactor,
      _internal_minPaneStretch: minPaneStretch
    };
    this._private__handle._internal_backgroundElement.style.display = "block";
  }
  _private__pressedMouseMoveEvent(event) {
    const resizeInfo = this._private__resizeInfo;
    if (resizeInfo === null) {
      return;
    }
    const deltaY = event.pageY - resizeInfo._internal_startY;
    const deltaStretchFactor = deltaY * resizeInfo._internal_pixelStretchFactor;
    const upperPaneNewStretch = clamp(resizeInfo._internal_prevStretchTopPane + deltaStretchFactor, resizeInfo._internal_minPaneStretch, resizeInfo._internal_maxPaneStretch);
    this._private__topPane._internal_state()._internal_setStretchFactor(upperPaneNewStretch);
    this._private__bottomPane._internal_state()._internal_setStretchFactor(resizeInfo._internal_totalStretch - upperPaneNewStretch);
    this._private__chartWidget._internal_model()._internal_fullUpdate();
  }
  _private__mouseUpEvent(event) {
    if (this._private__resizeInfo === null || this._private__handle === null) {
      return;
    }
    this._private__resizeInfo = null;
    this._private__handle._internal_backgroundElement.style.display = "none";
  }
};
function distanceBetweenPoints(pos1, pos2) {
  return pos1._internal_position - pos2._internal_position;
}
function speedPxPerMSec(pos1, pos2, maxSpeed) {
  const speed = (pos1._internal_position - pos2._internal_position) / (pos1._internal_time - pos2._internal_time);
  return Math.sign(speed) * Math.min(Math.abs(speed), maxSpeed);
}
function durationMSec(speed, dumpingCoeff) {
  const lnDumpingCoeff = Math.log(dumpingCoeff);
  return Math.log(1 * lnDumpingCoeff / -speed) / lnDumpingCoeff;
}
var KineticAnimation = class {
  constructor(minSpeed, maxSpeed, dumpingCoeff, minMove) {
    this._private__position1 = null;
    this._private__position2 = null;
    this._private__position3 = null;
    this._private__position4 = null;
    this._private__animationStartPosition = null;
    this._private__durationMsecs = 0;
    this._private__speedPxPerMsec = 0;
    this._private__minSpeed = minSpeed;
    this._private__maxSpeed = maxSpeed;
    this._private__dumpingCoeff = dumpingCoeff;
    this._private__minMove = minMove;
  }
  _internal_addPosition(position, time) {
    if (this._private__position1 !== null) {
      if (this._private__position1._internal_time === time) {
        this._private__position1._internal_position = position;
        return;
      }
      if (Math.abs(this._private__position1._internal_position - position) < this._private__minMove) {
        return;
      }
    }
    this._private__position4 = this._private__position3;
    this._private__position3 = this._private__position2;
    this._private__position2 = this._private__position1;
    this._private__position1 = { _internal_time: time, _internal_position: position };
  }
  _internal_start(position, time) {
    if (this._private__position1 === null || this._private__position2 === null) {
      return;
    }
    if (time - this._private__position1._internal_time > 50) {
      return;
    }
    let totalDistance = 0;
    const speed1 = speedPxPerMSec(this._private__position1, this._private__position2, this._private__maxSpeed);
    const distance1 = distanceBetweenPoints(this._private__position1, this._private__position2);
    const speedItems = [speed1];
    const distanceItems = [distance1];
    totalDistance += distance1;
    if (this._private__position3 !== null) {
      const speed2 = speedPxPerMSec(this._private__position2, this._private__position3, this._private__maxSpeed);
      if (Math.sign(speed2) === Math.sign(speed1)) {
        const distance2 = distanceBetweenPoints(this._private__position2, this._private__position3);
        speedItems.push(speed2);
        distanceItems.push(distance2);
        totalDistance += distance2;
        if (this._private__position4 !== null) {
          const speed3 = speedPxPerMSec(this._private__position3, this._private__position4, this._private__maxSpeed);
          if (Math.sign(speed3) === Math.sign(speed1)) {
            const distance3 = distanceBetweenPoints(this._private__position3, this._private__position4);
            speedItems.push(speed3);
            distanceItems.push(distance3);
            totalDistance += distance3;
          }
        }
      }
    }
    let resultSpeed = 0;
    for (let i = 0; i < speedItems.length; ++i) {
      resultSpeed += distanceItems[i] / totalDistance * speedItems[i];
    }
    if (Math.abs(resultSpeed) < this._private__minSpeed) {
      return;
    }
    this._private__animationStartPosition = { _internal_position: position, _internal_time: time };
    this._private__speedPxPerMsec = resultSpeed;
    this._private__durationMsecs = durationMSec(Math.abs(resultSpeed), this._private__dumpingCoeff);
  }
  _internal_getPosition(time) {
    const startPosition = ensureNotNull(this._private__animationStartPosition);
    const durationMsecs = time - startPosition._internal_time;
    return startPosition._internal_position + this._private__speedPxPerMsec * (Math.pow(this._private__dumpingCoeff, durationMsecs) - 1) / Math.log(this._private__dumpingCoeff);
  }
  _internal_finished(time) {
    return this._private__animationStartPosition === null || this._private__progressDuration(time) === this._private__durationMsecs;
  }
  _private__progressDuration(time) {
    const startPosition = ensureNotNull(this._private__animationStartPosition);
    const progress = time - startPosition._internal_time;
    return Math.min(progress, this._private__durationMsecs);
  }
};
var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="19" fill="none"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="var(--stroke)" d="M2 0H0v10h6v9h21.4l.5-1.3 6-15 1-2.7H23.7l-.5 1.3-.2.6a5 5 0 0 0-7-.9V0H2Zm20 17h4l5.2-13 .8-2h-7l-1 2.5-.2.5-1.5 3.8-.3.7V17Zm-.8-10a3 3 0 0 0 .7-2.7A3 3 0 1 0 16.8 7h4.4ZM14 7V2H2v6h6v9h4V7h2Z"/><path fill="var(--fill)" d="M14 2H2v6h6v9h6V2Zm12 15h-7l6-15h7l-6 15Zm-7-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="var(--stroke)" d="M0 0h35v19H0z"/></clipPath></defs></svg>`;
var css = `a#tv-attr-logo{--fill:#131722;--stroke:#fff;position:absolute;left:10px;bottom:10px;height:19px;width:35px;margin:0;padding:0;border:0;z-index:3;}a#tv-attr-logo[data-dark]{--fill:#D1D4DC;--stroke:#131722;}`;
var AttributionLogoWidget = class {
  constructor(container, chart) {
    this._private__element = void 0;
    this._private__cssElement = void 0;
    this._private__theme = void 0;
    this._private__visible = false;
    this._private__container = container;
    this._private__chart = chart;
    this._private__render();
  }
  _internal_update() {
    this._private__render();
  }
  _internal_removeElement() {
    if (this._private__element) {
      this._private__container.removeChild(this._private__element);
    }
    if (this._private__cssElement) {
      this._private__container.removeChild(this._private__cssElement);
    }
    this._private__element = void 0;
    this._private__cssElement = void 0;
  }
  _private__shouldUpdate() {
    return this._private__visible !== this._private__shouldBeVisible() || this._private__theme !== this._private__themeToUse();
  }
  _private__themeToUse() {
    return this._private__chart._internal_model()._internal_colorParser()._internal_colorStringToGrayscale(this._private__chart._internal_options()["layout"].textColor) > 160 ? "dark" : "light";
  }
  _private__shouldBeVisible() {
    return this._private__chart._internal_options()["layout"].attributionLogo;
  }
  _private__getUTMSource() {
    const url = new URL(location.href);
    if (!url.hostname) {
      return "";
    }
    return "&utm_source=" + url.hostname + url.pathname;
  }
  _private__render() {
    if (!this._private__shouldUpdate()) {
      return;
    }
    this._internal_removeElement();
    this._private__visible = this._private__shouldBeVisible();
    if (this._private__visible) {
      this._private__theme = this._private__themeToUse();
      this._private__cssElement = document.createElement("style");
      this._private__cssElement.innerText = css;
      this._private__element = document.createElement("a");
      this._private__element.href = `https://www.tradingview.com/?utm_medium=lwc-link&utm_campaign=lwc-chart${this._private__getUTMSource()}`;
      this._private__element.title = "Charting by TradingView";
      this._private__element.id = "tv-attr-logo";
      this._private__element.target = "_blank";
      this._private__element.innerHTML = svg;
      this._private__element.toggleAttribute("data-dark", this._private__theme === "dark");
      this._private__container.appendChild(this._private__cssElement);
      this._private__container.appendChild(this._private__element);
    }
  }
};
function createBoundCanvas(parentElement, size3) {
  const doc = ensureNotNull(parentElement.ownerDocument);
  const canvas = doc.createElement("canvas");
  parentElement.appendChild(canvas);
  const binding = bindTo(canvas, {
    type: "device-pixel-content-box",
    options: {
      allowResizeObserver: true
    },
    transform: (bitmapSize, canvasElementClientSize) => ({
      width: Math.max(bitmapSize.width, canvasElementClientSize.width),
      height: Math.max(bitmapSize.height, canvasElementClientSize.height)
    })
  });
  binding.resizeCanvasElement(size3);
  return binding;
}
function releaseCanvas(canvas) {
  canvas.width = 1;
  canvas.height = 1;
  canvas.getContext("2d")?.clearRect(0, 0, 1, 1);
}
function drawBackground(renderer, target, isHovered, hitTestData) {
  if (renderer._internal_drawBackground) {
    renderer._internal_drawBackground(target, isHovered, hitTestData);
  }
}
function drawForeground(renderer, target, isHovered, hitTestData) {
  renderer._internal_draw(target, isHovered, hitTestData);
}
function drawSourceViews(paneViewsGetter, drawRendererFn, source, pane) {
  const views = paneViewsGetter(source, pane);
  drawPaneViews(views, drawRendererFn, pane);
}
function drawPaneViews(views, drawRendererFn, pane) {
  for (const view of views) {
    const renderer = view._internal_renderer(pane);
    if (renderer !== null) {
      drawRendererFn(renderer);
    }
  }
}
function hasPriceScale(source) {
  return source._internal_priceScale !== void 0;
}
function buildPriceAxisViewsGetter(zOrder, priceScaleId) {
  return (source) => {
    if (!hasPriceScale(source)) {
      return [];
    }
    const psId = source._internal_priceScale()?._internal_id() ?? "";
    if (psId !== priceScaleId) {
      return [];
    }
    return source._internal_pricePaneViews?.(zOrder) ?? [];
  };
}
function recalculateOverlapping(views, direction, scaleHeight, rendererOptions) {
  if (!views.length) {
    return;
  }
  let currentGroupStart = 0;
  const initLabelHeight = views[0]._internal_height(rendererOptions, true);
  let spaceBeforeCurrentGroup = direction === 1 ? scaleHeight / 2 - (views[0]._internal_getRenderCoordinate() - initLabelHeight / 2) : views[0]._internal_getRenderCoordinate() - initLabelHeight / 2 - scaleHeight / 2;
  spaceBeforeCurrentGroup = Math.max(0, spaceBeforeCurrentGroup);
  for (let i = 1; i < views.length; i++) {
    const view = views[i];
    const prev = views[i - 1];
    const height = prev._internal_height(rendererOptions, false);
    const coordinate = view._internal_getRenderCoordinate();
    const prevCoordinate = prev._internal_getRenderCoordinate();
    const overlap = direction === 1 ? coordinate > prevCoordinate - height : coordinate < prevCoordinate + height;
    if (overlap) {
      const renderCoordinate = prevCoordinate - height * direction;
      view._internal_setRenderCoordinate(renderCoordinate);
      const edgePoint = renderCoordinate - direction * height / 2;
      const outOfViewport = direction === 1 ? edgePoint < 0 : edgePoint > scaleHeight;
      if (outOfViewport && spaceBeforeCurrentGroup > 0) {
        const desiredGroupShift = direction === 1 ? -1 - edgePoint : edgePoint - scaleHeight;
        const possibleShift = Math.min(desiredGroupShift, spaceBeforeCurrentGroup);
        for (let k = currentGroupStart; k < views.length; k++) {
          views[k]._internal_setRenderCoordinate(views[k]._internal_getRenderCoordinate() + direction * possibleShift);
        }
        spaceBeforeCurrentGroup -= possibleShift;
      }
    } else {
      currentGroupStart = i;
      spaceBeforeCurrentGroup = direction === 1 ? prevCoordinate - height - coordinate : coordinate - (prevCoordinate + height);
    }
  }
}
function priceScaleCrosshairLabelVisible(crosshair) {
  return crosshair.mode !== 2 && crosshair.horzLine.visible && crosshair.horzLine.labelVisible;
}
var PriceAxisWidget = class {
  constructor(pane, options, rendererOptionsProvider, side) {
    this._private__priceScale = null;
    this._private__size = null;
    this._private__mousedown = false;
    this._private__widthCache = new TextWidthCache(200);
    this._private__font = null;
    this._private__prevOptimalWidth = 0;
    this._private__isSettingSize = false;
    this._private__canvasSuggestedBitmapSizeChangedHandler = () => {
      if (this._private__isSettingSize) {
        return;
      }
      this._private__pane._internal_chart()._internal_model()._internal_lightUpdate();
    };
    this._private__topCanvasSuggestedBitmapSizeChangedHandler = () => {
      if (this._private__isSettingSize) {
        return;
      }
      this._private__pane._internal_chart()._internal_model()._internal_lightUpdate();
    };
    this._private__pane = pane;
    this._private__options = options;
    this._private__layoutOptions = options["layout"];
    this._private__rendererOptionsProvider = rendererOptionsProvider;
    this._private__isLeft = side === "left";
    this._private__sourcePaneViews = buildPriceAxisViewsGetter("normal", side);
    this._private__sourceTopPaneViews = buildPriceAxisViewsGetter("top", side);
    this._private__sourceBottomPaneViews = buildPriceAxisViewsGetter("bottom", side);
    this._private__cell = document.createElement("div");
    this._private__cell.style.height = "100%";
    this._private__cell.style.overflow = "hidden";
    this._private__cell.style.width = "25px";
    this._private__cell.style.left = "0";
    this._private__cell.style.position = "relative";
    this._private__canvasBinding = createBoundCanvas(this._private__cell, size({ width: 16, height: 16 }));
    this._private__canvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    const canvas = this._private__canvasBinding.canvasElement;
    canvas.style.position = "absolute";
    canvas.style.zIndex = "1";
    canvas.style.left = "0";
    canvas.style.top = "0";
    this._private__topCanvasBinding = createBoundCanvas(this._private__cell, size({ width: 16, height: 16 }));
    this._private__topCanvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__topCanvasSuggestedBitmapSizeChangedHandler);
    const topCanvas = this._private__topCanvasBinding.canvasElement;
    topCanvas.style.position = "absolute";
    topCanvas.style.zIndex = "2";
    topCanvas.style.left = "0";
    topCanvas.style.top = "0";
    const handler = {
      _internal_mouseDownEvent: this._private__mouseDownEvent.bind(this),
      _internal_touchStartEvent: this._private__mouseDownEvent.bind(this),
      _internal_pressedMouseMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
      _internal_touchMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
      _internal_mouseDownOutsideEvent: this._private__mouseDownOutsideEvent.bind(this),
      _internal_mouseUpEvent: this._private__mouseUpEvent.bind(this),
      _internal_touchEndEvent: this._private__mouseUpEvent.bind(this),
      _internal_mouseDoubleClickEvent: this._private__mouseDoubleClickEvent.bind(this),
      _internal_doubleTapEvent: this._private__mouseDoubleClickEvent.bind(this),
      _internal_mouseEnterEvent: this._private__mouseEnterEvent.bind(this),
      _internal_mouseLeaveEvent: this._private__mouseLeaveEvent.bind(this)
    };
    this._private__mouseEventHandler = new MouseEventHandler(this._private__topCanvasBinding.canvasElement, handler, {
      _internal_treatVertTouchDragAsPageScroll: () => !this._private__options["handleScroll"].vertTouchDrag,
      _internal_treatHorzTouchDragAsPageScroll: () => true
    });
  }
  _internal_destroy() {
    this._private__mouseEventHandler._internal_destroy();
    this._private__topCanvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__topCanvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__topCanvasBinding.canvasElement);
    this._private__topCanvasBinding.dispose();
    this._private__canvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__canvasBinding.canvasElement);
    this._private__canvasBinding.dispose();
    if (this._private__priceScale !== null) {
      this._private__priceScale._internal_onMarksChanged()._internal_unsubscribeAll(this);
    }
    this._private__priceScale = null;
  }
  _internal_getElement() {
    return this._private__cell;
  }
  _internal_fontSize() {
    return this._private__layoutOptions.fontSize;
  }
  _internal_rendererOptions() {
    const options = this._private__rendererOptionsProvider._internal_options();
    const isFontChanged = this._private__font !== options._internal_font;
    if (isFontChanged) {
      this._private__widthCache._internal_reset();
      this._private__font = options._internal_font;
    }
    return options;
  }
  _internal_optimalWidth() {
    if (this._private__priceScale === null) {
      return 0;
    }
    let tickMarkMaxWidth = 0;
    const rendererOptions = this._internal_rendererOptions();
    const ctx = ensureNotNull(this._private__canvasBinding.canvasElement.getContext("2d", {
      colorSpace: this._private__pane._internal_chart()._internal_options().layout.colorSpace
    }));
    ctx.save();
    const tickMarks = this._private__priceScale._internal_marks();
    ctx.font = this._private__baseFont();
    if (tickMarks.length > 0) {
      tickMarkMaxWidth = Math.max(this._private__widthCache._internal_measureText(ctx, tickMarks[0]._internal_label), this._private__widthCache._internal_measureText(ctx, tickMarks[tickMarks.length - 1]._internal_label));
    }
    const views = this._private__backLabels();
    for (let j = views.length; j--; ) {
      const width = this._private__widthCache._internal_measureText(ctx, views[j]._internal_text());
      if (width > tickMarkMaxWidth) {
        tickMarkMaxWidth = width;
      }
    }
    const firstValue = this._private__priceScale._internal_firstValue();
    if (firstValue !== null && this._private__size !== null && priceScaleCrosshairLabelVisible(this._private__options.crosshair)) {
      const topValue = this._private__priceScale._internal_coordinateToPrice(1, firstValue);
      const bottomValue = this._private__priceScale._internal_coordinateToPrice(this._private__size.height - 2, firstValue);
      tickMarkMaxWidth = Math.max(tickMarkMaxWidth, this._private__widthCache._internal_measureText(ctx, this._private__priceScale._internal_formatPrice(Math.floor(Math.min(topValue, bottomValue)) + 0.11111111111111, firstValue)), this._private__widthCache._internal_measureText(ctx, this._private__priceScale._internal_formatPrice(Math.ceil(Math.max(topValue, bottomValue)) - 0.11111111111111, firstValue)));
    }
    ctx.restore();
    const resultTickMarksMaxWidth = tickMarkMaxWidth || 34;
    const res = Math.ceil(rendererOptions._internal_borderSize + rendererOptions._internal_tickLength + rendererOptions._internal_paddingInner + rendererOptions._internal_paddingOuter + 5 + resultTickMarksMaxWidth);
    return suggestPriceScaleWidth(res);
  }
  _internal_setSize(newSize) {
    if (this._private__size === null || !equalSizes(this._private__size, newSize)) {
      this._private__size = newSize;
      this._private__isSettingSize = true;
      this._private__canvasBinding.resizeCanvasElement(newSize);
      this._private__topCanvasBinding.resizeCanvasElement(newSize);
      this._private__isSettingSize = false;
      this._private__cell.style.width = `${newSize.width}px`;
      this._private__cell.style.height = `${newSize.height}px`;
    }
  }
  _internal_getWidth() {
    return ensureNotNull(this._private__size).width;
  }
  _internal_setPriceScale(priceScale) {
    if (this._private__priceScale === priceScale) {
      return;
    }
    if (this._private__priceScale !== null) {
      this._private__priceScale._internal_onMarksChanged()._internal_unsubscribeAll(this);
    }
    this._private__priceScale = priceScale;
    priceScale._internal_onMarksChanged()._internal_subscribe(this._private__onMarksChanged.bind(this), this);
  }
  _internal_priceScale() {
    return this._private__priceScale;
  }
  _internal_reset() {
    const pane = this._private__pane._internal_state();
    const model = this._private__pane._internal_chart()._internal_model();
    model._internal_resetPriceScale(pane, ensureNotNull(this._internal_priceScale()));
  }
  _internal_paint(type) {
    if (this._private__size === null) {
      return;
    }
    const canvasOptions = {
      colorSpace: this._private__pane._internal_chart()._internal_options().layout.colorSpace
    };
    if (type !== 1) {
      this._private__alignLabels();
      this._private__canvasBinding.applySuggestedBitmapSize();
      const target = tryCreateCanvasRenderingTarget2D(this._private__canvasBinding, canvasOptions);
      if (target !== null) {
        target.useBitmapCoordinateSpace((scope) => {
          this._private__drawBackground(scope);
          this._private__drawBorder(scope);
        });
        this._private__pane._internal_drawAdditionalSources(target, this._private__sourceBottomPaneViews);
        this._private__drawTickMarks(target);
        this._private__pane._internal_drawAdditionalSources(target, this._private__sourcePaneViews);
        this._private__drawBackLabels(target);
      }
    }
    this._private__topCanvasBinding.applySuggestedBitmapSize();
    const topTarget = tryCreateCanvasRenderingTarget2D(this._private__topCanvasBinding, canvasOptions);
    if (topTarget !== null) {
      topTarget.useBitmapCoordinateSpace(({ context: ctx, bitmapSize }) => {
        ctx.clearRect(0, 0, bitmapSize.width, bitmapSize.height);
      });
      this._private__drawCrosshairLabel(topTarget);
      this._private__pane._internal_drawAdditionalSources(topTarget, this._private__sourceTopPaneViews);
    }
  }
  _internal_getBitmapSize() {
    return this._private__canvasBinding.bitmapSize;
  }
  _internal_drawBitmap(ctx, x, y, addTopLayer) {
    const bitmapSize = this._internal_getBitmapSize();
    if (bitmapSize.width > 0 && bitmapSize.height > 0) {
      ctx.drawImage(this._private__canvasBinding.canvasElement, x, y);
      if (addTopLayer) {
        const topLayer = this._private__topCanvasBinding.canvasElement;
        ctx.drawImage(topLayer, x, y);
      }
    }
  }
  _internal_update() {
    this._private__priceScale?._internal_marks();
  }
  _private__mouseDownEvent(e) {
    if (this._private__priceScale === null || this._private__priceScale._internal_isEmpty() || !this._private__options["handleScale"].axisPressedMouseMove.price) {
      return;
    }
    const model = this._private__pane._internal_chart()._internal_model();
    const pane = this._private__pane._internal_state();
    this._private__mousedown = true;
    model._internal_startScalePrice(pane, this._private__priceScale, e.localY);
  }
  _private__pressedMouseMoveEvent(e) {
    if (this._private__priceScale === null || !this._private__options["handleScale"].axisPressedMouseMove.price) {
      return;
    }
    const model = this._private__pane._internal_chart()._internal_model();
    const pane = this._private__pane._internal_state();
    const priceScale = this._private__priceScale;
    model._internal_scalePriceTo(pane, priceScale, e.localY);
  }
  _private__mouseDownOutsideEvent() {
    if (this._private__priceScale === null || !this._private__options["handleScale"].axisPressedMouseMove.price) {
      return;
    }
    const model = this._private__pane._internal_chart()._internal_model();
    const pane = this._private__pane._internal_state();
    const priceScale = this._private__priceScale;
    if (this._private__mousedown) {
      this._private__mousedown = false;
      model._internal_endScalePrice(pane, priceScale);
    }
  }
  _private__mouseUpEvent(e) {
    if (this._private__priceScale === null || !this._private__options["handleScale"].axisPressedMouseMove.price) {
      return;
    }
    const model = this._private__pane._internal_chart()._internal_model();
    const pane = this._private__pane._internal_state();
    this._private__mousedown = false;
    model._internal_endScalePrice(pane, this._private__priceScale);
  }
  _private__mouseDoubleClickEvent(e) {
    if (this._private__options["handleScale"].axisDoubleClickReset.price) {
      this._internal_reset();
    }
  }
  _private__mouseEnterEvent(e) {
    if (this._private__priceScale === null) {
      return;
    }
    const model = this._private__pane._internal_chart()._internal_model();
    if (model._internal_options()["handleScale"].axisPressedMouseMove.price && !this._private__priceScale._internal_isPercentage() && !this._private__priceScale._internal_isIndexedTo100()) {
      this._private__setCursor(
        1
        /* CursorType.NsResize */
      );
    }
  }
  _private__mouseLeaveEvent(e) {
    this._private__setCursor(
      0
      /* CursorType.Default */
    );
  }
  _private__backLabels() {
    const res = [];
    const priceScale = this._private__priceScale === null ? void 0 : this._private__priceScale;
    const addViewsForSources = (sources) => {
      for (let i = 0; i < sources.length; ++i) {
        const source = sources[i];
        const views = source._internal_priceAxisViews(this._private__pane._internal_state(), priceScale);
        for (let j = 0; j < views.length; j++) {
          res.push(views[j]);
        }
      }
    };
    addViewsForSources(this._private__pane._internal_state()._internal_orderedSources());
    return res;
  }
  _private__drawBackground({ context: ctx, bitmapSize }) {
    const { width, height } = bitmapSize;
    const model = this._private__pane._internal_state()._internal_model();
    const topColor = model._internal_backgroundTopColor();
    const bottomColor = model._internal_backgroundBottomColor();
    if (topColor === bottomColor) {
      clearRect(ctx, 0, 0, width, height, topColor);
    } else {
      clearRectWithGradient(ctx, 0, 0, width, height, topColor, bottomColor);
    }
  }
  _private__drawBorder({ context: ctx, bitmapSize, horizontalPixelRatio }) {
    if (this._private__size === null || this._private__priceScale === null || !this._private__priceScale._internal_options().borderVisible) {
      return;
    }
    ctx.fillStyle = this._private__priceScale._internal_options().borderColor;
    const borderSize = Math.max(1, Math.floor(this._internal_rendererOptions()._internal_borderSize * horizontalPixelRatio));
    let left;
    if (this._private__isLeft) {
      left = bitmapSize.width - borderSize;
    } else {
      left = 0;
    }
    ctx.fillRect(left, 0, borderSize, bitmapSize.height);
  }
  _private__drawTickMarks(target) {
    if (this._private__size === null || this._private__priceScale === null) {
      return;
    }
    const tickMarks = this._private__priceScale._internal_marks();
    const priceScaleOptions = this._private__priceScale._internal_options();
    const rendererOptions = this._internal_rendererOptions();
    const tickMarkLeftX = this._private__isLeft ? this._private__size.width - rendererOptions._internal_tickLength : 0;
    if (priceScaleOptions.borderVisible && priceScaleOptions.ticksVisible) {
      target.useBitmapCoordinateSpace(({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) => {
        ctx.fillStyle = priceScaleOptions.borderColor;
        const tickHeight = Math.max(1, Math.floor(verticalPixelRatio));
        const tickOffset = Math.floor(verticalPixelRatio * 0.5);
        const tickLength = Math.round(rendererOptions._internal_tickLength * horizontalPixelRatio);
        ctx.beginPath();
        for (const tickMark of tickMarks) {
          ctx.rect(Math.floor(tickMarkLeftX * horizontalPixelRatio), Math.round(tickMark._internal_coord * verticalPixelRatio) - tickOffset, tickLength, tickHeight);
        }
        ctx.fill();
      });
    }
    target.useMediaCoordinateSpace(({ context: ctx }) => {
      ctx.font = this._private__baseFont();
      ctx.fillStyle = priceScaleOptions.textColor ?? this._private__layoutOptions.textColor;
      ctx.textAlign = this._private__isLeft ? "right" : "left";
      ctx.textBaseline = "middle";
      const textLeftX = this._private__isLeft ? Math.round(tickMarkLeftX - rendererOptions._internal_paddingInner) : Math.round(tickMarkLeftX + rendererOptions._internal_tickLength + rendererOptions._internal_paddingInner);
      const yMidCorrections = tickMarks.map((mark) => this._private__widthCache._internal_yMidCorrection(ctx, mark._internal_label));
      for (let i = tickMarks.length; i--; ) {
        const tickMark = tickMarks[i];
        ctx.fillText(tickMark._internal_label, textLeftX, tickMark._internal_coord + yMidCorrections[i]);
      }
    });
  }
  _private__alignLabels() {
    if (this._private__size === null || this._private__priceScale === null) {
      return;
    }
    let center = this._private__size.height / 2;
    const views = [];
    const orderedSources = this._private__priceScale._internal_orderedSources().slice();
    const pane = this._private__pane;
    const paneState = pane._internal_state();
    const rendererOptions = this._internal_rendererOptions();
    const isDefault = this._private__priceScale === paneState._internal_defaultVisiblePriceScale();
    if (isDefault) {
      this._private__pane._internal_state()._internal_orderedSources().forEach((source) => {
        if (paneState._internal_isOverlay(source)) {
          orderedSources.push(source);
        }
      });
    }
    const centerSource = this._private__priceScale._internal_dataSources()[0];
    const priceScale = this._private__priceScale;
    const updateForSources = (sources) => {
      sources.forEach((source) => {
        const sourceViews = source._internal_priceAxisViews(paneState, priceScale);
        sourceViews.forEach((view) => {
          if (view._internal_isVisible() && view._internal_getFixedCoordinate() === null) {
            view._internal_setRenderCoordinate(null);
            views.push(view);
          }
        });
        if (centerSource === source && sourceViews.length > 0) {
          center = sourceViews[0]._internal_coordinate();
        }
      });
    };
    updateForSources(orderedSources);
    const options = this._private__priceScale._internal_options();
    if (!options.alignLabels) {
      return;
    }
    this._private__fixLabelOverlap(views, rendererOptions, center);
  }
  _private__fixLabelOverlap(views, rendererOptions, center) {
    if (this._private__size === null) {
      return;
    }
    const top = views.filter((view) => view._internal_coordinate() <= center);
    const bottom = views.filter((view) => view._internal_coordinate() > center);
    top.sort((l, r) => r._internal_coordinate() - l._internal_coordinate());
    if (top.length && bottom.length) {
      bottom.push(top[0]);
    }
    bottom.sort((l, r) => l._internal_coordinate() - r._internal_coordinate());
    for (const view of views) {
      const halfHeight = Math.floor(view._internal_height(rendererOptions) / 2);
      const coordinate = view._internal_coordinate();
      if (coordinate > -halfHeight && coordinate < halfHeight) {
        view._internal_setRenderCoordinate(halfHeight);
      }
      if (coordinate > this._private__size.height - halfHeight && coordinate < this._private__size.height + halfHeight) {
        view._internal_setRenderCoordinate(this._private__size.height - halfHeight);
      }
    }
    recalculateOverlapping(top, 1, this._private__size.height, rendererOptions);
    recalculateOverlapping(bottom, -1, this._private__size.height, rendererOptions);
  }
  _private__drawBackLabels(target) {
    if (this._private__size === null) {
      return;
    }
    const views = this._private__backLabels();
    const rendererOptions = this._internal_rendererOptions();
    const align = this._private__isLeft ? "right" : "left";
    views.forEach((view) => {
      if (view._internal_isAxisLabelVisible()) {
        const renderer = view._internal_renderer(ensureNotNull(this._private__priceScale));
        renderer._internal_draw(target, rendererOptions, this._private__widthCache, align);
      }
    });
  }
  _private__drawCrosshairLabel(target) {
    if (this._private__size === null || this._private__priceScale === null) {
      return;
    }
    const model = this._private__pane._internal_chart()._internal_model();
    const views = [];
    const pane = this._private__pane._internal_state();
    const v = model._internal_crosshairSource()._internal_priceAxisViews(pane, this._private__priceScale);
    if (v.length) {
      views.push(v);
    }
    const ro = this._internal_rendererOptions();
    const align = this._private__isLeft ? "right" : "left";
    views.forEach((arr) => {
      arr.forEach((view) => {
        view._internal_renderer(ensureNotNull(this._private__priceScale))._internal_draw(target, ro, this._private__widthCache, align);
      });
    });
  }
  _private__setCursor(type) {
    this._private__cell.style.cursor = type === 1 ? "ns-resize" : "default";
  }
  _private__onMarksChanged() {
    const width = this._internal_optimalWidth();
    if (this._private__prevOptimalWidth < width) {
      this._private__pane._internal_chart()._internal_model()._internal_fullUpdate();
    }
    this._private__prevOptimalWidth = width;
  }
  _private__baseFont() {
    return makeFont(this._private__layoutOptions.fontSize, this._private__layoutOptions.fontFamily);
  }
};
function sourceBottomPaneViews$1(source, pane) {
  return source._internal_bottomPaneViews?.(pane) ?? [];
}
function sourcePaneViews$1(source, pane) {
  return source._internal_paneViews?.(pane) ?? [];
}
function sourceLabelPaneViews(source, pane) {
  return source._internal_labelPaneViews?.(pane) ?? [];
}
function sourceTopPaneViews$1(source, pane) {
  return source._internal_topPaneViews?.(pane) ?? [];
}
var PaneWidget = class _PaneWidget {
  constructor(chart, state) {
    this._private__size = size({ width: 0, height: 0 });
    this._private__leftPriceAxisWidget = null;
    this._private__rightPriceAxisWidget = null;
    this._private__attributionLogoWidget = null;
    this._private__startScrollingPos = null;
    this._private__isScrolling = false;
    this._private__clicked = new Delegate();
    this._private__dblClicked = new Delegate();
    this._private__prevPinchScale = 0;
    this._private__longTap = false;
    this._private__startTrackPoint = null;
    this._private__exitTrackingModeOnNextTry = false;
    this._private__initCrosshairPosition = null;
    this._private__scrollXAnimation = null;
    this._private__isSettingSize = false;
    this._private__canvasSuggestedBitmapSizeChangedHandler = () => {
      if (this._private__isSettingSize || this._private__state === null) {
        return;
      }
      this._private__model()._internal_lightUpdate();
    };
    this._private__topCanvasSuggestedBitmapSizeChangedHandler = () => {
      if (this._private__isSettingSize || this._private__state === null) {
        return;
      }
      this._private__model()._internal_lightUpdate();
    };
    this._private__chart = chart;
    this._private__state = state;
    this._private__state._internal_onDestroyed()._internal_subscribe(this._private__onStateDestroyed.bind(this), this, true);
    this._private__paneCell = document.createElement("td");
    this._private__paneCell.style.padding = "0";
    this._private__paneCell.style.position = "relative";
    const paneWrapper = document.createElement("div");
    paneWrapper.style.width = "100%";
    paneWrapper.style.height = "100%";
    paneWrapper.style.position = "relative";
    paneWrapper.style.overflow = "hidden";
    this._private__leftAxisCell = document.createElement("td");
    this._private__leftAxisCell.style.padding = "0";
    this._private__rightAxisCell = document.createElement("td");
    this._private__rightAxisCell.style.padding = "0";
    this._private__paneCell.appendChild(paneWrapper);
    this._private__canvasBinding = createBoundCanvas(paneWrapper, size({ width: 16, height: 16 }));
    this._private__canvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    const canvas = this._private__canvasBinding.canvasElement;
    canvas.style.position = "absolute";
    canvas.style.zIndex = "1";
    canvas.style.left = "0";
    canvas.style.top = "0";
    this._private__topCanvasBinding = createBoundCanvas(paneWrapper, size({ width: 16, height: 16 }));
    this._private__topCanvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__topCanvasSuggestedBitmapSizeChangedHandler);
    const topCanvas = this._private__topCanvasBinding.canvasElement;
    topCanvas.style.position = "absolute";
    topCanvas.style.zIndex = "2";
    topCanvas.style.left = "0";
    topCanvas.style.top = "0";
    this._private__rowElement = document.createElement("tr");
    this._private__rowElement.appendChild(this._private__leftAxisCell);
    this._private__rowElement.appendChild(this._private__paneCell);
    this._private__rowElement.appendChild(this._private__rightAxisCell);
    this._internal_updatePriceAxisWidgetsStates();
    this._private__mouseEventHandler = new MouseEventHandler(this._private__topCanvasBinding.canvasElement, this, {
      _internal_treatVertTouchDragAsPageScroll: () => this._private__startTrackPoint === null && !this._private__chart._internal_options()["handleScroll"].vertTouchDrag,
      _internal_treatHorzTouchDragAsPageScroll: () => this._private__startTrackPoint === null && !this._private__chart._internal_options()["handleScroll"].horzTouchDrag
    });
  }
  _internal_destroy() {
    if (this._private__leftPriceAxisWidget !== null) {
      this._private__leftPriceAxisWidget._internal_destroy();
    }
    if (this._private__rightPriceAxisWidget !== null) {
      this._private__rightPriceAxisWidget._internal_destroy();
    }
    this._private__attributionLogoWidget = null;
    this._private__topCanvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__topCanvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__topCanvasBinding.canvasElement);
    this._private__topCanvasBinding.dispose();
    this._private__canvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__canvasBinding.canvasElement);
    this._private__canvasBinding.dispose();
    if (this._private__state !== null) {
      this._private__state._internal_onDestroyed()._internal_unsubscribeAll(this);
      this._private__state._internal_destroy();
    }
    this._private__mouseEventHandler._internal_destroy();
  }
  _internal_state() {
    return ensureNotNull(this._private__state);
  }
  _internal_setState(pane) {
    if (this._private__state !== null) {
      this._private__state._internal_onDestroyed()._internal_unsubscribeAll(this);
    }
    this._private__state = pane;
    if (this._private__state !== null) {
      this._private__state._internal_onDestroyed()._internal_subscribe(_PaneWidget.prototype._private__onStateDestroyed.bind(this), this, true);
    }
    this._internal_updatePriceAxisWidgetsStates();
    if (this._private__chart._internal_paneWidgets().indexOf(this) === this._private__chart._internal_paneWidgets().length - 1) {
      this._private__attributionLogoWidget = this._private__attributionLogoWidget ?? new AttributionLogoWidget(this._private__paneCell, this._private__chart);
      this._private__attributionLogoWidget._internal_update();
    } else {
      this._private__attributionLogoWidget?._internal_removeElement();
      this._private__attributionLogoWidget = null;
    }
  }
  _internal_chart() {
    return this._private__chart;
  }
  _internal_getElement() {
    return this._private__rowElement;
  }
  _internal_updatePriceAxisWidgetsStates() {
    if (this._private__state === null) {
      return;
    }
    this._private__recreatePriceAxisWidgets();
    if (this._private__model()._internal_serieses().length === 0) {
      return;
    }
    if (this._private__leftPriceAxisWidget !== null) {
      const leftPriceScale = this._private__state._internal_leftPriceScale();
      this._private__leftPriceAxisWidget._internal_setPriceScale(ensureNotNull(leftPriceScale));
    }
    if (this._private__rightPriceAxisWidget !== null) {
      const rightPriceScale = this._private__state._internal_rightPriceScale();
      this._private__rightPriceAxisWidget._internal_setPriceScale(ensureNotNull(rightPriceScale));
    }
  }
  _internal_updatePriceAxisWidgets() {
    if (this._private__leftPriceAxisWidget !== null) {
      this._private__leftPriceAxisWidget._internal_update();
    }
    if (this._private__rightPriceAxisWidget !== null) {
      this._private__rightPriceAxisWidget._internal_update();
    }
  }
  _internal_stretchFactor() {
    return this._private__state !== null ? this._private__state._internal_stretchFactor() : 0;
  }
  _internal_setStretchFactor(stretchFactor) {
    if (this._private__state) {
      this._private__state._internal_setStretchFactor(stretchFactor);
    }
  }
  _internal_mouseEnterEvent(event) {
    if (!this._private__state) {
      return;
    }
    this._private__onMouseEvent();
    const x = event.localX;
    const y = event.localY;
    this._private__setCrosshairPosition(x, y, event);
  }
  _internal_mouseDownEvent(event) {
    this._private__onMouseEvent();
    this._private__mouseTouchDownEvent();
    this._private__setCrosshairPosition(event.localX, event.localY, event);
  }
  _internal_mouseMoveEvent(event) {
    if (!this._private__state) {
      return;
    }
    this._private__onMouseEvent();
    const x = event.localX;
    const y = event.localY;
    this._private__setCrosshairPosition(x, y, event);
  }
  _internal_mouseClickEvent(event) {
    if (this._private__state === null) {
      return;
    }
    this._private__onMouseEvent();
    this._private__setCrosshairPosition(event.localX, event.localY, event);
    this._private__fireClickedDelegate(event);
  }
  _internal_mouseDoubleClickEvent(event) {
    if (this._private__state === null) {
      return;
    }
    this._private__fireMouseClickDelegate(this._private__dblClicked, event);
  }
  _internal_doubleTapEvent(event) {
    this._internal_mouseDoubleClickEvent(event);
  }
  _internal_pressedMouseMoveEvent(event) {
    this._private__onMouseEvent();
    this._private__pressedMouseTouchMoveEvent(event);
    this._private__setCrosshairPosition(event.localX, event.localY, event);
  }
  _internal_mouseUpEvent(event) {
    if (this._private__state === null) {
      return;
    }
    this._private__onMouseEvent();
    this._private__longTap = false;
    this._private__endScroll(event);
  }
  _internal_tapEvent(event) {
    if (this._private__state === null) {
      return;
    }
    this._private__fireClickedDelegate(event);
  }
  _internal_longTapEvent(event) {
    this._private__longTap = true;
    if (this._private__startTrackPoint === null) {
      const point = { x: event.localX, y: event.localY };
      this._private__startTrackingMode(point, point, event);
    }
  }
  _internal_mouseLeaveEvent(event) {
    if (this._private__state === null) {
      return;
    }
    this._private__onMouseEvent();
    this._private__state._internal_model()._internal_setHoveredSource(null);
    this._private__clearCrosshairPosition();
  }
  _internal_clicked() {
    return this._private__clicked;
  }
  _internal_dblClicked() {
    return this._private__dblClicked;
  }
  _internal_pinchStartEvent() {
    this._private__prevPinchScale = 1;
    this._private__model()._internal_stopTimeScaleAnimation();
  }
  _internal_pinchEvent(middlePoint, scale) {
    if (!this._private__chart._internal_options()["handleScale"].pinch) {
      return;
    }
    const zoomScale = (scale - this._private__prevPinchScale) * 5;
    this._private__prevPinchScale = scale;
    this._private__model()._internal_zoomTime(middlePoint._internal_x, zoomScale);
  }
  _internal_touchStartEvent(event) {
    this._private__longTap = false;
    this._private__exitTrackingModeOnNextTry = this._private__startTrackPoint !== null;
    this._private__mouseTouchDownEvent();
    const crosshair = this._private__model()._internal_crosshairSource();
    if (this._private__startTrackPoint !== null && crosshair._internal_visible()) {
      this._private__initCrosshairPosition = { x: crosshair._internal_appliedX(), y: crosshair._internal_appliedY() };
      this._private__startTrackPoint = { x: event.localX, y: event.localY };
    }
  }
  _internal_touchMoveEvent(event) {
    if (this._private__state === null) {
      return;
    }
    const x = event.localX;
    const y = event.localY;
    if (this._private__startTrackPoint !== null) {
      this._private__exitTrackingModeOnNextTry = false;
      const origPoint = ensureNotNull(this._private__initCrosshairPosition);
      const newX = origPoint.x + (x - this._private__startTrackPoint.x);
      const newY = origPoint.y + (y - this._private__startTrackPoint.y);
      this._private__setCrosshairPosition(newX, newY, event);
      return;
    }
    this._private__pressedMouseTouchMoveEvent(event);
  }
  _internal_touchEndEvent(event) {
    if (this._internal_chart()._internal_options().trackingMode.exitMode === 0) {
      this._private__exitTrackingModeOnNextTry = true;
    }
    this._private__tryExitTrackingMode();
    this._private__endScroll(event);
  }
  _internal_hitTest(x, y) {
    const state = this._private__state;
    if (state === null) {
      return null;
    }
    return hitTestPane(state, x, y);
  }
  _internal_setPriceAxisSize(width, position) {
    const priceAxisWidget = position === "left" ? this._private__leftPriceAxisWidget : this._private__rightPriceAxisWidget;
    ensureNotNull(priceAxisWidget)._internal_setSize(size({ width, height: this._private__size.height }));
  }
  _internal_getSize() {
    return this._private__size;
  }
  _internal_setSize(newSize) {
    if (equalSizes(this._private__size, newSize)) {
      return;
    }
    this._private__size = newSize;
    this._private__isSettingSize = true;
    this._private__canvasBinding.resizeCanvasElement(newSize);
    this._private__topCanvasBinding.resizeCanvasElement(newSize);
    this._private__isSettingSize = false;
    this._private__paneCell.style.width = newSize.width + "px";
    this._private__paneCell.style.height = newSize.height + "px";
  }
  _internal_recalculatePriceScales() {
    const pane = ensureNotNull(this._private__state);
    pane._internal_recalculatePriceScale(pane._internal_leftPriceScale());
    pane._internal_recalculatePriceScale(pane._internal_rightPriceScale());
    for (const source of pane._internal_dataSources()) {
      if (pane._internal_isOverlay(source)) {
        const priceScale = source._internal_priceScale();
        if (priceScale !== null) {
          pane._internal_recalculatePriceScale(priceScale);
        }
        source._internal_updateAllViews();
      }
    }
    for (const primitive of pane._internal_primitives()) {
      primitive._internal_updateAllViews();
    }
  }
  _internal_getBitmapSize() {
    return this._private__canvasBinding.bitmapSize;
  }
  _internal_drawBitmap(ctx, x, y, addTopLayer) {
    const bitmapSize = this._internal_getBitmapSize();
    if (bitmapSize.width > 0 && bitmapSize.height > 0) {
      ctx.drawImage(this._private__canvasBinding.canvasElement, x, y);
      if (addTopLayer) {
        const topLayer = this._private__topCanvasBinding.canvasElement;
        if (ctx !== null) {
          ctx.drawImage(topLayer, x, y);
        }
      }
    }
  }
  _internal_paint(type) {
    if (type === 0) {
      return;
    }
    if (this._private__state === null) {
      return;
    }
    if (type > 1) {
      this._internal_recalculatePriceScales();
    }
    if (this._private__leftPriceAxisWidget !== null) {
      this._private__leftPriceAxisWidget._internal_paint(type);
    }
    if (this._private__rightPriceAxisWidget !== null) {
      this._private__rightPriceAxisWidget._internal_paint(type);
    }
    const canvasOptions = {
      colorSpace: this._private__chart._internal_options().layout.colorSpace
    };
    if (type !== 1) {
      this._private__canvasBinding.applySuggestedBitmapSize();
      const target = tryCreateCanvasRenderingTarget2D(this._private__canvasBinding, canvasOptions);
      if (target !== null) {
        target.useBitmapCoordinateSpace((scope) => {
          this._private__drawBackground(scope);
        });
        if (this._private__state) {
          this._private__drawSources(target, sourceBottomPaneViews$1);
          this._private__drawGrid(target);
          this._private__drawSources(target, sourcePaneViews$1);
          this._private__drawSources(target, sourceLabelPaneViews);
        }
      }
    }
    this._private__topCanvasBinding.applySuggestedBitmapSize();
    const topTarget = tryCreateCanvasRenderingTarget2D(this._private__topCanvasBinding, canvasOptions);
    if (topTarget !== null) {
      topTarget.useBitmapCoordinateSpace(({ context: ctx, bitmapSize }) => {
        ctx.clearRect(0, 0, bitmapSize.width, bitmapSize.height);
      });
      this._private__drawCrosshair(topTarget);
      this._private__drawSources(topTarget, sourceTopPaneViews$1);
      this._private__drawSources(topTarget, sourceLabelPaneViews);
    }
  }
  _internal_leftPriceAxisWidget() {
    return this._private__leftPriceAxisWidget;
  }
  _internal_rightPriceAxisWidget() {
    return this._private__rightPriceAxisWidget;
  }
  _internal_drawAdditionalSources(target, paneViewsGetter) {
    this._private__drawSources(target, paneViewsGetter);
  }
  _private__onStateDestroyed() {
    if (this._private__state !== null) {
      this._private__state._internal_onDestroyed()._internal_unsubscribeAll(this);
    }
    this._private__state = null;
  }
  _private__fireClickedDelegate(event) {
    this._private__fireMouseClickDelegate(this._private__clicked, event);
  }
  _private__fireMouseClickDelegate(delegate, event) {
    const x = event.localX;
    const y = event.localY;
    if (delegate._internal_hasListeners()) {
      delegate._internal_fire(this._private__model()._internal_timeScale()._internal_coordinateToIndex(x), { x, y }, event);
    }
  }
  _private__drawBackground({ context: ctx, bitmapSize }) {
    const { width, height } = bitmapSize;
    const model = this._private__model();
    const topColor = model._internal_backgroundTopColor();
    const bottomColor = model._internal_backgroundBottomColor();
    if (topColor === bottomColor) {
      clearRect(ctx, 0, 0, width, height, bottomColor);
    } else {
      clearRectWithGradient(ctx, 0, 0, width, height, topColor, bottomColor);
    }
  }
  _private__drawGrid(target) {
    const state = ensureNotNull(this._private__state);
    const paneView = state._internal_grid()._internal_paneView();
    const renderer = paneView._internal_renderer(state);
    if (renderer !== null) {
      renderer._internal_draw(target, false);
    }
  }
  _private__drawCrosshair(target) {
    this._private__drawSourceImpl(target, sourcePaneViews$1, drawForeground, this._private__model()._internal_crosshairSource());
  }
  _private__drawSources(target, paneViewsGetter) {
    const state = ensureNotNull(this._private__state);
    const hoveredSplitSource = paneViewsGetter === sourcePaneViews$1 ? this._private__hoveredSplitSource() : null;
    const hoveredSplitViews = hoveredSplitSource === null ? null : this._private__hoveredSplitSourcePaneViews(hoveredSplitSource, state);
    const panePrimitives = state._internal_primitives();
    if (hoveredSplitViews === null || hoveredSplitSource === null) {
      const sources2 = state._internal_orderedSourcesForRendering();
      this._private__drawSourceGroup(target, paneViewsGetter, drawBackground, panePrimitives, sources2);
      this._private__drawSourceGroup(target, paneViewsGetter, drawForeground, panePrimitives, sources2);
      return;
    }
    const sources = state._internal_orderedSources();
    const sourcePaneViewsOverride = (source) => source === hoveredSplitSource ? hoveredSplitViews._internal_normalPaneViews : void 0;
    this._private__drawSourceGroup(target, paneViewsGetter, drawBackground, panePrimitives, sources, sourcePaneViewsOverride);
    this._private__drawSourceGroup(target, paneViewsGetter, drawForeground, panePrimitives, sources, sourcePaneViewsOverride);
    this._private__drawSourceImpl(target, paneViewsGetter, drawBackground, hoveredSplitSource, hoveredSplitViews._internal_topPaneViews);
    this._private__drawSourceImpl(target, paneViewsGetter, drawForeground, hoveredSplitSource, hoveredSplitViews._internal_topPaneViews);
  }
  _private__drawSourceGroup(target, paneViewsGetter, drawFn, panePrimitives, sources, sourcePaneViewsOverride) {
    for (const panePrimitive of panePrimitives) {
      this._private__drawSourceImpl(target, paneViewsGetter, drawFn, panePrimitive);
    }
    if (sourcePaneViewsOverride === void 0) {
      for (const source of sources) {
        this._private__drawSourceImpl(target, paneViewsGetter, drawFn, source);
      }
      return;
    }
    for (const source of sources) {
      this._private__drawSourceImpl(target, paneViewsGetter, drawFn, source, sourcePaneViewsOverride(source));
    }
  }
  _private__hoveredSplitSource() {
    const state = ensureNotNull(this._private__state);
    const hoveredSource = state._internal_model()._internal_hoveredSource()?._internal_source;
    if (!state._internal_model()._internal_options().hoveredSeriesOnTop || hoveredSource === void 0) {
      return null;
    }
    for (const source of state._internal_orderedSources()) {
      if (source === hoveredSource) {
        return source;
      }
    }
    return null;
  }
  _private__hoveredSplitSourcePaneViews(source, pane) {
    const hoveredPaneViews = source._internal_paneViewsForHoveredSourceOnTop?.(pane) ?? null;
    if (hoveredPaneViews === null || hoveredPaneViews._internal_topPaneViews.length === 0) {
      return null;
    }
    return hoveredPaneViews;
  }
  _private__drawSourceImpl(target, paneViewsGetter, drawFn, source, paneViewsOverride) {
    const state = ensureNotNull(this._private__state);
    const hoveredSource = state._internal_model()._internal_hoveredSource();
    const isHovered = hoveredSource !== null && hoveredSource._internal_source === source;
    const objecId = hoveredSource !== null && isHovered && hoveredSource._internal_object !== void 0 ? hoveredSource._internal_object._internal_hitTestData : void 0;
    const drawRendererFn = (renderer) => drawFn(renderer, target, isHovered, objecId);
    if (paneViewsOverride === void 0) {
      drawSourceViews(paneViewsGetter, drawRendererFn, source, state);
    } else {
      drawPaneViews(paneViewsOverride, drawRendererFn, state);
    }
  }
  _private__recreatePriceAxisWidgets() {
    if (this._private__state === null) {
      return;
    }
    const chart = this._private__chart;
    const leftAxisVisible = this._private__state._internal_leftPriceScale()._internal_options().visible;
    const rightAxisVisible = this._private__state._internal_rightPriceScale()._internal_options().visible;
    if (!leftAxisVisible && this._private__leftPriceAxisWidget !== null) {
      this._private__leftAxisCell.removeChild(this._private__leftPriceAxisWidget._internal_getElement());
      this._private__leftPriceAxisWidget._internal_destroy();
      this._private__leftPriceAxisWidget = null;
    }
    if (!rightAxisVisible && this._private__rightPriceAxisWidget !== null) {
      this._private__rightAxisCell.removeChild(this._private__rightPriceAxisWidget._internal_getElement());
      this._private__rightPriceAxisWidget._internal_destroy();
      this._private__rightPriceAxisWidget = null;
    }
    const rendererOptionsProvider = chart._internal_model()._internal_rendererOptionsProvider();
    if (leftAxisVisible && this._private__leftPriceAxisWidget === null) {
      this._private__leftPriceAxisWidget = new PriceAxisWidget(this, chart._internal_options(), rendererOptionsProvider, "left");
      this._private__leftAxisCell.appendChild(this._private__leftPriceAxisWidget._internal_getElement());
    }
    if (rightAxisVisible && this._private__rightPriceAxisWidget === null) {
      this._private__rightPriceAxisWidget = new PriceAxisWidget(this, chart._internal_options(), rendererOptionsProvider, "right");
      this._private__rightAxisCell.appendChild(this._private__rightPriceAxisWidget._internal_getElement());
    }
  }
  _private__preventScroll(event) {
    return event._internal_isTouch && this._private__longTap || this._private__startTrackPoint !== null;
  }
  _private__setCrosshairPosition(x, y, event) {
    x = Math.max(0, Math.min(x, this._private__size.width - 1));
    y = Math.max(0, Math.min(y, this._private__size.height - 1));
    this._private__model()._internal_setAndSaveCurrentPosition(x, y, event, ensureNotNull(this._private__state));
  }
  _private__clearCrosshairPosition() {
    this._private__model()._internal_clearCurrentPosition();
  }
  _private__tryExitTrackingMode() {
    if (this._private__exitTrackingModeOnNextTry) {
      this._private__startTrackPoint = null;
      this._private__clearCrosshairPosition();
    }
  }
  _private__startTrackingMode(startTrackPoint, crossHairPosition, event) {
    this._private__startTrackPoint = startTrackPoint;
    this._private__exitTrackingModeOnNextTry = false;
    this._private__setCrosshairPosition(crossHairPosition.x, crossHairPosition.y, event);
    const crosshair = this._private__model()._internal_crosshairSource();
    this._private__initCrosshairPosition = { x: crosshair._internal_appliedX(), y: crosshair._internal_appliedY() };
  }
  _private__model() {
    return this._private__chart._internal_model();
  }
  _private__endScroll(event) {
    if (!this._private__isScrolling) {
      return;
    }
    const model = this._private__model();
    const state = this._internal_state();
    model._internal_endScrollPrice(state, state._internal_defaultPriceScale());
    this._private__startScrollingPos = null;
    this._private__isScrolling = false;
    model._internal_endScrollTime();
    if (this._private__scrollXAnimation !== null) {
      const startAnimationTime = performance.now();
      const timeScale = model._internal_timeScale();
      this._private__scrollXAnimation._internal_start(timeScale._internal_rightOffset(), startAnimationTime);
      if (!this._private__scrollXAnimation._internal_finished(startAnimationTime)) {
        model._internal_setTimeScaleAnimation(this._private__scrollXAnimation);
      }
    }
  }
  _private__onMouseEvent() {
    this._private__startTrackPoint = null;
  }
  _private__mouseTouchDownEvent() {
    if (!this._private__state) {
      return;
    }
    this._private__model()._internal_stopTimeScaleAnimation();
    if (document.activeElement !== document.body && document.activeElement !== document.documentElement) {
      ensureNotNull(document.activeElement).blur();
    } else {
      const selection = document.getSelection();
      if (selection !== null) {
        selection.removeAllRanges();
      }
    }
    const priceScale = this._private__state._internal_defaultPriceScale();
    if (priceScale._internal_isEmpty() || this._private__model()._internal_timeScale()._internal_isEmpty()) {
      return;
    }
  }
  // eslint-disable-next-line complexity
  _private__pressedMouseTouchMoveEvent(event) {
    if (this._private__state === null) {
      return;
    }
    const model = this._private__model();
    const timeScale = model._internal_timeScale();
    if (timeScale._internal_isEmpty()) {
      return;
    }
    const chartOptions = this._private__chart._internal_options();
    const scrollOptions = chartOptions["handleScroll"];
    const kineticScrollOptions = chartOptions.kineticScroll;
    if ((!scrollOptions.pressedMouseMove || event._internal_isTouch) && (!scrollOptions.horzTouchDrag && !scrollOptions.vertTouchDrag || !event._internal_isTouch)) {
      return;
    }
    const priceScale = this._private__state._internal_defaultPriceScale();
    const now = performance.now();
    if (this._private__startScrollingPos === null && !this._private__preventScroll(event)) {
      this._private__startScrollingPos = {
        x: event.clientX,
        y: event.clientY,
        _internal_timestamp: now,
        _internal_localX: event.localX,
        _internal_localY: event.localY
      };
    }
    if (this._private__startScrollingPos !== null && !this._private__isScrolling && (this._private__startScrollingPos.x !== event.clientX || this._private__startScrollingPos.y !== event.clientY)) {
      if (event._internal_isTouch && kineticScrollOptions.touch || !event._internal_isTouch && kineticScrollOptions.mouse) {
        const barSpacing = timeScale._internal_barSpacing();
        this._private__scrollXAnimation = new KineticAnimation(0.2 / barSpacing, 7 / barSpacing, 0.997, 15 / barSpacing);
        this._private__scrollXAnimation._internal_addPosition(timeScale._internal_rightOffset(), this._private__startScrollingPos._internal_timestamp);
      } else {
        this._private__scrollXAnimation = null;
      }
      if (!priceScale._internal_isEmpty()) {
        model._internal_startScrollPrice(this._private__state, priceScale, event.localY);
      }
      model._internal_startScrollTime(event.localX);
      this._private__isScrolling = true;
    }
    if (this._private__isScrolling) {
      if (!priceScale._internal_isEmpty()) {
        model._internal_scrollPriceTo(this._private__state, priceScale, event.localY);
      }
      model._internal_scrollTimeTo(event.localX);
      if (this._private__scrollXAnimation !== null) {
        this._private__scrollXAnimation._internal_addPosition(timeScale._internal_rightOffset(), now);
      }
    }
  }
};
var PriceAxisStub = class {
  constructor(side, options, params, borderVisible, bottomColor) {
    this._private__invalidated = true;
    this._private__size = size({ width: 0, height: 0 });
    this._private__canvasSuggestedBitmapSizeChangedHandler = () => this._internal_paint(
      3
      /* InvalidationLevel.Full */
    );
    this._private__isLeft = side === "left";
    this._private__rendererOptionsProvider = params._internal_rendererOptionsProvider;
    this._private__options = options;
    this._private__borderVisible = borderVisible;
    this._private__bottomColor = bottomColor;
    this._private__cell = document.createElement("div");
    this._private__cell.style.width = "25px";
    this._private__cell.style.height = "100%";
    this._private__cell.style.overflow = "hidden";
    this._private__canvasBinding = createBoundCanvas(this._private__cell, size({ width: 16, height: 16 }));
    this._private__canvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
  }
  _internal_destroy() {
    this._private__canvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__canvasBinding.canvasElement);
    this._private__canvasBinding.dispose();
  }
  _internal_getElement() {
    return this._private__cell;
  }
  _internal_getSize() {
    return this._private__size;
  }
  _internal_setSize(newSize) {
    if (!equalSizes(this._private__size, newSize)) {
      this._private__size = newSize;
      this._private__canvasBinding.resizeCanvasElement(newSize);
      this._private__cell.style.width = `${newSize.width}px`;
      this._private__cell.style.height = `${newSize.height}px`;
      this._private__invalidated = true;
    }
  }
  _internal_paint(type) {
    if (type < 3 && !this._private__invalidated) {
      return;
    }
    if (this._private__size.width === 0 || this._private__size.height === 0) {
      return;
    }
    this._private__invalidated = false;
    this._private__canvasBinding.applySuggestedBitmapSize();
    const target = tryCreateCanvasRenderingTarget2D(this._private__canvasBinding, {
      colorSpace: this._private__options.layout.colorSpace
    });
    if (target !== null) {
      target.useBitmapCoordinateSpace((scope) => {
        this._private__drawBackground(scope);
        this._private__drawBorder(scope);
      });
    }
  }
  _internal_getBitmapSize() {
    return this._private__canvasBinding.bitmapSize;
  }
  _internal_drawBitmap(ctx, x, y) {
    const bitmapSize = this._internal_getBitmapSize();
    if (bitmapSize.width > 0 && bitmapSize.height > 0) {
      ctx.drawImage(this._private__canvasBinding.canvasElement, x, y);
    }
  }
  _private__drawBorder({ context: ctx, bitmapSize, horizontalPixelRatio, verticalPixelRatio }) {
    if (!this._private__borderVisible()) {
      return;
    }
    ctx.fillStyle = this._private__options.timeScale.borderColor;
    const horzBorderSize = Math.floor(this._private__rendererOptionsProvider._internal_options()._internal_borderSize * horizontalPixelRatio);
    const vertBorderSize = Math.floor(this._private__rendererOptionsProvider._internal_options()._internal_borderSize * verticalPixelRatio);
    const left = this._private__isLeft ? bitmapSize.width - horzBorderSize : 0;
    ctx.fillRect(left, 0, horzBorderSize, vertBorderSize);
  }
  _private__drawBackground({ context: ctx, bitmapSize }) {
    clearRect(ctx, 0, 0, bitmapSize.width, bitmapSize.height, this._private__bottomColor());
  }
};
function buildTimeAxisViewsGetter(zOrder) {
  return (source) => source._internal_timePaneViews?.(zOrder) ?? [];
}
var sourcePaneViews = buildTimeAxisViewsGetter("normal");
var sourceTopPaneViews = buildTimeAxisViewsGetter("top");
var sourceBottomPaneViews = buildTimeAxisViewsGetter("bottom");
var TimeAxisWidget = class {
  constructor(chartWidget, horzScaleBehavior) {
    this._private__leftStub = null;
    this._private__rightStub = null;
    this._private__rendererOptions = null;
    this._private__mouseDown = false;
    this._private__size = size({ width: 0, height: 0 });
    this._private__sizeChanged = new Delegate();
    this._private__widthCache = new TextWidthCache(5);
    this._private__isSettingSize = false;
    this._private__canvasSuggestedBitmapSizeChangedHandler = () => {
      if (!this._private__isSettingSize) {
        this._private__chart._internal_model()._internal_lightUpdate();
      }
    };
    this._private__topCanvasSuggestedBitmapSizeChangedHandler = () => {
      if (!this._private__isSettingSize) {
        this._private__chart._internal_model()._internal_lightUpdate();
      }
    };
    this._private__chart = chartWidget;
    this._private__horzScaleBehavior = horzScaleBehavior;
    this._private__options = chartWidget._internal_options()["layout"];
    this._private__element = document.createElement("tr");
    this._private__leftStubCell = document.createElement("td");
    this._private__leftStubCell.style.padding = "0";
    this._private__rightStubCell = document.createElement("td");
    this._private__rightStubCell.style.padding = "0";
    this._private__cell = document.createElement("td");
    this._private__cell.style.height = "25px";
    this._private__cell.style.padding = "0";
    this._private__dv = document.createElement("div");
    this._private__dv.style.width = "100%";
    this._private__dv.style.height = "100%";
    this._private__dv.style.position = "relative";
    this._private__dv.style.overflow = "hidden";
    this._private__cell.appendChild(this._private__dv);
    this._private__canvasBinding = createBoundCanvas(this._private__dv, size({ width: 16, height: 16 }));
    this._private__canvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    const canvas = this._private__canvasBinding.canvasElement;
    canvas.style.position = "absolute";
    canvas.style.zIndex = "1";
    canvas.style.left = "0";
    canvas.style.top = "0";
    this._private__topCanvasBinding = createBoundCanvas(this._private__dv, size({ width: 16, height: 16 }));
    this._private__topCanvasBinding.subscribeSuggestedBitmapSizeChanged(this._private__topCanvasSuggestedBitmapSizeChangedHandler);
    const topCanvas = this._private__topCanvasBinding.canvasElement;
    topCanvas.style.position = "absolute";
    topCanvas.style.zIndex = "2";
    topCanvas.style.left = "0";
    topCanvas.style.top = "0";
    this._private__element.appendChild(this._private__leftStubCell);
    this._private__element.appendChild(this._private__cell);
    this._private__element.appendChild(this._private__rightStubCell);
    this._private__recreateStubs();
    this._private__chart._internal_model()._internal_priceScalesOptionsChanged()._internal_subscribe(this._private__recreateStubs.bind(this), this);
    this._private__mouseEventHandler = new MouseEventHandler(this._private__topCanvasBinding.canvasElement, this, {
      _internal_treatVertTouchDragAsPageScroll: () => true,
      _internal_treatHorzTouchDragAsPageScroll: () => !this._private__chart._internal_options()["handleScroll"].horzTouchDrag
    });
  }
  _internal_destroy() {
    this._private__mouseEventHandler._internal_destroy();
    if (this._private__leftStub !== null) {
      this._private__leftStub._internal_destroy();
    }
    if (this._private__rightStub !== null) {
      this._private__rightStub._internal_destroy();
    }
    this._private__topCanvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__topCanvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__topCanvasBinding.canvasElement);
    this._private__topCanvasBinding.dispose();
    this._private__canvasBinding.unsubscribeSuggestedBitmapSizeChanged(this._private__canvasSuggestedBitmapSizeChangedHandler);
    releaseCanvas(this._private__canvasBinding.canvasElement);
    this._private__canvasBinding.dispose();
  }
  _internal_getElement() {
    return this._private__element;
  }
  _internal_leftStub() {
    return this._private__leftStub;
  }
  _internal_rightStub() {
    return this._private__rightStub;
  }
  _internal_mouseDownEvent(event) {
    if (this._private__mouseDown) {
      return;
    }
    this._private__mouseDown = true;
    const model = this._private__chart._internal_model();
    if (model._internal_timeScale()._internal_isEmpty() || !this._private__chart._internal_options()["handleScale"].axisPressedMouseMove.time) {
      return;
    }
    model._internal_startScaleTime(event.localX);
  }
  _internal_touchStartEvent(event) {
    this._internal_mouseDownEvent(event);
  }
  _internal_mouseDownOutsideEvent() {
    const model = this._private__chart._internal_model();
    if (!model._internal_timeScale()._internal_isEmpty() && this._private__mouseDown) {
      this._private__mouseDown = false;
      if (this._private__chart._internal_options()["handleScale"].axisPressedMouseMove.time) {
        model._internal_endScaleTime();
      }
    }
  }
  _internal_pressedMouseMoveEvent(event) {
    const model = this._private__chart._internal_model();
    if (model._internal_timeScale()._internal_isEmpty() || !this._private__chart._internal_options()["handleScale"].axisPressedMouseMove.time) {
      return;
    }
    model._internal_scaleTimeTo(event.localX);
  }
  _internal_touchMoveEvent(event) {
    this._internal_pressedMouseMoveEvent(event);
  }
  _internal_mouseUpEvent() {
    this._private__mouseDown = false;
    const model = this._private__chart._internal_model();
    if (model._internal_timeScale()._internal_isEmpty() && !this._private__chart._internal_options()["handleScale"].axisPressedMouseMove.time) {
      return;
    }
    model._internal_endScaleTime();
  }
  _internal_touchEndEvent() {
    this._internal_mouseUpEvent();
  }
  _internal_mouseDoubleClickEvent() {
    if (this._private__chart._internal_options()["handleScale"].axisDoubleClickReset.time) {
      this._private__chart._internal_model()._internal_resetTimeScale();
    }
  }
  _internal_doubleTapEvent() {
    this._internal_mouseDoubleClickEvent();
  }
  _internal_mouseEnterEvent() {
    if (this._private__chart._internal_model()._internal_options()["handleScale"].axisPressedMouseMove.time) {
      this._private__setCursor(
        1
        /* CursorType.EwResize */
      );
    }
  }
  _internal_mouseLeaveEvent() {
    this._private__setCursor(
      0
      /* CursorType.Default */
    );
  }
  _internal_getSize() {
    return this._private__size;
  }
  _internal_sizeChanged() {
    return this._private__sizeChanged;
  }
  _internal_setSizes(timeAxisSize, leftStubWidth, rightStubWidth) {
    if (!equalSizes(this._private__size, timeAxisSize)) {
      this._private__size = timeAxisSize;
      this._private__isSettingSize = true;
      this._private__canvasBinding.resizeCanvasElement(timeAxisSize);
      this._private__topCanvasBinding.resizeCanvasElement(timeAxisSize);
      this._private__isSettingSize = false;
      this._private__cell.style.width = `${timeAxisSize.width}px`;
      this._private__cell.style.height = `${timeAxisSize.height}px`;
      this._private__sizeChanged._internal_fire(timeAxisSize);
    }
    if (this._private__leftStub !== null) {
      this._private__leftStub._internal_setSize(size({ width: leftStubWidth, height: timeAxisSize.height }));
    }
    if (this._private__rightStub !== null) {
      this._private__rightStub._internal_setSize(size({ width: rightStubWidth, height: timeAxisSize.height }));
    }
  }
  _internal_optimalHeight() {
    const rendererOptions = this._private__getRendererOptions();
    return Math.ceil(
      // rendererOptions.offsetSize +
      rendererOptions._internal_borderSize + rendererOptions._internal_tickLength + rendererOptions._internal_fontSize + rendererOptions._internal_paddingTop + rendererOptions._internal_paddingBottom + rendererOptions._internal_labelBottomOffset
    );
  }
  _internal_update() {
    this._private__chart._internal_model()._internal_timeScale()._internal_marks();
  }
  _internal_getBitmapSize() {
    return this._private__canvasBinding.bitmapSize;
  }
  _internal_drawBitmap(ctx, x, y, addTopLayer) {
    const bitmapSize = this._internal_getBitmapSize();
    if (bitmapSize.width > 0 && bitmapSize.height > 0) {
      ctx.drawImage(this._private__canvasBinding.canvasElement, x, y);
      if (addTopLayer) {
        const topLayer = this._private__topCanvasBinding.canvasElement;
        ctx.drawImage(topLayer, x, y);
      }
    }
  }
  _internal_paint(type) {
    if (type === 0) {
      return;
    }
    const canvasOptions = {
      colorSpace: this._private__options.colorSpace
    };
    if (type !== 1) {
      this._private__canvasBinding.applySuggestedBitmapSize();
      const target = tryCreateCanvasRenderingTarget2D(this._private__canvasBinding, canvasOptions);
      if (target !== null) {
        target.useBitmapCoordinateSpace((scope) => {
          this._private__drawBackground(scope);
          this._private__drawBorder(scope);
          this._private__drawAdditionalSources(target, sourceBottomPaneViews);
        });
        this._private__drawTickMarks(target);
        this._private__drawAdditionalSources(target, sourcePaneViews);
      }
      if (this._private__leftStub !== null) {
        this._private__leftStub._internal_paint(type);
      }
      if (this._private__rightStub !== null) {
        this._private__rightStub._internal_paint(type);
      }
    }
    this._private__topCanvasBinding.applySuggestedBitmapSize();
    const topTarget = tryCreateCanvasRenderingTarget2D(this._private__topCanvasBinding, canvasOptions);
    if (topTarget !== null) {
      topTarget.useBitmapCoordinateSpace(({ context: ctx, bitmapSize }) => {
        ctx.clearRect(0, 0, bitmapSize.width, bitmapSize.height);
      });
      this._private__drawLabels([...this._private__chart._internal_model()._internal_serieses(), this._private__chart._internal_model()._internal_crosshairSource()], topTarget);
      this._private__drawAdditionalSources(topTarget, sourceTopPaneViews);
    }
  }
  _private__drawAdditionalSources(target, axisViewsGetter) {
    const sources = this._private__chart._internal_model()._internal_serieses();
    for (const source of sources) {
      drawSourceViews(axisViewsGetter, (renderer) => drawBackground(renderer, target, false, void 0), source, void 0);
    }
    for (const source of sources) {
      drawSourceViews(axisViewsGetter, (renderer) => drawForeground(renderer, target, false, void 0), source, void 0);
    }
  }
  _private__drawBackground({ context: ctx, bitmapSize }) {
    clearRect(ctx, 0, 0, bitmapSize.width, bitmapSize.height, this._private__chart._internal_model()._internal_backgroundBottomColor());
  }
  _private__drawBorder({ context: ctx, bitmapSize, verticalPixelRatio }) {
    if (this._private__chart._internal_options().timeScale.borderVisible) {
      ctx.fillStyle = this._private__lineColor();
      const borderSize = Math.max(1, Math.floor(this._private__getRendererOptions()._internal_borderSize * verticalPixelRatio));
      ctx.fillRect(0, 0, bitmapSize.width, borderSize);
    }
  }
  _private__drawTickMarks(target) {
    const timeScale = this._private__chart._internal_model()._internal_timeScale();
    const tickMarks = timeScale._internal_marks();
    if (!tickMarks || tickMarks.length === 0) {
      return;
    }
    const maxWeight = this._private__horzScaleBehavior.maxTickMarkWeight(tickMarks);
    const rendererOptions = this._private__getRendererOptions();
    const options = timeScale._internal_options();
    if (options.borderVisible && options.ticksVisible) {
      target.useBitmapCoordinateSpace(({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) => {
        ctx.strokeStyle = this._private__lineColor();
        ctx.fillStyle = this._private__lineColor();
        const tickWidth = Math.max(1, Math.floor(horizontalPixelRatio));
        const tickOffset = Math.floor(horizontalPixelRatio * 0.5);
        ctx.beginPath();
        const tickLen = Math.round(rendererOptions._internal_tickLength * verticalPixelRatio);
        for (let index = tickMarks.length; index--; ) {
          const x = Math.round(tickMarks[index].coord * horizontalPixelRatio);
          ctx.rect(x - tickOffset, 0, tickWidth, tickLen);
        }
        ctx.fill();
      });
    }
    target.useMediaCoordinateSpace(({ context: ctx }) => {
      const yText = rendererOptions._internal_borderSize + rendererOptions._internal_tickLength + rendererOptions._internal_paddingTop + rendererOptions._internal_fontSize / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this._private__textColor();
      ctx.font = this._private__baseFont();
      for (const tickMark of tickMarks) {
        if (tickMark.weight < maxWeight) {
          const coordinate = tickMark.needAlignCoordinate ? this._private__alignTickMarkLabelCoordinate(ctx, tickMark.coord, tickMark.label) : tickMark.coord;
          ctx.fillText(tickMark.label, coordinate, yText);
        }
      }
      if (this._private__chart._internal_options().timeScale.allowBoldLabels) {
        ctx.font = this._private__baseBoldFont();
      }
      for (const tickMark of tickMarks) {
        if (tickMark.weight >= maxWeight) {
          const coordinate = tickMark.needAlignCoordinate ? this._private__alignTickMarkLabelCoordinate(ctx, tickMark.coord, tickMark.label) : tickMark.coord;
          ctx.fillText(tickMark.label, coordinate, yText);
        }
      }
    });
  }
  _private__alignTickMarkLabelCoordinate(ctx, coordinate, labelText) {
    const labelWidth = this._private__widthCache._internal_measureText(ctx, labelText);
    const labelWidthHalf = labelWidth / 2;
    const leftTextCoordinate = Math.floor(coordinate - labelWidthHalf) + 0.5;
    if (leftTextCoordinate < 0) {
      coordinate = coordinate + Math.abs(0 - leftTextCoordinate);
    } else if (leftTextCoordinate + labelWidth > this._private__size.width) {
      coordinate = coordinate - Math.abs(this._private__size.width - (leftTextCoordinate + labelWidth));
    }
    return coordinate;
  }
  _private__drawLabels(sources, target) {
    const rendererOptions = this._private__getRendererOptions();
    for (const source of sources) {
      for (const view of source._internal_timeAxisViews()) {
        view._internal_renderer()._internal_draw(target, rendererOptions);
      }
    }
  }
  _private__lineColor() {
    return this._private__chart._internal_options().timeScale.borderColor;
  }
  _private__textColor() {
    return this._private__options.textColor;
  }
  _private__fontSize() {
    return this._private__options.fontSize;
  }
  _private__baseFont() {
    return makeFont(this._private__fontSize(), this._private__options.fontFamily);
  }
  _private__baseBoldFont() {
    return makeFont(this._private__fontSize(), this._private__options.fontFamily, "bold");
  }
  _private__getRendererOptions() {
    if (this._private__rendererOptions === null) {
      this._private__rendererOptions = {
        _internal_borderSize: 1,
        _internal_baselineOffset: NaN,
        _internal_paddingTop: NaN,
        _internal_paddingBottom: NaN,
        _internal_paddingHorizontal: NaN,
        _internal_tickLength: 5,
        _internal_fontSize: NaN,
        _internal_font: "",
        _internal_widthCache: new TextWidthCache(),
        _internal_labelBottomOffset: 0
      };
    }
    const rendererOptions = this._private__rendererOptions;
    const newFont = this._private__baseFont();
    if (rendererOptions._internal_font !== newFont) {
      const fontSize = this._private__fontSize();
      rendererOptions._internal_fontSize = fontSize;
      rendererOptions._internal_font = newFont;
      rendererOptions._internal_paddingTop = 3 * fontSize / 12;
      rendererOptions._internal_paddingBottom = 3 * fontSize / 12;
      rendererOptions._internal_paddingHorizontal = 9 * fontSize / 12;
      rendererOptions._internal_baselineOffset = 0;
      rendererOptions._internal_labelBottomOffset = 4 * fontSize / 12;
      rendererOptions._internal_widthCache._internal_reset();
    }
    return this._private__rendererOptions;
  }
  _private__setCursor(type) {
    this._private__cell.style.cursor = type === 1 ? "ew-resize" : "default";
  }
  _private__recreateStubs() {
    const model = this._private__chart._internal_model();
    const options = model._internal_options();
    if (!options.leftPriceScale.visible && this._private__leftStub !== null) {
      this._private__leftStubCell.removeChild(this._private__leftStub._internal_getElement());
      this._private__leftStub._internal_destroy();
      this._private__leftStub = null;
    }
    if (!options.rightPriceScale.visible && this._private__rightStub !== null) {
      this._private__rightStubCell.removeChild(this._private__rightStub._internal_getElement());
      this._private__rightStub._internal_destroy();
      this._private__rightStub = null;
    }
    const rendererOptionsProvider = this._private__chart._internal_model()._internal_rendererOptionsProvider();
    const params = {
      _internal_rendererOptionsProvider: rendererOptionsProvider
    };
    const borderVisibleGetter = () => {
      return options.leftPriceScale.borderVisible && model._internal_timeScale()._internal_options().borderVisible;
    };
    const bottomColorGetter = () => model._internal_backgroundBottomColor();
    if (options.leftPriceScale.visible && this._private__leftStub === null) {
      this._private__leftStub = new PriceAxisStub("left", options, params, borderVisibleGetter, bottomColorGetter);
      this._private__leftStubCell.appendChild(this._private__leftStub._internal_getElement());
    }
    if (options.rightPriceScale.visible && this._private__rightStub === null) {
      this._private__rightStub = new PriceAxisStub("right", options, params, borderVisibleGetter, bottomColorGetter);
      this._private__rightStubCell.appendChild(this._private__rightStub._internal_getElement());
    }
  }
};
var windowsChrome = isChromiumBased() && isWindows();
var ChartWidget = class {
  constructor(container, options, horzScaleBehavior) {
    this._private__paneWidgets = [];
    this._private__paneSeparators = [];
    this._private__drawRafId = 0;
    this._private__height = 0;
    this._private__width = 0;
    this._private__leftPriceAxisWidth = 0;
    this._private__rightPriceAxisWidth = 0;
    this._private__invalidateMask = null;
    this._private__drawPlanned = false;
    this._private__clicked = new Delegate();
    this._private__dblClicked = new Delegate();
    this._private__crosshairMoved = new Delegate();
    this._private__observer = null;
    this._private__cursorStyleOverride = null;
    this._private__container = container;
    this._private__options = options;
    this._private__horzScaleBehavior = horzScaleBehavior;
    this._private__element = document.createElement("div");
    this._private__element.classList.add("tv-lightweight-charts");
    this._private__element.style.overflow = "hidden";
    this._private__element.style.direction = "ltr";
    this._private__element.style.width = "100%";
    this._private__element.style.height = "100%";
    disableSelection(this._private__element);
    this._private__tableElement = document.createElement("table");
    this._private__tableElement.setAttribute("cellspacing", "0");
    this._private__element.appendChild(this._private__tableElement);
    this._private__onWheelBound = this._private__onMousewheel.bind(this);
    if (shouldSubscribeMouseWheel(this._private__options)) {
      this._private__setMouseWheelEventListener(true);
    }
    this._private__model = new ChartModel(this._private__invalidateHandler.bind(this), this._private__options, horzScaleBehavior);
    this._internal_model()._internal_crosshairMoved()._internal_subscribe(this._private__onPaneWidgetCrosshairMoved.bind(this), this);
    this._private__timeAxisWidget = new TimeAxisWidget(this, this._private__horzScaleBehavior);
    this._private__tableElement.appendChild(this._private__timeAxisWidget._internal_getElement());
    const usedObserver = options.autoSize && this._private__installObserver();
    let width = this._private__options.width;
    let height = this._private__options.height;
    if (usedObserver || width === 0 || height === 0) {
      const containerRect = container.getBoundingClientRect();
      width = width || containerRect.width;
      height = height || containerRect.height;
    }
    this._internal_resize(width, height);
    this._private__syncGuiWithModel();
    container.appendChild(this._private__element);
    this._private__updateTimeAxisVisibility();
    this._private__model._internal_timeScale()._internal_optionsApplied()._internal_subscribe(this._private__model._internal_fullUpdate.bind(this._private__model), this);
    this._private__model._internal_priceScalesOptionsChanged()._internal_subscribe(this._private__model._internal_fullUpdate.bind(this._private__model), this);
  }
  _internal_model() {
    return this._private__model;
  }
  _internal_options() {
    return this._private__options;
  }
  _internal_paneWidgets() {
    return this._private__paneWidgets;
  }
  _internal_timeAxisWidget() {
    return this._private__timeAxisWidget;
  }
  _internal_destroy() {
    this._private__setMouseWheelEventListener(false);
    if (this._private__drawRafId !== 0) {
      window.cancelAnimationFrame(this._private__drawRafId);
    }
    this._private__model._internal_crosshairMoved()._internal_unsubscribeAll(this);
    this._private__model._internal_timeScale()._internal_optionsApplied()._internal_unsubscribeAll(this);
    this._private__model._internal_priceScalesOptionsChanged()._internal_unsubscribeAll(this);
    this._private__model._internal_destroy();
    for (const paneWidget of this._private__paneWidgets) {
      this._private__tableElement.removeChild(paneWidget._internal_getElement());
      paneWidget._internal_clicked()._internal_unsubscribeAll(this);
      paneWidget._internal_dblClicked()._internal_unsubscribeAll(this);
      paneWidget._internal_destroy();
    }
    this._private__paneWidgets = [];
    for (const paneSeparator of this._private__paneSeparators) {
      this._private__destroySeparator(paneSeparator);
    }
    this._private__paneSeparators = [];
    ensureNotNull(this._private__timeAxisWidget)._internal_destroy();
    if (this._private__element.parentElement !== null) {
      this._private__element.parentElement.removeChild(this._private__element);
    }
    this._private__crosshairMoved._internal_destroy();
    this._private__clicked._internal_destroy();
    this._private__dblClicked._internal_destroy();
    this._private__uninstallObserver();
  }
  _internal_resize(width, height, forceRepaint = false) {
    if (this._private__height === height && this._private__width === width) {
      return;
    }
    const sizeHint = suggestChartSize(size({ width, height }));
    this._private__height = sizeHint.height;
    this._private__width = sizeHint.width;
    const heightStr = this._private__height + "px";
    const widthStr = this._private__width + "px";
    if (!this._internal_autoSizeActive()) {
      ensureNotNull(this._private__element).style.height = heightStr;
      ensureNotNull(this._private__element).style.width = widthStr;
    }
    this._private__tableElement.style.height = heightStr;
    this._private__tableElement.style.width = widthStr;
    if (forceRepaint) {
      if (this._private__drawRafId !== 0) {
        window.cancelAnimationFrame(this._private__drawRafId);
        this._private__drawRafId = 0;
      }
      this._private__drawPlanned = false;
      const mask = InvalidateMask._internal_full();
      if (this._private__invalidateMask !== null) {
        mask._internal_merge(this._private__invalidateMask);
        this._private__invalidateMask = null;
      }
      this._private__drawImpl(mask, performance.now());
    } else {
      this._private__model._internal_fullUpdate();
    }
  }
  _internal_paint(invalidateMask) {
    if (invalidateMask === void 0) {
      invalidateMask = InvalidateMask._internal_full();
    }
    for (let i = 0; i < this._private__paneWidgets.length; i++) {
      this._private__paneWidgets[i]._internal_paint(invalidateMask._internal_invalidateForPane(i)._internal_level);
    }
    if (this._private__options.timeScale.visible) {
      this._private__timeAxisWidget._internal_paint(invalidateMask._internal_fullInvalidation());
    }
  }
  _internal_applyOptions(options) {
    const currentlyHasMouseWheelListener = shouldSubscribeMouseWheel(this._private__options);
    this._private__model._internal_applyOptions(options);
    const shouldHaveMouseWheelListener = shouldSubscribeMouseWheel(this._private__options);
    if (shouldHaveMouseWheelListener !== currentlyHasMouseWheelListener) {
      this._private__setMouseWheelEventListener(shouldHaveMouseWheelListener);
    }
    if (options["layout"]?.panes) {
      this._private__applyPanesOptions();
    }
    this._private__updateTimeAxisVisibility();
    this._private__applyAutoSizeOptions(options);
  }
  _internal_clicked() {
    return this._private__clicked;
  }
  _internal_dblClicked() {
    return this._private__dblClicked;
  }
  _internal_crosshairMoved() {
    return this._private__crosshairMoved;
  }
  _internal_takeScreenshot(addTopLayer = false) {
    if (this._private__invalidateMask !== null) {
      this._private__drawImpl(this._private__invalidateMask, performance.now());
      this._private__invalidateMask = null;
    }
    const screeshotBitmapSize = this._private__traverseLayout(null);
    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = screeshotBitmapSize.width;
    screenshotCanvas.height = screeshotBitmapSize.height;
    const ctx = ensureNotNull(screenshotCanvas.getContext("2d"));
    this._private__traverseLayout(ctx, addTopLayer);
    return screenshotCanvas;
  }
  _internal_getPriceAxisWidth(position) {
    if (position === "left" && !this._private__isLeftAxisVisible()) {
      return 0;
    }
    if (position === "right" && !this._private__isRightAxisVisible()) {
      return 0;
    }
    if (this._private__paneWidgets.length === 0) {
      return 0;
    }
    const priceAxisWidget = position === "left" ? this._private__paneWidgets[0]._internal_leftPriceAxisWidget() : this._private__paneWidgets[0]._internal_rightPriceAxisWidget();
    return ensureNotNull(priceAxisWidget)._internal_getWidth();
  }
  _internal_autoSizeActive() {
    return this._private__options.autoSize && this._private__observer !== null;
  }
  _internal_element() {
    return this._private__element;
  }
  _internal_setCursorStyle(style) {
    this._private__cursorStyleOverride = style;
    if (this._private__cursorStyleOverride) {
      this._internal_element().style.setProperty("cursor", style);
    } else {
      this._internal_element().style.removeProperty("cursor");
    }
  }
  _internal_getCursorOverrideStyle() {
    return this._private__cursorStyleOverride;
  }
  _internal_paneSize(paneIndex) {
    return ensureDefined(this._private__paneWidgets[paneIndex])._internal_getSize();
  }
  _private__applyPanesOptions() {
    this._private__paneSeparators.forEach((separator) => {
      separator._internal_update();
    });
  }
  // eslint-disable-next-line complexity
  _private__applyAutoSizeOptions(options) {
    if (options.autoSize === void 0 && this._private__observer && (options.width !== void 0 || options.height !== void 0)) {
      warn(`You should turn autoSize off explicitly before specifying sizes; try adding options.autoSize: false to new options`);
      return;
    }
    if (options.autoSize && !this._private__observer) {
      this._private__installObserver();
    }
    if (options.autoSize === false && this._private__observer !== null) {
      this._private__uninstallObserver();
    }
    if (!options.autoSize && (options.width !== void 0 || options.height !== void 0)) {
      this._internal_resize(options.width || this._private__width, options.height || this._private__height);
    }
  }
  /**
   * Traverses the widget's layout (pane and axis child widgets),
   * draws the screenshot (if rendering context is passed) and returns the screenshot bitmap size
   *
   * @param ctx - if passed, used to draw the screenshot of widget
   * @param addTopLayer - if true, the top layer with crosshair and primitives will be drawn
   * @returns screenshot bitmap size
   */
  _private__traverseLayout(ctx, addTopLayer) {
    let totalWidth = 0;
    let totalHeight = 0;
    const firstPane = this._private__paneWidgets[0];
    const drawPriceAxises = (position, targetX) => {
      let targetY = 0;
      for (let paneIndex = 0; paneIndex < this._private__paneWidgets.length; paneIndex++) {
        const paneWidget = this._private__paneWidgets[paneIndex];
        const priceAxisWidget = ensureNotNull(position === "left" ? paneWidget._internal_leftPriceAxisWidget() : paneWidget._internal_rightPriceAxisWidget());
        const bitmapSize = priceAxisWidget._internal_getBitmapSize();
        if (ctx !== null) {
          priceAxisWidget._internal_drawBitmap(ctx, targetX, targetY, addTopLayer);
        }
        targetY += bitmapSize.height;
        if (paneIndex < this._private__paneWidgets.length - 1) {
          const separator = this._private__paneSeparators[paneIndex];
          const separatorBitmapSize = separator._internal_getBitmapSize();
          if (ctx !== null) {
            separator._internal_drawBitmap(ctx, targetX, targetY);
          }
          targetY += separatorBitmapSize.height;
        }
      }
    };
    if (this._private__isLeftAxisVisible()) {
      drawPriceAxises("left", 0);
      const leftAxisBitmapWidth = ensureNotNull(firstPane._internal_leftPriceAxisWidget())._internal_getBitmapSize().width;
      totalWidth += leftAxisBitmapWidth;
    }
    for (let paneIndex = 0; paneIndex < this._private__paneWidgets.length; paneIndex++) {
      const paneWidget = this._private__paneWidgets[paneIndex];
      const bitmapSize = paneWidget._internal_getBitmapSize();
      if (ctx !== null) {
        paneWidget._internal_drawBitmap(ctx, totalWidth, totalHeight, addTopLayer);
      }
      totalHeight += bitmapSize.height;
      if (paneIndex < this._private__paneWidgets.length - 1) {
        const separator = this._private__paneSeparators[paneIndex];
        const separatorBitmapSize = separator._internal_getBitmapSize();
        if (ctx !== null) {
          separator._internal_drawBitmap(ctx, totalWidth, totalHeight);
        }
        totalHeight += separatorBitmapSize.height;
      }
    }
    const firstPaneBitmapWidth = firstPane._internal_getBitmapSize().width;
    totalWidth += firstPaneBitmapWidth;
    if (this._private__isRightAxisVisible()) {
      drawPriceAxises("right", totalWidth);
      const rightAxisBitmapWidth = ensureNotNull(firstPane._internal_rightPriceAxisWidget())._internal_getBitmapSize().width;
      totalWidth += rightAxisBitmapWidth;
    }
    const drawStub = (position, targetX, targetY) => {
      const stub = ensureNotNull(position === "left" ? this._private__timeAxisWidget._internal_leftStub() : this._private__timeAxisWidget._internal_rightStub());
      stub._internal_drawBitmap(ensureNotNull(ctx), targetX, targetY);
    };
    if (this._private__options.timeScale.visible) {
      const timeAxisBitmapSize = this._private__timeAxisWidget._internal_getBitmapSize();
      if (ctx !== null) {
        let targetX = 0;
        if (this._private__isLeftAxisVisible()) {
          drawStub("left", targetX, totalHeight);
          targetX = ensureNotNull(firstPane._internal_leftPriceAxisWidget())._internal_getBitmapSize().width;
        }
        this._private__timeAxisWidget._internal_drawBitmap(ctx, targetX, totalHeight, addTopLayer);
        targetX += timeAxisBitmapSize.width;
        if (this._private__isRightAxisVisible()) {
          drawStub("right", targetX, totalHeight);
        }
      }
      totalHeight += timeAxisBitmapSize.height;
    }
    return size({
      width: totalWidth,
      height: totalHeight
    });
  }
  // eslint-disable-next-line complexity
  _private__adjustSizeImpl() {
    let totalStretch = 0;
    let leftPriceAxisWidth = 0;
    let rightPriceAxisWidth = 0;
    for (const paneWidget of this._private__paneWidgets) {
      if (this._private__isLeftAxisVisible()) {
        leftPriceAxisWidth = Math.max(leftPriceAxisWidth, ensureNotNull(paneWidget._internal_leftPriceAxisWidget())._internal_optimalWidth(), this._private__options.leftPriceScale.minimumWidth);
      }
      if (this._private__isRightAxisVisible()) {
        rightPriceAxisWidth = Math.max(rightPriceAxisWidth, ensureNotNull(paneWidget._internal_rightPriceAxisWidget())._internal_optimalWidth(), this._private__options.rightPriceScale.minimumWidth);
      }
      totalStretch += paneWidget._internal_stretchFactor();
    }
    leftPriceAxisWidth = suggestPriceScaleWidth(leftPriceAxisWidth);
    rightPriceAxisWidth = suggestPriceScaleWidth(rightPriceAxisWidth);
    const width = this._private__width;
    const height = this._private__height;
    const paneWidth = Math.max(width - leftPriceAxisWidth - rightPriceAxisWidth, 0);
    const separatorCount = this._private__paneSeparators.length;
    const separatorHeight = 1;
    const separatorsHeight = separatorHeight * separatorCount;
    const timeAxisVisible = this._private__options.timeScale.visible;
    let timeAxisHeight = timeAxisVisible ? Math.max(this._private__timeAxisWidget._internal_optimalHeight(), this._private__options.timeScale.minimumHeight) : 0;
    timeAxisHeight = suggestTimeScaleHeight(timeAxisHeight);
    const otherWidgetHeight = separatorsHeight + timeAxisHeight;
    const totalPaneHeight = height < otherWidgetHeight ? 0 : height - otherWidgetHeight;
    const stretchPixels = totalPaneHeight / totalStretch;
    let accumulatedHeight = 0;
    const pixelRatio = window.devicePixelRatio || 1;
    for (let paneIndex = 0; paneIndex < this._private__paneWidgets.length; ++paneIndex) {
      const paneWidget = this._private__paneWidgets[paneIndex];
      paneWidget._internal_setState(this._private__model._internal_panes()[paneIndex]);
      let paneHeight = 0;
      let calculatePaneHeight = 0;
      if (paneIndex === this._private__paneWidgets.length - 1) {
        calculatePaneHeight = Math.ceil((totalPaneHeight - accumulatedHeight) * pixelRatio) / pixelRatio;
      } else {
        calculatePaneHeight = Math.round(paneWidget._internal_stretchFactor() * stretchPixels * pixelRatio) / pixelRatio;
      }
      paneHeight = Math.max(calculatePaneHeight, 2);
      accumulatedHeight += paneHeight;
      paneWidget._internal_setSize(size({ width: paneWidth, height: paneHeight }));
      if (this._private__isLeftAxisVisible()) {
        paneWidget._internal_setPriceAxisSize(leftPriceAxisWidth, "left");
      }
      if (this._private__isRightAxisVisible()) {
        paneWidget._internal_setPriceAxisSize(rightPriceAxisWidth, "right");
      }
      if (paneWidget._internal_state()) {
        this._private__model._internal_setPaneHeight(paneWidget._internal_state(), paneHeight);
      }
    }
    this._private__timeAxisWidget._internal_setSizes(size({ width: timeAxisVisible ? paneWidth : 0, height: timeAxisHeight }), timeAxisVisible ? leftPriceAxisWidth : 0, timeAxisVisible ? rightPriceAxisWidth : 0);
    this._private__model._internal_setWidth(paneWidth);
    if (this._private__leftPriceAxisWidth !== leftPriceAxisWidth) {
      this._private__leftPriceAxisWidth = leftPriceAxisWidth;
    }
    if (this._private__rightPriceAxisWidth !== rightPriceAxisWidth) {
      this._private__rightPriceAxisWidth = rightPriceAxisWidth;
    }
  }
  _private__setMouseWheelEventListener(add2) {
    if (add2) {
      this._private__element.addEventListener("wheel", this._private__onWheelBound, { passive: false });
      return;
    }
    this._private__element.removeEventListener("wheel", this._private__onWheelBound);
  }
  _private__determineWheelSpeedAdjustment(event) {
    switch (event.deltaMode) {
      case event.DOM_DELTA_PAGE:
        return 120;
      case event.DOM_DELTA_LINE:
        return 32;
    }
    if (!windowsChrome) {
      return 1;
    }
    return 1 / window.devicePixelRatio;
  }
  _private__onMousewheel(event) {
    if ((event.deltaX === 0 || !this._private__options["handleScroll"].mouseWheel) && (event.deltaY === 0 || !this._private__options["handleScale"].mouseWheel)) {
      return;
    }
    const scrollSpeedAdjustment = this._private__determineWheelSpeedAdjustment(event);
    const deltaX = scrollSpeedAdjustment * event.deltaX / 100;
    const deltaY = -(scrollSpeedAdjustment * event.deltaY / 100);
    if (event.cancelable) {
      event.preventDefault();
    }
    if (deltaY !== 0 && this._private__options["handleScale"].mouseWheel) {
      const zoomScale = Math.sign(deltaY) * Math.min(1, Math.abs(deltaY));
      const scrollPosition = event.clientX - this._private__element.getBoundingClientRect().left;
      this._internal_model()._internal_zoomTime(scrollPosition, zoomScale);
    }
    if (deltaX !== 0 && this._private__options["handleScroll"].mouseWheel) {
      this._internal_model()._internal_scrollChart(deltaX * -80);
    }
  }
  _private__drawImpl(invalidateMask, time) {
    const invalidationType = invalidateMask._internal_fullInvalidation();
    if (invalidationType === 3) {
      this._private__updateGui();
    }
    if (invalidationType === 3 || invalidationType === 2) {
      this._private__applyMomentaryAutoScale(invalidateMask);
      this._private__applyTimeScaleInvalidations(invalidateMask, time);
      this._private__timeAxisWidget._internal_update();
      this._private__paneWidgets.forEach((pane) => {
        pane._internal_updatePriceAxisWidgets();
      });
      if (this._private__invalidateMask?._internal_fullInvalidation() === 3) {
        this._private__invalidateMask._internal_merge(invalidateMask);
        this._private__updateGui();
        this._private__applyMomentaryAutoScale(this._private__invalidateMask);
        this._private__applyTimeScaleInvalidations(this._private__invalidateMask, time);
        invalidateMask = this._private__invalidateMask;
        this._private__invalidateMask = null;
      }
    }
    this._internal_paint(invalidateMask);
  }
  _private__applyTimeScaleInvalidations(invalidateMask, time) {
    for (const tsInvalidation of invalidateMask._internal_timeScaleInvalidations()) {
      this._private__applyTimeScaleInvalidation(tsInvalidation, time);
    }
  }
  _private__applyMomentaryAutoScale(invalidateMask) {
    const panes = this._private__model._internal_panes();
    for (let i = 0; i < panes.length; i++) {
      if (invalidateMask._internal_invalidateForPane(i)._internal_autoScale) {
        panes[i]._internal_momentaryAutoScale();
      }
    }
  }
  _private__applyTimeScaleInvalidation(invalidation, time) {
    const timeScale = this._private__model._internal_timeScale();
    switch (invalidation._internal_type) {
      case 0:
        timeScale._internal_fitContent();
        break;
      case 1:
        timeScale._internal_setLogicalRange(invalidation._internal_value);
        break;
      case 2:
        timeScale._internal_setBarSpacing(invalidation._internal_value);
        break;
      case 3:
        timeScale._internal_setRightOffset(invalidation._internal_value);
        break;
      case 4:
        timeScale._internal_restoreDefault();
        break;
      case 5:
        if (!invalidation._internal_value._internal_finished(time)) {
          timeScale._internal_setRightOffset(invalidation._internal_value._internal_getPosition(time));
        }
        break;
    }
  }
  _private__invalidateHandler(invalidateMask) {
    if (this._private__invalidateMask !== null) {
      this._private__invalidateMask._internal_merge(invalidateMask);
    } else {
      this._private__invalidateMask = invalidateMask;
    }
    if (!this._private__drawPlanned) {
      this._private__drawPlanned = true;
      this._private__drawRafId = window.requestAnimationFrame((time) => {
        this._private__drawPlanned = false;
        this._private__drawRafId = 0;
        if (this._private__invalidateMask !== null) {
          const mask = this._private__invalidateMask;
          this._private__invalidateMask = null;
          this._private__drawImpl(mask, time);
          for (const tsInvalidation of mask._internal_timeScaleInvalidations()) {
            if (tsInvalidation._internal_type === 5 && !tsInvalidation._internal_value._internal_finished(time)) {
              this._internal_model()._internal_setTimeScaleAnimation(tsInvalidation._internal_value);
              break;
            }
          }
        }
      });
    }
  }
  _private__updateGui() {
    this._private__syncGuiWithModel();
  }
  _private__destroySeparator(separator) {
    this._private__tableElement.removeChild(separator._internal_getElement());
    separator._internal_destroy();
  }
  _private__syncGuiWithModel() {
    const panes = this._private__model._internal_panes();
    const targetPaneWidgetsCount = panes.length;
    const actualPaneWidgetsCount = this._private__paneWidgets.length;
    for (let i = targetPaneWidgetsCount; i < actualPaneWidgetsCount; i++) {
      const paneWidget = ensureDefined(this._private__paneWidgets.pop());
      this._private__tableElement.removeChild(paneWidget._internal_getElement());
      paneWidget._internal_clicked()._internal_unsubscribeAll(this);
      paneWidget._internal_dblClicked()._internal_unsubscribeAll(this);
      paneWidget._internal_destroy();
      const paneSeparator = this._private__paneSeparators.pop();
      if (paneSeparator !== void 0) {
        this._private__destroySeparator(paneSeparator);
      }
    }
    for (let i = actualPaneWidgetsCount; i < targetPaneWidgetsCount; i++) {
      const paneWidget = new PaneWidget(this, panes[i]);
      paneWidget._internal_clicked()._internal_subscribe(this._private__onPaneWidgetClicked.bind(this, paneWidget), this);
      paneWidget._internal_dblClicked()._internal_subscribe(this._private__onPaneWidgetDblClicked.bind(this, paneWidget), this);
      this._private__paneWidgets.push(paneWidget);
      if (i > 0) {
        const paneSeparator = new PaneSeparator(this, i - 1, i);
        this._private__paneSeparators.push(paneSeparator);
        this._private__tableElement.insertBefore(paneSeparator._internal_getElement(), this._private__timeAxisWidget._internal_getElement());
      }
      this._private__tableElement.insertBefore(paneWidget._internal_getElement(), this._private__timeAxisWidget._internal_getElement());
    }
    for (let i = 0; i < targetPaneWidgetsCount; i++) {
      const state = panes[i];
      const paneWidget = this._private__paneWidgets[i];
      if (paneWidget._internal_state() !== state) {
        paneWidget._internal_setState(state);
      } else {
        paneWidget._internal_updatePriceAxisWidgetsStates();
      }
    }
    this._private__updateTimeAxisVisibility();
    this._private__adjustSizeImpl();
  }
  _private__getMouseEventParamsImpl(index, point, event, pane) {
    const seriesData = /* @__PURE__ */ new Map();
    if (index !== null) {
      const serieses = this._private__model._internal_serieses();
      serieses.forEach((s) => {
        const data = s._internal_bars()._internal_search(index);
        if (data !== null) {
          seriesData.set(s, data);
        }
      });
    }
    let clientTime;
    if (index !== null) {
      const timePoint = this._private__model._internal_timeScale()._internal_indexToTimeScalePoint(index)?.originalTime;
      if (timePoint !== void 0) {
        clientTime = timePoint;
      }
    }
    const hoveredSource = this._internal_model()._internal_hoveredSource();
    const paneIndex = this._private__getPaneIndex(pane);
    const hoveredInfo = buildHoveredEventInfo(hoveredSource, paneIndex);
    return {
      _internal_originalTime: clientTime,
      _internal_index: index ?? void 0,
      _internal_point: point ?? void 0,
      _internal_paneIndex: paneIndex !== -1 ? paneIndex : void 0,
      _internal_hoveredSeries: hoveredInfo._internal_hoveredSeries,
      _internal_seriesData: seriesData,
      _internal_hoveredObject: hoveredInfo._internal_hoveredObject,
      _internal_hoveredInfo: hoveredInfo._internal_hoveredInfo,
      _internal_touchMouseEventData: event ?? void 0
    };
  }
  _private__getPaneIndex(pane) {
    let paneIndex = -1;
    if (pane) {
      paneIndex = this._private__paneWidgets.indexOf(pane);
    } else {
      const crosshairPane = this._internal_model()._internal_crosshairSource()._internal_pane();
      if (crosshairPane !== null) {
        paneIndex = this._internal_model()._internal_panes().indexOf(crosshairPane);
      }
    }
    return paneIndex;
  }
  _private__onPaneWidgetClicked(pane, time, point, event) {
    this._private__clicked._internal_fire(() => this._private__getMouseEventParamsImpl(time, point, event, pane));
  }
  _private__onPaneWidgetDblClicked(pane, time, point, event) {
    this._private__dblClicked._internal_fire(() => this._private__getMouseEventParamsImpl(time, point, event, pane));
  }
  _private__onPaneWidgetCrosshairMoved(time, point, event) {
    this._internal_setCursorStyle(this._internal_model()._internal_hoveredSource()?._internal_cursorStyle ?? null);
    this._private__crosshairMoved._internal_fire(() => this._private__getMouseEventParamsImpl(time, point, event));
  }
  _private__updateTimeAxisVisibility() {
    const display = this._private__options.timeScale.visible ? "" : "none";
    this._private__timeAxisWidget._internal_getElement().style.display = display;
  }
  _private__isLeftAxisVisible() {
    return this._private__paneWidgets[0]._internal_state()._internal_leftPriceScale()._internal_options().visible;
  }
  _private__isRightAxisVisible() {
    return this._private__paneWidgets[0]._internal_state()._internal_rightPriceScale()._internal_options().visible;
  }
  _private__installObserver() {
    if (!("ResizeObserver" in window)) {
      warn('Options contains "autoSize" flag, but the browser does not support ResizeObserver feature. Please provide polyfill.');
      return false;
    } else {
      this._private__observer = new ResizeObserver((entries) => {
        const containerEntry = entries[entries.length - 1];
        if (!containerEntry) {
          return;
        }
        const newW = containerEntry.contentRect.width;
        const newH = containerEntry.contentRect.height;
        this._internal_resize(newW, newH, true);
      });
      this._private__observer.observe(this._private__container, { box: "border-box" });
      return true;
    }
  }
  _private__uninstallObserver() {
    if (this._private__observer !== null) {
      this._private__observer.disconnect();
    }
    this._private__observer = null;
  }
};
function disableSelection(element) {
  element.style.userSelect = "none";
  element.style.webkitUserSelect = "none";
  element.style.msUserSelect = "none";
  element.style.MozUserSelect = "none";
  element.style.webkitTapHighlightColor = "transparent";
}
function shouldSubscribeMouseWheel(options) {
  return Boolean(options["handleScroll"].mouseWheel || options["handleScale"].mouseWheel);
}
function isWhitespaceData(data) {
  return data.open === void 0 && data.value === void 0;
}
function isFulfilledData(data) {
  return isFulfilledBarData(data) || isFulfilledLineData(data);
}
function isFulfilledBarData(data) {
  return data.open !== void 0;
}
function isFulfilledLineData(data) {
  return data.value !== void 0;
}
function getColoredLineBasedSeriesPlotRow(time, index, item, originalTime) {
  const val = item.value;
  const res = { _internal_index: index, _internal_time: time, _internal_value: [val, val, val, val], _internal_originalTime: originalTime };
  if (item.color !== void 0) {
    res._internal_color = item.color;
  }
  return res;
}
function getAreaSeriesPlotRow(time, index, item, originalTime) {
  const val = item.value;
  const res = { _internal_index: index, _internal_time: time, _internal_value: [val, val, val, val], _internal_originalTime: originalTime };
  if (item.lineColor !== void 0) {
    res._internal_lineColor = item.lineColor;
  }
  if (item.topColor !== void 0) {
    res._internal_topColor = item.topColor;
  }
  if (item.bottomColor !== void 0) {
    res._internal_bottomColor = item.bottomColor;
  }
  return res;
}
function getBaselineSeriesPlotRow(time, index, item, originalTime) {
  const val = item.value;
  const res = { _internal_index: index, _internal_time: time, _internal_value: [val, val, val, val], _internal_originalTime: originalTime };
  if (item.topLineColor !== void 0) {
    res._internal_topLineColor = item.topLineColor;
  }
  if (item.bottomLineColor !== void 0) {
    res._internal_bottomLineColor = item.bottomLineColor;
  }
  if (item.topFillColor1 !== void 0) {
    res._internal_topFillColor1 = item.topFillColor1;
  }
  if (item.topFillColor2 !== void 0) {
    res._internal_topFillColor2 = item.topFillColor2;
  }
  if (item.bottomFillColor1 !== void 0) {
    res._internal_bottomFillColor1 = item.bottomFillColor1;
  }
  if (item.bottomFillColor2 !== void 0) {
    res._internal_bottomFillColor2 = item.bottomFillColor2;
  }
  return res;
}
function getBarSeriesPlotRow(time, index, item, originalTime) {
  const res = { _internal_index: index, _internal_time: time, _internal_value: [item.open, item.high, item.low, item.close], _internal_originalTime: originalTime };
  if (item.color !== void 0) {
    res._internal_color = item.color;
  }
  return res;
}
function getCandlestickSeriesPlotRow(time, index, item, originalTime) {
  const res = { _internal_index: index, _internal_time: time, _internal_value: [item.open, item.high, item.low, item.close], _internal_originalTime: originalTime };
  if (item.color !== void 0) {
    res._internal_color = item.color;
  }
  if (item.borderColor !== void 0) {
    res._internal_borderColor = item.borderColor;
  }
  if (item.wickColor !== void 0) {
    res._internal_wickColor = item.wickColor;
  }
  return res;
}
function getCustomSeriesPlotRow(time, index, item, originalTime, dataToPlotRow) {
  const values = ensureDefined(dataToPlotRow)(item);
  const max = Math.max(...values);
  const min2 = Math.min(...values);
  const last = values[values.length - 1];
  const value = [last, max, min2, last];
  const { time: excludedTime, color, ...data } = item;
  return { _internal_index: index, _internal_time: time, _internal_value: value, _internal_originalTime: originalTime, _internal_data: data, _internal_color: color };
}
function isSeriesPlotRow(row) {
  return row._internal_value !== void 0;
}
function wrapCustomValues(plotRow, bar) {
  if (bar.customValues !== void 0) {
    plotRow._internal_customValues = bar.customValues;
  }
  return plotRow;
}
function isWhitespaceDataWithCustomCheck(bar, customIsWhitespace) {
  if (customIsWhitespace) {
    return customIsWhitespace(bar);
  }
  return isWhitespaceData(bar);
}
function wrapWhitespaceData(createPlotRowFn) {
  return (time, index, bar, originalTime, dataToPlotRow, customIsWhitespace) => {
    if (isWhitespaceDataWithCustomCheck(bar, customIsWhitespace)) {
      return wrapCustomValues({ _internal_time: time, _internal_index: index, _internal_originalTime: originalTime }, bar);
    }
    return wrapCustomValues(createPlotRowFn(time, index, bar, originalTime, dataToPlotRow), bar);
  };
}
function getSeriesPlotRowCreator(seriesType) {
  const seriesPlotRowFnMap = {
    Candlestick: wrapWhitespaceData(getCandlestickSeriesPlotRow),
    Bar: wrapWhitespaceData(getBarSeriesPlotRow),
    Area: wrapWhitespaceData(getAreaSeriesPlotRow),
    Baseline: wrapWhitespaceData(getBaselineSeriesPlotRow),
    Histogram: wrapWhitespaceData(getColoredLineBasedSeriesPlotRow),
    Line: wrapWhitespaceData(getColoredLineBasedSeriesPlotRow),
    Custom: wrapWhitespaceData(getCustomSeriesPlotRow)
  };
  return seriesPlotRowFnMap[seriesType];
}
function createEmptyTimePointData(timePoint) {
  return { _internal_index: 0, _internal_mapping: /* @__PURE__ */ new Map(), _internal_timePoint: timePoint };
}
function seriesRowsFirstAndLastTime(seriesRows, bh) {
  if (seriesRows === void 0 || seriesRows.length === 0) {
    return void 0;
  }
  return {
    _internal_firstTime: bh.key(seriesRows[0]._internal_time),
    _internal_lastTime: bh.key(seriesRows[seriesRows.length - 1]._internal_time)
  };
}
function seriesUpdateInfo(seriesRows, prevSeriesRows, bh) {
  const firstAndLastTime = seriesRowsFirstAndLastTime(seriesRows, bh);
  const prevFirstAndLastTime = seriesRowsFirstAndLastTime(prevSeriesRows, bh);
  if (firstAndLastTime !== void 0 && prevFirstAndLastTime !== void 0) {
    return {
      _internal_historicalUpdate: false,
      _internal_lastBarUpdatedOrNewBarsAddedToTheRight: firstAndLastTime._internal_lastTime >= prevFirstAndLastTime._internal_lastTime && firstAndLastTime._internal_firstTime >= prevFirstAndLastTime._internal_firstTime
    };
  }
  return void 0;
}
function timeScalePointTime(mergedPointData) {
  let result;
  mergedPointData.forEach((v) => {
    if (result === void 0) {
      result = v._internal_originalTime;
    }
  });
  return ensureDefined(result);
}
function saveOriginalTime(data) {
  if (data._internal_originalTime === void 0) {
    data._internal_originalTime = data.time;
  }
}
var DataLayer = class {
  constructor(horzScaleBehavior) {
    this._private__pointDataByTimePoint = /* @__PURE__ */ new Map();
    this._private__seriesRowsBySeries = /* @__PURE__ */ new Map();
    this._private__seriesLastTimePoint = /* @__PURE__ */ new Map();
    this._private__sortedTimePoints = [];
    this._private__horzScaleBehavior = horzScaleBehavior;
  }
  _internal_destroy() {
    this._private__pointDataByTimePoint.clear();
    this._private__seriesRowsBySeries.clear();
    this._private__seriesLastTimePoint.clear();
    this._private__sortedTimePoints = [];
  }
  _internal_setSeriesData(series, data) {
    let needCleanupPoints = this._private__pointDataByTimePoint.size !== 0;
    let isTimeScaleAffected = false;
    const prevSeriesRows = this._private__seriesRowsBySeries.get(series);
    if (prevSeriesRows !== void 0) {
      if (this._private__seriesRowsBySeries.size === 1) {
        needCleanupPoints = false;
        isTimeScaleAffected = true;
        this._private__pointDataByTimePoint.clear();
      } else {
        for (const point of this._private__sortedTimePoints) {
          if (point.pointData._internal_mapping.delete(series)) {
            isTimeScaleAffected = true;
          }
        }
      }
    }
    let seriesRows = [];
    if (data.length !== 0) {
      const originalTimes = data.map((d) => d.time);
      const timeConverter = this._private__horzScaleBehavior.createConverterToInternalObj(data);
      const createPlotRow = getSeriesPlotRowCreator(series._internal_seriesType());
      const dataToPlotRow = series._internal_customSeriesPlotValuesBuilder();
      const customWhitespaceChecker = series._internal_customSeriesWhitespaceCheck();
      seriesRows = data.map((item, index) => {
        const time = timeConverter(item.time);
        const horzItemKey = this._private__horzScaleBehavior.key(time);
        let timePointData = this._private__pointDataByTimePoint.get(horzItemKey);
        if (timePointData === void 0) {
          timePointData = createEmptyTimePointData(time);
          this._private__pointDataByTimePoint.set(horzItemKey, timePointData);
          isTimeScaleAffected = true;
        }
        const row = createPlotRow(time, timePointData._internal_index, item, originalTimes[index], dataToPlotRow, customWhitespaceChecker);
        timePointData._internal_mapping.set(series, row);
        return row;
      });
    }
    if (needCleanupPoints) {
      this._private__cleanupPointsData();
    }
    this._private__setRowsToSeries(series, seriesRows);
    let firstChangedPointIndex = -1;
    if (isTimeScaleAffected) {
      const newTimeScalePoints = [];
      this._private__pointDataByTimePoint.forEach((pointData) => {
        newTimeScalePoints.push({
          timeWeight: 0,
          time: pointData._internal_timePoint,
          pointData,
          originalTime: timeScalePointTime(pointData._internal_mapping)
        });
      });
      newTimeScalePoints.sort((t1, t2) => this._private__horzScaleBehavior.key(t1.time) - this._private__horzScaleBehavior.key(t2.time));
      firstChangedPointIndex = this._private__replaceTimeScalePoints(newTimeScalePoints);
    }
    return this._private__getUpdateResponse(series, firstChangedPointIndex, seriesUpdateInfo(this._private__seriesRowsBySeries.get(series), prevSeriesRows, this._private__horzScaleBehavior));
  }
  _internal_removeSeries(series) {
    return this._internal_setSeriesData(series, []);
  }
  // eslint-disable-next-line complexity
  _internal_updateSeriesData(series, data, historicalUpdate) {
    if (historicalUpdate && series._internal_isConflationEnabled()) {
      throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
    }
    const extendedData = data;
    saveOriginalTime(extendedData);
    this._private__horzScaleBehavior.preprocessData(data);
    const timeConverter = this._private__horzScaleBehavior.createConverterToInternalObj([data]);
    const time = timeConverter(data.time);
    const lastSeriesTime = this._private__seriesLastTimePoint.get(series);
    if (!historicalUpdate && lastSeriesTime !== void 0 && this._private__horzScaleBehavior.key(time) < this._private__horzScaleBehavior.key(lastSeriesTime)) {
      throw new Error(`Cannot update oldest data, last time=${lastSeriesTime}, new time=${time}`);
    }
    let pointDataAtTime = this._private__pointDataByTimePoint.get(this._private__horzScaleBehavior.key(time));
    if (historicalUpdate && pointDataAtTime === void 0) {
      throw new Error("Cannot update non-existing data point when historicalUpdate is true");
    }
    const affectsTimeScale = pointDataAtTime === void 0;
    if (pointDataAtTime === void 0) {
      pointDataAtTime = createEmptyTimePointData(time);
      this._private__pointDataByTimePoint.set(this._private__horzScaleBehavior.key(time), pointDataAtTime);
    }
    const createPlotRow = getSeriesPlotRowCreator(series._internal_seriesType());
    const dataToPlotRow = series._internal_customSeriesPlotValuesBuilder();
    const customWhitespaceChecker = series._internal_customSeriesWhitespaceCheck();
    const plotRow = createPlotRow(time, pointDataAtTime._internal_index, data, extendedData._internal_originalTime, dataToPlotRow, customWhitespaceChecker);
    const isLastBarUpdate = !historicalUpdate && !affectsTimeScale && lastSeriesTime !== void 0 && this._private__horzScaleBehavior.key(time) === this._private__horzScaleBehavior.key(lastSeriesTime);
    pointDataAtTime._internal_mapping.set(series, plotRow);
    if (historicalUpdate) {
      this._private__updateHistoricalSeriesRow(series, plotRow, pointDataAtTime._internal_index);
    } else if (isLastBarUpdate && series._internal_isConflationEnabled() && isSeriesPlotRow(plotRow)) {
      series._internal_updateLastConflatedChunk(plotRow);
      this._private__updateLastSeriesRow(series, plotRow);
    } else {
      this._private__updateLastSeriesRow(series, plotRow);
    }
    const info = {
      _internal_lastBarUpdatedOrNewBarsAddedToTheRight: isSeriesPlotRow(plotRow),
      _internal_historicalUpdate: historicalUpdate
    };
    if (!affectsTimeScale) {
      return this._private__getUpdateResponse(series, -1, info);
    }
    const newPoint = {
      timeWeight: 0,
      time: pointDataAtTime._internal_timePoint,
      pointData: pointDataAtTime,
      originalTime: timeScalePointTime(pointDataAtTime._internal_mapping)
    };
    const insertIndex = lowerBound(this._private__sortedTimePoints, this._private__horzScaleBehavior.key(newPoint.time), (a, b) => this._private__horzScaleBehavior.key(a.time) < b);
    this._private__sortedTimePoints.splice(insertIndex, 0, newPoint);
    for (let index = insertIndex; index < this._private__sortedTimePoints.length; ++index) {
      assignIndexToPointData(this._private__sortedTimePoints[index].pointData, index);
    }
    this._private__horzScaleBehavior.fillWeightsForPoints(this._private__sortedTimePoints, insertIndex);
    return this._private__getUpdateResponse(series, insertIndex, info);
  }
  _internal_popSeriesData(series, count) {
    const seriesData = this._private__seriesRowsBySeries.get(series);
    if (seriesData === void 0 || count <= 0) {
      return [[], this._private__emptyUpdateResponse()];
    }
    count = Math.min(count, seriesData.length);
    const poppedData = seriesData.splice(-count).reverse();
    if (seriesData.length === 0) {
      this._private__seriesLastTimePoint.delete(series);
    } else {
      this._private__seriesLastTimePoint.set(series, seriesData[seriesData.length - 1]._internal_time);
    }
    for (const data of poppedData) {
      const pointData = this._private__pointDataByTimePoint.get(this._private__horzScaleBehavior.key(data._internal_time));
      if (!pointData) {
        continue;
      }
      pointData._internal_mapping.delete(series);
      if (pointData._internal_mapping.size !== 0) {
        continue;
      }
      this._private__pointDataByTimePoint.delete(this._private__horzScaleBehavior.key(pointData._internal_timePoint));
      this._private__sortedTimePoints.splice(pointData._internal_index, 1);
      for (let index = pointData._internal_index; index < this._private__sortedTimePoints.length; ++index) {
        assignIndexToPointData(this._private__sortedTimePoints[index].pointData, index);
      }
    }
    const info = {
      _internal_historicalUpdate: false,
      _internal_lastBarUpdatedOrNewBarsAddedToTheRight: false
    };
    return [poppedData, this._private__getUpdateResponse(series, this._private__sortedTimePoints.length - 1, info)];
  }
  _private__updateLastSeriesRow(series, plotRow) {
    let seriesData = this._private__seriesRowsBySeries.get(series);
    if (seriesData === void 0) {
      seriesData = [];
      this._private__seriesRowsBySeries.set(series, seriesData);
    }
    const lastSeriesRow = seriesData.length !== 0 ? seriesData[seriesData.length - 1] : null;
    if (lastSeriesRow === null || this._private__horzScaleBehavior.key(plotRow._internal_time) > this._private__horzScaleBehavior.key(lastSeriesRow._internal_time)) {
      if (isSeriesPlotRow(plotRow)) {
        seriesData.push(plotRow);
      }
    } else {
      if (isSeriesPlotRow(plotRow)) {
        seriesData[seriesData.length - 1] = plotRow;
      } else {
        seriesData.splice(-1, 1);
      }
    }
    this._private__seriesLastTimePoint.set(series, plotRow._internal_time);
  }
  _private__updateHistoricalSeriesRow(series, plotRow, pointDataIndex) {
    const seriesData = this._private__seriesRowsBySeries.get(series);
    if (seriesData === void 0) {
      return;
    }
    const index = lowerBound(seriesData, pointDataIndex, (row, currentIndex) => row._internal_index < currentIndex);
    if (isSeriesPlotRow(plotRow)) {
      seriesData[index] = plotRow;
    } else {
      seriesData.splice(index, 1);
    }
  }
  _private__setRowsToSeries(series, seriesRows) {
    if (seriesRows.length !== 0) {
      this._private__seriesRowsBySeries.set(series, seriesRows.filter(isSeriesPlotRow));
      this._private__seriesLastTimePoint.set(series, seriesRows[seriesRows.length - 1]._internal_time);
    } else {
      this._private__seriesRowsBySeries.delete(series);
      this._private__seriesLastTimePoint.delete(series);
    }
  }
  _private__cleanupPointsData() {
    for (const point of this._private__sortedTimePoints) {
      if (point.pointData._internal_mapping.size === 0) {
        this._private__pointDataByTimePoint.delete(this._private__horzScaleBehavior.key(point.time));
      }
    }
  }
  /**
   * Sets new time scale and make indexes valid for all series
   *
   * @returns The index of the first changed point or `-1` if there is no change.
   */
  _private__replaceTimeScalePoints(newTimePoints) {
    let firstChangedPointIndex = -1;
    for (let index = 0; index < this._private__sortedTimePoints.length && index < newTimePoints.length; ++index) {
      const oldPoint = this._private__sortedTimePoints[index];
      const newPoint = newTimePoints[index];
      if (this._private__horzScaleBehavior.key(oldPoint.time) !== this._private__horzScaleBehavior.key(newPoint.time)) {
        firstChangedPointIndex = index;
        break;
      }
      newPoint.timeWeight = oldPoint.timeWeight;
      assignIndexToPointData(newPoint.pointData, index);
    }
    if (firstChangedPointIndex === -1 && this._private__sortedTimePoints.length !== newTimePoints.length) {
      firstChangedPointIndex = Math.min(this._private__sortedTimePoints.length, newTimePoints.length);
    }
    if (firstChangedPointIndex === -1) {
      return -1;
    }
    for (let index = firstChangedPointIndex; index < newTimePoints.length; ++index) {
      assignIndexToPointData(newTimePoints[index].pointData, index);
    }
    this._private__horzScaleBehavior.fillWeightsForPoints(newTimePoints, firstChangedPointIndex);
    this._private__sortedTimePoints = newTimePoints;
    return firstChangedPointIndex;
  }
  _private__getBaseIndex() {
    if (this._private__seriesRowsBySeries.size === 0) {
      return null;
    }
    let baseIndex = 0;
    this._private__seriesRowsBySeries.forEach((data) => {
      if (data.length !== 0) {
        baseIndex = Math.max(baseIndex, data[data.length - 1]._internal_index);
      }
    });
    return baseIndex;
  }
  _private__getUpdateResponse(updatedSeries, firstChangedPointIndex, info) {
    const dataUpdateResponse = this._private__emptyUpdateResponse();
    if (firstChangedPointIndex !== -1) {
      this._private__seriesRowsBySeries.forEach((data, s) => {
        dataUpdateResponse._internal_series.set(s, {
          _internal_data: data,
          _internal_info: s === updatedSeries ? info : void 0
        });
      });
      if (!this._private__seriesRowsBySeries.has(updatedSeries)) {
        dataUpdateResponse._internal_series.set(updatedSeries, { _internal_data: [], _internal_info: info });
      }
      dataUpdateResponse._internal_timeScale._internal_points = this._private__sortedTimePoints;
      dataUpdateResponse._internal_timeScale._internal_firstChangedPointIndex = firstChangedPointIndex;
    } else {
      const seriesData = this._private__seriesRowsBySeries.get(updatedSeries);
      dataUpdateResponse._internal_series.set(updatedSeries, { _internal_data: seriesData || [], _internal_info: info });
    }
    return dataUpdateResponse;
  }
  _private__emptyUpdateResponse() {
    return {
      _internal_series: /* @__PURE__ */ new Map(),
      _internal_timeScale: {
        _internal_baseIndex: this._private__getBaseIndex()
      }
    };
  }
};
function assignIndexToPointData(pointData, index) {
  pointData._internal_index = index;
  pointData._internal_mapping.forEach((seriesRow) => {
    seriesRow._internal_index = index;
  });
}
function lowerBoundByCoordinate(item, value) {
  return item._internal_x < value;
}
function upperBoundByCoordinate(item, value) {
  return value < item._internal_x;
}
function lowerBoundByX(items, value, from, to) {
  return lowerBound(items, value, lowerBoundByCoordinate, from, to);
}
function upperBoundByX(items, value, from, to) {
  return upperBound(items, value, upperBoundByCoordinate, from, to);
}
function hoveredSeriesHitTestResult(distance, priority, itemType) {
  return { _internal_distance: distance, _internal_priority: priority, _internal_itemType: itemType };
}
function isWithinHorizontalSweep(x, left, right, radius2) {
  return x >= left - radius2 && x <= right + radius2;
}
function distanceToSegment(x, y, x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  if (deltaX === 0 && deltaY === 0) {
    return Math.hypot(x - x1, y - y1);
  }
  const projection = ((x - x1) * deltaX + (y - y1) * deltaY) / (deltaX * deltaX + deltaY * deltaY);
  const clampedProjection = Math.max(0, Math.min(1, projection));
  const closestX = x1 + deltaX * clampedProjection;
  const closestY = y1 + deltaY * clampedProjection;
  return Math.hypot(x - closestX, y - closestY);
}
var rangePair = [0, 0];
function slotStart(item, previousItem, barSpacing) {
  if (previousItem === void 0 || previousItem._internal_time !== item._internal_time - 1) {
    return item._internal_x - barSpacing / 2;
  }
  return (previousItem._internal_x + item._internal_x) / 2;
}
function slotEnd(item, nextItem, barSpacing) {
  if (nextItem === void 0 || nextItem._internal_time !== item._internal_time + 1) {
    return item._internal_x + barSpacing / 2;
  }
  return (item._internal_x + nextItem._internal_x) / 2;
}
function hitTestSeriesRange(items, visibleRange, x, y, barSpacing, hitTestTolerance, rangeProvider) {
  if (visibleRange === null || visibleRange.from >= visibleRange.to || items.length === 0) {
    return null;
  }
  const horizontalRadius = barSpacing / 2 + hitTestTolerance;
  const candidateFrom = lowerBoundByX(items, x - horizontalRadius, visibleRange.from, visibleRange.to);
  const candidateTo = upperBoundByX(items, x + horizontalRadius, candidateFrom, visibleRange.to);
  if (candidateFrom >= candidateTo) {
    return null;
  }
  let minDistance = Number.POSITIVE_INFINITY;
  for (let itemIndex = candidateFrom; itemIndex < candidateTo; itemIndex++) {
    const item = items[itemIndex];
    const previousItem = itemIndex > visibleRange.from ? items[itemIndex - 1] : void 0;
    const nextItem = itemIndex < visibleRange.to - 1 ? items[itemIndex + 1] : void 0;
    const leftBoundary = slotStart(item, previousItem, barSpacing) - hitTestTolerance;
    const rightBoundary = slotEnd(item, nextItem, barSpacing) + hitTestTolerance;
    if (x < leftBoundary || x > rightBoundary) {
      continue;
    }
    rangeProvider(item, rangePair);
    const rangeStart = rangePair[0];
    const rangeEnd = rangePair[1];
    const actualTop = Math.min(rangeStart, rangeEnd);
    const actualBottom = Math.max(rangeStart, rangeEnd);
    const top = actualTop - hitTestTolerance;
    const bottom = actualBottom + hitTestTolerance;
    if (y >= actualTop && y <= actualBottom) {
      minDistance = Math.min(minDistance, 0);
      continue;
    }
    if (y >= top && y <= bottom) {
      const distance = Math.min(Math.abs(y - actualTop), Math.abs(actualBottom - y));
      minDistance = Math.min(minDistance, distance);
    }
  }
  return Number.isFinite(minDistance) ? hoveredSeriesHitTestResult(minDistance, 0, "series-range") : null;
}
function lowerBoundItemsCompare(item, time) {
  return item._internal_time < time;
}
function upperBoundItemsCompare(item, time) {
  return time < item._internal_time;
}
function visibleTimedValues(items, range, extendedRange) {
  const firstBar = range._internal_left();
  const lastBar = range._internal_right();
  const from = lowerBound(items, firstBar, lowerBoundItemsCompare);
  const to = upperBound(items, lastBar, upperBoundItemsCompare);
  if (!extendedRange) {
    return { from, to };
  }
  let extendedFrom = from;
  let extendedTo = to;
  if (from > 0 && from < items.length && items[from]._internal_time >= firstBar) {
    extendedFrom = from - 1;
  }
  if (to > 0 && to < items.length && items[to - 1]._internal_time <= lastBar) {
    extendedTo = to + 1;
  }
  return { from: extendedFrom, to: extendedTo };
}
var SeriesPaneViewBase = class {
  constructor(series, model, extendedVisibleRange) {
    this._internal__invalidated = true;
    this._internal__dataInvalidated = true;
    this._internal__optionsInvalidated = true;
    this._internal__items = [];
    this._internal__itemsVisibleRange = null;
    this._private__lastConflationKey = -1;
    this._internal__series = series;
    this._internal__model = model;
    this._private__extendedVisibleRange = extendedVisibleRange;
  }
  _internal_update(updateType) {
    this._internal__invalidated = true;
    if (updateType === "data") {
      this._internal__dataInvalidated = true;
    }
    if (updateType === "options") {
      this._internal__optionsInvalidated = true;
    }
  }
  _internal_renderer() {
    if (!this._internal__series._internal_visible()) {
      return null;
    }
    this._internal__makeValid();
    return this._internal__itemsVisibleRange === null ? null : this._internal__renderer;
  }
  _internal_hitTest(x, y) {
    if (!this._internal__series._internal_visible()) {
      return null;
    }
    this._internal__makeValid();
    if (this._internal__itemsVisibleRange === null) {
      return null;
    }
    return this._internal__hitTestImpl(x, y);
  }
  _internal__hitTestImpl(x, y) {
    return null;
  }
  _internal__updateOptions() {
    this._internal__items = this._internal__items.map((item) => ({
      ...item,
      ...this._internal__series._internal_barColorer()._internal_barStyle(item._internal_time)
    }));
  }
  _internal__clearVisibleRange() {
    this._internal__itemsVisibleRange = null;
  }
  _internal__makeValid() {
    const timeScale = this._internal__model._internal_timeScale();
    const conflationEnabled = timeScale._internal_options().enableConflation;
    const currentConflationKey = conflationEnabled ? timeScale._internal_conflationFactor() : 0;
    if (currentConflationKey !== this._private__lastConflationKey) {
      this._internal__dataInvalidated = true;
      this._private__lastConflationKey = currentConflationKey;
    }
    if (this._internal__dataInvalidated) {
      this._internal__fillRawPoints();
      this._internal__dataInvalidated = false;
    }
    if (this._internal__optionsInvalidated) {
      this._internal__updateOptions();
      this._internal__optionsInvalidated = false;
    }
    if (this._internal__invalidated) {
      this._private__makeValidImpl();
      this._internal__invalidated = false;
    }
  }
  _private__makeValidImpl() {
    const priceScale = this._internal__series._internal_priceScale();
    const timeScale = this._internal__model._internal_timeScale();
    this._internal__clearVisibleRange();
    if (timeScale._internal_isEmpty() || priceScale._internal_isEmpty()) {
      return;
    }
    const visibleBars = timeScale._internal_visibleStrictRange();
    if (visibleBars === null) {
      return;
    }
    if (this._internal__series._internal_bars()._internal_size() === 0) {
      return;
    }
    const firstValue = this._internal__series._internal_firstValue();
    if (firstValue === null) {
      return;
    }
    this._internal__itemsVisibleRange = visibleTimedValues(this._internal__items, visibleBars, this._private__extendedVisibleRange);
    this._internal__convertToCoordinates(priceScale, timeScale, firstValue._internal_value);
    this._internal__prepareRendererData();
  }
};
var CustomSeriesPaneRendererWrapper = class {
  constructor(sourceRenderer, priceScale) {
    this._private__sourceRenderer = sourceRenderer;
    this._private__priceScale = priceScale;
  }
  _internal_draw(target, isHovered, hitTestData) {
    this._private__sourceRenderer.draw(target, this._private__priceScale, isHovered, hitTestData);
  }
};
function customHitPriority(type) {
  switch (type) {
    case "point":
      return 2;
    case "range":
      return 0;
    case "line":
    case "custom":
    default:
      return 1;
  }
}
function normalizeCustomHit(result) {
  return {
    _internal_distance: result.distance,
    _internal_priority: customHitPriority(result.type),
    _internal_itemType: "custom",
    _internal_cursorStyle: result.cursorStyle,
    _internal_externalId: result.objectId,
    _internal_hitTestData: result.hitTestData
  };
}
var SeriesCustomPaneView = class extends SeriesPaneViewBase {
  constructor(series, model, paneView) {
    super(series, model, false);
    this._private__paneView = paneView;
    this._private__sourceRenderer = this._private__paneView.renderer();
    this._internal__renderer = new CustomSeriesPaneRendererWrapper(this._private__sourceRenderer, (price) => this._private__rendererPriceCoordinate(price));
  }
  get _internal_conflationReducer() {
    return this._private__paneView.conflationReducer;
  }
  _internal_priceValueBuilder(plotRow) {
    return this._private__paneView.priceValueBuilder(plotRow);
  }
  _internal_isWhitespace(data) {
    return this._private__paneView.isWhitespace(data);
  }
  _internal__hitTestImpl(x, y) {
    const customHit = this._private__sourceRenderer.hitTest?.(x, y, (price) => this._private__rendererPriceCoordinate(price));
    if (customHit !== null && customHit !== void 0) {
      return normalizeCustomHit(customHit);
    }
    const fallbackHit = hitTestSeriesRange(this._internal__items, this._internal__itemsVisibleRange, x, y, this._internal__model._internal_timeScale()._internal_barSpacing(), this._internal__series._internal_options().hitTestTolerance, (bar, out) => {
      const originalData = bar._internal_originalData;
      let top = NaN;
      let bottom = NaN;
      if (originalData !== void 0 && !this._private__paneView.isWhitespace(originalData)) {
        for (const price of this._private__paneView.priceValueBuilder(originalData)) {
          const coordinate = this._private__rendererPriceCoordinate(price);
          if (coordinate === null) {
            continue;
          }
          top = Number.isNaN(top) ? coordinate : Math.min(top, coordinate);
          bottom = Number.isNaN(bottom) ? coordinate : Math.max(bottom, coordinate);
        }
      }
      out[0] = top;
      out[1] = bottom;
    });
    return fallbackHit === null ? null : {
      ...fallbackHit,
      _internal_itemType: "custom"
    };
  }
  _internal__fillRawPoints() {
    const colorer = this._internal__series._internal_barColorer();
    this._internal__items = this._internal__series._internal_conflatedBars()._internal_rows().map((row) => {
      return {
        _internal_time: row._internal_index,
        _internal_x: NaN,
        ...colorer._internal_barStyle(row._internal_index),
        _internal_originalData: row._internal_data
      };
    });
  }
  _internal__convertToCoordinates(priceScale, timeScale) {
    timeScale._internal_indexesToCoordinates(this._internal__items, undefinedIfNull(this._internal__itemsVisibleRange));
  }
  _internal__prepareRendererData() {
    this._private__paneView.update({
      bars: this._internal__items.map(unwrapItemData),
      barSpacing: this._internal__model._internal_timeScale()._internal_barSpacing(),
      visibleRange: this._internal__itemsVisibleRange,
      conflationFactor: this._internal__model._internal_timeScale()._internal_conflationFactor()
    }, this._internal__series._internal_options());
  }
  _private__rendererPriceCoordinate(price) {
    const firstValue = this._internal__series._internal_firstValue();
    if (firstValue === null) {
      return null;
    }
    return this._internal__series._internal_priceScale()._internal_priceToCoordinate(price, firstValue._internal_value);
  }
};
function unwrapItemData(item) {
  return {
    x: item._internal_x,
    time: item._internal_time,
    originalData: item._internal_originalData,
    barColor: item._internal_barColor
  };
}
var customStyleDefaults = {
  color: "#2196f3"
};
var createPaneView$6 = (series, model, customPaneView) => {
  const paneView = ensure(customPaneView);
  return new SeriesCustomPaneView(series, model, paneView);
};
var createCustomSeriesDefinition = (paneView) => {
  const definition = {
    type: "Custom",
    isBuiltIn: false,
    defaultOptions: { ...customStyleDefaults, ...paneView.defaultOptions() },
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView$6,
    _internal_customPaneView: paneView
  };
  return definition;
};
var isSeriesDefinition = (value) => {
  return value._internal_createPaneView !== void 0;
};
function singleValueData(plotRow) {
  const data = {
    value: plotRow._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ],
    time: plotRow._internal_originalTime
  };
  if (plotRow._internal_customValues !== void 0) {
    data.customValues = plotRow._internal_customValues;
  }
  return data;
}
function lineData(plotRow) {
  const result = singleValueData(plotRow);
  if (plotRow._internal_color !== void 0) {
    result.color = plotRow._internal_color;
  }
  return result;
}
function areaData(plotRow) {
  const result = singleValueData(plotRow);
  if (plotRow._internal_lineColor !== void 0) {
    result.lineColor = plotRow._internal_lineColor;
  }
  if (plotRow._internal_topColor !== void 0) {
    result.topColor = plotRow._internal_topColor;
  }
  if (plotRow._internal_bottomColor !== void 0) {
    result.bottomColor = plotRow._internal_bottomColor;
  }
  return result;
}
function baselineData(plotRow) {
  const result = singleValueData(plotRow);
  if (plotRow._internal_topLineColor !== void 0) {
    result.topLineColor = plotRow._internal_topLineColor;
  }
  if (plotRow._internal_bottomLineColor !== void 0) {
    result.bottomLineColor = plotRow._internal_bottomLineColor;
  }
  if (plotRow._internal_topFillColor1 !== void 0) {
    result.topFillColor1 = plotRow._internal_topFillColor1;
  }
  if (plotRow._internal_topFillColor2 !== void 0) {
    result.topFillColor2 = plotRow._internal_topFillColor2;
  }
  if (plotRow._internal_bottomFillColor1 !== void 0) {
    result.bottomFillColor1 = plotRow._internal_bottomFillColor1;
  }
  if (plotRow._internal_bottomFillColor2 !== void 0) {
    result.bottomFillColor2 = plotRow._internal_bottomFillColor2;
  }
  return result;
}
function ohlcData(plotRow) {
  const data = {
    open: plotRow._internal_value[
      0
      /* PlotRowValueIndex.Open */
    ],
    high: plotRow._internal_value[
      1
      /* PlotRowValueIndex.High */
    ],
    low: plotRow._internal_value[
      2
      /* PlotRowValueIndex.Low */
    ],
    close: plotRow._internal_value[
      3
      /* PlotRowValueIndex.Close */
    ],
    time: plotRow._internal_originalTime
  };
  if (plotRow._internal_customValues !== void 0) {
    data.customValues = plotRow._internal_customValues;
  }
  return data;
}
function barData(plotRow) {
  const result = ohlcData(plotRow);
  if (plotRow._internal_color !== void 0) {
    result.color = plotRow._internal_color;
  }
  return result;
}
function candlestickData(plotRow) {
  const result = ohlcData(plotRow);
  const { _internal_color: color, _internal_borderColor: borderColor, _internal_wickColor: wickColor } = plotRow;
  if (color !== void 0) {
    result.color = color;
  }
  if (borderColor !== void 0) {
    result.borderColor = borderColor;
  }
  if (wickColor !== void 0) {
    result.wickColor = wickColor;
  }
  return result;
}
function getSeriesDataCreator(seriesType) {
  const seriesPlotRowToDataMap = {
    Area: areaData,
    Line: lineData,
    Baseline: baselineData,
    Histogram: lineData,
    Bar: barData,
    Candlestick: candlestickData,
    Custom: customData
  };
  return seriesPlotRowToDataMap[seriesType];
}
function customData(plotRow) {
  const time = plotRow._internal_originalTime;
  return {
    ...plotRow._internal_data,
    time
  };
}
var crosshairOptionsDefaults = {
  vertLine: {
    color: "#9598A1",
    width: 1,
    style: 3,
    visible: true,
    labelVisible: true,
    labelBackgroundColor: "#131722"
  },
  horzLine: {
    color: "#9598A1",
    width: 1,
    style: 3,
    visible: true,
    labelVisible: true,
    labelBackgroundColor: "#131722"
  },
  mode: 1,
  doNotSnapToHiddenSeriesIndices: false
};
var gridOptionsDefaults = {
  vertLines: {
    color: "#D6DCDE",
    style: 0,
    visible: true
  },
  horzLines: {
    color: "#D6DCDE",
    style: 0,
    visible: true
  }
};
var layoutOptionsDefaults = {
  background: {
    type: "solid",
    color: "#FFFFFF"
  },
  textColor: "#191919",
  fontSize: 12,
  fontFamily: defaultFontFamily,
  panes: {
    enableResize: true,
    separatorColor: "#E0E3EB",
    separatorHoverColor: "rgba(178, 181, 189, 0.2)"
  },
  attributionLogo: true,
  colorSpace: "srgb",
  colorParsers: []
};
var priceScaleOptionsDefaults = {
  autoScale: true,
  mode: 0,
  invertScale: false,
  alignLabels: true,
  borderVisible: true,
  borderColor: "#2B2B43",
  entireTextOnly: false,
  visible: false,
  ticksVisible: false,
  scaleMargins: {
    bottom: 0.1,
    top: 0.2
  },
  minimumWidth: 0,
  ensureEdgeTickMarksVisible: false,
  tickMarkDensity: 2.5
};
var timeScaleOptionsDefaults = {
  rightOffset: 0,
  barSpacing: 6,
  minBarSpacing: 0.5,
  maxBarSpacing: 0,
  fixLeftEdge: false,
  fixRightEdge: false,
  lockVisibleTimeRangeOnResize: false,
  rightBarStaysOnScroll: false,
  borderVisible: true,
  borderColor: "#2B2B43",
  visible: true,
  timeVisible: false,
  secondsVisible: true,
  shiftVisibleRangeOnNewBar: true,
  allowShiftVisibleRangeOnWhitespaceReplacement: false,
  ticksVisible: false,
  uniformDistribution: false,
  minimumHeight: 0,
  allowBoldLabels: true,
  ignoreWhitespaceIndices: false,
  enableConflation: false,
  conflationThresholdFactor: 1,
  precomputeConflationOnInit: false,
  precomputeConflationPriority: "background"
};
function chartOptionsDefaults() {
  return {
    addDefaultPane: true,
    hoveredSeriesOnTop: true,
    width: 0,
    height: 0,
    autoSize: false,
    layout: layoutOptionsDefaults,
    crosshair: crosshairOptionsDefaults,
    grid: gridOptionsDefaults,
    overlayPriceScales: {
      ...priceScaleOptionsDefaults
    },
    leftPriceScale: {
      ...priceScaleOptionsDefaults,
      visible: false
    },
    rightPriceScale: {
      ...priceScaleOptionsDefaults,
      visible: true
    },
    defaultVisiblePriceScaleId: "right",
    timeScale: timeScaleOptionsDefaults,
    localization: {
      locale: isRunningOnClientSide ? navigator.language : "",
      dateFormat: "dd MMM 'yy"
    },
    handleScroll: {
      mouseWheel: true,
      pressedMouseMove: true,
      horzTouchDrag: true,
      vertTouchDrag: true
    },
    handleScale: {
      axisPressedMouseMove: {
        time: true,
        price: true
      },
      axisDoubleClickReset: {
        time: true,
        price: true
      },
      mouseWheel: true,
      pinch: true
    },
    kineticScroll: {
      mouse: false,
      touch: true
    },
    trackingMode: {
      exitMode: 1
    }
  };
}
var PriceScaleApi = class {
  constructor(chartWidget, priceScaleId, paneIndex) {
    this._private__chartWidget = chartWidget;
    this._private__priceScaleId = priceScaleId;
    this._private__paneIndex = paneIndex ?? 0;
  }
  applyOptions(options) {
    this._private__chartWidget._internal_model()._internal_applyPriceScaleOptions(this._private__priceScaleId, options, this._private__paneIndex);
  }
  options() {
    return this._private__priceScale()._internal_options();
  }
  width() {
    if (!isDefaultPriceScale(this._private__priceScaleId)) {
      return 0;
    }
    return this._private__chartWidget._internal_getPriceAxisWidth(this._private__priceScaleId);
  }
  setVisibleRange(range) {
    this.setAutoScale(false);
    this._private__priceScale()._internal_setCustomPriceRange(new PriceRangeImpl(range.from, range.to));
  }
  getVisibleRange() {
    let range = this._private__priceScale()._internal_priceRange();
    if (range === null) {
      return null;
    }
    let from;
    let to;
    if (this._private__priceScale()._internal_isLog()) {
      const minMove = this._private__priceScale()._internal_minMove();
      const minMovePrecision = precisionByMinMove(minMove);
      range = convertPriceRangeFromLog(range, this._private__priceScale()._internal_getLogFormula());
      from = Number((Math.round(range._internal_minValue() / minMove) * minMove).toFixed(minMovePrecision));
      to = Number((Math.round(range._internal_maxValue() / minMove) * minMove).toFixed(minMovePrecision));
    } else {
      from = range._internal_minValue();
      to = range._internal_maxValue();
    }
    return {
      from,
      to
    };
  }
  setAutoScale(on) {
    this.applyOptions({ autoScale: on });
  }
  _private__priceScale() {
    return ensureNotNull(this._private__chartWidget._internal_model()._internal_findPriceScale(this._private__priceScaleId, this._private__paneIndex))._internal_priceScale;
  }
};
var PaneApi = class {
  constructor(chartWidget, seriesApiGetter, pane, chartApi) {
    this._private__chartWidget = chartWidget;
    this._private__pane = pane;
    this._private__seriesApiGetter = seriesApiGetter;
    this._internal__chartApi = chartApi;
  }
  getHeight() {
    return this._private__pane._internal_height();
  }
  setHeight(height) {
    const chartModel = this._private__chartWidget._internal_model();
    const paneIndex = chartModel._internal_getPaneIndex(this._private__pane);
    chartModel._internal_changePanesHeight(paneIndex, height);
  }
  getStretchFactor() {
    return this._private__pane._internal_stretchFactor();
  }
  setStretchFactor(stretchFactor) {
    this._private__pane._internal_setStretchFactor(stretchFactor);
    this._private__chartWidget._internal_model()._internal_fullUpdate();
  }
  paneIndex() {
    return this._private__chartWidget._internal_model()._internal_getPaneIndex(this._private__pane);
  }
  moveTo(paneIndex) {
    const currentIndex = this.paneIndex();
    if (currentIndex === paneIndex) {
      return;
    }
    assert(paneIndex >= 0 && paneIndex < this._private__chartWidget._internal_paneWidgets().length, "Invalid pane index");
    this._private__chartWidget._internal_model()._internal_movePane(currentIndex, paneIndex);
  }
  getSeries() {
    return this._private__pane._internal_series().map((source) => this._private__seriesApiGetter(source)) ?? [];
  }
  getHTMLElement() {
    const widgets = this._private__chartWidget._internal_paneWidgets();
    if (!widgets || widgets.length === 0 || !widgets[this.paneIndex()]) {
      return null;
    }
    return widgets[this.paneIndex()]._internal_getElement();
  }
  attachPrimitive(primitive) {
    this._private__pane._internal_attachPrimitive(primitive);
    if (primitive.attached) {
      primitive.attached({
        chart: this._internal__chartApi,
        requestUpdate: () => this._private__pane._internal_model()._internal_fullUpdate()
      });
    }
  }
  detachPrimitive(primitive) {
    this._private__pane._internal_detachPrimitive(primitive);
  }
  priceScale(priceScaleId) {
    const priceScale = this._private__pane._internal_priceScaleById(priceScaleId);
    if (priceScale === null) {
      throw new Error(`Cannot find price scale with id: ${priceScaleId}`);
    }
    return new PriceScaleApi(this._private__chartWidget, priceScaleId, this.paneIndex());
  }
  setPreserveEmptyPane(preserve) {
    this._private__pane._internal_setPreserveEmptyPane(preserve);
  }
  preserveEmptyPane() {
    return this._private__pane._internal_preserveEmptyPane();
  }
  addCustomSeries(customPaneView, options = {}, paneIndex = 0) {
    return this._internal__chartApi.addCustomSeries(customPaneView, options, paneIndex);
  }
  addSeries(definition, options = {}) {
    return this._internal__chartApi.addSeries(definition, options, this.paneIndex());
  }
};
function checkPriceLineOptions(options) {
  assert(typeof options.price === "number", `the type of 'price' price line's property must be a number, got '${typeof options.price}'`);
}
function checkItemsAreOrdered(data, bh, allowDuplicates = false) {
  if (data.length === 0) {
    return;
  }
  let prevTime = bh.key(data[0].time);
  for (let i = 1; i < data.length; ++i) {
    const currentTime = bh.key(data[i].time);
    const checkResult = allowDuplicates ? prevTime <= currentTime : prevTime < currentTime;
    assert(checkResult, `data must be asc ordered by time, index=${i}, time=${currentTime}, prev time=${prevTime}`);
    prevTime = currentTime;
  }
}
function checkSeriesValuesType(type, data) {
  data.forEach(getChecker(type));
}
function getChecker(type) {
  switch (type) {
    case "Bar":
    case "Candlestick":
      return checkBarItem.bind(null, type);
    case "Area":
    case "Baseline":
    case "Line":
    case "Histogram":
      return checkLineItem.bind(null, type);
    case "Custom":
      return checkCustomItem.bind(null);
  }
}
function checkBarItem(type, barItem) {
  if (!isFulfilledData(barItem)) {
    return;
  }
  ["open", "high", "low", "close"].forEach((key) => {
    assert(typeof barItem[key] === "number", `${type} series item data value of ${key} must be a number, got=${typeof barItem[key]}, value=${barItem[key]}`);
    assert(isSafeValue(barItem[key]), `${type} series item data value of ${key} must be between ${MIN_SAFE_VALUE.toPrecision(16)} and ${MAX_SAFE_VALUE.toPrecision(16)}, got=${typeof barItem[key]}, value=${barItem[key]}`);
  });
}
function checkLineItem(type, lineItem) {
  if (!isFulfilledData(lineItem)) {
    return;
  }
  assert(typeof lineItem.value === "number", `${type} series item data value must be a number, got=${typeof lineItem.value}, value=${lineItem.value}`);
  assert(isSafeValue(lineItem.value), `${type} series item data value must be between ${MIN_SAFE_VALUE.toPrecision(16)} and ${MAX_SAFE_VALUE.toPrecision(16)}, got=${typeof lineItem.value}, value=${lineItem.value}`);
}
function checkCustomItem() {
  return;
}
var MIN_SAFE_VALUE = Number.MIN_SAFE_INTEGER / 100;
var MAX_SAFE_VALUE = Number.MAX_SAFE_INTEGER / 100;
function isSafeValue(value) {
  return value >= MIN_SAFE_VALUE && value <= MAX_SAFE_VALUE;
}
var priceLineOptionsDefaults = {
  color: "#FF0000",
  price: 0,
  lineStyle: 2,
  lineWidth: 1,
  lineVisible: true,
  axisLabelVisible: true,
  title: "",
  axisLabelColor: "",
  axisLabelTextColor: ""
};
var PriceLine = class {
  constructor(priceLine) {
    this._private__priceLine = priceLine;
  }
  applyOptions(options) {
    this._private__priceLine._internal_applyOptions(options);
  }
  options() {
    return this._private__priceLine._internal_options();
  }
  _internal_priceLine() {
    return this._private__priceLine;
  }
};
var SeriesApi = class {
  constructor(series, dataUpdatesConsumer, priceScaleApiProvider, chartApi, horzScaleBehavior, paneApiGetter) {
    this._private__dataChangedDelegate = new Delegate();
    this._internal__series = series;
    this._internal__dataUpdatesConsumer = dataUpdatesConsumer;
    this._private__priceScaleApiProvider = priceScaleApiProvider;
    this._private__horzScaleBehavior = horzScaleBehavior;
    this._internal__chartApi = chartApi;
    this._private__paneApiGetter = paneApiGetter;
  }
  _internal_destroy() {
    this._private__dataChangedDelegate._internal_destroy();
  }
  priceFormatter() {
    return this._internal__series._internal_formatter();
  }
  priceToCoordinate(price) {
    const firstValue = this._internal__series._internal_firstValue();
    if (firstValue === null) {
      return null;
    }
    return this._internal__series._internal_priceScale()._internal_priceToCoordinate(price, firstValue._internal_value);
  }
  coordinateToPrice(coordinate) {
    const firstValue = this._internal__series._internal_firstValue();
    if (firstValue === null) {
      return null;
    }
    return this._internal__series._internal_priceScale()._internal_coordinateToPrice(coordinate, firstValue._internal_value);
  }
  barsInLogicalRange(range) {
    if (range === null) {
      return null;
    }
    const correctedRange = new TimeScaleVisibleRange(new RangeImpl(range.from, range.to))._internal_strictRange();
    const bars = this._internal__series._internal_bars();
    if (bars._internal_isEmpty()) {
      return null;
    }
    const dataFirstBarInRange = bars._internal_search(
      correctedRange._internal_left(),
      1
      /* MismatchDirection.NearestRight */
    );
    const dataLastBarInRange = bars._internal_search(
      correctedRange._internal_right(),
      -1
      /* MismatchDirection.NearestLeft */
    );
    const dataFirstIndex = ensureNotNull(bars._internal_firstIndex());
    const dataLastIndex = ensureNotNull(bars._internal_lastIndex());
    if (dataFirstBarInRange !== null && dataLastBarInRange !== null && dataFirstBarInRange._internal_index > dataLastBarInRange._internal_index) {
      return {
        barsBefore: range.from - dataFirstIndex,
        barsAfter: dataLastIndex - range.to
      };
    }
    const barsBefore = dataFirstBarInRange === null || dataFirstBarInRange._internal_index === dataFirstIndex ? range.from - dataFirstIndex : dataFirstBarInRange._internal_index - dataFirstIndex;
    const barsAfter = dataLastBarInRange === null || dataLastBarInRange._internal_index === dataLastIndex ? dataLastIndex - range.to : dataLastIndex - dataLastBarInRange._internal_index;
    const result = { barsBefore, barsAfter };
    if (dataFirstBarInRange !== null && dataLastBarInRange !== null) {
      result.from = dataFirstBarInRange._internal_originalTime;
      result.to = dataLastBarInRange._internal_originalTime;
    }
    return result;
  }
  setData(data) {
    checkItemsAreOrdered(data, this._private__horzScaleBehavior);
    checkSeriesValuesType(this._internal__series._internal_seriesType(), data);
    this._internal__dataUpdatesConsumer._internal_applyNewData(this._internal__series, data);
    this._private__onDataChanged("full");
  }
  update(bar, historicalUpdate = false) {
    checkSeriesValuesType(this._internal__series._internal_seriesType(), [bar]);
    this._internal__dataUpdatesConsumer._internal_updateData(this._internal__series, bar, historicalUpdate);
    this._private__onDataChanged("update");
  }
  pop(count = 1) {
    const poppedRows = this._internal__dataUpdatesConsumer._internal_popData(this._internal__series, count);
    if (poppedRows.length !== 0) {
      this._private__onDataChanged("update");
    }
    const creator = getSeriesDataCreator(this.seriesType());
    return poppedRows.map((row) => creator(row));
  }
  dataByIndex(logicalIndex, mismatchDirection) {
    const data = this._internal__series._internal_bars()._internal_search(logicalIndex, mismatchDirection);
    if (data === null) {
      return null;
    }
    const creator = getSeriesDataCreator(this.seriesType());
    return creator(data);
  }
  data() {
    const seriesCreator = getSeriesDataCreator(this.seriesType());
    const rows = this._internal__series._internal_bars()._internal_rows();
    return rows.map((row) => seriesCreator(row));
  }
  subscribeDataChanged(handler) {
    this._private__dataChangedDelegate._internal_subscribe(handler);
  }
  unsubscribeDataChanged(handler) {
    this._private__dataChangedDelegate._internal_unsubscribe(handler);
  }
  applyOptions(options) {
    this._internal__series._internal_applyOptions(options);
  }
  options() {
    return clone(this._internal__series._internal_options());
  }
  priceScale() {
    return this._private__priceScaleApiProvider.priceScale(this._internal__series._internal_priceScale()._internal_id(), this.getPane().paneIndex());
  }
  createPriceLine(options) {
    checkPriceLineOptions(options);
    const strictOptions = merge(clone(priceLineOptionsDefaults), options);
    const priceLine = this._internal__series._internal_createPriceLine(strictOptions);
    return new PriceLine(priceLine);
  }
  removePriceLine(line) {
    this._internal__series._internal_removePriceLine(line._internal_priceLine());
  }
  priceLines() {
    return this._internal__series._internal_priceLines().map((priceLine) => new PriceLine(priceLine));
  }
  seriesType() {
    return this._internal__series._internal_seriesType();
  }
  lastValueData(globalLast) {
    const result = this._internal__series._internal_lastValueData(globalLast);
    if (result._internal_noData) {
      return {
        noData: true
      };
    }
    return {
      noData: false,
      price: result._internal_price,
      color: result._internal_color
    };
  }
  attachPrimitive(primitive) {
    this._internal__series._internal_attachPrimitive(primitive);
    if (primitive.attached) {
      primitive.attached({
        chart: this._internal__chartApi,
        series: this,
        requestUpdate: () => this._internal__series._internal_model()._internal_fullUpdate(),
        horzScaleBehavior: this._private__horzScaleBehavior
      });
    }
  }
  detachPrimitive(primitive) {
    this._internal__series._internal_detachPrimitive(primitive);
    if (primitive.detached) {
      primitive.detached();
    }
    this._internal__series._internal_model()._internal_fullUpdate();
  }
  getPane() {
    const series = this._internal__series;
    const pane = ensureNotNull(this._internal__series._internal_model()._internal_paneForSource(series));
    return this._private__paneApiGetter(pane);
  }
  moveToPane(paneIndex) {
    this._internal__series._internal_model()._internal_moveSeriesToPane(this._internal__series, paneIndex);
  }
  seriesOrder() {
    const pane = this._internal__series._internal_model()._internal_paneForSource(this._internal__series);
    if (pane === null) {
      return -1;
    }
    return pane._internal_series().indexOf(this._internal__series);
  }
  setSeriesOrder(order) {
    const pane = this._internal__series._internal_model()._internal_paneForSource(this._internal__series);
    if (pane === null) {
      return;
    }
    pane._internal_setSeriesOrder(this._internal__series, order);
  }
  _private__onDataChanged(scope) {
    if (this._private__dataChangedDelegate._internal_hasListeners()) {
      this._private__dataChangedDelegate._internal_fire(scope);
    }
  }
};
var TimeScaleApi = class {
  constructor(model, timeAxisWidget, horzScaleBehavior) {
    this._private__timeRangeChanged = new Delegate();
    this._private__logicalRangeChanged = new Delegate();
    this._private__sizeChanged = new Delegate();
    this._private__model = model;
    this._private__timeScale = model._internal_timeScale();
    this._private__timeAxisWidget = timeAxisWidget;
    this._private__timeScale._internal_visibleBarsChanged()._internal_subscribe(this._private__onVisibleBarsChanged.bind(this));
    this._private__timeScale._internal_logicalRangeChanged()._internal_subscribe(this._private__onVisibleLogicalRangeChanged.bind(this));
    this._private__timeAxisWidget._internal_sizeChanged()._internal_subscribe(this._private__onSizeChanged.bind(this));
    this._private__horzScaleBehavior = horzScaleBehavior;
  }
  _internal_destroy() {
    this._private__timeScale._internal_visibleBarsChanged()._internal_unsubscribeAll(this);
    this._private__timeScale._internal_logicalRangeChanged()._internal_unsubscribeAll(this);
    this._private__timeAxisWidget._internal_sizeChanged()._internal_unsubscribeAll(this);
    this._private__timeRangeChanged._internal_destroy();
    this._private__logicalRangeChanged._internal_destroy();
    this._private__sizeChanged._internal_destroy();
  }
  scrollPosition() {
    return this._private__timeScale._internal_rightOffset();
  }
  scrollToPosition(position, animated) {
    if (!animated) {
      this._private__model._internal_setRightOffset(position);
      return;
    }
    this._private__timeScale._internal_scrollToOffsetAnimated(
      position,
      1e3
      /* Constants.AnimationDurationMs */
    );
  }
  scrollToRealTime() {
    this._private__timeScale._internal_scrollToRealTime();
  }
  getVisibleRange() {
    const timeRange = this._private__timeScale._internal_visibleTimeRange();
    if (timeRange === null) {
      return null;
    }
    return {
      from: timeRange.from.originalTime,
      to: timeRange.to.originalTime
    };
  }
  setVisibleRange(range) {
    const convertedRange = {
      from: this._private__horzScaleBehavior.convertHorzItemToInternal(range.from),
      to: this._private__horzScaleBehavior.convertHorzItemToInternal(range.to)
    };
    const logicalRange = this._private__timeScale._internal_logicalRangeForTimeRange(convertedRange);
    this._private__model._internal_setTargetLogicalRange(logicalRange);
  }
  getVisibleLogicalRange() {
    const logicalRange = this._private__timeScale._internal_visibleLogicalRange();
    if (logicalRange === null) {
      return null;
    }
    return {
      from: logicalRange._internal_left(),
      to: logicalRange._internal_right()
    };
  }
  setVisibleLogicalRange(range) {
    assert(range.from <= range.to, "The from index cannot be after the to index.");
    this._private__model._internal_setTargetLogicalRange(range);
  }
  resetTimeScale() {
    this._private__model._internal_resetTimeScale();
  }
  fitContent() {
    this._private__model._internal_fitContent();
  }
  logicalToCoordinate(logical) {
    const timeScale = this._private__model._internal_timeScale();
    if (timeScale._internal_isEmpty()) {
      return null;
    } else {
      return timeScale._internal_indexToCoordinate(logical);
    }
  }
  coordinateToLogical(x) {
    if (this._private__timeScale._internal_isEmpty()) {
      return null;
    } else {
      return this._private__timeScale._internal_coordinateToIndex(x);
    }
  }
  timeToIndex(time, findNearest) {
    const timePoint = this._private__horzScaleBehavior.convertHorzItemToInternal(time);
    return this._private__timeScale._internal_timeToIndex(timePoint, findNearest);
  }
  timeToCoordinate(time) {
    const timePointIndex = this.timeToIndex(time, false);
    if (timePointIndex === null) {
      return null;
    }
    return this._private__timeScale._internal_indexToCoordinate(timePointIndex);
  }
  coordinateToTime(x) {
    const timeScale = this._private__model._internal_timeScale();
    const timePointIndex = timeScale._internal_coordinateToIndex(x);
    const timePoint = timeScale._internal_indexToTimeScalePoint(timePointIndex);
    if (timePoint === null) {
      return null;
    }
    return timePoint.originalTime;
  }
  width() {
    return this._private__timeAxisWidget._internal_getSize().width;
  }
  height() {
    return this._private__timeAxisWidget._internal_getSize().height;
  }
  subscribeVisibleTimeRangeChange(handler) {
    this._private__timeRangeChanged._internal_subscribe(handler);
  }
  unsubscribeVisibleTimeRangeChange(handler) {
    this._private__timeRangeChanged._internal_unsubscribe(handler);
  }
  subscribeVisibleLogicalRangeChange(handler) {
    this._private__logicalRangeChanged._internal_subscribe(handler);
  }
  unsubscribeVisibleLogicalRangeChange(handler) {
    this._private__logicalRangeChanged._internal_unsubscribe(handler);
  }
  subscribeSizeChange(handler) {
    this._private__sizeChanged._internal_subscribe(handler);
  }
  unsubscribeSizeChange(handler) {
    this._private__sizeChanged._internal_unsubscribe(handler);
  }
  applyOptions(options) {
    this._private__timeScale._internal_applyOptions(options);
  }
  options() {
    return {
      ...clone(this._private__timeScale._internal_options()),
      barSpacing: this._private__timeScale._internal_barSpacing()
    };
  }
  _private__onVisibleBarsChanged() {
    if (this._private__timeRangeChanged._internal_hasListeners()) {
      this._private__timeRangeChanged._internal_fire(this.getVisibleRange());
    }
  }
  _private__onVisibleLogicalRangeChanged() {
    if (this._private__logicalRangeChanged._internal_hasListeners()) {
      this._private__logicalRangeChanged._internal_fire(this.getVisibleLogicalRange());
    }
  }
  _private__onSizeChanged(size3) {
    this._private__sizeChanged._internal_fire(size3.width, size3.height);
  }
};
function patchPriceFormat(priceFormat) {
  if (priceFormat === void 0 || priceFormat.type === "custom") {
    return;
  }
  const priceFormatBuiltIn = priceFormat;
  if (priceFormatBuiltIn.minMove !== void 0 && priceFormatBuiltIn.precision === void 0) {
    priceFormatBuiltIn.precision = precisionByMinMove(priceFormatBuiltIn.minMove);
  }
}
function migrateHandleScaleScrollOptions(options) {
  if (isBoolean(options["handleScale"])) {
    const handleScale = options["handleScale"];
    options["handleScale"] = {
      axisDoubleClickReset: {
        time: handleScale,
        price: handleScale
      },
      axisPressedMouseMove: {
        time: handleScale,
        price: handleScale
      },
      mouseWheel: handleScale,
      pinch: handleScale
    };
  } else if (options["handleScale"] !== void 0) {
    const { axisPressedMouseMove, axisDoubleClickReset } = options["handleScale"];
    if (isBoolean(axisPressedMouseMove)) {
      options["handleScale"].axisPressedMouseMove = {
        time: axisPressedMouseMove,
        price: axisPressedMouseMove
      };
    }
    if (isBoolean(axisDoubleClickReset)) {
      options["handleScale"].axisDoubleClickReset = {
        time: axisDoubleClickReset,
        price: axisDoubleClickReset
      };
    }
  }
  const handleScroll = options["handleScroll"];
  if (isBoolean(handleScroll)) {
    options["handleScroll"] = {
      horzTouchDrag: handleScroll,
      vertTouchDrag: handleScroll,
      mouseWheel: handleScroll,
      pressedMouseMove: handleScroll
    };
  }
}
function toInternalOptions(options) {
  migrateHandleScaleScrollOptions(options);
  return options;
}
var ChartApi = class {
  constructor(container, horzScaleBehavior, options) {
    this._private__seriesMap = /* @__PURE__ */ new Map();
    this._private__seriesMapReversed = /* @__PURE__ */ new Map();
    this._private__clickedDelegate = new Delegate();
    this._private__dblClickedDelegate = new Delegate();
    this._private__crosshairMovedDelegate = new Delegate();
    this._private__panes = /* @__PURE__ */ new WeakMap();
    this._private__dataLayer = new DataLayer(horzScaleBehavior);
    const internalOptions = options === void 0 ? clone(chartOptionsDefaults()) : merge(clone(chartOptionsDefaults()), toInternalOptions(options));
    this._internal__horzScaleBehavior = horzScaleBehavior;
    this._private__chartWidget = new ChartWidget(container, internalOptions, horzScaleBehavior);
    this._private__chartWidget._internal_clicked()._internal_subscribe((paramSupplier) => {
      if (this._private__clickedDelegate._internal_hasListeners()) {
        this._private__clickedDelegate._internal_fire(this._private__convertMouseParams(paramSupplier()));
      }
    }, this);
    this._private__chartWidget._internal_dblClicked()._internal_subscribe((paramSupplier) => {
      if (this._private__dblClickedDelegate._internal_hasListeners()) {
        this._private__dblClickedDelegate._internal_fire(this._private__convertMouseParams(paramSupplier()));
      }
    }, this);
    this._private__chartWidget._internal_crosshairMoved()._internal_subscribe((paramSupplier) => {
      if (this._private__crosshairMovedDelegate._internal_hasListeners()) {
        this._private__crosshairMovedDelegate._internal_fire(this._private__convertMouseParams(paramSupplier()));
      }
    }, this);
    const model = this._private__chartWidget._internal_model();
    this._private__timeScaleApi = new TimeScaleApi(model, this._private__chartWidget._internal_timeAxisWidget(), this._internal__horzScaleBehavior);
  }
  remove() {
    this._private__chartWidget._internal_clicked()._internal_unsubscribeAll(this);
    this._private__chartWidget._internal_dblClicked()._internal_unsubscribeAll(this);
    this._private__chartWidget._internal_crosshairMoved()._internal_unsubscribeAll(this);
    this._private__timeScaleApi._internal_destroy();
    this._private__chartWidget._internal_destroy();
    this._private__seriesMap.clear();
    this._private__seriesMapReversed.clear();
    this._private__clickedDelegate._internal_destroy();
    this._private__dblClickedDelegate._internal_destroy();
    this._private__crosshairMovedDelegate._internal_destroy();
    this._private__dataLayer._internal_destroy();
  }
  resize(width, height, forceRepaint) {
    if (this.autoSizeActive()) {
      warn(`Height and width values ignored because 'autoSize' option is enabled.`);
      return;
    }
    this._private__chartWidget._internal_resize(width, height, forceRepaint);
  }
  addCustomSeries(customPaneView, options = {}, paneIndex = 0) {
    const paneView = ensure(customPaneView);
    const definition = createCustomSeriesDefinition(paneView);
    return this._private__addSeriesImpl(definition, options, paneIndex);
  }
  addSeries(definition, options = {}, paneIndex = 0) {
    return this._private__addSeriesImpl(definition, options, paneIndex);
  }
  removeSeries(seriesApi) {
    const series = ensureDefined(this._private__seriesMap.get(seriesApi));
    const update = this._private__dataLayer._internal_removeSeries(series);
    const model = this._private__chartWidget._internal_model();
    model._internal_removeSeries(series);
    this._private__sendUpdateToChart(update);
    this._private__seriesMap.delete(seriesApi);
    this._private__seriesMapReversed.delete(series);
  }
  _internal_applyNewData(series, data) {
    this._private__sendUpdateToChart(this._private__dataLayer._internal_setSeriesData(series, data));
  }
  _internal_updateData(series, data, historicalUpdate) {
    this._private__sendUpdateToChart(this._private__dataLayer._internal_updateSeriesData(series, data, historicalUpdate));
  }
  _internal_popData(series, count) {
    const [poppedData, update] = this._private__dataLayer._internal_popSeriesData(series, count);
    if (poppedData.length !== 0) {
      this._private__sendUpdateToChart(update);
    }
    return poppedData;
  }
  subscribeClick(handler) {
    this._private__clickedDelegate._internal_subscribe(handler);
  }
  unsubscribeClick(handler) {
    this._private__clickedDelegate._internal_unsubscribe(handler);
  }
  subscribeCrosshairMove(handler) {
    this._private__crosshairMovedDelegate._internal_subscribe(handler);
  }
  unsubscribeCrosshairMove(handler) {
    this._private__crosshairMovedDelegate._internal_unsubscribe(handler);
  }
  subscribeDblClick(handler) {
    this._private__dblClickedDelegate._internal_subscribe(handler);
  }
  unsubscribeDblClick(handler) {
    this._private__dblClickedDelegate._internal_unsubscribe(handler);
  }
  priceScale(priceScaleId, paneIndex = 0) {
    return new PriceScaleApi(this._private__chartWidget, priceScaleId, paneIndex);
  }
  timeScale() {
    return this._private__timeScaleApi;
  }
  applyOptions(options) {
    {
      const colorSpace = options.layout?.colorSpace;
      if (colorSpace !== void 0 && colorSpace !== this.options().layout.colorSpace) {
        throw new Error(`colorSpace option should not be changed once the chart has been created.`);
      }
      const colorParsers = options.layout?.colorParsers;
      if (colorParsers !== void 0 && colorParsers !== this.options().layout.colorParsers) {
        throw new Error(`colorParsers option should not be changed once the chart has been created.`);
      }
    }
    this._private__chartWidget._internal_applyOptions(toInternalOptions(options));
  }
  options() {
    return this._private__chartWidget._internal_options();
  }
  takeScreenshot(addTopLayer = false, includeCrosshair = false) {
    let crosshairMode;
    let screenshotCanvas;
    try {
      if (!includeCrosshair) {
        crosshairMode = this._private__chartWidget._internal_model()._internal_options().crosshair.mode;
        this._private__chartWidget._internal_applyOptions({
          crosshair: {
            mode: 2
          }
        });
      }
      screenshotCanvas = this._private__chartWidget._internal_takeScreenshot(addTopLayer);
    } finally {
      if (!includeCrosshair && crosshairMode !== void 0) {
        this._private__chartWidget._internal_model()._internal_applyOptions({
          crosshair: {
            mode: crosshairMode
          }
        });
      }
    }
    return screenshotCanvas;
  }
  addPane(preserveEmptyPane = false) {
    const pane = this._private__chartWidget._internal_model()._internal_addPane();
    pane._internal_setPreserveEmptyPane(preserveEmptyPane);
    return this._private__getPaneApi(pane);
  }
  removePane(index) {
    this._private__chartWidget._internal_model()._internal_removePane(index);
  }
  swapPanes(first, second) {
    this._private__chartWidget._internal_model()._internal_swapPanes(first, second);
  }
  autoSizeActive() {
    return this._private__chartWidget._internal_autoSizeActive();
  }
  chartElement() {
    return this._private__chartWidget._internal_element();
  }
  panes() {
    return this._private__chartWidget._internal_model()._internal_panes().map((pane) => this._private__getPaneApi(pane));
  }
  paneSize(paneIndex = 0) {
    const size3 = this._private__chartWidget._internal_paneSize(paneIndex);
    return {
      height: size3.height,
      width: size3.width
    };
  }
  setCrosshairPosition(price, horizontalPosition, seriesApi) {
    const series = this._private__seriesMap.get(seriesApi);
    if (series === void 0) {
      return;
    }
    const pane = this._private__chartWidget._internal_model()._internal_paneForSource(series);
    if (pane === null) {
      return;
    }
    this._private__chartWidget._internal_model()._internal_setAndSaveSyntheticPosition(price, horizontalPosition, pane);
  }
  clearCrosshairPosition() {
    this._private__chartWidget._internal_model()._internal_clearCurrentPosition(true);
  }
  horzBehaviour() {
    return this._internal__horzScaleBehavior;
  }
  _private__addSeriesImpl(definition, options = {}, paneIndex = 0) {
    assert(isSeriesDefinition(definition));
    patchPriceFormat(options.priceFormat);
    if (definition.type === "Candlestick") {
      fillUpDownCandlesticksColors(options);
    }
    const strictOptions = merge(clone(seriesOptionsDefaults), clone(definition.defaultOptions), options);
    const createPaneView2 = definition._internal_createPaneView;
    const series = new Series(this._private__chartWidget._internal_model(), definition.type, strictOptions, createPaneView2, definition._internal_customPaneView);
    this._private__chartWidget._internal_model()._internal_addSeriesToPane(series, paneIndex);
    const res = new SeriesApi(series, this, this, this, this._internal__horzScaleBehavior, (pane) => this._private__getPaneApi(pane));
    this._private__seriesMap.set(res, series);
    this._private__seriesMapReversed.set(series, res);
    return res;
  }
  _private__sendUpdateToChart(update) {
    const model = this._private__chartWidget._internal_model();
    for (const series of update._internal_series.keys()) {
      series._internal_invalidatePaneViewData();
    }
    model._internal_updateTimeScale(update._internal_timeScale._internal_baseIndex, update._internal_timeScale._internal_points, update._internal_timeScale._internal_firstChangedPointIndex);
    update._internal_series.forEach((value, series) => series._internal_setData(value._internal_data, value._internal_info));
    model._internal_timeScale()._internal_recalculateIndicesWithData();
    model._internal_recalculateAllPanes();
  }
  _private__mapSeriesToApi(series) {
    return ensureDefined(this._private__seriesMapReversed.get(series));
  }
  _private__resolveSeriesApi(series) {
    return series !== void 0 && this._private__seriesMapReversed.has(series) ? this._private__mapSeriesToApi(series) : void 0;
  }
  _private__convertMouseParams(param) {
    const seriesData = /* @__PURE__ */ new Map();
    param._internal_seriesData.forEach((plotRow, series) => {
      const seriesType = series._internal_seriesType();
      const data = getSeriesDataCreator(seriesType)(plotRow);
      if (seriesType !== "Custom") {
        assert(isFulfilledData(data));
      } else {
        const customWhitespaceChecker = series._internal_customSeriesWhitespaceCheck();
        assert(!customWhitespaceChecker || customWhitespaceChecker(data) === false);
      }
      seriesData.set(this._private__mapSeriesToApi(series), data);
    });
    const hoveredSeries = this._private__resolveSeriesApi(param._internal_hoveredSeries);
    const hoveredInfo = param._internal_hoveredInfo === void 0 ? void 0 : {
      type: param._internal_hoveredInfo._internal_type,
      sourceKind: param._internal_hoveredInfo._internal_sourceKind,
      objectKind: param._internal_hoveredInfo._internal_objectKind,
      series: this._private__resolveSeriesApi(param._internal_hoveredInfo._internal_series),
      objectId: param._internal_hoveredInfo._internal_objectId,
      paneIndex: param._internal_hoveredInfo._internal_paneIndex
    };
    return {
      time: param._internal_originalTime,
      logical: param._internal_index,
      point: param._internal_point,
      paneIndex: param._internal_paneIndex,
      hoveredInfo,
      hoveredSeries,
      hoveredObjectId: param._internal_hoveredObject,
      seriesData,
      sourceEvent: param._internal_touchMouseEventData
    };
  }
  _private__getPaneApi(pane) {
    let result = this._private__panes.get(pane);
    if (!result) {
      result = new PaneApi(this._private__chartWidget, (series) => this._private__mapSeriesToApi(series), pane, this);
      this._private__panes.set(pane, result);
    }
    return result;
  }
};
function fetchHtmlElement(container) {
  if (isString(container)) {
    const element = document.getElementById(container);
    assert(element !== null, `Cannot find element in DOM with id=${container}`);
    return element;
  }
  return container;
}
function createChartEx(container, horzScaleBehavior, options) {
  const htmlElement = fetchHtmlElement(container);
  const res = new ChartApi(htmlElement, horzScaleBehavior, options);
  horzScaleBehavior.setOptions(res.options());
  return res;
}
function createChart(container, options) {
  return createChartEx(container, new HorzScaleBehaviorTime(), HorzScaleBehaviorTime._internal_applyDefaults(options));
}
function drawSeriesPointMarkers(renderingScope, items, pointMarkersRadius, visibleRange, styleGetter) {
  if (visibleRange.to - visibleRange.from <= 0) {
    return;
  }
  const { horizontalPixelRatio, verticalPixelRatio, context } = renderingScope;
  let prevStyle = null;
  const tickWidth = Math.max(1, Math.floor(horizontalPixelRatio));
  const correction = tickWidth % 2 / 2;
  const radius2 = pointMarkersRadius * verticalPixelRatio + correction;
  for (let i = visibleRange.to - 1; i >= visibleRange.from; --i) {
    const point = items[i];
    if (point) {
      const style = styleGetter(renderingScope, point);
      if (style !== prevStyle) {
        if (prevStyle !== null) {
          context.fill();
        }
        context.beginPath();
        context.fillStyle = style;
        prevStyle = style;
      }
      const centerX = Math.round(point._internal_x * horizontalPixelRatio) + correction;
      const centerY = point._internal_y * verticalPixelRatio;
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius2, 0, Math.PI * 2);
    }
  }
  context.fill();
}
function distanceByCoordinates(p1x, p1y, p2x, p2y) {
  return Math.hypot(p2x - p1x, p2y - p1y);
}
function walkLine(renderingScope, items, lineType, visibleRange, barWidth, styleGetter, finishStyledArea2, dashPatternLength = 0) {
  if (items.length === 0 || visibleRange.from >= items.length || visibleRange.to <= 0) {
    return;
  }
  const { context: ctx, horizontalPixelRatio, verticalPixelRatio } = renderingScope;
  const firstItem = items[visibleRange.from];
  let currentStyle = styleGetter(renderingScope, firstItem);
  let currentStyleFirstItem = firstItem;
  if (visibleRange.to - visibleRange.from < 2) {
    const halfBarWidth = barWidth / 2;
    ctx.beginPath();
    const item1 = { _internal_x: firstItem._internal_x - halfBarWidth, _internal_y: firstItem._internal_y };
    const item2 = { _internal_x: firstItem._internal_x + halfBarWidth, _internal_y: firstItem._internal_y };
    ctx.moveTo(item1._internal_x * horizontalPixelRatio, item1._internal_y * verticalPixelRatio);
    ctx.lineTo(item2._internal_x * horizontalPixelRatio, item2._internal_y * verticalPixelRatio);
    finishStyledArea2(renderingScope, currentStyle, item1, item2);
  } else {
    const shouldTrackDashOffset = dashPatternLength > 0;
    let accumulatedDistance = 0;
    const changeStyle = (newStyle, currentItem2) => {
      finishStyledArea2(renderingScope, currentStyle, currentStyleFirstItem, currentItem2);
      ctx.beginPath();
      currentStyle = newStyle;
      currentStyleFirstItem = currentItem2;
      if (shouldTrackDashOffset) {
        const offset = accumulatedDistance % dashPatternLength;
        ctx.lineDashOffset = offset;
        accumulatedDistance = offset;
      }
    };
    let currentItem = currentStyleFirstItem;
    ctx.beginPath();
    ctx.moveTo(firstItem._internal_x * horizontalPixelRatio, firstItem._internal_y * verticalPixelRatio);
    for (let i = visibleRange.from + 1; i < visibleRange.to; ++i) {
      currentItem = items[i];
      const currentX = currentItem._internal_x * horizontalPixelRatio;
      const currentY = currentItem._internal_y * verticalPixelRatio;
      const itemStyle = styleGetter(renderingScope, currentItem);
      switch (lineType) {
        case 0: {
          ctx.lineTo(currentX, currentY);
          if (shouldTrackDashOffset) {
            const prevItem = items[i - 1];
            const prevX = prevItem._internal_x * horizontalPixelRatio;
            const prevY = prevItem._internal_y * verticalPixelRatio;
            accumulatedDistance += distanceByCoordinates(prevX, prevY, currentX, currentY);
          }
          break;
        }
        case 1: {
          const prevItem = items[i - 1];
          const prevY = prevItem._internal_y * verticalPixelRatio;
          ctx.lineTo(currentX, prevY);
          if (shouldTrackDashOffset) {
            accumulatedDistance += Math.abs(currentItem._internal_x - prevItem._internal_x) * horizontalPixelRatio;
          }
          if (itemStyle !== currentStyle) {
            changeStyle(itemStyle, currentItem);
            ctx.lineTo(currentX, prevY);
          }
          ctx.lineTo(currentX, currentY);
          if (shouldTrackDashOffset) {
            accumulatedDistance += Math.abs(currentItem._internal_y - prevItem._internal_y) * verticalPixelRatio;
          }
          break;
        }
        case 2: {
          const [cp1, cp2] = getControlPoints(items, i - 1, i);
          const cp1x = cp1._internal_x * horizontalPixelRatio;
          const cp1y = cp1._internal_y * verticalPixelRatio;
          const cp2x = cp2._internal_x * horizontalPixelRatio;
          const cp2y = cp2._internal_y * verticalPixelRatio;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentX, currentY);
          if (shouldTrackDashOffset) {
            const prevItem = items[i - 1];
            const prevX = prevItem._internal_x * horizontalPixelRatio;
            const prevY = prevItem._internal_y * verticalPixelRatio;
            const chord = distanceByCoordinates(prevX, prevY, currentX, currentY);
            const controlPolygon = distanceByCoordinates(prevX, prevY, cp1x, cp1y) + distanceByCoordinates(cp1x, cp1y, cp2x, cp2y) + distanceByCoordinates(cp2x, cp2y, currentX, currentY);
            accumulatedDistance += (chord + controlPolygon) / 2;
          }
          break;
        }
      }
      if (lineType !== 1 && itemStyle !== currentStyle) {
        changeStyle(itemStyle, currentItem);
        ctx.moveTo(currentX, currentY);
      }
    }
    if (currentStyleFirstItem !== currentItem || currentStyleFirstItem === currentItem && lineType === 1) {
      finishStyledArea2(renderingScope, currentStyle, currentStyleFirstItem, currentItem);
    }
    if (shouldTrackDashOffset) {
      ctx.lineDashOffset = 0;
    }
  }
}
var curveTension = 6;
function subtract(p1, p2) {
  return { _internal_x: p1._internal_x - p2._internal_x, _internal_y: p1._internal_y - p2._internal_y };
}
function add(p1, p2) {
  return { _internal_x: p1._internal_x + p2._internal_x, _internal_y: p1._internal_y + p2._internal_y };
}
function divide(p1, n2) {
  return { _internal_x: p1._internal_x / n2, _internal_y: p1._internal_y / n2 };
}
function getControlPoints(points2, fromPointIndex, toPointIndex) {
  const beforeFromPointIndex = Math.max(0, fromPointIndex - 1);
  const afterToPointIndex = Math.min(points2.length - 1, toPointIndex + 1);
  const cp1 = add(points2[fromPointIndex], divide(subtract(points2[toPointIndex], points2[beforeFromPointIndex]), curveTension));
  const cp2 = subtract(points2[toPointIndex], divide(subtract(points2[afterToPointIndex], points2[fromPointIndex]), curveTension));
  return [cp1, cp2];
}
function finishStyledArea$1(scope, style) {
  const ctx = scope.context;
  ctx.strokeStyle = style;
  ctx.stroke();
}
var PaneRendererLineBase = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._internal__data = null;
  }
  _internal_setData(data) {
    this._internal__data = data;
  }
  _internal__drawImpl(renderingScope) {
    if (this._internal__data === null) {
      return;
    }
    const { _internal_items: items, _internal_visibleRange: visibleRange, _internal_barWidth: barWidth, _internal_lineType: lineType, _internal_lineWidth: lineWidth, _internal_lineStyle: lineStyle, _internal_pointMarkersRadius: pointMarkersRadius } = this._internal__data;
    if (visibleRange === null) {
      return;
    }
    const ctx = renderingScope.context;
    ctx.lineCap = "butt";
    ctx.lineWidth = lineWidth * renderingScope.verticalPixelRatio;
    const dashPattern = setLineStyle(ctx, lineStyle);
    ctx.lineJoin = "round";
    const styleGetter = this._internal__strokeStyle.bind(this);
    const dashPatternLength = getDashPatternLength(dashPattern);
    if (lineType !== void 0) {
      walkLine(renderingScope, items, lineType, visibleRange, barWidth, styleGetter, finishStyledArea$1, dashPatternLength);
    }
    if (pointMarkersRadius) {
      drawSeriesPointMarkers(renderingScope, items, pointMarkersRadius, visibleRange, styleGetter);
    }
  }
};
var PaneRendererLine = class extends PaneRendererLineBase {
  _internal__strokeStyle(renderingScope, item) {
    return item._internal_lineColor;
  }
};
var BEZIER_APPROXIMATION_STEPS = 12;
function cubicBezierPoint(p0, p1, p2, p3, t2) {
  const u = 1 - t2;
  return u * u * u * p0 + 3 * u * u * t2 * p1 + 3 * u * t2 * t2 * p2 + t2 * t2 * t2 * p3;
}
function distanceToBezierCurve(x, y, points2) {
  let minDistance = Number.POSITIVE_INFINITY;
  let previousPoint = points2[0];
  for (let step = 1; step <= BEZIER_APPROXIMATION_STEPS; step++) {
    const t2 = step / BEZIER_APPROXIMATION_STEPS;
    const currentPoint = {
      _internal_x: cubicBezierPoint(points2[0]._internal_x, points2[1]._internal_x, points2[2]._internal_x, points2[3]._internal_x, t2),
      _internal_y: cubicBezierPoint(points2[0]._internal_y, points2[1]._internal_y, points2[2]._internal_y, points2[3]._internal_y, t2)
    };
    minDistance = Math.min(minDistance, distanceToSegment(x, y, previousPoint._internal_x, previousPoint._internal_y, currentPoint._internal_x, currentPoint._internal_y));
    previousPoint = currentPoint;
  }
  return minDistance;
}
function lineSegmentHorizontalBounds(firstItem, secondItem, lineType, items, toItemIndex) {
  switch (lineType) {
    case 2: {
      const [firstControlPoint, secondControlPoint] = getControlPoints(items, toItemIndex - 1, toItemIndex);
      const minX = Math.min(firstItem._internal_x, secondItem._internal_x, firstControlPoint._internal_x, secondControlPoint._internal_x);
      const maxX = Math.max(firstItem._internal_x, secondItem._internal_x, firstControlPoint._internal_x, secondControlPoint._internal_x);
      return [minX, maxX];
    }
    case 1:
    case 0:
    default: {
      const minX = Math.min(firstItem._internal_x, secondItem._internal_x);
      const maxX = Math.max(firstItem._internal_x, secondItem._internal_x);
      return [minX, maxX];
    }
  }
}
function hitTestLineSegment(x, y, firstItem, secondItem, lineType, items, toItemIndex, radius2) {
  switch (lineType) {
    case 1: {
      const horizontalDistance = distanceToSegment(x, y, firstItem._internal_x, firstItem._internal_y, secondItem._internal_x, firstItem._internal_y);
      const verticalDistance = distanceToSegment(x, y, secondItem._internal_x, firstItem._internal_y, secondItem._internal_x, secondItem._internal_y);
      const minDistance = Math.min(horizontalDistance, verticalDistance);
      return minDistance <= radius2 ? minDistance : null;
    }
    case 2: {
      const [firstControlPoint, secondControlPoint] = getControlPoints(items, toItemIndex - 1, toItemIndex);
      const distance = distanceToBezierCurve(x, y, [firstItem, firstControlPoint, secondControlPoint, secondItem]);
      return distance <= radius2 ? distance : null;
    }
    case 0:
    default: {
      const distance = distanceToSegment(x, y, firstItem._internal_x, firstItem._internal_y, secondItem._internal_x, secondItem._internal_y);
      return distance <= radius2 ? distance : null;
    }
  }
}
function hitTestLineSeries(items, visibleRange, x, y, lineType, lineWidth, pointMarkersRadius, barSpacing = 0, hitTestTolerance = 0) {
  if (visibleRange === null || visibleRange.from >= visibleRange.to || items.length === 0) {
    return null;
  }
  const radius2 = Math.max(lineWidth / 2, pointMarkersRadius ?? 0) + hitTestTolerance;
  let pointMinDistance = Number.POSITIVE_INFINITY;
  if (pointMarkersRadius !== void 0) {
    const pointRadius = pointMarkersRadius + hitTestTolerance;
    const pointCandidateFrom = lowerBoundByX(items, x - pointRadius, visibleRange.from, visibleRange.to);
    const pointCandidateTo = upperBoundByX(items, x + pointRadius, pointCandidateFrom, visibleRange.to);
    for (let itemIndex = pointCandidateFrom; itemIndex < pointCandidateTo; itemIndex++) {
      const item = items[itemIndex];
      if (!isWithinHorizontalSweep(x, item._internal_x, item._internal_x, pointMarkersRadius + hitTestTolerance)) {
        continue;
      }
      const distance = Math.hypot(x - item._internal_x, y - item._internal_y);
      if (distance <= pointMarkersRadius + hitTestTolerance) {
        pointMinDistance = Math.min(pointMinDistance, distance);
      }
    }
  }
  if (visibleRange.to - visibleRange.from < 2) {
    const item = items[visibleRange.from];
    const singlePointHalfWidth = Math.max(barSpacing / 2, radius2);
    const distance = distanceToSegment(x, y, item._internal_x - singlePointHalfWidth, item._internal_y, item._internal_x + singlePointHalfWidth, item._internal_y);
    if (distance <= radius2) {
      pointMinDistance = Math.min(pointMinDistance, distance);
    }
    return Number.isFinite(pointMinDistance) ? hoveredSeriesHitTestResult(pointMinDistance, 2, "series-point") : null;
  }
  let lineMinDistance = Number.POSITIVE_INFINITY;
  const lineCandidateFrom = lowerBoundByX(items, x - radius2, visibleRange.from, visibleRange.to);
  const lineCandidateTo = upperBoundByX(items, x + radius2, lineCandidateFrom, visibleRange.to);
  const segmentFrom = Math.max(visibleRange.from + 1, lineCandidateFrom);
  const segmentTo = Math.min(visibleRange.to, lineCandidateTo + 1);
  for (let itemIndex = segmentFrom; itemIndex < segmentTo; itemIndex++) {
    const previousItem = items[itemIndex - 1];
    const currentItem = items[itemIndex];
    const [leftX, rightX] = lineSegmentHorizontalBounds(previousItem, currentItem, lineType, items, itemIndex);
    if (!isWithinHorizontalSweep(x, leftX, rightX, radius2)) {
      continue;
    }
    const distance = hitTestLineSegment(x, y, previousItem, currentItem, lineType, items, itemIndex, radius2);
    if (distance !== null) {
      lineMinDistance = Math.min(lineMinDistance, distance);
    }
  }
  if (Number.isFinite(pointMinDistance)) {
    return hoveredSeriesHitTestResult(pointMinDistance, 2, "series-point");
  }
  return Number.isFinite(lineMinDistance) ? hoveredSeriesHitTestResult(lineMinDistance, 1, "series-line") : null;
}
var LinePaneViewBase = class extends SeriesPaneViewBase {
  constructor(series, model) {
    super(series, model, true);
  }
  _internal__convertToCoordinates(priceScale, timeScale, firstValue) {
    timeScale._internal_indexesToCoordinates(this._internal__items, undefinedIfNull(this._internal__itemsVisibleRange));
    priceScale._internal_pointsArrayToCoordinates(this._internal__items, firstValue, undefinedIfNull(this._internal__itemsVisibleRange));
  }
  _internal__createRawItemBase(time, price) {
    return {
      _internal_time: time,
      _internal_price: price,
      _internal_x: NaN,
      _internal_y: NaN
    };
  }
  _internal__fillRawPoints() {
    const colorer = this._internal__series._internal_barColorer();
    this._internal__items = this._internal__series._internal_conflatedBars()._internal_rows().map((row) => {
      const isConflated = (row._internal_originalDataCount ?? 1) > 1;
      let value;
      if (isConflated) {
        const high = row._internal_value[
          1
          /* PlotRowValueIndex.High */
        ];
        const low = row._internal_value[
          2
          /* PlotRowValueIndex.Low */
        ];
        const close = row._internal_value[
          3
          /* PlotRowValueIndex.Close */
        ];
        const highMove = Math.abs(high - close);
        const lowMove = Math.abs(low - close);
        value = highMove > lowMove ? high : low;
      } else {
        value = row._internal_value[
          3
          /* PlotRowValueIndex.Close */
        ];
      }
      return this._internal__createRawItem(row._internal_index, value, colorer);
    });
  }
};
var LineHitTestPaneViewBase = class extends LinePaneViewBase {
  _internal__hitTestImpl(x, y) {
    const options = this._internal__series._internal_options();
    return hitTestLineSeries(this._internal__items, this._internal__itemsVisibleRange, x, y, options.lineType, options.lineVisible ? options.lineWidth : 1, options.pointMarkersVisible ? options.pointMarkersRadius || options.lineWidth / 2 + 2 : void 0, this._internal__model._internal_timeScale()._internal_barSpacing(), options.hitTestTolerance);
  }
};
var SeriesLinePaneView = class extends LineHitTestPaneViewBase {
  constructor() {
    super(...arguments);
    this._internal__renderer = new PaneRendererLine();
  }
  _internal__createRawItem(time, price, colorer) {
    return {
      ...this._internal__createRawItemBase(time, price),
      ...colorer._internal_barStyle(time)
    };
  }
  _internal__prepareRendererData() {
    const options = this._internal__series._internal_options();
    const data = {
      _internal_items: this._internal__items,
      _internal_lineStyle: options.lineStyle,
      _internal_lineType: options.lineVisible ? options.lineType : void 0,
      _internal_lineWidth: options.lineWidth,
      _internal_pointMarkersRadius: options.pointMarkersVisible ? options.pointMarkersRadius || options.lineWidth / 2 + 2 : void 0,
      _internal_visibleRange: this._internal__itemsVisibleRange,
      _internal_barWidth: this._internal__model._internal_timeScale()._internal_barSpacing()
    };
    this._internal__renderer._internal_setData(data);
  }
};
var lineStyleDefaults = {
  color: "#2196f3",
  lineStyle: 0,
  lineWidth: 3,
  lineType: 0,
  lineVisible: true,
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  crosshairMarkerBorderColor: "",
  crosshairMarkerBorderWidth: 2,
  crosshairMarkerBackgroundColor: "",
  lastPriceAnimation: 0,
  pointMarkersVisible: false
};
var createPaneView$5 = (series, model) => new SeriesLinePaneView(series, model);
var createLineSeries = () => {
  const definition = {
    type: "Line",
    isBuiltIn: true,
    defaultOptions: lineStyleDefaults,
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView$5
  };
  return definition;
};
var lineSeries = createLineSeries();
function finishStyledArea(baseLevelCoordinate, scope, style, areaFirstItem, newAreaFirstItem) {
  const { context, horizontalPixelRatio, verticalPixelRatio } = scope;
  context.lineTo(newAreaFirstItem._internal_x * horizontalPixelRatio, baseLevelCoordinate * verticalPixelRatio);
  context.lineTo(areaFirstItem._internal_x * horizontalPixelRatio, baseLevelCoordinate * verticalPixelRatio);
  context.closePath();
  context.fillStyle = style;
  context.fill();
}
var PaneRendererAreaBase = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._internal__data = null;
  }
  _internal_setData(data) {
    this._internal__data = data;
  }
  _internal__drawImpl(renderingScope) {
    if (this._internal__data === null) {
      return;
    }
    const { _internal_items: items, _internal_visibleRange: visibleRange, _internal_barWidth: barWidth, _internal_lineWidth: lineWidth, _internal_lineStyle: lineStyle, _internal_lineType: lineType } = this._internal__data;
    const baseLevelCoordinate = this._internal__data._internal_baseLevelCoordinate ?? (this._internal__data._internal_invertFilledArea ? 0 : renderingScope.mediaSize.height);
    if (visibleRange === null) {
      return;
    }
    const ctx = renderingScope.context;
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;
    setLineStyle(ctx, lineStyle);
    ctx.lineWidth = 1;
    walkLine(renderingScope, items, lineType, visibleRange, barWidth, this._internal__fillStyle.bind(this), finishStyledArea.bind(null, baseLevelCoordinate));
  }
};
var GradientStyleCache = class {
  // eslint-disable-next-line complexity
  _internal_get(scope, params) {
    const cachedParams = this._private__params;
    const { _internal_topColor1: topColor1, _internal_topColor2: topColor2, _internal_bottomColor1: bottomColor1, _internal_bottomColor2: bottomColor2, _internal_baseLevelCoordinate: baseLevelCoordinate, _internal_topCoordinate: topCoordinate, _internal_bottomCoordinate: bottomCoordinate } = params;
    if (this._private__cachedValue === void 0 || cachedParams === void 0 || cachedParams._internal_topColor1 !== topColor1 || cachedParams._internal_topColor2 !== topColor2 || cachedParams._internal_bottomColor1 !== bottomColor1 || cachedParams._internal_bottomColor2 !== bottomColor2 || cachedParams._internal_baseLevelCoordinate !== baseLevelCoordinate || cachedParams._internal_topCoordinate !== topCoordinate || cachedParams._internal_bottomCoordinate !== bottomCoordinate) {
      const { verticalPixelRatio } = scope;
      const multiplier = baseLevelCoordinate || topCoordinate > 0 ? verticalPixelRatio : 1;
      const top = topCoordinate * multiplier;
      const bottom = bottomCoordinate === scope.bitmapSize.height ? bottomCoordinate : bottomCoordinate * multiplier;
      const baseline = (baseLevelCoordinate ?? 0) * multiplier;
      const gradient = scope.context.createLinearGradient(0, top, 0, bottom);
      gradient.addColorStop(0, topColor1);
      if (baseLevelCoordinate !== null && baseLevelCoordinate !== void 0) {
        const range = bottom - top;
        const baselineRatio = clamp((baseline - top) / range, 0, 1);
        gradient.addColorStop(baselineRatio, topColor2);
        gradient.addColorStop(baselineRatio, bottomColor1);
      }
      gradient.addColorStop(1, bottomColor2);
      this._private__cachedValue = gradient;
      this._private__params = params;
    }
    return this._private__cachedValue;
  }
};
var PaneRendererBaselineArea = class extends PaneRendererAreaBase {
  constructor() {
    super(...arguments);
    this._private__fillCache = new GradientStyleCache();
  }
  _internal__fillStyle(renderingScope, item) {
    const data = this._internal__data;
    return this._private__fillCache._internal_get(renderingScope, {
      _internal_topColor1: item._internal_topFillColor1,
      _internal_topColor2: item._internal_topFillColor2,
      _internal_bottomColor1: item._internal_bottomFillColor1,
      _internal_bottomColor2: item._internal_bottomFillColor2,
      _internal_baseLevelCoordinate: data._internal_baseLevelCoordinate,
      _internal_topCoordinate: data._internal_topCoordinate ?? 0,
      _internal_bottomCoordinate: data._internal_bottomCoordinate ?? renderingScope.bitmapSize.height
    });
  }
};
var PaneRendererBaselineLine = class extends PaneRendererLineBase {
  constructor() {
    super(...arguments);
    this._private__strokeCache = new GradientStyleCache();
  }
  _internal__strokeStyle(renderingScope, item) {
    const data = this._internal__data;
    return this._private__strokeCache._internal_get(renderingScope, {
      _internal_topColor1: item._internal_topLineColor,
      _internal_topColor2: item._internal_topLineColor,
      _internal_bottomColor1: item._internal_bottomLineColor,
      _internal_bottomColor2: item._internal_bottomLineColor,
      _internal_baseLevelCoordinate: data._internal_baseLevelCoordinate,
      _internal_topCoordinate: data._internal_topCoordinate ?? 0,
      _internal_bottomCoordinate: data._internal_bottomCoordinate ?? renderingScope.bitmapSize.height
    });
  }
};
var FillSeriesCompositeRenderer = class {
  constructor(fillRenderer, lineRenderer, shouldDrawLine, shouldDrawLineOnTop) {
    this._private__fillRenderer = fillRenderer;
    this._private__lineRenderer = lineRenderer;
    this._private__shouldDrawLine = shouldDrawLine;
    this._private__shouldDrawLineOnTop = shouldDrawLineOnTop;
  }
  _internal_draw(target, isHovered, hitTestData) {
    this._private__fillRenderer._internal_draw(target, isHovered, hitTestData);
    if (this._private__shouldDrawLine() && (!isHovered || !this._private__shouldDrawLineOnTop())) {
      this._private__lineRenderer._internal_draw(target, isHovered, hitTestData);
    }
  }
};
var FillSeriesLinePaneView = class {
  constructor(lineRenderer, shouldRender) {
    this._private__lineRenderer = lineRenderer;
    this._private__shouldRender = shouldRender;
  }
  _internal_renderer() {
    return this._private__shouldRender() ? this._private__lineRenderer : null;
  }
};
var SeriesBaselinePaneView = class extends LineHitTestPaneViewBase {
  constructor(series, model) {
    super(series, model);
    this._private__baselineAreaRenderer = new PaneRendererBaselineArea();
    this._private__baselineLineRenderer = new PaneRendererBaselineLine();
    this._private__linePaneView = new FillSeriesLinePaneView(this._private__baselineLineRenderer, () => this._private__shouldDrawLine());
    this._private__normalPaneViews = [this];
    this._private__topPaneViews = [this._private__linePaneView];
    this._private__hoveredSourcePaneViews = {
      _internal_normalPaneViews: this._private__normalPaneViews,
      _internal_topPaneViews: this._private__topPaneViews
    };
    this._internal__renderer = new FillSeriesCompositeRenderer(this._private__baselineAreaRenderer, this._private__baselineLineRenderer, () => this._private__shouldDrawLine(), () => this._internal__model._internal_options().hoveredSeriesOnTop);
  }
  _internal_paneViewsForHoveredSourceOnTop() {
    return this._private__hoveredSourcePaneViews;
  }
  _internal__createRawItem(time, price, colorer) {
    return {
      ...this._internal__createRawItemBase(time, price),
      ...colorer._internal_barStyle(time)
    };
  }
  _internal__prepareRendererData() {
    const firstValue = this._internal__series._internal_firstValue();
    if (firstValue === null) {
      return;
    }
    const options = this._internal__series._internal_options();
    const baseLevelCoordinate = this._internal__series._internal_priceScale()._internal_priceToCoordinate(options.baseValue.price, firstValue._internal_value);
    const barWidth = this._internal__model._internal_timeScale()._internal_barSpacing();
    if (this._internal__itemsVisibleRange === null || this._internal__items.length === 0) {
      return;
    }
    let topCoordinate;
    let bottomCoordinate;
    if (options.relativeGradient) {
      topCoordinate = this._internal__items[this._internal__itemsVisibleRange.from]._internal_y;
      bottomCoordinate = this._internal__items[this._internal__itemsVisibleRange.from]._internal_y;
      for (let i = this._internal__itemsVisibleRange.from; i < this._internal__itemsVisibleRange.to; i++) {
        const item = this._internal__items[i];
        if (item._internal_y < topCoordinate) {
          topCoordinate = item._internal_y;
        }
        if (item._internal_y > bottomCoordinate) {
          bottomCoordinate = item._internal_y;
        }
      }
    }
    this._private__baselineAreaRenderer._internal_setData({
      _internal_items: this._internal__items,
      _internal_lineWidth: options.lineWidth,
      _internal_lineStyle: options.lineStyle,
      _internal_lineType: options.lineType,
      _internal_baseLevelCoordinate: baseLevelCoordinate,
      _internal_topCoordinate: topCoordinate,
      _internal_bottomCoordinate: bottomCoordinate,
      _internal_invertFilledArea: false,
      _internal_visibleRange: this._internal__itemsVisibleRange,
      _internal_barWidth: barWidth
    });
    this._private__baselineLineRenderer._internal_setData({
      _internal_items: this._internal__items,
      _internal_lineWidth: options.lineWidth,
      _internal_lineStyle: options.lineStyle,
      _internal_lineType: options.lineVisible ? options.lineType : void 0,
      _internal_pointMarkersRadius: options.pointMarkersVisible ? options.pointMarkersRadius || options.lineWidth / 2 + 2 : void 0,
      _internal_baseLevelCoordinate: baseLevelCoordinate,
      _internal_topCoordinate: topCoordinate,
      _internal_bottomCoordinate: bottomCoordinate,
      _internal_visibleRange: this._internal__itemsVisibleRange,
      _internal_barWidth: barWidth
    });
  }
  _private__shouldDrawLine() {
    return this._internal__series._internal_visible() && this._internal__itemsVisibleRange !== null && this._private__hasVisibleLineLikeContent();
  }
  _private__hasVisibleLineLikeContent() {
    const options = this._internal__series._internal_options();
    return options.lineVisible || options.pointMarkersVisible;
  }
};
var baselineStyleDefaults = {
  baseValue: {
    type: "price",
    price: 0
  },
  relativeGradient: false,
  topFillColor1: "rgba(38, 166, 154, 0.28)",
  topFillColor2: "rgba(38, 166, 154, 0.05)",
  topLineColor: "rgba(38, 166, 154, 1)",
  bottomFillColor1: "rgba(239, 83, 80, 0.05)",
  bottomFillColor2: "rgba(239, 83, 80, 0.28)",
  bottomLineColor: "rgba(239, 83, 80, 1)",
  lineWidth: 3,
  lineStyle: 0,
  lineType: 0,
  lineVisible: true,
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  crosshairMarkerBorderColor: "",
  crosshairMarkerBorderWidth: 2,
  crosshairMarkerBackgroundColor: "",
  lastPriceAnimation: 0,
  pointMarkersVisible: false
};
var createPaneView$4 = (series, model) => new SeriesBaselinePaneView(series, model);
var createSeries$4 = () => {
  const definition = {
    type: "Baseline",
    isBuiltIn: true,
    defaultOptions: baselineStyleDefaults,
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView$4
  };
  return definition;
};
var baselineSeries = createSeries$4();
var PaneRendererArea = class extends PaneRendererAreaBase {
  constructor() {
    super(...arguments);
    this._private__fillCache = new GradientStyleCache();
  }
  _internal__fillStyle(renderingScope, item) {
    return this._private__fillCache._internal_get(renderingScope, {
      _internal_topColor1: item._internal_topColor,
      _internal_topColor2: "",
      _internal_bottomColor1: "",
      _internal_bottomColor2: item._internal_bottomColor,
      _internal_topCoordinate: this._internal__data?._internal_topCoordinate ?? 0,
      _internal_bottomCoordinate: renderingScope.bitmapSize.height
    });
  }
};
var SeriesAreaPaneView = class extends LineHitTestPaneViewBase {
  constructor(series, model) {
    super(series, model);
    this._private__areaRenderer = new PaneRendererArea();
    this._private__lineRenderer = new PaneRendererLine();
    this._private__linePaneView = new FillSeriesLinePaneView(this._private__lineRenderer, () => this._private__shouldDrawLine());
    this._private__normalPaneViews = [this];
    this._private__topPaneViews = [this._private__linePaneView];
    this._private__hoveredSourcePaneViews = {
      _internal_normalPaneViews: this._private__normalPaneViews,
      _internal_topPaneViews: this._private__topPaneViews
    };
    this._internal__renderer = new FillSeriesCompositeRenderer(this._private__areaRenderer, this._private__lineRenderer, () => this._private__shouldDrawLine(), () => this._internal__model._internal_options().hoveredSeriesOnTop);
  }
  _internal_paneViewsForHoveredSourceOnTop() {
    return this._private__hoveredSourcePaneViews;
  }
  _internal__createRawItem(time, price, colorer) {
    return {
      ...this._internal__createRawItemBase(time, price),
      ...colorer._internal_barStyle(time)
    };
  }
  _internal__prepareRendererData() {
    const options = this._internal__series._internal_options();
    if (this._internal__itemsVisibleRange === null || this._internal__items.length === 0) {
      return;
    }
    let topCoordinate;
    if (options.relativeGradient) {
      topCoordinate = this._internal__items[this._internal__itemsVisibleRange.from]._internal_y;
      for (let i = this._internal__itemsVisibleRange.from; i < this._internal__itemsVisibleRange.to; i++) {
        const item = this._internal__items[i];
        if (item._internal_y < topCoordinate) {
          topCoordinate = item._internal_y;
        }
      }
    }
    this._private__areaRenderer._internal_setData({
      _internal_lineType: options.lineType,
      _internal_items: this._internal__items,
      _internal_lineStyle: options.lineStyle,
      _internal_lineWidth: options.lineWidth,
      _internal_baseLevelCoordinate: null,
      _internal_topCoordinate: topCoordinate,
      _internal_invertFilledArea: options.invertFilledArea,
      _internal_visibleRange: this._internal__itemsVisibleRange,
      _internal_barWidth: this._internal__model._internal_timeScale()._internal_barSpacing()
    });
    this._private__lineRenderer._internal_setData({
      _internal_lineType: options.lineVisible ? options.lineType : void 0,
      _internal_items: this._internal__items,
      _internal_lineStyle: options.lineStyle,
      _internal_lineWidth: options.lineWidth,
      _internal_visibleRange: this._internal__itemsVisibleRange,
      _internal_barWidth: this._internal__model._internal_timeScale()._internal_barSpacing(),
      _internal_pointMarkersRadius: options.pointMarkersVisible ? options.pointMarkersRadius || options.lineWidth / 2 + 2 : void 0
    });
  }
  _private__shouldDrawLine() {
    return this._internal__series._internal_visible() && this._internal__itemsVisibleRange !== null && this._private__hasVisibleLineLikeContent();
  }
  _private__hasVisibleLineLikeContent() {
    const options = this._internal__series._internal_options();
    return options.lineVisible || options.pointMarkersVisible;
  }
};
var areaStyleDefaults = {
  topColor: "rgba( 46, 220, 135, 0.4)",
  bottomColor: "rgba( 40, 221, 100, 0)",
  invertFilledArea: false,
  relativeGradient: false,
  lineColor: "#33D778",
  lineStyle: 0,
  lineWidth: 3,
  lineType: 0,
  lineVisible: true,
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  crosshairMarkerBorderColor: "",
  crosshairMarkerBorderWidth: 2,
  crosshairMarkerBackgroundColor: "",
  lastPriceAnimation: 0,
  pointMarkersVisible: false
};
var createPaneView$3 = (series, model) => new SeriesAreaPaneView(series, model);
var createSeries$3 = () => {
  const definition = {
    type: "Area",
    isBuiltIn: true,
    defaultOptions: areaStyleDefaults,
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView$3
  };
  return definition;
};
var areaSeries = createSeries$3();
function optimalBarWidth(barSpacing, pixelRatio) {
  return Math.floor(barSpacing * 0.3 * pixelRatio);
}
function optimalCandlestickWidth(barSpacing, pixelRatio) {
  const barSpacingSpecialCaseFrom = 2.5;
  const barSpacingSpecialCaseTo = 4;
  const barSpacingSpecialCaseCoeff = 3;
  if (barSpacing >= barSpacingSpecialCaseFrom && barSpacing <= barSpacingSpecialCaseTo) {
    return Math.floor(barSpacingSpecialCaseCoeff * pixelRatio);
  }
  const barSpacingReducingCoeff = 0.2;
  const coeff = 1 - barSpacingReducingCoeff * Math.atan(Math.max(barSpacingSpecialCaseTo, barSpacing) - barSpacingSpecialCaseTo) / (Math.PI * 0.5);
  const res = Math.floor(barSpacing * coeff * pixelRatio);
  const scaledBarSpacing = Math.floor(barSpacing * pixelRatio);
  const optimal = Math.min(res, scaledBarSpacing);
  return Math.max(Math.floor(pixelRatio), optimal);
}
var PaneRendererBars = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._private__data = null;
    this._private__barWidth = 0;
    this._private__barLineWidth = 0;
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  // eslint-disable-next-line complexity
  _internal__drawImpl({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._private__data === null || this._private__data._internal_bars.length === 0 || this._private__data._internal_visibleRange === null) {
      return;
    }
    this._private__barWidth = this._private__calcBarWidth(horizontalPixelRatio);
    if (this._private__barWidth >= 2) {
      const lineWidth = Math.max(1, Math.floor(horizontalPixelRatio));
      if (lineWidth % 2 !== this._private__barWidth % 2) {
        this._private__barWidth--;
      }
    }
    this._private__barLineWidth = this._private__data._internal_thinBars ? Math.min(this._private__barWidth, Math.floor(horizontalPixelRatio)) : this._private__barWidth;
    let prevColor = null;
    const drawOpenClose = this._private__barLineWidth <= this._private__barWidth && this._private__data._internal_barSpacing >= Math.floor(1.5 * horizontalPixelRatio);
    for (let i = this._private__data._internal_visibleRange.from; i < this._private__data._internal_visibleRange.to; ++i) {
      const bar = this._private__data._internal_bars[i];
      if (prevColor !== bar._internal_barColor) {
        ctx.fillStyle = bar._internal_barColor;
        prevColor = bar._internal_barColor;
      }
      const bodyWidthHalf = Math.floor(this._private__barLineWidth * 0.5);
      const bodyCenter = Math.round(bar._internal_x * horizontalPixelRatio);
      const bodyLeft = bodyCenter - bodyWidthHalf;
      const bodyWidth = this._private__barLineWidth;
      const bodyRight = bodyLeft + bodyWidth - 1;
      const high = Math.min(bar._internal_highY, bar._internal_lowY);
      const low = Math.max(bar._internal_highY, bar._internal_lowY);
      const bodyTop = Math.round(high * verticalPixelRatio) - bodyWidthHalf;
      const bodyBottom = Math.round(low * verticalPixelRatio) + bodyWidthHalf;
      const bodyHeight = Math.max(bodyBottom - bodyTop, this._private__barLineWidth);
      ctx.fillRect(bodyLeft, bodyTop, bodyWidth, bodyHeight);
      const sideWidth = Math.ceil(this._private__barWidth * 1.5);
      if (drawOpenClose) {
        if (this._private__data._internal_openVisible) {
          const openLeft = bodyCenter - sideWidth;
          let openTop = Math.max(bodyTop, Math.round(bar._internal_openY * verticalPixelRatio) - bodyWidthHalf);
          let openBottom = openTop + bodyWidth - 1;
          if (openBottom > bodyTop + bodyHeight - 1) {
            openBottom = bodyTop + bodyHeight - 1;
            openTop = openBottom - bodyWidth + 1;
          }
          ctx.fillRect(openLeft, openTop, bodyLeft - openLeft, openBottom - openTop + 1);
        }
        const closeRight = bodyCenter + sideWidth;
        let closeTop = Math.max(bodyTop, Math.round(bar._internal_closeY * verticalPixelRatio) - bodyWidthHalf);
        let closeBottom = closeTop + bodyWidth - 1;
        if (closeBottom > bodyTop + bodyHeight - 1) {
          closeBottom = bodyTop + bodyHeight - 1;
          closeTop = closeBottom - bodyWidth + 1;
        }
        ctx.fillRect(bodyRight + 1, closeTop, closeRight - bodyRight, closeBottom - closeTop + 1);
      }
    }
  }
  _private__calcBarWidth(pixelRatio) {
    const limit = Math.floor(pixelRatio);
    return Math.max(limit, Math.floor(optimalBarWidth(ensureNotNull(this._private__data)._internal_barSpacing, pixelRatio)));
  }
};
var BarsPaneViewBase = class extends SeriesPaneViewBase {
  constructor(series, model) {
    super(series, model, false);
  }
  _internal__hitTestImpl(x, y) {
    return hitTestSeriesRange(this._internal__items, this._internal__itemsVisibleRange, x, y, this._internal__model._internal_timeScale()._internal_barSpacing(), this._internal__series._internal_options().hitTestTolerance, (bar, out) => {
      out[0] = bar._internal_highY;
      out[1] = bar._internal_lowY;
    });
  }
  _internal__convertToCoordinates(priceScale, timeScale, firstValue) {
    timeScale._internal_indexesToCoordinates(this._internal__items, undefinedIfNull(this._internal__itemsVisibleRange));
    priceScale._internal_barPricesToCoordinates(this._internal__items, firstValue, undefinedIfNull(this._internal__itemsVisibleRange));
  }
  _internal__createDefaultItem(time, bar, colorer) {
    return {
      _internal_time: time,
      _internal_open: bar._internal_value[
        0
        /* PlotRowValueIndex.Open */
      ],
      _internal_high: bar._internal_value[
        1
        /* PlotRowValueIndex.High */
      ],
      _internal_low: bar._internal_value[
        2
        /* PlotRowValueIndex.Low */
      ],
      _internal_close: bar._internal_value[
        3
        /* PlotRowValueIndex.Close */
      ],
      _internal_x: NaN,
      _internal_openY: NaN,
      _internal_highY: NaN,
      _internal_lowY: NaN,
      _internal_closeY: NaN
    };
  }
  _internal__fillRawPoints() {
    const colorer = this._internal__series._internal_barColorer();
    this._internal__items = this._internal__series._internal_conflatedBars()._internal_rows().map((row) => this._internal__createRawItem(row._internal_index, row, colorer));
  }
};
var SeriesBarsPaneView = class extends BarsPaneViewBase {
  constructor() {
    super(...arguments);
    this._internal__renderer = new PaneRendererBars();
  }
  _internal__createRawItem(time, bar, colorer) {
    return {
      ...this._internal__createDefaultItem(time, bar, colorer),
      ...colorer._internal_barStyle(time)
    };
  }
  _internal__prepareRendererData() {
    const barStyleProps = this._internal__series._internal_options();
    this._internal__renderer._internal_setData({
      _internal_bars: this._internal__items,
      _internal_barSpacing: this._internal__model._internal_timeScale()._internal_barSpacing(),
      _internal_openVisible: barStyleProps.openVisible,
      _internal_thinBars: barStyleProps.thinBars,
      _internal_visibleRange: this._internal__itemsVisibleRange
    });
  }
};
var barStyleDefaults = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  openVisible: true,
  thinBars: true
};
var createPaneView$2 = (series, model) => new SeriesBarsPaneView(series, model);
var createSeries$2 = () => {
  const definition = {
    type: "Bar",
    isBuiltIn: true,
    defaultOptions: barStyleDefaults,
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView$2
  };
  return definition;
};
var barSeries = createSeries$2();
var PaneRendererCandlesticks = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._private__data = null;
    this._private__barWidth = 0;
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  _internal__drawImpl(renderingScope) {
    if (this._private__data === null || this._private__data._internal_bars.length === 0 || this._private__data._internal_visibleRange === null) {
      return;
    }
    const { horizontalPixelRatio } = renderingScope;
    this._private__barWidth = optimalCandlestickWidth(this._private__data._internal_barSpacing, horizontalPixelRatio);
    if (this._private__barWidth >= 2) {
      const wickWidth = Math.floor(horizontalPixelRatio);
      if (wickWidth % 2 !== this._private__barWidth % 2) {
        this._private__barWidth--;
      }
    }
    const bars = this._private__data._internal_bars;
    if (this._private__data._internal_wickVisible) {
      this._private__drawWicks(renderingScope, bars, this._private__data._internal_visibleRange);
    }
    if (this._private__data._internal_borderVisible) {
      this._private__drawBorder(renderingScope, bars, this._private__data._internal_visibleRange);
    }
    const borderWidth = this._private__calculateBorderWidth(horizontalPixelRatio);
    if (!this._private__data._internal_borderVisible || this._private__barWidth > borderWidth * 2) {
      this._private__drawCandles(renderingScope, bars, this._private__data._internal_visibleRange);
    }
  }
  _private__drawWicks(renderingScope, bars, visibleRange) {
    if (this._private__data === null) {
      return;
    }
    const { context: ctx, horizontalPixelRatio, verticalPixelRatio } = renderingScope;
    let prevWickColor = "";
    let wickWidth = Math.min(Math.floor(horizontalPixelRatio), Math.floor(this._private__data._internal_barSpacing * horizontalPixelRatio));
    wickWidth = Math.max(Math.floor(horizontalPixelRatio), Math.min(wickWidth, this._private__barWidth));
    const wickOffset = Math.floor(wickWidth * 0.5);
    let prevEdge = null;
    for (let i = visibleRange.from; i < visibleRange.to; i++) {
      const bar = bars[i];
      if (bar._internal_barWickColor !== prevWickColor) {
        ctx.fillStyle = bar._internal_barWickColor;
        prevWickColor = bar._internal_barWickColor;
      }
      const top = Math.round(Math.min(bar._internal_openY, bar._internal_closeY) * verticalPixelRatio);
      const bottom = Math.round(Math.max(bar._internal_openY, bar._internal_closeY) * verticalPixelRatio);
      const high = Math.round(bar._internal_highY * verticalPixelRatio);
      const low = Math.round(bar._internal_lowY * verticalPixelRatio);
      const scaledX = Math.round(horizontalPixelRatio * bar._internal_x);
      let left = scaledX - wickOffset;
      const right = left + wickWidth - 1;
      if (prevEdge !== null) {
        left = Math.max(prevEdge + 1, left);
        left = Math.min(left, right);
      }
      const width = right - left + 1;
      ctx.fillRect(left, high, width, top - high);
      ctx.fillRect(left, bottom + 1, width, low - bottom);
      prevEdge = right;
    }
  }
  _private__calculateBorderWidth(pixelRatio) {
    let borderWidth = Math.floor(1 * pixelRatio);
    if (this._private__barWidth <= 2 * borderWidth) {
      borderWidth = Math.floor((this._private__barWidth - 1) * 0.5);
    }
    const res = Math.max(Math.floor(pixelRatio), borderWidth);
    if (this._private__barWidth <= res * 2) {
      return Math.max(Math.floor(pixelRatio), Math.floor(1 * pixelRatio));
    }
    return res;
  }
  _private__drawBorder(renderingScope, bars, visibleRange) {
    if (this._private__data === null) {
      return;
    }
    const { context: ctx, horizontalPixelRatio, verticalPixelRatio } = renderingScope;
    let prevBorderColor = "";
    const borderWidth = this._private__calculateBorderWidth(horizontalPixelRatio);
    let prevEdge = null;
    for (let i = visibleRange.from; i < visibleRange.to; i++) {
      const bar = bars[i];
      if (bar._internal_barBorderColor !== prevBorderColor) {
        ctx.fillStyle = bar._internal_barBorderColor;
        prevBorderColor = bar._internal_barBorderColor;
      }
      let left = Math.round(bar._internal_x * horizontalPixelRatio) - Math.floor(this._private__barWidth * 0.5);
      const right = left + this._private__barWidth - 1;
      const top = Math.round(Math.min(bar._internal_openY, bar._internal_closeY) * verticalPixelRatio);
      const bottom = Math.round(Math.max(bar._internal_openY, bar._internal_closeY) * verticalPixelRatio);
      if (prevEdge !== null) {
        left = Math.max(prevEdge + 1, left);
        left = Math.min(left, right);
      }
      if (this._private__data._internal_barSpacing * horizontalPixelRatio > 2 * borderWidth) {
        fillRectInnerBorder(ctx, left, top, right - left + 1, bottom - top + 1, borderWidth);
      } else {
        const width = right - left + 1;
        ctx.fillRect(left, top, width, bottom - top + 1);
      }
      prevEdge = right;
    }
  }
  _private__drawCandles(renderingScope, bars, visibleRange) {
    if (this._private__data === null) {
      return;
    }
    const { context: ctx, horizontalPixelRatio, verticalPixelRatio } = renderingScope;
    let prevBarColor = "";
    const borderWidth = this._private__calculateBorderWidth(horizontalPixelRatio);
    for (let i = visibleRange.from; i < visibleRange.to; i++) {
      const bar = bars[i];
      let top = Math.round(Math.min(bar._internal_openY, bar._internal_closeY) * verticalPixelRatio);
      let bottom = Math.round(Math.max(bar._internal_openY, bar._internal_closeY) * verticalPixelRatio);
      let left = Math.round(bar._internal_x * horizontalPixelRatio) - Math.floor(this._private__barWidth * 0.5);
      let right = left + this._private__barWidth - 1;
      if (bar._internal_barColor !== prevBarColor) {
        const barColor = bar._internal_barColor;
        ctx.fillStyle = barColor;
        prevBarColor = barColor;
      }
      if (this._private__data._internal_borderVisible) {
        left += borderWidth;
        top += borderWidth;
        right -= borderWidth;
        bottom -= borderWidth;
      }
      if (top > bottom) {
        continue;
      }
      ctx.fillRect(left, top, right - left + 1, bottom - top + 1);
    }
  }
};
var SeriesCandlesticksPaneView = class extends BarsPaneViewBase {
  constructor() {
    super(...arguments);
    this._internal__renderer = new PaneRendererCandlesticks();
  }
  _internal__createRawItem(time, bar, colorer) {
    return {
      ...this._internal__createDefaultItem(time, bar, colorer),
      ...colorer._internal_barStyle(time)
    };
  }
  _internal__prepareRendererData() {
    const candlestickStyleProps = this._internal__series._internal_options();
    this._internal__renderer._internal_setData({
      _internal_bars: this._internal__items,
      _internal_barSpacing: this._internal__model._internal_timeScale()._internal_barSpacing(),
      _internal_wickVisible: candlestickStyleProps.wickVisible,
      _internal_borderVisible: candlestickStyleProps.borderVisible,
      _internal_visibleRange: this._internal__itemsVisibleRange
    });
  }
};
var candlestickStyleDefaults = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  wickVisible: true,
  borderVisible: true,
  borderColor: "#378658",
  borderUpColor: "#26a69a",
  borderDownColor: "#ef5350",
  wickColor: "#737375",
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350"
};
var createPaneView$1 = (series, model) => new SeriesCandlesticksPaneView(series, model);
var createSeries$1 = () => {
  const definition = {
    type: "Candlestick",
    isBuiltIn: true,
    defaultOptions: candlestickStyleDefaults,
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView$1
  };
  return definition;
};
var candlestickSeries = createSeries$1();
var showSpacingMinimalBarWidth = 1;
var alignToMinimalWidthLimit = 4;
var PaneRendererHistogram = class extends BitmapCoordinatesPaneRenderer {
  constructor() {
    super(...arguments);
    this._private__data = null;
    this._private__precalculatedCache = [];
  }
  _internal_setData(data) {
    this._private__data = data;
    this._private__precalculatedCache = [];
  }
  _internal__drawImpl({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._private__data === null || this._private__data._internal_items.length === 0 || this._private__data._internal_visibleRange === null) {
      return;
    }
    if (!this._private__precalculatedCache.length) {
      this._private__fillPrecalculatedCache(horizontalPixelRatio);
    }
    const tickWidth = Math.max(1, Math.floor(verticalPixelRatio));
    const histogramBase = Math.round(this._private__data._internal_histogramBase * verticalPixelRatio);
    const topHistogramBase = histogramBase - Math.floor(tickWidth / 2);
    const bottomHistogramBase = topHistogramBase + tickWidth;
    for (let i = this._private__data._internal_visibleRange.from; i < this._private__data._internal_visibleRange.to; i++) {
      const item = this._private__data._internal_items[i];
      const current2 = this._private__precalculatedCache[i - this._private__data._internal_visibleRange.from];
      const y = Math.round(item._internal_y * verticalPixelRatio);
      ctx.fillStyle = item._internal_barColor;
      let top;
      let bottom;
      if (y <= topHistogramBase) {
        top = y;
        bottom = bottomHistogramBase;
      } else {
        top = topHistogramBase;
        bottom = y - Math.floor(tickWidth / 2) + tickWidth;
      }
      ctx.fillRect(current2._internal_left, top, current2._internal_right - current2._internal_left + 1, bottom - top);
    }
  }
  // eslint-disable-next-line complexity
  _private__fillPrecalculatedCache(pixelRatio) {
    if (this._private__data === null || this._private__data._internal_items.length === 0 || this._private__data._internal_visibleRange === null) {
      this._private__precalculatedCache = [];
      return;
    }
    const spacing = Math.ceil(this._private__data._internal_barSpacing * pixelRatio) <= showSpacingMinimalBarWidth ? 0 : Math.max(1, Math.floor(pixelRatio));
    const columnWidth = Math.round(this._private__data._internal_barSpacing * pixelRatio) - spacing;
    this._private__precalculatedCache = new Array(this._private__data._internal_visibleRange.to - this._private__data._internal_visibleRange.from);
    for (let i = this._private__data._internal_visibleRange.from; i < this._private__data._internal_visibleRange.to; i++) {
      const item = this._private__data._internal_items[i];
      const x = Math.round(item._internal_x * pixelRatio);
      let left;
      let right;
      if (columnWidth % 2) {
        const halfWidth = (columnWidth - 1) / 2;
        left = x - halfWidth;
        right = x + halfWidth;
      } else {
        const halfWidth = columnWidth / 2;
        left = x - halfWidth;
        right = x + halfWidth - 1;
      }
      this._private__precalculatedCache[i - this._private__data._internal_visibleRange.from] = {
        _internal_left: left,
        _internal_right: right,
        _internal_roundedCenter: x,
        _internal_center: item._internal_x * pixelRatio,
        _internal_time: item._internal_time
      };
    }
    for (let i = this._private__data._internal_visibleRange.from + 1; i < this._private__data._internal_visibleRange.to; i++) {
      const current2 = this._private__precalculatedCache[i - this._private__data._internal_visibleRange.from];
      const prev = this._private__precalculatedCache[i - this._private__data._internal_visibleRange.from - 1];
      if (current2._internal_time !== prev._internal_time + 1) {
        continue;
      }
      if (current2._internal_left - prev._internal_right !== spacing + 1) {
        if (prev._internal_roundedCenter > prev._internal_center) {
          prev._internal_right = current2._internal_left - spacing - 1;
        } else {
          current2._internal_left = prev._internal_right + spacing + 1;
        }
      }
    }
    let minWidth = Math.ceil(this._private__data._internal_barSpacing * pixelRatio);
    for (let i = this._private__data._internal_visibleRange.from; i < this._private__data._internal_visibleRange.to; i++) {
      const current2 = this._private__precalculatedCache[i - this._private__data._internal_visibleRange.from];
      if (current2._internal_right < current2._internal_left) {
        current2._internal_right = current2._internal_left;
      }
      const width = current2._internal_right - current2._internal_left + 1;
      minWidth = Math.min(width, minWidth);
    }
    if (spacing > 0 && minWidth < alignToMinimalWidthLimit) {
      for (let i = this._private__data._internal_visibleRange.from; i < this._private__data._internal_visibleRange.to; i++) {
        const current2 = this._private__precalculatedCache[i - this._private__data._internal_visibleRange.from];
        const width = current2._internal_right - current2._internal_left + 1;
        if (width > minWidth) {
          if (current2._internal_roundedCenter > current2._internal_center) {
            current2._internal_right -= 1;
          } else {
            current2._internal_left += 1;
          }
        }
      }
    }
  }
};
var SeriesHistogramPaneView = class extends LinePaneViewBase {
  constructor() {
    super(...arguments);
    this._internal__renderer = new PaneRendererHistogram();
  }
  _internal__hitTestImpl(x, y) {
    const histogramBase = this._internal__series._internal_priceScale()._internal_priceToCoordinate(this._internal__series._internal_options().base, ensureNotNull(this._internal__series._internal_firstValue())._internal_value);
    if (histogramBase === null) {
      return null;
    }
    return hitTestSeriesRange(this._internal__items, this._internal__itemsVisibleRange, x, y, this._internal__model._internal_timeScale()._internal_barSpacing(), this._internal__series._internal_options().hitTestTolerance, (item, out) => {
      out[0] = item._internal_y;
      out[1] = histogramBase;
    });
  }
  _internal__createRawItem(time, price, colorer) {
    return {
      ...this._internal__createRawItemBase(time, price),
      ...colorer._internal_barStyle(time)
    };
  }
  _internal__prepareRendererData() {
    const data = {
      _internal_items: this._internal__items,
      _internal_barSpacing: this._internal__model._internal_timeScale()._internal_barSpacing(),
      _internal_visibleRange: this._internal__itemsVisibleRange,
      _internal_histogramBase: this._internal__series._internal_priceScale()._internal_priceToCoordinate(this._internal__series._internal_options().base, ensureNotNull(this._internal__series._internal_firstValue())._internal_value)
    };
    this._internal__renderer._internal_setData(data);
  }
};
var histogramStyleDefaults = {
  color: "#26a69a",
  base: 0
};
var createPaneView = (series, model) => new SeriesHistogramPaneView(series, model);
var createSeries = () => {
  const definition = {
    type: "Histogram",
    isBuiltIn: true,
    defaultOptions: histogramStyleDefaults,
    /**
     * @internal
     */
    _internal_createPaneView: createPaneView
  };
  return definition;
};
var histogramSeries = createSeries();
var SeriesPrimitiveAdapter = class {
  constructor(series, primitive) {
    this._internal__series = series;
    this._internal__primitive = primitive;
    this._private__attach();
  }
  detach() {
    this._internal__series.detachPrimitive(this._internal__primitive);
  }
  getSeries() {
    return this._internal__series;
  }
  applyOptions(options) {
    if (this._internal__primitive && this._internal__primitive._internal_applyOptions) {
      this._internal__primitive._internal_applyOptions(options);
    }
  }
  _private__attach() {
    this._internal__series.attachPrimitive(this._internal__primitive);
  }
};
var seriesMarkerOptionsDefaults = {
  autoScale: true,
  zOrder: "normal"
};
function size2(barSpacing, coeff) {
  const result = Math.min(
    Math.max(
      barSpacing,
      12
      /* Constants.MinShapeSize */
    ),
    30
    /* Constants.MaxShapeSize */
  ) * coeff;
  return ceiledOdd(result);
}
function shapeSize(shape, originalSize) {
  const coeff = shape === "circle" ? 0.8 : shape === "square" ? 0.7 : 1;
  return ceiledOdd(Math.max(
    originalSize,
    12
    /* Constants.MinShapeSize */
  ) * coeff);
}
function calculateShapeHeight(barSpacing) {
  return ceiledEven(size2(barSpacing, 1));
}
function shapeMargin(barSpacing) {
  return Math.max(
    size2(barSpacing, 0.1),
    3
    /* Constants.MinShapeMargin */
  );
}
function calculateAdjustedMargin(margin, hasSide, hasInBar) {
  if (hasSide) {
    return margin;
  } else if (hasInBar) {
    return Math.ceil(margin / 2);
  }
  return 0;
}
function drawArrow(up, ctx, coords, size3) {
  const arrowSize = shapeSize("arrowUp", size3);
  const halfArrowSize = (arrowSize - 1) / 2 * coords._internal_pixelRatio;
  const baseSize = ceiledOdd(size3 / 2);
  const halfBaseSize = (baseSize - 1) / 2 * coords._internal_pixelRatio;
  ctx.beginPath();
  if (up) {
    ctx.moveTo(coords._internal_x - halfArrowSize, coords._internal_y);
    ctx.lineTo(coords._internal_x, coords._internal_y - halfArrowSize);
    ctx.lineTo(coords._internal_x + halfArrowSize, coords._internal_y);
    ctx.lineTo(coords._internal_x + halfBaseSize, coords._internal_y);
    ctx.lineTo(coords._internal_x + halfBaseSize, coords._internal_y + halfArrowSize);
    ctx.lineTo(coords._internal_x - halfBaseSize, coords._internal_y + halfArrowSize);
    ctx.lineTo(coords._internal_x - halfBaseSize, coords._internal_y);
  } else {
    ctx.moveTo(coords._internal_x - halfArrowSize, coords._internal_y);
    ctx.lineTo(coords._internal_x, coords._internal_y + halfArrowSize);
    ctx.lineTo(coords._internal_x + halfArrowSize, coords._internal_y);
    ctx.lineTo(coords._internal_x + halfBaseSize, coords._internal_y);
    ctx.lineTo(coords._internal_x + halfBaseSize, coords._internal_y - halfArrowSize);
    ctx.lineTo(coords._internal_x - halfBaseSize, coords._internal_y - halfArrowSize);
    ctx.lineTo(coords._internal_x - halfBaseSize, coords._internal_y);
  }
  ctx.fill();
}
function hitTestArrow(up, centerX, centerY, size3, x, y) {
  const arrowSize = shapeSize("arrowUp", size3);
  const halfArrowSize = (arrowSize - 1) / 2;
  const baseSize = ceiledOdd(size3 / 2);
  const halfBaseSize = (baseSize - 1) / 2;
  const triangleTolerance = 3;
  const rectTolerance = 2;
  const baseLeft = centerX - halfBaseSize - rectTolerance;
  const baseRight = centerX + halfBaseSize + rectTolerance;
  const baseTop = up ? centerY : centerY - halfArrowSize;
  const baseBottom = up ? centerY + halfArrowSize : centerY;
  if (x >= baseLeft && x <= baseRight && y >= baseTop - rectTolerance && y <= baseBottom + rectTolerance) {
    return true;
  }
  const isInTriangleBounds = () => {
    const headLeft = centerX - halfArrowSize - triangleTolerance;
    const headRight = centerX + halfArrowSize + triangleTolerance;
    const headTop = up ? centerY - halfArrowSize - triangleTolerance : centerY;
    const headBottom = up ? centerY : centerY + halfArrowSize + triangleTolerance;
    if (x < headLeft || x > headRight || y < headTop || y > headBottom) {
      return false;
    }
    const dx = Math.abs(x - centerX);
    const dy = up ? Math.abs(y - centerY) : Math.abs(y - centerY);
    return dy + triangleTolerance >= dx / 2;
  };
  return isInTriangleBounds();
}
function drawCircle(ctx, coords, size3) {
  const circleSize = shapeSize("circle", size3);
  const halfSize = (circleSize - 1) / 2;
  ctx.beginPath();
  ctx.arc(coords._internal_x, coords._internal_y, halfSize * coords._internal_pixelRatio, 0, 2 * Math.PI, false);
  ctx.fill();
}
function hitTestCircle(centerX, centerY, size3, x, y) {
  const circleSize = shapeSize("circle", size3);
  const tolerance = 2 + circleSize / 2;
  const xOffset = centerX - x;
  const yOffset = centerY - y;
  const dist = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
  return dist <= tolerance;
}
function drawSquare(ctx, coords, size3) {
  const squareSize = shapeSize("square", size3);
  const halfSize = (squareSize - 1) * coords._internal_pixelRatio / 2;
  const left = coords._internal_x - halfSize;
  const top = coords._internal_y - halfSize;
  ctx.fillRect(left, top, squareSize * coords._internal_pixelRatio, squareSize * coords._internal_pixelRatio);
}
function hitTestSquare(centerX, centerY, size3, x, y) {
  const squareSize = shapeSize("square", size3);
  const halfSize = (squareSize - 1) / 2;
  const left = centerX - halfSize;
  const top = centerY - halfSize;
  return x >= left && x <= left + squareSize && y >= top && y <= top + squareSize;
}
function drawText(ctx, text, x, y, horizontalPixelRatio, verticalPixelRatio) {
  ctx.save();
  ctx.scale(horizontalPixelRatio, verticalPixelRatio);
  ctx.fillText(text, x, y);
  ctx.restore();
}
function hitTestText(textX, textY, textWidth, textHeight, x, y) {
  const halfHeight = textHeight / 2;
  return x >= textX && x <= textX + textWidth && y >= textY - halfHeight && y <= textY + halfHeight;
}
var SeriesMarkersRenderer = class {
  constructor() {
    this._private__data = null;
    this._private__textWidthCache = new TextWidthCache();
    this._private__fontSize = -1;
    this._private__fontFamily = "";
    this._private__font = "";
    this._private__zOrder = "normal";
  }
  _internal_setData(data) {
    this._private__data = data;
  }
  _internal_setParams(fontSize, fontFamily, zOrder) {
    if (this._private__fontSize !== fontSize || this._private__fontFamily !== fontFamily) {
      this._private__fontSize = fontSize;
      this._private__fontFamily = fontFamily;
      this._private__font = makeFont(fontSize, fontFamily);
      this._private__textWidthCache._internal_reset();
    }
    this._private__zOrder = zOrder;
  }
  _internal_hitTest(x, y) {
    if (this._private__data === null || this._private__data._internal_visibleRange === null) {
      return null;
    }
    for (let i = this._private__data._internal_visibleRange.from; i < this._private__data._internal_visibleRange.to; i++) {
      const item = this._private__data._internal_items[i];
      if (item && hitTestItem(item, x, y)) {
        return {
          zOrder: "normal",
          externalId: item._internal_externalId ?? "",
          itemType: "marker"
        };
      }
    }
    return null;
  }
  draw(target) {
    if (this._private__zOrder === "aboveSeries") {
      return;
    }
    target.useBitmapCoordinateSpace((scope) => {
      this._internal__drawImpl(scope);
    });
  }
  drawBackground(target) {
    if (this._private__zOrder !== "aboveSeries") {
      return;
    }
    target.useBitmapCoordinateSpace((scope) => {
      this._internal__drawImpl(scope);
    });
  }
  _internal__drawImpl({ context: ctx, horizontalPixelRatio, verticalPixelRatio }) {
    if (this._private__data === null || this._private__data._internal_visibleRange === null) {
      return;
    }
    ctx.textBaseline = "middle";
    ctx.font = this._private__font;
    for (let index = this._private__data._internal_visibleRange.from; index < this._private__data._internal_visibleRange.to; index++) {
      const item = this._private__data._internal_items[index];
      if (item._internal_text !== void 0) {
        item._internal_text._internal_width = this._private__textWidthCache._internal_measureText(ctx, item._internal_text._internal_content);
        item._internal_text._internal_height = this._private__fontSize;
        item._internal_text._internal_x = item._internal_x - item._internal_text._internal_width / 2;
      }
      drawItem(item, ctx, horizontalPixelRatio, verticalPixelRatio);
    }
  }
};
function bitmapShapeItemCoordinates(item, horizontalPixelRatio, verticalPixelRatio) {
  const tickWidth = Math.max(1, Math.floor(horizontalPixelRatio));
  const correction = tickWidth % 2 / 2;
  return {
    _internal_x: Math.round(item._internal_x * horizontalPixelRatio) + correction,
    _internal_y: item._internal_y * verticalPixelRatio,
    _internal_pixelRatio: horizontalPixelRatio
  };
}
function drawItem(item, ctx, horizontalPixelRatio, verticalPixelRatio) {
  ctx.fillStyle = item._internal_color;
  if (item._internal_text !== void 0) {
    drawText(ctx, item._internal_text._internal_content, item._internal_text._internal_x, item._internal_text._internal_y, horizontalPixelRatio, verticalPixelRatio);
  }
  drawShape(item, ctx, bitmapShapeItemCoordinates(item, horizontalPixelRatio, verticalPixelRatio));
}
function drawShape(item, ctx, coordinates) {
  if (item._internal_size === 0) {
    return;
  }
  switch (item._internal_shape) {
    case "arrowDown":
      drawArrow(false, ctx, coordinates, item._internal_size);
      return;
    case "arrowUp":
      drawArrow(true, ctx, coordinates, item._internal_size);
      return;
    case "circle":
      drawCircle(ctx, coordinates, item._internal_size);
      return;
    case "square":
      drawSquare(ctx, coordinates, item._internal_size);
      return;
  }
  ensureNever(item._internal_shape);
}
function hitTestItem(item, x, y) {
  if (item._internal_text !== void 0 && hitTestText(item._internal_text._internal_x, item._internal_text._internal_y, item._internal_text._internal_width, item._internal_text._internal_height, x, y)) {
    return true;
  }
  return hitTestShape(item, x, y);
}
function hitTestShape(item, x, y) {
  if (item._internal_size === 0) {
    return false;
  }
  switch (item._internal_shape) {
    case "arrowDown":
      return hitTestArrow(true, item._internal_x, item._internal_y, item._internal_size, x, y);
    case "arrowUp":
      return hitTestArrow(false, item._internal_x, item._internal_y, item._internal_size, x, y);
    case "circle":
      return hitTestCircle(item._internal_x, item._internal_y, item._internal_size, x, y);
    case "square":
      return hitTestSquare(item._internal_x, item._internal_y, item._internal_size, x, y);
  }
}
function isPriceMarker(position) {
  return position === "atPriceTop" || position === "atPriceBottom" || position === "atPriceMiddle";
}
function getPrice(seriesData, marker, isInverted) {
  if (isPriceMarker(marker.position) && marker.price !== void 0) {
    return marker.price;
  }
  if (isValueData(seriesData)) {
    return seriesData.value;
  }
  if (isOhlcData(seriesData)) {
    if (marker.position === "inBar") {
      return seriesData.close;
    }
    if (marker.position === "aboveBar") {
      if (!isInverted) {
        return seriesData.high;
      }
      return seriesData.low;
    }
    if (marker.position === "belowBar") {
      if (!isInverted) {
        return seriesData.low;
      }
      return seriesData.high;
    }
  }
  return;
}
function fillSizeAndY(rendererItem, marker, seriesData, offsets, textHeight, shapeMargin2, series, chart) {
  const price = getPrice(seriesData, marker, series.priceScale().options().invertScale);
  if (price === void 0) {
    return;
  }
  const ignoreOffset = isPriceMarker(marker.position);
  const timeScale = chart.timeScale();
  const sizeMultiplier = isNumber(marker.size) ? Math.max(marker.size, 0) : 1;
  const shapeSize2 = calculateShapeHeight(timeScale.options().barSpacing) * sizeMultiplier;
  const halfSize = shapeSize2 / 2;
  rendererItem._internal_size = shapeSize2;
  const position = marker.position;
  switch (position) {
    case "inBar":
    case "atPriceMiddle": {
      rendererItem._internal_y = ensureNotNull(series.priceToCoordinate(price));
      if (rendererItem._internal_text !== void 0) {
        rendererItem._internal_text._internal_y = rendererItem._internal_y + halfSize + shapeMargin2 + textHeight * (0.5 + 0.1);
      }
      return;
    }
    case "aboveBar":
    case "atPriceTop": {
      const offset = ignoreOffset ? 0 : offsets._internal_aboveBar;
      rendererItem._internal_y = ensureNotNull(series.priceToCoordinate(price)) - halfSize - offset;
      if (rendererItem._internal_text !== void 0) {
        rendererItem._internal_text._internal_y = rendererItem._internal_y - halfSize - textHeight * (0.5 + 0.1);
        offsets._internal_aboveBar += textHeight * (1 + 2 * 0.1);
      }
      if (!ignoreOffset) {
        offsets._internal_aboveBar += shapeSize2 + shapeMargin2;
      }
      return;
    }
    case "belowBar":
    case "atPriceBottom": {
      const offset = ignoreOffset ? 0 : offsets._internal_belowBar;
      rendererItem._internal_y = ensureNotNull(series.priceToCoordinate(price)) + halfSize + offset;
      if (rendererItem._internal_text !== void 0) {
        rendererItem._internal_text._internal_y = rendererItem._internal_y + halfSize + shapeMargin2 + textHeight * (0.5 + 0.1);
        offsets._internal_belowBar += textHeight * (1 + 2 * 0.1);
      }
      if (!ignoreOffset) {
        offsets._internal_belowBar += shapeSize2 + shapeMargin2;
      }
      return;
    }
  }
}
function isValueData(data) {
  return "value" in data && typeof data.value === "number";
}
function isOhlcData(data) {
  return "open" in data && "high" in data && "low" in data && "close" in data;
}
var SeriesMarkersPaneView = class {
  constructor(series, chart, options) {
    this._private__markers = [];
    this._private__invalidated = true;
    this._private__dataInvalidated = true;
    this._private__renderer = new SeriesMarkersRenderer();
    this._private__series = series;
    this._private__chart = chart;
    this._private__data = {
      _internal_items: [],
      _internal_visibleRange: null
    };
    this._private__options = options;
  }
  renderer() {
    if (!this._private__series.options().visible) {
      return null;
    }
    if (this._private__invalidated) {
      this._internal__makeValid();
    }
    const layout = this._private__chart.options()["layout"];
    this._private__renderer._internal_setParams(layout.fontSize, layout.fontFamily, this._private__options.zOrder);
    this._private__renderer._internal_setData(this._private__data);
    return this._private__renderer;
  }
  _internal_setMarkers(markers) {
    this._private__markers = markers;
    this._internal_update("data");
  }
  _internal_update(updateType) {
    this._private__invalidated = true;
    if (updateType === "data") {
      this._private__dataInvalidated = true;
    }
  }
  _internal_updateOptions(options) {
    this._private__invalidated = true;
    this._private__options = options;
  }
  zOrder() {
    return this._private__options.zOrder === "aboveSeries" ? "top" : this._private__options.zOrder;
  }
  _internal__makeValid() {
    const timeScale = this._private__chart.timeScale();
    const seriesMarkers = this._private__markers;
    if (this._private__dataInvalidated) {
      this._private__data._internal_items = seriesMarkers.map((marker) => ({
        _internal_time: marker.time,
        _internal_x: 0,
        _internal_y: 0,
        _internal_size: 0,
        _internal_shape: marker.shape,
        _internal_color: marker.color,
        _internal_externalId: marker.id,
        _internal_internalId: marker._internal_internalId,
        _internal_text: void 0
      }));
      this._private__dataInvalidated = false;
    }
    const layoutOptions = this._private__chart.options()["layout"];
    this._private__data._internal_visibleRange = null;
    const visibleBars = timeScale.getVisibleLogicalRange();
    if (visibleBars === null) {
      return;
    }
    const visibleBarsRange = new RangeImpl(Math.floor(visibleBars.from), Math.ceil(visibleBars.to));
    const firstValue = this._private__series.dataByIndex(
      0,
      1
      /* MismatchDirection.NearestRight */
    );
    if (firstValue === null) {
      return;
    }
    if (this._private__data._internal_items.length === 0) {
      return;
    }
    let prevTimeIndex = NaN;
    const shapeMargin$1 = shapeMargin(timeScale.options().barSpacing);
    const offsets = {
      _internal_aboveBar: shapeMargin$1,
      _internal_belowBar: shapeMargin$1
    };
    this._private__data._internal_visibleRange = visibleTimedValues(this._private__data._internal_items, visibleBarsRange, true);
    for (let index = this._private__data._internal_visibleRange.from; index < this._private__data._internal_visibleRange.to; index++) {
      const marker = seriesMarkers[index];
      if (marker.time !== prevTimeIndex) {
        offsets._internal_aboveBar = shapeMargin$1;
        offsets._internal_belowBar = shapeMargin$1;
        prevTimeIndex = marker.time;
      }
      const rendererItem = this._private__data._internal_items[index];
      rendererItem._internal_x = ensureNotNull(timeScale.logicalToCoordinate(marker.time));
      if (marker.text !== void 0 && marker.text.length > 0) {
        rendererItem._internal_text = {
          _internal_content: marker.text,
          _internal_x: 0,
          _internal_y: 0,
          _internal_width: 0,
          _internal_height: 0
        };
      }
      const dataAt = this._private__series.dataByIndex(
        marker.time,
        0
        /* MismatchDirection.None */
      );
      if (dataAt === null) {
        continue;
      }
      fillSizeAndY(rendererItem, marker, dataAt, offsets, layoutOptions.fontSize, shapeMargin$1, this._private__series, this._private__chart);
    }
    this._private__invalidated = false;
  }
};
function mergeOptionsWithDefaults(options) {
  return {
    ...seriesMarkerOptionsDefaults,
    ...options
  };
}
var SeriesMarkersPrimitive = class {
  constructor(options) {
    this._private__paneView = null;
    this._private__markers = [];
    this._private__indexedMarkers = [];
    this._private__dataChangedHandler = null;
    this._private__series = null;
    this._private__chart = null;
    this._private__autoScaleMarginsInvalidated = true;
    this._private__autoScaleMargins = null;
    this._private__markersPositions = null;
    this._private__cachedBarSpacing = null;
    this._private__recalculationRequired = true;
    this._private__options = mergeOptionsWithDefaults(options);
  }
  attached(param) {
    this._private__recalculateMarkers();
    this._private__chart = param.chart;
    this._private__series = param.series;
    this._private__paneView = new SeriesMarkersPaneView(this._private__series, ensureNotNull(this._private__chart), this._private__options);
    this._private__requestUpdate = param.requestUpdate;
    this._private__series.subscribeDataChanged((scope) => this._private__onDataChanged(scope));
    this._private__recalculationRequired = true;
    this._internal_requestUpdate();
  }
  _internal_requestUpdate() {
    if (this._private__requestUpdate) {
      this._private__requestUpdate();
    }
  }
  detached() {
    if (this._private__series && this._private__dataChangedHandler) {
      this._private__series.unsubscribeDataChanged(this._private__dataChangedHandler);
    }
    this._private__chart = null;
    this._private__series = null;
    this._private__paneView = null;
    this._private__dataChangedHandler = null;
  }
  _internal_setMarkers(markers) {
    this._private__recalculationRequired = true;
    this._private__markers = markers;
    this._private__recalculateMarkers();
    this._private__autoScaleMarginsInvalidated = true;
    this._private__markersPositions = null;
    this._internal_requestUpdate();
  }
  _internal_markers() {
    return this._private__markers;
  }
  paneViews() {
    return this._private__paneView ? [this._private__paneView] : [];
  }
  updateAllViews() {
    this._private__updateAllViews();
  }
  hitTest(x, y) {
    if (this._private__paneView) {
      return this._private__paneView.renderer()?._internal_hitTest(x, y) ?? null;
    }
    return null;
  }
  autoscaleInfo(startTimePoint, endTimePoint) {
    if (this._private__options.autoScale && this._private__paneView) {
      const margins = this._private__getAutoScaleMargins();
      if (margins) {
        return {
          priceRange: null,
          margins
        };
      }
    }
    return null;
  }
  _internal_applyOptions(options) {
    this._private__options = mergeOptionsWithDefaults({ ...this._private__options, ...options });
    if (this._internal_requestUpdate) {
      this._internal_requestUpdate();
    }
  }
  _private__getAutoScaleMargins() {
    const chart = ensureNotNull(this._private__chart);
    const barSpacing = chart.timeScale().options().barSpacing;
    if (this._private__autoScaleMarginsInvalidated || barSpacing !== this._private__cachedBarSpacing) {
      this._private__cachedBarSpacing = barSpacing;
      if (this._private__markers.length > 0) {
        const shapeMargin$1 = shapeMargin(barSpacing);
        const marginValue = calculateShapeHeight(barSpacing) * 1.5 + shapeMargin$1 * 2;
        const positions = this._private__getMarkerPositions();
        this._private__autoScaleMargins = {
          above: calculateAdjustedMargin(marginValue, positions.aboveBar, positions.inBar),
          below: calculateAdjustedMargin(marginValue, positions.belowBar, positions.inBar)
        };
      } else {
        this._private__autoScaleMargins = null;
      }
      this._private__autoScaleMarginsInvalidated = false;
    }
    return this._private__autoScaleMargins;
  }
  _private__getMarkerPositions() {
    if (this._private__markersPositions === null) {
      this._private__markersPositions = this._private__markers.reduce((acc, marker) => {
        if (!acc[marker.position]) {
          acc[marker.position] = true;
        }
        return acc;
      }, {
        inBar: false,
        aboveBar: false,
        belowBar: false,
        atPriceTop: false,
        atPriceBottom: false,
        atPriceMiddle: false
      });
    }
    return this._private__markersPositions;
  }
  _private__recalculateMarkers() {
    if (!this._private__recalculationRequired || !this._private__chart || !this._private__series) {
      return;
    }
    const timeScale = this._private__chart.timeScale();
    const seriesData = this._private__series?.data();
    if (timeScale.getVisibleLogicalRange() == null || !this._private__series || seriesData.length === 0) {
      this._private__indexedMarkers = [];
      return;
    }
    const firstDataIndex = timeScale.timeToIndex(ensureNotNull(seriesData[0].time), true);
    this._private__indexedMarkers = this._private__markers.map((marker, index) => {
      const timePointIndex = timeScale.timeToIndex(marker.time, true);
      const searchMode = timePointIndex < firstDataIndex ? 1 : -1;
      const seriesDataByIndex = ensureNotNull(this._private__series).dataByIndex(timePointIndex, searchMode);
      const finalIndex = timeScale.timeToIndex(ensureNotNull(seriesDataByIndex).time, false);
      const baseMarker = {
        time: finalIndex,
        position: marker.position,
        shape: marker.shape,
        color: marker.color,
        id: marker.id,
        _internal_internalId: index,
        text: marker.text,
        size: marker.size,
        price: marker.price,
        _internal_originalTime: marker.time
      };
      if (marker.position === "atPriceTop" || marker.position === "atPriceBottom" || marker.position === "atPriceMiddle") {
        if (marker.price === void 0) {
          throw new Error(`Price is required for position ${marker.position}`);
        }
        return {
          ...baseMarker,
          position: marker.position,
          // TypeScript knows this is SeriesMarkerPricePosition
          price: marker.price
        };
      } else {
        return {
          ...baseMarker,
          position: marker.position,
          // TypeScript knows this is SeriesMarkerBarPosition
          price: marker.price
          // Optional for bar positions
        };
      }
    });
    this._private__recalculationRequired = false;
  }
  _private__updateAllViews(updateType) {
    if (this._private__paneView) {
      this._private__recalculateMarkers();
      this._private__paneView._internal_setMarkers(this._private__indexedMarkers);
      this._private__paneView._internal_updateOptions(this._private__options);
      this._private__paneView._internal_update(updateType);
    }
  }
  _private__onDataChanged(scope) {
    this._private__recalculationRequired = true;
    this._internal_requestUpdate();
  }
};
var SeriesMarkersPrimitiveWrapper = class extends SeriesPrimitiveAdapter {
  constructor(series, primitive, markers) {
    super(series, primitive);
    if (markers) {
      this.setMarkers(markers);
    }
  }
  setMarkers(markers) {
    this._internal__primitive._internal_setMarkers(markers);
  }
  markers() {
    return this._internal__primitive._internal_markers();
  }
};
function createSeriesMarkers(series, markers, options) {
  const wrapper = new SeriesMarkersPrimitiveWrapper(series, new SeriesMarkersPrimitive(options ?? {}));
  if (markers) {
    wrapper.setMarkers(markers);
  }
  return wrapper;
}
var customSeriesDefaultOptions = {
  ...seriesOptionsDefaults,
  ...customStyleDefaults$1
};

// src/client/components/candle-chart.tsx
var CHART_HEIGHT = 410;
var OLDER_THRESHOLD_BARS = 30;
var FALLBACK_UP = "#3b9c6d";
var FALLBACK_DOWN = "#e24b4a";
var FALLBACK_TEXT = "#888780";
var FALLBACK_BORDER = "rgba(128,128,128,.25)";
function cssVar(el, name, fallback) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}
function chartData(points2) {
  return points2.map((point) => ({ time: point.time, value: point.value }));
}
function CandleChart({ candles, marks, indicators, expanded, resetToken, drawMode, onDraw, onSelect, priceScale, visibleRange, onVisibleRange, tradeEvents, onNeedOlder, olderState }) {
  const boxRef = React6.useRef(null);
  const refs = React6.useRef(null);
  const priceLines = React6.useRef([]);
  const trendSeries = React6.useRef([]);
  const tradeMarkers = React6.useRef(null);
  const fitted = React6.useRef(false);
  const firstBarTime = React6.useRef(null);
  const restoring = React6.useRef(false);
  const initialRange = React6.useRef(visibleRange);
  const drawModeRef = React6.useRef(drawMode);
  const onDrawRef = React6.useRef(onDraw);
  const onSelectRef = React6.useRef(onSelect);
  const selectionData = React6.useRef({ candles, indicators });
  const onRangeRef = React6.useRef(onVisibleRange);
  const onNeedOlderRef = React6.useRef(onNeedOlder);
  onNeedOlderRef.current = onNeedOlder;
  const firstPoint = React6.useRef(null);
  const hoveredHit = React6.useRef(null);
  drawModeRef.current = drawMode;
  onDrawRef.current = onDraw;
  onSelectRef.current = onSelect;
  selectionData.current = { candles, indicators };
  onRangeRef.current = onVisibleRange;
  const [crosshair, setCrosshair] = React6.useState(null);
  const [selectedTime, setSelectedTime] = React6.useState(null);
  const [themeVersion, setThemeVersion] = React6.useState(0);
  const showVolume = indicators.has("volume");
  const studies = React6.useMemo(() => chartIndicators(candles), [candles]);
  React6.useEffect(() => {
    const box = boxRef.current;
    if (!box) return void 0;
    const readTheme = () => ({
      up: cssVar(box, "--dsw-alias-state-success-primary", FALLBACK_UP),
      down: cssVar(box, "--dsw-alias-state-error-primary", FALLBACK_DOWN),
      text: cssVar(box, "--dsw-alias-label-secondary", FALLBACK_TEXT),
      border: cssVar(box, "--dsw-alias-border-l1", FALLBACK_BORDER)
    });
    const theme = readTheme();
    const chart = createChart(box, {
      width: box.clientWidth || 720,
      height: CHART_HEIGHT,
      autoSize: true,
      layout: { background: { color: "transparent" }, textColor: theme.text, fontFamily: "inherit" },
      grid: { vertLines: { color: theme.border }, horzLines: { color: theme.border } },
      rightPriceScale: { borderColor: theme.border },
      timeScale: { borderColor: theme.border, timeVisible: true, secondsVisible: false }
    });
    const candleSeries = chart.addSeries(candlestickSeries, {
      upColor: theme.up,
      downColor: theme.down,
      borderUpColor: theme.up,
      borderDownColor: theme.down,
      wickUpColor: theme.up,
      wickDownColor: theme.down
    });
    const volumeSeries = chart.addSeries(histogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "dhl-vol",
      lastValueVisible: false,
      priceLineVisible: false
    });
    const smaSeries = chart.addSeries(lineSeries, {
      color: cssVar(box, "--dsw-alias-brand-primary", "#54cbbb"),
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false
    });
    const sma60 = chart.addSeries(lineSeries, { color: "#d78c78", lineWidth: 2, lastValueVisible: false, priceLineVisible: false });
    const ema20 = chart.addSeries(lineSeries, { color: "#e2a943", lineWidth: 2, lastValueVisible: false, priceLineVisible: false });
    const ema50 = chart.addSeries(lineSeries, { color: "#9b86db", lineWidth: 2, lastValueVisible: false, priceLineVisible: false });
    const upper = chart.addSeries(lineSeries, { color: "#7aa4d4", lineWidth: 1, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false });
    const lower = chart.addSeries(lineSeries, { color: "#7aa4d4", lineWidth: 1, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false });
    chart.priceScale("dhl-vol").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
    refs.current = { chart, candles: candleSeries, volume: volumeSeries, sma: smaSeries, sma60, ema20, ema50, upper, lower };
    tradeMarkers.current = createSeriesMarkers(candleSeries, []);
    fitted.current = false;
    const identifyHit = (hovered) => {
      const r = refs.current;
      if (!r || !hovered) return null;
      if (hovered === r.volume) return "volume";
      if (hovered === r.sma) return "sma20";
      if (hovered === r.sma60) return "sma60";
      if (hovered === r.ema20) return "ema20";
      if (hovered === r.ema50) return "ema50";
      if (hovered === r.upper) return "bollingerUpper";
      if (hovered === r.lower) return "bollingerLower";
      if (hovered === r.rsi) return "rsi14";
      if (hovered === r.macd) return "macd";
      if (hovered === r.signal) return "macdSignal";
      if (hovered === r.histogram) return "macdHistogram";
      return null;
    };
    chart.subscribeCrosshairMove((param) => {
      hoveredHit.current = identifyHit(param.hoveredSeries);
      const point = param.seriesData.get(candleSeries);
      if (point?.open != null && point.high != null && point.low != null && point.close != null) {
        setCrosshair({ t: Number(param.time ?? 0) * 1e3, o: point.open, h: point.high, l: point.low, c: point.close, v: 0 });
      } else setCrosshair(null);
    });
    chart.subscribeClick((param) => {
      const mode = drawModeRef.current;
      if (!param.point || param.time == null) return;
      if (!mode) return;
      const price = candleSeries.coordinateToPrice(param.point.y);
      const time = Number(param.time) * 1e3;
      if (price == null || !Number.isFinite(Number(price)) || Number(price) <= 0 || !Number.isFinite(time)) return;
      if (mode === "level") onDrawRef.current({ kind: "level", price: Number(price) });
      else if (!firstPoint.current) firstPoint.current = { time, price: Number(price) };
      else {
        const a = firstPoint.current;
        firstPoint.current = null;
        if (a.time === time) return;
        const [from, to] = a.time < time ? [a, { time, price: Number(price) }] : [{ time, price: Number(price) }, a];
        onDrawRef.current({ kind: "trend", fromTime: from.time, fromPrice: from.price, toTime: to.time, toPrice: to.price });
      }
    });
    const quoteClick = (event) => {
      if (drawModeRef.current || !(event.target instanceof HTMLCanvasElement)) return;
      const x = event.clientX - box.getBoundingClientRect().left;
      const time = chart.timeScale().coordinateToTime(x);
      if (typeof time !== "number") return;
      const selection = selectChartCandle(selectionData.current.candles, time * 1e3, selectionData.current.indicators, hoveredHit.current);
      if (selection) {
        setSelectedTime(selection.candle.t);
        onSelectRef.current(selection);
      }
    };
    box.addEventListener("click", quoteClick);
    let rangeTimer = null;
    chart.timeScale().subscribeVisibleTimeRangeChange((range) => {
      if (!fitted.current || restoring.current || !range || typeof range.from !== "number" || typeof range.to !== "number") return;
      if (rangeTimer) clearTimeout(rangeTimer);
      rangeTimer = setTimeout(() => onRangeRef.current({ from: Number(range.from), to: Number(range.to) }), 650);
    });
    chart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
      if (!fitted.current || restoring.current || !range) return;
      if (range.from < OLDER_THRESHOLD_BARS) onNeedOlderRef.current();
    });
    const applyTheme = () => {
      const th = readTheme();
      candleSeries.applyOptions({
        upColor: th.up,
        downColor: th.down,
        borderUpColor: th.up,
        borderDownColor: th.down,
        wickUpColor: th.up,
        wickDownColor: th.down
      });
      chart.applyOptions({
        layout: { textColor: th.text },
        grid: { vertLines: { color: th.border }, horzLines: { color: th.border } },
        rightPriceScale: { borderColor: th.border },
        timeScale: { borderColor: th.border }
      });
      smaSeries.applyOptions({ color: cssVar(box, "--dsw-alias-brand-primary", "#54cbbb") });
      setThemeVersion((value) => value + 1);
    };
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    return () => {
      observer.disconnect();
      box.removeEventListener("click", quoteClick);
      if (rangeTimer) clearTimeout(rangeTimer);
      refs.current = null;
      priceLines.current = [];
      trendSeries.current = [];
      chart.remove();
      tradeMarkers.current = null;
    };
  }, []);
  React6.useEffect(() => {
    const markers = tradeEvents.map((event) => ({
      time: Math.floor(event.candleTime / 1e3),
      position: event.isBuy ? "belowBar" : "aboveBar",
      color: event.kind === "order" ? "#dda64d" : event.isBuy ? FALLBACK_UP : FALLBACK_DOWN,
      shape: event.kind === "order" ? "circle" : event.isBuy ? "arrowUp" : "arrowDown",
      text: event.kind === "order" ? tr("\u59D4\u6258", "Order") : tr("\u6210\u4EA4", "Fill")
    }));
    if (selectedTime != null && candles.some((candle) => candle.t === selectedTime)) markers.push({
      time: Math.floor(selectedTime / 1e3),
      position: "inBar",
      color: "#e2a943",
      shape: "circle",
      text: tr("\u5F15\u7528", "Quote")
    });
    markers.sort((a, b) => Number(a.time) - Number(b.time));
    tradeMarkers.current?.setMarkers(markers);
  }, [tradeEvents, selectedTime, candles]);
  React6.useEffect(() => {
    const r = refs.current;
    if (!r) return;
    const rows = candles;
    if (rows.length < 2) return;
    const seen = /* @__PURE__ */ new Set();
    const bars = [];
    const vols = [];
    for (const c of rows) {
      const time = Math.floor(c.t / 1e3);
      if (seen.has(time)) continue;
      seen.add(time);
      const up = c.c >= c.o;
      bars.push({ time, open: c.o, high: c.h, low: c.l, close: c.c });
      vols.push({ time, value: c.v, color: up ? FALLBACK_UP : FALLBACK_DOWN });
    }
    if (bars.length < 2) return;
    const th = { up: FALLBACK_UP, down: FALLBACK_DOWN };
    const box = boxRef.current;
    if (box) {
      th.up = cssVar(box, "--dsw-alias-state-success-primary", FALLBACK_UP);
      th.down = cssVar(box, "--dsw-alias-state-error-primary", FALLBACK_DOWN);
    }
    const viewBefore = fitted.current ? r.chart.timeScale().getVisibleLogicalRange() : null;
    const prevFirst = firstBarTime.current;
    const prepended = prevFirst != null && bars[0].time < prevFirst ? Math.max(0, bars.findIndex((bar) => bar.time >= prevFirst)) : 0;
    firstBarTime.current = bars[0].time;
    r.candles.setData(bars);
    r.volume.setData(vols.map((v) => ({ ...v, color: v.color === FALLBACK_UP ? th.up : th.down })));
    r.sma.setData(chartData(studies.sma20));
    r.sma60.setData(chartData(studies.sma60));
    r.ema20.setData(chartData(studies.ema20));
    r.ema50.setData(chartData(studies.ema50));
    r.upper.setData(chartData(studies.upper));
    r.lower.setData(chartData(studies.lower));
    r.volume.applyOptions({ visible: showVolume });
    r.sma.applyOptions({ visible: indicators.has("sma20") });
    r.sma60.applyOptions({ visible: indicators.has("sma60") });
    r.ema20.applyOptions({ visible: indicators.has("ema20") });
    r.ema50.applyOptions({ visible: indicators.has("ema50") });
    r.upper.applyOptions({ visible: indicators.has("bollinger20") });
    r.lower.applyOptions({ visible: indicators.has("bollinger20") });
    if (indicators.has("rsi14")) {
      if (!r.rsi) {
        const pane = r.chart.addPane();
        pane.setStretchFactor(0.28);
        r.rsi = pane.addSeries(lineSeries, { color: "#a788df", lineWidth: 2, priceLineVisible: false, lastValueVisible: true });
        for (const price of [30, 70]) r.rsi.createPriceLine({ price, color: "#8d8d8d", lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: false });
      }
      r.rsi.setData(chartData(studies.rsi14));
    } else if (r.rsi) {
      r.chart.removeSeries(r.rsi);
      r.rsi = void 0;
    }
    if (indicators.has("macd")) {
      if (!r.macd) {
        const pane = r.chart.addPane();
        pane.setStretchFactor(0.28);
        r.histogram = pane.addSeries(histogramSeries, { priceLineVisible: false, lastValueVisible: false });
        r.macd = pane.addSeries(lineSeries, { color: "#55a6ce", lineWidth: 2, priceLineVisible: false, lastValueVisible: false });
        r.signal = pane.addSeries(lineSeries, { color: "#e2a943", lineWidth: 2, priceLineVisible: false, lastValueVisible: false });
      }
      r.macd.setData(chartData(studies.macd));
      r.signal.setData(chartData(studies.signal));
      r.histogram.setData(studies.histogram.map((point) => ({ time: point.time, value: point.value, color: point.value >= 0 ? th.up : th.down })));
    } else if (r.macd) {
      r.chart.removeSeries(r.macd);
      r.chart.removeSeries(r.signal);
      r.chart.removeSeries(r.histogram);
      r.macd = void 0;
      r.signal = void 0;
      r.histogram = void 0;
    }
    if (viewBefore && prepended > 0) {
      restoring.current = true;
      r.chart.timeScale().setVisibleLogicalRange({ from: viewBefore.from + prepended, to: viewBefore.to + prepended });
      setTimeout(() => {
        restoring.current = false;
      }, 100);
    }
    if (!fitted.current) {
      restoring.current = true;
      r.chart.timeScale().fitContent();
      const saved = initialRange.current;
      if (saved && saved.from < saved.to) {
        try {
          r.chart.timeScale().setVisibleRange({ from: saved.from, to: saved.to });
        } catch {
        }
      }
      fitted.current = true;
      setTimeout(() => {
        restoring.current = false;
      }, 100);
    }
  }, [candles, studies, indicators, showVolume]);
  React6.useEffect(() => {
    refs.current?.chart.priceScale("right").applyOptions({ mode: priceScale === "log" ? PriceScaleMode.Logarithmic : priceScale === "percentage" ? PriceScaleMode.Percentage : PriceScaleMode.Normal });
  }, [priceScale]);
  React6.useEffect(() => {
    firstPoint.current = null;
  }, [drawMode]);
  React6.useEffect(() => {
    if (resetToken > 0) refs.current?.chart.timeScale().fitContent();
  }, [resetToken]);
  React6.useEffect(() => {
    const r = refs.current;
    const box = boxRef.current;
    if (!r || !box) return;
    for (const line of priceLines.current) r.candles.removePriceLine(line);
    for (const series of trendSeries.current) r.chart.removeSeries(series);
    priceLines.current = [];
    trendSeries.current = [];
    const colorOf = (role) => role === "support" ? cssVar(box, "--dsw-alias-state-success-primary", FALLBACK_UP) : role === "resistance" ? cssVar(box, "--dsw-alias-state-error-primary", FALLBACK_DOWN) : cssVar(box, "--dsw-alias-brand-primary", "#54cbbb");
    for (const mark of marks) {
      const color = colorOf(mark.role);
      if (mark.kind === "level" && Number.isFinite(mark.price) && Number(mark.price) > 0) {
        priceLines.current.push(r.candles.createPriceLine({ price: Number(mark.price), color, lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: mark.label }));
      }
      if (mark.kind === "trend" && Number.isFinite(mark.fromTime) && Number.isFinite(mark.toTime) && Number.isFinite(mark.fromPrice) && Number.isFinite(mark.toPrice)) {
        const series = r.chart.addSeries(lineSeries, { color, lineWidth: 2, lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false });
        series.setData([
          { time: Math.floor(Number(mark.fromTime) / 1e3), value: Number(mark.fromPrice) },
          { time: Math.floor(Number(mark.toTime) / 1e3), value: Number(mark.toPrice) }
        ]);
        trendSeries.current.push(series);
      }
    }
  }, [marks, themeVersion]);
  const warming = candles.length < 2;
  return /* @__PURE__ */ React6.createElement("div", { className: "dhl-chartbox", ref: boxRef, style: { height: expanded ? "calc(100dvh - 160px)" : CHART_HEIGHT + Number(indicators.has("rsi14")) * 125 + Number(indicators.has("macd")) * 125 } }, !warming && /* @__PURE__ */ React6.createElement("div", { className: "dhl-chart-ohlc", "aria-live": "off" }, /* @__PURE__ */ React6.createElement("span", null, crosshair ? new Date(crosshair.t).toLocaleString(tr("zh-CN", "en-US"), { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }) : tr("\u6700\u65B0 K \u7EBF", "Latest candle")), ["o", "h", "l", "c"].map((key) => /* @__PURE__ */ React6.createElement("span", { key }, key.toUpperCase(), " ", /* @__PURE__ */ React6.createElement("b", { className: crosshair && crosshair.c < crosshair.o ? "dhl-down" : "dhl-up" }, fmtPrice((crosshair ?? candles.at(-1))?.[key]))))), !warming && olderState === "loading" ? /* @__PURE__ */ React6.createElement("div", { className: "dhl-chart-older", role: "status" }, tr("\u6B63\u5728\u52A0\u8F7D\u66F4\u65E9\u7684 K \u7EBF\u2026", "Loading earlier candles\u2026")) : null, !warming && olderState === "error" ? /* @__PURE__ */ React6.createElement("div", { className: "dhl-chart-older", role: "status" }, tr("\u66F4\u65E9\u7684 K \u7EBF\u52A0\u8F7D\u5931\u8D25\uFF0C\u7EE7\u7EED\u5411\u5DE6\u62D6\u52A8\u53EF\u91CD\u8BD5", "Could not load earlier candles; drag left again to retry")) : null, marks.length > 0 ? /* @__PURE__ */ React6.createElement("div", { className: "dhl-chart-annotations", "aria-label": tr("\u4F1A\u8BDD\u56FE\u8868\u6807\u6CE8", "Session chart annotations") }, marks.slice(-4).map((mark) => /* @__PURE__ */ React6.createElement("span", { key: mark.id, className: `role-${mark.role}`, title: `${mark.label} \xB7 ${mark.kind === "level" ? fmtPrice(mark.price) : tr("\u8D8B\u52BF\u7EBF", "Trend line")}` }, mark.label)), marks.length > 4 ? /* @__PURE__ */ React6.createElement("span", null, "+", marks.length - 4) : null) : null, crosshair && tradeEvents.some((event) => event.candleTime === crosshair.t) ? /* @__PURE__ */ React6.createElement("div", { className: "dhl-chart-trade-detail", "aria-live": "off" }, tradeEvents.filter((event) => event.candleTime === crosshair.t).slice(0, 4).map((event) => /* @__PURE__ */ React6.createElement("div", { key: event.id }, /* @__PURE__ */ React6.createElement("strong", null, event.kind === "order" ? tr("\u59D4\u6258", "Order") : tr("\u6210\u4EA4", "Fill"), " \xB7 ", event.isBuy ? tr("\u4E70\u5165", "Buy") : tr("\u5356\u51FA", "Sell")), /* @__PURE__ */ React6.createElement("span", null, Number.isFinite(event.sz) ? event.sz : "\u2014", " @ ", fmtPrice(event.px), " \xB7 ", new Date(event.time).toLocaleString()), event.reason ? /* @__PURE__ */ React6.createElement("span", { title: event.reason }, tr("\u539F\u56E0", "Reason"), "\uFF1A", event.reason) : null))) : null, indicators.has("rsi14") || indicators.has("macd") ? /* @__PURE__ */ React6.createElement("div", { className: "dhl-chart-study-legend", "aria-label": tr("\u526F\u56FE\u6307\u6807\u6570\u503C", "Study values") }, indicators.has("rsi14") ? /* @__PURE__ */ React6.createElement("span", null, "RSI 14 ", /* @__PURE__ */ React6.createElement("b", null, studies.rsi14.at(-1)?.value.toFixed(1) ?? "\u2014")) : null, indicators.has("macd") ? /* @__PURE__ */ React6.createElement("span", null, "MACD ", /* @__PURE__ */ React6.createElement("b", null, studies.macd.at(-1)?.value.toFixed(4) ?? "\u2014"), " / ", studies.signal.at(-1)?.value.toFixed(4) ?? "\u2014") : null) : null, warming ? /* @__PURE__ */ React6.createElement("div", { className: "dhl-empty", style: { height: CHART_HEIGHT } }, t("chart.loading", "K \u7EBF\u52A0\u8F7D\u4E2D\u2026")) : null);
}

// src/client/components/market-tape.tsx
var React9 = __toESM(require("react"), 1);

// src/client/components/book-card.tsx
var React7 = __toESM(require("react"), 1);
var GROUPINGS = [
  ["full", null],
  ["5", 1],
  ["5x2", 2],
  ["5x5", 5],
  ["4", 10],
  ["3", 100],
  ["2", 1e3]
];
function exchangePrice(value) {
  const match = value.match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) return fmtPrice(value);
  return Number(match[1]).toLocaleString("en-US") + (match[2] ? `.${match[2]}` : "");
}
function stepLabel(value) {
  if (value < 1e-12) return value.toExponential(0);
  return Number(value.toPrecision(2)).toLocaleString("en-US", { maximumFractionDigits: 12 });
}
function BookCard({ snapshot }) {
  const s = useStore();
  const coin = s.activeCoin;
  const grouping = s.bookGrouping;
  const rawBook = snapshot?.coin === coin ? snapshot.book : null;
  const rawBid = Number(rawBook?.levels?.[0]?.[0]?.px);
  const rawAsk = Number(rawBook?.levels?.[1]?.[0]?.px);
  const reference = rawBid > 0 && rawAsk > 0 ? (rawBid + rawAsk) / 2 : rawBid || rawAsk || 1;
  const baseStep = 10 ** (Math.floor(Math.log10(reference)) - 4);
  const selectedBook = grouping === "full" ? rawBook : snapshot?.coin === coin && snapshot?.bookGrouping === grouping && Date.now() - Number(snapshot?.observedAt?.groupedBook) < 1e4 ? snapshot.groupedBook : null;
  const levels = (side) => {
    const entries = selectedBook?.levels?.[side] ?? [];
    let total = 0;
    return entries.slice(0, 10).flatMap((entry) => {
      const px = Number(entry.px);
      const sz = Number(entry.sz);
      if (!(px > 0 && sz > 0 && Number.isFinite(px) && Number.isFinite(sz))) return [];
      total += sz;
      return [{ px: String(entry.px), sz, total }];
    });
  };
  const bids = levels(0);
  const asks = levels(1);
  const maxTotal = Math.max(1, ...bids.map((l) => l.total), ...asks.map((l) => l.total));
  const mid = Number(snapshot?.mids?.mids?.[coin] ?? snapshot?.mids?.[coin]) || reference;
  const spread = rawAsk > 0 && rawBid > 0 ? rawAsk - rawBid : null;
  const chooseGrouping = (next) => {
    if (next === grouping) return;
    store.patch({ bookGrouping: next });
    saveSessionWorkspace({ bookGrouping: next });
    void loadSnapshot();
  };
  const row = (level, side) => /* @__PURE__ */ React7.createElement("div", { className: "dhl-lvl", key: `${side}:${level.px}` }, /* @__PURE__ */ React7.createElement("div", { className: "bar " + side, style: { width: `${level.total / maxTotal * 100}%` } }), /* @__PURE__ */ React7.createElement(
    "button",
    {
      type: "button",
      className: "px",
      style: { color: side === "bid" ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-state-error-primary)" },
      title: t("book.clickHint", "\u586B\u5165\u53F3\u4FA7\u9650\u4EF7\u5355\u7968\u636E"),
      onClick: () => store.patch({ ticketDraft: { coin, isBuy: side === "bid", px: level.px, at: Date.now() } })
    },
    exchangePrice(level.px)
  ), /* @__PURE__ */ React7.createElement("span", null, fmt(level.sz, 4)), /* @__PURE__ */ React7.createElement("span", { style: { color: "var(--dsw-alias-label-secondary)" } }, fmt(level.total, 3)));
  return /* @__PURE__ */ React7.createElement("div", { className: "dhl-card" }, /* @__PURE__ */ React7.createElement("h4", null, t("book.title", "\u76D8\u53E3")), /* @__PURE__ */ React7.createElement("div", { className: "dhl-book-options" }, /* @__PURE__ */ React7.createElement("label", null, tr("\u4EF7\u683C\u6863\u4F4D", "Price grouping"), " ", /* @__PURE__ */ React7.createElement("select", { "aria-label": tr("\u76D8\u53E3\u4EF7\u683C\u6863\u4F4D", "Order book price grouping"), value: grouping, onChange: (event) => chooseGrouping(event.target.value) }, GROUPINGS.map(([key, factor]) => /* @__PURE__ */ React7.createElement("option", { key, value: key }, factor == null ? tr("\u539F\u59CB", "Full") : stepLabel(baseStep * factor))))), /* @__PURE__ */ React7.createElement("span", null, coin)), asks.length === 0 && bids.length === 0 ? /* @__PURE__ */ React7.createElement("div", { className: "dhl-book-wait" }, grouping === "full" ? t("book.waiting", "\u7B49\u5F85\u4E0A\u6E38\u884C\u60C5\u2026") : tr("\u6B63\u5728\u8BFB\u53D6\u4EA4\u6613\u6240\u805A\u5408\u76D8\u53E3\u2026", "Loading grouped order book\u2026")) : /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("div", { className: "dhl-lvl dhl-bookhead" }, /* @__PURE__ */ React7.createElement("span", null, t("book.price", "\u4EF7\u683C")), /* @__PURE__ */ React7.createElement("span", null, t("book.size", "\u6570\u91CF")), /* @__PURE__ */ React7.createElement("span", null, t("book.total", "\u7D2F\u8BA1"))), asks.slice().reverse().map((level) => row(level, "ask")), /* @__PURE__ */ React7.createElement("div", { className: "dhl-spread-row" }, /* @__PURE__ */ React7.createElement("span", null, t("book.spread", "\u4EF7\u5DEE")), /* @__PURE__ */ React7.createElement("strong", null, spread != null ? fmtPrice(spread) : "\u2014"), /* @__PURE__ */ React7.createElement("span", null, spread != null && mid ? `${(spread / mid * 100).toFixed(3)}%` : "\u2014")), bids.map((level) => row(level, "bid"))));
}

// src/client/components/trades-card.tsx
var React8 = __toESM(require("react"), 1);
function TradesCard({ snapshot }) {
  const trades = (Array.isArray(snapshot?.trades) ? snapshot.trades : []).slice(0, 24);
  return /* @__PURE__ */ React8.createElement("div", { className: "dhl-card" }, /* @__PURE__ */ React8.createElement("h4", null, t("trades.title", "\u6700\u8FD1\u6210\u4EA4")), /* @__PURE__ */ React8.createElement("div", { className: "dhl-lvl dhl-bookhead" }, /* @__PURE__ */ React8.createElement("span", null, t("book.price", "\u4EF7\u683C")), /* @__PURE__ */ React8.createElement("span", null, t("book.size", "\u6570\u91CF")), /* @__PURE__ */ React8.createElement("span", null, tr("\u65F6\u95F4", "Time"))), trades.length === 0 ? /* @__PURE__ */ React8.createElement("div", { style: { color: "var(--dsw-alias-label-secondary)", fontSize: 11 } }, "\u2014") : trades.map((tr2, i) => /* @__PURE__ */ React8.createElement("div", { className: "dhl-lvl", key: i, style: { position: "relative" } }, /* @__PURE__ */ React8.createElement("span", { style: { color: tr2.side === "B" ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-state-error-primary)" } }, fmtPrice(tr2.px)), /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--dsw-alias-label-secondary)" } }, fmt(tr2.sz, 4)), /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--dsw-alias-label-secondary)" } }, Number.isFinite(Number(tr2.time)) ? new Date(Number(tr2.time)).toLocaleTimeString(tr("zh-CN", "en-US"), { hour12: false }) : "\u2014"))));
}

// src/client/components/market-tape.tsx
function MarketTape({ snapshot }) {
  const s = useStore();
  const tab = s.workspaceSessionId === s.activeSessionId ? s.workspace?.tapeTab ?? "book" : "book";
  return /* @__PURE__ */ React9.createElement("aside", { className: "dhl-tape", "aria-label": tr("\u76D8\u53E3\u4E0E\u6210\u4EA4", "Order book and trades") }, /* @__PURE__ */ React9.createElement("div", { className: "dhl-tape-tabs", role: "tablist", "aria-label": tr("\u5E02\u573A\u6570\u636E", "Market data") }, /* @__PURE__ */ React9.createElement("button", { type: "button", role: "tab", "aria-selected": tab === "book", className: tab === "book" ? "on" : "", onClick: () => saveSessionWorkspace({ tapeTab: "book" }) }, tr("\u76D8\u53E3", "Order book")), /* @__PURE__ */ React9.createElement("button", { type: "button", role: "tab", "aria-selected": tab === "trades", className: tab === "trades" ? "on" : "", onClick: () => saveSessionWorkspace({ tapeTab: "trades" }) }, tr("\u6210\u4EA4", "Trades"))), /* @__PURE__ */ React9.createElement("div", { className: "dhl-tape-content", role: "tabpanel" }, tab === "book" ? /* @__PURE__ */ React9.createElement(BookCard, { snapshot }) : /* @__PURE__ */ React9.createElement(TradesCard, { snapshot })));
}

// src/client/components/bottom-table.tsx
var React10 = __toESM(require("react"), 1);
function BottomTable({ account, accountError }) {
  const s = useStore();
  const tab = s.workspaceSessionId === s.activeSessionId ? s.workspace?.bottomTab ?? "positions" : "positions";
  const [orderView, setOrderView] = React10.useState("open");
  const [historyLimit, setHistoryLimit] = React10.useState(100);
  const positions = account?.positions ?? [];
  const orders = account?.openOrders ?? [];
  const history = s.tradeHistory;
  React10.useEffect(() => {
    if (tab === "orders") void loadTradeHistory();
  }, [tab, account?.address, s.status?.network]);
  const requestCancel = (coin, oid) => {
    queueToAgent(tr(
      `\u8BF7\u6838\u5BF9 ${coin} \u5F53\u524D\u6302\u5355 oid=${oid} \u7684\u72B6\u6001\uFF0C\u5E76\u7528 hyper_order action=cancel \u64A4\u9500\u8BE5\u8BA2\u5355\u3002\u82E5\u5DF2\u6210\u4EA4\u6216\u5DF2\u64A4\u9500\uFF0C\u8BF7\u8BF4\u660E\u7ED3\u679C\uFF1B\u4E0D\u8981\u521B\u5EFA\u65B0\u8BA2\u5355\u3002`,
      `Check the current status of ${coin} order oid=${oid}, then cancel it with hyper_order action=cancel. If already filled or cancelled, explain the outcome. Do not place a new order.`
    ));
  };
  const tabs = [
    ["positions", t("tab.positions", "\u6301\u4ED3")],
    ["orders", t("tab.orders", "\u59D4\u6258\u4E0E\u6210\u4EA4")],
    ["account", t("tab.account", "\u8D26\u6237")]
  ];
  const head = (...cells) => /* @__PURE__ */ React10.createElement("div", { className: "dhl-posrow dhl-poshead" }, cells.map((c) => /* @__PURE__ */ React10.createElement("span", { key: c }, c)));
  let body = null;
  if (tab === "positions") {
    body = /* @__PURE__ */ React10.createElement("div", { className: "dhl-positions-table" }, /* @__PURE__ */ React10.createElement("div", { className: "dhl-posrow dhl-posrow-position dhl-poshead" }, [t("positions.coin", "\u5408\u7EA6"), t("positions.size", "\u6570\u91CF"), t("positions.entry", "\u5F00\u4ED3\u4EF7"), t("positions.mark", "\u6807\u8BB0"), t("positions.upnl", "\u672A\u5B9E\u73B0"), "ROE", tr("\u6E05\u7B97\u4EF7", "Liquidation")].map((label) => /* @__PURE__ */ React10.createElement("span", { key: label }, label))), positions.length === 0 ? /* @__PURE__ */ React10.createElement("div", { className: "dhl-posrow" }, /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--dsw-alias-label-secondary)" } }, t("positions.none", "\uFF08\u65E0\u6301\u4ED3\uFF09"))) : positions.map((p, i) => {
      const roe = p.returnOnEquity == null ? null : Number(p.returnOnEquity) * 100;
      const leverage = typeof p.leverage === "number" ? p.leverage : Number(p.leverage?.value);
      return /* @__PURE__ */ React10.createElement("div", { key: `${p.coin}:${i}` }, /* @__PURE__ */ React10.createElement("div", { className: "dhl-posrow dhl-posrow-position" }, /* @__PURE__ */ React10.createElement("span", null, p.coin), /* @__PURE__ */ React10.createElement("span", null, `${p.size > 0 ? "+" : ""}${fmt(p.size, 4)}`), /* @__PURE__ */ React10.createElement("span", null, fmtPrice(p.entryPx)), /* @__PURE__ */ React10.createElement("span", null, p.markPx == null ? "\u2014" : fmtPrice(p.markPx)), /* @__PURE__ */ React10.createElement("span", { className: p.uPnl >= 0 ? "dhl-up" : "dhl-down" }, fmt(p.uPnl)), /* @__PURE__ */ React10.createElement("span", { className: roe == null ? "" : roe >= 0 ? "dhl-up" : "dhl-down" }, roe == null ? "\u2014" : `${fmt(roe)}%`), /* @__PURE__ */ React10.createElement("span", null, p.liquidationPx == null ? "\u2014" : fmtPrice(p.liquidationPx))), account?.mode === "live" ? /* @__PURE__ */ React10.createElement("div", { className: "dhl-position-extra" }, /* @__PURE__ */ React10.createElement("span", null, tr("\u4FDD\u8BC1\u91D1", "Margin"), " ", p.marginUsed == null ? "\u2014" : `${fmt(p.marginUsed)} USDC`), /* @__PURE__ */ React10.createElement("span", null, tr("\u6760\u6746", "Leverage"), " ", Number.isFinite(leverage) && leverage > 0 ? `${leverage}x` : "\u2014"), /* @__PURE__ */ React10.createElement("span", null, tr("\u5F00\u4ED3\u4EE5\u6765\u8D44\u91D1\u8D39", "Funding since open"), " ", p.cumFunding?.sinceOpen == null ? "\u2014" : `${fmt(p.cumFunding.sinceOpen)} USDC`)) : null);
    }));
  } else if (tab === "orders") {
    const rows = orderView === "open" ? orders : orderView === "history" ? history?.orders ?? [] : history?.fills ?? [];
    body = /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("div", { className: "dhl-history-controls" }, [["open", tr("\u5F53\u524D\u6302\u5355", "Open")], ["history", tr("\u5386\u53F2\u59D4\u6258", "Order history")], ["fills", tr("\u6210\u4EA4\u8BB0\u5F55", "Fills")]].map(([id, label]) => /* @__PURE__ */ React10.createElement("button", { type: "button", key: id, className: orderView === id ? "on" : "", onClick: () => {
      setOrderView(id);
      setHistoryLimit(100);
    } }, label)), /* @__PURE__ */ React10.createElement("button", { type: "button", className: "dhl-history-refresh", onClick: () => void loadTradeHistory(true) }, tr("\u5237\u65B0", "Refresh"))), orderView !== "open" && s.tradeHistoryError ? /* @__PURE__ */ React10.createElement("div", { className: "dhl-inline-error", role: "status" }, s.tradeHistoryError) : null, head(
      t("orders.coin", "\u5408\u7EA6"),
      t("orders.side", "\u65B9\u5411"),
      t("orders.px", "\u4EF7\u683C"),
      t("orders.sz", "\u6570\u91CF"),
      t("orders.status", "\u72B6\u6001")
    ), rows.length === 0 ? /* @__PURE__ */ React10.createElement("div", { className: "dhl-posrow" }, /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--dsw-alias-label-secondary)" } }, orderView !== "open" && !s.tradeHistoryAt && !s.tradeHistoryError ? tr("\u6B63\u5728\u8BFB\u53D6\u5386\u53F2\u2026", "Loading history\u2026") : accountError && orderView === "open" ? tr("\u6302\u5355\u72B6\u6001\u672A\u786E\u8BA4", "Order status unconfirmed") : tr("\u6682\u65E0\u8BB0\u5F55", "No records"))) : null, rows.slice(0, orderView === "open" ? 30 : historyLimit).map((row, index) => {
      const buy = row.isBuy ?? row.side === "B";
      const time = Number(row.timestamp ?? row.time ?? row.statusTimestamp);
      const reason = orderView === "fills" ? row.reason || history?.orders.find((order) => order.oid != null && order.oid === row.oid)?.reason : row.reason;
      const displayReason = typeof reason === "string" && !reason.startsWith("session:") && !["tool", "chat", "order"].includes(reason) ? reason : "";
      return /* @__PURE__ */ React10.createElement("div", { key: `${orderView}:${row.oid ?? row.tid ?? index}:${time}` }, /* @__PURE__ */ React10.createElement("div", { className: "dhl-posrow" }, /* @__PURE__ */ React10.createElement("span", null, row.coin ?? "\u2014"), /* @__PURE__ */ React10.createElement("span", { className: buy ? "dhl-up" : "dhl-down" }, buy ? t("side.buy", "\u4E70") : t("side.sell", "\u5356")), /* @__PURE__ */ React10.createElement("span", null, fmtPrice(row.limitPx ?? row.px)), /* @__PURE__ */ React10.createElement("span", null, fmt(row.origSz ?? row.sz, 4)), /* @__PURE__ */ React10.createElement("span", { className: "dhl-order-action" }, /* @__PURE__ */ React10.createElement("span", null, orderView === "open" ? t("orders.open", "\u6302\u5355\u4E2D") : orderView === "fills" ? tr("\u5DF2\u6210\u4EA4", "Filled") : String(row.status ?? "\u2014")), orderView === "open" && Number.isInteger(Number(row.oid)) && Number(row.oid) > 0 ? /* @__PURE__ */ React10.createElement("button", { type: "button", className: "dhl-ghost", onClick: () => requestCancel(String(row.coin), Number(row.oid)) }, tr("\u64A4\u5355", "Cancel")) : null)), orderView !== "open" ? /* @__PURE__ */ React10.createElement("div", { className: "dhl-history-detail" }, /* @__PURE__ */ React10.createElement("span", null, Number.isFinite(time) && time > 0 ? new Date(time).toLocaleString() : "\u2014"), orderView === "fills" && row.closedPnl != null ? /* @__PURE__ */ React10.createElement("span", null, "P&L ", fmt(row.closedPnl), " \xB7 ", tr("\u624B\u7EED\u8D39", "Fee"), " ", fmt(row.fee)) : null, displayReason ? /* @__PURE__ */ React10.createElement("span", { title: displayReason }, tr("\u4E0B\u5355\u539F\u56E0", "Order reason"), "\uFF1A", displayReason) : null) : null);
    }), orderView !== "open" && rows.length > historyLimit ? /* @__PURE__ */ React10.createElement("button", { type: "button", className: "dhl-history-more", onClick: () => setHistoryLimit((limit) => limit + 100) }, tr("\u663E\u793A\u66F4\u591A", "Show more"), " \xB7 ", Math.min(historyLimit, rows.length), "/", rows.length) : null);
  } else {
    body = /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11.5, fontVariantNumeric: "tabular-nums", padding: "4px 0" } }, account?.mode === "paper" ? [
      /* @__PURE__ */ React10.createElement("span", { key: "c" }, `${t("account.cash", "\u73B0\u91D1")}: ${fmt(account.usd)}`),
      /* @__PURE__ */ React10.createElement("span", { key: "e" }, `${t("account.equity", "\u6743\u76CA")}: ${fmt(account.equity)}`),
      /* @__PURE__ */ React10.createElement("span", { key: "m" }, `${tr("\u5DF2\u7528\u4FDD\u8BC1\u91D1", "Margin used")}: ${fmt(account.marginUsed)}`),
      /* @__PURE__ */ React10.createElement("span", { key: "a" }, `${tr("\u53EF\u7528\u4FDD\u8BC1\u91D1", "Available margin")}: ${fmt(account.availableMargin)}`),
      /* @__PURE__ */ React10.createElement("span", { key: "u", style: { color: account.uPnl >= 0 ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-state-error-primary)" } }, `uPnL: ${fmt(account.uPnl)}`)
    ] : [
      account?.accountMode ? /* @__PURE__ */ React10.createElement("span", { key: "mode" }, `${tr("\u8D26\u6237\u6A21\u5F0F", "Account mode")}: ${{ unifiedAccount: "Unified", portfolioMargin: "Portfolio", disabled: "Standard", default: "Standard", dexAbstraction: "DEX abstraction" }[account.accountMode] ?? account.accountMode}`) : null,
      account?.accountDex ? /* @__PURE__ */ React10.createElement("span", { key: "dex" }, `${tr("\u6C38\u7EED DEX", "Perp DEX")}: ${account.accountDex}`) : null,
      account?.marginSummary ? /* @__PURE__ */ React10.createElement("span", { key: "v" }, `${account.accountDex ? tr("DEX \u62B5\u62BC\u8D26\u6237\u4EF7\u503C", "DEX collateral value") : t("account.value", "\u8D26\u6237\u4EF7\u503C")}: ${fmt(account.marginSummary.accountValue)}`) : null,
      account?.balanceSource === "spot" ? /* @__PURE__ */ React10.createElement("span", { key: "usdc" }, `${tr("USDC \u4F59\u989D", "USDC balance")}: ${fmt(account.usdcBalance)} \xB7 ${tr("\u672A\u5360\u7528", "Unheld")}: ${fmt(account.unheldUsdc)}`) : account ? /* @__PURE__ */ React10.createElement("span", { key: "a" }, `${account.accountDex ? tr("DEX \u53EF\u7528", "DEX available") : t("account.available", "\u53EF\u7528")}: ${fmt(account.withdrawable)}`) : null,
      account?.address ? /* @__PURE__ */ React10.createElement("span", { key: "addr", style: { color: "var(--dsw-alias-label-secondary)" } }, account.address.slice(0, 6) + "\u2026" + account.address.slice(-4)) : null
    ]);
  }
  return /* @__PURE__ */ React10.createElement("div", { className: "dhl-card", style: { margin: "0 14px 12px", flex: "none" } }, accountError ? /* @__PURE__ */ React10.createElement("div", { className: "dhl-account-warning", role: "status" }, tr("\u8D26\u6237\u4E0E\u6302\u5355\u72B6\u6001\u672A\u786E\u8BA4", "Account and order status unconfirmed"), "\uFF1A", accountError) : null, /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", gap: 2, marginBottom: 6 } }, tabs.map(([id, label]) => /* @__PURE__ */ React10.createElement("button", { key: id, className: "dhl-tab" + (tab === id ? " on" : ""), onClick: () => saveSessionWorkspace({ bottomTab: id }) }, label))), body, account?.mode === "paper" ? /* @__PURE__ */ React10.createElement("p", { className: "dhl-ticket-note" }, tr(account.simulation, "Fixed slippage; order book depth, fees, funding and liquidation are not simulated.")) : null);
}

// src/client/components/market-picker.tsx
var React12 = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/components/market-icon.tsx
var React11 = __toESM(require("react"), 1);
var ICON_ROOT = "https://app.hyperliquid.xyz/coins/";
function iconNames(market) {
  if (market.kind === "outcome") return [];
  const base = market.kind === "spot" ? market.label.split("/")[0] : market.name;
  const symbol = /^k[A-Z]/.test(base) ? base.slice(1) : base;
  if (!/^[A-Za-z0-9:_-]+$/.test(symbol)) return [];
  return market.kind === "spot" ? [`${symbol}_spot`, symbol] : [symbol];
}
function MarketIcon({ market, small = false }) {
  const names = iconNames(market);
  const identity = `${market.kind}:${market.name}:${names.join(",")}`;
  const [state, setState] = React11.useState({ identity, index: 0, loaded: false });
  const current2 = state.identity === identity ? state : { identity, index: 0, loaded: false };
  const name = names[current2.index];
  const fallback = (market.kind === "spot" ? market.label.split("/")[0] : market.name.split(":").pop() || market.name).replace(/^k(?=[A-Z])/, "").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ React11.createElement("span", { className: "dhl-market-icon" + (small ? " dhl-market-icon-small" : ""), "aria-hidden": "true" }, /* @__PURE__ */ React11.createElement("span", { className: "dhl-market-icon-fallback" }, fallback || "\xB7"), name ? /* @__PURE__ */ React11.createElement(
    "img",
    {
      key: `${identity}:${current2.index}`,
      src: `${ICON_ROOT}${encodeURIComponent(name)}.svg`,
      alt: "",
      loading: small ? "lazy" : "eager",
      className: current2.loaded ? "loaded" : "",
      onLoad: () => setState({ identity, index: current2.index, loaded: true }),
      onError: () => setState({ identity, index: current2.index + 1, loaded: false })
    }
  ) : null);
}

// src/client/components/market-picker.tsx
var CATEGORIES = [
  ["all", "\u5168\u90E8"],
  ["perp", "\u6C38\u7EED"],
  ["spot", "\u73B0\u8D27"],
  ["hip3", "HIP-3"],
  ["outcome", "Outcome"],
  ["crypto", "Crypto"],
  ["tradfi", "TradFi"],
  ["preipo", "Pre-IPO"],
  ["trending", "\u70ED\u95E8"],
  ["favorites", "\u81EA\u9009"]
];
var FAV_KEY = "dsh-hyperliquid.favorites.v1";
var TRADFI_TAGS = /* @__PURE__ */ new Set(["stocks", "stock", "equities", "equity", "commodities", "indices", "fx", "rates", "preipo"]);
function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}
function n(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}
function changeOf(row) {
  const px = n(row.ctx?.markPx);
  const prev = n(row.ctx?.prevDayPx);
  return px > 0 && prev > 0 ? (px / prev - 1) * 100 : 0;
}
function interestOf(row) {
  return n(row.ctx?.openInterest) * n(row.ctx?.markPx);
}
function MarketPicker({ activeCoin, onClose }) {
  const s = useStore();
  const [query, setQuery] = React12.useState("");
  const [category, setCategory] = React12.useState("all");
  const [strict, setStrict] = React12.useState(true);
  const [sort, setSort] = React12.useState("volume");
  const [descending, setDescending] = React12.useState(true);
  const [favorites, setFavorites] = React12.useState(readFavorites);
  const [cursor, setCursor] = React12.useState(0);
  const [loading, setLoading] = React12.useState(false);
  const [renderCount, setRenderCount] = React12.useState(150);
  const searchRef = React12.useRef(null);
  const listRef = React12.useRef(null);
  const keyboardScroll = React12.useRef(false);
  React12.useEffect(() => {
    searchRef.current?.focus();
    setLoading(true);
    void loadMarketCatalog().catch((error) => notify(tr("\u5E02\u573A\u76EE\u5F55\u52A0\u8F7D\u5931\u8D25", "Market catalog load failed") + "\uFF1A" + String(error))).finally(() => setLoading(false));
    const timer = window.setInterval(() => {
      void loadMarketCatalog(true).catch(() => {
      });
    }, 5e3);
    return () => window.clearInterval(timer);
  }, []);
  const marketRows = React12.useMemo(() => {
    const livePerps = new Map(s.markets.map((market) => [market.name, market]));
    const catalog = s.marketCatalog.length ? s.marketCatalog.map((row) => {
      const latest = row.tradable ? livePerps.get(row.name) : null;
      return latest ? { ...row, ctx: latest.ctx } : row;
    }) : s.markets.map((row) => ({
      name: row.name,
      label: `${row.name}-USDC`,
      kind: "perp",
      venue: "Hyperliquid",
      tradable: true,
      ctx: row.ctx,
      maxLeverage: row.maxLeverage
    }));
    const needle = query.trim().toLocaleLowerCase();
    const rows = catalog.filter((row) => {
      if (strict && !row.tradable) return false;
      if (category === "favorites" && !favorites.includes(row.name)) return false;
      if (category === "perp" && row.kind !== "perp") return false;
      if (category === "spot" && row.kind !== "spot") return false;
      if (category === "hip3" && row.kind !== "hip3") return false;
      if (category === "outcome" && row.kind !== "outcome") return false;
      const officialCategory = row.category?.toLocaleLowerCase() ?? "";
      if (category === "crypto" && officialCategory !== "crypto") return false;
      if (category === "tradfi" && !TRADFI_TAGS.has(officialCategory)) return false;
      if (category === "preipo" && officialCategory !== "preipo") return false;
      if (needle && !`${row.name} ${row.label} ${row.venue}`.toLocaleLowerCase().includes(needle)) return false;
      return true;
    });
    const value = (row) => {
      if (sort === "name") return row.label;
      if (sort === "price") return n(row.ctx?.markPx);
      if (sort === "change") return changeOf(row);
      if (sort === "funding") return n(row.ctx?.funding);
      if (sort === "openInterest") return interestOf(row);
      return n(row.ctx?.dayNtlVlm);
    };
    rows.sort((a, b) => {
      if (needle) {
        const rank = (row) => {
          const name = row.name.toLocaleLowerCase();
          const label = row.label.toLocaleLowerCase();
          return name === needle || label === needle ? 0 : name.startsWith(needle) || label.startsWith(needle) ? 1 : 2;
        };
        const relevance = rank(a) - rank(b);
        if (relevance) return relevance;
      }
      const x = value(a);
      const y = value(b);
      const comparison = typeof x === "string" && typeof y === "string" ? x.localeCompare(y) : Number(x) - Number(y);
      return descending ? -comparison : comparison;
    });
    if (category === "trending" && !needle) rows.sort((a, b) => n(b.ctx?.dayNtlVlm) - n(a.ctx?.dayNtlVlm));
    return rows;
  }, [s.marketCatalog, s.markets, query, category, strict, sort, descending, favorites]);
  React12.useEffect(() => {
    setCursor(0);
    setRenderCount(150);
    listRef.current?.scrollTo({ top: 0 });
  }, [query, category, strict, sort, descending]);
  React12.useEffect(() => {
    if (cursor >= renderCount) setRenderCount(Math.ceil((cursor + 1) / 150) * 150);
  }, [cursor, renderCount]);
  React12.useLayoutEffect(() => {
    if (!keyboardScroll.current || cursor >= renderCount) return;
    listRef.current?.querySelector(`[data-market-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
    keyboardScroll.current = false;
  }, [cursor, renderCount]);
  const choose = React12.useCallback((row) => {
    onClose();
    void setDeskCoin(row.name).catch(() => {
    });
  }, [onClose]);
  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const next = prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {
      }
      return next;
    });
  };
  const sortBy = (key) => {
    if (key === sort) setDescending((value) => !value);
    else {
      setSort(key);
      setDescending(key !== "name");
    }
  };
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s" && marketRows[cursor]) {
      event.preventDefault();
      toggleFavorite(marketRows[cursor].name);
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.max(0, Math.min(marketRows.length - 1, cursor + (event.key === "ArrowDown" ? 1 : -1)));
      keyboardScroll.current = true;
      setCursor(next);
    }
    if (event.key === "Enter" && marketRows[cursor]) {
      event.preventDefault();
      choose(marketRows[cursor]);
    }
  };
  const header = (label, key) => /* @__PURE__ */ React12.createElement("button", { type: "button", onClick: () => sortBy(key), "aria-label": tr(`\u6309${label}\u6392\u5E8F`, `Sort by ${label}`) }, label, sort === key ? /* @__PURE__ */ React12.createElement("span", { "aria-hidden": "true" }, descending ? " \u2193" : " \u2191") : null);
  return /* @__PURE__ */ React12.createElement(import_dsh_client_ui_primitives2.Modal, { open: true, onClose, title: t("market.choose", "\u9009\u62E9\u5E02\u573A"), headless: true, className: "dhl-picker-modal", backdropBlur: true, onKeyDownCapture: onKeyDown }, /* @__PURE__ */ React12.createElement("section", { className: "dhl-picker" }, /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-top" }, /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-search" }, /* @__PURE__ */ React12.createElement(SearchIcon, null), /* @__PURE__ */ React12.createElement("input", { ref: searchRef, "data-modal-autofocus": true, value: query, onChange: (event) => setQuery(event.target.value), placeholder: t("market.search", "\u641C\u7D22\u5E02\u573A"), "aria-label": t("market.search", "\u641C\u7D22\u5E02\u573A") }), /* @__PURE__ */ React12.createElement("kbd", null, "/")), /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-mode", role: "group", "aria-label": tr("\u5E02\u573A\u8303\u56F4", "Market scope") }, /* @__PURE__ */ React12.createElement("button", { type: "button", className: strict ? "on" : "", "aria-pressed": strict, onClick: () => setStrict(true) }, t("market.tradable", "\u53EF\u4EA4\u6613")), /* @__PURE__ */ React12.createElement("button", { type: "button", className: !strict ? "on" : "", "aria-pressed": !strict, onClick: () => setStrict(false) }, t("market.all", "\u5168\u90E8"))), /* @__PURE__ */ React12.createElement("button", { type: "button", className: "dhl-picker-close", onClick: onClose, "aria-label": t("modal.close", "\u5173\u95ED") }, "\xD7")), !strict ? /* @__PURE__ */ React12.createElement("p", { className: "dhl-picker-readonly-note" }, tr("\u201C\u53EA\u8BFB\u201D\u8868\u793A\u672C\u63D2\u4EF6\u4EC5\u63D0\u4F9B\u884C\u60C5\uFF0C\u5C1A\u672A\u63A5\u5165\u8BE5\u5E02\u573A\u7684\u4E0B\u5355\u4E0E\u98CE\u63A7\uFF1BHIP-3 \u548C\u73B0\u8D27\u5728 Hyperliquid \u672C\u8EAB\u53EF\u4EA4\u6613\u3002", "\u201CView only\u201D means this plugin has market data but no order and risk support for that market. Hyperliquid itself supports HIP-3 and spot trading.")) : null, /* @__PURE__ */ React12.createElement("nav", { className: "dhl-picker-tabs", "aria-label": tr("\u5E02\u573A\u5206\u7C7B", "Market categories") }, CATEGORIES.map(([key, label]) => /* @__PURE__ */ React12.createElement("button", { type: "button", key, className: category === key ? "on" : "", "aria-current": category === key ? "page" : void 0, onClick: () => {
    setCategory(key);
    if (["spot", "hip3", "outcome", "crypto", "tradfi", "preipo"].includes(key)) setStrict(false);
  } }, t(`market.category.${key}`, label)))), /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-tablehead" }, /* @__PURE__ */ React12.createElement("span", { "aria-hidden": "true" }, "\u2606"), header(t("market.name", "\u5E02\u573A"), "name"), header(t("market.price", "\u6700\u65B0\u4EF7"), "price"), header(t("market.change", "24h \u6DA8\u8DCC"), "change"), header(t("market.funding", "\u8D44\u91D1\u8D39"), "funding"), header(t("market.volume", "24h \u6210\u4EA4\u989D"), "volume"), header(t("market.openInterest", "\u672A\u5E73\u4ED3\u91CF"), "openInterest")), /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-list", role: "listbox", "aria-label": tr("\u5E02\u573A\u5217\u8868", "Market list"), ref: listRef, onScroll: (event) => {
    const element = event.currentTarget;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 200) setRenderCount((count) => Math.min(marketRows.length, count + 150));
  } }, marketRows.slice(0, renderCount).map((row, index) => {
    const change = changeOf(row);
    return /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-row" + (row.name === activeCoin ? " active" : "") + (cursor === index ? " cursor" : ""), role: "option", "aria-selected": row.name === activeCoin, key: `${row.kind}:${row.name}`, "data-market-index": index, onMouseEnter: () => setCursor(index) }, /* @__PURE__ */ React12.createElement("button", { type: "button", className: "dhl-picker-star" + (favorites.includes(row.name) ? " on" : ""), "aria-label": `${favorites.includes(row.name) ? tr("\u53D6\u6D88\u81EA\u9009", "Remove favorite") : tr("\u52A0\u5165\u81EA\u9009", "Add favorite")} ${row.label}`, onClick: () => toggleFavorite(row.name) }, favorites.includes(row.name) ? "\u2605" : "\u2606"), /* @__PURE__ */ React12.createElement("button", { type: "button", className: "dhl-picker-market", onClick: () => choose(row), title: `${row.label} \xB7 ${row.name} \xB7 ${row.venue}${row.category ? ` \xB7 ${row.category}` : ""}` }, /* @__PURE__ */ React12.createElement(MarketIcon, { market: row, small: true }), /* @__PURE__ */ React12.createElement("strong", null, row.label), /* @__PURE__ */ React12.createElement("small", null, row.kind === "perp" ? "PERP" : row.kind === "hip3" ? "HIP-3" : row.kind === "outcome" ? "OUTCOME" : "SPOT", row.name.startsWith("@") ? ` ${row.name}` : "", row.category ? ` \xB7 ${row.category}` : "", row.tradable ? "" : ` \xB7 ${tr("\u53EA\u8BFB", "View only")}`)), /* @__PURE__ */ React12.createElement("span", null, n(row.ctx?.markPx) > 0 ? fmtPrice(row.ctx.markPx) : "\u2014"), /* @__PURE__ */ React12.createElement("span", { className: change > 0 ? "dhl-up" : change < 0 ? "dhl-down" : "" }, n(row.ctx?.prevDayPx) > 0 ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}%` : "\u2014"), /* @__PURE__ */ React12.createElement("span", null, row.ctx?.funding != null ? `${(n(row.ctx.funding) * 100).toFixed(4)}%` : "\u2014"), /* @__PURE__ */ React12.createElement("span", null, row.ctx?.dayNtlVlm != null ? "$" + fmt(row.ctx.dayNtlVlm, 0) : "\u2014"), /* @__PURE__ */ React12.createElement("span", null, row.ctx?.openInterest != null ? "$" + fmt(interestOf(row), 0) : "\u2014"));
  }), !loading && marketRows.length === 0 ? /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-empty" }, category === "outcome" && s.status?.network === "mainnet" ? t("market.outcomeTestnet", "Outcome \u76EE\u5F55\u76EE\u524D\u4EC5\u5728 testnet \u63D0\u4F9B\u3002") : t("market.empty", "\u6CA1\u6709\u5339\u914D\u7684\u5E02\u573A")) : null, loading && !s.marketCatalog.length ? /* @__PURE__ */ React12.createElement("div", { className: "dhl-picker-empty" }, t("market.loading", "\u6B63\u5728\u8BFB\u53D6\u5E02\u573A\u76EE\u5F55\u2026")) : null), /* @__PURE__ */ React12.createElement("footer", { className: "dhl-picker-foot" }, /* @__PURE__ */ React12.createElement("span", null, t("market.shortcuts", "\u2191\u2193 \u9009\u62E9\u3000Enter \u6253\u5F00\u3000\u2318/Ctrl+S \u81EA\u9009\u3000Esc \u5173\u95ED")), /* @__PURE__ */ React12.createElement("span", null, marketRows.length, " ", t("market.count", "\u4E2A\u5E02\u573A"), " \xB7 Hyperliquid \xB7 ", s.status?.network ?? "Hyperliquid"))));
}

// src/client/trade-events.ts
function chartTradeEvents(candles, coin, orders, fills) {
  if (!candles.length) return [];
  const times = candles.map((candle) => candle.t);
  const interval = candles.length > 1 ? Math.max(1, candles[1].t - candles[0].t) : 6e4;
  const barAt = (time) => {
    if (!Number.isFinite(time) || time < times[0] || time >= times[times.length - 1] + interval) return null;
    let lo = 0;
    let hi = times.length - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (times[mid] <= time) lo = mid;
      else hi = mid - 1;
    }
    return times[lo];
  };
  const cleanReason = (value) => typeof value === "string" && !value.startsWith("session:") && !["tool", "chat", "order"].includes(value) ? value : "";
  const reasonByOid = new Map(orders.filter((row) => row?.oid != null && row.reason).map((row) => [String(row.oid), cleanReason(row.reason)]));
  const out = [];
  for (const [index, row] of orders.entries()) {
    if (row?.coin !== coin) continue;
    const time = Number(row.timestamp ?? row.time ?? row.statusTimestamp);
    const candleTime = barAt(time);
    if (candleTime == null) continue;
    out.push({
      kind: "order",
      coin,
      time,
      candleTime,
      isBuy: row.isBuy ?? row.side === "B",
      px: Number(row.limitPx ?? row.px),
      sz: Number(row.origSz ?? row.sz),
      status: String(row.status ?? ""),
      reason: cleanReason(row.reason),
      id: `order:${row.oid ?? row.cloid ?? index}:${time}`
    });
  }
  for (const [index, row] of fills.entries()) {
    if (row?.coin !== coin) continue;
    const time = Number(row.time ?? row.filledTime);
    const candleTime = barAt(time);
    if (candleTime == null) continue;
    out.push({
      kind: "fill",
      coin,
      time,
      candleTime,
      isBuy: row.isBuy ?? row.side === "B",
      px: Number(row.px ?? row.filledPx),
      sz: Number(row.sz ?? row.filledSz),
      status: "filled",
      reason: cleanReason(row.reason) || reasonByOid.get(String(row.oid)) || "",
      id: `fill:${row.tid ?? row.hash ?? index}:${time}`
    });
  }
  return out.sort((a, b) => a.candleTime - b.candleTime || a.time - b.time).slice(-120);
}

// src/client/components/desk-column.tsx
var INDICATOR_CHOICES = [
  ["volume", "\u6210\u4EA4\u91CF", "K \u7EBF\u4E0B\u65B9\u7684\u6210\u4EA4\u91CF\u67F1"],
  ["sma20", "SMA 20", "20 \u6839\u6536\u76D8\u4EF7\u7684\u7B80\u5355\u5747\u7EBF"],
  ["sma60", "MA 60", "60 \u6839\u6536\u76D8\u4EF7\u7684\u7B80\u5355\u5747\u7EBF"],
  ["ema20", "EMA 20", "20 \u6839\u6536\u76D8\u4EF7\u7684\u6307\u6570\u5747\u7EBF"],
  ["ema50", "EMA 50", "50 \u6839\u6536\u76D8\u4EF7\u7684\u6307\u6570\u5747\u7EBF"],
  ["bollinger20", "\u5E03\u6797\u5E26 20", "\u5747\u7EBF\u53CA\u4E0A\u4E0B\u4E24\u500D\u6807\u51C6\u5DEE"],
  ["rsi14", "RSI 14", "\u76F8\u5BF9\u5F3A\u5F31\u6307\u6570\u526F\u56FE"],
  ["macd", "MACD", "12 / 26 / 9 \u52A8\u91CF\u526F\u56FE"]
];
var INDICATOR_EN = {
  volume: ["Volume", "Volume bars below the candles"],
  sma20: ["SMA 20", "20-close simple moving average"],
  sma60: ["MA 60", "60-close simple moving average"],
  ema20: ["EMA 20", "20-close exponential moving average"],
  ema50: ["EMA 50", "50-close exponential moving average"],
  bollinger20: ["Bollinger 20", "Mean and two standard deviation bands"],
  rsi14: ["RSI 14", "Relative strength index"],
  macd: ["MACD", "12 / 26 / 9 momentum panel"]
};
function finite(value) {
  if (value == null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
function DeskColumn({ onCollapse }) {
  const s = useStore();
  const coin = s.activeCoin;
  const row = (s.selectedMarket?.name === coin ? s.selectedMarket : null) ?? s.marketCatalog.find((u) => u.name === coin) ?? s.markets.find((u) => u.name === coin);
  const ctx = row?.ctx;
  const liveMid = s.snapshot?.observedAt?.mids && Date.now() - s.snapshot.observedAt.mids < 1e4 ? finite(s.snapshot?.mids?.mids?.[coin] ?? s.snapshot?.mids?.[coin]) : null;
  const book = s.snapshot?.book?.levels;
  const bid = finite(book?.[0]?.[0]?.px);
  const ask = finite(book?.[1]?.[0]?.px);
  const bookMid = bid != null && ask != null ? (bid + ask) / 2 : bid ?? ask;
  const mark = row?.kind === "outcome" ? bookMid ?? finite(ctx?.markPx) : row?.kind === "perp" ? liveMid ?? finite(ctx?.markPx) : finite(ctx?.markPx) ?? liveMid;
  const prev = finite(ctx?.prevDayPx);
  const volume = finite(ctx?.dayNtlVlm);
  const openInterest = finite(ctx?.openInterest);
  const funding = finite(ctx?.funding);
  const change = mark != null && mark > 0 && prev != null && prev > 0 ? (mark / prev - 1) * 100 : null;
  const chartTab = s.workspaceSessionId === s.activeSessionId ? s.workspace?.chartTab ?? "chart" : "chart";
  const indicators = React13.useMemo(() => new Set(s.workspaceSessionId === s.activeSessionId ? s.workspace?.indicators ?? ["volume"] : ["volume"]), [s.workspace, s.workspaceSessionId, s.activeSessionId]);
  const [drawMode, setDrawMode] = React13.useState(null);
  const [pickerOpen, setPickerOpen] = React13.useState(false);
  const [chartExpanded, setChartExpanded] = React13.useState(false);
  const [chartResetToken, setChartResetToken] = React13.useState(0);
  const toggleIndicator = (id) => {
    const next = new Set(indicators);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    saveSessionWorkspace({ indicators: [...next] });
  };
  React13.useEffect(() => {
    setDrawMode(null);
    setChartExpanded(false);
  }, [s.activeSessionId]);
  const marks = s.chartMarksKey === `${s.activeSessionId ?? ""}:${coin}:${s.interval}` ? s.chartMarks : [];
  const layers = { orders: true, fills: true, drawings: true, ...s.workspace?.chartLayers };
  const tradeEvents = React13.useMemo(
    () => chartTradeEvents(
      s.candles,
      coin,
      layers.orders ? s.tradeHistory?.orders ?? [] : [],
      layers.fills ? s.tradeHistory?.fills ?? [] : []
    ),
    [s.candles, coin, s.tradeHistory, layers.orders, layers.fills]
  );
  const draw = React13.useCallback(async (mark2) => {
    const sessionId = store.get().activeSessionId;
    if (!sessionId) {
      notify(tr("\u8BF7\u5148\u9009\u62E9\u4EA4\u6613\u4F1A\u8BDD", "Choose a trading session first"));
      return;
    }
    const { activeCoin, interval } = store.get();
    try {
      await hyperCall("drawChartMark", {
        ...mark2,
        sessionId,
        coin: activeCoin,
        interval,
        role: "neutral",
        label: mark2.kind === "level" ? tr("\u6C34\u5E73\u7EBF", "Horizontal line") : tr("\u8D8B\u52BF\u7EBF", "Trend line")
      });
      if (store.get().activeSessionId === sessionId) void loadChartMarks();
    } catch (error) {
      notify(tr("\u753B\u7EBF\u5931\u8D25", "Could not draw line") + "\uFF1A" + String(error?.message ?? error));
    }
    setDrawMode(null);
  }, []);
  const erase = React13.useCallback(async (id) => {
    const sessionId = store.get().activeSessionId;
    if (!sessionId) return;
    try {
      await hyperCall("eraseChartMark", { sessionId, id });
      if (store.get().activeSessionId === sessionId) void loadChartMarks();
    } catch (error) {
      notify(tr("\u5220\u9664\u753B\u7EBF\u5931\u8D25", "Could not remove line") + "\uFF1A" + String(error?.message ?? error));
    }
  }, []);
  React13.useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || pickerOpen) return;
      const element = event.target;
      if (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName)) return;
      event.preventDefault();
      setPickerOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);
  React13.useEffect(() => {
    if (!chartExpanded) return void 0;
    const onEscape = (event) => {
      if (event.key === "Escape" && !pickerOpen) {
        event.preventDefault();
        setChartExpanded(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [chartExpanded, pickerOpen]);
  React13.useEffect(() => {
    if (!drawMode) return void 0;
    const cancel = (event) => {
      if (event.key === "Escape") setDrawMode(null);
    };
    window.addEventListener("keydown", cancel);
    return () => window.removeEventListener("keydown", cancel);
  }, [drawMode]);
  React13.useEffect(() => {
    if (chartTab === "funding" && row?.kind !== "spot" && row?.kind !== "outcome" && store.get().fundingCoin !== coin) void loadFunding();
    if (chartTab === "funding" && (row?.kind === "spot" || row?.kind === "outcome")) saveSessionWorkspace({ chartTab: "chart" });
  }, [chartTab, coin, row?.kind]);
  React13.useEffect(() => {
    void loadChartMarks();
  }, [s.activeSessionId, coin, s.interval]);
  React13.useEffect(() => {
    void loadTradeHistory();
  }, [s.status?.network, s.status?.tradingMode]);
  const changeInterval = React13.useCallback((next) => {
    store.patch({ interval: next });
    pushDeskInterval(next);
    void loadCandles();
  }, []);
  const stats = [
    [tr("\u6807\u8BB0\u4EF7\u683C", "Mark"), fmtPrice(mark)],
    [tr("\u9884\u8A00\u673A", "Oracle"), fmtPrice(ctx?.oraclePx)],
    [tr("24h \u6DA8\u8DCC", "24h change"), change == null ? "\u2014" : `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`, change == null ? "" : change >= 0 ? "dhl-up" : "dhl-down"],
    [tr("24h \u6210\u4EA4\u989D", "24h volume"), volume == null ? "\u2014" : `$${fmt(volume, 0)}`],
    [tr("\u672A\u5E73\u4ED3\u91CF", "Open interest"), openInterest == null || mark == null ? "\u2014" : `$${fmt(openInterest * mark, 0)}`],
    [tr("\u8D44\u91D1\u8D39 / h", "Funding / h"), funding == null ? "\u2014" : `${(funding * 100).toFixed(4)}%`]
  ];
  return /* @__PURE__ */ React13.createElement("main", { id: "dhl-panel-desk", className: "dhl-col-desk" }, /* @__PURE__ */ React13.createElement("header", { className: "dhl-market-strip" }, /* @__PURE__ */ React13.createElement("div", { className: "dhl-market-name" }, /* @__PURE__ */ React13.createElement("button", { type: "button", className: "dhl-market-trigger", "aria-haspopup": "dialog", "aria-expanded": pickerOpen, onClick: () => setPickerOpen(true) }, /* @__PURE__ */ React13.createElement(MarketIcon, { market: row ?? { name: coin, label: `${coin}-USDC`, kind: "perp" } }), /* @__PURE__ */ React13.createElement("strong", null, row?.label ?? `${coin}-USDC`), /* @__PURE__ */ React13.createElement("span", { className: "dhl-market-chevron", "aria-hidden": "true" }, "\u2304")), /* @__PURE__ */ React13.createElement("span", { className: "dhl-market-kind" }, row?.kind === "spot" ? "SPOT" : row?.kind === "hip3" ? "HIP-3" : row?.kind === "outcome" ? "OUTCOME" : "PERP"), row?.maxLeverage ? /* @__PURE__ */ React13.createElement("span", { className: "dhl-market-tag" }, row.maxLeverage, "x") : null, row?.tradable === false ? /* @__PURE__ */ React13.createElement("span", { className: "dhl-market-readonly" }, tr("\u53EA\u8BFB", "View only")) : null), /* @__PURE__ */ React13.createElement("div", { className: "dhl-market-stats" }, stats.map(([label, value, tone]) => /* @__PURE__ */ React13.createElement("div", { className: "dhl-market-stat", key: label }, /* @__PURE__ */ React13.createElement("span", null, label), /* @__PURE__ */ React13.createElement("strong", { className: tone ?? "" }, value)))), /* @__PURE__ */ React13.createElement("button", { className: "dhl-panel-iconbtn", type: "button", onClick: onCollapse, "aria-label": tr("\u6536\u8D77\u884C\u60C5\u533A", "Collapse market panel"), title: tr("\u6536\u8D77\u884C\u60C5\u533A", "Collapse market panel") }, /* @__PURE__ */ React13.createElement(FoldIcon, { direction: "right" }))), pickerOpen ? /* @__PURE__ */ React13.createElement(MarketPicker, { activeCoin: coin, onClose: () => setPickerOpen(false) }) : null, /* @__PURE__ */ React13.createElement("div", { className: "dhl-market-workspace" + (s.tapePlacement === "below" ? " dhl-tape-below" : "") }, /* @__PURE__ */ React13.createElement("section", { className: "dhl-chart-panel" + (chartExpanded ? " dhl-chart-panel-expanded" : ""), "aria-label": tr("\u884C\u60C5\u56FE\u8868", "Market chart") }, /* @__PURE__ */ React13.createElement("div", { className: "dhl-chart-tabs", role: "tablist", "aria-label": tr("\u56FE\u8868\u5185\u5BB9", "Chart content") }, /* @__PURE__ */ React13.createElement("button", { type: "button", role: "tab", "aria-selected": chartTab === "chart", className: chartTab === "chart" ? "on" : "", onClick: () => saveSessionWorkspace({ chartTab: "chart" }) }, tr("K \u7EBF", "Chart")), row?.kind !== "spot" && row?.kind !== "outcome" ? /* @__PURE__ */ React13.createElement("button", { type: "button", role: "tab", "aria-selected": chartTab === "funding", className: chartTab === "funding" ? "on" : "", onClick: () => saveSessionWorkspace({ chartTab: "funding" }) }, tr("\u8D44\u91D1\u8D39\u5386\u53F2", "Funding history")) : null), chartTab === "chart" ? /* @__PURE__ */ React13.createElement("div", { role: "tabpanel" }, /* @__PURE__ */ React13.createElement("div", { className: "dhl-chart-tools" }, /* @__PURE__ */ React13.createElement("div", { className: "dhl-intervals", "aria-label": tr("K \u7EBF\u5468\u671F", "Chart interval") }, INTERVALS.map((iv) => /* @__PURE__ */ React13.createElement("button", { key: iv, type: "button", className: s.interval === iv ? "on" : "", onClick: () => changeInterval(iv) }, iv)), /* @__PURE__ */ React13.createElement("select", { className: "dhl-interval-more", "aria-label": tr("\u66F4\u591A K \u7EBF\u5468\u671F", "More chart intervals"), value: MORE_INTERVALS.includes(s.interval) ? s.interval : "", onChange: (event) => changeInterval(event.target.value) }, /* @__PURE__ */ React13.createElement("option", { value: "", disabled: true }, tr("\u66F4\u591A", "More")), MORE_INTERVALS.map((iv) => /* @__PURE__ */ React13.createElement("option", { key: iv, value: iv }, iv)))), /* @__PURE__ */ React13.createElement("div", { className: "dhl-chart-actions" }, /* @__PURE__ */ React13.createElement("details", { className: "dhl-layer-menu" }, /* @__PURE__ */ React13.createElement("summary", null, tr("\u663E\u793A", "Show")), /* @__PURE__ */ React13.createElement("div", { className: "dhl-layer-popover" }, [["orders", tr("\u59D4\u6258", "Orders")], ["fills", tr("\u6210\u4EA4", "Fills")], ["drawings", tr("\u753B\u7EBF", "Drawings")]].map(([id, label]) => /* @__PURE__ */ React13.createElement("label", { key: id }, /* @__PURE__ */ React13.createElement("input", { type: "checkbox", checked: layers[id], onChange: (event) => saveSessionWorkspace({ chartLayers: { ...layers, [id]: event.target.checked } }) }), label)))), /* @__PURE__ */ React13.createElement("details", { className: "dhl-indicator-menu" }, /* @__PURE__ */ React13.createElement("summary", { "aria-label": tr("\u9009\u62E9\u56FE\u8868\u6307\u6807", "Choose chart indicators") }, tr("\u6307\u6807", "Indicators"), " ", /* @__PURE__ */ React13.createElement("span", { className: "dhl-indicator-count" }, indicators.size)), /* @__PURE__ */ React13.createElement("div", { className: "dhl-indicator-popover", role: "group", "aria-label": tr("\u56FE\u8868\u6307\u6807", "Chart indicators") }, /* @__PURE__ */ React13.createElement("strong", null, tr("\u56FE\u8868\u6307\u6807", "Chart indicators")), INDICATOR_CHOICES.map(([id, label, description]) => /* @__PURE__ */ React13.createElement("button", { type: "button", key: id, className: indicators.has(id) ? "on" : "", "aria-pressed": indicators.has(id), onClick: () => toggleIndicator(id) }, /* @__PURE__ */ React13.createElement("span", { className: "dhl-indicator-check", "aria-hidden": "true" }, indicators.has(id) ? "\u2713" : ""), /* @__PURE__ */ React13.createElement("span", null, /* @__PURE__ */ React13.createElement("b", null, tr(label, INDICATOR_EN[id]?.[0] ?? label)), /* @__PURE__ */ React13.createElement("small", null, tr(description, INDICATOR_EN[id]?.[1] ?? description))))))), /* @__PURE__ */ React13.createElement("button", { type: "button", className: drawMode === "level" ? "on" : "", "aria-pressed": drawMode === "level", onClick: () => setDrawMode(drawMode === "level" ? null : "level"), title: tr("\u5355\u51FB\u56FE\u8868\u6DFB\u52A0\u6C34\u5E73\u7EBF", "Click chart to add a horizontal line") }, tr("\u6C34\u5E73\u7EBF", "H Line")), /* @__PURE__ */ React13.createElement("button", { type: "button", className: drawMode === "trend" ? "on" : "", "aria-pressed": drawMode === "trend", onClick: () => setDrawMode(drawMode === "trend" ? null : "trend"), title: tr("\u5355\u51FB\u56FE\u8868\u4E24\u6B21\u6DFB\u52A0\u8D8B\u52BF\u7EBF", "Click chart twice to add a trend line") }, tr("\u8D8B\u52BF\u7EBF", "Trend")), /* @__PURE__ */ React13.createElement("button", { type: "button", disabled: !marks.some((item) => item.source === "user"), title: tr("\u64A4\u9500\u6700\u8FD1\u4E00\u6761\u624B\u52A8\u753B\u7EBF", "Undo last drawing"), onClick: () => {
    const last = [...marks].reverse().find((item) => item.source === "user");
    if (last) void erase(last.id);
  } }, tr("\u64A4\u9500", "Undo")), /* @__PURE__ */ React13.createElement("select", { className: "dhl-interval-more", "aria-label": tr("\u4EF7\u683C\u523B\u5EA6", "Price scale"), value: s.workspace?.priceScale ?? "normal", onChange: (event) => saveSessionWorkspace({ priceScale: event.target.value }) }, /* @__PURE__ */ React13.createElement("option", { value: "normal" }, tr("\u7EBF\u6027", "Linear")), /* @__PURE__ */ React13.createElement("option", { value: "log" }, tr("\u5BF9\u6570", "Log")), /* @__PURE__ */ React13.createElement("option", { value: "percentage" }, "%")), /* @__PURE__ */ React13.createElement("span", { className: "dhl-chart-action-separator", "aria-hidden": "true" }), /* @__PURE__ */ React13.createElement("button", { type: "button", className: "dhl-chart-iconbtn", "aria-label": tr("\u590D\u4F4D\u56FE\u8868\u89C6\u56FE", "Reset chart view"), title: tr("\u590D\u4F4D\u56FE\u8868\u89C6\u56FE", "Reset chart view"), onClick: () => setChartResetToken((value) => value + 1) }, /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true" }, /* @__PURE__ */ React13.createElement("path", { d: "M3 11a9 9 0 1 0 2.6-6.4M3 4v6h6" }), /* @__PURE__ */ React13.createElement("path", { d: "M12 7v5l3 2" }))), /* @__PURE__ */ React13.createElement("button", { type: "button", className: "dhl-chart-iconbtn", "aria-label": chartExpanded ? tr("\u9000\u51FA\u653E\u5927\u56FE\u8868", "Exit expanded chart") : tr("\u653E\u5927\u56FE\u8868", "Expand chart"), "aria-pressed": chartExpanded, title: chartExpanded ? tr("\u9000\u51FA\u653E\u5927\u56FE\u8868 (Esc)", "Exit expanded chart (Esc)") : tr("\u653E\u5927\u56FE\u8868", "Expand chart"), onClick: () => setChartExpanded((value) => !value) }, chartExpanded ? /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true" }, /* @__PURE__ */ React13.createElement("path", { d: "M9 3v6H3m18 6h-6v6M3 9h6V3m12 12h-6v6" })) : /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true" }, /* @__PURE__ */ React13.createElement("path", { d: "M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" }))))), /* @__PURE__ */ React13.createElement("div", { className: "dhl-chart" }, /* @__PURE__ */ React13.createElement(
    CandleChart,
    {
      candles: s.candles,
      marks: layers.drawings ? marks : [],
      tradeEvents,
      indicators,
      expanded: chartExpanded,
      resetToken: chartResetToken,
      drawMode,
      onDraw: draw,
      onSelect: (selection) => insertChartReference(selection, coin, s.interval),
      onNeedOlder: loadOlderCandles,
      olderState: s.candlesOlder,
      priceScale: s.workspace?.priceScale ?? "normal",
      visibleRange: s.workspace?.chartRanges?.[`${coin}:${s.interval}`] ?? null,
      onVisibleRange: (range) => saveSessionWorkspace({ chartRanges: { [`${coin}:${s.interval}`]: range } }),
      key: `${s.activeSessionId ?? ""}:${s.workspaceSessionId === s.activeSessionId ? "ready" : "pending"}:${coin}:${s.interval}`
    }
  ), /* @__PURE__ */ React13.createElement("div", { className: "dhl-chart-click-hint" }, drawMode ? drawMode === "level" ? tr("\u5355\u51FB K \u7EBF\u56FE\u8BBE\u7F6E\u6C34\u5E73\u7EBF \xB7 Esc \u53D6\u6D88", "Click chart to place line \xB7 Esc to cancel") : tr("\u5728 K \u7EBF\u56FE\u4E0A\u4F9D\u6B21\u9009\u62E9\u8D77\u70B9\u548C\u7EC8\u70B9 \xB7 Esc \u53D6\u6D88", "Click start and end points \xB7 Esc to cancel") : tr("\u70B9\u51FB K \u7EBF\u3001\u6210\u4EA4\u91CF\u67F1\u6216\u6307\u6807\u7EBF\uFF0C\u5C06\u8BE5\u70B9\u6570\u636E\u52A0\u5165\u804A\u5929\u8F93\u5165\u6846", "Click a candle, volume bar or study line to add its data to the chat draft")), marks.length > 0 ? /* @__PURE__ */ React13.createElement("div", { className: "dhl-chart-mark-list", "aria-label": tr("\u672C\u4F1A\u8BDD\u753B\u7EBF", "This session\u2019s lines") }, marks.map((item) => /* @__PURE__ */ React13.createElement("span", { key: item.id }, item.label, /* @__PURE__ */ React13.createElement("button", { type: "button", "aria-label": `${tr("\u5220\u9664\u753B\u7EBF", "Remove line")} ${item.label}`, onClick: () => void erase(item.id) }, "\xD7")))) : null, s.candlesState === "error" ? /* @__PURE__ */ React13.createElement("div", { className: "dhl-inline-error" }, tr("K \u7EBF\u6682\u65F6\u4E0D\u53EF\u7528\u3002\u5207\u6362\u5468\u671F\u53EF\u91CD\u8BD5\u3002", "Chart data is unavailable. Change interval to retry.")) : null)) : /* @__PURE__ */ React13.createElement("div", { className: "dhl-funding-panel", role: "tabpanel" }, /* @__PURE__ */ React13.createElement("div", { className: "dhl-funding-summary" }, /* @__PURE__ */ React13.createElement("span", null, tr("\u5F53\u524D\u5C0F\u65F6\u8D44\u91D1\u8D39", "Current hourly funding")), /* @__PURE__ */ React13.createElement("strong", null, funding == null ? "\u2014" : `${(funding * 100).toFixed(4)}%`), /* @__PURE__ */ React13.createElement("span", null, tr("\u6700\u8FD1 7 \u5929 \xB7 \u6309\u5C0F\u65F6\u7ED3\u7B97", "Last 7 days \xB7 hourly settlement"))), s.fundingState === "loading" ? /* @__PURE__ */ React13.createElement("div", { className: "dhl-empty" }, tr("\u6B63\u5728\u8BFB\u53D6\u8D44\u91D1\u8D39\u5386\u53F2\u2026", "Loading funding history\u2026")) : null, s.fundingState === "error" ? /* @__PURE__ */ React13.createElement("button", { type: "button", className: "dhl-ghost", onClick: () => void loadFunding() }, tr("\u52A0\u8F7D\u5931\u8D25\uFF0C\u91CD\u8BD5", "Load failed, retry")) : null, s.fundingState === "ready" && s.fundingRows.length === 0 ? /* @__PURE__ */ React13.createElement("div", { className: "dhl-empty" }, tr("\u6682\u65E0\u8D44\u91D1\u8D39\u8BB0\u5F55", "No funding records")) : null, /* @__PURE__ */ React13.createElement("div", { className: "dhl-funding-list" }, s.fundingRows.slice(-30).reverse().map((item) => {
    const rate = Number(item.fundingRate) * 100;
    return /* @__PURE__ */ React13.createElement("div", { className: "dhl-funding-row", key: item.time }, /* @__PURE__ */ React13.createElement("time", null, new Date(item.time).toLocaleString(tr("zh-CN", "en-US"), { hour12: false })), /* @__PURE__ */ React13.createElement("span", { className: rate >= 0 ? "dhl-up" : "dhl-down" }, `${rate >= 0 ? "+" : ""}${rate.toFixed(5)}%`));
  })))), /* @__PURE__ */ React13.createElement(MarketTape, { snapshot: s.snapshot })), /* @__PURE__ */ React13.createElement("div", { className: "dhl-desk-foot" }, /* @__PURE__ */ React13.createElement("div", { className: "dhl-banner" }, /* @__PURE__ */ React13.createElement("span", { className: "dhl-banner-signal", "aria-hidden": "true" }), /* @__PURE__ */ React13.createElement("span", null, /* @__PURE__ */ React13.createElement("b", null, t("banner.title", "\u4F1A\u8BDD\u9A71\u52A8\u4EA4\u6613")), " \xB7 ", t("banner.body", "\u5728\u53F3\u4FA7\u4F1A\u8BDD\u4E2D\u8BA8\u8BBA\u884C\u60C5\u3001\u98CE\u9669\u4E0E\u4EA4\u6613\u51B3\u7B56\uFF1B\u76D8\u53E3\u4EF7\u683C\u53EF\u7528\u4E8E\u8F85\u52A9\u586B\u5199\u7968\u636E\u3002"))), /* @__PURE__ */ React13.createElement(BottomTable, { account: s.account, accountError: s.accountError })));
}

// src/client/components/chat-column.tsx
var React15 = __toESM(require("react"), 1);

// src/client/components/trade-ticket.tsx
var React14 = __toESM(require("react"), 1);
function TradeTicket({ onSubmitted }) {
  const s = useStore();
  const coin = s.activeCoin;
  const market = s.markets.find((row) => row.name === coin);
  const catalogMarket = s.marketCatalog.find((row) => row.name === coin);
  const liveMid = s.snapshot?.coin === coin && Date.now() - Number(s.snapshot?.observedAt?.mids) < 1e4 ? Number(s.snapshot?.mids?.mids?.[coin] ?? s.snapshot?.mids?.[coin]) : 0;
  const mark = liveMid || Number(s.selectedMarket?.name === coin ? s.selectedMarket.ctx?.markPx : 0) || Number(market?.ctx?.markPx);
  const position = s.account?.positions?.find((p) => p.coin === coin);
  const sharedBalance = s.account?.balanceSource === "spot";
  const capacity = s.account?.tradeCapacity?.coin === coin ? s.account.tradeCapacity : null;
  const available = Number(s.account?.mode === "paper" ? s.account?.availableMargin : sharedBalance ? capacity?.availableToTrade?.length === 2 ? Math.min(...capacity.availableToTrade.map(Number)) : NaN : s.account?.withdrawable);
  const [isBuy, setIsBuy] = React14.useState(true);
  const [kind, setKind] = React14.useState("market");
  const [margin, setMargin] = React14.useState("cross");
  const [leverage, setLeverage] = React14.useState(2);
  const [size3, setSize] = React14.useState("");
  const [price, setPrice] = React14.useState("");
  const [pct, setPct] = React14.useState(0);
  const [reduceOnly, setReduceOnly] = React14.useState(false);
  const [withTargets, setWithTargets] = React14.useState(false);
  const [tp, setTp] = React14.useState("");
  const [sl, setSl] = React14.useState("");
  const [reason, setReason] = React14.useState("");
  const [enabled, setEnabled] = React14.useState(false);
  const decimals = Number(market?.szDecimals ?? 5);
  const maxLeverage = Math.max(1, Math.min(50, Number(market?.maxLeverage ?? 2), s.status?.tradingMode === "live" ? Number(s.status?.riskLimits?.maxLeverage ?? 2) : 50));
  const priceNum = kind === "limit" ? Number(price) : mark;
  const sizeNum = Number(size3);
  const orderValue = Number.isFinite(priceNum * sizeNum) ? priceNum * sizeNum : 0;
  const maxUsd = reduceOnly ? Math.abs(Number(position?.size ?? 0)) * mark : Math.min(Number(s.status?.riskLimits?.maxOrderUsd ?? 100), Math.max(0, available) * (sharedBalance ? 1 : leverage));
  const exchangeMaxSize = sharedBalance && !reduceOnly && capacity?.maxTradeSzs?.length === 2 ? Math.min(...capacity.maxTradeSzs.map(Number)) : Infinity;
  const maxSize = mark > 0 && Number.isFinite(maxUsd) && (Number.isFinite(exchangeMaxSize) || exchangeMaxSize === Infinity) ? Math.min(maxUsd / mark, exchangeMaxSize) : 0;
  const bid = Number(s.snapshot?.book?.levels?.[0]?.[0]?.px);
  const ask = Number(s.snapshot?.book?.levels?.[1]?.[0]?.px);
  const spreadPct = bid > 0 && ask > bid ? (ask / bid - 1) * 100 : null;
  React14.useEffect(() => {
    setSize("");
    setPrice("");
    setPct(0);
    setEnabled(false);
  }, [coin]);
  React14.useEffect(() => {
    const draft = s.ticketDraft;
    if (!draft || draft.coin !== coin) return;
    setIsBuy(draft.isBuy);
    setKind("limit");
    setPrice(draft.px);
  }, [s.ticketDraft?.at, coin]);
  React14.useEffect(() => {
    if (leverage > maxLeverage) setLeverage(maxLeverage);
  }, [maxLeverage, leverage]);
  const setPercent = (next) => {
    setPct(next);
    if (maxSize <= 0) {
      setSize("");
      return;
    }
    const factor = 10 ** decimals;
    setSize(String(Math.floor(maxSize * next / 100 * factor) / factor));
  };
  const errors = [];
  if (!market || catalogMarket?.tradable === false) errors.push(tr("\u5F53\u524D\u5E02\u573A\u4EC5\u652F\u6301\u884C\u60C5\u67E5\u770B\uFF0C\u5C1A\u672A\u63A5\u5165\u7B7E\u540D\u4EA4\u6613", "This market is view only; signed trading is unavailable"));
  if (isMarketStale(s)) errors.push(tr("\u884C\u60C5\u672A\u53CA\u65F6\u66F4\u65B0\uFF0C\u7B49\u5F85\u6570\u636E\u6062\u590D", "Market data is stale; waiting for recovery"));
  if (!s.accountAt || Date.now() - s.accountAt > 1e4 || s.accountError) errors.push(tr("\u8D26\u6237\u72B6\u6001\u672A\u53CA\u65F6\u66F4\u65B0", "Account state is stale"));
  if (s.account?.mode === "paper" && s.account.marksConfirmed === false) errors.push(tr("\u6A21\u62DF\u4ED3\u4F4D\u4EF7\u683C\u672A\u786E\u8BA4", "Paper position prices are unconfirmed"));
  if (!s.activeSessionId) errors.push(tr("\u5148\u9009\u62E9\u4EA4\u6613\u4F1A\u8BDD", "Choose a trading session first"));
  if (!reduceOnly && (!Number.isFinite(available) || available <= 0)) errors.push(sharedBalance ? tr("\u5F53\u524D\u5E01\u5BF9\u53EF\u4EA4\u6613\u989D\u5EA6\u672A\u786E\u8BA4\u6216\u4E0D\u8DB3", "Trading capacity is unconfirmed or insufficient") : tr("\u8D26\u6237\u6CA1\u6709\u53EF\u7528\u8D44\u91D1", "No available funds"));
  if (!Number.isFinite(sizeNum) || sizeNum <= 0) errors.push(tr("\u586B\u5199\u6709\u6548\u6570\u91CF", "Enter a valid size"));
  if (mark <= 0) errors.push(tr("\u7B49\u5F85\u5B9E\u65F6\u4EF7\u683C", "Waiting for live price"));
  if (kind === "limit" && (!Number.isFinite(priceNum) || priceNum <= 0)) errors.push(tr("\u586B\u5199\u6709\u6548\u9650\u4EF7", "Enter a valid limit price"));
  if (sizeNum > 0 && Number(sizeNum.toFixed(decimals)) !== sizeNum) errors.push(tr(`\u6570\u91CF\u6700\u591A ${decimals} \u4F4D\u5C0F\u6570`, `Size allows at most ${decimals} decimal places`));
  if (orderValue > 0 && orderValue < 10) errors.push(tr("\u8BA2\u5355\u4EF7\u503C\u4F4E\u4E8E\u4EA4\u6613\u6240\u6700\u4F4E 10 USDC", "Order value is below the 10 USDC exchange minimum"));
  if (reason.trim().length < 10 || reason.trim().length > 1e3) errors.push(tr("\u586B\u5199 10\u20131000 \u5B57\u7684\u4E0B\u5355\u539F\u56E0", "Enter an order reason of 10\u20131000 characters"));
  if (!reduceOnly && orderValue > Number(s.status?.riskLimits?.maxOrderUsd ?? 100)) errors.push(tr("\u8D85\u8FC7\u5355\u7B14\u4EA4\u6613\u9650\u989D", "Exceeds per order limit"));
  if (reduceOnly && (!position?.size || Math.sign(position.size) === (isBuy ? 1 : -1) || sizeNum > Math.abs(position.size))) errors.push(tr("\u53EA\u51CF\u4ED3\u6570\u91CF\u4E0E\u5F53\u524D\u4ED3\u4F4D\u4E0D\u5339\u914D", "Reduce only size does not match the current position"));
  if (withTargets) {
    const t2 = Number(tp);
    const stop = Number(sl);
    if (tp && !(t2 > 0 && (isBuy ? t2 > Math.max(priceNum, mark) : t2 < Math.min(priceNum, mark)))) errors.push(tr("\u6B62\u76C8\u4EF7\u4E0E\u5165\u573A\u4EF7\u6216\u5F53\u524D\u4EF7\u65B9\u5411\u4E0D\u5339\u914D", "Take profit conflicts with entry or current price"));
    if (sl && !(stop > 0 && (isBuy ? stop < Math.min(priceNum, mark) : stop > Math.max(priceNum, mark)))) errors.push(tr("\u6B62\u635F\u4EF7\u4E0E\u5165\u573A\u4EF7\u6216\u5F53\u524D\u4EF7\u65B9\u5411\u4E0D\u5339\u914D", "Stop loss conflicts with entry or current price"));
    if (!tp && !sl) errors.push(tr("\u586B\u5199\u6B62\u76C8\u6216\u6B62\u635F\u4EF7", "Enter take profit or stop loss"));
    if (reduceOnly) errors.push(tr("\u53EA\u51CF\u4ED3\u4E3B\u5355\u4E0D\u80FD\u9644\u52A0\u65B0\u7684\u6B62\u76C8\u6B62\u635F\u4FDD\u62A4\u5355", "Reduce only orders cannot add new protection orders"));
    if (s.status?.tradingMode !== "live") errors.push(tr("paper \u6682\u4E0D\u6A21\u62DF\u89E6\u53D1\u4FDD\u62A4\u5355\uFF1B\u8BF7\u79FB\u9664\u6B62\u76C8\u6B62\u635F\u6216\u5207\u6362 testnet live", "Paper mode does not simulate triggers; remove targets or use testnet live"));
  }
  const submit = () => {
    if (!enabled) {
      notify(tr("\u5148\u542F\u7528\u4EA4\u6613\u7968\u636E", "Enable the trade ticket first"));
      return;
    }
    if (errors.length) {
      notify(errors[0]);
      return;
    }
    const parts = [
      tr(`\u8BF7\u5206\u6790 ${coin} \u7684\u5B9E\u65F6\u884C\u60C5\u4E0E\u8D26\u6237\uFF0C\u51B3\u5B9A\u662F\u5426\u6267\u884C\u4EE5\u4E0B\u4EA4\u6613\u610F\u56FE\uFF1A`, `Analyze live ${coin} market and account data and decide whether to execute this trade intent:`),
      tr(
        `${isBuy ? "\u4E70\u5165/\u5F00\u591A" : "\u5356\u51FA/\u5F00\u7A7A"} ${size3} ${coin}\uFF0C${kind === "market" ? "\u5E02\u4EF7" : `\u9650\u4EF7 ${price}`}${reduceOnly ? "\uFF0C\u53EA\u51CF\u4ED3" : ""}\u3002`,
        `${isBuy ? "Buy / long" : "Sell / short"} ${size3} ${coin}, ${kind === "market" ? "market" : `limit ${price}`}${reduceOnly ? ", reduce only" : ""}.`
      ),
      tr(
        `\u7528\u6237\u586B\u5199\u7684\u4E0B\u5355\u539F\u56E0\uFF1A${reason.trim()}\u3002\u8BF7\u7ED3\u5408\u5B9E\u65F6\u6570\u636E\u72EC\u7ACB\u6838\u5BF9\uFF1B\u6267\u884C\u65F6\u628A\u6B64\u539F\u56E0\u4F20\u5165 hyper_decide.thesis\uFF08\u5B9E\u76D8\uFF09\u6216 hyper_order.reason\uFF08\u6A21\u62DF\u76D8\uFF09\u3002`,
        `User's order reason: ${reason.trim()}. Independently verify it against live data; pass it as hyper_decide.thesis (live) or hyper_order.reason (paper).`
      ),
      tr(
        `\u6760\u6746 ${leverage}x\uFF0C${margin === "cross" ? "\u5168\u4ED3" : "\u9010\u4ED3"}\uFF1B\u82E5\u5F53\u524D\u914D\u7F6E\u4E0D\u540C\uFF0C\u8BF7\u5148\u7528 hyper_order action=leverage \u8C03\u6574\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u8D26\u6237\u4E0E\u98CE\u9669\u3002`,
        `${leverage}x leverage, ${margin === "cross" ? "cross" : "isolated"} margin. If current settings differ, use hyper_order action=leverage first, then recheck account and risk.`
      ),
      withTargets ? tr(
        `\u4FDD\u62A4\u5355\u53C2\u6570\uFF1A${tp ? `takeProfitPx=${tp}` : "\u4E0D\u8BBE\u6B62\u76C8"}\uFF0C${sl ? `stopLossPx=${sl}` : "\u4E0D\u8BBE\u6B62\u635F"}\u3002hyper_decide \u548C hyper_order \u5FC5\u987B\u4F20\u5165\u76F8\u540C\u53C2\u6570\uFF0C\u4EE5 normalTpsl \u5206\u7EC4\u63D0\u4EA4\u3002\u7236\u5355\u672A\u5B8C\u5168\u6210\u4EA4\u65F6\uFF0C\u5B50\u5355\u5C1A\u672A\u751F\u6548\uFF1B\u90E8\u5206\u6210\u4EA4\u540E\u64A4\u9500\u7236\u5355\u4F1A\u64A4\u9500\u5B50\u5355\u3002\u63D0\u4EA4\u540E\u6838\u5BF9\u5B9E\u9645\u4ED3\u4F4D\u4E0E\u4FDD\u62A4\u6302\u5355\uFF0C\u82E5\u6709\u672A\u53D7\u4FDD\u62A4\u4ED3\u4F4D\uFF0C\u5148\u5904\u7406\u98CE\u9669\uFF0C\u4E0D\u8981\u5047\u5B9A\u56DE\u6267\u5373\u4EE3\u8868\u4FDD\u62A4\u5DF2\u751F\u6548\u3002`,
        `Protection: ${tp ? `takeProfitPx=${tp}` : "no take profit"}, ${sl ? `stopLossPx=${sl}` : "no stop loss"}. Pass identical parameters to hyper_decide and hyper_order, grouped as normalTpsl. Child orders are inactive until the parent fully fills; cancelling a partially filled parent cancels children. Verify actual position and resting protection orders after submission. Handle any unprotected exposure; do not assume a receipt means protection is active.`
      ) : "",
      s.status?.tradingMode === "live" ? tr(
        "\u8BF7\u5148\u6838\u5BF9\u5B9E\u65F6\u884C\u60C5\u3001\u8D26\u6237\u3001\u98CE\u9669\u4E0E\u6700\u5C0F\u4EA4\u6613\u989D\u3002\u5148\u7528 hyper_decide \u83B7\u53D6\u4E00\u6B21\u6027 decisionId\uFF0C\u518D\u7528 hyper_order \u6267\u884C\uFF1B\u82E5\u6761\u4EF6\u4E0D\u6EE1\u8DB3\uFF0C\u89E3\u91CA\u539F\u56E0\uFF0C\u4E0D\u8981\u4E0B\u5355\u3002",
        "Verify live market data, account, risk and minimum order value. Get a one-use decisionId with hyper_decide, then execute with hyper_order. If conditions fail, explain and do not trade."
      ) : tr(
        "\u8FD9\u662F\u6A21\u62DF\u76D8\u3002\u8BF7\u5148\u6838\u5BF9\u5B9E\u65F6\u884C\u60C5\u3001\u8D26\u6237\u3001\u98CE\u9669\u4E0E\u6700\u5C0F\u4EA4\u6613\u989D\uFF0C\u518D\u7528 hyper_order \u6267\u884C\uFF1B\u82E5\u6761\u4EF6\u4E0D\u6EE1\u8DB3\uFF0C\u89E3\u91CA\u539F\u56E0\uFF0C\u4E0D\u8981\u4E0B\u5355\u3002",
        "This is paper mode. Verify live market data, account, risk and minimum order value, then execute with hyper_order. If conditions fail, explain and do not trade."
      )
    ];
    if (queueToAgent(parts.filter(Boolean).join("\n"))) onSubmitted?.();
  };
  return /* @__PURE__ */ React14.createElement("section", { className: "dhl-ticket", "aria-label": tr("\u4EA4\u6613\u7968\u636E", "Trade ticket") }, /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-mode" }, /* @__PURE__ */ React14.createElement("label", null, tr("\u4FDD\u8BC1\u91D1\u6A21\u5F0F", "Margin mode"), /* @__PURE__ */ React14.createElement("select", { value: margin, onChange: (e) => setMargin(e.target.value) }, /* @__PURE__ */ React14.createElement("option", { value: "cross" }, tr("\u5168\u4ED3", "Cross")), /* @__PURE__ */ React14.createElement("option", { value: "isolated" }, tr("\u9010\u4ED3", "Isolated")))), /* @__PURE__ */ React14.createElement("label", null, tr("\u6760\u6746", "Leverage"), /* @__PURE__ */ React14.createElement("select", { value: leverage, onChange: (e) => setLeverage(Number(e.target.value)) }, Array.from({ length: maxLeverage }, (_, i) => i + 1).map((v) => /* @__PURE__ */ React14.createElement("option", { key: v, value: v }, v, "x"))))), /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-tabs", role: "tablist", "aria-label": tr("\u8BA2\u5355\u7C7B\u578B", "Order type") }, /* @__PURE__ */ React14.createElement("button", { type: "button", role: "tab", "aria-selected": kind === "market", className: kind === "market" ? "on" : "", onClick: () => setKind("market") }, tr("\u5E02\u4EF7", "Market")), /* @__PURE__ */ React14.createElement("button", { type: "button", role: "tab", "aria-selected": kind === "limit", className: kind === "limit" ? "on" : "", onClick: () => setKind("limit") }, tr("\u9650\u4EF7", "Limit"))), /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-sides", role: "group", "aria-label": tr("\u4EA4\u6613\u65B9\u5411", "Trade side") }, /* @__PURE__ */ React14.createElement("button", { type: "button", className: isBuy ? "buy on" : "buy", "aria-pressed": isBuy, onClick: () => setIsBuy(true) }, tr("\u4E70\u5165 / \u505A\u591A", "Buy / Long")), /* @__PURE__ */ React14.createElement("button", { type: "button", className: !isBuy ? "sell on" : "sell", "aria-pressed": !isBuy, onClick: () => setIsBuy(false) }, tr("\u5356\u51FA / \u505A\u7A7A", "Sell / Short"))), /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-balance" }, /* @__PURE__ */ React14.createElement("span", null, tr("\u53EF\u7528\u8D44\u91D1", "Available")), /* @__PURE__ */ React14.createElement("strong", null, Number.isFinite(available) ? fmt(available) : "\u2014", " USDC")), /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-balance" }, /* @__PURE__ */ React14.createElement("span", null, tr("\u5F53\u524D\u4ED3\u4F4D", "Current position")), /* @__PURE__ */ React14.createElement("strong", null, position ? fmt(position.size, decimals) : fmt(0, decimals), " ", coin)), kind === "limit" ? /* @__PURE__ */ React14.createElement("label", { className: "dhl-ticket-field" }, /* @__PURE__ */ React14.createElement("span", null, tr("\u9650\u4EF7", "Limit price")), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("input", { type: "number", min: "0", value: price, onChange: (e) => setPrice(e.target.value), placeholder: fmtPrice(mark) }), /* @__PURE__ */ React14.createElement("small", null, "USDC"))) : null, /* @__PURE__ */ React14.createElement("label", { className: "dhl-ticket-field" }, /* @__PURE__ */ React14.createElement("span", null, tr("\u6570\u91CF", "Size")), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("input", { type: "number", min: "0", step: 10 ** -decimals, value: size3, onChange: (e) => {
    setSize(e.target.value);
    setPct(0);
  }, placeholder: "0" }), /* @__PURE__ */ React14.createElement("small", null, coin))), /* @__PURE__ */ React14.createElement("label", { className: "dhl-ticket-reason" }, /* @__PURE__ */ React14.createElement("span", null, tr("\u4E0B\u5355\u539F\u56E0", "Order reason")), /* @__PURE__ */ React14.createElement("textarea", { value: reason, maxLength: 1e3, onChange: (e) => setReason(e.target.value), placeholder: tr("\u5199\u4E0B\u4EA4\u6613\u4F9D\u636E\u3001\u5931\u6548\u6761\u4EF6\u4E0E\u98CE\u9669", "Record the thesis, invalidation and risk"), rows: 3 })), /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-range" }, /* @__PURE__ */ React14.createElement("input", { type: "range", min: "0", max: "100", step: "25", value: pct, onChange: (e) => setPercent(Number(e.target.value)), "aria-label": tr("\u4F7F\u7528\u53EF\u7528\u989D\u5EA6\u767E\u5206\u6BD4", "Percent of available capacity") }), /* @__PURE__ */ React14.createElement("output", null, pct, "%")), /* @__PURE__ */ React14.createElement("label", { className: "dhl-ticket-check" }, /* @__PURE__ */ React14.createElement("input", { type: "checkbox", checked: reduceOnly, onChange: (e) => setReduceOnly(e.target.checked) }), tr("\u53EA\u51CF\u4ED3", "Reduce only")), /* @__PURE__ */ React14.createElement("label", { className: "dhl-ticket-check" }, /* @__PURE__ */ React14.createElement("input", { type: "checkbox", checked: withTargets, onChange: (e) => setWithTargets(e.target.checked) }), tr("\u6B62\u76C8 / \u6B62\u635F", "Take profit / Stop loss")), withTargets ? /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-targets" }, /* @__PURE__ */ React14.createElement("label", null, tr("\u6B62\u76C8\u4EF7", "Take profit"), /* @__PURE__ */ React14.createElement("input", { type: "number", min: "0", value: tp, onChange: (e) => setTp(e.target.value), placeholder: tr("\u53EF\u9009", "Optional") })), /* @__PURE__ */ React14.createElement("label", null, tr("\u6B62\u635F\u4EF7", "Stop loss"), /* @__PURE__ */ React14.createElement("input", { type: "number", min: "0", value: sl, onChange: (e) => setSl(e.target.value), placeholder: tr("\u53EF\u9009", "Optional") })), /* @__PURE__ */ React14.createElement("p", { className: "dhl-ticket-validation" }, tr("\u7236\u5355\u672A\u5B8C\u5168\u6210\u4EA4\u65F6\uFF0C\u6B62\u76C8\u6B62\u635F\u5C1A\u672A\u751F\u6548\uFF1B\u90E8\u5206\u6210\u4EA4\u540E\u64A4\u9500\u7236\u5355\u4F1A\u64A4\u9500\u5B50\u5355\u3002\u63D0\u4EA4\u540E\u8BF7\u6838\u5BF9\u4ED3\u4F4D\u4E0E\u5B9E\u9645\u4FDD\u62A4\u6302\u5355\u3002\u6A21\u62DF\u76D8\u6682\u4E0D\u652F\u6301\u89E6\u53D1\u5355\u3002", "Targets are inactive until the parent fully fills. Cancelling a partially filled parent cancels its children. Verify the final position and protection orders. Paper mode does not simulate triggers."))) : null, !enabled ? /* @__PURE__ */ React14.createElement("button", { type: "button", className: "dhl-ticket-enable", onClick: () => setEnabled(true) }, tr("\u542F\u7528\u4EA4\u6613\u7968\u636E", "Enable trade ticket")) : /* @__PURE__ */ React14.createElement("button", { type: "button", className: "dhl-ticket-submit", onClick: submit, disabled: errors.length > 0 }, tr("\u63D0\u4EA4\u5230\u4EA4\u6613\u4F1A\u8BDD", "Send to trading chat")), enabled && errors.length > 0 ? /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-validation", role: "status" }, errors[0]) : null, s.accountError ? /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-validation", role: "status" }, tr("\u8D26\u6237\u8BFB\u53D6\u5931\u8D25", "Account read failed"), "\uFF1A", s.accountError) : null, /* @__PURE__ */ React14.createElement("div", { className: "dhl-ticket-summary" }, /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", null, tr("\u8BA2\u5355\u4EF7\u503C", "Order value")), /* @__PURE__ */ React14.createElement("strong", null, orderValue > 0 ? `${fmt(orderValue)} USDC` : "\u2014")), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", null, tr("\u9884\u4F30\u4FDD\u8BC1\u91D1", "Estimated margin")), /* @__PURE__ */ React14.createElement("strong", null, orderValue > 0 ? `${fmt(orderValue / leverage)} USDC` : "\u2014")), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", null, tr("\u53C2\u8003\u4EF7\u5DEE", "Reference spread")), /* @__PURE__ */ React14.createElement("strong", null, spreadPct == null ? "\u2014" : `${spreadPct.toFixed(3)}%`)), /* @__PURE__ */ React14.createElement("div", null, /* @__PURE__ */ React14.createElement("span", null, tr("\u624B\u7EED\u8D39", "Fees")), /* @__PURE__ */ React14.createElement("strong", null, tr("\u4EA4\u6613\u6240\u7ED3\u7B97", "Charged by exchange")))), /* @__PURE__ */ React14.createElement("p", { className: "dhl-ticket-note" }, tr("\u7968\u636E\u53EA\u63D0\u4EA4\u4EA4\u6613\u610F\u56FE\u3002\u5B9E\u9645\u4EF7\u683C\u3001\u6760\u6746\u4E0E\u8D26\u6237\u98CE\u9669\u7531\u4F1A\u8BDD\u5728\u6267\u884C\u524D\u91CD\u65B0\u6838\u5BF9\u3002", "The ticket submits a trade intent. The chat rechecks price, leverage, and account risk before execution.")), s.account?.mode === "paper" ? /* @__PURE__ */ React14.createElement("p", { className: "dhl-ticket-note" }, tr(s.account.simulation, "Fixed slippage; order book depth, fees, funding and liquidation are not simulated.")) : null);
}

// src/client/components/chat-column.tsx
function FixedChatView({ renderSlot }) {
  return /* @__PURE__ */ React15.createElement(React15.Fragment, null, renderSlot("conversation.session", { view: "chat" }));
}
function ChatColumn({ width, fill = false, onCollapse, SessionProvider, renderFactorySlot }) {
  const s = useStore();
  const activeId = s.activeSessionId;
  const nativeKnown = Boolean(activeId && s.nativeSessionIds.includes(activeId));
  const [bindError, setBindError] = React15.useState(null);
  const [ref, setRef] = React15.useState(null);
  const [legacy, setLegacy] = React15.useState(false);
  const [showTicket, setShowTicket] = React15.useState(false);
  React15.useEffect(() => {
    if (s.ticketDraft) setShowTicket(true);
  }, [s.ticketDraft?.at]);
  React15.useEffect(() => {
    setShowTicket(false);
  }, [s.activeSessionId]);
  React15.useEffect(() => {
    setActiveRef(null);
    setRef(null);
    setLegacy(false);
    setBindError(null);
    if (!activeId) return void 0;
    let cancelled = false;
    let retained = null;
    const setup = async () => {
      try {
        const sessionsSvc = getContext()?.get("sessions");
        if (!sessionsSvc) throw new Error(tr("sessions \u670D\u52A1\u4E0D\u53EF\u7528", "DSH sessions service unavailable"));
        const nativeList = sessionsSvc.list?.get?.();
        if (nativeList && !nativeList.byId?.[activeId]) {
          if (nativeList.phase === "ready") throw new Error(tr("\u8BE5\u4EA4\u6613\u4F1A\u8BDD\u5DF2\u4E0D\u5728 DSH \u4F1A\u8BDD\u5217\u8868\u4E2D", "This trading session no longer exists in DSH"));
          return;
        }
        if (typeof sessionsSvc.retain !== "function") {
          sessionsSvc.open(activeId);
          const binding = sessionsSvc.binding?.(activeId);
          if (binding) setActiveRef({ binding });
          if (!cancelled) setLegacy(true);
          return;
        }
        retained = sessionsSvc.retain(activeId, { source: "dsh-hyperliquid.desk" });
        await retained.ready;
        if (cancelled) {
          try {
            retained.release?.();
          } catch {
          }
          return;
        }
        setActiveRef(retained);
        setRef(retained);
      } catch (e) {
        if (!cancelled) setBindError(String(e?.message ?? e));
      }
    };
    void setup();
    return () => {
      cancelled = true;
      setActiveRef(null);
      try {
        retained?.release?.();
      } catch {
      }
    };
  }, [activeId, nativeKnown, s.nativeSessionsReady]);
  const title = React15.useMemo(() => {
    if (!activeId) return "";
    const row = getContext()?.get("sessions")?.list?.get?.()?.byId?.[activeId];
    return s.sessionTitles?.[activeId] ?? row?.displayTitle ?? s.sessions.find((r) => r.sessionId === activeId)?.title ?? t("session.defaultTitle", "Hyperliquid \u4EA4\u6613\u4F1A\u8BDD");
  }, [activeId, s.sessions, s.sessionTitles, s.localeRevision]);
  const readyRef = ref?.sessionId === activeId ? ref : null;
  const pendingQuotes = s.chartReferences.filter((item) => item.sessionId === activeId);
  React15.useEffect(() => {
    if (pendingQuotes.length && showTicket) setShowTicket(false);
  }, [pendingQuotes.length, showTicket]);
  React15.useEffect(() => {
    if (!pendingQuotes.length || !readyRef || showTicket) return;
    const sessionCtx = readyRef.binding?.ctx;
    const input = sessionCtx ? getContext()?.get("conversation")?.input?.for?.(sessionCtx) : null;
    const actions = input?.actions;
    if (!actions?.captureInsertion || !actions?.insertText || !input?.state?.getSnapshot) {
      notify(tr("\u5F53\u524D DSH \u8F93\u5165\u6846\u65E0\u6CD5\u63A5\u6536\u56FE\u8868\u5F15\u7528", "This DSH composer cannot accept chart quotes"));
      store.patch((current2) => ({ chartReferences: current2.chartReferences.filter((item) => item.sessionId !== activeId) }));
      return;
    }
    const inserted = [];
    for (const quote of pendingQuotes) {
      const draft = String(input.state.getSnapshot().draft ?? "");
      const captured = actions.captureInsertion();
      const span = { ...captured, start: captured.end };
      const text = `${draft ? "\n\n" : ""}${quote.text}`;
      if (!actions.insertText(text, span)) break;
      inserted.push(quote.id);
    }
    if (inserted.length) {
      store.patch((current2) => ({ chartReferences: current2.chartReferences.filter((item) => !inserted.includes(item.id)) }));
      requestAnimationFrame(() => input.focus?.());
    }
  }, [activeId, readyRef, showTicket, s.chartReferences]);
  const askMarket = React15.useCallback(() => {
    queueToAgent(tr(
      `\u8BF7\u8C03\u7528 hyper_context \u8BFB\u53D6\u5F53\u524D\u4EA4\u6613\u53F0\u7684 ${s.activeCoin} \u5B9E\u65F6\u884C\u60C5\u3001\u76D8\u53E3\u548C\u8D26\u6237\u4FE1\u606F\uFF0C\u6982\u62EC\u5E02\u573A\u72B6\u6001\u3001\u5173\u952E\u98CE\u9669\u4E0E\u53EF\u80FD\u7684\u4EA4\u6613\u6761\u4EF6\u3002\u4EC5\u5206\u6790\uFF0C\u4E0D\u8981\u4E0B\u5355\u3002`,
      `Use hyper_context to read live ${s.activeCoin} market data, order book and account state. Summarize conditions, key risks and possible trade criteria. Analysis only; do not place an order.`
    ));
  }, [s.activeCoin]);
  const askRisk = React15.useCallback(() => {
    queueToAgent(tr(
      `\u8BF7\u8C03\u7528 hyper_context \u68C0\u67E5\u5F53\u524D\u4EA4\u6613\u4F1A\u8BDD\u7684\u8D26\u6237\u3001${s.activeCoin} \u4ED3\u4F4D\u3001\u6760\u6746\u3001\u6302\u5355\u548C\u98CE\u9669\u9650\u989D\uFF0C\u6307\u51FA\u9700\u8981\u6CE8\u610F\u7684\u98CE\u9669\u4E0E\u53EF\u91C7\u53D6\u7684\u7BA1\u7406\u52A8\u4F5C\u3002\u4EC5\u5206\u6790\uFF0C\u4E0D\u8981\u4E0B\u5355\u6216\u64A4\u5355\u3002`,
      `Use hyper_context to review the account, ${s.activeCoin} position, leverage, open orders and risk limits. Identify risks and possible management actions. Analysis only; do not place or cancel orders.`
    ));
  }, [s.activeCoin]);
  const content = !activeId ? /* @__PURE__ */ React15.createElement("div", { className: "dhl-empty" }, t("chat.noSession", "\u9009\u62E9\u5DE6\u4FA7\u4EA4\u6613\u4F1A\u8BDD\uFF0C\u5728\u8FD9\u91CC\u76F4\u63A5\u4E0E\u4EA4\u6613 agent \u5BF9\u8BDD\u3002")) : bindError ? /* @__PURE__ */ React15.createElement("div", { className: "dhl-inline-error", role: "alert" }, t("chat.bindError", "\u4F1A\u8BDD\u7ED1\u5B9A\u5931\u8D25\uFF1A") + bindError) : legacy ? /* @__PURE__ */ React15.createElement("div", { className: "dhl-chat-unavailable", role: "alert" }, t("chat.upgrade", "\u5F53\u524D DSH \u7248\u672C\u4E0D\u652F\u6301\u5D4C\u5165\u539F\u751F\u4F1A\u8BDD\uFF1B\u8BF7\u4F7F\u7528 DSH 0.2 \u6216\u66F4\u65B0\u7248\u672C\u3002")) : !readyRef ? /* @__PURE__ */ React15.createElement("div", { className: "dhl-empty" }, t("chat.linking", "\u6B63\u5728\u63A5\u5165\u4F1A\u8BDD\u2026")) : !SessionProvider || !renderFactorySlot ? /* @__PURE__ */ React15.createElement("div", { className: "dhl-inline-error", role: "alert" }, t("chat.noFactory", "DSH \u539F\u751F\u4F1A\u8BDD\u7EC4\u4EF6\u4E0D\u53EF\u7528\u3002")) : /* @__PURE__ */ React15.createElement("div", { className: "dhl-chatmount", "data-trading-session": activeId }, /* @__PURE__ */ React15.createElement(SessionProvider, { session: readyRef }, renderFactorySlot("conversation.content", { variant: "embedded", phase: "active", hero: false }, { slots: { views: FixedChatView } })));
  return /* @__PURE__ */ React15.createElement("div", { id: "dhl-panel-chat", className: "dhl-col-chat", style: fill ? { flex: "1 1 0", width: "auto" } : width ? { width } : void 0 }, /* @__PURE__ */ React15.createElement("div", { className: "dhl-chat-header" }, /* @__PURE__ */ React15.createElement("div", { className: "dhl-chat-heading" }, /* @__PURE__ */ React15.createElement("strong", null, t("chat.title", "\u4EA4\u6613\u4F1A\u8BDD")), activeId ? /* @__PURE__ */ React15.createElement("span", { title }, title) : null), /* @__PURE__ */ React15.createElement("button", { type: "button", className: "dhl-chat-ticket-toggle", "aria-expanded": showTicket, onClick: () => setShowTicket((value) => !value) }, showTicket ? t("chat.back", "\u8FD4\u56DE\u4F1A\u8BDD") : t("chat.ticket", "\u4EA4\u6613\u7968\u636E")), /* @__PURE__ */ React15.createElement("button", { className: "dhl-panel-iconbtn", type: "button", onClick: onCollapse, "aria-label": tr("\u6536\u8D77\u5BF9\u8BDD\u680F", "Collapse chat"), title: tr("\u6536\u8D77\u5BF9\u8BDD\u680F", "Collapse chat") }, /* @__PURE__ */ React15.createElement(FoldIcon, { direction: "right" }))), activeId && !showTicket && !legacy ? /* @__PURE__ */ React15.createElement("div", { className: "dhl-chat-prompts", role: "group", "aria-label": t("chat.prompts", "\u5FEB\u6377\u63D0\u95EE") }, /* @__PURE__ */ React15.createElement("button", { type: "button", onClick: askMarket }, t("chat.analyze", "\u5206\u6790\u884C\u60C5")), /* @__PURE__ */ React15.createElement("button", { type: "button", onClick: askRisk }, t("chat.risk", "\u68C0\u67E5\u98CE\u9669"))) : null, showTicket ? /* @__PURE__ */ React15.createElement(TradeTicket, { key: activeId ?? "anonymous", onSubmitted: () => setShowTicket(false) }) : content);
}

// src/client/components/wallet-details.tsx
var React16 = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");
var PERIODS = [
  ["day", "24 \u5C0F\u65F6", "24h"],
  ["week", "7 \u5929", "7d"],
  ["month", "30 \u5929", "30d"],
  ["allTime", "\u5168\u90E8", "All"]
];
function ProfitLine({ points: points2 }) {
  const values = points2.map((row) => Number(row[1])).filter(Number.isFinite);
  if (values.length < 2) return null;
  const min2 = Math.min(...values);
  const span = Math.max(...values) - min2 || 1;
  const path = values.map((value, index) => `${index ? "L" : "M"}${(index / (values.length - 1) * 100).toFixed(2)},${(40 - (value - min2) / span * 36).toFixed(2)}`).join(" ");
  return /* @__PURE__ */ React16.createElement("svg", { className: "dhl-wallet-graph", viewBox: "0 0 100 44", preserveAspectRatio: "none", role: "img", "aria-label": tr("\u6536\u76CA\u8D70\u52BF", "P&L trend") }, /* @__PURE__ */ React16.createElement("path", { d: path, fill: "none", stroke: "currentColor", strokeWidth: "1.5", vectorEffect: "non-scaling-stroke" }));
}
function WalletDetails({ open, onClose }) {
  const s = useStore();
  const [period, setPeriod] = React16.useState("day");
  const [portfolio, setPortfolio] = React16.useState(null);
  const [error, setError] = React16.useState(null);
  const [loading, setLoading] = React16.useState(false);
  React16.useEffect(() => {
    if (!open) return void 0;
    let active = true;
    setPortfolio(null);
    setError(null);
    setLoading(true);
    void hyperCall("portfolio").then((result) => {
      if (active) setPortfolio(result);
    }).catch((e) => {
      if (active) setError(String(e?.message ?? e));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [open, s.status?.network, s.status?.tradingMode, s.status?.address]);
  const account = s.account;
  const shared = account?.balanceSource === "spot";
  const sample = portfolio?.series?.[period];
  const pnl = sample?.pnlHistory?.length ? Number(sample.pnlHistory.at(-1)[1]) : NaN;
  const value = sample?.accountValueHistory?.length ? Number(sample.accountValueHistory.at(-1)[1]) : NaN;
  const stats = account?.mode === "paper" ? [
    [tr("\u8D26\u6237\u6743\u76CA", "Equity"), `${fmt(account.equity)} USDC`],
    [tr("\u53EF\u7528\u4FDD\u8BC1\u91D1", "Available margin"), `${fmt(account.availableMargin)} USDC`],
    [tr("\u7D2F\u8BA1\u5DF2\u5B9E\u73B0\u6536\u76CA", "Total realized P&L"), `${fmt(portfolio?.realizedPnl)} USDC`],
    [tr("\u672A\u5B9E\u73B0\u6536\u76CA", "Unrealized P&L"), `${fmt(account.uPnl)} USDC`]
  ] : [
    [shared ? tr("USDC \u4F59\u989D", "USDC balance") : tr("\u6C38\u7EED\u8D26\u6237\u4EF7\u503C", "Perp account value"), `${fmt(shared ? account?.usdcBalance : account?.marginSummary?.accountValue)} USDC`],
    [shared ? tr("\u672A\u5360\u7528 USDC", "Unheld USDC") : tr("\u53EF\u63D0\u53D6", "Withdrawable"), `${fmt(shared ? account?.unheldUsdc : account?.withdrawable)} USDC`],
    [tr("\u5F53\u524D\u4ED3\u4F4D\u672A\u5B9E\u73B0\u6536\u76CA", "Open position P&L"), `${fmt((account?.positions ?? []).reduce((sum, p) => sum + Number(p.uPnl ?? 0), 0))} USDC`],
    [tr("\u4EA4\u6613\u6240\u7EC4\u5408\u8D26\u6237\u4EF7\u503C", "Exchange portfolio value"), Number.isFinite(value) ? `${fmt(value)} USDC` : "\u2014"]
  ];
  return /* @__PURE__ */ React16.createElement(import_dsh_client_ui_primitives3.Modal, { open, onClose, title: tr("\u94B1\u5305\u8BE6\u60C5\u4E0E\u6536\u76CA", "Wallet and P&L"), closeLabel: tr("\u5173\u95ED", "Close"), className: "dhl-wallet-modal" }, /* @__PURE__ */ React16.createElement("div", { className: "dhl-wallet-address" }, s.status?.address ?? tr("\u6A21\u62DF\u8D26\u6237 \xB7 \u672C\u5730\u8D26\u672C", "Paper account \xB7 local ledger")), /* @__PURE__ */ React16.createElement("div", { className: "dhl-wallet-stats" }, stats.map(([label, amount]) => /* @__PURE__ */ React16.createElement("div", { key: label }, /* @__PURE__ */ React16.createElement("span", null, label), /* @__PURE__ */ React16.createElement("strong", null, amount)))), account?.mode === "live" ? /* @__PURE__ */ React16.createElement(React16.Fragment, null, /* @__PURE__ */ React16.createElement("div", { className: "dhl-wallet-periods" }, PERIODS.map(([id, zh, en]) => /* @__PURE__ */ React16.createElement("button", { type: "button", key: id, className: period === id ? "on" : "", onClick: () => setPeriod(id) }, tr(zh, en)))), /* @__PURE__ */ React16.createElement("div", { className: "dhl-wallet-pnl" }, /* @__PURE__ */ React16.createElement("span", null, tr("\u671F\u95F4\u6536\u76CA", "Period P&L")), /* @__PURE__ */ React16.createElement("strong", { className: pnl >= 0 ? "dhl-up" : "dhl-down" }, Number.isFinite(pnl) ? `${pnl >= 0 ? "+" : ""}${fmt(pnl)} USDC` : "\u2014")), /* @__PURE__ */ React16.createElement(ProfitLine, { points: sample?.pnlHistory ?? [] }), /* @__PURE__ */ React16.createElement("p", { className: "dhl-ticket-note" }, tr("\u6536\u76CA\u66F2\u7EBF\u4F7F\u7528 Hyperliquid \u7EC4\u5408\u8D26\u6237\u6837\u672C\uFF08\u542B\u5165\u51FA\u91D1\u8C03\u6574\uFF09\uFF1B\u4E0E\u5F53\u524D\u53EF\u4EA4\u6613\u4F59\u989D\u53E3\u5F84\u4E0D\u540C\u3002", "P&L uses Hyperliquid portfolio samples adjusted for deposits and withdrawals; it differs from tradable balance."))) : /* @__PURE__ */ React16.createElement("p", { className: "dhl-ticket-note" }, tr("\u6A21\u62DF\u76D8\u6536\u76CA\u6309\u672C\u5730\u6210\u4EA4\u4E0E\u5F53\u524D\u6807\u8BB0\u4EF7\u683C\u8BA1\u7B97\uFF0C\u672A\u8BA1\u624B\u7EED\u8D39\u3001\u8D44\u91D1\u8D39\u53CA\u5F3A\u5E73\u3002", "Paper P&L uses local fills and current marks, excluding fees, funding and liquidation.")), loading ? /* @__PURE__ */ React16.createElement("div", { className: "dhl-empty" }, tr("\u6B63\u5728\u8BFB\u53D6\u6536\u76CA\u2026", "Loading P&L\u2026")) : null, error ? /* @__PURE__ */ React16.createElement("div", { className: "dhl-inline-error", role: "status" }, error) : null);
}

// src/client/components/trading-limits.tsx
var React17 = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives4 = require("@deepseek-ai/dsh-client-ui-primitives");
function TradingLimits({ open, onClose }) {
  const st = useStore().status;
  const limits = st?.riskLimits;
  const paper = st?.tradingMode === "paper";
  const used = Number(limits?.usedTodayUsd ?? 0);
  const daily = Number(limits?.maxDailyUsd ?? 0);
  const rows = limits ? [
    [tr("\u5141\u8BB8\u5F00\u4ED3\u5E01\u5BF9", "Coins allowed to open"), (limits.allowedCoins ?? []).join(", ") || "\u2014"],
    [tr("\u5355\u7B14\u540D\u4E49\u4EF7\u503C\u4E0A\u9650", "Max per order"), `${fmt(limits.maxOrderUsd)} USD`],
    [tr("\u4ECA\u65E5\u5F00\u4ED3\u989D\u5EA6\uFF08UTC\uFF09", "Daily opening budget (UTC)"), `${fmt(used)} / ${fmt(daily)} USD`],
    [tr("\u5355\u5E01\u4ED3\u4F4D\u4E0A\u9650", "Max position per coin"), `${fmt(limits.maxPositionUsd)} USD`],
    [tr("\u6760\u6746\u4E0A\u9650", "Max leverage"), `${fmt(limits.maxLeverage, 0)}x`]
  ] : [];
  return /* @__PURE__ */ React17.createElement(import_dsh_client_ui_primitives4.Modal, { open, onClose, title: tr("\u4EA4\u6613\u9650\u989D\u4E0E\u7B7E\u540D\u89C4\u5219", "Trading limits & signing rules"), closeLabel: tr("\u5173\u95ED", "Close"), className: "dhl-limits-modal" }, /* @__PURE__ */ React17.createElement("section", { className: "dhl-limits-section" }, /* @__PURE__ */ React17.createElement("h3", null, tr("\u4EA4\u6613\u9650\u989D \xB7 \u4EA4\u6613\u53F0", "Trading limits \xB7 desk"), /* @__PURE__ */ React17.createElement("span", { className: "dhl-badge" }, paper ? tr("\u6A21\u62DF\u76D8\u8D26\u672C", "Paper ledger") : tr("\u5B9E\u76D8\u8D26\u672C", "Live ledger"))), rows.length ? /* @__PURE__ */ React17.createElement("div", { className: "dhl-wallet-stats" }, rows.map(([label, value]) => /* @__PURE__ */ React17.createElement("div", { key: label }, /* @__PURE__ */ React17.createElement("span", null, label), /* @__PURE__ */ React17.createElement("strong", null, value)))) : /* @__PURE__ */ React17.createElement("div", { className: "dhl-empty" }, tr("\u6B63\u5728\u8BFB\u53D6\u2026", "Loading\u2026")), /* @__PURE__ */ React17.createElement("p", { className: "dhl-ticket-note" }, tr(
    "\u7531 dsh-hyperliquid \u63D2\u4EF6\u914D\u7F6E\u51B3\u5B9A\uFF0C\u6A21\u62DF\u76D8\u548C\u5B9E\u76D8\u90FD\u4F1A\u68C0\u67E5\uFF0C\u6BCF\u65E5\u989D\u5EA6\u4E24\u8FB9\u5206\u5F00\u8BB0\u8D26\uFF1B\u51CF\u4ED3\u4E0E\u5E73\u4ED3\u4E0D\u53D7\u9650\u3002agent \u81EA\u4E3B\u4E0B\u5355\u4E0E\u4F60\u586B\u5199\u7684\u7968\u636E\u90FD\u53D7\u540C\u4E00\u5957\u9650\u989D\u7EA6\u675F\u3002\u4FEE\u6539\u65B9\u5F0F\uFF1ADSH \u8BBE\u7F6E\u4E2D\u7684 hyperliquid \u63D2\u4EF6\u914D\u7F6E\uFF0C\u6216 profile \u7684 cordis.patch.yml \u91CC id: hyperliquid \u4E0B\u7684 allowedCoins / maxOrderUsd / maxDailyUsd / maxPositionUsd / maxLeverage\uFF0C\u91CD\u542F\u540E\u751F\u6548\u3002",
    "Set by the dsh-hyperliquid plugin config and checked in both paper and live, with separate daily budgets; reducing or closing is never blocked. Agent orders and your tickets share these limits. Change them in the hyperliquid plugin config in DSH Settings, or allowedCoins / maxOrderUsd / maxDailyUsd / maxPositionUsd / maxLeverage under id: hyperliquid in the profile cordis.patch.yml; restart to apply."
  ))), /* @__PURE__ */ React17.createElement("section", { className: "dhl-limits-section" }, /* @__PURE__ */ React17.createElement("h3", null, tr("\u94B1\u5305\u7B7E\u540D \xB7 \u4E0E\u4EA4\u6613\u9650\u989D\u65E0\u5173", "Wallet signing \xB7 separate from limits")), /* @__PURE__ */ React17.createElement("p", { className: "dhl-ticket-note" }, paper ? tr("\u6A21\u62DF\u76D8\u5728\u672C\u5730\u64AE\u5408\uFF0C\u4E0D\u7B7E\u540D\uFF0C\u4E5F\u4E0D\u7ECF\u8FC7\u4EFB\u4F55\u94B1\u5305\u89C4\u5219\u3002", "Paper orders fill locally; nothing is signed and no wallet rules apply.") : st?.signer === "web3" ? tr(
    "\u5B9E\u76D8\u8BA2\u5355\u901A\u8FC7\u9650\u989D\u68C0\u67E5\u540E\uFF0C\u8FD8\u8981\u4EA4\u7ED9 dsh-web3 \u94B1\u5305\u7B7E\u540D\u3002\u94B1\u5305\u6309\u81EA\u5DF1\u7684\u7B7E\u540D\u7B56\u7565\u51B3\u5B9A\u8FD9\u6B21\u7B7E\u540D\u662F\u81EA\u52A8\u901A\u8FC7\u3001\u9700\u8981\u4F60\u786E\u8BA4\u8FD8\u662F\u62D2\u7EDD\uFF1B\u5B83\u4E0D\u77E5\u9053\u4E5F\u4E0D\u68C0\u67E5\u4E0A\u9762\u7684\u4EA4\u6613\u9650\u989D\u3002\u7B7E\u540D\u7B56\u7565\u5728 DSH \u8BBE\u7F6E \u2192 Web3 \u94B1\u5305\u4E2D\u7BA1\u7406\u3002",
    "After passing the limits above, a live order is signed by the dsh-web3 wallet. Its signing policy decides whether that signature is automatic, needs your approval or is refused; it neither knows nor checks the trading limits. Manage it in DSH Settings \u2192 Web3 wallet."
  ) : tr("\u5B9E\u76D8\u4F7F\u7528\u63D2\u4EF6\u914D\u7F6E\u4E2D\u7684\u79C1\u94A5\u76F4\u63A5\u7B7E\u540D\uFF0C\u6CA1\u6709\u989D\u5916\u7684\u94B1\u5305\u5BA1\u6279\uFF1B\u53EA\u6709\u4E0A\u9762\u7684\u4EA4\u6613\u9650\u989D\u5728\u628A\u5173\u3002", "Live orders are signed with the configured private key; there is no separate wallet approval, only the trading limits above.")), !paper && !st?.autonomousLive ? /* @__PURE__ */ React17.createElement("p", { className: "dhl-ticket-note" }, tr("autonomousLive \u5173\u95ED\uFF1Aagent \u6BCF\u7B14\u5B9E\u76D8\u4E0B\u5355\u3001\u6539\u6760\u6746\u524D\u90FD\u4F1A\u5F39\u51FA DSH \u5BA1\u6279\uFF0C\u9700\u8981\u4F60\u6279\u51C6\u3002", "autonomousLive is off: every live order or leverage change by the agent waits for your DSH approval.")) : null));
}

// src/client/app.tsx
function App(props) {
  const s = useStore();
  const st = s.status;
  const marketStale = isMarketStale(s);
  const [confirmLive, setConfirmLive] = React18.useState(null);
  const [networkBusy, setNetworkBusy] = React18.useState(false);
  const [walletOpen, setWalletOpen] = React18.useState(false);
  const [moreOpen, setMoreOpen] = React18.useState(false);
  const [limitsOpen, setLimitsOpen] = React18.useState(false);
  const moreRef = React18.useRef(null);
  const network = st?.network === "testnet" ? "testnet" : "mainnet";
  const mode = st?.tradingMode === "paper" ? "paper" : "live";
  const applyEnv = React18.useCallback(async (next) => {
    setNetworkBusy(true);
    try {
      const current2 = store.get().status;
      if (next.network !== current2?.network) await switchNetwork(next.network);
      if (next.mode !== current2?.tradingMode) await switchTradingMode(next.mode);
    } catch (error) {
      notify(t("network.switchFailed", "\u5207\u6362\u5931\u8D25") + "\uFF1A" + String(error?.message ?? error));
    } finally {
      setNetworkBusy(false);
      setConfirmLive(null);
    }
  }, []);
  const requestEnv = React18.useCallback((next) => {
    setMoreOpen(false);
    if (next.network === "mainnet" && next.mode === "live") setConfirmLive(next);
    else void applyEnv(next);
  }, [applyEnv]);
  React18.useEffect(() => {
    if (!moreOpen) return void 0;
    const onDown = (event) => {
      if (!moreRef.current?.contains(event.target)) setMoreOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);
  React18.useEffect(() => startPolling(), []);
  React18.useEffect(() => {
    const list = getContext()?.get("sessions")?.list;
    if (!list?.subscribe) return void 0;
    const read = () => {
      const snapshot = list.get?.() ?? {};
      const byId = snapshot.byId ?? {};
      const titles = {};
      for (const [id, row] of Object.entries(byId)) titles[id] = row?.displayTitle ?? null;
      store.patch({ sessionTitles: titles, nativeSessionIds: Object.keys(byId), nativeSessionsReady: snapshot.phase === "ready" });
    };
    read();
    return list.subscribe(read);
  }, []);
  React18.useEffect(() => {
    const list = getContext()?.get("workspaces")?.list;
    if (!list?.subscribe) return void 0;
    const read = () => store.patch({ archivedSessionIds: [...list.getSnapshot()?.archivedSessionIds ?? []] });
    read();
    return list.subscribe(read);
  }, []);
  React18.useEffect(() => {
    const locale = getContext()?.get("locale");
    if (!locale?.subscribe) return void 0;
    return locale.subscribe(() => store.patch((prev) => ({ localeRevision: prev.localeRevision + 1 })));
  }, []);
  React18.useEffect(() => {
    if (!s.sessionsLoaded) return;
    const visible = s.sessions.filter((row) => !s.archivedSessionIds.includes(row.sessionId) && (!s.nativeSessionsReady || s.nativeSessionIds.includes(row.sessionId)));
    if (visible.some((row) => row.sessionId === s.activeSessionId)) return;
    const first = visible[0];
    if (first) void openSession(first.sessionId, first.coin ?? store.get().activeCoin);
    else store.patch({ activeSessionId: null, workspace: null, workspaceSessionId: null });
  }, [s.sessions, s.sessionsLoaded, s.archivedSessionIds, s.nativeSessionIds, s.nativeSessionsReady, s.activeSessionId]);
  const wsState = s.snapshot?.ws?.state ?? st?.ws?.state;
  const resyncing = marketStale && !s.statusError && Date.now() - s.resumedAt < 1e4;
  const wsBadge = wsState === "open" && !marketStale ? /* @__PURE__ */ React18.createElement("span", { className: "dhl-badge ok", title: `WebSocket: ${wsState}` }, t("status.online", "\u5728\u7EBF")) : resyncing ? /* @__PURE__ */ React18.createElement("span", { className: "dhl-badge", title: `WebSocket: ${wsState ?? "off"}` }, tr("\u540C\u6B65\u4E2D", "Syncing")) : /* @__PURE__ */ React18.createElement("span", { className: "dhl-badge err", title: `WebSocket: ${wsState ?? "off"}` }, t("status.offline", "\u79BB\u7EBF"));
  const [layout, setLayout, commitLayout] = useLayout(
    s.activeSessionId,
    s.activeSessionId && s.workspaceSessionId === s.activeSessionId ? s.workspace?.layout : null,
    (next) => saveSessionWorkspace({ layout: next })
  );
  const resizeSessions = React18.useCallback((delta) => {
    setLayout((prev) => ({ sessionsWidth: clampWidth(prev.sessionsWidth + delta, LIMITS.sessions) }));
  }, [setLayout]);
  const resizeChat = React18.useCallback((delta) => {
    setLayout((prev) => ({ chatWidth: clampWidth(prev.chatWidth + delta, LIMITS.chat) }));
  }, [setLayout]);
  const resetSessions = React18.useCallback(() => {
    setLayout({ sessionsWidth: DEFAULTS.sessionsWidth });
    commitLayout();
  }, [setLayout, commitLayout]);
  const resetChat = React18.useCallback(() => {
    setLayout({ chatWidth: DEFAULTS.chatWidth });
    commitLayout();
  }, [setLayout, commitLayout]);
  const toggleSessions = React18.useCallback(() => {
    setLayout((prev) => ({ sessionsCollapsed: !prev.sessionsCollapsed }));
    commitLayout();
  }, [setLayout, commitLayout]);
  const toggleDesk = React18.useCallback(() => {
    setLayout((prev) => ({ deskCollapsed: !prev.deskCollapsed }));
    commitLayout();
  }, [setLayout, commitLayout]);
  const toggleChat = React18.useCallback(() => {
    setLayout((prev) => ({ chatCollapsed: !prev.chatCollapsed }));
    commitLayout();
  }, [setLayout, commitLayout]);
  const showSessions = !layout.sessionsCollapsed;
  const showDesk = !layout.deskCollapsed;
  const showChat = !layout.chatCollapsed;
  return /* @__PURE__ */ React18.createElement("div", { className: "dhl-root" }, /* @__PURE__ */ React18.createElement("div", { className: "dhl-topbar" }, /* @__PURE__ */ React18.createElement("span", { className: "dhl-brand" }, /* @__PURE__ */ React18.createElement(BrandMark, null), "Hyperliquid ", /* @__PURE__ */ React18.createElement("span", { style: { fontWeight: 400, color: "var(--dsw-alias-label-secondary)" } }, t("app.suffix", "\u4EA4\u6613\u53F0"))), /* @__PURE__ */ React18.createElement("div", { className: "dhl-spacer" }), s.statusError ? /* @__PURE__ */ React18.createElement("span", { className: "dhl-badge err" }, t("status.unavailable", "\u8FDC\u7AEF\u4E0D\u53EF\u7528")) : null, st && network === "testnet" ? /* @__PURE__ */ React18.createElement("span", { className: "dhl-badge paper" }, t("network.testnet", "\u6D4B\u8BD5\u7F51")) : null, st && mode === "paper" ? /* @__PURE__ */ React18.createElement("span", { className: "dhl-badge paper" }, t("mode.paper", "\u6A21\u62DF\u76D8")) : null, wsBadge, /* @__PURE__ */ React18.createElement("button", { type: "button", className: "dhl-badge dhl-wallet-trigger", onClick: () => setWalletOpen(true), "aria-haspopup": "dialog", "aria-label": tr("\u67E5\u770B\u94B1\u5305\u8BE6\u60C5\u548C\u6536\u76CA", "View wallet and P&L") }, mode === "paper" ? tr("\u6A21\u62DF\u8D26\u6237", "Paper account") : st?.address ? st.address.slice(0, 6) + "\u2026" + st.address.slice(-4) : t("account.none", "\u672A\u8FDE\u63A5\u94B1\u5305"), /* @__PURE__ */ React18.createElement("span", { "aria-hidden": "true" }, "\u2304")), /* @__PURE__ */ React18.createElement("div", { className: "dhl-more", ref: moreRef }, /* @__PURE__ */ React18.createElement("button", { type: "button", className: "dhl-top-control dhl-more-trigger", "aria-haspopup": "menu", "aria-expanded": moreOpen, "aria-label": tr("\u66F4\u591A\u8BBE\u7F6E", "More settings"), title: tr("\u66F4\u591A\u8BBE\u7F6E", "More settings"), onClick: () => setMoreOpen((value) => !value) }, "\u22EF"), moreOpen ? /* @__PURE__ */ React18.createElement("div", { className: "dhl-more-popover", role: "menu" }, /* @__PURE__ */ React18.createElement("div", { className: "dhl-more-group" }, /* @__PURE__ */ React18.createElement("span", null, t("network.label", "\u7F51\u7EDC")), /* @__PURE__ */ React18.createElement("div", { className: "dhl-segment" }, /* @__PURE__ */ React18.createElement("button", { type: "button", className: network === "mainnet" ? "on" : "", disabled: networkBusy || !st, onClick: () => network !== "mainnet" && requestEnv({ network: "mainnet", mode }) }, t("network.mainnet", "\u4E3B\u7F51")), /* @__PURE__ */ React18.createElement("button", { type: "button", className: network === "testnet" ? "on" : "", disabled: networkBusy || !st, onClick: () => network !== "testnet" && requestEnv({ network: "testnet", mode }) }, t("network.testnet", "\u6D4B\u8BD5\u7F51")))), /* @__PURE__ */ React18.createElement("div", { className: "dhl-more-group" }, /* @__PURE__ */ React18.createElement("span", null, tr("\u8D26\u6237", "Account")), /* @__PURE__ */ React18.createElement("div", { className: "dhl-segment" }, /* @__PURE__ */ React18.createElement("button", { type: "button", className: mode === "live" ? "on" : "", disabled: networkBusy || !st, onClick: () => mode !== "live" && requestEnv({ network, mode: "live" }) }, t("mode.live", "\u5B9E\u76D8")), /* @__PURE__ */ React18.createElement("button", { type: "button", className: mode === "paper" ? "on" : "", disabled: networkBusy || !st, onClick: () => mode !== "paper" && requestEnv({ network, mode: "paper" }) }, t("mode.paper", "\u6A21\u62DF\u76D8")))), /* @__PURE__ */ React18.createElement("div", { className: "dhl-more-group" }, /* @__PURE__ */ React18.createElement("span", null, tr("\u76D8\u53E3 / \u6210\u4EA4\u4F4D\u7F6E", "Book / trades position")), /* @__PURE__ */ React18.createElement("div", { className: "dhl-segment" }, /* @__PURE__ */ React18.createElement("button", { type: "button", className: s.tapePlacement === "auto" ? "on" : "", onClick: () => setTapePlacement("auto") }, tr("\u81EA\u9002\u5E94", "Auto")), /* @__PURE__ */ React18.createElement("button", { type: "button", className: s.tapePlacement === "below" ? "on" : "", onClick: () => setTapePlacement("below") }, tr("\u56FE\u8868\u4E0B\u65B9", "Below chart")))), /* @__PURE__ */ React18.createElement("button", { type: "button", className: "dhl-more-link", onClick: () => {
    setMoreOpen(false);
    setLimitsOpen(true);
  } }, tr("\u4EA4\u6613\u9650\u989D\u4E0E\u7B7E\u540D\u89C4\u5219", "Trading limits & signing rules"))) : null)), /* @__PURE__ */ React18.createElement(import_dsh_client_ui_primitives5.Modal, { open: Boolean(confirmLive), onClose: () => setConfirmLive(null), title: tr("\u5207\u6362\u5230\u4E3B\u7F51\u5B9E\u76D8", "Switch to mainnet live"), closeLabel: t("modal.close", "\u5173\u95ED"), className: "dhl-network-modal", footer: /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement("button", { type: "button", className: "dhl-modal-secondary", onClick: () => setConfirmLive(null) }, t("modal.cancel", "\u53D6\u6D88")), /* @__PURE__ */ React18.createElement("button", { type: "button", className: "dhl-modal-primary", disabled: networkBusy, onClick: () => {
    if (confirmLive) void applyEnv(confirmLive);
  } }, tr("\u786E\u8BA4\u5207\u6362", "Switch"))) }, /* @__PURE__ */ React18.createElement("p", null, tr("\u4E3B\u7F51\u5B9E\u76D8\u4F1A\u663E\u793A\u771F\u5B9E\u884C\u60C5\u548C\u771F\u5B9E\u8D26\u6237\uFF0C\u540E\u7EED\u4EA4\u6613\u5C06\u4F7F\u7528\u771F\u5B9E\u8D44\u91D1\u3002", "Mainnet live shows real markets and your real account; trades use real funds."))), /* @__PURE__ */ React18.createElement(WalletDetails, { open: walletOpen, onClose: () => setWalletOpen(false) }), /* @__PURE__ */ React18.createElement(TradingLimits, { open: limitsOpen, onClose: () => setLimitsOpen(false) }), /* @__PURE__ */ React18.createElement("div", { className: "dhl-toasts" }, marketStale && !resyncing ? /* @__PURE__ */ React18.createElement("div", { className: "dhl-data-warning", role: "status" }, tr("\u884C\u60C5\u6216\u5BBF\u4E3B\u72B6\u6001\u672A\u53CA\u65F6\u66F4\u65B0\uFF1B\u5F53\u524D\u4EF7\u683C\u53EF\u80FD\u8FC7\u671F\u3002\u4EA4\u6613\u7968\u636E\u5DF2\u6682\u505C\u63D0\u4EA4\uFF0C\u7B49\u5F85\u6570\u636E\u6062\u590D\u3002", "Market or host data is stale. Ticket submission is paused until data recovers.")) : null, s.notice ? /* @__PURE__ */ React18.createElement("div", { className: "dhl-notice", onClick: () => notify(null) }, /* @__PURE__ */ React18.createElement("span", null, "\u26A1"), /* @__PURE__ */ React18.createElement("span", { style: { flex: 1 } }, s.notice.text), /* @__PURE__ */ React18.createElement("span", null, "\u2715")) : null), /* @__PURE__ */ React18.createElement("div", { className: "dhl-body" }, showSessions ? /* @__PURE__ */ React18.createElement(SessionsColumn, { width: layout.sessionsWidth, fill: !showDesk && !showChat, onCollapse: toggleSessions }) : /* @__PURE__ */ React18.createElement("button", { className: "dhl-panel-rail", type: "button", onClick: toggleSessions, "aria-label": tr("\u5C55\u5F00\u4F1A\u8BDD\u680F", "Expand sessions"), title: tr("\u5C55\u5F00\u4F1A\u8BDD\u680F", "Expand sessions") }, /* @__PURE__ */ React18.createElement(PanelIcon, { kind: "sessions" })), showSessions && (showDesk || showChat) ? /* @__PURE__ */ React18.createElement(Divider, { side: "left", onResize: resizeSessions, onCommit: commitLayout, onReset: resetSessions }) : null, showDesk ? /* @__PURE__ */ React18.createElement(DeskColumn, { onCollapse: toggleDesk }) : /* @__PURE__ */ React18.createElement("button", { className: "dhl-panel-rail", type: "button", onClick: toggleDesk, "aria-label": tr("\u5C55\u5F00\u884C\u60C5\u533A", "Expand market panel"), title: tr("\u5C55\u5F00\u884C\u60C5\u533A", "Expand market panel") }, /* @__PURE__ */ React18.createElement(PanelIcon, { kind: "desk" })), showDesk && showChat ? /* @__PURE__ */ React18.createElement(Divider, { side: "right", onResize: resizeChat, onCommit: commitLayout, onReset: resetChat }) : null, showChat ? /* @__PURE__ */ React18.createElement(ChatColumn, { width: layout.chatWidth, fill: !showDesk, onCollapse: toggleChat, SessionProvider: props.SessionProvider ?? props.sessionProvider, renderFactorySlot: props.renderFactorySlot }) : /* @__PURE__ */ React18.createElement("button", { className: "dhl-panel-rail", type: "button", onClick: toggleChat, "aria-label": tr("\u5C55\u5F00\u5BF9\u8BDD\u680F", "Expand chat"), title: tr("\u5C55\u5F00\u5BF9\u8BDD\u680F", "Expand chat") }, /* @__PURE__ */ React18.createElement(PanelIcon, { kind: "chat" }))));
}

// src/client/components/panel-entry.tsx
var React19 = __toESM(require("react"), 1);
function PanelEntry(props) {
  return /* @__PURE__ */ React19.createElement("span", { className: "dhl-entrymark" }, /* @__PURE__ */ React19.createElement(BrandMark, { size: props?.size ?? 18 }));
}

// src/client/index.tsx
var inject = ["connection", "slots", "locale", "theme", "layout", "sessions", "workspaces", "uiConversation", "uiWorkspace"];
function apply(ctx) {
  setContext(ctx);
  setConnection(ctx.get("connection") ?? null);
  const locale = ctx.get("locale");
  if (locale?.register && locale?.bind) {
    ctx.effect(() => locale.register(NS, DICT), NS + ": dictionaries");
    setLocaleBinder(locale.bind(NS));
  }
  ctx.effect(() => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-dsh-plugin", NS);
    styleEl.textContent = styles_default;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, NS + ": styles");
  const slots = ctx.get("slots");
  if (slots) {
    ctx.effect(() => slots.inject("main", () => slots.register(
      {
        name: "main",
        key: NS,
        registrant: NS,
        locale: NS,
        children: { "hyper.panel.seat": { kind: "single", scope: "session" } }
      },
      (props) => React20.createElement(App, {
        SessionProvider: props?.SessionProvider,
        renderFactorySlot: props?.renderFactorySlot
      })
    )), NS + ": main panel");
    ctx.effect(() => slots.inject("sidebar.panellist", () => slots.register(
      { name: "sidebar.panellist", id: NS, order: 20, label: () => t("app.title", "Hyperliquid \u4EA4\u6613\u53F0"), registrant: NS, locale: NS },
      (props) => React20.createElement(PanelEntry, props)
    )), NS + ": panel entry");
  }
  const layout = ctx.get("layout");
  if (layout?.panelInfo?.subscribe && slots) ctx.effect(() => {
    const key = `${NS}.panel-selected.v1`;
    let restore = false;
    try {
      restore = sessionStorage.getItem(key) === "1";
    } catch {
    }
    let ready = false;
    const remember = () => {
      if (!ready) return;
      try {
        sessionStorage.setItem(key, layout.panelInfo.getSnapshot()?.activePanelId === NS ? "1" : "0");
      } catch {
      }
    };
    const unsubscribe = layout.panelInfo.subscribe(remember);
    const frame = requestAnimationFrame(() => {
      ready = true;
      if (restore && layout.panelInfo.getSnapshot()?.activePanelId == null) {
        try {
          layout.selectPanel(NS);
        } catch {
        }
      }
      remember();
    });
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, NS + ": panel restore");
}
var index_default = { inject, apply };
/*! Bundled license information:

lightweight-charts/dist/lightweight-charts.development.mjs:
  (*!
   * @license
   * TradingView Lightweight Charts™ v5.2.1
   * Copyright (c) 2026 TradingView, Inc.
   * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
   *)
*/
    /* ── end bundle ────────────────────────────────────────────── */
    return module.exports
  },
})
