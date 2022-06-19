import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityService } from '@shared/services/activity/activity.service';
import { D3ChartService } from '@shared/services/chart/d3-chart.service';
import * as d3 from 'd3';

import * as moment from 'moment-timezone';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],
})
export class MyDashboardComponent implements OnInit {

  // private data12 = [
  //   { "Framework": "Vue", "Stars": "166443", "Released": "2014" },
  //   { "Framework": "React", "Stars": "150793", "Released": "2013" },
  //   { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
  //   { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
  //   { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
  // ];
  public display: boolean = false;

  public timeboxData = {
    arivelTime: '',
    leftTime: '',
    spanTime: '',
    activeTime: '',
  }

  // view: any[] = [900, 250];
  // multi: any[];

  // options
  // showXAxis: boolean = true;
  // showYAxis: boolean = true;
  // gradient: boolean = false;
  // showLegend: boolean = false;
  // showXAxisLabel: boolean = false;
  // xAxisLabel: string = '';
  // showYAxisLabel: boolean = false;
  // yAxisLabel: string = '';
  // animations: boolean = true;

  // colorScheme = {
  //   domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  // };


  // public barChartColorScheme = {
  //   domain: ["#007bff", "#ff9f40", "#ff5370", "#1ea6ec"]
  // };

  // public columnChart: any = chartData.productivityColumnChart;
  public productivityData = [];
  public selectedDate: Date;
  public userId: string;

  constructor(
    public authService: AuthService,
    public activityService: ActivityService,
    public chartService: D3ChartService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.loaddata();
    this.userId = this.authService.getId();
    let dateString = moment().format('YYYY-MM-DD');
    if (this.route.snapshot.paramMap.get('date')) {
      dateString = this.route.snapshot.paramMap.get('date')
    }
    this.selectedDate = moment(dateString).tz('Asia/Dhaka').toDate();


    this.activityService.getActivityData(this.userId, this.selectedDate)
      .subscribe((data) => {
        console.log(data);
        this.productivityData = this.chartService.getBarChartData(data); // .slice(0, 100);

        this.timeboxData.arivelTime = this.chartService.getArivalTime(data);
        this.timeboxData.leftTime = this.chartService.getLeftTime(data);
        this.timeboxData.spanTime = this.chartService.getSpanTime(data);
        this.timeboxData.activeTime = this.chartService.getActiveTime(data);

        this.display = true;

        console.log(this.timeboxData);

      });

  }

  loaddata() {

    //Draw Chart

  }

  public onSelect(e) { }
}
