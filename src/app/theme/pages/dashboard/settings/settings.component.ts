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

        this._script
            .loadScripts(
            "body",
            ["assets/vendors/custom/datatables/datatables.bundle.js"],
            true
            )
            .then(result => {
                var table = (<any>$("#m_table_1")).DataTable({
                    responsive: true,

                    //== DOM Layout settings

                    lengthMenu: [5, 10, 25, 50],

                    pageLength: 10,

                    //== Order settings
                    order: [[1, "desc"]],

                    headerCallback: function(thead, data, start, end, display) {
                        thead.getElementsByTagName("th")[0].innerHTML = `
                            <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                                <input type="checkbox" value="" class="m-group-checkable">
                                <span></span>
                            </label>`;
                    },

                    columnDefs: [
                        {
                            targets: 0,
                            width: "30px",
                            className: "dt-right",
                            orderable: false,
                            render: function(data, type, full, meta) {
                                return `
                                <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                                    <input type="checkbox" value="" class="m-checkable">
                                    <span></span>
                                </label>`;
                            }
                        },
                        {
                            targets: -1,
                            title: "Actions",
                            orderable: false,
                            render: function(data, type, full, meta) {
                                return `
                                
                                <a href="javascript:;" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                                    <i class="la la-edit"></i>
                                </a>
                                <a href="javascript:;" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Pause Campaign">
                                       <i class="la la-trash"></i>
                                </a>`;
                            }
                        }
                    ]
                });
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
