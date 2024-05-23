import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsComponent, ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../../views/widgets/widgets.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule,  NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsComponent } from './charts.component';
@NgModule({
  imports: [
    ChartjsComponent,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    ChartsComponent
  ],
  declarations: [ChartsComponent]
})
export class ChartModule {
}
