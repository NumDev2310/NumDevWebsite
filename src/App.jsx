import React, { useRef, useState, useEffect, Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import YoutubeEmbed from "./YoutubeEmbed";
import {Button} from '@mui/material';
import { EffectCoverflow, Mousewheel, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

export default function App() {
  
  const DialPositions = [
    [0.199, 0.347],
    [0.482, 0.347],
    [0.762, 0.347],
    [0.199, 0.441],
    [0.482, 0.441],
    [0.762, 0.441],
    [0.199, 0.538],
    [0.482, 0.538],
    [0.762, 0.538],
    [0.199, 0.633],
    [0.482, 0.633],
    [0.762, 0.633],
    [0.482, 0.731],
  ];

  let dialUp1 = new Audio("dialupanswer.mp3");
  dialUp1.volume = 0.6;
  let dialUp2 = new Audio("dialupanswer2.mp3");
  dialUp2.volume = 0.6;
  dialUp1.addEventListener("ended", () => {openModalCallCompleted();});
  dialUp2.addEventListener("ended", () => {openModalCallFailed();});
  const hangupSound = new Audio("hangup.mp3");
  hangupSound.volume = 0.6;

  const phoneNumberRef = useRef(null);
  const cellphoneRef = useRef(null);
  const removeModemButton = useRef(null);
  const modemImageRef = useRef(null);
  const cellphoneContainerRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  const circle4Ref = useRef(null);
  const circle5Ref = useRef(null);
  const circle6Ref = useRef(null);
  const circle7Ref = useRef(null);
  const circle8Ref = useRef(null);
  const circle9Ref = useRef(null);
  const circle10Ref = useRef(null);
  const circle11Ref = useRef(null);
  const circle12Ref = useRef(null);
  const circleDial = useRef(null);


  const modalCompleted = useRef(null);
  const modalFailed = useRef(null);
  const phoneChargerRef = useRef(null);
  const phoneChargerTopRef = useRef(null);

  const torchlights = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  const torchlightPaths = [
    "torchlightPath1",
    "torchlightPath2",
    "torchlightPath3",
    "torchlightPath4",
    "torchlightPath5",
    "torchlightPath6",
    "torchlightPath7",
    "torchlightPath8",
    "torchlightPath9",
    "torchlightPath10",
    "torchlightPath11",
    "torchlightPath12",
    "torchlightPath13",
    "torchlightPath14",
  ]

  const logos = [
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)]
  ]

  const topVeil = useRef(null);
  const bottomVeil = useRef(null);
  const backgroundContainer = useRef(null);

  const dialCircles = [
    circle1Ref,
    circle2Ref,
    circle3Ref,
    circle4Ref,
    circle5Ref,
    circle6Ref,
    circle7Ref,
    circle8Ref,
    circle9Ref,
    circle10Ref,
    circle11Ref,
    circle12Ref
  ];

  const Beeps = [new Audio("Beep3.mp3"), new Audio("Beep4.mp3"), new Audio("Beep5.mp3")];
  const HummingSound = new Audio("humming.mp3");
  HummingSound.volume = 0.2;
  const entranceSound = new Audio("EntranceSound.mp3");
  let baudModemActive;
  let [numberField, setnumberField] = useState("");
  let currentlyHovering = false;
  let currentlyDialing = false;

  const activateBaudModem = async () => {
    baudModemActive = true;
    removeModemButton.current.style.visibility = "visible";
    phoneNumberRef.current.style.visibility = "visible";
    const machineSound = new Audio("mechanicalclamp-6217.mp3");
    machineSound.volume = 0.3;
    machineSound.play();
    phoneChargerRef.current.addEventListener('animationend', () => {fadeInPhone()});
    phoneChargerRef.current.style.visibility = "visible";
    phoneChargerTopRef.current.style.visibility = "visible";
    phoneChargerTopRef.current.style.animationName = "moveInFromTop";
    phoneChargerTopRef.current.style.animationIterationCount = "1";
    phoneChargerTopRef.current.style.animationPlayState = "running";
    phoneChargerRef.current.style.animationName = "moveInFromBottom";
    phoneChargerRef.current.style.animationIterationCount = "1";
    phoneChargerRef.current.style.animationPlayState = "running";
    setnumberField("");
  }

  const deactivateBaudModem = async () => {
    baudModemActive = false;
    removeModemButton.current.style.visibility = "hidden";
    phoneNumberRef.current.style.visibility = "hidden";
    const machineSound = new Audio("mechanicalclamp-6217.mp3");
    machineSound.volume = 0.3;
    machineSound.play();
    phoneChargerRef.current.addEventListener('animationend', () => {fadeInPhone()});
    phoneChargerTopRef.current.style.animationName = "moveOutFromTop";
    phoneChargerTopRef.current.style.animationIterationCount = "1";
    phoneChargerTopRef.current.style.animationPlayState = "running";
    phoneChargerRef.current.style.animationName = "moveOutFromBottom";
    phoneChargerRef.current.style.animationIterationCount = "1";
    phoneChargerRef.current.style.animationPlayState = "running";
    setnumberField("");
  }

  const openModalCallCompleted = () => {
    circleDial.current.style.visibility = "hidden";
    currentlyDialing = false;
    setnumberField("");
    modalCompleted.current.style.visibility = "visible";
    modalCompleted.current.style.animationName = "fadeInAnimation";
    modalCompleted.current.style.animationIterationCount = "1";
    modalCompleted.current.style.animationPlayState = "running";
  }

  const openModalCallFailed = () => {
    circleDial.current.style.visibility = "hidden";
    currentlyDialing = false;
    setnumberField("");
    modalFailed.current.style.visibility = "visible";
    modalFailed.current.style.animationName = "fadeInAnimation";
    modalFailed.current.style.animationIterationCount = "1";
    modalFailed.current.style.animationPlayState = "running";
  }

  const closeModals = () => {
    modalCompleted.current.style.visibility = "hidden";
    modalFailed.current.style.visibility = "hidden";
  }

  const handleDialClick = async(event) => {
    var x = (event.clientX - event.target.getBoundingClientRect().left)/event.target.getBoundingClientRect().width;
    var y = (event.clientY - event.target.getBoundingClientRect().top)/event.target.getBoundingClientRect().height;
    let Distances = [];
    let Lowest = 5;
    let dialedNumber = 0;
    for (let i=0; i < DialPositions.length;i++ ) {
      Distances[i] = Math.sqrt((x - DialPositions[i][0])**2 + (y - DialPositions[i][1])**2);
      if (Distances[i] < Lowest) {
        Lowest = Distances[i];
        dialedNumber = i;
      }
    }
    if (x > 0.11 && y > 0.29) {
      if (x < 0.85 && y < 0.90) {
        if (dialedNumber < 12) {
          dialCircles[dialedNumber].current.style.visibility = "visible";
          Beeps[(dialedNumber % 3)].play();
        }
        if (numberField.length < 11) {
        if (dialedNumber < 9) {
            setnumberField(numberField + (dialedNumber + 1).toString());
          } else {
            switch (dialedNumber) {
              case 9: 
                setnumberField(numberField + "*");
                break;
              case 10:
                setnumberField(numberField + "0");
                break;
              case 11:
                setnumberField(numberField + "#");
                break;
              case 12:
                activateCall();
                break;
            }
          }
        }
        if (dialedNumber < 12) setTimeout(() => {dialCircles[dialedNumber].current.style.visibility = "hidden"}, 700);
      }
    }
  }

  const activateCall = () => {
    if (!currentlyDialing && numberField === "5154323366") {
      currentlyDialing = true;
      circleDial.current.style.visibility = "visible";
      dialUp1.play();
    } else if (!currentlyDialing && numberField !== "5154323366") {
      currentlyDialing = true;
      circleDial.current.style.visibility = "visible";
      dialUp2.play();
    } else if (currentlyDialing) {
      currentlyDialing = true;
      circleDial.current.style.visibility = "hidden";
      hangupSound.play();
      setnumberField("");
      dialUp1.pause();
      dialUp2.pause();
      dialUp1 = new Audio("dialupanswer.mp3");
      dialUp1.volume = 0.6;
      dialUp2 = new Audio("dialupanswer2.mp3");
      dialUp2.volume = 0.6;
      dialUp1.addEventListener("ended", () => {openModalCallCompleted();});
      dialUp2.addEventListener("ended", () => {openModalCallFailed();});
    }
  }

  const randomLogoGlitch = () => {
    if (!currentlyHovering) {
      const id = Math.floor(Math.random()*logos.length);
      logos[id][0].current.className = "codeLogo animate";
      logos[id][1].current.className = "codeLogoGlitch animate";
      logos[id][1].current.style.visibility = "visible";
      setTimeout(() => {
        logos[id][0].current.className = "codeLogo pause";
        logos[id][1].current.className = "codeLogoGlitch pause";
        logos[id][1].current.style.visibility = "hidden";
      }, Math.floor(2000 + Math.random()*3000));
      setTimeout(randomLogoGlitch, Math.floor(5000 + Math.random()*7000));
    }
  }

  const fadeInPhone = async () => {
    if (baudModemActive) {
      cellphoneContainerRef.current.className = "cellphoneImageContainer pointers";
      cellphoneRef.current.style.animationName = "fadeInAnimation";
      cellphoneRef.current.style.iterationCount = "1";
      cellphoneRef.current.style.animationPlayState = "running";
      modemImageRef.current.style.animationName = "fadeInAnimation";
      modemImageRef.current.style.iterationCount = "1";
      modemImageRef.current.style.animationPlayState = "running";
    } else {
      cellphoneContainerRef.current.className = "cellphoneImageContainer";
      cellphoneRef.current.style.animationName = "fadeOutAnimation";
      cellphoneRef.current.style.iterationCount = "1";
      cellphoneRef.current.style.animationPlayState = "running";
      modemImageRef.current.style.animationName = "fadeOutAnimation";
      modemImageRef.current.style.iterationCount = "1";
      cellphoneRef.current.addEventListener('animationend', () => {
        phoneChargerRef.current.style.visibility = "hidden";
        phoneChargerTopRef.current.style.visibility = "hidden";
      });
      modemImageRef.current.style.animationPlayState = "running";
    }
  }

  const activateEntrance = async () => {
    entranceSound.muted = false;
    await new Promise(r => setTimeout(r, 100));
    entranceSound.play();
    await new Promise(r => setTimeout(r, 500));
    topVeil.current.className = "entranceVeilTop animateEntranceTop";
    bottomVeil.current.className = "entranceVeilBottom animateEntranceBottom";
    phoneChargerRef.current.addEventListener('animationend', () => {fadeInPhone()});
  };
  
  const onHoverHandleEnter = async (event) => {
    if (!currentlyHovering) {
      currentlyHovering = true;
      const id = Number(event.target.id);
      HummingSound.play();
      logos[id][0].current.className = "codeLogo animate";
      logos[id][1].current.className = "codeLogoGlitch animate";
      logos[id][1].current.style.visibility = "visible";
      setTimeout(() => {
        logos[id][0].current.className = "codeLogo pause";
        logos[id][1].current.className = "codeLogoGlitch pause";
        logos[id][1].current.style.visibility = "hidden";
        currentlyHovering = false;
      }, 10000);
      setTimeout(() => {currentlyHovering = false; randomLogoGlitch();}, Math.floor(9000 + Math.random()*7000));
    }
  }

  const torchlightStarter1 = async () => {
    const id = 0;
    torchlights[id].current.style.animationName = torchlightPaths[Math.floor(Math.random()*torchlightPaths.length)];
    torchlights[id].current.className = "torchlight animate";
    await new Promise(r => setTimeout(r, 100));
    torchlights[id].current.style.visibility = "visible";
    torchlights[id].current.addEventListener('animationend', () => {stopTorchlight(torchlights[id])});
    setTimeout(() => {torchlightStarter1();}, 3000 + Math.floor(Math.random()*3000));
  }

  const torchlightStarter2 = async () => {
    const id = 1;
    torchlights[id].current.style.animationName = torchlightPaths[Math.floor(Math.random()*torchlightPaths.length)];
    torchlights[id].current.className = "torchlight animate";
    await new Promise(r => setTimeout(r, 100));
    torchlights[id].current.style.visibility = "visible";
    torchlights[id].current.addEventListener('animationend', () => {stopTorchlight(torchlights[id])});
    setTimeout(() => {torchlightStarter2();}, 3000 + Math.floor(Math.random()*3000));
  }

  const torchlightStarter3 = async () => {
    const id = 2;
    torchlights[id].current.style.animationName = torchlightPaths[Math.floor(Math.random()*torchlightPaths.length)];
    torchlights[id].current.className = "torchlight animate";
    await new Promise(r => setTimeout(r, 100));
    torchlights[id].current.style.visibility = "visible";
    torchlights[id].current.addEventListener('animationend', () => {stopTorchlight(torchlights[id])});
    setTimeout(() => {torchlightStarter3();}, 3000 + Math.floor(Math.random()*3000));
  }

  const torchlightStarter4 = async () => {
    const id = 3;
    torchlights[id].current.style.animationName = torchlightPaths[Math.floor(Math.random()*torchlightPaths.length)];
    torchlights[id].current.className = "torchlight animate";
    await new Promise(r => setTimeout(r, 100));
    torchlights[id].current.style.visibility = "visible";
    torchlights[id].current.addEventListener('animationend', () => {stopTorchlight(torchlights[id])});
    setTimeout(() => {torchlightStarter4();}, 5000 + Math.floor(Math.random()*3000));
  }

  const stopTorchlight = async (ref) => {
    ref.current.style.visibility = "hidden";
    await new Promise(r => setTimeout(r, 100));
    ref.current.className = "torchlight pause";
    ref.current.style.animationName = ""; 
  }

  useEffect( () => {
    cellphoneContainerRef.current.className = "cellphoneImageContainer pause";
    cellphoneRef.current.className = "cellphone pause";
    torchlights[0].current.className = "torchlight pause";
    torchlights[1].current.className = "torchlight pause";
    torchlights[2].current.className = "torchlight pause";
    torchlights[3].current.className = "torchlight pause";
    torchlights[0].current.style.transform = "translate(-50%, -50%)";
    torchlights[1].current.style.transform = "translate(-50%, -50%)";
    torchlights[2].current.style.transform = "translate(-50%, -50%)";
    torchlights[3].current.style.transform = "translate(-50%, -50%)";
    setTimeout(randomLogoGlitch, 5000);
    setTimeout(torchlightStarter1, 7000);
    setTimeout(torchlightStarter2, 8000);
    setTimeout(torchlightStarter3, 9000);
    setTimeout(torchlightStarter4, 10000);
    setTimeout(activateEntrance, 3000);
  }, []);

  const openTwitter = () => {
    window.open("https://twitter.com/0xnumdev", "_blank");
  }
  const openGithub = () => {
    window.open("https://github.com/NumDev2310", "_blank");
  }

  const openTelegram = () => {
    window.open("https://t.me/NumDev2310", "_blank");
  }

  const emailToClipboard = () => {
    navigator.clipboard.writeText("numdev2310@gmail.com");
  }

  return (
    <>
      <div className="bodyContainer" ref={backgroundContainer} style={{pointerEvents: "none"}}>
        <div className="torchlight" ref={torchlights[0]} style={{visibility: "hidden"}}/>
        <div className="torchlight" ref={torchlights[1]} style={{visibility: "hidden"}}/>
        <div className="torchlight" ref={torchlights[2]} style={{visibility: "hidden"}}/>
        <div className="torchlight" ref={torchlights[3]} style={{visibility: "hidden"}}/>
      </div>
      <div className="modal" ref={modalCompleted} style={{visibility: "hidden"}}>
        It appears the dial-up modem of NumDev is busy right now. Please contact him on X or Telegram.
        <br /><br />
        <Button variant="contained" onClick={closeModals}>OK</Button>
      </div>
      <div className="modal" ref={modalFailed} style={{visibility: "hidden"}}>
        It appears you have dialed the wrong number. You won't be able to speak to NumDev today.
        <br /><br />
        <Button variant="contained" onClick={closeModals}>OK</Button>
      </div>
      <div className="entranceVeilTop" ref={topVeil}/>
      <div className="entranceVeilBottom" ref={bottomVeil}/>
      <div className="cellphoneContainer" >
        <img src="/8bitphonecharger.png" ref={phoneChargerTopRef} className="baudModemTop" style={{visibility: "hidden"}}/>
        <div ref={cellphoneContainerRef} className="cellphoneImageContainer">
          <img ref={cellphoneRef} src="/cellphone.png" className="cellphone" onClick={(event) => handleDialClick(event)}/>
          <div className="circle" ref={circle1Ref} style={{left: "13.5%", top: "31.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle2Ref} style={{left: "40.0%", top: "31.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle3Ref} style={{left: "69.4%", top: "31.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle4Ref} style={{left: "13.5%", top: "41.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle5Ref} style={{left: "40.0%", top: "41.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle6Ref} style={{left: "69.4%", top: "41.82%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle7Ref} style={{left: "13.5%", top: "51.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle8Ref} style={{left: "40.0%", top: "51.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle9Ref} style={{left: "69.4%", top: "51.8%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle10Ref} style={{left: "13.5%", top: "61.2%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle11Ref} style={{left: "40.0%", top: "61.2%", visibility: "hidden"}}></div>
          <div className="circle" ref={circle12Ref} style={{left: "69.4%", top: "61.2%", visibility: "hidden"}}></div>
          <div className="circleDial" ref={circleDial} style={{left: "40.0%", top: "71.04%", visibility: "hidden"}}>
            <img src="/disconnect-512.png"/>
          </div>
          <div className="numberField" visibility="visible">{numberField}</div>
          <img ref={modemImageRef} src="/modemimage.png" className="modemImage"/>
        </div>
        <img src="/8bitphonechargerlow.png" ref={phoneChargerRef} className="baudModemBottom" style={{visibility: "hidden"}}/>
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={false}
        centeredSlides={true}
        mousewheel={true}
        navigation={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 300,
          modifier: 1,
          scale: 0.7,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Mousewheel, Navigation]}
        className="mySwiper"
        style={{ width: '100%', height: '100%' }}
      >
        <SwiperSlide>
          <div className="font-overtake">NumDev</div>
          <br /><br />
          <p>Blockchain developer. Web3 apps and games.</p>
          <br /><br /><br />
          <div className="emoticonRow">
            <div className="glitchcontainer"><img ref={logos[0][1]} src="/react-original-wordmark-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[0][0]} src="/react-original-wordmark.svg" id="0" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[1][1]} src="/nodemon-original-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[1][0]} src="/nodemon-original.svg" id="1" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[2][1]} src="/nodejs-original-wordmark-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[2][0]} src="/nodejs-original-wordmark.svg" id="2" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[3][1]} src="/socketio-original-wordmark-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[3][0]} src="/socketio-original-wordmark.svg" id="3" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[4][1]} src="/android-plain-wordmark-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[4][0]} src="/android-plain-wordmark.svg" id="4" className="codeLogo"/></div>
          </div>
          <div className="emoticonRow">
            <div className="glitchcontainer"><img ref={logos[5][1]} src="/vite-original-wordmark-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[5][0]} src="/vite-original-wordmark.svg" id="5" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[6][1]} src="/typescript-original-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[6][0]} src="/typescript-original.svg" id="6" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[7][1]} src="/apache-original-wordmark-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[7][0]} src="/apache-original-wordmark.svg" id="7" className="codeLogo"/></div>
          </div>
          <div className="emoticonRow">
            <div className="glitchcontainer"><img ref={logos[8][1]} src="/swiper-original-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[8][0]} src="/swiper-original.svg" id="8" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[9][1]} src="/linux-plain-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[9][0]} src="/linux-plain.svg" id="9" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[10][1]} src="/solidity-original-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[10][0]} src="/solidity-original.svg" id="10" className="codeLogo"/></div>
            <div className="glitchcontainer"><img ref={logos[11][1]} src="/php-plain-glitch.png" className="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[11][0]} src="/php-plain.svg" id="11" className="codeLogo"/></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="font-overtake">NumDev</div>
        <br /><br />
        <div align="left">
          <p>Mathematically-sound smart contracts.</p>
          <p>Innovative UI interactive designs.</p>
          <p>Entertaining game concepts.</p>
          <p>Collectible NFTs.</p>
          <p>Decentralized, provable random generation.</p>
          <p>Low-latency communication systems.</p>
          <p>Advanced CSS interactivity.</p>
          <p>Full-stack Solidity, Node.js, Vite, React & sockets.io development.</p>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="font-overtake">NumDev</div>
        <br /><br />
        <div align="left">
          <p>Contact me immediately and I'll be happy to discuss your project.</p>
          <p>I strongly prefer the Baud Modem method to communicate.</p>
          <br />
          <Button variant="contained" onClick={activateBaudModem}>14400 Baud Modem (recommended)</Button>
          <Button style={{visibility: "hidden"}} ref={removeModemButton} variant="containedRemove" onClick={deactivateBaudModem}>Remove Modem</Button> <div ref={phoneNumberRef} style={{visibility: "hidden"}}>NumDev's BBS number: 515-432-3366</div>
          <br />
          <p>If I am not available on Baud Modem, you can @ me or DM me on X or any of the other platforms:</p>
          <p><Button variant="contained" onClick={openTwitter}>X</Button></p>
          <p><Button variant="contained" onClick={openTelegram}>Telegram</Button></p>
          <p><Button variant="contained" onClick={openGithub}>github</Button></p>
          <p>numdev2310@gmail.com <Button variant="contained" onClick={emailToClipboard}><img src="copybutton.png" /></Button></p>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="App">
          <h1>Currently playing...</h1>
          <YoutubeEmbed embedId="HjQHztUH698"/>
        </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
