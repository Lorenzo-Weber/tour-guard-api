"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class RegionFacts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'region_facts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('region_id').notNullable().references('id').inTable('regions');
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
exports.default = RegionFacts;
//# sourceMappingURL=1731016389594_region_facts.js.map