
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from '../../employee';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private baseUrl: string = "https://bc26m86vc6.execute-api.us-east-2.amazonaws.com";
  private emp = new employee();

  constructor(private http: HttpClient) {

  }


  getUsers() {
    return this.http.get(this.baseUrl + '/employees');

  }


  deleteUser(id: number) {

    return this.http.delete(this.baseUrl + '/employees/' + id);

  }



  addOrEditEmp(emp: employee) {
    return this.http.put(this.baseUrl + '/employees', emp);
  }

  setter(emp: employee) {
    this.emp = emp;
  }

  getter() {
    return this.emp;
  }



}
