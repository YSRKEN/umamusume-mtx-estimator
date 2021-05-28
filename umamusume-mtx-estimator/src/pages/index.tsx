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
    <div className="row">
      <div className="col text-center">
        <span className="d-inline-block">最終更新：2021/05/28</span><br />
        <span className="d-inline-block me-3"><a href="#" rel="noreferrer" target="_blank">使い方</a></span>
        <span className="d-inline-block me-3"><a href="https://github.com/YSRKEN/umamusume-mtx-estimator/tree/develop" rel="noreferrer" target="_blank">GitHub</a> </span>
        <span><a href="https://twitter.com/YSRKEN" rel="noreferrer" target="_blank">作者のTwitter</a></span>
      </div>
    </div>
    <hr />
    <div className="row my-3 justify-content-center">
      <div className="col-sm-8">
        <ConfigForm />
      </div>
    </div>
  </div>
</>

export default MainPage
