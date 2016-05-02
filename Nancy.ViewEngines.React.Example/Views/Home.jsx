import React from 'react';

export default function Home({ text }) {
  return <div>Home: <code>{text}</code></div>;
}

Home.propTypes = {
  text: React.PropTypes.string.isRequired,
};
