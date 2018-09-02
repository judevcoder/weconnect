import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, AfterViewInit {
    data: any;

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() {
        jQuery(document)
            .off("change", "#exampleSelect1")
            .on("change", "#exampleSelect1", function() {
                var selectedVal1 = $("#exampleSelect1 option:selected").attr("value");
                $(".plan-pricing-1").text(selectedVal1);
            });

        jQuery(document)
            .off("change", "#exampleSelect2")
            .on("change", "#exampleSelect2", function() {
                var selectedVal2 = $("#exampleSelect2 option:selected").attr("value");
                $(".plan-pricing-2").text(selectedVal2);
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
