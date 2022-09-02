import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import {
  Grid,
  Container,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import ModalNoClose from '../modal/modalNoClose';
import FailureModal from '../failureBox';
import SuccessModal from '../successBox';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('react-rte'), { ssr: false });
function RespondNotification({
  setOpen,
  setEdit,
  edit,
  id,
  data,
  setId,
  setShouldUpdate,

  shouldUpdate
}) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [ShowFailureModal, setShowFailureModal] = useState(false);
  const [image, setImage] = useState(data ? data.image : null);
  const [link, setLink] = useState(data ? data.link : null);
  const [email, setEmail] = useState(data ? data.user?.email : null);
  const [user, setUser] = useState(data ? data.user?._id : null);

  const [value, setValue] = useState(null);

  const handleOnChange = (value) => {
    setValue(value);
    console.log(value.toString('html'));
  };

  useEffect(() => {
    const importModule = async () => {
      const mod = await import('react-rte');
      setValue(
        mod.createValueFromString(
          `<table id="u_content_heading_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">
              
        <h1 class="v-text-align v-line-height v-font-size" style="margin: 0px; color: #cf3339; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial black,avant garde,arial; font-size: 45px;">
          HEADS UP
        </h1>
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table id="u_content_text_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 20px;font-family:'Montserrat',sans-serif;" align="left">
              
        <div class="v-text-align v-line-height" style="line-height: 190%; text-align: justify; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 190%;"><span style="color: #cf3339; font-size: 14px; line-height: 26.6px;"><strong><span style="font-size: 18px; line-height: 34.2px; font-family: Cabin, sans-serif;">Hi :FirstName :LastName!</span></strong></span><br />Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
        
    `,
          'html'
        )
      );
    };
    importModule();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log(edit);

    setShowLoader(true);

    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
      headers: {
        'x-auth-token': process.env.NEXT_PUBLIC_ADMIN_JWT
      },
      data: {
        user: user,
        email: email,
        message: `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
<title></title>

  <style type="text/css">
    @media only screen and (min-width: 620px) {
.u-row {
  width: 600px !important;
}
.u-row .u-col {
  vertical-align: top;
}

.u-row .u-col-33p33 {
  width: 199.98px !important;
}

.u-row .u-col-50 {
  width: 300px !important;
}

.u-row .u-col-100 {
  width: 600px !important;
}

}

@media (max-width: 620px) {
.u-row-container {
  max-width: 100% !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.u-row .u-col {
  min-width: 320px !important;
  max-width: 100% !important;
  display: block !important;
}
.u-row {
  width: calc(100% - 40px) !important;
}
.u-col {
  width: 100% !important;
}
.u-col > div {
  margin: 0 auto;
}
}
body {
margin: 0;
padding: 0;
}

table,
tr,
td {
vertical-align: top;
border-collapse: collapse;
}

p {
margin: 0;
}

.ie-container table,
.mso-container table {
table-layout: fixed;
}

* {
line-height: inherit;
}

a[x-apple-data-detectors='true'] {
color: inherit !important;
text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-container-padding-padding { padding: 50px 10px 0px 20px !important; } #u_content_heading_1 .v-font-size { font-size: 34px !important; } #u_content_text_1 .v-container-padding-padding { padding: 20px !important; } #u_content_text_1 .v-text-align { text-align: justify !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px 20px 50px !important; } #u_content_text_3 .v-container-padding-padding { padding: 20px !important; } #u_content_text_3 .v-text-align { text-align: justify !important; } #u_content_text_3 .v-line-height { line-height: 190% !important; } #u_content_image_3 .v-src-width { width: auto !important; } #u_content_image_3 .v-src-max-width { max-width: 35% !important; } }
  </style>



<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
<tbody>
<tr style="vertical-align: top">
  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
  

<div class="u-row-container" style="padding: 10px;background-image: url('http://housing.designer-dev.com/image-7.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px;background-image: url('http://housing.designer-dev.com/image-7.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
<!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Montserrat',sans-serif;" align="left">
      
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
  <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="left">
    <a href="https://vz.ae" target="_blank">
    <img align="left" border="0" src="http://housing.designer-dev.com/image-10.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 78%;max-width: 234px;" width="234" class="v-src-width v-src-max-width"/>
    </a>
  </td>
</tr>
</table>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px 0px;font-family:'Montserrat',sans-serif;" align="left">
      
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
  <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
    
    <img align="center" border="0" src="http://housing.designer-dev.com/image-8.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;" width="300" class="v-src-width v-src-max-width"/>
    
  </td>
</tr>
</table>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #cf3339">
<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #cf3339;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 1px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 1px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Montserrat',sans-serif;" align="left">
      
<table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 3px solid #cf3339;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
  <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <span>&#160;</span>
      </td>
    </tr>
  </tbody>
</table>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>
</div>



<div class="u-row-container" style="padding: 0px;background-image: url('http://housing.designer-dev.com/image-11.png');background-repeat: no-repeat;background-position: center top;background-color: #ffffff">
<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('http://housing.designer-dev.com/image-11.png');background-repeat: no-repeat;background-position: center top;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

${value.toString('html')}

<table id="u_content_button_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:'Montserrat',sans-serif;" align="left">


    </td>
  </tr>
</tbody>
</table>

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Montserrat',sans-serif;" align="left">
      
<table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
  <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <span>&#160;</span>
      </td>
    </tr>
  </tbody>
</table>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>
</div>



<div class="u-row-container" style="padding: 0px;background-image: url('http://housing.designer-dev.com/image-9.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('http://housing.designer-dev.com/image-9.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
<!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table id="u_content_image_3" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
      
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
  <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="left">
    
    <img align="left" border="0" src="http://housing.designer-dev.com/image-6.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 180px;" width="180" class="v-src-width v-src-max-width"/>
    
  </td>
</tr>
</table>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
      
<div class="v-text-align v-line-height" style="line-height: 230%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 230%;"><span style="font-size: 14px; line-height: 32.2px; color: #ffffff;"><span style="font-family: 'Lato', sans-serif; font-size: 14px; line-height: 32.2px;"><strong><a rel="noopener" href="https://www.vz.ae" target="_blank" style="color: #ffffff; text-decoration: underline;">www.vz.ae</a></strong></span></span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

<table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:11px;font-family:'Montserrat',sans-serif;" align="left">
      
<div align="right">
<div style="display: table; max-width:179px;">
<!--[if (mso)|(IE)]><table width="179" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="right"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:179px;"><tr><![endif]-->

  
  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 4px;" valign="top"><![endif]-->
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 4px">
    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://web.facebook.com/virtuzone/?_rdc=1&_rdr" title="Facebook" target="_blank">
        <img src="http://housing.designer-dev.com/image-1.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
    </td></tr>
  </tbody></table>
  <!--[if (mso)|(IE)]></td><![endif]-->
  
  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 4px;" valign="top"><![endif]-->
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 4px">
    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://twitter.com/Virtuzone_UAE" title="Twitter" target="_blank">
        <img src="http://housing.designer-dev.com/image-2.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
    </td></tr>
  </tbody></table>
  <!--[if (mso)|(IE)]></td><![endif]-->
  
  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 4px;" valign="top"><![endif]-->
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 4px">
    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://www.linkedin.com/company/virtuzone/?originalSubdomain=au" title="LinkedIn" target="_blank">
        <img src="http://housing.designer-dev.com/image-3.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
    </td></tr>
  </tbody></table>
  <!--[if (mso)|(IE)]></td><![endif]-->
  
  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 4px;" valign="top"><![endif]-->
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 4px">
    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://www.instagram.com/virtuzone/" title="Instagram" target="_blank">
        <img src="http://housing.designer-dev.com/image-4.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
    </td></tr>
  </tbody></table>
  <!--[if (mso)|(IE)]></td><![endif]-->
  
  <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
  <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://www.youtube.com/channel/UCFEmRRo_X13qib0g_1D7gHQ" title="YouTube" target="_blank">
        <img src="http://housing.designer-dev.com/image-5.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
    </td></tr>
  </tbody></table>
  <!--[if (mso)|(IE)]></td><![endif]-->
  
  
  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
</div>
</div>

    </td>
  </tr>
</tbody>
</table>

<!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>
</div>


  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
  </td>
</tr>
</tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
</body>

</html>

`.toString()
      }
    })
      .then((res) => {
        setShowLoader(false);
        if (res.status === 200) {
          setShowSuccessModal(true);
        }
      })
      .catch((err) => {
        setShowLoader(false);
        setShowFailureModal(true);
      });
  }

  return (
    <>
      <Head>
        <title>Respond To Notification</title>
      </Head>
      <Container sx={{ mt: 2 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Respond To Notification" />
              <Divider />
              <CardContent>
                <Box
                  onSubmit={(e) => onSubmit(e)}
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      value={email}
                      id="outlined-required"
                      label="To"
                      placeholder="To"
                      readonly="readonly"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    {value !== null && (
                      <RichTextEditor value={value} onChange={handleOnChange} />
                    )}

                    <Box
                      sx={{
                        margin: '9px',
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                      component={'div'}
                    >
                      <Button type="submit" sx={{ margin: 1 }}>
                        Submit
                      </Button>
                    </Box>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ModalNoClose
        setOpen={setShowSuccessModal}
        open={ShowSuccessModal}
        setEdit={() => {}}
        setData={() => {}}
      >
        <SuccessModal
          executeFunction={() => {
            setShouldUpdate(!shouldUpdate);
            setOpen(false);
            setEdit(false);
          }}
          setShowSuccessModal={setShowSuccessModal}
        />
      </ModalNoClose>

      <ModalNoClose
        setOpen={setShowFailureModal}
        open={ShowFailureModal}
        setEdit={() => {}}
        setData={() => {}}
      >
        <FailureModal setShowFailureModal={setShowFailureModal} />
      </ModalNoClose>

      <ModalNoClose
        setOpen={() => {}}
        open={ShowLoader}
        setEdit={() => {}}
        setData={() => {}}
      >
        <CircularProgress />
      </ModalNoClose>
    </>
  );
}

export default RespondNotification;
