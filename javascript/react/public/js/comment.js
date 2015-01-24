/** @jsx React.DOM */
var socket = commentSocket;
var CommentBox = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },
    componentWillMount: function() {
        socket.on('render', function(comment){
            var stateDate = this.state.data;
            stateDate.push(comment);
            this.setState({data: stateDate});
        }.bind(this));
    },
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment, index) {
            return <Comment key={index} author={comment.author} text={comment.text}></Comment>;
        });
        return <div className="commentList">{commentNodes}</div>;
    }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
            <h2 className="commentAuthor">{this.props.author}</h2>
            <p> {this.props.text} </p>
            </div>
        );
    }
});

React.renderComponent(
    <CommentBox />,
    document.getElementById("content")
);
