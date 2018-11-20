import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.less';

class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false, // 卡片右上角菜单的下拉选项的状态
      showIcon: false, // 鼠标进入卡片才显示三个点
    };
  }
  // 鼠标进入卡片区域隐藏菜单
  onEnter = (e) => {
    if (typeof this.props.onMouseEnter === 'function') {
      this.props.onMouseEnter(e);
    }
    this.setState({
      ...this.state,
      ...{
        showMenu: false,
        showIcon: true,
      },
    });
  };
  // 点击菜单选项隐藏菜单
  onUp = () => {
    this.setState({
      ...this.state,
      ...{
        showMenu: false,
      },
    });
  };
  // 鼠标离开卡片区域隐藏菜单
  onLeave = (e) => {
    if (typeof this.props.onMouseLeave === 'function') {
      this.props.onMouseLeave(e);
    }
    this.setState({
      ...this.state,
      ...{
        showMenu: false,
        showIcon: false,
      },
    });
  };
  // 点击显示菜单
  onShowMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      ...this.state,
      ...{
        showMenu: true,
      },
    });
  };
  // 获取卡片的类名,重新组合
  getClassName = () => {
    if (this.props.className) {
      const classNameArray = this.props.className.split(/\s+/);
      if (!classNameArray.includes('emasd-simplecard')) {
        classNameArray.push('emasd-simplecard');
      }
      return classNameArray.join(' ');
    }
    return 'emasd-simplecard';
  };
  render() {
    const { header, items, btns } = this.props;
    const menu = (<ul>
      {
        btns && btns.map((item, index) => {
          return <li className="emasd-menu-more-list" key={index.toString()}>{item}</li>;
        })
      }
    </ul>);
    const props = {
      ...this.props,
      ...{
        onMouseEnter: this.onEnter,
        onMouseLeave: this.onLeave,
        className: this.getClassName(),
      },
    };
    // 处理warning, 原生dom无以下方法
    delete props.header;
    delete props.btns;
    delete props.items;
    return (
      <div {...props}>
        <div className="emasd-simplecard-title clear">
          <div className="left">
            {header}
          </div>
          {
            btns && btns.length !== 0 ?
              (
                this.state.showIcon ?
                  <div className="emasd-simplecard-icon right" onClick={this.onShowMenu}>
                    <i className="anticon anticon-ellipsis" />
                  </div> : null
              ) : null
          }
          <div className="emasd-simplecard-more-list" onMouseLeave={props.onMouseLeave}>
            {
              this.state.showMenu ?
                <div onClick={this.onUp}>
                  <ul>
                    {menu}
                  </ul>
                </div> : null
            }
          </div>
        </div>
        <div className="emasd-simplecard-content-list">
          <ul>
            {
              items && items.map((item, index) => {
                const { label, content } = item;
                return (<li key={index.toString()}>
                  <span className="emasd-simplecard-main-content">{label}: {content}</span>
                </li>);
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  // 卡片的标题
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  // 卡片的内容区列表
  items: PropTypes.array,
  // 卡片的扩展菜单选项
  btns: PropTypes.array,
};

o9k.defaultProps = {
  header: '',
  items: [],
  btns: [],
};

export default SimpleCard;
