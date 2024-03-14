import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WScheduleService } from '../../services/workschedule.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from '../../services/channel.service';
import { ShiftService } from 'src/app/services/shift.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-workschedule',
  templateUrl: './workschedule.component.html',
  styleUrl: './workschedule.component.scss'
})
export class WorkscheduleComponent implements OnInit {

  employees!: any[];
  channels!: any[];
  shifts!: any[];
  schedules!: any[];
  selectedRows: any[] = [];
  isScheduled: number = 0;
  observables: any[] = [];
  editWSchedule: any = {};
  createForm!: FormGroup;
  editForm!: FormGroup;
  private modalService = inject(NgbModal)
  constructor(
    private wscheduleServive: WScheduleService,
    private empService : EmployeeService,
    private channelService : ChannelService,
    private shiftService : ShiftService,
    private fb: FormBuilder
  ){
    const today = new Date();

    const formatttedDate = today.toISOString().substring(0,10);

    this.createForm = this.fb.group({
      EmployeeID: ['36', Validators.required],
      ShiftTypeID : ['', Validators.required],
      WorkDate: [formatttedDate, Validators.required],
      isScheduled: 0,
      ChannelID:['5', Validators.required],
      selectedShiftTypeID: [null]
    }),
    this.editForm = this.fb.group({
      EmployeeID: ['', Validators.required],
      ShiftTypeID : ['', Validators.required],
      WorkDate: ['', Validators.required],
      isScheduled: ['', Validators.required],
      ChannelID:['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getAllSchedule();
    this.getAllEmployee();
    this.getAllChannel();
    this.getAllShift();
  }

  getAllEmployee(){
    this.empService.getEmployeeList().subscribe({
      next:(res)=>{
        this.employees = res;
        console.log('employees', this.employees);
      }
    })
  }

  getAllChannel(){
    this.channelService.getAllChannel().subscribe({
      next:(res)=>{
        this.channels = res;
      }
    })
  }

  getAllSchedule(){
    this.wscheduleServive.getAllWSchedule().subscribe(item=>{
      this.schedules = item.allWSchedule;
    })
  }

  getAllShift(){
    this.shiftService.getAllShift().subscribe({
      next:(res) =>{
        this.shifts = res.allShift;
        console.log('shifts', this.shifts)
      }
    })
  }

  isSelected(row: any):boolean {
    return this.selectedRows.includes(row);
  }

  isSelectedEdit(id:number):boolean {
    return this.selectedRows.includes(id);
  }
  
  toggleSelection(event: any, row: any):void{
    if(event.target.checked){
      this.selectedRows.push(row)
    }else{
      const index = this.selectedRows.indexOf(row);
      if(index >=0){
        this.selectedRows.splice(index,1);
      }
    }
  }

  toggleScheduled(event: any): void {
    this.isScheduled = event.checked ? 1 : 0; 
  }

  openModalDialogCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { modalDialogClass: 'light-modal' });
	}


  

  openEdit(content: TemplateRef<any>, schedule:any){
    this.modalService.open(content, {modalDialogClass:'light-modal'});
    this.editWSchedule = {...schedule}
    this.selectedRows = [this.editWSchedule.ShiftTypeID];
    
    this.editForm.setValue({
      EmployeeID: this.editWSchedule.EmployeeID,
      ShiftTypeID : this.editWSchedule.ShiftTypeID,
      WorkDate: this.editWSchedule.workdate,
      isScheduled: this.editWSchedule.isScheduled,
      ChannelID: this.editWSchedule.ChannelID,
    })
  }

  deleteSchedule(id: number){
    this.wscheduleServive.deleteWSchedule(id).subscribe({
      next:(val:any)=>{
        alert('delete work schedule successfully');
        this.getAllSchedule();
      }
    })
  }

  onSubmitEdit(){

  }

  onSubmitCreate(){
    console.log('value', this.createForm.value);
    const shiftTypeIDArray = this.selectedRows.map((item)=> item.ShiftTypeID);
    for (let i = 0; i < shiftTypeIDArray.length; i++) {
      const shiftTypeIDValue = shiftTypeIDArray[i];
      const formValue = {
        EmployeeID: this.createForm.value.EmployeeID,
        ShiftTypeID: shiftTypeIDValue,
        WorkDate: this.createForm.value.WorkDate,
        ChannelID: this.createForm.value.ChannelID,
        isScheduled: this.createForm.value.isScheduled,
      };
      const observable = this.wscheduleServive.createdWShedule(formValue);
      this.observables.push(observable);
    }
    forkJoin(this.observables).subscribe(
      () => {
        alert('created shift successfully');
        // this.getAllSchedule();
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    )

  }

}
