import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { p as inr, r as CLIENT_NAV } from "./seed-ReQMGFmm.mjs";
import { t as authMiddleware } from "./middleware-9X6yXS5P.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { i as getMe } from "./profile-DQCRTp4N.mjs";
import { r as useCurrentUserState, t as RedirectToSignIn } from "./gates-CBZ3D9wg.mjs";
import { a as Lab, i as Field, n as Btn, o as Pill, r as Card, s as warrantyTone, t as Area } from "./ui-CXzw7Q9b.mjs";
import { a as Th, i as Td, n as Stat, r as TableWrap, t as PortalShell } from "./portal-shell-Bj-qPn6i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DGrfhKAa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getClientOverview = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e5ed5c0c16cf1a374ab8b543412406c4745104b8b5902de0e28e404970d61ad5"));
var getClientPanels = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("45a2019842cab6138da3d46c99f55f6b1523fbe29f4995797f58a74dce2b323f"));
var getClientClaims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("04267e44f832f1f2fe5ef2654328ea7c3fb043e559a0e8708271d4e361445c96"));
var createClaim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("8ef5f0d6dbf6b2bdef70b72fbb8cf309b6a94a43246216ffaba459da32bc4364"));
var getClientPayments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("65e10088bfa9c3dc55b3ab3113774399633826e526897263926851524d4d1a64"));
var getClientGeneration = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0e6f92d04aa69556c5678be4c9a2b39a3354e905234ce165d0cffa352f6a6dda"));
var getClientDocs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b660ae4c2f21cd85f5aabf271824ab42e83dd35f00bf4a13914cdab85d9b31ca"));
var getClientTickets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("dbb25affdf1534e77bf44ec01b098ba364d8d2c49e6534ed8e8039ee901325ed"));
var createTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("88c6df1ffb58cf33509d38df73fb08e988c56c42df1b02243b6e321abbbd8a67"));
var replyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("b3ac90e35e972dad45de49508579ed9028e7069de434d6c497e20c9c8641ad27"));
var getClientNotifs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ac1884f88a480b0bf8899a8b91e86fb6233ca48dda42496cfe0237a1b4dad863"));
var markNotifRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("7fbb888f389f28a1a40666da0735f6b7aa8c199e2914ebdb92c0126caf511edc"));
var getCatalogServices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("99106640cf38c3cc72a270fd4b199fdaaddc3f489955243308f7141d85199557"));
var requestService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("b6ee36c6489005c27a8dc1c2157172fd4b2144f78bb014d814c391d499bbed41"));
var saveKyc = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("f18d2186fb874470977161d06cb39081cce580700c8d3c0187d48f712427b6d0"));
var saveConnection = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("efb16b6355edfcd11d3055e53d5ba0fb3b8b61207a732389e0af64ab4b1bb0bf"));
function ClientDash() {
	const { user, isPending } = useCurrentUserState();
	const [me, setMe] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("home");
	const [ov, setOv] = (0, import_react.useState)(null);
	const [msg, setMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		getMe().then(setMe).catch(() => setMe(null));
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		if (!me || me.role !== "CLIENT") return;
		getClientOverview().then(setOv).catch((e) => setMsg(e.message));
	}, [me]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg text-muted",
		children: "Loading…"
	});
	if (!me && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	if (me && me.role !== "CLIENT") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/staff/dashboard" });
	if (!me || !ov) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg text-muted",
		children: "Opening client portal…"
	});
	const vis = ov.profile;
	const items = CLIENT_NAV.filter((n) => !("vis" in n) || vis[n.vis] !== false).map((n) => ({
		id: n.id,
		label: n.label
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Client portal",
		role: "CLIENT",
		items,
		tab,
		onTab: setTab,
		children: [
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-danger",
				children: msg
			}) : null,
			tab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home, {
				ov,
				onTab: setTab
			}) : null,
			tab === "kyc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kyc, {
				ov,
				reload: () => getClientOverview().then(setOv)
			}) : null,
			tab === "bill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bill, {
				ov,
				reload: () => getClientOverview().then(setOv)
			}) : null,
			tab === "project" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Project, { ov }) : null,
			tab === "panels" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panels, {}) : null,
			tab === "warranty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warranty, {}) : null,
			tab === "money" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Payments, {}) : null,
			tab === "docs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Docs, {}) : null,
			tab === "gen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gen, {}) : null,
			tab === "services" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}) : null,
			tab === "support" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Support, {}) : null,
			tab === "notifications" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notifs, {}) : null,
			tab === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						ov.user.name,
						" · ",
						ov.user.email,
						" · ",
						ov.user.phone || "no phone"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Use the sun/moon control in the header to switch day and night mode. Preference is saved on this device."
				})
			] }) : null
		]
	});
}
function Home({ ov, onTab }) {
	const done = ov.stages.filter((s) => s.status === "COMPLETED").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Allocated panels",
					value: ov.project?.allocated_panel_count ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Capacity",
					value: `${ov.project?.allocated_capacity_kw ?? 0} kW`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "KYC",
					value: ov.profile.kyc_status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Unread",
					value: ov.unread
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-wider text-muted uppercase",
				children: "Farm project"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl font-semibold",
				children: ov.project?.project_name || "No farm allocated yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					ov.project?.location,
					" · ",
					ov.project?.project_code
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm",
				children: [
					"Onboarding ",
					done,
					"/",
					ov.stages.length,
					" stages complete."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "gold",
						onClick: () => onTab("panels"),
						children: "My panels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => onTab("warranty"),
						children: "Warranty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => onTab("gen"),
						children: "Generation"
					})
				]
			})
		] })]
	});
}
function Kyc({ ov, reload }) {
	const p = ov.profile;
	const [status, setStatus] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await saveKyc({ data: {
				pan: String(fd.get("pan") || ""),
				panName: String(fd.get("panName") || ""),
				aadhaar: String(fd.get("aadhaar") || ""),
				address: String(fd.get("address") || ""),
				city: String(fd.get("city") || ""),
				state: String(fd.get("state") || ""),
				pincode: String(fd.get("pincode") || "")
			} });
			setStatus("Saved.");
			reload();
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 font-display text-xl font-semibold",
			children: "Profile & KYC"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "PAN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "pan",
					defaultValue: p.pan_number || ""
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Name on PAN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "panName",
					defaultValue: p.pan_name || ""
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Aadhaar (masked)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "aadhaar",
					defaultValue: p.aadhaar_masked || ""
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "address",
					defaultValue: p.address || ""
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "City" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "city",
							defaultValue: p.city || ""
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "State" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "state",
							defaultValue: p.state || ""
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "PIN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "pincode",
							defaultValue: p.pincode || ""
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					type: "submit",
					children: "Save KYC"
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-leaf",
					children: status
				}) : null
			]
		})]
	});
}
function Bill({ ov, reload }) {
	const e = ov.electricity;
	const [status, setStatus] = (0, import_react.useState)("");
	async function onSubmit(ev) {
		ev.preventDefault();
		const fd = new FormData(ev.currentTarget);
		try {
			await saveConnection({ data: {
				rr: String(fd.get("rr") || ""),
				discom: String(fd.get("discom") || ""),
				address: String(fd.get("address") || ""),
				units: Number(fd.get("units") || 0)
			} });
			setStatus("Saved.");
			reload();
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-display text-xl font-semibold",
				children: "Usage connection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "This is the meter we bill farm generation against. Hardware stays at the Solan park — not on a house."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "RR / consumer number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "rr",
						defaultValue: e?.rr_number || ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "DISCOM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "discom",
						defaultValue: e?.discom || ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Billing address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "address",
						defaultValue: e?.service_address || ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Average monthly units" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "units",
						type: "number",
						defaultValue: e?.avg_monthly_units ?? 0
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "gold",
						type: "submit",
						children: "Save connection"
					}),
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-leaf",
						children: status
					}) : null
				]
			})
		]
	});
}
function Project({ ov }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: ov.project?.project_name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					ov.project?.location,
					" · ",
					ov.project?.project_code
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					"Contract ",
					inr(ov.project?.contract_total),
					" · ",
					ov.project?.allocated_panel_count,
					" panels · ",
					ov.project?.allocated_capacity_kw,
					" kW"
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 font-semibold",
			children: "Commissioning stages"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-2",
			children: ov.stages.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-line py-2 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm",
					children: [
						s.stage_number,
						". ",
						s.stage_name
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: s.status === "COMPLETED" ? "leaf" : s.status === "IN_PROGRESS" ? "gold" : "muted",
						children: s.status
					}), s.payment_required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: s.payment_status === "PAID" ? "leaf" : "gold",
						children: s.payment_status
					}) : null]
				})]
			}, s.id))
		})] })]
	});
}
function Panels() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getClientPanels().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Serial" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Model" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "W" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Warranty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Ends" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-gold",
					children: p.serial_number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [
					p.manufacturer,
					" ",
					p.model
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.watt_rating }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: warrantyTone(p.warranty_status),
					children: p.warranty_status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.warranty_end_date })
			]
		}, p.id)) })]
	}) });
}
function Warranty() {
	const [panels, setPanels] = (0, import_react.useState)([]);
	const [claims, setClaims] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("");
	async function reload() {
		const [p, c] = await Promise.all([getClientPanels(), getClientClaims()]);
		setPanels(p);
		setClaims(c);
	}
	(0, import_react.useEffect)(() => {
		reload().catch(() => {});
	}, []);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await createClaim({ data: {
				panelId: String(fd.get("panelId")),
				issue: String(fd.get("issue")),
				details: String(fd.get("details"))
			} });
			setStatus("Claim submitted.");
			e.currentTarget.reset();
			await reload();
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-semibold",
				children: "File a warranty claim"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Panel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						name: "panelId",
						className: "min-h-11 w-full rounded-md border border-line bg-bg px-3",
						required: true,
						children: panels.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.serial_number,
								" · ",
								p.warranty_status
							]
						}, p.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Issue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "issue",
						required: true,
						placeholder: "Hotspot / output drop / physical damage"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, { name: "details" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "gold",
						type: "submit",
						children: "Submit claim"
					}),
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-leaf",
						children: status
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Claim" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Serial" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Issue" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Opened" })
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: claims.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
						className: "font-mono",
						children: c.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.serial_number }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.issue }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: c.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.created_at?.slice(0, 10) })
				]
			}, c.id)) })]
		}) })]
	});
}
function Payments() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getClientPayments().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Method" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Ref" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono",
					children: p.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: inr(p.amount) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.payment_method }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.transaction_reference }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: "leaf",
					children: p.status
				}) })
			]
		}, p.id)) })]
	}) });
}
function Docs() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getClientDocs().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Type" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "File" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Notes" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.document_type }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.original_filename }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: d.status === "VERIFIED" ? "leaf" : "gold",
					children: d.status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.notes })
			]
		}, d.id)) })]
	}) });
}
function Gen() {
	const [g, setG] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getClientGeneration().then(setG).catch(() => {});
	}, []);
	const max = (0, import_react.useMemo)(() => Math.max(1, ...g?.days.map((d) => Number(d.kwh)) || [1]), [g]);
	if (!g) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Loading generation…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Last 30 days",
				value: `${g.month.toFixed(1)} kWh`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Recorded total",
				value: `${g.total.toFixed(1)} kWh`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: "Daily generation from your farm strings. You are billed on this usage."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-36 items-end gap-0.5",
			children: g.days.slice(-30).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 rounded-t bg-gold/80",
				style: { height: `${Number(d.kwh) / max * 100}%` },
				title: `${d.day}: ${d.kwh} kWh`
			}, d.day))
		})] })]
	});
}
function Services() {
	const [data, setData] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getCatalogServices().then(setData).catch(() => {});
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [data.catalog.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: s.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: s.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-gold",
				children: Number(s.base_price) ? inr(s.base_price) : "On request"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-3",
				onClick: async () => {
					try {
						await requestService({ data: {
							serviceId: s.id,
							notes: "Requested from portal"
						} });
						setStatus("Requested.");
						getCatalogServices().then(setData);
					} catch (e) {
						setStatus(e instanceof Error ? e.message : "Failed");
					}
				},
				children: "Request"
			})
		] }, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "lg:col-span-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 font-semibold",
					children: "My requests"
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-leaf",
					children: status
				}) : null,
				data.mine.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "border-b border-line py-2 text-sm",
					children: [
						r.name,
						" · ",
						r.status,
						" ",
						r.quoted_price ? `· ${inr(r.quoted_price)}` : ""
					]
				}, r.id))
			]
		})]
	});
}
function Support() {
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getClientTickets().then(setTickets).catch(() => {});
	}, []);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await createTicket({ data: {
				subject: String(fd.get("subject")),
				category: String(fd.get("category")),
				description: String(fd.get("description"))
			} });
			setStatus("Opened.");
			e.currentTarget.reset();
			setTickets(await getClientTickets());
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-semibold",
				children: "New ticket"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "subject",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "category",
						className: "min-h-11 w-full rounded-md border border-line bg-bg px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "GENERAL" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "MAINTENANCE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "BILLING" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "WARRANTY" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						name: "description",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "gold",
						type: "submit",
						children: "Open ticket"
					}),
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-leaf",
						children: status
					}) : null
				]
			})]
		}), tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: t.subject
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: t.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					t.category,
					" · ",
					t.description
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: t.replies.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-md bg-cell p-2 text-sm",
					children: r.body
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex gap-2",
				onSubmit: async (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					await replyTicket({ data: {
						ticketId: t.id,
						body: String(fd.get("body"))
					} });
					e.currentTarget.reset();
					setTickets(await getClientTickets());
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "body",
					placeholder: "Reply…",
					required: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Send"
				})]
			})
		] }, t.id))]
	});
}
function Notifs() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getClientNotifs().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: rows.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: n.is_read ? "opacity-70" : "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: n.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: n.message
				})] }), !n.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: async () => {
						await markNotifRead({ data: n.id });
						setRows(await getClientNotifs());
					},
					children: "Mark read"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: "muted",
					children: "READ"
				})]
			})
		}, n.id))
	});
}
//#endregion
export { ClientDash as component };
