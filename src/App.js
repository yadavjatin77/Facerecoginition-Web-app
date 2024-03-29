import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Facerecoginition from './Components/Facerecoginition/Facerecoginition';
import Signin from './Components/Signin/Signin';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '362d34d4b52d4c979315447f4726cbe1'
});

const particlesOptions = {
        particles: {
        number:{
        value:150,
        density:{
        enable:true,
        value_area:800
      }
    }
  }
}
class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }
  calculateFaceLocation = (data) =>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

onRouteChange = (route) =>{
  if(route=== 'signout')
  {
    this.setState({isSignedIn:false})
  }
  else if(route==='home')
  {
    this.setState({isSignedIn:true})
  }
  this.setState({route:route});
}

render() {
 const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
       <Particles className="particles"
            params={particlesOptions}
       />
    <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
    { route==='home'
    ?<div>
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}
      />
      <Facerecoginition box={box} imageUrl={imageUrl} />
      </div> 
    :(route === 'signin'
      ? <Signin onRouteChange={this.onRouteChange}/>
      : <Register onRouteChange={this.onRouteChange}/>
      )
  }
    </div>
  );
}
}
export default App;
