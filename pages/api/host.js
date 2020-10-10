import * as os from 'os'

export default async (req, res) => {
  return res.status(200).json({ hostName: os.hostname() })
}
