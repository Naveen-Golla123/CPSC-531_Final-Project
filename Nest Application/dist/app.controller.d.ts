import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    get6sand4s(): Promise<any>;
    getRunsVsWickets(): Promise<any>;
    getExtraruns(): Promise<any>;
    getline_graph_scores(): Promise<any>;
}
