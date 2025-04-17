const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-zinc-800">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Privacy Policy
      </h1>

      <p className="mb-4">Effective Date: April 17, 2025</p>
      <p className="mb-4">
        At <strong>Serava</strong>, your emotional well-being is our top
        priority — and so is your privacy. This Privacy Policy explains how we
        collect, use, and safeguard your personal information when you use our
        mental health companion app.
      </p>

      {/* 1. What We Collect */}
      <h2 className="text-xl font-semibold mt-8 mb-2">1. What We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Personal Information (optional):</strong> Name, email address,
          profile image, voice recordings (if enabled).
        </li>
        <li>
          <strong>Emotional & Usage Data:</strong> Mood check-ins, journaling
          entries, voice/text inputs, emotional trends, interaction history,
          exercises completed.
        </li>
        <li>
          <strong>Device Information:</strong> Device type, OS version, IP
          address, app version, crash logs, performance metrics.
        </li>
        <li>
          <strong>Location Data:</strong> Approximate location (city-level) may
          be collected to tailor experiences (e.g., time zone, local
          recommendations).
        </li>
      </ul>

      {/* 2. How We Use Your Data */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. How We Use Your Data
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          To personalize your emotional support journey and suggest relevant
          exercises or insights.
        </li>
        <li>
          To detect emotional patterns and provide reflective insights or
          nudges.
        </li>
        <li>To improve app performance, fix bugs, and develop new features.</li>
        <li>
          To conduct analytics in an anonymized and aggregated way (no user is
          individually identified).
        </li>
      </ul>
      <p className="mb-4 font-medium text-indigo-600">
        We do <u>not</u> sell your data. We do <u>not</u> share it with
        third-party advertisers.
      </p>

      {/* 3. Legal Basis for Processing (if applicable) */}
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Your Consent</h2>
      <p className="mb-4">
        By using Serava, you consent to the collection and use of your
        information as outlined in this policy. You may withdraw consent at any
        time by contacting us.
      </p>

      {/* 4. Storage & Protection */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        4. Storage & Protection
      </h2>
      <p className="mb-4">
        Your data is securely stored on encrypted servers. We implement
        industry-standard security protocols (TLS/SSL, encryption at rest,
        access control) to protect against unauthorized access.
      </p>
      <p className="mb-4">
        Journals and conversations are visible only to you and are not reviewed
        by human staff unless you explicitly consent during support
        interactions.
      </p>

      {/* 5. Third-Party Services */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        5. Third-Party Services
      </h2>
      <p className="mb-4">
        Serava may integrate with services such as Firebase (for authentication
        and storage), Google Cloud, or AI models (e.g., Gemini, Rasa). These
        services are bound by their own privacy practices but are chosen for
        their compliance with strict data protection standards.
      </p>

      {/* 6. Data Retention */}
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Data Retention</h2>
      <p className="mb-4">
        We retain your data only as long as necessary to fulfill the purposes
        described above. If you delete your account, your personal and emotional
        data will be permanently erased from our systems within 30 days.
      </p>

      {/* 7. Children’s Privacy */}
      <h2 className="text-xl font-semibold mt-8 mb-2">7. Children's Privacy</h2>
      <p className="mb-4">
        Serava is not intended for users under the age of 13. If you believe a
        child under 13 has provided us with personal data, please contact us so
        we can delete it.
      </p>

      {/* 8. Not a Therapist */}
      <h2 className="text-xl font-semibold mt-8 mb-2">8. Not a Therapist</h2>
      <p className="mb-4">
        Serava is an AI-powered wellness assistant — not a licensed therapist.
        For urgent or serious mental health issues, please contact a certified
        professional or local emergency services.
      </p>

      {/* 9. Beta Disclaimer */}
      <h2 className="text-xl font-semibold mt-8 mb-2">9. Beta Disclaimer</h2>
      <p className="mb-4">
        Some features of Serava are in beta and may be experimental. By using
        beta features, you agree to help us improve through optional feedback.
      </p>

      {/* 10. Access, Edit, or Delete Your Data */}
      <h2 className="text-xl font-semibold mt-8 mb-2">10. Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Request a copy of your personal data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent for data processing</li>
      </ul>
      <p className="mb-4">
        You can exercise these rights at any time by emailing us at{" "}
        <a
          href="mailto:mohdaqdasasim@gmail.com"
          className="text-indigo-600 underline"
        >
          mohdaqdasasim@gmail.com
        </a>
        .
      </p>

      {/* 11. Changes to this Policy */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        11. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy to reflect changes in law or our
        practices. We’ll notify you of significant changes via in-app messages
        or emails.
      </p>

      {/* 12. Contact */}
      <h2 className="text-xl font-semibold mt-8 mb-2">12. Contact Us</h2>
      <p className="mb-4">
        Questions or concerns? Feel free to reach out to us at{" "}
        <a
          href="mailto:mohdaqdasasim@gmail.com"
          className="text-indigo-600 underline"
        >
          mohdaqdasasim@gmail.com
        </a>
        .
      </p>

      <div className="mt-12 text-sm text-zinc-500 italic">
        “You are not a diagnosis. You are a story — and we’re here to help you
        write it with compassion.”
      </div>
    </div>
  );
};

export default PrivacyPolicy;
