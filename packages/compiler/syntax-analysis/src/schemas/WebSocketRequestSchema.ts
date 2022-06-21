import { z } from "zod";
import { TypeDefinitionSchema } from "./TypeDefinitionSchema";
import { WithDocsSchema } from "./WithDocsSchema";

export const WebSocketRequestSchema = WithDocsSchema.extend({
    type: z.optional(TypeDefinitionSchema),
    encoding: z.optional(z.string()),
});

export type WebSocketRequestSchema = z.infer<typeof WebSocketRequestSchema>;
