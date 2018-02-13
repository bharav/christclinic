import axios from "axios";

class CycleTime {
  private _label:any[]=[];
   private _cycleTime:any[]=[];
   private _goal:any[]=[];
   private _data:any={};

   public getCycleTime(year:string):Promise<any> {
    return axios.get("https://christclinickaty.sharepoint.com/sites/"+
     "intranet/patientcare/_api/web/lists/getbytitle('CycleTimeMonthly')/items?$filter=Year eq "+year).then((result)=> {
       if(result.data.value.length>0) {
       for(let index:number = 0;index<result.data.value.length;index++) {
         this._label.push(result.data.value[index].Month);
         this._cycleTime.push(result.data.value[index].CycleTime);
         this._goal.push(result.data.value[index].Goal);
       }
          this._data = {
            labels: this._label,
            datasets: [
                {
                  label: "Cycle Time",
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
                  data: this._cycleTime
                },
                  {
                    label: "Goal",
                    fill:false,
                    type:"line",
                    lineTension: 0.1,
                    borderColor: "rgba(0, 0, 0, 0.9)",
                    borderDash: [10,5],
                    data:this._goal
                  }
                ]
            };
          }
          return this._data;
       });
      }
}

export default CycleTime;