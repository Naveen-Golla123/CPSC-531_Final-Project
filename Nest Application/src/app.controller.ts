import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("sixes_and_fours")
  get6sand4s(){
    return this.appService.getHighestNumber_of_4s_6s();
  }

  @Get("getRunsVsWickets")
  getRunsVsWickets(){
    return this.appService.getRunsVsWickets();
  }

  @Get("extraruns")
  getExtraruns(){
    return this.appService.getExtraruns();
  }

  @Get("getline_graph_scores")
  getline_graph_scores(){
    return this.appService.getline_graph_scores();
  }
}
