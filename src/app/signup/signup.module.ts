import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SignUpRoutingModule } from "./signup-routing.routing";
import { SignUpComponent } from "./signup.component";

@NgModule({
    declarations: [SignUpComponent],
    imports: [CommonModule, FormsModule, SignUpRoutingModule],
    providers: [],
    entryComponents: []
})
export class SignUpModule {}
