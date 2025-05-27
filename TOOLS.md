# Dokploy MCP Server - Tools Documentation

This document provides detailed information about all available tools in the Dokploy MCP Server.

## 📊 Overview

- **Total Tools**: 31
- **Project Tools**: 6
- **Application Tools**: 25

All tools include semantic annotations to help MCP clients understand their behavior and are designed to interact with the Dokploy API.

## 🗂️ Project Management Tools

### `project-all`

- **Description**: Lists all projects in Dokploy
- **Input Schema**: None
- **Annotations**: Read-only, Idempotent
- **Example**: `{}`

### `project-one`

- **Description**: Gets a specific project by its ID in Dokploy
- **Input Schema**:
  ```json
  {
    "projectId": "string"
  }
  ```
- **Annotations**: Read-only, Idempotent
- **Required Fields**: `projectId`

### `project-create`

- **Description**: Creates a new project in Dokploy
- **Input Schema**:
  ```json
  {
    "name": "string",
    "description": "string|null",
    "env": "string"
  }
  ```
- **Annotations**: Creation tool (non-destructive)
- **Required Fields**: `name`
- **Optional Fields**: `description`, `env`

### `project-update`

- **Description**: Updates an existing project in Dokploy
- **Input Schema**:
  ```json
  {
    "projectId": "string",
    "name": "string",
    "description": "string|null",
    "createdAt": "string",
    "organizationId": "string",
    "env": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `projectId`
- **Optional Fields**: `name`, `description`, `createdAt`, `organizationId`, `env`

### `project-duplicate`

- **Description**: Duplicates an existing project in Dokploy with optional service selection
- **Input Schema**:
  ```json
  {
    "sourceProjectId": "string",
    "name": "string",
    "description": "string",
    "includeServices": "boolean",
    "selectedServices": [
      {
        "id": "string",
        "type": "application|postgres|mariadb|mongo|mysql|redis|compose"
      }
    ]
  }
  ```
- **Annotations**: Creation tool (non-destructive)
- **Required Fields**: `sourceProjectId`, `name`
- **Optional Fields**: `description`, `includeServices`, `selectedServices`

### `project-remove`

- **Description**: Removes/deletes an existing project in Dokploy
- **Input Schema**:
  ```json
  {
    "projectId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `projectId`

## 🚀 Application Management Tools

### Core Application Operations

#### `application-one`

- **Description**: Gets a specific application by its ID in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Read-only, Idempotent
- **Required Fields**: `applicationId`

#### `application-create`

- **Description**: Creates a new application in Dokploy
- **Input Schema**:
  ```json
  {
    "name": "string",
    "appName": "string",
    "description": "string|null",
    "projectId": "string",
    "serverId": "string|null"
  }
  ```
- **Annotations**: Creation tool (non-destructive)
- **Required Fields**: `name`, `projectId`
- **Optional Fields**: `appName`, `description`, `serverId`

#### `application-update`

- **Description**: Updates an existing application in Dokploy
- **Input Schema**: Complex schema with 60+ fields including deployment settings, resource limits, networking, and monitoring configurations
- **Annotations**: Destructive
- **Required Fields**: `applicationId`
- **Optional Fields**: All application configuration fields (build settings, environment variables, resource limits, etc.)

#### `application-delete`

- **Description**: Deletes an application from Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

#### `application-move`

- **Description**: Moves an application to a different project
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "targetProjectId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `targetProjectId`

### Deployment & Lifecycle Operations

#### `application-deploy`

- **Description**: Deploys an application in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

#### `application-redeploy`

- **Description**: Redeploys an application in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

#### `application-start`

- **Description**: Starts an application in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

#### `application-stop`

- **Description**: Stops an application in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

#### `application-reload`

- **Description**: Reloads an application in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "appName": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `appName`

#### `application-markRunning`

- **Description**: Marks an application as running in Dokploy
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

### Configuration Management

#### `application-saveBuildType`

- **Description**: Saves build type configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "buildType": "dockerfile|heroku|nixpacks|buildpacks|docker",
    "dockerContextPath": "string|null",
    "dockerBuildStage": "string|null",
    "herokuVersion": "string|null"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `buildType`
- **Optional Fields**: `dockerContextPath`, `dockerBuildStage`, `herokuVersion`

#### `application-saveEnvironment`

- **Description**: Saves environment configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "env": "string|null",
    "buildArgs": "string|null"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`
- **Optional Fields**: `env`, `buildArgs`

### Git Provider Configurations

#### `application-saveGithubProvider`

- **Description**: Saves GitHub provider configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "repository": "string|null",
    "branch": "string|null",
    "owner": "string|null",
    "buildPath": "string|null",
    "githubId": "string|null",
    "watchPaths": ["string"]|null,
    "enableSubmodules": "boolean",
    "triggerType": "push|tag"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `owner`, `githubId`, `enableSubmodules`
- **Optional Fields**: `repository`, `branch`, `buildPath`, `watchPaths`, `triggerType`

#### `application-saveGitlabProvider`

- **Description**: Saves GitLab provider configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "gitlabBranch": "string|null",
    "gitlabBuildPath": "string|null",
    "gitlabOwner": "string|null",
    "gitlabRepository": "string|null",
    "gitlabId": "string|null",
    "gitlabProjectId": "number|null",
    "gitlabPathNamespace": "string|null",
    "watchPaths": ["string"]|null,
    "enableSubmodules": "boolean"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `gitlabBranch`, `gitlabBuildPath`, `gitlabOwner`, `gitlabRepository`, `gitlabId`, `gitlabProjectId`, `gitlabPathNamespace`, `enableSubmodules`
- **Optional Fields**: `watchPaths`

#### `application-saveBitbucketProvider`

- **Description**: Saves Bitbucket provider configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "bitbucketBranch": "string|null",
    "bitbucketBuildPath": "string|null",
    "bitbucketOwner": "string|null",
    "bitbucketRepository": "string|null",
    "bitbucketId": "string|null",
    "watchPaths": ["string"]|null,
    "enableSubmodules": "boolean"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `bitbucketBranch`, `bitbucketBuildPath`, `bitbucketOwner`, `bitbucketRepository`, `bitbucketId`, `enableSubmodules`
- **Optional Fields**: `watchPaths`

#### `application-saveGiteaProvider`

- **Description**: Saves Gitea provider configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "giteaBranch": "string|null",
    "giteaBuildPath": "string|null",
    "giteaOwner": "string|null",
    "giteaRepository": "string|null",
    "giteaId": "string|null",
    "watchPaths": ["string"]|null,
    "enableSubmodules": "boolean"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `giteaBranch`, `giteaBuildPath`, `giteaOwner`, `giteaRepository`, `giteaId`, `enableSubmodules`
- **Optional Fields**: `watchPaths`

#### `application-saveGitProvider`

- **Description**: Saves Git provider configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "customGitUrl": "string|null",
    "customGitBranch": "string|null",
    "customGitBuildPath": "string|null",
    "customGitSSHKeyId": "string|null",
    "watchPaths": ["string"]|null,
    "enableSubmodules": "boolean"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `enableSubmodules`
- **Optional Fields**: `customGitUrl`, `customGitBranch`, `customGitBuildPath`, `customGitSSHKeyId`, `watchPaths`

#### `application-saveDockerProvider`

- **Description**: Saves Docker provider configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "dockerImage": "string|null"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `dockerImage`

### Monitoring & Configuration

#### `application-readAppMonitoring`

- **Description**: Reads monitoring data for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Read-only, Idempotent
- **Required Fields**: `applicationId`

#### `application-readTraefikConfig`

- **Description**: Reads Traefik configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Read-only, Idempotent
- **Required Fields**: `applicationId`

#### `application-updateTraefikConfig`

- **Description**: Updates Traefik configuration for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string",
    "traefikConfig": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`, `traefikConfig`

### Utility Operations

#### `application-refreshToken`

- **Description**: Refreshes the token for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Non-destructive
- **Required Fields**: `applicationId`

#### `application-cleanQueues`

- **Description**: Cleans deployment queues for an application
- **Input Schema**:
  ```json
  {
    "applicationId": "string"
  }
  ```
- **Annotations**: Destructive
- **Required Fields**: `applicationId`

## 🏷️ Tool Annotations

All tools include semantic annotations to help MCP clients understand their behavior:

### Annotation Types

- **Read-Only Tools** (`readOnlyHint: true`):

  - `project-all`, `project-one`, `application-one`
  - `application-readAppMonitoring`, `application-readTraefikConfig`

- **Destructive Tools** (`destructiveHint: true`):

  - `project-update`, `project-remove`
  - All application configuration, deployment, and lifecycle operations
  - All provider configuration tools

- **Creation Tools** (`destructiveHint: false`):

  - `project-create`, `project-duplicate`, `application-create`
  - `application-refreshToken`

- **Idempotent Tools** (`idempotentHint: true`):

  - All read-only operations

- **External API Tools** (`openWorldHint: true`):
  - All tools (interact with Dokploy API)

## 🔧 Usage Examples

### Creating a Project and Application

```json
// 1. Create a project
{
  "tool": "project-create",
  "input": {
    "name": "my-web-app",
    "description": "My web application project"
  }
}

// 2. Create an application in the project
{
  "tool": "application-create",
  "input": {
    "name": "frontend",
    "projectId": "project-id-from-step-1",
    "description": "Frontend application"
  }
}
```

### Configuring Git Provider

```json
{
  "tool": "application-saveGithubProvider",
  "input": {
    "applicationId": "app-id",
    "owner": "my-username",
    "repository": "my-repo",
    "branch": "main",
    "githubId": "github-integration-id",
    "enableSubmodules": false,
    "triggerType": "push"
  }
}
```

### Deploying an Application

```json
{
  "tool": "application-deploy",
  "input": {
    "applicationId": "app-id"
  }
}
```

## 📝 Notes

- All nullable fields can accept `null` values but must be provided if marked as required
- Provider-specific tools use prefixed field names (e.g., `gitlabBranch`, `giteaOwner`)
- Some endpoints in the original API contain typos (e.g., `saveGitProdiver`) which are preserved for compatibility
- Resource limits in application updates accept string values (e.g., "512m", "1g")
- All tools include comprehensive error handling and validation
