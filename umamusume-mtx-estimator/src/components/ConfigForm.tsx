import * as React from 'react'

const ConfigForm: React.FC = () => {
  const [pickupProb, setPickupProb] = React.useState('0.75');
  const [wantedCardCount, setWantedCardCount] = React.useState('5');
  const [nowJewelCount, setNowJewelCount] = React.useState('15000');

  return <form>
    <div className="form-group">
      <label htmlFor="pickupProb" className="form-label">ピックアップの確率(％単位)</label>
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
    <button type="button" className="btn btn-lg btn-outline-primary my-3 w-100"><strong>計算！</strong></button>
  </form>
}

export default ConfigForm