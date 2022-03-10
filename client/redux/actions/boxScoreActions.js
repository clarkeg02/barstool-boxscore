import axios from 'axios';
import {
    SET_FETCHING,
    SET_ERROR 
} from '../types';
import { queryParams } from 'js/common';

export const getBoxScore = (league, id, params) => {
    return dispatch => {
        dispatch({type: SET_FETCHING, payload: true})
        axios.get(`${process.env.API_BASE_URL}/boxscore/${league.toLowerCase()}/${id}${queryParams(params)}`)
            .then(response => {
                if (response.data) {
                    dispatch({type: `SET_${league}_BOXSCORE`, payload: response.data});
                    dispatch({type: SET_FETCHING, payload: false})
                }
                else {
                    dispatch({type: `CLEAR_${league}_BOXSCORE`});
                    dispatch({type: SET_FETCHING, payload: false})
                }
            }).catch(error => {
                dispatch({type: `CLEAR_${league}_BOXSCORE`});
                dispatch({type: SET_ERROR, payload: error});
                dispatch({type: SET_FETCHING, payload: false})
            });
    }
}