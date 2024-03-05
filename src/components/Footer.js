import React from "react"

function Footer(props) {

  return (
    <>
            <div className="container-fluid">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className={`nav-link px-2  ${props.mode ? "text-black" : "text-white"} `} >Home</a></li>
                    <li className="nav-item"><a href="#" className={`nav-link px-2  ${props.mode ? "text-black" : "text-white"} `} >Features</a></li>
                    <li className="nav-item"><a href="#" className={`nav-link px-2  ${props.mode ? "text-black" : "text-white"} `} >FAQs</a></li>
                    <li className="nav-item"><a href="#" className={`nav-link px-2  ${props.mode ? "text-black" : "text-white"} `} >About</a></li>
                    </ul>
                    <p className={`text-center ${props.mode ? "text-black" : "text-white"} `} >&copy; 2024, mertuzel.</p>
                </footer>
                </div>
    </>
  )
}

export default Footer