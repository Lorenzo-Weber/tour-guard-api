"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class PathRoutes extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'path_routes';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('mine_id').notNullable().references('id').inTable('mines');
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = PathRoutes;
//# sourceMappingURL=1731016374005_path_routes.js.map