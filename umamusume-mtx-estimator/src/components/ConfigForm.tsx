import * as React from 'react'
import { useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { tryParseFloat, tryParseInt } from '../services/utility';

const ConfigForm: React.FC = () => {
  const [pickupProb, setPickupProb] = useLocalStorageState('pickupProb', '0.75');
  const [wantedCardCount, setWantedCardCount] = useLocalStorageState('wantedCardCount', '5');
  const [nowJewelCount, setNowJewelCount] = useLocalStorageState('nowJewelCount', '15000');
  const [errorMessage, setErrorMessage] = useState('');

  const calc = () => {
    // 入力バリデーション
    const pickupProbFloat = tryParseFloat(pickupProb);
    if (pickupProbFloat === null) {
      setErrorMessage('PUの確率は正しく入力してください。');
      return;
    }
    if (pickupProbFloat < 0.0 || 100.0 < pickupProbFloat) {
      setErrorMessage('PUの確率は0％以上100％以下です。');
      return;
    }
    const wantedCardCountInt = parseInt(wantedCardCount, 10);
    const nowJewelCountInt = tryParseInt(nowJewelCount);
    if (nowJewelCountInt === null) {
      setErrorMessage('ジュエルの数は正しく入力してください。');
      return;
    }
    if (nowJewelCountInt < 0) {
      setErrorMessage('ジュエルの数はマイナスになりません。');
      return;
    }
    console.log(`${pickupProbFloat} ${wantedCardCountInt} ${nowJewelCountInt}`);
    setErrorMessage('');
  };

  return <form>
    {errorMessage !== ''
      ? <div className="alert alert-danger" role="alert"><strong>エラー</strong> - {errorMessage}</div>
      : <></>}
    <div className="form-group">
      <label htmlFor="pickupProb" className="form-label">ピックアップ(PU)の確率(％単位)</label>
      <input id="pickupProb" className="form-control" placeholder="ピックアップの確率(％単位)" value={pickupProb} onChange={(e) => {
        setPickupProb(e.currentTarget.value)
      }} />
    </div>
    <div className="form-group">
      <label htmlFor="wantedCardCount" className="form-label">必要な枚数</label>
      <select id="wantedCardCount" className="form-control" value={wantedCardCount} onChange={(e) => {
        setWantedCardCount(e.currentTarget.value)
      }} >
        <option value="1">1枚</option>
        <option value="2">2枚</option>
        <option value="3">3枚</option>
        <option value="4">4枚</option>
        <option value="5">5枚</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="nowJewelCount" className="form-label">貯めているジュエルの数</label>
      <input id="nowJewelCount" className="form-control" placeholder="貯めているジュエルの数" value={nowJewelCount} onChange={(e) => {
        setNowJewelCount(e.currentTarget.value)
      }} />
    </div>
    <button type="button" className="btn btn-lg btn-outline-primary my-3 w-100" onClick={calc}><strong>計算！</strong></button>
  </form>
}

export default ConfigForm