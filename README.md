# Dokploy MCP Server

[![npm version](https://img.shields.io/npm/v/@ahdev/dokploy-mcp.svg)](https://www.npmjs.com/package/@ahdev/dokploy-mcp) [<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Dokploy%20MCP&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22dokploy-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ahdev%2Fdokploy-mcp%40latest%22%5D%7D)

Dokploy MCP Server exposes Dokploy functionalities as tools consumable via the Model Context Protocol (MCP). It allows MCP-compatible clients (e.g., AI models, other applications) to interact with your Dokploy server programmatically.

This server focuses exclusively on **tools** for direct Dokploy API operations, providing a clean and efficient interface for project and application management.

## 🛠️ Getting Started

### Requirements

- Node.js >= v18.0.0 (or Docker)
- Cursor, VS Code, Claude Desktop, or another MCP Client
- A running Dokploy server instance

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Add this to your Cursor `~/.cursor/mcp.json` file. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

<details>
<summary>Alternative: Use Bun</summary>

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "bunx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

</details>

<details>
<summary>Alternative: Use Deno</summary>

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "deno",
      "args": ["run", "--allow-env", "--allow-net", "npm:@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

</details>

### Install in Windsurf

Add this to your Windsurf MCP config file. See [Windsurf MCP docs](https://docs.windsurf.com/windsurf/mcp) for more info.

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Install in VS Code

[<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Dokploy%20MCP&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22dokploy-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ahdev%2Fdokploy-mcp%40latest%22%5D%7D)
[<img alt="Install in VS Code Insiders (npx)" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Dokploy%20MCP&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%7B%22name%22%3A%22dokploy-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ahdev%2Fdokploy-mcp%40latest%22%5D%7D)

Add this to your VS Code MCP config file. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

```json
{
  "servers": {
    "dokploy-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Install in Zed

Add this to your Zed `settings.json`. See [Zed Context Server docs](https://zed.dev/docs/assistant/context-servers) for more info.

```json
{
  "context_servers": {
    "dokploy-mcp": {
      "command": {
        "path": "npx",
        "args": ["-y", "@ahdev/dokploy-mcp"]
      },
      "settings": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Install in Claude Desktop

Add this to your Claude Desktop `claude_desktop_config.json` file. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Install in BoltAI

Open the "Settings" page of the app, navigate to "Plugins," and enter the following JSON:

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Using Docker

If you prefer to run the MCP server in a Docker container:

1.  **Build the Docker Image:**

    Clone the repository and build the image:

    ```bash
    git clone https://github.com/andradehenrique/dokploy-mcp.git
    cd dokploy-mcp
    docker build -t dokploy-mcp .
    ```

2.  **Configure Your MCP Client:**

    Update your MCP client's configuration to use the Docker command.

    _Example for VS Code:_

    ```json
    {
      "servers": {
        "dokploy-mcp": {
          "type": "stdio",
          "command": "docker",
          "args": [
            "run",
            "-i",
            "--rm",
            "-e",
            "DOKPLOY_URL=https://your-dokploy-server.com/api",
            "-e",
            "DOKPLOY_AUTH_TOKEN=your-dokploy-api-token",
            "dokploy-mcp"
          ]
        }
      }
    }
    ```

    _Example for Cursor:_

    ```json
    {
      "mcpServers": {
        "dokploy-mcp": {
          "command": "docker",
          "args": [
            "run",
            "-i",
            "--rm",
            "-e",
            "DOKPLOY_URL=https://your-dokploy-server.com/api",
            "-e",
            "DOKPLOY_AUTH_TOKEN=your-dokploy-api-token",
            "dokploy-mcp"
          ]
        }
      }
    }
    ```

    _Example for Claude Desktop:_

    ```json
    {
      "mcpServers": {
        "dokploy-mcp": {
          "command": "docker",
          "args": [
            "run",
            "-i",
            "--rm",
            "-e",
            "DOKPLOY_URL=https://your-dokploy-server.com/api",
            "-e",
            "DOKPLOY_AUTH_TOKEN=your-dokploy-api-token",
            "dokploy-mcp"
          ]
        }
      }
    }
    ```

### Install in Windows

The configuration on Windows is slightly different compared to Linux or macOS. Use `cmd` as the command wrapper:

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@ahdev/dokploy-mcp"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Environment Variables

- `DOKPLOY_URL`: Your Dokploy server API URL (required)
- `DOKPLOY_AUTH_TOKEN`: Your Dokploy API authentication token (required)

## 📚 Available Tools

This MCP server provides comprehensive tools for Dokploy project, application, and database management through **43 tools** organized into three main categories:

### 🗂️ Project Management (6 tools)

Complete project lifecycle management including creation, updates, duplication, and deletion:

- **`project-all`** - List all projects
- **`project-one`** - Get project details
- **`project-create`** - Create new projects
- **`project-update`** - Update project configurations
- **`project-duplicate`** - Duplicate projects with selective service copying
- **`project-remove`** - Delete projects

### 🚀 Application Management (24 tools)

Comprehensive application lifecycle and configuration management:

#### Core Operations

- **CRUD Operations**: Create, read, update, delete applications
- **Lifecycle Management**: Deploy, redeploy, start, stop, reload applications
- **Utility Operations**: Move between projects, clean queues, refresh tokens

#### Git Provider Integrations

Support for multiple Git providers with specific configurations:

- **GitHub Provider** - Full GitHub integration with webhooks
- **GitLab Provider** - Complete GitLab project integration
- **Bitbucket Provider** - Bitbucket repository management
- **Gitea Provider** - Self-hosted Gitea integration
- **Git Provider** - Custom Git repository support
- **Docker Provider** - Direct Docker image deployment

#### Configuration Management

- **Build Settings** - Configure build types (Dockerfile, Heroku, Nixpacks, etc.)
- **Environment Management** - Environment variables and build arguments
- **Monitoring Integration** - Application monitoring and metrics
- **Traefik Configuration** - Load balancer and reverse proxy settings

### 🐘 PostgreSQL Database Management (13 tools)

Complete PostgreSQL database lifecycle management:

#### Core Database Operations

- **CRUD Operations**: Create, read, update, remove PostgreSQL databases
- **Lifecycle Management**: Deploy, start, stop, reload, rebuild databases
- **Configuration Management**: External ports, environment variables, status changes
- **Project Management**: Move databases between projects

#### Available PostgreSQL Tools

- **`postgres-create`** - Create new PostgreSQL databases
- **`postgres-one`** - Get database details
- **`postgres-update`** - Update database configurations
- **`postgres-remove`** - Delete databases
- **`postgres-deploy`** - Deploy databases
- **`postgres-start`** - Start database instances
- **`postgres-stop`** - Stop database instances
- **`postgres-reload`** - Reload database configurations
- **`postgres-rebuild`** - Rebuild database instances
- **`postgres-move`** - Move databases between projects
- **`postgres-changeStatus`** - Change database status
- **`postgres-saveExternalPort`** - Configure external database ports
- **`postgres-saveEnvironment`** - Manage database environment variables

For detailed information about each tool, including input schemas, required fields, and usage examples, see **[TOOLS.md](TOOLS.md)**.

### Tool Annotations

All tools include semantic annotations to help MCP clients understand their behavior:

- **Read-Only Tools** (`readOnlyHint: true`): Safe operations that only retrieve data
- **Destructive Tools** (`destructiveHint: true`): Operations that modify or delete resources
- **Creation Tools** (`destructiveHint: false`): Operations that create new resources
- **Idempotent Tools** (`idempotentHint: true`): Operations safe to repeat
- **External API Tools** (`openWorldHint: true`): All tools interact with Dokploy API

## 🏗️ Architecture

The Dokploy MCP Server is built using:

- **`@modelcontextprotocol/sdk`**: For creating the MCP server and defining tools
- **Node.js & TypeScript**: As the underlying runtime and language
- **Stdio Transport**: Communicates with MCP clients over standard input/output (stdio)
- **Dokploy API Integration**: Direct interaction with Dokploy server's REST API
- **Comprehensive Tool Coverage**: Complete implementation of all Dokploy application and project endpoints
- **Robust Error Handling**: Centralized HTTP client with retry logic and structured error responses
- **Schema Validation**: Full Zod-based input validation matching OpenAPI specifications
- **Tool Annotations**: Semantic annotations (readOnlyHint, destructiveHint, etc.) for enhanced MCP client understanding

The server architecture supports:

- **43 Tools** covering all project, application, and database management operations
- **Multiple Git Providers** (GitHub, GitLab, Bitbucket, Gitea, custom Git)
- **Flexible Configuration** for builds, deployments, and monitoring
- **Type-Safe Operations** with comprehensive TypeScript support

Each tool includes input validation, API integration, and structured response formatting for consistent MCP client interaction.

## 🔧 Development

Clone the project and install dependencies:

```bash
git clone https://github.com/andradehenrique/dokploy-mcp.git
cd dokploy-mcp
npm install
```

Build:

```bash
npm run build
```

### Local Configuration Example

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": ["tsx", "/path/to/dokploy-mcp/src/index.ts"],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### Testing with MCP Inspector

```bash
npx -y @modelcontextprotocol/inspector npx @ahdev/dokploy-mcp
```

### Documentation

- **[TOOLS.md](TOOLS.md)** - Complete tool reference with schemas and examples
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contributing guidelines

## 🔧 Troubleshooting

### MCP Client Errors

1. Try adding `@latest` to the package name.

2. Make sure you are using Node v18 or higher to have native fetch support with `npx`.

3. Verify your `DOKPLOY_URL` and `DOKPLOY_AUTH_TOKEN` environment variables are correctly set.

## 🤝 Contributing

We welcome contributions! If you'd like to contribute to the Dokploy MCP Server, please check out our [Contributing Guide](CONTRIBUTING.md).

## 🆘 Support

If you encounter any issues, have questions, or want to suggest a feature, please [open an issue](https://github.com/andradehenrique/dokploy-mcp/issues) in our GitHub repository.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
