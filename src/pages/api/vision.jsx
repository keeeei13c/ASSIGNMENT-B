import vision from '@google-cloud/vision'

const client = new vision.ImageAnnotatorClient()

export default async function handler(req, res) {
  vision: process.env.GOOGLE_APPLICATION_CREDENTIALS
  const url = req.body.url
  const [result] = await client.labelDetection(url)
  res.status(200).json({ data: result.labelAnnotations})
}
