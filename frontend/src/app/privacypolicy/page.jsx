


const PrivacyPolicy = () => {
  const lastUpdated = "July 12, 2025";

  return (
    <div className="relative bg-white">
   
      <div className="relative  text-white">
         <img
          src="/images/privacy-policy.jpg"
          alt="Privacy Policy Banner"
          className="w-full h-56 md:h-80 lg:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          {/* <p className="text-xl opacity-90">
            Last Updated: {lastUpdated}
          </p> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Calm Stone is committed to safeguarding the privacy of our clients, partners, and website visitors. This policy outlines the methods by which we collect, use, and protect your personal information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We understand that your privacy is important to you, and we take our responsibility to protect your personal information seriously. This Privacy Policy explains how we handle your data when you visit our website, use our services, or interact with us in any capacity.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect information directly through forms, emails, inquiries, or interactions with our services. This may include, but is not limited to, names, contact details, company affiliation, and project-related data.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Personal Information may include:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Full name and professional title</li>
                <li>• Email address and phone number</li>
                <li>• Company name and business address</li>
                <li>• Project specifications and requirements</li>
                <li>• Communication preferences</li>
                <li>• Professional background and qualifications</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring website, and pages visited. This information helps us understand how our website is being used and improve our services.
            </p>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The data collected is used to provide services, respond to inquiries, manage internal operations, and enhance user experience. Information may also be processed to comply with regulatory requirements and for business analysis purposes.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Specific uses include:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Delivering professional services and project management</li>
                <li>• Communicating about your projects and service updates</li>
                <li>• Processing payments and maintaining financial records</li>
                <li>• Improving our website functionality and user experience</li>
                <li>• Sending newsletters and marketing communications (with consent)</li>
                <li>• Conducting market research and business analytics</li>
                <li>• Ensuring compliance with legal and regulatory obligations</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We will only use your personal information for the purposes for which it was collected, unless we reasonably believe that another purpose is compatible with the original purpose and is necessary for providing you with our services.
            </p>
          </div>

          {/* Cookies and Tracking */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may utilize cookies and similar tracking technologies to enhance functionality and analyze usage. These cookies do not collect personally identifiable information unless you explicitly submit it to us.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Types of cookies we use:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Essential cookies:</strong> Necessary for website functionality</li>
                <li>• <strong>Analytics cookies:</strong> Help us understand website usage patterns</li>
                <li>• <strong>Performance cookies:</strong> Improve website speed and performance</li>
                <li>• <strong>Functional cookies:</strong> Remember your preferences and settings</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You can control cookie settings through your browser preferences. However, disabling certain cookies may impact your experience on our website. We do not use cookies for advertising or tracking across third-party websites.
            </p>
          </div>

          {/* Information Sharing */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Calm Stone does not sell or lease personal data. We may share information with trusted service providers who support our operations, strictly under confidentiality agreements and for designated purposes.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">We may share information with:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Professional service providers (accounting, legal, IT support)</li>
                <li>• Payment processors and financial institutions</li>
                <li>• Cloud service providers for data storage and processing</li>
                <li>• Marketing and communication service providers</li>
                <li>• Regulatory authorities when required by law</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              All third parties are required to maintain the confidentiality of your information and are prohibited from using it for any purpose other than providing services to us. We conduct due diligence on all service providers to ensure they meet our privacy and security standards.
            </p>
          </div>

          {/* Data Security */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We maintain robust security protocols and measures to prevent unauthorized access, alteration, disclosure, or destruction of your personal data. All information is handled in accordance with industry best practices.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Security measures include:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Encryption of data in transit and at rest</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Access controls and authentication protocols</li>
                <li>• Employee training on data protection practices</li>
                <li>• Secure backup and disaster recovery procedures</li>
                <li>• Regular updates to security software and systems</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              While we implement comprehensive security measures, no method of transmission over the internet or electronic storage is 100% secure. We continuously monitor and update our security practices to protect against evolving threats.
            </p>
          </div>

          {/* Data Retention */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Personal data is retained only as long as necessary for the purposes it was collected or as required by applicable law. Upon expiry of such needs, data is securely deleted or anonymized.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Retention periods:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Client project data: 7 years after project completion</li>
                <li>• Financial records: As required by tax and accounting regulations</li>
                <li>• Marketing communications: Until you unsubscribe or opt out</li>
                <li>• Website analytics: 26 months from collection</li>
                <li>• Support inquiries: 3 years after resolution</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We regularly review our data retention practices and securely dispose of information that is no longer needed. Upon request, we can provide information about how long we retain specific types of personal data.
            </p>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to access, amend, or request deletion of your personal information. To exercise these rights or inquire about our privacy practices, please reach out to us via the contact form on our website.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Your rights include:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Access:</strong> Request a copy of your personal information</li>
                <li>• <strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li>• <strong>Erasure:</strong> Request deletion of your personal information</li>
                <li>• <strong>Portability:</strong> Receive your data in a structured format</li>
                <li>• <strong>Restriction:</strong> Limit how we process your information</li>
                <li>• <strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li>• <strong>Withdraw consent:</strong> Revoke consent for marketing communications</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We will respond to your requests within 30 days and may require verification of your identity before processing your request. There is no charge for most requests, though we may charge a reasonable fee for excessive or repetitive requests.
            </p>
          </div>

          {/* International Transfers */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our business operations may require transferring your personal information to countries outside your region. When we transfer data internationally, we ensure appropriate safeguards are in place to protect your privacy rights.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We use standard contractual clauses, adequacy decisions, and other legally recognized transfer mechanisms to ensure your data receives an adequate level of protection regardless of where it is processed.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 16, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Parents and guardians who believe their child has provided us with personal information should contact us immediately so we can remove the information from our systems.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may include links to third-party platforms. Please note that we are not responsible for the privacy practices or content of these external sites. We encourage users to review their policies individually.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When you click on third-party links, you leave our website and are subject to the privacy policies and terms of use of those external sites. We recommend reviewing their privacy policies before providing any personal information.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using the following methods:
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-1">
                <li>• Email: privacy@calmstone.com</li>
                <li>• Contact form on our website</li>
                <li>• Phone: [Your phone number]</li>
                <li>• Mail: [Your business address]</li>
              </ul>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to amend this Privacy Policy at any time. Updates will be posted on this page and will be effective from the date of publication.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We will notify you of any material changes to this policy by email or through a prominent notice on our website. Your continued use of our services after any changes indicates your acceptance of the updated policy.
            </p>
          </div>

          {/* Consent */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing our services or website, you agree to the terms described in this Privacy Policy. If you do not agree with any part of this policy, please do not use our services or website.
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default PrivacyPolicy;