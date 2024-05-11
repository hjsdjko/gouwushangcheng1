
<template>
	<view class="content">
		<form class="app-update-pv">
            <view
                    :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"88rpx"}'
                    class="cu-form-group">
                <view :style='{"width":"160rpx","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'
                      class="title">商品名称</view>
                <input   disabled
                         :style='{"boxShadow":"0 0 0px rgba(0,0,0,.6) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"#E57498","borderRadius":"0px","color":"#E57498","textAlign":"left","borderWidth":"0 0 6rpx","fontSize":"24rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                         :disabled="ro.shangpinName" type="text" v-model="ruleForm.shangpinName" placeholder="商品名称"></input>
            </view>
                <view
                        :style='{"boxShadow":"0 0 0px rgba(0,0,0,.3)","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(218, 220, 219, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"108rpx"}'
                        class="cu-form-group" @tap="shangpinPhotoTap">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'
                          class="title">商品照片</view>
                    <view class="right-input" style="padding:0;textAlign:left">
                        <image
                                :style='{"width":"68rpx","boxShadow":"0 0 0px rgba(0,0,0,.3)","borderRadius":"100%","textAlign":"left","height":"68rpx"}'
                                class="avator" v-if="ruleForm.shangpinPhoto" :src="ruleForm.shangpinPhoto" mode="aspectFill">
                        </image>
                        <image  :style='{"width":"68rpx","boxShadow":"0 0 0px rgba(0,0,0,.3)","borderRadius":"100%","textAlign":"left","height":"68rpx"}'
                                class="avator" v-else src="../../static/gen/upload.png" mode="aspectFill"></image>
                    </view>
                </view>
			                <view :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"88rpx"}'
                      class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'
                          class="title">商品类型</view>
                    <picker @change="shangpinTypesChange" :value="shangpinTypesIndex" :range="shangpinTypesOptions" range-key="indexName">
                        <view
                                :style='{"boxShadow":"0 0 0px rgba(0,0,0,.6) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"#E57498","borderRadius":"0px","color":"#E57498","textAlign":"left","borderWidth":"0 0 6rpx","fontSize":"24rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                                class="uni-input">{{ruleForm.shangpinTypes?ruleForm.shangpinValue:"请选择商品类型"}}</view>
                    </picker>
                </view>
                <view
                        :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"88rpx"}'
                        class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'
                          class="title">商品库存</view>
                    <input   disabled
                             :style='{"boxShadow":"0 0 0px rgba(0,0,0,.6) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"#E57498","borderRadius":"0px","color":"#E57498","textAlign":"left","borderWidth":"0 0 6rpx","fontSize":"24rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                             :disabled="ro.shangpinKucunNumber" type="number" v-model="ruleForm.shangpinKucunNumber" placeholder="商品库存"></input>
                </view>
                <view
                        :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"88rpx"}'
                        class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'
                          class="title">点击次数</view>
                    <input   disabled
                             :style='{"boxShadow":"0 0 0px rgba(0,0,0,.6) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"#E57498","borderRadius":"0px","color":"#E57498","textAlign":"left","borderWidth":"0 0 6rpx","fontSize":"24rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                             :disabled="ro.shangpinClicknum" type="number" v-model="ruleForm.shangpinClicknum" placeholder="点击次数"></input>
                </view>
<!-- text后缀 -->
            <view
                    :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"210rpx"}'
                    class="cu-form-group">
                <view :style='{"width":"160rpx","fontSize":"28rpx","color":"#E57498","textAlign":"left"}'
                      class="title">商品简介</view>
                <textarea :style='{"boxShadow":"0 0 0px rgba(0,0,0,.6) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"#E57498","borderRadius":"0px","color":"#E57498","textAlign":"left","borderWidth":"0 0 6rpx","fontSize":"24rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx","height":"200rpx"}'
                          :disabled="ro.shangpinContent" v-model="ruleForm.shangpinContent" placeholder="商品简介"/>
            </view>

			<view class="btn">
				<button
					:style='{"boxShadow":"0 0 16rpx rgba(0,0,0,0) inset","backgroundColor":"#E57498","borderColor":"#409EFF","borderRadius":"8rpx","color":"rgba(255, 255, 255, 1)","borderWidth":"0","width":"70%","fontSize":"32rpx","borderStyle":"solid","height":"80rpx"}'
					@tap="onSubmitTap" class="bg-red">提交</button>
			</view>
		</form>

					<w-picker mode="dateTime" step="1" :current="false" :hasSecond="false" @confirm="createTimeConfirm"
						  ref="createTime" themeColor="#333333"></w-picker>


	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";

	export default {
		data() {
			return {
				cross: '',
                ro:{
					shangjiaId: false,
					shangpinName: false,
					shangpinPhoto: false,
					shangpinTypes: false,
					shangpinKucunNumber: false,
					shangpinOldMoney: false,
					shangpinNewMoney: false,
					shangpinClicknum: false,
					shangxiaTypes: false,
					shangpinDelete: false,
					shangpinContent: false,
					createTime: false,
				},
				ruleForm: {
					shangjiaId: '',
					shangpinName: '',
					shangpinPhoto: '',
					shangpinTypes: '',//数字
					shangpinValue: '',//数字对应的值
					shangpinKucunNumber: '',
					shangpinOldMoney: '',
					shangpinNewMoney: '',
					shangpinClicknum: '',
					shangxiaTypes: '',//数字
					shangxiaValue: '',//数字对应的值
					shangpinDelete: '',
					shangpinContent: '',
					createTime: '',
				},
				// 登陆用户信息
				user: {},
				shangpinTypesOptions: [],
				shangpinTypesIndex : 0,
				shangxiaTypesOptions: [],
				shangxiaTypesIndex : 0,

			}
		},
		components: {
			wPicker
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onLoad(options) {

		/*下拉框*/
			let shangpinTypesParams = {
				page: 1,
				limit: 100,
				dicCode: 'shangpin_types',
			}
			let shangpinTypes = await this.$api.page(`dictionary`, shangpinTypesParams);
			this.shangpinTypesOptions = shangpinTypes.data.list
		/*下拉框*/
			let shangxiaTypesParams = {
				page: 1,
				limit: 100,
				dicCode: 'shangxia_types',
			}
			let shangxiaTypes = await this.$api.page(`dictionary`, shangxiaTypesParams);
			this.shangxiaTypesOptions = shangxiaTypes.data.list


			// 如果是更新操作
			if (options.id) {
				this.ruleForm.id = options.id;
				// 获取信息
				let res = await this.$api.info(`shangpin`, this.ruleForm.id);
				this.ruleForm = res.data;
			}
			if(options.shangpinId){
                this.ruleForm.shangpinId = options.shangpinId;
			}
			// 跨表
			// this.styleChange()
		},
		methods: {
			// 下拉变化
            shangpinTypesChange(e) {
            this.shangpinTypesIndex = e.target.value
            this.ruleForm.shangpinValue = this.shangpinTypesOptions[this.shangpinTypesIndex].indexName
            this.ruleForm.shangpinTypes = this.shangpinTypesOptions[this.shangpinTypesIndex].codeIndex
        },
            shangxiaTypesChange(e) {
            this.shangxiaTypesIndex = e.target.value
            this.ruleForm.shangxiaValue = this.shangxiaTypesOptions[this.shangxiaTypesIndex].indexName
            this.ruleForm.shangxiaTypes = this.shangxiaTypesOptions[this.shangxiaTypesIndex].codeIndex
        },


			// styleChange() {
			// 	this.$nextTick(() => {
			// 		// document.querySelectorAll('.app-update-pv .cu-form-group .uni-yaoxianStyle-yaoxianStyle').forEach(el=>{
			// 		//   el.style.backgroundColor = this.addUpdateForm.yaoxianStyle.content.backgroundColor
			// 		// })
			// 	})
			// },


			shangpinPhotoTap() {
				let _this = this;
				this.$api.upload(function(res) {
					_this.ruleForm.shangpinPhoto = _this.$base.url + 'upload/' + res.file;
					_this.$forceUpdate();
					_this.$nextTick(() => {
						// _this.styleChange()
					})
				});
			},
			// 日期控件
			createTimeConfirm(val) {
                console.log(val)
                this.ruleForm.createTime = val.result;
                this.$forceUpdate();
            },




			getUUID() {
				return new Date().getTime();
			},
			async onSubmitTap() {
				if ((!this.ruleForm.shangpinName)) {
					this.$utils.msg(`商品名称不能为空`);
					return
				}
				if ((!this.ruleForm.shangpinPhoto)) {
					this.$utils.msg(`商品照片不能为空`);
					return
				}
				if ((!this.ruleForm.shangpinKucunNumber) && (!this.$validate.isIntNumer(this.ruleForm.shangpinKucunNumber)) && this.ruleForm.shangpinKucunNumber >0) {
					this.$utils.msg(`商品库存不能为空，不能小于0 格式为数字`);
					return
				}
				if ((!this.ruleForm.shangpinClicknum) && (!this.$validate.isIntNumer(this.ruleForm.shangpinClicknum)) && this.ruleForm.shangpinClicknum >0) {
					this.$utils.msg(`点击次数不能为空，不能小于0 格式为数字`);
					return
				}
				if (this.ruleForm.id) {
					await this.$api.update(`shangpin`, this.ruleForm);
				} else {
					await this.$api.save(`shangpin`, this.ruleForm);
				}
                uni.setStorageSync('pingluenStateState', true);
                this.$utils.msgBack('提交成功');
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			toggleTab(str) {
				this.$refs[str].show();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20upx;
	}

	.content:after {
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

	textarea {
		border: 1upx solid #EEEEEE;
		border-radius: 20upx;
		padding: 20upx;
	}

	.title {
		width: 180upx;
	}

	.avator {
		width: 150upx;
		height: 60upx;
	}

	.right-input {
		flex: 1;
		text-align: left;
		padding: 0 24upx;
	}

	.cu-form-group.active {
		justify-content: space-between;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		padding: 20upx 0;
	}

	.cu-form-group {
		padding: 0 24upx;
		background-color: transparent;
		min-height: inherit;
	}

	.cu-form-group+.cu-form-group {
		border: 0;
	}

	.cu-form-group uni-input {
		padding: 0 30upx;
	}

	.uni-input {
		padding: 0 30upx;
	}

	.cu-form-group uni-textarea {
		padding: 30upx;
		margin: 0;
	}

	.cu-form-group uni-picker::after {
		line-height: 68rpx;
	}

	.select .uni-input {
		line-height: 68rpx;
	}

	.input .right-input {
		line-height: 68rpx;
	}
</style>