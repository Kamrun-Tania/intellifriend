import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class Nvd3ChartService {

  chartOptions = {

    chart: {
      type: 'multiBarChart',
      height: 250,
      margin: {
        top: 40,
        right: 20,
        bottom: 0,
        left: 45
      },
      tooltip: {
        contentGenerator: function (obj) {

          let applog = [];
          let txtlog = [];

          let endslot = moment(moment().format("YYYY-MM-DD ") + obj.value).add(5, 'minutes').format('HH:mm');

          if (obj.data && obj.data.log) {
            obj.data.log.forEach(element => {

              if (!applog[element.app] || !applog[element.app]['duration']) {
                applog[element.app] = {};
                applog[element.app]['duration'] = 0;
                applog[element.app]['name'] = element.app;
              }

              let appstart = moment(element.start);
              let append = moment(element.end);

              applog[element.app]['duration'] += moment.duration(append.diff(appstart)).asSeconds();

            });
          }

          var keysSorted = Object.keys(applog)
            .sort(function (a, b) {
              return applog[b].duration - applog[a].duration; // Organize the category array
            })
            .map(function (category) {
              return applog[category]; // Convert array of categories to array of objects
            });


          let totalDuration = 0;
          keysSorted.forEach(element => {
            totalDuration += element['duration'];
            let humanDuration = element['duration'] < 60 ? element['duration'] + 's' : (element['duration'] / 60).toFixed(0) + 'm ' + (element['duration'] % 60) + 's';
            txtlog.push(
              `<tr>
                <td colspan="2">${element['name']}</td>
                <td class="value">${humanDuration}</td>
                </tr>
                `
            );
          });
          txtlog.push(
            `<tr>
              <td colspan="2" class="value">Total: </td>
              <td class="value">${totalDuration < 60 ? totalDuration + 's' : (totalDuration / 60).toFixed(0) + 'm ' + (totalDuration % 60) + 's'}</td>
              </tr>
              `
          );

          return `
          <table>
            <thead>
              <tr>
                <td colspan="3"><strong class="x-value">${obj.value} - ${endslot}</strong></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="legend-color-guide">
                  <div style="background-color: ${obj.color};"></div>
                </td>
                <td class="key">${obj.data.key}</td>
                <td class="value">${d3.format('%')(obj.data.y / 300)}</td>
              </tr>
              ${txtlog.join(' ')}
            </tbody>
          </table>`;
        }
      },
      clipEdge: false,
      showControls: false,
      // staggerLabels: true,
      // duration: 500,
      stacked: true,
      xAxis: {
        axisLabel: false,
        showMaxMin: true,
        tickFormat: function (d) {
          return d;
        }
      },
      yAxis: {
        axisLabel: '',
        axisLabelDistance: -15,
        showMaxMin: true,
        tickValues: [75, 150, 225, 300],
        tickFormat: function (d) {
          if (d > 0) {
            return d3.format('%')(d / 300);
          }
          return "";
        }
      }
    }

  };

  private _barSlotTimeInterval = 5;

  constructor() { }

  public getChartOption() {
    return this.chartOptions;
  }

  public getArivalTime(data = []) {

    if (data.length > 0) {
      return moment(data[0]['appData']['start']).tz("Asia/Dhaka").format("HH:mm");
    } else {
      return '-';
    }

  }

  public getLeftTime(data = []) {

    if (data.length > 0) {
      const leftTime = moment(data[data.length - 1]['appData']['end']);
      //.tz("Asia/Dhaka").format("HH:mm");

      // Return "ONLINE" if leftTime is less than 5 min
      const timeDiff = moment.duration(moment().diff(leftTime)).asMinutes();


      if (timeDiff <= 5 && moment().isSame(leftTime, 'day')) {
        return 'ONLINE';
      }

      return leftTime.subtract(1, 'seconds').tz("Asia/Dhaka").format("HH:mm");

    } else {
      return '-';
    }

  }

  public getSpanTime(data = []) {

    if (data.length > 0) {

      const start = moment(data[0]['appData']['end']);
      const end = moment(data[data.length - 1]['appData']['end']);
      return moment.utc(end.diff(start)).format("HH[h] mm[m]");

    } else {
      return '-';
    }

  }

  public getActiveTime(data = []) {

    if (data.length > 0) {

      let total = 0;

      data.map(row => {
        total += moment(row.appData.end).diff(moment(row.appData.start));
      })
      // const start = moment(data[0]['appData']['end']);
      // const end = moment(data[data.length - 1]['appData']['end']);
      return moment.utc(total).format("HH[h] mm[m]");

    } else {
      return '-';
    }

  }

  public getBarSlot(startTime: string = '00:00'): string[] {
    const x = this._barSlotTimeInterval; // minutes interval
    const times: Array<string> = []; // time array
    let tt = 0; // start time

    const givenTime = startTime.split(':', 1)[0];

    if (givenTime) {
      tt = parseInt(givenTime, 10) * 60;
    }

    // loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
      const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      const mm = tt % 60; // getting minutes of the hour in 0-55 format
      times[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
      tt = tt + x;
    }
    return times;
  }

  public getBarChartData(data = []): any[] {

    const logdata = Object.assign([], data);
    const slots = this.getBarSlot();
    const timelog = {};

    logdata.forEach(element => {

      const x = this._barSlotTimeInterval;

      let datastart = moment(element.appData.start);
      let dataend = moment(element.appData.end);

      let slotkey = Math.floor(parseInt(datastart.format("mm"), 10) / 5) * 5 + "";

      if (slotkey.length < 2) {
        slotkey = "0" + slotkey;
      }

      let slotstart = moment(datastart.format("YYYY-MM-DD HH") + ":" + slotkey);
      let slotend = moment(datastart.format("YYYY-MM-DD HH") + ":" + slotkey);
      slotend = moment(slotend.add(5, 'minutes').format("YYYY-MM-DD HH:mm"));

      let slot = datastart.format("HH") + ":" + slotkey;

      timelog[slot] = timelog[slot] ? timelog[slot] : {
        'active': 0,
        'productive': 0,
        'unproductive': 0,
        'neutral': 0,
        'productiveLog': [],
        'unproductiveLog': [],
        'neutralLog': []
      };

      if (slotend.isSameOrAfter(dataend)) {
        // console.log({ 'type': 'OK', datastart, dataend, slotstart, slotend, slotkey });
        timelog[slot]['active'] += moment.duration(dataend.diff(datastart)).asSeconds();
        timelog[slot][element.type] += moment.duration(dataend.diff(datastart)).asSeconds();
        timelog[slot][element.type + 'Log'].push(element.appData);

      } else {
        // console.log({ 'type': 'NOT OK', datastart, dataend, slotstart, slotend, slotkey });
        timelog[slot]['active'] += moment.duration(slotend.diff(datastart)).asSeconds() + 1;
        timelog[slot][element.type] += moment.duration(slotend.diff(datastart)).asSeconds() + 1;

        let newElement = Object.assign({}, element);
        newElement.appData.start = moment(slotend).valueOf();
        logdata.push(newElement);

        element.appData.end = moment(slotend).valueOf();
        timelog[slot][element.type + 'Log'].push(element.appData);

      }
    });

    const returnSlots = slots.map(slot => {

      let p = (!!timelog[slot] && !!timelog[slot]['productive']) ? (timelog[slot]['productive']) : 0;
      let u = (!!timelog[slot] && !!timelog[slot]['unproductive']) ? (timelog[slot]['unproductive']) : 0;
      let n = (!!timelog[slot] && !!timelog[slot]['neutral']) ? (timelog[slot]['neutral']) : 0;
      let sum = p + u + n;

      if (sum > 300) {
        console.log(sum);

        let diff = sum - 300;

        if (u > 0 && u > diff) {
          u = u - diff;
        } else if (n > 0 && n > diff) {
          n = n - diff;
        } else {
          p = p - diff;
        }
      }

      return {
        name: slot,
        'productive': p,
        'unproductive': u,
        'neutral': n,

        'productiveLog': (!!timelog[slot] && !!timelog[slot]['productiveLog']) ? (timelog[slot]['productiveLog']) : [],
        'unproductiveLog': (!!timelog[slot] && !!timelog[slot]['unproductiveLog']) ? (timelog[slot]['unproductiveLog']) : [],
        'neutralLog': (!!timelog[slot] && !!timelog[slot]['neutralLog']) ? (timelog[slot]['neutralLog']) : []
      };
    });

    console.log(returnSlots);




    return this.formateData(returnSlots);

  }


  formateData(productivityData) {

    const produtive = [];
    const neutral = [];
    const unproductive = [];
    productivityData.forEach((element, index) => {

      produtive.push({
        key: index,
        series: 'productive',
        x: element['name'],
        y: element['productive'],
        log: element['productiveLog']
      });
      neutral.push({
        key: index,
        series: 'neutral',
        x: element['name'],
        y: element['neutral'],
        log: element['neutralLog']
      });
      unproductive.push({
        key: index,
        series: 'unproductive',
        x: element['name'],
        y: element['unproductive'],
        log: element['unproductiveLog']

      });
    });


    return [{
      key: 'Productive',
      values: produtive
    }, {
      key: 'Neutral',
      values: neutral
    }, {
      key: 'Unproductive',
      values: unproductive
    }]


  }

  // public getIdleData() {
  //   const slots = this.getBarSlot();

  //   let series = slots.map(d => {

  //     return {
  //       "name": d,
  //       "value": 5
  //     }

  //   });

  //   let returndata =
  //   {
  //     "name": "100%",
  //     "series": series
  //   }

  //   return returndata;
  // }
}
