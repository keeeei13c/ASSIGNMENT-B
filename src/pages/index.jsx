import { useState } from 'react'
import axios from 'axios'

function Home() {
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [labelData, setLabelData] = useState([])
  
  const retentionUrl = (e) => {
    setUrl(() => e.target.value)
  }

  const buttonEvent = async () => {
    const imageUrl = await axios.get(url)
    setImageUrl(imageUrl)

    console.log(imageUrl)

  }
  const getVision = async () => {
    try {
      const response = await axios.post('/api/vision', {
        url: url,
      })
      console.log(response.data)
      setLabelData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <p>url:{ url}</p>
      <input value={url} onChange={retentionUrl} type={url} />
      <button onClick={getVision}>
        analyze
      </button>
    </>
  )
}

export default Home
