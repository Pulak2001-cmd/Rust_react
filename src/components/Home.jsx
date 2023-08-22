import React, { useState } from 'react'
import "./css/Home.css";
import axios from 'axios';
import Navbar from './Navbar';


export default function Home({setCount}) {
  const [file, setFile] = useState(null);
  const submit = async()=> {
    const formData = new FormData();
    formData.append('file', file);
    const url = "https://rust-api-oxf0.onrender.com/v1/api/Rust"
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    let data = await response.data;
    console.log(data);
  }
  return (
    <div className="body1">
      <Navbar setCount={setCount} />
    <div className='d-flex flex-row'>
      <div className="col-8 p-2 align-content-center align-items-center justify-content-center m-auto m-5">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <h1>Infomaticae</h1>
          <h1 className="text-primary">Rust Image Analysis</h1>
          <p className="fs-5 fw-bold text-danger">
            Your onestop solution for analyzing rust images
          </p>
        </div>
      </div>
      <div className="col-4 p-2 align-items-center justify-content-center m-auto mt-5">
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
          <div className="mb-0 m-0">
            <label htmlFor="formFile" id="dropcontainer" className="form-label drop-container">
              <span className="drop-title">Drop files here</span>
              or
              <input type="file" id='formFile' onChange={(e)=> setFile(e.target.files[0])} name="file" accept='image/x-png,image/gif,image/jpeg' required/>

            </label>
          </div>
          <button className="btn btn-primary" type="submit" onClick={submit} disabled={file===null}>
            Analyze Now!
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
