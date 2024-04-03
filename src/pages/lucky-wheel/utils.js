import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const calcRandom = (prizes, rand) => {
  let prizeIndex = null;

  switch (rand) {
    case rand < prizes[4].percentpage:
      prizeIndex = 4;
      break;
    case rand < prizes[4].percentpage + prizes[3].percentpage:
      prizeIndex = 3;
      break;
    case rand <
      prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage:
      prizeIndex = 2;
      break;
    case rand <
      prizes[4].percentpage +
        prizes[3].percentpage +
        prizes[2].percentpage +
        prizes[1].percentpage:
      prizeIndex = 1;
      break;
    case rand <
      prizes[4].percentpage +
        prizes[3].percentpage +
        prizes[2].percentpage +
        prizes[1].percentpage +
        prizes[0].percentpage:
      prizeIndex = 0;
      break;
    default:
      break;
  }

  return prizeIndex;
};

export const randomIndex = (prizes, isPercentage) => {
  let counter = 1;
  if (isPercentage) {
    for (let i = 0; i < prizes.length; i++) {
      if (prizes[i].number === 0) {
        counter++;
      }
    }
    if (counter === prizes.length) {
      return null;
    }
    let rand = Math.random();
    let prizeIndex = calcRandom(prizes, rand);
    console.log(rand);

    if (prizes[prizeIndex].number !== 0) {
      prizes[prizeIndex].number = prizes[prizeIndex].number - 1;
      return prizeIndex;
    } else {
      return randomIndex(prizes);
    }
  } else {
    counter = 0;
    for (let i = 0; i < prizes.length; i++) {
      if (prizes[i].number === 0) {
        counter++;
      }
    }
    if (counter === prizes.length) {
      return null;
    }
    var rand = (Math.random() * prizes.length) >>> 0;
    if (prizes[rand].number !== 0) {
      prizes[rand].number = prizes[rand].number - 1;
      return rand;
    } else {
      return randomIndex(prizes);
    }
  }
};

function showMsg(msg) {
  alert(msg);
}

export const getCssInfo = () => {
  let cssPrefix = null;
  let eventPrefix = null;
  const vendors = {
    "": "",
    Webkit: "webkit",
    Moz: "",
    O: "o",
    ms: "ms",
  };

  const testEle = document.createElement("p");

  Object.keys(vendors).some((vendor) => {
    if (
      testEle.style[vendor + (vendor ? "T" : "t") + "ransitionProperty"] !==
      undefined
    ) {
      cssPrefix = vendor ? "-" + vendor.toLowerCase() + "-" : "";
      eventPrefix = vendors[vendor];

      return true;
    }
    return false;
  });

  return {
    cssPrefix: cssPrefix,
    transform: cssPrefix ? `${cssPrefix}Transform` : "Transform".toLowerCase(),
    transitionEnd: eventPrefix
      ? `${eventPrefix}TransitionEnd`
      : "TransitionEnd".toLowerCase(),
  };
};

export const draw = (opts, prizes) => {
  const num = prizes.length;
  const { transform } = getCssInfo();
  opts = opts || {};
  if (!opts.id || num >>> 0 === 0) return;

  var id = opts.id,
    rotateDeg = 360 / num / 2 + 90,
    ctx,
    prizeItems = document.createElement("ul"),
    turnNum = 1 / num,
    html = [];

  const ele = document.getElementById(id);
  const canvas = ele.querySelector(".hc-luckywheel-canvas");
  const container = ele.querySelector(".hc-luckywheel-container");
  const btn = ele.querySelector(".hc-luckywheel-btn");

  if (!canvas.getContext) {
    showMsg("Browser is not support");
    return;
  }

  ctx = canvas.getContext("2d");

  for (var i = 0; i < num; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(250, 250); // Center Point
    ctx.moveTo(0, 0);
    ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180);
    ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false); // Radius
    if (i % 2 == 0) {
      ctx.fillStyle = "#ffb820";
    } else {
      ctx.fillStyle = "#ffcb3f";
    }
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#e4370e";
    ctx.stroke();
    ctx.restore();
    html.push('<li class="hc-luckywheel-item"> <span style="');
    html.push(transform + ": rotate(" + i * turnNum + 'turn)">');
    if (opts.mode === "both") {
      html.push("<p id='curve'>" + prizes[i].text + "</p>");
      html.push('<img src="' + prizes[i].img + '" />');
    } else if (prizes[i].img) {
      html.push('<img src="' + prizes[i].img + '" />');
    } else {
      html.push('<p id="curve">' + prizes[i].text + "</p>");
    }
    html.push("</span> </li>");
    if (i + 1 === num) {
      prizeItems.className = "hc-luckywheel-list";
      container.appendChild(prizeItems);
      prizeItems.innerHTML = html.join("");
    }
  }
};

export const showResult = (data) => {
  if (data == null) {
    MySwal.fire("Chương trình kết thúc", "Đã hết phần thưởng", "error");
  } else if (data === "Chúc bạn may mắn lần sau") {
    MySwal.fire("Bạn không trúng thưởng", data, "error");
  } else {
    MySwal.fire("Đã trúng giải", data, "success");
  }
};
