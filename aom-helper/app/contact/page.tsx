export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Contact Us</h1>
      <p className="text-white mb-4">
        Have questions, feedback, or just want to say hello? We'd love to hear
        from you!
      </p>
      <p className="text-white mb-4">You can reach us at:</p>
      <ul className="list-disc list-inside text-white mb-4">
        <li>Email: contact@aomguide.com</li>
        <li>Phone: 123-456-7890</li>
        <li>
          Carrier Pigeon: Just kidding, we don't have a pigeon coop (yet).
        </li>
      </ul>
      <p className="text-white">
        We promise to respond faster than a Greek hero can slay a mythological
        beast!
      </p>
    </div>
  );
}
