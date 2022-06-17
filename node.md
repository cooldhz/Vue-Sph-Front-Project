第一步  写样式结构
第二步  分成各个组件
第三步  书写api接口
第四步  书写vuex 三连环 
第五步  组件内派发dispath 找store拿数据
第六步  组件内动态展示数据



search组件
    排序功能:
    1.怎么判断是 综合排序 还是 价格排序
        如果searchParams.order 包含 '1',那就是综合排序
        如果searchParams.order 包含 '2',那就是价格排序
    2.怎么判断是 升序 还是 降序
        如果searchParams.order 包含 'asc',那就是升序
        如果searchParams.order 包含 'desc',那就是降序