<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback"
		:bottom="100">
		<view class="container">
			<view>
				<swiper class="swiper" :indicator-dots='".swiper-pagination"==null?false:true'
					:autoplay='autoplaySwiper' :circular='true' indicator-active-color='#000000'
					indicator-color='rgba(0, 0, 0, .3)' :duration='1000' :interval='intervalSwiper'
					:vertical='"horizontal"=="horizontal"?false:true'>
					<swiper-item v-for="(swiper,index) in swiperList" :key="index">
						<image mode="aspectFill" :src="swiper"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="detail-content">
				<view class="price detail-list-item priceFavor"
					:style='{"boxShadow":"0 0 2rpx rgba(0,0,0,.8)","margin":"0 ","borderColor":"#fff","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","borderStyle":"solid","height":"68rpx"}'>
					<!-- 金额-->
					<view class="text" style="color: red;textAlign:left">
						<text style='font-size:20rpx'>¥</text><text style="font-weight:bold;font-size:50rpx">{{detail.shangpinNewMoney}}</text><text style="font-size: 20rpx;color: #8799A3;margin-left: 10rpx;">
							<text v-if="detail.shangpinOldMoney!=null">原价￥<text style="text-decoration:line-through">{{detail.shangpinOldMoney}}</text></text>
                    	</text>
					</view>
				</view>
					<view class="name shop-title"
						  :style='{"boxShadow":"0 0 6rpx rgba(0,0,0,.3)","margin":"0 0 20rpx 0","borderColor":"#fff","backgroundColor":"#fff","color":"#E57498","borderRadius":"0","borderWidth":"0","fontSize":"36rpx","borderStyle":"solid"}'>
						商品名称：{{detail.shangpinName}}
					</view>

					<view class="detail-list-item"
						  :style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
						<view class="lable"
							  :style='{"width":"auto","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'>
							商品类型：</view>
						<view class="text" :style='{"color":"#E57498","textAlign":"center","fontSize":"24rpx"}'>
                            {{detail.shangpinValue}}</view>
					</view>
					<view class="detail-list-item"
						  :style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
						<view class="lable"
							  :style='{"width":"auto","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'>
							商品库存：</view>
						<view class="text" :style='{"color":"#E57498","textAlign":"center","fontSize":"24rpx"}'>
							{{detail.shangpinKucunNumber}}</view>
					</view>
					<view class="detail-list-item"
						  :style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
						<view class="lable"
							  :style='{"width":"auto","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'>
							点击次数：</view>
						<view class="text" :style='{"color":"#E57498","textAlign":"center","fontSize":"24rpx"}'>
							{{detail.shangpinClicknum}}</view>
					</view>
			</view>
			<view class="time-content"
				:style='{"boxShadow":"0 0 2rpx rgba(0,0,0,.8)","margin":"0","borderColor":"#fff","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","borderStyle":"solid","height":"auto"}'>
				<view class="header" :style='{"color":"#333","fontSize":"28rpx"}'>
					简介/详情
				</view>
				<view class="content" style="line-height: 50upx;letter-spacing: 5upx;"
					:style='{"color":"#333","fontSize":"28rpx"}'>
					<rich-text :nodes="detail.shangpinContent"></rich-text>
				</view>
			</view>


			<view class="time-content"
				:style='{"boxShadow":"0 0 6rpx rgba(0,0,0,.3)","margin":"0 0 0px 0","borderColor":"red","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","borderStyle":"solid"}'>
				<view class="comoment-header"
					:style='{"borderColor":"rgba(0,0,0,.2)","backgroundColor":"#fff","borderRadius":"0","borderStyle":"solid","borderWidth":"0 0 2rpx 0"}'>
					<view :style='{"fontSize":"32rpx"}'>
						评价
					</view>
				</view>

				<view class="cu-list comment" style="margin-top: 20upx;">
					<view
						:style='{"borderColor":"rgba(0,0,0,.2)","backgroundColor":"#fff","borderRadius":"0","borderStyle":"dashed","borderWidth":"0 0 2rpx 0"}'
						v-for="(item,index) in commentList" v-bind:key="index" class="cu-item comment-item">
						<view class="content">
							<view :style='{"textAlign":"left","fontSize":"28rpx"}'
								class="text-grey" v-if="item.Name != null && item.Name != ''">{{item.Name}}</view>
                            <view :style='{"textAlign":"left","fontSize":"28rpx"}'
                                  class="text-grey" v-if="item.yonghuName != null && item.yonghuName != ''">{{item.yonghuName}}</view>
                            <view style="float: right"
									class="text-gray text-df">{{item.insertTime}}</view>
							</view>
							<view :style='{"color":"#666","textAlign":"left","fontSize":"24rpx"}'
								class="text-gray text-content text-df content">
								{{item.shangpinCommentbackText}}
							</view>
							<view v-if="item.replyText" :style='{"color":"#666","textAlign":"left","fontSize":"24rpx"}'
								class="text-gray text-content text-df content">
								回复:{{item.replyText}}
							</view>
						</view>
					</view>

				</view>
			</view>

            <view class="bottom-content cu-bar bg-white tabbar border shop">
                <view style="text-align: left;display: flex;">
                </view>
                <view style="text-align: right;">

                    <button @tap="onCartTap" class="cu-btn bg-orange round shadow-blur" style="margin-right: 10upx;"
                            :style="{width:'auto',borderRadius:'8rpx',height:'80rpx',fontSize:'28rpx',color:'#fff',backgroundColor:btnColor[2],borderColor:btnColor[2]}">加入购物车</button>
                    <button @tap="onSubmit" style="margin-right: 10upx;" class="cu-btn bg-red round shadow-blur"
                            :style="{width:'auto',borderRadius:'8rpx',height:'80rpx',fontSize:'28rpx',color:'#fff',backgroundColor:btnColor[3],borderColor:btnColor[3]}">立即购买</button>
					<!-- <button @tap="onSubmit" style="margin-right: 10upx;" class="cu-btn bg-red round shadow-blur"
                            :style="{width:'auto',borderRadius:'8rpx',height:'80rpx',fontSize:'28rpx',color:'#fff',backgroundColor:btnColor[3],borderColor:btnColor[3]}">立即购买</button>-->
                </view>
            </view>
		</view>


	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				autoplaySwiper: false ? true : false,
				intervalSwiper: false ? $template2.front.base.swiper.autoplay.delay : 5000,
				btnColor: ['#409eff', '#67c23a', '#909399', '#e6a23c', '#f56c6c', '#356c6c', '#351c6c', '#f093a9',
					'#a7c23a', '#104eff', '#10441f', '#a21233', '#503319'
				],
				id: '',
				detail: {},//本页面数据对象
				swiperList: [],//主图
				commentList: [],//评论留言数据集合
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
				},
				hasNext: true,
				user: {},//登录用户信息
				collectionFlag: 0,//收藏
			}
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onLoad(options) {
			this.id = options.id;
		},
		async onShow(options) {
			// 渲染数据
			this.init();
			let table = uni.getStorageSync("nowTable");
			// 获取用户信息
			let res = await this.$api.session(table);
			this.user = res.data;
			this.btnColor = this.btnColor.sort(() => {
				return (0.5 - Math.random());
			});
			let cleanType = uni.getStorageSync('pingluenStateState')
			if (cleanType) {
				uni.removeStorageSync('pingluenStateState')
				this.mescroll.num = 1
				this.upCallback(this.mescroll)
			}
		},
		destroyed: function() {
			//window.clearInterval(this.inter);
		},
		methods: {
		    //下载
            download(url) {
                let _this = this;
                uni.downloadFile({
                    url: url,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            _this.$utils.msg('下载成功');
                            window.open(url);
                        }
                    }
                });
            },
			// 获取详情
			async init() {
				let res = await this.$api.info('shangpin', this.id);
				this.detail = res.data;
				// 主图
				this.swiperList = this.detail.shangpinPhoto ? this.detail.shangpinPhoto.split(",") : [];
			},
			//添加购物车
            async onCartTap() {
                let cartRes = await this.$api.page('cart', {
                    page: 1,
                    limit: 9999,
                        shangpinId: this.id
                })
                if(cartRes.data.list.length>0){
                    this.$utils.msg('商品已添加到购物车');
                    return
                }
                await this.$api.save('cart', {
                        shangpinId: this.detail.id,
                    buyNumber: 1,
                        yonghuId: this.user.id,
                });
                this.$utils.msg('添加到购物车成功')
            },
			//立即购买
            onSubmit(){
                uni.setStorageSync('orderGoods', [{
                        shangpinId: this.detail.id,
                        shangpinName: this.detail.shangpinName,
                        shangpinPhoto: this.swiperList[0],
                    buyNumber: 1,
                        shangpinNewMoney: this.detail.shangpinNewMoney,
                }])
                this.$utils.jump('../shangpinOrder/confirm');
            },
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.hasNext = true
				mescroll.resetUpScroll()
			},

			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				let res = await this.$api.list('shangpinCommentback', {
					page: mescroll.num,
					limit: mescroll.size,
					shangpinId: this.id
				});
				// 如果是第一页数据置空
				if (mescroll.num == 1) this.commentList = [];
				this.commentList = this.commentList.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			// 添加评论
			async onCommentTap() {
                this.$utils.jump(`../shangpinCommentback/add-or-update?shangpinId=${this.id}`)
            },
		}
	}
</script>

<style lang="scss">
	.container {
		// padding-bottom: 80upx;
	}

	.container:after {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		content: '';
		background-attachment: fixed;
		background-size: cover;
		background-position: center;
	}

	.swiper {
		width: 100%;
		height: 450upx;

		image {
			width: 100%;
		}
	}

	.detail-content {
		font-size: 28upx;
		color: #888888;
		// padding: 10upx 20upx;
		background: #FFFFFF;
		line-height: 45upx;

		.name {
			font-size: 38rpx;
			font-weight: blod;
			// margin-bottom: 20upx;
			padding-top: 20upx;
		}

		.price {
			font-size: 33rpx;
		}
	}

	.time-content {
		background: #FFFFFF;
		padding: 30upx;
		font-size: 30upx;
		border-radius: 20upx;
		margin-top: 20upx;

		.header {
			font-size: 33upx;
			margin-bottom: 20upx;
		}
	}

	.bottom-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.comoment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12upx;

		.btn-comment-content {
			color: #DD514C;
			font-weight: bold;
			padding: 0 12upx;
		}
	}

	.comment-item {
		margin-bottom: 10upx;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 20upx;

		.content {
			margin-left: 20upx;
			margin-top: 20upx;
		}
	}

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.popup-content {
		.popup-form {
			background: #FFFFFF;
			margin-top: 20upx;
		}

		.btn-content {
			text-align: right;
			background: #FFFFFF;

			button {
				margin-left: 20upx;
				margin-right: 20upx;
				margin-bottom: 20upx;
			}
		}
	}

	.detail-list-item {
		padding: 0 24upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 68upx;
		border-bottom: 2upx solid #efefef;
		background-color: #fff;

		.lable {
			font-size: 28upx;
			color: #000;
		}

		.text {
			flex: 1;
			font-size: 24upx;
			color: #FF00FF;
			text-align: left;
		}

		&.favor {
			.el-icon-star-on {
				color: inherit;
				font-size: inherit;
			}
		}
	}

	.detail-content .shop-title {
		padding: 20upx 24upx;
		box-sizing: border-box;
		line-height: 1.4;
	}

	.priceFavor {
		height: 96upx !important;
	}

	.priceFavor .text {
		font-size: 64upx !important;
		color: red !important;
	}

	.priceFavor .icon {
		font-size: 56upx !important;
		text-align: right !important;
		color: red !important;
	}

	//订座样式
	.seat-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background: #FFFFFF;
		margin: 20upx;
		border-radius: 20upx;
		padding: 20upx;
		font-size: 30upx;

		.seat-item {
			width: 33.33%;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: 20upx;

			.seat-icon {
				width: 50upx;
				height: 50upx;
				margin-bottom: 10upx;
			}
		}
	}
</style>
