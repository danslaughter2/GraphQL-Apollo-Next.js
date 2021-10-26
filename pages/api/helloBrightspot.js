import Handler from '../../rest/handler'

const handler = new Handler('./components/HelloBrightspot/helloBrightspot.graphql', ['id', 'path'])
export default async (req, res) => {
  await handler.handle(req, res)
}