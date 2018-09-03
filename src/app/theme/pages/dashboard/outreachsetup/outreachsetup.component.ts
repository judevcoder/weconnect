import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Router } from "@angular/router";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-outreach-setup",
    templateUrl: "./outreachsetup.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachSetupComponent implements OnInit, AfterViewInit {
    data: any;
    campaignName: string = "Campaign Name";

    constructor(private _script: ScriptLoaderService, private router: Router) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private saveCampaignName() {
        localStorage.setItem('CampaignName', this.campaignName);
        this.router.navigate(['/outreach/sequences']);
    }

    private changeCampaignName(value: string) {
        this.campaignName = value;
    }
}
