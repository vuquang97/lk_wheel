import { useEffect, useState } from "react";
import { apiGetPrizes, apiUpdateAccount } from "../../apis";
import { wheelConfig } from "./constants";
import "./style.css";
import { draw, getCssInfo, randomIndex, showResult } from "./utils";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

var defaultData = [
  {
    text: "Combo giúp việc cho vợ",
    img: "https://lh3.googleusercontent.com/pw/AP1GczP9U5Xa6iQl3J4r0AQ3iGpXS7uyWUG_AYdS89pHOnH7B8yFeKrvEsHIvXCXtaZNt_cH-r6ekfBJJ3hBtC-QdATR-UuFoMnDaoHYN9AQ-YorGF1IbGDbGaCrCvekD8s96wfNxxD1qrk2CP2q_u5ZFkuZZWcCYdHF3PZhCE9DdnjhkJ0rnYgo7yvfPswoKFY4FiV7mcNi0dWBFMSnji9J8k9AJ_--o_Oxslvu3ljnxeXlkmEATeZ8Vaw4j3KJXbY-Yi42ZoIiJbe_DLjHGV9anjcOywkzzH28cFVaKbrIzTPcS6r2-UmVuDnYmChexEHboDF2WFV34sERRWSpdBpbCUj0_IG1itnaxAHw_xXT4mgg2wwQJISy4GJHST9Fu25l1NUiUgmhBXiM2hr9oeQfB30EnXVHhRJmFXIadG7J6fNqcnMAoQJVN0BWTPj34uD3qdsIvdh4Fi8NGV8pIfUQ78KexWBYpvADoQ2HButP7EBE4RLtiestJXFYzp4AFmsT8cB0r9rUUZxhZetkfllLb6NmM89n13KISiz7QZ9Dy9H2xBYRZjrjYxvAJlklNTDf2Nhka5lFKEWXezhYSTB0dc-fImY5y7D8Mu-r0p1H6XHtBPyFEVwbS2sJVQJX6MF9MX8oinVt-FwYQV33FnYfRbsyx7LjrA6ThESkjkIwWxFvDigAKTNmFfrou3NiZH89K4J0iZss_h1RfSYwX0Tc4SjXFwefbOGSKLvoqFvDJEDGl4fVCM8zkpluSLiUn1lgdi-e4G4dakGnzixM_Tyyh3eIuzHyF9pIXAc6CP-ms8jW-yTQHLVNbVza46aXjeSa2c2x-U-eLKJYsWU_czuRw9395siYF2f5qgK5VTOsQNfKv4goh_FddRHdqRAUF9EvHyWbo5EvqGeAYY689lUvv1VNV4FRh9e04_EHZeVxkeOoJ_iKeB9EtUxhk3MmZOiOJOfekIkN1F2e15UIjANwukp0mRidoauk8c6DSwyv48cDFhV5H3ZhbSXjHXbGwA=w600-h586-s-no-gm?authuser=1",
    number: 1,
    percentpage: 0.01,
    fixed: "",
  },
  {
    text: "Tiền thưởng đại gia",
    img: "https://lh3.googleusercontent.com/pw/AP1GczNKZKcjyhtwNZeTWr77uQf_UsuoXCUDb4OPeax1jisCxRL_jUCguSyDAR4ujrFAFHwglXeCV99bG6kMdfzpbqiqeyj4BG2D-COfy95bV-KR4fOtxKzA0y6XLelFBEBbQ26qfyADM7vjHLvdH1vMq026btB5VY551OJcTAFuoBGlXJQPl3o-C-QNM2BU9BRR93J2kPh-kwdgluMidy7YjaJ3gyNLSOhLdRCjwX7b3jK437_ne3Uwvefd__pKdnHXRyJ_L2nKgeTy6hEU0kHS_Zzz5FUlgyoXpVuSCuT2ce1UPH1RlcitTEYpca_XDYyH1vpRVX5GgYfe8Jw91FF9sQXWDv2R7HOJjxvYlRqZdmKRqK2GMnKZB4YU0BDCYcAK_1AUF-AAeY8VMMuX8YIso1ikkofc6rc8yDkC8HZkoBWmUfqRzsuwefTqxFy-XvXRQlAvoUoT0d_ec3extMZ-iVSE_sGl4vzpmI8k7IfYyev2SC3woN0Q1Hs_eeupD25dusVls-Oq10GzexdmuY12y_B7lxVLR10lbEnyAbIEVohVJNFoGnDNI7xELRZlDMJLmvoKoceZlQE_qvkvaMoI6YiHEpyAkp9JeM_VwGEn61_-NooXgVgRRwi0QEMB2U5o2dE6vb8ZxrrB3ml9nb6AIXVM6q0q6haCA-KmUupPYlOkM4E_zDvBLgek6-xIlu2jN6ln8DHapRob4GiAJWGP65oCb4mq-SDAWf_wJyzAvJvN6mQe090AC0zyH-i7_Bv_JtKSS8JEXa1qqAEvJH4lG-QIfuGXU6nFycQFE7j7yWH2MrCO022Ut6AcMwNmuVys9PFTbOOcu-9JgadzuLeu0ac8TGG4s3s5VwKEDYE7CiJ9Nnpbq2prUtIt-7GR_Sa8yORopCV6tXdqvi7rNs3eMpAjGWYfg9Q5RE3qw1ZdfMf97O0ZCqijqeG-bhsKFX2TEp97w8BHXiUB8RWzVPXR2wN2K8EbQgcV2E2qzZNHUmviCUo7ZLV0ljPDUU6tPw=w800-h368-s-no-gm?authuser=1",
    number: 1,
    percentpage: 0.05,
    fixed: "fixed",
  },
  {
    text: "Vũ khí nhân 10 lần vẻ đẹp trai",
    img: "https://lh3.googleusercontent.com/pw/AP1GczMMECO50xEV4hhBeyQOZZlhcZMxHXPpdIGFLLsM88eBczAocnL0aren0ieppdW9tiDMlQzMNjgUMt1JGdtD2QidGTi9VgsiNeBm-72vb2A_LuhwB0ChW5Og3fsgVWKQacJE3USe_qZKWVO1aksFESZ1oOMyL5m1OiHE6575LDp6SBGDty9NX6HqgMlxKRsd79_lIfgvT4OAN6KMiiyUCvvB__ZHzGVJnGFz30WKnle3DdlC-33mOFHeLsE9Vfh2EbQFDNbQubrFKLkiY3bypEVBkMLfPrem4L9cXWV3g8jqQziIWbojhRUveLC_iPqVmunb2fUkQkRmW4IkMD9FnzN03UWYkKcObtzM7pI625n2huxbOWNZGxc9q2Lwv7SUDJToWeGNsLLzYiY3cbuZFe-BO1jYushwOlX95TZz6U_ybeiJh_PSzgAoCri5CNAPEG102yQkKT8eJiRT2gkshJsoCceDZZ2rIzruiNm_0CHJtMFBJmRpxxa-vFI_pcROQdAbF2jk4RWcNe3CzKhkZcd2GDBnxpeHWBnv3717dKz4zeDEvsJKy6kF2UVUNi5Awfdu56v2wMxKDjfFaF2trGAE1Pctb_AvlnYAzydTfJ4ZWRYqWhUPH9RUt7SND0ub1EmqM9MAqaGs7NXQi7xHIPaCCallvvkdZ0JJbivIxYClBhRf467jKTKOLMCJFwhCNyz55HKEnKxpe2T9Jr23-lMwS6bVhUztEpaU62ACiCSa-WoDFy9svIgNubvF6ZiJQnt_7CiGgcwCgs9_ivJUq4EnXAgv-yH3gyupk5fgsMiRyAcncU13mLGrqcb7Nd84UgRZGu4MidqKUJ5c9fjz2x0dE5sRwvHecZoH5Plca-XIvNOQ5QRePDjzrD1zhUo_7tP7GCqNdD04bsyaMOWJzh00dMubNHXERbLPreHGN0MIhLZ3f4rLrSt6X5tI2AuP5vAEIKIM5gwX140RtHfuiz2_B1jkvxbJWc2n4haGmSqTI-oTy2-8421vEg4TtQ=w700-h400-s-no-gm?authuser=1",
    number: 1,
    percentpage: 0.1,
    fixed: "",
  },
  {
    text: "Quà tặng đưa ta về tuổi thơ",
    img: "https://lh3.googleusercontent.com/pw/AP1GczNgCYsPqT0T5iCQx3vsruFJKwDyjemmFqrkbPxhMO6GH04FqEczxyFoXWoERlSvJ-eY6J7jy307jvxebqz7lPIQ9q09iWMiYNaStII5_8Y565xr-w-TpHZFII_kqI5H8K2UoxRKB9LC4IjqPwoWqE5GaMAa3Sq5Ko9MEVOThScUEwplq36yVw287hqLI7jWXLjmbJJuipUVW43B4oygZCtR7pA1nx7dutWC1M-rpRtJnmoLyHL6PYrh4gMh8d-3cgLVmSFf4eshnRxqgdsDM53UAsrw6M47A6IJHHGys5dED4ViWRgseN3aNdDci1YNl_YAaqnWUN33pee1yE6-2qT3gbsFQLtgZPVlQU9FqGpOhgG3fWpYdpZ561PR8paAbKELiChvfFCtOpmEL89y-Sb5IgVEHQfX4tkcsPRxzAxiH3U0Ip3BKBxcFh-m_QTqSlj6gYxvX0S7eKE2O_upYlbDf60gns0f65IP8dhvpFvq4mimMnR0k14NYItZ35yW92OMC_eToJX5Gp6dxt1Zg-ivIkTIKeMH01n6QyiMrsKiyob6mQf81f0Q0SppHOpV6XR2QYBla8tzaGzDiE8u4MnympPUpdMr1wr4UyrBN84ELyibqXEYsjWp7thCb1Vo8xQopWXoimuZ3-uefxEFISh_tK7P-mNKLwnmWKthhk250OuR_WenSF55dliHLqspJ8wwdsI4z47h2T5QH_DFqZP_rUPDe_5Dh3TbzsBUt8ll_u7e2vJLAeH6rO7YziIZApn3YpS9x5umAHGKZwEb04yUw_K8yqW8TI38EaVGnmghlVlJGA0Uik4mS_NO2aJn5-yZZXmaV9o8vAGigWDj7hYLicxHsSnrs4bCwLfXK47hRu_IKGuIgY9euReGO9ZOCURPlZOXO-OpBhof7dThfyQ0XNgfOoIMiMZ2EBr0Sf6kLZBisOHvC_Ibj5e8lfCcSznJMiClTPMkRRDdKadQXcgFhezx0VNJULP31C9BJ_1Y3074tQs6CwNPBEsNXw=w641-h641-s-no-gm?authuser=1",
    number: 1,
    percentpage: 0.24,
    fixed: "",
  },
  {
    text: "1000 nụ hôn của sếp",
    img: "https://lh3.googleusercontent.com/pw/AP1GczMfQCjMfuPbX2cVRvr9wZSCbotuVK95KIftZ6qlMxPM8Tz-qzj90sptn0W49FzorteInPgTokrS7p6S_O-XSf9y14xL0iu0PPlFMW_mASPg5tojmZHyoQ60Qe1YIJzEoNsS2iS6eXY8ceVzLaX5ey5z4kr9j1ctEvMkDN0fUsAzMRPvwWZxcsmlALWq8Co-sF2k41AbXh9dZacS8W9KfiSfTSFpJNIpukgYM2zglegRldXpKYVa806tavKtVqLEuubT1NrGxqq1NjTTxY7lw-YiKjJVIjnjcwthjrE9T11MqIK8ji0fMFpR9jfq-dBi5YjarS1r4CG4NTwxQFnuz_FgPqcHCV_bT9D581g2uNv3CD0SuStnokRarcxiVTQX5jfJIbtzTF4ftKuOoxo9gG0QvdSpknLgXW5mPbSDQFQJmJZnCMU1287R-ocfgImHbVyPXwWqzxaH9Hh_jdSf__2prGBm5k2iINk24wj_37SedsQMdcmMVmyx-yGDXvdFHX2lUYBHVzYnZ7UkOBlwS0p5w8QQWNAP-TUwhUrx0RXB7WeWOnKcZDF0LimUVtCV18ENnMGpp2NPmOH13hvOa1mPeMKXMlOlyNH5FR_Ry9e-6yAledn_bggEeZT92BylERg--lA7Crdx3X6boMbGsrzvE03LQP5kHdq2ogXB9VBMb7a-6VtDq1udEgIkLNeWYsr1inQlQcJq7ZDYLTNRp9dFUcf6WVWh9B81eeInJ6urRSLWp9Q_14lDMUHBOy1-p1nvlj1FnVT231IPOjCuj3MzBlPPmqMQ0cjmVkpVQCuSeXT9h_iPQOnikUKas2JRw9OZQOV57w7ODqunhHO51n0WlvByk6cR2EJUowQTVXze9iQ4ThZEMAOQW75smndPRxh7x1TJqq_FQKIbGlsPrUczMEZH9FJYpxMngG3UsApxRS0IUrrBY8ETrJHLjYHRqN12iYy3X_vbHx9kFSfedcf4WK3QuSuTNx9tcFJQQHWxp_6aRuTpn5jmYy3oK94=w250-h444-s-no-gm?authuser=1",
    number: 1,
    percentpage: 0.6,
    fixed: "",
  },
];

const LuckyWheel = () => {
  const [prizes, setPrizes] = useState(defaultData);
  const [deg, setDeg] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const navigate = useNavigate();
  const [accLogin, setAccLogin] = useState(null);

  const congig = wheelConfig(prizes);

  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem("_account"));
    if (acc) {
      fetchPrizes();
      setAccLogin(acc);
    } else {
      navigate("/");
    }
  }, []);

  const fetchPrizes = async () => {
    const res = await apiGetPrizes();
    if (res?.status === 200 && res?.data) {
      setPrizes(res.data);
    }
    console.log("xxxx ", res);
  };

  useEffect(() => {
    if (draw) {
      draw(congig, prizes);
    }
  }, [prizes, congig]);

  const handleStartWheel = () => {
    const fixResult = prizes?.findIndex((item) => item.fixed === "fixed");
    const randomIdx = fixResult !== -1 ? fixResult : randomIndex(prizes);
    const optsPrize = {
      prizeId: randomIdx,
      chances: randomIdx,
    };
    let newDeg = deg || 0;
    newDeg =
      newDeg +
      (360 - (newDeg % 360)) +
      (360 * 10 - randomIdx * (360 / prizes.length));
    setDeg(newDeg);
    runRotate(newDeg);
    setIsStart(true);

    setTimeout(() => {
      apiUpdateAccount(accLogin.id, {
        ...accLogin,
        prize: prizes[optsPrize.prizeId].text,
      });
      handleShowResult(optsPrize);
      setIsStart(false);
    }, 6000);
  };

  const handleShowResult = (optsPrize) => {
    if (optsPrize.chances == null) {
      return showResult(null);
    } else {
      // removeClass(btn, "disabled");
      return showResult(prizes[optsPrize.prizeId].text);
    }
  };

  const runRotate = (deg) => {
    // runInit();
    // setTimeout(function() {

    const ele = document.getElementById(congig.id);
    if (ele) {
      const container = ele.querySelector(".hc-luckywheel-container");
      const btn = ele.querySelector(".hc-luckywheel-btn");

      const { transform } = getCssInfo();

      container.style[transform] = "rotate(" + deg + "deg)";
    }

    // }, 10);
  };

  return (
    <div className="bg" style={{ position: "relative" }}>
      {["quang.vuduy", "yen.lehai1", "hoa.thieuthikhanh1"].includes(
        accLogin?.account
      ) && (
        <Box sx={{ position: "absolute", top: 0 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/settings");
            }}
          >
            setting
          </Button>
        </Box>
      )}
      <div className="wrapper typo" id="wrapper">
        <section id="luckywheel" className="hc-luckywheel">
          <div className="hc-luckywheel-container">
            <canvas
              className="hc-luckywheel-canvas"
              width="500px"
              height="500px"
            >
              Vòng Xoay May Mắn
            </canvas>
          </div>
          <div
            className={`hc-luckywheel-btn ${isStart ? "disabled" : ""}`}
            onClick={handleStartWheel}
          >
            Xoay
          </div>
        </section>
      </div>
    </div>
  );
};

export default LuckyWheel;
