import React, { useState } from 'react'
import "./css/Home.css";
import axios from 'axios';
import Navbar from './Navbar';


export default function Batch({setCount}) {
  const [files, setFiles] = useState(null);
  const [result, setResult] = useState(false);
  const [output,setOutput] = useState([])
  const [corrosion, setCorrosion] = useState(0)
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
      "coating_condition": "Poor"
    },
    6: {
      "color_code": "Red",
      "risk_level": "Very High",
      "condition_comment": "Breakdown of coating or rust penetration is greater than 30%, Hard Rust Scale is greater than 20% of the area, Rusting in the area is greater than 75% of ages or welled lines",
      "coating_condition": "Poor"
    },
  }
  const [loading, setLoading] = useState(false);
  const [good, setGood] = useState(0);
  const [fair, setFair] = useState(0);
  const [poor, setPoor] = useState(0);
  const submit = async()=> {
    let count = 0;
    setLoading(true);
    console.log(files)
    let good_ = 0;
    let fair_ = 0;
    let poor_ = 0;
    for(let i=0; i<files.length; i++){
      var image = null
      setLoading_num((i/files.length)*100);
      const reader = new FileReader();
      reader.onload = ()=> {
        image = reader.result
      }
      let file = files[i]
      console.log(file)
      reader.readAsDataURL(file);
        
        
        let formData = new FormData();
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
        if(data.prediction>3){
          count++;
        }
        if(data.prediction < 3){
          good_++
        }
        if (data.prediction >= 3 && data.prediction <5){
          fair_++
        }
        if(data.prediction >= 5){
          poor_++
        }
        console.log(data.prediction);
        console.log(obj[data.prediction])
        console.log("img", image);
        output.push({data,file,image})
      }
      setGood(good_);
      setFair(fair_);
      setPoor(poor_);
      console.log(output)
      console.log(count)
      setResult(true);
      setLoading(false);
      setCorrosion(count*100)
    }

  const [zoomed, setZoomed] = useState(null);
  const [loading_num, setLoading_num] = useState(0);
  return (
    <div className="body1">
      <Navbar setCount={setCount} />
      {loading &&
      <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '80vh'}}>
        <div class="spinner-border text-primary" role="status" style={{width: '5rem', height: '5rem'}}>
          <span class="visually-hidden">Loading...</span>
        </div>
        <p className='m-1 fw-bold fs-2 text-dark'>{loading_num.toFixed(0)}% Loading</p>
      </div>
      }
      {!loading && result ? <div className='ms-5'>
        <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 class="p-4 mt-4" style={{backgroundColor: 'rgb(0, 0, 0, 0.5)', border: '1px solid #FFF', fontSize: '70px', borderRadius: '15px', color: 'white'}}>Result</h1>
        <h4 className="text-light">Rust Analysis</h4>
        <p className="m-0 fw-bold fs-4">
          Conclusion : {(corrosion/output.length).toFixed(2)}% of your images shown corrosion
        </p>
        <div className="d-flex flex-row justify-content-between">
          <p className="m-3 fw-bold fs-5">
            Good : {good}
          </p>
          <p className="m-3 fw-bold fs-5">
            Fair : {fair}
          </p>
          <p className="m-3 fw-bold fs-5">
            Poor : {poor}
          </p>
        </div>
        <button className="btn btn-primary mt-3" type="submit" onClick={()=> {
            setResult(false);
            setOutput([]);
          }}>
            Analyze Again
          </button>
      </div>
      </div>:
      <div></div>
      }
      
      {!loading && result ? 
      // {console.log(output)}
      
      output.map(({data,file,image})=> { return (
        <div className="d-flex align-items-center justify-content-center flex-row" style={{borderBottom: '1px solid #FFFF', borderRadius: '8px'}}>
          
          <div className="col-6 d-flex flex-column align-items-center justify-content-center m-4">
            <h5 className="text-light">Uploaded Image</h5>
            <p>Filename: {file.name}</p>
            <img 
              src={image} 
              className={`bg-light p-1 mt-2 mb-2`}
              height={400}
              onClick={()=> {
                if(zoomed === image){
                  setZoomed(null);
                } else {
                  setZoomed(image);
                }
              }}
              width={575}
              alt="image" 

            />
          </div>
          <div className="col-4 d-flex flex-column align-items-center justify-content-center m-auto m-4">
            <p className="m-0 fw-bold fs-4 p-3" style={{"color": "#FFF", border: `1px solid ${obj[data.prediction].color_code}`, backgroundColor: 'rgb(0,0,0,0.6)', borderRadius: 6}}>
              {/* Result : {data.result} | Percentage : {(1-data.prediction)*100}% */}
              <b>Grading Point (0-6) : <span style={{color: obj[data.prediction].color_code}}> {data.prediction} </span> </b> <br/>
              Coating condition : <span style={{color: obj[data.prediction].color_code}}>{obj[data.prediction].coating_condition}</span><br/>
              Risk level  : <span style={{color: obj[data.prediction].color_code}}>{obj[data.prediction].risk_level}</span><br/>
              Condition comment : <span style={{color: obj[data.prediction].color_code}}>{obj[data.prediction].condition_comment}</span><br/>
            </p>
          </div>
        </div>)}
      )
      :
    !loading && <div className='d-flex flex-row'>
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
