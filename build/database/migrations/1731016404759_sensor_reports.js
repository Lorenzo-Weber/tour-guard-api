"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class SensorReports extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'sensor_reports';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('sensor_id').notNullable().references('id').inTable('sensors');
            table.boolean('in').notNullable();
            table.timestamp('timestamp').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = SensorReports;
//# sourceMappingURL=1731016404759_sensor_reports.js.map