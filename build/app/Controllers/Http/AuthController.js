"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const UserHelper_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Helpers/UserHelper"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    async login({ request, auth, response }) {
        const loginSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.required()
            ]),
            password: Validator_1.schema.string({}, [
                Validator_1.rules.minLength(6),
                Validator_1.rules.required()
            ])
        });
        const payload = await request.validate({ schema: loginSchema });
        const user = await User_1.default.findBy('email', payload.email);
        console.log('user', user);
        if (!user)
            return response.unauthorized({ message: 'Usuário não encontrado.' });
        const roles = await UserHelper_1.default.getRoles(user);
        if (roles.length === 0)
            return response.unauthorized({ message: 'Sua conta não tem permissões para logar.' });
        console.log('roles', roles);
        const role_table_name = {
            admin: 'admins',
            manager: 'managers',
        };
        const userRole = await Database_1.default.from(role_table_name[roles[0]])
            .where('user_id', user.id)
            .first();
        if (!userRole)
            return response.unauthorized({ message: 'Sua conta está invalidada. Contate o suporte.' });
        try {
            console.log(auth);
            const token = await auth.attempt(payload.email, payload.password);
            return response.ok({ token, roles });
        }
        catch (error) {
            console.error(error);
            return response.unauthorized('Invalid credentials');
        }
    }
    async logout({ auth, response }) {
        if (auth.isAuthenticated) {
            await auth.use('api').revoke();
            return response.ok({});
        }
        return response.badRequest({ message: 'Você não está logado.' });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map