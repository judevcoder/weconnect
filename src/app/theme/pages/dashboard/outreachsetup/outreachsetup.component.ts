import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-outreach-setup",
    templateUrl: "./outreachsetup.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachSetupComponent implements OnInit, AfterViewInit {
    data: any;

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() { 
        // jQuery(document)
        //     $(".m-portlet__head-text").text($("input[name='name']").val());

        // jQuery(document)
        //     .off("keyup", "input[name='name']")
        //     .on("keyup", "input[name='name']", function() {
        //         var campaignName = $(this).val();
        //         $(".m-portlet__head-text").text(campaignName);
        //     });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
