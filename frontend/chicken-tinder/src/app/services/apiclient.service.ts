import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class ApiClientService {
    private apiUrl: string = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    get<T>(endpoint: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}/${endpoint}`);
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.httpClient.delete<T>(`${this.apiUrl}/${endpoint}`);
    }
}