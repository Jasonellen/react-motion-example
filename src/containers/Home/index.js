/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react'
import './index.scss'
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);

import SvgDrawPlugin from 'rc-tween-one/lib/plugin/SvgDrawPlugin';
TweenOne.plugins.push(SvgDrawPlugin);  //SVG 绘制插件

import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
TweenOne.plugins.push(SvgMorphPlugin); //SVG图形变换插件

import PathPlugin from 'rc-tween-one/lib/plugin/PathPlugin';
TweenOne.plugins.push(PathPlugin); //SVG 路径运动

import { Parallax,OverPack } from 'rc-scroll-anim';

			// svg路径从x 30->到x 50
const dataStartArr = ['30 150', '50% 50%', '30% 200', '20 30%', 0, '100%'];
let i = 0;

// 变换后的路径  矩形
let changeAnimation = {
	d: 'M60,10L60,90L140,90L140,10Z',
	yoyo: true, 
	repeat: -1, 
	duration: 1000,
};
// 运动轨迹
let movePath = `M3.5,175V19c0,0,1-8.75,8.25-11.5S26.5,8,26.5,8l54,53.25
      c0,0,7,8.25,14.5,0.75s51.5-52.25,51.5-52.25s9.75-7,18-2s7.75,11.5,7.75,11.5
      v104c0,0-0.5,15.75-15.25,15.75s-15.75-15-15.75-15V68.5c0,0-0.125-9.125-6-3.25
      s-36.25,36-36.25,36s-11.625,11.875-24-0.5S40.25,65.5,40.25,65.5
      s-5.75-5.25-5.75,2s0,107.25,0,107.25s-0.75,13.5-14.5,13.5S3.5,175,3.5,175z`;
let moveAnimation = {
	path: movePath,
	repeat: -1,
	duration: 5000,
	ease: 'linear'
};
export default class Index extends Component {
	state = {
		key: '',
		animation: null,
		num:1000,
		tweenData: '100%',
		show:true,
		showText:true
	}
	componentDidMount() {

	}
	onClick = () => {
		const { num } = this.state;
		this.setState({
			animation: {
				Children: { 
					value: num,
					floatLength: 2,
					formatMoney:false
				}, 
				duration: 1000,
			}
		},()=>console.log(this.state.animation,55))
		
	}
	changeSVGData = ()=> {
		const tweenData = dataStartArr[i];
		this.setState({
			tweenData,
		});
		i++;
		i = i >= dataStartArr.length ? 0 : i;
	}
	setShow = () => {
		this.setState({
			show: !this.state.show
		});
	}


	render() {
		return (
			<div className="Home">
				<TweenOne 
					className="banner-user-title" 
					paused={this.props.paused}
					animation={{ y: -30, opacity: 0, type: 'from',repeat:-1,duration:1000,yoyo:true }}
				>
					Ant Motion Banner
				</TweenOne>
				<TweenOne className="banner-user-text"
					repeat={-1}
					yoyo={true}
					animation={[
						{ left: '0%' },
						{ left: '40%' },
						{ top: '60px' },
						{ scale: 0.7 },
						{ scale: 1 },
					]}
					style={{position:'absolute' }}
				>
					React
				</TweenOne>
				{/* 数字缓动 */}
				<div 
					style={{ 
						display: 'flex', 
						height: '100%',
						minHeight: '220px', 
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<div style={{ width: '100%' }}>
					<TweenOne
						animation={this.state.animation}
						style={{ fontSize: 56, marginBottom: 12 }}
					>
						0
					</TweenOne>
					<input
						onChange={(e)=>this.setState({num:e.target.value})}
					/>
					<button
						style={{ marginBottom: 32 }}
						onClick={this.onClick}
					>
						Start
					</button>
					</div>
				</div>
				{/* SVG 绘制动画 */}
				<div style={{ textAlign: 'center', marginTop: 40 }}>
					<button onClick={this.changeSVGData}>
						Switch
					</button>
					<svg width="200" height="84" version="1.2"
						style={{ display: 'block', margin: 'auto' }}
					>
					<TweenOne
						animation={{ SVGDraw: this.state.tweenData, duration: 1000 }}
						style={{ fill: 'none', strokeWidth: 10, stroke: '#019BF0' }}
						component="path"
						d="M10,10c65,50,115,50,180,0"  //SVG路径
					/>
					</svg>
					<p>Current Param: {this.state.tweenData}</p>
				</div>
				{/* SVG 图形变换动画 */}
				<svg width="200" height="130" version="1.2"
				style={{ display: 'block', margin: 'auto' }}
				>
				<TweenOne
					animation={changeAnimation}  // 变换到方形
					style={{ fill: '#019BF0'}}
					component="path"
					d="M60,50 a40,40 0 1,0 80,0a40,40 0 1,0 -80,0z" //原型
					attr="attr"
				/>
				</svg>
				{/* 沿着svg 运动轨迹 运动 */}
				<div style={{ position: 'relative', height: 200, width: 200, margin: '10px auto' }}>
					<TweenOne
					animation={moveAnimation}
					style={{ margin: 0, width: 20, height: 20, transform: 'translate(-10px, -10px)' }}
					className="code-box-shape"
					paused={this.props.paused}
					/>
					<svg width="200" height="200">
					<path d={movePath} fill="none" stroke="rgba(1, 155, 240, 0.2)"/>
					</svg>
				</div>

				<svg width="100%" viewBox="0 0 1200 800">
					<TweenOne
						component="circle"
						fill="rgba(161,174,245,.15)"
						r="130"
						cx="350"
						cy="350"
						animation={{
						y: 30, x: -10, repeat: -1, duration: 3000, yoyo: true,
						}}
					/>
					<TweenOne
						component="circle"
						fill="rgba(120,172,254,.1)"
						r="80"
						cx="500"
						cy="420"
						animation={{
						y: -30, x: 10, repeat: -1, duration: 3000, yoyo: true,
						}}
					/>
					<TweenOne
						component="rect"
						fill="none"
						x= '550'
						y='400'
						width='100'
						height='50'
						strokeWidth= '1'
						stroke='#019BF0'
						animation={{
							y: -100, x: 100, repeat: -1, duration: 3000, yoyo: true
						}}
					/>
					</svg>
				
				{/* 进出场动画 */}
				<div className="queue-demo">
					<p className="buttons">
					<button type="primary" onClick={this.setShow}>Switch</button>
					</p>
					<QueueAnim className="demo-content"
					key="demo"
						//从右边出现  从左边离开
					type={['right', 'left']}  // animConfig优先
					animConfig={[  //自定义出现离开方式，   这个比type好用点
						{ opacity: [1, 0], translateY: [0, 650] },  // 从 y650 opacity 0  的位置 出现 
						{ opacity: [1, 0], translateY: [0, -50] }  //离开到y -50 opacity 0
					]}
					duration={1000}
					//leaveReverse  // 从最后一个开始离开
					ease={['easeOutQuart', 'easeInOutQuart']}>
					{this.state.show ? [
						<p key={1} style={{background:'green',marginBottom:5}}>1</p>,
						<p key={2} style={{background:'green',marginBottom:5}}>12</p>,
						<p key={3} style={{background:'green',marginBottom:5}}>123</p>,
						<p key={4} style={{background:'green',marginBottom:5}}>1234</p>,
						<div key={5} style={{background:'green',marginBottom:5}}>
							{/* 右边出现子元素 */}
							<QueueAnim type="right" duration={1000} delay={1000} component="ul"> 
								<li key="0">0</li>
								<li key="1">1</li>
								<li key="2">2</li>
							</QueueAnim>
						</div>,
					] : null}
					</QueueAnim>
				</div>
				{/* 滚动执行变换动画 */}
				<div>
					<Parallax
					always={false} //只播放一次
					animation={{ x: 0 }}
					style={{ transform: 'translateX(-100px)', margin: '10px auto' }}
					className="code-box-shape"
					/>
					<Parallax
					animation={{ scale: 1 }}
					style={{ transform: 'scale(0)', margin: '10px auto' }}
					className="code-box-shape"
					/>
					<Parallax
					animation={{ rotate: 360 }}
					style={{ margin: '10px auto' }}
					className="code-box-shape"
					/>
				</div>

				<div>
					<Parallax
					animation={[				// 从当前元素出现在事业 到 当前元素的 0.2 位置
						{ x: 0, opacity: 1, playScale: [0, 0.2] },
						{ y: 100, playScale: [0, 0.3] },// 从当前元素0.2 到 当前元素的 0.5 位置
						{ blur: '10px', playScale: [0, 0.5] },// 从当前元素0.5 到 当前元素的 1 位置
					]}
					style={{ transform: 'translateX(100px)', filter: 'blur(0px)', opacity: 0 }} //变换前的起始状态
					className="code-box-shape"
					/>
				</div>

				<div style={{marginTop:100}}>
				<OverPack style={{ overflow: 'hidden', background:'red'}} playScale={0.3}>
					<TweenOne key="0" animation={{ opacity: 1 }}
					className="code-box-shape"
					style={{ opacity: 0, marginBottom: 10 }}
					/>
					<QueueAnim key="queue"
					leaveReverse
					style={{position: 'relative', left: '50%', marginLeft: -165 }}
					>
					<div key="a" className="code-box-shape queue-anim-demo" />
					<div key="b" className="code-box-shape queue-anim-demo" />
					<div key="c" className="code-box-shape queue-anim-demo" />
					<div key="d" className="code-box-shape queue-anim-demo" />
					<div key="e" className="code-box-shape queue-anim-demo" />
					<div key="f" className="code-box-shape queue-anim-demo" />
					</QueueAnim>
				</OverPack>
				</div>
				<div>100</div>
				<div>100</div>
				<div>100</div>
				<div>100</div>
				<div>100</div>
				<div>100</div>
				<div>100</div>
				<div>100</div>
			</div>

			
		)
	}
}
