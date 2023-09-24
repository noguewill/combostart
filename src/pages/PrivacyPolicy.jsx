import React, { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import styles from "@/styles/Tos.module.css";
import StickyButton from "components/StickyButton";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Helmet>
        <title>COMBOSTART | Private Policy</title>

        <link
          rel="canonical"
          href="https://combostart.vercel.app/PrivacyPolicy"
        />
      </Helmet>
      <div className={styles[`${theme}tos_parent`]}>
        <Navbar />
        <div className={styles.tos_container}>
          <h1 className={styles.tos_header}>PRIVACY POLICY</h1>
          <div className={styles[`${theme}tos_body_parent`]}>
            <p className={styles[`${theme}tos_body`]}>
              Last Updated: AUGUST 20, 08/20/2023
              <br />
              <br />
              Welcome to Combostart! This Privacy Policy explains how we
              collect, use, store, and protect your personal information when
              you use our website. Please read this Privacy Policy carefully to
              understand our practices regarding your personal data and how we
              will treat it. By using our website, you agree to the terms of
              this Privacy Policy.
              <br />
              <br />
              <strong>Information We Collect</strong>
              <br />
              We collect certain information to provide and improve our
              services. The information we gather includes:
              <br />
              1. <strong>Analytics Data:</strong> We use analytics tools to
              collect information about how you interact with our website. This
              includes details about which pages you visit, your IP address
              location, the device you are using, and device details. This data
              is collected to help us improve our services and enhance your
              experience on our website.
              <br />
              <br />
              <strong>How We Use Your Information</strong>
              <br />
              The information we collect is used for the following purposes:
              <br />
              1. <strong>Analytics:</strong> We use analytics data to analyze
              user behavior to optimize areas of the website that it can be
              improved and enhance user experience.
              <br />
              <br />
              <strong>Data Security</strong>
              <br />
              We take data security seriously and implement appropriate measures
              to protect your personal information. However, please be aware
              that no method of transmission over the internet or electronic
              storage is completely secure, and we cannot guarantee the absolute
              security of your data.
              <br />
              <br />
              <strong>Data Sharing</strong>
              <br />
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent. Your data will
              not be sold until we provide a notice to our users if there are
              any changes to this policy.
              <br />
              <br />
              <strong>Your Rights</strong>
              <br />
              You have full autonomy over your personal data. You can exercise
              the following rights:
              <br />
              1. <strong>Data Access and Deletion:</strong> You can request
              access to your personal data we have collected and stored. You
              also have the right to request the deletion of your data from our
              records.
              <br />
              <br />
              <strong>Changes to this Privacy Policy</strong>
              <br />
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. It is your responsibility to review this Privacy Policy
              periodically.
              <br />
              <br />
              <strong>Contact Us</strong>
              <br />
              If you have any questions or concerns about our Privacy Policy,
              please contact us at any of our social media accounts.
            </p>
          </div>
        </div>
        <StickyButton />
        <Footer theme={theme} />
      </div>
    </>
  );
};

export default PrivacyPolicy;
