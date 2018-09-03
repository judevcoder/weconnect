import { NgModule } from "@angular/core";
import { ThemeComponent } from "./theme.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        component: ThemeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "dashboard",
                loadChildren: "./pages/dashboard/index/index.module#IndexModule"
            },
            {
                path: "connections",
                loadChildren:
                "./pages/dashboard/connection/connection.module#ConnectionModule"
            },
            {
                path: "inbox",
                loadChildren: "./pages/dashboard/inbox/inbox.module#InboxModule"
            },
            {
                path: "search",
                loadChildren:
                "./pages/dashboard/search/search.module#SearchModule"
            },
            {
                path: "search/searchresults",
                loadChildren:
                "./pages/dashboard/searchresults/searchresults.module#SearchResultsModule"
            },
            {
                path: "search/search-company-results",
                loadChildren:
                "./pages/dashboard/searchcompanyresults/searchcompanyresults.module#SearchCompanyResultsModule"
            },
            {
                path: "myfolder",
                loadChildren:
                "./pages/dashboard/myfolder/myfolder.module#MyFolderModule"
            },
            {
                path: "myfolder/saved-search",
                loadChildren:
                "./pages/dashboard/savedsearch/savedsearch.module#SavedSearchModule"
            },
            {
                path: "myfolder/templates",
                loadChildren:
                "./pages/dashboard/myfoldertemplates/myfoldertemplates.module#MyfolderTemplatesModule"
            },
            {
                path: "outreach",
                loadChildren:
                "./pages/dashboard/outreach/outreach.module#OutreachModule"
            },
            {
                path: "outreach/setup",
                loadChildren:
                "./pages/dashboard/outreachsetup/outreachsetup.module#OutreachSetupModule"
            },
            {
                path: "outreach/sequences",
                loadChildren:
                "./pages/dashboard/outreachsequences/outreachsequences.module#OutreachSequencesModule"
            },
            {
                path: "outreach/settings",
                loadChildren:
                "./pages/dashboard/outreachsettings/outreachsettings.module#OutreachSettingsModule"
            },
            {
                path: "outreach/launch",
                loadChildren:
                "./pages/dashboard/outreachlaunch/outreachlaunch.module#OutreachLaunchModule"
            },
            {
                path: "outreach/endorse-settings",
                loadChildren:
                "./pages/dashboard/outreachendorsesettings/outreachendorsesettings.module#OutreachEndorseSettingsModule"
            },
            {
                path: "outreach/follow-settings",
                loadChildren:
                "./pages/dashboard/outreachfollowsettings/outreachfollowsettings.module#OutreachFollowSettingsModule"
            },
            {
                path: "outreach/campaigns",
                loadChildren:
                "./pages/dashboard/outreachcampaign/outreachcampaign.module#OutreachCampaignModule"
            },
            {
                path: "campaign/overview",
                loadChildren:
                "./pages/dashboard/campaignoverview/campaignoverview.module#CampaignOverviewModule"
            },
            {
                path: "campaign/contacts",
                loadChildren:
                "./pages/dashboard/campaigncontacts/campaigncontacts.module#CampaignContactsModule"
            },
            {
                path: "campaign/sequences",
                loadChildren:
                "./pages/dashboard/campaignsequences/campaignsequences.module#CampaignSequencesModule"
            },
            {
                path: "campaign/settings",
                loadChildren:
                "./pages/dashboard/campaignsettings/campaignsettings.module#CampaignSettingsModule"
            },
            {
                path: "notification",
                loadChildren:
                "./pages/dashboard/notification/notification.module#NotificationModule"
            },
            {
                path: "settings",
                loadChildren:
                "./pages/dashboard/settings/settings.module#SettingsModule"
            },
            {
                path: "pending-requests",
                loadChildren:
                "./pages/dashboard/pendingrequests/pendingrequests.module#PendingRequestsModule"
            },
            {
                path: "people-you-may-know",
                loadChildren:
                "./pages/dashboard/peopleyoumayknow/peopleyoumayknow.module#PeopleYouMayKnowModule"
            },
            {
                path: "who-viewed-your-profile",
                loadChildren:
                "./pages/dashboard/whoviewedyourprofile/whoviewedyourprofile.module#WhoViewedYourProfileModule"
            }
        ]
    },
    {
        path: "**",
        redirectTo: "404",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }
