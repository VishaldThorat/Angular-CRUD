import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AgePipe } from '../age.pipe';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel(); 
  employeeData !: any; 
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder,private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Avatar : ['', Validators.required],
      Name : ['', Validators.required],
      DOB : ['', Validators.required],
      Email : ['', Validators.required],
      Country : ['', Validators.required],
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.Avatar = this.formValue.value.Avatar;
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.DOB = this.formValue.value.DOB;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.Country = this.formValue.value.Country;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row: any){

    this.showAdd = false;
    this.showUpdate = true;

    this.formValue.controls['Avatar'].setValue(row.Avatar);
    this.employeeModelObj.id = row.id;
    this.formValue.controls['Name'].setValue(row.Name);
    this.formValue.controls['DOB'].setValue(row.DOB);
    this.formValue.controls['Email'].setValue(row.Email);
    this.formValue.controls['Country'].setValue(row.Country);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.Avatar = this.formValue.value.Avatar;
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.DOB = this.formValue.value.DOB;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.Country = this.formValue.value.Country;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
