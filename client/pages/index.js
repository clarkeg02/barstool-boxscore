import Layout from 'layouts';
import PageContext from 'components/page-context';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoxScore } from 'redux/actions/boxScoreActions';
import NBABoxScore from 'components/nbaboxscore';
import MLBBoxScore from 'components/mlbboxscore';

const stylesheets = [
  <link key="boostrap" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />,
  <link key="google-font" href="https://fonts.googleapis.com/css?family=League+Spartan&display=swap" rel="stylesheet" />
]
const scripts = []
const REFRESH_RATE = 7500

export async function getServerSideProps({ req }) {
  const response = await axios.get(`${process.env.API_BASE_URL}/meta/index`);
  return {
    props: response.data ? response.data : {}
  }
}

export default function Home(props) {

  const nba = useSelector(state => state.scores.nba)
  const [nbaInterval, setNbaInterval] = useState(null)
  const mlb = useSelector(state => state.scores.mlb)
  const [mlbInterval, setMlbInterval] = useState(null)
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(getBoxScore('NBA', 'latest', {refresh: REFRESH_RATE}))
    dispatch(getBoxScore('MLB', 'latest', {refresh: REFRESH_RATE}))
  }, [])

  useEffect(async () => {
    if (nba._id) {
      if (nbaInterval) {
        clearInterval(nbaInterval)
      }
      setNbaInterval(setInterval(() => {
        dispatch(getBoxScore('NBA', nba._id, {refresh: REFRESH_RATE}))
      }, REFRESH_RATE))
    }
    if (mlb._id) {
      if (mlbInterval) {
        clearInterval(nbaInterval)
      }
      setMlbInterval(setInterval(() => {
        dispatch(getBoxScore('MLB', mlb._id, {refresh: REFRESH_RATE}))
      }, REFRESH_RATE))
    }
    return () => {
      clearInterval(nbaInterval)
      clearInterval(mlbInterval)
    }
  }, [nba._id, mlb._id])

  return (
    <PageContext.Provider value={props}>
      <Layout stylesheets={stylesheets} scripts={scripts}>
        <div className="container">
          {Object.keys(nba).length > 0 &&
            <NBABoxScore data={ nba } />
          }
          <br />
          {Object.keys(mlb).length > 0 &&
            <MLBBoxScore data={ mlb } />
          }
        </div>
      </Layout>
    </PageContext.Provider>
  )
}
