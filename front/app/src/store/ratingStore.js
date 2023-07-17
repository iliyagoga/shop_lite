import {makeAutoObservable} from 'mobx'
export default class RatingStore{
    constructor(){
        this._ratings=[]
        this._rate=0
        makeAutoObservable(this)
    }
    setRatings(ratings){
        this._ratings=ratings
    }
    setRate(rate){
        this._rate=rate
    }

    get ratings(){
        return this._ratings
    }
    get rate(){
        return this._rate
    }

}