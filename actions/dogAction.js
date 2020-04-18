import axios from "axios";

export const FETCH_DOG_START = 'FETCH_DOG_START';
export const FETCH_DOG_SUCCESS = 'FETCH_DOG_SUCCESS';
export const FETCH_DOG_FAILURE = 'FETCH_DOG_FAILURE';

//makes a call to randomdog api and returns media of a dog when succesful
export const fetchDog = () => dispatch =>{
    dispatch({type:FETCH_DOG_START});
    axios.get('https://random.dog/woof.json')
    .then(response =>{
        dispatch({type:FETCH_DOG_SUCCESS, payload: response.data});
    })
    .catch(err =>{
        dispatch({type:FETCH_DOG_FAILURE, payload: err})
    })
}