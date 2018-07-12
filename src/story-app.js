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
      comments: [] // empty array will get data from API server
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
      return this.state.comments.map((comment) => {
        return (
          <Comment key={comment.id} comment={comment} onDelete={this._deleteComment.bind(this)} />
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
    const comment = { author, body };

    jQuery.post('/api/comments', { comment })
    .always(newComment => {
      this.setState({ comments: this.state.comments.concat([newComment]) });
    });
    
  }

  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/comments', // makes call to remote server
      success: (comments) => {
        this.setState({ comments })
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

  _deleteComment(comment) {
    jQuery.ajax({
      method: 'DELETE',
      url: `/api/comments/${comment.id}`
    });

    const comments = [...this.state.comments];
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1);

    this.setState({ comments });
  }


}


class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete comment
          </a>
        </div>
      </div>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    if(confirm('Are you sure?')) {
      this.props.onDelete(this.props.comment);
    }
  }

}

class StoryBox extends React.Component {
  render() {
    return( <CommentBox /> );
  }
}

ReactDOM.render(<StoryBox />, document.getElementById('story-app'));