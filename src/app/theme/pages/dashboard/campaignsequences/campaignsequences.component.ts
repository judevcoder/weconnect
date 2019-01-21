import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

declare let $: any;
declare let mApp: any;
declare let mUtil: any;

@Component({
    selector: "app-campaign-sequences",
    templateUrl: "./campaignsequences.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignSequencesComponent implements OnInit, AfterViewInit {
    data: any;

    boxes: Array<string> = ['box'];

    insertvars: Array<object> = [];
    templates: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
        ) { }

    ngOnInit() {
        this.dataService.getInsertVars().subscribe(
            data => {
                this.insertvars = data;
            },
            error => {
                console.log(error);
                this.insertvars = [];
            }
        );

        this.dataService.getTemplates().subscribe(
            data => {
                this.templates = data;
            },
            error => {
                console.log(error);
                this.templates = [];
            }
        );

        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });
    }

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
            setTimeout(() => {
                this.refreshScrollable();
            }, 1000);
        }
    }

    private removeSection() {
        this.boxes.pop();
    }

    private refreshScrollable() {
        $('[data-scrollable="true"]').each(function(){
            var maxHeight;
            var height;
            var el = $(this);

            if (mUtil.isInResponsiveRange('tablet-and-mobile')) {
                if (el.data('mobile-max-height')) {
                    maxHeight = el.data('mobile-max-height');
                } else {
                    maxHeight = el.data('max-height');
                }

                if (el.data('mobile-height')) {
                    height = el.data('mobile-height');
                } else {
                    height = el.data('height');
                }
            } else {
                maxHeight = el.data('max-height');
                height = el.data('max-height');
            }

            if (maxHeight) {
                el.css('max-height', maxHeight);
            }
            if (height) {
                el.css('height', height);
            }

            mApp.initScroller(el, {});
        });
    }

    insertVar() {
        var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertVal = this.insertvars[id]["code"];
        var messageVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(originVal + "[" + insertVal + "]"));
    }

    insertTemplate() {
        // var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertTemplate = this.templates[id]["message"];
        var messageAfterConnection = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(insertTemplate));
        // this.InsertTemplates.push(messageAfterConnection);
    }
}
