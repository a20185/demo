import React , {Component} from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Tree from '../Tree/Tree'
import Ajax from '../../utils/ajax'
import Config from '../../utils/config'
import debounce from 'throttle-debounce/debounce'
import './TreeView.css'
/**
 * 文件树组件
 */
class TreeView extends Component {
  /**
   * Constructor
   * @param {*} props 
   * 初始化文件树，放置placeholder
   */
  constructor(props) {
      super(props);
      this.state = {
        data: [{
          id: 1,
          label: '网络不佳，请重试',
          children: [{
            id: 4,
            label: '网络不佳，请重试',
            children: [{
              id: 9,
              label: '网络不佳，请重试'
            }, {
              id: 10,
              label: '网络不佳，请重试'
            }]
          }]
        }, {
          id: 2,
          label: '网络不佳，请重试',
          children: [{
            id: 5,
            label: '网络不佳，请重试'
          }, {
            id: 6,
            label: '网络不佳，请重试'
          }]
        }, {
          id: 3,
          label: '网络不佳，请重试',
          children: [{
            id: 7,
            label: '网络不佳，请重试'
          }, {
            id: 8,
            label: '网络不佳，请重试'
          }]
        }],
        options: {
          children: 'children',
          label: 'label'
        }
      }
  }
  
  /**
   * 为后续改进留的接口，如果后续选中节点需要做些别的操作
   * 可以使用此方法
   * @param {*} data 
default   * @param {*} checked 
   * @param {*} indeterminate 
   */
  handleCheckChange(data, checked, indeterminate) {
    console.log(data, checked, indeterminate);
  }
  


  /**
   * 节点懒加载函数
   * @param {*} node 当前节点
   * @param {*} resolve 处理数据函数
   */
  loadNode(node, resolve) {
    if (node.level === 0) {
      return this.fetchAllFiles().then(console.log("Fetch Completed"));
    }
    /**
     * 如果后续需要进行层级限制
     */
    // Maximum Show Level
    if (node.level > Config.FILE_SHOW_LEVEL) return resolve([]);
  
    /**
     * 判断是否有孩子
     * 如果没有那么去掉+号
     */
    var hasChild = node.data.isDir;
    if (hasChild) {
      this.fetchChildNodes(node.data.id , data => {
        resolve(this.parseChildren(data.data));
      })
    } else resolve([]);
  }
  
  /**
   * 文件树搜索函数
   * @param {*} keyWord 关键词
   * @param {*} resolve 处理函数
   */
  searchNode(keyWord, resolve) {
    Ajax.TESTSEARCH(data => {
      resolve(data.data)
    });
  }

  lazySearch = debounce(200, (...args) => {
    if (this.isDeconstructed) return;
    this.performSearch.apply(this, args);
  });

  /**
   * 文件树搜索与二次处理函数
   * @param {*} keyWord 关键词
   */
  performSearch(keyWord) {
    if (keyWord === "" && this.state.oldData) {
      this.setState({data: this.state.oldData});
      return;
    }

    this.searchNode(keyWord, data => {
      var result = data.data;
      // console.log(result);
      result = result.map(x => {
        var t = {};
        t.id = x.id;
        t.isDir = x.isDir;
        if (t.isDir) {
          t.children = this.parseChildren(x.children);
        }
        const index = x.name.indexOf(keyWord);
        const beforeStr = x.name.substr(0, index);
        const afterStr = x.name.substr(index + keyWord.length);

        /**
         * 高亮部分
         */
        t.label = index > -1 ? (
          <span>
            <span className="normal">{beforeStr}</span>
            <span className="keyword">{keyWord}</span>
            <span className="normal">{afterStr}</span>
          </span>
        ) : <span className="normal">{x.name}</span>;
      
        if (index === -1) return undefined;
        else return t;
      });
      /**
       * 记住初始数据 以便进行还原
       */
      var prevData = this.state.oldData ? this.state.oldData : this.state.data.slice();
      this.setState({oldData: prevData , data: result.filter(x => x !== undefined)});
    });
  }

  /**
   * 递归处理叶子节点
   * @param {*} children 后代数组
   */
  parseChildren(children) {
    if (!children || children.length === 0) return undefined;
    var ret = [];
    children.forEach(x => {
      var ctx = {};
      ctx.id = x.id;
      ctx.isDir = x.isDir;
      ctx.label = x.name;
      if (ctx.isDir) {
        ctx.children = x.children;
      }
      ret.push(ctx);
    });
    return ret;
  }

  /**
   * 获取孩子节点函数
   * @param {*} id 当前节点的id
   * @param {*} resolve response的处理函数
   */
  fetchChildNodes(id , resolve) {
    Ajax.TESTCHILDFILE(data => {
      resolve(data.data);
    })
  }

  /**
   * 初始化的全局获取函数
   */
  fetchAllFiles() {
    return Ajax.GETFILE(data => {
      var result = data.data;
      var resultData = [];
      if (data.status !== 200) {
        console.log("Warning! Network Unsuccessful!");
      } else {
        if (result.isEmpty) {
          console.log("Warning! File is Empty!");
        } else {
          result.data.forEach(x => {
            var tmpData = {};
            tmpData.id = x.id;
            tmpData.isDir = x.isDir;
            tmpData.label = x.name;
            tmpData.children = x.children;
            resultData.push(tmpData);
          })
          this.setState({data: resultData});
          console.log(resultData);
        }
      }
    });
  }

  /**
   * 清空输入内容函数
   */
  clearInput() {
    /**
     * DOM Operation
     */
    this.refs.searcher.refs.input.value = "";
    /**
     * 避免失去焦点
     */
    this.refs.searcher.refs.input.focus();
    if (!this.state.oldData) return;
    var oldData = this.state.oldData.slice();
    this.setState({data: oldData});
  }

  componentWillMount() {
    // this.fetchAllFiles();
  }


  render() {
    const { data, options } = this.state;
  
    return (
      <div>
        <div className="searchBlock">
          <Input placeholder="输入关键字进行搜索" ref='searcher' onChange={text =>this.lazySearch(text)} append={<Button type="primary" onClick={e => this.clearInput()} ><div className="clear" unselectable="on">aas</div></Button>}/>
          <span className="searchButton"></span>
          <span className="clearButton"></span>
        </div>
        <div className="title">
          <h2 className="tv">文件列表</h2>
        </div>
        <Tree
          ref={e=> this.tree = e}
          className="filter-tree"
          data={data}
          lazy={true}
          load={this.loadNode.bind(this)}
          isShowCheckbox={true}
          expandOnClickNode={false}
          highlightCurrent={true}
          options={options}
          onNodeClicked={(data, nodeModel, reactElement, treeNode)=>{
            console.debug('onNodeClicked: ', data, nodeModel, reactElement)
          }}
          nodeKey="id"
          defaultExpandAll={false}
          filterNodeMethod={(value, data)=>{
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
          }}
        />
      </div>
  
    );
  }
      
}

export default TreeView;