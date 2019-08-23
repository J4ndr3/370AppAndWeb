import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          
import { networkInterfaces } from 'os';


@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.sass']
})
export class UserroleComponent implements OnInit {
Level: object;
AddForm: FormGroup;
AddFormA:FormGroup
NewLevel:object;
LevelSelection:number =0;


  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.AddFormA =  this.formBuilder.group({
      Web: ["Web Access..."],
      Report: ["Report Access..."],
      Write: ["Write Access..."],
      App: ["App Access..."]
    })
    this.data.GetAccess_Levels().subscribe(res=>{
      this.Level = res;
      if (this.Level[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Level = null ;
      }
      console.log(this.Level);
    });
  }
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
  add(){
    if (this.AddFormA.get('Web').value == "True"){
      var Web  = 1;
  }
  else if (this.AddFormA.get('Web').value == "False")
  {
    var Web  = 0;
  }
  if (this.AddFormA.get('Report').value == "True"){
    var Report = 1;
}
else if (this.AddFormA.get('Report').value == "False")
{
  var Report = 0;
}
if (this.AddFormA.get('Write').value == "True"){
  var Write = 1;
}
else if (this.AddFormA.get('Write').value == "False")
{
  var Write  = 0;
}
if (this.AddFormA.get('App').value == "True"){
  var App = 1;
}
else if (this.AddFormA.get('App').value == "False")
{
  var App = 0;
}
    if (Web == null || Report == null || Write == null || App==null)
    {
      console.log(Web,Report,Write,App)
      document.getElementById("inputErr").click();
    }
    else{
      this.NewLevel = {
        "Web": Web,
        "Report": Report,
        "Write": Write,
        "App": App
      };
    }
    this.data.PostAccess_Level(this.NewLevel).subscribe(res=>{
      this.ngOnInit()
    })
  }
}
