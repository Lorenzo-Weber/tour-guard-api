"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const luxon_1 = require("luxon");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Admin_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Admin"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const Manager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Manager"));
class default_1 extends Seeder_1.default {
    async run() {
        await User_1.default.createMany([
            {
                full_name: 'Alice Smith',
                email: 'alice.smith@example.com',
                password: 'password123',
                created_at: luxon_1.DateTime.now(),
                updated_at: luxon_1.DateTime.now(),
            },
            {
                full_name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                password: 'password123',
                created_at: luxon_1.DateTime.now(),
                updated_at: luxon_1.DateTime.now(),
            },
            {
                full_name: 'Charlie Brown',
                email: 'charlie.brown@example.com',
                password: 'password123',
                created_at: luxon_1.DateTime.now(),
                updated_at: luxon_1.DateTime.now(),
            },
        ]);
        const trx = await Database_1.default.transaction();
        try {
            let adminUser = await User_1.default.findBy('email', Env_1.default.get('ADMIN_EMAIL'), trx);
            if (!adminUser) {
                adminUser = await User_1.default.create({
                    email: Env_1.default.get('ADMIN_EMAIL'),
                    password: Env_1.default.get('ADMIN_PASSWORD'),
                    full_name: 'Admin',
                }, { client: trx });
                const role = await Role_1.default.findByOrFail('slug', 'admin', trx);
                await trx.table('role_users').insert({
                    role_id: role.id,
                    user_id: adminUser.id,
                });
                await Admin_1.default.create({
                    user_id: adminUser.id,
                }, { client: trx });
            }
            let managerUser = await User_1.default.findBy('email', 'manager@mail.com', trx);
            if (!managerUser) {
                managerUser = await User_1.default.create({
                    email: 'manager@mail.com',
                    password: '123456',
                    full_name: 'Manager',
                }, { client: trx });
                const role = await Role_1.default.findByOrFail('slug', 'manager', trx);
                await trx.table('role_users').insert({
                    role_id: role.id,
                    user_id: managerUser.id,
                });
                await Manager_1.default.create({
                    user_id: managerUser.id,
                }, { client: trx });
            }
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            console.error(error);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=User.js.map