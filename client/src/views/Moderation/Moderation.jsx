import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';

class ModerationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentData: [
                { id: 1, title: 'Content 1', description: 'This is the first content item' },
                { id: 2, title: 'Content 2', description: 'This is the second content item' },
                // Add more content items here
            ],
            selectedContent: null,
        };
    }

    handleContentClick = (contentId) => {
        const selectedContent = this.state.contentData.find(content => content.id === contentId);
        this.setState({ selectedContent });
    }

    handleModerationAction = (action) => {
        // Perform your moderation action here, e.g., hide, delete, or approve content
        // Update the contentData and UI accordingly

        // Example: Removing the content from the list
        const updatedContentData = this.state.contentData.filter(content => content.id !== this.state.selectedContent.id);
        this.setState({
            contentData: updatedContentData,
            selectedContent: null,
        });
    }

    render() {
        const { contentData, selectedContent } = this.state;

        return (
            <div>
                <NavBar />
                 <div id='main-header'>Moderation </div>
                 <div id='moderation-title'>Moderation</div>

                {/* Content List */}
                <ul>
                    {contentData.map(content => (
                        <li key={content.id} onClick={() => this.handleContentClick(content.id)}>
                            {content.title} - {content.description}
                        </li>
                    ))}
                </ul>

                {/* Moderation Actions */}
                <div>
                    <button onClick={() => this.handleModerationAction('approve')}>Approve</button>
                    <button onClick={() => this.handleModerationAction('reject')}>Reject</button>
                </div>

                {/* Content Details */}
                {selectedContent && (
                    <div>
                        <h2>Content Details</h2>
                        <p>Title: {selectedContent.title}</p>
                        <p>Description: {selectedContent.description}</p>
                    </div>
                )}
            </div>
            
        );
    }
}

export default ModerationPage;
