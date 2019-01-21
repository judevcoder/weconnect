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
import { AuthenticationService } from '../auth/_services/authentication.service';
import { Helpers } from "../helpers";
import { AlertService } from '../auth/_services/alert.service';
import { AlertComponent } from '../auth/_directives/alert.component';

declare let $: any;
declare let mUtil: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./signup.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    @ViewChild('alertSignUp',
        { read: ViewContainerRef }) alertSignUp: ViewContainerRef;

    constructor(
        private _router: Router,
        private _script: ScriptLoaderService,
        private _route: ActivatedRoute,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        private cfr: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleSignupFormSubmit();
            });

        jQuery(document).ready(function() {
            $(".toggle-password").click(function() {
              $(this).toggleClass("fa-eye fa-eye-slash");
              var input = $($(this).attr("toggle"));
              if (input.attr("type") == "password") {
                input.attr("type", "text");
              } else {
                input.attr("type", "password");
              }
            });
        });
    }

    register() {
        this.loading = true;

        this._authService.signUp(this.model.email, this.model.password).subscribe(
            data => {
                this._router.navigate(['/dashboard']);
            },
            error => {
                this.showAlert('alertSignUp');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    handleSignupFormSubmit() {
        $('#m_signup_submit').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                    },
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

}
