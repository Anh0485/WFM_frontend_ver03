import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { BackendResponse } from 'src/app/model/getModule';
import { TenantService } from '../../services/tenants.service';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employees!: any[];
  roles!: any[];
  tenants!: any[];
  editEmployees: any = {};
  filteredEmployees: any[] = [];
  permissionResponse!: BackendResponse;
  access!: {
    canAdd: boolean;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
  };

  searchTerm: string = '';

  createForm!: FormGroup;
  editForm!: FormGroup;

  private modalService = inject(NgbModal);

  constructor(
    private employeeService: EmployeeService,
    private tenantService: TenantService,
    private fb: FormBuilder
  ) {
    (this.createForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Birthday: ['', Validators.required],
      Email: ['', Validators.required],
      Gender: ['', Validators.required],
      Address: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      RoleID: ['', Validators.required],
      TenantID: ['', Validators.required],
    })),
      (this.editForm = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Birthday: ['', Validators.required],
        Email: ['', Validators.required],
        Gender: ['', Validators.required],
        Address: ['', Validators.required],
        PhoneNumber: ['', Validators.required],
      }));
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getAllRole();
    this.getAllTenant();
  }

  openModalDialogCustomClass(content: TemplateRef<any>) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  openEdit(content: TemplateRef<any>, employee: any) {
    this.editEmployees = { ...employee };
    console.log('edit:', this.editEmployees);
    this.editForm.setValue({
      FirstName: this.editEmployees.FirstName,
      LastName: this.editEmployees.LastName,
      Birthday: this.editEmployees.Birthday,
      Email: this.editEmployees.Email,
      Gender: this.editEmployees.Gender,
      Address: this.editEmployees.Address,
      PhoneNumber: this.editEmployees.PhoneNumber,
    });
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  onSubmitCreate() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      this.employeeService.addEmployee(this.createForm.value).subscribe({
        next: (val: any) => {
          alert('create employee successfully');
          window.location.reload();
        },
      });
    }
  }

  onSubmitEdit() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.employeeService.updateEmployee(this.editEmployees.EmployeeID,this.editForm.value).subscribe({
        next: (val: any) => {
          alert('update employee successfully');
          window.location.reload();
        },
      });
    }
  }

  checkAccess(moduleName: string): {
    canAdd: boolean;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canExport: boolean;
  } {
    const module = this.permissionResponse?.modules.find(
      (m) => m.ModuleName === moduleName
    );

    return {
      canAdd: !!module && module.CanAdd === 1,
      canView: !!module && module.CanView === 1,
      canEdit: !!module && module.CanEdit === 1,
      canDelete: !!module && module.CanDelete === 1,
      canExport: !!module && module.CanExport === 1,
    };
  }

  getPermissionSub() {
    this.employeeService.getModulePermission().subscribe(
      (data: BackendResponse) => {
        this.permissionResponse = data;

        this.access = this.checkAccess('Employee');
      },
      (error) => {
        console.error('Error fetching module permissions', error);
      }
    );
  }

  getEmployees() {
    this.employeeService.getEmployeeList().subscribe((item) => {
      this.employees = item;
      console.log('employee', this.employees);
      this.filteredEmployees = item;
    });
  }

  getAllRole() {
    this.employeeService.getAllRole().subscribe(
      (item) => {
        console.log('item', item);
        this.roles = item;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getAllTenant() {
    this.tenantService.getAllTenant().subscribe((item) => {
      this.tenants = item.getTenants[0];
    });
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('delete employee successfulyy');
        this.getEmployees();
      },error: console.log
    })
  }
}
