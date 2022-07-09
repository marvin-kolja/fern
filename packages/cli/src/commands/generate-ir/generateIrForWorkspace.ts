import { WorkspaceDefinition } from "@fern-api/commons";
import { generateIntermediateRepresentation } from "@fern-api/ir-generator";
import { parseWorkspaceDefinition } from "@fern-api/workspace-parser";
import { IntermediateRepresentation } from "@fern-fern/ir-model";
import validatePackageName from "validate-npm-package-name";
import { handleFailedWorkspaceParserResult } from "./handleWorkspaceParserFailures";

export async function generateIrForWorkspace({
    workspaceDefinition,
}: {
    workspaceDefinition: WorkspaceDefinition;
}): Promise<IntermediateRepresentation> {
    validateWorkspaceName(workspaceDefinition.name);
    const parseResult = await parseWorkspaceDefinition({
        name: workspaceDefinition.name,
        absolutePathToDefinition: workspaceDefinition.absolutePathToDefinition,
    });
    if (!parseResult.didSucceed) {
        handleFailedWorkspaceParserResult(parseResult);
        throw new Error("Failed to parse workspace");
    }
    return generateIntermediateRepresentation(parseResult.workspace);
}

function validateWorkspaceName(workspaceName: string) {
    const { validForNewPackages } = validatePackageName(workspaceName);
    if (!validForNewPackages) {
        throw new Error(`Invalid workspace name: ${workspaceName}`);
    }
}
