import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Router from "./Router"
import "./assets/styles/signup.css"
import { Burger, Menu } from './Components';
import { useOnClickOutside } from './hook';




const App = () => {

  const [open, setOpen] = useState(false);
  const node = useRef();

  useOnClickOutside(node, () => setOpen(false));

  return (
    <main>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <div ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </div>
          <Router />
        </>
      </ThemeProvider>


    </main>
  )
}

export default App;