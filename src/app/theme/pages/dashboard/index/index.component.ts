import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
    ComponentFactoryResolver
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";
import { SendFormDataService } from "../../../../_services/send-form-data.service";
import { AlertService } from '../../../../auth/_services/alert.service';
import { AlertComponent } from '../../../../auth/_directives/alert.component';

declare let Chart: any;
declare let mApp: any;

@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit, AfterViewInit {

    loading = false;
    message_loading = false;
    request_loading = false;
    connection_loading = false;
    know_loading = false;
    security_code_required: boolean = false;

    notifications: Array<object> = [];
    profile: Array<object> = [];
    stats: Array<object> = [];
    viewedprofiles: Array<object> = [];
    peoples: Array<object> = [];
    requests: Array<object> = [];
    pincode: number;
    selectedID: string;
    // connectrequestchartdata: object;
    // connectedchartdata: object;

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private sendformdataService: SendFormDataService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.dataService.getNotifications().subscribe(
            data => {
                this.notifications = data;
            },
            error => {
                console.log(error);
                this.notifications = [];
            }
        );

        this.dataService.getProfile().subscribe(
            data => {
                this.profile = data;
            },
            error => {
                console.log(error);
                this.profile = [];
            }
        );

        this.dataService.getStats().subscribe(
            data => {
                this.stats = data;
            },
            error => {
            }
        );

        this.dataService.getWhosViewedProfile().subscribe(
            data => {
                this.viewedprofiles = data;
            },
            error => {
            }
        );

        this.dataService.getPeopleYouMayKnow().subscribe(
            data => {
                this.peoples = data;
            },
            error => {
            }
        );

        this.dataService.getPendingRequest().subscribe(
            data => {
                this.requests = data;
            },
            error => {
            }
        );

        this.dataService.getConnectRequestChartData().subscribe(
            data => {
                if ($('#m_chart_bandwidth1').length == 0) {
                    return;
                }

                var ctx = (<any>document.getElementById("m_chart_bandwidth1")).getContext("2d");

                var gradient = ctx.createLinearGradient(0, 0, 0, 240);
                gradient.addColorStop(0, Chart.helpers.color('#d1f1ec').alpha(1).rgbString());
                gradient.addColorStop(1, Chart.helpers.color('#d1f1ec').alpha(0.3).rgbString());

                var config = {
                    type: 'line',
                    data: {
                        labels: data["month"],
                        datasets: [{
                            label: "Bandwidth Stats",
                            backgroundColor: gradient,
                            borderColor: mApp.getColor('success'),

                            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointHoverBackgroundColor: mApp.getColor('danger'),
                            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

                            //fill: 'start',
                            data: data["connect_request"]
                        }]
                    },
                    options: {
                        title: {
                            display: false,
                        },
                        tooltips: {
                            mode: 'nearest',
                            intersect: false,
                            position: 'nearest',
                            xPadding: 10,
                            yPadding: 10,
                            caretPadding: 10
                        },
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        elements: {
                            line: {
                                tension: 0.0000001
                            },
                            point: {
                                radius: 4,
                                borderWidth: 12
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 0
                            }
                        }
                    }
                };

                var chart = new Chart(ctx, config);
            },
            error => {
                console.log(error);
                // this.connectrequestchartdata = [];
            }
        );

        this.dataService.getConnectedChartData().subscribe(
            data => {
                if ($('#m_chart_bandwidth2').length == 0) {
                    return;
                }

                var ctx = (<any>document.getElementById("m_chart_bandwidth2")).getContext("2d");

                var gradient = ctx.createLinearGradient(0, 0, 0, 240);
                gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
                gradient.addColorStop(1, Chart.helpers.color('#ffefce').alpha(0.3).rgbString());

                var config = {
                    type: 'line',
                    data: {
                        labels: data["month"],
                        datasets: [{
                            label: "Bandwidth Stats",
                            backgroundColor: gradient,
                            borderColor: mApp.getColor('warning'),

                            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointHoverBackgroundColor: mApp.getColor('danger'),
                            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

                            //fill: 'start',
                            data: data["connected"]
                        }]
                    },
                    options: {
                        title: {
                            display: false,
                        },
                        tooltips: {
                            mode: 'nearest',
                            intersect: false,
                            position: 'nearest',
                            xPadding: 10,
                            yPadding: 10,
                            caretPadding: 10
                        },
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        elements: {
                            line: {
                                tension: 0.0000001
                            },
                            point: {
                                radius: 4,
                                borderWidth: 12
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 0
                            }
                        }
                    }
                };

                var chart = new Chart(ctx, config);
            },
            error => {
                console.log(error);
                // this.connectedchartdata = [];
            }
        );

        this.dataService.getSecurityCodeRequired().subscribe(
            data => {
                this.security_code_required = data["security_code_required"];
            },
            error => {
            }
        );

        let that = this;
        jQuery(document).ready(function() {
            setTimeout(function(){
                if (that.security_code_required) {
                    (<any>$('#linkedin_security_key_modal')).modal('show');
                }
            },3000);
        });

        // this.connectionRequestChart();
        // this.connectedChart();
        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleSendLinkedinPinFormSubmit();
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-index", ["assets/app/js/dashboard.js"]);
    }

    // selectViewProfileConnectID(id: string) {
    //     this.selectedID = id;
    // }

    selectViewProfileConnectID(id: string) {
        this.connection_loading = true;
        this.sendformdataService.sendId(id).subscribe(
            data => {
                console.log(data);
                this.connection_loading = false;
            },
            error => {
                console.log(error);
                this.connection_loading = false;
            });
    }

    sendLinkedinPinCode() {

        this.loading = true;

        this.sendformdataService.sendData().subscribe(
            data => {
                (<any>$('.linkedin-security-key-modal')).modal('hide');
                console.log(data);
                this.loading = false;
            },
            error => {
                console.log(error);
                this.loading = false;
            });
    }

    selectmessageID(id: string) {
        this.message_loading = true;
        this.sendformdataService.sendId(id).subscribe(
            data => {
                console.log(data);
                this.message_loading = false;
            },
            error => {
                console.log(error);
                this.message_loading = false;
            });
    }

    selectrequestID(id: string) {
        this.request_loading = true;
        this.sendformdataService.sendId(id).subscribe(
            data => {
                console.log(data);
                this.request_loading = false;
            },
            error => {
                console.log(error);
                this.request_loading = false;
            });
    }

    selectpeopleknowID(id: string) {
        this.know_loading = true;
        this.sendformdataService.sendId(id).subscribe(
            data => {
                console.log(data);
                this.know_loading = false;
            },
            error => {
                console.log(error);
                this.know_loading = false;
            });
    }

    handleSendLinkedinPinFormSubmit() {
        $('.linkedin-security-key-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    linkedinpincode: {
                        required: true,
                        maxlength: 6
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    pauseAccount() {
        this.loading = true;
        setTimeout(() => {
            (<any>$('#pause_account_now')).modal('hide');
            this.loading = false;
        }, 500);
    }

    deleteAccount() {
        this.loading = true;
        setTimeout(() => {
            (<any>$('#delete_account_now')).modal('hide');
            this.loading = false;
        }, 500);
    }
}
