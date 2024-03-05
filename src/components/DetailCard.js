import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { BiSolidPointer } from "react-icons/bi";
import Map from "./Map";


function DetailCard(props) {

  const handleGoBack = () => {
    props.setSelectedCard("")
  };

    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col-xl-2">
              <button className="btn btn-primary back d-flex align-items-center" onClick={handleGoBack}> <IoArrowBackCircle className="m-1" size={20}/> Back </button>
          </div>
          <div className={`col-xl-10 card detail shadow d-flex  ${props.mode ? "light" : "dark"}`}>
            <div className="row text-center">
                <div className="col-xl-3">
                {
            props.country.map((countryDetail) => (
              <div className="" key={countryDetail.id}>
                 <h5 className="card-title fs-5"> {countryDetail.name} </h5>
              </div>
            ))
          }
                </div>
            </div>
            <div className="row d-flex justify-content-start">
              <div className="col-xl-3">
              {
            props.country.map((countryDetail) => (
              <div className="" key={countryDetail.id}>
                 <img src={countryDetail.img} className="card-img border border-2" alt="..."/>
              </div>
            ))
          }
              </div>
              <div className="col-xl-4">
              {
            props.country.map((countryDetail) => (
              <div className="card-body"  key={countryDetail.id}>
                  <p className="card-text"> Official Name: <span> {countryDetail.nameOfficial} </span></p> 
                  <p className="card-text"> Capital: <span> {countryDetail.capital} </span></p>
                  <p className="card-text"> Population: <span>{countryDetail.population} </span></p>
                  <p className="card-text"> Region: <span>{countryDetail.region} </span></p>
              </div>
            ))
          }
              </div>
              <div className="col-xl-4"> 
              {
            props.country.map((countryDetail) => (
              <div className="card-body"  key={countryDetail.id}>
                  <p className="card-text"> Sub Region: <span>{countryDetail.subRegion} </span></p>
                  <p className="card-text"> Currencies: <span>{countryDetail.currencies} </span></p>
                  <p className="card-text"> Languages: <span>{countryDetail.languages} </span></p>
                  <p className="card-text"> Borders:<span>{countryDetail.borders.length === 0 ? "No Border" : countryDetail.borders} </span> </p>
              </div>
            ))
          }
              </div>
                    <div className="row p-0">
                        <div className="col-xl-12">
                        {
            props.country.map((countryDetail) => (
              <div className="card-body"  key={countryDetail.id}>
                <Map map={countryDetail.map}/>
                  <a
                  href={countryDetail.map}
                  target="_blank"
                  className={`fs-6 text-decoration-none p-1 d-flex align-items-center justify-content-end ${props.mode ? " text-secondary" : "text-light"}`}> 
                   OpenStreetMap
                   <BiSolidPointer size={15} className="text-secondary"/>
                   </a>
                </div>
            ))
          }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  export default DetailCard