import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/Header"
import ConfigForm from "../components/ConfigForm"

const MainPage: React.FC = () =>
  <div className="container">
    <div className="row my-3">
      <div className="col text-center">
        <Header />
      </div>
    </div>
    <div className="row my-3 justify-content-center">
      <div className="col-sm-8">
        <ConfigForm />
      </div>
    </div>
  </div>

export default MainPage
