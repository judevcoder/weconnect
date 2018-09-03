import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-outreach-launch",
    templateUrl: "./outreachlaunch.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachLaunchComponent implements OnInit, AfterViewInit {
    data: any;
    campaignName: string = localStorage.getItem('CampaignName');

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
