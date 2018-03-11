import axios from "axios";

class FundingData {
  private _label:any[]=[];
   public static getdata():Promise<any> {
    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };
    return new Promise<any>((resolve)=>{
        resolve(data);
    })    
      
}
}

export default FundingData;