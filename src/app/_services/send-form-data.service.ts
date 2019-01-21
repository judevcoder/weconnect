import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class SendFormDataService {

    constructor(private http: Http) {
    }

    sendPinCode(id: string) {
        return this.http.get('/api/connect/' + id);
    }

    sendId(id: string) {
        return this.http.get('/api/sendid/' + id);
    }

    sendData() {
        return this.http.get('/api/senddata/');
    }
}