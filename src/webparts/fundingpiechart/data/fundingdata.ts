import axios from "axios";

class FundingData {
  private static _label:any[]=[];
  private static _data:any[]=[];
  private static _bkcolor:string[]=[];
   public static getdata(year:string):Promise<any> {
    let query = "https://christclinickaty.sharepoint.com/sites/intranet/grants/_api/web/lists/getbytitle('Funding Sources')/items";
    return axios.get(query).then((result)=> {
        if(result.data.value.length>0) {
            for(let index:number = 0;index<result.data.value.length;index++) {
                this._label.push(result.data.value[index].Source);
                this._data.push(result.data.value[index].Amount);
                this._bkcolor.push(this.getRandomColor());
            }
        }
        const data = {
            labels:this._label,
            legend: {
                position: 'bottom'
              },
            datasets: [{
                data: this._data,
                backgroundColor:this._bkcolor
            }]
        };
        return data;
    });
}
private static getRandomColor() {
    let letters:string = '0123456789ABCDEF';
    let color:string = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export default FundingData;