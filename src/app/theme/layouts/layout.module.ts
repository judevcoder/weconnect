import { NgModule } from "@angular/core";

import { DefaultComponent } from "../pages/default/default.component";
import { HeaderNavComponent } from "./header-nav/header-nav.component";
import { AsideNavComponent } from "./aside-nav/aside-nav.component";
import { FooterComponent } from "./footer/footer.component";
import { ScrollTopComponent } from "./scroll-top/scroll-top.component";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HrefPreventDefaultDirective } from "../../_directives/href-prevent-default.directive";
import { UnwrapTagDirective } from "../../_directives/unwrap-tag.directive";

import { DashboardComponent } from "../pages/dashboard/dashboard.component";

@NgModule({
    declarations: [
        DashboardComponent,
        DefaultComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        ScrollTopComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective
    ],
    exports: [
        DashboardComponent,
        DefaultComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        ScrollTopComponent,
        HrefPreventDefaultDirective
    ],
    imports: [CommonModule, RouterModule]
})
export class LayoutModule {}
