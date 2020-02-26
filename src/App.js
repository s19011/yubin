import React from 'react'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>郵便番号を入力</h1>
          <p>
            <input
              type='number'
              name='past'
              title='郵便番号は、7桁の数字を記入してください。'
              placeholder='0000000'
              value={this.state.zip_code}
              onChange={e => this.setState({ zip_code: e.target.value })}
            />
          </p>

          <button type='submit' onClick={this.handleClick}>
            住所を表示
          </button>

          <p className='example' style={this.state.address_style}>
            {this.state.address}
          </p>
        </header>
      </div>
    )
  }
  handleClick () {
    fetch('https://api.zipaddress.net/?zipcode=' + this.state.zip_code, {
      mode: 'cors'
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.setState({ address: json.data.fullAddress })
      })
  }

  constructor (props) {
    super(props)
    this.state = {
      address: 'まだ住所をとってません',
      zip_code: '',
      address_style: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }
}

export default App
