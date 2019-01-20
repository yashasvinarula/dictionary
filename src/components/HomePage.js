import React, {Component} from 'react';
import axios from 'axios';
import Loader from './Loader';


class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      word: '',
      isLoading: false,
      types: [],
      meanings: [],
      searchedWord: '',
      history: []
    };
  }


  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  searchWord = event => {
    const {word, history} = this.state;
    if(event.keyCode === 13 && word.trim().length !== 0){
      let found = false;
      var i = 0;
      for(i=0 ; i<history.length ; i++){
        if(history[i].word === word){
          found = true;
          break;
        }
      }
      if(!found){
        this.setState({isLoading: true});
        const url = `https://mydictionaryapi.appspot.com/?define=${word}&lang=en`;
        axios
          .get(url)
          .then(data => {
              const types = Object.keys(data.data[0].meaning);
              const meanings = Object.values(data.data[0].meaning);
              console.log('meanings', meanings);
              this.setState({types, meanings});
              this.setState({searchedWord: data.data[0].word});
              this.pushToHistory(data.data[0].word, meanings, types, false, -1);
              this.setState({isLoading: false, err: ''});
            }
          )
          .catch(err => this.setState({isLoading: false}));
      }else{
        this.pushToHistory('', [], [], true, i);
      }
    }
  }

  pushToHistory = (word, meaning, types, found, index) => {
    const {history} = this.state;
    if(found){
      let obj = history[index];
      this.setState({searchedWord: obj.word, meanings: obj.meaning, types: obj.types});
      console.log("obj meaning", obj.meaning);
      history.splice(index, 1);
      history.push(obj);
      this.setState({history});
    }else{
      if(word.trim().length > 0){
        let obj = {
          word: word,
          types: types,
          meaning: meaning
        }
        history.push(obj);
        this.setState({history});
      }
    }
  }

  searchFromHistory = index => {
    const {history} = this.state;
    let obj = history[history.length - 1 - index];
    history.splice(history.length - 1 - index, 1);
    history.push(obj);
    this.setState({history});
    this.setState({searchedWord: obj.word, meanings: obj.meaning, types: obj.types});
    // console.log(index, history[history.length - 1 - index]);
  }

  render(){
    const {word, isLoading, types, meanings , searchedWord, history} = this.state;
    const Definition = types.map((type, index) => {
      const meaning = meanings[index];
      return (
        <div className = 'container' key = {index} >
          <span style = {{fontSize: '16px', textTransform: 'capitalize'}} className = 'red-text'>{type}</span>
          <hr/>
          {
            meaning.map((m,i) =>(
                <div key = {i}>
                  {i+1}. {' '}
                  {m.definition}
                  <br />
                  <span className="red text">{m.example}</span>
                  <br />
                </div>
              )
            )
          }
          <br />
          <br />
          <br />
        </div>
      );
    });


    return(
      <div className = 'row' style = {{height: '650px'}}>
        <div className="blue col s12 m10 l8 offset-l2 offset-m1 white-text" style = {{height: '60px', paddingTop: '5px'}}>
          <div className="row" style = {{height: '50px'}}>
            <div className="col s2 m1 valign-wrapper" style = {{height: '50px'}}>
              <i className="material-icons" style = {{margin: 'auto'}}>search</i>
            </div>
            <div className="col s8 m10" style = {{height: '50px'}}>
              <input
                type="text"
                className = 'white-text'
                placeholder = 'Search for a word..'
                name = 'word'
                onChange = {this.onChange}
                onKeyUp = {this.searchWord}
                />
            </div>
            <div className="col s2 m1 valign-wrapper" style = {{height: '50px'}}>
              <i className="material-icons dropdown-trigger" data-target = 'history' style = {{margin: 'auto'}}>history</i>
            </div>
            <ul id='history' className='dropdown-content'>
              {
                history.slice(0).reverse().map((h, i) => (
                  <li onClick = {() => this.searchFromHistory(i)} key = {i}>
                    <a>
                      <span style = {{textTransform: 'capitalize'}}>
                        {h.word}
                      </span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        {
          isLoading ? <Loader /> : (
              meanings.length > 0 ? (
                <div className="white col s12 m10 l8 offset-l2 offset-m1" style = {{height: '650px', overflow: 'auto'}}>
                  <div className="blue center lighten-2 row"style =  {{textTransform: 'capitalize', fontSize: '20px', fontWeight: 'bold'}}>
                    {searchedWord}
                  </div>
                  <div className="row">
                    {Definition}
                  </div>
                </div>
              ) : (
                <div className="white col s12 m10 l8 offset-l2 offset-m1" style = {{height: '650px'}}>
                </div>
              )
          )
        }
      </div>
    );
  }
}


export default HomePage;
