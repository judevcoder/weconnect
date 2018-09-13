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

    ngOnInit() {
        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-campaign-overview", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
