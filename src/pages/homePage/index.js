import React from 'react';
// import SimpleCard from '../../components/simpleCard';
import './index.css';

class HomePage extends React.Component {
    handleClick=(appCode)=>{
        console.log('>>>>>appCode'.qppCode)
    }
    render(){
        return(
            <div className='home-page'>
                <h2>homepage</h2>
                {/* <SimpleCard
                    className='ant-card'
                    onClick={this.handleClick.bind(this,this.appCode)}
                    header={'header'}
                    items={[{label:'标题1',content:'内容1'},{label:'标题2',content:'内容2'}]}
                    btns={[<a>编辑</a>]}
                /> */}
            </div>
        )
    }
} 

export default HomePage;