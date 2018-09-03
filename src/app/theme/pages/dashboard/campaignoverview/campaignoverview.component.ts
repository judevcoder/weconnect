import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-campaign-overview",
    templateUrl: "./campaignoverview.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignOverviewComponent implements OnInit, AfterViewInit {
    data: any;

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._script.loadScripts("app-campaign-overview", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
