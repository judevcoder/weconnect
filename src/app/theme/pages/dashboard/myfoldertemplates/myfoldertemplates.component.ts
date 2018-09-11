import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-myfolder-templates",
    templateUrl: "./myfoldertemplates.component.html",
    encapsulation: ViewEncapsulation.None
})
export class MyfolderTemplatesComponent implements OnInit, AfterViewInit {
    data: any;

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() {
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
                                <span class="dropdown">
                                    <a href="javascript:;" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                                      <i class="la la-ellipsis-h"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="javascript:;"><i class="la la-download"></i> Export</a>
                                        <a class="dropdown-item" href="javascript:;"><i class="la la-trash"></i> Delete</a>
                                    </div>
                                </span>
                                <a href="javascript:;" class="m-portlet__nav-link btn m-btn edit-template-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                                    <i class="la la-edit" data-toggle="modal" data-target=".edit_template"></i>
                                </a>`;
                            }
                        }
                    ]
                });
            });
    }

    ngAfterViewInit() { }
}
