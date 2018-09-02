import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-outreach-sequences",
    templateUrl: "./outreachsequences.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachSequencesComponent implements OnInit, AfterViewInit {
    data: any;

    boxes: Array<string> = ['box'];

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() { 
        var maxLength = 300;
        jQuery(document)
            .on("keyup", "#comment_connection_message", function() {
                var length = String($(this).val()).length;
                var length = maxLength-length;
                $('#chars').text(length);
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-outreach-sequences", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private addStep() {
        if (this.boxes.length >= 5 )
        {
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
