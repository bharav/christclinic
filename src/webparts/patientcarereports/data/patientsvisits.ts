 import axios from "axios";
 class PatientsVisits {
   private _label:any[]=[];
   private _visits:any[]=[];
   private _patients:any[]=[];
   private _new:any[]=[];
   private _aftercare:any[]=[];
   private _data:any={};

        public getPatientVisits(year:string,ismonthly:boolean,startmonth:string,startyear:string,endmonth:string,endyear:string):Promise<any> {
          let query:string="";
          if(ismonthly){
            query="https://christclinickaty.sharepoint.com/sites/intranet/patientcare/_api/web/lists/getbytitle('PatientVisitMonthly')/items?$filter=(Year eq "+startyear+" or Year eq "+endyear+")";
          }
          else{
            query="https://christclinickaty.sharepoint.com/sites/"+
            "intranet/patientcare/_api/web/lists/getbytitle('PatientVisitMonthly')/items?$filter=Year eq "+year;
          }
         return axios.get(query).then((result)=> {
            if(result.data.value.length>0){
            for(let index:number = 0;index<result.data.value.length;index++){
              if(ismonthly){
                if(startyear === endyear)
                {
                  if(result.data.value[index].InternalMonth>=parseInt(startmonth) && result.data.value[index].InternalMonth<=parseInt(endmonth)){
                    this._label.push(result.data.value[index].Month);
                    this._visits.push(result.data.value[index].Visits);
                    this._patients.push(result.data.value[index].Patients);
                    this._aftercare.push(result.data.value[index].Aftercare);
                    this._new.push(result.data.value[index].New);
                }
              }
                else{
                  if((result.data.value[index].InternalMonth>=parseInt(startmonth) && parseInt(result.data.value[index].Year)==parseInt(startyear)) ||
                    (result.data.value[index].InternalMonth <= parseInt(endmonth) && parseInt(result.data.value[index].Year)==parseInt(endyear))){
                      this._label.push(result.data.value[index].Month);
                      this._visits.push(result.data.value[index].Visits);
                      this._patients.push(result.data.value[index].Patients);
                      this._aftercare.push(result.data.value[index].Aftercare);
                      this._new.push(result.data.value[index].New);
                }
            }
            }
           else{
              this._label.push(result.data.value[index].Month);
              this._visits.push(result.data.value[index].Visits);
              this._patients.push(result.data.value[index].Patients);
              this._aftercare.push(result.data.value[index].Aftercare);
              this._new.push(result.data.value[index].New);
           }
            }
            this._data = {
              labels: this._label,
              datasets: [
                {
                  label: "Visits",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(170, 46, 54, 0.9)",
                  borderColor: 'rgba(170, 46, 54, 0.9)',
                  borderCapStyle: 'butt',
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this._visits
                },
                  {
                    label: "Patients",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(32, 127, 54, 0.9)",
                    borderColor: 'rgba(32, 127, 54, 0.9)',
                    borderCapStyle: 'butt',
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data:this._patients
                  },
                  {
                      label: "New",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(32, 41, 157, 0.9)",
                      borderColor: 'rgba(32, 41, 157, 0.9)',
                      borderCapStyle: 'butt',
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this._new
                    },
                    {
                      label: "AfterCare",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(165, 171, 39, 0.9)",
                      borderColor: 'rgba(165, 171, 39, 0.9)',
                      borderCapStyle: 'butt',
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this._aftercare
                    }
                  ]
              };
            }
           return this._data;
          });
       }
}

export default PatientsVisits;