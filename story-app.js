'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentBox = function (_React$Component) {
  _inherits(CommentBox, _React$Component);

  function CommentBox() {
    _classCallCheck(this, CommentBox);

    var _this = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this));

    _this.state = {
      showComments: false
    };
    return _this;
  }

  _createClass(CommentBox, [{
    key: 'render',
    value: function render() {
      var comments = this._getComments();

      var commentNodes = void 0;
      if (this.state.showComments) {
        commentNodes = React.createElement(
          'div',
          { className: 'comment-list' },
          comments
        );
      }

      var buttonText = 'Show comments';
      if (this.state.showComments) {
        buttonText = 'Hide comments';
      }

      return React.createElement(
        'div',
        { className: 'comment-box' },
        React.createElement(
          'h3',
          null,
          'Comment Box'
        ),
        React.createElement(
          'h4',
          { className: 'comment-count' },
          this._getCommentsTitle(comments.length)
        ),
        React.createElement(
          'button',
          { onClick: this._handleClick.bind(this) },
          buttonText
        ),
        React.createElement(
          'div',
          { className: 'comment-list' },
          commentNodes
        )
      );
    }
  }, {
    key: '_getComments',
    value: function _getComments() {
      var commentList = [{ id: 1, author: 'Morgan McCircuit', body: 'Great picture!' }, { id: 2, author: 'Bending Bender', body: 'Excellent stuff' }];

      return commentList.map(function (comment) {
        return React.createElement(Comment, { author: comment.author, body: comment.body, key: comment.id });
      });
    }
  }, {
    key: '_getCommentsTitle',
    value: function _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return '1 comment';
      } else {
        return commentCount + ' comments';
      }
    }
  }, {
    key: '_handleClick',
    value: function _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
  }]);

  return CommentBox;
}(React.Component);

var Comment = function (_React$Component2) {
  _inherits(Comment, _React$Component2);

  function Comment() {
    _classCallCheck(this, Comment);

    return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).apply(this, arguments));
  }

  _createClass(Comment, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'comment' },
        React.createElement(
          'p',
          { className: 'comment-header' },
          this.props.author
        ),
        React.createElement(
          'p',
          { className: 'comment-body' },
          this.props.body
        ),
        React.createElement(
          'div',
          { className: 'comment-footer' },
          React.createElement(
            'a',
            { href: '#', className: 'comment-footer-delete' },
            'Delete comment'
          )
        )
      );
    }
  }]);

  return Comment;
}(React.Component);

var StoryBox = function (_React$Component3) {
  _inherits(StoryBox, _React$Component3);

  function StoryBox() {
    _classCallCheck(this, StoryBox);

    return _possibleConstructorReturn(this, (StoryBox.__proto__ || Object.getPrototypeOf(StoryBox)).apply(this, arguments));
  }

  _createClass(StoryBox, [{
    key: 'render',
    value: function render() {
      return React.createElement(CommentBox, null);
    }
  }]);

  return StoryBox;
}(React.Component);

ReactDOM.render(React.createElement(StoryBox, null), document.getElementById('story-app'));