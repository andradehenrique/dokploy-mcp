import { z } from "zod";
import type { DokployProject } from "../../../types/dokploy.js";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const projectAll = createTool({
  name: "project-all",
  description:
    "Lists all projects in Dokploy with optimized response size suitable for LLM consumption. Returns summary data including project info, service counts, and basic service details.",
  schema: z.object({}),
  annotations: {
    title: "List All Projects",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async () => {
    const response = await apiClient.get("/project.all");

    if (!response?.data) {
      return ResponseFormatter.error(
        "Failed to fetch projects",
        "No response data received"
      );
    }

    const projects = response.data as DokployProject[];

    // Always return optimized summary data
    const optimizedProjects = projects.map((project) => ({
      projectId: project.projectId,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      organizationId: project.organizationId,

      // Service counts instead of full data
      serviceCounts: {
        applications: project.applications?.length || 0,
        postgres: project.postgres?.length || 0,
        mysql: project.mysql?.length || 0,
        mariadb: project.mariadb?.length || 0,
        mongo: project.mongo?.length || 0,
        redis: project.redis?.length || 0,
        compose: project.compose?.length || 0,
      },

      // Basic service summaries (only essential info)
      services: {
        applications:
          project.applications?.map((app) => ({
            applicationId: app.applicationId,
            name: app.name,
            appName: app.appName,
            applicationStatus: app.applicationStatus,
            sourceType: app.sourceType,
            buildType: app.buildType,
            domainCount: app.domains?.length || 0,
          })) || [],

        postgres:
          project.postgres?.map((db) => ({
            postgresId: db.postgresId,
            name: db.name,
            appName: db.appName,
            applicationStatus: db.applicationStatus,
            databaseName: db.databaseName,
          })) || [],

        compose:
          project.compose?.map((comp) => ({
            composeId: comp.composeId,
            name: comp.name,
            appName: comp.appName,
            composeStatus: comp.composeStatus,
            sourceType: comp.sourceType,
            domainCount: comp.domains?.length || 0,
          })) || [],
      },
    }));

    return ResponseFormatter.success(
      "Successfully fetched projects summary",
      optimizedProjects
    );
  },
});
