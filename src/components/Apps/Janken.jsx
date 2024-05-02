import React, { Suspense, useEffect, useState } from 'react'
import Window from '../Window'
import { createUseStyles } from 'react-jss'
import flashplayerIcon from '../../media/flashplayer.png'
import image1 from '../../media/janken/Image 1.jpg'
import image2 from '../../media/janken/Image 29.jpg'
import image3 from '../../media/janken/Image 31.jpg'
import image4 from '../../media/janken/Image 33.jpg'
import image5 from '../../media/janken/Image 35.jpg'
import image6 from '../../media/janken/Image 37.jpg'
import image7 from '../../media/janken/Image 39.jpg'
import image8 from '../../media/janken/Image 41.jpg'
import image9 from '../../media/janken/Image 43.jpg'
import rock from '../../media/janken/rock.png'
import scissor from '../../media/janken/scissor.png'
import paper from '../../media/janken/paper.png'

const useStyles = createUseStyles()

const winFormula = {
  "hs": true,
  "sp": true,
  "ph": true,
}

function randomHSP() {
  const arrayHSP = ["h", "s", "p"];
  return arrayHSP[Math.floor(Math.random(arrayHSP.length - 1) * 3)]
}

function isPlayerWin(p, s) {
  const key = p + s;
  const isWin = winFormula[key]
  if (isWin === true) {
    return true
  }

  return false;
}

const Janken = () => {
  const [activeArrow, setActiveArrow] = useState(false);
  const [playerChoice, setPlayerChoice] = useState("");
  const [systemChoice, setSystemChoice] = useState("");
  const [showRSP, setShowRSP] = useState(false);
  const [reveal, setReveal] = useState("");
  const [nextLv, setNextLv] = useState(1);
  const [toConfirm, setToConfirm] = useState(false);
  const [imgTextPath, setImageTextPath] = useState('./text1.png');
  const [initState, setInitState] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [levels, setLevels] = useState([
    {
      "lv": 1,
      "img": image1,
      "active": 1,
    },
    {
      "lv": 2,
      "img": image2,
      "active": 0,
    },
    {
      "lv": 3,
      "img": image3,
      "active": 0,
    },
    {
      "lv": 4,
      "img": image4,
      "active": 0,
    },
    {
      "lv": 5,
      "img": image5,
      "active": 0,
      "hsp": randomHSP(),
    },
    {
      "lv": 6,
      "img": image6,
      "active": 0,
    },
    {
      "lv": 7,
      "img": image7,
      "active": 0,
    },
    {
      "lv": 8,
      "img": image8,
      "active": 0,
    },
    {
      "lv": 9,
      "img": image9,
      "active": 0,
    },
  ]);

  function confirmNextLv() {

    if (toConfirm) {
      setReveal("")
      return setLevels((prevLv) =>
        prevLv.map((item) => {
          if (item.status === "waiting") {
            if (item.lv === 9) {
              setIsEnd(true);
            }
            setToConfirm(false);
            setShowRSP(false);
            resetSelection();
            return { ...item, active: 1, status: "pass" }
          }
          return { ...item, active: 0 };
        }));
    }
  }

  function lvHandle(playerChoice, nextPage) {
    if (!clickable) {
      return;
    }
    setImageTextPath("./text1.png");
    setShowRSP(false);
    const _systemChoice = randomHSP();
    setReveal(_systemChoice);
    setSystemChoice(_systemChoice);
    setPlayerChoice(playerChoice);

    if (_systemChoice === playerChoice) {
      return;
    }

    if (isPlayerWin(playerChoice, _systemChoice)) {
      let plus = 1;
      nextPage = nextPage + plus;
      if (nextPage === 10) {
        return;
      }

      return setLevels((prevLv) =>
        prevLv.map((item, idx) => {
          if (item.lv === nextPage) {
            setNextLv(nextLv + 1);
            setToConfirm(true);
            return { ...item, status: "waiting" }
          }
          return { ...item };
        }));
    } else {
      let minus = 1;
      if (nextPage > 1) {
        const prevPage = nextPage - minus;
        return setLevels((prevLv) =>
          prevLv.map((item, idx) => {
            if (item.lv === prevPage) {
              setNextLv(nextLv - 1);
              setToConfirm(true);
              return { ...item, status: "waiting" }
            }
            return { ...item };
          }));
      }
    }
  }

  function resetSelection() {
    setPlayerChoice("");
    setSystemChoice("");
  }

  function isSelecting() {
    if (playerChoice && systemChoice) {
      return true;
    }

    return false;
  }

  function GreetingImage() {
    setClickable(false);
    setImageTextPath("./text1.png")
    let count = 0;
    const reflesh = setInterval(() => {
      count++
      if (count === 2) {
        setImageTextPath("./text2.png");
        setClickable(true);
        clearInterval(reflesh);
      }
    }, 600);
  }

  useEffect(() => {
    if (initState) {
      GreetingImage();
      setInitState(false)
    }
  }, [initState])

  return (
    <Window
      windowTitle={`Flash`}
      app="Janken"
      margin={3}
      icon={flashplayerIcon}
      disableResizing={true}
      height={490}
      width={600}
    >
      <div style={{ backgroundColor: "black", height: "auto", position: "relative" }}>
        <div className="relative flex text-white flex-col justify-center items-center">
          {
            levels && levels.map((item, idx) => {
              if (item.active) {
                return (
                  <div key={idx} className='relative' >
                    {
                      showRSP && (
                        <img src={imgTextPath} className='absolute left-0 right-0  w-ful mx-auto top-44' alt='เป่ายิ้งฉุุบ' />
                      )
                    }
                    <img className='pointer-events-none' src={item.img} style={{ margin: '0 auto' }} alt='janken1' />

                    <div className=" bg-transparent  mt-8 z-40 w-full absolute top-0 h-20 grid grid-cols-3 justify-between items-center cursor-pointer">
                      <div className='col'>
                        {
                          reveal === "h" && (
                            <span>
                              <img className='rotate-180' src={rock} alt='rock' />
                            </span>
                          )
                        }
                      </div>
                      <div className="col">
                        {
                          reveal === "s" && (
                            <span>
                              <img className='size-20 rotate-180' src={scissor} alt='scissor' />
                            </span>
                          )
                        }
                      </div>
                      <div className='col'>
                        {
                          reveal === "p" && (
                            <span>
                              <img className='size-20 drop-shadow-xl rotate-180' src={paper} alt='paper' />
                            </span>
                          )
                        }
                      </div>
                    </div>

                    {playerChoice && !isEnd && (
                      <>
                        <div className="mb-8 bg-transparent w-full absolute bottom-0 h-20 grid grid-cols-3 justify-center items-center cursor-pointer">
                          <div className='col'>
                            {
                              playerChoice === "h" && (
                                <span className='flex flex-row justify-center' onClick={(e) => { isSelecting ? e.preventDefault() : lvHandle('h', nextLv) }}>
                                  <img className='size-20 drop-shadow-xl' src={rock} alt='rock' />
                                </span>
                              )
                            }
                          </div>
                          <div className='col'>
                            {
                              playerChoice === "s" && (
                                <span className='flex flex-row justify-center' onClick={(e) => { isSelecting ? e.preventDefault() : lvHandle('s', nextLv) }}>
                                  <img className='size-20 drop-shadow-xl' src={scissor} alt='scissor' />
                                </span>
                              )
                            }
                          </div>
                          <div className='col'>
                            {
                              playerChoice === "p" && (
                                <span className='flex flex-row justify-center' onClick={(e) => { isSelecting ? e.preventDefault() : lvHandle('p', nextLv) }}>
                                  <img className='size-20 drop-shadow-xl' src={paper} alt='paper' />
                                </span>
                              )
                            }
                          </div>
                        </div>
                      </>
                    )}

                    {showRSP && !isEnd && (
                      <>
                        <div className="mb-8 bg-transparent w-full absolute bottom-0 h-20 grid grid-cols-3 justify-center items-center cursor-pointer">
                          <div className='col'>
                            <span className='flex flex-row justify-center' onClick={() => { lvHandle('h', nextLv) }}>
                              <img className='size-20 drop-shadow-xl' src={rock} alt='rock' />
                            </span>
                          </div>
                          <div className='col'>
                            <span className='flex flex-row justify-center' onClick={() => { lvHandle('s', nextLv) }}>
                              <img className='size-20 drop-shadow-xl' src={scissor} alt='scissor' />
                            </span>
                          </div>
                          <div className='col'>
                            <span className='flex flex-row justify-center' onClick={() => { lvHandle('p', nextLv) }}>
                              <img className='size-20 drop-shadow-xl' src={paper} alt='paper' />
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              }
            })
          }

          {
            !isEnd && (
              <div className='absolute right-24 size-24  flex flex-col justify-center items-center cursor-pointer'
                onMouseEnter={() => setActiveArrow(true)}
                onMouseLeave={() => setActiveArrow(false)}
                onClick={() => {
                  console.log(JSON.stringify(levels))
                  setInitState(true)
                  if (toConfirm) {
                    setReveal("")
                    confirmNextLv()
                  }
                  if (playerChoice === systemChoice) {
                    setReveal("")
                  }
                  if (!isPlayerWin(playerChoice, systemChoice)) {
                    setReveal("")
                  }
                  setShowRSP(true);
                  if (playerChoice === "") return;
                  if (systemChoice === "") return;
                }}
              >
                {
                  !showRSP && nextLv < 10 && (
                    <>
                      <div id="shadowdot" className="relative top-1 size-24 opacity-75 blur-sm rounded-full drop-shadow-2xl shadow-lg shadow-slate-950 bg-[#6D846E] ">
                      </div>
                      <img src={"./sphere.png"} className="size-20 absolute opacity-90 backdrop-hue-rotate-180" alt='' />
                      <img src={"./arrowright.png"} className={`${activeArrow ? 'invert' : 'opacity-45'}  absolute size-9 mr-auto saturate-50 drop-shadow-2xl shadow-orange-100`} alt='arrow right' />
                    </>
                  )
                }
              </div>
            )
          }
        </div>
      </div>

    </Window>
  )
}

export default Janken