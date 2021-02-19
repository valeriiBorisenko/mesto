const onError = (res)=>{
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

export default class Api{
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserData(){
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(onError)
  }

  patchUserData(data){
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(onError)
  }

  patchUserAvatar(data){
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(onError)
  }

  getAllCards(){
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(onError)
  }

  addNewCard(data){
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
    .then(onError)
  }

  removeCard(id){
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }

  addLike(id){
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(onError)
  }

  removeLike(id){
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }

} 