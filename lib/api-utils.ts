// Utility functions for API routes

/**
 * Check if user has admin role from Clerk session claims
 */
export function isAdmin(sessionClaims: any): boolean {
  const role = sessionClaims?.metadata?.role as string | undefined;
  return role === "admin";
}

/**
 * Standard error response helper
 */
export function errorResponse(message: string, status: number) {
  return Response.json(
    {
      status: "error",
      message,
    },
    { status }
  );
}

/**
 * Standard success response helper
 */
export function successResponse(data: any, status: number = 200) {
  return Response.json(
    {
      status: "success",
      ...data,
    },
    { status }
  );
}

/**
 * Validate and sanitize pagination parameters
 */
export function getPaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(0, parseInt(searchParams.get("page") || "0"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const skip = page * limit;

  return { page, limit, skip };
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: any,
  requiredFields: string[]
): { isValid: boolean; missingField?: string } {
  for (const field of requiredFields) {
    if (!body[field]) {
      return { isValid: false, missingField: field };
    }
  }
  return { isValid: true };
}

/**
 * Sanitize MongoDB query to prevent injection
 */
export function sanitizeQuery(query: any): any {
  const sanitized: any = {};

  for (const key in query) {
    if (query.hasOwnProperty(key) && typeof query[key] !== 'object') {
      sanitized[key] = query[key];
    }
  }

  return sanitized;
}
