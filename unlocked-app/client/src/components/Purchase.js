import React from 'react';
import Pay from "../pages/Pay";

function UserPaid(props) {
  return <h4 className="chat-num">This is a paid page for users.</h4>;
}

function NotPaid(props) {
  return (<div className="chat-num"><Pay /></div>);
}

function Purchase(props) {
const isLoggedIn = props.paid;
if (isLoggedIn) {
  return <UserPaid />;
}
return <NotPaid />;
}

export default Purchase;
