import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import styles from './App.module.css';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';

import {ThemeProvider, createTheme} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';

export const HOME = "/";

const theme = createTheme({
  palette: {
    // mode: 'dark',
    background: {
      default: '#f6eee3'
      
    },
    primary: {
      main: "#0b0b0b"
    }
  }
});

export const DRAWINGS_ID = 'drawings';
export const CONTACT_ID = 'contact';

function App() {
  const [selectedItem, setSelectedItem] = useState();

  function handleScrollTo(id, behavior = 'smooth') {
    setSelectedItem(id);
    const section = document.getElementById(id);
    if (section) {
      const offset = -65;
      const y = section.getBoundingClientRect().top + window.scrollY + offset;
      // section.scrollIntoView({
      //   behavior: 'smooth'
      // });
      window.scrollTo({top: y, behavior});
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div className={styles.main}>
        <BrowserRouter>
          <ScrollToTop />
          <Layout selectedItem={selectedItem} handleScrollTo={handleScrollTo}>
            <Routes>
              <Route path={HOME} element={<Home setSelectedItem={setSelectedItem} handleScrollTo={handleScrollTo} />} />
              <Route path="*" element={<Home setSelectedItem={setSelectedItem} handleScrollTo={handleScrollTo} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
