import { tryParseFloat, tryParseInt } from "./utility"

const LOOP_COUNT = 100000;   // シミュレーションにおける反復回数
type REALITY = '☆1' | '☆2' | '☆3' | 'PU';  // レアリティ

/**
 * 成功時の型
 */
type ResultA = {
  result: 'OK',
  data: {
    line50: number,
    line95: number,
    line99: number,
    max: number,
    min: number,
  },
}
/**
 * 失敗時の型
 */
type ResultB = {
  result: 'NG',
  reason: string,
}
/**
 * 結果型
 */
type Result = ResultA | ResultB;

// ガチャ1回分の試行
const gacha1 = (pickupProb: number): REALITY => {
  // ☆1が79％、☆2が18％、ピックアップ以外の☆3が(3-pickupProb)％、ピックアップがpickupProb％
  const seed = Math.random();
  if (seed < 0.79) {
    return '☆1';
  } else if (seed < 0.97) {
    return '☆2';
  } else if (seed >= 1.0 - pickupProb / 100) {
    return 'PU';
  } else {
    return '☆3';
  }
};

const gacha2 = (pickupProb: number): REALITY => {
  // ☆2が97％、ピックアップ以外の☆3が(3-pickupProb)％、ピックアップがpickupProb％
  const seed = Math.random();
  if (seed < 0.97) {
    return '☆2';
  } else if (seed >= 1.0 - pickupProb / 100) {
    return 'PU';
  } else {
    return '☆3';
  }
};

// 統計上の計算を行う
const calcStatistics = (gachaCountList: number[]) => {
  // 最大回数・最小回数
  const maxCount = Math.max(...gachaCountList);
  const minCount = Math.min(...gachaCountList);

  // 50・95・99％ライン
  const countCount: number[] = [];
  for (let i = 0; i <= maxCount; i += 1) {
    countCount.push(0);
  }
  for (let gachaCount of gachaCountList) {
    countCount[gachaCount] += 1;
  }
  const countCount2: number[] = [];
  for (let i = 0; i <= maxCount; i += 1) {
    countCount2.push(0);
  }
  for (let i = 0; i <= maxCount; i += 1) {
    countCount2[i] = countCount[i];
    if (i > 0) {
      countCount2[i] += countCount2[i - 1];
    }
  }
  let flg50 = false;
  let flg95 = false;
  let flg99 = false;
  let count50 = 0;
  let count95 = 0;
  let count99 = 0;
  for (let i = 0; i <= maxCount; i += 1) {
    if (!flg50 && countCount2[i] > 50 * LOOP_COUNT / 100) {
      count50 = i;
      flg50 = true;
    }
    if (!flg95 && countCount2[i] > 95 * LOOP_COUNT / 100) {
      count95 = i;
      flg95 = true;
    }
    if (!flg99 && countCount2[i] > 99 * LOOP_COUNT / 100) {
      count99 = i;
      flg99 = true;
    }
  }
  return {
    line50: count50,
    line95: count95,
    line99: count99,
    max: maxCount,
    min: minCount,
  };
};

/**
 * シミュレーション処理
 * @param pickupProbString ピックアップされたカードの出る確率(％)
 * @param wantedCardCountString 欲しい枚数
 * @param nowJewelCountString 現在持っている石の数
 * @returns 50％、95％、99％の確率で揃えるために必要な10連の回数
 */
export const simulate = (pickupProbString: string, wantedCardCountString: string): Result => {
  console.log('----------------------------------------');
  console.log(`ピックアップの確率：${pickupProbString}％`);
  console.log(`必要な枚数：${wantedCardCountString}枚`);

  // 入力バリデーション
  const pickupProb = tryParseFloat(pickupProbString)
  const wantedCardCount = tryParseInt(wantedCardCountString)
  if (pickupProb === null || wantedCardCount === null) {
    return {
      result: 'NG',
      reason: '入力された数値に書式エラーが見つかりました.',
    }
  }

  // シミュレーション開始
  const gachaCountList: number[] = [];
  for (let i = 0; i < LOOP_COUNT; i += 1) {
    // 初期状態を生成
    let cardCount = 0;
    let pointCount = 0;
    for (let gachaCount = 0; ; gachaCount += 1) {
      // 終了条件を確認する
      if (cardCount + Math.floor(1.0 * pointCount / 200) >= wantedCardCount) {
        gachaCountList.push(gachaCount);
        break;
      }
      // 10連を回す
      for (let i = 0; i < 9; i += 1) {
        const result = gacha1(pickupProb);
        if (result === 'PU') {
          cardCount += 1;
        }
        pointCount += 1;
      }
      const result = gacha2(pickupProb);
      if (result === 'PU') {
        cardCount += 1;
      }
      pointCount += 1;
    }
  }

  // 統計を取り、結果を返す
  const data = calcStatistics(gachaCountList);
  console.log(`最大数：10連を${data.max}回`);
  console.log(`最小数：10連を${data.min}回`);
  console.log(`50％ライン：10連を${data.line50}回`);
  console.log(`95％ライン：10連を${data.line95}回`);
  console.log(`99％ライン：10連を${data.line99}回`);

  return {
    result: 'OK',
    data,
  }
}