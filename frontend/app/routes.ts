import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/app-layout.tsx", [
    index("routes/home.tsx"),
    route("chat/:id", "routes/chat.tsx"),
  ]),
  layout("routes/components/layout.tsx", [
    route("components/input", "routes/components/input.tsx"),
    route("components/button", "routes/components/button.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
