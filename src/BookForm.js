import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };
  textChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  submitAuthor = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.author, this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">color</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="color"
              value={this.state.color}
              onChange={this.textChangeHandler}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors,
    author: state.rootAuthor.author
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postBook: (Book, Author, closeModal) =>
      dispatch(actionCreators.postBook(Book, Author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
