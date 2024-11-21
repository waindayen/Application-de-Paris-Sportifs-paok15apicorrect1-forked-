import { useQuery } from 'react-query';
import { oddsApi, Sport, Event } from '../services/oddsApi';

const ERROR_MESSAGES = {
  API_KEY_REQUIRED: 'Clé API non configurée. Veuillez configurer votre clé API dans les paramètres.',
  API_KEY_INVALID: 'Clé API invalide. Veuillez vérifier votre clé API.',
  API_RATE_LIMIT: 'Limite d\'API atteinte. Veuillez réessayer plus tard.',
  API_CONNECTION_ERROR: 'Erreur de connexion à l\'API. Veuillez vérifier votre connexion.'
};

function getErrorMessage(error: Error): string {
  return ERROR_MESSAGES[error.message as keyof typeof ERROR_MESSAGES] || error.message;
}

export function useSports() {
  return useQuery<Sport[], Error>(
    'sports',
    () => oddsApi.getSports(),
    {
      retry: 2,
      staleTime: 300000, // 5 minutes
      enabled: oddsApi.isConfigured(),
      onError: (error) => {
        console.error('Failed to fetch sports:', getErrorMessage(error));
      }
    }
  );
}

export function useOdds(sportKey: string) {
  return useQuery<Event[], Error>(
    ['odds', sportKey],
    () => oddsApi.getOdds(sportKey),
    {
      retry: 2,
      staleTime: 60000, // 1 minute
      enabled: oddsApi.isConfigured(),
      onError: (error) => {
        console.error(`Failed to fetch odds for ${sportKey}:`, getErrorMessage(error));
      }
    }
  );
}

export function useLiveEvents(sportKey: string) {
  return useQuery<Event[], Error>(
    ['live-events', sportKey],
    () => oddsApi.getLiveEvents(sportKey),
    {
      retry: 1,
      refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
      staleTime: 10000, // 10 seconds
      enabled: oddsApi.isConfigured(),
      onError: (error) => {
        console.error(`Failed to fetch live events for ${sportKey}:`, getErrorMessage(error));
      }
    }
  );
}

export function useScores(sportKey: string) {
  return useQuery<Event[], Error>(
    ['scores', sportKey],
    () => oddsApi.getScores(sportKey),
    {
      retry: 2,
      staleTime: 60000, // 1 minute
      enabled: oddsApi.isConfigured(),
      onError: (error) => {
        console.error(`Failed to fetch scores for ${sportKey}:`, getErrorMessage(error));
      }
    }
  );
}