import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../css/imageModal.module.css';
export default function DisplayImage({ image }) {
  const [viewImg, setViewImg] = useState([]);
  const [mimeType, setMimeType] = useState([]);

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  useEffect(async () => {
    if (isArray(image)) {
      var imgs = [];
      var mimes = [];
      for (const file of image) {
        const fetched = await axios({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/files/${file}/false`,
          responseType: 'blob',
          headers: {
            'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
          }
        });
        console.log(fetched.data);
        const f = new Blob([fetched.data], {
          type: fetched.headers['content-type']
        });
        console.log(f);
        imgs.push(URL.createObjectURL(f));
        mimes.push(fetched.headers['content-type']);
      }
      setViewImg(imgs);
      setMimeType(mimes);
      console.log(imgs);
    } else {
      axios({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/files/${image}/false`,
        responseType: 'blob',
        headers: {
          'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
        }
      }).then((res) => {
        console.log(res.data.bitmap);

        const file = new Blob([res.data.bitmap], {
          type: res.headers['content-type']
        });
        setViewImg(URL.createObjectURL(file));
        setMimeType(res.headers['content-type']);
      });
    }
  }, [image]);
  return (
    <Box>
      <Card>
        <CardHeader title={image} />
        <Divider />
        <CardContent>
          {viewImg !== false && isArray(viewImg) ? (
            <Swiper
              className={styles.swiper_container}
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {viewImg.map((el, i) => {
                console.log(el);
                return (
                  <SwiperSlide style={{ width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      {mimeType.length > 0 && mimeType[i].includes('image') ? (
                        <img style={{ width: '100%' }} src={el} />
                      ) : (
                        <iframe
                          style={{
                            width: '450px',
                            height: '500px',
                            border: 'none'
                          }}
                          src={el}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : mimeType && mimeType.includes('image') ? (
            <img style={{ width: '100%', height: '100%' }} src={viewImg} />
          ) : (
            <iframe
              style={{ width: '450px', height: '500px', border: 'none' }}
              src={viewImg}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
