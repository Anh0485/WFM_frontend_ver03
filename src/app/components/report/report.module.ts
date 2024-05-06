import { CommonModule, DecimalPipe, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';


// views

// Components Routing
import { ReportRoutingModule } from './report-routing.module';
import { WorkhoursComponent } from './workhours/workhours.component';
import { OvertimehoursComponent } from './overtimehours/overtimehours.component';
import { NumberoftenantComponent } from './numberoftenant/numberoftenant.component';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from 'src/app/directives/sortable.directive';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
    DecimalPipe,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbdSortableHeader
  ],
  declarations: [
   WorkhoursComponent,
  //  OvertimehoursComponent,
  //  NumberoftenantComponent
  ],
})
export class ReportModule {}
