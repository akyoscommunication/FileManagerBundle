// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"davV6":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "60c0c8d8162e2f4d";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"aQAqQ":[function(require,module,exports) {
var _filemanagerElement = require("filemanager-element");
var _fileManagerCss = require("filemanager-element/FileManager.css");
(0, _filemanagerElement.FileManager).register("file-manager", {
    renderFileCell (file, actions) {
        const template = document.querySelector("#FileCell");
        if (template) {
            let file_cell = template.content.cloneNode(true);
            const fm_file = file_cell.querySelector(".fm-file");
            const fm_delete = file_cell.querySelector(".fm-delete");
            const fm_alt_input = file_cell.querySelector(".fm-alt");
            fm_alt_input.value = file?.alt;
            fm_delete.addEventListener("click", (e)=>{
                e.preventDefault();
                actions.handleDelete();
            });
            fm_file.addEventListener("click", (e)=>{
                e.preventDefault();
                actions.handleClick();
            });
            fm_alt_input.addEventListener("change", (e)=>{
                e.preventDefault();
                const myHeaders = new Headers();
                const myRequest = new Request("/api/file-manager/files", {
                    method: "PATCH",
                    headers: myHeaders,
                    mode: "cors",
                    cache: "default",
                    body: JSON.stringify({
                        ...file,
                        alt: fm_alt_input.value
                    })
                });
                fetch(myRequest).then((r)=>{
                    console.log(r.json());
                });
            });
            return file_cell;
        }
        return null;
    }
});
const fileManager = document.querySelector("file-manager");
fileManager.addEventListener("close", (e)=>{
    e.currentTarget.setAttribute("hidden", "");
});
fileManager.addEventListener("selectfile", (e)=>{
    console.log("fileselect", e.detail);
});
document.querySelector("*[data-toggle-fm]").addEventListener("click", ()=>{
    fileManager.removeAttribute("hidden");
});

},{"filemanager-element/FileManager.css":"e00i0","filemanager-element":"kxB61"}],"e00i0":[function() {},{}],"kxB61":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FileManager", ()=>FileManager);
var _internal = require("svelte/internal");
var _transition = require("svelte/transition");
var _svelte = require("svelte");
var _store = require("svelte/store");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) {
        for (var prop of __getOwnPropSymbols(b))if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
function clickOutside(node, eventName = "outclick") {
    const handleClick = (event)=>{
        if (!node.contains(event.target)) node.dispatchEvent(new CustomEvent(eventName, {
            bubbles: eventName !== "outclick"
        }));
    };
    document.addEventListener("click", handleClick, true);
    return {
        destroy () {
            document.removeEventListener("click", handleClick, true);
        }
    };
}
function isPromise(target) {
    if (typeof target === "object" && typeof target["then"] === "function") return true;
    return false;
}
class Query {
    constructor(cb, options){
        __publicField(this, "store");
        __publicField(this, "getState", ()=>{
            return (0, _store.get)(this.store);
        });
        __publicField(this, "setData", (newData)=>{
            this.store.update((v)=>__spreadProps(__spreadValues({}, v), {
                    isLoading: false,
                    isSuccess: true,
                    data: typeof newData === "function" ? newData(v.data) : newData
                }));
        });
        __publicField(this, "getData", ()=>{
            return this.getState().data;
        });
        const fetchData = ()=>{
            if (this.getData()) return;
            const response = cb();
            if (isPromise(response)) response.then(this.setData).catch((e)=>{
                var _a;
                (_a = options.onError) == null || _a.call(options);
                this.store.update((v)=>__spreadProps(__spreadValues({}, v), {
                        isLoading: false,
                        isSuccess: false
                    }));
            });
            else this.setData(response);
        };
        this.store = (0, _store.writable)({
            isSuccess: false,
            isLoading: false,
            data: void 0,
            refetch: fetchData
        });
        if (options.enabled !== false) fetchData();
    }
}
class QueryClient {
    constructor(){
        __publicField(this, "queries", /* @__PURE__ */ new Map());
    }
    getQuery(key, cb, options = {}) {
        if (!this.queries.has(key)) this.queries.set(key, new Query(cb, options));
        return this.queries.get(key);
    }
    setQueryData(key, updater) {
        const query = this.queries.get(key);
        if (query) query.setData(updater);
    }
    getQueryData(key) {
        var _a;
        return (_a = this.queries.get(key)) == null ? void 0 : _a.getData();
    }
    getQueryState(key) {
        const query = this.queries.get(key);
        if (query) return query.getState();
        return {
            data: void 0,
            isLoading: false,
            isSuccess: false,
            refetch: ()=>{}
        };
    }
}
function useQuery(key, cb, options = {}) {
    const query = useQueryClient().getQuery(key, cb, options);
    return {
        subscribe: query.store.subscribe
    };
}
function useMutation(cb, options = {}) {
    const mutate = (arg)=>{
        store.update((v)=>__spreadProps(__spreadValues({}, v), {
                isLoading: true
            }));
        return cb(arg).then((data)=>{
            var _a;
            (_a = options.onSuccess) == null || _a.call(options, data);
            return data;
        }).catch((reason)=>{
            var _a;
            (_a = options.onError) == null || _a.call(options, reason);
            throw reason;
        }).finally(()=>{
            store.update((v)=>__spreadProps(__spreadValues({}, v), {
                    isLoading: false
                }));
        });
    };
    const store = (0, _store.writable)({
        isLoading: false,
        mutate: (arg)=>{
            mutate(arg).catch(()=>null);
        },
        mutateAsync: mutate
    });
    return {
        subscribe: store.subscribe
    };
}
function create_fragment$q(ctx) {
    let current;
    const default_slot_template = ctx[2].default;
    const default_slot = (0, _internal.create_slot)(default_slot_template, ctx, ctx[1], null);
    return {
        c () {
            if (default_slot) default_slot.c();
        },
        m (target, anchor) {
            if (default_slot) default_slot.m(target, anchor);
            current = true;
        },
        p (ctx2, [dirty]) {
            if (default_slot) {
                if (default_slot.p && (!current || dirty & 2)) (0, _internal.update_slot_base)(default_slot, default_slot_template, ctx2, ctx2[1], !current ? (0, _internal.get_all_dirty_from_scope)(ctx2[1]) : (0, _internal.get_slot_changes)(default_slot_template, ctx2[1], dirty, null), null);
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(default_slot, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(default_slot, local);
            current = false;
        },
        d (detaching) {
            if (default_slot) default_slot.d(detaching);
        }
    };
}
function instance$o($$self, $$props, $$invalidate) {
    let { $$slots: slots = {} , $$scope  } = $$props;
    let { client  } = $$props;
    (0, _svelte.setContext)(contextKey, client);
    $$self.$$set = ($$props2)=>{
        if ("client" in $$props2) $$invalidate(0, client = $$props2.client);
        if ("$$scope" in $$props2) $$invalidate(1, $$scope = $$props2.$$scope);
    };
    return [
        client,
        $$scope,
        slots
    ];
}
class QueryClientProvider extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$o, create_fragment$q, (0, _internal.safe_not_equal), {
            client: 0
        });
    }
}
const contextKey = Symbol("queryClient");
function useQueryClient() {
    return (0, _svelte.getContext)(contextKey);
}
var IconLoader_svelte_svelte_type_style_lang = "";
function create_fragment$p(ctx) {
    let div;
    let div_class_value;
    let div_style_value;
    return {
        c () {
            div = (0, _internal.element)("div");
            (0, _internal.attr)(div, "class", div_class_value = (0, _internal.null_to_empty)(`loader ${ctx[1].class}`) + " svelte-1cyki07");
            (0, _internal.attr)(div, "style", div_style_value = `--size:${ctx[0]}px`);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
        },
        p (ctx2, [dirty]) {
            if (dirty & 2 && div_class_value !== (div_class_value = (0, _internal.null_to_empty)(`loader ${ctx2[1].class}`) + " svelte-1cyki07")) (0, _internal.attr)(div, "class", div_class_value);
            if (dirty & 1 && div_style_value !== (div_style_value = `--size:${ctx2[0]}px`)) (0, _internal.attr)(div, "style", div_style_value);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
        }
    };
}
function instance$n($$self, $$props, $$invalidate) {
    let { size =20  } = $$props;
    $$self.$$set = ($$new_props)=>{
        $$invalidate(1, $$props = (0, _internal.assign)((0, _internal.assign)({}, $$props), (0, _internal.exclude_internal_props)($$new_props)));
        if ("size" in $$new_props) $$invalidate(0, size = $$new_props.size);
    };
    $$props = (0, _internal.exclude_internal_props)($$props);
    return [
        size,
        $$props
    ];
}
class IconLoader extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$n, create_fragment$p, (0, _internal.safe_not_equal), {
            size: 0
        });
    }
}
function create_fragment$o(ctx) {
    let svg;
    let path0;
    let path1;
    let svg_levels = [
        {
            width: "23"
        },
        {
            height: "23"
        },
        {
            fill: "none"
        },
        {
            xmlns: "http://www.w3.org/2000/svg"
        },
        ctx[0]
    ];
    let svg_data = {};
    for(let i = 0; i < svg_levels.length; i += 1)svg_data = (0, _internal.assign)(svg_data, svg_levels[i]);
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "d", "M22.7 10.578c-.289-.29-.72-.578-1.152-.578H5.715c-.575 0-1.151.289-1.295.867L.102 20.977C-.186 21.845.102 23 1.397 23H17.23c.575 0 1.151-.289 1.295-.867l4.318-10.11c.288-.434.144-1.012-.144-1.445z");
            (0, _internal.attr)(path0, "fill", "currentColor");
            (0, _internal.attr)(path1, "d", "M1.754 9.814c.73-1.587 2.338-2.598 4.092-2.598H19V4.33c0-.866-.585-1.443-1.462-1.443H9.354L6.869.433C6.577.144 6.285 0 5.846 0H1.462C.585 0 0 .577 0 1.443V14l1.754-4.186z");
            (0, _internal.attr)(path1, "fill", "currentColor");
            (0, _internal.set_svg_attributes)(svg, svg_data);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
        },
        p (ctx2, [dirty]) {
            (0, _internal.set_svg_attributes)(svg, svg_data = (0, _internal.get_spread_update)(svg_levels, [
                {
                    width: "23"
                },
                {
                    height: "23"
                },
                {
                    fill: "none"
                },
                {
                    xmlns: "http://www.w3.org/2000/svg"
                },
                dirty & 1 && ctx2[0]
            ]));
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$m($$self, $$props, $$invalidate) {
    $$self.$$set = ($$new_props)=>{
        $$invalidate(0, $$props = (0, _internal.assign)((0, _internal.assign)({}, $$props), (0, _internal.exclude_internal_props)($$new_props)));
    };
    $$props = (0, _internal.exclude_internal_props)($$props);
    return [
        $$props
    ];
}
class IconFolder extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$m, create_fragment$o, (0, _internal.safe_not_equal), {});
    }
}
var HTTPStatus = /* @__PURE__ */ ((HTTPStatus2)=>{
    HTTPStatus2[HTTPStatus2["OK"] = 200] = "OK";
    HTTPStatus2[HTTPStatus2["Created"] = 201] = "Created";
    HTTPStatus2[HTTPStatus2["MultipleChoices"] = 300] = "MultipleChoices";
    HTTPStatus2[HTTPStatus2["NoContent"] = 204] = "NoContent";
    HTTPStatus2[HTTPStatus2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HTTPStatus2[HTTPStatus2["Forbidden"] = 403] = "Forbidden";
    HTTPStatus2[HTTPStatus2["NotFound"] = 404] = "NotFound";
    HTTPStatus2[HTTPStatus2["BadRequest"] = 400] = "BadRequest";
    return HTTPStatus2;
})(HTTPStatus || {});
var FR = {
    delete: "Supprimer",
    deleteConfirm: "Voulez vous vraiment supprimer ce fichier ?",
    newFolderPlaceholder: "Nom du dossier",
    emptyTitle: "Ce dossier est vide",
    deleteFolder: "Supprimer le dossier",
    emptyDescription: "D\xe9poser un fichier ici pour le t\xe9l\xe9verser",
    createFolder: "Cr\xe9er un dossier",
    copy: "Copier le lien",
    size: "Taille",
    filename: "Nom",
    serverError: "Action impossible suite a une erreur serveur"
};
const messages = {
    delete: "Delete",
    deleteConfirm: "Do you really want to delete this file ?",
    newFolderPlaceholder: "Folder name",
    deleteFolder: "Delete this folder",
    emptyTitle: "This folder is empty",
    emptyDescription: "Drop a file here to upload it",
    createFolder: "New folder",
    copy: "Copy link",
    size: "Size",
    filename: "Name",
    serverError: "Server error"
};
const langs = {
    fr: FR,
    en: messages
};
let langMessages = messages;
function t(key) {
    return langMessages[key];
}
function setLang(lang) {
    langMessages = lang in langs ? langs[lang] : messages;
}
const flashMessages = (0, _store.writable)([]);
const flash = (message, type = "success")=>{
    const id = Date.now();
    flashMessages.update((messages2)=>[
            {
                type,
                message,
                id
            },
            ...messages2
        ]);
    if (type === "success") window.setTimeout(()=>{
        flashMessages.update((messages2)=>messages2.filter((message2)=>message2.id !== id));
    }, 2e3);
};
const deleteFlashMessage = (id)=>{
    flashMessages.update((messages2)=>messages2.filter((message)=>message.id !== id));
};
const filesQueryKey = (folderId)=>`files/${folderId != null ? folderId : ""}`;
const foldersQueryKey = (parentId)=>`folders/${parentId != null ? parentId : ""}`;
const folderStore = (0, _store.writable)(null);
const folder = folderStore;
const searchQuery = (0, _store.writable)("");
const removeFile = async (options, queryClient, file)=>{
    const queryKey = filesQueryKey(file.folder);
    const oldData = queryClient.getQueryData(queryKey);
    if (oldData) queryClient.setQueryData(queryKey, (files)=>files ? files.filter((f)=>f.id !== file.id) : []);
    try {
        await options.deleteFile(file);
    } catch (e) {
        if (!(e instanceof Response) || e.status !== HTTPStatus.UnprocessableEntity) {
            flash(t(`serverError`), "danger");
            console.error(e);
        }
        queryClient.setQueryData(queryKey, oldData);
    }
};
const uploadFile = async (options, queryClient, file, folder2)=>{
    try {
        const newFile = await options.uploadFile(file, folder2);
        const queryKey = filesQueryKey(folder2 == null ? void 0 : folder2.id);
        const state = queryClient.getQueryState(queryKey);
        if (state == null ? void 0 : state.data) queryClient.setQueryData(queryKey, (files)=>files ? [
                newFile,
                ...files
            ] : [
                newFile
            ]);
    } catch (e) {
        if (!(e instanceof Response) || e.status !== HTTPStatus.UnprocessableEntity) {
            flash(t(`serverError`), "danger");
            console.error(e);
        }
    }
};
const useCreateFolderMutation = ()=>{
    const queryClient = useQueryClient();
    const options = getOptions();
    return useMutation((params)=>options.createFolder(params), {
        onSuccess (folder2) {
            const addToCache = (parent)=>{
                const queryKey = foldersQueryKey(parent);
                const state = queryClient.getQueryState(queryKey);
                if (state == null ? void 0 : state.data) queryClient.setQueryData(queryKey, (folders)=>folders ? [
                        folder2,
                        ...folders
                    ] : [
                        folder2
                    ]);
            };
            addToCache(folder2.parent);
            if (folder2.parent) addToCache(null);
        }
    });
};
const useDeleteFolderMutation = ()=>{
    const queryClient = useQueryClient();
    const options = getOptions();
    return useMutation((folder2)=>options.deleteFolder(folder2).then((r)=>folder2), {
        onSuccess: (folder2)=>{
            folderStore.update(()=>null);
            const updateData = (parent)=>{
                const queryKey = foldersQueryKey(parent);
                const state = queryClient.getQueryState(queryKey);
                if (state == null ? void 0 : state.data) queryClient.setQueryData(foldersQueryKey(parent), (folders)=>folders ? folders.filter((f)=>f.id !== folder2.id) : []);
            };
            updateData(folder2.parent);
            updateData();
        }
    });
};
const delay = 300;
const uploadsDelayed = (0, _store.writable)([]);
const timerMap = /* @__PURE__ */ new Map();
const uploads = {
    push (file) {
        const timer = setTimeout(()=>{
            uploadsDelayed.update((files)=>[
                    file,
                    ...files
                ]);
        }, delay);
        timerMap.set(file, timer);
    },
    remove (file) {
        const timer = timerMap.get(file);
        if (timer !== void 0) {
            clearTimeout(timer);
            timerMap.delete(file);
        }
        uploadsDelayed.update((files)=>files.filter((f)=>f !== file));
    },
    subscribe: uploadsDelayed.subscribe
};
function getOptions() {
    return (0, _svelte.getContext)("options");
}
function $on(el, eventNames, cb) {
    eventNames.forEach((eventName)=>{
        el.addEventListener(eventName, cb);
    });
    return ()=>{
        eventNames.forEach((eventName)=>{
            el.removeEventListener(eventName, cb);
        });
    };
}
function dragOver(node) {
    const offPreventListeners = $on(node, [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
    ], function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    const offOver = $on(node, [
        "dragover",
        "dragenter"
    ], function() {
        node.dispatchEvent(new CustomEvent("dropzoneover"));
    });
    const offLeave = $on(node, [
        "dragleave",
        "dragend",
        "drop"
    ], function() {
        node.dispatchEvent(new CustomEvent("dropzoneleave"));
    });
    return {
        destroy () {
            offPreventListeners();
            offOver();
            offLeave();
        }
    };
}
function create_fragment$n(ctx) {
    let svg;
    let path0;
    let path1;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "stroke", "currentColor");
            (0, _internal.attr)(path0, "stroke-linecap", "round");
            (0, _internal.attr)(path0, "stroke-width", "2");
            (0, _internal.attr)(path0, "d", "M12 12H8m4-4v4-4Zm0 4v4-4Zm0 0h4-4Z");
            (0, _internal.attr)(path1, "stroke", "currentColor");
            (0, _internal.attr)(path1, "stroke-width", "2");
            (0, _internal.attr)(path1, "d", "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "width", ctx[0]);
            (0, _internal.attr)(svg, "height", ctx[0]);
            (0, _internal.attr)(svg, "viewBox", "0 0 24 24");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) (0, _internal.attr)(svg, "width", ctx2[0]);
            if (dirty & 1) (0, _internal.attr)(svg, "height", ctx2[0]);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$l($$self, $$props, $$invalidate) {
    let { size =24  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("size" in $$props2) $$invalidate(0, size = $$props2.size);
    };
    return [
        size
    ];
}
class IconCirclePlus extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$l, create_fragment$n, (0, _internal.safe_not_equal), {
            size: 0
        });
    }
}
function autofocus(node) {
    node.focus();
    return {};
}
function create_fragment$m(ctx) {
    let svg;
    let path;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path, "fill", "currentColor");
            (0, _internal.attr)(path, "fill-rule", "evenodd");
            (0, _internal.attr)(path, "d", "M0 8a1 1 0 0 1 1-1h11.58L8.3 2.7a1 1 0 1 1 1.42-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.42-1.4L12.6 9H1a1 1 0 0 1-1-1Z");
            (0, _internal.attr)(path, "clip-rule", "evenodd");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "viewBox", "0 0 16 16");
            (0, _internal.attr)(svg, "width", ctx[0]);
            (0, _internal.attr)(svg, "height", ctx[0]);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path);
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) (0, _internal.attr)(svg, "width", ctx2[0]);
            if (dirty & 1) (0, _internal.attr)(svg, "height", ctx2[0]);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$k($$self, $$props, $$invalidate) {
    let { size =16  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("size" in $$props2) $$invalidate(0, size = $$props2.size);
    };
    return [
        size
    ];
}
class IconArrowRight extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$k, create_fragment$m, (0, _internal.safe_not_equal), {
            size: 0
        });
    }
}
var IconButton_svelte_svelte_type_style_lang = "";
function create_fragment$l(ctx) {
    let button;
    let current;
    const default_slot_template = ctx[2].default;
    const default_slot = (0, _internal.create_slot)(default_slot_template, ctx, ctx[1], null);
    let button_levels = [
        ctx[0]
    ];
    let button_data = {};
    for(let i = 0; i < button_levels.length; i += 1)button_data = (0, _internal.assign)(button_data, button_levels[i]);
    return {
        c () {
            button = (0, _internal.element)("button");
            if (default_slot) default_slot.c();
            (0, _internal.set_attributes)(button, button_data);
            (0, _internal.toggle_class)(button, "svelte-ms51de", true);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, button, anchor);
            if (default_slot) default_slot.m(button, null);
            if (button.autofocus) button.focus();
            current = true;
        },
        p (ctx2, [dirty]) {
            if (default_slot) {
                if (default_slot.p && (!current || dirty & 2)) (0, _internal.update_slot_base)(default_slot, default_slot_template, ctx2, ctx2[1], !current ? (0, _internal.get_all_dirty_from_scope)(ctx2[1]) : (0, _internal.get_slot_changes)(default_slot_template, ctx2[1], dirty, null), null);
            }
            (0, _internal.set_attributes)(button, button_data = (0, _internal.get_spread_update)(button_levels, [
                dirty & 1 && ctx2[0]
            ]));
            (0, _internal.toggle_class)(button, "svelte-ms51de", true);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(default_slot, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(default_slot, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(button);
            if (default_slot) default_slot.d(detaching);
        }
    };
}
function instance$j($$self, $$props, $$invalidate) {
    let { $$slots: slots = {} , $$scope  } = $$props;
    $$self.$$set = ($$new_props)=>{
        $$invalidate(0, $$props = (0, _internal.assign)((0, _internal.assign)({}, $$props), (0, _internal.exclude_internal_props)($$new_props)));
        if ("$$scope" in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    };
    $$props = (0, _internal.exclude_internal_props)($$props);
    return [
        $$props,
        $$scope,
        slots
    ];
}
class IconButton extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$j, create_fragment$l, (0, _internal.safe_not_equal), {});
    }
}
var NewFolder_svelte_svelte_type_style_lang = "";
function create_else_block$3(ctx) {
    let iconarrowright;
    let current;
    iconarrowright = new IconArrowRight({
        props: {
            size: 12
        }
    });
    return {
        c () {
            (0, _internal.create_component)(iconarrowright.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconarrowright, target, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconarrowright.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconarrowright.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconarrowright, detaching);
        }
    };
}
function create_if_block$8(ctx) {
    let iconloader;
    let current;
    iconloader = new IconLoader({
        props: {
            size: 12
        }
    });
    return {
        c () {
            (0, _internal.create_component)(iconloader.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconloader, target, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconloader.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconloader.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconloader, detaching);
        }
    };
}
function create_default_slot$1(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [
        create_if_block$8,
        create_else_block$3
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
        if (ctx2[0].isLoading) return 0;
        return 1;
    }
    current_block_type_index = select_block_type(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
        c () {
            if_block.c();
            if_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            if_blocks[current_block_type_index].m(target, anchor);
            (0, _internal.insert)(target, if_block_anchor, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            let previous_block_index = current_block_type_index;
            current_block_type_index = select_block_type(ctx2);
            if (current_block_type_index !== previous_block_index) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_blocks[previous_block_index], 1, 1, ()=>{
                    if_blocks[previous_block_index] = null;
                });
                (0, _internal.check_outros)();
                if_block = if_blocks[current_block_type_index];
                if (!if_block) {
                    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
                    if_block.c();
                }
                (0, _internal.transition_in)(if_block, 1);
                if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if_blocks[current_block_type_index].d(detaching);
            if (detaching) (0, _internal.detach)(if_block_anchor);
        }
    };
}
function create_fragment$k(ctx) {
    let form;
    let iconfolder;
    let t0;
    let input;
    let input_disabled_value;
    let t1;
    let iconbutton;
    let current;
    let mounted;
    let dispose;
    iconfolder = new IconFolder({});
    iconbutton = new IconButton({
        props: {
            disabled: ctx[0].isLoading,
            $$slots: {
                default: [
                    create_default_slot$1
                ]
            },
            $$scope: {
                ctx
            }
        }
    });
    return {
        c () {
            form = (0, _internal.element)("form");
            (0, _internal.create_component)(iconfolder.$$.fragment);
            t0 = (0, _internal.space)();
            input = (0, _internal.element)("input");
            t1 = (0, _internal.space)();
            (0, _internal.create_component)(iconbutton.$$.fragment);
            (0, _internal.attr)(input, "type", "text");
            (0, _internal.attr)(input, "placeholder", t("newFolderPlaceholder"));
            (0, _internal.attr)(input, "name", "name");
            input.required = true;
            input.disabled = input_disabled_value = ctx[0].isLoading;
            (0, _internal.attr)(input, "class", "svelte-bopbht");
            (0, _internal.attr)(form, "action", "");
            (0, _internal.attr)(form, "class", "fm-folder-form svelte-bopbht");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, form, anchor);
            (0, _internal.mount_component)(iconfolder, form, null);
            (0, _internal.append)(form, t0);
            (0, _internal.append)(form, input);
            (0, _internal.append)(form, t1);
            (0, _internal.mount_component)(iconbutton, form, null);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.action_destroyer)(autofocus.call(null, input)),
                    (0, _internal.listen)(form, "submit", (0, _internal.prevent_default)(ctx[2])),
                    (0, _internal.action_destroyer)(clickOutside.call(null, form)),
                    (0, _internal.listen)(form, "outclick", ctx[3])
                ];
                mounted = true;
            }
        },
        p (ctx2, [dirty]) {
            if (!current || dirty & 1 && input_disabled_value !== (input_disabled_value = ctx2[0].isLoading)) input.disabled = input_disabled_value;
            const iconbutton_changes = {};
            if (dirty & 1) iconbutton_changes.disabled = ctx2[0].isLoading;
            if (dirty & 65) iconbutton_changes.$$scope = {
                dirty,
                ctx: ctx2
            };
            iconbutton.$set(iconbutton_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconfolder.$$.fragment, local);
            (0, _internal.transition_in)(iconbutton.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconfolder.$$.fragment, local);
            (0, _internal.transition_out)(iconbutton.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(form);
            (0, _internal.destroy_component)(iconfolder);
            (0, _internal.destroy_component)(iconbutton);
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function instance$i($$self, $$props, $$invalidate) {
    let $createFolderMutation;
    let { parent  } = $$props;
    const createFolderMutation = useCreateFolderMutation();
    (0, _internal.component_subscribe)($$self, createFolderMutation, (value)=>$$invalidate(0, $createFolderMutation = value));
    const handleSubmit = async (e)=>{
        const name = new FormData(e.currentTarget).get("name").toString();
        await $createFolderMutation.mutateAsync({
            name,
            parent: parent == null ? void 0 : parent.id
        });
        dispatch("submit");
    };
    const handleCancel = ()=>{
        dispatch("cancel");
    };
    const dispatch = (0, _svelte.createEventDispatcher)();
    $$self.$$set = ($$props2)=>{
        if ("parent" in $$props2) $$invalidate(4, parent = $$props2.parent);
    };
    return [
        $createFolderMutation,
        createFolderMutation,
        handleSubmit,
        handleCancel,
        parent
    ];
}
class NewFolder extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$i, create_fragment$k, (0, _internal.safe_not_equal), {
            parent: 4
        });
    }
}
function nestFolder(originalFolders) {
    const folders = originalFolders.map((folder2)=>__spreadProps(__spreadValues({}, folder2), {
            children: []
        }));
    const foldersById = folders.reduce((acc, folder2)=>acc.set(folder2.id, folder2), /* @__PURE__ */ new Map());
    for (const folder2 of folders){
        const parent = foldersById.get(folder2.parent);
        if (folder2.parent && parent) parent.children = parent.children ? [
            ...parent.children,
            folder2
        ] : [
            folder2
        ];
    }
    return folders;
}
function tooltip(node, title) {
    let tooltip2 = null;
    const onMouveOver = ()=>{
        if (tooltip2) return;
        const rect = node.getBoundingClientRect();
        tooltip2 = document.createElement("div");
        tooltip2.classList.add("fm-tooltip");
        tooltip2.innerText = title;
        const root = node.closest(".fm-root");
        root.appendChild(tooltip2);
        tooltip2.style.setProperty("transform", `translate(calc(${rect.left + rect.width / 2}px - 50%), calc(${rect.top - 4}px - 100%))`);
        tooltip2.animate([
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        ], {
            duration: 200,
            easing: "ease-in-out"
        });
        node.addEventListener("pointerleave", ()=>{
            if (tooltip2) {
                tooltip2.animate([
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    }
                ], {
                    duration: 200,
                    easing: "ease-in-out"
                });
                window.setTimeout(()=>{
                    tooltip2 == null || tooltip2.remove();
                    tooltip2 = null;
                }, 200);
            }
        }, {
            once: true
        });
    };
    node.addEventListener("pointerenter", onMouveOver);
    return {
        destroy () {
            tooltip2 == null || tooltip2.remove();
            node.removeEventListener("pointerenter", onMouveOver);
        }
    };
}
var Folder_svelte_svelte_type_style_lang = "";
function create_else_block$2(ctx) {
    let iconfolder;
    let current;
    iconfolder = new IconFolder({
        props: {
            class: "folder-icon"
        }
    });
    return {
        c () {
            (0, _internal.create_component)(iconfolder.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconfolder, target, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconfolder.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconfolder.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconfolder, detaching);
        }
    };
}
function create_if_block_4$1(ctx) {
    let iconloader;
    let current;
    iconloader = new IconLoader({
        props: {
            size: 20,
            class: "folder-loader"
        }
    });
    return {
        c () {
            (0, _internal.create_component)(iconloader.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconloader, target, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconloader.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconloader.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconloader, detaching);
        }
    };
}
function create_if_block_3$1(ctx) {
    let button;
    let iconcircleplus;
    let tooltip_action;
    let current;
    let mounted;
    let dispose;
    iconcircleplus = new IconCirclePlus({
        props: {
            size: 16
        }
    });
    return {
        c () {
            button = (0, _internal.element)("button");
            (0, _internal.create_component)(iconcircleplus.$$.fragment);
            (0, _internal.attr)(button, "class", "fm-new-folder svelte-1nyuu78");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, button, anchor);
            (0, _internal.mount_component)(iconcircleplus, button, null);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.listen)(button, "click", (0, _internal.prevent_default)(ctx[12])),
                    (0, _internal.action_destroyer)(tooltip_action = tooltip.call(null, button, t("createFolder")))
                ];
                mounted = true;
            }
        },
        p: (0, _internal.noop),
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconcircleplus.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconcircleplus.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(button);
            (0, _internal.destroy_component)(iconcircleplus);
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function create_if_block_2$1(ctx) {
    let newfolder;
    let current;
    newfolder = new NewFolder({
        props: {
            parent: ctx[0]
        }
    });
    newfolder.$on("submit", ctx[13]);
    newfolder.$on("cancel", ctx[13]);
    return {
        c () {
            (0, _internal.create_component)(newfolder.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(newfolder, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const newfolder_changes = {};
            if (dirty & 1) newfolder_changes.parent = ctx2[0];
            newfolder.$set(newfolder_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(newfolder.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(newfolder.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(newfolder, detaching);
        }
    };
}
function create_if_block_1$2(ctx) {
    let folders;
    let current;
    folders = new Folders({
        props: {
            folders: ctx[6],
            lazyLoad: ctx[1]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(folders.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(folders, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const folders_changes = {};
            if (dirty & 64) folders_changes.folders = ctx2[6];
            if (dirty & 2) folders_changes.lazyLoad = ctx2[1];
            folders.$set(folders_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(folders.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(folders.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(folders, detaching);
        }
    };
}
function create_if_block$7(ctx) {
    var _a;
    let folders;
    let current;
    folders = new Folders({
        props: {
            folders: (_a = ctx[0]) == null ? void 0 : _a.children,
            lazyLoad: ctx[1]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(folders.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(folders, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            var _a2;
            const folders_changes = {};
            if (dirty & 1) folders_changes.folders = (_a2 = ctx2[0]) == null ? void 0 : _a2.children;
            if (dirty & 2) folders_changes.lazyLoad = ctx2[1];
            folders.$set(folders_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(folders.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(folders.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(folders, detaching);
        }
    };
}
function create_fragment$j(ctx) {
    var _a, _b;
    let li;
    let span2;
    let span1;
    let current_block_type_index;
    let if_block0;
    let t0;
    let span0;
    let t1_value = ((_b = (_a = ctx[0]) == null ? void 0 : _a.name) != null ? _b : "/") + "";
    let t1;
    let t2;
    let t3;
    let t4;
    let current_block_type_index_1;
    let if_block3;
    let current;
    let mounted;
    let dispose;
    const if_block_creators = [
        create_if_block_4$1,
        create_else_block$2
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
        if (ctx2[2].isLoading) return 0;
        return 1;
    }
    current_block_type_index = select_block_type(ctx);
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    let if_block1 = !ctx[8].readOnly && create_if_block_3$1(ctx);
    let if_block2 = ctx[4] && create_if_block_2$1(ctx);
    const if_block_creators_1 = [
        create_if_block$7,
        create_if_block_1$2
    ];
    const if_blocks_1 = [];
    function select_block_type_1(ctx2, dirty) {
        var _a2;
        if (((_a2 = ctx2[0]) == null ? void 0 : _a2.children) && ctx2[5]) return 0;
        if (ctx2[6] && ctx2[5]) return 1;
        return -1;
    }
    if (~(current_block_type_index_1 = select_block_type_1(ctx))) if_block3 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    return {
        c () {
            var _a2, _b2;
            li = (0, _internal.element)("li");
            span2 = (0, _internal.element)("span");
            span1 = (0, _internal.element)("span");
            if_block0.c();
            t0 = (0, _internal.space)();
            span0 = (0, _internal.element)("span");
            t1 = (0, _internal.text)(t1_value);
            t2 = (0, _internal.space)();
            if (if_block1) if_block1.c();
            t3 = (0, _internal.space)();
            if (if_block2) if_block2.c();
            t4 = (0, _internal.space)();
            if (if_block3) if_block3.c();
            (0, _internal.attr)(span0, "class", "fm-folder-name svelte-1nyuu78");
            (0, _internal.attr)(span1, "class", "fm-folder svelte-1nyuu78");
            (0, _internal.attr)(span2, "class", "fm-folder-wrapper svelte-1nyuu78");
            (0, _internal.toggle_class)(span2, "active", ((_a2 = ctx[0]) == null ? void 0 : _a2.id) === ((_b2 = ctx[7]) == null ? void 0 : _b2.id) || ctx[3]);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, li, anchor);
            (0, _internal.append)(li, span2);
            (0, _internal.append)(span2, span1);
            if_blocks[current_block_type_index].m(span1, null);
            (0, _internal.append)(span1, t0);
            (0, _internal.append)(span1, span0);
            (0, _internal.append)(span0, t1);
            (0, _internal.append)(span2, t2);
            if (if_block1) if_block1.m(span2, null);
            (0, _internal.append)(li, t3);
            if (if_block2) if_block2.m(li, null);
            (0, _internal.append)(li, t4);
            if (~current_block_type_index_1) if_blocks_1[current_block_type_index_1].m(li, null);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.action_destroyer)(dragOver.call(null, span1)),
                    (0, _internal.listen)(span1, "click", (0, _internal.prevent_default)(ctx[14])),
                    (0, _internal.listen)(span1, "dropzoneover", ctx[9]),
                    (0, _internal.listen)(span1, "dropzoneleave", ctx[10]),
                    (0, _internal.listen)(span1, "drop", ctx[11])
                ];
                mounted = true;
            }
        },
        p (ctx2, [dirty]) {
            var _a2, _b2, _c, _d;
            let previous_block_index = current_block_type_index;
            current_block_type_index = select_block_type(ctx2);
            if (current_block_type_index !== previous_block_index) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_blocks[previous_block_index], 1, 1, ()=>{
                    if_blocks[previous_block_index] = null;
                });
                (0, _internal.check_outros)();
                if_block0 = if_blocks[current_block_type_index];
                if (!if_block0) {
                    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
                    if_block0.c();
                }
                (0, _internal.transition_in)(if_block0, 1);
                if_block0.m(span1, t0);
            }
            if ((!current || dirty & 1) && t1_value !== (t1_value = ((_b2 = (_a2 = ctx2[0]) == null ? void 0 : _a2.name) != null ? _b2 : "/") + "")) (0, _internal.set_data)(t1, t1_value);
            if (!ctx2[8].readOnly) if_block1.p(ctx2, dirty);
            if (dirty & 137) (0, _internal.toggle_class)(span2, "active", ((_c = ctx2[0]) == null ? void 0 : _c.id) === ((_d = ctx2[7]) == null ? void 0 : _d.id) || ctx2[3]);
            if (ctx2[4]) {
                if (if_block2) {
                    if_block2.p(ctx2, dirty);
                    if (dirty & 16) (0, _internal.transition_in)(if_block2, 1);
                } else {
                    if_block2 = create_if_block_2$1(ctx2);
                    if_block2.c();
                    (0, _internal.transition_in)(if_block2, 1);
                    if_block2.m(li, t4);
                }
            } else if (if_block2) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_block2, 1, 1, ()=>{
                    if_block2 = null;
                });
                (0, _internal.check_outros)();
            }
            let previous_block_index_1 = current_block_type_index_1;
            current_block_type_index_1 = select_block_type_1(ctx2);
            if (current_block_type_index_1 === previous_block_index_1) {
                if (~current_block_type_index_1) if_blocks_1[current_block_type_index_1].p(ctx2, dirty);
            } else {
                if (if_block3) {
                    (0, _internal.group_outros)();
                    (0, _internal.transition_out)(if_blocks_1[previous_block_index_1], 1, 1, ()=>{
                        if_blocks_1[previous_block_index_1] = null;
                    });
                    (0, _internal.check_outros)();
                }
                if (~current_block_type_index_1) {
                    if_block3 = if_blocks_1[current_block_type_index_1];
                    if (!if_block3) {
                        if_block3 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx2);
                        if_block3.c();
                    } else if_block3.p(ctx2, dirty);
                    (0, _internal.transition_in)(if_block3, 1);
                    if_block3.m(li, null);
                } else if_block3 = null;
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block0);
            (0, _internal.transition_in)(if_block1);
            (0, _internal.transition_in)(if_block2);
            (0, _internal.transition_in)(if_block3);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block0);
            (0, _internal.transition_out)(if_block1);
            (0, _internal.transition_out)(if_block2);
            (0, _internal.transition_out)(if_block3);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(li);
            if_blocks[current_block_type_index].d();
            if (if_block1) if_block1.d();
            if (if_block2) if_block2.d();
            if (~current_block_type_index_1) if_blocks_1[current_block_type_index_1].d();
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function instance$h($$self, $$props, $$invalidate) {
    let $childrenQuery;
    let $currentFolder;
    (0, _internal.component_subscribe)($$self, folder, ($$value)=>$$invalidate(7, $currentFolder = $$value));
    const queryClient = useQueryClient();
    let { folder: folder$1  } = $$props;
    let { lazyLoad  } = $$props;
    let over = false;
    let addNewFolder = false;
    let showChildren = !(folder$1 == null ? void 0 : folder$1.id);
    const options = getOptions();
    const handleDragOver = ()=>{
        if (!options.readOnly) $$invalidate(3, over = true);
    };
    const handleDragLeave = ()=>{
        if (!options.readOnly) $$invalidate(3, over = false);
    };
    const handleDrop = (e)=>{
        if (options.readOnly) e.preventDefault();
        Array.from(e.dataTransfer.files).forEach((file)=>uploadFile(options, queryClient, file, folder$1));
    };
    const handleAddFolder = ()=>{
        $$invalidate(4, addNewFolder = true);
        $$invalidate(5, showChildren = true);
        if (!$childrenQuery.isSuccess && (folder$1 == null ? void 0 : folder$1.children) === void 0) $childrenQuery.refetch();
    };
    const exitAddFolder = ()=>{
        $$invalidate(4, addNewFolder = false);
    };
    const loadChildren = ()=>{
        if (showChildren && $currentFolder === folder$1) {
            $$invalidate(5, showChildren = false);
            return;
        }
        $$invalidate(5, showChildren = true);
        (0, _internal.set_store_value)(folder, $currentFolder = folder$1, $currentFolder);
        if ((folder$1 == null ? void 0 : folder$1.children) === void 0) $childrenQuery.refetch();
    };
    const childrenQuery = useQuery(foldersQueryKey(folder$1 == null ? void 0 : folder$1.id), ()=>options.getFolders((folder$1 == null ? void 0 : folder$1.id) ? folder$1 : void 0), {
        enabled: !(folder$1 == null ? void 0 : folder$1.id)
    });
    (0, _internal.component_subscribe)($$self, childrenQuery, (value)=>$$invalidate(2, $childrenQuery = value));
    let children = null;
    $$self.$$set = ($$props2)=>{
        if ("folder" in $$props2) $$invalidate(0, folder$1 = $$props2.folder);
        if ("lazyLoad" in $$props2) $$invalidate(1, lazyLoad = $$props2.lazyLoad);
    };
    $$self.$$.update = ()=>{
        if ($$self.$$.dirty & 7) {
            if ($childrenQuery.isSuccess) $$invalidate(6, children = (lazyLoad ? $childrenQuery.data : nestFolder($childrenQuery.data)).filter((f)=>{
                var _a, _b;
                return ((_a = f.parent) != null ? _a : null) === ((_b = folder$1 == null ? void 0 : folder$1.id) != null ? _b : null);
            }));
        }
    };
    return [
        folder$1,
        lazyLoad,
        $childrenQuery,
        over,
        addNewFolder,
        showChildren,
        children,
        $currentFolder,
        options,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleAddFolder,
        exitAddFolder,
        loadChildren,
        childrenQuery
    ];
}
class Folder extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$h, create_fragment$j, (0, _internal.safe_not_equal), {
            folder: 0,
            lazyLoad: 1
        });
    }
}
var Folders_svelte_svelte_type_style_lang = "";
function get_each_context$4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
}
function create_each_block$4(ctx) {
    let folder2;
    let current;
    folder2 = new Folder({
        props: {
            folder: ctx[2],
            lazyLoad: ctx[1]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(folder2.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(folder2, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const folder_changes = {};
            if (dirty & 1) folder_changes.folder = ctx2[2];
            if (dirty & 2) folder_changes.lazyLoad = ctx2[1];
            folder2.$set(folder_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(folder2.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(folder2.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(folder2, detaching);
        }
    };
}
function create_fragment$i(ctx) {
    let ul;
    let current;
    let each_value = ctx[0];
    let each_blocks = [];
    for(let i = 0; i < each_value.length; i += 1)each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    const out = (i)=>(0, _internal.transition_out)(each_blocks[i], 1, 1, ()=>{
            each_blocks[i] = null;
        });
    return {
        c () {
            ul = (0, _internal.element)("ul");
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].c();
            (0, _internal.attr)(ul, "class", "fm-folders svelte-1spuanm");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, ul, anchor);
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].m(ul, null);
            current = true;
        },
        p (ctx2, [dirty]) {
            if (dirty & 3) {
                each_value = ctx2[0];
                let i;
                for(i = 0; i < each_value.length; i += 1){
                    const child_ctx = get_each_context$4(ctx2, each_value, i);
                    if (each_blocks[i]) {
                        each_blocks[i].p(child_ctx, dirty);
                        (0, _internal.transition_in)(each_blocks[i], 1);
                    } else {
                        each_blocks[i] = create_each_block$4(child_ctx);
                        each_blocks[i].c();
                        (0, _internal.transition_in)(each_blocks[i], 1);
                        each_blocks[i].m(ul, null);
                    }
                }
                (0, _internal.group_outros)();
                for(i = each_value.length; i < each_blocks.length; i += 1)out(i);
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            for(let i = 0; i < each_value.length; i += 1)(0, _internal.transition_in)(each_blocks[i]);
            current = true;
        },
        o (local) {
            each_blocks = each_blocks.filter(Boolean);
            for(let i = 0; i < each_blocks.length; i += 1)(0, _internal.transition_out)(each_blocks[i]);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(ul);
            (0, _internal.destroy_each)(each_blocks, detaching);
        }
    };
}
function instance$g($$self, $$props, $$invalidate) {
    let { folders  } = $$props;
    let { lazyLoad  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("folders" in $$props2) $$invalidate(0, folders = $$props2.folders);
        if ("lazyLoad" in $$props2) $$invalidate(1, lazyLoad = $$props2.lazyLoad);
    };
    return [
        folders,
        lazyLoad
    ];
}
class Folders extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$g, create_fragment$i, (0, _internal.safe_not_equal), {
            folders: 0,
            lazyLoad: 1
        });
    }
}
function create_fragment$h(ctx) {
    let svg;
    let path0;
    let path1;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "d", "M0 6.417a6.424 6.424 0 006.417 6.416 6.424 6.424 0 006.416-6.416A6.424 6.424 0 006.417 0 6.424 6.424 0 000 6.417zm1.833 0a4.589 4.589 0 014.584-4.584A4.589 4.589 0 0111 6.417 4.589 4.589 0 016.417 11a4.589 4.589 0 01-4.584-4.583z");
            (0, _internal.attr)(path0, "fill", "currentColor");
            (0, _internal.attr)(path1, "d", "M13.75 12.543L11.707 10.5c-.35.452-.755.856-1.207 1.207l2.043 2.043a.851.851 0 001.207 0 .853.853 0 000-1.207z");
            (0, _internal.attr)(path1, "fill", "currentColor");
            (0, _internal.attr)(svg, "width", "14");
            (0, _internal.attr)(svg, "height", "14");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
        },
        p: (0, _internal.noop),
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
class IconSearch extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, null, create_fragment$h, (0, _internal.safe_not_equal), {});
    }
}
var Search_svelte_svelte_type_style_lang = "";
function create_fragment$g(ctx) {
    let form;
    let input;
    let t2;
    let button;
    let iconsearch;
    let current;
    let mounted;
    let dispose;
    iconsearch = new IconSearch({});
    return {
        c () {
            form = (0, _internal.element)("form");
            input = (0, _internal.element)("input");
            t2 = (0, _internal.space)();
            button = (0, _internal.element)("button");
            (0, _internal.create_component)(iconsearch.$$.fragment);
            (0, _internal.attr)(input, "type", "search");
            (0, _internal.attr)(input, "name", "search");
            (0, _internal.attr)(input, "placeholder", "e.g. image.png");
            (0, _internal.attr)(input, "class", "svelte-15kvubs");
            (0, _internal.attr)(button, "title", "Search");
            (0, _internal.attr)(button, "class", "svelte-15kvubs");
            (0, _internal.attr)(form, "class", "search svelte-15kvubs");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, form, anchor);
            (0, _internal.append)(form, input);
            (0, _internal.set_input_value)(input, ctx[0]);
            (0, _internal.append)(form, t2);
            (0, _internal.append)(form, button);
            (0, _internal.mount_component)(iconsearch, button, null);
            current = true;
            if (!mounted) {
                dispose = (0, _internal.listen)(input, "input", ctx[1]);
                mounted = true;
            }
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) (0, _internal.set_input_value)(input, ctx2[0]);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconsearch.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconsearch.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(form);
            (0, _internal.destroy_component)(iconsearch);
            mounted = false;
            dispose();
        }
    };
}
function instance$f($$self, $$props, $$invalidate) {
    let $searchQuery;
    (0, _internal.component_subscribe)($$self, searchQuery, ($$value)=>$$invalidate(0, $searchQuery = $$value));
    folder.subscribe(()=>{
        (0, _internal.set_store_value)(searchQuery, $searchQuery = "", $searchQuery);
    });
    function input_input_handler() {
        $searchQuery = this.value;
        searchQuery.set($searchQuery);
    }
    return [
        $searchQuery,
        input_input_handler
    ];
}
class Search extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$f, create_fragment$g, (0, _internal.safe_not_equal), {});
    }
}
var Sidebar_svelte_svelte_type_style_lang = "";
function create_fragment$f(ctx) {
    let aside;
    let search;
    let t2;
    let folders;
    let current;
    search = new Search({});
    folders = new Folders({
        props: {
            folders: [
                null
            ],
            lazyLoad: ctx[0]
        }
    });
    return {
        c () {
            aside = (0, _internal.element)("aside");
            (0, _internal.create_component)(search.$$.fragment);
            t2 = (0, _internal.space)();
            (0, _internal.create_component)(folders.$$.fragment);
            (0, _internal.attr)(aside, "class", "fm-sidebar svelte-jz8ywq");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, aside, anchor);
            (0, _internal.mount_component)(search, aside, null);
            (0, _internal.append)(aside, t2);
            (0, _internal.mount_component)(folders, aside, null);
            current = true;
        },
        p (ctx2, [dirty]) {
            const folders_changes = {};
            if (dirty & 1) folders_changes.lazyLoad = ctx2[0];
            folders.$set(folders_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(search.$$.fragment, local);
            (0, _internal.transition_in)(folders.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(search.$$.fragment, local);
            (0, _internal.transition_out)(folders.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(aside);
            (0, _internal.destroy_component)(search);
            (0, _internal.destroy_component)(folders);
        }
    };
}
function instance$e($$self, $$props, $$invalidate) {
    let { lazyFolders  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("lazyFolders" in $$props2) $$invalidate(0, lazyFolders = $$props2.lazyFolders);
    };
    return [
        lazyFolders
    ];
}
class Sidebar extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$e, create_fragment$f, (0, _internal.safe_not_equal), {
            lazyFolders: 0
        });
    }
}
var IconUpload_svelte_svelte_type_style_lang = "";
function create_fragment$e(ctx) {
    let svg;
    let path0;
    let path1;
    let path1_class_value;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "d", "M21.12 21.1765L3.83997 21.1765L3.83997 19.7647C3.83997 18.985 3.19526 18.3529 2.39997 18.3529C1.60468 18.3529 0.959966 18.985 0.959966 19.7647L0.959966 22.5882C0.959966 22.9781 1.12114 23.331 1.38173 23.5865C1.64232 23.842 2.00232 24 2.39997 24L22.56 24C22.7541 24 22.9393 23.9623 23.1084 23.894C23.6317 23.6826 24 23.1776 24 22.5882L24 19.7647C24 18.985 23.3553 18.3529 22.56 18.3529C21.7647 18.3529 21.12 18.985 21.12 19.7647L21.12 21.1765Z");
            (0, _internal.attr)(path0, "fill", "currentColor");
            (0, _internal.attr)(path1, "d", "M18.884 10.0314C18.6841 9.93335 18.4636 9.88232 18.2401 9.88232C17.9285 9.88232 17.6253 9.9814 17.3761 10.1647L13.92 12.7159C13.92 12.7125 13.92 12.7092 13.92 12.7059L13.92 1.41176C13.92 1.03734 13.7683 0.67825 13.4983 0.413493C13.2282 0.148736 12.862 -2.98024e-06 12.48 -3.01363e-06C12.0981 -3.04702e-06 11.7319 0.148736 11.4618 0.413493C11.1918 0.67825 11.04 1.03734 11.04 1.41176L11.04 12.7059C11.04 12.7325 11.0408 12.7591 11.0423 12.7855L7.55526 10.3764C7.40048 10.2681 7.22535 10.1909 7.03998 10.1493C6.85461 10.1077 6.66267 10.1025 6.47523 10.134C6.2878 10.1655 6.10858 10.233 5.94794 10.3328C5.78729 10.4326 5.64839 10.5626 5.53926 10.7153C5.32063 11.0207 5.23426 11.3986 5.29902 11.7664C5.36378 12.1341 5.57441 12.4617 5.88485 12.6776L11.6449 16.6588C11.8915 16.8355 12.189 16.9307 12.4945 16.9307C12.7999 16.9307 13.0974 16.8355 13.3441 16.6588L19.1041 12.4235C19.2553 12.3123 19.3828 12.1729 19.4791 12.0134C19.5755 11.8538 19.6388 11.6773 19.6656 11.4937C19.6923 11.3102 19.6819 11.1233 19.635 10.9437C19.5881 10.7641 19.5055 10.5953 19.3921 10.447C19.2579 10.2717 19.084 10.1294 18.884 10.0314Z");
            (0, _internal.attr)(path1, "fill", "currentColor");
            (0, _internal.attr)(path1, "class", path1_class_value = (0, _internal.null_to_empty)(ctx[0] ? "animatedArrow" : null) + " svelte-1k824dx");
            (0, _internal.attr)(svg, "width", "24");
            (0, _internal.attr)(svg, "height", "24");
            (0, _internal.attr)(svg, "viewBox", "0 0 24 24");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
        },
        p (ctx2, [dirty]) {
            if (dirty & 1 && path1_class_value !== (path1_class_value = (0, _internal.null_to_empty)(ctx2[0] ? "animatedArrow" : null) + " svelte-1k824dx")) (0, _internal.attr)(path1, "class", path1_class_value);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$d($$self, $$props, $$invalidate) {
    let { animated  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("animated" in $$props2) $$invalidate(0, animated = $$props2.animated);
    };
    return [
        animated
    ];
}
class IconUpload extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$d, create_fragment$e, (0, _internal.safe_not_equal), {
            animated: 0
        });
    }
}
var Dropzone_svelte_svelte_type_style_lang = "";
function create_else_block$1(ctx) {
    let main;
    let t2;
    let span;
    let iconupload;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = ctx[6].default;
    const default_slot = (0, _internal.create_slot)(default_slot_template, ctx, ctx[5], null);
    iconupload = new IconUpload({
        props: {
            animated: ctx[0]
        }
    });
    return {
        c () {
            main = (0, _internal.element)("main");
            if (default_slot) default_slot.c();
            t2 = (0, _internal.space)();
            span = (0, _internal.element)("span");
            (0, _internal.create_component)(iconupload.$$.fragment);
            (0, _internal.attr)(span, "class", "fm-dropzone svelte-lkheja");
            (0, _internal.toggle_class)(span, "active", ctx[0]);
            (0, _internal.attr)(main, "class", "fm-main svelte-lkheja");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, main, anchor);
            if (default_slot) default_slot.m(main, null);
            (0, _internal.append)(main, t2);
            (0, _internal.append)(main, span);
            (0, _internal.mount_component)(iconupload, span, null);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.action_destroyer)(dragOver.call(null, main)),
                    (0, _internal.listen)(main, "dropzoneover", ctx[1]),
                    (0, _internal.listen)(main, "dropzoneleave", ctx[2]),
                    (0, _internal.listen)(main, "drop", ctx[4])
                ];
                mounted = true;
            }
        },
        p (ctx2, dirty) {
            if (default_slot) {
                if (default_slot.p && (!current || dirty & 32)) (0, _internal.update_slot_base)(default_slot, default_slot_template, ctx2, ctx2[5], !current ? (0, _internal.get_all_dirty_from_scope)(ctx2[5]) : (0, _internal.get_slot_changes)(default_slot_template, ctx2[5], dirty, null), null);
            }
            const iconupload_changes = {};
            if (dirty & 1) iconupload_changes.animated = ctx2[0];
            iconupload.$set(iconupload_changes);
            if (dirty & 1) (0, _internal.toggle_class)(span, "active", ctx2[0]);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(default_slot, local);
            (0, _internal.transition_in)(iconupload.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(default_slot, local);
            (0, _internal.transition_out)(iconupload.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(main);
            if (default_slot) default_slot.d(detaching);
            (0, _internal.destroy_component)(iconupload);
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function create_if_block$6(ctx) {
    let main;
    let current;
    const default_slot_template = ctx[6].default;
    const default_slot = (0, _internal.create_slot)(default_slot_template, ctx, ctx[5], null);
    return {
        c () {
            main = (0, _internal.element)("main");
            if (default_slot) default_slot.c();
            (0, _internal.attr)(main, "class", "fm-main svelte-lkheja");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, main, anchor);
            if (default_slot) default_slot.m(main, null);
            current = true;
        },
        p (ctx2, dirty) {
            if (default_slot) {
                if (default_slot.p && (!current || dirty & 32)) (0, _internal.update_slot_base)(default_slot, default_slot_template, ctx2, ctx2[5], !current ? (0, _internal.get_all_dirty_from_scope)(ctx2[5]) : (0, _internal.get_slot_changes)(default_slot_template, ctx2[5], dirty, null), null);
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(default_slot, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(default_slot, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(main);
            if (default_slot) default_slot.d(detaching);
        }
    };
}
function create_fragment$d(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [
        create_if_block$6,
        create_else_block$1
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
        if (ctx2[3].readOnly) return 0;
        return 1;
    }
    current_block_type_index = select_block_type(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
        c () {
            if_block.c();
            if_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            if_blocks[current_block_type_index].m(target, anchor);
            (0, _internal.insert)(target, if_block_anchor, anchor);
            current = true;
        },
        p (ctx2, [dirty]) {
            if_block.p(ctx2, dirty);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if_blocks[current_block_type_index].d(detaching);
            if (detaching) (0, _internal.detach)(if_block_anchor);
        }
    };
}
function instance$c($$self, $$props, $$invalidate) {
    let $folder;
    (0, _internal.component_subscribe)($$self, folder, ($$value)=>$$invalidate(7, $folder = $$value));
    let { $$slots: slots = {} , $$scope  } = $$props;
    let over = false;
    const handleDragOver = ()=>$$invalidate(0, over = true);
    const handleDragLeave = ()=>$$invalidate(0, over = false);
    const queryClient = useQueryClient();
    const options = getOptions();
    const handleDrop = (e)=>{
        Array.from(e.dataTransfer.files).forEach(async (file)=>{
            uploads.push(file);
            await uploadFile(options, queryClient, file, $folder);
            uploads.remove(file);
        });
    };
    $$self.$$set = ($$props2)=>{
        if ("$$scope" in $$props2) $$invalidate(5, $$scope = $$props2.$$scope);
    };
    return [
        over,
        handleDragOver,
        handleDragLeave,
        options,
        handleDrop,
        $$scope,
        slots
    ];
}
class Dropzone extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$c, create_fragment$d, (0, _internal.safe_not_equal), {});
    }
}
var UploadProgress_svelte_svelte_type_style_lang = "";
function get_each_context$3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[1] = list[i];
    return child_ctx;
}
function create_if_block$5(ctx) {
    let aside;
    let current;
    let each_value = ctx[0];
    let each_blocks = [];
    for(let i = 0; i < each_value.length; i += 1)each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    const out = (i)=>(0, _internal.transition_out)(each_blocks[i], 1, 1, ()=>{
            each_blocks[i] = null;
        });
    return {
        c () {
            aside = (0, _internal.element)("aside");
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].c();
            (0, _internal.attr)(aside, "class", "fm-upload-progress svelte-3nncjb");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, aside, anchor);
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].m(aside, null);
            current = true;
        },
        p (ctx2, dirty) {
            if (dirty & 1) {
                each_value = ctx2[0];
                let i;
                for(i = 0; i < each_value.length; i += 1){
                    const child_ctx = get_each_context$3(ctx2, each_value, i);
                    if (each_blocks[i]) {
                        each_blocks[i].p(child_ctx, dirty);
                        (0, _internal.transition_in)(each_blocks[i], 1);
                    } else {
                        each_blocks[i] = create_each_block$3(child_ctx);
                        each_blocks[i].c();
                        (0, _internal.transition_in)(each_blocks[i], 1);
                        each_blocks[i].m(aside, null);
                    }
                }
                (0, _internal.group_outros)();
                for(i = each_value.length; i < each_blocks.length; i += 1)out(i);
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            for(let i = 0; i < each_value.length; i += 1)(0, _internal.transition_in)(each_blocks[i]);
            current = true;
        },
        o (local) {
            each_blocks = each_blocks.filter(Boolean);
            for(let i = 0; i < each_blocks.length; i += 1)(0, _internal.transition_out)(each_blocks[i]);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(aside);
            (0, _internal.destroy_each)(each_blocks, detaching);
        }
    };
}
function create_each_block$3(ctx) {
    let div2;
    let div1;
    let t0_value = ctx[1].name + "";
    let t0;
    let t1;
    let div0;
    let t2;
    let div2_transition;
    let current;
    return {
        c () {
            div2 = (0, _internal.element)("div");
            div1 = (0, _internal.element)("div");
            t0 = (0, _internal.text)(t0_value);
            t1 = (0, _internal.space)();
            div0 = (0, _internal.element)("div");
            t2 = (0, _internal.space)();
            (0, _internal.attr)(div0, "class", "fm-upload-progress-bar svelte-3nncjb");
            (0, _internal.attr)(div1, "class", "fm-upload-progress-item svelte-3nncjb");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div2, anchor);
            (0, _internal.append)(div2, div1);
            (0, _internal.append)(div1, t0);
            (0, _internal.append)(div1, t1);
            (0, _internal.append)(div1, div0);
            (0, _internal.append)(div2, t2);
            current = true;
        },
        p (ctx2, dirty) {
            if ((!current || dirty & 1) && t0_value !== (t0_value = ctx2[1].name + "")) (0, _internal.set_data)(t0, t0_value);
        },
        i (local) {
            if (current) return;
            (0, _internal.add_render_callback)(()=>{
                if (!div2_transition) div2_transition = (0, _internal.create_bidirectional_transition)(div2, (0, _transition.fly), {
                    x: 20
                }, true);
                div2_transition.run(1);
            });
            current = true;
        },
        o (local) {
            if (!div2_transition) div2_transition = (0, _internal.create_bidirectional_transition)(div2, (0, _transition.fly), {
                x: 20
            }, false);
            div2_transition.run(0);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div2);
            if (detaching && div2_transition) div2_transition.end();
        }
    };
}
function create_fragment$c(ctx) {
    let if_block_anchor;
    let current;
    let if_block = ctx[0].length > 0 && create_if_block$5(ctx);
    return {
        c () {
            if (if_block) if_block.c();
            if_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            if (if_block) if_block.m(target, anchor);
            (0, _internal.insert)(target, if_block_anchor, anchor);
            current = true;
        },
        p (ctx2, [dirty]) {
            if (ctx2[0].length > 0) {
                if (if_block) {
                    if_block.p(ctx2, dirty);
                    if (dirty & 1) (0, _internal.transition_in)(if_block, 1);
                } else {
                    if_block = create_if_block$5(ctx2);
                    if_block.c();
                    (0, _internal.transition_in)(if_block, 1);
                    if_block.m(if_block_anchor.parentNode, if_block_anchor);
                }
            } else if (if_block) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_block, 1, 1, ()=>{
                    if_block = null;
                });
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (if_block) if_block.d(detaching);
            if (detaching) (0, _internal.detach)(if_block_anchor);
        }
    };
}
function instance$b($$self, $$props, $$invalidate) {
    let $uploads;
    (0, _internal.component_subscribe)($$self, uploads, ($$value)=>$$invalidate(0, $uploads = $$value));
    return [
        $uploads
    ];
}
class UploadProgress extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$b, create_fragment$c, (0, _internal.safe_not_equal), {});
    }
}
function create_fragment$b(ctx) {
    let svg;
    let rect;
    let path;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            rect = (0, _internal.svg_element)("rect");
            path = (0, _internal.svg_element)("path");
            (0, _internal.attr)(rect, "width", "16");
            (0, _internal.attr)(rect, "height", "16");
            (0, _internal.attr)(rect, "fill", "white");
            (0, _internal.attr)(path, "fill-rule", "evenodd");
            (0, _internal.attr)(path, "clip-rule", "evenodd");
            (0, _internal.attr)(path, "d", "M1 0H15C15.6 0 16 0.4 16 1V15C16 15.6 15.6 16 15 16H1C0.4 16 0 15.6 0 15V1C0 0.4 0.4 0 1 0ZM10.1 11.5L11.5 10.1L9.4 8L11.5 5.9L10.1 4.5L8 6.6L5.9 4.5L4.5 5.9L6.6 8L4.5 10.1L5.9 11.5L8 9.4L10.1 11.5Z");
            (0, _internal.attr)(path, "fill", "currentColor");
            (0, _internal.attr)(svg, "width", "16");
            (0, _internal.attr)(svg, "height", "16");
            (0, _internal.attr)(svg, "viewBox", "0 0 16 16");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, rect);
            (0, _internal.append)(svg, path);
        },
        p: (0, _internal.noop),
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
class IconDelete extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, null, create_fragment$b, (0, _internal.safe_not_equal), {});
    }
}
function create_fragment$a(ctx) {
    let svg;
    let path0;
    let path1;
    let path2;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            path2 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "d", "M7 8H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1z");
            (0, _internal.attr)(path0, "fill", "currentColor");
            (0, _internal.attr)(path1, "d", "M11 4H2v2h8v8h2V5c0-.6-.4-1-1-1z");
            (0, _internal.attr)(path1, "fill", "currentColor");
            (0, _internal.attr)(path2, "d", "M15 0H6v2h8v8h2V1c0-.6-.4-1-1-1z");
            (0, _internal.attr)(path2, "fill", "currentColor");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
            (0, _internal.attr)(svg, "width", ctx[0]);
            (0, _internal.attr)(svg, "height", ctx[0]);
            (0, _internal.attr)(svg, "viewBox", "0 0 16 16");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
            (0, _internal.append)(svg, path2);
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) (0, _internal.attr)(svg, "width", ctx2[0]);
            if (dirty & 1) (0, _internal.attr)(svg, "height", ctx2[0]);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$a($$self, $$props, $$invalidate) {
    let { size =16  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("size" in $$props2) $$invalidate(0, size = $$props2.size);
    };
    return [
        size
    ];
}
class IconCopy extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$a, create_fragment$a, (0, _internal.safe_not_equal), {
            size: 0
        });
    }
}
function useFileActions(file, element2) {
    const queryClient = useQueryClient();
    const options = getOptions();
    const handleDelete = ()=>{
        if (!confirm(t("deleteConfirm"))) return;
        removeFile(options, queryClient, file);
    };
    const handleClick = ()=>{
        element2.dispatchEvent(new CustomEvent("selectfile", {
            detail: file,
            bubbles: true
        }));
    };
    const handleCopy = ()=>{
        navigator.clipboard.writeText(file.url);
        flash("Le lien a \xe9t\xe9 copi\xe9 dans votre presse papier");
    };
    return {
        handleClick,
        handleCopy,
        handleDelete
    };
}
function shorten(str, max) {
    if (str.length <= max) return str;
    return str.slice(0, max - 11) + "..." + str.slice(-8);
}
var FileRow_svelte_svelte_type_style_lang = "";
function create_if_block$4(ctx) {
    let button;
    let icondelete;
    let tooltip_action;
    let current;
    let mounted;
    let dispose;
    icondelete = new IconDelete({});
    return {
        c () {
            button = (0, _internal.element)("button");
            (0, _internal.create_component)(icondelete.$$.fragment);
            (0, _internal.attr)(button, "class", "svelte-1ntuvox");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, button, anchor);
            (0, _internal.mount_component)(icondelete, button, null);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.action_destroyer)(tooltip_action = tooltip.call(null, button, t("delete"))),
                    (0, _internal.listen)(button, "click", (0, _internal.stop_propagation)((0, _internal.prevent_default)(function() {
                        if ((0, _internal.is_function)(ctx[3].handleDelete)) ctx[3].handleDelete.apply(this, arguments);
                    })))
                ];
                mounted = true;
            }
        },
        p (new_ctx, dirty) {
            ctx = new_ctx;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(icondelete.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(icondelete.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(button);
            (0, _internal.destroy_component)(icondelete);
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function create_fragment$9(ctx) {
    let tr;
    let td0;
    let t0;
    let td1;
    let img;
    let img_src_value;
    let t1;
    let td2;
    let t2;
    let t3;
    let td3;
    let t4_value = (ctx[0].size ? ctx[5].format(ctx[0].size / 1e3) : null) + "";
    let t4;
    let t5;
    let td4;
    let button;
    let iconcopy;
    let t6;
    let current;
    let mounted;
    let dispose;
    iconcopy = new IconCopy({});
    let if_block = !ctx[4].readOnly && create_if_block$4(ctx);
    return {
        c () {
            tr = (0, _internal.element)("tr");
            td0 = (0, _internal.element)("td");
            t0 = (0, _internal.space)();
            td1 = (0, _internal.element)("td");
            img = (0, _internal.element)("img");
            t1 = (0, _internal.space)();
            td2 = (0, _internal.element)("td");
            t2 = (0, _internal.text)(ctx[2]);
            t3 = (0, _internal.space)();
            td3 = (0, _internal.element)("td");
            t4 = (0, _internal.text)(t4_value);
            t5 = (0, _internal.space)();
            td4 = (0, _internal.element)("td");
            button = (0, _internal.element)("button");
            (0, _internal.create_component)(iconcopy.$$.fragment);
            t6 = (0, _internal.space)();
            if (if_block) if_block.c();
            (0, _internal.attr)(td0, "class", "svelte-1ntuvox");
            if (!(0, _internal.src_url_equal)(img.src, img_src_value = ctx[0].thumbnail)) (0, _internal.attr)(img, "src", img_src_value);
            (0, _internal.attr)(img, "alt", "");
            (0, _internal.attr)(img, "class", "svelte-1ntuvox");
            (0, _internal.attr)(td1, "class", "svelte-1ntuvox");
            (0, _internal.attr)(td2, "class", "filename svelte-1ntuvox");
            (0, _internal.attr)(td3, "class", "svelte-1ntuvox");
            (0, _internal.attr)(button, "class", "svelte-1ntuvox");
            (0, _internal.attr)(td4, "class", "actions svelte-1ntuvox");
            (0, _internal.attr)(tr, "class", "svelte-1ntuvox");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, tr, anchor);
            (0, _internal.append)(tr, td0);
            (0, _internal.append)(tr, t0);
            (0, _internal.append)(tr, td1);
            (0, _internal.append)(td1, img);
            (0, _internal.append)(tr, t1);
            (0, _internal.append)(tr, td2);
            (0, _internal.append)(td2, t2);
            (0, _internal.append)(tr, t3);
            (0, _internal.append)(tr, td3);
            (0, _internal.append)(td3, t4);
            (0, _internal.append)(tr, t5);
            (0, _internal.append)(tr, td4);
            (0, _internal.append)(td4, button);
            (0, _internal.mount_component)(iconcopy, button, null);
            (0, _internal.append)(td4, t6);
            if (if_block) if_block.m(td4, null);
            ctx[6](tr);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.action_destroyer)(tooltip.call(null, button, t("copy"))),
                    (0, _internal.listen)(button, "click", (0, _internal.stop_propagation)((0, _internal.prevent_default)(function() {
                        if ((0, _internal.is_function)(ctx[3].handleCopy)) ctx[3].handleCopy.apply(this, arguments);
                    }))),
                    (0, _internal.listen)(tr, "click", function() {
                        if ((0, _internal.is_function)(ctx[3].handleClick)) ctx[3].handleClick.apply(this, arguments);
                    })
                ];
                mounted = true;
            }
        },
        p (new_ctx, [dirty]) {
            ctx = new_ctx;
            if (!current || dirty & 1 && !(0, _internal.src_url_equal)(img.src, img_src_value = ctx[0].thumbnail)) (0, _internal.attr)(img, "src", img_src_value);
            if (!current || dirty & 4) (0, _internal.set_data)(t2, ctx[2]);
            if ((!current || dirty & 1) && t4_value !== (t4_value = (ctx[0].size ? ctx[5].format(ctx[0].size / 1e3) : null) + "")) (0, _internal.set_data)(t4, t4_value);
            if (!ctx[4].readOnly) if_block.p(ctx, dirty);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconcopy.$$.fragment, local);
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconcopy.$$.fragment, local);
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(tr);
            (0, _internal.destroy_component)(iconcopy);
            if (if_block) if_block.d();
            ctx[6](null);
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function instance$9($$self, $$props, $$invalidate) {
    let actions;
    let filename;
    let row;
    const options = getOptions();
    const sizeFormatter = new Intl.NumberFormat(void 0, {
        style: "unit",
        unit: "kilobyte",
        unitDisplay: "short",
        maximumSignificantDigits: 3
    });
    let { file  } = $$props;
    function tr_binding($$value) {
        (0, _internal.binding_callbacks)[$$value ? "unshift" : "push"](()=>{
            row = $$value;
            $$invalidate(1, row);
        });
    }
    $$self.$$set = ($$props2)=>{
        if ("file" in $$props2) $$invalidate(0, file = $$props2.file);
    };
    $$self.$$.update = ()=>{
        if ($$self.$$.dirty & 3) $$invalidate(3, actions = useFileActions(file, row));
        if ($$self.$$.dirty & 1) $$invalidate(2, filename = shorten(file.name, 35));
    };
    return [
        file,
        row,
        filename,
        actions,
        options,
        sizeFormatter,
        tr_binding
    ];
}
class FileRow extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$9, create_fragment$9, (0, _internal.safe_not_equal), {
            file: 0
        });
    }
}
var FilesListRows_svelte_svelte_type_style_lang = "";
function get_each_context$2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[1] = list[i];
    return child_ctx;
}
function create_each_block$2(ctx) {
    let filerow;
    let current;
    filerow = new FileRow({
        props: {
            file: ctx[1]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(filerow.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(filerow, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const filerow_changes = {};
            if (dirty & 1) filerow_changes.file = ctx2[1];
            filerow.$set(filerow_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(filerow.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(filerow.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(filerow, detaching);
        }
    };
}
function create_fragment$8(ctx) {
    let table;
    let thead;
    let tr;
    let th0;
    let t0;
    let th1;
    let t1;
    let th2;
    let t3;
    let th3;
    let t5;
    let th4;
    let t6;
    let tbody;
    let current;
    let each_value = ctx[0];
    let each_blocks = [];
    for(let i = 0; i < each_value.length; i += 1)each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    const out = (i)=>(0, _internal.transition_out)(each_blocks[i], 1, 1, ()=>{
            each_blocks[i] = null;
        });
    return {
        c () {
            table = (0, _internal.element)("table");
            thead = (0, _internal.element)("thead");
            tr = (0, _internal.element)("tr");
            th0 = (0, _internal.element)("th");
            t0 = (0, _internal.space)();
            th1 = (0, _internal.element)("th");
            t1 = (0, _internal.space)();
            th2 = (0, _internal.element)("th");
            th2.textContent = `${t("filename")}`;
            t3 = (0, _internal.space)();
            th3 = (0, _internal.element)("th");
            th3.textContent = `${t("size")}`;
            t5 = (0, _internal.space)();
            th4 = (0, _internal.element)("th");
            t6 = (0, _internal.space)();
            tbody = (0, _internal.element)("tbody");
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].c();
            (0, _internal.attr)(table, "class", "svelte-88gfvn");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, table, anchor);
            (0, _internal.append)(table, thead);
            (0, _internal.append)(thead, tr);
            (0, _internal.append)(tr, th0);
            (0, _internal.append)(tr, t0);
            (0, _internal.append)(tr, th1);
            (0, _internal.append)(tr, t1);
            (0, _internal.append)(tr, th2);
            (0, _internal.append)(tr, t3);
            (0, _internal.append)(tr, th3);
            (0, _internal.append)(tr, t5);
            (0, _internal.append)(tr, th4);
            (0, _internal.append)(table, t6);
            (0, _internal.append)(table, tbody);
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].m(tbody, null);
            current = true;
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) {
                each_value = ctx2[0];
                let i;
                for(i = 0; i < each_value.length; i += 1){
                    const child_ctx = get_each_context$2(ctx2, each_value, i);
                    if (each_blocks[i]) {
                        each_blocks[i].p(child_ctx, dirty);
                        (0, _internal.transition_in)(each_blocks[i], 1);
                    } else {
                        each_blocks[i] = create_each_block$2(child_ctx);
                        each_blocks[i].c();
                        (0, _internal.transition_in)(each_blocks[i], 1);
                        each_blocks[i].m(tbody, null);
                    }
                }
                (0, _internal.group_outros)();
                for(i = each_value.length; i < each_blocks.length; i += 1)out(i);
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            for(let i = 0; i < each_value.length; i += 1)(0, _internal.transition_in)(each_blocks[i]);
            current = true;
        },
        o (local) {
            each_blocks = each_blocks.filter(Boolean);
            for(let i = 0; i < each_blocks.length; i += 1)(0, _internal.transition_out)(each_blocks[i]);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(table);
            (0, _internal.destroy_each)(each_blocks, detaching);
        }
    };
}
function instance$8($$self, $$props, $$invalidate) {
    let { files  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("files" in $$props2) $$invalidate(0, files = $$props2.files);
    };
    return [
        files
    ];
}
class FilesListRows extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$8, create_fragment$8, (0, _internal.safe_not_equal), {
            files: 0
        });
    }
}
var FileCell_svelte_svelte_type_style_lang = "";
function create_if_block$3(ctx) {
    let button;
    let icondelete;
    let tooltip_action;
    let current;
    let mounted;
    let dispose;
    icondelete = new IconDelete({});
    return {
        c () {
            button = (0, _internal.element)("button");
            (0, _internal.create_component)(icondelete.$$.fragment);
            (0, _internal.attr)(button, "class", "fm-delete svelte-c91skb");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, button, anchor);
            (0, _internal.mount_component)(icondelete, button, null);
            current = true;
            if (!mounted) {
                dispose = [
                    (0, _internal.action_destroyer)(tooltip_action = tooltip.call(null, button, t("delete"))),
                    (0, _internal.listen)(button, "click", (0, _internal.stop_propagation)((0, _internal.prevent_default)(function() {
                        if ((0, _internal.is_function)(ctx[2].handleDelete)) ctx[2].handleDelete.apply(this, arguments);
                    })))
                ];
                mounted = true;
            }
        },
        p (new_ctx, dirty) {
            ctx = new_ctx;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(icondelete.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(icondelete.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(button);
            (0, _internal.destroy_component)(icondelete);
            mounted = false;
            (0, _internal.run_all)(dispose);
        }
    };
}
function create_fragment$7(ctx) {
    let div2;
    let div0;
    let img;
    let img_src_value;
    let t0;
    let t1;
    let div1;
    let t2;
    let current;
    let mounted;
    let dispose;
    let if_block = !ctx[4].readOnly && create_if_block$3(ctx);
    return {
        c () {
            div2 = (0, _internal.element)("div");
            div0 = (0, _internal.element)("div");
            img = (0, _internal.element)("img");
            t0 = (0, _internal.space)();
            if (if_block) if_block.c();
            t1 = (0, _internal.space)();
            div1 = (0, _internal.element)("div");
            t2 = (0, _internal.text)(ctx[3]);
            if (!(0, _internal.src_url_equal)(img.src, img_src_value = ctx[0].thumbnail)) (0, _internal.attr)(img, "src", img_src_value);
            (0, _internal.attr)(img, "alt", "");
            (0, _internal.attr)(img, "class", "svelte-c91skb");
            (0, _internal.attr)(div0, "class", "fm-thumbnail svelte-c91skb");
            (0, _internal.attr)(div1, "class", "fm-filename svelte-c91skb");
            (0, _internal.attr)(div2, "class", "fm-file svelte-c91skb");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div2, anchor);
            (0, _internal.append)(div2, div0);
            (0, _internal.append)(div0, img);
            (0, _internal.append)(div0, t0);
            if (if_block) if_block.m(div0, null);
            (0, _internal.append)(div2, t1);
            (0, _internal.append)(div2, div1);
            (0, _internal.append)(div1, t2);
            ctx[5](div2);
            current = true;
            if (!mounted) {
                dispose = (0, _internal.listen)(div2, "click", function() {
                    if ((0, _internal.is_function)(ctx[2].handleClick)) ctx[2].handleClick.apply(this, arguments);
                });
                mounted = true;
            }
        },
        p (new_ctx, [dirty]) {
            ctx = new_ctx;
            if (!current || dirty & 1 && !(0, _internal.src_url_equal)(img.src, img_src_value = ctx[0].thumbnail)) (0, _internal.attr)(img, "src", img_src_value);
            if (!ctx[4].readOnly) if_block.p(ctx, dirty);
            if (!current || dirty & 8) (0, _internal.set_data)(t2, ctx[3]);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div2);
            if (if_block) if_block.d();
            ctx[5](null);
            mounted = false;
            dispose();
        }
    };
}
function instance$7($$self, $$props, $$invalidate) {
    let filename;
    let actions;
    let el;
    const options = getOptions();
    let { file  } = $$props;
    function div2_binding($$value) {
        (0, _internal.binding_callbacks)[$$value ? "unshift" : "push"](()=>{
            el = $$value;
            $$invalidate(1, el);
        });
    }
    $$self.$$set = ($$props2)=>{
        if ("file" in $$props2) $$invalidate(0, file = $$props2.file);
    };
    $$self.$$.update = ()=>{
        if ($$self.$$.dirty & 1) $$invalidate(3, filename = shorten(file.name, 30));
        if ($$self.$$.dirty & 3) $$invalidate(2, actions = useFileActions(file, el));
    };
    return [
        file,
        el,
        actions,
        filename,
        options,
        div2_binding
    ];
}
class FileCell extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$7, create_fragment$7, (0, _internal.safe_not_equal), {
            file: 0
        });
    }
}
var FilesListGrid_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[1] = list[i];
    return child_ctx;
}
function create_each_block$1(ctx) {
    let filecell;
    let current;
    filecell = new FileCell({
        props: {
            file: ctx[1]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(filecell.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(filecell, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const filecell_changes = {};
            if (dirty & 1) filecell_changes.file = ctx2[1];
            filecell.$set(filecell_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(filecell.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(filecell.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(filecell, detaching);
        }
    };
}
function create_fragment$6(ctx) {
    let div;
    let current;
    let each_value = ctx[0];
    let each_blocks = [];
    for(let i = 0; i < each_value.length; i += 1)each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    const out = (i)=>(0, _internal.transition_out)(each_blocks[i], 1, 1, ()=>{
            each_blocks[i] = null;
        });
    return {
        c () {
            div = (0, _internal.element)("div");
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].c();
            (0, _internal.attr)(div, "class", "grid svelte-trks37");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].m(div, null);
            current = true;
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) {
                each_value = ctx2[0];
                let i;
                for(i = 0; i < each_value.length; i += 1){
                    const child_ctx = get_each_context$1(ctx2, each_value, i);
                    if (each_blocks[i]) {
                        each_blocks[i].p(child_ctx, dirty);
                        (0, _internal.transition_in)(each_blocks[i], 1);
                    } else {
                        each_blocks[i] = create_each_block$1(child_ctx);
                        each_blocks[i].c();
                        (0, _internal.transition_in)(each_blocks[i], 1);
                        each_blocks[i].m(div, null);
                    }
                }
                (0, _internal.group_outros)();
                for(i = each_value.length; i < each_blocks.length; i += 1)out(i);
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            for(let i = 0; i < each_value.length; i += 1)(0, _internal.transition_in)(each_blocks[i]);
            current = true;
        },
        o (local) {
            each_blocks = each_blocks.filter(Boolean);
            for(let i = 0; i < each_blocks.length; i += 1)(0, _internal.transition_out)(each_blocks[i]);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
            (0, _internal.destroy_each)(each_blocks, detaching);
        }
    };
}
function instance$6($$self, $$props, $$invalidate) {
    let { files  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("files" in $$props2) $$invalidate(0, files = $$props2.files);
    };
    return [
        files
    ];
}
class FilesListGrid extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$6, create_fragment$6, (0, _internal.safe_not_equal), {
            files: 0
        });
    }
}
var FilesList_svelte_svelte_type_style_lang = "";
function create_else_block_1(ctx) {
    let div;
    let p0;
    let t1;
    let p1;
    let t3;
    let current;
    let if_block = ctx[3] && !ctx[5].readOnly && create_if_block_3(ctx);
    return {
        c () {
            div = (0, _internal.element)("div");
            p0 = (0, _internal.element)("p");
            p0.textContent = `${t("emptyTitle")}`;
            t1 = (0, _internal.space)();
            p1 = (0, _internal.element)("p");
            p1.textContent = `${t("emptyDescription")}`;
            t3 = (0, _internal.space)();
            if (if_block) if_block.c();
            (0, _internal.attr)(p0, "class", "big svelte-mbr02");
            (0, _internal.attr)(p1, "class", "svelte-mbr02");
            (0, _internal.attr)(div, "class", "empty svelte-mbr02");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
            (0, _internal.append)(div, p0);
            (0, _internal.append)(div, t1);
            (0, _internal.append)(div, p1);
            (0, _internal.append)(div, t3);
            if (if_block) if_block.m(div, null);
            current = true;
        },
        p (ctx2, dirty) {
            if (ctx2[3] && !ctx2[5].readOnly) {
                if (if_block) {
                    if_block.p(ctx2, dirty);
                    if (dirty & 8) (0, _internal.transition_in)(if_block, 1);
                } else {
                    if_block = create_if_block_3(ctx2);
                    if_block.c();
                    (0, _internal.transition_in)(if_block, 1);
                    if_block.m(div, null);
                }
            } else if (if_block) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_block, 1, 1, ()=>{
                    if_block = null;
                });
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
            if (if_block) if_block.d();
        }
    };
}
function create_if_block_2(ctx) {
    let div;
    let iconloader;
    let current;
    iconloader = new IconLoader({});
    return {
        c () {
            div = (0, _internal.element)("div");
            (0, _internal.create_component)(iconloader.$$.fragment);
            (0, _internal.attr)(div, "class", "empty svelte-mbr02");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
            (0, _internal.mount_component)(iconloader, div, null);
            current = true;
        },
        p: (0, _internal.noop),
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconloader.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconloader.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
            (0, _internal.destroy_component)(iconloader);
        }
    };
}
function create_if_block$2(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [
        create_if_block_1$1,
        create_else_block
    ];
    const if_blocks = [];
    function select_block_type_1(ctx2, dirty) {
        if (ctx2[0] === "rows") return 0;
        return 1;
    }
    current_block_type_index = select_block_type_1(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
        c () {
            if_block.c();
            if_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            if_blocks[current_block_type_index].m(target, anchor);
            (0, _internal.insert)(target, if_block_anchor, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            let previous_block_index = current_block_type_index;
            current_block_type_index = select_block_type_1(ctx2);
            if (current_block_type_index === previous_block_index) if_blocks[current_block_type_index].p(ctx2, dirty);
            else {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_blocks[previous_block_index], 1, 1, ()=>{
                    if_blocks[previous_block_index] = null;
                });
                (0, _internal.check_outros)();
                if_block = if_blocks[current_block_type_index];
                if (!if_block) {
                    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
                    if_block.c();
                } else if_block.p(ctx2, dirty);
                (0, _internal.transition_in)(if_block, 1);
                if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if_blocks[current_block_type_index].d(detaching);
            if (detaching) (0, _internal.detach)(if_block_anchor);
        }
    };
}
function create_if_block_3(ctx) {
    let button;
    let t0;
    let t1_value = t("deleteFolder") + "";
    let t1;
    let button_disabled_value;
    let current;
    let mounted;
    let dispose;
    let if_block = ctx[4].isLoading && create_if_block_4();
    return {
        c () {
            button = (0, _internal.element)("button");
            if (if_block) if_block.c();
            t0 = (0, _internal.space)();
            t1 = (0, _internal.text)(t1_value);
            (0, _internal.attr)(button, "class", "delete-folder svelte-mbr02");
            button.disabled = button_disabled_value = ctx[4].isLoading;
        },
        m (target, anchor) {
            (0, _internal.insert)(target, button, anchor);
            if (if_block) if_block.m(button, null);
            (0, _internal.append)(button, t0);
            (0, _internal.append)(button, t1);
            current = true;
            if (!mounted) {
                dispose = (0, _internal.listen)(button, "click", (0, _internal.prevent_default)(ctx[7]));
                mounted = true;
            }
        },
        p (ctx2, dirty) {
            if (ctx2[4].isLoading) {
                if (if_block) {
                    if (dirty & 16) (0, _internal.transition_in)(if_block, 1);
                } else {
                    if_block = create_if_block_4();
                    if_block.c();
                    (0, _internal.transition_in)(if_block, 1);
                    if_block.m(button, t0);
                }
            } else if (if_block) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_block, 1, 1, ()=>{
                    if_block = null;
                });
                (0, _internal.check_outros)();
            }
            if (!current || dirty & 16 && button_disabled_value !== (button_disabled_value = ctx2[4].isLoading)) button.disabled = button_disabled_value;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(button);
            if (if_block) if_block.d();
            mounted = false;
            dispose();
        }
    };
}
function create_if_block_4(ctx) {
    let iconloader;
    let current;
    iconloader = new IconLoader({
        props: {
            size: 12
        }
    });
    return {
        c () {
            (0, _internal.create_component)(iconloader.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconloader, target, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconloader.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconloader.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconloader, detaching);
        }
    };
}
function create_else_block(ctx) {
    let fileslistgrid;
    let current;
    fileslistgrid = new FilesListGrid({
        props: {
            files: ctx[2]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(fileslistgrid.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(fileslistgrid, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const fileslistgrid_changes = {};
            if (dirty & 4) fileslistgrid_changes.files = ctx2[2];
            fileslistgrid.$set(fileslistgrid_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(fileslistgrid.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(fileslistgrid.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(fileslistgrid, detaching);
        }
    };
}
function create_if_block_1$1(ctx) {
    let fileslistrows;
    let current;
    fileslistrows = new FilesListRows({
        props: {
            files: ctx[2]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(fileslistrows.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(fileslistrows, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const fileslistrows_changes = {};
            if (dirty & 4) fileslistrows_changes.files = ctx2[2];
            fileslistrows.$set(fileslistrows_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(fileslistrows.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(fileslistrows.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(fileslistrows, detaching);
        }
    };
}
function create_fragment$5(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [
        create_if_block$2,
        create_if_block_2,
        create_else_block_1
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
        if (ctx2[2].length > 0) return 0;
        if (ctx2[1].isLoading) return 1;
        return 2;
    }
    current_block_type_index = select_block_type(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
        c () {
            if_block.c();
            if_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            if_blocks[current_block_type_index].m(target, anchor);
            (0, _internal.insert)(target, if_block_anchor, anchor);
            current = true;
        },
        p (ctx2, [dirty]) {
            let previous_block_index = current_block_type_index;
            current_block_type_index = select_block_type(ctx2);
            if (current_block_type_index === previous_block_index) if_blocks[current_block_type_index].p(ctx2, dirty);
            else {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_blocks[previous_block_index], 1, 1, ()=>{
                    if_blocks[previous_block_index] = null;
                });
                (0, _internal.check_outros)();
                if_block = if_blocks[current_block_type_index];
                if (!if_block) {
                    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
                    if_block.c();
                } else if_block.p(ctx2, dirty);
                (0, _internal.transition_in)(if_block, 1);
                if_block.m(if_block_anchor.parentNode, if_block_anchor);
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if_blocks[current_block_type_index].d(detaching);
            if (detaching) (0, _internal.detach)(if_block_anchor);
        }
    };
}
function instance$5($$self, $$props, $$invalidate) {
    let isEmpty;
    let $filesQuery;
    let $folders;
    let $searchQuery;
    let $deleteFolder;
    (0, _internal.component_subscribe)($$self, searchQuery, ($$value)=>$$invalidate(12, $searchQuery = $$value));
    let { layout  } = $$props;
    let { folder: folder2  } = $$props;
    const options = getOptions();
    const deleteFolder = useDeleteFolderMutation();
    (0, _internal.component_subscribe)($$self, deleteFolder, (value)=>$$invalidate(4, $deleteFolder = value));
    const handleDelete = ()=>{
        if (folder2) $deleteFolder.mutate(folder2);
    };
    const filesQuery = useQuery(filesQueryKey(folder2 == null ? void 0 : folder2.id), ()=>getOptions().getFiles(folder2));
    (0, _internal.component_subscribe)($$self, filesQuery, (value)=>$$invalidate(1, $filesQuery = value));
    let files = [];
    const folders = useQuery(foldersQueryKey(folder2 == null ? void 0 : folder2.id), ()=>[], {
        enabled: false
    });
    (0, _internal.component_subscribe)($$self, folders, (value)=>$$invalidate(11, $folders = value));
    $$self.$$set = ($$props2)=>{
        if ("layout" in $$props2) $$invalidate(0, layout = $$props2.layout);
        if ("folder" in $$props2) $$invalidate(10, folder2 = $$props2.folder);
    };
    $$self.$$.update = ()=>{
        var _a, _b;
        if ($$self.$$.dirty & 4098) $$invalidate(2, files = $filesQuery.isSuccess ? $filesQuery.data.filter((f)=>$searchQuery ? f.name.includes($searchQuery) : true) : []);
        if ($$self.$$.dirty & 3074) $$invalidate(3, isEmpty = (folder2 == null ? void 0 : folder2.id) && ((folder2 == null ? void 0 : folder2.children) && folder2.children.length === 0 || $folders.isSuccess && ((_a = $folders == null ? void 0 : $folders.data) == null ? void 0 : _a.length) === 0) && $filesQuery.isSuccess && ((_b = $filesQuery == null ? void 0 : $filesQuery.data) == null ? void 0 : _b.length) === 0);
    };
    return [
        layout,
        $filesQuery,
        files,
        isEmpty,
        $deleteFolder,
        options,
        deleteFolder,
        handleDelete,
        filesQuery,
        folders,
        folder2,
        $folders,
        $searchQuery
    ];
}
class FilesList extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$5, create_fragment$5, (0, _internal.safe_not_equal), {
            layout: 0,
            folder: 10
        });
    }
}
function create_fragment$4(ctx) {
    let svg;
    let path0;
    let path1;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "stroke", "currentColor");
            (0, _internal.attr)(path0, "stroke-width", "2");
            (0, _internal.attr)(path0, "d", "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z");
            (0, _internal.attr)(path1, "stroke", "currentColor");
            (0, _internal.attr)(path1, "stroke-linecap", "round");
            (0, _internal.attr)(path1, "stroke-width", "2");
            (0, _internal.attr)(path1, "d", "M12 16.5v.5m0-10v6-6Z");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "viewBox", "0 0 24 24");
            (0, _internal.attr)(svg, "width", ctx[0]);
            (0, _internal.attr)(svg, "height", ctx[0]);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) (0, _internal.attr)(svg, "width", ctx2[0]);
            if (dirty & 1) (0, _internal.attr)(svg, "height", ctx2[0]);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$4($$self, $$props, $$invalidate) {
    let { size =24  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("size" in $$props2) $$invalidate(0, size = $$props2.size);
    };
    return [
        size
    ];
}
class IconCircleExclamation extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$4, create_fragment$4, (0, _internal.safe_not_equal), {
            size: 0
        });
    }
}
function create_fragment$3(ctx) {
    let svg;
    let path0;
    let path1;
    return {
        c () {
            svg = (0, _internal.svg_element)("svg");
            path0 = (0, _internal.svg_element)("path");
            path1 = (0, _internal.svg_element)("path");
            (0, _internal.attr)(path0, "stroke", "currentColor");
            (0, _internal.attr)(path0, "stroke-linecap", "round");
            (0, _internal.attr)(path0, "stroke-linejoin", "round");
            (0, _internal.attr)(path0, "stroke-width", "2");
            (0, _internal.attr)(path0, "d", "m8 12.5 3 3 5-6");
            (0, _internal.attr)(path1, "stroke", "currentColor");
            (0, _internal.attr)(path1, "stroke-width", "2");
            (0, _internal.attr)(path1, "d", "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z");
            (0, _internal.attr)(svg, "xmlns", "http://www.w3.org/2000/svg");
            (0, _internal.attr)(svg, "fill", "none");
            (0, _internal.attr)(svg, "viewBox", "0 0 24 24");
            (0, _internal.attr)(svg, "width", ctx[0]);
            (0, _internal.attr)(svg, "height", ctx[0]);
        },
        m (target, anchor) {
            (0, _internal.insert)(target, svg, anchor);
            (0, _internal.append)(svg, path0);
            (0, _internal.append)(svg, path1);
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) (0, _internal.attr)(svg, "width", ctx2[0]);
            if (dirty & 1) (0, _internal.attr)(svg, "height", ctx2[0]);
        },
        i: (0, _internal.noop),
        o: (0, _internal.noop),
        d (detaching) {
            if (detaching) (0, _internal.detach)(svg);
        }
    };
}
function instance$3($$self, $$props, $$invalidate) {
    let { size =24  } = $$props;
    $$self.$$set = ($$props2)=>{
        if ("size" in $$props2) $$invalidate(0, size = $$props2.size);
    };
    return [
        size
    ];
}
class IconCircleCheck extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$3, create_fragment$3, (0, _internal.safe_not_equal), {
            size: 0
        });
    }
}
var Alert_svelte_svelte_type_style_lang = "";
function create_if_block_1(ctx) {
    let iconcirclecheck;
    let t2;
    let div;
    let current;
    iconcirclecheck = new IconCircleCheck({});
    return {
        c () {
            (0, _internal.create_component)(iconcirclecheck.$$.fragment);
            t2 = (0, _internal.space)();
            div = (0, _internal.element)("div");
            (0, _internal.attr)(div, "class", "fm-progress svelte-rcwbts");
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconcirclecheck, target, anchor);
            (0, _internal.insert)(target, t2, anchor);
            (0, _internal.insert)(target, div, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconcirclecheck.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconcirclecheck.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconcirclecheck, detaching);
            if (detaching) (0, _internal.detach)(t2);
            if (detaching) (0, _internal.detach)(div);
        }
    };
}
function create_if_block$1(ctx) {
    let iconcircleexclamation;
    let current;
    iconcircleexclamation = new IconCircleExclamation({});
    return {
        c () {
            (0, _internal.create_component)(iconcircleexclamation.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(iconcircleexclamation, target, anchor);
            current = true;
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(iconcircleexclamation.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(iconcircleexclamation.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(iconcircleexclamation, detaching);
        }
    };
}
function create_fragment$2(ctx) {
    let div;
    let current_block_type_index;
    let if_block;
    let t0;
    let t1_value = ctx[0].message + "";
    let t1;
    let t2;
    let button;
    let current;
    let mounted;
    let dispose;
    const if_block_creators = [
        create_if_block$1,
        create_if_block_1
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
        if (ctx2[0].type === "danger") return 0;
        if (ctx2[0].type === "success") return 1;
        return -1;
    }
    if (~(current_block_type_index = select_block_type(ctx))) if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
        c () {
            div = (0, _internal.element)("div");
            if (if_block) if_block.c();
            t0 = (0, _internal.space)();
            t1 = (0, _internal.text)(t1_value);
            t2 = (0, _internal.space)();
            button = (0, _internal.element)("button");
            button.textContent = "\xd7";
            (0, _internal.attr)(button, "class", "fm-close svelte-rcwbts");
            (0, _internal.attr)(div, "class", "fm-alert svelte-rcwbts");
            (0, _internal.toggle_class)(div, "fm-danger", ctx[0].type === "danger");
            (0, _internal.toggle_class)(div, "fm-success", ctx[0].type === "success");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
            if (~current_block_type_index) if_blocks[current_block_type_index].m(div, null);
            (0, _internal.append)(div, t0);
            (0, _internal.append)(div, t1);
            (0, _internal.append)(div, t2);
            (0, _internal.append)(div, button);
            current = true;
            if (!mounted) {
                dispose = (0, _internal.listen)(button, "click", (0, _internal.prevent_default)(ctx[1]));
                mounted = true;
            }
        },
        p (ctx2, [dirty]) {
            let previous_block_index = current_block_type_index;
            current_block_type_index = select_block_type(ctx2);
            if (current_block_type_index !== previous_block_index) {
                if (if_block) {
                    (0, _internal.group_outros)();
                    (0, _internal.transition_out)(if_blocks[previous_block_index], 1, 1, ()=>{
                        if_blocks[previous_block_index] = null;
                    });
                    (0, _internal.check_outros)();
                }
                if (~current_block_type_index) {
                    if_block = if_blocks[current_block_type_index];
                    if (!if_block) {
                        if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
                        if_block.c();
                    }
                    (0, _internal.transition_in)(if_block, 1);
                    if_block.m(div, t0);
                } else if_block = null;
            }
            if ((!current || dirty & 1) && t1_value !== (t1_value = ctx2[0].message + "")) (0, _internal.set_data)(t1, t1_value);
            if (dirty & 1) (0, _internal.toggle_class)(div, "fm-danger", ctx2[0].type === "danger");
            if (dirty & 1) (0, _internal.toggle_class)(div, "fm-success", ctx2[0].type === "success");
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
            if (~current_block_type_index) if_blocks[current_block_type_index].d();
            mounted = false;
            dispose();
        }
    };
}
function instance$2($$self, $$props, $$invalidate) {
    let { message  } = $$props;
    const handleClose = ()=>{
        deleteFlashMessage(message.id);
    };
    $$self.$$set = ($$props2)=>{
        if ("message" in $$props2) $$invalidate(0, message = $$props2.message);
    };
    return [
        message,
        handleClose
    ];
}
class Alert extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$2, create_fragment$2, (0, _internal.safe_not_equal), {
            message: 0
        });
    }
}
var Alerts_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[1] = list[i];
    return child_ctx;
}
function create_each_block(ctx) {
    let div;
    let alert;
    let t2;
    let div_transition;
    let current;
    alert = new Alert({
        props: {
            message: ctx[1]
        }
    });
    return {
        c () {
            div = (0, _internal.element)("div");
            (0, _internal.create_component)(alert.$$.fragment);
            t2 = (0, _internal.space)();
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
            (0, _internal.mount_component)(alert, div, null);
            (0, _internal.append)(div, t2);
            current = true;
        },
        p (ctx2, dirty) {
            const alert_changes = {};
            if (dirty & 1) alert_changes.message = ctx2[1];
            alert.$set(alert_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(alert.$$.fragment, local);
            (0, _internal.add_render_callback)(()=>{
                if (!div_transition) div_transition = (0, _internal.create_bidirectional_transition)(div, (0, _transition.fly), {
                    x: 20
                }, true);
                div_transition.run(1);
            });
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(alert.$$.fragment, local);
            if (!div_transition) div_transition = (0, _internal.create_bidirectional_transition)(div, (0, _transition.fly), {
                x: 20
            }, false);
            div_transition.run(0);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
            (0, _internal.destroy_component)(alert);
            if (detaching && div_transition) div_transition.end();
        }
    };
}
function create_fragment$1(ctx) {
    let div;
    let current;
    let each_value = ctx[0];
    let each_blocks = [];
    for(let i = 0; i < each_value.length; i += 1)each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    const out = (i)=>(0, _internal.transition_out)(each_blocks[i], 1, 1, ()=>{
            each_blocks[i] = null;
        });
    return {
        c () {
            div = (0, _internal.element)("div");
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].c();
            (0, _internal.attr)(div, "class", "fm-wrapper svelte-1ja1s61");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div, anchor);
            for(let i = 0; i < each_blocks.length; i += 1)each_blocks[i].m(div, null);
            current = true;
        },
        p (ctx2, [dirty]) {
            if (dirty & 1) {
                each_value = ctx2[0];
                let i;
                for(i = 0; i < each_value.length; i += 1){
                    const child_ctx = get_each_context(ctx2, each_value, i);
                    if (each_blocks[i]) {
                        each_blocks[i].p(child_ctx, dirty);
                        (0, _internal.transition_in)(each_blocks[i], 1);
                    } else {
                        each_blocks[i] = create_each_block(child_ctx);
                        each_blocks[i].c();
                        (0, _internal.transition_in)(each_blocks[i], 1);
                        each_blocks[i].m(div, null);
                    }
                }
                (0, _internal.group_outros)();
                for(i = each_value.length; i < each_blocks.length; i += 1)out(i);
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            for(let i = 0; i < each_value.length; i += 1)(0, _internal.transition_in)(each_blocks[i]);
            current = true;
        },
        o (local) {
            each_blocks = each_blocks.filter(Boolean);
            for(let i = 0; i < each_blocks.length; i += 1)(0, _internal.transition_out)(each_blocks[i]);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div);
            (0, _internal.destroy_each)(each_blocks, detaching);
        }
    };
}
function instance$1($$self, $$props, $$invalidate) {
    let $flashMessages;
    (0, _internal.component_subscribe)($$self, flashMessages, ($$value)=>$$invalidate(0, $flashMessages = $$value));
    return [
        $flashMessages
    ];
}
class Alerts extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance$1, create_fragment$1, (0, _internal.safe_not_equal), {});
    }
}
var FileManager_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
    let div2;
    let div1;
    let div0;
    let sidebar;
    let t0;
    let dropzone;
    let t1;
    let alerts;
    let t2;
    let uploadprogress;
    let clickOutside_action;
    let div0_transition;
    let div1_transition;
    let current;
    let mounted;
    let dispose;
    sidebar = new Sidebar({
        props: {
            lazyFolders: ctx[2]
        }
    });
    dropzone = new Dropzone({
        props: {
            $$slots: {
                default: [
                    create_default_slot_1
                ]
            },
            $$scope: {
                ctx
            }
        }
    });
    alerts = new Alerts({});
    uploadprogress = new UploadProgress({});
    return {
        c () {
            div2 = (0, _internal.element)("div");
            div1 = (0, _internal.element)("div");
            div0 = (0, _internal.element)("div");
            (0, _internal.create_component)(sidebar.$$.fragment);
            t0 = (0, _internal.space)();
            (0, _internal.create_component)(dropzone.$$.fragment);
            t1 = (0, _internal.space)();
            (0, _internal.create_component)(alerts.$$.fragment);
            t2 = (0, _internal.space)();
            (0, _internal.create_component)(uploadprogress.$$.fragment);
            (0, _internal.attr)(div0, "class", "fm-modal svelte-5hhtx0");
            (0, _internal.attr)(div1, "class", "fm-overlay svelte-5hhtx0");
            (0, _internal.attr)(div2, "class", "fm-root svelte-5hhtx0");
        },
        m (target, anchor) {
            (0, _internal.insert)(target, div2, anchor);
            (0, _internal.append)(div2, div1);
            (0, _internal.append)(div1, div0);
            (0, _internal.mount_component)(sidebar, div0, null);
            (0, _internal.append)(div0, t0);
            (0, _internal.mount_component)(dropzone, div0, null);
            (0, _internal.append)(div0, t1);
            (0, _internal.mount_component)(alerts, div0, null);
            (0, _internal.append)(div0, t2);
            (0, _internal.mount_component)(uploadprogress, div0, null);
            current = true;
            if (!mounted) {
                dispose = (0, _internal.action_destroyer)(clickOutside_action = clickOutside.call(null, div0, "close"));
                mounted = true;
            }
        },
        p (ctx2, dirty) {
            const sidebar_changes = {};
            if (dirty & 4) sidebar_changes.lazyFolders = ctx2[2];
            sidebar.$set(sidebar_changes);
            const dropzone_changes = {};
            if (dirty & 74) dropzone_changes.$$scope = {
                dirty,
                ctx: ctx2
            };
            dropzone.$set(dropzone_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(sidebar.$$.fragment, local);
            (0, _internal.transition_in)(dropzone.$$.fragment, local);
            (0, _internal.transition_in)(alerts.$$.fragment, local);
            (0, _internal.transition_in)(uploadprogress.$$.fragment, local);
            (0, _internal.add_render_callback)(()=>{
                if (!div0_transition) div0_transition = (0, _internal.create_bidirectional_transition)(div0, (0, _transition.fly), {
                    y: -30,
                    duration: 500
                }, true);
                div0_transition.run(1);
            });
            (0, _internal.add_render_callback)(()=>{
                if (!div1_transition) div1_transition = (0, _internal.create_bidirectional_transition)(div1, (0, _transition.fly), {
                    duration: 300
                }, true);
                div1_transition.run(1);
            });
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(sidebar.$$.fragment, local);
            (0, _internal.transition_out)(dropzone.$$.fragment, local);
            (0, _internal.transition_out)(alerts.$$.fragment, local);
            (0, _internal.transition_out)(uploadprogress.$$.fragment, local);
            if (!div0_transition) div0_transition = (0, _internal.create_bidirectional_transition)(div0, (0, _transition.fly), {
                y: -30,
                duration: 500
            }, false);
            div0_transition.run(0);
            if (!div1_transition) div1_transition = (0, _internal.create_bidirectional_transition)(div1, (0, _transition.fly), {
                duration: 300
            }, false);
            div1_transition.run(0);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(div2);
            (0, _internal.destroy_component)(sidebar);
            (0, _internal.destroy_component)(dropzone);
            (0, _internal.destroy_component)(alerts);
            (0, _internal.destroy_component)(uploadprogress);
            if (detaching && div0_transition) div0_transition.end();
            if (detaching && div1_transition) div1_transition.end();
            mounted = false;
            dispose();
        }
    };
}
function create_key_block(ctx) {
    let fileslist;
    let current;
    fileslist = new FilesList({
        props: {
            folder: ctx[3],
            layout: ctx[1]
        }
    });
    return {
        c () {
            (0, _internal.create_component)(fileslist.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(fileslist, target, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            const fileslist_changes = {};
            if (dirty & 8) fileslist_changes.folder = ctx2[3];
            if (dirty & 2) fileslist_changes.layout = ctx2[1];
            fileslist.$set(fileslist_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(fileslist.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(fileslist.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(fileslist, detaching);
        }
    };
}
function create_default_slot_1(ctx) {
    var _a;
    let previous_key = (_a = ctx[3]) == null ? void 0 : _a.id;
    let key_block_anchor;
    let current;
    let key_block = create_key_block(ctx);
    return {
        c () {
            key_block.c();
            key_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            key_block.m(target, anchor);
            (0, _internal.insert)(target, key_block_anchor, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            var _a2;
            if (dirty & 8 && (0, _internal.safe_not_equal)(previous_key, previous_key = (_a2 = ctx2[3]) == null ? void 0 : _a2.id)) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(key_block, 1, 1, (0, _internal.noop));
                (0, _internal.check_outros)();
                key_block = create_key_block(ctx2);
                key_block.c();
                (0, _internal.transition_in)(key_block);
                key_block.m(key_block_anchor.parentNode, key_block_anchor);
            } else key_block.p(ctx2, dirty);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(key_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(key_block);
            current = false;
        },
        d (detaching) {
            if (detaching) (0, _internal.detach)(key_block_anchor);
            key_block.d(detaching);
        }
    };
}
function create_default_slot(ctx) {
    let if_block_anchor;
    let current;
    let if_block = !ctx[0] && create_if_block(ctx);
    return {
        c () {
            if (if_block) if_block.c();
            if_block_anchor = (0, _internal.empty)();
        },
        m (target, anchor) {
            if (if_block) if_block.m(target, anchor);
            (0, _internal.insert)(target, if_block_anchor, anchor);
            current = true;
        },
        p (ctx2, dirty) {
            if (!ctx2[0]) {
                if (if_block) {
                    if_block.p(ctx2, dirty);
                    if (dirty & 1) (0, _internal.transition_in)(if_block, 1);
                } else {
                    if_block = create_if_block(ctx2);
                    if_block.c();
                    (0, _internal.transition_in)(if_block, 1);
                    if_block.m(if_block_anchor.parentNode, if_block_anchor);
                }
            } else if (if_block) {
                (0, _internal.group_outros)();
                (0, _internal.transition_out)(if_block, 1, 1, ()=>{
                    if_block = null;
                });
                (0, _internal.check_outros)();
            }
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(if_block);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(if_block);
            current = false;
        },
        d (detaching) {
            if (if_block) if_block.d(detaching);
            if (detaching) (0, _internal.detach)(if_block_anchor);
        }
    };
}
function create_fragment(ctx) {
    let queryclientprovider;
    let current;
    queryclientprovider = new QueryClientProvider({
        props: {
            client: ctx[4],
            $$slots: {
                default: [
                    create_default_slot
                ]
            },
            $$scope: {
                ctx
            }
        }
    });
    return {
        c () {
            (0, _internal.create_component)(queryclientprovider.$$.fragment);
        },
        m (target, anchor) {
            (0, _internal.mount_component)(queryclientprovider, target, anchor);
            current = true;
        },
        p (ctx2, [dirty]) {
            const queryclientprovider_changes = {};
            if (dirty & 79) queryclientprovider_changes.$$scope = {
                dirty,
                ctx: ctx2
            };
            queryclientprovider.$set(queryclientprovider_changes);
        },
        i (local) {
            if (current) return;
            (0, _internal.transition_in)(queryclientprovider.$$.fragment, local);
            current = true;
        },
        o (local) {
            (0, _internal.transition_out)(queryclientprovider.$$.fragment, local);
            current = false;
        },
        d (detaching) {
            (0, _internal.destroy_component)(queryclientprovider, detaching);
        }
    };
}
function instance($$self, $$props, $$invalidate) {
    let $folder;
    (0, _internal.component_subscribe)($$self, folder, ($$value)=>$$invalidate(3, $folder = $$value));
    let { hidden  } = $$props;
    let { layout  } = $$props;
    let { lazyFolders  } = $$props;
    let { options  } = $$props;
    (0, _svelte.setContext)("options", options);
    const queryClient = new QueryClient();
    $$self.$$set = ($$props2)=>{
        if ("hidden" in $$props2) $$invalidate(0, hidden = $$props2.hidden);
        if ("layout" in $$props2) $$invalidate(1, layout = $$props2.layout);
        if ("lazyFolders" in $$props2) $$invalidate(2, lazyFolders = $$props2.lazyFolders);
        if ("options" in $$props2) $$invalidate(5, options = $$props2.options);
    };
    return [
        hidden,
        layout,
        lazyFolders,
        $folder,
        queryClient,
        options
    ];
}
class FileManager$1 extends (0, _internal.SvelteComponent) {
    constructor(options){
        super();
        (0, _internal.init)(this, options, instance, create_fragment, (0, _internal.safe_not_equal), {
            hidden: 0,
            layout: 1,
            lazyFolders: 2,
            options: 5
        });
    }
}
function objToQueryParams(o, p) {
    const params = p || new URLSearchParams();
    Object.keys(o).filter((k)=>o[k] !== void 0).forEach((k)=>params.set(k, o[k]));
    return params;
}
function fetchApi(baseUrl, path, options) {
    const o = __spreadValues({}, options);
    let url = new URL((baseUrl.startsWith("/") ? window.location.origin : "") + baseUrl);
    url.pathname = (url.pathname === "/" ? "" : url.pathname) + path;
    o.credentials = "include";
    o.headers = __spreadValues({}, o.headers);
    o.headers["Accept"] = "application/json";
    if (o.json) {
        o.body = JSON.stringify(o.json);
        o.headers["Content-Type"] = "application/json";
    }
    if (o.query) objToQueryParams(o.query, url.searchParams);
    if (o.params) Object.keys(o.params).forEach((k)=>url.pathname = url.pathname.replace(`%7B${k}%7D`, o.params[k]));
    return fetch(url.toString(), o).then((r)=>{
        if (r.status === HTTPStatus.NoContent) return null;
        if (r.status >= HTTPStatus.OK && r.status < HTTPStatus.MultipleChoices) return r.json();
        r.json().then((data)=>{
            if (data == null ? void 0 : data.message) flash(data.message, "danger");
            else flash(t("serverError"), "danger");
        }).catch(()=>flash(t("serverError"), "danger"));
        throw r;
    });
}
const config = {
    endpoint: "",
    readOnly: false,
    httpHeaders: {},
    getFolders (parent) {
        var _a;
        return fetchApi(this.endpoint, "/folders", {
            query: {
                parent: (_a = parent == null ? void 0 : parent.id) == null ? void 0 : _a.toString()
            },
            headers: this.httpHeaders
        });
    },
    createFolder (params) {
        return fetchApi(this.endpoint, "/folders", {
            method: "post",
            headers: this.httpHeaders,
            json: params
        });
    },
    deleteFolder (folder2) {
        return fetchApi(this.endpoint, "/folders/{id}", {
            method: "delete",
            headers: this.httpHeaders,
            params: {
                id: folder2.id.toString()
            }
        });
    },
    getFiles (folder2) {
        return fetchApi(this.endpoint, "/files", {
            headers: this.httpHeaders,
            query: {
                folder: (folder2 == null ? void 0 : folder2.id) ? folder2.id.toString() : void 0
            }
        });
    },
    uploadFile (file, folder2) {
        const form = new FormData();
        form.set("file", file);
        if (folder2 == null ? void 0 : folder2.id) form.set("folder", folder2.id.toString());
        return fetchApi(this.endpoint, "/files", {
            method: "post",
            headers: this.httpHeaders,
            body: form
        });
    },
    deleteFile (file) {
        return fetchApi(this.endpoint, `/files/{id}`, {
            method: "delete",
            headers: this.httpHeaders,
            params: {
                id: file.id.toString()
            }
        });
    }
};
const _FileManager = class {
    constructor(element2, options = {}){
        __publicField(this, "fm", null);
        __publicField(this, "options");
        this.element = element2;
        this.options = __spreadValues(__spreadValues({}, config), options);
    }
    static get observedAttributes() {
        return [
            "hidden",
            "endpoint"
        ];
    }
    connectedCallback() {
        this.element.style.setProperty("display", "block");
        const endpointAttr = this.element.getAttribute("endpoint");
        if (endpointAttr) this.options.endpoint = endpointAttr;
        this.options.readOnly = this.element.hasAttribute("readonly");
        if (!this.options.endpoint && !this.options.getFiles) throw new Error("You must define an endpoint for this custom element");
        setLang(document.documentElement.getAttribute("lang") || "en");
        this.fm = new FileManager$1({
            target: this.element,
            props: {
                hidden: this.element.hidden,
                layout: this.element.getAttribute("layout") || "grid",
                lazyFolders: this.element.hasAttribute("lazy-folders"),
                options: this.options
            }
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "hidden" && this.fm) this.fm.$set({
            hidden: newValue !== null
        });
        if (name === "endpoint") this.options.endpoint = newValue;
    }
    disconnectedCallback() {
        var _a;
        (_a = this == null ? void 0 : this.fm) == null || _a.$destroy();
    }
    static register(name = "file-manager", options) {
        if (!this.registered.has(name)) {
            class AnonymousFileManager extends HTMLElement {
                constructor(){
                    super();
                    __publicField(this, "decorated");
                    this.decorated = new _FileManager(this, options);
                }
                static get observedAttributes() {
                    return _FileManager.observedAttributes;
                }
                connectedCallback() {
                    return this.decorated.connectedCallback();
                }
                attributeChangedCallback(name2, oldValue, newValue) {
                    return this.decorated.attributeChangedCallback(name2, oldValue, newValue);
                }
            }
            customElements.define(name, AnonymousFileManager);
            this.registered.set(name, true);
        }
    }
};
let FileManager = _FileManager;
__publicField(FileManager, "registered", /* @__PURE__ */ new Map());

},{"svelte/internal":"iVhnC","svelte/transition":"cw48Y","svelte":"4r74h","svelte/store":"6DBki","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iVhnC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HtmlTag", ()=>HtmlTag);
parcelHelpers.export(exports, "HtmlTagHydration", ()=>HtmlTagHydration);
parcelHelpers.export(exports, "SvelteComponent", ()=>SvelteComponent);
parcelHelpers.export(exports, "SvelteComponentDev", ()=>SvelteComponentDev);
parcelHelpers.export(exports, "SvelteComponentTyped", ()=>SvelteComponentTyped);
parcelHelpers.export(exports, "SvelteElement", ()=>SvelteElement);
parcelHelpers.export(exports, "action_destroyer", ()=>action_destroyer);
parcelHelpers.export(exports, "add_attribute", ()=>add_attribute);
parcelHelpers.export(exports, "add_classes", ()=>add_classes);
parcelHelpers.export(exports, "add_flush_callback", ()=>add_flush_callback);
parcelHelpers.export(exports, "add_location", ()=>add_location);
parcelHelpers.export(exports, "add_render_callback", ()=>add_render_callback);
parcelHelpers.export(exports, "add_resize_listener", ()=>add_resize_listener);
parcelHelpers.export(exports, "add_styles", ()=>add_styles);
parcelHelpers.export(exports, "add_transform", ()=>add_transform);
parcelHelpers.export(exports, "afterUpdate", ()=>afterUpdate);
parcelHelpers.export(exports, "append", ()=>append);
parcelHelpers.export(exports, "append_dev", ()=>append_dev);
parcelHelpers.export(exports, "append_empty_stylesheet", ()=>append_empty_stylesheet);
parcelHelpers.export(exports, "append_hydration", ()=>append_hydration);
parcelHelpers.export(exports, "append_hydration_dev", ()=>append_hydration_dev);
parcelHelpers.export(exports, "append_styles", ()=>append_styles);
parcelHelpers.export(exports, "assign", ()=>assign);
parcelHelpers.export(exports, "attr", ()=>attr);
parcelHelpers.export(exports, "attr_dev", ()=>attr_dev);
parcelHelpers.export(exports, "attribute_to_object", ()=>attribute_to_object);
parcelHelpers.export(exports, "beforeUpdate", ()=>beforeUpdate);
parcelHelpers.export(exports, "bind", ()=>bind);
parcelHelpers.export(exports, "binding_callbacks", ()=>binding_callbacks);
parcelHelpers.export(exports, "blank_object", ()=>blank_object);
parcelHelpers.export(exports, "bubble", ()=>bubble);
parcelHelpers.export(exports, "check_outros", ()=>check_outros);
parcelHelpers.export(exports, "children", ()=>children);
parcelHelpers.export(exports, "claim_component", ()=>claim_component);
parcelHelpers.export(exports, "claim_element", ()=>claim_element);
parcelHelpers.export(exports, "claim_html_tag", ()=>claim_html_tag);
parcelHelpers.export(exports, "claim_space", ()=>claim_space);
parcelHelpers.export(exports, "claim_svg_element", ()=>claim_svg_element);
parcelHelpers.export(exports, "claim_text", ()=>claim_text);
parcelHelpers.export(exports, "clear_loops", ()=>clear_loops);
parcelHelpers.export(exports, "component_subscribe", ()=>component_subscribe);
parcelHelpers.export(exports, "compute_rest_props", ()=>compute_rest_props);
parcelHelpers.export(exports, "compute_slots", ()=>compute_slots);
parcelHelpers.export(exports, "createEventDispatcher", ()=>createEventDispatcher);
parcelHelpers.export(exports, "create_animation", ()=>create_animation);
parcelHelpers.export(exports, "create_bidirectional_transition", ()=>create_bidirectional_transition);
parcelHelpers.export(exports, "create_component", ()=>create_component);
parcelHelpers.export(exports, "create_in_transition", ()=>create_in_transition);
parcelHelpers.export(exports, "create_out_transition", ()=>create_out_transition);
parcelHelpers.export(exports, "create_slot", ()=>create_slot);
parcelHelpers.export(exports, "create_ssr_component", ()=>create_ssr_component);
parcelHelpers.export(exports, "current_component", ()=>current_component);
parcelHelpers.export(exports, "custom_event", ()=>custom_event);
parcelHelpers.export(exports, "dataset_dev", ()=>dataset_dev);
parcelHelpers.export(exports, "debug", ()=>debug);
parcelHelpers.export(exports, "destroy_block", ()=>destroy_block);
parcelHelpers.export(exports, "destroy_component", ()=>destroy_component);
parcelHelpers.export(exports, "destroy_each", ()=>destroy_each);
parcelHelpers.export(exports, "detach", ()=>detach);
parcelHelpers.export(exports, "detach_after_dev", ()=>detach_after_dev);
parcelHelpers.export(exports, "detach_before_dev", ()=>detach_before_dev);
parcelHelpers.export(exports, "detach_between_dev", ()=>detach_between_dev);
parcelHelpers.export(exports, "detach_dev", ()=>detach_dev);
parcelHelpers.export(exports, "dirty_components", ()=>dirty_components);
parcelHelpers.export(exports, "dispatch_dev", ()=>dispatch_dev);
parcelHelpers.export(exports, "each", ()=>each);
parcelHelpers.export(exports, "element", ()=>element);
parcelHelpers.export(exports, "element_is", ()=>element_is);
parcelHelpers.export(exports, "empty", ()=>empty);
parcelHelpers.export(exports, "end_hydrating", ()=>end_hydrating);
parcelHelpers.export(exports, "escape", ()=>escape);
parcelHelpers.export(exports, "escape_attribute_value", ()=>escape_attribute_value);
parcelHelpers.export(exports, "escape_object", ()=>escape_object);
parcelHelpers.export(exports, "exclude_internal_props", ()=>exclude_internal_props);
parcelHelpers.export(exports, "fix_and_destroy_block", ()=>fix_and_destroy_block);
parcelHelpers.export(exports, "fix_and_outro_and_destroy_block", ()=>fix_and_outro_and_destroy_block);
parcelHelpers.export(exports, "fix_position", ()=>fix_position);
parcelHelpers.export(exports, "flush", ()=>flush);
parcelHelpers.export(exports, "getAllContexts", ()=>getAllContexts);
parcelHelpers.export(exports, "getContext", ()=>getContext);
parcelHelpers.export(exports, "get_all_dirty_from_scope", ()=>get_all_dirty_from_scope);
parcelHelpers.export(exports, "get_binding_group_value", ()=>get_binding_group_value);
parcelHelpers.export(exports, "get_current_component", ()=>get_current_component);
parcelHelpers.export(exports, "get_custom_elements_slots", ()=>get_custom_elements_slots);
parcelHelpers.export(exports, "get_root_for_style", ()=>get_root_for_style);
parcelHelpers.export(exports, "get_slot_changes", ()=>get_slot_changes);
parcelHelpers.export(exports, "get_spread_object", ()=>get_spread_object);
parcelHelpers.export(exports, "get_spread_update", ()=>get_spread_update);
parcelHelpers.export(exports, "get_store_value", ()=>get_store_value);
parcelHelpers.export(exports, "globals", ()=>globals);
parcelHelpers.export(exports, "group_outros", ()=>group_outros);
parcelHelpers.export(exports, "handle_promise", ()=>handle_promise);
parcelHelpers.export(exports, "hasContext", ()=>hasContext);
parcelHelpers.export(exports, "has_prop", ()=>has_prop);
parcelHelpers.export(exports, "identity", ()=>identity);
parcelHelpers.export(exports, "init", ()=>init);
parcelHelpers.export(exports, "insert", ()=>insert);
parcelHelpers.export(exports, "insert_dev", ()=>insert_dev);
parcelHelpers.export(exports, "insert_hydration", ()=>insert_hydration);
parcelHelpers.export(exports, "insert_hydration_dev", ()=>insert_hydration_dev);
parcelHelpers.export(exports, "intros", ()=>intros);
parcelHelpers.export(exports, "invalid_attribute_name_character", ()=>invalid_attribute_name_character);
parcelHelpers.export(exports, "is_client", ()=>is_client);
parcelHelpers.export(exports, "is_crossorigin", ()=>is_crossorigin);
parcelHelpers.export(exports, "is_empty", ()=>is_empty);
parcelHelpers.export(exports, "is_function", ()=>is_function);
parcelHelpers.export(exports, "is_promise", ()=>is_promise);
parcelHelpers.export(exports, "is_void", ()=>is_void);
parcelHelpers.export(exports, "listen", ()=>listen);
parcelHelpers.export(exports, "listen_dev", ()=>listen_dev);
parcelHelpers.export(exports, "loop", ()=>loop);
parcelHelpers.export(exports, "loop_guard", ()=>loop_guard);
parcelHelpers.export(exports, "merge_ssr_styles", ()=>merge_ssr_styles);
parcelHelpers.export(exports, "missing_component", ()=>missing_component);
parcelHelpers.export(exports, "mount_component", ()=>mount_component);
parcelHelpers.export(exports, "noop", ()=>noop);
parcelHelpers.export(exports, "not_equal", ()=>not_equal);
parcelHelpers.export(exports, "now", ()=>now);
parcelHelpers.export(exports, "null_to_empty", ()=>null_to_empty);
parcelHelpers.export(exports, "object_without_properties", ()=>object_without_properties);
parcelHelpers.export(exports, "onDestroy", ()=>onDestroy);
parcelHelpers.export(exports, "onMount", ()=>onMount);
parcelHelpers.export(exports, "once", ()=>once);
parcelHelpers.export(exports, "outro_and_destroy_block", ()=>outro_and_destroy_block);
parcelHelpers.export(exports, "prevent_default", ()=>prevent_default);
parcelHelpers.export(exports, "prop_dev", ()=>prop_dev);
parcelHelpers.export(exports, "query_selector_all", ()=>query_selector_all);
parcelHelpers.export(exports, "raf", ()=>raf);
parcelHelpers.export(exports, "run", ()=>run);
parcelHelpers.export(exports, "run_all", ()=>run_all);
parcelHelpers.export(exports, "safe_not_equal", ()=>safe_not_equal);
parcelHelpers.export(exports, "schedule_update", ()=>schedule_update);
parcelHelpers.export(exports, "select_multiple_value", ()=>select_multiple_value);
parcelHelpers.export(exports, "select_option", ()=>select_option);
parcelHelpers.export(exports, "select_options", ()=>select_options);
parcelHelpers.export(exports, "select_value", ()=>select_value);
parcelHelpers.export(exports, "self", ()=>self);
parcelHelpers.export(exports, "setContext", ()=>setContext);
parcelHelpers.export(exports, "set_attributes", ()=>set_attributes);
parcelHelpers.export(exports, "set_current_component", ()=>set_current_component);
parcelHelpers.export(exports, "set_custom_element_data", ()=>set_custom_element_data);
parcelHelpers.export(exports, "set_data", ()=>set_data);
parcelHelpers.export(exports, "set_data_dev", ()=>set_data_dev);
parcelHelpers.export(exports, "set_input_type", ()=>set_input_type);
parcelHelpers.export(exports, "set_input_value", ()=>set_input_value);
parcelHelpers.export(exports, "set_now", ()=>set_now);
parcelHelpers.export(exports, "set_raf", ()=>set_raf);
parcelHelpers.export(exports, "set_store_value", ()=>set_store_value);
parcelHelpers.export(exports, "set_style", ()=>set_style);
parcelHelpers.export(exports, "set_svg_attributes", ()=>set_svg_attributes);
parcelHelpers.export(exports, "space", ()=>space);
parcelHelpers.export(exports, "spread", ()=>spread);
parcelHelpers.export(exports, "src_url_equal", ()=>src_url_equal);
parcelHelpers.export(exports, "start_hydrating", ()=>start_hydrating);
parcelHelpers.export(exports, "stop_propagation", ()=>stop_propagation);
parcelHelpers.export(exports, "subscribe", ()=>subscribe);
parcelHelpers.export(exports, "svg_element", ()=>svg_element);
parcelHelpers.export(exports, "text", ()=>text);
parcelHelpers.export(exports, "tick", ()=>tick);
parcelHelpers.export(exports, "time_ranges_to_array", ()=>time_ranges_to_array);
parcelHelpers.export(exports, "to_number", ()=>to_number);
parcelHelpers.export(exports, "toggle_class", ()=>toggle_class);
parcelHelpers.export(exports, "transition_in", ()=>transition_in);
parcelHelpers.export(exports, "transition_out", ()=>transition_out);
parcelHelpers.export(exports, "trusted", ()=>trusted);
parcelHelpers.export(exports, "update_await_block_branch", ()=>update_await_block_branch);
parcelHelpers.export(exports, "update_keyed_each", ()=>update_keyed_each);
parcelHelpers.export(exports, "update_slot", ()=>update_slot);
parcelHelpers.export(exports, "update_slot_base", ()=>update_slot_base);
parcelHelpers.export(exports, "validate_component", ()=>validate_component);
parcelHelpers.export(exports, "validate_dynamic_element", ()=>validate_dynamic_element);
parcelHelpers.export(exports, "validate_each_argument", ()=>validate_each_argument);
parcelHelpers.export(exports, "validate_each_keys", ()=>validate_each_keys);
parcelHelpers.export(exports, "validate_slots", ()=>validate_slots);
parcelHelpers.export(exports, "validate_store", ()=>validate_store);
parcelHelpers.export(exports, "validate_void_dynamic_element", ()=>validate_void_dynamic_element);
parcelHelpers.export(exports, "xlink_attr", ()=>xlink_attr);
var global = arguments[3];
function noop() {}
const identity = (x)=>x;
function assign(tar, src) {
    // @ts-ignore
    for(const k in src)tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === "object" && typeof value.then === "function";
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: {
            file,
            line,
            column,
            char
        }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === "function";
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) src_url_equal_anchor = document.createElement("a");
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== "function") throw new Error(`'${name}' is not a store with a 'subscribe' method`);
}
function subscribe(store, ...callbacks) {
    if (store == null) return noop;
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? ()=>unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, (_)=>value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) return lets;
        if (typeof lets === "object") {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for(let i = 0; i < len; i += 1)merged[i] = $$scope.dirty[i] | lets[i];
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for(let i = 0; i < length; i++)dirty[i] = -1;
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for(const k in props)if (k[0] !== "$") result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for(const k in props)if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for(const key in slots)result[key] = true;
    return result;
}
function once(fn) {
    let ran = false;
    return function(...args) {
        if (ran) return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const is_client = typeof window !== "undefined";
let now = is_client ? ()=>window.performance.now() : ()=>Date.now();
let raf = is_client ? (cb)=>requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}
const tasks = new Set();
function run_tasks(now) {
    tasks.forEach((task)=>{
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0) raf(run_tasks);
}
/**
 * For testing purposes only!
 */ function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */ function loop(callback) {
    let task;
    if (tasks.size === 0) raf(run_tasks);
    return {
        promise: new Promise((fulfill)=>{
            tasks.add(task = {
                c: callback,
                f: fulfill
            });
        }),
        abort () {
            tasks.delete(task);
        }
    };
}
// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while(low < high){
        const mid = low + (high - low >> 1);
        if (key(mid) <= value) low = mid + 1;
        else high = mid;
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init) return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === "HEAD") {
        const myChildren = [];
        for(let i = 0; i < children.length; i++){
            const node = children[i];
            if (node.claim_order !== undefined) myChildren.push(node);
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */ // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for(let i1 = 0; i1 < children.length; i1++){
        const current = children[i1].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = (longest > 0 && children[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx)=>children[m[idx]].claim_order, current)) - 1;
        p[i1] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i1;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for(let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]){
        lis.push(children[cur - 1]);
        for(; last >= cur; last--)toMove.push(children[last]);
        last--;
    }
    for(; last >= 0; last--)toMove.push(children[last]);
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b)=>a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for(let i2 = 0, j = 0; i2 < toMove.length; i2++){
        while(j < lis.length && toMove[i2].claim_order >= lis[j].claim_order)j++;
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i2], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element("style");
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node) return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) return root;
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element("style");
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if (target.actual_end_child === undefined || target.actual_end_child !== null && target.actual_end_child.parentNode !== target) target.actual_end_child = target.firstChild;
        // Skip nodes of undefined ordering
        while(target.actual_end_child !== null && target.actual_end_child.claim_order === undefined)target.actual_end_child = target.actual_end_child.nextSibling;
        if (node !== target.actual_end_child) // We only insert if the ordering of this node should be modified or the parent node is not target
        {
            if (node.claim_order !== undefined || node.parentNode !== target) target.insertBefore(node, target.actual_end_child);
        } else target.actual_end_child = node.nextSibling;
    } else if (node.parentNode !== target || node.nextSibling !== null) target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) append_hydration(target, node);
    else if (node.parentNode !== target || node.nextSibling != anchor) target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for(let i = 0; i < iterations.length; i += 1)if (iterations[i]) iterations[i].d(detaching);
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, {
        is
    });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for(const k in obj)if (has_prop(obj, k) && exclude.indexOf(k) === -1) // @ts-ignore
    target[k] = obj[k];
    return target;
}
function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(" ");
}
function empty() {
    return text("");
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return ()=>node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function(event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function(event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function(event) {
        // @ts-ignore
        if (event.target === this) fn.call(this, event);
    };
}
function trusted(fn) {
    return function(event) {
        // @ts-ignore
        if (event.isTrusted) fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for(const key in attributes){
        if (attributes[key] == null) node.removeAttribute(key);
        else if (key === "style") node.style.cssText = attributes[key];
        else if (key === "__value") node.value = node[key] = attributes[key];
        else if (descriptors[key] && descriptors[key].set) node[key] = attributes[key];
        else attr(node, key, attributes[key]);
    }
}
function set_svg_attributes(node, attributes) {
    for(const key in attributes)attr(node, key, attributes[key]);
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
    else attr(node, prop, value);
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for(let i = 0; i < group.length; i += 1)if (group[i].checked) value.add(group[i].__value);
    if (!checked) value.delete(__value);
    return Array.from(value);
}
function to_number(value) {
    return value === "" ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for(let i = 0; i < ranges.length; i += 1)array.push({
        start: ranges.start(i),
        end: ranges.end(i)
    });
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) nodes.claim_info = {
        last_index: 0,
        total_claimed: 0
    };
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (()=>{
        // We first try to find an element after the previous one
        for(let i = nodes.claim_info.last_index; i < nodes.length; i++){
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) nodes.splice(i, 1);
                else nodes[i] = replacement;
                if (!dontUpdateLastIndex) nodes.claim_info.last_index = i;
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for(let i1 = nodes.claim_info.last_index - 1; i1 >= 0; i1--){
            const node1 = nodes[i1];
            if (predicate(node1)) {
                const replacement1 = processNode(node1);
                if (replacement1 === undefined) nodes.splice(i1, 1);
                else nodes[i1] = replacement1;
                if (!dontUpdateLastIndex) nodes.claim_info.last_index = i1;
                else if (replacement1 === undefined) // Since we spliced before the last_index, we decrease it
                nodes.claim_info.last_index--;
                return node1;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node)=>node.nodeName === name, (node)=>{
        const remove = [];
        for(let j = 0; j < node.attributes.length; j++){
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) remove.push(attribute.name);
        }
        remove.forEach((v)=>node.removeAttribute(v));
        return undefined;
    }, ()=>create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node)=>node.nodeType === 3, (node)=>{
        const dataStr = "" + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) return node.splitText(dataStr.length);
        } else node.data = dataStr;
    }, ()=>text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, " ");
}
function find_comment(nodes, text, start) {
    for(let i = start; i < nodes.length; i += 1){
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */  && node.textContent.trim() === text) return i;
    }
    return nodes.length;
}
function claim_html_tag(nodes, is_svg) {
    // find html opening tag
    const start_index = find_comment(nodes, "HTML_TAG_START", 0);
    const end_index = find_comment(nodes, "HTML_TAG_END", start_index);
    if (start_index === end_index) return new HtmlTagHydration(undefined, is_svg);
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes){
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes, is_svg);
}
function set_data(text, data) {
    data = "" + data;
    if (text.wholeText !== data) text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? "" : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    } catch (e) {
    // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value === null) node.style.removeProperty(key);
    else node.style.setProperty(key, value, important ? "important" : "");
}
function select_option(select, value) {
    for(let i = 0; i < select.options.length; i += 1){
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for(let i = 0; i < select.options.length; i += 1){
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(":checked") || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(":checked"), (option)=>option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== "undefined" && window.parent) window.parent.document;
        } catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === "static") node.style.position = "relative";
    const iframe = element("iframe");
    iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, "message", (event)=>{
            if (event.source === iframe.contentWindow) fn();
        });
    } else {
        iframe.src = "about:blank";
        iframe.onload = ()=>{
            unsubscribe = listen(iframe.contentWindow, "resize", fn);
        };
    }
    append(node, iframe);
    return ()=>{
        if (crossorigin) unsubscribe();
        else if (unsubscribe && iframe.contentWindow) unsubscribe();
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail, { bubbles =false , cancelable =false  } = {}) {
    const e = document.createEvent("CustomEvent");
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(is_svg = false){
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg) this.e = svg_element(target.nodeName);
            else this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for(let i = 0; i < this.n.length; i += 1)insert(this.t, this.n[i], anchor);
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes, is_svg = false){
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) this.n = this.l;
        else super.c(html);
    }
    i(anchor) {
        for(let i = 0; i < this.n.length; i += 1)insert_hydration(this.t, this.n[i], anchor);
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes)result[attribute.name] = attribute.value;
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node)=>{
        result[node.slot || "default"] = true;
    });
    return result;
}
// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while(i--)hash = (hash << 5) - hash ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = {
        stylesheet: append_empty_stylesheet(node),
        rules: {}
    };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = "{\n";
    for(let p = 0; p <= 1; p += step){
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet , rules  } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || "";
    node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || "").split(", ");
    const next = previous.filter(name ? (anim)=>anim.indexOf(name) < 0 // remove specific animation
     : (anim)=>anim.indexOf("__svelte") === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(", ");
        active -= deleted;
        if (!active) clear_rules();
    }
}
function clear_rules() {
    raf(()=>{
        if (active) return;
        managed_styles.forEach((info)=>{
            const { ownerNode  } = info.stylesheet;
            // there is no ownerNode if it runs on jsdom.
            if (ownerNode) detach(ownerNode);
        });
        managed_styles.clear();
    });
}
function create_animation(node, from, fn, params) {
    if (!from) return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) return noop;
    const { delay =0 , duration =300 , easing =identity , // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay , // @ts-ignore todo:
    end =start_time + duration , tick =noop , css  } = fn(node, {
        from,
        to
    }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) name = create_rule(node, 0, 1, duration, delay, easing, css);
        if (!delay) started = true;
    }
    function stop() {
        if (css) delete_rule(node, name);
        running = false;
    }
    loop((now)=>{
        if (!started && now >= start_time) started = true;
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) return false;
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== "absolute" && style.position !== "fixed") {
        const { width , height  } = style;
        const a = node.getBoundingClientRect();
        node.style.position = "absolute";
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}
let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component) throw new Error("Function called outside component initialization");
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable =false  } = {})=>{
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, {
                cancelable
            });
            callbacks.slice().forEach((fn)=>{
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function getAllContexts() {
    return get_current_component().$$.context;
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) // @ts-ignore
    callbacks.slice().forEach((fn)=>fn.call(this, event));
}
const dirty_components = [];
const intros = {
    enabled: false
};
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while(flushidx < dirty_components.length){
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while(binding_callbacks.length)binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for(let i = 0; i < render_callbacks.length; i += 1){
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    }while (dirty_components.length);
    while(flush_callbacks.length)flush_callbacks.pop()();
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [
            -1
        ];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(()=>{
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) run_all(outros.c);
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block)) return;
        outroing.add(block);
        outros.c.push(()=>{
            outroing.delete(block);
            if (callback) {
                if (detach) block.d(1);
                callback();
            }
        });
        block.o(local);
    } else if (callback) callback();
}
const null_transition = {
    duration: 0
};
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name) delete_rule(node, animation_name);
    }
    function go() {
        const { delay =0 , duration =300 , easing =identity , tick =noop , css  } = config || null_transition;
        if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task) task.abort();
        running = true;
        add_render_callback(()=>dispatch(node, true, "start"));
        task = loop((now)=>{
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, "end");
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start () {
            if (started) return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            } else go();
        },
        invalidate () {
            started = false;
        },
        end () {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay =0 , duration =300 , easing =identity , tick =noop , css  } = config || null_transition;
        if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(()=>dispatch(node, false, "start"));
        loop((now)=>{
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, "end");
                    if (!--group.r) // this will result in `end()` being called,
                    // so we don't need to clean up here
                    run_all(group.c);
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) wait().then(()=>{
        // @ts-ignore
        config = config();
        go();
    });
    else go();
    return {
        end (reset) {
            if (reset && config.tick) config.tick(1, 0);
            if (running) {
                if (animation_name) delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name) delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay =0 , duration =300 , easing =identity , tick =noop , css  } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) pending_program = program;
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b) tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(()=>dispatch(node, b, "start"));
            loop((now)=>{
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, "start");
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, "end");
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) // intro — we can tidy up immediately
                            clear_animation();
                            else // outro — needs to be coordinated
                            if (!--running_program.group.r) run_all(running_program.group.c);
                        }
                        running_program = null;
                    } else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run (b) {
            if (is_function(config)) wait().then(()=>{
                // @ts-ignore
                config = config();
                go(b);
            });
            else go(b);
        },
        end () {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}
function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token) return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) info.blocks.forEach((block, i)=>{
                if (i !== index && block) {
                    group_outros();
                    transition_out(block, 1, 1, ()=>{
                        if (info.blocks[i] === block) info.blocks[i] = null;
                    });
                    check_outros();
                }
            });
            else info.block.d(1);
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks) info.blocks[index] = block;
        if (needs_flush) flush();
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then((value)=>{
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, (error)=>{
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) throw error;
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    } else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved  } = info;
    if (info.current === info.then) child_ctx[info.value] = resolved;
    if (info.current === info.catch) child_ctx[info.error] = resolved;
    info.block.p(child_ctx, dirty);
}
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, ()=>{
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while(i--)old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while(i--){
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        } else if (dynamic) block.p(child_ctx, dirty);
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while(o && n){
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        } else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        } else if (!lookup.has(new_key) || will_move.has(new_key)) insert(new_block);
        else if (did_move.has(old_key)) o--;
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        } else {
            will_move.add(old_key);
            o--;
        }
    }
    while(o--){
        const old_block1 = old_blocks[o];
        if (!new_lookup.has(old_block1.key)) destroy(old_block1, lookup);
    }
    while(n)insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for(let i = 0; i < list.length; i++){
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) throw new Error("Cannot have duplicate keys in a keyed each");
        keys.add(key);
    }
}
function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = {
        $$scope: 1
    };
    let i = levels.length;
    while(i--){
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for(const key in o)if (!(key in n)) to_null_out[key] = 1;
            for(const key1 in n)if (!accounted_for[key1]) {
                update[key1] = n[key1];
                accounted_for[key1] = 1;
            }
            levels[i] = n;
        } else for(const key2 in o)accounted_for[key2] = 1;
    }
    for(const key3 in to_null_out)if (!(key3 in update)) update[key3] = undefined;
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
]);
/** regex of all html void element names */ const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) attributes.class = classes_to_add;
            else attributes.class += " " + classes_to_add;
        }
        if (styles_to_add) {
            if (attributes.style == null) attributes.style = style_object_to_string(styles_to_add);
            else attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
        }
    }
    let str = "";
    Object.keys(attributes).forEach((name)=>{
        if (invalid_attribute_name_character.test(name)) return;
        const value = attributes[name];
        if (value === true) str += " " + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value) str += " " + name;
        } else if (value != null) str += ` ${name}="${value}"`;
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(";")){
        const colon_index = individual_style.indexOf(":");
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name) continue;
        style_object[name] = value;
    }
    for(const name1 in style_directive){
        const value1 = style_directive[name1];
        if (value1) style_object[name1] = value1;
        else delete style_object[name1];
    }
    return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */ function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = "";
    let last = 0;
    while(pattern.test(str)){
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === "string" || value && typeof value === "object";
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for(const key in obj)result[key] = escape_attribute_value(obj[key]);
    return result;
}
function each(items, fn) {
    let str = "";
    for(let i = 0; i < items.length; i += 1)str += fn(items[i], i);
    return str;
}
const missing_component = {
    $$render: ()=>""
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === "svelte:component") name += " this={...}";
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + " " : ""}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return "";
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({
            $$
        });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots ={} , context =new Map()  } = {})=>{
            on_destroy = [];
            const result = {
                title: "",
                head: "",
                css: new Set()
            };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map((css)=>css.code).join("\n"),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || boolean && !value) return "";
    const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : "";
}
function style_object_to_string(style_object) {
    return Object.keys(style_object).filter((key)=>style_object[key]).map((key)=>`${key}: ${style_object[key]};`).join(" ");
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : "";
}
function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment , on_mount , on_destroy , after_update  } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) // onMount happens before the initial afterUpdate
    add_render_callback(()=>{
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) on_destroy.push(...new_on_destroy);
        else // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [
    -1
]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest)=>{
        const value = rest.length ? rest[0] : ret;
        if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
            if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
            if (ready) make_dirty(component, i);
        }
        return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        } else // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
        if (options.intro) transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === "function") SvelteElement = class extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: "open"
        });
    }
    connectedCallback() {
        const { on_mount  } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        // @ts-ignore todo: improve typings
        for(const key in this.$$.slotted)// @ts-ignore todo: improve typings
        this.appendChild(this.$$.slotted[key]);
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
        this[attr] = newValue;
    }
    disconnectedCallback() {
        run_all(this.$$.on_disconnect);
    }
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        // TODO should this delegate to addEventListener?
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return ()=>{
            const index = callbacks.indexOf(callback);
            if (index !== -1) callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
};
/**
 * Base class for Svelte components. Used when dev=false.
 */ class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return ()=>{
            const index = callbacks.indexOf(callback);
            if (index !== -1) callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}
function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({
        version: "3.50.1"
    }, detail), {
        bubbles: true
    }));
}
function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", {
        target,
        node
    });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", {
        target,
        node
    });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", {
        target,
        node,
        anchor
    });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", {
        target,
        node,
        anchor
    });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", {
        node
    });
    detach(node);
}
function detach_between_dev(before, after) {
    while(before.nextSibling && before.nextSibling !== after)detach_dev(before.nextSibling);
}
function detach_before_dev(after) {
    while(after.previousSibling)detach_dev(after.previousSibling);
}
function detach_after_dev(before) {
    while(before.nextSibling)detach_dev(before.nextSibling);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? [
        "capture"
    ] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default) modifiers.push("preventDefault");
    if (has_stop_propagation) modifiers.push("stopPropagation");
    dispatch_dev("SvelteDOMAddEventListener", {
        node,
        event,
        handler,
        modifiers
    });
    const dispose = listen(node, event, handler, options);
    return ()=>{
        dispatch_dev("SvelteDOMRemoveEventListener", {
            node,
            event,
            handler,
            modifiers
        });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
        node,
        attribute
    });
    else dispatch_dev("SvelteDOMSetAttribute", {
        node,
        attribute,
        value
    });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev("SvelteDOMSetProperty", {
        node,
        property,
        value
    });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev("SvelteDOMSetDataset", {
        node,
        property,
        value
    });
}
function set_data_dev(text, data) {
    data = "" + data;
    if (text.wholeText === data) return;
    dispatch_dev("SvelteDOMSetData", {
        node: text,
        data
    });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== "string" && !(arg && typeof arg === "object" && "length" in arg)) {
        let msg = "{#each} only iterates over array-like objects.";
        if (typeof Symbol === "function" && arg && Symbol.iterator in arg) msg += " You can use a spread to convert this iterable into an array.";
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot))if (!~keys.indexOf(slot_key)) console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
}
function validate_dynamic_element(tag) {
    const is_string = typeof tag === "string";
    if (tag && !is_string) throw new Error('<svelte:element> expects "this" attribute to be a string.');
}
function validate_void_dynamic_element(tag) {
    if (tag && is_void(tag)) throw new Error(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */ class SvelteComponentDev extends SvelteComponent {
    constructor(options){
        if (!options || !options.target && !options.$$inline) throw new Error("'target' is a required option");
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = ()=>{
            console.warn("Component was already destroyed"); // eslint-disable-line no-console
        };
    }
    $capture_state() {}
    $inject_state() {}
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */ class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options){
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return ()=>{
        if (Date.now() - start > timeout) throw new Error("Infinite loop detected");
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cw48Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "blur", ()=>blur);
parcelHelpers.export(exports, "crossfade", ()=>crossfade);
parcelHelpers.export(exports, "draw", ()=>draw);
parcelHelpers.export(exports, "fade", ()=>fade);
parcelHelpers.export(exports, "fly", ()=>fly);
parcelHelpers.export(exports, "scale", ()=>scale);
parcelHelpers.export(exports, "slide", ()=>slide);
var _indexMjs = require("../easing/index.mjs");
var _indexMjs1 = require("../internal/index.mjs");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function blur(node, { delay =0 , duration =400 , easing =(0, _indexMjs.cubicInOut) , amount =5 , opacity =0  } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === "none" ? "" : style.filter;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u)=>`opacity: ${target_opacity - od * u}; filter: ${f} blur(${u * amount}px);`
    };
}
function fade(node, { delay =0 , duration =400 , easing =(0, _indexMjs.linear)  } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: (t)=>`opacity: ${t * o}`
    };
}
function fly(node, { delay =0 , duration =400 , easing =(0, _indexMjs.cubicOut) , x =0 , y =0 , opacity =0  } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u)=>`
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
    };
}
function slide(node, { delay =0 , duration =400 , easing =(0, _indexMjs.cubicOut)  } = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: (t)=>"overflow: hidden;" + `opacity: ${Math.min(t * 20, 1) * opacity};` + `height: ${t * height}px;` + `padding-top: ${t * padding_top}px;` + `padding-bottom: ${t * padding_bottom}px;` + `margin-top: ${t * margin_top}px;` + `margin-bottom: ${t * margin_bottom}px;` + `border-top-width: ${t * border_top_width}px;` + `border-bottom-width: ${t * border_bottom_width}px;`
    };
}
function scale(node, { delay =0 , duration =400 , easing =(0, _indexMjs.cubicOut) , start =0 , opacity =0  } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u)=>`
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
    };
}
function draw(node, { delay =0 , speed , duration , easing =(0, _indexMjs.cubicInOut)  } = {}) {
    let len = node.getTotalLength();
    const style = getComputedStyle(node);
    if (style.strokeLinecap !== "butt") len += parseInt(style.strokeWidth);
    if (duration === undefined) {
        if (speed === undefined) duration = 800;
        else duration = len / speed;
    } else if (typeof duration === "function") duration = duration(len);
    return {
        delay,
        duration,
        easing,
        css: (t, u)=>`stroke-dasharray: ${t * len} ${u * len}`
    };
}
function crossfade(_a) {
    var { fallback  } = _a, defaults = __rest(_a, [
        "fallback"
    ]);
    const to_receive = new Map();
    const to_send = new Map();
    function crossfade(from, node, params) {
        const { delay =0 , duration =(d)=>Math.sqrt(d) * 30 , easing =(0, _indexMjs.cubicOut)  } = (0, _indexMjs1.assign)((0, _indexMjs1.assign)({}, defaults), params);
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: (0, _indexMjs1.is_function)(duration) ? duration(d) : duration,
            easing,
            css: (t, u)=>`
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }
    function transition(items, counterparts, intro) {
        return (node, params)=>{
            items.set(params.key, {
                rect: node.getBoundingClientRect()
            });
            return ()=>{
                if (counterparts.has(params.key)) {
                    const { rect  } = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(rect, node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}

},{"../easing/index.mjs":"eSmCT","../internal/index.mjs":"iVhnC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eSmCT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "linear", ()=>(0, _indexMjs.identity));
parcelHelpers.export(exports, "backIn", ()=>backIn);
parcelHelpers.export(exports, "backInOut", ()=>backInOut);
parcelHelpers.export(exports, "backOut", ()=>backOut);
parcelHelpers.export(exports, "bounceIn", ()=>bounceIn);
parcelHelpers.export(exports, "bounceInOut", ()=>bounceInOut);
parcelHelpers.export(exports, "bounceOut", ()=>bounceOut);
parcelHelpers.export(exports, "circIn", ()=>circIn);
parcelHelpers.export(exports, "circInOut", ()=>circInOut);
parcelHelpers.export(exports, "circOut", ()=>circOut);
parcelHelpers.export(exports, "cubicIn", ()=>cubicIn);
parcelHelpers.export(exports, "cubicInOut", ()=>cubicInOut);
parcelHelpers.export(exports, "cubicOut", ()=>cubicOut);
parcelHelpers.export(exports, "elasticIn", ()=>elasticIn);
parcelHelpers.export(exports, "elasticInOut", ()=>elasticInOut);
parcelHelpers.export(exports, "elasticOut", ()=>elasticOut);
parcelHelpers.export(exports, "expoIn", ()=>expoIn);
parcelHelpers.export(exports, "expoInOut", ()=>expoInOut);
parcelHelpers.export(exports, "expoOut", ()=>expoOut);
parcelHelpers.export(exports, "quadIn", ()=>quadIn);
parcelHelpers.export(exports, "quadInOut", ()=>quadInOut);
parcelHelpers.export(exports, "quadOut", ()=>quadOut);
parcelHelpers.export(exports, "quartIn", ()=>quartIn);
parcelHelpers.export(exports, "quartInOut", ()=>quartInOut);
parcelHelpers.export(exports, "quartOut", ()=>quartOut);
parcelHelpers.export(exports, "quintIn", ()=>quintIn);
parcelHelpers.export(exports, "quintInOut", ()=>quintInOut);
parcelHelpers.export(exports, "quintOut", ()=>quintOut);
parcelHelpers.export(exports, "sineIn", ()=>sineIn);
parcelHelpers.export(exports, "sineInOut", ()=>sineInOut);
parcelHelpers.export(exports, "sineOut", ()=>sineOut);
var _indexMjs = require("../internal/index.mjs");
/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/ function backInOut(t) {
    const s = 2.5949095;
    if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}
function backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
function backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}
function bounceOut(t) {
    const a = 4.0 / 11.0;
    const b = 8.0 / 11.0;
    const c = 0.9;
    const ca = 4356.0 / 361.0;
    const cb = 35442.0 / 1805.0;
    const cc = 16061.0 / 1805.0;
    const t2 = t * t;
    return t < a ? 7.5625 * t2 : t < b ? 9.075 * t2 - 9.9 * t + 3.4 : t < c ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
}
function bounceInOut(t) {
    return t < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0)) : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
function bounceIn(t) {
    return 1.0 - bounceOut(1.0 - t);
}
function circInOut(t) {
    if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
function circIn(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}
function circOut(t) {
    return Math.sqrt(1 - --t * t);
}
function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function elasticInOut(t) {
    return t < 0.5 ? 0.5 * Math.sin(13 * Math.PI / 2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) : 0.5 * Math.sin(-13 * Math.PI / 2 * (2.0 * t - 1.0 + 1.0)) * Math.pow(2.0, -10 * (2.0 * t - 1.0)) + 1.0;
}
function elasticIn(t) {
    return Math.sin(13.0 * t * Math.PI / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}
function elasticOut(t) {
    return Math.sin(-13 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10 * t) + 1.0;
}
function expoInOut(t) {
    return t === 0.0 || t === 1.0 ? t : t < 0.5 ? 0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}
function expoIn(t) {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}
function expoOut(t) {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10 * t);
}
function quadInOut(t) {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}
function quadIn(t) {
    return t * t;
}
function quadOut(t) {
    return -t * (t - 2.0);
}
function quartInOut(t) {
    return t < 0.5 ? 8 * Math.pow(t, 4.0) : -8 * Math.pow(t - 1.0, 4.0) + 1.0;
}
function quartIn(t) {
    return Math.pow(t, 4.0);
}
function quartOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}
function quintInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}
function quintIn(t) {
    return t * t * t * t * t;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}
function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function sineIn(t) {
    const v = Math.cos(t * Math.PI * 0.5);
    if (Math.abs(v) < 1e-14) return 1;
    else return 1 - v;
}
function sineOut(t) {
    return Math.sin(t * Math.PI / 2);
}

},{"../internal/index.mjs":"iVhnC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4r74h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SvelteComponent", ()=>(0, _indexMjs.SvelteComponentDev));
parcelHelpers.export(exports, "SvelteComponentTyped", ()=>(0, _indexMjs.SvelteComponentTyped));
parcelHelpers.export(exports, "afterUpdate", ()=>(0, _indexMjs.afterUpdate));
parcelHelpers.export(exports, "beforeUpdate", ()=>(0, _indexMjs.beforeUpdate));
parcelHelpers.export(exports, "createEventDispatcher", ()=>(0, _indexMjs.createEventDispatcher));
parcelHelpers.export(exports, "getAllContexts", ()=>(0, _indexMjs.getAllContexts));
parcelHelpers.export(exports, "getContext", ()=>(0, _indexMjs.getContext));
parcelHelpers.export(exports, "hasContext", ()=>(0, _indexMjs.hasContext));
parcelHelpers.export(exports, "onDestroy", ()=>(0, _indexMjs.onDestroy));
parcelHelpers.export(exports, "onMount", ()=>(0, _indexMjs.onMount));
parcelHelpers.export(exports, "setContext", ()=>(0, _indexMjs.setContext));
parcelHelpers.export(exports, "tick", ()=>(0, _indexMjs.tick));
var _indexMjs = require("./internal/index.mjs");

},{"./internal/index.mjs":"iVhnC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6DBki":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "get", ()=>(0, _indexMjs.get_store_value));
parcelHelpers.export(exports, "derived", ()=>derived);
parcelHelpers.export(exports, "readable", ()=>readable);
parcelHelpers.export(exports, "writable", ()=>writable);
var _indexMjs = require("../internal/index.mjs");
const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */ function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */ function writable(value, start = (0, _indexMjs.noop)) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if ((0, _indexMjs.safe_not_equal)(value, new_value)) {
            value = new_value;
            if (stop) {
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers){
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for(let i = 0; i < subscriber_queue.length; i += 2)subscriber_queue[i][0](subscriber_queue[i + 1]);
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = (0, _indexMjs.noop)) {
        const subscriber = [
            run,
            invalidate
        ];
        subscribers.add(subscriber);
        if (subscribers.size === 1) stop = start(set) || (0, _indexMjs.noop);
        run(value);
        return ()=>{
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return {
        set,
        update,
        subscribe
    };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [
        stores
    ] : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set)=>{
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = (0, _indexMjs.noop);
        const sync = ()=>{
            if (pending) return;
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) set(result);
            else cleanup = (0, _indexMjs.is_function)(result) ? result : (0, _indexMjs.noop);
        };
        const unsubscribers = stores_array.map((store, i)=>(0, _indexMjs.subscribe)(store, (value)=>{
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) sync();
            }, ()=>{
                pending |= 1 << i;
            }));
        inited = true;
        sync();
        return function stop() {
            (0, _indexMjs.run_all)(unsubscribers);
            cleanup();
        };
    });
}

},{"../internal/index.mjs":"iVhnC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["davV6","aQAqQ"], "aQAqQ", "parcelRequire94c2")

//# sourceMappingURL=app.js.map
