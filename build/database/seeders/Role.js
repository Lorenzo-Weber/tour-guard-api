"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
class RoleSeeder extends Seeder_1.default {
    async run() {
        const trx = await Database_1.default.transaction();
        try {
            await Role_1.default.firstOrCreate({ slug: 'admin' }, { slug: 'admin', description: 'manage administrator privileges' }, { client: trx });
            await Role_1.default.firstOrCreate({ slug: 'manager' }, { slug: 'manager', description: 'manage delivery manager privileges' }, { client: trx });
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            console.error(error);
            console.log('Erro ao criar roles');
        }
    }
}
exports.default = RoleSeeder;
//# sourceMappingURL=Role.js.map