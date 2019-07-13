import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rangerpatrol',
  templateUrl: './rangerpatrol.page.html',
  styleUrls: ['./rangerpatrol.page.scss'],
})
export class RangerpatrolPage implements OnInit {
@ViewChild('patrolform')containerEltRef:ElementRef;
  constructor(private renderer:Renderer2) { }
currentTab =0;
  ngOnInit() {

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
                document.getElementById("nextBtn").innerHTML = "Check in";
                document.getElementById("Steps").style.marginTop = "85%";
            } else {
                document.getElementById("prevBtn").style.display = "inline";
            }
            
            if (n == 3) {
                document.getElementById("nextBtn").innerHTML = "Done";
                document.getElementById("Steps").style.marginTop = "10%";
                
            } 
            if(n ==1){
                document.getElementById("nextBtn").innerHTML = "Next";
                document.getElementById("Steps").style.marginTop = "10%";
            }
            if(n ==2){
                document.getElementById("prevBtn").style.display = "none";
                document.getElementById("nextBtn").innerHTML = "<ion-icon name='exit' size='Medium'></ion-icon>";
                document.getElementById("nextBtn").style.width = "40%";
               //document.getElementById("Steps").style.marginTop = "10%";
               document.getElementById("Steps").style.display="none";

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
                this.containerEltRef.nativeElement.Submit();
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

}
