import {inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest} from "@models/auth/authentication-request";
import {Observable, tap} from "rxjs";
import {ServiceResponse} from "@models/auth/service-response";
import {UserInfo} from "@models/auth/user-info";
import {getSessionItem, setSessionItem} from "@utils/storage-utils";
import {ClarityService} from "@services/data/clarity.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth';
  private http = inject(HttpClient);
  private clarity = inject(ClarityService)

  private user: UserInfo | null = null;

  constructor() {
  }

  login(request: AuthenticationRequest): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.baseUrl + '/login', request, {withCredentials: true});
  }

  refresh(): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.baseUrl + '/refresh', {}, {withCredentials: true});
  }

  logout(): Observable<ServiceResponse> {
    return this.http.post<ServiceResponse>(this.baseUrl + '/logout', {withCredentials: true})
  }

  fetchUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl + '/me', {withCredentials: true}).pipe(
      tap(user => {
        this.user = user;
        setSessionItem('isLoggedIn', 'true');
        setSessionItem('username', user.username);
        this.clarity.identify(user.username,'')
      })
    );
  }

  isAuthenticated(): boolean {
    return getSessionItem('isLoggedIn') === 'true';
  }

  getUsername(): string | null {
    return getSessionItem('username');
  }
}
