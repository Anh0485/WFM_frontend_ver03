import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WScheduleService } from '../../services/workschedule.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from '../../services/channel.service';
import { ShiftService } from 'src/app/services/shift.service';
import { forkJoin, timeout } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript/lib/tsserverlibrary';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-workschedule',
  templateUrl: './workschedule.component.html',
  styleUrl: './workschedule.component.scss'
})
export class WorkscheduleComponent implements OnInit {

  employees!: any[];
  agents!: any[];
  channels!: any[];
  shifts!: any[];
  schedules!: any[];
  selectedRows: any[] = [];
  isScheduled: number = 0;
  observables: any[] = [];
  editWSchedule: any = {};
  editEmployee: any[] = [];
  createForm!: FormGroup;
  editForm!: FormGroup;
  private modalService = inject(NgbModal)
  constructor(
    private wscheduleServive: WScheduleService,
    private empService : EmployeeService,
    private channelService : ChannelService,
    private shiftService : ShiftService,
    private userService : UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
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
      WorkDate: ['20-05-2024', Validators.required],
      isScheduled: ['', Validators.required],
      ChannelID:['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getAllSchedule();
    // this.getAllEmployee();
    this.getAllChannel();
    this.getAllShift();
    this.getAllAgent();
  }

  getAllEmployee(){
    this.empService.getEmployeeList().subscribe({
      next:(res)=>{
        this.employees = res;
        console.log('employees', this.employees);
      }
    })
  }

  getAllAgent(){
    this.empService.getAgent().subscribe({
      next:(res)=>{
        this.agents = res.agent;
        console.log('agent', this.agents);
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

  


   convertDateFormat(dateStr:any) {
    if (typeof dateStr !== 'string' || !/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      throw new Error('Invalid date format. Please use "mm-dd-yyyy".');
    }
    const parts = dateStr.split('-');

    const newDateStr = `${parts[2]}-${parts[0]}-${parts[1]}`;

    return newDateStr;
  }


  openEdit(content: TemplateRef<any>, schedule:any){
    this.modalService.open(content, {modalDialogClass:'light-modal'});
    this.editWSchedule = {...schedule}
    this.editEmployee = [{...schedule}]
    this.selectedRows = [this.editWSchedule.ShiftTypeID];
    const formatDate = this.convertDateFormat(this.editWSchedule.workdate)
    this.editForm.setValue({
      EmployeeID: this.editWSchedule.EmployeeID,
      ShiftTypeID : this.editWSchedule.ShiftTypeID,
      WorkDate: formatDate,
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
    console.log('edit', this.editForm.value);
    console.log('selected row', this.selectedRows);
    console.log('editWSchedule', this.editWSchedule);
    const shiftTypeID = this.selectedRows.filter(item=> item.ShiftTypeID).map(item =>{
      return {
        ShiftTypeID: item.ShiftTypeID
      }
    })
    console.log('shiftTypeID', shiftTypeID);
    const data = {
      ShiftTypeID: shiftTypeID[0].ShiftTypeID || this.editForm.value.ShiftTypeID,
      WorkDate: this.editForm.value.WorkDate,
      isScheduled: this.editForm.value.isScheduled
    }
    this.wscheduleServive.updatedWSchedule(this.editWSchedule.ScheduleID,data).subscribe({
      next : (item) => {
        this.showSuccess(item.message);
        this.getAllSchedule();
      }
    })
  }

  onSubmitCreate(){
    console.log('value', this.createForm.value);
    console.log('selectedRow', this.selectedRows);
    const employeeList = this.selectedRows.filter(item=> item.EmployeeID).map(item=>{
      return {
        EmployeeID: item.EmployeeID,
        FullName: item.FullName
      }
    })
    const shiftTypeList = this.selectedRows.filter(item => item.ShiftTypeID).map(item => {
      return { 
          ShiftTypeID: item.ShiftTypeID,
          ShiftTypeName: item.ShiftTypeName 
      };
  });
    this.observables = [];

    employeeList.forEach(employee => {
      shiftTypeList.forEach(shiftType => {
        const formValue = {
              EmployeeID: employee.EmployeeID,
              ShiftTypeID: shiftType.ShiftTypeID,
              WorkDate: this.createForm.value.WorkDate,
              ChannelID: this.createForm.value.ChannelID,
              isScheduled: this.createForm.value.isScheduled,
            };
           const observable = this.wscheduleServive.createdWShedule(formValue);
          this.observables.push(observable);
      })
    })
    forkJoin(this.observables).subscribe(
      () => {
          alert('Created shifts successfully');
          this.getAllSchedule();
          // window.location.reload();
      },
      error => {
          console.error(error);
      }
  )
   

  }

  showSuccess(mess:string){
    this.toastr.success(`${mess}`, 'Success',{
      timeOut: 3000,
    });
  }

}
