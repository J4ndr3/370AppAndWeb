import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-ranger',
  templateUrl: './view-ranger.component.html',
  styleUrls: ['./view-ranger.component.sass']
})
export class ViewRangerComponent implements OnInit {
  Ranger: object;
  GenderOptions: Array<object>;
  MedicalOptions: Array<object>;
  OrganisationOptions: Array<object>;
  UserRoleOptions: Array<object>;


  constructor(private data: ERPService, private router: Router) { }

  ngOnInit() {
    this.data.GetRangers(this.data.nID).subscribe(res => {
      this.Ranger = res;
      this.data.GetGender().subscribe(res => {
        this.GenderOptions = JSON.parse(JSON.stringify(res));
        console.log(this.GenderOptions)
        this.GenderOptions.forEach(element => {
          if (this.Ranger["genderID"] ==element["ID"])
          {
            this.Ranger["genderID"] = element["Descriprion"];
            console.log(element["Descriprion"]);
          }
        });
        
      })
      this.data.GetMedicalAid().subscribe(res => {
        this.MedicalOptions = JSON.parse(JSON.stringify(res));
        console.log(this.MedicalOptions)
        this.MedicalOptions.forEach(element => {
          if (this.Ranger["Medical_Aid_ID"] ==element["ID"])
          {
            this.Ranger["Medical_Aid_ID"] = element["Descriprion"];
          }
        });
      })
      this.data.GetOrganisation().subscribe(res => {
        this.OrganisationOptions = JSON.parse(JSON.stringify(res));
        this.OrganisationOptions.forEach(element => {
          if (this.Ranger["Organisation_ID"] ==element["ID"])
          {
            this.Ranger["Organisation_ID"] = element["Descriprion"];
          }
        });
      })
      this.data.GetUserRole().subscribe(res => {
        this.UserRoleOptions = JSON.parse(JSON.stringify(res));
        this.UserRoleOptions.forEach(element => {
          if (this.Ranger["User_Role_ID"] ==element["ID"])
          {
            this.Ranger["User_Role_ID"] = element["Description"];
          }
        });
      })
    })
  }
  open(ID) {
    this.data.nID = ID;
    this.router.navigateByUrl("/view-ranger");
  }
  close(){
    this.router.navigateByUrl("/rangers");
  }
}
