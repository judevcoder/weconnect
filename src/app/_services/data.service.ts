import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    stripekey = 'sk_test_cFZBa1hksoOXpqFxn22bZ51R';
    constructor(private http: HttpClient) { }
    public getData(): Observable<any> {
        return this.http.get("./json/data.json");
    }

    public getMessages(name: string): Observable<any> {
        return this.http.get("./json/" + name + ".json");
    }

    public getCompany(): Observable<any> {
        return this.http.get("./json/company.json");
    }

    public getUser(): Observable<any> {
        return this.http.get("./json/users.json");
    }

    public getNotifications(): Observable<any> {
        return this.http.get("./json/rnotifications.json");
    }

    public getNewNotifications(): Observable<any> {
        return this.http.get("./json/new-notification.json");
    }

    public getTemplates(): Observable<any> {
        return this.http.get("./json/templates.json");
    }

    public getProfile(): Observable<any> {
        return this.http.get("./json/profile.json");
    }

    public getStats(): Observable<any> {
        return this.http.get("./json/stats.json");
    }

    public getWhosViewedProfile(): Observable<any> {
        return this.http.get("./json/who-viewed-your-profile.json");
    }

    public getPeopleYouMayKnow(): Observable<any> {
        return this.http.get("./json/people-you-may-know.json");
    }

    public getPendingRequest(): Observable<any> {
        return this.http.get("./json/pending_requests.json");
    }

    public getSavedSearch(): Observable<any> {
        return this.http.get("./json/saved-search.json");
    }

    public getCampaignType(): Observable<any> {
        return this.http.get("./json/campaigntype.json");
    }

    public getCampaignProspects(): Observable<any> {
        return this.http.get("./json/campaignprospects.json");
    }

    public getOutreachCampaigns(): Observable<any> {
        return this.http.get("./json/outreach_campaigns.json");
    }

    public getConnectRequestChartData(): Observable<any> {
        return this.http.get("./json/connect-request-chart-data.json");
    }

    public getConnectedChartData(): Observable<any> {
        return this.http.get("./json/connected-chart-data.json");
    }

    public getInsertVars(): Observable<any> {
        return this.http.get("./json/insertvars.json");
    }

    public getTimeZone(): Observable<any> {
        return this.http.get("./json/timezone.json");
    }

    public getSchedules(): Observable<any> {
        return this.http.get("./json/schedule.json");
    }

    public getSecurityCodeRequired(): Observable<any> {
        return this.http.get("./json/security-code-required.json");
    }

    public stripeCharge(token, amount) {
        const headers = new HttpHeaders()
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + this.stripekey);

        let a = String(amount * 100);

        let body = `currency=usd&source=${token}&amount=${a}`;

        return this.http
                    .post('https://api.stripe.com/v1/charges', body, { headers: headers });
    }

    public stripeCreateCustomer(token, name) {
        const headers = new HttpHeaders()
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + this.stripekey);

        let body = `description=Customer for ${name}&source=${token}`;
        return this.http
                    .post('https://api.stripe.com/v1/customers', body, { headers: headers });
    }

    public stripeCreateSubscription(plan, customer) {
        const headers = new HttpHeaders()
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + this.stripekey);

        let body = `items[0][plan]=${plan}&customer=${customer}`;
        return this.http
                    .post('https://api.stripe.com/v1/subscriptions', body, { headers: headers });
    }

    public getStripePlan() {
        const headers = new HttpHeaders()
             .set('content-type', 'application/x-www-form-urlencoded')
             .set('Authorization', 'Bearer sk_test_cFZBa1hksoOXpqFxn22bZ51R');
        return this.http.get("https://api.stripe.com/v1/plans", { headers: headers });
    }
}
