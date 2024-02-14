import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShiftService } from '../../services/shift.service';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.scss',
})
export class ShiftComponent implements OnInit {
  shifts !: any[];
  editShift: any = {}
  createForm!: FormGroup;
  editForm!: FormGroup;
  time = { hour: 13, minute: 30 };
  private modalService = inject(NgbModal);

  constructor(private fb: FormBuilder, private shiftService: ShiftService) {
    this.createForm = this.fb.group({
      ShiftTypeName: ['', Validators.required],
      ShiftStart: ['', Validators.required],
      ShiftEnd: ['', Validators.required],
    }),
    this.editForm = this.fb.group({
      ShiftTypeName: ['', Validators.required],
      ShiftStart: ['', Validators.required],
      ShiftEnd: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getAllShift();
  }

  getAllShift(){
    this.shiftService.getAllShift().subscribe((item)=>{
      this.shifts = item.allShift;
    })
  }

  openModalDialogCustomClass(content: TemplateRef<any>) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  onSubmitCreate() {
    if (this.createForm.valid) {
      this.shiftService.createdShift(this.createForm.value).subscribe({
        next:(val:any)=>{
          alert('create shift');
        }
      })
    }
  }
  openEdit(content: TemplateRef<any>, shift: any){
    console.log('shift', shift)
    this.modalService.open(content, {modalDialogClass:'light-modal'});
    this.editShift = { ...shift };
    this.editForm.setValue({
      ShiftTypeName: this.editShift.ShiftTypeName,
      ShiftStart: this.editShift.ShiftStart,
      ShiftEnd: this.editShift.ShiftEnd,
    })
  }

  onSubmitEdit(){
    if(this.editForm.valid){
      this.shiftService.updateShift(this.editShift.ShiftTypeID, this.editForm.value).subscribe({
        next:(val: any) =>{
          alert('update shift successfully');
          this.getAllShift();
        }
      })
    }
  }

  deleteShift(id:number){
    this.shiftService.deleteShift(id).subscribe({
      next:(res)=>{
        alert('delete shift successfully');
        this.getAllShift();
      }
    })
  }
}
