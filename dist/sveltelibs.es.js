var Gn = Object.defineProperty;
var Ae = (t) => {
  throw TypeError(t);
};
var Yn = (t, e, n) => e in t ? Gn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var b = (t, e, n) => Yn(t, typeof e != "symbol" ? e + "" : e, n), Ce = (t, e, n) => e.has(t) || Ae("Cannot " + n);
var I = (t, e, n) => (Ce(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Kt = (t, e, n) => e.has(t) ? Ae("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Xt = (t, e, n, r) => (Ce(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.3.0
*/
const We = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), St = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), _t = Object.freeze({
  ...We,
  ...St
}), ne = Object.freeze({
  ..._t,
  body: "",
  hidden: !1
}), Jn = Object.freeze({
  width: null,
  height: null
}), Ke = Object.freeze({
  // Dimensions
  ...Jn,
  // Transformations
  ...St
});
function Wn(t, e = 0) {
  const n = t.replace(/^-?[0-9.]*/, "");
  function r(s) {
    for (; s < 0; )
      s += 4;
    return s % 4;
  }
  if (n === "") {
    const s = parseInt(t);
    return isNaN(s) ? 0 : r(s);
  } else if (n !== t) {
    let s = 0;
    switch (n) {
      case "%":
        s = 25;
        break;
      case "deg":
        s = 90;
    }
    if (s) {
      let i = parseFloat(t.slice(0, t.length - n.length));
      return isNaN(i) ? 0 : (i = i / s, i % 1 === 0 ? r(i) : 0);
    }
  }
  return e;
}
const Kn = /[\s,]+/;
function Xn(t, e) {
  e.split(Kn).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        t.hFlip = !0;
        break;
      case "vertical":
        t.vFlip = !0;
        break;
    }
  });
}
const Xe = {
  ...Ke,
  preserveAspectRatio: ""
};
function Te(t) {
  const e = {
    ...Xe
  }, n = (r, s) => t.getAttribute(r) || s;
  return e.width = n("width", null), e.height = n("height", null), e.rotate = Wn(n("rotate", "")), Xn(e, n("flip", "")), e.preserveAspectRatio = n("preserveAspectRatio", n("preserveaspectratio", "")), e;
}
function Zn(t, e) {
  for (const n in Xe)
    if (t[n] !== e[n])
      return !0;
  return !1;
}
const Ze = /^[a-z0-9]+(-[a-z0-9]+)*$/, mt = (t, e, n, r = "") => {
  const s = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (s.length < 2 || s.length > 3)
      return null;
    r = s.shift().slice(1);
  }
  if (s.length > 3 || !s.length)
    return null;
  if (s.length > 1) {
    const l = s.pop(), c = s.pop(), a = {
      // Allow provider without '@': "provider:prefix:name"
      provider: s.length > 0 ? s[0] : r,
      prefix: c,
      name: l
    };
    return e && !kt(a) ? null : a;
  }
  const i = s[0], o = i.split("-");
  if (o.length > 1) {
    const l = {
      provider: r,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !kt(l) ? null : l;
  }
  if (n && r === "") {
    const l = {
      provider: r,
      prefix: "",
      name: i
    };
    return e && !kt(l, n) ? null : l;
  }
  return null;
}, kt = (t, e) => t ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((e && t.prefix === "" || t.prefix) && t.name) : !1;
function tr(t, e) {
  const n = {};
  !t.hFlip != !e.hFlip && (n.hFlip = !0), !t.vFlip != !e.vFlip && (n.vFlip = !0);
  const r = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return r && (n.rotate = r), n;
}
function Se(t, e) {
  const n = tr(t, e);
  for (const r in ne)
    r in St ? r in t && !(r in n) && (n[r] = St[r]) : r in e ? n[r] = e[r] : r in t && (n[r] = t[r]);
  return n;
}
function er(t, e) {
  const n = t.icons, r = t.aliases || /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  function i(o) {
    if (n[o])
      return s[o] = [];
    if (!(o in s)) {
      s[o] = null;
      const l = r[o] && r[o].parent, c = l && i(l);
      c && (s[o] = [l].concat(c));
    }
    return s[o];
  }
  return Object.keys(n).concat(Object.keys(r)).forEach(i), s;
}
function nr(t, e, n) {
  const r = t.icons, s = t.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function o(l) {
    i = Se(
      r[l] || s[l],
      i
    );
  }
  return o(e), n.forEach(o), Se(t, i);
}
function tn(t, e) {
  const n = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return n;
  t.not_found instanceof Array && t.not_found.forEach((s) => {
    e(s, null), n.push(s);
  });
  const r = er(t);
  for (const s in r) {
    const i = r[s];
    i && (e(s, nr(t, s, i)), n.push(s));
  }
  return n;
}
const rr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...We
};
function Zt(t, e) {
  for (const n in e)
    if (n in t && typeof t[n] != typeof e[n])
      return !1;
  return !0;
}
function en(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !Zt(t, rr))
    return null;
  const n = e.icons;
  for (const s in n) {
    const i = n[s];
    if (
      // Name cannot be empty
      !s || // Must have body
      typeof i.body != "string" || // Check other props
      !Zt(
        i,
        ne
      )
    )
      return null;
  }
  const r = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const s in r) {
    const i = r[s], o = i.parent;
    if (
      // Name cannot be empty
      !s || // Parent must be set and point to existing icon
      typeof o != "string" || !n[o] && !r[o] || // Check other props
      !Zt(
        i,
        ne
      )
    )
      return null;
  }
  return e;
}
const Ot = /* @__PURE__ */ Object.create(null);
function sr(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function q(t, e) {
  const n = Ot[t] || (Ot[t] = /* @__PURE__ */ Object.create(null));
  return n[e] || (n[e] = sr(t, e));
}
function nn(t, e) {
  return en(e) ? tn(e, (n, r) => {
    r ? t.icons[n] = r : t.missing.add(n);
  }) : [];
}
function ir(t, e, n) {
  try {
    if (typeof n.body == "string")
      return t.icons[e] = { ...n }, !0;
  } catch {
  }
  return !1;
}
function or(t, e) {
  let n = [];
  return (typeof t == "string" ? [t] : Object.keys(Ot)).forEach((s) => {
    (typeof s == "string" && typeof e == "string" ? [e] : Object.keys(Ot[s] || {})).forEach((o) => {
      const l = q(s, o);
      n = n.concat(
        Object.keys(l.icons).map(
          (c) => (s !== "" ? "@" + s + ":" : "") + o + ":" + c
        )
      );
    });
  }), n;
}
let ht = !1;
function rn(t) {
  return typeof t == "boolean" && (ht = t), ht;
}
function pt(t) {
  const e = typeof t == "string" ? mt(t, !0, ht) : t;
  if (e) {
    const n = q(e.provider, e.prefix), r = e.name;
    return n.icons[r] || (n.missing.has(r) ? null : void 0);
  }
}
function sn(t, e) {
  const n = mt(t, !0, ht);
  if (!n)
    return !1;
  const r = q(n.provider, n.prefix);
  return e ? ir(r, n.name, e) : (r.missing.add(n.name), !0);
}
function Oe(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), ht && !e && !t.prefix) {
    let s = !1;
    return en(t) && (t.prefix = "", tn(t, (i, o) => {
      sn(i, o) && (s = !0);
    })), s;
  }
  const n = t.prefix;
  if (!kt({
    prefix: n,
    name: "a"
  }))
    return !1;
  const r = q(e, n);
  return !!nn(r, t);
}
function Ne(t) {
  return !!pt(t);
}
function lr(t) {
  const e = pt(t);
  return e && {
    ..._t,
    ...e
  };
}
function cr(t) {
  const e = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  t.sort((s, i) => s.provider !== i.provider ? s.provider.localeCompare(i.provider) : s.prefix !== i.prefix ? s.prefix.localeCompare(i.prefix) : s.name.localeCompare(i.name));
  let r = {
    provider: "",
    prefix: "",
    name: ""
  };
  return t.forEach((s) => {
    if (r.name === s.name && r.prefix === s.prefix && r.provider === s.provider)
      return;
    r = s;
    const i = s.provider, o = s.prefix, l = s.name, c = n[i] || (n[i] = /* @__PURE__ */ Object.create(null)), a = c[o] || (c[o] = q(i, o));
    let u;
    l in a.icons ? u = e.loaded : o === "" || a.missing.has(l) ? u = e.missing : u = e.pending;
    const f = {
      provider: i,
      prefix: o,
      name: l
    };
    u.push(f);
  }), e;
}
function on(t, e) {
  t.forEach((n) => {
    const r = n.loaderCallbacks;
    r && (n.loaderCallbacks = r.filter((s) => s.id !== e));
  });
}
function ar(t) {
  t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
    t.pendingCallbacksFlag = !1;
    const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let n = !1;
    const r = t.provider, s = t.prefix;
    e.forEach((i) => {
      const o = i.icons, l = o.pending.length;
      o.pending = o.pending.filter((c) => {
        if (c.prefix !== s)
          return !0;
        const a = c.name;
        if (t.icons[a])
          o.loaded.push({
            provider: r,
            prefix: s,
            name: a
          });
        else if (t.missing.has(a))
          o.missing.push({
            provider: r,
            prefix: s,
            name: a
          });
        else
          return n = !0, !0;
        return !1;
      }), o.pending.length !== l && (n || on([t], i.id), i.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        i.abort
      ));
    });
  }));
}
let ur = 0;
function fr(t, e, n) {
  const r = ur++, s = on.bind(null, n, r);
  if (!e.pending.length)
    return s;
  const i = {
    id: r,
    icons: e,
    callback: t,
    abort: s
  };
  return n.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(i);
  }), s;
}
const re = /* @__PURE__ */ Object.create(null);
function Pe(t, e) {
  re[t] = e;
}
function se(t) {
  return re[t] || re[""];
}
function dr(t, e = !0, n = !1) {
  const r = [];
  return t.forEach((s) => {
    const i = typeof s == "string" ? mt(s, e, n) : s;
    i && r.push(i);
  }), r;
}
var hr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function pr(t, e, n, r) {
  const s = t.resources.length, i = t.random ? Math.floor(Math.random() * s) : t.index;
  let o;
  if (t.random) {
    let v = t.resources.slice(0);
    for (o = []; v.length > 1; ) {
      const T = Math.floor(Math.random() * v.length);
      o.push(v[T]), v = v.slice(0, T).concat(v.slice(T + 1));
    }
    o = o.concat(v);
  } else
    o = t.resources.slice(i).concat(t.resources.slice(0, i));
  const l = Date.now();
  let c = "pending", a = 0, u, f = null, d = [], h = [];
  typeof r == "function" && h.push(r);
  function p() {
    f && (clearTimeout(f), f = null);
  }
  function m() {
    c === "pending" && (c = "aborted"), p(), d.forEach((v) => {
      v.status === "pending" && (v.status = "aborted");
    }), d = [];
  }
  function w(v, T) {
    T && (h = []), typeof v == "function" && h.push(v);
  }
  function ot() {
    return {
      startTime: l,
      payload: e,
      status: c,
      queriesSent: a,
      queriesPending: d.length,
      subscribe: w,
      abort: m
    };
  }
  function L() {
    c = "failed", h.forEach((v) => {
      v(void 0, u);
    });
  }
  function $() {
    d.forEach((v) => {
      v.status === "pending" && (v.status = "aborted");
    }), d = [];
  }
  function C(v, T, lt) {
    const xt = T !== "success";
    switch (d = d.filter((Y) => Y !== v), c) {
      case "pending":
        break;
      case "failed":
        if (xt || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (T === "abort") {
      u = lt, L();
      return;
    }
    if (xt) {
      u = lt, d.length || (o.length ? Wt() : L());
      return;
    }
    if (p(), $(), !t.random) {
      const Y = t.resources.indexOf(v.resource);
      Y !== -1 && Y !== t.index && (t.index = Y);
    }
    c = "completed", h.forEach((Y) => {
      Y(lt);
    });
  }
  function Wt() {
    if (c !== "pending")
      return;
    p();
    const v = o.shift();
    if (v === void 0) {
      if (d.length) {
        f = setTimeout(() => {
          p(), c === "pending" && ($(), L());
        }, t.timeout);
        return;
      }
      L();
      return;
    }
    const T = {
      status: "pending",
      resource: v,
      callback: (lt, xt) => {
        C(T, lt, xt);
      }
    };
    d.push(T), a++, f = setTimeout(Wt, t.rotate), n(v, e, T.callback);
  }
  return setTimeout(Wt), ot;
}
function ln(t) {
  const e = {
    ...hr,
    ...t
  };
  let n = [];
  function r() {
    n = n.filter((l) => l().status === "pending");
  }
  function s(l, c, a) {
    const u = pr(
      e,
      l,
      c,
      (f, d) => {
        r(), a && a(f, d);
      }
    );
    return n.push(u), u;
  }
  function i(l) {
    return n.find((c) => l(c)) || null;
  }
  return {
    query: s,
    find: i,
    setIndex: (l) => {
      e.index = l;
    },
    getIndex: () => e.index,
    cleanup: r
  };
}
function pe(t) {
  let e;
  if (typeof t.resources == "string")
    e = [t.resources];
  else if (e = t.resources, !(e instanceof Array) || !e.length)
    return null;
  return {
    // API hosts
    resources: e,
    // Root path
    path: t.path || "/",
    // URL length limit
    maxURL: t.maxURL || 500,
    // Timeout before next host is used.
    rotate: t.rotate || 750,
    // Timeout before failing query.
    timeout: t.timeout || 5e3,
    // Randomise default API end point.
    random: t.random === !0,
    // Start index
    index: t.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: t.dataAfterTimeout !== !1
  };
}
const Ut = /* @__PURE__ */ Object.create(null), ct = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], It = [];
for (; ct.length > 0; )
  ct.length === 1 || Math.random() > 0.5 ? It.push(ct.shift()) : It.push(ct.pop());
Ut[""] = pe({
  resources: ["https://api.iconify.design"].concat(It)
});
function Le(t, e) {
  const n = pe(e);
  return n === null ? !1 : (Ut[t] = n, !0);
}
function Bt(t) {
  return Ut[t];
}
function vr() {
  return Object.keys(Ut);
}
function Re() {
}
const te = /* @__PURE__ */ Object.create(null);
function gr(t) {
  if (!te[t]) {
    const e = Bt(t);
    if (!e)
      return;
    const n = ln(e), r = {
      config: e,
      redundancy: n
    };
    te[t] = r;
  }
  return te[t];
}
function cn(t, e, n) {
  let r, s;
  if (typeof t == "string") {
    const i = se(t);
    if (!i)
      return n(void 0, 424), Re;
    s = i.send;
    const o = gr(t);
    o && (r = o.redundancy);
  } else {
    const i = pe(t);
    if (i) {
      r = ln(i);
      const o = t.resources ? t.resources[0] : "", l = se(o);
      l && (s = l.send);
    }
  }
  return !r || !s ? (n(void 0, 424), Re) : r.query(e, s, n)().abort;
}
function je() {
}
function _r(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, ar(t);
  }));
}
function mr(t) {
  const e = [], n = [];
  return t.forEach((r) => {
    (r.match(Ze) ? e : n).push(r);
  }), {
    valid: e,
    invalid: n
  };
}
function at(t, e, n) {
  function r() {
    const s = t.pendingIcons;
    e.forEach((i) => {
      s && s.delete(i), t.icons[i] || t.missing.add(i);
    });
  }
  if (n && typeof n == "object")
    try {
      if (!nn(t, n).length) {
        r();
        return;
      }
    } catch (s) {
      console.error(s);
    }
  r(), _r(t);
}
function Fe(t, e) {
  t instanceof Promise ? t.then((n) => {
    e(n);
  }).catch(() => {
    e(null);
  }) : e(t);
}
function br(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: n, prefix: r } = t, s = t.iconsToLoad;
    if (delete t.iconsToLoad, !s || !s.length)
      return;
    const i = t.loadIcon;
    if (t.loadIcons && (s.length > 1 || !i)) {
      Fe(
        t.loadIcons(s, r, n),
        (u) => {
          at(t, s, u);
        }
      );
      return;
    }
    if (i) {
      s.forEach((u) => {
        const f = i(u, r, n);
        Fe(f, (d) => {
          const h = d ? {
            prefix: r,
            icons: {
              [u]: d
            }
          } : null;
          at(t, [u], h);
        });
      });
      return;
    }
    const { valid: o, invalid: l } = mr(s);
    if (l.length && at(t, l, null), !o.length)
      return;
    const c = r.match(Ze) ? se(n) : null;
    if (!c) {
      at(t, o, null);
      return;
    }
    c.prepare(n, r, o).forEach((u) => {
      cn(n, u, (f) => {
        at(t, u.icons, f);
      });
    });
  }));
}
const ve = (t, e) => {
  const n = dr(t, !0, rn()), r = cr(n);
  if (!r.pending.length) {
    let c = !0;
    return e && setTimeout(() => {
      c && e(
        r.loaded,
        r.missing,
        r.pending,
        je
      );
    }), () => {
      c = !1;
    };
  }
  const s = /* @__PURE__ */ Object.create(null), i = [];
  let o, l;
  return r.pending.forEach((c) => {
    const { provider: a, prefix: u } = c;
    if (u === l && a === o)
      return;
    o = a, l = u, i.push(q(a, u));
    const f = s[a] || (s[a] = /* @__PURE__ */ Object.create(null));
    f[u] || (f[u] = []);
  }), r.pending.forEach((c) => {
    const { provider: a, prefix: u, name: f } = c, d = q(a, u), h = d.pendingIcons || (d.pendingIcons = /* @__PURE__ */ new Set());
    h.has(f) || (h.add(f), s[a][u].push(f));
  }), i.forEach((c) => {
    const a = s[c.provider][c.prefix];
    a.length && br(c, a);
  }), e ? fr(e, r, i) : je;
}, yr = (t) => new Promise((e, n) => {
  const r = typeof t == "string" ? mt(t, !0) : t;
  if (!r) {
    n(t);
    return;
  }
  ve([r || t], (s) => {
    if (s.length && r) {
      const i = pt(r);
      if (i) {
        e({
          ..._t,
          ...i
        });
        return;
      }
    }
    n(t);
  });
});
function Me(t) {
  try {
    const e = typeof t == "string" ? JSON.parse(t) : t;
    if (typeof e.body == "string")
      return {
        ...e
      };
  } catch {
  }
}
function wr(t, e) {
  if (typeof t == "object")
    return {
      data: Me(t),
      value: t
    };
  if (typeof t != "string")
    return {
      value: t
    };
  if (t.includes("{")) {
    const i = Me(t);
    if (i)
      return {
        data: i,
        value: t
      };
  }
  const n = mt(t, !0, !0);
  if (!n)
    return {
      value: t
    };
  const r = pt(n);
  if (r !== void 0 || !n.prefix)
    return {
      value: t,
      name: n,
      data: r
      // could be 'null' -> icon is missing
    };
  const s = ve([n], () => e(t, n, pt(n)));
  return {
    value: t,
    name: n,
    loading: s
  };
}
let an = !1;
try {
  an = navigator.vendor.indexOf("Apple") === 0;
} catch {
}
function $r(t, e) {
  switch (e) {
    // Force mode
    case "svg":
    case "bg":
    case "mask":
      return e;
  }
  return e !== "style" && (an || t.indexOf("<a") === -1) ? "svg" : t.indexOf("currentColor") === -1 ? "bg" : "mask";
}
const xr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Er = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ie(t, e, n) {
  if (e === 1)
    return t;
  if (n = n || 100, typeof t == "number")
    return Math.ceil(t * e * n) / n;
  if (typeof t != "string")
    return t;
  const r = t.split(xr);
  if (r === null || !r.length)
    return t;
  const s = [];
  let i = r.shift(), o = Er.test(i);
  for (; ; ) {
    if (o) {
      const l = parseFloat(i);
      isNaN(l) ? s.push(i) : s.push(Math.ceil(l * e * n) / n);
    } else
      s.push(i);
    if (i = r.shift(), i === void 0)
      return s.join("");
    o = !o;
  }
}
function kr(t, e = "defs") {
  let n = "";
  const r = t.indexOf("<" + e);
  for (; r >= 0; ) {
    const s = t.indexOf(">", r), i = t.indexOf("</" + e);
    if (s === -1 || i === -1)
      break;
    const o = t.indexOf(">", i);
    if (o === -1)
      break;
    n += t.slice(s + 1, i).trim(), t = t.slice(0, r).trim() + t.slice(o + 1);
  }
  return {
    defs: n,
    content: t
  };
}
function Ir(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Ar(t, e, n) {
  const r = kr(t);
  return Ir(r.defs, e + r.content + n);
}
const Cr = (t) => t === "unset" || t === "undefined" || t === "none";
function un(t, e) {
  const n = {
    ..._t,
    ...t
  }, r = {
    ...Ke,
    ...e
  }, s = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let i = n.body;
  [n, r].forEach((m) => {
    const w = [], ot = m.hFlip, L = m.vFlip;
    let $ = m.rotate;
    ot ? L ? $ += 2 : (w.push(
      "translate(" + (s.width + s.left).toString() + " " + (0 - s.top).toString() + ")"
    ), w.push("scale(-1 1)"), s.top = s.left = 0) : L && (w.push(
      "translate(" + (0 - s.left).toString() + " " + (s.height + s.top).toString() + ")"
    ), w.push("scale(1 -1)"), s.top = s.left = 0);
    let C;
    switch ($ < 0 && ($ -= Math.floor($ / 4) * 4), $ = $ % 4, $) {
      case 1:
        C = s.height / 2 + s.top, w.unshift(
          "rotate(90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
      case 2:
        w.unshift(
          "rotate(180 " + (s.width / 2 + s.left).toString() + " " + (s.height / 2 + s.top).toString() + ")"
        );
        break;
      case 3:
        C = s.width / 2 + s.left, w.unshift(
          "rotate(-90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
    }
    $ % 2 === 1 && (s.left !== s.top && (C = s.left, s.left = s.top, s.top = C), s.width !== s.height && (C = s.width, s.width = s.height, s.height = C)), w.length && (i = Ar(
      i,
      '<g transform="' + w.join(" ") + '">',
      "</g>"
    ));
  });
  const o = r.width, l = r.height, c = s.width, a = s.height;
  let u, f;
  o === null ? (f = l === null ? "1em" : l === "auto" ? a : l, u = ie(f, c / a)) : (u = o === "auto" ? c : o, f = l === null ? ie(u, a / c) : l === "auto" ? a : l);
  const d = {}, h = (m, w) => {
    Cr(w) || (d[m] = w.toString());
  };
  h("width", u), h("height", f);
  const p = [s.left, s.top, c, a];
  return d.viewBox = p.join(" "), {
    attributes: d,
    viewBox: p,
    body: i
  };
}
function ge(t, e) {
  let n = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in e)
    n += " " + r + '="' + e[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + t + "</svg>";
}
function Tr(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Sr(t) {
  return "data:image/svg+xml," + Tr(t);
}
function fn(t) {
  return 'url("' + Sr(t) + '")';
}
const Or = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let Nt = Or();
function Nr(t) {
  Nt = t;
}
function Pr() {
  return Nt;
}
function Lr(t, e) {
  const n = Bt(t);
  if (!n)
    return 0;
  let r;
  if (!n.maxURL)
    r = 0;
  else {
    let s = 0;
    n.resources.forEach((o) => {
      s = Math.max(s, o.length);
    });
    const i = e + ".json?icons=";
    r = n.maxURL - s - n.path.length - i.length;
  }
  return r;
}
function Rr(t) {
  return t === 404;
}
const jr = (t, e, n) => {
  const r = [], s = Lr(t, e), i = "icons";
  let o = {
    type: i,
    provider: t,
    prefix: e,
    icons: []
  }, l = 0;
  return n.forEach((c, a) => {
    l += c.length + 1, l >= s && a > 0 && (r.push(o), o = {
      type: i,
      provider: t,
      prefix: e,
      icons: []
    }, l = c.length), o.icons.push(c);
  }), r.push(o), r;
};
function Fr(t) {
  if (typeof t == "string") {
    const e = Bt(t);
    if (e)
      return e.path;
  }
  return "/";
}
const Mr = (t, e, n) => {
  if (!Nt) {
    n("abort", 424);
    return;
  }
  let r = Fr(e.provider);
  switch (e.type) {
    case "icons": {
      const i = e.prefix, l = e.icons.join(","), c = new URLSearchParams({
        icons: l
      });
      r += i + ".json?" + c.toString();
      break;
    }
    case "custom": {
      const i = e.uri;
      r += i.slice(0, 1) === "/" ? i.slice(1) : i;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let s = 503;
  Nt(t + r).then((i) => {
    const o = i.status;
    if (o !== 200) {
      setTimeout(() => {
        n(Rr(o) ? "abort" : "next", o);
      });
      return;
    }
    return s = 501, i.json();
  }).then((i) => {
    if (typeof i != "object" || i === null) {
      setTimeout(() => {
        i === 404 ? n("abort", i) : n("next", s);
      });
      return;
    }
    setTimeout(() => {
      n("success", i);
    });
  }).catch(() => {
    n("next", s);
  });
}, Dr = {
  prepare: jr,
  send: Mr
};
function qr(t, e, n) {
  q(n || "", e).loadIcons = t;
}
function Hr(t, e, n) {
  q(n || "", e).loadIcon = t;
}
const ee = "data-style";
let dn = "";
function zr(t) {
  dn = t;
}
function De(t, e) {
  let n = Array.from(t.childNodes).find((r) => r.hasAttribute && r.hasAttribute(ee));
  n || (n = document.createElement("style"), n.setAttribute(ee, ee), t.appendChild(n)), n.textContent = ":host{display:inline-block;vertical-align:" + (e ? "-0.125em" : "0") + "}span,svg{display:block;margin:auto}" + dn;
}
function hn() {
  Pe("", Dr), rn(!0);
  let t;
  try {
    t = window;
  } catch {
  }
  if (t) {
    if (t.IconifyPreload !== void 0) {
      const n = t.IconifyPreload, r = "Invalid IconifyPreload syntax.";
      typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach((s) => {
        try {
          // Check if item is an object and not null/array
          (typeof s != "object" || s === null || s instanceof Array || // Check for 'icons' and 'prefix'
          typeof s.icons != "object" || typeof s.prefix != "string" || // Add icon set
          !Oe(s)) && console.error(r);
        } catch {
          console.error(r);
        }
      });
    }
    if (t.IconifyProviders !== void 0) {
      const n = t.IconifyProviders;
      if (typeof n == "object" && n !== null)
        for (const r in n) {
          const s = "IconifyProviders[" + r + "] is invalid.";
          try {
            const i = n[r];
            if (typeof i != "object" || !i || i.resources === void 0)
              continue;
            Le(r, i) || console.error(s);
          } catch {
            console.error(s);
          }
        }
    }
  }
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    enableCache: (n) => {
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    disableCache: (n) => {
    },
    iconLoaded: Ne,
    iconExists: Ne,
    // deprecated, kept to avoid breaking changes
    getIcon: lr,
    listIcons: or,
    addIcon: sn,
    addCollection: Oe,
    calculateSize: ie,
    buildIcon: un,
    iconToHTML: ge,
    svgToURL: fn,
    loadIcons: ve,
    loadIcon: yr,
    addAPIProvider: Le,
    setCustomIconLoader: Hr,
    setCustomIconsLoader: qr,
    appendCustomStyle: zr,
    _api: {
      getAPIConfig: Bt,
      setAPIModule: Pe,
      sendAPIQuery: cn,
      setFetch: Nr,
      getFetch: Pr,
      listAPIProviders: vr
    }
  };
}
const oe = {
  "background-color": "currentColor"
}, pn = {
  "background-color": "transparent"
}, qe = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
}, He = {
  "-webkit-mask": oe,
  mask: oe,
  background: pn
};
for (const t in He) {
  const e = He[t];
  for (const n in qe)
    e[t + "-" + n] = qe[n];
}
function ze(t) {
  return t ? t + (t.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
}
function Ur(t, e, n) {
  const r = document.createElement("span");
  let s = t.body;
  s.indexOf("<a") !== -1 && (s += "<!-- " + Date.now() + " -->");
  const i = t.attributes, o = ge(s, {
    ...i,
    width: e.width + "",
    height: e.height + ""
  }), l = fn(o), c = r.style, a = {
    "--svg": l,
    width: ze(i.width),
    height: ze(i.height),
    ...n ? oe : pn
  };
  for (const u in a)
    c.setProperty(u, a[u]);
  return r;
}
let ut;
function Br() {
  try {
    ut = window.trustedTypes.createPolicy("iconify", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      createHTML: (t) => t
    });
  } catch {
    ut = null;
  }
}
function Vr(t) {
  return ut === void 0 && Br(), ut ? ut.createHTML(t) : t;
}
function Qr(t) {
  const e = document.createElement("span"), n = t.attributes;
  let r = "";
  n.width || (r = "width: inherit;"), n.height || (r += "height: inherit;"), r && (n.style = r);
  const s = ge(t.body, n);
  return e.innerHTML = Vr(s), e.firstChild;
}
function le(t) {
  return Array.from(t.childNodes).find((e) => {
    const n = e.tagName && e.tagName.toUpperCase();
    return n === "SPAN" || n === "SVG";
  });
}
function Ue(t, e) {
  const n = e.icon.data, r = e.customisations, s = un(n, r);
  r.preserveAspectRatio && (s.attributes.preserveAspectRatio = r.preserveAspectRatio);
  const i = e.renderedMode;
  let o;
  switch (i) {
    case "svg":
      o = Qr(s);
      break;
    default:
      o = Ur(s, {
        ..._t,
        ...n
      }, i === "mask");
  }
  const l = le(t);
  l ? o.tagName === "SPAN" && l.tagName === o.tagName ? l.setAttribute("style", o.getAttribute("style")) : t.replaceChild(o, l) : t.appendChild(o);
}
function Be(t, e, n) {
  const r = n && (n.rendered ? n : n.lastRender);
  return {
    rendered: !1,
    inline: e,
    icon: t,
    lastRender: r
  };
}
function Gr(t = "iconify-icon") {
  let e, n;
  try {
    e = window.customElements, n = window.HTMLElement;
  } catch {
    return;
  }
  if (!e || !n)
    return;
  const r = e.get(t);
  if (r)
    return r;
  const s = [
    // Icon
    "icon",
    // Mode
    "mode",
    "inline",
    "noobserver",
    // Customisations
    "width",
    "height",
    "rotate",
    "flip"
  ], i = class extends n {
    /**
     * Constructor
     */
    constructor() {
      super();
      // Root
      b(this, "_shadowRoot");
      // Initialised
      b(this, "_initialised", !1);
      // Icon state
      b(this, "_state");
      // Attributes check queued
      b(this, "_checkQueued", !1);
      // Connected
      b(this, "_connected", !1);
      // Observer
      b(this, "_observer", null);
      b(this, "_visible", !0);
      const c = this._shadowRoot = this.attachShadow({
        mode: "open"
      }), a = this.hasAttribute("inline");
      De(c, a), this._state = Be({
        value: ""
      }, a), this._queueCheck();
    }
    /**
     * Connected to DOM
     */
    connectedCallback() {
      this._connected = !0, this.startObserver();
    }
    /**
     * Disconnected from DOM
     */
    disconnectedCallback() {
      this._connected = !1, this.stopObserver();
    }
    /**
     * Observed attributes
     */
    static get observedAttributes() {
      return s.slice(0);
    }
    /**
     * Observed properties that are different from attributes
     *
     * Experimental! Need to test with various frameworks that support it
     */
    /*
    static get properties() {
        return {
            inline: {
                type: Boolean,
                reflect: true,
            },
            // Not listing other attributes because they are strings or combination
            // of string and another type. Cannot have multiple types
        };
    }
    */
    /**
     * Attribute has changed
     */
    attributeChangedCallback(c) {
      switch (c) {
        case "inline": {
          const a = this.hasAttribute("inline"), u = this._state;
          a !== u.inline && (u.inline = a, De(this._shadowRoot, a));
          break;
        }
        case "noobserver": {
          this.hasAttribute("noobserver") ? this.startObserver() : this.stopObserver();
          break;
        }
        default:
          this._queueCheck();
      }
    }
    /**
     * Get/set icon
     */
    get icon() {
      const c = this.getAttribute("icon");
      if (c && c.slice(0, 1) === "{")
        try {
          return JSON.parse(c);
        } catch {
        }
      return c;
    }
    set icon(c) {
      typeof c == "object" && (c = JSON.stringify(c)), this.setAttribute("icon", c);
    }
    /**
     * Get/set inline
     */
    get inline() {
      return this.hasAttribute("inline");
    }
    set inline(c) {
      c ? this.setAttribute("inline", "true") : this.removeAttribute("inline");
    }
    /**
     * Get/set observer
     */
    get observer() {
      return this.hasAttribute("observer");
    }
    set observer(c) {
      c ? this.setAttribute("observer", "true") : this.removeAttribute("observer");
    }
    /**
     * Restart animation
     */
    restartAnimation() {
      const c = this._state;
      if (c.rendered) {
        const a = this._shadowRoot;
        if (c.renderedMode === "svg")
          try {
            a.lastChild.setCurrentTime(0);
            return;
          } catch {
          }
        Ue(a, c);
      }
    }
    /**
     * Get status
     */
    get status() {
      const c = this._state;
      return c.rendered ? "rendered" : c.icon.data === null ? "failed" : "loading";
    }
    /**
     * Queue attributes re-check
     */
    _queueCheck() {
      this._checkQueued || (this._checkQueued = !0, setTimeout(() => {
        this._check();
      }));
    }
    /**
     * Check for changes
     */
    _check() {
      if (!this._checkQueued)
        return;
      this._checkQueued = !1;
      const c = this._state, a = this.getAttribute("icon");
      if (a !== c.icon.value) {
        this._iconChanged(a);
        return;
      }
      if (!c.rendered || !this._visible)
        return;
      const u = this.getAttribute("mode"), f = Te(this);
      (c.attrMode !== u || Zn(c.customisations, f) || !le(this._shadowRoot)) && this._renderIcon(c.icon, f, u);
    }
    /**
     * Icon value has changed
     */
    _iconChanged(c) {
      const a = wr(c, (u, f, d) => {
        const h = this._state;
        if (h.rendered || this.getAttribute("icon") !== u)
          return;
        const p = {
          value: u,
          name: f,
          data: d
        };
        p.data ? this._gotIconData(p) : h.icon = p;
      });
      a.data ? this._gotIconData(a) : this._state = Be(a, this._state.inline, this._state);
    }
    /**
     * Force render icon on state change
     */
    _forceRender() {
      if (!this._visible) {
        const c = le(this._shadowRoot);
        c && this._shadowRoot.removeChild(c);
        return;
      }
      this._queueCheck();
    }
    /**
     * Got new icon data, icon is ready to (re)render
     */
    _gotIconData(c) {
      this._checkQueued = !1, this._renderIcon(c, Te(this), this.getAttribute("mode"));
    }
    /**
     * Re-render based on icon data
     */
    _renderIcon(c, a, u) {
      const f = $r(c.data.body, u), d = this._state.inline;
      Ue(this._shadowRoot, this._state = {
        rendered: !0,
        icon: c,
        inline: d,
        customisations: a,
        attrMode: u,
        renderedMode: f
      });
    }
    /**
     * Start observer
     */
    startObserver() {
      if (!this._observer && !this.hasAttribute("noobserver"))
        try {
          this._observer = new IntersectionObserver((c) => {
            const a = c.some((u) => u.isIntersecting);
            a !== this._visible && (this._visible = a, this._forceRender());
          }), this._observer.observe(this);
        } catch {
          if (this._observer) {
            try {
              this._observer.disconnect();
            } catch {
            }
            this._observer = null;
          }
        }
    }
    /**
     * Stop observer
     */
    stopObserver() {
      this._observer && (this._observer.disconnect(), this._observer = null, this._visible = !0, this._connected && this._forceRender());
    }
  };
  s.forEach((l) => {
    l in i.prototype || Object.defineProperty(i.prototype, l, {
      get: function() {
        return this.getAttribute(l);
      },
      set: function(c) {
        c !== null ? this.setAttribute(l, c) : this.removeAttribute(l);
      }
    });
  });
  const o = hn();
  for (const l in o)
    i[l] = i.prototype[l] = o[l];
  return e.define(t, i), i;
}
const Yr = Gr() || hn(), {
  enableCache: xi,
  disableCache: Ei,
  iconLoaded: ki,
  iconExists: Ii,
  // deprecated, kept to avoid breaking changes
  getIcon: Ai,
  listIcons: Ci,
  addIcon: Ti,
  addCollection: Si,
  calculateSize: Oi,
  buildIcon: Ni,
  iconToHTML: Pi,
  svgToURL: Li,
  loadIcons: Ri,
  loadIcon: ji,
  setCustomIconLoader: Fi,
  setCustomIconsLoader: Mi,
  addAPIProvider: Di,
  _api: qi
} = Yr, Jr = "5";
var Je;
typeof window < "u" && ((Je = window.__svelte ?? (window.__svelte = {})).v ?? (Je.v = /* @__PURE__ */ new Set())).add(Jr);
let Vt = !1, Wr = !1;
function Kr() {
  Vt = !0;
}
Kr();
const Xr = 1, Zr = 2, ts = "[", es = "]", ft = {}, ns = "http://www.w3.org/1999/xhtml", Ve = !1, j = 2, vn = 4, _e = 8, me = 16, X = 32, Z = 64, Pt = 128, P = 256, Lt = 512, F = 1024, G = 2048, rt = 4096, Rt = 8192, Qt = 16384, rs = 32768, ss = 65536, is = 1 << 19, gn = 1 << 20, os = Symbol("legacy props");
var ls = Array.isArray, cs = Array.prototype.indexOf, as = Array.from, jt = Object.keys, Ft = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, us = Object.getOwnPropertyDescriptors, fs = Object.getPrototypeOf;
function _n(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
let vt = [], ae = [];
function mn() {
  var t = vt;
  vt = [], _n(t);
}
function ds() {
  var t = ae;
  ae = [], _n(t);
}
function hs(t) {
  vt.length === 0 && queueMicrotask(mn), vt.push(t);
}
function Qe() {
  vt.length > 0 && mn(), ae.length > 0 && ds();
}
function bn(t) {
  return t === this.v;
}
function ps(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function vs(t) {
  return !ps(t, this.v);
}
function gs() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _s() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function ms() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function bs() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function yn(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: bn,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function wn(t, e = !1) {
  var r;
  const n = yn(t);
  return e || (n.equals = vs), Vt && x !== null && x.l !== null && ((r = x.l).s ?? (r.s = [])).push(n), n;
}
function $n(t, e) {
  return g !== null && !R && Jt() && (g.f & (j | me)) !== 0 && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (K === null || !K.includes(t)) && bs(), ys(t, e);
}
function ys(t, e) {
  return t.equals(e) || (t.v, t.v = e, t.wv = On(), xn(t, G), Jt() && _ !== null && (_.f & F) !== 0 && (_.f & (X | Z)) === 0 && (M === null ? Es([t]) : M.push(t))), e;
}
function xn(t, e) {
  var n = t.reactions;
  if (n !== null)
    for (var r = Jt(), s = n.length, i = 0; i < s; i++) {
      var o = n[i], l = o.f;
      (l & G) === 0 && (!r && o === _ || (V(o, e), (l & (F | P)) !== 0 && ((l & j) !== 0 ? xn(
        /** @type {Derived} */
        o,
        rt
      ) : xe(
        /** @type {Effect} */
        o
      ))));
    }
}
// @__NO_SIDE_EFFECTS__
function En(t) {
  var e = j | G, n = g !== null && (g.f & j) !== 0 ? (
    /** @type {Derived} */
    g
  ) : null;
  return _ === null || n !== null && (n.f & P) !== 0 ? e |= P : _.f |= gn, {
    ctx: x,
    deps: null,
    effects: null,
    equals: bn,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: n ?? _
  };
}
function kn(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      Q(
        /** @type {Effect} */
        e[n]
      );
  }
}
function ws(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & j) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function $s(t) {
  var e, n = _;
  B(ws(t));
  try {
    kn(t), e = Pn(t);
  } finally {
    B(n);
  }
  return e;
}
function In(t) {
  var e = $s(t), n = (H || (t.f & P) !== 0) && t.deps !== null ? rt : F;
  V(t, n), t.equals(e) || (t.v = e, t.wv = On());
}
function be(t) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
let y = !1;
function et(t) {
  y = t;
}
let k;
function nt(t) {
  if (t === null)
    throw be(), ft;
  return k = t;
}
function ye() {
  return nt(
    /** @type {TemplateNode} */
    /* @__PURE__ */ bt(k)
  );
}
function O(t) {
  if (y) {
    if (/* @__PURE__ */ bt(k) !== null)
      throw be(), ft;
    k = t;
  }
}
var Ge, An, Cn, Tn;
function ue() {
  if (Ge === void 0) {
    Ge = window, An = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype;
    Cn = ce(e, "firstChild").get, Tn = ce(e, "nextSibling").get, t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function we(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function gt(t) {
  return Cn.call(t);
}
// @__NO_SIDE_EFFECTS__
function bt(t) {
  return Tn.call(t);
}
function N(t, e) {
  if (!y)
    return /* @__PURE__ */ gt(t);
  var n = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ gt(k)
  );
  return n === null && (n = k.appendChild(we())), nt(n), n;
}
function Mt(t, e = 1, n = !1) {
  let r = y ? k : t;
  for (var s; e--; )
    s = r, r = /** @type {TemplateNode} */
    /* @__PURE__ */ bt(r);
  if (!y)
    return r;
  var i = r == null ? void 0 : r.nodeType;
  if (n && i !== 3) {
    var o = we();
    return r === null ? s == null || s.after(o) : r.before(o), nt(o), o;
  }
  return nt(r), /** @type {TemplateNode} */
  r;
}
function xs(t) {
  t.textContent = "";
}
let At = !1, Dt = !1, qt = null, W = !1, dt = [];
let g = null, R = !1;
function U(t) {
  g = t;
}
let _ = null;
function B(t) {
  _ = t;
}
let K = null, E = null, A = 0, M = null;
function Es(t) {
  M = t;
}
let Sn = 1, Ht = 0, H = !1;
function On() {
  return ++Sn;
}
function Gt(t) {
  var f;
  var e = t.f;
  if ((e & G) !== 0)
    return !0;
  if ((e & rt) !== 0) {
    var n = t.deps, r = (e & P) !== 0;
    if (n !== null) {
      var s, i, o = (e & Lt) !== 0, l = r && _ !== null && !H, c = n.length;
      if (o || l) {
        var a = (
          /** @type {Derived} */
          t
        ), u = a.parent;
        for (s = 0; s < c; s++)
          i = n[s], (o || !((f = i == null ? void 0 : i.reactions) != null && f.includes(a))) && (i.reactions ?? (i.reactions = [])).push(a);
        o && (a.f ^= Lt), l && u !== null && (u.f & P) === 0 && (a.f ^= P);
      }
      for (s = 0; s < c; s++)
        if (i = n[s], Gt(
          /** @type {Derived} */
          i
        ) && In(
          /** @type {Derived} */
          i
        ), i.wv > t.wv)
          return !0;
    }
    (!r || _ !== null && !H) && V(t, F);
  }
  return !1;
}
function ks(t, e) {
  for (var n = e; n !== null; ) {
    if ((n.f & Pt) !== 0)
      try {
        n.fn(t);
        return;
      } catch {
        n.f ^= Pt;
      }
    n = n.parent;
  }
  throw At = !1, t;
}
function Is(t) {
  return (t.f & Qt) === 0 && (t.parent === null || (t.parent.f & Pt) === 0);
}
function Yt(t, e, n, r) {
  if (At) {
    if (n === null && (At = !1), Is(e))
      throw t;
    return;
  }
  n !== null && (At = !0);
  {
    ks(t, e);
    return;
  }
}
function Nn(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null)
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & j) !== 0 ? Nn(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (n ? V(i, G) : (i.f & F) !== 0 && V(i, rt), xe(
        /** @type {Effect} */
        i
      ));
    }
}
function Pn(t) {
  var h;
  var e = E, n = A, r = M, s = g, i = H, o = K, l = x, c = R, a = t.f;
  E = /** @type {null | Value[]} */
  null, A = 0, M = null, H = (a & P) !== 0 && (R || !W || g === null), g = (a & (X | Z)) === 0 ? t : null, K = null, Ye(t.ctx), R = !1, Ht++;
  try {
    var u = (
      /** @type {Function} */
      (0, t.fn)()
    ), f = t.deps;
    if (E !== null) {
      var d;
      if (zt(t, A), f !== null && A > 0)
        for (f.length = A + E.length, d = 0; d < E.length; d++)
          f[A + d] = E[d];
      else
        t.deps = f = E;
      if (!H)
        for (d = A; d < f.length; d++)
          ((h = f[d]).reactions ?? (h.reactions = [])).push(t);
    } else f !== null && A < f.length && (zt(t, A), f.length = A);
    if (Jt() && M !== null && !R && f !== null && (t.f & (j | rt | G)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      M.length; d++)
        Nn(
          M[d],
          /** @type {Effect} */
          t
        );
    return s !== null && Ht++, u;
  } finally {
    E = e, A = n, M = r, g = s, H = i, K = o, Ye(l), R = c;
  }
}
function As(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = cs.call(n, t);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = e.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  n === null && (e.f & j) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (E === null || !E.includes(e)) && (V(e, rt), (e.f & (P | Lt)) === 0 && (e.f ^= Lt), kn(
    /** @type {Derived} **/
    e
  ), zt(
    /** @type {Derived} **/
    e,
    0
  ));
}
function zt(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      As(t, n[r]);
}
function $e(t) {
  var e = t.f;
  if ((e & Qt) === 0) {
    V(t, F);
    var n = _, r = x, s = W;
    _ = t, W = !0;
    try {
      (e & me) !== 0 ? qs(t) : Fn(t), jn(t);
      var i = Pn(t);
      t.teardown = typeof i == "function" ? i : null, t.wv = Sn;
      var o = t.deps, l;
      Ve && Wr && t.f & G;
    } catch (c) {
      Yt(c, t, n, r || t.ctx);
    } finally {
      W = s, _ = n;
    }
  }
}
function Cs() {
  try {
    gs();
  } catch (t) {
    if (qt !== null)
      Yt(t, qt, null);
    else
      throw t;
  }
}
function Ln() {
  var t = W;
  try {
    var e = 0;
    for (W = !0; dt.length > 0; ) {
      e++ > 1e3 && Cs();
      var n = dt, r = n.length;
      dt = [];
      for (var s = 0; s < r; s++) {
        var i = Ss(n[s]);
        Ts(i);
      }
    }
  } finally {
    Dt = !1, W = t, qt = null;
  }
}
function Ts(t) {
  var e = t.length;
  if (e !== 0)
    for (var n = 0; n < e; n++) {
      var r = t[n];
      if ((r.f & (Qt | Rt)) === 0)
        try {
          Gt(r) && ($e(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Mn(r) : r.fn = null));
        } catch (s) {
          Yt(s, r, null, r.ctx);
        }
    }
}
function xe(t) {
  Dt || (Dt = !0, queueMicrotask(Ln));
  for (var e = qt = t; e.parent !== null; ) {
    e = e.parent;
    var n = e.f;
    if ((n & (Z | X)) !== 0) {
      if ((n & F) === 0) return;
      e.f ^= F;
    }
  }
  dt.push(e);
}
function Ss(t) {
  for (var e = [], n = t; n !== null; ) {
    var r = n.f, s = (r & (X | Z)) !== 0, i = s && (r & F) !== 0;
    if (!i && (r & Rt) === 0) {
      if ((r & vn) !== 0)
        e.push(n);
      else if (s)
        n.f ^= F;
      else {
        var o = g;
        try {
          g = n, Gt(n) && $e(n);
        } catch (a) {
          Yt(a, n, null, n.ctx);
        } finally {
          g = o;
        }
      }
      var l = n.first;
      if (l !== null) {
        n = l;
        continue;
      }
    }
    var c = n.parent;
    for (n = n.next; n === null && c !== null; )
      n = c.next, c = c.parent;
  }
  return e;
}
function Ee(t) {
  var e;
  for (Qe(); dt.length > 0; )
    Dt = !0, Ln(), Qe();
  return (
    /** @type {T} */
    e
  );
}
function J(t) {
  var e = t.f, n = (e & j) !== 0;
  if (g !== null && !R) {
    K !== null && K.includes(t) && ms();
    var r = g.deps;
    t.rv < Ht && (t.rv = Ht, E === null && r !== null && r[A] === t ? A++ : E === null ? E = [t] : (!H || !E.includes(t)) && E.push(t));
  } else if (n && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var s = (
      /** @type {Derived} */
      t
    ), i = s.parent;
    i !== null && (i.f & P) === 0 && (s.f ^= P);
  }
  return n && (s = /** @type {Derived} */
  t, Gt(s) && In(s)), t.v;
}
function Os(t) {
  var e = R;
  try {
    return R = !0, t();
  } finally {
    R = e;
  }
}
const Ns = -7169;
function V(t, e) {
  t.f = t.f & Ns | e;
}
function Ps(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function st(t, e, n, r = !0) {
  var s = _, i = {
    ctx: x,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | G,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: s,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (n)
    try {
      $e(i), i.f |= rs;
    } catch (c) {
      throw Q(i), c;
    }
  else e !== null && xe(i);
  var o = n && i.deps === null && i.first === null && i.nodes_start === null && i.teardown === null && (i.f & (gn | Pt)) === 0;
  if (!o && r && (s !== null && Ps(i, s), g !== null && (g.f & j) !== 0)) {
    var l = (
      /** @type {Derived} */
      g
    );
    (l.effects ?? (l.effects = [])).push(i);
  }
  return i;
}
function Ls(t) {
  const e = st(Z, t, !0);
  return () => {
    Q(e);
  };
}
function Rs(t) {
  const e = st(Z, t, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? Hs(e, () => {
      Q(e), r(void 0);
    }) : (Q(e), r(void 0));
  });
}
function js(t) {
  return st(vn, t, !1);
}
function Fs(t) {
  return st(_e, t, !0);
}
function Rn(t, e = [], n = En) {
  const r = e.map(n);
  return Ms(() => t(...r.map(J)));
}
function Ms(t, e = 0) {
  return st(_e | me | e, t, !0);
}
function Ds(t, e = !0) {
  return st(_e | X, t, !0, e);
}
function jn(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = g;
    U(null);
    try {
      e.call(null);
    } finally {
      U(n);
    }
  }
}
function Fn(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    var r = n.next;
    (n.f & Z) !== 0 ? n.parent = null : Q(n, e), n = r;
  }
}
function qs(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & X) === 0 && Q(e), e = n;
  }
}
function Q(t, e = !0) {
  var n = !1;
  if ((e || (t.f & is) !== 0) && t.nodes_start !== null) {
    for (var r = t.nodes_start, s = t.nodes_end; r !== null; ) {
      var i = r === s ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ bt(r)
      );
      r.remove(), r = i;
    }
    n = !0;
  }
  Fn(t, e && !n), zt(t, 0), V(t, Qt);
  var o = t.transitions;
  if (o !== null)
    for (const c of o)
      c.stop();
  jn(t);
  var l = t.parent;
  l !== null && l.first !== null && Mn(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Mn(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function Hs(t, e) {
  var n = [];
  Dn(t, n, !0), zs(n, () => {
    Q(t), e && e();
  });
}
function zs(t, e) {
  var n = t.length;
  if (n > 0) {
    var r = () => --n || e();
    for (var s of t)
      s.out(r);
  } else
    e();
}
function Dn(t, e, n) {
  if ((t.f & Rt) === 0) {
    if (t.f ^= Rt, t.transitions !== null)
      for (const o of t.transitions)
        (o.is_global || n) && e.push(o);
    for (var r = t.first; r !== null; ) {
      var s = r.next, i = (r.f & ss) !== 0 || (r.f & X) !== 0;
      Dn(r, e, i ? n : !1), r = s;
    }
  }
}
let x = null;
function Ye(t) {
  x = t;
}
function ke(t, e = !1, n) {
  x = {
    p: x,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  }, Vt && !e && (x.l = {
    s: null,
    u: null,
    r1: [],
    r2: yn(!1)
  });
}
function Ie(t) {
  const e = x;
  if (e !== null) {
    t !== void 0 && (e.x = t);
    const o = e.e;
    if (o !== null) {
      var n = _, r = g;
      e.e = null;
      try {
        for (var s = 0; s < o.length; s++) {
          var i = o[s];
          B(i.effect), U(i.reaction), js(i.fn);
        }
      } finally {
        B(n), U(r);
      }
    }
    x = e.p, e.m = !0;
  }
  return t || /** @type {T} */
  {};
}
function Jt() {
  return !Vt || x !== null && x.l === null;
}
const Us = ["touchstart", "touchmove"];
function Bs(t) {
  return Us.includes(t);
}
const qn = /* @__PURE__ */ new Set(), fe = /* @__PURE__ */ new Set();
function Vs(t) {
  for (var e = 0; e < t.length; e++)
    qn.add(t[e]);
  for (var n of fe)
    n(t);
}
function Et(t) {
  var L;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, s = ((L = t.composedPath) == null ? void 0 : L.call(t)) || [], i = (
    /** @type {null | Element} */
    s[0] || t.target
  ), o = 0, l = t.__root;
  if (l) {
    var c = s.indexOf(l);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var a = s.indexOf(e);
    if (a === -1)
      return;
    c <= a && (o = c);
  }
  if (i = /** @type {Element} */
  s[o] || t.target, i !== e) {
    Ft(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var u = g, f = _;
    U(null), B(null);
    try {
      for (var d, h = []; i !== null; ) {
        var p = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var m = i["__" + r];
          if (m != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === i))
            if (ls(m)) {
              var [w, ...ot] = m;
              w.apply(i, [t, ...ot]);
            } else
              m.call(i, t);
        } catch ($) {
          d ? h.push($) : d = $;
        }
        if (t.cancelBubble || p === e || p === null)
          break;
        i = p;
      }
      if (d) {
        for (let $ of h)
          queueMicrotask(() => {
            throw $;
          });
        throw d;
      }
    } finally {
      t.__root = e, delete t.currentTarget, U(u), B(f);
    }
  }
}
function Qs(t) {
  var e = document.createElement("template");
  return e.innerHTML = t, e.content;
}
function Ct(t, e) {
  var n = (
    /** @type {Effect} */
    _
  );
  n.nodes_start === null && (n.nodes_start = t, n.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function yt(t, e) {
  var n = (e & Xr) !== 0, r = (e & Zr) !== 0, s, i = !t.startsWith("<!>");
  return () => {
    if (y)
      return Ct(k, null), k;
    s === void 0 && (s = Qs(i ? t : "<!>" + t), n || (s = /** @type {Node} */
    /* @__PURE__ */ gt(s)));
    var o = (
      /** @type {TemplateNode} */
      r || An ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ gt(o)
      ), c = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Ct(l, c);
    } else
      Ct(o, o);
    return o;
  };
}
function it(t, e) {
  if (y) {
    _.nodes_end = k, ye();
    return;
  }
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function Hn(t, e) {
  return zn(t, e);
}
function Gs(t, e) {
  ue(), e.intro = e.intro ?? !1;
  const n = e.target, r = y, s = k;
  try {
    for (var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ gt(n)
    ); i && (i.nodeType !== 8 || /** @type {Comment} */
    i.data !== ts); )
      i = /** @type {TemplateNode} */
      /* @__PURE__ */ bt(i);
    if (!i)
      throw ft;
    et(!0), nt(
      /** @type {Comment} */
      i
    ), ye();
    const o = zn(t, { ...e, anchor: i });
    if (k === null || k.nodeType !== 8 || /** @type {Comment} */
    k.data !== es)
      throw be(), ft;
    return et(!1), /**  @type {Exports} */
    o;
  } catch (o) {
    if (o === ft)
      return e.recover === !1 && _s(), ue(), xs(n), et(!1), Hn(t, e);
    throw o;
  } finally {
    et(r), nt(s);
  }
}
const tt = /* @__PURE__ */ new Map();
function zn(t, { target: e, anchor: n, props: r = {}, events: s, context: i, intro: o = !0 }) {
  ue();
  var l = /* @__PURE__ */ new Set(), c = (f) => {
    for (var d = 0; d < f.length; d++) {
      var h = f[d];
      if (!l.has(h)) {
        l.add(h);
        var p = Bs(h);
        e.addEventListener(h, Et, { passive: p });
        var m = tt.get(h);
        m === void 0 ? (document.addEventListener(h, Et, { passive: p }), tt.set(h, 1)) : tt.set(h, m + 1);
      }
    }
  };
  c(as(qn)), fe.add(c);
  var a = void 0, u = Rs(() => {
    var f = n ?? e.appendChild(we());
    return Ds(() => {
      if (i) {
        ke({});
        var d = (
          /** @type {ComponentContext} */
          x
        );
        d.c = i;
      }
      s && (r.$$events = s), y && Ct(
        /** @type {TemplateNode} */
        f,
        null
      ), a = t(f, r) || {}, y && (_.nodes_end = k), i && Ie();
    }), () => {
      var p;
      for (var d of l) {
        e.removeEventListener(d, Et);
        var h = (
          /** @type {number} */
          tt.get(d)
        );
        --h === 0 ? (document.removeEventListener(d, Et), tt.delete(d)) : tt.set(d, h);
      }
      fe.delete(c), f !== n && ((p = f.parentNode) == null || p.removeChild(f));
    };
  });
  return de.set(a, u), a;
}
let de = /* @__PURE__ */ new WeakMap();
function Ys(t, e) {
  const n = de.get(t);
  return n ? (de.delete(t), n(e)) : Promise.resolve();
}
function z(t, e, n, r, s) {
  var l;
  y && ye();
  var i = (l = e.$$slots) == null ? void 0 : l[n], o = !1;
  i === !0 && (i = e[n === "default" ? "children" : n], o = !0), i === void 0 || i(t, o ? () => r : r);
}
function wt(t, e) {
  hs(() => {
    var n = t.getRootNode(), r = (
      /** @type {ShadowRoot} */
      n.host ? (
        /** @type {ShadowRoot} */
        n
      ) : (
        /** @type {Document} */
        n.head ?? /** @type {Document} */
        n.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + e.hash)) {
      const s = document.createElement("style");
      s.id = e.hash, s.textContent = e.code, r.appendChild(s);
    }
  });
}
function Js(t, e, n) {
  var r = "" + t;
  return r;
}
function Ws(t, e) {
  return t == null ? null : String(t);
}
function Ks(t, e, n, r, s, i) {
  var o = t.__className;
  if (y || o !== n) {
    var l = Js(n);
    (!y || l !== t.getAttribute("class")) && (l == null ? t.removeAttribute("class") : t.className = l), t.__className = n;
  }
  return i;
}
function Un(t, e, n, r) {
  var s = t.__style;
  if (y || s !== e) {
    var i = Ws(e);
    (!y || i !== t.getAttribute("style")) && (i == null ? t.removeAttribute("style") : t.style.cssText = i), t.__style = e;
  }
  return r;
}
const Xs = Symbol("is custom element"), Zs = Symbol("is html");
function ti(t, e, n, r) {
  var s = ni(t);
  y && (s[e] = t.getAttribute(e)), s[e] !== (s[e] = n) && (n == null ? t.removeAttribute(e) : typeof n != "string" && Bn(t).includes(e) ? t[e] = n : t.setAttribute(e, n));
}
function ei(t, e, n) {
  var r = g, s = _;
  let i = y;
  y && et(!1), U(null), B(null);
  try {
    // `style` should use `set_attribute` rather than the setter
    e !== "style" && // Don't compute setters for custom elements while they aren't registered yet,
    // because during their upgrade/instantiation they might add more setters.
    // Instead, fall back to a simple "an object, then set as property" heuristic.
    (he.has(t.nodeName) || // customElements may not be available in browser extension contexts
    !customElements || customElements.get(t.tagName.toLowerCase()) ? Bn(t).includes(e) : n && typeof n == "object") ? t[e] = n : ti(t, e, n == null ? n : String(n));
  } finally {
    U(r), B(s), i && et(!0);
  }
}
function ni(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [Xs]: t.nodeName.includes("-"),
      [Zs]: t.namespaceURI === ns
    })
  );
}
var he = /* @__PURE__ */ new Map();
function Bn(t) {
  var e = he.get(t.nodeName);
  if (e) return e;
  he.set(t.nodeName, e = []);
  for (var n, r = t, s = Element.prototype; s !== r; ) {
    n = us(r);
    for (var i in n)
      n[i].set && e.push(i);
    r = fs(r);
  }
  return e;
}
function Vn(t, e, n, r) {
  var s;
  s = /** @type {V} */
  t[e];
  var i = (
    /** @type {V} */
    r
  ), o = !0, l = !1, c = () => (l = !0, o && (o = !1, i = /** @type {V} */
  r), i);
  s === void 0 && r !== void 0 && (s = c());
  var a;
  a = () => {
    var h = (
      /** @type {V} */
      t[e]
    );
    return h === void 0 ? c() : (o = !0, l = !1, h);
  };
  var u = !1, f = /* @__PURE__ */ wn(s), d = /* @__PURE__ */ En(() => {
    var h = a(), p = J(f);
    return u ? (u = !1, p) : f.v = h;
  });
  return function(h, p) {
    if (arguments.length > 0) {
      const m = p ? J(d) : h;
      return d.equals(m) || (u = !0, $n(f, m), l && i !== void 0 && (i = m), Os(() => J(d))), h;
    }
    return J(d);
  };
}
function ri(t) {
  return new si(t);
}
var D, S;
class si {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    Kt(this, D);
    /** @type {Record<string, any>} */
    Kt(this, S);
    var i;
    var n = /* @__PURE__ */ new Map(), r = (o, l) => {
      var c = /* @__PURE__ */ wn(l);
      return n.set(o, c), c;
    };
    const s = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(o, l) {
          return J(n.get(l) ?? r(l, Reflect.get(o, l)));
        },
        has(o, l) {
          return l === os ? !0 : (J(n.get(l) ?? r(l, Reflect.get(o, l))), Reflect.has(o, l));
        },
        set(o, l, c) {
          return $n(n.get(l) ?? r(l, c), c), Reflect.set(o, l, c);
        }
      }
    );
    Xt(this, S, (e.hydrate ? Gs : Hn)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: s,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    })), (!((i = e == null ? void 0 : e.props) != null && i.$$host) || e.sync === !1) && Ee(), Xt(this, D, s.$$events);
    for (const o of Object.keys(I(this, S)))
      o === "$set" || o === "$destroy" || o === "$on" || Ft(this, o, {
        get() {
          return I(this, S)[o];
        },
        /** @param {any} value */
        set(l) {
          I(this, S)[o] = l;
        },
        enumerable: !0
      });
    I(this, S).$set = /** @param {Record<string, any>} next */
    (o) => {
      Object.assign(s, o);
    }, I(this, S).$destroy = () => {
      Ys(I(this, S));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    I(this, S).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, n) {
    I(this, D)[e] = I(this, D)[e] || [];
    const r = (...s) => n.call(this, ...s);
    return I(this, D)[e].push(r), () => {
      I(this, D)[e] = I(this, D)[e].filter(
        /** @param {any} fn */
        (s) => s !== r
      );
    };
  }
  $destroy() {
    I(this, S).$destroy();
  }
}
D = new WeakMap(), S = new WeakMap();
let Qn;
typeof HTMLElement == "function" && (Qn = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(e, n, r) {
    super();
    /** The Svelte component constructor */
    b(this, "$$ctor");
    /** Slots */
    b(this, "$$s");
    /** @type {any} The Svelte component instance */
    b(this, "$$c");
    /** Whether or not the custom element is connected */
    b(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    b(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    b(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    b(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    b(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    b(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    b(this, "$$me");
    this.$$ctor = e, this.$$s = n, r && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, n, r) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(n), this.$$c) {
      const s = this.$$c.$on(e, n);
      this.$$l_u.set(n, s);
    }
    super.addEventListener(e, n, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, n, r) {
    if (super.removeEventListener(e, n, r), this.$$c) {
      const s = this.$$l_u.get(n);
      s && (s(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let n = function(i) {
        return (o) => {
          const l = document.createElement("slot");
          i !== "default" && (l.name = i), it(o, l);
        };
      };
      var e = n;
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const r = {}, s = ii(this);
      for (const i of this.$$s)
        i in s && (i === "default" && !this.$$d.children ? (this.$$d.children = n(i), r.default = !0) : r[i] = n(i));
      for (const i of this.attributes) {
        const o = this.$$g_p(i.name);
        o in this.$$d || (this.$$d[o] = Tt(o, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = ri({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: r,
          $$host: this
        }
      }), this.$$me = Ls(() => {
        Fs(() => {
          var i;
          this.$$r = !0;
          for (const o of jt(this.$$c)) {
            if (!((i = this.$$p_d[o]) != null && i.reflect)) continue;
            this.$$d[o] = this.$$c[o];
            const l = Tt(
              o,
              this.$$d[o],
              this.$$p_d,
              "toAttribute"
            );
            l == null ? this.removeAttribute(this.$$p_d[o].attribute || o) : this.setAttribute(this.$$p_d[o].attribute || o, l);
          }
          this.$$r = !1;
        });
      });
      for (const i in this.$$l)
        for (const o of this.$$l[i]) {
          const l = this.$$c.$on(i, o);
          this.$$l_u.set(o, l);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(e, n, r) {
    var s;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Tt(e, r, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(e) {
    return jt(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === e || !this.$$p_d[n].attribute && n.toLowerCase() === e
    ) || e;
  }
});
function Tt(t, e, n, r) {
  var i;
  const s = (i = n[t]) == null ? void 0 : i.type;
  if (e = s === "Boolean" && typeof e != "boolean" ? e != null : e, !r || !n[t])
    return e;
  if (r === "toAttribute")
    switch (s) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (s) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      // conversion already handled above
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function ii(t) {
  const e = {};
  return t.childNodes.forEach((n) => {
    e[
      /** @type {Element} node */
      n.slot || "default"
    ] = !0;
  }), e;
}
function $t(t, e, n, r, s, i) {
  let o = class extends Qn {
    constructor() {
      super(t, n, s), this.$$p_d = e;
    }
    static get observedAttributes() {
      return jt(e).map(
        (l) => (e[l].attribute || l).toLowerCase()
      );
    }
  };
  return jt(e).forEach((l) => {
    Ft(o.prototype, l, {
      get() {
        return this.$$c && l in this.$$c ? this.$$c[l] : this.$$d[l];
      },
      set(c) {
        var f;
        c = Tt(l, c, e), this.$$d[l] = c;
        var a = this.$$c;
        if (a) {
          var u = (f = ce(a, l)) == null ? void 0 : f.get;
          u ? a[l] = c : a.$set({ [l]: c });
        }
      }
    });
  }), r.forEach((l) => {
    Ft(o.prototype, l, {
      get() {
        var c;
        return (c = this.$$c) == null ? void 0 : c[l];
      }
    });
  }), t.element = /** @type {any} */
  o, o;
}
var oi = /* @__PURE__ */ yt('<main class="svelte-lkl3q8"><!></main>');
const li = {
  hash: "svelte-lkl3q8",
  code: "main.svelte-lkl3q8 {display:flex;flex-direction:column;justify-content:flex-start;width:100vw;height:100vh;background-color:transparent;}"
};
function ci(t, e) {
  wt(t, li);
  var n = oi(), r = N(n);
  z(r, e, "default", {}), O(n), it(t, n);
}
customElements.define("s-main", $t(ci, {}, ["default"], [], !0));
var ai = /* @__PURE__ */ yt("<div><!></div>");
const ui = {
  hash: "svelte-1uisjgr",
  code: ":host {display:flex;flex-direction:row;justify-content:flex-start;align-items:start;padding:1rem;flex-grow:1;border:1px solid red;}"
};
function fi(t, e) {
  wt(t, ui);
  var n = ai(), r = N(n);
  z(r, e, "default", {}), O(n), it(t, n);
}
customElements.define("s-container", $t(fi, {}, ["default"], [], !0));
var di = /* @__PURE__ */ yt('<header class="appbar svelte-1r1upfm"><section class="appbar-section svelte-1r1upfm"><!></section> <section class="appbar-center svelte-1r1upfm"><!></section> <section class="appbar-section svelte-1r1upfm"><!></section></header>');
const hi = {
  hash: "svelte-1r1upfm",
  code: ".appbar.svelte-1r1upfm {display:flex;flex-wrap:wrap;justify-content:space-between;padding-top:0.3rem;padding-bottom:0.3rem;padding-left:1rem;padding-right:1rem;margin:0;background-color:var(--primary);min-height:var(--font-size-h6);}.appbar.svelte-1r1upfm :where(.svelte-1r1upfm) {font-size:var(--font-size-h6);}.appbar-section.svelte-1r1upfm {align-items:center;display:flex;flex:1 0 0;}.appbar-section.svelte-1r1upfm:not(:first-child):last-child {justify-content:flex-end;}.appbar-center.svelte-1r1upfm {align-items:center;display:flex;flex:0 0 auto;}"
};
function pi(t, e) {
  ke(e, !0), wt(t, hi);
  let n = Vn(e, "theme", 7, "primary");
  var r = di(), s = N(r), i = N(s);
  z(i, e, "appbar-left", {}), O(s);
  var o = Mt(s, 2), l = N(o);
  z(l, e, "appbar-center", {}), O(o);
  var c = Mt(o, 2), a = N(c);
  return z(a, e, "appbar-right", {}), O(c), O(r), Rn(() => Un(r, `background-color: var(--${n() ?? ""})`)), it(t, r), Ie({
    get theme() {
      return n();
    },
    set theme(u = "primary") {
      n(u), Ee();
    }
  });
}
customElements.define("s-appbar", $t(
  pi,
  { theme: {} },
  [
    "appbar-left",
    "appbar-center",
    "appbar-right"
  ],
  [],
  !0
));
var vi = /* @__PURE__ */ yt('<header class="appbar svelte-1r1upfm"><section class="appbar-section svelte-1r1upfm"><!></section> <section class="appbar-center svelte-1r1upfm"><!></section> <section class="appbar-section svelte-1r1upfm"><!></section></header>');
const gi = {
  hash: "svelte-1r1upfm",
  code: ".appbar.svelte-1r1upfm {display:flex;flex-wrap:wrap;justify-content:space-between;padding-top:0.3rem;padding-bottom:0.3rem;padding-left:1rem;padding-right:1rem;margin:0;background-color:var(--primary);min-height:var(--font-size-h6);}.appbar.svelte-1r1upfm :where(.svelte-1r1upfm) {font-size:var(--font-size-h6);}.appbar-section.svelte-1r1upfm {align-items:center;display:flex;flex:1 0 0;}.appbar-section.svelte-1r1upfm:not(:first-child):last-child {justify-content:flex-end;}.appbar-center.svelte-1r1upfm {align-items:center;display:flex;flex:0 0 auto;}"
};
function _i(t, e) {
  ke(e, !0), wt(t, gi);
  let n = Vn(e, "theme", 7, "primary");
  var r = vi(), s = N(r), i = N(s);
  z(i, e, "appbar-left", {}), O(s);
  var o = Mt(s, 2), l = N(o);
  z(l, e, "appbar-center", {}), O(o);
  var c = Mt(o, 2), a = N(c);
  return z(a, e, "appbar-right", {}), O(c), O(r), Rn(() => Un(r, `background-color: var(--${n() ?? ""})`)), it(t, r), Ie({
    get theme() {
      return n();
    },
    set theme(u = "primary") {
      n(u), Ee();
    }
  });
}
customElements.define("s-appfooter", $t(
  _i,
  { theme: {} },
  [
    "appbar-left",
    "appbar-center",
    "appbar-right"
  ],
  [],
  !0
));
function mi() {
  const t = window.document.body.classList.contains("light");
  window.document.body.classList.contains("dark");
  const e = window.document.body;
  t ? e.classList.replace("light", "dark") : e.classList.replace("dark", "light");
}
var bi = /* @__PURE__ */ yt('<button class="btn-circle btn-action svelte-9g0m1g"><iconify-icon></iconify-icon></button>', 2);
const yi = {
  hash: "svelte-9g0m1g",
  code: ".btn-circle.svelte-9g0m1g {appearance:none;background:transparent;border:0.05rem solid #747475;cursor:pointer;display:flex;justify-content:center;align-items:center;width:var(--font-size-h4);height:var(--font-size-h4);border-radius:50%;text-decoration:none;user-select:none;vertical-align:middle;white-space:nowrap;}.btn-circle.svelte-9g0m1g:hover {border-color:light-dark(yellow, red);text-decoration:none;}.dark-light.svelte-9g0m1g{font-size:var(--font-size-h5);color:light-dark(red, yellow);}"
};
function wi(t) {
  wt(t, yi);
  let e = "tabler:sun-moon";
  var n = bi();
  n.__click = [mi];
  var r = N(n);
  ei(r, "icon", e), Ks(r, 1, "dark-light svelte-9g0m1g"), O(n), it(t, n);
}
Vs(["click"]);
customElements.define("s-dark-btn", $t(wi, {}, [], [], !0));
