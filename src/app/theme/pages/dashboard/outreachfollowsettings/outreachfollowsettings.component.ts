import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-outreach-follow-settings",
    templateUrl: "./outreachfollowsettings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachFollowSettingsComponent implements OnInit, AfterViewInit {
    data: any;

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
