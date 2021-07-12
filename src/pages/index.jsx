import { useState } from "react"
import axios  from "axios"


  function Home() {
    const [url, setUrl] = useState('')
    const retentionUrl = (e) => {
      setUrl(() => e.target.value)
    }

    const buttonEvent = async() => {
      const imageUrl = fetch(url)
      // const imageUrl = await axios.get(url)
      console.log(imageUrl)
    }


    return (
      <>
        <p>url</p>
        <input value={url} onChange={retentionUrl} type={url} />
        <button onClick={buttonEvent}>analyze</button>
      </>
    )
  }



export default Home;