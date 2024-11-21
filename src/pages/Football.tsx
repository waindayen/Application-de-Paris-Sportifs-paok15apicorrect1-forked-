import React, { useState } from 'react';
import { useOdds, useLiveEvents } from '../hooks/useOdds';
import { Trophy, Play, Calendar, Filter, AlertCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { oddsApi } from '../services/oddsApi';

const FOOTBALL_LEAGUES = [
  { key: 'soccer_france_ligue_one', name: 'Ligue 1' },
  { key: 'soccer_uefa_champs_league', name: 'Champions League' },
  { key: 'soccer_epl', name: 'Premier League' },
  { key: 'soccer_spain_la_liga', name: 'La Liga' },
  { key: 'soccer_italy_serie_a', name: 'Serie A' },
  { key: 'soccer_germany_bundesliga', name: 'Bundesliga' }
];

export default function Football() {
  const [selectedLeague, setSelectedLeague] = useState(FOOTBALL_LEAGUES[0].key);
  const [showLive, setShowLive] = useState(false);

  const { 
    data: upcomingMatches, 
    isLoading: isLoadingUpcoming, 
    error: upcomingError 
  } = useOdds(selectedLeague);

  const {
    data: liveMatches,
    isLoading: isLoadingLive,
    error: liveError
  } = useLiveEvents(selectedLeague);

  const matches = showLive ? liveMatches : upcomingMatches;
  const isLoading = showLive ? isLoadingLive : isLoadingUpcoming;
  const error = showLive ? liveError : upcomingError;

  // Vérifier si l'API est configurée
  if (!oddsApi.isConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 px-4 pb-20">
        <div className="max-w-7xl mx-auto py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Configuration requise</h2>
            <p className="text-gray-600 mb-4">
              L'API des cotes n'est pas configurée. Veuillez configurer votre clé API pour accéder aux données des matchs.
            </p>
            <Link
              to="/dashboard/api/odds-config"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Settings className="w-5 h-5" />
              Configurer l'API
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderMatchCard = (match: any) => {
    const mainMarket = match.bookmakers[0]?.markets[0];
    const homeOdds = mainMarket?.outcomes.find(o => o.name === match.home_team)?.price;
    const awayOdds = mainMarket?.outcomes.find(o => o.name === match.away_team)?.price;
    const drawOdds = mainMarket?.outcomes.find(o => o.name === 'Draw')?.price;

    return (
      <div key={match.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-blue-600">{match.sport_title}</span>
          <span className="text-sm text-gray-600">
            {showLive ? (
              <span className="flex items-center gap-1 text-red-500">
                <Play className="w-4 h-4" />
                En direct
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(match.commence_time).toLocaleString('fr-FR', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            )}
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 text-center">
            <h3 className="font-semibold text-lg">{match.home_team}</h3>
          </div>
          <div className="px-4 text-gray-500">VS</div>
          <div className="flex-1 text-center">
            <h3 className="font-semibold text-lg">{match.away_team}</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {homeOdds && (
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="text-sm text-gray-600 mb-1">1</div>
              <div className="text-xl font-bold text-blue-600">{homeOdds.toFixed(2)}</div>
            </button>
          )}
          {drawOdds && (
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="text-sm text-gray-600 mb-1">X</div>
              <div className="text-xl font-bold text-blue-600">{drawOdds.toFixed(2)}</div>
            </button>
          )}
          {awayOdds && (
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="text-sm text-gray-600 mb-1">2</div>
              <div className="text-xl font-bold text-blue-600">{awayOdds.toFixed(2)}</div>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 pb-20">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Football</h1>
          </div>
          <button
            onClick={() => setShowLive(!showLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              showLive 
                ? 'bg-red-100 text-red-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {showLive ? (
              <>
                <Play className="w-4 h-4" />
                En Direct
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                À venir
              </>
            )}
          </button>
        </div>

        {/* League Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="font-medium text-gray-700">Filtrer par championnat</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FOOTBALL_LEAGUES.map((league) => (
              <button
                key={league.key}
                onClick={() => setSelectedLeague(league.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLeague === league.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {league.name}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 text-red-500 py-12">
            <AlertCircle className="w-6 h-6" />
            <span>{error.message}</span>
          </div>
        ) : matches?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun match disponible pour le moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches?.map(renderMatchCard)}
          </div>
        )}
      </div>
    </div>
  );
}