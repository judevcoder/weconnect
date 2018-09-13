import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-myfolder",
    templateUrl: "./myfolder.component.html",
    encapsulation: ViewEncapsulation.None
})
export class MyFolderComponent implements OnInit, AfterViewInit {
    data: any;

    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() {
        jQuery(document).ready(function() {
            $(".flaticon-folder").parent().parent().addClass("m-menu__item--active");
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
