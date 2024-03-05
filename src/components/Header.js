import { BiWorld } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import React from "react";

function Header(props) {

  const handleSubmit = (e) => {
        e.preventDefault();
        props.setIsSearch(true);
  }
  const handleSearch = (e) => {
        props.setSearch(e.target.value);
  }

  return (
    <>
     <nav className="navbar">
        <div className="container-fluid">
            <a className={`navbar-brand d-flex align-items-center fw-bold ${props.mode ? "text-dark" : "text-light"} `} 
            href="#" onClick={() => window.location.reload()}>  <BiWorld className="m-1" /> Country App </a>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" 
            type="search" placeholder="Country name.." 
            aria-label="Search"
            value={props.search}
            onChange={handleSearch}/>
            <button className="btn btn-primary search" type="submit"> <IoSearchSharp size={15} className="m-1"/>Search</button>
            </form>
        </div>
     </nav>
    </>
  )
}

export default Header