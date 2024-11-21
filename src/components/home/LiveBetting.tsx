import React from 'react';
import { Play, Clock, AlertCircle } from 'lucide-react';
import { useLiveEvents } from '../../hooks/useOdds';

export default function LiveBetting() {
  const { data: liveMatches, isLoading, error } = useLiveEvents('soccer_france_ligue_one');

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center gap-2 mb-6">
          <Play className="w-6 h-6 text-red-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900">En Direct</h2>
        </div>
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
          <span>Erreur de chargement des matchs en direct</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Play className="w-6 h-6 text-red-500 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-900">En Direct</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveMatches?.map((match) => {
          const mainMarket = match.bookmakers[0]?.markets[0];
          const homeOdds = mainMarket?.outcomes.find(o => o.name === match.home_team)?.price;
          const awayOdds = mainMarket?.outcomes.find(o => o.name === match.away_team)?.price;
          const drawOdds = mainMarket?.outcomes.find(o => o.name === 'Draw')?.price;

          return (
            <div key={match.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">{match.sport_title}</span>
                <div className="flex items-center gap-1 text-red-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">En direct</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.home_team}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.away_team}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {homeOdds && (
                  <button className="py-2 px-3 text-center rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm text-gray-600">1</div>
                    <div className="font-bold text-blue-600">{homeOdds.toFixed(2)}</div>
                  </button>
                )}
                {drawOdds && (
                  <button className="py-2 px-3 text-center rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm text-gray-600">X</div>
                    <div className="font-bold text-blue-600">{drawOdds.toFixed(2)}</div>
                  </button>
                )}
                {awayOdds && (
                  <button className="py-2 px-3 text-center rounded bg-gray-50 hover:bg-gray-100 transition-colors">
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