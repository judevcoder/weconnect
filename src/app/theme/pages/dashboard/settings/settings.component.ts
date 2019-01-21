import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";
import { ActivatedRoute, Router } from '@angular/router';

declare let stripe: any;
declare let Stripe: any;
declare let registerElements: any;

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, AfterViewInit {
    data: any;
    profile: Array<object> = [];
    price: string;
    Mplans : Array<object> = [];
    Aplans : Array<object> = [];
    initMprice: string;
    initAprice: string;
    planId: any;
    sub: any;

    stripe = Stripe('pk_test_vJ2pjVPnGErbtXdXMtjow6Ur');

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        let that = this;

        this.sub = this.route
            .queryParams
            .subscribe(params => {
                if (params.param == "billing") {
                    $('#settings_profile_link').removeClass('active');
                    $('#settings_plan').removeClass('active');
                    $('#settings_user_management_link').removeClass('active');
                    $('#settings_profile').removeClass('active');
                    $('#settings_plan').removeClass('active');
                    $('#settings_user_management').removeClass('active');
                    $('#settings_plan_link').addClass('active');
                    $('#settings_plan').addClass('active');
                } else if (params.param == "profile") {
                    $('#settings_plan').removeClass('active');
                    $('#settings_user_management_link').removeClass('active');
                    $('#settings_plan').removeClass('active');
                    $('#settings_user_management').removeClass('active');
                    $('#settings_plan_link').removeClass('active');
                    $('#settings_plan').removeClass('active');
                    $('#settings_profile').addClass('active');
                    $('#settings_profile_link').addClass('active');
                }
        });

        this.dataService.getProfile().subscribe(
            data => {
                this.profile = data;
            },
            error => {
            }
        );

        this.dataService.getStripePlan().subscribe(
            data => {
                let plans = (<any>data).data;
                for (let plan of plans) {
                    let planname = plan['nickname'];
                    let plantype = 'Y';
                    plan['amount'] = Number(plan['amount'] / 100);
                    if (planname.search(plantype) == -1) {
                        this.Mplans.push(plan);
                    } else {
                        this.Aplans.push(plan);
                    }
                }
                (<any>this).Aplans.sort(function(plan1, plan2) {
                    return plan1.amount - plan2.amount;
                });
                (<any>this).Mplans.sort(function(plan1, plan2) {
                    return plan1.amount - plan2.amount;
                });
                this.initMprice = (<any>this.Mplans[0]).amount;
                this.initAprice = (<any>this.Aplans[0]).amount;
            },
            error => {
                console.log(error);
            }
        );

        this.initStripeElement();

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

        jQuery(document)
            .off("click", "#buy_now_monthly")
            .on("click", "#buy_now_monthly", function() {
                var amountMonthly = $(".plan-pricing-1").text();
                that.price = amountMonthly;
                $("#pay_btn").text('Pay $' + amountMonthly);
                that.planId = $("#exampleSelect1 option:selected").attr("id");
            });

        jQuery(document)
            .off("click", "#buy_now_annual")
            .on("click", "#buy_now_annual", function() {
                var amountAnnual = $(".plan-pricing-2").text();
                that.price = amountAnnual;
                $("#pay_btn").text('Pay $' + amountAnnual);
                that.planId = $("#exampleSelect2 option:selected").attr("id");
                console.log(that.planId);
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

    private initStripeElement() {
        let elements = this.stripe.elements({
            fonts: [{
                cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
            }, ],
            // Stripe's examples are localized to specific languages, but if
            // you wish to have Elements automatically detect your user's locale,
            // use `locale: 'auto'` instead.
            locale: (<any>window).__exampleLocale
        });

        let card = elements.create('card', {
            iconStyle: 'solid',
            style: {
                base: {
                    iconColor: '#c4f0ff',
                    color: '#fff',
                    fontWeight: 500,
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    fontSmoothing: 'antialiased',

                    ':-webkit-autofill': {
                        color: '#fce883',
                    },
                    '::placeholder': {
                        color: '#87BBFD',
                    },
                },
                invalid: {
                    iconColor: '#FFC7EE',
                    color: '#FFC7EE',
                },
            },
        });
        card.mount('#example1-card');

        this.registerElements([card], 'example1');
    }

    private registerElements(elements, exampleName) {
        let that = this;
        var formClass = '.' + exampleName;
        var example = document.querySelector(formClass);

        var form = example.querySelector('form');
        var resetButton = example.querySelector('a.reset');
        var error = form.querySelector('.error');
        var errorMessage = error.querySelector('.message');

        function enableInputs() {
            Array.prototype.forEach.call(
                form.querySelectorAll(
                    "input[type='text'], input[type='email'], input[type='tel']"
                ),
                function(input) {
                    input.removeAttribute('disabled');
                }
            );
        }

        function disableInputs() {
            Array.prototype.forEach.call(
                form.querySelectorAll(
                    "input[type='text'], input[type='email'], input[type='tel']"
                ),
                function(input) {
                    input.setAttribute('disabled', 'true');
                }
            );
        }

        function triggerBrowserValidation() {
            // The only way to trigger HTML5 form validation UI is to fake a user submit
            // event.
            var submit = document.createElement('input');
            submit.type = 'submit';
            submit.style.display = 'none';
            form.appendChild(submit);
            submit.click();
            submit.remove();
        }

        // Listen for errors from each Element, and show error messages in the UI.
        var savedErrors = {};
        elements.forEach(function(element, idx) {
            element.on('change', function(event) {
                if (event.error) {
                    error.classList.add('visible');
                    savedErrors[idx] = event.error.message;
                    (<any>errorMessage).innerText = event.error.message;
                } else {
                    savedErrors[idx] = null;

                    // Loop over the saved errors and find the first one, if any.
                    var nextError = Object.keys(savedErrors)
                        .sort()
                        .reduce(function(maybeFoundError, key) {
                            return maybeFoundError || savedErrors[key];
                        }, null);

                    if (nextError) {
                        // Now that they've fixed the current error, show another one.
                        (<any>errorMessage).innerText = nextError;
                    } else {
                        // The user fixed the last error; no more errors.
                        error.classList.remove('visible');
                    }
                }
            });
        });

        // Listen on the form's 'submit' handler...
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Trigger HTML5 validation UI on the form if any of the inputs fail
            // validation.
            var plainInputsValid = true;
            Array.prototype.forEach.call(form.querySelectorAll('input'), function(
                input
            ) {
                if (input.checkValidity && !input.checkValidity()) {
                    plainInputsValid = false;
                    return;
                }
            });
            if (!plainInputsValid) {
                triggerBrowserValidation();
                return;
            }

            // Show a loading screen...
            example.classList.add('submitting');

            // Disable all inputs.
            disableInputs();

            // Gather additional customer data we may have collected in our form.
            var name = form.querySelector('#' + exampleName + '-name');
            var address1 = form.querySelector('#' + exampleName + '-address');
            var city = form.querySelector('#' + exampleName + '-city');
            var state = form.querySelector('#' + exampleName + '-state');
            var zip = form.querySelector('#' + exampleName + '-zip');
            var additionalData = {
                name: name ? (<any>name).value : undefined,
                address_line1: address1 ? (<any>address1).value : undefined,
                address_city: city ? (<any>city).value : undefined,
                address_state: state ? (<any>state).value : undefined,
                address_zip: zip ? (<any>zip).value : undefined,
            };

            // Use Stripe.js to create a token. We only need to pass in one Element
            // from the Element group in order to create a token. We can also pass
            // in the additional customer data we collected in our form.
            that.stripe.createToken(elements[0], additionalData).then(function(result) {
                // Stop loading!

                if (result.token) {

                    that.dataService.stripeCreateCustomer(result.token.id, result.token.card.name).subscribe(
                        data => {
                            let customer = (<any>data).id
                            that.dataService.stripeCreateSubscription(that.planId, customer).subscribe(
                                data => {

                                    example.classList.remove('submitting');
                                    // (<any>example).querySelector('.token').innerText = result.token.id;
                                    (<any>example).querySelector('.amount').innerText = that.price;
                                    example.classList.add('submitted');
                                    // that.stripe.createToken(elements[0], additionalData).then(function(res) {
                                    //     if (res.token) {
                                    //         that.dataService.stripeCharge(res.token.id, Number(that.price)).subscribe(
                                    //             data => {
                                    //                 example.classList.remove('submitting');
                                    //                 // (<any>example).querySelector('.token').innerText = result.token.id;
                                    //                 (<any>example).querySelector('.amount').innerText = that.price;
                                    //                 example.classList.add('submitted');
                                    //             },
                                    //             error => {
                                    //                 example.classList.remove('submitting');
                                    //                 console.log('error', error);
                                    //             });
                                    //     }
                                    // });
                                },
                                error => {
                                    example.classList.remove('submitting');
                                    console.log('error', error);
                                });
                        },
                        error => {
                            console.log(error);
                        });

                } else {
                    // Otherwise, un-disable inputs.
                    enableInputs();
                }
            });
        });

        resetButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Resetting the form (instead of setting the value to `''` for each input)
            // helps us clear webkit autofill styles.
            form.reset();

            // Clear each Element.
            elements.forEach(function(element) {
                element.clear();
            });

            // Reset error state as well.
            error.classList.remove('visible');

            // Resetting the form does not un-disable inputs, so we need to do it separately:
            enableInputs();
            example.classList.remove('submitted');
        });
    }
}
