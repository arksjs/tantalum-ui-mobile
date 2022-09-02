var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/.pnpm/safe-area-insets@1.4.1/node_modules/safe-area-insets/out/index.js
var require_out = __commonJS({
  "node_modules/.pnpm/safe-area-insets@1.4.1/node_modules/safe-area-insets/out/index.js"(exports, module) {
    "use strict";
    var attrs = ["top", "left", "right", "bottom"];
    var inited;
    var elementComputedStyle = {};
    var support;
    function getSupport() {
      if (!("CSS" in window) || typeof CSS.supports != "function") {
        support = "";
      } else if (CSS.supports("top: env(safe-area-inset-top)")) {
        support = "env";
      } else if (CSS.supports("top: constant(safe-area-inset-top)")) {
        support = "constant";
      } else {
        support = "";
      }
      return support;
    }
    function init() {
      support = typeof support === "string" ? support : getSupport();
      if (!support) {
        attrs.forEach(function(attr) {
          elementComputedStyle[attr] = 0;
        });
        return;
      }
      function setStyle(el, style) {
        var elStyle = el.style;
        Object.keys(style).forEach(function(key) {
          var val = style[key];
          elStyle[key] = val;
        });
      }
      var cbs = [];
      function parentReady(callback) {
        if (callback) {
          cbs.push(callback);
        } else {
          cbs.forEach(function(cb) {
            cb();
          });
        }
      }
      var passiveEvents = false;
      try {
        var opts = Object.defineProperty({}, "passive", {
          get: function() {
            passiveEvents = { passive: true };
          }
        });
        window.addEventListener("test", null, opts);
      } catch (e) {
      }
      function addChild(parent, attr) {
        var a1 = document.createElement("div");
        var a2 = document.createElement("div");
        var a1Children = document.createElement("div");
        var a2Children = document.createElement("div");
        var W = 100;
        var MAX = 1e4;
        var aStyle = {
          position: "absolute",
          width: W + "px",
          height: "200px",
          boxSizing: "border-box",
          overflow: "hidden",
          paddingBottom: support + "(safe-area-inset-" + attr + ")"
        };
        setStyle(a1, aStyle);
        setStyle(a2, aStyle);
        setStyle(a1Children, {
          transition: "0s",
          animation: "none",
          width: "400px",
          height: "400px"
        });
        setStyle(a2Children, {
          transition: "0s",
          animation: "none",
          width: "250%",
          height: "250%"
        });
        a1.appendChild(a1Children);
        a2.appendChild(a2Children);
        parent.appendChild(a1);
        parent.appendChild(a2);
        parentReady(function() {
          a1.scrollTop = a2.scrollTop = MAX;
          var a1LastScrollTop = a1.scrollTop;
          var a2LastScrollTop = a2.scrollTop;
          function onScroll() {
            if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) {
              return;
            }
            a1.scrollTop = a2.scrollTop = MAX;
            a1LastScrollTop = a1.scrollTop;
            a2LastScrollTop = a2.scrollTop;
            attrChange(attr);
          }
          a1.addEventListener("scroll", onScroll, passiveEvents);
          a2.addEventListener("scroll", onScroll, passiveEvents);
        });
        var computedStyle = getComputedStyle(a1);
        Object.defineProperty(elementComputedStyle, attr, {
          configurable: true,
          get: function() {
            return parseFloat(computedStyle.paddingBottom);
          }
        });
      }
      var parentDiv = document.createElement("div");
      setStyle(parentDiv, {
        position: "absolute",
        left: "0",
        top: "0",
        width: "0",
        height: "0",
        zIndex: "-1",
        overflow: "hidden",
        visibility: "hidden"
      });
      attrs.forEach(function(key) {
        addChild(parentDiv, key);
      });
      document.body.appendChild(parentDiv);
      parentReady();
      inited = true;
    }
    function getAttr(attr) {
      if (!inited) {
        init();
      }
      return elementComputedStyle[attr];
    }
    var changeAttrs = [];
    function attrChange(attr) {
      if (!changeAttrs.length) {
        setTimeout(function() {
          var style = {};
          changeAttrs.forEach(function(attr2) {
            style[attr2] = elementComputedStyle[attr2];
          });
          changeAttrs.length = 0;
          callbacks.forEach(function(callback) {
            callback(style);
          });
        }, 0);
      }
      changeAttrs.push(attr);
    }
    var callbacks = [];
    function onChange(callback) {
      if (!getSupport()) {
        return;
      }
      if (!inited) {
        init();
      }
      if (typeof callback === "function") {
        callbacks.push(callback);
      }
    }
    function offChange(callback) {
      var index = callbacks.indexOf(callback);
      if (index >= 0) {
        callbacks.splice(index, 1);
      }
    }
    var safeAreaInsets2 = {
      get support() {
        return (typeof support === "string" ? support : getSupport()).length != 0;
      },
      get top() {
        return getAttr("top");
      },
      get left() {
        return getAttr("left");
      },
      get right() {
        return getAttr("right");
      },
      get bottom() {
        return getAttr("bottom");
      },
      onChange,
      offChange
    };
    module.exports = safeAreaInsets2;
  }
});

// node_modules/.pnpm/dayjs@1.10.8/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/.pnpm/dayjs@1.10.8/node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h3 = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, g = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h3 }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return t2 === void 0;
      } }, D = "en", v = {};
      v[D] = M;
      var p = function(t2) {
        return t2 instanceof _;
      }, S = function(t2, e2, n2) {
        var r2;
        if (!t2)
          return D;
        if (typeof t2 == "string")
          v[t2] && (r2 = t2), e2 && (v[t2] = e2, r2 = t2);
        else {
          var i2 = t2.name;
          v[i2] = t2, r2 = i2;
        }
        return !n2 && r2 && (D = r2), r2 || !n2 && D;
      }, w = function(t2, e2) {
        if (p(t2))
          return t2.clone();
        var n2 = typeof e2 == "object" ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, O = g;
      O.l = S, O.i = p, O.w = function(t2, e2) {
        return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (e2 === null)
              return new Date(NaN);
            if (O.u(e2))
              return new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if (typeof e2 == "string" && !/Z$/i.test(e2)) {
              var r2 = e2.match(l);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === $);
        }, m2.isSame = function(t2, e2) {
          var n2 = w(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return w(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < w(t2);
        }, m2.$g = function(t2, e2, n2) {
          return O.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!O.u(e2) || e2, h4 = O.p(t2), $2 = function(t3, e3) {
            var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, l2 = function(t3, e3) {
            return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
          switch (h4) {
            case c:
              return r2 ? $2(1, 0) : $2(31, 11);
            case f:
              return r2 ? $2(1, M3) : $2(0, M3 + 1);
            case o:
              var D2 = this.$locale().weekStart || 0, v2 = (y2 < D2 ? y2 + 7 : y2) - D2;
              return $2(r2 ? m3 - v2 : m3 + (6 - v2), M3);
            case a:
            case d:
              return l2(g2 + "Hours", 0);
            case u:
              return l2(g2 + "Minutes", 1);
            case s:
              return l2(g2 + "Seconds", 2);
            case i:
              return l2(g2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = O.p(t2), h4 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h4 + "Date", n2[d] = h4 + "Date", n2[f] = h4 + "Month", n2[c] = h4 + "FullYear", n2[u] = h4 + "Hours", n2[s] = h4 + "Minutes", n2[i] = h4 + "Seconds", n2[r] = h4 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === f || o2 === c) {
            var y2 = this.clone().set(d, 1);
            y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            $2 && this.$d[$2](l2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, h4) {
          var d2, $2 = this;
          r2 = Number(r2);
          var l2 = O.p(h4), y2 = function(t2) {
            var e2 = w($2);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), $2);
          };
          if (l2 === f)
            return this.set(f, this.$M + r2);
          if (l2 === c)
            return this.set(c, this.$y + r2);
          if (l2 === a)
            return y2(1);
          if (l2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || $;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h4 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].substr(0, s3);
          }, c2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, d2 = n2.meridiem || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h4(n2.monthsShort, a2, f2, 3), MMMM: h4(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h4(n2.weekdaysMin, this.$W, o2, 2), ddd: h4(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
          return r2.replace(y, function(t3, e3) {
            return e3 || l2[t3] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, $2) {
          var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, D2 = O.m(this, M3);
          return D2 = (l2 = {}, l2[c] = D2 / 12, l2[f] = D2, l2[h3] = D2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? D2 : O.a(D2);
        }, m2.daysInMonth = function() {
          return this.endOf(f).$D;
        }, m2.$locale = function() {
          return v[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = S(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), b = _.prototype;
      return w.prototype = b, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
        b[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = v[D], w.Ls = v, w.p = {}, w;
    });
  }
});

// node_modules/.pnpm/dayjs@1.10.8/node_modules/dayjs/plugin/toArray.js
var require_toArray = __commonJS({
  "node_modules/.pnpm/dayjs@1.10.8/node_modules/dayjs/plugin/toArray.js"(exports, module) {
    !function(t, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_toArray = e();
    }(exports, function() {
      "use strict";
      return function(t, e) {
        e.prototype.toArray = function() {
          return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
        };
      };
    });
  }
});

// node_modules/.pnpm/dayjs@1.10.8/node_modules/dayjs/plugin/customParseFormat.js
var require_customParseFormat = __commonJS({
  "node_modules/.pnpm/dayjs@1.10.8/node_modules/dayjs/plugin/customParseFormat.js"(exports, module) {
    !function(t, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_customParseFormat = e();
    }(exports, function() {
      "use strict";
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, e = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d\d/, r = /\d\d?/, i = /\d*[^\s\d-_:/()]+/, o = {}, s = function(t2) {
        return (t2 = +t2) + (t2 > 68 ? 1900 : 2e3);
      };
      var a = function(t2) {
        return function(e2) {
          this[t2] = +e2;
        };
      }, f = [/[+-]\d\d:?(\d\d)?|Z/, function(t2) {
        (this.zone || (this.zone = {})).offset = function(t3) {
          if (!t3)
            return 0;
          if (t3 === "Z")
            return 0;
          var e2 = t3.match(/([+-]|\d\d)/g), n2 = 60 * e2[1] + (+e2[2] || 0);
          return n2 === 0 ? 0 : e2[0] === "+" ? -n2 : n2;
        }(t2);
      }], u = function(t2) {
        var e2 = o[t2];
        return e2 && (e2.indexOf ? e2 : e2.s.concat(e2.f));
      }, h3 = function(t2, e2) {
        var n2, r2 = o.meridiem;
        if (r2) {
          for (var i2 = 1; i2 <= 24; i2 += 1)
            if (t2.indexOf(r2(i2, 0, e2)) > -1) {
              n2 = i2 > 12;
              break;
            }
        } else
          n2 = t2 === (e2 ? "pm" : "PM");
        return n2;
      }, d = { A: [i, function(t2) {
        this.afternoon = h3(t2, false);
      }], a: [i, function(t2) {
        this.afternoon = h3(t2, true);
      }], S: [/\d/, function(t2) {
        this.milliseconds = 100 * +t2;
      }], SS: [n, function(t2) {
        this.milliseconds = 10 * +t2;
      }], SSS: [/\d{3}/, function(t2) {
        this.milliseconds = +t2;
      }], s: [r, a("seconds")], ss: [r, a("seconds")], m: [r, a("minutes")], mm: [r, a("minutes")], H: [r, a("hours")], h: [r, a("hours")], HH: [r, a("hours")], hh: [r, a("hours")], D: [r, a("day")], DD: [n, a("day")], Do: [i, function(t2) {
        var e2 = o.ordinal, n2 = t2.match(/\d+/);
        if (this.day = n2[0], e2)
          for (var r2 = 1; r2 <= 31; r2 += 1)
            e2(r2).replace(/\[|\]/g, "") === t2 && (this.day = r2);
      }], M: [r, a("month")], MM: [n, a("month")], MMM: [i, function(t2) {
        var e2 = u("months"), n2 = (u("monthsShort") || e2.map(function(t3) {
          return t3.substr(0, 3);
        })).indexOf(t2) + 1;
        if (n2 < 1)
          throw new Error();
        this.month = n2 % 12 || n2;
      }], MMMM: [i, function(t2) {
        var e2 = u("months").indexOf(t2) + 1;
        if (e2 < 1)
          throw new Error();
        this.month = e2 % 12 || e2;
      }], Y: [/[+-]?\d+/, a("year")], YY: [n, function(t2) {
        this.year = s(t2);
      }], YYYY: [/\d{4}/, a("year")], Z: f, ZZ: f };
      function c(n2) {
        var r2, i2;
        r2 = n2, i2 = o && o.formats;
        for (var s2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(e2, n3, r3) {
          var o2 = r3 && r3.toUpperCase();
          return n3 || i2[r3] || t[r3] || i2[o2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(t2, e3, n4) {
            return e3 || n4.slice(1);
          });
        })).match(e), a2 = s2.length, f2 = 0; f2 < a2; f2 += 1) {
          var u2 = s2[f2], h4 = d[u2], c2 = h4 && h4[0], l = h4 && h4[1];
          s2[f2] = l ? { regex: c2, parser: l } : u2.replace(/^\[|\]$/g, "");
        }
        return function(t2) {
          for (var e2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
            var i3 = s2[n3];
            if (typeof i3 == "string")
              r3 += i3.length;
            else {
              var o2 = i3.regex, f3 = i3.parser, u3 = t2.substr(r3), h5 = o2.exec(u3)[0];
              f3.call(e2, h5), t2 = t2.replace(h5, "");
            }
          }
          return function(t3) {
            var e3 = t3.afternoon;
            if (e3 !== void 0) {
              var n4 = t3.hours;
              e3 ? n4 < 12 && (t3.hours += 12) : n4 === 12 && (t3.hours = 0), delete t3.afternoon;
            }
          }(e2), e2;
        };
      }
      return function(t2, e2, n2) {
        n2.p.customParseFormat = true, t2 && t2.parseTwoDigitYear && (s = t2.parseTwoDigitYear);
        var r2 = e2.prototype, i2 = r2.parse;
        r2.parse = function(t3) {
          var e3 = t3.date, r3 = t3.utc, s2 = t3.args;
          this.$u = r3;
          var a2 = s2[1];
          if (typeof a2 == "string") {
            var f2 = s2[2] === true, u2 = s2[3] === true, h4 = f2 || u2, d2 = s2[2];
            u2 && (d2 = s2[2]), o = this.$locale(), !f2 && d2 && (o = n2.Ls[d2]), this.$d = function(t4, e4, n3) {
              try {
                if (["x", "X"].indexOf(e4) > -1)
                  return new Date((e4 === "X" ? 1e3 : 1) * t4);
                var r4 = c(e4)(t4), i3 = r4.year, o2 = r4.month, s3 = r4.day, a3 = r4.hours, f3 = r4.minutes, u3 = r4.seconds, h5 = r4.milliseconds, d3 = r4.zone, l2 = new Date(), m2 = s3 || (i3 || o2 ? 1 : l2.getDate()), M2 = i3 || l2.getFullYear(), Y = 0;
                i3 && !o2 || (Y = o2 > 0 ? o2 - 1 : l2.getMonth());
                var p = a3 || 0, v = f3 || 0, D = u3 || 0, g = h5 || 0;
                return d3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g + 60 * d3.offset * 1e3)) : n3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g)) : new Date(M2, Y, m2, p, v, D, g);
              } catch (t5) {
                return new Date("");
              }
            }(e3, a2, r3), this.init(), d2 && d2 !== true && (this.$L = this.locale(d2).$L), h4 && e3 != this.format(a2) && (this.$d = new Date("")), o = {};
          } else if (a2 instanceof Array)
            for (var l = a2.length, m = 1; m <= l; m += 1) {
              s2[1] = a2[m - 1];
              var M = n2.apply(this, s2);
              if (M.isValid()) {
                this.$d = M.$d, this.$L = M.$L, this.init();
                break;
              }
              m === l && (this.$d = new Date(""));
            }
          else
            i2.call(this, t3);
        };
      };
    });
  }
});

// packages/ui/src/components/install.ts
var install_exports = {};
__export(install_exports, {
  ActionSheet: () => install5,
  ActivityIndicator: () => install7,
  Avatar: () => install10,
  AvatarGroup: () => install11,
  BackTop: () => install12,
  Badge: () => install8,
  Button: () => install2,
  ButtonGroup: () => install13,
  Calendar: () => install17,
  CalendarPopup: () => install18,
  CalendarView: () => install19,
  Cascader: () => install22,
  CascaderPopup: () => install23,
  CascaderView: () => install24,
  Cell: () => install25,
  Checkbox: () => install26,
  CheckboxGroup: () => install27,
  CircleProgress: () => install28,
  Col: () => install29,
  Collapse: () => install30,
  CollapseItem: () => install31,
  ConfigProvider: () => install32,
  Copy: () => install33,
  CountDown: () => install34,
  CountUp: () => install35,
  DatePicker: () => install37,
  DatePickerPopup: () => install38,
  DatePickerView: () => install39,
  Dialog: () => install41,
  Divider: () => install42,
  Drawer: () => install4,
  Dropdown: () => install43,
  Empty: () => install21,
  Fixed: () => install44,
  FlatList: () => install47,
  Form: () => install48,
  FormFooter: () => install49,
  FormItem: () => install50,
  Group: () => install51,
  Icon: () => install,
  Image: () => install9,
  ImagePreview: () => install53,
  ImageUploader: () => install55,
  IndexView: () => install58,
  IndexViewItem: () => install59,
  Input: () => install60,
  LoadMore: () => install45,
  LoadingIcon: () => install6,
  Modal: () => install40,
  NavBar: () => install3,
  NoticeBar: () => install61,
  Notify: () => install62,
  NumberKeyboard: () => install63,
  Order: () => install54,
  Pagination: () => install64,
  Picker: () => install36,
  PickerPopup: () => install65,
  PickerView: () => install66,
  PopDialog: () => install68,
  PopMenu: () => install69,
  Popover: () => install67,
  Price: () => install70,
  Progress: () => install71,
  Radio: () => install72,
  RadioGroup: () => install73,
  Range: () => install74,
  Rate: () => install75,
  Result: () => install76,
  Row: () => install77,
  ScrollTab: () => install79,
  ScrollTabItem: () => install80,
  ScrollView: () => install46,
  SearchBar: () => install82,
  SelectorField: () => install14,
  SideTab: () => install78,
  Skeleton: () => install83,
  SkeletonAvatar: () => install84,
  SkeletonButton: () => install85,
  SkeletonImage: () => install86,
  SkeletonParagraph: () => install87,
  SkeletonTitle: () => install88,
  Slider: () => install89,
  Step: () => install91,
  Stepper: () => install92,
  Steps: () => install90,
  Sticky: () => install56,
  StickyView: () => install57,
  StickyViewItem: () => install93,
  Stopwatch: () => install94,
  SwipeCell: () => install95,
  Swiper: () => install52,
  SwiperItem: () => install96,
  Switch: () => install97,
  Tab: () => install20,
  TabBar: () => install98,
  TabView: () => install99,
  TabViewItem: () => install100,
  Tag: () => install81,
  TimeAgo: () => install101,
  Timeline: () => install102,
  TimelineItem: () => install103,
  Toast: () => install15,
  VirtualList: () => install16
});

// packages/ui/src/helpers/util.ts
function kebabCase2CamelCase(name) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
  return name.substring(0, 1).toLowerCase() + name.substring(1);
}
function camelCase2KebabCase(name) {
  const arr = [];
  for (let i = 0; i < name.length; i++) {
    let letter = name[i];
    if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
      letter = letter.toLowerCase();
      if (i !== 0) {
        arr.push("-");
      }
    }
    arr.push(letter);
  }
  return arr.join("");
}
function isString(object) {
  return typeof object === "string";
}
function isBoolean(object) {
  return typeof object === "boolean";
}
function isObject(object) {
  return typeof object === "object" && object !== null;
}
function isNumber(object) {
  return typeof object === "number" && isFinite(object);
}
function isNumeric(object) {
  return isNumber(object) || typeof object === "string" && isNumber(parseFloat(object));
}
function isInteger(object) {
  return isNumber(object) && object % 1 === 0;
}
function isEmptyObject(object) {
  return typeof object === "object" && JSON.stringify(object) === "{}";
}
function isStringNumberMix(object) {
  return typeof object === "string" || typeof object === "number";
}
var createArrayValidator = (itemValidator) => {
  const validator = (object) => {
    let is = false;
    if (Array.isArray(object)) {
      is = true;
      for (let i = 0; i < object.length; i++) {
        if (!itemValidator(object[i])) {
          is = false;
          break;
        }
      }
    }
    return is;
  };
  return validator;
};
var isNumberArray = createArrayValidator((object) => typeof object === "number");
var isStringArray = createArrayValidator((object) => typeof object === "string");
var stringMix2StringArray = (object) => {
  return isStringArray(object) ? object : typeof object === "string" ? [object] : [];
};
var isStringNumberMixArray = createArrayValidator((object) => isStringNumberMix(object));
var isDateArray = createArrayValidator((object) => object instanceof Date);
function isSameArray(a, b) {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] instanceof Date && b[i] instanceof Date) {
        if (!isSameDate(a[i], b[i])) {
          return false;
        }
      } else {
        if (a[i] != b[i]) {
          return false;
        }
      }
    }
  } else {
    return false;
  }
  return true;
}
function isSameDate(a, b) {
  return a.getTime() === b.getTime();
}
var isEmpty = (object) => {
  return object == null || object === "" || object === "0" || object === false || typeof object === "number" && (object == 0 || isNaN(object)) || Array.isArray(object) && object.length === 0 || isEmptyObject(object);
};
var noop = function() {
};
function returnTrue() {
  return true;
}
function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
function objectForEach(object, callback) {
  if (isObject(object)) {
    const obj = object;
    for (const k in obj) {
      if (hasOwnProperty(obj, k)) {
        callback(obj[k], k);
      }
    }
  }
}
function cloneData(object) {
  return JSON.parse(JSON.stringify(object));
}
function capitalize(value) {
  if (!value)
    return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}
var getNumber = (num, defaultNum = 0) => {
  return num == null ? defaultNum : typeof num === "string" ? parseFloat(num) : num;
};
function rangeNumber(number, min, max) {
  return Math.min(max, Math.max(min, number));
}
function rangeInteger(number, min, max) {
  const num = getNumber(number, min);
  return rangeNumber(Math.round(num), Math.ceil(min), Math.floor(max));
}
var isInNumberRange = (number, min, max) => {
  return isNumber(number) && number >= min && number <= max;
};
var isPromiseLike = (object) => {
  return (isObject(object) || typeof object === "function") && typeof object.then === "function";
};
var isURL = (object) => {
  return typeof object === "string" && /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?(@?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(object);
};

// packages/ui/src/helpers/with-install.ts
var withInstall = function(component) {
  const _component = Object.assign(component, {
    install(app) {
      app.component(component.name, component);
    }
  });
  return _component;
};
var multiWithInstall = function(component, moreComponents) {
  const _component = Object.assign(component, {
    install(app) {
      app.component(component.name, component);
      moreComponents.forEach((moreComponent) => {
        app.component(moreComponent.name, moreComponent);
      });
    }
  });
  return _component;
};
var withNoopInstall = function(component) {
  const _component = Object.assign(component, {
    install: noop
  });
  return _component;
};

// vue:./ActionSheet.vue
import { computed as computed7, defineComponent as defineComponent7 } from "vue";

// vue:./Drawer.vue
import { defineComponent as defineComponent6, computed as computed6, toRef, watch as watch3 } from "vue";

// vue:./NavBar.vue
import { defineComponent as defineComponent5, ref as ref3 } from "vue";

// vue:./Button.vue
import { defineComponent as defineComponent3, computed as computed2 } from "vue";

// vue:./Icon.vue
import { computed, defineComponent as defineComponent2 } from "vue";

// vue:./SpriteSVG.vue
import { defineComponent } from "vue";
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
var _sfc_script = defineComponent({
  name: "ak-sprite-icon",
  props: {
    iconName: {
      type: String
    }
  }
});
var _hoisted_1 = ["xlink:href"];
function render(_ctx, _cache) {
  return _openBlock(), _createElementBlock("svg", null, [
    _createElementVNode("use", {
      "xlink:href": "#" + _ctx.iconName
    }, null, 8, _hoisted_1)
  ]);
}
_sfc_script.render = render;
_sfc_script.__file = "packages/ui/src/Icon/SpriteSVG.vue";

// packages/ui/src/helpers/dom.ts
function addClassName($el, className) {
  $el.classList.add(className);
}
function removeClassName($el, className) {
  $el.classList.remove(className);
}
function hasClassName($el, className) {
  return [].slice.call($el.classList, 0).includes(className);
}
function getViewPosition(viewPosition) {
  var _a;
  const viewPositionMap = /* @__PURE__ */ new Map([
    ["start", 0],
    ["center", 0.5],
    ["end", 1],
    [0, 0],
    [0.5, 0.5],
    [1, 1]
  ]);
  return (_a = viewPositionMap.get(viewPosition != null ? viewPosition : 0)) != null ? _a : 0;
}
function getRelativeOffset($el, $relativeEl = document, viewPosition = 0) {
  if ($el === document) {
    return { offsetTop: 0, offsetLeft: 0 };
  }
  $el = $el;
  $relativeEl = $relativeEl === document ? document.documentElement : $relativeEl;
  let offsetTop = $el.offsetTop;
  let offsetLeft = $el.offsetLeft;
  const transform = window.getComputedStyle($el).transform;
  if (transform && transform !== "none") {
    const transformMatrix = transform.slice(7, transform.length - 1).split(", ");
    offsetLeft += parseFloat(transformMatrix[4]);
    offsetTop += parseFloat(transformMatrix[5]);
  }
  if ($el.offsetParent && $el.offsetParent !== $relativeEl) {
    const parent = getRelativeOffset($el.offsetParent, $relativeEl);
    offsetTop += parent.offsetTop;
    offsetLeft += parent.offsetLeft;
  }
  const viewPosition2 = getViewPosition(viewPosition);
  if (viewPosition2) {
    if (viewPosition2 === 1) {
      offsetTop -= $relativeEl.clientHeight - $el.clientHeight;
      offsetLeft -= $relativeEl.clientWidth - $el.clientWidth;
    } else {
      offsetTop -= $relativeEl.clientHeight / 2 - $el.clientHeight / 2;
      offsetLeft -= $relativeEl.clientWidth / 2 - $el.clientWidth / 2;
    }
  }
  return { offsetTop, offsetLeft };
}
function getSizeValue(size, defaultValue = 0) {
  if (isNumber(size)) {
    return size;
  } else if (typeof size === "string") {
    const matches = size.match(/^([\d.]+)((px)|(vw)|(vh)|)$/);
    if (matches) {
      let sizeNum = parseFloat(matches[1]);
      if (matches[2] === "vw") {
        sizeNum *= document.documentElement.clientWidth / 100;
      } else if (matches[2] === "vh") {
        sizeNum *= document.documentElement.clientHeight / 100;
      }
      return sizeNum;
    }
  }
  return defaultValue;
}
function querySelector(selector) {
  let $el = null;
  if (selector instanceof HTMLElement) {
    $el = selector;
  } else if (typeof selector === "string" && selector.trim() !== "") {
    $el = document.querySelector(selector);
  } else if (selector === document) {
    $el = document.documentElement;
  }
  return $el != null ? $el : null;
}
function isPage($el) {
  return $el === document || $el === document.documentElement || $el === document.body || $el instanceof Window;
}
function getScrollTop($el = document) {
  return isPage($el) ? window.pageYOffset : $el.scrollTop;
}
function scrollTo($el, scrollNumber, animated = true) {
  const options = Object.assign({
    behavior: animated ? "smooth" : "auto"
  }, typeof scrollNumber === "number" ? {
    top: scrollNumber,
    left: 0
  } : scrollNumber);
  if (isPage($el)) {
    window.scrollTo(options);
  } else {
    $el.scrollTo(options);
  }
}
function CSSProperties2CssText(object) {
  const arr = [];
  objectForEach(object, (v, k) => {
    const key = camelCase2KebabCase(k);
    arr.push(`${key.indexOf("webkit") === 0 ? `--${key}` : key}: ${v}`);
  });
  return arr.join("; ");
}
function getParentTarget($el, className) {
  while ($el) {
    if (hasClassName($el, className)) {
      return $el;
    }
    $el = $el.parentElement;
  }
  return null;
}

// node_modules/.pnpm/colorfuls@1.0.2/node_modules/colorfuls/lib/index.esm.js
function number2Percentage(number) {
  return (number * 100).toFixed(0) + "%";
}
function isNumeric2(object) {
  return typeof object === "number" && isFinite(object) || typeof object === "string" && !isNaN(parseFloat(object)) && isFinite(parseFloat(object));
}
function isPercentage(object) {
  return typeof object === "string" && /^([\d.]+)%$/.test(object);
}
function isLimitPercentage(object, min = 0, max = 100) {
  if (isPercentage(object)) {
    const value = parseFloat(object);
    return value >= min && value <= max;
  }
  return false;
}
function decimal2Hex(num, width) {
  num = Math.round(num * 255);
  const hex = "0123456789abcdef";
  let s = "";
  while (num) {
    s = hex.charAt(num % 16) + s;
    num = Math.floor(num / 16);
  }
  if (typeof width === "undefined" || width <= s.length) {
    return s.toUpperCase();
  }
  let delta = width - s.length;
  let padding2 = "";
  while (delta-- > 0) {
    padding2 += "0";
  }
  return (padding2 + s).toUpperCase();
}
function numberRange(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}
function percentage2Length(value) {
  if (isPercentage(value)) {
    return parseFloat(value) / 100;
  }
  return parseFloat(value);
}
function rgb2Gray(r, g, b) {
  return r * 38 + g * 75 + b * 15 >> 7;
}
var hexRegex = /^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3});?$/i;
var rgbRegex = /^rgb[a]?[(][\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,[\s]*(100%|[0-9]{1,2}%|2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
var hslRegex = /^hsl[a]?[(][\s]*(360|3[0-5][0-9]|[012]?[0-9][0-9]?)(deg)*[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,[\s]*(100%|[0-9]{1,2}%)[\s]*,?[\s]*(0?\.\d{1,16}|1|0|100%|[0-9]{1,2}%)?[)];?$/i;
function isHexString(color) {
  return typeof color === "string" && hexRegex.test(color.trim());
}
function isRgbString(color) {
  return typeof color === "string" && rgbRegex.test(color.trim());
}
function isHslString(color) {
  return typeof color === "string" && hslRegex.test(color.trim());
}
function _rgb2hsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h3;
  let s;
  const l = (max + min) / 2;
  if (l === 0 || max === min) {
    h3 = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h3 = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h3 = (b - r) / d + 2;
    } else {
      h3 = (r - g) / d + 4;
    }
    h3 = h3 / 6;
  }
  return {
    h: h3,
    s,
    l
  };
}
function _rgb2hsv(r, g, b) {
  let h3 = 0;
  let s = 0;
  let v = 0;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  v = max;
  if (max === 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }
  const d = max - min;
  if (max === min) {
    h3 = 0;
  } else if (max === r && g >= b) {
    h3 = 60 * (g - b) / d + 0;
  } else if (max === r && g < b) {
    h3 = 60 * (g - b) / d + 360;
  } else if (max === g) {
    h3 = 60 * (b - r) / d + 120;
  } else if (max === b) {
    h3 = h3 = 60 * (r - g) / d + 240;
  }
  h3 = h3 / 360;
  return {
    h: h3,
    s,
    v
  };
}
function _hsv2rgb(h3, s, v) {
  let r = 0;
  let g = 0;
  let b = 0;
  const i = Math.floor(h3 * 6 % 6);
  const f = h3 * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r,
    g,
    b
  };
}
function _hsv2hsl(h3, s, v) {
  return {
    h: h3,
    s: s * v / ((h3 = (2 - s) * v) < 1 ? h3 : 2 - h3) || 0,
    l: h3 / 2
  };
}
function _rgb2hex(r, g, b) {
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  let str = (r << 16 | g << 8 | b).toString(16);
  for (let i = 0, len = 6 - str.length; i < len; i++) {
    str = "0" + str;
  }
  return "#" + str.toUpperCase();
}
function _hsl2rgb(h3, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const p2 = l < 0.5 ? l * (s + 1) : l + s - l * s;
    const p1 = l * 2 - p2;
    r = hue2rgb(p1, p2, h3 + 1 / 3);
    g = hue2rgb(p1, p2, h3);
    b = hue2rgb(p1, p2, h3 - 1 / 3);
  }
  return {
    r,
    g,
    b
  };
}
function _cmyk2rgb(c, m, y, k) {
  const t = 1 - k;
  return {
    r: (1 - c) * t,
    g: (1 - m) * t,
    b: (1 - y) * t
  };
}
function _rgb2cmyk(r, g, b) {
  const k = 1 - Math.max(r, g, b);
  return {
    c: (1 - r - k) / (1 - k),
    m: (1 - g - k) / (1 - k),
    y: (1 - b - k) / (1 - k),
    k
  };
}
function parseAlpha(value) {
  let opacity = 1;
  if (isNumeric2(value)) {
    opacity = channel2Length(value);
  }
  return opacity;
}
function channel2Length(value) {
  return numberRange(percentage2Length(value));
}
function channelDown(channel, ratio) {
  if (!isNumeric2(ratio)) {
    throwPercentageLikeError(ratio);
  }
  return numberRange(channel * (1 - percentage2Length(ratio)));
}
function channelUp(channel, ratio) {
  if (!isNumeric2(ratio)) {
    throwPercentageLikeError(ratio);
  }
  return numberRange(channel * (1 + percentage2Length(ratio)));
}
function throwPercentageLikeError(value) {
  throw new Error(`Parameter should be number/percentage instead of ${typeof value}`);
}
function setRatio(color, key, value) {
  if (isNumeric2(value)) {
    color[key] = channel2Length(value);
  } else {
    throwPercentageLikeError(value);
  }
  return color;
}
function getChannel(color, key) {
  return Math.round(color[key] * 255);
}
function setChannel(color, key, value) {
  if (isNumeric2(value)) {
    color[key] = isPercentage(value) ? channel2Length(value) : numberRange(parseFloat(value) / 255);
  } else {
    throwPercentageLikeError(value);
  }
  return color;
}
var BaseColor = class {
  constructor(a, raw = false) {
    this._a = 1;
    if (raw) {
      this._a = a;
    } else {
      this.setAlpha(a);
    }
  }
  getAlpha() {
    return parseFloat(this._a.toFixed(2));
  }
  setAlpha(value) {
    if (typeof value === "undefined") {
      this._a = 1;
    } else if (isNumeric2(value)) {
      this._a = parseAlpha(value);
    } else {
      throwPercentageLikeError(value);
    }
    return this;
  }
  getRawAlpha() {
    return this._a;
  }
  fadeOut(ratio) {
    this._a = channelDown(this._a, ratio);
    return this;
  }
  fadeIn(ratio) {
    this._a = channelUp(this._a, ratio);
    return this;
  }
  fade(ratio) {
    return this.fadeOut(ratio);
  }
  opaque(ratio) {
    return this.fadeIn(ratio);
  }
};
var RGBColor = class extends BaseColor {
  constructor(r, g, b, a, raw = false) {
    super(a, raw);
    this._r = r;
    this._g = g;
    this._b = b;
    if (!raw) {
      this.setRed(r);
      this.setGreen(g);
      this.setBlue(b);
    }
  }
  getRed() {
    return getChannel(this, "_r");
  }
  setRed(value) {
    return setChannel(this, "_r", value);
  }
  getGreen() {
    return getChannel(this, "_g");
  }
  setGreen(value) {
    return setChannel(this, "_g", value);
  }
  getBlue() {
    return getChannel(this, "_b");
  }
  setBlue(value) {
    return setChannel(this, "_b", value);
  }
  rgb() {
    return this;
  }
  hsl() {
    const { h: h3, s, l } = _rgb2hsl(this._r, this._g, this._b);
    return new HSLColor(h3, s, l, this._a, true);
  }
  hsv() {
    const { h: h3, s, v } = _rgb2hsv(this._r, this._g, this._b);
    return new HSVColor(h3, s, v, this._a, true);
  }
  hex() {
    return new HEXColor(this._r, this._g, this._b, this._a, true);
  }
  cmyk() {
    const { c, m, y, k } = _rgb2cmyk(this._r, this._g, this._b);
    return new CMYKColor(c, m, y, k, this._a, true);
  }
  toRgb() {
    return `rgb(${this.toArray().slice(0, 3).join(", ")})`;
  }
  toRgba() {
    return `rgba(${this.toArray().join(", ")})`;
  }
  toString() {
    return this.toRgba();
  }
  toArray() {
    return [this.getRed(), this.getGreen(), this.getBlue(), this.getAlpha()];
  }
  toObject() {
    const [r, g, b, a] = this.toArray();
    return { r, g, b, a };
  }
  toRawArray() {
    return [this._r, this._g, this._b, this._a];
  }
  toRawObject() {
    const [r, g, b, a] = this.toRawArray();
    return { r, g, b, a };
  }
  isDark() {
    return rgb2Gray(this.getRed(), this.getGreen(), this.getBlue()) < 192;
  }
  isLight() {
    return !this.isDark();
  }
};
var HSA = class extends BaseColor {
  constructor(h3, s, a, raw = false) {
    super(a, raw);
    this._h = h3;
    this._s = s;
    if (!raw) {
      this.setHue(h3);
      this.setSaturation(s);
    }
  }
  getHue() {
    return `${Math.round(this._h * 360)}deg`;
  }
  setHue(degree) {
    if (isNumeric2(degree)) {
      this._h = numberRange(parseFloat(degree), 0, 360) / 360;
    } else {
      throw new Error(`Parameter should be number instead of ${typeof degree}`);
    }
    return this;
  }
  getSaturation() {
    return number2Percentage(this._s);
  }
  setSaturation(value) {
    return setRatio(this, "_s", value);
  }
  rotate(degree) {
    if (isNumeric2(degree)) {
      this._h = (this._h + degree / 360 + 1) % 1;
    } else {
      throw new Error(`Parameter should be number instead of ${typeof degree}`);
    }
    return this;
  }
  saturate(ratio) {
    this._s = channelUp(this._s, ratio);
    return this;
  }
  desaturate(ratio) {
    this._s = channelDown(this._s, ratio);
    return this;
  }
};
var HSLColor = class extends HSA {
  constructor(h3, s, l, a, raw = false) {
    super(h3, s, a, raw);
    this._l = l;
    if (!raw) {
      this.setLightness(l);
    }
  }
  getLightness() {
    return number2Percentage(this._l);
  }
  setLightness(value) {
    return setRatio(this, "_l", value);
  }
  lighten(ratio) {
    this._l = channelUp(this._l, ratio);
    return this;
  }
  darken(ratio) {
    this._l = channelDown(this._l, ratio);
    return this;
  }
  hsl() {
    return this;
  }
  rgb() {
    const { r, g, b } = _hsl2rgb(this._h, this._s, this._l);
    return new RGBColor(r, g, b, this._a, true);
  }
  hex() {
    return this.rgb().hex();
  }
  cmyk() {
    return this.rgb().cmyk();
  }
  hsv() {
    return this.rgb().hsv();
  }
  toHsl() {
    return `hsl(${this.toArray().slice(0, 3).join(", ")})`;
  }
  toHsla() {
    return `hsla(${this.toArray().join(", ")})`;
  }
  toString() {
    return this.toHsla();
  }
  toArray() {
    return [this.getHue(), this.getSaturation(), this.getLightness(), this.getAlpha()];
  }
  toObject() {
    const [h3, s, l, a] = this.toArray();
    return { h: h3, s, l, a };
  }
  toRawArray() {
    return [this._h, this._s, this._l, this._a];
  }
  toRawObject() {
    const [h3, s, l, a] = this.toRawArray();
    return { h: h3, s, l, a };
  }
  isDark() {
    return this.rgb().isDark();
  }
  isLight() {
    return this.rgb().isLight();
  }
};
var HSVColor = class extends HSA {
  constructor(h3, s, v, a, raw = false) {
    super(h3, s, a, raw);
    this._v = v;
    if (!raw) {
      this.setValue(v);
    }
  }
  getValue() {
    return number2Percentage(this._v);
  }
  setValue(value) {
    return setRatio(this, "_v", value);
  }
  hsv() {
    return this;
  }
  rgb() {
    const { r, g, b } = _hsv2rgb(this._h, this._s, this._v);
    return new RGBColor(r, g, b, this._a, true);
  }
  hex() {
    return this.rgb().hex();
  }
  cmyk() {
    return this.rgb().cmyk();
  }
  hsl() {
    const { h: h3, s, l } = _hsv2hsl(this._h, this._s, this._v);
    return new HSLColor(h3, s, l, this._a, true);
  }
  toHsv() {
    return this.toArray().slice(0, 3).join(", ");
  }
  toHsva() {
    return this.toArray().join(", ");
  }
  toString() {
    return this.toHsva();
  }
  toArray() {
    return [this.getHue(), this.getSaturation(), this.getValue(), this.getAlpha()];
  }
  toObject() {
    const [h3, s, v, a] = this.toArray();
    return { h: h3, s, v, a };
  }
  toRawArray() {
    return [this._h, this._s, this._v, this._a];
  }
  toRawObject() {
    const [h3, s, v, a] = this.toRawArray();
    return { h: h3, s, v, a };
  }
  isDark() {
    return this.rgb().isDark();
  }
  isLight() {
    return this.rgb().isLight();
  }
};
var HEXColor = class extends BaseColor {
  constructor(r, g, b, a, raw = false) {
    super(a, raw);
    this._r = r;
    this._g = g;
    this._b = b;
    this._hex = _rgb2hex(r, g, b);
  }
  getAlphaHex() {
    return decimal2Hex(this._a, 2);
  }
  setAlphaHex(value) {
    this.setAlpha(parseInt("0x" + value) / 255);
  }
  hex() {
    return this;
  }
  rgb() {
    return new RGBColor(this._r, this._g, this._b, this._a, true);
  }
  hsl() {
    return this.rgb().hsl();
  }
  hsv() {
    return this.rgb().hsv();
  }
  cmyk() {
    return this.rgb().cmyk();
  }
  toHex() {
    return this._hex;
  }
  toHexa() {
    return this._hex + this.getAlphaHex();
  }
  toString() {
    return this.toHexa();
  }
  toArray() {
    return [this._hex.slice(1, 3), this._hex.slice(3, 5), this._hex.slice(5, 7), this.getAlphaHex()];
  }
  toObject() {
    const [r, g, b, a] = this.toArray();
    return { r, g, b, a };
  }
  toRawArray() {
    return [this._r, this._g, this._b, this._a];
  }
  toRawObject() {
    const [r, g, b, a] = this.toRawArray();
    return { r, g, b, a };
  }
  isDark() {
    return this.rgb().isDark();
  }
  isLight() {
    return this.rgb().isLight();
  }
};
var CMYKColor = class extends BaseColor {
  constructor(c, m, y, k, a, raw = false) {
    super(a, raw);
    this._c = c;
    this._m = m;
    this._y = y;
    this._k = k;
    if (!raw) {
      this.setCyan(c);
      this.setMagenta(m);
      this.setYellow(y);
      this.setBlack(k);
    }
  }
  getCyan() {
    return number2Percentage(this._c);
  }
  setCyan(value) {
    return setRatio(this, "_c", value);
  }
  getMagenta() {
    return number2Percentage(this._m);
  }
  setMagenta(value) {
    return setRatio(this, "_m", value);
  }
  getYellow() {
    return number2Percentage(this._y);
  }
  setYellow(value) {
    return setRatio(this, "_y", value);
  }
  getBlack() {
    return number2Percentage(this._k);
  }
  setBlack(value) {
    return setRatio(this, "_k", value);
  }
  cmyk() {
    return this;
  }
  rgb() {
    const { r, g, b } = _cmyk2rgb(this._c, this._m, this._y, this._k);
    return new RGBColor(r, g, b, this._a, true);
  }
  hsl() {
    return this.rgb().hsl();
  }
  hsv() {
    return this.rgb().hsv();
  }
  hex() {
    return this.rgb().hex();
  }
  toCmyk() {
    return this.toArray().join(", ");
  }
  toString() {
    return this.toCmyk();
  }
  toArray() {
    return [this.getCyan(), this.getMagenta(), this.getYellow(), this.getBlack()];
  }
  toObject() {
    const [c, m, y, k] = this.toArray();
    return { c, m, y, k };
  }
  toRawArray() {
    return [this._c, this._m, this._y, this._k];
  }
  toRawObject() {
    const [c, m, y, k] = this.toRawArray();
    return { c, m, y, k };
  }
  isDark() {
    return this.rgb().isDark();
  }
  isLight() {
    return this.rgb().isLight();
  }
};
function rgb2RGBColor(rgba) {
  if (isRgbString(rgba)) {
    const matches = rgbRegex.exec(rgba.trim()).slice(1, 5);
    return new RGBColor(matches[0], matches[1], matches[2], matches[3]);
  } else if (typeof rgba === "object" && isNumeric2(rgba.r) && isNumeric2(rgba.g) && isNumeric2(rgba.b)) {
    return new RGBColor(rgba.r, rgba.g, rgba.b, rgba.a);
  }
  throw new Error("It is not a valid rgb/rgba string");
}
function hex2HEXColor(hexa) {
  if (!isHexString(hexa)) {
    throw new Error("It is not a valid hex/hexa string");
  }
  let rH, gH, bH, aH;
  hexa = hexa.trim();
  if (hexa.length === 4) {
    rH = hexa.slice(1, 2) + hexa.slice(1, 2);
    gH = hexa.slice(2, 3) + hexa.slice(2, 3);
    bH = hexa.slice(3, 4) + hexa.slice(3, 4);
  } else {
    rH = hexa.slice(1, 3);
    gH = hexa.slice(3, 5);
    bH = hexa.slice(5, 7);
  }
  if (hexa.length === 9) {
    aH = hexa.slice(7, 9);
  } else {
    aH = "ff";
  }
  return new HEXColor(hex2Length(rH), hex2Length(gH), hex2Length(bH), hex2Length(aH));
}
function hex2Length(channel) {
  return parseInt("0x" + channel) / 255;
}
function hue2rgb(p1, p2, hue) {
  if (hue < 0) {
    hue = hue + 1;
  }
  if (hue > 1) {
    hue = hue - 1;
  }
  if (hue * 6 < 1) {
    return p1 + (p2 - p1) * 6 * hue;
  }
  if (hue * 2 < 1) {
    return p2;
  }
  if (hue * 3 < 2) {
    return p1 + (p2 - p1) * (2 / 3 - hue) * 6;
  }
  return p1;
}
function hsl2HSLColor(hsla) {
  if (isHslString(hsla)) {
    const matches = hslRegex.exec(hsla.trim()).slice(1, 6);
    return new HSLColor(matches[0], matches[2], matches[3], matches[4]);
  } else if (typeof hsla === "object" && isNumeric2(hsla.h) && isNumeric2(hsla.s) && isNumeric2(hsla.l)) {
    return new HSLColor(hsla.h, hsla.s, hsla.l, hsla.a);
  }
  throw new Error("It is not a valid hsl/hsla string");
}
function hsv2HSVColor(hsva) {
  if (typeof hsva === "object" && isNumeric2(hsva.h) && isNumeric2(hsva.s) && isNumeric2(hsva.v)) {
    return new HSVColor(hsva.h, hsva.s, hsva.v, isNumeric2(hsva.a) ? hsva.a : 1);
  } else {
    throw new Error("It is not a valid hsv/hsva object");
  }
}
function cmyk2CMYK(cmyk) {
  if (typeof cmyk === "object" && isNumeric2(cmyk.c) && isNumeric2(cmyk.m) && isNumeric2(cmyk.y) && isNumeric2(cmyk.k)) {
    return new CMYKColor(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
  } else {
    throw new Error("It is not a valid cmyk object");
  }
}
function clone(object) {
  if (object instanceof RGBColor) {
    return new RGBColor(object._r, object._g, object._b, object._a, true);
  } else if (object instanceof HSLColor) {
    return new HSLColor(object._h, object._s, object._l, object._a, true);
  } else if (object instanceof HSVColor) {
    return new HSVColor(object._h, object._s, object._v, object._a, true);
  } else if (object instanceof HEXColor) {
    return new HEXColor(object._r, object._g, object._b, object._a, true);
  } else if (object instanceof CMYKColor) {
    return new CMYKColor(object._c, object._m, object._y, object._k, object._a, true);
  }
  return object;
}
function Color(value) {
  if (typeof value === "object") {
    if (value instanceof RGBColor || value instanceof HSLColor || value instanceof HEXColor || value instanceof HSVColor || value instanceof CMYKColor) {
      return clone(value);
    } else if (isNumeric2(value.r) && isNumeric2(value.g) && isNumeric2(value.b)) {
      return rgb2RGBColor(value);
    } else if (isNumeric2(value.h) && isLimitPercentage(value.s)) {
      if (isLimitPercentage(value.l)) {
        return hsl2HSLColor(value);
      } else if (isLimitPercentage(value.v)) {
        return hsv2HSVColor(value);
      }
    } else if (isNumeric2(value.c) && isNumeric2(value.m) && isNumeric2(value.y) && isNumeric2(value.k)) {
      return cmyk2CMYK(value);
    }
  } else if (isHexString(value)) {
    return hex2HEXColor(value);
  } else if (isRgbString(value)) {
    return rgb2RGBColor(value);
  } else if (isHslString(value)) {
    return hsl2HSLColor(value);
  }
  throw new Error("Invalid color value.");
}
function mix(color1, color2, weight) {
  const c1 = Color(color1).rgb();
  const c2 = Color(color2).rgb();
  const p = typeof weight === "undefined" ? 0.5 : numberRange(percentage2Length(weight));
  const w = p * 2 - 1;
  const a = c1.getRawAlpha() - c2.getRawAlpha();
  const w1 = (w * a === -1 ? w : (w + a) / (w * a + 1) + 1) / 2;
  const w2 = 1 - w1;
  return rgb2RGBColor({
    r: w1 * c1.getRed() + w2 * c2.getRed(),
    g: w1 * c1.getGreen() + w2 * c2.getGreen(),
    b: w1 * c1.getBlue() + w2 * c2.getBlue(),
    a: c1.getRawAlpha() * p + c2.getRawAlpha() * (1 - p)
  });
}
function invert(value) {
  const color = Color(value).rgb();
  return color.setRed(255 - color.getRed()).setGreen(255 - color.getGreen()).setBlue(255 - color.getBlue());
}
function complement(value) {
  return Color(value).hsl().rotate(180);
}
function isDark(value) {
  return Color(value).isDark();
}
function isLight(value) {
  return Color(value).isLight();
}
function grayscale(value) {
  const color = Color(value).rgb();
  const gray = Math.round(rgb2Gray(color.getRed(), color.getGreen(), color.getBlue()));
  return color.setRed(gray).setGreen(gray).setBlue(gray);
}
function decimal2Ratio(number) {
  return (Math.round(number / 2.55) / 100).toFixed(2);
}
function translate(color) {
  const rgba = Color(color).rgb();
  const { r, g, b } = rgba.toObject();
  const a = (rgba._a * 255).toFixed(0);
  const rR = decimal2Ratio(r);
  const rG = decimal2Ratio(g);
  const rB = decimal2Ratio(b);
  const rA = rgba._a.toFixed(2);
  const ahex = "#" + rgba.hex().getAlphaHex() + rgba.hex().toHex().substr(1);
  return {
    RGB: rgba.toArray().slice(0, 3).join(", "),
    RGBA: rgba.toArray().join(", "),
    HEXA: rgba.hex().toHexa(),
    AHEX: ahex,
    HEX: rgba.hex().toHex(),
    HSL: rgba.hsl().toArray().slice(0, 3).join(", "),
    HSLA: rgba.hsl().toArray().join(", "),
    HSV: rgba.hsv().toHsv(),
    HSB: rgba.hsv().toHsv(),
    CMYK: rgba.cmyk().toCmyk(),
    WEB: {
      HEX: rgba.hex().toHex(),
      HEXA: rgba.hex().toHexa(),
      RGB: rgba.toRgb(),
      RGBA: rgba.toRgba(),
      HSL: rgba.hsl().toHsl(),
      HSLA: rgba.hsl().toHsla()
    },
    Java: `new Color(${r}, ${g}, ${b}, ${a})`,
    ".Net": `Color.FromArgb(${a}, ${r}, ${g}, ${b})`,
    Android: `Color.argb(${a}, ${r}, ${g}, ${b})`,
    Unity3D: `new Color(${rR}f, ${rG}f, ${rB}f, ${rA}f)`,
    OpenGL: `glColor4f(${rR}f, ${rG}f, ${rB}f, ${rA}f)`,
    Flutter: `Color(0x${ahex.substr(1)})`,
    Swift: `UIColor(red:${rR}, green:${rG}, blue:${rB}, alpha:${rA})`
  };
}
var Colorfuls = function Colorfuls2(color) {
  return Color(color);
};
Colorfuls.Color = Color;
Colorfuls.mix = mix;
Colorfuls.invert = invert;
Colorfuls.complement = complement;
Colorfuls.isDark = isDark;
Colorfuls.isLight = isLight;
Colorfuls.grayscale = grayscale;
Colorfuls.translate = translate;

// packages/ui/src/helpers/color.ts
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
function getColorGroups(primaryColor) {
  const colors = [];
  const hsv = Colorfuls(primaryColor).hsv().toRawObject();
  for (let i = 1; i <= 10; i++) {
    const isLight2 = i <= 6;
    const j = isLight2 ? lightColorCount + 1 - i : i - lightColorCount - 1;
    colors.push(Colorfuls({
      h: getHue(hsv.h * 360, j, isLight2),
      s: getSaturation(hsv.s, j, isLight2) * 100 + "%",
      v: getValue(hsv.v, j, isLight2) * 100 + "%"
    }).hex().toHex());
  }
  return colors;
}
function getHue(h3, i, isLight2) {
  let hue;
  if (h3 >= 60 && h3 <= 240) {
    hue = isLight2 ? h3 - hueStep * i : h3 + hueStep * i;
  } else {
    hue = isLight2 ? h3 + hueStep * i : h3 - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(s, i, isLight2) {
  let saturation;
  if (isLight2) {
    saturation = s - saturationStep * i;
  } else if (i == darkColorCount) {
    saturation = s + saturationStep;
  } else {
    saturation = s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (isLight2 && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return saturation;
}
function getValue(v, i, isLight2) {
  let value;
  if (isLight2) {
    value = v + brightnessStep1 * i;
  } else {
    value = v - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  } else if (value < 0) {
    value += 1;
  }
  return value;
}
function isColorValue(value) {
  try {
    Colorfuls(value);
    return true;
  } catch (e) {
    return false;
  }
}
function isDarkColor(value) {
  return Colorfuls(value).isDark();
}
function getColorObject(color) {
  if (color && isColorValue(color)) {
    const hex = Colorfuls(color).hex();
    const groups = getColorGroups(hex);
    const isDark2 = isDarkColor(hex);
    return {
      hasColor: true,
      groups,
      isDark: isDark2,
      varColor: groups[5],
      varBlackColor: groups[9],
      varFrontColor: isDark2 ? "#ffffff" : groups[9],
      varBackgroundColor: groups[5]
    };
  }
  return {
    hasColor: false,
    groups: [],
    isDark: false,
    varColor: "",
    varBlackColor: "",
    varFrontColor: "",
    varBackgroundColor: ""
  };
}

// packages/ui/src/helpers/exception.ts
var TYPE = {
  DEFAULT: "fail",
  PARAM_ERROR: "Invalid param",
  CONFIG_ERROR: "Invalid config",
  PROP_ERROR: "Invalid Prop"
};
var _Exception = class extends Error {
  constructor(error, type = TYPE.DEFAULT, source = "Exception") {
    let msg = "unknown";
    if (error instanceof _Exception || error instanceof Error) {
      msg = error.message;
    } else if (error != null) {
      msg = error.toString();
    }
    super(msg);
    if (error instanceof _Exception) {
      this.source = error.source;
      this.type = error.type;
    } else {
      this.source = source;
      this.type = type;
    }
  }
  getMessage() {
    return this.message;
  }
  toString() {
    return `[${this.source}] ${this.type}: ${this.getMessage()}`;
  }
  getFailError() {
    return {
      errMsg: `${this.type}: ${this.getMessage()}`
    };
  }
  toLocaleString() {
    return this.toString();
  }
};
var Exception = _Exception;
Exception.TYPE = TYPE;
var exception_default = Exception;

// packages/ui/src/helpers/validator.ts
var selectorValidator = (value) => {
  return typeof value === "string" || value instanceof HTMLElement || value instanceof Document;
};
var stringNumberArrayMixValidator = (value) => {
  return isStringNumberMixArray(value) || typeof value === "string" || isNumber(value);
};
var sizeValidator = (value) => {
  return getSizeValue(value, Infinity) !== Infinity;
};
var createEnumsValidator = (enums) => {
  const validator = (value) => {
    return enums.includes(value);
  };
  return validator;
};
function getEnumsValue(enums, value) {
  return enums.includes(value) ? value : enums[0];
}
function isSvgComponent(value) {
  if (isObject(value)) {
    const obj = value;
    if (typeof obj.template === "string" || typeof obj.render === "function") {
      return true;
    } else if (obj.__file && obj.__file.indexOf(".svg") > -1) {
      return true;
    }
  }
  return false;
}
var iconValidator = (value) => {
  return typeof value === "string" && !isURL(value) || isSvgComponent(value);
};
var numberValidator = (value) => isNumeric(value);
var colorValidator = (value) => {
  return value == null || value === "" || isColorValue(value);
};
var emitEventValidator = (e) => e instanceof Event;
var emitClickValidator = (e) => e instanceof MouseEvent;
var emitErrorValidator = (e) => e instanceof exception_default;

// packages/ui/src/Icon/util.ts
var getIconStyles = (props) => {
  const styles = {};
  props.color && (styles["--ak-icon-color"] = props.color);
  if (props.width && props.width > 0 && props.height && props.height > 0) {
    styles.width = props.width + "px";
    styles.height = props.height + "px";
  } else if (props.size && props.size > 0) {
    styles["--ak-icon-size"] = props.size + "px";
  }
  return styles;
};

// vue:./Icon.vue
import { resolveDynamicComponent as _resolveDynamicComponent, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock2, createBlock as _createBlock } from "vue";
var _sfc_script2 = defineComponent2({
  name: "ak-icon",
  props: {
    icon: {
      type: [String, Object],
      validator: iconValidator,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const styles = computed(() => getIconStyles(props));
    const component = computed(() => isSvgComponent(props.icon) ? props.icon : _sfc_script);
    const iconName = computed(() => isSvgComponent(props.icon) ? null : props.icon);
    return {
      iconName,
      styles,
      component
    };
  }
});
function render2(_ctx, _cache) {
  return _openBlock2(), _createBlock(_resolveDynamicComponent(_ctx.component), {
    class: _normalizeClass(["ak-icon", { spin: _ctx.spin }]),
    style: _normalizeStyle(_ctx.styles),
    iconName: _ctx.iconName
  }, null, 8, ["class", "style", "iconName"]);
}
_sfc_script2.render = render2;
_sfc_script2.__file = "packages/ui/src/Icon/Icon.vue";

// packages/ui/src/Icon/index.ts
var install = withInstall(_sfc_script2);
var Icon_default = _sfc_script2;

// packages/ui/src/helpers/constants.ts
var PLACEMENT_TYPES = [
  "bottom",
  "top",
  "left",
  "right"
];
var STATE_TYPES = [
  "default",
  "primary",
  "warning",
  "danger",
  "success"
];
var SIZE_TYPES = ["large", "middle", "small"];

// vue:./LoadingOutlined.vue
import { createElementVNode as _createElementVNode2, openBlock as _openBlock3, createElementBlock as _createElementBlock2 } from "vue";
var _sfc_script3 = {};
var _hoisted_12 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_2 = /* @__PURE__ */ _createElementVNode2("path", { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" }, null, -1);
var _hoisted_3 = [
  _hoisted_2
];
function render3(_ctx, _cache) {
  return _openBlock3(), _createElementBlock2("svg", _hoisted_12, _hoisted_3);
}
_sfc_script3.render = render3;
_sfc_script3.__file = "packages/ui/src/Icon/icons/LoadingOutlined/LoadingOutlined.vue";

// packages/ui/src/Button/util.ts
var BUTTON_SHAPE_TYPES = [
  "rectangle",
  "round",
  "circle",
  "square"
];
var BUTTON_PATTERN_TYPES = [
  "default",
  "solid",
  "dashed",
  "borderless",
  "gradient"
];
var FORM_TYPES = ["button", "submit", "reset"];
var getCommonClasses = (props) => [
  "pattern--" + getEnumsValue(BUTTON_PATTERN_TYPES, props.pattern),
  "size--" + getEnumsValue(SIZE_TYPES, props.size),
  "shape--" + getEnumsValue(BUTTON_SHAPE_TYPES, props.shape)
];
var getButtonClasses = (props, groupProps) => [
  "ak-button",
  {
    "has--icon": props.loading || props.icon,
    ghost: !!props.ghost,
    transparent: !!props.transparent
  },
  [
    "type--" + (props.color && isColorValue(props.color) ? STATE_TYPES[1] : getEnumsValue(STATE_TYPES, props.type))
  ],
  getCommonClasses(groupProps || props)
];
var getGroupClasses = (props, count) => [
  "ak-button-group",
  getCommonClasses(props),
  "count--" + (count || 1)
];
var getButtonStyles = (color) => {
  const obj = {};
  if (color && isColorValue(color)) {
    const colors = getColorGroups(color);
    const isDark2 = isDarkColor(color);
    const pattern = getEnumsValue(BUTTON_PATTERN_TYPES);
    obj[`--ak-color`] = colors[5];
    obj[`--ak-dark-color`] = colors[6];
    obj[`--ak-light-color`] = colors[4];
    if (!isDark2 && (pattern === "default" || pattern === "gradient")) {
      obj[`--ak-front-color`] = colors[9];
    }
  }
  return obj;
};

// packages/ui/src/Button/context.ts
import { provide as provide2, inject as inject2 } from "vue";

// packages/ui/src/hooks/use-child-count.ts
import { inject, onBeforeUnmount, onMounted, provide, ref } from "vue";
function getContextKey(name) {
  return `ak${capitalize(name)}ChildCount`;
}
function useChildCountProvider(name) {
  const count = ref(0);
  provide(getContextKey(name), {
    addCount: () => count.value++,
    minusCount: () => count.value--
  });
  return {
    childCount: count
  };
}
function useChildCountConsumer(name) {
  const consumer = inject(getContextKey(name), {});
  onMounted(() => {
    consumer.addCount && consumer.addCount();
  });
  onBeforeUnmount(() => consumer.minusCount && consumer.minusCount());
  return {};
}

// packages/ui/src/Button/context.ts
var KEY = "Button";
var CONTEXT_KEY = `ak${KEY}GroupOptions`;
function useButtonProvider(props) {
  provide2(CONTEXT_KEY, props);
  return useChildCountProvider(KEY);
}
function useButtonConsumer() {
  const groupOptions = inject2(CONTEXT_KEY, void 0);
  useChildCountConsumer(KEY);
  return {
    groupOptions
  };
}

// vue:./Button.vue
import { resolveComponent as _resolveComponent, openBlock as _openBlock4, createBlock as _createBlock2, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode3, normalizeClass as _normalizeClass2, normalizeStyle as _normalizeStyle2, createElementBlock as _createElementBlock3 } from "vue";
var _sfc_script4 = defineComponent3({
  name: "ak-button",
  components: { Icon: _sfc_script2 },
  props: {
    size: {
      type: String,
      validator: createEnumsValidator(SIZE_TYPES)
    },
    type: {
      type: String,
      validator: createEnumsValidator(STATE_TYPES)
    },
    pattern: {
      type: String,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES)
    },
    shape: {
      type: String,
      validator: createEnumsValidator(BUTTON_SHAPE_TYPES)
    },
    formType: {
      type: String,
      validator: createEnumsValidator(FORM_TYPES)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object],
      validator: iconValidator
    },
    ghost: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const { groupOptions } = useButtonConsumer();
    const classes = computed2(() => getButtonClasses(props, groupOptions));
    const realFormType = computed2(() => getEnumsValue(FORM_TYPES, props.formType));
    const styles = computed2(() => getButtonStyles(props.color));
    return {
      realFormType,
      classes,
      styles,
      LoadingOutlined: _sfc_script3
    };
  }
});
var _hoisted_13 = ["disabled", "type"];
var _hoisted_22 = /* @__PURE__ */ _createTextVNode("button");
function render4(_ctx, _cache) {
  const _component_Icon = _resolveComponent("Icon");
  return _openBlock4(), _createElementBlock3("button", {
    class: _normalizeClass2(_ctx.classes),
    disabled: _ctx.disabled,
    type: _ctx.realFormType,
    style: _normalizeStyle2(_ctx.styles)
  }, [
    _ctx.loading ? (_openBlock4(), _createBlock2(_component_Icon, {
      key: 0,
      icon: _ctx.LoadingOutlined,
      spin: true
    }, null, 8, ["icon"])) : _ctx.icon ? (_openBlock4(), _createBlock2(_component_Icon, {
      key: 1,
      icon: _ctx.icon
    }, null, 8, ["icon"])) : _createCommentVNode("v-if", true),
    _createElementVNode3("span", null, [
      _renderSlot(_ctx.$slots, "default", {}, () => [
        _hoisted_22
      ])
    ])
  ], 14, _hoisted_13);
}
_sfc_script4.render = render4;
_sfc_script4.__file = "packages/ui/src/Button/Button.vue";

// vue:./ButtonGroup.vue
import { computed as computed3, defineComponent as defineComponent4 } from "vue";
import { renderSlot as _renderSlot2, normalizeClass as _normalizeClass3, openBlock as _openBlock5, createElementBlock as _createElementBlock4 } from "vue";
var _sfc_script5 = defineComponent4({
  name: "ak-button-group",
  props: {
    size: {
      type: String,
      validator: createEnumsValidator(SIZE_TYPES)
    },
    pattern: {
      type: String,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES)
    },
    shape: {
      type: String,
      validator: createEnumsValidator(BUTTON_SHAPE_TYPES)
    }
  },
  setup(props) {
    const { childCount } = useButtonProvider(props);
    const classes = computed3(() => {
      return getGroupClasses(props, childCount.value);
    });
    return { classes };
  }
});
function render5(_ctx, _cache) {
  return _openBlock5(), _createElementBlock4("div", {
    class: _normalizeClass3(_ctx.classes)
  }, [
    _renderSlot2(_ctx.$slots, "default")
  ], 2);
}
_sfc_script5.render = render5;
_sfc_script5.__file = "packages/ui/src/Button/ButtonGroup.vue";

// packages/ui/src/Button/index.ts
var Button_default = _sfc_script4;
var install2 = multiWithInstall(_sfc_script4, [_sfc_script5]);

// packages/ui/src/locale/lang/zh-CN.ts
var zh_CN_default = {
  lang: "zh-CN",
  actionSheetCancelText: "\u53D6\u6D88",
  calendarConfirmText: "\u786E\u5B9A",
  calendarWeekDayTexts: {
    "0": "\u65E5",
    "1": "\u4E00",
    "2": "\u4E8C",
    "3": "\u4E09",
    "4": "\u56DB",
    "5": "\u4E94",
    "6": "\u516D"
  },
  calendarMaxRangeTips: "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7{{maxRange}}\u5929",
  calendarMonthCaption: "YYYY\u5E74MM\u6708",
  calendarSelectedStartText: "\u5F00\u59CB",
  calendarSelectedEndText: "\u7ED3\u675F",
  cascaderDefaultTitle: "\u8BF7\u9009\u62E9",
  cascaderEmptyText: "\u6682\u65E0\u9009\u62E9\u53EF\u9009",
  copyText: "\u590D\u5236",
  countDownDayUnit: "\u5929",
  datePickerConfirmText: "\u786E\u5B9A",
  datePickerCancelText: "\u53D6\u6D88",
  dialogConfirmText: "\u786E\u5B9A",
  dialogCancelText: "\u53D6\u6D88",
  flatListLoadingText: "\u6B63\u5728\u52A0\u8F7D",
  imageUploaderDeleteContent: "\u8981\u5220\u9664\u8FD9\u5F20\u56FE\u7247\u5417\uFF1F",
  imageUploaderDeleteConfirmText: "\u5220\u9664",
  navBarBackButtonText: "\u8FD4\u56DE",
  navBarHomeButtonText: "\u9996\u9875",
  numberKeyboardConfirmText: "\u5B8C\u6210",
  orderDeleteButtonText: "\u62D6\u52A8\u5230\u6B64\u5904\u5220\u9664",
  orderDeleteButtonActiveText: "\u677E\u624B\u5373\u53EF\u5220\u9664",
  pickerConfirmText: "\u786E\u5B9A",
  pickerCancelText: "\u53D6\u6D88",
  pickerEmptyText: "\u6682\u65E0\u9009\u62E9\u53EF\u9009",
  popDialogConfirmText: "\u786E\u5B9A",
  popDialogCancelText: "\u53D6\u6D88",
  resultConfirmText: "\u786E\u5B9A",
  resultBackText: "\u8FD4\u56DE",
  scrollViewRefreshingText: "\u6B63\u5728\u5237\u65B0",
  scrollViewHoldingText: "\u677E\u5F00\u5237\u65B0",
  scrollViewPullingTexts: {
    "": "\u4E0B\u62C9\u5237\u65B0",
    up: "\u4E0A\u62C9\u5237\u65B0",
    down: "\u4E0B\u62C9\u5237\u65B0",
    left: "\u5DE6\u62C9\u5237\u65B0",
    right: "\u53F3\u62C9\u5237\u65B0"
  },
  searchBarCancelText: "\u53D6\u6D88"
};

// packages/ui/src/locale/index.ts
var locale_default = zh_CN_default;

// packages/ui/src/ConfigProvider/context.ts
import { inject as inject3, provide as provide3, computed as computed4 } from "vue";
var CONTEXT_KEY2 = "akConfigProvider";
function useConfigProvider(props) {
  provide3(CONTEXT_KEY2, props);
}
function useLocale() {
  const props = inject3(CONTEXT_KEY2, {});
  const locale = computed4(() => {
    var _a;
    return (_a = props.locale) != null ? _a : locale_default;
  });
  return {
    locale
  };
}

// vue:./LeftOutlined.vue
import { createElementVNode as _createElementVNode4, openBlock as _openBlock6, createElementBlock as _createElementBlock5 } from "vue";
var _sfc_script6 = {};
var _hoisted_14 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_23 = /* @__PURE__ */ _createElementVNode4("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" }, null, -1);
var _hoisted_32 = [
  _hoisted_23
];
function render6(_ctx, _cache) {
  return _openBlock6(), _createElementBlock5("svg", _hoisted_14, _hoisted_32);
}
_sfc_script6.render = render6;
_sfc_script6.__file = "packages/ui/src/Icon/icons/LeftOutlined/LeftOutlined.vue";

// vue:./HomeOutlined.vue
import { createElementVNode as _createElementVNode5, openBlock as _openBlock7, createElementBlock as _createElementBlock6 } from "vue";
var _sfc_script7 = {};
var _hoisted_15 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_24 = /* @__PURE__ */ _createElementVNode5("path", { d: "M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" }, null, -1);
var _hoisted_33 = [
  _hoisted_24
];
function render7(_ctx, _cache) {
  return _openBlock7(), _createElementBlock6("svg", _hoisted_15, _hoisted_33);
}
_sfc_script7.render = render7;
_sfc_script7.__file = "packages/ui/src/Icon/icons/HomeOutlined/HomeOutlined.vue";

// packages/ui/src/hooks/use-event.ts
import { onBeforeUnmount as onBeforeUnmount2, onMounted as onMounted2, ref as ref2, watch } from "vue";

// packages/ui/src/helpers/device.ts
var isBrowser = typeof window !== "undefined";
var isMobile = isBrowser ? /(iPhone|iPod|iPad|Android|ios)/i.test(navigator.userAgent) || "ontouchstart" in document.documentElement : false;
var isIOS = isMobile && /(iPhone|iPod|iPad|ios)/i.test(navigator.userAgent);

// packages/ui/src/helpers/events.ts
function addEvent(type, callback, $el) {
  if ($el === document || $el === document.documentElement) {
    $el = window;
  }
  $el.addEventListener(type, callback, false);
  return () => {
    $el.removeEventListener(type, callback, false);
  };
}
var passiveSupported = false;
try {
  const options = Object.defineProperty({}, "passive", {
    get: function() {
      return passiveSupported = true;
    }
  });
  window.addEventListener("test", function() {
  }, options);
} catch (err) {
}
var touchstart = isMobile ? "touchstart" : "mousedown";
var touchmove = isMobile ? "touchmove" : "mousemove";
var touchend = isMobile ? "touchend" : "mouseup";
var touchOptions = passiveSupported ? { passive: false } : false;
function getStretchOffset(offset) {
  return Math.ceil(offset / Math.log(Math.abs(offset)));
}
var touchEvent = {
  touchstart,
  touchmove,
  touchend,
  getStretchOffset,
  addListeners($el, object) {
    $el.addEventListener(touchstart, object, touchOptions);
    $el.addEventListener(touchmove, object, touchOptions);
    $el.addEventListener(touchend, object, touchOptions);
    if (touchend === "mouseup") {
      $el.addEventListener("mouseleave", object, touchOptions);
    }
  },
  removeListeners($el, object) {
    $el.removeEventListener(touchstart, object, false);
    $el.removeEventListener(touchmove, object, false);
    $el.removeEventListener(touchend, object, false);
    if (touchend === "mouseup") {
      $el.removeEventListener("mouseleave", object, false);
    }
  },
  getTouch(e) {
    const { pageX, pageY, clientX, clientY } = touchstart === "touchstart" ? e.targetTouches[0] || {
      pageX: 0,
      pageY: 0,
      clientX: 0,
      clientY: 0
    } : e;
    return {
      pageX,
      pageY,
      clientX,
      clientY
    };
  }
};
function addLongPressEvent($el, callback) {
  let coords;
  const object = {
    handleEvent(e) {
      switch (e.type) {
        case touchstart:
          this.onStart(e);
          break;
        case touchmove:
          this.onMove(e);
          break;
        case touchend:
          this.onEnd(e);
          break;
        case "mouseleave":
          this.onEnd(e);
          break;
        default:
          break;
      }
    },
    onStart(e) {
      const { pageX, pageY } = touchEvent.getTouch(e);
      coords = {
        startX: pageX,
        startY: pageY,
        timeStamp: e.timeStamp
      };
    },
    onMove(e) {
      if (!coords) {
        return;
      }
      const { pageX, pageY } = touchEvent.getTouch(e);
      if (Math.abs(pageX - coords.startX) >= 10 || Math.abs(pageY - coords.startY) >= 10) {
        coords = null;
      }
    },
    onEnd(e) {
      if (coords) {
        typeof callback === "function" && callback({
          type: e.timeStamp - coords.timeStamp >= 800 ? "long-press" : "click"
        });
      }
      coords = null;
    }
  };
  touchEvent.addListeners($el, object);
  return function removeLongPressEvent() {
    touchEvent.removeListeners($el, object);
  };
}

// packages/ui/src/hooks/use-event.ts
function useFn(elRef, fn) {
  let stopHandle = null;
  function on2() {
    if (elRef.value) {
      stopHandle = fn(elRef.value);
    }
  }
  function off2() {
    if (stopHandle) {
      stopHandle();
      stopHandle = null;
    }
  }
  function elChange() {
    off2();
    on2();
  }
  watch(elRef, elChange);
  onMounted2(on2);
  onBeforeUnmount2(off2);
  return { off: off2, elChange };
}
function useEvent(elRef, event = touchEvent.touchstart, callback) {
  return useFn(elRef, (el) => addEvent(event, callback, el));
}
function useStop(elRef, event = touchEvent.touchstart, callback) {
  const onStop = (e) => {
    callback && callback(e);
    e.stopPropagation();
  };
  return useEvent(elRef, event, onStop);
}
function useLongPress(elRef, callback) {
  return useFn(elRef, (el) => addLongPressEvent(el, callback));
}
function useDbclick(elRef, callback) {
  let dbClickTag = null;
  let dbClickTimer;
  function onClick(e) {
    const $el = e.currentTarget;
    if (!dbClickTag) {
      dbClickTag = e.type;
      dbClickTimer = window.setTimeout(() => {
        dbClickTag = null;
        callback($el, "click");
      }, 300);
    } else if (dbClickTag === e.type) {
      clearTimeout(dbClickTimer);
      dbClickTag = null;
      callback($el, "dbclick");
    }
  }
  return useFn(elRef, (el) => {
    const off2 = addEvent(touchEvent.touchstart, onClick, el);
    return () => {
      clearTimeout(dbClickTimer);
      off2();
    };
  });
}
function useBlur(callback) {
  const elRef = ref2(document.documentElement);
  const { off: off2 } = useEvent(elRef, "click", callback);
  return { off: off2 };
}

// vue:./NavBar.vue
import { renderSlot as _renderSlot3, createCommentVNode as _createCommentVNode2, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock8, createElementBlock as _createElementBlock7, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode2, resolveComponent as _resolveComponent2, withCtx as _withCtx, createBlock as _createBlock3, createElementVNode as _createElementVNode6 } from "vue";
var buttonsValidator = (items) => {
  return Array.isArray(items) && items.filter((item) => {
    return !(item && typeof item.text === "string" || iconValidator(item.icon));
  }).length === 0;
};
var emitClickValidator2 = (payload, buttonEl) => payload && typeof payload.index === "number" && payload.item && typeof payload.item.text === "string" && buttonEl instanceof HTMLElement;
var emitTitleDbClickValidator = (titleEl) => titleEl instanceof HTMLElement;
var _sfc_script8 = defineComponent5({
  name: "ak-nav-bar",
  components: { Button: _sfc_script4, ButtonGroup: _sfc_script5 },
  props: {
    title: {
      type: String,
      default: ""
    },
    showBack: {
      type: Boolean,
      default: false
    },
    showHome: {
      type: Boolean,
      default: false
    },
    leftButtons: {
      type: Array,
      validator: buttonsValidator,
      default: () => []
    },
    rightButtons: {
      type: Array,
      validator: buttonsValidator,
      default: () => []
    },
    iconOnly: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    backClick: emitClickValidator2,
    homeClick: emitClickValidator2,
    titleDbclick: emitTitleDbClickValidator,
    leftButtonClick: emitClickValidator2,
    rightButtonClick: emitClickValidator2
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const titleEl = ref3();
    function emitClick(type, item, $el) {
      emit(type, item, $el);
    }
    function onBack(e) {
      emitClick("backClick", {
        index: 0,
        item: {
          text: "back"
        }
      }, e.currentTarget);
    }
    function onBackHome(e) {
      emitClick("homeClick", {
        item: {
          text: "home"
        },
        index: props.showBack ? 1 : 0
      }, e.currentTarget);
    }
    function onLeftIconClick(e, item, index) {
      emitClick("leftButtonClick", {
        item: {
          text: item.text
        },
        index
      }, e.currentTarget);
    }
    function onRightIconClick(e, item, index) {
      emitClick("rightButtonClick", {
        item: {
          text: item.text
        },
        index
      }, e.currentTarget);
    }
    useDbclick(titleEl, ($el, event) => {
      if (event === "dbclick") {
        emit("titleDbclick", $el);
      }
    });
    return {
      titleEl,
      onBack,
      onBackHome,
      onLeftIconClick,
      onRightIconClick,
      locale,
      LeftOutlined: _sfc_script6,
      HomeOutlined: _sfc_script7
    };
  }
});
var _hoisted_16 = { class: "ak-nav-bar ak-horizontal-hairline" };
var _hoisted_25 = { class: "ak-nav-bar_inner" };
var _hoisted_34 = { class: "ak-nav-bar_left" };
var _hoisted_4 = { class: "ak-nav-bar_right" };
function render8(_ctx, _cache) {
  const _component_Button = _resolveComponent2("Button");
  const _component_ButtonGroup = _resolveComponent2("ButtonGroup");
  return _openBlock8(), _createElementBlock7("div", _hoisted_16, [
    _createElementVNode6("div", _hoisted_25, [
      _createElementVNode6("div", _hoisted_34, [
        _ctx.$slots.left ? _renderSlot3(_ctx.$slots, "left", { key: 0 }) : _ctx.leftButtons.length > 0 || _ctx.showBack || _ctx.showHome ? (_openBlock8(), _createBlock3(_component_ButtonGroup, {
          key: 1,
          class: "ak-nav-bar_button-group",
          shape: _ctx.iconOnly ? "square" : "rectangle",
          pattern: "borderless"
        }, {
          default: _withCtx(() => [
            _ctx.leftButtons.length > 0 ? (_openBlock8(true), _createElementBlock7(_Fragment, { key: 0 }, _renderList(_ctx.leftButtons, (item, index) => {
              return _openBlock8(), _createBlock3(_component_Button, {
                class: "ak-nav-bar_button",
                transparent: "",
                type: item.type || "default",
                icon: item.icon,
                key: index,
                onClick: ($event) => _ctx.onLeftIconClick($event, item, index)
              }, {
                default: _withCtx(() => [
                  _createTextVNode2(_toDisplayString(item.text), 1)
                ]),
                _: 2
              }, 1032, ["type", "icon", "onClick"]);
            }), 128)) : (_openBlock8(), _createElementBlock7(_Fragment, { key: 1 }, [
              _ctx.showBack ? (_openBlock8(), _createBlock3(_component_Button, {
                key: 0,
                class: "ak-nav-bar_button",
                type: "default",
                icon: _ctx.LeftOutlined,
                transparent: "",
                onClick: _ctx.onBack
              }, {
                default: _withCtx(() => [
                  _createTextVNode2(_toDisplayString(_ctx.locale.navBarBackButtonText), 1)
                ]),
                _: 1
              }, 8, ["icon", "onClick"])) : _createCommentVNode2("v-if", true),
              _ctx.showHome ? (_openBlock8(), _createBlock3(_component_Button, {
                key: 1,
                class: "ak-nav-bar_button",
                type: "default",
                icon: _ctx.HomeOutlined,
                transparent: "",
                onClick: _ctx.onBackHome
              }, {
                default: _withCtx(() => [
                  _createTextVNode2(_toDisplayString(_ctx.locale.navBarHomeButtonText), 1)
                ]),
                _: 1
              }, 8, ["icon", "onClick"])) : _createCommentVNode2("v-if", true)
            ], 64))
          ]),
          _: 1
        }, 8, ["shape"])) : _createCommentVNode2("v-if", true)
      ]),
      _createElementVNode6("div", {
        class: "ak-nav-bar_title",
        ref: "titleEl"
      }, _toDisplayString(_ctx.title), 513),
      _createElementVNode6("div", _hoisted_4, [
        _ctx.$slots.right ? _renderSlot3(_ctx.$slots, "right", { key: 0 }) : (_openBlock8(), _createElementBlock7(_Fragment, { key: 1 }, [
          _ctx.rightButtons.length > 0 ? (_openBlock8(), _createBlock3(_component_ButtonGroup, {
            key: 0,
            class: "ak-nav-bar_button-group",
            shape: _ctx.iconOnly ? "square" : "rectangle",
            pattern: "borderless"
          }, {
            default: _withCtx(() => [
              (_openBlock8(true), _createElementBlock7(_Fragment, null, _renderList(_ctx.rightButtons, (item, index) => {
                return _openBlock8(), _createBlock3(_component_Button, {
                  class: "ak-nav-bar_button",
                  type: item.type || "default",
                  icon: item.icon,
                  key: index,
                  transparent: "",
                  onClick: ($event) => _ctx.onRightIconClick($event, item, index)
                }, {
                  default: _withCtx(() => [
                    _createTextVNode2(_toDisplayString(item.text), 1)
                  ]),
                  _: 2
                }, 1032, ["type", "icon", "onClick"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["shape"])) : _createCommentVNode2("v-if", true)
        ], 2112))
      ])
    ])
  ]);
}
_sfc_script8.render = render8;
_sfc_script8.__file = "packages/ui/src/NavBar/NavBar.vue";

// packages/ui/src/NavBar/index.ts
var install3 = withInstall(_sfc_script8);
var NavBar_default = _sfc_script8;

// packages/ui/src/popup/use-popup.ts
import { computed as computed5, onMounted as onMounted3, ref as ref4, watch as watch2, inject as inject4 } from "vue";

// packages/ui/src/helpers/layer.ts
var popupZIndex = 2e3;
var widgetZIndex = 1e3;

// packages/ui/src/popup/util.ts
var VISIBLE_STATE_TYPES = [
  "show",
  "shown",
  "hide",
  "hidden"
];
var zIndex = popupZIndex;
function getNewZIndex() {
  return zIndex++;
}
function getPopupStyles(zIndex2, absTop, isShow) {
  const styles = {
    zIndex: zIndex2
  };
  if (absTop != null) {
    styles.top = absTop + "px";
    styles.position = "absolute";
  }
  if (!isShow) {
    styles.display = "none";
  }
  return styles;
}

// packages/ui/src/popup/use-popup.ts
function useApiHook(emit) {
  const apis = inject4("akApis", {});
  const emitHook = (event, res) => {
    apis.in ? apis.in(event, res) : emit(event, res);
  };
  function cancelHook(customCancel) {
    apis.out && apis.out("customCancel", customCancel);
  }
  return {
    emitHook,
    cancelHook
  };
}
function usePopup(props, ctx, useOptions) {
  const { emitHook, cancelHook } = useApiHook(ctx.emit);
  const isShow = ref4(false);
  const zIndex2 = ref4(popupZIndex);
  const visible2 = ref4(false);
  const absTop = ref4(null);
  const position = ref4(null);
  let isShowing = false;
  let isHiding = false;
  let visibleTimer;
  let forbidScroll = !(useOptions.initialForbidScroll === false);
  let enableBlurCancel = !!useOptions.initialEnableBlurCancel;
  function setForbidScroll(isForbid) {
    forbidScroll = isForbid;
  }
  function setEnableBlurCancel(enable) {
    enableBlurCancel = enable;
  }
  function doShow(callback) {
    if (isShowing || isShow.value) {
      return false;
    }
    isHiding = false;
    isShowing = true;
    clearTimeout(visibleTimer);
    if (forbidScroll) {
      addClassName(document.body, "ak-overflow-hidden");
    } else {
      position.value = "absolute";
      absTop.value = getScrollTop();
    }
    zIndex2.value = getNewZIndex();
    isShow.value = true;
    visibleTimer = window.setTimeout(() => {
      visible2.value = true;
      visibleTimer = window.setTimeout(() => {
        isShowing = false;
        callback();
      }, 210);
    }, 17);
    if (!props.visible) {
      emitHook("update:visible", true);
    }
    return true;
  }
  function show() {
    const isSuccess = doShow(() => {
      emitVisibleState("shown");
    });
    if (isSuccess) {
      emitVisibleState("show");
      afterCall("afterShow");
    }
  }
  function _doHide(callback) {
    if (isHiding || !isShow.value) {
      return false;
    }
    isHiding = true;
    isShowing = false;
    removeClassName(document.body, "ak-overflow-hidden");
    visible2.value = false;
    clearTimeout(visibleTimer);
    visibleTimer = window.setTimeout(() => {
      isShow.value = false;
      isHiding = false;
      position.value = null;
      absTop.value = null;
      callback && typeof callback === "function" && callback();
    }, 210);
    if (props.visible) {
      emitHook("update:visible", false);
    }
    return true;
  }
  function hide(lifeName) {
    const isSuccess = _doHide(() => {
      emitVisibleState("hidden");
      afterCall("afterHidden");
    });
    if (isSuccess) {
      lifeName && afterCall(lifeName);
      emitVisibleState("hide");
    }
  }
  function afterCall(lifeName) {
    if (typeof useOptions[lifeName] === "function") {
      ;
      useOptions[lifeName]();
    }
  }
  function emitVisibleState(state) {
    emitHook("visibleStateChange", {
      state
    });
  }
  function onMaskClick() {
    if (!props.maskClosable) {
      return;
    }
    customCancel("maskClick");
  }
  function onCloseClick() {
    customCancel("closeClick", true);
  }
  function onCancelClick() {
    customCancel("cancelClick");
  }
  const customCancel = (key, focus = false) => {
    if (isShowing && !focus) {
      return;
    }
    emitHook("cancel", { source: key });
    hide("afterCancel");
  };
  const customConfirm = (detail) => {
    emitHook("confirm", detail);
    hide("afterConfirm");
  };
  useBlur(() => {
    if (enableBlurCancel && isShow.value) {
      customCancel("blur");
    }
  });
  onMounted3(() => {
    props.visible && show();
  });
  const popupStyles = computed5(() => getPopupStyles(zIndex2.value, absTop.value, isShow.value));
  const popupClasses = computed5(() => ["ak-popup", { visible: visible2.value }]);
  watch2(() => props.visible, (val) => {
    val ? show() : hide();
  });
  cancelHook(customCancel);
  return {
    isShow,
    visible2,
    zIndex: zIndex2,
    popupClasses,
    popupStyles,
    show,
    hide,
    customConfirm,
    customCancel,
    noop,
    onMaskClick,
    onCloseClick,
    onCancelClick,
    setEnableBlurCancel,
    setForbidScroll
  };
}
function usePopupExtend(ctx) {
  const popup = ref4();
  const { emitHook, cancelHook } = useApiHook(ctx.emit);
  const customCancel = (key, focus = false) => {
    popup.value && popup.value.customCancel(key, focus);
  };
  const customConfirm = (detail) => {
    popup.value && popup.value.customConfirm(detail);
  };
  const onVisibleStateChange = (e) => {
    emitHook("visibleStateChange", e);
  };
  function onCancelClick() {
    customCancel("cancelClick");
  }
  const onCancel = (res) => {
    emitHook("cancel", res);
  };
  function onConfirm(res) {
    emitHook("confirm", res);
  }
  function onUpdateVisible(value) {
    emitHook("update:visible", value);
  }
  cancelHook(customCancel);
  return {
    popup,
    customCancel,
    customConfirm,
    onUpdateVisible,
    onVisibleStateChange,
    onCancelClick,
    onCancel,
    onConfirm
  };
}

// packages/ui/src/popup/popup.ts
var popupProps = {
  visible: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  }
};
var popupEmits = {
  visibleStateChange: (payload) => payload && VISIBLE_STATE_TYPES.includes(payload.state),
  "update:visible": (visible) => typeof visible === "boolean",
  cancel: (payload) => payload && typeof payload.source === "string",
  confirm: (payload) => !!payload
};
var popupExtendProps = {
  visible: {
    type: Boolean,
    default: false
  }
};

// packages/ui/src/hooks/use-safe-area-insets.ts
var import_safe_area_insets = __toESM(require_out());
import { onMounted as onMounted4, reactive, onBeforeUnmount as onBeforeUnmount3 } from "vue";
function useSafeAreaInsets(enable) {
  const data = reactive({
    support: import_safe_area_insets.default.support,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  function updateSafeAreaInsets() {
    if (enable) {
      data.top = import_safe_area_insets.default.top;
      data.left = import_safe_area_insets.default.left;
      data.right = import_safe_area_insets.default.right;
      data.bottom = import_safe_area_insets.default.bottom;
    } else {
      data.top = 0;
      data.left = 0;
      data.right = 0;
      data.bottom = 0;
    }
  }
  onMounted4(() => import_safe_area_insets.default.onChange(updateSafeAreaInsets));
  onBeforeUnmount3(() => import_safe_area_insets.default.offChange(updateSafeAreaInsets));
  return { safeAreaInsets: data };
}

// vue:./CloseOutlined.vue
import { createElementVNode as _createElementVNode7, openBlock as _openBlock9, createElementBlock as _createElementBlock8 } from "vue";
var _sfc_script9 = {};
var _hoisted_17 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_26 = /* @__PURE__ */ _createElementVNode7("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1);
var _hoisted_35 = [
  _hoisted_26
];
function render9(_ctx, _cache) {
  return _openBlock9(), _createElementBlock8("svg", _hoisted_17, _hoisted_35);
}
_sfc_script9.render = render9;
_sfc_script9.__file = "packages/ui/src/Icon/icons/CloseOutlined/CloseOutlined.vue";

// packages/ui/src/Drawer/util.ts
var getClasses = (showMask) => [
  "ak-drawer",
  { "no--mask": !showMask }
];
var getInnerStyles = ({
  placement,
  safeAreaInsets: safeAreaInsets2
}) => {
  const _placement = getEnumsValue(PLACEMENT_TYPES, placement);
  let left = safeAreaInsets2.left;
  let top = safeAreaInsets2.top;
  let right = safeAreaInsets2.right;
  let bottom = safeAreaInsets2.bottom;
  if (_placement === "top") {
    bottom = 0;
  } else if (_placement === "bottom") {
    top = 0;
  } else if (_placement === "left") {
    right = 0;
  } else if (_placement === "right") {
    left = 0;
  }
  return {
    padding: top + "px " + right + "px " + bottom + "px " + left + "px"
  };
};
var getInnerClasses = ({
  placement,
  hasHeader
}) => [
  "ak-drawer_inner",
  "ak-horizontal-hairline",
  "placement--" + getEnumsValue(PLACEMENT_TYPES, placement),
  {
    "has--header": hasHeader
  }
];

// vue:./Drawer.vue
import { createElementVNode as _createElementVNode8, renderSlot as _renderSlot4, resolveComponent as _resolveComponent3, openBlock as _openBlock10, createBlock as _createBlock4, createCommentVNode as _createCommentVNode3, normalizeClass as _normalizeClass4, normalizeStyle as _normalizeStyle3, mergeProps as _mergeProps, Teleport as _Teleport } from "vue";
var _sfc_script10 = defineComponent6({
  name: "ak-drawer",
  components: { NavBar: _sfc_script8 },
  props: {
    ...popupProps,
    title: {
      type: String,
      default: null
    },
    placement: {
      type: String,
      validator: createEnumsValidator(PLACEMENT_TYPES),
      default: getEnumsValue(PLACEMENT_TYPES)
    },
    showClose: {
      type: Boolean,
      default: false
    },
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {});
    const { safeAreaInsets: safeAreaInsets2 } = useSafeAreaInsets(toRef(props, "enableSafeAreaInsets"));
    const hasHeader = computed6(() => !!(props.title || props.showClose || ctx.slots.header));
    const innerStyles = computed6(() => getInnerStyles({
      placement: props.placement,
      safeAreaInsets: safeAreaInsets2
    }));
    function onHeaderRightClick() {
      if (props.showClose) {
        popup.onCloseClick();
      }
    }
    watch3(() => props.showMask, (val) => popup.setEnableBlurCancel(!val), { immediate: true });
    const classes = computed6(() => getClasses(props.showMask));
    const innerClasses = computed6(() => getInnerClasses({
      placement: props.placement,
      hasHeader: hasHeader.value
    }));
    return {
      ...popup,
      classes,
      innerClasses,
      hasHeader,
      innerStyles,
      onHeaderRightClick,
      CloseOutlined: _sfc_script9
    };
  }
});
var _hoisted_18 = { class: "ak-drawer_body" };
function render10(_ctx, _cache) {
  const _component_NavBar = _resolveComponent3("NavBar");
  return _openBlock10(), _createBlock4(_Teleport, { to: "body" }, [
    _createElementVNode8("div", _mergeProps({
      class: [_ctx.popupClasses, _ctx.classes],
      style: _ctx.popupStyles
    }, _ctx.$attrs), [
      _createElementVNode8("div", {
        class: "ak-mask",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onMaskClick && _ctx.onMaskClick(...args))
      }),
      _createElementVNode8("div", {
        class: _normalizeClass4(_ctx.innerClasses),
        style: _normalizeStyle3(_ctx.innerStyles)
      }, [
        _renderSlot4(_ctx.$slots, "header", {}, () => [
          _ctx.hasHeader ? (_openBlock10(), _createBlock4(_component_NavBar, {
            key: 0,
            class: "ak-drawer_header",
            title: _ctx.title,
            rightButtons: _ctx.showClose ? [{ icon: _ctx.CloseOutlined, text: "close" }] : [],
            iconOnly: true,
            onRightButtonClick: _ctx.onHeaderRightClick
          }, null, 8, ["title", "rightButtons", "onRightButtonClick"])) : _createCommentVNode3("v-if", true)
        ]),
        _createElementVNode8("div", _hoisted_18, [
          _renderSlot4(_ctx.$slots, "default")
        ])
      ], 6)
    ], 16)
  ]);
}
_sfc_script10.render = render10;
_sfc_script10.__file = "packages/ui/src/Drawer/Drawer.vue";

// packages/ui/src/Drawer/index.ts
var install4 = withInstall(_sfc_script10);
var Drawer_default = _sfc_script10;

// packages/ui/src/ActionSheet/util.ts
var getOptions = (options) => {
  const newOptions = [];
  if (Array.isArray(options)) {
    options.forEach((v) => {
      newOptions.push(isObject(v) ? cloneData(v) : {
        name: v.toString()
      });
    });
  }
  return newOptions;
};
var getItemClasses = (option) => {
  return [
    "ak-action-sheet_item",
    "ak-horizontal-hairline",
    { disabled: !!option.disabled, highlight: !!option.highlight }
  ];
};

// vue:./ActionSheet.vue
import { renderList as _renderList2, Fragment as _Fragment2, openBlock as _openBlock11, createElementBlock as _createElementBlock9, toDisplayString as _toDisplayString2, createElementVNode as _createElementVNode9, createCommentVNode as _createCommentVNode4, normalizeClass as _normalizeClass5, resolveComponent as _resolveComponent4, withCtx as _withCtx2, createBlock as _createBlock5 } from "vue";
var confirmValidator = (payload) => payload && typeof payload.index === "number" && payload.item && typeof payload.item.name === "string";
var _sfc_script11 = defineComponent7({
  name: "ak-action-sheet",
  components: { Drawer: _sfc_script10 },
  props: {
    ...popupExtendProps,
    title: {
      type: String,
      default: null
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    ...popupEmits,
    confirm: confirmValidator
  },
  setup(props, ctx) {
    const { locale } = useLocale();
    const popup = usePopupExtend(ctx);
    function onItemClick(index) {
      popup.customConfirm({
        index,
        item: {
          name: props.options[index].name
        }
      });
    }
    const options2 = computed7(() => getOptions(props.options));
    return {
      ...popup,
      options2,
      onItemClick,
      locale,
      getItemClasses
    };
  }
});
var _hoisted_19 = { class: "ak-action-sheet_list" };
var _hoisted_27 = ["onClick"];
var _hoisted_36 = { class: "ak-action-sheet_item-inner" };
var _hoisted_42 = { key: 0 };
var _hoisted_5 = {
  key: 0,
  class: "ak-action-sheet_list"
};
var _hoisted_6 = { class: "ak-action-sheet_item-inner align--center" };
function render11(_ctx, _cache) {
  const _component_Drawer = _resolveComponent4("Drawer");
  return _openBlock11(), _createBlock5(_component_Drawer, {
    class: "ak-action-sheet",
    title: _ctx.title,
    placement: "bottom",
    visible: _ctx.visible,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onConfirm: _ctx.onConfirm,
    onCancel: _ctx.onCancel,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx2(() => [
      _createElementVNode9("ul", _hoisted_19, [
        (_openBlock11(true), _createElementBlock9(_Fragment2, null, _renderList2(_ctx.options2, (item, index) => {
          return _openBlock11(), _createElementBlock9("li", {
            class: _normalizeClass5(_ctx.getItemClasses(item)),
            key: index,
            onClick: ($event) => _ctx.onItemClick(index)
          }, [
            _createElementVNode9("div", _hoisted_36, [
              _createElementVNode9("span", null, _toDisplayString2(item.name), 1),
              item.description ? (_openBlock11(), _createElementBlock9("small", _hoisted_42, _toDisplayString2(item.description), 1)) : _createCommentVNode4("v-if", true)
            ])
          ], 10, _hoisted_27);
        }), 128))
      ]),
      _ctx.showCancel ? (_openBlock11(), _createElementBlock9("ul", _hoisted_5, [
        _createElementVNode9("li", {
          class: "ak-action-sheet_item ak-horizontal-hairline",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancelClick && _ctx.onCancelClick(...args))
        }, [
          _createElementVNode9("div", _hoisted_6, [
            _createElementVNode9("span", null, _toDisplayString2(_ctx.cancelText || _ctx.locale.actionSheetCancelText), 1)
          ])
        ])
      ])) : _createCommentVNode4("v-if", true)
    ]),
    _: 1
  }, 8, ["title", "visible", "onVisibleStateChange", "onConfirm", "onCancel", "onUpdate:visible"]);
}
_sfc_script11.render = render11;
_sfc_script11.__file = "packages/ui/src/ActionSheet/ActionSheet.vue";

// packages/ui/src/popup/api.ts
import { createApp } from "vue";

// packages/ui/src/apis/callback.ts
function getCallbackFns(options) {
  return {
    success: typeof options.success === "function" ? options.success : noop.bind(options),
    fail(error) {
      if (typeof options.fail === "function") {
        ;
        options.fail(new exception_default(error));
      } else {
        console.error(error);
      }
    },
    complete: typeof options.complete === "function" ? options.complete : noop.bind(options)
  };
}

// packages/ui/src/popup/api.ts
var $refs = {};
function createShowPopup({
  apiName,
  createHook,
  component,
  singleMode,
  hookOptions
}) {
  return function show(object) {
    let options;
    if (typeof object === "string") {
      options = {
        title: object
      };
    } else if (!isObject(object)) {
      options = {};
    } else {
      options = object;
    }
    if (hookOptions) {
      options = hookOptions(options);
    }
    const { success, fail, complete } = getCallbackFns(options);
    return new Promise(function(resolve, reject) {
      try {
        const key = apiName.replace("show", "");
        const hook = createHook(function(res) {
          success(res);
          complete();
          resolve(res);
        });
        singleMode && clear(key);
        const fns = {};
        const propsData = {};
        objectForEach(options, (v, k) => {
          if (!["success", "fail", "complete"].includes(k)) {
            if (k === "mode") {
              propsData.initialMode = v;
            } else if (k === "value") {
              propsData.modelValue = v;
            } else {
              propsData[k] = v;
            }
          }
        });
        const app = createApp(component, Object.assign(propsData, {
          visible: true
        }));
        app.provide("akApis", {
          in(hookEvent, res) {
            if (hookEvent === "visibleStateChange" && res.state === "hidden") {
              app.unmount();
              singleMode && remove(key, $ref.uid);
            }
            hook && hook(hookEvent, res);
          },
          out(key2, value) {
            fns[key2] = value;
          }
        });
        if (typeof document !== "undefined") {
          app.mount(document.createElement("div"));
        }
        const $ref = {
          uid: app._uid,
          fns
        };
        singleMode && ($refs[key] = $ref);
        return app;
      } catch (e) {
        fail(new exception_default(e));
        complete();
        reject(new exception_default(e));
      }
    });
  };
}
function clear(key) {
  if ($refs[key]) {
    const fns = $refs[key].fns;
    fns.customCancel && fns.customCancel("clear", true);
    delete $refs[key];
  }
}
function remove(key, uid3) {
  if ($refs[key] && $refs[key].uid === uid3) {
    delete $refs[key];
  }
}
function createHidePopup({ apiName }) {
  return function hide(object) {
    const { success, fail, complete } = getCallbackFns(isObject(object) ? object : {});
    return new Promise((resolve, reject) => {
      try {
        clear(apiName.replace("hide", ""));
        success({});
        complete();
        resolve({});
      } catch (e) {
        fail(new exception_default(e));
        complete();
        reject(new exception_default(e));
      }
    });
  };
}
function createConfirmHook(done) {
  const hook = (hookEvent, args) => {
    if (hookEvent === "cancel") {
      done({
        cancel: true,
        ...args
      });
    } else if (hookEvent === "confirm") {
      done({
        confirm: true,
        detail: args
      });
    }
  };
  return hook;
}
function createAlertHook(done) {
  const hook = (hookEvent, args) => {
    if (hookEvent === "visibleStateChange" && args.state === "shown") {
      done({});
    }
  };
  return hook;
}

// packages/ui/src/ActionSheet/index.ts
var showActionSheet = createShowPopup({
  apiName: "showActionSheet",
  component: _sfc_script11,
  createHook: createConfirmHook
});
var ActionSheet_default = _sfc_script11;
var install5 = withInstall(_sfc_script11);

// vue:./ActivityIndicator.vue
import { computed as computed9, defineComponent as defineComponent9 } from "vue";

// vue:./LoadingIcon.vue
import { computed as computed8, defineComponent as defineComponent8 } from "vue";

// packages/ui/src/LoadingIcon/util.ts
var DEFAULT_SIZE = 100;
var DEFAULT_STROKE_WIDTH = 5.37;
var getRealStrokeWidth = (props) => {
  return getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH) / getNumber(props.size, DEFAULT_SIZE) * 896;
};

// vue:./LoadingIcon.vue
import { normalizeStyle as _normalizeStyle4, createElementVNode as _createElementVNode10, openBlock as _openBlock12, createElementBlock as _createElementBlock10 } from "vue";
var _sfc_script12 = defineComponent8({
  name: "ak-loading-icon",
  props: {
    rate: {
      type: Number,
      default: 0,
      required: true
    },
    size: {
      type: [Number, String],
      default: 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 5.37
    },
    color: {
      type: String,
      validator: colorValidator
    },
    backgroundColor: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const nStrokeWidth = computed8(() => getRealStrokeWidth(props));
    return {
      nStrokeWidth
    };
  }
});
var _hoisted_110 = ["height", "width"];
var _hoisted_28 = ["stroke-width"];
var _hoisted_37 = ["stroke", "stroke-dasharray", "stroke-width"];
function render12(_ctx, _cache) {
  return _openBlock12(), _createElementBlock10("svg", {
    class: "ak-loading-icon",
    height: _ctx.size,
    width: _ctx.size,
    viewBox: "0 0 1024 1024"
  }, [
    _createElementVNode10("circle", {
      class: "ak-loading-icon_track",
      r: "448",
      cx: "512",
      cy: "512",
      "stroke-width": _ctx.nStrokeWidth,
      fill: "none",
      style: _normalizeStyle4({ stroke: _ctx.backgroundColor })
    }, null, 12, _hoisted_28),
    _createElementVNode10("circle", {
      class: "ak-loading-icon_thumb",
      r: "448",
      cx: "512",
      cy: "512",
      stroke: _ctx.color,
      "stroke-dasharray": 314 * 8.96 * _ctx.rate + "," + 314 * 8.96,
      "stroke-width": _ctx.nStrokeWidth,
      fill: "none",
      transform: "rotate(-90,512,512)",
      "stroke-linecap": "round",
      style: _normalizeStyle4({ stroke: _ctx.color })
    }, null, 12, _hoisted_37)
  ], 8, _hoisted_110);
}
_sfc_script12.render = render12;
_sfc_script12.__file = "packages/ui/src/LoadingIcon/LoadingIcon.vue";

// packages/ui/src/LoadingIcon/index.ts
var LoadingIcon_default = _sfc_script12;
var install6 = withNoopInstall(_sfc_script12);

// packages/ui/src/ActivityIndicator/util.ts
var getActivityIndicatorClasses = (animated) => {
  return ["ak-activity-indicator", { animated: !!animated }];
};

// vue:./ActivityIndicator.vue
import { resolveComponent as _resolveComponent5, normalizeClass as _normalizeClass6, openBlock as _openBlock13, createBlock as _createBlock6 } from "vue";
var DEFAULT_SIZE2 = 20;
var _sfc_script13 = defineComponent9({
  name: "ak-activity-indicator",
  components: { LoadingIcon: _sfc_script12 },
  props: {
    animated: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: DEFAULT_SIZE2
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const classes = computed9(() => {
      return getActivityIndicatorClasses(props.animated);
    });
    const nSize = computed9(() => {
      return getNumber(props.size, DEFAULT_SIZE2);
    });
    return {
      classes,
      nSize
    };
  }
});
function render13(_ctx, _cache) {
  const _component_LoadingIcon = _resolveComponent5("LoadingIcon");
  return _openBlock13(), _createBlock6(_component_LoadingIcon, {
    class: _normalizeClass6(_ctx.classes),
    size: _ctx.nSize,
    rate: 0.2,
    strokeWidth: 0.0537 * _ctx.nSize,
    color: _ctx.color
  }, null, 8, ["class", "size", "rate", "strokeWidth", "color"]);
}
_sfc_script13.render = render13;
_sfc_script13.__file = "packages/ui/src/ActivityIndicator/ActivityIndicator.vue";

// packages/ui/src/ActivityIndicator/index.ts
var install7 = withInstall(_sfc_script13);
var ActivityIndicator_default = _sfc_script13;

// vue:./Avatar.vue
import { defineComponent as defineComponent12, computed as computed12 } from "vue";

// vue:./Badge.vue
import { computed as computed10, defineComponent as defineComponent10, ref as ref5, watch as watch4 } from "vue";

// packages/ui/src/Badge/util.ts
function handleBadge(badge) {
  if (isStringNumberMix(badge)) {
    return {
      content: badge
    };
  } else if (isObject(badge)) {
    return badge;
  } else {
    return {};
  }
}
var getClasses2 = (props) => {
  return [
    "ak-badge",
    {
      animated: !!props.animated
    }
  ];
};
var getBadgeClasses = (props) => {
  return [
    "ak-badge_badge",
    {
      dot: !!props.dot
    }
  ];
};
var getBadgeStyles = (props) => {
  const offset = props.offset || [0, 0];
  const styles = {
    transform: `translate3d(50%, -50%, 0px) scale(${typeof props.content === "string" && props.content || props.showZero || props.content && props.content > 0 ? 1 : 0})`,
    right: `${-offset[0]}px`,
    top: `${offset[1]}px`
  };
  const colorObj = getColorObject(props.color);
  if (colorObj.hasColor) {
    styles[`--ak-color`] = colorObj.varBackgroundColor;
    styles[`--ak-front-color`] = colorObj.varFrontColor;
  }
  return styles;
};
var DEFAULT_MAX_COUNT = 99;
var getDefaultContent = (props) => {
  return isString(props.content) ? props.content : isNumber(props.content) ? rangeInteger(props.content, 0, getNumber(props.maxCount, DEFAULT_MAX_COUNT)) : 0;
};
var getShowContent = (props, content) => {
  if (typeof content === "string") {
    return content;
  }
  if (props.content != null && props.maxCount != null && props.content > props.maxCount && content === props.maxCount) {
    return content + "+";
  }
  return content.toString();
};

// packages/ui/src/hooks/use-frame-task.ts
import { onBeforeUnmount as onBeforeUnmount4 } from "vue";

// packages/ui/src/helpers/animation.ts
var Easing = {
  linear(p) {
    return p;
  },
  swing(p) {
    return 0.5 - Math.cos(p * Math.PI) / 2;
  }
};
var uid = 0;
var FrameTask = class {
  constructor(ref56, id) {
    this.stop = function() {
      if (ref56.idle) {
        cancelAnimationFrame(ref56.idle);
        ref56.idle = null;
        ref56.done();
        return true;
      }
      return false;
    };
    this.id = id;
  }
};
function frameTo(options) {
  const { from, to, duration, progress, complete, easing } = options;
  const start = Date.now();
  const end = start + duration;
  const id = ++uid;
  function done() {
    complete && complete({ current, id });
  }
  const ref56 = { idle: null, id, done };
  let frameIndex = 0;
  let current = from;
  function step2() {
    ref56.idle = requestAnimationFrame(function() {
      const t = Date.now();
      if (t >= end) {
        current = to;
        progress({
          current,
          frameIndex: ++frameIndex,
          id
        });
        done();
      } else {
        const p = Easing[easing || "swing"]((t - start) / duration);
        current = from + (to - from) * p;
        progress({
          current,
          frameIndex: ++frameIndex,
          id
        });
        step2();
      }
    });
  }
  progress({
    current,
    frameIndex,
    id
  });
  step2();
  return new FrameTask(ref56, id);
}
function getStretchOffset2(offset) {
  return Math.ceil(offset / Math.log(Math.abs(offset)));
}

// packages/ui/src/hooks/use-frame-task.ts
function useFrameTask() {
  let task = null;
  function frameStop() {
    task && task.stop();
    task = null;
  }
  function frameStart(options) {
    frameStop();
    task = frameTo(options);
  }
  function getRunFrameTaskId() {
    var _a;
    return (_a = task == null ? void 0 : task.id) != null ? _a : null;
  }
  onBeforeUnmount4(frameStop);
  return { frameStart, frameStop, getRunFrameTaskId };
}

// vue:./Badge.vue
import { renderSlot as _renderSlot5, toDisplayString as _toDisplayString3, createTextVNode as _createTextVNode3, normalizeClass as _normalizeClass7, normalizeStyle as _normalizeStyle5, openBlock as _openBlock14, createElementBlock as _createElementBlock11, createCommentVNode as _createCommentVNode5 } from "vue";
var _sfc_script14 = defineComponent10({
  name: "ak-badge",
  props: {
    content: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    },
    showZero: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Array,
      default: () => {
        return [0, 0];
      }
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const content2 = ref5(getDefaultContent(props));
    const { frameStart, frameStop } = useFrameTask();
    const classes = computed10(() => getClasses2(props));
    const badgeClasses = computed10(() => getBadgeClasses(props));
    const badgeStyles = computed10(() => getBadgeStyles(props));
    const showCount = computed10(() => getShowContent(props, content2.value));
    watch4([() => props.content, () => props.maxCount], ([val, max]) => {
      frameStop();
      if (typeof val === "string") {
        content2.value = val;
        return;
      }
      if (!isNumber(val)) {
        return;
      }
      const currentIsShow = props.showZero || content2.value > 0;
      const isReadyToHide = !props.showZero && val === 0;
      if (!currentIsShow || isReadyToHide) {
        content2.value = val;
      } else {
        const to = rangeInteger(val, 0, getNumber(max, DEFAULT_MAX_COUNT));
        if (to === content2.value) {
          return;
        }
        if (!props.animated) {
          content2.value = to;
          return;
        }
        frameStart({
          from: content2.value,
          to,
          duration: Math.min(Math.abs(to - content2.value) * 50, 1e3),
          progress: ({
            current,
            frameIndex
          }) => {
            if (frameIndex % 3 === 0) {
              content2.value = Math.round(current);
            }
          },
          complete: ({ current }) => {
            content2.value = current;
          }
        });
      }
    });
    return {
      showCount,
      classes,
      badgeClasses,
      badgeStyles
    };
  }
});
function render14(_ctx, _cache) {
  return _openBlock14(), _createElementBlock11("div", {
    class: _normalizeClass7(_ctx.classes)
  }, [
    _renderSlot5(_ctx.$slots, "default"),
    _ctx.content != null ? (_openBlock14(), _createElementBlock11("div", {
      key: 0,
      class: _normalizeClass7(_ctx.badgeClasses),
      style: _normalizeStyle5(_ctx.badgeStyles)
    }, [
      _renderSlot5(_ctx.$slots, "badge", { showCount: _ctx.showCount }, () => [
        _createTextVNode3(_toDisplayString3(_ctx.showCount), 1)
      ])
    ], 6)) : _createCommentVNode5("v-if", true)
  ], 2);
}
_sfc_script14.render = render14;
_sfc_script14.__file = "packages/ui/src/Badge/Badge.vue";

// packages/ui/src/Badge/index.ts
var install8 = withInstall(_sfc_script14);
var Badge_default = _sfc_script14;

// vue:./Image.vue
import {
  defineComponent as defineComponent11,
  onMounted as onMounted5,
  ref as ref6,
  watch as watch5,
  onBeforeUnmount as onBeforeUnmount5,
  computed as computed11
} from "vue";

// packages/ui/src/Image/load-image.ts
var DEFAULT_EVENTS = [
  "scroll",
  "wheel",
  "mousewheel",
  "resize",
  "animationend",
  "transitionend",
  "touchmove"
];
var LAZY_PRELOAD = 1.3;
function withCheckInView($el) {
  return function checkInView() {
    const { top, right, bottom, left } = $el.getBoundingClientRect();
    return top < window.innerHeight * LAZY_PRELOAD && bottom > 0 && left < window.innerWidth * LAZY_PRELOAD && right > 0;
  };
}
function loadNow(vm) {
  loadImageAsync(vm, (res) => {
    if (!vm.done) {
      vm.done = true;
      vm.onLoad(res);
    }
  }, (e) => {
    if (!vm.done) {
      vm.done = true;
      vm.onError(e);
    }
  });
}
function loadImageAsync(item, resolve, reject) {
  const image = new Image();
  if (!item || !item.src) {
    const err = new exception_default("src is required", exception_default.TYPE.DEFAULT, "Image");
    return reject(err);
  }
  image.src = item.src;
  image.onload = function(e) {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: item.src,
      event: e
    });
  };
  image.onerror = function() {
    reject(new exception_default(`src "${item.src}" not found`, exception_default.TYPE.DEFAULT, "Image"));
  };
}
var ListenerQueue = [];
function lazyCheck(vm) {
  if (vm.checkInView()) {
    loadImageAsync(vm, (res) => {
      if (!vm.done) {
        removeComponentFromLazy(vm.uid);
        vm.onLoad(res);
      }
    }, (e) => {
      if (!vm.done) {
        removeComponentFromLazy(vm.uid);
        vm.onError(e);
      }
    });
  }
}
function removeComponentFromLazy(uid3) {
  const index = lazyQueueIndexOf(uid3);
  if (index > -1) {
    const [vm] = ListenerQueue.splice(index, 1);
    vm.done = true;
  }
  if (ListenerQueue.length === 0) {
    clearTimeout(offTimer);
    offTimer = window.setTimeout(off, 1e3);
  }
}
function lazyQueueIndexOf(uid3) {
  for (let i = 0; i < ListenerQueue.length; i++) {
    if (ListenerQueue[i].uid === uid3) {
      return i;
    }
  }
  return -1;
}
function addLazyQueue(vm) {
  const index = lazyQueueIndexOf(vm.uid);
  if (index === -1) {
    ListenerQueue.push(vm);
  } else {
    ListenerQueue[index] = vm;
  }
  lazyCheck(vm);
  on();
}
function checkQueue() {
  ListenerQueue.forEach((vm) => {
    lazyCheck(vm);
  });
}
var isOn = false;
var offTimer;
function on() {
  clearTimeout(offTimer);
  if (!isOn) {
    DEFAULT_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, checkQueue, false);
    });
  }
}
function off() {
  if (ListenerQueue.length === 0) {
    DEFAULT_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, checkQueue, false);
    });
    isOn = false;
  }
}

// vue:./ImageOutlined.vue
import { createElementVNode as _createElementVNode11, openBlock as _openBlock15, createElementBlock as _createElementBlock12 } from "vue";
var _sfc_script15 = {};
var _hoisted_111 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_29 = /* @__PURE__ */ _createElementVNode11("path", { d: "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" }, null, -1);
var _hoisted_38 = /* @__PURE__ */ _createElementVNode11("path", { d: "M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" }, null, -1);
var _hoisted_43 = [
  _hoisted_29,
  _hoisted_38
];
function render15(_ctx, _cache) {
  return _openBlock15(), _createElementBlock12("svg", _hoisted_111, _hoisted_43);
}
_sfc_script15.render = render15;
_sfc_script15.__file = "packages/ui/src/Icon/icons/ImageOutlined/ImageOutlined.vue";

// vue:./ImageBreakOutlined.vue
import { createElementVNode as _createElementVNode12, openBlock as _openBlock16, createElementBlock as _createElementBlock13 } from "vue";
var _sfc_script16 = {};
var _hoisted_112 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_210 = /* @__PURE__ */ _createElementVNode12("path", { d: "M304,280c-48.6,0-88,39.4-88,88c0,48.6,39.4,88,88,88s88-39.4,88-88C392,319.4,352.6,280,304,280z M928,160H525.3l-58,72H888v430.2L664.2,396.8c-3.2-3.8-9-3.8-12.2,0l-62.7,74.3l174.9,214.4L624.6,864H928c17.7,0,32-14.3,32-32V192C960,174.3,945.7,160,928,160z M536.8,533.3L424.6,666.4l-144-170.7c-3.2-3.8-9-3.8-12.2,0L136,652.7V232h245.3l58-72H96c-17.7,0-32,14.3-32,32v640c0,17.7,14.3,32,32,32h427l138.8-177.5L536.8,533.3z M304,280c-48.6,0-88,39.4-88,88c0,48.6,39.4,88,88,88s88-39.4,88-88C392,319.4,352.6,280,304,280z M304,280c-48.6,0-88,39.4-88,88c0,48.6,39.4,88,88,88s88-39.4,88-88C392,319.4,352.6,280,304,280z" }, null, -1);
var _hoisted_39 = [
  _hoisted_210
];
function render16(_ctx, _cache) {
  return _openBlock16(), _createElementBlock13("svg", _hoisted_112, _hoisted_39);
}
_sfc_script16.render = render16;
_sfc_script16.__file = "packages/ui/src/Icon/icons/ImageBreakOutlined/ImageBreakOutlined.vue";

// packages/ui/src/Image/util.ts
var MODE_NAMES = [
  "scaleToFill",
  "aspectFit",
  "aspectFill",
  "widthFix",
  "top",
  "bottom",
  "left",
  "right",
  "top left",
  "top right",
  "bottom left",
  "bottom right"
];
var getImgClasses = (mode) => [
  "ak-image_img",
  "mode--" + camelCase2KebabCase(getEnumsValue(MODE_NAMES, mode)).replace(/\s+/g, "-")
];
var getRatioStyles = (aspectRatio) => {
  return {
    paddingTop: getNumber(aspectRatio) * 100 + "%"
  };
};

// vue:./Image.vue
import { normalizeStyle as _normalizeStyle6, openBlock as _openBlock17, createElementBlock as _createElementBlock14, createCommentVNode as _createCommentVNode6, resolveComponent as _resolveComponent6, createVNode as _createVNode, normalizeClass as _normalizeClass8 } from "vue";
var _sfc_script17 = defineComponent11({
  name: "ak-image",
  components: { Icon: _sfc_script2 },
  props: {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      validator: createEnumsValidator(MODE_NAMES)
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    aspectRatio: {
      type: Number,
      default: null
    },
    draggable: {
      type: Boolean,
      default: true
    },
    loadingIcon: {
      type: [String, Object],
      validator: iconValidator,
      default: _sfc_script15
    },
    errorIcon: {
      type: [String, Object],
      validator: iconValidator,
      default: _sfc_script16
    },
    iconSize: {
      type: Number,
      default: null
    }
  },
  emits: {
    load: (payload) => payload && payload.width > 0 && payload.height > 0 && isString(payload.src),
    error: emitErrorValidator
  },
  setup(props, { emit }) {
    const loading = ref6(true);
    const error = ref6(false);
    const root = ref6();
    const currentSrc = ref6(null);
    const uid3 = Symbol();
    function load(src) {
      ;
      (props.lazyLoad ? addLazyQueue : loadNow)({
        src,
        uid: uid3,
        checkInView: withCheckInView(root.value),
        onLoad,
        onError
      });
    }
    const onLoad = (res) => {
      if (res.src === props.src) {
        loading.value = false;
        error.value = false;
        currentSrc.value = res.src;
      }
      emit("load", {
        width: res.naturalWidth,
        height: res.naturalHeight,
        src: res.src
      });
    };
    const onError = (e) => {
      loading.value = false;
      error.value = true;
      emit("error", e);
    };
    function onDrag(e) {
      if (!props.draggable) {
        e.preventDefault();
      }
    }
    onMounted5(() => props.src && load(props.src));
    onBeforeUnmount5(() => removeComponentFromLazy(uid3));
    watch5(() => props.src, (val) => load(val));
    const imgClasses = computed11(() => getImgClasses(props.mode));
    const ratioStyles = computed11(() => getRatioStyles(props.aspectRatio));
    return {
      currentSrc,
      imgClasses,
      ratioStyles,
      loading,
      error,
      root,
      onDrag
    };
  }
});
var _hoisted_113 = {
  class: "ak-image",
  ref: "root"
};
var _hoisted_211 = {
  key: 1,
  class: "ak-image_loading"
};
var _hoisted_310 = {
  key: 2,
  class: "ak-image_error"
};
var _hoisted_44 = ["src"];
function render17(_ctx, _cache) {
  const _component_Icon = _resolveComponent6("Icon");
  return _openBlock17(), _createElementBlock14("div", _hoisted_113, [
    _ctx.aspectRatio != null && _ctx.aspectRatio > 0 ? (_openBlock17(), _createElementBlock14("span", {
      key: 0,
      class: "ak-image_ratio",
      style: _normalizeStyle6(_ctx.ratioStyles)
    }, null, 4)) : _createCommentVNode6("v-if", true),
    _ctx.loading ? (_openBlock17(), _createElementBlock14("i", _hoisted_211, [
      _createVNode(_component_Icon, {
        icon: _ctx.loadingIcon,
        size: _ctx.iconSize
      }, null, 8, ["icon", "size"])
    ])) : _createCommentVNode6("v-if", true),
    _ctx.error ? (_openBlock17(), _createElementBlock14("i", _hoisted_310, [
      _createVNode(_component_Icon, {
        icon: _ctx.errorIcon,
        size: _ctx.iconSize
      }, null, 8, ["icon", "size"])
    ])) : _createCommentVNode6("v-if", true),
    _ctx.currentSrc ? (_openBlock17(), _createElementBlock14("img", {
      key: 3,
      class: _normalizeClass8(_ctx.imgClasses),
      src: _ctx.currentSrc,
      onDragstart: _cache[0] || (_cache[0] = (...args) => _ctx.onDrag && _ctx.onDrag(...args))
    }, null, 42, _hoisted_44)) : _createCommentVNode6("v-if", true)
  ], 512);
}
_sfc_script17.render = render17;
_sfc_script17.__file = "packages/ui/src/Image/Image.vue";

// packages/ui/src/Image/index.ts
var install9 = withInstall(_sfc_script17);
var Image_default = _sfc_script17;

// packages/ui/src/helpers/digital-conversion.ts
var formatFileSize = (number) => {
  const map = [
    [1073741824, "GB"],
    [1048576, "MB"],
    [1024, "KB"],
    [0, "bytes"]
  ];
  let size = 0;
  let unit = "bytes";
  for (let i = 0; i < map.length; i++) {
    if (number >= map[i][0]) {
      size = i < map.length - 1 ? number / map[i][0] : number;
      unit = map[i][1];
      break;
    }
  }
  size = Math.round(size * 10) / 10;
  return size + unit;
};
function simpleNumber(number) {
  if (!isNumber(number)) {
    return "0";
  }
  function toFixed(number2) {
    return number2.toString().substr(0, 4).replace(/\.$/, "");
  }
  number = Math.floor(number);
  if (number > 1e8) {
    number = number / 1e8;
    if (number > 999) {
      return "999y+";
    }
    return toFixed(number) + "y";
  } else if (number > 1e4) {
    return toFixed(number / 1e4) + "w";
  }
  return number.toString();
}
function thousands(number) {
  const str = number.toString();
  return str.replace(str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g, "$1,");
}

// packages/ui/src/Avatar/util.ts
var SIZE_TYPES2 = ["middle", "large", "small"];
var AVATAR_SHAPE_TYPES = ["circle", "square"];
var GENDER_TYPES = ["woman", "man"];
var getAvatarSize = (props, parentProps) => {
  var _a;
  const size = (_a = parentProps == null ? void 0 : parentProps.size) != null ? _a : props.size;
  return isNumber(size) ? size : getEnumsValue(SIZE_TYPES2, size);
};
var getAvatarShape = (props, hasGroup) => getEnumsValue(AVATAR_SHAPE_TYPES, hasGroup ? "circle" : props.shape);
var getGroupClasses2 = (count) => [
  "ak-avatar-group",
  "count--" + (count || 1)
];
var getGroupCountClasses = (showCount) => [
  "ak-avatar-group_count-number",
  "size--" + showCount.length
];
var getShowCount = (count) => simpleNumber(getNumber(count));
var getAvatarClasses = (props, size, shape) => [
  "ak-avatar",
  "size--" + size,
  "shape--" + shape,
  {
    "gender-man": props.gender === "man",
    "gender-woman": props.gender === "woman"
  }
];
var getAvatarStyles = (props, size) => {
  const styles = {};
  if (isNumber(size)) {
    styles.width = size + "px";
    styles.height = size + "px";
    styles.fontSize = size / 2 + "px";
  }
  const colorObj = getColorObject(props.color);
  if (colorObj.hasColor) {
    styles[`--ak-color`] = colorObj.varBackgroundColor;
    styles[`--ak-front-color`] = colorObj.varFrontColor;
  }
  return styles;
};
var getBadgeProps = (props) => {
  let badge;
  if (props.gender && GENDER_TYPES.includes(props.gender)) {
    badge = {
      content: 1
    };
  } else {
    badge = handleBadge(props.badge);
  }
  badge.offset = props.shape === "circle" ? [-5, 5] : [0, 0];
  return badge;
};

// packages/ui/src/Avatar/props.ts
var avatarProps = {
  size: {
    type: [Number, String],
    default: SIZE_TYPES2[0]
  }
};

// vue:./ManOutlined.vue
import { createElementVNode as _createElementVNode13, openBlock as _openBlock18, createElementBlock as _createElementBlock15 } from "vue";
var _sfc_script18 = {};
var _hoisted_114 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_212 = /* @__PURE__ */ _createElementVNode13("path", { d: "M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30zM408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212 212 95.1 212 212-95.1 212-212 212z" }, null, -1);
var _hoisted_311 = [
  _hoisted_212
];
function render18(_ctx, _cache) {
  return _openBlock18(), _createElementBlock15("svg", _hoisted_114, _hoisted_311);
}
_sfc_script18.render = render18;
_sfc_script18.__file = "packages/ui/src/Icon/icons/ManOutlined/ManOutlined.vue";

// vue:./WomanOutlined.vue
import { createElementVNode as _createElementVNode14, openBlock as _openBlock19, createElementBlock as _createElementBlock16 } from "vue";
var _sfc_script19 = {};
var _hoisted_115 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_213 = /* @__PURE__ */ _createElementVNode14("path", { d: "M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8 0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9 7.3 9.4 15.2 18.3 23.7 26.9 8.5 8.5 17.5 16.4 26.8 23.7 39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z" }, null, -1);
var _hoisted_312 = [
  _hoisted_213
];
function render19(_ctx, _cache) {
  return _openBlock19(), _createElementBlock16("svg", _hoisted_115, _hoisted_312);
}
_sfc_script19.render = render19;
_sfc_script19.__file = "packages/ui/src/Icon/icons/WomanOutlined/WomanOutlined.vue";

// vue:./UserOutlined.vue
import { createElementVNode as _createElementVNode15, openBlock as _openBlock20, createElementBlock as _createElementBlock17 } from "vue";
var _sfc_script20 = {};
var _hoisted_116 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_214 = /* @__PURE__ */ _createElementVNode15("path", { d: "M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" }, null, -1);
var _hoisted_313 = [
  _hoisted_214
];
function render20(_ctx, _cache) {
  return _openBlock20(), _createElementBlock17("svg", _hoisted_116, _hoisted_313);
}
_sfc_script20.render = render20;
_sfc_script20.__file = "packages/ui/src/Icon/icons/UserOutlined/UserOutlined.vue";

// packages/ui/src/Avatar/context.ts
import { provide as provide4, inject as inject5 } from "vue";
var KEY2 = "Avatar";
var CONTEXT_KEY3 = `ak${KEY2}GroupOptions`;
function useProvider(props) {
  provide4(CONTEXT_KEY3, props);
  return useChildCountProvider(KEY2);
}
function useConsumer() {
  const groupOptions = inject5(CONTEXT_KEY3, void 0);
  useChildCountConsumer(KEY2);
  return {
    groupOptions
  };
}

// vue:./Avatar.vue
import { renderSlot as _renderSlot6, resolveComponent as _resolveComponent7, createVNode as _createVNode2, openBlock as _openBlock21, createBlock as _createBlock7, createCommentVNode as _createCommentVNode7, mergeProps as _mergeProps2, withCtx as _withCtx3 } from "vue";
var _sfc_script21 = defineComponent12({
  name: "ak-avatar",
  components: { Badge: _sfc_script14, Image: _sfc_script17, Icon: _sfc_script2 },
  props: {
    ...avatarProps,
    shape: {
      type: String,
      validator: createEnumsValidator(AVATAR_SHAPE_TYPES),
      default: null
    },
    src: {
      type: String,
      default: null
    },
    badge: {
      type: [Number, String, Object]
    },
    gender: {
      type: String
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const { groupOptions } = useConsumer();
    const size2 = computed12(() => getAvatarSize(props, groupOptions));
    const shape2 = computed12(() => getAvatarShape(props, !!groupOptions));
    const classes = computed12(() => getAvatarClasses(props, size2.value, shape2.value));
    const styles = computed12(() => getAvatarStyles(props, size2.value));
    const badge2 = computed12(() => getBadgeProps(props));
    return {
      classes,
      styles,
      badge2,
      UserOutlined: _sfc_script20,
      ManOutlined: _sfc_script18,
      WomanOutlined: _sfc_script19
    };
  }
});
function render21(_ctx, _cache) {
  const _component_Image = _resolveComponent7("Image");
  const _component_Icon = _resolveComponent7("Icon");
  const _component_Badge = _resolveComponent7("Badge");
  return _openBlock21(), _createBlock7(_component_Badge, _mergeProps2({
    class: _ctx.classes,
    style: _ctx.styles
  }, { ..._ctx.$attrs, ..._ctx.badge2 }), {
    badge: _withCtx3(() => [
      _ctx.gender === "man" ? (_openBlock21(), _createBlock7(_component_Icon, {
        key: 0,
        icon: _ctx.ManOutlined
      }, null, 8, ["icon"])) : _ctx.gender === "woman" ? (_openBlock21(), _createBlock7(_component_Icon, {
        key: 1,
        icon: _ctx.WomanOutlined
      }, null, 8, ["icon"])) : _createCommentVNode7("v-if", true)
    ]),
    default: _withCtx3(() => [
      _renderSlot6(_ctx.$slots, "default", {}, () => [
        _createVNode2(_component_Image, {
          class: "ak-avatar_image",
          src: _ctx.src,
          mode: "aspectFill",
          loadingIcon: _ctx.UserOutlined
        }, null, 8, ["src", "loadingIcon"])
      ])
    ]),
    _: 3
  }, 16, ["class", "style"]);
}
_sfc_script21.render = render21;
_sfc_script21.__file = "packages/ui/src/Avatar/Avatar.vue";

// vue:./AvatarGroup.vue
import { computed as computed13, defineComponent as defineComponent13 } from "vue";
import { renderSlot as _renderSlot7, toDisplayString as _toDisplayString4, normalizeClass as _normalizeClass9, createElementVNode as _createElementVNode16, resolveComponent as _resolveComponent8, withCtx as _withCtx4, openBlock as _openBlock22, createBlock as _createBlock8, createCommentVNode as _createCommentVNode8, createElementBlock as _createElementBlock18 } from "vue";
var _sfc_script22 = defineComponent13({
  name: "ak-avatar-group",
  components: { Avatar: _sfc_script21 },
  props: {
    ...avatarProps,
    totalCount: {
      type: Number,
      default: null
    },
    countColor: {
      type: String
    }
  },
  setup(props) {
    const { childCount } = useProvider(props);
    const showCount = computed13(() => getShowCount(props.totalCount));
    const classes = computed13(() => getGroupClasses2(childCount.value));
    const countClasses = computed13(() => getGroupCountClasses(showCount.value));
    return { classes, showCount, countClasses };
  }
});
function render22(_ctx, _cache) {
  const _component_Avatar = _resolveComponent8("Avatar");
  return _openBlock22(), _createElementBlock18("div", {
    class: _normalizeClass9(_ctx.classes)
  }, [
    _renderSlot7(_ctx.$slots, "default"),
    _ctx.totalCount != null ? (_openBlock22(), _createBlock8(_component_Avatar, {
      key: 0,
      class: "ak-avatar-group_count",
      color: _ctx.countColor
    }, {
      default: _withCtx4(() => [
        _createElementVNode16("span", {
          class: _normalizeClass9(_ctx.countClasses)
        }, _toDisplayString4(_ctx.showCount), 3)
      ]),
      _: 1
    }, 8, ["color"])) : _createCommentVNode8("v-if", true)
  ], 2);
}
_sfc_script22.render = render22;
_sfc_script22.__file = "packages/ui/src/Avatar/AvatarGroup.vue";

// packages/ui/src/Avatar/index.ts
var Avatar_default = _sfc_script21;
var install10 = multiWithInstall(_sfc_script21, [_sfc_script22]);

// packages/ui/src/AvatarGroup/index.ts
var AvatarGroup_default = _sfc_script22;
var install11 = withNoopInstall(_sfc_script22);

// vue:./BackTop.vue
import { defineComponent as defineComponent14, computed as computed14, toRef as toRef2, ref as ref7, onMounted as onMounted6 } from "vue";

// packages/ui/src/hooks/use-scroll.ts
function useScroll(elRef, callback) {
  return useEvent(elRef, "scroll", callback);
}
function useScrollTo(container) {
  const scrollToOffset = (...args) => {
    var _a;
    let behavior = "smooth";
    let top = 0;
    let left = 0;
    if (isNumber(args[0])) {
      left = args[0];
      isNumber(args[1]) && (top = args[1]);
      behavior = "auto";
    } else if (args[0]) {
      isNumber(args[0].x) && (left = args[0].x);
      isNumber(args[0].y) && (top = args[0].y);
      args[0].animated === false && (behavior = "auto");
    }
    (_a = container.value) == null ? void 0 : _a.scrollTo({
      top,
      left,
      behavior
    });
  };
  const scrollToEnd = ({ x, y, animated } = {}) => {
    const $root = container.value;
    if (!$root) {
      return;
    }
    scrollToOffset({
      x: x !== false ? $root.scrollWidth : void 0,
      y: y !== false ? $root.scrollHeight : void 0,
      animated
    });
  };
  return {
    scrollToOffset,
    scrollToEnd
  };
}

// vue:./UpCircleOutlined.vue
import { createElementVNode as _createElementVNode17, openBlock as _openBlock23, createElementBlock as _createElementBlock19 } from "vue";
var _sfc_script23 = {};
var _hoisted_117 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_215 = /* @__PURE__ */ _createElementVNode17("path", { d: "M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z" }, null, -1);
var _hoisted_314 = /* @__PURE__ */ _createElementVNode17("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1);
var _hoisted_45 = [
  _hoisted_215,
  _hoisted_314
];
function render23(_ctx, _cache) {
  return _openBlock23(), _createElementBlock19("svg", _hoisted_117, _hoisted_45);
}
_sfc_script23.render = render23;
_sfc_script23.__file = "packages/ui/src/Icon/icons/UpCircleOutlined/UpCircleOutlined.vue";

// packages/ui/src/BackTop/util.ts
var DEFAULT_VISIBLE_HEIGHT = 200;
var getStyles = (offset = 0, isShow, safeAreaInsets2) => {
  let _offset = [0, 0];
  if (isNumber(offset)) {
    _offset = [offset, offset];
  } else if (isNumberArray(offset) && offset.length > 1) {
    _offset = offset;
  }
  return {
    transform: `translate3d(${_offset[0]}px, ${_offset[1] - safeAreaInsets2.bottom}px, 0px)`,
    display: isShow ? null : "none"
  };
};

// vue:./BackTop.vue
import { renderSlot as _renderSlot8, resolveComponent as _resolveComponent9, createVNode as _createVNode3, normalizeStyle as _normalizeStyle7, openBlock as _openBlock24, createElementBlock as _createElementBlock20 } from "vue";
var _sfc_script24 = defineComponent14({
  name: "ak-back-top",
  components: { Icon: _sfc_script2 },
  props: {
    visibleHeight: {
      type: [Number, String],
      default: DEFAULT_VISIBLE_HEIGHT
    },
    animated: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [Number, Array],
      default: 0
    },
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    click: emitEventValidator
  },
  setup(props, { emit }) {
    const isShow = ref7(false);
    const docEl = ref7();
    function toTop() {
      scrollTo(document, 0, props.animated);
    }
    const onClick = (e) => {
      toTop();
      emit("click", e);
    };
    const { safeAreaInsets: safeAreaInsets2 } = useSafeAreaInsets(toRef2(props, "enableSafeAreaInsets"));
    const styles = computed14(() => getStyles(props.offset, isShow.value, safeAreaInsets2));
    function updateShow() {
      isShow.value = getScrollTop() >= getNumber(props.visibleHeight, DEFAULT_VISIBLE_HEIGHT);
    }
    useScroll(docEl, updateShow);
    onMounted6(() => {
      updateShow();
      docEl.value = document.documentElement;
    });
    return {
      toTop,
      onClick,
      isShow,
      styles,
      UpCircleOutlined: _sfc_script23
    };
  }
});
function render24(_ctx, _cache) {
  const _component_Icon = _resolveComponent9("Icon");
  return _openBlock24(), _createElementBlock20("button", {
    class: "ak-back-top",
    style: _normalizeStyle7(_ctx.styles),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _renderSlot8(_ctx.$slots, "default", {}, () => [
      _createVNode3(_component_Icon, { icon: _ctx.UpCircleOutlined }, null, 8, ["icon"])
    ])
  ], 4);
}
_sfc_script24.render = render24;
_sfc_script24.__file = "packages/ui/src/BackTop/BackTop.vue";

// packages/ui/src/BackTop/index.ts
var install12 = withInstall(_sfc_script24);
var BackTop_default = _sfc_script24;

// packages/ui/src/ButtonGroup/index.ts
var ButtonGroup_default = _sfc_script5;
var install13 = withNoopInstall(_sfc_script5);

// vue:./Calendar.vue
import { defineComponent as defineComponent21, ref as ref11, watch as watch10 } from "vue";

// vue:./SelectorField.vue
import { computed as computed15, defineComponent as defineComponent15 } from "vue";

// vue:./RightOutlined.vue
import { createElementVNode as _createElementVNode18, openBlock as _openBlock25, createElementBlock as _createElementBlock21 } from "vue";
var _sfc_script25 = {};
var _hoisted_118 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_216 = /* @__PURE__ */ _createElementVNode18("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1);
var _hoisted_315 = [
  _hoisted_216
];
function render25(_ctx, _cache) {
  return _openBlock25(), _createElementBlock21("svg", _hoisted_118, _hoisted_315);
}
_sfc_script25.render = render25;
_sfc_script25.__file = "packages/ui/src/Icon/icons/RightOutlined/RightOutlined.vue";

// packages/ui/src/SelectorField/util.ts
var getClasses3 = (props) => [
  "ak-input",
  { "has--value": !!props.label, disabled: !!props.disabled }
];
var getInputClasses = (label) => [
  "ak-input_input",
  { placeholder: !label }
];

// vue:./SelectorField.vue
import { toDisplayString as _toDisplayString5, normalizeClass as _normalizeClass10, createElementVNode as _createElementVNode19, resolveComponent as _resolveComponent10, createVNode as _createVNode4, openBlock as _openBlock26, createElementBlock as _createElementBlock22 } from "vue";
var _sfc_script26 = defineComponent15({
  name: "ak-selector-field",
  components: { Icon: _sfc_script2 },
  props: {
    disabled: Boolean,
    value: String,
    label: String,
    name: String,
    placeholder: String
  },
  emits: { fieldClick: returnTrue },
  setup(props, { emit }) {
    function onFieldClick() {
      emit("fieldClick");
    }
    const classes = computed15(() => getClasses3(props));
    const inputClasses = computed15(() => getInputClasses(props.label));
    return {
      onFieldClick,
      RightOutlined: _sfc_script25,
      classes,
      inputClasses
    };
  }
});
var _hoisted_119 = ["name", "disabled", "value"];
function render26(_ctx, _cache) {
  const _component_Icon = _resolveComponent10("Icon");
  return _openBlock26(), _createElementBlock22("div", {
    class: _normalizeClass10(_ctx.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onFieldClick && _ctx.onFieldClick(...args))
  }, [
    _createElementVNode19("div", {
      class: _normalizeClass10(_ctx.inputClasses)
    }, _toDisplayString5(_ctx.label || _ctx.placeholder), 3),
    _createVNode4(_component_Icon, {
      class: "ak-input_arrow",
      icon: _ctx.RightOutlined
    }, null, 8, ["icon"]),
    _createElementVNode19("input", {
      class: "ak-input_cover ak-form-input",
      type: "text",
      readonly: "",
      name: _ctx.name,
      disabled: _ctx.disabled,
      value: _ctx.value
    }, null, 8, _hoisted_119)
  ], 2);
}
_sfc_script26.render = render26;
_sfc_script26.__file = "packages/ui/src/SelectorField/SelectorField.vue";

// packages/ui/src/SelectorField/index.ts
var SelectorField_default = _sfc_script26;
var install14 = withNoopInstall(_sfc_script26);

// vue:./CalendarPopup.vue
import { defineComponent as defineComponent20, nextTick as nextTick2, onMounted as onMounted10, ref as ref10, watch as watch9 } from "vue";

// vue:./CalendarView.vue
import { defineComponent as defineComponent19, onMounted as onMounted9, reactive as reactive2, ref as ref9, watch as watch8 } from "vue";

// packages/ui/src/helpers/day.ts
var import_dayjs = __toESM(require_dayjs_min());
var import_toArray = __toESM(require_toArray());
var import_customParseFormat = __toESM(require_customParseFormat());
var newDayjs = import_dayjs.default;
newDayjs.extend(import_toArray.default);
newDayjs.extend(import_customParseFormat.default);
var day_default = newDayjs;

// vue:./Toast.vue
import { defineComponent as defineComponent16, computed as computed16, toRef as toRef3 } from "vue";

// vue:./CheckOutlined.vue
import { createElementVNode as _createElementVNode20, openBlock as _openBlock27, createElementBlock as _createElementBlock23 } from "vue";
var _sfc_script27 = {};
var _hoisted_120 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_217 = /* @__PURE__ */ _createElementVNode20("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1);
var _hoisted_316 = [
  _hoisted_217
];
function render27(_ctx, _cache) {
  return _openBlock27(), _createElementBlock23("svg", _hoisted_120, _hoisted_316);
}
_sfc_script27.render = render27;
_sfc_script27.__file = "packages/ui/src/Icon/icons/CheckOutlined/CheckOutlined.vue";

// packages/ui/src/Toast/util.ts
var STATE_TYPES2 = [
  "default",
  "success",
  "loading",
  "fail"
];
var getBoxClasses = (props) => [
  "ak-toast_box",
  {
    "has--icon": !!(props.icon || props.type && STATE_TYPES2.indexOf(props.type) > 0)
  }
];

// packages/ui/src/hooks/use-delay.ts
import { onBeforeUnmount as onBeforeUnmount6 } from "vue";
function useDelay(callback, duration) {
  let timer;
  function removeDelayTask() {
    clearTimeout(timer);
    timer = void 0;
  }
  function addDelayTask() {
    if (duration.value && duration.value > 0) {
      removeDelayTask();
      timer = window.setTimeout(callback, duration.value);
    }
  }
  onBeforeUnmount6(removeDelayTask);
  return { addDelayTask, removeDelayTask };
}

// vue:./Toast.vue
import { resolveComponent as _resolveComponent11, openBlock as _openBlock28, createBlock as _createBlock9, createCommentVNode as _createCommentVNode9, toDisplayString as _toDisplayString6, createElementVNode as _createElementVNode21, normalizeClass as _normalizeClass11, mergeProps as _mergeProps3, Teleport as _Teleport2 } from "vue";
var _sfc_script28 = defineComponent16({
  name: "ak-toast",
  components: { Icon: _sfc_script2, ActivityIndicator: _sfc_script13 },
  props: {
    ...popupProps,
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      validator: createEnumsValidator(STATE_TYPES2),
      default: "default"
    },
    icon: {
      type: [String, Object],
      validator: iconValidator
    },
    showMask: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const { addDelayTask, removeDelayTask } = useDelay(() => {
      popup.customCancel("auto", true);
    }, toRef3(props, "duration"));
    const popup = usePopup(props, ctx, {
      initialForbidScroll: false,
      afterCancel: removeDelayTask,
      afterShow: addDelayTask
    });
    const boxClasses = computed16(() => getBoxClasses(props));
    return {
      ...popup,
      boxClasses,
      CheckOutlined: _sfc_script27,
      CloseOutlined: _sfc_script9
    };
  }
});
var _hoisted_121 = { class: "ak-toast_text" };
function render28(_ctx, _cache) {
  const _component_ActivityIndicator = _resolveComponent11("ActivityIndicator");
  const _component_Icon = _resolveComponent11("Icon");
  return _openBlock28(), _createBlock9(_Teleport2, { to: "body" }, [
    _createElementVNode21("div", _mergeProps3({
      class: ["ak-toast", _ctx.popupClasses, { "no--mask": !_ctx.showMask }],
      style: _ctx.popupStyles
    }, _ctx.$attrs), [
      _createElementVNode21("div", {
        class: _normalizeClass11(_ctx.boxClasses)
      }, [
        _ctx.type === "loading" ? (_openBlock28(), _createBlock9(_component_ActivityIndicator, {
          key: 0,
          class: "ak-toast_icon",
          size: 21,
          color: "#ffffff"
        })) : _ctx.type === "success" ? (_openBlock28(), _createBlock9(_component_Icon, {
          key: 1,
          class: "ak-toast_icon",
          icon: _ctx.CheckOutlined
        }, null, 8, ["icon"])) : _ctx.type === "fail" ? (_openBlock28(), _createBlock9(_component_Icon, {
          key: 2,
          class: "ak-toast_icon",
          icon: _ctx.CloseOutlined
        }, null, 8, ["icon"])) : _ctx.icon ? (_openBlock28(), _createBlock9(_component_Icon, {
          key: 3,
          class: "ak-toast_icon",
          icon: _ctx.icon
        }, null, 8, ["icon"])) : _createCommentVNode9("v-if", true),
        _createElementVNode21("div", _hoisted_121, _toDisplayString6(_ctx.title), 1)
      ], 2)
    ], 16)
  ]);
}
_sfc_script28.render = render28;
_sfc_script28.__file = "packages/ui/src/Toast/Toast.vue";

// packages/ui/src/Toast/index.ts
var showToast = createShowPopup({
  apiName: "showToast",
  component: _sfc_script28,
  createHook: createAlertHook,
  singleMode: true,
  hookOptions: (options) => {
    if (options.duration == null) {
      options.duration = 1500;
    }
    return options;
  }
});
var showLoading = createShowPopup({
  apiName: "showLoading",
  component: _sfc_script28,
  createHook: createAlertHook,
  singleMode: true,
  hookOptions: (options) => {
    options.type = "loading";
    options.duration = 0;
    return options;
  }
});
var hideToast = createHidePopup({
  apiName: "hideToast"
});
var hideLoading = createHidePopup({
  apiName: "hideLoading"
});
var Toast_default = _sfc_script28;
var install15 = withInstall(_sfc_script28);

// packages/ui/src/Picker/util.ts
var getDefaultFieldNames = () => {
  return { label: "label", value: "value", children: "children" };
};
var labelFormatter = (labelArray) => {
  return labelArray.join("/");
};
var defaultFormatter = (valueArray, labelArray) => {
  return {
    value: valueArray,
    label: labelFormatter(labelArray)
  };
};
var defaultParser = (value) => {
  if (isNumber(value)) {
    return [value];
  } else if (typeof value === "string" && value) {
    return [value];
  } else if (isStringNumberMixArray(value)) {
    return cloneValue(value);
  }
  return [];
};
function mergeHandlers(...handlersArray) {
  const handlers = {
    formatter: defaultFormatter,
    parser: defaultParser,
    labelFormatter
  };
  handlersArray.forEach((handlersItem) => {
    objectForEach(handlersItem, (value, key) => {
      if (value) {
        handlers[key] = value;
      }
    });
  });
  return handlers;
}
function getColRows(options, indexes) {
  const rows = [];
  options.forEach((item, index) => {
    rows.push({
      label: item.label,
      value: item.value,
      hasChildren: item.children && item.children.length > 0,
      indexes: [...indexes, index]
    });
  });
  return rows;
}
function parseOptions(options, fieldNames) {
  const newOptions = [];
  if (Array.isArray(options)) {
    options.forEach((option) => {
      if (Array.isArray(option)) {
        const subOptions = parseOptions(option, fieldNames);
        if (subOptions.length > 0) {
          ;
          newOptions.push(subOptions);
        }
      } else if (isNumber(option) || typeof option === "string") {
        ;
        newOptions.push({
          label: option.toString(),
          value: option,
          children: [],
          disabled: false
        });
      } else if (isObject(option)) {
        const newOption = option;
        if (isStringNumberMix(newOption[fieldNames.value])) {
          ;
          newOptions.push({
            label: newOption[fieldNames.label] == null ? newOption[fieldNames.value] : newOption[fieldNames.label],
            value: newOption[fieldNames.value],
            disabled: newOption.disabled ? true : false,
            children: parseOptions(newOption[fieldNames.children], fieldNames)
          });
        }
      }
    });
  }
  return newOptions;
}
function validateCols(values, options) {
  const optionList = Array.isArray(options[0]) ? options : [options];
  let selectCount = 0;
  const value = [];
  const label = [];
  optionList.forEach((subOptionList, colIndex) => {
    for (let i = 0; i < subOptionList.length; i++) {
      const optionItem = subOptionList[i];
      if (optionItem.value == values[colIndex]) {
        selectCount++;
        value.push(optionItem.value);
        label.push(optionItem.label);
        break;
      }
    }
  });
  return selectCount === optionList.length ? {
    valid: true,
    value,
    label
  } : {
    valid: false,
    value: [],
    label: []
  };
}
function validateCascadeCols(values, options, virtualHandler) {
  const value = [];
  const label = [];
  function addData(optionItem) {
    value.push(optionItem.value);
    label.push(optionItem.label);
  }
  function deep(optionList, valueIndex, indexes) {
    const rows = getColRows(optionList, indexes);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const optionItem = optionList[i];
      if (row.value === values[valueIndex]) {
        if (row.hasChildren && values[valueIndex + 1]) {
          addData(optionItem);
          return deep(optionItem.children, valueIndex + 1, [...indexes, i]);
        } else if (!row.hasChildren && valueIndex + 1 >= values.length) {
          addData(optionItem);
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  function virtualOptionsDeep(index, valueIndex, parent) {
    function row2OptionItem(row) {
      return {
        label: row.label,
        value: row.value,
        children: [],
        disabled: false
      };
    }
    const rows = virtualHandler(index, parent);
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const optionItem = row2OptionItem(row);
      if (row.value === values[valueIndex]) {
        if (row.hasChildren && valueIndex + 1 < values.length) {
          addData(optionItem);
          return virtualOptionsDeep(index + 1, valueIndex + 1, row);
        } else if (!row.hasChildren && valueIndex + 1 >= values.length) {
          addData(optionItem);
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  return (virtualHandler ? virtualOptionsDeep(0, 0) : deep(options, 0, [])) ? {
    valid: true,
    value,
    label
  } : {
    valid: false,
    value: [],
    label: []
  };
}
function printError(message) {
  console.error(new exception_default(message, exception_default.TYPE.PROP_ERROR, "Picker/DatePicker/Cascader/Calendar"));
}
function validateValues(values, options, isCascade, virtualHandler) {
  let valid = false;
  if (values instanceof Error) {
    printError(values.message);
  } else if (values.length === 0) {
    valid = true;
  } else {
    const ret = isCascade ? validateCascadeCols(values, options, virtualHandler) : validateCols(values, options);
    if (!ret.valid) {
    } else {
      return ret;
    }
  }
  return {
    valid,
    value: [],
    label: []
  };
}
function getFormatOptions(options, fieldNames, virtualHandler, cascader = false) {
  const newFieldNames = getDefaultFieldNames();
  let newOptions = [];
  let isCascade = false;
  if (virtualHandler == null) {
    if (fieldNames) {
      typeof fieldNames.label === "string" && fieldNames.label && (newFieldNames.label = fieldNames.label);
      typeof fieldNames.value === "string" && fieldNames.value && (newFieldNames.value = fieldNames.value);
      typeof fieldNames.children === "string" && fieldNames.children && (newFieldNames.children = fieldNames.children);
    }
    newOptions = parseOptions(options, newFieldNames);
    if (cascader) {
      isCascade = true;
    } else {
      for (let i = 0; i < newOptions.length; i++) {
        const newOption = newOptions[i];
        if (newOption.children && newOption.children[0]) {
          isCascade = true;
          break;
        }
      }
    }
  } else {
    isCascade = true;
  }
  return {
    options: newOptions,
    isCascade,
    fieldNames: newFieldNames
  };
}
function isSameValue(aVal, bVal) {
  if (Array.isArray(aVal) && Array.isArray(bVal)) {
    return isSameArray(aVal, bVal);
  }
  if (aVal instanceof Date && bVal instanceof Date) {
    return isSameDate(aVal, bVal);
  }
  return aVal === bVal;
}
function isSameDetail(a, b) {
  return isSameValue(a.value, b.value);
}
function cloneValue(value) {
  if (value instanceof Date) {
    return new Date(value);
  } else if (isDateArray(value)) {
    const newValue = [];
    value.forEach((date) => {
      newValue.push(new Date(date));
    });
    return newValue;
  }
  return cloneData(value);
}
function cloneDetail(detail) {
  const newDetail = cloneData(detail);
  newDetail.value = cloneValue(detail.value);
  return newDetail;
}
var DEFAULT_ITEM_HEIGHT = 48;
function isValidValue(value) {
  return !isEmpty(value) || value === 0;
}

// packages/ui/src/Form/form.ts
var formItemProps = {
  name: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
var isStringValue = (value) => isString(value);
var isNumberValue = (value) => isNumber(value);
var formStringValueEmits = {
  "update:modelValue": isStringValue,
  change: isStringValue,
  input: isStringValue
};
var formNumberValueEmits = {
  "update:modelValue": isNumberValue,
  change: isNumberValue,
  input: isNumberValue
};
var formFocusEmits = {
  focus: emitEventValidator,
  blur: emitEventValidator
};
var formActiveEmits = {
  focus: returnTrue,
  blur: returnTrue
};

// packages/ui/src/Picker/props.ts
var isValue = (value) => {
  return isStringNumberMix(value) || value instanceof Date;
};
var isModelValue = (value) => {
  if (Array.isArray(value)) {
    return value.filter((v) => {
      return !isValue(v);
    }).length === 0;
  }
  return isValue(value);
};
var isPickerDetail = (detail) => {
  return detail && isModelValue(detail.value) && typeof detail.label === "string";
};
var commonProps = {
  modelValue: {
    type: [Date, String, Number, Array]
  },
  options: {
    type: Array,
    default: () => []
  },
  fieldNames: {
    type: Object,
    default: getDefaultFieldNames()
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  }
};
var commonEmits = {
  change: isModelValue,
  "update:modelValue": isModelValue
};
var pickerViewProps = commonProps;
var pickerViewEmits = commonEmits;
var pickerPopupProps = {
  ...popupExtendProps
};
var pickerPopupEmits = {
  ...popupEmits,
  ...commonEmits,
  confirm: (payload) => isPickerDetail(payload)
};
var pickerProps = {
  ...formItemProps,
  placeholder: {
    type: String,
    default: ""
  }
};
var pickerEmits = {
  ...commonEmits,
  ...formActiveEmits
};

// packages/ui/src/Calendar/util.ts
var DEFAULT_MONTH_RANGE = 6;
var MODE_NAMES2 = ["single", "range"];
function getDefaultDetail() {
  return {
    value: [],
    valueArray: [],
    label: "",
    rangeCount: 0
  };
}
function printError2(message) {
  console.error(new exception_default(message, exception_default.TYPE.PROP_ERROR, "Calendar"));
}
function getFirstDayOfWeek(firstDayOfWeek) {
  const num = getNumber(firstDayOfWeek, 0);
  return isInNumberRange(num, 0, 6) ? Math.round(num) : 0;
}
var getTimeByDate = (date) => day_default(date).startOf("day").valueOf();
var getMinTime = () => day_default().startOf("day").valueOf();
var getMaxTime = (minTime) => day_default(minTime).startOf("day").add(DEFAULT_MONTH_RANGE, "month").valueOf();
var getViewBodyTitleStyles = (titleY) => ({
  transform: `translate3d(0px, ${titleY == null ? "-100%" : titleY + "px"}, 0px)`
});

// packages/ui/src/Calendar/props.ts
var commonProps2 = {
  modelValue: {
    type: [Date, String, Number, Array]
  },
  minDate: {
    type: Date
  },
  maxDate: {
    type: Date
  },
  initialMode: {
    type: String,
    validator: createEnumsValidator(MODE_NAMES2),
    default: MODE_NAMES2[0]
  },
  allowSameDay: {
    type: Boolean,
    default: false
  },
  maxRange: {
    type: Number,
    default: Infinity
  },
  dayHandler: {
    type: Function
  },
  firstDayOfWeek: {
    validator: (val) => {
      return isInteger(val) && isInNumberRange(val, 0, 6);
    },
    default: 0
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  }
};
var calendarDetailValidator = (payload) => isPickerDetail(payload) && typeof payload.rangeCount === "number" && Array.isArray(payload.valueArray);

// packages/ui/src/Calendar/use-calendar.ts
function valueParser(val, mode) {
  const values = [];
  if (val == null || val === 0 || val === "") {
    return values;
  }
  if (Array.isArray(val)) {
    const s = val[0];
    const e = val[1];
    if (s != null && day_default(s).isValid()) {
      values.push(day_default(s).startOf("day").valueOf());
    }
    if (e != null && day_default(e).isValid()) {
      values.push(day_default(e).startOf("day").valueOf());
    }
  } else if (day_default(val).isValid()) {
    values.push(day_default(val).startOf("day").valueOf());
  }
  if (values[0] && (!values[1] || values[1] < values[0])) {
    values[1] = day_default(values[0]).add(1, "day").valueOf();
  }
  if (values.length > 0 && mode !== "range") {
    values[1] = 0;
  }
  return values;
}
function detailFormatter(timeArray, mode) {
  const detail = getDefaultDetail();
  const start = timeArray[0];
  const end = timeArray[1];
  if (start) {
    const startDjs = day_default(start);
    if (mode === "range") {
      if (start && end) {
        const endDjs = day_default(end);
        detail.value.push(startDjs.toDate());
        detail.value.push(endDjs.toDate());
        detail.valueArray.push(startDjs.toArray().slice(0, 3));
        detail.valueArray.push(endDjs.toArray().slice(0, 3));
        if (start === end) {
          detail.label = startDjs.format("YYYY-MM-DD");
        } else {
          detail.label = [
            startDjs.format("MM-DD"),
            endDjs.format("MM-DD")
          ].join(" ~ ");
        }
        detail.rangeCount = Math.floor((end - start) / (24 * 3600 * 1e3)) + 1;
      }
    } else {
      detail.value.push(startDjs.toDate());
      detail.valueArray.push(startDjs.toArray().slice(0, 3));
      detail.label = startDjs.format("YYYY-MM-DD");
      detail.rangeCount = 1;
    }
  }
  return detail;
}
function useHandlers(props) {
  const mode = getEnumsValue(MODE_NAMES2, props.initialMode);
  const parser2 = function(val) {
    if (props.parser) {
      return props.parser(val, mode).map((d) => {
        return d.getTime();
      });
    }
    return valueParser(val, mode);
  };
  const formatter2 = function(valueArray) {
    const detail = detailFormatter(valueArray, mode);
    if (props.formatter) {
      const ret = props.formatter(valueArray.map((v) => new Date(v)), mode);
      if ((ret == null ? void 0 : ret.label) != null) {
        detail.label = ret.label;
        detail.value = ret.value;
      } else {
        detail.value = ret;
      }
    }
    return detail;
  };
  return {
    mode,
    parser: parser2,
    formatter: formatter2,
    getDefaultDetail: () => formatter2([])
  };
}

// vue:./CalendarViewMonth.vue
import { defineComponent as defineComponent17 } from "vue";
import { toDisplayString as _toDisplayString7, createElementVNode as _createElementVNode22, renderList as _renderList3, Fragment as _Fragment3, openBlock as _openBlock29, createElementBlock as _createElementBlock24, normalizeClass as _normalizeClass12, createCommentVNode as _createCommentVNode10, createTextVNode as _createTextVNode4 } from "vue";
var _sfc_script29 = defineComponent17({
  name: "ak-calendar-view-month",
  props: {
    month: {
      type: Object,
      required: true
    },
    monthIndex: {
      type: Number,
      required: true
    },
    onDaysClick: {
      type: Function,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  }
});
var _hoisted_122 = { class: "ak-calendar-view_month-caption" };
var _hoisted_218 = ["data-index"];
var _hoisted_317 = ["data-index"];
function render29(_ctx, _cache) {
  return _openBlock29(), _createElementBlock24(_Fragment3, null, [
    _createElementVNode22("div", _hoisted_122, _toDisplayString7(_ctx.month.caption), 1),
    _createElementVNode22("div", {
      class: "ak-calendar-view_days",
      "data-index": _ctx.monthIndex,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onDaysClick && _ctx.onDaysClick(...args))
    }, [
      (_openBlock29(true), _createElementBlock24(_Fragment3, null, _renderList3(_ctx.month.days, (day, dayIndex) => {
        return _openBlock29(), _createElementBlock24("div", {
          class: _normalizeClass12(["ak-calendar-view_day", {
            disabled: day.state === "disabled",
            selected: day.state === "selected" || day.state === "startSelected" || day.state === "endSelected",
            "in-range": _ctx.mode === "range" && day.state === "selected"
          }]),
          key: dayIndex,
          "data-index": dayIndex
        }, [
          day.topText ? (_openBlock29(), _createElementBlock24("span", {
            key: 0,
            class: _normalizeClass12(["ak-calendar-view_day-top-text", { highlight: day.topHighlight }])
          }, _toDisplayString7(day.topText), 3)) : _createCommentVNode10("v-if", true),
          _createTextVNode4(" " + _toDisplayString7(day.text) + " ", 1),
          day.bottomText ? (_openBlock29(), _createElementBlock24("span", {
            key: 1,
            class: _normalizeClass12(["ak-calendar-view_day-bottom-text", { highlight: day.bottomHighlight }])
          }, _toDisplayString7(day.bottomText), 3)) : _createCommentVNode10("v-if", true)
        ], 10, _hoisted_317);
      }), 128))
    ], 8, _hoisted_218)
  ], 64);
}
_sfc_script29.render = render29;
_sfc_script29.__file = "packages/ui/src/Calendar/CalendarViewMonth.vue";

// vue:./VirtualList.vue
import { computed as computed17, defineComponent as defineComponent18, onMounted as onMounted8, ref as ref8, nextTick, watch as watch7 } from "vue";

// packages/ui/src/VirtualList/props.ts
var virtualListProps = {
  ids: {
    type: Array,
    required: true,
    default: () => []
  },
  itemSize: {
    type: [Number, Function]
  },
  initialHorizontal: {
    type: Boolean,
    default: false
  },
  preLoad: {
    type: Number,
    default: 1.5
  },
  initialWaterfallCount: {
    type: Number,
    validator: (val) => {
      return isInteger(val) && isInNumberRange(val, 1, 5);
    },
    default: 1
  },
  approvedItemVisibleScale: {
    type: Number,
    default: 0.5
  }
};
var emitVisibleItemsChangeValidator = (payload) => payload && Array.isArray(payload.items);

// packages/ui/src/hooks/use-resize-observer.ts
import { onBeforeUnmount as onBeforeUnmount7, watch as watch6 } from "vue";

// packages/ui/src/hooks/use-life.ts
import { getCurrentInstance, onMounted as onMounted7 } from "vue";
function useMounted(callback) {
  const instance = getCurrentInstance();
  if (instance) {
    if (instance.isMounted) {
      callback();
    } else {
      onMounted7(() => callback());
    }
  }
}

// packages/ui/src/hooks/use-resize-observer.ts
function useResizeObserver(container, callback) {
  if (typeof ResizeObserver === "undefined") {
    return noop;
  }
  const ro = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      callback(entry.contentRect);
    });
  });
  useMounted(() => {
    on2();
    watch6(container, () => {
      off2();
      on2();
    });
  });
  function on2() {
    container.value && ro.observe(container.value);
  }
  function off2() {
    ro.disconnect();
  }
  onBeforeUnmount7(off2);
  return off2;
}

// packages/ui/src/VirtualList/util.ts
var getClasses4 = (horizontal) => [
  "ak-virtual-list",
  { horizontal }
];
var getListStyles = (horizontal, max) => {
  const styles = {};
  styles[horizontal ? "width" : "height"] = max + "px";
  return styles;
};
function getItemStyles({
  offset,
  otherOffset,
  itemSize,
  otherSizePx
}, cols, horizontal) {
  const style = {};
  if (cols.length > 1) {
    style.height = itemSize + "px";
    style.width = otherSizePx;
    style.transform = `translate3d(${otherOffset}, ${offset}px, 0)`;
  } else if (horizontal) {
    style.width = itemSize + "px";
    style.height = otherSizePx;
    style.transform = `translate3d(${offset}px, 0, 0)`;
  } else {
    style.height = itemSize + "px";
    style.width = otherSizePx;
    style.transform = `translate3d(0, ${offset}px, 0)`;
  }
  return style;
}

// vue:./VirtualList.vue
import { renderList as _renderList4, Fragment as _Fragment4, openBlock as _openBlock30, createElementBlock as _createElementBlock25, renderSlot as _renderSlot9, normalizeStyle as _normalizeStyle8, createElementVNode as _createElementVNode23, normalizeClass as _normalizeClass13 } from "vue";
var _sfc_script30 = defineComponent18({
  name: "ak-virtual-list",
  props: {
    ...virtualListProps
  },
  emits: {
    visibleItemsChange: emitVisibleItemsChangeValidator,
    resize: (size) => isNumber(size)
  },
  setup(props, { emit }) {
    const cols = ref8([]);
    const list = ref8([]);
    const renderList = ref8([]);
    const root = ref8();
    const listEl = ref8();
    const poolEl = ref8();
    const scrollEl = ref8();
    const wrapperSize = ref8(0);
    let horizontal = false;
    if (props.initialWaterfallCount > 1) {
      for (let i = 0, len = rangeInteger(props.initialWaterfallCount, 2, 5); i < len; i++) {
        cols.value.push(0);
      }
    } else {
      cols.value.push(0);
      if (props.initialHorizontal) {
        horizontal = true;
      }
    }
    function getFixedSize(index) {
      if (typeof props.itemSize === "function") {
        try {
          const size = props.itemSize(index);
          if (isNumber(size)) {
            return size;
          }
        } catch (error) {
          console.error(new exception_default("The object.size value returned by getItemSize should be a Number type.", exception_default.TYPE.PROP_ERROR, "FlatList"));
        }
      } else if (isNumber(props.itemSize)) {
        return props.itemSize;
      }
      return -1;
    }
    function dataToList(_ids) {
      const newList = [];
      let isChange = _ids.length !== list.value.length;
      _ids.forEach((id, index) => {
        const oldItem = list.value[index];
        let newItem = {
          id,
          index,
          size: -1
        };
        if (oldItem && newItem.id === oldItem.id) {
          newItem = oldItem;
        } else {
          newItem.size = getFixedSize(newItem.index);
          isChange = true;
        }
        newList.push(newItem);
      });
      list.value = newList;
      if (isChange) {
        resetCalc();
        nextTick(() => {
          updateItemsSize();
          updateItems("dataChange");
        });
      } else {
        updateItems("dataChange");
      }
    }
    function getElSize($el) {
      return $el ? $el[horizontal ? "offsetWidth" : "offsetHeight"] : 0;
    }
    function getScrollSize() {
      return scrollEl.value ? scrollEl.value[horizontal ? "scrollLeft" : "scrollTop"] : 0;
    }
    let isCalcEnd = false;
    const calcGroupCount = 50;
    let calcGroups = [];
    function resetCalc() {
      isCalcEnd = false;
      calcGroups = [
        {
          index: 0,
          offset: 0,
          cols: cols.value.map(() => 0)
        }
      ];
    }
    resetCalc();
    function getNearsetIndex(num, key = "offset") {
      let index = -1;
      let left = 0;
      let right = calcGroups.length - 1;
      while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (calcGroups[mid][key] > num) {
          right = mid - 1;
          if (calcGroups[right][key] <= num) {
            index = right;
            break;
          }
        } else if (calcGroups[mid][key] < num) {
          left = mid + 1;
          if (!calcGroups[left] || calcGroups[left][key] >= num) {
            index = mid;
            break;
          }
        } else {
          index = mid;
          break;
        }
      }
      return index;
    }
    function getStartCols(scrollSize) {
      let index = getNearsetIndex(scrollSize);
      if (index === -1) {
        return calcGroups[0];
      } else {
        while (index !== 0 && !isRecycled(calcGroups[index].offset, scrollSize)) {
          index--;
        }
        return calcGroups[index];
      }
    }
    let visibleIndexList = [];
    function updateItems(source) {
      const scrollSize = getScrollSize();
      const approvedItemVisibleScale = rangeNumber(props.approvedItemVisibleScale, 0, 1);
      const newList = [];
      const newVisibleIndexList = [];
      const startCols = getStartCols(scrollSize);
      let renderEntered = false;
      let newCols = cloneData(startCols.cols);
      for (let i = startCols.index, len = list.value.length; i < len; i++) {
        const item = list.value[i];
        const itemSize = item.size;
        if (itemSize === -1) {
          return;
        }
        let offset = 0;
        let colMinIndex = 0;
        if (newCols.length > 1) {
          offset = Math.min(...newCols);
          colMinIndex = newCols.indexOf(offset);
        } else {
          colMinIndex = 0;
          offset = newCols[colMinIndex];
        }
        if (!isRecycled(offset, scrollSize)) {
          newList.push({
            id: item.id,
            index: item.index,
            style: getItemStyles({
              offset,
              otherOffset: `${colMinIndex * 100}%`,
              itemSize,
              otherSizePx: newCols.length > 1 ? `calc(100% / ${newCols.length})` : "100%"
            }, cols.value, horizontal),
            size: itemSize
          });
          if (isVisible(offset, itemSize, scrollSize, approvedItemVisibleScale)) {
            newVisibleIndexList.push(item.index);
          }
          renderEntered = true;
        } else {
          if (renderEntered && isCalcEnd) {
            break;
          }
        }
        if (!isCalcEnd) {
          if (i !== 0 && i % calcGroupCount === 0) {
            calcGroups.push({
              index: i,
              offset,
              cols: cloneData(newCols)
            });
          }
        }
        newCols[colMinIndex] += itemSize;
      }
      if (!isCalcEnd) {
        cols.value = newCols;
        isCalcEnd = true;
      }
      renderList.value = newList;
      const payload = {
        items: []
      };
      newVisibleIndexList.forEach((index) => {
        if (!visibleIndexList.includes(index)) {
          payload.items.push({
            index,
            visible: true
          });
        }
      });
      visibleIndexList.forEach((index) => {
        if (!newVisibleIndexList.includes(index)) {
          payload.items.push({
            index,
            visible: false
          });
        }
      });
      visibleIndexList = newVisibleIndexList;
      if (payload.items.length > 0) {
        payload.items.sort((a, b) => a.index - b.index);
        emit("visibleItemsChange", payload);
      }
    }
    function isRecycled(offset, scrollSize) {
      return !(offset >= scrollSize - wrapperSize.value * props.preLoad && offset <= scrollSize + wrapperSize.value * (props.preLoad + 1));
    }
    function isVisible(offset, itemSize, scrollSize, approvedItemVisibleScale) {
      return scrollSize <= offset + itemSize - itemSize * approvedItemVisibleScale && scrollSize >= offset - wrapperSize.value + itemSize * approvedItemVisibleScale;
    }
    function updateItemsSize() {
      if (poolEl.value) {
        const $items = poolEl.value.children;
        if ($items.length > 0) {
          const newList = list.value;
          for (let i = 0; i < $items.length; i++) {
            const $item = $items[i];
            const index = parseInt($item.dataset.index);
            newList[index].size = getElSize($item);
          }
          list.value = newList;
        }
      }
    }
    const listStyles = computed17(() => getListStyles(horizontal, Math.max(...cols.value)));
    function recordInteraction() {
      updateItems("recordInteraction");
    }
    let scrollTimer;
    let scrollCount = 0;
    const handleScroll = () => {
      if (scrollCount > 10) {
        scrollCount = 0;
        clearTimeout(scrollTimer);
        updateItems("scroll");
      } else {
        clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
          scrollCount = 0;
          updateItems("scroll");
        }, 17);
        scrollCount++;
      }
    };
    const { scrollToOffset, scrollToEnd: _scrollToEnd } = useScrollTo(scrollEl);
    const scrollTo2 = (options) => {
      const animated = true;
      let newOptions;
      if (typeof options === "number") {
        newOptions = {
          x: horizontal ? options : 0,
          y: !horizontal ? options : 0,
          animated
        };
      } else {
        newOptions = {
          x: horizontal ? options.offset : 0,
          y: !horizontal ? options.offset : 0,
          animated: !(options.animated === false)
        };
      }
      return scrollToOffset(newOptions);
    };
    const scrollToEnd = (animated = true) => {
      return _scrollToEnd({
        x: horizontal,
        y: !horizontal,
        animated
      });
    };
    const scrollToIndex = (options) => {
      let index;
      let animated = true;
      let viewPosition;
      if (typeof options === "number") {
        index = options;
        options = {
          index
        };
      } else {
        index = options.index;
        animated = !(options.animated === false);
        viewPosition = getViewPosition(options.viewPosition);
      }
      if (index < 0) {
        return;
      } else if (index >= list.value.length) {
        scrollToEnd(animated);
        return;
      }
      const startCos = calcGroups[getNearsetIndex(index, "index")];
      const newCols = cloneData(startCos.cols);
      for (let i = startCos.index, len = Math.min(index, list.value.length - 1); i <= len; i++) {
        const item = list.value[i];
        if (item.size === -1) {
          return;
        }
        let offset = 0;
        let colMinIndex = 0;
        if (newCols.length > 1) {
          offset = Math.min(...newCols);
          colMinIndex = newCols.indexOf(offset);
        } else {
          colMinIndex = 0;
          offset = newCols[colMinIndex];
        }
        newCols[colMinIndex] += item.size;
        if (i === len) {
          if (viewPosition === 0.5) {
            offset += item.size / 2 - wrapperSize.value / 2;
          } else if (viewPosition === 1) {
            offset += item.size - wrapperSize.value;
          }
          scrollTo2({
            offset,
            animated
          });
        }
      }
    };
    watch7(() => props.ids, (val) => {
      dataToList(val);
    }, {
      deep: true
    });
    const poolList = computed17(() => {
      const newList = [];
      list.value.forEach((item) => {
        if (item.size === -1 && !renderList.value.some((v) => v.id === item.id)) {
          newList.push(Object.assign({}, item));
        }
      });
      return newList;
    });
    function resetScrollContainer($el) {
      scrollEl.value = $el;
      handleResize();
    }
    function handleResize() {
      const newSize = getElSize(scrollEl.value);
      if (newSize !== 0 && newSize !== wrapperSize.value) {
        wrapperSize.value = newSize;
        resetCalc();
        updateItems("resize");
        emit("resize", newSize);
      }
    }
    useScroll(scrollEl, handleScroll);
    useResizeObserver(scrollEl, handleResize);
    onMounted8(() => {
      resetScrollContainer(root.value);
      dataToList(props.ids);
    });
    const classes = getClasses4(horizontal);
    return {
      listEl,
      poolEl,
      poolList,
      renderList,
      classes,
      listStyles,
      root,
      horizontal,
      recordInteraction,
      handleScroll,
      scrollTo: scrollTo2,
      scrollToIndex,
      scrollToEnd,
      updateItems,
      resetScrollContainer
    };
  }
});
var _hoisted_123 = ["data-index"];
var _hoisted_219 = {
  class: "ak-virtual-list_list pool",
  ref: "poolEl"
};
var _hoisted_318 = ["data-index"];
function render30(_ctx, _cache) {
  return _openBlock30(), _createElementBlock25("div", {
    class: _normalizeClass13(_ctx.classes),
    ref: "root"
  }, [
    _createElementVNode23("ul", {
      class: "ak-virtual-list_list",
      style: _normalizeStyle8(_ctx.listStyles),
      ref: "listEl"
    }, [
      (_openBlock30(true), _createElementBlock25(_Fragment4, null, _renderList4(_ctx.renderList, (item) => {
        return _openBlock30(), _createElementBlock25("li", {
          class: "ak-virtual-list_item",
          key: item.id,
          "data-index": item.index,
          style: _normalizeStyle8(item.style)
        }, [
          _renderSlot9(_ctx.$slots, "default", {
            id: item.id,
            index: item.index
          })
        ], 12, _hoisted_123);
      }), 128))
    ], 4),
    _createElementVNode23("ul", _hoisted_219, [
      (_openBlock30(true), _createElementBlock25(_Fragment4, null, _renderList4(_ctx.poolList, (item) => {
        return _openBlock30(), _createElementBlock25("li", {
          class: "ak-virtual-list_item",
          key: item.id,
          "data-index": item.index
        }, [
          _renderSlot9(_ctx.$slots, "default", {
            id: item.id,
            index: item.index
          })
        ], 8, _hoisted_318);
      }), 128))
    ], 512)
  ], 2);
}
_sfc_script30.render = render30;
_sfc_script30.__file = "packages/ui/src/VirtualList/VirtualList.vue";

// packages/ui/src/VirtualList/index.ts
var install16 = withInstall(_sfc_script30);
var VirtualList_default = _sfc_script30;

// vue:./CalendarView.vue
import { renderList as _renderList5, Fragment as _Fragment5, openBlock as _openBlock31, createElementBlock as _createElementBlock26, toDisplayString as _toDisplayString8, normalizeClass as _normalizeClass14, createElementVNode as _createElementVNode24, resolveComponent as _resolveComponent12, createVNode as _createVNode5, withCtx as _withCtx5 } from "vue";
var defaultWeekDays = ["0", "1", "2", "3", "4", "5", "6"];
function getDefaultSelectDay() {
  return {
    dateString: "",
    timestamp: 0,
    monthIndex: 0,
    dayIndex: 0
  };
}
var _sfc_script31 = defineComponent19({
  name: "ak-calendar-view",
  components: { ViewMonth: _sfc_script29, VirtualList: _sfc_script30 },
  props: { ...commonProps2 },
  emits: {
    ...pickerViewEmits,
    select: calendarDetailValidator
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const { formatter: formatter2, parser: parser2, mode } = useHandlers(props);
    const bodyEl = ref9();
    const bodyTitleEl = ref9();
    const weekDays = ref9([]);
    const months = reactive2([]);
    let start = getDefaultSelectDay();
    let end = getDefaultSelectDay();
    function getSelectedInfo(timestamp) {
      for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < months[i].days.length; j++) {
          const day = months[i].days[j];
          if (day.state !== "disabled") {
            if (timestamp === day.timestamp) {
              return {
                dateString: day.dateString,
                timestamp,
                monthIndex: i,
                dayIndex: j
              };
            }
          }
        }
      }
      return null;
    }
    function updateValue(val) {
      return updateOriginalValue(parser2(val));
    }
    function updateOriginalValue(timeArr) {
      if (timeArr.length === 1) {
        timeArr.push(0);
      }
      if (!isSameArray(timeArr, [start.timestamp, end.timestamp])) {
        if (timeArr.length === 0 || timeArr[0] === 0) {
          setSelected("start", null);
          setSelected("end", null);
          updateStates();
        } else if (mode === "range") {
          const _start = getSelectedInfo(timeArr[0]);
          const _end = getSelectedInfo(timeArr[1]);
          if (_start && _end) {
            const { rangeCount, hasDisabled } = getRangeInfo(_start, _end);
            if (hasDisabled) {
              printError2('The range of "modelValue" contains disabled days.');
            } else if (rangeCount > props.maxRange) {
              printError2(`The range of "modelValue" contains ${rangeCount} days, no more than ${props.maxRange} days.`);
            } else {
              setSelected("start", _start);
              setSelected("end", _end);
              updateStates();
            }
          } else {
            printError2('The range of "modelValue" is not in the optional range.');
          }
        } else {
          const select = getSelectedInfo(timeArr[0]);
          if (select) {
            start = select;
            setSelected("end", null);
            updateStates();
          } else {
            printError2('The range of "modelValue" is not in the optional range.');
          }
        }
      }
      return getDetail();
    }
    function setSelected(name, day) {
      if (day) {
        name === "start" ? start = day : end = day;
      } else {
        name === "start" ? start = getDefaultSelectDay() : end = getDefaultSelectDay();
      }
    }
    function getState(timestamp) {
      let state = "";
      if (mode === "range" && timestamp >= start.timestamp && timestamp <= end.timestamp || timestamp === start.timestamp) {
        state = "selected";
      }
      if (mode === "range" && state == "selected") {
        if (timestamp === end.timestamp) {
          state = "endSelected";
        } else if (timestamp === start.timestamp) {
          state = "startSelected";
        }
      }
      return state;
    }
    function getDayInfo(day, extend) {
      const dateString = day.format("YYYY-MM-DD");
      const state = extend.state;
      let dayInfo = {
        topHighlight: false,
        topText: state === "startSelected" ? locale.value.calendarSelectedStartText : state === "endSelected" ? locale.value.calendarSelectedEndText : "",
        state,
        bottomHighlight: false,
        bottomText: "",
        text: day.date().toString(),
        dateString,
        timestamp: day.valueOf()
      };
      if (props.dayHandler) {
        dayInfo.date = day.toDate();
        dayInfo = props.dayHandler(Object.assign(dayInfo, extend));
        delete dayInfo.date;
      }
      if (dayInfo.state === "disabled" && !extend.state) {
        extend.state = "disabled";
      }
      return Object.assign(dayInfo, extend, {
        dateString,
        timestamp: day.valueOf()
      });
    }
    function getStartMonth(day) {
      const month = {
        caption: day.format(locale.value.calendarMonthCaption),
        monthString: day.format("YYYY-MM"),
        days: [],
        startDay: day.date()
      };
      let day2 = day.startOf("month");
      for (let i = 0, len = day2.day() - getFirstDayOfWeek(props.firstDayOfWeek); i < len; i++) {
        month.days.push({
          cover: true,
          text: "",
          state: "disabled",
          dateString: "",
          timestamp: 0
        });
      }
      while (day2.date() < month.startDay) {
        month.days.push(getDayInfo(day2, { state: "disabled" }));
        day2 = day2.add(1, "day");
      }
      return month;
    }
    function updateWeekDays() {
      let i = getFirstDayOfWeek();
      const newWeekDays = [];
      let weekDay;
      while (newWeekDays.length < 7) {
        weekDay = defaultWeekDays[i];
        newWeekDays.push(weekDay);
        i = (i + 1) % 7;
      }
      weekDays.value = newWeekDays;
    }
    let minTimestamp = 0;
    let maxTimestamp = 0;
    function updateOptions() {
      if (props.minDate instanceof Date) {
        minTimestamp = getTimeByDate(props.minDate);
      } else {
        minTimestamp = getMinTime();
      }
      if (props.maxDate instanceof Date) {
        if (props.maxDate.getTime() < minTimestamp) {
          printError2('The value of "maxDate" cannot be less than the value of "minDate".');
          maxTimestamp = getMaxTime(minTimestamp);
        } else {
          maxTimestamp = getTimeByDate(props.maxDate);
        }
      } else {
        maxTimestamp = getMaxTime(minTimestamp);
      }
      updateWeekDays();
      const maxDay = day_default(maxTimestamp);
      const _months = [];
      let day = day_default(minTimestamp);
      let monthKey = day.month();
      let month = getStartMonth(day);
      while (!day.isAfter(maxDay)) {
        if (day.month() !== monthKey) {
          monthKey = day.month();
          _months.push(month);
          month = getStartMonth(day);
        }
        const dayInfo = getDayInfo(day, {
          state: getState(day.valueOf())
        });
        month.days.push(dayInfo);
        day = day.add(1, "day");
      }
      while (day.month() === monthKey) {
        month.days.push(getDayInfo(day, {
          state: "disabled"
        }));
        day = day.add(1, "day");
      }
      _months.push(month);
      months.splice(0, Infinity, ..._months);
      updateBodyFixed(bodyScrollTop);
    }
    function dayInfo2SelectDay(day, monthIndex, dayIndex) {
      return {
        dateString: day.dateString,
        timestamp: day.timestamp,
        state: day.state,
        monthIndex,
        dayIndex
      };
    }
    function onDaysClick(e) {
      const target = e.target;
      let $day = null;
      if (target.tagName === "SPAN") {
        $day = target.parentElement;
      } else if (target !== e.currentTarget) {
        $day = target;
      }
      if (!$day) {
        return;
      }
      const monthIndex = parseInt(e.currentTarget.dataset.index);
      const dayIndex = parseInt($day.dataset.index);
      const day = months[monthIndex].days[dayIndex];
      if (day.state === "disabled") {
        return;
      }
      const newDay = dayInfo2SelectDay(day, monthIndex, dayIndex);
      if (mode === "range") {
        if (start.dateString && end.dateString || !start.dateString) {
          setSelected("end", null);
        } else {
          if (day.timestamp > start.timestamp || props.allowSameDay && day.timestamp === start.timestamp) {
            const { rangeCount, hasDisabled } = getRangeInfo(start, {
              monthIndex,
              dayIndex
            });
            if (!hasDisabled) {
              if (rangeCount > props.maxRange) {
                showToast(locale.value.calendarMaxRangeTips.replace("{{maxRange}}", props.maxRange.toString()));
              } else {
                setSelected("end", newDay);
                updateStates();
                onSelect();
              }
              return;
            }
          }
        }
      } else {
        setSelected("start", newDay);
        updateStates();
        onSelect();
        return;
      }
      setSelected("start", newDay);
      updateStates();
    }
    function updateStates() {
      for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < months[i].days.length; j++) {
          const day = months[i].days[j];
          if (day.state !== "disabled") {
            const newState = getState(day.timestamp);
            if (newState !== day.state) {
              months[i].days[j] = getDayInfo(day_default(day.timestamp), {
                state: newState
              });
            }
          }
        }
      }
    }
    let timeValue = [start.timestamp, end.timestamp];
    function onChange() {
      if (isSameArray([start.timestamp, end.timestamp], timeValue)) {
        return;
      }
      timeValue = [start.timestamp, end.timestamp];
      emit("update:modelValue", getDetail().value);
      emit("change", getDetail().value);
    }
    function onSelect() {
      onChange();
      emit("select", getDetail());
    }
    function getDetail() {
      return formatter2([start.timestamp, end.timestamp]);
    }
    function getRangeInfo(start2, end2) {
      let hasDisabled = false;
      let rangeCount = start2.monthIndex === end2.monthIndex && start2.dayIndex === end2.dayIndex ? 1 : 2;
      for (let i = start2.monthIndex; i <= end2.monthIndex; i++) {
        for (let j = i === start2.monthIndex ? start2.dayIndex + 1 : 0, len = i === end2.monthIndex ? end2.dayIndex : months[i].days.length; j < len; j++) {
          const day = months[i].days[j];
          if (!day.cover) {
            if (day.state === "disabled") {
              hasDisabled = true;
            } else {
              rangeCount++;
            }
          }
        }
      }
      return {
        hasDisabled,
        rangeCount
      };
    }
    let monthActiveIndex = 0;
    let bodyScrollTop = 0;
    function onScroll(e) {
      bodyScrollTop = getScrollTop(e.currentTarget);
      updateBodyFixed(bodyScrollTop);
    }
    function updateBodyTitle(t, tY) {
      if (!bodyTitleEl.value) {
        return;
      }
      bodyTitleEl.value.textContent = t;
      bodyTitleEl.value.style.cssText = CSSProperties2CssText(getViewBodyTitleStyles(tY));
    }
    function updateBodyFixed(scrollTop) {
      const h3 = 28;
      const $items = bodyEl.value ? [].slice.call(bodyEl.value.querySelectorAll(".ak-virtual-list_item"), 0) : [];
      function getItemName(vIndex) {
        const realIndex = $items[vIndex] ? parseInt($items[vIndex].dataset.index) : -1;
        return realIndex === -1 ? "" : months[realIndex].caption;
      }
      if ($items.length === 0) {
        updateBodyTitle("", null);
        return;
      }
      const _index = monthActiveIndex;
      const nextIndex = _index + 1;
      const offsetTops = $items.map(($el) => {
        const matches = $el.style.cssText.match(/translate3d\(\w+,\s*(\d+)px,\s*\w+\)/);
        return matches && matches[1] ? parseFloat(matches[1]) : -1;
      });
      const current = offsetTops[_index];
      const next = offsetTops[nextIndex] != null ? offsetTops[nextIndex] : Infinity;
      const first = offsetTops[0];
      if (scrollTop < first) {
        updateBodyTitle("", null);
      } else if (scrollTop >= current) {
        if (scrollTop >= next) {
          monthActiveIndex = nextIndex;
          updateBodyTitle(getItemName(nextIndex), 0);
          if (offsetTops[nextIndex + 1] && scrollTop >= offsetTops[nextIndex + 1]) {
            updateBodyFixed(scrollTop);
          }
        } else if (next - scrollTop < h3) {
          updateBodyTitle(getItemName(_index), next - scrollTop - h3);
        } else {
          updateBodyTitle(getItemName(_index), 0);
        }
      } else {
        if (current - scrollTop < h3) {
          updateBodyTitle(getItemName(_index - 1), current - scrollTop - h3);
        } else {
          monthActiveIndex = _index - 1;
          updateBodyTitle(getItemName(_index - 1), 0);
          if (offsetTops[_index - 1] && offsetTops[_index - 1] > scrollTop) {
            updateBodyFixed(scrollTop);
          }
        }
      }
    }
    function getItemSize(index) {
      var _a, _b;
      return Math.ceil(((_b = (_a = months[index]) == null ? void 0 : _a.days.length) != null ? _b : 0) / 7) * 64 + 28;
    }
    watch8([() => props.minDate, () => props.maxDate, locale], () => {
      updateOptions();
      updateOriginalValue([start.timestamp, end.timestamp]);
    }, {
      deep: true,
      immediate: true
    });
    watch8(() => props.modelValue, (val) => updateValue(val), {
      deep: true,
      immediate: true
    });
    onMounted9(() => {
      updateBodyFixed(bodyScrollTop);
    });
    return {
      mode,
      weekDays,
      months,
      onDaysClick,
      getDetail,
      locale,
      getItemSize,
      bodyEl,
      onScroll,
      bodyTitleEl
    };
  }
});
var _hoisted_124 = { class: "ak-calendar-view" };
var _hoisted_220 = { class: "ak-calendar-view_header" };
var _hoisted_319 = { class: "ak-calendar-view_weekdays" };
var _hoisted_46 = {
  class: "ak-calendar-view_body",
  ref: "bodyEl"
};
var _hoisted_52 = {
  class: "ak-calendar-view_month-caption fixed",
  ref: "bodyTitleEl"
};
function render31(_ctx, _cache) {
  const _component_ViewMonth = _resolveComponent12("ViewMonth");
  const _component_VirtualList = _resolveComponent12("VirtualList");
  return _openBlock31(), _createElementBlock26("div", _hoisted_124, [
    _createElementVNode24("div", _hoisted_220, [
      _createElementVNode24("div", _hoisted_319, [
        (_openBlock31(true), _createElementBlock26(_Fragment5, null, _renderList5(_ctx.weekDays, (weekDay) => {
          return _openBlock31(), _createElementBlock26("span", {
            class: _normalizeClass14(["ak-calendar-view_weekday", { highlight: weekDay === "0" || weekDay === "6" }]),
            key: weekDay
          }, _toDisplayString8(_ctx.locale.calendarWeekDayTexts[weekDay]), 3);
        }), 128))
      ])
    ]),
    _createElementVNode24("div", _hoisted_46, [
      _createVNode5(_component_VirtualList, {
        ids: _ctx.months.map((v) => v.caption),
        itemSize: _ctx.getItemSize,
        onScroll: _ctx.onScroll
      }, {
        default: _withCtx5(({ index }) => [
          _createVNode5(_component_ViewMonth, {
            month: _ctx.months[index],
            monthIndex: index,
            mode: _ctx.mode,
            onDaysClick: _ctx.onDaysClick
          }, null, 8, ["month", "monthIndex", "mode", "onDaysClick"])
        ]),
        _: 1
      }, 8, ["ids", "itemSize", "onScroll"]),
      _createElementVNode24("div", _hoisted_52, null, 512)
    ], 512)
  ]);
}
_sfc_script31.render = render31;
_sfc_script31.__file = "packages/ui/src/Calendar/CalendarView.vue";

// vue:./CalendarPopup.vue
import { resolveComponent as _resolveComponent13, createVNode as _createVNode6, toDisplayString as _toDisplayString9, createTextVNode as _createTextVNode5, withCtx as _withCtx6, openBlock as _openBlock32, createElementBlock as _createElementBlock27, createCommentVNode as _createCommentVNode11, createBlock as _createBlock10 } from "vue";
var _sfc_script32 = defineComponent20({
  name: "ak-calendar-popup",
  components: { CalendarView: _sfc_script31, Drawer: _sfc_script10, Button: _sfc_script4 },
  props: {
    ...commonProps2,
    ...popupExtendProps,
    title: {
      type: String
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    ...pickerPopupEmits,
    confirm: calendarDetailValidator
  },
  setup(props, ctx) {
    const { emit } = ctx;
    const { locale } = useLocale();
    const viewRef = ref10();
    const valueSize = ref10(0);
    const { getDefaultDetail: getDefaultDetail3 } = useHandlers(props);
    let detail = getDefaultDetail3();
    const popup = usePopupExtend(ctx);
    function onViewSelect(newDetail) {
      valueSize.value = newDetail.valueArray.length;
      if (!props.showConfirm) {
        confirm();
      } else {
        valueSize.value = newDetail.valueArray.length;
      }
    }
    function onConfirmClick() {
      confirm();
    }
    function confirm() {
      const newDetail = getViewDetail();
      if (!isSameDetail(newDetail, detail)) {
        updateDetail(newDetail);
        emit("update:modelValue", getDetail().value);
        emit("change", getDetail().value);
      } else {
        updateDetail(newDetail);
      }
      popup.customConfirm(getDetail());
    }
    function getDetail() {
      return cloneDetail(detail);
    }
    function updateDetail(newDetail) {
      detail = newDetail;
      valueSize.value = newDetail.valueArray.length;
    }
    function getViewDetail() {
      var _a;
      return ((_a = viewRef.value) == null ? void 0 : _a.getDetail()) || getDefaultDetail3();
    }
    if (isValidValue(props.modelValue)) {
      detail.value = cloneData(props.modelValue);
    }
    watch9(() => props.modelValue, () => {
      nextTick2(() => {
        detail = getViewDetail();
      });
    }, {
      deep: true
    });
    onMounted10(() => {
      detail = getViewDetail();
    });
    return {
      ...popup,
      valueSize,
      viewRef,
      onViewSelect,
      onConfirmClick,
      getDetail,
      locale
    };
  }
});
var _hoisted_125 = {
  key: 0,
  class: "ak-calendar-popup_confirm"
};
function render32(_ctx, _cache) {
  const _component_CalendarView = _resolveComponent13("CalendarView");
  const _component_Button = _resolveComponent13("Button");
  const _component_Drawer = _resolveComponent13("Drawer");
  return _openBlock32(), _createBlock10(_component_Drawer, {
    class: "ak-calendar-popup",
    placement: "bottom",
    visible: _ctx.visible,
    title: _ctx.title,
    showClose: _ctx.showClose,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onConfirm: _ctx.onConfirm,
    onCancel: _ctx.onCancel,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx6(() => [
      _createVNode6(_component_CalendarView, {
        modelValue: _ctx.modelValue,
        minDate: _ctx.minDate,
        maxDate: _ctx.maxDate,
        initialMode: _ctx.initialMode,
        allowSameDay: _ctx.allowSameDay,
        maxRange: _ctx.maxRange,
        dayHandler: _ctx.dayHandler,
        firstDayOfWeek: _ctx.firstDayOfWeek,
        formatter: _ctx.formatter,
        parser: _ctx.parser,
        ref: "viewRef",
        onSelect: _ctx.onViewSelect
      }, null, 8, ["modelValue", "minDate", "maxDate", "initialMode", "allowSameDay", "maxRange", "dayHandler", "firstDayOfWeek", "formatter", "parser", "onSelect"]),
      _ctx.showConfirm ? (_openBlock32(), _createElementBlock27("div", _hoisted_125, [
        _createVNode6(_component_Button, {
          type: "primary",
          onClick: _ctx.onConfirmClick,
          disabled: _ctx.valueSize == 0
        }, {
          default: _withCtx6(() => [
            _createTextVNode5(_toDisplayString9(_ctx.locale.calendarConfirmText), 1)
          ]),
          _: 1
        }, 8, ["onClick", "disabled"])
      ])) : _createCommentVNode11("v-if", true)
    ]),
    _: 1
  }, 8, ["visible", "title", "showClose", "onVisibleStateChange", "onConfirm", "onCancel", "onUpdate:visible"]);
}
_sfc_script32.render = render32;
_sfc_script32.__file = "packages/ui/src/Calendar/CalendarPopup.vue";

// vue:./Calendar.vue
import { resolveComponent as _resolveComponent14, createVNode as _createVNode7, openBlock as _openBlock33, createBlock as _createBlock11, createCommentVNode as _createCommentVNode12, normalizeClass as _normalizeClass15, createElementBlock as _createElementBlock28 } from "vue";
var _sfc_script33 = defineComponent21({
  name: "ak-calendar",
  components: { SelectorField: _sfc_script26, CalendarPopup: _sfc_script32 },
  props: {
    ...commonProps2,
    ...pickerProps,
    showConfirm: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: { ...pickerEmits },
  setup(props, ctx) {
    const { emit } = ctx;
    const isInitPopup = ref11(false);
    const popupVisible = ref11(true);
    const fieldLabel = ref11("");
    const fieldValue = ref11("");
    const popup = ref11();
    const root = ref11();
    const { formatter: formatter2, parser: parser2, getDefaultDetail: getDefaultDetail3 } = useHandlers(props);
    let detail = getDefaultDetail3();
    function updateValue(val) {
      if (val == null) {
        return;
      }
      updateDetail(formatter2(parser2(val)));
    }
    function updateDetail(newDetail) {
      detail = newDetail;
      fieldLabel.value = newDetail.label;
      fieldValue.value = detail.value != null ? detail.valueArray.map((v) => v.join("-")).join(",") : "";
    }
    function onFieldClick() {
      if (!props.disabled) {
        if (!isInitPopup.value) {
          isInitPopup.value = true;
        } else {
          popupVisible.value = true;
        }
      }
    }
    function getDetail() {
      return cloneDetail(detail);
    }
    function onConfirm(newDetail) {
      if (isSameValue(detail.value, newDetail.value)) {
        return;
      }
      updateDetail(newDetail);
      emit("update:modelValue", getDetail().value);
      emit("change", getDetail().value);
    }
    watch10(() => props.modelValue, (val) => updateValue(val), {
      deep: true,
      immediate: true
    });
    watch10([isInitPopup, popupVisible], ([isInit, visible]) => {
      if (isInit && visible) {
        emit("focus");
      } else if (!visible) {
        emit("blur");
      }
    });
    return {
      root,
      isInitPopup,
      popupVisible,
      fieldLabel,
      fieldValue,
      popup,
      onFieldClick,
      onConfirm
    };
  }
});
function render33(_ctx, _cache) {
  const _component_SelectorField = _resolveComponent14("SelectorField");
  const _component_CalendarPopup = _resolveComponent14("CalendarPopup");
  return _openBlock33(), _createElementBlock28("div", {
    class: _normalizeClass15(["ak-calendar", { disabled: _ctx.disabled }]),
    ref: "root"
  }, [
    _createVNode7(_component_SelectorField, {
      label: _ctx.fieldLabel,
      value: _ctx.fieldValue,
      disabled: _ctx.disabled,
      name: _ctx.name,
      placeholder: _ctx.placeholder,
      onFieldClick: _ctx.onFieldClick
    }, null, 8, ["label", "value", "disabled", "name", "placeholder", "onFieldClick"]),
    _ctx.isInitPopup ? (_openBlock33(), _createBlock11(_component_CalendarPopup, {
      key: 0,
      modelValue: _ctx.modelValue,
      minDate: _ctx.minDate,
      maxDate: _ctx.maxDate,
      initialMode: _ctx.initialMode,
      allowSameDay: _ctx.allowSameDay,
      maxRange: _ctx.maxRange,
      dayHandler: _ctx.dayHandler,
      firstDayOfWeek: _ctx.firstDayOfWeek,
      title: _ctx.placeholder,
      formatter: _ctx.formatter,
      parser: _ctx.parser,
      showConfirm: _ctx.showConfirm,
      showClose: _ctx.showClose,
      visible: _ctx.popupVisible,
      "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.popupVisible = $event),
      onConfirm: _ctx.onConfirm,
      ref: "popup"
    }, null, 8, ["modelValue", "minDate", "maxDate", "initialMode", "allowSameDay", "maxRange", "dayHandler", "firstDayOfWeek", "title", "formatter", "parser", "showConfirm", "showClose", "visible", "onConfirm"])) : _createCommentVNode12("v-if", true)
  ], 2);
}
_sfc_script33.render = render33;
_sfc_script33.__file = "packages/ui/src/Calendar/Calendar.vue";

// packages/ui/src/Calendar/index.ts
var showCalendar = createShowPopup({
  apiName: "showCalendar",
  component: _sfc_script32,
  createHook: createConfirmHook
});
var Calendar_default = _sfc_script33;
var install17 = withInstall(_sfc_script33);

// packages/ui/src/CalendarPopup/index.ts
var CalendarPopup_default = _sfc_script32;
var install18 = withInstall(_sfc_script32);

// packages/ui/src/CalendarView/index.ts
var install19 = withInstall(_sfc_script31);
var CalendarView_default = _sfc_script31;

// vue:./Cascader.vue
import { defineComponent as defineComponent26 } from "vue";

// vue:./CascaderPopup.vue
import { defineComponent as defineComponent25 } from "vue";

// vue:./CascaderView.vue
import { defineComponent as defineComponent24, ref as ref14, watch as watch13, nextTick as nextTick5 } from "vue";

// vue:./Tab.vue
import { computed as computed19, defineComponent as defineComponent22 } from "vue";

// packages/ui/src/Tab/tab.ts
var tabEmits = {
  "update:activeValue": (value) => isStringNumberMix(value),
  change: (value, index) => isStringNumberMix(value) && isNumber(index)
};
var tabProps = {
  options: {
    type: Array,
    validator: (val) => {
      if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          const option = val[i];
          if (typeof option === "string" || typeof option === "number") {
          } else if (option && typeof option.label === "string" && isStringNumberMix(option.value)) {
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    },
    required: true,
    default: () => []
  },
  activeValue: {
    type: [Number, String]
  },
  color: {
    type: String,
    validator: colorValidator
  },
  activeColor: {
    type: String,
    validator: colorValidator
  }
};

// packages/ui/src/Tab/use-tab.ts
import { getCurrentInstance as getCurrentInstance2, ref as ref12, watch as watch11, computed as computed18, nextTick as nextTick3 } from "vue";

// packages/ui/src/Tab/util.ts
var getStyles2 = (color, activeColor) => {
  const obj = {};
  color && (obj["--ak-color"] = color);
  activeColor && (obj["--ak-active-color"] = activeColor);
  return obj;
};
var getClasses5 = (scrollThreshold, options2, hasSub) => {
  return [
    "ak-tab",
    {
      "no--scroll": options2.length <= scrollThreshold,
      "has--sub": hasSub
    }
  ];
};
var getItemClasses2 = (index, activeIndex) => {
  return [
    "ak-tab_item",
    "ak-vertical-hairline",
    {
      active: index === activeIndex,
      "active-prev": index === activeIndex - 1,
      "active-next": index === activeIndex + 1
    }
  ];
};

// packages/ui/src/Tab/use-tab.ts
function useTab(props, { emit }, { tabName }) {
  const instance = getCurrentInstance2();
  const listEl = ref12();
  const underlineEl = ref12();
  const options2 = ref12([]);
  const activeIndex = ref12(-1);
  const hasSub = ref12(false);
  const { frameStart } = useFrameTask();
  let value2 = props.activeValue;
  function updateOptions() {
    const options = [];
    let hasActive = false;
    hasSub.value = false;
    if (Array.isArray(props.options)) {
      props.options.forEach((item, index) => {
        var _a;
        let option = null;
        if (isNumber(item)) {
          option = {
            label: item.toString(),
            value: item
          };
        } else if (typeof item === "string") {
          option = {
            label: item,
            value: item
          };
        } else if (isObject(item)) {
          item = item;
          if (isStringNumberMix(item.value)) {
            option = {
              label: typeof item.label === "string" ? item.label : item.value.toString(),
              subLabel: typeof item.subLabel === "string" ? item.subLabel : "",
              value: item.value,
              icon: null
            };
            if (item.icon) {
              if (isURL(item.icon)) {
                option.iconLink = item.icon;
                option.activeIconLink = isURL(item.activeIcon) ? item.activeIcon : option.iconLink;
              } else {
                option.icon = item.icon;
                option.activeIcon = (_a = item.activeIcon) != null ? _a : option.icon;
              }
            }
            if (option.subLabel) {
              hasSub.value = true;
            }
            option.badge = handleBadge(item.badge);
          }
        }
        if (option) {
          if (option.value === value2) {
            activeIndex.value = index;
            hasActive = true;
          }
          options.push(option);
        }
      });
    }
    options2.value = options;
    if (!hasActive && options[0]) {
      updateActive(options[0].value);
    }
    updatePos();
  }
  function switchTo(value, isProp = false) {
    if (!updateActive(value)) {
      console.error(new exception_default('The value is not in "options".', isProp ? exception_default.TYPE.PROP_ERROR : exception_default.TYPE.PARAM_ERROR, tabName));
    }
  }
  function switchToIndex(index) {
    if (options2.value[index]) {
      updateActive(options2.value[index].value);
    } else {
      console.error(new exception_default('The "options[index]" not found.', exception_default.TYPE.PARAM_ERROR, tabName));
    }
  }
  function updateActive(value) {
    if (value === value2) {
      return true;
    }
    let hasValue = false;
    options2.value.forEach((option, index) => {
      if (option.value === value) {
        value2 = option.value;
        activeIndex.value = index;
        hasValue = true;
      }
    });
    if (!hasValue) {
      activeIndex.value = -1;
    }
    afterUpdate({
      hasValue,
      activeIndex: activeIndex.value
    });
    return hasValue;
  }
  function afterUpdate({
    hasValue
  }) {
    hasValue && (instance == null ? void 0 : instance.isMounted) && updatePos();
  }
  function onChange(value) {
    if (value === value2) {
      return;
    }
    updateActive(value);
    emit("update:activeValue", value);
    emit("change", value, activeIndex.value);
  }
  function updatePos() {
    nextTick3(() => {
      if (tabName === "TabBar") {
        return;
      }
      if (!listEl.value) {
        return;
      }
      const $list = listEl.value;
      const $activeItem = $list.children[activeIndex.value];
      if (!$activeItem) {
        return;
      }
      const vertical = tabName === "SideTab";
      const sizeKey = !vertical ? "Width" : "Height";
      const directionKey = !vertical ? "Left" : "Top";
      const offsetSizeKey = "offset" + sizeKey;
      const scrollSizeKey = "scroll" + sizeKey;
      const offsetDirectionKey = "offset" + directionKey;
      const scrollDirectionKey = "scroll" + directionKey;
      const w = $list[offsetSizeKey];
      const ofs = $activeItem[offsetDirectionKey];
      const from = $list[scrollDirectionKey];
      const to = $activeItem[offsetSizeKey] > w ? ofs : Math.max(Math.min(ofs - (w - $activeItem[offsetSizeKey]) / 2, $list[scrollSizeKey] - w), 0);
      frameStart({
        from,
        to,
        duration: 200,
        progress({ current }) {
          $list[scrollDirectionKey] = current;
        },
        complete({ current }) {
          $list[scrollDirectionKey] = current;
        }
      });
      if (tabName === "Tab" && underlineEl.value) {
        const $inner = $activeItem.querySelector(".ak-tab_item-inner");
        underlineEl.value.style.width = $inner.offsetWidth + "px";
        underlineEl.value.style.transform = `translate3d(${ofs - to + ($activeItem.offsetWidth - $inner.offsetWidth) / 2}px, 0, 0)`;
      }
    });
  }
  watch11(() => props.activeValue, (val) => val != null && switchTo(val, true));
  watch11(() => props.options, updateOptions, {
    deep: true,
    immediate: true
  });
  const styles = computed18(() => getStyles2(props.color, props.activeColor));
  return {
    listEl,
    underlineEl,
    activeIndex,
    hasSub,
    options2,
    switchTo: (value) => switchTo(value, false),
    switchToIndex,
    onChange,
    styles
  };
}

// vue:./Tab.vue
import { renderList as _renderList6, Fragment as _Fragment6, openBlock as _openBlock34, createElementBlock as _createElementBlock29, resolveComponent as _resolveComponent15, createBlock as _createBlock12, createCommentVNode as _createCommentVNode13, toDisplayString as _toDisplayString10, createElementVNode as _createElementVNode25, mergeProps as _mergeProps4, withCtx as _withCtx7, createVNode as _createVNode8, normalizeClass as _normalizeClass16 } from "vue";
var _sfc_script34 = defineComponent22({
  name: "ak-tab",
  components: { Icon: _sfc_script2, Badge: _sfc_script14 },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits },
  setup(props, ctx) {
    const tab = useTab(props, ctx, { tabName: "Tab" });
    const classes = computed19(() => getClasses5(props.scrollThreshold, tab.options2.value, tab.hasSub.value));
    return {
      classes,
      getItemClasses: getItemClasses2,
      ...tab
    };
  }
});
var _hoisted_126 = {
  class: "ak-tab_list",
  ref: "listEl"
};
var _hoisted_221 = ["onClick"];
var _hoisted_320 = { class: "ak-tab_item-text" };
var _hoisted_47 = {
  key: 0,
  class: "ak-tab_item-sub-text"
};
var _hoisted_53 = {
  class: "ak-tab_underline",
  ref: "underlineEl"
};
function render34(_ctx, _cache) {
  const _component_Icon = _resolveComponent15("Icon");
  const _component_Badge = _resolveComponent15("Badge");
  return _openBlock34(), _createElementBlock29("div", {
    class: _normalizeClass16(_ctx.classes)
  }, [
    _createElementVNode25("ul", _hoisted_126, [
      (_openBlock34(true), _createElementBlock29(_Fragment6, null, _renderList6(_ctx.options2, (item, index) => {
        return _openBlock34(), _createElementBlock29("li", {
          class: _normalizeClass16(_ctx.getItemClasses(index, _ctx.activeIndex)),
          key: item.value,
          onClick: ($event) => _ctx.onChange(item.value)
        }, [
          _createVNode8(_component_Badge, _mergeProps4({ class: "ak-tab_item-inner" }, item.badge), {
            default: _withCtx7(() => [
              item.icon ? (_openBlock34(), _createBlock12(_component_Icon, {
                key: 0,
                icon: index === _ctx.activeIndex ? item.activeIcon : item.icon
              }, null, 8, ["icon"])) : _createCommentVNode13("v-if", true),
              _createElementVNode25("span", _hoisted_320, _toDisplayString10(item.label), 1)
            ]),
            _: 2
          }, 1040),
          _ctx.hasSub ? (_openBlock34(), _createElementBlock29("span", _hoisted_47, _toDisplayString10(item.subLabel), 1)) : _createCommentVNode13("v-if", true)
        ], 10, _hoisted_221);
      }), 128))
    ], 512),
    _createElementVNode25("span", _hoisted_53, null, 512)
  ], 2);
}
_sfc_script34.render = render34;
_sfc_script34.__file = "packages/ui/src/Tab/Tab.vue";

// packages/ui/src/Tab/index.ts
var install20 = withInstall(_sfc_script34);
var Tab_default = _sfc_script34;

// vue:./Empty.vue
import { computed as computed20, defineComponent as defineComponent23 } from "vue";

// packages/ui/src/Empty/util.ts
var TYPE_NAMES = ["default", "error", "network", "search"];
var getImageUrl = (type) => {
  return images[getEnumsValue(TYPE_NAMES, type)];
};
var images = {
  default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAABLFBMVEUAAAC5u70AAABWWWBVW2Dq6uy3ur1QV2AAAABWWmDv7+9WWmBXWmBWWmAAAAAAAABVWmAAAABVWWHr6+zr6+0AAAAAAADr6+1XW2BVWWBXWmBVWmDr6+sAAAAAAAAAAABXWmEAAAAAAADs7O1XWmAAAABWWWDs7O1VWmDt7e0AAABVWmDn5+4AAAC6u75WWWDr6+25ur63ub3s7OxVVWDt7e0AAAAAAAC4ury5vLxWXGBXWmHq6u8AAACvr7/s7O4AAAC5ur7X2Nq5ub2Nj5Sho6eFio+3t7/r6+y5ur319fVWWmDm5ud+gYXx8fHNztBfY2mNkJTY2dqqq6/f3+GQkpeusLKtr7JcYGbMzM+goqVvcnevsbTg4ePAwcTb292goqaHio13en9pbXFpGLi+AAAASHRSTlMAf3NAv2BgEKaPEN9f71UJ72wfv49kMu/Pv29vQBNAnH9HOd+fK6+fn29QMCAc79/Pv3BQMH98XURfUE8wJBCvkd+fj49/MCBUahNhAAAGiElEQVR42uzYzUrDQBSG4c+zkICQYRbNLiMJZBNopV1IXSgVFxK8//sxVilSG20yxLbhfS7hhXPmRwAAAAAAAAAAAAAAAAAAAMAZqEIuDFeZpcJw9QUHvHnrdKPWzLZmGtPMrNSFuusOePdfAXMzmwsxK9CE/srw6C59BZ5SZa00zJ03y4TeSvvCChzGFTPbSTMaDuCqbxF9Wjmht9zbThB6m5tZldXejMN4kMzMq5VnacqXwgCpWS0MZ9wCo1dgrhFl90lyH9QqvZ/gKVWO/FORJluFFMwu+NenUzArNKJNUjhXJLeSN+fMa2pcUTuN6PYz4EbylucTDDi2ItmqpZKr+iDh4xDJ1AreT28FAgAAAAAAAABwKutl85fFci10WDVHWQkHvS6aoyyehEPWzZEehEOumyMthY6AzHBcQGY4MiAzHBmQGY4MyAxHBmSGFR+Q10hEwOl6XukHAvbyon0E7GetPQRsndXannjAK+0hIAF/Q8BzQ0ACvrNzN61NRFEYxwcmZZgmgRIF09RFwBKVuBCqGxUEcXHJiZraRPElKW2//3doNsO5cKHkkHPp5DznWU22f8JvNWdE84Btmwc8oICb67mRLTePEvB6ZmbLRwk4n5nZ3AN6QMk8YNvmAT2gaB6wbfOAHlA0D9i2eUAPKFoLA1bTcsd9/dts8+PQFrIFnPYJYqt1poBDGnZ23PBfs9tvhzaiu5AnIFGFYOD6lm5y/QNLhICz9YLWWQLWNOYfx0cP7cufZvPvh7cV/c8S8AOdFs0ungW7u6JVloBVhOCTYHg/aZElYNFhBF8Ey1vQMkvAmurm8WWwvEv6nSVgyQgeBcu7okvdgCmCb4LlJQgmAR1BAYKKAcfQCCoELGkIjKBCwKqPjOA+ARnBj7gIxgEdQQGCmgFL6qIguMoSsGAEj4PlMYLKATvUg0VQJeCIEXwaLG+L4EMBHUERgmlAR1CEYBrQERQgqBtwRK9QEdQJOMVFcM+AjOAAFEGlgBNG8G2wvAjBNKAjuAuCv7IEHNBJ83gRLC9CMA3oCAoQ1A54TmeYCMYBHUERgmlAR1CAoHbAokvvIBHcPyAjCPGOESOoHLBHE0gE44BaCD4PlscIJgEdQRGCaUBHUICgfsAenSIiqBewwkRQISAjWAIiqBiwhkQwDugIChDUDMgIVngIKgYshoyg5YsbRlA7YE1jPARVAqZXX++D5cUIxgEdQQGCOQIWHUAEVQPWVMMhqBqwBERQNWBFBIdgHNARFCGYBnQEJQjqBkyvvl4Hy2MEdQNWfTgEtQKmV18gCCoHHMMhGAd0BEUIpgEdQRGCygH54AELQe2AIzQEtQOW1MVCUDtgwQh+Cpa3RTAJ6AjKEFQOmL7r+zlY3hbBLAGnYAgqBuSDByQE9QNOsBCMAzqCUgSzBJzSCRKCcUBHUIpgnoDndAaEoGZARhDjS1BbBLMEHEAheM/OHatEEARBGJ5lhWVwBMM9L9loEwVzc00aETHQ4IQT3/8dbE7m3NSmK6qqR/iDDxa2JzlgR5DiObwTgtuAQjCAICJgs5UHwW1AIfhvBA/pAfvVFw2C24BCMIAgJGCzHQ2CkICTXXO8BOUIQgI6giMLgpiA1fYUz+E5gtuAQjCA4AskoCM4kSB4hAQsMw2CX5iA1RYSBD8wAR94EDz8BRSCEQRfIQHLTHL//2bPmIDVKhuCuQFHlvt/RxAScDJjQ3AoqbugQ3AoQjCIYA8oBIMIQgJOV2wIJgbsV19cCGYHXKxSPIzsCGICjjazIPjeA6YjSPEwsiMICegINioE0wPekCGYHnC0SyoEh5I9MgRPAYVgEMEeUAjGEMQEvOVCMDdg/9eX4v7fEcQEXKkQBAT0gweK+39HsAcUglEEe0AhGEQQE9D/9eVB8DegEAwiiAnoBw88CJ4DCsEQgpiAjiDFm6COICZgs5UGQUhAR5DjYWRHMD1gv/piQbAHFIJBBM8BhWAMQUzAiQfBx9InBEMILgWy1SrF5/ARFXA02xMg+PltrWC2GMfu7wpobTaC7Z6KpmmapmmapmnaT3t1jMIgEEVR9DOVEJhgoZ0MCDZpLK1cgfvfTyYGUqQQTGOKc5Zwi/cAAAAAAAAA4B/dtgO3qLr00QXf5u3ALCAAwPXWnFKeosqlLMFJY9r1EUtT5eCcLvX3e5/aiNIMQ1OCc9p3wE7AH/VpN0bkpjKCp02vE1mjWkp5BAAAAAAAAADAlZ5X9riGUcwcQgAAAABJRU5ErkJggg==",
  error: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAABGlBMVEUAAABWWWBWWGADCRMDCRK5ub3s7O23t7pVWWC6u7xWWmBQV2C4uLzv7+8ABxFVWWC7vL8ACBxWWmCysr+5ur25ur3r6+sCCBO2trhVWmBVWmBUWWACCBK3uL3s7O25ub1WWmBTWGBVW2ACCBS5ur0CCRLp6env7+/V1tjr6+3s7O0CCBO4uLyvr69WW2AECBMCBxIDCRG5ub9VWWDr6+zs7O62t7rv7+9VWGAECBTp6exWWWAFCRJWWmDr6+vq6uqen6S6u7/Nz8/q6uzr6+y5ur1WWmBobHHZ2dvj4+XQ0dOho6bGx8lfY2m/wMOXmZ2rrbBydXp7foPl5ufe3uC8vsCFh4zCw8aOkJWztbjJyszMzc+kpqqdn6MmV5AcAAAARHRSTlMA3x9zpt/fIH+/7xCAIBJw7wivEM+fgGUwML+QnG/vj89QPz2vfHEQ/s+RSEAQj2xTK1/Pv69QMGBdUKAcn0Aw19+fYBionxsAAAsmSURBVHja7NhdU9pAFMbxkzQKJTKKL1UjUkTRKq2jLR1749h2loMEAqKj1dp+/6/RjZSopbo7IRl39PldwGWWw27+AQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHhpLI5YJC2+esAiAQYI2varRae6ThDTnnNjjyCWdTm7QqHmOPsEcVSd2mAfVgnicJwCSQWnSBBHcThAhyCO6iAfNRzhmPYdp1YoyBTjQQaPMU9kveoUq3iIAQAAAAAAAAB4EWwvx8zWwzzPsylldtkakeN75CKMZOdYrexSusqsoUImOuRZO5zjwyoViw8pVStsLdv/cukud5c9MhGzrbNLs5SiLOfUi3Bz7JKBbpZ1UC+JodLkqA7z1zylZY15mojy25O3SmJEwK16nozj8S7lS0LhhPnbFqUi2t/b4lFt7svXIzJNuPy6UOpx8zulwrZ4haQd5Vfoy7c6GecL85VQu+DmJqWhzJ9IeiMe5TOfiBCZJ8uBL5RaTT5NY4IywGFANsWjjpvcFqYOkHa5eSwk5WfoHVEk2QDnS6pv70K+mXmEpTL3W0LJTyHFMsBr4fwmlfePvws0MMOSa/GlULtinolSnGSAtxTza0dHZCcTmiPTyA/SFmptDjrzmeQD/Fl12TDAIb8xML9EhqnopfiSm9fzc8ltfK0Ad4YBFu8aEeMmOK2X4j6f+gtPFeCz80bkNZlGP8WdqUQDfKC4YhTgs27jDjKOp5figH91Pyay5/UC3A8DPDq/GTKOa/GFXoq750s0tmXWCnAvOhg/G3ctkHn0U3w9kUkgwFmtAAfHtwG+JRdgoIrMnV6Kf0zMjb3dPY0An98PsMERjm5LHa0U9/0NGsusXoCD4ZloNe5ZJUNlOdBN8dvxrmPpBbg3GmBpiow1y029FP/uro6105e1Atz/7/w2yFyuxacipL43dd/HD/DgL/yYAZ74QAaTdexp/iqeyYwX4PpzCvAf9s53p4kgiuITdg1RyKZF4kKoopAmGkgIxhAqRD/YbLe0QGmstOD7P4eliJdacc7c/ZOZO3seYbvd3+49554hbb6AUHxJKDa/ydeAEf4kSUa/r58TACYdE4o1D6ib50wAr9ALjB7A3x0BMIxiGhKPb7fZAP4sD8CkEwjF6RTF16/Nr1+yiYzwCcDWf8EtauUthOI+A8U7GIDHfwB87RCAjVE8IBQbAviDTADPobiHobhvguIlDMCDGcYWr1/Nmes3Q/GorddwiuJ1A/cPAvBZ8vDrpfMA/qgcUhEo3iIAgyN89wA8h+IURPFqAR76IoC3lWMit12D4p8XR2iIDfbQFwG8rlzTErntuid+bQP30LUA7jgOYNKSAYqXcwyxuQ5g0js4+Haz/jLPENsigI+UkwLd9g657ToP3Q8Ac9z261XEQ/8/gFMxADZ22xNy2zOE2IbkoTsOYE7w7aK2oQ2x+QNgptueOcQm7/qR284KvlGIje+h7yvHNfUgMwXftow9dBkAzhx8IwAL9dBNUNzBg2/8EJtrHjrbbceDbxRiE+mhM0b8CIrFh9g42uQF3/AQ28ilEFvRwTf5IbZSgm/koX/xGcCkE6PgGx5i67oYYmO67XjwjRVi64sEMDP45pGHXlDwbQX00J8IsdUEAZgXfFsz9dDtBXDUbIRBVLLbPpbjoUeNcKpGVK7bniSrkIc+tH+EH4RxPYrDZl4ovmqDbvs+4qGn9nvoYRjRYSWlBd967W5tWYaHPjuuJArDkoJvpPS9DA+9GcZRPQ4DVZLbThLiobMgwq+ZIQkA8L2iIGw0I6XKGfGTPAmxFea2+xJiK8ptFwFgSHy3na+eIwAGVFDNDFwEYzeAGeIE3/gA7toO4L9lBYrvQmw+jPAzue24h25zFxGgQmpmYA/dSwDrUVyN8NnBN8xzmkj30LO57ZWHnm3EX3noGWtm5BXBcMQPvvkdYuOO+CsA5+W2Sy2CYYjltsstggHF/6ZrY+0AFYCfeBl8ht6BzhbBQOJ3kX99A04BJ84WwUDid5F/a7exmpmzCsD/XuP6hL4H+jrCR6pQwZoZT0f4QBUq6AbfVgB+DOCdxylosGbGKw/dqIscDb755KGbVaGCNTOjCsCPqlBfmXsi/QrAmipUbc1MBWBNFaq2Zsb7B6CmClVfM+P5K4ymChWpmXGqTZEhfhUquNsucxcplypUcLfd4/cYoAoVqpmx73y9YoVXoYI1M54OU5EqVLRmJu9dwPpuKwhah8pmYVWoaM1MvmscUSuYKa4rawVWocI1M7nuAu4F8WldncbBnrJVYBVqD6+ZyXMX8CC4vxGDA2WrsCrUAaNmJusuoBsXEG5iY9TMZN8FnP2FVd3ivzDexNZj1Mxkh0g9DmZqRcpKHVMTm/YwlbFBzUyOu4CHd68xu5ZC+AHA0GEq3Su08W1w4XxHZc7neXdSSqNCNTN+TKepChU8TGV0nvTQmhkfvorJQ0eLYC6TZATWzHiwZEMeOr6H/gNF8fhWvEdMHrpJEcwQP9RFeMySPHSjPfRJBzvURTyKqQrVcA99cI4d6iIcxeShGxfBDGAU9wWjmDx08yKYKYonYPBNrFf8i72zbWkjiKJwM5DG7FoQo6ArpWkRqqX0Q2lFEL9lJhuJb2sSxP//QySReFUc9ujNjDN39vkDLhhySM7JfegUKh7AxAyTugiO4vkpVI7N7A8cxTLbdrBDn9llKgXuVxO4mFkGMOMSW4771eS17dShM2Qqb/CriWvbsQ59XCNT+YFG8fBOWNuO6kRrZCqwX01a204dOvcQzDyK0xu+UYfOkanQmZnUhm8qowDm/Q4dPzNzJWj4Rh06+3foyyhOa/jW59nMdl47M5PS8G1vhTIVOjOTzvDNohOFD8EwpS7RR7GlQ2cegtkE2/b4o1hlTJuZ/cxMEht06tAZAWw7M5NAFFOHzrCZsc7M3Mbdtru0mR3jw7doL2pRh84N4DSjmDp0ZgDz/WpRtu3UoTuymeV90cM3DzpR1RI8fMM79On7b7nvZnKHb1iHXp7zbGbHYodvuE6UJ1NZEzp8gzv0a65M5UTk8I10os5tZnlf4PCN3aG/7Y+JG74pWCc6XoVMRWXShm8FTyd65MivVsUSxXvedaJrooZv1KH7s5lJGr5Rh+7PZiZp+KYyjwFM4MO3wKOYOnSPOlFJwzfq0P3pRCUN36hD96cTlTR8+4gAljR8+4516LNV2swkDd+oQ/cYwJKGb4WlQ4dX5ITrKK4mIUaxMYqzIvfnVxsZMzgIMIozk1sCGFmRe/SrlcYMBgFGcWE2d3dKG+M5U2BFzvarjV9yVj7jrFq0oeG17aplagFW5Owyq55Fik10cFGsTltDK9WCmXObWV5UL7kePufy4SF0iFEM3FJ0azPDlRo3QR6RB87hu9WJIidt6WN4eF/xA+coPehE/yMvwIswVZJffh1+XjB6yuQppXOb2c9/h5PXGS05mAauclnXAA5fA11tJQqb318N4NJm1mtrkDDbduzxXeZgZ0NbCV9p39MAjnWivzXGxqcA6YXwBvRV1xCykamrAVxH4DdtIQInZ6cdwqNb/o1ROCU721vtOVtdK/vOdaK97Uf2Lc+wnrrTtKGhoaGhoeG+vTtGQRgIogA6Mv2CVQ6wZYqNpZDa+x9JDYFYibHJKu8d4cMwv/sAAMAH5jpkXsdOR6/6V3NVg6/ya7VElDG7Xa7r2iVbiUVp2feEbJ+mLbWaU7BX5jlW537nOzvWXgPMYK9pe74XJ+yJHOBZX0pEqU0RVKSPUcZr5lDnAIC/d7q9dYqHIRdDIEAAAAAAAAAAAAAAAPhVd5Wiq/xLx53iAAAAAElFTkSuQmCC",
  network: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAABklBMVEUAAABVWWBWWmBWWmC4uLm5ub1VWGBQUWC5ur2xsbNVWmDv7+/s7O1VWWDv7+9VWmC4ubzr6+zs7O0ECRS6ur25ub3r6+1VWWBWWmC5ur1XWmC5ur26urru7u5VWWC7vL/s7O3r6+tXW2ADCRLq6uy5ur3s7O3r6+xVWWC5ubxXWmBWWWC5ur3r6+wCCBMDCBSqrLC5ubwECBPp6esCCBICChEDCBMADx9UWWACCBICCBHY2doCCRIACxEDCRPU1djs7O2BhInr6+1wc3iNj5UCChHr6+ylpqtfY2mWmJxsb3WQk5ewsbUDCRLU1teUlJnn5+nh4uPW19lsb3WjpKigoqd6f4TIycugoaVwcnjg4eJ3e4CkpqjX19mBg4jr6+y5ur1WWmBobHHY2duho6bi4uRfY2jFx8mztbiOkJV7foO8vcC/wMPS0tTk5eZjZmzn6OmXmZ1xdXrQ0NKqrK/Oz9HLzM6Iio+trrKEh4xydXvCw8bV1dfe3uBdYGaUlpqnqKza2tzCw8V1eH2cnqJvcned9DF3AAAAX3RSTlMAf+/fIN8gEH8QnxDfYCAwX4Dvc+/Pz89vnz+/MDC/P19Av6agj4+/UG+vj69wPGHfT2xRmjInCI9RGNtIDla5r9+fnIov7+/v38Own3xvQCDv7+/avzCnZ2Dfz4+Ab73wamwAABVaSURBVHja7NZda9pwFMfxk7j5Z6lO2rCaZVTaWqoojWBbxaJrYS0Mtm6DXWxXS6PGp7ILaxl0r35J1KbYbUQTU5P8viBeeZEP55xICCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghz2IyIReleC3NCLnwMwW3XhJapCSvcfGY9lVXtwkt4KdpHFG8qd1AcHG/tVwLgm78NlUVgu78IOjOD4Lu/MIveHyZzV4qZKSUy4rXfuEXrGWt6oafaKR46xcBwaNsvVqtZ4+IymKjIZY99YuCoPeAtt8jwYEaPsF61qpmr7DHfnZdTVN9FzxRaMkp5kvk2H6JeO9nT2Df/N4hPyuJDQpS//X7ratG6+RjVeMoBSkHfuoW+VTV+FTEGgUoJ36/Xr0gX1LEUr1SEy8oODnyu7rySbBSEs1qlcAcQYd+vglS46JmGZZOKAg59PNT0DiBby9qJVGhAOTQz1/BunUCA7HDzv2s3tA/i+a/QId+duRHVbFEwWhuv9fkS8oxBSLOsZ99AxH8vPV7mYDfEvyaLfjBbyb//X7CD37j4LdiwQ9+cwS/FQt+8Jujp/d7/owQ/KbFH7aYnxQtPxaXkxInCJl0LKY9jo+lMwWB45JyijnzS/7dT78JmR+L56ViIc3PgMWM3jcnzWqmMwKXl1nU/VgqWSzE7BHbFYR35x8+fjs9PcslEhszD94ada977WF/cNO5/0mmKMkskn5MloQpXaxQlH58/7S+l0uoztJH3dv2nQE5ZczHo+SXurdLC1L+8+HB3uaGulB693Y46EwUOZlFwE+WdnnredPFZOrL9n7OoHPb6Lo9UTRGkYXYLz7BiwlSau3QtPOw1vVwMEYshNKP5YtjvGKSrW3vJ9RlpHfbFuJ52PzYePR4wcDbWRKejTjsqYmzEPkZi2ttFifT1kFO9amw+DFLj88kGc05evC71xNkc3HnfGPAj2SBN2dPZvTkegH0Yxxv3j1pJfSC5ydbq8sxWlvPqStQsPwYlzaHTybaWQm9gPnFOX46fCuwuoHzk3enw3fmCZ/earX06PiZfLxg8B3mFvXq9m7b/f5g0Gx2tId1ms3B4K7fbve6I92tX281/f5wd2Y/bVxRGL/xbmICqdgNMaCaYgJSUV4q8UDbVG2TVk2T7pvsO4tnsbGxsQGHJSFJ/+/emfH4DPbsvmOu+j1UUapOyK/nO+fO+Hxjgi+sd0W+1mn1gJmVG/wuiFMVoSaJIfmdN5tvPmWOX1h8JzIhB7xUpSXIsiQR6w57WdKeRwvW59FVtdWRxOD8MMbxeynEkkLhO+koJgyu1+rUnLzZIBr6LyUZnke3e4IkBuLXfLaJMfd0A7Gi4PjEmvkgmVMEmb/NS7zhj7qnkvSuXq9VrKrX30nSaffo8uaq0X8erah6KZ6U7dWz5Uf8u6tizP3CBkLf+ABeu8/ulgGPRf7oVKpXfKomSd1LDaTizE8ZnR8Gv4ck3M9pCO/+pXfpqUD4JEHtd6+aCOiuLrtSrRJOCr6+aPjmx5n8iGQN4fd3hhBuef3iE2uKbltV61nA7rReGUNn+PptpXJxHITfXpnIRKj8docIt+MYP0oh9CTnTa+jNz2uBfAafPcdkBiHX70RhN96GSRUMRb+uSOEM5twy+tJTy+9Dj+oPB4K7w74gXgFY+7TdTQ5gXsxji0hdP9Lz76nVnV64sC2XQ0eE/yMVSPcO1hDE9YKce9naYS8mp/UGqJ3GW5czCWTybmh31PH5getUPhyoj5O7fTdu+DDuqpgoeebV365mJmdLRQSiQSyKptIFAr7s5nMMhV+4OPkHpqYlmKGe7e8i6/akgLRS+4WS/urWeStKRybQas/HI/JD3ysHEyoCFObxuxdd3WvpBdfTTSHhuSJbjkzC8Xmjx9a+8iWX9UvP5CAMSdv3UdRCspvG6EHbrNXFDhr8V11ax7sSgUoOgr8Tkb44fcvgJ9LEUY4j6H8dtII7X3kho94lxPM4jt659bs8sV9YEeV32VloA//Yox39LL0KEIp4mGyDeXnik/1VXz5DBQedX78rRp/MYXhp3IrQiEXYRGmP9O6H5SfJ74bydm2RYAXPb8E8c5U3A0hFCEfWSeciRvD93MvfKZ3a46lV4JxMRl+xgdegNClCKudHNiY8vRYJOW3kXPFp/CAz4kelN7k+AFCxbUXii2MFfEhoq70jnHrseVefYCPAj2K/AIglKvExp88oG5fj+khc2CPxqnT0AB6E+YH+lU7oAq8xyzp5J5EYd8nH7kcm6H32R9YigWE7p5fdr5yrmqH5rKLiI1bZZo2/szdvqKCcVV2NW8eTnsT5Tc3yo/o/F+C8MSFYEez8cIDeofn2BLY1+5Pqwoi4AtffPT5rdrxI3rTdG+FPEcI59YQFW3iuPZj5xzc24bZcVO3O/GRzkeLXzwcP9B+Hh4mYq7jQrCHsUzJxhjPwOHZZupz/eZ3Jdl5F4qPAr+UAz/Bix8osWz8S6MVQhHaXbNc3qJTgY/QhkP5cRib7u3a42OMn44wCT4WnI8zmCP/XLhPoQfG8eOHtuXXA/de1mzxMchPQ5gxEMo95yLkqwbcPRqHwBj+rjyqGhkenT5KG/cuJxCj/CwIz6EIR6ZIS//FOqW3P87bdT+Vd3RvPoEY5mdBeGZbhCKHX+u/yP1I6f0DscOR7meW31WdonnTM9tGbv1R3KJFmvygF0IROn0qcFwv0aqAb18NndVfQ/nRwKfn1uMxbC/6/AChbLZykGBWJWlNRURD6UX800toECrGLafym5sNEb4eJP5j8Z2px0+/++X7/OHhwcEr3pD0MpdboMgPEOb745irlUEdjCX4VADuBsccxX99DdPDPPt1R/AFOzanSPgacut/7JPc+oLzogg9fqDZpGbj91YbdzEWgB8huEqFYAw/G9i3Z5z9GhdhZgfA2+mHr0mAeHV9CyKW/vnh0PxAmf4safODASwY7qqYmkUUtI3xed++HYezX7Lg27bTU4PwdWIDwtdB+clj8oNW+JbYWOoP4J5RHnW4JqVRfH1R7nLmc4zjkbNfJus/hWjkh1MkhgjbDWH53YTmBz4GG/cwJwI/Q0lERY9x88NgYIn1cO5N3zPyw0szaAOSYOPwEwdGUATgF0zZomHjljgYwBfW0kB0pP3VW/b2nSsFScBOQwqRIj8V4+bzGRROCVKEH65xlbTVkfFYRJSUfrz54RgOf0HLb2UzZuSH0cbHQI8iv2s9wjAdMsKQMQ7V8kisaR5RVEaC6eu//CABC7UXAb9vVmeea6mTqZXQRSjIN9BWI0mFLUs3w/adT3gX384gAQuHFfr8tLuVWk8vw3TYTlg5gstS5wdPxQN1iO1NSwI2Yn5EvMBpB6RUyHFcqd/a5ikgykok/Z39wLtxKL7o+RmSVc3Jv4b42+0On80QdSXmKqDdrI/WFyfZ/wewDRwJv7cDfrB2ip/PhujyUfED7cP1S574zABxuRwtv1ngZ0X4RXCEq0lLfaBIlKn4u8sm+KD1TZofIAxv42QWRaOin8PfdBzwTYgfLYSZyGPteZi+LiHERYJvLSg+/kTudALw6wE/J4Tcs/WgXUrv86soMmWLu/teQYiY9ha6L/2TM3LrmIjj/fM7c+cHaaTgZ41ZdGe6F4MMp8/gOiTRQ/B74P7nSFoa6TDgqkvQDVrKMaYdCEJ4v/TPYFfVc+tcGH63D5hspJHG2qSO+2x+BN7t8LXYDsgPn301zI+NNNIY5We4d8uz9GQjPwzha51fs3767sgnP+EaEz36GTbVPPYmW3+yXoTmIv9Gzn9+GMLX9SZunlcqp178QG+fbmL9OsDQIwhCdvAZ1krcT4pONBOwkB/Ww9fnQfnpg/KwpnAaww7vrwhzbLxrInz5SS37/LDJ7ygQP6L7Tz5O6gxV2VcR8qwWYWoRYyg/R+va5oe9+XVs+Zla28sr+jDiy37SSGuIQS3FcHzGvfxEwSEB681PcOAH+vHJN0ZC1AOhFgThHyLWlO4vou+5eFeB4gN6Qfg1bPnBDWxdO9dgTvY8E3J8jrFxnFqERXSXAHHPGkIMzq/uys+4kNAEhK5BkHXEkFaIfWF6OOCrCtbio8/P1BtvhIL28SxDNl7qh4h94WtAFII6P2+EEM1o8wus2Lj/9dEfO95FAT5Y5afLrwAfM3ghhCCIyMo0julfn7DgOHmd8QG/ZPEwDD/Qaik/grDtFqVpYwKYjZvjRXzP8YZehggs4BvmF/89gR6G5QfK7hsBBvc0EpSgVGaE4ArG0/b9j4cQIuAb5ZdCY/IDFSwM5TPwsdMWfg6xoCUcy9i6F0KIDhHY/N/fBuZXQiB7hpWKZxqp3V9i+wQxocc4fmD7HLjlEUJMxQPzyyBPZWdJP3RNI7XMLfwCYkOb+NuXozmS1xKEEG3D64TfIm1+sHXqnEYSzHfzdFl5H3I6jp9/Xbaoyw3+zzfsmt9uASGdX9qBXyckP0BI9lwcgiA16xJbCTGh1O04WAcSzeDeoVV+V35yeH4gEyFskEMMDt7NU0RMiIzin2H4DrqfeOGEL3p+gFBomuMYBjA825lnw8ZLg0CdxA1yJJe2+CbFDxCeq2DjNn49dO0kG1/MTAJ1r/rdX+Wh+43gmyQ/QKj0ZwkM4Lr1ZMmEdnDzSg8RCw45EojATo4fpJGaWluGASxVQIwcZsgofn/E4aoEKcThEOJE+YGyGTPPRS5es26RszRGNCywmNGo24cQJ88PzoVnmAgGMGMtUNNM3IzR8cP2LWbvjB/4+E3z2ri4yO53s+SPwCCg+QK6U36wg19vDF18ji1+KJu8HI3RZVB4foqqnn0xvb2SorQfX+e1mBpzE9h2Bx02gcPzO8MDLcI3go+7nAzKIOZUsO1+4fn1vrr3VOmpVRPj1PTMGD+cVoQsDmCrSjY5kvD8zjLm4+6TWqfXNuLtJCk7xjgGzSMmlbGmEOnwA0mdHmcEZkMyLDE7gEG70GEo8gOddFSdYbg6TCQZHcDWUWz8gAUq/Ny+32VnG4XPc+0jZpVIgkFo8wPJvbD54AyjA/hWXmo5GxU/EC/r+eBUiPuSOab5gaLkB1tLUy/Q/10R8YM8F3N3FNT5PYqEHyB89n9GSPhNIcr8GPl2KQ9Fz69bHeGnBOIH20KYO2B3Bf+/9s72p2koisN3mw6ZTk06QB1REcSBkwXYQEGJxpf4wRgTjYmf2N1btxUSYAOcDBWN/7e3LdvZlq50Xbve25wnUQJfSJ7cl7L+zjkj9Perjz8/1XO57+/qQP4gjJPjMEDuib+BW2pBFQNvAXKB/DF8twjt+dusKeV6oVBh7BcKZUXOD7IIS2X/LMIbwUH9/XsFDUE7OWBlnTWrTzQFnjL4o/QH49Yb2tJjqAuxUc215qoXZEvbuJp/6YdFeO5vbgB/wbuvy4bj1msKG6yuV7aXL9rQNR6LkUbg7+ffypuO++Pa5NzcJpu3ztjdbeZPi3vtAePVctF8G6sG33GRIHfPX6XHX7mQzZ7fv9fmnqxeb3/8DijqYPWm1hirVDE9EIsNlmET/CC06g/Q/E3Or7breW9mjfhzKH+vXlAfXDxgAsU2aMnf3km3PzKjygN/fZHl4xwUMfRPkXNaW+2WPwD89UU2LsyEFLnQAl33ByVximFCXf/pPBEUl/2Z13NBL/dmTNAPWd33Bxz3VjFAL/ci76/eRuEvdjnJxq1fuclYYJPVk3EIt/Sp5yrmaLXjho9z+/bcbX9sePNNw3Hr08tXkhNZoKeeq8F06v44z2+46S+WXJgmpowvP1QlQj1XI987TIX7BIxj/m73yrlntZqrs6hQ91Zv9XLf5TzDZuLvqQ1/NgGH39VWHNoFXOc3hW/NX6Cfv/yw/swH7R1TWmhfwGf8psjt+8tZ9We/GKnUGqai8Jsi59CfplCvKfzbOUyF+xAbP/7a9Vw7msATvlPkXPpjaLMKFVZlcYT+hgmQK0oWiBNhiHrur7WPxbyAo5QDf2o9l9D+rj7ywJ/JIpwmonDub9J7f+wk1P9G5qchx/D+qiPxB1wR7QK+wN+P4gj9QTFSkoiCBX8MeST+oKYwzk8duiP+jgb2F44+jiwuRgKJMLGBcPevY/5gFlibqWiY+Ban/cEwq+BiIPrtzRdtWkYoMEb8iSv+Eu1hVvpEEqVK6fsPvgzgu+Iv0NLXlVejhUec9Izl3V9Eb8n/0qCdIK9jBLjyF6DBOwSqRLoLmnwQmhzOX9xKE7gbBKZ0dRuUfWXQhr+JcQuNHG8ZrL/WG9+ijwwm3PBHIjRC+lYpVWmBm767wzPlhr8wpWFC5vvVVtNSkZPe2Y4IjBDioD9YgNe3AYMl+M4nV7Ea4Vh12B8JqgsQxkkaLEHBg889Bl857C9B78ICNKJEa/5ZgqrBiqP+yGMagLEkRlRoXeTgrqlB+/6ABzQB56oRde0XnonzWbMFg074g4vpBrm6bYKiZV/2BPq03rpB+/6AEA2TGTOBsv5+ZYeXvrvOGHTCHwhctSDwhKfGsQ4YdMAfCLxvQaAs0is3KwahQtKePzgDEyCw3xmoC4z5ZglqBp3xRyL0lrnAfVrQBAr11teaQfC3a9sfidK75mfgAZVb+b8Y8Q/MYMMJf2SMBsc+mdVR05L2VbDgiyWDw/gDHrA9fM1kB+vH7algyRcLfP3cqNn3ByRoiMxvm86CYxyevx3wE9OxbN6+PyBEb82YLMDqtv4c7Ur2ZS1FvAAMHp7JNv0Bd2gwPAnKeqtY87CDnU/vbkgZ9t8aGTVgEAB/NkbUfQRnhlWssksCydbKi+eSR8sQDII/W4xN0alN05xh3rX8+IYkrSytEw8Ag8Onk8MhqP7tHlT3o7uIJum4v5QkebaBwSD4s2+wVDfo5gQ5Q3cCqM+lrbWVLeIJYBD82Wcs0tONo1jPqTO9NY5cmySVecv+SRvEG8Ag+LNPNMQUVpSaKi9frpTYd3Kvvxhxg60l4g1gEPwNqxCotobs6jlrHz5HA5eSMIBlGJZ/72vN2kq5Sr11pzQV/mbB8ctldfpRB3vNnayYRXAecU/r1tY83VO37mlTVrJdiBMi94yHWUCEWVLcMT7R7Qw3sJ2pLsZM+OeFiCuAQfQ3HOO3dWMCzILjlVb1L3AZHwCHURgXtCGgp0wvJCe0Rni3F/DpD0EQBEEQBEEQBEEQBEEQBEEQRBTWtiSWhiWMZ+l0iiADsiRpZAhJzTKeEWQwUlJmfT0jrRCSnt3YmE0TZDBWdIEpFGiTjKSxxI7AWQYeggPztn2JpNJpPAIRBEEQBEEQBEEQBEEQBEEQBEEQBEEQv/MfSsOKgOxMwnIAAAAASUVORK5CYII=",
  search: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAABVlBMVEUAAAAECRS6ur1WWWBYWGBWWWBWWmBWWmBQVGBWWmBVWWC4uLxWW2BWWmC5ur25u726ur25ub3s7O3r6+zt7e6vr7lWWmBWWmDs7O3r6+tVWWDs7Oy5ur25ur0DCBRVWWFWWmBXW2ADCBLv7+/s7O1WWmC6urq5ub25u71WWmADCBTr6+3r6+26u725ur65ub2+wMEDCRQCCRIEChIACg8CCQ+5ur3t7e4ECBNVV2Dq6uy2trtQWGG4ub3s7O/s7O7r6+wADiTX2Nns7Ozq6up2en7NztB2eX6fn6eIio+kp6qpqq6Ymp53e37h4eJqbnNgZGrg4OLGx8pvc3eMj5N8foLr6+y5ur1WWmDY2dpfY2nP0NKOkJXGx8lobHGhoqbh4uN7foO8vsCXmZ2/wMOqrK/l5ea0tbje3+Do6OnS09VydXrV1tfCw8aEh4zi4uTKy82Iio/oOAafAAAAVnRSTlMAc5/fIKDvvxCffx9Ajz+/73/fwCAQz1/vQDCB389XP69vHRCfTzCPX4Bkz49v399PSjsrEjKvb2xvYDAfjzCvUAfDkDDln5Qg17+ffz/v7+/fv7+vfxt7ws4AABJeSURBVHja7NWxDYAwEAPA/0VSpKSDgJSW/ZciM3wKmjvJnsCSAwAAAAAAAAAAAAB+MFqwo+ezagRVbd5nHkHVnTmvNyjqR2YPqs5sffqRumesmOCmdgUAAB/75tacNBCG4Y3JQKBAoVqKtVKqVq1VR6StVqdqPY2j46WbLyG7OXEoh9L6/2/cTUG0JtBiKGQmzx0zXD287/dtFoiIiIiIiIiIiIiIiLhipM2VZKKUF8UYuIhiPJ5IbqRWUcQY5NRGIh8DX/KljZSMIjyRN9P5fuJKieSPb98+v3+/vbRUwFhVCWkaukX7FtObkcTzSBvxvpyV789e3NsuYC9OSNOxgBPfiPo8RNqKu1KS61/ePd7G4yCGK1HcktAVUnm+g+YS2c1eLLEp33hxHV+QE1unXPnKlXW5Ighz+c33ajrG7KXX0Y1b1/HlILrGxV9RDMtzKTAVd8eZfJdlbxKavMulFLoCHgnC3H3xzfXx8H18XMCToupuk9G02RHm7tc/rr6kjG5ex/+FalCmcNoprDCBaJ6QAtLn0qQAn3ILaAo8f37ncA5HoLwVC0wfx+QpdBYfLqOAqQiMIpP4UhB20dyQEgHSMroRiL7hLKRG9tpCwAEU+szTCJRLAPF1dPdWAQeJSgH0mr2XQQFyWH40NFjcnQuHm6y9+wjdXMJBU9eA1k+VxYfB7t/KHxJfFiuHaKbIaYC4hO6+xVNA7QE41ZqymEHBsvNS6DPr06AkuvF7V8DToQ5A26eKEvAsvMPEVXbLTOOMl/FKDEQWvw94aqgUtHrXVpRckBt5l5XXTeJusbiDZsfW2fJduoQPhokvg+kAGI2aojwNcBQWBaGMZg7fvqy+rwoX8GbX9R6lMIB2LN2wqxeuce+oqgTZY2EeToFSHsR1hG6NS1DTsTQYoFFKh6/AcmwVj6VKgapthYcwuBE488tASQRx7PYlRgc4tOc07erQlVoldcfqAKfjkLEB5gZVmyl8sBzMcXr2f2Nj/vJs/G2PsudoPHOWQU7wn7QajUarf6NvuOmkOhljsMMMNmo8hAtBCJz9CFyNQWnk+jDrFjfjDOU11O4pOa4pA2rHpNo9Mplnyt/ZHNllswda1TWYfRLAMbBcnm2Dub8EGuFPNTQA7Xc3W0dtYive2KR9dKpzh/pIhfrAoJJDoUdy/b0pjLoUtcggeV0mbwyk27TGKOQG1daxwthbRuFGEkf5M7m+wVBrdYniT3ZtbS2rnHFMfo5RqAN1DbqDMMwwfyXWX29/pqENNRx521vbO3j47P5QwsL9zJODxdtKswcABvalxw3WQm9QFiHvuz8IBbD6+lTikbnFXMavgMuZ3NdPfJ34bpIOdMxG6A2WQJR8/JkOQIf09dX+Td4BkzeG7+KIHpsUevjMYPY1Cilb7vl5ySd+mtEv7z/6sgcZdCGSMaDEbz1pYGDTDrPBfYBVhDyfP4zf7TXPl/dSN3pS3n8SEoAmVhVONpQtlmKw7/38a1oADua02so5rmXQpUgCdFS/mwVNxW0lrHNQFiGN0Aufx1Xi0d7JLlFWRaA+Bh2gJj4Nq8E0iLLnAYZog8x0z5d3YcKrHs32WyQOZocZzu2wnahXIOa9QJoA+glmNM5Nv9uZyT8rqGMvqhrYuGErnD0UKiSRD8APnuvDwBzz7/pmc2hykgCG3xg0edDD91z8i7pr6W0iiMEjEpJtlABKIGkaUEENj6pFcKsEqCCEeEgIcUCzXpJNtklIX6Hw/090Jtu6rJ32kpl6fWglLky9tr/P33o9K6aDe3WJ/6IRyV4XHtyDE52WwfCZyo+1kEHz/sug71OFthwPIhuM9eEob2QmsAncpRnF++/FLaWW4MF9NokNEkfhHIpzAySbUOASeMT778FSIqMCEPNJPNQ6Pgv0fFgRgEPg6CfrvxtLiouK4c3UYvPPKRKHL1UuzCJIh+HPY+K/ZYLjTRgkrDa4d/5/3slFElctgjC5dOzUfypowh5Hpy2OTML8sMEyVBgEGaYd18yB/5B8clA8NH49COd2S4m3lunh2ow20rPx4MJ/GPsQLwhBHecGicvQUqpBC6ANjunEif+wqRt8WxiCOWlIqiyF6cPA/v7tyH/49L4sDsF80Omy4dANqiBEBEBcsLJiCR5cEYK3lWgzHJBWwLME/o8/KxdWgUKDC8Ge1nEucMRywAZFYPt7crF/c5RKTfi0ykir45yEYFACygEjgB5J4CfKjVWh1OHakUTr3zkIwRaUKQfsQx8T2DkYlmFli7J4I7nOchCChsNsrJIAjLII/EI5syLAMyrKGBg5HIkPwSKUDIdhAzAKL5iTAohluMHASKR1T3wI1hBCSABOnCcwhuAtBkaGCCOh2DftBVhHCCEB6DqBMQQrXQoje/YhyhYG10wXsk1UQAxAxwGAQPxaZ80e4yiULWs9MhlczzYhe9kAvKEcWxkedWkz+etCDj9XIq0Mj9UuaUL2MQAdIwiGYJk0Q6N5DouGkQAgyA5z9OZNyIGPAEQrQTULxAlAgjgcipQUHhsW3WAh5K+fAEQ2UGtTLj0yD1KyqlWDitogGdzDJsR9ACKMqFXSkI9NJkvO4Sasq3dZ9jBACPGYPAWobhMic2x+Cs7hAICQmDH0sYvz8egxGdpsEZwJxuGqKYGZPv4YYsxgjxMqVWiqumbOkoRyc/gR1NQGaePsL/dNCJXVgm3Szf2yRTA1eVz6IbRUmyNfOvYIISgLtcl7hf78LFKnFAyG7NAW/tQ8dHFU2q9lZbWeRZFeKLYfNjT6bZZ7xciiPWUwFuRGFkV+XiwnD5QwW4MCwRALfPrIfwarAEqqQzhpZFBEahG0IEySBkugZy24AG+yRfDE9CKHYShUlzZSzC6LISN0oPJmD+HxBhFkjK4xkcoEK1BRba57SryyaKTSj7JMcGghLcZyIstWoKV2iAaHGOK5hW/BinrL8Zi/UlGkDOuqw4HwzGsJRGnoYbavHMHJRUi7o2SZcWA32zz1kHl5Az4kBa84OSEKheoJp7CnGoQ3YNHxnDRFKGSloQgG1oFCexHGgQAoxXhv4AHULnFgimkiv7wBUKrOOXAS+u2e8Dx3uVZkGgpVpYkDzYGxE/bOvErwRmnmgU5DoTzGOJBLGe0VhNEKvANtKyJyZH+RAw+9SzHowFWupIRCieAiB069vQ6hDqxf6sD7SpRxDsSibU35tBIE+XKgOTCpOf4deDUrCIW2IguLtvcDowNXLwc1JcqYoj2AyGPK0E5E6Tw50LwSqZOxhGtz4Bo0leJmBKdSHXiqYKo6IwHriWcHokB+N1cONHrgFicB//ZfA1Egp3rggVQHVqCSVTB/WUU6vpYD1ziBfCjZgUYC7nIK5l+/B8ZhT14gj6TyQCMBdzjYm11LJ9KENbXNCeRHUh1YpBKw/gmJ1pHfXhhHxYi+mwrkUueLShC808wzn3qXgPlRsQTAYrFYB54mzV3NzcaMrkECrtBRsRiOrUAuVQ+0PGaV+8Yh9qpII4a0s4c5sY2IVEXazgduERE9wbLtU8EEKKoONx+YhKHU0QQzFdrlpkIPfMIenkU1OBCOQrHDMQFAsMONxh/6nwpdgZqi2lAyB2Gxnxw2odrW3JR+7PGZ41ePbRZDYqmNyLx72tAZsxtHZh7LNs4qdrlJJz2S+kok/VJpi1v3MPXIvHD1RZ18qWQxROpLubQIbtN1D+an589MC7CmdrnPRPRMLgjPydc7zTUjM79FsIUZTD4YkAvCcw1ug1/34I1K4/quOpVibAkUOyOd7pxo8IurvDBBPEZRvWK/ejwIBWOIffTVHbq4qo8Hd583uD2J8inLAuV+JzJv4a2eQLd2xF6Ojeu76OqL8VxJkDodeJ48QUNzazsiL+9FMAC7zM4Jw6dEl8D5uocOH4ITXzmMAUhXX8xCsWLgOQ6X7/J7dCNPB+cDcC9dfSGaBRoL7LoHBoi9heAasPvjfiYWgwUrCbjuYUdTID7G0zvWgQtkhzC7+uKFEmprUPq8Sm9GwX3s7t7N4Rb6D1wVNrKacBJztkV6m9/HnngIwSIwTYgenm9PkvqNyP8bR25pYmPcx+708AV2C/0AYgsh4jH4LAQbi643cn36TdxCTziMKcJSPxHJhuBL9pa32N0+dkTgdZrAyQD2z4QY4dvbMiFId+nPnPbxRYPANIGH5wEo9o0wH4L0NodExy6l/aaZRtgljVBaAf/mAkLSEKw12Fve+no6cbePvYYXOTEc8CDMB4Sk+9i/Lr4u1NWfsGlUQLXFduK2AorWorOqVrmhWSAZ6sgRkd0EeIw32ZEt9FGOAtDc6mX2sVPbNx48chIFm8BfhfoLBn8sB8wJh0Ec+ag1fy+fkwtXN4EFYB2lFOYoVwFoR/ab9Ss8+OCee//pk3QL/ShPFTCVtX7oKzx4w6H/MIEjS2FywwFxSgFK7xfcFwpjfbRMNhjcBGix/osA9ucIkh8OiKwMvieas5G5X3iJHiw2obRu/Mc24OlFTnKnKi9DYrzeiN5wPVvWX1Mt2Kvwu/wN13+yCfxCdBf8r717700aCuM4fgAFnDDcvEx0N+ddR5zXqMliNN5iTIyawNPSC21XYDBB3/8/nlNQ2UY7SgFp+/sm3rNFPjmnT1sSevR02nYRNIj02t5EBPNEmSy7cH/4waL/JLtwncL8bcV5ypvbKNFaanDBUxlnfBSXXZ5vrTgTOHwTpN+CmIHDUzUivRVU8G6aUhu9yw83wSMPcgrLBOm3KR4XOjxJIdJ+7gW5qMtdIsrz7cuvGr0EpZBuYFH2kriF5ZKpESlCcO3suLs3JaavuGb0FgzBO0ketzg7Zdd0mehXg1/VLfr/xmeI0gtZVhTT40TB8E3gQUFxIPfYx2TYvg+EOc5HZ47tXnfBcJ1CHzmZEYLehG3L162FXEbw8Xun4txvRMEQjuA/XRGCnoQykWzYSyPq5dNi855iRcEXF8FOzZOwoRE3fJc7cSbl8ikiylzLsqLYvHER5MfBtnTCa1Q0EjQLuawr3t1MmojS+Q1W3BaTN16CGhf0TrXaJLqUyV/LXTn174uv3FzJb6Z6/7awcb247Vx2xE+wWj4xybQM+ls6lUql//0pk1/5WLx63ll7MxVM0aFSjHcv4XSPzarsJpE94ms1dcVoa//+w6nNMx8+l15uvxph5dnSCIJhBBTXxWTVyn7qSrzl5eXR11zNIk2K6i5mL9Li1U0zqU0UZUF+IJTt8vSyZa6nRFkwmydSprUIJYPI6pbLkRZkKynSprMIbZlkk/8adUF+E2UaR0LVIOp0nd8emEakBfkinPg+rllEWm/57avcJuKC2QUiTa9Njk+XifRu/0y8Uom+YG8fNybIZ/S46mL5xUKQbWQ4oS1NiE8tO7X48ouNIFvJUOBjYdUa4GvucZE4CTqrkIzG2IuvYdAAn1o53LPTJFcjLsjufBf3ohV1DD7VEl9qufE92GEsDoJs8ZNYRppi1vysPUePDLvrwldZushYTATZhfeKRoJDV0fD0w2hp+lS2Wn/4BhfQbw/FR9Bdv3lN9sgkWE11Jq7XbVhteUettATNavmMT7xHnO8BPky3P5qWm1y0gxFb6iqJPXZJEk1G7rS0cipbZndvkG9tVcZyhdDQcaKb5pd1e60yT1NsVWB59TkesP54irIzibVgxp/XaqtK4ahaeQka1q7w9ekKQ1s5gPVPK53blfwxVmQXbxTMNWq5DWR61JV4B2vUBKTN+6CfBnuPuAv54dabUnNZr3en7T1ek2SWj/VvcrwVpecwQtBp1ulQsVPhZ4eBAe6uLO7NhLe2u6Os3MhOARxsfTMS3E1WVrs4UHQo1uLpaVkobC62p+0q6trz5JLd3b+7FoIjh0EPYPg3AVBCPoMgnMXBCHoMwjOXRCEoM8gOHdBEII+g+DcBUEI+gyCcxcEIegzCM5dEISgzyA4d0EQgj6D4NwFQQj6DIIT6/E6BAO1lXjKf3oMwbFbf/7kYeIe1uDYPUkknj96HfpdnKKBZvkxSVv8O2/NZJJYhwUjAvgwsb71fH0Ws5jkchR38dPH/Edia/qCuvNw7IPoCYrWH7FpC+q9v98P40ehzzYh6OLHq4fyw+RnmxB089v/Ec6P459tQtDNLwxP1v3/CUFPP9E5hkYUVAb8QvBw7LlICHr7nbvF0AmC8AsqCL+ggvALKgi/YIIEv0Dl6Qv8AnaD+11+m4Tf2G2X779lLAm/gCXhF1QQfkEF4Rew25U1+CGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhGLfb5qRCG1rEwcMAAAAAElFTkSuQmCC"
};

// vue:./Empty.vue
import { renderSlot as _renderSlot10, createCommentVNode as _createCommentVNode14, openBlock as _openBlock35, createElementBlock as _createElementBlock30, toDisplayString as _toDisplayString11 } from "vue";
var _sfc_script35 = defineComponent23({
  name: "ak-empty",
  props: {
    description: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      validator: createEnumsValidator(TYPE_NAMES),
      default: TYPE_NAMES[0]
    }
  },
  setup(props) {
    const imageUrl = computed20(() => getImageUrl(props.type));
    return {
      imageUrl
    };
  }
});
var _hoisted_127 = { class: "ak-empty" };
var _hoisted_222 = ["src"];
var _hoisted_321 = {
  key: 2,
  class: "ak-empty_description"
};
function render35(_ctx, _cache) {
  return _openBlock35(), _createElementBlock30("div", _hoisted_127, [
    _ctx.$slots.image ? _renderSlot10(_ctx.$slots, "image", { key: 0 }) : (_openBlock35(), _createElementBlock30("img", {
      key: 1,
      class: "ak-empty_image",
      src: _ctx.imageUrl
    }, null, 8, _hoisted_222)),
    _ctx.description ? (_openBlock35(), _createElementBlock30("p", _hoisted_321, _toDisplayString11(_ctx.description), 1)) : _createCommentVNode14("v-if", true),
    _renderSlot10(_ctx.$slots, "default")
  ]);
}
_sfc_script35.render = render35;
_sfc_script35.__file = "packages/ui/src/Empty/Empty.vue";

// packages/ui/src/Empty/index.ts
var install21 = withInstall(_sfc_script35);
var Empty_default = _sfc_script35;

// packages/ui/src/Picker/use-picker.ts
import { nextTick as nextTick4, onMounted as onMounted11, ref as ref13, watch as watch12 } from "vue";
function getDefaultDetail2(handlers) {
  return formatter([], [], handlers);
}
function usePicker(props, ctx, {
  name,
  handlers
}) {
  const root = ref13();
  const { emit } = ctx;
  const isInitPopup = ref13(false);
  const popupVisible = ref13(true);
  const fieldValue = ref13("");
  const fieldLabel = ref13("");
  const popup = ref13();
  let detail = getDefaultDetail2(handlers);
  function updateValue(val) {
    if (val == null) {
      return;
    }
    if (!isValidValue(val)) {
      updateDetail(getDefaultDetail2(handlers));
      return;
    }
    if (!isSameValue(val, detail.value)) {
      const { options, isCascade } = getFormatOptions(props.options || [], props.fieldNames || {}, handlers.optionsHandler, name === "cascader");
      const { value, label, valid } = validateValues(parser(val, handlers), options, isCascade, handlers.optionsHandler);
      if (valid) {
        updateDetail(formatter(value, label, handlers));
      }
    }
  }
  function updateDetail(newDetail) {
    detail = newDetail;
    fieldValue.value = detail.value != null ? detail.value.toString() : "";
    fieldLabel.value = detail.label;
  }
  function onFieldClick() {
    if (!props.disabled) {
      if (!isInitPopup.value) {
        isInitPopup.value = true;
      } else {
        popupVisible.value = true;
      }
    }
  }
  function getDetail() {
    return cloneDetail(detail);
  }
  function onConfirm(newDetail) {
    if (!isSameDetail(newDetail, detail)) {
      updateDetail(newDetail);
      emit("update:modelValue", getDetail().value);
      emit("change", getDetail().value);
    }
  }
  watch12([() => props.modelValue, () => props.options], () => updateValue(props.modelValue), {
    deep: true,
    immediate: true
  });
  watch12([isInitPopup, popupVisible], ([isInit, visible]) => {
    if (isInit && visible) {
      emit("focus");
    } else if (!visible) {
      emit("blur");
    }
  });
  return {
    root,
    popup,
    isInitPopup,
    popupVisible,
    fieldValue,
    fieldLabel,
    onFieldClick,
    onConfirm
  };
}
function usePickerPopup(props, { emit }, {
  customConfirm,
  onCancelClick
}, { handlers }) {
  const viewRef = ref13();
  let detail = getDefaultDetail2(handlers);
  function beforeConfirm() {
    const newDetail = getViewDetail();
    if (!isSameDetail(newDetail, detail)) {
      detail = newDetail;
      emit("update:modelValue", getDetail().value);
      emit("change", getDetail().value);
    } else {
      detail = newDetail;
    }
    return getDetail();
  }
  function onHeaderLeftClick() {
    onCancelClick();
  }
  function onHeaderRightClick() {
    customConfirm(beforeConfirm());
  }
  function getDetail() {
    return cloneDetail(detail);
  }
  function getViewDetail() {
    var _a;
    return ((_a = viewRef.value) == null ? void 0 : _a.getDetail()) || getDefaultDetail2(handlers);
  }
  watch12(() => props.visible, (val) => {
    var _a;
    if (val && ((_a = viewRef.value) == null ? void 0 : _a.resize)) {
      viewRef.value.resize();
    }
  });
  watch12(() => props.modelValue, (val) => {
    nextTick4(() => {
      if (isValidValue(val)) {
        detail = getViewDetail();
      } else {
        detail = getDefaultDetail2(handlers);
      }
    });
  }, {
    deep: true
  });
  onMounted11(() => {
    if (isValidValue(props.modelValue)) {
      detail = getViewDetail();
    }
  });
  return {
    viewRef,
    getDetail,
    onHeaderLeftClick,
    onHeaderRightClick
  };
}
function usePickerView(props, { emit }, { name, afterUpdate, handlers }) {
  const cols = ref13([]);
  const options2 = ref13([]);
  const isCascade = ref13(false);
  let selectedLabels = [];
  let selectedValues = [];
  const currentLabels = ref13([]);
  const currentValues = ref13([]);
  const isPicker = name === "picker";
  const optionsHandler = handlers.optionsHandler || null;
  function updateOptions() {
    const { options, isCascade: isCascade2 } = getFormatOptions(props.options || [], props.fieldNames || {}, optionsHandler, !isPicker);
    options2.value = options;
    isCascade.value = isCascade2;
  }
  function updateOriginalValue(val, forceUpdate = false) {
    const { valid, value: values } = validateValues(val, options2.value, isCascade.value, optionsHandler);
    if (valid && !isSameArray(values, currentValues.value) || forceUpdate) {
      update(values);
      currentLabels.value = values.length > 0 || isPicker ? selectedLabels : [];
      currentValues.value = values.length > 0 || isPicker ? selectedValues : [];
    }
    return getDetail();
  }
  function updateValue(val, forceUpdate = false) {
    return updateOriginalValue(parser(val, handlers), forceUpdate);
  }
  function getDetail() {
    return formatter(cloneData(currentValues.value), cloneData(currentLabels.value), handlers);
  }
  function addCache(item) {
    selectedValues.push(item.value);
    selectedLabels.push(item.label);
  }
  function update(selecteds) {
    !isCascade.value ? updateCols(selecteds) : updateCascadeCols(selecteds);
    if (isPicker) {
      currentLabels.value = selectedLabels;
      currentValues.value = selectedValues;
    }
    afterUpdate(selectedValues, selectedLabels, cols.value);
  }
  function clearCache() {
    selectedLabels = [];
    selectedValues = [];
  }
  function updateCols(selecteds) {
    clearCache();
    const newCols = [];
    if (options2.value.length === 0) {
      cols.value = newCols;
      return [];
    }
    const options = Array.isArray(options2.value[0]) ? options2.value : [options2.value];
    options.forEach((subOptions, index) => {
      let hasSelected = false;
      const rows = [];
      for (let i = 0; i < subOptions.length; i++) {
        const optionItem = subOptions[i];
        const row = {
          value: optionItem.value,
          label: optionItem.label,
          hasChildren: false,
          indexes: [i],
          selected: false
        };
        if (optionItem.value == selecteds[index]) {
          hasSelected = true;
          row.selected = true;
          addCache(optionItem);
        }
        rows.push(row);
      }
      if (!hasSelected) {
        if (subOptions[0]) {
          rows[0].selected = true;
          addCache(subOptions[0]);
        }
      }
      newCols.push({
        key: index.toString(),
        rows
      });
    });
    cols.value = newCols;
    return newCols;
  }
  function updateVirtualOptionsCols(selecteds) {
    clearCache();
    if (selecteds.length === 0) {
      selecteds = getCascadeDefaultSelecteds();
    }
    const newCols = [];
    const getRows = optionsHandler;
    let colIndex = 0;
    let rows = getRows(colIndex);
    let lastGroupSelected = false;
    let key = "";
    let i = 0;
    for (; i <= selecteds.length; i++) {
      const selected = selecteds[i];
      let nextParent = null;
      lastGroupSelected = false;
      if (rows) {
        for (let j = 0; j < rows.length; j++) {
          const row = rows[j];
          if (selected != null && row.value === selected) {
            row.selected = true;
            lastGroupSelected = true;
            if (row.hasChildren) {
              nextParent = row;
              colIndex++;
            }
            addCache({
              label: row.label,
              value: row.value
            });
          }
        }
        newCols.push({
          key: `${i}-${key}`,
          rows
        });
      }
      if (!nextParent) {
        break;
      } else {
        rows = getRows(colIndex, nextParent);
        key = nextParent.value.toString();
      }
    }
    if (isPicker && !lastGroupSelected) {
      const index = 0;
      let lastColFirstRow = rows[index];
      while (lastColFirstRow) {
        lastColFirstRow.selected = true;
        addCache({
          label: lastColFirstRow.label,
          value: lastColFirstRow.value
        });
        i++;
        if (lastColFirstRow.hasChildren) {
          colIndex++;
          rows = getRows(colIndex, lastColFirstRow);
          newCols.push({
            key: `${i}-${lastColFirstRow.value.toString()}`,
            rows
          });
          lastColFirstRow = rows[0];
        } else {
          lastColFirstRow = null;
        }
      }
    }
    cols.value = newCols;
    return newCols;
  }
  function updateCascadeCols(selecteds) {
    if (typeof optionsHandler === "function") {
      updateVirtualOptionsCols(selecteds);
      return;
    }
    clearCache();
    const newCols = [];
    let optionList = options2.value;
    if (optionList.length === 0) {
      cols.value = newCols;
      return newCols;
    }
    let rows = getColRows(optionList, []);
    if (selecteds.length === 0) {
      selecteds = getCascadeDefaultSelecteds();
    }
    let lastGroupSelected = false;
    let key = "";
    let i = 0;
    for (; i <= selecteds.length; i++) {
      const selected = selecteds[i];
      let nextParent = null;
      let nextParentIndexes = [];
      lastGroupSelected = false;
      if (rows) {
        for (let j = 0; j < rows.length; j++) {
          const optionItem = optionList[j];
          const row = rows[j];
          if (selected != null && row.value === selected) {
            row.selected = true;
            lastGroupSelected = true;
            if (row.hasChildren) {
              nextParent = optionItem;
              nextParentIndexes = row.indexes;
            }
            addCache(optionItem);
          }
        }
        newCols.push({
          key: `${i}-${key}`,
          rows
        });
      }
      if (!nextParent) {
        break;
      } else {
        optionList = nextParent.children;
        rows = getColRows(optionList, [...nextParentIndexes]);
        key = nextParent.value.toString();
      }
    }
    if (isPicker && !lastGroupSelected) {
      const index = 0;
      let lastGroupFirstItem = optionList[index];
      while (lastGroupFirstItem) {
        const lastColFirstRow = rows[index];
        lastColFirstRow.selected = true;
        addCache(lastGroupFirstItem);
        i++;
        if (lastColFirstRow.hasChildren) {
          optionList = lastGroupFirstItem.children;
          rows = getColRows(optionList, [...lastColFirstRow.indexes]);
          newCols.push({
            key: `${i}-${lastColFirstRow.value.toString()}`,
            rows
          });
          lastGroupFirstItem = optionList[0];
        } else {
          lastGroupFirstItem = null;
        }
      }
    }
    cols.value = newCols;
    return newCols;
  }
  function updateColSelected(colIndex, current) {
    const newCol = cols.value[colIndex];
    newCol && newCol.rows.forEach((row, index) => {
      if (index === current) {
        currentValues.value[colIndex] = row.value;
        currentLabels.value[colIndex] = row.label;
        row.selected = true;
      } else {
        row.selected = false;
      }
    });
  }
  function getCascadeDefaultSelecteds() {
    const selecteds = handlers.defaultValueGetter ? handlers.defaultValueGetter() : [];
    if (selecteds.length > 0) {
      return selecteds;
    }
    function getFirstSelected(values, optionList) {
      const optionItem = optionList[0];
      if (optionItem) {
        values.push(optionItem.value);
        if (optionItem.children.length > 0) {
          return getFirstSelected(values, optionItem.children);
        }
      }
      return values;
    }
    return !isPicker ? [] : getFirstSelected([], options2.value);
  }
  function getValuesByRow(row) {
    if (row.values) {
      return row.values;
    }
    const values = [];
    const indexes = row.indexes;
    let i = 0;
    let options = options2.value;
    let optionItem = options[indexes[i]];
    while (options.length > 0 && i < indexes.length && optionItem) {
      values.push(optionItem.value);
      options = optionItem.children;
      i++;
      optionItem = options[indexes[i]];
    }
    return values;
  }
  function onChange() {
    emit("update:modelValue", getDetail().value);
    emit("change", getDetail().value);
  }
  watch12([() => props.options, () => props.fieldNames], () => {
    updateOptions();
    updateOriginalValue(currentValues.value, true);
  }, {
    deep: true,
    immediate: true
  });
  watch12(() => props.modelValue, (val) => updateValue(val), {
    deep: true,
    immediate: true
  });
  if (isPicker && (!isValidValue(props.modelValue) || !isSameValue(props.modelValue, currentValues.value))) {
    onChange();
  }
  return {
    cols,
    currentLabels,
    currentValues,
    isCascade,
    getDetail,
    update,
    updateColSelected,
    getValuesByRow,
    updateOriginalValue,
    onChange
  };
}
var formatter = (valueArray, labelArray, handlers) => {
  var _a;
  const defaultLabel = handlers.labelFormatter(labelArray);
  const ret = handlers.formatter(valueArray, labelArray);
  if ((ret == null ? void 0 : ret.value) != null) {
    return {
      value: ret.value,
      label: (_a = ret.label) != null ? _a : ""
    };
  }
  return {
    value: ret,
    label: defaultLabel
  };
};
var parser = (val, handlers) => {
  return handlers.parser(val);
};

// vue:./CascaderView.vue
import { resolveComponent as _resolveComponent16, createVNode as _createVNode9, renderList as _renderList7, Fragment as _Fragment7, openBlock as _openBlock36, createElementBlock as _createElementBlock31, toDisplayString as _toDisplayString12, createElementVNode as _createElementVNode26, createBlock as _createBlock13, createCommentVNode as _createCommentVNode15, normalizeClass as _normalizeClass17, withCtx as _withCtx8, normalizeStyle as _normalizeStyle9 } from "vue";
var _sfc_script36 = defineComponent24({
  name: "ak-cascader-view",
  components: { Tab: _sfc_script34, Icon: _sfc_script2, Empty: _sfc_script35, VirtualList: _sfc_script30 },
  props: {
    ...commonProps
  },
  emits: {
    ...pickerViewEmits,
    select: (payload) => isPickerDetail(payload)
  },
  setup(props, ctx) {
    const { emit } = ctx;
    const { locale } = useLocale();
    const selectedTabs = ref14([]);
    const tabs = ref14([]);
    const tabIndex = ref14(0);
    let tempTabIndex = -1;
    function onItemClick(e, item) {
      if (item.disabled) {
        return;
      }
      const selecteds = getValuesByRow(item);
      update(selecteds);
      if (!item.hasChildren) {
        if (!isSameArray(currentValues.value, selecteds)) {
          onSelect(selecteds);
          onChange();
        } else {
          onSelect(selecteds);
        }
      }
    }
    function onSelect(selecteds) {
      const selectDetail = updateOriginalValue(selecteds);
      emit("select", selectDetail);
    }
    const {
      currentValues,
      getDetail,
      cols,
      update,
      getValuesByRow,
      updateOriginalValue,
      onChange
    } = usePickerView(props, ctx, {
      name: "cascader",
      afterUpdate(valueArray, labelArray, cols2) {
        selectedTabs.value = [];
        labelArray.forEach((v, k) => {
          selectedTabs.value.push({
            label: v,
            value: k
          });
        });
        if (labelArray.length < cols2.length) {
          selectedTabs.value.push({
            label: null,
            value: selectedTabs.value.length
          });
        }
        tempTabIndex = selectedTabs.value.length - 1;
      },
      handlers: mergeHandlers({
        formatter: props.formatter,
        parser: props.parser
      })
    });
    watch13([locale, selectedTabs], ([newLocale, newOptions]) => {
      tabs.value = newOptions.map((v) => {
        return {
          label: v.label == null ? newLocale.cascaderDefaultTitle : v.label,
          value: v.value
        };
      });
      nextTick5(() => {
        if (tempTabIndex !== -1) {
          tabIndex.value = tempTabIndex;
          tempTabIndex = -1;
        }
      });
    }, {
      deep: true,
      immediate: true
    });
    return {
      tabIndex,
      tabs,
      cols,
      getDetail,
      onItemClick,
      locale,
      CheckOutlined: _sfc_script27
    };
  }
});
var _hoisted_128 = { class: "ak-cascader-view" };
var _hoisted_223 = { class: "ak-cascader-view_body" };
var _hoisted_322 = ["onClick"];
var _hoisted_48 = { class: "ak-cascader-view_item-text" };
function render36(_ctx, _cache) {
  const _component_Tab = _resolveComponent16("Tab");
  const _component_Icon = _resolveComponent16("Icon");
  const _component_VirtualList = _resolveComponent16("VirtualList");
  const _component_Empty = _resolveComponent16("Empty");
  return _openBlock36(), _createElementBlock31("div", _hoisted_128, [
    _createVNode9(_component_Tab, {
      class: "ak-cascader-view_header",
      options: _ctx.tabs,
      scrollThreshold: 0,
      activeValue: _ctx.tabIndex,
      "onUpdate:activeValue": _cache[0] || (_cache[0] = ($event) => _ctx.tabIndex = $event)
    }, null, 8, ["options", "activeValue"]),
    _createElementVNode26("div", _hoisted_223, [
      (_openBlock36(true), _createElementBlock31(_Fragment7, null, _renderList7(_ctx.cols, (colItem, colIndex) => {
        return _openBlock36(), _createElementBlock31("div", {
          class: "ak-cascader-view_group ak-vertical-hairline",
          key: colItem.key,
          style: _normalizeStyle9({
            zIndex: _ctx.tabIndex == colIndex ? 2 : 1
          })
        }, [
          _createVNode9(_component_VirtualList, {
            class: "ak-cascader-view_list",
            "data-index": colIndex,
            ids: colItem.rows.map((v) => v.value),
            itemSize: 44
          }, {
            default: _withCtx8(({ index }) => [
              _createElementVNode26("div", {
                class: _normalizeClass17(["ak-cascader-view_item ak-horizontal-hairline", {
                  selected: colItem.rows[index].selected,
                  disabled: colItem.rows[index].disabled
                }]),
                onClick: ($event) => _ctx.onItemClick($event, colItem.rows[index])
              }, [
                _createElementVNode26("span", _hoisted_48, _toDisplayString12(colItem.rows[index].label), 1),
                colItem.rows[index].selected ? (_openBlock36(), _createBlock13(_component_Icon, {
                  key: 0,
                  icon: _ctx.CheckOutlined
                }, null, 8, ["icon"])) : _createCommentVNode15("v-if", true)
              ], 10, _hoisted_322)
            ]),
            _: 2
          }, 1032, ["data-index", "ids"])
        ], 4);
      }), 128)),
      _ctx.cols.length === 0 ? (_openBlock36(), _createBlock13(_component_Empty, {
        key: 0,
        description: _ctx.locale.cascaderEmptyText
      }, null, 8, ["description"])) : _createCommentVNode15("v-if", true)
    ])
  ]);
}
_sfc_script36.render = render36;
_sfc_script36.__file = "packages/ui/src/Cascader/CascaderView.vue";

// vue:./CascaderPopup.vue
import { resolveComponent as _resolveComponent17, createVNode as _createVNode10, withCtx as _withCtx9, openBlock as _openBlock37, createBlock as _createBlock14 } from "vue";
var _sfc_script37 = defineComponent25({
  name: "ak-cascader-popup",
  components: { Drawer: _sfc_script10, CascaderView: _sfc_script36 },
  props: {
    ...pickerPopupProps,
    ...commonProps
  },
  emits: {
    ...pickerPopupEmits
  },
  setup(props, ctx) {
    const popup = usePopupExtend(ctx);
    const pickerPopup = usePickerPopup(props, ctx, popup, {
      handlers: mergeHandlers({
        formatter: props.formatter,
        parser: props.parser
      })
    });
    return {
      ...popup,
      ...pickerPopup
    };
  }
});
function render37(_ctx, _cache) {
  const _component_CascaderView = _resolveComponent17("CascaderView");
  const _component_Drawer = _resolveComponent17("Drawer");
  return _openBlock37(), _createBlock14(_component_Drawer, {
    class: "ak-cascader-popup",
    placement: "bottom",
    visible: _ctx.visible,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onConfirm: _ctx.onConfirm,
    onCancel: _ctx.onCancel,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx9(() => [
      _createVNode10(_component_CascaderView, {
        ref: "viewRef",
        modelValue: _ctx.modelValue,
        options: _ctx.options,
        fieldNames: _ctx.fieldNames,
        formatter: _ctx.formatter,
        parser: _ctx.parser,
        onSelect: _ctx.onHeaderRightClick
      }, null, 8, ["modelValue", "options", "fieldNames", "formatter", "parser", "onSelect"])
    ]),
    _: 1
  }, 8, ["visible", "onVisibleStateChange", "onConfirm", "onCancel", "onUpdate:visible"]);
}
_sfc_script37.render = render37;
_sfc_script37.__file = "packages/ui/src/Cascader/CascaderPopup.vue";

// vue:./Cascader.vue
import { resolveComponent as _resolveComponent18, createVNode as _createVNode11, openBlock as _openBlock38, createBlock as _createBlock15, createCommentVNode as _createCommentVNode16, normalizeClass as _normalizeClass18, createElementBlock as _createElementBlock32 } from "vue";
var _sfc_script38 = defineComponent26({
  name: "ak-cascader",
  components: { CascaderPopup: _sfc_script37, SelectorField: _sfc_script26 },
  props: { ...commonProps, ...pickerProps },
  emits: { ...pickerEmits },
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, {
        name: "cascader",
        handlers: mergeHandlers({
          formatter: props.formatter,
          parser: props.parser
        })
      })
    };
  }
});
function render38(_ctx, _cache) {
  const _component_SelectorField = _resolveComponent18("SelectorField");
  const _component_CascaderPopup = _resolveComponent18("CascaderPopup");
  return _openBlock38(), _createElementBlock32("div", {
    class: _normalizeClass18(["ak-cascader", { disabled: _ctx.disabled }]),
    ref: "root"
  }, [
    _createVNode11(_component_SelectorField, {
      label: _ctx.fieldLabel,
      value: _ctx.fieldValue,
      disabled: _ctx.disabled,
      name: _ctx.name,
      placeholder: _ctx.placeholder,
      onFieldClick: _ctx.onFieldClick
    }, null, 8, ["label", "value", "disabled", "name", "placeholder", "onFieldClick"]),
    _ctx.isInitPopup ? (_openBlock38(), _createBlock15(_component_CascaderPopup, {
      key: 0,
      options: _ctx.options,
      fieldNames: _ctx.fieldNames,
      modelValue: _ctx.modelValue,
      formatter: _ctx.formatter,
      parser: _ctx.parser,
      visible: _ctx.popupVisible,
      "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.popupVisible = $event),
      onConfirm: _ctx.onConfirm,
      ref: "popup"
    }, null, 8, ["options", "fieldNames", "modelValue", "formatter", "parser", "visible", "onConfirm"])) : _createCommentVNode16("v-if", true)
  ], 2);
}
_sfc_script38.render = render38;
_sfc_script38.__file = "packages/ui/src/Cascader/Cascader.vue";

// packages/ui/src/Cascader/index.ts
var showCascader = createShowPopup({
  apiName: "showCascader",
  component: _sfc_script37,
  createHook: createConfirmHook
});
var Cascader_default = _sfc_script38;
var install22 = withInstall(_sfc_script38);

// packages/ui/src/CascaderPopup/index.ts
var CascaderPopup_default = _sfc_script37;
var install23 = withInstall(_sfc_script37);

// packages/ui/src/CascaderView/index.ts
var install24 = withInstall(_sfc_script36);
var CascaderView_default = _sfc_script36;

// vue:./Cell.vue
import { computed as computed21, defineComponent as defineComponent27 } from "vue";

// packages/ui/src/Cell/util.ts
var LINK_ICON_NAMES = ["right", "up", "down", "left"];
var getCellClasses = (props) => {
  return [
    "ak-cell",
    "ak-horizontal-hairline",
    {
      clickable: !!(props.clickable || props.isLink),
      "has--icon": props.icon,
      disabled: props.disabled
    }
  ];
};
var getCellArrowClasses = (arrowDirection) => {
  return [
    "ak-cell_link-icon",
    "arrow--" + getEnumsValue(LINK_ICON_NAMES, arrowDirection)
  ];
};

// vue:./Cell.vue
import { renderSlot as _renderSlot11, openBlock as _openBlock39, createElementBlock as _createElementBlock33, createCommentVNode as _createCommentVNode17, resolveComponent as _resolveComponent19, createVNode as _createVNode12, toDisplayString as _toDisplayString13, createTextVNode as _createTextVNode6, createElementVNode as _createElementVNode27, normalizeClass as _normalizeClass19, createBlock as _createBlock16 } from "vue";
var _sfc_script39 = defineComponent27({
  name: "ak-cell",
  components: { Icon: _sfc_script2 },
  props: {
    icon: {
      type: [String, Object],
      validator: iconValidator
    },
    label: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    clickable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    arrowDirection: {
      type: String,
      validator: createEnumsValidator(LINK_ICON_NAMES)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    click: emitClickValidator
  },
  setup(props, { emit }) {
    const onClick = (e) => {
      if (!props.disabled) {
        emit("click", e);
      }
    };
    const classes = computed21(() => getCellClasses(props));
    const arrowClasses = computed21(() => getCellArrowClasses(props.arrowDirection));
    return {
      classes,
      arrowClasses,
      RightOutlined: _sfc_script25,
      onClick
    };
  }
});
var _hoisted_129 = { class: "ak-cell_header" };
var _hoisted_224 = {
  key: 0,
  class: "ak-cell_icon"
};
var _hoisted_323 = {
  key: 1,
  class: "ak-cell_icon"
};
var _hoisted_49 = {
  key: 2,
  class: "ak-cell_label"
};
var _hoisted_54 = {
  key: 0,
  class: "ak-cell_required"
};
var _hoisted_62 = { class: "ak-cell_content" };
var _hoisted_7 = {
  key: 0,
  class: "ak-cell_body"
};
function render39(_ctx, _cache) {
  const _component_Icon = _resolveComponent19("Icon");
  return _openBlock39(), _createElementBlock33("div", {
    class: _normalizeClass19(_ctx.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _createElementVNode27("div", _hoisted_129, [
      _ctx.$slots.icon ? (_openBlock39(), _createElementBlock33("div", _hoisted_224, [
        _renderSlot11(_ctx.$slots, "icon")
      ])) : _ctx.icon ? (_openBlock39(), _createElementBlock33("div", _hoisted_323, [
        _createVNode12(_component_Icon, { icon: _ctx.icon }, null, 8, ["icon"])
      ])) : _createCommentVNode17("v-if", true),
      _ctx.label ? (_openBlock39(), _createElementBlock33("div", _hoisted_49, [
        _createTextVNode6(_toDisplayString13(_ctx.label) + " ", 1),
        _ctx.required ? (_openBlock39(), _createElementBlock33("span", _hoisted_54, "*")) : _createCommentVNode17("v-if", true)
      ])) : _createCommentVNode17("v-if", true),
      _createElementVNode27("div", _hoisted_62, [
        _renderSlot11(_ctx.$slots, "default", {}, () => [
          _createTextVNode6(_toDisplayString13(_ctx.content), 1)
        ])
      ]),
      _ctx.isLink ? (_openBlock39(), _createBlock16(_component_Icon, {
        key: 3,
        class: _normalizeClass19(_ctx.arrowClasses),
        icon: _ctx.RightOutlined
      }, null, 8, ["class", "icon"])) : _createCommentVNode17("v-if", true)
    ]),
    _ctx.description ? (_openBlock39(), _createElementBlock33("div", _hoisted_7, _toDisplayString13(_ctx.description), 1)) : _createCommentVNode17("v-if", true)
  ], 2);
}
_sfc_script39.render = render39;
_sfc_script39.__file = "packages/ui/src/Cell/Cell.vue";

// packages/ui/src/Cell/index.ts
var install25 = withInstall(_sfc_script39);
var Cell_default = _sfc_script39;

// vue:./Checkbox.vue
import { defineComponent as defineComponent28 } from "vue";

// packages/ui/src/Checkbox/props.ts
var checkGroupProps = {
  ...formItemProps,
  options: {
    type: Array,
    default: () => []
  },
  inline: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String
  }
};
var checkEmits = {
  "update:checked": (checked) => isBoolean(checked),
  change: (checked) => isBoolean(checked)
};
var checkProps = {
  value: {
    type: [Number, String],
    default: ""
  },
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    validator: colorValidator
  },
  name: {
    type: String,
    default: ""
  }
};

// packages/ui/src/Checkbox/use-check.ts
import { computed as computed22, onMounted as onMounted12, ref as ref15, watch as watch14, inject as inject7, provide as provide6 } from "vue";

// packages/ui/src/hooks/use-group.ts
import { inject as inject6, onBeforeUnmount as onBeforeUnmount8, provide as provide5, reactive as reactive3 } from "vue";
function getKey(name) {
  return `ak${capitalize(name)}Group`;
}
function useGroup(name) {
  const children = reactive3([]);
  provide5(getKey(name), {
    addChild(obj) {
      children.push(obj);
    },
    removeChild(obj) {
      children.splice(children.indexOf(obj), 1);
    }
  });
  return {
    children
  };
}
function useGroupItem(name, object) {
  const group = inject6(getKey(name), null);
  group && group.addChild(object);
  onBeforeUnmount8(() => {
    group && group.removeChild(object);
  });
  return {};
}

// packages/ui/src/Checkbox/util.ts
var getCheckStyles = (activeColor) => {
  const obj = {};
  activeColor && (obj["--ak-active-color"] = activeColor);
  return obj;
};
var getCheckClasses = (disabled) => [
  "ak-horizontal-hairline",
  { disabled: !!disabled }
];
var getCheckGroupClasses = ({
  inline,
  disabled
}) => ({
  vertical: !inline,
  disabled: !!disabled
});

// packages/ui/src/Checkbox/use-check.ts
function useCheck(props, { emit }, name) {
  const uid3 = Symbol();
  const groupOptions = inject7(`ak${capitalize(name)}Options`, null);
  const input = ref15();
  const name2 = computed22(() => {
    return (groupOptions == null ? void 0 : groupOptions.props.name) || props.name || "";
  });
  const disabled2 = computed22(() => {
    var _a;
    return (_a = groupOptions == null ? void 0 : groupOptions.props.disabled) != null ? _a : props.disabled;
  });
  function getValue3() {
    var _a;
    return (_a = props.value) != null ? _a : "";
  }
  function getInputEl() {
    return input.value;
  }
  function getInputChecked() {
    return !!getInputEl().checked;
  }
  function setChecked(checked = true) {
    getInputEl().checked = checked;
  }
  function onChange(e) {
    if (groupOptions) {
      groupOptions.onChange(uid3);
    } else {
      const checked = !!e.target.checked;
      emit("update:checked", checked);
      emit("change", checked);
    }
  }
  watch14(() => props.checked, (val) => {
    if (groupOptions) {
      return;
    }
    const $input = getInputEl();
    const checked = !!val;
    if (checked !== $input.checked) {
      $input.checked = checked;
    }
  });
  useGroupItem(name, {
    uid: uid3,
    getInputChecked,
    getValue: getValue3,
    setChecked
  });
  onMounted12(() => {
    const $input = getInputEl();
    let checked;
    if (groupOptions) {
      checked = name === "checkbox" ? !!(Array.isArray(groupOptions.props.modelValue) && props.value && groupOptions.props.modelValue.includes(props.value)) : props.value === groupOptions.props.modelValue;
    } else {
      checked = !!props.checked;
    }
    if (checked !== $input.checked) {
      $input.checked = $input.defaultChecked = checked;
    }
  });
  const classes = computed22(() => getCheckClasses(disabled2.value));
  const styles = computed22(() => {
    const { activeColor } = (groupOptions == null ? void 0 : groupOptions.props) || props;
    return getCheckStyles(activeColor);
  });
  return {
    input,
    name2,
    disabled2,
    onChange,
    classes,
    styles
  };
}
function useCheckGroup(props, {
  name,
  updateValue,
  watchValue
}) {
  const root = ref15();
  const { children } = useGroup(name);
  function _updateValue(isChange, uid3) {
    return updateValue({ isChange, children, uid: uid3 });
  }
  function onChange(uid3) {
    _updateValue(true, uid3);
  }
  watch14(() => props.modelValue, (value) => {
    watchValue({ children, value });
  }, {
    deep: true
  });
  const options2 = computed22(() => {
    const ret = [];
    if (Array.isArray(props.options)) {
      props.options.forEach((v) => {
        if (isStringNumberMix(v)) {
          ret.push({
            value: v,
            label: v.toString()
          });
        } else {
          ret.push({
            value: v.value,
            label: v.label.toString()
          });
        }
      });
    }
    return ret;
  });
  onMounted12(() => _updateValue(false));
  provide6(`ak${capitalize(name)}Options`, {
    props,
    onChange
  });
  const classes = computed22(() => getCheckGroupClasses({
    inline: props.inline,
    disabled: props.disabled
  }));
  return {
    root,
    onChange,
    options2,
    classes
  };
}

// vue:./CircleOutlined.vue
import { createElementVNode as _createElementVNode28, openBlock as _openBlock40, createElementBlock as _createElementBlock34 } from "vue";
var _sfc_script40 = {};
var _hoisted_130 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_225 = /* @__PURE__ */ _createElementVNode28("path", { d: "M512,140c50.3,0,99,9.8,144.8,29.2c44.3,18.7,84.1,45.6,118.3,79.8c34.2,34.2,61,74,79.8,118.3C874.2,413,884,461.7,884,512s-9.8,99-29.2,144.8c-18.7,44.3-45.6,84.1-79.8,118.3c-34.2,34.2-74,61-118.3,79.8C611,874.2,562.3,884,512,884s-99-9.8-144.8-29.2c-44.3-18.7-84.1-45.6-118.3-79.8c-34.2-34.2-61-74-79.8-118.3C149.8,611,140,562.3,140,512s9.8-99,29.2-144.8c18.7-44.3,45.6-84.1,79.8-118.3c34.2-34.2,74-61,118.3-79.8C413,149.8,461.7,140,512,140 M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448s448-200.6,448-448S759.4,64,512,64L512,64z" }, null, -1);
var _hoisted_324 = [
  _hoisted_225
];
function render40(_ctx, _cache) {
  return _openBlock40(), _createElementBlock34("svg", _hoisted_130, _hoisted_324);
}
_sfc_script40.render = render40;
_sfc_script40.__file = "packages/ui/src/Icon/icons/CircleOutlined/CircleOutlined.vue";

// vue:./CheckCircleFilled.vue
import { createElementVNode as _createElementVNode29, openBlock as _openBlock41, createElementBlock as _createElementBlock35 } from "vue";
var _sfc_script41 = {};
var _hoisted_131 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_226 = /* @__PURE__ */ _createElementVNode29("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1);
var _hoisted_325 = [
  _hoisted_226
];
function render41(_ctx, _cache) {
  return _openBlock41(), _createElementBlock35("svg", _hoisted_131, _hoisted_325);
}
_sfc_script41.render = render41;
_sfc_script41.__file = "packages/ui/src/Icon/icons/CheckCircleFilled/CheckCircleFilled.vue";

// vue:./BorderOutlined.vue
import { createElementVNode as _createElementVNode30, openBlock as _openBlock42, createElementBlock as _createElementBlock36 } from "vue";
var _sfc_script42 = {};
var _hoisted_132 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_227 = /* @__PURE__ */ _createElementVNode30("path", { d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" }, null, -1);
var _hoisted_326 = [
  _hoisted_227
];
function render42(_ctx, _cache) {
  return _openBlock42(), _createElementBlock36("svg", _hoisted_132, _hoisted_326);
}
_sfc_script42.render = render42;
_sfc_script42.__file = "packages/ui/src/Icon/icons/BorderOutlined/BorderOutlined.vue";

// vue:./CheckSquareFilled.vue
import { createElementVNode as _createElementVNode31, openBlock as _openBlock43, createElementBlock as _createElementBlock37 } from "vue";
var _sfc_script43 = {};
var _hoisted_133 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_228 = /* @__PURE__ */ _createElementVNode31("path", { d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM695.5 365.7l-210.6 292a31.8 31.8 0 01-51.7 0L308.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H689c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1);
var _hoisted_327 = [
  _hoisted_228
];
function render43(_ctx, _cache) {
  return _openBlock43(), _createElementBlock37("svg", _hoisted_133, _hoisted_327);
}
_sfc_script43.render = render43;
_sfc_script43.__file = "packages/ui/src/Icon/icons/CheckSquareFilled/CheckSquareFilled.vue";

// vue:./Checkbox.vue
import { createElementVNode as _createElementVNode32, resolveComponent as _resolveComponent20, createVNode as _createVNode13, renderSlot as _renderSlot12, openBlock as _openBlock44, createElementBlock as _createElementBlock38, createCommentVNode as _createCommentVNode18, normalizeClass as _normalizeClass20, normalizeStyle as _normalizeStyle10 } from "vue";
var _sfc_script44 = defineComponent28({
  name: "ak-checkbox",
  components: { Icon: _sfc_script2 },
  props: {
    ...checkProps,
    circle: {
      type: Boolean,
      default: false
    }
  },
  emits: { ...checkEmits },
  setup(props, ctx) {
    return {
      ...useCheck(props, ctx, "checkbox"),
      CircleOutlined: _sfc_script40,
      CheckCircleFilled: _sfc_script41,
      BorderOutlined: _sfc_script42,
      CheckSquareFilled: _sfc_script43
    };
  }
});
var _hoisted_134 = ["name", "value", "disabled"];
var _hoisted_229 = { class: "ak-checkbox_box" };
var _hoisted_328 = {
  key: 0,
  class: "ak-checkbox_text"
};
function render44(_ctx, _cache) {
  const _component_Icon = _resolveComponent20("Icon");
  return _openBlock44(), _createElementBlock38("label", {
    class: _normalizeClass20(["ak-checkbox", _ctx.classes]),
    style: _normalizeStyle10(_ctx.styles)
  }, [
    _createElementVNode32("input", {
      class: "ak-checkbox_input ak-form-input",
      type: "checkbox",
      name: _ctx.name2,
      value: _ctx.value,
      disabled: _ctx.disabled2,
      onChange: _cache[0] || (_cache[0] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
      ref: "input"
    }, null, 40, _hoisted_134),
    _createElementVNode32("div", _hoisted_229, [
      _createVNode13(_component_Icon, {
        class: "ak-checkbox_icon",
        icon: _ctx.circle ? _ctx.CircleOutlined : _ctx.BorderOutlined
      }, null, 8, ["icon"]),
      _createVNode13(_component_Icon, {
        class: "ak-checkbox_checked-icon",
        icon: _ctx.circle ? _ctx.CheckCircleFilled : _ctx.CheckSquareFilled
      }, null, 8, ["icon"]),
      _ctx.$slots.default ? (_openBlock44(), _createElementBlock38("span", _hoisted_328, [
        _renderSlot12(_ctx.$slots, "default")
      ])) : _createCommentVNode18("v-if", true)
    ])
  ], 6);
}
_sfc_script44.render = render44;
_sfc_script44.__file = "packages/ui/src/Checkbox/Checkbox.vue";

// vue:./CheckboxGroup.vue
import { defineComponent as defineComponent29, ref as ref16 } from "vue";
import { renderSlot as _renderSlot13, renderList as _renderList8, Fragment as _Fragment8, openBlock as _openBlock45, createElementBlock as _createElementBlock39, toDisplayString as _toDisplayString14, createTextVNode as _createTextVNode7, resolveComponent as _resolveComponent21, withCtx as _withCtx10, createBlock as _createBlock17, normalizeClass as _normalizeClass21 } from "vue";
var isValue2 = (value) => isStringNumberMixArray(value);
var _sfc_script45 = defineComponent29({
  name: "ak-checkbox-group",
  components: { Checkbox: _sfc_script44 },
  props: {
    ...checkGroupProps,
    modelValue: {
      type: Array,
      validator: isValue2,
      default: () => []
    }
  },
  emits: {
    "update:modelValue": isValue2,
    change: isValue2
  },
  setup(props, ctx) {
    const inputValue = ref16([]);
    const { emit } = ctx;
    const group = useCheckGroup(props, {
      name: "checkbox",
      updateValue({ isChange, children }) {
        const newVal = [];
        children.forEach((child) => {
          if (child.getInputChecked()) {
            newVal.push(cloneData(child.getValue()));
          }
        });
        inputValue.value = newVal;
        if (isChange && !isSameArray(newVal, props.modelValue)) {
          emit("update:modelValue", cloneData(newVal));
        }
        if (isChange) {
          emit("change", cloneData(newVal));
        }
        return newVal;
      },
      watchValue({ children, value }) {
        if (isStringNumberMixArray(value) && !isSameArray(value, inputValue.value)) {
          const newVal = [];
          children.forEach((child) => {
            const checked = value.includes(child.getValue());
            child.setChecked(checked);
            checked && newVal.push(child.getValue());
          });
          inputValue.value = newVal;
        }
      }
    });
    return {
      ...group
    };
  }
});
function render45(_ctx, _cache) {
  const _component_Checkbox = _resolveComponent21("Checkbox");
  return _openBlock45(), _createElementBlock39("div", {
    class: _normalizeClass21(["ak-checkbox-group", _ctx.classes]),
    ref: "root"
  }, [
    _renderSlot13(_ctx.$slots, "default", {}, () => [
      (_openBlock45(true), _createElementBlock39(_Fragment8, null, _renderList8(_ctx.options2, (item) => {
        return _openBlock45(), _createBlock17(_component_Checkbox, {
          key: item.value,
          value: item.value
        }, {
          default: _withCtx10(() => [
            _createTextVNode7(_toDisplayString14(item.label), 1)
          ]),
          _: 2
        }, 1032, ["value"]);
      }), 128))
    ])
  ], 2);
}
_sfc_script45.render = render45;
_sfc_script45.__file = "packages/ui/src/Checkbox/CheckboxGroup.vue";

// packages/ui/src/Checkbox/index.ts
var Checkbox_default = _sfc_script44;
var install26 = multiWithInstall(_sfc_script44, [_sfc_script45]);

// packages/ui/src/CheckboxGroup/index.ts
var CheckboxGroup_default = _sfc_script45;
var install27 = withNoopInstall(_sfc_script45);

// vue:./CircleProgress.vue
import { computed as computed23, defineComponent as defineComponent30 } from "vue";

// packages/ui/src/CircleProgress/util.ts
var getFontSize = (size) => Math.max(9, size * 0.17 * 0.875);

// vue:./CircleProgress.vue
import { resolveComponent as _resolveComponent22, createVNode as _createVNode14, renderSlot as _renderSlot14, toDisplayString as _toDisplayString15, createTextVNode as _createTextVNode8, normalizeStyle as _normalizeStyle11, createElementVNode as _createElementVNode33, openBlock as _openBlock46, createElementBlock as _createElementBlock40 } from "vue";
var _sfc_script46 = defineComponent30({
  name: "ak-circle-progress",
  components: { LoadingIcon: _sfc_script12 },
  props: {
    percentage: {
      type: [Number, String],
      validator: (val) => isNumeric(val) && getNumber(val) >= 0 && getNumber(val) <= 100,
      default: 0,
      required: true
    },
    size: {
      type: [Number, String],
      default: DEFAULT_SIZE
    },
    strokeWidth: {
      type: [Number, String],
      default: DEFAULT_STROKE_WIDTH
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const nSize = computed23(() => parseFloat(props.size));
    const rate = computed23(() => rangeInteger(props.percentage, 0, 100) / 100);
    const progress = computed23(() => rangeInteger(props.percentage, 0, 100) + "%");
    const fontSize = computed23(() => getFontSize(nSize.value));
    return {
      nSize,
      rate,
      progress,
      fontSize,
      DEFAULT_STROKE_WIDTH
    };
  }
});
function render46(_ctx, _cache) {
  var _a;
  const _component_LoadingIcon = _resolveComponent22("LoadingIcon");
  return _openBlock46(), _createElementBlock40("div", {
    class: "ak-circle-progress",
    style: _normalizeStyle11({ fontSize: Math.max(9, _ctx.nSize * 0.17 * 0.875) + "px" })
  }, [
    _createVNode14(_component_LoadingIcon, {
      class: "ak-circle-progress_bar",
      size: _ctx.nSize,
      rate: _ctx.rate,
      strokeWidth: _ctx.strokeWidth,
      color: _ctx.color
    }, null, 8, ["size", "rate", "strokeWidth", "color"]),
    _createElementVNode33("div", {
      class: "ak-circle-progress_text",
      style: _normalizeStyle11({ padding: ((_a = _ctx.strokeWidth) != null ? _a : _ctx.DEFAULT_STROKE_WIDTH) + "px" })
    }, [
      _renderSlot14(_ctx.$slots, "default", { progress: _ctx.progress }, () => [
        _createTextVNode8(_toDisplayString15(_ctx.progress), 1)
      ])
    ], 4)
  ], 4);
}
_sfc_script46.render = render46;
_sfc_script46.__file = "packages/ui/src/CircleProgress/CircleProgress.vue";

// packages/ui/src/CircleProgress/index.ts
var install28 = withInstall(_sfc_script46);
var CircleProgress_default = _sfc_script46;

// vue:./Col.vue
import { defineComponent as defineComponent31, inject as inject8, computed as computed24, ref as ref17 } from "vue";

// packages/ui/src/Col/util.ts
function rangeCol(number = 0) {
  return rangeInteger(number, 0, 24);
}
var getColClasses = (props) => {
  const classes = [`ak-col`, `ak-col-${rangeCol(props.span || 24)}`];
  if (props.offset && props.offset > 0) {
    classes.push(`ak-col-offset-${Math.min(24, rangeCol(props.offset))}`);
  }
  if (props.push && props.push > 0) {
    classes.push(`ak-col-push-${rangeCol(props.push)}`);
  }
  if (props.pull && props.pull > 0) {
    classes.push(`ak-col-pull-${rangeCol(props.pull)}`);
  }
  return classes;
};
var getColStyles = ([gH, gV]) => {
  const styles = {};
  if (gH > 0 || gV > 0) {
    styles.padding = `${gV / 2}px ${gH / 2}px`;
  }
  return styles;
};

// vue:./Col.vue
import { renderSlot as _renderSlot15, normalizeClass as _normalizeClass22, normalizeStyle as _normalizeStyle12, openBlock as _openBlock47, createElementBlock as _createElementBlock41 } from "vue";
var _sfc_script47 = defineComponent31({
  name: "ak-col",
  props: {
    span: {
      type: [Number, String],
      validator: numberValidator,
      default: 24
    },
    offset: {
      type: [Number, String],
      validator: numberValidator,
      default: 0
    },
    push: {
      type: [Number, String],
      validator: numberValidator,
      default: 0
    },
    pull: {
      type: [Number, String],
      validator: numberValidator,
      default: 0
    }
  },
  setup(props) {
    const defaultRowGutter = ref17([0, 0]);
    const rowGutter = inject8("akRowGutter", defaultRowGutter);
    const styles = computed24(() => getColStyles(rowGutter.value));
    const classes = computed24(() => getColClasses(props));
    return {
      styles,
      classes
    };
  }
});
function render47(_ctx, _cache) {
  return _openBlock47(), _createElementBlock41("div", {
    class: _normalizeClass22(_ctx.classes),
    style: _normalizeStyle12(_ctx.styles)
  }, [
    _renderSlot15(_ctx.$slots, "default")
  ], 6);
}
_sfc_script47.render = render47;
_sfc_script47.__file = "packages/ui/src/Col/Col.vue";

// packages/ui/src/Col/index.ts
var install29 = withInstall(_sfc_script47);
var Col_default = _sfc_script47;

// vue:./Collapse.vue
import { defineComponent as defineComponent32, onMounted as onMounted13, watch as watch15, provide as provide7 } from "vue";
import { renderSlot as _renderSlot16, openBlock as _openBlock48, createElementBlock as _createElementBlock42 } from "vue";
var _sfc_script48 = defineComponent32({
  name: "ak-collapse",
  props: {
    activeNames: {
      type: [Number, String, Array],
      validator: stringNumberArrayMixValidator,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:activeNames": (payload) => isStringNumberMixArray(payload),
    change: (payload) => isStringNumberMixArray(payload)
  },
  setup(props, { emit }) {
    let activeNames2 = [];
    const { children } = useGroup("collapse");
    function updateValue(val) {
      let values = cloneData(stringNumberArrayMixValidator(val) ? Array.isArray(val) ? val : [val] : []);
      if (props.accordion) {
        values = values.slice(0, 1);
      }
      if (Array.isArray(values) && isSameArray(values, activeNames2)) {
        return;
      }
      activeNames2 = [];
      children.forEach((child) => {
        const childName = child.getName();
        if (childName && values.includes(childName)) {
          activeNames2.push(childName);
          child.show();
        } else {
          child.hide();
        }
      });
    }
    function onChange(uid3) {
      activeNames2 = [];
      if (props.accordion) {
        children.forEach((child) => {
          if (child.uid === uid3) {
            child.getActive() && child.getName() && activeNames2.push(child.getName());
          } else {
            child.hide();
          }
        });
      } else {
        children.forEach((child) => {
          child.getActive() && child.getName() && activeNames2.push(child.getName());
        });
      }
      emit("update:activeNames", cloneData(activeNames2));
      emit("change", cloneData(activeNames2));
    }
    onMounted13(() => updateValue(props.activeNames));
    watch15(() => props.activeNames, (val) => updateValue(val));
    provide7("akCollapseChange", onChange);
    return {};
  }
});
var _hoisted_135 = { class: "ak-collapse" };
function render48(_ctx, _cache) {
  return _openBlock48(), _createElementBlock42("div", _hoisted_135, [
    _renderSlot16(_ctx.$slots, "default")
  ]);
}
_sfc_script48.render = render48;
_sfc_script48.__file = "packages/ui/src/Collapse/Collapse.vue";

// vue:./CollapseItem.vue
import { defineComponent as defineComponent33, ref as ref18, inject as inject9, computed as computed25 } from "vue";

// packages/ui/src/Collapse/util.ts
var getItemClasses3 = (active) => [
  "ak-collapse-item",
  "ak-horizontal-hairline",
  { active }
];

// vue:./CollapseItem.vue
import { resolveComponent as _resolveComponent23, createVNode as _createVNode15, renderSlot as _renderSlot17, createElementVNode as _createElementVNode34, normalizeClass as _normalizeClass23, openBlock as _openBlock49, createElementBlock as _createElementBlock43 } from "vue";
var _sfc_script49 = defineComponent33({
  name: "ak-collapse-item",
  components: { Cell: _sfc_script39 },
  props: {
    icon: {
      type: [String, Object],
      validator: iconValidator
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: [Number, String],
      default: "",
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    toggle: (payload) => payload && isBoolean(payload.spread)
  },
  setup(props, { emit }) {
    const active = ref18(false);
    const bodyEl = ref18();
    const onChange = inject9("akCollapseChange", collapseItemChange);
    const uid3 = Symbol();
    function collapseItemChange(uid4) {
      new exception_default(`CollapseItem is not in Collapse`, exception_default.TYPE.DEFAULT, "CollapseItem");
    }
    let visibleTimer;
    function show(isClick = false) {
      if (active.value) {
        return;
      }
      active.value = true;
      clearTimeout(visibleTimer);
      const $body = bodyEl.value;
      $body.style.cssText = "position: absolute; opacity: 0;";
      const contentHeight = $body.getBoundingClientRect().height;
      $body.style.cssText = "height: 0px;";
      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = `height: ${contentHeight}px;`;
        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = "";
        }, 210);
      }, 17);
      emitToggle(true);
      isClick && onChange(uid3);
    }
    function hide(isClick = false) {
      if (!active.value) {
        return;
      }
      active.value = false;
      clearTimeout(visibleTimer);
      const $body = bodyEl.value;
      $body.style.cssText = `height: ${$body.getBoundingClientRect().height}px;`;
      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = "height: 0px;";
        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = "display: none;";
        }, 210);
      }, 17);
      emitToggle(false);
      isClick && onChange(uid3);
    }
    function emitToggle(spread) {
      emit("toggle", {
        name: props.name,
        spread
      });
    }
    function onClick() {
      active.value ? hide(true) : show(true);
    }
    useGroupItem("collapse", {
      uid: uid3,
      getName: () => props.name,
      getActive: () => active.value,
      show,
      hide
    });
    const classes = computed25(() => getItemClasses3(active.value));
    return {
      active,
      bodyEl,
      onClick,
      classes
    };
  }
});
var _hoisted_136 = {
  class: "ak-collapse-item_body ak-horizontal-hairline",
  style: { "display": "none" },
  ref: "bodyEl"
};
var _hoisted_230 = { class: "ak-collapse-item_content" };
function render49(_ctx, _cache) {
  const _component_Cell = _resolveComponent23("Cell");
  return _openBlock49(), _createElementBlock43("div", {
    class: _normalizeClass23(_ctx.classes)
  }, [
    _createVNode15(_component_Cell, {
      class: "ak-collapse-item_header",
      label: _ctx.title,
      icon: _ctx.icon,
      disabled: _ctx.disabled,
      isLink: "",
      arrowDirection: _ctx.active ? "up" : "down",
      onClick: _ctx.onClick
    }, null, 8, ["label", "icon", "disabled", "arrowDirection", "onClick"]),
    _createElementVNode34("div", _hoisted_136, [
      _createElementVNode34("div", _hoisted_230, [
        _renderSlot17(_ctx.$slots, "default")
      ])
    ], 512)
  ], 2);
}
_sfc_script49.render = render49;
_sfc_script49.__file = "packages/ui/src/Collapse/CollapseItem.vue";

// packages/ui/src/Collapse/index.ts
var Collapse_default = _sfc_script48;
var install30 = multiWithInstall(_sfc_script48, [_sfc_script49]);

// packages/ui/src/CollapseItem/index.ts
var CollapseItem_default = _sfc_script49;
var install31 = withNoopInstall(_sfc_script49);

// vue:./ConfigProvider.vue
import { defineComponent as defineComponent34 } from "vue";
import { renderSlot as _renderSlot18 } from "vue";
var _sfc_script50 = defineComponent34({
  name: "ak-config-provider",
  props: {
    locale: {
      type: Object
    }
  },
  setup(props) {
    useConfigProvider(props);
  }
});
function render50(_ctx, _cache) {
  return _renderSlot18(_ctx.$slots, "default");
}
_sfc_script50.render = render50;
_sfc_script50.__file = "packages/ui/src/ConfigProvider/ConfigProvider.vue";

// packages/ui/src/ConfigProvider/index.ts
var install32 = withInstall(_sfc_script50);
var ConfigProvider_default = _sfc_script50;

// vue:./Copy.vue
import { defineComponent as defineComponent35, ref as ref19 } from "vue";

// packages/ui/src/Copy/util.ts
function copy($el) {
  $el.select();
  document.execCommand("Copy");
}

// vue:./Copy.vue
import { createElementVNode as _createElementVNode35, renderSlot as _renderSlot19, toDisplayString as _toDisplayString16, createTextVNode as _createTextVNode9, openBlock as _openBlock50, createElementBlock as _createElementBlock44 } from "vue";
var _sfc_script51 = defineComponent35({
  name: "ak-copy",
  props: {
    text: {
      type: String,
      required: true,
      default: ""
    }
  },
  emits: {
    success: (payload) => isString(payload),
    error: (e) => e instanceof Error
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const inputEl = ref19();
    function onCopy() {
      var _a;
      try {
        const $el = inputEl.value;
        copy($el);
        emit("success", (_a = $el.value) != null ? _a : "");
      } catch (error) {
        emit("error", new exception_default(error));
      }
    }
    return {
      inputEl,
      onCopy,
      locale
    };
  }
});
var _hoisted_137 = ["value"];
var _hoisted_231 = { class: "ak-copy_box" };
function render51(_ctx, _cache) {
  return _openBlock50(), _createElementBlock44("div", {
    class: "ak-copy",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCopy && _ctx.onCopy(...args))
  }, [
    _createElementVNode35("input", {
      type: "text",
      value: _ctx.text,
      class: "ak-copy_input",
      ref: "inputEl"
    }, null, 8, _hoisted_137),
    _createElementVNode35("div", _hoisted_231, [
      _renderSlot19(_ctx.$slots, "default", {}, () => [
        _createTextVNode9(_toDisplayString16(_ctx.locale.copyText), 1)
      ])
    ])
  ]);
}
_sfc_script51.render = render51;
_sfc_script51.__file = "packages/ui/src/Copy/Copy.vue";

// packages/ui/src/Copy/index.ts
var install33 = withInstall(_sfc_script51);
var Copy_default = _sfc_script51;

// vue:./CountDown.vue
import { defineComponent as defineComponent36, onMounted as onMounted14 } from "vue";

// packages/ui/src/CountDown/use-count-time.ts
import { onBeforeUnmount as onBeforeUnmount9, ref as ref20 } from "vue";

// packages/ui/src/CountDown/util.ts
function formatNumber(num) {
  return (num > 9 ? "" : "0") + num;
}
function cutOne(num, divisor) {
  return Math.floor(num / divisor);
}
function getDefaultCountTime() {
  return {
    time: 0,
    days: "0",
    fullHours: "0",
    thousandsFullHours: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
    milliseconds: "000"
  };
}
function getCountTime(time) {
  const times = getDefaultCountTime();
  times.time = time;
  times.milliseconds = (time % 1e3 > 99 ? "" : "0") + formatNumber(time % 1e3);
  time = cutOne(time, 1e3);
  times.seconds = formatNumber(time % 60);
  time = cutOne(time, 60);
  times.minutes = formatNumber(time % 60);
  time = cutOne(time, 60);
  times.fullHours = formatNumber(time);
  times.thousandsFullHours = thousands(time);
  times.hours = formatNumber(time % 24);
  times.days = cutOne(time, 24).toString();
  return times;
}

// packages/ui/src/CountDown/use-count-time.ts
function useCountTime(onStep) {
  const times = ref20(getDefaultCountTime());
  function update(time) {
    times.value = getCountTime(time);
  }
  let timer;
  function start() {
    stop();
    timer = requestAnimationFrame(() => {
      start();
      onStep({ update, start, stop });
    });
  }
  function stop() {
    cancelAnimationFrame(timer);
  }
  onBeforeUnmount9(stop);
  return {
    times,
    timeStart: start,
    timeStop: stop,
    timeUpdate: update
  };
}

// vue:./CountDown.vue
import { renderSlot as _renderSlot20, toDisplayString as _toDisplayString17, createTextVNode as _createTextVNode10, openBlock as _openBlock51, createElementBlock as _createElementBlock45 } from "vue";
var pauseOrResumeValidator = (payload) => payload && typeof payload.remainTime === "number";
var _sfc_script52 = defineComponent36({
  name: "ak-count-down",
  props: {
    initialTiming: {
      type: Number,
      default: 0
    },
    showDays: {
      type: Boolean,
      default: false
    },
    paused: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    end: (payload) => payload && isNumber(payload.startTime) && isNumber(payload.endTime),
    pause: pauseOrResumeValidator,
    resume: pauseOrResumeValidator
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    let startTime = 0;
    let expiredTime = 0;
    let remainTime = 0;
    let paused = false;
    const { times, timeStart, timeStop, timeUpdate } = useCountTime(({ update, stop }) => {
      remainTime = expiredTime - Date.now();
      if (remainTime > 0) {
        update(remainTime);
      } else {
        remainTime = 0;
        update(remainTime);
        emit("end", {
          startTime,
          endTime: expiredTime
        });
        stop();
      }
    });
    function pause() {
      if (paused) {
        return;
      }
      paused = true;
      emit("pause", {
        remainTime
      });
      timeStop();
    }
    function resume() {
      if (!paused) {
        return;
      }
      paused = false;
      emit("resume", {
        remainTime
      });
      expiredTime = remainTime + Date.now();
      timeStop();
    }
    function reset(_timing, autoStart = true) {
      timeStop();
      paused = !autoStart;
      startTime = Date.now();
      expiredTime = _timing + startTime;
      remainTime = _timing;
      timeUpdate(remainTime);
      !paused && timeStart();
    }
    onMounted14(() => {
      if (props.initialTiming > 0) {
        reset(props.initialTiming, !paused);
      }
    });
    return {
      countTime: times,
      locale,
      pause,
      resume,
      reset
    };
  }
});
var _hoisted_138 = { class: "ak-count-down" };
function render52(_ctx, _cache) {
  return _openBlock51(), _createElementBlock45("div", _hoisted_138, [
    _renderSlot20(_ctx.$slots, "default", {
      time: _ctx.countTime.time,
      days: _ctx.countTime.days,
      fullHours: _ctx.countTime.fullHours,
      thousandsFullHours: _ctx.countTime.thousandsFullHours,
      hours: _ctx.countTime.hours,
      minutes: _ctx.countTime.minutes,
      seconds: _ctx.countTime.seconds,
      milliseconds: _ctx.countTime.milliseconds
    }, () => [
      _createTextVNode10(_toDisplayString17(_ctx.showDays ? _ctx.countTime.days + _ctx.locale.countDownDayUnit + " " + _ctx.countTime.hours : _ctx.countTime.fullHours) + ":" + _toDisplayString17(_ctx.countTime.minutes) + ":" + _toDisplayString17(_ctx.countTime.seconds), 1)
    ])
  ]);
}
_sfc_script52.render = render52;
_sfc_script52.__file = "packages/ui/src/CountDown/CountDown.vue";

// packages/ui/src/CountDown/index.ts
var install34 = withInstall(_sfc_script52);
var CountDown_default = _sfc_script52;

// vue:./CountUp.vue
import { defineComponent as defineComponent37, ref as ref21, watch as watch16 } from "vue";

// packages/ui/src/CountUp/util.ts
var SpeedMap = /* @__PURE__ */ new Map([
  ["normal", 50],
  ["fast", 10],
  ["slow", 100]
]);
function getDuration(diff, speed) {
  if (isNumber(speed)) {
    return speed;
  }
  return Math.max(Math.abs(diff) * (SpeedMap.get(speed) || SpeedMap.get("normal")), 1e3);
}

// vue:./CountUp.vue
import { toDisplayString as _toDisplayString18, openBlock as _openBlock52, createElementBlock as _createElementBlock46 } from "vue";
var emitValidator = (payload) => payload && isNumber(payload.number);
var _sfc_script53 = defineComponent37({
  name: "ak-count-up",
  props: {
    initialNumber: {
      type: [Number, String],
      default: 0
    },
    number: {
      type: [Number, String],
      default: 0
    },
    speed: {
      type: [Number, String],
      validator: (val) => isNumber(val) || SpeedMap.get(val) != null,
      default: "normal"
    },
    thousands: {
      type: Boolean,
      default: false
    },
    decimalDigits: {
      type: [Number, String],
      default: 0
    }
  },
  emits: {
    animated: emitValidator,
    cancel: emitValidator
  },
  setup(props, { emit }) {
    const content = ref21("");
    let numberCache = getNumber(props.initialNumber, 0);
    const { getRunFrameTaskId, frameStart, frameStop } = useFrameTask();
    function cancel2() {
      if (getRunFrameTaskId() !== null) {
        frameStop();
        emit("cancel", { number: numberCache });
      }
    }
    function update(newNumber) {
      cancel2();
      const decimalDigits = getNumber(props.decimalDigits, 0);
      const carry = Math.pow(10, decimalDigits);
      const from = Math.round(numberCache * carry);
      const to = Math.round(newNumber * carry);
      frameStart({
        from,
        to,
        duration: getDuration(newNumber - numberCache, props.speed),
        progress: ({ current }) => {
          numberCache = parseFloat((current / carry).toFixed(decimalDigits));
          content.value = props.thousands ? thousands(numberCache.toFixed(decimalDigits)) : numberCache.toFixed(decimalDigits);
        },
        complete: () => {
          emit("animated", { number: numberCache });
        }
      });
    }
    watch16(() => props.number, (val) => {
      if (val != null && getNumber(val) !== numberCache) {
        update(getNumber(val));
      }
    }, { immediate: true });
    return {
      content,
      cancel: cancel2
    };
  }
});
var _hoisted_139 = { class: "ak-count-up" };
function render53(_ctx, _cache) {
  return _openBlock52(), _createElementBlock46("div", _hoisted_139, _toDisplayString18(_ctx.content), 1);
}
_sfc_script53.render = render53;
_sfc_script53.__file = "packages/ui/src/CountUp/CountUp.vue";

// packages/ui/src/CountUp/index.ts
var install35 = withInstall(_sfc_script53);
var CountUp_default = _sfc_script53;

// vue:./DatePicker.vue
import { defineComponent as defineComponent42 } from "vue";

// vue:./Picker.vue
import { defineComponent as defineComponent41 } from "vue";

// vue:./PickerPopup.vue
import { defineComponent as defineComponent40, inject as inject11 } from "vue";

// vue:./PickerView.vue
import { defineComponent as defineComponent39, nextTick as nextTick6, ref as ref22, inject as inject10 } from "vue";

// vue:./PickerViewCol.vue
import { defineComponent as defineComponent38 } from "vue";
import { toDisplayString as _toDisplayString19, normalizeClass as _normalizeClass24, createElementVNode as _createElementVNode36, resolveComponent as _resolveComponent24, withModifiers as _withModifiers, withCtx as _withCtx11, createVNode as _createVNode16, openBlock as _openBlock53, createElementBlock as _createElementBlock47 } from "vue";
var _sfc_script54 = defineComponent38({
  name: "ak-picker-view-col",
  components: { VirtualList: _sfc_script30 },
  props: {
    list: {
      type: Array,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    onListScroll: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    function getItemSize(index) {
      if (props.list.length === 1) {
        return DEFAULT_ITEM_HEIGHT * 5;
      }
      if (index === 0 || index >= props.list.length - 1) {
        return DEFAULT_ITEM_HEIGHT * 3;
      }
      return DEFAULT_ITEM_HEIGHT;
    }
    return {
      getItemSize
    };
  }
});
var _hoisted_140 = { class: "ak-picker-view_col" };
var _hoisted_232 = ["data-index"];
function render54(_ctx, _cache) {
  const _component_VirtualList = _resolveComponent24("VirtualList");
  return _openBlock53(), _createElementBlock47("div", _hoisted_140, [
    _createVNode16(_component_VirtualList, {
      class: "ak-picker-view_list",
      "data-index": _ctx.listIndex,
      ids: _ctx.list.map((v) => v.value),
      itemSize: _ctx.getItemSize,
      onScroll: _withModifiers(_ctx.onListScroll, ["stop"])
    }, {
      default: _withCtx11(({ index }) => [
        _createElementVNode36("div", {
          class: _normalizeClass24(["ak-picker-view_item", {
            selected: _ctx.list[index].selected,
            disabled: _ctx.list[index].disabled
          }]),
          "data-index": index
        }, _toDisplayString19(_ctx.list[index].label), 11, _hoisted_232)
      ]),
      _: 1
    }, 8, ["data-index", "ids", "itemSize", "onScroll"])
  ]);
}
_sfc_script54.render = render54;
_sfc_script54.__file = "packages/ui/src/Picker/PickerViewCol.vue";

// vue:./PickerView.vue
import { renderList as _renderList9, Fragment as _Fragment9, openBlock as _openBlock54, createElementBlock as _createElementBlock48, resolveComponent as _resolveComponent25, createBlock as _createBlock18, createCommentVNode as _createCommentVNode19, createElementVNode as _createElementVNode37 } from "vue";
var _sfc_script55 = defineComponent39({
  name: "ak-picker-view",
  components: { Empty: _sfc_script35, ViewCol: _sfc_script54 },
  props: {
    ...pickerViewProps
  },
  emits: { ...pickerViewEmits },
  setup(props, ctx) {
    const { locale } = useLocale();
    const root = ref22();
    const handlers = inject10("akPickerHandlers", {});
    const {
      getDetail,
      cols,
      isCascade,
      update,
      updateColSelected,
      getValuesByRow,
      onChange
    } = usePickerView(props, ctx, {
      name: "picker",
      afterUpdate: updatePos,
      handlers: mergeHandlers({
        formatter: props.formatter,
        parser: props.parser
      }, handlers)
    });
    function updatePos() {
      nextTick6(() => {
        const $picker = root.value;
        if ($picker) {
          const $lists = $picker.querySelectorAll(`.ak-picker-view_list`);
          $lists.forEach(($el, index) => {
            const $list = $el;
            if (cols.value[index] && $list.scrolling !== true) {
              const list = cols.value[index];
              let selectIndex = -1;
              for (let i = 0, len = list.rows.length; i < len; i++) {
                if (list.rows[i].selected) {
                  selectIndex = i;
                  break;
                }
              }
              requestAnimationFrame(() => {
                $list.scrollTop = DEFAULT_ITEM_HEIGHT * selectIndex;
              });
            }
          });
        }
      });
    }
    function onListScroll(e) {
      const $list = e.currentTarget;
      if ($list.scrolling) {
        return;
      }
      clearTimeout($list.scrollTimer);
      const itemHeight = DEFAULT_ITEM_HEIGHT;
      const colIndex = parseInt($list.dataset.index);
      const list = cols.value[colIndex];
      let current = Math.round($list.scrollTop / itemHeight);
      let oldSelectIndex = 0;
      for (let i = 0; i < list.rows.length; i++) {
        if (list.rows[i].selected) {
          oldSelectIndex = i;
          break;
        }
      }
      let isChange = current !== oldSelectIndex;
      if (isChange) {
        while (list.rows[current].disabled && current !== oldSelectIndex) {
          if (current > oldSelectIndex) {
            current--;
          } else {
            current++;
          }
        }
      }
      isChange = current !== oldSelectIndex;
      const item = list.rows[current];
      if (current * itemHeight === $list.scrollTop && !isChange) {
      } else {
        $list.scrollTimer = window.setTimeout(() => {
          $list.scrolling = true;
          frameTo({
            from: $list.scrollTop,
            to: current * itemHeight,
            duration: 100,
            progress(res) {
              $list.scrollTop = res.current;
            },
            complete() {
              $list.scrolling = false;
            }
          });
          if (isChange) {
            if (isCascade.value) {
              update(getValuesByRow(item));
            } else {
              updateColSelected(colIndex, current);
            }
            onChange();
          }
        }, 400);
      }
    }
    return {
      root,
      cols,
      getDetail,
      onListScroll,
      resize: updatePos,
      locale
    };
  }
});
var _hoisted_141 = {
  class: "ak-picker-view",
  ref: "root"
};
var _hoisted_233 = { class: "ak-picker-view_cols" };
function render55(_ctx, _cache) {
  const _component_ViewCol = _resolveComponent25("ViewCol");
  const _component_Empty = _resolveComponent25("Empty");
  return _openBlock54(), _createElementBlock48("div", _hoisted_141, [
    _createElementVNode37("div", _hoisted_233, [
      (_openBlock54(true), _createElementBlock48(_Fragment9, null, _renderList9(_ctx.cols, (colItem, listIndex) => {
        return _openBlock54(), _createBlock18(_component_ViewCol, {
          key: colItem.key,
          list: colItem.rows,
          listIndex,
          onListScroll: _ctx.onListScroll
        }, null, 8, ["list", "listIndex", "onListScroll"]);
      }), 128)),
      _ctx.cols.length === 0 ? (_openBlock54(), _createBlock18(_component_Empty, {
        key: 0,
        description: _ctx.locale.pickerEmptyText
      }, null, 8, ["description"])) : _createCommentVNode19("v-if", true)
    ])
  ], 512);
}
_sfc_script55.render = render55;
_sfc_script55.__file = "packages/ui/src/Picker/PickerView.vue";

// vue:./PickerPopup.vue
import { resolveComponent as _resolveComponent26, createVNode as _createVNode17, withCtx as _withCtx12, openBlock as _openBlock55, createBlock as _createBlock19 } from "vue";
var _sfc_script56 = defineComponent40({
  name: "ak-picker-popup",
  components: { PickerView: _sfc_script55, Drawer: _sfc_script10, NavBar: _sfc_script8 },
  props: {
    ...pickerPopupProps,
    ...commonProps,
    title: {
      type: String,
      default: ""
    }
  },
  emits: {
    ...pickerPopupEmits
  },
  setup(props, ctx) {
    const { locale } = useLocale();
    const handlers = inject11("akPickerHandlers", {});
    const popup = usePopupExtend(ctx);
    const pickerPopup = usePickerPopup(props, ctx, popup, {
      handlers: mergeHandlers({
        formatter: props.formatter,
        parser: props.parser
      }, handlers)
    });
    return {
      ...popup,
      ...pickerPopup,
      locale
    };
  }
});
function render56(_ctx, _cache) {
  const _component_NavBar = _resolveComponent26("NavBar");
  const _component_PickerView = _resolveComponent26("PickerView");
  const _component_Drawer = _resolveComponent26("Drawer");
  return _openBlock55(), _createBlock19(_component_Drawer, {
    class: "ak-picker-popup",
    placement: "bottom",
    visible: _ctx.visible,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onCancel: _ctx.onCancel,
    onConfirm: _ctx.onConfirm,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    header: _withCtx12(() => [
      _createVNode17(_component_NavBar, {
        class: "ak-drawer_header",
        title: _ctx.title,
        leftButtons: [{ text: _ctx.locale.pickerCancelText, type: "primary" }],
        rightButtons: [{ text: _ctx.locale.pickerConfirmText, type: "primary" }],
        iconOnly: false,
        onLeftButtonClick: _ctx.onHeaderLeftClick,
        onRightButtonClick: _ctx.onHeaderRightClick
      }, null, 8, ["title", "leftButtons", "rightButtons", "onLeftButtonClick", "onRightButtonClick"])
    ]),
    default: _withCtx12(() => [
      _createVNode17(_component_PickerView, {
        ref: "viewRef",
        modelValue: _ctx.modelValue,
        options: _ctx.options,
        fieldNames: _ctx.fieldNames,
        formatter: _ctx.formatter,
        parser: _ctx.parser
      }, null, 8, ["modelValue", "options", "fieldNames", "formatter", "parser"])
    ]),
    _: 1
  }, 8, ["visible", "onVisibleStateChange", "onCancel", "onConfirm", "onUpdate:visible"]);
}
_sfc_script56.render = render56;
_sfc_script56.__file = "packages/ui/src/Picker/PickerPopup.vue";

// vue:./Picker.vue
import { resolveComponent as _resolveComponent27, createVNode as _createVNode18, openBlock as _openBlock56, createBlock as _createBlock20, createCommentVNode as _createCommentVNode20, normalizeClass as _normalizeClass25, createElementBlock as _createElementBlock49 } from "vue";
var _sfc_script57 = defineComponent41({
  name: "ak-picker",
  components: { SelectorField: _sfc_script26, PickerPopup: _sfc_script56 },
  props: { ...commonProps, ...pickerProps },
  emits: { ...pickerEmits },
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, {
        name: "picker",
        handlers: mergeHandlers({
          formatter: props.formatter,
          parser: props.parser
        })
      })
    };
  }
});
function render57(_ctx, _cache) {
  const _component_SelectorField = _resolveComponent27("SelectorField");
  const _component_PickerPopup = _resolveComponent27("PickerPopup");
  return _openBlock56(), _createElementBlock49("div", {
    class: _normalizeClass25(["ak-picker", { disabled: _ctx.disabled }]),
    ref: "root"
  }, [
    _createVNode18(_component_SelectorField, {
      label: _ctx.fieldLabel,
      value: _ctx.fieldValue,
      disabled: _ctx.disabled,
      name: _ctx.name,
      placeholder: _ctx.placeholder,
      onFieldClick: _ctx.onFieldClick
    }, null, 8, ["label", "value", "disabled", "name", "placeholder", "onFieldClick"]),
    _ctx.isInitPopup ? (_openBlock56(), _createBlock20(_component_PickerPopup, {
      key: 0,
      options: _ctx.options,
      fieldNames: _ctx.fieldNames,
      modelValue: _ctx.modelValue,
      title: _ctx.placeholder,
      formatter: _ctx.formatter,
      parser: _ctx.parser,
      visible: _ctx.popupVisible,
      "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.popupVisible = $event),
      onConfirm: _ctx.onConfirm,
      ref: "popup"
    }, null, 8, ["options", "fieldNames", "modelValue", "title", "formatter", "parser", "visible", "onConfirm"])) : _createCommentVNode20("v-if", true)
  ], 2);
}
_sfc_script57.render = render57;
_sfc_script57.__file = "packages/ui/src/Picker/Picker.vue";

// packages/ui/src/Picker/index.ts
var showPicker = createShowPopup({
  apiName: "showPicker",
  component: _sfc_script56,
  createHook: createConfirmHook
});
var Picker_default = _sfc_script57;
var install36 = withInstall(_sfc_script57);

// packages/ui/src/DatePicker/date.ts
var MODE_NAMES3 = [
  "date",
  "time",
  "datetime",
  "minute-second",
  "hour-minute",
  "hour-minute-second",
  "day-hour",
  "month-day",
  "month-day-hour",
  "month-day-hour-minute",
  "year-month",
  "year-month-day",
  "year-month-day-hour",
  "year-month-day-hour-minute",
  "year-month-day-hour-minute-second"
];
var ModeColMap = /* @__PURE__ */ new Map([
  [
    "date",
    {
      template: "YYYY-MM-DD",
      isDateTime: false,
      colNames: ["year", "month", "day"]
    }
  ],
  [
    "time",
    {
      template: "HH:mm:ss",
      isDateTime: false,
      colNames: ["hour", "minute", "second"]
    }
  ],
  [
    "datetime",
    {
      template: "YYYY-MM-DD HH:mm:ss",
      isDateTime: true,
      colNames: ["year", "month", "day", "hour", "minute", "second"]
    }
  ],
  [
    "minute-second",
    { template: "mm:ss", isDateTime: false, colNames: ["minute", "second"] }
  ],
  [
    "hour-minute",
    { template: "HH:mm", isDateTime: false, colNames: ["hour", "minute"] }
  ],
  [
    "hour-minute-second",
    {
      template: "HH:mm:ss",
      isDateTime: false,
      colNames: ["hour", "minute", "second"]
    }
  ],
  [
    "day-hour",
    { template: "DD HH", isDateTime: true, colNames: ["day", "hour"] }
  ],
  [
    "month-day",
    { template: "MM-DD", isDateTime: false, colNames: ["month", "day"] }
  ],
  [
    "month-day-hour",
    {
      template: "MM-DD HH",
      isDateTime: true,
      colNames: ["month", "day", "hour"]
    }
  ],
  [
    "month-day-hour-minute",
    {
      template: "MM-DD HH:mm",
      isDateTime: true,
      colNames: ["month", "day", "hour", "minute"]
    }
  ],
  [
    "year-month",
    { template: "YYYY-MM", isDateTime: false, colNames: ["year", "month"] }
  ],
  [
    "year-month-day",
    {
      template: "YYYY-MM-DD",
      isDateTime: false,
      colNames: ["year", "month", "day"]
    }
  ],
  [
    "year-month-day-hour",
    {
      template: "YYYY-MM-DD HH",
      isDateTime: true,
      colNames: ["year", "month", "day", "hour"]
    }
  ],
  [
    "year-month-day-hour-minute",
    {
      template: "YYYY-MM-DD HH:mm",
      isDateTime: true,
      colNames: ["year", "month", "day", "hour", "minute"]
    }
  ],
  [
    "year-month-day-hour-minute-second",
    {
      template: "YYYY-MM-DD HH:mm:ss",
      isDateTime: true,
      colNames: ["year", "month", "day", "hour", "minute", "second"]
    }
  ]
]);
function getCopMapItem(mode) {
  return ModeColMap.get(mode);
}
var parseRows = (index, parent, { minDate, maxDate, mode, filter }) => {
  const { colNames } = getCopMapItem(mode);
  const colName = colNames[index];
  const parentIndexes = (parent == null ? void 0 : parent.indexes) || [];
  const parentValues = (parent == null ? void 0 : parent.values) || [];
  const rows = [];
  function pushRow(i, j) {
    if (filter(i, colName) !== false) {
      rows.push({
        label: i.toString(),
        value: i,
        indexes: [...parentIndexes, j],
        values: [...parentValues, i],
        hasChildren: index < colNames.length - 1
      });
    }
  }
  if (colName === "year") {
    const min = minDate.getFullYear();
    const max = maxDate.getFullYear();
    for (let i = min, j = 0; i <= max; i++, j++) {
      pushRow(i, j);
    }
  } else if (colName === "month") {
    parent = parent;
    const min = 1;
    const max = 12;
    let djs = day_default();
    if (parentValues.length > 0) {
      djs = djs.year(parentValues[0]);
    }
    djs = djs.startOf("year");
    const d = djs.toDate();
    for (let i = min, j = 0; i <= max; i++, j++) {
      d.setMonth(i - 1);
      if (d.getTime() >= minDate.getTime() && d.getTime() <= maxDate.getTime()) {
        pushRow(i, j);
      }
    }
  } else if (colName === "day") {
    let djs = day_default();
    if (parentValues.length > 1) {
      djs = djs.year(parentValues[0]).month(parentValues[1] - 1);
    } else if (parentValues.length > 0) {
      djs = djs.month(parentValues[0] - 1);
    }
    djs = djs.startOf("month");
    const min = 1;
    const max = djs.daysInMonth();
    const d = djs.toDate();
    for (let i = min, j = 0; i <= max; i++, j++) {
      d.setDate(i);
      if (d.getTime() >= minDate.getTime() && d.getTime() <= maxDate.getTime()) {
        pushRow(i, j);
      }
    }
  } else {
    let djs = day_default();
    if (colName === "hour") {
      djs = djs.startOf("day");
    } else if (colName === "minute") {
      if (parentValues.length > 0) {
        djs = djs.hour(parentValues[parentValues.length - 1]);
      }
      djs = djs.startOf("hour");
    } else {
      if (parentValues.length > 1) {
        djs = djs.hour(parentValues[parentValues.length - 2]);
      }
      if (parentValues.length > 0) {
        djs = djs.minute(parentValues[parentValues.length - 1]);
      }
      djs = djs.startOf("minute");
    }
    for (let i = 0, max = colName === "hour" ? 24 : 60; i < max; i++) {
      if (colName === "hour") {
        djs = djs.hour(i);
      } else if (colName === "minute") {
        djs = djs.minute(i);
      } else {
        djs = djs.second(i);
      }
      if (djs.valueOf() >= minDate.getTime() && djs.valueOf() <= maxDate.getTime()) {
        pushRow(i, i);
      }
    }
  }
  return rows;
};
function array2Date(array, mode) {
  let djs = day_default().millisecond(0);
  const { colNames } = getCopMapItem(mode);
  switch (colNames[colNames.length - 1]) {
    case "minute": {
      djs = djs.second(0);
      break;
    }
    case "hour": {
      djs = djs.minute(0).second(0);
      break;
    }
    case "day": {
      djs = djs.hour(0).minute(0).second(0);
      break;
    }
    case "month": {
      djs = djs.date(1).hour(0).minute(0).second(0);
      break;
    }
    default:
      break;
  }
  array.forEach((v, k) => {
    const colName = colNames[k];
    v = v;
    djs = djs[colName === "day" ? "date" : colName](colName === "month" ? v - 1 : v);
  });
  return djs.toDate();
}
function getFormatTemplate(mode, template) {
  return template != null ? template : getCopMapItem(mode).template;
}
function day2Array(djs, mode) {
  const dNameIndexes = [
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second"
  ];
  const { colNames } = getCopMapItem(mode);
  const valueArray = [];
  if (djs && djs.isValid()) {
    const dArray = djs.toArray();
    dArray[1] = dArray[1] + 1;
    colNames.forEach((name) => {
      valueArray.push(dArray[dNameIndexes.indexOf(name)]);
    });
  }
  return valueArray;
}

// packages/ui/src/DatePicker/props.ts
var commonProps3 = {
  modelValue: {
    type: [Date, String, Number, Array]
  },
  formatTemplate: {
    type: String
  },
  initialMode: {
    type: String,
    default: MODE_NAMES3[0]
  },
  minDate: {
    type: Date
  },
  maxDate: {
    type: Date
  },
  filter: {
    type: Function,
    default: () => true
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  }
};

// packages/ui/src/DatePicker/use-date-picker.ts
import { provide as provide8 } from "vue";

// packages/ui/src/DatePicker/util.ts
var getMinDate = () => day_default().startOf("day").subtract(9, "year").toDate();
var getMaxDate = () => day_default().add(1, "day").startOf("day").subtract(1, "second").toDate();
var handleMinMaxDate = (minDate, maxDate) => {
  if (minDate.getTime() > maxDate.getTime()) {
    maxDate = [minDate, minDate = maxDate][0];
  }
  return { minDate, maxDate };
};

// packages/ui/src/DatePicker/use-date-picker.ts
function useHandlers2(props) {
  const mode = getEnumsValue(MODE_NAMES3, props.initialMode);
  const defaultMinDate = getMinDate();
  const defaultMaxDate = getMaxDate();
  const optionsHandler = (index, parent) => {
    var _a, _b;
    const { minDate, maxDate } = handleMinMaxDate((_a = props.minDate) != null ? _a : defaultMinDate, (_b = props.maxDate) != null ? _b : defaultMaxDate);
    const filter = props.filter || returnTrue;
    return parseRows(index, parent || null, {
      filter,
      minDate,
      maxDate,
      mode
    });
  };
  const parser2 = (value) => {
    if (props.parser) {
      return props.parser(value);
    }
    let djs = null;
    if (value instanceof Date) {
      djs = day_default(value);
    } else if (props.formatTemplate && value != null && value !== "" && typeof value === "string") {
      djs = day_default(value, props.formatTemplate, true);
    }
    return day2Array(djs, mode);
  };
  const defaultValueGetter = () => {
    var _a, _b;
    const { minDate, maxDate } = handleMinMaxDate((_a = props.minDate) != null ? _a : defaultMinDate, (_b = props.maxDate) != null ? _b : defaultMaxDate);
    return parser2(new Date(rangeNumber(Date.now(), minDate.getTime(), maxDate.getTime())));
  };
  const labelFormatter2 = (array) => {
    return array.length === 0 ? "" : day_default(array2Date(array, mode)).format(getFormatTemplate(mode, props.formatTemplate));
  };
  const formatter2 = (valueArray, labelArray) => {
    if (valueArray.length === 0) {
      return {
        value: "",
        label: ""
      };
    }
    if (props.formatter) {
      return props.formatter(valueArray, labelArray);
    }
    const label = labelFormatter2(labelArray);
    return {
      value: props.formatTemplate ? label : array2Date(valueArray, mode),
      label
    };
  };
  const handlers = {
    optionsHandler,
    formatter: formatter2,
    parser: parser2,
    defaultValueGetter,
    labelFormatter: labelFormatter2
  };
  provide8("akPickerHandlers", handlers);
  return { handlers };
}

// vue:./DatePicker.vue
import { resolveComponent as _resolveComponent28, createVNode as _createVNode19, openBlock as _openBlock57, createBlock as _createBlock21, createCommentVNode as _createCommentVNode21, normalizeClass as _normalizeClass26, createElementBlock as _createElementBlock50 } from "vue";
var _sfc_script58 = defineComponent42({
  name: "ak-date-picker",
  components: { SelectorField: _sfc_script26, PickerPopup: _sfc_script56 },
  props: { ...commonProps3, ...pickerProps },
  emits: { ...pickerEmits },
  setup(props, ctx) {
    const { handlers } = useHandlers2(props);
    return {
      ...usePicker(props, ctx, { name: "picker", handlers })
    };
  }
});
function render58(_ctx, _cache) {
  const _component_SelectorField = _resolveComponent28("SelectorField");
  const _component_PickerPopup = _resolveComponent28("PickerPopup");
  return _openBlock57(), _createElementBlock50("div", {
    class: _normalizeClass26(["ak-picker", { disabled: _ctx.disabled }]),
    ref: "root"
  }, [
    _createVNode19(_component_SelectorField, {
      label: _ctx.fieldLabel,
      value: _ctx.fieldValue,
      disabled: _ctx.disabled,
      name: _ctx.name,
      placeholder: _ctx.placeholder,
      onFieldClick: _ctx.onFieldClick
    }, null, 8, ["label", "value", "disabled", "name", "placeholder", "onFieldClick"]),
    _ctx.isInitPopup ? (_openBlock57(), _createBlock21(_component_PickerPopup, {
      key: 0,
      title: _ctx.placeholder,
      formatter: _ctx.formatter,
      parser: _ctx.parser,
      visible: _ctx.popupVisible,
      "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.popupVisible = $event),
      onConfirm: _ctx.onConfirm,
      ref: "popup"
    }, null, 8, ["title", "formatter", "parser", "visible", "onConfirm"])) : _createCommentVNode21("v-if", true)
  ], 2);
}
_sfc_script58.render = render58;
_sfc_script58.__file = "packages/ui/src/DatePicker/DatePicker.vue";

// vue:./DatePickerPopup.vue
import { defineComponent as defineComponent43 } from "vue";
import { resolveComponent as _resolveComponent29, createVNode as _createVNode20, withCtx as _withCtx13, openBlock as _openBlock58, createBlock as _createBlock22 } from "vue";
var _sfc_script59 = defineComponent43({
  name: "ak-date-picker-popup",
  components: { PickerView: _sfc_script55, Drawer: _sfc_script10, NavBar: _sfc_script8 },
  props: {
    ...pickerPopupProps,
    ...commonProps3,
    title: {
      type: String,
      default: ""
    }
  },
  emits: {
    ...pickerPopupEmits
  },
  setup(props, ctx) {
    const { handlers } = useHandlers2(props);
    const { locale } = useLocale();
    const popup = usePopupExtend(ctx);
    const pickerPopup = usePickerPopup(props, ctx, popup, { handlers });
    return {
      ...popup,
      ...pickerPopup,
      locale
    };
  }
});
function render59(_ctx, _cache) {
  const _component_NavBar = _resolveComponent29("NavBar");
  const _component_PickerView = _resolveComponent29("PickerView");
  const _component_Drawer = _resolveComponent29("Drawer");
  return _openBlock58(), _createBlock22(_component_Drawer, {
    class: "ak-picker-popup ak-date-picker-popup",
    placement: "bottom",
    visible: _ctx.visible,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onCancel: _ctx.onCancel,
    onConfirm: _ctx.onConfirm,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    header: _withCtx13(() => [
      _createVNode20(_component_NavBar, {
        class: "ak-drawer_header",
        title: _ctx.title,
        leftButtons: [{ text: _ctx.locale.datePickerCancelText, type: "primary" }],
        rightButtons: [
          { text: _ctx.locale.datePickerConfirmText, type: "primary" }
        ],
        iconOnly: false,
        onLeftButtonClick: _ctx.onHeaderLeftClick,
        onRightButtonClick: _ctx.onHeaderRightClick
      }, null, 8, ["title", "leftButtons", "rightButtons", "onLeftButtonClick", "onRightButtonClick"])
    ]),
    default: _withCtx13(() => [
      _createVNode20(_component_PickerView, {
        ref: "viewRef",
        modelValue: _ctx.modelValue,
        formatter: _ctx.formatter,
        parser: _ctx.parser
      }, null, 8, ["modelValue", "formatter", "parser"])
    ]),
    _: 1
  }, 8, ["visible", "onVisibleStateChange", "onCancel", "onConfirm", "onUpdate:visible"]);
}
_sfc_script59.render = render59;
_sfc_script59.__file = "packages/ui/src/DatePicker/DatePickerPopup.vue";

// vue:./DatePickerView.vue
import { defineComponent as defineComponent44 } from "vue";
import { resolveComponent as _resolveComponent30, openBlock as _openBlock59, createBlock as _createBlock23 } from "vue";
var _sfc_script60 = defineComponent44({
  name: "ak-date-picker-view",
  components: { PickerView: _sfc_script55 },
  props: {
    ...commonProps3
  },
  emits: { ...pickerViewEmits },
  setup(props, ctx) {
    const { emit } = ctx;
    useHandlers2(props);
    function onChange(e) {
      emit("change", e);
    }
    function onUpdateValue(e) {
      emit("update:modelValue", e);
    }
    return {
      onChange,
      onUpdateValue
    };
  }
});
function render60(_ctx, _cache) {
  const _component_PickerView = _resolveComponent30("PickerView");
  return _openBlock59(), _createBlock23(_component_PickerView, {
    class: "ak-date-picker-view",
    "onUpdate:modelValue": _ctx.onUpdateValue,
    onChange: _ctx.onChange
  }, null, 8, ["onUpdate:modelValue", "onChange"]);
}
_sfc_script60.render = render60;
_sfc_script60.__file = "packages/ui/src/DatePicker/DatePickerView.vue";

// packages/ui/src/DatePicker/index.ts
var showDatePicker = createShowPopup({
  apiName: "showDatePicker",
  component: _sfc_script59,
  createHook: createConfirmHook
});
var DatePicker_default = _sfc_script58;
var install37 = withInstall(_sfc_script58);

// packages/ui/src/DatePickerPopup/index.ts
var DatePickerPopup_default = _sfc_script59;
var install38 = withInstall(_sfc_script59);

// packages/ui/src/DatePickerView/index.ts
var install39 = withInstall(_sfc_script60);
var DatePickerView_default = _sfc_script60;

// vue:./Dialog.vue
import { defineComponent as defineComponent46 } from "vue";

// vue:./Modal.vue
import { computed as computed26, defineComponent as defineComponent45 } from "vue";

// vue:./CloseCircleFilled.vue
import { createElementVNode as _createElementVNode38, openBlock as _openBlock60, createElementBlock as _createElementBlock51 } from "vue";
var _sfc_script61 = {};
var _hoisted_142 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_234 = /* @__PURE__ */ _createElementVNode38("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1);
var _hoisted_329 = [
  _hoisted_234
];
function render61(_ctx, _cache) {
  return _openBlock60(), _createElementBlock51("svg", _hoisted_142, _hoisted_329);
}
_sfc_script61.render = render61;
_sfc_script61.__file = "packages/ui/src/Icon/icons/CloseCircleFilled/CloseCircleFilled.vue";

// packages/ui/src/Modal/util.ts
var getBoxStyles = (width) => {
  return {
    width
  };
};

// vue:./Modal.vue
import { createElementVNode as _createElementVNode39, renderSlot as _renderSlot21, resolveComponent as _resolveComponent31, createVNode as _createVNode21, openBlock as _openBlock61, createElementBlock as _createElementBlock52, createCommentVNode as _createCommentVNode22, normalizeStyle as _normalizeStyle13, mergeProps as _mergeProps5, Teleport as _Teleport3, createBlock as _createBlock24 } from "vue";
var _sfc_script62 = defineComponent45({
  name: "ak-modal",
  components: { Icon: _sfc_script2 },
  props: {
    ...popupProps,
    width: {
      type: String,
      default: null
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {});
    const boxStyles = computed26(() => getBoxStyles(props.width));
    return {
      ...popup,
      boxStyles,
      CloseCircleFilled: _sfc_script61
    };
  }
});
var _hoisted_143 = { class: "ak-modal_box-inner" };
function render62(_ctx, _cache) {
  const _component_Icon = _resolveComponent31("Icon");
  return _openBlock61(), _createBlock24(_Teleport3, { to: "body" }, [
    _createElementVNode39("div", _mergeProps5({
      class: ["ak-modal", _ctx.popupClasses],
      style: _ctx.popupStyles
    }, _ctx.$attrs), [
      _createElementVNode39("div", {
        class: "ak-mask",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onMaskClick && _ctx.onMaskClick(...args))
      }),
      _createElementVNode39("div", {
        class: "ak-modal_box",
        style: _normalizeStyle13(_ctx.boxStyles)
      }, [
        _createElementVNode39("div", _hoisted_143, [
          _renderSlot21(_ctx.$slots, "default")
        ]),
        _ctx.showClose ? (_openBlock61(), _createElementBlock52("i", {
          key: 0,
          class: "ak-modal_close",
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onCloseClick && _ctx.onCloseClick(...args))
        }, [
          _createVNode21(_component_Icon, { icon: _ctx.CloseCircleFilled }, null, 8, ["icon"])
        ])) : _createCommentVNode22("v-if", true)
      ], 4)
    ], 16)
  ]);
}
_sfc_script62.render = render62;
_sfc_script62.__file = "packages/ui/src/Modal/Modal.vue";

// packages/ui/src/Modal/index.ts
var install40 = withInstall(_sfc_script62);
var Modal_default = _sfc_script62;

// vue:./Dialog.vue
import { toDisplayString as _toDisplayString20, openBlock as _openBlock62, createElementBlock as _createElementBlock53, createCommentVNode as _createCommentVNode23, renderSlot as _renderSlot22, createElementVNode as _createElementVNode40, createTextVNode as _createTextVNode11, resolveComponent as _resolveComponent32, withCtx as _withCtx14, createBlock as _createBlock25, createVNode as _createVNode22 } from "vue";
var _sfc_script63 = defineComponent46({
  name: "ak-dialog",
  components: { Button: _sfc_script4, ButtonGroup: _sfc_script5, Modal: _sfc_script62 },
  props: {
    ...popupExtendProps,
    title: {
      type: String,
      default: null
    },
    cancelText: {
      type: String
    },
    confirmText: {
      type: String
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: null
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const { locale } = useLocale();
    const popup = usePopupExtend(ctx);
    function onConfirmClick() {
      popup.customConfirm({});
    }
    return {
      ...popup,
      onConfirmClick,
      locale
    };
  }
});
var _hoisted_144 = {
  key: 0,
  class: "ak-dialog_header"
};
var _hoisted_235 = { class: "ak-dialog_content" };
var _hoisted_330 = {
  key: 0,
  class: "ak-dialog_content-text"
};
var _hoisted_410 = { class: "ak-dialog_footer ak-horizontal-hairline" };
function render63(_ctx, _cache) {
  const _component_Button = _resolveComponent32("Button");
  const _component_ButtonGroup = _resolveComponent32("ButtonGroup");
  const _component_Modal = _resolveComponent32("Modal");
  return _openBlock62(), _createBlock25(_component_Modal, {
    class: "ak-dialog",
    visible: _ctx.visible,
    showClose: false,
    maskClosable: _ctx.maskClosable,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onConfirm: _ctx.onConfirm,
    onCancel: _ctx.onCancel,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx14(() => [
      _ctx.title ? (_openBlock62(), _createElementBlock53("div", _hoisted_144, _toDisplayString20(_ctx.title), 1)) : _createCommentVNode23("v-if", true),
      _createElementVNode40("div", _hoisted_235, [
        _ctx.content ? (_openBlock62(), _createElementBlock53("div", _hoisted_330, _toDisplayString20(_ctx.content), 1)) : _renderSlot22(_ctx.$slots, "default", { key: 1 })
      ]),
      _createElementVNode40("div", _hoisted_410, [
        _createVNode22(_component_ButtonGroup, {
          class: "ak-dialog_footer-inner",
          pattern: "borderless"
        }, {
          default: _withCtx14(() => [
            _ctx.showCancel ? (_openBlock62(), _createBlock25(_component_Button, {
              key: 0,
              class: "ak-dialog_button",
              type: "default",
              onClick: _ctx.onCancelClick
            }, {
              default: _withCtx14(() => [
                _createTextVNode11(_toDisplayString20(_ctx.cancelText || _ctx.locale.dialogCancelText), 1)
              ]),
              _: 1
            }, 8, ["onClick"])) : _createCommentVNode23("v-if", true),
            _createVNode22(_component_Button, {
              class: "ak-dialog_button",
              type: "primary",
              onClick: _ctx.onConfirmClick
            }, {
              default: _withCtx14(() => [
                _createTextVNode11(_toDisplayString20(_ctx.confirmText || _ctx.locale.dialogConfirmText), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })
      ])
    ]),
    _: 3
  }, 8, ["visible", "maskClosable", "onVisibleStateChange", "onConfirm", "onCancel", "onUpdate:visible"]);
}
_sfc_script63.render = render63;
_sfc_script63.__file = "packages/ui/src/Dialog/Dialog.vue";

// packages/ui/src/Dialog/index.ts
var showDialog = createShowPopup({
  apiName: "showDialog",
  component: _sfc_script63,
  createHook: createConfirmHook
});
var Dialog_default = _sfc_script63;
var install41 = withInstall(_sfc_script63);

// vue:./Divider.vue
import { computed as computed27, defineComponent as defineComponent47 } from "vue";

// packages/ui/src/Divider/util.ts
var getClasses6 = (props) => {
  return [
    "ak-divider",
    "ak-horizontal-hairline",
    {
      "has--title": !!props.title,
      "border--dashed": !!props.dashed
    }
  ];
};

// vue:./Divider.vue
import { toDisplayString as _toDisplayString21, openBlock as _openBlock63, createElementBlock as _createElementBlock54, createCommentVNode as _createCommentVNode24, normalizeClass as _normalizeClass27 } from "vue";
var _sfc_script64 = defineComponent47({
  name: "ak-divider",
  props: {
    title: {
      type: String
    },
    dashed: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed27(() => getClasses6(props));
    return {
      classes
    };
  }
});
var _hoisted_145 = { key: 0 };
function render64(_ctx, _cache) {
  return _openBlock63(), _createElementBlock54("div", {
    class: _normalizeClass27(_ctx.classes)
  }, [
    _ctx.title ? (_openBlock63(), _createElementBlock54("span", _hoisted_145, _toDisplayString21(_ctx.title), 1)) : _createCommentVNode24("v-if", true)
  ], 2);
}
_sfc_script64.render = render64;
_sfc_script64.__file = "packages/ui/src/Divider/Divider.vue";

// packages/ui/src/Divider/index.ts
var install42 = withInstall(_sfc_script64);
var Divider_default = _sfc_script64;

// vue:./Dropdown.vue
import { defineComponent as defineComponent48, computed as computed28, ref as ref23, nextTick as nextTick7 } from "vue";
import { createElementVNode as _createElementVNode41, renderSlot as _renderSlot23, mergeProps as _mergeProps6, Teleport as _Teleport4, openBlock as _openBlock64, createBlock as _createBlock26 } from "vue";
var _sfc_script65 = defineComponent48({
  name: "ak-dropdown",
  props: {
    ...popupProps,
    selector: {
      type: [String, HTMLElement],
      validator: selectorValidator
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const top = ref23(-1);
    const height = ref23(0);
    const popupEl = ref23();
    function updatePos() {
      const $target = querySelector(props.selector);
      if (!$target) {
        console.error(new exception_default('Cannot find element through "selector"', exception_default.TYPE.PROP_ERROR, "Dropdown"));
        return;
      }
      const { bottom } = $target.getBoundingClientRect();
      top.value = bottom;
      nextTick7(() => {
        var _a, _b;
        height.value = (_b = (_a = popupEl.value) == null ? void 0 : _a.offsetHeight) != null ? _b : 0;
      });
    }
    const popupHook = usePopup(props, ctx, {
      afterShow: updatePos,
      afterHidden() {
        top.value = -1;
      }
    });
    const popupStyles = computed28(() => {
      return {
        zIndex: popupHook.zIndex.value,
        top: top.value === -1 ? "100vh" : top.value + "px"
      };
    });
    return {
      ...popupHook,
      popupStyles,
      top,
      height,
      popupEl
    };
  }
});
var _hoisted_146 = { class: "ak-dropdown_inner" };
function render65(_ctx, _cache) {
  return _openBlock64(), _createBlock26(_Teleport4, { to: "body" }, [
    _createElementVNode41("div", _mergeProps6({
      class: ["ak-dropdown", _ctx.popupClasses],
      style: _ctx.popupStyles
    }, _ctx.$attrs, { ref: "popupEl" }), [
      _createElementVNode41("div", {
        class: "ak-mask",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onMaskClick && _ctx.onMaskClick(...args))
      }),
      _createElementVNode41("div", _hoisted_146, [
        _renderSlot23(_ctx.$slots, "default", { height: _ctx.height })
      ])
    ], 16)
  ]);
}
_sfc_script65.render = render65;
_sfc_script65.__file = "packages/ui/src/Dropdown/Dropdown.vue";

// packages/ui/src/Dropdown/index.ts
var install43 = withInstall(_sfc_script65);
var Dropdown_default = _sfc_script65;

// vue:./Fixed.vue
import {
  computed as computed29,
  defineComponent as defineComponent49,
  inject as inject12,
  onMounted as onMounted16,
  ref as ref24,
  toRef as toRef4,
  watch as watch18
} from "vue";

// packages/ui/src/hooks/use-fixed.ts
import {
  onActivated,
  onBeforeUnmount as onBeforeUnmount10,
  onDeactivated,
  onMounted as onMounted15,
  watch as watch17
} from "vue";
function useFixed({ fixed, root, inner, disableFixed }) {
  onActivated(() => fixed.value && toBody());
  onDeactivated(recover);
  onMounted15(() => fixed.value && toBody());
  onBeforeUnmount10(recover);
  function toBody() {
    disableFixed && inner.value && document.body.append(inner.value);
  }
  function recover() {
    disableFixed && root.value.append(inner.value);
  }
  watch17(fixed, (val) => {
    val ? toBody() : recover();
  });
  return {
    toBody,
    backRoot: recover
  };
}

// packages/ui/src/Fixed/util.ts
var getInnerClasses2 = (props, fixed) => {
  return [
    "ak-fixed_inner",
    "placement--" + getEnumsValue(PLACEMENT_TYPES, props.placement),
    { fixed }
  ];
};
var getInnerStyles2 = (props, safeAreaInsets2) => {
  const styles = {
    background: props.background
  };
  if (props.fixed) {
    if (props.enableSafeAreaInsets && safeAreaInsets2.support) {
      const placement = getEnumsValue(PLACEMENT_TYPES, props.placement);
      styles["padding" + capitalize(placement)] = safeAreaInsets2[placement] + "px";
    }
    styles.zIndex = props.zIndex;
  }
  return styles;
};
var getStyles3 = ({
  width,
  height
}) => {
  return {
    width: width == null ? null : width + "px",
    height: height == null ? null : height + "px"
  };
};

// vue:./Fixed.vue
import { createCommentVNode as _createCommentVNode25, renderSlot as _renderSlot24, createElementVNode as _createElementVNode42, normalizeClass as _normalizeClass28, normalizeStyle as _normalizeStyle14, openBlock as _openBlock65, createElementBlock as _createElementBlock55 } from "vue";
var _sfc_script66 = defineComponent49({
  name: "ak-fixed",
  inject: {
    disableFixed: {
      default: false
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      validator: createEnumsValidator(PLACEMENT_TYPES)
    },
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    background: {
      type: String
    },
    zIndex: {
      type: Number,
      default: 1
    },
    spaceHold: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const root = ref24();
    const innerEl = ref24();
    const contentEl = ref24();
    const disableFixed = inject12("disableFixed", false);
    const rootStyle = ref24({
      width: null,
      height: null
    });
    const fixed2 = ref24(true);
    const { safeAreaInsets: safeAreaInsets2 } = useSafeAreaInsets(toRef4(props, "enableSafeAreaInsets"));
    function updateSize() {
      if (!(root.value && innerEl.value && contentEl.value)) {
        return;
      }
      const { offsetWidth, offsetHeight } = contentEl.value;
      if (offsetWidth === 0 || offsetHeight === 0) {
        rootStyle.value = {
          width: null,
          height: null
        };
        fixed2.value = false;
        return;
      }
      rootStyle.value = {
        width: props.fixed && props.spaceHold ? offsetWidth : null,
        height: props.fixed && props.spaceHold ? offsetHeight : null
      };
      fixed2.value = !!props.fixed;
    }
    const styles = computed29(() => getStyles3(rootStyle.value));
    const innerClasses = computed29(() => getInnerClasses2(props, fixed2.value));
    const innerStyles = computed29(() => getInnerStyles2(props, safeAreaInsets2));
    useResizeObserver(contentEl, updateSize);
    useFixed({
      disableFixed,
      root,
      inner: innerEl,
      fixed: fixed2
    });
    watch18([() => props.fixed, () => props.spaceHold], updateSize);
    onMounted16(() => {
      updateSize();
    });
    return {
      root,
      innerEl,
      contentEl,
      styles,
      innerClasses,
      innerStyles,
      safeAreaInsets: safeAreaInsets2
    };
  }
});
var _hoisted_147 = {
  class: "ak-fixed_content-wrapper",
  ref: "contentEl"
};
function render66(_ctx, _cache) {
  return _openBlock65(), _createElementBlock55("div", {
    class: "ak-fixed",
    style: _normalizeStyle14(_ctx.styles),
    ref: "root"
  }, [
    _createCommentVNode25("fixed start"),
    _createElementVNode42("div", {
      class: _normalizeClass28(_ctx.innerClasses),
      style: _normalizeStyle14(_ctx.innerStyles),
      ref: "innerEl"
    }, [
      _createElementVNode42("div", _hoisted_147, [
        _renderSlot24(_ctx.$slots, "default")
      ], 512)
    ], 6),
    _createCommentVNode25("fixed end")
  ], 4);
}
_sfc_script66.render = render66;
_sfc_script66.__file = "packages/ui/src/Fixed/Fixed.vue";

// packages/ui/src/Fixed/index.ts
var install44 = withInstall(_sfc_script66);
var Fixed_default = _sfc_script66;

// vue:./FlatList.vue
import { computed as computed32, defineComponent as defineComponent52, onMounted as onMounted19, ref as ref26 } from "vue";

// vue:./LoadMore.vue
import { computed as computed30, defineComponent as defineComponent50 } from "vue";

// packages/ui/src/LoadMore/util.ts
var getClasses7 = (props) => [
  "ak-load-more",
  "ak-horizontal-hairline",
  {
    loading: !!props.loading,
    vertical: !!props.vertical
  }
];

// vue:./LoadMore.vue
import { resolveComponent as _resolveComponent33, openBlock as _openBlock66, createBlock as _createBlock27, createCommentVNode as _createCommentVNode26, renderSlot as _renderSlot25, createElementVNode as _createElementVNode43, normalizeClass as _normalizeClass29, createElementBlock as _createElementBlock56 } from "vue";
var _sfc_script67 = defineComponent50({
  name: "ak-load-more",
  components: { ActivityIndicator: _sfc_script13 },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed30(() => getClasses7({
      loading: props.loading,
      vertical: props.vertical
    }));
    return {
      classes
    };
  }
});
var _hoisted_148 = { class: "ak-load-more_content" };
var _hoisted_236 = /* @__PURE__ */ _createElementVNode43("i", { class: "ak-load-more_dot" }, null, -1);
function render67(_ctx, _cache) {
  const _component_ActivityIndicator = _resolveComponent33("ActivityIndicator");
  return _openBlock66(), _createElementBlock56("div", {
    class: _normalizeClass29(_ctx.classes)
  }, [
    _ctx.loading ? (_openBlock66(), _createBlock27(_component_ActivityIndicator, {
      key: 0,
      class: "ak-load-more_icon",
      size: 18
    })) : _createCommentVNode26("v-if", true),
    _createElementVNode43("span", _hoisted_148, [
      _renderSlot25(_ctx.$slots, "default", {}, () => [
        _hoisted_236
      ])
    ])
  ], 2);
}
_sfc_script67.render = render67;
_sfc_script67.__file = "packages/ui/src/LoadMore/LoadMore.vue";

// packages/ui/src/LoadMore/index.ts
var install45 = withInstall(_sfc_script67);
var LoadMore_default = _sfc_script67;

// vue:./ScrollView.vue
import { defineComponent as defineComponent51, computed as computed31, ref as ref25, onMounted as onMounted18, watch as watch19, provide as provide9 } from "vue";

// packages/ui/src/hooks/use-touch.ts
import { onBeforeUnmount as onBeforeUnmount11, onMounted as onMounted17 } from "vue";
var {
  touchstart: touchstart2,
  touchmove: touchmove2,
  touchend: touchend2,
  addListeners,
  removeListeners,
  getTouch
} = touchEvent;
function useTouch({
  el,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}) {
  const object = {
    handleEvent(e) {
      e.touchObject = getTouch(e);
      switch (e.type) {
        case touchstart2:
          onTouchStart(e);
          break;
        case touchmove2:
          onTouchMove(e);
          break;
        case touchend2:
          onTouchEnd(e);
          break;
        case "mouseleave":
          onTouchEnd(e);
          break;
        default:
          break;
      }
    }
  };
  onMounted17(() => addListeners(el.value, object));
  onBeforeUnmount11(() => removeListeners(el.value, object));
  return {};
}

// packages/ui/src/ScrollView/props.ts
var emitScrollValidator = (payload) => payload && typeof payload.scrollTop === "number" && typeof payload.scrollLeft === "number";
var emitRefreshingValidator = (payload, loadComplete) => payload && typeof payload.pullDirection === "string" && typeof loadComplete === "function";
var emitScrollToUpperValidator = (payload) => payload && ["top", "left"].includes(payload.direction);
var emitScrollToLowerValidator = (payload) => payload && ["bottom", "right"].includes(payload.direction);

// packages/ui/src/ScrollView/util.ts
var ScrollState = {
  Center: 0,
  Upper: 1,
  Lower: 2
};
var PullRefreshState = {
  Pulling: 0,
  Holding: 1,
  Refreshing: 2
};
var getContentStyles = ({
  translateDuration,
  pullDirection,
  pullDistance
}) => {
  return {
    transition: `transform ${translateDuration}ms`,
    transform: ["up", "down"].includes(pullDirection) ? `translate3d(0, ${pullDistance}px, 0)` : `translate3d(${pullDistance}px, 0, 0)`
  };
};
var getIndicatorStyles = (pullIndicatorSafeArea) => {
  return {
    padding: `${pullIndicatorSafeArea.top}px ${pullIndicatorSafeArea.right}px ${pullIndicatorSafeArea.bottom}px ${pullIndicatorSafeArea.left}px`
  };
};
var getClasses8 = ({
  scrollX,
  scrollY,
  scrollAnimated
}) => [
  "ak-scroll-view",
  {
    "scroll-x": scrollX,
    "scroll-y": scrollY,
    smooth: scrollAnimated
  }
];
var getPullRefreshClasses = (pullDirection) => [
  "ak-scroll-view_pull-refresh",
  "direction--" + (pullDirection || "unknown")
];
var getLoadMoreClasses = (pullDirection) => [
  "ak-load-more",
  {
    vertical: pullDirection === "left" || pullDirection === "right"
  }
];

// vue:./ScrollView.vue
import { renderSlot as _renderSlot26, resolveComponent as _resolveComponent34, openBlock as _openBlock67, createBlock as _createBlock28, createCommentVNode as _createCommentVNode27, toDisplayString as _toDisplayString22, createElementVNode as _createElementVNode44, normalizeClass as _normalizeClass30, normalizeStyle as _normalizeStyle15, createElementBlock as _createElementBlock57 } from "vue";
var _sfc_script68 = defineComponent51({
  name: "ak-scroll-view",
  components: { Icon: _sfc_script2, ActivityIndicator: _sfc_script13 },
  props: {
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    },
    scrollAnimated: {
      type: Boolean,
      default: false
    },
    upperThreshold: {
      type: Number,
      default: 50
    },
    lowerThreshold: {
      type: Number,
      default: 50
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    scrollLeft: {
      type: Number,
      default: 0
    },
    enablePullDirections: {
      type: [String, Array],
      validator: (val) => typeof val === "string" || isStringArray(val),
      default: null
    },
    pullRefreshThreshold: {
      type: Number,
      default: 48
    }
  },
  emits: {
    scrollToUpper: emitScrollToUpperValidator,
    scrollToLower: emitScrollToLowerValidator,
    scroll: emitScrollValidator,
    refreshing: emitRefreshingValidator
  },
  setup(props, ctx) {
    const { locale } = useLocale();
    const { emit } = ctx;
    let _isToLowerOrUpperY = ScrollState.Upper;
    let _isToLowerOrUpperX = ScrollState.Upper;
    let _prevY = 0;
    let _prevX = 0;
    let coords;
    const pullRefreshState = ref25(PullRefreshState.Pulling);
    const root = ref25();
    const pullDistance = ref25(0);
    const translateDuration = ref25(0);
    const pullDirection = ref25("");
    const pullIndicatorSafeArea = ref25({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    function loadComplete() {
      pullRefreshState.value = PullRefreshState.Pulling;
      pullDistance.value = 0;
    }
    function onScroll() {
      const { upperThreshold, lowerThreshold, scrollX, scrollY } = props;
      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      } = root.value;
      let isToLowerY = false;
      let isToUpperY = false;
      let isToLowerX = false;
      let isToUpperX = false;
      emit("scroll", {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      });
      if (scrollY) {
        if (scrollTop + clientHeight + lowerThreshold >= scrollHeight && scrollTop > _prevY) {
          isToLowerY = true;
        } else if (scrollTop <= upperThreshold && scrollTop < _prevY) {
          isToUpperY = true;
        }
      }
      if (scrollX) {
        if (scrollLeft + clientWidth + lowerThreshold >= scrollWidth && scrollLeft > _prevX) {
          isToLowerX = true;
        } else if (scrollLeft <= upperThreshold && scrollLeft < _prevX) {
          isToUpperX = true;
        }
      }
      if (isToUpperY || isToLowerY) {
        if (_isToLowerOrUpperY === ScrollState.Upper) {
          isToUpperY = false;
        } else if (_isToLowerOrUpperY === ScrollState.Lower) {
          isToLowerY = false;
        }
      } else {
        _isToLowerOrUpperY = ScrollState.Center;
      }
      if (isToUpperX || isToLowerX) {
        if (_isToLowerOrUpperX === ScrollState.Upper) {
          isToUpperX = false;
        } else if (_isToLowerOrUpperX === ScrollState.Lower) {
          isToLowerX = false;
        }
      } else {
        _isToLowerOrUpperX = ScrollState.Center;
      }
      const typeLower = "scrollToLower";
      const typeUpper = "scrollToUpper";
      if (isToUpperY) {
        _isToLowerOrUpperY = ScrollState.Upper;
        emit(typeUpper, {
          direction: "top"
        });
      } else if (isToLowerY) {
        _isToLowerOrUpperY = ScrollState.Lower;
        emit(typeLower, {
          direction: "bottom"
        });
      }
      if (isToUpperX) {
        _isToLowerOrUpperX = ScrollState.Upper;
        emit(typeUpper, {
          direction: "left"
        });
      } else if (isToLowerX) {
        _isToLowerOrUpperX = ScrollState.Lower;
        emit(typeLower, {
          direction: "right"
        });
      }
      _prevY = scrollTop;
      _prevX = scrollLeft;
    }
    function updateScroll() {
      const { scrollY, scrollX } = props;
      if (scrollY || scrollX) {
        scrollToOffset({
          x: scrollX ? props.scrollLeft : 0,
          y: scrollY ? props.scrollTop : 0,
          animated: props.scrollAnimated
        });
      }
    }
    onMounted18(() => updateScroll);
    watch19([() => props.scrollLeft, () => props.scrollTop], updateScroll);
    const classes = computed31(() => getClasses8({
      scrollX: props.scrollX,
      scrollY: props.scrollY,
      scrollAnimated: props.scrollAnimated
    }));
    const pullRefreshClasses = computed31(() => getPullRefreshClasses(pullDirection.value));
    const loadMoreClasses = computed31(() => getLoadMoreClasses(pullDirection.value));
    const contentStyles = computed31(() => getContentStyles({
      translateDuration: translateDuration.value,
      pullDirection: pullDirection.value,
      pullDistance: pullDistance.value
    }));
    const indicatorStyles = computed31(() => getIndicatorStyles(pullIndicatorSafeArea.value));
    useTouch({
      el: root,
      onTouchStart(e) {
        const { pageX, pageY } = e.touchObject;
        const $scroll = root.value;
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth
        } = $scroll;
        coords = {
          pageX,
          pageY,
          scrollX: props.scrollX && scrollWidth > clientWidth,
          scrollY: props.scrollY && scrollHeight > clientHeight,
          stop: null
        };
        if (pullRefreshState.value === PullRefreshState.Refreshing) {
          return;
        }
        const allowPullDirections = stringMix2StringArray(props.enablePullDirections);
        if (allowPullDirections.length === 0) {
          return;
        }
        pullDistance.value = 0;
        translateDuration.value = 0;
        pullDirection.value = "";
        const directions = [];
        if (scrollTop === 0 && allowPullDirections.includes("down")) {
          directions.push("down");
        }
        if (scrollTop + clientHeight >= scrollHeight && allowPullDirections.includes("up")) {
          directions.push("up");
        }
        if (scrollLeft === 0 && allowPullDirections.includes("right")) {
          directions.push("right");
        }
        if (scrollLeft + clientWidth >= scrollWidth && allowPullDirections.includes("left")) {
          directions.push("left");
        }
        if (directions[0]) {
          coords.directions = directions;
        }
      },
      onTouchMove(e) {
        if (!coords) {
          return;
        }
        const { pageX, pageY } = e.touchObject;
        const offsetX = pageX - coords.pageX;
        const offsetY = pageY - coords.pageY;
        const y = _isToLowerOrUpperY;
        const x = _isToLowerOrUpperX;
        if (coords.stop == null) {
          if (coords.scrollY && Math.abs(offsetY) >= Math.abs(offsetX) && (y === ScrollState.Center || y === ScrollState.Upper && offsetY < 0 || y === ScrollState.Lower && offsetY > 0) || coords.scrollX && Math.abs(offsetX) >= Math.abs(offsetY) && (x === ScrollState.Center || x === ScrollState.Upper && offsetX < 0 || x === ScrollState.Lower && offsetX > 0)) {
            coords.stop = true;
          } else {
            coords.stop = false;
          }
        }
        if (coords.stop) {
          e.stopPropagation();
        }
        if (!coords.directions) {
          return;
        }
        let _pullDirection = coords.direction;
        if (!_pullDirection) {
          if (Math.abs(offsetY) >= Math.abs(offsetX)) {
            coords.directions = coords.directions.filter((v) => {
              return ["up", "down"].includes(v) && (v === "down" && offsetY > 0 || v === "up" && offsetY < 0);
            });
          } else {
            coords.directions = coords.directions.filter((v) => {
              return ["left", "right"].includes(v) && (v === "right" && offsetX > 0 || v === "left" && offsetX < 0);
            });
          }
          coords.direction = _pullDirection = coords.directions[0];
        }
        if (!_pullDirection) {
          delete coords.directions;
          return;
        }
        e.preventDefault();
        if (!coords.isSetSafeArea) {
          const $scroll = root.value;
          const _pullIndicatorSafeArea = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          };
          if (["up", "down"].includes(_pullDirection)) {
            _pullIndicatorSafeArea.left = $scroll.scrollLeft;
            _pullIndicatorSafeArea.right = $scroll.scrollWidth - $scroll.scrollLeft - $scroll.clientWidth;
          } else {
            _pullIndicatorSafeArea.top = $scroll.scrollTop;
            _pullIndicatorSafeArea.bottom = $scroll.scrollHeight - $scroll.scrollTop - $scroll.clientHeight;
          }
          pullIndicatorSafeArea.value = _pullIndicatorSafeArea;
          coords.isSetSafeArea = true;
        }
        pullDirection.value = _pullDirection;
        let distance;
        if (["up", "down"].includes(pullDirection.value)) {
          distance = offsetY;
        } else {
          distance = offsetX;
        }
        distance = Math.abs(distance);
        const pullRefreshThreshold = props.pullRefreshThreshold;
        if (distance >= pullRefreshThreshold) {
          if (pullRefreshState.value === PullRefreshState.Pulling) {
            pullRefreshState.value = PullRefreshState.Holding;
          }
          distance = pullRefreshThreshold + Math.ceil((distance - pullRefreshThreshold) / Math.log(Math.abs(distance - pullRefreshThreshold) / 2));
        }
        pullDistance.value = ["down", "right"].includes(pullDirection.value) ? distance : -distance;
      },
      onTouchEnd() {
        if (!coords) {
          return;
        }
        coords = null;
        translateDuration.value = 200;
        if (pullRefreshState.value === PullRefreshState.Holding) {
          pullRefreshState.value = PullRefreshState.Refreshing;
          pullDistance.value = ["down", "right"].includes(pullDirection.value) ? props.pullRefreshThreshold : -props.pullRefreshThreshold;
          emit("refreshing", {
            pullDirection: pullDirection.value
          }, loadComplete);
        } else {
          pullDistance.value = 0;
        }
      }
    });
    const { scrollToOffset, scrollToEnd } = useScrollTo(root);
    provide9("disableFixed", true);
    return {
      pullRefreshState,
      pullDistance,
      pullDirection,
      root,
      classes,
      pullRefreshClasses,
      loadMoreClasses,
      contentStyles,
      indicatorStyles,
      onScroll,
      pullIndicatorSafeArea,
      PullRefreshState,
      scrollTo: scrollToOffset,
      scrollToEnd,
      locale,
      CircleOutlined: _sfc_script40
    };
  }
});
var _hoisted_149 = { class: "ak-scroll-view_inner" };
var _hoisted_237 = { class: "ak-load-more_content" };
function render68(_ctx, _cache) {
  const _component_ActivityIndicator = _resolveComponent34("ActivityIndicator");
  const _component_Icon = _resolveComponent34("Icon");
  return _openBlock67(), _createElementBlock57("div", {
    class: _normalizeClass30(_ctx.classes),
    ref: "root",
    onScroll: _cache[0] || (_cache[0] = (...args) => _ctx.onScroll && _ctx.onScroll(...args))
  }, [
    _createElementVNode44("div", _hoisted_149, [
      _createElementVNode44("div", {
        class: "ak-scroll-view_content",
        style: _normalizeStyle15(_ctx.contentStyles)
      }, [
        _ctx.enablePullDirections && _ctx.enablePullDirections.length > 0 ? (_openBlock67(), _createElementBlock57("div", {
          key: 0,
          class: _normalizeClass30(_ctx.pullRefreshClasses)
        }, [
          _renderSlot26(_ctx.$slots, "indicator", {
            pullDirection: _ctx.pullDirection,
            pullRefreshState: _ctx.pullRefreshState,
            pullIndicatorSafeArea: _ctx.pullIndicatorSafeArea
          }, () => [
            _createElementVNode44("div", {
              class: _normalizeClass30(_ctx.loadMoreClasses),
              style: _normalizeStyle15(_ctx.indicatorStyles)
            }, [
              _ctx.pullRefreshState === _ctx.PullRefreshState.Refreshing ? (_openBlock67(), _createBlock28(_component_ActivityIndicator, {
                key: 0,
                class: "ak-load-more_icon",
                size: 18
              })) : (_openBlock67(), _createBlock28(_component_Icon, {
                key: 1,
                class: "ak-load-more_icon",
                icon: _ctx.CircleOutlined
              }, null, 8, ["icon"])),
              _createElementVNode44("span", _hoisted_237, _toDisplayString22(_ctx.pullRefreshState === _ctx.PullRefreshState.Refreshing ? _ctx.locale.scrollViewRefreshingText : _ctx.pullRefreshState === _ctx.PullRefreshState.Holding ? _ctx.locale.scrollViewHoldingText : _ctx.locale.scrollViewPullingTexts[_ctx.pullDirection]), 1)
            ], 6)
          ])
        ], 2)) : _createCommentVNode27("v-if", true),
        _renderSlot26(_ctx.$slots, "default")
      ], 4)
    ])
  ], 34);
}
_sfc_script68.render = render68;
_sfc_script68.__file = "packages/ui/src/ScrollView/ScrollView.vue";

// packages/ui/src/ScrollView/index.ts
var install46 = withInstall(_sfc_script68);
var ScrollView_default = _sfc_script68;

// packages/ui/src/FlatList/util.ts
var getClasses9 = (horizontal) => [
  "ak-flat-list",
  { horizontal }
];

// vue:./FlatList.vue
import { renderSlot as _renderSlot27, openBlock as _openBlock68, createElementBlock as _createElementBlock58, createCommentVNode as _createCommentVNode28, resolveComponent as _resolveComponent35, withCtx as _withCtx15, createVNode as _createVNode23, toDisplayString as _toDisplayString23, createTextVNode as _createTextVNode12, createBlock as _createBlock29, normalizeClass as _normalizeClass31 } from "vue";
var _sfc_script69 = defineComponent52({
  name: "ak-flat-list",
  components: { ScrollView: _sfc_script68, LoadMore: _sfc_script67, VirtualList: _sfc_script30 },
  props: {
    ...virtualListProps,
    endReachedThreshold: {
      type: Number,
      default: 0.5
    },
    enablePullRefresh: {
      type: Boolean,
      default: false
    },
    lowerLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    endReached: (payload) => payload && isNumber(payload.distanceFromEnd),
    scroll: emitScrollValidator,
    refreshing: emitRefreshingValidator,
    visibleItemsChange: emitVisibleItemsChangeValidator
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const scrollViewRef = ref26();
    const virtualListRef = ref26();
    const wrapperSize = ref26(0);
    let horizontal = false;
    if (props.initialWaterfallCount <= 1 && props.initialHorizontal) {
      horizontal = true;
    }
    function getScrollContainer() {
      var _a;
      return (_a = scrollViewRef.value) == null ? void 0 : _a.$el;
    }
    function onResize(size) {
      wrapperSize.value = size;
    }
    const onRefreshing = (res, loadComplete) => {
      emit("refreshing", res, loadComplete);
    };
    const onVisibleItemsChange = (res) => {
      emit("visibleItemsChange", res);
    };
    function recordInteraction() {
      var _a;
      (_a = virtualListRef.value) == null ? void 0 : _a.recordInteraction();
    }
    const onScroll = (res) => {
      emit("scroll", res);
    };
    function onScrollToLower() {
      const $el = getScrollContainer();
      const distanceFromEnd = horizontal ? $el.scrollWidth - $el.scrollLeft - $el.offsetWidth : $el.scrollHeight - $el.scrollTop - $el.offsetHeight;
      emit("endReached", {
        distanceFromEnd
      });
    }
    const scrollTo2 = (options) => {
      var _a;
      (_a = virtualListRef.value) == null ? void 0 : _a.scrollTo(options);
    };
    const scrollToIndex = (options) => {
      var _a;
      (_a = virtualListRef.value) == null ? void 0 : _a.scrollToIndex(options);
    };
    const scrollToEnd = (animated) => {
      var _a;
      (_a = virtualListRef.value) == null ? void 0 : _a.scrollToEnd(animated);
    };
    const lowerThreshold = computed32(() => {
      return wrapperSize.value * props.endReachedThreshold;
    });
    const enablePullDirections = computed32(() => {
      if (props.enablePullRefresh) {
        return horizontal ? ["right"] : ["down"];
      }
      return [];
    });
    onMounted19(() => {
      var _a;
      if (scrollViewRef.value) {
        (_a = virtualListRef.value) == null ? void 0 : _a.resetScrollContainer(getScrollContainer());
      }
    });
    const classes = getClasses9(horizontal);
    return {
      classes,
      scrollViewRef,
      virtualListRef,
      horizontal,
      lowerThreshold,
      enablePullDirections,
      onRefreshing,
      recordInteraction,
      onScroll,
      onScrollToLower,
      scrollTo: scrollTo2,
      scrollToIndex,
      scrollToEnd,
      locale,
      onVisibleItemsChange,
      onResize
    };
  }
});
var _hoisted_150 = {
  key: 0,
  class: "ak-flat-list_header"
};
var _hoisted_238 = {
  key: 2,
  class: "ak-flat-list_empty"
};
var _hoisted_331 = {
  key: 3,
  class: "ak-flat-list_footer"
};
function render69(_ctx, _cache) {
  const _component_VirtualList = _resolveComponent35("VirtualList");
  const _component_LoadMore = _resolveComponent35("LoadMore");
  const _component_ScrollView = _resolveComponent35("ScrollView");
  return _openBlock68(), _createBlock29(_component_ScrollView, {
    class: _normalizeClass31(_ctx.classes),
    scrollX: _ctx.horizontal,
    scrollY: !_ctx.horizontal,
    lowerThreshold: _ctx.lowerThreshold,
    enablePullDirections: _ctx.enablePullDirections,
    onScroll: _ctx.onScroll,
    onScrollToLower: _ctx.onScrollToLower,
    onRefreshing: _ctx.onRefreshing,
    ref: "scrollViewRef"
  }, {
    default: _withCtx15(() => [
      _ctx.$slots.header ? (_openBlock68(), _createElementBlock58("div", _hoisted_150, [
        _renderSlot27(_ctx.$slots, "header")
      ])) : _createCommentVNode28("v-if", true),
      _createVNode23(_component_VirtualList, {
        ref: "virtualListRef",
        ids: _ctx.ids,
        initialHorizontal: _ctx.initialHorizontal,
        initialWaterfallCount: _ctx.initialWaterfallCount,
        itemSize: _ctx.itemSize,
        preLoad: _ctx.preLoad,
        approvedItemVisibleScale: _ctx.approvedItemVisibleScale,
        onVisibleItemsChange: _ctx.onVisibleItemsChange,
        onResize: _ctx.onResize
      }, {
        default: _withCtx15((item) => [
          _renderSlot27(_ctx.$slots, "default", {
            id: item.id,
            index: item.index
          }),
          _renderSlot27(_ctx.$slots, "separator", {
            id: item.id,
            index: item.index
          })
        ]),
        _: 3
      }, 8, ["ids", "initialHorizontal", "initialWaterfallCount", "itemSize", "preLoad", "approvedItemVisibleScale", "onVisibleItemsChange", "onResize"]),
      _ctx.lowerLoading && _ctx.ids.length > 0 ? (_openBlock68(), _createBlock29(_component_LoadMore, {
        key: 1,
        class: "ak-flat-list_indicator",
        loading: "",
        vertical: _ctx.horizontal
      }, {
        default: _withCtx15(() => [
          _createTextVNode12(_toDisplayString23(_ctx.locale.flatListLoadingText), 1)
        ]),
        _: 1
      }, 8, ["vertical"])) : _createCommentVNode28("v-if", true),
      _ctx.ids.length === 0 ? (_openBlock68(), _createElementBlock58("div", _hoisted_238, [
        _renderSlot27(_ctx.$slots, "empty")
      ])) : _createCommentVNode28("v-if", true),
      _ctx.$slots.footer ? (_openBlock68(), _createElementBlock58("div", _hoisted_331, [
        _renderSlot27(_ctx.$slots, "footer")
      ])) : _createCommentVNode28("v-if", true)
    ]),
    _: 3
  }, 8, ["class", "scrollX", "scrollY", "lowerThreshold", "enablePullDirections", "onScroll", "onScrollToLower", "onRefreshing"]);
}
_sfc_script69.render = render69;
_sfc_script69.__file = "packages/ui/src/FlatList/FlatList.vue";

// packages/ui/src/FlatList/index.ts
var install47 = withInstall(_sfc_script69);
var FlatList_default = _sfc_script69;

// vue:./Form.vue
import { defineComponent as defineComponent54, h } from "vue";

// vue:./FormFooter.vue
import { defineComponent as defineComponent53 } from "vue";
import { renderSlot as _renderSlot28, openBlock as _openBlock69, createElementBlock as _createElementBlock59 } from "vue";
var _sfc_script70 = defineComponent53({
  name: "ak-form-footer"
});
var _hoisted_151 = { class: "ak-form-footer" };
function render70(_ctx, _cache) {
  return _openBlock69(), _createElementBlock59("div", _hoisted_151, [
    _renderSlot28(_ctx.$slots, "default")
  ]);
}
_sfc_script70.render = render70;
_sfc_script70.__file = "packages/ui/src/Form/FormFooter.vue";

// vue:./Form.vue
var _sfc_script71 = defineComponent54({
  name: "ak-form",
  setup(props, { slots }) {
    return () => h("div", {
      className: "ak-form"
    }, [
      slots.default && slots.default(),
      slots.footer && h(_sfc_script70, null, () => slots.footer && slots.footer())
    ]);
  }
});

// vue:./FormItem.vue
import { computed as computed33, defineComponent as defineComponent55 } from "vue";
import { toDisplayString as _toDisplayString24, openBlock as _openBlock70, createElementBlock as _createElementBlock60, createCommentVNode as _createCommentVNode29, createTextVNode as _createTextVNode13, renderSlot as _renderSlot29, createElementVNode as _createElementVNode45, renderList as _renderList10, Fragment as _Fragment10, normalizeClass as _normalizeClass32 } from "vue";
var _sfc_script72 = defineComponent55({
  name: "ak-form-item",
  props: {
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: [String, Array],
      validator: (val) => typeof val === "string" || isStringArray(val)
    },
    validateStatus: {
      type: String
    }
  },
  setup(props) {
    const errors = computed33(() => {
      const ret = [];
      if (Array.isArray(props.error)) {
        ;
        props.error.forEach((v) => {
          ret.push(v.toString());
        });
      } else if (props.error != null) {
        ret.push(props.error.toString());
      }
      return ret;
    });
    return { errors };
  }
});
var _hoisted_152 = { class: "ak-cell_header" };
var _hoisted_239 = {
  key: 0,
  class: "ak-cell_label"
};
var _hoisted_332 = {
  key: 0,
  class: "ak-form-item_required"
};
var _hoisted_411 = { class: "ak-cell_content" };
var _hoisted_55 = {
  key: 0,
  class: "ak-cell_body"
};
function render71(_ctx, _cache) {
  return _openBlock70(), _createElementBlock60("label", {
    class: _normalizeClass32(["ak-form-item ak-cell ak-horizontal-hairline", [_ctx.validateStatus]])
  }, [
    _createElementVNode45("div", _hoisted_152, [
      _ctx.label ? (_openBlock70(), _createElementBlock60("div", _hoisted_239, [
        _createTextVNode13(_toDisplayString24(_ctx.label) + " ", 1),
        _ctx.required ? (_openBlock70(), _createElementBlock60("span", _hoisted_332, "*")) : _createCommentVNode29("v-if", true)
      ])) : _createCommentVNode29("v-if", true),
      _createElementVNode45("div", _hoisted_411, [
        _renderSlot29(_ctx.$slots, "default")
      ])
    ]),
    _ctx.errors.length > 0 ? (_openBlock70(), _createElementBlock60("ol", _hoisted_55, [
      (_openBlock70(true), _createElementBlock60(_Fragment10, null, _renderList10(_ctx.errors, (error, k) => {
        return _openBlock70(), _createElementBlock60("li", { key: error }, _toDisplayString24(_ctx.errors.length > 1 ? k + 1 + ". " : "") + _toDisplayString24(error), 1);
      }), 128))
    ])) : _createCommentVNode29("v-if", true)
  ], 2);
}
_sfc_script72.render = render71;
_sfc_script72.__file = "packages/ui/src/Form/FormItem.vue";

// packages/ui/src/Form/index.ts
var Form_default = _sfc_script71;
var install48 = multiWithInstall(_sfc_script71, [_sfc_script72, _sfc_script70]);

// packages/ui/src/FormFooter/index.ts
var FormFooter_default = _sfc_script70;
var install49 = withNoopInstall(_sfc_script70);

// packages/ui/src/FormItem/index.ts
var FormItem_default = _sfc_script72;
var install50 = withNoopInstall(_sfc_script72);

// vue:./Group.vue
import { computed as computed34, defineComponent as defineComponent56 } from "vue";

// packages/ui/src/Group/util.ts
function getClasses10(strongHeader) {
  return [
    ["ak-group", "ak-horizontal-hairline"],
    { "strong-header": strongHeader }
  ];
}

// vue:./Group.vue
import { toDisplayString as _toDisplayString25, createElementVNode as _createElementVNode46, renderSlot as _renderSlot30, normalizeClass as _normalizeClass33, openBlock as _openBlock71, createElementBlock as _createElementBlock61 } from "vue";
var _sfc_script73 = defineComponent56({
  name: "ak-group",
  props: {
    title: {
      type: String,
      required: true
    },
    strongHeader: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed34(() => getClasses10(props.strongHeader));
    return {
      classes
    };
  }
});
var _hoisted_153 = { class: "ak-group_header" };
var _hoisted_240 = { class: "ak-group_title" };
var _hoisted_333 = { class: "ak-group_more" };
var _hoisted_412 = { class: "ak-group_body ak-horizontal-hairline hairline-reverse" };
var _hoisted_56 = { class: "ak-group_body-inner" };
function render72(_ctx, _cache) {
  return _openBlock71(), _createElementBlock61("div", {
    class: _normalizeClass33(_ctx.classes)
  }, [
    _createElementVNode46("div", _hoisted_153, [
      _createElementVNode46("div", _hoisted_240, _toDisplayString25(_ctx.title), 1),
      _createElementVNode46("div", _hoisted_333, [
        _renderSlot30(_ctx.$slots, "header")
      ])
    ]),
    _createElementVNode46("div", _hoisted_412, [
      _createElementVNode46("div", _hoisted_56, [
        _renderSlot30(_ctx.$slots, "default")
      ])
    ])
  ], 2);
}
_sfc_script73.render = render72;
_sfc_script73.__file = "packages/ui/src/Group/Group.vue";

// packages/ui/src/Group/index.ts
var install51 = withInstall(_sfc_script73);
var Group_default = _sfc_script73;

// vue:./ImagePreview.vue
import { defineComponent as defineComponent59, reactive as reactive4, ref as ref30, watch as watch21 } from "vue";

// vue:./Swiper.vue
import {
  ref as ref28,
  defineComponent as defineComponent57,
  onMounted as onMounted21,
  watch as watch20,
  onBeforeUnmount as onBeforeUnmount13,
  provide as provide11
} from "vue";

// packages/ui/src/hooks/use-list.ts
import {
  getCurrentInstance as getCurrentInstance3,
  ref as ref27,
  onBeforeUnmount as onBeforeUnmount12,
  provide as provide10,
  onMounted as onMounted20,
  onUnmounted,
  inject as inject13
} from "vue";
function createUpdateInItem(name) {
  name = capitalize(name);
  return function(lazy = 17) {
    new exception_default(`${name}Item is not in ${name}`, exception_default.TYPE.DEFAULT, name);
  };
}
function useList(name, updateCallback) {
  const instance = getCurrentInstance3();
  const listEl = ref27();
  let updateTimer;
  function doUpdate() {
    const $items = getItems();
    $items.forEach(($item, index) => {
      $item._akSetIndex && $item._akSetIndex(index);
    });
    updateCallback($items);
  }
  function update(lazy = 17) {
    if (!(instance == null ? void 0 : instance.isMounted)) {
      return;
    }
    if (lazy === 0) {
      if (!(instance == null ? void 0 : instance.isUnmounted)) {
        doUpdate();
      }
    } else {
      clearTimeout(updateTimer);
      updateTimer = window.setTimeout(() => {
        if (!(instance == null ? void 0 : instance.isUnmounted)) {
          doUpdate();
        }
      }, lazy);
    }
  }
  provide10(`ak${capitalize(name)}Update`, update);
  function getItems() {
    return listEl.value ? [].slice.call(listEl.value.querySelectorAll(`.ak-${camelCase2KebabCase(name)}-item`), 0) : [];
  }
  onBeforeUnmount12(() => clearTimeout(updateTimer));
  return {
    listEl,
    getItems,
    update
  };
}
function useListItem(name, root) {
  const index = ref27(-1);
  const update = inject13(`ak${capitalize(name)}Update`, createUpdateInItem(name));
  onMounted20(() => {
    if (root == null ? void 0 : root.value) {
      root.value._akSetIndex = (_index) => index.value = _index;
    }
    update();
  });
  onUnmounted(() => update());
  return {
    index,
    update
  };
}

// packages/ui/src/Swiper/props.ts
var emitChangeValidator = (activeIndex, fromIndex) => isNumber(activeIndex) && isNumber(fromIndex);

// packages/ui/src/Swiper/util.ts
var getClasses11 = (direction) => {
  return [
    "ak-swiper",
    {
      vertical: direction === "y"
    }
  ];
};
var getIndicatorsClasses = (direction) => {
  return [
    "ak-swiper_indicators",
    {
      vertical: direction === "y"
    }
  ];
};
var getPaginationItemClasses = (pageIndex, activeIndex) => {
  return [
    "ak-swiper_indicator",
    {
      active: pageIndex === activeIndex
    }
  ];
};
var getPaginationItemStyles = ({
  indicatorActiveColor,
  indicatorColor
}, pageIndex, activeIndex) => {
  return {
    background: pageIndex === activeIndex ? indicatorActiveColor : indicatorColor
  };
};

// vue:./Swiper.vue
import { renderSlot as _renderSlot31, createElementVNode as _createElementVNode47, renderList as _renderList11, Fragment as _Fragment11, openBlock as _openBlock72, createElementBlock as _createElementBlock62, normalizeClass as _normalizeClass34, normalizeStyle as _normalizeStyle16, createCommentVNode as _createCommentVNode30, resolveComponent as _resolveComponent36, createVNode as _createVNode24 } from "vue";
var _sfc_script74 = defineComponent57({
  name: "ak-swiper",
  components: { Icon: _sfc_script2 },
  props: {
    indicatorDots: {
      type: Boolean,
      default: false
    },
    indicatorColor: {
      type: String,
      validator: colorValidator
    },
    indicatorActiveColor: {
      type: String,
      validator: colorValidator
    },
    navigationButtons: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 5e3
    },
    duration: {
      type: Number,
      default: null
    },
    initialCircular: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    initialVertical: {
      type: Boolean,
      default: false
    },
    bounces: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    "update:activeIndex": (activeIndex) => isNumber(activeIndex),
    change: emitChangeValidator,
    animated: emitChangeValidator,
    click: emitEventValidator
  },
  setup(props, ctx) {
    const root = ref28();
    const { emit } = ctx;
    const index = ref28(0);
    const pagination = ref28([]);
    const direction = props.initialVertical ? "y" : "x";
    const directionGroup = props.initialVertical ? ["Y", "X", "Height", "Width"] : ["X", "Y", "Width", "Height"];
    const circular = !!props.initialCircular;
    const classes = getClasses11(direction);
    const indicatorsClasses = getIndicatorsClasses(direction);
    let prevTranSize = 0;
    let $items = [];
    let itemSize = 0;
    let horizontal = null;
    function swipeTo(activeIndex) {
      if (isNumber(activeIndex) && activeIndex >= 0 && activeIndex < $items.length) {
        if (activeIndex !== index.value) {
          to(activeIndex, false);
        }
      } else {
        console.error(new exception_default('This value of "activeIndex" is out of range.', exception_default.TYPE.PROP_ERROR, "Swiper"));
      }
    }
    function prev(useCircular = false) {
      to(useCircular ? getCircleIndex(-1) : index.value - 1);
    }
    function next(useCircular = false) {
      to(useCircular ? getCircleIndex(1) : index.value + 1);
    }
    function getCircleIndex(step2) {
      const length = $items.length;
      return (index.value + length + step2 % length) % length;
    }
    function updateSwipeLoop(offset) {
      if (!circular) {
        return;
      }
      const slideIndex = index.value;
      const lastIndex = getLastIndex();
      const itemCount = lastIndex + 1;
      $items.forEach(($item, index2) => {
        if (offset != null && offset < 0) {
          if (slideIndex === 0 && index2 === lastIndex) {
            $item.style.transform = getTransformStyleValue(-itemSize * itemCount);
          } else {
            $item.style.transform = "";
          }
        } else if (offset != null && offset > 0) {
          if (slideIndex === lastIndex && index2 === 0) {
            $item.style.transform = getTransformStyleValue(itemSize * itemCount);
          } else {
            $item.style.transform = "";
          }
        } else {
          if (slideIndex === 0 && index2 === lastIndex) {
            $item.style.transform = getTransformStyleValue(-itemSize * itemCount);
          } else if (slideIndex === lastIndex && index2 === 0) {
            $item.style.transform = getTransformStyleValue(itemSize * itemCount);
          } else {
            $item.style.transform = "";
          }
        }
      });
      if (offset == null) {
        updateListStyle(-itemSize * slideIndex);
      }
    }
    function getLastIndex() {
      return $items.length - 1;
    }
    function getTransformStyleValue(size) {
      return "translate3d(" + (direction === "x" ? size + "px, 0px, 0px" : "0px, " + size + "px, 0px") + ")";
    }
    function updateListStyle(transSize, duration = 0) {
      const listStyle = listEl.value.style;
      listStyle.transitionDuration = duration + "ms";
      listStyle.transform = getTransformStyleValue(transSize);
      prevTranSize = transSize;
    }
    function onBeforeSlide(toIndex, fromIndex) {
      if (toIndex !== fromIndex) {
        emit("update:activeIndex", toIndex);
        emit("change", toIndex, fromIndex);
      }
      index.value = toIndex;
    }
    function onSlide(toIndex, fromIndex) {
      emit("animated", toIndex, fromIndex);
    }
    function onClick(e) {
      if (!horizontal) {
        emit("click", e);
      }
    }
    function to(toIndex, animated = true) {
      const lastIndex = getLastIndex();
      let slideIndex = toIndex;
      if (lastIndex < 0) {
        return;
      }
      if (toIndex >= 0 && toIndex <= lastIndex && toIndex != index.value) {
        slide(toIndex, slideIndex, animated);
      } else {
        if (circular) {
          if (toIndex < 0) {
            slideIndex = -1;
            toIndex = lastIndex;
          } else if (toIndex > lastIndex) {
            slideIndex = lastIndex + 1;
            toIndex = 0;
          }
        } else {
          toIndex = index.value;
        }
        slide(toIndex, slideIndex, animated);
      }
    }
    let playing = false;
    let durationTimer;
    function slide(toIndex, slideIndex, animated = true) {
      if (itemSize === 0 || playing) {
        return;
      }
      if (!circular) {
        slideIndex = toIndex;
      }
      playing = true;
      const fromIndex = index.value;
      const transSize = -itemSize * slideIndex;
      const transSizeOffset = prevTranSize - transSize;
      if (fromIndex !== slideIndex) {
        updateSwipeLoop(transSizeOffset);
      }
      onBeforeSlide(toIndex, fromIndex);
      let duration = props.duration;
      if (duration == null) {
        duration = Math.abs(transSizeOffset);
        duration = Math.max(100, Math.min(800, duration));
      }
      if (animated === false) {
        duration = 0;
      }
      updateListStyle(transSize, duration);
      clearTimeout(durationTimer);
      durationTimer = window.setTimeout(() => {
        updateListStyle(transSize, 0);
        animateDone(transSize, toIndex, fromIndex, 0);
      }, duration);
    }
    function animateDone(transSize, toIndex, fromIndex, frameNumber) {
      durationTimer = requestAnimationFrame(() => {
        const transform = window.getComputedStyle(listEl.value).transform;
        const currentSize = transform.slice(7, transform.length - 1).split(", ")[direction === "y" ? 5 : 4];
        if (parseFloat(currentSize).toFixed(2) === transSize.toFixed(2) || frameNumber > 0) {
          playing = false;
          onSlide(toIndex, fromIndex);
          updateSwipeLoop();
        } else {
          animateDone(transSize, toIndex, fromIndex, ++frameNumber);
        }
      });
    }
    let isFirst = true;
    function resetItems(res) {
      $items = res;
      setSlideStyle();
      const last = getLastIndex();
      if (isFirst) {
        isFirst = false;
        if (props.activeIndex !== 0) {
          swipeTo(props.activeIndex);
        }
      } else if (index.value > last) {
        to(last);
      }
    }
    function setSlideStyle() {
      if (!root.value || !listEl.value) {
        return;
      }
      const sizeName = directionGroup[2];
      const _itemSize = root.value["client" + sizeName];
      if (_itemSize === 0) {
        return;
      }
      itemSize = _itemSize;
      root.value.style["overflow" + directionGroup[0]] = "hidden";
      listEl.value.style.cssText = CSSProperties2CssText({
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 1e3,
        [sizeName.toLowerCase()]: itemSize * $items.length + "px",
        transition: "transform 0ms ease-out"
      });
      updateListStyle(-itemSize * index.value);
      pagination.value = [];
      $items.forEach(($item, i) => {
        $item.dataset.index = i.toString();
        let cssText = `${sizeName.toLowerCase()}: ${itemSize}px;`;
        if (direction === "x") {
          cssText += "float: left;";
        }
        $item.style.cssText = cssText;
        pagination.value.push(i);
      });
    }
    let autoplayTimer;
    function start() {
      stop();
      props.autoplay && (autoplayTimer = window.setInterval(() => {
        to(getCircleIndex(1));
      }, props.interval));
    }
    function stop() {
      clearTimeout(autoplayTimer);
    }
    function getItemEl(index2) {
      return $items[index2] || null;
    }
    const { listEl, update } = useList("swiper", resetItems);
    useResizeObserver(root, () => update(50));
    let coords;
    let inMove = false;
    useTouch({
      el: root,
      onTouchStart(e) {
        if (e.target.tagName === "IMG") {
          e.target.ondragstart = function() {
            return false;
          };
        }
        if (playing) {
          return;
        }
        stop();
        inMove = true;
        horizontal = null;
        coords = {
          startX: e.touchObject.pageX,
          startY: e.touchObject.pageY,
          stopX: e.touchObject.pageX,
          stopY: e.touchObject.pageY,
          timeStamp: e.timeStamp,
          offset: null
        };
      },
      onTouchMove(e) {
        if (!inMove || !coords) {
          return;
        }
        coords.stopX = e.touchObject.pageX;
        coords.stopY = e.touchObject.pageY;
        let offsetX = coords.startX - coords.stopX;
        let offsetY = coords.startY - coords.stopY;
        if (direction === "y") {
          offsetX = [offsetY, offsetY = offsetX][0];
        }
        const absX = Math.abs(offsetX);
        const absY = Math.abs(offsetY);
        if (horizontal === null) {
          if (offsetX !== 0) {
            e.preventDefault();
          }
        } else {
          if (absX > absY) {
            horizontal = true;
            if (offsetX !== 0) {
              e.preventDefault();
            }
          } else {
            coords = null;
            horizontal = false;
            return;
          }
        }
        const active = index.value;
        let transSize = active * itemSize;
        if (!circular && (active === 0 && offsetX < 0 || active === getLastIndex() && offsetX > 0)) {
          transSize += props.bounces ? getStretchOffset2(offsetX) : 0;
        } else {
          transSize += offsetX;
        }
        if (absX < itemSize) {
          if (coords.offset == null || offsetX > 0 !== coords.offset) {
            updateSwipeLoop(offsetX);
            coords.offset = offsetX > 0;
          }
          updateListStyle(-transSize);
        }
      },
      onTouchEnd(e) {
        if (!inMove) {
          return;
        }
        inMove = false;
        if (coords) {
          const offsetX = direction === "x" ? coords.startX - coords.stopX : coords.startY - coords.stopY;
          let absX = Math.abs(offsetX);
          const active = index.value;
          let transIndex;
          if (!isNaN(absX) && absX !== 0) {
            if (absX > itemSize) {
              absX = itemSize;
            }
            if (absX >= 80 || e.timeStamp - coords.timeStamp < 200) {
              if (offsetX > 0) {
                transIndex = active + 1;
              } else {
                transIndex = active - 1;
              }
            } else {
              transIndex = active;
            }
            to(transIndex);
            coords = null;
          }
        }
        start();
      }
    });
    watch20(() => props.activeIndex, (val) => swipeTo(val));
    watch20([() => props.autoplay, () => props.interval], () => {
      start();
    });
    onMounted21(() => {
      start();
    });
    onBeforeUnmount13(() => {
      clearTimeout(durationTimer);
      stop();
      $items = [];
    });
    provide11("disableFixed", true);
    return {
      root,
      listEl,
      swipeTo,
      prev,
      next,
      onClick,
      index,
      pagination,
      update,
      getItemEl,
      LeftOutlined: _sfc_script6,
      RightOutlined: _sfc_script25,
      classes,
      indicatorsClasses,
      getPaginationItemClasses,
      getPaginationItemStyles
    };
  }
});
var _hoisted_154 = {
  class: "ak-swiper_list",
  ref: "listEl"
};
function render73(_ctx, _cache) {
  const _component_Icon = _resolveComponent36("Icon");
  return _openBlock72(), _createElementBlock62("div", {
    class: _normalizeClass34(_ctx.classes),
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    ref: "root"
  }, [
    _createElementVNode47("div", _hoisted_154, [
      _renderSlot31(_ctx.$slots, "default")
    ], 512),
    _ctx.indicatorDots ? (_openBlock72(), _createElementBlock62("div", {
      key: 0,
      class: _normalizeClass34(_ctx.indicatorsClasses)
    }, [
      (_openBlock72(true), _createElementBlock62(_Fragment11, null, _renderList11(_ctx.pagination, (item) => {
        return _openBlock72(), _createElementBlock62("span", {
          key: item,
          class: _normalizeClass34(["ak-swiper_indicator", _ctx.getPaginationItemClasses(item, _ctx.index)]),
          style: _normalizeStyle16(_ctx.getPaginationItemStyles({ indicatorActiveColor: _ctx.indicatorActiveColor, indicatorColor: _ctx.indicatorColor }, item, _ctx.index))
        }, null, 6);
      }), 128))
    ], 2)) : _createCommentVNode30("v-if", true),
    _ctx.navigationButtons && _ctx.pagination.length > 1 ? (_openBlock72(), _createElementBlock62(_Fragment11, { key: 1 }, [
      _createElementVNode47("button", {
        class: "ak-swiper_prev",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.prev(true))
      }, [
        _createVNode24(_component_Icon, { icon: _ctx.LeftOutlined }, null, 8, ["icon"])
      ]),
      _createElementVNode47("button", {
        class: "ak-swiper_next",
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.next(true))
      }, [
        _createVNode24(_component_Icon, { icon: _ctx.RightOutlined }, null, 8, ["icon"])
      ])
    ], 64)) : _createCommentVNode30("v-if", true)
  ], 2);
}
_sfc_script74.render = render73;
_sfc_script74.__file = "packages/ui/src/Swiper/Swiper.vue";

// vue:./SwiperItem.vue
import { ref as ref29, defineComponent as defineComponent58 } from "vue";
import { renderSlot as _renderSlot32, openBlock as _openBlock73, createElementBlock as _createElementBlock63 } from "vue";
var _sfc_script75 = defineComponent58({
  name: "ak-swiper-item",
  setup() {
    const root = ref29();
    useListItem("swiper");
    return {
      root
    };
  }
});
var _hoisted_155 = {
  class: "ak-swiper-item",
  ref: "root"
};
function render74(_ctx, _cache) {
  return _openBlock73(), _createElementBlock63("div", _hoisted_155, [
    _renderSlot32(_ctx.$slots, "default")
  ], 512);
}
_sfc_script75.render = render74;
_sfc_script75.__file = "packages/ui/src/Swiper/SwiperItem.vue";

// packages/ui/src/Swiper/index.ts
var Swiper_default = _sfc_script74;
var install52 = multiWithInstall(_sfc_script74, [_sfc_script75]);

// packages/ui/src/ImagePreview/util.ts
var mergeLoadedData = (old, {
  width,
  height
}) => {
  const image = cloneData(old);
  const { clientWidth } = document.documentElement;
  if (width > clientWidth) {
    image.width = clientWidth;
    image.height = height * (clientWidth / width);
  } else {
    image.width = width;
    image.height = height;
  }
  image.naturalWidth = width;
  image.naturalHeight = height;
  image.initialWidth = image.width;
  image.initialHeight = image.height;
  image.loaded = true;
  return image;
};
function getDistance(p1, p2) {
  const x = p2.pageX - p1.pageX;
  const y = p2.pageY - p1.pageY;
  return Math.sqrt(x * x + y * y);
}
function getImageStyles(item) {
  return {
    width: item.width + "px",
    height: item.height + "px",
    marginLeft: item.offsetLeft + "px",
    marginTop: item.offsetTop + "px"
  };
}

// vue:./ImagePreview.vue
import { createElementVNode as _createElementVNode48, renderList as _renderList12, Fragment as _Fragment12, openBlock as _openBlock74, createElementBlock as _createElementBlock64, resolveComponent as _resolveComponent37, normalizeClass as _normalizeClass35, normalizeStyle as _normalizeStyle17, createVNode as _createVNode25, withCtx as _withCtx16, createBlock as _createBlock30, createCommentVNode as _createCommentVNode31, toDisplayString as _toDisplayString26, renderSlot as _renderSlot33, withModifiers as _withModifiers2, mergeProps as _mergeProps7, Teleport as _Teleport5 } from "vue";
var _sfc_script76 = defineComponent59({
  name: "ak-image-preview",
  components: { Button: _sfc_script4, Swiper: _sfc_script74, SwiperItem: _sfc_script75, Image: _sfc_script17 },
  props: {
    ...popupProps,
    urls: {
      type: Array,
      validator: (val) => isStringArray(val),
      required: true
    },
    current: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: false
    },
    navigationButtons: {
      type: Boolean,
      default: false
    },
    imageHighRendering: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    ...popupEmits,
    "update:current": (current) => isString(current),
    change: (current, index, fromIndex) => isString(current) && isNumber(index) && isNumber(fromIndex)
  },
  setup(props, ctx) {
    const { emit } = ctx;
    const activeIndex = ref30(0);
    const images2 = reactive4([]);
    const zoomAnimated = ref30(false);
    const swiperInit = ref30(false);
    const popup = usePopup(props, ctx, {});
    let coords;
    function onImageTouchStart(e, item) {
      zoomAnimated.value = false;
      if (e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        coords = {
          start: {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
          },
          start2: {
            pageX: e.touches[1].pageX,
            pageY: e.touches[1].pageY
          },
          image: {
            width: item.width,
            height: item.height
          },
          inZoom: true
        };
      } else {
        const { clientWidth, clientHeight } = document.documentElement;
        if (item.width <= clientWidth && item.height <= clientHeight) {
        } else {
          coords = {
            start: {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY
            },
            scroll: {
              top: (item.height - clientHeight) / 2 - item.offsetTop,
              left: (item.width - clientWidth) / 2 - item.offsetLeft,
              maxTop: item.height - clientHeight,
              maxLeft: item.width - clientWidth
            }
          };
        }
      }
    }
    function onImageTouchMove(e, item) {
      if (!coords) {
        return;
      }
      if (coords.inZoom) {
        if (!coords.inZoomEnd) {
          coords.hasZoom = true;
          const scale = getDistance(e.touches[0], e.touches[1]) / getDistance(coords.start, coords.start2);
          item.width = coords.image.width * scale;
          item.height = coords.image.height * scale;
        } else {
        }
        e.preventDefault();
        e.stopPropagation();
      } else {
        const touch = e.touches[0];
        const scroll = coords.scroll;
        const offsetX = coords.start.pageX - touch.pageX;
        const offsetY = coords.start.pageY - touch.pageY;
        if (!coords.inMove) {
          const verticalMove = Math.abs(offsetY) > Math.abs(offsetX);
          if (verticalMove && offsetY > 0 && scroll.top < scroll.maxTop || verticalMove && offsetY < 0 && scroll.top > 0 || !verticalMove && offsetX > 0 && scroll.left < scroll.maxLeft || !verticalMove && offsetX < 0 && scroll.left > 0) {
            coords.inMove = true;
          }
        }
        if (coords.inMove) {
          const { offsetTop, offsetLeft } = getUpdateOffset({
            top: Math.max(0, Math.min(scroll.maxTop, scroll.top + offsetY)),
            left: Math.max(0, Math.min(scroll.maxLeft, scroll.left + offsetX)),
            isScrollValue: true
          }, item);
          item.offsetTop = offsetTop;
          item.offsetLeft = offsetLeft;
          e.preventDefault();
          e.stopPropagation();
        } else {
          coords = null;
        }
      }
    }
    function onImageTouchEnd(e, item) {
      if (!coords) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (coords.hasZoom) {
        zoomAnimated.value = true;
        if (item.width < item.initialWidth) {
          item.width = item.initialWidth;
        } else if (item.width > item.naturalWidth) {
          item.width = item.naturalWidth;
        }
        if (item.height < item.initialHeight) {
          item.height = item.initialHeight;
        } else if (item.height > item.naturalHeight) {
          item.height = item.naturalHeight;
        }
        const { offsetTop, offsetLeft } = getUpdateOffset({
          top: item.offsetTop,
          left: item.offsetLeft,
          isScrollValue: false
        }, item);
        item.offsetTop = offsetTop;
        item.offsetLeft = offsetLeft;
      }
      if (e.touches.length > 0) {
        coords.inZoomEnd = true;
      } else {
        coords = null;
      }
    }
    function getUpdateOffset({
      top,
      left,
      isScrollValue
    }, item) {
      const { clientHeight, clientWidth } = document.documentElement;
      let offsetTop;
      let offsetLeft;
      if (item.height <= clientHeight) {
        offsetTop = 0;
      } else {
        const diff = (item.height - clientHeight) / 2;
        offsetTop = rangeNumber(isScrollValue ? diff - top : top, -diff, diff);
      }
      if (item.width <= clientWidth) {
        offsetLeft = 0;
      } else {
        const diff = (item.width - clientWidth) / 2;
        offsetLeft = rangeNumber(isScrollValue ? diff - left : left, -diff, diff);
      }
      return {
        offsetTop,
        offsetLeft
      };
    }
    function updateCurrent(val) {
      let hasUrl = false;
      for (let i = 0, len = images2.length; i < len; i++) {
        if (images2[i].src === val) {
          if (activeIndex.value !== i) {
            activeIndex.value = i;
          }
          hasUrl = true;
          break;
        }
      }
      if (!hasUrl && images2[0]) {
        activeIndex.value = 0;
        emit("update:current", images2[0].src);
      }
    }
    function onSwiperAnimated() {
      images2.forEach((item, index) => {
        if (index !== activeIndex.value) {
          item.width = item.initialWidth;
          item.height = item.initialHeight;
          item.offsetTop = 0;
          item.offsetLeft = 0;
        }
      });
    }
    const onSwiperChange = (index, fromIndex) => {
      const current = props.urls[index];
      emit("update:current", current);
      emit("change", current, index, fromIndex);
    };
    function onPreviewClick() {
      popup.customCancel("previewClick");
    }
    const onImageLoad = (res) => {
      if (props.imageHighRendering) {
        const dpr = window.devicePixelRatio || 1;
        res.width = res.width / dpr;
        res.height = res.height / dpr;
      }
      for (let i = 0; i < images2.length; i++) {
        const image = images2[i];
        if (image.src === res.src) {
          images2[i] = mergeLoadedData(image, res);
        }
      }
    };
    watch21(() => props.urls, () => {
      const map = {};
      images2.forEach((v) => {
        map[v.src] = v;
      });
      images2.length = 0;
      props.urls.forEach((url) => {
        if (map[url]) {
          images2.push(map[url]);
        } else {
          images2.push({
            src: url,
            width: 0,
            height: 0,
            initialWidth: 0,
            initialHeight: 0,
            naturalWidth: 0,
            naturalHeight: 0,
            offsetTop: 0,
            offsetLeft: 0,
            loaded: false
          });
        }
      });
    }, {
      immediate: true,
      deep: true
    });
    watch21(() => props.current, (val) => updateCurrent(val), {
      immediate: true
    });
    watch21(popup.isShow, () => {
      swiperInit.value = true;
    });
    return {
      ...popup,
      swiperInit,
      activeIndex,
      images: images2,
      zoomAnimated,
      updateCurrent,
      onImageTouchStart,
      onImageTouchMove,
      onImageTouchEnd,
      onSwiperAnimated,
      onSwiperChange,
      onPreviewClick,
      onImageLoad,
      CloseOutlined: _sfc_script9,
      getImageStyles
    };
  }
});
var _hoisted_156 = /* @__PURE__ */ _createElementVNode48("div", { class: "ak-mask" }, null, -1);
var _hoisted_241 = { class: "ak-preview-image_image-container" };
var _hoisted_334 = { class: "ak-preview-image_pagination" };
var _hoisted_413 = { class: "ak-preview-image_close" };
function render75(_ctx, _cache) {
  const _component_Image = _resolveComponent37("Image");
  const _component_SwiperItem = _resolveComponent37("SwiperItem");
  const _component_Swiper = _resolveComponent37("Swiper");
  const _component_Button = _resolveComponent37("Button");
  return _openBlock74(), _createBlock30(_Teleport5, { to: "body" }, [
    _createElementVNode48("div", _mergeProps7({
      class: ["ak-preview-image", _ctx.popupClasses],
      style: _ctx.popupStyles
    }, _ctx.$attrs), [
      _hoisted_156,
      _ctx.swiperInit ? (_openBlock74(), _createBlock30(_component_Swiper, {
        key: 0,
        activeIndex: _ctx.activeIndex,
        "onUpdate:activeIndex": _cache[0] || (_cache[0] = ($event) => _ctx.activeIndex = $event),
        "navigation-buttons": _ctx.navigationButtons,
        onClick: _ctx.onPreviewClick,
        onChange: _ctx.onSwiperChange,
        onAnimated: _ctx.onSwiperAnimated
      }, {
        default: _withCtx16(() => [
          (_openBlock74(true), _createElementBlock64(_Fragment12, null, _renderList12(_ctx.images, (item, index) => {
            return _openBlock74(), _createBlock30(_component_SwiperItem, { key: index }, {
              default: _withCtx16(() => [
                _createElementVNode48("div", _hoisted_241, [
                  _createVNode25(_component_Image, {
                    src: item.src,
                    mode: "aspectFit",
                    onLoad: _ctx.onImageLoad,
                    class: _normalizeClass35({ animated: _ctx.zoomAnimated }),
                    style: _normalizeStyle17(_ctx.getImageStyles(item)),
                    onTouchstart: ($event) => _ctx.onImageTouchStart($event, item),
                    onTouchmove: ($event) => _ctx.onImageTouchMove($event, item),
                    onTouchend: ($event) => _ctx.onImageTouchEnd($event, item)
                  }, null, 8, ["src", "onLoad", "class", "style", "onTouchstart", "onTouchmove", "onTouchend"])
                ])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        _: 1
      }, 8, ["activeIndex", "navigation-buttons", "onClick", "onChange", "onAnimated"])) : _createCommentVNode31("v-if", true),
      _createElementVNode48("div", _hoisted_334, _toDisplayString26(_ctx.activeIndex + 1) + " / " + _toDisplayString26(_ctx.urls.length), 1),
      _createElementVNode48("div", _hoisted_413, [
        _renderSlot33(_ctx.$slots, "close", { activeIndex: _ctx.activeIndex }, () => [
          _ctx.showClose ? (_openBlock74(), _createBlock30(_component_Button, {
            key: 0,
            onClick: _withModifiers2(_ctx.onCloseClick, ["stop"]),
            icon: _ctx.CloseOutlined,
            size: "large",
            pattern: "borderless",
            shape: "square",
            ghost: true
          }, null, 8, ["onClick", "icon"])) : _createCommentVNode31("v-if", true)
        ])
      ])
    ], 16)
  ]);
}
_sfc_script76.render = render75;
_sfc_script76.__file = "packages/ui/src/ImagePreview/ImagePreview.vue";

// packages/ui/src/ImagePreview/index.ts
var showImagePreview = createShowPopup({
  apiName: "showImagePreview",
  component: _sfc_script76,
  createHook: createConfirmHook
});
var ImagePreview_default = _sfc_script76;
var install53 = withInstall(_sfc_script76);

// vue:./ImageUploader.vue
import { defineComponent as defineComponent62, reactive as reactive6, computed as computed36, watch as watch23, ref as ref32 } from "vue";

// vue:./Order.vue
import {
  defineComponent as defineComponent60,
  ref as ref31,
  reactive as reactive5,
  onMounted as onMounted22,
  nextTick as nextTick8,
  watch as watch22,
  onBeforeUnmount as onBeforeUnmount14,
  onBeforeMount,
  computed as computed35
} from "vue";

// vue:./DeleteOutlined.vue
import { createElementVNode as _createElementVNode49, openBlock as _openBlock75, createElementBlock as _createElementBlock65 } from "vue";
var _sfc_script77 = {};
var _hoisted_157 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_242 = /* @__PURE__ */ _createElementVNode49("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" }, null, -1);
var _hoisted_335 = [
  _hoisted_242
];
function render76(_ctx, _cache) {
  return _openBlock75(), _createElementBlock65("svg", _hoisted_157, _hoisted_335);
}
_sfc_script77.render = render76;
_sfc_script77.__file = "packages/ui/src/Icon/icons/DeleteOutlined/DeleteOutlined.vue";

// packages/ui/src/Order/util.ts
var getClasses12 = (dragOn) => ["ak-order", { drag: dragOn }];
var getStyles4 = (orderHeight) => ({
  height: orderHeight + "px"
});
var getItemClasses4 = (item, index, dragCurrent, dragFixed) => [
  "ak-order_item",
  {
    current: dragCurrent === index,
    deleted: item.deleted,
    fixed: dragFixed === index
  }
];
var getItemStyles2 = (item, colNum) => ({
  left: item.left + "px",
  top: item.top + "px",
  width: 1 / colNum * 100 + "%"
});
var getItemRatioStyles = (aspectRatio) => ({
  paddingTop: getNumber(aspectRatio, 1) * 100 + "%"
});

// vue:./Order.vue
import { renderList as _renderList13, Fragment as _Fragment13, openBlock as _openBlock76, createElementBlock as _createElementBlock66, normalizeStyle as _normalizeStyle18, createElementVNode as _createElementVNode50, renderSlot as _renderSlot34, normalizeClass as _normalizeClass36, mergeProps as _mergeProps8, resolveComponent as _resolveComponent38, createVNode as _createVNode26, toDisplayString as _toDisplayString27, withCtx as _withCtx17 } from "vue";
var itemsValidator = (items) => {
  return Array.isArray(items) && items.filter((item) => {
    return !(item && isStringNumberMix(item.id));
  }).length === 0;
};
var _sfc_script78 = defineComponent60({
  name: "ak-order",
  components: { Icon: _sfc_script2, Drawer: _sfc_script10 },
  props: {
    items: {
      type: Array,
      validator: itemsValidator,
      required: true,
      default: () => []
    },
    columnNumber: {
      type: Number,
      default: 3
    },
    deletable: {
      type: Boolean,
      default: false
    },
    aspectRatio: {
      type: Number,
      default: 1
    }
  },
  emits: {
    "update:items": itemsValidator,
    delete: (payload) => payload && typeof isNumber(payload.index) && payload.item && isStringNumberMix(payload.item.id)
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const root = ref31();
    const deleteButtonEl = ref31();
    const positions = reactive5([]);
    const dragOn = ref31(false);
    const dragCurrent = ref31(-1);
    const dragDelete = ref31(false);
    const dragFixed = ref31(-1);
    const deleting = ref31(false);
    const orderHeight = ref31(0);
    const drag = {
      on: false,
      current: -1,
      deletable: false
    };
    const imgsMode = {
      itemSize: 0,
      sort: [],
      size: 0,
      moveShift: -1,
      shift: -1,
      moveSort: null
    };
    let deleteAreaY = 0;
    let onTimer;
    function getNewIndex(sort, index) {
      let newIndex = index;
      for (let i = 0; i < sort.length; i++) {
        if (sort[i] === index) {
          newIndex = i;
          break;
        }
      }
      return newIndex;
    }
    function enterDrag(targetObject) {
      const index = drag.current;
      if (index === -1 || positions.length <= 1) {
        return;
      }
      imgsMode.size = positions.length;
      drag.targetObject = targetObject;
      drag.on = true;
      dragOn.value = true;
      dragFixed.value = index;
      dragCurrent.value = index;
      dragDelete.value = !!props.deletable;
      positions[index].left = positions[index].left + targetObject.fixedOffsetX;
      positions[index].top = positions[index].top + targetObject.fixedOffsetY;
      imgsMode.shift = getNewIndex(imgsMode.sort, index);
    }
    let lazyTimer;
    function exitDragDone(callback) {
      lazyTimer = window.setTimeout(() => {
        callback();
        drag.on = false;
      }, 220);
    }
    function exitDrag() {
      const end = () => {
        dragOn.value = false;
        dragCurrent.value = -1;
        dragDelete.value = false;
        deleting.value = false;
        delete drag.targetObject;
        imgsMode.size = 0;
        imgsMode.shift = -1;
      };
      const restoreFixed = (index, left, top) => {
        addClassName(root.value, "forbid-animation");
        positions[index].left = left;
        positions[index].top = top;
        dragFixed.value = -1;
      };
      if (dragOn.value) {
        const sort = imgsMode.sort;
        const index = drag.current;
        const targetObject = drag.targetObject;
        if (dragDelete.value && deleting.value) {
          let currentPosition = null;
          for (let i = 0; i < sort.length; i++) {
            if (sort[i] === index) {
              positions[sort[i]].deleted = true;
              currentPosition = positions[sort[i]];
              sort.splice(i, 1);
              break;
            }
          }
          sort.forEach((v, k) => {
            positions[v].left = getItemPos(k).left;
            positions[v].top = getItemPos(k).top;
          });
          imgsMode.moveSort = null;
          imgsMode.moveShift = -1;
          if (currentPosition) {
            emit("delete", {
              type: "delete",
              index,
              item: {
                id: currentPosition.id
              }
            });
          }
          exitDragDone(() => {
            dragFixed.value = -1;
            updateOrderHeight();
            updateOptions();
          });
        } else if (imgsMode.moveShift !== -1 && imgsMode.moveSort != null) {
          const newIndex = getNewIndex(imgsMode.moveSort, index);
          const { left, top } = getItemPos(newIndex);
          positions[index].left = left + targetObject.fixedOffsetX;
          positions[index].top = top + targetObject.fixedOffsetY;
          dragCurrent.value = -1;
          imgsMode.sort = imgsMode.moveSort;
          imgsMode.moveSort = null;
          imgsMode.moveShift = -1;
          exitDragDone(() => {
            restoreFixed(index, left, top);
            updateOptions();
          });
        } else {
          const newIndex = getNewIndex(sort, index);
          const { left, top } = getItemPos(newIndex);
          positions[index].left = left + targetObject.fixedOffsetX;
          positions[index].top = top + targetObject.fixedOffsetY;
          exitDragDone(() => {
            restoreFixed(index, left, top);
          });
        }
        end();
      }
    }
    function updateOptions() {
      setTimeout(() => {
        const newOptions = imgsMode.sort.map((v) => {
          return props.items[v];
        });
        emit("update:items", newOptions);
      }, 250);
    }
    function getItemPos(index) {
      return {
        left: index % props.columnNumber * imgsMode.itemSize,
        top: Math.floor(index / props.columnNumber) * imgsMode.itemSize
      };
    }
    let max = Infinity;
    function updateItemsData() {
      if (!root.value) {
        return;
      }
      imgsMode.itemSize = root.value.offsetWidth / props.columnNumber;
      imgsMode.sort = [];
      max = Infinity;
      positions.splice(0, Infinity);
      props.items.forEach((v, k) => {
        const position = Object.assign({
          id: v.id,
          deleted: false,
          draggable: !(v.draggable === false)
        }, getItemPos(k));
        positions.push(position);
        imgsMode.sort.push(k);
        if (!position.draggable && max === Infinity) {
          max = k - 1;
        }
      });
      nextTick8(() => {
        updateOrderHeight();
      });
    }
    function updateOrderHeight() {
      if (!root.value || drag.on) {
        return;
      }
      orderHeight.value = Math.max(...[].slice.call(root.value.children, 0).map((child) => child.offsetHeight)) * Math.ceil(imgsMode.sort.length / props.columnNumber);
    }
    const onVisibleStateChange = (e) => {
      if (e.state === "shown") {
        const rects = deleteButtonEl.value.getClientRects()[0];
        deleteAreaY = rects.top;
      }
    };
    useTouch({
      el: root,
      onTouchStart(e) {
        const target = getParentTarget(e.target, "ak-order_item");
        if (!target || drag.on) {
          return;
        }
        const index = parseInt(target.dataset.index);
        const rects = target.getClientRects()[0];
        const position = positions[index];
        if (position.draggable === false) {
          return;
        }
        removeClassName(root.value, "forbid-animation");
        const targetObject = {
          id: position.id,
          index,
          startX: e.touchObject.pageX,
          startY: e.touchObject.pageY,
          left: position.left,
          top: position.top,
          height: target.offsetHeight,
          fixedOffsetX: rects.left - position.left,
          fixedOffsetY: rects.top - position.top,
          rectBottom: rects.bottom
        };
        drag.current = index;
        drag.targetObject = targetObject;
        clearTimeout(onTimer);
        onTimer = window.setTimeout(() => {
          if (drag.targetObject && drag.targetObject.id === targetObject.id) {
            enterDrag(targetObject);
          }
        }, 500);
      },
      onTouchMove(e) {
        if (!dragOn.value || !drag.targetObject) {
          clearTimeout(onTimer);
          return;
        }
        const targetObject = drag.targetObject;
        const index = targetObject.index;
        const moveX = e.touchObject.pageX - targetObject.startX;
        const moveY = e.touchObject.pageY - targetObject.startY;
        const left = targetObject.left + moveX;
        const top = targetObject.top + moveY;
        const itemSize = imgsMode.itemSize;
        const sort = cloneData(imgsMode.sort);
        deleting.value = targetObject.rectBottom + moveY + 2 > deleteAreaY;
        const shift = rangeNumber(Math.round(top / itemSize) * 3 + Math.round(left / itemSize), 0, max);
        if (imgsMode.moveShift > 0 && imgsMode.moveShift != shift || imgsMode.shift != shift) {
          sort.splice(imgsMode.shift, 1);
          sort.splice(shift, 0, index);
          const tempPoss = new Array(sort.length);
          sort.forEach((v, k) => {
            tempPoss[v] = getItemPos(k);
          });
          tempPoss[index].left = left + targetObject.fixedOffsetX;
          tempPoss[index].top = top + targetObject.fixedOffsetY;
          positions.forEach((v, k) => {
            if (tempPoss[k]) {
              v.left = tempPoss[k].left;
              v.top = tempPoss[k].top;
            }
          });
          imgsMode.moveShift = shift;
          imgsMode.moveSort = sort;
        } else {
          positions[index].left = left + targetObject.fixedOffsetX;
          positions[index].top = top + targetObject.fixedOffsetY;
        }
      },
      onTouchEnd() {
        clearTimeout(onTimer);
        if (dragOn.value) {
          exitDrag();
        }
      }
    });
    watch22(() => props.items, updateItemsData, {
      deep: true
    });
    onBeforeMount(() => {
      deleteAreaY = document.documentElement.clientHeight;
    });
    onMounted22(() => {
      updateItemsData();
    });
    onBeforeUnmount14(() => {
      clearTimeout(onTimer);
      clearTimeout(lazyTimer);
    });
    const classes = computed35(() => getClasses12(dragOn.value));
    const styles = computed35(() => getStyles4(orderHeight.value));
    return {
      root,
      deleteButtonEl,
      dragOn,
      dragCurrent,
      dragDelete,
      dragFixed,
      deleting,
      orderHeight,
      positions,
      onVisibleStateChange,
      locale,
      DeleteOutlined: _sfc_script77,
      classes,
      styles,
      getItemClasses: getItemClasses4,
      getItemStyles: getItemStyles2,
      getItemRatioStyles
    };
  }
});
var _hoisted_158 = ["data-index"];
var _hoisted_243 = { class: "ak-order_item-inner" };
var _hoisted_336 = {
  class: "ak-order_delete-button",
  ref: "deleteButtonEl"
};
function render77(_ctx, _cache) {
  const _component_Icon = _resolveComponent38("Icon");
  const _component_Drawer = _resolveComponent38("Drawer");
  return _openBlock76(), _createElementBlock66(_Fragment13, null, [
    _createElementVNode50("div", _mergeProps8({
      class: _ctx.classes,
      style: _ctx.styles
    }, _ctx.$attrs, { ref: "root" }), [
      (_openBlock76(true), _createElementBlock66(_Fragment13, null, _renderList13(_ctx.positions, (item, index) => {
        return _openBlock76(), _createElementBlock66("div", {
          class: _normalizeClass36(_ctx.getItemClasses(item, index, _ctx.dragCurrent, _ctx.dragFixed)),
          style: _normalizeStyle18(_ctx.getItemStyles(item, _ctx.columnNumber)),
          "data-index": index,
          key: item.id
        }, [
          _createElementVNode50("span", {
            class: "ak-order_item-ratio",
            style: _normalizeStyle18(_ctx.getItemRatioStyles(_ctx.aspectRatio))
          }, null, 4),
          _createElementVNode50("div", _hoisted_243, [
            _renderSlot34(_ctx.$slots, "default", {
              id: item.id,
              index
            })
          ])
        ], 14, _hoisted_158);
      }), 128))
    ], 16),
    _createVNode26(_component_Drawer, {
      class: "ak-order_delete",
      placement: "bottom",
      visible: _ctx.dragDelete,
      showMask: false,
      onVisibleStateChange: _ctx.onVisibleStateChange
    }, {
      default: _withCtx17(() => [
        _createElementVNode50("div", _hoisted_336, [
          _createVNode26(_component_Icon, { icon: _ctx.DeleteOutlined }, null, 8, ["icon"]),
          _createElementVNode50("span", null, _toDisplayString27(_ctx.deleting ? _ctx.locale.orderDeleteButtonActiveText : _ctx.locale.orderDeleteButtonText), 1)
        ], 512)
      ]),
      _: 1
    }, 8, ["visible", "onVisibleStateChange"])
  ], 64);
}
_sfc_script78.render = render77;
_sfc_script78.__file = "packages/ui/src/Order/Order.vue";

// packages/ui/src/Order/index.ts
var install54 = withInstall(_sfc_script78);
var Order_default = _sfc_script78;

// vue:./PlusOutlined.vue
import { createElementVNode as _createElementVNode51, openBlock as _openBlock77, createElementBlock as _createElementBlock67 } from "vue";
var _sfc_script79 = {};
var _hoisted_159 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_244 = /* @__PURE__ */ _createElementVNode51("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }, null, -1);
var _hoisted_337 = /* @__PURE__ */ _createElementVNode51("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" }, null, -1);
var _hoisted_414 = [
  _hoisted_244,
  _hoisted_337
];
function render78(_ctx, _cache) {
  return _openBlock77(), _createElementBlock67("svg", _hoisted_159, _hoisted_414);
}
_sfc_script79.render = render78;
_sfc_script79.__file = "packages/ui/src/Icon/icons/PlusOutlined/PlusOutlined.vue";

// packages/ui/src/ImageUploader/util.ts
var ACCEPT_TYPES = /* @__PURE__ */ new Map([
  ["all", "image/*"],
  ["png", "image/png"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["webp", "image/webp"]
]);
function getAccepts(val) {
  let ret = [];
  if (val == null) {
    ret.push(ACCEPT_TYPES.get("all"));
  } else {
    const arr = stringMix2StringArray(val);
    for (let i = 0; i < arr.length; i++) {
      const accept = ACCEPT_TYPES.get(arr[i]);
      if (arr[i] === "all" && accept) {
        ret = [accept];
        break;
      } else if (accept) {
        ret.push(accept);
      }
    }
  }
  return ret;
}
var getUploadButtonClasses = (disabled) => [
  "ak-image-uploader_upload-button",
  { disabled: !!disabled }
];
var uid2 = 0;
var urlIdCache = {};
function urlId(url, id) {
  url = url.substring(url.length - 100);
  if (id) {
    urlIdCache[url] = id;
    return id;
  }
  return urlIdCache[url] || (urlIdCache[url] = ++uid2);
}
function getNewUid() {
  return ++uid2;
}

// vue:./ImageUploaderItem.vue
import { defineComponent as defineComponent61 } from "vue";
import { resolveComponent as _resolveComponent39, createVNode as _createVNode27, openBlock as _openBlock78, createBlock as _createBlock31, createCommentVNode as _createCommentVNode32, toDisplayString as _toDisplayString28, createElementVNode as _createElementVNode52, createElementBlock as _createElementBlock68, withModifiers as _withModifiers3 } from "vue";
var _sfc_script80 = defineComponent61({
  name: "ak-image-uploader-item",
  components: { ActivityIndicator: _sfc_script13, Image: _sfc_script17, Icon: _sfc_script2 },
  props: {
    item: {
      type: Object,
      required: true
    },
    imageMode: String,
    onClick: {
      type: Function,
      required: true
    }
  },
  setup() {
    return {
      DeleteOutlined: _sfc_script77,
      noop
    };
  }
});
var _hoisted_160 = {
  key: 0,
  class: "ak-image-uploader_item-status"
};
function render79(_ctx, _cache) {
  const _component_Image = _resolveComponent39("Image");
  const _component_ActivityIndicator = _resolveComponent39("ActivityIndicator");
  const _component_Icon = _resolveComponent39("Icon");
  return _openBlock78(), _createElementBlock68("div", {
    class: "ak-image-uploader_item",
    onContextmenu: _cache[0] || (_cache[0] = _withModifiers3((...args) => _ctx.noop && _ctx.noop(...args), ["prevent"])),
    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.onClick(_ctx.item))
  }, [
    _createVNode27(_component_Image, {
      src: _ctx.item.url,
      draggable: false,
      mode: _ctx.imageMode
    }, null, 8, ["src", "mode"]),
    _ctx.item.status !== "uploaded" && _ctx.item.status !== "reading" ? (_openBlock78(), _createElementBlock68("div", _hoisted_160, [
      _ctx.item.status === "uploading" ? (_openBlock78(), _createBlock31(_component_ActivityIndicator, {
        key: 0,
        size: 40,
        color: "#ffffff"
      })) : _ctx.item.status === "failed" ? (_openBlock78(), _createBlock31(_component_Icon, {
        key: 1,
        icon: _ctx.DeleteOutlined
      }, null, 8, ["icon"])) : _createCommentVNode32("v-if", true),
      _createElementVNode52("span", null, _toDisplayString28(_ctx.item.message), 1)
    ])) : _createCommentVNode32("v-if", true)
  ], 32);
}
_sfc_script80.render = render79;
_sfc_script80.__file = "packages/ui/src/ImageUploader/ImageUploaderItem.vue";

// vue:./ImageUploader.vue
import { resolveComponent as _resolveComponent40, createVNode as _createVNode28, createElementVNode as _createElementVNode53, withModifiers as _withModifiers4, normalizeClass as _normalizeClass37, openBlock as _openBlock79, createElementBlock as _createElementBlock69, createBlock as _createBlock32, withCtx as _withCtx18, mergeProps as _mergeProps9, Fragment as _Fragment14 } from "vue";
var isValue3 = (val) => isStringArray(val);
var addButtonID = -1;
var _sfc_script81 = defineComponent62({
  name: "ak-image-uploader",
  components: {
    Order: _sfc_script78,
    Icon: _sfc_script2,
    ImagePreview: _sfc_script76,
    Button: _sfc_script4,
    UploaderItem: _sfc_script80
  },
  props: {
    ...formItemProps,
    modelValue: {
      type: Array,
      validator: isValue3,
      default: () => []
    },
    accept: {
      type: [String, Array],
      validator: (val) => getAccepts(val).length > 0,
      default: "all"
    },
    columnNumber: {
      type: Number,
      default: 3
    },
    maxCount: {
      type: Number,
      default: 9
    },
    preview: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    deletable: {
      type: Boolean,
      default: true
    },
    imageMode: {
      type: String,
      default: "aspectFill"
    },
    beforeUpload: {
      type: Function,
      default: () => true
    },
    uploadReady: {
      type: Function,
      default: () => true
    }
  },
  emits: {
    "update:modelValue": isValue3,
    change: isValue3,
    delete: (payload) => payload && isNumber(payload.index)
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const orderItems = reactive6([]);
    const fileItems = ref32({});
    const formValue = ref32([]);
    const previewVisible = ref32(false);
    const previewCurrent = ref32("");
    function onAddFiles(e) {
      const files = e.target.files || [];
      for (let i = 0; i < files.length; i++) {
        addFile(files[i]);
      }
    }
    function addFile(file) {
      beforePromise(props.beforeUpload(file, {
        formatSize: formatFileSize
      })).then((res) => {
        if (res instanceof File) {
          file = res;
          res = true;
        }
        res && uploadFile(file);
      });
    }
    function uploadFile(file) {
      if (orderItems.length - (hasUploadButton() ? 1 : 0) >= props.maxCount) {
        return;
      }
      const fileItem = {
        id: getNewUid(),
        status: "reading",
        message: "Reading"
      };
      fileItems.value[fileItem.id] = fileItem;
      orderItems.splice(orderItems.length - (hasUploadButton() ? 1 : 0), 0, {
        id: fileItem.id
      });
      updateUploadButton();
      props.uploadReady(file, createUploadHandlers(fileItem.id));
    }
    function beforePromise(res) {
      if (res == null) {
        return Promise.resolve(true);
      } else if (typeof res === "boolean") {
        return Promise.resolve(res);
      } else if (isPromiseLike(res)) {
        return res.then((res2) => {
          if (res2 instanceof File) {
            return res2;
          }
          return !!res2;
        }).catch(() => {
          return false;
        });
      }
      return Promise.resolve(res instanceof File ? res : true);
    }
    function getFileItemById(id) {
      return fileItems.value[id] || null;
    }
    function isDone(fileItem) {
      return fileItem.status === "failed" || fileItem.status === "uploaded";
    }
    function createUploadHandlers(id) {
      return {
        getUploadId: () => id,
        formatSize: formatFileSize,
        setUploading(message) {
          const fileItem = getFileItemById(id);
          if (fileItem && !isDone(fileItem)) {
            fileItem.status = "uploading";
            fileItem.message = message || "Uploading";
          }
        },
        fail(e) {
          const fileItem = getFileItemById(id);
          if (fileItem && !isDone(fileItem)) {
            if (e instanceof Error) {
              fileItem.message = e.message;
            } else if (e) {
              fileItem.message = e.toString();
            } else {
              fileItem.message = "Failed";
            }
            fileItem.status = "failed";
          }
        },
        success(url) {
          const fileItem = getFileItemById(id);
          if (fileItem && !isDone(fileItem)) {
            fileItem.url = url;
            fileItem.status = "uploaded";
            fileItem.message = "Uploaded";
            urlId(url, id);
            updateValue();
          }
        }
      };
    }
    function updateValue() {
      const newVal = [];
      orderItems.forEach(({ id }) => {
        if (id === addButtonID) {
          return;
        }
        const fileItem = getFileItemById(id);
        if (fileItem.status === "uploaded" && fileItem.url) {
          newVal.push(fileItem.url);
        }
      });
      if (!isSameArray(newVal, formValue.value)) {
        formValue.value = newVal;
        emit("update:modelValue", cloneData(newVal));
        emit("change", cloneData(newVal));
      }
    }
    function hasUploadButton() {
      if (orderItems.length === 0) {
        return false;
      }
      return orderItems[orderItems.length - 1].id === addButtonID;
    }
    function updateUploadButton() {
      if (hasUploadButton()) {
        if (orderItems.length > props.maxCount) {
          orderItems.splice(orderItems.length - 1, 1);
        }
      } else {
        if (orderItems.length < props.maxCount) {
          orderItems.push({
            id: addButtonID,
            draggable: false
          });
        }
      }
    }
    function isSameUploadedList() {
      const value = cloneData(props.modelValue);
      for (let i = 0; i < orderItems.length; i++) {
        const fileItem = orderItems[i];
        if (fileItem.status === "uploaded") {
          if (value.length === 0) {
            return false;
          }
          if (fileItem.url === value[0]) {
            value.shift();
          } else {
            return false;
          }
        }
      }
      return value.length === 0;
    }
    function updateUploadedList() {
      if (isSameUploadedList()) {
        return;
      }
      const cache2 = [];
      orderItems.forEach((v) => {
        if (v.status === "uploading") {
          cache2.push(v);
        }
      });
      orderItems.splice(0, Infinity);
      formValue.value = [];
      props.modelValue.forEach((url) => {
        const fileItem = {
          id: urlId(url),
          status: "uploaded",
          url,
          message: "Uploaded"
        };
        fileItems.value[fileItem.id] = fileItem;
        orderItems.push({ id: fileItem.id });
        formValue.value.push(url);
      });
      cache2.length > 0 && orderItems.push(...cache2);
      updateUploadButton();
    }
    function onUpdateOrderItems(newOrderItems) {
      orderItems.splice(0, Infinity, ...newOrderItems);
      updateUploadButton();
      updateValue();
    }
    function onItemClick(fileItem) {
      if (fileItem) {
        if (fileItem.status === "uploaded") {
          if (props.preview) {
            previewCurrent.value = fileItem.url;
            previewVisible.value = true;
          }
        } else if (fileItem.status === "failed") {
          for (let i = 0; i < orderItems.length; i++) {
            if (orderItems[i].id === fileItem.id) {
              orderItems.splice(i, 1);
              updateUploadButton();
            }
          }
        }
      }
    }
    const onDelete = ({ index, item }) => {
      const fileItem = getFileItemById(item.id);
      fileItem && emit("delete", {
        index,
        item: {
          id: fileItem.id,
          status: fileItem.status,
          url: fileItem.url || null
        }
      });
    };
    function onPreviewDelete(activeIndex) {
      const current = formValue.value[activeIndex];
      for (let i = 0, j = 0; i < orderItems.length; i++) {
        const optionItem = orderItems[i];
        if (optionItem.status === "uploaded") {
          if (j === activeIndex && optionItem.url === current) {
            showDialog({
              content: locale.value.imageUploaderDeleteContent,
              confirmText: locale.value.imageUploaderDeleteConfirmText
            }).then((res) => {
              if (res.confirm) {
                orderItems.splice(i, 1);
                updateUploadButton();
                updateValue();
                if (formValue.value.length === 0) {
                  previewVisible.value = false;
                }
              }
            });
            break;
          }
          j++;
        }
      }
    }
    const accept2 = computed36(() => getAccepts(props.accept).join(", "));
    const updateButtonClasses = computed36(() => getUploadButtonClasses(props.disabled));
    watch23(() => props.modelValue, updateUploadedList, {
      immediate: true,
      deep: true
    });
    watch23(() => props.maxCount, updateUploadButton);
    updateUploadButton();
    return {
      formValue,
      orderItems,
      accept2,
      onAddFiles,
      onUpdateOrderItems,
      onItemClick,
      onDelete,
      previewVisible,
      previewCurrent,
      onPreviewDelete,
      noop,
      PlusOutlined: _sfc_script79,
      DeleteOutlined: _sfc_script77,
      updateButtonClasses,
      getFileItemById,
      addButtonID
    };
  }
});
var _hoisted_161 = ["accept", "disabled", "multiple"];
var _hoisted_245 = ["name", "value"];
function render80(_ctx, _cache) {
  const _component_Icon = _resolveComponent40("Icon");
  const _component_UploaderItem = _resolveComponent40("UploaderItem");
  const _component_Order = _resolveComponent40("Order");
  const _component_Button = _resolveComponent40("Button");
  const _component_ImagePreview = _resolveComponent40("ImagePreview");
  return _openBlock79(), _createElementBlock69(_Fragment14, null, [
    _createElementVNode53("div", _mergeProps9({ class: "ak-image-uploader" }, _ctx.$attrs), [
      _createVNode28(_component_Order, {
        columnNumber: _ctx.columnNumber,
        deletable: _ctx.deletable,
        items: _ctx.orderItems,
        onDelete: _ctx.onDelete,
        "onUpdate:items": _ctx.onUpdateOrderItems
      }, {
        default: _withCtx18(({ id }) => [
          id === _ctx.addButtonID ? (_openBlock79(), _createElementBlock69("div", {
            key: 0,
            class: _normalizeClass37(_ctx.updateButtonClasses),
            onContextmenu: _cache[1] || (_cache[1] = _withModifiers4((...args) => _ctx.noop && _ctx.noop(...args), ["prevent"]))
          }, [
            _createVNode28(_component_Icon, { icon: _ctx.PlusOutlined }, null, 8, ["icon"]),
            _createElementVNode53("input", {
              type: "file",
              name: "",
              accept: _ctx.accept2,
              disabled: _ctx.disabled,
              multiple: _ctx.multiple,
              onChange: _cache[0] || (_cache[0] = (...args) => _ctx.onAddFiles && _ctx.onAddFiles(...args))
            }, null, 40, _hoisted_161)
          ], 34)) : (_openBlock79(), _createBlock32(_component_UploaderItem, {
            key: 1,
            item: _ctx.getFileItemById(id),
            imageMode: _ctx.imageMode,
            onClick: _ctx.onItemClick
          }, null, 8, ["item", "imageMode", "onClick"]))
        ]),
        _: 1
      }, 8, ["columnNumber", "deletable", "items", "onDelete", "onUpdate:items"]),
      _createElementVNode53("input", {
        type: "hidden",
        name: _ctx.name,
        value: _ctx.formValue,
        ref: "input"
      }, null, 8, _hoisted_245)
    ], 16),
    _createVNode28(_component_ImagePreview, {
      class: "ak-image-uploader_preview",
      urls: _ctx.formValue,
      visible: _ctx.previewVisible,
      "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => _ctx.previewVisible = $event),
      current: _ctx.previewCurrent,
      "onUpdate:current": _cache[3] || (_cache[3] = ($event) => _ctx.previewCurrent = $event),
      showClose: ""
    }, {
      close: _withCtx18(({ activeIndex }) => [
        _createVNode28(_component_Button, {
          onClick: _withModifiers4(($event) => _ctx.onPreviewDelete(activeIndex), ["stop"]),
          icon: _ctx.DeleteOutlined,
          size: "large",
          pattern: "borderless",
          shape: "square",
          ghost: true
        }, null, 8, ["onClick", "icon"])
      ]),
      _: 1
    }, 8, ["urls", "visible", "current"])
  ], 64);
}
_sfc_script81.render = render80;
_sfc_script81.__file = "packages/ui/src/ImageUploader/ImageUploader.vue";

// packages/ui/src/ImageUploader/index.ts
var install55 = withInstall(_sfc_script81);
var ImageUploader_default = _sfc_script81;

// vue:./IndexView.vue
import { defineComponent as defineComponent66, onMounted as onMounted25, ref as ref35 } from "vue";

// vue:./StickyView.vue
import { computed as computed38, defineComponent as defineComponent64, onMounted as onMounted24, ref as ref34, watch as watch25 } from "vue";

// vue:./Sticky.vue
import { defineComponent as defineComponent63, computed as computed37, ref as ref33, onMounted as onMounted23, inject as inject14, watch as watch24 } from "vue";

// packages/ui/src/Sticky/util.ts
var getStyles5 = (height) => {
  const styles = {};
  if (height != null) {
    styles.height = height + "px";
  }
  return styles;
};

// vue:./Sticky.vue
import { renderSlot as _renderSlot35, createElementVNode as _createElementVNode54, normalizeStyle as _normalizeStyle19, openBlock as _openBlock80, createElementBlock as _createElementBlock70 } from "vue";
var _sfc_script82 = defineComponent63({
  name: "ak-sticky",
  props: {
    containSelector: {
      type: [String, HTMLElement],
      validator: selectorValidator
    },
    offsetTop: {
      type: [Number, String],
      validator: sizeValidator,
      default: 0
    },
    offsetBottom: {
      type: [Number, String],
      validator: sizeValidator,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const root = ref33();
    const container = ref33();
    const contentEl = ref33();
    const width = ref33(null);
    const height = ref33(null);
    const disableFixed = inject14("disableFixed", false);
    const fixed = ref33(false);
    useFixed({
      disableFixed,
      root,
      inner: contentEl,
      fixed
    });
    function updateFixed() {
      if (!root.value || !container.value) {
        return;
      }
      if (props.disabled) {
        updateStyles(false);
        return;
      }
      const scrollTop = getScrollTop(container.value);
      const $root = root.value;
      const { clientHeight, clientWidth } = $root;
      const offsetTop = getRelativeOffset($root, container.value).offsetTop;
      if (scrollTop >= offsetTop - getSizeValue(props.offsetTop)) {
        height.value = clientHeight;
        width.value = clientWidth;
        updateStyles(true);
      } else {
        height.value = null;
        width.value = null;
        updateStyles(false);
      }
    }
    function updateStyles(isFixed) {
      const $root = root.value;
      const styles2 = contentEl.value.style;
      if (isFixed) {
        const { offsetTop } = getRelativeOffset(container.value);
        const { offsetLeft } = getRelativeOffset($root);
        styles2.top = offsetTop + getSizeValue(props.offsetTop) + "px";
        styles2.left = offsetLeft + "px";
        styles2.width = width.value + "px";
        if (props.offsetBottom != null) {
          styles2.bottom = getSizeValue(props.offsetBottom) + "px";
        } else {
          styles2.height = height.value + "px";
        }
        styles2.zIndex = widgetZIndex.toString();
        styles2.position = "fixed";
      } else {
        styles2.cssText = "";
      }
      fixed.value = isFixed;
    }
    useScroll(container, updateFixed);
    const resetContainer = (containSelector) => {
      container.value = querySelector(containSelector) || document.documentElement;
    };
    const styles = computed37(() => {
      var _a;
      return getStyles5((_a = height.value) != null ? _a : void 0);
    });
    watch24(() => props.disabled, () => updateFixed());
    onMounted23(() => resetContainer(props.containSelector));
    return {
      root,
      fixed,
      contentEl,
      styles,
      resetContainer
    };
  }
});
var _hoisted_162 = {
  class: "ak-sticky_content",
  ref: "contentEl"
};
function render81(_ctx, _cache) {
  return _openBlock80(), _createElementBlock70("div", {
    class: "ak-sticky",
    style: _normalizeStyle19(_ctx.styles),
    ref: "root"
  }, [
    _createElementVNode54("div", _hoisted_162, [
      _renderSlot35(_ctx.$slots, "default")
    ], 512)
  ], 4);
}
_sfc_script82.render = render81;
_sfc_script82.__file = "packages/ui/src/Sticky/Sticky.vue";

// packages/ui/src/Sticky/index.ts
var install56 = withInstall(_sfc_script82);
var Sticky_default = _sfc_script82;

// packages/ui/src/StickyView/props.ts
var emitChangeValidator2 = (activeIndex) => isNumber(activeIndex);

// packages/ui/src/StickyView/util.ts
var getClasses13 = (isSelfContainer) => [
  "ak-sticky-view",
  {
    self: isSelfContainer
  }
];
var getFixedStyles = (titleY) => ({
  transform: `translate3d(0px, ${titleY == null ? "-100%" : titleY + "px"}, 0px)`
});
var FIXED_HEIGHT = 28;

// vue:./StickyView.vue
import { renderSlot as _renderSlot36, createElementVNode as _createElementVNode55, resolveComponent as _resolveComponent41, withCtx as _withCtx19, createVNode as _createVNode29, normalizeClass as _normalizeClass38, openBlock as _openBlock81, createElementBlock as _createElementBlock71 } from "vue";
var _sfc_script83 = defineComponent64({
  name: "ak-sticky-view",
  components: { Sticky: _sfc_script82 },
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    containSelector: {
      type: [String, HTMLElement],
      validator: selectorValidator
    },
    offsetTop: {
      type: [Number, String],
      validator: sizeValidator,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:activeIndex": (activeIndex) => isNumber(activeIndex),
    change: emitChangeValidator2,
    resetItems: (items) => {
      if (Array.isArray(items)) {
        return items.filter((item) => {
          return !(item && isNumber(item.index) && isString(item.name));
        }).length === 0;
      }
      return false;
    }
  },
  setup(props, { emit }) {
    const root = ref34();
    const container = ref34();
    const fixedEl = ref34();
    const stickyRef = ref34();
    const activeIndex = ref34(0);
    const isSelfContainer = ref34(false);
    let $items = [];
    let isScrollTo = false;
    function getItemName(index) {
      var _a;
      return ((_a = $items[index]) == null ? void 0 : _a.dataset.name) || "";
    }
    useScroll(container, () => updateFixed(null));
    const resetContainer = (containSelector) => {
      var _a;
      container.value = querySelector(containSelector) || root.value;
      isSelfContainer.value = container.value === root.value;
      (_a = stickyRef.value) == null ? void 0 : _a.resetContainer(container.value);
      updateFixed(null);
    };
    function updateTitle(t, tY) {
      if (!fixedEl.value) {
        return;
      }
      fixedEl.value.textContent = t;
      fixedEl.value.style.cssText = CSSProperties2CssText(getFixedStyles(tY));
    }
    function updateFixed(ss) {
      if (!fixedEl.value || !container.value) {
        return;
      }
      if ($items.length === 0) {
        updateTitle("", null);
        return;
      }
      const scrollTop = ss == null ? getScrollTop(container.value) : ss;
      const _index = activeIndex.value;
      const nextIndex = _index + 1;
      const offsetTops = getOffsetTops();
      const current = offsetTops[_index];
      const next = offsetTops[nextIndex] != null ? offsetTops[nextIndex] : Infinity;
      const first = offsetTops[0];
      if (scrollTop < first) {
        updateTitle("", null);
      } else if (scrollTop >= current) {
        if (scrollTop >= next) {
          activeIndex.value = nextIndex;
          updateTitle(getItemName(nextIndex), 0);
          if (offsetTops[nextIndex + 1] && scrollTop >= offsetTops[nextIndex + 1]) {
            updateFixed(scrollTop);
          } else {
            if (!isScrollTo) {
              emit("update:activeIndex", activeIndex.value);
            }
            emit("change", activeIndex.value);
          }
        } else if (next - scrollTop < FIXED_HEIGHT) {
          updateTitle(getItemName(_index), next - scrollTop - FIXED_HEIGHT);
        } else {
          updateTitle(getItemName(_index), 0);
        }
      } else {
        if (current - scrollTop < FIXED_HEIGHT) {
          updateTitle(getItemName(_index - 1), current - scrollTop - FIXED_HEIGHT);
        } else {
          activeIndex.value = _index - 1;
          updateTitle(getItemName(_index - 1), 0);
          if (offsetTops[_index - 1] && offsetTops[_index - 1] > scrollTop) {
            updateFixed(scrollTop);
          } else {
            if (!isScrollTo) {
              emit("update:activeIndex", activeIndex.value);
            }
            emit("change", activeIndex.value);
          }
        }
      }
      isScrollTo = false;
    }
    function getOffsetTops() {
      const offset = getRelativeOffset(listEl.value, container.value).offsetTop - getSizeValue(props.offsetTop);
      return $items.map(($el) => {
        return $el.offsetTop + offset;
      });
    }
    function scrollToIndex(options) {
      let _index = 0;
      if (typeof options === "number") {
        _index = options;
      } else if (options && typeof options.index === "number") {
        _index = options.index;
      }
      if ($items[_index] && _index != activeIndex.value) {
        scrollToOffset({
          offset: getRelativeOffset($items[_index], container.value).offsetTop
        });
      }
    }
    function scrollToOffset(options) {
      let offset = 0;
      if (typeof options === "number") {
        offset = options;
      } else if (options && typeof options.offset === "number") {
        offset = options.offset;
      }
      isScrollTo = true;
      scrollTo(container.value, offset, false);
    }
    function resetItems(res) {
      $items = res;
      updateFixed(null);
      emit("resetItems", $items.map((v, k) => {
        return {
          name: getItemName(k),
          index: k
        };
      }));
    }
    const { listEl } = useList("stickyView", resetItems);
    watch25(() => props.activeIndex, (val) => scrollToIndex({ index: val }));
    onMounted24(() => resetContainer(props.containSelector));
    const classes = computed38(() => getClasses13(isSelfContainer.value));
    return {
      root,
      listEl,
      fixedEl,
      stickyRef,
      classes,
      resetContainer,
      scrollToIndex,
      scrollTo: scrollToOffset
    };
  }
});
var _hoisted_163 = {
  class: "ak-sticky-view_list",
  ref: "listEl"
};
var _hoisted_246 = { class: "ak-sticky-view_fixed" };
var _hoisted_338 = {
  class: "ak-sticky-view_fixed-inner",
  ref: "fixedEl"
};
function render82(_ctx, _cache) {
  const _component_Sticky = _resolveComponent41("Sticky");
  return _openBlock81(), _createElementBlock71("div", {
    ref: "root",
    class: _normalizeClass38(_ctx.classes)
  }, [
    _createElementVNode55("div", _hoisted_163, [
      _renderSlot36(_ctx.$slots, "default")
    ], 512),
    _createVNode29(_component_Sticky, {
      offsetTop: _ctx.offsetTop,
      containSelector: _ctx.containSelector,
      disabled: _ctx.disabled,
      class: "ak-sticky-view_top",
      ref: "stickyRef"
    }, {
      default: _withCtx19(() => [
        _createElementVNode55("div", _hoisted_246, [
          _createElementVNode55("div", _hoisted_338, null, 512)
        ])
      ]),
      _: 1
    }, 8, ["offsetTop", "containSelector", "disabled"])
  ], 2);
}
_sfc_script83.render = render82;
_sfc_script83.__file = "packages/ui/src/StickyView/StickyView.vue";

// vue:./StickyViewItem.vue
import { defineComponent as defineComponent65 } from "vue";
import { toDisplayString as _toDisplayString29, createElementVNode as _createElementVNode56, renderSlot as _renderSlot37, openBlock as _openBlock82, createElementBlock as _createElementBlock72 } from "vue";
var _sfc_script84 = defineComponent65({
  name: "ak-sticky-view-item",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    useListItem("stickyView");
    return {};
  }
});
var _hoisted_164 = ["data-name"];
var _hoisted_247 = { class: "ak-sticky-view-item_header" };
var _hoisted_339 = { class: "ak-sticky-view-item_body" };
function render83(_ctx, _cache) {
  return _openBlock82(), _createElementBlock72("div", {
    class: "ak-sticky-view-item",
    "data-name": _ctx.name,
    ref: "root"
  }, [
    _createElementVNode56("div", _hoisted_247, _toDisplayString29(_ctx.name), 1),
    _createElementVNode56("div", _hoisted_339, [
      _renderSlot37(_ctx.$slots, "default")
    ])
  ], 8, _hoisted_164);
}
_sfc_script84.render = render83;
_sfc_script84.__file = "packages/ui/src/StickyView/StickyViewItem.vue";

// packages/ui/src/StickyView/index.ts
var StickyView_default = _sfc_script83;
var install57 = multiWithInstall(_sfc_script83, [_sfc_script84]);

// vue:./IndexView.vue
import { renderList as _renderList14, Fragment as _Fragment15, openBlock as _openBlock83, createElementBlock as _createElementBlock73, toDisplayString as _toDisplayString30, normalizeClass as _normalizeClass39, createElementVNode as _createElementVNode57, renderSlot as _renderSlot38, resolveComponent as _resolveComponent42, withCtx as _withCtx20, createVNode as _createVNode30 } from "vue";
var _sfc_script85 = defineComponent66({
  name: "ak-index-view",
  components: { StickyView: _sfc_script83 },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: {
    change: emitChangeValidator2
  },
  setup(props, { emit }) {
    const navEl = ref35();
    const bodyRef = ref35();
    const indexList = ref35([]);
    const activeIndex = ref35(0);
    const resetContainer = (containSelector) => {
      var _a;
      (_a = bodyRef.value) == null ? void 0 : _a.resetContainer(containSelector);
    };
    const onResetItems = (items) => {
      indexList.value = items.map((item) => {
        return {
          value: item.index,
          label: item.name
        };
      });
    };
    let oldIndex = 0;
    const onChange = (index) => {
      emit("change", index, oldIndex);
      oldIndex = index;
    };
    function scrollToIndex(index) {
      var _a;
      (_a = bodyRef.value) == null ? void 0 : _a.scrollToIndex(index);
    }
    let coords;
    let changeTimer;
    useTouch({
      el: navEl,
      onTouchStart(e) {
        const { clientY } = e.touchObject;
        const $target = e.target;
        const value = parseInt($target.dataset.value);
        const rects = $target.getClientRects()[0];
        coords = {
          size: rects.height,
          offsetY: clientY - rects.top,
          startY: clientY,
          current: value
        };
        clearTimeout(changeTimer);
        changeTimer = window.setTimeout(() => {
          activeIndex.value = value;
        }, 500);
        e.preventDefault();
      },
      onTouchMove(e) {
        if (!coords) {
          return;
        }
        const { clientY } = e.touchObject;
        const { startY, size, offsetY, current } = coords;
        const y = clientY - startY;
        let offsetCount = 0;
        if (y > 0) {
          offsetCount = Math.floor(y / size) + (y % size > size - offsetY ? 1 : 0);
        } else if (y < 0) {
          offsetCount = -Math.floor(-y / size) + (-y % size > offsetY ? -1 : 0);
        }
        if (offsetCount !== 0) {
          clearTimeout(changeTimer);
          coords.isChange = true;
          changeTimer = window.setTimeout(() => {
            activeIndex.value = rangeInteger(current + offsetCount, 0, indexList.value.length - 1);
          }, 100);
        }
        e.stopPropagation();
      },
      onTouchEnd(e) {
        if (coords) {
          if (!coords.isChange) {
            clearTimeout(changeTimer);
            activeIndex.value = coords.current;
          }
          coords = null;
          e.stopPropagation();
        }
      }
    });
    onMounted25(() => resetContainer(document.documentElement));
    return {
      navEl,
      bodyRef,
      activeIndex,
      indexList,
      onChange,
      scrollToIndex,
      resetContainer,
      onResetItems
    };
  }
});
var _hoisted_165 = { class: "ak-index-view" };
var _hoisted_248 = { class: "ak-index-view_sidebar" };
var _hoisted_340 = {
  class: "ak-index-view_list",
  ref: "navEl"
};
var _hoisted_415 = ["data-value"];
var _hoisted_57 = { class: "ak-index-view_body" };
function render84(_ctx, _cache) {
  const _component_StickyView = _resolveComponent42("StickyView");
  return _openBlock83(), _createElementBlock73("div", _hoisted_165, [
    _createElementVNode57("div", _hoisted_248, [
      _createElementVNode57("ul", _hoisted_340, [
        (_openBlock83(true), _createElementBlock73(_Fragment15, null, _renderList14(_ctx.indexList, (item) => {
          return _openBlock83(), _createElementBlock73("li", {
            class: _normalizeClass39({ active: item.value === _ctx.activeIndex }),
            "data-value": item.value,
            key: item.value
          }, _toDisplayString30(item.label), 11, _hoisted_415);
        }), 128))
      ], 512)
    ]),
    _createElementVNode57("div", _hoisted_57, [
      _createVNode30(_component_StickyView, {
        offsetTop: _ctx.stickyOffsetTop,
        ref: "bodyRef",
        activeIndex: _ctx.activeIndex,
        "onUpdate:activeIndex": _cache[0] || (_cache[0] = ($event) => _ctx.activeIndex = $event),
        onResetItems: _ctx.onResetItems,
        onChange: _ctx.onChange
      }, {
        default: _withCtx20(() => [
          _renderSlot38(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["offsetTop", "activeIndex", "onResetItems", "onChange"])
    ])
  ]);
}
_sfc_script85.render = render84;
_sfc_script85.__file = "packages/ui/src/IndexView/IndexView.vue";

// vue:./IndexViewItem.vue
import { defineComponent as defineComponent67, inject as inject15, onMounted as onMounted26, onUnmounted as onUnmounted2 } from "vue";
import { renderSlot as _renderSlot39, resolveComponent as _resolveComponent43, withCtx as _withCtx21, openBlock as _openBlock84, createBlock as _createBlock33 } from "vue";
var _sfc_script86 = defineComponent67({
  name: "ak-index-view-item",
  components: { Group: _sfc_script73 },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const update = inject15("akStickyViewUpdate", createUpdateInItem("index-view"));
    onMounted26(update);
    onUnmounted2(update);
    return {};
  }
});
function render85(_ctx, _cache) {
  const _component_Group = _resolveComponent43("Group");
  return _openBlock84(), _createBlock33(_component_Group, {
    class: "ak-sticky-view-item ak-index-view-item",
    title: _ctx.name,
    "data-name": _ctx.name
  }, {
    default: _withCtx21(() => [
      _renderSlot39(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["title", "data-name"]);
}
_sfc_script86.render = render85;
_sfc_script86.__file = "packages/ui/src/IndexView/IndexViewItem.vue";

// packages/ui/src/IndexView/index.ts
var IndexView_default = _sfc_script85;
var install58 = multiWithInstall(_sfc_script85, [_sfc_script86]);

// packages/ui/src/IndexViewItem/index.ts
var IndexViewItem_default = _sfc_script86;
var install59 = withNoopInstall(_sfc_script86);

// vue:./Input.vue
import { computed as computed39, defineComponent as defineComponent68, onMounted as onMounted27, ref as ref37, watch as watch26 } from "vue";

// packages/ui/src/helpers/input.ts
function formatInputNumber(value, decimalLength = -1) {
  if (value == null || value === "") {
    return "";
  }
  const isNegative = value.toString().indexOf("-") === 0;
  const match = value.toString().match(/[\d-.]+/);
  if (match && match[0]) {
    value = match[0].replace(/\.+/g, ".").replace(/-+/g, "");
    if (decimalLength > 0) {
      const arr = value.split(".");
      if (arr[1] && arr[1].length > decimalLength) {
        arr[1] = arr[1].substring(0, decimalLength);
        value = arr.join(".");
      }
    } else if (decimalLength === 0) {
      value = parseInt(value).toString();
    }
    return (isNegative ? "-" : "") + value;
  }
  return "";
}
function formatInputDigit(value) {
  if (value == null || value === "") {
    return "";
  }
  const match = value.toString().match(/\d+/);
  return match && match[0] || "";
}

// packages/ui/src/Input/util.ts
var TYPE_NAMES2 = [
  "text",
  "number",
  "digit",
  "tel",
  "password",
  "search",
  "textarea"
];
var getInputMode = (_type) => {
  let mode = "none";
  let type = "";
  switch (_type) {
    case "search":
      mode = "search";
      break;
    case "digit":
      mode = "numeric";
      type = "tel";
      break;
    case "number":
      mode = "decimal";
      type = "text";
      break;
    case "tel":
      mode = "tel";
      break;
    case "text":
      mode = "text";
      break;
    default:
      break;
  }
  if (!type) {
    type = getEnumsValue(TYPE_NAMES2, _type);
  }
  return {
    inputMode: mode,
    inputType: type
  };
};
var getMaxLength = (maxLength) => {
  return Math.max(0, getNumber(maxLength, 140));
};
var getClasses14 = ({
  type,
  readonly,
  prepend,
  append,
  active,
  disabled
}) => {
  return [
    "ak-input",
    {
      "has--prepend": prepend,
      "has--append": append,
      "ak-textarea": type === "textarea",
      focus: active,
      readonly: !!readonly,
      disabled: !!disabled
    }
  ];
};
var getValue2 = (val, type) => {
  let newVal = val.toString();
  switch (type) {
    case "digit":
      newVal = formatInputDigit(newVal);
      break;
    case "number":
      newVal = formatInputNumber(newVal);
      break;
    default:
      break;
  }
  return newVal;
};

// packages/ui/src/Form/use-form.ts
import { ref as ref36 } from "vue";
function useInput() {
  const inputEl = ref36();
  function setInputChecked(val) {
    inputEl.value && (inputEl.value.checked = val);
  }
  function getInputChecked() {
    var _a;
    return ((_a = inputEl.value) == null ? void 0 : _a.checked) ? true : false;
  }
  function setInputValue(val) {
    inputEl.value && (inputEl.value.value = val.toString());
  }
  function getInputValue() {
    var _a, _b;
    return (_b = (_a = inputEl.value) == null ? void 0 : _a.value) != null ? _b : "";
  }
  function getInputEl() {
    return inputEl.value;
  }
  function setFocus() {
    var _a;
    (_a = inputEl.value) == null ? void 0 : _a.focus();
  }
  function setBlur() {
    var _a;
    (_a = inputEl.value) == null ? void 0 : _a.blur();
  }
  return {
    inputEl,
    getInputValue,
    setInputValue,
    getInputChecked,
    setInputChecked,
    getInputEl,
    setFocus,
    setBlur
  };
}

// vue:./Input.vue
import { renderSlot as _renderSlot40, openBlock as _openBlock85, createElementBlock as _createElementBlock74, createCommentVNode as _createCommentVNode34, toDisplayString as _toDisplayString31, resolveComponent as _resolveComponent44, withModifiers as _withModifiers5, createBlock as _createBlock34, normalizeClass as _normalizeClass40 } from "vue";
var _sfc_script87 = defineComponent68({
  name: "ak-input",
  components: { Icon: _sfc_script2 },
  props: {
    ...formItemProps,
    maxlength: {
      type: [Number, String],
      validator: (val) => isNumeric(val),
      default: 140
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: [Number, String],
      validator: (val) => isStringNumberMix(val)
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    },
    showLimit: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    ...formStringValueEmits,
    ...formFocusEmits
  },
  setup(props, { emit, slots }) {
    const active = ref37(false);
    const isShowClear = ref37(false);
    const inputValue = ref37("");
    const { inputEl, setFocus, setBlur, getInputValue, setInputValue } = useInput();
    function updateValue(val) {
      const newVal = getValue2(val, props.type);
      let isChange = false;
      if (newVal !== getInputValue()) {
        setInputValue(newVal);
      }
      if (newVal !== inputValue.value) {
        inputValue.value = newVal;
        isChange = true;
      }
      if (newVal != props.modelValue) {
        emit("update:modelValue", newVal);
      }
      return { value: newVal, isChange };
    }
    function updateInput(newVal) {
      const { value, isChange } = updateValue(newVal);
      isChange && emit("input", value);
    }
    let isComposition = false;
    function onCompositionStart() {
      isComposition = true;
    }
    function onCompositionEnd() {
      isComposition = false;
      updateInput(getInputValue());
    }
    const onFocus = (e) => {
      active.value = true;
      emit("focus", e);
    };
    const onBlur = (e) => {
      active.value = false;
      emit("blur", e);
    };
    function onInput() {
      if (!isComposition) {
        updateInput(getInputValue());
      }
    }
    function onChange() {
      emit("change", inputValue.value);
    }
    function onClear() {
      updateInput("");
      emit("change", inputValue.value);
    }
    const typeMode = computed39(() => getInputMode(props.type));
    const classes = computed39(() => getClasses14({
      type: props.type,
      prepend: !!slots.prepend,
      append: !!slots.append,
      active: active.value,
      disabled: props.disabled,
      readonly: props.readonly
    }));
    watch26(() => props.modelValue, (val) => {
      val != inputValue.value && updateValue(val != null ? val : "");
    });
    watch26(() => props.focus, (val) => {
      val ? setFocus() : setBlur();
    });
    const maxLength = computed39(() => getMaxLength(props.maxlength));
    let timer;
    watch26([inputValue, active], ([ipVal, isActive]) => {
      clearTimeout(timer);
      if (ipVal && isActive) {
        timer = window.setTimeout(() => isShowClear.value = true, 200);
      } else {
        isShowClear.value = false;
      }
    });
    onMounted27(() => {
      var _a;
      updateValue((_a = props.modelValue) != null ? _a : "");
      props.focus && setFocus();
    });
    return {
      classes,
      inputEl,
      inputValue,
      active,
      onCompositionStart,
      onCompositionEnd,
      onFocus,
      onBlur,
      onInput,
      onChange,
      onClear,
      typeMode,
      maxLength,
      isShowClear,
      CloseCircleFilled: _sfc_script61
    };
  }
});
var _hoisted_166 = {
  key: 0,
  class: "ak-input_prepend"
};
var _hoisted_249 = ["name", "disabled", "placeholder", "readonly", "maxlength"];
var _hoisted_341 = ["name", "type", "inputmode", "disabled", "placeholder", "readonly", "maxlength"];
var _hoisted_416 = {
  key: 3,
  class: "ak-input_limit"
};
var _hoisted_58 = {
  key: 5,
  class: "ak-input_append"
};
function render86(_ctx, _cache) {
  const _component_Icon = _resolveComponent44("Icon");
  return _openBlock85(), _createElementBlock74("label", {
    class: _normalizeClass40(_ctx.classes)
  }, [
    _ctx.$slots.prepend ? (_openBlock85(), _createElementBlock74("div", _hoisted_166, [
      _renderSlot40(_ctx.$slots, "prepend")
    ])) : _createCommentVNode34("v-if", true),
    _ctx.type === "textarea" ? (_openBlock85(), _createElementBlock74("textarea", {
      key: 1,
      class: "ak-input_input ak-input_textarea",
      name: _ctx.name,
      disabled: _ctx.disabled,
      placeholder: _ctx.placeholder,
      readonly: _ctx.readonly,
      maxlength: _ctx.maxLength,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onChange: _cache[1] || (_cache[1] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
      onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      ref: "inputEl"
    }, null, 40, _hoisted_249)) : (_openBlock85(), _createElementBlock74("input", {
      key: 2,
      class: "ak-input_input",
      name: _ctx.name,
      type: _ctx.typeMode.inputType,
      inputmode: _ctx.typeMode.inputMode,
      disabled: _ctx.disabled,
      placeholder: _ctx.placeholder,
      readonly: _ctx.readonly,
      maxlength: _ctx.maxLength,
      onInput: _cache[4] || (_cache[4] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onChange: _cache[5] || (_cache[5] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
      onFocus: _cache[6] || (_cache[6] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      onBlur: _cache[7] || (_cache[7] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onCompositionstart: _cache[8] || (_cache[8] = (...args) => _ctx.onCompositionStart && _ctx.onCompositionStart(...args)),
      onCompositionend: _cache[9] || (_cache[9] = (...args) => _ctx.onCompositionEnd && _ctx.onCompositionEnd(...args)),
      ref: "inputEl"
    }, null, 40, _hoisted_341)),
    _ctx.showLimit && _ctx.maxLength > 0 ? (_openBlock85(), _createElementBlock74("span", _hoisted_416, _toDisplayString31(_ctx.inputValue.length) + "/" + _toDisplayString31(_ctx.maxLength), 1)) : _createCommentVNode34("v-if", true),
    _ctx.showClear && _ctx.isShowClear ? (_openBlock85(), _createBlock34(_component_Icon, {
      key: 4,
      class: "ak-input_clear",
      icon: _ctx.CloseCircleFilled,
      onMousedown: _withModifiers5(_ctx.onClear, ["prevent"])
    }, null, 8, ["icon", "onMousedown"])) : _createCommentVNode34("v-if", true),
    _ctx.$slots.append ? (_openBlock85(), _createElementBlock74("div", _hoisted_58, [
      _renderSlot40(_ctx.$slots, "append")
    ])) : _createCommentVNode34("v-if", true)
  ], 2);
}
_sfc_script87.render = render86;
_sfc_script87.__file = "packages/ui/src/Input/Input.vue";

// packages/ui/src/Input/index.ts
var install60 = withInstall(_sfc_script87);
var Input_default = _sfc_script87;

// vue:./NoticeBar.vue
import {
  defineComponent as defineComponent69,
  computed as computed40,
  onMounted as onMounted28,
  onBeforeUnmount as onBeforeUnmount15,
  ref as ref38,
  watch as watch27
} from "vue";

// packages/ui/src/NoticeBar/util.ts
var getClasses15 = (type) => {
  return ["ak-notice-bar", "type--" + getEnumsValue(STATE_TYPES, type)];
};
var getStyles6 = (color) => {
  const styles = {};
  const colorObj = getColorObject(color);
  if (colorObj.hasColor) {
    styles[`--ak-color`] = colorObj.varBackgroundColor;
    styles[`--ak-front-color`] = colorObj.varFrontColor;
  }
  return styles;
};
var getContentClasses = (marquee) => {
  return [
    "ak-notice-bar_content-inner",
    {
      marquee: !!marquee
    }
  ];
};
var getContentStyles2 = ({
  marqueeX,
  marqueeDuration
}) => {
  const styles = {};
  marqueeX !== 0 && (styles.transform = `translateX(${marqueeX}px)`);
  marqueeDuration > 0 && (styles.transitionDuration = `${marqueeDuration}s`);
  return styles;
};

// vue:./NoticeBar.vue
import { resolveComponent as _resolveComponent45, createVNode as _createVNode31, openBlock as _openBlock86, createElementBlock as _createElementBlock75, createCommentVNode as _createCommentVNode35, renderSlot as _renderSlot41, toDisplayString as _toDisplayString32, createTextVNode as _createTextVNode14, normalizeClass as _normalizeClass41, normalizeStyle as _normalizeStyle20, createElementVNode as _createElementVNode58 } from "vue";
var modeMaps = /* @__PURE__ */ new Map([
  ["default", null],
  ["clickable", _sfc_script25],
  ["closable", _sfc_script9]
]);
var _sfc_script88 = defineComponent69({
  name: "ak-notice-bar",
  components: { Icon: _sfc_script2 },
  props: {
    title: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      validator: (val) => modeMaps.get(val) !== void 0,
      default: "default"
    },
    leftIcon: {
      type: [String, Object],
      validator: iconValidator
    },
    rightIcon: {
      type: [String, Object],
      validator: iconValidator
    },
    color: {
      type: String,
      validator: colorValidator
    },
    marquee: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator: createEnumsValidator(STATE_TYPES)
    }
  },
  emits: {
    click: emitClickValidator,
    closeClick: emitClickValidator
  },
  setup(props, { emit }) {
    const marqueeX = ref38(0);
    const marqueeDuration = ref38(0);
    const contentEl = ref38();
    let marqueeTimer;
    function marqueeStep(x, pW) {
      marqueeX.value = pW;
      marqueeDuration.value = 0;
      marqueeTimer = window.setTimeout(() => {
        marqueeX.value = -x;
        marqueeDuration.value = x / 30;
        marqueeTimer = window.setTimeout(() => {
          marqueeStep(x, pW);
        }, x / 28 * 1e3);
      }, 17);
    }
    function stopMarquee() {
      clearTimeout(marqueeTimer);
      marqueeX.value = 0;
      marqueeDuration.value = 0;
    }
    function startMarquee() {
      stopMarquee();
      const $content = contentEl.value;
      const w = $content.offsetWidth;
      const pW = $content.parentElement.offsetWidth;
      if (w > pW) {
        marqueeStep(w, pW);
      }
    }
    function resetMarquee() {
      props.marquee ? startMarquee() : stopMarquee();
    }
    const onClick = (e) => {
      if (props.mode === "clickable") {
        emit("click", e);
      }
    };
    const onRightIconClick = (e) => {
      if (props.mode === "closable") {
        emit("closeClick", e);
      }
    };
    onMounted28(() => props.marquee && startMarquee());
    onBeforeUnmount15(() => stopMarquee());
    watch27([() => props.marquee, () => props.title], () => {
      resetMarquee();
    });
    const rightIcon2 = computed40(() => {
      return props.rightIcon || modeMaps.get(props.mode) || null;
    });
    const classes = computed40(() => getClasses15(props.type));
    const styles = computed40(() => getStyles6(props.color));
    const contentClasses = computed40(() => getContentClasses(props.marquee));
    const contentStyles = computed40(() => getContentStyles2({
      marqueeX: marqueeX.value,
      marqueeDuration: marqueeDuration.value
    }));
    return {
      contentEl,
      rightIcon2,
      classes,
      styles,
      contentClasses,
      contentStyles,
      onClick,
      onRightIconClick
    };
  }
});
var _hoisted_167 = {
  key: 0,
  class: "ak-notice-bar_left-icon"
};
var _hoisted_250 = { class: "ak-notice-bar_content" };
function render87(_ctx, _cache) {
  const _component_Icon = _resolveComponent45("Icon");
  return _openBlock86(), _createElementBlock75("div", {
    class: _normalizeClass41(_ctx.classes),
    style: _normalizeStyle20(_ctx.styles),
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _ctx.leftIcon ? (_openBlock86(), _createElementBlock75("div", _hoisted_167, [
      _createVNode31(_component_Icon, { icon: _ctx.leftIcon }, null, 8, ["icon"])
    ])) : _createCommentVNode35("v-if", true),
    _createElementVNode58("div", _hoisted_250, [
      _createElementVNode58("div", {
        ref: "contentEl",
        class: _normalizeClass41(_ctx.contentClasses),
        style: _normalizeStyle20(_ctx.contentStyles)
      }, [
        _renderSlot41(_ctx.$slots, "default", {}, () => [
          _createTextVNode14(_toDisplayString32(_ctx.title), 1)
        ])
      ], 6)
    ]),
    _ctx.rightIcon2 ? (_openBlock86(), _createElementBlock75("div", {
      key: 1,
      class: "ak-notice-bar_right-icon",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onRightIconClick && _ctx.onRightIconClick(...args))
    }, [
      _createVNode31(_component_Icon, { icon: _ctx.rightIcon2 }, null, 8, ["icon"])
    ])) : _createCommentVNode35("v-if", true)
  ], 6);
}
_sfc_script88.render = render87;
_sfc_script88.__file = "packages/ui/src/NoticeBar/NoticeBar.vue";

// packages/ui/src/NoticeBar/index.ts
var install61 = withInstall(_sfc_script88);
var NoticeBar_default = _sfc_script88;

// vue:./Notify.vue
import { defineComponent as defineComponent70, toRef as toRef5 } from "vue";
import { resolveComponent as _resolveComponent46, createVNode as _createVNode32, mergeProps as _mergeProps10, createElementVNode as _createElementVNode59, Teleport as _Teleport6, openBlock as _openBlock87, createBlock as _createBlock35 } from "vue";
var _sfc_script89 = defineComponent70({
  name: "ak-notify",
  components: { NoticeBar: _sfc_script88 },
  props: {
    ...popupProps,
    closable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    icon: {
      type: [String, Object],
      validator: iconValidator
    },
    color: {
      type: String
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String
    }
  },
  emits: {
    ...popupEmits
  },
  setup(props, ctx) {
    const { addDelayTask, removeDelayTask } = useDelay(() => {
      popup.customCancel("auto", true);
    }, toRef5(props, "duration"));
    const popup = usePopup(props, ctx, {
      initialForbidScroll: false,
      afterCancel: removeDelayTask,
      afterShow: addDelayTask
    });
    return {
      ...popup
    };
  }
});
function render88(_ctx, _cache) {
  const _component_NoticeBar = _resolveComponent46("NoticeBar");
  return _openBlock87(), _createBlock35(_Teleport6, { to: "body" }, [
    _createElementVNode59("div", _mergeProps10({
      class: ["ak-notify", _ctx.popupClasses],
      style: _ctx.popupStyles
    }, _ctx.$attrs), [
      _createVNode32(_component_NoticeBar, {
        class: "ak-notify_inner",
        type: _ctx.type,
        leftIcon: _ctx.icon,
        title: _ctx.title,
        color: _ctx.color,
        mode: _ctx.closable ? "closable" : "default",
        onCloseClick: _ctx.onCloseClick
      }, null, 8, ["type", "leftIcon", "title", "color", "mode", "onCloseClick"])
    ], 16)
  ]);
}
_sfc_script89.render = render88;
_sfc_script89.__file = "packages/ui/src/Notify/Notify.vue";

// packages/ui/src/Notify/index.ts
var showNotify = createShowPopup({
  apiName: "showNotify",
  component: _sfc_script89,
  createHook: createAlertHook,
  singleMode: true,
  hookOptions: (options) => {
    if (options.duration == null) {
      options.duration = 1500;
    }
    return options;
  }
});
var hideNotify = createHidePopup({
  apiName: "hideNotify"
});
var Notify_default = _sfc_script89;
var install62 = withInstall(_sfc_script89);

// vue:./NumberKeyboard.vue
import { computed as computed41, defineComponent as defineComponent71 } from "vue";

// vue:./BackspaceOutlined.vue
import { createElementVNode as _createElementVNode60, openBlock as _openBlock88, createElementBlock as _createElementBlock76 } from "vue";
var _sfc_script90 = {};
var _hoisted_168 = {
  viewBox: "0 0 1024 1024",
  "enable-background": "new 0 0 1024 1024",
  focusable: "false"
};
var _hoisted_251 = /* @__PURE__ */ _createElementVNode60("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M898,264H336.7L113.6,512l223.2,248H898V264z M336.7,202.1c-17.6,0-34.3,7.5-46.1,20.5l-223.2,248c-21.2,23.6-21.2,59.4,0,82.9l223.2,248c11.8,13.1,28.5,20.5,46.1,20.5H898c34.2,0,62-27.8,62-62V264c0-34.2-27.8-62-62-62H336.7z"
}, null, -1);
var _hoisted_342 = /* @__PURE__ */ _createElementVNode60("path", { d: "M743.7,376.7c0-3.7-3-6.7-6.7-6.7l-55.1,0.3l-83,99l-82.9-98.9l-55.2-0.3c-3.7,0-6.7,2.9-6.7,6.7c0,1.6,0.6,3.1,1.6,4.3l108.7,129.5L455.6,640c-1,1.3-1.6,2.8-1.6,4.3c0,3.7,3,6.7,6.7,6.7l55.2-0.3l82.9-99l82.9,98.9l55.1,0.3c3.7,0,6.7-2.9,6.7-6.7c0-1.6-0.6-3.1-1.6-4.3L633.5,510.5L742.2,381C743.2,379.9,743.7,378.3,743.7,376.7z" }, null, -1);
var _hoisted_417 = [
  _hoisted_251,
  _hoisted_342
];
function render89(_ctx, _cache) {
  return _openBlock88(), _createElementBlock76("svg", _hoisted_168, _hoisted_417);
}
_sfc_script90.render = render89;
_sfc_script90.__file = "packages/ui/src/Icon/icons/BackspaceOutlined/BackspaceOutlined.vue";

// vue:./KeyboardOutlined.vue
import { createElementVNode as _createElementVNode61, openBlock as _openBlock89, createElementBlock as _createElementBlock77, createStaticVNode as _createStaticVNode } from "vue";
var _sfc_script91 = {};
var _hoisted_169 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_252 = /* @__PURE__ */ _createStaticVNode('<path d="M903.94,800.26H119.06A56.13,56.13,0,0,1,63,744.2V295.69a56.13,56.13,0,0,1,56.06-56.07H903.94A56.13,56.13,0,0,1,960,295.69V744.2A56.13,56.13,0,0,1,903.94,800.26ZM119.06,295.69h0l0,448.51H903.94V295.69Z"></path><rect x="203.15" y="379.78" width="56.06" height="56.06" rx="14.02"></rect><rect x="315.28" y="379.78" width="56.06" height="56.06" rx="14.02"></rect><rect x="427.4" y="379.78" width="56.06" height="56.06" rx="14.02"></rect><rect x="539.53" y="379.78" width="56.06" height="56.06" rx="14.02"></rect><rect x="651.65" y="379.78" width="56.06" height="56.06" rx="14.02"></rect><rect x="763.78" y="379.78" width="56.06" height="56.06" rx="14.02"></rect><rect x="259.21" y="491.91" width="56.06" height="56.06" rx="14.02"></rect><rect x="371.34" y="491.91" width="56.06" height="56.06" rx="14.02"></rect><rect x="483.46" y="491.91" width="56.06" height="56.06" rx="14.02"></rect><rect x="595.59" y="491.91" width="56.06" height="56.06" rx="14.02"></rect><rect x="707.71" y="491.91" width="56.06" height="56.06" rx="14.02"></rect><rect x="203.15" y="604.03" width="56.06" height="56.06" rx="14.02"></rect><rect x="315.28" y="604.03" width="392.44" height="56.06" rx="14.02"></rect><rect x="763.78" y="604.03" width="56.06" height="56.06" rx="14.02"></rect><path d="M512,912.38l-60.69-84.1H572.69Z"></path>', 16);
var _hoisted_182 = [
  _hoisted_252
];
function render90(_ctx, _cache) {
  return _openBlock89(), _createElementBlock77("svg", _hoisted_169, _hoisted_182);
}
_sfc_script91.render = render90;
_sfc_script91.__file = "packages/ui/src/Icon/icons/KeyboardOutlined/KeyboardOutlined.vue";

// packages/ui/src/NumberKeyboard/util.ts
var KEYBOARD_TYPES = ["default", "rightColumn"];
var getBodyClasses = ({ type, title }, showHeaderConfirm) => [
  "ak-number-keyboard_body",
  `type--${getEnumsValue(KEYBOARD_TYPES, type)}`,
  { "has--header": showHeaderConfirm || title }
];
var isShowHeaderConfirm = ({
  type,
  customKey
}) => type !== "rightColumn" && (isString(customKey) || isStringArray(customKey) && customKey.length > 0);

// vue:./NumberKeyboard.vue
import { renderList as _renderList15, Fragment as _Fragment16, openBlock as _openBlock90, createElementBlock as _createElementBlock78, resolveComponent as _resolveComponent47, createBlock as _createBlock36, createCommentVNode as _createCommentVNode36, toDisplayString as _toDisplayString33, createTextVNode as _createTextVNode15, createElementVNode as _createElementVNode62, normalizeClass as _normalizeClass42, createVNode as _createVNode33, withModifiers as _withModifiers6, withCtx as _withCtx22 } from "vue";
var _sfc_script92 = defineComponent71({
  name: "ak-number-keyboard",
  components: { Drawer: _sfc_script10, Icon: _sfc_script2 },
  props: {
    ...popupExtendProps,
    modelValue: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "default"
    },
    customKey: {
      type: [Array, String],
      default: () => []
    }
  },
  emits: {
    ...popupEmits,
    ...formStringValueEmits,
    delete: (payload) => payload && isString(payload.deleteKey),
    close: (payload) => payload && isString(payload.source)
  },
  setup(props, ctx) {
    const { locale } = useLocale();
    const { emit } = ctx;
    let valueCache = "";
    const backspaceItem = {
      text: "backspace",
      type: "backspace",
      icon: _sfc_script90
    };
    const popup = usePopupExtend(ctx);
    const onVisibleStateChange2 = (e) => {
      popup.onVisibleStateChange(e);
      if (e.state === "show") {
        valueCache = typeof props.modelValue === "string" && props.modelValue || "";
      }
    };
    const showHeaderConfirm = computed41(() => isShowHeaderConfirm({
      type: props.type,
      customKey: props.customKey
    }));
    const bodyClasses = computed41(() => getBodyClasses({
      type: props.type,
      title: props.title
    }, showHeaderConfirm.value));
    const numberList = computed41(() => {
      const list = [];
      for (let i = 1; i <= 9; i++) {
        list.push({
          text: i.toString(),
          type: "text"
        });
      }
      const customKey = typeof props.customKey === "string" ? [props.customKey] : isStringArray(props.customKey) ? props.customKey : [];
      if (props.type === "rightColumn") {
        if (customKey.length > 1) {
          list.push({
            text: customKey[0],
            type: "text"
          }, { text: "0", type: "text" }, {
            text: customKey[1],
            type: "text"
          });
        } else if (customKey.length > 0) {
          list.push({ text: "0", type: "text", span: 2 }, {
            text: customKey[0],
            type: "text"
          });
        } else {
          list.push({ text: "0", type: "text", span: 3 });
        }
      } else {
        if (customKey.length > 0) {
          list.push({
            text: customKey[0],
            type: "text"
          }, { text: "0", type: "text" });
        } else {
          list.push({
            text: "confirm",
            type: "confirm",
            icon: _sfc_script91
          }, { text: "0", type: "text" });
        }
        list.push(backspaceItem);
      }
      return list;
    });
    function onNumberClick(item) {
      if (item.type === "text") {
        valueCache += item.text;
        emit("input", item.text);
        emit("update:modelValue", valueCache);
      } else if (item.type === "backspace") {
        const deleteKey = valueCache.substr(-1);
        valueCache = valueCache.substr(0, valueCache.length - 1);
        emit("delete", {
          deleteKey
        });
        emit("update:modelValue", valueCache);
      } else if (item.type === "confirm") {
        popup.customConfirm({});
      }
    }
    function onConfirmClick() {
      popup.customConfirm({});
    }
    function onConfirm() {
      close("confirm");
    }
    const onCancel = (res) => {
      close(res.source);
    };
    function close(source) {
      emit("change", valueCache);
      valueCache = "";
      emit("close", {
        source
      });
    }
    return {
      ...popup,
      noop,
      onVisibleStateChange2,
      showHeaderConfirm,
      bodyClasses,
      numberList,
      onNumberClick,
      onConfirmClick,
      onConfirm,
      onCancel,
      backspaceItem,
      locale,
      BackspaceOutlined: _sfc_script90
    };
  }
});
var _hoisted_170 = { class: "ak-number-keyboard_list" };
var _hoisted_253 = ["onClick"];
var _hoisted_343 = {
  key: 0,
  class: "ak-number-keyboard_right-column"
};
var _hoisted_418 = { class: "ak-number-keyboard_backspace" };
var _hoisted_59 = { class: "ak-number-keyboard_confirm" };
function render91(_ctx, _cache) {
  const _component_Icon = _resolveComponent47("Icon");
  const _component_Drawer = _resolveComponent47("Drawer");
  return _openBlock90(), _createBlock36(_component_Drawer, {
    class: "ak-number-keyboard",
    placement: "bottom",
    visible: _ctx.visible,
    showMask: false,
    title: _ctx.title,
    showClose: _ctx.showHeaderConfirm,
    onVisibleStateChange: _ctx.onVisibleStateChange2,
    onCancel: _ctx.onCancel,
    onConfirm: _ctx.onConfirm,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx22(() => [
      _createElementVNode62("div", {
        onClick: _cache[2] || (_cache[2] = _withModifiers6((...args) => _ctx.noop && _ctx.noop(...args), ["stop"]))
      }, [
        _createElementVNode62("div", {
          class: _normalizeClass42(_ctx.bodyClasses)
        }, [
          _createElementVNode62("ul", _hoisted_170, [
            (_openBlock90(true), _createElementBlock78(_Fragment16, null, _renderList15(_ctx.numberList, (item, index) => {
              return _openBlock90(), _createElementBlock78("li", {
                class: _normalizeClass42(["ak-number-keyboard_item", ["span-" + (item.span || 1)]]),
                key: index
              }, [
                _createElementVNode62("div", {
                  class: "ak-number-keyboard_button",
                  onClick: ($event) => _ctx.onNumberClick(item)
                }, [
                  item.icon ? (_openBlock90(), _createBlock36(_component_Icon, {
                    key: 0,
                    icon: item.icon
                  }, null, 8, ["icon"])) : (_openBlock90(), _createElementBlock78(_Fragment16, { key: 1 }, [
                    _createTextVNode15(_toDisplayString33(item.text), 1)
                  ], 2112))
                ], 8, _hoisted_253)
              ], 2);
            }), 128))
          ]),
          _ctx.type === "rightColumn" ? (_openBlock90(), _createElementBlock78("div", _hoisted_343, [
            _createElementVNode62("div", _hoisted_418, [
              _createElementVNode62("div", {
                class: "ak-number-keyboard_button",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onNumberClick(_ctx.backspaceItem))
              }, [
                _createVNode33(_component_Icon, { icon: _ctx.BackspaceOutlined }, null, 8, ["icon"])
              ])
            ]),
            _createElementVNode62("div", _hoisted_59, [
              _createElementVNode62("div", {
                class: "ak-number-keyboard_confirm-button",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirmClick && _ctx.onConfirmClick(...args))
              }, _toDisplayString33(_ctx.locale.numberKeyboardConfirmText), 1)
            ])
          ])) : _createCommentVNode36("v-if", true)
        ], 2)
      ])
    ]),
    _: 1
  }, 8, ["visible", "title", "showClose", "onVisibleStateChange", "onCancel", "onConfirm", "onUpdate:visible"]);
}
_sfc_script92.render = render91;
_sfc_script92.__file = "packages/ui/src/NumberKeyboard/NumberKeyboard.vue";

// packages/ui/src/NumberKeyboard/index.ts
var install63 = withInstall(_sfc_script92);
var NumberKeyboard_default = _sfc_script92;

// vue:./Pagination.vue
import { computed as computed42, defineComponent as defineComponent72, ref as ref39, watch as watch28 } from "vue";

// packages/ui/src/Pagination/util.ts
var getTotal = (total) => Math.max(getNumber(total, 1), 1);

// vue:./Pagination.vue
import { renderSlot as _renderSlot42, resolveComponent as _resolveComponent48, createVNode as _createVNode34, createElementVNode as _createElementVNode63, toDisplayString as _toDisplayString34, createTextVNode as _createTextVNode16, openBlock as _openBlock91, createElementBlock as _createElementBlock79 } from "vue";
var _sfc_script93 = defineComponent72({
  name: "ak-pagination",
  components: { Icon: _sfc_script2 },
  props: {
    current: {
      type: [Number, String]
    },
    total: {
      type: [Number, String],
      default: 1
    }
  },
  emits: {
    "update:current": (current) => isNumber(current),
    change: (current) => isNumber(current)
  },
  setup(props, { emit }) {
    const pageNum = ref39(-1);
    const totalNum = computed42(() => getTotal(props.total));
    function change(newPageNum) {
      pageNum.value = newPageNum;
      emit("update:current", newPageNum);
      emit("change", newPageNum);
    }
    function onClick(type) {
      const newPageNum = rangeInteger(type === "next" ? pageNum.value + 1 : pageNum.value - 1, 1, totalNum.value);
      change(newPageNum);
    }
    watch28(() => props.current, () => {
      if (isNumeric(props.current)) {
        pageNum.value = rangeInteger(props.current, 1, totalNum.value);
      } else if (pageNum.value === -1) {
        change(1);
      }
    }, {
      immediate: true
    });
    return { onClick, LeftOutlined: _sfc_script6, RightOutlined: _sfc_script25, pageNum, totalNum };
  }
});
var _hoisted_171 = { class: "ak-pagination" };
var _hoisted_254 = ["disabled"];
var _hoisted_344 = { class: "ak-pagination_content" };
var _hoisted_419 = ["disabled"];
function render92(_ctx, _cache) {
  const _component_Icon = _resolveComponent48("Icon");
  return _openBlock91(), _createElementBlock79("div", _hoisted_171, [
    _createElementVNode63("button", {
      class: "ak-pagination_prev",
      disabled: _ctx.pageNum <= 1,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClick("prev"))
    }, [
      _renderSlot42(_ctx.$slots, "prev", {}, () => [
        _createVNode34(_component_Icon, { icon: _ctx.LeftOutlined }, null, 8, ["icon"])
      ])
    ], 8, _hoisted_254),
    _createElementVNode63("div", _hoisted_344, [
      _renderSlot42(_ctx.$slots, "default", {
        current: _ctx.current,
        total: _ctx.totalNum
      }, () => [
        _createTextVNode16(_toDisplayString34(_ctx.pageNum) + " / " + _toDisplayString34(_ctx.totalNum), 1)
      ])
    ]),
    _createElementVNode63("button", {
      class: "ak-pagination_next",
      disabled: _ctx.pageNum >= _ctx.totalNum,
      onClick: _cache[1] || (_cache[1] = ($event) => _ctx.onClick("next"))
    }, [
      _renderSlot42(_ctx.$slots, "next", {}, () => [
        _createVNode34(_component_Icon, { icon: _ctx.RightOutlined }, null, 8, ["icon"])
      ])
    ], 8, _hoisted_419)
  ]);
}
_sfc_script93.render = render92;
_sfc_script93.__file = "packages/ui/src/Pagination/Pagination.vue";

// packages/ui/src/Pagination/index.ts
var install64 = withInstall(_sfc_script93);
var Pagination_default = _sfc_script93;

// packages/ui/src/PickerPopup/index.ts
var PickerPopup_default = _sfc_script56;
var install65 = withInstall(_sfc_script56);

// packages/ui/src/PickerView/index.ts
var install66 = withInstall(_sfc_script55);
var PickerView_default = _sfc_script55;

// vue:./PopDialog.vue
import { defineComponent as defineComponent74 } from "vue";

// packages/ui/src/Popover/props.ts
var popoverProps = {
  ...popupProps,
  selector: {
    type: [String, Object],
    validator: selectorValidator,
    required: true
  },
  placement: {
    type: String,
    validator: createEnumsValidator(PLACEMENT_TYPES),
    default: getEnumsValue(PLACEMENT_TYPES)
  },
  showMask: {
    type: Boolean,
    default: true
  }
};
var popoverEmits = { ...popupEmits };

// vue:./Popover.vue
import { computed as computed43, defineComponent as defineComponent73, nextTick as nextTick9, onMounted as onMounted29, ref as ref40, watch as watch29 } from "vue";

// packages/ui/src/Popover/util.ts
var DEFAULT_POS = {
  t: null,
  r: null,
  b: null,
  l: null,
  at: null,
  ar: null,
  ab: null,
  al: null
};
var getDefaultPos = () => cloneData(DEFAULT_POS);
var padding = 8;
var getInnerStyles3 = (isShow, showPos) => {
  const { clientWidth: dw, clientHeight: dh } = document.documentElement;
  const styles = {
    maxWidth: dw - padding * 2 + "px",
    maxHeight: dh - padding * 2 + "px"
  };
  if (!isShow) {
    return styles;
  }
  showPos.t != null && (styles.top = showPos.t + "px");
  showPos.r != null && (styles.right = showPos.r + "px");
  showPos.b != null && (styles.bottom = showPos.b + "px");
  showPos.l != null && (styles.left = showPos.l + "px");
  return styles;
};
var getArrowStyles = (isShow, showPos) => {
  if (!isShow) {
    return { left: "200vw", top: "200vh" };
  }
  const styles = {};
  showPos.at != null && (styles.top = showPos.at + "px");
  showPos.ar != null && (styles.right = showPos.ar + "px");
  showPos.ab != null && (styles.bottom = showPos.ab + "px");
  showPos.al != null && (styles.left = showPos.al + "px");
  return styles;
};
var getShowPos = (container, innerEl, _placement) => {
  const placement = getEnumsValue(PLACEMENT_TYPES, _placement);
  const rect = container.getBoundingClientRect();
  const { clientWidth: dw, clientHeight: dh } = document.documentElement;
  const cssText = innerEl.style.cssText;
  innerEl.style.cssText = "";
  innerEl.style.maxWidth = dw - padding * 2 + "px";
  innerEl.style.maxHeight = dh - padding * 2 + "px";
  const { clientWidth: iw, clientHeight: ih } = innerEl;
  innerEl.style.cssText = cssText;
  const pos = getDefaultPos();
  if (placement === "top" || placement === "bottom") {
    pos.al = rect.left + rect.width / 2 - 5;
    pos.l = rect.left + rect.width / 2 - iw / 2;
    if (pos.l < padding) {
      pos.l = padding;
    } else if (pos.l + iw > dw - padding) {
      pos.l -= pos.l + iw - (dw - padding);
    }
    pos.al = pos.al - pos.l;
    if (placement === "bottom") {
      pos.at = -4;
      pos.t = rect.bottom + 7;
    } else {
      pos.ab = -4;
      pos.b = dh - rect.top + 7;
    }
  } else {
    pos.at = rect.top + rect.height / 2 - 5;
    pos.t = rect.top + rect.height / 2 - ih / 2;
    if (pos.t < padding) {
      pos.t = padding;
    } else if (pos.t + ih > dh - padding) {
      pos.t -= pos.t + ih - (dh - padding);
    }
    pos.at = pos.at - pos.t;
    if (placement === "right") {
      pos.al = -4;
      pos.l = rect.right + 7;
    } else {
      pos.ar = -4;
      pos.r = dw - rect.left + 7;
    }
  }
  return pos;
};

// vue:./Popover.vue
import { createElementVNode as _createElementVNode64, normalizeStyle as _normalizeStyle21, renderSlot as _renderSlot43, toDisplayString as _toDisplayString35, mergeProps as _mergeProps11, Teleport as _Teleport7, openBlock as _openBlock92, createBlock as _createBlock37 } from "vue";
var _sfc_script94 = defineComponent73({
  name: "ak-popover",
  props: {
    ...popoverProps,
    content: {
      type: String,
      default: ""
    }
  },
  emits: { ...popoverEmits },
  setup(props, ctx) {
    const container = ref40();
    const innerEl = ref40();
    const isShow = ref40(false);
    const showPos = ref40(DEFAULT_POS);
    const popup = usePopup(props, ctx, {
      afterShow() {
        nextTick9(() => {
          isShow.value = true;
          updatePos("afterShow");
        });
      },
      afterHidden() {
        showPos.value = cloneData(DEFAULT_POS);
        isShow.value = false;
      },
      initialForbidScroll: true,
      initialEnableBlurCancel: false
    });
    function updatePos(source) {
      if (!container.value || !innerEl.value || !isShow.value) {
        return;
      }
      showPos.value = getShowPos(container.value, innerEl.value, props.placement);
    }
    const arrowStyles = computed43(() => getArrowStyles(isShow.value, showPos.value));
    const innerStyles = computed43(() => getInnerStyles3(isShow.value, showPos.value));
    watch29(() => props.showMask, (val) => {
      popup.setForbidScroll(!!val);
      popup.setEnableBlurCancel(!val);
    }, {
      immediate: true
    });
    watch29(() => props.selector, (val) => container.value = querySelector(val) || void 0);
    onMounted29(() => {
      container.value = querySelector(props.selector) || void 0;
      useResizeObserver(container, () => updatePos("container resize"));
      useResizeObserver(ref40(document.documentElement), () => {
        updatePos("window resize");
      });
    });
    const popoverClasses = computed43(() => [
      popup.popupClasses.value,
      { "no--mask": !props.showMask },
      "ak-popover"
    ]);
    return {
      ...popup,
      innerEl,
      arrowStyles,
      innerStyles,
      popoverClasses
    };
  }
});
var _hoisted_172 = { class: "ak-popover_content" };
var _hoisted_255 = { class: "ak-popover_text" };
function render93(_ctx, _cache) {
  return _openBlock92(), _createBlock37(_Teleport7, { to: "body" }, [
    _createElementVNode64("div", _mergeProps11({
      class: _ctx.popoverClasses,
      style: _ctx.popupStyles
    }, _ctx.$attrs), [
      _createElementVNode64("div", {
        class: "ak-mask",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onMaskClick && _ctx.onMaskClick(...args))
      }),
      _createElementVNode64("div", {
        class: "ak-popover_inner",
        ref: "innerEl",
        style: _normalizeStyle21(_ctx.innerStyles)
      }, [
        _createElementVNode64("i", {
          class: "ak-popover_arrow",
          style: _normalizeStyle21(_ctx.arrowStyles)
        }, null, 4),
        _createElementVNode64("div", _hoisted_172, [
          _renderSlot43(_ctx.$slots, "default", {}, () => [
            _createElementVNode64("div", _hoisted_255, _toDisplayString35(_ctx.content), 1)
          ])
        ])
      ], 4)
    ], 16)
  ]);
}
_sfc_script94.render = render93;
_sfc_script94.__file = "packages/ui/src/Popover/Popover.vue";

// packages/ui/src/Popover/index.ts
var showPopover = createShowPopup({
  apiName: "showPopover",
  component: _sfc_script94,
  createHook: createAlertHook
});
var Popover_default = _sfc_script94;
var install67 = withInstall(_sfc_script94);

// vue:./PopDialog.vue
import { toDisplayString as _toDisplayString36, createElementVNode as _createElementVNode65, createTextVNode as _createTextVNode17, resolveComponent as _resolveComponent49, withCtx as _withCtx23, openBlock as _openBlock93, createBlock as _createBlock38, createCommentVNode as _createCommentVNode37, createVNode as _createVNode35 } from "vue";
var _sfc_script95 = defineComponent74({
  name: "ak-pop-dialog",
  components: { Button: _sfc_script4, ButtonGroup: _sfc_script5, Popover: _sfc_script94 },
  props: {
    ...popoverProps,
    content: {
      type: String,
      default: "",
      required: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String
    },
    confirmText: {
      type: String
    }
  },
  emits: { ...popoverEmits },
  setup(props, ctx) {
    const { locale } = useLocale();
    const popup = usePopupExtend(ctx);
    function onConfirmClick() {
      popup.customConfirm({});
    }
    return {
      ...popup,
      onConfirmClick,
      locale
    };
  }
});
var _hoisted_173 = { class: "ak-pop-dialog_body" };
var _hoisted_256 = { class: "ak-popover_text" };
var _hoisted_345 = { class: "ak-pop-dialog_footer ak-horizontal-hairline" };
function render94(_ctx, _cache) {
  const _component_Button = _resolveComponent49("Button");
  const _component_ButtonGroup = _resolveComponent49("ButtonGroup");
  const _component_Popover = _resolveComponent49("Popover");
  return _openBlock93(), _createBlock38(_component_Popover, {
    class: "ak-pop-dialog",
    visible: _ctx.visible,
    selector: _ctx.selector,
    placement: _ctx.placement,
    showMask: _ctx.showMask,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onConfirm: _ctx.onConfirm,
    onCancel: _ctx.onCancel,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx23(() => [
      _createElementVNode65("div", _hoisted_173, [
        _createElementVNode65("div", _hoisted_256, _toDisplayString36(_ctx.content), 1)
      ]),
      _createElementVNode65("div", _hoisted_345, [
        _createVNode35(_component_ButtonGroup, {
          class: "ak-pop-dialog_footer-inner",
          pattern: "borderless",
          size: "middle"
        }, {
          default: _withCtx23(() => [
            _ctx.showCancel ? (_openBlock93(), _createBlock38(_component_Button, {
              key: 0,
              type: "default",
              onClick: _ctx.onCancelClick
            }, {
              default: _withCtx23(() => [
                _createTextVNode17(_toDisplayString36(_ctx.cancelText || _ctx.locale.popDialogCancelText), 1)
              ]),
              _: 1
            }, 8, ["onClick"])) : _createCommentVNode37("v-if", true),
            _createVNode35(_component_Button, {
              type: "primary",
              onClick: _ctx.onConfirmClick
            }, {
              default: _withCtx23(() => [
                _createTextVNode17(_toDisplayString36(_ctx.confirmText || _ctx.locale.popDialogConfirmText), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })
      ])
    ]),
    _: 1
  }, 8, ["visible", "selector", "placement", "showMask", "onVisibleStateChange", "onConfirm", "onCancel", "onUpdate:visible"]);
}
_sfc_script95.render = render94;
_sfc_script95.__file = "packages/ui/src/PopDialog/PopDialog.vue";

// packages/ui/src/PopDialog/index.ts
var showPopDialog = createShowPopup({
  apiName: "showPopDialog",
  component: _sfc_script95,
  createHook: createConfirmHook
});
var PopDialog_default = _sfc_script95;
var install68 = withInstall(_sfc_script95);

// vue:./PopMenu.vue
import { computed as computed44, defineComponent as defineComponent75 } from "vue";

// packages/ui/src/PopMenu/util.ts
var getOptions2 = (options) => {
  const newOptions = [];
  if (Array.isArray(options)) {
    options.forEach((v) => {
      newOptions.push(isObject(v) ? {
        icon: v.icon || void 0,
        name: v.name,
        disabled: !!v.disabled
      } : {
        icon: void 0,
        name: v.toString(),
        disabled: false
      });
    });
  }
  return newOptions;
};
var getItemClasses5 = (option) => {
  return [
    "ak-pop-menu_item",
    "ak-horizontal-hairline",
    { disabled: !!option.disabled, "has--icon": !!option.icon }
  ];
};

// vue:./PopMenu.vue
import { renderList as _renderList16, Fragment as _Fragment17, openBlock as _openBlock94, createElementBlock as _createElementBlock80, resolveComponent as _resolveComponent50, createBlock as _createBlock39, createCommentVNode as _createCommentVNode38, toDisplayString as _toDisplayString37, createElementVNode as _createElementVNode66, normalizeClass as _normalizeClass43, withCtx as _withCtx24 } from "vue";
var _sfc_script96 = defineComponent75({
  name: "ak-pop-menu",
  components: { Icon: _sfc_script2, Popover: _sfc_script94 },
  props: {
    ...popoverProps,
    options: {
      type: Array
    }
  },
  emits: {
    ...popoverEmits,
    confirm: (payload) => payload && isNumber(payload.index) && payload.item && isString(payload.item.name)
  },
  setup(props, ctx) {
    const popup = usePopupExtend(ctx);
    function onItemClick(index) {
      var _a;
      const item = (_a = props.options) == null ? void 0 : _a[index];
      if (!item || item.disabled) {
        return;
      }
      popup.customConfirm({
        item: {
          name: item.name
        },
        index
      });
    }
    const options2 = computed44(() => getOptions2(props.options));
    return {
      ...popup,
      onItemClick,
      options2,
      getItemClasses: getItemClasses5
    };
  }
});
var _hoisted_174 = {
  key: 0,
  class: "ak-pop-menu_list ak-pop-menu_list"
};
var _hoisted_257 = ["onClick"];
var _hoisted_346 = { class: "ak-pop-menu_item-inner" };
function render95(_ctx, _cache) {
  const _component_Icon = _resolveComponent50("Icon");
  const _component_Popover = _resolveComponent50("Popover");
  return _openBlock94(), _createBlock39(_component_Popover, {
    class: "ak-pop-dialog",
    visible: _ctx.visible,
    selector: _ctx.selector,
    placement: _ctx.placement,
    showMask: _ctx.showMask,
    onVisibleStateChange: _ctx.onVisibleStateChange,
    onConfirm: _ctx.onConfirm,
    onCancel: _ctx.onCancel,
    "onUpdate:visible": _ctx.onUpdateVisible,
    ref: "popup"
  }, {
    default: _withCtx24(() => [
      _ctx.options2 && _ctx.options2.length > 0 ? (_openBlock94(), _createElementBlock80("ul", _hoisted_174, [
        (_openBlock94(true), _createElementBlock80(_Fragment17, null, _renderList16(_ctx.options2, (item, index) => {
          return _openBlock94(), _createElementBlock80("li", {
            class: _normalizeClass43(_ctx.getItemClasses(item)),
            key: index,
            onClick: ($event) => _ctx.onItemClick(index)
          }, [
            _createElementVNode66("div", _hoisted_346, [
              item.icon ? (_openBlock94(), _createBlock39(_component_Icon, {
                key: 0,
                icon: item.icon
              }, null, 8, ["icon"])) : _createCommentVNode38("v-if", true),
              _createElementVNode66("span", null, _toDisplayString37(item.name), 1)
            ])
          ], 10, _hoisted_257);
        }), 128))
      ])) : _createCommentVNode38("v-if", true)
    ]),
    _: 1
  }, 8, ["visible", "selector", "placement", "showMask", "onVisibleStateChange", "onConfirm", "onCancel", "onUpdate:visible"]);
}
_sfc_script96.render = render95;
_sfc_script96.__file = "packages/ui/src/PopMenu/PopMenu.vue";

// packages/ui/src/PopMenu/index.ts
var showPopMenu = createShowPopup({
  apiName: "showPopMenu",
  component: _sfc_script96,
  createHook: createConfirmHook
});
var PopMenu_default = _sfc_script96;
var install69 = withInstall(_sfc_script96);

// vue:./Price.vue
import { defineComponent as defineComponent76, computed as computed45 } from "vue";

// packages/ui/src/Price/util.ts
var getPrice = (props) => {
  const decimalDigits = getNumber(props.decimalDigits, 2);
  let priceStr = Number(0).toFixed(decimalDigits);
  if (isNumeric(props.price)) {
    priceStr = parseFloat(props.price).toFixed(decimalDigits);
  }
  if (props.thousands) {
    priceStr = thousands(priceStr);
  }
  return priceStr;
};

// vue:./Price.vue
import { renderSlot as _renderSlot44, toDisplayString as _toDisplayString38, openBlock as _openBlock95, createElementBlock as _createElementBlock81, createCommentVNode as _createCommentVNode39, createElementVNode as _createElementVNode67 } from "vue";
var _sfc_script97 = defineComponent76({
  name: "ak-price",
  props: {
    price: {
      type: [Number, String],
      validator: isNumeric,
      default: 0,
      required: true
    },
    symbol: {
      type: String,
      default: null
    },
    thousands: {
      type: Boolean,
      default: false
    },
    decimalDigits: {
      type: [Number, String],
      default: 2
    }
  },
  setup(props) {
    const priceStr = computed45(() => getPrice(props));
    return {
      priceStr
    };
  }
});
var _hoisted_175 = { class: "ak-price" };
var _hoisted_258 = {
  key: 0,
  class: "ak-price_symbol"
};
var _hoisted_347 = { class: "ak-price_integer" };
var _hoisted_420 = {
  key: 1,
  class: "ak-price_decimal"
};
function render96(_ctx, _cache) {
  return _openBlock95(), _createElementBlock81("div", _hoisted_175, [
    _renderSlot44(_ctx.$slots, "default"),
    _ctx.symbol ? (_openBlock95(), _createElementBlock81("span", _hoisted_258, _toDisplayString38(_ctx.symbol), 1)) : _createCommentVNode39("v-if", true),
    _createElementVNode67("span", _hoisted_347, _toDisplayString38(_ctx.priceStr.split(".")[0]), 1),
    _ctx.decimalDigits > 0 ? (_openBlock95(), _createElementBlock81("span", _hoisted_420, "." + _toDisplayString38(_ctx.priceStr.split(".")[1]), 1)) : _createCommentVNode39("v-if", true)
  ]);
}
_sfc_script97.render = render96;
_sfc_script97.__file = "packages/ui/src/Price/Price.vue";

// packages/ui/src/Price/index.ts
var install70 = withInstall(_sfc_script97);
var Price_default = _sfc_script97;

// vue:./Progress.vue
import { computed as computed46, defineComponent as defineComponent77 } from "vue";

// packages/ui/src/Progress/util.ts
var getClasses16 = (fixedBar) => [
  "ak-progress",
  { "fixed-bar": !!fixedBar }
];
var getTrackClasses = (animated) => [
  "ak-progress_track",
  { animated: !!animated }
];
var getTrackStyles = (progress) => {
  return { width: progress };
};
var getStyles7 = (color) => {
  const styles = {};
  color && (styles["--ak-color"] = color);
  return styles;
};
var getProgress = (percentage) => rangeInteger(percentage, 0, 100) + "%";

// vue:./Progress.vue
import { normalizeClass as _normalizeClass44, normalizeStyle as _normalizeStyle22, createElementVNode as _createElementVNode68, renderSlot as _renderSlot45, toDisplayString as _toDisplayString39, createTextVNode as _createTextVNode18, openBlock as _openBlock96, createElementBlock as _createElementBlock82, createCommentVNode as _createCommentVNode40 } from "vue";
var _sfc_script98 = defineComponent77({
  name: "ak-progress",
  props: {
    percentage: {
      type: [Number, String],
      validator: (val) => {
        return isNumeric(val) && parseFloat(val) >= 0 && parseFloat(val) <= 100;
      },
      default: 0,
      required: true
    },
    showText: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    fixedBar: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const progress = computed46(() => getProgress(props.percentage));
    const classes = computed46(() => getClasses16(props.fixedBar));
    const styles = computed46(() => getStyles7(props.color));
    const trackClasses = computed46(() => getTrackClasses(props.animated));
    const trackStyles = computed46(() => getTrackStyles(progress.value));
    return {
      progress,
      classes,
      styles,
      trackClasses,
      trackStyles
    };
  }
});
var _hoisted_176 = { class: "ak-progress_bar" };
var _hoisted_259 = {
  key: 0,
  class: "ak-progress_text"
};
function render97(_ctx, _cache) {
  return _openBlock96(), _createElementBlock82("div", {
    class: _normalizeClass44(_ctx.classes),
    style: _normalizeStyle22(_ctx.styles)
  }, [
    _createElementVNode68("div", _hoisted_176, [
      _createElementVNode68("div", {
        class: _normalizeClass44(_ctx.trackClasses),
        style: _normalizeStyle22(_ctx.trackStyles)
      }, null, 6)
    ]),
    _ctx.$slots.default || _ctx.showText ? (_openBlock96(), _createElementBlock82("div", _hoisted_259, [
      _renderSlot45(_ctx.$slots, "default", { progress: _ctx.progress }, () => [
        _createTextVNode18(_toDisplayString39(_ctx.showText ? _ctx.progress : ""), 1)
      ])
    ])) : _createCommentVNode40("v-if", true)
  ], 6);
}
_sfc_script98.render = render97;
_sfc_script98.__file = "packages/ui/src/Progress/Progress.vue";

// packages/ui/src/Progress/index.ts
var install71 = withInstall(_sfc_script98);
var Progress_default = _sfc_script98;

// vue:./Radio.vue
import { defineComponent as defineComponent78 } from "vue";
import { createElementVNode as _createElementVNode69, resolveComponent as _resolveComponent51, createVNode as _createVNode36, renderSlot as _renderSlot46, openBlock as _openBlock97, createElementBlock as _createElementBlock83, createCommentVNode as _createCommentVNode41, normalizeClass as _normalizeClass45, normalizeStyle as _normalizeStyle23 } from "vue";
var _sfc_script99 = defineComponent78({
  name: "ak-radio",
  components: { Icon: _sfc_script2 },
  props: {
    ...checkProps
  },
  emits: { ...checkEmits },
  setup(props, ctx) {
    return {
      ...useCheck(props, ctx, "radio"),
      CircleOutlined: _sfc_script40,
      CheckCircleFilled: _sfc_script41
    };
  }
});
var _hoisted_177 = ["name", "value", "disabled"];
var _hoisted_260 = { class: "ak-radio_box" };
var _hoisted_348 = {
  key: 0,
  class: "ak-radio_text"
};
function render98(_ctx, _cache) {
  const _component_Icon = _resolveComponent51("Icon");
  return _openBlock97(), _createElementBlock83("label", {
    class: _normalizeClass45(["ak-radio", _ctx.classes]),
    style: _normalizeStyle23(_ctx.styles)
  }, [
    _createElementVNode69("input", {
      class: "ak-radio_input ak-form-input",
      type: "radio",
      name: _ctx.name2,
      value: _ctx.value,
      disabled: _ctx.disabled2,
      onChange: _cache[0] || (_cache[0] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
      ref: "input"
    }, null, 40, _hoisted_177),
    _createElementVNode69("div", _hoisted_260, [
      _createVNode36(_component_Icon, {
        class: "ak-radio_icon",
        icon: _ctx.CircleOutlined
      }, null, 8, ["icon"]),
      _createVNode36(_component_Icon, {
        class: "ak-radio_checked-icon",
        icon: _ctx.CheckCircleFilled
      }, null, 8, ["icon"]),
      _ctx.$slots.default ? (_openBlock97(), _createElementBlock83("span", _hoisted_348, [
        _renderSlot46(_ctx.$slots, "default")
      ])) : _createCommentVNode41("v-if", true)
    ])
  ], 6);
}
_sfc_script99.render = render98;
_sfc_script99.__file = "packages/ui/src/Radio/Radio.vue";

// vue:./RadioGroup.vue
import { defineComponent as defineComponent79, ref as ref41 } from "vue";
import { renderSlot as _renderSlot47, renderList as _renderList17, Fragment as _Fragment18, openBlock as _openBlock98, createElementBlock as _createElementBlock84, toDisplayString as _toDisplayString40, createTextVNode as _createTextVNode19, resolveComponent as _resolveComponent52, withCtx as _withCtx25, createBlock as _createBlock40, normalizeClass as _normalizeClass46 } from "vue";
var isValue4 = (value) => isStringNumberMix(value);
var _sfc_script100 = defineComponent79({
  name: "ak-radio-group",
  components: { Radio: _sfc_script99 },
  props: {
    ...checkGroupProps,
    modelValue: {
      type: [Number, String],
      validator: isValue4,
      default: null
    }
  },
  emits: {
    "update:modelValue": isValue4,
    change: isValue4
  },
  setup(props, ctx) {
    const inputValue = ref41("");
    const { emit } = ctx;
    const group = useCheckGroup(props, {
      name: "radio",
      updateValue({ isChange, uid: uid3, children }) {
        let hasChecked = false;
        let value = "";
        children.forEach((child) => {
          const checked = uid3 ? uid3 === child.uid : child.getInputChecked();
          if (!hasChecked && checked) {
            hasChecked = true;
            value = child.getValue();
            child.setChecked(true);
          } else {
            child.setChecked(false);
          }
        });
        inputValue.value = value;
        if (isChange && inputValue.value !== props.modelValue) {
          emit("update:modelValue", value);
        }
        if (isChange) {
          emit("change", value);
        }
        return value;
      },
      watchValue({ children, value }) {
        let hasChecked = false;
        children.forEach((child) => {
          if (!hasChecked && child.getValue() === value) {
            hasChecked = true;
            inputValue.value = value;
            child.setChecked(true);
          } else {
            child.setChecked(false);
          }
        });
      }
    });
    return {
      ...group
    };
  }
});
function render99(_ctx, _cache) {
  const _component_Radio = _resolveComponent52("Radio");
  return _openBlock98(), _createElementBlock84("div", {
    class: _normalizeClass46(["ak-radio-group", _ctx.classes]),
    ref: "root"
  }, [
    _renderSlot47(_ctx.$slots, "default", {}, () => [
      (_openBlock98(true), _createElementBlock84(_Fragment18, null, _renderList17(_ctx.options2, (item) => {
        return _openBlock98(), _createBlock40(_component_Radio, {
          key: item.value,
          value: item.value
        }, {
          default: _withCtx25(() => [
            _createTextVNode19(_toDisplayString40(item.label), 1)
          ]),
          _: 2
        }, 1032, ["value"]);
      }), 128))
    ])
  ], 2);
}
_sfc_script100.render = render99;
_sfc_script100.__file = "packages/ui/src/Radio/RadioGroup.vue";

// packages/ui/src/Radio/index.ts
var Radio_default = _sfc_script99;
var install72 = multiWithInstall(_sfc_script99, [_sfc_script100]);

// packages/ui/src/RadioGroup/index.ts
var RadioGroup_default = _sfc_script100;
var install73 = withNoopInstall(_sfc_script100);

// vue:./Range.vue
import { defineComponent as defineComponent80, watch as watch30, nextTick as nextTick10, reactive as reactive7, computed as computed48 } from "vue";

// packages/ui/src/Slider/props.ts
var slideProps = {
  min: {
    type: [Number, String],
    validator: isNumeric,
    default: 0
  },
  max: {
    type: [Number, String],
    validator: isNumeric,
    default: 100
  },
  step: {
    type: [Number, String],
    validator: isNumeric,
    default: 1
  },
  showValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    validator: colorValidator
  }
};

// packages/ui/src/Slider/use-slide.ts
import { computed as computed47, ref as ref42 } from "vue";

// packages/ui/src/Slider/util.ts
var getSlideClasses = (disabled) => [
  "ak-slider",
  {
    disabled: !!disabled
  }
];
var getSlideStyles = (color) => {
  const styles = {};
  color && (styles["--ak-color"] = color);
  return styles;
};

// packages/ui/src/Slider/use-slide.ts
var thumbW = 24;
function useSlide(props, { move, end, getValue: getValue3 }) {
  const sliderEl = ref42();
  let coords;
  let tempValue = 0;
  function toInteger(number) {
    return Math.round(number);
  }
  function getMinMax() {
    let min = toInteger(getNumber(props.min, 0));
    let max = toInteger(getNumber(props.max, 100));
    if (min > max) {
      max = [min, min = max][0];
    }
    return [min, max];
  }
  function value2Progress(val) {
    const [min, max] = getMinMax();
    return (val - min) / (max - min);
  }
  function rangeValue(val) {
    const [min, max] = getMinMax();
    return rangeNumber(val, min, max);
  }
  function updateByX(x, { trackW, prevValue, $target }) {
    x = rangeNumber(x, 0, trackW);
    const [min, max] = getMinMax();
    const step2 = toInteger(getNumber(props.step, 1));
    let newVal = toInteger((max - min) * x / trackW + min);
    newVal = toInteger((newVal - prevValue) / step2) * step2 + prevValue;
    newVal = rangeNumber(newVal, min, max);
    tempValue = newVal;
    move({ value: tempValue, progress: value2Progress(newVal), $target });
  }
  useTouch({
    el: sliderEl,
    onTouchStart(e) {
      if (props.disabled) {
        return;
      }
      const { clientX } = e.touchObject;
      const $target = e.target;
      const trackRects = sliderEl.value.getClientRects()[0];
      const thumb = !!$target.dataset.thumb;
      coords = {
        prevValue: getValue3($target),
        thumb,
        thumbW,
        clientStartX: clientX,
        thumbXInTrack: getRelativeOffset($target, sliderEl.value).offsetLeft,
        trackX: trackRects.left,
        trackW: trackRects.width - thumbW,
        moved: false,
        $target
      };
      if (thumb) {
        addClassName($target, "active");
      }
      tempValue = coords.prevValue;
      e.preventDefault();
    },
    onTouchMove(e) {
      if (!coords) {
        return;
      }
      coords.moved = true;
      if (!coords.thumb) {
        return;
      }
      const { clientX } = e.touchObject;
      const { clientStartX, thumbXInTrack } = coords;
      updateByX(thumbXInTrack + clientX - clientStartX, coords);
      e.stopPropagation();
    },
    onTouchEnd(e) {
      if (coords) {
        if (!coords.thumb && !coords.moved) {
          updateByX(coords.clientStartX - coords.trackX - coords.thumbW / 2, coords);
        }
        if (coords.thumb) {
          removeClassName(coords.$target, "active");
        }
        end({
          value: tempValue,
          isChange: coords.prevValue !== tempValue,
          $target: coords.$target
        });
        coords = null;
        e.stopPropagation();
      }
    }
  });
  const slideClasses = computed47(() => getSlideClasses(props.disabled));
  const slideStyles = computed47(() => getSlideStyles(props.color));
  return {
    sliderEl,
    toInteger,
    rangeValue,
    value2Progress,
    getMinMax,
    slideClasses,
    slideStyles
  };
}

// vue:./Range.vue
import { normalizeStyle as _normalizeStyle24, createElementVNode as _createElementVNode70, toDisplayString as _toDisplayString41, normalizeClass as _normalizeClass47, openBlock as _openBlock99, createElementBlock as _createElementBlock85 } from "vue";
var isValue5 = (value) => isNumberArray(value);
var _sfc_script101 = defineComponent80({
  name: "ak-range",
  props: {
    ...formItemProps,
    ...slideProps,
    modelValue: {
      type: Array,
      validator: isValue5
    },
    allowSameValue: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    "update:modelValue": isValue5,
    change: isValue5,
    input: isValue5
  },
  setup(props, ctx) {
    const progress = reactive7([0, 0]);
    const progressValue = reactive7([0, 0]);
    const { emit } = ctx;
    const {
      sliderEl,
      toInteger,
      rangeValue,
      value2Progress,
      getMinMax,
      slideClasses,
      slideStyles
    } = useSlide(props, {
      getValue($target) {
        const { thumb, index } = $target.dataset;
        return thumb ? progressValue[parseInt(index)] : 0;
      },
      move({ value: newVal, progress: newProgress, $target }) {
        const { thumb } = $target.dataset;
        let index = 0;
        if (thumb) {
          index = parseInt($target.dataset.index);
        } else {
          if (Math.abs(progressValue[0] - newVal) > Math.abs(progressValue[1] - newVal)) {
            index = 1;
          }
        }
        if (!props.allowSameValue && newVal === progressValue[1 - index]) {
        } else {
          progressValue[index] = newVal;
          progress[index] = newProgress;
          emitModel();
          emit("input", getValue3());
        }
      },
      end({ isChange }) {
        isChange && emit("change", getValue3());
      }
    });
    function valueHandler(val) {
      let newVal = [];
      if (isNumberArray(val) && val.length > 1) {
        newVal = cloneData(val);
      } else if (typeof val === "string") {
        newVal = val.split(",").map((v) => {
          return toInteger(v);
        });
        if (newVal.length < 2) {
          newVal = [];
        }
      }
      return newVal.slice(0, 2).sort(sortBy);
    }
    function getValue3() {
      return valueHandler(progressValue);
    }
    function sortBy(a, b) {
      return a - b;
    }
    function emitModel() {
      if (props.modelValue == null || getValue3() !== valueHandler(props.modelValue)) {
        emit("update:modelValue", getValue3());
        return true;
      }
      return false;
    }
    function rangeValues(vals) {
      vals[0] = rangeValue(vals[0]);
      vals[1] = rangeValue(vals[1]);
      return vals;
    }
    function updateValue(val) {
      let newVal = valueHandler(val);
      if (newVal.length === 0) {
        return;
      }
      newVal = rangeValues(newVal);
      if (!isSameArray(newVal, getValue3())) {
        progressValue[0] = newVal[0];
        progressValue[1] = newVal[1];
        progress[0] = value2Progress(newVal[0]);
        progress[1] = value2Progress(newVal[1]);
      }
    }
    watch30(() => props.modelValue, (val) => updateValue(val));
    watch30([() => props.min, () => props.max], () => {
      nextTick10(() => {
        updateValue(progressValue);
        if (emitModel()) {
          emit("change", getValue3());
        }
      });
    });
    const inputValue = computed48(() => {
      return getValue3().join(",");
    });
    updateValue(getMinMax());
    updateValue(props.modelValue);
    if (emitModel()) {
      emit("change", getValue3());
    }
    return {
      inputValue,
      sliderEl,
      progress,
      progressValue,
      slideClasses,
      slideStyles
    };
  }
});
var _hoisted_178 = {
  class: "ak-slider_inner",
  ref: "sliderEl"
};
var _hoisted_261 = { class: "ak-slider_box" };
var _hoisted_349 = ["name", "disabled", "value"];
function render100(_ctx, _cache) {
  return _openBlock99(), _createElementBlock85("div", {
    class: _normalizeClass47(["ak-range", _ctx.slideClasses]),
    style: _normalizeStyle24(_ctx.slideStyles)
  }, [
    _createElementVNode70("div", _hoisted_178, [
      _createElementVNode70("div", _hoisted_261, [
        _createElementVNode70("div", {
          class: "ak-slider_track",
          style: _normalizeStyle24({
            left: Math.min(_ctx.progress[0], _ctx.progress[1]) * 100 + "%",
            width: Math.abs(_ctx.progress[1] - _ctx.progress[0]) * 100 + "%"
          })
        }, null, 4),
        _createElementVNode70("div", {
          class: "ak-slider_thumb",
          "data-thumb": "true",
          "data-index": "0",
          style: _normalizeStyle24({ left: _ctx.progress[0] * 100 + "%" })
        }, _toDisplayString41(_ctx.showValue ? _ctx.progressValue[0] : ""), 5),
        _createElementVNode70("div", {
          class: "ak-slider_thumb",
          "data-thumb": "true",
          "data-index": "1",
          style: _normalizeStyle24({ left: _ctx.progress[1] * 100 + "%" })
        }, _toDisplayString41(_ctx.showValue ? _ctx.progressValue[1] : ""), 5)
      ]),
      _createElementVNode70("input", {
        type: "hidden",
        name: _ctx.name,
        disabled: _ctx.disabled,
        value: _ctx.inputValue,
        ref: "input"
      }, null, 8, _hoisted_349)
    ], 512)
  ], 6);
}
_sfc_script101.render = render100;
_sfc_script101.__file = "packages/ui/src/Range/Range.vue";

// packages/ui/src/Range/index.ts
var install74 = withInstall(_sfc_script101);
var Range_default = _sfc_script101;

// vue:./Rate.vue
import { computed as computed49, defineComponent as defineComponent81, ref as ref43, watch as watch31 } from "vue";

// vue:./StarOutlined.vue
import { createElementVNode as _createElementVNode71, openBlock as _openBlock100, createElementBlock as _createElementBlock86 } from "vue";
var _sfc_script102 = {};
var _hoisted_179 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_262 = /* @__PURE__ */ _createElementVNode71("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1);
var _hoisted_350 = [
  _hoisted_262
];
function render101(_ctx, _cache) {
  return _openBlock100(), _createElementBlock86("svg", _hoisted_179, _hoisted_350);
}
_sfc_script102.render = render101;
_sfc_script102.__file = "packages/ui/src/Icon/icons/StarOutlined/StarOutlined.vue";

// vue:./StarFilled.vue
import { createElementVNode as _createElementVNode72, openBlock as _openBlock101, createElementBlock as _createElementBlock87 } from "vue";
var _sfc_script103 = {};
var _hoisted_180 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_263 = /* @__PURE__ */ _createElementVNode72("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1);
var _hoisted_351 = [
  _hoisted_263
];
function render102(_ctx, _cache) {
  return _openBlock101(), _createElementBlock87("svg", _hoisted_180, _hoisted_351);
}
_sfc_script103.render = render102;
_sfc_script103.__file = "packages/ui/src/Icon/icons/StarFilled/StarFilled.vue";

// packages/ui/src/Rate/util.ts
var DEFAULT_COUNT = 5;
var MAX_COUNT = 20;
var isIntegerOrHalf = (val) => {
  if (isNumeric(val)) {
    if (isInteger(val) || parseFloat(val) * 10 % 5 === 0) {
      return true;
    }
  }
  return false;
};
var getMax = (count) => rangeInteger(getNumber(count, DEFAULT_COUNT), 1, MAX_COUNT);
var getClasses17 = ({
  disabled,
  readonly
}) => {
  return ["ak-rate", { disabled: !!disabled, readonly: !!readonly }];
};
var getStyles8 = ({
  color,
  activeColor,
  size
}) => {
  const obj = {};
  color && (obj["--ak-color"] = color);
  activeColor && (obj["--ak-active-color"] = activeColor);
  size != null && size > 0 && (obj["--ak-size"] = getNumber(size) + "px");
  return obj;
};

// vue:./Rate.vue
import { createElementVNode as _createElementVNode73, renderList as _renderList18, Fragment as _Fragment19, openBlock as _openBlock102, createElementBlock as _createElementBlock88, resolveComponent as _resolveComponent53, createVNode as _createVNode37, normalizeClass as _normalizeClass48, normalizeStyle as _normalizeStyle25 } from "vue";
var _sfc_script104 = defineComponent81({
  name: "ak-rate",
  components: { Icon: _sfc_script2 },
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String],
      validator: isIntegerOrHalf,
      default: null
    },
    count: {
      type: [Number, String],
      default: DEFAULT_COUNT
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object],
      validator: iconValidator,
      default: _sfc_script102
    },
    activeIcon: {
      type: [String, Object],
      validator: iconValidator,
      default: _sfc_script103
    },
    color: {
      type: String,
      validator: colorValidator
    },
    activeColor: {
      type: String,
      validator: colorValidator
    },
    size: {
      type: [Number, String]
    }
  },
  emits: { ...formNumberValueEmits },
  setup(props, ctx) {
    const { emit } = ctx;
    const root = ref43();
    const inputValue = ref43(0);
    function change(value, isHalf = false) {
      if (props.allowHalf && isHalf) {
        value -= 0.5;
      }
      if (value !== inputValue.value) {
        inputValue.value = value;
        emit("update:modelValue", value);
        emit("change", value);
      }
    }
    const classes = computed49(() => getClasses17(props));
    const styles = computed49(() => getStyles8(props));
    const max = computed49(() => getMax(props.count));
    const isReadonly = computed49(() => !!(props.disabled || props.readonly));
    let coords;
    useTouch({
      el: root,
      onTouchStart(e) {
        if (isReadonly.value) {
          return;
        }
        const { clientX } = e.touchObject;
        let $target = e.target;
        while ($target.tagName !== "DIV") {
          $target = $target.parentElement;
        }
        const value = parseInt($target.dataset.value);
        const rects = $target.getClientRects()[0];
        coords = {
          size: rects.height,
          offsetX: clientX - rects.left,
          startX: clientX,
          current: value,
          isHalf: false,
          isChange: false
        };
        coords.isHalf = coords.offsetX < coords.size / 2;
        change(value, coords.isHalf);
        e.preventDefault();
      },
      onTouchMove(e) {
        if (!coords) {
          return;
        }
        const { clientX } = e.touchObject;
        const { startX, size, offsetX, current } = coords;
        const x = clientX - startX;
        let offsetCount = 0;
        if (x > 0) {
          offsetCount = Math.floor(x / size) + (x % size > size - offsetX ? 1 : 0);
        } else if (x < 0) {
          offsetCount = -Math.floor(-x / size) + (-x % size > offsetX ? -1 : 0);
        }
        const isHalf = (offsetX + x) % size < size / 2;
        coords.isChange = true;
        change(rangeInteger(current + offsetCount, 1, max.value), isHalf);
        e.stopPropagation();
      },
      onTouchEnd(e) {
        if (coords) {
          coords = null;
          e.stopPropagation();
        }
      }
    });
    function updateValue() {
      if (!isIntegerOrHalf(props.modelValue)) {
        return;
      }
      const value = parseFloat(props.modelValue);
      if (value === inputValue.value) {
        return;
      }
      if (value < 0 || value > max.value) {
        return;
      }
      if (!props.allowHalf && !isInteger(value)) {
        return;
      }
      inputValue.value = value;
    }
    updateValue();
    watch31(() => props.modelValue, updateValue);
    return {
      root,
      inputValue,
      classes,
      styles,
      max
    };
  }
});
var _hoisted_181 = ["name", "value", "disabled"];
var _hoisted_264 = ["data-value"];
var _hoisted_352 = { class: "ak-rate_icon" };
var _hoisted_421 = { class: "ak-rate_active-icon" };
function render103(_ctx, _cache) {
  const _component_Icon = _resolveComponent53("Icon");
  return _openBlock102(), _createElementBlock88("div", {
    class: _normalizeClass48(_ctx.classes),
    style: _normalizeStyle25(_ctx.styles),
    ref: "root"
  }, [
    _createElementVNode73("input", {
      name: _ctx.name,
      type: "hidden",
      value: _ctx.inputValue,
      disabled: _ctx.disabled
    }, null, 8, _hoisted_181),
    (_openBlock102(true), _createElementBlock88(_Fragment19, null, _renderList18(_ctx.max, (num) => {
      return _openBlock102(), _createElementBlock88("div", {
        class: _normalizeClass48(["ak-rate_item", {
          active: num - 0.5 <= _ctx.inputValue,
          half: _ctx.inputValue - num === -0.5
        }]),
        key: num,
        "data-value": num
      }, [
        _createElementVNode73("i", _hoisted_352, [
          _createVNode37(_component_Icon, { icon: _ctx.icon }, null, 8, ["icon"])
        ]),
        _createElementVNode73("i", _hoisted_421, [
          _createVNode37(_component_Icon, { icon: _ctx.activeIcon }, null, 8, ["icon"])
        ])
      ], 10, _hoisted_264);
    }), 128))
  ], 6);
}
_sfc_script104.render = render103;
_sfc_script104.__file = "packages/ui/src/Rate/Rate.vue";

// packages/ui/src/Rate/index.ts
var install75 = withInstall(_sfc_script104);
var Rate_default = _sfc_script104;

// vue:./Result.vue
import { computed as computed50, defineComponent as defineComponent82 } from "vue";

// vue:./InfoCircleFilled.vue
import { createElementVNode as _createElementVNode74, openBlock as _openBlock103, createElementBlock as _createElementBlock89 } from "vue";
var _sfc_script105 = {};
var _hoisted_183 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_265 = /* @__PURE__ */ _createElementVNode74("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1);
var _hoisted_353 = [
  _hoisted_265
];
function render104(_ctx, _cache) {
  return _openBlock103(), _createElementBlock89("svg", _hoisted_183, _hoisted_353);
}
_sfc_script105.render = render104;
_sfc_script105.__file = "packages/ui/src/Icon/icons/InfoCircleFilled/InfoCircleFilled.vue";

// vue:./WarningFilled.vue
import { createElementVNode as _createElementVNode75, openBlock as _openBlock104, createElementBlock as _createElementBlock90 } from "vue";
var _sfc_script106 = {};
var _hoisted_184 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_266 = /* @__PURE__ */ _createElementVNode75("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1);
var _hoisted_354 = [
  _hoisted_266
];
function render105(_ctx, _cache) {
  return _openBlock104(), _createElementBlock90("svg", _hoisted_184, _hoisted_354);
}
_sfc_script106.render = render105;
_sfc_script106.__file = "packages/ui/src/Icon/icons/WarningFilled/WarningFilled.vue";

// packages/ui/src/Result/util.ts
var RESULT_TYPES = ["info", "warning", "success", "fail"];
var getType = (type) => getEnumsValue(RESULT_TYPES, type);
var getTypeClass = (type) => ["type--" + getType(type)];

// vue:./Result.vue
import { resolveComponent as _resolveComponent54, normalizeClass as _normalizeClass49, createVNode as _createVNode38, toDisplayString as _toDisplayString42, openBlock as _openBlock105, createElementBlock as _createElementBlock91, createCommentVNode as _createCommentVNode42, createElementVNode as _createElementVNode76, renderSlot as _renderSlot48, createTextVNode as _createTextVNode20, withCtx as _withCtx26, createBlock as _createBlock41 } from "vue";
var iconMap = /* @__PURE__ */ new Map([
  ["info", _sfc_script105],
  ["warning", _sfc_script106],
  ["success", _sfc_script41],
  ["fail", _sfc_script61]
]);
var _sfc_script107 = defineComponent82({
  name: "ak-result",
  components: { Icon: _sfc_script2, Button: _sfc_script4 },
  props: {
    type: {
      type: String,
      validator: createEnumsValidator(RESULT_TYPES)
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    showBack: {
      type: Boolean,
      default: true
    },
    backText: {
      type: String
    },
    confirmText: {
      type: String
    }
  },
  emits: {
    confirm: emitEventValidator,
    back: emitEventValidator
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const typeClass = computed50(() => getTypeClass(props.type));
    const icon = computed50(() => iconMap.get(getType(props.type)));
    function onConfirmClick(e) {
      emit("confirm", e);
    }
    function onCancelClick(e) {
      emit("back", e);
    }
    return {
      typeClass,
      icon,
      onConfirmClick,
      onCancelClick,
      locale
    };
  }
});
var _hoisted_185 = { class: "ak-result_header" };
var _hoisted_267 = {
  key: 0,
  class: "ak-result_title"
};
var _hoisted_355 = {
  key: 1,
  class: "ak-result_description"
};
var _hoisted_422 = { class: "ak-result_footer" };
function render106(_ctx, _cache) {
  const _component_Icon = _resolveComponent54("Icon");
  const _component_Button = _resolveComponent54("Button");
  return _openBlock105(), _createElementBlock91("div", {
    class: _normalizeClass49(["ak-result", _ctx.typeClass])
  }, [
    _createElementVNode76("div", _hoisted_185, [
      _createVNode38(_component_Icon, {
        class: _normalizeClass49(["ak-result_icon", _ctx.typeClass]),
        icon: _ctx.icon
      }, null, 8, ["class", "icon"]),
      _ctx.title ? (_openBlock105(), _createElementBlock91("div", _hoisted_267, _toDisplayString42(_ctx.title), 1)) : _createCommentVNode42("v-if", true),
      _ctx.description ? (_openBlock105(), _createElementBlock91("div", _hoisted_355, _toDisplayString42(_ctx.description), 1)) : _createCommentVNode42("v-if", true)
    ]),
    _renderSlot48(_ctx.$slots, "default"),
    _createElementVNode76("div", _hoisted_422, [
      _createVNode38(_component_Button, {
        type: "primary",
        onClick: _ctx.onConfirmClick
      }, {
        default: _withCtx26(() => [
          _createTextVNode20(_toDisplayString42(_ctx.confirmText || _ctx.locale.resultConfirmText), 1)
        ]),
        _: 1
      }, 8, ["onClick"]),
      _ctx.showBack ? (_openBlock105(), _createBlock41(_component_Button, {
        key: 0,
        type: "default",
        onClick: _ctx.onCancelClick
      }, {
        default: _withCtx26(() => [
          _createTextVNode20(_toDisplayString42(_ctx.backText || _ctx.locale.resultBackText), 1)
        ]),
        _: 1
      }, 8, ["onClick"])) : _createCommentVNode42("v-if", true)
    ])
  ], 2);
}
_sfc_script107.render = render106;
_sfc_script107.__file = "packages/ui/src/Result/Result.vue";

// packages/ui/src/Result/index.ts
var install76 = withInstall(_sfc_script107);
var Result_default = _sfc_script107;

// vue:./Row.vue
import { computed as computed51, defineComponent as defineComponent83, provide as provide12, ref as ref44, watch as watch32 } from "vue";

// packages/ui/src/Row/util.ts
var JUSTIFY_TYPES = [
  "start",
  "end",
  "center",
  "space-around",
  "space-between"
];
var ALIGN_TYPES = ["top", "middle", "bottom"];
var parseGutter = (val) => {
  if (isNumeric(val)) {
    return [Math.max(0, parseFloat(val)), 0];
  } else if (isNumberArray(val) && val.length >= 2) {
    return [val[0], val[1]];
  }
  return [0, 0];
};
var getRowStyles = ([gH, gV]) => {
  const styles = {};
  if (gH > 0 || gV > 0) {
    styles.margin = `-${gV / 2}px -${gH / 2}px ${gV / 2}px `;
  }
  return styles;
};
var getRowClasses = (props) => {
  const classes = [`ak-row`];
  props.justify && JUSTIFY_TYPES.includes(props.justify) && classes.push(`justify--${props.justify}`);
  props.align && ALIGN_TYPES.includes(props.align) && classes.push(`align--${props.align}`);
  return classes;
};

// vue:./Row.vue
import { renderSlot as _renderSlot49, normalizeClass as _normalizeClass50, normalizeStyle as _normalizeStyle26, openBlock as _openBlock106, createElementBlock as _createElementBlock92 } from "vue";
var _sfc_script108 = defineComponent83({
  name: "ak-row",
  props: {
    gutter: {
      type: [Number, String, Array],
      validator: (val) => {
        return isNumberArray(val) && val.length === 2 || isNumeric(val);
      },
      default: 0
    },
    justify: {
      type: String,
      validator: createEnumsValidator(JUSTIFY_TYPES)
    },
    align: {
      type: String,
      validator: createEnumsValidator(ALIGN_TYPES)
    }
  },
  setup(props) {
    const gutter = ref44([0, 0]);
    const styles = computed51(() => getRowStyles(gutter.value));
    const classes = computed51(() => getRowClasses(props));
    watch32(() => props.gutter, (val) => {
      gutter.value = parseGutter(val);
    }, {
      immediate: true
    });
    provide12("akRowGutter", gutter);
    return {
      styles,
      classes
    };
  }
});
function render107(_ctx, _cache) {
  return _openBlock106(), _createElementBlock92("div", {
    class: _normalizeClass50(_ctx.classes),
    style: _normalizeStyle26(_ctx.styles)
  }, [
    _renderSlot49(_ctx.$slots, "default")
  ], 6);
}
_sfc_script108.render = render107;
_sfc_script108.__file = "packages/ui/src/Row/Row.vue";

// packages/ui/src/Row/index.ts
var install77 = withInstall(_sfc_script108);
var Row_default = _sfc_script108;

// vue:./ScrollTab.vue
import { defineComponent as defineComponent85, onMounted as onMounted30, ref as ref45 } from "vue";

// vue:./SideTab.vue
import { defineComponent as defineComponent84 } from "vue";

// packages/ui/src/SideTab/util.ts
var getItemClasses6 = (index, activeIndex) => {
  return [
    "ak-side-tab_item",
    {
      active: index === activeIndex,
      "active-prev": index === activeIndex - 1,
      "active-next": index === activeIndex + 1
    }
  ];
};

// vue:./SideTab.vue
import { renderList as _renderList19, Fragment as _Fragment20, openBlock as _openBlock107, createElementBlock as _createElementBlock93, resolveComponent as _resolveComponent55, createBlock as _createBlock42, createCommentVNode as _createCommentVNode43, toDisplayString as _toDisplayString43, createElementVNode as _createElementVNode77, mergeProps as _mergeProps12, withCtx as _withCtx27, createVNode as _createVNode39, normalizeClass as _normalizeClass51 } from "vue";
var _sfc_script109 = defineComponent84({
  name: "ak-side-tab",
  components: { Icon: _sfc_script2, Badge: _sfc_script14 },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits },
  setup(props, ctx) {
    return {
      getItemClasses: getItemClasses6,
      ...useTab(props, ctx, { tabName: "SideTab" })
    };
  }
});
var _hoisted_186 = { class: "ak-side-tab" };
var _hoisted_268 = {
  class: "ak-side-tab_list",
  ref: "listEl"
};
var _hoisted_356 = ["onClick"];
var _hoisted_423 = { class: "ak-side-tab_item-text" };
function render108(_ctx, _cache) {
  const _component_Icon = _resolveComponent55("Icon");
  const _component_Badge = _resolveComponent55("Badge");
  return _openBlock107(), _createElementBlock93("div", _hoisted_186, [
    _createElementVNode77("ul", _hoisted_268, [
      (_openBlock107(true), _createElementBlock93(_Fragment20, null, _renderList19(_ctx.options2, (item, index) => {
        return _openBlock107(), _createElementBlock93("li", {
          class: _normalizeClass51(_ctx.getItemClasses(index, _ctx.activeIndex)),
          key: item.value,
          onClick: ($event) => _ctx.onChange(item.value)
        }, [
          _createVNode39(_component_Badge, _mergeProps12({ class: "ak-side-tab_item-inner" }, item.badge), {
            default: _withCtx27(() => [
              item.icon ? (_openBlock107(), _createBlock42(_component_Icon, {
                key: 0,
                icon: index === _ctx.activeIndex ? item.activeIcon : item.icon
              }, null, 8, ["icon"])) : _createCommentVNode43("v-if", true),
              _createElementVNode77("span", _hoisted_423, _toDisplayString43(item.label), 1)
            ]),
            _: 2
          }, 1040)
        ], 10, _hoisted_356);
      }), 128))
    ], 512)
  ]);
}
_sfc_script109.render = render108;
_sfc_script109.__file = "packages/ui/src/SideTab/SideTab.vue";

// packages/ui/src/SideTab/index.ts
var install78 = withInstall(_sfc_script109);
var SideTab_default = _sfc_script109;

// vue:./ScrollTab.vue
import { resolveComponent as _resolveComponent56, createVNode as _createVNode40, withCtx as _withCtx28, createElementVNode as _createElementVNode78, renderSlot as _renderSlot50, openBlock as _openBlock108, createElementBlock as _createElementBlock94 } from "vue";
var _sfc_script110 = defineComponent85({
  name: "ak-scroll-tab",
  components: { SideTab: _sfc_script109, Sticky: _sfc_script82, StickyView: _sfc_script83 },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    },
    stickyOffsetBottom: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: {
    change: emitChangeValidator2
  },
  setup(props, { emit }) {
    const sideRef = ref45();
    const bodyRef = ref45();
    const tabList = ref45([]);
    const activeIndex = ref45(0);
    const resetContainer = (containSelector) => {
      var _a, _b;
      (_a = sideRef.value) == null ? void 0 : _a.resetContainer(containSelector);
      (_b = bodyRef.value) == null ? void 0 : _b.resetContainer(containSelector);
    };
    const onResetItems = (items) => {
      tabList.value = items.map((item) => {
        return {
          value: item.index,
          label: item.name
        };
      });
    };
    let oldIndex = 0;
    const onChange = (index) => {
      emit("change", index, oldIndex);
      oldIndex = index;
    };
    function scrollToIndex(index) {
      bodyRef.value && bodyRef.value.scrollToIndex(index);
    }
    onMounted30(() => resetContainer(document.documentElement));
    return {
      sideRef,
      bodyRef,
      activeIndex,
      tabList,
      onChange,
      scrollToIndex,
      resetContainer,
      onResetItems
    };
  }
});
var _hoisted_187 = { class: "ak-scroll-tab" };
var _hoisted_269 = { class: "ak-scroll-tab_sidebar" };
var _hoisted_357 = { class: "ak-scroll-tab_body" };
function render109(_ctx, _cache) {
  const _component_SideTab = _resolveComponent56("SideTab");
  const _component_Sticky = _resolveComponent56("Sticky");
  const _component_StickyView = _resolveComponent56("StickyView");
  return _openBlock108(), _createElementBlock94("div", _hoisted_187, [
    _createElementVNode78("div", _hoisted_269, [
      _createVNode40(_component_Sticky, {
        ref: "sideRef",
        offsetTop: _ctx.stickyOffsetTop,
        offsetBottom: _ctx.stickyOffsetBottom
      }, {
        default: _withCtx28(() => [
          _createVNode40(_component_SideTab, {
            options: _ctx.tabList,
            activeValue: _ctx.activeIndex,
            "onUpdate:activeValue": _cache[0] || (_cache[0] = ($event) => _ctx.activeIndex = $event)
          }, null, 8, ["options", "activeValue"])
        ]),
        _: 1
      }, 8, ["offsetTop", "offsetBottom"])
    ]),
    _createElementVNode78("div", _hoisted_357, [
      _createVNode40(_component_StickyView, {
        offsetTop: _ctx.stickyOffsetTop,
        ref: "bodyRef",
        activeIndex: _ctx.activeIndex,
        "onUpdate:activeIndex": _cache[1] || (_cache[1] = ($event) => _ctx.activeIndex = $event),
        onResetItems: _ctx.onResetItems,
        onChange: _ctx.onChange
      }, {
        default: _withCtx28(() => [
          _renderSlot50(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["offsetTop", "activeIndex", "onResetItems", "onChange"])
    ])
  ]);
}
_sfc_script110.render = render109;
_sfc_script110.__file = "packages/ui/src/ScrollTab/ScrollTab.vue";

// vue:./ScrollTabItem.vue
import { defineComponent as defineComponent86, inject as inject16, onMounted as onMounted31, onUnmounted as onUnmounted3 } from "vue";
import { toDisplayString as _toDisplayString44, createElementVNode as _createElementVNode79, renderSlot as _renderSlot51, openBlock as _openBlock109, createElementBlock as _createElementBlock95 } from "vue";
var _sfc_script111 = defineComponent86({
  name: "ak-scroll-tab-item",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const update = inject16("akStickyViewUpdate", createUpdateInItem("scroll-tab"));
    onMounted31(update);
    onUnmounted3(update);
    return {};
  }
});
var _hoisted_188 = ["data-name"];
var _hoisted_270 = { class: "ak-sticky-view-item_header" };
var _hoisted_358 = { class: "ak-sticky-view-item_body" };
function render110(_ctx, _cache) {
  return _openBlock109(), _createElementBlock95("div", {
    class: "ak-sticky-view-item ak-scroll-tab-item",
    "data-name": _ctx.name
  }, [
    _createElementVNode79("div", _hoisted_270, _toDisplayString44(_ctx.name), 1),
    _createElementVNode79("div", _hoisted_358, [
      _renderSlot51(_ctx.$slots, "default")
    ])
  ], 8, _hoisted_188);
}
_sfc_script111.render = render110;
_sfc_script111.__file = "packages/ui/src/ScrollTab/ScrollTabItem.vue";

// packages/ui/src/ScrollTab/index.ts
var ScrollTab_default = _sfc_script110;
var install79 = multiWithInstall(_sfc_script110, [_sfc_script111]);

// packages/ui/src/ScrollTabItem/index.ts
var ScrollTabItem_default = _sfc_script111;
var install80 = withNoopInstall(_sfc_script111);

// vue:./SearchBar.vue
import {
  computed as computed53,
  defineComponent as defineComponent88,
  onBeforeMount as onBeforeMount2,
  onBeforeUnmount as onBeforeUnmount16,
  ref as ref47,
  watch as watch33
} from "vue";

// vue:./Tag.vue
import { computed as computed52, defineComponent as defineComponent87, ref as ref46 } from "vue";

// packages/ui/src/Tag/util.ts
var TAG_PATTERN_TYPES = ["light", "dark", "plain"];
var getClasses18 = (props) => {
  const { hasColor, isDark: isDark2 } = getColorObject(props.color);
  return [
    "ak-tag",
    "type--" + (hasColor ? STATE_TYPES[1] : getEnumsValue(STATE_TYPES, props.type)),
    "size--" + getEnumsValue(SIZE_TYPES, props.size),
    "pattern--" + (hasColor && props.pattern !== "plain" ? isDark2 ? "dark" : "light" : getEnumsValue(TAG_PATTERN_TYPES, props.pattern)),
    { disabled: !!props.disabled }
  ];
};
var getStyles9 = (color) => {
  const styles = {};
  const colorObj = getColorObject(color);
  if (colorObj.hasColor) {
    styles[`--ak-color`] = colorObj.varColor;
    styles[`--ak-black-color`] = colorObj.varBlackColor;
  }
  return styles;
};

// vue:./Tag.vue
import { renderSlot as _renderSlot52, resolveComponent as _resolveComponent57, withModifiers as _withModifiers7, createVNode as _createVNode41, openBlock as _openBlock110, createElementBlock as _createElementBlock96, createCommentVNode as _createCommentVNode44, normalizeClass as _normalizeClass52, normalizeStyle as _normalizeStyle27 } from "vue";
var _sfc_script112 = defineComponent87({
  name: "ak-tag",
  components: { Icon: _sfc_script2 },
  props: {
    size: {
      type: String,
      validator: createEnumsValidator(SIZE_TYPES)
    },
    type: {
      type: String,
      validator: createEnumsValidator(STATE_TYPES)
    },
    pattern: {
      type: String,
      validator: createEnumsValidator(TAG_PATTERN_TYPES)
    },
    closable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  emits: {
    close: returnTrue,
    click: returnTrue,
    longPress: returnTrue
  },
  setup(props, { emit }) {
    const root = ref46();
    function onClose() {
      if (!props.disabled) {
        emit("close");
      }
    }
    const classes = computed52(() => getClasses18(props));
    const styles = computed52(() => getStyles9(props.color));
    useLongPress(root, (e) => {
      if (!props.disabled) {
        emit(kebabCase2CamelCase(e.type));
      }
    });
    return {
      root,
      classes,
      styles,
      noop,
      onClose,
      CloseOutlined: _sfc_script9
    };
  }
});
var _hoisted_189 = {
  key: 0,
  class: "ak-tag_close"
};
function render111(_ctx, _cache) {
  const _component_Icon = _resolveComponent57("Icon");
  return _openBlock110(), _createElementBlock96("div", {
    class: _normalizeClass52(_ctx.classes),
    style: _normalizeStyle27(_ctx.styles),
    ref: "root"
  }, [
    _renderSlot52(_ctx.$slots, "default"),
    _ctx.closable ? (_openBlock110(), _createElementBlock96("button", _hoisted_189, [
      _createVNode41(_component_Icon, {
        icon: _ctx.CloseOutlined,
        onMousedown: _withModifiers7(_ctx.noop, ["stop"]),
        onTouchstart: _withModifiers7(_ctx.noop, ["stop"]),
        onClick: _ctx.onClose
      }, null, 8, ["icon", "onMousedown", "onTouchstart", "onClick"])
    ])) : _createCommentVNode44("v-if", true)
  ], 6);
}
_sfc_script112.render = render111;
_sfc_script112.__file = "packages/ui/src/Tag/Tag.vue";

// packages/ui/src/Tag/index.ts
var install81 = withInstall(_sfc_script112);
var Tag_default = _sfc_script112;

// vue:./SearchOutlined.vue
import { createElementVNode as _createElementVNode80, openBlock as _openBlock111, createElementBlock as _createElementBlock97 } from "vue";
var _sfc_script113 = {};
var _hoisted_190 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_271 = /* @__PURE__ */ _createElementVNode80("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1);
var _hoisted_359 = [
  _hoisted_271
];
function render112(_ctx, _cache) {
  return _openBlock111(), _createElementBlock97("svg", _hoisted_190, _hoisted_359);
}
_sfc_script113.render = render112;
_sfc_script113.__file = "packages/ui/src/Icon/icons/SearchOutlined/SearchOutlined.vue";

// packages/ui/src/SearchBar/util.ts
var getInnerClasses3 = (showCancel) => [
  "ak-search_inner",
  { "has--cancel": !!showCancel }
];
var getInnerStyles4 = (background) => ({ background });
var getFieldClasses = (ghost) => [
  "ak-search_field",
  { ghost: !!ghost }
];
var getSuggestStyles = (height) => ({ height: height + "px" });

// vue:./SearchBar.vue
import { resolveComponent as _resolveComponent58, createVNode as _createVNode42, normalizeClass as _normalizeClass53, withCtx as _withCtx29, createElementVNode as _createElementVNode81, toDisplayString as _toDisplayString45, createTextVNode as _createTextVNode21, openBlock as _openBlock112, createBlock as _createBlock43, createCommentVNode as _createCommentVNode45, withModifiers as _withModifiers8, normalizeStyle as _normalizeStyle28, renderList as _renderList20, Fragment as _Fragment21, createElementBlock as _createElementBlock98 } from "vue";
var emitValidator2 = (payload, setSuggestList) => isString(payload) && typeof setSuggestList === "function";
var _sfc_script114 = defineComponent88({
  name: "ak-search-bar",
  components: { Icon: _sfc_script2, Input: _sfc_script87, Button: _sfc_script4, Dropdown: _sfc_script65, Cell: _sfc_script39, Tag: _sfc_script112 },
  props: {
    ghost: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 100
    },
    background: {
      type: String
    },
    placeholders: {
      type: [String, Array],
      validator: (val) => isString(val) || isStringArray(val),
      default: () => []
    },
    placeholderInterval: {
      type: Number,
      default: 5e3
    }
  },
  emits: {
    cancelClick: emitEventValidator,
    input: emitValidator2,
    focus: emitValidator2,
    blur: emitValidator2,
    search: (payload) => payload && isString(payload.text) && isString(payload.source),
    fieldClick: (payload) => payload && isString(payload.text)
  },
  setup(props, { emit }) {
    const { locale } = useLocale();
    const placeholder = ref47("");
    const searchText = ref47("");
    const initDropdown = ref47(false);
    const suggestVisible = ref47(false);
    const suggestList = ref47([]);
    const innerEl = ref47();
    function proxyEvent(e) {
      emitHook(e.type, searchText.value);
    }
    function onInput(text) {
      emitHook("input", text);
    }
    const emitHook = (type, text) => {
      emit(type, text, (res) => {
        setSuggestList(res, text !== searchText.value);
      });
    };
    function setSuggestList(res, expired) {
      if (expired) {
        return;
      }
      const newList = [];
      if (Array.isArray(res)) {
        res.forEach((v) => {
          if (typeof v === "string" || typeof v === "number") {
            newList.push({
              text: v.toString(),
              tags: []
            });
          } else if (v) {
            if (typeof v.text === "string" || typeof v.text === "number") {
              v.text = v.text.toString();
              v.tags = isStringArray(v.tags) ? v.tags : [];
              newList.push(v);
            }
          }
        });
      }
      suggestList.value = newList;
      if (newList.length > 0) {
        initDropdown.value = true;
        suggestVisible.value = true;
      } else {
        suggestVisible.value = false;
      }
    }
    function onSearch(text, source = "search") {
      suggestVisible.value = false;
      if (text === "" && placeholder.value) {
        searchText.value = text = placeholder.value;
      }
      emit("search", {
        text,
        source
      });
    }
    function onSuggestItemClick(text) {
      searchText.value = text.toString();
      onSearch(text.toString(), "suggest");
    }
    function onCancel(e) {
      emit("cancelClick", e);
    }
    function onClick() {
      emit("fieldClick", {
        text: searchText.value || placeholder.value || ""
      });
    }
    let phTimer;
    let phIndex = 0;
    let phs = [];
    let isTimerReady = false;
    const phsStart = () => {
      phsStop();
      if (isTimerReady && phs.length > 1) {
        phTimer = window.setTimeout(() => {
          phIndex = (phIndex + 1) % phs.length;
          placeholder.value = phs[phIndex];
          phsStart();
        }, props.placeholderInterval);
      }
    };
    const phsStop = () => clearTimeout(phTimer);
    watch33(() => props.placeholders, (val) => {
      phsStop();
      if (typeof val === "string") {
        placeholder.value = val;
        phs = [val];
      } else if (isStringArray(val) && val.length > 0) {
        phIndex = 0;
        placeholder.value = val[phIndex];
        phs = val;
        phsStart();
      } else {
        placeholder.value = "";
        phs = [];
      }
    }, {
      deep: true,
      immediate: true
    });
    onBeforeMount2(() => {
      isTimerReady = true;
      phsStart();
    });
    onBeforeUnmount16(() => phsStop());
    const innerClasses = computed53(() => getInnerClasses3(props.showCancel));
    const innerStyles = computed53(() => getInnerStyles4(props.background));
    const fieldClasses = computed53(() => getFieldClasses(props.ghost));
    return {
      innerClasses,
      innerStyles,
      fieldClasses,
      getSuggestStyles,
      placeholder,
      initDropdown,
      suggestVisible,
      suggestList,
      searchText,
      proxyEvent,
      onInput,
      onSearch,
      onSuggestItemClick,
      onCancel,
      onClick,
      locale,
      setSuggestList: (res) => setSuggestList(res, false),
      SearchOutlined: _sfc_script113,
      innerEl
    };
  }
});
var _hoisted_191 = { class: "ak-search" };
var _hoisted_272 = /* @__PURE__ */ _createElementVNode81("button", { class: "ak-search_button" }, "Search", -1);
var _hoisted_360 = { class: "ak-search_suggest-list" };
function render113(_ctx, _cache) {
  var _a;
  const _component_Icon = _resolveComponent58("Icon");
  const _component_Input = _resolveComponent58("Input");
  const _component_Button = _resolveComponent58("Button");
  const _component_Tag = _resolveComponent58("Tag");
  const _component_Cell = _resolveComponent58("Cell");
  const _component_Dropdown = _resolveComponent58("Dropdown");
  return _openBlock112(), _createElementBlock98("div", _hoisted_191, [
    _createElementVNode81("form", {
      class: _normalizeClass53(_ctx.innerClasses),
      onSubmit: _cache[1] || (_cache[1] = _withModifiers8(($event) => _ctx.onSearch(_ctx.searchText), ["prevent"])),
      ref: "innerEl",
      style: _normalizeStyle28(_ctx.innerStyles)
    }, [
      _createVNode42(_component_Input, {
        class: _normalizeClass53(_ctx.fieldClasses),
        placeholder: _ctx.placeholder,
        type: "search",
        readonly: _ctx.readonly,
        modelValue: _ctx.searchText,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.searchText = $event),
        focus: _ctx.focus,
        maxlength: _ctx.maxlength,
        showClear: "",
        onInput: _ctx.onInput,
        onFocus: _ctx.proxyEvent,
        onBlur: _ctx.proxyEvent,
        onClick: _ctx.onClick
      }, {
        prepend: _withCtx29(() => [
          _createVNode42(_component_Icon, { icon: _ctx.SearchOutlined }, null, 8, ["icon"])
        ]),
        _: 1
      }, 8, ["class", "placeholder", "readonly", "modelValue", "focus", "maxlength", "onInput", "onFocus", "onBlur", "onClick"]),
      _hoisted_272,
      _ctx.showCancel ? (_openBlock112(), _createBlock43(_component_Button, {
        key: 0,
        class: "ak-search_cancel-button",
        size: "large",
        type: "default",
        formType: "button",
        pattern: "borderless",
        ghost: _ctx.ghost,
        transparent: !_ctx.ghost,
        onClick: _ctx.onCancel
      }, {
        default: _withCtx29(() => [
          _createTextVNode21(_toDisplayString45(_ctx.locale.searchBarCancelText), 1)
        ]),
        _: 1
      }, 8, ["ghost", "transparent", "onClick"])) : _createCommentVNode45("v-if", true)
    ], 38),
    _ctx.initDropdown ? (_openBlock112(), _createBlock43(_component_Dropdown, {
      key: 0,
      selector: (_a = _ctx.innerEl) != null ? _a : void 0,
      visible: _ctx.suggestVisible,
      "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => _ctx.suggestVisible = $event)
    }, {
      default: _withCtx29(({ height }) => [
        _createElementVNode81("div", {
          style: _normalizeStyle28(_ctx.getSuggestStyles(height))
        }, [
          _createElementVNode81("div", _hoisted_360, [
            (_openBlock112(true), _createElementBlock98(_Fragment21, null, _renderList20(_ctx.suggestList, (item) => {
              return _openBlock112(), _createBlock43(_component_Cell, {
                key: item.text,
                label: item.text.toString(),
                class: "ak-search_suggest-item",
                clickable: "",
                onClick: ($event) => _ctx.onSuggestItemClick(item.text)
              }, {
                default: _withCtx29(() => [
                  (_openBlock112(true), _createElementBlock98(_Fragment21, null, _renderList20(item.tags, (tag) => {
                    return _openBlock112(), _createBlock43(_component_Tag, { key: tag }, {
                      default: _withCtx29(() => [
                        _createTextVNode21(_toDisplayString45(tag), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 2
              }, 1032, ["label", "onClick"]);
            }), 128))
          ])
        ], 4)
      ]),
      _: 1
    }, 8, ["selector", "visible"])) : _createCommentVNode45("v-if", true)
  ]);
}
_sfc_script114.render = render113;
_sfc_script114.__file = "packages/ui/src/SearchBar/SearchBar.vue";

// packages/ui/src/SearchBar/index.ts
var install82 = withInstall(_sfc_script114);
var SearchBar_default = _sfc_script114;

// vue:./Skeleton.vue
import { defineComponent as defineComponent93, h as h2 } from "vue";

// vue:./SkeletonLayout.vue
import { computed as computed57, defineComponent as defineComponent92 } from "vue";

// vue:./SkeletonAvatar.vue
import { computed as computed54, defineComponent as defineComponent89 } from "vue";

// packages/ui/src/Skeleton/util.ts
var PARAGRAPH_DEFAULT_ROW = 3;
var AVATAR_SHAPE_NAMES = ["default", "circle"];
var BUTTON_SHAPE_NAMES = ["default", "round"];
var getClasses19 = (animated) => {
  return ["ak-skeleton", { animated: !!animated }];
};
var getAvatarClasses2 = (props, parentProps) => {
  var _a;
  return [
    "ak-skeleton-avatar",
    { animated: !!((parentProps == null ? void 0 : parentProps.animated) || props.animated) },
    "shape--" + getEnumsValue(AVATAR_SHAPE_NAMES, (_a = props.shape) != null ? _a : parentProps == null ? void 0 : parentProps.avatarShape)
  ];
};
var getButtonClasses2 = (props, parentProps) => {
  var _a;
  return [
    "ak-skeleton-button",
    { animated: !!((parentProps == null ? void 0 : parentProps.animated) || props.animated) },
    "shape--" + getEnumsValue(BUTTON_SHAPE_NAMES, (_a = props.shape) != null ? _a : parentProps == null ? void 0 : parentProps.buttonShape)
  ];
};
var getImageClasses = (props, parentProps) => {
  return [
    "ak-skeleton-image",
    { animated: !!((parentProps == null ? void 0 : parentProps.animated) || props.animated) }
  ];
};
var getTitleClasses = (props, parentProps) => {
  return [
    "ak-skeleton-title",
    { animated: !!((parentProps == null ? void 0 : parentProps.animated) || props.animated) }
  ];
};
var getParagraphClasses = (props, parentProps) => {
  return [
    "ak-skeleton-paragraph",
    { animated: !!((parentProps == null ? void 0 : parentProps.animated) || props.animated) }
  ];
};
var getParagraphRowList = (props, parentProps) => {
  var _a;
  const row = getNumber((_a = props.row) != null ? _a : parentProps == null ? void 0 : parentProps.paragraphRow);
  const rowLen = isNumber(row) && row > 0 ? row : PARAGRAPH_DEFAULT_ROW;
  const rowList = [];
  for (let i = 0; i < rowLen; i++) {
    rowList.push(i);
  }
  return rowList;
};

// packages/ui/src/Skeleton/props.ts
var propAvatarShape = {
  type: String,
  validator: createEnumsValidator(AVATAR_SHAPE_NAMES)
};
var propButtonShape = {
  type: String,
  validator: createEnumsValidator(BUTTON_SHAPE_NAMES)
};
var propAnimated = {
  type: Boolean,
  default: false
};
var rootProps = {
  avatarShape: propAvatarShape,
  buttonShape: propButtonShape,
  paragraphRow: {
    type: Number
  },
  animated: propAnimated
};

// packages/ui/src/Skeleton/context.ts
import { provide as provide13, inject as inject17 } from "vue";
var KEY3 = "Skeleton";
var CONTEXT_KEY4 = `ak${KEY3}Options`;
function useProvider2(props) {
  provide13(CONTEXT_KEY4, props);
  return {};
}
function useConsumer2() {
  const parentOptions = inject17(CONTEXT_KEY4, {});
  return parentOptions;
}

// vue:./SkeletonAvatar.vue
import { normalizeClass as _normalizeClass54, openBlock as _openBlock113, createElementBlock as _createElementBlock99 } from "vue";
var _sfc_script115 = defineComponent89({
  name: "ak-skeleton-avatar",
  props: {
    animated: propAnimated,
    shape: propAvatarShape
  },
  setup(props) {
    const parentProps = useConsumer2();
    const classes = computed54(() => getAvatarClasses2(props, parentProps));
    return {
      classes
    };
  }
});
function render114(_ctx, _cache) {
  return _openBlock113(), _createElementBlock99("div", {
    class: _normalizeClass54(_ctx.classes)
  }, null, 2);
}
_sfc_script115.render = render114;
_sfc_script115.__file = "packages/ui/src/Skeleton/SkeletonAvatar.vue";

// vue:./SkeletonTitle.vue
import { computed as computed55, defineComponent as defineComponent90 } from "vue";
import { normalizeClass as _normalizeClass55, openBlock as _openBlock114, createElementBlock as _createElementBlock100 } from "vue";
var _sfc_script116 = defineComponent90({
  name: "ak-skeleton-title",
  props: {
    animated: propAnimated
  },
  setup(props) {
    const parentProps = useConsumer2();
    const classes = computed55(() => getTitleClasses(props, parentProps));
    return {
      classes
    };
  }
});
function render115(_ctx, _cache) {
  return _openBlock114(), _createElementBlock100("div", {
    class: _normalizeClass55(_ctx.classes)
  }, null, 2);
}
_sfc_script116.render = render115;
_sfc_script116.__file = "packages/ui/src/Skeleton/SkeletonTitle.vue";

// vue:./SkeletonParagraph.vue
import { defineComponent as defineComponent91, computed as computed56 } from "vue";
import { renderList as _renderList21, Fragment as _Fragment22, openBlock as _openBlock115, createElementBlock as _createElementBlock101, normalizeClass as _normalizeClass56 } from "vue";
var _sfc_script117 = defineComponent91({
  name: "ak-skeleton-paragraph",
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    row: {
      type: Number
    }
  },
  setup(props) {
    const parentProps = useConsumer2();
    const classes = computed56(() => getParagraphClasses(props, parentProps));
    const paragraphList = computed56(() => getParagraphRowList(props, parentProps));
    return {
      classes,
      paragraphList
    };
  }
});
function render116(_ctx, _cache) {
  return _openBlock115(), _createElementBlock101("ul", {
    class: _normalizeClass56(_ctx.classes)
  }, [
    (_openBlock115(true), _createElementBlock101(_Fragment22, null, _renderList21(_ctx.paragraphList, (num) => {
      return _openBlock115(), _createElementBlock101("li", { key: num });
    }), 128))
  ], 2);
}
_sfc_script117.render = render116;
_sfc_script117.__file = "packages/ui/src/Skeleton/SkeletonParagraph.vue";

// vue:./SkeletonLayout.vue
import { renderSlot as _renderSlot53, resolveComponent as _resolveComponent59, createVNode as _createVNode43, openBlock as _openBlock116, createElementBlock as _createElementBlock102, createCommentVNode as _createCommentVNode46, createElementVNode as _createElementVNode82, normalizeClass as _normalizeClass57 } from "vue";
var _sfc_script118 = defineComponent92({
  name: "ak-skeleton-layout",
  props: { animated: Boolean, avatar: Boolean },
  components: {
    SkeletonAvatar: _sfc_script115,
    SkeletonTitle: _sfc_script116,
    SkeletonParagraph: _sfc_script117
  },
  setup(props) {
    const classes = computed57(() => getClasses19(props.animated));
    return {
      classes
    };
  }
});
var _hoisted_192 = { class: "ak-skeleton_layout" };
var _hoisted_273 = {
  key: 0,
  class: "ak-skeleton_layout-left"
};
var _hoisted_361 = { class: "ak-skeleton_layout-right" };
function render117(_ctx, _cache) {
  const _component_SkeletonAvatar = _resolveComponent59("SkeletonAvatar");
  const _component_SkeletonTitle = _resolveComponent59("SkeletonTitle");
  const _component_SkeletonParagraph = _resolveComponent59("SkeletonParagraph");
  return _openBlock116(), _createElementBlock102("div", {
    class: _normalizeClass57(_ctx.classes)
  }, [
    _renderSlot53(_ctx.$slots, "default", {}, () => [
      _createElementVNode82("div", _hoisted_192, [
        _ctx.avatar ? (_openBlock116(), _createElementBlock102("div", _hoisted_273, [
          _createVNode43(_component_SkeletonAvatar)
        ])) : _createCommentVNode46("v-if", true),
        _createElementVNode82("div", _hoisted_361, [
          _createVNode43(_component_SkeletonTitle),
          _createVNode43(_component_SkeletonParagraph)
        ])
      ])
    ])
  ], 2);
}
_sfc_script118.render = render117;
_sfc_script118.__file = "packages/ui/src/Skeleton/SkeletonLayout.vue";

// vue:./Skeleton.vue
var _sfc_script119 = defineComponent93({
  name: "ak-skeleton",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: false
    },
    ...rootProps
  },
  setup(props, { slots }) {
    useProvider2(props);
    return () => {
      if (!props.loading) {
        return slots.default ? slots.default() : null;
      }
      return h2(_sfc_script118, {
        animated: props.animated,
        avatar: props.avatar
      }, slots.layout);
    };
  }
});

// vue:./SkeletonButton.vue
import { computed as computed58, defineComponent as defineComponent94 } from "vue";
import { normalizeClass as _normalizeClass58, openBlock as _openBlock117, createElementBlock as _createElementBlock103 } from "vue";
var _sfc_script120 = defineComponent94({
  name: "ak-skeleton-button",
  props: {
    animated: propAnimated,
    shape: propButtonShape
  },
  setup(props) {
    const parentProps = useConsumer2();
    const classes = computed58(() => getButtonClasses2(props, parentProps));
    return {
      classes
    };
  }
});
function render118(_ctx, _cache) {
  return _openBlock117(), _createElementBlock103("div", {
    class: _normalizeClass58(_ctx.classes)
  }, null, 2);
}
_sfc_script120.render = render118;
_sfc_script120.__file = "packages/ui/src/Skeleton/SkeletonButton.vue";

// vue:./SkeletonImage.vue
import { computed as computed59, defineComponent as defineComponent95 } from "vue";
import { normalizeClass as _normalizeClass59, openBlock as _openBlock118, createElementBlock as _createElementBlock104 } from "vue";
var _sfc_script121 = defineComponent95({
  name: "ak-skeleton-image",
  props: {
    animated: propAnimated
  },
  setup(props) {
    const parentProps = useConsumer2();
    const classes = computed59(() => getImageClasses(props, parentProps));
    return {
      classes
    };
  }
});
function render119(_ctx, _cache) {
  return _openBlock118(), _createElementBlock104("div", {
    class: _normalizeClass59(_ctx.classes)
  }, null, 2);
}
_sfc_script121.render = render119;
_sfc_script121.__file = "packages/ui/src/Skeleton/SkeletonImage.vue";

// packages/ui/src/Skeleton/index.ts
var Skeleton_default = _sfc_script119;
var install83 = multiWithInstall(_sfc_script119, [
  _sfc_script115,
  _sfc_script116,
  _sfc_script117,
  _sfc_script120,
  _sfc_script121
]);

// packages/ui/src/SkeletonAvatar/index.ts
var SkeletonAvatar_default = _sfc_script115;
var install84 = withNoopInstall(_sfc_script115);

// packages/ui/src/SkeletonButton/index.ts
var SkeletonButton_default = _sfc_script120;
var install85 = withNoopInstall(_sfc_script120);

// packages/ui/src/SkeletonImage/index.ts
var SkeletonImage_default = _sfc_script121;
var install86 = withNoopInstall(_sfc_script121);

// packages/ui/src/SkeletonParagraph/index.ts
var SkeletonParagraph_default = _sfc_script117;
var install87 = withNoopInstall(_sfc_script117);

// packages/ui/src/SkeletonTitle/index.ts
var SkeletonTitle_default = _sfc_script116;
var install88 = withNoopInstall(_sfc_script116);

// vue:./Slider.vue
import { ref as ref48, defineComponent as defineComponent96, watch as watch34, nextTick as nextTick11 } from "vue";
import { normalizeStyle as _normalizeStyle29, createElementVNode as _createElementVNode83, toDisplayString as _toDisplayString46, normalizeClass as _normalizeClass60, openBlock as _openBlock119, createElementBlock as _createElementBlock105 } from "vue";
var _sfc_script122 = defineComponent96({
  name: "ak-slider",
  props: {
    ...formItemProps,
    ...slideProps,
    modelValue: {
      type: [Number, String],
      validator: isNumeric
    }
  },
  emits: {
    ...formNumberValueEmits
  },
  setup(props, ctx) {
    const progress = ref48(0);
    const inputValue = ref48(0);
    const { emit } = ctx;
    const {
      sliderEl,
      toInteger,
      rangeValue,
      value2Progress,
      slideClasses,
      slideStyles
    } = useSlide(props, {
      getValue() {
        return inputValue.value;
      },
      move({ value: newVal, progress: newProgress }) {
        inputValue.value = newVal;
        progress.value = newProgress;
        emitModel();
        emit("input", inputValue.value);
      },
      end({ isChange }) {
        isChange && emit("change", inputValue.value);
      }
    });
    function emitModel() {
      if (props.modelValue == null || inputValue.value !== toInteger(props.modelValue)) {
        emit("update:modelValue", inputValue.value);
        return true;
      }
      return false;
    }
    function updateValue(val) {
      if (val == null) {
        return;
      }
      let newVal = toInteger(val);
      if (isNaN(newVal)) {
        return;
      }
      newVal = rangeValue(newVal);
      if (newVal !== inputValue.value) {
        inputValue.value = newVal;
        progress.value = value2Progress(newVal);
      }
    }
    watch34(() => props.modelValue, (val) => updateValue(val));
    watch34([() => props.min, () => props.max], () => {
      nextTick11(() => {
        updateValue(inputValue.value);
        if (emitModel()) {
          emit("change", inputValue.value);
        }
      });
    });
    updateValue(props.modelValue || 0);
    if (emitModel()) {
      emit("change", inputValue.value);
    }
    return {
      sliderEl,
      progress,
      inputValue,
      slideClasses,
      slideStyles
    };
  }
});
var _hoisted_193 = {
  class: "ak-slider_inner",
  ref: "sliderEl"
};
var _hoisted_274 = { class: "ak-slider_box" };
var _hoisted_362 = ["name", "disabled", "value"];
function render120(_ctx, _cache) {
  return _openBlock119(), _createElementBlock105("div", {
    class: _normalizeClass60(_ctx.slideClasses),
    style: _normalizeStyle29(_ctx.slideStyles)
  }, [
    _createElementVNode83("div", _hoisted_193, [
      _createElementVNode83("div", _hoisted_274, [
        _createElementVNode83("div", {
          class: "ak-slider_track",
          style: _normalizeStyle29({ width: _ctx.progress * 100 + "%" })
        }, null, 4),
        _createElementVNode83("div", {
          class: "ak-slider_thumb",
          "data-thumb": "true",
          style: _normalizeStyle29({ left: _ctx.progress * 100 + "%" })
        }, _toDisplayString46(_ctx.showValue ? _ctx.inputValue : ""), 5)
      ]),
      _createElementVNode83("input", {
        type: "hidden",
        name: _ctx.name,
        disabled: _ctx.disabled,
        value: _ctx.inputValue,
        ref: "input"
      }, null, 8, _hoisted_362)
    ], 512)
  ], 6);
}
_sfc_script122.render = render120;
_sfc_script122.__file = "packages/ui/src/Slider/Slider.vue";

// packages/ui/src/Slider/index.ts
var install89 = withInstall(_sfc_script122);
var Slider_default = _sfc_script122;

// vue:./Steps.vue
import { computed as computed60, defineComponent as defineComponent97, provide as provide14, toRef as toRef6 } from "vue";

// packages/ui/src/Steps/util.ts
var getStepsClasses = ({
  dot,
  horizontal
}) => ["ak-steps", { dot: !!dot, horizontal: !!horizontal }];
var getStepClasses = ({
  active,
  finish
}) => ["ak-step", "ak-steps-item", "ak-horizontal-hairline", { active, finish }];

// vue:./Steps.vue
import { renderSlot as _renderSlot54, normalizeClass as _normalizeClass61, openBlock as _openBlock120, createElementBlock as _createElementBlock106 } from "vue";
var _sfc_script123 = defineComponent97({
  name: "ak-steps",
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    dot: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:activeIndex": (activeIndex) => isNumber(activeIndex)
  },
  setup(props, { emit }) {
    const { listEl } = useList("steps", ($items) => {
      if (props.activeIndex >= $items.length) {
        emit("update:activeIndex", $items.length - 1);
      }
    });
    provide14(`akStepsActiveIndex`, toRef6(props, "activeIndex"));
    const classes = computed60(() => getStepsClasses(props));
    return { listEl, classes };
  }
});
function render121(_ctx, _cache) {
  return _openBlock120(), _createElementBlock106("div", {
    class: _normalizeClass61(_ctx.classes),
    ref: "listEl"
  }, [
    _renderSlot54(_ctx.$slots, "default")
  ], 2);
}
_sfc_script123.render = render121;
_sfc_script123.__file = "packages/ui/src/Steps/Steps.vue";

// vue:./Step.vue
import { computed as computed61, defineComponent as defineComponent98, inject as inject18, ref as ref49 } from "vue";
import { createElementVNode as _createElementVNode84, renderSlot as _renderSlot55, toDisplayString as _toDisplayString47, createTextVNode as _createTextVNode22, openBlock as _openBlock121, createElementBlock as _createElementBlock107, createCommentVNode as _createCommentVNode47, normalizeClass as _normalizeClass62 } from "vue";
var _sfc_script124 = defineComponent98({
  name: "ak-step",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup() {
    const activeIndex = inject18(`akStepsActiveIndex`, ref49(0));
    const root = ref49();
    const { index } = useListItem("steps", root);
    const active = computed61(() => {
      return activeIndex.value === index.value;
    });
    const finish = computed61(() => {
      return index.value < activeIndex.value;
    });
    const classes = computed61(() => getStepClasses({
      active: active.value,
      finish: finish.value
    }));
    return {
      root,
      index,
      active,
      finish,
      classes
    };
  }
});
var _hoisted_194 = /* @__PURE__ */ _createElementVNode84("div", { class: "ak-step_line" }, null, -1);
var _hoisted_275 = { class: "ak-step_index" };
var _hoisted_363 = { class: "ak-step_inner" };
var _hoisted_424 = {
  key: 0,
  class: "ak-step_title"
};
var _hoisted_510 = { class: "ak-step_content" };
function render122(_ctx, _cache) {
  return _openBlock121(), _createElementBlock107("div", {
    class: _normalizeClass62(_ctx.classes),
    ref: "root"
  }, [
    _hoisted_194,
    _createElementVNode84("div", _hoisted_275, [
      _renderSlot55(_ctx.$slots, "step", {
        index: _ctx.index,
        active: _ctx.active,
        finish: _ctx.finish
      }, () => [
        _createTextVNode22(_toDisplayString47(_ctx.index + 1), 1)
      ])
    ]),
    _createElementVNode84("div", _hoisted_363, [
      _ctx.title || _ctx.$slots.title ? (_openBlock121(), _createElementBlock107("div", _hoisted_424, [
        _renderSlot55(_ctx.$slots, "title", {}, () => [
          _createTextVNode22(_toDisplayString47(_ctx.title), 1)
        ])
      ])) : _createCommentVNode47("v-if", true),
      _createElementVNode84("div", _hoisted_510, [
        _renderSlot55(_ctx.$slots, "default")
      ])
    ])
  ], 2);
}
_sfc_script124.render = render122;
_sfc_script124.__file = "packages/ui/src/Steps/Step.vue";

// packages/ui/src/Steps/index.ts
var Steps_default = _sfc_script123;
var install90 = multiWithInstall(_sfc_script123, [_sfc_script124]);

// packages/ui/src/Step/index.ts
var Step_default = _sfc_script124;
var install91 = withNoopInstall(_sfc_script124);

// vue:./Stepper.vue
import { onMounted as onMounted32, ref as ref50, defineComponent as defineComponent99, watch as watch35, computed as computed62 } from "vue";

// packages/ui/src/Stepper/util.ts
var getClasses20 = (disabled) => {
  return ["ak-stepper", { disabled: !!disabled }];
};
function formateNumber(value, decimalLength) {
  return formatInputNumber(value, getNumber(decimalLength, -1));
}
function getRangeNumber(props, value) {
  value = formateNumber(value, props.decimalLength);
  if (value === "") {
    value = props.min;
  }
  if (props.allowDecimal) {
    value = rangeNumber(parseFloat(value), props.min, props.max);
  } else {
    value = rangeInteger(Math.floor(value), props.min, props.max);
  }
  return value.toString();
}

// vue:./MinusOutlined.vue
import { createElementVNode as _createElementVNode85, openBlock as _openBlock122, createElementBlock as _createElementBlock108 } from "vue";
var _sfc_script125 = {};
var _hoisted_195 = {
  viewBox: "0 0 1024 1024",
  focusable: "false"
};
var _hoisted_276 = /* @__PURE__ */ _createElementVNode85("path", { d: "M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1);
var _hoisted_364 = [
  _hoisted_276
];
function render123(_ctx, _cache) {
  return _openBlock122(), _createElementBlock108("svg", _hoisted_195, _hoisted_364);
}
_sfc_script125.render = render123;
_sfc_script125.__file = "packages/ui/src/Icon/icons/MinusOutlined/MinusOutlined.vue";

// vue:./Stepper.vue
import { resolveComponent as _resolveComponent60, createVNode as _createVNode44, createElementVNode as _createElementVNode86, normalizeClass as _normalizeClass63, openBlock as _openBlock123, createElementBlock as _createElementBlock109 } from "vue";
var _sfc_script126 = defineComponent99({
  name: "ak-stepper",
  components: { Button: _sfc_script4 },
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String]
    },
    disabledMinus: {
      type: Boolean,
      default: false
    },
    disabledPlus: {
      type: Boolean,
      default: false
    },
    disabledInput: {
      type: Boolean,
      default: false
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    allowDecimal: {
      type: Boolean,
      default: true
    },
    step: {
      type: [Number, String],
      default: 1
    },
    decimalLength: {
      type: Number
    }
  },
  emits: {
    ...formStringValueEmits,
    ...formFocusEmits,
    plusClick: emitClickValidator,
    minusClick: emitClickValidator
  },
  setup(props, { emit }) {
    const formValue = ref50("");
    const nMin = computed62(() => getNumber(props.min, 1));
    const nMax = computed62(() => getNumber(props.max, Infinity));
    const nStep = computed62(() => getNumber(props.step, 1));
    const { inputEl, setInputValue, getInputValue } = useInput();
    const classes = computed62(() => getClasses20(props.disabled));
    function updateValue(val) {
      const newVal = getRangeNumber({
        min: nMin.value,
        max: nMax.value,
        allowDecimal: props.allowDecimal,
        decimalLength: props.decimalLength
      }, val);
      if (newVal != props.modelValue) {
        emit("update:modelValue", newVal);
      }
      if (newVal !== formValue.value) {
        formValue.value = newVal;
        emit("change", newVal);
      }
      setInputValue(newVal);
      return newVal;
    }
    const onFocus = (e) => emit("focus", e);
    const onBlur = (e) => emit("blur", e);
    function onChange() {
      updateValue(getInputValue());
    }
    function onInput() {
      const val = formateNumber(getInputValue());
      setInputValue(val);
      emit("input", val);
    }
    const onMinusClick = (e) => {
      updateValue(parseFloat(formValue.value) - nStep.value);
      emit("minusClick", e);
    };
    const onPlusClick = (e) => {
      updateValue(parseFloat(formValue.value) + nStep.value);
      emit("plusClick", e);
    };
    onMounted32(() => {
      setInputValue(formValue.value);
    });
    watch35(() => props.modelValue, (val) => {
      if (val != null && parseFloat(val.toString()) !== parseFloat(formValue.value)) {
        updateValue(val);
      } else if (formValue.value === "") {
        updateValue(nMin.value);
      }
    }, {
      immediate: true
    });
    return {
      classes,
      inputEl,
      formValue,
      onFocus,
      onBlur,
      onChange,
      onInput,
      onMinusClick,
      onPlusClick,
      PlusOutlined: _sfc_script79,
      MinusOutlined: _sfc_script125,
      nMin,
      nMax
    };
  }
});
var _hoisted_196 = ["type", "inputmode", "name", "disabled", "readonly"];
function render124(_ctx, _cache) {
  const _component_Button = _resolveComponent60("Button");
  return _openBlock123(), _createElementBlock109("div", {
    class: _normalizeClass63(_ctx.classes)
  }, [
    _createVNode44(_component_Button, {
      icon: _ctx.MinusOutlined,
      shape: "square",
      size: "small",
      disabled: _ctx.disabled || _ctx.disabledMinus || parseFloat(_ctx.formValue) <= _ctx.nMin,
      onClick: _ctx.onMinusClick
    }, null, 8, ["icon", "disabled", "onClick"]),
    _createElementVNode86("input", {
      class: "ak-stepper_input",
      type: _ctx.allowDecimal ? "text" : "tel",
      inputmode: _ctx.allowDecimal ? "decimal" : "numeric",
      name: _ctx.name,
      disabled: _ctx.disabled,
      readonly: _ctx.disabledInput,
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
      onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onChange: _cache[3] || (_cache[3] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
      ref: "inputEl"
    }, null, 40, _hoisted_196),
    _createVNode44(_component_Button, {
      icon: _ctx.PlusOutlined,
      shape: "square",
      size: "small",
      disabled: _ctx.disabled || _ctx.disabledPlus || parseFloat(_ctx.formValue) >= _ctx.nMax,
      onClick: _ctx.onPlusClick
    }, null, 8, ["icon", "disabled", "onClick"])
  ], 2);
}
_sfc_script126.render = render124;
_sfc_script126.__file = "packages/ui/src/Stepper/Stepper.vue";

// packages/ui/src/Stepper/index.ts
var install92 = withInstall(_sfc_script126);
var Stepper_default = _sfc_script126;

// packages/ui/src/StickyViewItem/index.ts
var StickyViewItem_default = _sfc_script84;
var install93 = withNoopInstall(_sfc_script84);

// vue:./Stopwatch.vue
import { defineComponent as defineComponent100 } from "vue";
import { renderSlot as _renderSlot56, toDisplayString as _toDisplayString48, createTextVNode as _createTextVNode23, openBlock as _openBlock124, createElementBlock as _createElementBlock110 } from "vue";
var _sfc_script127 = defineComponent100({
  name: "ak-stopwatch",
  props: {
    showMilliseconds: {
      type: Boolean,
      default: true
    },
    thousands: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    start: returnTrue,
    reset: returnTrue,
    stop: (payload) => payload && payload.detail && Array.isArray(payload.laps)
  },
  setup(props, { emit }) {
    let time = 0;
    let startTime = 0;
    let laps = [];
    const { times, timeStop, timeUpdate, timeStart } = useCountTime(({ update }) => {
      time = Date.now() - startTime;
      update(time);
    });
    function doing() {
      return startTime > 0;
    }
    function stop() {
      if (doing()) {
        const _laps = cloneData(laps);
        _laps.push(getNextLap());
        emit("stop", {
          detail: getCountTime(time),
          laps: _laps
        });
        startTime = 0;
        timeStop();
      }
    }
    function start() {
      if (startTime === 0) {
        startTime = Date.now() - time;
      }
      emit("start");
      timeStart();
    }
    function reset() {
      doing() && stop();
      emit("reset");
      time = 0;
      laps = [];
      timeUpdate(0);
      timeStop();
    }
    function getNextLap() {
      let totalTime = 0;
      laps.forEach(({ time: time2 }) => {
        totalTime += time2;
      });
      return getCountTime(time - totalTime);
    }
    function lap() {
      if (doing()) {
        laps.push(getNextLap());
        return cloneData(laps);
      }
      return [];
    }
    timeUpdate(0);
    return {
      time,
      countTime: times,
      stop,
      start,
      reset,
      lap
    };
  }
});
var _hoisted_197 = { class: "ak-stopwatch" };
function render125(_ctx, _cache) {
  return _openBlock124(), _createElementBlock110("div", _hoisted_197, [
    _renderSlot56(_ctx.$slots, "default", {
      time: _ctx.countTime.time,
      days: _ctx.countTime.days,
      fullHours: _ctx.countTime.fullHours,
      thousandsFullHours: _ctx.countTime.thousandsFullHours,
      hours: _ctx.countTime.hours,
      minutes: _ctx.countTime.minutes,
      seconds: _ctx.countTime.seconds,
      milliseconds: _ctx.countTime.milliseconds
    }, () => [
      _createTextVNode23(_toDisplayString48(parseInt(_ctx.countTime.fullHours) > 0 ? (_ctx.thousands ? _ctx.countTime.thousandsFullHours : _ctx.countTime.fullHours) + ":" : "") + _toDisplayString48(_ctx.countTime.minutes) + ":" + _toDisplayString48(_ctx.countTime.seconds) + _toDisplayString48(_ctx.showMilliseconds ? "." + _ctx.countTime.milliseconds : ""), 1)
    ])
  ]);
}
_sfc_script127.render = render125;
_sfc_script127.__file = "packages/ui/src/Stopwatch/Stopwatch.vue";

// packages/ui/src/Stopwatch/index.ts
var install94 = withInstall(_sfc_script127);
var Stopwatch_default = _sfc_script127;

// vue:./SwipeCell.vue
import { ref as ref51, defineComponent as defineComponent101, computed as computed63, reactive as reactive8 } from "vue";

// packages/ui/src/SwipeCell/util.ts
var getButtons = (buttons) => {
  const _buttons = [];
  if (Array.isArray(buttons)) {
    buttons.forEach((v) => {
      if (v && typeof v.text === "string") {
        _buttons.push({
          text: v.text,
          type: getEnumsValue(STATE_TYPES, v.type)
        });
      }
    });
  }
  return _buttons;
};
var getInnerStyles5 = ({
  translateX,
  duration
}) => ({
  transform: "translate3d(-" + translateX + "px, 0px, 0px)",
  transitionDuration: duration + "s"
});
var getButtonStyles2 = ({
  buttonTranslateXs,
  duration,
  index
}) => ({
  transform: "translate3d(-" + (buttonTranslateXs[index] || 0) + "px, 0px, 0px)",
  transitionDuration: duration + "s"
});

// vue:./SwipeCell.vue
import { renderSlot as _renderSlot57, renderList as _renderList22, Fragment as _Fragment23, openBlock as _openBlock125, createElementBlock as _createElementBlock111, toDisplayString as _toDisplayString49, normalizeClass as _normalizeClass64, normalizeStyle as _normalizeStyle30, createElementVNode as _createElementVNode87 } from "vue";
var _sfc_script128 = defineComponent101({
  name: "ak-swipe-cell",
  props: {
    buttons: {
      type: Array,
      validator: (items) => {
        return Array.isArray(items) && items.filter((item) => {
          return !(item && typeof item.text === "string");
        }).length === 0;
      },
      default: () => []
    }
  },
  emits: {
    buttonClick: (payload) => payload && typeof payload.index === "number"
  },
  setup(props, ctx) {
    const root = ref51();
    const buttonsEl = ref51();
    const translateX = ref51(0);
    const duration = ref51(0);
    const buttonTranslateXs = reactive8([]);
    let coords;
    let isShow = false;
    function show(x) {
      translateX.value = x;
      duration.value = 0.6;
      buttonTranslateXs.forEach((v, k) => {
        buttonTranslateXs[k] = 0;
      });
      isShow = true;
    }
    function hide() {
      if (!isShow) {
        return;
      }
      isShow = false;
      translateX.value = 0;
      duration.value = 0.6;
      buttonTranslateXs.forEach((v, k) => {
        buttonTranslateXs[k] = 0;
      });
    }
    function onButtonClick(item, index) {
      ctx.emit("buttonClick", {
        item: cloneData(item),
        index
      });
      hide();
    }
    const buttons2 = computed63(() => getButtons(props.buttons));
    useTouch({
      el: root,
      onTouchStart(e) {
        if (props.buttons.length === 0) {
          return;
        }
        coords = {
          startX: e.touchObject.clientX,
          buttonsW: buttonsEl.value.clientWidth,
          isShow: translateX.value > 0,
          isSwipe: false
        };
        if (coords.isShow) {
          e.stopPropagation();
        }
      },
      onTouchMove(e) {
        if (!coords) {
          return;
        }
        const { startX, buttonsW, isSwipe, isShow: isShow2 } = coords;
        let x = startX - e.touchObject.clientX;
        if (!isShow2 && !isSwipe && x < 0) {
          coords = null;
          return;
        }
        coords.isSwipe = true;
        if (isShow2) {
          x += buttonsW;
        }
        const max = rangeNumber(x, 0, buttonsW);
        const $children = buttonsEl.value.children;
        for (let i = 0, len = $children.length; i < len; i++) {
          buttonTranslateXs[i] = $children[i].offsetLeft * (buttonsW - max) / buttonsW;
        }
        translateX.value = max + (x > buttonsW ? getStretchOffset2(x - buttonsW) : 0);
        duration.value = 0;
        e.stopPropagation();
      },
      onTouchEnd(e) {
        if (coords) {
          const { isSwipe, buttonsW } = coords;
          if (isSwipe && translateX.value > buttonsW / 2) {
            show(buttonsW);
          } else {
            hide();
          }
          coords = null;
          e.stopPropagation();
        }
      }
    });
    const innerStyles = computed63(() => getInnerStyles5({
      translateX: translateX.value,
      duration: duration.value
    }));
    useBlur(hide);
    useStop(buttonsEl, "click");
    return {
      root,
      buttonsEl,
      buttonTranslateXs,
      buttons2,
      duration,
      noop,
      onButtonClick,
      innerStyles,
      getButtonStyles: getButtonStyles2
    };
  }
});
var _hoisted_198 = {
  class: "ak-swipe-cell ak-horizontal-hairline",
  ref: "root"
};
var _hoisted_277 = {
  class: "ak-swipe-cell_buttons",
  ref: "buttonsEl"
};
var _hoisted_365 = ["onClick"];
function render126(_ctx, _cache) {
  return _openBlock125(), _createElementBlock111("div", _hoisted_198, [
    _createElementVNode87("div", {
      class: "ak-swipe-cell_inner",
      style: _normalizeStyle30(_ctx.innerStyles)
    }, [
      _renderSlot57(_ctx.$slots, "default"),
      _createElementVNode87("div", _hoisted_277, [
        (_openBlock125(true), _createElementBlock111(_Fragment23, null, _renderList22(_ctx.buttons2, (item, index) => {
          return _openBlock125(), _createElementBlock111("button", {
            class: _normalizeClass64(["ak-swipe-cell_button", ["type--" + item.type]]),
            key: index,
            style: _normalizeStyle30(_ctx.getButtonStyles({
              buttonTranslateXs: _ctx.buttonTranslateXs,
              duration: _ctx.duration,
              index
            })),
            onClick: ($event) => _ctx.onButtonClick(item, index)
          }, _toDisplayString49(item.text), 15, _hoisted_365);
        }), 128))
      ], 512)
    ], 4)
  ], 512);
}
_sfc_script128.render = render126;
_sfc_script128.__file = "packages/ui/src/SwipeCell/SwipeCell.vue";

// packages/ui/src/SwipeCell/index.ts
var install95 = withInstall(_sfc_script128);
var SwipeCell_default = _sfc_script128;

// packages/ui/src/SwiperItem/index.ts
var SwiperItem_default = _sfc_script75;
var install96 = withNoopInstall(_sfc_script75);

// vue:./Switch.vue
import { onMounted as onMounted33, ref as ref52, watch as watch36, defineComponent as defineComponent102, computed as computed64 } from "vue";

// packages/ui/src/Switch/util.ts
var getClasses21 = (disabled) => {
  return ["ak-switch", { disabled: !!disabled }];
};
var getStyles10 = (props) => {
  const styles = {};
  props.color && (styles["--ak-color"] = props.color);
  props.activeColor && (styles["--ak-active-color"] = props.activeColor);
  props.size != null && props.size > 0 && (styles["--ak-size"] = parseFloat(props.size) + "px");
  return styles;
};

// vue:./Switch.vue
import { createElementVNode as _createElementVNode88, normalizeClass as _normalizeClass65, normalizeStyle as _normalizeStyle31, openBlock as _openBlock126, createElementBlock as _createElementBlock112 } from "vue";
var _sfc_script129 = defineComponent102({
  name: "ak-switch",
  props: {
    ...formItemProps,
    modelValue: {
      type: Boolean,
      default: null
    },
    color: {
      type: String,
      validator: colorValidator
    },
    activeColor: {
      type: String,
      validator: colorValidator
    },
    size: {
      type: [Number, String]
    }
  },
  emits: {
    "update:modelValue": (value) => isBoolean(value),
    change: (value) => isBoolean(value)
  },
  setup(props, { emit }) {
    let isValueNull = props.modelValue == null;
    const checked = ref52(false);
    const { inputEl, setInputChecked, getInputChecked } = useInput();
    const classes = computed64(() => getClasses21(props.disabled));
    const styles = computed64(() => getStyles10(props));
    function onChange() {
      const value = getInputChecked();
      checked.value = value;
      if (props.modelValue !== value) {
        emit("update:modelValue", value);
      }
      emit("change", value);
    }
    onMounted33(() => {
      setInputChecked(checked.value);
    });
    watch36(() => props.modelValue, (val) => {
      if (isBoolean(val) && val !== checked.value) {
        checked.value = val;
        setInputChecked(val);
      } else if (isValueNull) {
        isValueNull = false;
        emit("update:modelValue", checked.value);
        emit("change", checked.value);
      }
    }, { immediate: true });
    return {
      inputEl,
      checked,
      onChange,
      classes,
      styles
    };
  }
});
var _hoisted_199 = ["disabled", "name", "value"];
function render127(_ctx, _cache) {
  return _openBlock126(), _createElementBlock112("label", {
    class: _normalizeClass65(_ctx.classes),
    style: _normalizeStyle31(_ctx.styles)
  }, [
    _createElementVNode88("input", {
      class: "ak-switch_checkbox",
      type: "checkbox",
      disabled: _ctx.disabled,
      name: _ctx.name,
      value: _ctx.checked.toString(),
      onChange: _cache[0] || (_cache[0] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
      ref: "inputEl"
    }, null, 40, _hoisted_199)
  ], 6);
}
_sfc_script129.render = render127;
_sfc_script129.__file = "packages/ui/src/Switch/Switch.vue";

// packages/ui/src/Switch/index.ts
var install97 = withInstall(_sfc_script129);
var Switch_default = _sfc_script129;

// vue:./TabBar.vue
import { defineComponent as defineComponent103 } from "vue";

// packages/ui/src/TabBar/util.ts
var getItemClasses7 = (index, activeIndex) => {
  return [
    "ak-tab-bar_item",
    {
      active: index === activeIndex
    }
  ];
};

// vue:./TabBar.vue
import { renderList as _renderList23, Fragment as _Fragment24, openBlock as _openBlock127, createElementBlock as _createElementBlock113, resolveComponent as _resolveComponent61, createBlock as _createBlock44, createCommentVNode as _createCommentVNode48, mergeProps as _mergeProps13, withCtx as _withCtx30, createVNode as _createVNode45, toDisplayString as _toDisplayString50, createElementVNode as _createElementVNode89, normalizeClass as _normalizeClass66, normalizeStyle as _normalizeStyle32 } from "vue";
var _sfc_script130 = defineComponent103({
  name: "ak-tab-bar",
  components: { Image: _sfc_script17, Icon: _sfc_script2, Badge: _sfc_script14 },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits },
  setup(props, ctx) {
    return {
      getItemClasses: getItemClasses7,
      ...useTab(props, ctx, { tabName: "TabBar" })
    };
  }
});
var _hoisted_1100 = {
  class: "ak-tab-bar_list",
  ref: "listEl"
};
var _hoisted_278 = ["onClick"];
var _hoisted_366 = { class: "ak-tab-bar_item-text" };
function render128(_ctx, _cache) {
  const _component_Image = _resolveComponent61("Image");
  const _component_Icon = _resolveComponent61("Icon");
  const _component_Badge = _resolveComponent61("Badge");
  return _openBlock127(), _createElementBlock113("div", {
    class: "ak-tab-bar ak-horizontal-hairline",
    style: _normalizeStyle32(_ctx.styles)
  }, [
    _createElementVNode89("ul", _hoisted_1100, [
      (_openBlock127(true), _createElementBlock113(_Fragment24, null, _renderList23(_ctx.options2, (item, index) => {
        return _openBlock127(), _createElementBlock113("li", {
          class: _normalizeClass66(_ctx.getItemClasses(index, _ctx.activeIndex)),
          key: item.value,
          onClick: ($event) => _ctx.onChange(item.value)
        }, [
          _createVNode45(_component_Badge, _mergeProps13({ class: "ak-tab-bar_item-icon" }, item.badge), {
            default: _withCtx30(() => [
              item.iconLink ? (_openBlock127(), _createBlock44(_component_Image, {
                key: 0,
                src: index === _ctx.activeIndex ? item.activeIconLink : item.iconLink
              }, null, 8, ["src"])) : item.icon ? (_openBlock127(), _createBlock44(_component_Icon, {
                key: 1,
                icon: index === _ctx.activeIndex ? item.activeIcon : item.icon
              }, null, 8, ["icon"])) : _createCommentVNode48("v-if", true)
            ]),
            _: 2
          }, 1040),
          _createElementVNode89("span", _hoisted_366, _toDisplayString50(item.label), 1)
        ], 10, _hoisted_278);
      }), 128))
    ], 512)
  ], 4);
}
_sfc_script130.render = render128;
_sfc_script130.__file = "packages/ui/src/TabBar/TabBar.vue";

// packages/ui/src/TabBar/index.ts
var install98 = withInstall(_sfc_script130);
var TabBar_default = _sfc_script130;

// vue:./TabView.vue
import { ref as ref53, defineComponent as defineComponent104, provide as provide15 } from "vue";

// packages/ui/src/TabView/util.ts
var getClasses22 = (vertical) => ["ak-tab-view", { vertical }];

// vue:./TabView.vue
import { resolveComponent as _resolveComponent62, openBlock as _openBlock128, createBlock as _createBlock45, createElementVNode as _createElementVNode90, renderSlot as _renderSlot58, withCtx as _withCtx31, createVNode as _createVNode46, normalizeClass as _normalizeClass67, createElementBlock as _createElementBlock114 } from "vue";
var _sfc_script131 = defineComponent104({
  name: "ak-tab-view",
  components: { Tab: _sfc_script34, SideTab: _sfc_script109, Swiper: _sfc_script74 },
  props: {
    initialVertical: {
      type: Boolean,
      default: false
    },
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: {
    change: emitChangeValidator,
    animated: emitChangeValidator
  },
  setup(props, { emit }) {
    const vertical = ref53(!!props.initialVertical);
    const swiper = ref53();
    const tabList = ref53([]);
    const activeIndex = ref53(0);
    function resetItems($items) {
      tabList.value = $items.map(($item, index) => {
        const { name, subName } = $item.dataset;
        return {
          value: index,
          label: name || "",
          subLabel: subName || ""
        };
      });
    }
    const { listEl } = useList("tabView", resetItems);
    const onChange = (activeIndex2, fromIndex) => {
      emit("change", activeIndex2, fromIndex);
    };
    const onAnimated = (activeIndex2, fromIndex) => {
      emit("animated", activeIndex2, fromIndex);
    };
    function swipeTo(activeIndex2) {
      var _a;
      (_a = swiper.value) == null ? void 0 : _a.swipeTo(activeIndex2);
    }
    provide15("akTabViewVertical", vertical.value);
    const classes = getClasses22(vertical.value);
    return {
      activeIndex,
      tabList,
      vertical,
      listEl,
      swiper,
      onChange,
      onAnimated,
      swipeTo,
      classes
    };
  }
});
var _hoisted_1101 = { class: "ak-tab-view_header ak-horizontal-hairline" };
var _hoisted_279 = {
  class: "ak-tab-view_body",
  ref: "listEl"
};
function render129(_ctx, _cache) {
  const _component_SideTab = _resolveComponent62("SideTab");
  const _component_Tab = _resolveComponent62("Tab");
  const _component_Swiper = _resolveComponent62("Swiper");
  return _openBlock128(), _createElementBlock114("div", {
    class: _normalizeClass67(_ctx.classes)
  }, [
    _createElementVNode90("div", _hoisted_1101, [
      _ctx.vertical ? (_openBlock128(), _createBlock45(_component_SideTab, {
        key: 0,
        options: _ctx.tabList,
        activeValue: _ctx.activeIndex,
        "onUpdate:activeValue": _cache[0] || (_cache[0] = ($event) => _ctx.activeIndex = $event)
      }, null, 8, ["options", "activeValue"])) : (_openBlock128(), _createBlock45(_component_Tab, {
        key: 1,
        options: _ctx.tabList,
        activeValue: _ctx.activeIndex,
        "onUpdate:activeValue": _cache[1] || (_cache[1] = ($event) => _ctx.activeIndex = $event),
        "scroll-threshold": _ctx.scrollThreshold
      }, null, 8, ["options", "activeValue", "scroll-threshold"]))
    ]),
    _createElementVNode90("div", _hoisted_279, [
      _createVNode46(_component_Swiper, {
        activeIndex: _ctx.activeIndex,
        "onUpdate:activeIndex": _cache[2] || (_cache[2] = ($event) => _ctx.activeIndex = $event),
        onChange: _ctx.onChange,
        onAnimated: _ctx.onAnimated,
        ref: "swiper",
        initialVertical: _ctx.vertical,
        bounces: false
      }, {
        default: _withCtx31(() => [
          _renderSlot58(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["activeIndex", "onChange", "onAnimated", "initialVertical"])
    ], 512)
  ], 2);
}
_sfc_script131.render = render129;
_sfc_script131.__file = "packages/ui/src/TabView/TabView.vue";

// vue:./TabViewItem.vue
import { ref as ref54, defineComponent as defineComponent105, inject as inject19 } from "vue";
import { renderSlot as _renderSlot59, openBlock as _openBlock129, createElementBlock as _createElementBlock115 } from "vue";
var _sfc_script132 = defineComponent105({
  name: "ak-tab-view-item",
  props: {
    name: {
      type: String,
      required: true
    },
    subName: {
      type: String,
      default: null
    }
  },
  setup() {
    const root = ref54();
    const vertical = inject19("akTabViewVertical", false);
    useListItem("swiper");
    useListItem("tabView");
    let coords;
    useTouch({
      el: root,
      onTouchStart(e) {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth
        } = e.currentTarget;
        const touch = e.touchObject;
        if (vertical && (scrollHeight === scrollTop + clientHeight || scrollTop === 0) || !vertical && (scrollWidth === scrollLeft + clientWidth || scrollLeft === 0)) {
          if (scrollHeight !== clientHeight || scrollWidth !== clientWidth) {
            coords = {
              vertical,
              position: vertical && scrollTop === 0 || !vertical && scrollLeft === 0 ? 1 : 2,
              startX: touch.pageX,
              startY: touch.pageY,
              timeStamp: e.timeStamp,
              stop: false
            };
          }
        } else {
          coords = {
            vertical,
            position: 1,
            startX: 0,
            startY: 0,
            timeStamp: e.timeStamp,
            stop: true
          };
        }
      },
      onTouchMove(e) {
        if (!coords) {
          return;
        }
        if (coords.stop) {
          e.stopPropagation();
          return;
        }
        const { pageX, pageY } = e.touchObject;
        const offset = coords.vertical ? coords.startY - pageY : coords.startX - pageX;
        if (coords.position === 1 && offset > 0 || coords.position === 2 && offset < 0) {
          coords.stop = true;
          e.stopPropagation();
        }
      },
      onTouchEnd() {
        coords = null;
      }
    });
    return {
      root
    };
  }
});
var _hoisted_1102 = ["data-name", "data-sub-name"];
function render130(_ctx, _cache) {
  return _openBlock129(), _createElementBlock115("div", {
    class: "ak-swiper-item ak-tab-view-item",
    "data-name": _ctx.name,
    "data-sub-name": _ctx.subName,
    ref: "root"
  }, [
    _renderSlot59(_ctx.$slots, "default")
  ], 8, _hoisted_1102);
}
_sfc_script132.render = render130;
_sfc_script132.__file = "packages/ui/src/TabView/TabViewItem.vue";

// packages/ui/src/TabView/index.ts
var TabView_default = _sfc_script131;
var install99 = multiWithInstall(_sfc_script131, [_sfc_script132]);

// packages/ui/src/TabViewItem/index.ts
var TabViewItem_default = _sfc_script132;
var install100 = withNoopInstall(_sfc_script132);

// vue:./TimeAgo.vue
import { defineComponent as defineComponent106, ref as ref55, toRef as toRef7, watch as watch37 } from "vue";

// node_modules/.pnpm/timeago.js@4.0.2/node_modules/timeago.js/esm/lang/en_US.js
var EN_US = ["second", "minute", "hour", "day", "week", "month", "year"];
function en_US_default(diff, idx) {
  if (idx === 0)
    return ["just now", "right now"];
  var unit = EN_US[Math.floor(idx / 2)];
  if (diff > 1)
    unit += "s";
  return [diff + " " + unit + " ago", "in " + diff + " " + unit];
}

// node_modules/.pnpm/timeago.js@4.0.2/node_modules/timeago.js/esm/lang/zh_CN.js
var ZH_CN = ["\u79D2", "\u5206\u949F", "\u5C0F\u65F6", "\u5929", "\u5468", "\u4E2A\u6708", "\u5E74"];
function zh_CN_default2(diff, idx) {
  if (idx === 0)
    return ["\u521A\u521A", "\u7247\u523B\u540E"];
  var unit = ZH_CN[~~(idx / 2)];
  return [diff + " " + unit + "\u524D", diff + " " + unit + "\u540E"];
}

// node_modules/.pnpm/timeago.js@4.0.2/node_modules/timeago.js/esm/register.js
var Locales = {};
var register = function(locale, func) {
  Locales[locale] = func;
};
var getLocale = function(locale) {
  return Locales[locale] || Locales["en_US"];
};

// node_modules/.pnpm/timeago.js@4.0.2/node_modules/timeago.js/esm/utils/date.js
var SEC_ARRAY = [
  60,
  60,
  24,
  7,
  365 / 7 / 12,
  12
];
function toDate(input) {
  if (input instanceof Date)
    return input;
  if (!isNaN(input) || /^\d+$/.test(input))
    return new Date(parseInt(input));
  input = (input || "").trim().replace(/\.\d+/, "").replace(/-/, "/").replace(/-/, "/").replace(/(\d)T(\d)/, "$1 $2").replace(/Z/, " UTC").replace(/([+-]\d\d):?(\d\d)/, " $1$2");
  return new Date(input);
}
function formatDiff(diff, localeFunc) {
  var agoIn = diff < 0 ? 1 : 0;
  diff = Math.abs(diff);
  var totalSec = diff;
  var idx = 0;
  for (; diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++) {
    diff /= SEC_ARRAY[idx];
  }
  diff = Math.floor(diff);
  idx *= 2;
  if (diff > (idx === 0 ? 9 : 1))
    idx += 1;
  return localeFunc(diff, idx, totalSec)[agoIn].replace("%s", diff.toString());
}
function diffSec(date, relativeDate) {
  var relDate = relativeDate ? toDate(relativeDate) : new Date();
  return (+relDate - +toDate(date)) / 1e3;
}

// node_modules/.pnpm/timeago.js@4.0.2/node_modules/timeago.js/esm/format.js
var format = function(date, locale, opts) {
  var sec = diffSec(date, opts && opts.relativeDate);
  return formatDiff(sec, getLocale(locale));
};

// node_modules/.pnpm/timeago.js@4.0.2/node_modules/timeago.js/esm/index.js
register("en_US", en_US_default);
register("zh_CN", zh_CN_default2);

// packages/ui/src/hooks/use-timer.ts
import { watchEffect } from "vue";

// packages/ui/src/helpers/timer.ts
var cache = {};
function step(interval) {
  if (cache[interval]) {
    cache[interval].callbacks.forEach((callback) => {
      callback();
    });
  }
}
function addTimer(callback, interval = 60) {
  if (cache[interval]) {
    cache[interval].callbacks.push(callback);
  } else {
    cache[interval] = {
      timer: window.setInterval(() => step(interval), interval * 1e3),
      interval,
      callbacks: [callback]
    };
  }
  return function removeTimer() {
    if (cache[interval]) {
      const { timer, callbacks } = cache[interval];
      for (let i = 0; i < callbacks.length; i++) {
        if (callbacks[i] === callback) {
          callbacks.splice(i, 1);
        }
      }
      if (callbacks.length === 0) {
        clearInterval(timer);
        delete cache[interval];
      }
    }
  };
}

// packages/ui/src/hooks/use-timer.ts
var useTimer = (callback, interval) => {
  let removeTimer;
  watchEffect((onInvalidate) => {
    var _a;
    removeTimer = addTimer(callback, (_a = interval.value) != null ? _a : 1e3);
    onInvalidate(() => {
      removeTimer && removeTimer();
    });
  });
};

// packages/ui/src/TimeAgo/util.ts
function getDate(props) {
  let djs = null;
  const { time, formatTemplate } = props;
  if (time instanceof Date || typeof time === "number") {
    djs = day_default(time);
  } else if (typeof time === "string" && formatTemplate) {
    djs = day_default(time, formatTemplate);
  }
  if (djs && djs.isValid()) {
    return djs.toDate();
  }
  return null;
}

// vue:./TimeAgo.vue
import { toDisplayString as _toDisplayString51, openBlock as _openBlock130, createElementBlock as _createElementBlock116 } from "vue";
var _sfc_script133 = defineComponent106({
  name: "ak-time-ago",
  props: {
    time: {
      type: [Date, String, Number]
    },
    formatTemplate: {
      type: String
    },
    interval: {
      type: Number,
      default: 60
    }
  },
  setup(props) {
    const timeAgo = ref55("");
    const { locale } = useLocale();
    function update() {
      const d = getDate(props);
      timeAgo.value = d == null ? "" : format(d, locale.value.lang.replace("-", "_"));
    }
    watch37([() => props.time, () => props.formatTemplate], update, {
      immediate: true
    });
    watch37(locale, () => update());
    useTimer(update, toRef7(props, "interval"));
    return {
      timeAgo
    };
  }
});
var _hoisted_1103 = { class: "ak-time-ago" };
function render132(_ctx, _cache) {
  return _openBlock130(), _createElementBlock116("div", _hoisted_1103, _toDisplayString51(_ctx.timeAgo), 1);
}
_sfc_script133.render = render132;
_sfc_script133.__file = "packages/ui/src/TimeAgo/TimeAgo.vue";

// packages/ui/src/TimeAgo/index.ts
var install101 = withInstall(_sfc_script133);
var TimeAgo_default = _sfc_script133;

// vue:./Timeline.vue
import { defineComponent as defineComponent107 } from "vue";
import { renderSlot as _renderSlot60, openBlock as _openBlock131, createElementBlock as _createElementBlock117 } from "vue";
var _sfc_script134 = defineComponent107({
  name: "ak-timeline"
});
var _hoisted_1104 = { class: "ak-timeline" };
function render133(_ctx, _cache) {
  return _openBlock131(), _createElementBlock117("div", _hoisted_1104, [
    _renderSlot60(_ctx.$slots, "default")
  ]);
}
_sfc_script134.render = render133;
_sfc_script134.__file = "packages/ui/src/Timeline/Timeline.vue";

// vue:./TimelineItem.vue
import { defineComponent as defineComponent108 } from "vue";
import { createElementVNode as _createElementVNode91, renderSlot as _renderSlot61, normalizeStyle as _normalizeStyle33, toDisplayString as _toDisplayString52, createTextVNode as _createTextVNode24, openBlock as _openBlock132, createElementBlock as _createElementBlock118, createCommentVNode as _createCommentVNode50 } from "vue";
var _sfc_script135 = defineComponent108({
  name: "ak-timeline-item",
  props: {
    dotColor: {
      type: String,
      validator: colorValidator
    },
    title: {
      type: String
    }
  }
});
var _hoisted_1105 = {
  class: "ak-timeline-item ak-horizontal-hairline",
  ref: "root"
};
var _hoisted_280 = /* @__PURE__ */ _createElementVNode91("div", { class: "ak-timeline-item_line" }, null, -1);
var _hoisted_367 = { class: "ak-timeline-item_index" };
var _hoisted_425 = { class: "ak-timeline-item_inner" };
var _hoisted_511 = {
  key: 0,
  class: "ak-timeline-item_title"
};
var _hoisted_63 = { class: "ak-timeline-item_content" };
function render134(_ctx, _cache) {
  return _openBlock132(), _createElementBlock118("div", _hoisted_1105, [
    _hoisted_280,
    _createElementVNode91("div", _hoisted_367, [
      _renderSlot61(_ctx.$slots, "dot", {}, () => [
        _createElementVNode91("i", {
          class: "ak-timeline-item_dot",
          style: _normalizeStyle33({ borderColor: _ctx.dotColor })
        }, null, 4)
      ])
    ]),
    _createElementVNode91("div", _hoisted_425, [
      _ctx.title || _ctx.$slots.title ? (_openBlock132(), _createElementBlock118("div", _hoisted_511, [
        _renderSlot61(_ctx.$slots, "title", {}, () => [
          _createTextVNode24(_toDisplayString52(_ctx.title), 1)
        ])
      ])) : _createCommentVNode50("v-if", true),
      _createElementVNode91("div", _hoisted_63, [
        _renderSlot61(_ctx.$slots, "default")
      ])
    ])
  ], 512);
}
_sfc_script135.render = render134;
_sfc_script135.__file = "packages/ui/src/Timeline/TimelineItem.vue";

// packages/ui/src/Timeline/index.ts
var Timeline_default = _sfc_script134;
var install102 = multiWithInstall(_sfc_script134, [_sfc_script135]);

// packages/ui/src/TimelineItem/index.ts
var TimelineItem_default = _sfc_script135;
var install103 = withNoopInstall(_sfc_script135);

// packages/ui/src/index.ts
var ArkUI = {
  install(app) {
    Object.values(install_exports).forEach((plugin) => {
      app.use(plugin);
    });
  }
};
var src_default = ArkUI;
export {
  ActionSheet_default as AkActionSheet,
  ActivityIndicator_default as AkActivityIndicator,
  Avatar_default as AkAvatar,
  AvatarGroup_default as AkAvatarGroup,
  BackTop_default as AkBackTop,
  Badge_default as AkBadge,
  Button_default as AkButton,
  ButtonGroup_default as AkButtonGroup,
  Calendar_default as AkCalendar,
  CalendarPopup_default as AkCalendarPopup,
  CalendarView_default as AkCalendarView,
  Cascader_default as AkCascader,
  CascaderPopup_default as AkCascaderPopup,
  CascaderView_default as AkCascaderView,
  Cell_default as AkCell,
  Checkbox_default as AkCheckbox,
  CheckboxGroup_default as AkCheckboxGroup,
  CircleProgress_default as AkCircleProgress,
  Col_default as AkCol,
  Collapse_default as AkCollapse,
  CollapseItem_default as AkCollapseItem,
  ConfigProvider_default as AkConfigProvider,
  Copy_default as AkCopy,
  CountDown_default as AkCountDown,
  CountUp_default as AkCountUp,
  DatePicker_default as AkDatePicker,
  DatePickerPopup_default as AkDatePickerPopup,
  DatePickerView_default as AkDatePickerView,
  Dialog_default as AkDialog,
  Divider_default as AkDivider,
  Drawer_default as AkDrawer,
  Dropdown_default as AkDropdown,
  Empty_default as AkEmpty,
  Fixed_default as AkFixed,
  FlatList_default as AkFlatList,
  Form_default as AkForm,
  FormFooter_default as AkFormFooter,
  FormItem_default as AkFormItem,
  Group_default as AkGroup,
  Icon_default as AkIcon,
  Image_default as AkImage,
  ImagePreview_default as AkImagePreview,
  ImageUploader_default as AkImageUploader,
  IndexView_default as AkIndexView,
  IndexViewItem_default as AkIndexViewItem,
  Input_default as AkInput,
  LoadMore_default as AkLoadMore,
  LoadingIcon_default as AkLoadingIcon,
  Modal_default as AkModal,
  NavBar_default as AkNavBar,
  NoticeBar_default as AkNoticeBar,
  Notify_default as AkNotify,
  NumberKeyboard_default as AkNumberKeyboard,
  Order_default as AkOrder,
  Pagination_default as AkPagination,
  Picker_default as AkPicker,
  PickerPopup_default as AkPickerPopup,
  PickerView_default as AkPickerView,
  PopDialog_default as AkPopDialog,
  PopMenu_default as AkPopMenu,
  Popover_default as AkPopover,
  Price_default as AkPrice,
  Progress_default as AkProgress,
  Radio_default as AkRadio,
  RadioGroup_default as AkRadioGroup,
  Range_default as AkRange,
  Rate_default as AkRate,
  Result_default as AkResult,
  Row_default as AkRow,
  ScrollTab_default as AkScrollTab,
  ScrollTabItem_default as AkScrollTabItem,
  ScrollView_default as AkScrollView,
  SearchBar_default as AkSearchBar,
  SelectorField_default as AkSelectorField,
  SideTab_default as AkSideTab,
  Skeleton_default as AkSkeleton,
  SkeletonAvatar_default as AkSkeletonAvatar,
  SkeletonButton_default as AkSkeletonButton,
  SkeletonImage_default as AkSkeletonImage,
  SkeletonParagraph_default as AkSkeletonParagraph,
  SkeletonTitle_default as AkSkeletonTitle,
  Slider_default as AkSlider,
  Step_default as AkStep,
  Stepper_default as AkStepper,
  Steps_default as AkSteps,
  Sticky_default as AkSticky,
  StickyView_default as AkStickyView,
  StickyViewItem_default as AkStickyViewItem,
  Stopwatch_default as AkStopwatch,
  SwipeCell_default as AkSwipeCell,
  Swiper_default as AkSwiper,
  SwiperItem_default as AkSwiperItem,
  Switch_default as AkSwitch,
  Tab_default as AkTab,
  TabBar_default as AkTabBar,
  TabView_default as AkTabView,
  TabViewItem_default as AkTabViewItem,
  Tag_default as AkTag,
  TimeAgo_default as AkTimeAgo,
  Timeline_default as AkTimeline,
  TimelineItem_default as AkTimelineItem,
  Toast_default as AkToast,
  VirtualList_default as AkVirtualList,
  src_default as default,
  hideLoading,
  hideNotify,
  hideToast,
  showActionSheet,
  showCalendar,
  showCascader,
  showDatePicker,
  showDialog,
  showImagePreview,
  showLoading,
  showNotify,
  showPicker,
  showPopDialog,
  showPopMenu,
  showPopover,
  showToast
};
