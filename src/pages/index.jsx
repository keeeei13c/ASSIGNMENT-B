import { useState, useCallback } from 'react'
import axios from 'axios'

import FindInPageIcon from '@material-ui/icons/FindInPage'
import { Button, TextField, Typography,Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles({
  title: {
    margin: '20px',
  },
  textField: {
    marginLeft: '20px',
    marginBottom: '40px',
  },
  button: {
    marginLeft: '10px',
    padding: '7.5px',
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  table: {
    maxWidth: 500,
  },
  tableHead:{
    fontWeight: 'bold'
  }
})

const Home = () => {
  const classes = useStyles()
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
      <Container>
        <Typography
          className={classes.title}
          variant='h5'>
          Example App / Exam v2
        </Typography>

        <TextField
          className={classes.textField}
          id='outlined-required'
          label='Image URL '
          variant='outlined'
          size='small'
          onChange={retentionUrl}
          value={url}
          type={url}
        />
        <Button
          className={classes.button}
          variant='contained'
          onClick={getVision}>
          <FindInPageIcon />
          ANALYZE
        </Button>

        <TableContainer>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labelData.length !== 0 &&
                labelData.data.map((label) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell key={label.description}>
                          {label.description}
                        </TableCell>
                        <TableCell key={label.score}>
                          {`${(label.score * 100).toFixed(4)} %`}
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Home
