import React from 'react'
import data from './data.js'
import './App.css'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      length: data.length,
      degStep: 360 / data.length,
      deg: 0,
      activeIndex: 0
    }
    
  }

  componentDidMount(){

  }

  changeItem = (index) => {

    const { degStep, deg, activeIndex } = this.state
 
    if ( index === activeIndex ) return
		
		if (index > activeIndex && (index - activeIndex) * degStep <= 180) {
      this.setState({
        deg: deg - ( index - activeIndex ) * degStep
      })
		}

		if ( index < activeIndex && (activeIndex - index) * degStep <= 180 ) {
      this.setState({
        deg: deg + ( activeIndex - index ) * degStep
      })
		}

		if ( index > activeIndex && (index - activeIndex) * degStep > 180 ) {
      this.setState({
        deg: deg + ( 360 - (index - activeIndex) * degStep )
      })
		}

		if ( index < activeIndex && (activeIndex - index) * degStep > 180 ) {
      this.setState({
        deg: deg - ( 360 - (activeIndex - index) * degStep )
      })
    }
    this.setState({
      activeIndex: index
    })
  }
  
  render(){
    const { deg, length, activeIndex } = this.state
    
    return (
      <div className="wrapper" style={{
        transform:`rotate(${deg}deg)`
      }}>
        {
          data.map((v, i)=>{
            return (
              <div key={i} className="itemWrapper" style={{
                transform:`rotate(${360 / length * i}deg)`
              }}>
                <div className={i === activeIndex ? 'item item-active' : 'item'} style={{
                  transform: `rotate(${-360 / length * i - deg}deg)`,
                }}
                onClick={()=>this.changeItem(i)}
                >
                  {
                    v.value
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;
