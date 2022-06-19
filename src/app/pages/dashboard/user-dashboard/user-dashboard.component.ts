import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityService } from '@shared/services/activity/activity.service';
import { Nvd3ChartService } from '@shared/services/chart/nvd3-chart.service';

import * as moment from 'moment-timezone';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';

declare let d3: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit {

  options;
  
  public display: boolean = false;

  public timeboxData = {
    arivelTime: '',
    leftTime: '',
    spanTime: '',
    activeTime: '',
  }

  public productivityData = [];
  public ticks = [
    '00:00',
    '02:00',
    '04:00',
    '06:00',
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00'
  ];

  public styleWidth = 100/this.ticks.length + '%';
  public selectedDate: Date;
  public userId: string;

  constructor(
    public authService: AuthService,
    public activityService: ActivityService,
    public chartService: Nvd3ChartService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {


    this.options = this.chartService.getChartOption();

    this.userId = this.authService.getId();
    let dateString = moment().format('YYYY-MM-DD');
    if (this.route.snapshot.paramMap.get('date')) {
      dateString = this.route.snapshot.paramMap.get('date')
    }
    this.selectedDate = moment(dateString).tz('Asia/Dhaka').toDate();


    this.activityService.getActivityData(this.userId, this.selectedDate)
      .subscribe((data) => {
        console.log(this.userId)
        this.productivityData = this.chartService.getBarChartData(data);
        console.log(this.productivityData);

        this.timeboxData.arivelTime = this.chartService.getArivalTime(data);
        this.timeboxData.leftTime = this.chartService.getLeftTime(data);
        this.timeboxData.spanTime = this.chartService.getSpanTime(data);
        this.timeboxData.activeTime = this.chartService.getActiveTime(data);

        this.display = true;

        console.log(this.timeboxData);

      });

  }

  public onSelect(e) { }

}
