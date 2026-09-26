import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-BnQG7PXd.mjs";
import { a as STAFF_NAV, l as inr } from "./seed-i8Ev38tG.mjs";
import { a as getMe, i as createSsrRpc } from "./profile-CaSHhhIo.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { a as Lab, i as Field, n as Btn, o as Pill, r as Card, t as Area } from "./ui-CXzw7Q9b.mjs";
import { a as Th, i as Td, n as Stat, r as TableWrap, t as PortalShell } from "./portal-shell-vK6kU5-B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BAc1XWh4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getStaffDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("39c9c99c42d4e8e66c380e74389454c245dd1be6b8635a37bc159a7d3cf9dbeb"));
var listClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("063935b2adaf9d7c01d1235d3fc4cc26956b9cd17400321dd86b88db008605a2"));
var listProjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b114c0cfa4ef75b6f91ebde8c46e69dfed7cfbbdba52cdbe2c8c00a2ac20534e"));
var toggleProjectPublic = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("da34827094dc4277179b70f3ad4ffdaf9fbd2c3ca88ce799b2360f5c4767515e"));
var allocatePanels = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("5ec012bfd5fc3114a38f34517402a9bcf20e7420d821edab8f658fd74085d606"));
var listClaims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bfcb6d08f0aeb4e3fb794691ac4f43f0b171b9474533e7fbf9a543bc8cf17eb5"));
var transitionClaim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("178698cbb6e9b6cdfaba96787095b39eadd7179d43e15c9b6264190360bdcbb7"));
var listTickets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8ca22512cc546b464c44749e3393686047011d9d2225e3a586442d1fafd7ecf3"));
var staffReplyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("0ee679ddd4f5692a5498146e63d995270e01392f8e6b9d97c900a9bdb5193b4c"));
var listPayments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9bf99978249c1b0c09b964630de7e9b9019e47d0ffc914ba435ed5a961765657"));
var recordPayment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("fbe7b3e094d9621d67ba9ae4302ef1894c90f2c4376121ea1ba2e1025c450065"));
var listEnquiries = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3b3e4a7a56ae20a83f9ae00eaad0e74f5f5b9903a1e8ebe6d7036850177586dd"));
var setEnquiryStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("565dc50fd3060e32f542676e6ea49f2116663cd553011c2117333d52ae997fb1"));
var listStaffUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("eb1fa1fce99031ccf2f9d24e57d399ddd59766fbc975448dae55bbf1b6dd5aff"));
var setStaffRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("fb811620297f284f670141f7764f237123a4636f92d36412225c647ae064b6b2"));
var getPermissionMatrix = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("690d74d8a4a7747bcd2f7091a9a7d35155997c7c20056489c9269628de8c1b2a"));
var setPermission = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("42e1f595db23eda586618858bb6196700c4836c581af5911c7a470c776010940"));
var getCms = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0b31643e30ccc28d2d3d281f8b9e4fa281fea9cd1288c23c8a0aa47d0552492a"));
var saveContent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("6106aa0fd2be45fd3f878659b4a3051cf3484b8e28aea8bc0188bed693c15572"));
var saveSetting = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("dbdf417f0e57a9d924198ab1e3c830297eeccfd2c455c2e39485339aedbc92a7"));
var saveFaq = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("7a7bc229f6f3c4943b21bc4d4600dbf7bb10de49f9cb3824b0961bb9c22221f9"));
var listAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a8fda0d5e6cd6039e92477595e29a36a9601f7a65e12cd2668448e2fb7992570"));
var listDocuments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("dce32ec0efa8b531c6b6b31b2a7048f96956f2698a59acc3c41735663b8cb4c3"));
var verifyDocument = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("73b4ab909928f572772e9edc0e115451a0b98c251dcc1fc06185cb2d76d0d963"));
var exportCsv = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((kind) => kind).handler(createSsrRpc("5a3d08781c1ab78112b283d4b828ef21cd2cfe9240bb4b26da1ccbb02ef91abd"));
var staffNotify = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("febb91b722b71d3ade23df07af3f643ae6b079b184e23e368e29a8b3caa78fca"));
var listServicesAdmin = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f9b985636e22deb7d4803ff3cc3989b872794ade7e6f42b2c7001fa852834ef0"));
var quoteService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("c4cee150f7c85294112a458bb7bf5ba715100bc7cf9de11a1e2f0b4d859a3eee"));
var saveAnnouncement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("7bf577ce68f9747e20c83ded19607f26c0cea49147b1bfcaffc669dc4f22e46f"));
function can(role, perms, code) {
	if (!code) return true;
	if (role === "PRIMARY_ADMIN") return true;
	return perms.includes(code);
}
function StaffDash() {
	const { user, isPending } = useCurrentUserState();
	const [me, setMe] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("dashboard");
	const [err, setErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getMe().then(setMe).catch((e) => setErr(e.message));
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg text-muted",
		children: "Loading…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/staff-login" });
	if (me && me.role === "CLIENT") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/client/dashboard" });
	if (!me) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg text-muted",
		children: err || "Opening staff portal…"
	});
	const role = me.role;
	const items = (STAFF_NAV[role] || []).filter((n) => can(me.role, me.permissions, n.perm));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Operations",
		role: me.role,
		items,
		tab,
		onTab: setTab,
		children: [
			tab === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dash, {}) : null,
			tab === "clients" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clients, {}) : null,
			tab === "projects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}) : null,
			tab === "allocate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Allocate, {}) : null,
			tab === "warranty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Claims, {}) : null,
			tab === "payments" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pays, {}) : null,
			tab === "services" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svcs, {}) : null,
			tab === "tickets" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tickets, {}) : null,
			tab === "documents" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Docs, {}) : null,
			tab === "enquiries" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Enquiries, {}) : null,
			tab === "staff" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Staff, { me }) : null,
			tab === "reports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reports, {}) : null,
			tab === "audit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Audit, {}) : null,
			tab === "website" || tab === "faqs" || tab === "announcements" || tab === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cms, { tab }) : null,
			tab === "permissions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Perms, {}) : null,
			tab === "notifications" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notify, {}) : null
		]
	});
}
function Dash() {
	const [d, setD] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getStaffDashboard().then(setD).catch(() => {});
	}, []);
	if (!d) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Clients",
				value: d.clients
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Panels",
				value: d.panels
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Allocated",
				value: d.allocated
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Open tickets",
				value: d.openTickets
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Open claims",
				value: d.openClaims
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "New enquiries",
				value: d.newEnquiries
			})
		]
	});
}
function Clients() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listClients().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Email" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Phone" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "KYC" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "City" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Panels" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.full_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.phone }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: c.kyc_status === "VERIFIED" ? "leaf" : "gold",
					children: c.kyc_status
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.city }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.panels })
			]
		}, c.id)) })]
	}) });
}
function Projects() {
	const [rows, setRows] = (0, import_react.useState)([]);
	async function load() {
		setRows(await listProjects());
	}
	(0, import_react.useEffect)(() => {
		load().catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Code" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Farm" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Location" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Panels" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Available" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Public" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-gold",
					children: p.project_code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.project_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.location }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.total_panels }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.available }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: async () => {
						await toggleProjectPublic({ data: p.id });
						await load();
					},
					children: p.is_public ? "Public" : "Private"
				}) })
			]
		}, p.id)) })]
	}) });
}
function Allocate() {
	const [clients, setClients] = (0, import_react.useState)([]);
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listClients().then(setClients).catch(() => {});
		listProjects().then(setProjects).catch(() => {});
	}, []);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			const r = await allocatePanels({ data: {
				projectId: String(fd.get("projectId")),
				clientId: String(fd.get("clientId")),
				count: Number(fd.get("count"))
			} });
			setStatus(`Allocated ${r.allocated} panels.`);
		} catch (err) {
			setStatus(err instanceof Error ? err.message : "Failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-xl font-semibold",
			children: "FIFO panel allocation"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Client" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					name: "clientId",
					className: "min-h-11 w-full rounded-md border border-line bg-bg px-3",
					required: true,
					children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: c.id,
						children: [
							c.full_name,
							" (",
							c.panels,
							" panels)"
						]
					}, c.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Farm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					name: "projectId",
					className: "min-h-11 w-full rounded-md border border-line bg-bg px-3",
					required: true,
					children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: p.id,
						children: [
							p.project_code,
							" · ",
							p.available,
							" available"
						]
					}, p.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Count" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "count",
					type: "number",
					defaultValue: 1,
					min: 1,
					max: 50
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					type: "submit",
					children: "Allocate"
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-leaf",
					children: status
				}) : null
			]
		})]
	});
}
function Claims() {
	const [data, setData] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)("");
	async function load() {
		setData(await listClaims());
	}
	(0, import_react.useEffect)(() => {
		load().catch((e) => setErr(e.message));
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: err || "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Claim" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Client" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Serial" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Issue" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Next" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.claims.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono",
					children: c.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.full_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.serial_number }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.issue }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: c.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: (data.transitions[c.status] || []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "min-h-9 px-2 py-1 text-xs",
						onClick: async () => {
							try {
								await transitionClaim({ data: {
									claimId: c.id,
									status: s
								} });
								await load();
								setErr("");
							} catch (e) {
								setErr(e instanceof Error ? e.message : "Failed");
							}
						},
						children: s.replace(/_/g, " ")
					}, s))
				}) })
			]
		}, c.id)) })]
	}), err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-3 text-sm text-danger",
		children: err
	}) : null] });
}
function Pays() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [clients, setClients] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("");
	async function load() {
		setRows(await listPayments());
	}
	(0, import_react.useEffect)(() => {
		load().catch(() => {});
		listClients().then(setClients).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-semibold",
				children: "Record payment"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: async (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					try {
						await recordPayment({ data: {
							clientId: String(fd.get("clientId")),
							amount: Number(fd.get("amount")),
							method: String(fd.get("method"))
						} });
						setStatus("Recorded.");
						await load();
					} catch (err) {
						setStatus(err instanceof Error ? err.message : "Failed");
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Client" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						name: "clientId",
						className: "min-h-11 w-full rounded-md border border-line bg-bg px-3",
						children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.full_name
						}, c.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "amount",
						type: "number",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Method" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "method",
						defaultValue: "UPI"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "gold",
						type: "submit",
						children: "Save"
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Client" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Amount" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Method" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" })
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
						className: "font-mono",
						children: p.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.full_name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: inr(p.amount) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.payment_method }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.status })
				]
			}, p.id)) })]
		}) })]
	});
}
function Svcs() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		listServicesAdmin().then(setData).catch(() => {});
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: data.reqs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: r.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					r.full_name,
					" · ",
					r.status,
					" ",
					r.quoted_price ? `· ${inr(r.quoted_price)}` : ""
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: async () => {
						await quoteService({ data: {
							id: r.id,
							status: "QUOTED",
							price: Number(r.quoted_price || 0)
						} });
						setData(await listServicesAdmin());
					},
					children: "Quote"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					onClick: async () => {
						await quoteService({ data: {
							id: r.id,
							status: "COMPLETED"
						} });
						setData(await listServicesAdmin());
					},
					children: "Complete"
				})]
			})]
		}, r.id))
	});
}
function Tickets() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listTickets().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold",
					children: [
						t.subject,
						" · ",
						t.full_name
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: t.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: t.description
			}),
			t.replies.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 rounded-md bg-cell p-2 text-sm",
				children: r.body
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex flex-wrap gap-2",
				onSubmit: async (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					await staffReplyTicket({ data: {
						ticketId: t.id,
						body: String(fd.get("body")),
						status: String(fd.get("status"))
					} });
					e.currentTarget.reset();
					setRows(await listTickets());
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						name: "body",
						placeholder: "Reply…",
						required: true,
						className: "flex-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "status",
						className: "min-h-11 rounded-md border border-line bg-bg px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "IN_PROGRESS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "WAITING_FOR_CLIENT" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "RESOLVED" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "CLOSED" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						variant: "gold",
						children: "Send"
					})
				]
			})
		] }, t.id))
	});
}
function Docs() {
	const [rows, setRows] = (0, import_react.useState)([]);
	async function load() {
		setRows(await listDocuments());
	}
	(0, import_react.useEffect)(() => {
		load().catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Client" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Type" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "File" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.full_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.document_type }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.original_filename }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: d.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: async () => {
						await verifyDocument({ data: {
							id: d.id,
							status: "VERIFIED"
						} });
						await load();
					},
					children: "Verify"
				}) })
			]
		}, d.id)) })]
	}) });
}
function Enquiries() {
	const [rows, setRows] = (0, import_react.useState)([]);
	async function load() {
		setRows(await listEnquiries());
	}
	(0, import_react.useEffect)(() => {
		load().catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold",
				children: [
					e.name,
					" · ",
					e.email
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					e.phone,
					" · ",
					e.status
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: e.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2",
				children: [
					"NEW",
					"IN_PROGRESS",
					"CLOSED"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: async () => {
						await setEnquiryStatus({ data: {
							id: e.id,
							status: s
						} });
						await load();
					},
					children: s
				}, s))
			})
		] }, e.id))
	});
}
function Staff({ me }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)("");
	async function load() {
		setRows(await listStaffUsers());
	}
	(0, import_react.useEffect)(() => {
		load().catch((e) => setErr(e.message));
	}, []);
	const options = me.role === "PRIMARY_ADMIN" ? ["ADMIN", "SUPER_ADMIN"] : me.role === "SUPER_ADMIN" ? ["ADMIN"] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-danger",
			children: err
		}) : null, rows.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: u.full_name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					u.email,
					" · ",
					u.role
				]
			})] }), options.length && u.role !== "PRIMARY_ADMIN" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "min-h-11 rounded-md border border-line bg-bg px-3",
				defaultValue: u.role,
				onChange: async (e) => {
					try {
						await setStaffRole({ data: {
							userId: u.user_id,
							role: e.target.value
						} });
						await load();
						setErr("");
					} catch (ex) {
						setErr(ex instanceof Error ? ex.message : "Failed");
					}
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: u.role,
					children: u.role
				}), options.filter((o) => o !== u.role).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o,
					children: o
				}, o))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				tone: "gold",
				children: u.role
			})]
		}, u.user_id))]
	});
}
function Reports() {
	const [status, setStatus] = (0, import_react.useState)("");
	async function dl(kind) {
		try {
			const r = await exportCsv({ data: kind });
			const a = document.createElement("a");
			a.href = URL.createObjectURL(new Blob([r.csv], { type: "text/csv;charset=utf-8" }));
			a.download = r.filename;
			a.click();
			setStatus(`Exported ${r.filename}`);
		} catch (e) {
			setStatus(e instanceof Error ? e.message : "Export denied");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-xl font-semibold",
			children: "CSV reports"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "Formula injection is sanitized. Exports are written to the audit log."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					onClick: () => dl("clients"),
					children: "Clients"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					onClick: () => dl("payments"),
					children: "Payments"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					onClick: () => dl("panels"),
					children: "Panels"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					onClick: () => dl("claims"),
					children: "Warranty claims"
				})
			]
		}),
		status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-leaf",
			children: status
		}) : null
	] });
}
function Audit() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listAudit().then(setRows).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "When" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Actor" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Action" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Entity" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Detail" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.created_at?.slice(0, 19) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.actor }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono",
					children: a.action
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.entity }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.detail })
			]
		}, a.id)) })]
	}) });
}
function Cms({ tab }) {
	const [data, setData] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("");
	async function load() {
		setData(await getCms());
	}
	(0, import_react.useEffect)(() => {
		load().catch((e) => setStatus(e.message));
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: status || "Loading CMS…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			tab === "website" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-semibold",
					children: "Website copy"
				}), data.content.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mb-3",
					onSubmit: async (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						await saveContent({ data: {
							key: c.key,
							value: String(fd.get("value"))
						} });
						setStatus("Saved.");
						await load();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: c.key }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "value",
							defaultValue: c.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Save"
						})]
					})]
				}, c.key))]
			}) : null,
			tab === "faqs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [data.faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-lg border border-line bg-card p-4 space-y-2",
					onSubmit: async (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						await saveFaq({ data: {
							id: f.id,
							question: String(fd.get("question")),
							answer: String(fd.get("answer"))
						} });
						setStatus("FAQ saved.");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "question",
							defaultValue: f.question
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							name: "answer",
							defaultValue: f.answer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Save FAQ"
						})
					]
				}, f.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-lg border border-line bg-card p-4 space-y-2",
					onSubmit: async (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						await saveFaq({ data: {
							question: String(fd.get("question")),
							answer: String(fd.get("answer"))
						} });
						e.currentTarget.reset();
						await load();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "New FAQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "question",
							placeholder: "Question",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							name: "answer",
							placeholder: "Answer",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "gold",
							type: "submit",
							children: "Add"
						})
					]
				})]
			}) : null,
			tab === "announcements" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.anns.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-lg border border-line bg-card p-4 space-y-2",
					onSubmit: async (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						await saveAnnouncement({ data: {
							id: a.id,
							title: String(fd.get("title")),
							message: String(fd.get("message")),
							cta_text: String(fd.get("cta")),
							cta_url: String(fd.get("url")),
							is_active: true
						} });
						setStatus("Announcement saved.");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "title",
							defaultValue: a.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							name: "message",
							defaultValue: a.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "cta",
								defaultValue: a.cta_text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "url",
								defaultValue: a.cta_url
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Save"
						})
					]
				}, a.id))
			}) : null,
			tab === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "max-w-xl",
				children: data.settings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mb-3",
					onSubmit: async (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						await saveSetting({ data: {
							key: s.key,
							value: String(fd.get("value"))
						} });
						setStatus("Setting saved.");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: s.key }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							name: "value",
							defaultValue: s.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Save"
						})]
					})]
				}, s.key))
			}) : null,
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-leaf",
				children: status
			}) : null
		]
	});
}
function Perms() {
	const [data, setData] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getPermissionMatrix().then(setData).catch((e) => setErr(e.message));
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: err || "Loading matrix…"
	});
	const roles = [
		"ADMIN",
		"SUPER_ADMIN",
		"PRIMARY_ADMIN"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Permission" }), roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: r }, r))] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.permissions.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
				className: "font-mono text-xs",
				children: code
			}), roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: r === "PRIMARY_ADMIN" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				tone: "gold",
				children: "ALWAYS"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked: !!data.matrix[code]?.[r],
				onChange: async (e) => {
					try {
						await setPermission({ data: {
							role: r,
							code,
							allowed: e.target.checked
						} });
						setData(await getPermissionMatrix());
					} catch (ex) {
						setErr(ex instanceof Error ? ex.message : "Failed");
					}
				}
			}) }, r))]
		}, code)) })]
	}), err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-3 text-sm text-danger",
		children: err
	}) : null] });
}
function Notify() {
	const [clients, setClients] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listClients().then(setClients).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-semibold",
			children: "Send notification"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3",
			onSubmit: async (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				try {
					await staffNotify({ data: {
						userId: String(fd.get("userId")),
						title: String(fd.get("title")),
						message: String(fd.get("message"))
					} });
					setStatus("Sent.");
				} catch (err) {
					setStatus(err instanceof Error ? err.message : "Failed");
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Client user" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					name: "userId",
					className: "min-h-11 w-full rounded-md border border-line bg-bg px-3",
					children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.user_id,
						children: c.full_name
					}, c.user_id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "title",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					name: "message",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "gold",
					type: "submit",
					children: "Send"
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-leaf",
					children: status
				}) : null
			]
		})]
	});
}
//#endregion
export { StaffDash as component };
