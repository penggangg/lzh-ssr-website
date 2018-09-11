<template>
  <div class="buildNews contBor" id="huxing_view">
    <!-- template 户型信息 start -->
    <div class="buildSport container">
      <h4 class="index_3">户型信息</h4>
      <div class="hxTitle clearfix">
        <h5 :class="active==0 ? 'current' :''" @click="changeSport()">全部户型
          <span> ( {{getHouseTypeList.bedRoomsCount}} )</span>
        </h5>
        <h5 bedrooms="1" v-if="getHouseTypeList.bedRooms1 > 0" :class="active==1 ? 'current' :''" @click="changeSport(1)">1居
          <span> ( {{getHouseTypeList.bedRooms1}} )</span>
        </h5>
        <h5 bedrooms="2" v-else-if="getHouseTypeList.bedRooms2 > 0" :class="active==2 ? 'current' :''" @click="changeSport(2)">2居
          <span> ( {{getHouseTypeList.bedRooms2}} )</span>
        </h5>
        <h5 bedrooms="3" v-else-if="getHouseTypeList.bedRooms3 > 0" :class="active==3 ? 'current' :''" @click="changeSport(3)">3居
          <span> ( {{getHouseTypeList.bedRooms3}} )</span>
        </h5>
        <h5 bedrooms="4" v-else-if="getHouseTypeList.bedRooms4 > 0" :class="active==4 ? 'current' :''" @click="changeSport(4)">4居
          <span> ( {{getHouseTypeList.bedRooms4}} )</span>
        </h5>
        <h5 bedrooms="5" v-else-if="getHouseTypeList.bedRooms5 > 0" :class="active==5 ? 'current' :''" @click="changeSport(5)">5居及以上
          <span> ( {{getHouseTypeList.bedRooms5}} )</span>
        </h5>
      </div>
      <div class="hxBox">
        <a href="javascript:void(0)" class="goLeft" style="display:none"></a>
        <ul class="imglist clearfix">
          <li :data-type="item.bedRooms" :housetypeid="item.houseTypeId" :salestatus="item.saleStatus" v-for="item in getHouseTypeList.houseTypeList" :key="item.houseTypeId">
            <dl>
              <dt>
                <img v-if="item.houseTypePicture" class="lazy_img" src="~assets/img/testImg.jpg" v-lazyload="item.houseTypePicture"
                  onerror="javascript:this.src='~assets/img/testImg.jpg'" :alt="`${resblockInfo.resblockName}户型信息`" :title="`${resblockInfo.resblockName}户型信息`" @click="showDetail(item.houseTypeId,item.prjInfoId)">
                <img v-else src="~assets/img/testImg.jpg" />
                <i class="saleStatus" v-if="item.saleStatus==='302700000001'">在售</i>
                <i class="saleStatus" v-else-if="item.saleStatus==='302700000002'">待售</i>
                <i class="saleStatus" v-else>售罄</i>
              </dt>
              <dd>
                <div>
                  <h6 v-if="item.totalPrice">
                      {{item.totalPrice}}万
                  </h6>
                  <p class="clearfix">
                    <span v-if="item.houseTypeStructure">
                     {{item.houseTypeStructure}}</span>
                     <!-- {{item.buildArea}} -->
                    <em v-if="item.buildArea"> {{item.buildArea}}㎡</em>
                  </p>
                  <p class="clearfix">
                    <!-- {{item.houseType}}|{{item.upperFew}}|{{item.lowerFew}} -->
                    <span v-if="item.houseType === '叠拼别墅'" class="houseType">
                      共{{item.upperFew}}层
                    </span>
                    <span v-else-if="item.houseType !== '叠拼别墅'&&item.upperFew!==0&&item.lowerFew===0" class="houseType">
                      地上{{item.upperFew}}层
                    </span>
                    <span v-else-if="item.houseType !== '叠拼别墅'&&item.lowerFew!==0&&item.upperFew===0" class="houseType">
                      地下{{item.lowerFew}}层
                    </span>
                    <span v-else-if="item.houseType !== '叠拼别墅'&&item.upperFew!==0&&item.lowerFew!==0" class="houseType">
                      地上{{item.upperFew}}层 / 地下{{item.lowerFew}}层
                    </span>
                  </p>
                </div>
              </dd>
            </dl>
          </li>
        </ul>
        <a href="javascript:void(0)" class="goRight" style="display:none"></a>
      </div>
    </div>
    <!-- template 户型信息 end -->
    <ExDialog :visible.sync="showhouseInfoDetail" title="户型详情" type="message" width="1200px" height="560px">
      <houseInfoDetail :houseTypeId="houseTypeId" :prjInfoId="prjInfoId"></houseInfoDetail>
    </ExDialog>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import houseInfoDetail from '~/components/oneHand/houseInfoDetail'
import ExDialog from '~/components/exdialog'
export default {
  props: {
    resblockInfo: Object,
    prjInfoId: String,
    resblockId: String
  },
  data() {
    return {
      showhouseInfoDetail: false,
      houseTypeId: '',
      getHouseTypeList: {},
      active: 0,
      bedRooms: ''
    }
  },
  methods: {
    showDetail(houseTypeId, prjInfoId) {
      this.showhouseInfoDetail = true
      this.houseTypeId = houseTypeId
      this.prjInfoId = prjInfoId
    },
    changeSport(index) {
      if (index === 1) {
        this.active = 1
        this.bedRooms = '1'
      } else if (index === 2) {
        this.active = 2
        this.bedRooms = '2'
      } else if (index === 3) {
        this.active = 3
        this.bedRooms = '3'
      } else if (index === 4) {
        this.active = 4
        this.bedRooms = '4'
      } else if (index === 5) {
        this.active = 5
        this.bedRooms = '5'
      } else {
        this.active = 0
        this.bedRooms = ''
      }
      this.getList()
    },
    getList() {
      axios.post('/api/landz-web-project/houseType/getHouseTypeList', {
        cityCode: '310000',
        prjInfoId: this.prjInfoId,
        resblockId: this.resblockId,
        bedRooms: this.bedRooms
      })
        .then((res) => {
          console.log(res)
          this.getHouseTypeList = res.data.result
        })
    }
  },
  mounted() {
    // 户型信息
    this.getList()
  },
  components: {
    houseInfoDetail,
    ExDialog
  }
}
</script>
<style scoped>
.buildSport{
  padding: 30px 0;
}
.buildSport h4 {
  font-size: 18px;
  color: #303;
  font-weight: 700;
}
.buildSport .hxTitle {
  margin-top: 30px;
}

.buildSport .hxTitle h5 {
  float: left;
  height: 40px;
  line-height: 40px;
  margin-right: 30px;
  font-size: 16px;
  cursor: pointer;
}

.buildSport .hxTitle h5 span {
  font-weight: inherit;
}

.buildSport .hxTitle h5.current {
  color: #330033;
  font-weight: bold;
  border-bottom: 2px solid #330033;
}

.buildSport .hxBox {
  position: relative;
  width: 74%;
  height: 350px;
  overflow: hidden;
  margin-top: 20px;
}

.hxBox > a {
  position: absolute;
  top: 160px;
  width: 72px;
  height: 72px;
  background: url(~assets/img/icon.png) no-repeat;
  z-index: 5;
  zoom: 0.8;
}

.hxBox > a.goLeft {
  left: 10px;
  background-position: -29px -75px;
}

.hxBox > a.goRight {
  right: 23px;
  background-position: -108px -74px;
}
#huxing_view .imglist {
  display: -webkit-flex;
}
ul.imglist {
  position: relative;
  top: 0;
  left: 0;
  z-index: 4;
  white-space: nowrap;
  width: 255px;
}

ul.imglist li {
  /*float:left;width:251px;*/
  height: 260px;
  margin-right: 25px;
}

ul.imglist li dl {
  width: 100%;
}

ul.imglist li dl dt {
  width: 195px;
  height: 260px;
  border: 1px solid #ddd;
  position: relative;
  cursor: pointer;
}
ul.imglist li dl dt img{
  width: 195px;
  height: 260px;
}
ul.imglist li dl dt i.saleStatus {
  position: absolute;
  left: 0;
  padding: 3px 7px;
  font-size: 12px;
  background: #330033;
  color: #fff;
}

ul.imglist li dl dd h6 {
  font-size: 20px;
  color: #fe0019;
  margin-top: 12px;
  font-weight: bold;
}

ul.imglist li dl dd p {
  line-height: 24px;
  font-size: 14px;
  text-shadow: 0px 0px 1px #ddd;
}

ul.imglist li dl dd p span {
  float: left;
  font-size: 12px;
}

ul.imglist li dl dd p em {
  float: right;
  font-size: 12px;
}

ul.imglist li dl dd p i {
  float: right;
  height: 20px;
  line-height: 20px;
  padding: 0 12px;
  text-align: center;
  background: #fcfcfc;
  border: 1px solid #333;
}

.houseType{
  display: inline-block;
  max-width: 197px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
