import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/components/input", label: "Input" },
  { to: "/components/button", label: "Button" },
];

export default function ComponentsLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-52 shrink-0 border-r border-border p-6">
        <h2 className="mb-4 text-lg font-bold">Components</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-md px-3 py-1.5 text-sm ${isActive ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
