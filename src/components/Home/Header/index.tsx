import React from "react";

interface Props {
  courses: [object];
  campus: Array<{ id: string; name: string }>;
  language: string;
}

const Header: React.SFC<Props> = ({ courses, campus, language }) => {
  return (
    <>
      <h1>IronHack</h1>
      {campus.map(e => (
        <p key={e.id}>{e.name}</p>
      ))}
    </>
  );
};

export default Header;
