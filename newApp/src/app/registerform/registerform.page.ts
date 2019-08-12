import { Component, OnInit,Renderer2, ViewChild,ElementRef } from '@angular/core';
import {ERPService} from '..//erp.service';
import { FormBuilder,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.page.html',
  styleUrls: ['./registerform.page.scss'],
})
export class RegisterformPage implements OnInit {
  @ViewChild('regform') containerEltRef: ElementRef;

  RegisterformPages:object;
  AddForm: FormGroup;
    NewRegisterformPage:object;
    RegisterformPageSelection:number=0;
    RegisterformPageOptions:Array<object>;
    RegisterformPageOptionS:Array<object>;

  constructor(private renderer: Renderer2, private data: ERPService, private formBuilder: FormBuilder) { }
  currentTab = 0;
  

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
        fname: [""], // Names for your input
          lname: [""], // Names for your input 
          rangerId: [""],
          email: [""],
          phone:[""],
          emergencycontactName:[""],
          EmergencycontactNumber:[""],
          MedicalAid:[""],
          Organizationtitle:[""],
          username:[""],
          password:[""],
          confirmpassword:[""],
          selectgender:[""],
          selectbloodtype:[""]
        });
    this.data.GetRegisterFormPage().subscribe(res=>{
      this.RegisterformPages = res;
    });
  }

  ngAfterViewInit()
  {
    // let elt = this.containerEltRef.nativeElement.querySelector('.tab');
    // this.renderer.addClass(elt, 'newClass'); //Adds new class to element
     // Current tab is set to be the first tab (0)
        this.showTab(this.currentTab); // Display the current tab  
  }
   showTab(n) {
            // This function will display the specified tab of the form...
            var x = document.getElementsByClassName("tab");
            console.log(x.length);
            (x[n] as HTMLElement).style.display = "block";
            //... and fix the Previous/Next buttons:
            if (n == 0) {
                document.getElementById("prevBtn").style.display = "none";
                document.getElementById("Steps2").style.marginTop = "75%";
            } else {
                document.getElementById("prevBtn").style.display = "inline";
            }
            if (n == 3) {
                document.getElementById("Steps2").style.marginTop = "62%";
            } 
            if(n ==1){
                document.getElementById("Steps2").style.marginTop = "37%";
            }
            if(n ==2){
                document.getElementById("Steps2").style.marginTop = "47%";
            }
            if (n == (x.length - 1)) {
                document.getElementById("nextBtn").innerHTML = "Submit";
            } else {
                document.getElementById("nextBtn").innerHTML = "Next";
            }
            //... and run a function that will display the correct step indicator:
            this.fixStepIndicator(n)
        }

nextPrev(n) {
            // This function will figure out which tab to display
            var x = document.getElementsByClassName("tab");
            // Exit the function if any field in the current tab is invalid:
            if (n == 1 && !this.validateForm()) return false;
            // Hide the current tab:
            (x[this.currentTab]as HTMLElement).style.display = "none";
            // Increase or decrease the current tab by 1:
            this.currentTab = this.currentTab + n;
            // if you have reached the end of the form...
            if (this.currentTab >= x.length) {
                // ... the form gets submitted:
                this.addRegisterformPage();
                return false;
            }
            // Otherwise, display the correct tab:
            this.showTab(this.currentTab);
        }

validateForm() {
            // This function deals with validation of the form fields
            var x, y, i, valid = true;
            x = document.getElementsByClassName("tab");
            y = x[this.currentTab].getElementsByTagName("input");
            // A loop that checks every input field in the current tab:
            for (i = 0; i < y.length; i++) {
                // If a field is empty...
                if (y[i].value == "") {
                    // add an "invalid" class to the field:
                    y[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;
                }
            }
            // If the valid status is true, mark the step as finished and valid:
            if (valid) {
                document.getElementsByClassName("step")[this.currentTab].className += " finish";
            }
            return valid; // return the valid status
        }

 fixStepIndicator(n) {
            // This function removes the "active" class of all steps...
            var i, x = document.getElementsByClassName("step");
            for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
            }
            //... and adds the "active" class on the current step:
            x[n].className += " active";
        }

        addRegisterformBtn() {
           
        
            /* if there is a select/ dropdown use the following method to populate data for it */
    this.data.GetRegisterFormPage().subscribe((res) => {
        this.RegisterformPageOptions = JSON.parse(JSON.stringify(res));
      }); 
    
     /* if there is a select/ dropdown use the following method to populate data for it */
     this.data.GetRegisterFormPage().subscribe((res) => {
        this.RegisterformPageOptionS = JSON.parse(JSON.stringify(res));
      }); 
    }
  

    addRegisterformPage() {
        var fname = this.AddForm.get('fname').value; // Names for your input
        var lname = this.AddForm.get('lname').value; // Names for your input
        var rangerId = this.AddForm.get('rangerId').value;
        var email = this.AddForm.get('email').value; // Names for your input
        var emergencycontactName = this.AddForm.get('emergencycontactName').value; // Names for your input
        var EmergencycontactNumber = this.AddForm.get('EmergencycontactNumber').value;
        var MedicalAid = this.AddForm.get('MedicalAid').value;
        var username = this.AddForm.get('username').value;
        var password = this.AddForm.get('password').value;
        var confirmpassword = this.AddForm.get('confirmpassword').value;
        var selectgender = this.AddForm.get('selectgender').value;
        var selectbloodtype = this.AddForm.get('selectbloodtype').value;
        var Organizationtitle = this.AddForm.get('Organizationtitle').value;
    
        if ((fname||lname||rangerId||email||emergencycontactName||EmergencycontactNumber||MedicalAid||username||password||confirmpassword||selectgender||selectbloodtype)=="") {
          //Modal popup
        }
        else {
          this.NewRegisterformPage = {
            "Name": fname, // Names for your input
            "Surname": lname, // Names for your input
            "RangerID": rangerId,
            "Email": email,
            "EmergencyContactName": emergencycontactName,
            "EmergencyContactNumber": EmergencycontactNumber,
            "MedicalAid": MedicalAid,
            "Username": username,
            "Password": password,
            "ConfirmPassword": confirmpassword,
            "SelectGender": selectgender,
            "SelectBloodtype": selectbloodtype,  
            "Organizationtitle":Organizationtitle,
          };
          this.data.PostRanger(this.NewRegisterformPage).subscribe(res => {
            this.ngOnInit()
          });}}
    
        
}
