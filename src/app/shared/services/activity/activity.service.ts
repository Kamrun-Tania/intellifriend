import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Socket } from 'ngx-socket-io';

class Activity {
  id: string;
  appData: AppData;
  userId: string;
  created: number;
  modified?: number;
}

class AppData {
  app: string;
  title: string;
  url: string;
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root'
})

export class ActivityService {

  currentDocument = this._socket.fromEvent<any>('activity-created');
  private baseUrl: string = environment.apiBaseUrl;


  constructor(
    private _http: HttpClient,
    private _socket: Socket
  ) {
    this._socket.emit('rest-login', localStorage.getItem('user'));
  }


  public getActivityData(
    userId: string,
    selectedDate: Date,
  ): Observable<Activity[]> {

    const startTime: number = moment(selectedDate).valueOf();
    const endTime: number = moment(selectedDate).add(1, 'days').valueOf();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }),
      params: {
        userId,
        'appData.start[$gte]': startTime,
        'appData.start[$lt]': endTime,
        '$sort[appdata.start]': 1,
        '$limit': -1
      }
    };

    const url =  this.baseUrl + '/activities';
    return this._http.get<Activity[]>(url, httpOptions);
  }

}
