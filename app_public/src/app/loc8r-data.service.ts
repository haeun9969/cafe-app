import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Location } from './home-list/home-list.component';
import { Location, Review } from './location';


@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://loc8rhaeun.herokuapp.com/api';

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    // const lng: number = 127.1042488;
    // const lat: number = 37.0056918;
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
    
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError); 
   }

   public getLocationById(locationId: string): Promise<Location> {
     const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
     return this.http
       .get(url)
       .toPromise()
       .then(response => response as Location)
       .catch(this.handleError);
   }

   public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {
     const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
     return this.http
       .post(url, formData)
       .toPromise()
       .then(response => response as any)
       .catch(this.handleError);
   }
   
   private handleError(error: any): Promise<any> {
     console.error('Something has gone wrong', error);
     return Promise.reject(error.message || error);
   }
}

