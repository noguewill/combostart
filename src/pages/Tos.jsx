import React, { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import Navbar from "/components/Navbar";
import ClassicFooter from "/components/ClassicFooter";
import styles from "@/styles/Tos.module.css";

const Tos = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Navbar btnType={`classic`} />
      <div className={styles[`${theme}tos_container`]}>
        <h1 className={styles.tos_header}>TERMS OF SERVICE</h1>
        <div className={styles[`${theme}tos_body_parent`]}>
          <p className={styles[`${theme}tos_body`]}>
            Terms of Service for COMBOSTART
            <br />
            Effective Date: JUNE 12, 2023 (06/12/23)
            <br />
            <br />
            Welcome to COMBOSTART!
            <br />
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the COMBOSTART website and services (collectively referred to
            as the &quot;Service&quot;). Please read these Terms carefully
            before using the Service.
            <br />
            <br />
            Acceptance of Terms
            <br />
            By accessing or using the Service, you agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you may not
            use the Service.
            <br />
            <br />
            Eligibility
            <br />
            To use the Service, you must be at least 13 years old or older. By
            using the Service, you represent and warrant that you meet this age
            requirement. If you are using the Service on behalf of an
            organization, you represent and warrant that you have the necessary
            authority to bind that organization to these Terms.
            <br />
            <br />
            User-Generated Content
            <br />
            COMBOSTART is primarily a platform for user-generated content. You
            understand that the majority of the content on the website is
            generated by users and does not reflect the views or opinions of
            COMBOSTART. As a user, you are solely responsible for the content
            you submit, share, or upload on the Service. COMBOSTART does not
            guarantee the accuracy, quality, or reliability of any
            user-generated content.
            <br />
            <br />
            Ownership and Intellectual Property
            <br />
            COMBOSTART and its licensors retain all rights, title, and interest
            in and to the Service, including all content, logos, trademarks, and
            other intellectual property. You may not use any trademarks, logos,
            or other proprietary information of COMBOSTART without express
            written permission.
            <br />
            <br />
            Prohibited Activities
            <br />
            You agree not to engage in any of the following activities while
            using the Service:
            <br />
            a. Scraping or collecting data from the website, including combos
            and other content, without express authorization from COMBOSTART.
            <br />
            b. Reverse engineering, decompiling, disassembling, or otherwise
            attempting to derive the source code of the Service.
            <br />
            c. Uploading or sharing any content that is infringing, harmful,
            offensive, defamatory, or violates any applicable laws or
            regulations.
            <br />
            d. Impersonating any person or entity or falsely stating or
            otherwise misrepresenting your affiliation with a person or entity.
            <br />
            e. Interfering with or disrupting the Service, servers, or networks
            connected to the Service.
            <br />
            f. Engaging in any activity that could harm or negatively impact the
            Service or its users.
            <br />
            <br />
            Account Registration and Security
            <br />
            You are responsible for maintaining the security of your account
            credentials and any activities that occur under your account. You
            agree to provide accurate and up-to-date information during the
            registration process. You must promptly notify COMBOSTART of any
            unauthorized use or suspected security breach of your account.
            <br />
            <br />
            Termination
            <br />
            COMBOSTART reserves the right, at its sole discretion, to suspend or
            terminate your access to the Service, without prior notice or
            liability, for any reason, including if you violate these Terms.
            Upon termination, your right to access or use the Service will
            immediately cease.
            <br />
            <br />
            Disclaimer of Warranties
            <br />
            The Service is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. COMBOSTART does not warrant that the Service
            will be uninterrupted, error-free, or secure. COMBOSTART disclaims
            all warranties of any kind, whether express, implied, or statutory,
            regarding the Service.
            <br />
            <br />
            Limitation of Liability
            <br />
            Limitation of Liability
            <br />
            To the maximum extent permitted by law, COMBOSTART and its
            affiliates, officers, directors, employees, and agents shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to, damages for lost
            profits, data loss, or other intangible losses, arising out of or in
            connection with your use of the Service.
            <br />
            <br />
            Changes to the Terms
            <br />
            COMBOSTART reserves the right to modify or revise these Terms at any
            time, with or without notice. The updated Terms will be effective
            upon posting. Your continued use of the Service after the posting of
            any changes constitutes your acceptance of the modified Terms.
            <br />
            <br />
            Governing Law and Jurisdiction
            <br />
            These Terms shall be governed by and construed in accordance with
            the laws of [Jurisdiction]. Any legal action or proceeding arising
            out of or relating to these Terms or the Service shall be
            exclusively brought in the courts located in [Jurisdiction], and you
            consent to the personal jurisdiction of such courts.
            <br />
            <br />
            Severability
            <br />
            If any provision of these Terms is found to be unenforceable or
            invalid, the remaining provisions shall be unaffected and shall
            continue in full force and effect.
            <br />
            <br />
            Entire Agreement
            <br />
            These Terms constitute the entire agreement between you and
            COMBOSTART regarding your use of the Service and supersede any prior
            agreements or understandings.
            <br />
            <br />
            Copyright Infringement
            <br />
            COMBOSTART respects the intellectual property rights of others and
            expects its users to do the same. If you believe that your
            copyrighted work has been infringed upon on the Service, please
            follow the procedures outlined in our Copyright Policy to report the
            infringement.
            <br />
            <br />
            User Conduct
            <br />
            You agree to use the Service in a responsible and lawful manner. You
            shall not engage in any activity that violates any applicable laws,
            regulations, or third-party rights. This includes but is not limited
            to harassment, spamming, or engaging in any activity that disrupts
            the user experience on the Service.
            <br />
            <br />
            Third-Party Websites and Services
            <br />
            The Service may contain links to third-party websites or services
            that are not owned or controlled by COMBOSTART. COMBOSTART has no
            control over, and assumes no responsibility for, the content,
            privacy policies, or practices of any third-party websites or
            services. You acknowledge and agree that COMBOSTART shall not be
            responsible or liable, directly or indirectly, for any damage or
            loss caused or alleged to be caused by or in connection with the use
            of or reliance on any such content, goods, or services available on
            or through any third-party websites or services.
            <br />
            <br />
            Indemnification
            <br />
            You agree to indemnify, defend, and hold harmless COMBOSTART and its
            affiliates, officers, directors, employees, and agents from and
            against any claims, liabilities, damages, losses, costs, or expenses
            arising out of or in connection with your use of the Service,
            violation of these Terms, or infringement of any rights of any other
            person or entity.
            <br />
            <br />
            Modifications to the Service
            <br />
            COMBOSTART reserves the right to modify, suspend, or discontinue the
            Service, or any part thereof, at any time and without prior notice.
            You agree that COMBOSTART shall not be liable to you or any third
            party for any modification, suspension, or discontinuance of the
            Service.
            <br />
            <br />
            Language
            <br />
            The primary language of these Terms is [Language]. If there is any
            inconsistency or discrepancy between the English version and any
            translated version, the English version shall prevail.
            <br />
            <br />
            Waiver
            <br />
            The failure of COMBOSTART to enforce any right or provision of these
            Terms shall not constitute a waiver of such right or provision
            unless acknowledged and agreed to by COMBOSTART in writing.
            <br />
            <br />
            Premium Content and Patreon Subscriptions
            <br />
            a. COMBOSTART may offer certain premium content, features, or
            services that are accessible only to users who have subscribed to
            Patreon or made donations to support the platform. Access to such
            premium content is subject to additional terms and conditions, which
            will be clearly stated on the Service.
            <br />
            b. By accessing and using premium content or participating in
            Patreon subscriptions, you agree to abide by the terms and
            conditions set forth by COMBOSTART and any additional terms
            specified for Patreon subscriptions or donations.
            <br />
            c. COMBOSTART reserves the right to modify, suspend, or terminate
            premium content, features, or services, including Patreon
            subscriptions, at any time, with or without notice.
            <br />
            d. COMBOSTART shall not be liable for any damages or losses incurred
            by users due to changes, limitations, or discontinuation of premium
            content, features, or services.
            <br />
            e. Any fees associated with Patreon subscriptions or donations are
            subject to the terms and conditions set by Patreon and the
            respective payment processors. COMBOSTART is not responsible for any
            issues or disputes arising from Patreon subscriptions or donations.
            <br />
            f. COMBOSTART does not guarantee the availability, accuracy, or
            quality of premium content or services provided through Patreon
            subscriptions or donations. Use of such content or services is at
            your own discretion and risk.
            <br />
            g. COMBOSTART may offer certain benefits or perks to Patreon
            subscribers or donors, which are subject to change or
            discontinuation at the sole discretion of COMBOSTART.
            <br />
            <br />
            If you have any questions or concerns about these Terms, please
            contact us at [contact email].
          </p>
        </div>
      </div>

      <ClassicFooter />
    </div>
  );
};

export default Tos;
