import React, { Component } from 'react';
import axios from 'axios';

export default class AddEncounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encounterName: '',
            encounterDescription: '',
            finalEncounter: 0,
            encounterBackGroundImage: -1,
            encounterImages: []
        }
    }


    componentDidMount() {
        axios.get('/api/images/encounter').then(resp => {
            this.setState({
                encounterImages: resp.data
            })
        })
    }

    changeImage(imageId) {
        this.setState({
            encounterBackGroundImage: parseInt(imageId)
        })
    }

    changeName(name) {
        this.setState({
            encounterName: name
        });
    }

    changeDescription(description) {
        this.setState({
            encounterDescription: description
        })
    }

    changeFinal(isFinal){
        this.setState({
            finalEncounter: parseInt(isFinal)
        });
    }

    isValid() {
        if (this.state.encounterDescription !== '' && this.state.encounterName !== '' && this.state.encounterBackGroundImage != -1) {
            return true;
        }
        return false;
    }

    save(){
        this.props.isFirst
        ?
        this.saveFirstEncounter()
        :
        this.saveEncounter()
        ;
    }

    saveFirstEncounter(){
        let body ={
            encounterName: this.state.encounterName, 
            encounterDescription: this.state.encounterDescription, 
            finalEncounter: 0, 
            storyId: this.props.storyId, 
            encounterBackGroundImage: this.state.encounterBackGroundImage
        }

        axios.post('/api/firstEncounter', body).then(_=>{
            this.props.resetView();
        });
    }
    saveEncounter(){
        let body ={
            encounterName: this.state.encounterName, 
            encounterDescription: this.state.encounterDescription, 
            finalEncounter: this.state.finalEncounter, 
            storyId: this.props.storyId, 
            encounterBackGroundImage: this.state.encounterBackGroundImage
        }
        
        axios.post('/api/encounter', body).then(_=>{
            this.props.resetView();
        });
    }

    render() {
        let imageSelector = (
            <select onChange={e => this.changeImage(e.target.value)}>
                <option value={-1}>Select an Image</option>
                {this.state.encounterImages.map(image => {
                    return <option
                        key={image.encounter_background_images_id}
                        value={image.encounter_background_images_id}>
                        {image.image_name}
                    </option>
                })}
            </select>
        )

        let selectedImage = this.state.encounterImages.find(image => {
            return this.state.encounterBackGroundImage == image.encounter_background_images_id
        });
        return (
            <div>
                {
                    this.props.isFirst
                    &&
                    <h3> This is the starting encounter of your story! where the user will begin their epic quest.</h3>
                }

               <h3> Name:</h3> <input className="base-input" onChange={e => this.changeName(e.target.value)} value={this.state.encounterName} />
                <h3>Description:</h3> <textarea className="base-input" onChange={e => this.changeDescription(e.target.value)} value={this.state.encounterDescription} />
               <h3> Background Image:</h3>
                    {imageSelector}
                <h3>Preview :</h3>
                <div className="story-creator-img">
                {
                    this.state.encounterBackGroundImage != -1
                        ?
                        <img
                            src={selectedImage.image_src}
                            alt={selectedImage.image_name} />
                        :
                        <div><h3>No Image Selected</h3></div>
                }
                </div>
                {
                    !this.props.isFirst
                    &&
                    <div>
                        is a ending to the story 
                        <select onChange={e=>this.changeFinal(e.target.value)}>
                            <option value={0}>no</option>
                            <option value={1}>yes</option>
                        </select>
                    </div>
                }
                {this.isValid() && <button className='btn' onClick={_=>this.save()}>Save</button>}

            </div>
        );
    }
}