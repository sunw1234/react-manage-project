import React from 'react';
import { Menu } from 'antd';
// import 'antd/dist/antd.css';
import './index.less';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    menuClick = ({ key }) => {
        const { history } = this.props
        history.push(`/${key}`);
    }
    render() {
        const { location: { pathname } } = this.props;
        const menuPath = pathname && pathname.split('/');
        const activeKey = menuPath && menuPath[1];
        return (
            <div>
                <Menu
                    onClick={this.menuClick}
                    style={{ width: 200 }}
                    defaultSelectedKeys={[activeKey]}
                    mode="inline"
                >
                    <Menu.Item key="homepage">初始页面</Menu.Item>
                    <Menu.Item key="conditions">条件组</Menu.Item>
                    <Menu.Item key="list">列表页</Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default NavMenu;