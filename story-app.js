'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentForm = function (_React$Component) {
  _inherits(CommentForm, _React$Component);

  function CommentForm() {
    _classCallCheck(this, CommentForm);

    return _possibleConstructorReturn(this, (CommentForm.__proto__ || Object.getPrototypeOf(CommentForm)).apply(this, arguments));
  }

  _createClass(CommentForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "form",
        { className: "comment-form", onSubmit: this._handleSubmit.bind(this) },
        React.createElement(
          "label",
          null,
          "Join the discussion"
        ),
        React.createElement(
          "div",
          { className: "comment-form-fields" },
          React.createElement("input", { placeholder: "Name:", ref: function ref(input) {
              return _this2._author = input;
            } }),
          React.createElement("textarea", { placeholder: "Comment:", ref: function ref(textarea) {
              return _this2._body = textarea;
            } })
        ),
        React.createElement(
          "div",
          { className: "comment-form-actions" },
          React.createElement(
            "button",
            { type: "submit", className: "new-comment" },
            "Post comment"
          )
        )
      );
    }
  }, {
    key: "_handleSubmit",
    value: function _handleSubmit(event) {
      event.preventDefault();

      var author = this._author;
      var body = this._body;

      this.props.addComment(author.value, body.value);
    }
  }]);

  return CommentForm;
}(React.Component);

var CommentBox = function (_React$Component2) {
  _inherits(CommentBox, _React$Component2);

  function CommentBox() {
    _classCallCheck(this, CommentBox);

    var _this3 = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this));

    _this3.state = {
      showComments: false,
      commentList: [] // empty array will get data from API server
    };
    return _this3;
  }

  _createClass(CommentBox, [{
    key: "render",
    value: function render() {
      var comments = this._getComments();

      var commentNodes = void 0;
      if (this.state.showComments) {
        commentNodes = React.createElement(
          "div",
          { className: "comment-list" },
          comments
        );
      }

      var buttonText = 'Show comments';
      if (this.state.showComments) {
        buttonText = 'Hide comments';
      }

      return React.createElement(
        "div",
        { className: "comment-box" },
        React.createElement(CommentForm, { addComment: this._addComment.bind(this) }),
        React.createElement(
          "h3",
          null,
          "Comment Box"
        ),
        React.createElement(
          "h4",
          { className: "comment-count" },
          this._getCommentsTitle(comments.length)
        ),
        React.createElement(
          "button",
          { className: "delete", onClick: this._handleClick.bind(this) },
          buttonText
        ),
        React.createElement(
          "div",
          { className: "comment-list" },
          commentNodes
        )
      );
    }
  }, {
    key: "_getComments",
    value: function _getComments() {
      return this.state.commentList.map(function (comment) {
        return React.createElement(Comment, { author: comment.author, body: comment.body, key: comment.id });
      });
    }
  }, {
    key: "_getCommentsTitle",
    value: function _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return '1 comment';
      } else {
        return commentCount + " comments";
      }
    }
  }, {
    key: "_handleClick",
    value: function _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
  }, {
    key: "_addComment",
    value: function _addComment(author, body) {
      var newComment = {
        id: this.state.commentList.length + 1,
        author: author,
        body: body
      };
      this.setState({ commentList: this.state.commentList.concat([newComment]) });
    }
  }, {
    key: "_fetchComments",
    value: function _fetchComments() {
      var _this4 = this;

      jQuery.ajax({
        method: 'GET',
        url: '/api/commentList', // makes call to remote server
        success: function success(commentList) {
          _this4.setState({ commentList: commentList });
        }
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      // fetch comments before component is rendered
      this._fetchComments();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this5 = this;

      // after the component is rendered call fetchComments every 5 sec
      this._timer = setInterval(function () {
        return _this5._fetchComments();
      }, 5000); // store timer as object property
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // run when component is about to be removed from the DOM
      clearInterval(this._timer);
    }
  }]);

  return CommentBox;
}(React.Component);

var Comment = function (_React$Component3) {
  _inherits(Comment, _React$Component3);

  function Comment() {
    _classCallCheck(this, Comment);

    return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).apply(this, arguments));
  }

  _createClass(Comment, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "comment" },
        React.createElement(
          "p",
          { className: "comment-header" },
          this.props.author
        ),
        React.createElement(
          "p",
          { className: "comment-body" },
          this.props.body
        ),
        React.createElement(
          "div",
          { className: "comment-footer" },
          React.createElement(
            "a",
            { href: "#", className: "comment-footer-delete" },
            "Delete comment"
          )
        )
      );
    }
  }]);

  return Comment;
}(React.Component);

var StoryBox = function (_React$Component4) {
  _inherits(StoryBox, _React$Component4);

  function StoryBox() {
    _classCallCheck(this, StoryBox);

    return _possibleConstructorReturn(this, (StoryBox.__proto__ || Object.getPrototypeOf(StoryBox)).apply(this, arguments));
  }

  _createClass(StoryBox, [{
    key: "render",
    value: function render() {
      return React.createElement(CommentBox, null);
    }
  }]);

  return StoryBox;
}(React.Component);

ReactDOM.render(React.createElement(StoryBox, null), document.getElementById('story-app'));