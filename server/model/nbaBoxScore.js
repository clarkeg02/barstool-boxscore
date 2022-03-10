const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  league: String,
  away_team: Object,
  home_team: Object,
  away_period_scores: Object,
  home_period_scores: Object,
  away_stats: Array,
  home_stats: Array,
  officials: Array,
  event_information: Object,
  away_totals: Object,
  home_totals: Object,
  updated: Date
});

module.exports = mongoose.model('nba', schema);