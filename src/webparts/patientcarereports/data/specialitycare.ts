import axios from "axios";
class SpecialityCare {
  private _label:any[]=[];
  private _mentalhealh:any[]=[];
  private _podiatry:any[]=[];
  private _onsitecolposcopy:any[]=[];
  private _offsitecolposcopy:any[]=[];
  private _minorprocedures:any[]=[];
  private _handsurgeryprocedures:any[]=[];
  private _hepitatiscscreening:any[]=[];
  private _data:any={};

       public getSpecialityCare(year:string):Promise<any> {
        return axios.get("https://christclinickaty.sharepoint.com/sites/"+
         "intranet/patientcare/_api/web/lists/getbytitle('PreventativeServicesMonthly')/items?$filter=Year eq "+year).then((result)=> {
           if(result.data.value.length>0){
           for(let index:number = 0;index<result.data.value.length;index++){
             this._label.push(result.data.value[index].Month);
             this._mentalhealh.push(result.data.value[index].MentalHealth);
             this._podiatry.push(result.data.value[index].Podiatry);
             this._onsitecolposcopy.push(result.data.value[index].OnsiteColposcopy);
             this._offsitecolposcopy.push(result.data.value[index].OffSiteColposcopy);
             this._minorprocedures.push(result.data.value[index].MinorProcedures);
             this._handsurgeryprocedures.push(result.data.value[index].HandSurgeryProcedures);
             this._hepitatiscscreening.push(result.data.value[index].HepitatisCScreening);
           }
           this._data = {
        labels: this._label,
        datasets: [
          {
            label: "Mental Health",
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
            data: this._mentalhealh
          },
              {
                label: "Podiatry",
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
                data: this._podiatry
              },
              {
                label: "On site Colposcopy",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(211, 153, 71, 0.9)",
                borderColor: 'rgba(211, 153, 71, 0.9)',
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
                data: this._onsitecolposcopy
              },
              {
                label: "Off Site Colposcopy",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(211, 153, 198, 0.9)",
                borderColor: 'rgba(211, 153, 198, 0.9)',
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
                data: this._offsitecolposcopy
              },
              {
                label: "Minor Procedures",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(211, 153, 198, 0.9)",
                borderColor: 'rgba(211, 153, 198, 0.9)',
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
                data: this._minorprocedures
              },
              {
                label: "Hand Surgery Procedures",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(211, 153, 198, 0.9)",
                borderColor: 'rgba(211, 153, 198, 0.9)',
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
                data: this._handsurgeryprocedures
              },
             {
                label: "Hepitatis C Screening",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(211, 153, 71, 0.9)",
                borderColor: 'rgba(211, 153, 71, 0.9)',
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
                data: this._hepitatiscscreening
              },
            ]
          };
        }
        return this._data;
      });
    }
  }

export default SpecialityCare;