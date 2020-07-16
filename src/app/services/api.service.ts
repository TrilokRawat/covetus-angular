import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
  }

  getData(endpoint): Observable<any> {
    let headers = this.generateHeader();
    let reqUrl = environment.baseurl + endpoint;
      return  this.http.get(reqUrl, headers) 
      .pipe(map(data => data),
    );
  }

  postData(endpoint, data): Observable<any> {
    let headers = this.generateHeader();
    let reqUrl = environment.baseurl + endpoint;
      return  this.http.post(reqUrl, data, headers) 
      .pipe(map(data => data),
    );
  }


  generateHeader(){
    let headers = {};
    let HeaderObj = {
      'Content-Type': 'application/json'
    }
    let token = localStorage.getItem('token') 
                ? localStorage.getItem('token') : null
    if(token) {
      let authtoken = 'Bearer '+ token
      HeaderObj['Authorization'] = authtoken;
    }
    return headers = {headers: new HttpHeaders(HeaderObj)}
  }

}
