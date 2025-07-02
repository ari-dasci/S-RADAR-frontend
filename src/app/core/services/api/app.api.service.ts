import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private _http: HttpClient) {

    }
    getdata() {
        
        return this._http.get(environment.urlApi + '/utils/blocks');
    }
    getCategories(_type: string) {
        if (_type == 'static_data')
            return this._http.get(environment.urlApi + '/static_data/categories');
        //if (_category == 'time_series')
        //    return this._http.get(environment.urlApi + '/time_series/algorithms');
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid type provided'))
        }
    }
    getAlgorithms(_category: string) {
        if (_category == 'static_data')
            return this._http.get(environment.urlApi + '/static_data/algorithms');
        if (_category == 'time_series')
            return this._http.get(environment.urlApi + '/time_series/algorithms');
        if (_category == 'federated_data')
            return this._http.get(environment.urlApi + '/federated_data/algorithms');
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
        if (_category == 'federated_data')
            return this._http.get(environment.urlApi + '/federated_data/library_algorithms/' + _library)
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
    }



    getParams(_model: string, _category: string) {
        let modelName = _model.charAt(0).toLowerCase() + _model.slice(1);
        if (_category == 'static_data')
            return this._http.get(environment.urlApi + "/static_data/get_params/" + modelName)
        if (_category == 'time_series')
            return this._http.get(environment.urlApi + "/time_series/get_params/" + modelName)
        if (_category == 'federated_data')
            return this._http.get(environment.urlApi + "/federated_data/get_params/" + modelName)
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
    }

    setParams(kwargs:string, _category: string) {
        if (_category == 'static_data')
            return this._http.post(environment.urlApi + "/static_data/set_params", kwargs)  
        if (_category == 'time_series')
            return this._http.post(environment.urlApi + "/time_series/set_params", kwargs)
        if (_category == 'federated_data')
            return this._http.post(environment.urlApi + "/federated_data/set_params", kwargs)
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
    }

    getDatasets( _category: string) {
        if (_category == 'static_data')
            return this._http.get(environment.urlApi + "/static_data/datasets")
        if (_category == 'time_series')
            return this._http.get(environment.urlApi + "/time_series/datasets")
        if (_category == 'federated_data')
            return this._http.get(environment.urlApi + "/federated_data/datasets")
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
    }

    getPreprocessing(_category: string) {
        if (_category == 'static_data')
            return this._http.get(environment.urlApi + "/static_data/preprocessing")
        if (_category == 'time_series')
            return this._http.get(environment.urlApi + "/time_series/preprocessing")
        else {
            // Handle invalid category here, for example, throw an error
            return throwError(() => new Error('Invalid category provided'))
        }
    }

    run_pipeline(_json: string) {
        return this._http.post(environment.urlApi + "/pipelines/run_pipeline", _json).pipe(
            // Catch and handle errors
            catchError((error: HttpErrorResponse) => {
                // You can customize error handling here
                return throwError(() => new Error(error.message || 'Server error'));
            })
        );
    }
}
