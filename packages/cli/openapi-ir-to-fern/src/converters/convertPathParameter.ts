import { RawSchemas } from "@fern-api/yaml-schema";
import { PathParameter, Schema, SchemaId } from "@fern-fern/openapi-ir-model/ir";
import { ROOT_PREFIX } from "../convertPackage";
import { convertToTypeReference } from "./convertToTypeReference";
import { getTypeFromTypeReference } from "./utils/getTypeFromTypeReference";

export interface ConvertedPathParameter {
    value: RawSchemas.HttpPathParameterSchema;
    additionalTypeDeclarations: Record<string, RawSchemas.TypeDeclarationSchema>;
}

export function convertPathParameter({
    pathParameter,
    schemas,
    isPackageYml,
}: {
    pathParameter: PathParameter;
    schemas: Record<SchemaId, Schema>;
    isPackageYml: boolean;
}): ConvertedPathParameter {
    const typeReference = convertToTypeReference({
        schema: pathParameter.schema,
        schemas,
        prefix: isPackageYml ? undefined : ROOT_PREFIX,
    });
    const value: RawSchemas.HttpPathParameterSchema =
        pathParameter.variableReference != null
            ? {
                  docs: pathParameter.description ?? undefined,
                  variable: `$${pathParameter.variableReference}`,
              }
            : {
                  docs: pathParameter.description ?? undefined,
                  type: getTypeFromTypeReference(typeReference.typeReference),
              };
    return {
        value,
        additionalTypeDeclarations: typeReference.additionalTypeDeclarations,
    };
}
