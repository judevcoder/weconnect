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
    selector: "app-pending-requests",
    templateUrl: "./pendingrequests.component.html",
    encapsulation: ViewEncapsulation.None
})
export class PendingRequestsComponent implements OnInit, AfterViewInit {
    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) { }

    data: any;

    ngOnInit() {
        this.dataService.getData().subscribe(data => {
            this.data = data;
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-inbox", ["assets/app/js/dashboard.js"]);
    }
}
