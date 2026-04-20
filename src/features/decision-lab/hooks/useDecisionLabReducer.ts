import { useEffect, useMemo, useReducer } from 'react';
import { decisionLabSocketService } from '../services/decisionLab.socket';
import {
  decisionLabReducer,
  initialDecisionLabState,
} from '../reducer/decisionLab.reducer';
import {
  selectFilteredProposals,
  selectSelectedProposal,
  selectVisibleActivities,
} from '../reducer/decisionLab.selectors';

export function useDecisionLabReducer() {
  const [state, dispatch] = useReducer(decisionLabReducer, initialDecisionLabState);

  useEffect(() => {
    decisionLabSocketService.connect();

    const offParticipants = decisionLabSocketService.on(
      'decision-lab:participants',
      (participants) => {
        dispatch({ type: 'SET_PARTICIPANTS', payload: participants });
      }
    );

    const offActivity = decisionLabSocketService.on(
      'decision-lab:activity',
      (activity) => {
        dispatch({ type: 'ADD_ACTIVITY', payload: activity });
      }
    );

    return () => {
      offParticipants();
      offActivity();
      decisionLabSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!state.replay.isReplayMode || !state.replay.isPlaying) return;

    const timer = window.setInterval(() => {
      if (state.replay.cursor >= state.activities.length - 1) {
        dispatch({ type: 'STOP_REPLAY' });
        return;
      }

      dispatch({ type: 'STEP_REPLAY_FORWARD' });
    }, 1200);

    return () => window.clearInterval(timer);
  }, [
    state.replay.isReplayMode,
    state.replay.isPlaying,
    state.replay.cursor,
    state.activities.length,
  ]);

  useEffect(() => {
    if (state.toasts.length === 0) return;

    const timers = state.toasts.map((toast) =>
      window.setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: toast.id });
      }, 3200)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [state.toasts]);

  const filteredProposals = useMemo(() => selectFilteredProposals(state), [state]);
  const selectedProposal = useMemo(() => selectSelectedProposal(state), [state]);
  const visibleActivities = useMemo(() => selectVisibleActivities(state), [state]);

  return {
    state,
    dispatch,
    filteredProposals,
    selectedProposal,
    visibleActivities,
  };
}