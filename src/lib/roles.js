function normalizeRoleValue(role) {
  if (role && typeof role === 'object') {
    return normalizeRoleValue(role.name ?? role.role ?? role.value ?? role.type)
  }

  return String(role ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
}

export function getUserRoles(user) {
  const rawRoles = user?.roles ?? user?.role ?? user?.userRole ?? user?.type
  const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles]

  return roles.map(normalizeRoleValue).filter(Boolean)
}

export function isAdminUser(user) {
  return getUserRoles(user).some((role) => role === 'admin' || role === 'super_admin')
}

export function isRegularUser(user) {
  return getUserRoles(user).includes('user')
}
