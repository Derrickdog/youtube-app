import React from 'react';
import { useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import VideoItem from './components/VideoItem';

const API_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyBuNmySrdU4gY6aLxpqRGLO1a8SiNm2i2U'
const MAX_RESULTS = 5;

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [searchTerm, setSearchTerm] = useState([]);

  const searchVideos = async (search) => {
    const response = await fetch(`${API_URL}/search?part=snippet&maxResults=${MAX_RESULTS}&key=${API_KEY}&q=${searchTerm}`);
    const data = await response.json();
    setVideos(data.items);
    setSelectedVideo(data.items[0]);
  }

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Paper elevation={6} style={{padding: '25px'}}>
          <TextField fullWidth label="Search Videos" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
          <Button variant="contained" onClick={() => searchVideos(searchTerm)}>Search</Button>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <VideoPlayer video={selectedVideo} />
      </Grid>
      <Grid item xs={4}>
        {videos?.map((video) => (
          <VideoItem video={video} onVideoSelect={onVideoSelect}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default App;
