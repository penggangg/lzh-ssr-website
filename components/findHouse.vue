<template>
  <div class="findCont" style="margin: 0 auto;">
        <div class="needTitle clearfix">
            <h4 class="current pg_buy">我要买房</h4>
            <h4 class="pg_rent">我要租房</h4>
        </div>
        <div class="findHouse">
            <ul class="buy">
                <li>
                    <label>手机号</label>：
                    <input type="text" class="phone" placeholder="请输入您的手机号，方便我们联系您"/>
                </li>
                <li>
                    <label>尊称</label>：
                    <input type="text" class="name" placeholder="我们怎么称呼您"/>
                    <span class="sex"><b class="current">先生</b>/<b>女士</b></span>
                </li>
                <li>
                    <label>置业区域</label>：
                    <select>
                        <option>置业区域</option>
                    </select>
                </li>
                <li>
                    <label>预算</label>：
                    <input type="text" class="price" placeholder="我想投资1000-2000"/> 万
                </li>
            </ul>
            <ul class="rent">
                <li>
                    <label>手机号</label>：
                    <input type="text" class="phone" placeholder="请输入您的手机号，方便我们联系您"/>
                </li>
                <li>
                    <label>尊称</label>：
                    <input type="text" class="name" placeholder="我们怎么称呼您"/>
                    <span class="sex"><b class="current">先生</b>/<b>女士</b></span>
                </li>
                <li>
                    <label>置业区域</label>：
                    <select>
                        <option>置业区域</option>
                    </select>
                </li>
                <li>
                    <label>预算</label>：
                    <input type="text" class="price" placeholder="期望租金"/> 元/月
                </li>
            </ul>
        </div>
        <a href="javascript:void(0)" class="subCom"><input type="button" value="提交委托"/></a>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
/*帮我找房*/
.findCont {
	padding: 10px;
  width: 680px;
  line-height: normal;
}
/*头部*/
.needTitle {
	border-bottom: 1px solid #efdb9f;
}
.needTitle h4 {
	float: left;
	padding: 0 20px;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	font-family: '微软雅黑';
	cursor: pointer;
}
.needTitle h4.current {
	background: #efdb9f;
}
/*内容*/
.findHouse input[type='text'] {
	border: 0;
	background: 0;
	font-size: 14px;
	font-family: '微软雅黑';
	/*height:45px;
	line-height: 45px;*/
	/*padding:20px 0;*/
}
.findHouse ul {
	display: none;
}
.findHouse ul:first-of-type{
  display: block;
}
.findHouse ul li {
	/*height:52px;
	line-height: 52px;*/
	padding: 20px 0;
	border-bottom: 1px solid #ddd;
	font-size: 16px;
	font-family: '微软雅黑';
}
.findHouse ul li label {
	display: inline-block;
	width: 70px;
	margin-right: -3px;
}
.findHouse ul li input[type='text'] {
	width: 400px;
	margin-left: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.findHouse ul li select {
	width: 160px;
	height: 32px;
	line-height: 32px;
	margin-left: 50px;
	border: none;
	font-family: '微软雅黑';
}
.findHouse ul li span.sex {
	display: inline-block;
	color: #330033;
}
.findHouse ul li span.sex b {
	display: inline-block;
	color: #999;
}
.findHouse ul li span.sex b.current {
	color: #330033;
}
/*提交委托*/
.findCont .subCom,
.findCont .subCom input {
	display: block;
	width: 180px;
	height: 50px;
	line-height: 50px;
	text-align: center;
}
.findCont .subCom {
	margin: 25px auto 0;
}
.findCont .subCom input {
	font-size: 18px;
	color: #fff;
	background: #330033;
}

/*我是业主*/
/*我要出售*/
/*房产类型*/
.findHouse ul li p {
	display: inline-block;
	margin-left: 50px;
}
.findHouse ul li p.housePro a {
	float: left;
	margin-right: 30px;
	font-size: 14px;
	color: #330033;
}
.findHouse ul li p.housePro a.radioBig > input[type='radio'] {
	width: 18px;
	height: 18px;
	vertical-align: middle;
}
.findHouse ul li p.housePro a span {
	width: 18px !important;
	height: 18px !important;
	background-position: -92px 0px;
}
.findHouse ul li p.housePro a span.clicked {
	background-position: -108px 0px;
}
/*地址*/
.findHouse ul li p.adress input[type='text'] {
	width: 124px;
	height: 32px;
	line-height: 32px;
	text-indent: 20px;
	margin-left: 0;
	margin-right: 20px;
	font-size: 14px;
	/*color:#999;*/
	background: #f5f5f6;
}
</style>


