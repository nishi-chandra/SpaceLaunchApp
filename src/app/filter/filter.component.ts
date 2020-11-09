import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilterDataService } from '../filter-data.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private service: FilterDataService) { 
   
  }
  httpdata = [];
  data;
  successfullLand = [];
  filterYear = [];
  success = []
  developer_name = "";
  loading: boolean = false;
  limit = "100";
  launch_success: boolean;
  land_success: boolean;
  launch_year = null;
  apiURL = "";
  apiRoot: string = "https://api.spaceXdata.com/v3/launches";
  ngOnInit():void{


    this.launch_year = this.route.snapshot.queryParams.launch_year === undefined ? null : this.route.snapshot.queryParams.launch_year
    this.launch_success = this.route.snapshot.queryParams.launch_success === undefined ? null : this.route.snapshot.queryParams.launch_success;
    this.land_success = this.route.snapshot.queryParams.land_success === undefined ? null : this.route.snapshot.queryParams.land_success;
    this.limit = ((this.route.snapshot.queryParams.limit === null || this.route.snapshot.queryParams.limit === undefined) ? "100" : this.route.snapshot.queryParams.limit);

    
    this.filterYear = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
    this.success = ['true', 'false'];
    this.developer_name = "Nishi Chandra";

    this.getSpaceXDetails();
  }
  
 
  getSpaceXDetails() {
    //this.apiURL = `${this.apiRoot}?limit=${this.limit}`;
    if(this.launch_success === null && this.land_success === null && this.launch_year === null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}`
    }else if(this.launch_year !== null && this.limit !== null && (this.launch_success === null || this.land_success === null)){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_year=${this.launch_year}`
    }
    else if(this.launch_success !== null && this.land_success !== null && this.launch_year !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}&amp;land_success=${this.land_success}&amp;launch_year=${this.launch_year}`;
    }
    else if(this.launch_success !== null && this.land_success !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}&amp;land_success=${this.land_success}`;
    }
    else if(this.launch_success !== null && this.land_success === null && this.launch_year !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}&amp;launch_year=${this.launch_year}`;
    }else if(this.launch_success === null && this.land_success !== null && this.launch_year !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;land_success=${this.land_success}&amp;launch_year=${this.launch_year}`;
    }else if(this.launch_success === null && this.land_success !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;land_success=${this.land_success}&amp;launch_year=${this.launch_year}`;
    }else if(this.launch_success !== null && this.land_success === null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;land_success=${this.land_success}&amp;launch_year=${this.launch_year}`;
    }
    
    this.loading = true;

    this.service.getFilteredData(this.apiURL).subscribe(data => {
      this.data = data;

      this.displaydata(this.data);
    });



  }

  displaydata(data) {
    this.httpdata = [];
    
    if(this.launch_success !== null && this.land_success !== null && this.launch_year === null){
      this.httpdata = [];
      data.forEach(element => {
        if(element.launch_success !== null && element.rocket.first_stage.cores[0].land_success !== null){
          if(element.launch_success.toString() === this.launch_success && element.rocket.first_stage.cores[0].land_success.toString() === this.land_success){
            this.httpdata.push(element);
          }
        }
        
       
  
      });
    }else  if(this.launch_success !== null && this.land_success !== null && this.launch_year !== null){
      this.httpdata = [];
      data.forEach(element => {
        if(element.launch_success !== null && element.rocket.first_stage.cores[0].land_success !== null && this.launch_year !== null){
          if(element.launch_success.toString() === this.launch_success && 
          element.rocket.first_stage.cores[0].land_success.toString() === this.land_success 
          && element.launch_year === this.launch_year){
            this.httpdata.push(element);
          }
        }
        
       
  
      });
    }
    else if(this.launch_year !== null && this.launch_success == null && this.land_success == null){
      this.httpdata = [];
      data.forEach(element => {
        if(element.launch_year === this.launch_year){
          this.httpdata.push(element);
        }
        
  
      });
    } else if(this.launch_success !== null && this.land_success === null && this.launch_year !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}&amp;launch_year=${this.launch_year}`;
      this.httpdata = [];
      data.forEach(element => {
        if(element.launch_success !== null){
        if(element.launch_success.toString() === this.launch_success && element.launch_year === this.launch_year){
          this.httpdata.push(element);
        }
      }
    });
    }else if(this.launch_success === null && this.land_success !== null && this.launch_year !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;land_success=${this.land_success}&amp;launch_year=${this.launch_year}`;
      this.httpdata = [];
      data.forEach(element => {
        if(element.rocket.first_stage.cores[0].land_success !== null){
        if(element.rocket.first_stage.cores[0].land_success.toString() === this.land_success && element.launch_year === this.launch_year){
          this.httpdata.push(element);
        }
      }
    });
    }else if(this.launch_success === null && this.land_success !== null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;land_success=${this.land_success}&amp`;
      this.httpdata = [];
      data.forEach(element => {
        if(element.rocket.first_stage.cores[0].land_success !== null){
        if(element.rocket.first_stage.cores[0].land_success.toString() === this.land_success){
          this.httpdata.push(element);
        }
      }
    });
    }else if(this.launch_success !== null && this.land_success === null){
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;land_success=${this.land_success}&amp`;
      this.httpdata = [];
      data.forEach(element => {
        if(element.launch_success !== null){
        if(element.launch_success.toString() === this.launch_success ){
          this.httpdata.push(element);
        }
      }
    });
    }else{
      this.httpdata = [];
      data.forEach(element => {
        
        this.httpdata.push(element);
  
      });
    }
    
    
   

    
    this.loading = false;
  }

  filterOnYear(year) {
    this.httpdata = [];
    this.data = [];
    this.launch_year = year.toString();
    this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}&amp;land_success=${this.land_success}&amp;launch_year=${this.launch_year}`;
    this.loading = true;
    
    this.service.getFilteredData(this.apiURL).subscribe(retdata => {
      this.data = retdata;
      this.data.forEach(element => {
        if(element.launch_year === this.launch_year){
          this.httpdata.push(element);
         
        }
        
      });
      this.loading = false;
    })
   
   

  }

  filterLaunchSuccess(status) {
    this.httpdata = [];
    this.data = [];
    this.land_success = null;
    this.launch_year = null;
    
    this.apiURL = "";
    this.launch_success = status;
    
    //  if(status === "true"){
     
    //   this.launch_success = true
    //  }else if(status === "false"){
     
    //   this.launch_success = true
    //  }
      this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}`;
    
   
    this.loading = true;
   
    this.service.getFilteredData(this.apiURL).subscribe(retdata => {

      this.data = retdata;
      this.displaydata(this.data);
      // this.data.forEach(element => {
      //     if (element.launch_success === this.launch_success) {
      //       this.httpdata.push(element);
      //     } 
      // });
      this.loading = false;
    })
 
}

filterLandSuccess(status) {
  this.httpdata = [];
  this.data = [];
  
  this.launch_year = null;
  this.apiURL = "";
  this.land_success = status;
   
   
     
    this.apiURL = `${this.apiRoot}?limit=${this.limit}&amp;launch_success=${this.launch_success}&amp;land_success=${this.land_success}`;
  
  this.loading = true;
  
  this.service.getFilteredData(this.apiURL).subscribe(retdata => {

    this.data = retdata;
    
  this.displaydata(this.data);
  this.loading = false;
  });
}
  
   
  



}
