// @flow
import * as React from "react";

// eslint-disable-next-line react/prop-types
class CartItem extends React.Component<PropsType> {
  render() {
    const total = this.props.price * this.props.quantity;
    return (
      <div className="columns content is-vcentered">
        <div className="column is-6">
          <div className="columns">
            <div className="column is-4">
              <div className="image is-128x128">
                <img src={this.props.productUrl}></img>
              </div>
            </div>
            <div className="column is-8">
              <div className="columns">
                <div className="column">
                  <h5>{ this.props.productName }</h5>
                  <div><span className="tag is-primary">In stock</span></div>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column">
                  <div className='has-text-centered'>
                    <span className="icon"><i className="fas fa-lg fa-trash-alt"></i></span>
                  </div>
                  <div className='has-text-centered'>Delete</div>
                </div>
                <div className="column">
                  <div className='has-text-centered'>
                    <span className="icon is-medium"><i className="far fa-lg fa-bookmark"></i></span>
                  </div>
                  <div className='has-text-centered'>Save for later</div>
                </div>
                <div className="column">
                  <div className='has-text-centered'>
                    <span className="icon"><i className="far fa-lg fa-heart"></i></span>
                  </div>
                  <div className='has-text-centered'>Add to favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-2">
          ${ this.props.price.toFixed(2) } / g
        </div>
        <div className="column is-2">
          <div className="field">
            <div className="control">
              <input className="input is-primary" type="number" placeholder="Quantity"
                     value={ this.props.quantity }></input>
            </div>
          </div>
        </div>
        <div className="column is-2">${ total.toFixed(2) }</div>
      </div>
    );
  }
}

export default CartItem;
