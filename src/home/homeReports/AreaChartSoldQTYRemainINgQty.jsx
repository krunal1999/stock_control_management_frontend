import React from 'react'
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'

// charts have predefine code on recharts WebStories
const AreaChartSoldQTYRemainINgQty = ({areagrapgh}) => {
        
  return (
        <AreaChart
        width={1800}
        height={500}
        data={areagrapgh}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name"/>
        <YAxis tickFormatter={tick => `${tick}%`} />
        <Tooltip />
        <Area type="monotone" dataKey="minimumQty" stackId="1" stroke="#eb4034" fill="#eb4034" />
        <Area type="monotone" dataKey="remainingQty" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="soldQty" stackId="1" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
  )
}

export default AreaChartSoldQTYRemainINgQty