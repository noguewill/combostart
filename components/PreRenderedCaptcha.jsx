// components/PreRenderedRecaptcha.js
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const PreRenderedCaptcha = ({ getCaptchaVal }) => (
  <ReCAPTCHA sitekey={process.env.siteKey} onChange={getCaptchaVal} />
);

export default PreRenderedCaptcha;
