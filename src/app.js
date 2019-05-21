// application's entry
import React from 'react'
import {render} from 'react-dom'
import Routers from './routers'

// 开启局部热更新
if (module.hot) {
	module.hot.accept()
}

render((
	<Routers />
), document.getElementById('root'))
