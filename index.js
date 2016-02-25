var React = require("react")

var RippleAnimation = React.createClass({
  getDefaultProps: function() {
    return {
      color: '#1abc9c',
      strokeWidth: 3,
      size: 60,
    };
  },
  getInitialState: function(){
    return {
      radius1: this.props.size/4,
      radius2: 0,
      opacity1: .0,
      opacity2: .0,
      intervalFn: null,
    }
  },
  componentDidMount: function() {
    var that = this;
    var intervalFn = setInterval(function() {
      that.performTick()
    }, 10)
    this.setState({
      intervalFn: intervalFn
    })
  },

  componentWillUnmount: function() {
    clearInterval(this.state.intervalFn)
  },

  performTick: function(){
    var maxRadius = (this.props.size/2) - this.props.strokeWidth;
    var newRadius1 = (this.state.radius1 % maxRadius) + .1;
    var newRadius2 = (this.state.radius2 % maxRadius) + .1;
    var newOpacity1 = 1 - (newRadius1/(maxRadius))
    var newOpacity2 = 1- (newRadius2/(maxRadius))

    this.setState({
     radius1: newRadius1,
     radius2: newRadius2,
     opacity1: newOpacity1,
     opacity2: newOpacity2
    });
  },

  render: function(){
    return (
      <svg 
        width={String(this.props.size)} 
        height={String(this.props.size)} 
        viewBox={"0 0 "+this.props.size+" " +this.props.size} 
        preserveAspectRatio="xMidYMid">
        <rect 
          x="0" 
          y="0" 
          width={String(this.props.size)} 
          height={String(this.props.size)} 
          fill="#ffffff" 
          style={{fill: "rgb(254, 254, 254)"}}>
        </rect>
        <circle 
          cx={String(this.props.size/2)} 
          cy={String(this.props.size/2)} 
          r={String(this.state.radius1)} 
          fill="none" 
          strokeWidth={String(this.props.strokeWidth)} 
          strokeLinecap="round" 
          style={{stroke: this.props.color}} 
          opacity={String(this.state.opacity1)}>
        </circle>
        <circle 
          cx={String(this.props.size/2)} 
          cy={String(this.props.size/2)}
          r={String(this.state.radius2)}
          fill="none"
          strokeWidth={String(this.props.strokeWidth)}
          strokeLinecap="round"
          style={{stroke: this.props.color}}
          opacity={String(this.state.opacity2)}>
        </circle>
      </svg>
    )
  }
})

module.exports = RippleAnimation;
