"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Mines extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'mines';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('admin_id').notNullable().references('id').inTable('users');
            table.string('type').notNullable();
            table.string('name').notNullable();
            table.string('location').notNullable();
            table.string('description').notNullable();
            table.binary('qr_code').nullable();
            table.string('instagram').nullable();
            table.string('facebook').nullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Mines;
//# sourceMappingURL=1731016293533_mines.js.map