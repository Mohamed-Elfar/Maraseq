const Author = () => {
  return (
    <div className="ltn-author-introducing clearfix">
      <div className="author-img">
        <img
          src="/img/logo.svg"
          alt="Maraseq Logo"
          style={{ maxWidth: '100px', height: 'auto' }}
        />
      </div>
      <div className="author-info">
        <h6>Written by</h6>
        <h2>Maraseq Team</h2>
        <p>Real estate experts providing insights and updates about the market. Our team brings years of experience in property development, investment, and market analysis to help you make informed decisions.</p>
      </div>
    </div>
  );
};

export default Author;
