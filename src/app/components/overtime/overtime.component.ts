import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OvertimeService } from '../../services/overtime.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrl: './overtime.component.scss',
})
export class OvertimeComponent implements OnInit {
  overtimes!: any[];
  editOvertime: any = {};
  formattedDate!: string | null;
  createForm!: FormGroup;
  editForm!: FormGroup;
  private modalService = inject(NgbModal);

  constructor(
    private fb: FormBuilder,
    private otService: OvertimeService,
    private datePipe: DatePipe
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
  }

  getAllOT() {
    this.otService.getAllOT().subscribe({
      next: (item) => {
        console.log('item', item.overtime);
        this.overtimes = item.overtime;
      },
    });
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

  deleteOT(id: number) {}

  onSubmitCreate() {}

  onSubmitEdit() {}
}
