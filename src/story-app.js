'use strict';

class CommentForm extends React.Component {
  render() {
    return(
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <label>Join the discussion</label>
          <div className="comment-form-fields">
            <input placeholder="Name:" ref={(input) => this._author = input}/>
            <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
            <button type="submit" className="new-comment">
              Post comment
            </button>
          </div>
        </form>
      );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }

}

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      showComments: false,
      commentList: [] // empty array will get data from API server
    };
  }

  render() {
    const comments = this._getComments();

    let commentNodes;
    if (this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>
    }

    let buttonText = 'Show comments';
    if (this.state.showComments) {
      buttonText = 'Hide comments';
    }

    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comment Box</h3>
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <button className="delete" onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <div className="comment-list">
          {commentNodes} 
        </div>
      </div>
    );
  }

  _getComments() {
      return this.state.commentList.map((comment) => {
        return (
          <Comment author={comment.author} body={comment.body} key={comment.id} />
          );
      });
  }

  _getCommentsTitle(commentCount) {
    if(commentCount === 0) {
      return 'No comments yet';
    } else if(commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _addComment(author, body) {
    const newComment = {
      id: this.state.commentList.length + 1,
      author,
      body
    };
    this.setState({ commentList: this.state.commentList.concat([newComment]) });
  }

  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/commentList', // makes call to remote server
      success: (commentList) => {
        this.setState({ commentList })
      }
    });
  }

  componentWillMount() { // fetch comments before component is rendered
    this._fetchComments();
  }

  componentDidMount() { // after the component is rendered call fetchComments every 5 sec
   this._timer = setInterval(() => this._fetchComments(), 5000); // store timer as object property
  }

  componentWillUnmount() { // run when component is about to be removed from the DOM
    clearInterval(this._timer);
  }

}


class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete comment
          </a>
        </div>
      </div>
    );
  }
}

class StoryBox extends React.Component {
  render() {
    return( <CommentBox /> );
  }
}

ReactDOM.render(<StoryBox />, document.getElementById('story-app'));