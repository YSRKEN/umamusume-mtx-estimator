import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { Link } from 'gatsby'

const ResultPage: React.FC = () => {
  const [pickupProb,] = useLocalStorageState('pickupProb', '0.75')
  const [wantedCardCount,] = useLocalStorageState('wantedCardCount', '5')
  const [nowJewelCount,] = useLocalStorageState('nowJewelCount', '15000')

  return <>
    <title>ウマ娘ガチャ回数推定機</title>
    <div className="container">
      <div className="row my-3">
        <div className="col text-center">
          <h1 className="text-nowrap">計算結果</h1>
        </div>
      </div>
      <div className="row my-3 justify-content-center">
        <div className="col-sm-8">
          <span>ピックアップ：{pickupProb}％</span>
          <br />
          <span>必要な枚数：{wantedCardCount}枚</span>
          <br />
          <span>ジュエルの個数：{nowJewelCount}個</span>
          <br />
          <Link className="btn btn-lg btn-outline-primary mt-3 w-100" to="/"><strong>入力ページに戻る</strong></Link>
        </div>
      </div>
    </div>
  </>
}

export default ResultPage
