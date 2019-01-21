import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Router } from "@angular/router";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

declare let $: any;
declare let mApp: any;
declare let mUtil: any;

@Component({
    selector: "app-outreach-sequences",
    templateUrl: "./outreachsequences.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachSequencesComponent implements OnInit, AfterViewInit {
    data: any;
    disabled: boolean = false;
    loading: boolean = false;
    insertvars: Array<object> = [];
    templates: Array<object> = [];
    profile: object = {};
    campaignName: string = localStorage.getItem('CampaignName');
    campaigntype: string = localStorage.getItem('CampaignType');
    skipsequence: string = "false";
    showcampaigntype: string = localStorage.getItem('ShowCampaignType');
    showcampaignprospect: string = localStorage.getItem('ShowCampaignProspect');

    InsertVar: string = "";
    InsertTemplates: Array<any> = [];

    boxes: Array<string> = ['box'];

    constructor(
        private _script: ScriptLoaderService,
        private router: Router,
        private dataService: DataService
    ) { }

    ngOnInit() {
        console.log(this.showcampaigntype);
        console.log(this.showcampaignprospect);

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

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleAddNewTemplateFormSubmit();
            });

        var maxLength = 300;
        jQuery(document)
            .on("keyup", "#comment_connection_message", function() {
                var length = String($(this).val()).length;
                var length = maxLength - length;
                $('#chars').text(length);
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-outreach-sequences", [
            "assets/app/js/dashboard.js"
        ]);

    }

    private addStep() {
        if (this.boxes.length >= 5) {
            this.disabled = true;
        } else {
            this.boxes.push('box');
            setTimeout(() => {
                this.refreshScrollable();
            }, 1000);
        }
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

    private removeSection() {
        this.boxes.pop();
        if (this.boxes.length < 5) {
            this.disabled = false;
        }
    }

    private saveCampaignName() {
        localStorage.setItem('CampaignName', this.campaignName);
        localStorage.setItem('SkipSequence', this.skipsequence);
        localStorage.setItem('CampaignType', this.campaigntype);
        localStorage.setItem('ShowCampaignType', this.showcampaigntype);
        localStorage.setItem('ShowCampaignProspect', this.showcampaignprospect);
        localStorage.setItem('InsertVar', (<any>$('#comment_connection_message').val()));

        this.router.navigate(['/outreach/settings']);
    }

    private insertVar() {
        var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertVal = this.insertvars[id]["code"];
        var messageVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(originVal + "[" + insertVal + "]"));
        this.InsertVar = messageVal;
    }

    private insertTemplate() {
        // var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertTemplate = this.templates[id]["message"];
        var messageAfterConnection = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(insertTemplate));
        this.InsertTemplates.push(messageAfterConnection);
    }

    private addNewtemplate() {
        this.loading = true;
        setTimeout(() => {
            (<any>$('#new_template').modal('hide'));
            this.loading = false;
        }, 500);
    }

    handleAddNewTemplateFormSubmit() {
        $('.add-new-template-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    new_template_name: {
                        required: true
                    },
                    new_template_message: {
                        required: true
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }
}
