import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showErr: false, errMsg: ''}

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmit = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({showErr: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showErr, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.onSubmit} className="form">
        <h1>Login</h1>
        <label htmlFor="name">USERNAME</label>
        <input
          id="name"
          placeholder="Username"
          value={username}
          onChange={this.onChangeName}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          value={password}
          type="password"
          id="password"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
        <button type="submit" className="button">
          Login
        </button>
        {showErr && <p className="error">{errMsg}</p>}
      </form>
    )
  }
}
export default Login
