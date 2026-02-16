import { Type, Static } from "@sinclair/typebox";

export const SuccessResponse = Type.Object(
  {
    message: Type.String(),
    data: Type.Optional(Type.Unknown()),
  },
  { description: "Successful response" },
);

export const ClientErrorResponse = Type.Object(
  {
    message: Type.String(),
    error: Type.Optional(Type.String()),
    details: Type.Optional(Type.Any()),
  },
  { description: "Client error (4xx)" },
);

export const ServerErrorResponse = Type.Object(
  {
    message: Type.String(),
    error: Type.Optional(Type.String()),
  },
  { description: "Server error (5xx)" },
);

export const Responses = {
  200: SuccessResponse,
  201: SuccessResponse,
  400: ClientErrorResponse,
  401: ClientErrorResponse,
  403: ClientErrorResponse,
  404: ClientErrorResponse,
  422: ClientErrorResponse,
  500: ServerErrorResponse,
} as const;

export type SuccessResponse = Static<typeof SuccessResponse>;
export type ClientErrorResponse = Static<typeof ClientErrorResponse>;
export type ServerErrorResponse = Static<typeof ServerErrorResponse>;
