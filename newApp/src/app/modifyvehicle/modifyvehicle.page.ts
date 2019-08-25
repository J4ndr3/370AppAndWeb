import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-modifyvehicle',
    templateUrl: './modifyvehicle.page.html',
    styleUrls: ['./modifyvehicle.page.scss'],
})
export class modifyVehiclePage implements OnInit {
    Vehicle: any;
    EditForm: FormGroup;
    YourSelection: number = 0; //if you have a select list
    ModelSelection: number = 0;
    TypeSelection: number = 0;
    ModelOptions: Array<object>;
    Models: Array<object>;
    TypeOptions: Array<object>; //if you have a select list
    nVehicle: object;
    rcv: object;


    constructor(private alertCtrl: AlertController, public toastController: ToastController,
        private router: Router, private data: ERPService,
        private formBuilder: FormBuilder) {

    }



    ngOnInit() {
        this.data.GetModels().subscribe((res) => {
            this.ModelOptions = JSON.parse(JSON.stringify(res));
        });
        this.data.GetVehicle_types().subscribe((res) => {
            this.TypeOptions = JSON.parse(JSON.stringify(res));
        });
        this.EditForm = this.formBuilder.group({
            ID: [],
            Model: [],
            CarRegistration: [],
            Colour: [],
            TypeDescription: [],
            Status: [],
        });
        this.edt();

    }
    edit(ID) {
        this.data.GetVehicle(ID).subscribe(res => {
            if (res == 1) {
                alert("Not found");
                this.router.navigateByUrl("/vehicles");
            }
            else {
                this.router.navigateByUrl("/modifyvehicle");
                this.data.nID = ID;
                this.ngOnInit();

            }
        })
    }
    edt() {
        this.data.GetVehicle(this.data.nID).subscribe(res => {
            this.Vehicle = res;
            this.EditForm.setValue({
                ID: this.Vehicle.Vehicle_ID,
                Model: this.Vehicle.Model_ID,
                CarRegistration: this.Vehicle.Registration,
                Colour: this.Vehicle.Colour,
                TypeDescription: this.Vehicle.Vehicle_Type_ID,
                Status: this.Vehicle.Status,
            })
        })
    }
    update() {
        var Model = this.EditForm.get('Model').value;
        var CarRegistration = this.EditForm.get('CarRegistration').value;
        var Colour = this.EditForm.get('Colour').value;
        var TypeDescription = this.EditForm.get('TypeDescription').value;
        var Status = this.EditForm.get('Status').value;
        var ID = this.EditForm.get('ID').value;

        if (Model == null || CarRegistration == null || Colour == null || TypeDescription == null|| Status == null) {
            this.Input();
        }
        else {
            this.nVehicle = {
                "Vehicle_ID": ID,
                "Model_ID": Model,
                "Registration": CarRegistration,
                "Colour": Colour,
                "Status": Status,
                "Vehicle_Type_ID": TypeDescription,
            };
            console.log(this.nVehicle);
            this.data.PutVehicle(ID, this.nVehicle).subscribe(res => {
                this.rcv = res
                console.log(this.rcv);
                if (this.rcv == null) {
                    this.successToast();
                    this.router.navigateByUrl("/vehicles");
                }
                else {
                    this.failedToast();
                }
            });
        }
    }



    private async successToast() {
        const toast = await this.toastController.create({ message: "Vehicle modified successfully.", duration: 3000 });
        toast.present();
    }
    private async failedToast() {
        const toast = await this.toastController.create({ message: "Vehicle could not be modified.", duration: 3000 });
        toast.present();
    }
    private async Input() {
        const toast = await this.toastController.create({ message: "Input provided is incorrrect", duration: 3000 });
        toast.present();
    }
    private async modifyyesorno() {
        const alert = await this.alertCtrl.create({
            header: "Warning",
            message: 'Are you sure you want to modify this record?',
            buttons: ['Cancel', 'OK']
        });
        alert.present();
    }
}
