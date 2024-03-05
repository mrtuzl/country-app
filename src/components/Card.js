import React from "react";
import { GrFormNextLink } from "react-icons/gr";


function Card(props) {

    return (
      <>
      {
        props.countries.map((countryContent) => (
            <div className={`card shadow ${props.mode ? "bg-light light" : "dark"}`} key={countryContent.id}>
            <img src={countryContent.img} className="card-img border border-2" alt="..."/>
            <div className="card-body">
                <h5 className="card-title fs-6"> {countryContent.name}</h5>
                <p className="card-text">Capital: <span> {countryContent.capital} </span></p>
                <p className="card-text">Population: <span> {countryContent.population} </span></p>
                <p className="card-text">Region: <span> {countryContent.region} </span></p>
                <a href="#" className={`btn shadow-sm ${props.mode ? "btn-light" : "btn-dark"}`}
                onClick={() => {props.setSelectedCard(countryContent.name)}}>
                <GrFormNextLink
                size={20} />
                </a>
            </div>
            </div>
        ))
      }
      </>
    )
  }
  export default Card