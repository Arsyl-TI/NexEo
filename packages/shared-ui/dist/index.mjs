import { defineComponent as c, openBlock as n, createElementBlock as s, createVNode as i, TransitionGroup as _, withCtx as p, Fragment as l, renderList as m, normalizeClass as d, toDisplayString as u } from "vue";
const f = { class: "toast-container" }, v = /* @__PURE__ */ c({
  __name: "ToastContainer",
  props: {
    toasts: {}
  },
  setup(e) {
    return (a, o) => (n(), s("div", f, [
      i(_, { name: "toast" }, {
        default: p(() => [
          (n(!0), s(l, null, m(e.toasts, (t) => (n(), s("div", {
            key: t.id,
            class: d(["toast-item", `toast-${t.type}`])
          }, u(t.message), 3))), 128))
        ]),
        _: 1
      })
    ]));
  }
}), C = (e, a) => {
  const o = e.__vccOpts || e;
  for (const [t, r] of a)
    o[t] = r;
  return o;
}, k = /* @__PURE__ */ C(v, [["__scopeId", "data-v-97f3e92f"]]);
export {
  k as ToastContainer
};
