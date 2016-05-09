import Rx from 'rx'
import hash from 'object-hash'
import { api, push } from '../props'

const timer = Rx.Observable.timer(0, 60000);
let oldState;

timer.map(() => Rx.Observable.fromPromise(api.lights()));

timer.subscribe((state) => {
    if (hash(state) !== oldState) {
        oldState = hash(state);
        push('heartbeat', { state });
    }
});
