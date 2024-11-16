"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Manager"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ManagersController {
    async index({ response }) {
        const managers = await Manager_1.default.query().preload('user');
        return response.ok(managers);
    }
    async show({ params, response }) {
        try {
            const manager = await Manager_1.default.query().where('user_id', params.id).preload('user').firstOrFail();
            return response.ok(manager);
        }
        catch (error) {
            return response.status(404).json({ message: 'Manager não encontrado' });
        }
    }
    async store({ request, response }) {
        const { full_name, email, password } = request.only(['full_name', 'email', 'password']);
        const user = await User_1.default.create({ full_name, email, password });
        const manager = await Manager_1.default.create({ user_id: user.id });
        return response.status(201).json({ message: 'Manager criado com sucesso', manager });
    }
    async update({ params, request, response }) {
        try {
            const manager = await Manager_1.default.findOrFail(params.id);
            const user = await User_1.default.findOrFail(manager.user_id);
            const data = request.only(['full_name', 'email', 'password']);
            user.merge(data);
            await user.save();
            return response.ok({ message: 'Manager atualizado com sucesso', manager });
        }
        catch (error) {
            return response.status(400).json({ message: 'Erro ao atualizar manager', error });
        }
    }
    async destroy({ params, response }) {
        try {
            const manager = await Manager_1.default.findOrFail(params.id);
            await manager.delete();
            return response.ok({ message: 'Manager deletado com sucesso' });
        }
        catch (error) {
            return response.status(400).json({ message: 'Erro ao deletar manager', error });
        }
    }
}
exports.default = ManagersController;
//# sourceMappingURL=ManagersController.js.map