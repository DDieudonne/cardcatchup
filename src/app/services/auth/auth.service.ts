import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserName!: string | null;

  constructor() { }

  get userData() {
    this.currentUserName = localStorage.getItem('currentUser') as string;
    return this.currentUserName;
  }

  get isLoggedIn() {
    return of(this.currentUserName);
  }

  checkAuth() {
    return of((localStorage.getItem('currentUser')) ? true : false);
  }

  doLogin(data: any) {
    localStorage.setItem('currentUser', data);
    this.currentUserName = data;
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this.currentUserName = null;
      localStorage.removeItem('currentUser');
      resolve(true);
    })
  }

}
