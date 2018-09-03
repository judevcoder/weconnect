import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-campaign-sequences",
    templateUrl: "./campaignsequences.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignSequencesComponent implements OnInit, AfterViewInit {
    data: any;

    boxes: Array<string> = ['box'];

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private addStep() {
        if (this.boxes.length >= 5) {
            $(".add-step-btn").removeClass("btn-outline-success").addClass("btn-success");
            $(".add-step-btn").attr("disabled", "disabled");
        } else {
            this.boxes.push('box');
        }
    }

    private removeSection() {
        this.boxes.pop();
    }
}
