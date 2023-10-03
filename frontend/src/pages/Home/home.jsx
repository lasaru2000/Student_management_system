import React from 'react'
import './home.css';
import { Link } from "react-router-dom";

const cardNames = [
  {
    name: 'Students',
    path: '/students',
  },
  {
    name: 'Classrooms',
    path: '/classrooms'
  },
  {
    name: 'Teachers',
    path: '/teachers'
  },
  {
    name: 'Subjects',
    path: '/subjects'
  },
  {
    name: 'Allocate Subjects',
    path: '/allocatesub'
  },
  {
    name: 'Allocate Classrooms',
    path: '/allocateclass'
  },
  {
    name: 'Detailed Report',
    path: '/report'
  },

];
function home() {
  return (
    <div className="main">
    <div className="cardmain">
      {cardNames.map((card, index) => (
        <Link key={index} to={card.path || '#'}>
          <div className="card">
            <h1>{card.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}


export default home