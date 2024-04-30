import { Component, OnInit, inject, Type, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from 'src/app/services/tenants.service';
@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './tenant.component.scss'
})
export class TenantComponent implements OnInit {

  tenants !: any[];
  createForm!: FormGroup;
  editForm!: FormGroup;
  editTenants : any = {};
  private modalService = inject(NgbModal);

  constructor(private fb: FormBuilder,
    private tenantService : TenantService){
    this.createForm = this.fb.group({
      TenantName: ['', Validators.required],
      SubscriptionDetails: ['', Validators.required]
    }),
    this.editForm = this.fb.group({
      TenantName: ['', Validators.required],
      SubscriptionDetails: ['', Validators.required]

    })
  }

  ngOnInit(): void {
      this.getAllTenant()
  }

  getAllTenant(){
    this.tenantService.getAllTenant().subscribe((item)=>{
      this.tenants = item.getTenants[0];
    })
  }

  deleteTenant(id: number){
    this.tenantService.deleteTenant(id).subscribe({
      next:(res) =>{
        alert('delete tenant successfully');
        this.getAllTenant();
      }, error: console.log
    })
  }

  openModalDialogCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { modalDialogClass: 'light-modal' });
	}

  
  openEdit(content: TemplateRef<any>, tenant: any) {
    this.editTenants = { ...tenant };
    console.log('edit:', this.editTenants);

    this.editForm.setValue({
      TenantName: this.editTenants.TenantName,
      SubscriptionDetails: this.editTenants.SubscriptionDetails,
    });
    this.modalService.open(content, { modalDialogClass: 'light-modal' });
  }
  

  onSubmitCreate(){
    if(this.createForm.valid){
      this.tenantService.createdTenant(this.createForm.value).subscribe({
        next:(val:any)=>{
          alert('create tenant successfully');
          this.getAllTenant();
        }
      })
    }
  }

  onSubmitEdit(){
    if(this.editForm.valid){
      this.tenantService.updateTenant(this.editTenants.TenantID, this.editForm.value).subscribe({
        next:(val: any) =>{
          alert('update tenant successfully');
          this.getAllTenant();
        }
      })
    }
  }


}
