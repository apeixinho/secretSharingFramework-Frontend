import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiSettings } from '../config/api-settings';
import { SecretShare } from '../model/secretshare.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecretsharingService {

  private apiEndpoint = `${apiSettings.endpoint}`;

  observer: Subject<SecretShare[]> = new Subject();


  public subscriberToShares$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {}


  emitData(data) {
    this.observer.next(data);
  }


  splitSecret(k: number, n: number, secret: String): Observable<SecretShare[]> {

    // console.log(`\nThreshold: ${k}\nTotal Shares: ${k}\nSecret: ${secret}`);

    const uriPath = `${this.apiEndpoint}/splitSecret?k=${k}&n=${n}&secret=${secret}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.get<SecretShare[]>(uriPath, options);
  }

  recoverSecret(providedShares: SecretShare[]): Observable<any> {

    const uriPath = `${this.apiEndpoint}/recoverSecret`;
    const body = {
      shares: providedShares,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.post(uriPath, body, options);
  }
}
