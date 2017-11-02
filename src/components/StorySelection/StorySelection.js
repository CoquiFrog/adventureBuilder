// Displays CharacterDisplay Component, StorySearch Component, and list of ViewStory Components

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Menu from './../Menu/Menu';
import Footer from './../Menu/Footer';
import ViewStory from './../ViewStory/ViewStory';
import CharacterDisplay from './../CharacterDisplay/CharacterDisplay';


class StorySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storiesArray: [],
            noSearchResults: false,
            searchType: 'Title'
        }
    }

    componentDidMount() {
        axios.get('/api/stories').then((res) => {
            this.setState({
                storiesArray: res.data,
            })
        })
    }

    changeStorySearch(option, value) {
        this.setState({
            [option]: value
        }, () => console.log('state', this.state))

    }
    startSearch(e) {
        e.preventDefault();
        switch (this.state.searchType) {
            case "Author":
                return (axios.get('/api/user/stories/' + this.state.searchInput).then((res) => {
                    console.log('returned search result', res.data);
                    if (res.data.length !== 0) {
                        this.setState({
                            storiesArray: res.data,
                            noSearchResults: false
                        })
                    } else {
                        this.setState({
                            storiesArray: [],
                            noSearchResults: true
                        })
                    }
                })
                );

            case "Title":
                return (axios.get('/api/storyName/' + this.state.searchInput).then((res) => {
                    console.log('returned search result', res.data);
                    if (res.data.length !== 0) {
                        this.setState({
                            storiesArray: res.data,
                            noSearchResults: false
                        })
                    } else {
                        this.setState({
                            storiesArray: [],
                            noSearchResults: true
                        })
                    }
                })
                );

            case "Level":
                return (axios.get('/api/levels/stories/' + this.state.searchInput).then((res) => {
                    console.log('returned search result', res.data);
                    if (res.data.length !== 0) {
                        this.setState({
                            storiesArray: res.data,
                            noSearchResults: false
                        })
                    } else {
                        this.setState({
                            storiesArray: [],
                            noSearchResults: true
                        })
                    }
                })
                );

            case "Newest":
                return (axios.get('/api/stories/').then((res) => {
                    console.log('returned search result', res.data);
                    if (res.data.length !== 0) {
                        this.setState({
                            storiesArray: res.data,
                            noSearchResults: false
                        })
                    } else {
                        this.setState({
                            storiesArray: [],
                            noSearchResults: true
                        })
                    }
                })
                );

        }
    }

    render() {
        console.log('storiesArray', this.state.storiesArray)
        return (
            <div id="story-selection-top" className="story-selection">
                <Menu />
                <div className="page">

                    <CharacterDisplay character={this.props.selectedCharacter} />

                    <div className="story-search-block">
                        <h2 className="view-title">Choose A Story</h2>

                        <div className="block-card">
                            <h3 className="sub-title">Search Stories</h3>
                            <div className="block-card-inner">
                                <form className="search-bar" onSubmit={(e) => this.startSearch(e)}>
                                    <select className="select-btn search-select-box" name="searchType" onChange={
                                        (e) => this.changeStorySearch(e.target.name, e.target.value)
                                    }>

                                        <option selected default value="Title" >Title</option>
                                        <option value="Author">Author</option>
                                        <option value="Level" >Difficulty</option>
                                        <option value="Newest" >Newest</option>
                                    </select>


                                    <input className="search-input" type="text" name="searchInput" onChange={(e) => this.changeStorySearch(e.target.name, e.target.value)} />
                                    {this.state.searchType ?
                                        <button type="submit" className="btn search-btn" >Search</button> :
                                        <div className="search-button-placeholder"></div>}
                                </form>

                                <div className="story-results">


                                    <h4 className="sub-title">{this.state.noSearchResults ? 'No stories were found that matched your search.' : 'Your search results:'}</h4>

                                    {this.state.storiesArray.map((story, i) => {
                                        return <ViewStory key={i} story={story} />
                                    })}

                                </div>

                            </div>

                        </div>



                    </div>
                    <div className="to-top full sub-title">
                       <a href="#story-selection-top"><button className="btn">Back to top</button></a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedCharacter: state.selectedCharacter
    }
}
export default connect(mapStateToProps, {})(StorySelection)