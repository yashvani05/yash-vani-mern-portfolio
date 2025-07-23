const Button = ({ text = "See My Work", className, id }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target && id) {
          const offset = window.innerHeight * 0.15;
          const top =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
      className={`${className ?? ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow-image" />
        </div>
      </div>
    </a>
  );
};

export default Button;
