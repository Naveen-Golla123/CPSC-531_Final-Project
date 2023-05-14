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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let AppService = class AppService {
    constructor() {
        this.client = new pg_1.Client({
            host: 'mahmud.db.elephantsql.com',
            user: 'csmotrss',
            password: '7Z55v5NnQ3iAu6MtzUygP-_QCcj3U0hV',
            database: 'csmotrss',
        });
        console.log(this.client);
        this.client.connect()
            .then(() => {
            console.log('Connected to database!');
        })
            .catch(err => {
            console.error('Error connecting to database', err);
        });
    }
    getHello() {
        return 'Hello World!';
    }
    async getRunsVsWickets() {
        let result = await this.client.query('SELECT * FROM "public"."inningsWin_df" LIMIT 100');
        return result.rows;
    }
    async getExtraruns() {
        let result = await this.client.query('SELECT * FROM "public"."ExtraRuns" LIMIT 100');
        return result.rows;
    }
    async getline_graph_scores() {
        let result = await this.client.query('SELECT * FROM "public"."line_graph_scores" LIMIT 100');
        return result.rows;
    }
    async getHighestNumber_of_4s_6s() {
        let result = await this.client.query('SELECT * FROM "public"."highest_Number_of_4and6s" LIMIT 100');
        return result.rows;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map