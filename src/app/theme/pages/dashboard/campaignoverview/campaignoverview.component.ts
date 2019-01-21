import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

declare let Chart: any;
declare let mApp: any;

@Component({
    selector: "app-campaign-overview",
    templateUrl: "./campaignoverview.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignOverviewComponent implements OnInit, AfterViewInit {
    data: any;
    stats: Array<object> = [];
    outreachcampaign: object = {};

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) { }

    ngOnInit() {

        this.dataService.getStats().subscribe(
            data => {
                this.stats = data;
            },
            error => {
            }
        );

        this.dataService.getOutreachCampaigns().subscribe(
            data => {
                this.outreachcampaign = data[0];
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

        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-campaign-overview", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
