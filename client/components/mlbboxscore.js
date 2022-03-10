import { MLB_COLORS } from "js/constants"

export default function MLBBoxScore({ data }) {

    const periods = Math.max(data.away_period_scores.length, 9)
    const currentPeriod = () => {
        if (data.event_information.status == 'completed') {
            return 'FINAL'
        }
        const period = data.away_period_scores.length
        const half = data.away_period_scores.length > data.home_period_scores.length ? 'TOP' : 'BTM'
        return `${half} ${period}${numberToOrdinal(period).toUpperCase()}`
    }
    const awayStyles = {
        backgroundColor: MLB_COLORS[data.away_team.team_id].primary,
        color: MLB_COLORS[data.away_team.team_id].secondary,
    }
    const homeStyles = {
        backgroundColor: MLB_COLORS[data.home_team.team_id].primary,
        color: MLB_COLORS[data.home_team.team_id].secondary,
    }

    return (
        <div className="boxscore">
            <div className="boxscore__team boxscore__team--header">
                <label>&nbsp;</label>
                <div className="boxscore__team__units">
                    {[...Array(periods).keys()].map(i => (
                        <span key={i}>{i+1}</span>
                    ))}
                </div>
                <div className="boxscore__team__results">
                    <span>R</span>
                    <span>H</span>
                    <span>E</span>
                </div>
            </div>
            <div className="boxscore__team boxscore__team--away">
                <label>{ data.away_team.abbreviation }</label>
                <div className="boxscore__team__units">
                    {[...Array(periods).keys()].map(i => (
                        <span key={i}>{data.away_period_scores[i]}</span>
                    ))}
                </div>
                <div className="boxscore__team__results">
                    <span>{ data.away_batter_totals.runs }</span>
                    <span>{ data.away_batter_totals.hits }</span>
                    <span>{ data.away_errors }</span>
                </div>
            </div>
            <div className="boxscore__team boxscore__team--home">
                <label>{ data.home_team.abbreviation }</label>
                <div className="boxscore__team__units">
                    {[...Array(periods).keys()].map(i => (
                        <span key={i}>{data.home_period_scores[i]}</span>
                    ))}
                </div>
                <div className="boxscore__team__results">
                    <span>{ data.home_batter_totals.runs }</span>
                    <span>{ data.home_batter_totals.hits }</span>
                    <span>{ data.home_errors }</span>
                </div>
            </div>
            <div className="boxscore__details">
                <div className="boxscore__details__team boxscore__details__team--away" style={awayStyles}>
                    <p>
                        <strong>{ data.away_team.full_name }</strong><small>{ data.away_team.abbreviation }</small>
                    </p>
                    {/* <span>56-38</span> */}
                </div>
                <div className="boxscore__details__info">
                    <strong>{ currentPeriod() }</strong>
                </div>
                <div className="boxscore__details__team boxscore__details__team--home" style={homeStyles}>
                    <p>
                        <strong>{ data.home_team.full_name }</strong><small>{ data.home_team.abbreviation }</small>
                    </p>
                    {/* <span>56-38</span> */}
                </div>
            </div>
        </div>
    )
}