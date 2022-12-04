import { USER_ROLE } from './enum.js'

export function userRoleMapper(userRole) {
    return userRole === USER_ROLE.ADMIN ? USER_ROLE.ADMIN : USER_ROLE.USER
}
