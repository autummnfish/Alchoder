import { atom } from "recoil";
export const drinkLogState = atom({
  key: "drinkLogState",
  default: [
    {
      title: "登録例",
      array:[{name:"ビール"},{name:"梅酒"},{name:"ウォッカ"}],
    }
  ],
});
