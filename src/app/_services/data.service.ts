import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }
    public getData(): Observable<any> {
        return this.http.get("./json/data.json");
    }

    public getMessages(name: string): Observable<any> {
        return this.http.get("./json/" + name + ".json");
    }
}
