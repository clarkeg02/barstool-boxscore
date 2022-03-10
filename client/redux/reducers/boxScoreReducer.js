import {
    SET_NBA_BOXSCORE,
    SET_MLB_BOXSCORE,
    CLEAR_NBA_BOXSCORE,
    CLEAR_MLB_BOXSCORE,
    SET_FETCHING,
    SET_ERROR 
} from '../types';

// const initialNBA = {
//     league: "NBA",
//     away_team: {},
//     home_team: {},
//     away_period_scores: {},
//     home_period_scores: {},
//     away_stats: [],
//     home_stats: [],
//     officials: [],
//     event_information: {},
//     away_totals: {},
//     home_totals: {}
// }

// const initialMLB = {
//     league: "MLB",
//     away_team: {},
//     home_team: {},
//     away_period_scores: {},
//     home_period_scores: {},
//     away_errors: 0,
//     home_errors: 0,
//     away_batters: [],
//     home_batters: [],
//     away_pitchers: [],
//     home_pitchers: [],
//     away_fielding: [],
//     home_fielding: [],
//     officials: [],
//     event_information: {},
//     away_batter_totals: {},
//     home_batter_totals: {}
// }

const initialState = {
    nba: {},
    mlb: {},
    fetching: false,
    error: null
}

const boxScoreReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_NBA_BOXSCORE:
            /**
             * payload: NBA BoxScore
             */
            return { ...state, nba: payload };
        case SET_MLB_BOXSCORE:
            /**
         * payload: MLB QABoxScore
             */
            return { ...state, mlb: payload };
        case CLEAR_NBA_BOXSCORE:
            /**
             * payload: undefined
             */
            return { ...state, nba: {} };
        case CLEAR_MLB_BOXSCORE:
                /**
                 * payload: undefined
                 */
                return { ...state, mlb: {} };
        case SET_FETCHING:
            /**
             * payload: Boolean
             */
            return { ...state, fetching: payload };
        case SET_ERROR:
            /**
             * payload: Error
             */
            return { ...state, error: payload };
        default:
            break;
    }
    return state;
}

export default boxScoreReducer;