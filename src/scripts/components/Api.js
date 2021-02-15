export default class Api{
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }


  _getAllCards(){
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
    .then((res)=>{
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
} 