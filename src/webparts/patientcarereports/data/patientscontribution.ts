import axios from "axios";
class PatientsContribution {
  private _label:any[]=[];
  private _visits:any[]=[];
  private _labs:any[]=[];
  private _data:any={};

       public getPatientContribution(year:string):Promise<any> {
        return axios.get("https://christclinickaty.sharepoint.com/sites/"+
         "intranet/patientcare/_api/web/lists/getbytitle('PatientContributionMonthly')/items?$filter=Year eq "+year).then((result)=> {
           if(result.data.value.length>0){
           for(let index:number = 0;index<result.data.value.length;index++){
             this._label.push(result.data.value[index].Months);
             this._visits.push(result.data.value[index].Visits);
             this._labs.push(result.data.value[index].Labs);
           }
           this._data =  {
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
                  label: "Labs",
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
                  data:this._labs
                }
                ]
            };
           }
          return this._data;
         });
      }
}

export default PatientsContribution;