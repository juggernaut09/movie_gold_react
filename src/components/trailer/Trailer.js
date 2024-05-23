import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import './Trailer.css';

import React from 'react'

export const Trailer = () => {
    let params = useParams();
    let key = params.ytTrailerId;

  return (
    <div className="react-player-container">
        {(key!=null) ? <ReactPlayer controls = "true" playing={true} url={`https://www.youtube.com/watch?v=${key}`}/>:null}
    </div>
  )
}
