import Layout from 'layouts';
import PageContext from 'components/page-context';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoxScore } from 'redux/actions/boxScoreActions';
import NBABoxScore from 'components/nbaboxscore';
import MLBBoxScore from 'components/mlbboxscore';
import { SET_MLB_BOXSCORE, SET_NBA_BOXSCORE } from 'redux/types';

const stylesheets = [
  <link key="boostrap" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />,
  <link key="google-font" href="https://fonts.googleapis.com/css?family=League+Spartan&display=swap" rel="stylesheet" />
]
const scripts = []
const REFRESH_RATE = 7500

export async function getStaticProps() {
  const metaResponse = await axios.get(`${process.env.API_BASE_URL}/meta/index`);
  const nbaResponse = await axios.get(`${process.env.API_BASE_URL}/boxscore/nba/latest`);
  const mlbResponse = await axios.get(`${process.env.API_BASE_URL}/boxscore/mlb/latest`);
  return {
    props: {
      page: metaResponse.data,
      nba: nbaResponse.data,
      mlb: mlbResponse.data
    },
    revalidate: 15
  }
}

export default function Home(props) {

  const nba = useSelector(state => state.scores.nba)
  const [nbaInterval, setNbaInterval] = useState(null)
  const mlb = useSelector(state => state.scores.mlb)
  const [mlbInterval, setMlbInterval] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: SET_NBA_BOXSCORE, payload: props.nba})
    dispatch({type: SET_MLB_BOXSCORE, payload: props.mlb})
    setNbaInterval(setInterval(() => {
      dispatch(getBoxScore('NBA', props.nba._id, {refresh: REFRESH_RATE}))
    }, REFRESH_RATE))
    setMlbInterval(setInterval(() => {
      dispatch(getBoxScore('MLB', props.mlb._id, {refresh: REFRESH_RATE}))
    }, REFRESH_RATE))
    return () => {
      clearInterval(nbaInterval)
      clearInterval(mlbInterval)
    }
  }, [])

  return (
    <PageContext.Provider value={props}>
      <Layout stylesheets={stylesheets} scripts={scripts}>
        <div className="container py-md-5 py-4">
          {Object.keys(nba).length > 0 &&
            <div>
              <h1>NBA - Box Scores</h1>
              <h2>{ nba.away_team.full_name } ({ nba.away_totals.points }) vs. { nba.home_team.full_name } ({ nba.home_totals.points })</h2>
              <p>{ nba.event_information.site.name } - { nba.event_information.site.city }, { nba.event_information.site.state }</p>
                <NBABoxScore data={ nba } />
            </div>
          }
          <br />
          {Object.keys(mlb).length > 0 &&
            <div>
              <h1>MLB - Box Scores</h1>
              <h2>{ mlb.away_team.full_name } ({ mlb.away_batter_totals.runs }) vs. { mlb.home_team.full_name } ({ mlb.home_batter_totals.runs })</h2>
              <p>{ mlb.event_information.site.name } - { mlb.event_information.site.city }, { mlb.event_information.site.state }</p>
              <MLBBoxScore data={ mlb } />
            </div>
          }
        </div>
      </Layout>
    </PageContext.Provider>
  )
}
