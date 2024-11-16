"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class UserHelper {
    async getRoles(user) {
        const rolesUser = await Database_1.default.query()
            .select('slug as role')
            .from('role_users')
            .where('user_id', user.id)
            .innerJoin('roles', 'roles.id', 'role_users.role_id');
        return rolesUser.map((value) => value.role);
    }
}
exports.default = new UserHelper();
//# sourceMappingURL=UserHelper.js.map