"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Sensors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'sensors';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('region_id').notNullable().references('id').inTable('regions');
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Sensors;
//# sourceMappingURL=1731016399594_sensors.js.map