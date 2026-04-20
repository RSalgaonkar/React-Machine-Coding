import {
  DecisionLabClientToServerEvents,
  DecisionLabServerToClientEvents,
} from './decisionLab.socket.types';

type Unsubscribe = () => void;

type Listener<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

type ServerListenerMap = {
  [K in keyof DecisionLabServerToClientEvents]: Array<
    Listener<DecisionLabServerToClientEvents[K]>
  >;
};

class DecisionLabSocketService {
  private serverListeners: ServerListenerMap = {
    'decision-lab:participants': [],
    'decision-lab:activity': [],
    'decision-lab:proposal-created': [],
    'decision-lab:proposal-status-changed': [],
    'decision-lab:proposal-voted': [],
  };

  connect() {
    return true;
  }

  disconnect() {
    (Object.keys(this.serverListeners) as Array<keyof ServerListenerMap>).forEach((key) => {
      this.serverListeners[key] = [];
    });
  }

  on<K extends keyof DecisionLabServerToClientEvents>(
    event: K,
    callback: DecisionLabServerToClientEvents[K]
  ): Unsubscribe {
    const listeners =
      this.serverListeners[event] as Array<Listener<DecisionLabServerToClientEvents[K]>>;

    listeners.push(callback as Listener<DecisionLabServerToClientEvents[K]>);

    return () => {
      const nextListeners = listeners.filter(
        (listener) =>
          listener !== (callback as Listener<DecisionLabServerToClientEvents[K]>)
      );

      this.serverListeners[event] = nextListeners as ServerListenerMap[K];
    };
  }

  emit<K extends keyof DecisionLabServerToClientEvents>(
    event: K,
    ...args: Parameters<DecisionLabServerToClientEvents[K]>
  ) {
    const listeners =
      this.serverListeners[event] as Array<Listener<DecisionLabServerToClientEvents[K]>>;

    listeners.forEach((listener) => {
      listener(...args);
    });
  }

  send<K extends keyof DecisionLabClientToServerEvents>(
    event: K,
    ...args: Parameters<DecisionLabClientToServerEvents[K]>
  ) {
    return { event, payload: args[0] };
  }
}

export const decisionLabSocketService = new DecisionLabSocketService();