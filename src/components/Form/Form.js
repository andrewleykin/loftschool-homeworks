import React, { Component } from 'react'
import './Form.css'
import imgSrc from './assets/bond_approve.jpg'


export default class extends Component {

  state = {
    trueCounter: 0,
    defaults: ['james', 'bond', '007'],
    forms: [
      {
        label: 'Имя',
        id: 'firstname',
        name: 'firstname',
        type: 'text',
        inputClass: 't-input-firstname',
        errorClass: 't-error-firstname',
        value: '',
        error: '',
        incorrect: 'Имя указано не верно',
        missing: 'Нужно указать имя'
      },
      {
        label: 'Фамилия',
        id: 'lastname',
        name: 'lastname',
        type: 'text',
        inputClass: 't-input-lastname',
        errorClass: 't-error-lastname',
        value: '',
        error: '',
        incorrect: 'Фамилия указана не верно',
        missing: 'Нужно указать фамилию'
      },
      {
        label: 'Пароль',
        id: 'password',
        name: 'password',
        type: 'password',
        inputClass: 't-input-password',
        errorClass: 't-error-password',
        value: '',
        error: '',
        incorrect: 'Пароль указан не верно',
        missing: 'Нужно указать пароль'
      }
    ]
  }

  clearError = () => {
    const { forms } = this.state
    for (let i = 0; i < forms.length; i++) {
      forms[i].error = ''
    }
    this.setState({ forms })
  }

  handleChange = (index, event) => {
    const { forms } = this.state
    forms[index].value = event.target.value
    this.clearError()
    this.setState({ forms })
  }

  updateCounter = () => {
    let counter = 0;
    const { defaults, forms } = this.state;

    for (let i = 0; i < defaults.length; i++) {
      if (defaults[i] !== forms[i].value) {
        forms[i].value === '' ? forms[i].error = forms[i].missing : forms[i].error = forms[i].incorrect
      } else {
        counter++
      }
    }
    this.setState({ trueCounter: counter, forms })
  }
  
  handleSubmit = event => {
    event.preventDefault();
    this.updateCounter();
  }

  render() {
    const { trueCounter } = this.state
    if (trueCounter === 3) {
      return (
        <div className="app-container">
          <img className="t-bond-image" src={imgSrc} alt="bond approve" />
        </div>
      ) 
    }
    return (
      <div className="app-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1>Введите свои данные, агент</h1>
          {this.state.forms.map((elem, index) => {
            return (
              <p className="field" key={elem.id}>
                <label className="field__label" htmlFor={elem.id}>
                  <span className="field-label">{elem.label}</span>
                </label>
                <input 
                  className={`field__input field-input ${elem.inputClass}`}
                  name={elem.name}
                  id={elem.id}
                  type={elem.type} 
                  value={elem.value} 
                  onChange={this.handleChange.bind(this, index)}
                />
                <span className={`field__error field-error ${elem.errorClass}`}>{elem.error}</span>
              </p>
            )
          })}
          <div className="form__buttons">
            <input type="submit" className="button t-submit" value="Проверить" />
          </div>
        </form>
      </div>
    )
  }
}