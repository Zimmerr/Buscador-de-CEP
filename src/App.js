import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import CEP from './CEP';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', items: [], nome:'', delete: false};

    this.atualizaState = this.atualizaState.bind(this);
    this.pesquisaCEP = this.pesquisaCEP.bind(this);
    this.deletar = this.deletar.bind(this);
  }

  atualizaState(event) {
    this.setState({value: event.target.value});
  }

  /*async teste2(link) {
    try {
      let response = await fetch(link);
      let responseJson = await response.json();
      return responseJson.logradouro;
    } catch(error) {
      alert(error);
    }
  }*/

  teste(link) {
    console.log(link);
    return fetch(link)
      .then((response) =>{ 
        return response.json();
      })
     // .then((responseJson) => {
     //   console.log('parsed json', responseJson);
     // })
      .then((responseJson) => {
        console.log('parsed json', responseJson);
        var nomezera = (
        "CEP: " + responseJson.cep +
        "; Logradouro: " + responseJson.logradouro +
        //"; Complemento: " + responseJson.complemento +
        "; Bairro: " + responseJson.bairro +
        "; Cidade: " + responseJson.localidade +
        "; UF: " + responseJson.uf 
        );
        this.setState({nome: nomezera})
        this.addItem();
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addItem() {
    var itemArray = this.state.items;
 
    if (this.state.nome !== "") {
      itemArray.unshift(
        {
          text: this.state.nome,
          key: Date.now()
        }
      );
 
      this.setState({
        items: itemArray
      });
 
      //this._inputElement.value = "";
    }
 
    console.log(itemArray);
    //e.preventDefault();
  }


  pesquisaCEP(event) {
    this.setState({delete: false})
    var cep = this.state.value.replace(/\D/g, '');
    if(cep !== ""){
      var validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)){
        var link = 'https://viacep.com.br/ws/' + cep + '/json/'; 
        var resposta = this.teste(link);
        //alert(data.logradouro);
      }
    }
     //error here
    event.preventDefault();
  }

  deletar(){
    
    var itemArray = [];
    this.setState({delete: true, items: itemArray})
  }

  render() {
    return (
      <div className="">
        <div className="page-header">
          <h1>Busca CEP</h1> 
          <h5>Descubra informações completas de um endereço a partir de seu CEP</h5> 
          <hr></hr>
        </div> 
        
        
        <div className="ceplist form-group">
          <form onSubmit={this.pesquisaCEP}>
            <label>
             <input placeholder="Insira um CEP aqui" className="form-control" type="text" value={this.state.value} onChange={this.atualizaState} />
            </label>
            <br></br>

            <button type="submit" className="btn btn-primary busca">Pesquisar</button>
            <button type="button" className="btn btn-primary limpa" onClick={this.deletar}>Limpar</button>
          </form>
        </div>
        <div className="lista">
          <CEP entries={this.state.items} delete={this.state.delete}/>
        </div>
      </div>
    );
  }
}

export default App;
