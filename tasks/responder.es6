import { fetch, put } from '../support/backend'
import { push, pull } from '../support/props'

pull.subscribe(message => {
    const topic = msg.fields.routingKey;
    const data = JSON.parse(msg.content.toString());
    const method = topic.slice(data.meta.realm.length);

    if (method === 'fetch') {
        push(topic, {
            data: fetch(data.query),
            meta: data.meta
        })
    } else if (method === 'put') {
        push(topic, {
            ok: put(data.data),
            meta: data.meta
        })
    }
});
