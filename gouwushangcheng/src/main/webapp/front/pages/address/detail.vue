<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.addressName" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.addressPhone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressDizhi}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isdefaultTypes == 2" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					addressName: '',
					addressPhone: '',
					addressDizhi: '在地图选择',
					yonghuId: '',
				},
				id: ''
			}
		},
		async onLoad(option) {
			let title = '新增收货地址';
			if (option.id) {
				title = '编辑收货地址'
				this.id = option.id;
				let res = await this.$api.info('address', this.id);
				this.addressData = res.data;
				this.addressData.addressDizhi = res.data.addressDizhi;
				if (this.addressData.isdefaultTypes == 2) {
					this.addressData.default = true
				}
			}
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e) {
				if(e.detail){
					this.addressData.isdefaultTypes = 2
				}else{
					this.addressData.isdefaultTypes = 1
				}
			},
			//地图选择地址
			chooseLocation() {
				let _this = this
				uni.chooseLocation({
					success: (data) => {
						_this.addressData.addressDizhi = data.address+data.name;
					}
				})
			},
			//提交
			async confirm() {
				let data = this.addressData;
				data.yonghuId = uni.getStorageSync("userid")
				if (!data.addressName) {
					this.$utils.msg('请填写收货人姓名');
					return;
				}
				if (!this.$validate.isMobile(data.addressPhone)) {
					this.$utils.msg('请输入正确的手机号码');
					return;
				}
				if (!data.addressDizhi) {
					this.$utils.msg('请在地图选择所在位置');
					return;
				}
				if (this.id) {
					await this.$api.update('address', data)
				} else {
					await this.$api.save('address', data)
				}

				this.$utils.msgBack('操作成功');

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: #888888;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #888888;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			// color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		// font-size: $font-lg;
		color: #fff;
		background-color: red;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
