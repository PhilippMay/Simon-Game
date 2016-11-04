

var Controller = React.createClass({
    arr: [],
    userArr: [],
      start: function () { 
      this.makeStep();},
    
    userInputR: function(){this.userInput(1); this.fireLedR()},
      userInputG: function(){this.userInput(3); this.fireLedG()},
      userInputB: function(){this.userInput(4); this.fireLedB()},
      userInputY: function(){this.userInput(2); this.fireLedY()},
    
    sound:  function(val){
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = val;
        oscillator.start();
       setTimeout(function(){audioCtx.close();}, 300);
        
    }, 
    
   
    userInput: function(val){
         
       this.userArr.push(val);
        var i = this.userArr.length - 1;
        if (this.arr[i] != this.userArr[i] && this.state.strict === false) {console.log("mistake!"); this.sound(230); $("svg").effect("bounce", {times:3}, 700); this.userArr = []; setTimeout(this.makeStep(1), 2000)}
        
        else if (this.arr[i] != this.userArr[i] && this.state.strict === true) {console.log("mistake!"); this.sound(230); $("svg").effect("bounce", {times:3}, 700); this.reset()};
        if (this.userArr.length == 20) { setTimeout($("svg").slideToggle(), 3000); this.setState({win: "block"})}
       else  if (this.arr.length == this.userArr.length) {console.log("Next step"); this.userArr = []; setTimeout(this.makeStep(), 4000)};
        
         
        console.log("user array: " + this.userArr);
    },
    
    makeStep: function(val) {
      
        if (val != 1) {this.state.count++; this.arr.push(Math.floor(Math.random()*4 + 1));}
        console.log(this.arr);
        var i = 0;
       while (i < this.arr.length){
            if (this.arr[i] === 1) { setTimeout(this.fireLedR, (i+2)*1000);i++;}
            else if (this.arr[i] === 2) { setTimeout(this.fireLedY, (i+2)*1000);i++;}
            else if (this.arr[i] === 3) { setTimeout(this.fireLedG, (i+2)*1000);i++;}
            else if (this.arr[i] === 4) { setTimeout(this.fireLedB, (i+2)*1000);i++;}
            else {i++;}
        };
        console.log("array: " +this.arr);
        },
    
     getInitialState: function(){
        return {led: {ledR: ["#f06b59","#df2227"],
                              ledG: ["#4cb749","#388b41"],
                              ledY: ["#FCD209","#f7c616"],
                              ledB: ["#7FB3DF","#0F5B94"]},
                count: 0,
                strict: false,
                win: "none"
                
               }
    },
    toDefault: function () {
      return   this.setState({led: {ledR: ["#f06b59","#df2227"],
                              ledG: ["#4cb749","#388b41"],
                              ledY: ["#FCD209","#f7c616"],
                              ledB: ["#7FB3DF","#0F5B94"]
                             }});
    },
    fireLedY: function(){
       this.sound(250);
        //setTimeout(this.sound(2), 1000);
        this.setState({led: {ledR: ["#f06b59","#df2227"],
                              ledG: ["#4cb749","#388b41"],
                              ledY: ["#FFFF00","#ffff00"],
                              ledB: ["#7FB3DF","#0F5B94"]
                             }});
        
        setTimeout(this.toDefault, 300);
            
    },
    fireLedR: function(){
   this.sound(270);
        this.setState({led: {ledR: ["#ff5500","#ff5500"],
                              ledG: ["#4cb749","#388b41"],
                              ledY: ["#FCD209","#f7c616"],
                              ledB: ["#7FB3DF","#0F5B94"]
                             }});
        setTimeout(this.toDefault, 300);
            
    },
      fireLedG: function(){
  this.sound(290);
        this.setState({led: {ledR: ["#f06b59","#df2227"],
                              ledG: ["#00ff00","#00ff00"],
                              ledY: ["#FCD209","#f7c616"],
                              ledB: ["#7FB3DF","#0F5B94"]
                             }});
        setTimeout(this.toDefault, 300);
            
    },
      fireLedB: function(){
          this.sound(310);
        this.setState({led: {ledR: ["#f06b59","#df2227"],
                              ledG: ["#4cb749","#388b41"],
                              ledY: ["#FCD209","#f7c616"],
                              ledB: ["#0F5B94","#0000ff"]
                             }});
        setTimeout(this.toDefault, 300);
            
    },
   reset: function(){ this.arr = []; this.userArr = []; this.setState({count: 0})},
    toggleSM: function(){this.setState({strict: !this.state.strict})},
    
       render: function(){
           return(
           <div> 
    
      <div className="control">
      <button className="btn btn-primary" onClick={this.start} >Start</button>
     <span id="display" >{this.state.count}</span>
     <button className="btn btn-danger" onClick={this.reset}>Reset</button>
          <form>
         <input type="checkbox" onChange={this.toggleSM} id="cb" /> <label htmlFor="cb">Strict mode</label>
          </form>
      </div>
                   <h3 style={{display: this.state.win}}>Winner</h3>
       <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="15.5 15.5 224.5 224.5">
                <defs>
                    <radialGradient cy="0" cx="0.5" id="r">
                        <stop stopColor={this.state.led.ledR[0]} />
                        <stop offset="1" stopColor={this.state.led.ledR[1]} />
                    </radialGradient>
                    <radialGradient r="0.76" cy="0.3" cx="0.65" id="g">
                        <stop offset="0.65" stopColor={this.state.led.ledG[0]} />
                        <stop offset="1" stopColor={this.state.led.ledG[1]} />
                    </radialGradient>
                    <radialGradient r="0.8" cy="0.25" cx="0.36" id="y">
                       <stop offset="0.6" stopColor={this.state.led.ledY[0]} />
                        <stop offset="0.7" stopColor={this.state.led.ledY[1]} />
                        <stop offset="1" stopColor="#bc821e" />
                    </radialGradient>
                    <radialGradient r="1" cy="0" cx="0.5" spreadMethod="pad" id="cf">
                        <stop offset="0.1" stopColor={this.state.led.ledB[0]} />
                        <stop offset="0.9" stopColor={this.state.led.ledB[1]} />
                    </radialGradient>
                    <radialGradient id="cb" r="1" cy="0" cx="0.5">
                        <stop offset="0" stopColor="#F6F0EE" />
                        <stop offset="1" stopColor="#ddd" />
                    </radialGradient>
                </defs>
                <path d="m198,148a70,70 0 0 0 -140,0l20,0a50,50 0 0 1 100,0" fillOpacity="0.1" />
                <circle r="45" cx="127.5" cy="127.6" fill="url(#cf)" stroke="url(#cb)" strokeWidth="9" onClick={this.userInputB} />
                <path d="m228,78a112,112 0 0 0 -193,-13l45,78a50,50 0 0 1 47,-65" fill="url(#r)" onClick={this.userInputR} />
                <path d="m35,65a112,112 0 0 0 84,174l47,-80a50,50 0 0 1 -86,-16" fill="url(#g)" onClick={this.userInputG} />
                <path d="m119,239a112,112 0 0 0 109,-161l-101,0a50,50 0 0 1 39,81" fill="url(#y)" onClick={this.userInputY} />
                <path d="m35,65l45,78a50,50 0 0 1 2,-34l-45,-47" opacity="0.075" />
                <path d="m119,239l47,-80a50,50 0 0 1 -29,17l-20,63" opacity="0.05" />
                <path d="m228,78l-101,0a50,50 0 0 1 39,19l64,-16" opacity="0.05" />
            </svg>
     
       </div>
              )
       },                            
                                    
  });
ReactDOM.render( 

 <Controller />
   ,
    document.getElementById('adjust')
);
