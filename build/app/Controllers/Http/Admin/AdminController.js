"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AdminController {
    async index({ auth, request, response }) {
        console.log("headers", request.headers());
        try {
            const user = await User_1.default.findOrFail(auth.user?.id);
            return response.ok(user);
        }
        catch (error) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
    async update({ auth, request, response }) {
        try {
            const user = await User_1.default.findOrFail(auth.user?.id);
            const data = request.only(['full_name', 'email', 'password']);
            if (data.password) {
                user.password = data.password;
            }
            user.merge(data);
            await user.save();
            return response.ok({ message: 'Dados atualizados com sucesso', user });
        }
        catch (error) {
            return response.status(400).json({ message: 'Erro ao atualizar dados', error });
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map