import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../_services/script-loader.service";
import { Helpers } from "../helpers";

declare let $: any;
declare let mUtil: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./signup.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
