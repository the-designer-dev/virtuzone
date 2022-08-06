import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NotificationsComponent from '../src/layouts/SidebarLayout/Header/Buttons/Notifications';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { socket } from '../src/socketConfig/socketMain';
import axios from 'axios';

const clientSideEmotionCache = createEmotionCache();

function Virtuzone(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const [notifications, setNotifications] = useState([]);
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  useEffect(() => {
    var notsVar;
    async function getAllNots() {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/allRequests`
      });
      setNotifications(response.data.allRequests);

      notsVar = response.data.allRequests;
    }
    getAllNots();

    if (socket !== null) {
      socket.on('notifyAdmin', (user, heading, message, createdAt) => {
        notsVar = [
          { user: user, heading, message, createdAt, read: false },
          ...notsVar
        ];
        setNotifications(notsVar);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>VIRTUZONE</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <NotificationsComponent
        notifications={notifications.length > 0 ? notifications : []}
        socket={socket}
      />
      <SidebarProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
}

export default Virtuzone;
