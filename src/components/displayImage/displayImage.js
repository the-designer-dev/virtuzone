import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DisplayImage({ image }) {
  const [viewImg, setViewImg] = useState(null);
  const [mimeType, setMimeType] = useState(null);

  useEffect(() => {
    axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/files/${image}`,
      responseType: 'blob',
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      }
    }).then((res) => {
      const file = new Blob([res.data], { type: res.headers['content-type'] });
      setViewImg(URL.createObjectURL(file));
      setMimeType(res.headers['content-type']);
    });
  }, [image]);
  return (
    <Box>
      <Card>
        <CardHeader title={image} />
        <Divider />
        <CardContent>
          {viewImg &&
            (mimeType && mimeType.includes('image') ? (
              <img style={{ width: '100%', height: '100%' }} src={viewImg} />
            ) : (
              <iframe
                style={{ width: '450px', height: '500px', border: 'none' }}
                src={viewImg}
              />
            ))}
        </CardContent>
      </Card>
    </Box>
  );
}
