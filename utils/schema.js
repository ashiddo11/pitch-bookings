export const Schema = {
  title: 'booking schema',
  version: 0,
  primaryKey: {
    // where should the composed string be stored
    key: 'bookingId',
    // fields that will be used to create the composed key
    fields: [
        'pitchId',
        'startTime'
    ],
    // separator which is used to concat the fields values.
    separator: '|'
  },
  type: 'object',
  properties: {
    bookingId: {
      type: 'string',
      maxLength: 100
    },
    pitchId: {
        type: 'number',
        minimum: 1,
        maximum: 4
    },
    startTime: {
        type: 'string',
        default: "6:30"
    },
    playersCount: {
        type: 'number',
        minimum: 1,
        maximum: 16
    },
    players: {
      type: "array",
      uniqueItems: true,
      items: {
        properties: {
          name: {
            type: "string"
          },
          method: {
            type: "string"
          },
          extra_notes: {
            type: "string"
          }
        }
      }
    }
  },
  required: ['pitchId', 'startTime', 'playersCount', 'bookingId']
}