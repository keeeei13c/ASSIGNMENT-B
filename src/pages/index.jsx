import { useState, useCallback } from 'react'
import axios from 'axios'

import FindInPageIcon from '@material-ui/icons/FindInPage'
import { Button, TextField, Typography, Divider } from '@material-ui/core'

const Home = () => {
  const [url, setUrl] = useState('')
  const [labelData, setLabelData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const retentionUrl = (e) => {
    setUrl(() => e.target.value)
  }

  const getVision = useCallback(async () => {
    try {
      const res = await axios.post('/api/vision', {
        url: url,
      })
      setLabelData(res.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }, [url])

  if (error) {
    return <div>{error.message}</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <>
      <Typography
        style={{
          fontFamily: 'roboto',
          margin: '0 20px 20px',
        }}
        variant='h5'>
        Example App / Exam v2
      </Typography>

      <TextField
        style={{
          marginLeft: '20px',
        }}
        id='outlined-required'
        label='Image URL '
        variant='outlined'
        size='small'
        value={url}
        onChange={retentionUrl}
        type={url}
      />
      <Button
        style={{
          fontFamily: 'roboto',
          marginLeft: '10px',
          backgroundColor: '#3f51b5',
          color: 'white',
        }}
        type='submit'
        variant='contained'
        onClick={getVision}>
        <FindInPageIcon
          style={{
            color: 'white',
          }}
        />
        ANALYZE
      </Button>

      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {labelData.length !== 0 &&
            labelData.data.map((label) => {
              return (
                <>
                  <tr>
                    <td key={label.description}>
                      {label.description}
                    </td>

                    <td key={label.score}>
                      {`${(label.score * 100).toFixed(4)} %`}
                    </td>
                  </tr>
                  <Divider />
                </>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Home
