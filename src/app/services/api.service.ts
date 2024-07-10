import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getValueRange(gasstationIds: number[], startDate: Date, endDate: Date) {
        return this.http.post('http://localhost:5000/value_range', gasstationIds);
    }
}
