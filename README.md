# AI Code Lab

全栈 AI 对话应用，前后端分离的 Monorepo 项目。

## 项目结构

```
ai-code-lab/
├── frontend/          # 前端 - React SPA 应用
├── backend/           # 后端 - FastAPI 应用
├── biome.json         # 前端 Biome 代码检查配置
└── .pre-commit-config.yaml  # Git Hooks 配置
```

### 前端

基于 React 19 + React Router 7 + Vite 构建的单页应用，使用 Tailwind CSS 4 + shadcn/ui 作为 UI 方案，Zustand 管理状态，TanStack React Query 处理数据请求。

详细文档请查看 [frontend/README.md](./frontend/README.md)。

### 后端

基于 FastAPI + SQLAlchemy 2.0 (async) 构建的 API 服务，采用分层架构（API → Service → Repository → Database），支持 PostgreSQL 和 SQLite。

详细文档请查看 [backend/README.md](./backend/README.md)。

## Git Hooks

项目使用 [pre-commit](https://pre-commit.com/) 管理 Git Hooks，在提交代码时自动执行代码格式化和检查。

### 初始化

1. 安装 pre-commit：

```bash
uv tool install pre-commit
```

2. 安装 Git Hooks：

```bash
pre-commit install
```

### Hook 说明

每次 `git commit` 时会自动执行以下检查：

| Hook | 作用范围 | 说明 |
|------|---------|------|
| ruff format | `backend/` | Python 代码格式化 |
| ruff check | `backend/` | Python 代码检查与自动修复 |
| biome check | `frontend/` | 前端代码格式化与检查 |

### 手动触发

```bash
# 对所有文件执行检查
pre-commit run --all-files

# 只执行指定 hook
pre-commit run ruff-format --all-files
pre-commit run ruff-check --all-files
pre-commit run biome-check --all-files

# 只检查暂存区的文件
pre-commit run
```

如需跳过检查（不推荐），可使用：

```bash
git commit --no-verify -m "commit message"
```
