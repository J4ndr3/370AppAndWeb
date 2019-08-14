import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.sass']
})
export class StatusReportComponent implements OnInit {
  Assets:object;
  Count=0;
  AssetCount:Array<object>;

  Rangers:object;
  Count1=0;
  RangerCount:Array<object>;

  Vehicles:object;
  Count2=0;
  VehicleCount:Array<object>;
  constructor(private data: ERPService) { }

  ngOnInit() {
    this.data.GetAssets().subscribe(res=>{
      this.AssetCount = JSON.parse(JSON.stringify(res));
      console.log(res);
      this.AssetCount.forEach(marker => {
          this.Count++;
          console.log(this.AssetCount)
          this.Assets = res;
      
    });
  });
  this.data.GetRanger().subscribe(res=>{
    this.RangerCount = JSON.parse(JSON.stringify(res));
    console.log(res);
    this.RangerCount.forEach(marker => {
        this.Count1++;
        console.log(this.RangerCount)
        this.Rangers = res;
    
  });
});
this.data.GetRangerVehicle().subscribe(res=>{
  this.VehicleCount = JSON.parse(JSON.stringify(res));
  console.log(res);
  this.VehicleCount.forEach(marker => {
      this.Count2++;
      console.log(this.VehicleCount)
      this.Vehicles = res;
  
});
});
  }

}
