import axios from "axios";
class NoShowRate {
  private _label:any[]=[];
  private _new:any[]=[];
  private _established:any[]=[];
  private _aftercare:any[]=[];
  private _total:any[]=[];
  private _goal:any[]=[];
  private _data:any={};


  public getNoShowRate(year:string):Promise<any> {
    return axios.get("https://christclinickaty.sharepoint.com/sites/"+
     "intranet/patientcare/_api/web/lists/getbytitle('NoShowMonthly')/items?$filter=Year eq "+year).then((result)=> {
       if(result.data.value.length>0){
       for(let index:number = 0;index<result.data.value.length;index++){
         this._label.push(result.data.value[index].Month);
         this._new.push(result.data.value[index].New);
         this._established.push(result.data.value[index].Established);
         this._aftercare.push(result.data.value[index].After_x0020_Care_x0020_F_x002f_U);
         this._goal.push(result.data.value[index].Goal);
         this._total.push(result.data.value[index].Total);
       }
    this._data= {
        labels: this._label,
        datasets: [
          {
            label: "New",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(76, 44, 201, 0.9)",
            borderColor: "rgba(76, 44, 201, 0.9)",
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
              label: "Established",
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
              data: this._established
            },
            {
                label: "After Care F/u",
                fill: false,
                lineTension: 0.1,
                backgroundColor: " rgba(175, 94, 174, 0.9)",
                borderColor: ' rgba(175, 94, 174, 0.9)',
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
              },
            {
                label: "Total",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(211, 69, 71, 0.9)",
                borderColor: 'rgba(211, 69, 71, 0.9)',
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
                data:this._total
              },
              
              {
                label: "Goal",
                type:"line",
                lineTension: 0.1,
                borderColor: "rgba(0, 0, 0, 0.9)",
                borderDash: [10,5],
                data: this._goal
              }
            ]
        };
      }
      return this._data;
    });
  }
}

export default NoShowRate;