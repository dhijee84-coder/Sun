import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PublicShell } from "./public-shell-DS30Z_td.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BVJAe3Sk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLIDES = [
	{
		image: "/img/hero-farm.jpg",
		heading: "You buy the panels. We run the farm.",
		desc: "Solan builds solar parks on open land. Clients purchase panels there. We install, maintain and operate everything — and you pay for the energy those panels generate."
	},
	{
		image: "/img/hero-cells.jpg",
		heading: "Serial-tracked modules. Fair allocation.",
		desc: "Every panel has a warranty life and a farm string. Capacity is allocated from live inventory — not from a rooftop survey."
	},
	{
		image: "/img/hero-plant.jpg",
		heading: "Energy billed on usage.",
		desc: "Watch daily generation from your panels. Pay for the kilowatt-hours they actually produce."
	}
];
function Home() {
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 7e3);
		return () => clearInterval(t);
	}, []);
	const slide = SLIDES[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex min-h-[70vh] items-center overflow-hidden bg-[#0f172a] text-white",
			children: [
				SLIDES.map((s, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.image,
					alt: "",
					fetchPriority: n === 0 ? "high" : "low",
					decoding: n === 0 ? "async" : "async",
					className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-0"}`
				}, s.image)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/45 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-copy relative z-10 max-w-xl px-8 py-20 md:px-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] font-bold tracking-[0.16em] text-gold uppercase",
							children: "Solan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-5xl leading-[1.05] font-semibold tracking-tight",
							children: slide.heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg text-white/90",
							children: slide.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "mt-6 inline-flex min-h-11 items-center rounded-sm bg-ember px-6 py-3 text-sm font-bold text-bg no-underline",
							children: "Buy panels"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Previous",
					className: "absolute top-1/2 left-4 z-10 size-10 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white",
					onClick: () => setI((n) => (n + SLIDES.length - 1) % SLIDES.length),
					children: "‹"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Next",
					className: "absolute top-1/2 right-4 z-10 size-10 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white",
					onClick: () => setI((n) => (n + 1) % SLIDES.length),
					children: "›"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/img/hero-farm.jpg",
				alt: "Solan solar farm on open land",
				width: 1400,
				height: 787,
				loading: "lazy",
				decoding: "async",
				className: "aspect-4/3 w-full rounded-md bg-[#1e293b] object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.16em] text-sky uppercase",
					children: "Who we are"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl font-medium",
					children: "Solan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: "Solan is not a rooftop installer. We develop solar farms on empty land, sell panel capacity to clients, and keep the plant running. Your panels stay on our site. Your portal shows generation, usage billing, warranty and support."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "No work on your house. No roof mounting. We own the land and the operations. You own the panels and the energy they produce."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					className: "mt-4 inline-block font-bold text-sky no-underline",
					children: "Know more →"
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.16em] text-sky uppercase",
						children: "The model"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl font-medium",
						children: "Energy billed on usage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "Buy a block of panels at a Solan farm. We commission and maintain them. You see daily generation and pay for the energy those panels actually produce."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block",
								children: "Our land"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Farms on open sites"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block",
								children: "Your panels"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Purchased capacity"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block",
								children: "Our ops"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Install + maintenance"
							})] })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/img/hero-plant.jpg",
					alt: "Solan plant operations",
					width: 1400,
					height: 787,
					loading: "lazy",
					decoding: "async",
					className: "w-full rounded-md bg-[#1e293b] object-cover"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.16em] text-sky uppercase",
					children: "What we do"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl font-medium",
					children: "Farm-side solar, end to end"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-6 md:grid-cols-3",
					children: [
						[
							"/img/hero-cells.jpg",
							"Panel sales",
							"Buy serial-tracked modules from live farm inventory.",
							"/solar"
						],
						[
							"/img/hero-farm.jpg",
							"Farm operations",
							"We install, inspect, connect and maintain every panel on our land.",
							"/how-it-works"
						],
						[
							"/img/hero-plant.jpg",
							"Usage billing",
							"Track generation from your panels and pay for the energy used.",
							"/login"
						]
					].map(([img, t, d, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden rounded-lg border border-line bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: "",
							width: 1400,
							height: 787,
							loading: "lazy",
							decoding: "async",
							className: "aspect-video w-full bg-[#1e293b] object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold",
									children: t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: d
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href,
									className: "mt-3 inline-block text-sm font-semibold text-sky no-underline",
									children: "Learn more →"
								})
							]
						})]
					}, t))
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
