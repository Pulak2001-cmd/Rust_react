import React, { useState } from 'react'
import "./css/Home.css";
import axios from 'axios';
import Navbar from './Navbar';


export default function Batch({setCount}) {
  const [files, setFiles] = useState(null);
  // const [details, setDetails] = useState({});
  const [result, setResult] = useState(false);
  // const [image, setImage] = useState(null);
  const [output,setOutput] = useState([])

  const submit = async()=> {
    console.log(files)
      for(let i=0; i<files.length; i++){
        let image = null
        const reader = new FileReader();
        reader.onload = ()=> {
          image=reader.result
        }
        let file = files[i]
        console.log(file)
        reader.readAsDataURL(file);
        
        
        let formData = new FormData();
        formData.append('file', file);
        const url = "https://rust-api-oxf0.onrender.com/v1/api/Rust"
        let response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        let data = await response.data;
        
        output.push({data,file,image})
      }
      console.log(output)
      setResult(true);
    }

  const [zoomed, setZoomed] = useState(false);
  return (
    <div className="body1">
      <Navbar setCount={setCount} />
      {result ? 
      // {console.log(output)}
      output.map(({data,file,image})=> { return (
        <div className="d-flex align-items-center justify-content-center m-4 flex-row">
          <div className="col-6 d-flex flex-column align-items-center justify-content-center">
            <h5 className="text-light">Uploaded Image</h5>
            <p>Filename: {file.name}</p>
            <img 
              src={image} 
              className={`bg-light p-1 mt-5 ${zoomed ? 'zoom-in':'zoom-out'}`}
              height={400}
              onClick={()=> setZoomed(!zoomed)}
              width={575}
              alt="image" 

            />
          </div>
          <div className="col-6 d-flex flex-column align-items-center justify-content-center">
            <h1 class="p-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', fontSize: '70px', borderRadius: '15px', color: 'white'}}>Result</h1>
            <h4 className="text-light">Rust Analysis</h4>
            <p className="m-0 fw-bold fs-4">
              Result : {data.result} | Percentage : {data.prediction*100}%
            </p>
            <div class="d-flex flex-row">
                <p class="m-0 marker">0</p>
                <p class="m-0 marker">20</p>
                <p class="m-0 marker">40</p>
                <p class="m-0 marker">60</p>
                <p class="m-0 marker">80</p>
                <p class="m-0">100</p>
              </div>
              <div class="progress1">
                <div class="bar7" style={{width: `${750-750*parseFloat(data.prediction)}px`}}></div>
              </div>
              <div class="d-flex flex-column justify-content-between">
                <p class="m-2 fs-3">0 : None</p>
                <p class="m-2 fs-3">20 : Mild</p>
                <p class="m-2 fs-3">40 : Moderate</p>
                <p class="m-2 fs-3">60 : Severe</p>
                <p class="m-2 fs-3">80 : Proliferative</p>
              </div>
          </div>
        </div>)}
      )
      :
    <div className='d-flex flex-row'>
      <div className="col-8 p-2 align-content-center align-items-center justify-content-center m-auto m-5">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <h1>Infomaticae</h1>
          <h1 className="text-primary">HULL INSPECTION AND MAINTENANCE PROGRAM</h1>
          <p className="fs-5 fw-bold text-danger">
            Your onestop solution for analyzing hull images
          </p>
        </div>
      </div>
      <div className="col-4 p-2 align-items-center justify-content-center m-auto mt-5">
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
          <div className="mb-0 m-0">
            <label htmlFor="formFile" id="dropcontainer" className="form-label drop-container">
              <span className="drop-title">Drop files here</span>
              or
              <input type="file" id='formFile' onChange={(e)=> setFiles(e.target.files)} name="files" accept='image/x-png,image/gif,image/jpeg' required multiple/>

            </label>
          </div>
          <button className="btn btn-primary" type="submit" onClick={submit} disabled={files===null}>
            Analyze Now!
          </button>
        </div>
      </div>
    </div>}
    </div>
    
  )
}
