import React, { useState } from 'react'
import "./css/Home.css";
import axios from 'axios';
import Navbar from './Navbar';


export default function Home({setCount}) {
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState({});
  const [result, setResult] = useState(false);
  const [image, setImage] = useState(null);
  const obj = {
    0: {
      "color_code": "#66FF99",
      "risk_level": "Very Low",
      "condition_comment": "Excellent coating with negligible indication of coating failure",
      "coating_condition": "Good"
    },
    1: {
      "color_code": "#66FF99",
      "risk_level": "Low",
      "condition_comment": "Minor spot rusting",
      "coating_condition": "Good"
    },
    2: {
      "color_code": "#66FF99",
      "risk_level": "Low Medium",
      "condition_comment": "Spot rusting without visible coating, Failure is less than 3% of the area under consideration, Rusting is less than 20% of ages or welled lines",
      "coating_condition": "Good"
    },
    3: {
      "color_code": "yellow",
      "risk_level": "Medium",
      "condition_comment": "Breakdown of coating or rust penetration is greater than 3% but less than 10% of the area, Hard Rust Scale is less than 5% of the area, Rusting in the area is greater than 20% but less than 35% of ages or welled lines",
      "coating_condition": "Fair"
    },
    4: {
      "color_code": "yellow",
      "risk_level": "Medium High",
      "condition_comment": "Breakdown of coating or rust penetration is greater than 10% but less than 20% of the area, Hard Rust Scale is greater than 5% of the area but less than 10% of the area, Rusting in the area is greater than 35% but less than 50% of ages or welled lines",
      "coating_condition": "Fair"
    },
    5: {
      "color_code": "Red",
      "risk_level": "High",
      "condition_comment": "Breakdown of coating or rust penetration is greater than 20% but less than 30% of the area, Hard Rust Scale is greater than 10% of the area but less than 20% of the area, Rusting in the area is greater than 50% but less than 75% of ages or welled lines",
      "coating_condition": "Fair"
    },
    6: {
      "color_code": "Red",
      "risk_level": "Very High",
      "condition_comment": "Breakdown of coating or rust penetration is greater than 30%, Hard Rust Scale is greater than 20% of the area, Rusting in the area is greater than 75% of ages or welled lines",
      "coating_condition": "Fair"
    },
  }
  const submit = async()=> {
    const reader = new FileReader();
    reader.onload = ()=> {
        setImage(reader.result);
    }
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);
    let jsonData = {
      filename: file.name
    }
    // const url = "http://127.0.0.1:5000/v1/api/rust_"
    const url = "https://rust-api-oxf0.onrender.com/v1/api/rust_"
    
    let response = await axios.post(url, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let data = await response.data;
    console.log(data);
    setDetails(data);
    setResult(true);
  }
  const [zoomed, setZoomed] = useState(false);
  return (
    <div className="body1">
      <Navbar setCount={setCount} />
      {result && 
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 class="p-4 mt-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', border: '1px solid #FFF', fontSize: '50px', borderRadius: '15px', color: 'white'}}>Result</h1>
          <h4 className="text-light">Rust Analysis</h4>
      </div>
      }
      {result ? 
        <div className="d-flex align-items-center justify-content-center flex-row">
          <div className="col-6 d-flex flex-column align-items-center justify-content-center">
            <h5 className="text-light">Uploaded Image</h5>
            <p>Filename: {file.name}</p>
            <img 
              src={image} 
              className={`bg-light p-1 mt-2 ${zoomed ? 'zoom-in':'zoom-out'}`}
              height={400}
              onClick={()=> setZoomed(!zoomed)}
              width={575}
              alt="image" 

            />
          </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-center m-auto m-4">
            <p className="m-0 fw-bold fs-4 p-3" style={{"color": "#FFF", border: `1px solid ${obj[details.prediction].color_code}`, backgroundColor: 'rgb(0,0,0,0.6)', borderRadius: 6}}>
              {/* Result : {data.result} | Percentage : {(1-data.prediction)*100}% */}
              <b>Grading Point : <span style={{color: obj[details.prediction].color_code}}> {details.prediction} </span> </b> <br/>
              Coating condition : <span style={{color: obj[details.prediction].color_code}}>{obj[details.prediction].coating_condition}</span><br/>
              Risk level  : <span style={{color: obj[details.prediction].color_code}}>{obj[details.prediction].risk_level}</span><br/>
              Condition comment : <span style={{color: obj[details.prediction].color_code}}>{obj[details.prediction].condition_comment}</span><br/>
            </p>
          </div>
        </div>
      :
    <div className='d-flex flex-row'>
      <div className="col-8 p-2 align-content-center align-items-center justify-content-center m-auto m-5">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <h3>Infomaticae Technologies</h3>
          <h1 className="text-primary">Rust Analysis</h1>
          <p className="fs-5 fw-bold text-danger">
            Your onestop solution for analyzing hull images
          </p>
        </div>
      </div>
      <div className="col-4 p-2 align-items-center justify-content-center m-auto mt-5">
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
          <div className="mb-0 m-0">
            <label htmlFor="formFile" id="dropcontainer" className="form-label drop-container">
              <span className="drop-title">Drop a file here</span>
              or
              <input type="file" id='formFile' onChange={(e)=> setFile(e.target.files[0])} name="file" accept='image/x-png,image/gif,image/jpeg' required/>

            </label>
          </div>
          <button className="btn btn-primary" type="submit" onClick={submit} disabled={file===null}>
            Analyze Now!
          </button>
        </div>
      </div>
    </div>}
    </div>
  )
}
