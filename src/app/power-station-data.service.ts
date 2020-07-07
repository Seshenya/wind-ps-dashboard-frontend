import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PowerStationDataService {

  constructor(private http: HttpClient) { }


  // retrieving contacts
  getContacts()
  {
    return this.http.get('http://localhost:3000/windPSdata');
  }
}

