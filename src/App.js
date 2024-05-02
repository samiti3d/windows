import React, { createContext, useEffect } from 'react';

import './App.css';
import 'xp.css/dist/XP.css';
import { createUseStyles } from 'react-jss';
import { reduce, initialState } from './GlobalContext';
import Desktop from './components/Desktop.jsx';
import MyComputerApp from './components/Apps/MyComputer/MyComputer.jsx';
import InternetExplorerApp from './components/Apps/InternetExplorer/InternetExplorer.jsx';
import ToDoApp from './components/Apps/ToDoApp/ToDoApp.jsx';
import WeatherApp from './components/Apps/Weather/WeatherApp.jsx';
import Paint from './components/Apps/Paint.jsx';
import Footer from './components/Footer/Footer';
import WindowsMediaPlayer from './components/Apps/WindowsMediaPlayer';
import Notepad from './components/Apps/Notepad';
import CommandLine from './components/Apps/CommandLine';
import background from './media/xp-background.jpg';
import Error from './components/Error';
import Janken from './components/Apps/Janken.jsx';
const useStyles = createUseStyles({
  app: {
    backgroundImage: `url("${background}")`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    fontFamily: `Tahoma, 'Noto Sans', sans-serif`,
    overflow: `hidden`,
    width: '100%',
    // width: `1024px`,
    // height: `768px`,
    margin: `0 auto`,
  },
});
export const GlobalContext = createContext();
export default function App() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reduce, initialState);
  // console.log(state.StatusBar);
  // console.log(state.ActiveApp);

  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
      console.log("you cannot use right click");
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      <div id="app" className={`${classes.app} relative`}>
        <Desktop />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'inherit',
          }}
        >
          {state.MyComputer.appOpen && <MyComputerApp />}
          {state.InternetExplorer.appOpen && <InternetExplorerApp />}
          {state.ToDoApp.appOpen && <ToDoApp />}
          {state.Weather.appOpen && <WeatherApp />}
          {state.Paint.appOpen && <Paint />}
          {state.Janken.appOpen && <Janken />}
          {state.WindowsMediaPlayer.appOpen && <WindowsMediaPlayer />}
          {state.Notepad.appOpen && <Notepad />}
          {state.CommandLine.appOpen && <CommandLine />}
          {state.Error.appOpen && <Error />}
        </div>

        <Footer className="absolute top-0 lef" />
      </div>
    </GlobalContext.Provider>
  );
}
