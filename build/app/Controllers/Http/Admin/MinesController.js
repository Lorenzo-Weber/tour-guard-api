"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mine_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Mine"));
class MinesController {
    async index({ response }) {
        const mines = await Mine_1.default.query()
            .preload('manager', (query) => {
            query.preload('user');
        });
        return response.ok(mines);
    }
    async store({ request, response }) {
        const data = request.only(['admin_id', 'type', 'name', 'location', 'description', 'qr_code', 'instagram', 'facebook']);
        const mine = await Mine_1.default.create(data);
        return response.created(mine);
    }
    async show({ params, response }) {
        const mine = await Mine_1.default.find(params.id);
        if (!mine) {
            return response.notFound({ message: 'Mina não encontrada' });
        }
        return response.ok(mine);
    }
    async update({ params, request, response }) {
        const mine = await Mine_1.default.find(params.id);
        if (!mine) {
            return response.notFound({ message: 'Mina não encontrada' });
        }
        const data = request.only(['admin_id', 'type', 'name', 'location', 'description', 'qr_code', 'instagram', 'facebook']);
        mine.merge(data);
        await mine.save();
        return response.ok(mine);
    }
    async destroy({ params, response }) {
        const mine = await Mine_1.default.find(params.id);
        if (!mine) {
            return response.notFound({ message: 'Mina não encontrada' });
        }
        await mine.delete();
        return response.noContent();
    }
}
exports.default = MinesController;
//# sourceMappingURL=MinesController.js.map