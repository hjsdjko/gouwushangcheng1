<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
		</view>

        <view class="action">
			<button @tap="search"
				:style="{width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
				class="cu-btn shadow-blur round">搜索</button>
		</view>
	</view>

	<view class="list b-b" v-for="(item, index) in list" :key="index">
		<view class="wrapper" style="margin-left: 25upx;margin-top: 10upx;">
			<view style="font-size: 30rpx;">
				<b>{{item.dictionaryId}}</b>
			</view>
			<view class="address-box" style="margin-bottom: 20rpx;width: 600rpx;">
				<text style="margin-left: 30rpx;">字典：{{item.dictionaryValue}}</text>
			</view>
			<!--<view class="u-box" style="color: #8799A3;">-->
			<!--</view>-->
		</view>
        <view style="float: right;">
            <text v-if="isAuth('dictionary','修改')" class="cuIcon-edit" @click.stop="onUpdateTap(item.id)"></text>
            <text v-if="isAuth('dictionary','删除')" style="margin: 0 50upx 0 30rpx;" class="cuIcon-delete" @click.stop="onDeleteTap(item.id)"></text>
        </view>
        <text style="margin: 0 25rpx 0 25rpx;;color: #8c939d">
            _____________________________________________
        </text>
	</view>

	<button
            :style='{"boxShadow":"0 0 0px rgba(0,0,0,0) inset","backgroundColor":"#B24592","borderColor":"rgba(57, 78, 99, 1)","borderRadius":"40rpx","color":"rgba(0, 0, 0, 1)","borderWidth":"0","width":"40%","fontSize":"28rpx","borderStyle":"solid","height":"76rpx"}'
            v-if="isAuth('dictionary','新增')" class="add-btn" @click="onAddTap()">新增</button>


	
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				btnColor: ['#409eff', '#67c23a', '#909399', '#e6a23c', '#f56c6c', '#356c6c', '#351c6c', '#f093a9',
					'#a7c23a', '#104eff', '#10441f', '#a21233', '#503319'
				],
				queryList: [{
						queryName: "字典名称",
					}
				],
				sactiveItem: {
					"padding": "0 20rpx",
					"boxShadow": "0 0 0px rgba(0,0,0,.3)",
					"margin": "0 12rpx",
					"borderColor": "#B24592",
					"backgroundColor": "#B24592",
					"color": "rgba(0, 0, 0, 1)",
					"borderRadius": "40rpx",
					"borderWidth": "2rpx",
					"width": "auto",
					"lineHeight": "56rpx",
					"fontSize": "24rpx",
					"borderStyle": "solid"
				},
				sitem: {
					"padding": "0 20rpx",
					"boxShadow": "0 0 0px rgba(0,0,0,.3)",
					"margin": "0 12rpx",
					"borderColor": "rgba(215, 215, 215, 1)",
					"backgroundColor": "rgba(247, 247, 247, 1)",
					"color": "#333",
					"borderRadius": "40rpx",
					"borderWidth": "2rpx",
					"width": "auto",
					"lineHeight": "56rpx",
					"fontSize": "24rpx",
					"borderStyle": "solid"
				},
				list: [],
                user:{},
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
				},
				hasNext: true,
				searchForm: {},
				/*1111*/
				categoryName: 0,
				CustomBar: '0'
			};
		},
		async onShow() {
			this.btnColor = this.btnColor.sort(() => {
				return (0.5 - Math.random());
			});

            let _this = this
            let table = uni.getStorageSync("nowTable");
            // 获取用户信息
            let resA = await _this.$api.session(table);
            _this.user = resA.data;
            _this.btnColor = _this.btnColor.sort(() => {
                return (0.5 - Math.random());
            });



			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		onLoad() {
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		methods: {
			//查询条件切换
			queryChange(e) {
				this.searchForm.dictionaryName = "";
			},
			//类别搜索
			categoryClick(categoryName) {
				this.categoryName = categoryName;
				this.mescroll.resetUpScroll();
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.hasNext = true
				// 重置分页参数页数为1
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				let params = {
					page: mescroll.num,
					limit: mescroll.size
				}


                let res = await this.$api.page(`dictionary`, params);

                if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			//添加地址
            onSelectTap(item) {
                uni.setStorageSync('address', item);
                uni.navigateBack({
                    delta: 1
                })
            },
			// 详情
			onDetailTap(item) {
				this.$utils.jump(`./detail?id=${item.id}`)
			},
			// 修改
			onUpdateTap(id) {
				this.$utils.jump(`./add-or-update?id=${id}`)
			},
			// 添加
			onAddTap() {
				this.$utils.jump(`./add-or-update`)
			},
			onDeleteTap(id) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: async function(res) {
						if (res.confirm) {
							await _this.$api.del('dictionary', JSON.stringify([id]));
							_this.hasNext = true
							// 重置分页参数页数为1
							_this.mescroll.resetUpScroll()
						}
					}
				});
			},
			// 搜索
			async search() {
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size
				}
				if (this.searchForm.indexName) {
                    searchForm['indexName'] = this.searchForm.indexName
                }

                let res = await this.$api.page(`dictionary`, searchForm);
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			}
		}
	};
</script>

<style>
	/* product */
	page {
		background: #EEEEEE;
	}

	view {
		font-size: 28upx;
	}

	.tabView {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: #ffffff;
		height: 60upx;
		margin-bottom: 20upx;
		white-space: nowrap;
		box-shadow: 0px 1px 14px 0px rgba(38, 38, 35, 0.07);
		margin-top: 6upx;
	}

	.tab {
		text-align: center;
		display: inline-block;
		margin: 0 12rpx;
		padding: 0 20rpx;
		width: auto;
		line-height: 56rpx;
		color: #333;
		font-size: 24rpx;
		border-radius: 40rpx;
		border-width: 2rpx;
		border-style: solid;
		border-color: rgba(215, 215, 215, 1);
		background-color: rgba(247, 247, 247, 1);
		box-shadow: 0 0 0px rgba(0, 0, 0, .3);
	}

	.tabActive {
		margin: 0 12rpx;
		padding: 0 20rpx;
		width: auto;
		line-height: 56rpx;
		color: rgba(0, 0, 0, 1);
		font-size: 24rpx;
		border-radius: 40rpx;
		border-width: 2rpx;
		border-style: solid;
		border-color: #B24592;
		background-color: #B24592;
		box-shadow: 0 0 0px rgba(0, 0, 0, .3);
	}

	.tab:last-of-type {
		border: none;
	}

	.uni-product-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
		margin-top: 0upx;
		justify-content: space-around;
	}

	.uni-product {
		padding: 10upx;
		margin: 10upx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}

	.image-view {
		height: 330upx;
		width: 330upx;
		margin: 12upx 0;
	}

	.uni-product-image {
		height: 330upx;
		width: 330upx;
	}

	.uni-product-title {
		width: 300upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-product-price {
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	uni-image>div,
	uni-image>img {
		width: 100%;
		height: 140px;
		object-fit: cover;
	}

</style>
