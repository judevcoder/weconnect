import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, AfterViewInit {
    data: any;
    loading = false;
    loadingadvance = false;
    loading_url = false;
    loading_nav_url = false;
    loading_recruiter_url = false;
    keyword: string = "";

    constructor(
        private _script: ScriptLoaderService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleAdvancedSearchFormSubmit();
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleSearchByUrlFormSubmit();
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleUrlSearchFormSubmit();
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleNavUrlSearchFormSubmit();
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleRecruiterUrlSearchFormSubmit();
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }

    searchByKeyword() {
        this.loading = true;
        setTimeout(() => {
            this._router.navigate(['/search/searchresults']);
            this.loading = false;
        }, 500);
    }

    AdvancedSearch() {
        this.loadingadvance = true;
        setTimeout(() => {
            this._router.navigate(['/search/searchresults']);
            this.loadingadvance = false;
        }, 500);
    }

    searchByUrl() {
        this.loading_url = true;
        setTimeout(() => {
            this._router.navigate(['/search/searchresults']);
            this.loading_url = false;
        }, 500);
    }

    searchByNavUrl() {
        this.loading_nav_url = true;
        setTimeout(() => {
            this._router.navigate(['/search/searchresults']);
            this.loading_nav_url = false;
        }, 500);
    }

    searchByRecruiterUrl() {
        this.loading_recruiter_url = true;
        setTimeout(() => {
            this._router.navigate(['/search/searchresults']);
            this.loading_recruiter_url = false;
        }, 500);
    }

    handleAdvancedSearchFormSubmit() {
        $('.advance-search-submit').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    first_name: {
                        required: true,
                    },
                    last_name: {
                        required: true,
                    },
                    job_title: {
                        required: true,
                    },
                    company_name: {
                        required: true,
                    },
                    industry: {
                        required: true,
                    },
                    location: {
                        required: true,
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    handleSearchByUrlFormSubmit() {
        $('.advance-search-submit').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    first_name: {
                        required: true,
                    },
                    last_name: {
                        required: true,
                    },
                    job_title: {
                        required: true,
                    },
                    company_name: {
                        required: true,
                    },
                    industry: {
                        required: true,
                    },
                    location: {
                        required: true,
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    handleUrlSearchFormSubmit() {
        $('.serch-by-url-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    url_input: {
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

    handleNavUrlSearchFormSubmit() {
        $('.serch-by-nav-url-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    nav_url_input: {
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

    handleRecruiterUrlSearchFormSubmit() {
        $('.serch-by-recruiter-url-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    nav_recruiter_input: {
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
