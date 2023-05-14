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
Object.defineProperty(exports, "__esModule", { value: true });
exports.highest_number_of_4and6s = void 0;
const typeorm_1 = require("typeorm");
let highest_number_of_4and6s = class highest_number_of_4and6s {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], highest_number_of_4and6s.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], highest_number_of_4and6s.prototype, "batsman", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], highest_number_of_4and6s.prototype, "Number_of_Fours", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], highest_number_of_4and6s.prototype, "Number_of_Sixes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], highest_number_of_4and6s.prototype, "Most_recent_team", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], highest_number_of_4and6s.prototype, "Total_Boundaries", void 0);
highest_number_of_4and6s = __decorate([
    (0, typeorm_1.Entity)()
], highest_number_of_4and6s);
exports.highest_number_of_4and6s = highest_number_of_4and6s;
//# sourceMappingURL=SixesAndFours.js.map