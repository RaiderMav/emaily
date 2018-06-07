import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const Dashboard = (props) => {
  return (
    <Fragment>
      <div>Dashboard</div>
      <div className='fixed-action-btn'>
        <Link
          to='/surveys/new'
          className='btn-floating btn-large red'>
          <i className='large material-icons'>add</i>
        </Link>
      </div>
    </Fragment>
  )
}

export default Dashboard
