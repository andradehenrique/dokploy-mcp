# Dokploy MCP Server

Dokploy MCP Server exposes Dokploy functionalities as tools consumable via the Model Context Protocol (MCP). It allows MCP-compatible clients (e.g., AI models, other applications) to interact with your Dokploy server programmatically.

## Table of Contents

- [Dokploy MCP Server](#dokploy-mcp-server)
  - [Table of Contents](#table-of-contents)
  - [Available Tools](#available-tools)
  - [Architecture](#architecture)
  - [Installation](#installation)
  - [Usage](#usage)
    - [1. Configuring with VS Code (for MCP-enabled extensions like Claude Code)](#1-configuring-with-vs-code-for-mcp-enabled-extensions-like-claude-code)
    - [2. Configuring for Claude Code (General Setup)](#2-configuring-for-claude-code-general-setup)
  - [Contributing](#contributing)
  - [Support](#support)
  - [License](#license)

## Available Tools

This MCP server currently provides the following tools:

*   **`project-all`**:
    *   Description: Lists all projects in Dokploy.
    *   Input Schema: None.
*   **`project-one`**:
    *   Description: Gets a specific project by its ID in Dokploy.
    *   Input Schema: `{ "projectId": "string" }` (The ID of the project to retrieve).

*(More tools will be added as the project develops.)*

## Architecture

The Dokploy MCP Server is built using:

*   **`@modelcontextprotocol/sdk`**: For creating the MCP server and defining tools.
*   **Node.js & TypeScript**: As the underlying runtime and language.
*   **Stdio Transport**: By default, it communicates with MCP clients over standard input/output (stdio), as configured in `src/index.ts`.
*   **Dokploy API Interaction**: It interacts with your Dokploy server's API to perform actions based on tool invocations.

The server listens for MCP requests, executes the corresponding tool (e.g., fetching project data from Dokploy), and returns the results in MCP format.

## Installation

1.  **Prerequisites**:
    *   Node.js (LTS version recommended, e.g., v18, v20)
    *   npm or yarn
    *   A running Dokploy server instance accessible from where this MCP server will run.

2.  **Clone the repository**:
    ```sh-session
    $ git clone https://github.com/andradehenrique/dokploy-mcp.git
    $ cd dokploy-mcp
    ```

3.  **Install dependencies**:
    ```sh-session
    $ npm install
    # or
    $ yarn install
    ```

5.  **Build the project (for production/MCP usage)**:
    ```sh-session
    $ npm run build
    # or
    $ yarn build
    ```
    This will create a production build in a directory like `build` or `dist`. Note the path to the main JavaScript file (e.g., `build/index.js`).

## Usage

Dokploy MCP is designed to be used as a Model Context Protocol (MCP) server. This allows tools like Claude Code (and its VS Code extension) to interact with Dokploy MCP for enhanced functionalities.

### 1. Configuring with VS Code (for MCP-enabled extensions like Claude Code)

If you are using an MCP-enabled extension within VS Code (such as the official Claude Code extension), you can configure Dokploy MCP directly in your VS Code `settings.json` file.

1.  Open your VS Code `settings.json` file (Command Palette: `Ctrl+Shift+P` or `Cmd+Shift+P`, then "Preferences: Open User Settings (JSON)").
2.  Add or update the `mcp.servers` configuration:

```json
{
    "mcp": {
        "servers": {
            "dokploy-mcp": {
                "type": "stdio",
                "command": "node",
                "args": [
                    "/path/to/your/dokploy-mcp/build/index.js" 
                ],
                "env": {
                    "DOKPLOY_API_URL": "http://your-dokploy-server-url.com/api",
                    "DOKPLOY_API_TOKEN": "<your-dokploy-api-token>" 
                }
            }
        }
    }
}
```

**Key fields:**
*   `"dokploy-mcp"`: Your chosen identifier for this server.
*   `"command"` and `"args"`: Specify how to run your built Dokploy MCP. Ensure the path in `args` is correct.
*   `"env"`: Critical environment variables for Dokploy MCP to connect to your Dokploy instance (e.g., API URL, authentication tokens).

### 2. Configuring for Claude Code (General Setup)

For general instructions on how to set up Model Context Protocol (MCP) servers with Claude Code, including methods like using environment variables to point to server configuration files, please refer to the official Anthropic documentation:

[Set up Model Context Protocol (MCP) - Anthropic Docs](https://docs.anthropic.com/en/docs/claude-code/tutorials#set-up-model-context-protocol-mcp)

This documentation provides the most up-to-date information on how Claude Code discovers and interacts with MCP servers.

## Contributing

We welcome contributions! If you'd like to contribute to the Dokploy MCP Server, please check out our [Contributing Guide](CONTRIBUTING.md).

## Support

If you encounter any issues, have questions, or want to suggest a feature, please [open an issue](https://github.com/yourusername/dokploy-mcp/issues) in our GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
