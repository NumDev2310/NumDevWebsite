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
    [0.762, 0.633]
  ];

  const cellphoneRef = useRef(null);
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

  const phoneChargerRef = useRef(null);

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
  let [baudModemState, setbaudModemState] = useState({display: "none"});
  let baudModemActive = false;
  let [numberField, setnumberField] = useState("");
  let currentlyHovering = false;

  const activateBaudModem = async () => {
    baudModemActive = true;
    const machineSound = new Audio("mechanicalclamp-6217.mp3");
    machineSound.play();
    setbaudModemState({display: "inline"});
    await new Promise(r => setTimeout(r, 5000));
    machineSound.pause();
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
      if (x < 0.85 && y < 0.79) {
        dialCircles[dialedNumber].current.style.visibility = "visible";
        Beeps[(dialedNumber % 3)].play();
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
            }
          }
        }
        setTimeout(() => {dialCircles[dialedNumber].current.style.visibility = "hidden"}, 700);
      }
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
    console.log("trying");
    cellphoneContainerRef.current.className = "cellphoneImageContainer pointers";
    cellphoneRef.current.className = "cellphone animate";
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
    console.log(document.body.getBoundingClientRect());
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
    setTimeout(randomLogoGlitch, 5000);
    setTimeout(torchlightStarter1, 7000);
    setTimeout(torchlightStarter2, 8000);
    setTimeout(torchlightStarter3, 9000);
    setTimeout(torchlightStarter4, 10000);
    setTimeout(activateEntrance, 3000);
  }, []);

  return (
    <>
      <div class="torchlightContainer">
        <div class="torchlight" ref={torchlights[0]} style={{visibility: "hidden"}}/>
        <div class="torchlight" ref={torchlights[1]} style={{visibility: "hidden"}}/>
        <div class="torchlight" ref={torchlights[2]} style={{visibility: "hidden"}}/>
        <div class="torchlight" ref={torchlights[3]} style={{visibility: "hidden"}}/>
      </div>
      <div class="entranceVeilTop" ref={topVeil}/>
      <div class="entranceVeilBottom" ref={bottomVeil}/>
      <div className="cellphoneContainer" >
        <img src="/8bitphonecharger.png" class="baudModemTop" style={baudModemState}/>
        <div ref={cellphoneContainerRef} className="cellphoneImageContainer">
          <img ref={cellphoneRef} src="/cellphone.png" class="cellphone" onClick={(event) => handleDialClick(event)}/>
          <div class="circle" ref={circle1Ref} style={{left: "13.5%", top: "31.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle2Ref} style={{left: "40.0%", top: "31.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle3Ref} style={{left: "69.4%", top: "31.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle4Ref} style={{left: "13.5%", top: "41.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle5Ref} style={{left: "40.0%", top: "41.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle6Ref} style={{left: "69.4%", top: "41.82%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle7Ref} style={{left: "13.5%", top: "51.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle8Ref} style={{left: "40.0%", top: "51.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle9Ref} style={{left: "69.4%", top: "51.8%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle10Ref} style={{left: "13.5%", top: "61.2%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle11Ref} style={{left: "40.0%", top: "61.2%", visibility: "hidden"}}></div>
          <div class="circle" ref={circle12Ref} style={{left: "69.4%", top: "61.2%", visibility: "hidden"}}></div>
          <div class="numberField" visibility="visible">{numberField}</div> 
        </div>
        <img src="/8bitphonechargerlow.png" ref={phoneChargerRef} class="baudModemBottom" style={baudModemState}/>
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
      >
        <SwiperSlide>
          <p class="font-overtake">NumDev</p>
          <br />
          <p>Blockchain developer. Web3 apps and games.</p>
          <br /><br />
          <div class="emoticonRow">
            <div class="glitchcontainer"><img ref={logos[0][1]} src="/react-original-wordmark-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[0][0]} src="/react-original-wordmark.svg" id="0" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[1][1]} src="/nodemon-original-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[1][0]} src="/nodemon-original.svg" id="1" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[2][1]} src="/nodejs-original-wordmark-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[2][0]} src="/nodejs-original-wordmark.svg" id="2" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[3][1]} src="/socketio-original-wordmark-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[3][0]} src="/socketio-original-wordmark.svg" id="3" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[4][1]} src="/android-plain-wordmark-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[4][0]} src="/android-plain-wordmark.svg" id="4" class="codeLogo"/></div>
          </div>
          <div class="emoticonRow">
            <div class="glitchcontainer"><img ref={logos[5][1]} src="/vite-original-wordmark-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[5][0]} src="/vite-original-wordmark.svg" id="5" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[6][1]} src="/typescript-original-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[6][0]} src="/typescript-original.svg" id="6" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[7][1]} src="/apache-original-wordmark-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[7][0]} src="/apache-original-wordmark.svg" id="7" class="codeLogo"/></div>
          </div>
          <div class="emoticonRow">
            <div class="glitchcontainer"><img ref={logos[8][1]} src="/swiper-original-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[8][0]} src="/swiper-original.svg" id="8" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[9][1]} src="/linux-plain-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[9][0]} src="/linux-plain.svg" id="9" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[10][1]} src="/solidity-original-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[10][0]} src="/solidity-original.svg" id="10" class="codeLogo"/></div>
            <div class="glitchcontainer"><img ref={logos[11][1]} src="/php-plain-glitch.png" class="codeLogoGlitch"/><img onMouseEnter={event => onHoverHandleEnter(event)} ref={logos[11][0]} src="/php-plain.svg" id="11" class="codeLogo"/></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <p class="font-overtake">NumDev</p>
        <div align="left">
          <p>Mathematically-sound smart contracts.</p>
          <p>Innovative UI interactive designs.</p>
          <p>Entertaining game concepts.</p>
          <p>Decentralized, provable random generation.</p>
          <p>Low-latency communication systems.</p>
          <p>Advanced CSS interactivity.</p>
          <p>Full-stack Solidity, Node.js, Vite, React & sockets.io development.</p>
        </div>
        </SwiperSlide>
        <SwiperSlide>
          <p>Contact NumDev immediately to hire him on your project using one of the methods below.</p>
          <Button variant="contained" onClick={activateBaudModem}>14400 Baud Modem (recommended)</Button>
          <Button variant="contained">X</Button>
        </SwiperSlide>
        <SwiperSlide>
        <div className="App">
          <h1>Youtube Embed</h1>
          <YoutubeEmbed embedId="HjQHztUH698"/>
        </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
