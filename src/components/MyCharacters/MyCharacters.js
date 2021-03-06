// Displays a list of Character Components
// Used by Tavern and Cemetary Components

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSelectedCharacter } from '../../ducks/reducer';
import CharacterDisplay from '../CharacterDisplay/CharacterDisplay';

import arrowIcon from '../../images/ab-other-arrow.svg';

class MyCharacters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modulesToShow: []
        }
    }

    showModule(characterId) {

        let tempArr = this.state.modulesToShow.slice();
        let index = tempArr.indexOf(characterId);

        if (index === -1) {
            tempArr.push(characterId);
        } else {
            tempArr.splice(index, 1);
        }

        this.setState({
            modulesToShow: tempArr
        })
    }

    render() {
        const characterList = this.props.characters
            .filter(char => char.alive)
            .map((character, i) => {
                console.log('character', character)
                return (

                    <div className="tavern-char-container" key={character.character_id}>
                        <div className="tavern-char-row">

                            <div className="tavern-char-name-container" onClick={_ => this.showModule(character.character_id)}>

                                <button

                                    className="tavern-char-name"
                                    value={character.character_name}>
                                    <div>
                          
                                        <div className={((this.state.modulesToShow.indexOf(character.character_id) === -1)
                                            ?
                                            'side-arrow'
                                            :
                                            'down-arrow')
                                        }>
                                            <img className="arrow-icon" src={arrowIcon} alt="arrow" />
                                        </div>
                                        {character.character_name}
                                    </div>
                                    <div className="class-btn-box">
                                        <img className="class-icon" src={character.class_icon} alt="character.class_id" /> 
                                        {character.class_name}
                                    </div>
                                </button>
                            </div>
                            <Link to={`/storyselection`}>
                                <button
                                    className="btn play"
                                    id={character.character_id}
                                    onClick={() => { this.props.getSelectedCharacter(character.character_id); }}>
                                    PLAY
                                </button>
                            </Link>
                        </div>


                        <div onClick={_ => this.showModule(character.character_id)}
                            className={((this.state.modulesToShow.indexOf(character.character_id) === -1)
                                ?
                                'dropup'
                                :
                                'dropdown')
                            }>
                            <CharacterDisplay character={character} />
                        </div>
                    </div>

                )
            }
            );

        return (
            <div className="my-characters-list">
                <div className="block-card">
                    <h2 className="sub-title">My Characters</h2>

                    <div className="block-card-inner">
                        {characterList}

                        <div className="my-character-footer-menu">

                            <Link to={`/newcharacter`}><button className="btn">Start New Character</button></Link>
                            <Link to={`/cemetery`}><button className="btn">Visit Cemetery</button></Link>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        characters: state.characters,
        selectedCharacter: state.selectedCharacter.character_name
    }
}

export default connect(mapStateToProps, { getSelectedCharacter })(MyCharacters)