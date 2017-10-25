import React, { Component } from 'react';
import axios from 'axios';

export default class AddOption extends Component {

    constructor() {
        super()
        this.state = {
            optionName: '',
            optionDescription: '',
            numOfDice: '1',
            sideOfDice: '4',
            modifier: '',
            optionPassCase: 1,
            successText: '',
            failText: '',
            successEncounter: -1,
            failedEncounter: -1,
            optionImagesId: -1,
            healthConsequences: 0,
            optionImages: []
        }
    }

    componentDidMount() {
        axios.get('/api/images/option').then(resp => {
            this.setState({
                optionImages: resp.data
            })
        })
    }

    isValid() {
        if (this.state.optionName !== '' &&
            this.state.optionDescription !== '' &&
            this.state.successText !== '' &&
            this.state.failText !== '' &&
            this.state.successEncounter !== -1 &&
            this.state.failedEncounter !== -1 &&
            this.state.optionImagesId !== -1) {
            return true;
        }
        return false
    }
    saveOption() {
        let body = {
            encounterId: this.props.encounter.encounter_id,
            optionName: this.state.optionName,
            optionDescription: this.state.optionDescription,
            optionOdds: this.makeOdds(),
            optionPassCase: this.state.optionPassCase,
            successText: this.state.successText,
            failText: this.state.failText,
            successEncounter: this.state.successEncounter,
            failedEncounter: this.state.failedEncounter,
            optionImagesId: this.state.optionImagesId,
            healthConsequences: this.state.healthConsequences
        }
        axios.post('/api/option', body).then(resp =>{
            this.props.resetView();
        })
    }


    makeOdds() {
        let tempStr = `${this.state.numOfDice}d${this.state.sideOfDice}`
        if (this.state.modifier !== '') {
            tempStr += `+${this.state.modifier}`
        }
        return tempStr
    }

    changeName(name) {
        this.setState({
            optionName: name
        });
    }

    changeDescription(description) {
        this.setState({
            optionDescription: description
        });
    }

    changeOptionImage(optionImage) {
        this.setState({
            optionImagesId: parseInt(optionImage)
        });
    }

    changeNumOfDice(num) {
        this.setState({
            numOfDice: num
        });
    }

    changeSidesOfDice(num) {
        this.setState({
            sideOfDice: num
        });
    }

    changePassCase(num) {
        this.setState({
            optionPassCase: num
        });
    }

    changeHealthConsequence(num) {
        this.setState({
            healthConsequences: num
        });
    }

    changeSuccessText(text) {
        this.setState({
            successText: text
        });
    }

    changeFailText(text) {
        this.setState({
            failText: text
        });
    }

    changeSuccesEncounter(encounterId) {
        this.setState({
            successEncounter: parseInt(encounterId)
        });
    }

    changeFailedEncounter(encounterId) {
        this.setState({
            failedEncounter: parseInt(encounterId)
        });
    }

    changeModifier(str) {
        this.setState({
            modifier: str
        });
    }

    render() {
        let previousEncounters = this.props.encounter.options.map(option => {
            return (
                <div key={option.encounter_option_id}>
                    {option.option_name}
                    {option.option_description}
                </div>)

        });
        let encounterOptions = this.props.storyEncounters.map(encounter => (
            <option key={encounter.encounter_id} value={encounter.encounter_id}>{encounter.encounter_name}</option>
        ))

        let successEncounterImage = this.props.storyEncounters.find(encounter =>
            encounter.encounter_id === this.state.successEncounter
        );

        let failedEncounterImage = this.props.storyEncounters.find(encounter =>
            encounter.encounter_id === this.state.failedEncounter
        );

        let imageOptions = this.state.optionImages.map(optionImage =>
            <option
                key={optionImage.option_images_id}
                value={optionImage.option_images_id}>
                {optionImage.image_name}
            </option>
        )

        let optionImage = this.state.optionImages.find(image =>
            image.option_images_id === this.state.optionImagesId
        );
        return (
            <div>
                <h3 className="pad-it">Selected Encounter:</h3> <span className="indent-it">{this.props.encounter.encounter_name}</span>
                <h3 className="pad-it">Selected Encounter Description:</h3> <span className="indent-it">{this.props.encounter.encounter_description}</span>
                <h3 className="pad-it">Previous Options:</h3><span className="indent-it"> {previousEncounters}</span><br/>
                <h2>New Option</h2>
                <div>
                    <h3>Option Name:</h3>
                    <input className="base-input pad-it " onChange={e => this.changeName(e.target.value)} type='text' value={this.state.optionName} />
                </div>
                <div>
                    <h3>Option Description:</h3>
                    <textarea className="base-input pad-it " onChange={e => this.changeDescription(e.target.value)} value={this.state.optionDescription} />
                </div>
                <div>
                    <h3>Option Image:</h3>
                    <select value={this.state.optionImagesId} onChange={e => this.changeOptionImage(e.target.value)}>
                        <option value={-1}>Select One</option>
                        {imageOptions}
                    </select>
                    <div>
                        {optionImage
                            ?
                            <img className="pad-it story-creator-add-img" src={optionImage.image_src} alt={optionImage.image_name} />
                            :
                            <p className="indent-it">No option image selected yet</p>}
                    </div>
                </div>
                <div>
                   <h3> Number of Dice to Roll:</h3>
                    <select  onChange={e => this.changeNumOfDice(e.target.value)} value={this.state.numOfDice} >
                        <option defaultValue value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                </div>
                <div>
                   <h3>Sides of Dice to Roll:</h3>
                    <select onChange={e => this.changeSidesOfDice(e.target.value)} value={this.state.sideOfDice} >
                        <option defaultValue value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={12}>12</option>
                        <option value={20}>20</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div>
                   <h3>Modifiers:</h3>

                    <div>
                        <input type='radio' name='modifier' value='' onChange={e => this.changeModifier(e.target.value)} />
                        <span className="indent-it">None</span>
                    </div>
                    <div>
                        <input  type='radio' name='modifier' value='str' onChange={e => this.changeModifier(e.target.value)} />
                        <span className="indent-it">Strength</span>
                    </div>
                    <div>
                        <input type='radio' name='modifier' value='dex' onChange={e => this.changeModifier(e.target.value)} />
                        <span className="indent-it">Dexterity</span>
                    </div>
                    <div>
                        <input  type='radio' name='modifier' value='cha' onChange={e => this.changeModifier(e.target.value)} />
                        <span className="indent-it">Charisma</span>
                    </div>
                </div>
                <div>
                   <h3> Needed Roll to Pass</h3>
                    <input className="base-input"
                        onChange={e => this.changePassCase(e.target.value)}
                        type='number'
                        value={this.state.optionPassCase}
                        min={1}
                        max={this.state.numOfDice * this.state.sideOfDice} />
                </div>
                <div>
                    <h3>Health Consequences:</h3>
                    <input className="base-input"
                        type='number'
                        value={this.state.healthConsequences}
                        onChange={e => this.changeHealthConsequence(e.target.value)}
                        min={-3}
                        max={5} />
                </div>
                <div>
                    <h3>Success Text:</h3>
                    <textarea 
                        onChange={e => this.changeSuccessText(e.target.value)}
                        value={this.state.successText} />
                </div>
                <div>
                   <h3> Success Encounter</h3>
                    <select
                        onChange={e => this.changeSuccesEncounter(e.target.value)}
                        value={this.state.successEncounter}>
                        <option defaultValue value={-1}>Select One</option>
                        {encounterOptions}
                    </select>
                </div>
                <div>
                   <h3>Preview Success Encounter:</h3>
                    {
                        this.state.successEncounter === -1
                            ?
                            <p className="indent-it">No success encounter selected</p>
                            :
                            <img className="pad-it story-creator-add-img"
                                src={successEncounterImage.image_src}
                                alt={successEncounterImage.image_name} />
                    }
                </div>
                <div>
                   <h3>Fail Text:</h3>
                    <textarea 
                        onChange={e => this.changeFailText(e.target.value)}
                        value={this.state.failText} />
                </div>
                <div>
                    <h3>Failed Encounter</h3>
                    <select
                        onChange={e => this.changeFailedEncounter(e.target.value)}
                        value={this.state.failedEncounter}>
                        <option defaultValue value={-1}>Select One</option>
                        {encounterOptions}
                    </select>
                </div>
                <div>
                   <h3> Preview Failed Encounter:</h3>
                    <div className="indent-it">
                    {
                        this.state.failedEncounter === -1
                            ?
                            <p>no failed encounter select</p>
                            :
                            <img className="pad-it story-creator-add-img" 
                                src={failedEncounterImage.image_src}
                                alt={failedEncounterImage.image_name} />
                    }
                    </div>
                </div>

                {this.isValid() && <button className="btn" onClick={_=>this.saveOption()}>Save Option</button>}
            </div>
        );
    }
}