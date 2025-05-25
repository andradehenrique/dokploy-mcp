# Dokploy MCP Server

[![npm version](https://img.shields.io/npm/v/@ahdev/dokploy-mcp.svg)](https://www.npmjs.com/package/@ahdev/dokploy-mcp) [<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Dokploy%20MCP&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22dokploy-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40ahdev%2Fdokploy-mcp%40latest%22%5D%7D)

Dokploy MCP Server exposes Dokploy functionalities as tools consumable via the Model Context Protocol (MCP). It allows MCP-compatible clients (e.g., AI models, other applications) to interact with your Dokploy server programmatically.

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

2. **Configure Your MCP Client:**

    Update your MCP client's configuration to use the Docker command.

    *Example for VS Code:*

    ```json
    {
      "servers": {
        "dokploy-mcp": {
          "type": "stdio",
          "command": "docker",
          "args": [
            "run", "-i", "--rm",
            "-e", "DOKPLOY_URL=https://your-dokploy-server.com/api",
            "-e", "DOKPLOY_AUTH_TOKEN=your-dokploy-api-token",
            "dokploy-mcp"
          ]
        }
      }
    }
    ```

    *Example for Cursor:*

    ```json
    {
      "mcpServers": {
        "dokploy-mcp": {
          "command": "docker",
          "args": [
            "run", "-i", "--rm",
            "-e", "DOKPLOY_URL=https://your-dokploy-server.com/api",
            "-e", "DOKPLOY_AUTH_TOKEN=your-dokploy-api-token",
            "dokploy-mcp"
          ]
        }
      }
    }
    ```

    *Example for Claude Desktop:*

    ```json
    {
      "mcpServers": {
        "dokploy-mcp": {
          "command": "docker",
          "args": [
            "run", "-i", "--rm",
            "-e", "DOKPLOY_URL=https://your-dokploy-server.com/api",
            "-e", "DOKPLOY_AUTH_TOKEN=your-dokploy-api-token",
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
      "args": [
        "/c",
        "npx",
        "-y",
        "@ahdev/dokploy-mcp"
      ],
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

This MCP server currently provides the following tools for comprehensive project and application management:

*   **`project-all`**:
    *   Description: Lists all projects in Dokploy.
    *   Input Schema: None.

*   **`project-one`**:
    *   Description: Gets a specific project by its ID in Dokploy.
    *   Input Schema: `{ "projectId": "string" }` (The ID of the project to retrieve).

*   **`project-create`**:
    *   Description: Creates a new project in Dokploy.
    *   Input Schema: `{ "name": "string", "description": "string|null", "env": "string" }` (name is required, description and env are optional).

*   **`project-update`**:
    *   Description: Updates an existing project in Dokploy.
    *   Input Schema: `{ "projectId": "string", "name": "string", "description": "string|null", "createdAt": "string", "organizationId": "string", "env": "string" }` (projectId is required, all other fields are optional).

*   **`project-duplicate`**:
    *   Description: Duplicates an existing project in Dokploy with optional service selection.
    *   Input Schema: `{ "sourceProjectId": "string", "name": "string", "description": "string", "includeServices": "boolean", "selectedServices": "array" }` (sourceProjectId and name are required, supports selective service duplication).

*   **`project-remove`**:
    *   Description: Removes/deletes an existing project in Dokploy.
    *   Input Schema: `{ "projectId": "string" }` (The ID of the project to remove).

*   **`application-one`**:
    *   Description: Gets a specific application by its ID in Dokploy.
    *   Input Schema: `{ "applicationId": "string" }` (The ID of the application to retrieve).

## 🏗️ Architecture

The Dokploy MCP Server is built using:

*   **`@modelcontextprotocol/sdk`**: For creating the MCP server and defining tools.
*   **Node.js & TypeScript**: As the underlying runtime and language.
*   **Stdio Transport**: By default, it communicates with MCP clients over standard input/output (stdio), as configured in `src/index.ts`.
*   **Dokploy API Interaction**: It interacts with your Dokploy server's API to perform actions based on tool invocations.
*   **HTTP Client Abstraction**: Uses a centralized HTTP client for consistent API communication and error handling.

The server listens for MCP requests, executes the corresponding tool (e.g., fetching project data from Dokploy), and returns the results in MCP format.

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

## 🔧 Troubleshooting

### ERR_MODULE_NOT_FOUND

If you see this error, try using `bunx` instead of `npx`.

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

This often resolves module resolution issues, especially in environments where `npx` does not properly install or resolve packages.

### ESM Resolution Issues

If you encounter an error like: `Error: Cannot find module 'uriTemplate.js'` try running with the `--experimental-vm-modules` flag:

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "--node-options=--experimental-vm-modules",
        "@ahdev/dokploy-mcp"
      ],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### TLS/Certificate Issues

Use the `--experimental-fetch` flag with `npx` to bypass TLS-related issues:

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "--node-options=--experimental-fetch",
        "@ahdev/dokploy-mcp"
      ],
      "env": {
        "DOKPLOY_URL": "https://your-dokploy-server.com/api",
        "DOKPLOY_AUTH_TOKEN": "your-dokploy-api-token"
      }
    }
  }
}
```

### MCP Client Errors

1. Try adding `@latest` to the package name.

2. Try using `bunx` as an alternative.

3. Try using `deno` as an alternative.

4. Make sure you are using Node v18 or higher to have native fetch support with `npx`.

5. Verify your `DOKPLOY_URL` and `DOKPLOY_AUTH_TOKEN` environment variables are correctly set.

## 🤝 Contributing

We welcome contributions! If you'd like to contribute to the Dokploy MCP Server, please check out our [Contributing Guide](CONTRIBUTING.md).

## 🆘 Support

If you encounter any issues, have questions, or want to suggest a feature, please [open an issue](https://github.com/andradehenrique/dokploy-mcp/issues) in our GitHub repository.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
