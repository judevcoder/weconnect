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
    selector: "app-outreach-settings",
    templateUrl: "./outreachsettings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachSettingsComponent implements OnInit, AfterViewInit {
    data: any;
    campaignName: string = localStorage.getItem('CampaignName');

    constructor(private _script: ScriptLoaderService, private router: Router) { }

    ngOnInit() {
        (<any>$('#start_time_picker')).timepicker();
        (<any>$('#end_time_picker')).timepicker();
        $(document).off('click', '.schedule-date button').on('click', '.schedule-date button', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-outreach-settings", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private saveCampaignName() {
        localStorage.setItem('CampaignName', this.campaignName);
        this.router.navigate(['/outreach/launch']);
    }
}
