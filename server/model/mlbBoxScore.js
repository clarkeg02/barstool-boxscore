const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  league: String,
  away_team: Object,
  home_team: Object,
  away_period_scores: Object,
  home_period_scores: Object,
  away_errors: Number,
  home_errors: Number,
  away_batters: Array,
  home_batters: Array,
  away_pitchers: Array,
  home_pitchers: Array,
  away_fielding: Array,
  home_fielding: Array,
  officials: Array,
  event_information: Object,
  away_batter_totals: Object,
  home_batter_totals: Object,
  updated: Date
});

module.exports = mongoose.model('mlb', schema);