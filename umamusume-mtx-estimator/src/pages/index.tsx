import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ConfigForm from '../components/ConfigForm'

const MainPage: React.FC = () => <>
  <title>ウマ娘ガチャ回数推定機</title>
  <div className="container">
    <div className="row my-3">
      <div className="col text-center">
        <h1 className="text-nowrap">ウマ娘ガチャ回数推定機(β)</h1>
      </div>
    </div>
    <div className="row my-3 justify-content-center">
      <div className="col-sm-8">
        <ConfigForm />
      </div>
    </div>
  </div>
</>

export default MainPage
