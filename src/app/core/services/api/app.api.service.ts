<<<<<<< HEAD
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
=======
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { throwError } from "rxjs";
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2

@Injectable({
    providedIn: 'root'
})
<<<<<<< HEAD
export class ApiService {
    constructor(private _http: HttpClient) {
    
    }
    getdata() {
        return this._http.get('http://127.0.0.1:8000/utils/blocks');
=======

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
    getLibraryAlgorithms(_category: string, _library: string) {
        if (_category == 'static_data')
            return this._http.get(environment.urlApi + '/static_data/library_algorithms/' + _library)
        if (_category == 'time_series')
            return this._http.get(environment.urlApi + '/time_series/library_algorithms/' + _library)
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2
    }
}
