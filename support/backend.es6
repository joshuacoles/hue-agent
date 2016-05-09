import { graphql } from 'graphql'
import { api } from './props'

const ColourMode = new GraphQLEnumType({
    name: 'ColorMode',
    values: {
        CT: { value: 0 },
        XY: { value: 1 }
    }
});

const Bulb = new graphql.GraphQLObjectType({
    name: 'Bulb',
    fields: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },

        state: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
        brightness: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },

        colourMode: { type: ColourMode },
        xy: { type: new graphql.GraphQLList(graphql.GraphQLInt) },
        ct: { type: graphql.GraphQLInt }
    }
});

const schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            bulb: {
                type: Bulb,
                args: {
                    id: { type: graphql.GraphQLString }
                },
                resolve: (_, args) => {
                    return native2graphql(args.id);
                } //fixme implement reference
            }
        }
    })
});

export async function fetch(query) {
    return await native2graphql(graphql(schema, query));
}

export async function put(data) {
    await api.setLightState(state.id, graphql2native(state)).then(() => true, (err) => err).done()
}

function graphql2native(state) {
    const out = lightState.create().on(state.state).brightness(state.brightness);

    if (state.colormode === 0) out.ct(state.ct);
    else if (state.colormode === 1) out.rgb(state.rgb);

    return out;
}

function colourMode2ID(colourMode) {
    if (colourMode === 'ct') return 0;
    else if (colourMode === 'xy') return 1;
    else return -1;
}

async function native2graphql(id) {
    const status = await api.lightStatus(1);
    const graphql = {
        id,
        name: status.name,

        state: status.state.on,
        brightness: Math.floor((status.state.bri / 255) * 100),

        colourMode: colourMode2ID(status.colormode)
    };

    if (status.colormode === 'ct') graphql.ct = status.ct;
    else if (status.colormode === 'xy') graphql.xy = status.xy;

    return graphql;
}
