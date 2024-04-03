import { randomIndex } from "./utils";

export const wheelConfig = (prizes) => {
  return {
    id: "luckywheel",
    config: function (callback) {
      callback && callback(prizes);
    },
    mode: "both",
    getPrize: function (callback) {
      var rand = randomIndex(prizes);
      var chances = rand;
      callback && callback([rand, chances]);
    },
  };
};
