export default function getPath(req) {
  return req.url.split('?')[0]
}
