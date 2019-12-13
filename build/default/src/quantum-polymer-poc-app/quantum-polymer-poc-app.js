import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-ajax/iron-ajax.js";
import "../../node_modules/@vaadin/vaadin-date-picker/vaadin-date-picker.js";
import "../../node_modules/@vaadin/vaadin-radio-button/vaadin-radio-button.js";
import "../../node_modules/@vaadin/vaadin-radio-button/vaadin-radio-group.js";
import "../../node_modules/@vaadin/vaadin-combo-box/vaadin-combo-box.js";
import "../../node_modules/@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import "../../node_modules/@vaadin/vaadin-text-field/vaadin-text-field.js";
import "../../node_modules/@vaadin/vaadin-text-field/vaadin-text-area.js";
import "../../node_modules/@vaadin/vaadin-form-layout/vaadin-form-layout.js";
import "../../node_modules/@vaadin/vaadin-dialog/vaadin-dialog.js";
/**
 * @customElement
 * @polymer
 */

class QuantumPolymerPocApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        code {
          font-family: var(--lumo-font-family);
          font-size: var(--lumo-font-size-s);
        }
      </style>

      <iron-ajax
        auto
        url="./src/employee-data.json"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
      </iron-ajax>
      
      <vaadin-form-layout>
        <vaadin-text-field label="Employee name" value="{{employee.name}}" placeholder="Placeholder"></vaadin-text-field>
    
        <vaadin-text-area label="Address" value="{{employee.address}}" 
          placeholder="Write address here ..."></vaadin-text-area>

        <vaadin-date-picker label="Date of birth" placeholder="Placeholder">
        </vaadin-date-picker>
        
        <vaadin-radio-group label="Gender" value="{{employee.gender}}">
          <vaadin-radio-button value="male" checked$="{{isGender('male')}}">Male</vaadin-radio-button>
          <vaadin-radio-button value="female" checked$="{{isGender('female')}}">Female</vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-combo-box label="Occupation" value="{{employee.occupation}}" items="{{professions}}"></vaadin-combo-box>
        <p></p>
        <vaadin-checkbox checked="{{employee.isEmployed}}">Are you currently employed</vaadin-checkbox>
        <p></p>
        <vaadin-button on-click="showModal" theme="primary">Primary</vaadin-button>
      </vaadin-form-layout>

      <vaadin-dialog aria-label="polymer templates">
        <template>
          <p>Here is the employee modified value</p>
          <pre class="prettyprint">
            <code>{{employeeJson}}</code>
          </pre>
        </template>
      </vaadin-dialog>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'quantum-polymer-poc-app'
      },
      employeeJson: {
        type: String,
        value: ''
      },
      employee: {
        type: Object,
        value: {}
      },
      professions: {
        type: Array,
        value: ['Software Engineer', 'Professor', 'Doctor', 'Scientist', 'Lawyer']
      }
    };
  }

  ready() {
    super.ready();
  }

  handleResponse({
    detail
  }) {
    this.employee = detail.response;
  }

  showModal(e) {
    this.employeeJson = this.toEmployeeJson();
    this.shadowRoot.querySelector('vaadin-dialog').opened = true;
    requestAnimationFrame(PR.prettyPrint);
  }

  toEmployeeJson() {
    return JSON.stringify(this.employee, null, 2);
  }

  isGender(gender) {
    this.employee.gender === gender;
  }

  setGender(e) {
    this.employee.gender = e.target.value;
    this.employee = { ...this.employee
    };
  }

}

window.customElements.define('quantum-polymer-poc-app', QuantumPolymerPocApp);