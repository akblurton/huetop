/*eslint  react/no-danger: 0*/

import React, { PropTypes } from "react";

let iconMap = {};

export default class Icon extends React.Component {
  static propTypes = {
    fill: PropTypes.string,
    height: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
    stroke: PropTypes.string,
    width: PropTypes.number
  };

  constructor(props) {
    super(props);

    let { name, src } = props;
    if (!name && !src) {
      console.error("<Icon /> requires name or src prop");
    }

    this.state = this.loadSvg(props);
  }

  componentDidMount() {
    this.setStyles();
  }

  componentDidUpdate() {
    this.setStyles();
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.loadSvg(newProps));
  }

  /**
   * Return state based on src or name prop
   * @return {Object}
   */
  loadSvg(props) {
    let { src, name } = props;
    // src is more important
    if (src) {
      return {
        src
      };
    } else if (name) {
      return {
        src: iconMap[name]
      };
    }
  }

  /**
   * Process raw source prop and remove stroke/fille properties if needed
   * @return {Object}
   */
  svg() {
    let { src } = this.state;
    let { stroke, fill } = this.props;
    if (src) {
      if (stroke) {
        src = src.replace(/stroke=(['"]).*?\1/g, "");
      }
      if (fill) {
        src = src.replace(/fill=(['"]).*?\1/g, "");
      }
    }

    return {
      "__html": src
    };
  }

  /**
   * Set the style/class attribute of the rendered SVG element
   * according to props
   */
  setStyles() {
    let { _svg } = this;
    let { width, height, fill, stroke } = this.props;
    if (!_svg) {
      return;
    }

    let styles = [];
    if (width) {
      styles.push(`width: ${width}px`);
    }
    if (height) {
      styles.push(`height: ${height}px`);
    }
    if (fill) {
      styles.push(`fill: ${fill}`);
    }
    if (stroke) {
      styles.push(`stroke: ${stroke}`);
    }

    _svg = _svg.children[0];
    if (!_svg) {
      return;
    }
    _svg.style = styles.join(";");
  }

  render() {
    return (
      <div
        className="Icon"
        dangerouslySetInnerHTML={this.svg()}
        ref={ref => this._svg = ref}
      ></div>
    );
  }
}

export function mapIcons(object) {
  Object.assign(iconMap, object);
}
