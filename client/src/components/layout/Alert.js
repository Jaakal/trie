import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { removeAlert } from '../../actions/alert'

import '../../css/Alert.css'

const Alert = ({ alerts, removeAlert }) => {
  const handleClick = alertId => {
    removeAlert(alertId)
  }

  return (
    alerts !== null && 
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <button className="close-alert" onClick={() => handleClick(alert.id)}>X</button>
        { alert.msg }
      </div>
    ))
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps, { removeAlert })(Alert)
