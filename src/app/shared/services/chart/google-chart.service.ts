import { Injectable } from '@angular/core';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class GoogleChartService {

  private _barSlotTimeInterval = 5;

  constructor() { }

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

  public getColumnChartData(data = []): any[] {

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
        'neutral': 0
      };

      if (slotend.isSameOrAfter(dataend)) {
        // console.log({ 'type': 'OK', datastart, dataend, slotstart, slotend, slotkey });
        timelog[slot]['active'] += moment.duration(dataend.diff(datastart)).asSeconds();
        timelog[slot][element.type] += moment.duration(dataend.diff(datastart)).asSeconds();
      } else {
        // console.log({ 'type': 'NOT OK', datastart, dataend, slotstart, slotend, slotkey });
        timelog[slot]['active'] += moment.duration(slotend.diff(datastart)).asSeconds() + 1;
        timelog[slot][element.type] += moment.duration(slotend.diff(datastart)).asSeconds() + 1;
        let newElement = Object.assign({}, element);
        newElement.appData.start = moment(slotend).valueOf();
        logdata.push(newElement);
      }
      // console.log({ datastart, dataend });
      // console.log({ slotstart, slotend, slotkey });
      // let sStart = new Date(element.appData.start)

    });

    // console.log(timelog);

    const returnSlots = slots.map(slot => {
      return [
        slot, 
        (!!timelog[slot] && !!timelog[slot]['productive']) ? (timelog[slot]['productive']/60) : 0, 
        (!!timelog[slot] && !!timelog[slot]['unproductive']) ? (timelog[slot]['unproductive']/60) : 0, 
        (!!timelog[slot] && !!timelog[slot]['neutral']) ? (timelog[slot]['neutral']/60) : 0, 
        'stroke-width: 0;'
        ];
    });

    console.log(returnSlots);
    return returnSlots;

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
