import axios from "axios";
class PreventativeService {
  private _label:any[]=[];
  private _adultvaccine:any[]=[];
  private _mamograms:any[]=[];
  private _wellwomenvisit:any[]=[];
  private _wellmenvisit:any[]=[];
  private _hepitatiscscreening:any[]=[];
  private _coloncancerscreening:any[]=[];
  private _data:any={};

       public getPreventativeService(year:string,ismonthly:boolean,startmonth:string,startyear:string,endmonth:string,endyear:string):Promise<any> {
        let query:string="";
        if(ismonthly){
          query="https://christclinickaty.sharepoint.com/sites/intranet/patientcare/_api/web/lists/getbytitle('PreventativeServicesMonthly')/items?$filter=(Year eq "+startyear+" or Year eq "+endyear+")";
        }
        else{
          query="https://christclinickaty.sharepoint.com/sites/"+
          "intranet/patientcare/_api/web/lists/getbytitle('PreventativeServicesMonthly')/items?$filter=Year eq "+year;
        }
        return axios.get(query).then((result)=> {
           if(result.data.value.length>0){
           for(let index:number = 0;index<result.data.value.length;index++){
            if(ismonthly){
              if(startyear === endyear)
              {
                if(result.data.value[index].InternalMonth>=parseInt(startmonth) && result.data.value[index].InternalMonth<=parseInt(endmonth)){
                  this._label.push(result.data.value[index].Month);
                  this._adultvaccine.push(result.data.value[index].AdultVaccines);
                  this._mamograms.push(result.data.value[index].Mammograms);
                  this._wellwomenvisit.push(result.data.value[index].WellWomanVisits);
                  this._wellmenvisit.push(result.data.value[index].WellMaleVisits);
                  this._hepitatiscscreening.push(result.data.value[index].HepitatisCScreening);
                  this._coloncancerscreening.push(result.data.value[index].ColonCancerScreening);
              }
            }
              else{
                if((result.data.value[index].InternalMonth>=parseInt(startmonth) && parseInt(result.data.value[index].Year)==parseInt(startyear)) ||
                  (result.data.value[index].InternalMonth <= parseInt(endmonth) && parseInt(result.data.value[index].Year)==parseInt(endyear))){
                    this._label.push(result.data.value[index].Month);
                    this._adultvaccine.push(result.data.value[index].AdultVaccines);
                    this._mamograms.push(result.data.value[index].Mammograms);
                    this._wellwomenvisit.push(result.data.value[index].WellWomanVisits);
                    this._wellmenvisit.push(result.data.value[index].WellMaleVisits);
                    this._hepitatiscscreening.push(result.data.value[index].HepitatisCScreening);
                    this._coloncancerscreening.push(result.data.value[index].ColonCancerScreening);
              }
          }
          }
         else{
             this._label.push(result.data.value[index].Month);
             this._adultvaccine.push(result.data.value[index].AdultVaccines);
             this._mamograms.push(result.data.value[index].Mammograms);
             this._wellwomenvisit.push(result.data.value[index].WellWomanVisits);
             this._wellmenvisit.push(result.data.value[index].WellMaleVisits);
             this._hepitatiscscreening.push(result.data.value[index].HepitatisCScreening);
             this._coloncancerscreening.push(result.data.value[index].ColonCancerScreening);
         }
           }
           this._data = {
        labels: this._label,
        datasets: [
          {
            label: "Adult Vaccines",
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
            data: this._adultvaccine
          },
            {
              label: "Mammograms",
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
              data: this._mamograms
            },
            {
                label: "Well Woman Visits",
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
                data: this._wellwomenvisit
              },
              {
                label: "Well Male Visits",
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
                data: this._wellmenvisit
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
              {
                label: "Colon Cancer Screening",
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
                data: this._coloncancerscreening
              }
            ]
          };
        }
        return this._data;
      });
    }
  }
export default PreventativeService;