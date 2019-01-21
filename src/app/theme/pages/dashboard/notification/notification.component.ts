import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, AfterViewInit {
    data: any;
    notifications: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.dataService.getNotifications().subscribe(
            data => {
                this.notifications = data;
            },
            error => {
                console.log(error);
                this.notifications = [];
            }
        );
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
