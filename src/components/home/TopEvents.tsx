import React from 'react';
import { Star, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOdds } from '../../hooks/useOdds';

export default function TopEvents() {
  const { data: matches, isLoading, error } = useOdds('soccer_uefa_champs_league');

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <span>Erreur de chargement des événements</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Événements Populaires</h2>
        </div>
        <Link
          to="/events"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
        >
          Voir tout
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {matches?.slice(0, 3).map((match) => {
          const mainMarket = match.bookmakers[0]?.markets[0];
          const homeOdds = mainMarket?.outcomes.find(o => o.name === match.home_team)?.price;
          const awayOdds = mainMarket?.outcomes.find(o => o.name === match.away_team)?.price;
          const drawOdds = mainMarket?.outcomes.find(o => o.name === 'Draw')?.price;

          return (
            <div key={match.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-600">{match.sport_title}</span>
                <span className="text-sm text-gray-600">
                  {new Date(match.commence_time).toLocaleString('fr-FR', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-4">
                {match.home_team} vs {match.away_team}
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {homeOdds && (
                  <button className="py-3 px-4 text-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm text-gray-600">1</div>
                    <div className="font-bold text-blue-600">{homeOdds.toFixed(2)}</div>
                  </button>
                )}
                {drawOdds && (
                  <button className="py-3 px-4 text-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm text-gray-600">X</div>
                    <div className="font-bold text-blue-600">{drawOdds.toFixed(2)}</div>
                  </button>
                )}
                {awayOdds && (
                  <button className="py-3 px-4 text-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm text-gray-600">2</div>
                    <div className="font-bold text-blue-600">{awayOdds.toFixed(2)}</div>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}