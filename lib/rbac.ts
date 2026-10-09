import type { Role } from "@/types/role";

/**
 * Dev-only audit mode: inspect all routes/API as any logged-in role.
 * Requires NODE_ENV !== "production" and AUDIT_BYPASS_RBAC=true (local .env only).
 */
export function isAuditBypassRbac(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.AUDIT_BYPASS_RBAC === "true"
  );
}

export function isRoleAllowed(
  userRole: string | undefined | null,
  allowed: readonly Role[] | Role,
): boolean {
  if (!userRole) return false;
  if (isAuditBypassRbac()) return true;
  const list = Array.isArray(allowed) ? allowed : [allowed];
  return list.includes(userRole as Role);
}
