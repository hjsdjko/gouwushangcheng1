<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
				<input v-model="searchForm.shangjiaName" type="text" placeholder="商家名称"></input>
		</view>

        <view class="action">
			<button @tap="search"
				:style="{width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
				class="cu-btn shadow-blur round">搜索</button>
		</view>
	</view>

<view class="uni-product-list" :style='{"borderRadius":0,"backgroundColor":"rgba(224, 224, 224, 1)"}'>
    <view
					@tap="onDetailTap(product)"
                class="uni-product"
                :style='{"borderRadius":"0px","backgroundColor":"#fff"}' v-for="(product,index) in list" :key="index">
        <view class="uni-product-title"
              :style='{"fontSize":"26rpx","lineHeight":"40rpx","color":"#333","textAlign":"left"}'>
            {{product.shangjiaName}}</view>
        <view class="image-view">
            <image :style='{"borderRadius":"0px","width":"100%","height":"100%"}' mode="aspectFill"
                   class="uni-product-image" :src="product.shangjiaPhoto?product.shangjiaPhoto.split(',')[0]:''"></image>
        </view>
        <view class="uni-product-price" v-if="product.shangjiaNewMoney != null"
              :style='{"fontSize":"24rpx","lineHeight":"60rpx","color":"#999","textAlign":"left"}'>
            <text class="">￥{{product.shangjiaNewMoney}}</text>
        </view>
        <view style="display: flex;justify-content: space-between;">
            <text v-if="isAuth('shangjia','修改')" class="cuIcon-edit"
                  @click.stop="onUpdateTap(product.id)">修改</text>
            <text v-if="isAuth('shangjia','删除')" class="cuIcon-delete"
                  @click.stop="onDeleteTap(product.id)">删除</text>
        </view>
    </view>
</view>	<button
            :style='{"boxShadow":"0 0 0px rgba(0,0,0,0) inset","backgroundColor":"#B24592","borderColor":"rgba(57, 78, 99, 1)","borderRadius":"40rpx","color":"rgba(0, 0, 0, 1)","borderWidth":"0","width":"40%","fontSize":"28rpx","borderStyle":"solid","height":"76rpx"}'
            v-if="isAuth('shangjia','新增')" class="add-btn" @click="onAddTap()">新增</button>


	
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
						queryName: "商家名称",
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
				shangjiaXingjiTypesList: [],
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

	   		//当前表的 商家星级类型 字段 字典表查询方法
		  	let shangjiaXingjiTypes = await this.$api.page('dictionary', {
			 	 page: 1,
			  	limit: 100,
		  		dicCode:'shangjia_xingji_types'
		  	});
		  	this.shangjiaXingjiTypesList = shangjiaXingjiTypes.data.list;


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
				this.searchForm.shangjiaName = "";
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
                    ,shangjiaDelete: 1
				}


                let res = await this.$api.list(`shangjia`, params);

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
							await _this.$api.del('shangjia', JSON.stringify([id]));
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
                    ,shangjiaDelete: 1
				}
				if (this.searchForm.shangjiaName) {
                    searchForm['shangjiaName'] = this.searchForm.shangjiaName
                }
				if (this.searchForm.shangjiaName) {
					searchForm['shangjiaName'] = this.searchForm.shangjiaName
				}

                let res = await this.$api.list(`shangjia`, searchForm);
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
