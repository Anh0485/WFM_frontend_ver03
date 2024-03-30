import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { BackendResponse } from 'src/app/model/getModule';
import { TenantService } from '../../services/tenants.service';
import { FormGroup, FormBuilder, Validators, NgModel, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { navItems } from '../../containers/default-layout/_nav';
import { UserService } from 'src/app/services/user.service';


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
  isSuperAdmin: boolean = false;
  show = true;
  roleName!:string;
  permissionResponse!: BackendResponse;
  access!: {
    canAdd: boolean;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
  };
  tenantID  = new FormControl();
  user: any;
  searchTerm: string = '';
  message: string = '';
  createForm!: FormGroup;
  editForm!: FormGroup;

  private modalService = inject(NgbModal);

  constructor(
    private employeeService: EmployeeService,
    private tenantService: TenantService,
    private fb: FormBuilder,
    private userService : UserService,
    private toastr: ToastrService
  ) {
    (this.createForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Birthday: ['', Validators.required],
      Email: ['', Validators.required],
      Gender: ['', Validators.required],
      address: ['', Validators.required],
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
        address: ['', Validators.required],
        PhoneNumber: ['', Validators.required],
      }));
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getAllRole();
    this.getAllTenant();
    this.getTenantID();
    this.getUser();
  }

  openModalDialogCustomClass(content: TemplateRef<any>) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  openEdit(content: TemplateRef<any>, employee: any) {
    this.editEmployees = { ...employee };
    console.log('editEmployee', this.editEmployees)
    this.editForm.setValue({
      FirstName: this.editEmployees.FirstName,
      LastName: this.editEmployees.LastName,
      Birthday: this.editEmployees.Birthday,
      Email: this.editEmployees.Email,
      Gender: this.editEmployees.Gender,
      address: this.editEmployees.address,
      PhoneNumber: this.editEmployees.PhoneNumber,
    });
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  onSubmitCreate() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      this.employeeService.addEmployee(this.createForm.value).subscribe({
        next: (item) => {
          this.message = item.message;
          this.toastr.success('create employee successfully', 'Success', {
            timeOut: 3000,})
          this.getEmployees();
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

  getTenantID(){
    this.tenantService.getTenantID().subscribe({
      next: (item) => {
        console.log('item',item.TenantID[0].TenantID);
        this.tenantID = item.TenantID[0].TenantID;
        console.log('iid', this.tenantID);
        console.log('idd', item.TenantID[0]);
        (item.TenantID[0].TenantID === null) ? this.createForm.patchValue({TenantID : ''}) : this.createForm.patchValue({TenantID : item.TenantID[0].TenantID}) 
      }
    })
  } 

  getEmployees() {
    this.employeeService.getEmployeeList().subscribe((item) => {
      this.employees = item;
      console.log('employee', this.employees);
      // this.filteredEmployees = item;
    });
  }

  getAllRole() {
    this.employeeService.getAllRole().subscribe(
      (item) => {
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
        this.toastr.success('delete employee successfully', 'Success', {
          timeOut: 3000,
        });
        this.getEmployees();
      },error: console.log
    })
  }


  showSuccess(){
    this.toastr.success('create employee successfully', 'Success', {
    timeOut: 3000,
  });
  }

  showDeleteSuccess(){
    console.log('click')
    this.toastr.success('delete employee successfully', 'Success', {
      timeOut: 3000,
    });
  }

  getUser(){
    this.userService.getUserProfile().subscribe({
      next:(item) => {
        console.log('user', item.user[0]);
         this.roleName = item.user[0].RoleName;
      }
    })
  }

  isUserSuperAdmin(): boolean{
    if(this.roleName == "SuperAdmin"){
      this.isSuperAdmin = true
    }
    return this.isSuperAdmin
  }
 


 

}



