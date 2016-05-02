import React from 'react';
import AntiForgeryToken from 'anti-forgery-token';

export default function AntiForgery({ title }) {
  return (
    <form method="post">
      <div>{title}</div>
      <AntiForgeryToken />
      <input type="text" name="title" />
      <input type="submit" value="Submit" />
    </form>
  );
}

AntiForgery.propTypes = {
  title: React.PropTypes.string,
};
