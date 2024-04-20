import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicyPage() {
    /**
     * The PrivacyPolicyPage component is a functional component that renders the about page.
     * It contains information about the company and its values.
     * @returns {JSX.Element}
     */

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language || navigator.userLanguage;
        i18n.changeLanguage(lng);
    }, [i18n]);

    return (
        <>
            <Container>
                <Row className="mt-3 flex-column">
                    <h2>Privacy Policy</h2>

                    <p>This Privacy Policy describes how <strong>Acropolis Estates</strong> ("we," "us," or "our") collects, uses, and shares personal information when you use our website <strong>Acropolisestates.com</strong> (the "Site") and the services offered through the Site.</p>

                    <h3>Information We Collect</h3>

                    <h5>Personal Information:</h5>
                    <p>When you fill out our contact form, we collect your first and last name, email address, phone number, and any other information you provide in the message.</p>
                    <h5>Usage Information:</h5>
                    <p>We may collect information about how you interact with our Site, such as your IP address, browser type, pages visited, and referring website.</p>
                    <h5>How We Use Your Information</h5>

                    <p>We use the personal information you provide to respond to your inquiries, communicate with you, and provide the services you request.
                        We may use usage information to analyze trends, administer the Site, and gather demographic information about our user base.</p>
                    <h5>Information Sharing</h5>

                    <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy.
                        We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you.
                        We may also disclose your information when we believe disclosure is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.</p>
                    <h5>Data Retention</h5>

                    <p> We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>
                    <h5>Your Rights</h5>

                    <p>You have the right to request access to, correction of, or deletion of your personal information. You may also have the right to restrict or object to the processing of your personal information.</p>
                    <h5>Third-Party Links</h5>

                    <p>Our Site may contain links to third-party websites, which have their own privacy policies. We are not responsible for the privacy practices or content of these third-party sites.</p>
                    <h5>Updates to This Privacy Policy</h5>

                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this Privacy Policy periodically for any changes.</p>
                    <h5>Contact Us</h5>

                    <p>If you have any questions about this Privacy Policy or our data practices, please contact us at [Your Contact Email Address].</p>
                </Row>
            </Container>
        </>
    );
}
