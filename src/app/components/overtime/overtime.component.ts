import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OvertimeService } from '../../services/overtime.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrl: './overtime.component.scss',
})
export class OvertimeComponent implements OnInit {
  active = 1;
  overtimes!: any[];
  pendingOT!: any[];
  approvedOT!: any[];
  rejectedOT!: any[];
  editOvertime: any = {};
  formattedDate!: string | null;
  createForm!: FormGroup;
  editForm!: FormGroup;
  approved: string = 'Approved';
  reject: string = 'Reject';
  RoleName: string  = '';
  private modalService = inject(NgbModal);

  constructor(
    private fb: FormBuilder,
    private otService: OvertimeService,
    private datePipe: DatePipe,
    private userService: UserService
  ) {
    (this.createForm = this.fb.group({
      OvertimeDate: ['', Validators.required],
      OvertimeHour: ['', Validators.required],
      Reason: ['', Validators.required],
    })),
      (this.editForm = this.fb.group({
        OvertimeDate: ['', Validators.required],
        OvertimeHour: ['', Validators.required],
        Reason: ['', Validators.required],
      }));
  }
  ngOnInit(): void {
    this.getAllOT();
    this.getPendingOT();
    this.getApprovedOT();
    this.getRejectOT();
    this.getRoleName();
  }

  getAllOT() {
    this.otService.getAllOT().subscribe({
      next: (item) => {
        console.log('item', item.overtime);
        this.overtimes = item.overtime;
      },
    });
  }

  getPendingOT() {
    this.otService.getPendingOT().subscribe({
      next: (item) => {
        console.log('item', item.overtime);
        this.pendingOT = item.pending;
      },
    });
  }

  getApprovedOT() {
    this.otService.getApprovedOT().subscribe({
      next: (item) => {
        console.log('item', item.overtime);
        this.approvedOT = item.approved;
      },
    });
  }

  getRejectOT() {
    this.otService.getRejectOT().subscribe({
      next: (item) => {
        console.log('item', item);
        this.rejectedOT = item.reject;
      },
    });
  }

  getRoleName(){
    this.userService.getUserProfile().subscribe({
      next:(item) =>{
        this.RoleName = item.user[0].RoleName;
      }
    })
  }

  checkRole(): boolean{
    return this.RoleName === 'Supervisor' || this.RoleName ==='Admin' || this.RoleName === 'SuperAdmin'
  }



  onApprovedClick(id: any): void{
    this.otService.reviewOT(id, this.approved).subscribe({
      next: (val) => {
        alert('approved successfully')
        this.getPendingOT();
      }
    })
  }

  onRejectClick(id: any): void{
    this.otService.reviewOT(id, this.reject).subscribe({
      next: (val) => {
        alert('reject successfully')
        this.getPendingOT();
      }
    })
  }



  openModalDialogCustomClass(content: TemplateRef<any>) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  openEdit(content: TemplateRef<any>, overtime: any) {
    console.log('edit');
    this.editOvertime = { ...overtime };
    const parts = this.editOvertime.OvertimeDate.split('/');
    const date = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0])
    );
    this.formattedDate = this.datePipe.transform(date, 'yyyy-mm-dd');
    console.log('format', this.formattedDate)
    this.editForm.patchValue({
      OvertimeDate: this.formattedDate, 
      OvertimeHour: this.editOvertime.OvertimeHour,
      Reason: this.editOvertime.Reason,
    });
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  deleteOT(id: number) {
    this.otService.deleteOT(id).subscribe({
      next:(res)=>{
        alert('delete overtime successfully');
        this.getApprovedOT();
        this.getRejectOT();
      }
    })
  }

  onSubmitCreate() {
    console.log(this.createForm.value);
    this.otService.createdOT(this.createForm.value).subscribe({
      next: (val)=>{
        alert('create overtime successfully');
        this.getPendingOT();
      }
    })
  }

  onSubmitEdit() {}
}
