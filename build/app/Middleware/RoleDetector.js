"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/auth/build/standalone");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class RoleDetector {
    async handle({ auth }, next, guards) {
        if (auth.user && guards) {
            const rolesUser = await Database_1.default.query()
                .from('role_users')
                .where('user_id', auth.user.id)
                .innerJoin('roles', 'roles.id', 'role_users.role_id')
                .whereIn('slug', guards);
            console.log('rolesUser', rolesUser);
            console.log('guards', guards);
            if (rolesUser.length !== guards.length) {
                throw new standalone_1.AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS');
            }
        }
        await next();
    }
}
exports.default = RoleDetector;
//# sourceMappingURL=RoleDetector.js.map