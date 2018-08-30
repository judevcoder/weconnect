import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "dashboard",
                "loadChildren": ".\/pages\/dashboard\/index\/index.module#IndexModule"
            },
            {
                "path": "connections",
                "loadChildren": ".\/pages\/dashboard\/connection\/connection.module#ConnectionModule"
            },
            {
                "path": "inbox",
                "loadChildren": ".\/pages\/dashboard\/inbox\/inbox.module#InboxModule"
            },
            {
                "path": "search",
                "loadChildren": ".\/pages\/dashboard\/search\/search.module#SearchModule"
            },
            {
                "path": "searchresults",
                "loadChildren": ".\/pages\/dashboard\/searchresults\/searchresults.module#SearchResultsModule"
            },
            {
                "path": "inner",
                "loadChildren": ".\/pages\/default\/inner\/inner.module#InnerModule"
            },
            {
                "path": "profile",
                "loadChildren": ".\/pages\/default\/profile\/profile.module#ProfileModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "dashboard",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }
