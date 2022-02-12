import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

  constructor(private http: HttpClient) { 
  
  }

  getRandomNumbers(number: Number) {
    return this.http.get(`https://f0e716escj.execute-api.us-east-2.amazonaws.com/default/randomNumberGenerator?n=${number}`)
  }
}
