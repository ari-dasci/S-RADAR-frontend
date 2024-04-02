import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private _http: HttpClient) {

    }
    getdata() {
        return this._http.get(environment.urlApi + '/utils/blocks');
    }
    getAlgorithms(_category: string) {
        if (_category == 'static_data')
            return this._http.get(environment.urlApi + '/static_data/algorithms');
        if (_category == 'time_series')
            return this._http.get(environment.urlApi + '/time_series/algorithms');
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
    }
}
