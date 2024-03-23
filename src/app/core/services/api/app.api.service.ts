import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private _http: HttpClient) {
    
    }
    getdata() {
        return this._http.get('http://127.0.0.1:1234/utils/blocks');
    }
}
