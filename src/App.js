import React from 'react'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>郵便番号をいれてください</p>
          <p>
            <input
              type='text'
              value={this.state.zip_code}
              onChange={e => this.setState({ zip_code: e.target.value })}
            />
          </p>

          <a onClick={this.handleClick}>住所を表示</a>

          {/* ***** p に style を指定 ***** */}
          <p style={this.state.address_style}>{this.state.tenki}</p>
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
        this.setState({ tenki: json.data.fullAddress })
      })
  }

  constructor (props) {
    super(props)
    this.state = {
      tenki: 'まだ住所をとってません',
      zip_code: '',
      address_style: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }
}

export default App
