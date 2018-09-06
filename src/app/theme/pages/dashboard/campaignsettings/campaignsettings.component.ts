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
    selector: "app-campaign-settings",
    templateUrl: "./campaignsettings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignSettingsComponent implements OnInit, AfterViewInit {
    data: any;

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
        jQuery(document).ready(function () {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });
    }


    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
