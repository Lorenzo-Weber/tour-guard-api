"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Manager_1 = __importDefault(require("./Manager"));
class Mine extends Orm_1.BaseModel {
}
Mine.table = 'mines';
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Mine.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Mine.prototype, "admin_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Mine.prototype, "type", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Mine.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Mine.prototype, "location", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Mine.prototype, "description", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], Mine.prototype, "qr_code", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], Mine.prototype, "instagram", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], Mine.prototype, "facebook", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Mine.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Mine.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Manager_1.default, { foreignKey: 'admin_id' }),
    __metadata("design:type", Object)
], Mine.prototype, "manager", void 0);
exports.default = Mine;
//# sourceMappingURL=Mine.js.map