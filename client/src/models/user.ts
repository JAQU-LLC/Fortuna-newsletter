/**
 * User roles enum for type safety and code hygiene
 */
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

/**
 * Type guard to check if a string is a valid UserRole
 */
export function isUserRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

/**
 * Type guard to check if a role or authorization_level indicates admin
 */
export function isAdmin(role?: string, authorizationLevel?: string): boolean {
  return role === UserRole.ADMIN || authorizationLevel === UserRole.ADMIN;
}
