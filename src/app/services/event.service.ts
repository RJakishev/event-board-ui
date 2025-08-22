import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getEvents(
    page: number,
    size: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(this.apiUrl + '/events', { params });
  }

  register(eventId: number, registration: Registration): Observable<any> {
    return this.http.post(`${this.apiUrl}/events/${eventId}/register`, registration);
  }

  createEvent(event: Event): Observable<any> {
    return this.http.post<Event>(`${this.apiUrl}/events`, event);
  }
}
