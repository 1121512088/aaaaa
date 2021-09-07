import React, { Component } from 'react';
import { Tree } from 'antd';
import PropTypes from 'prop-types';

import styles from './TreeCheckBox.less';

const { TreeNode, DirectoryTree } = Tree;
// data (受控) 遍历树形接口数据 [{id: 1, name: 'name'}]
// value (受控) 值 []
// selectedKeys (受控) 值
// expandedKeys (受控) 展开指定的树节点
// defaultExpandedKeys (受控) 默认展开指定的树节点
// onChange Fn (选中数据)

export default class TreeCheckBox extends Component {
  static propTypes = {
    data: PropTypes.array,
    key: PropTypes.string,
    children: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      value: props.value || [],
      expandedKeys: props.expandedKeys || [],
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
    if (nextProps.expandedKeys !== this.props.expandedKeys) {
      this.setState({
        expandedKeys: nextProps.expandedKeys,
      });
    }
    return true;
  }

  handleCheck = (checkedKeys, info) => {
    let arr = [info.node.props.eventKey];
    this.setState({
      value: arr,
    });
    this.props.onChange && this.props.onChange(arr);
  };

  handleExpand = (expandedKeys, info) => {
    this.setState({
      expandedKeys,
    });
  }

  callback = (tree, key) => {
    const { id = 'id', name = 'name' } = this.props.forIn || {};

    if (!(tree instanceof Array)) {
      return;
    }

    return tree.map((item) => {
      let ids = key ? `${key}-${item[id]}` : item[id];
      let bol = String(ids).split('-').length > 2;
      return (
        <TreeNode className={styles.treeNode_li} title={item[name]} key={ids} checkable={bol}>
          {
            item.children && item.children.length > 0 ?
              this.callback(item.children, ids)
              : item.courses && item.courses.length > 0 ? this.callback(item.courses, ids) : null
          }
        </TreeNode>
      );
    });
  }

  render() {
    const { className = '', selectedKeys, defaultExpandedKeys } = this.props;
    const { data, value, expandedKeys } = this.state;

    return (
      <DirectoryTree
        className={`${styles.Tree} ${className}`}
        checkable
        showIcon={false}
        selectedKeys={selectedKeys || []}
        onCheck={this.handleCheck}
        onExpand={this.handleExpand}
        checkedKeys={value}
        expandedKeys={expandedKeys || []}
        defaultExpandedKeys={defaultExpandedKeys || []}
        style={{ height: '20px' }}
      >
        {
          this.callback(data)
        }
      </DirectoryTree>
    );
  }
}
