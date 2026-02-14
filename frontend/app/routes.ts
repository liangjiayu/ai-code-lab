import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/app-layout.tsx", [
    index("routes/home.tsx"),
    route(":id", "routes/chat.tsx"),
  ]),
] satisfies RouteConfig;
