import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
})
export class IncidentsPage implements OnInit {

  constructor(public toastController: ToastController, private camera: Camera) { }

  ngOnInit() {
  }

  private async presentToast() {
    const toast = await this.toastController.create({message:"Incident could not be reported.",duration:3000});
    toast.present();}

    OpenCamera(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
    }    
}

