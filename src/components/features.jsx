import "./features.css";

function Features() {
  const features = [
    {
      title: "Fake Detection",
      desc: "By default, bots and VPN users are blocked from voting on straw polls.",
    },
    {
      title: "Deadlines",
      desc: "Our polls run indefinitely. You can change that by setting a deadline.",
    },
    {
      title: "Emoji Support",
      desc: "We support all Emojis natively. Feel free to use as many as you want!",
    },
    {
      title: "Live Results",
      desc: "Results update in real-time as votes come in.",
    },
    {
      title: "Poll API",
      desc: "Integrate polls easily using our API.",
    },
    {
      title: "Active Development",
      desc: "We are constantly improving and adding new features.",
    },
  ];

  return (
    <div className="features">
      <div className="features-header">
        <p className="small-title">POLLING MADE EASY</p>
        <h1>Simple polls with powerful configuration</h1>
        <p className="description">
          While we make our polls as simple and beautiful as possible,
          we also offer powerful customization options to enable on-demand
          adjustments for many different purposes.
        </p>
      </div>

      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon"></div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;