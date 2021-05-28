import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { Link } from 'gatsby'
import { simulate } from '../services/simulation'

const ResultPage: React.FC = () => {
  const [pickupProb,] = useLocalStorageState('pickupProb', '0.75')
  const [wantedCardCount,] = useLocalStorageState('wantedCardCount', '5')
  const [nowJewelCount,] = useLocalStorageState('nowJewelCount', '15000')
  const [maxJewelCount, setMaxJewelCount] = useState('計算中...');
  const [minJewelCount, setMinJewelCount] = useState('計算中...');
  const [line50JewelCount, setLine50JewelCount] = useState('計算中...');
  const [line95JewelCount, setLine95JewelCount] = useState('計算中...');
  const [line99JewelCount, setLine99JewelCount] = useState('計算中...');

  useEffect(() => {
    // 計算処理
    const result = simulate(pickupProb, wantedCardCount);
    if (result.result === 'OK') {
      const nowJewelCountInt = parseInt(nowJewelCount, 10);
      const toString = (jewelCount: number) => {
        const temp = jewelCount * 1500 - nowJewelCountInt;
        if (temp > 0) {
          return `10連が${jewelCount}回、追加ジュエルは${temp}個`;
        } else {
          return `10連が${jewelCount}回、ジュエルは${-temp}個余る`;
        }
      };
      setMaxJewelCount(toString(result.data.max));
      setMinJewelCount(toString(result.data.min));
      setLine50JewelCount(toString(result.data.line50));
      setLine95JewelCount(toString(result.data.line95));
      setLine99JewelCount(toString(result.data.line99));
    } else {
      setMaxJewelCount('---');
      setMinJewelCount('---');
      setLine50JewelCount('---');
      setLine95JewelCount('---');
      setLine99JewelCount('---');
    }
  }, [pickupProb, wantedCardCount, nowJewelCount]);

  return <>
    <title>ウマ娘ガチャ回数推定機(β)</title>
    <div className="container">
      <div className="row my-3">
        <div className="col text-center">
          <h1 className="text-nowrap">計算結果</h1>
        </div>
      </div>
      <div className="row my-3 justify-content-center">
        <div className="col-sm-8">
          <div className="mb-3">
            <h4>最小のガチャ回数</h4>
            <span>　<strong>{minJewelCount}</strong></span>
          </div>
          <div className="mb-3">
            <h4>50％の確率で揃うガチャ回数</h4>
            <span>　<strong>{line50JewelCount}</strong></span>
          </div>
          <div className="mb-3">
            <h4>95％の確率で揃うガチャ回数</h4>
            <span>　<strong>{line95JewelCount}</strong></span>
          </div>
          <div className="mb-3">
            <h4>99％の確率で揃うガチャ回数</h4>
            <span>　<strong>{line99JewelCount}</strong></span>
          </div>
          <div className="mb-3">
            <h4>最大のガチャ回数</h4>
            <span>　<strong>{maxJewelCount}</strong></span>
          </div>
          <Link className="btn btn-lg btn-outline-primary mt-3 w-100" to="/"><strong>入力ページに戻る</strong></Link>
        </div>
      </div>
    </div>
  </>
}

export default ResultPage
